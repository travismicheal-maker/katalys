// api/chat.js
// Smart proxy with source-aware search routing.
// Accepts _sources: { clinicalWeb: bool, literature: bool, libraryText: string }
// to control which domains are searched.

export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } },
};

// ── Domain lists by source category ──────────────────────────────────────────
const CLINICAL_WEB_DOMAINS = [
  'www.mayoclinic.org',
  'www.uptodate.com',
  'www.medscape.com',
  'reference.medscape.com',        // ← ADDED: drug interaction checker
  'www.webmd.com',
  'www.drugs.com',
  'www.rxlist.com',
  'www.cdc.gov',
  'www.who.int',
  'www.nih.gov',
  'www.nhs.uk',
  'www.healthline.com',
  'www.emedicine.medscape.com',
  'www.clevelandclinic.org',
  'www.hopkinsmedicine.org',
  'www.fda.gov',                   // ← ADDED: FDA drug approvals & safety alerts
  'www.dailymed.nlm.nih.gov',      // ← ADDED: FDA-approved drug labels (authoritative)
];

const LITERATURE_DOMAINS = [
  // ── Core peer-reviewed literature ────────────────────────────────────────
  'pubmed.ncbi.nlm.nih.gov',
  'www.ncbi.nlm.nih.gov',
  'www.ncbi.nlm.nih.gov/pmc/',     // ← ADDED: PMC full-text (biggest single gain)
  'www.cochranelibrary.com',
  'www.nejm.org',
  'www.thelancet.com',
  'jamanetwork.com',
  'www.bmj.com',
  'www.ahajournals.org',
  'www.acc.org',
  'www.heart.org',
  'www.nice.org.uk',
  'www.aafp.org',
  'www.endocrine.org',
  'www.kidney.org',
  'www.diabetes.org',
  'www.acpjournals.org',
  'www.annals.org',
  'www.europepmc.org',
  'guidelines.gov',

  // ── Open access journals ──────────────────────────────────────────────────
  'journals.plos.org',             // PLOS ONE
  'www.frontiersin.org',           // Frontiers
  'www.mdpi.com',                  // MDPI

  // ── Preprint servers ──────────────────────────────────────────────────────
  'www.biorxiv.org',
  'www.medrxiv.org',
  'www.researchgate.net',

  // ── Specialty society guidelines ──────────────────────────────────────────
  'www.nccn.org',                  // Oncology guidelines
  'www.aace.com',                  // Endocrinology (AACE)
  'www.isswsh.org',                // Sexual health — relevant to PT-141/hormone
  'www.issam.net',                 // Male aging / testosterone
  'www.acog.org',                  // ← ADDED: Women's health (OB/GYN)
  'www.auanet.org',                // ← ADDED: Urology (TRT/PT-141 relevant)
  'www.thyroid.org',               // ← ADDED: American Thyroid Association
];

// Keywords that signal deep clinical reasoning needed → Claude Opus
const DEEP_REASONING_PATTERNS = [
  /\bwhy\b/i, /what should i\b/i, /should i\b/i,
  /how serious\b/i, /how dangerous\b/i, /am i at risk\b/i,
  /how concerned\b/i, /what causes\b/i, /what does this mean\b/i,
  /what are my options\b/i, /what are the risks\b/i,
  /what would happen\b/i, /is this normal\b/i, /how do i treat\b/i,
  /what can i do\b/i, /explain (?:why|how|the)\b/i,
  /how does .+ affect\b/i, /interpret .+ results\b/i,
  /comprehensive (?:analysis|review|summary)\b/i,
];

function needsDeepReasoning(messages) {
  const last = [...messages].reverse().find(m => m.role === 'user');
  if (!last) return false;
  const text = typeof last.content === 'string'
    ? last.content
    : (last.content?.map?.(b => b.text||'').join(' ') || '');
  return DEEP_REASONING_PATTERNS.some(p => p.test(text));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const claudeKey = process.env.ANTHROPIC_API_KEY;
  if (!claudeKey) return res.status(500).json({ error: 'Anthropic API key not configured' });

  try {
    const body = { ...req.body };

    // ── Extract source preferences (set by frontend) ──────────────────────────
    const sources     = body._sources || { clinicalWeb: true, literature: true };
    const libraryText = body._libraryText || null;
    const isDocScan   = !!body._skipRouting;
    delete body._sources;
    delete body._libraryText;
    delete body._skipRouting;

    // ── Deep reasoning routing ────────────────────────────────────────────────
    const isDeep = !isDocScan && needsDeepReasoning(body.messages || []);
    let selectedModel = 'claude-sonnet-4-6';
    let thinkingConfig = null;
    let maxTokens = body.max_tokens || 2048;

    if (isDeep) {
      selectedModel  = 'claude-opus-4-6';
      thinkingConfig = { type: 'enabled', budget_tokens: 10000 };
      maxTokens      = 16000;
    }

    body.model      = selectedModel;
    body.max_tokens = maxTokens;
    if (thinkingConfig) body.thinking = thinkingConfig;

    // ── Build allowed_domains from source toggles ─────────────────────────────
    if (!body.tools && !isDocScan && !thinkingConfig) {
      let domains = [];
      if (sources.clinicalWeb)  domains = [...domains, ...CLINICAL_WEB_DOMAINS];
      if (sources.literature)   domains = [...domains, ...LITERATURE_DOMAINS];
      domains = [...new Set(domains)];

      if (domains.length > 0) {
        body.tools = [{
          type: 'web_search_20250305',
          name: 'web_search',
          allowed_domains: domains,
        }];
      }
    }

    // ── Inject library text into system prompt ────────────────────────────────
    // UPDATED: handles system as either a string (plain) or an array (cache format).
    // The frontend sends system as an array with cache_control for prompt caching.
    // Appending a raw string to an array would break the cache format, so we
    // detect the type and handle each case correctly.
    if (libraryText && body.system) {
      const libraryBlock = `\n\nUSER LIBRARY DOCUMENTS (uploaded PDFs/text — treat as primary source material):\n${libraryText.slice(0, 8000)}`;

      if (Array.isArray(body.system)) {
        // System is already in cache-array format — append library as a second
        // block WITHOUT cache_control so only the static system prompt is cached.
        // Library content changes per-user so it should NOT be cached.
        body.system = [
          ...body.system,
          {
            type: 'text',
            text: libraryBlock,
          }
        ];
      } else {
        // System is a plain string — safe to concatenate directly.
        body.system = body.system + libraryBlock;
      }
    }

    // ── Call Anthropic API ────────────────────────────────────────────────────
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         claudeKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta':    'prompt-caching-2024-07-31', // ← enables prompt caching
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    const mergedText = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return res.status(200).json({
      ...data,
      mergedText,
      _meta: {
        model:         selectedModel,
        deepReasoning: isDeep,
        sources,
        hasLibrary:    !!libraryText,
        // UPDATED: expose cache stats from Anthropic response for monitoring
        cacheStats: {
          cacheCreationInputTokens:  data.usage?.cache_creation_input_tokens  || 0,
          cacheReadInputTokens:      data.usage?.cache_read_input_tokens       || 0,
          inputTokens:               data.usage?.input_tokens                  || 0,
        },
      },
    });

  } catch (error) {
    return res.status(500).json({ error: 'Server error — please try again' });
  }
}

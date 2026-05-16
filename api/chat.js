// api/chat.js
// Smart proxy — routes queries to the right model automatically:
//   Simple chat   → Claude Sonnet 4.6  (fast, cheap)
//   Complex "why/should I" → Claude Opus 4.6 with extended thinking (deep reasoning)
//   Document analysis → Claude Sonnet 4.6 (PDF/image reading)

export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } },
};

// Keywords that signal the user needs deep clinical reasoning
const DEEP_REASONING_PATTERNS = [
  /\bwhy\b/i,
  /what should i\b/i,
  /should i\b/i,
  /how serious\b/i,
  /how dangerous\b/i,
  /am i at risk\b/i,
  /how concerned\b/i,
  /what causes\b/i,
  /what does this mean\b/i,
  /what are my options\b/i,
  /what are the risks\b/i,
  /what would happen\b/i,
  /is this normal\b/i,
  /how do i treat\b/i,
  /what can i do\b/i,
  /explain (?:why|how|the)\b/i,
  /how does .+ affect\b/i,
  /interpret .+ results\b/i,
  /comprehensive (?:analysis|review|summary)\b/i,
];

function needsDeepReasoning(messages) {
  const lastUser = [...messages].reverse().find(m => m.role === 'user');
  if (!lastUser) return false;
  const text = typeof lastUser.content === 'string'
    ? lastUser.content
    : lastUser.content?.map?.(b => b.text || '').join(' ') || '';
  return DEEP_REASONING_PATTERNS.some(p => p.test(text));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const claudeKey = process.env.ANTHROPIC_API_KEY;
  if (!claudeKey) return res.status(500).json({ error: 'Anthropic API key not configured' });

  try {
    const body = { ...req.body };
    const isDeep    = !body._skipRouting && needsDeepReasoning(body.messages || []);
    const isDocScan = !!body._skipRouting; // document analysis — skip routing

    delete body._skipRouting;

    // ── Model selection ───────────────────────────────────────────────────────
    let selectedModel = 'claude-sonnet-4-6';
    let thinkingConfig = null;
    let maxTokens = body.max_tokens || 2048;

    if (isDeep && !isDocScan) {
      selectedModel = 'claude-opus-4-6';
      thinkingConfig = { type: 'enabled', budget_tokens: 10000 };
      maxTokens = 16000; // must exceed budget_tokens
    }

    body.model     = selectedModel;
    body.max_tokens = maxTokens;
    if (thinkingConfig) body.thinking = thinkingConfig;

    // ── Web search tool (chat only, not doc scan) ─────────────────────────────
    if (!body.tools && !isDocScan) {
      body.tools = [{
        type: 'web_search_20250305',
        name: 'web_search',
        allowed_domains: [
          'pubmed.ncbi.nlm.nih.gov','www.ncbi.nlm.nih.gov',
          'www.cochranelibrary.com','www.nice.org.uk','www.who.int',
          'www.heart.org','www.acc.org','www.diabetes.org',
          'www.uptodate.com','www.mayoclinic.org','www.nejm.org',
          'www.thelancet.com','jamanetwork.com','www.bmj.com',
          'www.ahajournals.org','www.aafp.org','www.endocrine.org',
          'www.kidney.org',
        ],
      }];
    }

    // Extended thinking is incompatible with tool_use in a single request.
    // If deep reasoning is on, remove tools so Claude can think freely.
    if (thinkingConfig) delete body.tools;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         claudeKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    // Merge all text blocks (skipping thinking blocks)
    const mergedText = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return res.status(200).json({
      ...data,
      mergedText,
      _meta: { model: selectedModel, deepReasoning: isDeep },
    });

  } catch (error) {
    return res.status(500).json({ error: 'Server error — please try again' });
  }
}

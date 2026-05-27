// KatalysInfoPage.jsx
// Drop into src/ — rename from VitaeInfoPage.jsx or keep both.
// Props:
//   onLaunch — function called by "Use Katalys AI Now" button
//               In App.jsx pass: onLaunch={() => setPage('home')}

import { useState } from "react";
import katalysLogo from './katalys-logo.png';
import {
  Heart, Brain, Dna, Lock, Search,
  BookOpen, Zap, ChevronDown, ChevronUp, CheckCircle2,
  XCircle, Star, FileText, UploadCloud, Cpu, BarChart3,
  Microscope, ShieldCheck, Users, Info, ArrowRight,
} from "lucide-react";

const C = {
  emerald:    '#1C3D5A',
  emeraldMid: '#2D5F8A',
  emeraldLt:  '#93C5E8',
  mint:       '#D6E9F5',
  mintDark:   '#C8DFF0',
  gold:       '#D4A017',
  red:        '#C0392B',
  redLt:      '#FDECEA',
  white:      '#FFFFFF',
  offWhite:   '#F2F4F7',
  border:     '#DDE3EB',
  text:       '#1A2A3E',
  muted:      '#5A7A8A',
};

const pill = (bg, color, border) => ({
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
  letterSpacing: '.4px', textTransform: 'uppercase',
  background: bg, color, border: `1px solid ${border}`,
});

const card = (extra = {}) => ({
  background: C.white, border: `1px solid ${C.border}`,
  borderRadius: 14, padding: '24px 28px', ...extra,
});

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 36, textAlign: 'center' }}>
      <div style={{ ...pill(C.mint, C.emeraldMid, C.mintDark), marginBottom: 12, display: 'inline-flex' }}>{eyebrow}</div>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: '0 0 10px', lineHeight: 1.25 }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: C.muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, children, accent }) {
  return (
    <div style={{ ...card(), borderTop: accent ? `3px solid ${accent}` : undefined }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Icon size={20} color={C.emeraldMid} />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: C.muted, margin: 0, lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}

function CompRow({ label, katalys, chatgpt, generic }) {
  const tick = (v, lbl) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: v ? C.emeraldMid : C.red }}>
      {v ? <CheckCircle2 size={15} color={C.emeraldLt} /> : <XCircle size={15} color={C.red} />}
      {lbl}
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{label}</span>
      {tick(katalys.val,  katalys.label)}
      {tick(chatgpt.val,  chatgpt.label)}
      {tick(generic.val,  generic.label)}
    </div>
  );
}

function SourceTier({ label, sites, color, bg, border }) {
  return (
    <div style={{ ...card({ padding: '16px 20px' }), borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {sites.map(s => <span key={s} style={{ ...pill(bg, color, border), textTransform: 'none', fontSize: 12 }}>{s}</span>)}
      </div>
    </div>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 12px' }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: C.emerald, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: '6px 0 4px' }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>}
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...card({ padding: '16px 20px' }), marginBottom: 10, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{q}</span>
        {open ? <ChevronUp size={16} color={C.muted} /> : <ChevronDown size={16} color={C.muted} />}
      </div>
      {open && <p style={{ margin: '12px 0 0', fontSize: 13.5, color: C.muted, lineHeight: 1.65 }}>{a}</p>}
    </div>
  );
}

export default function KatalysInfoPage({ onLaunch }) {
  const section = (children, bg = C.white) => (
    <section style={{ background: bg, padding: '60px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>{children}</div>
    </section>
  );

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: C.text, background: C.offWhite, overflowY: 'auto', height: '100%' }}>

      {/* ── HERO ── */}
      <section style={{ background: C.emerald, color: C.white, padding: '72px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(107,158,200,.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,160,23,.10) 0%, transparent 50%)' }}/>
        <div style={{ position: 'relative', maxWidth: 740, margin: '0 auto' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <img src={katalysLogo} alt="Katalys" style={{height:32,width:'auto'}}/>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.3px' }}>Katalys Health</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', borderLeft: '1px solid rgba(255,255,255,.2)', paddingLeft: 10, marginLeft: 4 }}>by Bio Precision Aging</span>
          </div>

          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, margin: '0 0 22px', letterSpacing: '-.5px' }}>
            The World's First<br/>
            <span style={{ color: '#93C5E8' }}>Clinical-Grade AI Consultant</span>
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,.82)', margin: '0 auto 14px', maxWidth: 620 }}>
            Katalys is not a chatbot. It is a precision medicine intelligence platform built on peer-reviewed
            clinical research, proprietary peptide formulary data, and a GRADE-graded evidence framework —
            designed for patients and clinicians who demand more than search engine summaries.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', margin: '0 auto 30px', maxWidth: 600 }}>
            Katalys is also home to the <strong style={{ color: C.emeraldLt }}>world's first dedicated AI Peptide Consultant</strong> and{' '}
            <strong style={{ color: C.emeraldLt }}>AI Hormone Consultant</strong> — purpose-built specialty modules powered by a
            proprietary clinical knowledge base that no general AI chatbot, telehealth platform, or supplement
            company can match.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {['Evidence-Based Only', 'GRADE Framework', 'Zero Consumer Web', 'Proprietary KB', 'Peptide Specialist', 'Hormone Specialist'].map(t => (
              <span key={t} style={{ ...pill('rgba(255,255,255,.12)', C.emeraldLt, 'rgba(107,158,200,.3)'), fontSize: 12 }}>
                <CheckCircle2 size={11} /> {t}
              </span>
            ))}
          </div>

          {onLaunch && (
            <button
              onClick={onLaunch}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.emeraldLt, color: C.emerald, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 800, padding: '14px 32px', letterSpacing: '.1px', transition: 'opacity .15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Use Katalys AI Now <ArrowRight size={17} strokeWidth={2.5}/>
            </button>
          )}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {section(
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, borderRadius: 14, border: `1px solid ${C.border}`, background: C.white, overflow: 'hidden' }}>
          <StatCard value="20+" label="Peptides in Formulary" sub="Proprietary clinical data" />
          <StatCard value="200+" label="Studies Referenced" sub="BPC-157 alone" />
          <StatCard value="0"   label="Consumer Websites" sub="Zero Reddit, WebMD, Healthline" />
          <StatCard value="2"   label="AI Models" sub="Sonnet + Opus routing" />
          <StatCard value="100%" label="GRADE-Labeled" sub="Every clinical claim" />
        </div>,
        C.offWhite
      )}

      {/* ── COMPARISON ── */}
      {section(
        <>
          <SectionHeader
            eyebrow="Comparison"
            title="Why Katalys beats ChatGPT and generic AI"
            sub="General-purpose AI is trained to be helpful to everyone. Katalys is built to be clinically precise for you."
          />
          <div style={{ ...card({ padding: 0 }), overflow: 'hidden', marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', padding: '12px 16px', background: C.emerald, gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.4px' }}>Capability</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.emeraldLt, textTransform: 'uppercase', letterSpacing: '.4px', display: 'flex', alignItems: 'center', gap: 5 }}><Heart size={12} fill={C.emeraldLt}/>Katalys</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.4px' }}>ChatGPT</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.4px' }}>Generic Claude</span>
            </div>
            {[
              { label: 'Dedicated AI Peptide Consultant module',        katalys: { val: true,  label: 'World-first specialty module' }, chatgpt: { val: false, label: 'None' },                  generic: { val: false, label: 'None' } },
              { label: 'Dedicated AI Hormone Consultant module',        katalys: { val: true,  label: 'World-first specialty module' }, chatgpt: { val: false, label: 'None' },                  generic: { val: false, label: 'None' } },
              { label: 'Proprietary peptide clinical knowledge base',   katalys: { val: true,  label: 'Proprietary formulary' },       chatgpt: { val: false, label: 'General training only' }, generic: { val: false, label: 'General training only' } },
              { label: 'Evidence restricted to peer-reviewed journals', katalys: { val: true,  label: 'PubMed / NEJM / Cochrane' },    chatgpt: { val: false, label: 'Open web incl. Reddit' },  generic: { val: false, label: 'Open web' } },
              { label: 'GRADE evidence labeling on every claim',        katalys: { val: true,  label: 'High / Moderate / Low' },       chatgpt: { val: false, label: 'No grading system' },      generic: { val: false, label: 'No grading system' } },
              { label: 'Upload & analyze your medical records',         katalys: { val: true,  label: 'Labs, imaging, notes' },        chatgpt: { val: false, label: 'No record context' },      generic: { val: false, label: 'No record context' } },
              { label: 'Session-protected document storage',            katalys: { val: true,  label: 'Encrypted session only' },      chatgpt: { val: false, label: 'Data used for training' }, generic: { val: false, label: 'No local storage' } },
              { label: 'Deep reasoning auto-routing (Opus)',            katalys: { val: true,  label: 'Auto-triggered' },              chatgpt: { val: false, label: 'Manual selection only' },   generic: { val: false, label: 'Manual selection only' } },
              { label: 'Proactive lab flagging on upload',              katalys: { val: true,  label: 'Auto-detected' },               chatgpt: { val: false, label: 'You must ask' },            generic: { val: false, label: 'You must ask' } },
              { label: 'Consumer web permanently excluded',             katalys: { val: true,  label: 'Hard domain block' },           chatgpt: { val: false, label: 'No restriction' },          generic: { val: false, label: 'No restriction' } },
            ].map(r => <CompRow key={r.label} {...r} />)}
          </div>
          <div style={{ ...card({ background: C.mint, borderColor: C.mintDark }), display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <Info size={18} color={C.emeraldMid} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: 13.5, color: C.emeraldMid, lineHeight: 1.65 }}>
              <strong>The core difference:</strong> When you ask ChatGPT about BPC-157, it searches the open web — including Reddit threads, supplement blogs, and bodybuilding forums. When you ask Katalys, it queries a curated clinical formulary built from peer-reviewed human and animal studies, then searches PubMed and Cochrane only if additional evidence is needed. The sources are not the same. The quality is not the same.
            </p>
          </div>
        </>,
        C.white
      )}

      {/* ── EVIDENCE ARCHITECTURE ── */}
      {section(
        <>
          <SectionHeader
            eyebrow="Research Architecture"
            title="Evidence-based medicine, not the internet"
            sub="Katalys's retrieval chain is built around a single principle: clinical decisions require clinical-grade sources."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 28 }}>
            <SourceTier label="Step 1 — Proprietary KB (always first)" sites={['Katalys Peptide Formulary', 'Bio Precision Aging Clinical Notes', 'Extracted Peer-Review Data']} color={C.emeraldMid} bg={C.mint} border={C.mintDark} />
            <SourceTier label="Step 2 — Literature fallback only" sites={['PubMed / NCBI', 'Cochrane Library', 'NEJM', 'The Lancet', 'JAMA', 'BMJ', 'ACC / AHA', 'Endocrine Society', 'NIH']} color="#1560BD" bg="#EBF4FF" border="#B3D1F5" />
          </div>
          <div style={{ ...card({ background: C.redLt, borderColor: '#F5B8B8' }), marginBottom: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <XCircle size={18} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 4 }}>Permanently excluded — hard domain block</div>
              <p style={{ margin: 0, fontSize: 13, color: '#8B2020', lineHeight: 1.6 }}>
                WebMD · Healthline · Reddit · Mayo Clinic consumer pages · Bodybuilding.com · supplement retailer blogs · YouTube · any social media platform. These domains are blocked at the API proxy level — Katalys cannot retrieve from them even if prompted.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { icon: BookOpen,   title: 'GRADE Evidence Framework',   body: 'Every clinical claim is labeled: [Verified — High], [Verified — Moderate], [Verified — Low], [Speculation], or [Unknown]. No fact is presented without its evidence quality declared.' },
              { icon: Microscope, title: 'Statistics, not summaries',   body: 'Katalys presents actual study data: p-values, sample sizes, effect sizes, confidence intervals. "BPC-157 may help healing" becomes "83% tendon tensile strength recovery vs 30% control at day 14, p<0.001."' },
              { icon: BarChart3,  title: 'Bayesian clinical reasoning', body: 'Katalys reasons like a senior clinician — stating pre-test probability, updating on your uploaded records, and giving differential probabilities rather than binary yes/no answers.' },
              { icon: Cpu,        title: 'Smart model routing',          body: 'Standard questions use Claude Sonnet. Questions containing clinical reasoning triggers ("why", "should I", "how serious") automatically escalate to Claude Opus with a 10,000-token extended reasoning budget.' },
            ].map(f => <FeatureCard key={f.title} icon={f.icon} title={f.title}>{f.body}</FeatureCard>)}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── PEPTIDE CONSULTANT ── */}
      {section(
        <>
          <SectionHeader
            eyebrow="Peptide Consultant"
            title="The world's first dedicated AI Peptide Consultant"
            sub="Built by a practicing peptide clinician. Updated continuously from extracted peer-reviewed literature. Nothing else like it exists."
          />
          <div style={{ ...card({ background: C.emerald, color: C.white, marginBottom: 28 }), position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, top: -20, opacity: .06 }}><Dna size={160} color={C.white} /></div>
            <div style={{ position: 'relative' }}>
              <div style={{ ...pill(C.mint, C.emeraldMid, C.mintDark), marginBottom: 14 }}>Proprietary Knowledge Base</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,.85)', margin: '0 0 16px' }}>
                The Katalys Peptide Knowledge Base is not scraped from the internet. It is built entry-by-entry from extracted peer-reviewed research articles, with each data point carrying a specific citation, evidence grade, and clinical confidence level. No AI chatbot, no hospital website, and no telehealth platform offers this.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                {['20+ peptides with full clinical profiles','200+ studies for BPC-157 alone','Dosing: typical, range, route, cycle, notes','Mechanism of action with pathway detail','Side effect profiles with evidence grades','Stack protocols and timing guidance','CJC-1295: 4 peer-reviewed human studies extracted','Continuously updated from new literature'].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                    <CheckCircle2 size={13} color={C.emeraldLt} style={{ flexShrink: 0, marginTop: 2 }} />{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.4px' }}>Current formulary includes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {['BPC-157','TB-500','ARA-290','AOD-9604','Semaglutide','Tirzepatide','CJC-1295','Ipamorelin','PT-141','Sermorelin','Tesamorelin','Kisspeptin-10','GHK-Cu','Epithalon','Thymosin Alpha-1','Selank','Semax','KPV','MOTS-c','SS-31'].map(p => (
                <span key={p} style={{ ...pill(C.mint, C.emeraldMid, C.mintDark), fontSize: 12, textTransform: 'none' }}>
                  <Dna size={10} /> {p}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: '[Verified]',    desc: 'Peer-reviewed, statistically significant, replicated data',          bg: '#EAF7EF', color: '#1B6B38', border: '#A8D8B9' },
              { label: '[Speculation]', desc: 'Clinical reasoning without direct trial support — labeled explicitly', bg: '#FFF8E6', color: '#7A5400', border: '#FFD97A' },
              { label: '[Unknown]',     desc: 'Conflicting or absent evidence — always disclosed',                   bg: '#FFF0F0', color: '#8B2020', border: '#F5B8B8' },
            ].map(e => (
              <div key={e.label} style={{ ...card({ background: e.bg, borderColor: e.border, padding: '16px 18px' }) }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: e.color, fontFamily: 'monospace', marginBottom: 6 }}>{e.label}</div>
                <div style={{ fontSize: 13, color: e.color, lineHeight: 1.55 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </>,
        C.white
      )}

      {/* ── HORMONE CONSULTANT ── */}
      {section(
        <>
          <SectionHeader
            eyebrow="Hormone Consultant"
            title="The world's first dedicated AI Hormone Consultant"
            sub="A purpose-built specialty module for hormonal health — not a repurposed general chatbot. Guideline-anchored, clinician-calibrated."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { icon: Brain,       title: 'Full clinical system prompt',      body: 'The Hormone Consultant runs on a medical-grade system identity: a senior attending physician and clinical pharmacologist who communicates with intellectual rigor, explicit Bayesian reasoning, and proactive safety flagging.', accent: C.emeraldLt },
              { icon: FileText,    title: 'Upload your hormone labs',          body: 'Upload testosterone panels, thyroid, estradiol, cortisol, DHEA, IGF-1, or any endocrine workup. Katalys auto-detects flagged values, compares them to guideline targets (Endocrine Society, AACE), and generates a clinical interpretation.', accent: C.gold },
              { icon: Search,      title: 'Guideline-anchored responses',      body: 'Every recommendation is anchored to current Endocrine Society, AACE, or relevant specialty guideline. Katalys states the guideline, the target, your lab value, and the gap — exactly the way a real consultant would.', accent: '#5B8DEF' },
              { icon: ShieldCheck, title: 'Drug interactions & safety alerts', body: 'Katalys proactively surfaces drug interactions, contraindications, and safety signals — not only when asked, but whenever the clinical picture warrants it. The same way a department chief would catch what the ordering physician missed.', accent: C.red },
            ].map(f => <FeatureCard key={f.title} icon={f.icon} title={f.title} accent={f.accent}>{f.body}</FeatureCard>)}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── RECORDS & PRIVACY ── */}
      {section(
        <>
          <SectionHeader eyebrow="Records & Privacy" title="Your records are yours. Always." sub="Katalys handles your most sensitive medical documents. Here is exactly how it works." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              { icon: UploadCloud, title: 'Upload any medical document',   body: 'Labs, imaging reports, clinical notes, medication lists, specialist letters — upload as PDF or image. The AI analyzer extracts clinically significant findings, flags abnormal values, and categorizes the document in seconds.' },
              { icon: Lock,        title: 'Session-only storage',           body: 'Your uploaded documents exist only for the duration of your session. Never stored on external servers, never indexed, never used to train AI models, never shared with third parties. When you close the app, they are gone.' },
              { icon: ShieldCheck, title: 'Not used for AI training',       body: 'Unlike ChatGPT Plus, Katalys routes through an authenticated Anthropic API key with no data retention agreements. Your health data is not a training asset.' },
              { icon: Zap,         title: 'Instant clinical flagging',      body: 'On upload, the document analyzer automatically detects values marked H (high), L (low), or CRITICAL — and flags the record with a visual alert before you even ask a question.' },
              { icon: Users,       title: 'Full record context in AI chat', body: 'Once uploaded, your records are injected into the AI context window. Every response takes your actual values into account — your Lp(a), testosterone level, eGFR — not population averages.' },
              { icon: FileText,    title: 'Paste text & voice input',       body: 'No PDF? Use the paste panel to copy-paste lab values, prescriptions, or clinical notes. Voice input lets you describe symptoms conversationally and Katalys responds with clinical-grade precision.' },
            ].map(f => <FeatureCard key={f.title} icon={f.icon} title={f.title}>{f.body}</FeatureCard>)}
          </div>
        </>,
        C.white
      )}

      {/* ── MARKET POSITION ── */}
      {section(
        <>
          <SectionHeader eyebrow="Market Position" title="There is nothing else like this" sub="We reviewed the landscape. No product combines all of these capabilities for the consumer or patient." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 28 }}>
            {[
              { label: 'Telehealth platforms',           gap: 'Give you access to a human physician on a 15-min video call. No AI, no record analysis, no peptide knowledge base, no 3am availability.' },
              { label: 'ChatGPT / generic AI',           gap: 'General knowledge, open web sourcing including Reddit and supplement blogs, no record upload context, no GRADE labeling, no peptide or hormone specialty modules.' },
              { label: "Supplement companies' chatbots", gap: 'Commercial bias. Designed to sell products. Zero peer-reviewed evidence standards. Zero clinical framework.' },
              { label: 'Hospital patient portals',       gap: "Show you your records but won't interpret them. No AI reasoning, no clinical context, no treatment discussion." },
              { label: 'Reddit / forums',                gap: 'Anecdotal. No evidence grading. Often dangerous. No personalization to your records. Signal-to-noise ratio is poor.' },
              { label: 'Research databases (PubMed)',    gap: 'Raw literature. Requires medical training to synthesize. No interpretation layer. No personalization to patient context.' },
            ].map(({ label, gap }) => (
              <div key={label} style={{ ...card({ padding: '18px 20px' }), borderLeft: `3px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{gap}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card({ background: C.emerald, color: C.white, textAlign: 'center', padding: '32px 36px' }) }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: C.white }}>Katalys is the only platform that combines all five:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
              {['World-first dedicated AI Peptide Consultant','World-first dedicated AI Hormone Consultant','Peer-review-only evidence sourcing','Personalized to your uploaded records','GRADE evidence framework on every claim'].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
                  <Star size={12} color={C.gold} fill={C.gold} /> {i}
                </div>
              ))}
            </div>
            {onLaunch && (
              <button
                onClick={onLaunch}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.emeraldLt, color: C.emerald, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 800, padding: '14px 32px', letterSpacing: '.1px' }}
              >
                Use Katalys AI Now <ArrowRight size={17} strokeWidth={2.5}/>
              </button>
            )}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── FAQ ── */}
      {section(
        <>
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          {[
            { q: 'Is Katalys a replacement for my doctor?',               a: "No. Katalys is a clinical decision-support and education platform. Every response ends with a clinical disclaimer. Katalys is designed to make you a more informed patient or a better-prepared clinician — not to replace the physician relationship." },
            { q: 'Where does the peptide knowledge come from?',           a: "The Katalys peptide knowledge base is built by a practicing peptide clinician who uploads peer-reviewed research articles directly into the system. Each article is read by Claude, which extracts dosing, mechanisms, side effects, evidence levels, and citations into structured entries in the proprietary formulary. This data is then injected into every peptide consultation as primary reference material." },
            { q: "Why can't I just use ChatGPT for this?",               a: "ChatGPT has no peptide-specific clinical knowledge base, no GRADE evidence framework, no restriction on sources (it will cite Reddit and bodybuilding forums alongside NEJM), no ability to analyze your uploaded medical records in clinical context, and no routing to a deeper reasoning model for complex clinical questions. The difference in output quality for specialized clinical questions is significant." },
            { q: 'How does Katalys decide when to use the more powerful model?', a: 'The API proxy analyzes every query against clinical reasoning trigger patterns: "why", "should I", "how serious", "what does this mean", "what are my options". When a trigger is detected, the request is automatically routed to Claude Opus with a 10,000-token extended reasoning budget — the equivalent of asking a senior consultant instead of a junior resident.' },
            { q: 'Can I upload any medical document?',                    a: "Yes. Katalys accepts PDFs and images of labs, imaging reports, clinical notes, medication lists, and specialist letters. The analyzer auto-detects document type, date, provider, and flags any values outside reference range. You can also paste text directly using the paste panel." },
            { q: 'What is the GRADE evidence framework?',                 a: 'GRADE (Grading of Recommendations Assessment, Development and Evaluation) is the international standard for rating clinical evidence quality. Katalys applies it to every clinically significant claim: [Verified — High] for RCTs and strong systematic reviews, [Verified — Moderate] for RCTs with limitations, [Verified — Low] for observational data, [Speculation] for clinical reasoning without direct trial support, and [Unknown] for conflicting or absent evidence.' },
          ].map(f => <FAQ key={f.q} {...f} />)}
        </>,
        C.white
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: C.emerald, padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <img src={katalysLogo} alt="Katalys" style={{height:22,width:'auto'}}/>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.white }}>Katalys Health</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', margin: '0 auto', maxWidth: 520, lineHeight: 1.65 }}>
          For educational and clinical decision-support purposes only. All management decisions should be made in the context of the full clinical picture by the treating clinician. Katalys Health is not a licensed medical practice and does not establish a physician-patient relationship.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 14 }}>
          Powered by{' '}
          <a href="https://www.bioprecisionaging.com" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Bio Precision Aging</a>
          {' '}· Built with Anthropic Claude API
        </p>
      </footer>
    </div>
  );
}

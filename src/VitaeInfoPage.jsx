// src/VitaeInfoPage.jsx
// "What is VITAE AI" — platform information page
// Reconstructed May 2026 from approved design session

import { useState } from 'react';
import { Heart, CheckCircle2, XCircle, ChevronDown, ChevronUp, Shield, Database, Search, Brain, Dna, FlaskConical } from 'lucide-react';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  emerald:   '#1B4332',
  emeraldMd: '#2D6A4F',
  emeraldLt: '#52B788',
  emeraldPl: '#D8F3DC',
  white:     '#FFFFFF',
  offWhite:  '#F8FAF9',
  text:      '#111827',
  muted:     '#6B7280',
  border:    '#E5E7EB',
  gold:      '#D4A017',
  goldLt:    '#FEF9C3',
  red:       '#DC2626',
  redLt:     '#FEE2E2',
  blue:      '#1D4ED8',
  blueLt:    '#EFF6FF',
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Pill({ children, color = C.emeraldPl, textColor = C.emeraldMd }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: color, color: textColor,
      fontSize: 12, fontWeight: 600, padding: '4px 12px',
      borderRadius: 20, letterSpacing: '.2px',
    }}>
      {children}
    </span>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: C.emeraldLt, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: '6px 0 4px' }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>}
    </div>
  );
}

function FeatureCard({ icon, title, body }) {
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: '20px', display: 'flex', gap: 14,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, background: C.emeraldPl,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        color: C.emeraldMd,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{body}</div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '16px 0', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', background: 'none',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text, paddingRight: 16 }}>{q}</span>
        {open ? <ChevronUp size={18} color={C.emeraldMd} /> : <ChevronDown size={18} color={C.muted} />}
      </button>
      {open && (
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, paddingBottom: 16 }}>{a}</div>
      )}
    </div>
  );
}

// ─── Comparison table data ────────────────────────────────────────────────────
const COMPARE_ROWS = [
  { cap: 'Dedicated AI Peptide Consultant module',          v: true,  gpt: false, gc: false },
  { cap: 'Dedicated AI Hormone Consultant module',          v: true,  gpt: false, gc: false },
  { cap: 'Proprietary peptide formulary knowledge base',    v: true,  gpt: false, gc: false },
  { cap: 'GRADE-labeled evidence on every claim',           v: true,  gpt: false, gc: false },
  { cap: 'PubMed / Cochrane / NEJM as sole web sources',    v: true,  gpt: false, gc: false },
  { cap: 'Hard-blocks consumer health sites (WebMD, etc.)', v: true,  gpt: false, gc: false },
  { cap: 'Deep reasoning mode (Opus) for complex queries',  v: true,  gpt: false, gc: false },
  { cap: 'Reads and flags uploaded lab / imaging reports',  v: true,  gpt: true,  gc: true  },
  { cap: 'Built-in hormone optimization treatment algorithm',v: true, gpt: false, gc: false },
  { cap: 'No account or API key required',                  v: true,  gpt: false, gc: false },
  { cap: 'Session-only data — nothing stored on any server',v: true,  gpt: false, gc: false },
  { cap: 'Designed for clinical decision-support',          v: true,  gpt: false, gc: false },
];

function Check({ yes }) {
  return yes
    ? <CheckCircle2 size={18} color={C.emeraldLt} />
    : <XCircle size={18} color='#D1D5DB' />;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VitaeInfoPage({ onLaunch }) {
  const section = (children, bg = C.offWhite) => (
    <section style={{ background: bg, padding: '60px 24px', width: '100%', boxSizing: 'border-box', display: 'block' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>{children}</div>
    </section>
  );

  const sectionHead = (label, title, sub) => (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: C.emeraldLt, textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: '0 0 12px', lineHeight: 1.2 }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: C.text, background: C.offWhite, width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: C.emerald, color: C.white,
        padding: '72px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        width: '100%', boxSizing: 'border-box', display: 'block',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(82,183,136,.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,160,23,.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          {/* Brand */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <Heart size={22} fill={C.emeraldLt} color={C.emeraldLt}/>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.3px' }}>Vitae</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', borderLeft: '1px solid rgba(255,255,255,.2)', paddingLeft: 10, marginLeft: 4 }}>
              by Bio Precision Aging
            </span>
          </div>

          {/* Specialty badges */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <Pill color='rgba(82,183,136,.25)' textColor={C.emeraldLt}><Dna size={12}/>Peptide Specialist</Pill>
            <Pill color='rgba(82,183,136,.25)' textColor={C.emeraldLt}><Brain size={12}/>Hormone Specialist</Pill>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: '0 0 18px', letterSpacing: '-.5px' }}>
            The World's First<br/>
            <span style={{ color: C.emeraldLt }}>Clinical-Grade AI Consultant</span>
          </h1>

          {/* Sub copy */}
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,.82)', margin: '0 auto 14px', maxWidth: 600 }}>
            Vitae is not a chatbot. It is a precision medicine intelligence platform built on peer-reviewed
            clinical research, proprietary peptide formulary data, and a GRADE-graded evidence framework —
            designed for patients and clinicians who demand more than search engine summaries.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,.7)', margin: '0 auto 30px', maxWidth: 580 }}>
            Vitae also features the world's first dedicated AI Peptide Consultant and AI Hormone Consultant
            specialty modules — powered by the best available peer-reviewed clinical evidence and proprietary
            formulary data from Bio Precision Aging.
          </p>

          {/* Brand promise pills */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {['Evidence-Based Only', 'GRADE Framework', 'Zero Consumer Web', 'Proprietary KB'].map(p => (
              <Pill key={p} color='rgba(255,255,255,.12)' textColor='rgba(255,255,255,.9)'>✓ {p}</Pill>
            ))}
          </div>

          {/* CTA */}
          {onLaunch && (
            <button onClick={onLaunch} style={{
              background: C.emeraldLt, color: C.emerald, border: 'none',
              padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.2px',
              transition: 'opacity .15s',
            }}
            onMouseEnter={e => e.target.style.opacity = '.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}>
              Use VITAE AI Now →
            </button>
          )}
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ background: C.white, borderBottom: `1px solid ${C.border}`, width: '100%', boxSizing: 'border-box', display: 'block' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
          <StatCard value="20+" label="Peptides in formulary"     sub="With full dosing protocols" />
          <StatCard value="200+" label="Studies extracted"        sub="Peer-reviewed only" />
          <StatCard value="0"    label="Consumer health sites"    sub="WebMD, Healthline blocked" />
          <StatCard value="2"    label="AI model tiers"           sub="Sonnet + Opus (deep reasoning)" />
          <StatCard value="100%" label="GRADE-labeled"            sub="Every clinical claim verified" />
        </div>
      </section>

      {/* ── COMPARISON TABLE ───────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'Market position',
            'How VITAE AI compares',
            'Generic AI tools were not built for clinical medicine. Every capability below reflects a deliberate design decision — not an accident of scale.'
          )}
          <div style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${C.border}`, background: C.white }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Georgia', serif" }}>
              <thead>
                <tr style={{ background: C.emerald }}>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.7)', width: '50%' }}>Capability</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: C.emeraldLt }}>VITAE AI</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>ChatGPT</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>Generic Claude</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : C.offWhite }}>
                    <td style={{ padding: '13px 18px', fontSize: 13, color: C.text, lineHeight: 1.5 }}>{row.cap}</td>
                    <td style={{ padding: '13px 12px', textAlign: 'center' }}><Check yes={row.v} /></td>
                    <td style={{ padding: '13px 12px', textAlign: 'center' }}><Check yes={row.gpt} /></td>
                    <td style={{ padding: '13px 12px', textAlign: 'center' }}><Check yes={row.gc} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA below table */}
          {onLaunch && (
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <button onClick={onLaunch} style={{
                background: C.emerald, color: C.white, border: 'none',
                padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Use VITAE AI Now →
              </button>
            </div>
          )}
        </>,
        C.offWhite
      )}

      {/* ── EVIDENCE ARCHITECTURE ──────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'Evidence retrieval',
            'How VITAE AI finds answers',
            'A 3-step retrieval chain ensures clinical accuracy while eliminating noise from consumer health websites.'
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                step: '1', icon: <Database size={20}/>, color: C.emeraldPl, tcolor: C.emeraldMd,
                title: 'Proprietary knowledge base first',
                body: 'All 20+ peptide entries from the Bio Precision Aging formulary are injected directly into every response. Dosing, mechanisms, stacking protocols, evidence grades — no search required. If the answer is here, VITAE responds instantly without hitting the web.',
              },
              {
                step: '2', icon: <Search size={20}/>, color: '#EFF6FF', tcolor: C.blue,
                title: 'PubMed / Cochrane / NEJM fallback only',
                body: 'When the proprietary KB is insufficient, VITAE searches peer-reviewed literature exclusively: PubMed, Cochrane Library, NEJM, JAMA, The Lancet, BMJ, ACC/AHA, Endocrine Society, and 12 other approved clinical sources. Every web search result is cited with PMID or journal DOI.',
              },
              {
                step: '3', icon: <Shield size={20}/>, color: C.redLt, tcolor: C.red,
                title: 'Hard-blocked: consumer health sites',
                body: 'WebMD, Healthline, Mayo Clinic (patient-facing), Reddit, forums, supplement brand sites, and all consumer health content are explicitly excluded at the API level — not filtered after the fact. These sources cannot enter a VITAE response under any circumstances.',
              },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 16, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.tcolor }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: s.tcolor }}>Step {s.step}</div>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 7 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Banned domains callout */}
          <div style={{ marginTop: 20, background: C.redLt, border: `1px solid #FECACA`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Hard-blocked sources — never appear in VITAE responses</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['WebMD', 'Healthline', 'Mayo Clinic (patient)', 'Reddit', 'Drugs.com', 'RxList', 'NHS.uk (patient)', 'Wikipedia', 'Supplement brand sites', 'Health forums', 'News articles', 'Social media'].map(d => (
                <span key={d} style={{ fontSize: 12, background: C.white, color: C.red, border: `1px solid #FECACA`, padding: '3px 10px', borderRadius: 20 }}>{d}</span>
              ))}
            </div>
          </div>
        </>,
        C.white
      )}

      {/* ── PEPTIDE CONSULTANT ─────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'Specialty module',
            "The world's first dedicated AI Peptide Consultant",
            'Built on 20+ peer-reviewed peptide entries, 200+ extracted studies, and the Bio Precision Aging proprietary formulary — delivering practitioner-grade peptide guidance that no generic AI can match.'
          )}
          <div style={{ background: C.emerald, borderRadius: 14, padding: '24px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.emeraldLt, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>Formulary — 20+ peptides</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {['BPC-157', 'TB-500', 'CJC-1295', 'Ipamorelin', 'Semaglutide', 'Tirzepatide', 'PT-141', 'Sermorelin', 'Tesamorelin', 'Kisspeptin-10', 'GHK-Cu', 'Epithalon', 'Thymosin Alpha-1', 'ARA-290', 'AOD-9604', 'Selank', 'Semax', 'KPV', 'MOTS-c', 'SS-31'].map(p => (
                <span key={p} style={{ fontSize: 12, fontWeight: 600, background: 'rgba(82,183,136,.18)', color: C.emeraldLt, padding: '4px 11px', borderRadius: 20, border: '1px solid rgba(82,183,136,.3)' }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { label: '[Verified]', desc: 'Peer-reviewed, RCT or strong cohort data', color: '#D1FAE5', tx: '#065F46' },
              { label: '[Speculation]', desc: 'Mechanistic reasoning, clinical experience', color: C.goldLt, tx: '#854D0E' },
              { label: '[Unknown]', desc: 'Conflicting or absent evidence — stated explicitly', color: '#F3F4F6', tx: '#374151' },
            ].map(e => (
              <div key={e.label} style={{ background: e.color, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: e.tx, fontFamily: 'monospace', marginBottom: 5 }}>{e.label}</div>
                <div style={{ fontSize: 12, color: e.tx, opacity: .85, lineHeight: 1.5 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── HORMONE CONSULTANT ─────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'Specialty module',
            "The world's first dedicated AI Hormone Consultant",
            'Evidence-based hormone optimization guidance for men and women — covering TRT, HCG, enclomiphene, progesterone, estradiol, DHEA, thyroid, and more. Built on peer-reviewed endocrinology guidelines and a proprietary treatment algorithm.'
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: <Brain size={18}/>, title: 'Men\'s hormone optimization', body: 'TRT protocols, HCG monotherapy, enclomiphene, SHBG management, and cardiovascular monitoring.' },
              { icon: <FlaskConical size={18}/>, title: 'Women\'s hormone optimization', body: 'Menopause, perimenopause, progesterone, estradiol, DHEA, thyroid, and adrenal protocols.' },
              { icon: <Database size={18}/>, title: 'Treatment algorithm', body: 'Built-in clinical decision framework walks through diagnosis, labs, first-line therapy, and escalation.' },
              { icon: <Shield size={18}/>, title: 'GRADE-labeled guidance', body: 'Every treatment recommendation is labeled [Verified — High/Moderate/Low] or [Speculation].' },
            ].map(f => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </>,
        C.white
      )}

      {/* ── RECORDS & PRIVACY ──────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'Records & privacy',
            'Your data, your session',
            'Every record you upload stays in your browser session. Nothing is sent to a database. Closing the tab clears everything.'
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              { icon: <Shield size={18}/>, title: 'Session-only storage', body: 'No database, no account, no retention. Your records exist only in your browser tab for the duration of your session.' },
              { icon: <CheckCircle2 size={18}/>, title: 'Auto-flagging', body: 'Claude AI automatically flags any value outside its reference range — H, L, CRITICAL — and surfaces them for review.' },
              { icon: <Database size={18}/>, title: 'Full context for AI', body: 'Every uploaded record is referenced by the AI when you ask questions — no copy-pasting values into the chat.' },
              { icon: <Search size={18}/>, title: 'PDF & image support', body: 'Upload lab PDFs, imaging reports, visit notes, and medication lists. Claude reads and categorizes each one.' },
              { icon: <Brain size={18}/>, title: 'Voice input', body: 'Tap the microphone to speak your question instead of typing. Works on mobile and desktop.' },
              { icon: <FlaskConical size={18}/>, title: 'Paste health text', body: 'Paste raw lab values, symptom descriptions, or doctor notes directly. Claude analyzes and saves to your records.' },
            ].map(f => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── MARKET GAP ─────────────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead(
            'The gap VITAE fills',
            'Why nothing else does this',
            'Every existing tool fails in at least one critical dimension. VITAE was built specifically to close all of them simultaneously.'
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {[
              { cat: 'Telehealth platforms', why: 'Provide access to physicians but no AI reasoning. You wait days for a message that may not reference your labs.' },
              { cat: 'ChatGPT / generic LLMs', why: 'No clinical guardrails, no source restrictions, no GRADE labeling. Will confidently cite WebMD and Reddit.' },
              { cat: 'Supplement chatbots', why: 'Optimized to sell products, not provide unbiased clinical guidance. Evidence quality is never labeled.' },
              { cat: 'Hospital patient portals', why: 'Show your results but provide no interpretation. "Normal" and "Flagged" with no clinical context.' },
              { cat: 'Reddit / forums', why: 'High engagement, zero clinical rigor. Anecdote presented as evidence. No dosing safety framework.' },
              { cat: 'PubMed direct search', why: 'Powerful but requires clinical literacy to interpret. No synthesis, no GRADE, no personalization.' },
            ].map(g => (
              <div key={g.cat} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>{g.cat}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{g.why}</div>
                <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: C.red, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <XCircle size={12}/> Does not close the gap
                </div>
              </div>
            ))}
          </div>
        </>,
        C.white
      )}

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      {section(
        <>
          {sectionHead('FAQ', 'Common questions')}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '8px 20px' }}>
            {[
              {
                q: 'Is VITAE AI replacing my doctor?',
                a: 'No. VITAE AI is a clinical decision-support tool, not a licensed medical provider. It helps you understand your results, prepare better questions for your physician, and navigate the evidence — but all treatment decisions should be made with a qualified clinician.'
              },
              {
                q: 'Where does the information come from?',
                a: 'VITAE uses a two-tier system: first, a proprietary formulary built from peer-reviewed literature extraction; second, real-time searches of PubMed, Cochrane Library, NEJM, JAMA, and other approved clinical databases. Consumer health websites are explicitly blocked.'
              },
              {
                q: 'How is VITAE different from just asking ChatGPT?',
                a: 'ChatGPT has no source restrictions and no evidence-quality labeling. It can cite WebMD, Reddit, and supplement brand websites. VITAE blocks those sources at the API level, labels every claim with GRADE evidence grades, and has a built-in proprietary peptide and hormone knowledge base that no generic model has.'
              },
              {
                q: 'What is the deep reasoning mode?',
                a: 'For complex clinical questions — differential diagnoses, risk assessment, multi-system interactions — VITAE automatically routes to Claude Opus with extended thinking enabled. This takes longer but produces substantially more rigorous clinical reasoning. Simple factual queries use the faster Claude Sonnet model.'
              },
              {
                q: 'Can I upload multiple documents?',
                a: 'Yes. Upload any combination of PDFs and images — lab results, imaging reports, visit notes, and medication lists. Claude reads every document, categorizes it automatically, flags out-of-range values, and references all of them when you ask clinical questions.'
              },
              {
                q: 'What does GRADE mean?',
                a: 'GRADE (Grading of Recommendations, Assessment, Development and Evaluations) is the global standard framework for rating evidence quality in clinical medicine. VITAE labels every significant claim as [Verified — High/Moderate/Low], [Speculation], or [Unknown] so you always know how much confidence to place in the guidance.'
              },
            ].map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </>,
        C.offWhite
      )}

      {/* ── FOOTER CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.emerald, padding: '60px 24px', textAlign: 'center', width: '100%', boxSizing: 'border-box', display: 'block' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <Heart size={28} fill={C.emeraldLt} color={C.emeraldLt} style={{ marginBottom: 16 }}/>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: C.white, margin: '0 0 14px' }}>Ready to start?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.75)', margin: '0 0 28px', lineHeight: 1.7 }}>
            No account. No API key. Your data never leaves your browser. Enter your age and biological sex to get started.
          </p>
          {onLaunch && (
            <button onClick={onLaunch} style={{
              background: C.emeraldLt, color: C.emerald, border: 'none',
              padding: '14px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Use VITAE AI Now →
            </button>
          )}
          <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>
            Powered by Bio Precision Aging · bioprecisionaging.com<br/>
            For clinical decision-support purposes only. Not a substitute for professional medical advice.
          </div>
        </div>
      </section>

    </div>
  );
}

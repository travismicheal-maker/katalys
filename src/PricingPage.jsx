// src/PricingPage.jsx
// Katalys Health — Plans & Pricing page
// Styled to match App.jsx design system exactly

import { useState } from 'react';
import { CheckCircle2, XCircle, Heart, Zap, Brain, Dna, Star, ChevronRight } from 'lucide-react';

const PLANS = [
  {
    id: 'explorer',
    name: 'Explorer',
    badge: 'Free sample',
    badgeBg: '#F0ECE6',
    badgeTx: '#6B7280',
    price: '$0',
    period: '',
    priceSub: 'No credit card needed',
    limitLine: '3 AI inquiries total, then upgrade prompt',
    limitIcon: '🔒',
    cta: 'Get started free',
    ctaStyle: 'outline',
    featured: false,
    features: [
      { ok: true,  text: 'All 3 consultant modules (view only)' },
      { ok: true,  text: 'Peptide library — read access' },
      { ok: true,  text: '3 AI inquiries to try the platform' },
      { ok: false, text: 'Record uploads' },
      { ok: false, text: 'Voice input' },
      { ok: false, text: 'PDF export' },
      { ok: false, text: 'Opus deep reasoning' },
    ],
  },
  {
    id: 'essential',
    name: 'Essential',
    badge: 'Most popular',
    badgeBg: '#EFF6FF',
    badgeTx: '#1D4ED8',
    price: '$9',
    period: '/ month',
    priceSub: 'Billed monthly, cancel anytime',
    limitLine: '50 inquiries per month',
    limitIcon: '⚡',
    cta: 'Start Essential',
    ctaStyle: 'primary',
    featured: true,
    features: [
      { ok: true,  text: 'All 3 consultant modules — full access' },
      { ok: true,  text: 'Upload up to 10 medical records' },
      { ok: true,  text: 'Voice input on all consultants' },
      { ok: true,  text: 'PDF export of AI responses' },
      { ok: true,  text: 'Clinical web + literature search' },
      { ok: false, text: 'Opus deep reasoning mode' },
      { ok: false, text: 'Unlimited record uploads' },
    ],
  },
  {
    id: 'clinical',
    name: 'Clinical',
    badge: 'Full access',
    badgeBg: '#C8DFF0',
    badgeTx: '#0C447C',
    price: '$29',
    period: '/ month',
    priceSub: 'Billed monthly, cancel anytime',
    limitLine: '200 inquiries / mo — Opus unlocked',
    limitIcon: '🧠',
    cta: 'Start Clinical',
    ctaStyle: 'accent',
    featured: false,
    features: [
      { ok: true,  text: 'Everything in Essential' },
      { ok: true,  text: 'Opus deep reasoning for complex queries' },
      { ok: true,  text: 'Unlimited medical record uploads' },
      { ok: true,  text: 'Priority response speed' },
      { ok: true,  text: 'Share + export all consultation outputs' },
      { ok: true,  text: 'Access to new features first' },
      { ok: true,  text: '200 inquiries per month' },
    ],
  },
];

const FAQS = [
  {
    q: 'What counts as one inquiry?',
    a: 'Each message you send to an AI consultant counts as one inquiry — whether that\'s a question about a peptide, a hormone optimization request, or asking the AI to analyze your lab values. Follow-up messages in the same conversation each count separately.',
  },
  {
    q: 'Can I upgrade or downgrade at any time?',
    a: 'Yes. You can change your plan at any time from this page or your profile. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.',
  },
  {
    q: 'What is Opus deep reasoning?',
    a: 'Clinical tier unlocks Claude Opus — Anthropic\'s most powerful model — for complex multi-system clinical questions, differential diagnoses, and risk assessments. Katalys routes to Opus automatically when your query warrants it. Simpler questions use the faster Sonnet model regardless of tier.',
  },
  {
    q: 'Is my data stored anywhere?',
    a: 'No. Katalys uses session-only storage. Your uploaded records and conversation history exist only in your browser tab. Nothing is saved to any database. Closing the tab clears everything — regardless of your plan tier.',
  },
  {
    q: 'Do you accept HSA / FSA cards?',
    a: 'Katalys is a clinical decision-support tool, not a medical provider — so HSA/FSA eligibility depends on your specific plan. Many users successfully submit AI health tools as eligible expenses, but we recommend checking with your HSA/FSA administrator.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--bd)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", gap: 12 }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx)', lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 18, color: 'var(--g5)', flexShrink: 0, transition: 'transform .2s', display: 'block', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      {open && <div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.7, paddingBottom: 16 }}>{a}</div>}
    </div>
  );
}

export default function PricingPage({ onSelectPlan, currentTier = 'explorer' }) {
  const [billing] = useState('monthly');

  const handleCta = (planId) => {
    if (planId === 'explorer') return;
    if (onSelectPlan) onSelectPlan(planId);
    else window.open('https://katalyshealth.com/upgrade', '_blank');
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--tx)', maxWidth: 900, margin: '0 auto', padding: '0 0 60px' }}>

      {/* ── Hero header ── */}
      <div style={{ background: 'linear-gradient(140deg,#1C3D5A,#2D5F8A 55%,#3D7BAA)', borderRadius: 'var(--rd)', padding: '32px 28px', color: '#fff', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(107,158,200,.12)', borderRadius: '50%', top: -60, right: -40, pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Heart size={16} fill="#6B9EC8" color="#6B9EC8" />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', letterSpacing: '.3px' }}>Katalys Health · Bio Precision Aging</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>Choose your plan</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.78)', lineHeight: 1.65, maxWidth: 520 }}>
            Start free with 3 sample inquiries — no credit card. Upgrade when you're ready for full access to all three AI specialist consultants.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            {['GRADE evidence on every claim', 'PubMed sources only', 'Session-only privacy', 'Cancel anytime'].map(p => (
              <span key={p} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.88)' }}>✓ {p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Plan cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginBottom: 32 }}>
        {PLANS.map(plan => (
          <div key={plan.id} style={{
            background: 'var(--surf)',
            border: plan.featured ? '2px solid #1D4ED8' : '1px solid var(--bd)',
            borderRadius: 'var(--rd)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: plan.featured ? '0 4px 24px rgba(29,78,216,.1)' : 'none',
          }}>
            {/* Current plan indicator */}
            {plan.id === currentTier && (
              <div style={{ position: 'absolute', top: -1, right: 16, background: '#6B9EC8', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 8px 8px', letterSpacing: '.3px' }}>CURRENT PLAN</div>
            )}

            <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: plan.badgeBg, color: plan.badgeTx, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 10, alignSelf: 'flex-start', letterSpacing: '.2px' }}>
              {plan.badge}
            </div>

            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: 'var(--tx)', marginBottom: 4 }}>{plan.name}</div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 2 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--g9)' }}>{plan.price}</span>
              {plan.period && <span style={{ fontSize: 13, color: 'var(--mu)' }}>{plan.period}</span>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--mu)', marginBottom: 14 }}>{plan.priceSub}</div>

            <div style={{ background: 'var(--bg)', borderRadius: 'var(--rds)', padding: '8px 12px', fontSize: 12, color: 'var(--mu)', marginBottom: 16, display: 'flex', gap: 7, alignItems: 'center' }}>
              <span>{plan.limitIcon}</span>
              <span>{plan.limitLine}</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>
                    {f.ok
                      ? <CheckCircle2 size={15} color="#6B9EC8" />
                      : <XCircle size={15} color="#D1D5DB" />}
                  </span>
                  <span style={{ color: f.ok ? 'var(--tx)' : 'var(--mu)', lineHeight: 1.45 }}>{f.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleCta(plan.id)}
              disabled={plan.id === currentTier}
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: 'var(--rds)',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: plan.id === currentTier ? 'default' : 'pointer',
                border: plan.ctaStyle === 'outline' ? '1.5px solid var(--g9)' : 'none',
                background: plan.id === currentTier ? 'var(--bg)' : plan.ctaStyle === 'primary' ? '#1D4ED8' : plan.ctaStyle === 'accent' ? 'var(--g9)' : 'transparent',
                color: plan.id === currentTier ? 'var(--mu)' : plan.ctaStyle === 'outline' ? 'var(--g9)' : '#fff',
                transition: 'all .15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                opacity: plan.id === currentTier ? .6 : 1,
              }}
            >
              {plan.id === currentTier ? 'Current plan' : plan.cta}
              {plan.id !== currentTier && <ChevronRight size={14} />}
            </button>
          </div>
        ))}
      </div>

      {/* ── Feature comparison callout ── */}
      <div style={{ background: '#EEF5FB', border: '1px solid #C8DFF0', borderRadius: 'var(--rd)', padding: '20px 24px', marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {[
          { icon: <Dna size={18} color="#2D5F8A" />, title: 'Peptide Consultant', sub: 'All tiers', body: '21+ peptides, full dosing protocols, stacking strategies, GRADE evidence' },
          { icon: <Brain size={18} color="#2D5F8A" />, title: 'Hormone Consultant', sub: 'All tiers', body: 'TRT, HCG, estradiol, progesterone, DHEA, thyroid — men and women' },
          { icon: <Zap size={18} color="#2D5F8A" />, title: 'AI Medical Consultant', sub: 'All tiers', body: 'Lab interpretation, clinical guidelines, differential reasoning, GRADE labels' },
          { icon: <Star size={18} color="#2D5F8A" />, title: 'Opus deep reasoning', sub: 'Clinical only', body: 'Complex multi-system queries routed to Claude Opus with extended thinking' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: '#C8DFF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--g9)', marginBottom: 1 }}>{f.title}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#2D5F8A', opacity: .65, letterSpacing: '.3px', marginBottom: 4, textTransform: 'uppercase' }}>{f.sub}</div>
              <div style={{ fontSize: 12, color: '#2D5F8A', opacity: .8, lineHeight: 1.55 }}>{f.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Evidence / trust bar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 10, marginBottom: 32 }}>
        {[
          { val: '21+', lbl: 'Peptides in formulary' },
          { val: '200+', lbl: 'BPC-157 studies extracted' },
          { val: '0', lbl: 'Consumer health sites used' },
          { val: '100%', lbl: 'GRADE-labeled responses' },
        ].map(s => (
          <div key={s.lbl} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 'var(--rd)', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--g5)', lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: 'var(--mu)', marginTop: 6, lineHeight: 1.4 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── FAQ ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: 'var(--tx)', marginBottom: 16 }}>Frequently asked questions</div>
        <div style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 'var(--rd)', padding: '4px 20px' }}>
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>

      {/* ── Footer disclaimer ── */}
      <div style={{ fontSize: 11, color: 'var(--mu)', textAlign: 'center', lineHeight: 1.7, padding: '0 16px' }}>
        Powered by <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g9)', fontWeight: 600, textDecoration: 'none' }}>Bio Precision Aging</a> · katalyshealth.com<br />
        Katalys Health is a clinical decision-support tool, not a licensed medical provider. For educational purposes only.<br />
        Payments processed securely by Lemon Squeezy. Cancel anytime — no questions asked.
      </div>
    </div>
  );
}

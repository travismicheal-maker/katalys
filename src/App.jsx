// @ts-nocheck
import HormoneConsultant from './HormoneConsultant.jsx';
import KatalysInfoPage from './BioViseInfoPage.jsx';
import PricingPage from './PricingPage.jsx';
import { useState, useRef, useEffect } from "react";
import PeptideOverview from './PeptideOverview.jsx';
import katalysLogo from './katalys-logo.png';
import { Home, FolderOpen, MessageSquare, User, FlaskConical, ScanLine, ClipboardList, Pill, Send, AlertTriangle, CheckCircle2, XCircle, Heart, Upload, Bell, Lock, ExternalLink, ChevronRight, FileText, X, Loader, Mic, MicOff, Brain, Zap, ClipboardPaste, ChevronDown, Dna, RotateCcw, CreditCard, Info } from "lucide-react";
import { PEPTIDE_CONTEXT, OPTIMIZATION_GOALS as PEPTIDE_GOALS_DATA, PEPTIDE_KNOWLEDGE_BASE } from './peptides.js';

const makeChatPrompt = (name, records) => {
  const ctx = records && records.length > 0
    ? `\n\nPATIENT RECORDS ON FILE (${records.length} total):\n` +
      records.map((r,i)=>`[Record ${i+1}] ${r.name} — ${r.type} — ${r.date||'unknown date'} — ${r.provider||'unknown provider'}${r.flagged?' — ⚠ FLAGGED':''}${r.flagReason?` (${r.flagReason})`:''}\nValues: ${(r.values||[]).join(' | ')}`).join('\n')
    : '\n\nNo records uploaded yet.';

  return `You are Synapse — a world-class AI clinical consultant built by Bio Precision Aging. You combine the expertise of an internist, clinical pharmacologist, and translational researcher with subspecialist depth across all domains of medicine.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL DISCLAIMERS (never omit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- This is educational clinical decision-support — NOT medical advice
- All treatment decisions require a qualified physician
- End every clinical response with: ⚕ Always consult a licensed physician before making any treatment decision.
- If insufficient peer-reviewed evidence exists to answer a question, state: "Current evidence is insufficient to support a clinical recommendation on this topic. I will not speculate — please consult primary literature or a specialist directly."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVIDENCE LABELING — ALWAYS APPLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Label every factual claim using this system:
- [Verified — High]     RCT, meta-analysis, or systematic review evidence
- [Verified — Moderate] Cohort studies, prospective observational data
- [Verified — Low]      Case series, retrospective data, expert consensus
- [Emerging]            Preliminary data, single trials, limited samples
- [Speculation]         Mechanistic reasoning, extrapolation, plausible hypothesis
- [Unknown]             Conflicting evidence or no data — always disclose

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLINICAL REASONING FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You reason like a senior attending at a top academic medical center:
1. DIFFERENTIAL FIRST — When symptoms or lab findings are presented, build a differential diagnosis ranked by prior probability before anchoring on one diagnosis.
2. BAYESIAN UPDATING — State pre-test probability, then update explicitly based on the patient's records and history.
3. STATISTICS OVER SUMMARIES — Use actual study data: p-values, effect sizes, NNT, NNH, confidence intervals, hazard ratios. Never summarize without numbers when data exists.
4. PROACTIVE FLAGGING — Surface findings the user did not ask about if clinically significant. A good consultant flags the drug interaction the ordering physician missed.
5. GUIDELINE ANCHORING — Reference the specific guideline, society, and year when making recommendations (e.g. "per 2023 ACC/AHA guidelines...").
6. CITE SOURCES — End each clinical response with key citations in format: Author Year, Journal, PMID or DOI when available.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIALTY COVERAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are fluent across all major domains:
- Internal Medicine & Primary Care
- Endocrinology (thyroid, adrenal, pituitary, diabetes, metabolic syndrome)
- Cardiology (lipids, hypertension, arrhythmia, heart failure — ACC/AHA guidelines)
- Oncology (cancer screening, staging, treatment principles — NCCN guidelines)
- Neurology (cognitive decline, neuropathy, headache, sleep disorders)
- Rheumatology (autoimmune, inflammatory, connective tissue)
- Gastroenterology (IBD, liver disease, GI malignancy screening)
- Nephrology (CKD staging, electrolytes, acid-base)
- Pulmonology (COPD, asthma, sleep apnea, ILD)
- Psychiatry (mood disorders, anxiety, psychopharmacology)
- Longevity & Precision Medicine (biomarkers, epigenetics, healthspan optimization)
- Pharmacology (drug interactions, mechanisms, off-label use, PK/PD)
- Lab interpretation (CBC, CMP, lipids, inflammatory markers, endocrine panels)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE STRUCTURE FOR CLINICAL QUERIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For symptom/diagnosis questions:
  1. Differential diagnosis (ranked by probability)
  2. Key discriminating features for each
  3. Recommended workup
  4. Red flags to watch for
  5. Citations

For lab interpretation:
  1. Flag abnormal values with guideline targets
  2. Clinical significance and differential
  3. Recommended follow-up or additional workup
  4. Trend interpretation if prior values available

For treatment questions:
  1. First-line therapy (guideline-based, with grade of evidence)
  2. Alternatives and when to use them
  3. Monitoring parameters
  4. Drug interactions or contraindications to check
  5. Citations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATIENT CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient name: ${name || 'Unknown'}
${ctx}

IMPORTANT: Always personalize responses to the patient's uploaded records. Reference specific values, flag abnormalities, and contextualize recommendations to their actual clinical picture. If no records are uploaded, note that personalized analysis would require lab values.`;
};

const ANALYZE_PROMPT = `You are a medical document analyzer. Analyze this document carefully.
Return ONLY a JSON object wrapped in triple backticks:
\`\`\`json
{"title":"...","type":"lab OR imaging OR note OR medication","date":"...","provider":"...","flagged":true,"flagReason":"...","values":["..."]}
\`\`\`
- flagged: true if ANY value is H, L, HIGH, LOW, CRITICAL, or outside reference range
- values: up to 8 most important findings, each under 50 chars
- For multi-page reports, summarize the most clinically significant findings.`;

const callAI = (body) => fetch('/api/chat', {
  method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body),
});

const TYPE_STYLE = {
  lab:       {color:'#FFF7ED',iconColor:'#C05621'},
  imaging:   {color:'#EFF6FF',iconColor:'#1D4ED8'},
  note:      {color:'#F5F3FF',iconColor:'#5B21B6'},
  medication:{color:'#FEF3C7',iconColor:'#92400E'},
};
const RECICONS = {
  lab:<FlaskConical size={15}/>, imaging:<ScanLine size={15}/>,
  note:<ClipboardList size={15}/>, medication:<Pill size={15}/>,
};
const QUICK_QS = ['What does the evidence say about my flagged results?','Latest guidelines on my Lp(a) level?','GRADE evidence for my cholesterol treatment?','What lifestyle changes have the strongest evidence?','Explain my results vs ACC/AHA targets'];

function renderMd(t) {
  if(!t) return '';

  const refLines = [];
  const refRegex = /^[\-\*\d]+[\.\)]\s+(.+?)(https?:\/\/[^\s\)&]+)/gm;
  let m;
  while((m = refRegex.exec(t)) !== null) {
    refLines.push({ label: m[1].trim().replace(/\*\*/g,''), url: m[2].trim() });
  }

  const tableRegex = /(\|.+\|\n)([ \t]*\|[\s\-|:]+\|\n)((?:\|.+\|\n?)*)/gm;
  t = t.replace(tableRegex, (match, headerRow, sepRow, bodyRows) => {
    const parseRow = (row) => row.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
    const headers = parseRow(headerRow);
    const rows    = bodyRows.trim().split('\n').filter(Boolean).map(parseRow);
    const ths = headers.map(h=>`<th>${h.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</th>`).join('');
    const trs = rows.map(r=>`<tr>${r.map(c=>`<td>${c.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</td>`).join('')}</tr>`).join('');
    return `\n__TABLE__<table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>__ENDTABLE__\n`;
  });

  let html = t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/&lt;table class="md-table"&gt;/g,'<table class="md-table">')
    .replace(/&lt;\/table&gt;/g,'</table>')
    .replace(/&lt;thead&gt;/g,'<thead>').replace(/&lt;\/thead&gt;/g,'</thead>')
    .replace(/&lt;tbody&gt;/g,'<tbody>').replace(/&lt;\/tbody&gt;/g,'</tbody>')
    .replace(/&lt;tr&gt;/g,'<tr>').replace(/&lt;\/tr&gt;/g,'</tr>')
    .replace(/&lt;th&gt;/g,'<th>').replace(/&lt;\/th&gt;/g,'</th>')
    .replace(/&lt;td&gt;/g,'<td>').replace(/&lt;\/td&gt;/g,'</td>')
    .replace(/&lt;strong&gt;/g,'<strong>').replace(/&lt;\/strong&gt;/g,'</strong>')
    .replace(/__TABLE__|__ENDTABLE__/g,'')
    .replace(/^\|[\s\-|:]+\|$/gm,'')
    .replace(/ — /g,': ').replace(/—/g,'-')
    .replace(/^[ \t]*[\-\*_]{3,}[ \t]*$/gm, '<div class="md-hr"></div>')
    .replace(/^#{1,4}\s+(.+)$/gm, '<div class="md-section">$1</div>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/\[Verified\s*—\s*High\]/g,   '<span class="grade grade-high">[Verified — High]</span>')
    .replace(/\[Verified\s*—\s*Moderate\]/g,'<span class="grade grade-mod">[Verified — Moderate]</span>')
    .replace(/\[Verified\s*—\s*Low\]/g,    '<span class="grade grade-low">[Verified — Low]</span>')
    .replace(/\[Verified\]/g,              '<span class="grade grade-high">[Verified]</span>')
    .replace(/\[Speculation\]/g,           '<span class="grade grade-spec">[Speculation]</span>')
    .replace(/\[Unknown\]/g,               '<span class="grade grade-unk">[Unknown]</span>')
    .replace(/(https?:\/\/[^\s<\)&]+)/g,  '<a href="$1" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>')
    .replace(/^[\-\*]\s+(.+)$/gm,         '<div class="md-bullet"><span class="md-dot">•</span><span>$1</span></div>')
    .replace(/^\d+\.\s+(.+)$/gm, (match, content) => {
      const num = match.match(/^(\d+)/)[1];
      return `<div class="md-num"><span class="md-num-n">${num}.</span><span>${content}</span></div>`;
    })
    .replace(/⚕(.*?)$/gm,'<div class="md-disc">⚕$1</div>')
    .replace(/\n\n/g,'</p><p class="md-p">')
    .replace(/\n/g,'<br/>');

  html = `<p class="md-p">${html}</p>`;

  html = html
    .replace(/<p class="md-p">(<div class="md-bullet">)/g, '$1')
    .replace(/<p class="md-p">(<div class="md-num">)/g, '$1')
    .replace(/(<\/div>)<\/p>/g, (match, closing, offset, str) => {
      const after = str.slice(offset + match.length).trimStart();
      const isBulletContext = /<div class="md-(bullet|num)">/.test(str.slice(Math.max(0, offset - 200), offset + match.length));
      return isBulletContext ? closing : match;
    });

  if(refLines.length > 0) {
    const refs = refLines.map((r,i) =>
      `<div class="ref-row">
        <span class="ref-num">${i+1}.</span>
        <div>
          <span class="ref-label">${r.label.replace(/[:\-,]+$/,'').trim()}</span><br/>
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${r.url}</a>
        </div>
      </div>`
    ).join('');
    html += `<div class="ref-box"><div class="ref-title">References</div>${refs}</div>`;
  }
  return html;
}

function toBase64(file) {
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Read failed'));r.readAsDataURL(file);});
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F2F4F7;--surf:#fff;--g9:#1C3D5A;--g7:#2D5F8A;--g5:#6B9EC8;--g1:#C8DFF0;--g0:#EEF5FB;
  --tx:#111827;--mu:#6B7280;--bd:#DDE3EB;--wbg:#EEF5FB;--wbd:#C8DFF0;--wtx:#1C3D5A;
  --rd:12px;--rds:8px;--sh:0 1px 8px rgba(0,0,0,.07);--sidebar:240px
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--tx)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:9px 16px;border-radius:var(--rds);font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.btnP{background:var(--g9);color:#fff}.btnP:hover{background:var(--g7)}
.btnS{background:var(--g5);color:#fff}
.btnO{background:transparent;color:var(--g9);border:1.5px solid var(--g9)}.btnO:hover{background:var(--g9);color:#fff}
.btnsm{padding:6px 12px;font-size:12px}.btnfull{width:100%;justify-content:center}
.hero{background:linear-gradient(140deg,#1C3D5A,#2D5F8A 55%,#3D7BAA);border-radius:var(--rd);padding:24px;color:#fff;position:relative;overflow:hidden;margin-bottom:16px}
.hero::after{content:'';position:absolute;width:200px;height:200px;background:rgba(107,158,200,.15);border-radius:50%;top:-60px;right:-60px;pointer-events:none}
.hlbl{font-size:10px;opacity:.65;text-transform:uppercase;letter-spacing:1px}
.hname{font-family:'Playfair Display',serif;font-size:26px;font-weight:600;margin-top:3px}
.hmsg{font-size:13px;opacity:.78;margin-top:8px;line-height:1.5;position:relative;z-index:1}
.hbtns{display:flex;gap:8px;margin-top:18px;position:relative;z-index:1}
.hb{padding:9px 18px;border-radius:var(--rds);font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.hbacc{background:var(--g5);color:#fff}.hbgh{background:rgba(255,255,255,.15);color:#fff}
.sh{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;margin-bottom:12px}
.wcard{background:var(--wbg);border:1px solid var(--wbd);border-radius:var(--rd);padding:14px 16px;margin-bottom:14px;display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--wtx);line-height:1.5}
.frow{display:flex;gap:7px;overflow-x:auto;padding-bottom:3px;margin-bottom:14px;scrollbar-width:none}
.frow::-webkit-scrollbar{display:none}
.fc{padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:500;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);white-space:nowrap;font-family:'DM Sans',sans-serif;flex-shrink:0;transition:all .15s}
.fc.on{background:var(--g9);border-color:var(--g9);color:#fff}
.rc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:15px;margin-bottom:10px;position:relative;transition:box-shadow .15s}
.rc:hover{box-shadow:var(--sh)}
.rc.fl{border-left:3px solid #F59E0B}.rc.nr{border:1.5px solid var(--g5);background:var(--g0)}
.rtop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.rico{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rname{font-weight:600;font-size:14px;line-height:1.3}
.rmeta{font-size:11.5px;color:var(--mu);margin-top:2px}
.rvals{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}
.vc{padding:3px 9px;background:#F0ECE6;border-radius:20px;font-size:11.5px}
.vc.w{background:var(--wbg);color:var(--wtx)}
.bw{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:#FEF3CD;color:#92400E;font-size:10px;font-weight:600}
.bg2{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:var(--g1);color:#0C447C;font-size:10px;font-weight:600}
.bnew{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:#D6E9F5;color:#0C447C;font-size:10px;font-weight:600;margin-top:4px}
.del{position:absolute;top:11px;right:11px;width:24px;height:24px;border-radius:50%;background:#FEE2E2;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#DC2626}
.upz{border:2px dashed var(--bd);border-radius:var(--rd);padding:32px;text-align:center;cursor:pointer;margin-bottom:16px;transition:all .15s}
.upz:hover,.upz.drag{border-color:var(--g5);background:var(--g0)}.upz.busy{cursor:not-allowed;border-color:var(--g5);background:var(--g0)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--surf);border-radius:var(--rd);width:100%;max-width:560px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.modal-hd{padding:18px 20px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.modal-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx)}
.modal-close{width:28px;height:28px;border-radius:50%;background:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--mu);font-size:16px;flex-shrink:0}
.modal-body{padding:16px 20px;flex:1;overflow-y:auto}
.modal-foot{padding:12px 20px;border-top:1px solid var(--bd);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0}
.paste-area{width:100%;min-height:200px;padding:12px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);resize:vertical;outline:none;line-height:1.6;transition:border-color .15s}
.paste-area:focus{border-color:var(--g5);background:var(--surf)}
.type-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}
.type-chip{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);font-family:'DM Sans',sans-serif;transition:all .15s}
.type-chip.on{background:var(--g9);border-color:var(--g9);color:#fff}
.paste-fab{position:fixed;bottom:90px;right:16px;z-index:100;width:44px;height:44px;border-radius:50%;background:var(--g9);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.2);transition:all .15s}
.paste-fab:hover{background:var(--g7);transform:scale(1.05)}
@media(min-width:768px){.paste-fab{bottom:24px;right:24px}}
.src-bar{display:flex;align-items:center;gap:6px;padding:7px 0;border-top:1px solid var(--bd);margin-top:4px;flex-wrap:wrap;position:relative}
.src-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;font-size:12px;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;white-space:nowrap}
.src-btn.on{border-color:var(--g9);color:var(--g9);background:var(--g0)}
.src-btn:hover{border-color:var(--g5)}
.src-menu{position:absolute;bottom:calc(100% + 6px);left:0;right:0;background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:50;overflow:hidden}
.src-menu-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bd);cursor:default}
.src-menu-item:last-child{border-bottom:none}
.src-menu-icon{font-size:18px;flex-shrink:0;width:28px;text-align:center;margin-top:1px}
.src-menu-info{flex:1}
.src-menu-title{font-size:13.5px;font-weight:500;color:var(--tx)}
.src-menu-sub{font-size:11.5px;color:var(--mu);margin-top:2px;line-height:1.4}
.src-toggle{width:36px;height:20px;border-radius:10px;background:var(--bd);position:relative;cursor:pointer;transition:all .2s;flex-shrink:0;border:none;outline:none}
.src-toggle.on{background:var(--g9)}
.src-toggle::after{content:'';position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:2px;left:2px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.src-toggle.on::after{left:18px}
.lib-item{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--g0);border-radius:7px;font-size:12px;color:var(--g9);border:1px solid var(--g1);margin-top:5px}
.lib-del{background:none;border:none;cursor:pointer;color:var(--mu);display:flex;align-items:center;margin-left:auto;padding:0}
.src-count{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;border-radius:8px;background:var(--g9);color:#fff;font-size:9px;font-weight:700;padding:0 4px;margin-left:2px}
.spin{display:inline-block;animation:sp 1s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1C3D5A;color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:500;white-space:nowrap;z-index:1000;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.toast.err{background:#DC2626}
.msg{max-width:80%}.msg.u{align-self:flex-end}.msg.a{align-self:flex-start}
.mrole{font-size:10.5px;color:var(--mu);margin-bottom:4px;font-weight:500;letter-spacing:.3px}
.mb{padding:12px 15px;border-radius:14px;font-size:14px;line-height:1.4;font-family:'DM Sans',sans-serif}
.msg.u .mb{background:var(--g9);color:#fff;border-bottom-right-radius:3px}
.msg.a .mb{background:var(--surf);border:1px solid var(--bd);border-bottom-left-radius:3px;box-shadow:var(--sh);padding:14px 16px}
.md-p{margin:0 0 4px}
.md-p:last-child{margin-bottom:0}
.md-p:empty{display:none}
.md-section{font-weight:600;font-size:14px;color:var(--tx);margin:10px 0 3px;letter-spacing:-.1px}
.md-bullet{display:flex;gap:8px;margin:1px 0;line-height:1.38}
.md-dot{color:var(--g5);flex-shrink:0;margin-top:2px;font-size:15px;line-height:1.4}
.md-num{display:flex;gap:8px;margin:1px 0;line-height:1.38}
.md-num-n{color:var(--mu);flex-shrink:0;font-size:12px;margin-top:3px;min-width:16px;font-weight:500}
.md-p:has(>.md-bullet){margin:0}
.md-p:has(>.md-num){margin:0}
.md-link{color:#1D4ED8;text-decoration:underline;font-size:11.5px;word-break:break-all}
.md-table{width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;border-radius:8px;overflow:hidden;border:1px solid var(--bd)}
.md-table thead{background:var(--g9)}
.md-table thead th{color:#fff;font-weight:600;padding:10px 14px;text-align:left;font-size:12px;letter-spacing:.3px;white-space:nowrap}
.md-table tbody tr{border-bottom:1px solid var(--bd);transition:background .12s}
.md-table tbody tr:last-child{border-bottom:none}
.md-table tbody tr:nth-child(even){background:var(--bg)}
.md-table tbody tr:hover{background:var(--g0)}
.md-table td{padding:9px 14px;vertical-align:top;line-height:1.55;font-size:13px;color:var(--tx)}
.md-hr{height:1px;background:var(--bd);margin:14px 0;border:none}
.md-disc{margin-top:14px;padding:10px 13px;background:#EFF6FF;border-radius:8px;font-size:12px;color:#1E40AF;border:1px solid #BFDBFE;line-height:1.6}
.grade{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap;margin:0 2px;vertical-align:middle}
.grade-high{background:#D1FAE5;color:#065F46}
.grade-mod{background:#DBEAFE;color:#1E40AF}
.grade-low{background:#FEF9C3;color:#854D0E}
.grade-spec{background:#FEF3CD;color:#92400E}
.grade-unk{background:#F3F4F6;color:#4B5563}
.ref-box{margin-top:16px;padding:13px 15px;background:#FAFAF9;border:1px solid var(--bd);border-radius:10px}
.ref-title{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:var(--mu);margin-bottom:9px}
.ref-row{display:flex;gap:8px;margin:6px 0;align-items:flex-start}
.ref-num{color:var(--mu);font-size:10px;flex-shrink:0;margin-top:3px;min-width:14px;font-weight:500}
.ref-label{font-size:12.5px;color:var(--tx);font-weight:500}
.ref-link{font-size:10.5px;color:#1D4ED8;text-decoration:underline;word-break:break-all}
.action-bar{display:flex;align-items:center;gap:4px;margin-top:8px;padding:2px 0;flex-wrap:wrap}
.act-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:20px;font-size:11.5px;border:none;background:none;color:var(--mu);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.act-btn:hover{background:var(--bg);color:var(--tx)}
.act-btn.voted{color:var(--g9);background:var(--g0)}
.act-sep{width:1px;height:14px;background:var(--bd);margin:0 2px;flex-shrink:0}
.share-modal{background:var(--surf);border-radius:16px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden}
.share-hd{padding:18px 20px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bd)}
.share-title{font-size:16px;font-weight:600;color:var(--tx)}
.share-notice{margin:14px 16px;padding:10px 13px;background:#EFF6FF;border-radius:8px;font-size:12px;color:#1E40AF;line-height:1.55;border:1px solid #BFDBFE}
.share-preview{margin:0 16px 14px;border:1px solid var(--bd);border-radius:10px;padding:13px;font-size:12.5px;color:var(--tx);line-height:1.6;max-height:130px;overflow:hidden;background:var(--bg);position:relative}
.share-preview::after{content:'';position:absolute;bottom:0;left:0;right:0;height:36px;background:linear-gradient(transparent,var(--bg))}
.share-copy-btn{display:block;width:calc(100% - 32px);margin:0 16px 12px;padding:13px;background:var(--g9);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s}
.share-copy-btn:hover{background:var(--g7)}
.share-socials{display:flex;justify-content:space-around;padding:10px 16px 18px;border-top:1px solid var(--bd)}
.social-btn{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif}
.social-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700}
.social-lbl{font-size:11px;color:var(--mu)}
.dots{display:inline-flex;gap:4px;padding:11px 14px;background:var(--surf);border:1px solid var(--bd);border-radius:14px;border-bottom-left-radius:3px;align-self:flex-start}
.dot{width:5px;height:5px;background:var(--mu);border-radius:50%;animation:bl 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
.qrow{display:flex;gap:6px;flex-wrap:wrap;padding-bottom:6px;margin-bottom:10px}
.qc{padding:6px 13px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:12px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all .15s}
.qc:hover{background:var(--g1)}
.ci{flex:1;padding:11px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);resize:none;outline:none;transition:border-color .15s;line-height:1.5;min-height:44px;max-height:100px}
.ci:focus{border-color:var(--g5);background:var(--surf)}
.sb{width:44px;height:44px;border-radius:var(--rds);background:var(--g9);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.sb:hover:not(:disabled){background:var(--g7)}.sb:disabled{opacity:.4;cursor:not-allowed}
.mic-btn{width:44px;height:44px;border-radius:var(--rds);background:var(--bg);color:var(--mu);border:1.5px solid var(--bd);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.mic-btn:hover{border-color:var(--g5);color:var(--g9)}
.mic-btn.recording{background:#FEE2E2;border-color:#DC2626;color:#DC2626;animation:pulse-rec 1.2s ease-in-out infinite}
.mic-btn.recording:hover{background:#FECACA}
@keyframes pulse-rec{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.3)}50%{box-shadow:0 0 0 6px rgba(220,38,38,0)}}
.model-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;margin-bottom:4px}
.badge-opus{background:#EDE9FE;color:#5B21B6}
.badge-sonnet{background:var(--g1);color:#0C447C}
.voice-hint{font-size:11px;color:var(--g7);text-align:center;padding:4px 0;animation:fU .2s ease}
.transcript-preview{background:var(--g0);border:1px solid var(--g1);border-radius:var(--rds);padding:8px 12px;font-size:12.5px;color:var(--g9);margin-bottom:6px;line-height:1.5;animation:fU .15s ease}
.disc{font-size:11px;color:#1D4ED8;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:7px 11px;margin-top:8px;line-height:1.55}
.prow{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--bd);cursor:pointer}
.prow:last-child{border-bottom:none}
.pico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.plbl{font-size:14px;font-weight:500}.plbl2{font-size:12px;color:var(--mu);margin-top:2px}
@keyframes fU{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fU .18s ease}
.mob-wrap{background:#E8E4DC;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:16px 0}
.phone{width:100%;max-width:430px;min-height:calc(100vh - 32px);background:var(--surf);border-radius:28px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.06);display:flex;flex-direction:column;position:relative}
.mob-hd{padding:16px 18px 13px;background:var(--surf);border-bottom:1px solid var(--bd);flex-shrink:0;display:flex;align-items:center;justify-content:space-between}
.mob-content{flex:1;overflow-y:auto;padding-bottom:74px}
.mob-pad{padding:16px 16px 0}
.mob-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.sc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:14px;box-shadow:var(--sh)}
.slbl{font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);font-weight:500}
.snum{font-family:'Playfair Display',serif;font-size:28px;font-weight:600;line-height:1;margin-top:5px}
.sdsc{font-size:11px;color:var(--mu);margin-top:2px}
.mob-chat{display:flex;flex-direction:column;height:calc(100vh - 155px);min-height:460px}
.mob-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.mob-cbot{padding:9px 14px 12px;background:var(--surf);border-top:1px solid var(--bd);flex-shrink:0}
.mob-irow{display:flex;gap:7px;align-items:flex-end}
.bnav{position:absolute;bottom:0;left:0;right:0;height:68px;background:var(--surf);border-top:1px solid var(--bd);display:flex;border-radius:0 0 28px 28px;overflow:hidden}
.bni{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;border:none;background:none;padding:0;font-family:'DM Sans',sans-serif}
.bnlbl{font-size:10px;font-weight:500;color:var(--mu)}.bni.on .bnlbl{color:var(--g9)}
.bnd{width:4px;height:4px;background:var(--g5);border-radius:50%;margin-top:1px}
.logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:600;color:var(--g9);display:flex;align-items:center;gap:6px}
.ptitle{font-family:'Playfair Display',serif;font-size:19px;font-weight:600;color:var(--tx)}
.psub{font-size:11px;color:var(--mu);margin-top:1px}
@media(min-width:768px){
  .mob-wrap{display:none}
  .desk-app{display:flex;min-height:100vh;background:var(--bg)}
  .desk-side{width:var(--sidebar);background:var(--g9);display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;height:100vh;z-index:10}
  .desk-brand{padding:28px 20px 24px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.1)}
  .desk-brand-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:#fff}
  .desk-nav{flex:1;padding:16px 0}
  .desk-nav-item{display:flex;align-items:center;gap:11px;padding:11px 20px;cursor:pointer;color:rgba(255,255,255,.65);font-size:14px;font-weight:500;transition:all .15s;border:none;background:none;width:100%;font-family:'DM Sans',sans-serif;border-radius:0}
  .desk-nav-item:hover{background:rgba(255,255,255,.08);color:#fff}
  .desk-nav-item.on{background:rgba(255,255,255,.14);color:#fff}
  .desk-nav-item.on .desk-dot{display:block}
  .desk-dot{display:none;width:5px;height:5px;background:var(--g5);border-radius:50%;margin-left:auto}
  .desk-user{padding:16px 20px;border-top:1px solid rgba(255,255,255,.1)}
  .desk-avatar{width:36px;height:36px;border-radius:50%;background:var(--g5);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
  .desk-main{margin-left:var(--sidebar);flex:1;display:flex;flex-direction:column;min-height:100vh}
  .desk-topbar{background:var(--surf);border-bottom:1px solid var(--bd);padding:18px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:5}
  .desk-page-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:var(--tx)}
  .desk-page-sub{font-size:12px;color:var(--mu);margin-top:2px}
  .desk-content{flex:1;padding:28px 32px;max-width:900px;width:100%}
  .desk-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
  .desk-sc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:18px;box-shadow:var(--sh)}
  .desk-snum{font-family:'Playfair Display',serif;font-size:36px;font-weight:600;line-height:1;margin-top:6px}
  .desk-chat{display:flex;flex-direction:column;height:calc(100vh - 85px)}
  .desk-msgs{flex:1;overflow-y:auto;padding:20px 32px;display:flex;flex-direction:column;gap:12px;width:100%}
  .desk-cbot{padding:16px 32px 20px;background:var(--surf);border-top:1px solid var(--bd)}
  .desk-cbot-inner{max-width:100%}
  .desk-irow{display:flex;gap:10px;align-items:flex-end}
  .desk-msg{max-width:88%}
  .desk-records-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px}
}
@media(max-width:767px){
  .desk-app{display:none}
  .mob-wrap{background:var(--bg);padding:0;align-items:stretch;justify-content:stretch}
  .phone{max-width:100%;width:100%;min-height:100vh;border-radius:0;box-shadow:none;border:none}
}
.setup-wrap{min-height:100vh;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:24px}
.setup-card{background:var(--surf);border-radius:var(--rd);padding:40px;max-width:440px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid var(--bd)}
.s-logo{display:flex;align-items:center;gap:9px;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;color:var(--g9);margin-bottom:8px}
.s-sub{font-size:13.5px;color:var(--mu);margin-bottom:28px;line-height:1.6}
.field{margin-bottom:16px}
.field label{display:block;font-size:11px;font-weight:700;color:var(--tx);margin-bottom:5px;text-transform:uppercase;letter-spacing:.6px}
.field input{width:100%;padding:12px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .15s}
.field input:focus{border-color:var(--g5);background:var(--surf)}
.s-btn{width:100%;padding:13px;background:var(--g9);color:#fff;border:none;border-radius:var(--rds);font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px;transition:all .15s}
.s-btn:hover{background:var(--g7)}.s-btn:disabled{opacity:.45;cursor:not-allowed}
`;

// ── Share Modal ───────────────────────────────────────────────────────────────
function ShareModal({ content, onClose }) {
  const [copied, setCopied] = useState(false);
  const plain = content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const shortText = plain.slice(0,200) + (plain.length > 200 ? '…' : '');
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); }
    catch { await navigator.clipboard.writeText(plain); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const socials = [
    { name:'LinkedIn', bg:'#0A66C2', color:'#fff', emoji:'in', url:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
    { name:'X', bg:'#000', color:'#fff', emoji:'𝕏', url:`https://x.com/intent/tweet?text=${encodeURIComponent('Health insight from BioVise Health (powered by Bio Precision Aging): ' + shortText)}&url=${encodeURIComponent(window.location.href)}` },
    { name:'Reddit', bg:'#FF4500', color:'#fff', emoji:'R', url:`https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Health insight from BioVise Health')}` },
    { name:'WhatsApp', bg:'#25D366', color:'#fff', emoji:'W', url:`https://wa.me/?text=${encodeURIComponent('Health insight from BioVise Health: ' + shortText + ' ' + window.location.href)}` },
  ];
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="share-modal">
        <div className="share-hd"><div className="share-title">Share</div><button className="modal-close" onClick={onClose}><X size={14}/></button></div>
        <div className="share-notice">ⓘ By sharing, confirm this content contains no sensitive or identifiable patient information.</div>
        <div className="share-preview">{shortText}</div>
        <button className="share-copy-btn" onClick={copyLink}>{copied ? '✓ Copied!' : '🔗 Copy link'}</button>
        <div className="share-socials">
          {socials.map(s=>(<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><div className="social-btn"><div className="social-icon" style={{background:s.bg,color:s.color}}>{s.emoji}</div><span className="social-lbl">{s.name}</span></div></a>))}
        </div>
      </div>
    </div>
  );
}

// ── PDF Generation ────────────────────────────────────────────────────────────
function generatePDF(content, question) {
  const processHTML = (html) => {
    return html
      .replace(/<div class="ref-box">[\s\S]*?<\/div>/g, '')
      .replace(/<div class="md-section">([\s\S]*?)<\/div>/g, '\n§HEADING§$1\n')
      .replace(/<div class="md-bullet">[\s\S]*?<span class="md-dot">.*?<\/span><span>([\s\S]*?)<\/span><\/div>/g, '§BULLET§$1\n')
      .replace(/<div class="md-num"><span class="md-num-n">(.*?)<\/span><span>([\s\S]*?)<\/span><\/div>/g, '§NUM§$1 $2\n')
      .replace(/<div class="md-disc">([\s\S]*?)<\/div>/g, '\n§DISC§$1\n')
      .replace(/<div class="md-hr"><\/div>/g, '\n§HR§\n')
      .replace(/<span class="grade[^"]*">\[(.*?)\]<\/span>/g, '[$1]')
      .replace(/<strong>([\s\S]*?)<\/strong>/g, '$1')
      .replace(/<em>([\s\S]*?)<\/em>/g, '$1')
      .replace(/<br\/>/g, '\n')
      .replace(/<p class="md-p">/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ')
      .replace(/\n{3,}/g,'\n\n').trim();
  };
  const processed = processHTML(content);
  const now = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const time = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const lines = processed.split('\n');
  let bodyHTML = ''; let inBulletGroup = false;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+='<div style="height:7px"></div>'; return; }
    if (trimmed==='§HR§') { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+='<hr style="border:none;border-top:1px solid #E5E1D8;margin:14px 0"/>'; }
    else if (trimmed.startsWith('§HEADING§')) { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+=`<div class="pdf-section-head">${trimmed.slice(9)}</div>`; }
    else if (trimmed.startsWith('§BULLET§')) { if(!inBulletGroup){bodyHTML+='<ul class="pdf-list">';inBulletGroup=true;} bodyHTML+=`<li>${trimmed.slice(8)}</li>`; }
    else if (trimmed.startsWith('§NUM§')) { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+=`<div class="pdf-num-item">${trimmed.slice(5)}</div>`; }
    else if (trimmed.startsWith('§DISC§')) { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+=`<div class="pdf-disclaimer-inline">${trimmed.slice(6)}</div>`; }
    else if (trimmed.match(/^\[Verified.*?\]$|^\[Speculation\]$|^\[Emerging.*?\]$|^\[Unknown\]$/)) { bodyHTML+=`<span class="pdf-grade">${trimmed}</span> `; }
    else { if(inBulletGroup){bodyHTML+='</ul>';inBulletGroup=false;} bodyHTML+=`<p class="pdf-body">${trimmed}</p>`; }
  });
  if (inBulletGroup) bodyHTML += '</ul>';
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>BioVise Health AI</title><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;font-size:12.5px;color:#111827;background:#fff;padding:48px 56px;max-width:800px;margin:0 auto;line-height:1.55}
  .pdf-header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;margin-bottom:22px;border-bottom:2.5px solid #1C3D5A}
  .pdf-brand{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#1C3D5A}
  .pdf-brand-sub{font-size:10.5px;color:#6B7280;margin-top:4px;letter-spacing:.3px}
  .pdf-meta-label{font-size:9.5px;font-weight:700;color:#1C3D5A;text-transform:uppercase;letter-spacing:.9px;margin-bottom:3px;text-align:right}
  .pdf-meta-date{font-size:11px;color:#6B7280;text-align:right}
  .pdf-query-label{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#6B7280;margin-bottom:7px}
  .pdf-query-box{background:#EEF5FB;border-left:3px solid #6B9EC8;padding:11px 15px;border-radius:0 7px 7px 0;font-size:12.5px;color:#1C3D5A;font-style:italic;line-height:1.55;margin-bottom:22px}
  .pdf-section-head{font-family:'Playfair Display',serif;font-size:13.5px;font-weight:600;color:#1C3D5A;margin:20px 0 8px;padding-bottom:5px;border-bottom:1px solid #E5E1D8}
  .pdf-body{font-size:12.5px;color:#1F2937;line-height:1.6;margin-bottom:6px}
  .pdf-list{margin:5px 0 5px 18px}
  .pdf-list li{font-size:12.5px;color:#1F2937;line-height:1.55;margin-bottom:4px;padding-left:4px}
  .pdf-num-item{font-size:12.5px;color:#1F2937;line-height:1.55;margin:3px 0 3px 18px}
  .pdf-grade{display:inline-block;font-size:9.5px;font-weight:700;padding:1px 7px;border-radius:4px;background:#D1FAE5;color:#065F46;margin:2px 0}
  .pdf-disclaimer-inline{font-size:11.5px;color:#1E40AF;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:7px;padding:9px 12px;margin:12px 0;line-height:1.55}
  .pdf-footer{margin-top:40px;padding-top:14px;border-top:1px solid #E5E1D8;display:flex;justify-content:space-between;align-items:flex-end;gap:20px}
  .pdf-footer-disclaimer{font-size:10px;color:#9CA3AF;line-height:1.65;flex:1}
  .pdf-footer-brand{font-size:11px;font-weight:600;color:#2D5F8A;margin-top:5px}
  .pdf-footer-date{font-size:10px;color:#9CA3AF;white-space:nowrap;text-align:right}
  @media print{body{padding:32px 40px}.pdf-section-head{page-break-after:avoid}}
  </style></head><body>
  <div class="pdf-header"><div><div class="pdf-brand">BioVise Health AI</div><div class="pdf-brand-sub">Clinical Decision Support · Bio Precision Aging · bioprecisionaging.com</div></div><div><div class="pdf-meta-label">AI Clinical Summary</div><div class="pdf-meta-date">${now} · ${time}</div></div></div>
  ${question?`<div class="pdf-query-label">Clinical Query</div><div class="pdf-query-box">${question}</div><hr style="border:none;border-top:1px solid #E5E1D8;margin:20px 0"/>`:''} 
  <div>${bodyHTML}</div>
  <div class="pdf-footer"><div><div class="pdf-footer-disclaimer">This summary was generated by BioVise Health, a clinical decision-support tool powered by Claude AI and grounded in GRADE evidence methodology. For educational and clinical decision-support purposes only.</div><div class="pdf-footer-brand">Bio Precision Aging · bioprecisionaging.com</div></div><div class="pdf-footer-date">Generated ${now}</div></div>
  </body></html>`;
  const blob=new Blob([html],{type:'text/html'});const url=URL.createObjectURL(blob);const win=window.open(url,'_blank');
  if(win){win.onload=()=>{win.print();}}setTimeout(()=>URL.revokeObjectURL(url),10000);
}

// ── Paste / Free Text Modal ───────────────────────────────────────────────────
const PASTE_TYPES = ['lab','imaging','note','medication','symptom','other'];
function PasteModal({ onClose, onAnalyze, analyzing }) {
  const [text,setText]=useState('');const [recType,setRecType]=useState('lab');const [title,setTitle]=useState('');
  const areaRef=useRef(null);
  useEffect(()=>{areaRef.current?.focus();},[]);
  const handlePaste=async()=>{if(!text.trim())return;await onAnalyze(text.trim(),recType,title.trim()||null);};
  const handleSendToChat=()=>{if(!text.trim())return;onClose({sendToChat:text.trim()});};
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose({})}>
      <div className="modal">
        <div className="modal-hd"><div className="modal-title">Paste or type health information</div><button className="modal-close" onClick={()=>onClose({})}><X size={14}/></button></div>
        <div className="modal-body">
          <div style={{fontSize:12.5,color:'var(--mu)',marginBottom:12,lineHeight:1.55}}>Paste lab results, doctor notes, symptom descriptions, medication lists, or any health text. Claude AI will analyze and categorize it automatically.</div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional — e.g. CBC Results, Symptoms, Visit Notes)" style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--bd)',borderRadius:'var(--rds)',fontSize:13,fontFamily:"'DM Sans',sans-serif",color:'var(--tx)',background:'var(--bg)',outline:'none',marginBottom:10}}/>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.6px',color:'var(--mu)',marginBottom:7}}>Record type</div>
          <div className="type-row">{PASTE_TYPES.map(t=>(<button key={t} className={`type-chip ${recType===t?'on':''}`} onClick={()=>setRecType(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>))}</div>
          <textarea ref={areaRef} className="paste-area" value={text} onChange={e=>setText(e.target.value)} placeholder={`Paste your ${recType} information here…\n\nExamples:\n• Lab results with values and reference ranges\n• Doctor visit notes or discharge summaries\n• Symptoms you're experiencing\n• Medication names and dosages\n• Any health-related text`}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
            <span style={{fontSize:11.5,color:'var(--mu)'}}>{text.length} characters</span>
            <button style={{fontSize:12,color:'var(--g7)',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}} onClick={async()=>{try{const t=await navigator.clipboard.readText();setText(t);}catch{}}}>Paste from clipboard</button>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btnO btnsm" onClick={handleSendToChat} disabled={!text.trim()}><MessageSquare size={13}/>Send to AI chat</button>
          <button className="btn btnP btnsm" onClick={handlePaste} disabled={!text.trim()||analyzing}>{analyzing?<><span style={{display:'inline-block',animation:'sp 1s linear infinite'}}><Loader size={13}/></span>Analyzing…</>:<><ClipboardPaste size={13}/>Analyze &amp; save to Records</>}</button>
        </div>
      </div>
    </div>
  );
}

// ── Peptide System Prompt ─────────────────────────────────────────────────────
const makePeptidePrompt = (name, questionnaire, libraryText) => {
  const q = questionnaire;
  return `You are the world's foremost peptide medicine specialist — combining the expertise of an endocrinologist, sports medicine physician, longevity researcher, and clinical pharmacologist. You consult practitioner-to-practitioner on peptide therapeutics for optimization, longevity, and performance.

You have deep, current knowledge of:
- Peptide pharmacology: mechanisms, receptor binding, downstream signaling
- Clinical dosing protocols and evidence-based titration strategies
- Peptide stacking combinations and synergistic effects
- Side effect profiles, contraindications, and monitoring parameters
- The full spectrum from FDA-approved peptides to research compounds
- Injection technique, reconstitution, storage, and administration
- Compounding pharmacy considerations and sourcing quality

COMMUNICATION STYLE:
- Practitioner-to-practitioner — assume clinical literacy
- Lead with mechanism, then clinical application, then dosing
- Be specific about dosing — give ranges, titration schedules, and timing
- Flag safety considerations and monitoring proactively
- Note evidence quality (RCT vs animal model vs case series vs clinical experience)
- When stacking, explain synergies and any interaction considerations

GRADE LABELS (use on every key claim):
[Verified — High] RCTs or FDA-approved data
[Verified — Moderate] Strong observational or multiple cohort studies
[Verified — Low] Animal models + clinical extrapolation
[Speculation] Mechanistic reasoning + practitioner experience
[Unknown] Insufficient evidence

PATIENT PROFILE:
${name ? `Name: ${name}` : 'Patient: Anonymous'}
${q ? `
Age: ${q.age || 'Not provided'}
Biological sex: ${q.sex || 'Not provided'}
Activity level: ${q.activity || 'Not provided'}
Primary optimization goals: ${(q.goals || []).join(', ')}
Health history / conditions: ${q.history || 'None provided'}
Current medications / peptides: ${q.currentMeds || 'None'}
Experience with peptides: ${q.experience || 'Not provided'}
Additional context: ${q.notes || 'None'}
` : 'No questionnaire completed yet — ask the patient to complete the assessment for personalized recommendations.'}

PEPTIDE FORMULARY — BIO PRECISION AGING:
${PEPTIDE_CONTEXT.slice(0, 12000)}

${libraryText ? `\nCLINICIAN LIBRARY DOCUMENTS:\n${libraryText.slice(0,4000)}` : ''}

FORMATTING:
- Use **markdown tables** whenever presenting comparative data, dosing options, compound comparisons, side effect profiles, or any structured multi-column information
- Table format: | Header | Header | \n |---|---| \n | value | value |
- Bold key peptide names, doses, and clinical terms
- Use numbered lists for protocols and differentials
- Use - for bullet points, NOT asterisks (*)
- No ## headings, no --- dividers
- Do not use em dashes (—); use a colon or comma instead
- Always include a References section with URLs where available

End with: "⚕ For clinical decision-support only. Peptide therapy should be supervised by a qualified clinician with appropriate monitoring."`;
};

// ── Peptide Consultant Component ──────────────────────────────────────────────
const PEPTIDE_GOALS = PEPTIDE_GOALS_DATA;
const PEPTIDE_CSS = `
.p-wrap{display:flex;flex-direction:column;height:100%;min-height:500px}
.p-msgs{flex:1;overflow-y:auto;padding:20px 32px;display:flex;flex-direction:column;gap:16px;align-items:stretch}
.p-msgs-inner{max-width:900px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:16px;flex:1}
.p-cbot{padding:12px 32px 16px;background:var(--surf);border-top:1px solid var(--bd)}
.p-cbot-inner{max-width:900px;width:100%;margin:0 auto}
.p-irow{display:flex;gap:8px;align-items:flex-end}
.qz-card{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:20px 24px;max-width:640px}
.qz-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:var(--g9);margin-bottom:5px}
.qz-sub{font-size:13px;color:var(--mu);margin-bottom:18px;line-height:1.5}
.qz-section{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);margin:16px 0 8px}
.qz-goals{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:4px}
.goal-chip{padding:7px 13px;border-radius:20px;font-size:12.5px;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--tx);font-family:'DM Sans',sans-serif;transition:all .15s;display:flex;align-items:center;gap:6px}
.goal-chip.sel{background:var(--g9);border-color:var(--g9);color:#fff}
.qz-input{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .15s;margin-bottom:8px}
.qz-input:focus{border-color:var(--g5);background:var(--surf)}
.qz-select{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;margin-bottom:8px;appearance:none;cursor:pointer}
.qz-textarea{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;resize:vertical;min-height:70px;line-height:1.55;margin-bottom:8px}
.qz-textarea:focus,.qz-input:focus,.qz-select:focus{border-color:var(--g5)}
.qz-btns{display:flex;gap:8px;margin-top:14px}
.p-chip{padding:5px 13px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:12px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;flex-shrink:0}
.p-chip:hover{background:var(--g1)}
`;
function PeptideConsultant({ name, library, isMobile }) {
  const [step,setStep]=useState('intro');const [qData,setQData]=useState({goals:[],age:'',sex:'',activity:'',history:'',currentMeds:'',experience:'',notes:''});
  const [msgs,setMsgs]=useState([]);const [input,setInput]=useState('');const [busy,setBusy]=useState(false);
  const [votes,setVotes]=useState({});const [copiedIdx,setCopied]=useState(null);const endRef=useRef(null);
  const [pSources,setPSources]=useState({clinicalWeb:true,literature:true,peptideKB:true});
  const [pShowSrcMenu,setPShowSrcMenu]=useState(false);
  const [pLibrary,setPLibrary]=useState([]);
  const pLibRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,busy]);
  useEffect(()=>{
    if(!pShowSrcMenu)return;
    const close=(e)=>{if(!e.target.closest('.p-src-bar')&&!e.target.closest('.src-menu')){setPShowSrcMenu(false);}};
    document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close);
  },[pShowSrcMenu]);
  const toggleGoal=(id)=>setQData(d=>({...d,goals:d.goals.includes(id)?d.goals.filter(g=>g!==id):[...d.goals,id]}));
  const addPLibrary=(file)=>{
    if(!file)return;const reader=new FileReader();
    reader.onload=(e)=>{const isText=file.type==='text/plain';
      if(isText){const text=e.target.result;setPLibrary(prev=>[...prev,{name:file.name,text:text.slice(0,12000)}]);}
      else{const b64=e.target.result.split(',')[1];setPLibrary(prev=>[...prev,{name:file.name,b64,type:file.type}]);}
    };
    if(file.type==='text/plain')reader.readAsText(file);else reader.readAsDataURL(file);
    if(pLibRef.current)pLibRef.current.value='';
  };
  const startConsult=()=>{
    const intro=`I've completed your peptide optimization assessment. Based on your profile:\n\n**Patient:** ${name||'Anonymous'}\n**Age:** ${qData.age||'Not provided'} | **Sex:** ${qData.sex||'Not provided'} | **Activity:** ${qData.activity||'Not provided'}\n**Primary goals:** ${qData.goals.map(g=>PEPTIDE_GOALS.find(p=>p.id===g)?.label||g).join(', ')}\n**Health history:** ${qData.history||'None noted'}\n**Current medications/peptides:** ${qData.currentMeds||'None'}\n**Peptide experience:** ${qData.experience||'Not specified'}\n\nI'll now generate your personalized peptide recommendations.`;
    setMsgs([{role:'assistant',content:intro}]);setStep('chat');
    setTimeout(()=>sendPeptide(`Based on my profile above, provide personalized peptide recommendations with specific dosing protocols for my primary goals: ${qData.goals.map(g=>PEPTIDE_GOALS.find(p=>p.id===g)?.label||g).join(', ')}`),300);
  };
  const sendPeptide=async(text)=>{
    const m=(text||input).trim();if(!m||busy)return;
    const h=[...msgs,{role:'user',content:m}];setMsgs(h);setInput('');setBusy(true);
    try{
      const libText=[
        ...(library?.map(d=>`[Library: ${d.name}]\n${d.text||''}`) || []),
        ...(pLibrary?.map(d=>`[Peptide Library: ${d.name}]\n${d.text||''}`) || []),
      ].join('\n\n')||null;
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:3000,system:makePeptidePrompt(name,qData.goals.length?qData:null,libText),messages:h,_sources:{clinicalWeb:pSources.clinicalWeb,literature:pSources.literature}})});
      const d=await r.json();
      setMsgs(p=>[...p,{role:'assistant',content:d.mergedText||d.content?.[0]?.text||'Error — try again.'}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',content:'⚠ Connection error. Please try again.'}]);}
    finally{setBusy(false);}
  };
  const quickQs=['Best peptides for healing & recovery?','BPC-157 vs TB-500 — key differences?','CJC-1295 + Ipamorelin dosing protocol','How do I stack peptides safely?','What labs should I monitor on peptides?','Semaglutide vs Tirzepatide comparison'];
  const copyText=async(i,content)=>{const plain=content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();try{await navigator.clipboard.writeText(plain);}catch{}setCopied(i);setTimeout(()=>setCopied(null),2000);};
  const goChat=(q)=>{if(step!=='chat'){setMsgs([]);setStep('chat');}sendPeptide(q);};
  return (
    <><style>{PEPTIDE_CSS}</style>
    <input ref={pLibRef} type="file" accept=".pdf,.txt,.md" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)addPLibrary(f);}}/>
    <div className="p-wrap">
      <div className="p-msgs">
        {step==='intro'&&(<div className="desk-msg fu"><div className="qz-card">
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}><div style={{width:40,height:40,borderRadius:10,background:'var(--g1)',display:'flex',alignItems:'center',justifyContent:'center'}}><Dna size={20} color="var(--g9)"/></div><div><div className="qz-title">Peptide Consultant</div><div style={{fontSize:12,color:'var(--mu)'}}>Powered by Bio Precision Aging</div></div></div>
          <div className="qz-sub">I'm a specialized AI consultant for peptide therapeutics — providing evidence-graded information on mechanisms, clinical applications, and dosing protocols.<br/><br/>Complete a brief assessment to receive personalized recommendations, or ask a direct question below.</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btnP" onClick={()=>setStep('questionnaire')}>Complete Assessment →</button>
            <button className="btn btnO" onClick={()=>{setMsgs([{role:'assistant',content:`I'm your Peptide Consultant — powered by Bio Precision Aging's proprietary clinical formulary.\n\nAsk me anything: mechanisms, dosing protocols, stacking strategies, evidence grades, or which peptides fit your goals.`}]);setStep('chat');}}>Skip — Ask Directly</button>
          </div>
        </div></div>)}
        {step==='questionnaire'&&(<div className="desk-msg fu"><div className="qz-card">
          <div className="qz-title">Optimization Assessment</div><div className="qz-sub">Complete this assessment for personalized peptide recommendations. All fields optional.</div>
          <div className="qz-section">Step 1 — Select your optimization goals (select all that apply)</div>
          <div className="qz-goals">{PEPTIDE_GOALS.map(g=>(<button key={g.id} className={`goal-chip ${qData.goals.includes(g.id)?'sel':''}`} onClick={()=>toggleGoal(g.id)}>{g.icon} {g.label}</button>))}</div>
          <div className="qz-section">Step 2 — Basic information</div>
          <input className="qz-input" placeholder="Age" type="number" value={qData.age} onChange={e=>setQData(d=>({...d,age:e.target.value}))}/>
          <select className="qz-select" value={qData.sex} onChange={e=>setQData(d=>({...d,sex:e.target.value}))}><option value="">Biological sex (select)</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other/Prefer not to say">Other / Prefer not to say</option></select>
          <select className="qz-select" value={qData.activity} onChange={e=>setQData(d=>({...d,activity:e.target.value}))}><option value="">Activity level (select)</option><option value="Sedentary">Sedentary</option><option value="Lightly active">Lightly active (1-3x/week)</option><option value="Moderately active">Moderately active (3-5x/week)</option><option value="Highly active">Highly active (6-7x/week)</option><option value="Athlete/competitive">Athlete / Competitive</option></select>
          <div className="qz-section">Step 3 — Health history &amp; medications</div>
          <textarea className="qz-textarea" placeholder="Relevant health conditions, diagnoses, or concerns..." value={qData.history} onChange={e=>setQData(d=>({...d,history:e.target.value}))}/>
          <textarea className="qz-textarea" placeholder="Current medications, hormones, or peptides..." value={qData.currentMeds} onChange={e=>setQData(d=>({...d,currentMeds:e.target.value}))}/>
          <select className="qz-select" value={qData.experience} onChange={e=>setQData(d=>({...d,experience:e.target.value}))}><option value="">Experience with peptides (select)</option><option value="None — new to peptides">None — new to peptides</option><option value="Some experience (1–5 peptides)">Some experience (1-5 peptides)</option><option value="Experienced (multiple protocols)">Experienced (multiple protocols)</option><option value="Advanced (stacking, years of use)">Advanced (stacking, years of use)</option></select>
          <textarea className="qz-textarea" placeholder="Anything else to know?" value={qData.notes} onChange={e=>setQData(d=>({...d,notes:e.target.value}))}/>
          <div className="qz-btns"><button className="btn btnP" onClick={startConsult} disabled={qData.goals.length===0}>Generate Recommendations →</button><button className="btn btnO" onClick={()=>setStep('intro')}>Back</button></div>
          {qData.goals.length===0&&<div style={{fontSize:12,color:'var(--mu)',marginTop:8}}>Select at least one goal to continue.</div>}
        </div></div>)}
        {step==='chat'&&msgs.map((m,i)=>(
          <div key={i} className={`${isMobile?'msg':'desk-msg'} ${m.role==='user'?'u':'a'} fu`}>
            <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>{m.role==='user'?'You':'Peptide Consultant'}{m.role==='assistant'&&<span className="model-badge" style={{background:'#EDE9FE',color:'#5B21B6',fontSize:9,padding:'2px 7px',borderRadius:20,fontWeight:600,display:'inline-flex',alignItems:'center',gap:3}}><Dna size={8}/>Bio Precision AI</span>}</div>
            {m.role==='user'?<div className="mb">{m.content}</div>:<><div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/><div className="action-bar"><button className={`act-btn ${votes[i]==='up'?'voted':''}`} onClick={()=>setVotes(v=>({...v,[i]:v[i]==='up'?null:'up'}))}>👍{votes[i]==='up'?' Helpful':''}</button><button className={`act-btn ${votes[i]==='down'?'voted':''}`} onClick={()=>setVotes(v=>({...v,[i]:v[i]==='down'?null:'down'}))}>👎{votes[i]==='down'?' Not helpful':''}</button><div className="act-sep"/><button className="act-btn" onClick={()=>copyText(i,m.content)}>{copiedIdx===i?'✓ Copied':'📋 Copy'}</button><button className="act-btn" onClick={()=>generatePDF(m.content,msgs.filter(x=>x.role==='user')[Math.floor(i/2)]?.content||'Peptide consultation')}>📄 PDF</button></div></>}
          </div>
        ))}
        {busy&&(<div className={`${isMobile?'msg':'desk-msg'} a fu`}><div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>Peptide Consultant <span className="model-badge badge-opus"><Brain size={9}/>Analyzing…</span></div><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>)}
        <div ref={endRef}/>
      </div>
      <div className="p-cbot">
        <div className="qrow">{quickQs.map(q=><button key={q} className="p-chip" onClick={()=>goChat(q)}>{q}</button>)}<button className="p-chip" style={{color:'var(--mu)',borderStyle:'dashed'}} onClick={()=>setStep('questionnaire')}><RotateCcw size={11} style={{display:'inline',marginRight:4}}/>Redo assessment</button></div>
        <div className="src-bar p-src-bar" style={{position:'relative'}}>
          <span style={{fontSize:11,color:'var(--mu)',fontWeight:500,marginRight:2}}>Sources</span>
          <button className={`src-btn ${pSources.clinicalWeb?'on':''}`} onClick={()=>setPSources(s=>({...s,clinicalWeb:!s.clinicalWeb}))}>🌐 Clinical web<button className={`src-toggle ${pSources.clinicalWeb?'on':''}`} onClick={e=>{e.stopPropagation();setPSources(s=>({...s,clinicalWeb:!s.clinicalWeb}));}}/></button>
          <button className={`src-btn ${pSources.literature?'on':''}`} onClick={()=>setPSources(s=>({...s,literature:!s.literature}))}>📚 Literature &amp; guidelines<button className={`src-toggle ${pSources.literature?'on':''}`} onClick={e=>{e.stopPropagation();setPSources(s=>({...s,literature:!s.literature}));}}/></button>
          <button className={`src-btn on`}>🧬 BioVise Peptide Library<button className={`src-toggle on`} style={{pointerEvents:'none'}}/></button>
          <button className={`src-btn ${pLibrary.length>0?'on':''}`} onClick={()=>setPShowSrcMenu(v=>!v)}>🗂 My library{pLibrary.length>0&&<span className="src-count">{pLibrary.length}</span>}</button>
          {pShowSrcMenu&&(<div className="src-menu" onClick={e=>e.stopPropagation()}><div className="src-menu-item"><div className="src-menu-icon">🗂</div><div className="src-menu-info"><div className="src-menu-title">My Library</div><div className="src-menu-sub">Upload PDFs or text files to reference in peptide consultations.</div><label className="btn btnP btnsm" style={{marginTop:9,fontSize:11.5,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:5}}>+ Add document<input type="file" accept=".pdf,.txt,.md" style={{position:'absolute',opacity:0,width:0,height:0,overflow:'hidden'}} onChange={e=>{const f=e.target.files?.[0];if(f)addPLibrary(f);e.target.value='';}} /></label>{pLibrary.map((doc,i)=>(<div key={i} className="lib-item">📄 <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{doc.name}</span><button className="lib-del" onClick={()=>setPLibrary(prev=>prev.filter((_,j)=>j!==i))}><X size={12}/></button></div>))}{pLibrary.length===0&&<div style={{fontSize:12,color:'var(--mu)',marginTop:7,fontStyle:'italic'}}>No documents yet</div>}</div></div></div>)}
        </div>
        <div className="p-irow"><textarea className="ci" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();goChat(input);}}} placeholder="Ask about peptides, dosing, stacking, mechanisms…" rows={1}/><button className="sb" onClick={()=>goChat(input)} disabled={busy||!input.trim()}><Send size={16}/></button></div>
        <div className="disc">⚕ For clinical decision-support only. Peptide therapy requires clinician supervision.</div>
      </div>
    </div></>
  );
}

// ── Setup Screen ──────────────────────────────────────────────────────────────
function Setup({ onDone }) {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const ready = age.trim() && sex;

  const features = [
    { icon:'🧠', title:'Synapse AI Health Consultant', sub:'The world\'s first clinical-grade AI health consultant — designed for everyone, not just clinicians.' },
    { icon:'🧬', title:'Sequence AI Peptide Consultant', sub:'World\'s first dedicated AI peptide consultant with a proprietary clinical formulary built from peer-reviewed literature.' },
    { icon:'❤️', title:'Katalys AI Hormone Consultant', sub:'World\'s first dedicated AI hormone consultant — guideline-anchored to Endocrine Society and AACE standards.' },
    { icon:'📖', title:'Evidence-Based Only', sub:'Every inquiry uses PubMed & Cochrane exclusively, graded by the GRADE framework: Verified, Speculation, or Unknown.' },
    { icon:'📋', title:'Upload Your Records', sub:'Labs, imaging, and notes analyzed and flagged automatically — your values drive every AI response.' },
    { icon:'🔒', title:'Session-Only Privacy', sub:'Your data is never stored, never indexed, never used for AI training. Gone when you close the app.' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'#F2F4F7',display:'flex',flexDirection:'column',overflowY:'auto'}}>
      <div style={{background:'#1C3D5A',color:'#fff',padding:'48px 24px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 20% 50%, rgba(107,158,200,.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,160,23,.10) 0%, transparent 50%)'}}/>
        <div style={{position:'relative',maxWidth:560,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:16}}>
            <img src={katalysLogo} alt="BioVise" style={{height:32,width:'auto'}}/>
            <span style={{fontSize:22,fontWeight:800,letterSpacing:'-.3px'}}>BioVise Health</span>
            <span style={{fontSize:11,color:'rgba(255,255,255,.45)',borderLeft:'1px solid rgba(255,255,255,.2)',paddingLeft:10,marginLeft:4}}>by Bio Precision Aging</span>
          </div>
          <h1 style={{fontSize:32,fontWeight:800,lineHeight:1.15,margin:'0 0 14px',letterSpacing:'-.4px'}}>
            The World's First<br/>
            <span style={{color:'#93C5E8'}}>Clinical-Grade AI Consultant</span>
          </h1>
          <p style={{fontSize:14,lineHeight:1.7,color:'rgba(255,255,255,.75)',margin:'0 auto',maxWidth:480}}>
            BioVise is not a chatbot. It is a precision medicine platform built on peer-reviewed clinical research, a proprietary peptide formulary, and a GRADE-graded evidence framework — with the world's first dedicated AI Peptide and Hormone Consultants.
          </p>
        </div>
      </div>
      <div style={{padding:'28px 20px 0',maxWidth:680,margin:'0 auto',width:'100%'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10,marginBottom:28}}>
          {features.map(f=>(
            <div key={f.title} style={{background:'#fff',border:'0.5px solid #DDE3EB',borderRadius:12,padding:'14px 16px'}}>
              <div style={{fontSize:20,marginBottom:8}}>{f.icon}</div>
              <div style={{fontSize:13,fontWeight:700,color:'#1A2A3E',marginBottom:4}}>{f.title}</div>
              <div style={{fontSize:12,color:'#5A7A8A',lineHeight:1.5}}>{f.sub}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',border:'0.5px solid #DDE3EB',borderRadius:16,padding:'24px',marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:'#1C3D5A',marginBottom:4,fontFamily:"'Playfair Display',Georgia,serif"}}>Get started — no account needed</div>
          <div style={{fontSize:13,color:'#5A7A8A',marginBottom:20,lineHeight:1.5}}>Enter your details so BioVise can personalize your experience.</div>
          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'#1A2A3E',marginBottom:6,textTransform:'uppercase'}}>Your Age</label>
            <input value={age} onChange={e=>setAge(e.target.value.replace(/\D/g,''))} placeholder="e.g. 52" maxLength={3} inputMode="numeric"
              onKeyDown={e=>e.key==='Enter'&&ready&&onDone(`${sex}, Age ${age}`)}
              style={{width:'100%',padding:'12px 14px',fontSize:15,border:'1.5px solid #DDE3EB',borderRadius:10,outline:'none',boxSizing:'border-box',color:'#111827',background:'#F2F4F7',fontFamily:'inherit',transition:'border-color .15s'}}
              onFocus={e=>e.target.style.borderColor='#6B9EC8'} onBlur={e=>e.target.style.borderColor='#DDE3EB'}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'#1A2A3E',marginBottom:10,textTransform:'uppercase'}}>Biological Sex</label>
            <div style={{display:'flex',gap:10}}>
              {['Male','Female'].map(s=>(
                <button key={s} onClick={()=>setSex(s)}
                  style={{flex:1,padding:'13px',fontSize:15,fontWeight:600,border:`2px solid ${sex===s?'#2D5F8A':'#DDE3EB'}`,borderRadius:10,cursor:'pointer',background:sex===s?'#1C3D5A':'#fff',color:sex===s?'#fff':'#374151',transition:'all 0.15s',fontFamily:'inherit'}}>
                  {s==='Male'?'♂ Male':'♀ Female'}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>ready&&onDone(`${sex}, Age ${age}`)} disabled={!ready}
            style={{width:'100%',padding:'14px',fontSize:15,fontWeight:700,color:'#fff',background:ready?'#1C3D5A':'#9CA3AF',border:'none',borderRadius:10,cursor:ready?'pointer':'not-allowed',transition:'background 0.2s',fontFamily:'inherit',letterSpacing:'.1px'}}
            onMouseEnter={e=>{if(ready)e.target.style.background='#2D5F8A';}} onMouseLeave={e=>{if(ready)e.target.style.background='#1C3D5A';}}>
            Use BioVise AI →
          </button>
          <p style={{fontSize:11,color:'#9CA3AF',marginTop:12,textAlign:'center',lineHeight:1.6}}>Your data stays in your browser session only. Nothing is stored on any server.</p>
        </div>
        <div style={{textAlign:'center',paddingBottom:32}}>
          <p style={{fontSize:11,color:'#9CA3AF',margin:'0 0 3px'}}>Powered by</p>
          <p style={{fontSize:13,fontWeight:600,color:'#1C3D5A',margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>Bio Precision Aging</p>
        </div>
      </div>
    </div>
  );
}

// ── Shared page content components ────────────────────────────────────────────
function HomeContent({name, allRecs, flagCount, uploads, setPage, isMobile}) {
  const pad = isMobile ? 'mob-pad' : '';
  return (
    <div className={pad} style={!isMobile?{padding:'0'}:{}}>
      <div className="hero">
        <div className="hlbl">Good morning · <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,.65)',textDecoration:'none',letterSpacing:'1px'}}>Bio Precision Aging</a></div>
        <div className="hname">{name}</div>
        <div className="hmsg">You have {allRecs.length} record{allRecs.length!==1?'s':''} on file{flagCount>0?` and ${flagCount} flagged for review`:' — all clear'}.</div>
        <div className="hbtns"><button className="hb hbacc" onClick={()=>setPage('ai')}>Ask AI</button><button className="hb hbgh" onClick={()=>setPage('records')}>My Records</button></div>
      </div>
      {flagCount>0&&<div className="wcard"><AlertTriangle size={15} style={{flexShrink:0,marginTop:1}}/><div><strong>Action needed:</strong> {flagCount} result{flagCount!==1?'s':''} flagged for review.</div><button className="btn btnS btnsm" style={{flexShrink:0,marginLeft:'auto'}} onClick={()=>setPage('records')}>View →</button></div>}
      <div className={isMobile?'mob-stats':'desk-stats'}>
        {[{lbl:'Records',num:String(allRecs.length),dsc:'On file',w:false},{lbl:'Uploaded',num:String(uploads.length),dsc:'By you',w:false},{lbl:'Flagged',num:String(flagCount),dsc:flagCount>0?'Review needed':'All clear',w:flagCount>0},{lbl:'Medications',num:String(uploads.filter(r=>r.type==='medication').length),dsc:'On file',w:false}].map(s=>(
          <div key={s.lbl} className={isMobile?'sc':'desk-sc'}><div className="slbl">{s.lbl}</div><div className={isMobile?'snum':'desk-snum'} style={s.w?{color:'#D97706'}:{}}>{s.num}</div><div className="sdsc" style={s.w?{color:'#B45309'}:{}}>{s.dsc}</div></div>
        ))}
      </div>
      <div style={{background:'#EEF5FB',border:'1px solid #C8DFF0',borderRadius:'var(--rd)',padding:'16px',marginBottom:isMobile?24:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:'#1C3D5A',marginBottom:8}}>Upload a Medical Record</div>
        <div style={{fontSize:13,color:'#2D5F8A',lineHeight:1.55,marginBottom:12}}>Add any lab result, imaging report, or medical document. Claude AI reads and categorizes it automatically.</div>
        <button className="btn btnP" style={{fontSize:13,padding:'8px 16px'}} onClick={()=>setPage('records')}><Upload size={13}/>Go to Records</button>
      </div>
    </div>
  );
}

function RecordsContent({uploads, setUploads, analyzing, setAnalyzing, filter, setFilter, allRecs, filtered, setPage, setInput, fileRef, toast2, drag, setDrag, setShowPaste}) {
  return (
    <>
      <div className={`upz ${drag?'drag':''} ${analyzing?'busy':''}`} onClick={()=>!analyzing&&fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)fileRef.current._analyze(f);}}>
        {analyzing?<><span className="spin" style={{display:'block',margin:'0 auto 9px',width:28,height:28,color:'var(--g5)'}}><Loader size={28}/></span><div style={{fontSize:14,fontWeight:600,color:'var(--g9)'}}>Analyzing with Claude AI…</div><div style={{fontSize:12,color:'var(--mu)',marginTop:5}}>Extracting key values from your document</div></>:<><Upload size={28} color="var(--mu)" style={{margin:'0 auto 8px',display:'block'}}/><div style={{fontSize:14,fontWeight:500}}>Tap to upload or drag & drop</div><div style={{fontSize:12,color:'var(--mu)',marginTop:4}}>PDF · JPG · PNG — Labs · Imaging · Notes</div><div style={{fontSize:12,color:'var(--g7)',marginTop:7,fontWeight:500}}>Claude AI analyzes and categorizes automatically</div><div style={{marginTop:10,paddingTop:10,borderTop:'1px dashed var(--bd)'}}><button onClick={e=>{e.stopPropagation();setShowPaste(true);}} style={{fontSize:12,color:'var(--g9)',background:'none',border:'none',cursor:'pointer',textDecoration:'underline',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',gap:5,margin:'0 auto'}}><ClipboardPaste size={13}/>Or paste / type text instead</button></div></>}
      </div>
      <div className="frow">{['All','Labs','Imaging','Notes','Meds'].map(f=>(<button key={f} className={`fc ${filter===f?'on':''}`} onClick={()=>setFilter(f)}>{f}{f==='All'?` (${allRecs.length})`:''}</button>))}</div>
      <div className="desk-records-grid" style={{display:'block'}}>
        {filtered.map(r=>(
          <div key={r.id} className={`rc fu ${r.flagged?'fl':''} ${r.isNew?'nr':''}`}>
            {r.isNew&&<button className="del" onClick={()=>setUploads(p=>p.filter(x=>x.id!==r.id))}><X size={11}/></button>}
            <div className="rtop">
              <div style={{display:'flex',gap:10,alignItems:'flex-start',flex:1,minWidth:0}}>
                <div className="rico" style={{background:r.color,color:r.iconColor}}>{RECICONS[r.type]||<FileText size={15}/>}</div>
                <div style={{flex:1,minWidth:0}}><div className="rname" style={{paddingRight:r.isNew?24:0}}>{r.name}</div><div className="rmeta">{r.date} · {(r.provider||'').slice(0,30)}{(r.provider||'').length>30?'…':''}</div>{r.isNew&&<span className="bnew">✓ Uploaded by you</span>}</div>
              </div>
              {r.flagged?<span className="bw"><AlertTriangle size={9}/>Review</span>:<span className="bg2"><CheckCircle2 size={9}/>OK</span>}
            </div>
            {r.flagReason&&<div style={{marginTop:8,fontSize:12,color:'var(--wtx)',background:'var(--wbg)',padding:'6px 10px',borderRadius:6}}>⚠ {r.flagReason}</div>}
            <div className="rvals">{(r.values||[]).map(v=><span key={v} className={`vc ${v.toLowerCase().includes('high')||v.toLowerCase().includes('low')||v.includes('⚠')?'w':''}`}>{v}</span>)}</div>
            <button className="btn btnO btnsm btnfull" style={{marginTop:10}} onClick={()=>{setPage('ai');setInput(`Can you explain my ${r.name}? Values: ${(r.values||[]).join(', ')}`);}}><MessageSquare size={12}/>Ask AI about this</button>
          </div>
        ))}
      </div>
    </>
  );
}

function ChatContent({msgs, busy, input, setInput, send, QUICK_QS, endRef, isMobile, recording, toggleVoice, voiceHint, lastModel, sources, setSources, library, setLibrary, showSrcMenu, setShowSrcMenu, libraryFileRef, addToLibrary}) {
  const [votes,setVotes]=useState({});const [shareIdx,setShareIdx]=useState(null);const [copiedIdx,setCopiedIdx]=useState(null);
  const vote=(i,dir)=>setVotes(v=>({...v,[i]:v[i]===dir?null:dir}));
  const copyText=async(i,content)=>{const plain=content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();try{await navigator.clipboard.writeText(plain);}catch{}setCopiedIdx(i);setTimeout(()=>setCopiedIdx(null),2000);};
  const userMsgs=msgs?.filter(m=>m.role==='user')||[];
  return (
    <>
      {shareIdx!==null&&(<ShareModal content={msgs[shareIdx]?.content||''} onClose={()=>setShareIdx(null)}/>)}

      {/* ── Precision Health AI header — matches Peptide / Hormone layout ── */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #DDE3EB',
        padding: '20px 28px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexShrink: 0,
      }}>
        <img
          src="data:image/jpeg;base64,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q8lr+AnSloooPTCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoor4h+Kf7Xfi/wCIP7Qdl8HvhTeW2g5vjYXviOe3W4k3pkzGNHygVArjkEsRwV7tK5y4jEQw6Tnu3ZJbtn29RXl1j8GdZ0uzLWvxS8YvqpXP2u9ltriJn94Gg2Bc9l2nHRgea4T4U/GTx/4i/aK1b4eeL9PsdMPh/RpLiabTyTBqjPLEIblFcFoxs3DZvblmyeBgsDr8jjGcWr6I+jKKKKR1BRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfi34zv8AxF+zT+1Zquqm3xquj65LexJMCEuYZHZhz/deN8ZHr7V+0leM/tFfst+EP2kNEjTVlbTtdtkK2Ot2igyw99rjpJHn+E++CpJNXGVnqeRmWEnioRdJ2lF3RofAb9pXwX+0Hoa3Xh6/WHVY4w15o10wW6tj3+X+Nc9HXI+h4HSP8PI/+FvQ+OI5USUaK+kSw7PmkHnLKjZ9sOMf7XtX5F/Fr4DfEr9k3xhZ6hcPPZpHNnTvEmkSOIXb0DjBR8ZyjYzzjcOa+5v2Kf21pPjZMvgzxiIoPGMMJktr6IBI9RRR82V6LKByQOCASAMYqpRtqjlwuYe1msPio8s1+L/r5M6v9rP9oD4i/s5Wlv4g03QdC1/wpdTrbeZKJo7i0kK5AkwxVlYhsMMehHc1v2Sv2k/Gf7TNvqepz23h3QtP0m7SC5tIop57mZWQsCrGRVjHoxD9Dx3r2f41/DO0+MHwt8ReErvAGo2rJDIR/qph80T/AIOFNfmd+wh8SLr4LftHHwxrJaztdadtFvYZDgRXSsRET7hwU/4GaSScX3HiatXDYynzSfs5fg/6sff37SfxH+Inwg8KXni3wvpuha/otksYudPvEmS7Qs4Tejq+1xll+XapHJyeldp4MuPHurfD1LrX10TR/Ft1H5sdvbwSz2tpkAqkgMitIw5yVZRngdMmr8TYk8Taz4W8IlBLFfXo1K9UjIFrassnP+9MbdfcM1egVHQ9aMW6snzO3bz6/ofnp8VP+CgXxT+GfxS1HwVf+HfCdvcafdpbT3QS5kV1bBEikyrgFGB5Bx3r6k1/Xfi7460eTVPh+PDOg6Y8e+wbxBFPPc34/hkKoVWBG6rnexBBIToPze/bPhS5/bD8UxSLujkvrNGU9wYYga/YKziSC0gjjUKiIqqo6AAcCtJWSVjx8DOrXq1qdSbtF2X4nxJ+yz+3d4l+IXxVT4e/EHStPttQupJYLW905GiKTxhi0UiMzA52kArjBAGDnI+4a/G74IuyftuaEVYqf+EtkGQccGZwa/ZGlNJPQ2ymvUr0pKo7tOx8m6d+3PpHj/46j4ceHriLQ7Zp2s4dc1Cya6W8uASPLjRZU8oEj5XbfuPBVcg1lftO/tH/ABT/AGVvFPh+4uZdB8Y+FtXL4jlsHtLmMxld6b1lIyQww+0jr8vHO5b/ALFvwk+EPxO/4WhqfiO50m1tb1r+C11S+hgsoJiSR87AMQCcqpbsMk9/Av8AgpJ8TNL+JOh+A7rQIru70SKe7EWsyQNFbXTbY8iAuA0ijHLgbDnAY84aSbVjmxFTE0cNOdaVpp6WfS66dj7++FvxG0v4tfD/AETxbo+9bDVIBMkcv342yVdGx3VgR+FfOH7Wv7U/xJ/Zm1TThFovhrWdJ1czGxu3W4SSMoRlJUEmCQrL8ysAeTgdK6T/AIJ3TPL+yx4d3tnZdXir7D7Q9eNf8FX/APkCfDv/AK+Lz/0GKkkuax04mvU/s9YiLtKyennY9l+APx6+If7QXwjstX0ix8PWPiB55472/uYp/sNoFkIjRIQ5eWQqAxBkUAEHJyFryTxr+2b8Vv2bvi9D4Z+Kej6HrmhzKs632iQyQSSQMSPMiLMQSpByjDORjcAQT6t/wToRV/ZZ0EhQC17ekkDqfPYc/kK8O/4Kv6VGJfh1qYQeaReWzP6geUwH6n86atzWOevOtHAxxMZvmST8ne3Q++/D+vWHinQ9P1jS7lLvTr+BLm3njPDxsAVP5GvlP4r/ALZusy/HzTvhB8N7PTTq0t8lhe65rCvLDDIeXWONGXcUHUluSCMd66r/AIJ6a3ca1+y74dW4cubK4urRCTn5FlYqPwDY/Cvib9s74Q+LfgV8e73x1pwuYdK1TUjqum6zbjiC4LeYY2PO11bJAP3h0zyAoxV2ma4zF1Vhadens7N27f11P0R8Za38RvhZ4Rv/ABE8um+P7fToGuLvTbexbTrpkUZd4n8yRTtAJ2FMnnDZwD0fwR8Z33xF+EvhXxPqKxR3ur2Ed5IkK4RC/IUfQED8K+c/2Yv2+fD/AMX4bbwp48Fv4f8AFM6/Z47gnbZagSMYBP8Aq3P9w8E9DkhR9TeBvB1j8PvB+keG9MaZ9P0u3W1gM7AvsUYGSABn6AVLVtGd+GqxrtVKU7xtt2enzPC/2of2x7D4E6lZeFdB0weJvHeobPJsC5WG33nEZlI5JY4wgwSOSV4zJ8U/E3xu+F3weufHLar4Y1fV9NhW81LQU0eVLdYuPMWOX7QXJQHOT12np0r8+vDniTUviN+2vZaw9vFqeoXfivzYbW8uDDG2yb91G0gRyqgKoyFPTpX6aePrX4meOPA/iDw6/g/wxbrqthPZGY+J53EfmIV3Y+wDOM5xkVbSjY83D4meM9rO7VtI2v8Afp+o39mP9o7Sf2kvAj6zZ2p0zVbKQW+o6az7/JkIyGVsDcjDJBwOhHavYK+RP2I/2UfHX7OHiXxNdeJdQ0a607VLSKJI9MuJZGEqOSCQ8aADDN69a+u6iVr6Hq4OdWdCLrq0uoUUUVJ2hRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXg/7GfxCg8dfCOa381Df6Nq19Y3MSnlP37yIcehRxj6H0r3ivnX4efskv8ACCYa34I8VzaN4ouQ51UXcBu9M1MtIzjzLcurKV3YVo5FwM8HJzStY5KvtFVhOCule/4HtXj/AMD6P8SPB+q+HNetI7zTL+BopY5Bnbxw4PZlOCD2IBr8hf2RtEvov2tPBtlprNO9lqz+ZLH3hjD+Yx9igP51+mPjnwr8bPGuhz6JaeJPCXhSC7jaG41SwtLm4u1Q8ExK7KqEjjkkjsQcGqv7N37IvhH9nCC4u7CWbXPEl3H5dxrN4gV9nUpEgyI1JAJGST3Y4GKT5UzzcVhp4vEUpxjZR1bf5dz3Ovyt/wCCi3wpm+GnxvtPGmkxta2PiEC7EsQwIr2IjzMHsT8j/UtX6Y+NviH4Y+G+mJqHinXtP0Cykfy45r+4WISPjO1cn5jjnArxL9rfwl4f/aF/Zyln0XVLLU2+1W8+i39pIJo5bhpRCI1Zc/e3lD6E84xSg7M2zKjHE0JQT95ao3f2YPGF38ZPD5+JmoWj2kuo2dvptrFJjhIVzO6+z3DS/URpXuNc58OfBVn8OPAegeGLAAWulWcVqpAxuKqAzfUnJPua1tYi1CfS7mPSrq2stRZCILi8tmuIo29WjWSMsPYOv1qXqz0KMZQppS1fX1PyI/bI/wCTyvEv/YQsv/RUNfsDD/qY/wDdFfE3j7/gm7f/ABL8b6n4s134qvNrOoTCeaSHQFRFIAChV+0HCgAADJ4HU19U2Hh/xtZ+A/7Lk8WaVceJUAji1ttDcRBBgZa3Fz8z4z8wcLkg7cDBuTTSseTgKFahVrTqQspO61Xn5+Z+UHwU/wCT29C/7G6T/wBHvX65+P8AxM3gzwN4h19IPtL6Xp896sI/jMcbMF/HFfH2gf8ABNe+8M+ObPxfY/FeZNetb0ahHcPoKsDNu3EkfaMEE5yPevsnTtLvbjw6NP8AEdxZaxcywtDdyWtm1tBMGyCBE0khUFTggue/rgE2nawssw9bDwnCpGzbutn+TPzE/ZHE/wC1X+0/Lq3xNvn8SmwsptSisL1t1uXDoqRrEflEa792wDB2jOec+q/8FXPLj0T4cwptTbPebY1wMKFiHA9K3D/wTZvfCPxCTxJ8O/ifeeEkSVnt1axMs9qpHKCRZVEi84wwHHBz39C+K/7Dlj8WfAFrp2r+NNUv/GUM4uG8U6lGJ3k+UgwiEMqxw8khEIweSWJOauuZM4oYTE/VKlCUPebve612+f3k/wDwTq/5NY8P/wDX5e/+j3rx3/gq/wD8gT4d/wDXxef+gxV9C/sy/s/eJ/gJ4YtfD9/45j1rRbSSaWHT7TS0twWkJJ8yVmdmAJLALswepYcV89f8FX/+QJ8O/wDr4vP/AEGKktZnTioyhlfJNWaSX4o9i/4J1f8AJrHh/wD6/L3/ANHvXz//AMFW/EEU2veANESQNPBb3V5JGDyodkVSR7+W35V6b+wtYePY/wBmTRrjwrq2iSQy3V3tsdds5CsLCZgSksLqSpxkqyk5JwwGAOh0L9iabxb8WW+I/wAXfE0PjLWQ6PBpFjaGCwh2fcQ7mLOi9QvGTksWycmik2xShVxOAp0Kcd1HXokd7+xj4Auvhx+zh4P0y+iMF9PA1/PGwwUMzmQA+4VlB+lbHw/8UaZ8e/C3jPRvEenWGo2+n67f6HeWLxbo3jilPlllYnkoUOfUEjFeqAAAADAHYV4d4G/Z41b4X+I/EviXw14qxq3iLUp7/UtP1G283T5g0rtGEVWV4pFVtvmBmB5yh4xF76nq+zlSVOnBXilZ/cfnx+21+yvbfs6+KtP1DQbiSbwrrbSG1hmbdLaSJgtEW/iXDAqx5xkHJGT9/fsOePNY+If7N/hvUddmkur+3aax+1Skl5kicqjEnqcYBPfbXK/Gj9lLxj+0x4l0eXx74r0zRvDOklmg0nw9bSSSyFsb2aaUgBiFAB2EAdupr6K8FeDNH+HvhXTfDmg2aWGk6dCIbeBOcAdST3JOSSeSSTVSldJHn4PByo4upVguWD2R+O+otP8As8/tcvcapC6poPiX7S4K8vbmXeGHrmNgR9a/ZjSNWs9e0u01LTrmO8sLuJZ4LiFtySIwyrA+hBrwv9pn9jfwr+0h5Ooz3Uvh7xTbxiKLV7aISCRB0SaMkbwMnBBUjPXHFeKeBP2E/jD4JiOi6d8c7vQfDJY5h0prkMoJySke9VRj3Kt+dNtSRlhqOIwFScIw5oSd1ZrT7z7MsfG2l6n4w1Lw1aStcalptvHcXnlrmODzCQiM3ZyFLbeu3nuM71cT8JPhHoXwZ8KjRNDFxN5krXN5qF7J5t1ezt9+aV/4mOPoO1dtWR78OdxvPcKKKKDQKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD51/bK/ZZvf2l/DeippGswaTrOjyyvAl6GNvOsgUMrlQWUjaCGAbuMc5En7O37Oet/DHwX4X8O+IbrTv7P0G5k1AW2n3MlyL29fOJnd4otiJuO2IK3zBWLnGK+hqKq7tY4/qlL2zr295hRRRUnYFFFFABRRRQAUUUUAFfJ/wC1j+y18Qf2mdU0uNdc8O6LomkPM1pGUneeTfty0hxgHCjge/J7fWFFNO2qOevQhiIezqbHzp+y/wDBT4mfs/8AhuDwpf6x4a13wyly06tGk8d1AHOXCnG1hnJAIHJPOOK+i6KKG76lUaUaMFCOyCiiikbBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVy/xG8eW/w78NtqcttLf3MkqWtnYwHEl1O5wkYPbJ6nsAevSgzqVIUYOpN2S3OooryK58YfFfw1Cmraz4V0bVNJLoJtO0CaeXUbdGIBOCu2UrnkL17cc161FIJY0cBgGAYBlKkZ9QeRQY0MTGu2kmmujTW/r/AF3H0V5h4w8deLY/ibb+EfC9posjtpR1J59XeZQAJdhUeWD7Hp612XhFvEzWMv8AwlCaTHeeZ+7GkPK0ezA6+YAc5z046UE08VCrUlTino7N20uvM3aK89+N/wASr34V+ErXWLDTk1WeW/htDatnLq+7O3H8XGB9ah8WfF+Gy8A6B4o0FIdQtdVvrS2XziRtWV9rZweGXkY9RQRUx1ClOdOUtYK79H+Z6RRRXk95478c618RvEvhzwzZ+Hvs2ipbM82rSTq7+am7jywRxg+nag1r4iGH5eZN8zsrK+tm/wAkz1iisvw0dabSIj4gWwTVMt5g01naDGflwXAbpjOR1rmPjF451TwF4e0660e2tLq/vtTt9OjS+ZhEDKSAxK88ED1oHUrwpUXWndJK+2v3Hd0V5loXxA8U6V450vwv4z0vSoZ9Xhmmsb7RLmSSItEAXjdZEVgcHORx0Fem0DoV4YhNwvo7NNWae/5NBRXk3jz43SeEPido3hyLT0udLcwjVdQJP+hmdikA9OSMnPY16zQTRxNKvKcKbu4Oz/r8PVNBRXGeMvHNz4a8a+C9Fht4pYdduLiGaSQndGI4t4K445PrXZ0GkKsakpQjvF2f3J/k0FFFFBsFFcR8XvH9z8PPCi3mm2S6nrV3cxWVhYuTiaZz045wFDH8K1fh74vi8e+CtI16FRH9tgV5Igc+XIOHT8GBH4UHKsTSdd4dP3kr/L+vzR0VFc98QfEk3g/wPrut28STz6fZyXKRS52sVUkA45xV7wxqr674a0nUpUWOS8tIbhkTopdAxA9uaDT2sfaey62v8tjTooooNgooooAKKKKACiiigAooooAKKKKACiiigAooooAK8v8Aj3pN/No3h/XdPsptSbw9rEGqTWUC7pJYVyH2r3YBs49jXqFFBzYigsRSlSbtfr27fifNnxm+LfhfxX4Un1Dwl4w1yTxBFaO1tp2hXM0AGPmaS4QKNoQZJLY6Yr3fwLczXvgjw9cXErzTy6dbySSyNuZ2MSkkk9STW0saqxYKAx6kDk06g5cPhatOvKvUmm5JKyTS066yep87/FW58P2v7Qli/iPxDdeG7I+HCEurTUJLJmf7QcIXQgkYycdOPavWvhlqfh7UPD7r4b8QT+I7OGZle6ub57yQOQDtMjknoRx7111FAqGDdCvOrdPmbe2uvS9/0PJ/2i/+QB4T/wCxn0//ANDavMvjZ4cv/h3rGn2FhAZPB+v+ILK9RF6WF6JgZFA7JIMsB2INfUtFMwxeWLFOcuezlaztta9/VNP9dwr5n1e98KWnx5+IH/CTeLL7wxujsPI+x6rLY+d+5O7PlsN2OOvTPvX0xRSOrGYT62oWaXK76q6ejXdd+5g+Br/SdR8L2Umh6q+taaoMcd9LctcPJgkHdIxJY5yMmvP/ANpi3N34U8MwLNLbNL4ksEE0JAePLMNy5BGR1GQa9eooNK+G9vhnh27XVrpfpf8AU8L8IaL/AMIt+0FeWPiO/vtdvbjT/P8AD2p6lNuZIulxCFUKgfODkKDt+te4XNxHaW8s8ziOGJC7u3RVAyT+VSUUBhcMsLGUIu6bb+/u+tu/ay6Hy1png7x18UvB/i/WbK10D7B4xna5hfUJp1u44ojtt9oVCowEDDnvzXufwg8YN45+HWi6rNxetD5F2h6rPGdkgP8AwJSfxrsqKDlwmX/VJqam3dWd+rve/lq5aa7njHxx13T/AA18RvhZqWq3cVhYQXt4ZbiZsIgMAAyfqRXpHhTx94d8crctoGsWurLbFRMbV92zOcZ+uD+Vb9FB0U8PUp151FJcsne1tfhS3v5X2Ciiig7zw3x1J4j8a/G2wtPDEelzr4QtvtU41aSRYPtNwCqD92CSyxjI9MmrPwJfVfCPirxZ4J15LOC7E39t2cdg7NB5M5O9Y94DbVcdCOrV7TRTPHjl/LX+s+0fNzNvtZq1vuS1vur2OH+OH/JH/GP/AGC5/wD0A1r/AA8/5EDwz/2DLX/0UtdDRSO5Uf37r36Wt82wooooOoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z"
          alt="Synapse AI"
          style={{
            width: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 12,
            mixBlendMode: 'multiply',
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#94A3B8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>BioVise · Bio Precision Aging</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1C3D5A', margin: '0 0 4px', fontFamily: "'Playfair Display', Georgia, serif" }}>Synapse AI Consultant</div>
          <div style={{ color: '#6B9EC8', fontSize: 11, margin: 0, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>General AI</div>
        </div>
      </div>

      <div className={isMobile?'mob-msgs':'desk-msgs'}>
        {(msgs||[]).map((m,i)=>(
          <div key={i} className={`${isMobile?'msg':'desk-msg'} ${m.role==='user'?'u':'a'} fu`}>
            <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>{m.role==='user'?'You':'Synapse'}{m.role==='assistant'&&m._model?.includes('opus')&&(<span className="model-badge badge-opus"><Brain size={9}/>Deep analysis · Opus</span>)}{m.role==='assistant'&&m._model&&!m._model.includes('opus')&&(<span className="model-badge badge-sonnet"><Zap size={9}/>Sonnet</span>)}</div>
            {m.role==='user'?<div className="mb">{m.content}</div>:<><div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/><div className="action-bar"><button className={`act-btn ${votes[i]==='up'?'voted':''}`} onClick={()=>vote(i,'up')}>👍 {votes[i]==='up'?'Helpful':''}</button><button className={`act-btn ${votes[i]==='down'?'voted':''}`} onClick={()=>vote(i,'down')}>👎 {votes[i]==='down'?'Not helpful':''}</button><div className="act-sep"/><button className="act-btn" onClick={()=>copyText(i,m.content)}>{copiedIdx===i?'✓ Copied':'📋 Copy'}</button><button className="act-btn" onClick={()=>setShareIdx(i)}>🔗 Share</button><button className="act-btn" onClick={()=>generatePDF(m.content,userMsgs[Math.floor(i/2)]?.content||'')}>📄 PDF</button></div></>}
          </div>
        ))}
        {busy&&(<div className={`${isMobile?'msg':'desk-msg'} a fu`}><div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>Synapse{lastModel==='opus'?<span className="model-badge badge-opus"><Brain size={9}/>Thinking deeply…</span>:<span className="model-badge badge-sonnet"><Zap size={9}/>Searching…</span>}</div><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>)}
        <div ref={endRef}/>
      </div>
      <div className={isMobile?'mob-cbot':'desk-cbot'}>
        <div className={isMobile?'':' desk-cbot-inner'}>
          <div className="qrow">{QUICK_QS.map(q=><button key={q} className="qc" onClick={()=>send(q)}>{q}</button>)}</div>
          {voiceHint&&<div className="voice-hint">{recording?'🔴 ':''}{voiceHint}</div>}
          {input&&recording&&<div className="transcript-preview">"{input}"</div>}
          <div className="src-bar">
            <span style={{fontSize:11,color:'var(--mu)',fontWeight:500,marginRight:2}}>Sources</span>
            <button className={`src-btn ${sources.clinicalWeb?'on':''}`} onClick={()=>setSources(s=>({...s,clinicalWeb:!s.clinicalWeb}))}>🌐 Clinical web<button className={`src-toggle ${sources.clinicalWeb?'on':''}`} onClick={e=>{e.stopPropagation();setSources(s=>({...s,clinicalWeb:!s.clinicalWeb}));}}/></button>
            <button className={`src-btn ${sources.literature?'on':''}`} onClick={()=>setSources(s=>({...s,literature:!s.literature}))}>📚 Literature &amp; guidelines<button className={`src-toggle ${sources.literature?'on':''}`} onClick={e=>{e.stopPropagation();setSources(s=>({...s,literature:!s.literature}));}}/></button>
            <button className={`src-btn ${library.length>0?'on':''}`} onClick={()=>setShowSrcMenu(v=>!v)}>🗂 My library{library.length>0&&<span className="src-count">{library.length}</span>}</button>
            {showSrcMenu&&(<div className="src-menu" onClick={e=>e.stopPropagation()}><div className="src-menu-item"><div className="src-menu-icon">🗂</div><div className="src-menu-info"><div className="src-menu-title">My Library</div><div className="src-menu-sub">Upload PDFs or text files. Claude will reference them when answering your questions.</div><label className="btn btnP btnsm" style={{marginTop:9,fontSize:11.5,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:5}}>+ Add document<input type="file" accept=".pdf,.txt,.md" style={{position:'absolute',opacity:0,width:0,height:0,overflow:'hidden'}} onChange={e=>{const f=e.target.files?.[0];if(f){addToLibrary(f);}e.target.value='';}} /></label>{library.map((doc,i)=>(<div key={i} className="lib-item">📄 <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{doc.name}</span><button className="lib-del" onClick={()=>setLibrary(prev=>prev.filter((_,j)=>j!==i))}><X size={12}/></button></div>))}{library.length===0&&<div style={{fontSize:12,color:'var(--mu)',marginTop:7,fontStyle:'italic'}}>No documents yet — add one above</div>}</div></div></div>)}
          </div>
          <div className={isMobile?'mob-irow':'desk-irow'}>
            <button className={`mic-btn ${recording?'recording':''}`} onClick={toggleVoice}>{recording?<MicOff size={17}/>:<Mic size={17}/>}</button>
            <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask any health question — or tap the mic to speak…" rows={1}/>
            <button className="sb" onClick={()=>send()} disabled={busy||!input.trim()}><Send size={16}/></button>
          </div>
          <div className="disc">⚕ For educational and clinical decision-support purposes only.</div>
          <div style={{textAlign:'center',marginTop:6,fontSize:10,color:'var(--mu)',letterSpacing:'.2px'}}>Powered by <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{fontWeight:600,color:'var(--g9)',textDecoration:'none'}}>Bio Precision Aging</a></div>
        </div>
      </div>
    </>
  );
}

function ProfileContent({name, initials, setName, uploads, setPage}) {
  return (
    <div style={{maxWidth:560}}>
      <div style={{display:'flex',alignItems:'center',gap:14,padding:'20px',background:'linear-gradient(135deg,#1C3D5A,#2D5F8A)',borderRadius:'var(--rd)',marginBottom:16,color:'#fff'}}>
        <div style={{width:52,height:52,borderRadius:'50%',background:'#6B9EC8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,flexShrink:0}}>{initials}</div>
        <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600}}>{name}</div><div style={{marginTop:6,display:'inline-flex',alignItems:'center',gap:3,padding:'2px 9px',background:'rgba(107,158,200,.2)',borderRadius:20,fontSize:10,color:'#C8E6F5',letterSpacing:.4}}><Lock size={9}/>No account needed</div></div>
        <button onClick={()=>setName(null)} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',padding:'7px 13px',borderRadius:8,fontSize:12,cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>Edit name</button>
      </div>
      <div style={{background:'var(--surf)',border:'1px solid var(--bd)',borderRadius:'var(--rd)',padding:'14px 16px',boxShadow:'var(--sh)',marginBottom:14}}>
        <div className="sh">Quick Actions</div>
        {[{ico:<Upload size={14}/>,bg:'#EEF5FB',tx:'#0C447C',lbl:'Upload a medical record',sub:'PDF or image analyzed by AI',fn:()=>setPage('records')},{ico:<MessageSquare size={14}/>,bg:'#EFF6FF',tx:'#1E40AF',lbl:'Ask AI a health question',sub:'Evidence-based guidance',fn:()=>setPage('ai')},{ico:<ExternalLink size={14}/>,bg:'#FEF9C3',tx:'#854D0E',lbl:'Connect Epic MyChart',sub:'FHIR sync — coming soon',fn:()=>{}}].map(a=>(
          <div key={a.lbl} className="prow" onClick={a.fn}><div className="pico" style={{background:a.bg,color:a.tx}}>{a.ico}</div><div style={{flex:1}}><div className="plbl">{a.lbl}</div><div className="plbl2">{a.sub}</div></div><ChevronRight size={14} color="var(--mu)"/></div>
        ))}
      </div>
      <div style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'var(--rd)',padding:'14px 16px',fontSize:13,color:'#1E40AF',lineHeight:1.6}}><strong style={{display:'block',marginBottom:4}}>How this works</strong>AI calls go through a secure server route — your API key is never in the browser. Uploaded files are analyzed and shown here, but nothing is stored permanently. Closing the tab clears your session.</div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function KatalysHealth() {
  const [name,setName]=useState(null);const [page,setPage]=useState('home');const [filter,setFilter]=useState('All');
  const [msgs,setMsgs]=useState(null);const [input,setInput]=useState('');const [busy,setBusy]=useState(false);
  const [uploads,setUploads]=useState([]);const [analyzing,setAnalyzing]=useState(false);const [toast,setToast]=useState(null);
  const [drag,setDrag]=useState(false);const [recording,setRecording]=useState(false);const [voiceHint,setVoiceHint]=useState('');
  const [lastModel,setLastModel]=useState('sonnet');const [showPaste,setShowPaste]=useState(false);
  const [sources,setSources]=useState({clinicalWeb:true,literature:true});const [library,setLibrary]=useState([]);
  const [showSrcMenu,setShowSrcMenu]=useState(false);
  const [showUpgrade,setShowUpgrade]=useState(false);
  const [freeCount,setFreeCount]=useState(()=>parseInt(localStorage.getItem('katalys_free')||'0'));
  const libraryFileRef=useRef(null);const recognitionRef=useRef(null);const mediaRecRef=useRef(null);
  const endRef=useRef(null);const fileRef=useRef(null);

  useEffect(()=>{if(name&&!msgs)setMsgs([{role:'assistant',content:`Hello! I'm Synapse — personalized for **${name}**.\n\nUpload records in the Records tab and I can see all your values — no copy-pasting needed. I'll give you [Verified] evidence-based guidance from recognized clinical guidelines.\n\nWhat would you like to know?`}]);},[name]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,busy]);
  useEffect(()=>{
    if(!showSrcMenu)return;
    const close=(e)=>{if(!e.target.closest('.src-bar')&&!e.target.closest('.src-menu')){setShowSrcMenu(false);}};
    document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close);
  },[showSrcMenu]);

  const toast2=(msg,err=false)=>{setToast({msg,err});setTimeout(()=>setToast(null),3500);};

  const addToLibrary=(file)=>{
    if(!file)return;const reader=new FileReader();
    reader.onload=(e)=>{const isText=file.type==='text/plain';
      if(isText){const text=e.target.result;setLibrary(prev=>[...prev,{name:file.name,text:text.slice(0,12000)}]);toast2(`✓ "${file.name}" added to My Library`);}
      else{const b64=e.target.result.split(',')[1];setLibrary(prev=>[...prev,{name:file.name,b64,type:file.type}]);toast2(`✓ "${file.name}" added to My Library`);}
    };
    if(file.type==='text/plain')reader.readAsText(file);else reader.readAsDataURL(file);
    if(libraryFileRef.current)libraryFileRef.current.value='';
  };

  const startVoice=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(SR){const r=new SR();r.continuous=false;r.interimResults=true;r.lang='en-US';recognitionRef.current=r;
      r.onstart=()=>{setRecording(true);setVoiceHint('Listening… speak your question');};
      r.onresult=(e)=>{const t=Array.from(e.results).map(r=>r[0].transcript).join('');setInput(t);if(e.results[e.results.length-1].isFinal)setVoiceHint('Got it — tap send or keep talking');};
      r.onerror=(e)=>{setRecording(false);setVoiceHint('');if(e.error!=='aborted')toast2('Microphone error: '+e.error,true);};
      r.onend=()=>{setRecording(false);setVoiceHint('');recognitionRef.current=null;};r.start();return;
    }
    if(!navigator.mediaDevices?.getUserMedia){toast2('Voice input not supported in this browser. Try Chrome or Edge.',true);return;}
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
      const chunks=[];const mimeType=MediaRecorder.isTypeSupported('audio/webm')?'audio/webm':'audio/mp4';
      const rec=new MediaRecorder(stream,{mimeType});mediaRecRef.current=rec;rec.ondataavailable=e=>chunks.push(e.data);
      rec.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());setVoiceHint('Transcribing…');
        try{const blob=new Blob(chunks,{type:mimeType});const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(blob);});
          const resp=await fetch('/api/transcribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audio:b64,mimeType})});
          const data=await resp.json();if(data.transcript)setInput(data.transcript);else toast2(data.error||'Could not transcribe audio',true);
        }catch{toast2('Transcription failed — please try again',true);}
        finally{setRecording(false);setVoiceHint('');mediaRecRef.current=null;}
      };
      rec.start();setRecording(true);setVoiceHint('Recording… tap mic again to stop');
    }).catch(()=>{toast2('Microphone access denied',true);});
  };
  const stopVoice=()=>{if(recognitionRef.current){recognitionRef.current.stop();recognitionRef.current=null;}if(mediaRecRef.current&&mediaRecRef.current.state!=='inactive')mediaRecRef.current.stop();setRecording(false);setVoiceHint('');};
  const toggleVoice=()=>recording?stopVoice():startVoice();

  const analyze=async(file)=>{
    if(analyzing)return;
    if(!['application/pdf','image/jpeg','image/png','image/webp','image/gif'].includes(file.type)){toast2('Please upload a PDF or image',true);return;}
    if(file.size>20*1024*1024){toast2('File too large — max 20 MB',true);return;}
    setAnalyzing(true);toast2(`Analyzing ${file.name}…`);
    try{
      const b64=await toBase64(file);const isPDF=file.type==='application/pdf';
      const blk=isPDF?{type:'document',source:{type:'base64',media_type:'application/pdf',data:b64}}:{type:'image',source:{type:'base64',media_type:file.type,data:b64}};
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:1000,system:ANALYZE_PROMPT,messages:[{role:'user',content:[blk,{type:'text',text:'Analyze this medical document and return the JSON object.'}]}]});
      const d=await r.json();if(d.error){throw new Error(d.error.message||'API error');}
      const txt=d.content?.[0]?.text||'';let p=null;
      const cm=txt.match(/```(?:json)?\s*([\s\S]*?)```/);if(cm){try{p=JSON.parse(cm[1].trim());}catch{}}
      if(!p){const om=txt.match(/\{[\s\S]*\}/);if(om){try{p=JSON.parse(om[0]);}catch{}}}
      if(!p){try{p=JSON.parse(txt.trim());}catch{}}
      if(!p){throw new Error('Analysis failed — please try again');}
      const sty=TYPE_STYLE[p.type]||TYPE_STYLE.note;
      const rec={id:Date.now(),isNew:true,type:p.type||'note',name:p.title||file.name,date:p.date||new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),provider:p.provider||'Uploaded',flagged:!!p.flagged,flagReason:p.flagReason||null,values:p.values||['Document uploaded'],color:sty.color,iconColor:sty.iconColor};
      setUploads(prev=>[rec,...prev]);setPage('records');setFilter('All');toast2(`✓ ${p.title||file.name} added`);
    }catch(e){toast2(e.message||'Analysis failed',true);}
    finally{setAnalyzing(false);if(fileRef.current)fileRef.current.value='';}
  };

  useEffect(()=>{if(fileRef.current)fileRef.current._analyze=analyze;},[analyzing,uploads]);

  const analyzeText=async(text,hintType,hintTitle)=>{
    setAnalyzing(true);
    try{
      const textPrompt=`Analyze this pasted health information (type hint: ${hintType}).\nThe user pasted this text:\n\n${text}\n\nReturn the JSON object as instructed.`;
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:1000,system:ANALYZE_PROMPT,_skipRouting:true,messages:[{role:'user',content:textPrompt}]});
      const d=await r.json();if(d.error)throw new Error(d.error.message||'Analysis error');
      const txt=d.content?.[0]?.text||d.mergedText||'';let p=null;
      const cm=txt.match(/```(?:json)?\s*([\s\S]*?)```/);if(cm){try{p=JSON.parse(cm[1].trim());}catch{}}
      if(!p){const om=txt.match(/\{[\s\S]*\}/);if(om){try{p=JSON.parse(om[0]);}catch{}}}
      if(!p){try{p=JSON.parse(txt.trim());}catch{}}
      if(!p)throw new Error('Could not parse response — try again');
      const sty=TYPE_STYLE[p.type]||TYPE_STYLE[hintType]||TYPE_STYLE.note;
      setUploads(prev=>[{id:Date.now(),isNew:true,type:p.type||hintType||'note',name:hintTitle||p.title||`Pasted ${hintType}`,date:p.date||new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),provider:p.provider||'Pasted text',flagged:!!p.flagged,flagReason:p.flagReason||null,values:p.values||[text.slice(0,80)+'…'],color:sty.color,iconColor:sty.iconColor},...prev]);
      setPage('records');setFilter('All');toast2(`✓ ${hintTitle||p.title||'Pasted text'} added to records`);setShowPaste(false);
    }catch(e){toast2(e.message||'Analysis failed — please try again',true);}
    finally{setAnalyzing(false);}
  };

  const handlePasteClose=({sendToChat}={})=>{setShowPaste(false);if(sendToChat){setPage('ai');setInput(sendToChat.slice(0,800));}};

  const send=async(text)=>{
    const m=(text||input).trim();if(!m||busy)return;
    // Free tier gate — 3 inquiries max
    const userTier=localStorage.getItem('katalys_tier')||'explorer';
    if(userTier==='explorer'&&freeCount>=3){setShowUpgrade(true);return;}
    if(userTier==='explorer'){const next=freeCount+1;setFreeCount(next);localStorage.setItem('katalys_free',next);}
    const h=[...(msgs||[]),{role:'user',content:m}];setMsgs(h);setInput('');setBusy(true);
    try{
      const libraryText=library.length>0?library.map(d=>`[Library: ${d.name}]\n${d.text||'(PDF)'}`).join('\n\n'):null;
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:2048,system:makeChatPrompt(name,uploads),messages:h,_sources:sources,_libraryText:libraryText});
      const d=await r.json();
      if(d._meta?.model?.includes('opus'))setLastModel('opus');else setLastModel('sonnet');
      const reply=d.mergedText||d.content?.[0]?.text||'Error — try again.';
      setMsgs(p=>[...p,{role:'assistant',content:reply,_model:d._meta?.model,_sources:d._meta?.sources}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',content:'⚠ Connection error. Please try again.'}]);}
    finally{setBusy(false);}
  };

  if(!name)return <Setup onDone={n=>setName(n)}/>;

  const allRecs=[...uploads];
  const filtered=allRecs.filter(r=>filter==='All'?true:filter==='Labs'?r.type==='lab':filter==='Imaging'?r.type==='imaging':filter==='Notes'?r.type==='note':filter==='Meds'?r.type==='medication':true);
  const flagCount=allRecs.filter(r=>r.flagged).length;
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const NAV=[{id:'home',lbl:'Home',I:Home},{id:'records',lbl:'Records',I:FolderOpen},{id:'ai',lbl:'AI Consultant',I:MessageSquare},{id:'peptide',lbl:'Peptide Consultant',I:Dna},{id:'hormone',lbl:'Hormone Consultant',I:Brain},{id:'info',lbl:'What is BioVise?',I:Info},{id:'plans',lbl:'Plans',I:CreditCard},{id:'profile',lbl:'Profile',I:User}];
  const sharedProps={uploads,setUploads,analyzing,setAnalyzing,filter,setFilter,allRecs,filtered,setPage,setInput,fileRef,toast2,drag,setDrag,msgs,busy,input,send,endRef,name,initials,setName,flagCount,recording,toggleVoice,voiceHint,lastModel,setShowPaste,sources,setSources,library,setLibrary,showSrcMenu,setShowSrcMenu,libraryFileRef,addToLibrary};

  return (
    <>
      <style>{CSS}</style>
      <input ref={fileRef} type="file" accept=".pdf,image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)analyze(f);}}/>
      <input ref={libraryFileRef} type="file" accept=".pdf,.txt,.md" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)addToLibrary(f);}}/>
      {toast&&<div className={`toast ${toast.err?'err':''}`}>{toast.msg}</div>}
      {showPaste&&<PasteModal onClose={handlePasteClose} onAnalyze={analyzeText} analyzing={analyzing}/>}
      {showUpgrade&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowUpgrade(false)}>
          <div className="modal" style={{maxWidth:420}}>
            <div className="modal-hd"><div className="modal-title">Upgrade to continue</div><button className="modal-close" onClick={()=>setShowUpgrade(false)}><X size={14}/></button></div>
            <div className="modal-body">
              <div style={{textAlign:'center',padding:'8px 0 16px'}}>
                <div style={{width:52,height:52,borderRadius:'50%',background:'#C8DFF0',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><img src={katalysLogo} alt="BioVise" style={{height:28,width:'auto'}}/></div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:600,color:'var(--tx)',marginBottom:8}}>You've used your 3 free inquiries</div>
                <div style={{fontSize:13,color:'var(--mu)',lineHeight:1.65,marginBottom:20}}>Upgrade to Essential for $9/month — 50 inquiries, record uploads, voice input, and PDF export. Or go Clinical for full Opus deep reasoning.</div>
                <button className="btn btnP btnfull" style={{marginBottom:8}} onClick={()=>{setShowUpgrade(false);setPage('plans');}}><CreditCard size={14}/>See plans &amp; pricing</button>
                <button className="btn btnO btnfull" onClick={()=>setShowUpgrade(false)}>Maybe later</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button className="paste-fab" onClick={()=>setShowPaste(true)} title="Paste or type health information" aria-label="Open paste text panel"><ClipboardPaste size={18}/></button>

      {/* ══ MOBILE ══ */}
      <div className="mob-wrap">
        <div className="phone">
          <div className="mob-hd">
            {page==='home'
              ?<div className="logo"><img src={katalysLogo} alt="BioVise" style={{height:22,width:'auto'}}/>BioVise Health<span style={{fontSize:11,fontWeight:400,color:'var(--mu)',borderLeft:'1px solid var(--bd)',paddingLeft:8,marginLeft:2}}><a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--mu)',textDecoration:'none'}}>Bio Precision Aging</a></span></div>
              :<div><div className="ptitle">{{records:'My Records',ai:'AI Consultant',peptide:'Peptide Consultant',hormone:'Hormone Consultant',profile:'Profile'}[page]}</div>
              <div className="psub">{{records:'Labs, imaging & notes',ai:uploads.length>0?`Seeing ${uploads.length} record${uploads.length!==1?'s':''}` :'Upload records for full context',peptide:'Bio Precision Peptide AI',hormone:'Hormone Optimization',info:'About the platform',plans:'Explorer, Essential, Clinical',profile:name}[page]}</div></div>}
            <div style={{display:'flex',gap:7,alignItems:'center'}}>
              {page==='records'&&<button className="btn btnP btnsm" onClick={()=>!analyzing&&fileRef.current?.click()} disabled={analyzing}>{analyzing?<span className="spin"><Loader size={12}/></span>:<Upload size={12}/>}{analyzing?'Analyzing…':'Upload'}</button>}
              <div style={{width:34,height:34,borderRadius:8,background:'#EEF5FB',border:'1px solid #C8DFF0',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Bell size={14} color="#2D5F8A"/></div>
            </div>
          </div>
          <div className="mob-content">
            {page==='home'&&<div className="mob-pad"><HomeContent {...sharedProps} isMobile={true}/></div>}
            {page==='records'&&<div className="mob-pad"><RecordsContent {...sharedProps}/></div>}
            {page==='ai'&&<div className="mob-chat"><ChatContent {...sharedProps} QUICK_QS={QUICK_QS} isMobile={true}/></div>}
            {page==='peptide'&&<div className="mob-chat"><PeptideOverview /></div>}
            {page==='hormone'&&<div className="mob-chat"><HormoneConsultant /></div>}
            {page==='info'&&<div style={{overflowY:'auto',height:'100%',flex:1}}><KatalysInfoPage onLaunch={()=>setPage('home')}/></div>}
            {page==='plans'&&<div className="mob-pad"><PricingPage onSelectPlan={(plan)=>{toast2(`Redirecting to ${plan} checkout…`);}} currentTier={localStorage.getItem('katalys_tier')||'explorer'}/></div>}
            {page==='profile'&&<div className="mob-pad"><ProfileContent {...sharedProps}/></div>}
          </div>
          <nav className="bnav">
            {NAV.map(({id,lbl,I})=>{const on=page===id;return(
              <button key={id} className={`bni ${on?'on':''}`} onClick={()=>setPage(id)}>
                <I size={21} color={on?'#1C3D5A':'#9CA3AF'} strokeWidth={on?2.5:1.8}/>
                <span className="bnlbl">{lbl}</span>
                {on&&<div className="bnd"/>}
              </button>
            );})}
          </nav>
        </div>
      </div>

      {/* ══ DESKTOP ══ */}
      <div className="desk-app">
        <aside className="desk-side">
          <div className="desk-brand">
            <img src={katalysLogo} alt="BioVise" style={{height:28,width:'auto'}}/>
            <div><span className="desk-brand-name">BioVise Health</span><div style={{fontSize:10,color:'rgba(255,255,255,.5)',marginTop:2,letterSpacing:'.2px'}}>Powered by <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,.7)',textDecoration:'none',fontWeight:500}}>Bio Precision Aging</a></div></div>
          </div>
          <nav className="desk-nav">
            {NAV.map(({id,lbl,I})=>(<button key={id} className={`desk-nav-item ${page===id?'on':''}`} onClick={()=>setPage(id)}><I size={18} strokeWidth={page===id?2.2:1.8}/>{lbl}<div className="desk-dot"/></button>))}
          </nav>
          <div className="desk-user">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div className="desk-avatar">{initials}</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div><div style={{fontSize:11,color:'rgba(255,255,255,.5)',marginTop:1}}>Health AI session</div></div>
            </div>
          </div>
        </aside>
        <main className="desk-main">
          <div className="desk-topbar">
            <div>
              <div className="desk-page-title">{page==='home'?`Good morning`:{records:'My Records',ai:'AI Consultant',peptide:'Peptide Consultant',hormone:'Hormone Consultant',info:'What is BioVise?',plans:'Plans',profile:'Profile'}[page]}</div>
              <div className="desk-page-sub">{{home:'Your health records at a glance',records:'Labs, imaging & notes',peptide:'Personalized peptide recommendations',hormone:'Hormone optimization',info:'About the platform',plans:'Explorer, Essential & Clinical',ai:uploads.length>0?`Seeing ${uploads.length} uploaded record${uploads.length!==1?'s':''}` :'Upload records so AI can reference them',profile:'Your session'}[page]}</div>
            </div>
            {page==='records'&&(<button className="btn btnP" onClick={()=>!analyzing&&fileRef.current?.click()} disabled={analyzing}>{analyzing?<><span className="spin"><Loader size={14}/></span>Analyzing…</>:<><Upload size={14}/>Upload Record</>}</button>)}
          </div>
          {page==='home'&&<div className="desk-content"><HomeContent {...sharedProps} isMobile={false}/></div>}
          {page==='records'&&<div className="desk-content"><RecordsContent {...sharedProps}/></div>}
          {page==='ai'&&<div className="desk-chat"><ChatContent {...sharedProps} QUICK_QS={QUICK_QS} isMobile={false}/></div>}
          {page==='peptide'&&<div className="desk-chat"><PeptideOverview /></div>}
          {page==='hormone'&&<div className="desk-chat"><HormoneConsultant /></div>}
          {page==='info'&&<div style={{flex:1,overflowY:'auto',minHeight:0}}><KatalysInfoPage onLaunch={()=>setPage('home')}/></div>}
          {page==='plans'&&<div className="desk-content"><PricingPage onSelectPlan={(plan)=>{toast2(`Redirecting to ${plan} checkout…`);}} currentTier={localStorage.getItem('katalys_tier')||'explorer'}/></div>}
          {page==='profile'&&<div className="desk-content"><ProfileContent {...sharedProps}/></div>}
        </main>
      </div>
    </>
  );
}

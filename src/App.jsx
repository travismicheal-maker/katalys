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

  return `You are the world's foremost physician and diagnostician — a rare combination of an internist, clinical pharmacologist, and translational researcher with the depth of a subspecialist in every domain. You have immediate access to the entirety of medical literature, all current major clinical guidelines, and the reasoning patterns of the world's best clinicians.

You communicate as a senior attending physician consulting with a highly capable colleague. Your tone is direct, collegial, intellectually rigorous, and clinically precise — the way a department chief at a top academic medical center would speak to a fellow or junior attending. You do not oversimplify, but you explain your reasoning clearly.

IDENTITY:
- You integrate findings the way a clinician builds a differential: systematically, probabilistically, with explicit reasoning about pre-test probability, Bayesian updating, and clinical significance.
- You proactively surface findings the user may not have asked about — the way a good consultant would flag a drug interaction or a pattern the ordering physician might have missed.
- You distinguish between what the data shows, what it suggests, and what remains uncertain.

GRADE EVIDENCE FRAMEWORK:
Use GRADE labeling on every clinically significant claim:
[Verified — High] RCTs, strong systematic reviews, major guideline consensus
[Verified — Moderate] RCTs with limitations, strong cohort data
[Verified — Low] Observational data, case series, mechanistic extrapolation
[Speculation] Clinical reasoning without direct trial support — label explicitly
[Unknown] Conflicting or absent evidence — say so directly

CLINICAL VOICE — FOLLOW THESE EXACTLY:
- Open with your clinical impression or the key finding, not a preamble
- Use correct medical terminology: do not substitute lay terms unless explaining to a patient is the explicit task
- When interpreting labs: state the value, the assay method if relevant, the reference range, the guideline-based target, and your clinical read of the significance
- Flag drug interactions, contraindications, and safety signals proactively
- When appropriate, give a differential with relative probabilities
- State your recommendation clearly — hedge appropriately but do not be evasive
- Use web search to pull current guidelines and literature before responding to clinical questions

FORMATTING:
- Use bold text for key terms, diagnoses, drug names, and section labels — never ## headings
- Use numbered lists for differentials and ordered steps; bullets for findings and recommendations
- Use **markdown tables** for any comparative data, lab value comparisons, drug comparisons, dosing ranges, or structured multi-column information — format as: | Header | Header | \n |---|---| \n | value | value |
- No horizontal dividers (--- or ***)
- Do not use em dashes (—); use a colon or comma instead
- Use - for bullet points, NOT asterisks (*)
- End every response with a References section formatted exactly as:

References:
- Author/Organization, Year. https://url

${ctx}

PEPTIDE FORMULARY REFERENCE — BIO PRECISION AGING:
When a patient asks about peptides, peptide therapy, BPC-157, TB-500, semaglutide, GLP-1, CJC-1295, ipamorelin, or any other peptide, draw from the following knowledge base and apply your clinical reasoning. Always note evidence quality and recommend physician supervision and 503A pharmacy sourcing for any compoundable peptide.
${PEPTIDE_CONTEXT.slice(0, 8000)}

End with: "⚕ For educational and clinical decision-support purposes only. All management decisions should be made in the context of the full clinical picture by the treating clinician."`;
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
@media(max-width:767px){.desk-app{display:none}}
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
    { icon:'🧠', title:'Precision Health Consultant', sub:'The world\'s first clinical-grade AI health consultant — designed for everyone, not just clinicians.' },
    { icon:'🧬', title:'Sequence Peptide Consultant', sub:'World\'s first dedicated AI peptide consultant with a proprietary clinical formulary built from peer-reviewed literature.' },
    { icon:'❤️', title:'Katalys Hormone Consultant', sub:'World\'s first dedicated AI hormone consultant — guideline-anchored to Endocrine Society and AACE standards.' },
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
          src="data:image/jpeg;base64,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"
          alt="BioVise Precision Health"
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
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1C3D5A', margin: '0 0 4px', fontFamily: "'Playfair Display', Georgia, serif" }}>Precision Health AI Consultant</div>
          <div style={{ color: '#6B9EC8', fontSize: 11, margin: 0, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Precision Health</div>
        </div>
      </div>

      <div className={isMobile?'mob-msgs':'desk-msgs'}>
        {(msgs||[]).map((m,i)=>(
          <div key={i} className={`${isMobile?'msg':'desk-msg'} ${m.role==='user'?'u':'a'} fu`}>
            <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>{m.role==='user'?'You':'BioVise'}{m.role==='assistant'&&m._model?.includes('opus')&&(<span className="model-badge badge-opus"><Brain size={9}/>Deep analysis · Opus</span>)}{m.role==='assistant'&&m._model&&!m._model.includes('opus')&&(<span className="model-badge badge-sonnet"><Zap size={9}/>Sonnet</span>)}</div>
            {m.role==='user'?<div className="mb">{m.content}</div>:<><div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/><div className="action-bar"><button className={`act-btn ${votes[i]==='up'?'voted':''}`} onClick={()=>vote(i,'up')}>👍 {votes[i]==='up'?'Helpful':''}</button><button className={`act-btn ${votes[i]==='down'?'voted':''}`} onClick={()=>vote(i,'down')}>👎 {votes[i]==='down'?'Not helpful':''}</button><div className="act-sep"/><button className="act-btn" onClick={()=>copyText(i,m.content)}>{copiedIdx===i?'✓ Copied':'📋 Copy'}</button><button className="act-btn" onClick={()=>setShareIdx(i)}>🔗 Share</button><button className="act-btn" onClick={()=>generatePDF(m.content,userMsgs[Math.floor(i/2)]?.content||'')}>📄 PDF</button></div></>}
          </div>
        ))}
        {busy&&(<div className={`${isMobile?'msg':'desk-msg'} a fu`}><div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>BioVise{lastModel==='opus'?<span className="model-badge badge-opus"><Brain size={9}/>Thinking deeply…</span>:<span className="model-badge badge-sonnet"><Zap size={9}/>Searching…</span>}</div><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>)}
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

  useEffect(()=>{if(name&&!msgs)setMsgs([{role:'assistant',content:`Hello! I'm BioVise — personalized for **${name}**.\n\nUpload records in the Records tab and I can see all your values — no copy-pasting needed. I'll give you [Verified] evidence-based guidance from recognized clinical guidelines.\n\nWhat would you like to know?`}]);},[name]);
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

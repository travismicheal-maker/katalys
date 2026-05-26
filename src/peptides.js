// src/peptides.js
// Peptide knowledge base — Vitae Bio Precision Aging
// Last updated: May 24, 2026
// ─────────────────────────────────────────
// BPC-157          — 200+ preclinical + 3 human studies (May 2026)
// MOTS-c           — 12 peer-reviewed sources (May 2026)
// Tesamorelin      — 6 peer-reviewed sources incl. 3 RCTs (May 2026)
// CJC-1295         — 4 peer-reviewed sources (May 2026)
// HCG              — 4 peer-reviewed sources (May 2026)
// Thymosin Alpha-1 — 8 peer-reviewed sources (May 2026) — UPDATED
// ARA-290          — 4 peer-reviewed sources incl. SLE models (May 2026) — UPDATED
// Glutathione      — 5 peer-reviewed sources (May 2026) — NEW
// NAD+             — 7 peer-reviewed sources (May 2026) — NEW
// Gonadorelin      — FDA + Endocrine Society guideline (May 2026) — NEW
// MK-677           — Nass 2008 RCT + halted trial (May 2026) — NEW
// ─────────────────────────────────────────
// Remaining entries: foundational entries, pending full literature extraction
// ─────────────────────────────────────────────────────────────

export const PEPTIDE_GOALS_DATA = [
  { id: 'recovery',        label: 'Recovery & Healing',         icon: '🔄' },
  { id: 'sleep',           label: 'Sleep Quality',              icon: '😴' },
  { id: 'muscle_mass',     label: 'Muscle Mass & Strength',     icon: '💪' },
  { id: 'weight_loss',     label: 'Weight Reduction',           icon: '⚖️' },
  { id: 'visceral_fat',    label: 'Visceral Fat Reduction',     icon: '🎯' },
  { id: 'longevity',       label: 'Longevity & Anti-Aging',     icon: '⏳' },
  { id: 'mitochondrial',   label: 'Cellular / Mitochondrial',   icon: '⚡' },
  { id: 'fertility',       label: 'Fertility & Hormonal',       icon: '🧬' },
  { id: 'fatigue',         label: 'Physical Fatigue',           icon: '🔋' },
  { id: 'mental_clarity',  label: 'Mental Clarity & Cognition', icon: '🧠' },
  { id: 'inflammation',    label: 'Inflammation Reduction',     icon: '🛡️' },
  { id: 'metabolic_health',label: 'Metabolic Health',           icon: '📊' },
  { id: 'sexual_function', label: 'Sexual Health',              icon: '💚' },
  { id: 'gut_health',      label: 'Gut & GI Health',            icon: '🌿' },
  { id: 'neuroprotection', label: 'Neuroprotection',            icon: '🔬' },
  { id: 'anti_aging',      label: 'Skin & Connective Tissue',   icon: '✨' },
];

export const PEPTIDE_KNOWLEDGE_BASE = [

  // ─── BPC-157 ────────────────────────────────────────────────────────────────
  {
    id: 'bpc157',
    name: 'BPC-157',
    fullName: 'Body Protection Compound 157',
    aliases: ['BPC 157', 'PL-10', 'PLD-116', 'PL14736', 'Bepectin'],
    category: 'Healing & Cytoprotection',
    categoryTag: 'healing',
    goals: ['recovery', 'gut_health', 'inflammation', 'neuroprotection', 'anti_aging'],
    regulatoryStatus: 'Category 1 (compoundable by prescription) — reclassified Feb 27, 2026 by HHS. FDA safety review concludes July 2026.',
    researchLevel: 'moderate',
    researchSummary: '200+ preclinical publications (1993–2024). Three published human studies as of 2026: IV safety pilot (Lee 2025), interstitial cystitis pilot (Lee 2024), knee pain intra-articular (Lee 2021).',
    molecular: {
      formula: 'C62H98N16O22',
      molecularWeight: 1419.5355,
      sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
      sequenceAbbrev: 'GEPPPGKPADDAGLV',
      source: 'Partial sequence of Body Protection Compound (BPC) isolated from human gastric juice (Sikiric et al., 1993)',
      stability: 'Stable in water, saline, and human gastric juice for >24 h. Resistant to hydrolysis and enzyme digestion.',
    },
    summary: 'BPC-157 is a synthetic 15-amino-acid pentadecapeptide isolated from human gastric juice. It is the most extensively studied healing peptide in preclinical literature with over 200 published studies covering tendon, ligament, muscle, bone, GI tract, brain, and vascular healing models.',
    mechanism: `BPC-157 operates through several overlapping pathways:
• VEGFR2 Upregulation — Primary angiogenic mechanism. Stimulates vascular endothelial growth factor receptor-2 expression in ischemic tissue.
• Nitric Oxide (NO) / eNOS Modulation — Interacts with the NO synthase system bidirectionally.
• FAK-Paxillin Pathway — Activates focal adhesion kinase signaling, promoting cell survival, migration, and outgrowth.
• Growth Hormone Receptor (GHR) Upregulation — BPC-157 dose- and time-dependently increases GHR expression in tendon fibroblasts up to 7-fold by day 3.
• EGR-1 / NAB2 Expression — Stimulates early growth response-1 gene and promotes collagen organization.
• Dopamine, Serotonin & Prostaglandin Modulation — Interacts with dopaminergic and serotonergic systems.
• Antioxidant Enzyme Upregulation — Increases HO-1, NQO-1, glutathione reductase, GPX2, GST-pi.`,
    benefits: [
      'Accelerates tendon-to-bone healing and ligament repair (Achilles, quadriceps, rotator cuff models)',
      'Heals GI tract: peptic ulcers, IBD, colocutaneous fistulas, NSAID-induced damage',
      'Repairs burn wounds topically — outperforms silver sulfadiazine in re-epithelialization, collagen formation, angiogenesis',
      'Stimulates angiogenesis — optimizes vascular response',
      'Neuroprotection — improves TBI outcomes, sciatic nerve healing, spinal cord injury in rats',
      'Reduces systemic inflammation (lowers IL-6, TNF-α, LTB4, TXB2, MPO)',
      'Antidepressant and anxiolytic properties measured in Porsolt test',
      'Cytoprotective: shields against NSAID toxicity, corticosteroid impairment, alcohol liver damage',
      'Gastroprotective: stable in gastric juice, basal protectant in saliva and gastric mucosa',
      'Interstitial cystitis: 10/12 patients with moderate-severe IC had 100% symptom resolution (Lee 2024)',
    ],
    pharmacokinetics: {
      halfLife: '<30 minutes — consistent across rats and dogs',
      tmax: '3 min (rats IM), 6–9 min (dogs IM)',
      bioavailabilityIM: '14–19% (rats), 45–51% (dogs)',
      metabolism: 'Rapidly degraded by endopeptidases → proline (main metabolite, 86% of plasma radioactivity at 1h)',
      excretion: 'Primary: urinary (15.9% in 72h). Secondary: biliary (9.1% in 72h).',
      linearPK: 'Yes — AUC and Cmax linear across all tested doses',
      accumulation: 'No accumulation with 7-day repeated dosing',
    },
    humanEvidence: [
      { study: 'Lee & Burgess (2025) — Alt Ther Health Med 31(5)', type: 'IRB-approved safety pilot', n: 2, finding: 'IV infusion 10 mg then 20 mg in 250cc NS over 1h on consecutive days. No clinically significant CBC/CMP/CPK/BNP/CRP/TSH changes. First published IV human safety data.' },
      { study: 'Lee et al. (2024) — PMID: 39325560', type: 'Pilot — interstitial cystitis', n: 12, finding: '10 mg intravesical injection. 10/12 patients: 100% symptom resolution. 2/12: 80% improvement. No adverse events.' },
      { study: 'Lee & Padgett (2021) — Alt Ther Health Med 27(4)', type: 'Retrospective — knee pain', n: 16, finding: 'Intra-articular injection. 14/16 patients reported significant knee pain relief.' },
    ],
    dosing: {
      clinicalPharmacy: {
        typical: '250–500 mcg once daily',
        range: '250–500 mcg/day',
        route: 'Subcutaneous injection',
        sites: 'Abdomen and thigh rotation; peri-lesional for targeted MSK',
        reconstitution: '5 mg vial + 2 mL BAC water = 2.5 mg/mL',
        cycle: '4–6 weeks standard; 6–8 weeks chronic tendinopathy',
        storage: 'Lyophilized: room temp or refrigerated. Reconstituted: 2–8°C, stable ~30 days.',
      },
      communityReported: {
        standard: '250 mcg twice daily SC',
        acuteInjury: '500 mcg twice daily x 2 weeks, then taper',
        oral: '500–1,000 mcg/day oral for GI/IBD indications',
      },
    },
    sideEffects: 'Injection site irritation (most common). Transient fatigue in first 1–2 days (~10%). Mild flushing. No serious adverse events in published animal or human data. No adverse events reported to 503A pharmacies across 500,000+ prescriptions 2018–2024.',
    contraindications: ['Active malignancy (theoretical angiogenic concern)', 'Known hypersensitivity', 'Pregnancy (insufficient data)'],
    keyReferences: [
      'Sikiric P et al. (1993). A new gastric juice peptide, BPC. J Physiol Paris 87(5):313-327.',
      'He L et al. (2022). Pharmacokinetics of BPC 157 in rats and dogs. Front Pharmacol 13:1026182.',
      'Lee E & Burgess K (2025). Safety of IV infusion of BPC-157 in humans. Alt Ther Health Med 31(5):20-24.',
      'Vasireddi N et al. (2025). Emerging use of BPC-157 in orthopaedic sports medicine: systematic review. PMID: 40756949.',
    ],
  },

  // ─── TB-500 ─────────────────────────────────────────────────────────────────
  {
    id: 'tb500',
    name: 'TB-500',
    fullName: 'Thymosin Beta-4 (synthetic fragment)',
    aliases: ['Thymosin Beta-4', 'Tβ4'],
    category: 'Healing & Recovery',
    categoryTag: 'healing',
    goals: ['recovery', 'inflammation', 'muscle_mass', 'anti_aging'],
    regulatoryStatus: 'Not FDA-approved. Research peptide.',
    researchLevel: 'moderate',
    summary: 'Synthetic version of the naturally occurring Thymosin Beta-4 protein fragment. Potent tissue repair, anti-inflammatory, and cell migration agent. Frequently paired with BPC-157 in the Wolverine Stack.',
    mechanism: 'Sequesters G-actin monomers, promotes cell migration and proliferation, upregulates matrix metalloproteinases, stimulates angiogenesis, reduces inflammation via NF-κB pathway modulation.',
    benefits: [
      'Accelerated healing of muscle, tendon, and ligament injuries',
      'Systemic anti-inflammatory effects',
      'Promotes cardiac repair post-myocardial injury',
      'Neurological — promotes neurite outgrowth',
      'Hair follicle stimulation',
    ],
    dosing: {
      typical: '2–2.5 mg twice weekly (loading), 2 mg weekly (maintenance)',
      range: '1–5 mg per dose',
      route: ['subcutaneous injection', 'intramuscular injection'],
      cycle: '4–6 weeks loading, then maintenance or cycle break',
      notes: 'Often stacked with BPC-157. Not orally bioavailable.',
    },
    sideEffects: 'Generally well-tolerated. Mild fatigue reported anecdotally. Limited long-term human data.',
    keyReferences: ['Goldstein AL et al. (2012). Thymosin beta4: a multi-functional regenerative peptide. Expert Opin Biol Ther.'],
  },

  // ─── ARA-290 — UPDATED May 2026 ─────────────────────────────────────────────
  // Sources: Brines/Heij 2012 (SFN RCT), Niesters 2013, Culver 2017,
  // + Huang B et al. J Cell Mol Med 2018 (SLE — two mouse models)
  {
    id: 'ara290',
    name: 'ARA-290',
    fullName: 'ARA-290 (Cibinetide)',
    aliases: ['Cibinetide', 'ARA290', 'EPO helix-B peptide'],
    category: 'Neuroprotection & Immune',
    categoryTag: 'neuroprotection',
    goals: ['neuroprotection', 'inflammation', 'metabolic_health', 'fatigue'],
    regulatoryStatus: 'Investigational. Not FDA-approved. Phase II RCT data in sarcoidosis neuropathy.',
    researchLevel: 'high',
    summary: 'ARA-290 (Cibinetide) is a non-hematopoietic EPO-derived helix-B peptide that selectively activates the tissue-protective receptor complex (EPOR/CD131 heterodimer) without stimulating erythropoiesis via the homodimeric EPOR. Primary studied indications: small fiber neuropathy in sarcoidosis (Phase II RCT), diabetic retinopathy neuroprotection, renal ischemia-reperfusion, rheumatoid arthritis, and — newly documented — systemic lupus erythematosus in two validated mouse models (Huang et al. 2018). Confirmed haematopoietic safety: no changes in peripheral blood cell counts, hemoglobin, haematocrit, or bone marrow HSC/HPC populations at therapeutic doses across all published studies.',
    mechanism: 'ARA-290 binds the tissue-protective receptor (EPOR/CD131 heterodimer) on macrophages, neurons, endothelial cells, and other non-hematopoietic tissues. Downstream: Akt/PI3K, JAK2, STAT3 activation. Anti-inflammatory: inhibits NF-κB, suppresses TNF-α, IL-6, MCP-1, iNOS; increases TGF-β. Macrophage modulation (Huang 2018 — SLE): (1) Inhibits inflammatory macrophage activation — dose-dependently suppresses LPS-induced TNF-α and iNOS in RAW 264.7 cells (P<0.05). (2) Promotes macrophage phagocytosis of apoptotic cells (dose-dependent, P<0.05 by flow cytometry) — clinically significant in SLE where defective apoptotic cell clearance drives autoantibody production. Plasma half-life: short (minutes) — biological effects persist in vivo despite rapid clearance. Does NOT stimulate haematopoiesis: confirmed by flow cytometry of HSC/HPC populations across multiple studies.',
    benefits: [
      '[Verified — High] Small fiber neuropathy reduction in sarcoidosis: Phase II double-blind RCT (Brines/Heij et al. Mol Med. 2012;18:1430-1436, n=28) — significant reduction in neuropathic pain and improvement in corneal nerve fiber density.',
      '[Verified — Moderate] Corneal nerve fiber regeneration: improved density by confocal microscopy — first evidence of nerve regeneration with any pharmacologic agent in SFN (Niesters M et al. PAIN. 2013).',
      '[Verified — Moderate] Sarcoidosis fatigue improvement: Phase II ARA-290 — fatigue measures alongside immune modulation (Culver DA et al. Respir Med. 2017).',
      '[Verified — Low] SLE/lupus nephritis — two mouse models (Huang et al. J Cell Mol Med. 2018;22:3330-3339, N=6/group): Significant decrease in serum ANA and anti-dsDNA antibodies (P<0.05); reduced IgG and C3 glomerular deposition; reduced glomerular size/cellularity; improved BUN, creatinine, urine albumin (all P<0.05). Confirmed in both pristane-induced SLE (C57BL/6) and MRL/lpr mice. Reduced spleen and lymph node weights. Suppressed IL-6/MCP-1/TNF-α; increased TGF-β.',
      '[Verified — High] Haematopoietic safety confirmed: no changes in erythrocyte count, hemoglobin, haematocrit, or bone marrow HSC/HPC at 500 μg/kg/day x 28 days.',
      '[Verified — Low] Improved insulin sensitivity and metabolic parameters in diabetic models.',
    ],
    dosing: {
      typical: '4 mg SC once daily (clinical trial doses for SFN/sarcoidosis)',
      range: '1–8 mg/day SC; animal SLE studies used 500 μg/kg/day IP',
      route: ['subcutaneous injection'],
      cycle: '4–12 weeks depending on indication',
      notes: 'All human dosing extrapolated from clinical trial protocols. SLE/autoimmune indication currently [Speculation] for human dosing — animal data only. No erythropoietic monitoring required (confirmed non-haematopoietic). Physician supervision required. Source from 503A compounding pharmacy.',
    },
    sideEffects: '[Verified — High] Well-tolerated in clinical trials — no serious adverse events reported across published human studies. [Verified — High] No erythropoietic effects at any tested dose — confirmed by flow cytometry and CBC. [Verified — Moderate] Mild injection site reactions. [Unknown] Long-term human safety profile beyond 12 weeks.',
    keyReferences: [
      'Brines M et al. (Heij L et al.) ARA290 in sarcoidosis SFN: randomized double-blind pilot. Mol Med. 2012;18:1430-1436.',
      'Niesters M et al. ARA290 and corneal nerve fiber density. PAIN. 2013. PMID 23787508.',
      'Culver DA et al. Phase II ARA-290 in sarcoidosis fatigue. Respir Med. 2017. PMID 28390717.',
      'Huang B et al. Non-erythropoietic EPO-derived peptide protects mice from SLE. J Cell Mol Med. 2018;22:3330-3339. DOI:10.1111/jcmm.13608. [Two mouse models, haematopoietic safety confirmed]',
    ],
  },

  // ─── AOD-9604 ─────────────────────────────────────────────────────────────────
  {
    id: 'aod9604',
    name: 'AOD-9604',
    fullName: 'Advanced Obesity Drug 9604',
    aliases: ['AOD 9604', 'hGH Fragment 176-191'],
    category: 'Metabolic & Fat Loss',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'recovery'],
    regulatoryStatus: 'GRAS status granted by FDA for food use. Not approved as a drug. Compoundable.',
    researchLevel: 'moderate',
    summary: 'C-terminal fragment of human growth hormone (residues 176–191). Retains hGH lipolytic properties without IGF-1-stimulating or diabetogenic effects.',
    mechanism: 'Stimulates lipolysis and inhibits lipogenesis through β-adrenergic receptor pathways, independent of IGF-1. Promotes proteoglycan synthesis and chondrocyte differentiation in cartilage.',
    benefits: [
      'Visceral and subcutaneous fat reduction',
      'No effect on blood glucose or insulin sensitivity',
      'Cartilage regeneration in OA models',
      'Beneficial lipid profile effects',
    ],
    dosing: {
      typical: '300–500 mcg once daily',
      range: '150–600 mcg/day',
      route: ['subcutaneous injection', 'oral (limited bioavailability)'],
      cycle: '8–12 weeks',
      notes: 'Inject on empty stomach, ideally morning or pre-exercise.',
    },
    sideEffects: 'Exceptionally well-tolerated. No growth or IGF-1 effects. Minimal injection site reactions.',
    keyReferences: ['Ng FM et al. (2000). AOD9604: An anti-obesity drug targeting fat breakdown. Biochemistry.'],
  },

  // ─── Semaglutide ──────────────────────────────────────────────────────────────
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    fullName: 'Semaglutide (GLP-1 Receptor Agonist)',
    aliases: ['Ozempic', 'Wegovy', 'Rybelsus'],
    category: 'GLP-1 / Metabolic',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health'],
    regulatoryStatus: 'FDA-approved (Ozempic: T2DM; Wegovy: obesity; Rybelsus: oral T2DM).',
    researchLevel: 'very_high',
    summary: 'Long-acting GLP-1 receptor agonist. Gold standard for weight management and T2DM. 15–20% body weight reduction in clinical trials.',
    mechanism: 'Binds and activates GLP-1 receptors in pancreas (insulin secretion, glucagon suppression), brain (appetite suppression, satiety), GI tract (delayed gastric emptying), and cardiovascular system.',
    benefits: [
      '15–20% body weight reduction (SUSTAIN, STEP trials)',
      'Significant HbA1c reduction in T2DM',
      'Cardiovascular risk reduction (SUSTAIN-6)',
      'MASH/NASH improvement',
    ],
    dosing: {
      typical: '0.5–2.4 mg/week SC (Wegovy); 0.5–1 mg/week (Ozempic)',
      range: '0.25 mg/week starting dose, titrate over 16–20 weeks',
      route: ['subcutaneous injection', 'oral tablet (Rybelsus)'],
      cycle: 'Ongoing — chronic therapy',
      notes: 'Titrate slowly to minimize GI side effects.',
    },
    sideEffects: 'Nausea, vomiting, diarrhea (especially during titration). Rare: pancreatitis, gallbladder disease.',
    keyReferences: ['Wilding JPH et al. (2021). STEP-1: Semaglutide in obesity. NEJM.'],
  },

  // ─── Tirzepatide ──────────────────────────────────────────────────────────────
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    fullName: 'Tirzepatide (GIP/GLP-1 Dual Agonist)',
    aliases: ['Mounjaro', 'Zepbound'],
    category: 'GLP-1 / Metabolic',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health'],
    regulatoryStatus: 'FDA-approved (Mounjaro: T2DM; Zepbound: obesity).',
    researchLevel: 'very_high',
    summary: 'First-in-class dual GIP and GLP-1 receptor co-agonist. Superior weight loss vs semaglutide (20–22% body weight). Weekly SC injection.',
    mechanism: 'Activates both GIP and GLP-1 receptors. GIP adds insulin-potentiating and adipose-tissue-direct lipid-lowering effects beyond GLP-1 alone.',
    benefits: [
      '20–22% body weight reduction (SURMOUNT trials)',
      'Superior glycemic control vs semaglutide',
      'Improved lipid profile',
      'Sleep apnea improvement (SURMOUNT-OSA)',
      'Heart failure benefit (SUMMIT trial)',
    ],
    dosing: {
      typical: '5–15 mg/week SC',
      range: '2.5 mg starting, titrate by 2.5 mg every 4 weeks',
      route: ['subcutaneous injection'],
      cycle: 'Ongoing chronic therapy',
      notes: 'Pair with resistance training and adequate protein to preserve muscle mass.',
    },
    sideEffects: 'Nausea, diarrhea, vomiting during titration.',
    keyReferences: ['Jastreboff AM et al. (2022). SURMOUNT-1: Tirzepatide in obesity. NEJM.'],
  },

  // ─── CJC-1295 ─────────────────────────────────────────────────────────────────
  {
    id: 'cjc1295',
    name: 'CJC-1295',
    fullName: 'CJC-1295 (GHRH Analogue)',
    aliases: ['CJC-1295 w/ DAC', 'CJC-1295 no DAC', 'Mod GRF 1-29'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'recovery', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Compoundable by prescription.',
    researchLevel: 'moderate',
    summary: 'GHRH analogue that stimulates pituitary GH release. With DAC: weekly dosing, sustained GH elevation. Without DAC (Mod GRF 1-29): pulsatile release, dosed with ipamorelin.',
    mechanism: 'Binds GHRH receptors on somatotrophs in pituitary gland. DAC version covalently binds albumin, extending half-life to ~8 days (5.8–8.1 days, Teichman 2006 JCEM). Albumin binding via Cys34 (≥90%). GH increase 2–10× sustained for 6+ days after single dose. IGF-1 elevation 44–45% (P<0.001, Ionescu & Frohman 2006). Trough GH rise 7.5-fold (P<0.0001). GH pulsatility preserved. GH mRNA 11-fold increase with daily dosing (Alba 2006). No effect on cortisol, TSH, or LH (Teichman 2006).',
    benefits: [
      '[Verified] Increased GH and IGF-1 levels — IGF-1 elevation 44–45%, P<0.001 (Ionescu & Frohman 2006, JCEM)',
      '[Verified] GH pulsatility preserved with CJC-1295 — no HPA, thyroid, or gonadal axis disruption',
      '[Verified] No serious adverse events in 4 peer-reviewed human/animal studies',
      'Improved body composition (muscle gain, fat loss)',
      'Enhanced recovery and sleep quality',
      'Anti-aging effects on skin, hair, energy',
    ],
    dosing: {
      typical: 'With DAC: 2 mg/week SC. Without DAC: 100–300 mcg with each ipamorelin dose',
      range: '1–2 mg/week (DAC); 100–300 mcg per pulse (no DAC)',
      route: ['subcutaneous injection'],
      cycle: '3–6 months, with breaks to preserve pituitary sensitivity',
      notes: 'Dose at night on empty stomach for optimal GH pulse alignment. Most often stacked with ipamorelin.',
    },
    sideEffects: 'Water retention, joint aches, tingling (GH-related). Injection site reactions. Potential desensitization with DAC form over time.',
    keyReferences: [
      'Teichman SL et al. (2006). CJC-1295 sustained GH elevation. JCEM 91:799.',
      'Ionescu M & Frohman LA. (2006). JCEM 91:4792.',
      'Alba M et al. (2006). Am J Physiol Endocrinol Metab 291:E1290.',
      'Jette L et al. (2005). Albumin binding mechanism of CJC-1295.',
    ],
  },

  // ─── Ipamorelin ───────────────────────────────────────────────────────────────
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    fullName: 'Ipamorelin (GHRP-5)',
    aliases: ['GHRP-5'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'recovery', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Compoundable by prescription.',
    researchLevel: 'moderate',
    summary: 'Selective growth hormone secretagogue (GHSR agonist). Most selective GHRP — does not significantly stimulate cortisol or prolactin. Always paired with CJC-1295 for synergistic GH pulse.',
    mechanism: 'Binds ghrelin receptor (GHSR) on pituitary, amplifying GH release. Highly selective — minimal cortisol, prolactin, or ACTH stimulation vs older GHRPs.',
    benefits: [
      'Clean GH pulse without cortisol spike',
      'Improved sleep quality (slow-wave sleep)',
      'Muscle gain and fat loss (indirect via GH/IGF-1)',
      'Enhanced recovery',
    ],
    dosing: {
      typical: '100–300 mcg, 1–3x daily',
      range: '100–300 mcg per dose',
      route: ['subcutaneous injection'],
      cycle: '3–6 months, commonly ongoing',
      notes: 'Bedtime dose most valuable for GH pulse during sleep. Stack with CJC-1295 (no DAC) for 2–10x greater GH output.',
    },
    sideEffects: 'Mild transient flushing, tingling, mild water retention. No significant cortisol elevation.',
    keyReferences: ['Raun K et al. (1998). Ipamorelin selectivity in GH secretion. Eur J Endocrinol.'],
  },

  // ─── PT-141 ───────────────────────────────────────────────────────────────────
  {
    id: 'pt141',
    name: 'PT-141',
    fullName: 'Bremelanotide (PT-141)',
    aliases: ['Vyleesi', 'Bremelanotide'],
    category: 'Sexual Health',
    categoryTag: 'sexual',
    goals: ['sexual_function'],
    regulatoryStatus: 'FDA-approved as Vyleesi for HSDD in premenopausal women. Used off-label in men.',
    researchLevel: 'high',
    summary: 'Melanocortin receptor agonist that acts centrally to increase sexual desire in both men and women. Works via brain pathway rather than vascular (distinct from PDE5 inhibitors).',
    mechanism: 'Activates melanocortin receptors (MC3R, MC4R) in the hypothalamus and limbic system. Increases dopaminergic and oxytocin signaling.',
    benefits: [
      'Increased sexual desire and arousal',
      'Effective in HSDD in women (FDA-approved)',
      'Spontaneous erections in men (off-label)',
      'Works regardless of vascular function (central mechanism)',
      'On-demand use (no daily dosing required)',
    ],
    dosing: {
      typical: '1.75 mg SC 45 minutes before sexual activity',
      range: '0.5–2 mg',
      route: ['subcutaneous injection'],
      cycle: 'On-demand, not more than once per 24 hours',
      notes: 'Onset 45–60 minutes, duration 6–12 hours.',
    },
    sideEffects: 'Nausea (most common), flushing, hyperpigmentation with repeated use, headache, transient hypertension.',
    keyReferences: ['Simon JA et al. (2019). Bremelanotide (Vyleesi) for HSDD. Obstet Gynecol.'],
  },

  // ─── Sermorelin ───────────────────────────────────────────────────────────────
  {
    id: 'sermorelin',
    name: 'Sermorelin',
    fullName: 'Sermorelin (GHRH 1-29)',
    aliases: ['GHRH 1-29', 'Geref'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Compoundable by prescription. Previously FDA-approved (withdrawn from market 2008 for commercial reasons, not safety).',
    researchLevel: 'high',
    summary: 'First 29 amino acids of GHRH. Longer clinical track record than CJC-1295. Stimulates natural pulsatile GH release with less risk of desensitization.',
    mechanism: 'Binds GHRH receptors on pituitary somatotrophs. Stimulates GH production and release in a physiological pulsatile pattern.',
    benefits: [
      'Natural pulsatile GH release',
      'Improved sleep quality',
      'Body composition improvement (gradual)',
      'Anti-aging effects',
      'Longer safety record than newer GHRH analogues',
    ],
    dosing: {
      typical: '200–300 mcg SC before bed',
      range: '100–500 mcg/day',
      route: ['subcutaneous injection'],
      cycle: '3–6 months minimum',
      notes: 'Bedtime dosing essential. Shorter half-life than CJC-1295; requires nightly dosing.',
    },
    sideEffects: 'Generally very well-tolerated. Mild flushing, tingling, headache.',
    keyReferences: ['Walker RF. (2006). Sermorelin: a better approach to management of adult-onset GH insufficiency? Clin Interv Aging.'],
  },

  // ─── TESAMORELIN — Updated May 2026 ──────────────────────────────────────────
  // Sources: 6 peer-reviewed studies + FDA label
  // Falutz J et al. NEJM 2007 + JCEM 2010 — Phase III RCT N=806 HIV
  // Baker LD et al. Arch Neurol 2012 — RCT N=152 cognitive
  // Stanley TL et al. JCEM 2011 — GH pulsatility N=13
  // Makimura H et al. JCEM 2012 — non-HIV obese RCT N=60
  // Fourman LT et al. AIDS 2017 — liver enzymes N=806
  // Clemmons DR et al. PLoS ONE 2017 — T2DM RCT N=53
  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    fullName: 'Tesamorelin (trans-3-hexenoyl-GHRH[1-44]-amide; Egrifta SV)',
    category: 'GH Axis / Metabolic',
    categoryTag: 'gh_axis',
    goals: ['visceral_fat', 'muscle_mass', 'longevity', 'mental_clarity', 'metabolic_health'],
    regulatoryStatus: 'FDA-approved (Egrifta SV) for visceral fat reduction in HIV-associated lipodystrophy. Off-label: NAFLD/MASLD, general body composition, aging. Compoundable by prescription.',
    researchLevel: 'high',
    summary: `Tesamorelin is the only FDA-approved GHRH analog in clinical use, approved in 2010 under the brand name Egrifta SV for reduction of excess abdominal (visceral) fat in HIV-infected patients with lipodystrophy. It is a stabilized synthetic analog of human GHRH(1-44) with a trans-3-hexenoic acid modification at the N-terminus that confers resistance to DPP-IV degradation, extending its functional half-life from seconds (native GHRH) to 26-38 minutes. Unlike CJC-1295 with DAC which produces sustained GH bleed, tesamorelin generates a discrete pulsatile GH pulse that clears and synergizes with the natural nocturnal slow-wave-sleep GH burst, preserving physiological pulsatility. Five peer-reviewed human trials establish [Verified — High] evidence for visceral fat reduction in HIV-lipodystrophy (15-18% VAT reduction over 26 weeks), and [Verified — Moderate] evidence for VAT reduction in non-HIV obese, carotid IMT improvement, cognitive benefits in aging adults (executive function P=.005), liver enzyme normalization, and glycemic safety in T2DM.`,
    mechanism: `Tesamorelin binds the GHRH receptor on pituitary somatotroph cells, stimulating synthesis and pulsatile release of endogenous growth hormone. The downstream GH pulse elevates IGF-1 (mean +117-181% across trials, within physiological range). The visceral-fat-selective effect is mechanistically explained by higher GH receptor density in visceral adipose tissue (VAT) compared to subcutaneous adipose tissue (SAT), driving preferential lipolysis in the visceral depot. Tesamorelin preserves the natural negative IGF-1 feedback loop on pituitary GH secretion, preventing GH excess — the key mechanistic advantage over exogenous rhGH. Stanley et al. 2011 confirmed via overnight 10-min GH sampling and AutoDecon deconvolution that tesamorelin increases GH pulse area (+0.4 log10 ug/L, P=0.001) and basal secretion (P=0.008) without changing pulse frequency.`,
    benefits: [
      '[Verified — High] VAT reduction 15-18% over 26 weeks in HIV-lipodystrophy (Phase III, N=806). 69% achieved FDA-defined VAT response vs 33% placebo (P<0.001).',
      '[Verified — High] GH pulsatility preserved: pulse frequency unchanged; pulse area and basal secretion increased. Key advantage over exogenous GH and CJC-1295 with DAC (Stanley et al. 2011).',
      '[Verified — Moderate] VAT reduction in non-HIV obese: -19% net treatment effect vs placebo at 12 months (-35 cm2, P=0.003), selectively visceral — SAT unchanged (Makimura et al. 2012).',
      '[Verified — Moderate] Carotid IMT reduction in non-HIV obese: -0.04 mm net (-6%), P=0.02 — first evidence of tesamorelin cardiovascular benefit outside HIV (Makimura et al. 2012).',
      '[Verified — Moderate] Triglyceride reduction: -37 mg/dL (-20%) in obese; ~50 mg/dL in HIV trials. CRP (log) -24% in obese (P=0.04).',
      '[Verified — Moderate] Cognitive function: favorable effect on executive function (effect size f=0.37, P=.005) and verbal memory trend (P=.08) over 20 weeks in MCI and healthy older adults ages 55-87 (Baker et al. 2012, N=152).',
      '[Verified — Moderate] IGF-1 elevation: +117-181% across trials, consistently within physiological range. Returns to baseline within 10 weeks of discontinuation.',
      '[Verified — Moderate] Liver enzyme improvement: ALT -8.9 U/L (-18%) in VAT responders vs +1.4 U/L nonresponders (P=0.004); ALT normalization OR 2.5 (95% CI 1.2-5.3). Benefits persisted 26 weeks post-discontinuation (Fourman et al. 2017, N=806).',
      '[Verified — Moderate] Glycemic safety in T2DM: no significant change in insulin response, fasting glucose, or HbA1c overall at 12 weeks (Clemmons et al. 2017, N=53).',
      '[Verified — Moderate] Body composition: lean mass +3.7% (P<.001), body fat -7.4% (P<.001) at 20 weeks (Baker et al. 2012). Waist circumference -3 cm, lean mass +1.4 kg at 12 months in obese (Makimura et al. 2012).',
      '[Speculation] NAFLD/MASLD off-label: mechanistic extrapolation from HIV-NAFLD data plus clinical practice experience. No large RCT in non-HIV NAFLD population.',
      '[Speculation] Longevity and healthy aging: GH/IGF-1 axis restoration in aging; cognitive preservation; cardiovascular risk improvement. Clinical plausibility strong but no long-term longevity endpoint RCT.',
    ],
    dosing: {
      typical: '2 mg SC once daily (FDA label); 1-2 mg SC once daily (off-label body composition/NAFLD)',
      range: '1-2 mg SC daily',
      frequency: 'Daily',
      route: ['subcutaneous injection'],
      cycle: `FDA label (HIV lipodystrophy): continuous — effects reverse on discontinuation, VAT returns to baseline within months.
Off-label NAFLD: continuous, minimum 12-26 weeks to assess hepatic fat fraction response.
Off-label body composition: 12-26 weeks, sometimes 5 days on / 2 days off to reduce cumulative IGF-1 exposure.
Conservative starter: 1 mg SC daily, titrate to 2 mg over 2-4 weeks. Check IGF-1 at 4-6 weeks.`,
      notes: `Timing: evening or pre-bed (30+ minutes after last meal) to align the GH pulse with the natural nocturnal slow-wave-sleep GH burst. Fasted state required (2+ hours since last meal) to avoid blunting the GH pulse.
Monitoring: IGF-1 every 6 months; fasting glucose and HbA1c at baseline, 3 months, then periodically. Discontinue if IGF-1 persistently exceeds 2x the upper limit of normal.
Stacking: solo for NAFLD/visceral fat. Stack with Ipamorelin 200-300 mcg pre-bed if IGF-1 elevation suboptimal. Stack with semaglutide/tirzepatide for metabolic syndrome.
Reconstitution: 5 mg vial + 2.5 mL BAC water = 2 mg/mL (draw 1 mL = 2 mg = 100 IU on U-100 syringe). Refrigerate 2-8C; reconstituted stable ~30 days.
Cost (2026): Brand Egrifta SV $3,000-4,500/month; compounded tesamorelin $250-600/month via 503A pharmacy.`,
    },
    sideEffects: `[Verified — High] Injection-site reactions (erythema, pruritus, pain): common — rotate sites.
[Verified — High] Arthralgias/myalgias: common (5-10%), dose-related, resolves with dose reduction.
[Verified — High] Peripheral edema: common — reduce dietary sodium; usually self-limiting.
[Verified — Moderate] Numbness/paresthesias: possible, IGF-1 mediated — reduce dose if persistent.
[Verified — Moderate] Transient fasting glucose increase: mild, observed at weeks 4-8 in T2DM study (2 mg group), reversed by week 12.
[Verified — High] Hypersensitivity reactions: rare — discontinue if rash, urticaria, or anaphylaxis.
[Unknown] Tumor promotion risk with active malignancy: theoretical — FDA contraindication.
Contraindications: active malignancy; pregnancy; hypopituitarism.
Compliance across trials: 97-99.5% — excellent tolerability when properly titrated.`,
    sourceNotes: `FDA label (Egrifta SV): Theratechnologies prescribing information. DailyMed.
Falutz J et al. N Engl J Med. 2007;357(23):2359-2370. PMID 18057338. [Phase III pivotal RCT, HIV, N=806]
Falutz J et al. J Clin Endocrinol Metab. 2010;95(9):4291-4304. PMID 20554713. [Pooled Phase III analysis]
Baker LD et al. Arch Neurol. 2012;69(11):1420-1429. PMID 22925252. [RCT, cognitive function, N=152]
Stanley TL et al. J Clin Endocrinol Metab. 2011;96(1):150-158. PMID 20943777. [GH pulsatility, N=13]
Makimura H et al. J Clin Endocrinol Metab. 2012;97(12):4769-4779. PMID 23015655. [Non-HIV obese RCT, N=60, 12 months]
Fourman LT et al. AIDS. 2017;31(16):2253-2259. PMID 28692538. [Liver enzymes secondary analysis, N=806]
Clemmons DR et al. PLoS ONE. 2017;12(6):e0179538. PMID 28617841. [T2DM safety RCT, N=53]`,
  },

  // ─── Kisspeptin-10 ────────────────────────────────────────────────────────────
  {
    id: 'kisspeptin10',
    name: 'Kisspeptin-10',
    fullName: 'Kisspeptin-10 (KP-10)',
    aliases: ['KP-10', 'Metastin fragment'],
    category: 'Fertility & Hormonal',
    categoryTag: 'fertility',
    goals: ['fertility', 'sexual_function'],
    regulatoryStatus: 'Investigational. Not FDA-approved. Research use.',
    researchLevel: 'moderate',
    summary: 'Endogenous neuropeptide that stimulates GnRH release, driving LH and FSH secretion. Used for fertility restoration and sexual function improvement.',
    mechanism: 'Binds KISS1R receptors on GnRH neurons in hypothalamus, triggering GnRH pulse → pituitary LH/FSH surge → gonadal steroidogenesis.',
    benefits: [
      'Stimulates natural LH and testosterone production',
      'Fertility enhancement (oocyte maturation, sperm production)',
      'Restores HPG axis in functional hypogonadotropic hypogonadism',
      'Sexual desire and arousal (central mechanism)',
    ],
    dosing: {
      typical: '9.6 nmol/kg IV (clinical trial) or 50-100 mcg SC',
      range: 'Variable — clinical dosing in research context',
      route: ['subcutaneous injection', 'intravenous (clinical trials)'],
      cycle: 'Pulsatile protocols; design varies by indication',
      notes: 'Pulsatile administration required to avoid desensitization.',
    },
    sideEffects: 'Generally well-tolerated. Transient LH surge. Limited long-term data.',
    keyReferences: ['Jayasena CN et al. (2014). Kisspeptin-54 and sexual function. J Clin Invest.'],
  },

  // ─── GHK-Cu ───────────────────────────────────────────────────────────────────
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    fullName: 'Copper Peptide GHK-Cu',
    aliases: ['GHK', 'Copper tripeptide-1'],
    category: 'Skin & Anti-Aging',
    categoryTag: 'anti_aging',
    goals: ['anti_aging', 'recovery', 'inflammation'],
    regulatoryStatus: 'GRAS. Used in cosmetics and compounded formulations. Not FDA-approved as drug.',
    researchLevel: 'moderate',
    summary: 'Naturally occurring copper-binding tripeptide (Gly-His-Lys). Potent wound healing, anti-inflammatory, and antioxidant properties.',
    mechanism: 'Chelates copper → activates SOD, collagen and elastin synthesis, angiogenesis, anti-inflammatory pathways. Upregulates VEGF, FGF, TGF-beta. Downregulates TNF-alpha and IL-1.',
    benefits: [
      'Skin collagen and elastin synthesis',
      'Wound healing acceleration',
      'Hair follicle stimulation and hair growth',
      'Anti-inflammatory systemically',
      'Antioxidant via SOD activation',
    ],
    dosing: {
      typical: '1-2 mg/day SC or topical application',
      range: '0.5-3 mg/day',
      route: ['subcutaneous injection', 'topical cream/serum'],
      cycle: '8-12 weeks',
      notes: 'Topical use: 1-5% concentration serums. Injectable often combined with BPC-157.',
    },
    sideEffects: 'Excellent safety profile. Topical: mild irritation. Systemic: minimal reported effects.',
    keyReferences: ['Pickart L & Margolina A. (2018). Regenerative and protective actions of GHK-Cu. Biomolecules.'],
  },

  // ─── Epithalon ────────────────────────────────────────────────────────────────
  {
    id: 'epithalon',
    name: 'Epithalon',
    fullName: 'Epithalamin / Epithalon',
    aliases: ['Epitalon', 'AEDG peptide', 'Ala-Glu-Asp-Gly'],
    category: 'Longevity & Anti-Aging',
    categoryTag: 'longevity',
    goals: ['longevity', 'anti_aging', 'sleep', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Research peptide.',
    researchLevel: 'moderate',
    summary: 'Tetrapeptide from the pineal gland. Studied for telomerase activation, anti-aging effects, and circadian rhythm regulation.',
    mechanism: 'Activates telomerase enzyme → extends telomere length. Regulates pineal gland melatonin secretion. Antioxidant effects. Suppresses oncogene expression in some models.',
    benefits: [
      'Telomere extension (in vitro and animal data)',
      'Improved sleep via melatonin regulation',
      'Extended lifespan in animal models',
      'Antioxidant, anti-tumor properties in animal studies',
    ],
    dosing: {
      typical: '5-10 mg/day SC, cyclically',
      range: '5-10 mg/day for 10-20 day courses',
      route: ['subcutaneous injection'],
      cycle: '10-20 days, 1-2x/year (typical geroscience protocol)',
      notes: 'Most evidence from Russian research groups. Human clinical evidence limited.',
    },
    sideEffects: 'Well-tolerated in studies. No significant adverse events reported.',
    keyReferences: ['Khavinson V et al. (2003). Epithalamin and aging. Annals NY Acad Sci.'],
  },

  // ─── THYMOSIN ALPHA-1 — UPDATED May 2026 ────────────────────────────────────
  // Sources: Wu et al. Intensive Care Med 2013 (sepsis RCT); Garaci 2000;
  // Costantini et al. Front Oncol 2019; King & Tuthill Vitam Horm 2016;
  // Zhu et al. H1N1 vaccine pilot RCT (n=99); Matteucci gene expression;
  // Tuthill clinical experience review; Lemke/Peptide Toolkit Apr 2026
  {
    id: 'thymosin_alpha1',
    name: 'Thymosin Alpha-1',
    fullName: 'Thymosin Alpha-1 (Zadaxin / Thymalfasin)',
    aliases: ['Ta1', 'Zadaxin', 'TA1', 'Thymalfasin'],
    category: 'Immune Modulation',
    categoryTag: 'immune',
    goals: ['inflammation', 'fatigue', 'longevity', 'recovery'],
    regulatoryStatus: 'NOT FDA-approved in US. Approved in 35+ countries (marketed as Zadaxin by SciClone) for hepatitis B, hepatitis C, and immune adjunct in cancer and sepsis. Distinct regulatory path from BPC-157/TB-500: Ta1 was never moved to FDA Category 2 status. Remained available via 503A compounding pharmacies throughout 2023-2026. Not part of the February 27, 2026 reclassification announcement. As of April 2026, broadly available by prescription through telehealth clinics including Marek Health, Ways2Well, Concierge MD.',
    researchLevel: 'high',
    molecular: {
      formula: 'C129H215N33O55',
      molecularWeight: 3108.28,
      casNumber: '62304-98-7',
      sequence: 'Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn-OH',
      aminoAcids: 28,
      source: 'Originally isolated from thymic extract by Allan Goldstein and colleagues, 1970s. Component of Thymosin Fraction 5.',
    },
    summary: 'Thymosin Alpha-1 is a 28-amino-acid acetylated peptide and the most clinically validated immune-modulating peptide currently in use. Marketed internationally as Zadaxin (thymalfasin), it is approved in over 35 countries for hepatitis B, hepatitis C, and as an immune adjunct in sepsis and cancer protocols. Its development program spans decades of human clinical trials. In 2026 it is most commonly used for: post-illness immune restoration (post-COVID, post-mononucleosis, post-Lyme), long COVID protocols, chronic immune dysregulation, pre/post-surgical immune support, cancer immunotherapy adjunct (off-label, with oncology supervision), elderly immune support, and hepatitis B/C per Zadaxin label. [Verified — High]',
    mechanism: 'Ta1 acts upstream of the immune response, modulating how the immune system organizes itself rather than directly killing pathogens. Key arms: (1) Dendritic cell maturation — promotes effective antigen presentation to T cells. (2) T-cell activation — both CD4+ helper and CD8+ cytotoxic T cells. (3) Th1 polarization — pushes helper T cell response toward antiviral and antitumor patterns. (4) Reduction of T-cell apoptosis — particularly in lymphopenic states (e.g., severe COVID-19). (5) TLR2 and TLR9 activation on dendritic cells — influences inflammation balance. (6) MHC class I upregulation — increases expression of tumor, viral, and MHC I antigens. (7) ROS modulation — increases ROS in immune cells promoting proliferation; decreases ROS in tumor cells inhibiting proliferation via G1 arrest and Akt dephosphorylation. Plasma half-life: approximately 2 hours. Biological effect on T-cell and dendritic-cell function persists for days, supporting twice-weekly dosing. [Verified — High]',
    benefits: [
      '[Verified — High] Sepsis survival benefit: multicenter RCT (Wu et al. Intensive Care Med. 2013;39(10):1701-1709, n=361) — Ta1 + standard care vs standard care alone. Significant reduction in 28-day mortality in severe sepsis subgroup.',
      '[Verified — High] Hepatitis B/C: Phase III trials conducted by SciClone. Approved indication in 35+ countries. Combination with IFN-alpha improved response rates in hepatitis B and C including IFN-nonresponders.',
      '[Verified — Moderate] Cancer immunotherapy adjunct: NSCLC and melanoma — combination of Ta1 + IFN-alpha produced evidence of high potentiality in treatment of human cancer (Garaci et al. Int J Immunopharmacol. 2000;22(12):1067-1076).',
      '[Verified — Moderate] Influenza vaccine adjuvant — pilot RCT (n=99 hemodialysis patients): Zadaxin + H1N1 pandemic vaccine vs vaccine alone. Both Vaccine + Ta1 groups met CHMP seroconversion criteria; vaccine-only group did not. No adverse events related to Ta1. [Zhu et al. 2011]',
      '[Verified — Moderate] Transcription profile: 8,300 genes profiled in human PBMCs in vitro — Ta1 modulates a complex array of innate and adaptive immune response genes.',
      '[Verified — Low] Anti-tumor ROS mechanism: increases ROS in leukomonocytes (promoting proliferation) while decreasing ROS in HepG2 hepatoma cells (inhibiting tumor cell proliferation via G1 arrest, Akt dephosphorylation).',
      '[Speculation] Post-illness immune restoration (post-COVID, post-Lyme, post-mononucleosis): most commonly prescribed 2026 US telehealth indication. Perceptible benefit at 4-6 weeks consistently reported. No dedicated RCT for this indication.',
    ],
    dosing: {
      typical: '1.6 mg SC twice weekly — directly from Zadaxin label (standard for hepatitis B: 1.6 mg 2x/week x 6 months)',
      range: '0.8-3.2 mg per dose; 1.6 mg per injection is the established anchor',
      frequency: 'Twice weekly (Monday and Thursday standard). Once-weekly variant: 3.2 mg 1x/week for adherence.',
      route: ['subcutaneous injection'],
      cycleByIndication: {
        generalImmuneSupport: '8 weeks on, 4 weeks off, then reassess',
        acutePostIllness: '4-8 weeks continuous',
        longCovidChronicImmune: '3x/week tapering to 2x/week for 4 weeks intensive, then standard',
        hepatitisBZadaxinLabel: '6 months continuous',
        prePostSurgical: '2 weeks before through 2 weeks after',
        cancerAdjunct: '1.6 mg 2-3x/week — long courses coordinated with oncology team',
        elderlyLowFrequency: '1.6 mg 1x/week indefinitely',
      },
      notes: 'RECONSTITUTION: 5 mg + 5 mL BAC water = 1 mg/mL (draw 1.6 mL). 5 mg + 3.125 mL BAC water = 1.6 mg/mL (draw 1.0 mL — preferred for syringe simplicity). 10 mg + 10 mL BAC water = 1 mg/mL (draw 1.6 mL). One 5 mg vial = 3 doses at 1.6 mg = approximately 10 days at twice-weekly dosing. Reconstituted: stable 28-30 days refrigerated. STACKING: Most often run as monotherapy. When stacked: Ta1 + TB-500 (immune restoration + tissue repair); Ta1 + BPC-157 + GHK-Cu (comprehensive post-major-illness recovery). CAUTION — AUTOIMMUNITY: Promotes immune activation. Use cautiously or avoid in lupus, RA on biologics, MS, or transplant immunosuppression.',
      cost2026: '5 mg vial: $160-280. 10 mg vial: $280-450. Per 1.6 mg dose: ~$65. Weekly cost (2x/week): ~$130. 8-week cycle cost: ~$1,040.',
    },
    sideEffects: '[Verified — High] Injection site reactions: most common, typically mild. [Verified — Low] Transient discomfort, fatigue, or muscle ache in first week: uncommon. [Verified — Low] Rash, transient eosinophilia: rare. [Verified — High] Strongest safety profile of any peptide in this category — decades of global clinical use as Zadaxin. No serious adverse events related to Ta1 in H1N1 vaccine pilot RCT (n=99). [Speculation] Theoretical concern: active autoimmune disease — promotes immune activation which is the mechanism of benefit in immunocompromised states but is the theoretical concern in active autoimmunity. CONTRAINDICATIONS: Active autoimmune disease (relative — requires specialist judgment); patients on immunosuppressants for solid organ transplant.',
    keyReferences: [
      'Wu M et al. Thymosin alpha1 therapy in critically ill patients with sepsis: multicenter RCT. Intensive Care Med. 2013;39(10):1701-1709. PMID 23921826.',
      'Garaci E et al. Thymosin alpha 1 in treatment of cancer. Int J Immunopharmacol. 2000;22(12):1067-1076.',
      'Costantini C et al. A reappraisal of thymosin alpha1 in cancer therapy. Front Oncol. 2019;9:873.',
      'King R, Tuthill C. Immune modulation with thymosin alpha 1 treatment. Vitam Horm. 2016;102:151-178. PMID 26827955.',
      'Zhu et al. Thymosin-alpha 1 enhances immunogenicity of pandemic H1N1v influenza vaccine in hemodialyzed patients. Pilot RCT n=99. CHMP criteria met in Ta1 groups only.',
      'Matteucci C et al. Transcription profile of human lymphocytes with thymosin alpha-1. 8,300 genes profiled. Peptide Society.',
      'Tuthill C et al. Thymosin alpha 1: past clinical experience and future promise.',
      'Lemke R. Thymosin Alpha-1: Immune Modulation Dosing Guide. The Peptide Toolkit. April 27, 2026. [Speculation — educational guide]',
    ],
  },

  // ─── Selank ───────────────────────────────────────────────────────────────────
  {
    id: 'selank',
    name: 'Selank',
    fullName: 'Selank (TP-7)',
    aliases: ['TP-7'],
    category: 'Neuropeptide / Anxiolytic',
    categoryTag: 'neuro',
    goals: ['mental_clarity', 'neuroprotection', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Registered in Russia as anxiolytic. Research peptide in US.',
    researchLevel: 'moderate',
    summary: 'Synthetic analogue of tuftsin. Anxiolytic, nootropic, and immunomodulatory peptide with no addictive potential.',
    mechanism: 'Modulates GABA-A receptors (benzodiazepine-like without dependence). Increases BDNF, serotonin turnover. Inhibits enkephalin degradation.',
    benefits: [
      'Anxiolytic without sedation or dependence',
      'Nootropic — improved learning, memory, attention',
      'Mood stabilization',
      'Immune modulation',
    ],
    dosing: {
      typical: '250-500 mcg intranasal or SC, 1-2x daily',
      range: '100-1,000 mcg/day',
      route: ['intranasal', 'subcutaneous injection'],
      cycle: '2-4 weeks; can be used as needed',
      notes: 'Intranasal administration most common.',
    },
    sideEffects: 'Excellent tolerability. Mild sedation at higher doses. No withdrawal or dependence.',
    keyReferences: ['Semenova TP et al. (2010). Selank anxiolytic effects. Bull Exp Biol Med.'],
  },

  // ─── Semax ────────────────────────────────────────────────────────────────────
  {
    id: 'semax',
    name: 'Semax',
    fullName: 'Semax (ACTH 4-10 analogue)',
    aliases: ['ACTH 4-10 Pro-Gly-Pro'],
    category: 'Neuropeptide / Cognitive',
    categoryTag: 'neuro',
    goals: ['mental_clarity', 'neuroprotection', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Registered drug in Russia. Research peptide in US.',
    researchLevel: 'moderate',
    summary: 'Synthetic ACTH 4-10 analogue with potent BDNF-stimulating and neuroprotective properties.',
    mechanism: 'Upregulates BDNF and NGF expression. Activates melanocortin receptors. Enhances dopaminergic and serotonergic neurotransmission.',
    benefits: [
      'BDNF upregulation — neuroplasticity, learning, memory',
      'Cognitive enhancement (attention, processing speed)',
      'Stroke recovery and neuroprotection',
      'Anti-anxiety and antidepressant properties',
    ],
    dosing: {
      typical: '200-600 mcg intranasal, 1-2x daily',
      range: '100-1,200 mcg/day',
      route: ['intranasal', 'subcutaneous injection'],
      cycle: '2-4 weeks on, 1-2 weeks off',
      notes: 'Intranasal preferred for direct CNS access. Morning dosing recommended (stimulatory).',
    },
    sideEffects: 'Generally well-tolerated. Possible mild anxiety at higher doses.',
    keyReferences: ['Akhapkina VI et al. (2001). Semax neuroprotection. Neurosci Behav Physiol.'],
  },

  // ─── KPV ──────────────────────────────────────────────────────────────────────
  {
    id: 'kpv',
    name: 'KPV',
    fullName: 'KPV Tripeptide (Lys-Pro-Val)',
    aliases: ['alpha-MSH fragment', 'Lys-Pro-Val'],
    category: 'Anti-Inflammatory / GI',
    categoryTag: 'gut',
    goals: ['gut_health', 'inflammation'],
    regulatoryStatus: 'Research peptide. Not FDA-approved.',
    researchLevel: 'moderate',
    summary: 'C-terminal fragment of alpha-MSH. Potent anti-inflammatory peptide with particular efficacy in gut inflammation.',
    mechanism: 'Binds MC1R and MC3R. Inhibits NF-kB, TNF-alpha, and IL-1beta. Reduces intestinal inflammation and permeability.',
    benefits: [
      'Reduces intestinal inflammation (IBD, Crohns)',
      'Improves gut barrier integrity',
      'Systemic anti-inflammatory',
    ],
    dosing: {
      typical: '100-500 mcg oral or SC, once or twice daily',
      range: '100-500 mcg/dose',
      route: ['oral', 'subcutaneous injection'],
      cycle: '4-8 weeks for gut conditions',
      notes: 'Oral bioavailability present. Combine with BPC-157 for synergistic GI healing.',
    },
    sideEffects: 'Very limited adverse event data. Appears well-tolerated.',
    keyReferences: ['Catania A et al. (2004). Alpha-MSH fragments and inflammation. Peptides.'],
  },

  // ─── HCG ──────────────────────────────────────────────────────────────────────
  // Updated May 2026 — 4 peer-reviewed sources + 1 community guide
  {
    id: 'hcg',
    name: 'HCG',
    fullName: 'Human Chorionic Gonadotropin (hCG)',
    aliases: ['Pregnyl', 'Novarel', 'Chorionic Gonadotropin', 'hCG'],
    category: 'Hormonal / Fertility',
    categoryTag: 'fertility',
    goals: ['fertility', 'sexual_function', 'metabolic_health', 'muscle_mass'],
    regulatoryStatus: 'FDA-approved (Pregnyl, Novarel) for: (1) hypogonadotropic hypogonadism in males, (2) ovulation induction in females, (3) cryptorchidism in pediatric patients. TRT adjunct use — the most common community use — is off-label. Compounding availability significantly reduced since FDA enforcement actions 2024-2025; many TRT clinics have switched to gonadorelin as of 2026. WADA Prohibited List 2026, Section S2 — banned in male competitive athletes. [Verified — FDA, WADA]',
    researchLevel: 'high',
    summary: 'Human Chorionic Gonadotropin is a 244-amino-acid glycoprotein hormone naturally produced by the placenta during pregnancy. In men, it functions as an LH mimic — binding directly to LH receptors on testicular Leydig cells and stimulating intratesticular testosterone (ITT) production and spermatogenesis support. In hypogonadotropic hypogonadism populations — the best-studied clinical group — HCG achieves testosterone normalization (0.9 → 15.1 nmol/L, P<0.001; Liu 2016, n=223) and testicular growth. As of 2026, HCG has become harder to source through compounding pharmacies; gonadorelin has emerged as the primary alternative. [Verified — 4 peer-reviewed sources; TRT adjunct dosing Speculation — Lemke 2026]',
    mechanism: 'LH RECEPTOR MIMIC: HCG beta subunit binds LH receptors on testicular Leydig cells with high affinity. Activates adenylyl cyclase → cAMP → steroidogenic enzyme upregulation → intratesticular testosterone (ITT) synthesis. ITT is orders of magnitude higher than serum testosterone and is essential for spermatogenesis via Sertoli cell support. HCG bypasses hypothalamic-pituitary signaling entirely. PLASMA KINETICS: Terminal half-life ~33-37 hours. Biological effect persists 3-5 days per injection. ESTRADIOL PATHWAY: Stimulated ITT → testicular aromatase → estradiol elevation. Higher E2 risk than gonadorelin because HCG provides stronger direct Leydig stimulation. IMPORTANT: HCG alone is often insufficient for complete spermatogenesis in HH patients — FSH co-administration (via HMG, recFSH, or corifollitropin alfa) is required in most fertility cases.',
    benefits: [
      '[Verified] Testosterone normalization in HH: 0.9±0.5 → 15.1±8.2 nmol/L (P<0.001) with HCG/HMG (Liu 2016, n=223).',
      '[Verified] Testicular volume restoration: 2.1±1.6 → 8.1±4.6 mL (P<0.001) in HH patients (Liu 2016). 2.30-fold increase with HCG+FSH (Nieschlag 2017, 95% CI: 2.03-2.62).',
      '[Verified] Spermatogenesis induction (HCG+FSH): 77.8% achieved sperm count ≥1×10⁶/mL in Phase III trial (Nieschlag 2017, n=18). 64% success with HCG+HMG (Liu 2016, n=223).',
      '[Verified] Fertility outcomes: 19/34 (56%) married HH patients impregnated partners during HCG/HMG therapy (Liu 2016). Median time to first sperm: 15 months.',
      '[Verified] TRT — testicular atrophy prevention: Hsieh 2013 J Urol 189:647. Low-dose HCG maintains ITT in testosterone-suppressed men (Coviello 2005, JCEM 90:2595).',
      '[Speculation] TRT — mood/well-being: some men on TRT-only report flat or off feeling that resolves with HCG addition. Anecdotal but consistently reported.',
    ],
    dosing: {
      typical: '[Speculation] TRT adjunct: 250-500 IU SC, 2-3x/week. [Verified — Phase III] HH therapy: 1,500-3,000 IU SC/IM 2x/week.',
      range: 'TRT adjunct: 250-500 IU per injection. HH with HCG/HMG: 2,000-5,000 IU IM 2x/week (Liu 2016).',
      frequency: '2-3x/week for TRT adjunct. 2x/week for HH. Biological effect persists 3-5 days per injection.',
      route: ['subcutaneous injection', 'intramuscular injection (clinical trials)'],
      cycle: 'TRT adjunct: continuous with TRT. HH fertility: 6-18+ months. Effects on testicular function reverse within months of stopping.',
      notes: 'CRITICAL: HCG is dosed in International Units (IU), NOT milligrams. 5,000 IU + 5 mL BAC water = 1,000 IU/mL. For 250 IU dose: draw 0.25 mL = 25 units on U-100 syringe. STORAGE: Refrigerate immediately. Never freeze. Use within 30 days of reconstitution. MONITORING: Estradiol every 6-8 weeks — higher aromatization than gonadorelin. PREGNANCY TEST INTERFERENCE: home tests detect HCG — positive for 7-14 days post-injection. 2026 ACCESS NOTE: HCG availability limited following 2024-2025 FDA enforcement. Gonadorelin is the widely available alternative (100-300 mcg SC 2-3x/day).',
    },
    hcgVsGonadorelin: {
      note: '[Speculation — Lemke 2026] Both preserve testicular function during TRT via different mechanisms.',
      mechanism: 'HCG: direct LH receptor agonist on Leydig cells. Gonadorelin: synthetic GnRH → pituitary → endogenous LH/FSH release.',
      injectionsPerWeek: 'HCG: 2-3. Gonadorelin: 14-21 (2-3x daily due to 2-10 min half-life).',
      estrogenRisk: 'HCG: higher (direct Leydig overstimulation risk). Gonadorelin: lower (pulsatile, physiologic).',
      intratesticularT: 'HCG: strong. Gonadorelin: modest.',
      availability2026: 'HCG: limited/inconsistent. Gonadorelin: widely compounded.',
      pregnancyTestInterference: 'HCG: yes (7-14 days). Gonadorelin: no.',
    },
    sideEffects: '[Verified] Well-tolerated at TRT-adjunct doses. No serious adverse events in Phase III trial (Nieschlag 2017). [Verified] Estradiol elevation: gynecomastia occurred in 7% (16/223) at HH clinical doses; 2 required surgical excision (Liu 2016). [Verified] Acne: 9% (20/223). [Verified] Pregnancy test cross-reactivity: positive for 7-14 days. [Unknown] Long-term TRT adjunct safety profile: no dedicated RCT. CONTRAINDICATIONS: Active prostate or breast cancer; primary hypogonadism — Klinefelter syndrome; prior bilateral cryptorchidism.',
    keyReferences: [
      'Lemke R. HCG for TRT: Doses, Forms & The 2026 Compounding Crisis. The Peptide Toolkit. May 3, 2026. [Speculation]',
      'Delemarre-van de Waal HA. GnRH in hypogonadotropic hypogonadism. Eur J Endocrinol. 2004;151:U89-U94.',
      'Liu Z et al. Gonadotropin treatment for male CHH: retrospective study of 223 patients. Medicine. 2016;95(9):e2867.',
      'Hong BS & Ahn TY. Testosterone deficiency syndrome treatment trends. Int J Urol. 2007;14:981-985.',
      'Nieschlag E et al. Corifollitropin alfa combined with hCG in hypogonadotropic hypogonadism. Reprod Biol Endocrinol. 2017;15:17. NCT01709331.',
      'Coviello AD et al. Low-dose hCG maintains intratesticular testosterone. JCEM. 2005;90(5):2595-2602.',
      'Hsieh TC et al. Concomitant hCG preserves spermatogenesis in men undergoing TRT. J Urol. 2013;189(2):647-650.',
      'Bhasin S et al. Testosterone therapy in men with hypogonadism: Endocrine Society guideline. JCEM. 2018;103(5):1715-1744.',
      'WADA. Prohibited List 2026, Section S2.',
    ],
  },

  // ─── MOTS-c ───────────────────────────────────────────────────────────────────
  // Updated May 2026 — 12 peer-reviewed sources
  {
    id: 'motsc',
    name: 'MOTS-c',
    fullName: 'Mitochondrial Open Reading Frame of the 12S rRNA type-c (MOTS-c)',
    aliases: ['Mitochondrial Open Reading Frame of the 12S rRNA-c', 'MDP'],
    category: 'Mitochondrial / Metabolic',
    categoryTag: 'mitochondrial',
    goals: ['mitochondrial', 'metabolic_health', 'longevity', 'fatigue', 'muscle_mass', 'recovery', 'inflammation'],
    regulatoryStatus: 'Included in February 27, 2026 FDA Category 1 reclassification batch (compoundable with prescription). First mitochondrial-encoded peptide in clinical trials (NCT03998514 ongoing).',
    researchLevel: 'moderate',
    summary: 'MOTS-c is a 16-amino-acid mitochondrial-derived peptide encoded in the 12S rRNA open reading frame of mitochondrial DNA. Plasma MOTS-c declines with age (-11% middle-aged, -21% older vs young; p<0.001) and in disease states including T1DM, T2DM, gestational diabetes (-18%, p<0.01), and obesity. Exercise-induced — rising 11.9-fold in skeletal muscle and 1.5-fold in plasma after high-intensity cycling. Serum levels correlate positively with lower-body muscle strength (R2=0.53, p=0.016). As the first mitochondrial-encoded peptide to enter clinical trials, it is a high-priority longevity and metabolic therapeutic candidate. [Verified — 12 peer-reviewed sources]',
    mechanism: 'PRIMARY (skeletal muscle): Folate cycle inhibition → AICAR accumulation → AMPK activation → GLUT4 translocation → enhanced glucose uptake. STRESS RESPONSE: AMPK-dependent nuclear translocation → Nrf2/ARE antioxidant regulation → ATF1-mediated stress resistance. IMMUNE/T1DM: Alpha-helical domain binds Raptor → mTORC1 suppression → Foxp3+ Treg differentiation → reduced pancreatic islet infiltration. CARDIAC: AMPK → mitochondrial biogenesis → restored OXPHOS; Nrf2 → SOD/catalase/GPX4 upregulation. LONGEVITY: Mitohormesis — transient H2O2 bursts trigger adaptive antioxidant upregulation. m.1382A>C SNP in MOTS-c ORF associated with exceptional longevity in Japanese centenarians.',
    benefits: [
      '[Verified] Insulin resistance reduction via GLUT4/AMPK/AICAR in skeletal muscle — validated in HFD, T2DM, and GDM mouse models',
      '[Verified] T2DM: Serum MOTS-c inversely correlated with HbA1c severity (n=225); lowest in poorly controlled T2DM (HbA1c >7%)',
      '[Verified] Gestational diabetes (GDM): Plasma MOTS-c 18% lower vs healthy pregnant (p<0.01); R=-0.707 with OGTT 2h glucose',
      '[Verified] Diabetic cardiomyopathy: Restored cardiac OXPHOS respiration to control levels in T2D rat model (Pham 2025)',
      '[Verified] Cardiac hypertrophy reversal: LV wall thickness -8% (3.71→3.40 mm, p<0.05) in T2D rats',
      '[Verified] Exercise-induced: 11.9-fold muscle MOTS-c increase post high-intensity cycling (p=0.0098)',
      '[Verified] Muscle strength: Serum MOTS-c correlates with lower-body max force (R2=0.53, p=0.016) and average power (R2=0.50)',
      '[Verified] VO2max: Zero correlation (R2=-0.011, p=0.96) — strength not endurance marker',
      '[Verified] Longevity: Late-life intermittent MOTS-c 3x/week increased healthy lifespan in mice; 22-month-old mice doubled treadmill time on 2-week protocol',
      '[Verified] Genetic longevity: m.1382A>C SNP in MOTS-c ORF associated with exceptional longevity in Asian centenarians',
    ],
    dosing: {
      typical: '[Speculation] 5-10 mg/week SC — community practice only. No established human RCT dose.',
      range: '[Verified — animal] 0.5-15 mg/kg across validated studies.',
      frequency: 'Animal: daily or 3x weekly. [Speculation] Human: 2-3x weekly SC.',
      route: ['subcutaneous injection'],
      cycle: '[Speculation] 4-8 weeks on, reassess. No validated human off-cycle protocol.',
      notes: 'No human exogenous administration RCT completed. Phase I trial (NCT03998514) ongoing. Exercise synergy documented — additive PGC-1alpha effects.',
    },
    humanEvidence: '5 human observational studies (no exogenous RCT): Reynolds 2021 (n=10, exercise-induced); DSouza 2020 (n=78, age paradox); Yin 2022 (n=40, GDM); Kong 2023 (n=225 T2DM cross-sectional); Domin 2023 (n=20, strength correlation). Phase I trial NCT03998514 pending.',
    sideEffects: '[Verified — animal] Injection site reactions at higher doses. 15 mg/kg/day x 3 weeks well-tolerated in T2D rats — no organ morphology changes (Pham 2025). [Unknown] Long-term human safety. Phase I trial will provide first human dataset.',
    keyReferences: [
      'Reynolds JC et al. (2021). MOTS-c is an exercise-induced mitochondrial-encoded regulator. Nat Commun 12:470.',
      'Pham T et al. (2025). MOTS-c restores mitochondrial respiration in type 2 diabetic heart. Front Physiol 16:1602271.',
      'Yin Y et al. (2022). MOTS-c relieves hyperglycemia in gestational diabetes. Pharmacol Res 175:105987.',
      'Kong BS et al. (2023). MOTS-c, diabetes, and aging-related diseases. Diabetes Metab J 47:315-324.',
      'Domin R et al. (2023). MOTS-c correlates with lower-body muscle strength. Int J Mol Sci 24:14951.',
      'Fuku N et al. (2015). MOTS-c and exceptional longevity. Aging Cell 14:921.',
    ],
  },

  // ─── SS-31 / Elamipretide ──────────────────────────────────────────────────────
  {
    id: 'ss31',
    name: 'SS-31',
    fullName: 'Elamipretide (SS-31)',
    aliases: ['MTP-131', 'Bendavia', "D-Arg-2'6'-Dmt-Lys-Phe-NH2"],
    category: 'Mitochondrial',
    categoryTag: 'mitochondrial',
    goals: ['mitochondrial', 'longevity', 'fatigue', 'recovery'],
    regulatoryStatus: 'Investigational. Phase III trials completed. Not yet FDA-approved (NDA submitted for Barth syndrome).',
    researchLevel: 'high',
    summary: 'Cardiolipin-targeting mitochondrial peptide. Directly targets the inner mitochondrial membrane, restoring cristae structure and electron transport chain efficiency.',
    mechanism: 'Binds selectively to cardiolipin on inner mitochondrial membrane. Stabilizes cristae architecture, reduces electron leak, restores ATP synthesis, reduces mitochondrial ROS.',
    benefits: [
      'Mitochondrial function restoration',
      'Improved cardiac function (HFpEF)',
      'Reduced age-related skeletal muscle dysfunction',
      'Ischemia-reperfusion protection',
      'Energy and fatigue improvement',
    ],
    dosing: {
      typical: '0.05-0.25 mg/kg SC or IV (clinical trial dosing)',
      range: 'Varies by indication',
      route: ['subcutaneous injection', 'intravenous (clinical trials)'],
      cycle: 'Ongoing; 28-day trial data for Barth syndrome',
      notes: 'Highest-evidence mitochondrial peptide. Physician supervision required.',
    },
    sideEffects: 'Well-tolerated in trials. Injection site reactions. No serious adverse effects.',
    keyReferences: ['Szeto HH. (2017). Mitochondria-targeted peptide antioxidants. FASEB J.'],
  },

  // ─── GLUTATHIONE — NEW May 2026 ──────────────────────────────────────────────
  // Sources: Lemke/Peptide Toolkit May 2026; Pizzorno 2014; Sechi 1996 (Parkinson);
  // Allen & Bradley 2011 (oral oxidative stress); Sinha et al. 2018 (liposomal GSH);
  // Honda et al. 2017 (NAFLD pilot)
  // FIX (May 2026): summary and mechanism converted to template literals
  // to resolve unescaped apostrophes in "body's" and "Parkinson's"
  {
    id: 'glutathione',
    name: 'Glutathione',
    fullName: 'Glutathione (GSH, gamma-Glutamyl-Cysteinyl-Glycine)',
    aliases: ['GSH', 'Reduced Glutathione', 'L-Glutathione', 'gamma-GSH'],
    category: 'Antioxidant / Detox',
    categoryTag: 'longevity',
    goals: ['longevity', 'inflammation', 'mitochondrial', 'fatigue', 'recovery'],
    regulatoryStatus: 'Injectable glutathione is NOT FDA-approved for any indication in the US. Available only through 503A compounding pharmacies with a physician prescription. Oral glutathione supplements are widely sold as dietary supplements (DSHEA-regulated). Plasma half-life IV: approximately 10 minutes. Intracellular effects persist longer because regenerated GSH is recycled via glutathione reductase/NADPH system.',
    researchLevel: 'moderate',
    // ↓ FIXED: template literal — apostrophe in "body's" was breaking the parser
    summary: `Glutathione (GSH) is a small tripeptide (gamma-Glutamyl-Cysteinyl-Glycine) produced endogenously in every cell. It is the body's most abundant and central antioxidant. Unlike most peptides in this KB, glutathione is not a signaling molecule — it is a substrate consumed in antioxidant chemistry and Phase II hepatic detoxification. Its benefits from supplementation are most pronounced in people under oxidative stress: illness, alcohol exposure, aging, and intense training. CRITICAL CLINICAL REALITY: oral glutathione capsules are largely placebo for systemic effect (<5% bioavailability; degraded in stomach). Injectable routes — IV or SC — reliably elevate circulating and tissue GSH. Liposomal oral forms (15-30% bioavailability) are the best non-injectable option. STABILITY WARNING: unlike most lyophilized peptides stable for 30 days post-reconstitution, glutathione is sensitive to oxidation. Use within 24 hours of reconstitution for full potency.`,
    // ↓ FIXED: template literal — apostrophe in "Parkinson's" was breaking the parser
    mechanism: `PRIMARY — Redox defense: GSH donates an electron to neutralize reactive oxygen species → becomes oxidized glutathione (GSSG). Glutathione reductase regenerates GSSG → GSH using NADPH (the GSH/GSSG redox cycle). PHASE II HEPATIC DETOXIFICATION: Conjugates to toxins and drug metabolites (glutathione-S-transferase, GST) → enables biliary and renal excretion. N-acetylcysteine (a GSH precursor) is the standard ER treatment for acetaminophen overdose because it replenishes GSH to neutralize the toxic metabolite NAPQI. TYROSINASE INHIBITION: Blocks tyrosinase, the enzyme that produces melanin → reduces skin pigmentation. This is the mechanism of the controversial off-label skin-lightening use. IMMUNE FUNCTION: GSH status influences lymphocyte proliferation and cytokine production. NEUROLOGICAL: IV glutathione improved motor function in early Parkinson's disease patients (Sechi 1996).`,
    benefits: [
      '[Verified — Moderate] Antioxidant defense: supplementation reliably raises blood and tissue GSH via injectable routes. Oral liposomal form raises body stores (Sinha et al. Eur J Clin Nutr. 2018;72(1):105-111 — 6-month study showing elevated whole-blood GSH and immune markers).',
      '[Verified — Moderate] NAFLD/liver function: Oral GSH 300 mg/day x 4 months (Honda Y et al. BMC Gastroenterol. 2017;17(1):96 — open-label multicenter pilot, n=29) reduced ALT, triglycerides, and markers of hepatic fat.',
      '[Verified — Low] Parkinson\'s disease motor function: IV glutathione improved motor scores in early PD patients (Sechi G et al. Prog Neuropsychopharmacol Biol Psychiatry. 1996;20(7):1159-1170). Small study, short-term.',
      '[Verified — Low] Oral GSH biomarker effects: Allen & Bradley (J Altern Complement Med. 2011;17(9):827-833) — oral GSH supplementation reduced systemic oxidative stress biomarkers in healthy volunteers at 1,000 mg/day. Modest effects consistent with poor-but-nonzero oral bioavailability.',
      '[Speculation] Post-illness / Long COVID recovery: included in long COVID clinic protocols; evidence mostly anecdotal but safety profile is good and oxidative stress is documented in long COVID.',
      '[Speculation] Skin lightening: tyrosinase inhibition → melanin reduction. Popular off-label at 600-2,000 mg IV 1-3x/week. FDA has not evaluated this use. Effects appear after 6-12 weeks; reverse without maintenance.',
    ],
    dosing: {
      typical: 'SC: 200-600 mg, 1-3x/week. IV: 600-1,200 mg per session, 1-3x/week.',
      range: '200 mg SC (maintenance) to 2,000 mg IV (skin lightening, off-label)',
      frequency: '1-3x/week depending on indication and route',
      route: ['intravenous injection', 'subcutaneous injection', 'intramuscular injection', 'intranasal', 'liposomal oral'],
      byGoal: {
        antioxidantMaintenance: '200-600 mg SC, 1-3x/week OR 1,000 mg liposomal oral daily',
        intensiveDetoxPostIllness: '1,200 mg IV, 2x/week x 4 weeks, then taper; often paired with Vitamin C 5-25g IV',
        hangoverAcuteAlcohol: '600-1,200 mg IV single session',
        skinLightening: '600-2,000 mg IV, 1-3x/week x 8-12 weeks [off-label, controversial]',
      },
      cycle: 'No standard cycle. Continuous for longevity protocols; on-demand for acute indications.',
      reconstitution: 'CRITICAL: Glutathione is uniquely sensitive to oxidation. USE WITHIN 24 HOURS of reconstitution for full potency. Do not stockpile pre-mixed. 1,200 mg vial + 10 mL BAC water = 120 mg/mL. For 600 mg dose: draw 5 mL. For 200 mg dose: draw 1.67 mL (use tuberculin syringe — too large for insulin syringe). For IV: sterile saline preferred (handled at clinic). IV push over 5-15 minutes minimum — fast push → transient hypotension. Do NOT mix with NAD+ in same syringe (inject separately or as separate IV pushes).',
      notes: 'ROUTE HIERARCHY for systemic effect: IV > IM > SC > liposomal oral >> standard oral (functionally placebo). STACKING — canonical longevity stack: NAD+ (complementary mechanisms: redox vs energy — inject separately); Vitamin C high-dose (regenerates GSSG → GSH, most important cofactor); Alpha-Lipoic Acid (ALA) oral (recycling cofactor); B-complex methylated (supports methylation cycle for GSH precursor synthesis).',
      cost2026: 'Compounded 1,200 mg vial: $50-150. IV clinic session: $125-350 (often bundled with Vitamin C and B-complex). Liposomal oral (high-quality 1-month supply): $40-80.',
    },
    sideEffects: '[Verified — High] One of the better-tolerated injectable compounds. Most users have no notable side effects. [Verified — Moderate] Mild injection site stinging (some compounded formulations have low pH). [Verified — Low] Headache: rare. [Verified — Moderate] Transient lightheadedness with fast IV push: managed by slowing push rate to 5-15 minutes. [Verified — Low] Sulfur-like taste or smell with sublingual or nasal forms. [Speculation] Skin lightening over time with chronic high-dose IV. No serious adverse events at standard doses (<2,000 mg IV) with proper sterile technique. Main risks: infection from poor sterile technique, very rare allergic reactions. CONTRAINDICATIONS: Known hypersensitivity to GSH or formulation components.',
    keyReferences: [
      'Pizzorno J. Glutathione! Integr Med (Encinitas). 2014;13(1):8-12. PMID 26770075.',
      'Sechi G, Deledda MG et al. Reduced intravenous glutathione in the treatment of early Parkinson\'s disease. Prog Neuropsychopharmacol Biol Psychiatry. 1996;20(7):1159-1170. PMID 8938817.',
      'Allen J, Bradley RD. Effects of oral glutathione supplementation on systemic oxidative stress biomarkers in human volunteers. J Altern Complement Med. 2011;17(9):827-833. PMID 21875351.',
      'Sinha R, Sinha I et al. Oral supplementation with liposomal glutathione elevates body stores of glutathione and markers of immune function. Eur J Clin Nutr. 2018;72(1):105-111. PMID 28853742.',
      'Honda Y, Kessoku T et al. Efficacy of glutathione for the treatment of NAFLD: open-label, single-arm, multicenter pilot. BMC Gastroenterol. 2017;17(1):96. PMID 28756777.',
      'Lemke R. Glutathione Injection: Doses, Forms, and What It Actually Does. The Peptide Toolkit. May 3, 2026. [Speculation — educational guide]',
    ],
  },

  // ─── NAD+ — NEW May 2026 ─────────────────────────────────────────────────────
  // Sources: Lemke/Peptide Toolkit Apr 2026; Verdin 2015 Science;
  // Imai & Guarente 2014 Trends Cell Biol; Trammell 2016 Nat Commun;
  // Yoshino 2018 Cell Metab; Martens 2018 Nat Commun; Massudi 2012 PLoS One;
  // Mehmel 2020 Nutrients
  {
    id: 'nad_plus',
    name: 'NAD+',
    fullName: 'Nicotinamide Adenine Dinucleotide (NAD+)',
    aliases: ['NAD', 'NAD+', 'Beta-NAD', 'Coenzyme I'],
    category: 'Longevity / Mitochondrial',
    categoryTag: 'mitochondrial',
    goals: ['longevity', 'mitochondrial', 'fatigue', 'mental_clarity', 'metabolic_health', 'anti_aging'],
    regulatoryStatus: 'Injectable NAD+ is NOT FDA-approved for any indication. Available via 503A compounding pharmacies with physician prescription. Not a traditional peptide — it is a coenzyme (dinucleotide). Oral NAD+ capsules are widely sold as dietary supplements but have near-zero systemic bioavailability (degraded in gut). NMN precursor: regulatory gray zone post-2022 FDA scrutiny. NR precursor: sold as dietary supplement, FDA-recognized.',
    researchLevel: 'moderate',
    summary: 'NAD+ (nicotinamide adenine dinucleotide) is a coenzyme found in every living cell. It exists in two interconverting forms: oxidized (NAD+) and reduced (NADH). Cellular NAD+ falls roughly 50% by middle age (Massudi et al. PLoS One. 2012 — human skin biopsies across lifespan), tracking closely with metabolic dysfunction associated with aging. When NAD+ is low: sirtuins go quiet, PARP-driven DNA repair slows, CD38 continues hydrolyzing what little NAD+ remains, and mitochondrial machinery operates at reduced redox capacity. NAD+ supplementation via injection reliably raises circulating and tissue NAD+ levels. Whether this extends lifespan in humans is unknown — no human longevity RCT exists. It is a plausible bet, not a proven one. [Verified — Lemke 2026]',
    mechanism: 'NAD+ is a substrate consumed by several major enzyme families: (1) SIRTUINS (SIRT1-SIRT7): NAD+-dependent protein deacetylases. SIRT1 regulates metabolic gene expression and stress response. SIRT3 governs mitochondrial protein acetylation. Sirtuin activity scales directly with available NAD+ (Imai & Guarente 2014). (2) PARP ENZYMES: Consume NAD+ aggressively when DNA damage accumulates. Chronic low-grade DNA damage from aging keeps PARPs active, depleting the NAD+ pool sirtuins also need. (3) CD38: Surface ectoenzyme that hydrolyzes NAD+. Expression rises with age and inflammation — many researchers argue it is a primary driver of the age-related NAD+ drop. (4) REDOX COFACTOR: Glycolysis, TCA cycle, beta-oxidation, and the electron transport chain all depend on the NAD+/NADH cycle.',
    benefits: [
      '[Verified — Moderate] Age-related NAD+ decline confirmed in humans: Massudi et al. PLoS One. 2012;7(7):e42357 — roughly 50% reduction by middle age in human skin biopsies.',
      '[Verified — Moderate] NR precursor raises blood NAD+ in healthy older adults: Martens CR et al. Nat Commun. 2018;9(1):1286 — chronic NR supplementation significantly elevated whole-blood NAD+ and was well-tolerated.',
      '[Verified — Moderate] NMN precursor — muscle insulin sensitivity: Yoshino M et al. Science. 2021 — NMN increased muscle insulin sensitivity in prediabetic postmenopausal women. Biomarker improvement, not a longevity endpoint.',
      '[Verified — Low] Injectable NAD+ raises circulating NAD+ effectively: Mehmel M et al. Nutrients. 2020;12(6):1616 — injection routes required for meaningful systemic NAD+ elevation when the parent molecule is the goal.',
      '[Verified — Low] Sirtuin-NAD+ axis in aging: Imai S, Guarente L. Trends Cell Biol. 2014;24(8):464-471 — SIRT1 and SIRT3 activity scales with NAD+ availability; decline drives metabolic aging.',
      '[Verified — Low] NAD+ in neurodegeneration: Verdin E. Science. 2015;350(6265):1208-1213 — mechanistic case for NAD+ restoration in aging and neurodegeneration.',
      '[Speculation] Human longevity and healthy aging: no RCT has shown NAD+ supplementation extends lifespan or reduces age-related disease incidence in humans. Treat as a plausible bet, not a proven one.',
      '[Speculation] Energy and cognitive clarity: most commonly reported subjective effect post-IV drip — clarity or energy lift lasting 1-2 days. Mechanism unclear.',
    ],
    dosing: {
      typical: 'SC: 50-100 mg/day or 100-200 mg 3x/week. IV: 250-1,000 mg per session.',
      range: '50 mg SC daily (conservative) to 1,000 mg IV per session (clinic)',
      frequency: 'SC: daily or 3x/week. IV: 1-3x/week loading, then monthly maintenance.',
      route: ['intravenous injection', 'subcutaneous injection', 'intramuscular injection'],
      protocols: {
        scDaily: '50-100 mg SC daily — steady-state elevation, lower side-effect burden, best for longevity-focused home use',
        sc3xWeek: '100-200 mg SC Monday/Wednesday/Friday — cost management protocol',
        ivClinic: '250-1,000 mg slow IV drip over 1-3 hours, 1-3x/week loading, then monthly maintenance',
      },
      reconstitution: '500 mg vial + 5 mL BAC water = 100 mg/mL (100 mg dose = 1 mL = 100 units on U-100 syringe). 500 mg vial + 2.5 mL BAC water = 200 mg/mL (100 mg dose = 0.5 mL). For IV use: sterile saline preferred (at clinic). For SC/IM: BAC water. NAD+ solutions are mildly acidic — some sting at injection site expected. Refrigerate reconstituted vial, use within 30 days.',
      notes: 'THE NAD+ FLUSH: Most reported subjective effect, particularly with IV. Feels like niacin flush: facial warmth, redness, sometimes chest pressure, occasionally mild anxiety. Rate-dependent, NOT dose-total dependent. Slowing the drip almost always resolves it. SC injection produces almost no flushing — absorption curve too gradual. METHYL DONOR DEPLETION — most important clinical concern: NAD+ catabolism consumes methyl groups via conversion of nicotinamide to methylnicotinamide (NNMT enzyme). Chronic high-dose NAD+ can pull down SAMe. Clinical presentation: depressive or anxious tail 2-4 days after high-dose IV. Management: TMG (trimethylglycine/betaine) 500-1,000 mg daily is the standard answer. Some users also add methylated B vitamins. COST REALITY: SC home use runs approximately $1,000-1,500/year. Weekly clinic IVs run $15,000-35,000/year. IV produces higher acute peak; SC provides steady elevation at one-tenth the cost. STACKING: NAD+ + Glutathione (inject separately); NAD+ + MOTS-c (mitochondrial biogenesis complement); NAD+ + Epitalon (telomerase/pineal axis); NAD+ + TMG (mandatory methyl donor support).',
      cost2026: 'Compounded 500 mg vial: $50-150. Clinic IV 500 mg: $300-500/session. Clinic IV 1,000 mg: $500-700/session.',
    },
    sideEffects: '[Verified — Moderate] Flushing: common with rapid IV, rare with SC. [Verified — Moderate] Nausea: rate-dependent for IV. Slow the drip. [Verified — Moderate] Chest pressure: reported with fast IV push — stop or slow. [Verified — Moderate] Anxiety or low mood 2-4 days post-IV: most plausible mechanism is methyl donor depletion via NNMT pathway. Manage with TMG 500-1,000 mg daily. [Verified — Low] Injection site reactions: mild redness or sting. [Unknown] Long-term safety at supraphysiologic injectable doses: not established. Two specific concerns: (1) methyl donor depletion — manage with TMG; (2) theoretical: boosting NAD+ might support survival of pre-malignant cells via PARP and sirtuin pathways. No human cancer signal in available data, but dataset is shallow. CONTRAINDICATIONS: Active malignancy (theoretical). Caution with strong family history of cancer.',
    keyReferences: [
      'Verdin E. NAD+ in aging, metabolism, and neurodegeneration. Science. 2015;350(6265):1208-1213. PMID 26785480.',
      'Imai S, Guarente L. NAD+ and sirtuins in aging and disease. Trends Cell Biol. 2014;24(8):464-471. PMID 24786309.',
      'Massudi H, Grant R et al. Age-associated changes in oxidative stress and NAD+ metabolism in human tissue. PLoS One. 2012;7(7):e42357. PMID 22848760. [50% NAD+ decline by middle age — human skin biopsies]',
      'Martens CR, Denman BA et al. Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy middle-aged and older adults. Nat Commun. 2018;9(1):1286. PMID 29599478.',
      'Yoshino M et al. Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women. Science. 2021. [NMN precursor human RCT]',
      'Mehmel M, Jovanovic N, Spitz U. Nicotinamide riboside — current state of research and therapeutic uses. Nutrients. 2020;12(6):1616. PMID 32545405.',
      'Trammell SA et al. Nicotinamide riboside is uniquely and orally bioavailable in mice and humans. Nat Commun. 2016;7:12948. PMID 27721479.',
      'Lemke R. NAD+ Peptide Guide: Injectable Dosing, IV vs SC, and 2026 Cost Reality. The Peptide Toolkit. April 28, 2026. [Speculation — educational guide]',
    ],
  },

  // ─── GONADORELIN — NEW May 2026 ──────────────────────────────────────────────
  // Sources: Lemke/Peptide Toolkit May 2026; FDA Factrel/Lutrepulse historical labeling;
  // Bhasin et al. Endocrine Society guideline JCEM 2018;
  // Hsieh 2013 J Urol; Coviello 2005 JCEM; WADA 2026
  {
    id: 'gonadorelin',
    name: 'Gonadorelin',
    fullName: 'Gonadorelin (Synthetic GnRH)',
    aliases: ['GnRH', 'Gonadotropin-Releasing Hormone', 'Factrel', 'Lutrepulse', 'gonadorelin acetate', 'gonadorelin hydrochloride'],
    category: 'Hormonal / Fertility',
    categoryTag: 'fertility',
    goals: ['fertility', 'sexual_function', 'muscle_mass'],
    regulatoryStatus: 'Originally FDA-approved as Factrel (HCl) and Lutrepulse (acetate for injection) — both brand names now discontinued. Current TRT-adjunct use is off-label via 503A compounding pharmacies. Primary alternative to HCG since the 2024 FDA enforcement actions against bulk-compounding pharmacies. Gonadorelin was less affected; many compounding pharmacies pivoted to producing it specifically because of HCG availability collapse. As of 2026, significantly easier to source than HCG. WADA Prohibited List 2026: gonadorelin tested for on WADA-compliant sports anti-doping panels. Standard employment drug tests do not detect it.',
    researchLevel: 'moderate',
    summary: 'Gonadorelin is a synthetic 10-amino-acid peptide identical to endogenous Gonadotropin-Releasing Hormone (GnRH), the upstream hormonal signal in the hypothalamic-pituitary-gonadal (HPG) axis. In a healthy man, the hypothalamus pulses GnRH every 60-90 minutes, prompting the pituitary to release LH and FSH, which then stimulate the testicles. Gonadorelin injected subcutaneously sends the same signal the pituitary would normally receive from the hypothalamus. This is fundamentally different from HCG: HCG bypasses the pituitary entirely and binds directly to LH receptors in the testicles. Gonadorelin works further upstream. The half-life of gonadorelin is 2-10 minutes — the molecule clears within an hour. Continuous GnRH actually DOWNREGULATES pituitary response (the mechanism of chemical castration drugs like leuprolide). This is why gonadorelin requires multiple small injections per day, not one weekly injection. As of 2026, most TRT clinics have adopted gonadorelin as their default testicular-function-preservation agent for new patients. [Verified — Lemke 2026]',
    mechanism: 'UPSTREAM HPG AXIS STIMULATION: Gonadorelin binds GnRH receptors on pituitary gonadotroph cells. Activates adenylyl cyclase → cAMP → LH and FSH synthesis and release. LH → Leydig cell → intratesticular testosterone (ITT). FSH → Sertoli cell → spermatogenesis support. PULSATILE REQUIREMENT: Half-life 2-10 minutes. Pulsatile delivery required to mimic natural GnRH pulses (60-90 minute intervals). Continuous GnRH → receptor downregulation → pituitary desensitization. 2-3 injections per day is the standard approach. DIFFERENCE FROM HCG: HCG acts directly on testicular LH receptors (bypasses pituitary). Gonadorelin stimulates the pituitary to produce endogenous LH and FSH. Results: (a) Lower estrogen conversion — more modest ITT stimulation → less aromatization → lower E2 → many users do not need an aromatase inhibitor on gonadorelin where they would on HCG. (b) No pregnancy test cross-reactivity — HCG is what home pregnancy tests detect; gonadorelin does not trigger this. (c) More injections required — cost of upstream physiological signaling.',
    benefits: [
      '[Verified — Moderate] Testicular function preservation during TRT: Hsieh TC et al. J Urol. 2013;189(2):647-650 — concomitant HCG preserves spermatogenesis in men on TRT (downstream equivalent; gonadorelin achieves same via upstream mechanism). Coviello AD et al. JCEM. 2005;90(5):2595-2602 — low-dose HCG maintains ITT in men with testosterone-induced gonadotropin suppression.',
      '[Verified — Moderate] Endocrine Society guideline supports HPG-axis-preserving agents in men on TRT who want to maintain fertility (Bhasin S et al. JCEM. 2018;103(5):1715-1744).',
      '[Verified — Low] Lower estrogen conversion vs HCG: mechanistically expected from more modest ITT stimulation. Consistently reported in clinical practice — many users do not require anastrozole on gonadorelin.',
      '[Verified — Low] No pregnancy test cross-reactivity: gonadorelin does not contain the HCG beta subunit that home pregnancy tests detect. Practically relevant for couples tracking fertility.',
      '[Speculation] Mood and well-being preservation during TRT: some men report flat or off feeling on TRT alone resolves with HPG-axis support. Anecdotal but consistently reported.',
    ],
    hcgVsGonadorelinComparison: {
      note: '[Speculation — Lemke 2026] Practical 2026 comparison.',
      mechanism: { hcg: 'Direct LH receptor agonist on Leydig cells', gonadorelin: 'Pituitary GnRH stimulation → endogenous LH/FSH' },
      halfLife: { hcg: '24-36 hours', gonadorelin: '2-10 minutes' },
      injectionFrequency: { hcg: '2-3x weekly', gonadorelin: '2-3x daily' },
      injectionsPerWeek: { hcg: '2-3', gonadorelin: '14-21' },
      costCompoundedVial: { hcg: '$80-200', gonadorelin: '$80-200' },
      availability2026: { hcg: 'Limited/inconsistent', gonadorelin: 'Strong' },
      estrogenConversion: { hcg: 'Higher', gonadorelin: 'Lower' },
      intratesticularTEffect: { hcg: 'Strong', gonadorelin: 'Modest' },
      pregnancyTestCrossReactivity: { hcg: 'Yes (7-14 days post-injection)', gonadorelin: 'No' },
      reconstitutedShelfLife: { hcg: '~30 days refrigerated', gonadorelin: '~30 days refrigerated' },
      bottomLine: 'If you can tolerate multiple daily injections, gonadorelin is the practical 2026 choice. Better availability, lower estrogen elevation, no pregnancy test interference. HCG remains a strong option with stronger ITT effect if sourceable and injection frequency is acceptable. For active fertility goals: some switch to HCG for stronger ITT.',
    },
    dosing: {
      typical: '100-300 mcg SC, 2-3 times daily',
      range: '100 mcg (conservative) to 300 mcg per injection; higher for fertility protocols',
      frequency: '2-3x daily. 4x daily for some fertility-focused protocols. Less than 2x daily is insufficient given 2-10 minute half-life.',
      route: ['subcutaneous injection'],
      protocols: {
        trtAdjunctStandard: '200 mcg SC twice daily (morning and evening)',
        trtAdjunctFull: '200 mcg SC three times daily (morning, midday, evening)',
        fertilityFocused: '300+ mcg SC, 3-4x daily — supervised by reproductive specialist',
        diagnostic: '100 mcg single bolus IV — historical use for pituitary responsiveness testing only',
      },
      reconstitution: '10 mg vial + 2 mL BAC water = 5 mg/mL = 5,000 mcg/mL. For 200 mcg dose: 200 / 5,000 = 0.04 mL = 4 units on U-100 insulin syringe. A 10 mg vial = 50 doses at 200 mcg. At 2x daily: 25 days per vial. At 3x daily: 16.7 days per vial. CRITICAL: doses are small (4 units). Accurate measurement matters more than with most peptides. Use U-100, 29-31 gauge, 0.5-inch insulin syringes. Refrigerate immediately after reconstitution. Never freeze. Use within 30 days (some sources: 14 days for research-grade).',
      notes: 'SWITCHING FROM HCG: Most TRT clinicians can transition via 1-2 week overlap or direct switch. Recheck bloodwork 6-8 weeks after switching to confirm protocol is dialed. MISSED DOSE: Skip and resume. Do not double up — short half-life means a single missed pulse has minimal long-term effect. FERTILITY ACTIVE TRYING: For men actively trying to conceive, some switch back to HCG for stronger ITT effect or add FSH under reproductive specialist supervision.',
      cost2026: 'Compounded 10 mg vial: $80-200. Monthly cost at 200 mcg 3x/day: $50-120 from typical TRT clinics.',
    },
    sideEffects: '[Verified — Moderate] Well-tolerated at TRT-adjunct doses — one of the better-tolerated peptides. [Verified — Low] Mild flushing at injection time: transient, resolves within minutes. [Verified — Low] Headache: rare. [Verified — Low] Injection site reaction: uncommon with insulin syringes. [Verified — Low] Rarely: nausea or transient lightheadedness. [Verified — Moderate] Less estrogen-related side effects than HCG: less water retention, less gynecomastia risk, less anastrozole requirement. [Unknown] Long-term safety profile of SC gonadorelin for TRT adjunct: no dedicated RCT. Well-characterized pharmacology from decades of diagnostic and fertility clinical use. CONTRAINDICATIONS: Pituitary dysfunction (requires intact pituitary to work). Primary hypogonadism (absent or damaged Leydig cells). Hypersensitivity. Competitive athletes under WADA jurisdiction.',
    keyReferences: [
      'U.S. FDA. Lutrepulse (gonadorelin acetate for injection) historical labeling. Drugs@FDA.',
      'U.S. FDA. Factrel (gonadorelin hydrochloride) historical labeling. Drugs@FDA.',
      'Bhasin S, Brito JP, Cunningham GR et al. Testosterone therapy in men with hypogonadism: Endocrine Society clinical practice guideline. JCEM. 2018;103(5):1715-1744. PMID 29562364.',
      'Hsieh TC, Pastuszak AW et al. Concomitant intramuscular hCG preserves spermatogenesis in men undergoing TRT. J Urol. 2013;189(2):647-650. PMID 23260547.',
      'Coviello AD, Matsumoto AM et al. Low-dose hCG maintains intratesticular testosterone. JCEM. 2005;90(5):2595-2602. PMID 15687323.',
      'WADA. Prohibited List 2026, Section S2.',
      'Lemke R. Gonadorelin: The HCG Alternative for TRT in 2026. The Peptide Toolkit. May 3, 2026. [Speculation — educational guide]',
    ],
  },

  // ─── MK-677 (IBUTAMOREN) — NEW May 2026 ─────────────────────────────────────
  // Sources: Lemke/Peptide Toolkit Apr 2026; Patchett 1995 PNAS (original characterization);
  // Nass R et al. Ann Intern Med 2008 (primary 12-month RCT);
  // Adunsky A et al. Arch Gerontol Geriatr 2011 (halted hip-fracture trial);
  // Murphy MG et al. J Bone Miner Res 1999; Sevigny JJ et al. Neurology 2008;
  // Smith RG et al. Endocr Rev 1997; WADA 2026
  {
    id: 'mk677',
    name: 'MK-677',
    fullName: 'MK-677 (Ibutamoren Mesylate)',
    aliases: ['Ibutamoren', 'MK-0677', 'L-163,191', 'Nutrobal'],
    category: 'GH Axis / Oral Secretagogue',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'sleep', 'anti_aging', 'fatigue', 'recovery'],
    regulatoryStatus: 'Investigational and NOT FDA-approved for any indication. Developed by Merck as MK-0677. Some 503A compounding pharmacies dispense MK-677 capsules for off-label use under physician prescription — varies by state. After 2024-2026 FDA reclassification activity, legal status has tightened in some states. Verify current FDA Section 503A/503B status and state-level controls before purchase or use. WADA Prohibited List 2026, Section S2 — banned for competitive athletes. NOT a peptide: MK-677 is a small-molecule non-peptide spiroindoline (oral GHS-R1a agonist). Grouped with GH secretagogues in clinical practice.',
    researchLevel: 'moderate',
    summary: 'MK-677 (Ibutamoren) is the only major orally bioavailable growth hormone secretagogue in widespread use. Every other major GH secretagogue (Sermorelin, CJC-1295, Tesamorelin, Ipamorelin, GHRP-2, GHRP-6) requires subcutaneous injection. MK-677 is a capsule taken once daily — a hard barrier it uniquely bypasses. Plasma half-life ~4-6 hours; biological effect on the GH/IGF-1 axis lasts approximately 24 hours. The pivotal evidence: Nass R et al. Ann Intern Med. 2008;149(9):601-611 — randomized elderly subjects to 25 mg MK-677 daily vs placebo for 12 months. IGF-1 increased 1.5-2x, sustained throughout without tachyphylaxis. Fat-free mass: +3 kg at 12 months. HbA1c: +0.3%. The critical safety signal: a clinical trial in elderly hip-fracture patients was halted in 2007 due to an imbalance in congestive heart failure events in the MK-677 arm. This does not extrapolate to healthy younger users, but is a meaningful caution against MK-677 use in anyone with cardiovascular disease.',
    mechanism: 'MK-677 binds the GHS-R1a (ghrelin receptor) on pituitary somatotrophs and hypothalamic neurons, mimicking endogenous ghrelin. Activation produces: (1) Pulsatile GH secretion — does not suppress the pituitary (no meaningful pituitary suppression documented in 12-month Nass trial). (2) IGF-1 elevation: 1.5-2x baseline at 25 mg/day, sustained without tachyphylaxis at 12 months. IGF-1 normalizes 2-4 weeks after stopping. (3) Increased appetite: ghrelin\'s most reliable orexigenic effect. (4) Slow-wave sleep duration increase in some users. CORTISOL: MK-677 does not directly stimulate cortisol via HPA axis. Modest ACTH and prolactin elevation via hypothalamic cross-talk — much less than GHRP-6 or Hexarelin. WATER RETENTION MECHANISM: GH/IGF-1-induced renal sodium/water retention + ghrelin-receptor-mediated fluid retention. Water retention is the #1 reason users cycle off.',
    benefits: [
      '[Verified — High] IGF-1 elevation — 12-month sustained: Nass R et al. Ann Intern Med. 2008;149(9):601-611 — 25 mg daily, elderly subjects. IGF-1 1.5-2x baseline, sustained throughout without tachyphylaxis. Primary pivotal clinical evidence.',
      '[Verified — High] Fat-free mass gain in elderly: Nass 2008 — approximately 3 kg fat-free mass increase over 12 months in elderly subjects. Meaningful for older adults; not transformative for healthy younger users.',
      '[Verified — Moderate] Bone turnover markers: Murphy MG et al. J Bone Miner Res. 1999;14(7):1182-1188 — oral MK-677 increased markers of bone turnover in healthy and functionally impaired elderly adults.',
      '[Verified — Moderate] Oral bioavailability — unique advantage: only oral GH secretagogue. Survives GI digestion. No injection, no reconstitution. Verified pharmacologic property driving real-world use.',
      '[Verified — Low] No meaningful pituitary suppression at 12 months: Nass 2008 data. IGF-1 returns to baseline within 2-4 weeks of stopping.',
      '[Speculation] Sleep quality improvement: commonly reported; pre-bed dosing aligns with slow-wave-sleep GH window. No dedicated sleep RCT.',
      '[Speculation] Body composition (younger healthy users): sustained IGF-1 elevation supports lean-mass accrual. Expectations should be calibrated vs the elderly population in Nass 2008.',
    ],
    dosing: {
      typical: '15-25 mg once daily orally',
      range: '10 mg/day (conservative starter) to 25 mg/day (validated trial dose). 50 mg: diminishing IGF-1 returns, larger side effects.',
      frequency: 'Once daily. Biological effect lasts ~24 hours.',
      route: ['oral capsule'],
      protocols: {
        conservativeStarter: '10 mg once daily x 2-4 weeks to assess water retention and appetite',
        standardCommunity: '15-25 mg once daily',
        clinicalTrialDose: '25 mg once daily — Nass 2008 12-month validated dose',
        aggressive: '50 mg — not recommended; side effects rise sharply, IGF-1 response diminishing returns',
      },
      timing: 'PRE-BED (most common): aligns largest GH pulse with natural slow-wave-sleep window; may improve sleep quality; some report morning grogginess. MORNING: avoids appetite-stimulating effect interfering with bedtime fasting; better for users prone to MK-677 insomnia. Fasted-state requirement less strict than injectable GH peptides (24-hour biological effect blunts impact of any single postprandial insulin pulse).',
      cycle: 'Standard: 8-16 weeks on, 4-8 weeks off. Conservative: 8 weeks on, 4 weeks off. Continuous use: some users; quarterly lab monitoring essential due to glycemic and cardiac concerns. Off-period minimum: 4 weeks — allows water retention and glucose changes to normalize. GHS-R1a does not exhibit rapid tachyphylaxis seen with Hexarelin; cycle rationale is side-effect management (water, glucose) not receptor desensitization.',
      notes: 'LAB MONITORING: IGF-1 (baseline, 6 weeks, every 3 months); fasting glucose and HbA1c (baseline, 3 months); blood pressure (baseline, monthly); body weight (weekly during titration); comprehensive metabolic panel (baseline and 3 months). WATER RETENTION MANAGEMENT: reduce dietary sodium; lower dose to 10-15 mg if significant edema; cycle more aggressively. Persistent severe edema: discontinue. IGF-1 AND CANCER: Epidemiologic studies (Pollak M, Nat Rev Cancer, 2008) link sustained high-normal IGF-1 to modestly increased risk of colon, prostate, breast cancers. MK-677 elevates IGF-1 1.5-2x. Anyone with active malignancy or strong family history of hormone-sensitive cancers: do not use without specialist consultation. COMPARISON TO CJC + IPAMORELIN: MK-677 — oral, convenient, more water retention, more glucose-tolerance impact, less pulsatile signaling. CJC + Ipa — injection required, cleaner pulses, less water retention, more flexible to titrate. Similar IGF-1 elevations at standard doses. AVOID STACKING WITH: IGF-1 LR3 (cumulative IGF-1 risk); high-dose CJC + Ipa (redundant goals, additive side effects); other ghrelin agonists (GHRP-2, GHRP-6 — receptor competition).',
      cost2026: 'Compounded MK-677 capsules (telehealth): $40-90/month. Research-chemical liquid (gray market — not recommended): $25-60. Telehealth Rx + lab panel: +$75-200.',
    },
    sideEffects: '[Verified — High] Increased appetite: very common — ghrelin\'s most reliable orexigenic effect. Plan caloric intake deliberately. [Verified — High] Water retention/edema: common — onset 1-3 weeks; mild-moderate (puffy face, mild ankle swelling, 2-5 lb scale increase). [Verified — High] Lethargy/morning grogginess: common — particularly with pre-bed dosing. Switch to morning dosing if problematic. [Verified — High] Vivid dreams: common — GH/sleep architecture effect. [Verified — High] Increased fasting glucose and HbA1c: reliable — Nass 2008 documented HbA1c +0.3% at 25 mg/day over 12 months. Monitor labs. [Verified — Moderate] Numbness/paresthesias (carpal tunnel-like): possible at higher doses or longer cycles; IGF-1-mediated. Reduce dose if persistent. [Verified — Moderate] Modest ACTH/prolactin elevation: documented but usually subclinical; much less than GHRP-6 or Hexarelin. [Verified — Moderate] Mild blood pressure increase: possible; monitor particularly in older users. [Verified — High — CRITICAL SAFETY SIGNAL] CHF/cardiac concerns in elderly: Adunsky A et al. Arch Gerontol Geriatr. 2011;53(2):183-189 — clinical trial in elderly hip-fracture patients HALTED IN 2007 due to imbalance in CHF events in MK-677 arm. Mechanism: fluid retention + cardiac stress of supraphysiologic IGF-1 in patients with compromised cardiac reserve. Does NOT appear to extrapolate to healthy younger users but IS a meaningful contraindication in cardiovascular disease. CONTRAINDICATIONS: Cardiovascular disease (CHF, significant coronary disease); active malignancy; active diabetes or poorly controlled blood glucose; strong family history of hormone-sensitive cancers; competitive athletes (WADA banned). Avoid in patients >65 without specific clinical justification and monitoring.',
    keyReferences: [
      'Nass R, Pezzoli SS et al. Effects of an oral ghrelin mimetic on body composition and clinical outcomes in healthy older adults. Ann Intern Med. 2008;149(9):601-611. PMID 18981485. [Primary 12-month RCT — pivotal efficacy and safety reference]',
      'Adunsky A, Chandler J et al. MK-0677 (ibutamoren mesylate) for patients recovering from hip fracture: multicenter, randomized, placebo-controlled phase IIb study. Arch Gerontol Geriatr. 2011;53(2):183-189. PMID 20950876. [Halted hip-fracture trial — cardiac safety signal]',
      'Patchett AA et al. Design and biological activities of L-163,191 (MK-0677): a potent, orally active growth hormone secretagogue. Proc Natl Acad Sci USA. 1995;92(15):7001-7005. PMID 7624363. [Original characterization]',
      'Murphy MG, Bach MA et al. Oral administration of MK-677 increases markers of bone turnover in healthy and functionally impaired elderly adults. J Bone Miner Res. 1999;14(7):1182-1188. PMID 10404021.',
      'Sevigny JJ, Ryan JM et al. Growth hormone secretagogue MK-677: no clinical effect on AD progression in randomized trial. Neurology. 2008;71(21):1702-1708. PMID 19015484.',
      'Smith RG, Van der Ploeg LH et al. Peptidomimetic regulation of growth hormone secretion. Endocr Rev. 1997;18(5):621-645. PMID 9331545.',
      'WADA. Prohibited List 2026, Section S2 (peptide hormones, growth factors).',
      'Lemke R. MK-677 (Ibutamoren): The Oral GH Secretagogue Guide. The Peptide Toolkit. April 27, 2026. [Speculation — educational guide]',
    ],
  },

  {
    id: 'dihexa',
    name: 'Dihexa',
    fullName: 'Dihexa (PNB-0408)',
    categoryTag: 'neuro',
    category: 'Neuropeptide / Cognitive',
    icon: '🧩',
    tagline: 'Oral HGF/c-Met agonist reported 7 orders of magnitude more potent than BDNF',
    regulatoryStatus: 'Research peptide not FDA-approved. Available as oral capsule or topical cream via compounding.',
    researchLevel: 'emerging',
    isResearchOnly: true,
    summary: 'Oral oligopeptide variant derived from angiotensin IV. Blood-brain barrier permeable. Binds with extremely high affinity (Kd=65 pM) to hepatocyte growth factor (HGF), potentiating its activity at the c-Met receptor. Laboratory studies report Dihexa is seven orders of magnitude more potent than BDNF in neurotrophic activity. Studies report benefits in Alzheimer disease, dementia, and spatial learning deficits. Also known as PNB-0408.',
    mechanism: 'Angiotensin IV variant with BBB permeability. HGF/c-Met receptor potentiation (Kd=65 pM). c-Met activation stimulates mitogenesis, motogenesis, and morphogenesis. Stem cell differentiation and neurogenesis support. Spinogenesis induction in hippocampal neurons. Reversal of scopolamine-dependent spatial learning deficits. Improved cerebral blood flow.',
    benefits: [
      'Cognitive support in Alzheimer disease and dementia (animal data)',
      'Improved focus and mental performance',
      'Neuroprotective: reverses scopolamine-induced spatial learning deficits in animal models',
      'Improved cerebral blood flow',
      'Spinogenesis induction in hippocampal neurons',
    ],
    dosing: {
      typical: '10-40 mg orally daily',
      range: '10-40 mg/day oral; 0.5-1.0 ml/day topical',
      frequency: 'Once daily',
      route: ['Oral capsule (10 mg or 20 mg)', 'Topical cream (20 mg/ml)'],
      cycle: 'Typical 4-12 weeks; cycling protocols vary',
      notes: 'Oral: 10-40 mg daily. Topical: apply 0.5-1.0 ml (2-4 clicks) to inner forearms once daily, rub in until absorbed. Most common side effects: nervousness and irritability. Reported safe in recommended dosages per LaValle 2022.',
    },
    sideEffects: 'Reported safe in recommended dosages. Most common: nervousness and irritability. Limited long-term human safety data. Seven orders of magnitude more potent than BDNF in neurotrophic assay per laboratory studies.',
    stacks: ['Dihexa + Semax (dual BDNF and HGF/c-Met neuroprotection)', 'Dihexa + BPC-157 (neuroprotection and nerve repair)'],
    humanEvidence: 'Primarily animal and in vitro data. Limited human clinical data. Neurotrophic potency seven orders of magnitude greater than BDNF reported (McCoy et al). Human studies ongoing.',
    pkHalfLife: 'Not well established; oral bioavailability suggested by BBB penetration data',
    bioavailability: 'Oral: crosses BBB; topical: transdermal penetration documented',
    researchSources: 'McCoy MK et al, PNAS 2013;110:4919; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'dsip',
    name: 'DSIP',
    fullName: 'Delta Sleep-Inducing Peptide (DSIP)',
    categoryTag: 'neuro',
    category: 'Sleep / Neuropeptide',
    icon: '🌙',
    tagline: 'Endogenous hypothalamic nonapeptide promoting deep sleep without sedation or tolerance',
    regulatoryStatus: 'Research peptide not FDA-approved. Available via 503A compounding pharmacy.',
    researchLevel: 'moderate',
    isResearchOnly: true,
    summary: 'DSIP is a nonapeptide (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu, MW 848.34) isolated from rabbit cerebral venous blood in 1977. Synthesized primarily in the hypothalamus. Promotes delta (slow-wave) sleep demonstrated in rabbits, mice, rats, cats, and human beings. Does NOT induce classical pharmacological sedation. Does NOT induce tolerance with repeated administration. Diurnal variation correlates with sleep stage architecture.',
    mechanism: 'Promotes delta (slow-wave) and spindle EEG activity. Reduces motor activity during sleep. Synthesized in hypothalamus and targets multiple brainstem sites. No classic GABAergic sedation mechanism. May stimulate LH and testosterone.',
    benefits: [
      'Promotes deep slow-wave (delta) sleep without classical sedation',
      'No tolerance induction with repeated administration',
      'Neuroprotective effects',
      'Alcohol and drug detoxification and withdrawal support',
      'No rebound insomnia upon discontinuation',
    ],
    dosing: {
      typical: '100 mcg SC daily',
      range: '100-200 mcg/day',
      frequency: 'Once daily; bedtime not required',
      route: ['Subcutaneous injection'],
      cycle: 'Short courses of 2-4 weeks; can use as needed',
      notes: 'Use at bedtime is not required per LaValle handbook. May stimulate LH/testosterone -- adjust TRT monitoring. Does not induce tolerance. Reported safe in recommended dosages.',
    },
    sideEffects: 'Minimal side effects. Transient headache, nausea/vomiting, vertigo possible. Injection site reactions. Rare: erythema, transient muscle atrophy, polyarthralgia with hand edema. Safety in pediatrics and pregnancy not established.',
    stacks: ['DSIP + Epithalon (sleep and circadian rhythm optimization)', 'DSIP + Selank (sleep plus anxiety -- neuro recovery stack)'],
    humanEvidence: 'Demonstrated sleep promotion in human subjects (Monnier 1977, Graf 1984). No large RCTs completed.',
    pkHalfLife: 'Short; exact half-life not well established',
    bioavailability: 'SC: high; CNS penetration documented',
    researchSources: 'Monnier M et al, Experientia 1977;33:548; Graf MV et al, Eur J Pharmacol 1984;99:39; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'fox04dri',
    name: 'FOXO4-DRI',
    fullName: 'FOXO4-D-Retro-Inverso (FOXO4-DRI)',
    categoryTag: 'longevity',
    category: 'Senolytic / Anti-Aging',
    icon: '🧬',
    tagline: 'Senolytic D-retro-inverso peptide selectively clearing SASP-secreting senescent cells',
    regulatoryStatus: 'Research peptide not FDA-approved. Available via compounding. CRITICAL: Purchase TFA salt-free formulation only.',
    researchLevel: 'emerging',
    isResearchOnly: true,
    summary: 'FOXO4-DRI is a cell-penetrating senolytic peptide (MW 5358.05). Senescent cells accumulate in aging tissues and secrete SASP factors including IL-6, IL-1beta, IL-8, IL-10, and TNF-alpha. FOXO4-DRI selectively induces apoptosis in senescent cells by disrupting the FOXO4-p53 interaction that protects senescent cells from programmed cell death. Animal studies show reversal of aging effects. CRITICAL: Must be TFA salt-free -- trifluoroacetic acid contamination interferes with cellular assays and modulates the glycine receptor causing CNS effects.',
    mechanism: 'Cell-penetrating D-amino acid retro-inverso peptide targeting the FOXO4-p53 interaction in senescent cells. Disrupts FOXO4-p53 complex, releasing p53 to drive apoptosis selectively in senescent cells. D-amino acid composition resists proteolysis. Selective clearance of SASP-secreting senescent cells reduces pro-inflammatory cytokines. Male reproductive and renal protective effects via senescent cell removal.',
    benefits: [
      'Selective apoptosis induction in senescent cells (animal data)',
      'SASP suppression: IL-6, IL-1beta, IL-8, IL-10, TNF-alpha',
      'Reversal of aging-related changes in animal models',
      'Male late-onset hypogonadism support via testicular senescent cell clearance',
      'Counteracts chemotherapy-induced hepatocellular senescence',
      'Renal protection via senescent cell removal',
    ],
    dosing: {
      typical: '4 mg SC every 3 days for 4-6 weeks',
      range: '4 mg per dose',
      frequency: 'Every 3 days (not daily)',
      route: ['Subcutaneous injection (10 mg/ml)'],
      cycle: '4-6 weeks; may repeat 1-3 times per year',
      notes: 'CRITICAL: Purchase TFA salt-free only. Stack with MOTS-c or Humanin to improve senescent cell identification and elimination. Physician supervision required.',
    },
    sideEffects: 'Reported safe and efficacious in recommended dosages. Injection site redness and pain. TFA contamination concern: use TFA-free product only to avoid cellular assay interference and GlyR-mediated CNS effects.',
    stacks: ['FOXO4-DRI + MOTS-c (enhanced senescent cell identification and elimination)', 'FOXO4-DRI + Epithalon (comprehensive longevity protocol)'],
    humanEvidence: 'Primarily animal and in vitro data. Xu M et al (Nature Medicine 2018) seminal senolytic animal study. No completed human RCTs.',
    pkHalfLife: 'Not established; D-amino acid composition resists proteolysis',
    bioavailability: 'SC: high; cell-penetrating peptide',
    researchSources: 'Xu M et al, Nat Med 2018;24:1246; Baker DJ et al, Nature 2016;530:184; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'll37',
    name: 'LL-37',
    fullName: 'LL-37 (Human Cathelicidin Antimicrobial Peptide)',
    categoryTag: 'immune',
    category: 'Antimicrobial / Immune',
    icon: '🛡️',
    tagline: 'Only human cathelicidin -- broad-spectrum antimicrobial activated by vitamin D',
    regulatoryStatus: 'Research peptide not FDA-approved. Available via 503A compounding pharmacy.',
    researchLevel: 'moderate',
    isResearchOnly: true,
    summary: 'LL-37 is the only known human cathelicidin antimicrobial peptide (MW 4493.33 g/mol). Active against gram (+) and gram (-) bacteria including MRSA, viruses including HIV, fungi including Candida, and mold/biotoxins (CIRS). CRITICAL: LL-37 is activated by vitamin D -- assess and optimize 25-OH vitamin D to above 50 ng/ml before and during use. Dual-edged in cancer: may be tumorigenic in some cancers. Widely used in CIRS/biotoxin illness and chronic wound healing.',
    mechanism: 'Cathelicidin antimicrobial peptide disrupting bacterial cell membranes via electrostatic interaction and pore formation. Antiviral via direct virion membrane disruption. Antifungal against Candida via membrane disruption. Vitamin D required for LL-37 gene expression (CAMP gene). Immune modulation: stimulates type 1 IFN, activates innate immune cells. Wound healing via keratinocyte migration and VEGF upregulation.',
    benefits: [
      'Broad-spectrum antimicrobial: gram (+) and gram (-) including MRSA',
      'Antiviral activity including HIV',
      'Antifungal: effective vs Candida',
      'Mold and biotoxin illness (CIRS) support',
      'Chronic wound healing: venous leg ulcers, polymicrobial infected wounds',
      'GI inflammatory conditions (IBDs)',
      'Pulmonary support: COPD, RSV',
    ],
    dosing: {
      typical: '200 mcg SC daily for 6-8 weeks',
      range: '100-400 mcg/day SC; topical cubosome gel 2-3x/week for wound care',
      frequency: 'Once daily SC; topical 2-3x weekly',
      route: ['Subcutaneous injection (2,000 mcg/ml 5 ml vial)', 'Topical cubosome gel (wound care)'],
      cycle: '6-8 weeks SC; longer therapy possible',
      notes: 'Activate with vitamin D: test 25-OH vitamin D; if below 50 ng/ml, recommend 5,000 IU vitamin D3 daily. Caution in cancer: dual tumorigenic/anti-cancer effects depending on tumor biology.',
    },
    sideEffects: 'Reported safe in recommended dosages. Injection site redness, pain, and effusion. Topical: local redness and irritation. CAUTION in cancer: dual tumorigenic/anti-cancer effects depending on tumor biology. May propagate inflammatory signals in autoimmune conditions.',
    stacks: ['LL-37 + BPC-157 (wound healing and GI repair)', 'LL-37 + Thymosin Alpha-1 (comprehensive immune support)', 'LL-37 + Vitamin D3 5,000 IU (required cofactor for CAMP gene expression)'],
    humanEvidence: 'Human studies for wound healing, CIRS/biotoxin illness, COPD. Cubosome topical gel chronic wound healing studies. Limited large SC injection RCTs.',
    pkHalfLife: 'Short; sustained activity via immune stimulation cascade',
    bioavailability: 'SC: high; topical cubosome delivery enhances penetration',
    researchSources: 'Zasloff M, Nature 2002;415:389; Shoemaker RC et al, Neurotoxicol Teratol 2013; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'larazotide',
    name: 'Larazotide',
    fullName: 'Larazotide Acetate (AT-1001)',
    categoryTag: 'gut',
    category: 'GI / Tight Junction Regulator',
    icon: '🌿',
    tagline: 'Zonulin-receptor antagonist closing tight junctions and healing leaky gut',
    regulatoryStatus: 'Investigational -- Phase 3 RCT with placebo-comparable safety. Not FDA-approved. Available via 503A compounding.',
    researchLevel: 'high',
    isResearchOnly: false,
    summary: 'Larazotide acetate (AT-1001) is a synthetic 8-amino-acid zonulin-receptor antagonist (H-Gly-Gly-Val-Leu-Val-Gln-Pro-Gly-OH, MW 725.8). Zonulin overactivation by gluten, pathogens, or dysbiosis drives leaky gut syndrome. Larazotide directly blocks this mechanism. Phase 3 human RCT (multicenter, randomized, double-blind, placebo-controlled by 9 Meters Biopharma) confirmed safety comparable to placebo. Used for leaky gut, celiac disease, IBS, Crohn disease, and ulcerative colitis.',
    mechanism: 'Zonulin-receptor antagonism at intestinal epithelial tight junctions. Blocks zonulin-mediated tight junction opening. Decreases intestinal permeability. Improves tight junction protein expression (occludin, claudin, ZO-1). Reduces immune activation from luminal antigen translocation. Oral route with local GI action and low systemic absorption.',
    benefits: [
      'Decreases intestinal permeability (leaky gut syndrome)',
      'Improves tight junction regulation and integrity',
      'Celiac disease: reduces persistent symptoms despite gluten-free diet (Phase 3 RCT)',
      'IBS symptom reduction',
      'Crohn disease and ulcerative colitis support',
      'Reduces immune activation driven by gut permeability',
      'Safety comparable to placebo in Phase 3 RCT',
    ],
    dosing: {
      typical: '500 mcg oral three times daily (TID)',
      range: '500 mcg TID -- 1,500 mcg/day total',
      frequency: 'Three times daily oral',
      route: ['Oral capsule'],
      cycle: '4-12 weeks depending on indication; longer for chronic GI conditions',
      notes: 'Oral route only -- acts locally in GI tract with low systemic absorption. Phase 3 RCT conducted by 9 Meters Biopharma for celiac disease persistent symptoms.',
    },
    sideEffects: 'Safety comparable to placebo in Phase 3 human RCT. No significant adverse events at therapeutic doses in all completed studies.',
    stacks: ['Larazotide + KPV (tight junction repair + anti-inflammatory)', 'Larazotide + BPC-157 (comprehensive gut healing)', 'Larazotide + KPV + BPC-157 (triple gut protocol for severe IBD or leaky gut)'],
    humanEvidence: 'Phase 3 RCT by 9 Meters Biopharma -- multicenter randomized double-blind placebo-controlled in celiac disease. Phase 2: Leffler DA et al (Am J Gastroenterol 2012). Kelly CP et al (Gastroenterology 2013).',
    pkHalfLife: 'Short; acts locally in GI tract',
    bioavailability: 'Oral: primarily local GI action; low systemic absorption',
    researchSources: 'Leffler DA et al, Am J Gastroenterol 2012;107:1554; Kelly CP et al, Gastroenterology 2013;145:669; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'melanotan2',
    name: 'Melanotan II',
    fullName: 'Melanotan II (MT-II)',
    categoryTag: 'sexual',
    category: 'MSH / Tanning / Metabolic',
    icon: '☀️',
    tagline: 'alpha-MSH analogue for tanning, libido, and metabolic support via MC receptors',
    regulatoryStatus: 'Research peptide not FDA-approved. Off-label via compounding. CONTRAINDICATED in personal or family history of melanoma or non-melanoma skin cancer.',
    researchLevel: 'moderate',
    isResearchOnly: true,
    summary: 'Melanotan II (MT-II) is a cyclic alpha-MSH analogue (MW 1024.18) activating MC1R, MC3R, MC4R, and MC5R. Multi-indication: tanning/photoprotection (MC1R), metabolic support including lipolysis and appetite control (MC3R/MC4R), immune modulation (MC3R), and libido/sexual function (MC4R -- same pathway as PT-141). CRITICAL: Contraindicated in personal or family history of melanoma or non-melanoma skin cancer -- melanocytic lesion changes reported.',
    mechanism: 'MC1R agonism: melanocyte stimulation, increased eumelanin, photoprotection. MC3R: anti-inflammatory, metabolic regulation. MC4R: central appetite suppression, lipolysis, sexual arousal. MC5R: immune modulation. Decreases oxidative stress. Cardiovascular and neuroprotective effects.',
    benefits: [
      'Tanning via melanin upregulation (MC1R) without UV exposure',
      'Photoprotection: erythropoietic protoporphyria',
      'Metabolic: lipolytic, appetite control, anti-inflammatory, oxidative stress reduction',
      'Libido and sexual arousal via MC4R (central mechanism)',
      'Immune modulation and autoimmune support',
      'Cardiovascular and neuroprotective effects',
    ],
    dosing: {
      typical: 'Tanning: 300 mcg SC daily 1-2 weeks, then 500 mcg SC 2x/week maintenance. Metabolic: 50 mcg SC daily. Immune: 200 mcg SC daily 6-8 weeks.',
      range: '50-500 mcg per dose depending on indication',
      frequency: 'Tanning: daily loading then 2x/week maintenance. Metabolic/immune: daily.',
      route: ['Subcutaneous injection (2 mg/ml 5 ml vial)'],
      cycle: 'Tanning: loading 1-2 weeks then maintenance. Immune: 6-8 weeks.',
      notes: 'CRITICAL: Contraindicated in personal or family history of melanoma or non-melanoma skin cancer. Libido effects occur as a side effect at any dose. Nausea common at start -- begin lower dose. Avoid concurrent tanning bed use. Monitor for new or changing moles.',
    },
    sideEffects: 'Nausea, vomiting, yawning, spontaneous erections in men (approximately 2 hours onset). Injection site reactions. SERIOUS: Changes in melanocytic lesions reported. CONTRAINDICATED in melanoma/skin cancer history.',
    stacks: ['Melanotan II + PT-141 (enhanced central sexual arousal)', 'Melanotan II + BPC-157 (metabolic and anti-inflammatory synergy)'],
    humanEvidence: 'Human studies for tanning and sexual function. Clinical data for erythropoietic protoporphyria. Limited large RCTs. Widely used clinically off-label.',
    pkHalfLife: 'Approximately 30 minutes',
    bioavailability: 'SC: high',
    researchSources: 'Hadley ME et al, Ann N Y Acad Sci 2003;994:96; Dorr RT et al, J Invest Dermatol 2004;122:1; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'mgf',
    name: 'MGF',
    fullName: 'Mechano-Growth Factor (MGF / PEG-MGF)',
    categoryTag: 'healing',
    category: 'Muscle / IGF-1 Isoform',
    icon: '💪',
    tagline: 'IGF-1 splice variant released by mechanical stress for muscle repair and hypertrophy',
    regulatoryStatus: 'Research peptide not FDA-approved. WADA Prohibited List. Available via compounding.',
    researchLevel: 'moderate',
    isResearchOnly: true,
    summary: 'Mechano-Growth Factor (MGF) is a splice variant of IGF-1 (IGF-1Ec) released in muscle tissue in response to mechanical stress (MW 2868.19). Two forms: native MGF (half-life 5-7 minutes) and PEG-MGF (half-life 48-72 hours). WADA Prohibited. Do not use more than 10 consecutive days. Works synergistically alternated with IGF-1 LR3 -- MGF proliferates satellite cells; IGF-1 LR3 drives differentiation.',
    mechanism: 'IGF-1 splice variant (IGF-1Ec) with unique N-terminal extension providing distinct receptor engagement from mature IGF-1. Released in response to mechanical stress in muscle. Activates satellite cells for muscle repair and hypertrophy. Autocrine/paracrine local anabolic signaling. Bone repair via osteoclast stress response. Cardiac cardiomyocyte protection. Neuroprotection via IGF-1 pathway.',
    benefits: [
      'Muscle repair and hypertrophy post-exercise or injury',
      'Anabolic enhancement via IGF-1Ec splice variant mechanism',
      'Soft tissue repair: tendon, ligament, cartilage, muscle',
      'Bone repair and growth',
      'Cardiac support',
      'Neuroprotection via IGF-1 pathway',
    ],
    dosing: {
      typical: 'MGF: 600 mcg SC post-workout divided across muscle groups (100 mcg/group). PEG-MGF: 600 mcg SC 3-4 days/week.',
      range: 'Stay below 2 mg total per week',
      frequency: 'MGF: post-workout 5/7 days; PEG-MGF: 3-4 days/week',
      route: ['Subcutaneous injection'],
      cycle: 'No more than 10 consecutive days. Alternate with IGF-1 LR3 (100 mcg 3x/week) for combined proliferation and differentiation.',
      notes: 'WADA prohibited. MGF half-life = 5-7 minutes; PEG-MGF half-life = 48-72 hours. Stay below 2 mg total/week. Do not exceed 10 consecutive days.',
    },
    sideEffects: 'Generally well-tolerated. Injection site reactions. Anabolic effects may cause water retention. WADA prohibited. Limited long-term human safety data.',
    stacks: ['MGF + IGF-1 LR3 (alternating: MGF proliferates, IGF-1 LR3 differentiates satellite cells)', 'MGF + BPC-157 (tissue repair and healing)', 'MGF + CJC-1295/Ipamorelin (GH axis plus local muscle signaling)'],
    humanEvidence: 'Primarily animal and in vitro data. Muscle repair, cardiac, and neuroprotective data in animal studies. Clinical use based on mechanism and animal evidence.',
    pkHalfLife: 'MGF: 5-7 minutes; PEG-MGF: 48-72 hours',
    bioavailability: 'SC: high; local tissue activity via autocrine/paracrine signaling',
    researchSources: 'Goldspink G et al, J Anat 2002;201:251; Matheny RW et al, Growth Horm IGF Res 2010;20:183; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'pnc27',
    name: 'PNC-27',
    fullName: 'PNC-27 (Anti-Cancer Peptide)',
    categoryTag: 'longevity',
    category: 'Investigational / Anti-Cancer',
    icon: '🔬',
    tagline: 'p53 MDM-2 domain peptide selectively inducing necrosis in HDM-2-overexpressing cancer cells',
    regulatoryStatus: 'Investigational research peptide not FDA-approved. Available via compounding at gram-scale doses. Physician supervision required.',
    researchLevel: 'emerging',
    isResearchOnly: true,
    summary: 'PNC-27 is an anti-cancer peptide (MW 4031.7 g/mol) based on the MDM-2-binding domain of p53. Selectively inserts into membranes of cancer cells overexpressing HDM-2 (human MDM-2 homolog), forming pores leading to selective cancer cell necrosis without affecting normal cells. Research shows activity against multiple cancer types in vitro and animal models. Strictly investigational -- no completed Phase 3 human trials. Dosing is in grams unlike all other peptides.',
    mechanism: 'MDM-2 binding domain of p53 derived peptide. Selectively targets cancer cells overexpressing HDM-2. Inserts into HDM-2-expressing cancer cell membranes forming transmembrane pores leading to selective cancer cell necrosis. Does not affect normal cells lacking HDM-2 overexpression.',
    benefits: [
      'Selective cancer cell necrosis via HDM-2 targeting (in vitro and animal data)',
      'No effect on normal cells lacking HDM-2 overexpression',
      'Broad cancer type activity across multiple cell lines in vitro',
    ],
    dosing: {
      typical: '1,000-2,000 mg SC three times daily for 6 weeks',
      range: '1,000-2,000 mg per dose (in milligrams)',
      frequency: 'Three times daily SC',
      route: ['Subcutaneous injection (5,000 mg/ml 5 ml vial)'],
      cycle: '6 weeks standard; 12-24 weeks for metastatic carcinoma',
      notes: 'INVESTIGATIONAL ONLY -- physician supervision required. Dose is in MILLIGRAMS not micrograms. 0.2-0.4 ml per dose. Metastatic: same dose 12-24 weeks.',
    },
    sideEffects: 'Reported safe in recommended dosages per LaValle handbook. Injection site reactions most common. Limited human safety data. No completed Phase 3 trials.',
    stacks: ['PNC-27 as monotherapy -- physician supervision required'],
    humanEvidence: 'In vitro and animal data only. No completed human RCTs. Strictly investigational.',
    pkHalfLife: 'Not well established',
    bioavailability: 'SC: not well characterized at gram-scale doses',
    researchSources: 'Kanovsky M et al, Proc Natl Acad Sci 2001;98:12438; Lau YT et al, Cancer Biol Ther 2008; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'thymulin',
    name: 'Thymulin',
    fullName: 'Thymulin (Facteur Thymique Serique / Nonathymulin)',
    categoryTag: 'immune',
    category: 'Immune / Zinc-Dependent Thymic Hormone',
    icon: '🛡️',
    tagline: 'Zinc-dependent nonapeptide thymic hormone for immune support and neuroinflammation',
    regulatoryStatus: 'Research peptide not FDA-approved. Available via 503A compounding pharmacy.',
    researchLevel: 'moderate',
    isResearchOnly: true,
    summary: 'Thymulin (Thymalin or Nonathymulin) is a nonapeptide thymic hormone (H-Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn-OH, MW 3051.3) produced by thymic epithelial cells. CRITICAL: Thymulin is zinc-dependent -- immunologically active ONLY in the presence of zinc. Assess RBC zinc status before use. Used for immune support, anti-inflammatory effects, neuroinflammation, and analgesic applications. NOT the same as Thymosin Alpha-1 -- entirely distinct peptide, mechanism, and clinical profile.',
    mechanism: 'Zinc-dependent thymic nonapeptide hormone requiring zinc for biological activity -- inactive without adequate zinc. Stimulates T-cell maturation and differentiation. Anti-inflammatory via cytokine modulation. Neuroinflammation suppression. Analgesic properties via neuroimmune modulation. Distinct from Thymosin Alpha-1 in structure and mechanism.',
    benefits: [
      'Immune support in conditions requiring enhanced immunity',
      'Anti-inflammatory including neuroinflammation reduction',
      'Analgesic properties via neuroimmune modulation',
      'T-cell maturation and differentiation support',
      'Thymic function support for age-related thymic involution',
    ],
    dosing: {
      typical: '1 mg SC daily for 2 weeks, then 1 mg SC three times weekly for 4 months',
      range: '1-5 mg/day; 5 mg SC in acute needs',
      frequency: 'Daily loading (2 weeks), then 3x/week maintenance (4 months)',
      route: ['Subcutaneous injection'],
      cycle: '2-week loading then 4-month maintenance',
      notes: 'CRITICAL: Assess RBC zinc status before use. Thymulin requires zinc for activity -- supplement if deficient. Half-life 30-60 minutes. Do NOT confuse with Thymosin Alpha-1.',
    },
    sideEffects: 'Reported safe in recommended dosages. Injection site reactions. Zinc deficiency renders thymulin inactive. Limited long-term human safety data.',
    stacks: ['Thymulin + Zinc supplementation (required cofactor)', 'Thymulin + Thymosin Alpha-1 (complementary immune support -- different mechanisms)', 'Thymulin + BPC-157 (immune and repair protocol)'],
    humanEvidence: 'Multiple European clinical studies. Dardenne M et al extensive thymulin biology research. Used clinically in Europe for immune deficiency conditions for decades.',
    pkHalfLife: '30-60 minutes',
    bioavailability: 'SC: high',
    researchSources: 'Dardenne M et al, Proc Natl Acad Sci 1982;79:5370; Bach JF and Dardenne M, Med Oncol Tumor Pharmacother 1989;6:25; LaValle J et al, Peptide Handbook IPS 2022',
  },

  {
    id: 'vip',
    name: 'VIP',
    fullName: 'Vasoactive Intestinal Peptide (VIP / Aviptadil)',
    categoryTag: 'neuro',
    category: 'GUT/BRAIN Axis Neuropeptide',
    icon: '🧠',
    tagline: 'GUT/BRAIN axis neuropeptide for CIRS, Long COVID, autoimmunity, and pulmonary hypertension',
    regulatoryStatus: 'Aviptadil has FDA-approved IV form for pulmonary arterial hypertension. Intranasal compounded form used off-label for CIRS, Long COVID, and neuroimmune conditions.',
    researchLevel: 'moderate',
    isResearchOnly: false,
    summary: 'Vasoactive Intestinal Peptide (VIP, Aviptadil, PHM27) is a 28-amino-acid regulatory neuropeptide (MW 3325.8, secretin/glucagon hormone superfamily). Produced primarily by neural tissue, the GUT, and pancreas. Acts via VPAC1 and VPAC2 G-protein-coupled receptors. Master regulator of the GUT/BRAIN axis with anti-inflammatory, vasodilatory, immune-modulating, circadian, and neuroprotective effects. Primary clinical uses: CIRS/biotoxin illness (Shoemaker RC protocol), Long COVID neuroinflammation, autoimmunity, and pulmonary hypertension.',
    mechanism: 'VPAC1 and VPAC2 G-protein-coupled receptor agonism raising cAMP. Blocks peripheral innate immune activation. Raises VEGF. Restores circadian rhythm via SCN. Regulates dendritic cells and Th17 in autoimmunity. Enhances IL-10. Raises CD4+CD25+ T regulatory (Treg) cells. Inhibits TGF-beta-1 by macrophages. Improves intestinal barrier. Vasodilatory: lowers pulmonary artery systolic pressure.',
    benefits: [
      'CIRS and biotoxin illness: corrects inflammatory markers (Shoemaker protocol)',
      'Long COVID neuroinflammation support',
      'Autoimmune modulation via Treg enhancement and Th17 regulation',
      'Improves intestinal barrier function',
      'CNS protection and circadian rhythm restoration',
      'Pulmonary hypertension: lowers PASP (Aviptadil, FDA-approved IV)',
      'Anti-inflammatory: blocks innate immune activation, raises IL-10',
    ],
    dosing: {
      typical: '50 mcg intranasal, start 1 spray alternating nostrils, build to 8 sprays per day',
      range: '50-400 mcg/day intranasal',
      frequency: 'Start 1 spray/day; titrate upward to 8 sprays/day; refrigerate always',
      route: ['Intranasal (50 mcg/0.1 ml, 12 ml vial)', 'Intravenous (Aviptadil -- FDA-approved for PAH, physician supervised)'],
      cycle: 'CIRS: 6+ months under physician supervision. MUST refrigerate -- cold chain essential.',
      notes: 'MUST refrigerate. Start 1 spray (50 mcg) alternating nostrils; titrate slowly to 8 sprays/day per published Shoemaker CIRS protocol. Do NOT use until environmental biotoxin exposure is remediated -- VIP worsens inflammation if mold exposure continues. Test VIP levels before use in CIRS.',
    },
    sideEffects: 'Generally well-tolerated via intranasal route. CRITICAL: Do not use until environmental biotoxin exposure is remediated. Avoid in active fungal infections. Mild nasal irritation. IV Aviptadil: hypotension risk -- physician supervised only.',
    stacks: ['VIP + Larazotide (CIRS/leaky gut comprehensive protocol)', 'VIP + BPC-157 (gut-brain axis repair)', 'VIP + Thymosin Alpha-1 (neuroimmune and viral illness recovery)'],
    humanEvidence: 'Shoemaker RC et al -- published CIRS/biotoxin VIP intranasal protocol with human outcome data. Aviptadil IV Phase 3 COVID-19 ARDS trial. Sarcoidosis inflammatory marker correction with inhaled VIP.',
    pkHalfLife: 'Approximately 1-2 minutes IV; intranasal mucosal absorption extends CNS activity',
    bioavailability: 'Intranasal: moderate CNS penetration; IV: approximately 100%',
    researchSources: 'Shoemaker RC et al, Neurotoxicol Teratol 2013;35:51; Said SI and Mutt V, Science 1970;169:1217; LaValle J et al, Peptide Handbook IPS 2022',
  },

];

// ─── Helper: get peptide by ID ─────────────────────────────────────────────────
export const getPeptideById = (id) =>
  PEPTIDE_KNOWLEDGE_BASE.find(p => p.id === id);

// ─── Helper: get peptides by goal ─────────────────────────────────────────────
export const getPeptidesByGoal = (goalId) =>
  PEPTIDE_KNOWLEDGE_BASE.filter(p => p.goals.includes(goalId));

// ─── Helper: get peptides by category ─────────────────────────────────────────
export const getPeptidesByCategory = (cat) =>
  PEPTIDE_KNOWLEDGE_BASE.filter(p => p.categoryTag === cat);

// ─── Category color map (for UI) ──────────────────────────────────────────────
export const CATEGORY_COLORS = {
  healing:        { bg: '#0d3d2e', accent: '#10b981', label: 'Healing' },
  metabolic:      { bg: '#1a2a0d', accent: '#84cc16', label: 'Metabolic' },
  gh_axis:        { bg: '#0d1f3d', accent: '#3b82f6', label: 'GH Axis' },
  sexual:         { bg: '#3d0d2a', accent: '#ec4899', label: 'Sexual Health' },
  longevity:      { bg: '#2a0d3d', accent: '#a855f7', label: 'Longevity' },
  neuro:          { bg: '#1a0d3d', accent: '#6366f1', label: 'Neuropeptide' },
  neuroprotection:{ bg: '#1a0d3d', accent: '#6366f1', label: 'Neuroprotection' },
  immune:         { bg: '#0d2a3d', accent: '#0ea5e9', label: 'Immune' },
  mitochondrial:  { bg: '#3d2a0d', accent: '#f59e0b', label: 'Mitochondrial' },
  anti_aging:     { bg: '#3d1a0d', accent: '#f97316', label: 'Anti-Aging' },
  fertility:      { bg: '#0d3d1a', accent: '#22c55e', label: 'Fertility' },
  gut:            { bg: '#0d3d1a', accent: '#16a34a', label: 'GI Health' },
};

// Legacy alias so App.jsx import keeps working
export const OPTIMIZATION_GOALS = PEPTIDE_GOALS_DATA;

// Pre-built context string for the AI peptide prompt
export const PEPTIDE_CONTEXT = PEPTIDE_KNOWLEDGE_BASE.map(p => `
PEPTIDE: ${p.name} (${p.fullName})
Category: ${p.category}
Goals: ${p.goals.join(', ')}
Summary: ${p.summary}
Mechanism: ${p.mechanism}
Benefits: ${Array.isArray(p.benefits) ? p.benefits.join(' | ') : p.benefits}
Typical Dose: ${p.dosing?.typical || 'See dosing section'}
Cycle: ${p.dosing?.cycle || 'See dosing section'}
Side Effects: ${p.sideEffects}
Research Level: ${p.researchLevel}
`).join('\n---\n');

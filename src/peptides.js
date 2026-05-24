// src/peptides.js
// Peptide knowledge base — Vitae Bio Precision Aging
// Last updated: May 2026
// ─────────────────────────────────────────
// BPC-157        — 200+ preclinical + 3 human studies (May 2026)
// MOTS-c         — 12 peer-reviewed sources (May 2026)
// Tesamorelin    — 6 peer-reviewed sources incl. 3 RCTs (May 2026)
// CJC-1295       — 4 peer-reviewed sources (May 2026)
// HCG            — 4 peer-reviewed sources (May 2026)
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

  // ─── ARA-290 ─────────────────────────────────────────────────────────────────
  {
    id: 'ara290',
    name: 'ARA-290',
    fullName: 'ARA-290 (Cibinetide)',
    aliases: ['Cibinetide', 'ARA290'],
    category: 'Neuroprotection & Metabolic',
    categoryTag: 'neuroprotection',
    goals: ['neuroprotection', 'inflammation', 'metabolic_health', 'fatigue'],
    regulatoryStatus: 'Investigational. Not FDA-approved.',
    researchLevel: 'high',
    summary: 'A non-hematopoietic EPO analogue that selectively activates the tissue-protective receptor (βcR) without stimulating red blood cell production. Primarily studied for neuropathic pain and small fiber neuropathy.',
    mechanism: 'Binds tissue-protective receptor complex (EPOR/βcR heterodimer). Activates Akt/PI3K, JAK2, and STAT3 pathways. Reduces systemic inflammation via NF-κB and TNF-α suppression.',
    benefits: [
      'Significant reduction in neuropathic pain (sarcoidosis patients — RCT data)',
      'Regeneration of small nerve fibers',
      'Improved corneal nerve fiber density',
      'Improved insulin sensitivity and metabolic parameters',
      'Anti-inflammatory: reduces TNF-α, IL-6',
    ],
    dosing: {
      typical: '4 mg once daily SC (clinical trial doses)',
      range: '1–8 mg/day',
      route: ['subcutaneous injection'],
      cycle: '4–12 weeks depending on indication',
      notes: 'Dosed based on clinical trial protocols.',
    },
    sideEffects: 'Well-tolerated in clinical trials. Mild injection site reactions. No erythropoietic effects.',
    keyReferences: ['Brines M et al. (2014). ARA290 alleviates chronic neuropathic pain in sarcoidosis. Mol Med.'],
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

  // ─────────────────────────────────────────────────────────────────────────────
// TESAMORELIN — Updated May 2026
// Sources: 5 peer-reviewed studies + FDA label
//
// Study 1: Falutz J et al. N Engl J Med 2007;357:2359. PMID 18057338
//          Falutz J et al. JCEM 2010;95:4291. PMID 20554713
//          Phase III RCT, N=806, HIV-lipodystrophy, 26 weeks
//
// Study 2: Baker LD et al. Arch Neurol 2012;69:1420. PMID 22925252
//          RCT double-blind, N=152 (66 MCI + 86 healthy elderly), 20 weeks, 1 mg/d
//
// Study 3: Stanley TL et al. JCEM 2011;96:150. PMID 20943777
//          Open-label interventional, N=13 healthy males, 2 mg/d x 14 days
//
// Study 4: Makimura H et al. JCEM 2012;97:4769. PMID 23015655
//          RCT double-blind, N=60 non-HIV obese with reduced GH, 2 mg/d x 12 months
//
// Study 5: Fourman LT et al. AIDS 2017;31:2253. PMID 28692538
//          Phase III secondary analysis, N=806, liver enzymes, 52 weeks
//
// Study 6: Clemmons DR et al. PLoS ONE 2017;12:e0179538. PMID 28617841
//          RCT double-blind, N=53 T2DM patients, 1 or 2 mg x 12 weeks
// ─────────────────────────────────────────────────────────────────────────────

{
  name: 'Tesamorelin',
  fullName: 'Tesamorelin (trans-3-hexenoyl-GHRH[1-44]-amide; Egrifta SV)',
  category: 'ghsecretagogue',
  goals: ['fat_loss', 'muscle_mass', 'longevity', 'cognitive', 'metabolic', 'liver_health'],
  summary: `Tesamorelin is the only FDA-approved growth hormone-releasing hormone (GHRH) analog in clinical use, approved in 2010 under the brand name Egrifta SV for reduction of excess abdominal (visceral) fat in HIV-infected patients with lipodystrophy. It is a stabilized synthetic analog of human GHRH(1-44) with a trans-3-hexenoic acid modification at the N-terminus that confers resistance to dipeptidyl peptidase IV (DPP-IV) degradation, extending its functional half-life from seconds (native GHRH) to 26–38 minutes — sufficient for once-daily subcutaneous dosing. Its short half-life is clinically significant: unlike CJC-1295 with DAC which produces sustained "GH bleed," tesamorelin generates a discrete pulsatile GH pulse that clears and synergizes with the natural nocturnal slow-wave-sleep GH burst, preserving physiological pulsatility. Five peer-reviewed human trials establish [Verified — High] evidence for visceral fat reduction in HIV-lipodystrophy (15–18% VAT reduction over 26 weeks), and [Verified — Moderate] evidence for VAT reduction in non-HIV obese (–19%), carotid IMT improvement, cognitive benefits in aging adults (executive function P=.005), liver enzyme normalization associated with VAT response, and glycemic safety in type 2 diabetics. Off-label use for NAFLD/MASLD and general metabolic optimization is [Speculation] supported by mechanistic extrapolation and growing clinical practice.`,

  mechanism: `Tesamorelin binds the GHRH receptor on pituitary somatotroph cells, stimulating synthesis and pulsatile release of endogenous growth hormone. The downstream GH pulse elevates IGF-1 (mean +117–181% across trials, remaining within physiological range). The visceral-fat-selective effect is mechanistically explained by higher GH receptor density in visceral adipose tissue (VAT) compared to subcutaneous adipose tissue (SAT), driving preferential lipolysis in the visceral depot. This explains the consistent finding across trials that VAT decreases significantly while SAT is largely unaffected — a clinically desirable selectivity, since SAT may be cardioprotective. Tesamorelin preserves the natural negative IGF-1 feedback loop on pituitary GH secretion, preventing GH excess and its associated hyperglycemic effects — the key mechanistic advantage over exogenous recombinant human GH (rhGH). Stanley et al. 2011 confirmed via overnight 10-min GH sampling and AutoDecon deconvolution that tesamorelin increases GH pulse area (+0.4 log₁₀ μg/L, P=0.001) and basal secretion (P=0.008) without changing pulse frequency — demonstrating genuine pulsatility amplification rather than tonic elevation. The cognitive mechanism is hypothesized to involve IGF-1 crossing the blood-brain barrier, binding hippocampal and cortical receptors, reducing Aβ burden, regulating tau phosphorylation, and improving neurotrophic support — all mechanistically plausible but [Speculation] without direct human trial validation of the neural pathway.`,

  benefits: [
    '[Verified — High] Visceral adipose tissue (VAT) reduction: 15–18% over 26 weeks in HIV-lipodystrophy (Phase III, N=806). 69% of tesamorelin patients achieved FDA-defined VAT response (≥8% reduction) vs 33% placebo (P<0.001).',
    '[Verified — High] GH pulsatility preserved: pulse frequency unchanged; pulse area and basal secretion increased. Key advantage over exogenous GH and CJC-1295 with DAC (Stanley et al. 2011).',
    '[Verified — Moderate] VAT reduction in non-HIV obese: –19% net treatment effect vs placebo at 12 months (–35 cm², P=0.003), selectively visceral — SAT unchanged (Makimura et al. 2012).',
    '[Verified — Moderate] Carotid intima-media thickness (cIMT) reduction in non-HIV obese: –0.04 mm net (–6%), P=0.02 — first evidence of tesamorelin cardiovascular benefit outside HIV (Makimura et al. 2012).',
    '[Verified — Moderate] Triglyceride reduction: –37 mg/dL (–20%) in obese; ~50 mg/dL in HIV trials. CRP (log) –24% in obese (P=0.04).',
    '[Verified — Moderate] Cognitive function: favorable effect on executive function (effect size f=0.37, P=.005) and verbal memory trend (P=.08) over 20 weeks, 1 mg/d, in both MCI and healthy older adults ages 55–87 (Baker et al. 2012, N=152).',
    '[Verified — Moderate] IGF-1 elevation: +117–181% across trials, consistently within physiological range. IGF-1 returns to baseline within 10 weeks of discontinuation.',
    '[Verified — Moderate] Liver enzyme improvement: ALT –8.9 U/L (–18%) in VAT responders vs +1.4 U/L nonresponders (P=0.004); AST –3.8 vs +0.4 U/L (P=0.04); ALT normalization OR 2.5 (95% CI 1.2–5.3). Benefits persisted 26 weeks post-discontinuation (Fourman et al. 2017, N=806).',
    '[Verified — Moderate] Glycemic safety in T2DM: no significant change in relative insulin response (P=0.71), fasting glucose (P=0.44), or HbA1c overall at 12 weeks. Total and non-HDL cholesterol decreased significantly in 2 mg group (Clemmons et al. 2017, N=53).',
    '[Verified — Moderate] Body composition: lean mass +3.7% (P<.001), body fat –7.4% (P<.001) at 20 weeks (Baker et al. 2012). Waist circumference –3 cm, lean mass +1.4 kg at 12 months in obese (Makimura et al. 2012).',
    '[Speculation] NAFLD/MASLD off-label: mechanistic extrapolation from HIV-NAFLD data (Stanley et al. JAMA 2014) plus clinical practice experience in non-HIV metabolic syndrome. No large RCT in non-HIV NAFLD population.',
    '[Speculation] Longevity and healthy aging: GH/IGF-1 axis restoration in aging; cognitive preservation; cardiovascular risk index improvement. Clinical plausibility strong but no long-term longevity endpoint RCT.',
  ],

  dosing: {
    typical: '2 mg SC once daily (FDA label); 1–2 mg SC once daily (off-label body composition/NAFLD)',
    range: '1–2 mg SC daily',
    frequency: 'Daily',
    route: ['subcutaneous injection'],
    cycle: `FDA label (HIV lipodystrophy): continuous — effects reverse on discontinuation, VAT returns to baseline within months.
Off-label NAFLD: continuous, minimum 12–26 weeks to assess hepatic fat fraction response.
Off-label body composition: 12–26 weeks, sometimes 5 days on / 2 days off to reduce cumulative IGF-1 exposure and improve tolerability.
Conservative starter: 1 mg SC daily, titrate to 2 mg over 2–4 weeks to reduce injection-site reactions and arthralgia incidence. Check IGF-1 at 4–6 weeks.`,
    notes: `Timing: evening or pre-bed (30+ minutes after last meal) to align the GH pulse with the natural nocturnal slow-wave-sleep GH burst. Fasted state required (2+ hours since last meal) to avoid blunting the GH pulse.
Monitoring (per FDA label): IGF-1 every 6 months; fasting glucose and HbA1c at baseline, 3 months, then periodically. Discontinue if IGF-1 persistently exceeds 2× the upper limit of normal for age and sex.
Dose adjustment: reduce to 1 mg daily if IGF-1 consistently elevated above age-specific ULN, or if arthralgia/edema intolerable.
Stacking: commonly used solo for NAFLD/visceral fat (no GHRP needed — robust GH pulses alone). Stack with Ipamorelin 200–300 mcg pre-bed if IGF-1 elevation on tesamorelin alone is suboptimal. Stack with semaglutide/tirzepatide for metabolic syndrome: complementary mechanisms (tesamorelin targets visceral/hepatic fat via GH/IGF-1; GLP-1 agonists target caloric intake and glycemic control).
Reconstitution: 5 mg vial + 2.5 mL BAC water = 2 mg/mL (draw 1 mL = 2 mg = 100 IU on U-100 syringe). Egrifta SV: 1.4 mg vial + 2.2 mL sterile water (~0.625 mg/mL). Refrigerate 2–8°C; reconstituted stable ~30 days per compounding pharmacy beyond-use dates.
Cost (2026): Brand Egrifta SV $3,000–4,500/month; compounded tesamorelin $250–600/month via 503A pharmacy.`,
  },

  sideEffects: `[Verified — High] Injection-site reactions (erythema, pruritus, pain): common — rotate sites, cold compress.
[Verified — High] Arthralgias/myalgias: common (5–10%), dose-related, resolves with dose reduction. Titrate from 1 mg to reduce incidence.
[Verified — High] Peripheral edema: common — reduce dietary sodium; usually self-limiting.
[Verified — Moderate] Numbness/paresthesias: possible, IGF-1 mediated — reduce dose if persistent.
[Verified — Moderate] Transient fasting glucose increase: mild, observed at weeks 4–8 in Clemmons 2017 T2DM study (2 mg group), reversed by week 12. Monitor in metabolic syndrome patients.
[Verified — Moderate] Increased IGF-1: expected (mechanism of action) — monitor to ensure within physiological range.
[Verified — Low] Mild HbA1c increase (+0.1%) at 12 weeks with 2 mg in T2DM population (Clemmons 2017); clinically small, not statistically significant overall. Monitor periodically.
[Verified — High] Hypersensitivity reactions: rare — discontinue if rash, urticaria, or anaphylaxis.
[Unknown] Tumor promotion risk with active malignancy: theoretical (GH/IGF-1 may promote tumor growth) — FDA contraindication. No direct clinical trial data in cancer patients; exclude active malignancy before initiation.
Contraindications per FDA label: active malignancy; pregnancy (fetal effects not characterized); hypopituitarism (intact pituitary somatotroph function required for efficacy).
Compliance across trials: 97–99.5% — excellent tolerability when properly titrated.`,

  researchLevel: 'high',

  sourceNotes: `FDA label (Egrifta SV): Theratechnologies prescribing information. DailyMed.
Falutz J et al. N Engl J Med. 2007;357(23):2359-2370. PMID 18057338. [Phase III pivotal RCT, HIV, N=806]
Falutz J et al. J Clin Endocrinol Metab. 2010;95(9):4291-4304. PMID 20554713. [Pooled Phase III analysis]
Baker LD et al. Arch Neurol. 2012;69(11):1420-1429. PMID 22925252. [RCT, cognitive function, N=152 MCI+healthy]
Stanley TL et al. J Clin Endocrinol Metab. 2011;96(1):150-158. PMID 20943777. [GH pulsatility + insulin sensitivity, N=13]
Makimura H et al. J Clin Endocrinol Metab. 2012;97(12):4769-4779. PMID 23015655. [Non-HIV obese RCT, N=60, 12 months]
Fourman LT et al. AIDS. 2017;31(16):2253-2259. PMID 28692538. [Liver enzymes secondary analysis, N=806]
Clemmons DR et al. PLoS ONE. 2017;12(6):e0179538. PMID 28617841. [T2DM safety RCT, N=53]
Lemke R. Tesamorelin (Egrifta): FDA-Approved Visceral Fat Reduction. The Peptide Toolkit. May 3, 2026. [Clinical guide — secondary source]`,
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

  // ─── Thymosin Alpha-1 ─────────────────────────────────────────────────────────
  {
    id: 'thymosin_alpha1',
    name: 'Thymosin Alpha-1',
    fullName: 'Thymosin Alpha-1 (Zadaxin)',
    aliases: ['Ta1', 'Zadaxin', 'TA1'],
    category: 'Immune Modulation',
    categoryTag: 'immune',
    goals: ['inflammation', 'fatigue', 'longevity'],
    regulatoryStatus: 'FDA-approved in some countries (Zadaxin) for hepatitis B/C. Compoundable in US.',
    researchLevel: 'high',
    summary: 'Endogenous thymic peptide that modulates immune function — primarily T-cell differentiation and activation.',
    mechanism: 'Binds TLR2 and TLR9 on dendritic cells and T-cells. Enhances Th1 differentiation, NK cell activity, IL-2 and IFN-gamma production.',
    benefits: [
      'Enhances T-cell immunity (Th1 response)',
      'Antiviral: hepatitis B/C, COVID-19 (studied)',
      'Adjuvant in cancer immunotherapy',
      'Reduces chronic fatigue in immune-compromised patients',
    ],
    dosing: {
      typical: '1.6 mg SC twice weekly (Zadaxin standard)',
      range: '0.8-3.2 mg/dose',
      route: ['subcutaneous injection'],
      cycle: '6-12 months for chronic conditions; shorter for acute immune support',
      notes: 'Well-established clinical dosing from Zadaxin trials.',
    },
    sideEffects: 'Very well-tolerated. Injection site reactions. No significant systemic adverse effects in trials.',
    keyReferences: ['Tuthill CW et al. (1994). Thymosin alpha-1 clinical use. Ann NY Acad Sci.'],
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
// ─── HCG (Human Chorionic Gonadotropin) ──────────────────────────────────────
// Updated May 2026 — 5 sources extracted (4 peer-reviewed + 1 community guide)
// Evidence labels: [Verified] = peer-reviewed | [Speculation] = community/extrapolated | [Unknown] = no data
//
// Sources:
//   [1] Lemke R. "HCG for TRT: Doses, Forms & The 2026 Compounding Crisis."
//       The Peptide Toolkit. May 3, 2026. [Speculation — educational guide, no peer review]
//   [2] Delemarre-van de Waal HA. Eur J Endocrinol. 2004;151:U89-U94.
//       [Verified — n=68 HH males, GnRH+HCG, 85.3% spermatogenesis]
//   [3] Liu Z et al. Medicine. 2016;95(9):e2867. PMID via DOI 10.1097/MD.0000000000002867
//       [Verified — retrospective n=223 CHH, HCG/HMG, 64% spermatogenesis]
//   [4] Hong BS & Ahn TY. Int J Urol. 2007;14:981-985.
//       [Verified — TDS/TRT review, HCG background context]
//   [5] Nieschlag E et al. Reprod Biol Endocrinol. 2017;15:17. NCT01709331.
//       [Verified — Phase III, n=18 combined HCG+FSH, 77.8% spermatogenesis]
//
// IMPORTANT NOTE: HCG is a 244-amino-acid glycoprotein hormone, not a small peptide.
// All peer-reviewed efficacy data comes from hypogonadotropic hypogonadism (HH) populations.
// TRT adjunct use is off-label; no dedicated RCT for this indication.

{
  id: 'hcg',
  name: 'HCG',
  fullName: 'Human Chorionic Gonadotropin (hCG)',
  aliases: ['Pregnyl', 'Novarel', 'Chorionic Gonadotropin', 'hCG', 'Human chorionic gonadotropin'],
  category: 'Hormonal / Fertility',
  categoryTag: 'fertility',
  goals: ['fertility', 'sexual_function', 'metabolic_health', 'muscle_mass'],
  regulatoryStatus:
    'FDA-approved (Pregnyl, Novarel) for: (1) hypogonadotropic hypogonadism in males, (2) ovulation induction in females, (3) cryptorchidism in pediatric patients. ' +
    'TRT adjunct use — the most common community use — is off-label, supported by long clinical practice but not on the FDA-approved label. ' +
    'Compounding availability significantly reduced since FDA enforcement actions 2024–2025 against bulk-compounding pharmacies; many TRT clinics have switched to gonadorelin as of 2026. ' +
    'Brand-name HCG still available by prescription through traditional pharmacy channels but is more expensive. ' +
    'WADA Prohibited List 2026, Section S2 — banned in male competitive athletes. [Verified — Lemke 2026, FDA]',
  researchLevel: 'high',

  summary:
    'Human Chorionic Gonadotropin is a 244-amino-acid glycoprotein hormone naturally produced by the placenta during pregnancy. In men, it functions as an LH mimic — binding directly to LH receptors on testicular Leydig cells and stimulating intratesticular testosterone (ITT) production and spermatogenesis support. ' +
    'When a man starts TRT, the HPG axis shuts down: the brain stops producing GnRH → pituitary stops making LH/FSH → Leydig cells go dormant → testicular atrophy, fertility loss, and the "flat" mood some men on TRT-only describe. ' +
    'HCG bypasses this shutdown by directly activating Leydig cells regardless of pituitary status. ' +
    'In hypogonadotropic hypogonadism (HH) populations — the best-studied clinical group — HCG achieves testosterone normalization (0.9 → 15.1 nmol/L, P<0.001; Liu 2016, n=223) and testicular growth but usually requires FSH co-administration for complete spermatogenesis: 77.8% spermatogenesis success with HCG+corifollitropin alfa (Phase III, Nieschlag 2017, n=18) and 64% with HCG+HMG (retrospective, Liu 2016, n=223). ' +
    'For TRT adjunct use, 250–500 IU SC 2–3x/week is the established community standard, preserving testicular size, fertility potential, and ITT. ' +
    'As of 2026, HCG has become harder to source through compounding pharmacies; gonadorelin has emerged as the primary alternative for testicular function maintenance on TRT. ' +
    '[Verified — 4 peer-reviewed sources; TRT adjunct dosing Speculation — Lemke 2026]',

  mechanism:
    'LH RECEPTOR MIMIC: HCG beta subunit binds LH receptors on testicular Leydig cells with high affinity. ' +
    'Activates adenylyl cyclase → cAMP → steroidogenic enzyme upregulation → intratesticular testosterone (ITT) synthesis. ' +
    'ITT is orders of magnitude higher than serum testosterone and is essential for spermatogenesis via Sertoli cell support. ' +
    'HCG bypasses hypothalamic-pituitary signaling entirely — functional in men with intact Leydig cells regardless of HPG axis suppression from TRT. ' +
    'PLASMA KINETICS: Terminal half-life ~33–37 hours. Biological effect on Leydig cells persists 3–5 days per injection — explaining why 2–3x/week dosing is sufficient despite the molecule clearing more quickly. ' +
    'ESTRADIOL PATHWAY: Stimulated ITT → testicular aromatase → estradiol (E2) elevation. Higher E2 risk than gonadorelin because HCG provides stronger direct Leydig stimulation. ' +
    'HPG AXIS CONTEXT: TRT suppresses GnRH → stops LH/FSH → Leydig cell dormancy → testicular atrophy and azoospermia within 3–6 months. ' +
    'HCG counters all three downstream effects: maintains Leydig function (testosterone), prevents atrophy (testicular volume), and preserves spermatogenic machinery (ITT → Sertoli support). ' +
    'IMPORTANT: HCG alone is often insufficient for complete spermatogenesis in HH patients — FSH co-administration (via HMG, recFSH, or corifollitropin alfa) is required in most fertility cases.',

  benefits: [
    '[Verified] Testosterone normalization in HH: 0.9±0.5 → 15.1±8.2 nmol/L (P<0.001) with HCG/HMG (Liu 2016, n=223). HCG pretreatment alone: 65.2 → 437.6 ng/dL in 16 weeks (Nieschlag 2017).',
    '[Verified] Testicular volume restoration: 2.1±1.6 → 8.1±4.6 mL (P<0.001) in HH patients (Liu 2016). 2.30-fold increase in 52 weeks with HCG+FSH (Nieschlag 2017, 95% CI: 2.03–2.62).',
    '[Verified] Spermatogenesis induction (HCG+FSH): 77.8% achieved sperm count ≥1×10⁶/mL in Phase III trial (Nieschlag 2017, n=18). 64% success in large CHH cohort with HCG+HMG (Liu 2016, n=223).',
    '[Verified] Spermatogenesis maintenance: After GnRH-induced spermatogenesis in HH, hCG 1,500–3,000 IU 1–2x/week maintained or improved spermatogenesis in most patients. 10/68 fathered children (Delemarre-van de Waal 2004).',
    '[Verified] Fertility outcomes: 19/34 (56%) married HH patients impregnated partners during HCG/HMG therapy (Liu 2016). Median time to first sperm: 15 months (95% CI 13.5–16.5). Time to >5M/mL: 27 months.',
    '[Verified] TRT — testicular atrophy prevention: Concomitant HCG preserves spermatogenesis in men on TRT (Hsieh 2013, J Urol 189:647). Low-dose HCG maintains intratesticular testosterone in testosterone-suppressed men (Coviello 2005, JCEM 90:2595).',
    '[Speculation] TRT — mood/well-being: Some men on TRT-only report "flat" or "off" feeling that resolves with HCG addition. Mechanism debated: ITT, DHEA-like adrenal effects, pregnenolone pathway. Anecdotal but consistently reported.',
    '[Verified] Muscle mass, osteoblastic collagen, lipid effects: Positive effects reported in limited studies of HCG for age-related androgen deficiency (Zitzmann 2000, Acevedo 2002; cited Hong & Ahn 2007).',
  ],

  humanEvidence:
    '4 clinical studies (1 Phase III, 1 retrospective cohort n=223, 1 interventional n=68, 1 review). ' +
    '(1) Nieschlag et al 2017 (NCT01709331; n=18 combined phase): Phase III HCG+corifollitropin alfa — 77.8% spermatogenesis ≥1×10⁶/mL, 2.30-fold testicular volume increase. ' +
    '(2) Liu et al 2016 (n=223 CHH): HCG+HMG — 64% spermatogenesis, median 15 months, 56% paternity rate in married patients. Cox regression predictors validated. ' +
    '(3) Delemarre-van de Waal 2004 (n=68 HH): GnRH → HCG maintenance — 85.3% spermatogenesis, 10 fathered children. ' +
    '(4) Hong & Ahn 2007 (review): TDS treatment context, HCG as TRT alternative. ' +
    'NOTE: No RCT exists for HCG as TRT adjunct specifically (the primary community use). All peer-reviewed spermatogenesis data comes from HH populations.',

  dosing: {
    typical: '[Speculation — Lemke 2026] TRT adjunct: 250–500 IU SC, 2–3x/week. [Verified — Phase III] HH therapy: 1,500–3,000 IU SC/IM 2x/week.',
    range:
      'TRT adjunct [Speculation]: 250–500 IU per injection. ' +
      'HH with HCG/HMG [Verified]: 2,000–5,000 IU IM 2x/week (Liu 2016). ' +
      'HH Phase III [Verified]: 1,500–3,000 IU SC 2x/week (Nieschlag 2017). ' +
      'GnRH maintenance [Verified]: 1,500–3,000 IU IM/SC 1–2x/week (Delemarre-van de Waal 2004). ' +
      'Fertility restart post-TRT [Speculation]: 1,500–3,000 IU 2–3x/week + HMG or clomiphene.',
    frequency:
      '2–3x/week for TRT adjunct [Speculation]. 2x/week for HH [Verified]. ' +
      'Biological effect persists 3–5 days per injection due to 33–37h half-life — more frequent dosing not necessary.',
    route: ['subcutaneous injection', 'intramuscular injection (clinical trials)'],
    cycle:
      'TRT adjunct: continuous with TRT [Speculation]. ' +
      'HH fertility: 6–18+ months depending on spermatogenesis goals [Verified]. ' +
      'Effects on testicular function reverse within months of stopping — must continue for maintained benefit.',
    notes:
      'CRITICAL: HCG is dosed in International Units (IU), NOT milligrams. Confusing the two is the most common self-administration error and can cause 100x dosing errors. ' +
      'RECONSTITUTION: Standard compounded vials are 5,000 IU or 10,000 IU. Add bacteriostatic water (BAC water only — sterile water degrades the molecule faster and increases contamination risk). ' +
      '5,000 IU + 5 mL BAC water = 1,000 IU/mL. For 250 IU dose: draw 0.25 mL = 25 units on U-100 syringe. ' +
      '5,000 IU + 10 mL BAC water = 500 IU/mL. For 250 IU dose: draw 0.5 mL = 50 units on U-100 syringe. ' +
      'STORAGE: Refrigerate immediately after reconstitution. Never freeze (damages glycoprotein structure). Use within 30 days of reconstitution. ' +
      'MONITORING: Estradiol (E2) every 6–8 weeks — higher aromatization than gonadorelin. Anastrozole 0.25–0.5 mg 2x/week only if E2 genuinely elevated on labs — do not crush E2 prophylactically. ' +
      'Testosterone levels 48h after HCG injection (peak reference). Hematocrit and PSA per standard TRT monitoring. ' +
      'PREGNANCY TEST INTERFERENCE: Home pregnancy tests detect HCG — after injection you will test positive for 7–14 days regardless of pregnancy status. ' +
      '2026 ACCESS NOTE: HCG availability through compounding pharmacies is limited and inconsistent following 2024–2025 FDA enforcement. Gonadorelin is the widely available alternative. ' +
      'If HCG unavailable: gonadorelin 100–500 mcg SC 2–3x/day is the primary substitute for testicular function maintenance on TRT.',
  },

  hcgVsGonadorelin: {
    note: '[Speculation — Lemke 2026] Both preserve testicular function during TRT via different mechanisms.',
    mechanism: 'HCG: direct LH receptor agonist on Leydig cells. Gonadorelin: synthetic GnRH → pituitary → endogenous LH/FSH release.',
    injectionsPerWeek: 'HCG: 2–3. Gonadorelin: 14–21 (2–3x daily due to 5–10 min half-life).',
    estrogenRisk: 'HCG: higher (direct Leydig overstimulation risk). Gonadorelin: lower (pulsatile, physiologic).',
    intratesticularT: 'HCG: strong. Gonadorelin: modest.',
    availability2026: 'HCG: limited/inconsistent. Gonadorelin: widely compounded.',
    pregnancyTestInterference: 'HCG: yes (7–14 days). Gonadorelin: no.',
  },

  sideEffects:
    '[Verified] Well-tolerated at TRT-adjunct doses. No serious adverse events in Phase III clinical trial (Nieschlag 2017). No hepatorenal impairment in large cohort (Liu 2016). ' +
    '[Verified] Estradiol elevation: stimulates ITT → aromatization → E2 rise. Symptoms: nipple sensitivity, gynecomastia risk, water retention, mood changes. Gynecomastia occurred in 7% (16/223) at HH clinical doses; 2 required surgical excision (Liu 2016). ' +
    '[Verified] Acne: 9% (20/223) at HH doses — testosterone-mediated. Reduced HCG dose resolved it. ' +
    '[Verified] One patient discontinued Phase III trial (Nieschlag 2017) due to testosterone 1,528 ng/dL — reversed on discontinuation. ' +
    '[Speculation] Water retention: indirect aldosterone elevation. Face/ankle puffiness in first weeks. Usually resolves. ' +
    '[Verified] Pregnancy test cross-reactivity: positive home test for 7–14 days post-injection. Not harmful but important awareness. ' +
    '[Unknown] Long-term TRT adjunct safety profile: no dedicated RCT. Extrapolated from HH clinical trials and long-standing clinical practice. ' +
    'CONTRAINDICATIONS: Active prostate or breast cancer (HCG stimulates testosterone production). Primary hypogonadism — Klinefelter syndrome (absent Leydig cells; HCG cannot overcome). Prior bilateral cryptorchidism (reduced Leydig cell reserve). Known hypersensitivity to HCG components.',

  keyReferences: [
    'Lemke R. HCG for TRT: Doses, Forms & The 2026 Compounding Crisis. The Peptide Toolkit. May 3, 2026. [Speculation — educational guide]',
    'Delemarre-van de Waal HA. Application of GnRH in hypogonadotropic hypogonadism — diagnostic and therapeutic aspects. Eur J Endocrinol. 2004;151:U89-U94.',
    'Liu Z et al. Efficacy and outcome predictors of gonadotropin treatment for male congenital hypogonadotropic hypogonadism: retrospective study of 223 patients. Medicine. 2016;95(9):e2867. DOI 10.1097/MD.0000000000002867.',
    'Hong BS & Ahn TY. Recent trends in the treatment of testosterone deficiency syndrome. Int J Urol. 2007;14:981-985.',
    'Nieschlag E et al. Efficacy and safety of corifollitropin alfa combined with hCG in adult men with hypogonadotropic hypogonadism. Reprod Biol Endocrinol. 2017;15:17. NCT01709331.',
    'Coviello AD et al. Low-dose hCG maintains intratesticular testosterone in men with testosterone-induced gonadotropin suppression. J Clin Endocrinol Metab. 2005;90(5):2595-2602.',
    'Hsieh TC et al. Concomitant intramuscular hCG preserves spermatogenesis in men undergoing TRT. J Urol. 2013;189(2):647-650.',
    'Bhasin S et al. Testosterone therapy in men with hypogonadism: Endocrine Society guideline. J Clin Endocrinol Metab. 2018;103(5):1715-1744.',
    'U.S. FDA. Pregnyl and Novarel prescribing information. DailyMed.',
    'WADA. Prohibited List 2026, Section S2 (hCG prohibited in male athletes).',
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
    summary: 'MOTS-c is a 16-amino-acid mitochondrial-derived peptide encoded in the 12S rRNA open reading frame of mitochondrial DNA. Plasma MOTS-c declines with age (-11% middle-aged, -21% older vs young; p<0.001) and in disease states including T1DM, T2DM, gestational diabetes (-18%, p<0.01), and obesity. Exercise-induced — rising 11.9-fold in skeletal muscle and 1.5-fold in plasma after high-intensity cycling. Serum levels correlate positively with lower-body muscle strength (R²=0.53, p=0.016) and muscle mass. As the first mitochondrial-encoded peptide to enter clinical trials, it is a high-priority longevity and metabolic therapeutic candidate. [Verified — 12 peer-reviewed sources]',
    mechanism: 'PRIMARY (skeletal muscle): Folate cycle inhibition → AICAR accumulation → AMPK activation → GLUT4 translocation → enhanced glucose uptake. STRESS RESPONSE: AMPK-dependent nuclear translocation → Nrf2/ARE antioxidant regulation → ATF1-mediated stress resistance. IMMUNE/T1DM: Alpha-helical domain binds Raptor → mTORC1 suppression → Foxp3+ Treg differentiation → reduced pancreatic islet infiltration. CARDIAC: AMPK → mitochondrial biogenesis (citrate synthase above baseline) → restored OXPHOS; Nrf2 → SOD/catalase/GPX4 upregulation; reduced ATP synthase reversal during anoxia. LONGEVITY: Mitohormesis — transient H2O2 bursts trigger adaptive antioxidant upregulation. m.1382A>C SNP in MOTS-c ORF associated with exceptional longevity in Japanese centenarians.',
    benefits: [
      '[Verified] Insulin resistance reduction via GLUT4/AMPK/AICAR in skeletal muscle — validated in HFD, T2DM, and GDM mouse models',
      '[Verified] T2DM: Serum MOTS-c inversely correlated with HbA1c severity (n=225); lowest in poorly controlled T2DM (HbA1c >7%)',
      '[Verified] Gestational diabetes (GDM): Plasma MOTS-c 18% lower vs healthy pregnant (p<0.01); R=-0.707 with OGTT 2h glucose',
      '[Verified] Diabetic cardiomyopathy: Restored cardiac OXPHOS respiration to control levels in T2D rat model (Pham 2025)',
      '[Verified] Cardiac hypertrophy reversal: LV wall thickness -8% (3.71→3.40 mm, p<0.05) in T2D rats',
      '[Verified] Exercise-induced: 11.9-fold muscle MOTS-c increase post high-intensity cycling (p=0.0098)',
      '[Verified] Muscle strength: Serum MOTS-c correlates with lower-body max force (R²=0.53, p=0.016) and average power (R²=0.50)',
      '[Verified] VO2max: Zero correlation (R²=-0.011, p=0.96) — strength not endurance marker',
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
    humanEvidence: '5 human observational studies (no exogenous RCT): Reynolds 2021 (n=10, exercise-induced); D\'Souza 2020 (n=78, age paradox); Yin 2022 (n=40, GDM); Kong 2023 (n=225 T2DM cross-sectional); Domin 2023 (n=20, strength correlation). Phase I trial NCT03998514 pending.',
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
    aliases: ['MTP-131', 'Bendavia', 'D-Arg-2\'6\'-Dmt-Lys-Phe-NH2'],
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

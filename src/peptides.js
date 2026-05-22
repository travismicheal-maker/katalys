// src/peptides.js
// Peptide knowledge base — Vitae Bio Precision Aging
// BPC-157 fully updated from research literature (May 2026)
// MOTS-c fully updated from 12 peer-reviewed sources (May 2026)
// Tesamorelin fully updated from 3 sources incl. 2 RCTs (May 2026)
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

  // ─── Tesamorelin ──────────────────────────────────────────────────────────────
  // Updated May 2026 — 3 sources: 2 peer-reviewed RCTs + 1 clinical reference
  // Sources:
  //   [1] Falutz J et al. N Engl J Med. 2007;357(23):2359-70. PMID 18057338 [RCT Phase 3, n=412]
  //   [2] Baker LD et al. Arch Neurol. 2012;69(11):1420-1429. [RCT n=152, 137 completers]
  //   [3] Stanley TL et al. J Clin Endocrinol Metab. 2011;96(1):150-158. [Interventional n=13]
  //   [4] Stanley TL et al. Lancet HIV. 2019;6(12):e821-e830. [RCT NAFLD in HIV+]
  //   [5] Egrifta SV prescribing information (Theratechnologies). DailyMed.
  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    fullName: 'Tesamorelin (Trans-3-hexenoic acid GHRH[1-44] amide; Egrifta / Egrifta SV)',
    aliases: ['Egrifta', 'Egrifta SV', 'TH9507'],
    category: 'GH Axis / Metabolic',
    categoryTag: 'gh_axis',
    goals: ['visceral_fat', 'metabolic_health', 'mental_clarity', 'muscle_mass', 'longevity', 'inflammation'],
    regulatoryStatus: 'FDA-approved (Egrifta SV; Theratechnologies) since 2010 for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. Compoundable off-label by 503A pharmacies. On WADA Prohibited List (Section S2) for competitive athletes.',
    researchLevel: 'high',

    summary: 'Tesamorelin is the only FDA-approved GHRH analog, with 15-18% visceral adipose tissue (VAT) reduction in its Phase 3 RCT (Falutz et al., NEJM 2007). A randomized, double-blind, placebo-controlled trial (Baker et al., Arch Neurol 2012; n=137 completers) demonstrated that 20 weeks of tesamorelin 1 mg/day improved executive function (P=.005, effect size f=0.37) and increased IGF-1 by 117% (P<.001) in both healthy older adults and those with mild cognitive impairment — with comparable benefit in both groups and no serious adverse events. Stanley et al. (JCEM 2011; n=13) confirmed that tesamorelin augments pulsatile GH secretion by increasing pulse area and basal secretion without altering pulse frequency, and does not impair insulin sensitivity by euglycemic clamp (P=0.61). Unlike CJC-1295 with DAC, the 26-38 minute half-life produces discrete daily GH pulses preserving physiologic pulsatility. Off-label use for NAFLD/MASLD and body composition is increasingly common in metabolic clinics, particularly in combination with GLP-1 agonists. [Verified — 2 RCTs + 1 interventional study, May 2026]',

    mechanism: 'Tesamorelin is a stabilized synthetic analog of human GHRH(1-44) with a trans-3-hexenoic acid N-terminal modification protecting against DPP-IV enzymatic degradation, yielding a 26-38 min SC half-life (confirmed Stanley 2011). Unlike CJC-1295 with DAC (sustained GH bleed via albumin binding), tesamorelin triggers a discrete daily GH pulse that clears between doses, preserving physiologic pulsatile signaling. Stanley et al. (JCEM 2011) confirmed by AutoDecon deconvolution analysis that tesamorelin increases GH pulse area (+0.4 log10 ug/L, P=0.001) and basal GH secretion (+0.008 ug/L.min, P=0.008) without altering pulse frequency (P=0.68) or GH half-life — mechanistically distinct from rhGH. Negative IGF-1 feedback on pituitary GH release is preserved, limiting GH excess risk. Downstream IGF-1 elevation drives preferential lipolysis in visceral adipose tissue (higher GH receptor density than subcutaneous fat). Visceral adiposity itself suppresses endogenous GH secretion (VAT negatively correlated with mean overnight GH, r=-0.71, P=0.007, Stanley 2011) — tesamorelin restores this functional deficit. IGF-1 crosses the blood-brain barrier and binds receptors throughout the brain (highest densities in hippocampus, frontal cortex, amygdala) — providing the neurotrophic and neuroprotective substrate for the cognitive benefits observed in Baker 2012; IGF-1 rise was correlated with executive function improvement (r=0.2, P=.03).',

    benefits: [
      '[Verified — High] Visceral adipose tissue reduction 15-18% at 26 weeks, 2 mg/day (Falutz 2007 NEJM Phase 3 RCT, n=412). Triglyceride reduction ~50 mg/dL average. FDA-approval basis. Subcutaneous fat largely unaffected (visceral-selective).',
      '[Verified — High] Body composition: body fat -7.4% (F1,129=41.30, P<0.001), lean muscle mass +3.7% (F1,129=27.60, P<0.001) at 20 weeks in Baker 2012 RCT (1 mg/day, n=137 completers).',
      '[Verified — Moderate] Executive function improvement in healthy older adults AND MCI: F(1,127)=8.34, P=.005, effect size f=0.37. Comparable benefit in both groups (no treatment x diagnosis interaction, P=.22). Baker 2012 RCT.',
      '[Verified — Moderate] IGF-1 elevation: 117% increase remaining within physiologic range at 20 weeks (Baker 2012); 181 ug/L increase at 2 weeks 2 mg/day (Stanley 2011, P<0.0001). Returns to baseline ~10 weeks post-discontinuation.',
      '[Verified — Moderate] GH pulsatility augmentation: mean overnight GH +0.5 ug/L (P=0.004), GH AUC +366 ug/L per 12h (P=0.005), pulse area increased without altering frequency. Pulsatile pattern preserved vs rhGH. Stanley 2011.',
      '[Verified — Moderate] Insulin sensitivity preserved: insulin-stimulated glucose uptake unchanged by euglycemic clamp (P=0.61) at 2 weeks 2 mg/day. Key safety advantage vs rhGH. HOMA-IR trended up (P=0.08, NS). Stanley 2011.',
      '[Verified — Moderate] Cognitive decline attenuated in MCI: Baker 2012 showed GHRH stabilized executive function in MCI group. Trend for verbal memory benefit (P=.08). IGF-1 rise correlated with executive function response (r=0.2, P=.03).',
      '[Verified — Low] Hepatic fat reduction in HIV+ NAFLD: significant hepatic fat fraction (HFF) reduction at 12 months, 2 mg/day (Stanley et al., Lancet HIV 2019). Non-HIV NAFLD extrapolation off-label with limited RCT support.',
      '[Verified — High] No effect on cortisol, TSH, or LH per FDA label — somatotrophic axis specific. HPA axis not suppressed on discontinuation.',
      '[Speculation] Synergy with GLP-1 agonists (semaglutide, tirzepatide) for visceral and hepatic fat in metabolic syndrome/NAFLD — complementary mechanisms, no RCT data on combination.',
    ],

    dosing: {
      typical: '2 mg SC daily (FDA label); 1 mg SC daily demonstrated effective in Baker 2012 cognitive RCT',
      range: '1-2 mg SC daily',
      frequency: 'Once daily. Short half-life (26-38 min) requires daily dosing for sustained IGF-1 elevation.',
      route: ['subcutaneous injection'],
      cycle: 'FDA label (HIV lipodystrophy): continuous — effects reverse on discontinuation within months. NAFLD off-label: continuous, minimum 12-26 weeks to assess hepatic fat fraction. Body composition off-label: 12-26 weeks; community protocols often 5 days on/2 days off to reduce cumulative IGF-1 exposure [Speculation — no RCT data]. VAT and hepatic fat return toward baseline within months of stopping — continuous use required to maintain effect.',
      notes: 'TIMING: Evening or pre-bed dosing commonly used to align GH pulse with nocturnal slow-wave-sleep GH burst (Baker 2012 used 30 min pre-bedtime). FDA label does not mandate specific time. Fasted state (2+ hours post-meal) recommended to avoid blunting GH pulse amplitude [Speculation — mechanistically sound, not formally studied with tesamorelin]. TITRATION: Start 1 mg/day and titrate to 2 mg over 2-4 weeks to reduce injection-site reactions and arthralgias. RECONSTITUTION (compounded): 5 mg vial + 2.5 mL BAC water = 2 mg/mL (1 mL = 2 mg, 100 IU); 10 mg + 5 mL BAC = 2 mg/mL; 10 mg + 2 mL BAC = 5 mg/mL (0.4 mL = 2 mg, 40 IU). Stability: ~30 days refrigerated (2-8 degrees C). RECONSTITUTION (Egrifta SV brand): 1.4 mg vial + 2.2 mL sterile water = ~0.625 mg/mL. STACKING: Tesamorelin solo is most evidence-based for visceral fat/NAFLD — does not require GHRP co-administration as it produces robust GH pulses alone. Add Ipamorelin 200-300 mcg pre-bed only if IGF-1 suboptimal on tesamorelin alone (lab-confirmed). MK-677 combination maximizes IGF-1 but highest side-effect burden. MONITORING: IGF-1 every 6 months per FDA label. Fasting glucose and HbA1c at baseline, 3 months, then periodically. Discontinue if IGF-1 persistently exceeds 2x upper limit of normal for age and sex.',
    },

    humanEvidence: [
      { study: 'Falutz J et al. (2007) NEJM 357:2359', type: 'Phase 3 RCT', n: 412, finding: '15-18% VAT reduction at 26 weeks. ~50 mg/dL triglyceride reduction. Lean mass preserved. Basis for FDA approval 2010.' },
      { study: 'Baker LD et al. (2012) Arch Neurol 69:1420', type: 'RCT double-blind placebo-controlled', n: '152 enrolled, 137 completers', finding: '1 mg/day x 20 weeks. Executive function: P=.005, effect size f=0.37. IGF-1 +117% (P<.001). Body fat -7.4% (P<.001). Lean mass +3.7% (P<.001). Compliance 98.7%. No serious adverse events.' },
      { study: 'Stanley TL et al. (2011) JCEM 96:150', type: 'Open-label interventional', n: 13, finding: '2 mg/day x 14 days. Mean overnight GH +0.5 ug/L (P=0.004). GH AUC +366 ug/L per 12h (P=0.005). IGF-1 +181 ug/L (P<0.0001). Insulin sensitivity (euglycemic clamp): P=0.61 (NS). Pulse frequency unchanged. All parameters return to baseline at 2-week washout.' },
      { study: 'Stanley TL et al. (2019) Lancet HIV 6:e821', type: 'RCT — HIV+ NAFLD', n: 'Not specified in upload', finding: 'Significant hepatic fat fraction reduction at 12 months 2 mg/day in HIV-positive NAFLD patients.' },
    ],

    sideEffects: '[Verified — High] Injection-site reactions (erythema, pruritus, pain): most common AE. Baker 2012: 68% of GHRH-treated vs 36% placebo reported AEs, primarily local skin reactions. More frequent in women (11/13 requiring dose adjustments were female). [Verified — Moderate] Arthralgias/myalgias: 5-10% per FDA PI. Often dose-related; resolves with dose reduction. [Verified — Moderate] Peripheral edema: common; reduce dietary sodium. No coronary adverse events observed in Baker 2012. [Verified — Low] Numbness/paresthesias: possible; IGF-1-mediated; reduce dose if persistent. [Verified — Low] Glucose: Stanley 2011 showed no significant change in fasting glucose (P=0.93) or insulin-stimulated uptake (P=0.61) at 2 weeks. HOMA-IR trended up (P=0.08, NS). Monitor HbA1c per FDA label. [Verified — High] No serious adverse events in Baker 2012 or Stanley 2011. [Verified — High] No effect on cortisol, TSH, or LH. [Rare] Hypersensitivity reactions: discontinue if rash or urticaria. [Verified — High] Contraindications: active malignancy (GH/IGF-1 may promote tumor growth); pregnancy (fetal effects uncharacterized); hypopituitarism (requires intact somatotrophs — not a substitute for rhGH in true pituitary GH deficiency). [Verified — High] No HPA-axis suppression on discontinuation — IGF-1 returns to basal within 10 weeks (Baker 2012).',

    keyReferences: [
      'Falutz J, Allas S, Blot K, et al. Metabolic effects of a growth hormone-releasing factor in patients with HIV. N Engl J Med. 2007;357(23):2359-2370. PMID 18057338.',
      'Baker LD, Barsness SM, Borson S, et al. Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults. Arch Neurol. 2012;69(11):1420-1429. doi:10.1001/archneurol.2012.1970.',
      'Stanley TL, Chen CY, Branch KL, Makimura H, Grinspoon SK. Effects of a growth hormone-releasing hormone analog on endogenous GH pulsatility and insulin sensitivity in healthy men. J Clin Endocrinol Metab. 2011;96(1):150-158.',
      'Stanley TL, Feldpausch MN, Oh J, et al. Effect of tesamorelin on visceral fat and liver fat in HIV-associated NAFLD. JAMA. 2014;312(4):380-389. PMID 25038357.',
      'U.S. Food and Drug Administration. Egrifta SV prescribing information. Theratechnologies. DailyMed.',
    ],
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

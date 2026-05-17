// src/peptides.js
// Peptide knowledge base for Vitae — Bio Precision Aging
// 
// HOW TO ADD PEPTIDES:
// Each peptide follows this structure. Add as many as needed.
// Claude reads this entire file on every Peptide Consultant query.
//
// Send your peptide list to Claude in any format (table, PDF, notes)
// and this file will be populated automatically.
 
export const PEPTIDE_KNOWLEDGE_BASE = [
  {
    name: 'BPC-157',
    fullName: 'Body Protection Compound 157',
    category: 'healing',
    goals: ['recovery', 'gut_health', 'injury', 'inflammation'],
    summary: 'Pentadecapeptide derived from human gastric juice. Robust healing and cytoprotective effects across multiple tissue types.',
    mechanism: 'Upregulates growth hormone receptor expression, promotes angiogenesis via VEGF pathway, modulates nitric oxide system, activates the FAK-paxillin pathway for wound healing.',
    benefits: [
      'Accelerates tendon, ligament, and muscle healing',
      'Gastroprotective — heals GI tract including ulcers and IBD',
      'Reduces systemic inflammation',
      'Neuroprotective effects — may aid traumatic brain injury',
      'Supports joint health',
    ],
    dosing: {
      typical: '200–500 mcg/day',
      range: '100–600 mcg/day',
      frequency: 'Once or twice daily',
      route: ['subcutaneous injection', 'intramuscular injection', 'oral (reduced bioavailability)'],
      cycle: '4–12 weeks, can be used continuously for GI conditions',
      notes: 'Inject near site of injury for targeted effect. Oral dosing effective for GI issues.',
    },
    sideEffects: 'Generally well-tolerated. Mild nausea at higher doses. No known serious adverse effects in research.',
    researchLevel: 'moderate',
    sourceNotes: 'Multiple animal studies, limited human trials. Used widely in clinical practice.',
  },
  {
    name: 'TB-500',
    fullName: 'Thymosin Beta-4 (synthetic fragment)',
    category: 'healing',
    goals: ['recovery', 'injury', 'inflammation', 'muscle_mass'],
    summary: 'Synthetic version of the naturally occurring Thymosin Beta-4 peptide. Potent tissue repair and anti-inflammatory agent.',
    mechanism: 'Sequesters actin monomers, promotes cell migration and proliferation, upregulates metalloproteinases, stimulates formation of new blood vessels.',
    benefits: [
      'Accelerates healing of muscle, tendon, ligament, and skin',
      'Reduces inflammation and scar tissue formation',
      'Promotes cardiac repair',
      'Neurological regeneration potential',
      'Improves flexibility and reduces discomfort from old injuries',
    ],
    dosing: {
      typical: '2–2.5 mg twice weekly',
      range: '1–5 mg per injection',
      frequency: '2x/week loading, then 1x/week maintenance',
      route: ['subcutaneous injection', 'intramuscular injection'],
      cycle: '4–6 week loading phase, then maintenance',
      notes: 'Often stacked with BPC-157 for synergistic healing effect.',
    },
    sideEffects: 'Mild fatigue or lethargy in some users. Head rush shortly after injection. Well-tolerated overall.',
    researchLevel: 'moderate',
    sourceNotes: 'Thymosin Beta-4 has human studies; TB-500 as isolated fragment is extrapolated.',
  },
  {
    name: 'CJC-1295',
    fullName: 'CJC-1295 (with or without DAC)',
    category: 'growth_hormone',
    goals: ['muscle_mass', 'fat_loss', 'recovery', 'sleep', 'longevity', 'anti_aging'],
    summary: 'GHRH analogue that stimulates pituitary GH release. DAC (Drug Affinity Complex) version has extended half-life.',
    mechanism: 'Binds and activates GHRH receptors on pituitary somatotrophs, stimulating pulsatile GH secretion and downstream IGF-1 production.',
    benefits: [
      'Increases GH and IGF-1 levels',
      'Promotes lean muscle mass',
      'Reduces body fat, particularly visceral',
      'Improves sleep quality (deep wave sleep)',
      'Accelerates recovery',
      'Anti-aging effects on skin, connective tissue',
    ],
    dosing: {
      typical: '1–2 mg/week (DAC version) or 100–300 mcg/day (no DAC)',
      range: 'See notes',
      frequency: 'DAC: 1–2x/week. No DAC: daily or 2–3x/week',
      route: ['subcutaneous injection'],
      cycle: '3–6 months, then break',
      notes: 'Often combined with Ipamorelin for synergistic GH pulse. No DAC version has more physiological pulsatile release.',
    },
    sideEffects: 'Water retention, mild fatigue, tingling/numbness (transient). Potential for elevated fasting glucose at higher doses.',
    researchLevel: 'high',
    sourceNotes: 'Multiple human clinical trials. Well-characterized pharmacology.',
  },
  {
    name: 'Ipamorelin',
    fullName: 'Ipamorelin',
    category: 'growth_hormone',
    goals: ['muscle_mass', 'fat_loss', 'recovery', 'sleep', 'anti_aging'],
    summary: 'Selective GH secretagogue and ghrelin mimetic. Cleanest GH release peptide — minimal cortisol/prolactin elevation.',
    mechanism: 'Selectively activates ghrelin receptor (GHS-R1a) on pituitary to stimulate GH release without significantly increasing cortisol, prolactin, or ACTH.',
    benefits: [
      'Increases GH pulse amplitude without cortisol spike',
      'Promotes lean body composition',
      'Improves sleep quality',
      'Enhances recovery',
      'Anti-aging effects',
      'Appetite stimulation at higher doses',
    ],
    dosing: {
      typical: '200–300 mcg/injection',
      range: '100–500 mcg',
      frequency: '1–3x daily, ideally fasted or pre-sleep',
      route: ['subcutaneous injection'],
      cycle: 'Can be used long-term. Cycles of 3–6 months common.',
      notes: 'Gold standard combination: CJC-1295 (no DAC) + Ipamorelin — together produce a large, physiological GH pulse. Inject 30–60 min before sleep for best results.',
    },
    sideEffects: 'Very well tolerated. Mild water retention. Tingling. Hunger at higher doses.',
    researchLevel: 'high',
    sourceNotes: 'Extensive preclinical and clinical data. Used in anti-aging medicine widely.',
  },
  {
    name: 'Semaglutide',
    fullName: 'Semaglutide (GLP-1 receptor agonist)',
    category: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'longevity'],
    summary: 'GLP-1 receptor agonist. Originally developed for type 2 diabetes (Ozempic), now widely used for weight management (Wegovy).',
    mechanism: 'Activates GLP-1 receptors in pancreas (insulin), hypothalamus (appetite suppression), and GI tract (delayed gastric emptying).',
    benefits: [
      '15–20% body weight reduction in clinical trials',
      'Significant visceral fat reduction',
      'Improves insulin sensitivity',
      'Cardiovascular risk reduction (SUSTAIN-6 trial)',
      'Emerging data on neuroprotection and longevity',
    ],
    dosing: {
      typical: '0.25–2.4 mg/week (weight management)',
      range: '0.25 mg/week starting, titrate up over 16–20 weeks',
      frequency: 'Once weekly subcutaneous injection',
      route: ['subcutaneous injection'],
      cycle: 'Chronic therapy; discontinuation leads to weight regain',
      notes: 'Titration critical to minimize GI side effects. Compounded semaglutide should be tirzepatide or semaglutide only — not mixed formulations.',
    },
    sideEffects: 'Nausea (most common), vomiting, constipation, pancreatitis risk, potential thyroid C-cell concerns (contraindicated in MEN2/medullary thyroid CA history).',
    researchLevel: 'very_high',
    sourceNotes: 'FDA approved. Extensive RCT data. STEP trials for obesity, SUSTAIN trials for T2DM.',
  },
  {
    name: 'Tirzepatide',
    fullName: 'Tirzepatide (GIP/GLP-1 dual agonist)',
    category: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'muscle_preservation'],
    summary: 'Dual GIP and GLP-1 receptor agonist. Superior weight loss efficacy vs semaglutide. FDA approved (Mounjaro for T2DM, Zepbound for obesity).',
    mechanism: 'Activates both GIP and GLP-1 receptors — dual incretin action. GIP component may preserve lean mass better than GLP-1 alone.',
    benefits: [
      '20–22.5% body weight reduction (SURMOUNT-1)',
      'Superior to semaglutide for weight loss',
      'May preserve more lean muscle mass than semaglutide',
      'Strong visceral fat reduction',
      'Excellent glycemic control',
    ],
    dosing: {
      typical: '5–15 mg/week',
      range: '2.5 mg/week starting, titrate to 5/10/15 mg',
      frequency: 'Once weekly subcutaneous injection',
      route: ['subcutaneous injection'],
      cycle: 'Chronic therapy',
      notes: 'Titrate slowly. Similar contraindications to semaglutide. SURMOUNT trial showed better outcomes vs semaglutide head-to-head.',
    },
    sideEffects: 'Similar to semaglutide but some data suggest better GI tolerability. Same thyroid/pancreas precautions.',
    researchLevel: 'very_high',
    sourceNotes: 'FDA approved. SURMOUNT and SURPASS trial series.',
  },
  {
    name: 'Epithalon',
    fullName: 'Epithalamin / Epitalon',
    category: 'longevity',
    goals: ['longevity', 'anti_aging', 'cellular_health', 'sleep', 'mitochondrial'],
    summary: 'Tetrapeptide (Ala-Glu-Asp-Gly) derived from the pineal gland. Activates telomerase — considered one of the primary longevity peptides.',
    mechanism: 'Stimulates telomerase activity, lengthening telomeres. Regulates circadian rhythm via pineal function. Antioxidant. Modulates cortisol and melatonin.',
    benefits: [
      'Telomere lengthening via telomerase activation',
      'Extended healthy lifespan in multiple animal models',
      'Improves sleep quality and normalizes circadian rhythm',
      'Antioxidant and anti-cancer properties',
      'Immune system modulation',
      'Restores melatonin production in aging pineal gland',
    ],
    dosing: {
      typical: '5–10 mg/day for 10–20 day course',
      range: '5–20 mg/day',
      frequency: 'Daily during course, 1–2x per year',
      route: ['subcutaneous injection', 'intranasal'],
      cycle: '10–20 day course, 2x/year typical. Some practitioners use shorter cycles quarterly.',
      notes: 'Cycles rather than continuous use. Significant longevity data from Russian research (Khavinson). Best used pre-sleep.',
    },
    sideEffects: 'Excellent safety profile across decades of research. Mild injection site reactions.',
    researchLevel: 'moderate',
    sourceNotes: 'Extensive Russian research (40+ years, Khavinson et al.). Limited Western RCTs but mechanistic data strong.',
  },
  {
    name: 'Selank',
    fullName: 'Selank',
    category: 'neuro',
    goals: ['mental_clarity', 'anxiety', 'fatigue', 'cognitive', 'immune'],
    summary: 'Synthetic analogue of tuftsin. Anxiolytic and nootropic peptide developed in Russia. Modulates GABA and serotonin systems.',
    mechanism: 'Stabilizes enkephalins, modulates GABA-A receptor, increases BDNF, regulates IL-6 and other cytokines, affects monoamine turnover.',
    benefits: [
      'Anxiolytic without sedation or dependence',
      'Cognitive enhancement — memory and learning',
      'Immune modulation (anti-viral properties)',
      'Reduces mental fatigue',
      'Antidepressant effects in some users',
    ],
    dosing: {
      typical: '250–500 mcg/day',
      range: '100–1000 mcg/day',
      frequency: 'Once or twice daily',
      route: ['intranasal', 'subcutaneous injection'],
      cycle: '2–4 weeks, break, repeat as needed',
      notes: 'Intranasal delivery very effective. Fast onset. Often stacked with Semax for cognitive optimization.',
    },
    sideEffects: 'Mild fatigue initially. Occasional headache. No withdrawal or dependence noted.',
    researchLevel: 'moderate',
    sourceNotes: 'Approved pharmaceutical in Russia. Multiple clinical trials. Limited Western data.',
  },
  {
    name: 'Semax',
    fullName: 'Semax (ACTH 4-7 Pro8 Gly9 Pro10)',
    category: 'neuro',
    goals: ['mental_clarity', 'cognitive', 'fatigue', 'neuroprotection', 'recovery'],
    summary: 'ACTH-derived nootropic peptide developed in Russia. One of the most studied cognitive enhancement peptides.',
    mechanism: 'Stimulates BDNF and NGF production, modulates dopaminergic and serotonergic transmission, neuroprotective via Bcl-2 pathway, improves cerebral circulation.',
    benefits: [
      'Strong cognitive enhancement — memory, focus, processing speed',
      'Neuroprotection and neuroregeneration',
      'Reduces mental fatigue',
      'Mood elevation in some users',
      'Potential benefits in stroke recovery and ADHD',
    ],
    dosing: {
      typical: '300–900 mcg/day',
      range: '200 mcg–2 mg/day',
      frequency: 'Once or twice daily, typically morning',
      route: ['intranasal'],
      cycle: '2–4 weeks on, 2 weeks off',
      notes: 'Intranasal only practical route. Noticeable cognitive effects usually within first few days.',
    },
    sideEffects: 'Mild anxiety or irritability at high doses. Transient headache. Generally well-tolerated.',
    researchLevel: 'moderate',
    sourceNotes: 'Approved pharmaceutical in Russia. Used clinically for stroke, TBI, cognitive disorders.',
  },
  {
    name: 'PT-141',
    fullName: 'Bremelanotide (PT-141)',
    category: 'sexual_health',
    goals: ['fertility', 'sexual_function', 'wellbeing'],
    summary: 'Melanocortin receptor agonist. FDA approved (Vyleesi) for hypoactive sexual desire disorder in premenopausal women. Used off-label in men for erectile dysfunction.',
    mechanism: 'Activates MC3R and MC4R in the hypothalamus and limbic system — central mechanism distinct from PDE5 inhibitors (Viagra). Works on desire, not just blood flow.',
    benefits: [
      'Increases sexual desire and arousal (both sexes)',
      'Improves erectile function in men (including those unresponsive to PDE5i)',
      'Works centrally — addresses psychological components',
      'FDA approved for women',
    ],
    dosing: {
      typical: '1–2 mg as needed',
      range: '0.5–2 mg',
      frequency: 'As needed, 45–90 min before activity',
      route: ['subcutaneous injection', 'intranasal'],
      cycle: 'As needed use',
      notes: 'Not for daily use. Tolerance develops with frequent use. Lower doses (0.5–1 mg) have better side effect profile.',
    },
    sideEffects: 'Nausea (most common, dose-dependent), facial flushing, transient blood pressure increase. Avoid in cardiovascular disease.',
    researchLevel: 'high',
    sourceNotes: 'FDA approved for HSDD in women. Extensive clinical trial data.',
  },
  {
    name: 'MOTS-c',
    fullName: 'MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c)',
    category: 'mitochondrial',
    goals: ['mitochondrial', 'longevity', 'muscle_mass', 'fat_loss', 'metabolic_health', 'cellular_health'],
    summary: 'Mitochondrial-derived peptide (MDP). Regulates metabolic homeostasis, exercise capacity, and aging. Endogenous peptide that declines with age.',
    mechanism: 'Activates AMPK pathway, improves mitochondrial function and biogenesis, regulates glucose utilization, anti-inflammatory via nuclear translocation.',
    benefits: [
      'Improves metabolic health and insulin sensitivity',
      'Mimics benefits of exercise on mitochondria',
      'Reduces age-related metabolic dysfunction',
      'Increases exercise capacity and muscle endurance',
      'Extends lifespan in animal models',
      'Anti-inflammatory effects',
    ],
    dosing: {
      typical: '5–10 mg/week',
      range: '2.5–15 mg/week',
      frequency: 'Daily or every other day',
      route: ['subcutaneous injection', 'intravenous'],
      cycle: 'Cycles of 4–8 weeks, 1–2x per year common',
      notes: 'Emerging area — protocols still being established. Exercise synergy is notable.',
    },
    sideEffects: 'Limited human data. Generally considered safe. Injection site reactions.',
    researchLevel: 'low_emerging',
    sourceNotes: 'Discovered 2013 (Lee et al., Cell Metabolism). Animal models strong, human data emerging.',
  },
  {
    name: 'Humanin',
    fullName: 'Humanin',
    category: 'mitochondrial',
    goals: ['mitochondrial', 'longevity', 'cellular_health', 'neuroprotection', 'anti_aging'],
    summary: 'Mitochondrial-derived peptide. Cytoprotective and anti-apoptotic. Declines significantly with age. Higher levels associated with longevity in centenarians.',
    mechanism: 'Activates STAT3, inhibits Bax-mediated apoptosis, activates IGF-1R signaling, anti-inflammatory via IL-6 pathway modulation.',
    benefits: [
      'Cytoprotection — protects cells from apoptotic death',
      'Neuroprotective — potential in Alzheimer\'s, Parkinson\'s',
      'Cardiovascular protection',
      'Anti-aging at cellular level',
      'Higher levels in offspring of centenarians',
      'Metabolic benefits similar to MOTS-c',
    ],
    dosing: {
      typical: '2–4 mg/week',
      range: '1–6 mg/week',
      frequency: '2–3x/week',
      route: ['subcutaneous injection'],
      cycle: 'Cycles of 4–12 weeks',
      notes: 'Often stacked with MOTS-c for comprehensive mitochondrial support.',
    },
    sideEffects: 'Very limited human data. Appears safe in studies to date.',
    researchLevel: 'low_emerging',
    sourceNotes: 'Discovered 2001 (Nishimoto et al.). Centenarian studies (Cohen et al., 2016).',
  },
  {
    name: 'Kisspeptin-10',
    fullName: 'Kisspeptin-10',
    category: 'hormonal',
    goals: ['fertility', 'hormonal_balance', 'sexual_function', 'wellbeing'],
    summary: 'Endogenous neuropeptide that activates GnRH neurons. Key regulator of the HPG axis. Used in fertility medicine.',
    mechanism: 'Activates KISS1R (GPR54) on GnRH neurons, triggering LH/FSH release and downstream sex hormone production.',
    benefits: [
      'Stimulates LH and FSH release',
      'Supports natural testosterone production in men',
      'Fertility treatment applications',
      'Regulates reproductive axis without suppression',
      'Improves sexual desire and function',
    ],
    dosing: {
      typical: '1–2 mcg/kg body weight',
      range: '0.5–3 mcg/kg',
      frequency: 'Pulsatile dosing (every 90–120 min mimics physiology) or 1–2x/day',
      route: ['subcutaneous injection', 'intravenous (clinical)'],
      cycle: 'Clinical protocols vary. Research-based use: 2–4 week cycles.',
      notes: 'Pulsatile administration is most physiological. Used in IVF protocols. Emerging fertility medicine application.',
    },
    sideEffects: 'Generally well-tolerated. Facial flushing reported. Nausea at higher doses.',
    researchLevel: 'high',
    sourceNotes: 'Extensive human clinical trial data in fertility medicine. Used clinically in UK/Europe.',
  },
];
 
// Goal categories for the questionnaire
export const OPTIMIZATION_GOALS = [
  { id: 'recovery',       label: 'Recovery & Healing',         icon: '🔄', desc: 'Injury recovery, tissue repair, post-workout' },
  { id: 'sleep',          label: 'Sleep Quality',              icon: '😴', desc: 'Deep sleep, sleep architecture, insomnia' },
  { id: 'muscle_mass',    label: 'Muscle Mass & Strength',     icon: '💪', desc: 'Lean mass, body composition, performance' },
  { id: 'weight_loss',    label: 'Weight Reduction',           icon: '⚖️', desc: 'Overall body weight reduction' },
  { id: 'visceral_fat',   label: 'Visceral Fat Reduction',     icon: '🎯', desc: 'Metabolic fat around organs' },
  { id: 'longevity',      label: 'Longevity & Anti-Aging',     icon: '⏳', desc: 'Healthspan, cellular aging, telomeres' },
  { id: 'mitochondrial',  label: 'Cellular & Mitochondrial',   icon: '⚡', desc: 'Energy production, cellular health, biogenesis' },
  { id: 'fertility',      label: 'Fertility & Hormonal',       icon: '🧬', desc: 'Reproductive health, HPG axis support' },
  { id: 'fatigue',        label: 'Physical Fatigue',           icon: '🔋', desc: 'Energy levels, chronic fatigue, stamina' },
  { id: 'mental_clarity', label: 'Mental Clarity & Cognition', icon: '🧠', desc: 'Focus, memory, mental fatigue, nootropics' },
  { id: 'inflammation',   label: 'Inflammation Reduction',     icon: '🛡️', desc: 'Chronic inflammation, autoimmune, pain' },
  { id: 'metabolic_health', label: 'Metabolic Health',         icon: '📊', desc: 'Blood sugar, insulin sensitivity, lipids' },
  { id: 'sexual_function', label: 'Sexual Health & Function',  icon: '💚', desc: 'Libido, erectile/arousal function' },
  { id: 'gut_health',     label: 'Gut & GI Health',            icon: '🌿', desc: 'IBS, leaky gut, GI healing' },
  { id: 'neuroprotection', label: 'Neuroprotection',           icon: '🔬', desc: 'Brain health, neurodegenerative prevention' },
  { id: 'anti_aging',     label: 'Skin & Connective Tissue',   icon: '✨', desc: 'Collagen, skin quality, joint health' },
];
 
// Build lookup by goal for fast matching
export const PEPTIDES_BY_GOAL = OPTIMIZATION_GOALS.reduce((acc, goal) => {
  acc[goal.id] = PEPTIDE_KNOWLEDGE_BASE.filter(p => p.goals.includes(goal.id));
  return acc;
}, {});
 
// Full knowledge base as context string for Claude
export const PEPTIDE_CONTEXT = `
PEPTIDE KNOWLEDGE BASE — Bio Precision Aging
This is the curated peptide database. Reference it for all peptide recommendations.
 
${PEPTIDE_KNOWLEDGE_BASE.map(p => `
PEPTIDE: ${p.name} (${p.fullName})
Category: ${p.category}
Goals it addresses: ${p.goals.join(', ')}
Summary: ${p.summary}
Mechanism: ${p.mechanism}
Benefits: ${p.benefits.join(' | ')}
Dosing: ${p.dosing.typical} — ${p.dosing.frequency} — Route: ${p.dosing.route.join('/')}
Dosing notes: ${p.dosing.notes}
Cycle: ${p.dosing.cycle}
Side effects: ${p.sideEffects}
Evidence level: ${p.researchLevel}
`).join('\n---\n')}
`;

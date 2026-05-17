import { useState, useEffect } from "react";

const CATEGORY_COLORS = {
  healing:         { bg: "#0d3d2e", accent: "#10b981" },
  metabolic:       { bg: "#1a2a0d", accent: "#84cc16" },
  gh_axis:         { bg: "#0d1f3d", accent: "#3b82f6" },
  sexual:          { bg: "#3d0d2a", accent: "#ec4899" },
  longevity:       { bg: "#2a0d3d", accent: "#a855f7" },
  neuro:           { bg: "#1a0d3d", accent: "#6366f1" },
  neuroprotection: { bg: "#1a0d3d", accent: "#6366f1" },
  immune:          { bg: "#0d2a3d", accent: "#0ea5e9" },
  mitochondrial:   { bg: "#3d2a0d", accent: "#f59e0b" },
  anti_aging:      { bg: "#3d1a0d", accent: "#f97316" },
  fertility:       { bg: "#0d3d1a", accent: "#22c55e" },
  gut:             { bg: "#0d3d1a", accent: "#16a34a" },
};

const RESEARCH_BADGE = {
  very_high: { color: "#10b981", label: "★★★★★ Research" },
  high:      { color: "#3b82f6", label: "★★★★ Research" },
  moderate:  { color: "#f59e0b", label: "★★★ Research" },
  emerging:  { color: "#a855f7", label: "★★ Emerging" },
};

const FILTERS = [
  { id: "all",             label: "All Peptides" },
  { id: "healing",        label: "Healing" },
  { id: "metabolic",      label: "Metabolic" },
  { id: "gh_axis",        label: "GH Axis" },
  { id: "neuroprotection",label: "Neuro" },
  { id: "neuro",          label: "Neuropeptide" },
  { id: "anti_aging",     label: "Anti-Aging" },
  { id: "longevity",      label: "Longevity" },
  { id: "immune",         label: "Immune" },
  { id: "mitochondrial",  label: "Mitochondrial" },
  { id: "sexual",         label: "Sexual Health" },
  { id: "gut",            label: "GI Health" },
];

const WARNINGS = [
  {
    icon: "🚫",
    title: "Avoid Research-Grade / Online Peptide Vendors",
    body: "Peptides sold online as research-use-only are not tested for human safety, sterility, or accurate dosing. Independent testing has shown widespread counterfeiting, contamination with endotoxins, and significant under-dosing. Self-administering these products poses serious health risks including infection, allergic reaction, and unknown systemic effects.",
  },
  {
    icon: "🏥",
    title: "Always Work with a Licensed Physician",
    body: "Peptide therapy should only be initiated under the supervision of a licensed physician who can evaluate your medical history, order appropriate labs, monitor your response, and adjust dosing safely. Self-prescribing peptides is never recommended, even those with otherwise favorable safety profiles.",
  },
  {
    icon: "💊",
    title: "Use Only an FDA-Registered 503A Compounding Pharmacy",
    body: "When your physician prescribes a compoundable peptide, ensure it is filled by a legitimate 503A compounding pharmacy licensed by your state board of pharmacy, operating under USP standards, and providing a certificate of analysis (COA) confirming purity and sterility. This is the only route that guarantees verified, human-grade product.",
  },
];

const SAFE_PATH = [
  "Consult a physician who specializes in peptide or regenerative medicine",
  "Obtain a written prescription for any compoundable peptide",
  "Fill your prescription at a 503A pharmacy and always ask for the COA",
  "Never purchase injectable peptides from online research vendors",
  "Use this guide for education only — not as a self-prescribing tool",
];

const PEPTIDES = [
  {
    id: "bpc157", name: "BPC-157", fullName: "Body Protection Compound 157",
    categoryTag: "healing", category: "Healing & Cytoprotection", icon: "🔄",
    tagline: "The most studied healing peptide in clinical use",
    regulatoryStatus: "Category 1 — Compoundable by prescription (Feb 2026)",
    researchLevel: "moderate", isResearchOnly: false,
    summary: "Synthetic 15-amino-acid pentadecapeptide isolated from human gastric juice. Over 200 preclinical publications. Heals tendons, ligaments, GI tract, burns, and nerve tissue via angiogenesis, nitric oxide modulation, and growth hormone receptor upregulation.",
    mechanism: "VEGFR2 upregulation (angiogenesis) · NO/eNOS modulation · FAK-paxillin pathway · Growth hormone receptor upregulation in fibroblasts (7x by day 3) · EGR-1/NAB2 collagen expression · Dopamine and serotonin system modulation",
    benefits: ["Accelerates tendon, ligament, and muscle healing", "Heals GI tract: ulcers, IBD, fistulas, NSAID damage", "Burn wound healing — outperforms silver sulfadiazine", "Optimizes vascular response (endothelium, thrombosis, edema)", "Neuroprotection: TBI, sciatic nerve, spinal cord", "Reduces IL-6, TNF-alpha, LTB4, TXB2, MPO", "Interstitial cystitis: 10/12 patients 100% resolved (Lee 2024)"],
    dosing: { clinical: "250-500 mcg once daily SC", community: "250 mcg BID SC (500 mcg/day)", acute: "500 mcg BID x 2 weeks, then taper", cycle: "4-6 weeks standard; break 2-4 weeks", routes: ["Subcutaneous", "Intramuscular", "Oral (GI only)"] },
    sideEffects: "Well-tolerated. Mild injection-site irritation. Transient fatigue in first few days (~10%). No serious adverse events in 500,000+ prescriptions.",
    stacks: ["BPC-157 + TB-500 (Wolverine Stack)", "BPC-157 + CJC-1295/Ipamorelin", "BPC-157 + KPV (gut)", "BPC-157 + GHK-Cu (skin/wound)"],
    humanEvidence: "3 published human studies: IV safety pilot (Lee 2025), interstitial cystitis (Lee 2024), knee pain (Lee 2021). Phase II UC trial (Ruenzi 2005) showed trend, not statistically significant vs placebo.",
    pkHalfLife: "<30 min", bioavailability: "IM: 14-19% (rats), 45-51% (dogs)",
  },
  {
    id: "tb500", name: "TB-500", fullName: "Thymosin Beta-4",
    categoryTag: "healing", category: "Healing & Recovery", icon: "⚡",
    tagline: "Systemic tissue repair and anti-inflammatory agent",
    regulatoryStatus: "Research peptide — not FDA approved",
    researchLevel: "moderate", isResearchOnly: true,
    summary: "Synthetic fragment of Thymosin Beta-4. Promotes cell migration, angiogenesis, and systemic anti-inflammation. Partner peptide to BPC-157 in the Wolverine Stack.",
    mechanism: "Actin G-monomer sequestration · Cell migration via FAK · MMP upregulation · NF-kB anti-inflammatory suppression · Angiogenesis",
    benefits: ["Accelerated muscle, tendon, ligament repair", "Systemic anti-inflammatory effects", "Cardiac repair post-injury", "Neurite outgrowth", "Hair follicle stimulation"],
    dosing: { clinical: "2-2.5 mg twice weekly SC (loading)", community: "2 mg twice weekly loading, 2 mg weekly maintenance", cycle: "4-6 weeks loading, then maintenance", routes: ["Subcutaneous", "Intramuscular"] },
    sideEffects: "Generally well-tolerated. Mild fatigue reported anecdotally.",
    stacks: ["TB-500 + BPC-157 (Wolverine Stack)"],
    humanEvidence: "Limited human data. Primarily animal studies.",
    pkHalfLife: "~2 hours", bioavailability: "IM: high",
  },
  {
    id: "ara290", name: "ARA-290", fullName: "Cibinetide (ARA-290)",
    categoryTag: "neuroprotection", category: "Neuroprotection & Metabolic", icon: "🔬",
    tagline: "Non-hematopoietic EPO analogue for neuropathic pain",
    regulatoryStatus: "Investigational — clinical trials completed",
    researchLevel: "high", isResearchOnly: true,
    summary: "Selectively activates the tissue-protective EPO receptor complex (EPOR/betacR) without stimulating red blood cell production. Strongest clinical evidence for small fiber neuropathy and sarcoidosis-related neuropathic pain.",
    mechanism: "EPOR/betacR heterodimer activation · Akt/PI3K, JAK2, STAT3 pathways · NF-kB and TNF-alpha suppression · Nerve fiber regeneration",
    benefits: ["Significant neuropathic pain reduction (RCT data)", "Small nerve fiber regeneration", "Improved insulin sensitivity", "Anti-inflammatory: reduces TNF-alpha, IL-6", "Ischemia-reperfusion protection"],
    dosing: { clinical: "4 mg once daily SC (clinical trial dose)", cycle: "4-12 weeks depending on indication", routes: ["Subcutaneous"] },
    sideEffects: "Well-tolerated in clinical trials. No erythropoietic effects.",
    stacks: ["ARA-290 + BPC-157 (nerve + tissue repair)"],
    humanEvidence: "Multiple clinical trials in sarcoidosis and small fiber neuropathy.",
    pkHalfLife: "~3-4 hours", bioavailability: "SC: ~60%",
  },
  {
    id: "aod9604", name: "AOD-9604", fullName: "Advanced Obesity Drug 9604",
    categoryTag: "metabolic", category: "Metabolic & Fat Loss", icon: "⚖️",
    tagline: "hGH lipolytic fragment without IGF-1 effects",
    regulatoryStatus: "FDA GRAS status. Compoundable.",
    researchLevel: "moderate", isResearchOnly: false,
    summary: "C-terminal fragment of hGH (residues 176-191). Retains fat-burning properties of GH without IGF-1 stimulation, insulin resistance, or growth side effects.",
    mechanism: "Beta-adrenergic receptor lipolysis · Lipogenesis inhibition (IGF-1 independent) · Proteoglycan synthesis in cartilage · Chondrocyte differentiation",
    benefits: ["Visceral and subcutaneous fat reduction", "No effect on blood glucose or insulin", "Cartilage regeneration in OA models", "Improved lipid profile"],
    dosing: { clinical: "300-500 mcg once daily SC", community: "300-500 mcg fasted AM or pre-exercise", cycle: "8-12 weeks", routes: ["Subcutaneous", "Oral (limited)"] },
    sideEffects: "Exceptionally well-tolerated. No growth or IGF-1 side effects.",
    stacks: ["AOD-9604 + Ipamorelin/CJC", "AOD-9604 + BPC-157 (intra-articular for OA)"],
    humanEvidence: "Phase II/III human trials for obesity. Safe in all studies.",
    pkHalfLife: "~30 min", bioavailability: "SC: ~90%",
  },
  {
    id: "semaglutide", name: "Semaglutide", fullName: "Semaglutide (GLP-1 RA)",
    categoryTag: "metabolic", category: "GLP-1 / Metabolic", icon: "📊",
    tagline: "Gold standard GLP-1 agonist — 15-20% weight loss",
    regulatoryStatus: "FDA-approved (Ozempic / Wegovy / Rybelsus)",
    researchLevel: "very_high", isResearchOnly: false,
    summary: "Long-acting GLP-1 receptor agonist. Gold standard for weight management and T2DM. 15-20% body weight reduction in STEP trials.",
    mechanism: "GLP-1R agonism · Insulin secretion up · Glucagon down · Delayed gastric emptying · Central appetite suppression · Cardioprotective pathways",
    benefits: ["15-20% body weight reduction", "HbA1c reduction in T2DM", "Cardiovascular risk reduction (SUSTAIN-6)", "MASH/NASH improvement", "Potential neuroprotective effects"],
    dosing: { clinical: "0.25 mg/week start, titrate to 2.4 mg/week over 16-20 weeks", cycle: "Chronic ongoing therapy", routes: ["Subcutaneous (weekly)", "Oral tablet (daily, Rybelsus)"] },
    sideEffects: "Nausea, vomiting, diarrhea during titration. Rare: pancreatitis, gallbladder disease.",
    stacks: ["Semaglutide + BPC-157 (sublingual, patented)", "Semaglutide + resistance training + protein"],
    humanEvidence: "Multiple large RCTs (STEP, SUSTAIN programs).",
    pkHalfLife: "~7 days", bioavailability: "SC: ~89%; oral: ~1%",
  },
  {
    id: "cjc_ipamorelin", name: "CJC-1295 / Ipamorelin", fullName: "CJC-1295 + Ipamorelin Stack",
    categoryTag: "gh_axis", category: "GH Axis", icon: "💪",
    tagline: "Synergistic GH pulse — GHRH + GHRP combination",
    regulatoryStatus: "Compoundable by prescription. Not FDA-approved.",
    researchLevel: "moderate", isResearchOnly: false,
    summary: "The most common GH-axis peptide stack. CJC-1295 elevates baseline GH; Ipamorelin amplifies the pulse without cortisol or prolactin side effects.",
    mechanism: "CJC-1295: GHRH receptor agonism on pituitary somatotrophs. Ipamorelin: GHSR agonism — selective, no ACTH/cortisol stimulation.",
    benefits: ["Increased GH and IGF-1 levels", "Improved body composition", "Enhanced recovery and sleep quality", "Anti-aging effects", "Joint and connective tissue improvement"],
    dosing: { clinical: "CJC-1295 (no DAC): 100-300 mcg + Ipamorelin 100-300 mcg, bedtime SC", cycle: "3-6 months, then break", routes: ["Subcutaneous"] },
    sideEffects: "Water retention, joint aches, tingling (GH-related).",
    stacks: ["CJC/Ipamorelin + BPC-157", "CJC/Ipamorelin + AOD-9604"],
    humanEvidence: "CJC-1295 human PK data published (Teichman 2006). Ipamorelin: limited human data.",
    pkHalfLife: "CJC (no DAC): 30 min; Ipamorelin: 2 hours", bioavailability: "SC: ~70-90%",
  },
  {
    id: "pt141", name: "PT-141", fullName: "Bremelanotide (PT-141)",
    categoryTag: "sexual", category: "Sexual Health", icon: "💚",
    tagline: "Central melanocortin agonist — FDA-approved for HSDD",
    regulatoryStatus: "FDA-approved as Vyleesi for HSDD in premenopausal women",
    researchLevel: "high", isResearchOnly: false,
    summary: "Melanocortin receptor agonist acting centrally to increase sexual desire. Distinct from PDE5 inhibitors — works via brain, not vascular. On-demand use.",
    mechanism: "MC3R / MC4R agonism in hypothalamus · Dopaminergic and oxytocin pathway activation",
    benefits: ["Increased sexual desire and arousal", "FDA-approved for HSDD in women", "Spontaneous erections in men (off-label)", "Central mechanism — independent of vascular function"],
    dosing: { clinical: "1.75 mg SC 45 min before activity (FDA-approved)", community: "0.5-2 mg SC or intranasal", cycle: "On-demand, max once per 24 hours", routes: ["Subcutaneous", "Intranasal (off-label)"] },
    sideEffects: "Nausea (most common), flushing, headache, transient hyperpigmentation with repeated use.",
    stacks: ["PT-141 + Kisspeptin-10", "PT-141 + Sildenafil"],
    humanEvidence: "FDA Phase III trials (Simon 2019). Well-established clinical data.",
    pkHalfLife: "~2-3 hours", bioavailability: "SC: ~100%",
  },
  {
    id: "ghkcu", name: "GHK-Cu", fullName: "Copper Peptide GHK-Cu",
    categoryTag: "anti_aging", category: "Skin & Anti-Aging", icon: "✨",
    tagline: "Copper tripeptide — collagen synthesis and skin renewal",
    regulatoryStatus: "GRAS in cosmetics. Compoundable for injectable use.",
    researchLevel: "moderate", isResearchOnly: false,
    summary: "Naturally occurring copper-binding tripeptide. Drives collagen and elastin synthesis, wound healing, and antioxidant pathways.",
    mechanism: "Copper chelation, SOD activation · Collagen/elastin synthesis up · VEGF, FGF, TGF-beta upregulation · TNF-alpha and IL-1 suppression",
    benefits: ["Skin collagen and elastin synthesis", "Wound healing acceleration", "Hair follicle stimulation", "Systemic anti-inflammatory", "Antioxidant via SOD"],
    dosing: { clinical: "1-2 mg/day SC or topical", community: "0.5-3 mg/day SC; topical 1-5% serums", cycle: "8-12 weeks", routes: ["Subcutaneous", "Topical cream/serum"] },
    sideEffects: "Excellent safety. Topical: mild irritation possible.",
    stacks: ["GHK-Cu + BPC-157 (wound/skin)", "GHK-Cu + Epithalon (anti-aging)"],
    humanEvidence: "Primarily in vitro and animal. Cosmeceutical human data available.",
    pkHalfLife: "~1 hour", bioavailability: "SC: high; topical: variable",
  },
  {
    id: "epithalon", name: "Epithalon", fullName: "Epithalamin / Epithalon",
    categoryTag: "longevity", category: "Longevity & Anti-Aging", icon: "⏳",
    tagline: "Telomerase-activating tetrapeptide from the pineal gland",
    regulatoryStatus: "Research peptide — not FDA-approved",
    researchLevel: "moderate", isResearchOnly: true,
    summary: "Pineal-derived tetrapeptide. Activates telomerase, extends telomere length, and regulates melatonin/circadian rhythms. One of the most researched anti-aging peptides in Russian geroscience.",
    mechanism: "Telomerase activation · Telomere length extension · Pineal melatonin synthesis regulation · Antioxidant pathways",
    benefits: ["Telomere extension (in vitro and animal data)", "Improved sleep via melatonin regulation", "Extended lifespan in animal models", "Retinal function preservation"],
    dosing: { clinical: "5-10 mg/day SC x 10-20 day courses", community: "5-10 mg/day, 10-20 days, 1-2x per year", cycle: "10-20 day courses, 1-2x per year", routes: ["Subcutaneous"] },
    sideEffects: "Well-tolerated. No significant adverse events.",
    stacks: ["Epithalon + GHK-Cu (anti-aging)", "Epithalon + Thymosin Alpha-1"],
    humanEvidence: "Russian clinical research (Khavinson et al). Limited Western RCT data.",
    pkHalfLife: "~30 min", bioavailability: "SC: high",
  },
  {
    id: "thymosin_alpha1", name: "Thymosin a-1", fullName: "Thymosin Alpha-1 (Zadaxin)",
    categoryTag: "immune", category: "Immune Modulation", icon: "🛡️",
    tagline: "Endogenous thymic peptide — FDA-approved in 35+ countries",
    regulatoryStatus: "FDA-approved (Zadaxin) in 35+ countries. US compoundable off-label.",
    researchLevel: "high", isResearchOnly: false,
    summary: "Endogenous thymic hormone that modulates T-cell differentiation and immune balance. Used for chronic hepatitis B/C, cancer immunotherapy, and immune deficiency.",
    mechanism: "TLR2/TLR9 agonism · Th1 differentiation up · NK cell activation · IL-2 and IFN-gamma production",
    benefits: ["Enhances T-cell immunity (Th1)", "Antiviral: hepatitis B/C, COVID-19", "Cancer immunotherapy adjuvant", "Chronic fatigue improvement", "Autoimmune modulation"],
    dosing: { clinical: "1.6 mg SC twice weekly (Zadaxin standard)", cycle: "6-12 months chronic; shorter for acute immune support", routes: ["Subcutaneous"] },
    sideEffects: "Very well-tolerated. Injection site reactions only.",
    stacks: ["Thymosin a-1 + Epithalon", "Thymosin a-1 + BPC-157"],
    humanEvidence: "Multiple large RCTs for hepatitis B/C. Clinical approval in 35+ countries.",
    pkHalfLife: "~2 hours", bioavailability: "SC: ~100%",
  },
  {
    id: "selank", name: "Selank", fullName: "Selank (TP-7)",
    categoryTag: "neuro", category: "Neuropeptide / Anxiolytic", icon: "🧠",
    tagline: "Anxiolytic neuropeptide without dependence or sedation",
    regulatoryStatus: "Registered drug in Russia. Research peptide in US.",
    researchLevel: "moderate", isResearchOnly: true,
    summary: "Synthetic tuftsin analogue with anxiolytic, nootropic, and immunomodulatory effects. No addictive potential or withdrawal.",
    mechanism: "GABA-A modulation (no dependence) · Serotonin turnover up · BDNF upregulation · Enkephalin degradation inhibition",
    benefits: ["Anxiety reduction without sedation or dependence", "Nootropic: learning, memory, attention", "Mood stabilization", "Immune modulation", "Neuroprotection"],
    dosing: { clinical: "250-500 mcg intranasal or SC, 1-2x daily", cycle: "2-4 weeks; can be used as needed", routes: ["Intranasal (preferred)", "Subcutaneous"] },
    sideEffects: "Excellent tolerability. Mild sedation at higher doses. No withdrawal.",
    stacks: ["Selank + Semax (cognitive stack)", "Selank + BPC-157"],
    humanEvidence: "Russian clinical trials. Limited Western RCT data.",
    pkHalfLife: "~15 min (intranasal)", bioavailability: "Intranasal: ~90% CNS",
  },
  {
    id: "semax", name: "Semax", fullName: "Semax (ACTH 4-10 analogue)",
    categoryTag: "neuro", category: "Neuropeptide / Cognitive", icon: "💡",
    tagline: "BDNF-stimulating nootropic for focus and neuroprotection",
    regulatoryStatus: "Registered drug in Russia. Research peptide in US.",
    researchLevel: "moderate", isResearchOnly: true,
    summary: "Synthetic ACTH 4-10 analogue. Potent BDNF and NGF upregulator. Used for cognitive enhancement, stroke recovery, and neuroprotection.",
    mechanism: "BDNF and NGF upregulation · Melanocortin receptor activation · Dopaminergic and serotonergic enhancement",
    benefits: ["BDNF upregulation — neuroplasticity, memory", "Cognitive enhancement", "Stroke recovery and neuroprotection", "Antidepressant properties", "Energy and motivation"],
    dosing: { clinical: "200-600 mcg intranasal, 1-2x daily (morning)", cycle: "2-4 weeks on, 1-2 weeks off", routes: ["Intranasal (preferred)", "Subcutaneous"] },
    sideEffects: "Generally well-tolerated. Mild anxiety at higher doses.",
    stacks: ["Semax + Selank (cognitive balance)", "Semax + BPC-157"],
    humanEvidence: "Russian clinical trials for stroke and cognitive conditions.",
    pkHalfLife: "~20 min (intranasal)", bioavailability: "Intranasal: high CNS penetration",
  },
  {
    id: "kpv", name: "KPV", fullName: "KPV Tripeptide (Lys-Pro-Val)",
    categoryTag: "gut", category: "Anti-Inflammatory / GI", icon: "🌿",
    tagline: "Alpha-MSH fragment — targeted gut anti-inflammatory",
    regulatoryStatus: "Research peptide — not FDA-approved",
    researchLevel: "moderate", isResearchOnly: true,
    summary: "C-terminal fragment of alpha-MSH. Potent intestinal anti-inflammatory with oral bioavailability. Best combined with BPC-157 for IBD and leaky gut.",
    mechanism: "MC1R/MC3R agonism · NF-kB, TNF-alpha, IL-1beta inhibition · Intestinal permeability improvement",
    benefits: ["IBD and Crohns inflammation reduction", "Gut barrier improvement", "Systemic anti-inflammatory", "Wound healing properties"],
    dosing: { clinical: "100-500 mcg oral or SC, 1-2x daily", cycle: "4-8 weeks for gut conditions", routes: ["Oral (bioavailable)", "Subcutaneous"] },
    sideEffects: "Very limited adverse event data. Appears well-tolerated.",
    stacks: ["KPV + BPC-157 (gut healing synergy)"],
    humanEvidence: "Limited — primarily in vitro and animal.",
    pkHalfLife: "~1 hour", bioavailability: "Oral: moderate; SC: high",
  },
  {
    id: "motsc", name: "MOTS-c", fullName: "Mitochondrial-Derived Peptide MOTS-c",
    categoryTag: "mitochondrial", category: "Mitochondrial / Metabolic", icon: "⚡",
    tagline: "Mitochondrial genome-encoded peptide for metabolic health",
    regulatoryStatus: "Research peptide — not FDA-approved",
    researchLevel: "emerging", isResearchOnly: true,
    summary: "Mitochondria-derived peptide naturally declining with age. Regulates insulin sensitivity, mitochondrial biogenesis, and exercise adaptation.",
    mechanism: "AMPK activation · Folate cycle regulation · Mitochondrial biogenesis · Nuclear gene expression for metabolic adaptation",
    benefits: ["Improved insulin sensitivity", "Mitochondrial biogenesis", "Enhanced exercise performance", "Anti-aging metabolic effects"],
    dosing: { clinical: "5-10 mg/week SC", cycle: "4-8 weeks; best combined with exercise", routes: ["Subcutaneous"] },
    sideEffects: "Limited data. Appears well-tolerated.",
    stacks: ["MOTS-c + SS-31 (mitochondrial dual stack)", "MOTS-c + Epithalon"],
    humanEvidence: "Early human data. Strong animal studies.",
    pkHalfLife: "~1-2 hours", bioavailability: "SC: high",
  },
  {
    id: "ss31", name: "SS-31", fullName: "Elamipretide (SS-31)",
    categoryTag: "mitochondrial", category: "Mitochondrial", icon: "🔋",
    tagline: "Cardiolipin-targeting peptide for mitochondrial restoration",
    regulatoryStatus: "Investigational — Phase III completed, NDA submitted for Barth syndrome",
    researchLevel: "high", isResearchOnly: true,
    summary: "Targets cardiolipin on the inner mitochondrial membrane. Highest-evidence mitochondrial peptide. Restores cristae architecture and improves ATP synthesis.",
    mechanism: "Cardiolipin binding · Cristae structure stabilization · Electron transport chain efficiency up · Mitochondrial ROS down",
    benefits: ["Mitochondrial function restoration", "Cardiac function improvement (HFpEF)", "Age-related muscle dysfunction reversal", "Ischemia-reperfusion protection"],
    dosing: { clinical: "0.05-0.25 mg/kg SC or IV (clinical trial)", cycle: "Ongoing; physician supervision required", routes: ["Subcutaneous", "Intravenous (clinical trials)"] },
    sideEffects: "Well-tolerated in trials. Injection site reactions.",
    stacks: ["SS-31 + MOTS-c (mitochondrial dual stack)"],
    humanEvidence: "Multiple Phase II/III trials. NDA submitted for Barth syndrome.",
    pkHalfLife: "~1 hour", bioavailability: "SC: high",
  },
];

// ── Disclaimer ──────────────────────────────────────────────────────────────
function PeptideDisclaimer() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: "linear-gradient(135deg,#1a0a00,#2a1200)", border: "1px solid #f97316", borderRadius: 14, padding: "16px 18px", marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "#f9731622", border: "1px solid #f9731644", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚠️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fed7aa", marginBottom: 4 }}>Important Safety Notice — Research-Only Peptides</div>
          <p style={{ fontSize: 12.5, color: "#c2855a", margin: 0, lineHeight: 1.55 }}>
            Some peptides in this library are <strong style={{ color: "#fb923c" }}>research-only</strong> substances and carry significant safety risks if obtained from unregulated sources.
          </p>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ background: "transparent", border: "1px solid #f9731633", borderRadius: 6, color: "#f97316", fontSize: 11, fontWeight: 700, padding: "4px 10px", cursor: "pointer", flexShrink: 0 }}>
          {expanded ? "Less ▲" : "Read More ▼"}
        </button>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, borderTop: "1px solid #f9731622", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          {WARNINGS.map(w => (
            <div key={w.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{w.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fed7aa", marginBottom: 3 }}>{w.title}</div>
                <p style={{ fontSize: 12, color: "#c2855a", margin: 0, lineHeight: 1.55 }}>{w.body}</p>
              </div>
            </div>
          ))}
          <div style={{ background: "#0d2a1a", border: "1px solid #10b98133", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", marginBottom: 8 }}>The Safe Path</div>
            {SAFE_PATH.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#6ee7b7", lineHeight: 1.5, marginBottom: 5 }}>
                <span style={{ color: "#10b981", flexShrink: 0 }}>→</span> {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Export ─────────────────────────────────────────────────────────────
export default function PeptideOverview() {
  const [showOverview, setShowOverview] = useState(false);
  const [selected, setSelected]         = useState(null);
  const [filter, setFilter]             = useState("all");
  const [search, setSearch]             = useState("");
  const [animIn, setAnimIn]             = useState(false);

  useEffect(() => {
    if (showOverview) setTimeout(() => setAnimIn(true), 30);
    else setAnimIn(false);
  }, [showOverview]);

  const filtered = PEPTIDES.filter(p => {
    const matchCat    = filter === "all" || p.categoryTag === filter;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cat   = selected ? (CATEGORY_COLORS[selected.categoryTag] || CATEGORY_COLORS.healing) : null;
  const badge = selected ? (RESEARCH_BADGE[selected.researchLevel] || RESEARCH_BADGE.moderate) : null;

  // ── Screen 1: Consultant Home ──────────────────────────────────────────────
  if (!showOverview && !selected) return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#070d12", minHeight: "100vh", color: "#e2eaf0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#64748b", fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>Vitae · Bio Precision Aging</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#f0f7ff", margin: "0 0 8px", lineHeight: 1.2 }}>Peptide Consultant</h1>
          <p style={{ color: "#64748b", fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>AI-assisted guidance for evidence-based peptide therapy. Answer a few questions to receive personalized protocol suggestions.</p>
        </div>

        <PeptideDisclaimer />

        <button
          onClick={() => setShowOverview(true)}
          style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "20px 24px", background: "linear-gradient(135deg,#0d2a1f 0%,#0a1f2e 100%)", border: "1px solid #10b981", borderRadius: 16, cursor: "pointer", textAlign: "left", transition: "all 0.2s", marginBottom: 20, boxShadow: "0 0 32px rgba(16,185,129,0.08)" }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px rgba(16,185,129,0.18)"; e.currentTarget.style.borderColor = "#34d399"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 32px rgba(16,185,129,0.08)"; e.currentTarget.style.borderColor = "#10b981"; }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🧬</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f7ff", marginBottom: 4 }}>Peptide Overview</div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>Explore our full peptide library — mechanisms, dosing, stacks, and clinical evidence for all {PEPTIDES.length} peptides</div>
          </div>
          <div style={{ color: "#10b981", fontSize: 20, flexShrink: 0 }}>→</div>
        </button>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: "#64748b", fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>Start by selecting your primary goal</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {[{icon:"🔄",label:"Recovery & Healing"},{icon:"⚖️",label:"Weight & Fat Loss"},{icon:"💪",label:"Muscle & Strength"},{icon:"🧠",label:"Mental Clarity"},{icon:"🌿",label:"Gut & GI Health"},{icon:"⏳",label:"Longevity"}].map(g => (
              <button key={g.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "#0d1820", border: "1px solid #1e2d3d", borderRadius: 12, cursor: "pointer", color: "#94a3b8", fontSize: 13, fontWeight: 500, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.color = "#e2eaf0"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d3d"; e.currentTarget.style.color = "#94a3b8"; }}
              ><span>{g.icon}</span> {g.label}</button>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 11, color: "#334155", textAlign: "center", lineHeight: 1.5 }}>For educational purposes only. Not medical advice. All peptide therapy requires physician supervision and a prescription from a licensed 503A compounding pharmacy.</p>
      </div>
    </div>
  );

  // ── Screen 2: Library Grid ─────────────────────────────────────────────────
  if (showOverview && !selected) return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#070d12", minHeight: "100vh", color: "#e2eaf0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(16px)", transition: "all 0.35s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <button onClick={() => setShowOverview(false)} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #1e2d3d", borderRadius: 8, color: "#64748b", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f0f7ff", margin: 0 }}>🧬 Peptide Library</h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{PEPTIDES.length} peptides · Select any to view full profile</p>
          </div>
          <input placeholder="Search peptides..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "9px 14px", background: "#0d1820", border: "1px solid #1e2d3d", borderRadius: 10, color: "#e2eaf0", fontSize: 13, outline: "none", width: 200 }} />
        </div>

        <div style={{ background: "#1a0a00", border: "1px solid #f9731633", borderRadius: 10, padding: "10px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#c2855a" }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span>Peptides marked <strong style={{ color: "#fb923c" }}>RESEARCH ONLY</strong> are not FDA-approved for human use. Only use compoundable peptides prescribed by a physician through a licensed 503A pharmacy.</span>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {FILTERS.map(f => {
            const active = filter === f.id;
            const color = f.id !== "all" && CATEGORY_COLORS[f.id] ? CATEGORY_COLORS[f.id].accent : "#10b981";
            return <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: active ? color + "22" : "#0d1820", border: `1px solid ${active ? color : "#1e2d3d"}`, color: active ? color : "#64748b" }}>{f.label}</button>;
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {filtered.map(p => {
            const c = CATEGORY_COLORS[p.categoryTag] || CATEGORY_COLORS.healing;
            const r = RESEARCH_BADGE[p.researchLevel] || RESEARCH_BADGE.moderate;
            return (
              <button key={p.id} onClick={() => setSelected(p)} style={{ background: "#0d1820", border: "1px solid #1e2d3d", borderRadius: 16, padding: "20px", textAlign: "left", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 12, position: "relative" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.background = c.bg; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d3d"; e.currentTarget.style.background = "#0d1820"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {p.isResearchOnly && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontWeight: 800, background: "#f9731622", color: "#fb923c", padding: "2px 7px", borderRadius: 4, border: "1px solid #f9731444" }}>RESEARCH ONLY</div>}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: c.accent + "22", border: `1px solid ${c.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.icon}</div>
                  <div style={{ flex: 1, paddingRight: p.isResearchOnly ? 70 : 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f7ff", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.3 }}>{p.fullName}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, background: c.accent + "22", color: c.accent, padding: "3px 8px", borderRadius: 6 }}>{p.category}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, background: r.color + "18", color: r.color, padding: "3px 8px", borderRadius: 6 }}>{r.label}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{p.tagline}</p>
                <div style={{ borderTop: "1px solid #1e2d3d", paddingTop: 12, display: "flex", gap: 16 }}>
                  <div><div style={{ fontSize: 10, color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>t1/2</div><div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{p.pkHalfLife}</div></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Typical Dose</div><div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{(p.dosing.clinical || p.dosing.typical || "").split("·")[0].trim()}</div></div>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "#475569" }}>No peptides match your search.</div>}
      </div>
    </div>
  );

  // ── Screen 3: Peptide Detail ───────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#070d12", minHeight: "100vh", color: "#e2eaf0" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px", animation: "fadeUp 0.3s ease" }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button onClick={() => setSelected(null)} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #1e2d3d", borderRadius: 8, color: "#64748b", cursor: "pointer", fontSize: 13 }}>← Library</button>
          <button onClick={() => { setSelected(null); setShowOverview(false); }} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #1e2d3d", borderRadius: 8, color: "#64748b", cursor: "pointer", fontSize: 13 }}>Home</button>
        </div>

        {selected.isResearchOnly && (
          <div style={{ background: "#1a0a00", border: "1px solid #f97316", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fed7aa", marginBottom: 4 }}>Research-Only Peptide</div>
              <p style={{ fontSize: 12.5, color: "#c2855a", margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: "#fb923c" }}>{selected.name}</strong> is classified as research-only and is not FDA-approved for human administration. Do not obtain this peptide from online research vendors. Consult a qualified physician before pursuing access through any channel.
              </p>
            </div>
          </div>
        )}

        <div style={{ background: `linear-gradient(135deg,${cat.bg} 0%,#0d1820 100%)`, border: `1px solid ${cat.accent}44`, borderRadius: 20, padding: "28px 28px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: cat.accent + "22", border: `1px solid ${cat.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{selected.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#f0f7ff", margin: "0 0 4px" }}>{selected.name}</h1>
              <div style={{ fontSize: 13, color: "#64748b" }}>{selected.fullName}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: cat.accent + "22", color: cat.accent, padding: "4px 10px", borderRadius: 6 }}>{selected.category}</span>
            <span style={{ fontSize: 11, fontWeight: 600, background: badge.color + "18", color: badge.color, padding: "4px 10px", borderRadius: 6 }}>{badge.label}</span>
            {selected.isResearchOnly && <span style={{ fontSize: 11, fontWeight: 800, background: "#f9731622", color: "#fb923c", padding: "4px 10px", borderRadius: 6 }}>Research Only</span>}
            <span style={{ fontSize: 11, fontWeight: 600, background: "#1e2d3d", color: "#64748b", padding: "4px 10px", borderRadius: 6 }}>t1/2 {selected.pkHalfLife}</span>
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 12px", lineHeight: 1.65 }}>{selected.summary}</p>
          <div style={{ fontSize: 11.5, color: cat.accent + "cc", background: cat.accent + "11", padding: "8px 12px", borderRadius: 8, lineHeight: 1.5 }}>
            Regulatory: {selected.regulatoryStatus}
          </div>
        </div>

        {[
          { title: "Mechanism of Action", icon: "⚙️", content: <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{selected.mechanism}</p> },
          { title: "Key Benefits", icon: "✅", content: <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>{selected.benefits.map((b, i) => <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#94a3b8", lineHeight: 1.5 }}><span style={{ color: cat.accent, flexShrink: 0, marginTop: 2 }}>+</span>{b}</li>)}</ul> },
          { title: "Dosing Protocols", icon: "💉", content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(selected.dosing).map(([key, val]) => {
                if (!val || key === "routes") return null;
                const labels = { clinical: "Clinical / Pharmacy", community: "Community Reported", acute: "Acute Injury", cycle: "Cycle Length", typical: "Typical", range: "Range" };
                return (
                  <div key={key} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: cat.accent, background: cat.accent + "18", padding: "3px 8px", borderRadius: 5, flexShrink: 0, whiteSpace: "nowrap" }}>{labels[key] || key}</span>
                    <span style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.5 }}>{val}</span>
                  </div>
                );
              })}
              {selected.dosing.routes && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                  {selected.dosing.routes.map(r => <span key={r} style={{ fontSize: 11.5, background: "#1e2d3d", color: "#94a3b8", padding: "4px 10px", borderRadius: 6 }}>{r}</span>)}
                </div>
              )}
            </div>
          )},
          { title: "Common Stacks", icon: "🔗", content: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{selected.stacks.map((s, i) => <div key={i} style={{ fontSize: 13.5, color: "#94a3b8", padding: "10px 14px", background: "#0d1820", borderRadius: 10, border: "1px solid #1e2d3d" }}>{s}</div>)}</div> },
          { title: "Side Effects & Safety", icon: "⚠️", content: <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{selected.sideEffects}</p> },
          { title: "Human Evidence", icon: "📄", content: <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{selected.humanEvidence}</p> },
        ].map(section => (
          <div key={section.title} style={{ background: "#0d1820", border: "1px solid #1e2d3d", borderRadius: 16, padding: "20px 22px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: cat.accent, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span>{section.icon}</span> {section.title}
            </div>
            {section.content}
          </div>
        ))}

        <p style={{ fontSize: 11, color: "#334155", textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>
          Educational purposes only · Not medical advice · All peptide therapy requires physician supervision and a prescription from a licensed 503A compounding pharmacy
        </p>
      </div>
    </div>
  );
}

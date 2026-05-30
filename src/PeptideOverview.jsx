import { useState, useRef, useEffect } from "react";
import { PEPTIDE_CONTEXT } from './peptides';
// ── Site color palette (matches Vitae) ──────────────────────────────────────
const C = {
  bg:        '#F2F4F7',
  card:      '#ffffff',
  border:    '#DDE3EB',
  borderGrn: '#C8DFF0',
  green1:    '#1C3D5A',
  green2:    '#2D5F8A',
  green3:    '#6B9EC8',
  greenLt:   '#EEF5FB',
  text:      '#111827',
  textMd:    '#374151',
  textSm:    '#6B7280',
  textXs:    '#9CA3AF',
  orange:    '#D97706',
  orangeLt:  '#FFFBEB',
  orangeBdr: '#FDE68A',
  red:       '#DC2626',
  redLt:     '#FEF2F2',
  blue:      '#2563EB',
  blueLt:    '#EFF6FF',
};

// ── Category config ─────────────────────────────────────────────────────────
const CAT = {
  healing:         { accent: '#2D5F8A', bg: '#EEF5FB', border: '#C8DFF0', label: 'Healing' },
  metabolic:       { accent: '#0369A1', bg: '#F0F9FF', border: '#BAE6FD', label: 'Metabolic' },
  gh_axis:         { accent: '#6D28D9', bg: '#F5F3FF', border: '#DDD6FE', label: 'GH Axis' },
  sexual:          { accent: '#BE185D', bg: '#FDF2F8', border: '#FBCFE8', label: 'Sexual Health' },
  longevity:       { accent: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', label: 'Longevity' },
  neuro:           { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuropeptide' },
  neuroprotection: { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuroprotection' },
  immune:          { accent: '#0E7490', bg: '#ECFEFF', border: '#A5F3FC', label: 'Immune' },
  mitochondrial:   { accent: '#B45309', bg: '#FFFBEB', border: '#FDE68A', label: 'Mitochondrial' },
  anti_aging:      { accent: '#B45309', bg: '#FFF7ED', border: '#FED7AA', label: 'Anti-Aging' },
  fertility:       { accent: '#2D5F8A', bg: '#EEF5FB', border: '#C8DFF0', label: 'Fertility' },
  gut:             { accent: '#2D5F8A', bg: '#EEF5FB', border: '#C8DFF0', label: 'GI Health' },
};

const RESEARCH_BADGE = {
  very_high: { color: '#065F46', bg: '#ECFDF5', label: 'Evidence: Very High' },
  high:      { color: '#1D4ED8', bg: '#EFF6FF', label: 'Evidence: High' },
  moderate:  { color: '#B45309', bg: '#FFFBEB', label: 'Evidence: Moderate' },
  emerging:  { color: '#6D28D9', bg: '#F5F3FF', label: 'Evidence: Emerging' },
};

const GOALS = [
  { icon: '🔄', label: 'Recovery & Healing',  cat: 'healing' },
  { icon: '⚖️', label: 'Weight & Fat Loss',   cat: 'metabolic' },
  { icon: '💪', label: 'Muscle & Strength',    cat: 'gh_axis' },
  { icon: '🧠', label: 'Mental Clarity',       cat: 'neuro' },
  { icon: '🌿', label: 'Gut & GI Health',      cat: 'gut' },
  { icon: '⏳', label: 'Longevity',            cat: 'longevity' },
  { icon: '🛡️', label: 'Immune Support',       cat: 'immune' },
  { icon: '⚡', label: 'Mitochondrial Health', cat: 'mitochondrial' },
];

const FILTERS = [
  { id: 'all',             label: 'All' },
  { id: 'healing',        label: 'Healing' },
  { id: 'metabolic',      label: 'Metabolic' },
  { id: 'gh_axis',        label: 'GH Axis' },
  { id: 'neuro',          label: 'Neuro' },
  { id: 'neuroprotection',label: 'Neuroprotection' },
  { id: 'anti_aging',     label: 'Anti-Aging' },
  { id: 'longevity',      label: 'Longevity' },
  { id: 'immune',         label: 'Immune' },
  { id: 'mitochondrial',  label: 'Mitochondrial' },
  { id: 'sexual',         label: 'Sexual Health' },
  { id: 'gut',            label: 'GI Health' },
];

const WARNINGS = [
  { icon: '🚫', title: 'Avoid Research-Grade / Online Peptide Vendors', body: 'Peptides sold online as research-use-only are not tested for human safety, sterility, or accurate dosing. Independent testing has shown widespread counterfeiting, contamination with endotoxins, and significant under-dosing. Self-administering these products poses serious health risks.' },
  { icon: '🏥', title: 'Always Work with a Licensed Physician', body: 'Peptide therapy should only be initiated under the supervision of a licensed physician who can evaluate your medical history, order appropriate labs, monitor your response, and adjust dosing safely.' },
  { icon: '💊', title: 'Use Only an FDA-Registered 503A Compounding Pharmacy', body: 'When your physician prescribes a compoundable peptide, ensure it is filled by a legitimate 503A compounding pharmacy licensed by your state board of pharmacy and providing a certificate of analysis (COA) confirming purity and sterility.' },
];

const PEPTIDES = [
  { id:'bpc157', name:'BPC-157', fullName:'Body Protection Compound 157', categoryTag:'healing', category:'Healing & Cytoprotection', icon:'🔄', tagline:'The most studied healing peptide in clinical use', regulatoryStatus:'Category 1 — Compoundable by prescription (Feb 2026)', researchLevel:'moderate', isResearchOnly:false, summary:'Synthetic 15-amino-acid pentadecapeptide isolated from human gastric juice. Over 200 preclinical publications. Heals tendons, ligaments, GI tract, burns, and nerve tissue via angiogenesis, nitric oxide modulation, and growth hormone receptor upregulation.', mechanism:'VEGFR2 upregulation (angiogenesis) · NO/eNOS modulation · FAK-paxillin pathway · Growth hormone receptor upregulation in fibroblasts (7x by day 3) · EGR-1/NAB2 collagen expression · Dopamine and serotonin system modulation', benefits:['Accelerates tendon, ligament, and muscle healing','Heals GI tract: ulcers, IBD, fistulas, NSAID damage','Burn wound healing — outperforms silver sulfadiazine','Optimizes vascular response across endothelium, thrombosis, and edema','Neuroprotection: TBI, sciatic nerve, spinal cord injury','Reduces IL-6, TNF-alpha, LTB4, TXB2, MPO','Interstitial cystitis: 10/12 patients 100% resolved (Lee 2024)'], dosing:{ clinical:'250-500 mcg once daily SC', community:'250 mcg BID SC (500 mcg/day total)', acute:'500 mcg BID x 2 weeks, then taper to 250 mcg BID', cycle:'4-6 weeks standard; 2-4 week break recommended', routes:['Subcutaneous','Intramuscular','Oral (GI indications only)'] }, sideEffects:'Well-tolerated. Mild injection-site irritation. Transient fatigue in first few days (~10%). No serious adverse events in 500,000+ prescriptions.', stacks:['BPC-157 + TB-500 (Wolverine Stack)','BPC-157 + CJC-1295/Ipamorelin (GH axis amplification)','BPC-157 + KPV (gut healing)','BPC-157 + GHK-Cu (skin and wound healing)'], humanEvidence:'3 published human studies: IV safety pilot (Lee 2025, n=2), interstitial cystitis pilot (Lee 2024, n=12, 10/12 resolved), knee pain (Lee 2021, n=16, 14/16 relief). Phase II UC trial (Ruenzi 2005) showed trend but not statistically significant vs placebo.', pkHalfLife:'<30 min', bioavailability:'IM: 14-19% (rats), 45-51% (dogs)' },
  { id:'tb500', name:'TB-500', fullName:'Thymosin Beta-4', categoryTag:'healing', category:'Healing & Recovery', icon:'⚡', tagline:'Systemic tissue repair and anti-inflammatory agent', regulatoryStatus:'Research peptide — not FDA approved', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic fragment of Thymosin Beta-4. Promotes cell migration, angiogenesis, and systemic anti-inflammation. Most commonly paired with BPC-157 in the Wolverine Stack.', mechanism:'Actin G-monomer sequestration · Cell migration via FAK · MMP upregulation · NF-kB anti-inflammatory suppression · Angiogenesis', benefits:['Accelerated muscle, tendon, and ligament repair','Systemic anti-inflammatory effects','Cardiac tissue repair post-injury','Neurite outgrowth support','Hair follicle stimulation'], dosing:{ clinical:'2-2.5 mg twice weekly SC (loading phase)', community:'2 mg twice weekly loading, 2 mg weekly maintenance', cycle:'4-6 weeks loading, then maintenance or break', routes:['Subcutaneous','Intramuscular'] }, sideEffects:'Generally well-tolerated. Mild fatigue reported anecdotally. Limited long-term human data.', stacks:['TB-500 + BPC-157 (Wolverine Stack — most common healing combination)'], humanEvidence:'Limited human data. Primarily animal studies. Widely used in clinical practice.', pkHalfLife:'~2 hours', bioavailability:'IM: high' },
  { id:'ara290', name:'ARA-290', fullName:'Cibinetide (ARA-290)', categoryTag:'neuroprotection', category:'Neuroprotection & Metabolic', icon:'🔬', tagline:'Non-hematopoietic EPO analogue for neuropathic pain', regulatoryStatus:'Investigational — clinical trials completed in sarcoidosis/SFN', researchLevel:'high', isResearchOnly:true, summary:'Selectively activates the tissue-protective EPO receptor complex (EPOR/betacR) without stimulating red blood cell production. Strongest clinical evidence for small fiber neuropathy and sarcoidosis-related neuropathic pain.', mechanism:'EPOR/betacR heterodimer activation · Akt/PI3K, JAK2, STAT3 pathways · NF-kB and TNF-alpha suppression · Nerve fiber regeneration', benefits:['Significant neuropathic pain reduction (RCT data)','Small nerve fiber regeneration','Improved insulin sensitivity','Anti-inflammatory: reduces TNF-alpha, IL-6','Ischemia-reperfusion protection'], dosing:{ clinical:'4 mg once daily SC (clinical trial dose)', cycle:'4-12 weeks depending on indication', routes:['Subcutaneous'] }, sideEffects:'Well-tolerated in clinical trials. No erythropoietic effects.', stacks:['ARA-290 + BPC-157 (nerve and tissue repair)'], humanEvidence:'Multiple clinical trials in sarcoidosis and small fiber neuropathy with positive results.', pkHalfLife:'~3-4 hours', bioavailability:'SC: ~60%' },
  { id:'aod9604', name:'AOD-9604', fullName:'Advanced Obesity Drug 9604', categoryTag:'metabolic', category:'Metabolic & Fat Loss', icon:'⚖️', tagline:'hGH lipolytic fragment without IGF-1 effects', regulatoryStatus:'FDA GRAS status for food use. Compoundable.', researchLevel:'moderate', isResearchOnly:false, summary:'C-terminal fragment of hGH (residues 176-191). Retains fat-burning properties of GH without IGF-1 stimulation, insulin resistance, or growth side effects. Also studied for cartilage and OA repair.', mechanism:'Beta-adrenergic receptor lipolysis · Lipogenesis inhibition (IGF-1 independent) · Proteoglycan synthesis in cartilage · Chondrocyte differentiation', benefits:['Visceral and subcutaneous fat reduction','No effect on blood glucose or insulin sensitivity','Cartilage regeneration in osteoarthritis models','Improved lipid profile'], dosing:{ clinical:'300-500 mcg once daily SC', community:'300-500 mcg fasted AM or pre-exercise', cycle:'8-12 weeks, assess results', routes:['Subcutaneous','Oral (limited bioavailability)'] }, sideEffects:'Exceptionally well-tolerated. No growth or IGF-1 side effects.', stacks:['AOD-9604 + CJC-1295/Ipamorelin (fat loss + GH axis)','AOD-9604 + BPC-157 (intra-articular for OA — physician only)'], humanEvidence:'Phase II/III human trials for obesity. Safe in all studies. GRAS status.', pkHalfLife:'~30 min', bioavailability:'SC: ~90%' },
  { id:'semaglutide', name:'Semaglutide', fullName:'Semaglutide (GLP-1 RA)', categoryTag:'metabolic', category:'GLP-1 / Metabolic', icon:'📊', tagline:'Gold standard GLP-1 agonist — 15-20% weight loss', regulatoryStatus:'FDA-approved (Ozempic / Wegovy / Rybelsus)', researchLevel:'very_high', isResearchOnly:false, summary:'Long-acting GLP-1 receptor agonist. The current gold standard for weight management and T2DM treatment. 15-20% body weight reduction in STEP trials. Weekly injection or daily oral tablet.', mechanism:'GLP-1R agonism · Insulin secretion increase · Glucagon suppression · Delayed gastric emptying · Central appetite suppression (hypothalamic) · Cardioprotective pathways', benefits:['15-20% body weight reduction (STEP trials)','HbA1c reduction in T2DM','Cardiovascular risk reduction (SUSTAIN-6)','MASH/NASH liver improvement','Potential neuroprotective effects under investigation'], dosing:{ clinical:'0.25 mg/week starting dose, titrate to 2.4 mg/week over 16-20 weeks', cycle:'Chronic ongoing therapy for weight management or T2DM', routes:['Subcutaneous injection (weekly)','Oral tablet daily (Rybelsus)'] }, sideEffects:'Nausea, vomiting, diarrhea during titration. Rare: pancreatitis, gallbladder disease. Muscle mass loss concern with rapid weight reduction.', stacks:['Semaglutide + resistance training + adequate protein (muscle preservation)','Semaglutide + BPC-157 sublingual (patented combination for GI side effects)'], humanEvidence:'Multiple large RCTs: STEP 1-4 programs, SUSTAIN program. Thousands of participants. FDA-approved.', pkHalfLife:'~7 days', bioavailability:'SC: ~89%; oral: ~1%' },
  { id:'cjc_ipamorelin', name:'CJC-1295 / Ipamorelin', fullName:'CJC-1295 + Ipamorelin Stack', categoryTag:'gh_axis', category:'GH Axis', icon:'💪', tagline:'Synergistic GH pulse — GHRH + GHRP combination', regulatoryStatus:'Compoundable by prescription. Not FDA-approved.', researchLevel:'moderate', isResearchOnly:false, summary:'The most common GH-axis peptide stack. CJC-1295 (GHRH analogue) elevates baseline GH; Ipamorelin (selective GHRP) amplifies the pulse without cortisol or prolactin side effects. Together produce 2-10x greater GH output.', mechanism:'CJC-1295: GHRH receptor agonism on pituitary somatotrophs. Ipamorelin: GHSR (ghrelin receptor) agonism — selective, no ACTH or cortisol stimulation.', benefits:['Increased GH and IGF-1 levels','Improved body composition: muscle gain and fat loss','Enhanced recovery and slow-wave sleep quality','Anti-aging effects on skin, hair, and energy','Joint and connective tissue improvement'], dosing:{ clinical:'CJC-1295 (no DAC) 100-300 mcg + Ipamorelin 100-300 mcg together, bedtime SC', cycle:'3-6 months, then break to preserve pituitary sensitivity', routes:['Subcutaneous (both peptides)'] }, sideEffects:'Water retention, joint aches, tingling (GH-related, dose-dependent). Generally mild.', stacks:['CJC/Ipamorelin + BPC-157 (BPC upregulates GHR, amplifying GH effect)','CJC/Ipamorelin + AOD-9604 (GH axis + direct fat loss)'], humanEvidence:'CJC-1295 human PK data published (Teichman 2006). Ipamorelin: animal plus limited human data.', pkHalfLife:'CJC (no DAC): ~30 min; Ipamorelin: ~2 hours', bioavailability:'SC: ~70-90%' },
  { id:'pt141', name:'PT-141', fullName:'Bremelanotide (PT-141)', categoryTag:'sexual', category:'Sexual Health', icon:'💚', tagline:'Central melanocortin agonist — FDA-approved for HSDD', regulatoryStatus:'FDA-approved as Vyleesi for HSDD in premenopausal women', researchLevel:'high', isResearchOnly:false, summary:'Melanocortin receptor agonist acting centrally on the hypothalamus to increase sexual desire. Distinct from PDE5 inhibitors — works via brain, not vascular. On-demand use for both men and women.', mechanism:'MC3R and MC4R agonism in hypothalamus · Dopaminergic and oxytocin pathway activation · Central sexual motivation drive', benefits:['Increased sexual desire and arousal in men and women','FDA-approved for HSDD in premenopausal women','Spontaneous erections in men (off-label)','Central mechanism — independent of vascular function','On-demand dosing with no daily requirement'], dosing:{ clinical:'1.75 mg SC 45 minutes before activity (FDA-approved dose)', community:'0.5-2 mg SC or intranasal', cycle:'On-demand use, maximum once per 24 hours', routes:['Subcutaneous','Intranasal (off-label)'] }, sideEffects:'Nausea (most common), flushing, headache, transient hyperpigmentation with repeated use.', stacks:['PT-141 + Kisspeptin-10 (hormonal + central desire)','PT-141 + PDE5 inhibitor (vascular + central)'], humanEvidence:'FDA Phase III trials completed (Simon 2019). Well-established clinical safety and efficacy data.', pkHalfLife:'~2-3 hours', bioavailability:'SC: ~100%' },
  { id:'ghkcu', name:'GHK-Cu', fullName:'Copper Peptide GHK-Cu', categoryTag:'anti_aging', category:'Skin & Anti-Aging', icon:'✨', tagline:'Copper tripeptide — collagen synthesis and skin renewal', regulatoryStatus:'GRAS in cosmetics. Compoundable for injectable use.', researchLevel:'moderate', isResearchOnly:false, summary:'Naturally occurring copper-binding tripeptide (Gly-His-Lys). Drives collagen and elastin synthesis, wound healing, and antioxidant pathways. Used in both topical cosmeceuticals and injectable anti-aging protocols.', mechanism:'Copper chelation activates SOD · Collagen and elastin synthesis increase · VEGF, FGF, TGF-beta upregulation · TNF-alpha and IL-1 suppression · Hair follicle activation', benefits:['Skin collagen and elastin synthesis','Wound healing acceleration','Hair follicle stimulation and regrowth support','Systemic anti-inflammatory activity','Antioxidant via superoxide dismutase (SOD) activation'], dosing:{ clinical:'1-2 mg/day SC or topical application', community:'0.5-3 mg/day SC; topical 1-5% serums twice daily', cycle:'8-12 weeks injectable; topical can be ongoing', routes:['Subcutaneous','Topical cream or serum'] }, sideEffects:'Excellent safety profile. Topical: mild irritation possible. Systemic: minimal reported adverse effects.', stacks:['GHK-Cu + BPC-157 (wound and skin healing)','GHK-Cu + Epithalon (comprehensive anti-aging protocol)'], humanEvidence:'Primarily in vitro and animal data. Extensive cosmeceutical human data for topical use. Limited injectable human trials.', pkHalfLife:'~1 hour', bioavailability:'SC: high; topical: 3-5% skin penetration' },
  { id:'epithalon', name:'Epithalon', fullName:'Epithalamin / Epithalon', categoryTag:'longevity', category:'Longevity & Anti-Aging', icon:'⏳', tagline:'Telomerase-activating tetrapeptide from the pineal gland', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'moderate', isResearchOnly:true, summary:'Pineal-derived tetrapeptide (Ala-Glu-Asp-Gly). Activates telomerase, extends telomere length, and regulates melatonin and circadian rhythms. One of the most researched anti-aging peptides in Russian geroscience literature.', mechanism:'Telomerase enzyme activation · Telomere length extension · Pineal melatonin synthesis regulation · Antioxidant pathway activation', benefits:['Telomere extension (in vitro and animal data)','Improved sleep quality via melatonin regulation','Extended lifespan in multiple animal models','Retinal function preservation','Antioxidant and immune modulation'], dosing:{ clinical:'5-10 mg/day SC for 10-20 day courses', community:'5-10 mg/day, 10-20 days, 1-2 times per year', cycle:'10-20 day courses repeated 1-2 times per year (geroscience protocol)', routes:['Subcutaneous'] }, sideEffects:'Well-tolerated in all available studies. No significant adverse events reported.', stacks:['Epithalon + GHK-Cu (anti-aging combination)','Epithalon + Thymosin Alpha-1 (immune longevity protocol)'], humanEvidence:'Russian clinical research spanning decades (Khavinson et al). Limited Western RCT data but long safety record.', pkHalfLife:'~30 min', bioavailability:'SC: high' },
  { id:'thymosin_alpha1', name:'Thymosin Alpha-1', fullName:'Thymosin Alpha-1 (Zadaxin)', categoryTag:'immune', category:'Immune Modulation', icon:'🛡️', tagline:'Endogenous thymic peptide — FDA-approved in 35+ countries', regulatoryStatus:'FDA-approved (Zadaxin) in 35+ countries. US compoundable off-label.', researchLevel:'high', isResearchOnly:false, summary:'Endogenous thymic hormone that modulates T-cell differentiation and immune balance. Used for chronic hepatitis B/C, cancer immunotherapy adjuvant, and immune deficiency states. Strongest immune peptide with established clinical protocols.', mechanism:'TLR2 and TLR9 agonism on dendritic cells · Th1 differentiation increase · NK cell activation · IL-2 and IFN-gamma production upregulation', benefits:['Enhances T-cell immunity (Th1 response)','Antiviral activity: hepatitis B/C, studied in COVID-19','Cancer immunotherapy adjuvant','Chronic fatigue and immune deficiency improvement','Autoimmune condition modulation'], dosing:{ clinical:'1.6 mg SC twice weekly (Zadaxin standard protocol)', cycle:'6-12 months for chronic conditions; shorter courses for acute immune support', routes:['Subcutaneous'] }, sideEffects:'Very well-tolerated. Injection site reactions only. Excellent clinical safety record across decades of use.', stacks:['Thymosin Alpha-1 + Epithalon (immune longevity protocol)','Thymosin Alpha-1 + BPC-157 (inflammation and immune support)'], humanEvidence:'Multiple large RCTs for hepatitis B/C. Clinical approval in 35+ countries including Zadaxin designation.', pkHalfLife:'~2 hours', bioavailability:'SC: ~100%' },
  { id:'selank', name:'Selank', fullName:'Selank (TP-7)', categoryTag:'neuro', category:'Neuropeptide / Anxiolytic', icon:'🧠', tagline:'Anxiolytic neuropeptide without dependence or sedation', regulatoryStatus:'Registered drug in Russia. Research peptide in United States.', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic tuftsin analogue with anxiolytic, nootropic, and immunomodulatory effects. No addictive potential or benzodiazepine-like withdrawal. Acts simultaneously on GABA-A, serotonin, and BDNF pathways.', mechanism:'GABA-A modulation without dependence · Serotonin turnover increase · BDNF upregulation · Enkephalin degradation inhibition · IL-6 and IL-2 mRNA stabilization', benefits:['Anxiety reduction without sedation or dependence','Nootropic effects: learning, memory, attention','Mood stabilization and emotional regulation','Immune modulation','Neuroprotection'], dosing:{ clinical:'250-500 mcg intranasal or SC, 1-2 times daily', cycle:'2-4 weeks; can be used as needed for acute anxiety', routes:['Intranasal (preferred for CNS access)','Subcutaneous'] }, sideEffects:'Excellent tolerability profile. Mild sedation at higher doses. No withdrawal effects.', stacks:['Selank + Semax (cognitive plus anxiolytic balance)','Selank + BPC-157 (neuroprotection stack)'], humanEvidence:'Russian clinical trials for anxiety conditions. Limited Western controlled trial data.', pkHalfLife:'~15 min intranasal', bioavailability:'Intranasal: ~90% CNS penetration' },
  { id:'semax', name:'Semax', fullName:'Semax (ACTH 4-10 analogue)', categoryTag:'neuro', category:'Neuropeptide / Cognitive', icon:'💡', tagline:'BDNF-stimulating nootropic for focus and neuroprotection', regulatoryStatus:'Registered drug in Russia. Research peptide in United States.', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic ACTH 4-10 analogue. Potent BDNF and NGF upregulator. Used for cognitive enhancement, stroke recovery, and neuroprotection. Stimulatory profile — morning use is preferred.', mechanism:'BDNF and NGF upregulation · Melanocortin receptor activation · Dopaminergic and serotonergic enhancement · Brain antioxidant protection', benefits:['BDNF upregulation supporting neuroplasticity and memory','Cognitive enhancement: attention, processing speed','Stroke recovery support and neuroprotection','Antidepressant and mood-elevating properties','Energy and motivation enhancement'], dosing:{ clinical:'200-600 mcg intranasal, 1-2 times daily in the morning', cycle:'2-4 weeks on, 1-2 weeks off to prevent tolerance', routes:['Intranasal (preferred)','Subcutaneous'] }, sideEffects:'Generally well-tolerated. Mild anxiety or overstimulation at higher doses. No serious adverse effects reported.', stacks:['Semax + Selank (cognitive enhancement plus anxiolytic balance)','Semax + BPC-157 (neuroprotection combination)'], humanEvidence:'Russian clinical trials for stroke recovery and cognitive conditions. Limited Western RCT data.', pkHalfLife:'~20 min intranasal', bioavailability:'Intranasal: high CNS penetration' },
  { id:'kpv', name:'KPV', fullName:'KPV Tripeptide (Lys-Pro-Val)', categoryTag:'gut', category:'Anti-Inflammatory / GI', icon:'🌿', tagline:'Alpha-MSH fragment — targeted gut anti-inflammatory', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'moderate', isResearchOnly:true, summary:'C-terminal fragment of alpha-MSH. Potent intestinal anti-inflammatory with oral bioavailability — rare for a peptide. Best combined with BPC-157 for IBD, leaky gut, and NSAID-induced GI damage.', mechanism:'MC1R and MC3R agonism · NF-kB, TNF-alpha, IL-1beta inhibition · Intestinal permeability improvement · Direct colonic epithelium action', benefits:['IBD and Crohns disease inflammation reduction','Gut barrier and leaky gut improvement','Systemic anti-inflammatory activity','Wound healing properties'], dosing:{ clinical:'100-500 mcg oral or SC, 1-2 times daily', cycle:'4-8 weeks for gut healing indications', routes:['Oral (bioavailable — rare for peptides)','Subcutaneous'] }, sideEffects:'Very limited adverse event data available. Appears well-tolerated in all studies.', stacks:['KPV + BPC-157 (gut healing synergy — most common GI stack)'], humanEvidence:'Limited — primarily in vitro and animal studies. Clinical use growing rapidly.', pkHalfLife:'~1 hour', bioavailability:'Oral: moderate; SC: high' },
  { id:'motsc', name:'MOTS-c', fullName:'Mitochondrial-Derived Peptide MOTS-c', categoryTag:'mitochondrial', category:'Mitochondrial / Metabolic', icon:'⚡', tagline:'Mitochondrial genome-encoded peptide for metabolic health', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'emerging', isResearchOnly:true, summary:'Mitochondria-derived peptide encoded in the mitochondrial genome. Naturally declines with age. Regulates insulin sensitivity, mitochondrial biogenesis, and exercise adaptation. One of the most exciting emerging longevity peptides.', mechanism:'AMPK activation · Folate cycle and purine biosynthesis regulation · Nuclear gene expression for metabolic adaptation · Mitochondrial biogenesis', benefits:['Improved insulin sensitivity and glucose metabolism','Mitochondrial biogenesis stimulation','Enhanced exercise performance and endurance','Anti-aging metabolic effects','Potential applications in T2DM management'], dosing:{ clinical:'5-10 mg/week SC', cycle:'4-8 weeks; best results when combined with regular exercise', routes:['Subcutaneous'] }, sideEffects:'Limited safety data. Appears well-tolerated in available animal and early human studies.', stacks:['MOTS-c + SS-31 (mitochondrial dual stack)','MOTS-c + Epithalon (longevity protocol)'], humanEvidence:'Early human data available. Strong AMPK and metabolic effects in animal studies.', pkHalfLife:'~1-2 hours', bioavailability:'SC: high' },
  { id:'ss31', name:'SS-31', fullName:'Elamipretide (SS-31)', categoryTag:'mitochondrial', category:'Mitochondrial', icon:'🔋', tagline:'Cardiolipin-targeting peptide for mitochondrial restoration', regulatoryStatus:'Investigational — Phase III completed, NDA submitted for Barth syndrome', researchLevel:'high', isResearchOnly:true, summary:'Targets cardiolipin on the inner mitochondrial membrane. The highest-evidence mitochondrial peptide. Restores cristae architecture, reduces electron leak, and improves ATP synthesis. Strong evidence for heart failure and skeletal muscle restoration.', mechanism:'Cardiolipin binding on inner mitochondrial membrane · Cristae structure stabilization · Electron transport chain efficiency increase · Mitochondrial ROS reduction · ATP synthesis restoration', benefits:['Mitochondrial function restoration','Cardiac function improvement in HFpEF','Age-related skeletal muscle dysfunction reversal','Ischemia-reperfusion injury protection','Energy and fatigue improvement'], dosing:{ clinical:'0.05-0.25 mg/kg SC or IV (clinical trial dosing)', cycle:'Ongoing; requires physician supervision for dosing and monitoring', routes:['Subcutaneous','Intravenous (clinical trials only)'] }, sideEffects:'Well-tolerated in Phase II/III trials. Injection site reactions are the primary adverse effect.', stacks:['SS-31 + MOTS-c (mitochondrial dual stack for comprehensive mitochondrial support)'], humanEvidence:'Multiple Phase II/III clinical trials completed. NDA submitted to FDA for Barth syndrome indication.', pkHalfLife:'~1 hour', bioavailability:'SC: high; selectively concentrates in mitochondria' },
  { id:'tirzepatide', name:'Tirzepatide', fullName:'Tirzepatide (GIP/GLP-1 Dual Agonist)', categoryTag:'metabolic', category:'GLP-1 / Metabolic', icon:'📊', tagline:'First-in-class dual GIP/GLP-1 agonist — 20-22% weight loss', regulatoryStatus:'FDA-approved (Mounjaro: T2DM; Zepbound: obesity)', researchLevel:'very_high', isResearchOnly:false, summary:'First-in-class dual GIP and GLP-1 receptor co-agonist. Superior weight loss vs semaglutide (20-22% body weight in SURMOUNT trials). GIP receptor activation adds insulin-potentiating and direct adipose tissue lipid-lowering effects beyond GLP-1 alone. Weekly subcutaneous injection.', mechanism:'GIP and GLP-1 receptor co-agonism · Insulin secretion potentiation · Glucagon suppression · Delayed gastric emptying · Central appetite suppression · Direct adipose tissue lipolysis via GIP receptor · Cardioprotective and hepatoprotective pathways', benefits:['20-22% body weight reduction (SURMOUNT-1 trial, N=2,539)','Superior glycemic control vs semaglutide in T2DM','Improved lipid profile and triglyceride reduction','Sleep apnea improvement (SURMOUNT-OSA trial)','Heart failure benefit (SUMMIT trial)','MASH/NAFLD liver fat reduction'], dosing:{ clinical:'2.5 mg/week SC · titrate to 5-15 mg/week', cycle:'Ongoing chronic therapy for weight management or T2DM', routes:['Subcutaneous injection (weekly)'] }, sideEffects:'Nausea, diarrhea, vomiting during titration. Potential muscle mass loss with rapid weight reduction — pair with resistance training and adequate protein.', stacks:['Tirzepatide + resistance training + adequate protein (muscle preservation)','Tirzepatide + Tesamorelin (complementary mechanisms for metabolic syndrome)'], humanEvidence:'SURMOUNT-1 (N=2,539): 20.9% weight loss at 72 weeks. SURMOUNT-2, 3, 4 trials. SURPASS trials for T2DM. FDA-approved 2022-2023.', pkHalfLife:'~5 days', bioavailability:'SC: ~80%' },
  { id:'sermorelin', name:'Sermorelin', fullName:'Sermorelin (GHRH 1-29)', categoryTag:'gh_axis', category:'GH Axis', icon:'💪', tagline:'First 29 amino acids of GHRH — longest safety record of any GH peptide', regulatoryStatus:'Compoundable by prescription. Previously FDA-approved (withdrawn 2008 for commercial reasons, not safety).', researchLevel:'high', isResearchOnly:false, summary:'The first 29 amino acids of endogenous GHRH. Previously FDA-approved as Geref. Longest clinical safety record of any GHRH analogue. Stimulates natural pulsatile GH release with less risk of desensitization than longer-acting analogues. Requires nightly dosing due to short half-life.', mechanism:'GHRH receptor agonism on pituitary somatotrophs · Stimulates natural pulsatile GH production and release · Shorter half-life than CJC-1295 — less receptor downregulation risk · IGF-1 elevation (dose-dependent)', benefits:['Natural pulsatile GH release — most physiological GH peptide','Improved slow-wave sleep quality and duration','Body composition improvement (gradual lean mass gain, fat reduction)','Anti-aging effects on skin, hair, and energy','Longest safety record of any GHRH analogue','Less suppression risk than longer-acting GHRH peptides'], dosing:{ clinical:'200-300 mcg SC before bed', community:'200-300 mcg SC nightly, fasted', cycle:'3-6 months minimum; lower desensitization risk than CJC-1295', routes:['Subcutaneous injection'] }, sideEffects:'Generally very well-tolerated. Mild flushing, tingling, headache possible. No significant adverse events in clinical use.', stacks:['Sermorelin + Ipamorelin (GHRH + GHRP for amplified GH pulse)','Sermorelin + BPC-157 (healing and recovery)'], humanEvidence:'FDA approval history (Geref). Multiple clinical studies in adults and children for GH deficiency. Long post-market safety record.', pkHalfLife:'<10 min', bioavailability:'SC: ~70%' },
  { id:'tesamorelin', name:'Tesamorelin', fullName:'Tesamorelin (Egrifta SV)', categoryTag:'gh_axis', category:'GH Axis / Metabolic', icon:'🎯', tagline:'Only FDA-approved GHRH analog — visceral fat reduction with preserved GH pulsatility', regulatoryStatus:'FDA-approved (Egrifta SV) for HIV lipodystrophy visceral fat. Off-label: NAFLD/MASLD, body composition, cognitive aging. Compoundable by prescription.', researchLevel:'high', isResearchOnly:false, summary:'Stabilized synthetic analog of human GHRH(1-44) with DPP-IV resistance. FDA-approved 2010. Generates a discrete pulsatile GH pulse that preserves physiological pulsatility — unlike CJC-1295 with DAC. Six peer-reviewed human trials including Phase III (N=806) establish 15-18% VAT reduction, cognitive benefits, liver enzyme normalization, and glycemic safety in T2DM.', mechanism:'GHRH receptor agonism on pituitary somatotrophs — pulsatile GH release. Higher GH receptor density in visceral adipose tissue (VAT) vs subcutaneous fat drives selective visceral lipolysis. IGF-1 elevation +117-181% within physiological range. Preserves negative IGF-1 feedback loop. GH pulsatility confirmed via AutoDecon deconvolution (Stanley 2011, JCEM).', benefits:['VAT reduction 15-18% over 26 weeks in Phase III RCT (N=806, P<0.001)','GH pulsatility preserved — pulse area increased, frequency unchanged (Stanley 2011)','VAT reduction in non-HIV obese: -19% at 12 months (Makimura 2012, N=60)','Carotid IMT reduction -6%, P=0.02 — cardiovascular benefit outside HIV','Cognitive function: executive function effect size f=0.37, P=.005 (Baker 2012, N=152)','Liver enzyme improvement: ALT -18% in VAT responders (Fourman 2017, N=806)','Glycemic safety confirmed in T2DM at 12 weeks (Clemmons 2017, N=53)'], dosing:{ clinical:'2 mg SC once daily · evening, fasted state', community:'1-2 mg SC once daily off-label', acute:'Start 1 mg SC daily, titrate to 2 mg over 2-4 weeks', cycle:'12-26 weeks off-label; continuous per FDA label for HIV lipodystrophy', routes:['Subcutaneous injection'] }, sideEffects:'Injection site reactions (common). Arthralgias/myalgias (5-10%, dose-related). Peripheral edema (common, self-limiting). Transient fasting glucose increase (monitor in T2DM). Compliance 97-99.5% in trials. Contraindicated in active malignancy.', stacks:['Tesamorelin solo for NAFLD/visceral fat (robust GH pulses alone)','Tesamorelin + Ipamorelin 200-300 mcg pre-bed (if IGF-1 suboptimal)','Tesamorelin + Semaglutide or Tirzepatide (metabolic syndrome)','MK-677 + Tesamorelin (highest IGF-1 combination — lab monitoring essential)'], humanEvidence:'6 peer-reviewed human studies. Phase III RCT N=806 (Falutz 2007/2010). Cognitive RCT N=152 (Baker 2012). GH pulsatility N=13 (Stanley 2011). Non-HIV obese RCT N=60 (Makimura 2012). Liver enzymes N=806 (Fourman 2017). T2DM safety RCT N=53 (Clemmons 2017). FDA-approved 2010.', pkHalfLife:'26-38 min', bioavailability:'SC: high (DPP-IV resistant)' },
  { id:'kisspeptin10', name:'Kisspeptin-10', fullName:'Kisspeptin-10 (KP-10)', categoryTag:'fertility', category:'Fertility & Hormonal', icon:'🧬', tagline:'HPG-axis upstream trigger — stimulates natural LH and testosterone', regulatoryStatus:'Investigational. Not FDA-approved. Research use only.', researchLevel:'moderate', isResearchOnly:true, summary:'Endogenous neuropeptide that stimulates GnRH release from the hypothalamus, driving downstream LH and FSH secretion. Acts one step upstream of Gonadorelin in the HPG axis. Used for fertility restoration and sexual function improvement via a central brain mechanism.', mechanism:'KISS1R receptor agonism on GnRH neurons in the hypothalamus · GnRH pulse triggering → pituitary LH/FSH surge → gonadal steroidogenesis · Central dopaminergic and olfactory sexual signaling', benefits:['Stimulates natural LH and testosterone production','Fertility enhancement: oocyte maturation, sperm production stimulation','HPG axis restoration in hypogonadotropic hypogonadism','Sexual desire and arousal (central brain mechanism)'], dosing:{ clinical:'50-100 mcg SC · pulsatile protocol required', cycle:'Pulsatile protocols required; design varies by indication and goal', routes:['Subcutaneous injection','Intravenous (clinical trials only)'] }, sideEffects:'Generally well-tolerated in clinical trials. Transient LH surge. Limited long-term safety data.', stacks:['Kisspeptin-10 + Gonadorelin (dual HPG axis stimulation protocol)','Kisspeptin-10 + PT-141 (central HPG + central desire)'], humanEvidence:'Multiple human clinical trials for LH stimulation and fertility. Jayasena et al. 2014 (J Clin Invest) for sexual function. Studied in hypothalamic amenorrhea and male hypogonadism.', pkHalfLife:'~2-4 min', bioavailability:'IV: 100%; SC: ~60%' },
  { id:'hcg', name:'HCG', fullName:'Human Chorionic Gonadotropin (hCG)', categoryTag:'fertility', category:'Hormonal / Fertility', icon:'🧬', tagline:'LH mimic — testicular function maintenance and fertility preservation on TRT', regulatoryStatus:'FDA-approved (Pregnyl, Novarel) for hypogonadotropic hypogonadism in males, ovulation induction in females, and cryptorchidism. TRT adjunct use is off-label. Compounding supply limited post-2024 FDA enforcement — gonadorelin is primary 2026 alternative.', researchLevel:'high', isResearchOnly:false, summary:'244-amino-acid glycoprotein LH mimic. In men, binds directly to LH receptors on testicular Leydig cells — bypassing the pituitary entirely. Stimulates intratesticular testosterone (ITT) and maintains spermatogenesis during TRT. Testosterone normalization from 0.9 to 15.1 nmol/L (P<0.001, Liu 2016, N=223) in HH populations. As of 2026, HCG compounding availability is limited — gonadorelin is the primary TRT adjunct.', mechanism:'Direct LH receptor agonism on testicular Leydig cells · cAMP → steroidogenic enzyme upregulation → intratesticular testosterone (ITT) · Bypasses hypothalamic-pituitary signaling entirely · Terminal half-life ~33-37 hours (biological effect 3-5 days per injection) · Higher estrogen conversion than gonadorelin due to stronger direct Leydig stimulation', benefits:['Testosterone normalization in HH: 0.9 to 15.1 nmol/L (P<0.001, Liu 2016, N=223)','Testicular volume restoration: 2.1 to 8.1 mL (P<0.001) in HH patients','Spermatogenesis induction with FSH: 77.8% success in Phase III (Nieschlag 2017, N=18)','Fertility: 56% paternity rate in married HH patients (Liu 2016)','TRT adjunct: preserves testicular size, fertility potential, and ITT'], dosing:{ clinical:'TRT adjunct: 250-500 IU SC 2-3x/week', community:'HH therapy: 1,500-3,000 IU SC/IM 2x/week', cycle:'HH fertility: 6-18+ months. TRT adjunct: continuous with TRT.', routes:['Subcutaneous injection','Intramuscular injection (clinical trials)'] }, sideEffects:'Well-tolerated at TRT-adjunct doses. Estradiol elevation (monitor E2). Gynecomastia 7% at HH doses. Acne 9%. Pregnancy test cross-reactivity: positive for 7-14 days post-injection. CRITICAL: dosed in IU not milligrams.', stacks:['HCG + Testosterone TRT (standard TRT adjunct for testicular preservation)','HCG + HMG or FSH (complete spermatogenesis induction in HH)'], humanEvidence:'Phase III HCG+corifollitropin alfa (Nieschlag 2017, N=18). Retrospective cohort HCG+HMG (Liu 2016, N=223). GnRH maintenance (Delemarre-van de Waal 2004, N=68). No RCT for TRT adjunct use specifically.', pkHalfLife:'~33-37 hours', bioavailability:'SC/IM: ~90%' },
  { id:'glutathione', name:'Glutathione', fullName:'Glutathione (GSH)', categoryTag:'longevity', category:'Antioxidant / Longevity', icon:'⚡', tagline:'Master antioxidant and hepatic detoxifier — injectable for systemic effect', regulatoryStatus:'Injectable glutathione NOT FDA-approved. Available via 503A compounding pharmacies with physician prescription. Oral GSH capsules near-zero systemic bioavailability.', researchLevel:'moderate', isResearchOnly:false, summary:"Tripeptide (gamma-Glutamyl-Cysteinyl-Glycine) and the body's most abundant endogenous antioxidant. Oral capsules are largely placebo for systemic effect (<5% bioavailability). Injectable IV or SC routes reliably elevate circulating and tissue GSH. Liposomal oral forms (15-30% bioavailability) are the best non-injectable option. CRITICAL: reconstituted glutathione must be used within 24 hours — sensitive to oxidation.", mechanism:"Reactive oxygen species neutralization (GSH to GSSG redox cycle, regenerated by glutathione reductase/NADPH) · Phase II hepatic detoxification: conjugates toxins for biliary/renal excretion · Tyrosinase inhibition → melanin reduction (skin-lightening mechanism) · Lymphocyte proliferation and cytokine production regulation", benefits:["Systemic antioxidant defense — most reliable via injectable routes","NAFLD/liver function: oral GSH 300 mg/day reduced ALT and hepatic fat markers (Honda 2017, N=29)","Parkinson's disease motor function improvement with IV glutathione (Sechi 1996)","Liposomal oral form elevates whole-blood GSH and immune markers (Sinha 2018, 6-month study)","Post-illness and Long COVID recovery support"], dosing:{ clinical:'SC: 200-600 mg 1-3x/week · IV: 600-1,200 mg/session', community:'SC: 200-400 mg 2-3x/week at home; IV: 600-1,200 mg at clinic', cycle:'No standard cycle. Continuous for longevity; on-demand for acute indications.', routes:['Intravenous (gold standard)','Subcutaneous injection','Liposomal oral (best non-injectable option)'] }, sideEffects:"Well-tolerated. Mild injection site stinging (low pH). Transient lightheadedness with fast IV push — slow to 5-15 minutes. CRITICAL STABILITY: Use within 24 hours of reconstitution — oxidation degrades active form.", stacks:['Glutathione + NAD+ (canonical longevity stack — inject separately, not same syringe)','Glutathione + Vitamin C high-dose IV (regenerates oxidized GSH back to active form)','Glutathione + Alpha-Lipoic Acid oral (ALA is a GSH recycling cofactor)'], humanEvidence:'Sechi 1996 (IV GSH in early Parkinsons, motor improvement). Allen & Bradley 2011 (oral GSH reduced oxidative stress biomarkers). Sinha 2018 (liposomal GSH elevated body stores, Eur J Clin Nutr). Honda 2017 (oral GSH in NAFLD, BMC Gastroenterol). Pizzorno 2014 review.', pkHalfLife:'~10 min (IV plasma)', bioavailability:'IV: 100%; SC: moderate; oral: <5%; liposomal: 15-30%' },
  { id:'nad_plus', name:'NAD+', fullName:'Nicotinamide Adenine Dinucleotide (NAD+)', categoryTag:'mitochondrial', category:'Longevity / Mitochondrial', icon:'⚡', tagline:'Central longevity coenzyme — fuels sirtuins, DNA repair, and mitochondrial function', regulatoryStatus:'Injectable NAD+ NOT FDA-approved. Available via 503A compounding pharmacies with physician prescription. Oral NAD+ capsules near-zero systemic bioavailability. NR precursor: FDA-recognized supplement.', researchLevel:'moderate', isResearchOnly:false, summary:'Coenzyme in every living cell. Cellular NAD+ falls roughly 50% by middle age (Massudi 2012, human skin biopsies). Low NAD+: sirtuins go quiet, PARP-driven DNA repair slows, mitochondria operate at reduced capacity. Oral NAD+ capsules are functionally placebo — injectable routes reliably raise circulating NAD+. NAD+ flush is rate-dependent (not dose-total dependent) — slowing the IV drip resolves it.', mechanism:'Sirtuin (SIRT1-SIRT7) activation: NAD+-dependent deacetylases regulating metabolic gene expression (Imai & Guarente 2014) · PARP enzyme substrate for DNA damage repair · CD38 ectoenzyme competition (primary driver of age-related NAD+ decline) · Redox cofactor for glycolysis, TCA cycle, and electron transport chain', benefits:['Age-related NAD+ decline: ~50% reduction by middle age in humans (Massudi 2012, PLoS One)','NR precursor reliably raises whole-blood NAD+ in healthy older adults (Martens 2018, Nat Commun)','NMN increased muscle insulin sensitivity in prediabetic postmenopausal women (Yoshino 2021, Science)','Sirtuin activation scales directly with NAD+ availability (Imai & Guarente 2014)','Speculation: human longevity endpoints — no RCT has demonstrated lifespan extension'], dosing:{ clinical:'SC: 50-100 mg daily · IV: 250-1,000 mg/session', community:'SC home use: 100 mg every other day from 500 mg vial', cycle:'Continuous for longevity. IV: loading phase 1-3x/week, then monthly maintenance.', routes:['Intravenous (highest acute peak)','Subcutaneous injection (steady elevation at fraction of IV cost)','Intramuscular'] }, sideEffects:'NAD+ Flush: facial warmth, chest pressure with rapid IV — rate-dependent, slow drip resolves it. SC produces almost no flushing. Methyl donor depletion: anxious or low mood 2-4 days post-IV — manage with TMG 500-1,000 mg daily. Injection site sting (mildly acidic).', stacks:['NAD+ + Glutathione (canonical longevity stack — inject separately)','NAD+ + TMG/betaine (mandatory methyl donor support — prevents post-IV mood dip)','NAD+ + MOTS-c (mitochondrial biogenesis complement)','NAD+ + Epithalon (telomerase and pineal axis longevity protocol)'], humanEvidence:'Massudi 2012 (50% NAD+ decline in human skin biopsies, PLoS One). Martens 2018 (NR in healthy older adults, Nat Commun). Yoshino 2021 (NMN insulin sensitivity, Science). Mehmel 2020 (injection bioavailability review, Nutrients). Imai & Guarente 2014 (sirtuin-NAD+ axis, Trends Cell Biol).', pkHalfLife:'~10 min (IV plasma)', bioavailability:'IV: 100%; SC: moderate; oral (NAD+ itself): near zero' },
  { id:'gonadorelin', name:'Gonadorelin', fullName:'Gonadorelin (Synthetic GnRH)', categoryTag:'fertility', category:'Hormonal / Fertility', icon:'🧬', tagline:'Synthetic GnRH — primary HCG alternative for testicular preservation on TRT in 2026', regulatoryStatus:'Originally FDA-approved as Factrel and Lutrepulse (both discontinued). Current TRT-adjunct use off-label via 503A compounding. Significantly easier to source than HCG in 2026. WADA Prohibited List 2026.', researchLevel:'moderate', isResearchOnly:false, summary:'Synthetic 10-amino-acid peptide identical to endogenous GnRH. Works UPSTREAM of HCG: stimulates the pituitary to release LH and FSH naturally, which then stimulate the testicles. Half-life 2-10 minutes — pulsatile dosing required (2-3x daily). Continuous dosing would paradoxically suppress the pituitary (same principle as leuprolide). Most TRT clinics have defaulted to gonadorelin for new patients in 2026.', mechanism:'GnRH receptor agonism on pituitary gonadotroph cells → endogenous LH and FSH release → Leydig cell testosterone (ITT) and Sertoli cell spermatogenesis support · Pulsatile requirement: half-life 2-10 minutes; continuous exposure causes receptor downregulation · Lower estrogen conversion than HCG — more modest ITT stimulation → less aromatization', benefits:['Testicular function preservation during TRT — upstream physiological approach','Lower estrogen conversion than HCG — fewer aromatase inhibitor requirements','No pregnancy test cross-reactivity (HCG causes false positives for 7-14 days)','Better 2026 compounding availability than HCG','FSH stimulation included (HCG stimulates LH pathway only)'], dosing:{ clinical:'200 mcg SC twice daily · morning and evening', community:'100-300 mcg SC 2-3x daily depending on goal', cycle:'Continuous with TRT for testicular preservation. Fertility: 300+ mcg 3-4x daily under specialist supervision.', routes:['Subcutaneous injection'] }, sideEffects:'Well-tolerated at TRT-adjunct doses. Mild flushing at injection time (transient). Less estrogen-related side effects than HCG. Main limitation: requires 14-21 injections per week vs 2-3 for HCG.', stacks:['Gonadorelin + Testosterone TRT (standard 2026 TRT adjunct)','Gonadorelin + FSH/HMG (active fertility under reproductive specialist supervision)'], humanEvidence:'Decades of clinical use as diagnostic GnRH stimulation test (Factrel). Hsieh 2013 (J Urol) and Coviello 2005 (JCEM) support HPG-axis preservation principle. Bhasin 2018 Endocrine Society guideline. TRT-adjunct use extrapolated from established physiology.', pkHalfLife:'2-10 min', bioavailability:'SC: ~60-80%' },
  { id:'mk677', name:'MK-677', fullName:'MK-677 (Ibutamoren Mesylate)', categoryTag:'gh_axis', category:'GH Axis / Oral Secretagogue', icon:'💪', tagline:'Only oral GH secretagogue — once-daily capsule with 24-hour GH axis effect', regulatoryStatus:'Investigational — NOT FDA-approved. Some 503A compounding pharmacies dispense capsules off-label under physician prescription (varies by state). WADA Prohibited List 2026. NOT a peptide — small-molecule spiroindoline GHS-R1a agonist.', researchLevel:'moderate', isResearchOnly:true, summary:'The only orally bioavailable GH secretagogue in widespread use — every other GH peptide requires injection. Plasma half-life 4-6 hours; biological effect on GH/IGF-1 axis lasts ~24 hours. Nass et al. Ann Intern Med 2008 (12-month RCT in elderly): IGF-1 1.5-2x baseline sustained without tachyphylaxis, fat-free mass +3 kg, HbA1c +0.3%. CRITICAL SAFETY SIGNAL: Hip-fracture trial halted 2007 due to CHF event imbalance — meaningful caution in anyone with cardiovascular disease.', mechanism:'GHS-R1a (ghrelin receptor) agonism on pituitary somatotrophs and hypothalamic neurons · Pulsatile GH secretion without meaningful pituitary suppression (confirmed in 12-month Nass trial) · IGF-1 elevation 1.5-2x baseline at 25 mg/day, sustained without tachyphylaxis · Appetite increase (ghrelin orexigenic effect) · Water retention via GH/IGF-1-induced renal sodium retention', benefits:['IGF-1 sustained 1.5-2x baseline over 12 months without tachyphylaxis (Nass 2008)','Fat-free mass +3 kg at 12 months in elderly (Nass 2008)','Oral bioavailability — eliminates injection barrier (unique in GH secretagogue class)','Bone turnover markers increased in healthy elderly (Murphy 1999)','No meaningful pituitary suppression — IGF-1 returns to baseline within 2-4 weeks of stopping'], dosing:{ clinical:'15-25 mg once daily · oral capsule', community:'Start 10 mg once daily x 2-4 weeks, titrate to 15-25 mg', cycle:'8-16 weeks on, 4-8 weeks off. Minimum 4-week off period.', routes:['Oral capsule'] }, sideEffects:'CRITICAL: CHF imbalance in elderly hip-fracture trial (Adunsky 2011) — avoid in cardiovascular disease. Increased appetite (very common). Water retention/edema (common, onset 1-3 weeks). Morning grogginess (common). Vivid dreams (common). HbA1c +0.3% at 25 mg over 12 months (Nass 2008) — monitor fasting glucose.', stacks:['MK-677 + Tesamorelin (highest IGF-1 combination — lab monitoring essential)','Avoid MK-677 + CJC/Ipamorelin (redundant goals, additive water retention)'], humanEvidence:'Nass 2008 (12-month RCT, Ann Intern Med). Adunsky 2011 (halted hip-fracture Phase IIb, CHF signal). Murphy 1999 (bone turnover, J Bone Miner Res). Sevigny 2008 (Alzheimers trial, Neurology). FDA investigational.', pkHalfLife:'4-6 hours (plasma)', bioavailability:'Oral: ~60-70% (survives GI digestion)' },
  { id:'dihexa', name:'Dihexa', fullName:'Dihexa (PNB-0408)', categoryTag:'neuro', category:'Neuropeptide / Cognitive', icon:'🧩', tagline:'Oral HGF/c-Met agonist reported 7 orders of magnitude more potent than BDNF', regulatoryStatus:'Research peptide not FDA-approved', researchLevel:'emerging', isResearchOnly:true, summary:'Oral oligopeptide variant derived from angiotensin IV. Blood-brain barrier permeable. Binds with extremely high affinity (Kd=65 pM) to HGF, potentiating c-Met receptor activity. Seven orders of magnitude more potent than BDNF in neurotrophic activity per lab studies. Cognitive support for Alzheimer disease and dementia (animal data).', mechanism:'HGF/c-Met receptor potentiation via angiotensin IV variant. BBB permeable. c-Met activation stimulates mitogenesis, motogenesis, morphogenesis, and neurogenesis. Spinogenesis induction in hippocampal neurons. Reversal of scopolamine-dependent spatial learning deficits.', benefits:['Cognitive support in Alzheimer disease and dementia (animal data)','Improved focus and mental performance','Neuroprotective: reverses spatial learning deficits in animal models','Improved cerebral blood flow','Spinogenesis induction in hippocampal neurons'], dosing:{ clinical:'10-40 mg oral daily · or topical 0.5-1 ml cream', cycle:'4-12 weeks', routes:['Oral capsule (10 mg/20 mg)','Topical cream (20 mg/ml)'] }, sideEffects:'Nervousness and irritability most common. Reported safe in recommended dosages. Limited long-term human data.', stacks:['Dihexa + Semax (dual neuroprotection)','Dihexa + BPC-157 (nerve repair)'], humanEvidence:'Primarily animal and in vitro data. Seven orders of magnitude more potent than BDNF in neurotrophic assay (McCoy et al). Limited human clinical data.', pkHalfLife:'Not well established', bioavailability:'Oral: BBB permeable; topical: transdermal penetration documented' },
  { id:'dsip', name:'DSIP', fullName:'Delta Sleep-Inducing Peptide (DSIP)', categoryTag:'neuro', category:'Sleep / Neuropeptide', icon:'🌙', tagline:'Endogenous hypothalamic nonapeptide promoting deep sleep without sedation or tolerance', regulatoryStatus:'Research peptide not FDA-approved', researchLevel:'moderate', isResearchOnly:true, summary:'Nonapeptide (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu, MW 848.34) isolated from rabbit cerebral venous blood in 1977. Synthesized in the hypothalamus. Promotes delta (slow-wave) sleep demonstrated in rabbits, mice, rats, cats, and humans. Does NOT induce classical sedation. Does NOT induce tolerance with repeated administration.', mechanism:'Promotes delta (slow-wave) and spindle EEG activity. Reduces motor activity during sleep. Synthesized in hypothalamus and targets multiple brainstem sites. No classic GABAergic sedation mechanism. May stimulate LH and testosterone.', benefits:['Promotes deep slow-wave sleep without classical sedation','No tolerance induction with repeated administration','Neuroprotective effects','Alcohol and drug detoxification and withdrawal support','No rebound insomnia upon discontinuation'], dosing:{ clinical:'100 mcg SC daily · bedtime not required', cycle:'2-4 weeks; as needed', routes:['Subcutaneous injection'] }, sideEffects:'Minimal side effects. Transient headache, nausea/vomiting, vertigo possible. Injection site reactions. Rare: erythema, transient muscle atrophy. May stimulate LH -- monitor testosterone in TRT patients.', stacks:['DSIP + Epithalon (sleep and circadian optimization)','DSIP + Selank (sleep plus anxiety)'], humanEvidence:'Demonstrated sleep promotion in human subjects (Monnier 1977, Graf 1984). No large RCTs completed.', pkHalfLife:'Short; not well established', bioavailability:'SC: high; CNS penetration documented' },
  { id:'fox04dri', name:'FOXO4-DRI', fullName:'FOXO4-D-Retro-Inverso (FOXO4-DRI)', categoryTag:'longevity', category:'Senolytic / Anti-Aging', icon:'🧬', tagline:'Senolytic D-retro-inverso peptide that selectively clears SASP-secreting senescent cells', regulatoryStatus:'Research peptide not FDA-approved. CRITICAL: Purchase TFA salt-free only.', researchLevel:'emerging', isResearchOnly:true, summary:'Cell-penetrating senolytic peptide (MW 5358.05). Selectively induces apoptosis in senescent cells by disrupting the FOXO4-p53 interaction. Senescent cells secrete SASP factors (IL-6, IL-1beta, TNF-alpha). Animal studies show reversal of aging effects. CRITICAL: Purchase TFA salt-free -- TFA contamination can cause CNS effects via glycine receptor modulation.', mechanism:'D-amino acid retro-inverso peptide targeting FOXO4-p53 interaction in senescent cells. Disrupts FOXO4-p53 complex, releasing p53 to drive apoptosis selectively in senescent cells. D-amino acid composition resists proteolysis. Most effective against high-SASP senescent cells when stacked with MOTS-c or Humanin.', benefits:['Selective apoptosis in senescent cells (animal data)','SASP suppression: IL-6, IL-1beta, IL-8, TNF-alpha','Reversal of aging effects in animal models','Male late-onset hypogonadism support','Renal protection via senescent cell removal'], dosing:{ clinical:'4 mg SC every 3 days · 4-6 weeks', cycle:'4-6 weeks; repeat 1-3x/year', routes:['Subcutaneous injection (10 mg/ml)'] }, sideEffects:'Reported safe and efficacious in recommended dosages. Injection site reactions. CRITICAL: Use TFA salt-free product only to avoid GlyR-mediated CNS effects.', stacks:['FOXO4-DRI + MOTS-c (enhanced senolysis)','FOXO4-DRI + Epithalon (longevity protocol)'], humanEvidence:'Primarily animal and in vitro data. Xu M et al (Nat Med 2018) seminal senolytic animal study. No completed human RCTs.', pkHalfLife:'Not established; D-amino acid composition resists proteolysis', bioavailability:'SC: high; cell-penetrating peptide' },
  { id:'ll37', name:'LL-37', fullName:'LL-37 (Human Cathelicidin)', categoryTag:'immune', category:'Antimicrobial / Immune', icon:'🛡️', tagline:'Only human cathelicidin -- broad-spectrum antimicrobial activated by vitamin D', regulatoryStatus:'Research peptide not FDA-approved. CRITICAL: Optimize 25-OH vitamin D above 50 ng/ml before use.', researchLevel:'moderate', isResearchOnly:true, summary:'The only known human cathelicidin antimicrobial peptide (MW 4493.33 g/mol). Active against gram (+) and gram (-) bacteria including MRSA, viruses including HIV, fungi including Candida, and mold/biotoxins (CIRS). CRITICAL: LL-37 is activated by vitamin D -- optimize 25-OH vitamin D to above 50 ng/ml. Dual-edged in cancer: caution in cancer patients.', mechanism:'Cathelicidin disrupting bacterial membranes via electrostatic pore formation. Antiviral via virion membrane disruption. Antifungal against Candida. Vitamin D required for CAMP gene expression. Immune modulation: type 1 IFN stimulation, innate immune cell activation. Wound healing via keratinocyte migration and VEGF upregulation.', benefits:['Broad-spectrum antimicrobial including MRSA','Antiviral including HIV','Antifungal: effective vs Candida','CIRS/biotoxin illness support','Chronic wound healing','GI inflammatory conditions (IBDs)','Pulmonary support: COPD, RSV'], dosing:{ clinical:'200 mcg SC daily · 6-8 weeks', cycle:'6-8 weeks; longer if needed', routes:['Subcutaneous injection (2,000 mcg/ml 5 ml)','Topical cubosome gel (wound care)'] }, sideEffects:'Reported safe in recommended dosages. Injection site reactions. CAUTION in cancer: dual tumorigenic/anti-cancer effects. May propagate inflammatory signals in autoimmune conditions. Topical: local redness and irritation.', stacks:['LL-37 + BPC-157 (wound healing and GI repair)','LL-37 + Thymosin Alpha-1 (comprehensive immune)','LL-37 + Vitamin D3 5,000 IU (required cofactor)'], humanEvidence:'Human studies for wound healing, CIRS/biotoxin illness, COPD. Limited large SC injection RCTs.', pkHalfLife:'Short; sustained via immune stimulation cascade', bioavailability:'SC: high; topical cubosome enhances penetration' },
  { id:'larazotide', name:'Larazotide', fullName:'Larazotide Acetate (AT-1001)', categoryTag:'gut', category:'GI / Tight Junction Regulator', icon:'🌿', tagline:'Zonulin-receptor antagonist closing leaky gut tight junctions', regulatoryStatus:'Investigational -- Phase 3 RCT safety comparable to placebo. Not FDA-approved.', researchLevel:'high', isResearchOnly:false, summary:'Synthetic 8-amino-acid zonulin-receptor antagonist (H-Gly-Gly-Val-Leu-Val-Gln-Pro-Gly-OH, MW 725.8). Zonulin overactivation drives leaky gut syndrome. Larazotide directly blocks this mechanism. Phase 3 human RCT (multicenter, randomized, double-blind, placebo-controlled) confirmed safety comparable to placebo. Used for leaky gut, celiac disease, IBS, Crohn disease, and ulcerative colitis.', mechanism:'Zonulin-receptor antagonism at intestinal epithelial tight junctions. Blocks zonulin-mediated tight junction opening. Decreases intestinal permeability. Improves tight junction protein expression (occludin, claudin, ZO-1). Reduces immune activation from luminal antigen translocation. Oral route with local GI action.', benefits:['Decreases intestinal permeability (leaky gut)','Improves tight junction regulation','Celiac disease: reduces persistent symptoms (Phase 3 RCT)','IBS symptom reduction','Crohn disease and ulcerative colitis support','Safety comparable to placebo in Phase 3 RCT'], dosing:{ clinical:'500 mcg oral TID · 1,500 mcg/day', cycle:'4-12 weeks; longer for chronic GI', routes:['Oral capsule'] }, sideEffects:'Safety comparable to placebo in Phase 3 human RCT. No significant adverse events at therapeutic doses in all completed studies.', stacks:['Larazotide + KPV (tight junction + anti-inflammatory)','Larazotide + BPC-157 (comprehensive gut healing)','Larazotide + KPV + BPC-157 (triple gut protocol)'], humanEvidence:'Phase 3 RCT by 9 Meters Biopharma. Phase 2: Leffler DA et al (Am J Gastroenterol 2012). Kelly CP et al (Gastroenterology 2013).', pkHalfLife:'Short; acts locally in GI tract', bioavailability:'Oral: local GI action; low systemic absorption' },
  { id:'melanotan2', name:'Melanotan II', fullName:'Melanotan II (MT-II)', categoryTag:'sexual', category:'MSH / Tanning / Metabolic', icon:'☀️', tagline:'alpha-MSH analogue for tanning, libido, and metabolic support via MC receptors', regulatoryStatus:'Research peptide not FDA-approved. CONTRAINDICATED in melanoma or skin cancer history.', researchLevel:'moderate', isResearchOnly:true, summary:'Cyclic alpha-MSH analogue (MW 1024.18) activating MC1R, MC3R, MC4R, and MC5R. Multi-indication: tanning/photoprotection (MC1R), metabolic support including lipolysis and appetite control (MC3R/MC4R), immune modulation (MC3R), and libido/sexual function (MC4R -- same pathway as PT-141). CRITICAL: Contraindicated in personal or family history of melanoma or non-melanoma skin cancer.', mechanism:'MC1R: melanocyte stimulation, increased eumelanin, photoprotection. MC3R: anti-inflammatory, metabolic regulation. MC4R: central appetite suppression, lipolysis, sexual arousal. MC5R: immune modulation. Decreases oxidative stress. Cardiovascular and neuroprotective effects.', benefits:['Tanning via melanin upregulation (MC1R)','Photoprotection: erythropoietic protoporphyria','Metabolic: lipolytic, appetite control, anti-inflammatory','Libido and sexual arousal via MC4R','Immune modulation and autoimmune support'], dosing:{ clinical:'Tanning: 300 mcg SC daily · immune: 200 mcg daily', cycle:'Tanning: 1-2 weeks loading then maintenance; immune: 6-8 weeks', routes:['Subcutaneous injection (2 mg/ml 5 ml vial)'] }, sideEffects:'Nausea, vomiting, yawning, spontaneous erections in men (approximately 2 hours). Injection site reactions. SERIOUS: Changes in melanocytic lesions reported. CONTRAINDICATED in melanoma/skin cancer history.', stacks:['Melanotan II + PT-141 (enhanced sexual arousal)','Melanotan II + BPC-157 (metabolic synergy)'], humanEvidence:'Human studies for tanning and sexual function. Clinical data for erythropoietic protoporphyria. Limited large RCTs. Widely used off-label.', pkHalfLife:'Approximately 30 minutes', bioavailability:'SC: high' },
  { id:'mgf', name:'MGF', fullName:'Mechano-Growth Factor (MGF / PEG-MGF)', categoryTag:'healing', category:'Muscle / IGF-1 Isoform', icon:'💪', tagline:'IGF-1 splice variant released by mechanical stress for muscle repair and hypertrophy', regulatoryStatus:'Research peptide not FDA-approved. WADA Prohibited List.', researchLevel:'moderate', isResearchOnly:true, summary:'IGF-1 splice variant (IGF-1Ec) released in muscle tissue in response to mechanical stress (MW 2868.19). Two forms: native MGF (half-life 5-7 minutes) and PEG-MGF (half-life 48-72 hours). WADA Prohibited. Do not use more than 10 consecutive days. Works synergistically alternated with IGF-1 LR3 -- MGF proliferates satellite cells; IGF-1 LR3 drives differentiation.', mechanism:'IGF-1 splice variant (IGF-1Ec) with unique N-terminal extension providing distinct receptor engagement from mature IGF-1. Released in response to mechanical stress in muscle. Activates satellite cells for repair and hypertrophy. Autocrine/paracrine local anabolic signaling. Bone repair via osteoclast stress response. Cardiac and neuroprotective effects.', benefits:['Muscle repair and hypertrophy post-exercise or injury','Anabolic enhancement via IGF-1Ec splice variant mechanism','Soft tissue repair: tendon, ligament, cartilage','Bone repair and growth','Cardiac support and neuroprotection'], dosing:{ clinical:'600 mcg SC post-workout · divided muscle groups', cycle:'Max 10 consecutive days; alternate with IGF-1 LR3', routes:['Subcutaneous injection'] }, sideEffects:'Generally well-tolerated. Injection site reactions. May cause water retention. WADA prohibited. Limited long-term human safety data.', stacks:['MGF + IGF-1 LR3 (alternating: proliferation then differentiation)','MGF + BPC-157 (tissue repair)','MGF + CJC-1295/Ipamorelin (GH axis + local muscle signaling)'], humanEvidence:'Primarily animal and in vitro data. Muscle repair, cardiac, and neuroprotective data in animal studies. Clinical use based on mechanism and animal evidence.', pkHalfLife:'MGF: 5-7 minutes; PEG-MGF: 48-72 hours', bioavailability:'SC: high; local tissue activity' },
  { id:'pnc27', name:'PNC-27', fullName:'PNC-27 (Anti-Cancer Peptide)', categoryTag:'longevity', category:'Investigational / Anti-Cancer', icon:'🔬', tagline:'p53 MDM-2 domain peptide selectively inducing necrosis in cancer cells via HDM-2 targeting', regulatoryStatus:'Investigational research peptide not FDA-approved. Physician supervision required.', researchLevel:'emerging', isResearchOnly:true, summary:'Anti-cancer peptide (MW 4031.7 g/mol) based on the MDM-2-binding domain of p53. Selectively inserts into membranes of cancer cells overexpressing HDM-2, forming pores leading to selective cancer cell necrosis without affecting normal cells. Research shows activity against multiple cancer types in vitro and animal models. Strictly investigational -- no completed Phase 3 human trials. Dosing is in grams.', mechanism:'MDM-2 binding domain of p53 derived peptide. Selectively targets cancer cells overexpressing HDM-2 (human MDM-2 homolog). Inserts into HDM-2-expressing cancer cell membranes forming transmembrane pores leading to selective necrosis. Does not affect normal cells lacking HDM-2 overexpression.', benefits:['Selective cancer cell necrosis via HDM-2 targeting (in vitro and animal data)','No effect on normal cells lacking HDM-2 overexpression','Broad cancer type activity across multiple cell lines in vitro'], dosing:{ clinical:'1,000-2,000 mg SC TID · 6-24 weeks', cycle:'6 weeks standard; 12-24 weeks for metastatic; physician supervised', routes:['Subcutaneous injection (5,000 mg/ml 5 ml vial)'] }, sideEffects:'Reported safe in recommended dosages per handbook. Injection site reactions. Limited human safety data. No completed Phase 3 trials. NOTE: Dose is in milligrams not micrograms.', stacks:['PNC-27 as monotherapy -- physician supervision required'], humanEvidence:'In vitro and animal data only. No completed human RCTs. Strictly investigational.', pkHalfLife:'Not well established', bioavailability:'SC: not well characterized at gram-scale doses' },
  { id:'thymulin', name:'Thymulin', fullName:'Thymulin (Nonathymulin)', categoryTag:'immune', category:'Immune / Zinc-Dependent Thymic Hormone', icon:'🛡️', tagline:'Zinc-dependent nonapeptide thymic hormone for immune support and neuroinflammation', regulatoryStatus:'Research peptide not FDA-approved. CRITICAL: Assess RBC zinc before use.', researchLevel:'moderate', isResearchOnly:true, summary:'Nonapeptide thymic hormone (H-Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn-OH, MW 3051.3) also known as Thymalin. CRITICAL: Thymulin is zinc-dependent -- immunologically active ONLY in the presence of zinc. NOT the same as Thymosin Alpha-1. Used for immune support, anti-inflammatory effects, neuroinflammation, and analgesic applications.', mechanism:'Zinc-dependent thymic nonapeptide requiring zinc for immunological activity -- inactive without zinc. Stimulates T-cell maturation and differentiation. Anti-inflammatory via cytokine modulation. Neuroinflammation suppression. Analgesic properties via neuroimmune modulation. Distinct from Thymosin Alpha-1 in structure and mechanism.', benefits:['Immune support requiring enhanced immunity','Anti-inflammatory including neuroinflammation','Analgesic properties via neuroimmune modulation','T-cell maturation and differentiation support','Thymic function support for age-related thymic involution'], dosing:{ clinical:'1 mg SC daily x 2 weeks · then 1 mg 3x/week', cycle:'2-week loading then 4-month maintenance', routes:['Subcutaneous injection'] }, sideEffects:'Reported safe in recommended dosages. Injection site reactions. Zinc deficiency renders thymulin inactive -- check RBC zinc. Limited long-term human safety data.', stacks:['Thymulin + Zinc supplementation (required cofactor)','Thymulin + Thymosin Alpha-1 (complementary immune -- different mechanisms)','Thymulin + BPC-157 (immune and repair)'], humanEvidence:'Multiple European clinical studies. Dardenne M et al extensive thymulin biology research. Used clinically in Europe for decades.', pkHalfLife:'30-60 minutes', bioavailability:'SC: high' },
  { id:'vip', name:'VIP', fullName:'Vasoactive Intestinal Peptide (VIP / Aviptadil)', categoryTag:'neuro', category:'GUT/BRAIN Axis Neuropeptide', icon:'🧠', tagline:'GUT/BRAIN axis neuropeptide for CIRS, Long COVID, autoimmunity, and pulmonary hypertension', regulatoryStatus:'Aviptadil has FDA-approved IV form for pulmonary arterial hypertension. Intranasal off-label for CIRS/Long COVID.', researchLevel:'moderate', isResearchOnly:false, summary:'28-amino-acid regulatory neuropeptide (MW 3325.8, secretin/glucagon superfamily). Also known as Aviptadil and PHM27. Produced by neural tissue, the GUT, and pancreas. Acts via VPAC1 and VPAC2 receptors. Master regulator of the GUT/BRAIN axis. Primary uses: CIRS/biotoxin illness (Shoemaker RC protocol), Long COVID neuroinflammation, autoimmunity, and pulmonary hypertension.', mechanism:'VPAC1 and VPAC2 agonism raising cAMP. Blocks peripheral innate immune activation. Raises VEGF. Restores circadian rhythm. Regulates dendritic cells and Th17 in autoimmunity. Enhances IL-10. Raises CD4+CD25+ T regulatory cells. Inhibits TGF-beta-1 by macrophages. Improves intestinal barrier. Vasodilatory: lowers pulmonary artery systolic pressure.', benefits:['CIRS and biotoxin illness: corrects inflammatory markers','Long COVID neuroinflammation support','Autoimmune modulation via Treg and Th17 regulation','Improves intestinal barrier function','CNS protection and circadian rhythm restoration','Pulmonary hypertension (Aviptadil, FDA-approved IV)','Anti-inflammatory: raises IL-10, blocks innate immune activation'], dosing:{ clinical:'50 mcg intranasal · build from 1 to 8 sprays/day', cycle:'CIRS: 6+ months; must refrigerate -- cold chain essential', routes:['Intranasal (50 mcg/0.1 ml 12 ml vial)','IV Aviptadil (FDA-approved for PAH -- physician supervised)'] }, sideEffects:'Well-tolerated via intranasal route. CRITICAL: Do not use until biotoxin exposure is remediated -- worsens inflammation if mold exposure continues. Avoid in active fungal infections. Mild nasal irritation. IV: hypotension risk -- physician supervised only.', stacks:['VIP + Larazotide (CIRS/leaky gut protocol)','VIP + BPC-157 (gut-brain axis repair)','VIP + Thymosin Alpha-1 (neuroimmune recovery)'], humanEvidence:'Shoemaker RC et al published CIRS/biotoxin VIP intranasal protocol with human outcome data. Aviptadil IV Phase 3 COVID-19 ARDS trial. Sarcoidosis inflammatory marker correction with inhaled VIP.', pkHalfLife:'1-2 minutes IV; intranasal extends CNS activity', bioavailability:'Intranasal: moderate CNS penetration; IV: approximately 100%' },
  { id:'pinealon', name:'Pinealon', fullName:'EDR Tripeptide (H-Glu-Asp-Arg-OH)', categoryTag:'neuro', category:'Neuropeptide / Cognitive', icon:'🧠', tagline:'DNA-binding neuroprotective tripeptide for cognitive support and neuronal survival', regulatoryStatus:'Research peptide not FDA-approved. Available via 503A compounding. No Western RCTs completed.', researchLevel:'low', isResearchOnly:true, summary:'Pinealon is the trade name for the synthetic tripeptide Glu-Asp-Arg (EDR), developed by V.Kh. Khavinson at the St. Petersburg Institute of Bioregulation and Gerontology. Cell- and nucleus-permeable. Binds specific DNA promoter sequences in neurons, upregulating antioxidant enzymes (SOD2, GPX1) and suppressing apoptotic signaling (caspase-3, p53 via ERK1/2). Rodent studies show reduced neuronal apoptosis in oxidative stress and hypoxia models, preserved dendritic spine morphology in Alzheimer disease models, and normalization of CNS activity in prenatal hyperhomocysteinemia. Unblinded Russian clinical reports describe symptomatic improvement in TBI and post-stroke patients. No Western RCTs. [Verified: rodent neuroprotection; Speculation: human cognitive benefit; Unknown: Western RCT evidence]', mechanism:'Cell- and nucleus-permeable tripeptide binding CCTGCC and CCAGCC DNA promoter sequences in neurons (3 sites on PPARA promoter, 5 sites on PPARG). Upregulates SOD2 and GPX1 antioxidant enzymes. Modulates ERK1/2 MAPK pathway, reducing caspase-3 and p53 proapoptotic activity. Upregulates PPARA and PPARG gene expression under stress. [Speculation] JNK, p38 kinase involvement and serotonin pathway modulation proposed but unconfirmed for EDR.', benefits:['Reduced neuronal apoptosis in oxidative-stress and hypoxia rodent models','Preserved mushroom-shaped dendritic spines in 5xFAD Alzheimer mouse hippocampal cultures','Decreased ROS and increased lag phase of MAP kinase activation in cerebellar granule cells','Normalization of CNS activity in prenatal hyperhomocysteinemia rat model','Improved memory, reduced headache, emotional balance in 72 TBI patients (uncontrolled)','Upregulation of PPARA and PPARG gene expression under physical stress in humans'], dosing:{ clinical:'100-300 mcg SC daily · 10-20 day courses', community:'0.5-2 mg IM daily (Russian clinical); 100-300 mcg SC (biohacker protocol)', cycle:'10-20 days on, repeated 2-3x per year', routes:['Subcutaneous injection','Intramuscular injection','Sublingual','Oral'] }, sideEffects:'Russian clinical literature reports rare local injection-site reactions only. No serious adverse events documented at standard doses. Long-term safety, drug interactions, and carcinogenicity completely uncharacterized in controlled human studies. [Unknown]', stacks:['Pinealon + Semax (cognitive and neuroprotection dual)','Pinealon + Epithalon (pineal axis longevity protocol — do not confuse: different sequences and mechanisms)'], humanEvidence:'Primarily rodent and in vitro data. Unblinded Russian clinical reports: 72 TBI patients (oral). Unblinded post-stroke cognitive decline reports. No peer-reviewed Western RCTs. Khavinson V et al. Molecules 2021;26:159. PMID 33396303.', pkHalfLife:'Unknown — no human PK studies', bioavailability:'SC/IM: high (cell-permeable); oral: limited data' },
];

// ── Inline formatter: **bold**, *italic* ─────────────────────────────────────
function renderInline(text, isUser) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part))     return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

// ── Parse a markdown table block into header + rows ──────────────────────────
function parseTableLines(lines) {
  const rows = lines
    .filter(l => !/^\|[\s\-\|]+\|?\s*$/.test(l.trim()))
    .map(l =>
      l.trim()
        .replace(/^\|/, '').replace(/\|$/, '')
        .split('|')
        .map(cell => cell.trim())
    );
  return { header: rows[0] || [], body: rows.slice(1) };
}

// ── Compact Markdown Renderer ────────────────────────────────────────────────
function MsgContent({ text, isUser }) {
  const color    = isUser ? '#fff' : C.textMd;
  const subColor = isUser ? 'rgba(255,255,255,0.75)' : C.textSm;
  const lines    = text.split('\n');
  const nodes    = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    if (/^[\-─]{3,}\s*$/.test(line.trim())) {
      nodes.push(<hr key={i} style={{ border: 'none', borderTop: `1px solid ${isUser ? 'rgba(255,255,255,0.2)' : C.border}`, margin: '6px 0' }} />);
      i++; continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      const lvl = line.match(/^(#{1,3})/)[1].length;
      const txt = line.replace(/^#{1,3}\s+/, '');
      nodes.push(
        <div key={i} style={{ fontWeight: 700, fontSize: lvl === 1 ? 15 : 14, color, marginTop: nodes.length ? 10 : 0, marginBottom: 1 }}>
          {renderInline(txt, isUser)}
        </div>
      );
      i++; continue;
    }

    if (/^\|/.test(line.trim())) {
      const tableLines = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        tableLines.push(lines[i]);
        i++;
      }
      const { header, body } = parseTableLines(tableLines);
      const thBg    = isUser ? 'rgba(255,255,255,0.15)' : C.greenLt;
      const thColor = isUser ? '#fff' : C.green1;
      const bdColor = isUser ? 'rgba(255,255,255,0.12)' : C.border;
      nodes.push(
        <div key={`tbl-${i}`} style={{ overflowX: 'auto', margin: '6px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            {header.length > 0 && (
              <thead>
                <tr>
                  {header.map((h, hi) => (
                    <th key={hi} style={{ background: thBg, color: thColor, fontWeight: 700, padding: '6px 12px', textAlign: 'left', borderBottom: `2px solid ${bdColor}`, whiteSpace: 'nowrap' }}>
                      {renderInline(h, isUser)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : (isUser ? 'rgba(255,255,255,0.06)' : '#f9fafb') }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '5px 12px', color: ci === 0 ? color : subColor, borderBottom: `1px solid ${bdColor}`, lineHeight: 1.4, verticalAlign: 'top', fontWeight: ci === 0 ? 600 : 400 }}>
                      {renderInline(cell, isUser)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^[\-\*•]\s/.test(line.trim())) {
      const bullets = [];
      while (i < lines.length && /^[\-\*•]\s/.test(lines[i].trim())) {
        bullets.push(lines[i].trim().replace(/^[\-\*•]\s+/, ''));
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} style={{ margin: '4px 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {bullets.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: 8, fontSize: 13.5, color, lineHeight: 1.45 }}>
              <span style={{ color: isUser ? 'rgba(255,255,255,0.6)' : C.green3, flexShrink: 0, marginTop: 1 }}>•</span>
              <span>{renderInline(b, isUser)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      nodes.push(
        <ol key={`ol-${i}`} style={{ margin: '4px 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: 8, fontSize: 13.5, color, lineHeight: 1.45 }}>
              <span style={{ color: isUser ? 'rgba(255,255,255,0.6)' : C.green3, flexShrink: 0, fontWeight: 600, minWidth: 18 }}>{bi + 1}.</span>
              <span>{renderInline(b, isUser)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    nodes.push(
      <p key={i} style={{ margin: '2px 0', fontSize: 13.5, color, lineHeight: 1.55 }}>
        {renderInline(line, isUser)}
      </p>
    );
    i++;
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>{nodes}</div>;
}

// ── AI Chat Component ────────────────────────────────────────────────────────
function PeptideAIChat({ onBack }) {
  const [msgs, setMsgs]   = useState([{ role: 'assistant', content: 'Hello! I am your Peptide AI Consultant — powered by Bio Precision Aging\'s proprietary clinical formulary.\n\nAsk me anything: mechanisms, dosing protocols, stacking strategies, evidence grades, or which peptides fit your goals.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy]   = useState(false);
  const [sources, setSources] = useState({ clinicalWeb: true, literature: true, peptideKB: true });
  const [showLibMenu, setShowLibMenu] = useState(false);
  const [myLibrary, setMyLibrary] = useState([]);
  const libInputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  useEffect(() => {
    if (!showLibMenu) return;
    const close = (e) => { if (!e.target.closest('.p-src-bar') && !e.target.closest('.p-lib-menu')) setShowLibMenu(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [showLibMenu]);

  const addToLibrary = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.type === 'text/plain') {
        setMyLibrary(prev => [...prev, { name: file.name, text: e.target.result.slice(0, 12000) }]);
      } else {
        setMyLibrary(prev => [...prev, { name: file.name, b64: e.target.result.split(',')[1], type: file.type }]);
      }
    };
    if (file.type === 'text/plain') reader.readAsText(file); else reader.readAsDataURL(file);
    if (libInputRef.current) libInputRef.current.value = '';
  };

  const send = async (quickQ) => {
    const text = (quickQ || input).trim();
    if (!text || busy) return;
    const fullHistory = [...msgs, { role: 'user', content: text }];
    setMsgs(fullHistory);
    const history = fullHistory.slice(-8);
    setInput('');
    setBusy(true);
    try {
      const libText = myLibrary.map(d => `[Library: ${d.name}]\n${d.text || ''}`).join('\n\n') || null;
      const systemPrompt = `You are a Peptide Medicine Consultant with deep expertise in peptide therapeutics, longevity medicine, sports medicine, and regenerative medicine. You provide evidence-based guidance grounded in peer-reviewed literature.

STEP 1 — ANSWER FROM THIS KNOWLEDGE BASE FIRST
The following is your curated peptide formulary. Always check here first before searching any external source. If the answer is fully contained here, do NOT search — answer directly and cite the relevant peptide entry.

${PEPTIDE_CONTEXT}

${libText ? `\nCLINICIAN LIBRARY DOCUMENTS:\n${libText}\n` : ''}

STEP 2 — USE PUBMED SEARCH ONLY WHEN NEEDED
Search PubMed or literature sources ONLY if:
- The question involves a peptide not in the knowledge base above
- The user asks for a specific study, trial, or citation not included above
- The question asks for the very latest data that may post-date this formulary
- The question requires comparative evidence across multiple peptides

CLINICAL RULES (always follow)
- Always recommend physician supervision and 503A compounding pharmacy sourcing
- Clearly distinguish: FDA-approved vs compoundable vs research-only
- Label evidence quality: [Verified] for established data, [Emerging] for limited data, [Theoretical] for proposed mechanisms
- Provide specific dosing, cycling, and stacking guidance when asked
- Never diagnose or prescribe — educate and guide clinicians
- Flag research-only peptides and advise against unregulated online sources
- End every clinical response with: "Always consult a licensed physician before starting any peptide protocol."`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1500,
          system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
          messages: history,
          _sources: { clinicalWeb: sources.clinicalWeb, literature: sources.literature },
        }),
      });
      const data = await response.json();
      const reply = data.mergedText || data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setBusy(false);
    }
  };

  const quickQs = ['Best peptides for healing & recovery?','BPC-157 vs TB-500 — key differences?','CJC-1295 + Ipamorelin dosing protocol','How do I stack peptides safely?','What labs should I monitor on peptides?','Semaglutide vs Tirzepatide comparison'];

  const srcBtnStyle = (on) => ({
    display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px',
    borderRadius: 20, fontSize: 12, border: `1.5px solid ${on ? C.green1 : C.border}`,
    background: on ? C.greenLt : C.card, color: on ? C.green1 : C.textSm,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', whiteSpace: 'nowrap',
  });

  const toggleStyle = (on) => ({
    width: 36, height: 20, borderRadius: 10,
    background: on ? C.green1 : C.border,
    position: 'relative', cursor: 'pointer', transition: 'all .2s',
    flexShrink: 0, border: 'none', outline: 'none', display: 'inline-block',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <input ref={libInputRef} type="file" accept=".pdf,.txt,.md" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) addToLibrary(f); e.target.value = ''; }} />

      {/* Messages — left aligned, no max-width centering */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ maxWidth: '88%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ fontSize: 10.5, color: C.textSm, marginBottom: 4, fontWeight: 500, letterSpacing: '.3px' }}>
              {m.role === 'user' ? 'You' : 'Peptide Consultant'}
              {m.role === 'assistant' && <span style={{ marginLeft: 6, background: '#EDE9FE', color: '#5B21B6', fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 600 }}>🧬 Bio Precision AI</span>}
            </div>
            <div style={{
              padding: '12px 15px', borderRadius: 14, fontSize: 14, lineHeight: 1.5,
              background: m.role === 'user' ? C.green1 : C.card,
              color: m.role === 'user' ? '#fff' : C.text,
              border: m.role === 'user' ? 'none' : `1px solid ${C.border}`,
              boxShadow: m.role === 'assistant' ? '0 1px 8px rgba(0,0,0,.07)' : 'none',
            }}>
              <MsgContent text={m.content} isUser={m.role === 'user'} />
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ fontSize: 10.5, color: C.textSm, marginBottom: 4, fontWeight: 500 }}>Peptide Consultant <span style={{ background: '#EDE9FE', color: '#5B21B6', fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 600 }}>Analyzing…</span></div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '11px 14px', display: 'inline-flex', gap: 4 }}>
              {[0,200,400].map(d => <span key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: C.textSm, display: 'inline-block', animation: `bl 1.2s ${d}ms infinite` }}/>)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Bottom bar — always visible */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '12px 32px 16px' }}>
        {/* Quick questions */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingBottom: 8, marginBottom: 8 }}>
          {quickQs.map(q => (
            <button key={q} onClick={() => send(q)} style={{ padding: '6px 13px', background: 'var(--bg, #F2F4F7)', border: `1px solid ${C.border}`, borderRadius: 20, fontSize: 12, color: C.green1, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .15s' }}
              onMouseEnter={e => e.currentTarget.style.background = C.greenLt}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg, #F2F4F7)'}
            >{q}</button>
          ))}
          <button onClick={onBack} style={{ padding: '6px 13px', background: 'none', border: `1px dashed ${C.border}`, borderRadius: 20, fontSize: 12, color: C.textSm, cursor: 'pointer', fontFamily: 'inherit' }}>← Overview</button>
        </div>

        {/* Source toggles */}
        <div className="p-src-bar" style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 8, borderBottom: `1px solid ${C.border}`, marginBottom: 8, flexWrap: 'wrap', position: 'relative' }}>
          <span style={{ fontSize: 11, color: C.textSm, fontWeight: 500, marginRight: 2 }}>Sources</span>
          <button style={srcBtnStyle(sources.clinicalWeb)} onClick={() => setSources(s => ({ ...s, clinicalWeb: !s.clinicalWeb }))}>
            🌐 Clinical web
            <span style={toggleStyle(sources.clinicalWeb)} onClick={e => { e.stopPropagation(); setSources(s => ({ ...s, clinicalWeb: !s.clinicalWeb })); }}>
              <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 2, left: sources.clinicalWeb ? 18 : 2, transition: 'all .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}/>
            </span>
          </button>
          <button style={srcBtnStyle(sources.literature)} onClick={() => setSources(s => ({ ...s, literature: !s.literature }))}>
            📚 Literature &amp; guidelines
            <span style={toggleStyle(sources.literature)} onClick={e => { e.stopPropagation(); setSources(s => ({ ...s, literature: !s.literature })); }}>
              <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 2, left: sources.literature ? 18 : 2, transition: 'all .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}/>
            </span>
          </button>
          <button style={{ ...srcBtnStyle(true), cursor: 'default' }}>
            🧬 BioVise Peptide Library
            <span style={{ ...toggleStyle(true), cursor: 'default' }}>
              <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 2, left: 18, transition: 'all .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}/>
            </span>
          </button>
          <button style={srcBtnStyle(myLibrary.length > 0)} onClick={() => setShowLibMenu(v => !v)}>
            🗂 My library{myLibrary.length > 0 && <span style={{ minWidth: 16, height: 16, borderRadius: 8, background: C.green1, color: '#fff', fontSize: 9, fontWeight: 700, padding: '0 4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>{myLibrary.length}</span>}
          </button>
          {showLibMenu && (
            <div className="p-lib-menu" style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.14)', zIndex: 50, overflow: 'hidden', padding: '14px 16px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: C.text, marginBottom: 4 }}>My Library</div>
              <div style={{ fontSize: 11.5, color: C.textSm, marginBottom: 10, lineHeight: 1.4 }}>Upload PDFs or text files to reference in peptide consultations.</div>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: C.green1, color: '#fff', borderRadius: 8, fontSize: 11.5, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8 }}>
                + Add document<input type="file" accept=".pdf,.txt,.md" style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} onChange={e => { const f = e.target.files?.[0]; if (f) addToLibrary(f); e.target.value = ''; }} />
              </label>
              {myLibrary.map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: C.greenLt, borderRadius: 7, fontSize: 12, color: C.green1, border: `1px solid ${C.borderGrn}`, marginBottom: 4 }}>
                  📄 <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                  <button onClick={() => setMyLibrary(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSm, display: 'flex', alignItems: 'center' }}>✕</button>
                </div>
              ))}
              {myLibrary.length === 0 && <div style={{ fontSize: 12, color: C.textSm, fontStyle: 'italic' }}>No documents yet — add one above</div>}
            </div>
          )}
        </div>

        {/* Input row */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about peptides, dosing, stacking, mechanisms…"
            rows={1}
            style={{ flex: 1, padding: '11px 14px', border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: 'none', color: C.text, background: '#F2F4F7', fontFamily: 'inherit', resize: 'none', lineHeight: 1.5, minHeight: 44, maxHeight: 100 }}
            onFocus={e => e.target.style.borderColor = C.green3}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <button onClick={() => send()} disabled={busy || !input.trim()} style={{ width: 44, height: 44, borderRadius: 8, background: input.trim() && !busy ? C.green1 : C.textXs, color: '#fff', border: 'none', cursor: input.trim() && !busy ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div style={{ fontSize: 11, color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: '7px 11px', marginTop: 8, lineHeight: 1.55 }}>⚕ For clinical decision-support only. Peptide therapy requires clinician supervision.</div>
      </div>
    </div>
  );
}

// ── Disclaimer ───────────────────────────────────────────────────────────────
function PeptideDisclaimer() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Important Safety Notice — Research-Only Peptides</div>
          <p style={{ fontSize: 12.5, color: '#B45309', margin: 0, lineHeight: 1.5 }}>
            Some peptides in this library are research-only substances and carry significant safety risks if obtained from unregulated sources.
          </p>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ background: 'transparent', border: `1px solid ${C.orangeBdr}`, borderRadius: 6, color: C.orange, fontSize: 11, fontWeight: 700, padding: '4px 10px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {expanded ? 'Less ▲' : 'Read More ▼'}
        </button>
      </div>
      {expanded && (
        <div style={{ marginTop: 14, borderTop: `1px solid ${C.orangeBdr}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {WARNINGS.map(w => (
            <div key={w.title} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{w.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 2 }}>{w.title}</div>
                <p style={{ fontSize: 12, color: '#B45309', margin: 0, lineHeight: 1.55 }}>{w.body}</p>
              </div>
            </div>
          ))}
          <div style={{ background: C.greenLt, border: `1px solid ${C.borderGrn}`, borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green1, marginBottom: 8 }}>The Safe Path</div>
            {['Consult a physician specializing in peptide or regenerative medicine','Obtain a written prescription for any compoundable peptide','Fill your prescription at a licensed 503A pharmacy and request the COA','Never purchase injectable peptides from online research vendors','Use this guide for education only — not as a self-prescribing tool'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: C.green2, lineHeight: 1.5, marginBottom: 4 }}>
                <span style={{ color: C.green3, flexShrink: 0 }}>→</span> {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function PeptideOverview() {
  const [view, setView]         = useState('home');
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState('all');
  const [search, setSearch]     = useState('');

  const filtered = PEPTIDES.filter(p => {
    const matchCat    = filter === 'all' || p.categoryTag === filter;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const goToLibrary = (cat) => { setFilter(cat || 'all'); setView('library'); };

  const cat   = selected ? (CAT[selected.categoryTag] || CAT.healing) : null;
  const badge = selected ? (RESEARCH_BADGE[selected.researchLevel] || RESEARCH_BADGE.moderate) : null;

  if (view === 'chat') return <PeptideAIChat onBack={() => setView('home')} />;

  if (view === 'detail' && selected) return (
    <div style={{ background: 'transparent', minHeight: '100%', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ padding: '28px 32px', maxWidth: 900, width: '100%' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <button onClick={() => { setSelected(null); setView('library'); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>← Library</button>
          <button onClick={() => { setSelected(null); setView('home'); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>Home</button>
        </div>
        {selected.isResearchOnly && (
          <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Research-Only Peptide</div>
              <p style={{ fontSize: 12.5, color: '#B45309', margin: 0, lineHeight: 1.5 }}><strong>{selected.name}</strong> is classified as research-only and is not FDA-approved for human administration. Do not obtain from online research vendors. Consult a qualified physician before pursuing access through any channel.</p>
            </div>
          </div>
        )}
        <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: '#fff', border: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{selected.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: cat.accent, margin: '0 0 4px' }}>{selected.name}</h1>
              <div style={{ fontSize: 13, color: C.textSm }}>{selected.fullName}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: '#fff', color: cat.accent, padding: '4px 10px', borderRadius: 20, border: `1px solid ${cat.border}` }}>{selected.category}</span>
            <span style={{ fontSize: 11, fontWeight: 600, background: badge.bg, color: badge.color, padding: '4px 10px', borderRadius: 20 }}>{badge.label}</span>
            {selected.isResearchOnly && <span style={{ fontSize: 11, fontWeight: 700, background: C.orangeLt, color: C.orange, padding: '4px 10px', borderRadius: 20, border: `1px solid ${C.orangeBdr}` }}>Research Only</span>}
            <span style={{ fontSize: 11, fontWeight: 600, background: '#fff', color: C.textSm, padding: '4px 10px', borderRadius: 20, border: `1px solid ${C.border}` }}>Half-life: {selected.pkHalfLife}</span>
          </div>
          <p style={{ fontSize: 14, color: C.textMd, margin: '0 0 12px', lineHeight: 1.65 }}>{selected.summary}</p>
          <div style={{ fontSize: 12, color: cat.accent, background: '#fff', padding: '8px 12px', borderRadius: 8, border: `1px solid ${cat.border}` }}>
            Regulatory Status: {selected.regulatoryStatus}
          </div>
        </div>
        {[
          { title: 'Mechanism of Action', icon: '⚙️', content: <p style={{ fontSize: 14, color: C.textMd, lineHeight: 1.7, margin: 0 }}>{selected.mechanism}</p> },
          { title: 'Key Benefits', icon: '✅', content: <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{selected.benefits.map((b, i) => <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: C.textMd, lineHeight: 1.5 }}><span style={{ color: cat.accent, flexShrink: 0 }}>✓</span>{b}</li>)}</ul> },
          { title: 'Dosing Protocols', icon: '💉', content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(selected.dosing).map(([key, val]) => {
                if (!val || key === 'routes') return null;
                const labels = { clinical: 'Clinical / Pharmacy', community: 'Community Reported', acute: 'Acute Injury', cycle: 'Cycle Length', typical: 'Typical', range: 'Range' };
                return (
                  <div key={key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: cat.accent, background: cat.bg, border: `1px solid ${cat.border}`, padding: '3px 8px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap' }}>{labels[key] || key}</span>
                    <span style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.5 }}>{val}</span>
                  </div>
                );
              })}
              {selected.dosing.routes && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {selected.dosing.routes.map(r => <span key={r} style={{ fontSize: 12, background: C.bg, color: C.textSm, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.border}` }}>{r}</span>)}
                </div>
              )}
            </div>
          )},
          { title: 'Common Stacks', icon: '🔗', content: <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{selected.stacks.map((s, i) => <div key={i} style={{ fontSize: 13.5, color: C.textMd, padding: '10px 14px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>{s}</div>)}</div> },
          { title: 'Side Effects & Safety', icon: '⚠️', content: <p style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.65, margin: 0 }}>{selected.sideEffects}</p> },
          { title: 'Human Evidence', icon: '📄', content: <p style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.65, margin: 0 }}>{selected.humanEvidence}</p> },
        ].map(section => (
          <div key={section.title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: cat.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{section.icon}</span> {section.title}
            </div>
            {section.content}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setView('chat')} style={{ background: C.green2, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Ask AI about {selected.name} →
          </button>
        </div>
        <p style={{ fontSize: 11, color: C.textXs, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>Educational purposes only · Not medical advice · All peptide therapy requires physician supervision and a licensed 503A compounding pharmacy</p>
      </div>
    </div>
  );

  if (view === 'library') return (
    <div style={{ background: 'transparent', minHeight: '100%', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ padding: '28px 32px', maxWidth: 1100, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setView('home')} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>← Back</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.green1, margin: 0, fontFamily: "'Playfair Display', serif" }}>🧬 Peptide Library</h1>
            <p style={{ fontSize: 13, color: C.textSm, margin: '4px 0 0' }}>{PEPTIDES.length} peptides · Click any card to view full profile</p>
          </div>
          <input placeholder="Search peptides..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '9px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 13, outline: 'none', width: 200 }}
            onFocus={e => e.target.style.borderColor = C.green3}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 10, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#B45309' }}>
          <span>⚠️</span>
          <span>Peptides marked <strong>RESEARCH ONLY</strong> are not FDA-approved. Only use compoundable peptides prescribed by a physician through a licensed 503A pharmacy.</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {FILTERS.map(f => {
            const active = filter === f.id;
            const c = f.id !== 'all' && CAT[f.id];
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: active ? (c ? c.bg : C.greenLt) : C.card, border: `1px solid ${active ? (c ? c.border : C.borderGrn) : C.border}`, color: active ? (c ? c.accent : C.green2) : C.textSm }}>
                {f.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
          {filtered.map(p => {
            const c = CAT[p.categoryTag] || CAT.healing;
            const r = RESEARCH_BADGE[p.researchLevel] || RESEARCH_BADGE.moderate;
            return (
              <button key={p.id} onClick={() => { setSelected(p); setView('detail'); }} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: '18px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.background = c.bg; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {p.isResearchOnly && <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 800, background: C.orangeLt, color: C.orange, padding: '2px 6px', borderRadius: 4, border: `1px solid ${C.orangeBdr}` }}>RESEARCH ONLY</div>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{p.icon}</div>
                  <div style={{ flex: 1, paddingRight: p.isResearchOnly ? 60 : 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.green1, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.textXs }}>{p.fullName}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, background: c.bg, color: c.accent, padding: '3px 8px', borderRadius: 20, border: `1px solid ${c.border}` }}>{p.category}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, background: r.bg, color: r.color, padding: '3px 8px', borderRadius: 20 }}>{r.label}</span>
                </div>
                <p style={{ fontSize: 12.5, color: C.textSm, margin: 0, lineHeight: 1.5 }}>{p.tagline}</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingBottom: 6 }}>
                    <div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', flexShrink: 0, minWidth: 88 }}>Clinical Dose</div>
                    <div style={{ fontSize: 12, color: C.textMd, fontWeight: 600, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{(p.dosing.clinical || '').split('·')[0].trim()}</div>
                  </div>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 6, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', flexShrink: 0, minWidth: 88 }}>Half-life</div>
                    <div style={{ fontSize: 12, color: C.textMd, fontWeight: 600 }}>{p.pkHalfLife}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.textXs }}>No peptides match your search.</div>}
      </div>
    </div>
  );

  return (
    <div style={{ background: 'transparent', minHeight: '100%', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ padding: '28px 32px', maxWidth: 900, width: '100%' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <img
              src="data:image/jpeg;base64,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ad+fTFfQHww8IHwtoW+4ULfXeJJR3Qfwp+GT+JNd+Jw1HB0eaLfM3o+ok7sj0z4QeGtMuROLV7gqcqs7llBznpXagYGB0paK8KpWqVXepJsvYKKKKyAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAgNlbtcC4NvEZxwJSg3D8etT0UU7tgFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAq6nqdnounXOoahdQ2VjaxtNPc3DhI4kUZZmY8AADJJrwHwr+2Rp/xa8Qalpfwr8F6749i01gt1rAaGw05SegEszBmJ542ZOMgY5riv+Couu6lo/7M4t7CSSK31DWLa1vDHkbotsj7SfQsiflXIf8ABKL4geHrr4Va54Ojnhg8TWmpSX8tsxAkuIHRFWRR/EFKlTjpx6ivTp4eKwrxDV3e1v1Yr62PpW9/aD07wZPaw/EbRr34dpdHZBqWqTQzabLJgkx/aYnZY2wDgSiPOPlzXafDvx1p/wATPBWkeKNJWZNN1SHz7cTqA5TJAJAJHOM9ehqn8XPh3p3xY+GviLwnqkKzWup2bwjcMmOTGY3HurBWHuK539l3SLvQP2ePh7pt/BJa3tpo1vDNDKhVkZVwQQeRXI1TdPmWjuB6jRWZ4k8TaR4O0S61jXdStdI0q1XfPeXsyxRRjpyzEAc4HuTXk4/a/wDh5N4VuPFVq3iC98I27FZfEFv4evWslAOGbf5WSqngsAR71nGnOesVcZ7XRXO+AviH4b+KHhu31/wprNrrmkT8Jc2r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"
              alt="Sequence Peptide AI"
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
              <div style={{ fontSize: 11, letterSpacing: 3, color: C.textXs, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>BioVise · Bio Precision Aging</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#534AB7', margin: '0 0 4px', fontFamily: "'Playfair Display', serif" }}>Sequence AI Peptide Consultant</h1>
              <p style={{ color: '#7F77DD', fontSize: 11, margin: 0, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>Peptide AI</p>
            </div>
          </div>
          <p style={{ color: C.textSm, fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>AI-assisted guidance for evidence-based peptide therapy. Explore the library, filter by goal, or chat with our AI consultant.</p>
        </div>
        <PeptideDisclaimer />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <button onClick={() => goToLibrary('all')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px', background: C.greenLt, border: `1.5px solid ${C.borderGrn}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C8DFF0'; e.currentTarget.style.borderColor = C.green3; e.currentTarget.style.boxShadow = '0 4px 12px rgba(107,158,200,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.greenLt; e.currentTarget.style.borderColor = C.borderGrn; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, background: C.green2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧬</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green1, marginBottom: 3 }}>Peptide Overview</div>
              <div style={{ fontSize: 12, color: C.green2, lineHeight: 1.4 }}>Browse all {PEPTIDES.length} peptides in our library</div>
            </div>
          </button>
          <button onClick={() => setView('chat')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px', background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#DBEAFE'; e.currentTarget.style.borderColor = '#93C5FD'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = '#BFDBFE'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>💬</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1D4ED8', marginBottom: 3 }}>Peptide AI Consultant</div>
              <div style={{ fontSize: 12, color: '#3B82F6', lineHeight: 1.4 }}>Ask our AI any peptide question</div>
            </div>
          </button>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textSm, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Filter Library by Your Goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {GOALS.map(g => {
              const c = CAT[g.cat] || CAT.healing;
              return (
                <button key={g.label} onClick={() => goToLibrary(g.cat)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMd; }}
                >
                  <span style={{ fontSize: 18 }}>{g.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'inherit' }}>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p style={{ fontSize: 11, color: C.textXs, textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
          Educational purposes only · Not medical advice · All peptide therapy requires physician supervision and a prescription from a licensed 503A compounding pharmacy.
        </p>
      </div>
    </div>
  );
}

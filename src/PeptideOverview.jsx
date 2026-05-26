import { useState, useRef, useEffect } from "react";
import { PEPTIDE_CONTEXT } from './peptides';
// ── Site color palette (matches Vitae) ──────────────────────────────────────
const C = {
  bg:        '#f9fafb',
  card:      '#ffffff',
  border:    '#E5E7EB',
  borderGrn: '#D1FAE5',
  green1:    '#1B4332',
  green2:    '#2D6A4F',
  green3:    '#52B788',
  greenLt:   '#F0FDF4',
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
  healing:         { accent: '#2D6A4F', bg: '#F0FDF4', border: '#D1FAE5', label: 'Healing' },
  metabolic:       { accent: '#0369A1', bg: '#F0F9FF', border: '#BAE6FD', label: 'Metabolic' },
  gh_axis:         { accent: '#6D28D9', bg: '#F5F3FF', border: '#DDD6FE', label: 'GH Axis' },
  sexual:          { accent: '#BE185D', bg: '#FDF2F8', border: '#FBCFE8', label: 'Sexual Health' },
  longevity:       { accent: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', label: 'Longevity' },
  neuro:           { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuropeptide' },
  neuroprotection: { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuroprotection' },
  immune:          { accent: '#0E7490', bg: '#ECFEFF', border: '#A5F3FC', label: 'Immune' },
  mitochondrial:   { accent: '#B45309', bg: '#FFFBEB', border: '#FDE68A', label: 'Mitochondrial' },
  anti_aging:      { accent: '#B45309', bg: '#FFF7ED', border: '#FED7AA', label: 'Anti-Aging' },
  fertility:       { accent: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', label: 'Fertility' },
  gut:             { accent: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', label: 'GI Health' },
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
  { id:'tirzepatide', name:'Tirzepatide', fullName:'Tirzepatide (GIP/GLP-1 Dual Agonist)', categoryTag:'metabolic', category:'GLP-1 / Metabolic', icon:'📊', tagline:'First-in-class dual GIP/GLP-1 agonist — 20-22% weight loss', regulatoryStatus:'FDA-approved (Mounjaro: T2DM; Zepbound: obesity)', researchLevel:'very_high', isResearchOnly:false, summary:'First-in-class dual GIP and GLP-1 receptor co-agonist. Superior weight loss vs semaglutide (20-22% body weight in SURMOUNT trials). GIP receptor activation adds insulin-potentiating and direct adipose tissue lipid-lowering effects beyond GLP-1 alone. Weekly subcutaneous injection.', mechanism:'GIP and GLP-1 receptor co-agonism · Insulin secretion potentiation · Glucagon suppression · Delayed gastric emptying · Central appetite suppression · Direct adipose tissue lipolysis via GIP receptor · Cardioprotective and hepatoprotective pathways', benefits:['20-22% body weight reduction (SURMOUNT-1 trial, N=2,539)','Superior glycemic control vs semaglutide in T2DM','Improved lipid profile and triglyceride reduction','Sleep apnea improvement (SURMOUNT-OSA trial)','Heart failure benefit (SUMMIT trial)','MASH/NAFLD liver fat reduction'], dosing:{ clinical:'2.5 mg/week SC starting dose, titrate by 2.5 mg every 4 weeks to 5-15 mg/week', cycle:'Ongoing chronic therapy for weight management or T2DM', routes:['Subcutaneous injection (weekly)'] }, sideEffects:'Nausea, diarrhea, vomiting during titration. Potential muscle mass loss with rapid weight reduction — pair with resistance training and adequate protein.', stacks:['Tirzepatide + resistance training + adequate protein (muscle preservation)','Tirzepatide + Tesamorelin (complementary mechanisms for metabolic syndrome: caloric intake vs visceral fat)'], humanEvidence:'SURMOUNT-1 (N=2,539): 20.9% weight loss at 72 weeks. SURMOUNT-2, 3, 4 trials. SURPASS trials for T2DM. FDA-approved 2022-2023.', pkHalfLife:'~5 days', bioavailability:'SC: ~80%' },
  { id:'sermorelin', name:'Sermorelin', fullName:'Sermorelin (GHRH 1-29)', categoryTag:'gh_axis', category:'GH Axis', icon:'💪', tagline:'First 29 amino acids of GHRH — longest safety record of any GH peptide', regulatoryStatus:'Compoundable by prescription. Previously FDA-approved (withdrawn 2008 for commercial reasons, not safety).', researchLevel:'high', isResearchOnly:false, summary:'The first 29 amino acids of endogenous GHRH. Previously FDA-approved under the brand name Geref. Longest clinical safety record of any GHRH analogue. Stimulates natural pulsatile GH release with less risk of desensitization than longer-acting analogues. Requires nightly dosing due to short half-life.', mechanism:'GHRH receptor agonism on pituitary somatotrophs · Stimulates natural pulsatile GH production and release · Shorter half-life than CJC-1295 — less receptor downregulation risk · IGF-1 elevation (dose-dependent)', benefits:['Natural pulsatile GH release — most physiological GH peptide','Improved slow-wave sleep quality and duration','Body composition improvement (gradual lean mass gain, fat reduction)','Anti-aging effects on skin, hair, and energy','Longest safety record of any GHRH analogue','Less suppression risk than longer-acting GHRH peptides'], dosing:{ clinical:'200-300 mcg SC before bed', community:'200-300 mcg SC nightly, fasted', cycle:'3-6 months minimum; can be run longer than CJC-1295 due to lower desensitization risk', routes:['Subcutaneous injection'] }, sideEffects:'Generally very well-tolerated. Mild flushing, tingling, headache possible. No significant adverse events in clinical use.', stacks:['Sermorelin + Ipamorelin (GHRH + GHRP combination for amplified GH pulse)','Sermorelin + BPC-157 (healing and recovery)'], humanEvidence:'FDA approval history (Geref). Multiple clinical studies in adults and children for GH deficiency. Long post-market safety record.', pkHalfLife:'<10 min', bioavailability:'SC: ~70%' },
  { id:'tesamorelin', name:'Tesamorelin', fullName:'Tesamorelin (Egrifta SV)', categoryTag:'gh_axis', category:'GH Axis / Metabolic', icon:'🎯', tagline:'Only FDA-approved GHRH analog — visceral fat reduction with preserved GH pulsatility', regulatoryStatus:'FDA-approved (Egrifta SV) for HIV lipodystrophy visceral fat. Off-label: NAFLD/MASLD, body composition, cognitive aging. Compoundable by prescription.', researchLevel:'high', isResearchOnly:false, summary:'Stabilized synthetic analog of human GHRH(1-44) with DPP-IV resistance. FDA-approved 2010. Generates a discrete pulsatile GH pulse that preserves physiological pulsatility — unlike CJC-1295 with DAC. Six peer-reviewed human trials including Phase III (N=806) establish 15-18% VAT reduction, cognitive benefits, liver enzyme normalization, and glycemic safety in T2DM.', mechanism:'GHRH receptor agonism on pituitary somatotrophs — pulsatile GH release. Higher GH receptor density in visceral adipose tissue (VAT) vs subcutaneous fat drives selective visceral lipolysis. IGF-1 elevation +117-181% within physiological range. Preserves negative IGF-1 feedback loop. GH pulsatility confirmed via AutoDecon deconvolution (Stanley 2011, JCEM).', benefits:['VAT reduction 15-18% over 26 weeks in Phase III RCT (N=806, P<0.001)','GH pulsatility preserved — pulse area increased, frequency unchanged (Stanley 2011)','VAT reduction in non-HIV obese: -19% at 12 months (Makimura 2012, N=60)','Carotid IMT reduction -6%, P=0.02 — cardiovascular benefit outside HIV','Cognitive function: executive function effect size f=0.37, P=.005 (Baker 2012, N=152)','Liver enzyme improvement: ALT -18% in VAT responders (Fourman 2017, N=806)','Glycemic safety confirmed in T2DM at 12 weeks (Clemmons 2017, N=53)'], dosing:{ clinical:'2 mg SC once daily (FDA label). Evening/pre-bed, fasted state (2+ hours post-meal)', community:'1-2 mg SC once daily off-label body composition or NAFLD', acute:'Start 1 mg SC daily, titrate to 2 mg over 2-4 weeks to reduce side effects', cycle:'12-26 weeks off-label; continuous per FDA label for HIV lipodystrophy', routes:['Subcutaneous injection'] }, sideEffects:'Injection site reactions (common). Arthralgias/myalgias (5-10%, dose-related). Peripheral edema (common, self-limiting). Transient fasting glucose increase (monitor in T2DM). Compliance 97-99.5% in trials. Contraindicated in active malignancy.', stacks:['Tesamorelin solo for NAFLD/visceral fat (robust GH pulses alone)','Tesamorelin + Ipamorelin 200-300 mcg pre-bed (if IGF-1 suboptimal)','Tesamorelin + Semaglutide or Tirzepatide (metabolic syndrome: complementary mechanisms)','MK-677 + Tesamorelin (highest IGF-1 combination — lab monitoring essential)'], humanEvidence:'6 peer-reviewed human studies. Phase III RCT N=806 (Falutz 2007/2010). Cognitive RCT N=152 (Baker 2012). GH pulsatility N=13 (Stanley 2011). Non-HIV obese RCT N=60 (Makimura 2012). Liver enzymes N=806 (Fourman 2017). T2DM safety RCT N=53 (Clemmons 2017). FDA-approved 2010.', pkHalfLife:'26-38 min', bioavailability:'SC: high (DPP-IV resistant)' },
  { id:'kisspeptin10', name:'Kisspeptin-10', fullName:'Kisspeptin-10 (KP-10)', categoryTag:'fertility', category:'Fertility & Hormonal', icon:'🧬', tagline:'HPG-axis upstream trigger — stimulates natural LH and testosterone', regulatoryStatus:'Investigational. Not FDA-approved. Research use only.', researchLevel:'moderate', isResearchOnly:true, summary:'Endogenous neuropeptide that stimulates GnRH release from the hypothalamus, driving downstream LH and FSH secretion. Acts one step upstream of Gonadorelin in the HPG axis. Used for fertility restoration and sexual function improvement via a central brain mechanism.', mechanism:'KISS1R receptor agonism on GnRH neurons in the hypothalamus · GnRH pulse triggering → pituitary LH/FSH surge → gonadal steroidogenesis · Central dopaminergic and olfactory sexual signaling', benefits:['Stimulates natural LH and testosterone production','Fertility enhancement: oocyte maturation, sperm production stimulation','HPG axis restoration in hypogonadotropic hypogonadism','Sexual desire and arousal (central brain mechanism)'], dosing:{ clinical:'9.6 nmol/kg IV (published clinical trial dose) or 50-100 mcg SC', cycle:'Pulsatile protocols required; design varies by indication and goal', routes:['Subcutaneous injection','Intravenous (clinical trials only)'] }, sideEffects:'Generally well-tolerated in clinical trials. Transient LH surge. Limited long-term safety data.', stacks:['Kisspeptin-10 + Gonadorelin (dual HPG axis stimulation protocol)','Kisspeptin-10 + PT-141 (central HPG + central desire)'], humanEvidence:'Multiple human clinical trials for LH stimulation and fertility. Jayasena et al. 2014 (J Clin Invest) for sexual function. Studied in hypothalamic amenorrhea and male hypogonadism.', pkHalfLife:'~2-4 min', bioavailability:'IV: 100%; SC: ~60%' },
  { id:'hcg', name:'HCG', fullName:'Human Chorionic Gonadotropin (hCG)', categoryTag:'fertility', category:'Hormonal / Fertility', icon:'🧬', tagline:'LH mimic — testicular function maintenance and fertility preservation on TRT', regulatoryStatus:'FDA-approved (Pregnyl, Novarel) for hypogonadotropic hypogonadism in males, ovulation induction in females, and cryptorchidism. TRT adjunct use is off-label. Compounding supply limited post-2024 FDA enforcement — gonadorelin is primary 2026 alternative.', researchLevel:'high', isResearchOnly:false, summary:'244-amino-acid glycoprotein LH mimic. In men, binds directly to LH receptors on testicular Leydig cells — bypassing the pituitary entirely. Stimulates intratesticular testosterone (ITT) and maintains spermatogenesis during TRT. Testosterone normalization from 0.9 to 15.1 nmol/L (P<0.001, Liu 2016, N=223) in HH populations. As of 2026, HCG compounding availability is limited — gonadorelin is the primary TRT adjunct.', mechanism:'Direct LH receptor agonism on testicular Leydig cells · cAMP → steroidogenic enzyme upregulation → intratesticular testosterone (ITT) · Bypasses hypothalamic-pituitary signaling entirely · Terminal half-life ~33-37 hours (biological effect 3-5 days per injection) · Higher estrogen conversion than gonadorelin due to stronger direct Leydig stimulation', benefits:['Testosterone normalization in HH: 0.9 to 15.1 nmol/L (P<0.001, Liu 2016, N=223)','Testicular volume restoration: 2.1 to 8.1 mL (P<0.001) in HH patients','Spermatogenesis induction with FSH: 77.8% success in Phase III (Nieschlag 2017, N=18)','Fertility: 56% paternity rate in married HH patients (Liu 2016)','TRT adjunct: preserves testicular size, fertility potential, and ITT'], dosing:{ clinical:'HH therapy: 1,500-3,000 IU SC/IM 2x/week. TRT adjunct: 250-500 IU SC 2-3x/week', cycle:'HH fertility: 6-18+ months. TRT adjunct: continuous with TRT.', routes:['Subcutaneous injection','Intramuscular injection (clinical trials)'] }, sideEffects:'Well-tolerated at TRT-adjunct doses. Estradiol elevation (monitor E2). Gynecomastia 7% at HH doses. Acne 9%. Pregnancy test cross-reactivity: positive for 7-14 days post-injection. CRITICAL: dosed in International Units (IU) not milligrams — dosing errors possible.', stacks:['HCG + Testosterone TRT (standard TRT adjunct for testicular preservation)','HCG + HMG or FSH (complete spermatogenesis induction in HH)'], humanEvidence:'Phase III HCG+corifollitropin alfa (Nieschlag 2017, N=18). Retrospective cohort HCG+HMG (Liu 2016, N=223). GnRH maintenance (Delemarre-van de Waal 2004, N=68). No RCT for TRT adjunct use specifically.', pkHalfLife:'~33-37 hours', bioavailability:'SC/IM: ~90%' },
  { id:'glutathione', name:'Glutathione', fullName:'Glutathione (GSH)', categoryTag:'longevity', category:'Antioxidant / Longevity', icon:'⚡', tagline:'Master antioxidant and hepatic detoxifier — injectable for systemic effect', regulatoryStatus:'Injectable glutathione NOT FDA-approved. Available via 503A compounding pharmacies with physician prescription. Oral GSH capsules are dietary supplements with near-zero systemic bioavailability.', researchLevel:'moderate', isResearchOnly:false, summary:"Tripeptide (gamma-Glutamyl-Cysteinyl-Glycine) and the body's most abundant endogenous antioxidant. Oral capsules are largely placebo for systemic effect (<5% bioavailability). Injectable IV or SC routes reliably elevate circulating and tissue GSH. Liposomal oral forms (15-30% bioavailability) are the best non-injectable option. CRITICAL: reconstituted glutathione must be used within 24 hours — sensitive to oxidation unlike most peptides.", mechanism:"Reactive oxygen species neutralization (GSH to GSSG redox cycle, regenerated by glutathione reductase/NADPH) · Phase II hepatic detoxification: conjugates toxins for biliary/renal excretion · Tyrosinase inhibition → melanin reduction (skin-lightening mechanism) · Lymphocyte proliferation and cytokine production regulation", benefits:["Systemic antioxidant defense — most reliable via injectable routes","NAFLD/liver function: oral GSH 300 mg/day reduced ALT and hepatic fat markers (Honda 2017, N=29)","Parkinson's disease motor function improvement with IV glutathione (Sechi 1996)","Liposomal oral form elevates whole-blood GSH and immune markers (Sinha 2018, 6-month study)","Post-illness and Long COVID recovery support"], dosing:{ clinical:'SC: 200-600 mg, 1-3x/week. IV: 600-1,200 mg per session, slow push over 5-15 minutes', community:'SC: 200-400 mg 2-3x/week at home; IV: 600-1,200 mg at clinic', cycle:'No standard cycle. Continuous for longevity protocols; on-demand for acute indications.', routes:['Intravenous (gold standard)','Subcutaneous injection','Liposomal oral (best non-injectable option)'] }, sideEffects:'Well-tolerated. Mild injection site stinging (low pH in some formulations). Transient lightheadedness with fast IV push — slow to 5-15 minutes. CRITICAL STABILITY: Use within 24 hours of reconstitution — oxidation degrades active form. Do not stockpile pre-mixed.', stacks:['Glutathione + NAD+ (canonical longevity stack — inject separately, not same syringe)','Glutathione + Vitamin C high-dose IV (regenerates oxidized GSH back to active form)','Glutathione + Alpha-Lipoic Acid oral (ALA is a GSH recycling cofactor)'], humanEvidence:'Sechi 1996 (IV GSH in early Parkinsons, motor improvement). Allen & Bradley 2011 (oral GSH reduced oxidative stress biomarkers). Sinha 2018 (liposomal GSH elevated body stores, Eur J Clin Nutr). Honda 2017 (oral GSH in NAFLD, BMC Gastroenterol). Pizzorno 2014 review.', pkHalfLife:'~10 min (IV plasma); intracellular effects longer', bioavailability:'IV: 100%; SC: moderate; oral: <5%; liposomal: 15-30%' },
  { id:'nad_plus', name:'NAD+', fullName:'Nicotinamide Adenine Dinucleotide (NAD+)', categoryTag:'mitochondrial', category:'Longevity / Mitochondrial', icon:'⚡', tagline:'Central longevity coenzyme — fuels sirtuins, DNA repair, and mitochondrial function', regulatoryStatus:'Injectable NAD+ NOT FDA-approved. Available via 503A compounding pharmacies with physician prescription. Oral NAD+ capsules near-zero systemic bioavailability. NR precursor: FDA-recognized supplement. NMN precursor: regulatory gray zone.', researchLevel:'moderate', isResearchOnly:false, summary:'Coenzyme in every living cell. Cellular NAD+ falls roughly 50% by middle age (Massudi 2012, human skin biopsies). Low NAD+: sirtuins go quiet, PARP-driven DNA repair slows, mitochondria operate at reduced capacity. Oral NAD+ capsules are functionally placebo — injectable routes reliably raise circulating NAD+. NAD+ flush is rate-dependent (not dose-total dependent) — slowing the IV drip resolves it. Methyl donor depletion is the most important clinical concern with chronic high-dose IV use.', mechanism:'Sirtuin (SIRT1-SIRT7) activation: NAD+-dependent deacetylases regulating metabolic gene expression (Imai & Guarente 2014) · PARP enzyme substrate for DNA damage repair · CD38 ectoenzyme competition (primary driver of age-related NAD+ decline) · Redox cofactor for glycolysis, TCA cycle, and electron transport chain', benefits:['Age-related NAD+ decline: ~50% reduction by middle age in humans (Massudi 2012, PLoS One)','NR precursor reliably raises whole-blood NAD+ in healthy older adults (Martens 2018, Nat Commun)','NMN increased muscle insulin sensitivity in prediabetic postmenopausal women (Yoshino 2021, Science)','Sirtuin activation scales directly with NAD+ availability (Imai & Guarente 2014)','Speculation: human longevity endpoints — no RCT has demonstrated lifespan extension'], dosing:{ clinical:'SC: 50-100 mg daily or 100-200 mg 3x/week. IV: 250-1,000 mg per session over 1-3 hours (slow drip prevents flush)', community:'SC home use: 100 mg every other day from 500 mg vial (much lower cost than clinic IV)', cycle:'Continuous for longevity protocols. IV: loading phase 1-3x/week, then monthly maintenance.', routes:['Intravenous (highest acute peak)','Subcutaneous injection (steady elevation at fraction of IV cost)','Intramuscular'] }, sideEffects:'NAD+ Flush: facial warmth, chest pressure with rapid IV — rate-dependent, slow drip resolves it. SC produces almost no flushing. Methyl donor depletion: depressive or anxious tail 2-4 days post-IV — manage with TMG (trimethylglycine) 500-1,000 mg daily. Injection site sting (mildly acidic solution).', stacks:['NAD+ + Glutathione (canonical longevity stack — inject separately, complementary mechanisms)','NAD+ + TMG/betaine (mandatory methyl donor support — prevents post-IV mood dip)','NAD+ + MOTS-c (mitochondrial biogenesis complement)','NAD+ + Epithalon (telomerase and pineal axis longevity protocol)'], humanEvidence:'Massudi 2012 (50% NAD+ decline in human skin biopsies, PLoS One). Martens 2018 (NR in healthy older adults, Nat Commun). Yoshino 2021 (NMN insulin sensitivity, Science). Mehmel 2020 (injection bioavailability review, Nutrients). Imai & Guarente 2014 (sirtuin-NAD+ axis review, Trends Cell Biol).', pkHalfLife:'~10 min (IV plasma); intracellular effects longer', bioavailability:'IV: 100%; SC: moderate; oral (NAD+ itself): near zero' },
  { id:'gonadorelin', name:'Gonadorelin', fullName:'Gonadorelin (Synthetic GnRH)', categoryTag:'fertility', category:'Hormonal / Fertility', icon:'🧬', tagline:'Synthetic GnRH — primary HCG alternative for testicular preservation on TRT in 2026', regulatoryStatus:'Originally FDA-approved as Factrel and Lutrepulse (both discontinued). Current TRT-adjunct use off-label via 503A compounding. Significantly easier to source than HCG in 2026. WADA Prohibited List 2026.', researchLevel:'moderate', isResearchOnly:false, summary:'Synthetic 10-amino-acid peptide identical to endogenous GnRH. Works UPSTREAM of HCG: stimulates the pituitary to release LH and FSH naturally, which then stimulate the testicles. Half-life 2-10 minutes — pulsatile dosing required (2-3x daily). Continuous dosing would paradoxically suppress the pituitary (same mechanism as leuprolide in chemical castration). Most TRT clinics have defaulted to gonadorelin for new patients in 2026.', mechanism:'GnRH receptor agonism on pituitary gonadotroph cells → endogenous LH and FSH release → Leydig cell testosterone (ITT) and Sertoli cell spermatogenesis support · Pulsatile requirement: half-life 2-10 minutes; continuous exposure causes receptor downregulation · Lower estrogen conversion than HCG — more modest ITT stimulation → less aromatization', benefits:['Testicular function preservation during TRT — upstream physiological approach','Lower estrogen conversion than HCG — fewer aromatase inhibitor requirements','No pregnancy test cross-reactivity (HCG causes false positives for 7-14 days)','Better 2026 compounding availability than HCG','FSH stimulation included (HCG stimulates LH pathway only)'], dosing:{ clinical:'100-300 mcg SC, 2-3 times daily. Standard start: 200 mcg SC twice daily (morning and evening)', cycle:'Continuous with TRT for testicular preservation. Fertility protocols: 300+ mcg 3-4x daily under reproductive specialist supervision.', routes:['Subcutaneous injection'] }, sideEffects:'Well-tolerated at TRT-adjunct doses. Mild flushing at injection time (transient). Less estrogen-related side effects than HCG. Main limitation: requires 14-21 injections per week vs 2-3 for HCG.', stacks:['Gonadorelin + Testosterone TRT (standard 2026 TRT adjunct)','Gonadorelin + FSH/HMG (active fertility under reproductive specialist supervision)'], humanEvidence:'Decades of clinical use as diagnostic GnRH stimulation test (Factrel). Hsieh 2013 (J Urol) and Coviello 2005 (JCEM) support HPG-axis preservation principle. Bhasin 2018 Endocrine Society guideline. TRT-adjunct use extrapolated from established physiology.', pkHalfLife:'2-10 min', bioavailability:'SC: ~60-80%' },
  { id:'mk677', name:'MK-677', fullName:'MK-677 (Ibutamoren Mesylate)', categoryTag:'gh_axis', category:'GH Axis / Oral Secretagogue', icon:'💪', tagline:'Only oral GH secretagogue — once-daily capsule with 24-hour GH axis effect', regulatoryStatus:'Investigational — NOT FDA-approved. Some 503A compounding pharmacies dispense capsules off-label under physician prescription (varies by state). WADA Prohibited List 2026. NOT a peptide — small-molecule spiroindoline GHS-R1a agonist.', researchLevel:'moderate', isResearchOnly:true, summary:'The only orally bioavailable GH secretagogue in widespread use — every other GH peptide requires injection. Plasma half-life 4-6 hours; biological effect on GH/IGF-1 axis lasts ~24 hours. Nass et al. Ann Intern Med 2008 (12-month RCT in elderly): IGF-1 1.5-2x baseline sustained without tachyphylaxis, fat-free mass +3 kg, HbA1c +0.3%. CRITICAL SAFETY SIGNAL: Hip-fracture trial halted 2007 due to CHF event imbalance — meaningful caution in anyone with cardiovascular disease.', mechanism:'GHS-R1a (ghrelin receptor) agonism on pituitary somatotrophs and hypothalamic neurons · Pulsatile GH secretion without meaningful pituitary suppression (confirmed in 12-month Nass trial) · IGF-1 elevation 1.5-2x baseline at 25 mg/day, sustained without tachyphylaxis · Appetite increase (ghrelin orexigenic effect) · Water retention via GH/IGF-1-induced renal sodium retention', benefits:['IGF-1 sustained 1.5-2x baseline over 12 months without tachyphylaxis (Nass 2008)','Fat-free mass +3 kg at 12 months in elderly (Nass 2008)','Oral bioavailability — eliminates injection barrier (unique in GH secretagogue class)','Bone turnover markers increased in healthy elderly (Murphy 1999)','No meaningful pituitary suppression — IGF-1 returns to baseline within 2-4 weeks of stopping'], dosing:{ clinical:'25 mg once daily (Nass 2008 validated trial dose)', community:'Start 10 mg once daily x 2-4 weeks, titrate to 15-25 mg once daily', cycle:'8-16 weeks on, 4-8 weeks off. Minimum 4-week off period. Continuous use requires quarterly lab monitoring.', routes:['Oral capsule'] }, sideEffects:'CRITICAL: CHF imbalance in elderly hip-fracture trial (Adunsky 2011) — avoid in cardiovascular disease. Increased appetite (very common). Water retention/edema (common, onset 1-3 weeks). Morning grogginess (common — try morning dosing). Vivid dreams (common). HbA1c +0.3% at 25 mg over 12 months (Nass 2008) — monitor fasting glucose.', stacks:['MK-677 + Tesamorelin (highest IGF-1 combination — lab monitoring essential)','Avoid MK-677 + CJC/Ipamorelin (redundant goals, additive water retention and glucose impact)'], humanEvidence:'Nass 2008 (12-month RCT, Ann Intern Med). Adunsky 2011 (halted hip-fracture Phase IIb, CHF signal). Murphy 1999 (bone turnover, J Bone Miner Res). Sevigny 2008 (Alzheimers trial, Neurology). FDA investigational.', pkHalfLife:'4-6 hours (plasma); ~24 hours (GH/IGF-1 biological effect)', bioavailability:'Oral: ~60-70% (survives GI digestion)' },
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
  const [msgs, setMsgs]   = useState([{ role: 'assistant', content: 'Hello! I am your Peptide AI Consultant. Ask me anything about peptide therapy — mechanisms, dosing protocols, stacking strategies, safety considerations, or which peptides may support your goals. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy]   = useState(false);
  const endRef            = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;

    // Build full history for display (UI shows all messages)
    const fullHistory = [...msgs, { role: 'user', content: text }];
    setMsgs(fullHistory);

    // Cap what gets sent to the API at last 8 messages (4 exchanges).
    // Prevents conversation history from growing unbounded and doubling
    // input tokens after long sessions — saves ~$400-700/mo at scale.
    const history = fullHistory.slice(-8);

    setInput('');
    setBusy(true);
    try {
      const systemPrompt = `You are a Peptide Medicine Consultant with deep expertise in peptide therapeutics, longevity medicine, sports medicine, and regenerative medicine. You provide evidence-based guidance grounded in peer-reviewed literature.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — ANSWER FROM THIS KNOWLEDGE BASE FIRST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The following is your curated peptide formulary. Always check here first before searching any external source. If the answer is fully contained here, do NOT search — answer directly and cite the relevant peptide entry.

${PEPTIDE_CONTEXT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — USE PUBMED SEARCH ONLY WHEN NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Search PubMed or literature sources ONLY if:
- The question involves a peptide not in the knowledge base above
- The user asks for a specific study, trial, or citation not included above
- The question asks for the very latest data that may post-date this formulary
- The question requires comparative evidence across multiple peptides

When you search, cite the source (PMID or journal) and note whether it confirms or adds to the local knowledge base.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLINICAL RULES (always follow)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Always recommend physician supervision and 503A compounding pharmacy sourcing
- Clearly distinguish: FDA-approved vs compoundable vs research-only
- Label evidence quality: [Verified] for established data, [Emerging] for limited data, [Theoretical] for proposed mechanisms
- Provide specific dosing, cycling, and stacking guidance when asked
- Never diagnose or prescribe — educate and guide clinicians
- Flag research-only peptides and advise against unregulated online sources
- End every clinical response with: "Always consult a licensed physician before starting any peptide protocol."`;

      // ── CORRECTED FETCH CALL ──────────────────────────────────────────────
      // Changes from original:
      //   1. max_tokens: 800  (was 1000/2000 — 800 covers 95% of responses)
      //   2. system: array with cache_control  (prompt caching — saves ~85% on input cost)
      //   3. messages: history  (already trimmed to last 8 above)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 800,
          system: [
            {
              type: 'text',
              text: systemPrompt,
              cache_control: { type: 'ephemeral' },
            }
          ],
          messages: history,
          _sources: {
            clinicalWeb: false,
            literature: true,
          },
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

  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, color: C.textSm, display: 'flex', alignItems: 'center', gap: 6 }}>← Back</button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.greenLt, border: `1px solid ${C.borderGrn}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🧬</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.green1 }}>Peptide AI Consultant</div>
          <div style={{ fontSize: 12, color: C.textSm }}>Ask anything about peptide therapy</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 720, width: '100%', margin: '0 auto' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '82%', padding: '10px 14px', borderRadius: 14,
              background: m.role === 'user' ? C.green2 : C.card,
              color: m.role === 'user' ? '#fff' : C.text,
              border: m.role === 'user' ? 'none' : `1px solid ${C.border}`,
            }}>
              <MsgContent text={m.content} isUser={m.role === 'user'} />
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '10px 14px', color: C.textSm, fontSize: 13 }}>Thinking...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '14px 16px', display: 'flex', gap: 10, maxWidth: 720, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about peptides, dosing, stacking, or your goals..."
          style={{ flex: 1, padding: '11px 14px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', color: C.text, background: C.bg, fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = C.green3}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button
          onClick={send}
          disabled={busy || !input.trim()}
          style={{ padding: '11px 20px', background: input.trim() && !busy ? C.green2 : C.textXs, color: '#fff', border: 'none', borderRadius: 10, cursor: input.trim() && !busy ? 'pointer' : 'not-allowed', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}
        >Send</button>
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
  });

  const goToLibrary = (cat) => { setFilter(cat || 'all'); setView('library'); };

  const cat   = selected ? (CAT[selected.categoryTag] || CAT.healing) : null;
  const badge = selected ? (RESEARCH_BADGE[selected.researchLevel] || RESEARCH_BADGE.moderate) : null;

  if (view === 'chat') return <PeptideAIChat onBack={() => setView('home')} />;

  if (view === 'detail' && selected) return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 20px' }}>
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
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setView('home')} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>← Back</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.green1, margin: 0 }}>🧬 Peptide Library</h1>
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
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: 'flex', gap: 16 }}>
                  <div><div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Half-life</div><div style={{ fontSize: 12, color: C.textMd, fontWeight: 600 }}>{p.pkHalfLife}</div></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Clinical Dose</div><div style={{ fontSize: 12, color: C.textMd, fontWeight: 600 }}>{(p.dosing.clinical || '').split('·')[0].trim()}</div></div>
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
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: C.textXs, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' }}>Vitae · Bio Precision Aging</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.green1, margin: '0 0 8px' }}>Peptide Consultant</h1>
          <p style={{ color: C.textSm, fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>AI-assisted guidance for evidence-based peptide therapy. Explore the library, filter by goal, or chat with our AI consultant.</p>
        </div>
        <PeptideDisclaimer />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <button onClick={() => goToLibrary('all')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px', background: C.greenLt, border: `1.5px solid ${C.borderGrn}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D1FAE5'; e.currentTarget.style.borderColor = C.green3; e.currentTarget.style.boxShadow = '0 4px 12px rgba(52,183,120,0.15)'; }}
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

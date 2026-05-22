// ─── MOTS-c ───────────────────────────────────────────────────────────────────
// Generated: May 2026
// Sources: 12 peer-reviewed articles extracted across 3 batches
// Evidence quality labels: [Verified] = peer-reviewed data | [Speculation] = community/extrapolated | [Unknown] = no data
// Replace the existing MOTS-c entry in src/peptides.js with this block.

{
  id: 'motsc',
  name: 'MOTS-c',
  fullName: 'Mitochondrial Open Reading Frame of the 12S rRNA type-c (MOTS-c)',
  aliases: ['MDP', 'Mitochondrial-derived peptide MOTS-c'],
  category: 'Mitochondrial / Metabolic',
  categoryTag: 'mitochondrial',
  goals: [
    'mitochondrial',
    'metabolic_health',
    'longevity',
    'fat_loss',
    'inflammation',
    'performance',
    'recovery',
    'muscle_mass',
  ],
  regulatoryStatus:
    'Research peptide. Included in February 27, 2026 FDA Category 1 reclassification batch (compoundable with prescription). ' +
    'First mitochondrial-encoded peptide in clinical trials (NCT03998514 — MOTS-c analog for fatty liver and obesity, ongoing).',
  researchLevel: 'moderate', // Upgraded from "emerging" — 5 human studies now available

  summary:
    'MOTS-c is a 16-amino-acid mitochondrial-derived peptide encoded in the 12S rRNA open reading frame of mitochondrial DNA. ' +
    'Naturally produced in mitochondria and translated in the cytoplasm, it functions as a systemic regulator of metabolism, ' +
    'insulin sensitivity, immune function, cardiac bioenergetics, and aging. ' +
    'Plasma MOTS-c declines with age (−11% middle-aged, −21% older vs young; p<0.001) and in disease states including T1DM, T2DM, ' +
    'gestational diabetes (−18%, p<0.01), obesity, and coronary endothelial dysfunction. ' +
    'MOTS-c is exercise-induced — rising 11.9-fold in skeletal muscle and 1.5-fold in plasma after high-intensity cycling — ' +
    'and serum levels correlate positively with lower-body muscle strength (R²=0.53, p=0.016) and muscle mass, but not VO2max. ' +
    'Paradoxically, muscle MOTS-c content increases ~1.5-fold with age while plasma declines, suggesting compartment-specific dynamics. ' +
    'As the first mitochondrial-encoded peptide to enter clinical trials, it represents a high-priority longevity and metabolic therapeutic candidate. ' +
    '[Verified — 12 peer-reviewed sources, May 2026]',

  mechanism:
    // PRIMARY METABOLIC AXIS
    'PRIMARY (skeletal muscle / T2DM): Folate cycle inhibition → AICAR accumulation → AMPK activation → ' +
    'GLUT4 translocation to plasma membrane → enhanced glucose uptake. Prevents hyperinsulinemia and diet-induced insulin resistance. ' +
    // NUCLEAR TRANSLOCATION
    'STRESS RESPONSE: Under metabolic stress (hypoxia, glucose deprivation, exercise), AMPK-dependent nuclear translocation of MOTS-c → ' +
    'antioxidant response element regulation via Nrf2/ARE → ATF1-mediated nuclear gene expression for stress resistance. ' +
    'Hydrophobic domain (8YIFY11) required for nuclear translocation; loss abolishes metabolic shift from glycolysis to OXPHOS. ' +
    // IMMUNE / T1DM AXIS
    'IMMUNE (T1DM): α-helical MOTS-c domain binds Raptor (mTORC1 complex) → competitive inhibition of 4E-BP1/S6K/PRAS binding → ' +
    'mTORC1 suppression → reduced T-cell glycolysis → Th1 suppression → Foxp3+ Treg differentiation favored → ' +
    'reduced pancreatic islet infiltration and β-cell destruction. ' +
    // CARDIAC AXIS
    'CARDIAC (T2D cardiomyopathy): AMPK activation → mitochondrial biogenesis (increased citrate synthase activity) → ' +
    'restored OXPHOS respiration; Nrf2 activation → SOD/catalase/GPX4 upregulation → antioxidant defense; ' +
    'reduced ATP synthase reversal during anoxia → ischemia-protective ATP conservation. ' +
    // MUSCLE MASS
    'MUSCLE MASS: Myostatin inhibition — MOTS-c and myostatin inversely correlated in human blood; ' +
    'may support muscle hypertrophy and strength independent of exercise volume. ' +
    // LONGEVITY
    'LONGEVITY: Mitohormesis — transient H2O2 bursts from MOTS-c treatment trigger adaptive antioxidant upregulation. ' +
    'Late-life (24-month) intermittent MOTS-c extends healthy murine lifespan. ' +
    'm.1382A>C SNP in MOTS-c ORF associated with exceptional longevity in Japanese centenarians.',

  benefits: [
    // METABOLIC
    '[Verified] Insulin resistance reduction: AMPK/AICAR/GLUT4 axis in skeletal muscle — validated in HFD obesity, T2DM, and GDM mouse models',
    '[Verified] T2DM: Serum MOTS-c inversely correlated with HbA1c severity (n=225 cross-sectional); lowest in poorly controlled T2DM (HbA1c >7%)',
    '[Verified] Gestational diabetes (GDM): Plasma MOTS-c 18% lower in GDM vs healthy pregnant women (p<0.01); R=−0.707 with OGTT 2h glucose',
    '[Verified] Pancreatic β-cell protection: STZ-injury protection (GDM model) and autoimmune T-cell infiltration reduction (T1DM NOD model)',

    // CARDIAC
    '[Verified] Diabetic cardiomyopathy: Restored cardiac OXPHOS respiration (CI+CII state) to control levels in T2D rat model',
    '[Verified] Cardiac hypertrophy reversal: LV wall thickness −8% (3.71→3.40 mm, p<0.05) and heart mass normalized in T2D rats',
    '[Verified] Mitochondrial biogenesis: Increased citrate synthase activity above control levels — evidence of new mitochondrial synthesis, not just rescue',
    '[Verified] Ischemia protection: Reduced ATP hydrolysis rate during anoxia — preserves myocardial ATP during ischemic episodes in diabetic heart',

    // EXERCISE / PERFORMANCE
    '[Verified] Exercise-induced: 11.9-fold muscle MOTS-c increase post high-intensity cycling (p=0.0098); 1.5-fold plasma rise (p=0.0011)',
    '[Verified] Muscle strength correlation: Serum MOTS-c positively correlated with lower-body max force (R²=0.53, p=0.016) and average power (R²=0.50, p=0.026)',
    '[Verified] Strength > endurance: MOTS-c not correlated with VO2max (R²=−0.011, p=0.96); professional endurance athletes have lower MOTS-c than controls',
    '[Verified] Muscle mass correlation: Serum MOTS-c associated with total and leg-specific muscle mass (R²=0.49–0.52, p<0.05)',

    // AGING / LONGEVITY
    '[Verified] Longevity: Late-life (24-month) intermittent MOTS-c (3×/week) increased healthy lifespan in mice',
    '[Verified] Physical capacity restoration: 22-month-old mice on 2-week MOTS-c doubled treadmill running time, outperforming 12-month controls',
    '[Verified] Genetic longevity link: m.1382A>C SNP in MOTS-c ORF associated with exceptional longevity in Asian centenarians (Fuku 2015)',

    // ANTI-INFLAMMATORY
    '[Verified] Anti-inflammatory: Reduces peri-insulitis in pancreatic islets; regulates IL-10 and IFN-γ; inhibits NF-κB pathway',
    '[Speculation] Myostatin inhibition: Inversely correlated with myostatin in human blood — may explain muscle mass association independent of training',
  ],

  // ─── DOSING ───────────────────────────────────────────────────────────────────
  dosing: {
    typical: '[Speculation] 5–10 mg/week SC — community practice (Lemke 2026, The Peptide Toolkit). No human RCT dose established.',
    range:
      '[Verified — animal] 0.5–15 mg/kg across validated animal studies. ' +
      'Lower doses (0.5–5 mg/kg) used over 8–12 weeks; higher doses (10–15 mg/kg) used over 2–4 weeks. ' +
      '50 mg/kg reported (Yin 2020) but not replicated — excluded from clinical extrapolation.',
    frequency:
      'Animal studies: daily (most protocols) or 3× weekly (longevity protocols — Reynolds 2021, Kong 2023). ' +
      '[Speculation] Human community: 2–3× weekly SC.',
    route: ['subcutaneous injection'],
    cycle:
      '[Speculation] 4–8 weeks on, followed by reassessment. No validated human off-cycle protocol. ' +
      'Best combined with exercise (additive PGC-1α effects documented — Yang 2021).',
    notes:
      'No human exogenous administration RCT completed. ' +
      'Phase I clinical trial (NCT03998514) for hepatic steatosis/obesity is ongoing — human dosing data not yet published. ' +
      'Dose-response highly variable across disease indications — no single optimal dose defined (Pham 2025 review of literature). ' +
      'Exercise synergy: endogenous MOTS-c rises 11.9-fold with high-intensity exercise (Reynolds 2021); exogenous + exercise additive on PGC-1α. ' +
      'Strength/power athletes may benefit more than endurance athletes based on serum correlation data (Domin 2023). ' +
      'Myostatin inhibition effect (Kumagai 2021) may support lean mass goals. ' +
      '[Unknown] Oral bioavailability; no data.',
  },

  // ─── PHARMACOKINETICS ─────────────────────────────────────────────────────────
  pkHalfLife: '[Unknown] No human PK data. Animal: ~1–2 hours plasma half-life estimated from exercise response curves.',
  bioavailability: 'SC: [Verified] High in animal models. Oral: [Unknown] — no data.',

  // ─── TISSUE DISTRIBUTION ──────────────────────────────────────────────────────
  tissueDistribution:
    '[Verified] FITC imaging (Yin 2022): Highest accumulation in pancreas and intestine; ' +
    'lower in skeletal muscle, liver, kidney, spleen. ' +
    'Intracellularly: cytoplasm (metabolic function) → nucleus (stress response, AMPK-dependent). ' +
    'Extracellular secretion pathway unknown.',

  // ─── CIRCULATING LEVELS IN DISEASE ───────────────────────────────────────────
  serumLevels: {
    healthy_young: '[Verified] Reference: 45.9–218.5 ng/mL (Knoop 2019, mass spectrometry). ELISA kits report higher values (472–835 ng/mL in various studies — assay-dependent).',
    aging: '[Verified] Plasma: −11% middle-aged (45–55y), −21% older (70–81y) vs young (18–30y) — p<0.001. Muscle: +1.5× in older vs young — PARADOX (D\'Souza 2020).',
    T1DM: '[Verified] Lower than healthy controls (Kong/Cho 2021).',
    T2DM: '[Verified] Lower in inadequately controlled T2DM (HbA1c >7%) in n=225 cross-sectional (Ramanjaneya 2019 cited in Kong 2023).',
    GDM: '[Verified] 494.56 ± 26.26 vs 602.6 ± 29.02 ng/mL (−18%, p<0.01; Yin 2022).',
    obesity_children: '[Verified] 472.61 ± 22.83 vs 561.64 ± 19.19 ng/mL (p<0.01); sex-specific — males only (Du 2018, cited Kong 2023).',
    exercise_response: '[Verified] 11.9-fold muscle increase, 1.5-fold plasma increase post high-intensity cycling (Reynolds 2021).',
  },

  // ─── SIDE EFFECTS ─────────────────────────────────────────────────────────────
  sideEffects:
    '[Verified — animal] Injection site reactions and digestive disturbances at higher doses (10–15 mg/kg) in rodent studies (Pham 2025). ' +
    '15 mg/kg/day × 3 weeks well-tolerated in T2D rat model — no organ morphology changes, no hepatotoxicity (advantage vs metformin noted). ' +
    'Normal organ morphology maintained across all validated animal studies (Kim 2019, Zhang 2024). ' +
    '[Unknown] Long-term human safety profile — no human exogenous administration RCT adverse event data available. ' +
    '[Speculation] Human tolerance expected to be favorable given endogenous production and structural simplicity, but high-dose systemic effects uncharacterized. ' +
    'Phase I clinical trial (NCT03998514) will provide first human safety dataset.',

  // ─── STACKING ─────────────────────────────────────────────────────────────────
  stacks: [
    'MOTS-c + SS-31 (mitochondrial dual stack — MOTS-c targets AMPK/nuclear axis; SS-31 targets cardiolipin/cristae — complementary mechanisms)',
    'MOTS-c + Epithalon (longevity protocol — MOTS-c metabolic + Epithalon telomere/epigenetic)',
    'MOTS-c + BPC-157 (metabolic + healing stack for diabetic wound complications — speculation)',
    'MOTS-c + Semaglutide/Tirzepatide (complementary insulin sensitization — MOTS-c AMPK axis + GLP-1 axis; monitor for hypoglycemia)',
  ],

  // ─── HUMAN EVIDENCE SUMMARY ───────────────────────────────────────────────────
  humanEvidence:
    '5 human studies (observational/cross-sectional — no exogenous RCT yet). ' +
    '(1) Reynolds 2021 (n=10): exercise-induced MOTS-c in skeletal muscle and plasma. ' +
    '(2) D\'Souza 2020 (n=78): plasma vs muscle MOTS-c paradox across age groups. ' +
    '(3) Yin 2022 (n=40): GDM vs healthy pregnant women — 18% lower plasma MOTS-c. ' +
    '(4) Kong 2023 (n=225 T2DM cross-sectional, T1DM serum data): inverse correlation with HbA1c severity; T1DM serum lower than controls. ' +
    '(5) Domin 2023 (n=20): positive correlation with lower-body strength (R²=0.53) and muscle mass; null correlation with VO2max. ' +
    'Phase I clinical trial (NCT03998514) ongoing — first exogenous human dose data pending publication.',

  // ─── SOURCE NOTES ─────────────────────────────────────────────────────────────
  sourceNotes:
    '12 peer-reviewed sources extracted May 2026 across 3 batches. ' +
    'Batch 1: Reynolds JC et al. Nat Commun 2021;12:470 (PMID 33479225) · ' +
    'D\'Souza RF et al. Aging 2020;12:5244 (PMID 32191905) · ' +
    'Fuku N et al. Aging Cell 2015;14:921 (PMID 26289118). ' +
    'Batch 2: Mohtashami IJMS 2022 (PMID 36233291) · ' +
    'Kim SJ et al. Physiol Rep 2019 (PMID 31293078) · ' +
    'Zheng Front Endocrinol 2023 (DOI 10.3389/fendo.2023.1120533) · ' +
    'Yildiz Ozkaya AEM 2025 (DOI 10.20945/2359-4292-2025-0063) · ' +
    'Zhang Antioxidants 2024 (PMID 38790718). ' +
    'Batch 3: Pham T et al. Front Physiol 2025;16:1602271 (DOI 10.3389/fphys.2025.1602271) · ' +
    'Yin Y et al. Pharmacol Res 2022;175:105987 · ' +
    'Kong BS, Lee C, Cho YM. Diabetes Metab J 2023;47:315-324 · ' +
    'Domin R et al. Int J Mol Sci 2023;24:14951. ' +
    'Community dosing reference [Speculation]: Lemke R, The Peptide Toolkit, Apr 2026. ' +
    'Clinical trial: NCT03998514 (MOTS-c analog, hepatic steatosis/obesity, ongoing).',
},

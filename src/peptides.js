// ─────────────────────────────────────────────────────────────────────────────
// PINEALON (EDR) — peptides.js entry
// Extracted: May 2026
// Sources: Khavinson et al. Molecules 2021;26:159 (PMID 33396303);
//          Khavinson VKh, Kuznik BI. Peptide Bioregulators monograph. 2014;
//          Peptide Toolkit. Pinealon EDR Brain Bioregulator Dosing Guide 2026;
//          Lee E (FACE). Pineal and Pituitary Peptides. Clinical Peptide Society.
// Evidence labels: [Verified] = confirmed in peer-reviewed data;
//                  [Speculation] = mechanistic hypothesis or uncontrolled report;
//                  [Unknown] = no human data exists
// ─────────────────────────────────────────────────────────────────────────────

{
  name: 'Pinealon',
  fullName: 'EDR Tripeptide (H-Glu-Asp-Arg-OH)',
  category: 'cognitive',
  goals: ['cognitive', 'longevity', 'neuroprotection', 'inflammation'],
  summary:
    'Pinealon is the trade name for the synthetic tripeptide Glu-Asp-Arg (EDR), ' +
    'developed by V.Kh. Khavinson\'s group at the St. Petersburg Institute of ' +
    'Bioregulation and Gerontology. It is proposed as a brain-targeted short ' +
    'biopeptide with neuroprotective effects. Animal studies (rodent) demonstrate ' +
    'reduced neuronal apoptosis in oxidative-stress and hypoxia models, preserved ' +
    'dendritic spine morphology in Alzheimer\'s disease models, and modulation of ' +
    'BDNF and antioxidant gene expression. Unblinded Russian clinical reports ' +
    'describe symptomatic improvement in post-stroke and age-related cognitive ' +
    'decline patients at IM doses of 0.5–2 mg. There are no Western randomized ' +
    'controlled trials. Research peptide only; not FDA-approved. [Verified: rodent ' +
    'neuroprotection data; Speculation: human cognitive benefit; Unknown: Western ' +
    'RCT evidence].',
  mechanism:
    'EDR is cell- and nucleus-permeable. [Verified] It binds specific DNA promoter ' +
    'sequences (CCTGCC and CCAGCC) in neurons — 3 binding sites in the PPARA gene ' +
    'promoter and 5 sites in the PPARG gene promoter — thereby modulating gene ' +
    'expression and protein synthesis without itself having hormonal activity. ' +
    '[Verified] This upregulates the antioxidant enzyme system: superoxide dismutase ' +
    '(SOD2) and glutathione peroxidase (GPX1), which neutralize reactive oxygen ' +
    'species (ROS) and reduce lipid peroxidation. [Verified] EDR regulates ERK1/2 ' +
    'expression via the MAPK signaling pathway, reducing proapoptotic protein ' +
    'activity (caspase-3, p53) and supporting neuronal survival. [Verified] PPARA ' +
    'and PPARG gene expression is upregulated under stress conditions, contributing ' +
    'to anti-inflammatory and dendritic-spine-normalizing effects. [Speculation] ' +
    'Involvement of JNK, p38, and ERK5 kinases is assumed based on their known role ' +
    'in AD oxidative stress but has not been experimentally confirmed for EDR. ' +
    '[Speculation] Serotonin synthesis pathway modulation and calmodulin regulation ' +
    'are proposed as additional AD-relevant targets.',
  benefits: [
    '[Verified] Reduced neuronal apoptosis in oxidative-stress and hypoxia rodent models',
    '[Verified] Preservation of mushroom-shaped dendritic spines in 5xFAD AD mouse hippocampal cultures',
    '[Verified] Decreased ROS and increased lag phase of MAP kinase activation in cerebellar granule cell cultures',
    '[Verified] Normalization of CNS functional activity in prenatal hyperhomocysteinemia rat model',
    '[Verified] Upregulation of PPARA and PPARG gene expression under physical stress in humans',
    '[Verified — unblinded] Improved memory, reduced headache, emotional balance improvement in 72 TBI patients (oral administration, uncontrolled)',
    '[Verified — unblinded] Decreased correction-test errors and increased α-index of brain bioelectric activity in long-term TBI consequences',
    '[Speculation] Post-stroke and age-related cognitive decline symptomatic improvement per Russian clinical reports',
    '[Speculation] BDNF and antioxidant gene expression modulation',
  ],
  dosing: {
    typical: '100–300 mcg/day subcutaneous for 10–20 days',
    range: '100–300 mcg/day (SC biohacker); 0.5–2 mg/day IM (Russian clinical)',
    frequency: 'Daily during cycle; cycle repeated 2–3 times per year',
    route: ['subcutaneous injection', 'intramuscular injection', 'sublingual', 'oral'],
    cycle:
      '10–20 days on, repeated 2–3×/year (biohacker SC protocol). ' +
      '10–14 days IM (Russian clinical, post-stroke). ' +
      '30 days sublingual/oral (Russian retail drops or caps, 3–4×/day).',
    notes:
      'Reconstitution: 10 mg vial + 2 mL bacteriostatic water = 5,000 mcg/mL. ' +
      '200 mcg dose = 0.04 mL = 4 units on a U-100 insulin syringe. ' +
      'Store lyophilized at −20°C (stable for years); reconstituted at 2–8°C, ' +
      'discard at 28 days. Commonly stacked with Cortagen (AEDP, cortex-targeted ' +
      'bioregulator) in biohacker protocols — no published trial data on the ' +
      'combination. [Speculation] Do not confuse with Epithalon (AEDG, ' +
      'tetrapeptide) — different sequence, different proposed mechanisms. ' +
      'Demand COA with HPLC purity ≥98% and endotoxin testing; counterfeiting ' +
      'and mis-labeling as Epithalon are documented. All dosing is researcher or ' +
      'clinical convention; no phase I/II human PK studies exist. [Unknown]',
  },
  sideEffects:
    'Russian clinical literature reports rare local injection-site reactions. ' +
    'No serious adverse events documented at standard doses. [Verified — uncontrolled] ' +
    'Long-term repeated-cycle safety in humans is completely uncharacterized. [Unknown] ' +
    'Drug interactions, organ toxicity, and carcinogenicity have not been assessed ' +
    'in controlled human studies. [Unknown]',
  researchLevel: 'low',
  sourceNotes:
    'Khavinson V, Linkova N, Kozhevnikova E, Trofimova S. EDR Peptide: Possible ' +
    'Mechanism of Gene Expression and Protein Synthesis Regulation Involved in the ' +
    'Pathogenesis of Alzheimer\'s Disease. Molecules 2021;26:159. PMID: 33396303. | ' +
    'Khavinson VKh, Kuznik BI. Peptide Bioregulators monograph. 2014. | ' +
    'Peptide Initiative. Pinealon Protocol — Dosing Guide. | ' +
    'Lemke R. Pinealon: EDR Brain Bioregulator Dosing Guide 2026. ' +
    'The Peptide Toolkit (thepeptidetoolkit.com), May 4 2026. | ' +
    'Lee E (FACE). Pineal and Pituitary Peptides. Institute for Hormonal Balance, ' +
    'Clinical Peptide Society.',
},

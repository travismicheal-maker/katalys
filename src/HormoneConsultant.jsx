import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the Hormone AI Consultant — a precision educational tool for both men's and women's hormone optimization, built on peer-reviewed evidence from PubMed-level sources, RCTs, consensus guidelines, and longitudinal cohort studies.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL DISCLAIMERS (never omit these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Educational information only — NOT medical advice
• All treatment decisions require a qualified hormone specialist physician
• Label every factual claim: [Verified], [Emerging Evidence], or [Speculation]
• Never present uncertain information as fact
• End clinical/treatment responses with: ⚠️ Always work with a qualified hormone specialist for individualized evaluation and treatment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE PHILOSOPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] 7 Pillars of Health (ALWAYS address first — more powerful than any medication):
1. Exercise (resistance training + cardiovascular)
2. Diet ("food is medicine" — protein-forward, anti-inflammatory)
3. Sleep (7-9 hours quality sleep)
4. Stress management
5. Social connection
6. Sunlight exposure
7. Spirit / purposeful living

[Verified] Philosophy: Shared decision-making, individualized precision medicine, genomics-informed care, evidence-based approach. Each patient is unique — no one-size-fits-all protocols.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEN'S HORMONE HEALTH — COMPLETE FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TESTOSTERONE IN MEN — PHYSIOLOGY:
[Verified] Normal male total testosterone range: 300–1000 ng/dL (varies by lab; many experts consider 400–700 ng/dL optimal for most symptomatic men)
[Verified] Free testosterone (calculated via SHBG + albumin) is more clinically meaningful than total T alone
[Verified] Symptoms of low testosterone (hypogonadism): fatigue, low libido, erectile dysfunction, poor sleep, loss of muscle mass, increased body fat (especially visceral), brain fog, depression, decreased bone density
[Verified] Labs before initiating TRT: Total T (morning, fasting), Free T (calculated), SHBG, LH, FSH, Estradiol (E2), CBC (hematocrit), PSA, metabolic panel, lipid panel, thyroid panel

TESTOSTERONE CYPIONATE — INJECTION PROTOCOLS:
[Verified] Testosterone cypionate: most commonly prescribed ester in the US; half-life ~8 days
[Verified] ONCE WEEKLY IM (intramuscular) — traditional protocol:
  • Dose range: 100–200 mg/week IM (typically glutes, quads, or deltoid)
  • Larger weekly bolus → higher peak serum testosterone → more pronounced peak-to-trough fluctuation
  • Higher peaks increase aromatization → more estradiol conversion → gynecomastia, water retention, mood swings
  • Higher peaks also drive greater 5α-reductase activity → more DHT conversion → scalp hair loss, prostate effects
  • Hematocrit risk: supraphysiological peaks directly stimulate erythropoiesis → polycythemia, elevated hematocrit
  • Many patients feel well for days 1-4, then crash days 5-7 (trough effect)

[Verified] TWICE WEEKLY SubQ (subcutaneous) — preferred modern protocol:
  • Dose: same total weekly dose split into 2 equal injections (e.g., 100 mg/week = 50 mg twice weekly)
  • SubQ depot (abdominal fat, thigh): slower, more consistent absorption — naturally smooths peaks and troughs
  • Benefits of smaller, more frequent dosing:
    → Lower peak testosterone → reduced aromatization → lower estradiol → less need for aromatase inhibitors
    → Lower peak → less supraphysiological DHT spikes → fewer androgenic side effects
    → More stable hematocrit — significantly reduces polycythemia risk vs IM bolus dosing
    → More stable blood pressure — supraphysiological peaks associated with transient HTN
    → More consistent mood, energy, libido — patients report fewer "crash days"
    → Smaller injection volume per dose = less discomfort
  • Evidence: Multiple studies confirm SubQ delivers equivalent serum levels to IM with more stable pharmacokinetics
  • Needle: 25-27g, 5/8" is typically sufficient for SubQ in most patients

[Verified] SUPRAPHYSIOLOGICAL DOSING RISKS — why staying physiologic matters:
  • Polycythemia (elevated hematocrit >54%): dose-dependent; driven by peak testosterone → erythropoietin stimulation
    → Risk: increased blood viscosity → thrombosis, stroke, pulmonary embolism
    → Management: reduce dose/frequency first; therapeutic phlebotomy if persistent
  • Hypertension: supraphysiological testosterone promotes sodium/water retention, increases sympathetic tone
    → Physiologic dosing (maintaining T in normal range 500–800 ng/dL) rarely causes clinically significant HTN
  • DHT imbalance: excess DHT from high-dose T → accelerated androgenic alopecia, possible prostate symptoms
    → Physiologic T levels maintain normal DHT:T ratio; supraphysiologic T pushes DHT disproportionately high
  • Testicular atrophy: exogenous T suppresses LH/FSH → intratesticular testosterone drops → atrophy
    → HCG 500-1000 IU 2x/week can maintain intratesticular T and testicular volume

TESTOSTERONE ENANTHATE:
[Verified] Testosterone enanthate: half-life ~5-6 days (slightly shorter than cypionate ~8 days)
[Verified] Identical mechanism and effects to cypionate — the ester only affects release rate
[Verified] Enanthate requires slightly more frequent dosing than cypionate for equivalent stability (e.g., every 5-6 days vs every 7 days for once-weekly protocols)
[Verified] Common in Europe; interchangeable with cypionate clinically; same dose conversions apply
[Verified] Twice-weekly SubQ applies equally well to enanthate — same principle of smoothing peaks/troughs
[Verified] No clinically meaningful difference in efficacy, side effect profile, or outcomes between cypionate and enanthate at equivalent doses

TOPICAL TESTOSTERONE — MEN:
[Verified] Formulations: AndroGel 1%/1.62%, Testim, Fortesta, Axiron (axillary); various compounded creams/gels
[Verified] Mechanism: transdermal absorption; bypasses first-pass hepatic metabolism; no injection required
[Verified] Advantages: no injection anxiety, steady-state levels (apply daily), flexible dosing, reversible
[Verified] Disadvantages:
  • Transfer risk: direct skin contact can transfer testosterone to partners/children — significant concern
  • HIGH skin DHT conversion: 5α-reductase in skin converts T → DHT at disproportionately high rates vs injection
  • Variable absorption: 10–35% bioavailability; significant inter-individual variation
  • Scrotal application (compounded cream): ~4–5x higher testosterone absorption than non-scrotal skin; significant DHT elevation
[Verified] Dosing: AndroGel 1.62% — start 40.5 mg/day (2 pumps); titrate based on labs; max 81 mg/day
[Verified] Lab monitoring: check serum T 2-4 hours after application (peak); recheck in 2-4 weeks after any dose change
[Emerging Evidence] Scrotal testosterone cream (compounded 10-20%): growing use in TRT clinics; produces very high local DHT — some practitioners use this intentionally for libido/sexual function, but requires careful DHT monitoring

ENCLOMIPHENE AND CLOMIPHENE — SERM-BASED TRT ALTERNATIVES:
[Verified] Mechanism: both are selective estrogen receptor modulators (SERMs) that block estrogen receptors in the hypothalamus and pituitary → removes negative feedback → pituitary releases more LH and FSH → testes produce more endogenous testosterone
[Verified] KEY ADVANTAGE: unlike exogenous testosterone, clomiphene/enclomiphene PRESERVE testicular function, fertility, and endogenous production — no suppression of the HPG axis
[Verified] Ideal candidates: younger men (under 40-45), men desiring fertility, men with secondary hypogonadism (low T + low/normal LH), men preferring to avoid injections

CLOMIPHENE (Clomid):
[Verified] Clomiphene citrate: consists of two isomers — enclomiphene (active, raises T) + zuclomiphene (estrogenic, may cause side effects)
[Verified] Dose: 25–50 mg every other day or 12.5–25 mg daily
[Verified] Raises total testosterone by 100–200 ng/dL on average in most hypogonadal men
[Verified] Side effects: visual disturbances (rare but important — discontinue if occur), mood changes, estradiol elevation (zuclomiphene has estrogenic activity), less predictable than enclomiphene

ENCLOMIPHENE (Androxal):
[Verified] Enclomiphene: purified trans-isomer of clomiphene — only the active anti-estrogenic component; removes the pro-estrogenic zuclomiphene
[Verified] Pharmacologically cleaner than clomiphene: raises LH, FSH, and testosterone WITHOUT the estrogenic burden of zuclomiphene
[Verified] Phase III RCT data: enclomiphene 12.5-25 mg/day achieved testosterone levels equivalent to topical testosterone gel while preserving sperm production
[Verified] Dose: 12.5–25 mg/day orally
[Emerging Evidence] Enclomiphene + low-dose HCG: some clinicians combine for synergistic HPG axis stimulation
[Verified] Currently available as compounded medication or via off-label prescribing in the US
[Verified] Preferred over clomiphene when: fertility preservation is important, estrogenic side effects occur on clomiphene, or cleaner pharmacology is desired

HPG AXIS COMPARISON TABLE:
• Exogenous testosterone: ↑↑ T, ↓↓ LH/FSH, ↓↓ sperm, ↓↓ testicular size
• Clomiphene: ↑ T (moderate), ↑ LH/FSH, preserved/improved sperm, preserved testicular size
• Enclomiphene: ↑ T (moderate-good), ↑↑ LH/FSH, preserved/improved sperm, preserved testicular size
• HCG monotherapy: ↑ T, ↓ LH (suppresses), preserved testicular size

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEBUNKING MAJOR TRT MYTHS — EVIDENCE-BASED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MYTH 1: "TRT CAUSES HEART DISEASE"
[Verified] Origin of myth: 2010 Basaria et al. trial (TEAM trial) — small n=209, high-risk elderly men, saw increased cardiovascular events. Widely misinterpreted. The patients were frail, elderly (mean age 74), and had pre-existing cardiovascular disease.
[Verified] TESTOSTERONE AND ATHEROSCLEROSIS — the real evidence:
  • Low testosterone is independently associated with increased cardiovascular mortality (multiple large cohort studies)
  • Testosterone improves insulin sensitivity, reduces visceral fat, improves lipid profiles, and has vasodilatory effects on coronary arteries
[Verified] TESTOSTERONE TRIAL (TTrials) 2016 — landmark NIH-funded study, n=788 men aged 65+:
  • Testosterone improved sexual function, physical function, bone density, and anemia
  • No significant increase in cardiovascular events vs placebo
[Verified] TRAVERSE Trial 2023 — NEJM — largest RCT to date, n=5,246 hypogonadal men with established cardiovascular disease or high CV risk:
  • Testosterone gel vs placebo over 33 months
  • Result: testosterone was NON-INFERIOR to placebo for major adverse cardiovascular events (MACE)
  • Conclusion: TRT does NOT increase cardiovascular risk in hypogonadal men, even in high-risk populations
[Verified] Meta-analyses (Cao et al., J Clin Endocrinol Metab 2019; n=30 RCTs): no significant increase in cardiovascular events with testosterone therapy
[Verified] NUANCE: Supraphysiological dosing (bodybuilder-level doses 10-100x therapeutic) IS associated with cardiovascular harm — this is NOT the same as therapeutic TRT. The myth conflates abuse doses with therapeutic doses.
[Verified] POLYCYTHEMIA caveat: elevated hematocrit from TRT does increase thrombosis risk — this is a real, manageable side effect that requires monitoring (not the same as atherosclerotic cardiovascular disease)

MYTH 2: "TRT CAUSES PROSTATE CANCER"
[Verified] Origin of myth: 1941 Huggins & Hodges — showed castration (testosterone removal) shrunk prostate cancer → incorrectly reverse-extrapolated that high testosterone CAUSES prostate cancer
[Verified] THE SATURATION MODEL (Morgentaler, 2006) — current evidence-based paradigm:
  • Prostate androgen receptors SATURATE at low testosterone levels (~200 ng/dL)
  • Above saturation, additional testosterone has no additional stimulatory effect on prostate tissue
  • This explains why castrate levels → shrinkage, but physiologic → supraphysiologic range has no incremental prostate growth effect
[Verified] EPIDEMIOLOGICAL EVIDENCE contradicts the myth:
  • Prostate cancer incidence peaks in the 7th-8th decade when testosterone is at its LOWEST lifetime levels
  • Men with highest natural testosterone in population studies do NOT have higher prostate cancer rates
  • Hypogonadal men actually have HIGHER rates of high-grade (aggressive) prostate cancer, not lower
[Verified] TRT IN MEN WITH TREATED PROSTATE CANCER — emerging evidence:
  • Morgentaler et al.: multiple case series of TRT in men with treated/low-risk prostate cancer — no significant increase in recurrence
  • [Emerging Evidence] Selected men with treated prostate cancer (post-radical prostatectomy, low-risk) may be candidates for TRT with careful monitoring
[Verified] WHAT TRT DOES DO TO THE PROSTATE:
  • PSA rises modestly (~0.5-1.0 ng/mL) in the first 3-6 months of TRT — this represents restoration of prostate to its natural androgen-stimulated state, not disease progression
  • PSA should be checked at 3 months, then annually
  • Stable PSA after initial rise is reassuring; rapid rise (>0.75 ng/mL/year) warrants urological evaluation
[Verified] BENIGN PROSTATIC HYPERPLASIA (BPH): testosterone does NOT cause BPH; DHT plays a role in BPH — 5α-reductase inhibitors (dutasteride, finasteride) treat BPH by reducing DHT
[Verified] Current guidelines (AUA, Endocrine Society): TRT is not contraindicated in men with no evidence of prostate cancer and properly managed PSA monitoring

MYTH 3: "TRT PERMANENTLY SHUTS DOWN NATURAL TESTOSTERONE PRODUCTION"
[Verified] Exogenous testosterone DOES suppress LH/FSH and endogenous production while on therapy — this is expected and reversible in most men
[Verified] Recovery timeline: most men recover HPG axis function within 3-18 months after stopping TRT, depending on duration of use and age
[Verified] HCG co-administration during TRT preserves testicular function and speeds recovery after discontinuation
[Verified] Exception: very long-term use (>10 years) or older age may result in slower or incomplete recovery — important to counsel patients

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEN'S TRT MONITORING FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Baseline (before starting): Total T, Free T, SHBG, LH, FSH, E2 (sensitive assay), CBC, PSA, metabolic panel, lipids, thyroid
[Verified] 4-6 weeks after starting/dose change: Total T (trough for injections = morning before next dose), E2, hematocrit
[Verified] Every 6-12 months stable on TRT: Full panel above + PSA + DRE annually after age 40
[Verified] Hematocrit thresholds: >54% = dose reduction or therapeutic phlebotomy; >52% = consider dose adjustment
[Verified] Estradiol management: target E2 20-30 pg/mL on TRT; aromatase inhibitors (anastrozole) only if symptomatic AND E2 elevated — avoid over-suppression (E2 too low → joint pain, low libido, osteoporosis risk, cardiovascular risk)
[Verified] Target testosterone on TRT: mid-to-upper normal range (500-900 ng/dL total T); avoid supraphysiological levels (>1100 ng/dL consistently)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE ANDROGEN POOL ANALOGY (Women)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Think of androgens as water in a pool:
• POOL DEPTH = SHBG level (determines how much androgen the system can hold before "overflowing")
• WATER = androgens (testosterone, DHT, DHEA)
• OVERFLOW = virilization symptoms (facial hair, acne, voice changes, clitoral enlargement)
• PCOS = very SHALLOW pool — even a small androgen addition overflows immediately
• Android-dominant women (e.g., high SHBG, wiry/lean phenotype) = DEEP pool — absorbs more androgen without overflow
• Adrenals contribute ~50% of androgen "water" into the pool; ovaries contribute ~50%
• Ovaries continue making testosterone ~10 years after menopause (into early-mid 60s)
• Androgen pool can vary 20-FOLD between individual women

[Verified] Androgen strength hierarchy (androgenic potency):
DHT (strongest, ~5x testosterone) > Testosterone (moderate) > DHEA (weakest, but converts to DHT rapidly in sebaceous tissue)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TESTOSTERONE THERAPY IN WOMEN — COMPLETE PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Evidence base: 36 RCTs, 8,480 participants (Islam et al., Lancet Diabetes Endocrinol 2019)
[Verified] Sole evidence-based indication: Hypoactive Sexual Desire Disorder (HSDD) in postmenopausal women (Global Consensus Position Statement 2019; ISSWSH 2021; ICSM 2024)
[Verified] Clinical effects (Level 1, Grade A): increases satisfying sexual events, desire, arousal, orgasm, pleasure; decreases sexual distress
[Verified] More than 50% of females on HRT benefit from adding testosterone
[Verified] CRITICAL: If you give estrogen + progesterone WITHOUT testosterone, you are actually DECREASING testosterone via negative feedback inhibition

ROUTE COMPARISON (Women):
[Verified] SUBCUTANEOUS INJECTION (preferred):
• Best option — more stable levels than IM
• If SHBG >40: once weekly injection typically sufficient
• If SHBG <40: consider twice weekly (faster metabolism, less stability)
• Starting dose: 2.5 mg testosterone cypionate SQ ONCE WEEKLY
• Standard clinical range: 10–20 mg/week (start LOW)

[Verified] TOPICAL (cream/gel) — important caveats:
• No FDA-approved testosterone for women (US) — must use compounded formulations
• SIGNIFICANT PROBLEM: topical/cream testosterone converts to DHT at an unnaturally HIGH rate via 5-alpha reductase enzyme in skin
• Solution: often need low-dose dutasteride 0.5 mg once weekly
• Check labs 2–6 weeks after starting; recheck with each pharmacy/tube change

[Verified] PELLETS — least preferred:
• Irreversible for 3-month period; higher rates of supraphysiologic levels
• SubQ injections preferred over pellets in all cases

VIRILIZATION MONITORING (Women — MANDATORY):
[Verified] Monitor: facial/body hair growth, androgenic acne, voice deepening (IRREVERSIBLE), clitoromegaly, androgenic alopecia, amenorrhea
[Verified] Labs: Check total testosterone + SHBG at 3–6 weeks, then every 6 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHBG — THE HORMONE BUFFER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] SHBG = produced predominantly in the liver; half-life ~7 days
[Verified] Function: binds androgens and estrogens, rendering them biologically inactive. Only FREE (unbound) fraction is bioavailable.
[Verified] ANALOGY: SHBG is like a "hormone savings account" — the bigger the account, the more stable your hormone levels

Binding affinity hierarchy (tightest to loosest):
DHT (strongest binding) >> Testosterone > DHEA/Androstenedione > Estradiol (weakest binding)

[Verified] Women's reference ranges: Premenopausal: ~40–120 nmol/L; Postmenopausal: ~30–100 nmol/L; Minimum target: ≥50 nmol/L
[Verified] Men's reference ranges: 10–57 nmol/L; optimal TRT range: 20–40 nmol/L

SHBG MATRIX:
[Verified] HIGH SHBG + ADEQUATE total hormones on HRT = OPTIMAL (stable buffered system)
[Verified] HIGH SHBG + INADEQUATE total hormones = FEEL TERRIBLE (free hormones too low)
[Verified] LOW SHBG = hormones in/out rapidly, more side effects, signals insulin resistance

FACTORS THAT RAISE SHBG: Oral estrogen, oral contraceptives, thyroid hormones (especially T3), liver disease, calorie restriction, high fiber diet, cardiovascular exercise, protein intake
FACTORS THAT LOWER SHBG: Insulin resistance, obesity, androgens/anabolic steroids, glucocorticoids, growth hormone, hypothyroidism, SARMs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DUTASTERIDE — COMPLETE CLINICAL FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Drug class: Potent competitive irreversible inhibitor of BOTH type I AND type II 5-alpha reductase
[Verified] vs finasteride: ~3x stronger type 2 inhibition, ~100x stronger type 1 inhibition; lowers DHT ~98% (vs ~71% for finasteride); half-life ~5 WEEKS

NET HORMONAL EFFECTS:
[Verified] ↓↓↓ DHT (98% reduction) | ↑ Testosterone | ↑ Estrogen
[Verified] CRITICAL: Monitor T:E ratio on dutasteride — lower DHT = INCREASED estrogen sensitivity
[Verified] Progesterone connection: 5α-reductase also converts progesterone to DHP (allopregnanolone) → GABA receptor activation → dutasteride treats PMDD/PMS/progesterone sensitivity

DOSING IN WOMEN (off-label):
[Verified] Typical: 0.15–0.5 mg oral, 1–3x per week (NOT daily in most women)
[Verified] Female pattern hair loss (FAGA): Boersma 2014 (n=3,500): 65.6% improvement, 83.3% increase in hair thickness

DOSING IN MEN:
[Verified] BPH/hair loss: 0.5 mg/day standard FDA-approved dose
[Verified] Off-label for DHT management on TRT: 0.5 mg 2-3x/week to reduce androgenic side effects (hair loss, prostate symptoms) without fully eliminating DHT
[Verified] ABSOLUTE CONTRAINDICATION: pregnancy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HRT FRAMEWORK — WOMEN (Estrogen, Progesterone, Testosterone)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Transdermal estrogen (patch/gel/cream): preferred — minimal SHBG/TBG impact, lower thrombosis risk
[Verified] Oral estrogen: raises SHBG 2–4x, raises TBG, increases clot risk — less preferred
[Verified] Progesterone sensitivity (~10% women): oral most common → liver → large DHP/GABA effect; try transdermal first, then consider dutasteride
[Verified] Bioidentical progesterone (micronized): more predictable than synthetic progestins
[Verified] DHEA-S Decision Rule: >200 mcg/dL → start E+P first; <150 → consider all three simultaneously

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENOPAUSAL WEIGHT GAIN — THE 6-PUNCH CASCADE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Six punches at menopause: ↓Estrogen → ↓GH/IGF-1 → ↓DHEA-S → ↓Testosterone → ↓Progesterone → ↓Melatonin/poor sleep → insulin resistance → visceral fat
[Verified] SWAN Cohort (Greendale 2019): fat gain DOUBLED at menopause transition; visceral fat +8.2%/year starting 2 years before final menstrual period; 4-year critical window
[Verified] QUICKSAND ANALOGY: once metabolic syndrome has started, GLP-1 agonists are the "backhoe" to get out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLP-1 MEDICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INDICATIONS: [Verified] HbA1c ≥5.7% OR fasting insulin ≥12 OR body fat >35% DEXA OR menopausal woman who has done "everything right" and still cannot lose weight
[Verified] Tirzepatide preferred if: diabetic, pre-diabetic, or body fat >50%
[Verified] MANDATORY: resistance training + protein ≥1.2–1.6 g/kg daily; without this, significant muscle loss occurs
[Verified] Maintenance semaglutide: 0.1–0.25 mg weekly; wean gradually over 1–12 months
[Verified] Post-GLP-1 tools: LDN, bupropion/naltrexone, orexin inhibitors, berberine, allulose, fiber + casein protein

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPREHENSIVE LAB ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HORMONE PANEL (both sexes): Total T, Free T (calculated), SHBG, DHEA-S, DHT, Estradiol (E2), LH, FSH
ADDITIONAL (men): PSA, prolactin
ADDITIONAL (women): Progesterone (day 21 if cycling)
METABOLIC: Fasting insulin (flag >7), fasting glucose (flag >100), HbA1c, hs-CRP, ApoB lipid panel, ALT
THYROID: TSH, Free T3, Free T4, ± reverse T3, thyroid antibodies
BODY COMPOSITION: DEXA scan (gold standard — lean mass, fat mass, visceral fat, bone density)
RED FLAGS: Fasting insulin >12 OR HbA1c ≥5.7% = GLP-1 candidate; hematocrit >54% on TRT = dose reduction

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Label EVERY factual claim: [Verified], [Emerging Evidence], or [Speculation]
- Use analogies for complex concepts (pool, savings account, bumper cars, backhoe, quicksand)
- Lead with most evidence-based, actionable content
- Include relevant study citations when discussing evidence (TRAVERSE 2023, Islam 2019, Boersma 2014, Global Consensus 2019, ISSWSH 2021, TTrials 2016, Morgentaler saturation model, etc.)
- Structure responses clearly with logical flow
- Use math/statistics when explaining concepts (ratios, percentages, reference ranges)
- When responding to men: use male-specific reference ranges, dosing, and monitoring parameters
- When responding to women: use female-specific reference ranges, dosing, and monitoring parameters
- End all clinical/treatment questions with: ⚠️ Always work with a qualified hormone specialist for personalized evaluation and treatment.
- Do NOT use em dashes (—); use a colon or comma instead
- Use - for bullet points, NOT asterisks (*)
- Use ## for section headers (they render as styled headers)
- Use --- on its own line for section breaks (renders as a visual line)
- Use markdown tables (| Col | Col |\n|---|---|\n| val | val |) for comparative data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CITATION FORMAT (required on every response)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Use numbered inline citations [1] [2] immediately after each factual claim
- End every response with a numbered References section:
  [1] Author Year, Journal, PMID:XXXXXXX
  [2] Organization Year, Guideline name, https://url
- Label each citation type in the reference: [RCT], [Meta-analysis], [Guideline], [Cohort], [Case series]
- Example: "Testosterone was non-inferior to placebo for MACE [1]"
  [1] Lincoff AM et al. 2023, N Engl J Med 389:107 [RCT, n=5,246] PMID:37326322

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVIDENCE HARD STOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If peer-reviewed evidence does not exist to support a clinical claim, state this explicitly and do not speculate. Do not generate a response where the evidence base is absent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENHANCED GRADE LABELS (use these exact formats)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Include study type and sample size in every GRADE label when known:
[Verified — High | RCT n=5246]
[Verified — High | Meta-analysis 36 RCTs]
[Verified — Moderate | Cohort n=788]
[Verified — Low | Case series]
[Emerging Evidence | Pilot RCT n=40]
[Speculation | Mechanistic only]`;



// ─── Data ───────────────────────────────────────────────────────────────────
const QUICK_TOPICS = [
  { label: "TRT: once weekly IM vs twice weekly SubQ — which is better?", icon: "💉" },
  { label: "Does TRT cause heart disease or prostate cancer?", icon: "❤️" },
  { label: "Enclomiphene vs clomiphene — what's the difference?", icon: "💊" },
  { label: "Topical testosterone — how does it work?", icon: "🧴" },
  { label: "My SHBG is high — is that good or bad?", icon: "🔗" },
  { label: "Why am I gaining weight in menopause?", icon: "⚖️" },
  { label: "What labs should I get for hormone testing?", icon: "🧪" },
  { label: "Testosterone cypionate vs enanthate — what's the difference?", icon: "⚗️" },
  { label: "Dutasteride for hair loss — evidence?", icon: "💇" },
  { label: "Should I try GLP-1 medications?", icon: "🎯" },
  { label: "PCOS and androgen excess — how does it work?", icon: "🧬" },
  { label: "7 Pillars of Health — where to start?", icon: "🏛️" },
];

const ALGORITHM_STEPS = [
  { step:"01", title:"7 Pillars Foundation", subtitle:"Non-negotiable before medications", color:"#059669", bg:"#f0fdf4", border:"#bbf7d0",
    items:["Exercise — resistance training (non-negotiable) + cardiovascular","Diet — protein-forward ≥1.2–1.6g/kg, anti-inflammatory, low processed sugar","Sleep — 7-9 hrs quality sleep; address vasomotor symptoms if disrupting sleep","Stress management — cortisol dysregulation worsens every hormonal imbalance","Social connection — loneliness elevates cortisol chronically","Sunlight — vitamin D3, circadian rhythm, mood regulation","Spirit / purpose — psychological wellbeing directly impacts hormone signaling"],
    note:"[Verified] These 7 pillars are more powerful than any medication or supplement — always address first" },
  { step:"02", title:"Comprehensive Labs", subtitle:"Baseline before any intervention", color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe",
    items:["Tier 1 Hormones: Total T + SHBG → Free T (Vermeulen), DHEA-S, DHT, E2, Progesterone, LH, FSH","Tier 2 Metabolic: Fasting insulin (flag >7), Fasting glucose (flag >100), HbA1c, hs-CRP, ApoB lipid panel, ALT","Tier 3 Thyroid: TSH, Free T3, Free T4 ± reverse T3, thyroid antibodies","Body Composition: DEXA scan (lean mass, fat mass, visceral fat, bone density)","DHEA-S Decision Rule: >200 → start E+P first, add T later; <150 → consider all three simultaneously","Free T:E2 Target Ratio: Free T should be ~2–3× lower than E2 (same units); >4–5× = estrogen dominant","Metabolic Threshold: A1C ≥5.7% OR fasting insulin ≥12 = GLP-1 candidate"],
    note:"[Verified] No blood level cut-off can diagnose HSDD — testosterone diagnosis is clinical, not purely biochemical (Global Consensus 2019)" },
  { step:"03", title:"SHBG Optimization", subtitle:"The hormone buffer system", color:"#6d28d9", bg:"#f5f3ff", border:"#ddd6fe",
    items:["Target SHBG minimum ≥50 nmol/L; higher is better IF total hormones are adequate on HRT","SHBG <30 nmol/L → suspect insulin resistance, NAFLD, visceral adiposity → metabolic workup","SHBG >40 → once weekly SQ testosterone injection sufficient; SHBG <40 → twice weekly","Identify SHBG-suppressors: OCPs (40–80% free T reduction), insulin resistance, obesity","OCP cessation: SHBG may take 1–2 YEARS to normalize — factor into assessment","Thyroid medication (especially T3) → significantly raises SHBG → may unmask low free hormones","Raising SHBG: fix insulin resistance, inositol, thyroid optimization, cardiovascular exercise, dietary fiber"],
    note:"[Verified] SHBG = hormone savings account. High balance (SHBG) + adequate deposits (total hormones) = optimal stability" },
  { step:"04", title:"Hormone Replacement", subtitle:"Estrogen · Progesterone · Testosterone", color:"#b45309", bg:"#fffbeb", border:"#fde68a",
    items:["Estrogen route: Transdermal (patch/gel/cream) preferred — minimal SHBG/TBG impact, lower clot risk","Oral estrogen: raises SHBG 2–4×, raises TBG → may need more thyroid hormone, increases clot risk","Starting testosterone (SQ preferred): 2.5 mg testosterone cypionate SQ once weekly (SHBG ~70)","Topical testosterone requires dutasteride ~0.5 mg once weekly — skin converts T→DHT at abnormally high rate","Progesterone sensitivity (~10% women): try transdermal first; if still problematic consider dutasteride","Virilization monitoring: acne, facial hair, voice changes (irreversible!), clitoromegaly, scalp hair loss","All 3 simultaneously if DHEA-S <150; add testosterone to E+P if DHEA-S >200 after 3 months","Pellets: least preferred (irreversible for 3 months, supraphysiologic risk); SubQ > IM > pellets"],
    note:"[Verified] >50% of women on HRT benefit from testosterone. Without it, E+P alone DECREASES endogenous testosterone via negative feedback" },
  { step:"05", title:"DHT Management", subtitle:"Dutasteride · 5α-Reductase Inhibitors", color:"#be185d", bg:"#fdf2f8", border:"#fbcfe8",
    items:["Candidates: SHBG <30 (shallow pool), topical testosterone users, FAGA, hirsutism, PMDD/progesterone sensitivity","Dutasteride preferred over finasteride: ~98% vs ~71% DHT reduction; half-life 5 weeks vs 6 hours; no dutasteride syndrome","Typical off-label dose: 0.15–0.5 mg oral, 1–3× per week (NOT daily in most women)","CRITICAL: Monitor T:E ratio on dutasteride — ↓DHT = ↑estrogen sensitivity; watch for estrogen excess symptoms","FAGA evidence: Boersma 2014 (n=3,500): 65.6% improvement, 83.3% ↑ hair thickness; women <50 respond better","Emerging: Dutasteride mesotherapy (localized scalp injections) — blocks DHT only at follicle, avoids systemic effects","ABSOLUTE CONTRAINDICATION: pregnancy; reliable contraception mandatory in reproductive-age women","Also treats PMDD/PMS/postpartum via progesterone→DHP pathway — studied up to 2.5 mg/day"],
    note:"[Verified] Natural DHT blockers (saw palmetto, nettles) are too weak. Prefer SHBG optimization instead" },
  { step:"06", title:"Body Composition & Weight", subtitle:"The 6-Punch Cascade + GLP-1 Strategy", color:"#b91c1c", bg:"#fff1f2", border:"#fecdd3",
    items:["SWAN cohort: fat gain DOUBLES at menopause transition; lean mass DECLINES; 4-year critical window","Visceral fat: +8.2%/year starting 2 years before FMP — not captured by scale weight","GLP-1 candidates: HbA1c ≥5.7% OR fasting insulin ≥12 OR body fat >35% DEXA","Tirzepatide preferred if: diabetic, significantly pre-diabetic, or body fat >50%","MANDATORY with GLP-1: resistance training + protein ≥1.2–1.6g/kg daily (no exceptions)","Maintenance semaglutide: 0.1–0.25 mg weekly; wean over 1–12 months — no rush","Post-GLP-1 maintenance tools: LDN, bupropion/naltrexone, orexin inhibitors, berberine, allulose, apelyne","Monitor DEXA every 6–12 months: lean mass, visceral fat, bone mineral density"],
    note:"[Verified] GLP-1s are the backhoe to get out of the quicksand — but lifestyle IS the sustainable foundation. ~50% regain without it" },
];

const EVIDENCE_CITATIONS = [
  { study:"Global Consensus 2019", finding:"Sole evidence-based indication: HSDD in postmenopausal women. Level 1, Grade A for sexual function outcomes.", source:"J Clin Endocrinol Metab 2019;104:4660" },
  { study:"Islam et al. 2019", finding:"Meta-analysis of 36 RCTs, 8,480 participants — short-term efficacy and safety of testosterone in postmenopausal women confirmed.", source:"Lancet Diabetes Endocrinol 2019;7:754" },
  { study:"ISSWSH 2021", finding:"Clinical practice guideline for testosterone in HSDD. Transdermal preferred; no oral; pellets highest adverse event rate.", source:"J Sex Med 2021;18:849; PMID 33797277" },
  { study:"SWAN Cohort (Greendale 2019)", finding:"Fat gain rate doubled at MT start; lean mass declined; visceral fat +8.2%/yr 2 years before FMP; 4-year critical window.", source:"JCI Insight 2019;4:e124864 — PMC6483504" },
  { study:"Boersma et al. 2014", finding:"Retrospective n=3,500 women: dutasteride improved FAGA in 65.6%; 83.3% increase in hair thickness; women <50 responded better.", source:"Indian J Dermatol Venereol Leprol 2014;80:521" },
  { study:"Ding et al. 2009 (NEJM)", finding:"Mendelian randomization: SHBG genetic variants causally linked to T2D risk — not just a marker of insulin resistance.", source:"N Engl J Med 2009;361:1152" },
  { study:"STEP 1 / SURMOUNT-1", finding:"Semaglutide: 15–22% body weight reduction. Tirzepatide starting dose 2.5 mg ≈ semaglutide 1.5 mg in potency.", source:"NEJM 2021;384:989 / NEJM 2022;387:205" },
  { study:"Topical Dutasteride RCT 2024", finding:"Phase II RCT: 0.05% topical dutasteride solution superior to finasteride 1mg oral at week 24; no serious adverse events.", source:"PMC12405733" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toBase64(file) {
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Read failed'));r.readAsDataURL(file);});
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  function formatContent(text) {
  if (!text) return '';
  let t = text.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
              .replace(/ — /g,': ').replace(/—/g,'-');

  const tableRegex = /(\|.+\|\n)([ \t]*\|[\s\-|:]+\|\n)((?:\|.+\|\n?)*)/gm;
  t = t.replace(tableRegex, (match, headerRow, sepRow, bodyRows) => {
    const parseRow = r => r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
    const headers = parseRow(headerRow);
    const rows = bodyRows.trim().split('\n').filter(Boolean).map(parseRow);
    const ths = headers.map(h=>`<th style="padding:8px 12px;text-align:left;background:#1e293b;color:#fff;font-size:12px;font-weight:600">${h}</th>`).join('');
    const trs = rows.map(r=>`<tr>${r.map((c,i)=>`<td style="padding:8px 12px;font-size:12px;border-bottom:1px solid #e2e8f0;${i===0?'font-weight:600;color:#0f172a':'color:#334155'}">${c}</td>`).join('')}</tr>`).join('');
    return `<table style="width:100%;border-collapse:collapse;margin:12px 0;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
  });
  t = t.replace(/^\|[\s\-|:]+\|$/gm,'');

  const lines = t.split('\n');
  const out = [];
  let bulletBuffer = [];
  const flushBullets = () => {
    if (bulletBuffer.length) {
      out.push(`<ul style="margin:6px 0;padding-left:0;list-style:none">${bulletBuffer.join('')}</ul>`);
      bulletBuffer = [];
    }
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^[ \t]*[\-\*_]{3,}[ \t]*$/.test(line)) {
      flushBullets();
      out.push('<div style="height:1px;background:#e2e8f0;margin:14px 0"></div>');
    } else if (/^#{1,4}\s/.test(line)) {
      flushBullets();
      const text = line.replace(/^#{1,4}\s+/, '');
      const level = line.match(/^(#{1,4})/)[1].length;
      const sz = level <= 2 ? '15px' : '13px';
      const wt = level <= 2 ? '700' : '600';
      out.push(`<div style="font-size:${sz};font-weight:${wt};color:#0f172a;margin:14px 0 6px;padding-bottom:5px;border-bottom:1px solid #e2e8f0">${text}</div>`);
    } else if (/^[\-\*]\s+/.test(line)) {
      const text = line.replace(/^[\-\*]\s+/, '');
      bulletBuffer.push(`<li style="display:flex;gap:7px;align-items:flex-start;margin:3px 0;font-size:13px;line-height:1.55;color:#1e293b"><span style="color:#4f46e5;font-weight:700;flex-shrink:0;margin-top:1px">•</span><span>${text}</span></li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      flushBullets();
      const num = line.match(/^(\d+)/)[1];
      const text = line.replace(/^\d+\.\s+/, '');
      out.push(`<div style="display:flex;gap:8px;align-items:flex-start;margin:3px 0;font-size:13px;line-height:1.55"><span style="color:#94a3b8;font-weight:600;flex-shrink:0;min-width:18px">${num}.</span><span style="color:#1e293b">${text}</span></div>`);
    } else if (line.includes('<table')) {
      flushBullets();
      out.push(line);
    } else if (line.trim() === '') {
      flushBullets();
      out.push('<div style="height:6px"></div>');
    } else {
      flushBullets();
      out.push(`<p style="margin:0 0 4px;font-size:14px;line-height:1.55;color:#1e293b">${line}</p>`);
    }
  }
  flushBullets();
  let html = out.join('\n');

  html = html
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#0f172a;font-weight:700">$1</strong>')
    .replace(/\[Verified\s*[-—]\s*High(?:\s*\|\s*([^\]]+))?\]/g,(_,x)=>`<span style="display:inline-flex;align-items:center;background:#f0fdf4;color:#15803d;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bbf7d0">✓ Verified High${x?` | ${x.trim()}`:''}
</span>`)
    .replace(/\[Verified\s*[-—]\s*Moderate(?:\s*\|\s*([^\]]+))?\]/g,(_,x)=>`<span style="display:inline-flex;align-items:center;background:#dbeafe;color:#1e40af;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bfdbfe">✓ Verified Mod${x?` | ${x.trim()}`:''}
</span>`)
    .replace(/\[Verified\s*[-—]\s*Low(?:\s*\|\s*([^\]]+))?\]/g,(_,x)=>`<span style="display:inline-flex;align-items:center;background:#fef9c3;color:#854d0e;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #fde68a">✓ Verified Low${x?` | ${x.trim()}`:''}
</span>`)
    .replace(/\[Verified\]/g,'<span style="display:inline-flex;align-items:center;background:#f0fdf4;color:#15803d;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bbf7d0">✓ Verified</span>')
    .replace(/\[Emerging Evidence(?:\s*\|\s*([^\]]+))?\]/g,(_,x)=>`<span style="display:inline-flex;align-items:center;background:#fffbeb;color:#92400e;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #fde68a">⚡ Emerging${x?` | ${x.trim()}`:''}
</span>`)
    .replace(/\[Speculation(?:\s*\|\s*([^\]]+))?\]/g,(_,x)=>`<span style="display:inline-flex;align-items:center;background:#f5f3ff;color:#6d28d9;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #ddd6fe">? Speculation${x?` | ${x.trim()}`:''}
</span>`)
    .replace(/⚠️([^\n<]*)/g,'<div style="margin-top:8px;padding:9px 13px;background:#fff7ed;border:1px solid #fed7aa;border-left:3px solid #ea580c;border-radius:6px;color:#9a3412;font-size:12px;line-height:1.5">⚠️$1</div>')
    .replace(/•/g,'<span style="color:#4f46e5;font-weight:bold;margin-right:3px">•</span>');
  return html;
}

  return (
    <div style={{display:"flex",justifyContent:isUser?"flex-end":"flex-start",marginBottom:"14px",gap:"8px",alignItems:"flex-start"}}>
      {!isUser && <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",flexShrink:0,marginTop:"2px"}}>🧬</div>}
      <div style={{maxWidth:"85%",background:isUser?"linear-gradient(135deg,#4f46e5,#6d28d9)":"#ffffff",border:isUser?"none":"1px solid #e2e8f0",borderRadius:isUser?"16px 16px 4px 16px":"4px 16px 16px 16px",padding:"11px 14px",color:isUser?"#fff":"#1e293b",fontSize:"14px",lineHeight:"1.65",boxShadow:isUser?"0 2px 10px rgba(79,70,229,0.2)":"0 1px 4px rgba(0,0,0,0.06)"}}>
        {isUser ? msg.content : <div dangerouslySetInnerHTML={{__html:formatContent(msg.content)}}/>}
      </div>
      {isUser && <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#0284c7,#0369a1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",flexShrink:0,marginTop:"2px"}}>👤</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HormoneAIConsultant() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"Welcome to the **Hormone AI Consultant** — a complete clinical framework for both men's and women's hormone optimization, built on peer-reviewed evidence and clinical practice guidelines.\n\n**For women I cover:**\n• HRT framework — estrogen, progesterone, testosterone routes and sequencing\n• SHBG optimization — the hormone buffer system with specific lab targets\n• Dutasteride — protocols for FAGA, hirsutism, and progesterone sensitivity\n• Menopausal weight gain — the 6-punch cascade model with SWAN cohort data\n\n**For men I cover:**\n• TRT protocols — once weekly IM vs twice weekly SubQ testosterone cypionate/enanthate\n• Topical testosterone — dosing, DHT conversion, absorption variables\n• Enclomiphene & clomiphene — fertility-preserving testosterone optimization\n• Debunking myths — the real evidence on TRT, heart disease, and prostate cancer\n\n[Verified] All responses label evidence level clearly.\n\n⚠️ Educational information only — always partner with a qualified hormone specialist."
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("chat");
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  // ─── Build system prompt with uploaded doc context ────────────────────────
  const buildSystemPrompt = () => {
    if (!uploadedDocs.length) return SYSTEM_PROMPT;
    const docContext = uploadedDocs.map((d,i) =>
      `[Uploaded Document ${i+1}: ${d.name}]\n${d.text || '(Binary file — see content below)'}`
    ).join('\n\n');
    return SYSTEM_PROMPT + `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPATIENT-UPLOADED DOCUMENTS (use these to personalize responses):\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${docContext}\n\nIMPORTANT: Reference the patient's uploaded documents when answering. Personalize all recommendations based on their actual lab values, history, and clinical data shown above.`;
  };

  // ─── File upload — PDF/image extraction (no system prompt, no caching) ────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { alert("File too large — max 20MB"); return; }
    setUploading(true);
    try {
      const isPDF = file.type === "application/pdf";
      const isImage = file.type.startsWith("image/");
      const isText = file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md");

      if (isText) {
        const text = await file.text();
        setUploadedDocs(prev => [...prev, { name:file.name, type:"text", text:text.slice(0,12000) }]);
      } else if (isPDF || isImage) {
        const b64 = await toBase64(file);
        const resp = await fetch("/api/chat", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            model:"claude-sonnet-4-6",
            max_tokens:2000,
            // NOTE: No system prompt here — this is a one-shot extraction call.
            // Caching only applies to system prompts, so nothing to cache for this call.
            messages:[{
              role:"user",
              content:[
                isPDF
                  ? {type:"document", source:{type:"base64", media_type:"application/pdf", data:b64}}
                  : {type:"image",    source:{type:"base64", media_type:file.type,          data:b64}},
                {type:"text", text:"Extract all text and key clinical values from this document. Include lab values with their reference ranges, dates, provider names, diagnoses, medications, and any other clinically relevant information. Format clearly."}
              ]
            }]
          })
        });
        const data = await resp.json();
        const extracted = data.mergedText || data.content?.[0]?.text || "Could not extract text.";
        setUploadedDocs(prev => [...prev, { name:file.name, type:isPDF?"pdf":"image", text:extracted }]);
      }
    } catch (err) {
      alert("Upload failed — please try again.");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeDoc = (i) => setUploadedDocs(prev => prev.filter((_,j) => j !== i));

  // ─── Send chat message — prompt caching + history trim applied ────────────
  const sendMessage = async (text) => {
    const userMsg = text || input;
    if (!userMsg.trim() || loading) return;
    setInput("");
    setShowTopics(false);
    if (activeView !== "chat") setActiveView("chat");
    const newMessages = [...messages, {role:"user", content:userMsg}];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 3000,
          // Prompt caching: system prompt (~5,500 tokens) cached at $0.30/M
          // instead of $3.00/M — saves ~85% on the largest input cost driver.
          system: [
            {
              type: "text",
              text: buildSystemPrompt(),
              cache_control: { type: "ephemeral" }
            }
          ],
          // History trim: last 12 messages (6 exchanges) — bumped from 6 for
          // improved follow-up quality and session continuity.
          messages: newMessages.slice(-12).map(m => ({
            role: m.role,
            content: m.content
          })),
          _sources: { clinicalWeb: false, literature: true }
        })
      });
      const data = await response.json();
      const reply = data.mergedText || data.content?.[0]?.text || "Connection error — please try again.";
      setMessages([...newMessages, {role:"assistant",content:reply}]);
    } catch {
      setMessages([...newMessages, {role:"assistant",content:"Connection error — please try again."}]);
    }
    setLoading(false);
  };

  const step = ALGORITHM_STEPS[activeStep];

  const navTabs = [
    {k:"chat",      label:"💬 Consult",   short:"💬"},
    {k:"algorithm", label:"📋 Algorithm", short:"📋"},
    {k:"evidence",  label:"📚 Evidence",  short:"📚"},
  ];

  return (
    <div style={{minHeight:"100%",background:"#f1f5f9",fontFamily:"'Georgia','Times New Roman',serif",color:"#1e293b",display:"flex",flexDirection:"column",height:"100%"}}>

      {/* ── HEADER ── */}
      <div style={{background:"#ffffff",borderBottom:"1px solid #e2e8f0",padding:isMobile?"0 12px":"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",position:"sticky",top:0,zIndex:100,height:isMobile?"52px":"60px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <img
            src="data:image/jpeg;base64,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"
            alt="Katalys Hormone AI"
            style={{
              width:isMobile?"36px":"44px",
              height:isMobile?"36px":"44px",
              objectFit:"contain",
              borderRadius:"8px",
              mixBlendMode:"multiply",
            }}
          />
          <div>
            <div style={{fontSize:isMobile?"13px":"15px",fontWeight:"700",color:"#8B3A2A",fontFamily:"'Playfair Display',Georgia,serif"}}>Katalys AI Hormone Consultant</div>
            {!isMobile && (
              <div style={{fontSize:"10px",color:"#D85A30",letterSpacing:"0.05em",textTransform:"uppercase",marginTop:"1px",fontWeight:"600"}}>
                Guideline-Anchored Hormone Optimization
              </div>
            )}
          </div>
        </div>
        <div style={{display:"flex",gap:"4px"}}>
          {navTabs.map(v=>(
            <button key={v.k} onClick={()=>setActiveView(v.k)} style={{
              padding:isMobile?"6px 10px":"7px 14px",borderRadius:"7px",cursor:"pointer",fontFamily:"inherit",
              fontSize:isMobile?"11px":"12px",fontWeight:"600",transition:"all 0.15s",
              border:activeView===v.k?"1px solid #c7d2fe":"1px solid #e2e8f0",
              background:activeView===v.k?"#eef2ff":"#f8fafc",
              color:activeView===v.k?"#4338ca":"#64748b",
            }}>{isMobile ? v.short : v.label}</button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0}}>

        {/* ══ CHAT VIEW ══ */}
        {activeView === "chat" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

            {/* Desktop */}
            {!isMobile && (
              <div style={{flex:1,display:"flex",overflow:"hidden"}}>
                {/* Sidebar */}
                <div style={{width:"200px",borderRight:"1px solid #e2e8f0",padding:"14px 10px",overflowY:"auto",background:"#ffffff",flexShrink:0}}>
                  <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px",fontWeight:"700"}}>Quick Topics</p>
                  {QUICK_TOPICS.map(t=>(
                    <button key={t.label} onClick={()=>sendMessage(t.label)} style={{width:"100%",textAlign:"left",padding:"7px 9px",background:"#f8fafc",border:"1px solid #f1f5f9",borderRadius:"7px",color:"#475569",fontSize:"11px",cursor:"pointer",marginBottom:"4px",lineHeight:"1.4",fontFamily:"inherit",transition:"all 0.15s",display:"flex",gap:"6px",alignItems:"flex-start"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.color="#4338ca";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#f8fafc";e.currentTarget.style.borderColor="#f1f5f9";e.currentTarget.style.color="#475569";}}>
                      <span style={{flexShrink:0}}>{t.icon}</span><span>{t.label}</span>
                    </button>
                  ))}
                  <div style={{marginTop:"16px",paddingTop:"14px",borderTop:"1px solid #e2e8f0"}}>
                    <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"8px",fontWeight:"700"}}>My Documents</p>
                    <label style={{display:"flex",alignItems:"center",gap:"5px",padding:"7px 10px",background:"#eef2ff",border:"1px solid #c7d2fe",borderRadius:"7px",cursor:uploading?"not-allowed":"pointer",fontSize:"11px",color:"#4338ca",fontWeight:"600",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}}>
                      {uploading ? "⏳ Reading..." : "📎 Upload Lab / Note"}
                      <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md,image/*" style={{display:"none"}} onChange={handleFileUpload} disabled={uploading}/>
                    </label>
                    <div style={{fontSize:"10px",color:"#94a3b8",marginTop:"5px",lineHeight:"1.4"}}>PDF · Images · Text files</div>
                    {uploadedDocs.map((d,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"6px",padding:"6px 8px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"6px"}}>
                        <span style={{fontSize:"12px"}}>📄</span>
                        <span style={{fontSize:"11px",color:"#15803d",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
                        <button onClick={()=>removeDoc(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"13px",padding:0,lineHeight:1}}>✕</button>
                      </div>
                    ))}
                    {uploadedDocs.length > 0 && <div style={{fontSize:"10px",color:"#059669",marginTop:"5px"}}>✓ AI will reference these</div>}
                  </div>
                </div>

                {/* Chat area */}
                <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:"#f8fafc"}}>
                  <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
                    {messages.map((msg,i)=><MessageBubble key={i} msg={msg}/>)}
                    {loading && (
                      <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"14px"}}>
                        <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>🧬</div>
                        <div style={{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"4px 14px 14px 14px",padding:"10px 14px",display:"flex",gap:"4px",alignItems:"center"}}>
                          {[0,1,2].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"#6366f1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef}/>
                  </div>
                  <div style={{padding:"12px 20px 14px",borderTop:"1px solid #e2e8f0",background:"#ffffff"}}>
                    <div style={{display:"flex",gap:"8px"}}>
                      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
                        placeholder="Ask about testosterone dosing, SHBG targets, dutasteride protocols..."
                        style={{flex:1,padding:"10px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"10px",color:"#1e293b",fontSize:"13px",outline:"none",fontFamily:"inherit"}}
                        onFocus={e=>e.target.style.borderColor="#a5b4fc"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                      <button onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{padding:"10px 18px",background:loading||!input.trim()?"#e2e8f0":"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:"10px",color:loading||!input.trim()?"#94a3b8":"#fff",fontSize:"13px",cursor:loading||!input.trim()?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:"700"}}>
                        {loading?"...":"Send →"}
                      </button>
                    </div>
                    <p style={{color:"#cbd5e1",fontSize:"10px",marginTop:"6px",textAlign:"center"}}>Educational only · Not medical advice · Always consult a qualified hormone specialist</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── MOBILE ── */}
            {isMobile && (
              <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                {uploadedDocs.length > 0 && (
                  <div style={{background:"#f0fdf4",borderBottom:"1px solid #bbf7d0",padding:"6px 14px",display:"flex",alignItems:"center",gap:"6px",flexShrink:0}}>
                    <span style={{fontSize:"11px"}}>📄</span>
                    <span style={{fontSize:"11px",color:"#15803d",fontWeight:"600"}}>{uploadedDocs.length} document{uploadedDocs.length>1?"s":""} uploaded — AI is referencing</span>
                    <button onClick={()=>setUploadedDocs([])} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"12px"}}>✕</button>
                  </div>
                )}
                <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
                  {messages.map((msg,i)=><MessageBubble key={i} msg={msg}/>)}
                  {loading && (
                    <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"14px"}}>
                      <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px"}}>🧬</div>
                      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"4px 12px 12px 12px",padding:"9px 12px",display:"flex",gap:"4px",alignItems:"center"}}>
                        {[0,1,2].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"#6366f1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef}/>
                </div>
                {showTopics && (
                  <div style={{background:"#ffffff",borderTop:"1px solid #e2e8f0",padding:"10px 12px",flexShrink:0}}>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                      {QUICK_TOPICS.map(t=>(
                        <button key={t.label} onClick={()=>sendMessage(t.label)} style={{padding:"6px 11px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"20px",fontSize:"11px",color:"#4338ca",cursor:"pointer",fontFamily:"inherit",display:"flex",gap:"4px",alignItems:"center",whiteSpace:"nowrap"}}>
                          <span>{t.icon}</span><span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{padding:"10px 12px 12px",borderTop:"1px solid #e2e8f0",background:"#ffffff",flexShrink:0}}>
                  <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                    <button onClick={()=>setShowTopics(v=>!v)} style={{width:"38px",height:"38px",borderRadius:"9px",background:showTopics?"#eef2ff":"#f8fafc",border:`1px solid ${showTopics?"#c7d2fe":"#e2e8f0"}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      💡
                    </button>
                    <label style={{width:"38px",height:"38px",borderRadius:"9px",background:"#f8fafc",border:"1px solid #e2e8f0",cursor:uploading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      {uploading?"⏳":"📎"}
                      <input type="file" accept=".pdf,.txt,.md,image/*" style={{display:"none"}} onChange={handleFileUpload} disabled={uploading}/>
                    </label>
                    <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
                      placeholder="Ask a hormone question..."
                      style={{flex:1,padding:"10px 12px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"10px",color:"#1e293b",fontSize:"13px",outline:"none",fontFamily:"inherit",minWidth:0}}
                      onFocus={e=>e.target.style.borderColor="#a5b4fc"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                    <button onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{width:"38px",height:"38px",background:loading||!input.trim()?"#e2e8f0":"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:"10px",color:loading||!input.trim()?"#94a3b8":"#fff",cursor:loading||!input.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      →
                    </button>
                  </div>
                  {uploadedDocs.length > 0 && (
                    <div style={{display:"flex",gap:"5px",marginTop:"7px",flexWrap:"wrap"}}>
                      {uploadedDocs.map((d,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:"4px",padding:"3px 8px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"20px"}}>
                          <span style={{fontSize:"10px"}}>📄</span>
                          <span style={{fontSize:"10px",color:"#15803d",maxWidth:"80px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
                          <button onClick={()=>removeDoc(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"11px",padding:0}}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p style={{color:"#cbd5e1",fontSize:"10px",marginTop:"6px",textAlign:"center"}}>Educational only · Not medical advice</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ ALGORITHM VIEW ══ */}
        {activeView === "algorithm" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {isMobile ? (
              <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
                {ALGORITHM_STEPS.map((s,i)=>(
                  <div key={i} style={{background:"#ffffff",border:`1px solid ${s.border}`,borderRadius:"12px",padding:"16px",marginBottom:"12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
                      <div style={{width:"36px",height:"36px",background:s.bg,border:`1px solid ${s.border}`,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:"14px",fontWeight:"900",color:s.color,fontFamily:"monospace"}}>{s.step}</span>
                      </div>
                      <div>
                        <div style={{fontSize:"15px",color:"#0f172a",fontWeight:"700"}}>{s.title}</div>
                        <div style={{color:s.color,fontSize:"11px",fontWeight:"600"}}>{s.subtitle}</div>
                      </div>
                    </div>
                    {s.items.map((item,j)=>(
                      <div key={j} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"8px 10px",background:s.bg,borderRadius:"7px",border:`1px solid ${s.border}`,marginBottom:"6px"}}>
                        <div style={{width:"4px",height:"4px",borderRadius:"50%",background:s.color,flexShrink:0,marginTop:"7px"}}/>
                        <span style={{color:"#334155",fontSize:"12px",lineHeight:"1.5"}}>{item}</span>
                      </div>
                    ))}
                    <div style={{marginTop:"10px",padding:"9px 12px",background:"#f8fafc",borderLeft:`3px solid ${s.color}`,borderRadius:"5px",fontSize:"11px",color:"#475569",fontStyle:"italic"}}>💡 {s.note}</div>
                    <button onClick={()=>{setActiveView("chat");setTimeout(()=>sendMessage(`Tell me more about Step ${s.step}: ${s.title} — specific protocols, dosing, and clinical pearls`),100)}} style={{marginTop:"10px",width:"100%",padding:"9px",background:s.bg,border:`1px solid ${s.border}`,borderRadius:"8px",color:s.color,cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:"700"}}>Ask AI About This Step →</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{flex:1,display:"flex",overflow:"hidden"}}>
                <div style={{width:"195px",borderRight:"1px solid #e2e8f0",padding:"16px 12px",background:"#ffffff",overflowY:"auto"}}>
                  <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px",fontWeight:"700"}}>6-Step Algorithm</p>
                  {ALGORITHM_STEPS.map((s,i)=>(
                    <button key={i} onClick={()=>setActiveStep(i)} style={{width:"100%",textAlign:"left",padding:"10px 12px",marginBottom:"4px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",borderRadius:"8px",background:activeStep===i?s.bg:"transparent",border:activeStep===i?`1px solid ${s.border}`:"1px solid transparent"}}>
                      <div style={{fontSize:"9px",color:activeStep===i?s.color:"#94a3b8",fontWeight:"800",marginBottom:"2px",fontFamily:"monospace",letterSpacing:"0.05em"}}>STEP {s.step}</div>
                      <div style={{fontSize:"12px",color:activeStep===i?"#0f172a":"#64748b",fontWeight:activeStep===i?"600":"400",lineHeight:"1.3"}}>{s.title}</div>
                    </button>
                  ))}
                </div>
                <div style={{flex:1,padding:"28px 32px",overflowY:"auto",background:"#f8fafc"}}>
                  <div style={{background:"#ffffff",border:`1px solid ${step.border}`,borderRadius:"14px",padding:"26px",marginBottom:"16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"22px",paddingBottom:"18px",borderBottom:`1px solid ${step.border}`}}>
                      <div style={{width:"52px",height:"52px",background:step.bg,border:`1px solid ${step.border}`,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:"20px",fontWeight:"900",color:step.color,fontFamily:"monospace"}}>{step.step}</span>
                      </div>
                      <div>
                        <h2 style={{fontSize:"20px",color:"#0f172a",margin:"0 0 4px",fontWeight:"700"}}>{step.title}</h2>
                        <p style={{color:step.color,fontSize:"13px",margin:0,fontWeight:"600"}}>{step.subtitle}</p>
                      </div>
                    </div>
                    <div style={{display:"grid",gap:"8px"}}>
                      {step.items.map((item,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 14px",background:step.bg,borderRadius:"8px",border:`1px solid ${step.border}`}}>
                          <div style={{width:"5px",height:"5px",borderRadius:"50%",background:step.color,flexShrink:0,marginTop:"8px"}}/>
                          <span style={{color:"#334155",fontSize:"13px",lineHeight:"1.6"}}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:"16px",padding:"12px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderLeft:`3px solid ${step.color}`,borderRadius:"6px",fontSize:"12px",color:"#475569",fontStyle:"italic",lineHeight:"1.5"}}>💡 {step.note}</div>
                  </div>
                  <div style={{display:"flex",gap:"10px",justifyContent:"space-between"}}>
                    <button onClick={()=>setActiveStep(Math.max(0,activeStep-1))} disabled={activeStep===0} style={{padding:"9px 18px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"8px",color:activeStep===0?"#cbd5e1":"#475569",cursor:activeStep===0?"not-allowed":"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"600"}}>← Previous</button>
                    <button onClick={()=>{setActiveView("chat");setTimeout(()=>sendMessage(`Tell me more about Step ${step.step}: ${step.title} — specific protocols, dosing, and clinical pearls`),100)}} style={{padding:"9px 18px",background:step.bg,border:`1px solid ${step.border}`,borderRadius:"8px",color:step.color,cursor:"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"700"}}>Ask AI About This Step →</button>
                    <button onClick={()=>setActiveStep(Math.min(ALGORITHM_STEPS.length-1,activeStep+1))} disabled={activeStep===ALGORITHM_STEPS.length-1} style={{padding:"9px 18px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"8px",color:activeStep===ALGORITHM_STEPS.length-1?"#cbd5e1":"#475569",cursor:activeStep===ALGORITHM_STEPS.length-1?"not-allowed":"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"600"}}>Next →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ EVIDENCE VIEW ══ */}
        {activeView === "evidence" && (
          <div style={{flex:1,overflowY:"auto",padding:isMobile?"14px":"28px 32px",background:"#f8fafc"}}>
            <div style={{marginBottom:"20px"}}>
              <h2 style={{color:"#0f172a",fontSize:isMobile?"16px":"18px",fontWeight:"700",marginBottom:"4px"}}>Evidence Base</h2>
              <p style={{color:"#64748b",fontSize:"13px"}}>Key studies powering this consultant's treatment algorithm</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"12px",marginBottom:"20px"}}>
              {EVIDENCE_CITATIONS.map((c,i)=>(
                <div key={i} style={{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"14px"}}>
                  <div style={{color:"#4338ca",fontSize:"13px",fontWeight:"700",marginBottom:"6px"}}>{c.study}</div>
                  <div style={{color:"#475569",fontSize:"12px",lineHeight:"1.6",marginBottom:"8px"}}>{c.finding}</div>
                  <div style={{color:"#94a3b8",fontSize:"10px",fontFamily:"monospace",background:"#f8fafc",padding:"3px 7px",borderRadius:"4px",border:"1px solid #e2e8f0"}}>{c.source}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:"12px"}}>
              {[
                {title:"SHBG Reference Ranges",color:"#6d28d9",bg:"#f5f3ff",border:"#ddd6fe",items:["Premenopausal: 40–120 nmol/L","Postmenopausal: 30–100 nmol/L","Dr. Gillett minimum target: ≥50","OCP effect: 2–4× increase","Free T reduction on OCP: 40–80%","SHBG half-life: ~7 days"]},
                {title:"Metabolic Red Flags",color:"#b91c1c",bg:"#fff1f2",border:"#fecdd3",items:["Fasting glucose >100 mg/dL","Fasting insulin >7 μIU/mL","Fasting insulin >12 = GLP-1 Rx","HbA1c ≥5.7% = GLP-1 Rx","Body fat >35% DEXA = GLP-1 Rx","hs-CRP >1.0 mg/L = cardiometabolic risk"]},
                {title:"Dutasteride vs Finasteride",color:"#b45309",bg:"#fffbeb",border:"#fde68a",items:["DHT reduction: ~98% vs ~71%","Type I inhibition: 100× stronger","Type II inhibition: 3× stronger","Half-life: 5 weeks vs 6 hours","No dutasteride syndrome","FAGA: 65.6% improvement (n=3,500)"]},
              ].map(col=>(
                <div key={col.title} style={{background:"#ffffff",border:`1px solid ${col.border}`,borderRadius:"10px",padding:"14px"}}>
                  <h4 style={{color:col.color,fontSize:"13px",marginBottom:"10px",fontWeight:"700",paddingBottom:"7px",borderBottom:`1px solid ${col.border}`}}>{col.title}</h4>
                  {col.items.map(item=>(
                    <div key={item} style={{color:"#475569",fontSize:"12px",padding:"4px 0",borderBottom:`1px solid ${col.border}`,display:"flex",gap:"6px",alignItems:"flex-start"}}>
                      <span style={{color:col.color,fontWeight:"700",fontSize:"10px",marginTop:"2px",flexShrink:0}}>▸</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder { color:#94a3b8; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:4px; }
      `}</style>
    </div>
  );
}

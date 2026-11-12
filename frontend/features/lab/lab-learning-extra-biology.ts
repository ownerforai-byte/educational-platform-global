/**
 * Learning packs for the biology labs that had none — previously
 * "Under progress". Same `LabLearningPack` shape as `lab-learning.ts`,
 * merged by `getLabLearning`.
 */

import type { LabLearningPack } from "./lab-learning";

export const EXTRA_LEARNING_BIOLOGY: Record<string, LabLearningPack> = {
  "bio-3d-cell": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Why are cells 10–100 µm and not 1 mm? The surface-area-to-volume arithmetic",
      steps: [
        { text: "Take a cube cell of side 20 µm:", math: "SA = 6 × 400 = 2400 µm²;  V = 8000 µm³;  SA/V = 0.3 µm⁻¹" },
        { text: "Split it into 8 cells of side 10 µm:", math: "each SA/V = 600/1000 = 0.6 µm⁻¹ — double the exchange surface per unit volume" },
        { text: "Sustaining flux: demand scales with volume, supply with surface:", math: "SA/V must stay high → cells stay small ✓" },
        { text: "The scale ladder:", math: "prokaryote 1–5 µm;  animal cell 10–30 µm;  plant cell 10–100 µm;  egg cell ~100 µm (special case: stockpiled cytoplasm)" },
        { text: "Membrane thinness:", math: "bilayer ≈ 7.5 nm — a 20 µm cell wrapped in a sheet 1/2500th of its width" },
      ],
      takeaway: "Cell size is set by a ratio, not a preference: volume (demand) grows as L³ while surface (supply) grows as L², so life divides instead of enlarges — and every big organism is many small cells, not one big one.",
    },
    theory: [
      {
        heading: "Cell theory and the two architectures",
        body: "All living things are cells or products of cells; the cell is the smallest living unit. Prokaryotes (bacteria, archaea) are small, lack a nucleus and membrane-bound organelles, and reproduce fast (E. coli: 20 min). Eukaryotes compartmentalise: a nucleus guards the DNA and dozens of organelle types divide the chemistry — slower but vastly more capable.",
      },
      {
        heading: "The organelle division of labour",
        body: "Mitochondria respire (ATP); ribosomes translate (protein); ER folds and ships; Golgi modifies and dispatches; lysosomes digest; chloroplasts (plants) photosynthesise; the cell wall (plants) and cytoskeleton (all) provide structure. Membranes make the compartments possible: selectively permeable bilayers with transport proteins gate every import and export.",
      },
    ],
    confusions: [
      {
        wrong: "Plant cells have no mitochondria — chloroplasts do the energy work.",
        right: "Plant cells have BOTH: chloroplasts make glucose in the light; mitochondria respiration runs day and night to convert sugar to ATP.",
        why: "The photosynthesis icon overshadows the respiration organelle in plant diagrams.",
      },
      {
        wrong: "Cell wall and cell membrane are the same barrier.",
        right: "The wall (plants, fungi, bacteria) is a rigid box outside the membrane — fully permeable. The membrane is the SELECTIVE gate that decides what enters.",
        why: "Both are outer layers drawn as lines.",
      },
      {
        wrong: "Bacteria are primitive cells without membranes.",
        right: "They have a full membrane and cytoplasm; what they lack are membrane-bound ORGANELLES and a nuclear envelope — small and simple, not unprotected.",
        why: "'No nucleus' slides into 'no structure'.",
      },
    ],
    questions: [
      { q: "Which organelle makes ATP in a liver cell?", a: "Mitochondrion — cristae host the electron transport chain (~30 ATP per glucose).", hint: "Powerhouse role." },
      { q: "Why does a cell burst in pure water?", a: "Water enters by osmosis until the membrane fails — plant cells survive via the wall's turgor pressure.", hint: "Osmotic balance." },
      { q: "Why are neurons long but still 'one cell'?", a: "The axon is a thin extension (volume stays modest) — an exception managed by active transport along the length.", hint: "SA/V thinking." },
    ],
  },

  "bio-3d-organelles": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Tracking one secreted protein — insulin — from gene to bloodstream",
      steps: [
        { text: "Translation on the rough ER:", math: "insulin's 51 amino acids ≈ 51 × 3 nt = 153 codons ≈ 8–15 s of ribosome time" },
        { text: "The ER folds it and adds no sugar here, but quality-checks:", math: "misfolded proteins are retained and degraded (ER stress response)" },
        { text: "Golgi receives, modifies, and addresses:", math: "proinsulin (86 aa) is cleaved to active insulin (51 aa, two chains joined by disulfide bridges)" },
        { text: "Vesicles ferry the cargo along cytoskeleton rails:", math: "kinesin walks 8 nm per step at ~800 nm/s — the Golgi-to-membrane trip takes ~seconds to minutes" },
        { text: "Exocytosis releases on demand:", math: "glucose signal → Ca²⁺ influx → vesicle fusion → insulin in the blood within minutes of a meal" },
      ],
      takeaway: "The endomembrane system is a factory line: translate (ER) → refine (Golgi) → pack (vesicle) → ship (exocytosis) — each organelle a station, each protein tagged with its destination.",
    },
    theory: [
      {
        heading: "The endomembrane system",
        body: "Nuclear envelope, ER, Golgi, lysosomes, vesicles and the plasma membrane form one connected logistics network. Ribosomes on the rough ER thread new proteins into its lumen; the smooth ER makes lipids and detoxifies; the Golgi is the post office — glycosylation, sorting, and dispatch by vesicle. Lysosomes (pH ≈ 4.8, acid hydrolases) recycle the failures and the worn parts.",
      },
      {
        heading: "Semi-autonomous organelles",
        body: "Mitochondria and chloroplasts carry their own circular DNA and ribosomes — evidence of endosymbiosis (a bacterium and a cyanobacterium engulfed by early eukaryotes ~1.5–2 billion years ago). They divide by fission like bacteria, which is why mitochondrial genes are inherited maternally — the basis of mitochondrial genealogy.",
      },
    ],
    confusions: [
      {
        wrong: "Ribosomes are organelles.",
        right: "Ribosomes are huge molecular machines, but NOT membrane-bound — organelle in the strict sense means a membrane-enclosed compartment.",
        why: "'Little organ' language invites the label.",
      },
      {
        wrong: "The Golgi makes proteins.",
        right: "Ribosomes/ER make them; the Golgi MODIFIES, sorts and ships — the factory vs post office distinction.",
        why: "The Golgi's prominence in diagrams is mistaken for a manufacturing role.",
      },
      {
        wrong: "Every cell has the same organelle set.",
        right: "Mature red blood cells have NO nucleus or mitochondria (they run on glycolysis); sperm carry almost no cytoplasm; muscle cells are packed with mitochondria. Form follows function.",
        why: "The generic textbook cell is remembered as a universal plan.",
      },
    ],
    questions: [
      { q: "Where do lysosomes come from?", a: "Budded from the Golgi trans face, pre-loaded with acid hydrolases tagged by mannose-6-phosphate.", hint: "Follow the tags." },
      { q: "Why can RBCs survive without mitochondria?", a: "Their only job is O₂ transport; glycolysis covers their ATP need — and dropping mitochondria frees space and avoids consuming the O₂ they carry.", hint: "Function shapes structure." },
      { q: "Why is mitochondrial DNA used to trace maternal lineage?", a: "Sperm contribute almost no mitochondria to the zygote — mtDNA passes mother→child unbroken, mutating at a steady rate.", hint: "Endosymbiosis + inheritance." },
    ],
  },

  "bio-3d-dna": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Packing 2 metres of DNA into a 6 µm nucleus — and copying it in hours",
      steps: [
        { text: "The raw length:", math: "3.2×10⁹ bp × 0.34 nm/bp ≈ 1.09 m per haploid set → ~2 m per diploid cell" },
        { text: "Into a nucleus ~6 µm across:", math: "packing ratio ≈ 2 m/6 µm ≈ 3×10⁵ linear — solved by nucleosomes (DNA wrapped 1.7× around histone octamers) plus higher-order coiling ≈ 10⁴–10⁶-fold" },
        { text: "Base pairing is the copying rule:", math: "A=T (2 H-bonds), G≡C (3 H-bonds) — semiconservative replication makes two exact daughters" },
        { text: "Replication rate:", math: "~50 nt/s per fork; one fork would take ~1000 h → ~30 000–50 000 origins run in parallel, finishing S phase in ~8 h" },
        { text: "GC-rich segments melt harder:", math: "T_m rises with GC% — the PCR and probe-design workhorse fact" },
      ],
      takeaway: "Two metres of tape into a 6 µm box, copied in eight hours with fewer than one error per billion letters: DNA's geometry (antiparallel strands, paired bases) is what makes both feats routine.",
    },
    theory: [
      {
        heading: "Structure: the double helix",
        body: "Two antiparallel sugar-phosphate backbones spiral around a common axis; bases pair inside (A–T, G–C) at 0.34 nm per turn-step, 10.5 bp per helical turn, ~2 nm wide. Antiparallelism (5'→3' each way) is why replication needs a leading strand and lagging strand with Okazaki fragments. Base pairing gives the template mechanism; the backbone direction gives the machinery its orientation.",
      },
      {
        heading: "The central dogma: DNA → RNA → protein",
        body: "Transcription copies one gene into mRNA (RNA polymerase, U instead of T); translation reads it in 3-letter codons on the ribosome — 64 codons, 20 amino acids, degenerate but unambiguous; tRNA adapters match codon to amino acid. One gene → one polypeptide (with eukaryotic splicing nuances) is the working summary of gene expression.",
      },
    ],
    confusions: [
      {
        wrong: "Genes and DNA are interchangeable words.",
        right: "DNA is the whole molecule; genes are specific segments that code (or regulate) something — ~20 000 protein-coding genes inside 3.2 billion bp, i.e. under 2% coding.",
        why: "'DNA testing' headlines blur the levels.",
      },
      {
        wrong: "The cell transcribes its whole genome at once.",
        right: "mRNA is one gene's transcript, made on demand and degraded after use — expression is selective, not archival.",
        why: "The genome is imagined as one big file that gets copied wholesale.",
      },
      {
        wrong: "Mutations are always harmful.",
        right: "Most are neutral (silent or noncoding), some harmful, a few beneficial — variation is evolution's raw material. Harmfulness is the exception that gets the attention.",
        why: "Mutations are introduced via disease examples.",
      },
    ],
    questions: [
      { q: "Complementary strand of 5'-ATGC-3'?", a: "3'-TACG-5' (written 5'-GCAT-3').", hint: "A–T, G–C, antiparallel." },
      { q: "H-bonds in a 10 bp segment with 6 GC pairs?", a: "6×3 + 4×2 = 26 H-bonds.", hint: "Count GC and AT separately." },
      { q: "Why can't RNA serve as the long-term genome in our cells?", a: "Ribose's 2'-OH makes it self-hydrolysing and less stable; DNA's H is the archival choice — RNA is the working copy.", hint: "Chemical stability." },
    ],
  },

  "bio-calc-punnett": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Two carrier parents (Aa × Aa) for a recessive condition — the square computed",
      steps: [
        { text: "Each parent makes equal gametes:", math: "A and a, 50% each" },
        { text: "Four equiprobable combinations:", math: "AA, Aa, Aa, aa — a 1:2:1 genotypic ratio" },
        { text: "Phenotypes for a recessive condition (a = faulty):", math: "AA + Aa unaffected (carriers hidden), aa affected → 3:1 UNAFFECTED:AFFECTED" },
        { text: "Each child's risk — independent events:", math: "25% affected EVERY pregnancy (not 25% of the family!)" },
        { text: "Test cross reveals carriers:", math: "Aa × aa → 1:1 affected:unaffected — the classic Mendelian detective move" },
        { text: "Two genes at once (AaBb × AaBb), independent assortment:", math: "9:3:3:1 phenotypic ratio — 16 squares" },
      ],
      takeaway: "The square is just probability made visible: multiply chances for AND (this gamete AND that one), add for OR — and every pregnancy is a fresh roll of the same dice.",
    },
    theory: [
      {
        heading: "Mendel's two laws",
        body: "Segregation: the two alleles of a gene separate into different gametes (meiosis anaphase I). Independent assortment: different genes' allele pairs separate independently — true when genes sit on different chromosomes or far apart on one. Dominance is a masking relationship, not strength: 'recessive' alleles simply produce no (or less) product, so one good copy covers.",
      },
      {
        heading: "Beyond simple dominance",
        body: "Incomplete dominance (pink snapdragons from red × white: 1:2:1 phenotypic), codominance (AB blood type expresses both), multiple alleles (ABO's three alleles), sex-linked inheritance (X-linked recessives hit males more: one X, no backup), polygenic traits (height, skin colour — continuous variation). Pedigree analysis is the human version of the Punnett square.",
      },
    ],
    confusions: [
      {
        wrong: "A 3:1 ratio means every fourth child will be affected.",
        right: "Each conception is independent: 25% risk EVERY time. Four children could be all affected, all unaffected, or anything between.",
        why: "Ratios describe large numbers of offspring, not a birth order.",
      },
      {
        wrong: "Dominant traits are the common ones.",
        right: "Dominance says nothing about frequency — Huntington's is dominant and rare; brown eyes are dominant and common. Frequency is set by selection and history.",
        why: "'Dominant' is heard as 'stronger/prevalent'.",
      },
      {
        wrong: "Two blue-eyed parents cannot have a brown-eyed child.",
        right: "Eye colour is polygenic (more than the classic two-gene story); rare combinations can produce surprises — and de novo mutation exists too.",
        why: "The simplified single-gene classroom model is over-extended.",
      },
    ],
    questions: [
      { q: "Aa × aa offspring ratio?", a: "1:1 — half carriers, half affected (for a recessive condition).", hint: "Test cross." },
      { q: "Parents AO × BO: possible blood types of children?", a: "A, B, AB, O — all four possible (each 25%).", hint: "Codominant alleles plus recessive O." },
      { q: "X-linked recessive: carrier mother (XᴺXᵃ) × normal father — sons' risk?", a: "50% of sons affected (they inherit their only X from mother); NO daughters affected (father gives Xᴺ).", hint: "Sex chromosomes." },
    ],
  },

  "bio-calc-population": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "N₀ = 1000 individuals, intrinsic rate r = 0.02 per month — exponential vs logistic",
      steps: [
        { text: "Exponential model N = N₀e^{rt}, 24 months later:", math: "N = 1000·e^{0.48} = 1616" },
        { text: "Doubling time is a constant of the model:", math: "t₂ = ln2/r = 0.693/0.02 = 34.7 months — independent of N" },
        { text: "Logistic model adds the ceiling K = 5000; growth slows as N → K:", math: "dN/dt = rN(1 − N/K)" },
        { text: "At N = K/2 = 2500 — the fastest growth point:", math: "dN/dt = 0.02·2500·0.5 = 25 individuals/month (maximum sustainable rate)" },
        { text: "Near the ceiling, N = 4500:", math: "dN/dt = 0.02·4500·0.1 = 9/month — crowded conditions already bite" },
      ],
      takeaway: "Exponential growth is a loan the environment eventually collects: the logistic curve keeps the same engine but multiplies it by the remaining headroom (1 − N/K), peaking at exactly half the carrying capacity.",
    },
    theory: [
      {
        heading: "Two growth models and their uses",
        body: "Exponential (J-curve) fits populations newly introduced or far below resources' limits — bacteria in fresh broth, deer on a new island. Logistic (S-curve) fits anything approaching a limit: growth rate peaks at K/2 (the maximum sustainable yield idea used in fisheries), then eases to zero at K. Neither model captures lag phases, overshoot-crash cycles or age structure — real populations need more state.",
      },
      {
        heading: "Regulation: what sets K",
        body: "Density-dependent factors tighten as N rises: food, territory, disease, predation, waste. Density-independent hits (floods, fires) kill proportionally regardless of N. r-strategists (many young, little care — insects, mice) bet on colonisation; K-strategists (few young, heavy investment — elephants, humans) bet on competition: two betting systems on the same curve.",
      },
    ],
    confusions: [
      {
        wrong: "Exponential growth can continue indefinitely.",
        right: "Resource limits make it a temporary phase — every real population curves over into logistic or collapses (overshoot and crash).",
        why: "Early-phase data looks unstoppable; extrapolation feels lawful.",
      },
      {
        wrong: "Carrying capacity K is a fixed number.",
        right: "K moves with conditions: a drought shrinks it, a new crop raises it (the Green Revolution literally raised human K).",
        why: "The S-curve's flat top looks like a law of nature.",
      },
      {
        wrong: "Population size and growth are the same discussion.",
        right: "Growth is the RATE (dN/dt); a big population can be shrinking and a small one booming. Age structure predicts tomorrow's growth better than today's size.",
        why: "News reports conflate the snapshot with the trend.",
      },
    ],
    questions: [
      { q: "Doubling time for r = 0.03/month?", a: "0.693/0.03 = 23.1 months.", hint: "ln2/r." },
      { q: "When is logistic growth fastest?", a: "At N = K/2 — maximum sustainable yield point.", hint: "The 1 − N/K factor peaks there." },
      { q: "Bacteria double every 20 min in fresh broth. After 3 h?", a: "9 doublings → 512× the start (then nutrients run out — the logistic phase).", hint: "2⁹." },
    ],
  },

  "bio-calc-photosynthesis": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Pondweed bubble-counting: 30 bubbles/min at 25 °C — then vary one factor at a time",
      steps: [
        { text: "Calibrate the bubble method (each bubble ≈ 0.1 mm³ O₂):", math: "rate = 30 × 0.1 = 3 mm³ O₂ per minute" },
        { text: "Double the light at LOW intensity (unsaturated):", math: "rate roughly doubles — light is the limiting factor" },
        { text: "Double it again at high intensity:", math: "no change — the light reactions are saturated; CO₂ or temperature now limits" },
        { text: "The overall equation fixes the stoichiometry:", math: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂;  ΔG = +2870 kJ/mol glucose (light pays)" },
        { text: "Warm by 10 °C (to 35 °C) at saturating light:", math: "dark-reaction enzymes speed up (Q₁₀ ≈ 2) — until ~40 °C, when proteins denature and rate falls" },
      ],
      takeaway: "Rate is controlled by the scarcest factor (light, CO₂ or temperature) — each factor plateaus, so 'more' only helps until the next bottleneck takes over. One-variable-at-a-time is how the curve is mapped.",
    },
    theory: [
      {
        heading: "Two stages, two locations",
        body: "Light reactions (thylakoid membranes): chlorophyll absorbs 400–700 nm (PAR), water is split — the Hill reaction showed the O₂ comes from WATER, not CO₂ — and ATP + NADPH are made. Dark reactions (stroma, Calvin cycle): that energy fixes CO₂ into G3P → glucose. The two stages are coupled by the ATP/NADPH conveyor belt.",
      },
      {
        heading: "C3, C4, CAM — three carbon strategies",
        body: "C3 (most plants): Calvin cycle direct; rubisco also grabs O₂ (photorespiration, a ~25% energy leak). C4 (maize, sugarcane): CO₂ is pre-fixed into 4-carbon acids in mesophyll, delivered to bundle-sheath cells — hot-climate win. CAM (cacti): stomata open at NIGHT to store CO₂ as malate; daylight fixes it with stomata shut — water saved at the cost of rate.",
      },
    ],
    confusions: [
      {
        wrong: "Plants only photosynthesise; respiration is an animal thing.",
        right: "Plants respire 24/7; photosynthesis only in light. Net gas exchange = photosynthesis − respiration — at the light compensation point they cancel.",
        why: "The iconic green-leaf-oxygen image omits the always-running metabolism.",
      },
      {
        wrong: "More light always means more growth.",
        right: "Beyond saturation the rate plateaus (and excess light photoinhibits PSII) — CO₂, temperature and nutrients then cap growth.",
        why: "Light is the most visible factor, so it is credited endlessly.",
      },
      {
        wrong: "The oxygen released comes from CO₂.",
        right: "It comes from splitting WATER — confirmed by Hill's isolated-chloroplast experiment and ¹⁸O isotope labelling (vin Ruben & Kamen).",
        why: "CO₂ is the famous reactant, so it gets the starring role.",
      },
    ],
    questions: [
      { q: "Why do bubbles stop at night in a pondweed experiment?", a: "No photosynthesis; only respiration (O₂ consumption) — net O₂ release is zero or negative.", hint: "Light-dependent stage." },
      { q: "Gross vs net photosynthesis?", a: "Gross = total fixed; net = gross − respiration. Net is what accumulates as growth.", hint: "Subtract the standing cost." },
      { q: "Why is C4 maize productive in the tropics?", a: "Pre-concentrating CO₂ suppresses photorespiration that cripples C3 plants at high temperature.", hint: "Rubisco's O₂ mistake." },
    ],
  },

  "bio-3d-suite": {
    proof: {
      title: "Proof on a specific case — molecule to ecosystem in one energy audit",
      case: "Follow one glucose molecule through cell, organism and ecosystem",
      steps: [
        { text: "CELL — aerobic respiration of one glucose:", math: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~30–32 ATP; energy in glucose 2870 kJ, captured ≈ 30 × 30.5 = 915 kJ ≈ 32% efficiency" },
        { text: "ORGANISM — the ATP churn:", math: "a human recycles roughly body weight in ATP per day (~50 kg) — ATP is a conveyor, not a store" },
        { text: "ECOSYSTEM — the 10% rule up the chain:", math: "1000 kJ of plants → ~100 kJ herbivore → ~10 kJ carnivore — the rest is respiration + waste" },
        { text: "That audit explains ecosystem structure:", math: "food chains rarely exceed 4–5 levels — at the 5th level, 10⁻⁴ of the original energy remains" },
        { text: "GENETICS — where the variation for all this comes from:", math: "meiosis with n = 23: 2²³ ≈ 8.4×10⁶ gamete combinations per parent — before crossing over" },
      ],
      takeaway: "One molecule's energy story links the levels: ~32% captured at the cell, ~10% passed at each trophic hop, 2²³ combinations of variation supplied by meiosis — biology's levels are one ledger, not separate subjects.",
    },
    theory: [
      {
        heading: "Energy flows, matter cycles",
        body: "Energy enters as sunlight, is converted once (photosynthesis), and degrades through the trophic levels to heat — one-way flow, never recycled. Matter (carbon, nitrogen, water) cycles endlessly through the same levels. This asymmetry is why ecosystems need constant sun and why nutrient cycles, not energy, are what conservation manages.",
      },
      {
        heading: "Levels of organisation and the variation engine",
        body: "Molecule → organelle → cell → tissue → organ → organism → population → community → ecosystem: each level has properties the parts alone do not. Variation from meiosis (assortment + crossing over) plus mutation is the raw material selection acts on — without it, populations cannot track changing environments.",
      },
    ],
    confusions: [
      {
        wrong: "Energy cycles through the ecosystem like carbon does.",
        right: "Energy FLOWS once (sun → heat, one-way); matter cycles. That is why sunlight is a permanent input requirement.",
        why: "Both diagrams are circular arrows on the same page.",
      },
      {
        wrong: "ATP is a storage battery holding lots of energy.",
        right: "It is a loaded SPRING — small, quick, rechargeable (~30.5 kJ/mol per hydrolysis). The real 'storage' is glycogen, fat, starch.",
        why: "'Energy molecule' suggests a big reservoir.",
      },
      {
        wrong: "Evolution means individuals changing to fit the environment.",
        right: "Individuals do not change genetically; POPULATIONS change in allele frequencies across generations. The giraffe did not stretch; long-necked variants left more offspring.",
        why: "Lamarck's picture is the intuitive one.",
      },
    ],
    questions: [
      { q: "Efficiency of converting glucose to ATP?", a: "~32% (915 of 2870 kJ); the rest leaves as heat — which is why you are warm.", hint: "Compare captured vs total." },
      { q: "Why do food chains stop at 4–5 levels?", a: "The 10% rule: at level 5 only 0.01% of the original energy remains — not enough to sustain a viable population.", hint: "Energy pyramid math." },
      { q: "How many gamete combinations can a human parent make (ignore crossing over)?", a: "2²³ ≈ 8.4 million.", hint: "Independent assortment." },
    ],
  },

  "bio-3d-diversity": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Two forest samples compared with real diversity indices",
      steps: [
        { text: "Sample A: 25 individuals — 10, 8, 5, 2 of four species. Proportions:", math: "p = 0.40, 0.32, 0.20, 0.08" },
        { text: "Simpson's index:", math: "D = 1 − Σp² = 1 − (0.16 + 0.1024 + 0.04 + 0.0064) = 0.691" },
        { text: "Shannon index:", math: "H = −Σp·ln p = 0.366 + 0.365 + 0.322 + 0.202 = 1.255" },
        { text: "Evenness (how fairly individuals are shared):", math: "J = H/ln S = 1.255/1.386 = 0.905 — close to 1, quite even" },
        { text: "Sample B: same 25 individuals but 22, 1, 1, 1:", math: "D = 1 − (0.88² + 3×0.04²) = 1 − 0.779 = 0.221 — same richness, FAR less diversity" },
      ],
      takeaway: "Richness (how many species) and evenness (how fairly shared) are separate axes: B has four species yet is dominated by one — the indices catch what a species count misses.",
    },
    theory: [
      {
        heading: "Why measure diversity, and how",
        body: "Diversity indices summarise community structure: Simpson D weights DOMINANT species (1 = infinite diversity, 0 = one species); Shannon H weights RARE species and is the information-theory entropy; evenness J = H/lnS separates balance from richness. Species–area relationship S = cA^z (z ≈ 0.25 for islands) predicts what habitat loss does: 90% area loss keeps only ~56% of species.",
      },
      {
        heading: "Threats and priorities",
        body: "HIPPO — Habitat destruction, Invasive species, Pollution, Population (human), Overharvesting — habitat loss first among equals. Conservation triage uses endemism, keystone roles, and feasibility. Protected areas + corridors beat isolated parks; flagship species (tiger) fund umbrella protection that saves whole ecosystems underneath.",
      },
    ],
    confusions: [
      {
        wrong: "More species always means more diverse.",
        right: "Evenness matters equally: a community of 10 species where one is 90% of individuals can be less diverse than 4 species in fair balance (sample B above).",
        why: "Species counts are easier, so they stand in for the concept.",
      },
      {
        wrong: "Biodiversity means species only.",
        right: "It spans genetic diversity (within species), species diversity, and ecosystem diversity — a crop monoculture and its wild relatives differ hugely in genetic diversity.",
        why: "Species lists are the visible layer.",
      },
      {
        wrong: "Conservation is about saving cute animals.",
        right: "Keystone and primary-producer protection (coral, insects, soil biota) sustains whole systems; the flagship is a funding vehicle, not the ecological point.",
        why: "Charismatic megafauna get the posters.",
      },
    ],
    questions: [
      { q: "Species–area: forest cut to 10% — expected species remaining (z = 0.25)?", a: "(0.1)^0.25 ≈ 0.56 → ~56% of species remain.", hint: "S ∝ A^0.25." },
      { q: "Which index stresses rare species?", a: "Shannon H — each species' proportion enters weighted by its own information content.", hint: "Compare with Simpson." },
      { q: "Endemic vs exotic — why does endemicity raise priority?", a: "Endemics exist nowhere else; losing them is a global extinction, not a local one.", hint: "Range size = stakes." },
    ],
  },

  "bio-3d-syllabus-suite": {
    proof: {
      title: "Proof on a specific case — microbe to ecosystem in one growth curve",
      case: "One E. coli cell in fresh broth, 20-minute generation time",
      steps: [
        { text: "LAG phase — adapting, enzyme induction; division ≈ 0 (a few hours)" },
        { text: "LOG phase — maximal exponential growth:", math: "N = N₀·2ⁿ; after 12 h (36 doublings): 2³⁶ ≈ 6.9×10¹⁰ cells from ONE" },
        { text: "But arithmetic meets chemistry: at 10⁹ cells/mL the medium is spent:", math: "waste (acids), pH drop, O₂ limitation — growth stalls" },
        { text: "STATIONARY → DEATH phase: deaths ≈ births, then decline. The full curve: lag-log-stationary-death.", math: "carrying capacity in a flask" },
        { text: "Disease link — infection dose:", math: "10⁶ CFU needed ≈ 2²⁰ cells ≈ 20 doublings ≈ 6.7 h at 20 min/generation — why food poisoning shows up 'hours later'" },
      ],
      takeaway: "A bacterial growth curve is the logistic curve in a flask: lag-log-stationary-death — the same physics of limits that shapes populations, scaled to hours, and it sets the timing of every infection.",
    },
    theory: [
      {
        heading: "Microbiology basics",
        body: "Bacteria (peptidoglycan walls, 70S ribosomes, circular DNA) grow by binary fission; archaea share the prokaryote plan but distinct biochemistry; viruses are non-cellular obligate parasites (DNA/RNA + capsid, sometimes envelope). Sterilisation must beat the toughest form — endospores survive boiling for hours; the autoclave (121 °C, 15 psi, 15 min) is the standard because pressure raises steam temperature.",
      },
      {
        heading: "Microbes in cycles, industry and immunity",
        body: "Nitrogen cycle: N₂ fixation (Rhizobium in legume nodules), nitrification, denitrification — microbes own the steps plants cannot do. Industry: yeast fermentation (bread, beer), antibiotics from Streptomyces, insulin from engineered E. coli. Immunity: innate (barriers, phagocytes, inflammation) then adaptive (B/T lymphocytes, antibodies, memory) — vaccination primes memory without disease.",
      },
    ],
    confusions: [
      {
        wrong: "All bacteria are germs to be killed.",
        right: "Gut flora (10¹³–10¹⁴ cells/person) digest fibre, synthesise vitamins K and B12, and train immunity — sterilising the world would sicken us.",
        why: "'Bacteria' entered the language via disease.",
      },
      {
        wrong: "Boiling water sterilises it.",
        right: "Boiling kills most vegetative pathogens but NOT endospores (Clostridium, Bacillus) — autoclave conditions are the sterilising standard.",
        why: "Boiling is what kitchens can do, so it is credited beyond its range.",
      },
      {
        wrong: "Antibiotics help against flu and COVID.",
        right: "Antibiotics hit bacterial targets (cell wall, 70S ribosomes) that viruses do not have — they are useless against viruses and drive resistance when misused.",
        why: "Both cause 'infection', so one treatment is assumed for both.",
      },
    ],
    questions: [
      { q: "Doublings for 10⁶ cells from one, and time at 20 min?", a: "log₂10⁶ ≈ 20 doublings → ~6.7 hours.", hint: "2ⁿ = 10⁶." },
      { q: "Why autoclave at 121 °C rather than 100 °C?", a: "Pressurised steam (15 psi) reaches 121 °C, killing endospores in 15 min — boiling cannot.", hint: "Pressure raises the boiling point." },
      { q: "Role of Rhizobium in the nitrogen cycle?", a: "N₂ fixation: converts inert N₂ to ammonia inside legume root nodules — the entry door for biological nitrogen.", hint: "Bacteria do what plants cannot." },
    ],
  },

  "bio-3d-biomolecules": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Building one dipeptide (glycine + alanine) and counting the cost",
      steps: [
        { text: "Start with the free amino acids:", math: "glycine C₂H₅NO₂ (75 g/mol) + alanine C₃H₇NO₂ (89 g/mol)" },
        { text: "Condensation removes water to form the peptide bond:", math: "product = C₅H₁₀N₂O₃, mass 75 + 89 − 18 = 146 g/mol" },
        { text: "The peptide bond —CO—NH— is planar (4 atoms coplanar, partial double-bond character) — the rigidity that shapes every protein:", math: "no free rotation about C–N ✓" },
        { text: "Chains grow by repetition: a 10-aa chain = 9 peptide bonds, and hydrolysis re-splits them:", math: "10 aa protein → 9 H₂O released on synthesis" },
        { text: "Energy bookkeeping across the four classes:", math: "lipid 37 kJ/g > protein 17 ≈ carbohydrate 17 — fat stores 2.2× more per gram because it is reduced and anhydrous" },
      ],
      takeaway: "Every polymer in biochemistry is monomers minus water: proteins (amino acids), carbohydrates (sugars), nucleic acids (nucleotides) — and the water count is the energy count.",
    },
    theory: [
      {
        heading: "The four macromolecule classes",
        body: "Carbohydrates: mono/di/poly-saccharides (glucose → starch, glycogen, cellulose — all C₆H₁₂O₆ units, differing only in the LINKAGE: α linkages digest, β linkages like cellulose do not, for humans). Lipids: triglycerides (glycerol + 3 fatty acids), phospholipids (membranes), steroids. Proteins: 20 amino acids, 4 structural levels (primary → secondary helix/sheet → tertiary fold → quaternary assembly). Nucleic acids: nucleotides = base + sugar + phosphate.",
      },
      {
        heading: "Structure begets function",
        body: "Enzymes are proteins whose 3D fold creates an active site with exact substrate geometry (lock-and-key, refined to induced fit); denaturation (heat, pH) destroys the fold and the function together — cooking an egg is irreversible denaturation. Vitamins are not fuel but coenzyme parts: niacin → NAD, riboflavin → FAD — the reason deficiency breaks metabolism globally.",
      },
    ],
    confusions: [
      {
        wrong: "Fats are simply bad.",
        right: "Fats are the densest fuel (37 kJ/g), insulation, hormone precursors and membrane material; only trans fats and excess are the problem.",
        why: "Diet culture compresses a whole class into a verdict.",
      },
      {
        wrong: "Proteins are mainly for muscles.",
        right: "Proteins are enzymes, antibodies, transporters, signals, structure — catalysis is their biggest job; muscle is one tissue among many.",
        why: "Protein shakes advertise muscle only.",
      },
      {
        wrong: "Vitamins give energy.",
        right: "Vitamins are cofactor parts — they help extract energy but carry none (0 kJ/g). Calories come only from carbs, fat, protein.",
        why: "'Energy drink' marketing blurs fuel from helper.",
      },
    ],
    questions: [
      { q: "Why can humans not digest cellulose while cows can?", a: "Cellulose is β-1,4-linked; we lack cellulase. Cows host symbiotic rumen microbes that supply it — the cow digests the microbes' products.", hint: "Linkage geometry." },
      { q: "Peptide bonds in a 21-aa insulin chain?", a: "20.", hint: "One fewer than the residue count." },
      { q: "Why is fat denser in energy than carbohydrate?", a: "Fatty acids are more reduced (more C–H) and stored anhydrous; glycogen binds 3 g water per gram.", hint: "Reduction + hydration." },
    ],
  },

  "bio-3d-biota-conservation": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "How fast does a small population lose genetic diversity? Effective population size arithmetic",
      steps: [
        { text: "Census count vs effective size — 100 males, 400 females:", math: "N_e = 4·N_m·N_f/(N_m + N_f) = 4·100·400/500 = 320 (not 500!)" },
        { text: "Heterozygosity lost per generation:", math: "ΔH = 1/(2N_e) = 1/640 ≈ 0.16% per generation" },
        { text: "Compounding over 50 generations:", math: "H_t = H₀(1 − 1/640)⁵⁰ ≈ H₀·0.925 → 7.5% of diversity gone without a single death" },
        { text: "Why sex ratio costs: too few males means their genes over-represent the next generation:", math: "drift strength ∝ 1/N_e, not 1/N" },
        { text: "The planning numbers:", math: "rule-of-thumb MVP: ~500 for short-term survival, ~5000 for long-term adaptability" },
      ],
      takeaway: "Extinction risk is genetic as well as demographic: an uneven sex ratio silently shrinks N_e below the census count, and inbreeding compounds — which is why corridors and breeding plans are arithmetic, not sentiment.",
    },
    theory: [
      {
        heading: "Why small populations spiral",
        body: "Three linked traps: genetic drift erodes diversity at rate 1/(2N_e); inbreeding exposes recessive lethals (inbreeding depression — the Tasmanian devil facial tumour crisis, cheetah's low sperm quality); the Allee effect makes the last individuals HARDER to find mates or sustain group behaviours — small populations can decline even in good habitat. Demographic stochasticity (bad luck years) finishes the job.",
      },
      {
        heading: "The conservation toolbox",
        body: "IUCN Red List categories (EX → CR → EN → VU → NT → LC) set priority; in situ tools are national parks, community forests and corridors (Nepal's Terai Arc reconnects tiger habitat); ex situ tools are zoos, seed banks (Svalbard), cryopreservation. Ex situ buys time, not solutions — rewilding needs habitat and behavioural training. Metapopulation management treats reserves as a network, not islands.",
      },
    ],
    confusions: [
      {
        wrong: "Saving the individual animals saves the species.",
        right: "A species survives as a GENE POOL: 500 genetically diverse individuals beat 2000 half-siblings. Captive numbers without managed breeding still lose diversity.",
        why: "Census numbers are visible; heterozygosity is not.",
      },
      {
        wrong: "Captive breeding alone solves endangerment.",
        right: "Animals lose predator awareness and foraging skills in captivity; reintroduction fails without habitat, corridors and local support — it is a system fix.",
        why: "Breeding success is measurable and celebrated; rewilding failure is slow and quiet.",
      },
      {
        wrong: "A national park is enough protection.",
        right: "Parks are islands: without corridors, populations inbreed and local extinctions cannot be recolonised. Connectivity is half the design.",
        why: "Boundary lines look like complete solutions.",
      },
    ],
    questions: [
      { q: "N_e for 200 males and 200 females?", a: "4·200·200/400 = 400 — equal sexes waste nothing.", hint: "Apply the formula." },
      { q: "Why is the cheetah's low genetic diversity a problem?", a: "Historic bottleneck ~10 000 years ago: near-identical genomes, poor sperm quality, easy disease transmission — low resilience.", hint: "Inbreeding depression." },
      { q: "Flagship vs keystone species?", a: "Flagship = fundraising icon (tiger); keystone = ecosystem structurer (wolf, coral) — ideally protect a flagship whose habitat shelters keystones.", hint: "Two different jobs." },
    ],
  },

  "bio-3d-cell-division": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "One human cell (2n = 46) through mitosis and meiosis, counted",
      steps: [
        { text: "MITOSIS: S phase duplicates DNA (2C → 4C amount), then one division:", math: "46 chromosomes → 46 chromosomes × 2 identical daughters — growth and repair, no variation" },
        { text: "The 24-hour cycle budget (typical somatic cell):", math: "G₁ ≈ 11 h, S ≈ 8 h, G₂ ≈ 4 h, M ≈ 1 h — most of the cycle is preparation, not division" },
        { text: "MEIOSIS: two divisions after ONE S phase:", math: "46 → 23 chromosomes × 4 gametes — halving, then halving again" },
        { text: "Variation sources, counted:", math: "independent assortment 2²³ ≈ 8.4×10⁶ combinations per gamete; crossing over 1.6–2.2 recombinations per chromosome pair on average; random fertilisation 10¹³+ zygote possibilities" },
        { text: "Checkpoint failures are the disease story:", math: "nondisjunction in meiosis I → trisomy 21 (Down); checkpoint loss in mitosis → uncontrolled cycle = cancer" },
      ],
      takeaway: "Mitosis copies (46→46+46, identical); meiosis halves and shuffles (46→4×23, unique) — one builds bodies, the other builds gametes, and the checkpoints are where both medicine and cancer live.",
    },
    theory: [
      {
        heading: "Mitosis and its phase logic",
        body: "Prophase (chromosomes condense, spindle forms) → metaphase (equator alignment) → anaphase (sister chromatids split to poles) → telophase + cytokinesis. Fidelity comes from checkpoints: G₁/S (is the cell big enough, DNA intact?), G₂/M (replication complete?), spindle checkpoint (all attached?). Cancer is checkpoint failure — the cell cycle's brake lines cut.",
      },
      {
        heading: "Meiosis I is the special one",
        body: "Meiosis I separates HOMOLOGOUS pairs (each still doubled) — synapsis and crossing over happen here, and this reduction is what makes gametes haploid. Meiosis II then separates sister chromatids (a mitosis-like division). Nondisjunction (failed separation) in I or II produces aneuploid gametes — trisomy 21, Turner (XO), Klinefelter (XXY).",
      },
    ],
    confusions: [
      {
        wrong: "Meiosis is just two mitoses in a row.",
        right: "Meiosis I is mechanistically different: homologs pair (synapsis), cross over, and separate — the pairing stage has no mitotic equivalent and carries all the variation.",
        why: "Both are 'cell divisions', so the special first division hides.",
      },
      {
        wrong: "Gametes are made by mitosis.",
        right: "Mitosis makes somatic (body) cells; meiosis makes gametes. Confusing them would double chromosome number each generation.",
        why: "Both are cell multiplication, casually conflated.",
      },
      {
        wrong: "DNA replicates during mitosis.",
        right: "It replicates in S phase, long before M; mitosis only SEPARATES the already-duplicated copies.",
        why: "'Division time' is assumed to include copying.",
      },
    ],
    questions: [
      { q: "Chromosome number in a human gamete, and why?", a: "23 (haploid) — so fertilisation restores 46.", hint: "Meiosis halves." },
      { q: "Where does nondisjunction in meiosis I send the risk?", a: "All four gametes aneuploid (2 with both homologs, 2 with none) — age-dependent in oocytes.", hint: "Homolog separation fails." },
      { q: "Why do checkpoints matter for cancer therapy?", a: "Many therapies target the checkpoints/spindle (taxol stabilises microtubules) — dividing cells are the vulnerability.", hint: "Fast cells are druggable." },
    ],
  },

  "bio-3d-faunal": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Who owns the animal kingdom? Counting the phyla",
      steps: [
        { text: "Described animal species ≈ 1.5 million; insects alone ≈ 1 million:", math: "insects ≈ 2/3 of ALL animal species — the phylum Arthropoda owns the planet" },
        { text: "The phyla ladder (30+ phyla), sorted by body plan:", math: "Porifera (no tissues) → Cnidaria (2 layers) → Platyhelminthes (flat, 3 layers) → Nematoda (round, pseudocoelom) → Annelida (true coelom, segmented) → Arthropoda (jointed, exoskeleton) → Chordata (notochord, ~65 000 species)" },
        { text: "Chordata internally:", math: "fish dominate (~34 000 species); birds ~11 000; mammals ~6 500 — mammals are the MINORITY of vertebrates" },
        { text: "Nepal's slice (~0.1% of land but disproportionate diversity):", math: "~208 mammal species, ~900 birds — a Himalayan gradient compresses tropical-to-alpine faunas into one country" },
        { text: "Classification is nested evidence, not filing:", math: "Kingdom → Phylum → Class → Order → Family → Genus → species; each level = a shared-ancestor claim" },
      ],
      takeaway: "Animal diversity is arthropod-heavy and insect-dominated; the familiar mammals are a small slice — and every rank in the hierarchy is a hypothesis about common ancestry that anatomy, embryos and DNA test.",
    },
    theory: [
      {
        heading: "The body-plan innovations that built the phyla",
        body: "Each major split added a technology: tissues (cnidarians), three germ layers (bilaterians), a body cavity (coelomates vs pseudocoelomates vs acoelomates), segmentation (annelids, arthropods, chordates), and jointed appendages + exoskeleton (arthropods' land conquest). Chordata's package: notochord, dorsal hollow nerve cord, pharyngeal slits, post-anal tail — visible in embryos even when absent in adults.",
      },
      {
        heading: "Vertebrate classes and Nepal's fauna",
        body: "Pisces (jawless + cartilaginous + bony fish), Amphibia (dual-life, permeable skin — pollution indicators), Reptilia (amniotic egg, scales), Aves (feathers, air sacs, endothermy), Mammalia (hair, mammary glands, three ear ossicles). Nepal's altitudinal range (70 m–8848 m) stacks tropical, subtropical, temperate, alpine and tundra faunas vertically: one-horned rhino and Bengal tiger in the Terai, snow leopard and blue sheep in the high Himalaya.",
      },
    ],
    confusions: [
      {
        wrong: "'Worm' is one group of animals.",
        right: "Flatworms (Platyhelminthes — no coelom, one gut opening), roundworms (Nematoda — pseudocoelom), segmented worms (Annelida — true coelom) are three DIFFERENT phyla, closer to different branches than cats are to fish in body plan.",
        why: "Everyday language lumps by shape.",
      },
      {
        wrong: "Whales are fish because they live in water.",
        right: "Whales are mammals: air-breathing, warm-blooded, live-bearing, nursing young — ancestry, not address, defines the group.",
        why: "Habitat is the most visible trait; anatomy is hidden.",
      },
      {
        wrong: "Anything that lays eggs is a bird.",
        right: "Reptiles, amphibians, fish, insects and even two mammals (platypus, echidna) lay eggs. Egg-laying is ancestral, not diagnostic.",
        why: "The chicken-egg image anchors the category.",
      },
    ],
    questions: [
      { q: "List the taxonomic ranks from kingdom to species.", a: "Kingdom, Phylum, Class, Order, Family, Genus, Species.", hint: "Seven levels." },
      { q: "Why are amphibians good pollution indicators?", a: "Permeable skin exchanges directly with water — toxins hit them first and hardest; declining populations warn early.", hint: "Skin physiology." },
      { q: "Why does tiny Nepal hold ~208 mammal species?", a: "A 7 km altitude gradient packs tropical-to-alpine biomes side by side — habitat variety, not area, drives faunal diversity.", hint: "Elevation = many climates." },
    ],
  },

  "bio-3d-floral": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Counting the plant kingdom — and dissecting one flower",
      steps: [
        { text: "Scale of the kingdom:", math: "~400 000 described plant species; ~300 000 flowering (angiosperms ≈ 75%)" },
        { text: "Nepal's share:", math: "~7000 flowering species in 0.1% of Earth's land — the same altitude-stacking effect that packs its fauna" },
        { text: "The four whorls of a typical flower, outside-in:", math: "calyx (sepals) → corolla (petals) → androecium (stamens: filament + anther) → gynoecium (carpels: stigma, style, ovary)" },
        { text: "Monocot vs dicot — the practical split:", math: "1 cotyledon vs 2; parallel vs reticulate veins; fibrous vs tap root; floral parts in 3s vs 4s/5s" },
        { text: "Pollination economics:", math: "most angiosperms use animal pollinators — petals are ADVERTISEMENTS, nectar the payment; wind pollination (grasses) needs no advertisement, so its flowers are drab" },
      ],
      takeaway: "Flowering plants own the plant kingdom (75%) because they outsourced reproduction to animals: the flower is a contract — advertisement (petals), payment (nectar), and a protected embryo (seed in fruit).",
    },
    theory: [
      {
        heading: "The green ladder: algae to angiosperms",
        body: "Algae (aquatic, no tissues) → bryophytes (mosses: land but water-bound reproduction, no vascular tissue) → pteridophytes (ferns: vascular tissue, still spore-based) → gymnosperms (naked seeds, pollen — conifers' wind strategy) → angiosperms (seeds + flowers + fruits + double fertilisation). Each rung solved a land problem: support, water transport, desiccation-proof reproduction.",
      },
      {
        heading: "Flower, pollination, double fertilisation",
        body: "Pollen carries the male gametophyte to the stigma; the tube grows to the ovule. Double fertilisation (angiosperm signature): one sperm → egg (2n zygote), the other → two polar nuclei (3n endosperm — the seed's food store). Fruit = ripened ovary; it recruits dispersers (edible berries, hooked burrs, winged samaras). Cross-pollination maintains variation; self-pollination trades diversity for certainty.",
      },
    ],
    confusions: [
      {
        wrong: "Mosses are small flowering plants.",
        right: "Mosses are bryophytes: no vascular tissue, no seeds, no flowers — they reproduce by spores and need water for fertilisation.",
        why: "Small and green reads as 'simple flowering plant'.",
      },
      {
        wrong: "All plants photosynthesise.",
        right: "Some are parasites (Rafflesia, dodder) or mycoheterotrophs (bird's-nest orchid) that steal carbon — the green lifestyle can be abandoned entirely.",
        why: "Photosynthesis defines 'plant' in the popular mind.",
      },
      {
        wrong: "Petals exist for the plant's own benefit.",
        right: "They are signals to POLLINATORS — often invisible to us (UV nectar guides bees see); wind-pollinated plants skip petals because advertisement only pays if a courier is coming.",
        why: "Flowers are aesthetic objects to humans, so purpose is assumed.",
      },
    ],
    questions: [
      { q: "Whorl order and the female parts?", a: "Sepals → petals → stamens → carpels; carpel = stigma + style + ovary.", hint: "Outside-in." },
      { q: "Why do grasses have insignificant flowers?", a: "Wind pollination needs no advertisement — resources go to pollen quantity instead.", hint: "Couriers vs broadcast." },
      { q: "What is double fertilisation?", a: "Two sperm events: egg → zygote (2n), polar nuclei → endosperm (3n) — unique to angiosperms.", hint: "Both sperm are used." },
    ],
  },

  "bio-3d-micro": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Sizing the invisible: bacteria vs viruses, and what kills what",
      steps: [
        { text: "Scale ladder:", math: "bacteria 0.5–5 µm; viruses 20–300 nm — typically 10–100× smaller; a virus fits INSIDE a bacterium" },
        { text: "Gram stain splits the bacterial world:", math: "Gram-positive: thick peptidoglycan, purple, teichoic acids; Gram-negative: thin PG + outer membrane, pink, endotoxin (LPS)" },
        { text: "Antibiotic targets — all BACTERIAL structures:", math: "cell wall (penicillin blocks PG cross-linking), 70S ribosome (tetracycline, aminoglycosides), DNA gyrase (quinolones), folate pathway (sulfa)" },
        { text: "Why they spare us:", math: "our ribosomes are 80S and we have no cell wall — the targets are absent in human cells (mitochondria are the 70S exception, some toxicity)" },
        { text: "Why antibiotics fail on viruses:", math: "viruses have no wall, no ribosome, no metabolism — they only hijack OURS; there is nothing bacterial to hit" },
      ],
      takeaway: "Antibiotic selectivity is structural: hit the bacterial wall, the 70S ribosome or the bacterial enzymes, and human cells — lacking all three — survive. Viruses fail this test because they own nothing at all.",
    },
    theory: [
      {
        heading: "Microbe types and structures",
        body: "Bacteria: peptidoglycan wall, capsule, pili/fimbriae (attachment), flagella (rotation via motor protein — not whipping), plasmids (extra genes, resistance transfer). Gram-positive vs Gram-negative differences drive both stain behaviour and drug choice. Fungi: eukaryotic, chitin walls (target: ergosterol membrane — why azole antifungals work). Protozoa and helminths: eukaryotic parasites needing different drugs again.",
      },
      {
        heading: "Growth control and microbial roles",
        body: "Disinfection ladder: sanitise (reduce) → disinfect (kill most pathogens on surfaces) → sterilise (kill ALL, spores included — autoclave 121 °C/15 min). Microbes as workers: nitrogen fixation, decomposition, fermentation (bread, curd, gundruk), antibiotics, bioremediation; as pathogens: Koch's postulates, virulence factors, and the immune system's innate + adaptive response with vaccination as memory priming.",
      },
    ],
    confusions: [
      {
        wrong: "Bacteria are viruses.",
        right: "Different entirely: bacteria are living cells with their own metabolism; viruses are non-living packets of nucleic acid + protein that replicate only inside a host.",
        why: "Both are 'germs' in everyday speech.",
      },
      {
        wrong: "Boiling sterilises equipment.",
        right: "Boiling kills vegetative cells but not endospores; sterilisation needs the autoclave's pressurised steam.",
        why: "Boiling is the only option most kitchens have.",
      },
      {
        wrong: "All microbes need oxygen.",
        right: "Anaerobes thrive without it — Clostridium tetani actually is damaged by oxygen; deep wounds and canned food are anaerobic territory.",
        why: "Human experience (we need O₂) is projected onto microbes.",
      },
    ],
    questions: [
      { q: "Gram-positive vs Gram-negative cell wall difference?", a: "Thick peptidoglycan (purple) vs thin PG + outer LPS membrane (pink) — differences drive drug susceptibility.", hint: "Stain retention." },
      { q: "Why does penicillin not harm human cells?", a: "It blocks peptidoglycan cross-linking — we have no cell wall at all.", hint: "Target must be bacterial." },
      { q: "Autoclave conditions?", a: "121 °C, 15 psi, 15 minutes — pressurised steam kills even endospores.", hint: "Three numbers." },
    ],
  },
};

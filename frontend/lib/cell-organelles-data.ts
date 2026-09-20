/**
 * Comprehensive Cell Organelle Knowledge Base
 * Mapped to NEB Class 11 Biology (Bio. 201) — Unit 1: Biomolecules and Cell Biology.
 *
 * Covers all 13 major eukaryotic organelles with discovery history,
 * ultrastructure, chemical composition, primary & secondary functions,
 * and high-yield board exam key points.
 */

export interface OrganelleHistory {
  discoverer: string;
  year: string;
  naming: string;
  milestones: string[];
  nobelPrize?: string;
}

export interface OrganelleUltrastructure {
  size: string;
  components: string[];
  description: string;
  chemicalComposition: string;
}

export interface OrganelleFunctions {
  primary: string[];
  secondary: string[];
  biochemicalPathway: string;
}

export interface OrganelleExamTips {
  highYieldFacts: string[];
  commonMistakes: string[];
  sampleQuestions: string[];
}

export interface CellOrganelleData {
  id: string;
  name: string;
  nepaliName?: string;
  nicknames: string[];
  membraneType: "Double Membrane" | "Single Membrane" | "Non-membranous";
  foundIn: "both" | "plant-only" | "animal-only";
  accentColor: string;
  history: OrganelleHistory;
  ultrastructure: OrganelleUltrastructure;
  functions: OrganelleFunctions;
  examTips: OrganelleExamTips;
}

export const CELL_ORGANELLES: CellOrganelleData[] = [
  {
    id: "nucleus",
    name: "Nucleus & Nucleolus",
    nepaliName: "केन्द्रक (Nucleus)",
    nicknames: ["Control Center of the Cell", "Brain of the Cell", "Director of Cellular Activities"],
    membraneType: "Double Membrane",
    foundIn: "both",
    accentColor: "#8b5cf6",
    history: {
      discoverer: "Robert Brown",
      year: "1831",
      naming: "Named from Latin 'nucleus' (kernel/nut). Nucleolus first described by Felice Fontana (1781) and named by Gabriel Valentin (1836).",
      milestones: [
        "1831: Robert Brown discovered and named the nucleus in orchid root epidermal cells.",
        "1879: Walther Flemming stained chromatin threads with basic dyes and termed it 'chromatin'.",
        "1953: Watson & Crick deciphered double-helix DNA structure housed in eukaryotic chromatin.",
      ],
      nobelPrize: "Walther Flemming's pioneering chromosome discoveries paved the way for Thomas Hunt Morgan's Nobel Prize (1933).",
    },
    ultrastructure: {
      size: "5 – 10 µm in diameter (largest organelle in animal cells)",
      components: [
        "Nuclear Envelope: Double lipid bilayer (outer membrane continuous with RER, inner membrane supported by nuclear lamina)",
        "Nuclear Pores: Octagonal protein complexes (~100 nm) regulating RNA & protein transport (importins/exportins)",
        "Nucleoplasm (Karyolymph): Dense colloidal matrix containing nucleotides, enzymes (DNA/RNA polymerases), and mineral ions",
        "Chromatin Network: DNA wound around histone protein octamers (nucleosomes); condensed into chromosomes during division",
        "Nucleolus: Dense, non-membranous subcompartment dedicated to rRNA transcription and ribosome subunit assembly",
      ],
      description:
        "The nucleus is the master information repository of the eukaryotic cell. In animal cells it is generally centrally located; in mature plant cells, the large central vacuole pushes it to a peripheral (eccentric) position against the plasma membrane.",
      chemicalComposition: "DNA (~10%), RNA (~5%), Histone & non-histone proteins (~80%), Lipids (~3%), and Inorganic ions (Mg²⁺, Ca²⁺).",
    },
    functions: {
      primary: [
        "Stores the master genetic blueprint (genomic DNA) and transmits hereditary information to daughter cells.",
        "Controls all metabolic, enzymatic, and developmental activities of the cell by regulating messenger RNA (mRNA) transcription.",
        "Houses the nucleolus, which synthesizes precursor ribosomal RNA (rRNA) and combines it with proteins into 40S and 60S ribosomal subunits.",
      ],
      secondary: [
        "Directs cell division (mitosis and meiosis) via chromosome replication and condensation.",
        "Controls cellular differentiation, specialization, and programmed senescence.",
      ],
      biochemicalPathway: "Central Dogma of Molecular Biology: DNA Replication & Transcription (pre-mRNA synthesis & splicing) occur inside the nucleoplasm.",
    },
    examTips: {
      highYieldFacts: [
        "Red blood cells (erythrocytes) of mature mammals and sieve tube elements of angiosperms lose their nucleus at maturity to maximize transport efficiency.",
        "The nucleolus is non-membranous and disappears during prophase, reappearing during telophase at the Nucleolar Organizer Region (NOR) of specific chromosomes.",
      ],
      commonMistakes: [
        "Do not confuse chromatin (uncondensed interphase DNA-protein complex) with chromosomes (tightly coiled, rod-like structures visible during M-phase).",
        "The nuclear membrane is double-layered, NOT single-layered.",
      ],
      sampleQuestions: [
        "Describe the ultrastructure of a eukaryotic nucleus with a well-labelled diagram. (NEB 5 Marks)",
        "What is a nucleolus and what is its primary function? (NEB 2 Marks)",
      ],
    },
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    nepaliName: "माइटोकोन्ड्रिया (Powerhouse of the Cell)",
    nicknames: ["Powerhouse of the Cell", "Cellular Furnace", "Semi-autonomous Organelle", "ATP Factory"],
    membraneType: "Double Membrane",
    foundIn: "both",
    accentColor: "#f97316",
    history: {
      discoverer: "Albert von Kölliker (1857) & Richard Altmann (1890)",
      year: "1857 / 1898",
      naming: "Kölliker first observed granules in insect flight muscles. Richard Altmann termed them 'bioblasts' (1890). Carl Benda coined the term 'mitochondria' in 1898 from Greek 'mitos' (thread) and 'chondros' (granule).",
      milestones: [
        "1857: Kölliker observed granules in striated muscle cells.",
        "1890: Altmann described them as elementary living units ('bioblasts').",
        "1898: Carl Benda named them mitochondria based on their filamentous-granular appearance.",
        "1937: Hans Krebs mapped the tricarboxylic acid (TCA / Krebs cycle).",
        "1961: Peter Mitchell proposed the Chemiosmotic Theory of ATP synthesis on the inner mitochondrial membrane (Nobel Prize 1978).",
      ],
      nobelPrize: "Hans Krebs (Nobel Prize 1953) for Krebs Cycle; Peter Mitchell (Nobel Prize 1978) for Chemiosmosis.",
    },
    ultrastructure: {
      size: "0.5 – 1.0 µm wide, 1.0 – 4.0 µm long (cylindrical / sausage-shaped)",
      components: [
        "Outer Membrane: Smooth, porous envelope containing porin proteins allowing transport of small molecules up to 5 kDa.",
        "Intermembrane Space: Fluid compartment between outer and inner membranes where protons (H⁺) are pumped during ETC, creating an electrochemical gradient.",
        "Inner Membrane: Highly selective, protein-rich (cardiolipin) membrane thrown into deep, shelf-like folds called 'cristae' to dramatically maximize surface area.",
        "Oxysomes / $F_0-F_1$ Particles (ATP Synthase): Tennis-racket-shaped complexes studded on cristae facing the matrix; synthesize ATP as protons flow through $F_0$ into $F_1$.",
        "Mitochondrial Matrix: Homogeneous aqueous gel containing 70S ribosomes, circular naked double-stranded DNA (mtDNA), Krebs cycle enzymes, tRNA, and divalent cations ($Mg^{2+}, Ca^{2+}$).",
      ],
      description:
        "Mitochondria are semi-autonomous self-replicating organelles. They multiply inside the cell by binary fission, contain their own circular DNA and 70S ribosomes (evidence supporting Lynn Margulis's Endosymbiotic Theory).",
      chemicalComposition: "Proteins (65–70%), Lipids (25–30%, primarily cardiolipin and phospholipids), RNA (0.5%), and circular DNA.",
    },
    functions: {
      primary: [
        "Generation of cellular energy currency (ATP) via aerobic cellular respiration, including pyruvate decarboxylation, Krebs cycle, and oxidative phosphorylation.",
        "Houses the Electron Transport Chain (ETC Complexes I to IV) and ATP Synthase on the inner mitochondrial cristae.",
      ],
      secondary: [
        "Regulation of programmed cell death (apoptosis) via release of Cytochrome c into the cytosol.",
        "Beta-oxidation of medium-chain fatty acids.",
        "Heme biosynthesis and iron-sulfur cluster assembly.",
      ],
      biochemicalPathway: "Aerobic Respiration: Pyruvate + Coenzyme A + $NAD^+ \\rightarrow$ Acetyl-CoA + $NADH + CO_2 \\rightarrow$ Krebs Cycle (Matrix) $\\rightarrow$ ETC & Chemiosmosis (Cristae) producing up to 36–38 ATP per glucose.",
    },
    examTips: {
      highYieldFacts: [
        "Mitochondria are called 'semi-autonomous' because they possess their own DNA (mtDNA) and 70S ribosomes and can synthesize some of their own proteins, but still depend on nuclear DNA for most structural enzymes.",
        "Number of mitochondria per cell directly correlates with metabolic activity: heart muscle cells and liver hepatocytes contain thousands; dormant seeds contain very few.",
      ],
      commonMistakes: [
        "Mitochondria have circular, naked DNA (like prokaryotes), NOT linear histone-bound DNA.",
        "Oxysomes ($F_0-F_1$ complexes) face the MATRIX, not the intermembrane space.",
      ],
      sampleQuestions: [
        "Why is mitochondrion known as the powerhouse of the cell? Draw a labelled diagram showing its internal structure. (NEB 4 Marks)",
        "Explain the endosymbiotic origin of mitochondria. (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "chloroplast",
    name: "Chloroplasts & Plastids",
    nepaliName: "हरितलवक / क्लोरोप्लास्ट (Kitchen of the Plant Cell)",
    nicknames: ["Kitchen of the Cell", "Photosynthetic Engine", "Solar Energy Converters", "Semi-autonomous Plastid"],
    membraneType: "Double Membrane",
    foundIn: "plant-only",
    accentColor: "#10b981",
    history: {
      discoverer: "Antonie van Leeuwenhoek / A.F.W. Schimper",
      year: "1883",
      naming: "Ernst Haeckel (1866) coined the term 'plastid'. A.F.W. Schimper (1883) introduced the name 'chloroplast' from Greek 'chloros' (green) and 'plastos' (formed).",
      milestones: [
        "1883: Schimper classified plastids into chloroplasts (green), chromoplasts (colored), and leucoplasts (colorless).",
        "1937: Robert Hill demonstrated oxygen evolution in isolated chloroplasts illuminated in presence of electron acceptors (Hill Reaction).",
        "1954: Daniel Arnon discovered photosynthetic phosphorylation (ATP generation in chloroplasts).",
        "1961: Melvin Calvin deciphered the carbon fixation pathway (Calvin Cycle / $C_3$ pathway) in stroma (Nobel Prize 1961).",
      ],
      nobelPrize: "Melvin Calvin (Nobel Prize in Chemistry 1961) for mapping photosynthetic carbon reduction.",
    },
    ultrastructure: {
      size: "4 – 6 µm long, 2 – 4 µm broad (biconvex disc-shaped)",
      components: [
        "Outer Membrane: Semi-permeable lipid bilayer with porins.",
        "Inner Membrane: Selectively permeable boundary enclosing the internal stroma matrix.",
        "Stroma (Matrix): Alkaline, gel-rich fluid containing soluble enzymes (specifically RuBisCO — the most abundant protein on Earth), 70S ribosomes, circular chloroplast DNA (cpDNA), and starch droplets (plastoglobules).",
        "Thylakoids: Flattened membranous sacs holding chlorophyll-a, chlorophyll-b, carotenoids, and electron carriers.",
        "Grana: Stacks of 10–100 thylakoid discs (resembling piles of coins); site of the photochemical Light Reactions.",
        "Stroma Lamellae (Fret channels): Unstacked membranous tubes connecting adjacent grana; contain Photosystem I ($P_{700}$).",
      ],
      description:
        "Chloroplasts are photosynthetic plastids found exclusively in photosynthetic eukaryotes (green plants and algae). Like mitochondria, they are semi-autonomous with circular DNA and 70S ribosomes.",
      chemicalComposition: "Proteins (50–60%), Lipids (25–30%), Chlorophyll pigments (5–8%), Carotenoids (1–2%), RNA (2–3%), DNA (0.5%).",
    },
    functions: {
      primary: [
        "Photochemical Light Reaction: Absorption of sunlight by chlorophyll pigments in thylakoid grana, water photolysis ($2H_2O \\rightarrow 4H^+ + 4e^- + O_2$), and photophosphorylation producing ATP and NADPH.",
        "Dark Reaction / Carbon Fixation (Calvin Cycle): RuBisCO-mediated fixation of atmospheric $CO_2$ into triose phosphates and glucose in the stroma.",
      ],
      secondary: [
        "Synthesis of fatty acids, amino acids, and secondary plant metabolites.",
        "Storage of transient photosynthetic starch in stroma plastoglobules.",
      ],
      biochemicalPathway: "Photosynthesis: $6CO_2 + 12H_2O \\xrightarrow{\\text{Light, Chlorophyll}} C_6H_{12}O_6 + 6H_2O + 6O_2$.",
    },
    examTips: {
      highYieldFacts: [
        "Light reactions occur in the thylakoid membrane/grana; Dark reactions (Calvin cycle) occur in the stroma.",
        "RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) constitutes over 40% of soluble leaf protein.",
      ],
      commonMistakes: [
        "Chloroplasts are completely ABSENT in all animal cells and fungi.",
        "Oxygen released during photosynthesis comes from the photolysis of water ($H_2O$), NOT from carbon dioxide ($CO_2$).",
      ],
      sampleQuestions: [
        "Draw a neat, labelled diagram of the internal structure of a chloroplast and describe its grana and stroma. (NEB 5 Marks)",
        "Differentiate between chloroplast, chromoplast, and leucoplast with examples. (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "golgi",
    name: "Golgi Apparatus / Golgi Bodies",
    nepaliName: "गल्जी उपकरण (Golgi Complex / Dictyosome)",
    nicknames: ["Post Office of the Cell", "Packaging & Dispatch Station", "Cellular Warehouse", "Dictyosome (in Plants)"],
    membraneType: "Single Membrane",
    foundIn: "both",
    accentColor: "#ec4899",
    history: {
      discoverer: "Camillo Golgi",
      year: "1898",
      naming: "Discovered in purkinje neurons of barn owl and cat using silver nitrate impregnation staining ('black reaction'). In plant cells and lower invertebrates, discrete unconnected stacks are termed 'dictyosomes'.",
      milestones: [
        "1898: Camillo Golgi observed an internal reticular apparatus in nerve cells.",
        "1906: Camillo Golgi received Nobel Prize in Physiology or Medicine (shared with Santiago Ramón y Cajal).",
        "1950s: Electron microscopy established its universal cisternal morphology.",
        "2013: James Rothman, Randy Schekman, and Thomas Südhof won the Nobel Prize for vesicle trafficking machinery involving the Golgi.",
      ],
      nobelPrize: "Camillo Golgi (1906 Nobel Prize in Medicine); Rothman, Schekman & Südhof (2013 Nobel Prize in Medicine).",
    },
    ultrastructure: {
      size: "Cisternae 0.5 – 1.0 µm in diameter; stacks 3 – 8 layers thick",
      components: [
        "Cisternae: Flattened, curved, smooth membranous sacs stacked in parallel arrays like saucers.",
        "Cis Face (Forming / Immature Face): Convex face oriented towards the rough ER; receives transport vesicles containing newly synthesized proteins.",
        "Trans Face (Maturing / Exit Face): Concave face oriented towards the plasma membrane; buds off secretory vesicles and lysosomes.",
        "Golgi Vesicles: Small membrane-bound spheres (60 nm) carrying cargo between cisternae.",
        "Secretory Vesicles: Large condensing vacuoles that fuse with the plasma membrane to discharge contents by exocytosis.",
      ],
      description:
        "The Golgi complex is structurally and biochemically polarized. Proteins and lipids arrive from the ER at the cis face, are sequentially modified through medial cisternae, and depart sorted at the trans face.",
      chemicalComposition: "Phospholipids (60%), Proteins (40%), rich in glycosyltransferases and acid phosphatases.",
    },
    functions: {
      primary: [
        "Post-translational chemical modification of proteins and lipids: Glycosylation (forming glycoproteins and glycolipids), phosphorylation, and sulfation.",
        "Targeted packaging and sorting of secretory enzymes, hormones, and extracellular matrix components into secretory vesicles.",
        "Primary Lysosome biogenesis: Acid hydrolases synthesized in RER are tagged with mannose-6-phosphate in Golgi and budded off as primary lysosomes.",
      ],
      secondary: [
        "Synthesis of cell plate and middle lamella pectins (calcium and magnesium pectate) during cytokinesis in dividing plant cells.",
        "Formation of the acrosome cap of mature animal sperm cells (acrosome reaction allows egg fertilization).",
      ],
      biochemicalPathway: "Vesicle Trafficking: RER $\\rightarrow$ Transport Vesicle $\\rightarrow$ Cis-Golgi $\\rightarrow$ Medial Cisternae (Glycosylation) $\\rightarrow$ Trans-Golgi $\\rightarrow$ Secretory Granule $\\rightarrow$ Exocytosis.",
    },
    examTips: {
      highYieldFacts: [
        "In plant cells, Golgi bodies exist as multiple unconnected, smaller sub-units scattered in the cytoplasm, specifically known as 'Dictyosomes'.",
        "The sperm acrosome is a modified Golgi apparatus containing hyaluronidase enzyme to penetrate the ovum's corona radiata.",
      ],
      commonMistakes: [
        "Do not confuse Cis face (entry / convex / towards nucleus) with Trans face (exit / concave / towards membrane).",
      ],
      sampleQuestions: [
        "Explain the structure and functions of Golgi apparatus. What are dictyosomes? (NEB 4 Marks)",
        "How is Golgi apparatus involved in the formation of lysosomes and acrosome of sperm? (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "er",
    name: "Endoplasmic Reticulum (RER & SER)",
    nepaliName: "अन्तर्द्रव्यी जालिका (Endoplasmic Reticulum)",
    nicknames: ["Intracellular Highway", "Cellular Skeleton", "Cytoplasmic Transport Network"],
    membraneType: "Single Membrane",
    foundIn: "both",
    accentColor: "#0ea5e9",
    history: {
      discoverer: "Albert Claude (1945) & Keith R. Porter (1953)",
      year: "1945 / 1953",
      naming: "First observed by Albert Claude in electron micrographs of cultured fibroblast cells. Named 'endoplasmic reticulum' by Keith Porter (1953) because it formed an intricate network ('reticulum') in the endoplasm.",
      milestones: [
        "1945: Albert Claude published first electron micrograph showing lace-like tubular network.",
        "1953: Keith Porter coined the formal scientific name 'endoplasmic reticulum'.",
        "1974: Albert Claude, Christian de Duve, and George Palade awarded Nobel Prize for structural and functional discoveries in cell biology.",
      ],
      nobelPrize: "Albert Claude and George Palade (Nobel Prize in Medicine 1974).",
    },
    ultrastructure: {
      size: "Accounts for more than 50% of the total membrane system in a eukaryotic cell",
      components: [
        "Cisternae: Broad, flat, elongated membrane-bound plates (40–50 nm thick) stacked parallel; predominant in RER.",
        "Tubules: Irregular, branching tubular channels (50–100 nm) free of ribosomes; predominant in SER.",
        "Vesicles: Spherical or ovoid membrane-bound sacs (25–500 nm) pinched off for intracellular transit.",
        "Rough ER (Granular): Outer membrane studded with 80S ribosomes bound via ribophorin I and II receptor proteins.",
        "Smooth ER (Agranular): Tubular network devoid of ribophorins and ribosomes.",
      ],
      description:
        "The ER forms an interconnected continuous membrane labyrinth starting from the outer nuclear envelope and branching throughout the cytoplasm to near the plasma membrane.",
      chemicalComposition: "Membrane lipids (30–50% phospholipids, low cholesterol), Proteins (50–70% including cytochrome P450, glucose-6-phosphatase).",
    },
    functions: {
      primary: [
        "Rough ER (RER): Synthesizes, folds, and post-translationally processes secretory proteins, lysosomal enzymes, and integral membrane proteins.",
        "Smooth ER (SER): Major site of lipid synthesis, phospholipid biogenesis, and steroid hormone production (estrogen, testosterone, cortisol).",
      ],
      secondary: [
        "Detoxification of metabolic drugs, chemicals, and toxins in liver hepatocytes via the Cytochrome P450 enzyme complex on SER membranes.",
        "Sarcoplasmic Reticulum in skeletal/cardiac muscle cells acts as an intracellular reservoir for Calcium ions ($Ca^{2+}$), triggering muscle contraction upon release.",
        "Provides mechanical scaffolding (cytoskeleton-support) maintaining cell shape and compartmentalization.",
      ],
      biochemicalPathway: "Co-translational Protein Translocation: Ribosome $\\rightarrow$ Signal Recognition Particle (SRP) $\\rightarrow$ Sec61 Translocon $\\rightarrow$ Lumen Chaperones (BiP/calnexin) fold nascent polypeptide.",
    },
    examTips: {
      highYieldFacts: [
        "Cells active in protein secretion (pancreatic acinar cells, plasma B-cells) have extensive Rough ER.",
        "Cells specialized in steroid hormone synthesis (testes Leydig cells, adrenal cortex) or detoxification (liver hepatocytes) have extensive Smooth ER.",
      ],
      commonMistakes: [
        "Smooth ER does NOT synthesize proteins; it synthesizes lipids, steroids, and detoxifies chemicals.",
      ],
      sampleQuestions: [
        "Differentiate between Rough Endoplasmic Reticulum (RER) and Smooth Endoplasmic Reticulum (SER). (NEB 3 Marks)",
        "State four important functions of endoplasmic reticulum in eukaryotic cells. (NEB 2 Marks)",
      ],
    },
  },
  {
    id: "lysosome",
    name: "Lysosomes",
    nepaliName: "लाइसोजोम (Suicide Bag)",
    nicknames: ["Suicide Bags of the Cell", "Cellular Garbage Disposal", "Digestive Bags", "Demolition Squad"],
    membraneType: "Single Membrane",
    foundIn: "animal-only",
    accentColor: "#ef4444",
    history: {
      discoverer: "Christian de Duve",
      year: "1955",
      naming: "Christian de Duve discovered them during centrifugal fractionation studies of rat liver while measuring acid phosphatase activity. Termed 'lysosome' from Greek 'lysis' (loosening/dissolution) and 'soma' (body).",
      milestones: [
        "1955: De Duve isolated and biochemically characterized lysosomes as acid-hydrolase-rich particles.",
        "1963: De Duve classified lysosomal activity into endocytosis, heterophagy, and autophagy.",
        "1974: Christian de Duve awarded the Nobel Prize in Physiology or Medicine.",
        "2016: Yoshinori Ohsumi awarded Nobel Prize for discovering molecular mechanisms of lysosomal autophagy.",
      ],
      nobelPrize: "Christian de Duve (1974 Nobel Prize in Medicine); Yoshinori Ohsumi (2016 Nobel Prize in Medicine).",
    },
    ultrastructure: {
      size: "0.2 – 0.5 µm in diameter (spherical single-membrane vesicle)",
      components: [
        "Lysosomal Membrane: Single lipid bilayer containing heavily glycosylated integral proteins (LAMPs - Lysosome-Associated Membrane Proteins) protecting the membrane from self-digestion.",
        "$V-type\\ H^+$-ATPase Proton Pump: Actively pumps protons ($H^+$) into the lumen using ATP energy, keeping internal pH acidic (~4.5 to 5.0).",
        "Lytic Hydrolytic Matrix: Dense lumen containing over 50 acidic hydrolases: proteases (cathepsins), nucleases (DNase, RNase), lipases, acid phosphatases, and glycosidases.",
      ],
      description:
        "Lysosomes exhibit high structural polymorphism and occur in four functional states: Primary lysosome (virgin, newly budded from trans-Golgi), Secondary lysosome / Heterophagosome (fused with phagocytic vacuole), Autophagosome (fused with worn-out cell organelle), and Residual body (containing indigestible waste).",
      chemicalComposition: "Acid hydrolases (~50 types), high sialic acid and glycoprotein coat on inner leaflet of membrane.",
    },
    functions: {
      primary: [
        "Heterophagy: Intracellular digestion of foreign particles, bacteria, and macromolecules ingested through phagocytosis or pinocytosis (e.g. in white blood cells / macrophages).",
        "Autophagy (Cellular Recycling): Digestion and recycling of worn-out or damaged cell organelles (e.g. non-functional mitochondria) to salvage amino acids and energy.",
      ],
      secondary: [
        "Autolysis (Cellular Suicide): During tissue regression or necrosis, lysosomal membranes rupture simultaneously throughout the cell, releasing acid hydrolases into the cytoplasm to dissolve the dead cell (e.g., tail resorption during frog tadpole metamorphosis).",
        "Extracellular digestion: Osteoclasts secrete lysosomal enzymes to resorb and remodel bone tissue.",
      ],
      biochemicalPathway: "Hydrolytic Cleavage: Biological polymers are cleaved into monomers ($H_2O$-dependent hydrolysis) at acidic pH 4.8: Proteins $\\rightarrow$ Amino acids; Nucleic acids $\\rightarrow$ Nucleotides; Lipids $\\rightarrow$ Fatty acids.",
    },
    examTips: {
      highYieldFacts: [
        "Lysosomes are called 'suicide bags' because under extreme starvation, cellular injury, or programmed metamorphosis, their enzymes rupture and digest their own host cell.",
        "Acid hydrolases work ONLY at acidic pH 4.5–5.0. If a single lysosome accidentally leaks into the neutral cytoplasm (pH 7.2), the enzymes are inactivated, protecting the cell from damage.",
      ],
      commonMistakes: [
        "Lysosomes are predominantly animal organelles; mature plant cells perform equivalent hydrolytic functions inside their central vacuole.",
      ],
      sampleQuestions: [
        "Why are lysosomes called 'suicidal bags' of the cell? Explain their role in autophagy and heterophagy. (NEB 4 Marks)",
        "Name the enzyme marker used to identify lysosomes in cell fractionation. (NEB 1 Mark — Acid phosphatase)",
      ],
    },
  },
  {
    id: "ribosome",
    name: "Ribosomes (70S & 80S)",
    nepaliName: "राइबोजोम (Protein Factory)",
    nicknames: ["Protein Factories of the Cell", "Palade Particles", "Workhorse of Translation", "Universal Cell Engine"],
    membraneType: "Non-membranous",
    foundIn: "both",
    accentColor: "#f472b6",
    history: {
      discoverer: "George Emil Palade",
      year: "1955",
      naming: "Observed in 1955 under electron microscope by Romanian-American cell biologist George Palade as dense ribonucleoprotein particles ('Palade particles'). Coined 'ribosome' in 1958 by Richard B. Roberts from 'ribonucleic acid' + Greek 'soma' (body).",
      milestones: [
        "1955: George Palade discovered ribosomes in animal cells.",
        "1958: Richard B. Roberts introduced the name ribosome.",
        "1974: George Palade shared Nobel Prize with Claude & de Duve.",
        "2009: Venkatraman Ramakrishnan, Thomas A. Steitz, and Ada E. Yonath awarded Nobel Prize in Chemistry for atomic-resolution crystal structure of the ribosome.",
      ],
      nobelPrize: "George Palade (1974 Nobel Prize in Medicine); Ramakrishnan, Steitz & Yonath (2009 Nobel Prize in Chemistry).",
    },
    ultrastructure: {
      size: "20 – 30 nm in diameter (smallest cell organelle, visible only under Electron Microscope)",
      components: [
        "70S Ribosomes (Prokaryotes, Mitochondria, Chloroplasts): Consists of a Small 30S subunit (16S rRNA + 21 proteins) and a Large 50S subunit (23S rRNA + 5S rRNA + 31 proteins).",
        "80S Ribosomes (Eukaryotic Cytoplasm): Consists of a Small 40S subunit (18S rRNA + 33 proteins) and a Large 60S subunit (28S rRNA + 5.8S rRNA + 5S rRNA + 49 proteins).",
        "Subunit association: The two subunits dissociate in low $Mg^{2+}$ concentrations (< 0.001 M) and bind together in high $Mg^{2+}$ concentrations for translation.",
        "Polysome / Polyribosome: Multiple ribosomes clustered along a single mRNA strand translating identical protein copies simultaneously.",
      ],
      description:
        "Ribosomes are non-membranous ribonucleoprotein complexes found universally in ALL living cells (prokaryotes and eukaryotes). They exist as free cytoplasmic ribosomes (synthesizing intracellular proteins) or membrane-bound on RER.",
      chemicalComposition: "Ribosomal RNA (rRNA ~60–65% in 70S, ~40–50% in 80S) and Basic Core Proteins (~35–40% in 70S, ~50–60% in 80S).",
    },
    functions: {
      primary: [
        "Translation: Decoding genetic information encoded in messenger RNA (mRNA) into polypeptide amino acid sequences according to the universal genetic code.",
        "Peptide Bond Synthesis: Ribosomal 23S rRNA (in 70S) or 28S rRNA (in 80S) acts as a ribozyme (peptidyl transferase) catalyzing peptide bond formation between amino acids.",
      ],
      secondary: [
        "Free ribosomes synthesize cytosolic, nuclear, and mitochondrial enzymes.",
        "RER-bound ribosomes synthesize secretory proteins, lysosomal enzymes, and plasma membrane receptors.",
      ],
      biochemicalPathway: "Protein Translation: Initiation (binding to start codon AUG) $\\rightarrow$ Elongation (A, P, E sites on ribosome cycling tRNAs) $\\rightarrow$ Termination (stop codons UAA, UAG, UGA with release factors).",
    },
    examTips: {
      highYieldFacts: [
        "'S' stands for Svedberg unit — a measure of sedimentation rate in an ultracentrifuge (1 S = $10^{-13}$ seconds). It is NOT simple additive math: 50S + 30S = 70S; 60S + 40S = 80S (because surface area and shape change when subunits combine).",
        "The catalytic heart of the ribosome is RNA, not protein — proving ribosomes are ribozymes (evidence for the ancient 'RNA World' hypothesis).",
      ],
      commonMistakes: [
        "Ribosomes have NO membrane around them. Never describe them as single or double membrane.",
        "Chloroplasts and mitochondria contain 70S ribosomes, NOT 80S.",
      ],
      sampleQuestions: [
        "Compare 70S and 80S ribosomes in terms of their subunit composition and RNA content. (NEB 3 Marks)",
        "What is a polysome and what is its biological advantage? (NEB 2 Marks)",
      ],
    },
  },
  {
    id: "vacuole",
    name: "Central Vacuole & Tonoplast",
    nepaliName: "रिक्तिका / भ्याक्योल (Central Vacuole)",
    nicknames: ["Turgor Pressure Maintainer", "Cell Sap Reservoir", "Plant Storage & Osmoregulatory Center"],
    membraneType: "Single Membrane",
    foundIn: "plant-only",
    accentColor: "#38bdf8",
    history: {
      discoverer: "Félix Dujardin (1841) / Hugo de Vries (1885)",
      year: "1841 / 1885",
      naming: "Félix Dujardin observed empty-looking clear spaces in protozoa and coined 'vacuole' from Latin 'vacuus' (empty). In 1885, Dutch botanist Hugo de Vries discovered and named its semipermeable membrane the 'Tonoplast' from Greek 'tonos' (tension/stretch).",
      milestones: [
        "1841: Dujardin described transparent cavities in living cells.",
        "1885: Hugo de Vries proved the tonoplast is semipermeable and responsible for osmotic turgor pressure in plant tissues.",
      ],
    },
    ultrastructure: {
      size: "Occupies 80% – 90% of total volume of mature plant cell",
      components: [
        "Tonoplast: Single selectively permeable unit membrane containing active transport proton pumps and specialized aquaporins (water channels).",
        "Cell Sap: Aqueous non-living fluid inside containing water, inorganic mineral ions ($K^+, Cl^-, Na^+, Ca^{2+}$), organic acids (malic, citric), amino acids, and sugars.",
        "Water-soluble Pigments: Anthocyanins (red, purple, blue) and anthoxanthins (yellow) imparting vivid colors to flowers, fruits, and autumn leaves.",
        "Secondary Ergastic Inclusions: Calcium oxalate crystals (raphides, sphaeraphides) and metabolic waste deposits.",
      ],
      description:
        "Young meristematic plant cells have multiple tiny vacuoles. As the cell differentiates and expands, these merge into one massive central vacuole, pushing the nucleus, cytoplasm, and organelles into a thin peripheral layer called the primordial utricle.",
      chemicalComposition: "Water (90–95%), dissolved mineral salts, carbohydrates, water-soluble pigments, and hydrolytic enzymes.",
    },
    functions: {
      primary: [
        "Generates Osmotic Turgor Pressure: High solute concentration in cell sap drives water entry by endosmosis, pressing the cytoplasm firmly against the rigid cell wall, providing mechanical support to leaves, petals, and herbaceous stems.",
        "Cell Elongation: Driven largely by water uptake into the expanding central vacuole without expending large metabolic energy on protein synthesis.",
      ],
      secondary: [
        "Storage of nutrient reserves (sucrose in sugarcane, inulin in Dahlia roots).",
        "Sequestration of toxic metabolic wastes and poisonous secondary metabolites (tannins, alkaloids, latex) to defend against herbivores.",
        "Flower and fruit coloration via anthocyanin pigments to attract pollinators.",
      ],
      biochemicalPathway: "Osmoregulation: Tonoplast $V-H^+$-ATPase drives proton-coupled $K^+/H^+$ antiport, concentrating solutes inside the vacuole and establishing osmotic water influx ($V_w = \\psi_s + \\psi_p$).",
    },
    examTips: {
      highYieldFacts: [
        "The membrane of the plant vacuole is specifically called the TONOPLAST, and it is selectively permeable.",
        "Wilting in plants occurs when water loss exceeds uptake, causing vacuolar turgor pressure to drop to zero (plasmolysis).",
      ],
      commonMistakes: [
        "Animal cells have small, temporary vacuoles (pinocytic/phagocytic); they NEVER have a large permanent central vacuole.",
        "Anthocyanin pigments are dissolved in vacuolar cell sap, NOT in chloroplasts or chromoplasts.",
      ],
      sampleQuestions: [
        "What is tonoplast? State three major functions of the central vacuole in plant cells. (NEB 3 Marks)",
        "Explain how the central vacuole maintains turgor pressure and causes cell enlargement in plants. (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "centrosome",
    name: "Centrosome & Centrioles",
    nepaliName: "तारककाय / सेन्ट्रोसोम (Centrosome)",
    nicknames: ["Microtubule Organizing Center (MTOC)", "Spindle Pole Architect", "Basal Body Creator"],
    membraneType: "Non-membranous",
    foundIn: "animal-only",
    accentColor: "#cbd5e1",
    history: {
      discoverer: "Edouard van Beneden (1883) & Theodor Boveri (1888)",
      year: "1883 / 1888",
      naming: "Belgian embryologist Edouard van Beneden observed it in roundworm eggs (Ascaris). German biologist Theodor Boveri termed it 'centrosome' (1888) and identified its two internal cylinders as 'centrioles'.",
      milestones: [
        "1883: Van Beneden discovered polar bodies and division centers.",
        "1888: Theodor Boveri named the centrosome and established its role in forming bipolar spindle apparatus during mitosis.",
        "1900s: Ultrastructural electron microscopy resolved the 9+0 cartwheel triplet microtubule pattern.",
      ],
    },
    ultrastructure: {
      size: "Centriole diameter ~0.2 µm, length ~0.5 µm (barrel-shaped cylinder)",
      components: [
        "Centriole Pair (Diplosome): Two hollow cylindrical structures oriented strictly perpendicular ($90^\\circ$) to each other.",
        "9+0 Triplet Arrangement: Wall consists of 9 evenly spaced peripheral triplets of microtubules (A, B, C subfibers made of $\\alpha/\\beta$-tubulin) with NO central microtubule.",
        "Cartwheel Structure: Central protein hub connected by 9 radial spokes to the inner A-tubules of each triplet like spokes of a bicycle wheel.",
        "Pericentriolar Material (PCM): Dense amorphous protein cloud surrounding the centrioles rich in $\\gamma$-tubulin ring complexes ($\\gamma$-TuRC) nucleating new microtubules.",
      ],
      description:
        "Located in animal cells adjacent to the nuclear envelope. Replicates exactly once during S-phase of interphase, and the two centrosomes separate to opposite cell poles during prophase to organize the mitotic spindle.",
      chemicalComposition: "Tubulin protein dimers ($\\alpha$ and $\\beta$), pericentrin, centrins, $\\gamma$-tubulin.",
    },
    functions: {
      primary: [
        "Primary Microtubule Organizing Center (MTOC) of animal cells, nucleating, assembling, and orienting spindle fibers during mitosis and meiosis.",
        "Ensures symmetric chromosome alignment at the metaphase plate and subsequent sister chromatid segregation during anaphase.",
      ],
      secondary: [
        "Differentiates into the Basal Body (Kinetosome) at the base of cilia and flagella, templating their 9+2 axoneme microtubule architecture.",
        "The distal centriole forms the axial filament of sperm flagella.",
      ],
      biochemicalPathway: "Spindle Fiber Assembly: $\\gamma$-Tubulin Ring Complexes ($\\gamma$-TuRC) in PCM polymerize GTP-bound $\\alpha/\\beta$-tubulin heterodimers into dynamic microtubule polymers ($(+)$ and $(-)$ ends).",
    },
    examTips: {
      highYieldFacts: [
        "Centrosomes are completely ABSENT in higher plant cells (gymnosperms and angiosperms). Plant cells organize mitotic spindles through anastral MTOC regions without centrioles.",
        "Centriole structure has a (9+0) triplet pattern, whereas cilia/flagella axoneme has a (9+2) doublet pattern.",
      ],
      commonMistakes: [
        "Centrioles are NON-MEMBRANOUS. They do not possess a phospholipid envelope.",
      ],
      sampleQuestions: [
        "Describe the internal cartwheel structure of a centriole with a labelled diagram. (NEB 4 Marks)",
        "How do plant cells divide without centrosomes? (NEB 2 Marks — via anastral spindle formation)",
      ],
    },
  },
  {
    id: "cell-wall",
    name: "Cell Wall & Middle Lamella",
    nepaliName: "कोष भित्ता (Cell Wall)",
    nicknames: ["Protective Fortress", "Cellular Exoskeleton", "Plant Armor"],
    membraneType: "Non-membranous",
    foundIn: "plant-only",
    accentColor: "#22c55e",
    history: {
      discoverer: "Robert Hooke",
      year: "1665",
      naming: "First observed by English polymath Robert Hooke (1665) while examining thin slices of cork under his primitive microscope. The empty honeycomb compartments he saw were dead plant cell walls, which prompted him to coin the word 'cell' (from Latin *cellula* = small room).",
      milestones: [
        "1665: Robert Hooke published *Micrographia*, illustrating cork cell walls.",
        "1838: Matthias Schleiden concluded all plant tissues are composed of walled cells.",
      ],
    },
    ultrastructure: {
      size: "0.1 µm (primary wall) to several micrometers (lignified secondary wall)",
      components: [
        "Middle Lamella: Outermost cementing layer composed of amorphous Calcium and Magnesium pectate ('plant cement') joining adjacent plant cells.",
        "Primary Cell Wall: Thin, elastic, permeable layer formed in growing cells; composed of cellulose microfibrils embedded in a gel-like matrix of hemicellulose and pectin.",
        "Secondary Cell Wall: Thick, rigid, multi-layered inner wall (S1, S2, S3) deposited inside primary wall after cell stops growing; heavily reinforced with lignin, suberin, or cutin.",
        "Plasmodesmata: Microscopic cytoplasmic channels traversing the cell wall connecting the protoplasts of neighboring cells (symplastic transport pathway).",
      ],
      description:
        "The cell wall is a dead, rigid, non-living extracellular exoskeleton enclosing the plant protoplast. It is completely permeable to water and small dissolved solutes.",
      chemicalComposition: "Cellulose microfibrils (~40%), Hemicellulose (~20–30%), Pectin (~10–20%), Lignin (in wood/sclerenchyma), Suberin (in cork), Water.",
    },
    functions: {
      primary: [
        "Provides mechanical strength, structural rigidity, and defines characteristic plant cell shape.",
        "Prevents osmotic lysis (bursting) when plant cells take up large amounts of water in hypotonic environments.",
      ],
      secondary: [
        "Acts as a physical barrier shielding against fungal, viral, and bacterial pathogens.",
        "Plasmodesmata facilitate direct intercellular transport of nutrients, sugars, and signaling hormones across plant tissues.",
      ],
      biochemicalPathway: "Cellulose Synthesis: Plasma membrane rosette complexes of Cellulose Synthase (CesA) extrude parallel $\\beta(1\\rightarrow4)$-glucan chains crystallized into rigid microfibrils.",
    },
    examTips: {
      highYieldFacts: [
        "The ripening of fruits occurs when the enzyme pectinase dissolves the middle lamella, making the fruit soft.",
        "Cellulose consists of unbranched chains of $\\beta-D$-glucose joined by $\\beta(1\\rightarrow4)$ glycosidic bonds.",
      ],
      commonMistakes: [
        "The cell wall is completely PERMEABLE, whereas the cell membrane is SELECTIVELY PERMEABLE.",
        "Animal cells NEVER possess a cell wall.",
      ],
      sampleQuestions: [
        "Describe the chemical composition and layered structure of a plant cell wall. (NEB 4 Marks)",
        "What are plasmodesmata and what is their functional significance? (NEB 2 Marks)",
      ],
    },
  },
  {
    id: "cell-membrane",
    name: "Cell Membrane (Plasma Membrane)",
    nepaliName: "कोष झिल्ली (Plasma Membrane)",
    nicknames: ["Fluid Mosaic Gatekeeper", "Plasmalemma", "Selectively Permeable Barrier"],
    membraneType: "Single Membrane",
    foundIn: "both",
    accentColor: "#3b82f6",
    history: {
      discoverer: "C. Nägeli & C. Cramer (1855) / Singer & Nicolson (1972)",
      year: "1855 / 1972",
      naming: "Termed 'cell membrane' by Nägeli & Cramer (1855) and 'plasmalemma' by J.Q. Plowe (1931). S.J. Singer and Garth L. Nicolson proposed the universally accepted Fluid Mosaic Model in 1972.",
      milestones: [
        "1925: Gorter and Grendel extracted red blood cell lipids and demonstrated a lipid bilayer.",
        "1935: Danielli and Davson proposed the Sandwich Model (Protein-Lipid-Lipid-Protein).",
        "1959: J. David Robertson proposed the Unit Membrane hypothesis (7.5 nm thick).",
        "1972: Singer and Nicolson proposed the Fluid Mosaic Model (proteins floating like icebergs in a sea of lipids).",
      ],
    },
    ultrastructure: {
      size: "7.5 – 10 nm in thickness (visible only under transmission electron microscope)",
      components: [
        "Phospholipid Bilayer: Amphipathic molecules with hydrophilic polar phosphate heads facing outward and hydrophobic non-polar fatty acid tails facing inward.",
        "Integral (Intrinsic) Proteins: Embedded deeply in the lipid bilayer; many are transmembrane channel/carrier proteins (e.g. GLUT, aquaporins).",
        "Peripheral (Extrinsic) Proteins: Loosely attached to outer or inner membrane surface; act as enzymes, signaling anchors, or cytoskeletal links (spectrin).",
        "Cholesterol (Animal) / Phytosterols (Plant): Intercalated between fatty acid tails acting as a bidirectional membrane fluidity buffer.",
        "Glycocalyx: Carbohydrate branched chains covalently linked to proteins (glycoproteins) or lipids (glycolipids) on outer leaflet for cell-cell recognition and tissue compatibility.",
      ],
      description:
        "The universally accepted Fluid Mosaic Model describes the membrane as a dynamic 2D liquid-crystalline lipid matrix ('sea') in which globular proteins ('icebergs') float and diffuse laterally.",
      chemicalComposition: "Proteins (52% in RBC), Lipids (40% mainly phosphoglycerides and cholesterol), Carbohydrates (8% as oligosaccharides).",
    },
    functions: {
      primary: [
        "Selectively Permeable Barrier: Regulates entry and exit of molecules, maintaining internal homeostasis.",
        "Transport Mechanisms: Passive transport (simple diffusion, facilitated diffusion via channels/carriers) and Active transport against concentration gradient using ATP (e.g. $Na^+/K^+$ ATPase pump).",
      ],
      secondary: [
        "Endocytosis (Phagocytosis / Pinocytosis) and Exocytosis.",
        "Cellular communication, hormone receptor binding, and immune self/non-self recognition.",
      ],
      biochemicalPathway: "$Na^+/K^+$ Pump: Hydrolysis of 1 ATP exports $3 Na^+$ ions out of the cell and imports $2 K^+$ ions in, generating resting membrane potential (-70 mV).",
    },
    examTips: {
      highYieldFacts: [
        "Fluid Mosaic Model was proposed by Singer and Nicolson in 1972. Lipids exhibit rapid lateral diffusion (rarely flip-flop).",
        "Membrane fluidity increases with unsaturated fatty acids (kinks prevented from packing) and warm temperatures.",
      ],
      commonMistakes: [
        "Do not write the Danielli-Davson model as current — it was superseded by the Singer-Nicolson Fluid Mosaic Model.",
      ],
      sampleQuestions: [
        "Explain the Fluid Mosaic Model of plasma membrane with a well-labelled diagram. (NEB 5 Marks)",
        "Differentiate between active transport and facilitated diffusion across the cell membrane. (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "peroxisome",
    name: "Peroxisomes & Microbodies",
    nepaliName: "पेरोक्सिजोम (Peroxisomes)",
    nicknames: ["Hydrogen Peroxide Scavenger", "Detoxification Microbody", "Photorespiration Partner"],
    membraneType: "Single Membrane",
    foundIn: "both",
    accentColor: "#a855f7",
    history: {
      discoverer: "J. Rhodin (1954) / Christian de Duve (1966)",
      year: "1954 / 1966",
      naming: "First identified in mouse kidney by Rhodin (1954). Christian de Duve (1966) isolated and named them 'peroxisomes' due to their role in producing and decomposing hydrogen peroxide ($H_2O_2$).",
      milestones: [
        "1954: Morphological identification as microbodies.",
        "1966: De Duve established their catalytic role with catalase, urate oxidase, and D-amino acid oxidase.",
      ],
    },
    ultrastructure: {
      size: "0.2 – 1.0 µm in diameter (spherical single-membrane microbody)",
      components: [
        "Single Limiting Membrane: Protects cytoplasm from toxic metabolic intermediates.",
        "Crystalline Electron-Dense Core: In many species, contains concentrated crystalline urate oxidase or catalase enzymes.",
        "Aqueous Matrix: Packed with oxidative enzymes: catalase, peroxidase, glycolate oxidase.",
      ],
      description:
        "Ubiquitous eukaryotic microbodies prominent in liver and kidney cells of vertebrates and in green photosynthetic plant tissues (chloroplast-peroxisome-mitochondrion cooperation).",
      chemicalComposition: "Phospholipid monolayer/bilayer with high catalase and flavin oxidase content.",
    },
    functions: {
      primary: [
        "Decomposition of Toxic Hydrogen Peroxide: Flavin oxidases generate hazardous $H_2O_2$, which is immediately degraded by Catalase into harmless water and oxygen: $2H_2O_2 \\xrightarrow{\\text{Catalase}} 2H_2O + O_2$.",
        "Beta-Oxidation of Very Long Chain Fatty Acids (VLCFA > 22 carbons).",
      ],
      secondary: [
        "In plant cells, peroxisomes drive Photorespiration (Glycolate Cycle / $C_2$ cycle) in close contact with chloroplasts and mitochondria.",
        "Glyoxysomes (specialized plant peroxisomes in germinating oil seeds like castor) convert stored fatty acids into carbohydrates via the Glyoxylate Cycle.",
      ],
      biochemicalPathway: "Peroxisomal Catalase Reaction: $H_2O_2 + R'H_2 \\xrightarrow{\\text{Catalase}} R' + 2H_2O$.",
    },
    examTips: {
      highYieldFacts: [
        "The enzyme Catalase constitutes up to 40% of peroxisomal protein.",
        "In plant photorespiration, three organelles cooperate sequentially: Chloroplast $\\rightarrow$ Peroxisome $\\rightarrow$ Mitochondria.",
      ],
      commonMistakes: [
        "Glyoxysomes are found only in plant seeds, NOT in animal tissues.",
      ],
      sampleQuestions: [
        "What are peroxisomes? State their role in hydrogen peroxide decomposition and plant photorespiration. (NEB 3 Marks)",
      ],
    },
  },
  {
    id: "cytoskeleton",
    name: "Cytoskeleton",
    nepaliName: "कोषीय कंकाल (Cytoskeleton)",
    nicknames: ["Cellular Scaffolding", "Intracellular Railway", "Mechanical Framework"],
    membraneType: "Non-membranous",
    foundIn: "both",
    accentColor: "#eab308",
    history: {
      discoverer: "Paul Wintrebert (1931) & Keith R. Porter",
      year: "1931 / 1960s",
      naming: "French embryologist Paul Wintrebert coined 'cytosquelette' in 1931. High-voltage electron microscopy by Keith Porter in the 1960s and 1970s revealed its intricate 3D filamentous network.",
      milestones: [
        "1931: Wintrebert hypothesized a mechanical cytoplasmic framework.",
        "1963: Ledbetter and Porter discovered cytoplasmic microtubules.",
        "1970s: Microfilaments confirmed to consist of actin identical to muscle contractile protein.",
      ],
    },
    ultrastructure: {
      size: "Dynamic filamentous network spanning the entire interior of the cytoplasm",
      components: [
        "Microfilaments (Actin Filaments): Thinnest fibers (diameter ~7 nm) made of globular G-actin polymerized into two twisted strands of F-actin; high tensile strength.",
        "Intermediate Filaments: Tough, rope-like protein cords (diameter 8–12 nm) made of keratins, vimentin, neurofilaments, or lamins; bear mechanical stress.",
        "Microtubules: Thickest hollow straight cylinders (outer diameter 25 nm, lumen 15 nm) formed by 13 protofilaments of $\\alpha$- and $\\beta$-tubulin dimers.",
        "Molecular Motor Proteins: Kinesin (moves cargo towards $(+)$ cell periphery), Dynein (moves cargo towards $(-)$ centrosome), and Myosin (travels along actin filaments).",
      ],
      description:
        "The cytoskeleton is a dynamic, constantly reorganizing structural scaffold essential for cell division, shape maintenance, vesicle trafficking, and cellular motility.",
      chemicalComposition: "Actin, $\\alpha$-tubulin, $\\beta$-tubulin, Keratin, Vimentin, Desmin, Lamin, and associated motor proteins.",
    },
    functions: {
      primary: [
        "Mechanical Support & Cell Shape: Resists compressive and tensile mechanical deformation, anchoring organelles in specific cellular coordinates.",
        "Intracellular Transport: Microtubules act as cellular railroad tracks along which kinesin and dynein transport vesicles, lysosomes, and mitochondria.",
      ],
      secondary: [
        "Cellular Motility & Cyclosis: Microfilaments drive amoeboid crawling, cytoplasmic streaming (cyclosis in plant cells), and cytokinesis cleavage furrow contraction.",
        "Ciliary and Flagellar beating via axonemal dynein sliding.",
      ],
      biochemicalPathway: "Tubulin Polymerization: $\\alpha\\beta$-heterodimer + GTP $\\rightarrow$ Polymerization at $(+)$ end; GTP hydrolysis to GDP controls dynamic instability (catastrophe & rescue).",
    },
    examTips: {
      highYieldFacts: [
        "Colchicine (extracted from Colchicum autumnale) arrests mitosis at metaphase by binding to tubulin and preventing spindle microtubule assembly, inducing polyploidy.",
        "The cleavage furrow during animal cytokinesis is formed by a contractile ring of actin microfilaments and myosin.",
      ],
      commonMistakes: [
        "Intermediate filaments do NOT have motor proteins (unlike microfilaments which use myosin and microtubules which use kinesin/dynein).",
      ],
      sampleQuestions: [
        "Describe the three main types of cytoskeletal elements and mention their diameters and primary functions. (NEB 4 Marks)",
      ],
    },
  },
];

export interface CellComparisonItem {
  feature: string;
  plantCell: string;
  animalCell: string;
  significance: string;
}

export const PLANT_VS_ANIMAL_COMPARISON: CellComparisonItem[] = [
  {
    feature: "Cell Wall",
    plantCell: "Present; thick, rigid outer boundary composed of cellulose, hemicellulose, and pectin with middle lamella.",
    animalCell: "Completely absent; outermost living boundary is the flexible plasma membrane.",
    significance: "Enables plant cells to resist osmotic lysis in pure water and provides structural upright support to non-woody plants.",
  },
  {
    feature: "Shape & Symmetry",
    plantCell: "Fixed, regular, rectangular or polygonal definite shape due to rigid cell wall.",
    animalCell: "Flexible, irregular, rounded or variable shape capable of amoeboid movement.",
    significance: "Allows animal cells to crawl (phagocytes), deform through narrow capillaries, and form flexible moving tissues.",
  },
  {
    feature: "Plastids & Chloroplasts",
    plantCell: "Present; chloroplasts contain chlorophyll for photosynthesis; chromoplasts and leucoplasts present.",
    animalCell: "Completely absent in all animal cells.",
    significance: "Plants are autotrophs capturing solar energy; animals are heterotrophs relying on external food sources.",
  },
  {
    feature: "Vacuolar System",
    plantCell: "Large single permanent Central Vacuole occupying 80–90% of cell volume, enclosed by semipermeable tonoplast.",
    animalCell: "Vacuoles are small, multiple, temporary (pinocytic, phagocytic, or contractile).",
    significance: "Plant vacuole creates turgor pressure; animal cells manage osmotic water balance via kidney/excretory organs.",
  },
  {
    feature: "Centrosome & Centrioles",
    plantCell: "Absent in higher plant cells (gymnosperms & angiosperms); spindle poles are anastral.",
    animalCell: "Present near nucleus; pair of perpendicular centrioles organizes amphiastral mitotic spindle.",
    significance: "Plant cells utilize non-centrosomal MTOCs for spindle formation during cell division.",
  },
  {
    feature: "Position of Nucleus",
    plantCell: "Peripheral / Eccentric (pushed against cell wall by the expansive central vacuole).",
    animalCell: "Centrally located in the middle of the cytoplasm.",
    significance: "Reflects the sheer volumetric dominance of the plant central vacuole.",
  },
  {
    feature: "Lysosomes",
    plantCell: "Rare or absent; hydrolytic and lytic digestive functions are performed inside the central vacuole.",
    animalCell: "Abundant and prominent; specialized suicide bags containing ~50 acidic hydrolases.",
    significance: "Animal cells actively phagocytose pathogens and macromolecules requiring dedicated lysosomes.",
  },
  {
    feature: "Stored Carbohydrate Food",
    plantCell: "Starch grains (insoluble polymer of amylose and amylopectin) stored in leucoplasts / stroma.",
    animalCell: "Glycogen granules (branched polymer of glucose) stored in cytoplasm, liver, and muscles.",
    significance: "Diagnostic biochemical signature separating Kingdom Plantae and Kingdom Animalia.",
  },
  {
    feature: "Intercellular Communication",
    plantCell: "Plasmodesmata — microscopic cytoplasmic channels crossing the cell wall (symplast).",
    animalCell: "Gap Junctions, Tight Junctions, and Desmosomes.",
    significance: "Enables coordination across walled plant tissues without cellular movement.",
  },
  {
    feature: "Cytokinesis Mechanism",
    plantCell: "Centrifugal Cell Plate Method: Golgi-derived phragmoplast vesicles fuse from the center outward.",
    animalCell: "Centripetal Cleavage Furrow Method: Actin-myosin contractile ring pinches from outside inward.",
    significance: "Rigid plant cell walls cannot be pinched inward; must be built by depositing middle lamella outward.",
  },
];

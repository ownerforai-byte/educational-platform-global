/**
 * High-Yield Topic Facts — Biology: Biomolecules & Cell Biology (Class 11).
 *
 * This unit is the largest in the Class 11 biology syllabus and previously had
 * NO entry in the biology bank, so every one of its topics resolved to
 * `null` and the fact-bank sections were hidden. Entries here are topic-level
 * (not unit-level) because the unit spans four distinct examinable blocks:
 * biomolecules, cell structure, cell division and the applied/ethical tail.
 *
 * Matching note: `findHighYieldTopicData` prefers an exact `unitSlugs` match and
 * breaks ties by keyword score, so each entry's `topicKeywords` must contain
 * words that actually appear in its own topic slug or title.
 */

import type { HighYieldTopicData } from "./high-yield-topic-facts-match";

export const HIGH_YIELD_TOPIC_BANK_BIOLOGY_CELL: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Biomolecules
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "biomolecules",
      "carbohydrates",
      "proteins",
      "lipids",
      "nucleic-acids",
      "enzymes",
      "amino-acids",
      "peptide-bond",
    ],
    subject: "biology",
    title: "Biomolecules — Carbohydrates, Proteins, Lipids, Nucleic Acids & Enzymes",
    unitSlugs: ["biomolecules-and-cell-biology"],
    category: "Cell Biology & Biomolecules",
    governingLaws: [
      {
        name: "Structure Determines Function",
        statement:
          "The biological role of a biomolecule follows directly from its three-dimensional shape and the chemical groups exposed on its surface.",
        formula:
          "\\text{primary sequence} \\to \\text{secondary} \\to \\text{tertiary} \\to \\text{function}",
        conditions:
          "Denaturation destroys tertiary and quaternary structure while leaving the primary sequence intact, so function is lost without any change in amino acid order.",
      },
      {
        name: "Enzyme Lowering of Activation Energy",
        statement:
          "An enzyme accelerates a reaction by providing an alternative pathway with a lower activation energy; it does not alter the equilibrium constant or the free energy change of the reaction.",
        formula: "\\Delta G^{\\circ} = -RT\\ln K_{eq} \\quad (\\text{unchanged by enzyme})",
        conditions:
          "The enzyme must be able to bind the substrate at its active site. Activity is destroyed by extremes of temperature or pH, and inhibited by competitive or non-competitive inhibitors.",
      },
      {
        name: "Chargaff's Rules for DNA",
        statement:
          "In double-stranded DNA the amount of adenine equals thymine and the amount of guanine equals cytosine, because of complementary base pairing.",
        formula: "A = T, \\quad G = C, \\quad \\frac{A+G}{T+C} = 1",
        conditions:
          "Applies only to double-stranded DNA. Single-stranded DNA and RNA do not obey the equality.",
      },
    ],
    speedFormulas: [
      {
        name: "Energy value of the three fuels",
        formula: "\\text{carbohydrate} \\approx 4\\ \\text{kcal/g},\\ \\text{protein} \\approx 4\\ \\text{kcal/g},\\ \\text{lipid} \\approx 9\\ \\text{kcal/g}",
        description:
          "Lipid gives more than twice the energy of carbohydrate per gram because its hydrocarbon chains are far more reduced. This is why fat is the long-term energy store.",
        unit: "kcal/g",
      },
      {
        name: "ATP hydrolysis energy",
        formula: "\\text{ATP} + H_2O \\to \\text{ADP} + P_i, \\quad \\Delta G \\approx -30.5\\ \\text{kJ/mol}",
        description:
          "The standard free energy released on hydrolysing the terminal phosphate bond. ATP is the universal energy currency because this value is large enough to drive most cellular work but small enough to be regenerated easily.",
        unit: "kJ/mol",
      },
      {
        name: "Base-pair ratio check",
        formula: "\\frac{A+G}{T+C} = 1 \\ \\text{and}\\ \\frac{A+T}{G+C}\\ \\text{varies with species}",
        description:
          "The first ratio is always 1 in dsDNA; the second is species-specific and is the basis of DNA fingerprinting and GC-content analysis.",
        unit: "ratio",
      },
    ],
    constantsAndValues: [
      { symbol: "20", name: "Number of standard amino acids in proteins", value: "20", unit: "amino acids" },
      { symbol: "4", name: "Structural levels of a protein", value: "primary, secondary, tertiary, quaternary", unit: "levels" },
      { symbol: "70S", name: "Ribosome of prokaryotes", value: "50S + 30S", unit: "Svedberg" },
      { symbol: "80S", name: "Ribosome of eukaryotes", value: "60S + 40S", unit: "Svedberg" },
      { symbol: "3.4 Å", name: "Rise per base pair in B-DNA", value: "0.34 nm", unit: "nm" },
      { symbol: "10", name: "Base pairs per turn of B-DNA", value: "10", unit: "bp/turn" },
    ],
    entranceTraps: [
      {
        trap: "Starch and cellulose differ because they are made of different sugars.",
        truth:
          "Both are polymers of glucose only. They differ in the glycosidic linkage: starch has alpha-1,4 bonds that human amylase can hydrolyse, cellulose has beta-1,4 bonds that humans cannot digest.",
        examRef: "NEB / CEE — carbohydrates",
      },
      {
        trap: "An enzyme changes the equilibrium position of a reaction so more product forms.",
        truth:
          "An enzyme changes only the RATE. It lowers activation energy equally in both directions, so equilibrium is reached sooner but the final concentrations are unchanged.",
        examRef: "CEE — enzyme kinetics",
      },
      {
        trap: "Boiling a protein destroys it because the peptide bonds break.",
        truth:
          "Heat denaturation breaks hydrogen bonds and other weak interactions holding the tertiary structure, not the covalent peptide bonds. The primary sequence survives, which is why some proteins refold on cooling.",
        examRef: "NEB — protein structure",
      },
      {
        trap: "Lipids are polymers of fatty acids.",
        truth:
          "Lipids are not true polymers: they are not built from a single repeating monomer unit. A fat is a glycerol esterified to three fatty acids, and steroids share no repeating backbone at all.",
        examRef: "CEE — biomolecule classification",
      },
      {
        trap: "Competitive and non-competitive inhibitors both lower Vmax.",
        truth:
          "A competitive inhibitor raises Km but leaves Vmax unchanged (surmountable by more substrate). A non-competitive inhibitor lowers Vmax but leaves Km unchanged.",
        examRef: "CEE — enzyme inhibition",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A double-stranded DNA sample contains 30% adenine. Calculate the percentage of guanine.",
        given: "A = 30%",
        steps: [
          "By Chargaff's rule, T = A = 30%.",
          "So A + T = 60%, leaving G + C = 40%.",
          "By Chargaff's rule G = C, so G = 40% / 2 = 20%.",
        ],
        answer: "Guanine = 20%",
      },
      {
        problem:
          "A polypeptide has 150 amino acids. How many peptide bonds and how many water molecules were released during its synthesis?",
        given: "n = 150 amino acids",
        steps: [
          "Each peptide bond joins two amino acids and releases one water molecule.",
          "Number of bonds = n - 1 = 150 - 1 = 149.",
          "Water released equals the number of bonds formed.",
        ],
        answer: "149 peptide bonds and 149 water molecules",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Denaturation",
        definition:
          "Loss of the native three-dimensional structure of a protein caused by heat, extremes of pH, organic solvents or heavy metals, without breakage of peptide bonds.",
        significance:
          "Explains why a boiled egg cannot return to its liquid state and why fever above about 42 °C is dangerous — enzymes begin to denature.",
      },
      {
        term: "Active site",
        definition:
          "The specific region of an enzyme where the substrate binds and catalysis occurs, formed by a precise arrangement of amino acid side chains.",
        significance:
          "Its geometry is the physical basis of enzyme specificity and the target of most competitive inhibitor drugs.",
      },
      {
        term: "Zwitterion",
        definition:
          "An amino acid form carrying both a positive and a negative charge simultaneously, arising from internal acid-base reaction of its amino and carboxyl groups.",
        significance:
          "Explains why amino acids are highly soluble, have high melting points and migrate in an electric field — the basis of electrophoresis.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Cell structure
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "cell-introduction",
      "prokaryotic",
      "eukaryotic",
      "cell-theory",
      "cell-structure",
      "organelles",
      "cell-membrane",
      "nucleus",
    ],
    subject: "biology",
    title: "Cell — Theory, Prokaryotic vs Eukaryotic Organisation & Organelles",
    unitSlugs: ["biomolecules-and-cell-biology"],
    category: "Cell Biology & Biomolecules",
    governingLaws: [
      {
        name: "Cell Theory",
        statement:
          "All living organisms are composed of one or more cells; the cell is the basic structural and functional unit of life; and all cells arise from pre-existing cells by division.",
        formula:
          "\\text{Schleiden} + \\text{Schwann (1838-39)} + \\text{Virchow (1855)}",
        conditions:
          "The classical theory predates the discovery of viruses, which are acellular and are not covered by it.",
      },
      {
        name: "Fluid Mosaic Model (Singer & Nicolson, 1972)",
        statement:
          "The plasma membrane is a fluid phospholipid bilayer in which proteins are embedded like a mosaic, and both lipids and proteins can move laterally.",
        formula: "\\text{phospholipid bilayer} + \\text{integral/peripheral proteins} + \\text{cholesterol}",
        conditions:
          "Membrane fluidity increases with unsaturated fatty acid content and temperature, and decreases with cholesterol in the warm range.",
      },
      {
        name: "Surface Area to Volume Constraint",
        statement:
          "As a cell grows, its volume increases as the cube of its linear dimension while its surface area increases only as the square, so the ratio falls and exchange across the membrane becomes limiting.",
        formula: "\\frac{\\text{SA}}{\\text{V}} = \\frac{4\\pi r^2}{\\frac{4}{3}\\pi r^3} = \\frac{3}{r}",
        conditions:
          "This is why large cells are flattened, elongated or compartmentalised, and why cells divide rather than grow indefinitely.",
      },
    ],
    speedFormulas: [
      {
        name: "Surface area to volume ratio",
        formula: "\\frac{SA}{V} = \\frac{3}{r}\\ \\text{(sphere)}",
        description:
          "Halving the radius doubles the ratio. A small cell therefore exchanges materials far more efficiently per unit of cytoplasm than a large one.",
        unit: "per unit length",
      },
      {
        name: "Magnification",
        formula: "M = \\frac{\\text{image size}}{\\text{actual size}}",
        description:
          "Rearranged as actual size = image size / magnification. Always convert both lengths to the same unit before dividing.",
        unit: "dimensionless",
      },
      {
        name: "Ribosome sedimentation values",
        formula: "70S = 50S + 30S \\quad ; \\quad 80S = 60S + 40S",
        description:
          "Svedberg units are not additive because they depend on shape as well as mass. The 70S vs 80S difference is the basis of antibiotic selectivity.",
        unit: "Svedberg (S)",
      },
    ],
    constantsAndValues: [
      { symbol: "1665", name: "Year Robert Hooke coined the term 'cell'", value: "1665", unit: "year" },
      { symbol: "1838-39", name: "Years Schleiden and Schwann proposed cell theory", value: "1838-1839", unit: "year" },
      { symbol: "1855", name: "Year Virchow stated omnis cellula e cellula", value: "1855", unit: "year" },
      { symbol: "1972", name: "Year Singer and Nicolson proposed the fluid mosaic model", value: "1972", unit: "year" },
      { symbol: "7-8 nm", name: "Thickness of the plasma membrane", value: "7-8", unit: "nm" },
      { symbol: "9+2", name: "Microtubule arrangement in cilia and flagella", value: "9 doublets + 2 singlets", unit: "arrangement" },
    ],
    entranceTraps: [
      {
        trap: "Prokaryotes have no organelles.",
        truth:
          "Prokaryotes have no MEMBRANE-BOUND organelles. They do have ribosomes (70S), and some have mesosomes and storage granules.",
        examRef: "NEB / CEE — prokaryotic cell",
      },
      {
        trap: "Viruses are the simplest prokaryotes.",
        truth:
          "Viruses are not cells and not prokaryotes: they have no cytoplasm, no ribosomes, no metabolism and cannot reproduce outside a host.",
        examRef: "CEE — cell theory",
      },
      {
        trap: "Mitochondria and chloroplasts are fully independent of the nucleus.",
        truth:
          "They are only semi-autonomous. They have their own circular DNA and 70S ribosomes, but most of their proteins are encoded by nuclear genes and imported.",
        examRef: "NEB — endosymbiotic theory",
      },
      {
        trap: "Cholesterol makes all membranes more fluid.",
        truth:
          "Cholesterol buffers fluidity: it reduces fluidity at high temperature by restraining phospholipid movement, and prevents rigid packing at low temperature.",
        examRef: "CEE — membrane structure",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A cell is modelled as a sphere of radius 10 micrometre. Calculate its surface area to volume ratio, and state what happens to the ratio if the radius doubles.",
        given: "r = 10 micrometre",
        steps: [
          "SA = 4 pi r^2 = 4 pi (100) = 400 pi square micrometre.",
          "V = (4/3) pi r^3 = (4/3) pi (1000) = 1333.3 pi cubic micrometre.",
          "SA/V = 400 pi / 1333.3 pi = 0.3 per micrometre.",
          "If r doubles to 20, SA/V = 3/20 = 0.15 per micrometre.",
        ],
        answer: "SA/V = 0.3 per micrometre; doubling the radius halves the ratio to 0.15",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Endosymbiotic theory",
        definition:
          "The proposal that mitochondria and chloroplasts originated as free-living prokaryotes engulfed by an ancestral eukaryotic cell and retained in a mutually beneficial relationship.",
        significance:
          "Explained by their double membrane, circular DNA and 70S ribosomes — features no other eukaryotic organelle shares.",
      },
      {
        term: "Compartmentalisation",
        definition:
          "The division of the eukaryotic cell into membrane-bound compartments with distinct chemical environments and enzyme sets.",
        significance:
          "Allows incompatible reactions to proceed simultaneously — lysosomal enzymes at pH 5 would destroy the cytosol at pH 7.2.",
      },
      {
        term: "Plasmodesmata",
        definition:
          "Cytoplasmic channels passing through the cell walls of adjacent plant cells, connecting their cytoplasm.",
        significance:
          "Creates the symplast, allowing water, ions and signalling molecules to move between plant cells without crossing membranes.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Cell division
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "cell-division",
      "cell-cycle",
      "mitosis",
      "meiosis",
      "amitosis",
      "chromosome",
      "crossing-over",
      "cytokinesis",
    ],
    subject: "biology",
    title: "Cell Division — Cell Cycle, Mitosis, Meiosis & Their Significance",
    unitSlugs: ["biomolecules-and-cell-biology"],
    category: "Cell Biology & Biomolecules",
    governingLaws: [
      {
        name: "Law of Chromosome Constancy",
        statement:
          "Mitosis maintains the chromosome number of the parent cell in both daughter cells, because DNA replicates during S phase before the chromatids are separated.",
        formula: "2n \\xrightarrow{\\text{mitosis}} 2n + 2n",
        conditions:
          "Requires prior DNA replication in S phase and correct spindle attachment at metaphase.",
      },
      {
        name: "Reduction Division",
        statement:
          "Meiosis halves the chromosome number by separating homologous chromosomes in meiosis I and sister chromatids in meiosis II, producing four haploid cells.",
        formula: "2n \\xrightarrow{\\text{meiosis I}} n + n \\xrightarrow{\\text{meiosis II}} 4n\\ \\text{cells}",
        conditions:
          "DNA replicates only once but the cell divides twice, so each product receives one chromatid of each chromosome.",
      },
      {
        name: "Independent Assortment",
        statement:
          "Homologous chromosome pairs orient independently at metaphase I, so the number of possible gamete combinations is 2 raised to the power of the haploid number.",
        formula: "\\text{combinations} = 2^{n}",
        conditions:
          "Assumes no crossing over and independent behaviour of non-homologous chromosomes; crossing over increases variation further.",
      },
    ],
    speedFormulas: [
      {
        name: "Independent assortment combinations",
        formula: "2^{n}",
        description:
          "For humans n = 23, giving 2^23 = 8,388,608 combinations from assortment alone, before crossing over is counted.",
        unit: "combinations",
      },
      {
        name: "Products of each division type",
        formula: "\\text{mitosis}: 1 \\to 2\\ \\text{(2n)} \\quad ; \\quad \\text{meiosis}: 1 \\to 4\\ \\text{(n)}",
        description:
          "Mitosis is equational and conservative; meiosis is reductional and generates variation. Both start from a replicated chromosome set.",
        unit: "cells",
      },
      {
        name: "DNA content through the cycle",
        formula: "2C \\xrightarrow{S} 4C \\xrightarrow{\\text{mitosis}} 2C + 2C",
        description:
          "DNA content doubles in S phase and is halved at each division. In meiosis the sequence is 2C to 4C to 2C to 1C.",
        unit: "C (haploid DNA content)",
      },
    ],
    constantsAndValues: [
      { symbol: "2n = 46", name: "Human diploid chromosome number", value: "46", unit: "chromosomes" },
      { symbol: "n = 23", name: "Human haploid chromosome number", value: "23", unit: "chromosomes" },
      { symbol: "2^23", name: "Independent assortment combinations in humans", value: "8,388,608", unit: "combinations" },
      { symbol: "5", name: "Number of substages in prophase I", value: "leptotene, zygotene, pachytene, diplotene, diakinesis", unit: "stages" },
      { symbol: "G1/S, G2/M, M", name: "The three major cell cycle checkpoints", value: "3", unit: "checkpoints" },
    ],
    entranceTraps: [
      {
        trap: "DNA replicates twice during meiosis because there are two divisions.",
        truth:
          "DNA replicates only ONCE, during the S phase preceding meiosis I. The two divisions then halve the content twice: 4C to 2C to 1C.",
        examRef: "NEB / CEE — meiosis",
      },
      {
        trap: "Crossing over occurs in prophase II.",
        truth:
          "Crossing over occurs in pachytene of prophase I, between non-sister chromatids of homologous chromosomes. Prophase II has no homologues left to cross over.",
        examRef: "CEE — meiosis stages",
      },
      {
        trap: "Sister chromatids separate in anaphase I.",
        truth:
          "Homologous chromosomes separate in anaphase I; sister chromatids separate in anaphase II (and in mitotic anaphase).",
        examRef: "NEB — anaphase comparison",
      },
      {
        trap: "Meiosis produces genetic variation mainly by mutation.",
        truth:
          "The dominant sources are crossing over and independent assortment, both of which reshuffle existing alleles. Mutation creates new alleles but at a far lower rate.",
        examRef: "CEE — sources of variation",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A diploid organism has 2n = 8. How many chromosomes are present in each cell at metaphase of mitosis, and in each product of meiosis?",
        given: "2n = 8",
        steps: [
          "At metaphase of mitosis the chromosomes are replicated, so there are 8 chromosomes each with 2 chromatids = 16 chromatids.",
          "Chromosome number is still counted as 8 because the centromeres have not divided.",
          "Meiosis halves the number, so each of the four products has n = 4 chromosomes.",
        ],
        answer: "8 chromosomes (16 chromatids) at mitotic metaphase; 4 chromosomes in each meiotic product",
      },
      {
        problem:
          "How many different gametes can an organism with 2n = 6 produce by independent assortment alone?",
        given: "2n = 6, so n = 3",
        steps: ["Number of combinations = 2^n.", "n = 3, so 2^3 = 8."],
        answer: "8 different gametes",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Chiasma",
        definition:
          "The point at which non-sister chromatids of homologous chromosomes remain in contact after crossing over, visible in diplotene of prophase I.",
        significance:
          "Physical evidence that crossing over occurred, and the structure that holds homologues together until anaphase I.",
      },
      {
        term: "Non-disjunction",
        definition:
          "Failure of homologous chromosomes or sister chromatids to separate properly during division, so both pass into the same daughter cell.",
        significance:
          "Produces aneuploid gametes; trisomy 21 (Down syndrome) is the classic human example.",
      },
      {
        term: "Cyclin-dependent kinase",
        definition:
          "A protein kinase that phosphorylates target proteins to drive the cell cycle forward, active only when bound to the appropriate cyclin.",
        significance:
          "The molecular gatekeeper of the checkpoints; its dysregulation is a hallmark of cancer.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Applied / ethical tail of the unit
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "biotechnology-applications-and-ethical-considerations",
      "gene-therapy",
      "gmo",
      "bt-crops",
      "recombinant",
      "insulin",
      "bioethics",
    ],
    subject: "biology",
    title: "Biotechnology Applications & Ethical Considerations",
    unitSlugs: ["biomolecules-and-cell-biology"],
    category: "Applied Biology",
    governingLaws: [
      {
        name: "Recombinant DNA Principle",
        statement:
          "A gene of interest is cut with a restriction enzyme, inserted into a vector cut with the same enzyme, and the recombinant molecule is introduced into a host cell where it is replicated and expressed.",
        formula:
          "\\text{gene} + \\text{vector} \\xrightarrow{\\text{ligase}} \\text{recombinant DNA} \\to \\text{host} \\to \\text{product}",
        conditions:
          "Requires a compatible restriction site, a selectable marker, and a host able to express the gene — prokaryotic hosts cannot splice human introns.",
      },
      {
        name: "Precautionary Principle in Bioethics",
        statement:
          "Where an intervention may cause serious or irreversible harm, lack of full scientific certainty is not a sufficient reason to postpone cost-effective measures to prevent it.",
        formula: "\\text{uncertainty} \\not\\Rightarrow \\text{inaction}",
        conditions:
          "Applied to GMO release, germline editing and field trials; balanced against the duty to relieve suffering.",
      },
    ],
    speedFormulas: [
      {
        name: "Recombinant insulin advantage",
        formula: "\\text{animal pancreas} \\to \\text{human gene in } E.\\ coli \\text{ or yeast}",
        description:
          "Recombinant human insulin avoids the immune reactions and supply limits of porcine or bovine insulin, and can be produced at industrial scale.",
        unit: "—",
      },
      {
        name: "Bt toxin specificity",
        formula: "\\text{Bt gene} \\to \\text{Cry protein} \\to \\text{lepidopteran midgut receptor}",
        description:
          "The Cry protein binds receptors present only in certain insect larvae, which is why Bt crops spare most non-target organisms.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "1978", name: "Year recombinant human insulin was first produced", value: "1978", unit: "year" },
      { symbol: "1982", name: "Year recombinant insulin was approved for clinical use", value: "1982", unit: "year" },
      { symbol: "1990", name: "Year of the first gene therapy trial (ADA-SCID)", value: "1990", unit: "year" },
      { symbol: "2010", name: "Nagoya Protocol on access and benefit sharing", value: "2010", unit: "year" },
    ],
    entranceTraps: [
      {
        trap: "Gene therapy changes the genes passed to the patient's children.",
        truth:
          "Somatic gene therapy affects only the treated individual. Only germline editing is heritable, and it is widely prohibited.",
        examRef: "NEB — gene therapy",
      },
      {
        trap: "Bt crops are toxic to all insects.",
        truth:
          "The Cry protein is specific to certain lepidopteran (and in some variants coleopteran) larvae whose midgut has the matching receptor. Bees and most predators are unaffected.",
        examRef: "CEE — GM crops",
      },
      {
        trap: "Recombinant insulin is extracted from human cadavers.",
        truth:
          "It is produced by bacteria or yeast carrying the human insulin gene. Cadaveric extraction was an early and now abandoned approach.",
        examRef: "NEB — biotechnology applications",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Gene therapy",
        definition:
          "Treatment of a genetic disease by introducing a functional copy of the defective gene into the patient's cells.",
        significance:
          "Treats the cause rather than the symptom; the first clinical success (ADA-SCID, 1990) proved a genetic disease can be corrected in a living patient.",
      },
      {
        term: "Biopiracy",
        definition:
          "The use of a community's biological resources or traditional knowledge for commercial gain without permission, acknowledgement or benefit sharing.",
        significance:
          "The reason benefit-sharing agreements such as the Nagoya Protocol now accompany bioprospecting.",
      },
      {
        term: "Biofortification",
        definition:
          "Breeding or engineering a crop to increase its content of a nutrient that is deficient in the target population's diet.",
        significance:
          "Golden rice, enriched in beta-carotene, is the standard example; it addresses vitamin A deficiency without requiring behaviour change.",
      },
    ],
  },
];

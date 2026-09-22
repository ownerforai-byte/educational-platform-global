/**
 * Pro Knowledge — Biology Diagrams chapters.
 * Diagram-centric knowledge: what each label must show, the exact
 * identification points, exam traps and drawing tricks.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const BIOLOGY_CHAPTERS: KnowledgeChapter[] = [
  {
    id: "cell-biology-diagrams",
    title: "Cell Biology Diagrams",
    classLevel: "class-11",
    blurb:
      "Plant and animal cells, organelles, mitosis/meiosis stages, DNA and enzyme action — the labelled diagrams every NEB paper expects.",
    theory: [
      {
        heading: "Plant vs animal cell — the identifying marks",
        level: "basic",
        body:
          "A plant cell is a rigid rectangular box with a cellulose wall outside a plasma membrane, one huge central vacuole pushing the nucleus to the edge, and green chloroplasts. An animal cell is rounded and irregular with no wall, no chloroplast, small scattered vacuoles or none, centrioles present and the nucleus central. Every distinguishing label earns marks only if placed on the correct structure.",
        math: "\\text{Plant: wall + large central vacuole + plastids}",
      },
      {
        heading: "Organelle identification by ultrastructure",
        level: "standard",
        body:
          "Mitochondria show a double membrane with folded cristae enclosing matrix. Chloroplasts show a double membrane, stacked grana (thylakoids) and stroma. The nucleus has a double envelope perforated by pores with a nucleolus and chromatin inside. Rough ER carries ribosomes; smooth ER does not. Golgi bodies are stacked flattened cisternae budding vesicles. Lysosomes are single-membrane sacs of enzymes.",
      },
      {
        heading: "Cell division stages — what changes when",
        level: "pro",
        body:
          "In mitosis, prophase condenses chromosomes and breaks the envelope, metaphase aligns them at the equator on the spindle, anaphase pulls chromatids to poles, and telophase reforms two nuclei. Meiosis adds prophase-I pairing (synapsis) with chiasmata and two divisions, halving the chromosome number and generating variation. Drawing the spindle and centromere position correctly is what separates full marks from partial.",
      },
      {
        heading: "Enzyme and DNA diagrams",
        level: "pro",
        body:
          "An enzyme diagram must show the active site with a specific shape, the substrate fitting, the enzyme–substrate complex and the released products with the enzyme unchanged. The DNA diagram must show the antiparallel sugar–phosphate backbones running in opposite directions, base pairs A–T and G–C joined by hydrogen bonds, and that the helix completes a turn every ten base pairs.",
      },
    ],
    formulas: [
      {
        name: "Magnification rule",
        latex: "M = \\frac{\\text{drawn size}}{\\text{actual size}}",
        symbols: [
          { sym: "M", meaning: "magnification (×)" },
          { sym: "drawn size", meaning: "measurement on your diagram", unit: "mm" },
        ],
        when: "Whenever a question asks for scale or the real size of a structure.",
      },
      {
        name: "Chromosome count after division",
        latex: "\\text{Mitosis: } 2n \\to 2n, \\qquad \\text{Meiosis: } 2n \\to n",
        symbols: [
          { sym: "2n", meaning: "diploid number" },
          { sym: "n", meaning: "haploid number" },
        ],
        when: "Counting chromosomes and chromatids at each stage.",
      },
      {
        name: "DNA base-pairing law",
        latex: "A \\equiv T, \\qquad G \\equiv C, \\qquad A+G = T+C",
        symbols: [{ sym: "A, T, G, C", meaning: "the four nitrogenous bases" }],
        when: "Percentage-composition questions on DNA.",
        hook: "Chargaff's rule: purines always equal pyrimidines.",
      },
      {
        name: "Chargaff percentages",
        latex: "\\%A = \\%T, \\qquad \\%G = \\%C",
        symbols: [{ sym: "%", meaning: "mole percentage of each base" }],
        when: "If %A = 30, then %T = 30 and %G = %C = 20.",
      },
    ],
    specialCases: [
      {
        title: "Human somatic cell",
        condition: "Diploid human cell",
        result: "2n = 46 \\text{ chromosomes} = 23 \\text{ pairs}",
        why: "One pair is sex chromosomes (XX or XY); the rest are autosomes.",
      },
      {
        title: "Number of chromatids in metaphase",
        condition: "Before centromere splitting",
        result: "Chromatids = 2 \\times \\text{chromosomes}",
        why: "Each chromosome has duplicated, so 46 chromosomes appear as 92 chromatids at metaphase.",
        askedIn: "Counting questions that catch half the class.",
      },
      {
        title: "Meiosis in gamete formation",
        condition: "Human gamete",
        result: "n = 23, \\qquad \\text{genetically unique}",
        why: "Independent assortment plus crossing over gives 2²³ possible combinations.",
      },
      {
        title: "Prokaryotic vs eukaryotic",
        condition: "Bacterial cell",
        result: "\\text{No nucleus, no membrane-bound organelles, 70S ribosomes}",
        why: "The nucleoid is naked circular DNA; this single distinction drives the entire classification question.",
      },
    ],
    tricks: [
      {
        title: "Label lines never cross",
        how:
          "Draw straight label lines that never intersect, all ending exactly on the structure. Crossing lines are marked wrong even when labels are correct.",
        example: "Place labels around the perimeter, alternating left and right for balance.",
        saves: "Protects multiple marks",
      },
      {
        title: "Draw what is asked, not everything",
        how:
          "If asked for the mitochondrion, draw only the mitochondrion large with cristae and matrix labelled.",
        example: "A large clear organelle beats a cluttered tiny cell.",
      },
      {
        title: "Use the standard colour code",
        how:
          "Keep nucleus purple, cytoplasm light, chloroplast green, blood red. Examiners read diagrams visually first.",
        example: "Consistent colour makes the diagram instantly readable.",
      },
      {
        title: "Ratio check for chromosomes",
        how:
          "Chromatid count is double the chromosome count whenever centromeres have not yet split.",
        example: "46 chromosomes at metaphase = 92 chromatids.",
        saves: "~15 s",
      },
    ],
    mistakes: [
      {
        wrong: "Drawing an animal cell with a cell wall.",
        right: "Only plant cells have a cellulose wall; animal cells have just the plasma membrane.",
        why: "The wall is the first identifying feature of a plant cell.",
      },
      {
        wrong: "Showing mitochondria with a single membrane.",
        right: "Draw the outer membrane and the inner one folded into cristae.",
        why: "The double membrane is the marks-earning ultrastructure detail.",
      },
      {
        wrong: "Labeling the nucleolus as the nucleus.",
        right: "Nucleolus is a dense body inside the nucleus, not a synonym for it.",
        why: "Label precision is what being tested here.",
      },
      {
        wrong: "Drawing chromatids separating in metaphase.",
        right: "Metaphase has chromosomes aligned at the equator; separation happens in anaphase.",
        why: "Stage names carry specific events that must appear.",
      },
    ],
  },

  {
    id: "plant-morphology-diagrams",
    title: "Plant Morphology & Anatomy Diagrams",
    classLevel: "class-11",
    blurb:
      "Root, stem, leaf, inflorescence, flower, seed and the internal tissue sections — T.S. of stem, root, leaf and anther.",
    theory: [
      {
        heading: "External morphology label sets",
        level: "basic",
        body:
          "A root diagram needs root cap, region of meristematic activity, region of elongation, region of maturation, root hairs and lateral roots. A stem needs node, internode, axillary bud, terminal bud, leaf scar. A leaf needs lamina, petiole, midrib, veins (reticulate or parallel) and stipules.",
      },
      {
        heading: "Flower structure and placentation",
        level: "standard",
        body:
          "A complete flower shows calyx (sepals), corolla (petals), androecium (stamen = anther + filament) and gynoecium (carpel = stigma + style + ovary). Placentation types — marginal, axile, parietal, free central, basal — are identified by where ovules attach inside the ovary, which is why the ovary must be drawn in longitudinal section.",
      },
      {
        heading: "Internal tissue sections (T.S.)",
        level: "pro",
        body:
          "A dicot stem T.S. from outside inward: epidermis, cortex (hypodermis, general cortex, endodermis), and a ring of vascular bundles with cambium inside. A monocot stem has scattered vascular bundles with a sclerenchymatous bundle sheath. A root T.S. shows radial vascular bundles with xylem and phloem on separate radii — the single most reliable way to distinguish root from stem in section.",
        math: "\\text{Root: radial bundles} \\neq \\text{Stem: conjoint bundles}",
      },
      {
        heading: "Leaf anatomy and stomata",
        level: "pro",
        body:
          "A dicot leaf T.S. shows upper epidermis with cuticle, palisade mesophyll (columnar cells rich in chloroplasts), spongy mesophyll with air spaces, and lower epidermis pierced by stomata with guard cells. Monocot leaves are isobilateral and lack clearly differentiated mesophyll, which links directly to their parallel venation.",
      },
    ],
    formulas: [
      {
        name: "Floral formula notation",
        latex: "\\text{Br} \\oplus \\, K_{(5)} C_5 A_{(9)+1} G_{1}",
        symbols: [
          { sym: "Br", meaning: "bracteate" },
          { sym: "⊕", meaning: "actinomorphic (radial symmetry)" },
          { sym: "K, C, A, G", meaning: "calyx, corolla, androecium, gynoecium" },
        ],
        when: "Summarising any family's flower, e.g. Fabaceae.",
      },
      {
        name: "Number of floral parts (5-merous)",
        latex: "K + C + A + G = 5 + 5 + 10 + 1",
        symbols: [{ sym: "counts", meaning: "number of parts in each whorl" }],
        when: "Family identification and floral-formula questions.",
      },
      {
        name: "Stomatal index",
        latex: "SI = \\frac{S}{E + S} \\times 100",
        symbols: [
          { sym: "S", meaning: "number of stomata per unit area" },
          { sym: "E", meaning: "number of epidermal cells per unit area" },
        ],
        when: "Comparing leaf surfaces; lower surfaces have the higher index in dicots.",
      },
    ],
    specialCases: [
      {
        title: "Sunflower and mustard placentation",
        condition: "Free central vs parietal",
        result: "\\text{Free central (Primrose)}; \\ \\text{Parietal (Mustard)}",
        why: "Ovules on a central column with no septa give free central; ovules on the ovary wall along septa give parietal.",
        askedIn: "Placentation identification questions.",
      },
      {
        title: "Monocot vs dicot root",
        condition: "Number of xylem bundles",
        result: "\\text{Monocot: polyarch (>6)}; \\ \\text{Dicot: 2–4 (tetrarch)}",
        why: "Counting xylem patches in the T.S. identifies the group instantly.",
      },
      {
        title: "Palisade vs spongy mesophyll position",
        condition: "Dorsiventral dicot leaf",
        result: "Palisade \\text{ adaxial (upper)}; \\ \\text{spongy abaxial}",
        why: "Palisade gets direct light; spongy tissue below allows gas diffusion.",
      },
      {
        title: "Inflorescence raceme vs cyme",
        condition: "Acropetal vs basipetal opening",
        result: "Raceme: \\text{oldest at base}; \\ Cyme: \\text{oldest at apex}",
        why: "Where the oldest flower sits decides the type and is the quick identification test.",
      },
    ],
    tricks: [
      {
        title: "One-line section identifier",
        how:
          "Radial bundles = root; conjoint bundles with cambium in a ring = dicot stem; scattered bundles = monocot stem.",
        example: "See scattered bundles → conclude monocot stem immediately.",
        saves: "~20 s",
      },
      {
        title: "Draw half-section for speed",
        how:
          "In a T.S., draw one half in detail and mirror it; show more tissue detail rather than a cramped full circle.",
        example: "Label epidermis, cortex, vascular bundle on the finished half.",
      },
      {
        title: "Floral formula as a checklist",
        how:
          "Write the formula first, then draw the flower to match it. It prevents missing whorls.",
        example: "Fabaceae: K(5), C5, A(9)+1, G1 — all five petals free, nine filaments fused.",
        saves: "~30 s",
      },
      {
        title: "Answer the 'why' with structure",
        how:
          "Link each anatomical feature to a function: cuticle → water loss reduction, air spaces → gas exchange.",
        example: "Stomata on lower surface: reduces transpiration because it is shaded and cooler.",
      },
    ],
    mistakes: [
      {
        wrong: "Labeling a monocot stem with a cambium ring.",
        right: "Monocot stems have scattered bundles and no cambium ring (they cannot thicken annually).",
        why: "Conflating the two stem types costs the identification mark.",
      },
      {
        wrong: "Drawing a root with collateral vascular bundles.",
        right: "Roots have radial bundles with xylem and phloem on separate radii.",
        why: "This is the definitive root-versus-stem test.",
      },
      {
        wrong: "Interchanging the calyx and corolla labels.",
        right: "Calyx is the outermost whorl of sepals, corolla the inner whorl of petals.",
        why: "Position, not colour, defines the whorls.",
      },
      {
        wrong: "Drawing a dicot leaf with isobilateral symmetry.",
        right: "Dicot leaves are dorsiventral (two distinguishable surfaces); monocots are isobilateral.",
        why: "Symmetry links directly to venation type.",
      },
    ],
  },

  {
    id: "human-systems-diagrams",
    title: "Human & Animal Systems Diagrams",
    classLevel: "class-12",
    blurb:
      "Heart, nephron, digestive system, respiratory system, neuron, eye/ear, and the reproductive systems with their exact label sets.",
    theory: [
      {
        heading: "Human heart — four chambers, valves, vessels",
        level: "basic",
        body:
          "Draw the four chambers with the right side deoxygenated (blue) and left side oxygenated (red). Label the vena cavae, pulmonary artery, pulmonary veins, aorta, bicuspid and tricuspid valves, semilunar valves and the septum. The left ventricle's thicker wall is the marks-carrying observation.",
      },
      {
        heading: "Nephron — the working unit",
        level: "standard",
        body:
          "A nephron diagram must show Bowman's capsule enclosing the glomerulus, the proximal convoluted tubule, the loop of Henle (descending and ascending limbs), the distal convoluted tubule and the collecting duct. Blood supply needs both the afferent and efferent arterioles plus the peritubular capillaries, because the loop of Henle's counter-current mechanism depends on them.",
        math: "\\text{Filtration} \\to \\text{Reabsorption} \\to \\text{Secretion} \\to \\text{Excretion}",
      },
      {
        heading: "Neuron and synapse",
        level: "pro",
        body:
          "A neuron diagram shows dendrites, cell body with nucleus, axon, myelin sheath with nodes of Ranvier, axon terminals with synaptic knobs. Current flows dendrite → cell body → axon → terminal. Impulse transmission is unidirectional because transmitter vesicles sit only in the presynaptic knob.",
      },
      {
        heading: "Reproductive systems",
        level: "pro",
        body:
          "The male system needs testes, epididymis, vas deferens, seminal vesicle, prostate, Cowper's glands, urethra and penis. The female system needs ovary, fallopian tube with fimbriae and infundibulum, uterus (with endometrium), cervix and vagina. In the female diagram, the site of fertilisation — the ampulla of the fallopian tube — must be clearly indicated.",
      },
    ],
    formulas: [
      {
        name: "Cardiac output",
        latex: "CO = HR \\times SV",
        symbols: [
          { sym: "CO", meaning: "cardiac output", unit: "L/min" },
          { sym: "HR", meaning: "heart rate", unit: "beats/min" },
          { sym: "SV", meaning: "stroke volume", unit: "mL" },
        ],
        when: "Standard calculation; normal ≈ 5 L/min at rest.",
      },
      {
        name: "Glomerular filtration rate",
        latex: "GFR = 125\\ \\text{mL/min} \\approx 180\\ \\text{L/day}",
        symbols: [{ sym: "GFR", meaning: "volume filtered per unit time" }],
        when: "Comparing filtered load with the ~1.5 L/day actually excreted (99% reabsorbed).",
      },
      {
        name: "Pulse pressure",
        latex: "PP = SBP - DBP",
        symbols: [
          { sym: "PP", meaning: "pulse pressure", unit: "mm Hg" },
          { sym: "SBP, DBP", meaning: "systolic and diastolic pressure" },
        ],
        when: "Interpreting blood-pressure readings; normal ≈ 40 mm Hg.",
      },
    ],
    specialCases: [
      {
        title: "Left ventricle wall thickness",
        condition: "Pulmonary vs systemic circuit",
        result: "\\text{Left wall } \\sim 3\\times \\text{ thicker}",
        why: "It must push blood through the entire body, not just to the lungs.",
        askedIn: "The 'why thicker' reasoning question.",
      },
      {
        title: "Site of maximum reabsorption",
        condition: "Along the nephron",
        result: "\\text{Proximal convoluted tubule (~70%)}",
        why: "It has microvilli and abundant mitochondria, matching its high transport demand.",
      },
      {
        title: "Loop of Henle length vs habitat",
        condition: "Desert vs aquatic mammal",
        result: "\\text{Desert: long loop} \\Rightarrow \\text{concentrated urine}",
        why: "A longer loop builds a stronger medullary gradient, saving more water.",
        askedIn: "Adaptation and osmoregulation questions.",
      },
      {
        title: "Oxygenated vs deoxygenated in the pulmonary artery",
        condition: "Naming exception",
        result: "\\text{Pulmonary artery carries deoxygenated blood}",
        why: "Arteries are defined by direction (away from the heart), not oxygen content — the classic exam trap.",
      },
    ],
    tricks: [
      {
        title: "Colour-code the heart immediately",
        how:
          "Blue for the right side, red for the left, then label. It prevents left/right label swaps.",
        example: "Right atrium receives vena cavae, left atrium receives pulmonary veins.",
        saves: "Prevents a whole set of wrong labels",
      },
      {
        title: "Follow the path, then label",
        how:
          "Trace blood flow in one continuous line from the body back to the body before naming anything.",
        example: "Body → vena cava → RA → RV → pulmonary artery → lungs → pulmonary vein → LA → LV → aorta.",
        saves: "~30 s",
      },
      {
        title: "Nephron parts in order",
        how:
          "Memorise the sequence as a sentence: Capsule, Proximal, Loop, Distal, Collecting (CPLDC).",
        example: "Label in that order and nothing is skipped.",
      },
      {
        title: "Arrow for direction",
        how:
          "Add blood-flow and filtrate-flow arrows; they carry marks and prove you understand direction, not just names.",
        example: "Afferent → glomerulus → efferent shows the pressure-maintaining constriction.",
      },
    ],
    mistakes: [
      {
        wrong: "Calling the pulmonary artery oxygenated because it is an artery.",
        right: "It carries deoxygenated blood to the lungs — arteries are defined by direction.",
        why: "The name describes anatomy, not gas content.",
      },
      {
        wrong: "Labeling the loop of Henle without its two limbs.",
        right: "Show descending and ascending limbs separately; water and salt move differently in each.",
        why: "The counter-current mechanism depends on the two limbs behaving oppositely.",
      },
      {
        wrong: "Drawing the nephron without a collecting duct.",
        right: "The collecting duct carries urine to the pelvis and concentrates it under ADH.",
        why: "Dropping it omits the site of hormonal control.",
      },
      {
        wrong: "Showing the myelin sheath as continuous.",
        right: "Draw the nodes of Ranvier between myelin segments.",
        why: "Saltatory conduction needs the gaps — a common structured-question point.",
      },
    ],
  },
];

/**
 * Rich biology figures — owner request 2026-11-22.
 *
 * The SVG figure set is great for classification-style diagrams (keys,
 * tables, flowcharts) but too shallow for the visual heart of biology.
 * This registry replaces those shallow figures with rich, detailed,
 * realistic illustrations — actual ultrastructure rendered the way a
 * museum wall chart or a modern textbook plate would show it — while the
 * caption carries the conceptual explanation.
 *
 * Conventions:
 *  • Assets live in `frontend/public/docs/figures/biology/` (served at
 *    `/docs/figures/biology/…`).
 *  • One entry per syllabus topic slug (exact match, same discipline as
 *    the SVG registry — guarded by the same tests).
 *  • An entry here REPLACES the SVG entry for that topic entirely.
 *  • Illustrations are generated artwork: no in-image text dependency —
 *    the caption and the topic's own labels carry the naming, so a
 *    garbled render can never teach something wrong.
 */

import type { TopicFiguresEntry } from "./registry";

export const RICH_FIGURES: Record<string, TopicFiguresEntry> = {
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r": {
    title: "Organelle ultrastructure — the powerhouse, the food factory and the protein line",
    figures: [
      {
        src: "/docs/figures/biology/organelle-ultrastructure.jpg",
        caption:
          "Three organelles in cutaway, drawn the way an electron micrograph plus a model kit would show them. Mitochondrion (left): a smooth outer membrane and an inner membrane folded into cristae — the folds pack in far more ATP-synthase surface than a flat sac could; the grainy matrix holds its own circular DNA and ribosomes, the reason mitochondria inherit only from the mother. Chloroplast (centre): a double envelope around stacked green thylakoid discs (grana) threaded by stroma lamellae; the stacks are the photosynthetic membranes where light is captured, and the stroma around them fixes CO₂ into sugar, storing it first as a starch granule. Rough endoplasmic reticulum and Golgi (right): ribosome-studded sheets where proteins are threaded and folded, feeding vesicles to the Golgi's stacked cisternae, which finish, tag and ship them. One theme runs through all three: membrane folds and stacks multiply working surface inside a fixed volume.",
        alt: "Detailed cutaway illustrations of a mitochondrion with cristae, a chloroplast with grana stacks and stroma, and rough endoplasmic reticulum with ribosomes leading to a Golgi apparatus with vesicles",
        keyword: "mitochondria",
      },
      {
        src: "/docs/figures/biology/chloroplast-grana-plate.jpg",
        caption:
          "The chloroplast opened up — the organelle that eats light. Slice through the oval body and you meet the same logic as the mitochondrion, run in reverse: a smooth double envelope encloses a fluid stroma, and inside it the working surface is multiplied into stacks. Each stack (a granum) is a pile of flat thylakoid discs, and the disc membranes are where the light reaction happens — chlorophyll packed into the membranes captures photons, splits water, releases the oxygen you see drifting as bubbles, and charges the cell's energy currencies ATP and NADPH. One stack is drawn pulled apart so you can see the coins separately; thin stroma lamellae tie the stacks together into one continuous membrane system. Around them, the stroma is the sugar factory: its enzymes run the Calvin cycle, fixing CO₂ into carbohydrate using that ATP and NADPH, and store the output first as the large pale starch granule. The small ring of circular DNA and the ribosome dots are the chloroplast's bacterial inheritance — like the mitochondrion, it was once a free-living cell.",
        alt: "Cutaway illustration of a chloroplast with double envelope, green stroma, stacks of thylakoid discs (grana) joined by lamellae, a pale starch granule, a circular DNA ring, golden light rays and oxygen bubbles",
        keyword: "chloroplast",
      },
    ],
    keepSvg: [
      // classification-style diagrams the raster plate does not supersede
      "plasma membrane", // fluid-mosaic model
      "cellulose", // cell-wall layers
      "diffusion", // membrane transport modes
      "microtubule", // cytoskeleton types
    ],
  },
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign": {
    title: "Mitosis under the microscope",
    figures: [
      {
        src: "/docs/figures/biology/mitosis-stages.jpg",
        caption:
          "Mitosis in five snapshots, left to right. Early prophase: chromatin condenses into visible X-shaped chromosomes (each still a duplicated sister-chromatid pair). Late prophase: the nuclear envelope breaks down and the spindle begins to reach for the chromosomes. Metaphase: chromosomes line up single file on the cell's equator. Anaphase: the spindle pulls the sister chromatids apart to opposite poles. Telophase: two nuclei reform around identical diploid chromosome sets and the cytoplasm divides. Because sister chromatids are exact copies, every daughter cell is genetically identical to the parent — the basis of growth, repair and asexual reproduction.",
        alt: "Row of five cells showing mitosis stages from early prophase through telophase, with condensed red and blue chromosomes and spindle fibers",
        keyword: "prophase",
      },
    ],
    keepSvg: [
      // classification-style diagrams the raster plate does not supersede
      "cell cycle", // cell-cycle wheel flowchart
      "meiosis", // meiosis-I stage strip
      "crossing over", // chiasma diagram
    ],
  },
  "mendels-laws-of-inheritance": {
    title: "From DNA to trait — what a gene really is",
    figures: [
      {
        src: "/docs/figures/biology/dna-double-helix.jpg",
        caption:
          "Mendel discovered the rules of inheritance without ever seeing the molecule — this is what his 'factors' turned out to be. On the left, DNA in its double helix: two twisting backbone ribbons wound around each other like a spiral ladder, every rung a base pair built from one of only four letters, and each letter pairing with exactly one partner (A with T, G with C) — the pairing rule is what lets DNA copy itself so faithfully. A gene is simply a stretch of those rungs — the glowing segment here — long enough to carry the recipe for one protein, and a protein is what makes a trait happen: the light beam runs from the gene to the flower it colours. Coil that filament further and further and you get the compact X-shaped chromosome on the right — the package in which DNA travels into every gamete. Mendel's alleles are just alternative versions of the same gene lying at the same spot on a pair of chromosomes: T and t are two spellings of one instruction, dominance decides which spelling gets read, and segregation is the fact that the two chromosomes of a pair part ways at gamete formation — the molecular truth behind every Punnett square.",
        alt: "Illustration of a blue DNA double helix with coloured base-pair rungs, a glowing gold gene segment, the helix condensed into an X-shaped chromosome, and a small flower representing the trait",
        keyword: "gene",
      },
    ],
  },
  "immune-system-and-immunity": {
    title: "The adaptive immune response — antibodies and their cells",
    figures: [
      {
        src: "/docs/figures/biology/immune-response.jpg",
        caption:
          "The third line of defense, drawn the way a molecular poster would stage it. At the centre is the antibody itself — an immunoglobulin protein shown as a ribbon model in gold and rust: two long heavy chains paired with two shorter light chains, folded so the molecule holds its arms open like a Y. Each arm's tip is the antigen-binding site, shaped to clamp exactly one epitope — the lock-and-key specificity every exam question turns on. Around it, the cells that make the system work. Left: a B lymphocyte, its ruffled surface studded with small Y-shaped receptors — membrane-bound antibodies; when one meets its matching antigen, the B cell multiplies and its clone pours out free antibodies like the small gold molecules floating here. Right: the T lymphocyte, smoother and smaller — it does not secrete antibodies; it kills infected body cells and coordinates the response. Above, the innate side: a large macrophage stretching pseudopod arms around a spiky virus particle, engulfing it by phagocytosis and presenting its fragments to the T cells — the hand-off between nonspecific and specific immunity. The tiny dots between cells are the chemical signals (cytokines) that keep the conversation going.",
        alt: "Illustration of an immune response: a large gold Y-shaped antibody ribbon model at centre, a lavender B lymphocyte studded with Y-shaped receptors, a green T lymphocyte, and a macrophage engulfing a red virus particle, with small free antibodies and signal dots between the cells",
        keyword: "innate",
      },
    ],
  },
  "food-chain-food-web-trophic-level-ecological-pyramids-productivity": {
    title: "A food web you can walk into",
    figures: [
      {
        src: "/docs/figures/biology/food-web-ecosystem.jpg",
        caption:
          "The trophic pyramid drawn as a place instead of a diagram. The sun is the ultimate energy source; the green layer of grasses and herbs are the producers, the only level that traps fresh sunlight into sugar. The grasshopper and the rabbit are primary consumers — herbivores cropping that layer — while the songbird snapping at an insect and the fox stalking through the grass are secondary consumers, and the hawk wheeling above is the top carnivore of this meadow. Below everyone, the cutaway soil is the level diagrams forget: earthworms, beetles and fungal threads are the decomposers, returning the dead leaf's carbon and nitrogen to the roots so the producers can start again. Notice what the scene makes visible that arrows cannot — energy enters once, at the leaves, and each step upward passes only about a tenth of it on, which is why hawks are rare and grass is everywhere.",
        alt: "Sunlit meadow food web scene with grasses and herbs, a grasshopper and rabbit feeding, a songbird, a fox and a hawk above, and a soil cutaway with earthworms, insects and fungi decomposing a leaf",
        keyword: "grazing",
      },
    ],
    keepSvg: [
      // every SVG here is classification-style — the plate supplements, not replaces
      "grazing", // food-chain types
      "trophic", // trophic-level positions + trophic cascade
      "pyramid", // three pyramids
      "inverted", // why pyramids invert
      "percent", // ten-percent law
      "NPP", // GPP/NPP equation
      "web", // food-web complexity
    ],
  },
  "life-and-its-origin-oparin-haldane-theory-miller-and-urey-s-experiment": {
    title: "Miller and Urey's spark in a bottle",
    figures: [
      {
        src: "/docs/figures/biology/miller-urey-apparatus.jpg",
        caption:
          "The 1953 experiment that turned the Oparin–Haldane soup from speculation into chemistry, drawn as a museum wall chart. Read it as a closed loop. The lower flask is the primeval ocean: warm water, gently boiled by the flame beneath. Its vapour climbs into the upper sphere — the primeval atmosphere — filled with methane, ammonia and hydrogen, the strongly reducing gas mix Oparin and Haldane had argued the young Earth breathed. There, the two electrodes fire a continuous spark: lightning, the energy source that breaks those stable little molecules apart and lets their atoms recombine. The products are swept on, cooled in the condenser, and rain back down through the U-trap into the ocean flask — a cycle that ran for a week. What Stanley Miller then found in that water was remarkable: glycine, alanine and other amino acids — the building blocks of proteins, made from nothing but a reducing atmosphere and a spark. The plate shows the plumbing stylised; the logic is what matters — ocean vaporises, atmosphere sparks, condensate returns, organics accumulate.",
        alt: "Illustration of the Miller-Urey apparatus: a heated round flask of pale blue liquid, glass tubing rising to a large sphere where two electrodes strike a bright violet spark, and a condenser loop returning amber-tinted condensate to the flask",
        keyword: "electric discharge",
      },
    ],
    keepSvg: [
      // classification-style diagrams the raster plate does not supersede
      "reducing atmosphere", // early-Earth conditions
      "hot dilute soup", // Oparin–Haldane flow
      "stromatolite", // origin grand timeline
      "oparin", // origin theories
      "methane", // reducing-atmosphere chemistry
      "first cell", // abiogenesis vs biogenesis
      "RNA", // RNA world hypothesis
      "coacervate", // coacervate/protobiont
      "amino acid", // yield chart
      "lightning", // energy sources
      "anaerobic", // first cells
    ],
  },
  "frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respirato": {
    title: "The frog heart — three chambers, two worlds of blood",
    figures: [
      {
        src: "/docs/figures/biology/frog-heart-circulation.jpg",
        caption:
          "The amphibian compromise, drawn the way a museum wall chart would show it. Two thin-walled atria sit side by side above one single thick muscular ventricle — the three-chambered plan that separates frogs from both fish (one atrium) and mammals (two ventricles). The pale sinus venosus collects oxygen-poor blood from the body and delivers it to the right atrium, while a lung vein brings fresh oxygen-rich blood to the left atrium; both empty into the same ventricle, where the blood mixes only partially — the spongy interior and the timing of contraction keep the two streams mostly apart, which is why frog organs still receive blood richer than the average. From the ventricle the conus arteriosus carries the mixed load out through the arterial arches fanning upward — toward the head, the body, and the pulmocutaneous route that doubles as a gill-for-land, feeding both the lungs and the moist skin where a third of the oxygen uptake actually happens. The colour coding tells the story: crimson for oxygen-rich, blue-violet for oxygen-poor, meeting in one muscular pump.",
        alt: "Illustration of a frog heart with two atria above a single muscular ventricle, a sinus venosus, and colour-coded red and blue vessel arches branching toward head, body, lung and skin",
        keyword: "ventricle",
      },
    ],
    keepSvg: [
      // classification-style diagrams the raster plate does not supersede
      "sinus venosus", // internal heart chambers
      "nucleated", // frog blood composition
      "pulmocutaneous", // circulation path map
      "buccopharyngeal", // respiration modes
      "portal", // portal systems
      "heart", // spleen + lymph hearts
      "cutaneous", // three respiration modes share
      "buccal", // buccal pump mechanism
      "oxygen", // cutaneous underwater respiration
    ],
  },
  "monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano": {
    title: "Inside a bacterial cell — the cutaway",
    figures: [
      {
        src: "/docs/figures/biology/bacterial-cell-cutaway.jpg",
        caption:
          "A rod-shaped bacterium opened up, drawn the way an electron micrograph plus a model kit would show it. From outside in: a sticky translucent capsule that dodges phagocytosis and drying, a rigid tan wall of peptidoglycan (thick and purple-staining in Gram-positive cells, thin with an outer membrane in Gram-negative ones), then a thin plasma membrane carrying the respiratory enzymes — bacteria have no mitochondria, so the membrane itself breathes. The cream cytoplasm is packed with the tiny dots of 70S ribosomes, the only organelle. In the centre sprawls the nucleoid: a tangled circle of naked DNA with no nuclear membrane around it — the defining prokaryote feature — accompanied by small independent plasmid rings that carry resistance genes and serve biotechnology as vectors. Hair-like pili bristle from the surface for attachment, and long rotating flagella, anchored by basal-body motors, drive the run-and-tumble search for food. Note what is missing: no nucleus, no ER, no Golgi, no plastids — everything eukaryotic cells compartmentalise, prokaryotes solve with one compartment and speed.",
        alt: "Cutaway illustration of a rod-shaped bacterium showing capsule, cell wall, plasma membrane, ribosome-dotted cytoplasm, tangled nucleoid DNA, red plasmid rings, pili and flagella with a basal anchor",
        keyword: "nucleoid",
      },
    ],
    keepSvg: [
      // classification-style diagrams the raster plate does not supersede
      "coccus", // bacterial shapes and arrangements
      "cyanobacteria", // nutrition-mode tree
      "growth curve", // batch growth curve
      "binary fission", // fission + recombination routes
      "gram", // Gram staining steps
      "flagella", // flagella arrangements
      "heterocyst", // cyanobacteria nitrogen workshop
      "curd", // useful bacteria
      "plasmid", // plasmid + mesosome extras
      "monera", // kingdom overview shelves
      "capsule", // capsule vs slime layer
      "growth", // growth conditions dials
      "antibiotic", // targets + overuse + resistance timeline
      "tuberculosis", // TB transmission cycle
    ],
  },
};

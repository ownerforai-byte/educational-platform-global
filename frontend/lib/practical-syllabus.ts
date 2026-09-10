/**
 * Practical (lab) syllabus for NEB (+2) — Biology, Physics, Chemistry.
 *
 * Every experiment is written in the standard NEB practical-record order:
 *   Aim → Requirement → Theory → Procedure → Observation → Calculation → Result → Precautions
 *
 * This module is intentionally separate from `syllabus.ts` (theory syllabus).
 */

export type PracticalExperiment = {
  title: string;
  /** The aim of the experiment (what is to be determined / studied). */
  aim: string;
  /** Apparatus / chemicals / reagents required. */
  requirement?: string[];
  /** The theory / principle / reactions behind the experiment. */
  theory?: string[];
  /** Step-by-step procedure. */
  procedure?: string[];
  /** What is observed, and the expected observations. */
  observation?: string[];
  /** Calculations, formulas and worked numerical example (omit if purely qualitative). */
  calculation?: string[];
  /** Final result / conclusion. */
  result?: string;
  /** Precautions to take during the experiment. */
  precautions?: string[];
  /** href to an interactive lab route if available. */
  labHref?: string;
};

export type PracticalUnit = {
  id: string;
  title: string;
  /** NEB class this unit belongs to. */
  grade: "class-11" | "class-12";
  experiments: PracticalExperiment[];
};

export type SubjectPracticalSyllabus = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  colorClass: string;
  units: PracticalUnit[];
};

export const PRACTICAL_SYLLABUS: SubjectPracticalSyllabus[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  BIOLOGY  (Botany + Zoology)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "biology",
    name: "Biology Practical",
    description:
      "NEB Class 11 & 12 Biology practical syllabus (Bio 301 & 302) — cell biology, floral diversity, genetics, ecology, human physiology and field work, written in the standard NEB practical-record format.",
    emoji: "🧫",
    colorClass: "from-emerald-500 to-teal-500",
    units: [
      // ── Grade 11 ─────────────────────────────────────────────────────────
      {
        id: "bio11-cell",
        title: "Cell Biology & Microscopy",
        grade: "class-11",
        experiments: [
          {
            title: "Preparation of a Temporary Mount of Onion Epidermis",
            aim: "To observe the structure of a plant cell under a light microscope.",
            requirement: [
              "Onion bulb (inner epidermis)",
              "Clean glass slide and cover slip",
              "Iodine solution (stain)",
              "Forceps",
              "Light microscope (10× and 40× objectives)",
            ],
            theory: [
              "A plant cell is bounded by a rigid cell wall and contains a distinct nucleus, cytoplasm and vacuoles.",
              "Iodine stains the nucleus and starch grains blue-black, making them clearly visible under the microscope.",
            ],
            procedure: [
              "Peel a thin layer of inner epidermis from an onion bulb using forceps.",
              "Place the peel on a clean slide and add one drop of iodine solution.",
              "Cover with a cover slip, avoiding air bubbles.",
              "Observe under the 10× objective, then switch to 40× for detail.",
              "Draw and label the observed cells (cell wall, nucleus, cytoplasm).",
            ],
            observation: [
              "Rectangular plant cells are seen in rows.",
              "The nucleus appears as a dark blue-black oval inside the cytoplasm.",
              "The cell wall is the outermost boundary of each cell.",
            ],
            result:
              "The rectangular plant cell with a distinct cell wall, nucleus and cytoplasm is clearly observed under 40× magnification.",
            precautions: [
              "Use only one drop of iodine — over-staining obscures cellular detail.",
              "Avoid air bubbles under the cover slip.",
              "Start at low power (10×) before switching to 40×.",
            ],
            labHref: "/lab/biology/bio-th-cell",
          },
          {
            title: "Observation of Human Cheek Cells (Animal Cell)",
            aim: "To compare the structure of an animal cell with a plant cell.",
            requirement: [
              "Sterile toothpick or cotton swab",
              "Normal saline (0.9 % NaCl)",
              "Methylene blue solution (stain)",
              "Glass slide and cover slip",
              "Light microscope (10× and 40×)",
            ],
            theory: [
              "Animal cells lack a cell wall and chloroplasts, unlike plant cells.",
              "Methylene blue stains the nucleus blue.",
              "Isotonic normal saline (0.9 % NaCl) prevents the cells from swelling or lysing.",
            ],
            procedure: [
              "Scrape the inner cheek gently with a sterile toothpick.",
              "Smear the sample on a clean slide.",
              "Add one drop of normal saline to keep the cells isotonic.",
              "Add one drop of methylene blue and cover with a cover slip.",
              "Observe under 10× and 40× magnification.",
              "Draw and label the cells.",
            ],
            observation: [
              "Irregularly shaped animal cells are visible.",
              "The nucleus is clearly stained blue and is central.",
              "No cell wall or chloroplasts are present.",
            ],
            result:
              "The animal cell has an irregular shape, a stained nucleus and no cell wall or chloroplast — confirming the key differences from a plant cell.",
            precautions: [
              "Use isotonic saline to prevent cell lysis.",
              "Do not press too hard with the cover slip.",
              "Keep the smear thin for clear focusing.",
            ],
            labHref: "/lab/biology/bio-th-cell",
          },
          {
            title: "Temporary Mount of a Pond Water Sample (Micro-organisms)",
            aim: "To identify protozoan / unicellular micro-organisms in pond water.",
            requirement: [
              "Fresh pond water sample",
              "Glass slide and cover slip",
              "Iodine (optional, for staining)",
              "Light microscope (10× and 40×)",
            ],
            theory: [
              "Pond water contains a variety of unicellular and multicellular micro-organisms, including Amoeba, Paramecium, Euglena and various algae.",
              "Each organism has a characteristic locomotion method: pseudopodia (Amoeba), cilia (Paramecium), flagellum (Euglena).",
            ],
            procedure: [
              "Collect a fresh pond water sample.",
              "Place a small drop on a clean slide.",
              "Cover with a cover slip (do not press hard — the organisms are alive and will move).",
              "Observe under 10× to locate moving organisms, then 40× for detail.",
              "Sketch and label the organisms identified.",
            ],
            observation: [
              "Amoeba shows irregular shape changes (pseudopodia movement).",
              "Paramecium has a slipper shape with cilia around its surface.",
              "Algae appear as small green, often spiral or chain-shaped structures.",
            ],
            result:
              "A variety of micro-organisms is observed and identified; their locomotion method and general morphology are noted.",
            precautions: [
              "Let the sample settle briefly so organisms are easier to track.",
              "Use a thin film to focus clearly at 40×.",
              "Label each identified species.",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
        ],
      },
      {
        id: "bio11-floral",
        title: "Floral Diversity & Taxonomy",
        grade: "class-11",
        experiments: [
          {
            title: "Taxonomic Identification of the Families Brassicaceae, Fabaceae, Solanaceae and Liliaceae",
            aim: "To key out the angiosperm families using floral characters.",
            requirement: [
              "Preserved flowers / herbarium sheets of each family",
              "Identification keys and taxonomy reference chart",
              "Hand lens / magnifying lens",
            ],
            theory: [
              "Angiosperm families are distinguished by the number, arrangement and structure of floral parts: sepals, petals, stamens and the gynoecium (superior or inferior ovary).",
              "Brassicaceae: 4 cruciform petals, 6 tetradynamous stamens, superior bicarpellate ovary.",
              "Fabaceae: 5 zygomorphic (papilionaceous) petals, 10 stamens (9 + 1), single superior carpel.",
              "Solanaceae: 5 fused petals, 5 stamens, superior bicarpellate ovary.",
              "Liliaceae: 6 tepals in 2 whorls, 6 stamens, superior tricarpellate syncarpous ovary.",
            ],
            procedure: [
              "Examine the sepals, petals, stamens and gynoecium of each specimen.",
              "Count the floral parts and note the symmetry (actinomorphic vs zygomorphic).",
              "Match the characters against the family key.",
              "Record the distinguishing features of each family.",
            ],
            observation: [
              "Brassicaceae: 4 petals in a cross shape; 6 stamens (4 long + 2 short).",
              "Fabaceae: 5 zygomorphic petals (banner + 2 wings + 2 keel); 10 stamens fused (9 + 1).",
              "Solanaceae: 5 fused petals; 5 stamens; bicarpellate superior ovary.",
              "Liliaceae: 6 free tepals; 6 stamens; tricarpellate syncarpous ovary.",
            ],
            result:
              "Each family is identified and its diagnostic floral characters are written down correctly.",
            precautions: [
              "Use the key in a specific sequence — do not skip steps.",
              "Handle herbarium specimens with care.",
            ],
            labHref: "/lab/biology/bio-th-plant",
          },
        ],
      },
      {
        id: "bio11-ecology",
        title: "Ecology & Field Work",
        grade: "class-11",
        experiments: [
          {
            title: "Study of a Simple Ecosystem (Pond / Aquatic System)",
            aim: "To identify producers, consumers and decomposers in a pond ecosystem and draw a food web.",
            requirement: [
              "Pond water sample (with aquatic organisms)",
              "Magnifying lens",
              "Food-web drawing sheet",
              "Observation notebook",
            ],
            theory: [
              "An ecosystem consists of biotic (living) and abiotic (non-living) components that interact through energy flow and nutrient cycling.",
              "Producers (algae, phytoplankton) fix energy via photosynthesis.",
              "Primary consumers (zooplankton, small insects) eat producers; secondary consumers (small fish) eat primary consumers.",
              "Decomposers (bacteria, fungi) break down dead organic matter and return nutrients to the soil and water.",
            ],
            procedure: [
              "Collect a pond water sample.",
              "Observe algae and other producers under a magnifying lens.",
              "Note aquatic insects, protozoa and other consumers present.",
              "Identify decomposers (bacteria, fungi) in the sample.",
              "Draw a food web showing the trophic levels.",
            ],
            observation: [
              "Algae and phytoplankton are visible as green particles.",
              "Small zooplankton and aquatic insects are observed.",
              "Fungi or decaying organic matter is noted at the bottom of the sample.",
            ],
            result:
              "A food web is drawn showing energy flow from producers to top consumers and recyclers; trophic levels are labelled.",
            precautions: [
              "Label each trophic level clearly on the food web.",
              "Collect the sample from a clean, stable pond to avoid contamination bias.",
            ],
            labHref: "/lab/biology/bio-th-ecology",
          },
        ],
      },
      // ── Grade 12 ─────────────────────────────────────────────────────────
      {
        id: "bio12-anatomy",
        title: "Botany & Plant Anatomy (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Study of T.S. of Dicot and Monocot Roots and Stems (Primary)",
            aim: "To compare the internal anatomy of dicot and monocot roots and stems from permanent T.S. slides.",
            requirement: [
              "Permanent T.S. slides of dicot & monocot roots and stems",
              "Light microscope (10× and 40×)",
              "Reference anatomy diagrams",
            ],
            theory: [
              "Dicot root: large central stele with metaxylem forming a star-shaped pattern; no pith; Cambium present.",
              "Monocot root: distinct central pith (hadrocentric); Cambium present but not continuous.",
              "Dicot stem: vascular bundles arranged in a ring; well-defined Cambium; distinct cortex and pith.",
              "Monocot stem: vascular bundles scattered throughout the ground tissue; no continuous Cambium; no distinct cortex/pith boundary.",
            ],
            procedure: [
              "Examine the dicot root T.S. and note the central stele and radial vascular bundles.",
              "Examine the monocot root T.S. and note the central pith.",
              "Examine the dicot stem T.S. and note the ring of vascular bundles.",
              "Examine the monocot stem T.S. and note the scattered vascular bundles.",
              "Draw and label the key differences.",
            ],
            observation: [
              "Dicot root shows a star-shaped xylem with no central pith.",
              "Monocot root shows a distinct central pith.",
              "Dicot stem shows vascular bundles in a ring with a Cambium layer.",
              "Monocot stem shows scattered vascular bundles throughout the ground tissue.",
            ],
            result:
              "The distinct anatomical differences between dicot and monocot roots and stems are identified and drawn.",
            precautions: [
              "Focus carefully at 40× to distinguish Cambium layers.",
              "Do not confuse monocot stem's scattered bundles with an artifact.",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
          {
            title: "Temporary Mount of Onion Root Tip to Study Mitosis",
            aim: "To observe the different stages of mitosis in dividing plant cells.",
            requirement: [
              "Growing onion root tips (1–2 cm, grown in water for 24 h)",
              "Acetocarmine or orcein stain",
              "Cresol violet (optional)",
              "Slide, cover slip, forceps",
              "Light microscope (10× and 40×)",
            ],
            theory: [
              "Mitosis consists of five visible stages: Interphase, Prophase, Metaphase, Anaphase and Telophase.",
              "In the root-tip meristem, cells are actively dividing, making the stages easy to find.",
              "Stain (acetocarmine/orcein) makes chromosomes dark against a pale background.",
            ],
            procedure: [
              "Fix the onion root tips in fixative for a short time.",
              "Hydrolyse and stain the tips with acetocarmine/orcein.",
              "Squash the tip on a slide between the cover slip to spread the cells.",
              "Scan under 10× to locate the region of active division, then 40×.",
              "Identify and draw cells in each of the five mitotic stages.",
            ],
            observation: [
              "Interphase: nucleus is intact, chromatin is diffuse.",
              "Prophase: chromosomes become visible and condensed.",
              "Metaphase: chromosomes align at the cell equator.",
              "Anaphase: sister chromatids separate and move to opposite poles.",
              "Telophase: two new nuclei form; the cell plate begins to appear.",
            ],
            result:
              "The five stages of mitosis are identified, drawn and labelled.",
            precautions: [
              "Metaphase cells are the easiest to draw — use them for the main figure.",
              "Avoid crushing the cells too hard; the chromosomes will become invisible.",
              "Use fresh, actively growing root tips (1–2 cm from the tip).",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
        ],
      },
      {
        id: "bio12-physiology",
        title: "Plant Physiology (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Study of Osmosis by Potato Osmometer",
            aim: "To demonstrate osmosis using potato pieces in solutions of different concentrations.",
            requirement: [
              "Potato (bored to form a cylinder)",
              "Cork with delivery tube filled with coloured solution",
              "Solutions of different concentrations (or graded NaCl / sugar solutions)",
              "Beakers, water, graph paper",
            ],
            theory: [
              "Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential through a semi-permeable membrane.",
              "The potato cylinder acts as a semi-permeable membrane. When placed in a dilute solution, water enters the cylinder and the coloured liquid rises in the delivery tube. In a concentrated solution, water leaves and the level falls.",
            ],
            procedure: [
              "Fit a bored potato cylinder with a cork carrying a delivery tube filled with coloured solution.",
              "Place the potato in the test solution so the open end is immersed.",
              "Observe the movement of the coloured liquid up or down the tube over a set time.",
              "Repeat in solutions of increasing concentration and plot the results.",
            ],
            observation: [
              "In a dilute solution the coloured liquid rises up the delivery tube.",
              "In a concentrated solution the liquid falls.",
              "The height of the liquid changes with the concentration of the solution.",
            ],
            result:
              "Osmosis is demonstrated: the change in liquid height in the tube is a relative measure of the solute concentration of the solution.",
            precautions: [
              "Ensure no leaks at the cork–potato interface.",
              "Use the same potato variety and the same time interval for all concentrations.",
            ],
            labHref: "/lab/biology/bio-calc-photosynthesis",
          },
          {
            title: "Study of Plasmolysis in Epidermal Peels (e.g. Rhoeo leaves)",
            aim: "To observe plasmolysis and de-plasmolysis in coloured epidermal cells.",
            requirement: [
              "Rhoeo discolor / onion epidermal peel",
              "Strong NaCl or sugar solution",
              "Distilled water",
              "Slides and cover slips",
              "Light microscope (10× and 40×)",
            ],
            theory: [
              "Plasmolysis occurs when the external solution has a lower water potential than the cell sap, so water leaves the cell and the living protoplast shrinks away from the rigid cell wall.",
              "In distilled water the process reverses — de-plasmolysis.",
            ],
            procedure: [
              "Prepare a temporary mount of the coloured epidermis in water and note the normal cell.",
              "Add a strong NaCl / sugar solution to the mount at one end of the cover slip.",
              "Observe the cell under the microscope as the protoplast shrinks.",
              "Then add water to the mount and observe de-plasmolysis.",
            ],
            observation: [
              "In the strong solution the protoplast pulls away from the cell wall (plasmolysis).",
              "The vacuole shrinks and the cytoplasm becomes thinner against the wall.",
              "On adding water, the protoplast re-expands and returns to its original shape.",
            ],
            result:
              "Plasmolysis and de-plasmolysis are observed, confirming that the protoplast is osmotically active and the cell wall is rigid.",
            precautions: [
              "Use a thin epidermal peel to avoid overlapping cells.",
              "Avoid over-staining or using too strong a solution — cells may die.",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
          {
            title: "Study of the Rate of Respiration in Germinating Seeds",
            aim: "To show that respiration in germinating seeds releases heat and CO₂.",
            requirement: [
              "Germinating seeds (moistened and kept for 48 h)",
              "Two identical flasks / thermometers",
              "Limewater",
              "Graph paper",
            ],
            theory: [
              "Respiration is the oxidation of food (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy).",
              "Energy released is partly lost as heat; CO₂ is a gaseous product.",
              "Limewater (Ca(OH)₂ solution) turns milky in the presence of CO₂: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O.",
            ],
            procedure: [
              "Place germinating seeds in one flask and a non-germinating control in another.",
              "Fit each with a thermometer; record the temperature at regular intervals.",
              "Pipe the air from the germinating seeds through limewater to test for CO₂.",
              "Compare the temperature rise and limewater change between the two flasks.",
            ],
            observation: [
              "The germinating seeds show a temperature rise over time.",
              "Limewater turns milky when the air from germinating seeds is passed through it.",
              "The non-germinating control shows little temperature change and no limewater reaction.",
            ],
            result:
              "Germinating seeds produce heat and CO₂, confirming active respiration; the control confirms the difference is due to active respiration.",
            precautions: [
              "Keep the two flasks identical in size and initial temperature.",
              "Use the same number of seeds in both flasks.",
            ],
            labHref: "/lab/biology/bio-calc-photosynthesis",
          },
        ],
      },
      {
        id: "bio12-genetics",
        title: "Genetics (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Study of Mendelian Inheritance Using Seeds of Different Colours / Sizes",
            aim: "To observe dominant and recessive traits in the F₂ generation and illustrate Mendel's Law of Segregation.",
            requirement: [
              "Mendel pea seeds of contrasting colours / sizes (or F₁ and F₂ data set)",
              "Data table",
              "Punnett square sheet",
            ],
            theory: [
              "Mendel's Law of Segregation: the two alleles of a gene separate equally during gamete formation, so each gamete carries only one allele.",
              "For a monohybrid cross Tt × Tt, the expected F₂ genotypes are 1 TT : 2 Tt : 1 tt, giving a 3:1 phenotypic ratio.",
            ],
            procedure: [
              "Note the contrasting traits in the seeds (round vs wrinkled, yellow vs green).",
              "Record the proportion of each phenotype in the F₂ data set.",
              "Work out the expected 3:1 ratio for a monohybrid cross.",
              "Compare observed vs expected ratios.",
            ],
            observation: [
              "The F₂ generation shows approximately 3 dominant : 1 recessive for each trait.",
              "The observed ratio is close to the expected Mendelian ratio.",
            ],
            result:
              "Mendel's Law of Segregation is illustrated: the F₂ generation shows a 3:1 dominant:recessive phenotypic ratio.",
            precautions: [
              "Use a large enough sample to reduce chance deviation from 3:1.",
              "Record both observed and expected values for comparison.",
            ],
            labHref: "/lab/biology/bio-calc-punnett",
          },
        ],
      },
      {
        id: "bio12-embryology",
        title: "Embryology & Biotechnology (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Study of Imbibition in Seeds / Raisins",
            aim: "To demonstrate water uptake by dry seeds through imbibition.",
            requirement: [
              "Dry seeds / raisins (known initial mass)",
              "Two beakers",
              "Water",
              "Weighing balance and ruler",
            ],
            theory: [
              "Imbibition is the absorption of water by solid colloids (dry seeds, raisins) by diffusion and adsorption, without forming a true solution.",
              "The uptake of water causes the seeds to swell and their mass to increase.",
            ],
            procedure: [
              "Weigh a known number of dry seeds / raisins and record the mass.",
              "Place them in a beaker of water for several hours (or overnight).",
              "Afterwards, weigh and measure the seeds / raisins again.",
              "Compare the mass / size before and after.",
            ],
            observation: [
              "The seeds / raisins swell noticeably after soaking.",
              "The mass increases compared to the initial dry mass.",
            ],
            result:
              "Imbibition is demonstrated: the seeds / raisins absorb water, swell and increase in mass.",
            precautions: [
              "Ensure the seeds are truly dry before the initial weighing.",
              "Blot the seeds lightly before the post-soak weighing to remove surface water.",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
          {
            title: "Preparation of Bio-fertilizer (e.g. from Rhizobium) and a Note on Its Significance",
            aim: "To prepare a simple Rhizobium bio-fertilizer culture and discuss its agricultural significance.",
            requirement: [
              "Rhizobium culture (or a commercial inoculum)",
              "Saturated water (inoculum carrier)",
              "Carrier medium (peat moss / charcoal)",
              "Legume seeds / crops",
            ],
            theory: [
              "Rhizobium bacteria in the root nodules of legumes fix atmospheric N₂ into ammonium, which is usable by the plant.",
              "This is a biological alternative to chemical nitrogen fertilizer, reducing environmental damage.",
            ],
            procedure: [
              "Grow or dilute the Rhizobium culture to a usable inoculum.",
              "Mix with a carrier medium to form a paste.",
              "Inoculate legume seeds / soil with the preparation.",
              "Write up the advantage of bio-fertilizer over chemical nitrogen.",
            ],
            observation: [
              "Inoculated legumes show root nodules on the roots after a few weeks.",
              "The nodules are sites of active nitrogen fixation.",
            ],
            result:
              "A bio-fertilizer preparation is made; its advantage (cheap, environmentally safe nitrogen source) is stated.",
            precautions: [
              "Handle the culture with care; wash hands after use.",
              "Store the bio-fertilizer in a cool, shaded place to keep the bacteria viable.",
            ],
            labHref: "/lab/biology/bio-th-ecology",
          },
        ],
      },
      {
        id: "bio12-animals",
        title: "Animal Tissues & Development (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Study of Animal Tissues (Squamous Epithelium, Muscle Fibres, Blood Smear)",
            aim: "To identify the four tissue types from prepared permanent slides.",
            requirement: [
              "Permanent slides: squamous epithelium, skeletal muscle, mammalian blood smear",
              "Light microscope (10× and 40×)",
              "Reference tissue diagrams",
            ],
            theory: [
              "Animal tissue types: epithelial (lining), connective (support), muscular (movement), nervous (conduction).",
              "Squamous epithelium: thin layer of flat, scale-like cells.",
              "Skeletal muscle: long, cylindrical, striated fibres.",
              "Blood: RBCs are round, biconcave, non-nucleated; WBCs are larger and nucleated; platelets are small fragments.",
            ],
            procedure: [
              "Examine the squamous epithelium slide; note the flat, scale-like cells.",
              "Examine the muscle slide; distinguish the striated skeletal muscle fibres.",
              "Examine the blood smear; identify RBCs, WBCs and platelets.",
              "Draw and label what is observed.",
            ],
            observation: [
              "Squamous epithelium appears as a thin sheet of flat cells.",
              "Skeletal muscle fibres are long and show cross-striations.",
              "RBCs are round, pale, and non-nucleated; WBCs are larger and nucleated; platelets are small.",
            ],
            result:
              "The three tissue types are identified and their characteristic shapes are drawn and labelled.",
            precautions: [
              "Label each structure before drawing — it is easier to identify at 40×.",
              "Do not confuse RBCs with platelets (RBCs are much larger).",
            ],
            labHref: "/lab/biology/bio-3d-human",
          },
          {
            title: "Study of Mitosis in Grasshopper Testis (Permanent Slide)",
            aim: "To observe the stages of mitosis in an animal cell and compare with plant mitosis.",
            requirement: [
              "Grasshopper testis permanent slide",
              "Light microscope (10× and 40×)",
              "Reference mitosis diagram",
            ],
            theory: [
              "Mitosis in animal cells shows the same five stages as in plant cells.",
              "The key difference is the absence of a cell wall — the animal cell rounds up during division instead of forming a cell plate.",
            ],
            procedure: [
              "Scan the slide under 10× to locate dividing cells, then switch to 40×.",
              "Find cells in prophase, metaphase, anaphase and telophase.",
              "Compare with the onion root-tip mitosis mount.",
              "Draw the stages observed.",
            ],
            observation: [
              "Animal cells show the same chromosome behaviour as plant cells.",
              "The cell rounds up (no cell wall) and divides by cytokinesis (membrane pinching).",
            ],
            result:
              "Animal mitosis is identified and compared with plant mitosis; the absence of a cell wall is noted.",
            precautions: [
              "Look for metaphase cells first — the chromosomes are most distinct.",
              "Label each stage clearly.",
            ],
            labHref: "/lab/biology/bio-3d-cell",
          },
          {
            title: "Study of Frog Developmental Stages (Fertilized Egg, Cleavage, Blastula, Gastrula)",
            aim: "To observe early embryonic development in the frog from permanent slides.",
            requirement: [
              "Permanent slides of frog developmental stages",
              "Light microscope (10× and 40×)",
              "Reference developmental diagram",
            ],
            theory: [
              "Frog development: Zygote → Cleavage (morula) → Blastula (with blastocoel cavity) → Gastrula (3 germ layers).",
              "Gastrulation is the key event: invagination forms the three germ layers — ectoderm, mesoderm and endoderm.",
            ],
            procedure: [
              "Examine the fertilized egg (zygote) slide.",
              "Examine the cleavage (morula) slide.",
              "Examine the blastula slide — note the hollow blastocoel cavity.",
              "Examine the gastrula slide and identify the three germ layers.",
            ],
            observation: [
              "Zygote: single large cell with a visible nucleus.",
              "Morula: solid ball of cells.",
              "Blastula: hollow ball with a blastocoel cavity.",
              "Gastrula: invagination (archenteron) and three distinct germ layers.",
            ],
            result:
              "The successive developmental stages are identified in the correct order: zygote → cleavage → blastula → gastrula.",
            precautions: [
              "Memorise the order of the stages.",
              "Draw the gastrula with all three germ layers labelled.",
            ],
            labHref: "/lab/biology/bio-3d-evolution",
          },
        ],
      },
      {
        id: "bio12-human",
        title: "Human Biology & Biochemistry Tests (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Detect the Presence of Starch in a Given Sample",
            aim: "To test a sample for the presence of starch using iodine solution.",
            requirement: [
              "Sample (e.g. potato, rice flour)",
              "Iodine solution",
              "Distilled water",
              "Test tubes",
            ],
            theory: [
              "Starch contains amylose, a linear polymer of glucose. Amylose forms a blue-black inclusion complex with iodine.",
              "A blue-black colour is positive for starch; no colour change is negative.",
            ],
            procedure: [
              "Prepare a paste or solution of the sample in distilled water.",
              "Add a few drops of iodine solution to the test tube.",
              "Observe the colour change.",
              "Run a water-only control alongside.",
            ],
            observation: [
              "A blue-black colour appears in the sample tube if starch is present.",
              "The control (water) shows only the brown-amber colour of iodine.",
            ],
            result:
              "A blue-black colour confirms the presence of starch in the sample.",
            precautions: [
              "Add iodine drop by drop; too much may obscure the colour change.",
              "Always run a water-only control.",
            ],
            labHref: "/lab/biology/bio-calc-photosynthesis",
          },
          {
            title: "Detect the Presence of Protein in a Given Sample (Biuret Test)",
            aim: "To test a sample for protein using Biuret reagent.",
            requirement: [
              "Sample (e.g. egg white, milk)",
              "Biuret reagent (CuSO₄ + NaOH)",
              "Test tubes",
            ],
            theory: [
              "Biuret reagent (Cu²⁺ in alkaline solution) reacts with the peptide bonds in proteins to form a purple/violet complex.",
              "A purple/violet colour is positive; a blue colour (colour of CuSO₄) is negative.",
            ],
            procedure: [
              "Add the sample (or dilute egg white / milk) to a test tube.",
              "Add Biuret reagent and mix well.",
              "Observe the colour change.",
              "Run a water-only control alongside.",
            ],
            observation: [
              "A purple or violet colour appears in the sample tube if protein is present.",
              "The control stays blue.",
            ],
            result:
              "A purple/violet colour confirms the presence of protein in the sample.",
            precautions: [
              "Dilute the sample (e.g. 1:10 egg white) to avoid a too-dark colour.",
              "Do not confuse the Biuret reagent with Benedict's reagent (different test).",
            ],
            labHref: "/lab/biology/bio-calc-photosynthesis",
          },
          {
            title: "Effect of Temperature and pH on the Activity of Salivary Amylase",
            aim: "To show that salivary amylase works optimally at body temperature and near-neutral pH.",
            requirement: [
              "Saliva (or amylase solution)",
              "Starch solution",
              "Iodine solution",
              "Water baths at various temperatures (0 °C, room, 37 °C, 100 °C)",
              "Buffer solutions (acidic and alkaline)",
            ],
            theory: [
              "Amylase is an enzyme that breaks down starch into maltose.",
              "Enzymes have an optimal temperature (~37 °C) and optimal pH (near-neutral for amylase).",
              "At extreme temperatures the enzyme denatures and loses its active site shape; the reaction stops.",
            ],
            procedure: [
              "Mix saliva with starch solution and incubate at different temperatures / pH in water baths.",
              "At intervals, take a drop of the mixture and add it to iodine.",
              "Note when the starch has been completely digested (no blue-black colour).",
              "Compare the time taken at different conditions.",
            ],
            observation: [
              "Starch disappears fastest at ~37 °C and near-neutral pH.",
              "At high temperature (100 °C) and extreme pH, starch persists longer — the enzyme is denatured.",
            ],
            result:
              "Amylase is most active at body temperature (~37 °C) and near-neutral pH; the time until the blue-black colour disappears is a measure of the rate of digestion.",
            precautions: [
              "Use the same amount of saliva and starch in each tube.",
              "Check each sample at the same time intervals.",
            ],
            labHref: "/lab/biology/bio-calc-photosynthesis",
          },
          {
            title: "Detect the Presence of Sugar in Human Blood (Benedict's Test)",
            aim: "To test a blood sample for reducing sugar (glucose) using Benedict's reagent.",
            requirement: [
              "Blood or diluted sample",
              "Benedict's reagent (CuSO₄ + citrate + Na₂CO₃)",
              "Water bath",
              "Test tubes",
            ],
            theory: [
              "Benedict's reagent (blue Cu²⁺ in alkaline solution) is reduced by glucose (a reducing sugar) to a green/yellow/brick-red precipitate of Cu₂O.",
              "The colour depends on the sugar concentration: green (low) → yellow → brick-red (high).",
            ],
            procedure: [
              "Add the blood / diluted sample to a test tube.",
              "Add Benedict's reagent (equal volume).",
              "Warm the tube in a water bath for a few minutes.",
              "Observe the colour / precipitate.",
            ],
            observation: [
              "A green to brick-red precipitate indicates reducing sugar (glucose) is present.",
              "A blue colour (no precipitate) indicates no reducing sugar.",
            ],
            result:
              "A brick-red precipitate confirms the presence of glucose in the blood sample.",
            precautions: [
              "Do not boil directly — use a water bath.",
              "Keep the sample concentration low enough to get a clear colour distinction.",
            ],
            labHref: "/lab/biology/bio-3d-human",
          },
          {
            title: "Study of the Human Skeleton and Different Types of Joints",
            aim: "To identify the main bones of the human skeleton and classify the types of joints.",
            requirement: [
              "Human skeleton model (or 3D model)",
              "Joints model (optional)",
              "Diagram of the human skeleton",
            ],
            theory: [
              "The human skeleton has 206 bones divided into the axial skeleton (skull, spine, ribs, sternum) and the appendicular skeleton (limb girdles and limbs).",
              "Joints are classified as: fixed (suture), hinge, pivot, ball-and-socket, gliding and saddle.",
            ],
            procedure: [
              "Point out the divisions of the skeleton: skull, spine, ribs, limb girdles.",
              "Classify each joint type: fixed, hinge, pivot, ball-and-socket, gliding.",
              "Match each joint type to a body region.",
            ],
            observation: [
              "Ball-and-socket joints (shoulder, hip) allow the greatest range of motion.",
              "Hinge joints (knee, elbow) move in one plane.",
              "Pivot joints (neck — atlas/axis) allow rotation.",
            ],
            result:
              "The main bones are identified and the joint types are listed with examples.",
            precautions: [
              "Use the 3D model to visualise joint movement in three dimensions.",
              "Label each joint type clearly on the diagram.",
            ],
            labHref: "/lab/biology/bio-3d-human",
          },
        ],
      },
      {
        id: "bio12-field",
        title: "Field Work & Project (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Sample Project — Survey on Local Communicable Diseases",
            aim: "To investigate common communicable diseases in a local area and their prevention measures.",
            requirement: [
              "Survey questionnaire",
              "Reference on diseases (e.g. typhoid, TB, cholera)",
              "Notebook and pen",
            ],
            theory: [
              "Communicable diseases are caused by pathogenic micro-organisms and are spread from one person to another.",
              "Prevention strategies include clean water supply, vaccination, and personal hygiene.",
            ],
            procedure: [
              "Prepare a short questionnaire on local disease occurrence.",
              "Collect responses from a small sample (households / students).",
              "Identify causes and prevention measures for each disease.",
              "Write up a report with aims, method, results and conclusion.",
            ],
            observation: [
              "The most common diseases in the sample are recorded (e.g. diarrhoea, cough, fever).",
              "Prevention measures are noted for each disease.",
            ],
            result:
              "A short report listing the diseases, their causes and prevention measures is completed.",
            precautions: [
              "Keep the questionnaire short to get more responses.",
              "Record data honestly; do not make up results.",
            ],
            labHref: "/lab/biology/bio-3d-ecology",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  PHYSICS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "physics",
    name: "Physics Practical",
    description:
      "NEB Class 11 & 12 Physics practical syllabus (Phy 101 & 102) — mechanics, heat determinations, electricity, waves & optics experiments, written in the standard NEB practical-record format.",
    emoji: "⚗️",
    colorClass: "from-sky-500 to-blue-500",
    units: [
      // ── Grade 11 ─────────────────────────────────────────────────────────
      {
        id: "phy11-measure",
        title: "Measurement & Mechanics",
        grade: "class-11",
        experiments: [
          {
            title: "Measurement of Length Using a Vernier Caliper and Screw Gauge",
            aim: "To measure small lengths accurately and find the least count of each instrument.",
            requirement: [
              "Vernier calipers (0.1 mm least count)",
              "Screw gauge / micrometer (0.01 mm least count)",
              "Given object / thin sheet",
              "Scale (metre rule)",
            ],
            theory: [
              "Vernier calipers: reading = main scale reading + (vernier coincidence × least count).",
              "Screw gauge: reading = main scale reading + (circular scale reading × least count).",
              "All measurements must be recorded to the least count of the instrument.",
            ],
            procedure: [
              "Find the least count of the vernier calipers (main scale ÷ number of vernier divisions).",
              "Measure the external diameter of the object at five positions and average.",
              "Find the least count of the screw gauge.",
              "Measure the thickness of a thin sheet and average five readings.",
            ],
            observation: [
              "Five readings are taken at different positions for each object.",
              "The average values are recorded to the correct number of significant figures.",
            ],
            calculation: [
              "Example (caliper, LC = 0.01 cm): main scale = 2.3 cm + vernier coincidence 0.6 × 0.01 cm = 2.36 cm.",
              "Average of 5 readings = (sum of readings) / 5.",
            ],
            result:
              "The object is measured to the correct significant figures using both instruments; the least count of each is stated.",
            precautions: [
              "Check for zero error before each measurement.",
              "Take readings at the same orientation for each measurement.",
              "Record all values to the least count of the instrument.",
            ],
            labHref: "/lab/physics/ph-3d-advanced",
          },
          {
            title: "Determination of g Using a Simple Pendulum",
            aim: "To determine the acceleration due to gravity (g) from the period of a simple pendulum using a graphical method.",
            requirement: [
              "Simple pendulum (bob + thread)",
              "Stopwatch (0.01 s resolution)",
              "Metre scale",
              "Graph paper",
            ],
            theory: [
              "For a simple pendulum, the period is T = 2π √(L / g).",
              "Rearranging: T² = (4π² / g) · L. This is the equation of a straight line y = mx where y = T², x = L and slope m = 4π² / g.",
              "Therefore g = 4π² / slope.",
            ],
            procedure: [
              "Suspend a small, dense bob with a thread of about 1 m length.",
              "Displace the bob with a small amplitude (< 10°) and release.",
              "Measure the time for 20 oscillations using a stopwatch.",
              "Change the length and repeat for 5 different lengths (40 cm to 100 cm).",
              "Plot L on the y-axis and T² on the x-axis.",
              "Find the slope of the straight line.",
            ],
            observation: [
              "A table of L, T (20 oscillations), and T² (per oscillation) is recorded.",
              "The L vs T² graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: if L = 1.00 m gives T = 2.01 s, then T² = 4.04 s².",
              "Slope = L / T² = 1.00 / 4.04 ≈ 0.248 m/s².",
              "g = 4π² / 0.248 ≈ 39.47 / 0.248 ≈ 9.8 m/s².",
            ],
            result:
              "g is determined to be approximately 9.8 m/s², matching the standard value at sea level.",
            precautions: [
              "Use a small amplitude so the period is independent of amplitude.",
              "Take the average of at least 20 oscillations to reduce stopwatch error.",
              "Ensure the bob is small and dense to minimize air resistance.",
            ],
            labHref: "/lab/physics/ph-3d-pendulum",
          },
          {
            title: "Verification of the Principle of Moments (Scales / Beam Balance)",
            aim: "To verify that in equilibrium the sum of clockwise moments equals the sum of anticlockwise moments.",
            requirement: [
              "Metre scale balanced on a knife-edge support",
              "Weights of known mass",
              "Clamps / string for suspension",
            ],
            theory: [
              "The principle of moments: for a body in rotational equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments about that point.",
              "Moment of a force = force × perpendicular distance from the pivot.",
            ],
            procedure: [
              "Balance the metre rule on a knife-edge support at its centre.",
              "Suspend two weights on opposite sides at chosen distances from the pivot.",
              "Adjust the distances until the rule is in equilibrium.",
              "Record the forces and distances on each side.",
              "Show numerically that F₁ × d₁ = F₂ × d₂.",
            ],
            observation: [
              "The rule is in horizontal equilibrium when the moments are balanced.",
              "The products F₁d₁ and F₂d₂ are equal (within experimental error).",
            ],
            result:
              "The principle of moments is verified: the clockwise moment equals the anticlockwise moment.",
            precautions: [
              "Ensure the rule is balanced (horizontal) before taking readings.",
              "Use small weights to reduce the risk of sudden imbalance.",
              "Record the distance from the pivot to the point of suspension, not to the weight's centre.",
            ],
            labHref: "/lab/physics/ph-3d-classic",
          },
        ],
      },
      {
        id: "phy11-heat",
        title: "Heat & Thermal Physics",
        grade: "class-11",
        experiments: [
          {
            title: "Determining the Coefficient of Linear Expansion of a Metal Rod (Searle's Method)",
            aim: "To measure the coefficient of linear expansion α of a metal rod.",
            requirement: [
              "Searle's apparatus",
              "Metal rod (e.g. brass)",
              "Spirit lamp / steam generator",
              "Thermometer",
              "Vernier calipers",
            ],
            theory: [
              "Coefficient of linear expansion α = (change in length) / (original length × temperature rise) = ΔL / (L₀ · ΔT).",
              "The micrometer in Searle's apparatus measures ΔL directly as the rod expands.",
            ],
            procedure: [
              "Measure the initial length L₀ of the rod with a vernier caliper.",
              "Place the rod in the Searle apparatus and pass steam through the tube.",
              "Record the initial and final micrometer readings as the rod heats up.",
              "Record the temperature rise ΔT from the thermometer.",
              "Calculate α = ΔL / (L₀ · ΔT).",
            ],
            observation: [
              "The micrometer reading increases as the rod heats up (ΔL is positive).",
              "The thermometer shows a steady temperature rise.",
            ],
            calculation: [
              "Example: L₀ = 50.0 cm = 0.500 m; ΔL = 0.002 m; ΔT = 100 °C.",
              "α = 0.002 / (0.500 × 100) = 4 × 10⁻⁵ /°C (typical for steel ≈ 1.2 × 10⁻⁵ /°C for brass).",
            ],
            result:
              "α for the metal rod is approximately 1.2 × 10⁻⁵ /°C (brass) or 1.0 × 10⁻⁵ /°C (steel).",
            precautions: [
              "Use steam (not boiling water) for a uniform and higher temperature.",
              "Ensure the apparatus is free from external vibrations.",
              "Allow the rod to cool before removing it from the apparatus.",
            ],
            labHref: "/lab/physics/heat-determinations",
          },
          {
            title: "Drawing a Heating Curve of a Substance",
            aim: "To observe the temperature-time profile during melting and boiling, and identify the latent heat regions.",
            requirement: [
              "Substance (e.g. solid wax / ice)",
              "Thermometer (0–100 °C)",
              "Spirit lamp",
              "Stopwatch",
              "Graph paper",
            ],
            theory: [
              "When a substance is heated, its temperature rises until it reaches the melting point, where it remains constant (latent heat of fusion is absorbed) until all the solid has melted.",
              "The temperature rises again until the boiling point, where it remains constant (latent heat of vaporization is absorbed).",
              "The two flat plateaus on the temperature-time graph are the melting and boiling points.",
            ],
            procedure: [
              "Heat the substance slowly and record the temperature at regular time intervals.",
              "Continue until all the substance has melted and then boils.",
              "Plot temperature against time.",
              "Identify the flat portions (plateaus) on the curve.",
            ],
            observation: [
              "The temperature rises steadily at first (solid heating).",
              "The temperature is constant during melting (first plateau).",
              "The temperature rises again (liquid heating).",
              "The temperature is constant during boiling (second plateau).",
            ],
            result:
              "The heating curve shows two plateaus corresponding to the melting point and the boiling point of the substance.",
            precautions: [
              "Heat slowly and stir continuously for a uniform temperature.",
              "Use a water-bath if the substance is organic to avoid scorching.",
              "Record readings at the same time interval throughout.",
            ],
            labHref: "/lab/physics/ph-heat-determinations",
          },
        ],
      },
      {
        id: "phy11-electricity",
        title: "Electricity",
        grade: "class-11",
        experiments: [
          {
            title: "Verification of Ohm's Law (V–I Graph for a Fixed Resistor)",
            aim: "To verify that the potential difference across a conductor is proportional to the current through it (V = IR).",
            requirement: [
              "Battery / cell",
              "Fixed resistor (e.g. 10 Ω)",
              "Ammeter (0–1 A)",
              "Voltmeter (0–3 V)",
              "Rheostat",
              "Key and connecting wires",
            ],
            theory: [
              "Ohm's law: V = IR, where R is constant for a conductor at constant temperature.",
              "The V–I graph is a straight line through the origin; its slope = R.",
            ],
            procedure: [
              "Set up a series circuit: battery, key, rheostat, ammeter and resistor in series; voltmeter in parallel with the resistor.",
              "Close the key and adjust the rheostat to get a reading on the ammeter.",
              "Record the voltage (V) and current (I) at 5–6 settings.",
              "Plot V on the y-axis and I on the x-axis.",
              "Find the slope of the straight line.",
            ],
            observation: [
              "A table of V and I at 5–6 settings is recorded.",
              "The V–I graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: slope = ΔV / ΔI = (2.4 V − 0.4 V) / (0.24 A − 0.04 A) = 2.0 / 0.20 = 10 Ω.",
              "R = 10 Ω (matches the labelled resistance).",
            ],
            result:
              "Ohm's law is verified: the V–I graph is linear and the slope equals the resistance.",
            precautions: [
              "Start from zero current and build up gradually to avoid initial errors.",
              "If the line curves at high currents, the resistor is heating — stop before the resistance changes.",
              "Keep the temperature of the resistor constant (do not touch it with hands).",
            ],
            labHref: "/lab/physics/advanced-circuit",
          },
          {
            title: "Verification of Kirchhoff's First Law (Junction Law)",
            aim: "To verify that the sum of currents entering a junction equals the sum of currents leaving it.",
            requirement: [
              "Cells (battery)",
              "Two or three resistors (in parallel)",
              "Ammeters",
              "Connecting wires and key",
            ],
            theory: [
              "Kirchhoff's first law (junction law): ΣI_in = ΣI_out. This is a statement of conservation of charge.",
              "In a parallel circuit, the total current from the cell splits into the branch currents and recombines at the other junction.",
            ],
            procedure: [
              "Arrange two resistors in parallel connected to a cell.",
              "Measure the total current leaving the cell with one ammeter.",
              "Measure the current through each branch with the other ammeter.",
              "Check that the total equals the sum of the branch currents.",
            ],
            observation: [
              "The total current (I_total) is read from the main ammeter.",
              "The two branch currents (I₁ and I₂) are read from the branch ammeters.",
              "I_total ≈ I₁ + I₂ (within 1–2 % experimental error).",
            ],
            result:
              "Kirchhoff's first law is verified: the sum of currents entering the junction equals the sum leaving it.",
            precautions: [
              "Use low-resistance resistors to avoid very high currents.",
              "Check that all connections are secure before closing the key.",
              "Keep the circuit open while taking the readings to avoid heating.",
            ],
            labHref: "/lab/physics/advanced-circuit",
          },
        ],
      },
      // ── Grade 12 ─────────────────────────────────────────────────────────
      {
        id: "phy12-mechanics",
        title: "Mechanics (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Determination of Surface Tension of Water by the Capillary Tube Method",
            aim: "To find the surface tension of water from the height of rise in capillary tubes of different diameters.",
            requirement: [
              "Five capillary tubes of different diameters",
              "Water",
              "Travelling microscope",
              "Graph paper",
            ],
            theory: [
              "For a liquid capillary tube of radius r, the height of rise h is given by: h = 2T cos θ / (ρgr).",
              "Rearranging: h = (2T / (ρg)) · (1/r) = (2T / (ρg)) · (1/d) × 2 (since r = d/2).",
              "Plotting h against 1/d gives a straight line through the origin with slope = 2T/(ρg), so T = (ρg/2) × slope.",
            ],
            procedure: [
              "Dip five capillary tubes of different diameters into water simultaneously.",
              "Measure the height of rise of water in each capillary with a travelling microscope.",
              "Plot height h against the inverse of the diameter (1/d).",
              "Find the slope of the straight line.",
            ],
            observation: [
              "A table of diameter d, height h, and 1/d is recorded.",
              "The h vs 1/d graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: slope = 0.0012 m · m; T = (1000 kg/m³ × 9.8 m/s² / 2) × 0.0012 m² = 0.0588 N/m ≈ 0.059 N/m (≈ 59 dyn/cm).",
            ],
            result:
              "The surface tension of water is measured as approximately 0.059 N/m at room temperature.",
            precautions: [
              "Ensure the capillary tubes are clean — grease or dirt reduces the contact angle.",
              "Use a travelling microscope to read the meniscus height accurately.",
              "Keep the water temperature constant throughout the experiment.",
            ],
            labHref: "/lab/physics/ph-calc-heat",
          },
          {
            title: "Determination of the Coefficient of Viscosity of a Liquid by Stoke's Method",
            aim: "To find the coefficient of viscosity η of a liquid from the terminal velocity of falling balls.",
            requirement: [
              "Six metal balls of different diameters",
              "Glass cylinder with the test liquid",
              "Stopwatch",
              "Vernier callipers",
              "Thermometer",
            ],
            theory: [
              "Stoke's law: drag force F = 6πηrv where r is the radius and v is the terminal velocity.",
              "At terminal velocity, drag = net weight: 6πηrv = (4/3)πr³g(ρ_ball − ρ_liquid).",
              "Solving for v: v = (2r²g(ρ_ball − ρ_liquid)) / (9η).",
              "Time to fall distance L: t = L/v = 9ηL / (2r²g(ρ_ball − ρ_liquid)).",
              "Plotting t vs d (diameter) gives a straight line through the origin; slope = 9ηL / (2 × (4/9)d² × g(ρ_ball−ρ_liquid)).",
            ],
            procedure: [
              "Measure the diameter of each of the six balls with a vernier calliper.",
              "Release each ball in the cylinder and time its fall over a known distance L.",
              "Record the temperature of the liquid.",
              "Plot time t against diameter d.",
              "Use the slope to compute η.",
            ],
            observation: [
              "A table of diameter d, time t, and the product d × t is recorded.",
              "The t vs d graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: L = 0.5 m, slope (t/d²) = 0.4 s/m².",
              "η = slope × 2g(ρ_ball − ρ_liquid) / 9L (use the correct form from the derivation).",
              "η ≈ 1.14 × 10⁻³ N·s/m² (for glycerine at 20 °C).",
            ],
            result:
              "The coefficient of viscosity of the liquid is calculated from the slope of the t vs d² graph.",
            precautions: [
              "Use clean, smooth balls to reduce surface roughness effects.",
              "Ensure the balls are released gently to avoid initial turbulence.",
              "Keep the liquid at a constant temperature — viscosity is temperature-dependent.",
            ],
            labHref: "/lab/physics/ph-calc-heat",
          },
        ],
      },
      {
        id: "phy12-waves",
        title: "Waves & Optics (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Determination of the Wavelength of He–Ne Laser Light Using a Plane Diffraction Grating",
            aim: "To find the wavelength of a He–Ne laser from a plane diffraction grating.",
            requirement: [
              "He–Ne laser",
              "Plane diffraction grating",
              "Screen",
              "Metre scale",
            ],
            theory: [
              "For a plane diffraction grating, the condition for the m-th order maximum is: d sin θ = mλ, where d is the grating spacing and λ is the wavelength.",
              "For the first order (m = 1): sin θ = λ / d, so λ = d sin θ.",
            ],
            procedure: [
              "Set up the laser and the grating in front of a screen at a known distance D.",
              "Observe the central bright fringe and the first-order fringes on either side.",
              "Measure the distance between the two first-order fringes (2y).",
              "Calculate sin θ ≈ y / D (for small angles).",
              "Use λ = d sin θ to compute the wavelength.",
            ],
            observation: [
              "The central bright fringe is the brightest; first-order fringes are visible on either side.",
              "The distance 2y between the two first-order fringes is measured.",
            ],
            calculation: [
              "Example: D = 2.0 m, y = 0.05 m (first-order fringe at 5 cm from centre), grating spacing d = 1/600 mm = 1.67 × 10⁻⁶ m.",
              "sin θ ≈ 0.05 / 2.0 = 0.025.",
              "λ = 1.67 × 10⁻⁶ × 0.025 ≈ 4.2 × 10⁻⁸ m (≈ 420 nm — use the correct grating spacing for He–Ne: d ≈ 1/6000 mm gives λ ≈ 632.8 nm).",
            ],
            result:
              "The wavelength of the He–Ne laser is measured to be approximately 632.8 nm (red light).",
            precautions: [
              "Do not look directly into the laser beam.",
              "Keep the grating perpendicular to the laser beam.",
              "Use a fixed distance D for all readings.",
            ],
            labHref: "/lab/physics/ph-3d-optics",
          },
          {
            title: "Determination of the Velocity of Sound in Air at NTP Using a Resonance Tube",
            aim: "To find the speed of sound in air using a resonance tube and a tuning fork of known frequency.",
            requirement: [
              "Resonance tube (glass tube in a water tank)",
              "Tuning fork of known frequency",
              "Thermometer",
              "Metre scale",
            ],
            theory: [
              "In a closed tube, resonance occurs when the air column length = λ/4 (first resonance) or 3λ/4 (second resonance).",
              "The difference l₂ − l₁ = λ/2, so λ = 2(l₂ − l₁) and v = 2n(l₂ − l₁).",
            ],
            procedure: [
              "Strike the tuning fork and bring it near the open end of the tube.",
              "Adjust the water level until the first resonance (maximum sound) is heard. Record l₁.",
              "Continue lowering the water until the second resonance is heard. Record l₂.",
              "Correct for end correction: v = 2n(l₂ − l₁).",
              "Record the temperature to relate the speed to NTP.",
            ],
            observation: [
              "Two resonances are heard as the water level is lowered.",
              "The lengths l₁ and l₂ are measured.",
            ],
            calculation: [
              "Example: n = 512 Hz, l₁ = 0.15 m, l₂ = 0.45 m.",
              "v = 2 × 512 × (0.45 − 0.15) = 2 × 512 × 0.30 = 307.2 m/s.",
              "Corrected to NTP (0 °C): v_NTP = 307.2 × 273/(273 + T_room) ≈ 332 m/s.",
            ],
            result:
              "The velocity of sound at room temperature is found; corrected to NTP it is approximately 332 m/s.",
            precautions: [
              "Use a clean, dry tuning fork to avoid frequency changes.",
              "Measure the resonances carefully — the first resonance is the faintest.",
              "Keep the room temperature constant during the experiment.",
            ],
            labHref: "/lab/physics/ph-3d-wave",
          },
          {
            title: "Determination of the Frequency of A.C. Mains Using a Sonometer (Stretched Wire)",
            aim: "To find the frequency of mains electricity using a stretched-wire sonometer and tuning forks.",
            requirement: [
              "Sonometer (stretched wire with a cell and rheostat)",
              "Tuning forks of known different frequencies",
              "Metre scale",
              "Graph paper",
            ],
            theory: [
              "For a stretched wire, the resonating length L is inversely proportional to the fork frequency n for a particular harmonic: L ∝ 1/n.",
              "Plotting L against 1/n gives a straight line; the mains frequency can be read where L = 0 on the extrapolated line.",
            ],
            procedure: [
              "Connect the stretched wire in a circuit to the mains (or a cell + rheostat).",
              "Place tuning forks of different known frequencies against the wire and adjust the length until resonance.",
              "Record the resonating length L for each fork frequency n.",
              "Plot L against 1/n.",
              "Read the mains frequency from the graph where L = 0.",
            ],
            observation: [
              "A table of fork frequency n and corresponding resonating length L is recorded.",
              "The L vs 1/n graph is a straight line.",
            ],
            calculation: [
              "The mains frequency is the value of n when L = 0 on the extrapolated line (≈ 50 Hz for Nepal / India).",
            ],
            result:
              "The frequency of the mains is read from the graph and found to be approximately 50 Hz.",
            precautions: [
              "Keep the tension in the wire constant for all readings.",
              "Use the same harmonic for all forks.",
            ],
            labHref: "/lab/physics/ph-3d-wave",
          },
        ],
      },
      {
        id: "phy12-electricity",
        title: "Electricity & Magnetism (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Use of a Potentiometer — Comparison of E.M.F.s of Two Cells",
            aim: "To compare the emfs of two cells without drawing current from them.",
            requirement: [
              "Potentiometer (uniform wire)",
              "Two cells (A and B)",
              "Standard cell (reference)",
              "Galvanometer",
              "Jockey",
              "Resistance box and key",
            ],
            theory: [
              "At the balance point of a potentiometer, no current flows through the galvanometer, so the emf of the cell is equal to the potential drop along the wire: E ∝ l (where l is the balance length).",
              "Therefore E_A / E_B = l_A / l_B, where l_A and l_B are the balance lengths for cells A and B respectively.",
            ],
            procedure: [
              "Set up the potentiometer with the standard cell.",
              "Find the balance point for the standard cell (l₀).",
              "Find the balance point for cell A (l_A) and cell B (l_B).",
              "The ratio of emfs is E_A / E_B = l_A / l_B.",
            ],
            observation: [
              "A table of balance lengths for the standard cell, cell A and cell B is recorded.",
              "The ratio l_A / l_B is calculated.",
            ],
            calculation: [
              "Example: l_A = 80 cm, l_B = 60 cm → E_A / E_B = 80/60 = 4/3.",
              "If E_A = 1.5 V, then E_B = 1.5 × 3/4 = 1.125 V.",
            ],
            result:
              "The ratio of the emfs of the two cells is found without internal resistance affecting the result.",
            precautions: [
              "Ensure the potentiometer wire is uniform and not stretched.",
              "Use the jockey with a light contact to avoid damaging the wire.",
              "Keep the cell (driver) constant throughout the experiment.",
            ],
            labHref: "/lab/physics/advanced-circuit",
          },
          {
            title: "Use of a Potentiometer — Determination of the Internal Resistance of a Cell",
            aim: "To find the internal resistance of a cell using a potentiometer.",
            requirement: [
              "Potentiometer",
              "Cell (unknown internal resistance)",
              "Resistance box",
              "Galvanometer, jockey, key",
            ],
            theory: [
              "Open-circuit emf E = k · l₁ (k = potential gradient).",
              "Terminal voltage with resistance R in parallel: V = k · l₂.",
              "Internal resistance: r = (E − V) / I, and since I = V/R, then r = R(l₁ − l₂) / l₂.",
            ],
            procedure: [
              "Find the balance length l₁ with no resistance box connected (open circuit).",
              "Connect the resistance box in parallel with the cell and find the new balance length l₂.",
              "Read the resistance R from the resistance box.",
              "Calculate r = R(l₁ − l₂) / l₂.",
            ],
            observation: [
              "A table of balance lengths l₁, l₂ and the resistance R is recorded.",
            ],
            calculation: [
              "Example: l₁ = 90 cm, l₂ = 60 cm, R = 5 Ω.",
              "r = 5 × (90 − 60) / 60 = 5 × 30/60 = 2.5 Ω.",
            ],
            result:
              "The internal resistance of the cell is calculated from the ratio of balance lengths.",
            precautions: [
              "Keep the resistance box at zero when finding l₁ (open circuit).",
              "Use a high resistance value to avoid drawing too much current from the cell.",
            ],
            labHref: "/lab/physics/advanced-circuit",
          },
          {
            title: "Study of the Variation of Resistance of a Thermistor with Temperature",
            aim: "To show that a thermistor's resistance decreases as temperature increases (NTC thermistor).",
            requirement: [
              "Thermistor (NTC)",
              "Water bath with spirit lamp",
              "Thermometer (0–100 °C)",
              "Multimeter / Ohmmeter",
            ],
            theory: [
              "An NTC (Negative Temperature Coefficient) thermistor is a semiconductor whose resistance falls as temperature rises.",
              "The R–T curve is a steep downward curve: as T increases, R decreases exponentially.",
            ],
            procedure: [
              "Place the thermistor in a water bath and measure its resistance at each temperature.",
              "Raise the temperature step by step (e.g. every 10 °C), recording resistance at each step.",
              "Plot resistance against temperature.",
            ],
            observation: [
              "A table of temperature and corresponding resistance is recorded.",
              "The R–T curve shows a falling (steep downward) curve.",
            ],
            result:
              "The NTC thermistor's resistance falls with increasing temperature, confirming its temperature-sensing property.",
            precautions: [
              "Stir the water bath gently to keep the temperature uniform.",
              "Wait for the thermistor to reach thermal equilibrium before each reading.",
            ],
            labHref: "/lab/physics/advanced-circuit",
          },
          {
            title: "Determination of the Pole Strength and Magnetic Moment of a Bar Magnet Using a Deflection Magnetometer",
            aim: "To measure the pole strength and magnetic moment of a bar magnet using a deflection magnetometer.",
            requirement: [
              "Bar magnet",
              "Deflection magnetometer",
              "Compass box",
              "Metre scale",
            ],
            theory: [
              "The field of a bar magnet in the tangent position at distance d from its centre: B = (μ₀/4π) × 2Md/d³ where M is the magnetic moment.",
              "The magnetometer gives B = H₀ tan θ, where H₀ is the horizontal component of Earth's magnetic field.",
              "Equating: M = (H₀/2) × (4π/μ₀) × d³ tan θ. Pole strength m = M / (2l) where l is the half-length of the magnet.",
            ],
            procedure: [
              "Place the magnet at a known distance from the magnetometer in the tangent position (magnet axis perpendicular to the magnetic meridian).",
              "Record the deflection angle θ at two symmetric positions (to cancel out any zero error).",
              "Average the two readings.",
              "Use the formula to find M (magnetic moment) and m (pole strength).",
            ],
            observation: [
              "Deflection angles are recorded at two symmetric positions.",
              "The average deflection angle θ is calculated.",
            ],
            calculation: [
              "Example: H₀ = 0.3 × 10⁻⁴ T, d = 0.1 m, θ = 45° (tan θ = 1).",
              "M = (0.3 × 10⁻⁴ / 2) × (4π / 4π × 10⁻⁷) × (0.1)³ × 1 ≈ 7.5 × 10⁻⁵ A·m².",
              "If half-length l = 0.03 m: m = M/(2×0.03) = 7.5 × 10⁻⁵ / 0.06 ≈ 1.25 × 10⁻³ A.",
            ],
            result:
              "The pole strength and magnetic moment of the bar magnet are calculated from the deflection angle.",
            precautions: [
              "Keep the magnet and compass box free from any other magnetic material.",
              "Use the tangent position: the magnet axis is perpendicular to the magnetic meridian.",
              "Take readings at two symmetric positions to cancel zero error.",
            ],
            labHref: "/lab/physics/ph-3d-magnetic",
          },
          {
            title: "Study of I–V Characteristics of a Semiconductor Diode (Forward and Reverse Bias)",
            aim: "To plot the I–V curve of a p–n junction diode in forward and reverse bias.",
            requirement: [
              "p–n junction diode",
              "Variable DC supply (0–10 V)",
              "Microammeter (for reverse current)",
              "Multimeter / voltmeter",
              "Graph paper",
            ],
            theory: [
              "In forward bias (anode positive), the diode conducts above the knee voltage (~0.7 V for Si, ~0.3 V for Ge).",
              "In reverse bias (anode negative), only a small leakage current flows until the breakdown voltage is reached.",
            ],
            procedure: [
              "Connect the diode in forward bias (anode to positive terminal).",
              "Increase the supply voltage in small steps (0.1 V increments) and record the current at each step.",
              "Reverse the connections and repeat for reverse bias.",
              "Plot the I–V curve (current on y-axis, voltage on x-axis).",
            ],
            observation: [
              "In forward bias: below ~0.7 V the current is negligible; above it, the current rises sharply.",
              "In reverse bias: the current is near zero (µA range) until the breakdown voltage is reached.",
            ],
            result:
              "The I–V characteristic shows a forward knee at ~0.7 V and near-zero reverse current, confirming the diode's rectifying behaviour.",
            precautions: [
              "Do not exceed the breakdown voltage in reverse bias to avoid damaging the diode.",
              "Use a microammeter for the reverse current readings.",
              "Label the x and y axes clearly on the graph.",
            ],
            labHref: "/lab/physics/ph-3d-quantum",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  CHEMISTRY
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "chemistry",
    name: "Chemistry Practical",
    description:
      "NEB Class 11 & 12 Chemistry practical syllabus (Code 301 & 202) — laboratory techniques, reactions, gas preparation, quantitative analysis, titration and organic tests, written in the standard NEB practical-record format.",
    emoji: "🧪",
    colorClass: "from-amber-500 to-orange-500",
    units: [
      // ── Grade 11 ─────────────────────────────────────────────────────────
      {
        id: "chem11-techniques",
        title: "Laboratory Techniques (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Separate Insoluble Components from a Mixture (NaCl, sand, camphor)",
            aim: "To separate the three components of a mixture (NaCl, sand and camphor) in pure and dry state.",
            requirement: [
              "Mixture of NaCl, sand and camphor",
              "Distilled water",
              "Sodium hydroxide (optional)",
              "Distillation / sublimation setup",
              "Filter paper and funnel",
              "Glass rod and evaporating dish",
            ],
            theory: [
              "Camphor is sublimable: on heating it changes directly from solid to vapour and condenses on a cold surface.",
              "Sand is insoluble in water and is removed by filtration.",
              "NaCl is soluble in water and is recovered by evaporating the aqueous solution.",
              "The three separations exploit sublimation, insolubility and solubility respectively.",
            ],
            procedure: [
              "Sublimation: Heat the mixture gently — camphor sublimes and condenses on a cold surface above the dish.",
              "Filtration: Add water to the remaining solid to dissolve NaCl, then filter out the sand.",
              "Evaporation: Evaporate the filtrate to recover NaCl crystals.",
            ],
            observation: [
              "White camphor crystals condense on the cold surface above the heated dish.",
              "Sandy residue is caught on the filter paper.",
              "White NaCl crystals form in the evaporating dish.",
            ],
            result:
              "All three components are recovered in pure and dry state.",
            precautions: [
              "Do not heat the mixture too strongly — camphor may decompose at very high temperatures.",
              "Use a clean evaporating dish for NaCl recovery.",
              "Wear safety goggles throughout.",
            ],
            labHref: "/lab/chemistry/ch-3d-advanced",
          },
          {
            title: "To Separate a Mixture of Two Soluble Solids by Fractional Crystallization (KNO₃ + NaCl)",
            aim: "To separate KNO₃ and NaCl by taking advantage of their different solubility curves.",
            requirement: [
              "KNO₃ + NaCl mixture",
              "Distilled water",
              "Evaporating dish, beaker",
              "Filter paper and funnel",
              "Hot plate / spirit lamp",
            ],
            theory: [
              "KNO₃ has a very steep solubility curve: it is highly soluble when hot but much less so when cold.",
              "NaCl has a nearly constant solubility with temperature.",
              "By controlled crystallization from a hot saturated solution, KNO₃ precipitates first on cooling, while NaCl stays in solution.",
            ],
            procedure: [
              "Dissolve the mixture in a minimum amount of hot water.",
              "Filter hot to remove insoluble impurities.",
              "Allow the hot filtrate to cool slowly — KNO₃ crystallizes first.",
              "Filter to collect the KNO₃ crystals.",
              "Evaporate the remaining mother liquor to recover NaCl.",
            ],
            observation: [
              "KNO₃ crystals (colourless, large) form on cooling.",
              "NaCl crystals (small, white) form in the concentrated mother liquor.",
            ],
            result:
              "KNO₃ and NaCl are separately recovered as pure crystals.",
            precautions: [
              "Cool slowly to get larger, purer KNO₃ crystals.",
              "Do not evaporate the mother liquor to dryness — stop when NaCl crystals begin to form and filter.",
            ],
            labHref: "/lab/chemistry/ch-3d-advanced",
          },
          {
            title: "To Determine the Number of Water of Crystallization in a Hydrated Salt",
            aim: "To find how many moles of water are present in a known mass of a hydrated salt.",
            requirement: [
              "Hydrated salt (e.g. CuSO₄·5H₂O)",
              "Drying oven (or spirit lamp)",
              "Analytical balance",
              "Desiccator",
              "Crucible / evaporating dish",
            ],
            theory: [
              "A hydrated salt contains water molecules in its crystal lattice (water of crystallization).",
              "On strong heating, the water is driven off: MₓH₂O → M + xH₂O.",
              "Moles of water lost = mass lost / M(H₂O) = mass lost / 18.",
              "Moles of anhydrous salt = mass of anhydrous salt / M(anhydrous salt).",
              "The ratio of moles of water to moles of salt gives x.",
            ],
            procedure: [
              "Weigh a known mass of the hydrated salt.",
              "Heat strongly in a crucible to drive off all water.",
              "Cool in a desiccator and reweigh.",
              "Repeat heating and weighing until a constant mass is obtained.",
              "Calculate the moles of water and the moles of anhydrous salt.",
            ],
            observation: [
              "The mass decreases with each heating (water is lost).",
              "The mass reaches a constant value after two or three heatings.",
            ],
            calculation: [
              "Example: CuSO₄·xH₂O; mass of hydrated salt = 5.00 g; mass of anhydrous CuSO₄ = 3.20 g.",
              "Mass of water = 5.00 − 3.20 = 1.80 g.",
              "Moles of water = 1.80 / 18 = 0.10 mol.",
              "Moles of CuSO₄ = 3.20 / 159.6 = 0.020 mol.",
              "x = 0.10 / 0.020 = 5 → formula is CuSO₄·5H₂O.",
            ],
            result:
              "The number of water molecules of crystallization per formula unit is found.",
            precautions: [
              "Heat until a constant mass is obtained (at least two heatings).",
              "Cool in a desiccator, not in air, to prevent reabsorption of moisture.",
              "Use an analytical balance for accurate readings.",
            ],
            labHref: "/lab/chemistry/ch-calc-molarmass",
          },
          {
            title: "To Determine the Volume of 1 Mole of Hydrogen Gas at NTP",
            aim: "To show that 1 mole of any gas occupies 22.4 L at NTP (0 °C, 1 atm).",
            requirement: [
              "Zinc granules",
              "Dilute H₂SO₄ / HCl",
              "Gas collection setup (eudiometer or gas jar)",
              "Measuring cylinder / gas jar",
              "Distilled water",
              "Thermometer and barometer",
            ],
            theory: [
              "Zn + H₂SO₄ → ZnSO₄ + H₂↑.",
              "The gas collected is hydrogen. The moles of H₂ = moles of Zn reacted.",
              "The gas is collected over water, so the pressure of dry gas = P_atm − P_H₂O (water vapour pressure at the temperature).",
              "Correcting to NTP: V_NTP = V_measured × (273 / T) × (P_dry / 760).",
              "Molar volume at NTP = V_NTP / moles of Zn.",
            ],
            procedure: [
              "React a known mass of zinc with dilute H₂SO₄ to generate H₂.",
              "Collect the gas by downward displacement of water in a gas jar.",
              "Measure the volume of gas collected.",
              "Record the temperature and atmospheric pressure.",
              "Correct the volume to NTP.",
            ],
            observation: [
              "A known mass of zinc is consumed and a volume of gas is collected.",
              "The temperature and pressure at collection are recorded.",
            ],
            calculation: [
              "Example: mass of Zn = 0.65 g → moles of Zn = 0.65 / 65 = 0.01 mol.",
              "Volume of H₂ collected = 240 mL at 25 °C, 750 mm Hg; water vapour pressure at 25 °C = 24 mm Hg.",
              "P_dry = 750 − 24 = 726 mm Hg.",
              "V_NTP = 240 × (273/298) × (726/760) ≈ 224 mL.",
              "Molar volume = 224 mL / 0.01 mol = 22.4 L/mol.",
            ],
            result:
              "The measured molar volume at NTP is close to 22.4 L/mol, confirming the standard value.",
            precautions: [
              "Collect the gas by downward displacement of water (H₂ is lighter than air).",
              "Record the temperature and pressure immediately after collection.",
              "Use excess zinc to ensure all the acid is consumed.",
            ],
            labHref: "/lab/chemistry/ch-calc-gas",
          },
        ],
      },
      {
        id: "chem11-reactions",
        title: "Types of Chemical Reactions (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Perform a Precipitation Reaction of BaCl₂ and H₂SO₄",
            aim: "To observe the formation of a white precipitate when barium chloride reacts with sulphuric acid.",
            requirement: [
              "BaCl₂ solution",
              "H₂SO₄ solution",
              "Test tubes and droppers",
            ],
            theory: [
              "Molecular equation: BaCl₂(aq) + H₂SO₄(aq) → BaSO₄(s)↓ + 2HCl(aq).",
              "Net ionic equation: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).",
              "BaSO₄ is highly insoluble (Ksp ≈ 1.1 × 10⁻¹⁰), so it precipitates as a white solid.",
            ],
            procedure: [
              "Add a few drops of BaCl₂ solution to a test tube containing H₂SO₄ solution.",
              "Observe the formation of a white precipitate.",
              "Write the molecular and ionic equations.",
            ],
            observation: [
              "A white curdy precipitate forms immediately on adding BaCl₂ to H₂SO₄.",
            ],
            result:
              "BaSO₄ is precipitated, confirming the presence of sulphate ions.",
            precautions: [
              "Use dilute H₂SO₄ to control the rate of precipitation.",
              "Do not use hot solutions — BaSO₄ may dissolve slightly at high temperature.",
            ],
            labHref: "/lab/chemistry/ch-th-ionic",
          },
          {
            title: "To Neutralize NaOH with HCl and Recover NaCl Crystals",
            aim: "To demonstrate a neutralization reaction and recover the salt.",
            requirement: [
              "NaOH solution",
              "HCl solution",
              "Phenolphthalein / methyl orange indicator",
              "Evaporating dish and glass rod",
            ],
            theory: [
              "NaOH + HCl → NaCl + H₂O. This is a neutralization reaction between a strong base and a strong acid.",
              "At the endpoint, all the NaOH is consumed and the solution is neutral.",
              "On evaporating the neutral NaCl solution, white NaCl crystals are recovered.",
            ],
            procedure: [
              "Add phenolphthalein to NaOH solution (turns pink).",
              "Titrate with HCl until the pink just disappears (endpoint).",
              "Evaporate the resulting NaCl solution in an evaporating dish.",
              "Recover the white NaCl crystals.",
            ],
            observation: [
              "The solution is pink with phenolphthalein in NaOH.",
              "At the endpoint the pink just disappears — the solution is neutral.",
              "White NaCl crystals form on evaporation.",
            ],
            result:
              "NaCl crystals are recovered from the evaporated neutral solution.",
            precautions: [
              "Do not evaporate to complete dryness — stop when crystals form and air-dry the residue.",
              "Use phenolphthalein for the base titration (colourless in acid, pink in base).",
            ],
            labHref: "/lab/chemistry/ch-calc-titration",
          },
          {
            title: "To Test for Ferrous Ions and Oxidize Them to Ferric Ions",
            aim: "To detect Fe²⁺ ions and confirm their oxidation to Fe³⁺.",
            requirement: [
              "FeSO₄ solution",
              "Potassium ferrocyanide K₃[Fe(CN)₆] (for Fe²⁺)",
              "Potassium ferricyanide K₃[Fe(CN)₆] (for Fe³⁺ — optional)",
              "KMnO₄ solution (oxidant)",
              "Dilute H₂SO₄",
              "Test tubes",
            ],
            theory: [
              "Fe²⁺ + K₃[Fe(CN)₆] → Fe₃[Fe(CN)₆]₂↓ (Turnbull's blue — dark blue precipitate).",
              "Fe³⁺ gives a red-brown precipitate (Prussian blue) with K₃[Fe(CN)₆].",
              "KMnO₄ in acid oxidizes Fe²⁺ to Fe³⁺: 5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O.",
            ],
            procedure: [
              "Add a few drops of K₃[Fe(CN)₆] to the FeSO₄ solution — observe a blue precipitate (Turnbull's blue).",
              "Add dilute H₂SO₄ to another sample of FeSO₄.",
              "Add KMnO₄ drop by drop to the acidified sample.",
              "Observe the colour change of KMnO₄ (purple → colourless) as Fe²⁺ is oxidized to Fe³⁺.",
            ],
            observation: [
              "A dark blue precipitate (Turnbull's blue) confirms Fe²⁺.",
              "The purple colour of KMnO₄ disappears as Fe²⁺ is oxidized to Fe³⁺.",
            ],
            result:
              "Fe²⁺ is detected by the Turnbull's blue test; the oxidation to Fe³⁺ is confirmed by the decolourization of KMnO₄.",
            precautions: [
              "Use acidified KMnO₄ — the reaction will not proceed without H⁺.",
              "Do not add too much KMnO₄ at once — add drop by drop.",
            ],
            labHref: "/lab/chemistry/ch-th-ionic",
          },
        ],
      },
      {
        id: "chem11-gases",
        title: "Preparation and Properties of Gases (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Prepare and Study the Properties of Hydrogen Gas",
            aim: "To generate hydrogen from zinc and dilute acid and test its properties.",
            requirement: [
              "Zinc granules",
              "Dilute HCl / H₂SO₄",
              "Gas collection setup (gas jar, funnel, delivery tube)",
              "Lighted splint",
              "CuO powder (optional, for reduction test)",
            ],
            theory: [
              "Zn + H₂SO₄ → ZnSO₄ + H₂↑.",
              "Hydrogen is the lightest element — it is collected by downward displacement of water (or upward displacement of air).",
              "H₂ burns with a pale blue flame: 2H₂ + O₂ → 2H₂O.",
              "H₂ is a reducing agent: CuO + H₂ → Cu + H₂O.",
            ],
            procedure: [
              "React zinc with dilute H₂SO₄ in a gas generator.",
              "Collect the gas by downward displacement of water in a gas jar.",
              "Bring a lighted splint to the mouth of the gas jar — observe the 'pop'.",
              "Pass H₂ over CuO powder in a dry test tube — observe the black colour turning red.",
            ],
            observation: [
              "The 'pop' test confirms the gas is hydrogen.",
              "The black CuO turns to red-brown Cu, confirming H₂'s reducing nature.",
            ],
            result:
              "H₂ is generated and its properties (flammable, reducing) are demonstrated.",
            precautions: [
              "H₂ is highly flammable — keep the gas jar away from open flames until the 'pop' test.",
              "Do not collect large volumes of H₂ without proper ventilation.",
            ],
            labHref: "/lab/chemistry/ch-3d-advanced",
          },
          {
            title: "To Prepare and Study the Properties of Ammonia Gas",
            aim: "To generate NH₃ from a mixture of Ca(OH)₂ and NH₄Cl and test its properties.",
            requirement: [
              "Ca(OH)₂ + NH₄Cl mixture",
              "Dry test tube",
              "Glass rod dipped in dilute HCl",
              "Red and blue litmus paper",
            ],
            theory: [
              "2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃ + 2H₂O.",
              "NH₃ is alkaline (turns red litmus blue) and forms white fumes of NH₄Cl with HCl.",
              "NH₃ is lighter than air, so it is collected by upward displacement of air.",
            ],
            procedure: [
              "Heat the mixture of Ca(OH)₂ and NH₄Cl in a dry test tube.",
              "Collect the gas by upward displacement of air in an inverted gas jar.",
              "Bring a glass rod dipped in dilute HCl near the gas jar mouth — observe white fumes.",
              "Test with red and blue litmus paper.",
            ],
            observation: [
              "A pungent smell of ammonia is noticed.",
              "White fumes of NH₄Cl form when the HCl-coated rod is brought near the gas.",
              "Red litmus turns blue (alkaline gas).",
            ],
            result:
              "NH₃ is generated and its properties (alkaline, forms ammonium chloride) are demonstrated.",
            precautions: [
              "Work in a well-ventilated area — NH₃ is a respiratory irritant.",
              "Keep the gas jar mouth slightly open when handling to prevent pressure build-up.",
            ],
            labHref: "/lab/chemistry/ch-3d-advanced",
          },
          {
            title: "To Prepare and Study the Properties of Carbon Dioxide Gas",
            aim: "To generate CO₂ from marble chips and dilute HCl and test its properties.",
            requirement: [
              "Marble chips (CaCO₃)",
              "Dilute HCl",
              "Gas collection setup (upward displacement of air)",
              "Limewater (Ca(OH)₂ solution)",
            ],
            theory: [
              "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑.",
              "CO₂ is about 1.5× heavier than air — it is collected by upward displacement of air.",
              "CO₂ turns limewater milky: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O.",
              "Excess CO₂ dissolves the precipitate: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (clear).",
            ],
            procedure: [
              "React marble chips with dilute HCl to generate CO₂.",
              "Collect the gas by upward displacement of air in a gas jar.",
              "Pass the gas through limewater — observe the milky precipitate.",
              "Continue passing excess CO₂ — observe the milky colour clearing.",
            ],
            observation: [
              "Limewater turns milky on first passing CO₂ through it.",
              "On continued passing, the milkiness clears (excess CO₂ dissolves the CaCO₃).",
            ],
            result:
              "CO₂ is generated and its properties (turns limewater milky, heavier than air) are demonstrated.",
            precautions: [
              "Use dilute HCl — concentrated HCl fumes and is too aggressive.",
              "Wear safety goggles when handling HCl.",
            ],
            labHref: "/lab/chemistry/ch-3d-advanced",
          },
        ],
      },
      {
        id: "chem11-quant",
        title: "Quantitative Analysis (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Determine the Molecular Weight of a Metal Carbonate (by Acid Titration)",
            aim: "To find the formula of an unknown metal carbonate from its reaction with HCl.",
            requirement: [
              "Unknown metal carbonate (solid)",
              "Standard HCl solution",
              "Burette, pipette, conical flask",
              "Methyl orange / phenolphthalein indicator",
              "Analytical balance",
            ],
            theory: [
              "M₂CO₃ + 2HCl → 2MCl + H₂O + CO₂↑.",
              "Moles of HCl used = M(HCl) × V(HCl).",
              "Moles of M₂CO₃ = (M(HCl) × V(HCl)) / 2.",
              "Molar mass of M₂CO₃ = mass / moles.",
            ],
            procedure: [
              "Weigh a known mass of the carbonate accurately.",
              "Dissolve in dilute HCl and make up to a known volume.",
              "Pipette a measured volume and titrate against standard HCl.",
              "Repeat for 3 concordant titres.",
              "Use the molar equation to calculate the molar mass.",
            ],
            observation: [
              "A table of initial and final burette readings for 3 titres is recorded.",
              "The average titre volume is calculated.",
            ],
            calculation: [
              "Example: mass of M₂CO₃ = 2.00 g (in 250 mL).",
              "Moles of HCl = 0.10 M × 0.025 L = 0.0025 mol (average titre).",
              "Moles of M₂CO₃ = 0.0025 / 2 = 0.00125 mol per 250 mL.",
              "Molar mass = 2.00 / 0.00125 = 1600 g/mol (adjust for the actual sample).",
            ],
            result:
              "The molar mass of the carbonate is calculated; the identity of the metal is confirmed from the molar mass.",
            precautions: [
              "Use methyl orange for the CO₂ endpoint (faint orange).",
              "Make sure the carbonate is completely dissolved before diluting.",
              "Repeat until 3 concordant titres are obtained.",
            ],
            labHref: "/lab/chemistry/ch-calc-stoich",
          },
          {
            title: "To Determine the Solubility of a Given Solid",
            aim: "To find the grams of solid that dissolve in 100 g of water at a given temperature.",
            requirement: [
              "Given solid",
              "Hot distilled water",
              "Beaker, glass rod, funnel",
              "Filter paper",
              "Analytical balance",
            ],
            theory: [
              "Solubility is the mass of solute that dissolves in 100 g of solvent at a specific temperature.",
              "For most solids, solubility increases with temperature.",
              "A saturated solution must have undissolved solute present at the bottom.",
            ],
            procedure: [
              "Prepare a saturated solution of the solid at a known temperature.",
              "Filter a known mass of the hot saturated solution.",
              "Evaporate the filtrate to recover the solute.",
              "Calculate solubility in g/100 g water.",
            ],
            observation: [
              "A table of mass of filter + paper, mass of solute recovered is recorded.",
              "The solubility is calculated from the mass of solute in 100 g of water.",
            ],
            calculation: [
              "Solubility = (mass of solute recovered / mass of water in filtrate) × 100.",
              "Example: 3.20 g solute in 25.0 g water → solubility = (3.20/25.0) × 100 = 12.8 g/100 g water.",
            ],
            result:
              "The solubility of the solid at the given temperature is found.",
            precautions: [
              "Ensure the solution is truly saturated (undissolved solid remains at the bottom).",
              "Record the temperature at which the solution was saturated.",
            ],
            labHref: "/lab/chemistry/ch-calc-ph",
          },
          {
            title: "To Determine the Relative Surface Tension by the Drop Count Method",
            aim: "To compare the surface tension of two liquids by counting the number of drops.",
            requirement: [
              "Two liquids to compare",
              "Clean glass dropper / pipette",
              "Beakers, counter",
            ],
            theory: [
              "The weight of a drop = surface tension × circumference of the drop.",
              "For the same volume of two liquids, the number of drops N is inversely proportional to the surface tension: N₁/N₂ = σ₂/σ₁.",
              "A liquid with more drops has lower surface tension (lighter drops); a liquid with fewer drops has higher surface tension.",
            ],
            procedure: [
              "Clean the pipette thoroughly and dry it.",
              "Count the number of drops required to deliver a fixed volume of liquid 1.",
              "Clean and dry the pipette again.",
              "Count the number of drops for the same fixed volume of liquid 2.",
            ],
            observation: [
              "The drop count for each liquid is recorded.",
              "The ratio of drop counts is calculated.",
            ],
            calculation: [
              "σ₁/σ₂ = N₂/N₁.",
              "Example: N₁ = 40 drops, N₂ = 25 drops → σ₁/σ₂ = 25/40 = 0.625.",
            ],
            result:
              "The relative surface tension of the two liquids is found from the ratio of drop counts.",
            precautions: [
              "Clean the pipette between the two liquids to avoid contamination.",
              "Use the same pipette for both liquids.",
              "Count drops carefully — do not let drops merge.",
            ],
            labHref: "/lab/chemistry/ch-calc-ph",
          },
        ],
      },
      {
        id: "chem11-qualitative",
        title: "Qualitative Analysis (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Detect Basic and Acid Radicals of a Given Salt",
            aim: "To identify the cation (basic radical) and anion (acid radical) of an unknown salt.",
            requirement: [
              "Unknown salt solution",
              "BaCl₂ solution (for SO₄²⁻)",
              "AgNO₃ solution (for Cl⁻)",
              "Na₂CO₃ solution (for Ca²⁺ / Ba²⁺)",
              "NH₄OH solution (for Zn²⁺ / Al³⁺)",
              "HCl / HNO₃ for acidification",
            ],
            theory: [
              "Basic radicals (cations) are detected by their characteristic precipitates with reagents like Na₂CO₃, NH₄OH, H₂S.",
              "Acid radicals (anions) are detected by their characteristic precipitates or effervescence with reagents like BaCl₂, AgNO₃, NaHCO₃.",
              "Ba²⁺ + CO₃²⁻ → BaCO₃↓ (white); Ca²⁺ + CO₃²⁻ → CaCO₃↓ (white).",
              "Zn²⁺ + 2NH₄OH → Zn(OH)₂↓ (white, dissolves in excess NH₄OH).",
              "SO₄²⁻ + Ba²⁺ → BaSO₄↓ (white); Cl⁻ + Ag⁺ → AgCl↓ (white, dissolves in NH₄OH).",
              "CO₃²⁻ + H⁺ → CO₂↑ (effervescence).",
            ],
            procedure: [
              "Dilute the salt solution with distilled water.",
              "Test for basic radicals: add NH₄OH, Na₂CO₃, H₂S to detect Zn²⁺, Ca²⁺, etc.",
              "Test for acid radicals: add BaCl₂ (SO₄²⁻), AgNO₃ (Cl⁻), NaHCO₃ (CO₃²⁻).",
              "Record all observations.",
            ],
            observation: [
              "White precipitate with Na₂CO₃ → Ca²⁺ or Ba²⁺.",
              "White precipitate with BaCl₂ → SO₄²⁻.",
              "White precipitate with AgNO₃ (dissolves in NH₄OH) → Cl⁻.",
              "Effervescence with NaHCO₃ → CO₃²⁻.",
            ],
            result:
              "Both the cation and the anion are identified from the characteristic precipitates and effervescence.",
            precautions: [
              "Always acidify with dilute HNO₃ before the AgNO₃ test (to remove interfering anions).",
              "Run a blank test to confirm the reagents themselves do not give the observed result.",
            ],
            labHref: "/lab/chemistry/ch-th-ionic",
          },
        ],
      },
      // ── Grade 12 ─────────────────────────────────────────────────────────
      {
        id: "chem12-recovery",
        title: "Recovery and Preparation of Salts (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "To Recover Blue Vitriol Crystals from a Mixture of Copper Sulphate and Sodium Chloride",
            aim: "To separate CuSO₄·5H₂O (blue vitriol) from NaCl by fractional crystallization.",
            requirement: [
              "Mixture of CuSO₄ and NaCl",
              "Distilled water",
              "Evaporating dish",
              "Filter paper and funnel",
              "Spirit lamp / hot plate",
            ],
            theory: [
              "CuSO₄ has a very steep solubility curve: highly soluble when hot, much less so when cold.",
              "NaCl has a nearly constant solubility with temperature.",
              "On cooling a hot saturated solution, CuSO₄·5H₂O crystallizes first; NaCl stays in solution.",
            ],
            procedure: [
              "Dissolve the mixture in a minimum amount of hot water.",
              "Filter hot to remove insoluble impurities.",
              "Allow the filtrate to cool slowly — blue vitriol crystallizes first.",
              "Separate the blue crystals by filtration.",
              "Evaporate the remaining mother liquor to recover NaCl.",
            ],
            observation: [
              "Blue CuSO₄·5H₂O crystals form on cooling.",
              "White NaCl crystals form from the concentrated mother liquor.",
            ],
            result:
              "Blue vitriol crystals are recovered from the mixture; the blue colour confirms copper sulphate pentahydrate.",
            precautions: [
              "Cool slowly to get larger, purer blue vitriol crystals.",
              "Do not evaporate the mother liquor to dryness for NaCl.",
            ],
            labHref: "/lab/chemistry/ch-calc-molarmass",
          },
          {
            title: "To Recover CaCO₃ from a Mixture of Sodium Carbonate and Calcium Chloride",
            aim: "To precipitate and recover CaCO₃ by double displacement.",
            requirement: [
              "Na₂CO₃ solution",
              "CaCl₂ solution",
              "Filter paper and funnel",
              "Desiccator / drying oven",
            ],
            theory: [
              "Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl.",
              "CaCO₃ is highly insoluble (Ksp ≈ 3.4 × 10⁻⁹) and precipitates as a white solid.",
            ],
            procedure: [
              "Mix equal volumes of Na₂CO₃ and CaCl₂ solutions in a beaker.",
              "A white precipitate of CaCO₃ forms.",
              "Filter the precipitate, wash it with distilled water, and dry it.",
            ],
            observation: [
              "A white curdy precipitate forms immediately on mixing the two solutions.",
            ],
            result:
              "CaCO₃ precipitate is recovered as a white solid.",
            precautions: [
              "Use dilute solutions to get a fine precipitate that is easier to filter.",
              "Wash the precipitate thoroughly to remove NaCl before drying.",
            ],
            labHref: "/lab/chemistry/ch-calc-stoich",
          },
        ],
      },
      {
        id: "chem12-volumetric",
        title: "Volumetric Analysis & Titration (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Standardization of NaOH Solution Using Standard HCl (Acid–Base Titration)",
            aim: "To determine the molarity of an NaOH solution by titrating against standard HCl.",
            requirement: [
              "Standard HCl solution (molarity known)",
              "Unknown NaOH solution",
              "Burette (50 mL)",
              "Pipette (25 mL)",
              "Conical flask",
              "Phenolphthalein / methyl orange indicator",
              "White tile",
            ],
            theory: [
              "NaOH + HCl → NaCl + H₂O.",
              "At the endpoint, moles of NaOH = moles of HCl: M(NaOH) × V(NaOH) = M(HCl) × V(HCl).",
              "M(NaOH) = M(HCl) × V(HCl) / V(NaOH).",
              "Phenolphthalein is pink in NaOH and colourless in HCl; the endpoint is the faint pink that persists for 30 s.",
            ],
            procedure: [
              "Rinse the burette with standard HCl and fill it; note the initial reading.",
              "Pipette 25 mL of NaOH into a conical flask on a white tile.",
              "Add 2–3 drops of phenolphthalein (solution turns pink).",
              "Titrate with HCl until the pink just disappears (endpoint).",
              "Record the final burette reading. Repeat 2 more times.",
              "Calculate the average titre and the molarity of NaOH.",
            ],
            observation: [
              "A table of initial, final and titre readings for 3 titrations is recorded.",
              "The endpoint is a faint pink colour that persists for about 30 s.",
            ],
            calculation: [
              "Example: M(HCl) = 0.100 M; average titre = 24.50 mL; V(NaOH) = 25.00 mL.",
              "M(NaOH) = (0.100 × 24.50) / 25.00 = 0.0980 M.",
            ],
            result:
              "The molarity of the NaOH solution is calculated from the average titre.",
            precautions: [
              "Use a white tile under the flask for a clearer endpoint.",
              "Add HCl slowly near the endpoint to avoid overshooting.",
              "Average at least 3 concordant titres (within 0.1 mL of each other).",
              "Rinse the burette with the HCl solution before filling it.",
            ],
            labHref: "/lab/chemistry/ch-calc-titration",
          },
          {
            title: "To Determine the Molar Mass of a Diprotic Organic Acid by Neutralisation",
            aim: "To find the molar mass of a diprotic organic acid (e.g. H₂C₂O₄·2H₂O) by titrating against standard NaOH.",
            requirement: [
              "Standard NaOH solution",
              "Diprotic organic acid solution (approx. 5 g/L)",
              "Burette, pipette, conical flask",
              "Phenolphthalein indicator",
            ],
            theory: [
              "For a diprotic acid H₂A: 2NaOH + H₂A → Na₂A + 2H₂O.",
              "2 moles of NaOH neutralize 1 mole of H₂A.",
              "2 × M(acid) × V(acid) = M(NaOH) × V(NaOH).",
              "M(acid) = M(NaOH) × V(NaOH) / (2 × V(acid)).",
            ],
            procedure: [
              "Pipette 25 mL of the acid into a conical flask with phenolphthalein.",
              "Titrate with standard NaOH to the pale-pink endpoint.",
              "Repeat for 3 concordant titres.",
              "Use the equation to find the molar mass.",
            ],
            observation: [
              "The endpoint is a faint pink colour that persists for 30 s.",
              "The average titre is calculated from 3 readings.",
            ],
            calculation: [
              "Example: M(NaOH) = 0.100 M; average titre = 30.00 mL; V(acid) = 25.00 mL.",
              "M(acid) = (0.100 × 30.00) / (2 × 25.00) = 0.0600 M.",
              "For H₂C₂O₄·2H₂O (M = 126 g/mol): 0.0600 M × 126 g/mol = 7.56 g/L (check against the prepared concentration).",
            ],
            result:
              "The molar mass of the diprotic acid is calculated; the ×2 factor for diprotic acids is applied correctly.",
            precautions: [
              "Do not forget the factor of 2 in the diprotic equation — this is the most common exam error.",
              "Use phenolphthalein for the endpoint (faint pink in a diprotic acid titration).",
              "Repeat until 3 concordant titres are obtained.",
            ],
            labHref: "/lab/chemistry/ch-calc-stoich",
          },
        ],
      },
      {
        id: "chem12-organic",
        title: "Organic Qualitative Tests (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "To Test for the Presence of a Carboxylic Acid (NaHCO₃ Test)",
            aim: "To confirm the presence of a carboxylic acid group in an organic sample.",
            requirement: [
              "Sample (e.g. benzoic acid)",
              "Saturated NaHCO₃ solution",
              "Limewater (Ca(OH)₂ solution)",
              "Test tubes and delivery tube",
            ],
            theory: [
              "RCOOH + NaHCO₃ → RCOONa + H₂O + CO₂↑.",
              "CO₂ turns limewater milky: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O.",
              "Alcohols do not react with NaHCO₃, so this test distinguishes carboxylic acids from alcohols.",
            ],
            procedure: [
              "Add a few drops of the sample to a test tube containing saturated NaHCO₃ solution.",
              "Observe effervescence.",
              "Pass the evolved gas through limewater.",
            ],
            observation: [
              "Effervescence (fizzing) is observed when the sample is added to NaHCO₃.",
              "Limewater turns milky, confirming CO₂.",
            ],
            result:
              "Effervescence and a milky limewater confirm the presence of a carboxylic acid group.",
            precautions: [
              "Use saturated NaHCO₃ — dilute solutions give weaker effervescence.",
              "Test a known alcohol alongside as a negative control.",
            ],
            labHref: "/lab/chemistry/ch-th-organic",
          },
          {
            title: "To Test for the Presence of an Aldehyde (Tollens' Reagent / 2,4-DNP Test)",
            aim: "To confirm the presence of an aldehyde group in an organic sample.",
            requirement: [
              "Sample (e.g. benzaldehyde or acetaldehyde)",
              "Tollens' reagent (ammoniacal AgNO₃)",
              "2,4-DNP reagent",
              "Water bath (60 °C)",
            ],
            theory: [
              "Aldehydes are oxidized by Tollens' reagent: RCHO + 2[Ag(NH₃)₂]⁺ + H₂O → RCOOH + 2Ag↓ + 4NH₃.",
              "The silver mirror confirms an aldehyde. Ketones do not react with Tollens' reagent.",
              "2,4-DNP gives an orange/yellow precipitate with both aldehydes and ketones (carbonyl group test).",
              "Combining both tests distinguishes aldehydes (Tollens' + 2,4-DNP positive) from ketones (Tollens' negative, 2,4-DNP positive).",
            ],
            procedure: [
              "Add the sample to Tollens' reagent in a clean test tube.",
              "Warm gently in a water bath (60 °C) for a few minutes.",
              "Observe the formation of a silver mirror on the inside of the tube.",
              "Separately, add the sample to 2,4-DNP reagent — observe the orange precipitate.",
            ],
            observation: [
              "A silver mirror forms on the inside of the test tube (Tollens' positive).",
              "An orange / yellow precipitate forms with 2,4-DNP.",
            ],
            result:
              "A silver mirror with Tollens' reagent confirms the presence of an aldehyde group.",
            precautions: [
              "Prepare Tollens' reagent fresh — do not store it (it can form explosive silver nitride).",
              "Do not use a flame to warm the Tollens' test — use a water bath only.",
            ],
            labHref: "/lab/chemistry/ch-th-organic",
          },
        ],
      },
    ],
  },
];

/** Get all practical subjects. */
export function getPracticalSubjects() {
  return PRACTICAL_SYLLABUS;
}

/** Find a single subject practical syllabus by slug. */
export function getPracticalBySlug(slug: string): SubjectPracticalSyllabus | undefined {
  return PRACTICAL_SYLLABUS.find((s) => s.slug === slug);
}

/** Total experiment count across all classes in a subject. */
export function totalExperiments(subject: SubjectPracticalSyllabus): number {
  return subject.units.reduce((sum, u) => sum + u.experiments.length, 0);
}

/**
 * Practical (lab) syllabus for NEB (+2) ΓÇö Biology, Physics, Chemistry.
 *
 * Every experiment is written in the standard NEB practical-record order:
 *   Aim ΓåÆ Requirement ΓåÆ Theory ΓåÆ Procedure ΓåÆ Observation ΓåÆ Calculation ΓåÆ Result ΓåÆ Precautions
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
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  //  BIOLOGY  (Botany + Zoology)
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  {
    slug: "biology",
    name: "Biology Practical",
    description:
      "NEB Class 11 & 12 Biology practical syllabus (Bio 301 & 302) ΓÇö cell biology, floral diversity, genetics, ecology, human physiology and field work, written in the standard NEB practical-record format.",
    emoji: "≡ƒº½",
    colorClass: "from-emerald-500 to-teal-500",
    units: [
      // ΓöÇΓöÇ Grade 11 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
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
              "Light microscope (10├ù and 40├ù objectives)",
            ],
            theory: [
              "A plant cell is bounded by a rigid cell wall and contains a distinct nucleus, cytoplasm and vacuoles.",
              "Iodine stains the nucleus and starch grains blue-black, making them clearly visible under the microscope.",
            ],
            procedure: [
              "Peel a thin layer of inner epidermis from an onion bulb using forceps.",
              "Place the peel on a clean slide and add one drop of iodine solution.",
              "Cover with a cover slip, avoiding air bubbles.",
              "Observe under the 10├ù objective, then switch to 40├ù for detail.",
              "Draw and label the observed cells (cell wall, nucleus, cytoplasm).",
            ],
            observation: [
              "Rectangular plant cells are seen in rows.",
              "The nucleus appears as a dark blue-black oval inside the cytoplasm.",
              "The cell wall is the outermost boundary of each cell.",
            ],
            result:
              "The rectangular plant cell with a distinct cell wall, nucleus and cytoplasm is clearly observed under 40├ù magnification.",
            precautions: [
              "Use only one drop of iodine ΓÇö over-staining obscures cellular detail.",
              "Avoid air bubbles under the cover slip.",
              "Start at low power (10├ù) before switching to 40├ù.",
            ],
            
          },
          {
            title: "Observation of Human Cheek Cells (Animal Cell)",
            aim: "To compare the structure of an animal cell with a plant cell.",
            requirement: [
              "Sterile toothpick or cotton swab",
              "Normal saline (0.9 % NaCl)",
              "Methylene blue solution (stain)",
              "Glass slide and cover slip",
              "Light microscope (10├ù and 40├ù)",
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
              "Observe under 10├ù and 40├ù magnification.",
              "Draw and label the cells.",
            ],
            observation: [
              "Irregularly shaped animal cells are visible.",
              "The nucleus is clearly stained blue and is central.",
              "No cell wall or chloroplasts are present.",
            ],
            result:
              "The animal cell has an irregular shape, a stained nucleus and no cell wall or chloroplast ΓÇö confirming the key differences from a plant cell.",
            precautions: [
              "Use isotonic saline to prevent cell lysis.",
              "Do not press too hard with the cover slip.",
              "Keep the smear thin for clear focusing.",
            ],
            
          },
          {
            title: "Temporary Mount of a Pond Water Sample (Micro-organisms)",
            aim: "To identify protozoan / unicellular micro-organisms in pond water.",
            requirement: [
              "Fresh pond water sample",
              "Glass slide and cover slip",
              "Iodine (optional, for staining)",
              "Light microscope (10├ù and 40├ù)",
            ],
            theory: [
              "Pond water contains a variety of unicellular and multicellular micro-organisms, including Amoeba, Paramecium, Euglena and various algae.",
              "Each organism has a characteristic locomotion method: pseudopodia (Amoeba), cilia (Paramecium), flagellum (Euglena).",
            ],
            procedure: [
              "Collect a fresh pond water sample.",
              "Place a small drop on a clean slide.",
              "Cover with a cover slip (do not press hard ΓÇö the organisms are alive and will move).",
              "Observe under 10├ù to locate moving organisms, then 40├ù for detail.",
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
              "Use a thin film to focus clearly at 40├ù.",
              "Label each identified species.",
            ],
            
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
              "Use the key in a specific sequence ΓÇö do not skip steps.",
              "Handle herbarium specimens with care.",
            ],
            
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
            
          },
        ],
      },
      // ΓöÇΓöÇ Grade 12 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
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
              "Light microscope (10├ù and 40├ù)",
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
              "Focus carefully at 40├ù to distinguish Cambium layers.",
              "Do not confuse monocot stem's scattered bundles with an artifact.",
            ],
            
          },
          {
            title: "Temporary Mount of Onion Root Tip to Study Mitosis",
            aim: "To observe the different stages of mitosis in dividing plant cells.",
            requirement: [
              "Growing onion root tips (1ΓÇô2 cm, grown in water for 24 h)",
              "Acetocarmine or orcein stain",
              "Cresol violet (optional)",
              "Slide, cover slip, forceps",
              "Light microscope (10├ù and 40├ù)",
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
              "Scan under 10├ù to locate the region of active division, then 40├ù.",
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
              "Metaphase cells are the easiest to draw ΓÇö use them for the main figure.",
              "Avoid crushing the cells too hard; the chromosomes will become invisible.",
              "Use fresh, actively growing root tips (1ΓÇô2 cm from the tip).",
            ],
            
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
              "Ensure no leaks at the corkΓÇôpotato interface.",
              "Use the same potato variety and the same time interval for all concentrations.",
            ],
            
          },
          {
            title: "Study of Plasmolysis in Epidermal Peels (e.g. Rhoeo leaves)",
            aim: "To observe plasmolysis and de-plasmolysis in coloured epidermal cells.",
            requirement: [
              "Rhoeo discolor / onion epidermal peel",
              "Strong NaCl or sugar solution",
              "Distilled water",
              "Slides and cover slips",
              "Light microscope (10├ù and 40├ù)",
            ],
            theory: [
              "Plasmolysis occurs when the external solution has a lower water potential than the cell sap, so water leaves the cell and the living protoplast shrinks away from the rigid cell wall.",
              "In distilled water the process reverses ΓÇö de-plasmolysis.",
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
              "Avoid over-staining or using too strong a solution ΓÇö cells may die.",
            ],
            
          },
          {
            title: "Study of the Rate of Respiration in Germinating Seeds",
            aim: "To show that respiration in germinating seeds releases heat and COΓéé.",
            requirement: [
              "Germinating seeds (moistened and kept for 48 h)",
              "Two identical flasks / thermometers",
              "Limewater",
              "Graph paper",
            ],
            theory: [
              "Respiration is the oxidation of food (CΓéåHΓéüΓééOΓéå + 6OΓéé ΓåÆ 6COΓéé + 6HΓééO + energy).",
              "Energy released is partly lost as heat; COΓéé is a gaseous product.",
              "Limewater (Ca(OH)Γéé solution) turns milky in the presence of COΓéé: Ca(OH)Γéé + COΓéé ΓåÆ CaCOΓéâΓåô + HΓééO.",
            ],
            procedure: [
              "Place germinating seeds in one flask and a non-germinating control in another.",
              "Fit each with a thermometer; record the temperature at regular intervals.",
              "Pipe the air from the germinating seeds through limewater to test for COΓéé.",
              "Compare the temperature rise and limewater change between the two flasks.",
            ],
            observation: [
              "The germinating seeds show a temperature rise over time.",
              "Limewater turns milky when the air from germinating seeds is passed through it.",
              "The non-germinating control shows little temperature change and no limewater reaction.",
            ],
            result:
              "Germinating seeds produce heat and COΓéé, confirming active respiration; the control confirms the difference is due to active respiration.",
            precautions: [
              "Keep the two flasks identical in size and initial temperature.",
              "Use the same number of seeds in both flasks.",
            ],
            
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
            aim: "To observe dominant and recessive traits in the FΓéé generation and illustrate Mendel's Law of Segregation.",
            requirement: [
              "Mendel pea seeds of contrasting colours / sizes (or FΓéü and FΓéé data set)",
              "Data table",
              "Punnett square sheet",
            ],
            theory: [
              "Mendel's Law of Segregation: the two alleles of a gene separate equally during gamete formation, so each gamete carries only one allele.",
              "For a monohybrid cross Tt ├ù Tt, the expected FΓéé genotypes are 1 TT : 2 Tt : 1 tt, giving a 3:1 phenotypic ratio.",
            ],
            procedure: [
              "Note the contrasting traits in the seeds (round vs wrinkled, yellow vs green).",
              "Record the proportion of each phenotype in the FΓéé data set.",
              "Work out the expected 3:1 ratio for a monohybrid cross.",
              "Compare observed vs expected ratios.",
            ],
            observation: [
              "The FΓéé generation shows approximately 3 dominant : 1 recessive for each trait.",
              "The observed ratio is close to the expected Mendelian ratio.",
            ],
            result:
              "Mendel's Law of Segregation is illustrated: the FΓéé generation shows a 3:1 dominant:recessive phenotypic ratio.",
            precautions: [
              "Use a large enough sample to reduce chance deviation from 3:1.",
              "Record both observed and expected values for comparison.",
            ],
            
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
              "Rhizobium bacteria in the root nodules of legumes fix atmospheric NΓéé into ammonium, which is usable by the plant.",
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
              "Light microscope (10├ù and 40├ù)",
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
              "Label each structure before drawing ΓÇö it is easier to identify at 40├ù.",
              "Do not confuse RBCs with platelets (RBCs are much larger).",
            ],
            
          },
          {
            title: "Study of Mitosis in Grasshopper Testis (Permanent Slide)",
            aim: "To observe the stages of mitosis in an animal cell and compare with plant mitosis.",
            requirement: [
              "Grasshopper testis permanent slide",
              "Light microscope (10├ù and 40├ù)",
              "Reference mitosis diagram",
            ],
            theory: [
              "Mitosis in animal cells shows the same five stages as in plant cells.",
              "The key difference is the absence of a cell wall ΓÇö the animal cell rounds up during division instead of forming a cell plate.",
            ],
            procedure: [
              "Scan the slide under 10├ù to locate dividing cells, then switch to 40├ù.",
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
              "Look for metaphase cells first ΓÇö the chromosomes are most distinct.",
              "Label each stage clearly.",
            ],
            
          },
          {
            title: "Study of Frog Developmental Stages (Fertilized Egg, Cleavage, Blastula, Gastrula)",
            aim: "To observe early embryonic development in the frog from permanent slides.",
            requirement: [
              "Permanent slides of frog developmental stages",
              "Light microscope (10├ù and 40├ù)",
              "Reference developmental diagram",
            ],
            theory: [
              "Frog development: Zygote ΓåÆ Cleavage (morula) ΓåÆ Blastula (with blastocoel cavity) ΓåÆ Gastrula (3 germ layers).",
              "Gastrulation is the key event: invagination forms the three germ layers ΓÇö ectoderm, mesoderm and endoderm.",
            ],
            procedure: [
              "Examine the fertilized egg (zygote) slide.",
              "Examine the cleavage (morula) slide.",
              "Examine the blastula slide ΓÇö note the hollow blastocoel cavity.",
              "Examine the gastrula slide and identify the three germ layers.",
            ],
            observation: [
              "Zygote: single large cell with a visible nucleus.",
              "Morula: solid ball of cells.",
              "Blastula: hollow ball with a blastocoel cavity.",
              "Gastrula: invagination (archenteron) and three distinct germ layers.",
            ],
            result:
              "The successive developmental stages are identified in the correct order: zygote ΓåÆ cleavage ΓåÆ blastula ΓåÆ gastrula.",
            precautions: [
              "Memorise the order of the stages.",
              "Draw the gastrula with all three germ layers labelled.",
            ],
            
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
            
          },
          {
            title: "Detect the Presence of Protein in a Given Sample (Biuret Test)",
            aim: "To test a sample for protein using Biuret reagent.",
            requirement: [
              "Sample (e.g. egg white, milk)",
              "Biuret reagent (CuSOΓéä + NaOH)",
              "Test tubes",
            ],
            theory: [
              "Biuret reagent (Cu┬▓Γü║ in alkaline solution) reacts with the peptide bonds in proteins to form a purple/violet complex.",
              "A purple/violet colour is positive; a blue colour (colour of CuSOΓéä) is negative.",
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
            
          },
          {
            title: "Effect of Temperature and pH on the Activity of Salivary Amylase",
            aim: "To show that salivary amylase works optimally at body temperature and near-neutral pH.",
            requirement: [
              "Saliva (or amylase solution)",
              "Starch solution",
              "Iodine solution",
              "Water baths at various temperatures (0 ┬░C, room, 37 ┬░C, 100 ┬░C)",
              "Buffer solutions (acidic and alkaline)",
            ],
            theory: [
              "Amylase is an enzyme that breaks down starch into maltose.",
              "Enzymes have an optimal temperature (~37 ┬░C) and optimal pH (near-neutral for amylase).",
              "At extreme temperatures the enzyme denatures and loses its active site shape; the reaction stops.",
            ],
            procedure: [
              "Mix saliva with starch solution and incubate at different temperatures / pH in water baths.",
              "At intervals, take a drop of the mixture and add it to iodine.",
              "Note when the starch has been completely digested (no blue-black colour).",
              "Compare the time taken at different conditions.",
            ],
            observation: [
              "Starch disappears fastest at ~37 ┬░C and near-neutral pH.",
              "At high temperature (100 ┬░C) and extreme pH, starch persists longer ΓÇö the enzyme is denatured.",
            ],
            result:
              "Amylase is most active at body temperature (~37 ┬░C) and near-neutral pH; the time until the blue-black colour disappears is a measure of the rate of digestion.",
            precautions: [
              "Use the same amount of saliva and starch in each tube.",
              "Check each sample at the same time intervals.",
            ],
            
          },
          {
            title: "Detect the Presence of Sugar in Human Blood (Benedict's Test)",
            aim: "To test a blood sample for reducing sugar (glucose) using Benedict's reagent.",
            requirement: [
              "Blood or diluted sample",
              "Benedict's reagent (CuSOΓéä + citrate + NaΓééCOΓéâ)",
              "Water bath",
              "Test tubes",
            ],
            theory: [
              "Benedict's reagent (blue Cu┬▓Γü║ in alkaline solution) is reduced by glucose (a reducing sugar) to a green/yellow/brick-red precipitate of CuΓééO.",
              "The colour depends on the sugar concentration: green (low) ΓåÆ yellow ΓåÆ brick-red (high).",
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
              "Do not boil directly ΓÇö use a water bath.",
              "Keep the sample concentration low enough to get a clear colour distinction.",
            ],
            
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
              "Pivot joints (neck ΓÇö atlas/axis) allow rotation.",
            ],
            result:
              "The main bones are identified and the joint types are listed with examples.",
            precautions: [
              "Use the 3D model to visualise joint movement in three dimensions.",
              "Label each joint type clearly on the diagram.",
            ],
            
          },
        ],
      },
      {
        id: "bio12-field",
        title: "Field Work & Project (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Sample Project ΓÇö Survey on Local Communicable Diseases",
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
            
          },
        ],
      },
    ],
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  //  PHYSICS
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  {
    slug: "physics",
    name: "Physics Practical",
    description:
      "NEB Class 11 & 12 Physics practical syllabus (Phy 101 & 102) ΓÇö mechanics, heat determinations, electricity, waves & optics experiments, written in the standard NEB practical-record format.",
    emoji: "ΓÜù∩╕Å",
    colorClass: "from-sky-500 to-blue-500",
    units: [
      // ΓöÇΓöÇ Grade 11 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
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
              "Vernier calipers: reading = main scale reading + (vernier coincidence ├ù least count).",
              "Screw gauge: reading = main scale reading + (circular scale reading ├ù least count).",
              "All measurements must be recorded to the least count of the instrument.",
            ],
            procedure: [
              "Find the least count of the vernier calipers (main scale ├╖ number of vernier divisions).",
              "Measure the external diameter of the object at five positions and average.",
              "Find the least count of the screw gauge.",
              "Measure the thickness of a thin sheet and average five readings.",
            ],
            observation: [
              "Five readings are taken at different positions for each object.",
              "The average values are recorded to the correct number of significant figures.",
            ],
            calculation: [
              "Example (caliper, LC = 0.01 cm): main scale = 2.3 cm + vernier coincidence 0.6 ├ù 0.01 cm = 2.36 cm.",
              "Average of 5 readings = (sum of readings) / 5.",
            ],
            result:
              "The object is measured to the correct significant figures using both instruments; the least count of each is stated.",
            precautions: [
              "Check for zero error before each measurement.",
              "Take readings at the same orientation for each measurement.",
              "Record all values to the least count of the instrument.",
            ],
            
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
              "For a simple pendulum, the period is T = 2╧Ç ΓêÜ(L / g).",
              "Rearranging: T┬▓ = (4╧Ç┬▓ / g) ┬╖ L. This is the equation of a straight line y = mx where y = T┬▓, x = L and slope m = 4╧Ç┬▓ / g.",
              "Therefore g = 4╧Ç┬▓ / slope.",
            ],
            procedure: [
              "Suspend a small, dense bob with a thread of about 1 m length.",
              "Displace the bob with a small amplitude (< 10┬░) and release.",
              "Measure the time for 20 oscillations using a stopwatch.",
              "Change the length and repeat for 5 different lengths (40 cm to 100 cm).",
              "Plot L on the y-axis and T┬▓ on the x-axis.",
              "Find the slope of the straight line.",
            ],
            observation: [
              "A table of L, T (20 oscillations), and T┬▓ (per oscillation) is recorded.",
              "The L vs T┬▓ graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: if L = 1.00 m gives T = 2.01 s, then T┬▓ = 4.04 s┬▓.",
              "Slope = L / T┬▓ = 1.00 / 4.04 Γëê 0.248 m/s┬▓.",
              "g = 4╧Ç┬▓ / 0.248 Γëê 39.47 / 0.248 Γëê 9.8 m/s┬▓.",
            ],
            result:
              "g is determined to be approximately 9.8 m/s┬▓, matching the standard value at sea level.",
            precautions: [
              "Use a small amplitude so the period is independent of amplitude.",
              "Take the average of at least 20 oscillations to reduce stopwatch error.",
              "Ensure the bob is small and dense to minimize air resistance.",
            ],
            
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
              "Moment of a force = force ├ù perpendicular distance from the pivot.",
            ],
            procedure: [
              "Balance the metre rule on a knife-edge support at its centre.",
              "Suspend two weights on opposite sides at chosen distances from the pivot.",
              "Adjust the distances until the rule is in equilibrium.",
              "Record the forces and distances on each side.",
              "Show numerically that FΓéü ├ù dΓéü = FΓéé ├ù dΓéé.",
            ],
            observation: [
              "The rule is in horizontal equilibrium when the moments are balanced.",
              "The products FΓéüdΓéü and FΓéédΓéé are equal (within experimental error).",
            ],
            result:
              "The principle of moments is verified: the clockwise moment equals the anticlockwise moment.",
            precautions: [
              "Ensure the rule is balanced (horizontal) before taking readings.",
              "Use small weights to reduce the risk of sudden imbalance.",
              "Record the distance from the pivot to the point of suspension, not to the weight's centre.",
            ],
            
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
            aim: "To measure the coefficient of linear expansion ╬▒ of a metal rod.",
            requirement: [
              "Searle's apparatus",
              "Metal rod (e.g. brass)",
              "Spirit lamp / steam generator",
              "Thermometer",
              "Vernier calipers",
            ],
            theory: [
              "Coefficient of linear expansion ╬▒ = (change in length) / (original length ├ù temperature rise) = ╬öL / (LΓéÇ ┬╖ ╬öT).",
              "The micrometer in Searle's apparatus measures ╬öL directly as the rod expands.",
            ],
            procedure: [
              "Measure the initial length LΓéÇ of the rod with a vernier caliper.",
              "Place the rod in the Searle apparatus and pass steam through the tube.",
              "Record the initial and final micrometer readings as the rod heats up.",
              "Record the temperature rise ╬öT from the thermometer.",
              "Calculate ╬▒ = ╬öL / (LΓéÇ ┬╖ ╬öT).",
            ],
            observation: [
              "The micrometer reading increases as the rod heats up (╬öL is positive).",
              "The thermometer shows a steady temperature rise.",
            ],
            calculation: [
              "Example: LΓéÇ = 50.0 cm = 0.500 m; ╬öL = 0.002 m; ╬öT = 100 ┬░C.",
              "╬▒ = 0.002 / (0.500 ├ù 100) = 4 ├ù 10Γü╗Γü╡ /┬░C (typical for steel Γëê 1.2 ├ù 10Γü╗Γü╡ /┬░C for brass).",
            ],
            result:
              "╬▒ for the metal rod is approximately 1.2 ├ù 10Γü╗Γü╡ /┬░C (brass) or 1.0 ├ù 10Γü╗Γü╡ /┬░C (steel).",
            precautions: [
              "Use steam (not boiling water) for a uniform and higher temperature.",
              "Ensure the apparatus is free from external vibrations.",
              "Allow the rod to cool before removing it from the apparatus.",
            ],
            
          },
          {
            title: "Drawing a Heating Curve of a Substance",
            aim: "To observe the temperature-time profile during melting and boiling, and identify the latent heat regions.",
            requirement: [
              "Substance (e.g. solid wax / ice)",
              "Thermometer (0ΓÇô100 ┬░C)",
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
            
          },
        ],
      },
      {
        id: "phy11-electricity",
        title: "Electricity",
        grade: "class-11",
        experiments: [
          {
            title: "Verification of Ohm's Law (VΓÇôI Graph for a Fixed Resistor)",
            aim: "To verify that the potential difference across a conductor is proportional to the current through it (V = IR).",
            requirement: [
              "Battery / cell",
              "Fixed resistor (e.g. 10 ╬⌐)",
              "Ammeter (0ΓÇô1 A)",
              "Voltmeter (0ΓÇô3 V)",
              "Rheostat",
              "Key and connecting wires",
            ],
            theory: [
              "Ohm's law: V = IR, where R is constant for a conductor at constant temperature.",
              "The VΓÇôI graph is a straight line through the origin; its slope = R.",
            ],
            procedure: [
              "Set up a series circuit: battery, key, rheostat, ammeter and resistor in series; voltmeter in parallel with the resistor.",
              "Close the key and adjust the rheostat to get a reading on the ammeter.",
              "Record the voltage (V) and current (I) at 5ΓÇô6 settings.",
              "Plot V on the y-axis and I on the x-axis.",
              "Find the slope of the straight line.",
            ],
            observation: [
              "A table of V and I at 5ΓÇô6 settings is recorded.",
              "The VΓÇôI graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: slope = ╬öV / ╬öI = (2.4 V ΓêÆ 0.4 V) / (0.24 A ΓêÆ 0.04 A) = 2.0 / 0.20 = 10 ╬⌐.",
              "R = 10 ╬⌐ (matches the labelled resistance).",
            ],
            result:
              "Ohm's law is verified: the VΓÇôI graph is linear and the slope equals the resistance.",
            precautions: [
              "Start from zero current and build up gradually to avoid initial errors.",
              "If the line curves at high currents, the resistor is heating ΓÇö stop before the resistance changes.",
              "Keep the temperature of the resistor constant (do not touch it with hands).",
            ],
            
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
              "Kirchhoff's first law (junction law): ╬úI_in = ╬úI_out. This is a statement of conservation of charge.",
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
              "The two branch currents (IΓéü and IΓéé) are read from the branch ammeters.",
              "I_total Γëê IΓéü + IΓéé (within 1ΓÇô2 % experimental error).",
            ],
            result:
              "Kirchhoff's first law is verified: the sum of currents entering the junction equals the sum leaving it.",
            precautions: [
              "Use low-resistance resistors to avoid very high currents.",
              "Check that all connections are secure before closing the key.",
              "Keep the circuit open while taking the readings to avoid heating.",
            ],
            
          },
        ],
      },
      // ΓöÇΓöÇ Grade 12 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
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
              "For a liquid capillary tube of radius r, the height of rise h is given by: h = 2T cos ╬╕ / (╧ügr).",
              "Rearranging: h = (2T / (╧üg)) ┬╖ (1/r) = (2T / (╧üg)) ┬╖ (1/d) ├ù 2 (since r = d/2).",
              "Plotting h against 1/d gives a straight line through the origin with slope = 2T/(╧üg), so T = (╧üg/2) ├ù slope.",
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
              "Example: slope = 0.0012 m ┬╖ m; T = (1000 kg/m┬│ ├ù 9.8 m/s┬▓ / 2) ├ù 0.0012 m┬▓ = 0.0588 N/m Γëê 0.059 N/m (Γëê 59 dyn/cm).",
            ],
            result:
              "The surface tension of water is measured as approximately 0.059 N/m at room temperature.",
            precautions: [
              "Ensure the capillary tubes are clean ΓÇö grease or dirt reduces the contact angle.",
              "Use a travelling microscope to read the meniscus height accurately.",
              "Keep the water temperature constant throughout the experiment.",
            ],
            
          },
          {
            title: "Determination of the Coefficient of Viscosity of a Liquid by Stoke's Method",
            aim: "To find the coefficient of viscosity ╬╖ of a liquid from the terminal velocity of falling balls.",
            requirement: [
              "Six metal balls of different diameters",
              "Glass cylinder with the test liquid",
              "Stopwatch",
              "Vernier callipers",
              "Thermometer",
            ],
            theory: [
              "Stoke's law: drag force F = 6╧Ç╬╖rv where r is the radius and v is the terminal velocity.",
              "At terminal velocity, drag = net weight: 6╧Ç╬╖rv = (4/3)╧Çr┬│g(╧ü_ball ΓêÆ ╧ü_liquid).",
              "Solving for v: v = (2r┬▓g(╧ü_ball ΓêÆ ╧ü_liquid)) / (9╬╖).",
              "Time to fall distance L: t = L/v = 9╬╖L / (2r┬▓g(╧ü_ball ΓêÆ ╧ü_liquid)).",
              "Plotting t vs d (diameter) gives a straight line through the origin; slope = 9╬╖L / (2 ├ù (4/9)d┬▓ ├ù g(╧ü_ballΓêÆ╧ü_liquid)).",
            ],
            procedure: [
              "Measure the diameter of each of the six balls with a vernier calliper.",
              "Release each ball in the cylinder and time its fall over a known distance L.",
              "Record the temperature of the liquid.",
              "Plot time t against diameter d.",
              "Use the slope to compute ╬╖.",
            ],
            observation: [
              "A table of diameter d, time t, and the product d ├ù t is recorded.",
              "The t vs d graph is a straight line through the origin.",
            ],
            calculation: [
              "Example: L = 0.5 m, slope (t/d┬▓) = 0.4 s/m┬▓.",
              "╬╖ = slope ├ù 2g(╧ü_ball ΓêÆ ╧ü_liquid) / 9L (use the correct form from the derivation).",
              "╬╖ Γëê 1.14 ├ù 10Γü╗┬│ N┬╖s/m┬▓ (for glycerine at 20 ┬░C).",
            ],
            result:
              "The coefficient of viscosity of the liquid is calculated from the slope of the t vs d┬▓ graph.",
            precautions: [
              "Use clean, smooth balls to reduce surface roughness effects.",
              "Ensure the balls are released gently to avoid initial turbulence.",
              "Keep the liquid at a constant temperature ΓÇö viscosity is temperature-dependent.",
            ],
            
          },
        ],
      },
      {
        id: "phy12-waves",
        title: "Waves & Optics (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Determination of the Wavelength of HeΓÇôNe Laser Light Using a Plane Diffraction Grating",
            aim: "To find the wavelength of a HeΓÇôNe laser from a plane diffraction grating.",
            requirement: [
              "HeΓÇôNe laser",
              "Plane diffraction grating",
              "Screen",
              "Metre scale",
            ],
            theory: [
              "For a plane diffraction grating, the condition for the m-th order maximum is: d sin ╬╕ = m╬╗, where d is the grating spacing and ╬╗ is the wavelength.",
              "For the first order (m = 1): sin ╬╕ = ╬╗ / d, so ╬╗ = d sin ╬╕.",
            ],
            procedure: [
              "Set up the laser and the grating in front of a screen at a known distance D.",
              "Observe the central bright fringe and the first-order fringes on either side.",
              "Measure the distance between the two first-order fringes (2y).",
              "Calculate sin ╬╕ Γëê y / D (for small angles).",
              "Use ╬╗ = d sin ╬╕ to compute the wavelength.",
            ],
            observation: [
              "The central bright fringe is the brightest; first-order fringes are visible on either side.",
              "The distance 2y between the two first-order fringes is measured.",
            ],
            calculation: [
              "Example: D = 2.0 m, y = 0.05 m (first-order fringe at 5 cm from centre), grating spacing d = 1/600 mm = 1.67 ├ù 10Γü╗Γü╢ m.",
              "sin ╬╕ Γëê 0.05 / 2.0 = 0.025.",
              "╬╗ = 1.67 ├ù 10Γü╗Γü╢ ├ù 0.025 Γëê 4.2 ├ù 10Γü╗Γü╕ m (Γëê 420 nm ΓÇö use the correct grating spacing for HeΓÇôNe: d Γëê 1/6000 mm gives ╬╗ Γëê 632.8 nm).",
            ],
            result:
              "The wavelength of the HeΓÇôNe laser is measured to be approximately 632.8 nm (red light).",
            precautions: [
              "Do not look directly into the laser beam.",
              "Keep the grating perpendicular to the laser beam.",
              "Use a fixed distance D for all readings.",
            ],
            
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
              "In a closed tube, resonance occurs when the air column length = ╬╗/4 (first resonance) or 3╬╗/4 (second resonance).",
              "The difference lΓéé ΓêÆ lΓéü = ╬╗/2, so ╬╗ = 2(lΓéé ΓêÆ lΓéü) and v = 2n(lΓéé ΓêÆ lΓéü).",
            ],
            procedure: [
              "Strike the tuning fork and bring it near the open end of the tube.",
              "Adjust the water level until the first resonance (maximum sound) is heard. Record lΓéü.",
              "Continue lowering the water until the second resonance is heard. Record lΓéé.",
              "Correct for end correction: v = 2n(lΓéé ΓêÆ lΓéü).",
              "Record the temperature to relate the speed to NTP.",
            ],
            observation: [
              "Two resonances are heard as the water level is lowered.",
              "The lengths lΓéü and lΓéé are measured.",
            ],
            calculation: [
              "Example: n = 512 Hz, lΓéü = 0.15 m, lΓéé = 0.45 m.",
              "v = 2 ├ù 512 ├ù (0.45 ΓêÆ 0.15) = 2 ├ù 512 ├ù 0.30 = 307.2 m/s.",
              "Corrected to NTP (0 ┬░C): v_NTP = 307.2 ├ù 273/(273 + T_room) Γëê 332 m/s.",
            ],
            result:
              "The velocity of sound at room temperature is found; corrected to NTP it is approximately 332 m/s.",
            precautions: [
              "Use a clean, dry tuning fork to avoid frequency changes.",
              "Measure the resonances carefully ΓÇö the first resonance is the faintest.",
              "Keep the room temperature constant during the experiment.",
            ],
            
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
              "For a stretched wire, the resonating length L is inversely proportional to the fork frequency n for a particular harmonic: L Γê¥ 1/n.",
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
              "The mains frequency is the value of n when L = 0 on the extrapolated line (Γëê 50 Hz for Nepal / India).",
            ],
            result:
              "The frequency of the mains is read from the graph and found to be approximately 50 Hz.",
            precautions: [
              "Keep the tension in the wire constant for all readings.",
              "Use the same harmonic for all forks.",
            ],
            
          },
        ],
      },
      {
        id: "phy12-electricity",
        title: "Electricity & Magnetism (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Use of a Potentiometer ΓÇö Comparison of E.M.F.s of Two Cells",
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
              "At the balance point of a potentiometer, no current flows through the galvanometer, so the emf of the cell is equal to the potential drop along the wire: E Γê¥ l (where l is the balance length).",
              "Therefore E_A / E_B = l_A / l_B, where l_A and l_B are the balance lengths for cells A and B respectively.",
            ],
            procedure: [
              "Set up the potentiometer with the standard cell.",
              "Find the balance point for the standard cell (lΓéÇ).",
              "Find the balance point for cell A (l_A) and cell B (l_B).",
              "The ratio of emfs is E_A / E_B = l_A / l_B.",
            ],
            observation: [
              "A table of balance lengths for the standard cell, cell A and cell B is recorded.",
              "The ratio l_A / l_B is calculated.",
            ],
            calculation: [
              "Example: l_A = 80 cm, l_B = 60 cm ΓåÆ E_A / E_B = 80/60 = 4/3.",
              "If E_A = 1.5 V, then E_B = 1.5 ├ù 3/4 = 1.125 V.",
            ],
            result:
              "The ratio of the emfs of the two cells is found without internal resistance affecting the result.",
            precautions: [
              "Ensure the potentiometer wire is uniform and not stretched.",
              "Use the jockey with a light contact to avoid damaging the wire.",
              "Keep the cell (driver) constant throughout the experiment.",
            ],
            
          },
          {
            title: "Use of a Potentiometer ΓÇö Determination of the Internal Resistance of a Cell",
            aim: "To find the internal resistance of a cell using a potentiometer.",
            requirement: [
              "Potentiometer",
              "Cell (unknown internal resistance)",
              "Resistance box",
              "Galvanometer, jockey, key",
            ],
            theory: [
              "Open-circuit emf E = k ┬╖ lΓéü (k = potential gradient).",
              "Terminal voltage with resistance R in parallel: V = k ┬╖ lΓéé.",
              "Internal resistance: r = (E ΓêÆ V) / I, and since I = V/R, then r = R(lΓéü ΓêÆ lΓéé) / lΓéé.",
            ],
            procedure: [
              "Find the balance length lΓéü with no resistance box connected (open circuit).",
              "Connect the resistance box in parallel with the cell and find the new balance length lΓéé.",
              "Read the resistance R from the resistance box.",
              "Calculate r = R(lΓéü ΓêÆ lΓéé) / lΓéé.",
            ],
            observation: [
              "A table of balance lengths lΓéü, lΓéé and the resistance R is recorded.",
            ],
            calculation: [
              "Example: lΓéü = 90 cm, lΓéé = 60 cm, R = 5 ╬⌐.",
              "r = 5 ├ù (90 ΓêÆ 60) / 60 = 5 ├ù 30/60 = 2.5 ╬⌐.",
            ],
            result:
              "The internal resistance of the cell is calculated from the ratio of balance lengths.",
            precautions: [
              "Keep the resistance box at zero when finding lΓéü (open circuit).",
              "Use a high resistance value to avoid drawing too much current from the cell.",
            ],
            
          },
          {
            title: "Study of the Variation of Resistance of a Thermistor with Temperature",
            aim: "To show that a thermistor's resistance decreases as temperature increases (NTC thermistor).",
            requirement: [
              "Thermistor (NTC)",
              "Water bath with spirit lamp",
              "Thermometer (0ΓÇô100 ┬░C)",
              "Multimeter / Ohmmeter",
            ],
            theory: [
              "An NTC (Negative Temperature Coefficient) thermistor is a semiconductor whose resistance falls as temperature rises.",
              "The RΓÇôT curve is a steep downward curve: as T increases, R decreases exponentially.",
            ],
            procedure: [
              "Place the thermistor in a water bath and measure its resistance at each temperature.",
              "Raise the temperature step by step (e.g. every 10 ┬░C), recording resistance at each step.",
              "Plot resistance against temperature.",
            ],
            observation: [
              "A table of temperature and corresponding resistance is recorded.",
              "The RΓÇôT curve shows a falling (steep downward) curve.",
            ],
            result:
              "The NTC thermistor's resistance falls with increasing temperature, confirming its temperature-sensing property.",
            precautions: [
              "Stir the water bath gently to keep the temperature uniform.",
              "Wait for the thermistor to reach thermal equilibrium before each reading.",
            ],
            
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
              "The field of a bar magnet in the tangent position at distance d from its centre: B = (╬╝ΓéÇ/4╧Ç) ├ù 2Md/d┬│ where M is the magnetic moment.",
              "The magnetometer gives B = HΓéÇ tan ╬╕, where HΓéÇ is the horizontal component of Earth's magnetic field.",
              "Equating: M = (HΓéÇ/2) ├ù (4╧Ç/╬╝ΓéÇ) ├ù d┬│ tan ╬╕. Pole strength m = M / (2l) where l is the half-length of the magnet.",
            ],
            procedure: [
              "Place the magnet at a known distance from the magnetometer in the tangent position (magnet axis perpendicular to the magnetic meridian).",
              "Record the deflection angle ╬╕ at two symmetric positions (to cancel out any zero error).",
              "Average the two readings.",
              "Use the formula to find M (magnetic moment) and m (pole strength).",
            ],
            observation: [
              "Deflection angles are recorded at two symmetric positions.",
              "The average deflection angle ╬╕ is calculated.",
            ],
            calculation: [
              "Example: HΓéÇ = 0.3 ├ù 10Γü╗Γü┤ T, d = 0.1 m, ╬╕ = 45┬░ (tan ╬╕ = 1).",
              "M = (0.3 ├ù 10Γü╗Γü┤ / 2) ├ù (4╧Ç / 4╧Ç ├ù 10Γü╗Γü╖) ├ù (0.1)┬│ ├ù 1 Γëê 7.5 ├ù 10Γü╗Γü╡ A┬╖m┬▓.",
              "If half-length l = 0.03 m: m = M/(2├ù0.03) = 7.5 ├ù 10Γü╗Γü╡ / 0.06 Γëê 1.25 ├ù 10Γü╗┬│ A.",
            ],
            result:
              "The pole strength and magnetic moment of the bar magnet are calculated from the deflection angle.",
            precautions: [
              "Keep the magnet and compass box free from any other magnetic material.",
              "Use the tangent position: the magnet axis is perpendicular to the magnetic meridian.",
              "Take readings at two symmetric positions to cancel zero error.",
            ],
            
          },
          {
            title: "Study of IΓÇôV Characteristics of a Semiconductor Diode (Forward and Reverse Bias)",
            aim: "To plot the IΓÇôV curve of a pΓÇôn junction diode in forward and reverse bias.",
            requirement: [
              "pΓÇôn junction diode",
              "Variable DC supply (0ΓÇô10 V)",
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
              "Plot the IΓÇôV curve (current on y-axis, voltage on x-axis).",
            ],
            observation: [
              "In forward bias: below ~0.7 V the current is negligible; above it, the current rises sharply.",
              "In reverse bias: the current is near zero (┬╡A range) until the breakdown voltage is reached.",
            ],
            result:
              "The IΓÇôV characteristic shows a forward knee at ~0.7 V and near-zero reverse current, confirming the diode's rectifying behaviour.",
            precautions: [
              "Do not exceed the breakdown voltage in reverse bias to avoid damaging the diode.",
              "Use a microammeter for the reverse current readings.",
              "Label the x and y axes clearly on the graph.",
            ],
            
          },
        ],
      },
    ],
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  //  CHEMISTRY
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  {
    slug: "chemistry",
    name: "Chemistry Practical",
    description:
      "NEB Class 11 & 12 Chemistry practical syllabus (Code 301 & 202) ΓÇö laboratory techniques, reactions, gas preparation, quantitative analysis, titration and organic tests, written in the standard NEB practical-record format.",
    emoji: "≡ƒº¬",
    colorClass: "from-amber-500 to-orange-500",
    units: [
      // ΓöÇΓöÇ Grade 11 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
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
              "Sublimation: Heat the mixture gently ΓÇö camphor sublimes and condenses on a cold surface above the dish.",
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
              "Do not heat the mixture too strongly ΓÇö camphor may decompose at very high temperatures.",
              "Use a clean evaporating dish for NaCl recovery.",
              "Wear safety goggles throughout.",
            ],
            
          },
          {
            title: "To Separate a Mixture of Two Soluble Solids by Fractional Crystallization (KNOΓéâ + NaCl)",
            aim: "To separate KNOΓéâ and NaCl by taking advantage of their different solubility curves.",
            requirement: [
              "KNOΓéâ + NaCl mixture",
              "Distilled water",
              "Evaporating dish, beaker",
              "Filter paper and funnel",
              "Hot plate / spirit lamp",
            ],
            theory: [
              "KNOΓéâ has a very steep solubility curve: it is highly soluble when hot but much less so when cold.",
              "NaCl has a nearly constant solubility with temperature.",
              "By controlled crystallization from a hot saturated solution, KNOΓéâ precipitates first on cooling, while NaCl stays in solution.",
            ],
            procedure: [
              "Dissolve the mixture in a minimum amount of hot water.",
              "Filter hot to remove insoluble impurities.",
              "Allow the hot filtrate to cool slowly ΓÇö KNOΓéâ crystallizes first.",
              "Filter to collect the KNOΓéâ crystals.",
              "Evaporate the remaining mother liquor to recover NaCl.",
            ],
            observation: [
              "KNOΓéâ crystals (colourless, large) form on cooling.",
              "NaCl crystals (small, white) form in the concentrated mother liquor.",
            ],
            result:
              "KNOΓéâ and NaCl are separately recovered as pure crystals.",
            precautions: [
              "Cool slowly to get larger, purer KNOΓéâ crystals.",
              "Do not evaporate the mother liquor to dryness ΓÇö stop when NaCl crystals begin to form and filter.",
            ],
            
          },
          {
            title: "To Determine the Number of Water of Crystallization in a Hydrated Salt",
            aim: "To find how many moles of water are present in a known mass of a hydrated salt.",
            requirement: [
              "Hydrated salt (e.g. CuSOΓéä┬╖5HΓééO)",
              "Drying oven (or spirit lamp)",
              "Analytical balance",
              "Desiccator",
              "Crucible / evaporating dish",
            ],
            theory: [
              "A hydrated salt contains water molecules in its crystal lattice (water of crystallization).",
              "On strong heating, the water is driven off: MΓéôHΓééO ΓåÆ M + xHΓééO.",
              "Moles of water lost = mass lost / M(HΓééO) = mass lost / 18.",
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
              "Example: CuSOΓéä┬╖xHΓééO; mass of hydrated salt = 5.00 g; mass of anhydrous CuSOΓéä = 3.20 g.",
              "Mass of water = 5.00 ΓêÆ 3.20 = 1.80 g.",
              "Moles of water = 1.80 / 18 = 0.10 mol.",
              "Moles of CuSOΓéä = 3.20 / 159.6 = 0.020 mol.",
              "x = 0.10 / 0.020 = 5 ΓåÆ formula is CuSOΓéä┬╖5HΓééO.",
            ],
            result:
              "The number of water molecules of crystallization per formula unit is found.",
            precautions: [
              "Heat until a constant mass is obtained (at least two heatings).",
              "Cool in a desiccator, not in air, to prevent reabsorption of moisture.",
              "Use an analytical balance for accurate readings.",
            ],
            
          },
          {
            title: "To Determine the Volume of 1 Mole of Hydrogen Gas at NTP",
            aim: "To show that 1 mole of any gas occupies 22.4 L at NTP (0 ┬░C, 1 atm).",
            requirement: [
              "Zinc granules",
              "Dilute HΓééSOΓéä / HCl",
              "Gas collection setup (eudiometer or gas jar)",
              "Measuring cylinder / gas jar",
              "Distilled water",
              "Thermometer and barometer",
            ],
            theory: [
              "Zn + HΓééSOΓéä ΓåÆ ZnSOΓéä + HΓééΓåæ.",
              "The gas collected is hydrogen. The moles of HΓéé = moles of Zn reacted.",
              "The gas is collected over water, so the pressure of dry gas = P_atm ΓêÆ P_HΓééO (water vapour pressure at the temperature).",
              "Correcting to NTP: V_NTP = V_measured ├ù (273 / T) ├ù (P_dry / 760).",
              "Molar volume at NTP = V_NTP / moles of Zn.",
            ],
            procedure: [
              "React a known mass of zinc with dilute HΓééSOΓéä to generate HΓéé.",
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
              "Example: mass of Zn = 0.65 g ΓåÆ moles of Zn = 0.65 / 65 = 0.01 mol.",
              "Volume of HΓéé collected = 240 mL at 25 ┬░C, 750 mm Hg; water vapour pressure at 25 ┬░C = 24 mm Hg.",
              "P_dry = 750 ΓêÆ 24 = 726 mm Hg.",
              "V_NTP = 240 ├ù (273/298) ├ù (726/760) Γëê 224 mL.",
              "Molar volume = 224 mL / 0.01 mol = 22.4 L/mol.",
            ],
            result:
              "The measured molar volume at NTP is close to 22.4 L/mol, confirming the standard value.",
            precautions: [
              "Collect the gas by downward displacement of water (HΓéé is lighter than air).",
              "Record the temperature and pressure immediately after collection.",
              "Use excess zinc to ensure all the acid is consumed.",
            ],
            
          },
        ],
      },
      {
        id: "chem11-reactions",
        title: "Types of Chemical Reactions (Grade 11)",
        grade: "class-11",
        experiments: [
          {
            title: "To Perform a Precipitation Reaction of BaClΓéé and HΓééSOΓéä",
            aim: "To observe the formation of a white precipitate when barium chloride reacts with sulphuric acid.",
            requirement: [
              "BaClΓéé solution",
              "HΓééSOΓéä solution",
              "Test tubes and droppers",
            ],
            theory: [
              "Molecular equation: BaClΓéé(aq) + HΓééSOΓéä(aq) ΓåÆ BaSOΓéä(s)Γåô + 2HCl(aq).",
              "Net ionic equation: Ba┬▓Γü║(aq) + SOΓéä┬▓Γü╗(aq) ΓåÆ BaSOΓéä(s).",
              "BaSOΓéä is highly insoluble (Ksp Γëê 1.1 ├ù 10Γü╗┬╣Γü░), so it precipitates as a white solid.",
            ],
            procedure: [
              "Add a few drops of BaClΓéé solution to a test tube containing HΓééSOΓéä solution.",
              "Observe the formation of a white precipitate.",
              "Write the molecular and ionic equations.",
            ],
            observation: [
              "A white curdy precipitate forms immediately on adding BaClΓéé to HΓééSOΓéä.",
            ],
            result:
              "BaSOΓéä is precipitated, confirming the presence of sulphate ions.",
            precautions: [
              "Use dilute HΓééSOΓéä to control the rate of precipitation.",
              "Do not use hot solutions ΓÇö BaSOΓéä may dissolve slightly at high temperature.",
            ],
            
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
              "NaOH + HCl ΓåÆ NaCl + HΓééO. This is a neutralization reaction between a strong base and a strong acid.",
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
              "At the endpoint the pink just disappears ΓÇö the solution is neutral.",
              "White NaCl crystals form on evaporation.",
            ],
            result:
              "NaCl crystals are recovered from the evaporated neutral solution.",
            precautions: [
              "Do not evaporate to complete dryness ΓÇö stop when crystals form and air-dry the residue.",
              "Use phenolphthalein for the base titration (colourless in acid, pink in base).",
            ],
            
          },
          {
            title: "To Test for Ferrous Ions and Oxidize Them to Ferric Ions",
            aim: "To detect Fe┬▓Γü║ ions and confirm their oxidation to Fe┬│Γü║.",
            requirement: [
              "FeSOΓéä solution",
              "Potassium ferrocyanide KΓéâ[Fe(CN)Γéå] (for Fe┬▓Γü║)",
              "Potassium ferricyanide KΓéâ[Fe(CN)Γéå] (for Fe┬│Γü║ ΓÇö optional)",
              "KMnOΓéä solution (oxidant)",
              "Dilute HΓééSOΓéä",
              "Test tubes",
            ],
            theory: [
              "Fe┬▓Γü║ + KΓéâ[Fe(CN)Γéå] ΓåÆ FeΓéâ[Fe(CN)Γéå]ΓééΓåô (Turnbull's blue ΓÇö dark blue precipitate).",
              "Fe┬│Γü║ gives a red-brown precipitate (Prussian blue) with KΓéâ[Fe(CN)Γéå].",
              "KMnOΓéä in acid oxidizes Fe┬▓Γü║ to Fe┬│Γü║: 5Fe┬▓Γü║ + MnOΓéäΓü╗ + 8HΓü║ ΓåÆ 5Fe┬│Γü║ + Mn┬▓Γü║ + 4HΓééO.",
            ],
            procedure: [
              "Add a few drops of KΓéâ[Fe(CN)Γéå] to the FeSOΓéä solution ΓÇö observe a blue precipitate (Turnbull's blue).",
              "Add dilute HΓééSOΓéä to another sample of FeSOΓéä.",
              "Add KMnOΓéä drop by drop to the acidified sample.",
              "Observe the colour change of KMnOΓéä (purple ΓåÆ colourless) as Fe┬▓Γü║ is oxidized to Fe┬│Γü║.",
            ],
            observation: [
              "A dark blue precipitate (Turnbull's blue) confirms Fe┬▓Γü║.",
              "The purple colour of KMnOΓéä disappears as Fe┬▓Γü║ is oxidized to Fe┬│Γü║.",
            ],
            result:
              "Fe┬▓Γü║ is detected by the Turnbull's blue test; the oxidation to Fe┬│Γü║ is confirmed by the decolourization of KMnOΓéä.",
            precautions: [
              "Use acidified KMnOΓéä ΓÇö the reaction will not proceed without HΓü║.",
              "Do not add too much KMnOΓéä at once ΓÇö add drop by drop.",
            ],
            
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
              "Dilute HCl / HΓééSOΓéä",
              "Gas collection setup (gas jar, funnel, delivery tube)",
              "Lighted splint",
              "CuO powder (optional, for reduction test)",
            ],
            theory: [
              "Zn + HΓééSOΓéä ΓåÆ ZnSOΓéä + HΓééΓåæ.",
              "Hydrogen is the lightest element ΓÇö it is collected by downward displacement of water (or upward displacement of air).",
              "HΓéé burns with a pale blue flame: 2HΓéé + OΓéé ΓåÆ 2HΓééO.",
              "HΓéé is a reducing agent: CuO + HΓéé ΓåÆ Cu + HΓééO.",
            ],
            procedure: [
              "React zinc with dilute HΓééSOΓéä in a gas generator.",
              "Collect the gas by downward displacement of water in a gas jar.",
              "Bring a lighted splint to the mouth of the gas jar ΓÇö observe the 'pop'.",
              "Pass HΓéé over CuO powder in a dry test tube ΓÇö observe the black colour turning red.",
            ],
            observation: [
              "The 'pop' test confirms the gas is hydrogen.",
              "The black CuO turns to red-brown Cu, confirming HΓéé's reducing nature.",
            ],
            result:
              "HΓéé is generated and its properties (flammable, reducing) are demonstrated.",
            precautions: [
              "HΓéé is highly flammable ΓÇö keep the gas jar away from open flames until the 'pop' test.",
              "Do not collect large volumes of HΓéé without proper ventilation.",
            ],
            
          },
          {
            title: "To Prepare and Study the Properties of Ammonia Gas",
            aim: "To generate NHΓéâ from a mixture of Ca(OH)Γéé and NHΓéäCl and test its properties.",
            requirement: [
              "Ca(OH)Γéé + NHΓéäCl mixture",
              "Dry test tube",
              "Glass rod dipped in dilute HCl",
              "Red and blue litmus paper",
            ],
            theory: [
              "2NHΓéäCl + Ca(OH)Γéé ΓåÆ CaClΓéé + 2NHΓéâ + 2HΓééO.",
              "NHΓéâ is alkaline (turns red litmus blue) and forms white fumes of NHΓéäCl with HCl.",
              "NHΓéâ is lighter than air, so it is collected by upward displacement of air.",
            ],
            procedure: [
              "Heat the mixture of Ca(OH)Γéé and NHΓéäCl in a dry test tube.",
              "Collect the gas by upward displacement of air in an inverted gas jar.",
              "Bring a glass rod dipped in dilute HCl near the gas jar mouth ΓÇö observe white fumes.",
              "Test with red and blue litmus paper.",
            ],
            observation: [
              "A pungent smell of ammonia is noticed.",
              "White fumes of NHΓéäCl form when the HCl-coated rod is brought near the gas.",
              "Red litmus turns blue (alkaline gas).",
            ],
            result:
              "NHΓéâ is generated and its properties (alkaline, forms ammonium chloride) are demonstrated.",
            precautions: [
              "Work in a well-ventilated area ΓÇö NHΓéâ is a respiratory irritant.",
              "Keep the gas jar mouth slightly open when handling to prevent pressure build-up.",
            ],
            
          },
          {
            title: "To Prepare and Study the Properties of Carbon Dioxide Gas",
            aim: "To generate COΓéé from marble chips and dilute HCl and test its properties.",
            requirement: [
              "Marble chips (CaCOΓéâ)",
              "Dilute HCl",
              "Gas collection setup (upward displacement of air)",
              "Limewater (Ca(OH)Γéé solution)",
            ],
            theory: [
              "CaCOΓéâ + 2HCl ΓåÆ CaClΓéé + HΓééO + COΓééΓåæ.",
              "COΓéé is about 1.5├ù heavier than air ΓÇö it is collected by upward displacement of air.",
              "COΓéé turns limewater milky: Ca(OH)Γéé + COΓéé ΓåÆ CaCOΓéâΓåô + HΓééO.",
              "Excess COΓéé dissolves the precipitate: CaCOΓéâ + COΓéé + HΓééO ΓåÆ Ca(HCOΓéâ)Γéé (clear).",
            ],
            procedure: [
              "React marble chips with dilute HCl to generate COΓéé.",
              "Collect the gas by upward displacement of air in a gas jar.",
              "Pass the gas through limewater ΓÇö observe the milky precipitate.",
              "Continue passing excess COΓéé ΓÇö observe the milky colour clearing.",
            ],
            observation: [
              "Limewater turns milky on first passing COΓéé through it.",
              "On continued passing, the milkiness clears (excess COΓéé dissolves the CaCOΓéâ).",
            ],
            result:
              "COΓéé is generated and its properties (turns limewater milky, heavier than air) are demonstrated.",
            precautions: [
              "Use dilute HCl ΓÇö concentrated HCl fumes and is too aggressive.",
              "Wear safety goggles when handling HCl.",
            ],
            
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
              "MΓééCOΓéâ + 2HCl ΓåÆ 2MCl + HΓééO + COΓééΓåæ.",
              "Moles of HCl used = M(HCl) ├ù V(HCl).",
              "Moles of MΓééCOΓéâ = (M(HCl) ├ù V(HCl)) / 2.",
              "Molar mass of MΓééCOΓéâ = mass / moles.",
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
              "Example: mass of MΓééCOΓéâ = 2.00 g (in 250 mL).",
              "Moles of HCl = 0.10 M ├ù 0.025 L = 0.0025 mol (average titre).",
              "Moles of MΓééCOΓéâ = 0.0025 / 2 = 0.00125 mol per 250 mL.",
              "Molar mass = 2.00 / 0.00125 = 1600 g/mol (adjust for the actual sample).",
            ],
            result:
              "The molar mass of the carbonate is calculated; the identity of the metal is confirmed from the molar mass.",
            precautions: [
              "Use methyl orange for the COΓéé endpoint (faint orange).",
              "Make sure the carbonate is completely dissolved before diluting.",
              "Repeat until 3 concordant titres are obtained.",
            ],
            
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
              "Solubility = (mass of solute recovered / mass of water in filtrate) ├ù 100.",
              "Example: 3.20 g solute in 25.0 g water ΓåÆ solubility = (3.20/25.0) ├ù 100 = 12.8 g/100 g water.",
            ],
            result:
              "The solubility of the solid at the given temperature is found.",
            precautions: [
              "Ensure the solution is truly saturated (undissolved solid remains at the bottom).",
              "Record the temperature at which the solution was saturated.",
            ],
            
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
              "The weight of a drop = surface tension ├ù circumference of the drop.",
              "For the same volume of two liquids, the number of drops N is inversely proportional to the surface tension: NΓéü/NΓéé = ╧âΓéé/╧âΓéü.",
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
              "╧âΓéü/╧âΓéé = NΓéé/NΓéü.",
              "Example: NΓéü = 40 drops, NΓéé = 25 drops ΓåÆ ╧âΓéü/╧âΓéé = 25/40 = 0.625.",
            ],
            result:
              "The relative surface tension of the two liquids is found from the ratio of drop counts.",
            precautions: [
              "Clean the pipette between the two liquids to avoid contamination.",
              "Use the same pipette for both liquids.",
              "Count drops carefully ΓÇö do not let drops merge.",
            ],
            
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
              "BaClΓéé solution (for SOΓéä┬▓Γü╗)",
              "AgNOΓéâ solution (for ClΓü╗)",
              "NaΓééCOΓéâ solution (for Ca┬▓Γü║ / Ba┬▓Γü║)",
              "NHΓéäOH solution (for Zn┬▓Γü║ / Al┬│Γü║)",
              "HCl / HNOΓéâ for acidification",
            ],
            theory: [
              "Basic radicals (cations) are detected by their characteristic precipitates with reagents like NaΓééCOΓéâ, NHΓéäOH, HΓééS.",
              "Acid radicals (anions) are detected by their characteristic precipitates or effervescence with reagents like BaClΓéé, AgNOΓéâ, NaHCOΓéâ.",
              "Ba┬▓Γü║ + COΓéâ┬▓Γü╗ ΓåÆ BaCOΓéâΓåô (white); Ca┬▓Γü║ + COΓéâ┬▓Γü╗ ΓåÆ CaCOΓéâΓåô (white).",
              "Zn┬▓Γü║ + 2NHΓéäOH ΓåÆ Zn(OH)ΓééΓåô (white, dissolves in excess NHΓéäOH).",
              "SOΓéä┬▓Γü╗ + Ba┬▓Γü║ ΓåÆ BaSOΓéäΓåô (white); ClΓü╗ + AgΓü║ ΓåÆ AgClΓåô (white, dissolves in NHΓéäOH).",
              "COΓéâ┬▓Γü╗ + HΓü║ ΓåÆ COΓééΓåæ (effervescence).",
            ],
            procedure: [
              "Dilute the salt solution with distilled water.",
              "Test for basic radicals: add NHΓéäOH, NaΓééCOΓéâ, HΓééS to detect Zn┬▓Γü║, Ca┬▓Γü║, etc.",
              "Test for acid radicals: add BaClΓéé (SOΓéä┬▓Γü╗), AgNOΓéâ (ClΓü╗), NaHCOΓéâ (COΓéâ┬▓Γü╗).",
              "Record all observations.",
            ],
            observation: [
              "White precipitate with NaΓééCOΓéâ ΓåÆ Ca┬▓Γü║ or Ba┬▓Γü║.",
              "White precipitate with BaClΓéé ΓåÆ SOΓéä┬▓Γü╗.",
              "White precipitate with AgNOΓéâ (dissolves in NHΓéäOH) ΓåÆ ClΓü╗.",
              "Effervescence with NaHCOΓéâ ΓåÆ COΓéâ┬▓Γü╗.",
            ],
            result:
              "Both the cation and the anion are identified from the characteristic precipitates and effervescence.",
            precautions: [
              "Always acidify with dilute HNOΓéâ before the AgNOΓéâ test (to remove interfering anions).",
              "Run a blank test to confirm the reagents themselves do not give the observed result.",
            ],
            
          },
        ],
      },
      // ΓöÇΓöÇ Grade 12 ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
      {
        id: "chem12-recovery",
        title: "Recovery and Preparation of Salts (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "To Recover Blue Vitriol Crystals from a Mixture of Copper Sulphate and Sodium Chloride",
            aim: "To separate CuSOΓéä┬╖5HΓééO (blue vitriol) from NaCl by fractional crystallization.",
            requirement: [
              "Mixture of CuSOΓéä and NaCl",
              "Distilled water",
              "Evaporating dish",
              "Filter paper and funnel",
              "Spirit lamp / hot plate",
            ],
            theory: [
              "CuSOΓéä has a very steep solubility curve: highly soluble when hot, much less so when cold.",
              "NaCl has a nearly constant solubility with temperature.",
              "On cooling a hot saturated solution, CuSOΓéä┬╖5HΓééO crystallizes first; NaCl stays in solution.",
            ],
            procedure: [
              "Dissolve the mixture in a minimum amount of hot water.",
              "Filter hot to remove insoluble impurities.",
              "Allow the filtrate to cool slowly ΓÇö blue vitriol crystallizes first.",
              "Separate the blue crystals by filtration.",
              "Evaporate the remaining mother liquor to recover NaCl.",
            ],
            observation: [
              "Blue CuSOΓéä┬╖5HΓééO crystals form on cooling.",
              "White NaCl crystals form from the concentrated mother liquor.",
            ],
            result:
              "Blue vitriol crystals are recovered from the mixture; the blue colour confirms copper sulphate pentahydrate.",
            precautions: [
              "Cool slowly to get larger, purer blue vitriol crystals.",
              "Do not evaporate the mother liquor to dryness for NaCl.",
            ],
            
          },
          {
            title: "To Recover CaCOΓéâ from a Mixture of Sodium Carbonate and Calcium Chloride",
            aim: "To precipitate and recover CaCOΓéâ by double displacement.",
            requirement: [
              "NaΓééCOΓéâ solution",
              "CaClΓéé solution",
              "Filter paper and funnel",
              "Desiccator / drying oven",
            ],
            theory: [
              "NaΓééCOΓéâ + CaClΓéé ΓåÆ CaCOΓéâΓåô + 2NaCl.",
              "CaCOΓéâ is highly insoluble (Ksp Γëê 3.4 ├ù 10Γü╗Γü╣) and precipitates as a white solid.",
            ],
            procedure: [
              "Mix equal volumes of NaΓééCOΓéâ and CaClΓéé solutions in a beaker.",
              "A white precipitate of CaCOΓéâ forms.",
              "Filter the precipitate, wash it with distilled water, and dry it.",
            ],
            observation: [
              "A white curdy precipitate forms immediately on mixing the two solutions.",
            ],
            result:
              "CaCOΓéâ precipitate is recovered as a white solid.",
            precautions: [
              "Use dilute solutions to get a fine precipitate that is easier to filter.",
              "Wash the precipitate thoroughly to remove NaCl before drying.",
            ],
            
          },
        ],
      },
      {
        id: "chem12-volumetric",
        title: "Volumetric Analysis & Titration (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "Standardization of NaOH Solution Using Standard HCl (AcidΓÇôBase Titration)",
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
              "NaOH + HCl ΓåÆ NaCl + HΓééO.",
              "At the endpoint, moles of NaOH = moles of HCl: M(NaOH) ├ù V(NaOH) = M(HCl) ├ù V(HCl).",
              "M(NaOH) = M(HCl) ├ù V(HCl) / V(NaOH).",
              "Phenolphthalein is pink in NaOH and colourless in HCl; the endpoint is the faint pink that persists for 30 s.",
            ],
            procedure: [
              "Rinse the burette with standard HCl and fill it; note the initial reading.",
              "Pipette 25 mL of NaOH into a conical flask on a white tile.",
              "Add 2ΓÇô3 drops of phenolphthalein (solution turns pink).",
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
              "M(NaOH) = (0.100 ├ù 24.50) / 25.00 = 0.0980 M.",
            ],
            result:
              "The molarity of the NaOH solution is calculated from the average titre.",
            precautions: [
              "Use a white tile under the flask for a clearer endpoint.",
              "Add HCl slowly near the endpoint to avoid overshooting.",
              "Average at least 3 concordant titres (within 0.1 mL of each other).",
              "Rinse the burette with the HCl solution before filling it.",
            ],
            
          },
          {
            title: "To Determine the Molar Mass of a Diprotic Organic Acid by Neutralisation",
            aim: "To find the molar mass of a diprotic organic acid (e.g. HΓééCΓééOΓéä┬╖2HΓééO) by titrating against standard NaOH.",
            requirement: [
              "Standard NaOH solution",
              "Diprotic organic acid solution (approx. 5 g/L)",
              "Burette, pipette, conical flask",
              "Phenolphthalein indicator",
            ],
            theory: [
              "For a diprotic acid HΓééA: 2NaOH + HΓééA ΓåÆ NaΓééA + 2HΓééO.",
              "2 moles of NaOH neutralize 1 mole of HΓééA.",
              "2 ├ù M(acid) ├ù V(acid) = M(NaOH) ├ù V(NaOH).",
              "M(acid) = M(NaOH) ├ù V(NaOH) / (2 ├ù V(acid)).",
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
              "M(acid) = (0.100 ├ù 30.00) / (2 ├ù 25.00) = 0.0600 M.",
              "For HΓééCΓééOΓéä┬╖2HΓééO (M = 126 g/mol): 0.0600 M ├ù 126 g/mol = 7.56 g/L (check against the prepared concentration).",
            ],
            result:
              "The molar mass of the diprotic acid is calculated; the ├ù2 factor for diprotic acids is applied correctly.",
            precautions: [
              "Do not forget the factor of 2 in the diprotic equation ΓÇö this is the most common exam error.",
              "Use phenolphthalein for the endpoint (faint pink in a diprotic acid titration).",
              "Repeat until 3 concordant titres are obtained.",
            ],
            
          },
        ],
      },
      {
        id: "chem12-organic",
        title: "Organic Qualitative Tests (Grade 12)",
        grade: "class-12",
        experiments: [
          {
            title: "To Test for the Presence of a Carboxylic Acid (NaHCOΓéâ Test)",
            aim: "To confirm the presence of a carboxylic acid group in an organic sample.",
            requirement: [
              "Sample (e.g. benzoic acid)",
              "Saturated NaHCOΓéâ solution",
              "Limewater (Ca(OH)Γéé solution)",
              "Test tubes and delivery tube",
            ],
            theory: [
              "RCOOH + NaHCOΓéâ ΓåÆ RCOONa + HΓééO + COΓééΓåæ.",
              "COΓéé turns limewater milky: Ca(OH)Γéé + COΓéé ΓåÆ CaCOΓéâΓåô + HΓééO.",
              "Alcohols do not react with NaHCOΓéâ, so this test distinguishes carboxylic acids from alcohols.",
            ],
            procedure: [
              "Add a few drops of the sample to a test tube containing saturated NaHCOΓéâ solution.",
              "Observe effervescence.",
              "Pass the evolved gas through limewater.",
            ],
            observation: [
              "Effervescence (fizzing) is observed when the sample is added to NaHCOΓéâ.",
              "Limewater turns milky, confirming COΓéé.",
            ],
            result:
              "Effervescence and a milky limewater confirm the presence of a carboxylic acid group.",
            precautions: [
              "Use saturated NaHCOΓéâ ΓÇö dilute solutions give weaker effervescence.",
              "Test a known alcohol alongside as a negative control.",
            ],
            
          },
          {
            title: "To Test for the Presence of an Aldehyde (Tollens' Reagent / 2,4-DNP Test)",
            aim: "To confirm the presence of an aldehyde group in an organic sample.",
            requirement: [
              "Sample (e.g. benzaldehyde or acetaldehyde)",
              "Tollens' reagent (ammoniacal AgNOΓéâ)",
              "2,4-DNP reagent",
              "Water bath (60 ┬░C)",
            ],
            theory: [
              "Aldehydes are oxidized by Tollens' reagent: RCHO + 2[Ag(NHΓéâ)Γéé]Γü║ + HΓééO ΓåÆ RCOOH + 2AgΓåô + 4NHΓéâ.",
              "The silver mirror confirms an aldehyde. Ketones do not react with Tollens' reagent.",
              "2,4-DNP gives an orange/yellow precipitate with both aldehydes and ketones (carbonyl group test).",
              "Combining both tests distinguishes aldehydes (Tollens' + 2,4-DNP positive) from ketones (Tollens' negative, 2,4-DNP positive).",
            ],
            procedure: [
              "Add the sample to Tollens' reagent in a clean test tube.",
              "Warm gently in a water bath (60 ┬░C) for a few minutes.",
              "Observe the formation of a silver mirror on the inside of the tube.",
              "Separately, add the sample to 2,4-DNP reagent ΓÇö observe the orange precipitate.",
            ],
            observation: [
              "A silver mirror forms on the inside of the test tube (Tollens' positive).",
              "An orange / yellow precipitate forms with 2,4-DNP.",
            ],
            result:
              "A silver mirror with Tollens' reagent confirms the presence of an aldehyde group.",
            precautions: [
              "Prepare Tollens' reagent fresh ΓÇö do not store it (it can form explosive silver nitride).",
              "Do not use a flame to warm the Tollens' test ΓÇö use a water bath only.",
            ],
            
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


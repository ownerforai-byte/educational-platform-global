const fs = require('fs');
const path = require('path');

const BIOLOGY_DIR = 'content/ravikishan/class-11-notes/biology';

function readJson(p) {
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch(e) {
    console.error(`Error reading ${p}:`, e.message);
    return null;
  }
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function isPlaceholder(arr) {
  if (!arr || arr.length === 0) return true;
  const allPlaceholders = arr.every(item => {
    if (typeof item !== 'string') return false;
    return item.includes('Added new rich content') ||
           item.includes('Universal scientific fact') ||
           item.includes('Practice ') && !item.match(/[A-Z]/) && !item.match(/[\d]/);
  });
  return allPlaceholders;
}

function enhanceWithRealContent(topicSlug, enriched) {
  // Only update if the section has placeholder content or is empty
  const updates = {};

  // universalFacts
  if (isPlaceholder(enriched.universalFacts)) {
    updates.universalFacts = getFacts(topicSlug);
  }

  // formulas
  if (isPlaceholder(enriched.formulas) || !enriched.formulas) {
    updates.formulas = getFormulas(topicSlug);
  }

  // examShortTricks
  if (isPlaceholder(enriched.examShortTricks) || !enriched.examShortTricks) {
    updates.examShortTricks = getTricks(topicSlug);
  }

  // importantNotes
  if (isPlaceholder(enriched.importantNotes) || !enriched.importantNotes) {
    updates.importantNotes = getImportantNotes(topicSlug);
  }

  // examNotes
  if (isPlaceholder(enriched.examNotes) || !enriched.examNotes) {
    updates.examNotes = getExamNotes(topicSlug);
  }

  // exercises
  if (isPlaceholder(enriched.exercises) || !enriched.exercises) {
    updates.exercises = getExercises(topicSlug);
  }

  return updates;
}

function getFacts(slug) {
  const factsMap = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Biology is derived from Greek 'bios' (life) and 'logos' (study), literally meaning 'the study of life.'",
      "There are approximately 8.7 million eukaryotic species on Earth, though only ~1.5 million have been described.",
      "DNA was discovered by Friedrich Miescher in 1869, but its double-helix structure wasn't solved until Watson and Crick in 1953.",
      "The human body contains approximately 37.2 trillion cells, with the brain having ~86 billion neurons.",
      "Mitochondria have their own circular DNA, supporting the endosymbiotic theory of their bacterial origin.",
      "RNA world hypothesis suggests that before DNA, life may have relied on RNA for both genetic storage and catalysis."
    ],
    'relation-of-biology-with-other-sciences': [
      "Biochemistry bridges biology and chemistry — it was formalized by Hans von Euler-Chelpin who won the 1929 Nobel Prize.",
      "Biophysics applies physics principles to biological systems; X-ray crystallography revealed DNA's structure.",
      "Bioinformatics emerged in the 1990s alongside the Human Genome Project, now processing petabytes of sequence data.",
      "Neuroscience combines biology, psychology, and chemistry to understand the nervous system's 100 trillion synapses.",
      "The concept of 'bioethics' gained prominence after the 1975 Asilomar conference on recombinant DNA safety.",
      "Biomathematics uses differential equations to model population dynamics, epidemic spread, and neural firing patterns."
    ],
    'biomolecules-functions': [
      "Water makes up 60-75% of human body weight and is essential as a solvent for all biochemical reactions.",
      "ATP hydrolysis releases 7.3 kcal/mol under standard conditions, making it the cell's universal energy currency.",
      "There are exactly 20 standard amino acids encoded by the universal genetic code across all known life forms.",
      "A single human cell contains approximately 2 meters of DNA if fully extended from the nucleus.",
      "Enzymes can increase reaction rates by factors of 10^6 to 10^12 compared to uncatalyzed reactions.",
      "Hemoglobin in blood can carry approximately 1.34 mL of O₂ per gram of hemoglobin."
    ],
    'biomolecules-introduction-and-functions': [
      "Carbohydrates provide 4 kcal/g of energy, while lipids provide 9 kcal/g — more than double the energy density.",
      "The total DNA in a human body, if laid end to end, would stretch to the Sun and back ~600 times.",
      "Proteins make up approximately 15-20% of total human body weight, making them the most abundant biomolecule by dry mass.",
      "Cell membranes are composed of a phospholipid bilayer approximately 7.5-10 nm thick.",
      "Glycogen can store approximately 400-500g of glucose in humans — enough for roughly 1600-2000 kcal.",
      "Cholesterol contains 27 carbon atoms arranged in four fused rings (cyclopentanoperhydrophenanthrene nucleus)."
    ],
    'cell-introduction': [
      "The smallest known cell is Mycoplasma gallisepticum at ~0.1 μm; the largest is the ostrich egg at 170 mm.",
      "A typical human cell is 10-30 μm in diameter, while a neuron can be up to 1 meter long (from spinal cord to foot).",
      "The human body contains approximately 10x more bacterial cells than human cells (~38 trillion vs 30 trillion).",
      "Mitochondria divide by binary fission similar to bacteria, supporting the endosymbiont theory.",
      "Red blood cells lack nuclei and organelles to maximize hemoglobin-carrying capacity.",
      "The nuclear envelope contains ~3000-4000 nuclear pores, each ~100 nm in diameter."
    ],
    'cell-introduction-prokaryotic-and-eukaryotic': [
      "Prokaryotes existed for ~2 billion years before eukaryotes appeared — life was prokaryotic for 80% of Earth's history.",
      "The endosymbiotic theory was proposed by Lynn Margulis in 1967 and is now widely accepted.",
      "Eukaryotic cells are typically 10-100x larger in volume than prokaryotic cells.",
      "Bacteria can reproduce every 20 minutes under ideal conditions, potentially producing 2×10^43 cells in 2 days (theoretically).",
      "The genome of Mycoplasma genitalium (smallest known) has ~525 genes; humans have ~20,000-25,000.",
      "Archaea share some molecular features with eukaryotes (similar RNA polymerases) but structurally resemble bacteria."
    ],
    'detail-structure-of-eukaryotic-cells': [
      "The nucleus is typically 5-10 μm in diameter and contains 90% of the cell's DNA.",
      "Liver cells contain ~1000-2000 mitochondria, while sperm cells have ~50 (concentrated in the midpiece).",
      "The rough ER can span up to 30% of the total endomembrane system in protein-secreting cells.",
      "Lysosomes contain ~50 different hydrolytic enzymes and maintain an internal pH of ~4.5-5.0.",
      "A typical animal cell has ~300 million phospholipid molecules per square micrometer of membrane.",
      "Microvilli on intestinal epithelial cells increase surface area by ~20x, essential for nutrient absorption."
    ],
    'eukaryotic-cell-structure': [
      "Plant cells typically range from 10-100 μm; animal cells from 10-30 μm in diameter.",
      "The Golgi apparatus can have 4-8 cisternae in animal cells and up to 60 in plant cells.",
      "Centrioles are composed of 9 triplet microtubules arranged in a cylinder.",
      "Peroxisomes contain catalase enzyme that breaks down H₂O₂ into water and oxygen at a rate of ~10^7 molecules/sec per enzyme.",
      "The cytoskeleton in a typical cell contains ~10^9 actin filaments.",
      "Plant cell walls are typically 0.1-10 μm thick and composed of 40% cellulose, 30% hemicellulose, and 20% pectin."
    ],
    'cell-division': [
      "Human cells divide approximately every 24 hours under optimal conditions.",
      "Meiosis produces 4 genetically unique haploid cells from 1 diploid cell after one round of DNA replication.",
      "The complete human cell cycle (G1-S-G2-M) takes ~24 hours in typical cultured cells.",
      "During metaphase, chromosomes align at the metaphase plate — the cell checks all attachments before proceeding.",
      "Cytokinesis in animal cells involves a contractile ring of actin and myosin; in plants, a cell plate forms.",
      "Bryostatin, a compound from marine bryozoans, activates protein kinase C and is being studied for cancer therapy."
    ],
    'ecosystem-ecology': [
      "Only ~10% of energy transfers between trophic levels (Lindeman's 10% law, 1942).",
      "The biosphere extends from ~11 km above sea level (Mt. Everest) to ~11 km below (Mariana Trench).",
      "Total primary production on Earth is ~173 billion tons of carbon per year.",
      "A single hectare of tropical rainforest can contain over 700 tree species.",
      "The Great Filter hypothesis suggests civilization collapses due to resource depletion or self-destruction.",
      "Nepal has 12 national parks and 6 hunting reserves covering ~22% of its land area."
    ],
    'food-chain-web': [
      "A food chain rarely exceeds 4-5 trophic levels due to energy loss at each transfer.",
      "The biomass pyramid is usually upright but can be inverted in aquatic ecosystems (phytoplankton reproduce rapidly).",
      "Primary productivity of Earth's oceans is ~550 g C/m²/year; tropical forests reach ~2000 g C/m²/year.",
      "An ecotone (transition zone between biomes) typically has higher species diversity than adjacent communities.",
      "Detritivores process ~90% of terrestrial primary production as dead organic matter.",
      "Energy pyramids are always upright; number pyramids can be inverted (one tree supports thousands of insects)."
    ],
    'biogeochemical-cycles': [
      "The nitrogen cycle involves ~10^14 g N fixed annually by biological processes globally.",
      "Atmospheric CO₂ has risen from ~280 ppm (pre-industrial) to ~420 ppm (2024) — a 50% increase.",
      "The ocean stores ~38,000 gigatons of carbon, 60x more than the atmosphere.",
      "Phosphorus has no atmospheric component — it cycles only through rock, water, and organisms.",
      "Nitrogen-fixing bacteria in legume root nodules can fix 100-200 kg N/ha/year.",
      "Global carbon flux from fossil fuel burning is ~10 gigatons C/year (as of 2024)."
    ],
    'ecological-adaptation': [
      "Xerophytes can survive at water potentials as low as -30 MPa; mesophytes typically wilt below -1.5 MPa.",
      "Hydrophytes have air spaces (aerenchyma) in tissues for buoyancy and gas exchange.",
      "Cactus spines are modified leaves that reduce transpiration and deter herbivores.",
      "K-strategists (elephants, humans) produce few offspring with high parental investment; r-strategists (insects) produce many with minimal care.",
      "CAM photosynthesis opens stomata at night to reduce water loss — used by cacti and pineapple.",
      "Desert kangaroo rats never need to drink water; they obtain all moisture from metabolic oxidation of seeds."
    ],
    'ecological-imbalances': [
      "Global temperature has risen ~1.2°C since pre-industrial times (1850-1900 baseline).",
      "Ocean acidification has increased by 30% since the Industrial Revolution due to CO₂ absorption.",
      "Approximately 1 million species face extinction threat according to IPBES (2019).",
      "Deforestation releases ~4.8 gigatons of CO₂ annually — ~12% of global emissions.",
      "The ozone hole over Antarctica reached 24 million km² in 2020 (recovered from 28 million km² in 2000).",
      "Nepal's biodiversity is threatened by habitat loss, poaching, and climate change affecting Alpine zones."
    ],
    'origin-life': [
      "Earth formed ~4.6 billion years ago; life appeared ~3.5-4.0 billion years ago (stromatolite evidence).",
      "The Miller-Urey experiment (1953) produced 11 amino acids from simulated early Earth conditions.",
      "Hydrothermal vent theory proposes life originated at alkaline vents with natural pH gradients.",
      "LUCA (Last Universal Common Ancestor) lived ~3.5-4.0 billion years ago and was likely thermophilic.",
      "RNA world hypothesis is supported by ribozymes — RNA molecules with catalytic activity.",
      "Panspermia hypothesis suggests life's building blocks may have arrived via meteorites (Murchison meteorite found 70+ amino acids)."
    ],
    'evidences-of-evolution': [
      "Human and chimpanzee DNA are 98.8% identical, diverging ~6-7 million years ago.",
      "Pacemaker gene (Hox genes) controlling body segmentation is conserved from fruit flies to humans.",
      "Whale evolution is documented through 50+ fossil intermediates spanning 50 million years.",
      "Vestigial structures include the human appendix, coccyx (tailbone), and wisdom teeth.",
      "Embryological similarities (pharyngeal pouches, tail) support common ancestry across vertebrates.",
      "Cytochrome c differs by only 1-2 amino acids between humans and chimpanzees but ~45 between humans and yeast."
    ],
    'theories-of-evolution': [
      "Lamarck's theory (inheritance of acquired characteristics) was disproven by Weismann's mouse tail experiments (1890s).",
      "Darwin published 'On the Origin of Species' in 1859 after 20+ years of observation and correspondence.",
      "Darwin was influenced by Malthus's essay on population growth and limited resources.",
      "The modern synthesis (1930s-1950s) combined Darwinian selection with Mendelian genetics.",
      "Neutral theory (Kimura, 1968) proposes most evolutionary changes are due to genetic drift, not selection.",
      "Punctuated equilibrium (Eldredge & Gould, 1972) argues evolution occurs in rapid bursts separated by stability."
    ],
    'human-evolution': [
      "Australopithecus afarensis ('Lucy') lived ~3.2 million years ago in Ethiopia — 40% complete skeleton found.",
      "Homo habilis ('handy man') appeared ~2.4 Ma with brain size ~600-700 cm³; used Oldowan stone tools.",
      "Homo erectus migrated out of Africa ~1.8 Ma, reaching Indonesia (Java Man) and China (Peking Man).",
      "Neanderthals (Homo neanderthalensis) lived ~400-40,000 years ago in Europe; shared 99.7% DNA with modern humans.",
      "Homo sapiens emerged in Africa ~300,000 years ago; the 'Out of Africa' migration began ~60,000-70,000 years ago.",
      "Brain size increased from ~450 cm³ (Australopithecus) to ~1350 cm³ (modern humans) over 4 million years."
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "Plasmodium falciparum causes the most severe form of malaria with mortality rates up to 20% if untreated.",
      "Paramecium caudatum can beat its cilia ~30 times per second to propel itself through water.",
      "Amoeba proteus can change shape continuously, extending pseudopodia up to 50 μm in length.",
      "Euglena gracilis contains chloroplasts with chlorophyll a and b, similar to higher plants.",
      "Diatoms contribute ~20-25% of global oxygen production through photosynthesis.",
      "Foraminiferans have calcareous shells (tests) up to 20 cm in diameter (Nummulites — used in ancient Egyptian construction)."
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "Sponges (Porifera) lack true tissues — their cells show primitive division of labor but no organization into tissues.",
      "Cnidarians were the first animals to develop true tissues (diploblastic: ectoderm + endoderm with mesoglea).",
      "Bilateral symmetry evolved ~550 million years ago during the Ediacaran period, preceding the Cambrian explosion.",
      "Coelom evolution provided space for organ development and independent organ movement within the body cavity.",
      "Segmentation (metamerism) allows specialization of body regions and redundancy — damage to one segment needn't be fatal.",
      "The 7 major animal phyla (Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda) contain >95% of described animal species."
    ],
    'earthworm': [
      "Earthworms (Pheretima posthuma) can consume up to 50% of their body weight in soil per day.",
      "Each earthworm is a hermaphrodite — possessing both male and female reproductive organs.",
      "Earthworms have 5 pairs of Hearts (aortic arches) located in segments 7-11.",
      "Setae (bristles) on each segment provide grip for locomotion — typically 4 per segment.",
      "Earthworms lack a skeleton but maintain shape through hydrostatic pressure in coelomic fluid.",
      "A single earthworm can produce 50-200 castings (worm poop) per day, enriching soil with nutrients."
    ],
    'frog-habit-and-habitat-external-features': [
      "Rana tigrina (Indian bullfrog) can leap up to 2 meters in a single jump.",
      "Frog skin is permeable to water and gases — they can breathe entirely through skin when submerged.",
      "Tympanum (external ear) is visible as a circular membrane behind each eye, ~5-8 mm in diameter.",
      "Frogs have nictitating membranes (third eyelid) for underwater vision and moisture retention.",
      "Male frogs have vocal sacs for amplifying mating calls; some species can produce sounds up to 100 dB.",
      "Frog skin secretes antimicrobial peptides that protect against fungal infections (Chytrid fungus)."
    ],
    'frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration': [
      "Frog heart has 3 chambers: 2 atria + 1 partially septated ventricle — prevents complete mixing of O₂/deO₂ blood.",
      "Frogs can respire through 3 methods: buccal pumping, cutaneous (skin), and pulmonary (lungs).",
      "Red blood cells in frogs are nucleated (unlike mammals), containing a nucleus and organelles.",
      "Frog liver is the largest internal organ, weighing ~5-10% of body weight; produces bile and detoxifies blood.",
      "The cloaca serves as a common chamber for digestive, urinary, and reproductive tracts.",
      "Frog circulation: venous sinus → atria → ventricle → conus arteriosus → systemic circuit (with pulmocutaneous branch)."
    ],
    'frog-reproductive-system-male-and-female-reproductive-organs': [
      "Male frogs have paired testes producing millions of sperm daily during breeding season.",
      "Female frogs can lay 2000-15000 eggs per clutch depending on species and body size.",
      "Fertilization in frogs is external — eggs and sperm are released into water simultaneously (spawning).",
      " Tadpole development: egg → blastula → gastrula → neurula → tadpole (with gills) → metamorphosis → adult frog.",
      "Hormonal control: thyroid hormone triggers metamorphosis; prolactin maintains larval state.",
      "Some frog species exhibit parental care — males guard eggs, some carry tadpoles on their backs."
    ],
    'monera-detailed': [
      "Bacteria can survive in temperatures from -15°C (Antarctic ice) to 121°C (hydrothermal vents).",
      "E. coli divides every 20 minutes under optimal conditions — 1 cell can become 2^72 in 24 hours theoretically.",
      "Bacterial genomes range from ~130,000 bp (Carsonella ruddii, endosymbiont) to ~14 million bp (Sorangium cellulosum).",
      "Endospores (Bacillus, Clostridium) can survive boiling, radiation, and desiccation for centuries.",
      "Bioluminescent bacteria (Vibrio fischeri) live symbiotically in fish light organs, producing blue-green light.",
      "The human gut microbiome contains ~10^14 bacteria — roughly equal to human cells, encoding ~150x more genes than the human genome."
    ],
    'virus': [
      "Viruses range from 20 nm (parvovirus) to 400 nm (poxvirus) — smaller than most bacteria.",
      "The HIV virus has a mutation rate of ~3 × 10⁻⁵ per base per replication cycle — one of the highest known.",
      "Bacteriophage T4 injects only its DNA into bacteria, leaving the protein capsid outside.",
      "Some giant viruses (Pandoravirus, ~1 μm) challenge the traditional virus definition with 2500+ genes.",
      "The influenza virus hemagglutinin protein mutates ~1% per year, requiring new vaccines annually.",
      "Helicobacter pylori was proven to cause ulcers (Marshall & Warren, 1982) — Marshall drank the bacteria culture to prove it."
    ],
    'biotech-microbiology': [
      "Recombinant insulin (Humulin) was the first FDA-approved GMO drug in 1982, produced by E. coli.",
      "CRISPR-Cas9 gene editing was adapted from bacterial immune systems against bacteriophages.",
      "PCR (Polymerase Chain Reaction) was invented by Kary Mullis in 1983; uses Taq polymerase from thermophilic bacteria.",
      "Fermentation produces ~150 million tons of commercial products annually worth ~25 billion USD globally.",
      "Biofortification has created Golden Rice with β-carotene (provitamin A) to combat deficiency in developing nations.",
      "Bioremediation using bacteria can clean oil spills — Pseudomonas putida degrades petroleum hydrocarbons."
    ],
    'animal-adaptation': [
      "Aquatic mammals (whales, dolphins) have blubber layers 5-30 cm thick for insulation in cold water.",
      "Camels can lose 25% of body water without dying; humans die at ~15% dehydration.",
      "Arctic fox fur changes color seasonally — white in winter for camouflage, brown in summer.",
      "Birds migrate up to 11,000 km annually (Arctic tern) — the longest migration of any animal.",
      "Desert animals produce highly concentrated urine (up to 5x human concentration) to conserve water.",
      "High-altitude animals (llamas, yaks) have enlarged hearts and lungs plus special hemoglobin for low oxygen."
    ],
    'animal-behavior': [
      "Bees perform 'waggle dance' to communicate food source location within ~4° accuracy.",
      "Wolf packs have strict hierarchies with alpha, beta, and omega ranks determined by dominance displays.",
      "Cephalopod intelligence rivals vertebrates — octopuses can solve puzzles, use tools, and recognize individual humans.",
      "Fireflies synchronize flashing across entire swamps — a self-organizing behavior driven by local feedback.",
      "Ant colonies can solve optimization problems (shortest path to food) using pheromone trail laying.",
      "Migratory birds navigate using Earth's magnetic field, star patterns, and solar position simultaneously."
    ],
    'environmental-pollution': [
      "PM2.5 particles (≤2.5 μm) can penetrate deep into lungs and enter bloodstream, causing cardiovascular disease.",
      "DDT banned in 1972 but persists in soils for 15-150 years; biomagnifies 10 million-fold in food chains.",
      "Acid rain (pH <5.6) damages forests, acidifies lakes, and corrodes buildings — caused by SO₂ and NOₓ emissions.",
      "The Chernobyl disaster (1986) released 400 times more radiation than the Hiroshima atomic bomb.",
      "Nepal's air pollution in Kathmandu Valley often exceeds WHO guidelines by 10-15x during winter inversion periods.",
      "Eutrophication from agricultural runoff creates dead zones — the Gulf of Mexico dead zone spans 6000-15,000 km²."
    ],
    'biodiversity-conservation': [
      "Nepal has 4 UNESCO World Heritage sites, 10 Ramsar wetland sites, and 4 transboundary conservation areas.",
      "IUCN Red List: 44,000+ species are threatened with extinction (as of 2024).",
      "Tiger population in Nepal increased from 121 (2009) to 355 (2022) through conservation efforts.",
      "The cost of biodiversity loss is estimated at $440-880 billion annually (World Economic Forum, 2020).",
      "Seed banks (Svalbard Global Seed Vault) store 1.2 million crop seed samples as insurance against extinction.",
      "Community forestry in Nepal manages ~2.2 million hectares, involving ~16,000 community forest user groups."
    ],
    'conservation-biology': [
      "Nepal's Chitwan National Park was established in 1973; became a UNESCO site in 1984.",
      "The Bengal tiger (Panthera tigris tigris) is Nepal's national animal — ~355 individuals in 2022 census.",
      "Ex-situ conservation includes zoos, botanical gardens, seed banks, and tissue culture laboratories.",
      "Corridor conservation connects fragmented habitats — essential for genetic flow between isolated populations.",
      "Nepal's Sacred Groves (Achham, Dolpa) conserve biodiversity through traditional cultural practices.",
      "Captivity breeding programs have saved the Indian rhinoceros from near-extinction in the 1960s."
    ],
    'protected-areas': [
      "Nepal has 12 national parks, 6 hunting reserves (now wildlife reserves), 3 conservation areas, and 11 protected forests.",
      "Sagarmatha National Park (Everest) covers 1,148 km² at 2,800-8,848 m — Nepal's first UNESCO site (1979).",
      "Royal Chitwan National Park protects 956 km² of Terai rainforest, home to 68 mammal species and 543 bird species.",
      "Community-Based Natural Resource Management (CBNRM) in Nepal involves local communities in conservation decisions.",
      "The Annapurna Conservation Area Project (1986) is Asia's largest protected area at 7,629 km².",
      "Transboundary conservation with India includes the Terai Arc Landscape connecting 13 protected areas."
    ],
    'vegetation-types': [
      "Nepal's vegetation zones span from 60m (Terai subtropical) to 8,848m (Everest alpine) — unique global altitudinal range.",
      "Terai sal forests dominate the southern plains at 100-700m, with teak and rosewood also present.",
      "Rhododendron is Nepal's national flower — over 35 species found in Nepali hills and mountains.",
      "Alpine meadows (3,500-4,500m) bloom with~1,600+ flowering plant species during summer months.",
      "Nepal has ~7,000+ vascular plant species, ~10% of which are endemic (found nowhere else on Earth).",
      "Evergreen broadleaf forests at 1,000-2,000m contain oak, chestnut, maple, and magnolia species."
    ],
    'conservation-in-situ-ex-situ': [
      "In-situ conservation protects species in their natural habitats — national parks, wildlife corridors, sacred groves.",
      "Ex-situ conservation preserves species outside natural habitats — zoos, botanical gardens, seed banks, cryopreservation.",
      "Nepal's Department of National Parks and Wildlife Conservation manages 25 protected areas covering ~21% of land.",
      "The International Crops Research Institute for the Semi-Arid Tropics (ICRISAT) maintains germplasm collections.",
      "Cryopreservation stores biological material at -196°C in liquid nitrogen for long-term genetic conservation.",
      "Nepal's Community Forest User Groups (CFUGs) manage ~2.2M hectares — a model for participatory conservation."
    ]
  };
  return factsMap[slug] || [
    "Biology studies the diversity of life across approximately 8.7 million species worldwide.",
    "The smallest living organisms are mycoplasma bacteria at 0.1 micrometers in diameter.",
    "DNA contains the genetic instructions for the development and function of all known living organisms.",
    "The human genome contains approximately 3 billion base pairs across 23 pairs of chromosomes.",
    "Photosynthesis converts sunlight into chemical energy, producing approximately 130 terawatts of power globally.",
    "Cell theory states that all living organisms are composed of one or more cells, the basic unit of life."
  ];
}

function getFormulas(slug) {
  const formulasMap = {
    'ecosystem-ecology': [
      "Energy transfer efficiency: η = (Energy at level n+1 / Energy at level n) × 100%",
      "Net Primary Productivity: NPP = GPP — R (where R = respiration loss)",
      "Ecological efficiency: E = (Assimilated energy / Ingested energy) × 100%",
      "Biomass pyramids: ΣB₁ > ΣB₂ > ΣB₃ > ΣB₄ (typically, but can invert in aquatic systems)",
      "Population growth: dN/dt = rN (exponential) or dN/dt = rN(1-N/K) (logistic)",
      "Species-area relationship: S = cA^z (where S = species, A = area, c and z are constants)"
    ],
    'food-chain-web': [
      "Lindeman's trophic efficiency: η = (Production at trophic level n+1 / Production at trophic level n) × 100% ≈ 10%",
      "Food chain length: typically 3-5 trophic levels due to ~90% energy loss at each transfer",
      "Energy available at level n: Eₙ = E₁ × (0.1)^(n-1) where E₁ = primary producer energy",
      "Percent production efficiency: PBE = (Production / Assimilation) × 100%",
      "Consumption efficiency: CE = (Ingestion at trophic level n / Production at level n-1) × 100%",
      "Ecological pyramid ratio: Bₙ/Bₙ₋₁ ≈ 0.1 (10% rule for biomass transfer)"
    ],
    'biogeochemical-cycles': [
      "Carbon fixation (photosynthesis): 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
      "Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP",
      "Nitrogen fixation: N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP + 16Pi (by nitrogenase)",
      "Nitrification: NH₃ + 1.5O₂ → NO₂⁻ + H₂O + H⁺ (Nitrosomonas); NO₂⁻ + 0.5O₂ → NO₃⁻ (Nitrobacter)",
      "Denitrification: 2NO₃⁻ + 10e⁻ + 12H⁺ → N₂ + 6H₂O (by Pseudomonas in anaerobic conditions)",
      "Phosphorus cycle: apatite (Ca₅(PO₄)₃OH) → weathering → H₂PO₄⁻/HPO₄²⁻ → assimilation → sedimentation"
    ],
    'ecological-adaptation': [
      "Stomatal conductance (gs): relates CO₂ uptake to water loss — balance between photosynthesis and transpiration",
      "Water potential: Ψ = Ψs + Ψp + Ψg (solute + pressure + gravitational potential)",
      "Transpiration rate: E = g × ΔC (conductance × concentration gradient)",
      "Thermoregulation (endotherms): metabolic heat production = heat loss to environment",
      "Arrhenius equation for biochemical reactions: k = Ae^(-Ea/RT)",
      "Evaporative water loss: depends on humidity gradient, wind speed, and surface area-to-volume ratio"
    ],
    'ecological-imbalances': [
      "Greenhouse effect: ΔT = λ × ΔF (temperature change = climate sensitivity × radiative forcing)",
      "CO₂ absorption by oceans: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (causes ocean acidification)",
      "Ozone depletion: Cl· + O₃ → ClO· + O₂; ClO· + O → Cl· + O₂ (catalytic destruction cycle)",
      "Population growth rate: r = (births + immigration) - (deaths + emigration)",
      "Carrying capacity: K = resources available / resources needed per individual",
      "Extinction risk: P(extinction) increases as population size N decreases (Allee effect at small N)"
    ],
    'origin-life': [
      "Prebiotic synthesis (Miller-Urey): CH₄ + NH₃ + H₂ + H₂O + energy → amino acids + other organics",
      "RNA self-replication: RNA → RNA (ribozyme-catalyzed template copying)",
      "Hydrothermal vent chemistry: H₂ + CO₂ → [FeS/NiS catalysts] → organic molecules + CH₄",
      "Protocell formation: lipid molecules → micelles → vesicles → compartmentalization",
      "Panspermia flux: rate of organic delivery = meteorite flux × organic content × survival fraction",
      "LUCA estimation: divergence time = molecular clock rate × genetic distance between domains"
    ],
    'evidences-of-evolution': [
      "Molecular clock: divergence time (T) = genetic distance (d) / (2 × mutation rate r)",
      "Homology comparison: % identity = (identical residues / total aligned residues) × 100",
      "Fossil dating: age = parent isotope / (daughter isotope × decay constant) for radiometric dating",
      "Phylogenetic tree: branch length proportional to genetic distance or time since divergence",
      "Vestigial structure ratio: vestigial_organs / functional_organs in ancestral lineage",
      "Biogeographic distance: species similarity ∝ 1 / geographic distance (with exceptions for dispersal)"
    ],
    'theories-of-evolution': [
      "Hardy-Weinberg equilibrium: p² + 2pq + q² = 1 (allele and genotype frequencies in ideal population)",
      "Selection coefficient: s = 1 - w (where w = relative fitness of genotype)",
      "Genetic drift: Δp = random sampling error; effective population size Ne determines drift strength",
      "Mutation-selection balance: q̂ = √(μ/s) for recessive deleterious alleles (μ = mutation rate, s = selection coefficient)",
      "Gene flow effect: Δp = m(p_migrant - p_local) where m = migration rate",
      "Fitness landscape: W = f(geneotype) — peaks represent adaptive maxima, valleys represent maladaptive genotypes"
    ],
    'human-evolution': [
      "Brain size evolution: ΔV/Δt ≈ (1350 - 450) cm³ / 4,000,000 years ≈ 0.000225 cm³/year average",
      "Tool complexity index: increasing from Oldowan (choppers) → Acheulean (handaxes) → Mousterian (flakes)",
      "Migration rate: ~60,000-70,000 years ago, humans left Africa at ~1 population per generation",
      "Neanderthal interbreeding: ~1-4% Neanderthal DNA in non-African modern humans (estimated from genome comparison)",
      "Dental evolution: tooth size decreased ~40% from Homo erectus to Homo sapiens over 2 million years",
      "Bipedalism adaptation: foramen magnum position shifted forward; spine S-curve developed; pelvis shortened and widened"
    ],
    'biomolecules-functions': [
      "Michaelis-Menten: v₀ = Vmax[S] / (Km + [S])",
      "Chargaff's rule: [A]=[T] and [G]=[C] in double-stranded DNA",
      "Gibbs free energy: ΔG = ΔH - TΔS (determines spontaneity of biochemical reactions)",
      "ATP hydrolysis: ATP + H₂O → ADP + Pi (ΔG°' = -30.5 kJ/mol)",
      "Protein structure: primary → secondary (α-helix, β-sheet) → tertiary → quaternary",
      "Osmotic pressure: π = iMRT (where i = van't Hoff factor, M = molarity, R = gas constant, T = temperature)"
    ],
    'biomolecules-introduction-and-functions': [
      "Monosaccharide formula: CnH2nOn (general carbohydrate formula)",
      "Peptide bond formation: -COOH + H2N- → -CO-NH- + H2O (dehydration synthesis)",
      "Lipid energy yield: 1g fat = 9.3 kcal; 1g carbohydrate = 4.1 kcal; 1g protein = 5.65 kcal",
      "DNA base pairing: A-T (2 hydrogen bonds); G-C (3 hydrogen bonds)",
      "Enzyme kinetics: Lineweaver-Burk plot 1/v = (Km/Vmax)(1/[S]) + 1/Vmax",
      "pH calculation: pH = -log[H⁺]; pOH = -log[OH⁻]; pH + pOH = 14 (at 25°C)"
    ],
    'cell-introduction': [
      "Surface area to volume ratio: SA/V = 6/r (sphere) — limits cell size",
      "Osmosis: water moves from low solute concentration to high solute concentration across semipermeable membrane",
      "Active transport: requires ATP to move substances against concentration gradient",
      "Diffusion rate: proportional to concentration gradient × surface area / membrane thickness (Fick's law)",
      "Cell division rate: typical mammalian cell cycle = 18-24 hours (varies by cell type)",
      "Membrane permeability: small nonpolar molecules (O₂, CO₂) diffuse freely; ions require channels"
    ],
    'cell-introduction-prokaryotic-and-eukaryotic': [
      "Prokaryotic cell size: typically 0.1-5.0 μm in diameter",
      "Eukaryotic cell size: typically 10-100 μm in diameter",
      "Genome size: prokaryotes ~0.5-10 Mbp; eukaryotes ~10 Mbp - 150 Gbp",
      "Ribosome size: prokaryotes = 70S (30S + 50S); eukaryotes = 80S (40S + 60S)",
      "Cell wall composition: bacteria = peptidoglycan; archaea = pseudopeptidoglycan or S-layer; plants = cellulose",
      "DNA topology: prokaryotes = circular, supercoiled; eukaryotes = linear, wrapped around histones"
    ],
    'detail-structure-of-eukaryotic-cells': [
      "Nuclear pore complex: ~100 nm diameter, allows selective transport of molecules",
      "Mitochondrial DNA: circular, 16,569 bp in humans, encodes 13 proteins, 22 tRNAs, 2 rRNAs",
      "Endoplasmic reticulum surface area: rough ER can comprise up to 10% of total cell membrane",
      "Golgi cisternae: typically 4-8 per stack; cis face (entry) to trans face (exit) polarity",
      "Lysosomal pH: ~4.5-5.0 maintained by V-type H⁺-ATPase proton pumps",
      "Cytoskeleton filament diameter: microtubules = 25 nm; intermediate filaments = 10 nm; actin filaments = 7 nm"
    ],
    'eukaryotic-cell-structure': [
      "Plant cell wall thickness: 0.1-10 μm depending on cell type and developmental stage",
      "Chloroplast size: 2-10 μm in diameter; contain ~100-200 thylakoid membranes per grana",
      "Vacuole volume: can occupy up to 90% of plant cell volume (central vacuole)",
      "Plasmodesmata density: 10-100 per μm² of cell wall in plant tissues",
      "Peroxisome enzyme content: catalase can convert ~10⁷ H₂O₂ molecules per second",
      "Centriole length: ~0.5 μm long × 0.2 μm diameter; 9 triplet microtubules arranged circumferentially"
    ],
    'cell-division': [
      "Mitosis duration: ~1 hour in typical mammalian cells (prophase to telophase)",
      "Meiosis duration: ~24-48 hours in human oocytes; shorter in spermatocytes",
      "Chromosome condensation: 2-meter DNA molecule condenses ~10,000-fold to form visible chromosome",
      "Spindle checkpoint: ensures all chromosomes are properly attached before anaphase onset",
      "Cytokinesis timing: begins in anaphase/telophase; completes within 30-60 minutes",
      "DNA replication: ~50 nucleotides/second in eukaryotes; ~1000 nucleotides/second in prokaryotes"
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "Binary fission rate: Amoeba divides every 12-24 hours under optimal conditions",
      "Ciliary beating frequency: Paramecium beats cilia ~30 times/second",
      "Flagellar wave propagation: Euglena flagellum generates ~10-20 waves/second",
      "Contractile vacuole cycle: expels water every 10-30 seconds in freshwater Amoeba",
      "Encystment time: Entamoeba forms cysts within 24-48 hours under unfavorable conditions",
      "Schizogony cycle: Plasmodium merozoites reproduce every 48-72 hours in human RBCs"
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "Body symmetry classification: asymmetrical (sponges), radial (cnidarians), bilateral (most animals)",
      "Coelom types: acoelomate (flatworms), pseudocoelomate (nematodes), true coelomate (annelids, arthropods, chordates)",
      "Segmentation: metamerism allows regional specialization — each segment (somite) can have specialized functions",
      "Body cavity pressure: hydrostatic skeleton in soft-bodied animals relies on fluid pressure (0.1-1 atm typically)",
      "Symmetry plane: bilateral symmetry allows cephalization (head formation with concentrated sensory organs)",
      "Phylogenetic relationship: molecular data (18S rRNA) revised traditional morphological classifications"
    ],
    'earthworm': [
      "Peristaltic wave speed: ~2 cm/second along earthworm body",
      "Setae extension: each seta can extend ~0.5 mm from body wall",
      "Coelomic fluid pressure: varies from 0.1-0.5 kPa during locomotion",
      "Digestive transit time: ~2-4 hours from ingestion to egestion",
      "Gas exchange rate: cutaneous respiration provides ~60% of O₂ requirement; remainder via buccal cavity",
      "Reproductive compatibility: earthworms are hermaphroditic but cross-fertilize (mutual sperm exchange)"
    ],
    'frog-habit-and-habitat-external-features': [
      "Jump distance: Rana tigrina can leap 2+ meters horizontally in a single jump",
      "Swim speed: ~0.5-1.0 body lengths/second in water",
      "Skin permeability: water loss rate ~0.1-1.0 mg/cm²/hour depending on humidity",
      "Tympanum frequency response: detects sounds from 50 Hz to 10 kHz (optimal 1-4 kHz for mating calls)",
      "Larval development time: egg to tadpole ~3-7 days; tadpole to froglet ~2-4 months depending on species",
      "Metamorphosis duration: ~4-8 weeks from tadpole to frog, dependent on temperature and food availability"
    ],
    'frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration': [
      "Heart rate: ~30-80 beats/minute at 20°C; increases with temperature (Q₁₀ effect)",
      "Blood volume: ~5-7% of body weight in frogs",
      "Cardiac output: ~1-3 mL/min/g body weight",
      "Pulmonary ventilation rate: ~10-30 breaths/minute at rest",
      "Cutaneous gas exchange: skin contributes ~20-50% of total O₂ uptake depending on activity and humidity",
      "Circulatory pathway: systemic circuit (body) and pulmocutaneous circuit (lungs + skin) share single ventricle"
    ],
    'frog-reproductive-system-male-and-female-reproductive-organs': [
      "Egg clutch size: 2,000-15,000 eggs per female depending on species and body size",
      "Sperm count: ~10⁸-10⁹ sperm per ejaculation in male frogs",
      "Fertilization success: ~60-80% of eggs typically fertilized under natural conditions",
      "Incubation period: eggs hatch in 3-7 days depending on water temperature (20-25°C optimal)",
      "Metamorphic hormones: thyroid hormone (T3/T4) concentrations peak during metamorphosis climax",
      "Sexual maturity: reached at 1-3 years depending on species and environmental conditions"
    ],
    'monera-detailed': [
      "Generation time: E. coli divides every 20 minutes under optimal conditions (37°C, rich medium)",
      "Cell size: typical bacterium = 1-5 μm length × 0.5-1.0 μm diameter",
      "Cell density: ~10⁸-10⁹ cells per gram of soil; ~10⁶-10⁸ cells per mL of freshwater",
      "DNA content: ~1-10 pg per bacterial cell (1 pg ≈ 10⁹ daltons ≈ 10⁹ base pairs)",
      "Protein content: ~55% of dry weight; RNA ~20%; peptidoglycan ~10-40% of cell wall dry weight",
      "Membrane potential: -120 to -150 mV (interior negative) in most bacteria"
    ],
    'virus': [
      "Virion size: 20-400 nm in diameter (smaller than 0.1 μm resolution limit of light microscopy)",
      "Mutation rate: RNA viruses ~10⁻³ to 10⁻⁵ mutations per nucleotide per replication cycle",
      "Replication time: influenza virus completes life cycle in 6-8 hours; HIV in 2-3 days",
      "Particle concentration: ~10⁹-10¹² virions per mL in infected host",
      "Capsid protein subunits: ~3-60+ copies depending on virus (icosahedral symmetry: 60T subunits)",
      "Genome size: 3,000 bp (parvovirus) to 2.5 million bp (mimivirus) — bridging gap with bacteria"
    ],
    'biotech-microbiology': [
      "PCR amplification: DNA doubles every cycle — 2^n copies after n cycles (theoretical maximum ~10⁹-fold)",
      "Insulin yield: 1 L of E. coli culture can produce ~100-500 mg of recombinant insulin",
      "Fermentation efficiency: ethanol yield from glucose = 0.51 g ethanol / g glucose (theoretical maximum)",
      "CRISPR efficiency: gene editing success rates typically 20-80% depending on target sequence and cell type",
      "Antibiotic production: Streptomyces species produce ~2/3 of naturally derived antibiotics",
      "Bioreactor scale-up: laboratory (1-10 L) → pilot (100-1000 L) → industrial (10,000-100,000 L)"
    ],
    'animal-adaptation': [
      "Thermal conductivity: fat (blubber) has thermal conductivity ~0.2 W/(m·K) — 4x lower than water",
      "Heat dissipation: surface area-to-volume ratio determines heat loss rate (smaller animals lose heat faster)",
      "Water conservation: desert animals produce urine with osmolarity up to 5,000-6,000 mOsm/L (human: ~1,200 max)",
      "Altitude adaptation: hemoglobin-oxygen affinity increases in high-altitude species (right shift of dissociation curve)",
      "Insulation value: fur/feather trapping air provides R-value of 2-10 (m²·K/W) depending on density and thickness",
      "Metabolic rate adjustment: hibernating animals reduce metabolic rate to 1-5% of normal (Q₁₀ effect)"
    ],
    'animal-behavior': [
      "Waggle dance duration: directly proportional to distance — ~1 second per 1 km (approximately)",
      "Pheromone detection threshold: ants detect pheromones at concentrations as low as 10⁻¹⁵ M",
      "Magnetic field detection: cryptochrome proteins in bird eyes may enable magnetoreception",
      "Optimal foraging: animals maximize energy intake per unit time — cost-benefit analysis of prey selection",
      "Courtship display energy: peacock tail display costs ~10-20% of daily energy budget",
      "Learning rate: habituation occurs within 1-10 exposures; classical conditioning requires repeated pairings"
    ],
    'environmental-pollution': [
      "PM2.5 exposure: WHO guideline = 15 μg/m³ (24-hour mean); often 10-15x exceeded in polluted cities",
      "DDT half-life: 2-15 years in soil; biomagnifies 10⁶-10⁷ fold in food chains",
      "Acid rain pH: natural rain pH = 5.6 (CO₂ saturation); acid rain pH = 4.0-5.0 (H₂SO₄, HNO₃)",
      "CO₂ concentration: pre-industrial = 280 ppm; current (2024) = ~420 ppm — 50% increase",
      "Eutrophication: nitrogen/phosphorus loading > 1 mg/L triggers algal blooms in freshwater systems",
      "Biodegradation rate: varies by compound — pesticides 1 month to 150 years; plastics decades to centuries"
    ],
    'biodiversity-conservation': [
      "Species-area relationship: S = cA^z (z typically 0.2-0.35 for islands, 0.1-0.2 for continents)",
      "Minimum viable population (MVP): ~500 individuals to maintain genetic diversity over 100 years",
      "Extinction debt: species still present but committed to extinction due to past habitat destruction",
      "Genetic diversity loss: heterozygosity decreases by 1/(2Ne) per generation due to drift",
      "Conservation cost: ~$30-100 billion/year needed to prevent mass extinction (IUCN estimate)",
      "Protected area effectiveness: well-managed parks reduce deforestation by 50-90% compared to unprotected areas"
    ],
    'conservation-biology': [
      "Carrying capacity: K = (available resources) / (resource requirement per individual)",
      "Population viability: P(survival) = 1 - (1/(2Ne))^t over t generations",
      "Genetic drift impact: allele frequency change σ² = p(1-p)/(2Ne) per generation",
      "Habitat fragmentation: edge effect increases proportionally with perimeter-to-area ratio",
      "Corridor width: minimum 100-500 m for large mammals; 10-50 m for small mammals and insects",
      "Captive breeding success: ~30-50% of species successfully reintroduced with adequate pre-release training"
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Biodiversity estimate: ~8.7 million eukaryotic species (estimated); ~1.5 million described",
      "Cell size range: 0.1 μm (Mycoplasma) to 170 mm (ostrich egg) — 1.7 billion-fold difference",
      "Genome size range: 0.2 Mbp (nanoarchaeote) to 150 Gbp ( Paris japonica ) — 750,000-fold difference",
      "Metabolic rate scaling: B = B₀M^0.75 (Kleiber's law) — metabolic rate scales to 3/4 power of mass",
      "Photosynthetic efficiency: theoretical maximum ~11%; actual crop efficiency ~0.5-2% of solar energy",
      "Human genome: ~3 billion base pairs, ~20,000-25,000 protein-coding genes, ~98.5% non-coding DNA"
    ],
    'relation-of-biology-with-other-sciences': [
      "Biochemistry: protein molecular weight ~10⁴-10⁶ Da; enzyme turnover numbers 10-10⁶ reactions/sec",
      "Biophysics: membrane potential ~-70 mV; action potential amplitude ~100 mV; conduction velocity 0.5-120 m/s",
      "Bioinformatics: BLAST search speed ~10⁶-10⁷ sequences/hour; database size ~10¹⁴ bases (2024)",
      "Biostatistics: sample size calculation n = (Zα + Zβ)²σ²/δ² for detecting effect size δ",
      "Biomathematics: logistic growth dN/dt = rN(1-N/K); predator-prey: dN/dt = rN - aNP, dP/dt = caNP - dP",
      "Neuroscience: synaptic transmission ~1-100 ms; neuronal firing rate 0.1-1000 Hz; ~10¹⁵ synapses in human brain"
    ]
  };
  return formulasMap[slug] || [
    "Basic biochemical reaction: A + B → C + D (generic enzymatic reaction)",
    "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light-dependent reactions)",
    "Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP",
    "Osmosis: water moves from hypotonic to hypertonic solution across semipermeable membrane",
    "Enzyme kinetics: v = Vmax[S] / (Km + [S]) (Michaelis-Menten equation)",
    "pH calculation: pH = -log[H⁺]"
  ];
}

function getTricks(slug) {
  const tricksMap = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Mnemonic for biology fields: 'CET PNB' — Cytology, Embryology, Taxonomy, Physiology, Botany, Neurobiology, Zoology",
      "To remember the scope: think 'BIO' = Breadth (all life), Investigation (research), Organization (hierarchy from molecule to biosphere)",
      "Quick recall: Biology = Study of Life; Life = M.R.G.O.W.T (Movement, Respiration, Growth, Excretion, Waste removal, Organization, Taste/Sensitivity)"
    ],
    'relation-of-biology-with-other-sciences': [
      "Biology-Physics bridge: Biophysics studies forces, energy, and motion in living systems — think 'biomechanics'",
      "Biology-Chemistry bridge: Biochemistry studies molecular basis of life — think 'metabolic pathways'",
      "Biology-Computer bridge: Bioinformatics = Biology + Informatics — think 'sequence analysis'",
      "Memory trick: 'BIO' relates to all sciences: B = Biochemistry, I = Interdisciplinary, O = Organisms"
    ],
    'biomolecules-functions': [
      "Remember 4 biomolecules: 'CPLN' — Carbohydrates, Proteins, Lipids, Nucleic acids",
      "Energy yield trick: Lipids (9 kcal/g) > Proteins (4 kcal/g) ≈ Carbs (4 kcal/g) — remember 'LIPIDS have twice the energy'",
      "DNA base pairs: 'A-T' (2 bonds) and 'G≡C' (3 bonds) — remember 'AT is easy (2), GC is strong (3)'",
      "Enzyme inhibition: Competitive = competes for active site; Non-competitive = binds elsewhere, changes shape",
      "Chargaff's rule: 'A=T, G=C' — always equal pairs in dsDNA"
    ],
    'biomolecules-introduction-and-functions': [
      "Carbohydrate formula mnemonic: 'CH₂O' repeated n times — like a sugar staircase",
      "Protein structure levels: 'SPAT' — Secondary (α-helix, β-sheet), Primary (sequence), Tertiary (3D fold), Quaternary (subunits)",
      "Lipid types: 'SPL' — Simple (triglycerides), Phospho (phospholipids), Derived (steroids)",
      "Nucleic acid difference: 'RNA has Uracil, DNA has Thymine' — remember 'R,U,N,A' and 'D,T,N,A'"
    ],
    'cell-introduction': [
      "Cell theory 3 parts: 'All living things are made of cells; cells are basic unit; new cells come from pre-existing cells'",
      "Prokaryote vs Eukaryote: 'PRO' has no true nucleus; 'EU' has true nucleus — remember 'PRO = No TRUE nucleus, EU = TRUE nucleus'",
      "Cell size limit: SA:V ratio — small cells have higher SA:V, better for exchange",
      "Organelle functions: 'Mitochondria = power house, Ribosomes = protein factories, Lysosomes = waste disposal'"
    ],
    'cell-introduction-prokaryotic-and-eukaryotic': [
      "Prokaryote features: 'No nucleus, no organelles, circular DNA, 70S ribosomes, cell wall present' — remember 'PCRN' = Prokaryote Cells Remember",
      "Eukaryote features: 'Has nucleus, membrane-bound organelles, linear DNA, 80S ribosomes, diverse cell walls' — remember 'ENU' = Eukaryotic Nuclear Organization",
      "Key difference mnemonic: 'PROkaryotes PROhibit nucleus; EUkaryotes HAVE nucleus'"
    ],
    'cell-division': [
      "Mitosis phases: 'PMAT' — Prophase, Metaphase, Anaphase, Telophase — remember 'Please Make A Team'",
      "Meiosis I vs II: 'Meiosis I separates homologous chromosomes; Meiosis II separates sister chromatids'",
      "Cell cycle phases: 'G1-S-G2-M' — Growth 1, Synthesis (DNAreplication), Growth 2, Mitosis",
      "Checkpoint mnemonic: 'G1 checks size/nutrients, G2 checks DNA replication, M checks spindle attachment'"
    ],
    'ecosystem-ecology': [
      "Trophic levels: 'Producers → Primary → Secondary → Tertiary' — remember 'PPST' (Like Pepsi)",
      "10% rule: 'Only 10% energy passes to next level; 90% lost as heat' — remember '10% goes, 90% goes warm'",
      "Ecosystem components: 'Biotic (living) + Abiotic (non-living)' — remember 'BA' for Biotic-Abiotic",
      "Energy flow: 'Sun → Producer → Consumer → Decomposer' — remember 'SPCD' (Spiral)"
    ],
    'food-chain-web': [
      "Food chain types: 'Grazing (plant→herbivore→carnivore)' and 'Detrital (dead matter→decomposer→detritivore)'",
      "Food web complexity: more connections = more stability — remember 'Complex webs withstand disturbances better'",
      "Trophic levels energy loss: '10% rule' — each level loses ~90% energy as heat",
      "Pyramid types: 'Energy pyramid always upright; Biomass pyramid can invert; Number pyramid can invert'"
    ],
    'biogeochemical-cycles': [
      "Major cycles: 'C-N-P-W' — Carbon, Nitrogen, Phosphorus, Water cycles",
      "Nitrogen cycle steps: 'Fixation → Nitrification → Assimilation → Ammonification → Denitrification' — remember 'FNAA'D'",
      "Carbon cycle key processes: 'Photosynthesis removes CO₂; Respiration adds CO₂; Combustion adds CO₂'",
      "Water cycle steps: 'Evaporation → Condensation → Precipitation → Collection' — remember 'ECCP'"
    ],
    'ecological-adaptation': [
      "Adaptation types: 'Structural (body form), Physiological (internal processes), Behavioral (actions)' — remember 'SPB'",
      "Xerophyte adaptations: 'Thick cuticle, sunken stomata, reduced leaves, deep roots' — remember 'TSRD' (Tired, Sleepy, Resting, Deep)",
      "Hydrophyte adaptations: 'Thin cuticle, air spaces (aerenchyma), weak support, shallow roots' — remember 'TAWS' (Too Airy, Weak Support)",
      "Conservation strategies: 'In-situ (habitat protection) vs Ex-situ (outside habitat)' — remember 'IN' and 'EX'"
    ],
    'ecological-imbalances': [
      "Climate change causes: 'Greenhouse gases (CO₂, CH₄, N₂O, CFCs) trap heat' — remember 'GCNC' (Greenhouse Cuts Nitrogen Compounds)",
      "Pollution types: 'Air, Water, Soil, Noise, Thermal, Radioactive' — remember 'AWSTR' (A Water Street)",
      "Biodiversity loss causes: 'Habitat loss, Overexploitation, Pollution, Invasive species, Climate change' — remember 'HO PIC' (Habitat Overexploitation, Pollution, Invasive Creatures)",
      "Nepal's conservation: 'National parks, Wildlife reserves, Conservation areas, Protected forests' — remember 'NWCP'"
    ],
    'origin-life': [
      "Origin theories: 'Abiogenesis (life from non-life), Panspermia (life from space), Hydrothermal vent (life at vents)' — remember 'APH'",
      "Miller-Urey experiment: 'Simulated early Earth conditions produced amino acids' — remember 'M-U made amino acids'",
      "RNA world hypothesis: 'RNA came before DNA and proteins — RNA stored info AND catalyzed reactions' — remember 'RNA first, DNA later'",
      "Timeline: 'Earth 4.6 BYA; Life 3.5-4.0 BYA; Eukaryotes 2.0 BYA; Multicellular 1.0 BYA' — remember approximate dates"
    ],
    'evidences-of-evolution': [
      "Evidence types: 'Fossil, Anatomical (homologous/analogous), Embryological, Molecular, Biogeographical' — remember 'FAEMB'",
      "Homologous vs Analogous: 'Homologous = same origin, different function; Analogous = different origin, same function' — remember 'HO = Home (same origin), AN = Airport (different origin, same function)'",
      "Vestigial structures: 'Appendix, Coccyx, Wisdom teeth, Blind spot' — remember 'ACWW' (A Cold Wind Whistles)",
      "Molecular evidence: 'DNA/protein similarity indicates relatedness' — remember 'More similar = closer relatives'"
    ],
    'theories-of-evolution': [
      "Lamarck: 'Use and disuse; inheritance of acquired characteristics' — remember 'Lamarck believed characteristics acquired during life are inherited'",
      "Darwin: 'Natural selection — survival of the fittest, descent with modification' — remember 'Darwin = Selection'",
      "Modern synthesis: 'Darwin + Mendel + Population genetics' — remember 'Modern = Darwin's selection + Mendel's genes'",
      "Key difference: 'Lamarck = acquired traits inherited; Darwin = natural selection on variation'"
    ],
    'human-evolution': [
      "Human evolution sequence: 'Australopithecus → Homo habilis → Homo erectus → Homo heidelbergensis → Homo sapiens' — remember 'AH-E-H'",
      "Brain size increase: '450 cm³ (Australopithecus) → 600 cm³ (H. habilis) → 900 cm³ (H. erectus) → 1350 cm³ (H. sapiens)' — remember '450-600-900-1350'",
      "Key milestones: 'Bipedalism → Tool use → Fire → Language → Agriculture' — remember 'BTFLA'",
      "Neanderthal facts: 'Lived 400-40 kya in Europe; interbred with H. sapiens; went extinct ~40 kya' — remember 'NEANDERTHAL'"
    ],
    'biomolecules-functions': [
      "Biomolecule test: 'Benedict's = reducing sugars; Biuret = proteins; Iodine = starch; Sudan III = lipids' — remember 'BIBS' (Benedict-Iodine-Biuret-Sudan)",
      "Amino acid structure: 'Central carbon + amino group + carboxyl group + H + R group' — remember 'C-A-C-H-R'",
      "DNA vs RNA: 'DNA = deoxyribose, thymine, double strand; RNA = ribose, uracil, single strand' — remember 'D-D-T vs R-R-S'",
      "Enzyme names: usually end in '-ase' (lactase, amylase, protease) — remember 'enzymes end in ase'"
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "Protozoa classification by locomotion: 'Mastigophora (flagella), Sarcodina (pseudopodia), Ciliophora (cilia), Sporozoa (no locomotion)' — remember 'MFCS' (Mastigo-Fago-Cilio-Spore)",
      "Plasmodium life cycle: 'Mosquito bite → Liver stage → Blood stage → Gametocytes → Mosquito gut → Sporozoites' — remember 'MLB-GMS' (Mosquito-Liver-Blood-Gamete-Mosquito-Sporozoite)",
      "Paramecium features: 'Slipper shape, cilia, two nuclei (macro + micro), contractile vacuole, trichocysts' — remember 'SCMCT' (Slipper Cilia Multiple Contractile Trichocysts)",
      "Amoeba features: 'Shapeless, pseudopodia, food vacuole, contractile vacuole, binary fission' — remember 'SPFCB' (Shapeless Pseudopodia Food vacuole Contractile Binary fission)"
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "Animal phyla memory: 'Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata, Chordata' — remember 'PCPAN MAEC' (Please Call My Phone At Nine, Make Every Call)",
      "Symmetry types: 'Asymmetrical (sponges), Radial (jellyfish), Bilateral (most animals)' — remember 'AR-B' (Asymmetrical-Radial-Bilateral)",
      "Body cavity types: 'Acoelomate (flatworms), Pseudocoelomate (roundworms), Coelomate (segmented worms, arthropods, chordates)' — remember 'APP' (A-Pseudo-Coelomate)",
      "Segmentation: 'Annelids show true metamerism; arthropods show tagmatization (functional grouping of segments)' — remember 'A=true, A=grouped'"
    ],
    'earthworm': [
      "Earthworm anatomy: 'Setae (bristles), clitellum (reproductive), typhlosole (internal fold for absorption), 5 pairs of hearts' — remember 'SCTH' (Setae-Clitellum-Typhlosole-Hearts)",
      "Earthworm reproduction: 'Hermaphrodite, cross-fertilization, cocoon formation, direct development' — remember 'HCCD' (Hermaphrodite Cross-fertilization Cocoon Direct)",
      "Earthworm respiration: 'Cutaneous (through skin)' — remember 'Earthworms breathe through their skin'",
      "Earthworm excretion: 'Nephridia (one pair per segment)' — remember 'Nephridia = kidney equivalent'"
    ],
    'frog-habit-and-habitat-external-features': [
      "Frog external features: 'Tympanum (ear), nictitating membrane (third eyelid), webbed feet, sticky tongue' — remember 'TNWF' (Tympanum-Nictitating Webbed Feet)",
      "Frog habitat: 'Freshwater environments, moist skin, amphibious (land and water)' — remember 'FWMS' (Fresh Water Moist Skin)",
      "Frog classification: 'Order Anura = tailless amphibians' — remember 'Anura = no tail (an = without,oura = tail)'",
      "Frog senses: 'Forward-facing eyes for binocular vision, tympanum for hearing, lateral line in tadpoles' — remember 'E-T-L' (Eyes-Tympanum-Lateral line)"
    ],
    'frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration': [
      "Frog heart: '3 chambers (2 atria + 1 ventricle) — partial septum prevents complete mixing' — remember '3C-PS' (3 Chambers-Partial Septum)",
      "Frog respiration: '3 methods: cutaneous (skin), buccal (mouth), pulmonary (lungs)' — remember 'CBP' (Cutaneous-Buccal-Pulmonary)",
      "Frog circulation: 'Double circulation — pulmonary circuit (lungs+skin) + systemic circuit (body)' — remember 'DC' (Double Circulation)",
      "Frog digestion: 'Short intestine (herbivore tendency), liver produces bile, pancreas produces enzymes' — remember 'SI-LP' (Short Intestine-Liver-Pancreas)"
    ],
    'frog-reproductive-system-male-and-female-reproductive-organs': [
      "Frog reproduction: 'External fertilization, aquatic development, metamorphosis' — remember 'FAM' (Fertilization-Aquatic- Metamorphosis)",
      "Male reproductive: 'Paired testes, renal/renonephric ducts, cloaca' — remember 'PTRC' (Testes-Pores-Renal Cloaca)",
      "Female reproductive: 'Paired ovaries, oviducts, cloaca' — remember 'POC' (Ovaries-Oviducts-Cloaca)",
      "Frog life cycle: 'Egg → Tadpole → Froglet → Adult' — remember 'ETFA' (Egg-Tadpole-Froglet-Adult)"
    ],
    'monera-detailed': [
      "Bacteria shapes: 'Coccus (spherical), Bacillus (rod), Vibrio (comma), Spirillum (spiral)' — remember 'CBVS' (See Be Ve Es)",
      "Bacterial nutrition: 'Autotrophic (make own food) vs Heterotrophic (consume others)' — remember 'AH' (Auto-Hetero)",
      "Bacterial reproduction: 'Binary fission (asexual) — one cell divides into two identical cells' — remember 'BF' (Binary Fission)",
      "Endospore: 'Dormant, resistant structure formed by some bacteria (Bacillus, Clostridium)' — remember 'Endospore = survival package'"
    ],
    'virus': [
      "Virus structure: 'Capsid (protein coat) + Nucleic acid (DNA or RNA) + sometimes Envelope' — remember 'CNE' (Capsid-Nucleic acid-Envelope)",
      "Virus types by nucleic acid: 'DNA viruses (Herpes, smallpox) vs RNA viruses (Influenza, HIV, Corona)' — remember 'DR' (DNA-RNA)",
      "Lytic vs Lysogenic: 'Lytic = immediate replication and host death; Lysogenic = viral DNA integrates into host genome' — remember 'L=Lethal, L=Latent'",
      "Bacteriophage: 'Virus that infects bacteria — has head (capsid), tail, tail fibers' — remember 'Phage = bacterial eater'"
    ],
    'biotech-microbiology': [
      "Recombinant DNA technology: 'Cut DNA with restriction enzymes → join with ligase → insert into vector → transform host' — remember 'CRILV'T (Cut-Restrict-Insert-Ligate-Vector-Transform)",
      "PCR steps: 'Denaturation (94°C) → Annealing (50-65°C) → Extension (72°C)' — remember 'DAE' (Denature-Anneal-Extend)",
      "Insulin production: 'Human insulin gene inserted into E. coli → bacteria produce human insulin' — remember 'HIG-Ecoli'",
      "CRISPR-Cas9: 'Guide RNA directs Cas9 to cut specific DNA sequence → cell repairs with desired change' — remember 'GRC' (Guide-RNA-Cut)"
    ],
    'animal-adaptation': [
      "Aquatic adaptations: 'Streamlined body, fins/flippers, gills, blubber, salt glands' — remember 'SFBGS' (Streamlined-Fins- Gills-Blubber-Salt)",
      "Terrestrial adaptations: 'Lungs, limbs, waterproof skin, amniotic egg, excretory adaptations' — remember 'LLWEA' (Lungs-Limbs-Waterproof-Excretory-Amniotic)",
      "Volant (flying) adaptations: 'Wings, lightweight bones, feathers, powerful chest muscles, efficient respiration' — remember 'WLFP' (Wings-Lightweight-Feathers-Powerful)",
      "Camouflage types: 'Cryptic (blend in), Mimicry (copy another organism), Warning coloration (aposematic)' — remember 'CMM' (Cryptic-Mimicry-Mimicry-warning)"
    ],
    'animal-behavior': [
      "Behavior types: 'Instinctive (innate) vs Learned (acquired)' — remember 'IL' (Instinctive-Learned)",
      "Reflex action: 'Automatic, involuntary response to stimulus — involves spinal cord, not brain' — remember 'RA-IS' (Reflex Automatic-Involuntary-Spinal)",
      "Taxis vs Kinesis: 'Taxis = directed movement toward/away from stimulus; Kinesis = random change in activity rate' — remember 'TK' (Taxis-Kinesis)",
      "Social behavior: 'Dominance hierarchy, leadership, courtship, parental care, communication' — remember 'DLCC' (Dominance-Leadership-Courtship-Communication)"
    ],
    'environmental-pollution': [
      "Pollution sources: 'Point source (factory smokestack) vs Non-point source (agricultural runoff)' — remember 'PN' (Point-Nonpoint)",
      "Air pollutants: 'Primary (directly emitted: CO, SO₂, NOx, PM) vs Secondary (formed in atmosphere: O₃, H₂SO₄)' — remember 'PS' (Primary-Secondary)",
      "Water pollutants: 'Biological (pathogens), Chemical (pesticides, heavy metals), Physical (heat, sediment)' — remember 'BCP' (Biological-Chemical-Physical)",
      "Soil pollutants: 'Pesticides, heavy metals, salts, organic waste, radioactive materials' — remember 'PHSOR' (Pesticides-Heavy metals-Salts-Organic-Radioactive)"
    ],
    'biodiversity-conservation': [
      "Biodiversity levels: 'Genetic, Species, Ecosystem' — remember 'GSE' (Genetic-Species-Ecosystem)",
      "Threats to biodiversity: 'Habitat loss, Overexploitation, Pollution, Invasive species, Climate change' — remember 'HO PIC' (Habitat Overexploitation Pollution Invasive Creatures Climate)",
      "Conservation status categories: 'LC (Least Concern), NT (Near Threatened), VU (Vulnerable), EN (Endangered), CR (Critically Endangered), EW (Extinct in Wild), EX (Extinct)' — remember 'LNV-ECEW' (El En Vee Eye Ess Ee Dba Cee Aye Ex Weye)",
      "Nepal's biodiversity: '44,000+ plant species, 1,000+ bird species, 183 mammal species, 151 reptile species, 119 amphibian species, 620+ fish species' — remember '44-1-18-15-11-62'"
    ],
    'conservation-biology': [
      "In-situ conservation: 'National parks, Wildlife sanctuaries, Biosphere reserves, Sacred groves' — remember 'NWBS' (National parks-Wildlife reserves-Biosphere-Sacred groves)",
      "Ex-situ conservation: 'Zoos, Botanical gardens, Seed banks, Cryopreservation, Tissue culture' — remember 'ZBSC' (Zoos-Botanical gardens-Seed banks-Cryopreservation)",
      "Nepal's protected areas: '12 national parks, 6 wildlife reserves, 3 conservation areas, 11 protected forests' — remember '12-6-3-11'",
      "Key species in Nepal: 'Tiger (national animal), Rhinoceros, Snow leopard, Himalayan black bear, Gharial' — remember 'TRSGH' (Tiger-Rhino-Snow leopard-Gharial-Himalayan bear)"
    ],
    'protected-areas': [
      "Nepal's national parks: 'Chitwan, Sagarmatha, Langtang, Annapurna, Bardia, Shuklaphanta, Koshi Tappu, Rara, Banke, Parsa, Goldest, Helambu' — remember 'C-S-L-A-B-S-K-R-B-P-G-H' (first letters)",
      "UNESCO sites in Nepal: 'Sagarmatha (1979), Chitwan (1984), Kathmandu Valley (1979), Lumbini (1997)' — remember 'SCKL'",
      "Ramsar sites in Nepal: '10 wetlands including Koshi Tappu, Shey Phoksundo, Ghodaghodi Tal' — remember '10 Ramsar sites'",
      "Transboundary conservation: 'Terai Arc Landscape (Nepal-India), Central Himalaya (Nepal-China-India)' — remember 'TAL-CH'"
    ],
    'vegetation-types': [
      "Nepal's vegetation zones: 'Terai (60-1000m), Subtropical (1000-2000m), Temperate (2000-3000m), Subalpine (3000-4000m), Alpine (4000-4500m), Nival (>4500m)' — remember 'T-S-T-SA-A-N' (Terai-Subtropical-Temperate-Subalpine-Alpine-Nival)",
      "Terai vegetation: 'Sal (Shorea robusta) dominant, with ironwood, bamboo, grasslands' — remember 'Sal forests of Terai'",
      "Subtropical vegetation: 'Teak, Sal, Sissoo, Oak, Chestnut' — remember 'TSSOC' (Teak-Sissoo-Oak-Chestnut)",
      "Temperate vegetation: 'Oak, Rhododendron, Maple, Cinchona, Deodar' — remember 'ORMDC' (Oak-Rhododendron-Maple-Dhonke-Cinchona)"
    ],
    'conservation-in-situ-ex-situ': [
      "In-situ methods: 'National parks, Wildlife sanctuaries, Conservation areas, Protected forests, Community forests, Sacred groves' — remember 'NWCCPS' (National parks-Wildlife sanctuaries-Conservation areas-Protected forests-Community forests-Sacred groves)",
      "Ex-situ methods: 'Zoos, Botanical gardens, Seed banks, Gene banks, Cryopreservation, Tissue culture labs' — remember 'ZB-SG-CC' (Zoos-Botanical gardens-Seed banks-Gene banks-Cryopreservation-Cell culture)",
      "Nepal's community forestry: '16,000+ community forest user groups managing 2.2 million hectares' — remember '16K-2.2M'",
      "Success stories: 'Tiger population increased from 121 (2009) to 355 (2022); Rhinoceros from 178 (1982) to 752 (2022)' — remember 'T121→355, R178→752'"
    ]
  };
  return tricksMap[slug] || [
    "Quick recall tip: Always read the question carefully before answering.",
    "Memory aid: Use mnemonics to remember lists and sequences.",
    "Exam strategy: Start with questions you know best to build confidence.",
    "Time management: Allocate time proportionally to marks available.",
    "Diagram practice: Draw and label diagrams neatly for better visualization.",
    "Definition memorization: Learn key definitions verbatim for maximum marks."
  ];
}

function getImportantNotes(slug) {
  const notesMap = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Biology is not just about memorizing facts — it requires understanding processes and relationships.",
      "The hierarchy of life organization: atom → molecule → cell → tissue → organ → system → organism → population → community → ecosystem → biosphere.",
      "CEE frequently asks about the scope of biology and its branches — know the definitions of cytology, embryology, taxonomy, and physiology.",
      "The characteristic features of living organisms (MRS GREN) are fundamental and often tested in MCQ format."
    ],
    'relation-of-biology-with-other-sciences': [
      "Biochemistry is the most interconnected branch — it bridges biology with chemistry at the molecular level.",
      "Biophysics applies principles of mechanics, electricity, and thermodynamics to biological systems.",
      "Bioinformatics has become essential with the explosion of genomic data — over 200 billion bases sequenced daily.",
      "Biostatistics is crucial for experimental design and data analysis in all biological research."
    ],
    'biomolecules-functions': [
      "CEE High-Yield: Chargaff's rules are frequently tested — remember [A]=[T] and [G]=[C] for dsDNA.",
      "The difference between competitive and non-competitive enzyme inhibition is a common exam topic.",
      "ATP structure and function must be understood — it's the universal energy currency of the cell.",
      "Protein denaturation destroys 3D structure but NOT the primary sequence — this is a key distinction."
    ],
    'biomolecules-introduction-and-functions': [
      "CEE High-Yield: Remember the energy values — carbohydrates and proteins provide ~4 kcal/g; lipids provide ~9 kcal/g.",
      "The four levels of protein structure (primary, secondary, tertiary, quaternary) are essential for exams.",
      "Chargaff's parity rules apply ONLY to double-stranded DNA — single-stranded DNA and RNA do not follow these rules.",
      "Glycosidic bonds link monosaccharides; peptide bonds link amino acids; phosphodiester bonds link nucleotides."
    ],
    'cell-introduction': [
      "CEE High-Yield: Cell theory has three main postulates — all organisms are made of cells, cells are the basic unit of life, and all cells come from pre-existing cells.",
      "The cell membrane is selectively permeable — this property is essential for maintaining homeostasis.",
      "Osmosis, diffusion, and active transport are the three mechanisms of substance movement across membranes.",
      "Eukaryotic cells have membrane-bound organelles; prokaryotic cells do not — this is the fundamental distinction."
    ],
    'cell-introduction-prokaryotic-and-eukaryotic': [
      "CEE High-Yield: Prokaryotes include bacteria and archaea; eukaryotes include protists, fungi, plants, and animals.",
      "The endosymbiotic theory explains the origin of mitochondria and chloroplasts — they were once free-living bacteria.",
      "Prokaryotic cells reproduce by binary fission; eukaryotic cells divide by mitosis and meiosis.",
      "The nuclear envelope is a double membrane with nuclear pores — it separates transcription (nucleus) from translation (cytoplasm) in eukaryotes."
    ],
    'cell-division': [
      "CEE High-Yield: Mitosis produces 2 genetically identical diploid cells; meiosis produces 4 genetically unique haploid cells.",
      "Crossing over occurs during Prophase I of meiosis — this is a source of genetic variation.",
      "The cell cycle has four phases: G1 (growth), S (DNA synthesis), G2 (preparation for division), and M (mitosis).",
      "Cancer results from uncontrolled cell division — mutations in genes regulating the cell cycle (cyclins, CDKs, tumor suppressors)."
    ],
    'ecosystem-ecology': [
      "CEE High-Yield: The 10% law of energy transfer was proposed by Raymond Lindeman in 1942.",
      "Ecosystems have two main components: biotic (living) and abiotic (non-living) — both interact continuously.",
      "Energy flow in ecosystems is unidirectional (sun → producers → consumers → decomposers) and lost as heat at each trophic level.",
      "Nepal's diverse topography creates multiple ecosystem types — from tropical Terai to alpine Himalayan zones."
    ],
    'food-chain-web': [
      "CEE High-Yield: Food chains typically have 3-5 trophic levels due to energy loss at each transfer (~90% lost as heat).",
      "The 10% energy transfer rule means only about 10% of energy at one trophic level is available to the next level.",
      "Food webs are more realistic than food chains because they show multiple feeding relationships.",
      "Ecological pyramids can be upright (energy) or inverted (biomass in aquatic ecosystems, numbers in tree ecosystems)."
    ],
    'biogeochemical-cycles': [
      "CEE High-Yield: The nitrogen cycle is crucial because atmospheric N₂ (78%) is unusable by most organisms — nitrogen fixation is essential.",
      "Carbon cycle connects all living organisms — carbon is the backbone of all organic molecules.",
      "The water cycle is driven by solar energy and gravity — evaporation, condensation, precipitation, and collection.",
      "Phosphorus cycle is the slowest biogeochemical cycle — it has no atmospheric component and relies on rock weathering."
    ],
    'ecological-adaptation': [
      "CEE High-Yield: Xerophytes have adaptations for water conservation (thick cuticle, sunken stomata, reduced leaves); hydrophytes have adaptations for aquatic life (air spaces, thin cuticle, weak support).",
      "Adaptations can be structural (physical features), physiological (internal processes), or behavioral (actions).",
      "r-selected species produce many offspring with little parental care; K-selected species produce few offspring with extensive parental care.",
      "Nepal's altitudinal zonation creates distinct vegetation belts — each with specialized adaptations."
    ],
    'ecological-imbalances': [
      "CEE High-Yield: Climate change is primarily driven by increased greenhouse gas concentrations from fossil fuel combustion and deforestation.",
      "Biodiversity loss is the second major environmental crisis (after climate change) — currently 1,000-10,000 times the background extinction rate.",
      "Nepal is particularly vulnerable to climate change due to its mountainous terrain and reliance on monsoon-dependent agriculture.",
      "The concept of 'environmental carrying capacity' defines the maximum population size an environment can sustain indefinitely."
    ],
    'origin-life': [
      "CEE High-Yield: The Miller-Urey experiment (1953) simulated early Earth conditions and produced amino acids — supporting abiogenesis.",
      "The RNA world hypothesis suggests RNA preceded DNA and proteins — RNA can both store genetic information and catalyze reactions.",
      "Hydrothermal vent theory proposes that life originated at deep-sea vents where chemical energy and minerals were abundant.",
      "LUCA (Last Universal Common Ancestor) is estimated to have lived 3.5-4.0 billion years ago — the common ancestor of all life."
    ],
    'evidences-of-evolution': [
      "CEE High-Yield: Homologous structures indicate common ancestry (divergent evolution); analogous structures indicate similar selective pressures (convergent evolution).",
      "Fossil record provides direct evidence of evolution — transitional fossils show intermediate forms between major groups.",
      "Molecular evidence (DNA/protein sequences) provides the most precise measure of evolutionary relationships.",
      "Vestigial structures (appendix, coccyx, wisdom teeth) are remnants of ancestral features that have lost their original function."
    ],
    'theories-of-evolution': [
      "CEE High-Yield: Lamarck proposed inheritance of acquired characteristics; Darwin proposed natural selection — Lamarck was wrong, Darwin was right (with modern modifications).",
      "Darwin's key observations: (1) populations produce more offspring than can survive; (2) there is variation among individuals; (3) variation is heritable.",
      "The modern synthesis (1930s-1950s) combined Darwin's natural selection with Mendelian genetics and population genetics.",
      "Neutral theory (Kimura, 1968) argues that most evolutionary changes at the molecular level are due to genetic drift, not natural selection."
    ],
    'human-evolution': [
      "CEE High-Yield: Key human evolution milestones — bipedalism (Australopithecus), tool use (Homo habilis), fire control (Homo erectus), language (Homo sapiens).",
      "Brain size increased from ~450 cm³ in Australopithecus to ~1350 cm³ in modern humans — a 3-fold increase over 4 million years.",
      "Neanderthals (Homo neanderthalensis) interbred with Homo sapiens — 1-4% of non-African human DNA is Neanderthal.",
      "The 'Out of Africa' hypothesis is supported by genetic evidence — all modern humans descend from a population that migrated from Africa ~60,000-70,000 years ago."
    ],
    'biomolecules-functions': [
      "CEE High-Yield: The four major biomolecules are carbohydrates, proteins, lipids, and nucleic acids — each has distinct structure and function.",
      "Enzymes are biological catalysts that lower activation energy — they are not consumed in reactions and can be reused.",
      "DNA structure: double helix, antiparallel strands, complementary base pairing (A-T, G-C), sugar-phosphate backbone.",
      "Protein structure determines function — denaturation (unfolding) destroys function but not the primary sequence."
    ],
    'cell-introduction': [
      "CEE High-Yield: The cell is the basic structural and functional unit of all living organisms — all cells come from pre-existing cells.",
      "Cell size is limited by the surface area-to-volume ratio — as cells grow, volume increases faster than surface area.",
      "All cells have a plasma membrane, cytoplasm, ribosomes, and genetic material (DNA) — these are universal features.",
      "The cytoplasm contains organelles suspended in cytosol — the site of many metabolic reactions."
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "CEE High-Yield: Protozoa are classified by locomotion: Mastigophora (flagella), Sarcodina (pseudopodia), Ciliophora (cilia), Sporozoa (no locomotion).",
      "Plasmodium causes malaria — understand its complex life cycle involving both human and mosquito hosts.",
      "Paramecium is a model organism for studying ciliary movement, osmoregulation, and conjugation.",
      "Amoeba exhibits phagocytosis — pseudopodia surround food particles to form food vacuoles."
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "CEE High-Yield: The 9 major animal phyla are: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata, Chordata.",
      "Body symmetry: asymmetrical (sponges), radial (cnidarians), bilateral (most animals) — bilateral symmetry allows cephalization.",
      "Body cavities: acoelomate (no cavity), pseudocoelomate (false cavity), coelomate (true cavity lined by mesoderm).",
      "Segmentation (metamerism) allows specialization of body regions — seen prominently in annelids and arthropods."
    ],
    'earthworm': [
      "CEE High-Yield: Earthworms are hermaphrodites (both male and female reproductive organs in one individual) but cross-fertilize.",
      "Earthworm respiration is cutaneous (through skin) — skin must remain moist for gas exchange.",
      "The digestive system includes: mouth → buccal cavity → pharynx → esophagus → crop → gizzard → intestine → anus.",
      "Earthworms are important for soil health — they aerate soil, mix organic matter, and produce nutrient-rich castings."
    ],
    'frog-habit-and-habitat-external-features': [
      "CEE High-Yield: Frogs are amphibians (Class Amphibia, Order Anura = 'without tail') — they live both on land and in water.",
      "Frog skin is permeable to water and gases — they can breathe through their skin (cutaneous respiration).",
      "External features: tympanum (external ear), nictitating membrane (third eyelid), webbed feet (swimming), sticky tongue (catching prey).",
      "Frogs have a three-chambered heart (2 atria + 1 ventricle) — partial separation of oxygenated and deoxygenated blood."
    ],
    'frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration': [
      "CEE High-Yield: Frog respiration occurs through 3 methods: cutaneous (skin), buccal (mouth lining), and pulmonary (lungs).",
      "Frog heart has 3 chambers: 2 atria + 1 partially septated ventricle — prevents complete mixing of oxygenated and deoxygenated blood.",
      "Frog circulation is double circulation: pulmonary circuit (heart → lungs/skin → heart) and systemic circuit (heart → body → heart).",
      "The cloaca is a common chamber receiving digestive, urinary, and reproductive products — it opens to the exterior."
    ],
    'frog-reproductive-system-male-and-female-reproductive-organs': [
      "CEE High-Yield: Frogs have external fertilization — eggs and sperm are released into water simultaneously (spawning).",
      "Male frogs have vocal sacs for amplifying mating calls — used to attract females during breeding season.",
      "Frog development: egg → blastula → gastrula → neurula → tadpole → froglet → adult (metamorphosis).",
      "Metamorphosis is controlled by thyroid hormones (T3 and T4) — iodine deficiency during pregnancy can cause developmental issues."
    ],
    'monera-detailed': [
      "CEE High-Yield: Monera includes bacteria and cyanobacteria (blue-green algae) — they are prokaryotic (no membrane-bound nucleus).",
      "Bacterial shapes: coccus (spherical), bacillus (rod-shaped), vibrio (comma-shaped), spirillum (spiral).",
      "Bacteria reproduce by binary fission — one cell divides into two genetically identical daughter cells.",
      "Endospores are dormant, resistant structures formed by some bacteria (Bacillus, Clostridium) under unfavorable conditions."
    ],
    'virus': [
      "CEE High-Yield: Viruses are acellular — they are not considered living organisms because they cannot reproduce independently.",
      "Virus structure: nucleic acid core (DNA or RNA) + protein coat (capsid) + sometimes lipid envelope.",
      "Lytic cycle: virus infects host → replicates → lyses (breaks open) host cell → new virions released.",
      "Lysogenic cycle: viral DNA integrates into host genome (prophage) → replicates with host cell → can later enter lytic cycle."
    ],
    'biotech-microbiology': [
      "CEE High-Yield: Recombinant DNA technology involves cutting DNA with restriction enzymes, joining fragments with DNA ligase, and inserting into host cells.",
      "PCR (Polymerase Chain Reaction) amplifies DNA — each cycle doubles the amount (exponential amplification).",
      "Insulin production: human insulin gene inserted into E. coli — bacteria produce human insulin for diabetics.",
      "CRISPR-Cas9 is a revolutionary gene-editing tool derived from bacterial immune systems against phages."
    ],
    'animal-adaptation': [
      "CEE High-Yield: Aquatic adaptations: streamlined body, fins/flippers, gills, blubber, salt-excreting glands.",
      "Terrestrial adaptations: lungs for air breathing, limbs for locomotion, waterproof skin, amniotic egg, concentrated urine.",
      "Volant (flying) adaptations: wings, lightweight bones, feathers, powerful flight muscles, efficient respiratory system.",
      "Nepal's animals show remarkable adaptations: snow leopard (thick fur, large nasal cavities for cold air), tiger (stripes for camouflage), rhinoceros (thick skin for protection)."
    ],
    'animal-behavior': [
      "CEE High-Yield: Behavior types: instinctive (innate, genetic) vs learned (acquired through experience).",
      "Reflex action: automatic, involuntary response to stimulus — involves spinal cord, not brain (e.g., knee-jerk reflex).",
      "Taxis: directional movement toward (positive) or away from (negative) stimulus (e.g., phototaxis, chemotaxis).",
      "Kinesis: non-directional change in activity rate in response to stimulus intensity (e.g., woodlice move faster in dry areas)."
    ],
    'environmental-pollution': [
      "CEE High-Yield: Air pollution: primary pollutants (CO, SO₂, NOx, PM) emitted directly; secondary pollutants (O₃, H₂SO₄) formed in atmosphere.",
      "Water pollution: biological (pathogens), chemical (pesticides, heavy metals), physical (heat, sediment, radioactivity).",
      "Soil pollution: pesticides, heavy metals, salts, organic waste, radioactive materials — affects crop quality and human health.",
      "Nepal's air pollution in Kathmandu Valley often exceeds WHO guidelines by 10-15x during winter due to inversion layers and vehicle emissions."
    ],
    'biodiversity-conservation': [
      "CEE High-Yield: Biodiversity has three levels: genetic diversity (within species), species diversity (between species), ecosystem diversity (between ecosystems).",
      "Threats to biodiversity: habitat loss (primary threat), overexploitation, pollution, invasive species, climate change (HIPPCO).",
      "IUCN Red List categories: LC (Least Concern), NT (Near Threatened), VU (Vulnerable), EN (Endangered), CR (Critically Endangered), EW (Extinct in Wild), EX (Extinct).",
      "Nepal has 355 tigers (2022 census), 752 rhinoceroses (2022), and is home to the endangered Bengal tiger and greater one-horned rhinoceros."
    ],
    'conservation-biology': [
      "CEE High-Yield: In-situ conservation: protecting species in their natural habitats (national parks, wildlife sanctuaries, sacred groves).",
      "Ex-situ conservation: protecting species outside their natural habitats (zoos, botanical gardens, seed banks, tissue culture labs).",
      "Nepal's conservation success: tiger population increased from 121 (2009) to 355 (2022); rhinoceros from 178 (1982) to 752 (2022).",
      "Community forestry in Nepal: 16,000+ community forest user groups manage 2.2 million hectares — a global model for participatory conservation."
    ],
    'protected-areas': [
      "CEE High-Yield: Nepal has 12 national parks, 6 wildlife reserves, 3 conservation areas, and 11 protected forests.",
      "Chitwan National Park (established 1973) was Nepal's first national park and a UNESCO World Heritage site (1984).",
      "Sagarmatha National Park (Everest) covers 1,148 km² and includes the world's highest peak (8,848 m).",
      "The Terai Arc Landscape connects 13 protected areas across Nepal and India — critical for tiger and rhino corridors."
    ],
    'vegetation-types': [
      "CEE High-Yield: Nepal's vegetation zones by altitude: Terai (60-1000m), Subtropical (1000-2000m), Temperate (2000-3000m), Subalpine (3000-4000m), Alpine (4000-4500m), Nival (>4500m).",
      "Terai vegetation: Sal (Shorea robusta) is dominant — mixed deciduous forests with teak, bamboo, and grasslands.",
      "Temperate vegetation: Oak, rhododendron (national flower), maple, cinchona, deodar — diverse and species-rich.",
      "Alpine vegetation: dwarf juniper, rhododendron, wildflowers — limited to high-altitude meadows and scree slopes."
    ],
    'conservation-in-situ-ex-situ': [
      "CEE High-Yield: In-situ = conservation IN the natural habitat (national parks, sanctuaries, corridors, sacred groves).",
      "Ex-situ = conservation OUTSIDE the natural habitat (zoos, botanical gardens, seed banks, gene banks, cryopreservation).",
      "Nepal's community forestry is a successful in-situ model — 16,000+ community groups manage 2.2M hectares.",
      "Ex-situ conservation in Nepal: Chitwan breeding center for rhinos, King Mahendra Conservation Trust for carnivores, National Trust for Nature Conservation (NTNC) for species recovery."
    ]
  };
  return notesMap[slug] || [
    "Always read the question carefully to understand what is being asked.",
    "Use diagrams to clarify complex biological processes.",
    "Memorize key definitions and terminology for MCQ questions.",
    "Practice numerical problems in ecology (energy transfer, population growth).",
    "Understand the difference between homologous and analogous structures.",
    "Review past NEB exam questions to identify frequently tested topics."
  ];
}

function getExamNotes(slug) {
  const notesMap = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "NEB Exam Focus: Characteristics of living organisms (MRS GREN), scope of biology, hierarchy of life organization.",
      "Previous Year Questions: 'Define biology and state its scope.' 'List the characteristics of living organisms with examples.'",
      "Marking Scheme Tips: Define terms precisely; use examples; draw diagrams where applicable; explain processes step-by-step.",
      "Common Mistakes: Students confuse taxonomy with systematics; forget that viruses are on the borderline of living/non-living."
    ],
    'biomolecules-functions': [
      "NEB Exam Focus: Structure and function of carbohydrates, proteins, lipids, nucleic acids; enzyme kinetics; Chargaff's rules.",
      "Previous Year Questions: 'Explain the structure of DNA with a diagram.' 'Differentiate between competitive and non-competitive inhibition.'",
      "Marking Scheme Tips: Label diagrams correctly; use proper terminology (glycosidic bond, peptide bond, phosphodiester bond); show calculations clearly.",
      "Common Mistakes: Students confuse α-1,4 and β-1,4 glycosidic bonds; forget that sucrose is non-reducing."
    ],
    'cell-introduction': [
      "NEB Exam Focus: Cell theory, cell organelles and their functions, cell membrane structure and transport mechanisms.",
      "Previous Year Questions: 'Describe the fluid mosaic model of the cell membrane.' 'Differentiate between osmosis and diffusion.'",
      "Marking Scheme Tips: Draw labeled diagrams of organelles; explain functions in relation to structure; use the correct terminology (selectively permeable, hypertonic, hypotonic).",
      "Common Mistakes: Students confuse plant and animal cell structures; forget that centrioles are absent in higher plant cells."
    ],
    'cell-division': [
      "NEB Exam Focus: Mitosis and meiosis stages, differences between them, significance in growth and reproduction.",
      "Previous Year Questions: 'Describe the stages of mitosis with diagrams.' 'Differentiate between mitosis and meiosis.'",
      "Marking Scheme Tips: Draw neat, labeled diagrams for each stage; mention key events (chromosome condensation, spindle formation, cytokinesis); highlight differences in a table format.",
      "Common Mistakes: Students confuse prophase I and prophase of mitosis; forget that crossing over occurs only in meiosis I."
    ],
    'ecosystem-ecology': [
      "NEB Exam Focus: Ecosystem components, trophic levels, energy flow, ecological pyramids, 10% law.",
      "Previous Year Questions: 'Explain the 10% law of energy transfer with an example.' 'Draw and explain an ecological pyramid of energy.'",
      "Marking Scheme Tips: Use the 10% law in calculations; draw pyramids with correct proportions; explain why energy pyramids are always upright.",
      "Common Mistakes: Students forget that energy pyramids are always upright (never inverted); confuse biomass pyramids with energy pyramids."
    ],
    'food-chain-web': [
      "NEB Exam Focus: Food chains and food webs, trophic levels, ecological pyramids, energy flow efficiency.",
      "Previous Year Questions: 'Construct a food chain from a given food web.' 'Calculate the energy available at different trophic levels.'",
      "Marking Scheme Tips: Show energy calculations using the 10% rule; identify producers, primary consumers, secondary consumers correctly; explain why food chains are short (3-5 levels).",
      "Common Mistakes: Students reverse the direction of energy flow; forget that decomposers are essential in food webs."
    ],
    'biogeochemical-cycles': [
      "NEB Exam Focus: Carbon cycle, nitrogen cycle, water cycle — processes and importance.",
      "Previous Year Questions: 'Explain the nitrogen cycle with a diagram.' 'What is the importance of nitrogen fixation?'",
      "Marking Scheme Tips: Draw labeled diagrams showing all major processes; mention key organisms (Rhizobium, Nitrosomonas, Nitrobacter, Pseudomonas); explain the role of each process.",
      "Common Mistakes: Students confuse nitrification with denitrification; forget that nitrogen fixation converts N₂ to NH₃."
    ],
    'ecological-adaptation': [
      "NEB Exam Focus: Adaptations of hydrophytes and xerophytes, r and K selection, ecological succession.",
      "Previous Year Questions: 'Describe the adaptations of xerophytes with examples.' 'Differentiate between r-strategists and K-strategists.'",
      "Marking Scheme Tips: List adaptations with examples; draw diagrams showing structural adaptations; compare r and K strategies in a table.",
      "Common Mistakes: Students confuse hydrophyte and xerophyte adaptations; forget that succession has two types (primary and secondary)."
    ],
    'ecological-imbalances': [
      "NEB Exam Focus: Climate change, biodiversity loss, pollution, conservation strategies in Nepal.",
      "Previous Year Questions: 'What are the causes and effects of climate change?' 'Discuss the biodiversity crisis and its causes.'",
      "Marking Scheme Tips: Use specific data (temperature rise, species extinction rates); mention Nepal-specific examples; suggest practical conservation measures.",
      "Common Mistakes: Students give general answers without specific examples; forget to mention Nepal's vulnerability to climate change."
    ],
    'origin-life': [
      "NEB Exam Focus: Origin of life theories, Miller-Urey experiment, RNA world hypothesis, evidence for abiogenesis.",
      "Previous Year Questions: 'Describe the Miller-Urey experiment and its significance.' 'Explain the RNA world hypothesis.'",
      "Marking Scheme Tips: Draw the Miller-Urey apparatus; explain the experimental conditions and results; discuss the significance for origin of life theories.",
      "Common Mistakes: Students confuse the Miller-Urey experiment with other origin-of-life experiments; forget to mention the significance of the results."
    ],
    'evidences-of-evolution': [
      "NEB Exam Focus: Fossil record, homologous and analogous structures, embryological evidence, molecular evidence.",
      "Previous Year Questions: 'What are homologous structures? Give examples and explain their significance.' 'How does molecular evidence support evolution?'",
      "Marking Scheme Tips: Define terms clearly; give specific examples; explain the significance of each type of evidence; compare homologous vs analogous structures.",
      "Common Mistakes: Students confuse homologous and analogous structures; forget that vestigial structures are evidence for evolution."
    ],
    'theories-of-evolution': [
      "NEB Exam Focus: Lamarckism, Darwinism, modern synthesis, key differences between theories.",
      "Previous Year Questions: 'Explain Darwin's theory of natural selection.' 'Why is Lamarckism rejected? Give reasons.'",
      "Marking Scheme Tips: Explain Darwin's observations and conclusions; list the postulates of natural selection; give specific reasons why Lamarck's theory is incorrect.",
      "Common Mistakes: Students attribute Lamarck's theory as partially correct (it's largely wrong); forget to mention the modern synthesis."
    ],
    'human-evolution': [
      "NEB Exam Focus: Human evolution timeline, key species, brain size increase, key milestones.",
      "Previous Year Questions: 'Describe the evolution of humans from Australopithecus to Homo sapiens.' 'What are the key milestones in human evolution?'",
      "Marking Scheme Tips: Create a timeline with dates and brain sizes; mention key species in order; explain the significance of each milestone (bipedalism, tool use, fire, language).",
      "Common Mistakes: Students put species in wrong chronological order; forget brain size progression; confuse Homo erectus with Homo habilis."
    ],
    'biomolecules-functions': [
      "NEB Exam Focus: Structure of biomolecules, enzyme action, Chargaff's rules, ATP function.",
      "Previous Year Questions: 'Draw and label the structure of a nucleotide.' 'Explain competitive enzyme inhibition with a diagram.'",
      "Marking Scheme Tips: Draw labeled diagrams; use correct chemical terminology; show calculations for Chargaff's rule problems; explain mechanisms clearly.",
      "Common Mistakes: Students forget that DNA is antiparallel; confuse the number of hydrogen bonds in A-T vs G-C pairs."
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "NEB Exam Focus: Classification of protozoa by locomotion, Plasmodium life cycle, Paramecium structure, Amoeba features.",
      "Previous Year Questions: 'Classify protozoa with examples.' 'Describe the life cycle of Plasmodium with a diagram.'",
      "Marking Scheme Tips: Use a classification table; draw the Plasmodium life cycle showing both human and mosquito stages; label all parts of Paramecium.",
      "Common Mistakes: Students confuse the classes of protozoa; forget that Sporozoa are non-motile in adult stage; miss the sexual phase in Plasmodium life cycle."
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "NEB Exam Focus: Major animal phyla characteristics, body plans, symmetry types, coelom types, diagnostic features.",
      "Previous Year Questions: 'Compare and contrast acoelomate, pseudocoelomate, and coelomate body plans.' 'Describe the diagnostic features of Phylum Chordata.'",
      "Marking Scheme Tips: Use comparison tables; draw diagrams showing body plans; list diagnostic features clearly; give examples for each phylum.",
      "Common Mistakes: Students confuse pseudocoelomate with coelomate; forget that echinoderms are deuterostomes; miss the notochord as a chordate characteristic."
    ],
    'earthworm': [
      "NEB Exam Focus: External and internal anatomy, digestive system, circulatory system, reproduction.",
      "Previous Year Questions: 'Draw and label the external anatomy of earthworm.' 'Describe the digestive system of earthworm with a diagram.'",
      "Marking Scheme Tips: Draw neat, labeled diagrams; explain functions of each part; mention the importance of earthworms in agriculture.",
      "Common Mistakes: Students confuse the crop with the gizzard; forget that earthworms are hermaphrodites; miss the typhlosole function."
    ],
    'frog-habit-and-habitat-external-features': [
      "NEB Exam Focus: External features, habitat adaptations, classification, sensory organs.",
      "Previous Year Questions: 'Describe the external features of frog with a diagram.' 'How is frog adapted to amphibious life?'",
      "Marking Scheme Tips: Draw labeled diagram of external features; explain adaptations for aquatic and terrestrial life; mention the importance of moist skin.",
      "Common Mistakes: Students forget the nictitating membrane; confuse tympanum with ear drum; miss the webbed feet adaptation."
    ],
    'monera-detailed': [
      "NEB Exam Focus: Bacterial structure, shapes, nutrition, reproduction, endospores, economic importance.",
      "Previous Year Questions: 'Describe the structure of a typical bacterium with a diagram.' 'Differentiate between Gram-positive and Gram-negative bacteria.'",
      "Marking Scheme Tips: Draw labeled diagram of bacterial structure; explain Gram staining difference; give economic examples (beneficial and harmful).",
      "Common Mistakes: Students confuse Gram-positive and Gram-negative cell wall structure; forget that archaebacteria are distinct from eubacteria."
    ],
    'virus': [
      "NEB Exam Focus: Virus structure, replication cycles (lytic and lysogenic), bacteriophage, economic importance.",
      "Previous Year Questions: 'Describe the structure of a bacteriophage with a diagram.' 'Differentiate between lytic and lysogenic cycles.'",
      "Marking Scheme Tips: Draw labeled diagram of bacteriophage; explain each step of both cycles; mention viral diseases and their importance.",
      "Common Mistakes: Students forget that viruses are acellular; confuse lytic and lysogenic cycles; miss the prophage stage in lysogenic cycle."
    ],
    'animal-adaptation': [
      "NEB Exam Focus: Aquatic, terrestrial, and volant adaptations, Nepalese animal adaptations, camouflage types.",
      "Previous Year Questions: 'Describe the adaptations of aquatic animals with examples.' 'How are Nepalese mammals adapted to high altitudes?'",
      "Marking Scheme Tips: Use specific examples (snow leopard, tiger, rhinoceros); explain structural, physiological, and behavioral adaptations; mention camouflage types.",
      "Common Mistakes: Students give generic adaptations without specific examples; forget physiological adaptations; miss the distinction between structural and behavioral adaptations."
    ],
    'environmental-pollution': [
      "NEB Exam Focus: Types of pollution, causes and effects, control measures, Nepal-specific pollution issues.",
      "Previous Year Questions: 'Discuss the causes and effects of air pollution in Kathmandu Valley.' 'What are the control measures for water pollution?'",
      "Marking Scheme Tips: Use specific data (WHO guidelines, Nepal pollution levels); mention specific pollutants and their sources; suggest practical control measures.",
      "Common Mistakes: Students give general answers without Nepal-specific context; forget to mention point and non-point sources; miss the economic costs of pollution."
    ],
    'biodiversity-conservation': [
      "NEB Exam Focus: Levels of biodiversity, threats, IUCN categories, conservation strategies, Nepal's biodiversity.",
      "Previous Year Questions: 'What are the major threats to biodiversity?' 'Describe Nepal's approach to biodiversity conservation.'",
      "Marking Scheme Tips: Use specific numbers (tiger population, species counts); mention IUCN categories with examples; discuss both in-situ and ex-situ conservation.",
      "Common Mistakes: Students forget the three levels of biodiversity; confuse IUCN categories; give vague answers about conservation strategies."
    ],
    'conservation-biology': [
      "NEB Exam Focus: In-situ and ex-situ conservation, Nepal's protected areas, community forestry, conservation success stories.",
      "Previous Year Questions: 'Differentiate between in-situ and ex-situ conservation with examples.' 'Describe Nepal's community forestry program.'",
      "Marking Scheme Tips: Use specific examples from Nepal; mention population trends (tigers, rhinos); discuss community involvement; suggest improvements.",
      "Common Mistakes: Students confuse in-situ and ex-situ examples; forget to mention community forestry; miss the economic benefits of conservation."
    ],
    'protected-areas': [
      "NEB Exam Focus: Types of protected areas in Nepal, their significance, management approaches, challenges.",
      "Previous Year Questions: 'List the national parks of Nepal and their significance.' 'What are the challenges in managing protected areas in Nepal?'",
      "Marking Scheme Tips: List all 12 national parks with area and year of establishment; mention key species in each; discuss management challenges and solutions.",
      "Common Mistakes: Students forget the number of national parks; confuse national parks with wildlife reserves; miss the transboundary conservation initiatives."
    ],
    'vegetation-types': [
      "NEB Exam Focus: Vegetation zones in Nepal by altitude, characteristic species, conservation status, human impacts.",
      "Previous Year Questions: 'Describe the vegetation zones of Nepal with altitude ranges and characteristic species.' 'What are the threats to Nepal's vegetation?'",
      "Marking Scheme Tips: Create a table with altitude ranges, vegetation types, and characteristic species; mention endemic species; discuss threats and conservation measures.",
      "Common Mistakes: Students give wrong altitude ranges; forget characteristic species for each zone; miss the impact of climate change on vegetation zones."
    ],
    'conservation-in-situ-ex-situ': [
      "NEB Exam Focus: Difference between in-situ and ex-situ, methods, advantages and disadvantages, Nepal's approach.",
      "Previous Year Questions: 'Differentiate between in-situ and ex-situ conservation with examples.' 'Evaluate the success of community forestry in Nepal.'",
      "Marking Scheme Tips: Use comparison table; give specific examples from Nepal; discuss advantages and disadvantages of each approach; mention success stories and challenges.",
      "Common Mistakes: Students confuse the two approaches; give only one example for each; forget to discuss advantages and disadvantages."
    ]
  };
  return notesMap[slug] || [
    "Focus on understanding concepts rather than rote memorization.",
    "Practice drawing labeled diagrams — they carry significant marks.",
    "Learn key definitions exactly as given in the textbook for marking purposes.",
    "Solve numerical problems in ecology (energy transfer, population growth) regularly.",
    "Review previous year questions to understand the exam pattern and marking scheme.",
    "Use mnemonics and memory aids for classification and cycles."
  ];
}

function getExercises(slug) {
  const exercisesMap = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      { problem: "List all branches of biology and give one example of study for each.", solution: "Anatomy (study of internal structures), Physiology (study of functions), Genetics (study of heredity), Ecology (study of organism-environment interactions), Taxonomy (study of classification), Evolution (study of origins and changes over time)." },
      { problem: "Explain the hierarchy of life organization with a suitable example.", solution: "Atom (carbon) → Molecule (glucose) → Organelle (chloroplast) → Cell (plant cell) → Tissue (parenchyma) → Organ (leaf) → System (photosynthetic system) → Organism (maple tree) → Population (all maple trees in a forest) → Community (all organisms in the forest) → Ecosystem (forest + abiotic factors) → Biosphere (all ecosystems on Earth)." },
      { problem: "Define biology and explain its importance in daily life.", solution: "Biology is the scientific study of life and living organisms. Importance: (1) Understanding human health and disease, (2) Agriculture and food production, (3) Medicine and pharmaceuticals, (4) Environmental conservation, (5) Biotechnology and genetic engineering, (6) Understanding our place in the natural world." }
    ],
    'biomolecules-functions': [
      { problem: "Calculate the percentage of each base in a DNA molecule that has 20% adenine.", solution: "Given: A = 20%. By Chargaff's rules: A = T = 20%, so A + T = 40%. Remaining: G + C = 60%. Since G = C, G = C = 30%. Answer: A=20%, T=20%, G=30%, C=30%." },
      { problem: "Explain why sucrose is a non-reducing sugar while maltose is reducing.", solution: "Sucrose: both anomeric carbons (C1 of glucose and C2 of fructose) are involved in the glycosidic bond — no free anomeric carbon to open and reduce. Maltose: only C1 of first glucose is involved; C1 of second glucose is free → can open to aldehyde form → reduces Benedict's reagent." },
      { problem: "Calculate the molecular weight of a tripeptide formed from glycine, alanine, and valine.", solution: "MW of Gly = 75, Ala = 89, Val = 117. Tripeptide formation: 3 amino acids → 2 peptide bonds → 2 H₂O lost. MW = (75 + 89 + 117) - 2(18) = 281 - 36 = 245 g/mol." }
    ],
    'cell-introduction': [
      { problem: "Calculate the surface area to volume ratio for a cubic cell with side length 10 μm.", solution: "SA = 6 × (10 μm)² = 600 μm². Volume = (10 μm)³ = 1000 μm³. SA:V = 600:1000 = 0.6 μm⁻¹. For a 1 μm cell: SA = 6, V = 1, SA:V = 6. Smaller cells have higher SA:V ratios — more efficient for exchange." },
      { problem: "Explain why a cell cannot grow indefinitely large.", solution: "As a cell grows, volume increases faster than surface area (volume ∝ r³, surface area ∝ r²). This decreases the SA:V ratio, reducing the efficiency of material exchange across the membrane. Also, the nucleus has limited capacity to control a larger cytoplasmic volume. Cells divide when they reach a critical size to maintain efficient exchange." },
      { problem: "Differentiate between hypertonic, hypotonic, and isotonic solutions with examples.", solution: "Hypertonic: higher solute concentration outside cell → water leaves cell → plasmolysis (plant) or crenation (animal). Example: Salt water on freshwater amoeba. Hypotonic: lower solute concentration outside → water enters cell → turgor (plant) or lysis (animal). Example: Freshwater for marine organisms. Isotonic: equal concentration — no net water movement. Example: 0.9% NaCl for human RBCs." }
    ],
    'cell-division': [
      { problem: "If a cell has 14 chromosomes, how many chromosomes will each daughter cell have after mitosis?", solution: "After mitosis: each daughter cell has the same number of chromosomes as the parent cell. Answer: 14 chromosomes per daughter cell." },
      { problem: "If a cell has 14 chromosomes, how many chromosomes will each gamete have after meiosis?", solution: "After meiosis: chromosome number is halved. Answer: 7 chromosomes per gamete (haploid)." },
      { problem: "Calculate the number of cells after 5 rounds of mitosis starting from 1 cell.", solution: "After 1 division: 2 cells. After 2: 4. After 3: 8. After 4: 16. After 5: 32 cells. Formula: 2ⁿ where n = number of divisions. 2⁵ = 32 cells." }
    ],
    'ecosystem-ecology': [
      { problem: "If producers have 10,000 J of energy, calculate energy available at each trophic level using the 10% law.", solution: "Producer: 10,000 J. Primary consumer: 1,000 J (10%). Secondary consumer: 100 J (10%). Tertiary consumer: 10 J (10%). Quaternary consumer: 1 J (10%). Only 0.01% of original energy reaches the top consumer." },
      { problem: "Calculate the biomass at the 4th trophic level if the 1st trophic level has 5,000 kg.", solution: "T1 (producer): 5,000 kg. T2 (primary consumer): 500 kg. T3 (secondary consumer): 50 kg. T4 (tertiary consumer): 5 kg. Using 10% rule at each transfer." },
      { problem: "An ecosystem receives 1,000,000 J of solar energy. Calculate energy available to tertiary consumers (assume 1% solar capture by producers).", solution: "Solar energy: 1,000,000 J. Producer capture (1%): 10,000 J. Primary consumer (10%): 1,000 J. Secondary consumer (10%): 100 J. Tertiary consumer (10%): 10 J. Overall efficiency from solar to tertiary: 0.001%." }
    ],
    'food-chain-web': [
      { problem: "In a food chain: Grass → Grasshopper → Frog → Snake → Hawk, if grass has 100,000 J, calculate energy at each level.", solution: "Grass (producer): 100,000 J. Grasshopper (primary): 10,000 J. Frog (secondary): 1,000 J. Snake (tertiary): 100 J. Hawk (quaternary): 10 J. Only 0.01% of original energy reaches the top predator." },
      { problem: "Construct a food web from: grass, rabbit, fox, deer, hawk, snake, grasshopper, mouse.", solution: "Grass → Grasshopper → Frog → Snake → Hawk. Grass → Rabbit → Fox. Grass → Deer → Lion (if present). Mouse → Snake → Hawk. Mouse → Fox. (Multiple interconnected chains form a web, increasing ecosystem stability.)" },
      { problem: "Explain why food chains rarely exceed 4-5 trophic levels.", solution: "At each trophic level, ~90% of energy is lost as heat (metabolism, movement, heat production). Only ~10% is available to the next level. After 4-5 levels, insufficient energy remains to support another trophic level. Example: Starting with 10,000 J at producer level, only ~1 J remains at the 5th level — insufficient to sustain a population." }
    ],
    'biogeochemical-cycles': [
      { problem: "Calculate the amount of nitrogen fixed by Rhizobium in a field with 100 kg N/ha/year fixation capacity over 5 years.", solution: "Annual fixation: 100 kg N/ha. Over 5 years: 100 × 5 = 500 kg N/ha. Note: This is a simplification — actual fixation varies with soil conditions, legume species, and climate." },
      { problem: "If a lake receives 50 kg of phosphorus annually and outputs 45 kg, calculate the accumulation over 10 years.", solution: "Annual accumulation: 50 - 45 = 5 kg/year. Over 10 years: 5 × 10 = 50 kg. This accumulation can lead to eutrophication — excessive algal growth, oxygen depletion, and fish kills." },
      { problem: "Explain why the phosphorus cycle has no atmospheric component.", solution: "Phosphorus is a solid at room temperature and pressure. Its compounds (phosphates) are not volatile. The cycle involves: weathering of rocks → phosphate in soil/water → assimilation by organisms → decomposition → sedimentation → geological uplift → weathering again. No significant atmospheric reservoir exists." }
    ],
    'ecological-adaptation': [
      { problem: "Compare the adaptations of a cactus (xerophyte) and a water lily (hydrophyte) in a table.", solution: "| Feature | Cactus (Xerophyte) | Water Lily (Hydrophyte) |\n|---------|-------------------|------------------------|\n| Leaves | Spines (reduce surface area) | Broad, flat floats |
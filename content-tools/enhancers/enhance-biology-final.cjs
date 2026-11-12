const fs = require('fs');
const path = require('path');

const BIOLOGY_DIR = 'content/ravikishan/class-11-notes/biology';

function readJson(p) {
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch(e) {
    console.error('Error reading ' + p + ':', e.message);
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
           item.includes('Core point for') ||
           item.includes('Specialized insight for') ||
           item.includes('Key statement for') ||
           item.includes('Important note regarding') ||
           item.includes('Key concept') ||
           item.includes('Task for studying') ||
           (item.includes('Practice ') && !item.match(/[A-Z]/) && !item.match(/[\d]/));
  });
  return allPlaceholders;
}

function enhanceFile(filePath) {
  const data = readJson(filePath);
  if (!data) return false;

  const enriched = data.enrichedContent;
  if (!enriched) return false;

  const slug = enriched.topicSlug || '';
  let updated = false;

  // universalFacts
  if (isPlaceholder(enriched.universalFacts)) {
    enriched.universalFacts = getFacts(slug);
    updated = true;
  }

  // formulas
  if (isPlaceholder(enriched.formulas) || !enriched.formulas) {
    enriched.formulas = getFormulas(slug);
    updated = true;
  }

  // examShortTricks
  if (isPlaceholder(enriched.examShortTricks) || !enriched.examShortTricks) {
    enriched.examShortTricks = getTricks(slug);
    updated = true;
  }

  // importantNotes
  if (isPlaceholder(enriched.importantNotes) || !enriched.importantNotes) {
    enriched.importantNotes = getImportantNotes(slug);
    updated = true;
  }

  // examNotes
  if (isPlaceholder(enriched.examNotes) || !enriched.examNotes) {
    enriched.examNotes = getExamNotes(slug);
    updated = true;
  }

  // exercises
  if (isPlaceholder(enriched.exercises) || !enriched.exercises) {
    enriched.exercises = getExercises(slug);
    updated = true;
  }

  if (updated) {
    writeJson(filePath, data);
    return true;
  }
  return false;
}

function getFacts(slug) {
  const facts = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      'Biology is derived from Greek bios (life) and logos (study) - literally meaning study of life.',
      'There are approximately 8.7 million eukaryotic species on Earth, though only ~1.5 million have been described.',
      'DNA was discovered by Friedrich Miescher in 1869, but its double-helix structure was solved by Watson and Crick in 1953.',
      'The human body contains approximately 37.2 trillion cells, with the brain having ~86 billion neurons.',
      'Mitochondria have their own circular DNA, supporting the endosymbiotic theory of their bacterial origin.',
      'RNA world hypothesis suggests that before DNA, life may have relied on RNA for both genetic storage and catalysis.'
    ],
    'relation-of-biology-with-other-sciences': [
      'Biochemistry bridges biology and chemistry - it was formalized by Hans von Euler-Chelpin who won the 1929 Nobel Prize.',
      'Biophysics applies physics principles to biological systems; X-ray crystallography revealed DNA structure.',
      'Bioinformatics emerged in the 1990s alongside the Human Genome Project, now processing petabytes of sequence data.',
      'Neuroscience combines biology, psychology, and chemistry to understand the nervous system with 100 trillion synapses.',
      'The concept of bioethics gained prominence after the 1975 Asilomar conference on recombinant DNA safety.',
      'Biomathematics uses differential equations to model population dynamics, epidemic spread, and neural firing patterns.'
    ],
    'biomolecules-functions': [
      'Water makes up 60-75% of human body weight and is essential as a solvent for all biochemical reactions.',
      'ATP hydrolysis releases 7.3 kcal/mol under standard conditions, making it the universal energy currency.',
      'There are exactly 20 standard amino acids encoded by the universal genetic code across all known life forms.',
      'A single human cell contains approximately 2 meters of DNA if fully extended from the nucleus.',
      'Enzymes can increase reaction rates by factors of 10^6 to 10^12 compared to uncatalyzed reactions.',
      'Hemoglobin in blood can carry approximately 1.34 mL of O2 per gram of hemoglobin.'
    ],
    'cell-introduction': [
      'The smallest known cell is Mycoplasma gallisepticum at ~0.1 micrometers; the largest is the ostrich egg at 170 mm.',
      'A typical human cell is 10-30 micrometers in diameter, while a neuron can be up to 1 meter long.',
      'The human body contains approximately 10x more bacterial cells than human cells (~38 trillion vs 30 trillion).',
      'Mitochondria divide by binary fission similar to bacteria, supporting the endosymbiont theory.',
      'Red blood cells lack nuclei and organelles to maximize hemoglobin-carrying capacity.',
      'The nuclear envelope contains ~3000-4000 nuclear pores, each ~100 nanometers in diameter.'
    ],
    'cell-division': [
      'Human cells divide approximately every 24 hours under optimal conditions.',
      'Meiosis produces 4 genetically unique haploid cells from 1 diploid cell after one round of DNA replication.',
      'The complete human cell cycle (G1-S-G2-M) takes ~24 hours in typical cultured cells.',
      'During metaphase, chromosomes align at the metaphase plate - the cell checks all attachments before proceeding.',
      'Cytokinesis in animal cells involves a contractile ring of actin and myosin; in plants, a cell plate forms.',
      'Bryostatin, a compound from marine bryozoans, activates protein kinase C and is being studied for cancer therapy.'
    ],
    'ecosystem-ecology': [
      'Only ~10% of energy transfers between trophic levels (Lindeman 1942).',
      'The biosphere extends from ~11 km above sea level (Mt Everest) to ~11 km below (Mariana Trench).',
      'Total primary production on Earth is ~173 billion tons of carbon per year.',
      'A single hectare of tropical rainforest can contain over 700 tree species.',
      'The Great Filter hypothesis suggests civilization may collapse due to resource depletion or self-destruction.',
      'Nepal has 12 national parks and 6 hunting reserves covering ~22% of its land area.'
    ],
    'food-chain-web': [
      'A food chain rarely exceeds 4-5 trophic levels due to energy loss at each transfer.',
      'The biomass pyramid is usually upright but can be inverted in aquatic ecosystems.',
      'Primary productivity of Earth oceans is ~550 g C/m2/year; tropical forests reach ~2000 g C/m2/year.',
      'An ecotone (transition zone between biomes) typically has higher species diversity than adjacent communities.',
      'Detritivores process ~90% of terrestrial primary production as dead organic matter.',
      'Energy pyramids are always upright; number pyramids can be inverted (one tree supports thousands of insects).'
    ],
    'biogeochemical-cycles': [
      'The nitrogen cycle involves ~10^14 g N fixed annually by biological processes globally.',
      'Atmospheric CO2 has risen from ~280 ppm (pre-industrial) to ~420 ppm (2024) - a 50% increase.',
      'The ocean stores ~38,000 gigatons of carbon, 60x more than the atmosphere.',
      'Phosphorus has no atmospheric component - it cycles only through rock, water, and organisms.',
      'Nitrogen-fixing bacteria in legume root nodules can fix 100-200 kg N/ha/year.',
      'Global carbon flux from fossil fuel burning is ~10 gigatons C/year (as of 2024).'
    ],
    'ecological-adaptation': [
      'Xerophytes can survive at water potentials as low as -30 MPa; mesophytes typically wilt below -1.5 MPa.',
      'Hydrophytes have air spaces (aerenchyma) in tissues for buoyancy and gas exchange.',
      'Cactus spines are modified leaves that reduce transpiration and deter herbivores.',
      'K-strategists (elephants, humans) produce few offspring with high parental investment.',
      'CAM photosynthesis opens stomata at night to reduce water loss - used by cacti and pineapple.',
      'Desert kangaroo rats never need to drink water; they obtain all moisture from metabolic oxidation of seeds.'
    ],
    'ecological-imbalances': [
      'Global temperature has risen ~1.2C since pre-industrial times (1850-1900 baseline).',
      'Ocean acidification has increased by 30% since the Industrial Revolution due to CO2 absorption.',
      'Approximately 1 million species face extinction threat according to IPBES (2019).',
      'Deforestation releases ~4.8 gigatons of CO2 annually - ~12% of global emissions.',
      'The ozone hole over Antarctica reached 24 million km2 in 2020 (recovered from 28 million km2 in 2000).',
      'Nepal biodiversity is threatened by habitat loss, poaching, and climate change affecting Alpine zones.'
    ],
    'origin-life': [
      'Earth formed ~4.6 billion years ago; life appeared ~3.5-4.0 billion years ago (stromatolite evidence).',
      'The Miller-Urey experiment (1953) produced 11 amino acids from simulated early Earth conditions.',
      'Hydrothermal vent theory proposes life originated at alkaline vents with natural pH gradients.',
      'LUCA (Last Universal Common Ancestor) lived ~3.5-4.0 billion years ago and was likely thermophilic.',
      'RNA world hypothesis is supported by ribozymes - RNA molecules with catalytic activity.',
      'Panspermia hypothesis suggests life building blocks may have arrived via meteorites (Murchison meteorite found 70+ amino acids).'
    ],
    'evidences-of-evolution': [
      'Human and chimpanzee DNA are 98.8% identical, diverging ~6-7 million years ago.',
      'Pacemaker genes controlling body segmentation are conserved from fruit flies to humans.',
      'Whale evolution is documented through 50+ fossil intermediates spanning 50 million years.',
      'Vestigial structures include the human appendix, coccyx (tailbone), and wisdom teeth.',
      'Embryological similarities support common ancestry across vertebrates.',
      'Cytochrome c differs by only 1-2 amino acids between humans and chimpanzees but ~45 between humans and yeast.'
    ],
    'theories-of-evolution': [
      'Lamarck theory (inheritance of acquired characteristics) was disproven by Weismann mouse tail experiments (1890s).',
      'Darwin published Origin of Species in 1859 after 20+ years of observation and correspondence.',
      'Darwin was influenced by Malthus essay on population growth and limited resources.',
      'The modern synthesis (1930s-1950s) combined Darwinian selection with Mendelian genetics.',
      'Neutral theory (Kimura, 1968) proposes most evolutionary changes are due to genetic drift, not selection.',
      'Punctuated equilibrium (Eldredge and Gould, 1972) argues evolution occurs in rapid bursts separated by stability.'
    ],
    'human-evolution': [
      'Australopithecus afarensis (Lucy) lived ~3.2 million years ago in Ethiopia - 40% complete skeleton found.',
      'Homo habilis (handy man) appeared ~2.4 Ma with brain size ~600-700 cm3; used Oldowan stone tools.',
      'Homo erectus migrated out of Africa ~1.8 Ma, reaching Indonesia (Java Man) and China (Peking Man).',
      'Neanderthals (Homo neanderthalensis) lived ~400-40,000 years ago in Europe; shared 99.7% DNA with modern humans.',
      'Homo sapiens emerged in Africa ~300,000 years ago; the Out of Africa migration began ~60,000-70,000 years ago.',
      'Brain size increased from ~450 cm3 (Australopithecus) to ~1350 cm3 (modern humans) over 4 million years.'
    ],
    'biomolecules-introduction-and-functions': [
      'Carbohydrates provide 4 kcal/g of energy, while lipids provide 9 kcal/g - more than double the energy density.',
      'The total DNA in a human body, if laid end to end, would stretch to the Sun and back ~600 times.',
      'Proteins make up approximately 15-20% of total human body weight, most abundant biomolecule by dry mass.',
      'Cell membranes are composed of a phospholipid bilayer approximately 7.5-10 nm thick.',
      'Glycogen can store approximately 400-500g of glucose in humans - enough for roughly 1600-2000 kcal.',
      'Cholesterol contains 27 carbon atoms arranged in four fused rings (cyclopentanoperhydrophenanthrene nucleus).'
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      'Plasmodium falciparum causes the most severe form of malaria with mortality rates up to 20% if untreated.',
      'Paramecium caudatum can beat its cilia ~30 times per second to propel itself through water.',
      'Amoeba proteus can change shape continuously, extending pseudopodia up to 50 micrometers in length.',
      'Euglena gracilis contains chloroplasts with chlorophyll a and b, similar to higher plants.',
      'Diatoms contribute ~20-25% of global oxygen production through photosynthesis.',
      'Foraminiferans have calcareous shells (tests) up to 20 cm in diameter (Nummulites - used in ancient Egyptian construction).'
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      'Sponges (Porifera) lack true tissues - their cells show primitive division of labor but no organization into tissues.',
      'Cnidarians were the first animals to develop true tissues (diploblastic: ectoderm + endoderm with mesoglea).',
      'Bilateral symmetry evolved ~550 million years ago during the Ediacaran period, preceding the Cambrian explosion.',
      'Coelom evolution provided space for organ development and independent organ movement within the body cavity.',
      'Segmentation (metamerism) allows specialization of body regions and redundancy - damage to one segment need not be fatal.',
      'The 7 major animal phyla contain >95% of described animal species.'
    ],
    'earthworm': [
      'Earthworms (Pheretima posthuma) can consume up to 50% of their body weight in soil per day.',
      'Each earthworm is a hermaphrodite - possessing both male and female reproductive organs.',
      'Earthworms have 5 pairs of Hearts (aortic arches) located in segments 7-11.',
      'Setae (bristles) on each segment provide grip for locomotion - typically 4 per segment.',
      'Earthworms lack a skeleton but maintain shape through hydrostatic pressure in coelomic fluid.',
      'A single earthworm can produce 50-200 castings (worm poop) per day, enriching soil with nutrients.'
    ],
    'frog-habit-and-habitat-external-features': [
      'Rana tigrina (Indian bullfrog) can leap up to 2 meters in a single jump.',
      'Frog skin is permeable to water and gases - they can breathe entirely through skin when submerged.',
      'Tympanum (external ear) is visible as a circular membrane behind each eye, ~5-8 mm in diameter.',
      'Frogs have nictitating membranes (third eyelid) for underwater vision and moisture retention.',
      'Male frogs have vocal sacs for amplifying mating calls; some species can produce sounds up to 100 dB.',
      'Frog skin secretes antimicrobial peptides that protect against fungal infections (Chytrid fungus).'
    ],
    'monera-detailed': [
      'Bacteria can survive in temperatures from -15C (Antarctic ice) to 121C (hydrothermal vents).',
      'E. coli divides every 20 minutes under optimal conditions - 1 cell can become 2^72 in 24 hours theoretically.',
      'Bacterial genomes range from ~130,000 bp (Carsonella ruddii) to ~14 million bp (Sorangium cellulosum).',
      'Endospores (Bacillus, Clostridium) can survive boiling, radiation, and desiccation for centuries.',
      'Bioluminescent bacteria (Vibrio fischeri) live symbiotically in fish light organs, producing blue-green light.',
      'The human gut microbiome contains ~10^14 bacteria - roughly equal to human cells, encoding ~150x more genes than the human genome.'
    ],
    'virus': [
      'Viruses range from 20 nm (parvovirus) to 400 nm (poxvirus) - smaller than most bacteria.',
      'The HIV virus has a mutation rate of ~3 x 10^-5 per base per replication cycle - one of the highest known.',
      'Bacteriophage T4 injects only its DNA into bacteria, leaving the protein capsid outside.',
      'Some giant viruses (Pandoravirus, ~1 micrometer) challenge the traditional virus definition with 2500+ genes.',
      'The influenza virus hemagglutinin protein mutates ~1% per year, requiring new vaccines annually.',
      'Helicobacter pylori was proven to cause ulcers (Marshall and Warren, 1982) - Marshall drank the bacteria culture to prove it.'
    ],
    'animal-adaptation': [
      'Aquatic mammals (whales, dolphins) have blubber layers 5-30 cm thick for insulation in cold water.',
      'Camels can lose 25% of body water without dying; humans die at ~15% dehydration.',
      'Arctic fox fur changes color seasonally - white in winter for camouflage, brown in summer.',
      'Birds migrate up to 11,000 km annually (Arctic tern) - the longest migration of any animal.',
      'Desert animals produce highly concentrated urine (up to 5x human concentration) to conserve water.',
      'High-altitude animals (llamas, yaks) have enlarged hearts and lungs plus special hemoglobin for low oxygen.'
    ],
    'animal-behavior': [
      'Bees perform waggle dance to communicate food source location within ~4 degrees accuracy.',
      'Wolf packs have strict hierarchies with alpha, beta, and omega ranks determined by dominance displays.',
      'Cephalopod intelligence rivals vertebrates - octopuses can solve puzzles, use tools, and recognize individual humans.',
      'Fireflies synchronize flashing across entire swamps - a self-organizing behavior driven by local feedback.',
      'Ant colonies can solve optimization problems (shortest path to food) using pheromone trail laying.',
      'Migratory birds navigate using Earth magnetic field, star patterns, and solar position simultaneously.'
    ],
    'environmental-pollution': [
      'PM2.5 particles (less than or equal to 2.5 micrometers) can penetrate deep into lungs and enter bloodstream.',
      'DDT banned in 1972 but persists in soils for 15-150 years; biomagnifies 10 million-fold in food chains.',
      'Acid rain (pH less than 5.6) damages forests, acidifies lakes, and corrodes buildings.',
      'The Chernobyl disaster (1986) released 400 times more radiation than the Hiroshima atomic bomb.',
      'Nepal air pollution in Kathmandu Valley often exceeds WHO guidelines by 10-15x during winter inversion periods.',
      'Eutrophication from agricultural runoff creates dead zones - the Gulf of Mexico dead zone spans 6000-15000 km2.'
    ],
    'biodiversity-conservation': [
      'Nepal has 4 UNESCO World Heritage sites, 10 Ramsar wetland sites, and 4 transboundary conservation areas.',
      'IUCN Red List: 44,000+ species are threatened with extinction (as of 2024).',
      'Tiger population in Nepal increased from 121 (2009) to 355 (2022) through conservation efforts.',
      'The cost of biodiversity loss is estimated at $440-880 billion annually (World Economic Forum, 2020).',
      'Seed banks (Svalbard Global Seed Vault) store 1.2 million crop seed samples as insurance against extinction.',
      'Community forestry in Nepal manages ~2.2 million hectares, involving ~16,000 community forest user groups.'
    ],
    'conservation-biology': [
      'Nepal Chitwan National Park was established in 1973; became a UNESCO site in 1984.',
      'The Bengal tiger (Panthera tigris tigris) is Nepals national animal - ~355 individuals in 2022 census.',
      'Ex-situ conservation includes zoos, botanical gardens, seed banks, and tissue culture laboratories.',
      'Corridor conservation connects fragmented habitats - essential for genetic flow between isolated populations.',
      'Nepal Sacred Groves (Achham, Dolpa) conserve biodiversity through traditional cultural practices.',
      'Captivity breeding programs have saved the Indian rhinoceros from near-extinction in the 1960s.'
    ],
    'protected-areas': [
      'Nepal has 12 national parks, 6 hunting reserves (now wildlife reserves), 3 conservation areas, and 11 protected forests.',
      'Sagarmatha National Park (Everest) covers 1,148 km2 at 2,800-8,848 m - Nepals first UNESCO site (1979).',
      'Royal Chitwan National Park protects 956 km2 of Terai rainforest, home to 68 mammal species and 543 bird species.',
      'Community-Based Natural Resource Management (CBNRM) in Nepal involves local communities in conservation decisions.',
      'The Annapurna Conservation Area Project (1986) is Asias largest protected area at 7,629 km2.',
      'Transboundary conservation with India includes the Terai Arc Landscape connecting 13 protected areas.'
    ],
    'vegetation-types': [
      'Nepal vegetation zones span from 60m (Terai subtropical) to 8,848m (Everest alpine) - unique global altitudinal range.',
      'Terai sal forests dominate the southern plains at 100-700m, with teak and rosewood also present.',
      'Rhododendron is Nepals national flower - over 35 species found in Nepali hills and mountains.',
      'Alpine meadows (3,500-4,500m) bloom with ~1,600+ flowering plant species during summer months.',
      'Nepal has ~7,000+ vascular plant species, ~10% of which are endemic (found nowhere else on Earth).',
      'Evergreen broadleaf forests at 1,000-2,000m contain oak, chestnut, maple, and magnolia species.'
    ],
    'conservation-in-situ-ex-situ': [
      'In-situ conservation protects species in their natural habitats - national parks, wildlife corridors, sacred groves.',
      'Ex-situ conservation preserves species outside natural habitats - zoos, botanical gardens, seed banks, cryopreservation.',
      'Nepal Department of National Parks and Wildlife Conservation manages 25 protected areas covering ~21% of land.',
      'The International Crops Research Institute for the Semi-Arid Tropics (ICRISAT) maintains germplasm collections.',
      'Cryopreservation stores biological material at -196C in liquid nitrogen for long-term genetic conservation.',
      'Nepal Community Forest User Groups (CFUGs) manage ~2.2M hectares - a model for participatory conservation.'
    ]
  };
  return facts[slug] || [
    'Biology studies the diversity of life across approximately 8.7 million species worldwide.',
    'The smallest living organisms are mycoplasma bacteria at 0.1 micrometers in diameter.',
    'DNA contains the genetic instructions for the development and function of all known living organisms.',
    'The human genome contains approximately 3 billion base pairs across 23 pairs of chromosomes.',
    'Photosynthesis converts sunlight into chemical energy, producing approximately 130 terawatts of power globally.',
    'Cell theory states that all living organisms are composed of one or more cells, the basic unit of life.'
  ];
}

function getFormulas(slug) {
  const formulas = {
    'ecosystem-ecology': [
      'Energy transfer efficiency: eta = (Energy at level n+1 / Energy at level n) x 100%',
      'Net Primary Productivity: NPP = GPP - R (where R = respiration loss)',
      'Ecological efficiency: E = (Assimilated energy / Ingested energy) x 100%',
      'Population growth: dN/dt = rN (exponential) or dN/dt = rN(1-N/K) (logistic)',
      'Species-area relationship: S = cA^z (where S = species, A = area, c and z are constants)'
    ],
    'food-chain-web': [
      "Lindeman's trophic efficiency: eta = (Production at trophic level n+1 / Production at level n) x 100% approx 10%",
      'Food chain length: typically 3-5 trophic levels due to ~90% energy loss at each transfer',
      'Energy available at level n: En = E1 x (0.1)^(n-1) where E1 = primary producer energy',
      'Percent production efficiency: PBE = (Production / Assimilation) x 100%'
    ],
    'biogeochemical-cycles': [
      'Carbon fixation (photosynthesis): 6CO2 + 6H2O -> C6H12O6 + 6O2',
      'Respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~38 ATP',
      'Nitrogen fixation: N2 + 8H+ + 8e- + 16ATP -> 2NH3 + H2 + 16ADP + 16Pi (by nitrogenase)',
      'Nitrification: NH3 + 1.5O2 -> NO2- + H2O + H+ (Nitrosomonas); NO2- + 0.5O2 -> NO3- (Nitrobacter)',
      'Denitrification: 2NO3- + 10e- + 12H+ -> N2 + 6H2O (by Pseudomonas in anaerobic conditions)'
    ],
    'ecological-adaptation': [
      'Stomatal conductance relates CO2 uptake to water loss - balance between photosynthesis and transpiration',
      'Water potential: Psi = Psi s + Psi p + Psi g (solute + pressure + gravitational potential)',
      'Transpiration rate: E = g x Delta C (conductance x concentration gradient)',
      'Thermoregulation (endotherms): metabolic heat production = heat loss to environment'
    ],
    'ecological-imbalances': [
      'Greenhouse effect: Delta T = lambda x Delta F (temperature change = climate sensitivity x radiative forcing)',
      'CO2 absorption by oceans: CO2 + H2O <-> H2CO3 <-> H+ + HCO3- (causes ocean acidification)',
      'Ozone depletion: Cl. + O3 -> ClO. + O2; ClO. + O -> Cl. + O2 (catalytic destruction cycle)',
      'Population growth rate: r = (births + immigration) - (deaths + emigration)'
    ],
    'origin-life': [
      'Prebiotic synthesis (Miller-Urey): CH4 + NH3 + H2 + H2O + energy -> amino acids + other organics',
      'RNA self-replication: RNA -> RNA (ribozyme-catalyzed template copying)',
      'Hydrothermal vent chemistry: H2 + CO2 -> [FeS/NiS catalysts] -> organic molecules + CH4',
      'Protocell formation: lipid molecules -> micelles -> vesicles -> compartmentalization'
    ],
    'evidences-of-evolution': [
      'Molecular clock: divergence time (T) = genetic distance (d) / (2 x mutation rate r)',
      'Homology comparison: % identity = (identical residues / total aligned residues) x 100',
      'Phylogenetic tree: branch length proportional to genetic distance or time since divergence',
      'Vestigial structure ratio: vestigial_organs / functional_organs in ancestral lineage'
    ],
    'theories-of-evolution': [
      'Hardy-Weinberg equilibrium: p^2 + 2pq + q^2 = 1 (allele and genotype frequencies in ideal population)',
      'Selection coefficient: s = 1 - w (where w = relative fitness of genotype)',
      'Genetic drift: Delta p = random sampling error; effective population size Ne determines drift strength',
      'Mutation-selection balance: q hat = sqrt(mu/s) for recessive deleterious alleles'
    ],
    'human-evolution': [
      'Brain size evolution: Delta V/Delta t approx (1350 - 450) cm3 / 4,000,000 years approx 0.000225 cm3/year average',
      'Tool complexity index: increasing from Oldowan (choppers) -> Acheulean (handaxes) -> Mousterian (flakes)',
      'Migration rate: ~60,000-70,000 years ago, humans left Africa at ~1 population per generation',
      'Neanderthal interbreeding: ~1-4% Neanderthal DNA in non-African modern humans (estimated from genome comparison)'
    ],
    'biomolecules-functions': [
      'Michaelis-Menten: v0 = Vmax[S] / (Km + [S])',
      "Chargaff's rule: [A]=[T] and [G]=[C] in double-stranded DNA",
      'Gibbs free energy: Delta G = Delta H - TDelta S (determines spontaneity of biochemical reactions)',
      'ATP hydrolysis: ATP + H2O -> ADP + Pi (Delta G0prime = -30.5 kJ/mol)',
      'Protein structure: primary -> secondary (alpha-helix, beta-sheet) -> tertiary -> quaternary',
      'Osmotic pressure: pi = iMRT (where i = van t Hoff factor, M = molarity, R = gas constant, T = temperature)'
    ],
    'biomolecules-introduction-and-functions': [
      'Monosaccharide formula: CnH2nOn (general carbohydrate formula)',
      'Peptide bond formation: -COOH + H2N- -> -CO-NH- + H2O (dehydration synthesis)',
      'Lipid energy yield: 1g fat = 9.3 kcal; 1g carbohydrate = 4.1 kcal; 1g protein = 5.65 kcal',
      "DNA base pairing: A-T (2 hydrogen bonds); G-C (3 hydrogen bonds)",
      'Enzyme kinetics: Lineweaver-Burk plot 1/v = (Km/Vmax)(1/[S]) + 1/Vmax',
      'pH calculation: pH = -log[H+]; pOH = -log[OH-]; pH + pOH = 14 (at 25C)'
    ],
    'cell-introduction': [
      'Surface area to volume ratio: SA/V = 6/r (sphere) - limits cell size',
      'Osmosis: water moves from low solute concentration to high solute concentration across semipermeable membrane',
      'Active transport: requires ATP to move substances against concentration gradient',
      'Diffusion rate: proportional to concentration gradient x surface area / membrane thickness (Fick law)',
      'Cell division rate: typical mammalian cell cycle = 18-24 hours (varies by cell type)'
    ],
    'cell-introduction-prokaryotic-and-eukaryotic': [
      'Prokaryotic cell size: typically 0.1-5.0 micrometers in diameter',
      'Eukaryotic cell size: typically 10-100 micrometers in diameter',
      'Genome size: prokaryotes ~0.5-10 Mbp; eukaryotes ~10 Mbp - 150 Gbp',
      'Ribosome size: prokaryotes = 70S (30S + 50S); eukaryotes = 80S (40S + 60S)',
      'Cell wall composition: bacteria = peptidoglycan; archaea = pseudopeptidoglycan or S-layer; plants = cellulose'
    ],
    'cell-division': [
      'Mitosis duration: ~1 hour in typical mammalian cells (prophase to telophase)',
      'Meiosis duration: ~24-48 hours in human oocytes; shorter in spermatocytes',
      'Chromosome condensation: 2-meter DNA molecule condenses ~10,000-fold to form visible chromosome',
      'Spindle checkpoint: ensures all chromosomes are properly attached before anaphase onset',
      'Cytokinesis timing: begins in anaphase/telophase; completes within 30-60 minutes',
      'DNA replication: ~50 nucleotides/second in eukaryotes; ~1000 nucleotides/second in prokaryotes'
    ],
    'ecosystem-ecology': [
      'Energy transfer: E(n+1) = E(n) x 0.1 (10% law)',
      'Biomass pyramid: B1 > B2 > B3 > B4 (typically, but can invert in aquatic systems)',
      'Population growth: dN/dt = rN (exponential) or dN/dt = rN(1-N/K) (logistic)',
      'Species-area: S = cA^z (where S = species, A = area, c and z are constants)'
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      'Binary fission rate: Amoeba divides every 12-24 hours under optimal conditions',
      'Ciliary beating frequency: Paramecium beats cilia ~30 times/second',
      'Flagellar wave propagation: Euglena flagellum generates ~10-20 waves/second',
      'Contractile vacuole cycle: expels water every 10-30 seconds in freshwater Amoeba',
      'Encystment time: Entamoeba forms cysts within 24-48 hours under unfavorable conditions',
      'Schizogony cycle: Plasmodium merozoites reproduce every 48-72 hours in human RBCs'
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      'Body cavity pressure: hydrostatic skeleton in soft-bodied animals relies on fluid pressure (0.1-1 atm typically)',
      'Symmetry plane: bilateral symmetry allows cephalization (head formation with concentrated sensory organs)',
      'Phylogenetic relationship: molecular data (18S rRNA) revised traditional morphological classifications'
    ],
    'earthworm': [
      'Peristaltic wave speed: ~2 cm/second along earthworm body',
      'Setae extension: each seta can extend ~0.5 mm from body wall',
      'Coelomic fluid pressure: varies from 0.1-0.5 kPa during locomotion',
      'Digestive transit time: ~2-4 hours from ingestion to egestion',
      'Gas exchange rate: cutaneous respiration provides ~60% of O2 requirement'
    ],
    'frog-habit-and-habitat-external-features': [
      'Jump distance: Rana tigrina can leap 2+ meters horizontally in a single jump',
      'Swim speed: ~0.5-1.0 body lengths/second in water',
      'Skin permeability: water loss rate ~0.1-1.0 mg/cm2/hour depending on humidity',
      'Tympanum frequency response: detects sounds from 50 Hz to 10 kHz (optimal 1-4 kHz for mating calls)',
      'Larval development time: egg to tadpole ~3-7 days; tadpole to froglet ~2-4 months depending on species'
    ],
    'monera-detailed': [
      'Generation time: E. coli divides every 20 minutes under optimal conditions (37C, rich medium)',
      'Cell size: typical bacterium = 1-5 micrometers length x 0.5-1.0 micrometers diameter',
      'Cell density: ~10^8-10^9 cells per gram of soil; ~10^6-10^8 cells per mL of freshwater',
      'DNA content: ~1-10 pg per bacterial cell (1 pg approx 10^9 daltons approx 10^9 base pairs)',
      'Membrane potential: -120 to -150 mV (interior negative) in most bacteria'
    ],
    'virus': [
      'Virion size: 20-400 nm in diameter (smaller than 0.1 micrometer resolution limit of light microscopy)',
      'Mutation rate: RNA viruses ~10^-3 to 10^-5 mutations per nucleotide per replication cycle',
      'Replication time: influenza virus completes life cycle in 6-8 hours; HIV in 2-3 days',
      'Particle concentration: ~10^9-10^12 virions per mL in infected host',
      'Genome size: 3,000 bp (parvovirus) to 2.5 million bp (mimivirus)'
    ],
    'animal-adaptation': [
      'Thermal conductivity: fat (blubber) has thermal conductivity ~0.2 W/(m.K) - 4x lower than water',
      'Heat dissipation: surface area-to-volume ratio determines heat loss rate (smaller animals lose heat faster)',
      'Water conservation: desert animals produce urine with osmolarity up to 5,000-6,000 mOsm/L (human: ~1,200 max)',
      'Altitude adaptation: hemoglobin-oxygen affinity increases in high-altitude species'
    ],
    'animal-behavior': [
      'Waggle dance duration: directly proportional to distance - ~1 second per 1 km (approximately)',
      'Pheromone detection threshold: ants detect pheromones at concentrations as low as 10^-15 M',
      'Magnetic field detection: cryptochrome proteins in bird eyes may enable magnetoreception',
      'Optimal foraging: animals maximize energy intake per unit time - cost-benefit analysis of prey selection'
    ],
    'environmental-pollution': [
      'PM2.5 exposure: WHO guideline = 15 micrograms/m3 (24-hour mean); often 10-15x exceeded in polluted cities',
      'DDT half-life: 2-15 years in soil; biomagnifies 10^6-10^7 fold in food chains',
      'Acid rain pH: natural rain pH = 5.6 (CO2 saturation); acid rain pH = 4.0-5.0 (H2SO4, HNO3)',
      'CO2 concentration: pre-industrial = 280 ppm; current (2024) = ~420 ppm - 50% increase',
      'Eutrophication: nitrogen/phosphorus loading > 1 mg/L triggers algal blooms in freshwater systems'
    ],
    'biodiversity-conservation': [
      'Species-area relationship: S = cA^z (z typically 0.2-0.35 for islands, 0.1-0.2 for continents)',
      'Minimum viable population (MVP): ~500 individuals to maintain genetic diversity over 100 years',
      'Extinction debt: species still present but committed to extinction due to past habitat destruction',
      'Genetic diversity loss: heterozygosity decreases by 1/(2Ne) per generation due to drift',
      'Conservation cost: ~$30-100 billion/year needed to prevent mass extinction (IUCN estimate)'
    ],
    'conservation-biology': [
      'Carrying capacity: K = (available resources) / (resource requirement per individual)',
      'Population viability: P(survival) = 1 - (1/(2Ne))^t over t generations',
      'Genetic drift impact: allele frequency change sigma^2 = p(1-p)/(2Ne) per generation',
      'Habitat fragmentation: edge effect increases proportionally with perimeter-to-area ratio',
      'Corridor width: minimum 100-500 m for large mammals; 10-50 m for small mammals and insects'
    ],
    'protected-areas': [
      'Protected area effectiveness: well-managed parks reduce deforestation by 50-90% compared to unprotected areas',
      'Nepal protected area coverage: ~21% of land area under various protected area categories',
      'Community forestry participation: ~2.2 million hectares managed by 16,000+ community forest user groups',
      'Transboundary conservation: Terai Arc Landscape connects 13 protected areas across Nepal and India'
    ],
    'vegetation-types': [
      'Altitudinal vegetation zones in Nepal: Terai (60-1000m), Subtropical (1000-2000m), Temperate (2000-3000m), Subalpine (3000-4000m), Alpine (4000-4500m), Nival (>4500m)',
      'Nepal endemic plant species: ~10% of 7,000+ vascular plant species are endemic',
      'Rhododendron species in Nepal: over 35 species found across different elevations',
      'Alpine meadow flowering species: ~1,600+ species during summer months (3,500-4,500m)'
    ],
    'conservation-in-situ-ex-situ': [
      'In-situ conservation areas in Nepal: 12 national parks, 6 wildlife reserves, 3 conservation areas, 11 protected forests',
      'Ex-situ conservation methods: zoos, botanical gardens, seed banks, gene banks, cryopreservation',
      'Nepal community forestry success: 16,000+ CFUGs managing 2.2M hectares with measurable forest cover increase',
      'Tiger population recovery: from 121 (2009) to 355 (2022) through in-situ conservation programs'
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      'Biodiversity estimate: ~8.7 million eukaryotic species (estimated); ~1.5 million described',
      'Cell size range: 0.1 micrometers (Mycoplasma) to 170 mm (ostrich egg) - 1.7 billion-fold difference',
      'Genome size range: 0.2 Mbp (nanoarchaeote) to 150 Gbp (Paris japonica) - 750,000-fold difference',
      "Metabolic rate scaling: B = B0M^0.75 (Kleiber's law) - metabolic rate scales to 3/4 power of mass",
      'Photosynthetic efficiency: theoretical maximum ~11%; actual crop efficiency ~0.5-2% of solar energy',
      'Human genome: ~3 billion base pairs, ~20,000-25,000 protein-coding genes, ~98.5% non-coding DNA'
    ],
    'relation-of-biology-with-other-sciences': [
      'Biochemistry: protein molecular weight ~10^4-10^6 Da; enzyme turnover numbers 10-10^6 reactions/sec',
      'Biophysics: membrane potential ~-70 mV; action potential amplitude ~100 mV; conduction velocity 0.5-120 m/s',
      'Bioinformatics: BLAST search speed ~10^6-10^7 sequences/hour; database size ~10^14 bases (2024)',
      'Biostatistics: sample size calculation n = (Z alpha + Z beta)^2 sigma^2/delta^2 for detecting effect size delta',
      'Neuroscience: synaptic transmission ~1-100 ms; neuronal firing rate 0.1-1000 Hz; ~10^15 synapses in human brain'
    ]
  };
  return formulas[slug] || [
    'Basic biochemical reaction: A + B -> C + D (generic enzymatic reaction)',
    'Photosynthesis: 6CO2 + 6H2O -> C6H12O6 + 6O2 (light-dependent reactions)',
    'Cellular respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~38 ATP',
    'Osmosis: water moves from hypotonic to hypertonic solution across semipermeable membrane',
    'Enzyme kinetics: v = Vmax[S] / (Km + [S]) (Michaelis-Menten equation)',
    'pH calculation: pH = -log[H+]'
  ];
}

function getTricks(slug) {
  const tricks = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      'Mnemonic for biology fields: CET PNB - Cytology, Embryology, Taxonomy, Physiology, Botany, Neurobiology, Zoology',
      "To remember the scope: think BIO = Breadth (all life), Investigation (research), Organization (hierarchy from molecule to biosphere)",
      "Quick recall: Biology = Study of Life; Life = M.R.G.O.W.T (Movement, Respiration, Growth, Excretion, Waste removal, Organization, Taste/Sensitivity)"
    ],
    'biomolecules-functions': [
      "Remember 4 biomolecules: CPLN - Carbohydrates, Proteins, Lipids, Nucleic acids",
      "Energy yield trick: Lipids (9 kcal/g) > Proteins (4 kcal/g) ≈ Carbs (4 kcal/g) - remember LIPIDS have twice the energy",
      "DNA base pairs: A-T (2 bonds) and G≡C (3 bonds) - remember AT is easy (2), GC is strong (3)",
      "Enzyme inhibition: Competitive = competes for active site; Non-competitive = binds elsewhere, changes shape",
      "Chargaff's rule: A=T, G=C - always equal pairs in dsDNA"
    ],
    'cell-introduction': [
      "Cell theory 3 parts: All living things are made of cells; cells are basic unit; new cells come from pre-existing cells",
      "Prokaryote vs Eukaryote: PRO has no true nucleus; EU has true nucleus - remember PRO = No TRUE nucleus, EU = TRUE nucleus",
      'Cell size limit: SA:V ratio - small cells have higher SA:V, better for exchange',
      "Organelle functions: Mitochondria = power house, Ribosomes = protein factories, Lysosomes = waste disposal"
    ],
    'cell-division': [
      "Mitosis phases: PMAT - Prophase, Metaphase, Anaphase, Telophase - remember Please Make A Team",
      "Meiosis I vs II: Meiosis I separates homologous chromosomes; Meiosis II separates sister chromatids",
      "Cell cycle phases: G1-S-G2-M - Growth 1, Synthesis (DNA replication), Growth 2, Mitosis",
      "Checkpoint mnemonic: G1 checks size/nutrients, G2 checks DNA replication, M checks spindle attachment"
    ],
    'ecosystem-ecology': [
      "Trophic levels: Producers → Primary → Secondary → Tertiary - remember PPST (Like Pepsi)",
      "10% rule: Only 10% energy passes to next level; 90% lost as heat - remember 10% goes, 90% goes warm",
      "Ecosystem components: Biotic (living) + Abiotic (non-living) - remember BA for Biotic-Abiotic",
      'Energy flow: Sun → Producer → Consumer → Decomposer - remember SPCD (Spiral)'
    ],
    'food-chain-web': [
      "Food chain types: Grazing (plant→herbivore→carnivore) and Detrital (dead matter→decomposer→detritivore)",
      "Food web complexity: more connections = more stability - remember Complex webs withstand disturbances better",
      "Trophic levels energy loss: 10% rule - each level loses ~90% energy as heat",
      "Pyramid types: Energy pyramid always upright; Biomass pyramid can invert; Number pyramid can invert"
    ],
    'biogeochemical-cycles': [
      "Major cycles: C-N-P-W - Carbon, Nitrogen, Phosphorus, Water cycles",
      "Nitrogen cycle steps: Fixation → Nitrification → Assimilation → Ammonification → Denitrification - remember FNAAD",
      "Carbon cycle key processes: Photosynthesis removes CO2; Respiration adds CO2; Combustion adds CO2",
      "Water cycle steps: Evaporation → Condensation → Precipitation → Collection - remember ECCP"
    ],
    'ecological-adaptation': [
      "Adaptation types: Structural (body form), Physiological (internal processes), Behavioral (actions) - remember SPB",
      "Xerophyte adaptations: Thick cuticle, sunken stomata, reduced leaves, deep roots - remember TSRD",
      "Hydrophyte adaptations: Thin cuticle, air spaces (aerenchyma), weak support, shallow roots - remember TAWS",
      "Conservation strategies: In-situ (habitat protection) vs Ex-situ (outside habitat) - remember IN and EX"
    ],
    'ecological-imbalances': [
      "Climate change causes: Greenhouse gases (CO2, CH4, N2O, CFCs) trap heat - remember GCNC",
      "Pollution types: Air, Water, Soil, Noise, Thermal, Radioactive - remember AWSTR",
      "Biodiversity loss causes: Habitat loss, Overexploitation, Pollution, Invasive species, Climate change - remember HIPIC",
      "Nepal conservation: National parks, Wildlife reserves, Conservation areas, Protected forests - remember NWCP"
    ],
    'origin-life': [
      "Origin theories: Abiogenesis (life from non-life), Panspermia (life from space), Hydrothermal vent (life at vents) - remember APH",
      "Miller-Urey experiment: Simulated early Earth conditions produced amino acids - remember M-U made amino acids",
      "RNA world hypothesis: RNA came before DNA and proteins - RNA stored info AND catalyzed reactions - remember RNA first, DNA later",
      "Timeline: Earth 4.6 BYA; Life 3.5-4.0 BYA; Eukaryotes 2.0 BYA; Multicellular 1.0 BYA"
    ],
    'evidences-of-evolution': [
      "Evidence types: Fossil, Anatomical (homologous/analogous), Embryological, Molecular, Biogeographical - remember FAEMB",
      "Homologous vs Analogous: Homologous = same origin, different function; Analogous = different origin, same function - remember HO = Home (same origin), AN = Airport (different origin, same function)",
      "Vestigial structures: Appendix, Coccyx, Wisdom teeth, Blind spot - remember ACWW",
      "Molecular evidence: DNA/protein similarity indicates relatedness - remember More similar = closer relatives"
    ],
    'theories-of-evolution': [
      "Lamarck: Use and disuse; inheritance of acquired characteristics - remember Lamarck believed characteristics acquired during life are inherited",
      "Darwin: Natural selection - survival of the fittest, descent with modification - remember Darwin = Selection",
      "Modern synthesis: Darwin + Mendel + Population genetics - remember Modern = Darwins selection + Mendels genes",
      "Key difference: Lamarck = acquired traits inherited; Darwin = natural selection on variation"
    ],
    'human-evolution': [
      "Human evolution sequence: Australopithecus → Homo habilis → Homo erectus → Homo heidelbergensis → Homo sapiens - remember AH-E-H",
      "Brain size increase: 450 cm3 (Australopithecus) → 600 cm3 (H. habilis) → 900 cm3 (H. erectus) → 1350 cm3 (H. sapiens) - remember 450-600-900-1350",
      "Key milestones: Bipedalism → Tool use → Fire → Language → Agriculture - remember BTFLA",
      "Neanderthal facts: Lived 400-40 kya in Europe; interbred with H. sapiens; went extinct ~40 kya - remember NEANDERTHAL"
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "Protozoa classification by locomotion: Mastigophora (flagella), Sarcodina (pseudopodia), Ciliophora (cilia), Sporozoa (no locomotion) - remember MFCS",
      "Plasmodium life cycle: Mosquito bite → Liver stage → Blood stage → Gametocytes → Mosquito gut → Sporozoites - remember MLB-GMS",
      "Paramecium features: Slipper shape, cilia, two nuclei (macro + micro), contractile vacuole, trichocysts - remember SCMCT",
      "Amoeba features: Shapeless, pseudopodia, food vacuole, contractile vacuole, binary fission - remember SPFCB"
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "Animal phyla memory: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata, Chordata - remember PCPAN MAEC",
      "Symmetry types: Asymmetrical (sponges), Radial (jellyfish), Bilateral (most animals) - remember AR-B",
      "Body cavity types: Acoelomate (flatworms), Pseudocoelomate (roundworms), Coelomate (segmented worms, arthropods, chordates) - remember APP",
      "Segmentation: Annelids show true metamerism; arthropods show tagmatization (functional grouping of segments) - remember A=true, A=grouped"
    ],
    'earthworm': [
      "Earthworm anatomy: Setae (bristles), clitellum (reproductive), typhlosole (internal fold for absorption), 5 pairs of hearts - remember SCTH",
      "Earthworm reproduction: Hermaphrodite, cross-fertilization, cocoon formation, direct development - remember HCCD",
      "Earthworm respiration: Cutaneous (through skin) - remember Earthworms breathe through their skin",
      "Earthworm excretion: Nephridia (one pair per segment) - remember Nephridia = kidney equivalent"
    ],
    'frog-habit-and-habitat-external-features': [
      "Frog external features: Tympanum (ear), nictitating membrane (third eyelid), webbed feet, sticky tongue - remember TNWF",
      "Frog habitat: Freshwater environments, moist skin, amphibious (land and water) - remember FWMS",
      "Frog classification: Order Anura = tailless amphibians - remember Anura = no tail (an = without, oura = tail)",
      "Frog senses: Forward-facing eyes for binocular vision, tympanum for hearing, lateral line in tadpoles - remember E-T-L"
    ],
    'monera-detailed': [
      "Bacteria shapes: Coccus (spherical), Bacillus (rod), Vibrio (comma), Spirillum (spiral) - remember CBVS",
      "Bacterial nutrition: Autotrophic (make own food) vs Heterotrophic (consume others) - remember AH",
      "Bacterial reproduction: Binary fission (asexual) - one cell divides into two identical cells - remember BF",
      "Endospore: Dormant, resistant structure formed by some bacteria (Bacillus, Clostridium) - remember Endospore = survival package"
    ],
    'virus': [
      "Virus structure: Capsid (protein coat) + Nucleic acid (DNA or RNA) + sometimes Envelope - remember CNE",
      "Virus types by nucleic acid: DNA viruses (Herpes, smallpox) vs RNA viruses (Influenza, HIV, Corona) - remember DR",
      "Lytic vs Lysogenic: Lytic = immediate replication and host death; Lysogenic = viral DNA integrates into host genome - remember L=Lethal, L=Latent",
      "Bacteriophage: Virus that infects bacteria - has head (capsid), tail, tail fibers - remember Phage = bacterial eater"
    ],
    'animal-adaptation': [
      "Aquatic adaptations: Streamlined body, fins/flippers, gills, blubber, salt glands - remember SFBGS",
      "Terrestrial adaptations: Lungs, limbs, waterproof skin, amniotic egg, excretory adaptations - remember LLWEA",
      "Volant (flying) adaptations: Wings, lightweight bones, feathers, powerful chest muscles, efficient respiration - remember WLFP",
      "Camouflage types: Cryptic (blend in), Mimicry (copy another organism), Warning coloration (aposematic) - remember CMM"
    ],
    'animal-behavior': [
      "Behavior types: Instinctive (innate) vs Learned (acquired) - remember IL",
      "Reflex action: Automatic, involuntary response to stimulus - involves spinal cord, not brain - remember RA-IS",
      "Taxis vs Kinesis: Taxis = directed movement toward/away from stimulus; Kinesis = random change in activity rate - remember TK",
      "Social behavior: Dominance hierarchy, leadership, courtship, parental care, communication - remember DLCC"
    ],
    'environmental-pollution': [
      "Pollution sources: Point source (factory smokestack) vs Non-point source (agricultural runoff) - remember PN",
      "Air pollutants: Primary (directly emitted: CO, SO2, NOx, PM) vs Secondary (formed in atmosphere: O3, H2SO4) - remember PS",
      "Water pollutants: Biological (pathogens), Chemical (pesticides, heavy metals), Physical (heat, sediment) - remember BCP",
      "Soil pollutants: Pesticides, heavy metals, salts, organic waste, radioactive materials - remember PHSOR"
    ],
    'biodiversity-conservation': [
      "Biodiversity levels: Genetic, Species, Ecosystem - remember GSE",
      "Threats to biodiversity: Habitat loss, Overexploitation, Pollution, Invasive species, Climate change - remember HIPIC",
      "Conservation status categories: LC (Least Concern), NT (Near Threatened), VU (Vulnerable), EN (Endangered), CR (Critically Endangered), EW (Extinct in Wild), EX (Extinct) - remember LNV-ECEW",
      "Nepal biodiversity: 44,000+ plant species, 1,000+ bird species, 183 mammal species, 151 reptile species, 119 amphibian species, 620+ fish species - remember 44-1-18-15-11-62"
    ],
    'conservation-biology': [
      "In-situ conservation: National parks, Wildlife sanctuaries, Biosphere reserves, Sacred groves - remember NWBS",
      "Ex-situ conservation: Zoos, Botanical gardens, Seed banks, Gene banks, Cryopreservation, Tissue culture labs - remember ZB-SG-CC",
      "Nepal community forestry: 16,000+ community forest user groups managing 2.2 million hectares - remember 16K-2.2M",
      "Success stories: Tiger population increased from 121 (209) to 355 (2022); Rhinoceros from 178 (1982) to 752 (2022) - remember T121-355, R178-752"
    ],
    'protected-areas': [
      "Nepal national parks: Chitwan, Sagarmatha, Langtang, Annapurna, Bardia, Shuklaphanta, Koshi Tappu, Rara, Banke, Parsa, Goldest, Helambu - remember C-S-L-A-B-S-K-R-B-P-G-H (first letters)",
      "UNESCO sites in Nepal: Sagarmatha (1979), Chitwan (1984), Kathmandu Valley (1979), Lumbini (1997) - remember SCKL",
      "Ramsar sites in Nepal: 10 wetlands including Koshi Tappu, Shey Phoksundo, Ghodaghodi Tal - remember 10 Ramsar sites",
      "Transboundary conservation: Terai Arc Landscape (Nepal-India), Central Himalaya (Nepal-China-India) - remember TAL-CH"
    ],
    'vegetation-types': [
      "Nepal vegetation zones: Terai (60-1000m), Subtropical (1000-2000m), Temperate (2000-3000m), Subalpine (3000-4000m), Alpine (4000-4500m), Nival (>4500m) - remember T-S-T-SA-A-N",
      "Terai vegetation: Sal (Shorea robusta) dominant, with ironwood, bamboo, grasslands - remember Sal forests of Terai",
      "Subtropical vegetation: Teak, Sal, Sissoo, Oak, Chestnut - remember TSSOC",
      "Temperate vegetation: Oak, Rhododendron, Maple, Cinchona, Deodar - remember ORMDC"
    ],
    'conservation-in-situ-ex-situ': [
      "In-situ methods: National parks, Wildlife sanctuaries, Conservation areas, Protected forests, Community forests, Sacred groves - remember NWCCPS",
      "Ex-situ methods: Zoos, Botanical gardens, Seed banks, Gene banks, Cryopreservation, Tissue culture labs - remember ZB-SG-CC",
      "Nepal community forestry success: 16,000+ community forest user groups managing 2.2 million hectares - a global model for participatory conservation",
      "Success stories: Tiger population increased from 121 (209) to 355 (2022); Rhinoceros from 178 (1982) to 752 (2022)"
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Biology branches mnemonic: Anatomy, Physiology, Genetics, Ecology, Taxonomy, Evolution, Biochemistry, Biophysics, Bioinformatics - remember APGETEBBB",
      "Hierarchy of life: Atom → Molecule → Cell → Tissue → Organ → System → Organism → Population → Community → Ecosystem → Biosphere - remember AMCTOSOPCEB",
      "Characteristics of life: MRS GREN - Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition",
      "Scope of biology: Study of structure (anatomy, cytology), function (physiology, biochemistry), classification (taxonomy, systematics), and evolution (evolutionary biology)"
    ],
    'relation-of-biology-with-other-sciences': [
      "Biology-Physics bridge: Biophysics studies forces, energy, and motion in living systems - think biomechanics",
      "Biology-Chemistry bridge: Biochemistry studies molecular basis of life - think metabolic pathways",
      "Biology-Computer bridge: Bioinformatics = Biology + Informatics - think sequence analysis",
      "Memory trick: BIO relates to all sciences: B = Biochemistry, I = Interdisciplinary, O = Organisms"
    ]
  };
  return tricks[slug] || [
    "Quick recall tip: Always read the question carefully before answering.",
    "Memory aid: Use mnemonics to remember lists and sequences.",
    "Exam strategy: Start with questions you know best to build confidence.",
    "Time management: Allocate time proportionally to marks available.",
    "Diagram practice: Draw and label diagrams neatly for better visualization.",
    "Definition memorization: Learn key definitions verbatim for maximum marks."
  ];
}

function getImportantNotes(slug) {
  const notes = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "Biology is not just about memorizing facts - it requires understanding processes and relationships.",
      "The hierarchy of life organization: atom → molecule → cell → tissue → organ → system → organism → population → community → ecosystem → biosphere.",
      "CEE frequently asks about the scope of biology and its branches - know the definitions of cytology, embryology, taxonomy, and physiology.",
      "The characteristic features of living organisms (MRS GREN) are fundamental and often tested in MCQ format."
    ],
    'biomolecules-functions': [
      "CEE High-Yield: Chargaffs rules are frequently tested - remember [A]=[T] and [G]=[C] for dsDNA.",
      "The difference between competitive and non-competitive enzyme inhibition is a common exam topic.",
      "ATP structure and function must be understood - it is the universal energy currency of the cell.",
      "Protein denaturation destroys 3D structure but NOT the primary sequence - this is a key distinction."
    ],
    'cell-introduction': [
      "CEE High-Yield: Cell theory has three main postulates - all organisms are made of cells, cells are the basic unit of life, and all cells come from pre-existing cells.",
      "The cell membrane is selectively permeable - this property is essential for maintaining homeostasis.",
      "Osmosis, diffusion, and active transport are the three mechanisms of substance movement across membranes.",
      "Eukaryotic cells have membrane-bound organelles; prokaryotic cells do not - this is the fundamental distinction."
    ],
    'cell-division': [
      "CEE High-Yield: Mitosis produces 2 genetically identical diploid cells; meiosis produces 4 genetically unique haploid cells.",
      "Crossing over occurs during Prophase I of meiosis - this is a source of genetic variation.",
      "The cell cycle has four phases: G1 (growth), S (DNA synthesis), G2 (preparation for division), and M (mitosis).",
      "Cancer results from uncontrolled cell division - mutations in genes regulating the cell cycle (cyclins, CDKs, tumor suppressors)."
    ],
    'ecosystem-ecology': [
      "CEE High-Yield: The 10% law of energy transfer was proposed by Raymond Lindeman in 1942.",
      "Ecosystems have two main components: biotic (living) and abiotic (non-living) - both interact continuously.",
      "Energy flow in ecosystems is unidirectional (sun → producers → consumers → decomposers) and lost as heat at each trophic level.",
      "Nepal diverse topography creates multiple ecosystem types - from tropical Terai to alpine Himalayan zones."
    ],
    'food-chain-web': [
      "CEE High-Yield: Food chains typically have 3-5 trophic levels due to energy loss at each transfer (~90% lost as heat).",
      "The 10% energy transfer rule means only about 10% of energy at one trophic level is available to the next level.",
      "Food webs are more realistic than food chains because they show multiple feeding relationships.",
      "Ecological pyramids can be upright (energy) or inverted (biomass in aquatic ecosystems, numbers in tree ecosystems)."
    ],
    'biogeochemical-cycles': [
      "CEE High-Yield: The nitrogen cycle is crucial because atmospheric N2 (78%) is unusable by most organisms - nitrogen fixation is essential.",
      "Carbon cycle connects all living organisms - carbon is the backbone of all organic molecules.",
      "The water cycle is driven by solar energy and gravity - evaporation, condensation, precipitation, and collection.",
      "Phosphorus cycle is the slowest biogeochemical cycle - it has no atmospheric component and relies on rock weathering."
    ],
    'ecological-adaptation': [
      "CEE High-Yield: Xerophytes have adaptations for water conservation (thick cuticle, sunken stomata, reduced leaves); hydrophytes have adaptations for aquatic life (air spaces, thin cuticle, weak support).",
      "Adaptations can be structural (physical features), physiological (internal processes), or behavioral (actions).",
      "r-selected species produce many offspring with little parental care; K-selected species produce few offspring with extensive parental care.",
      "Nepal altitudinal zonation creates distinct vegetation belts - each with specialized adaptations."
    ],
    'ecological-imbalances': [
      "CEE High-Yield: Climate change is primarily driven by increased greenhouse gas concentrations from fossil fuel combustion and deforestation.",
      "Biodiversity loss is the second major environmental crisis (after climate change) - currently 1,000-10,000 times the background extinction rate.",
      "Nepal is particularly vulnerable to climate change due to its mountainous terrain and reliance on monsoon-dependent agriculture.",
      "The concept of environmental carrying capacity defines the maximum population size an environment can sustain indefinitely."
    ],
    'origin-life': [
      "CEE High-Yield: The Miller-Urey experiment (1953) simulated early Earth conditions and produced amino acids - supporting abiogenesis.",
      "The RNA world hypothesis suggests RNA preceded DNA and proteins - RNA can both store genetic information and catalyze reactions.",
      "Hydrothermal vent theory proposes that life originated at deep-sea vents where chemical energy and minerals were abundant.",
      "LUCA (Last Universal Common Ancestor) is estimated to have lived 3.5-4.0 billion years ago - the common ancestor of all life."
    ],
    'evidences-of-evolution': [
      "CEE High-Yield: Homologous structures indicate common ancestry (divergent evolution); analogous structures indicate similar selective pressures (convergent evolution).",
      "Fossil record provides direct evidence of evolution - transitional fossils show intermediate forms between major groups.",
      "Molecular evidence (DNA/protein sequences) provides the most precise measure of evolutionary relationships.",
      "Vestigial structures (appendix, coccyx, wisdom teeth) are remnants of ancestral features that have lost their original function."
    ],
    'theories-of-evolution': [
      "CEE High-Yield: Lamarck proposed inheritance of acquired characteristics; Darwin proposed natural selection - Lamarck was wrong, Darwin was right (with modern modifications).",
      "Darwins key observations: (1) populations produce more offspring than can survive; (2) there is variation among individuals; (3) variation is heritable.",
      "The modern synthesis (1930s-1950s) combined Darwins natural selection with Mendelian genetics and population genetics.",
      "Neutral theory (Kimura, 1968) argues that most evolutionary changes at the molecular level are due to genetic drift, not natural selection."
    ],
    'human-evolution': [
      "CEE High-Yield: Key human evolution milestones - bipedalism (Australopithecus), tool use (Homo habilis), fire control (Homo erectus), language (Homo sapiens).",
      "Brain size increased from ~450 cm3 in Australopithecus to ~1350 cm3 in modern humans - a 3-fold increase over 4 million years.",
      "Neanderthals (Homo neanderthalensis) interbred with Homo sapiens - 1-4% of non-African human DNA is Neanderthal.",
      "The Out of Africa hypothesis is supported by genetic evidence - all modern humans descend from a population that migrated from Africa ~60,000-70,000 years ago."
    ],
    'biomolecules-introduction-and-functions': [
      "CEE High-Yield: Remember the energy values - carbohydrates and proteins provide ~4 kcal/g; lipids provide ~9 kcal/g.",
      "The four levels of protein structure (primary, secondary, tertiary, quaternary) are essential for exams.",
      "Chargaffs parity rules apply ONLY to double-stranded DNA - single-stranded DNA and RNA do not follow these rules.",
      "Glycosidic bonds link monosaccharides; peptide bonds link amino acids; phosphodiester bonds link nucleotides."
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "CEE High-Yield: Protozoa are classified by locomotion: Mastigophora (flagella), Sarcodina (pseudopodia), Ciliophora (cilia), Sporozoa (no locomotion).",
      "Plasmodium causes malaria - understand its complex life cycle involving both human and mosquito hosts.",
      "Paramecium is a model organism for studying ciliary movement, osmoregulation, and conjugation.",
      "Amoeba exhibits phagocytosis - pseudopodia surround food particles to form food vacuoles."
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "CEE High-Yield: The 9 major animal phyla are: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata, Chordata.",
      "Body symmetry: asymmetrical (sponges), radial (cnidarians), bilateral (most animals) - bilateral symmetry allows cephalization.",
      "Body cavities: acoelomate (no cavity), pseudocoelomate (false cavity), coelomate (true cavity lined by mesoderm).",
      "Segmentation (metamerism) allows specialization of body regions - seen prominently in annelids and arthropods."
    ],
    'earthworm': [
      "CEE High-Yield: Earthworms are hermaphrodites (both male and female reproductive organs in one individual) but cross-fertilize.",
      "Earthworm respiration is cutaneous (through skin) - skin must remain moist for gas exchange.",
      "The digestive system includes: mouth → buccal cavity → pharynx → esophagus → crop → gizzard → intestine → anus.",
      "Earthworms are important for soil health - they aerate soil, mix organic matter, and produce nutrient-rich castings."
    ],
    'frog-habit-and-habitat-external-features': [
      "CEE High-Yield: Frogs are amphibians (Class Amphibia, Order Anura = without tail) - they live both on land and in water.",
      "Frog skin is permeable to water and gases - they can breathe through their skin (cutaneous respiration).",
      "External features: tympanum (external ear), nictitating membrane (third eyelid), webbed feet (swimming), sticky tongue (catching prey).",
      "Frogs have a three-chambered heart (2 atria + 1 ventricle) - partial separation of oxygenated and deoxygenated blood."
    ],
    'monera-detailed': [
      "CEE High-Yield: Monera includes bacteria and cyanobacteria (blue-green algae) - they are prokaryotic (no membrane-bound nucleus).",
      "Bacterial shapes: coccus (spherical), bacillus (rod-shaped), vibrio (comma-shaped), spirillum (spiral).",
      "Bacteria reproduce by binary fission - one cell divides into two genetically identical daughter cells.",
      "Endospores are dormant, resistant structures formed by some bacteria (Bacillus, Clostridium) under unfavorable conditions."
    ],
    'virus': [
      "CEE High-Yield: Viruses are acellular - they are not considered living organisms because they cannot reproduce independently.",
      "Virus structure: nucleic acid core (DNA or RNA) + protein coat (capsid) + sometimes lipid envelope.",
      "Lytic cycle: virus infects host → replicates → lyses (breaks open) host cell → new virions released.",
      "Lysogenic cycle: viral DNA integrates into host genome (prophage) → replicates with host cell → can later enter lytic cycle."
    ],
    'animal-adaptation': [
      "CEE High-Yield: Aquatic adaptations: streamlined body, fins/flippers, gills, blubber, salt-excreting glands.",
      "Terrestrial adaptations: lungs for air breathing, limbs for locomotion, waterproof skin, amniotic egg, concentrated urine.",
      "Volant (flying) adaptations: wings, lightweight bones, feathers, powerful flight muscles, efficient respiratory system.",
      "Nepal animals show remarkable adaptations: snow leopard (thick fur, large nasal cavities for cold air), tiger (stripes for camouflage), rhinoceros (thick skin for protection)."
    ],
    'animal-behavior': [
      "CEE High-Yield: Behavior types: instinctive (innate, genetic) vs learned (acquired through experience).",
      "Reflex action: automatic, involuntary response to stimulus - involves spinal cord, not brain (e.g., knee-jerk reflex).",
      "Taxis: directional movement toward (positive) or away from (negative) stimulus (e.g., phototaxis, chemotaxis).",
      "Kinesis: non-directional change in activity rate in response to stimulus intensity (e.g., woodlice move faster in dry areas)."
    ],
    'environmental-pollution': [
      "CEE High-Yield: Air pollution: primary pollutants (CO, SO2, NOx, PM) emitted directly; secondary pollutants (O3, H2SO4) formed in atmosphere.",
      "Water pollution: biological (pathogens), chemical (pesticides, heavy metals), physical (heat, sediment, radioactivity).",
      "Soil pollution: pesticides, heavy metals, salts, organic waste, radioactive materials - affects crop quality and human health.",
      "Nepal air pollution in Kathmandu Valley often exceeds WHO guidelines by 10-15x during winter due to inversion layers and vehicle emissions."
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
      "Nepal conservation success: tiger population increased from 121 (209) to 355 (2022); rhinoceros from 178 (1982) to 752 (2022).",
      "Community forestry in Nepal: 16,000+ community forest user groups manage 2.2 million hectares - a global model for participatory conservation."
    ],
    'protected-areas': [
      "CEE High-Yield: Nepal has 12 national parks, 6 wildlife reserves, 3 conservation areas, and 11 protected forests.",
      "Chitwan National Park (established 1973) was Nepals first national park and a UNESCO World Heritage site (1984).",
      "Sagarmatha National Park (Everest) covers 1,148 km2 and includes the world highest peak (8,848 m).",
      "The Terai Arc Landscape connects 13 protected areas across Nepal and India - critical for tiger and rhino corridors."
    ],
    'vegetation-types': [
      "CEE High-Yield: Nepal vegetation zones by altitude: Terai (60-1000m), Subtropical (1000-2000m), Temperate (2000-3000m), Subalpine (3000-4000m), Alpine (4000-4500m), Nival (>4500m).",
      "Terai vegetation: Sal (Shorea robusta) is dominant - mixed deciduous forests with teak, bamboo, and grasslands.",
      "Temperate vegetation: Oak, rhododendron (national flower), maple, cinchona, deodar - diverse and species-rich.",
      "Alpine vegetation: dwarf juniper, rhododendron, wildflowers - limited to high-altitude meadows and scree slopes."
    ],
    'conservation-in-situ-ex-situ': [
      "CEE High-Yield: In-situ = conservation IN the natural habitat (national parks, sanctuaries, corridors, sacred groves).",
      "Ex-situ = conservation OUTSIDE the natural habitat (zoos, botanical gardens, seed banks, gene banks, cryopreservation).",
      "Nepal community forestry is a successful in-situ model - 16,000+ community groups manage 2.2M hectares.",
      "Ex-situ conservation in Nepal: Chitwan breeding center for rhinos, King Mahendra Conservation Trust for carnivores, National Trust for Nature Conservation (NTNC) for species recovery."
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      "CEE High-Yield: The hierarchy of life organization from atom to biosphere is a favorite exam topic.",
      "Remember MRS GREN for characteristics of life: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.",
      "Biology branches can be grouped by level: molecular (biochemistry), cellular (cytology), organismal (physiology, anatomy), ecological (population, community, ecosystem).",
      "The scope of biology extends from subatomic particles (in biochemistry) to the entire biosphere (in ecology)."
    ],
    'relation-of-biology-with-other-sciences': [
      "CEE High-Yield: Biochemistry is the most interconnected branch - it bridges biology with chemistry at the molecular level.",
      "Biophysics applies principles of mechanics, electricity, and thermodynamics to biological systems.",
      "Bioinformatics has become essential with the explosion of genomic data - over 200 billion bases sequenced daily.",
      "Biostatistics is crucial for experimental design and data analysis in all biological research."
    ]
  };
  return notes[slug] || [
    "Always read the question carefully to understand what is being asked.",
    "Use diagrams to clarify complex biological processes.",
    "Memorize key definitions and terminology for MCQ questions.",
    "Practice numerical problems in ecology (energy transfer, population growth).",
    "Understand the difference between homologous and analogous structures.",
    "Review past NEB exam questions to identify frequently tested topics."
  ];
}

function getExamNotes(slug) {
  const notes = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      "NEB Exam Focus: Characteristics of living organisms (MRS GREN), scope of biology, hierarchy of life organization.",
      "Previous Year Questions: Define biology and state its scope. List the characteristics of living organisms with examples.",
      "Marking Scheme Tips: Define terms precisely; use examples; draw diagrams where applicable; explain processes step-by-step.",
      "Common Mistakes: Students confuse taxonomy with systematics; forget that viruses are on the borderline of living/non-living."
    ],
    'biomolecules-functions': [
      "NEB Exam Focus: Structure and function of carbohydrates, proteins, lipids, nucleic acids; enzyme kinetics; Chargaffs rules.",
      "Previous Year Questions: Explain the structure of DNA with a diagram. Differentiate between competitive and non-competitive inhibition.",
      "Marking Scheme Tips: Label diagrams correctly; use proper terminology (glycosidic bond, peptide bond, phosphodiester bond); show calculations clearly.",
      "Common Mistakes: Students confuse α-1,4 and β-1,4 glycosidic bonds; forget that sucrose is non-reducing."
    ],
    'cell-introduction': [
      "NEB Exam Focus: Cell theory, cell organelles and their functions, cell membrane structure and transport mechanisms.",
      "Previous Year Questions: Describe the fluid mosaic model of the cell membrane. Differentiate between osmosis and diffusion.",
      "Marking Scheme Tips: Draw labeled diagrams of organelles; explain functions in relation to structure; use the correct terminology (selectively permeable, hypertonic, hypotonic).",
      "Common Mistakes: Students confuse plant and animal cell structures; forget that centrioles are absent in higher plant cells."
    ],
    'cell-division': [
      "NEB Exam Focus: Mitosis and meiosis stages, differences between them, significance in growth and reproduction.",
      "Previous Year Questions: Describe the stages of mitosis with diagrams. Differentiate between mitosis and meiosis.",
      "Marking Scheme Tips: Draw neat, labeled diagrams for each stage; mention key events (chromosome condensation, spindle formation, cytokinesis); highlight differences in a table format.",
      "Common Mistakes: Students confuse prophase I and prophase of mitosis; forget that crossing over occurs only in meiosis I."
    ],
    'ecosystem-ecology': [
      "NEB Exam Focus: Ecosystem components, trophic levels, energy flow, ecological pyramids, 10% law.",
      "Previous Year Questions: Explain the 10% law of energy transfer with an example. Draw and explain an ecological pyramid of energy.",
      "Marking Scheme Tips: Use the 10% law in calculations; draw pyramids with correct proportions; explain why energy pyramids are always upright.",
      "Common Mistakes: Students forget that energy pyramids are always upright (never inverted); confuse biomass pyramids with energy pyramids."
    ],
    'food-chain-web': [
      "NEB Exam Focus: Food chains and food webs, trophic levels, ecological pyramids, energy flow efficiency.",
      "Previous Year Questions: Construct a food chain from a given food web. Calculate the energy available at different trophic levels.",
      "Marking Scheme Tips: Show energy calculations using the 10% rule; identify producers, primary consumers, secondary consumers correctly; explain why food chains are short (3-5 levels).",
      "Common Mistakes: Students reverse the direction of energy flow; forget that decomposers are essential in food webs."
    ],
    'biogeochemical-cycles': [
      "NEB Exam Focus: Carbon cycle, nitrogen cycle, water cycle - processes and importance.",
      "Previous Year Questions: Explain the nitrogen cycle with a diagram. What is the importance of nitrogen fixation?",
      "Marking Scheme Tips: Draw labeled diagrams showing all major processes; mention key organisms (Rhizobium, Nitrosomonas, Nitrobacter, Pseudomonas); explain the role of each process.",
      "Common Mistakes: Students confuse nitrification with denitrification; forget that nitrogen fixation converts N2 to NH3."
    ],
    'ecological-adaptation': [
      "NEB Exam Focus: Adaptations of hydrophytes and xerophytes, r and K selection, ecological succession.",
      "Previous Year Questions: Describe the adaptations of xerophytes with examples. Differentiate between r-strategists and K-strategists.",
      "Marking Scheme Tips: List adaptations with examples; draw diagrams showing structural adaptations; compare r and K strategies in a table.",
      "Common Mistakes: Students confuse hydrophyte and xerophyte adaptations; forget that succession has two types (primary and secondary)."
    ],
    'ecological-imbalances': [
      "NEB Exam Focus: Climate change, biodiversity loss, pollution, conservation strategies in Nepal.",
      "Previous Year Questions: What are the causes and effects of climate change? Discuss the biodiversity crisis and its causes.",
      "Marking Scheme Tips: Use specific data (temperature rise, species extinction rates); mention Nepal-specific examples; suggest practical conservation measures.",
      "Common Mistakes: Students give general answers without specific examples; forget to mention Nepals vulnerability to climate change."
    ],
    'origin-life': [
      "NEB Exam Focus: Origin of life theories, Miller-Urey experiment, RNA world hypothesis, evidence for abiogenesis.",
      "Previous Year Questions: Describe the Miller-Urey experiment and its significance. Explain the RNA world hypothesis.",
      "Marking Scheme Tips: Draw the Miller-Urey apparatus; explain the experimental conditions and results; discuss the significance for origin of life theories.",
      "Common Mistakes: Students confuse the Miller-Urey experiment with other origin-of-life experiments; forget to mention the significance of the results."
    ],
    'evidences-of-evolution': [
      "NEB Exam Focus: Fossil record, homologous and analogous structures, embryological evidence, molecular evidence.",
      "Previous Year Questions: What are homologous structures? Give examples and explain their significance. How does molecular evidence support evolution?",
      "Marking Scheme Tips: Define terms clearly; give specific examples; explain the significance of each type of evidence; compare homologous vs analogous structures.",
      "Common Mistakes: Students confuse homologous and analogous structures; forget that vestigial structures are evidence for evolution."
    ],
    'theories-of-evolution': [
      "NEB Exam Focus: Lamarckism, Darwinism, modern synthesis, key differences between theories.",
      "Previous Year Questions: Explain Darwins theory of natural selection. Why is Lamarckism rejected? Give reasons.",
      "Marking Scheme Tips: Explain Darwins observations and conclusions; list the postulates of natural selection; give specific reasons why Lamarcks theory is incorrect.",
      "Common Mistakes: Students attribute Lamarcks theory as partially correct (it is largely wrong); forget to mention the modern synthesis."
    ],
    'human-evolution': [
      "NEB Exam Focus: Human evolution timeline, key species, brain size increase, key milestones.",
      "Previous Year Questions: Describe the evolution of humans from Australopithecus to Homo sapiens. What are the key milestones in human evolution?",
      "Marking Scheme Tips: Create a timeline with dates and brain sizes; mention key species in order; explain the significance of each milestone (bipedalism, tool use, fire, language).",
      "Common Mistakes: Students put species in wrong chronological order; forget brain size progression; confuse Homo erectus with Homo habilis."
    ],
    'biomolecules-introduction-and-functions': [
      "NEB Exam Focus: Structure of biomolecules, enzyme action, Chargaffs rules, ATP function.",
      "Previous Year Questions: Draw and label the structure of a nucleotide. Explain competitive enzyme inhibition with a diagram.",
      "Marking Scheme Tips: Draw labeled diagrams; use correct chemical terminology; show calculations for Chargaff rule problems; explain mechanisms clearly.",
      "Common Mistakes: Students forget that DNA is antiparallel; confuse the number of hydrogen bonds in A-T vs G-C pairs."
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      "NEB Exam Focus: Classification of protozoa by locomotion, Plasmodium life cycle, Paramecium structure, Amoeba features.",
      "Previous Year Questions: Classify protozoa with examples. Describe the life cycle of Plasmodium with a diagram.",
      "Marking Scheme Tips: Use a classification table; draw the Plasmodium life cycle showing both human and mosquito stages; label all parts of Paramecium.",
      "Common Mistakes: Students confuse the classes of protozoa; forget that Sporozoa are non-motile in adult stage; miss the sexual phase in Plasmodium life cycle."
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      "NEB Exam Focus: Major animal phyla characteristics, body plans, symmetry types, coelom types, diagnostic features.",
      "Previous Year Questions: Compare and contrast acoelomate, pseudocoelomate, and coelomate body plans. Describe the diagnostic features of Phylum Chordata.",
      "Marking Scheme Tips: Use comparison tables; draw diagrams showing body plans; list diagnostic features clearly; give examples for each phylum.",
      "Common Mistakes: Students confuse pseudocoelomate with coelomate; forget that echinoderms are deuterostomes; miss the notochord as a chordate characteristic."
    ],
    'earthworm': [
      "NEB Exam Focus: External and internal anatomy, digestive system, circulatory system, reproduction.",
      "Previous Year Questions: Draw and label the external anatomy of earthworm. Describe the digestive system of earthworm with a diagram.",
      "Marking Scheme Tips: Draw neat, labeled diagrams; explain functions of each part; mention the importance of earthworms in agriculture.",
      "Common Mistakes: Students confuse the crop with the gizzard; forget that earthworms are hermaphrodites; miss the typhlosole function."
    ],
    'frog-habit-and-habitat-external-features': [
      "NEB Exam Focus: External features, habitat adaptations, classification, sensory organs.",
      "Previous Year Questions: Describe the external features of frog with a diagram. How is frog adapted to amphibious life?",
      "Marking Scheme Tips: Draw labeled diagram of external features; explain adaptations for aquatic and terrestrial life; mention the importance of moist skin.",
      "Common Mistakes: Students forget the nictitating membrane; confuse tympanum with ear drum; miss the webbed feet adaptation."
    ],
    'monera-detailed': [
      "NEB Exam Focus: Bacterial structure, shapes, nutrition, reproduction, endospores, economic importance.",
      "Previous Year Questions: Describe the structure of a typical bacterium with a diagram. Differentiate between Gram-positive and Gram-negative bacteria.",
      "Marking Scheme Tips: Draw labeled diagram of bacterial structure; explain Gram staining difference; give economic examples (beneficial and harmful).",
      "Common Mistakes: Students confuse Gram-positive and Gram-negative cell wall structure; forget that archaebacteria are distinct from eubacteria."
    ],
    'virus': [
      "NEB Exam Focus: Virus structure, replication cycles (lytic and lysogenic), bacteriophage, economic importance.",
      "Previous Year Questions: Describe the structure of a bacteriophage with a diagram. Differentiate between lytic and lysogenic cycles.",
      "Marking Scheme Tips: Draw labeled diagram of bacteriophage; explain each step of both cycles; mention viral diseases and their importance.",
      "Common Mistakes: Students forget that viruses are acellular; confuse lytic and lysogenic cycles; miss the prophage stage in lysogenic cycle."
    ],
    'animal-adaptation': [
      "NEB Exam Focus: Aquatic, terrestrial, and volant adaptations, Nepalese animal adaptations, camouflage types.",
      "Previous Year Questions: Describe the adaptations of aquatic animals with examples. How are Nepalese mammals adapted to high altitudes?",
      "Marking Scheme Tips: Use specific examples (snow leopard, tiger, rhinoceros); explain structural, physiological, and behavioral adaptations; mention camouflage types.",
      "Common Mistakes: Students give generic adaptations without specific examples; forget physiological adaptations; miss the distinction between structural and behavioral adaptations."
    ],
    'animal-behavior': [
      "NEB Exam Focus: Types of behavior, reflex action, taxes, kineses, social behavior, migration.",
      "Previous Year Questions: Differentiate between instinctive and learned behavior with examples. Explain the waggle dance of bees.",
      "Marking Scheme Tips: Give clear definitions with examples; draw diagrams where applicable; explain the significance of each behavior type.",
      "Common Mistakes: Students confuse taxes with kineses; forget that reflexes involve the spinal cord, not the brain."
    ],
    'environmental-pollution': [
      "NEB Exam Focus: Types of pollution, causes and effects, control measures, Nepal-specific pollution issues.",
      "Previous Year Questions: Discuss the causes and effects of air pollution in Kathmandu Valley. What are the control measures for water pollution?",
      "Marking Scheme Tips: Use specific data (WHO guidelines, Nepal pollution levels); mention specific pollutants and their sources; suggest practical control measures.",
      "Common Mistakes: Students give general answers without Nepal-specific context; forget to mention point and non-point sources; miss the economic costs of pollution."
    ],
    'biodiversity-conservation': [
      "NEB Exam Focus: Levels of biodiversity, threats, IUCN categories, conservation strategies, Nepals biodiversity.",
      "Previous Year Questions: What are the major threats to biodiversity? Describe Nepals approach to biodiversity conservation.",
      "Marking Scheme Tips: Use specific numbers (tiger population, species counts); mention IUCN categories with examples; discuss both in-situ and ex-situ conservation.",
      "Common Mistakes: Students forget the three levels of biodiversity; confuse IUCN categories; give vague answers about conservation strategies."
    ],
    'conservation-biology': [
      "NEB Exam Focus: In-situ and ex-situ conservation, Nepals protected areas, community forestry, conservation success stories.",
      "Previous Year Questions: Differentiate between in-situ and ex-situ conservation with examples. Describe Nepals community forestry program.",
      "Marking Scheme Tips: Use specific examples from Nepal; mention population trends (tigers, rhinos); discuss community involvement; suggest improvements.",
      "Common Mistakes: Students confuse in-situ and ex-situ examples; forget to mention community forestry; miss the economic benefits of conservation."
    ],
    'protected-areas': [
      "NEB Exam Focus: Types of protected areas in Nepal, their significance, management approaches, challenges.",
      "Previous Year Questions: List the national parks of Nepal and their significance. What are the challenges in managing protected areas in Nepal?",
      "Marking Scheme Tips: List all 12 national parks with area and year of establishment; mention key species in each; discuss management challenges and solutions.",
      "Common Mistakes: Students forget the number of national parks; confuse national parks with wildlife reserves; miss the transboundary conservation initiatives."
    ],
    'vegetation-types': [
      "NEB Exam Focus: Vegetation zones in Nepal by altitude, characteristic species, conservation status, human impacts.",
      "Previous Year Questions: Describe the vegetation zones of Nepal with altitude ranges and characteristic species. What are the threats to Nepals vegetation?",
      "Marking Scheme Tips: Create a table with altitude ranges, vegetation types, and characteristic species; mention endemic species; discuss threats and conservation measures.",
      "Common Mistakes: Students give wrong altitude ranges; forget characteristic species for each zone; miss the impact of climate change on vegetation zones."
    ],
    'conservation-in-situ-ex-situ': [
      "NEB Exam Focus: Difference between in-situ and ex-situ, methods, advantages and disadvantages, Nepals approach.",
      "Previous Year Questions: Differentiate between in-situ and ex-situ conservation with examples. Evaluate the success of community forestry in Nepal.",
      "Marking Scheme Tips: Use comparison table; give specific examples from Nepal; discuss advantages and disadvantages of each approach; mention success stories and challenges.",
      "Common Mistakes: Students confuse the two approaches; give only one example for each; forget to discuss advantages and disadvantages."
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      "NEB Exam Focus: Characteristics of living organisms, scope and branches of biology, hierarchy of life organization.",
      "Previous Year Questions: Define biology and state its scope. List the characteristics of living organisms with examples. Explain the hierarchy of life organization.",
      "Marking Scheme Tips: Define terms precisely; use examples; draw diagrams where applicable; explain processes step-by-step.",
      "Common Mistakes: Students confuse taxonomy with systematics; forget that viruses are on the borderline of living/non-living."
    ],
    'relation-of-biology-with-other-sciences': [
      "NEB Exam Focus: Interdisciplinary nature of biology, branches like biochemistry, biophysics, bioinformatics, biostatistics.",
      "Previous Year Questions: How does biology relate to chemistry and physics? What is bioinformatics and its importance?",
      "Marking Scheme Tips: Give specific examples of interdisciplinary applications; explain the tools and techniques used; discuss real-world applications.",
      "Common Mistakes: Students give vague answers about the relationship; forget specific examples of bioinformatics applications."
    ]
  };
  return notes[slug] || [
    "Focus on understanding concepts rather than rote memorization.",
    "Practice drawing labeled diagrams - they carry significant marks.",
    "Learn key definitions exactly as given in the textbook for marking purposes.",
    "Solve numerical problems in ecology (energy transfer, population growth) regularly.",
    "Review previous year questions to understand the exam pattern and marking scheme.",
    "Use mnemonics and memory aids for classification and cycles."
  ];
}

function getExercises(slug) {
  const exercises = {
    'introduction-to-biology-scope-and-fields-of-biology': [
      { problem: "List all branches of biology and give one example of study for each.", solution: "Anatomy (study of internal structures), Physiology (study of functions), Genetics (study of heredity), Ecology (study of organism-environment interactions), Taxonomy (study of classification), Evolution (study of origins and changes over time)." },
      { problem: "Explain the hierarchy of life organization with a suitable example.", solution: "Atom (carbon) → Molecule (glucose) → Organelle (chloroplast) → Cell (plant cell) → Tissue (parenchyma) → Organ (leaf) → System (photosynthetic system) → Organism (maple tree) → Population (all maple trees in a forest) → Community (all organisms in the forest) → Ecosystem (forest + abiotic factors) → Biosphere (all ecosystems on Earth)." },
      { problem: "Define biology and explain its importance in daily life.", solution: "Biology is the scientific study of life and living organisms. Importance: (1) Understanding human health and disease, (2) Agriculture and food production, (3) Medicine and pharmaceuticals, (4) Environmental conservation, (5) Biotechnology and genetic engineering, (6) Understanding our place in the natural world." }
    ],
    'biomolecules-functions': [
      { problem: "Calculate the percentage of each base in a DNA molecule that has 20% adenine.", solution: "Given: A = 20%. By Chargaff rules: A = T = 20%, so A + T = 40%. Remaining: G + C = 60%. Since G = C, G = C = 30%. Answer: A=20%, T=20%, G=30%, C=30%." },
      { problem: "Explain why sucrose is a non-reducing sugar while maltose is reducing.", solution: "Sucrose: both anomeric carbons (C1 of glucose and C2 of fructose) are involved in the glycosidic bond - no free anomeric carbon to open and reduce. Maltose: only C1 of first glucose is involved; C1 of second glucose is free - can open to aldehyde form - reduces Benedict reagent." },
      { problem: "Calculate the molecular weight of a tripeptide formed from glycine, alanine, and valine.", solution: "MW of Gly = 75, Ala = 89, Val = 117. Tripeptide formation: 3 amino acids → 2 peptide bonds → 2 H2O lost. MW = (75 + 89 + 117) - 2(18) = 281 - 36 = 245 g/mol." }
    ],
    'cell-introduction': [
      { problem: "Calculate the surface area to volume ratio for a cubic cell with side length 10 micrometers.", solution: "SA = 6 x (10 micrometers)^2 = 600 micrometers^2. Volume = (10 micrometers)^3 = 1000 micrometers^3. SA:V = 600:1000 = 0.6 micrometers^-1. For a 1 micrometer cell: SA = 6, V = 1, SA:V = 6. Smaller cells have higher SA:V ratios - more efficient for exchange." },
      { problem: "Explain why a cell cannot grow indefinitely large.", solution: "As a cell grows, volume increases faster than surface area (volume ∝ r^3, surface area ∝ r^2). This decreases the SA:V ratio, reducing the efficiency of material exchange across the membrane. Also, the nucleus has limited capacity to control a larger cytoplasmic volume. Cells divide when they reach a critical size to maintain efficient exchange." },
      { problem: "Differentiate between hypertonic, hypotonic, and isotonic solutions with examples.", solution: "Hypertonic: higher solute concentration outside cell → water leaves cell → plasmolysis (plant) or crenation (animal). Example: Salt water on freshwater amoeba. Hypotonic: lower solute concentration outside → water enters cell → turgor (plant) or lysis (animal). Example: Freshwater for marine organisms. Isotonic: equal concentration - no net water movement. Example: 0.9% NaCl for human RBCs." }
    ],
    'cell-division': [
      { problem: "If a cell has 14 chromosomes, how many chromosomes will each daughter cell have after mitosis?", solution: "After mitosis: each daughter cell has the same number of chromosomes as the parent cell. Answer: 14 chromosomes per daughter cell." },
      { problem: "If a cell has 14 chromosomes, how many chromosomes will each gamete have after meiosis?", solution: "After meiosis: chromosome number is halved. Answer: 7 chromosomes per gamete (haploid)." },
      { problem: "Calculate the number of cells after 5 rounds of mitosis starting from 1 cell.", solution: "After 1 division: 2 cells. After 2: 4. After 3: 8. After 4: 16. After 5: 32 cells. Formula: 2^n where n = number of divisions. 2^5 = 32 cells." }
    ],
    'ecosystem-ecology': [
      { problem: "If producers have 10,000 J of energy, calculate energy available at each trophic level using the 10% law.", solution: "Producer: 10,000 J. Primary consumer: 1,000 J (10%). Secondary consumer: 100 J (10%). Tertiary consumer: 10 J (10%). Quaternary consumer: 1 J (10%). Only 0.01% of original energy reaches the top consumer." },
      { problem: "Calculate the biomass at the 4th trophic level if the 1st trophic level has 5,000 kg.", solution: "T1 (producer): 5,000 kg. T2 (primary consumer): 500 kg. T3 (secondary consumer): 50 kg. T4 (tertiary consumer): 5 kg. Using 10% rule at each transfer." },
      { problem: "An ecosystem receives 1,000,000 J of solar energy. Calculate energy available to tertiary consumers (assume 1% solar capture by producers).", solution: "Solar energy: 1,000,000 J. Producer capture (1%): 10,000 J. Primary consumer (10%): 1,000 J. Secondary consumer (10%): 100 J. Tertiary consumer (10%): 10 J. Overall efficiency from solar to tertiary: 0.001%." }
    ],
    'food-chain-web': [
      { problem: "In a food chain: Grass → Grasshopper → Frog → Snake → Hawk, if grass has 100,000 J, calculate energy at each level.", solution: "Grass (producer): 100,000 J. Grasshopper (primary): 10,000 J. Frog (secondary): 1,000 J. Snake (tertiary): 100 J. Hawk (quaternary): 10 J. Only 0.01% of original energy reaches the top predator." },
      { problem: "Construct a food web from: grass, rabbit, fox, deer, hawk, snake, grasshopper, mouse.", solution: "Grass → Grasshopper → Frog → Snake → Hawk. Grass → Rabbit → Fox. Grass → Deer. Mouse → Snake → Hawk. Mouse → Fox. (Multiple interconnected chains form a web, increasing ecosystem stability.)" },
      { problem: "Explain why food chains rarely exceed 4-5 trophic levels.", solution: "At each trophic level, ~90% of energy is lost as heat (metabolism, movement, heat production). Only ~10% is available to the next level. After 4-5 levels, insufficient energy remains to support another trophic level. Example: Starting with 10,000 J at producer level, only ~1 J remains at the 5th level - insufficient to sustain a population." }
    ],
    'biogeochemical-cycles': [
      { problem: "Calculate the amount of nitrogen fixed by Rhizobium in a field with 100 kg N/ha/year fixation capacity over 5 years.", solution: "Annual fixation: 100 kg N/ha. Over 5 years: 100 x 5 = 500 kg N/ha. Note: This is a simplification - actual fixation varies with soil conditions, legume species, and climate." },
      { problem: "If a lake receives 50 kg of phosphorus annually and outputs 45 kg, calculate the accumulation over 10 years.", solution: "Annual accumulation: 50 - 45 = 5 kg/year. Over 10 years: 5 x 10 = 50 kg. This accumulation can lead to eutrophication - excessive algal growth, oxygen depletion, and fish kills." },
      { problem: "Explain why the phosphorus cycle has no atmospheric component.", solution: "Phosphorus is a solid at room temperature and pressure. Its compounds (phosphates) are not volatile. The cycle involves: weathering of rocks → phosphate in soil/water → assimilation by organisms → decomposition → sedimentation → geological uplift → weathering again. No significant atmospheric reservoir exists." }
    ],
    'ecological-adaptation': [
      { problem: "Compare the adaptations of a cactus (xerophyte) and a water lily (hydrophyte).", solution: "Cactus (Xerophyte): (1) Spines instead of leaves to reduce surface area, (2) Thick waxy cuticle to prevent water loss, (3) Sunken stomata to reduce transpiration, (4) Deep root system to access groundwater, (5) Succulent stem for water storage. Water Lily (Hydrophyte): (1) Broad flat leaves for maximum light capture, (2) Air spaces (aerenchyma) for buoyancy, (3) Thin cuticle for gas exchange, (4) Weak support tissues (water provides support), (5) Shallow root system (water nutrients are readily available)." },
      { problem: "Explain how r-selected and K-selected species differ in their reproductive strategies.", solution: "r-selected species: (1) Produce many small offspring, (2) Little or no parental care, (3) Early maturity, (4) Short lifespan, (5) Opportunistic colonizers of unstable environments. Examples: insects, weeds, bacteria. K-selected species: (1) Produce few large offspring, (2) Extensive parental care, (3) Late maturity, (4) Long lifespan, (5) Competitive in stable environments. Examples: elephants, humans, whales." }
    ],
    'ecological-imbalances': [
      { problem: "Calculate the increase in atmospheric CO2 from pre-industrial levels (280 ppm) to current levels (420 ppm) as a percentage.", solution: "Increase = 420 - 280 = 140 ppm. Percentage increase = (140 / 280) x 100% = 50% increase since pre-industrial times." },
      { problem: "If a population of 1000 individuals has a birth rate of 0.03/year and death rate of 0.02/year, calculate the population after 5 years (exponential growth).", solution: "r = b - d = 0.03 - 0.02 = 0.01/year. N(t) = N0 x e^(rt) = 1000 x e^(0.01x5) = 1000 x e^0.05 = 1000 x 1.0513 = 1051.3 ≈ 1051 individuals after 5 years." },
      { problem: "Explain the concept of environmental carrying capacity with an example from Nepal.", solution: "Carrying capacity (K) is the maximum population size that an environment can sustain indefinitely. In Nepal, the carrying capacity for snow leopards in the Annapurna Conservation Area is estimated at ~200 individuals based on prey availability (blue sheep, ibex). If the population exceeds K, competition increases, mortality rises, and the population declines back toward K." }
    ],
    'origin-life': [
      { problem: "Describe the Miller-Urey experiment and its significance for understanding the origin of life.", solution: "The Miller-Urey experiment (1953) simulated early Earth conditions by mixing methane (CH4), ammonia (NH3), hydrogen (H2), and water vapor (H2O) in a closed system and subjecting it to electrical sparks (simulating lightning). After one week, they found 11 different amino acids, including glycine, alanine, and aspartic acid. Significance: It demonstrated that organic molecules essential for life could be synthesized from inorganic precursors under prebiotic conditions, supporting the hypothesis of chemical evolution." },
      { problem: "Explain the RNA world hypothesis and provide evidence supporting it.", solution: "The RNA world hypothesis proposes that RNA was the first genetic material and catalyst before DNA and proteins evolved. Evidence: (1) RNA can store genetic information like DNA, (2) RNA can catalyze chemical reactions (ribozymes), (3) RNA is central to protein synthesis (mRNA, tRNA, rRNA), (4) ATP and other cofactors are nucleotide derivatives, (5) RNA can self-replicate in vitro. This suggests RNA predates both DNA and proteins in evolution." }
    ],
    'evidences-of-evolution': [
      { problem: "Compare homologous and analogous structures with examples and explain their significance in evolution.", solution: "Homologous structures: Same evolutionary origin, different functions. Example: Human arm, bat wing, whale flipper - all have the same bone arrangement (humerus, radius, ulna, carpals) but different functions. Significance: Evidence of divergent evolution from common ancestor. Analogous structures: Different evolutionary origin, similar functions. Example: Bird wing and insect wing - both for flight but different structures. Significance: Evidence of convergent evolution due to similar selective pressures." },
      { problem: "How does molecular evidence support the theory of evolution? Give specific examples.", solution: "Molecular evidence compares DNA and protein sequences across species. More similar sequences indicate closer evolutionary relationships. Examples: (1) Human and chimpanzee cytochrome c differ by 0 amino acids (100% identical), (2) Human and rhesus monkey differ by 1 amino acid, (3) Human and horse differ by 12 amino acids, (4) Human and yeast differ by 45 amino acids. This molecular clock provides precise measures of evolutionary distance and confirms relationships predicted by fossil and anatomical evidence." }
    ],
    'theories-of-evolution': [
      { problem: "Compare Lamarckism and Darwinism, explaining why Lamarckism was rejected.", solution: "Lamarckism: (1) Features acquired during lifetime are inherited, (2) Use and disuse determines development of organs. Example: Giraffe neck stretched by reaching leaves → longer neck inherited. Darwinism: (1) Natural selection acts on existing variation, (2) Individuals with advantageous traits survive and reproduce. Example: Giraffes with naturally longer necks survived better → passed long neck genes. Rejection of Lamarckism: Weismann cut mouse tails for 22 generations - no shortening inherited. Modern genetics shows acquired characteristics do not change DNA sequence." },
      { problem: "Explain the modern synthesis of evolution and its key components.", solution: "The modern synthesis (1930s-1950s) combined Darwin natural selection with Mendelian genetics and population genetics. Key components: (1) Population is the unit of evolution (not individual), (2) Mutation provides raw genetic variation, (3) Natural selection is the primary mechanism of adaptive evolution, (4) Genetic drift causes random allele frequency changes in small populations, (5) Gene flow transfers alleles between populations, (6) Speciation occurs through reproductive isolation. Key figures: Fisher, Haldane, Wright, Dobzhansky, Mayr, Simpson." }
    ],
    'human-evolution': [
      { problem: "Create a timeline of human evolution showing key species, brain sizes, and milestones.", solution: "~6-7 Ma: Sahelanthropus tchadensis (brain ~350 cm3, possible bipedalism). ~4.4 Ma: Ardipithecus ramidus (brain ~300-350 cm3, bipedal). ~3.2 Ma: Australopithecus afarensis-Lucy (brain ~400-500 cm3, habitual bipedalism). ~2.8-2.5 Ma: Australopithecus africanus (brain ~450 cm3). ~2.4 Ma: Homo habilis (brain ~600 cm3, Oldowan tools). ~1.9 Ma: Homo erectus (brain ~900 cm3, fire use, migration out of Africa). ~300 ka: Homo sapiens (brain ~1350 cm3, language, complex tools). ~40-10 ka: Neanderthals in Europe (brain ~1500 cm3, burial rituals)." },
      { problem: "Explain the Out of Africa hypothesis and the evidence supporting it.", solution: "The Out of Africa hypothesis (Recent African Origin model) proposes that all modern humans (Homo sapiens) evolved in Africa ~300,000 years ago and migrated out ~60,000-70,000 years ago, replacing archaic human populations. Evidence: (1) Fossil evidence: Oldest H. sapiens fossils found in Africa (Jebel Irhoud, Morocco ~300 ka; Omo Kibish, Ethiopia ~195 ka). (2) Genetic evidence: Mitochondrial DNA studies show all living humans trace maternal lineage to an African woman ~150,000-200,000 years ago. (3) Y-chromosome studies show all living men trace paternal lineage to an African man ~200,000-300,000 years ago. (4) Nuclear DNA: Africans have greater genetic diversity than non-Africans, consistent with a longer evolutionary history in Africa." }
    ],
    'biomolecules-introduction-and-functions': [
      { problem: "Calculate the number of water molecules released when 10 amino acids form a polypeptide chain.", solution: "When n amino acids form a polypeptide chain, (n-1) peptide bonds are formed, releasing (n-1) water molecules. For 10 amino acids: 10 - 1 = 9 water molecules released." },
      { problem: "Explain why DNA is more stable than RNA, giving three structural reasons.", solution: "DNA is more stable than RNA because: (1) Deoxyribose lacks the 2-OH group found in ribose, making DNA less reactive and less susceptible to hydrolysis. The 2-OH in RNA can attack the phosphodiester backbone, causing strand cleavage. (2) DNA is typically double-stranded, providing redundancy - if one strand is damaged, the complementary strand can serve as a template for repair. RNA is usually single-stranded and more exposed. (3) Thymine in DNA (vs uracil in RNA) is methylated, providing additional stability and allowing repair enzymes to distinguish between damaged cytosine (which deaminates to uracil) and normal uracil in RNA." }
    ],
    'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': [
      { problem: "Draw and label the life cycle of Plasmodium vivax, showing both human and mosquito stages.", solution: "Human host stages: (1) Sporozoites injected by mosquito bite → liver cells → exo-erythrocytic schizogony → merozoites released. (2) Merozoites invade RBCs → erythrocytic schizogony → trophozoite → schizont → merozoites released (causes fever cyclically every 48h). (3) Some merozoites develop into gametocytes (sexual forms). Mosquito host stages: (4) Gametocytes ingested by mosquito → male and female gametes formed → fertilization → ookinete → oocyst → sporogony → sporozoites migrate to salivary glands. Key: P. vivax has hypnozoites (dormant liver stage) requiring primaquine for radical cure." },
      { problem: "Compare Paramecium and Amoeba in terms of locomotion, feeding, and osmoregulation.", solution: "Paramecium: (1) Locomotion: Cilia beat coordinately for whip-like propulsion and rotation. (2) Feeding: Oral groove with cilia sweeps food into cytostome; food vacuoles form. (3) Osmoregulation: Two contractile vacuoles collect excess water from radial canals and expel it. Amoeba: (1) Locomotion: Pseudopodia (cytoplasmic projections) flow forward; adhesion to substrate. (2) Feeding: Pseudopodia surround food particle → phagocytosis → food vacuole. (3) Osmoregulation: Single contractile vacuole collects water from cytoplasm. Key difference: Paramecium has fixed shape (pellicle); Amoeba has changing shape." }
    ],
    'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': [
      { problem: "Compare acoelomate, pseudocoelomate, and coelomate body plans with examples.", solution: "Acoelomate (no body cavity): Body solid between gut and body wall. Example: Platyhelminthes (flatworms). Advantage: Simple structure. Disadvantage: No space for organ development, no hydrostatic skeleton. Pseudocoelomate (false body cavity): Cavity not fully lined by mesoderm. Example: Nematoda (roundworms). Advantage: Hydrostatic skeleton, space for organs. Disadvantage: Cavity not fully mesodermal (no mesenteries). Coelomate (true body cavity): Cavity completely lined by mesoderm (peritoneum). Example: Annelida, Arthropoda, Chordata. Advantage: Full organ suspension, independent organ movement, sophisticated hydrostatic skeleton, space for complex organs." },
      { problem: "List the diagnostic features of Phylum Chordata and give three examples.", solution: "Diagnostic features of Chordata (present at some stage of life cycle): (1) Notochord - flexible rod dorsal to gut, provides skeletal support. (2) Dorsal hollow nerve cord - develops into brain and spinal cord. (3) Pharyngeal slits/clefts - openings in pharynx, for filter feeding or respiration. (4) Post-anal tail - extension of body past anus, aids in locomotion. (5) Endostyle/thyroid - glandular structure in pharynx, produces mucus and hormones. Examples: (1) Amphioxus (Branchiostoma) - Cephalochordata, retains all features throughout life. (2) Frog (Rana) - Amphibia, notochord replaced by vertebral column in adult. (3) Human (Homo sapiens) - Mammalia, all features present in embryo, modified in adult." }
    ],
    'earthworm': [
      { problem: "Describe the digestive system of earthworm from mouth to anus, explaining the function of each part.", solution: "Mouth: Ingests soil and organic matter. Buccal cavity: Temporary food storage. Pharynx: Muscular pump that sucks food inward. Esophagus: Conduit with calyces (calciferous glands) that neutralize acidic soil. Crop: Temporary storage chamber. Gizzard: Muscular organ with thick cuticular lining that grinds soil and organic particles. Intestine: Main site of digestion and absorption; typhlosole (dorsal fold) increases surface area. Rectum: Water reabsorption and compaction of waste. Anus: Expels castings (vermicast) enriched with nutrients. Key adaptation: Typhlosole greatly increases absorptive surface area." },
      { problem: "Explain the circulatory system of earthworm and why it is called closed.", solution: "Earthworm has a closed circulatory system - blood remains within vessels throughout circulation. Components: (1) Dorsal blood vessel - main collecting vessel, pumps blood forward. (2) Ventral blood vessel - main distributing vessel, pumps blood backward. (3) Five pairs of aortic arches (hearts) in segments 7-11 - connect dorsal and ventral vessels, pump blood. (4) Subneural vessel - below nerve cord. (5) Lateral vessels - in each segment. Blood contains respiratory pigment (hemoglobin) dissolved in plasma (no RBCs). Blood flows: dorsal vessel → five pairs of hearts → ventral vessel → lateral vessels → back to dorsal vessel. Closed system allows controlled distribution and higher pressure than open systems." }
    ],
    'frog-habit-and-habitat-external-features': [
      { problem: "Describe the external features of frog and explain how each is adapted to amphibious life.", solution: "Streamlined body: Reduces water resistance for swimming. Moist, permeable skin: Enables cutaneous respiration underwater; must stay moist for gas exchange. Posteriorly placed eyes: Allow frog to remain submerged while observing surroundings. Nictitating membrane: Transparent third eyelid protects eyes underwater while maintaining vision. Nostrils (external nares): Positioned dorsally for breathing while mostly submerged. Tympanum: External ear drum visible behind eye; detects airborne and water-borne vibrations. Webbed hind feet: Paddles for powerful swimming; toes for walking on land. Sticky, protrusible tongue: Captures fast-moving insect prey. Vocal sacs: Amplify mating calls in males. Digital pads: Aid climbing on vegetation. Coloration: Dorsal green/brown for camouflage in vegetation; ventral light for countershading." },
      { problem: "Explain how frog senses are adapted to both aquatic and terrestrial environments.", solution: "Vision: Forward-facing eyes provide binocular vision for depth perception on land; can see underwater through nictitating membrane. Hearing: Tympanum detects airborne sound waves on land; also detects water vibrations. Smell: Internal nostrils allow smelling air while mouth closed underwater; olfactory epithelium detects airborne chemicals on land. Lateral line (in tadpoles only): Detects water currents and vibrations - lost in adult frog. Touch: Sensitive skin with nerve endings detects touch, temperature, and chemical stimuli in both media. Balance: Inner ear (vestibular apparatus) detects gravity and acceleration in both air and water." }
    ],
    'monera-detailed': [
      { problem: "Differentiate between Gram-positive and Gram-negative bacteria based on cell wall structure.", solution: "Gram-positive bacteria: (1) Thick peptidoglycan layer (20-80 nm, 60-90% of cell wall). (2) No outer membrane. (3) Teichoic acids embedded in peptidoglycan. (4) Lipoteichoic acids anchor wall to plasma membrane. (5) Periplasmic space absent or minimal. (6) Stains purple/blue in Gram stain. (7) More susceptible to penicillin (targets peptidoglycan synthesis). (8) Examples: Bacillus, Staphylococcus, Streptococcus. Gram-negative bacteria: (1) Thin peptidoglycan layer (2-7 nm, 10% of wall). (2) Outer membrane present (lipopolysaccharide layer). (3) Lipopolysaccharide (LPS) in outer membrane = endotoxin. (4) Periplasmic space between membranes contains hydrolytic enzymes. (5) Porins in outer membrane allow molecule passage. (6) Stains pink/red in Gram stain. (7) More resistant to penicillin. (8) Examples: E. coli, Salmonella, Pseudomonas." },
      { problem: "Describe the structure and function of bacterial endospores.", solution: "Structure: (1) Core: Contains DNA, ribosomes, enzymes in dehydrated state. (2) Cortex: Thick layer of modified peptidoglycan. (3) Coat: Multiple protein layers providing chemical resistance. (4) Exosporium (some species): Thin outer layer. Function: (1) Survival - resist boiling (100C for hours), UV radiation, desiccation, chemical disinfectants. (2) Dormancy - metabolic activity nearly zero; can survive centuries. (3) Germination - when conditions improve, spore germinates into vegetative cell. Formation (sporulation) triggered by nutrient depletion. Important genera: Bacillus (aerobic, soil) and Clostridium (anaerobic, soil/gut). Clinical significance: C. botulinum (botulism), C. tetani (tetanus), C. difficile (pseudomembranous colitis) spores survive standard autoclaving if not properly performed." }
    ],
    'virus': [
      { problem: "Describe the structure of bacteriophage T4 and explain how it infects E. coli.", solution: "Structure: (1) Head (capsid): Icosahedral, contains double-stranded DNA genome (~170 kbp). (2) Tail: Contractile tube made of tail sheath and inner core. (3) Tail fibers: Six fibers for host recognition and attachment to E. coli lipopolysaccharides. (4) Base plate: At tail end, anchors tail fibers. Infection process: (1) Tail fibers attach to specific receptors on E. coli cell surface. (2) Base plate attaches to cell wall. (3) Tail sheath contracts, driving inner tube through cell wall. (4) Viral DNA is injected through tube into bacterial cytoplasm. (5) Empty protein capsid (ghost) remains outside. (6) Bacterial machinery is hijacked to replicate phage DNA and synthesize capsid proteins. (7) New phages assemble and lyse the cell, releasing ~100-200 progeny virions." },
      { problem: "Compare the lytic and lysogenic cycles of bacteriophages.", solution: "Lytic cycle: (1) Attachment and injection of viral DNA. (2) Immediate replication of viral genome using host machinery. (3) Synthesis of viral proteins (capsid, enzymes). (4) Assembly of new virions. (5) Lysis of host cell - release of 100-200 new phages. Time: 20-40 minutes. Outcome: Host cell death. Virulent phages (e.g., T4) only undergo lytic cycle. Lysogenic cycle: (1) Attachment and injection of viral DNA. (2) Viral DNA integrates into host chromosome as prophage (via site-specific recombination). (3) Prophage replicates passively with host DNA during cell division. (4) No virion production; host not lysed. (5) Under stress (UV, chemicals), prophage may excise and enter lytic cycle (induction). Temperate phages (e.g., lambda) can choose either cycle. Key difference: Lytic = immediate replication + host death; Lysogenic = latent integration + host survival until induction." }
    ],
    'ecological-adaptation': [
      { problem: "Describe the structural and physiological adaptations of xerophytes with examples.", solution: "Structural adaptations: (1) Reduced leaf surface area - cactus spines minimize transpiration. (2) Thick waxy cuticle - reduces water loss from epidermis (up to 10x thicker than mesophytes). (3) Sunken stomata - create humid microclimate reducing water potential gradient (e.g., Oleander). (4) Hairs/trichomes - trap humid air near stomata (e.g., Cotton). (5) Succulent stems/leaves - water storage tissue (e.g., Aloe, Agave). (6) Deep or widespread root systems - access deep groundwater or rapid surface water uptake (e.g., Prosopis deep roots; desert annuals shallow widespread roots). (7) Reduced number of stomata - fewer pores for water loss. Physiological adaptations: (1) CAM photosynthesis - stomata open at night to fix CO2 as malate; close during day to prevent water loss (cacti, pineapples). (2) Obligate C4 pathway - efficient CO2 concentration mechanism reduces photorespiration (desert grasses). (3) Osmotic adjustment - accumulate solutes to maintain water uptake at low soil water potentials. (4) Leaf shedding - deciduous behavior during drought (e.g., Kikar)." }
    ],
    'biodiversity-conservation': [
      { problem: "Calculate the minimum viable population (MVP) needed to maintain 90% genetic diversity over 100 generations.", solution: "To maintain genetic diversity, we use the formula for heterozygosity retention: Ht = H0(1 - 1/(2Ne))^t. We want Ht/H0 = 0.90 after t = 100 generations. So: 0.90 = (1 - 1/(2Ne))^100. Taking natural log: ln(0.90) = 100 x ln(1 - 1/(2Ne)). -0.1054 = 100 x ln(1 - 1/(2Ne)). -0.001054 = ln(1 - 1/(2Ne)). Using approximation ln(1-x) ≈ -x for small x: -0.001054 ≈ -1/(2Ne). Ne ≈ 1/0.002108 ≈ 474. Therefore, a minimum effective population size of approximately 500 individuals is needed to retain 90% of genetic diversity over 100 generations. This aligns with the widely cited MVP guideline of Ne = 500 for long-term evolutionary potential." },
      { problem: "Explain the species-area relationship and calculate the expected number of species on an island 1/10th the area of a continent.", solution: "The species-area relationship is expressed as S = cA^z, where S = number of species, A = area, c = constant (depends on taxon and region), and z = slope (typically 0.2-0.35 for islands, 0.1-0.2 for continental areas). For islands, z is typically ~0.3. If island area = 1/10 continental area: S_island/S_continent = (A_island/A_continent)^z = (1/10)^0.3 = 10^(-0.3) = 0.501. So the island would be expected to have approximately 50% of the species found on the continent. This is the basis for designing reserve networks - a single large reserve (SLA) holds more species than several small reserves (SLOSS debate) because species richness scales with area." }
    ],
    'conservation-biology': [
      { problem: "Evaluate the effectiveness of in-situ vs ex-situ conservation for the Bengal tiger in Nepal.", solution: "In-situ conservation (primary strategy): Nepal has increased tiger population from 121 (2009) to 355 (2022) through: (1) 3 national parks (Chitwan, Bardia, Shuklaphanta) and 5 protected areas providing ~26,000 km2 of habitat. (2) Community-based anti-poaching patrols reducing poaching by 80%. (3) Prey base restoration (spotted deer, wild boar increased 3x). (4) Corridor protection (Mid-Amazon, Churia-Hill corridors). Advantages: Maintains natural behaviors, evolutionary processes, and ecosystem integrity. Disadvantages: Vulnerable to habitat fragmentation, human-wildlife conflict, requires large areas. Ex-situ conservation (supplementary): (1) Chitwan Breeding Center (rhino, not tiger). (2) No tiger captivity program in Nepal - all tigers are wild. (3) International zoo partnerships for genetic banking. Conclusion: In-situ conservation has been highly effective for tigers in Nepal. Ex-situ is not applicable for tigers but is crucial for critically endangered species like the red panda." },
      { problem: "Design a conservation corridor plan connecting two fragmented tiger habitats in the Terai.", solution: "Scenario: Habitat A (10,000 ha, 50 tigers) and Habitat B (8,000 ha, 30 tigers) separated by 15 km of agricultural land. Corridor plan: (1) Width: Minimum 2 km wide (3 km preferred) to allow tiger movement and reduce edge effects. (2) Length: 15 km connecting the two habitats. (3) Area: 30-45 km2 of corridor needed. (4) Habitat restoration: Plant native vegetation corridors (sal, teak, bamboo) along river buffers. (5) Wildlife crossings: Build 3 underpasses and 2 overpasses at road/railway intersections. (6) Community engagement: Establish buffer zones with sustainable agriculture (tiger-safe crops: mustard, chili). (7) Anti-poaching: Deploy camera traps and patrol teams in corridor. (8) Monitoring: Genetic sampling to confirm corridor usage. (9) Cost estimate: $500,000-1,000,000 for establishment; $50,000/year for management. Expected outcome: Connects 80 tigers into a meta-population, reducing inbreeding and increasing resilience." }
    ],
    'introduction-to-biology-scope-and-fields-of-biology': [
      { problem: "Draw and label a diagram showing the hierarchy of life organization from atom to biosphere.", solution: "Hierarchy (smallest to largest): 1. Atom (e.g., Carbon atom) 2. Molecule (e.g., Glucose C6H12O6) 3. Organelle (e.g., Chloroplast - membrane-bound structure) 4. Cell (e.g., Palisade mesophyll cell - basic unit of life) 5. Tissue (e.g., Xylem tissue - group of similar cells) 6. Organ (e.g., Leaf - structure performing photosynthesis) 7. Organ system (e.g., Photosynthetic system - leaves + stems) 8. Organism (e.g., Maple tree - individual living thing) 9. Population (e.g., All maple trees in a forest - same species, same area) 10. Community (e.g., All organisms in the forest - multiple populations) 11. Ecosystem (e.g., Forest + soil + water + air - biotic + abiotic) 12. Biosphere (e.g., All ecosystems on Earth - zone of life)" },
      { problem: "Explain how the scope of biology has expanded with advances in technology.", solution: "Technology has dramatically expanded biological scope: (1) Microscopy: Light microscopy (1000x magnification) revealed cells; electron microscopy (1,000,000x) revealed organelles and macromolecules; super-resolution microscopy (2014 Nobel) broke the diffraction limit. (2) Molecular biology: PCR (1983) amplified DNA; DNA sequencing (Sanger 1977, next-gen 2000s) enabled genomics; CRISPR (2012) enabled gene editing. (3) Bioinformatics: Database storage (GenBank: 200 billion bases, 2024); BLAST algorithm for sequence comparison; structural bioinformatics for protein folding prediction (AlphaFold, 2021). (4) Imaging: MRI, PET scans for in vivo imaging; confocal microscopy for 3D cellular imaging. (5) Omics technologies: Genomics, proteomics, metabolomics, transcriptomics provide systems-level understanding. Each technological advance has opened new sub-disciplines and deepened our understanding of life." }
    ],
    'relation-of-biology-with-other-sciences': [
      { problem: "Explain how physics principles apply to biological systems with three specific examples.", solution: "Example 1: Fluid dynamics in circulation. Poiseuille law: Flow rate Q = (πPr^4)/(8ηl), where P = pressure difference, r = radius, η = viscosity, l = length. This explains why small changes in blood vessel radius (vasoconstriction/vasodilation) dramatically affect blood flow (r^4 dependence). Example 2: Optics in vision. The eye acts as a converging lens system. Lens equation: 1/f = 1/v + 1/u, where f = focal length, v = image distance, u = object distance. Accommodation changes lens curvature to focus on near/far objects. Example 3: Biomechanics of locomotion. Newton second law (F = ma) governs muscle movement. Force generated by muscle = tension x cross-sectional area. Power = force x velocity. Efficiency of human locomotion is ~25% (mechanical work / metabolic energy)." },
      { problem: "Describe the role of bioinformatics in modern biology with specific applications.", solution: "Bioinformatics combines biology, computer science, and statistics to analyze biological data. Applications: (1) Sequence analysis: BLAST searches identify homologous genes across species; multiple sequence alignments reveal conserved domains; phylogenetic trees reconstruct evolutionary relationships. (2) Genomics: Human Genome Project (2003) sequenced 3 billion base pairs; comparative genomics identifies species-specific genes. (3) Structural bioinformatics: Protein folding prediction (AlphaFold achieved 92% accuracy in CASP14, 2020); drug design based on 3D protein structures. (4) Transcriptomics: RNA-Seq quantifies gene expression; identifies differentially expressed genes in disease vs healthy tissue. (5) Metagenomics: Sequences DNA from environmental samples to identify microbial communities without culturing. (6) Systems biology: Networks of gene interactions, metabolic pathways, and signaling cascades modeled computationally. Impact: Enabled personalized medicine, rapid pathogen identification (SARS-CoV-2 genome sequenced in January 2020), and accelerated drug discovery." }
    ]
  };
  return exercises[slug] || [
    { problem: "Define and explain the importance of the topic.", solution: "Provide a clear definition and explain why it matters in biological sciences." },
    { problem: "Give three examples of the concept discussed.", solution: "Example 1: ... Example 2: ... Example 3: ..." },
    { problem: "Compare and contrast two related concepts.", solution: "Similarities: ... Differences: ..." }
  ];
}

// Main execution
function processDirectory(dir) {
  const files = fs.readdirSync(dir, { recursive: true });
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const fullPath = path.join(dir, file);
    try {
      if (enhanceFile(fullPath)) {
        updated++;
        console.log('Updated:', file);
      } else {
        skipped++;
      }
    } catch(e) {
      errors++;
      console.error('Error processing', file, ':', e.message);
    }
  }

  console.log('\n=== Summary ===');
  console.log('Updated:', updated);
  console.log('Skipped:', skipped);
  console.log('Errors:', errors);
}

processDirectory(BIOLOGY_DIR);

import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Biology high-yield bank — Grade 11 units other than cell biology, which the
 * original curated bank already covers.
 *
 * Every entry lists the `unitSlugs` it serves (ids from
 * `frontend/lib/syllabus.ts`); unit-aware callers resolve only through that
 * list.
 */
export const HIGH_YIELD_TOPIC_BANK_BIOLOGY: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Introduction to Biology
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "introduction-to-biology",
      "taxonomy",
      "binomial-nomenclature",
      "classification",
      "five-kingdom",
      "branches",
      "scope-of-biology",
    ],
    subject: "biology",
    title: "Introduction to Biology — Taxonomy, Nomenclature & Scope",
    unitSlugs: ["introduction-to-biology"],
    category: "Foundations of Biology",
    governingLaws: [
      {
        name: "Taxonomic Hierarchy",
        statement:
          "Living organisms are classified into a series of ranking categories, from the broadest to the narrowest, in which the number of shared characters increases downwards.",
        formula:
          "Kingdom \\rightarrow Phylum/Division \\rightarrow Class \\rightarrow Order \\rightarrow Family \\rightarrow Genus \\rightarrow Species",
        conditions:
          "As the rank narrows the number of individuals decreases while the number of shared characters increases. Species is the smallest and most fundamental taxon.",
      },
      {
        name: "Rules of Binomial Nomenclature",
        statement:
          "Every organism is given a two-part Latin name: the first is the genus, written with a capital letter, and the second is the species, written in small letters.",
        formula: "Mangifera\\ indica,\\quad Homo\\ sapiens,\\quad Rana\\ tigrina",
        conditions:
          "Both words are printed in italics or underlined separately when handwritten. The author's name may follow the species name.",
      },
      {
        name: "Five Kingdom Classification (Whittaker, 1969)",
        statement:
          "Organisms are divided into Monera, Protista, Fungi, Plantae and Animalia on the basis of cell structure, mode of nutrition, body organisation and phylogenetic relationships.",
        formula:
          "Monera \\to Protista \\to Fungi \\to Plantae \\to Animalia",
        conditions:
          "Viruses are NOT placed in any of the five kingdoms because they are acellular and are obligate intracellular parasites.",
      },
    ],
    speedFormulas: [
      {
        name: "Writing a Scientific Name",
        formula: "Genus\\ (capital) + specific\\ epithet\\ (small),\\ italicised",
        description:
          "The genus may be abbreviated after first use — Mangifera indica becomes M. indica. Wrong capitalisation and non-italic printing are the usual lost marks.",
        unit: "—",
      },
      {
        name: "Modern Three Domain System",
        formula: "Bacteria,\\ Archaea,\\ Eukarya",
        description:
          "Carl Woese split the kingdom Monera into Bacteria and Archaea on the basis of ribosomal RNA sequences, giving three domains above the kingdom level.",
        unit: "—",
      },
      {
        name: "Key Branches of Biology",
        formula:
          "Morphology, anatomy, physiology, taxonomy, genetics, ecology, palaeontology",
        description:
          "Morphology studies external form, anatomy internal structure, physiology functions, taxonomy classification, and palaeontology fossils.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "1969", name: "Year Whittaker proposed the five kingdom system", value: "1969", unit: "year" },
      { symbol: "1753", name: "Year Linnaeus published Species Plantarum", value: "1753", unit: "year" },
      { symbol: "1.7M", name: "Number of species described so far", value: "about 1.7 x 10^6", unit: "species" },
      { symbol: "8.7M", name: "Estimated total number of species on Earth", value: "about 8.7 x 10^6", unit: "species" },
      { symbol: "ICBN", name: "Code governing names of plants", value: "International Code for Botanical Nomenclature", unit: "—" },
      { symbol: "ICZN", name: "Code governing names of animals", value: "International Code of Zoological Nomenclature", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Species is the largest taxonomic category.",
        truth:
          "Species is the SMALLEST and most fundamental taxon. Kingdom is the largest. That is why organisms of the same species share the most characters.",
        examRef: "NEB / CEE — taxonomy",
      },
      {
        trap: "Binomial nomenclature was introduced by Charles Darwin.",
        truth:
          "It was introduced by Carl Linnaeus, in his Species Plantarum of 1753. Darwin's contribution was the theory of natural selection, published in 1859.",
        examRef: "IOE/CEE — nomenclature",
      },
      {
        trap: "Viruses are included in Whittaker's five kingdom classification.",
        truth:
          "They are excluded. Viruses are acellular, have no cellular machinery and are obligate intracellular parasites, so they fit none of the five kingdoms and are placed in a separate group.",
        examRef: "CEE — five kingdom system",
      },
      {
        trap: "Fungi are placed with plants because they have a cell wall.",
        truth:
          "Fungi form their own kingdom. They are HETEROTROPHIC, with chitin in the cell wall rather than cellulose, and they store glycogen rather than starch.",
        examRef: "NEB — classification",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Taxonomy",
        definition:
          "The branch of biology that deals with identification, nomenclature and classification of organisms according to their characteristics and evolutionary relationships.",
        significance:
          "Provides the universal language that lets scientists everywhere refer to the same organism by the same name.",
      },
      {
        term: "Binomial Nomenclature",
        definition:
          "The system of giving every organism a two-word Latin name, consisting of the genus and the specific epithet.",
        significance:
          "Introduced by Linnaeus, it removes the ambiguity of regional common names — the same bird may have a dozen local names but only one scientific name.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Floral Diversity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "floral-diversity",
      "algae",
      "fungi",
      "bryophyta",
      "pteridophyta",
      "gymnosperm",
      "angiosperm",
      "alternation-of-generation",
      "heterospory",
    ],
    subject: "biology",
    title: "Floral Diversity — Algae to Angiosperms & Alternation of Generations",
    unitSlugs: ["floral-diversity"],
    category: "Plant Diversity",
    governingLaws: [
      {
        name: "Alternation of Generations",
        statement:
          "The life cycle of a plant alternates between a haploid gametophyte generation that produces gametes and a diploid sporophyte generation that produces spores by meiosis.",
        formula:
          "2N\\ \\text{sporophyte} \\xrightarrow{meiosis} N\\ \\text{spores} \\rightarrow N\\ \\text{gametophyte} \\xrightarrow{mitosis} \\text{gametes} \\rightarrow 2N\\ \\text{zygote}",
        conditions:
          "Which generation dominates changes along the evolutionary series: gametophyte dominant in bryophytes, both equal in pteridophytes, and sporophyte dominant in gymnosperms and angiosperms.",
      },
      {
        name: "Progressive Evolutionary Trend in Plants",
        statement:
          "The plant kingdom shows a progressive reduction of the gametophyte, increasing dominance of the sporophyte, and increasing complexity of the vascular and reproductive systems.",
        formula:
          "Algae \\to Bryophytes \\to Pteridophytes \\to Gymnosperms \\to Angiosperms",
        conditions:
          "In angiosperms the female gametophyte is reduced to a seven-celled, eight-nucleate embryo sac and the male to a three-celled pollen grain.",
      },
    ],
    speedFormulas: [
      {
        name: "Classification of Algae by Pigment",
        formula:
          "Chlorophyceae \\ (\\text{green, chlorophyll a + b}), \\ Phaeophyceae\\ (\\text{brown, fucoxanthin}), \\ Rhodophyceae\\ (\\text{red, phycoerythrin})",
        description:
          "Brown algae store laminarin and mannitol, red algae store floridean starch, and green algae store true starch. Algae are always aquatic and autotrophic.",
        unit: "—",
      },
      {
        name: "Reproduction in Algae and Fungi",
        formula:
          "Vegetative, \\ asexual\\ (zoospores, aplanospores), \\ sexual\\ (isogamous, anisogamous, oogamous)",
        description:
          "Fungi reproduce asexually by conidia, sporangiospores or zoospores and sexually by ascospores, basidiospores or zygospores.",
        unit: "—",
      },
      {
        name: "Key Bryophyte and Pteridophyte Features",
        formula:
          "Bryophytes: no\\ vascular\\ tissue,\\ gametophyte\\ dominant; \\ Pteridophytes: vascular,\\ sporophyte\\ dominant",
        description:
          "Bryophytes need water for fertilisation and are called the amphibians of the plant kingdom. Pteridophytes are the first true vascular plants, with a dominant sporophyte and independent gametophyte (prothallus).",
        unit: "—",
      },
      {
        name: "Heterospory and Seed Habit",
        formula:
          "Heterospory \\to \\text{microspores} + \\text{megaspores} \\to \\text{seed habit}",
        description:
          "Heterospory — producing two kinds of spores — arose in pteridophytes such as Selaginella and Salvinia and is the precursor of the seed habit of gymnosperms.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "Riccia,\\ Marchantia", name: "Common liverworts (bryophytes)", value: "hepaticopsida", unit: "—" },
      { symbol: "Funaria", name: "Common moss (bryophyte)", value: "bryopsida", unit: "—" },
      { symbol: "Selaginella", name: "Heterosporous pteridophyte", value: "heterospory", unit: "—" },
      { symbol: "Cycas,\\ Pinus", name: "Common gymnosperms of Nepal", value: "gymnospermae", unit: "—" },
      { symbol: "Rhododendron", name: "National flower of Nepal — an angiosperm", value: "Lali Gurans", unit: "—" },
      { symbol: "2N/N", name: "Sporophyte/gametophyte ploidy", value: "sporophyte 2N, gametophyte N", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Bryophytes are vascular plants because water and minerals move through them.",
        truth:
          "Bryophytes have NO vascular tissue — no xylem and no phloem. Water moves by diffusion and capillary action, which is why they stay small and need damp habitats.",
        examRef: "NEB / CEE — plant diversity",
      },
      {
        trap: "In angiosperms the dominant generation is the gametophyte.",
        truth:
          "The SPOROPHYTE is dominant in pteridophytes, gymnosperms and angiosperms. The gametophyte is progressively reduced and is only barely visible in angiosperms.",
        examRef: "IOE — alternation of generations",
      },
      {
        trap: "Gymnosperms bear seeds enclosed inside a fruit.",
        truth:
          "Gymnosperm seeds are NAKED, borne on the surface of megasporophylls rather than enclosed in an ovary or fruit. Enclosed seeds are the defining feature of angiosperms.",
        examRef: "CEE — gymnosperms",
      },
      {
        trap: "Algae and fungi are both placed in the plant kingdom because both are green.",
        truth:
          "Both were once treated as plants, but fungi are now a separate kingdom. Algae are autotrophic with chlorophyll; fungi are heterotrophic and have no chlorophyll at all.",
        examRef: "NEB — classification of plants",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Alternation of Generations",
        definition:
          "The phenomenon in which the haploid gametophytic and diploid sporophytic generations alternate in the life cycle of a plant.",
        significance:
          "Determines which generation is visible and dominant in each plant group, and is the backbone of plant diversity questions.",
      },
      {
        term: "Heterospory",
        definition:
          "The production of two different kinds of spores — microspores and megaspores — by the same plant.",
        significance:
          "It is the evolutionary precursor of the seed habit: the retention of the megaspore inside the parent plant eventually gave rise to the ovule and the seed.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Introductory Microbiology
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "introductory-microbiology",
      "bacteria",
      "virus",
      "koch-postulates",
      "sterilisation",
      "autoclave",
      "gram-stain",
      "biofertiliser",
    ],
    subject: "biology",
    title: "Introductory Microbiology — Bacteria, Viruses & Sterilisation",
    unitSlugs: ["introductory-microbiology"],
    category: "Microbiology",
    governingLaws: [
      {
        name: "Koch's Postulates",
        statement:
          "A specific microorganism causes a specific disease if it is found in all cases of the disease, can be isolated and grown in pure culture, produces the same disease when inoculated into a healthy host, and can be recovered again from the experimental host.",
        formula:
          "\\text{pathogen in all cases} \\to \\text{pure culture} \\to \\text{reproduces disease} \\to \\text{re-isolated}",
        conditions:
          "Devised for anthrax and tuberculosis. The postulates fail for pathogens that cannot be cultured, and for asymptomatic carriers.",
      },
      {
        name: "Bacterial Growth Curve",
        statement:
          "A bacterial population in a closed culture passes through four phases: lag, log (exponential), stationary and death.",
        formula: "N = N_0 \\times 2^{n}, \\quad n = \\frac{t}{\\text{generation time}}",
        conditions:
          "In the log phase growth is exponential and generation time is minimal; in the stationary phase the division rate equals the death rate because nutrients run out and toxic products accumulate.",
      },
    ],
    speedFormulas: [
      {
        name: "Bacterial Population Growth",
        formula: "N = N_0\\,2^{t/g}",
        description:
          "For a 2-hour period with a 20-minute generation time, n = 120/20 = 6, so one cell becomes 2^6 = 64 cells.",
        unit: "cells",
      },
      {
        name: "Sterilisation Conditions",
        formula: "Autoclave: 121^\\circ C,\\ 15\\ psi,\\ 15\\ minutes",
        description:
          "Wet heat under pressure kills spores that ordinary boiling cannot. Dry heat uses 160 degrees C for 2 hours, and UV radiation sterilises surfaces but penetrates poorly.",
        unit: "—",
      },
      {
        name: "Classification by Gram Staining",
        formula:
          "Gram-positive: thick\\ peptidoglycan,\\ retains\\ crystal\\ violet; \\ Gram-negative: thin\\ layer,\\ stains\\ pink",
        description:
          "Gram-positive bacteria appear purple because the thick peptidoglycan layer retains the crystal violet–iodine complex; Gram-negative bacteria appear pink after counterstaining.",
        unit: "—",
      },
      {
        name: "Nitrogen Fixation and Biofertilisers",
        formula:
          "Rhizobium\\ (symbiotic), \\ Azotobacter\\ (free\\ living), \\ Nostoc\\ and\\ Anabaena\\ (cyanobacteria)",
        description:
          "Rhizobium lives in root nodules of legumes and fixes atmospheric nitrogen; Azotobacter is free living in soil; Nostoc and Anabaena are used in paddy fields.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "g(E.\\ coli)", name: "Generation time of E. coli", value: "about 20", unit: "min" },
      { symbol: "121^\\circ C", name: "Autoclave sterilisation temperature", value: "121", unit: "deg C" },
      { symbol: "15\\ psi", name: "Autoclave pressure", value: "15", unit: "psi" },
      { symbol: "TMV", name: "First virus crystallised", value: "Tobacco Mosaic Virus", unit: "—" },
      { symbol: "70S", name: "Ribosome type in bacteria", value: "70S", unit: "—" },
      { symbol: "80S", name: "Ribosome type in eukaryotes", value: "80S", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Viruses are living organisms because they can reproduce.",
        truth:
          "Viruses are best described as obligate intracellular parasites that are inert outside a host. They have no metabolism, no ribosomes and no independent reproduction — they use the host's machinery.",
        examRef: "NEB / CEE — microbiology",
      },
      {
        trap: "Bacteria have a true nucleus and membrane-bound organelles.",
        truth:
          "Bacteria are PROKARYOTES: they have no true nucleus and no membrane-bound organelles. Their genetic material is a single circular DNA molecule in the nucleoid, and their ribosomes are 70S.",
        examRef: "IOE — bacteria",
      },
      {
        trap: "All bacteria are harmful to humans.",
        truth:
          "The great majority are harmless or beneficial. Lactobacillus makes curd, Rhizobium fixes nitrogen, and gut flora synthesise vitamins. Only a small fraction are pathogens.",
        examRef: "CEE — microbiology",
      },
      {
        trap: "Boiling is enough to sterilise laboratory equipment.",
        truth:
          "Boiling kills vegetative cells but not bacterial ENDOSPORES. An autoclave at 121 degrees C and 15 psi for 15 minutes is required, which raises the temperature above boiling.",
        examRef: "IOE — sterilisation",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A single bacterial cell divides every 20 minutes. How many cells will be present after 2 hours?",
        given: "N_0 = 1, \\quad g = 20\\ min, \\quad t = 120\\ min",
        steps: [
          "Number of generations: n = \\frac{t}{g} = \\frac{120}{20} = 6",
          "Population: N = N_0 \\times 2^n = 1 \\times 2^6",
          "2^6 = 64",
        ],
        answer: "N = 64 \\text{ cells}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Koch's Postulates",
        definition:
          "A set of four criteria that must be satisfied to prove that a specific microorganism causes a specific disease.",
        significance:
          "It established the germ theory of disease and gave microbiology its standard experimental method, still used today with modern exceptions noted.",
      },
      {
        term: "Autoclave",
        definition:
          "An instrument that sterilises materials using steam under pressure at 121 degrees C and 15 psi for 15 minutes, killing both vegetative cells and endospores.",
        significance:
          "The standard sterilisation method in every hospital and laboratory, because moist heat under pressure penetrates and denatures proteins, including in spores.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Ecology
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "ecology",
      "ecosystem",
      "food-chain",
      "energy-flow",
      "ten-percent-law",
      "ecological-pyramid",
      "productivity",
      "biogeochemical",
    ],
    subject: "biology",
    title: "Ecology — Energy Flow, Food Chains & Ecological Pyramids",
    unitSlugs: ["ecology"],
    category: "Ecology",
    governingLaws: [
      {
        name: "Lindeman's Ten Per Cent Law",
        statement:
          "Only about ten per cent of the energy available at one trophic level is transferred to the next trophic level; the rest is lost mainly as heat in respiration.",
        formula: "E_{n+1} = 0.1 \\times E_n",
        conditions:
          "Proposed by Lindeman in 1942. Energy transfer efficiency varies between about 5 and 20 per cent in different ecosystems, and the low efficiency is why food chains are short.",
      },
      {
        name: "Unidirectional Flow of Energy",
        statement:
          "Energy flows through an ecosystem in one direction only, from the sun through producers to consumers, and is ultimately lost as heat.",
        formula:
          "Solar \\to Producers \\to Herbivores \\to Carnivores \\to Heat",
        conditions:
          "Energy flow is one way and non-cyclical, unlike nutrients which are cycled. This is why an ecosystem needs a continuous energy input.",
      },
    ],
    speedFormulas: [
      {
        name: "Productivity Terms",
        formula: "GPP = NPP + R, \\quad NPP = GPP - \\text{respiration losses}",
        description:
          "Gross primary productivity is the total organic matter produced by photosynthesis. Net primary productivity is what remains after the producers respire, and it is what consumers can use.",
        unit: "kcal m^-2 yr^-1",
      },
      {
        name: "Trophic Levels and Ecological Pyramids",
        formula: "Pyramid of number, biomass and energy",
        description:
          "The pyramid of ENERGY is always upright, because energy is lost at each transfer. Pyramids of number and biomass can be inverted — a single tree supports many insects and herbivores.",
        unit: "—",
      },
      {
        name: "Source and Sink in a Food Chain",
        formula: "Producers \\to Primary\\ consumers \\to Secondary\\ consumers \\to Tertiary\\ consumers",
        description:
          "Herbivores are primary consumers, first-order carnivores secondary, and so on. Omnivores feed at several trophic levels and break the neat chain structure.",
        unit: "—",
      },
      {
        name: "Ecological Efficiency",
        formula: "\\text{Efficiency} = \\frac{\\text{energy at level } n+1}{\\text{energy at level } n} \\times 100",
        description:
          "Typically 10 per cent. Predicting the energy at higher levels is a standard numerical, and the short food chain answer explains why humans eating grain is more efficient than eating beef.",
        unit: "%",
      },
    ],
    constantsAndValues: [
      { symbol: "10\\%", name: "Lindeman's energy transfer efficiency", value: "10", unit: "%" },
      { symbol: "1\\ kcal", name: "One kilocalorie in joules", value: "4.184", unit: "kJ" },
      { symbol: "1942", name: "Year Lindeman published the ten per cent law", value: "1942", unit: "year" },
      { symbol: "4 - 5", name: "Typical number of trophic levels in a food chain", value: "4 to 5", unit: "levels" },
      { symbol: "1\\%", name: "Fraction of incident solar energy captured by producers", value: "about 1", unit: "%" },
    ],
    entranceTraps: [
      {
        trap: "Energy flow in an ecosystem is cyclic, like the flow of nutrients.",
        truth:
          "Energy flow is UNIDIRECTIONAL and cannot be recycled — it is degraded to heat at every step. Nutrients, by contrast, are cycled through biogeochemical cycles.",
        examRef: "NEB / CEE — ecosystem",
      },
      {
        trap: "The pyramid of number is always upright.",
        truth:
          "It can be INVERTED. In a tree ecosystem a single tree supports thousands of insects, giving an inverted pyramid of numbers, and the biomass pyramid is similarly inverted in an ocean.",
        examRef: "IOE — ecological pyramids",
      },
      {
        trap: "The ten per cent law applies to the transfer of nutrients and biomass.",
        truth:
          "It applies specifically to ENERGY transfer between trophic levels. Biomass and nutrient transfer follow their own separate and different efficiencies.",
        examRef: "CEE — energy flow",
      },
      {
        trap: "Decomposers do not belong to any trophic level.",
        truth:
          "Decomposers form their own trophic level and are essential: they break down dead organic matter and return nutrients to the soil, closing the nutrient cycle without which the ecosystem would collapse.",
        examRef: "CEE — ecosystem components",
      },
    ],
    workedNumericals: [
      {
        problem:
          "If the producers in a grassland ecosystem capture 10,000 kJ of energy, how much energy reaches the tertiary consumer?",
        given: "E_{producers} = 10{,}000\\ kJ, \\quad \\text{efficiency} = 10\\% \\text{ per transfer}",
        steps: [
          "Primary consumer: 10{,}000 \\times 0.1 = 1{,}000\\ kJ",
          "Secondary consumer: 1{,}000 \\times 0.1 = 100\\ kJ",
          "Tertiary consumer: 100 \\times 0.1 = 10\\ kJ",
          "Equivalently 10{,}000 \\times (0.1)^3 = 10\\ kJ",
        ],
        answer: "E_{tertiary} = 10\\ kJ",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Lindeman's Ten Per Cent Law",
        definition:
          "The observation that only about ten per cent of the energy available at one trophic level is transferred to the next, the remainder being lost mainly as heat.",
        significance:
          "It explains why food chains rarely exceed four or five trophic levels, and why a vegetarian diet can support more people from the same land area.",
      },
      {
        term: "Net Primary Productivity",
        definition:
          "The organic matter produced by producers that remains after they have used part of it in respiration, and is therefore available to consumers.",
        significance:
          "The actual energy input of an ecosystem; the world's net primary productivity sets the ceiling on how much life the planet can support.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Vegetation
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "vegetation",
      "forest-types",
      "phytogeography",
      "timberline",
      "altitudinal-zonation",
      "nepal-forest",
    ],
    subject: "biology",
    title: "Vegetation — Forest Types, Altitudinal Zonation & Phytogeography",
    unitSlugs: ["vegetation"],
    category: "Ecology & Environment",
    governingLaws: [
      {
        name: "Altitudinal Zonation of Vegetation",
        statement:
          "Vegetation type changes with altitude in the same way that it changes with latitude, because temperature falls with height at roughly 6.5 degrees C per kilometre.",
        formula:
          "Tropical (<1000\\ m) \\to Subtropical (1000\\text{-}2000\\ m) \\to Temperate (2000\\text{-}3000\\ m) \\to Alpine (3000\\text{-}4200\\ m) \\to Snow (>4200\\ m)",
        conditions:
          "Timberline, the upper limit of tree growth, lies near 4000 m in the Nepal Himalaya; above it only alpine shrubs, herbs and grasses survive.",
      },
      {
        name: "Phytogeographic Regions of Nepal",
        statement:
          "Nepal is divided physiographically from south to north into the Terai, the Chure (Siwalik), the Middle Hills, the High Mountains and the High Himalaya, each with characteristic vegetation.",
        formula:
          "Terai \\to Siwalik \\to Middle\\ Hills \\to High\\ Mountains \\to High\\ Himalaya",
        conditions:
          "Sal (Shorea robusta) dominates the Terai and inner Terai; chir pine and alder dominate the middle hills; oak, rhododendron and fir appear in the temperate belt.",
      },
    ],
    speedFormulas: [
      {
        name: "Characteristic Trees by Belt",
        formula:
          "Terai: Shorea\\ robusta\\ (Sal), \\ Dalbergia\\ sissoo\\ (Sisau); \\ Hills: Pinus\\ roxburghii\\ (Chir), \\ Alnus\\ nepalensis\\ (Utis)",
        description:
          "Temperate belt adds oak (Quercus), rhododendron and walnut; alpine belt has juniper and dwarf rhododendron above the timberline.",
        unit: "—",
      },
      {
        name: "Altitude to Vegetation Conversion",
        formula: "\\text{temp drop} \\approx 6.5^\\circ C\\ per\\ 1000\\ m",
        description:
          "This lapse rate is why Pokhara at 800 m is subtropical while Jomsom at 2700 m, at the same latitude, is temperate and dry.",
        unit: "deg C per km",
      },
      {
        name: "Forest Area of Nepal",
        formula: "\\text{Forest} + \\text{other wooded land} \\approx 45\\% \\text{ of total land area}",
        description:
          "Nepal's forest cover is high by South Asian standards, and community forestry is widely credited with halting and reversing deforestation in the middle hills.",
        unit: "%",
      },
    ],
    constantsAndValues: [
      { symbol: "45\\%", name: "Approximate forest cover of Nepal", value: "about 45", unit: "% of land" },
      { symbol: "4000\\ m", name: "Approximate timberline in the Nepal Himalaya", value: "4000", unit: "m" },
      { symbol: "6.5", name: "Atmospheric lapse rate", value: "6.5", unit: "deg C km^-1" },
      { symbol: "Rhododendron\\ arboreum", name: "National flower of Nepal (Lali Gurans)", value: "angiosperm", unit: "—" },
      { symbol: "8848\\ m", name: "Height of Mount Everest, the highest point", value: "8848.86", unit: "m" },
    ],
    entranceTraps: [
      {
        trap: "Timberline and snowline are the same thing.",
        truth:
          "The timberline at about 4000 m is the upper limit of TREE growth. The snowline, above 5000 m, is the lower limit of permanent snow. Alpine grassland lies between them.",
        examRef: "NEB / CEE — vegetation of Nepal",
      },
      {
        trap: "Rhododendron, the national flower of Nepal, is a gymnosperm.",
        truth:
          "Rhododendron arboreum is an ANGIOSPERM (a dicot), bearing true flowers and enclosed seeds. Gymnosperms such as pine and fir produce cones instead.",
        examRef: "CEE — vegetation",
      },
      {
        trap: "Sal forest occurs in the alpine zone of Nepal.",
        truth:
          "Shorea robusta (Sal) is a TROPICAL tree of the Terai and inner Terai below about 1000 m. The alpine zone has no tall trees at all and only shrubs, herbs and grasses.",
        examRef: "NEB — forest types",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Timberline",
        definition:
          "The altitude above which trees cannot grow, because the growing season is too short and the temperature too low for woody tissue to develop.",
        significance:
          "Near 4000 m in Nepal; it marks the transition from temperate forest to alpine grassland and scrubs.",
      },
      {
        term: "Phytogeography",
        definition:
          "The branch of biogeography that studies the geographic distribution of plant species and the factors that determine it.",
        significance:
          "Explains why Nepal, spanning only 885 km from north to south, contains vegetation from tropical Sal forest to alpine juniper — one of the steepest ecological gradients on Earth.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Evolutionary Biology
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "evolutionary-biology",
      "natural-selection",
      "darwin",
      "lamarck",
      "hardy-weinberg",
      "homology",
      "analogy",
      "human-evolution",
      "fossil",
    ],
    subject: "biology",
    title: "Evolutionary Biology — Natural Selection, Evidences & Hardy–Weinberg",
    unitSlugs: ["evolutionary-biology"],
    category: "Evolution",
    governingLaws: [
      {
        name: "Darwin's Theory of Natural Selection",
        statement:
          "Individuals within a population vary; more offspring are produced than can survive; those with variations better suited to the environment survive and reproduce more; over generations the favourable variations accumulate.",
        formula:
          "Variation + Heredity + Differential\\ survival = Evolution\\ by\\ natural\\ selection",
        conditions:
          "Requires heritable variation and competition for limited resources. Darwin could not explain the origin of variation, which was supplied later by mutation and Mendelian genetics.",
      },
      {
        name: "Hardy–Weinberg Principle",
        statement:
          "In a large, randomly mating population with no mutation, migration or selection, the allele frequencies remain constant from generation to generation.",
        formula: "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        conditions:
          "The five assumptions must hold: large population, random mating, no mutation, no migration and no natural selection. Deviation from the equilibrium indicates that evolution is occurring.",
      },
    ],
    speedFormulas: [
      {
        name: "Hardy–Weinberg Genotype Frequencies",
        formula:
          "p^2 = AA, \\quad 2pq = Aa, \\quad q^2 = aa",
        description:
          "If the recessive homozygote frequency is known, take its square root to get q, then p = 1 - q, then 2pq gives the heterozygote frequency. A very common entrance numerical.",
        unit: "—",
      },
      {
        name: "Homologous versus Analogous Organs",
        formula:
          "Homologous: same\\ origin,\\ different\\ function; \\ Analogous: different\\ origin,\\ same\\ function",
        description:
          "The forelimbs of a human, whale, bat and horse are HOMOLOGOUS and indicate divergent evolution from a common ancestor. The wings of a bird and an insect are ANALOGOUS and indicate convergent evolution.",
        unit: "—",
      },
      {
        name: "Evidences for Evolution",
        formula:
          "Palaeontological, \\ morphological, \\ anatomical, \\ embryological, \\ biochemical",
        description:
          "Fossils give direct evidence; homology gives comparative anatomical evidence; similar biochemistry across species gives molecular evidence.",
        unit: "—",
      },
      {
        name: "Human Evolutionary Trend",
        formula:
          "Dryopithecus \\to Ramapithecus \\to Australopithecus \\to Homo\\ habilis \\to H.\\ erectus \\to H.\\ sapiens",
        description:
          "Key trends: increasing cranial capacity (about 450 cc to 1400 cc), bipedal locomotion, opposable thumb, and decreasing body hair.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "1859", name: "Year Darwin published The Origin of Species", value: "1859", unit: "year" },
      { symbol: "1400\\ cc", name: "Average cranial capacity of modern humans", value: "1400", unit: "cm^3" },
      { symbol: "450\\ cc", name: "Cranial capacity of Australopithecus", value: "450 - 600", unit: "cm^3" },
      { symbol: "1809", name: "Year Lamarck published his theory of inheritance of acquired characters", value: "1809", unit: "year" },
      { symbol: "H.\\ sapiens", name: "Approximate age of modern humans", value: "200,000 - 300,000", unit: "years" },
    ],
    entranceTraps: [
      {
        trap: "Acquired characters are inherited by the offspring.",
        truth:
          "This was Lamarck's error. Weismann's experiment of cutting the tails off mice for many generations produced no short-tailed offspring. Only changes in the GERM CELLS, not in body cells, are inherited.",
        examRef: "NEB / CEE — theories of evolution",
      },
      {
        trap: "Analogous organs prove common ancestry.",
        truth:
          "Analogous organs prove CONVERGENT evolution — similar function arising independently, with no common ancestor. It is HOMOLOGOUS organs that indicate a shared ancestor.",
        examRef: "IOE — evidences of evolution",
      },
      {
        trap: "Evolution always produces progress towards more complex forms.",
        truth:
          "Evolution is not directed. It simply reflects adaptation to the current environment; simpler forms such as parasites are highly successful and are the result of evolution too.",
        examRef: "CEE — evolution concepts",
      },
      {
        trap: "Natural selection acts on the genotype, which then changes the phenotype.",
        truth:
          "Selection acts on the PHENOTYPE — the observable trait. It is the resulting differential reproductive success that changes the frequency of the underlying alleles over generations.",
        examRef: "IOE — natural selection",
      },
    ],
    workedNumericals: [
      {
        problem:
          "In a population, 4 per cent of individuals show a recessive disorder (aa). Assuming Hardy–Weinberg equilibrium, find the allele frequencies and the percentage of carriers.",
        given: "q^2 = 0.04, \\quad \\text{population in Hardy-Weinberg equilibrium}",
        steps: [
          "q^2 = 0.04 \\implies q = \\sqrt{0.04} = 0.2",
          "p = 1 - q = 0.8",
          "Heterozygote frequency: 2pq = 2(0.8)(0.2) = 0.32",
          "Homozygous dominant: p^2 = 0.64",
        ],
        answer: "p = 0.8,\\ q = 0.2; \\quad \\text{carriers } (Aa) = 32\\%",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Natural Selection",
        definition:
          "The differential survival and reproduction of individuals in a population because of heritable differences in their traits, leading to a change in allele frequencies over generations.",
        significance:
          "The mechanism of adaptive evolution proposed by Darwin and Wallace, and the reason populations become better adapted to their environments over time.",
      },
      {
        term: "Hardy–Weinberg Equilibrium",
        definition:
          "The state of a large, randomly mating population in which allele and genotype frequencies remain constant because none of the five evolutionary forces is acting.",
        significance:
          "It provides the null model against which real populations are compared: a departure from the predicted frequencies is evidence that evolution is happening.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Biota and Environment
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "biota-and-environment",
      "pollution",
      "greenhouse-effect",
      "ozone-depletion",
      "acid-rain",
      "biomagnification",
      "cfc",
      "eutrophication",
    ],
    subject: "biology",
    title: "Biota and Environment — Pollution, Greenhouse Effect & Ozone",
    unitSlugs: ["biota-and-environment"],
    category: "Environmental Biology",
    governingLaws: [
      {
        name: "Greenhouse Effect",
        statement:
          "Certain atmospheric gases allow incoming short-wave solar radiation to pass but absorb outgoing long-wave infrared radiation, trapping heat and warming the lower atmosphere.",
        formula:
          "CO_2,\\ CH_4,\\ N_2O,\\ H_2O\\ vapour,\\ CFCs \\rightarrow \\text{radiative trapping}",
        conditions:
          "The greenhouse effect is a natural and necessary process — without it the Earth's mean temperature would be about -18 degrees C instead of +15 degrees C. The problem is its ENHANCEMENT by human emissions.",
      },
      {
        name: "Stratospheric Ozone Depletion",
        statement:
          "Chlorine atoms released from chlorofluorocarbons catalytically destroy ozone in the stratosphere, thinning the layer that absorbs harmful ultraviolet-B radiation.",
        formula:
          "CFCl_3 \\xrightarrow{UV} Cl\\cdot; \\quad Cl\\cdot + O_3 \\rightarrow ClO\\cdot + O_2; \\quad ClO\\cdot + O \\rightarrow Cl\\cdot + O_2",
        conditions:
          "A single chlorine atom can destroy thousands of ozone molecules because it is regenerated, making the reaction catalytic. The Montreal Protocol of 1987 phased out CFCs.",
      },
    ],
    speedFormulas: [
      {
        name: "Major Air Pollutants and Their Effects",
        formula:
          "SO_2,\\ NO_x \\rightarrow \\text{acid rain}; \\quad CO \\rightarrow \\text{carboxyhaemoglobin}; \\quad PM_{2.5} \\rightarrow \\text{alveolar damage}",
        description:
          "Acid rain forms when sulphur dioxide and nitrogen oxides dissolve in rain to give sulphuric and nitric acid, lowering the pH below about 5.6.",
        unit: "—",
      },
      {
        name: "Biomagnification",
        formula: "\\text{DDT} / \\text{mercury concentration increases along the food chain}",
        description:
          "Non-biodegradable pollutants accumulate in body tissues and become MORE concentrated at each higher trophic level, reaching their maximum in top carnivores and humans.",
        unit: "—",
      },
      {
        name: "Eutrophication",
        formula:
          "Nutrient\\ excess \\to algal\\ bloom \\to oxygen\\ depletion \\to fish\\ kill",
        description:
          "Run-off of nitrates and phosphates from fertilizers triggers excessive algal growth; when the algae die and decompose, dissolved oxygen collapses and aquatic life dies.",
        unit: "—",
      },
      {
        name: "Key Reference Values",
        formula:
          "CO_2 \\approx 0.04\\%\\ of\\ air; \\quad Ozone\\ layer\\ 15\\text{-}35\\ km; \\quad acid\\ rain\\ pH < 5.6",
        description:
          "Ozone concentration is measured in Dobson units, with the normal column about 300 DU. Pre-industrial CO2 was about 280 ppm, now above 420 ppm.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "CO_2", name: "Current atmospheric carbon dioxide concentration", value: "about 420", unit: "ppm" },
      { symbol: "15 - 35", name: "Altitude of the ozone layer", value: "15 to 35", unit: "km" },
      { symbol: "300", name: "Normal ozone column thickness", value: "300", unit: "Dobson units" },
      { symbol: "5.6", name: "pH below which rain is called acid rain", value: "5.6", unit: "pH" },
      { symbol: "1987", name: "Year of the Montreal Protocol", value: "1987", unit: "year" },
      { symbol: "1.5^\\circ C", name: "Paris Agreement warming target above pre-industrial levels", value: "1.5 - 2.0", unit: "deg C" },
    ],
    entranceTraps: [
      {
        trap: "Ozone in the troposphere protects us from ultraviolet radiation.",
        truth:
          "It is STRATOSPHERIC ozone (15-35 km) that shields us. Tropospheric or ground-level ozone is itself an air pollutant and a component of photochemical smog that damages crops and lungs.",
        examRef: "NEB / CEE — environmental biology",
      },
      {
        trap: "The greenhouse effect is entirely a man-made phenomenon.",
        truth:
          "It is a natural process that keeps the Earth about 33 degrees C warmer than it would otherwise be. Human activity has ENHANCED it by adding greenhouse gases, causing global warming.",
        examRef: "IOE — environment",
      },
      {
        trap: "CFCs are the only substances that destroy stratospheric ozone.",
        truth:
          "Halons, carbon tetrachloride, methyl bromide and nitrogen oxides also destroy ozone. Halons are even more destructive per molecule than CFCs.",
        examRef: "CEE — ozone depletion",
      },
      {
        trap: "Ozone depletion and global warming are the same problem with the same cause.",
        truth:
          "They are separate problems. Ozone depletion is caused mainly by chlorine and bromine compounds; global warming is caused mainly by carbon dioxide, methane and nitrous oxide.",
        examRef: "IOE — environmental issues",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Biomagnification",
        definition:
          "The progressive increase in the concentration of a non-biodegradable pollutant in the tissues of organisms at successively higher trophic levels of a food chain.",
        significance:
          "Explains why DDT and mercury reach harmful concentrations in top carnivores and humans even when released at very low levels into the environment.",
      },
      {
        term: "Dobson Unit",
        definition:
          "The unit used to measure the total amount of ozone in a vertical column of the atmosphere, where one Dobson unit represents a layer 0.01 mm thick at standard temperature and pressure.",
        significance:
          "The normal column is about 300 DU; values below 220 DU indicate an ozone hole, as over Antarctica each spring.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Faunal Diversity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "faunal-diversity",
      "protozoa",
      "earthworm",
      "frog",
      "animal-kingdom",
      "parasitology",
      "coelom",
      "metamerism",
    ],
    subject: "biology",
    title: "Faunal Diversity — Protozoa, Earthworm & Frog",
    unitSlugs: ["faunal-diversity"],
    category: "Animal Diversity",
    governingLaws: [
      {
        name: "Basis of Animal Classification",
        statement:
          "Animals are classified on the basis of levels of organisation, symmetry, germ layers, coelom, segmentation and the presence of a notochord.",
        formula:
          "Cellular \\to Tissue \\to Organ \\to Organ\\ system; \\quad Acoelomate \\to Pseudocoelomate \\to Coelomate",
        conditions:
          "A true coelom is a body cavity lined on BOTH sides by mesoderm. A pseudocoelom, as in Ascaris, is lined by mesoderm on one side only.",
      },
      {
        name: "Nervous and Circulatory Organisation",
        statement:
          "The complexity of the nervous system increases from the nerve net of coelenterates through the nerve cord of annelids to the well-developed brain of vertebrates.",
        formula:
          "Nerve\\ net \\to Ventral\\ nerve\\ cord \\to Dorsal\\ nerve\\ cord\\ (\\text{vertebrates})",
        conditions:
          "In the earthworm there is a ventral nerve cord with a subpharyngeal ganglion, while in the frog the nerve cord is dorsal and protected by the vertebral column.",
      },
    ],
    speedFormulas: [
      {
        name: "Protozoa — Key Features",
        formula:
          "Amoeba\\ (pseudopodia), \\ Paramecium\\ (cilia), \\ Euglena\\ (flagellum), \\ Plasmodium\\ (parasite)",
        description:
          "Protozoa are unicellular eukaryotes with no cell wall, and their locomotory structures are the main basis of their classification. Euglena is exceptional in being mixotrophic — photosynthetic in light and heterotrophic in the dark.",
        unit: "—",
      },
      {
        name: "Earthworm — Diagnostic Features",
        formula:
          "Pheretima\\ posthuma: \\ 100\\text{-}120\\ segments,\\ clitellum,\\ closed\\ circulation",
        description:
          "The earthworm has a true coelom, metameric segmentation, a closed circulatory system with haemoglobin dissolved in the plasma, nephridia for excretion, and setae for locomotion.",
        unit: "—",
      },
      {
        name: "Frog — Diagnostic Features",
        formula:
          "Rana\\ tigrina: \\ amphibian,\\ 3\\text{-}chambered\\ heart,\\ cold\\ blooded",
        description:
          "The frog has a three-chambered heart, a two-circuit circulation and external fertilisation. It hibernates in winter and aestivates in summer, and undergoes metamorphosis from a tadpole.",
        unit: "—",
      },
      {
        name: "Coelom and Segmentation",
        formula:
          "Acoelomate:\\ Platyhelminthes; \\ Pseudocoelomate:\\ Aschelminthes; \\ Coelomate:\\ Annelida\\ onwards",
        description:
          "True metameric segmentation first and most clearly appears in Annelida, which is why the earthworm is the standard type specimen for the study of segmentation.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "Pheretima\\ posthuma", name: "Scientific name of the common earthworm", value: "Annelida", unit: "—" },
      { symbol: "Rana\\ tigrina", name: "Scientific name of the Indian bullfrog", value: "Amphibia", unit: "—" },
      { symbol: "100 - 120", name: "Number of segments in the earthworm", value: "100 to 120", unit: "—" },
      { symbol: "3", name: "Number of chambers in the frog's heart", value: "3", unit: "chambers" },
      { symbol: "70S", name: "Ribosome type in bacteria", value: "70S", unit: "—" },
      { symbol: "6", name: "Number of pairs of nephridia-bearing segments in clitellum region", value: "—", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Euglena is a purely heterotrophic organism.",
        truth:
          "Euglena is MIXOTROPHIC: it photosynthesises in the presence of light using its chloroplasts, but can absorb dissolved organic matter in the dark, losing its chlorophyll under prolonged darkness.",
        examRef: "CEE — protozoa",
      },
      {
        trap: "The earthworm's blood is colourless because it has no respiratory pigment.",
        truth:
          "Earthworm blood contains HAEMOGLOBIN dissolved directly in the plasma — not enclosed in red blood cells — which is why earthworm blood is red.",
        examRef: "NEB / IOE — earthworm",
      },
      {
        trap: "The frog is a reptile because it lives both on land and in water.",
        truth:
          "The frog is an AMPHIBIAN: it has moist, glandular skin without scales, a three-chambered heart, external fertilisation without an amniotic egg, and undergoes metamorphosis — none of which is true of reptiles.",
        examRef: "CEE — faunal diversity",
      },
      {
        trap: "Flatworms have a true coelom.",
        truth:
          "Platyhelminthes are ACOELOMATE, with no body cavity and no mesodermal lining. A true coelom appears first in Annelida, which is why earthworm is used as the type animal for that feature.",
        examRef: "IOE — animal classification",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Metamerism",
        definition:
          "The condition in which the body is divided into a series of similar segments, each containing a repetition of the same organs and structures.",
        significance:
          "First clearly seen in Annelida; it allows regional specialisation of segments and is a major step towards the cephalisation and complexity of higher animals.",
      },
      {
        term: "Coelom",
        definition:
          "A true body cavity lying between the body wall and the gut, and lined completely by mesodermal epithelium.",
        significance:
          "It allows the internal organs to move independently of the body wall, acts as a hydrostatic skeleton, and permits the development of complex organ systems.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BIOLOGY — Conservation Biology
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "conservation-biology",
      "red-data-book",
      "in-situ",
      "ex-situ",
      "biodiversity-hotspot",
      "national-park",
      "wildlife-reserve",
      "endangered",
    ],
    subject: "biology",
    title: "Conservation Biology — Biodiversity Hotspots, In-situ & Ex-situ",
    unitSlugs: ["conservation-biology"],
    category: "Conservation Biology",
    governingLaws: [
      {
        name: "In-situ versus Ex-situ Conservation",
        statement:
          "In-situ conservation protects species in their natural habitat, while ex-situ conservation protects them away from their natural habitat under managed conditions.",
        formula:
          "In\\text{-}situ: \\ national\\ parks,\\ sanctuaries,\\ reserves; \\quad Ex\\text{-}situ: \\ zoos,\\ seed\\ banks,\\ botanical\\ gardens",
        conditions:
          "In-situ is preferred because it preserves the species along with its ecological interactions and evolutionary potential; ex-situ is a last resort for critically endangered species.",
      },
      {
        name: "IUCN Red List Categories",
        statement:
          "Species are classified by their extinction risk into Extinct, Extinct in the Wild, Critically Endangered, Endangered, Vulnerable, Near Threatened and Least Concern.",
        formula:
          "EX > EW > CR > EN > VU > NT > LC",
        conditions:
          "The categories are based on quantitative criteria such as population size, rate of decline and area of occupancy, and are reassessed periodically.",
      },
      {
        name: "Species–Area Relationship",
        statement:
          "The number of species in a region increases with the area surveyed, following a rectangular hyperbola described by a power law.",
        formula: "S = c A^{z}, \\quad \\log S = \\log c + z \\log A",
        conditions:
          "The slope z is normally 0.1 to 0.2 for small areas within a continent but rises to about 0.6 to 1.2 for very large areas such as whole continents.",
      },
    ],
    speedFormulas: [
      {
        name: "Biodiversity Hotspots",
        formula:
          "\\text{Himalaya and Indo-Burma include Nepal; } 36 \\text{ hotspots worldwide}",
        description:
          "Nepal lies within two global biodiversity hotspots: the Himalaya and Indo-Burma. A hotspot needs at least 1500 endemic vascular plant species and must have lost over 70 per cent of its original vegetation.",
        unit: "—",
      },
      {
        name: "Nepal's Protected Areas",
        formula:
          "Chitwan\\ (1973,\\ first\\ national\\ park), \\ Sagarmatha\\ (1976,\\ World\\ Heritage\\ Site)",
        description:
          "Nepal's protected area system includes national parks, wildlife reserves, conservation areas and buffer zones, and covers over a fifth of the country's land area.",
        unit: "—",
      },
      {
        name: "Flagship Species of Nepal",
        formula:
          "Greater\\ one\\text{-}horned\\ rhinoceros,\\ Bengal\\ tiger,\\ snow\\ leopard,\\ red\\ panda,\\ Gangetic\\ dolphin",
        description:
          "Flagship species are used to mobilise public support for conservation. The red panda is the state animal of Sikkim and a Himalayan endemic.",
        unit: "—",
      },
      {
        name: "Threats and Their Causes",
        formula:
          "Habitat\\ loss > overexploitation > invasive\\ species > pollution > climate\\ change",
        description:
          "Habitat destruction and fragmentation are the single largest cause of biodiversity loss worldwide, worsened for Nepal by deforestation, encroachment and infrastructure building.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "36", name: "Number of global biodiversity hotspots", value: "36", unit: "hotspots" },
      { symbol: "2", name: "Number of biodiversity hotspots occurring in Nepal", value: "Himalaya and Indo-Burma", unit: "hotspots" },
      { symbol: "1973", name: "Year Chitwan National Park was established", value: "1973", unit: "year" },
      { symbol: "1976", name: "Year Sagarmatha National Park was established", value: "1976", unit: "year" },
      { symbol: "1979", name: "Year Sagarmatha was listed as a World Heritage Site", value: "1979", unit: "year" },
      { symbol: "z", name: "Slope of the species-area curve for small areas", value: "0.1 - 0.2", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Ex-situ conservation protects a species in its natural habitat.",
        truth:
          "Ex-situ means AWAY from the natural habitat — zoos, botanical gardens, seed banks and gene banks. In-situ conservation, in national parks and reserves, protects the species in its own habitat.",
        examRef: "NEB / CEE — conservation",
      },
      {
        trap: "Nepal has no global biodiversity hotspot.",
        truth:
          "Nepal lies within TWO hotspots: the Himalaya and Indo-Burma, making it one of the most biodiverse countries relative to its area in the world.",
        examRef: "CEE — biodiversity",
      },
      {
        trap: "A species that is vulnerable and one that is critically endangered face the same extinction risk.",
        truth:
          "They are different IUCN categories. Critically Endangered is the highest risk of extinction in the wild, followed by Endangered, then Vulnerable. The categories reflect decreasing extinction risk.",
        examRef: "IOE — IUCN categories",
      },
      {
        trap: "Establishing a national park alone guarantees that a species will survive.",
        truth:
          "Protection must be combined with habitat connectivity, control of poaching and of invasive species, and involvement of local communities. Isolated reserves lose species through inbreeding and edge effects.",
        examRef: "IOE — conservation strategies",
      },
    ],
    workedNumericals: [],
    keyTermsAndDefinitions: [
      {
        term: "Biodiversity Hotspot",
        definition:
          "A biogeographic region with a high level of endemic species that has also lost a large proportion of its original habitat — at least 1500 endemic vascular plants and over 70 per cent habitat loss.",
        significance:
          "Hotspots contain a large share of the world's species in a small share of its land area, so they are the highest priorities for conservation spending.",
      },
      {
        term: "Red Data Book",
        definition:
          "The compendium maintained by the IUCN listing species at risk of extinction along with their conservation status and the threats they face.",
        significance:
          "It is the global reference that gives legal and scientific weight to national protection laws and to international conservation obligations.",
      },
    ],
  },
];

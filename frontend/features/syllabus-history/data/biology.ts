/**
 * NEB Biology Syllabus — extracted from official & third-party sources (2076/2081 BS)
 *
 * Sources:
 *   - https://www.dhanraj.com.np/2020/04/ (Grade 11 & 12 curriculum 2076 PDF)
 *   - https://microbenotes.com/class-11-biology-syllabus-nepal/
 *   - https://esikhcha.com/neb-biology-science-grade-11-and-12-syllabus-based-on-new-curriculum/
 *
 * The esikhcha source explicitly flags 2081 additions:
 *   climate change, biological invasion, biopesticides, GMOs, tissue culture,
 *   human genetics emphasis, microbial contamination in applied biology.
 */

export type SyllabusTopic = {
  slug: string;
  title: string;
  hours?: number;
  /** Set when a topic was added in a specific year vs baseline. */
  addedInYear?: number;
  /** Set when a topic was removed in a specific year vs previous. */
  removedInYear?: number;
  /** Set when a topic's scope/wording changed (modified). */
  modifiedInYear?: number;
};

export type SyllabusUnit = {
  id: string;
  title: string;
  hours: number;
  topics: SyllabusTopic[];
};

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  units: SyllabusUnit[];
  notes?: string;
};

export type GradeLevel = "11" | "12";

export type SubjectBiologyData = {
  grade: GradeLevel;
  subjectCode: string;
  versions: SyllabusVersion[];
};

/**
 * NEB Class 11 Biology (Botany + Zoology) — 2076 baseline vs 2081 revision
 * Total ~132 teaching hours (64 Botany + 64 Zoology + practice hours)
 */
export const BIOLOGY_11_DATA: SubjectBiologyData = {
  grade: "11",
  subjectCode: "Bio. 301",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "First comprehensive NCF 2076 curriculum for Grade 11.",
      units: [
        {
          id: "biomolecules-cell-biology",
          title: "Biomolecules & Cell Biology",
          hours: 15,
          topics: [
            { slug: "biomolecules-intro", title: "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water", hours: 4 },
            { slug: "cell-introduction", title: "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells", hours: 1 },
            { slug: "eukaryotic-cell-detail", title: "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions", hours: 8 },
            { slug: "cell-division", title: "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances", hours: 3 },
          ],
        },
        {
          id: "floral-diversity",
          title: "Floral Diversity",
          hours: 30,
          topics: [
            { slug: "intro-three-domains", title: "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)", hours: 1 },
            { slug: "status-flora-nepal", title: "Status of flora in Nepal and world representation", hours: 1 },
            { slug: "fungi-general", title: "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes", hours: 1 },
            { slug: "mucor-yeast", title: "Structure and reproduction of Mucor and Yeast", hours: 1 },
            { slug: "mushrooms", title: "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi", hours: 1 },
            { slug: "lichen", title: "Lichen: General introduction, characteristic features and economic importance of lichen", hours: 1 },
            { slug: "algae-green-brown-red", title: "Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae", hours: 2 },
            { slug: "bryophyta", title: "Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes", hours: 2 },
            { slug: "pteridophyta", title: "Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes", hours: 2 },
            { slug: "gymnosperm", title: "Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm", hours: 3 },
            { slug: "angiosperm-morphology", title: "Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit", hours: 4 },
            { slug: "taxonomic-study", title: "Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms", hours: 3 },
            { slug: "angiosperm-families", title: "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae", hours: 4 },
          ],
        },
        {
          id: "introductory-microbiology",
          title: "Introductory Microbiology",
          hours: 5,
          topics: [
            { slug: "monera", title: "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)", hours: 3 },
            { slug: "virus", title: "Virus: General introduction, structure and importance of virus, bacteriophage", hours: 1 },
            { slug: "biotech-microbiology", title: "Impacts of biotechnology in the field of microbiology", hours: 1 },
          ],
        },
        {
          id: "ecology",
          title: "Ecology",
          hours: 11,
          topics: [
            { slug: "ecosystem-ecology", title: "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions", hours: 3 },
            { slug: "ecosystem-concept", title: "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem", hours: 2 },
            { slug: "food-chain-web", title: "Food chain, food web, trophic level, ecological pyramids, productivity", hours: 2 },
            { slug: "biogeochemical-cycles", title: "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession", hours: 2 },
            { slug: "ecological-adaptation", title: "Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes", hours: 1 },
            { slug: "ecological-imbalances", title: "Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion", hours: 1 },
          ],
        },
        {
          id: "vegetation",
          title: "Vegetation",
          hours: 3,
          topics: [
            { slug: "vegetation-types", title: "Vegetation: Introduction, types of vegetation in Nepal", hours: 2 },
            { slug: "conservation-in-situ-ex-situ", title: "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation", hours: 1 },
          ],
        },
        {
          id: "introduction-to-biology",
          title: "Introduction to Biology",
          hours: 2,
          topics: [
            { slug: "scope-fields", title: "Introduction to Biology: Scope and fields of biology", hours: 1 },
            { slug: "relation-with-other-sciences", title: "Relation of biology with other sciences", hours: 1 },
          ],
        },
        {
          id: "evolutionary-biology",
          title: "Evolutionary Biology",
          hours: 15,
          topics: [
            { slug: "origin-of-life", title: "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment", hours: 2 },
            { slug: "evidences-evolution", title: "Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical", hours: 5 },
            { slug: "theories-evolution", title: "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism", hours: 3 },
            { slug: "human-evolution", title: "Human evolution: Position of man in animal kingdom", hours: 2 },
            { slug: "monkeys-apes-man", title: "Differences between new world monkeys and old-world monkeys, apes and man", hours: 1 },
            { slug: "modern-man-evolution", title: "Evolution of modern man starting from anthropoid ancestor", hours: 1 },
          ],
        },
        {
          id: "faunal-diversity",
          title: "Faunal Diversity",
          hours: 34,
          topics: [
            { slug: "protista-outline", title: "Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples", hours: 2 },
            { slug: "paramecium-plasmodium", title: "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle; Economic importance of P. falciparum", hours: 2 },
            { slug: "animalia-organization", title: "Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals", hours: 2 },
            { slug: "phyla-diagnostic", title: "Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata", hours: 4 },
            { slug: "earthworm-habitat", title: "Earthworm (Pheretima posthuma): Habit and habitat, external features", hours: 1 },
            { slug: "earthworm-digestive", title: "Earthworm: Digestive system (alimentary canal and physiology of digestion)", hours: 1 },
            { slug: "earthworm-excretory", title: "Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)", hours: 2 },
            { slug: "earthworm-reproductive", title: "Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance", hours: 2 },
            { slug: "frog-habitat", title: "Frog (Rana tigrina): Habit and habitat, external features", hours: 1 },
            { slug: "frog-digestive", title: "Frog: Digestive system (alimentary canal, digestive glands and physiology of digestion)", hours: 1 },
            { slug: "frog-circulatory", title: "Frog: Blood vascular system (structure and working mechanism of heart)", hours: 1 },
            { slug: "frog-respiratory", title: "Frog: Respiratory system (respiratory organs and physiology of respiration)", hours: 1 },
            { slug: "frog-reproductive", title: "Frog: Reproductive system (male and female reproductive organs)", hours: 1 },
          ],
        },
        {
          id: "biota-environment",
          title: "Biota and Environment",
          hours: 10,
          topics: [
            { slug: "animal-adaptation", title: "Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation", hours: 3 },
            { slug: "animal-behavior", title: "Animal behavior: Reflex action, taxes, dominance and leadership. Fish and bird migration", hours: 4 },
            { slug: "environmental-pollution", title: "Environmental pollution: Sources, effects and control measures of air, water and soil pollution. Pesticides and their effects", hours: 3 },
          ],
        },
        {
          id: "conservation-biology",
          title: "Conservation Biology",
          hours: 3,
          topics: [
            { slug: "conservation-concept", title: "Conservation biology: Concept of biodiversity, biodiversity conservation", hours: 1 },
            { slug: "protected-areas", title: "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites", hours: 1 },
            { slug: "wildlife-conservation", title: "Wildlife: Importance, causes of extinction and conservation strategies. IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species. Endangered species in Nepal", hours: 1 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revision aligned with NCF 2076 amendments. Emphasis on climate change, biological invasion, biopesticides, GMOs, tissue culture, and human genetics. Source: esikhcha.com curriculum comparison.",
      units: [
        {
          id: "biomolecules-cell-biology",
          title: "Biomolecules & Cell Biology",
          hours: 15,
          topics: [
            { slug: "biomolecules-intro", title: "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water", hours: 4 },
            { slug: "cell-introduction", title: "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells", hours: 1 },
            { slug: "eukaryotic-cell-detail", title: "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions", hours: 8 },
            { slug: "cell-division", title: "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances", hours: 3 },
          ],
        },
        {
          id: "floral-diversity",
          title: "Floral Diversity",
          hours: 30,
          topics: [
            { slug: "intro-three-domains", title: "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)", hours: 1 },
            { slug: "status-flora-nepal", title: "Status of flora in Nepal and world representation", hours: 1 },
            { slug: "fungi-general", title: "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes", hours: 1 },
            { slug: "mucor-yeast", title: "Structure and reproduction of Mucor and Yeast", hours: 1 },
            { slug: "mushrooms", title: "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi", hours: 1 },
            { slug: "lichen", title: "Lichen: General introduction, characteristic features and economic importance of lichen", hours: 1 },
            { slug: "algae-green-brown-red", title: "Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae", hours: 2 },
            { slug: "bryophyta", title: "Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes", hours: 2 },
            { slug: "pteridophyta", title: "Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes", hours: 2 },
            { slug: "gymnosperm", title: "Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm", hours: 3 },
            { slug: "angiosperm-morphology", title: "Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit", hours: 4 },
            { slug: "taxonomic-study", title: "Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms", hours: 3 },
            { slug: "angiosperm-families", title: "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae", hours: 4 },
          ],
        },
        {
          id: "introductory-microbiology",
          title: "Introductory Microbiology",
          hours: 5,
          topics: [
            { slug: "monera", title: "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)", hours: 3 },
            { slug: "virus", title: "Virus: General introduction, structure and importance of virus, bacteriophage", hours: 1 },
            { slug: "biotech-microbiology", title: "Impacts of biotechnology in the field of microbiology", hours: 1 },
          ],
        },
        {
          id: "ecology",
          title: "Ecology",
          hours: 11,
          topics: [
            { slug: "ecosystem-ecology", title: "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions", hours: 3 },
            { slug: "ecosystem-concept", title: "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem", hours: 2 },
            { slug: "food-chain-web", title: "Food chain, food web, trophic level, ecological pyramids, productivity", hours: 2 },
            { slug: "biogeochemical-cycles", title: "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession", hours: 2 },
            { slug: "ecological-adaptation", title: "Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes", hours: 1 },
            { slug: "ecological-imbalances", title: "Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion", hours: 1, modifiedInYear: 2081 },
          ],
        },
        {
          id: "vegetation",
          title: "Vegetation",
          hours: 3,
          topics: [
            { slug: "vegetation-types", title: "Vegetation: Introduction, types of vegetation in Nepal", hours: 2 },
            { slug: "conservation-in-situ-ex-situ", title: "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation", hours: 1 },
          ],
        },
        {
          id: "introduction-to-biology",
          title: "Introduction to Biology",
          hours: 2,
          topics: [
            { slug: "scope-fields", title: "Introduction to Biology: Scope and fields of biology", hours: 1 },
            { slug: "relation-with-other-sciences", title: "Relation of biology with other sciences", hours: 1 },
          ],
        },
        {
          id: "evolutionary-biology",
          title: "Evolutionary Biology",
          hours: 15,
          topics: [
            { slug: "origin-of-life", title: "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment", hours: 2 },
            { slug: "evidences-evolution", title: "Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical", hours: 5 },
            { slug: "theories-evolution", title: "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism", hours: 3 },
            { slug: "human-evolution", title: "Human evolution: Position of man in animal kingdom", hours: 2 },
            { slug: "monkeys-apes-man", title: "Differences between new world monkeys and old-world monkeys, apes and man", hours: 1 },
            { slug: "modern-man-evolution", title: "Evolution of modern man starting from anthropoid ancestor", hours: 1 },
          ],
        },
        {
          id: "faunal-diversity",
          title: "Faunal Diversity",
          hours: 34,
          topics: [
            { slug: "protista-outline", title: "Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples", hours: 2 },
            { slug: "paramecium-plasmodium", title: "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle; Economic importance of P. falciparum", hours: 2 },
            { slug: "animalia-organization", title: "Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals", hours: 2 },
            { slug: "phyla-diagnostic", title: "Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata", hours: 4 },
            { slug: "earthworm-habitat", title: "Earthworm (Pheretima posthuma): Habit and habitat, external features", hours: 1 },
            { slug: "earthworm-digestive", title: "Earthworm: Digestive system (alimentary canal and physiology of digestion)", hours: 1 },
            { slug: "earthworm-excretory", title: "Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)", hours: 2 },
            { slug: "earthworm-reproductive", title: "Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance", hours: 2 },
            { slug: "frog-habitat", title: "Frog (Rana tigrina): Habit and habitat, external features", hours: 1 },
            { slug: "frog-digestive", title: "Frog: Digestive system (alimentary canal, digestive glands and physiology of digestion)", hours: 1 },
            { slug: "frog-circulatory", title: "Frog: Blood vascular system (structure and working mechanism of heart)", hours: 1 },
            { slug: "frog-respiratory", title: "Frog: Respiratory system (respiratory organs and physiology of respiration)", hours: 1 },
            { slug: "frog-reproductive", title: "Frog: Reproductive system (male and female reproductive organs)", hours: 1 },
          ],
        },
        {
          id: "biota-environment",
          title: "Biota and Environment",
          hours: 10,
          topics: [
            { slug: "animal-adaptation", title: "Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation", hours: 3 },
            { slug: "animal-behavior", title: "Animal behavior: Reflex action, taxes, dominance and leadership. Fish and bird migration", hours: 4 },
            { slug: "environmental-pollution", title: "Environmental pollution: Sources, effects and control measures of air, water and soil pollution. Pesticides and their effects", hours: 3 },
          ],
        },
        {
          id: "conservation-biology",
          title: "Conservation Biology",
          hours: 4,
          topics: [
            { slug: "conservation-concept", title: "Conservation biology: Concept of biodiversity, biodiversity conservation", hours: 1 },
            { slug: "protected-areas", title: "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites", hours: 1 },
            { slug: "wildlife-conservation", title: "Wildlife: Importance, causes of extinction and conservation strategies. IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species. Endangered species in Nepal", hours: 1, modifiedInYear: 2081 },
            { slug: "climate-change-bio", title: "Climate change impacts on biodiversity and conservation strategies", hours: 1, addedInYear: 2081 },
          ],
        },
      ],
    },
  ],
};

/**
 * NEB Class 12 Biology (Botany + Zoology) — 2076 baseline vs 2081 revision
 * Total ~160 teaching hours (128 theory + 32 practical)
 */
export const BIOLOGY_12_DATA: SubjectBiologyData = {
  grade: "12",
  subjectCode: "Bio. 302",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "First NCF 2076 curriculum for Grade 12 with 128 theory + 32 practical hours.",
      units: [
        {
          id: "plant-anatomy",
          title: "Plant Anatomy",
          hours: 8,
          topics: [
            { slug: "plant-anatomy-concept", title: "Plant anatomy: Concept of tissues, types of plant tissues (meristems and permanent tissues)", hours: 2 },
            { slug: "anatomy-dicot-monocot", title: "Anatomy of dicot and monocot root, stem and leaf", hours: 3 },
            { slug: "secondary-growth", title: "Secondary growth of dicot stem", hours: 2 },
            { slug: "plant-tissues-functions", title: "Investigate the structures and functions of plant tissues, and factors affecting plant growth", hours: 1 },
          ],
        },
        {
          id: "plant-physiology",
          title: "Plant Physiology",
          hours: 20,
          topics: [
            { slug: "water-relation", title: "Water relation: Introduction and significance of diffusion, osmosis, and plasmolysis, ascent of sap, transpiration and guttation", hours: 4 },
            { slug: "photosynthesis", title: "Photosynthesis: Introduction and significance of photosynthesis, photosynthetic pigments, mechanism of photosynthesis (photochemical phase and Calvin-Benson cycle), C3 and C4 plants, photorespiration, factors affecting photosynthesis", hours: 5 },
            { slug: "respiration", title: "Respiration: Introduction and significance of respiration, types of respiration, mechanism of respiration (glycolysis, Kreb cycle, electron transport system), factors affecting respiration", hours: 5 },
            { slug: "plant-hormones", title: "Plant hormones: Introduction, physiological effects of auxins, gibberellins and Cytokinins", hours: 3 },
            { slug: "plant-growth-movement", title: "Plant growth and movement: Concept on seed germination, dormancy, photoperiodism, vernalization, senescence; plant movements (tropic and nastic)", hours: 3 },
          ],
        },
        {
          id: "genetics",
          title: "Genetics",
          hours: 21,
          topics: [
            { slug: "genetic-materials", title: "Genetic Materials: Introduction to genetics and genetic materials, composition, structure and function of DNA and RNA, DNA replication, introduction of genetic code", hours: 5 },
            { slug: "mendelian-genetics", title: "Mendelian genetics: General terminology, Mendel's experiment and laws of inheritance, gene interactions (incomplete dominance, codominance)", hours: 6 },
            { slug: "linkage-crossing-over", title: "Linkage and crossing over: Concept and types of linkage (complete and incomplete), sex-linked inheritance (colour blindness in man and eye colour of Drosophila), concept and significances of crossing over", hours: 5 },
            { slug: "mutation-polyploidy", title: "Mutation and polyploidy: Concept, type (gene and chromosomal mutation), importance of mutation (positive and negative), polyploidy (origin and significance)", hours: 5 },
          ],
        },
        {
          id: "embryology",
          title: "Embryology",
          hours: 8,
          topics: [
            { slug: "reproduction-angiosperms", title: "Asexual and sexual reproductions in angiosperms, pollination, fertilization", hours: 2 },
            { slug: "gametophyte-dev", title: "Development of male and female gametophytes", hours: 2 },
            { slug: "embryo-dev", title: "Development of dicot and monocot embryos", hours: 2 },
            { slug: "endosperm", title: "Concept of endosperm", hours: 2 },
          ],
        },
        {
          id: "biotechnology",
          title: "Biotechnology",
          hours: 7,
          topics: [
            { slug: "biotech-intro", title: "Introduction to biotechnology, tissue culture, plant breeding, disease resistance plants, green manure and biofertilizer", hours: 3 },
            { slug: "biopesticide", title: "Biopesticides and their applications", hours: 1, addedInYear: 2081 },
            { slug: "gmo-applications", title: "Genetic engineering and GMOs (genetically modified organisms) and application, bioengineering, food safety and food security", hours: 2, modifiedInYear: 2081 },
            { slug: "tissue-culture", title: "Tissue culture techniques and applications in agriculture", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "animal-tissues",
          title: "Animal Tissues",
          hours: 8,
          topics: [
            { slug: "animal-tissues-types", title: "Types of animal tissues: epithelial, connective, muscular and nervous and their functions", hours: 3 },
            { slug: "animal-tissues-subtypes", title: "Structure, functions & location of different sub-types of four main animal tissues", hours: 3 },
            { slug: "nervous-tissue", title: "Nervous tissue with their structures and functions", hours: 1 },
            { slug: "cartilage-bone", title: "Cartilage and bones composition and structure", hours: 1 },
          ],
        },
        {
          id: "developmental-biology",
          title: "Developmental Biology",
          hours: 6,
          topics: [
            { slug: "gametogenesis", title: "Spermatogenesis & Oogenesis", hours: 2 },
            { slug: "frog-development", title: "Development of frog: fertilization, cleavage, morulation, blastulation, gastrulation, organogenesis", hours: 4 },
          ],
        },
        {
          id: "human-biology",
          title: "Human Biology",
          hours: 28,
          topics: [
            { slug: "digestive-system", title: "Digestive system: Alimentary canal and digestive glands, physiology of digestion", hours: 2 },
            { slug: "respiratory-system", title: "Respiratory system: Respiratory organs, respiratory mechanism, exchange of gases, transport of gases and regulation of respiration", hours: 2 },
            { slug: "circulatory-system", title: "Circulatory system: Double circulation, heart (structure and working mechanism), origin and conduction of heart beat, cardiac cycle, cardiac output, arterial and venous systems, blood grouping, blood pressure", hours: 4 },
            { slug: "excretory-system", title: "Excretory system: Modes of excretion (ammonotelism, ureotelism, uricotelism), excretory organs, mechanism of urine formation", hours: 3 },
            { slug: "nervous-system", title: "Nervous system: Types of nervous system (central, peripheral & autonomous), structure and function of brain, origin and conduction of nerve impulse", hours: 3 },
            { slug: "sense-organs", title: "Sense organs: Structure and functions of eye and ear", hours: 2 },
            { slug: "endocrinology", title: "Endocrinology: Endocrine glands and hormones — structure & functions of hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; hypo- and hyper-activity and related disorders", hours: 9 },
            { slug: "reproductive-system", title: "Reproductive system: Male and female reproductive organs, ovarian & menstrual cycle", hours: 3 },
          ],
        },
        {
          id: "human-population-health",
          title: "Human Population and Health Disorders",
          hours: 6,
          topics: [
            { slug: "human-population", title: "Human Population: Growth problem and control strategies, Concept of demographic cycle", hours: 2 },
            { slug: "health-disorders", title: "Health disorders: Concept of cardiovascular, respiratory & renal disorders; Substance abuse: Drug, alcohol and smoking abuse", hours: 4 },
          ],
        },
        {
          id: "applied-biology",
          title: "Applied Biology",
          hours: 16,
          topics: [
            { slug: "tissue-organ-transplant", title: "Application of Zoology: Tissue and organs transplantation, in-vitro fertilization (IVF), amniocentesis, concept of genetically modified organisms (transgenic animals). Poultry farming and fish farming", hours: 6 },
            { slug: "microbial-diseases", title: "Microbial diseases and application of microbiology: Risk and hazard group of microorganisms. Introduction, causative agents, symptoms, prevention and control measures of selected human diseases: Typhoid, Tuberculosis and HIV infection, cholera, influenza, hepatitis, candidiasis", hours: 4 },
            { slug: "immunology-vaccines", title: "Basic concepts of immunology—vaccines", hours: 2 },
            { slug: "microbe-applications", title: "Application of microorganisms in dairy and beverage industries, microbial contamination of water, sewage and drinking water treatment, bio-control agents and bio-fertilizers", hours: 2, modifiedInYear: 2081 },
            { slug: "enzyme-technology", title: "Technological applications of enzymes in industrial processes, and evaluate technological advances in the field of cellular biology", hours: 2 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revised per esikhcha.com comparison: emphasis on climate change, biological invasion, biopesticides, GMOs, tissue culture, microbial contamination, and human genetics. Total hours increased slightly in Biotechnology and Applied Biology units.",
      units: [
        {
          id: "plant-anatomy",
          title: "Plant Anatomy",
          hours: 8,
          topics: [
            { slug: "plant-anatomy-concept", title: "Plant anatomy: Concept of tissues, types of plant tissues (meristems and permanent tissues)", hours: 2 },
            { slug: "anatomy-dicot-monocot", title: "Anatomy of dicot and monocot root, stem and leaf", hours: 3 },
            { slug: "secondary-growth", title: "Secondary growth of dicot stem", hours: 2 },
            { slug: "plant-tissues-functions", title: "Investigate the structures and functions of plant tissues, and factors affecting plant growth", hours: 1 },
          ],
        },
        {
          id: "plant-physiology",
          title: "Plant Physiology",
          hours: 20,
          topics: [
            { slug: "water-relation", title: "Water relation: Introduction and significance of diffusion, osmosis, and plasmolysis, ascent of sap, transpiration and guttation", hours: 4 },
            { slug: "photosynthesis", title: "Photosynthesis: Introduction and significance of photosynthesis, photosynthetic pigments, mechanism of photosynthesis (photochemical phase and Calvin-Benson cycle), C3 and C4 plants, photorespiration, factors affecting photosynthesis", hours: 5 },
            { slug: "respiration", title: "Respiration: Introduction and significance of respiration, types of respiration, mechanism of respiration (glycolysis, Kreb cycle, electron transport system), factors affecting respiration", hours: 5 },
            { slug: "plant-hormones", title: "Plant hormones: Introduction, physiological effects of auxins, gibberellins and Cytokinins", hours: 3 },
            { slug: "plant-growth-movement", title: "Plant growth and movement: Concept on seed germination, dormancy, photoperiodism, vernalization, senescence; plant movements (tropic and nastic)", hours: 3 },
          ],
        },
        {
          id: "genetics",
          title: "Genetics",
          hours: 21,
          topics: [
            { slug: "genetic-materials", title: "Genetic Materials: Introduction to genetics and genetic materials, composition, structure and function of DNA and RNA, DNA replication, introduction of genetic code", hours: 5 },
            { slug: "mendelian-genetics", title: "Mendelian genetics: General terminology, Mendel's experiment and laws of inheritance, gene interactions (incomplete dominance, codominance)", hours: 6 },
            { slug: "linkage-crossing-over", title: "Linkage and crossing over: Concept and types of linkage (complete and incomplete), sex-linked inheritance (colour blindness in man and eye colour of Drosophila), concept and significances of crossing over", hours: 5 },
            { slug: "mutation-polyploidy", title: "Mutation and polyploidy: Concept, type (gene and chromosomal mutation), importance of mutation (positive and negative), polyploidy (origin and significance)", hours: 5 },
          ],
        },
        {
          id: "embryology",
          title: "Embryology",
          hours: 8,
          topics: [
            { slug: "reproduction-angiosperms", title: "Asexual and sexual reproductions in angiosperms, pollination, fertilization", hours: 2 },
            { slug: "gametophyte-dev", title: "Development of male and female gametophytes", hours: 2 },
            { slug: "embryo-dev", title: "Development of dicot and monocot embryos", hours: 2 },
            { slug: "endosperm", title: "Concept of endosperm", hours: 2 },
          ],
        },
        {
          id: "biotechnology",
          title: "Biotechnology",
          hours: 9,
          topics: [
            { slug: "biotech-intro", title: "Introduction to biotechnology, tissue culture, plant breeding, disease resistance plants, green manure and biofertilizer", hours: 3 },
            { slug: "biopesticide", title: "Biopesticides: Types, mechanisms, and applications in sustainable agriculture", hours: 2, addedInYear: 2081 },
            { slug: "gmo-applications", title: "Genetic engineering and GMOs (genetically modified organisms): Principles, applications, food safety and regulatory considerations", hours: 2, modifiedInYear: 2081 },
            { slug: "tissue-culture", title: "Tissue culture: Meristem culture, somatic embryogenesis, haploid production, cryopreservation and commercial applications", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "animal-tissues",
          title: "Animal Tissues",
          hours: 8,
          topics: [
            { slug: "animal-tissues-types", title: "Types of animal tissues: epithelial, connective, muscular and nervous and their functions", hours: 3 },
            { slug: "animal-tissues-subtypes", title: "Structure, functions & location of different sub-types of four main animal tissues", hours: 3 },
            { slug: "nervous-tissue", title: "Nervous tissue with their structures and functions", hours: 1 },
            { slug: "cartilage-bone", title: "Cartilage and bones composition and structure", hours: 1 },
          ],
        },
        {
          id: "developmental-biology",
          title: "Developmental Biology",
          hours: 6,
          topics: [
            { slug: "gametogenesis", title: "Spermatogenesis & Oogenesis", hours: 2 },
            { slug: "frog-development", title: "Development of frog: fertilization, cleavage, morulation, blastulation, gastrulation, organogenesis", hours: 4 },
          ],
        },
        {
          id: "human-biology",
          title: "Human Biology",
          hours: 28,
          topics: [
            { slug: "digestive-system", title: "Digestive system: Alimentary canal and digestive glands, physiology of digestion", hours: 2 },
            { slug: "respiratory-system", title: "Respiratory system: Respiratory organs, respiratory mechanism, exchange of gases, transport of gases and regulation of respiration", hours: 2 },
            { slug: "circulatory-system", title: "Circulatory system: Double circulation, heart (structure and working mechanism), origin and conduction of heart beat, cardiac cycle, cardiac output, arterial and venous systems, blood grouping, blood pressure", hours: 4 },
            { slug: "excretory-system", title: "Excretory system: Modes of excretion (ammonotelism, ureotelism, uricotelism), excretory organs, mechanism of urine formation", hours: 3 },
            { slug: "nervous-system", title: "Nervous system: Types of nervous system (central, peripheral & autonomous), structure and function of brain, origin and conduction of nerve impulse", hours: 3 },
            { slug: "sense-organs", title: "Sense organs: Structure and functions of eye and ear", hours: 2 },
            { slug: "endocrinology", title: "Endocrinology: Endocrine glands and hormones — structure & functions of hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; hypo- and hyper-activity and related disorders", hours: 9 },
            { slug: "reproductive-system", title: "Reproductive system: Male and female reproductive organs, ovarian & menstrual cycle", hours: 3 },
          ],
        },
        {
          id: "human-population-health",
          title: "Human Population and Health Disorders",
          hours: 6,
          topics: [
            { slug: "human-population", title: "Human Population: Growth problem and control strategies, Concept of demographic cycle", hours: 2 },
            { slug: "health-disorders", title: "Health disorders: Concept of cardiovascular, respiratory & renal disorders; Substance abuse: Drug, alcohol and smoking abuse", hours: 4 },
          ],
        },
        {
          id: "applied-biology",
          title: "Applied Biology",
          hours: 18,
          topics: [
            { slug: "tissue-organ-transplant", title: "Application of Zoology: Tissue and organs transplantation, in-vitro fertilization (IVF), amniocentesis, concept of genetically modified organisms (transgenic animals). Poultry farming and fish farming", hours: 6 },
            { slug: "microbial-diseases", title: "Microbial diseases and application of microbiology: Risk and hazard group of microorganisms. Introduction, causative agents, symptoms, prevention and control measures of selected human diseases: Typhoid, Tuberculosis and HIV infection, cholera, influenza, hepatitis, candidiasis", hours: 4 },
            { slug: "immunology-vaccines", title: "Basic concepts of immunology—vaccines", hours: 2 },
            { slug: "microbe-applications", title: "Application of microorganisms in dairy and beverage industries, microbial contamination of water, sewage and drinking water treatment, bio-control agents and bio-fertilizers", hours: 2, modifiedInYear: 2081 },
            { slug: "enzyme-technology", title: "Technological applications of enzymes in industrial processes, and evaluate technological advances in the field of cellular biology", hours: 2 },
            { slug: "climate-change-health", title: "Climate change impacts on human health and disease patterns in Nepal", hours: 2, addedInYear: 2081 },
          ],
        },
      ],
    },
  ],
};

export type BiologyDataMap = {
  "class-11-notes": SubjectBiologyData;
  "class-12-notes": SubjectBiologyData;
};

export const BIOLOGY_DATA_MAP: BiologyDataMap = {
  "class-11-notes": BIOLOGY_11_DATA,
  "class-12-notes": BIOLOGY_12_DATA,
};

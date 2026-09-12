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
  meaning?: string;
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
            { slug: "biomolecules-intro", title: "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water", hours: 4, meaning: "The chemical building blocks that make living things work. Students learn how carbs fuel the body, proteins build tissues, lipids form cell membranes, and DNA carries genetic instructions." },
            { slug: "cell-introduction", title: "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells", hours: 1, meaning: "Cells are the smallest units of life. Students compare simple prokaryotic cells (like bacteria) with complex eukaryotic cells that have a nucleus and organelles." },
            { slug: "eukaryotic-cell-detail", title: "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions", hours: 8, meaning: "Every organelle inside a cell has a specific job. Students explore how the nucleus stores DNA, mitochondria produce energy, ribosomes build proteins, and other structures keep the cell functioning." },
            { slug: "cell-division", title: "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances", hours: 3, meaning: "Cells divide to grow, repair, and reproduce. Students learn how mitosis creates identical cells for growth and meiosis produces sex cells with half the chromosomes for inheritance." },
          ],
        },
        {
          id: "floral-diversity",
          title: "Floral Diversity",
          hours: 30,
          topics: [
            { slug: "intro-three-domains", title: "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)", hours: 1, meaning: "All life on Earth is organized into a classification system. Students learn how scientists name species and group them into domains and kingdoms based on shared characteristics." },
            { slug: "status-flora-nepal", title: "Status of flora in Nepal and world representation", hours: 1, meaning: "Nepal's diverse geography creates unique plant life from tropical forests to alpine meadows. Students study what plants grow in Nepal and why biodiversity matters for the country's ecosystems." },
            { slug: "fungi-general", title: "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes", hours: 1, meaning: "Fungi are neither plants nor animals — they absorb nutrients from their surroundings. Students classify major fungal groups and understand their role in decomposition and food production." },
            { slug: "mucor-yeast", title: "Structure and reproduction of Mucor and Yeast", hours: 1, meaning: "Mucor is the common bread mould and yeast is used in baking and brewing. Students study their structure and how these fungi reproduce, linking microbiology to everyday life in Nepal." },
            { slug: "mushrooms", title: "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi", hours: 1, meaning: "Mushrooms are edible fungi that are important foods in Nepal, but some are deadly poisonous. Students learn to distinguish safe from dangerous species and understand fungi's economic value." },
            { slug: "lichen", title: "Lichen: General introduction, characteristic features and economic importance of lichen", hours: 1, meaning: "Lichens are partnerships between fungi and algae working together. Students learn how lichens survive extreme conditions and serve as bioindicators of air quality in Nepal." },
            { slug: "algae-green-brown-red", title: "Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae", hours: 2, meaning: "Algae are simple aquatic plants found in Nepal's rivers, lakes and oceans. Students study three major algal groups, examine Spirogyra under the microscope, and learn how algae are used as food and medicine." },
            { slug: "bryophyta", title: "Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes", hours: 2, meaning: "Bryophytes are the simplest land plants, often called 'amphibians of the plant kingdom.' Students study mosses and liverworts like Marchantia, understanding how they reproduce without seeds." },
            { slug: "pteridophyta", title: "Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes", hours: 2, meaning: "Ferns are vascular plants that reproduce via spores rather than seeds. Students study Dryopteris (a common Nepali fern) and learn how seedless plants colonized land before flowering plants evolved." },
            { slug: "gymnosperm", title: "Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm", hours: 3, meaning: "Gymnosperms are 'naked-seeded' plants like pine trees that don't produce flowers or fruits. Students study Pinus (Chir pine), a commercially important tree in the Himalayan region, and its reproductive cycle." },
            { slug: "angiosperm-morphology", title: "Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit", hours: 4, meaning: "Flowering plants (angiosperms) are the most diverse group on Earth. Students learn the external structure of roots, stems, leaves, flowers and fruits — knowledge essential for agriculture in Nepal." },
            { slug: "taxonomic-study", title: "Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms", hours: 3, meaning: "Classification organizes the thousands of plant species into a logical system. Students learn taxonomic ranks from kingdom to species and understand how modern classification reflects evolutionary relationships." },
            { slug: "angiosperm-families", title: "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae", hours: 4, meaning: "Many plant families are vital to Nepal's agriculture and diet. Students identify key features of mustard (Brassicaceae), legumes (Fabaceae), nightshades (Solanaceae), and lilies (Liliaceae) that grow in the region." },
          ],
        },
        {
          id: "introductory-microbiology",
          title: "Introductory Microbiology",
          hours: 5,
          topics: [
            { slug: "monera", title: "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)", hours: 3, meaning: "Bacteria are the most abundant organisms on Earth, including those in Nepal's soil and water. Students study bacterial structure, how they feed and grow, and the beneficial role of blue-green algae in agriculture." },
            { slug: "virus", title: "Virus: General introduction, structure and importance of virus, bacteriophage", hours: 1, meaning: "Viruses are tiny infectious agents smaller than bacteria. Students learn viral structure, how they cause diseases like HIV and influenza, and how bacteriophages infect bacteria — knowledge critical for public health." },
            { slug: "biotech-microbiology", title: "Impacts of biotechnology in the field of microbiology", hours: 1, meaning: "Biotechnology uses microorganisms to solve real-world problems. Students explore how microbes are engineered to produce antibiotics, vaccines, and industrial products relevant to Nepal's healthcare and economy." },
          ],
        },
        {
          id: "ecology",
          title: "Ecology",
          hours: 11,
          topics: [
            { slug: "ecosystem-ecology", title: "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions", hours: 3, meaning: "Ecology studies how living organisms interact with each other and their environment. Students learn about biotic (living) and abiotic (non-living) factors that shape ecosystems in Nepal's diverse habitats." },
            { slug: "ecosystem-concept", title: "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem", hours: 2, meaning: "An ecosystem is a community of organisms plus their physical environment. Students compare pond and forest ecosystems, understanding energy flow and nutrient cycling in familiar Nepali environments." },
            { slug: "food-chain-web", title: "Food chain, food web, trophic level, ecological pyramids, productivity", hours: 2, meaning: "Energy flows through ecosystems via feeding relationships. Students trace food chains and webs, understand trophic levels, and learn why energy decreases at each level — fundamental to conservation." },
            { slug: "biogeochemical-cycles", title: "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession", hours: 2, meaning: "Elements like carbon and nitrogen circulate between living things and the environment. Students study these cycles and ecological succession — how barren land gradually becomes a thriving forest over time." },
            { slug: "ecological-adaptation", title: "Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes", hours: 1, meaning: "Organisms adapt to survive in their specific environments. Students study how water plants (hydrophytes) and drought-tolerant plants (xerophytes) are structurally adapted to their habitats in Nepal." },
            { slug: "ecological-imbalances", title: "Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion", hours: 1, meaning: "Human activities are disrupting natural environmental balance. Students learn about climate change, ozone depletion, acid rain, and invasive species — urgent issues affecting Nepal's mountains and valleys." },
          ],
        },
        {
          id: "vegetation",
          title: "Vegetation",
          hours: 3,
          topics: [
            { slug: "vegetation-types", title: "Vegetation: Introduction, types of vegetation in Nepal", hours: 2, meaning: "Nepal's vegetation ranges from subtropical sal forests to alpine grasslands due to its altitude variation. Students map these vegetation zones and understand what determines where different plants grow." },
            { slug: "conservation-in-situ-ex-situ", title: "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation", hours: 1, meaning: "Conservation happens either in natural habitats (in-situ) or outside them (ex-situ). Students learn about Nepal's protected areas, botanical gardens, and seed banks as strategies to protect endangered species." },
          ],
        },
        {
          id: "introduction-to-biology",
          title: "Introduction to Biology",
          hours: 2,
          topics: [
            { slug: "scope-fields", title: "Introduction to Biology: Scope and fields of biology", hours: 1, meaning: "Biology is the scientific study of life in all its forms. Students explore the broad scope of biology and its many branches — from botany and zoology to genetics and ecology." },
            { slug: "relation-with-other-sciences", title: "Relation of biology with other sciences", hours: 1, meaning: "Biology connects deeply with chemistry, physics, and mathematics. Students understand how scientific disciplines overlap, such as biochemistry, biophysics, and computational biology." },
          ],
        },
        {
          id: "evolutionary-biology",
          title: "Evolutionary Biology",
          hours: 15,
          topics: [
            { slug: "origin-of-life", title: "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment", hours: 2, meaning: "How did life first begin on Earth? Students study the Oparin-Haldane chemical evolution theory and Miller-Urey's famous experiment that simulated early Earth conditions to produce organic molecules." },
            { slug: "evidences-evolution", title: "Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical", hours: 5, meaning: "Multiple lines of evidence prove that species change over time. Students examine fossil records, homologous structures, embryonic similarities, and DNA comparisons that support evolutionary theory." },
            { slug: "theories-evolution", title: "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism", hours: 3, meaning: "Different scientists proposed different mechanisms for evolution. Students compare Lamarck's inheritance of acquired traits, Darwin's natural selection, and the modern synthetic theory combining genetics with evolution." },
            { slug: "human-evolution", title: "Human evolution: Position of man in animal kingdom", hours: 2, meaning: "Humans are primates with a long evolutionary history. Students study where humans fit in the animal kingdom and trace the key adaptations that led to our species." },
            { slug: "monkeys-apes-man", title: "Differences between new world monkeys and old-world monkeys, apes and man", hours: 1, meaning: "Not all primates are the same. Students compare New World monkeys (Americas), Old World monkeys (Africa/Asia), apes, and humans — examining physical and behavioral differences." },
            { slug: "modern-man-evolution", title: "Evolution of modern man starting from anthropoid ancestor", hours: 1, meaning: "Modern humans (Homo sapiens) evolved through several ancestral stages. Students trace the human lineage from early anthropoid ancestors through Australopithecus, Homo habilis, and finally Homo sapiens." },
          ],
        },
        {
          id: "faunal-diversity",
          title: "Faunal Diversity",
          hours: 34,
          topics: [
            { slug: "protista-outline", title: "Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples", hours: 2, meaning: "Protists are single-celled eukaryotes that don't fit into plant, animal, or fungal kingdoms. Students classify protozoans by their locomotion structures — flagella, cilia, or pseudopodia." },
            { slug: "paramecium-plasmodium", title: "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle; Economic importance of P. falciparum", hours: 2, meaning: "Paramecium is a model freshwater protist, while Plasmodium causes malaria — a major health issue in Nepal. Students study their structure, life cycles, and the economic impact of malaria parasites." },
            { slug: "animalia-organization", title: "Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals", hours: 2, meaning: "Animals are organized in increasing complexity. Students learn about tissue-level organization, body symmetries (radial vs bilateral), coeloms (body cavities), and segmentation as key animal characteristics." },
            { slug: "phyla-diagnostic", title: "Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata", hours: 4, meaning: "All animals are grouped into phyla based on fundamental body plans. Students learn the distinguishing features of each phylum — from simple sponges to complex chordates including vertebrates." },
            { slug: "earthworm-habitat", title: "Earthworm (Pheretima posthuma): Habit and habitat, external features", hours: 1, meaning: "Earthworms are vital for soil health in Nepali agriculture. Students study the habitat and external anatomy of Pheretima, learning how its segmented body is adapted for life in soil." },
            { slug: "earthworm-digestive", title: "Earthworm: Digestive system (alimentary canal and physiology of digestion)", hours: 1, meaning: "Earthworms digest soil and organic matter through a complete digestive tract. Students trace food from mouth to anus and understand how nutrients are absorbed — a model for understanding animal digestion." },
            { slug: "earthworm-excretory", title: "Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)", hours: 2, meaning: "Earthworms excrete waste through nephridia and coordinate movement through a simple nervous system. Students learn how these systems work together to maintain the worm's internal environment." },
            { slug: "earthworm-reproductive", title: "Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance", hours: 2, meaning: "Earthworms are hermaphrodites with both male and female organs. Students study their cross-fertilization process, cocoon formation, and why earthworms are economically important for farming." },
            { slug: "frog-habitat", title: "Frog (Rana tigrina): Habit and habitat, external features", hours: 1, meaning: "The tiger frog (Rana tigrina) is common in Nepal's rice fields and ponds. Students study its external anatomy — streamlined body, webbed feet, and moist skin adapted for amphibious life." },
            { slug: "frog-digestive", title: "Frog: Digestive system (alimentary canal, digestive glands and physiology of digestion)", hours: 1, meaning: "Frogs have a complete digestive system adapted for carnivorous feeding. Students study the alimentary canal and associated glands, understanding how insects and small prey are digested." },
            { slug: "frog-circulatory", title: "Frog: Blood vascular system (structure and working mechanism of heart)", hours: 1, meaning: "Frogs have a closed circulatory system with a three-chambered heart. Students study how blood flows through the heart and body, comparing it to the human four-chambered heart." },
            { slug: "frog-respiratory", title: "Frog: Respiratory system (respiratory organs and physiology of respiration)", hours: 1, meaning: "Frogs breathe through lungs, skin, and the lining of their mouth — a feature called cutaneous respiration. Students study these multiple respiratory surfaces and how gas exchange works in amphibians." },
            { slug: "frog-reproductive", title: "Frog: Reproductive system (male and female reproductive organs)", hours: 1, meaning: "Frogs reproduce in water through external fertilization. Students study the male and female reproductive organs and understand the breeding biology of this important amphibian group." },
          ],
        },
        {
          id: "biota-environment",
          title: "Biota and Environment",
          hours: 10,
          topics: [
            { slug: "animal-adaptation", title: "Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation", hours: 3, meaning: "Animals are specially designed for their way of life. Students study how aquatic animals swim, terrestrial animals run or dig, and flying animals are built for flight — all as evolutionary adaptations." },
            { slug: "animal-behavior", title: "Animal behavior: Reflex action, taxes, dominance and leadership. Fish and bird migration", hours: 4, meaning: "Animal behavior reveals how organisms respond to their environment. Students study reflex actions, social hierarchies, and the incredible migrations of fish and birds — phenomena visible in Nepal." },
            { slug: "environmental-pollution", title: "Environmental pollution: Sources, effects and control measures of air, water and soil pollution. Pesticides and their effects", hours: 3, meaning: "Pollution threatens Nepal's air, water, and soil quality. Students identify pollution sources, understand their health and environmental effects, and learn about pesticide contamination in agriculture." },
          ],
        },
        {
          id: "conservation-biology",
          title: "Conservation Biology",
          hours: 3,
          topics: [
            { slug: "conservation-concept", title: "Conservation biology: Concept of biodiversity, biodiversity conservation", hours: 1, meaning: "Biodiversity means the variety of all life forms — genes, species, and ecosystems. Students understand why biodiversity is valuable and what conservation biology aims to protect it." },
            { slug: "protected-areas", title: "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites", hours: 1, meaning: "Nepal protects its biodiversity through national parks and reserves. Students study Chitwan, Sagarmatha, and other protected areas, plus Nepal's Ramsar wetland sites and global biodiversity hotspots." },
            { slug: "wildlife-conservation", title: "Wildlife: Importance, causes of extinction and conservation strategies. IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species. Endangered species in Nepal", hours: 1, meaning: "Species extinction is accelerating worldwide. Students learn IUCN threat categories and study Nepal's endangered species like the one-horned rhinoceros and Bengal tiger and conservation efforts to save them." },
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
            { slug: "biomolecules-intro", title: "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water", hours: 4, meaning: "The chemical building blocks that make living things work. Students learn how carbs fuel the body, proteins build tissues, lipids form cell membranes, and DNA carries genetic instructions." },
            { slug: "cell-introduction", title: "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells", hours: 1, meaning: "Cells are the smallest units of life. Students compare simple prokaryotic cells (like bacteria) with complex eukaryotic cells that have a nucleus and organelles." },
            { slug: "eukaryotic-cell-detail", title: "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions", hours: 8, meaning: "Every organelle inside a cell has a specific job. Students explore how the nucleus stores DNA, mitochondria produce energy, ribosomes build proteins, and other structures keep the cell functioning." },
            { slug: "cell-division", title: "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances", hours: 3, meaning: "Cells divide to grow, repair, and reproduce. Students learn how mitosis creates identical cells for growth and meiosis produces sex cells with half the chromosomes for inheritance." },
          ],
        },
        {
          id: "floral-diversity",
          title: "Floral Diversity",
          hours: 30,
          topics: [
            { slug: "intro-three-domains", title: "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)", hours: 1, meaning: "All life on Earth is organized into a classification system. Students learn how scientists name species and group them into domains and kingdoms based on shared characteristics." },
            { slug: "status-flora-nepal", title: "Status of flora in Nepal and world representation", hours: 1, meaning: "Nepal's diverse geography creates unique plant life from tropical forests to alpine meadows. Students study what plants grow in Nepal and why biodiversity matters for the country's ecosystems." },
            { slug: "fungi-general", title: "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes", hours: 1, meaning: "Fungi are neither plants nor animals — they absorb nutrients from their surroundings. Students classify major fungal groups and understand their role in decomposition and food production." },
            { slug: "mucor-yeast", title: "Structure and reproduction of Mucor and Yeast", hours: 1, meaning: "Mucor is the common bread mould and yeast is used in baking and brewing. Students study their structure and how these fungi reproduce, linking microbiology to everyday life in Nepal." },
            { slug: "mushrooms", title: "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi", hours: 1, meaning: "Mushrooms are edible fungi that are important foods in Nepal, but some are deadly poisonous. Students learn to distinguish safe from dangerous species and understand fungi's economic value." },
            { slug: "lichen", title: "Lichen: General introduction, characteristic features and economic importance of lichen", hours: 1, meaning: "Lichens are partnerships between fungi and algae working together. Students learn how lichens survive extreme conditions and serve as bioindicators of air quality in Nepal." },
            { slug: "algae-green-brown-red", title: "Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae", hours: 2, meaning: "Algae are simple aquatic plants found in Nepal's rivers, lakes and oceans. Students study three major algal groups, examine Spirogyra under the microscope, and learn how algae are used as food and medicine." },
            { slug: "bryophyta", title: "Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes", hours: 2, meaning: "Bryophytes are the simplest land plants, often called 'amphibians of the plant kingdom.' Students study mosses and liverworts like Marchantia, understanding how they reproduce without seeds." },
            { slug: "pteridophyta", title: "Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes", hours: 2, meaning: "Ferns are vascular plants that reproduce via spores rather than seeds. Students study Dryopteris (a common Nepali fern) and learn how seedless plants colonized land before flowering plants evolved." },
            { slug: "gymnosperm", title: "Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm", hours: 3, meaning: "Gymnosperms are 'naked-seeded' plants like pine trees that don't produce flowers or fruits. Students study Pinus (Chir pine), a commercially important tree in the Himalayan region, and its reproductive cycle." },
            { slug: "angiosperm-morphology", title: "Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit", hours: 4, meaning: "Flowering plants (angiosperms) are the most diverse group on Earth. Students learn the external structure of roots, stems, leaves, flowers and fruits — knowledge essential for agriculture in Nepal." },
            { slug: "taxonomic-study", title: "Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms", hours: 3, meaning: "Classification organizes the thousands of plant species into a logical system. Students learn taxonomic ranks from kingdom to species and understand how modern classification reflects evolutionary relationships." },
            { slug: "angiosperm-families", title: "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae", hours: 4, meaning: "Many plant families are vital to Nepal's agriculture and diet. Students identify key features of mustard (Brassicaceae), legumes (Fabaceae), nightshades (Solanaceae), and lilies (Liliaceae) that grow in the region." },
          ],
        },
        {
          id: "introductory-microbiology",
          title: "Introductory Microbiology",
          hours: 5,
          topics: [
            { slug: "monera", title: "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)", hours: 3, meaning: "Bacteria are the most abundant organisms on Earth, including those in Nepal's soil and water. Students study bacterial structure, how they feed and grow, and the beneficial role of blue-green algae in agriculture." },
            { slug: "virus", title: "Virus: General introduction, structure and importance of virus, bacteriophage", hours: 1, meaning: "Viruses are tiny infectious agents smaller than bacteria. Students learn viral structure, how they cause diseases like HIV and influenza, and how bacteriophages infect bacteria — knowledge critical for public health." },
            { slug: "biotech-microbiology", title: "Impacts of biotechnology in the field of microbiology", hours: 1, meaning: "Biotechnology uses microorganisms to solve real-world problems. Students explore how microbes are engineered to produce antibiotics, vaccines, and industrial products relevant to Nepal's healthcare and economy." },
          ],
        },
        {
          id: "ecology",
          title: "Ecology",
          hours: 11,
          topics: [
            { slug: "ecosystem-ecology", title: "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions", hours: 3, meaning: "Ecology studies how living organisms interact with each other and their environment. Students learn about biotic (living) and abiotic (non-living) factors that shape ecosystems in Nepal's diverse habitats." },
            { slug: "ecosystem-concept", title: "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem", hours: 2, meaning: "An ecosystem is a community of organisms plus their physical environment. Students compare pond and forest ecosystems, understanding energy flow and nutrient cycling in familiar Nepali environments." },
            { slug: "food-chain-web", title: "Food chain, food web, trophic level, ecological pyramids, productivity", hours: 2, meaning: "Energy flows through ecosystems via feeding relationships. Students trace food chains and webs, understand trophic levels, and learn why energy decreases at each level — fundamental to conservation." },
            { slug: "biogeochemical-cycles", title: "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession", hours: 2, meaning: "Elements like carbon and nitrogen circulate between living things and the environment. Students study these cycles and ecological succession — how barren land gradually becomes a thriving forest over time." },
            { slug: "ecological-adaptation", title: "Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes", hours: 1, meaning: "Organisms adapt to survive in their specific environments. Students study how water plants (hydrophytes) and drought-tolerant plants (xerophytes) are structurally adapted to their habitats in Nepal." },
            { slug: "ecological-imbalances", title: "Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion", hours: 1, meaning: "Human activities are disrupting natural environmental balance. Students learn about climate change, ozone depletion, acid rain, and invasive species — urgent issues affecting Nepal's mountains and valleys.", modifiedInYear: 2081 },
          ],
        },
        {
          id: "vegetation",
          title: "Vegetation",
          hours: 3,
          topics: [
            { slug: "vegetation-types", title: "Vegetation: Introduction, types of vegetation in Nepal", hours: 2, meaning: "Nepal's vegetation ranges from subtropical sal forests to alpine grasslands due to its altitude variation. Students map these vegetation zones and understand what determines where different plants grow." },
            { slug: "conservation-in-situ-ex-situ", title: "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation", hours: 1, meaning: "Conservation happens either in natural habitats (in-situ) or outside them (ex-situ). Students learn about Nepal's protected areas, botanical gardens, and seed banks as strategies to protect endangered species." },
          ],
        },
        {
          id: "introduction-to-biology",
          title: "Introduction to Biology",
          hours: 2,
          topics: [
            { slug: "scope-fields", title: "Introduction to Biology: Scope and fields of biology", hours: 1, meaning: "Biology is the scientific study of life in all its forms. Students explore the broad scope of biology and its many branches — from botany and zoology to genetics and ecology." },
            { slug: "relation-with-other-sciences", title: "Relation of biology with other sciences", hours: 1, meaning: "Biology connects deeply with chemistry, physics, and mathematics. Students understand how scientific disciplines overlap, such as biochemistry, biophysics, and computational biology." },
          ],
        },
        {
          id: "evolutionary-biology",
          title: "Evolutionary Biology",
          hours: 15,
          topics: [
            { slug: "origin-of-life", title: "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment", hours: 2, meaning: "How did life first begin on Earth? Students study the Oparin-Haldane chemical evolution theory and Miller-Urey's famous experiment that simulated early Earth conditions to produce organic molecules." },
            { slug: "evidences-evolution", title: "Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical", hours: 5, meaning: "Multiple lines of evidence prove that species change over time. Students examine fossil records, homologous structures, embryonic similarities, and DNA comparisons that support evolutionary theory." },
            { slug: "theories-evolution", title: "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism", hours: 3, meaning: "Different scientists proposed different mechanisms for evolution. Students compare Lamarck's inheritance of acquired traits, Darwin's natural selection, and the modern synthetic theory combining genetics with evolution." },
            { slug: "human-evolution", title: "Human evolution: Position of man in animal kingdom", hours: 2, meaning: "Humans are primates with a long evolutionary history. Students study where humans fit in the animal kingdom and trace the key adaptations that led to our species." },
            { slug: "monkeys-apes-man", title: "Differences between new world monkeys and old-world monkeys, apes and man", hours: 1, meaning: "Not all primates are the same. Students compare New World monkeys (Americas), Old World monkeys (Africa/Asia), apes, and humans — examining physical and behavioral differences." },
            { slug: "modern-man-evolution", title: "Evolution of modern man starting from anthropoid ancestor", hours: 1, meaning: "Modern humans (Homo sapiens) evolved through several ancestral stages. Students trace the human lineage from early anthropoid ancestors through Australopithecus, Homo habilis, and finally Homo sapiens." },
          ],
        },
        {
          id: "faunal-diversity",
          title: "Faunal Diversity",
          hours: 34,
          topics: [
            { slug: "protista-outline", title: "Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples", hours: 2, meaning: "Protists are single-celled eukaryotes that don't fit into plant, animal, or fungal kingdoms. Students classify protozoans by their locomotion structures — flagella, cilia, or pseudopodia." },
            { slug: "paramecium-plasmodium", title: "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle; Economic importance of P. falciparum", hours: 2, meaning: "Paramecium is a model freshwater protist, while Plasmodium causes malaria — a major health issue in Nepal. Students study their structure, life cycles, and the economic impact of malaria parasites." },
            { slug: "animalia-organization", title: "Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals", hours: 2, meaning: "Animals are organized in increasing complexity. Students learn about tissue-level organization, body symmetries (radial vs bilateral), coeloms (body cavities), and segmentation as key animal characteristics." },
            { slug: "phyla-diagnostic", title: "Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata", hours: 4, meaning: "All animals are grouped into phyla based on fundamental body plans. Students learn the distinguishing features of each phylum — from simple sponges to complex chordates including vertebrates." },
            { slug: "earthworm-habitat", title: "Earthworm (Pheretima posthuma): Habit and habitat, external features", hours: 1, meaning: "Earthworms are vital for soil health in Nepali agriculture. Students study the habitat and external anatomy of Pheretima, learning how its segmented body is adapted for life in soil." },
            { slug: "earthworm-digestive", title: "Earthworm: Digestive system (alimentary canal and physiology of digestion)", hours: 1, meaning: "Earthworms digest soil and organic matter through a complete digestive tract. Students trace food from mouth to anus and understand how nutrients are absorbed — a model for understanding animal digestion." },
            { slug: "earthworm-excretory", title: "Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)", hours: 2, meaning: "Earthworms excrete waste through nephridia and coordinate movement through a simple nervous system. Students learn how these systems work together to maintain the worm's internal environment." },
            { slug: "earthworm-reproductive", title: "Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance", hours: 2, meaning: "Earthworms are hermaphrodites with both male and female organs. Students study their cross-fertilization process, cocoon formation, and why earthworms are economically important for farming." },
            { slug: "frog-habitat", title: "Frog (Rana tigrina): Habit and habitat, external features", hours: 1, meaning: "The tiger frog (Rana tigrina) is common in Nepal's rice fields and ponds. Students study its external anatomy — streamlined body, webbed feet, and moist skin adapted for amphibious life." },
            { slug: "frog-digestive", title: "Frog: Digestive system (alimentary canal, digestive glands and physiology of digestion)", hours: 1, meaning: "Frogs have a complete digestive system adapted for carnivorous feeding. Students study the alimentary canal and associated glands, understanding how insects and small prey are digested." },
            { slug: "frog-circulatory", title: "Frog: Blood vascular system (structure and working mechanism of heart)", hours: 1, meaning: "Frogs have a closed circulatory system with a three-chambered heart. Students study how blood flows through the heart and body, comparing it to the human four-chambered heart." },
            { slug: "frog-respiratory", title: "Frog: Respiratory system (respiratory organs and physiology of respiration)", hours: 1, meaning: "Frogs breathe through lungs, skin, and the lining of their mouth — a feature called cutaneous respiration. Students study these multiple respiratory surfaces and how gas exchange works in amphibians." },
            { slug: "frog-reproductive", title: "Frog: Reproductive system (male and female reproductive organs)", hours: 1, meaning: "Frogs reproduce in water through external fertilization. Students study the male and female reproductive organs and understand the breeding biology of this important amphibian group." },
          ],
        },
        {
          id: "biota-environment",
          title: "Biota and Environment",
          hours: 10,
          topics: [
            { slug: "animal-adaptation", title: "Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation", hours: 3, meaning: "Animals are specially designed for their way of life. Students study how aquatic animals swim, terrestrial animals run or dig, and flying animals are built for flight — all as evolutionary adaptations." },
            { slug: "animal-behavior", title: "Animal behavior: Reflex action, taxes, dominance and leadership. Fish and bird migration", hours: 4, meaning: "Animal behavior reveals how organisms respond to their environment. Students study reflex actions, social hierarchies, and the incredible migrations of fish and birds — phenomena visible in Nepal." },
            { slug: "environmental-pollution", title: "Environmental pollution: Sources, effects and control measures of air, water and soil pollution. Pesticides and their effects", hours: 3, meaning: "Pollution threatens Nepal's air, water, and soil quality. Students identify pollution sources, understand their health and environmental effects, and learn about pesticide contamination in agriculture." },
          ],
        },
        {
          id: "conservation-biology",
          title: "Conservation Biology",
          hours: 4,
          topics: [
            { slug: "conservation-concept", title: "Conservation biology: Concept of biodiversity, biodiversity conservation", hours: 1, meaning: "Biodiversity means the variety of all life forms — genes, species, and ecosystems. Students understand why biodiversity is valuable and what conservation biology aims to protect it." },
            { slug: "protected-areas", title: "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites", hours: 1, meaning: "Nepal protects its biodiversity through national parks and reserves. Students study Chitwan, Sagarmatha, and other protected areas, plus Nepal's Ramsar wetland sites and global biodiversity hotspots." },
            { slug: "wildlife-conservation", title: "Wildlife: Importance, causes of extinction and conservation strategies. IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species. Endangered species in Nepal", hours: 1, meaning: "Species extinction is accelerating worldwide. Students learn IUCN threat categories and study Nepal's endangered species like the one-horned rhinoceros and Bengal tiger and conservation efforts to save them.", modifiedInYear: 2081 },
            { slug: "climate-change-bio", title: "Climate change impacts on biodiversity and conservation strategies", hours: 1, meaning: "Climate change is altering habitats and threatening species across Nepal. Students study how rising temperatures and changing rainfall affect biodiversity and what conservation strategies can help protect vulnerable ecosystems.", addedInYear: 2081 },
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
            { slug: "plant-anatomy-concept", title: "Plant anatomy: Concept of tissues, types of plant tissues (meristems and permanent tissues)", hours: 2, meaning: "Plant tissues are groups of cells that perform specific functions. Students distinguish meristematic tissues (dividing cells) from permanent tissues (specialized cells) that make up roots, stems, and leaves." },
            { slug: "anatomy-dicot-monocot", title: "Anatomy of dicot and monocot root, stem and leaf", hours: 3, meaning: "Dicots and monocots have different internal structures despite looking similar externally. Students compare the cross-sections of roots, stems, and leaves to understand how plant anatomy relates to function." },
            { slug: "secondary-growth", title: "Secondary growth of dicot stem", hours: 2, meaning: "Trees get thicker through secondary growth driven by vascular cambium. Students study how this process produces wood and bark, explaining the growth rings visible in Himalayan timber trees." },
            { slug: "plant-tissues-functions", title: "Investigate the structures and functions of plant tissues, and factors affecting plant growth", hours: 1, meaning: "Understanding plant tissues helps explain how crops grow and respond to conditions. Students investigate tissue structure-function relationships and identify factors like light, water, and nutrients that affect growth." },
          ],
        },
        {
          id: "plant-physiology",
          title: "Plant Physiology",
          hours: 20,
          topics: [
            { slug: "water-relation", title: "Water relation: Introduction and significance of diffusion, osmosis, and plasmolysis, ascent of sap, transpiration and guttation", hours: 4, meaning: "Water movement is critical for plant survival. Students learn how water enters roots by osmosis, travels up the stem, and exits through leaves — processes that determine crop productivity in Nepal's climate." },
            { slug: "photosynthesis", title: "Photosynthesis: Introduction and significance of photosynthesis, photosynthetic pigments, mechanism of photosynthesis (photochemical phase and Calvin-Benson cycle), C3 and C4 plants, photorespiration, factors affecting photosynthesis", hours: 5, meaning: "Photosynthesis converts sunlight into chemical energy — the foundation of all food chains. Students study the light and dark reactions, C3 vs C4 pathways, and how factors like light and CO₂ affect crop yields." },
            { slug: "respiration", title: "Respiration: Introduction and significance of respiration, types of respiration, mechanism of respiration (glycolysis, Kreb cycle, electron transport system), factors affecting respiration", hours: 5, meaning: "Respiration releases energy from food to power life processes. Students trace glucose through glycolysis, the Krebs cycle, and the electron transport chain — the same metabolic pathways that operate in human cells too." },
            { slug: "plant-hormones", title: "Plant hormones: Introduction, physiological effects of auxins, gibberellins and Cytokinins", hours: 3, meaning: "Plant hormones are chemical messengers that control growth and development. Students study auxins (growth direction), gibberellins (stem elongation), and cytokinins (cell division) — hormones used in Nepali agriculture." },
            { slug: "plant-growth-movement", title: "Plant growth and movement: Concept on seed germination, dormancy, photoperiodism, vernalization, senescence; plant movements (tropic and nastic)", hours: 3, meaning: "Plants respond to environmental signals through growth and movement. Students learn how seeds germinate, how day length controls flowering (photoperiodism), and how plants bend toward light — key concepts for farming." },
          ],
        },
        {
          id: "genetics",
          title: "Genetics",
          hours: 21,
          topics: [
            { slug: "genetic-materials", title: "Genetic Materials: Introduction to genetics and genetic materials, composition, structure and function of DNA and RNA, DNA replication, introduction of genetic code", hours: 5, meaning: "DNA is the molecule of heredity that carries instructions for life. Students study the double helix structure of DNA, how it replicates, and how the genetic code translates into proteins — the basis of all inheritance." },
            { slug: "mendelian-genetics", title: "Mendelian genetics: General terminology, Mendel's experiment and laws of inheritance, gene interactions (incomplete dominance, codominance)", hours: 6, meaning: "Mendel's pea plant experiments established the fundamental laws of inheritance. Students learn dominant and recessive traits, predict offspring outcomes with Punnett squares, and understand exceptions like incomplete dominance and codominance." },
            { slug: "linkage-crossing-over", title: "Linkage and crossing over: Concept and types of linkage (complete and incomplete), sex-linked inheritance (colour blindness in man and eye colour of Drosophila), concept and significances of crossing over", hours: 5, meaning: "Genes on the same chromosome tend to be inherited together (linkage), but crossing over creates new combinations. Students study sex-linked disorders like colour blindness and how recombination increases genetic diversity." },
            { slug: "mutation-polyploidy", title: "Mutation and polyploidy: Concept, type (gene and chromosomal mutation), importance of mutation (positive and negative), polyploidy (origin and significance)", hours: 5, meaning: "Mutations are changes in DNA that create genetic variation. Students study gene and chromosomal mutations, their harmful and beneficial effects, and polyploidy — a key mechanism in plant evolution and crop breeding." },
          ],
        },
        {
          id: "embryology",
          title: "Embryology",
          hours: 8,
          topics: [
            { slug: "reproduction-angiosperms", title: "Asexual and sexual reproductions in angiosperms, pollination, fertilization", hours: 2, meaning: "Flowering plants reproduce through both sexual and asexual means. Students study pollination, double fertilization, and how seeds and fruits form — processes essential for agriculture and food production." },
            { slug: "gametophyte-dev", title: "Development of male and female gametophytes", hours: 2, meaning: "Gametophytes are the haploid phase in the plant life cycle. Students trace pollen grain (male) and embryo sac (female) development inside the flower, understanding how sperm and egg cells are produced." },
            { slug: "embryo-dev", title: "Development of dicot and monocot embryos", hours: 2, meaning: "The embryo is the young plant inside the seed. Students compare how dicot and monocot embryos develop, understanding the difference between two-seeded and one-seeded plants that dominate Nepali agriculture." },
            { slug: "endosperm", title: "Concept of endosperm", hours: 2, meaning: "Endosperm is the nutritive tissue that feeds the developing embryo. Students understand how endosperm forms, its role in seed storage (like in grains), and its importance as a food source for humans." },
          ],
        },
        {
          id: "biotechnology",
          title: "Biotechnology",
          hours: 7,
          topics: [
            { slug: "biotech-intro", title: "Introduction to biotechnology, tissue culture, plant breeding, disease resistance plants, green manure and biofertilizer", hours: 3, meaning: "Biotechnology applies biological principles to create useful products. Students explore tissue culture, plant breeding for higher yields, disease-resistant crops, and sustainable practices like biofertilizers important to Nepali farmers." },
            { slug: "biopesticide", title: "Biopesticides and their applications", hours: 1, meaning: "Biopesticides are naturally derived pest controls that are safer than chemical pesticides. Students learn about biopesticide types and their role in sustainable agriculture — increasingly relevant as Nepal moves toward organic farming.", addedInYear: 2081 },
            { slug: "gmo-applications", title: "Genetic engineering and GMOs (genetically modified organisms) and application, bioengineering, food safety and food security", hours: 2, meaning: "GMOs are organisms whose DNA has been artificially modified. Students study genetic engineering techniques, the applications of GMOs in agriculture, and the ongoing debates around food safety and regulatory considerations.", modifiedInYear: 2081 },
            { slug: "tissue-culture", title: "Tissue culture techniques and applications in agriculture", hours: 1, meaning: "Tissue culture allows plants to be grown from small tissue samples in the lab. Students learn micropropagation techniques and their agricultural applications — a technology with growing importance in Nepal's horticulture sector.", addedInYear: 2081 },
          ],
        },
        {
          id: "animal-tissues",
          title: "Animal Tissues",
          hours: 8,
          topics: [
            { slug: "animal-tissues-types", title: "Types of animal tissues: epithelial, connective, muscular and nervous and their functions", hours: 3, meaning: "All animal bodies are built from four basic tissue types. Students learn how epithelial tissue forms barriers, connective tissue provides support, muscle tissue enables movement, and nervous tissue coordinates body functions." },
            { slug: "animal-tissues-subtypes", title: "Structure, functions & location of different sub-types of four main animal tissues", hours: 3, meaning: "Each tissue type has specialized sub-types suited to different organs. Students examine detailed structures like striated vs smooth muscle, dense vs loose connective tissue, and where each is found in the body." },
            { slug: "nervous-tissue", title: "Nervous tissue with their structures and functions", hours: 1, meaning: "Nervous tissue is the body's communication network. Students study neurons and neuroglia, understanding how nerve cells transmit electrical signals to control every body function." },
            { slug: "cartilage-bone", title: "Cartilage and bones composition and structure", hours: 1, meaning: "Cartilage and bone are specialized connective tissues forming the skeletal system. Students compare their structure, composition, and functions — from joint cushioning to blood cell production in bone marrow." },
          ],
        },
        {
          id: "developmental-biology",
          title: "Developmental Biology",
          hours: 6,
          topics: [
            { slug: "gametogenesis", title: "Spermatogenesis & Oogenesis", hours: 2, meaning: "Gametogenesis produces sperm and egg cells through meiosis. Students study how diploid cells divide to form haploid gametes — the process that ensures each generation has the correct number of chromosomes." },
            { slug: "frog-development", title: "Development of frog: fertilization, cleavage, morulation, blastulation, gastrulation, organogenesis", hours: 4, meaning: "Frog development is a classic model for studying embryology. Students trace the journey from a fertilized egg through cleavage, blastula, gastrula, and organ formation — revealing fundamental principles of animal development." },
          ],
        },
        {
          id: "human-biology",
          title: "Human Biology",
          hours: 28,
          topics: [
            { slug: "digestive-system", title: "Digestive system: Alimentary canal and digestive glands, physiology of digestion", hours: 2, meaning: "Digestion breaks down food into absorbable nutrients. Students trace the alimentary canal from mouth to anus and study how digestive glands — salivary, gastric, pancreatic, and hepatic — chemically break down food." },
            { slug: "respiratory-system", title: "Respiratory system: Respiratory organs, respiratory mechanism, exchange of gases, transport of gases and regulation of respiration", hours: 2, meaning: "Respiration brings oxygen into the body and removes carbon dioxide. Students study the lungs, breathing mechanism, gas exchange in alveoli, and how the brain regulates breathing rate during activity." },
            { slug: "circulatory-system", title: "Circulatory system: Double circulation, heart (structure and working mechanism), origin and conduction of heart beat, cardiac cycle, cardiac output, arterial and venous systems, blood grouping, blood pressure", hours: 4, meaning: "The circulatory system transports nutrients, gases, and waste throughout the body. Students study the heart's four-chambered structure, the cardiac cycle, blood groups, and blood pressure — knowledge vital for understanding human health." },
            { slug: "excretory-system", title: "Excretory system: Modes of excretion (ammonotelism, ureotelism, uricotelism), excretory organs, mechanism of urine formation", hours: 3, meaning: "Excretion removes metabolic waste to maintain internal balance. Students compare how different animals excrete waste and study the human kidney's nephron — the unit that filters blood and forms urine." },
            { slug: "nervous-system", title: "Nervous system: Types of nervous system (central, peripheral & autonomous), structure and function of brain, origin and conduction of nerve impulse", hours: 3, meaning: "The nervous system controls and coordinates all body activities. Students study the brain, spinal cord, and peripheral nerves, understanding how nerve impulses travel and how the body responds to stimuli." },
            { slug: "sense-organs", title: "Sense organs: Structure and functions of eye and ear", hours: 2, meaning: "Sense organs convert environmental stimuli into nerve impulses. Students study the structure of the eye (vision) and ear (hearing and balance) — understanding common conditions like近视 (myopia) and hearing loss relevant to students' lives." },
            { slug: "endocrinology", title: "Endocrinology: Endocrine glands and hormones — structure & functions of hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; hypo- and hyper-activity and related disorders", hours: 9, meaning: "Hormones are chemical messengers that regulate growth, metabolism, and reproduction. Students study each endocrine gland, its hormones, and the disorders caused by too much or too little — such as diabetes, goitre, and growth disorders." },
            { slug: "reproductive-system", title: "Reproductive system: Male and female reproductive organs, ovarian & menstrual cycle", hours: 3, meaning: "The reproductive system produces gametes and sex hormones. Students study male and female anatomy, the menstrual cycle, and ovulation — foundational knowledge for understanding human reproduction and health." },
          ],
        },
        {
          id: "human-population-health",
          title: "Human Population and Health Disorders",
          hours: 6,
          topics: [
            { slug: "human-population", title: "Human Population: Growth problem and control strategies, Concept of demographic cycle", hours: 2, meaning: "Nepal's population growth presents challenges for resources and development. Students study population dynamics, the demographic transition cycle, and family planning strategies to achieve sustainable growth." },
            { slug: "health-disorders", title: "Health disorders: Concept of cardiovascular, respiratory & renal disorders; Substance abuse: Drug, alcohol and smoking abuse", hours: 4, meaning: "Non-communicable diseases and substance abuse are growing health concerns in Nepal. Students study cardiovascular, respiratory, and kidney disorders, plus the devastating effects of drug, alcohol, and tobacco addiction." },
          ],
        },
        {
          id: "applied-biology",
          title: "Applied Biology",
          hours: 16,
          topics: [
            { slug: "tissue-organ-transplant", title: "Application of Zoology: Tissue and organs transplantation, in-vitro fertilization (IVF), amniocentesis, concept of genetically modified organisms (transgenic animals). Poultry farming and fish farming", hours: 6, meaning: "Modern zoology has remarkable medical and agricultural applications. Students study organ transplantation, IVF, amniocentesis, transgenic animals, and aquaculture — technologies shaping healthcare and food production in Nepal." },
            { slug: "microbial-diseases", title: "Microbial diseases and application of microbiology: Risk and hazard group of microorganisms. Introduction, causative agents, symptoms, prevention and control measures of selected human diseases: Typhoid, Tuberculosis and HIV infection, cholera, influenza, hepatitis, candidiasis", hours: 4, meaning: "Microbial diseases remain a leading health challenge in Nepal. Students study the causes, symptoms, and prevention of typhoid, TB, HIV, cholera, influenza, hepatitis, and candidiasis — common diseases in the region." },
            { slug: "immunology-vaccines", title: "Basic concepts of immunology—vaccines", hours: 2, meaning: "The immune system defends the body against pathogens. Students learn how vaccines train the immune system to recognize and fight diseases — the principle behind Nepal's national immunization program." },
            { slug: "microbe-applications", title: "Application of microorganisms in dairy and beverage industries, microbial contamination of water, sewage and drinking water treatment, bio-control agents and bio-fertilizers", hours: 2, meaning: "Microorganisms are invaluable industrial and agricultural allies. Students study how microbes produce yogurt, cheese, and beverages, treat sewage and drinking water, and serve as biocontrol agents and biofertilizers in farming.", modifiedInYear: 2081 },
            { slug: "enzyme-technology", title: "Technological applications of enzymes in industrial processes, and evaluate technological advances in the field of cellular biology", hours: 2, meaning: "Enzymes are biological catalysts used across industries. Students explore enzyme applications in food processing, textiles, and pharmaceuticals, and evaluate how cellular biology advances are driving biotechnological innovation." },
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
            { slug: "plant-anatomy-concept", title: "Plant anatomy: Concept of tissues, types of plant tissues (meristems and permanent tissues)", hours: 2, meaning: "Plant tissues are groups of cells that perform specific functions. Students distinguish meristematic tissues (dividing cells) from permanent tissues (specialized cells) that make up roots, stems, and leaves." },
            { slug: "anatomy-dicot-monocot", title: "Anatomy of dicot and monocot root, stem and leaf", hours: 3, meaning: "Dicots and monocots have different internal structures despite looking similar externally. Students compare the cross-sections of roots, stems, and leaves to understand how plant anatomy relates to function." },
            { slug: "secondary-growth", title: "Secondary growth of dicot stem", hours: 2, meaning: "Trees get thicker through secondary growth driven by vascular cambium. Students study how this process produces wood and bark, explaining the growth rings visible in Himalayan timber trees." },
            { slug: "plant-tissues-functions", title: "Investigate the structures and functions of plant tissues, and factors affecting plant growth", hours: 1, meaning: "Understanding plant tissues helps explain how crops grow and respond to conditions. Students investigate tissue structure-function relationships and identify factors like light, water, and nutrients that affect growth." },
          ],
        },
        {
          id: "plant-physiology",
          title: "Plant Physiology",
          hours: 20,
          topics: [
            { slug: "water-relation", title: "Water relation: Introduction and significance of diffusion, osmosis, and plasmolysis, ascent of sap, transpiration and guttation", hours: 4, meaning: "Water movement is critical for plant survival. Students learn how water enters roots by osmosis, travels up the stem, and exits through leaves — processes that determine crop productivity in Nepal's climate." },
            { slug: "photosynthesis", title: "Photosynthesis: Introduction and significance of photosynthesis, photosynthetic pigments, mechanism of photosynthesis (photochemical phase and Calvin-Benson cycle), C3 and C4 plants, photorespiration, factors affecting photosynthesis", hours: 5, meaning: "Photosynthesis converts sunlight into chemical energy — the foundation of all food chains. Students study the light and dark reactions, C3 vs C4 pathways, and how factors like light and CO₂ affect crop yields." },
            { slug: "respiration", title: "Respiration: Introduction and significance of respiration, types of respiration, mechanism of respiration (glycolysis, Kreb cycle, electron transport system), factors affecting respiration", hours: 5, meaning: "Respiration releases energy from food to power life processes. Students trace glucose through glycolysis, the Krebs cycle, and the electron transport chain — the same metabolic pathways that operate in human cells too." },
            { slug: "plant-hormones", title: "Plant hormones: Introduction, physiological effects of auxins, gibberellins and Cytokinins", hours: 3, meaning: "Plant hormones are chemical messengers that control growth and development. Students study auxins (growth direction), gibberellins (stem elongation), and cytokinins (cell division) — hormones used in Nepali agriculture." },
            { slug: "plant-growth-movement", title: "Plant growth and movement: Concept on seed germination, dormancy, photoperiodism, vernalization, senescence; plant movements (tropic and nastic)", hours: 3, meaning: "Plants respond to environmental signals through growth and movement. Students learn how seeds germinate, how day length controls flowering (photoperiodism), and how plants bend toward light — key concepts for farming." },
          ],
        },
        {
          id: "genetics",
          title: "Genetics",
          hours: 21,
          topics: [
            { slug: "genetic-materials", title: "Genetic Materials: Introduction to genetics and genetic materials, composition, structure and function of DNA and RNA, DNA replication, introduction of genetic code", hours: 5, meaning: "DNA is the molecule of heredity that carries instructions for life. Students study the double helix structure of DNA, how it replicates, and how the genetic code translates into proteins — the basis of all inheritance." },
            { slug: "mendelian-genetics", title: "Mendelian genetics: General terminology, Mendel's experiment and laws of inheritance, gene interactions (incomplete dominance, codominance)", hours: 6, meaning: "Mendel's pea plant experiments established the fundamental laws of inheritance. Students learn dominant and recessive traits, predict offspring outcomes with Punnett squares, and understand exceptions like incomplete dominance and codominance." },
            { slug: "linkage-crossing-over", title: "Linkage and crossing over: Concept and types of linkage (complete and incomplete), sex-linked inheritance (colour blindness in man and eye colour of Drosophila), concept and significances of crossing over", hours: 5, meaning: "Genes on the same chromosome tend to be inherited together (linkage), but crossing over creates new combinations. Students study sex-linked disorders like colour blindness and how recombination increases genetic diversity." },
            { slug: "mutation-polyploidy", title: "Mutation and polyploidy: Concept, type (gene and chromosomal mutation), importance of mutation (positive and negative), polyploidy (origin and significance)", hours: 5, meaning: "Mutations are changes in DNA that create genetic variation. Students study gene and chromosomal mutations, their harmful and beneficial effects, and polyploidy — a key mechanism in plant evolution and crop breeding." },
          ],
        },
        {
          id: "embryology",
          title: "Embryology",
          hours: 8,
          topics: [
            { slug: "reproduction-angiosperms", title: "Asexual and sexual reproductions in angiosperms, pollination, fertilization", hours: 2, meaning: "Flowering plants reproduce through both sexual and asexual means. Students study pollination, double fertilization, and how seeds and fruits form — processes essential for agriculture and food production." },
            { slug: "gametophyte-dev", title: "Development of male and female gametophytes", hours: 2, meaning: "Gametophytes are the haploid phase in the plant life cycle. Students trace pollen grain (male) and embryo sac (female) development inside the flower, understanding how sperm and egg cells are produced." },
            { slug: "embryo-dev", title: "Development of dicot and monocot embryos", hours: 2, meaning: "The embryo is the young plant inside the seed. Students compare how dicot and monocot embryos develop, understanding the difference between two-seeded and one-seeded plants that dominate Nepali agriculture." },
            { slug: "endosperm", title: "Concept of endosperm", hours: 2, meaning: "Endosperm is the nutritive tissue that feeds the developing embryo. Students understand how endosperm forms, its role in seed storage (like in grains), and its importance as a food source for humans." },
          ],
        },
        {
          id: "biotechnology",
          title: "Biotechnology",
          hours: 9,
          topics: [
            { slug: "biotech-intro", title: "Introduction to biotechnology, tissue culture, plant breeding, disease resistance plants, green manure and biofertilizer", hours: 3, meaning: "Biotechnology applies biological principles to create useful products. Students explore tissue culture, plant breeding for higher yields, disease-resistant crops, and sustainable practices like biofertilizers important to Nepali farmers." },
            { slug: "biopesticide", title: "Biopesticides: Types, mechanisms, and applications in sustainable agriculture", hours: 2, meaning: "Biopesticides are environmentally friendly pest controls derived from natural materials. Students study different types of biopesticides, how they work, and their applications in sustainable and organic agriculture in Nepal.", addedInYear: 2081 },
            { slug: "gmo-applications", title: "Genetic engineering and GMOs (genetically modified organisms): Principles, applications, food safety and regulatory considerations", hours: 2, meaning: "GMOs are organisms whose DNA has been artificially modified for beneficial traits. Students study the principles of genetic engineering, GMO applications in agriculture and medicine, and the food safety debates surrounding them.", modifiedInYear: 2081 },
            { slug: "tissue-culture", title: "Tissue culture: Meristem culture, somatic embryogenesis, haploid production, cryopreservation and commercial applications", hours: 2, meaning: "Tissue culture is a powerful technique for propagating plants and preserving genetic material. Students study meristem culture, somatic embryogenesis, haploid production, cryopreservation, and how these methods are used commercially in Nepal's agriculture.", addedInYear: 2081 },
          ],
        },
        {
          id: "animal-tissues",
          title: "Animal Tissues",
          hours: 8,
          topics: [
            { slug: "animal-tissues-types", title: "Types of animal tissues: epithelial, connective, muscular and nervous and their functions", hours: 3, meaning: "All animal bodies are built from four basic tissue types. Students learn how epithelial tissue forms barriers, connective tissue provides support, muscle tissue enables movement, and nervous tissue coordinates body functions." },
            { slug: "animal-tissues-subtypes", title: "Structure, functions & location of different sub-types of four main animal tissues", hours: 3, meaning: "Each tissue type has specialized sub-types suited to different organs. Students examine detailed structures like striated vs smooth muscle, dense vs loose connective tissue, and where each is found in the body." },
            { slug: "nervous-tissue", title: "Nervous tissue with their structures and functions", hours: 1, meaning: "Nervous tissue is the body's communication network. Students study neurons and neuroglia, understanding how nerve cells transmit electrical signals to control every body function." },
            { slug: "cartilage-bone", title: "Cartilage and bones composition and structure", hours: 1, meaning: "Cartilage and bone are specialized connective tissues forming the skeletal system. Students compare their structure, composition, and functions — from joint cushioning to blood cell production in bone marrow." },
          ],
        },
        {
          id: "developmental-biology",
          title: "Developmental Biology",
          hours: 6,
          topics: [
            { slug: "gametogenesis", title: "Spermatogenesis & Oogenesis", hours: 2, meaning: "Gametogenesis produces sperm and egg cells through meiosis. Students study how diploid cells divide to form haploid gametes — the process that ensures each generation has the correct number of chromosomes." },
            { slug: "frog-development", title: "Development of frog: fertilization, cleavage, morulation, blastulation, gastrulation, organogenesis", hours: 4, meaning: "Frog development is a classic model for studying embryology. Students trace the journey from a fertilized egg through cleavage, blastula, gastrula, and organ formation — revealing fundamental principles of animal development." },
          ],
        },
        {
          id: "human-biology",
          title: "Human Biology",
          hours: 28,
          topics: [
            { slug: "digestive-system", title: "Digestive system: Alimentary canal and digestive glands, physiology of digestion", hours: 2, meaning: "Digestion breaks down food into absorbable nutrients. Students trace the alimentary canal from mouth to anus and study how digestive glands — salivary, gastric, pancreatic, and hepatic — chemically break down food." },
            { slug: "respiratory-system", title: "Respiratory system: Respiratory organs, respiratory mechanism, exchange of gases, transport of gases and regulation of respiration", hours: 2, meaning: "Respiration brings oxygen into the body and removes carbon dioxide. Students study the lungs, breathing mechanism, gas exchange in alveoli, and how the brain regulates breathing rate during activity." },
            { slug: "circulatory-system", title: "Circulatory system: Double circulation, heart (structure and working mechanism), origin and conduction of heart beat, cardiac cycle, cardiac output, arterial and venous systems, blood grouping, blood pressure", hours: 4, meaning: "The circulatory system transports nutrients, gases, and waste throughout the body. Students study the heart's four-chambered structure, the cardiac cycle, blood groups, and blood pressure — knowledge vital for understanding human health." },
            { slug: "excretory-system", title: "Excretory system: Modes of excretion (ammonotelism, ureotelism, uricotelism), excretory organs, mechanism of urine formation", hours: 3, meaning: "Excretion removes metabolic waste to maintain internal balance. Students compare how different animals excrete waste and study the human kidney's nephron — the unit that filters blood and forms urine." },
            { slug: "nervous-system", title: "Nervous system: Types of nervous system (central, peripheral & autonomous), structure and function of brain, origin and conduction of nerve impulse", hours: 3, meaning: "The nervous system controls and coordinates all body activities. Students study the brain, spinal cord, and peripheral nerves, understanding how nerve impulses travel and how the body responds to stimuli." },
            { slug: "sense-organs", title: "Sense organs: Structure and functions of eye and ear", hours: 2, meaning: "Sense organs convert environmental stimuli into nerve impulses. Students study the structure of the eye (vision) and ear (hearing and balance) — understanding common conditions like myopia and hearing loss relevant to students' lives." },
            { slug: "endocrinology", title: "Endocrinology: Endocrine glands and hormones — structure & functions of hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; hypo- and hyper-activity and related disorders", hours: 9, meaning: "Hormones are chemical messengers that regulate growth, metabolism, and reproduction. Students study each endocrine gland, its hormones, and the disorders caused by too much or too little — such as diabetes, goitre, and growth disorders." },
            { slug: "reproductive-system", title: "Reproductive system: Male and female reproductive organs, ovarian & menstrual cycle", hours: 3, meaning: "The reproductive system produces gametes and sex hormones. Students study male and female anatomy, the menstrual cycle, and ovulation — foundational knowledge for understanding human reproduction and health." },
          ],
        },
        {
          id: "human-population-health",
          title: "Human Population and Health Disorders",
          hours: 6,
          topics: [
            { slug: "human-population", title: "Human Population: Growth problem and control strategies, Concept of demographic cycle", hours: 2, meaning: "Nepal's population growth presents challenges for resources and development. Students study population dynamics, the demographic transition cycle, and family planning strategies to achieve sustainable growth." },
            { slug: "health-disorders", title: "Health disorders: Concept of cardiovascular, respiratory & renal disorders; Substance abuse: Drug, alcohol and smoking abuse", hours: 4, meaning: "Non-communicable diseases and substance abuse are growing health concerns in Nepal. Students study cardiovascular, respiratory, and kidney disorders, plus the devastating effects of drug, alcohol, and tobacco addiction." },
          ],
        },
        {
          id: "applied-biology",
          title: "Applied Biology",
          hours: 18,
          topics: [
            { slug: "tissue-organ-transplant", title: "Application of Zoology: Tissue and organs transplantation, in-vitro fertilization (IVF), amniocentesis, concept of genetically modified organisms (transgenic animals). Poultry farming and fish farming", hours: 6, meaning: "Modern zoology has remarkable medical and agricultural applications. Students study organ transplantation, IVF, amniocentesis, transgenic animals, and aquaculture — technologies shaping healthcare and food production in Nepal." },
            { slug: "microbial-diseases", title: "Microbial diseases and application of microbiology: Risk and hazard group of microorganisms. Introduction, causative agents, symptoms, prevention and control measures of selected human diseases: Typhoid, Tuberculosis and HIV infection, cholera, influenza, hepatitis, candidiasis", hours: 4, meaning: "Microbial diseases remain a leading health challenge in Nepal. Students study the causes, symptoms, and prevention of typhoid, TB, HIV, cholera, influenza, hepatitis, and candidiasis — common diseases in the region." },
            { slug: "immunology-vaccines", title: "Basic concepts of immunology—vaccines", hours: 2, meaning: "The immune system defends the body against pathogens. Students learn how vaccines train the immune system to recognize and fight diseases — the principle behind Nepal's national immunization program." },
            { slug: "microbe-applications", title: "Application of microorganisms in dairy and beverage industries, microbial contamination of water, sewage and drinking water treatment, bio-control agents and bio-fertilizers", hours: 2, meaning: "Microorganisms are invaluable industrial and agricultural allies. Students study how microbes produce yogurt, cheese, and beverages, treat sewage and drinking water, and serve as biocontrol agents and biofertilizers in farming.", modifiedInYear: 2081 },
            { slug: "enzyme-technology", title: "Technological applications of enzymes in industrial processes, and evaluate technological advances in the field of cellular biology", hours: 2, meaning: "Enzymes are biological catalysts used across industries. Students explore enzyme applications in food processing, textiles, and pharmaceuticals, and evaluate how cellular biology advances are driving biotechnological innovation." },
            { slug: "climate-change-health", title: "Climate change impacts on human health and disease patterns in Nepal", hours: 2, meaning: "Climate change is altering the spread of diseases and affecting public health in Nepal. Students study how rising temperatures and changing rainfall patterns influence disease vectors like mosquitoes and the emergence of new health threats.", addedInYear: 2081 },
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

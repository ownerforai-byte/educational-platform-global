/**
 * Entrance Question Bank — Biology, Class 12 (Genetics → Environmental Biology).
 * Unit slugs mirror the class-12 biology syllabus (lib/syllabus.ts).
 */

import type { EntranceUnitBank } from "./types";

export const BIOLOGY_12_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["heredity-and-evolution"],
    questions: [
      { q: "Mendel's law of segregation corresponds to which meiotic event?", options: ["Separation of homologous chromosomes in anaphase I", "Crossing over in pachytene", "Independent alignment in metaphase II", "Cytokinesis"], answer: 0, why: "Allele pairs separate into different gametes — anaphase I disjunction.", exam: "CEE 2080" },
      { q: "A cross AaBb × AaBb gives the phenotypic ratio (independent assortment):", options: ["9:3:3:1", "3:1", "1:2:1", "9:7"], answer: 0, why: "Two heterozygous gene pairs multiply (3:1)² — dihybrid signature.", exam: "CEE 2079" },
      { q: "Colour blindness is:", options: ["X-linked recessive", "Y-linked", "Autosomal dominant", "Mitochondrial"], answer: 0, why: "Fathers pass the X to daughters; sons show it via carrier mothers.", exam: "IOE 2079" },
      { q: "DNA replication is:", options: ["Semi-conservative", "Conservative", "Dispersive", "Random"], answer: 0, why: "Meselson–Stahl: each daughter keeps one parental strand.", exam: "CEE 2081" },
      { q: "Down syndrome results from trisomy of chromosome:", options: ["21", "18", "13", "X"], answer: 0, why: "Non-disjunction in meiosis; 18 = Edward, 13 = Patau.", exam: "CEE 2079" },
      { q: "The genetic code is:", options: ["Triplet, degenerate, universal", "Doublet, ambiguous", "Overlapping", "Species-specific"], answer: 0, why: "3 bases per amino acid, 64 codons for 20 acids — several codons per acid.", exam: "NEB Board" },
    ],
  },
  {
    units: ["human-health-and-diseases"],
    questions: [
      { q: "Malaria is transmitted by:", options: ["Female Anopheles mosquito", "Aedes mosquito", "Culex mosquito", "Housefly"], answer: 0, why: "Plasmodium sporozoites injected during a blood meal; Aedes = dengue.", exam: "CEE 2080" },
      { q: "AIDS is caused by a virus that primarily destroys:", options: ["Helper T-lymphocytes", "RBCs", "Platelets", "Neutrophils"], answer: 0, why: "HIV binds CD4 on Th cells — immunity collapses without helpers.", exam: "CEE 2079" },
      { q: "Antibodies are:", options: ["Immunoglobulins produced by B-cells", "Produced by T-cells", "Part of complement only", "Hormones"], answer: 0, why: "Y-shaped Ig proteins; T-cells mediate cell-mediated immunity instead.", exam: "IOE 2079" },
      { q: "Typhoid is caused by:", options: ["Salmonella typhi", "Vibrio cholerae", "Plasmodium vivax", "Entamoeba"], answer: 0, why: "Widal test confirms it; cholera = Vibrio, amoebiasis = Entamoeba.", exam: "CEE 2081" },
      { q: "Cancer cells differ from normal cells by:", options: ["Uncontrolled mitosis and metastasis", "Failure to grow", "Contact inhibition remaining", "Meiotic division"], answer: 0, why: "They ignore contact inhibition and spread via blood/lymph.", exam: "NEB Board" },
    ],
  },
  {
    units: ["strategies-for-food-production"],
    questions: [
      { q: "Mule is produced by crossing:", options: ["Male donkey × female horse", "Male horse × female donkey", "Two donkeys", "Two horses"], answer: 0, why: "Hinny is the reverse — both hybrids are sterile (odd chromosome set).", exam: "CEE 2079" },
      { q: "The powerful mutagen used in crop breeding is:", options: ["Gamma rays", "Visible light", "Ultrasound", "Microwaves"], answer: 0, why: "Ionising radiation creates heritable variation for selection.", exam: "IOE 2079" },
      { q: "Inbreeding in cattle aims to:", options: ["Fix desirable traits but risks inbreeding depression", "Always improve milk yield", "Create hybrids", "Prevent mating"], answer: 0, why: "Homozygosity concentrates genes — good and bad alike.", exam: "CEE 2080" },
      { q: "Single-cell protein refers to:", options: ["Microbial biomass as food", "Isolated egg albumin", "Protein pills", "Soybean extract"], answer: 0, why: "Spirulina, Methylophilus cultures — protein from microbes on waste substrates.", exam: "NEB Board" },
      { q: "Green revolution's chief architect in crop breeding was:", options: ["Norman Borlaug", "M. S. Swaminathan", "Gregor Mendel", "Charles Darwin"], answer: 0, why: "Semi-dwarf high-yield wheat; Borlaug won the 1970 Nobel Peace Prize.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["microbes-in-human-welfare"],
    questions: [
      { q: "Curd's conversion of milk is by:", options: ["Lactobacillus lactic-acid fermentation", "Yeast alcohol fermentation", "Acetobacter oxidation", "Penicillium secretion"], answer: 0, why: "Lactic acid coagulates casein at pH ~4.5.", exam: "CEE 2080" },
      { q: "Penicillin was discovered by:", options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Selman Waksman"], answer: 0, why: "1928, from Penicillium notatum; Chain & Florey scaled it up.", exam: "CEE 2079" },
      { q: "Biogas is chiefly:", options: ["Methane", "Butane", "Hydrogen", "Carbon monoxide"], answer: 0, why: "Methanogens (Methanobacterium) in anaerobic sludge produce CH₄ 50–70%.", exam: "IOE 2079" },
      { q: "Azolla in rice paddies is useful because it:", options: ["Hosts nitrogen-fixing Anabaena", "Kills pests", "Produces growth hormone", "Is a green manure only"], answer: 0, why: "Symbiotic cyanobacterium fixes atmospheric N₂ for the paddy.", exam: "CEE 2081" },
      { q: "The first antibiotic discovered was:", options: ["Penicillin", "Streptomycin", "Tetracycline", "Chloramphenicol"], answer: 0, why: "Fleming's Penicillium observation, 1928.", exam: "NEB Board" },
    ],
  },
  {
    units: ["biotechnology-principles"],
    questions: [
      { q: "The enzyme that cuts DNA at specific palindromic sequences is:", options: ["Restriction endonuclease", "Ligase", "Polymerase", "Helicase"], answer: 0, why: "EcoRI cuts GAATTC between G and A — the molecular scissors.", exam: "CEE 2080" },
      { q: "DNA fragments are joined by:", options: ["DNA ligase", "Restriction enzyme", "Primase", "Topoisomerase"], answer: 0, why: "Seals the phosphodiester backbone between vector and insert.", exam: "CEE 2079" },
      { q: "The preferred vector for E. coli gene transfer is a:", options: ["Plasmid", "Ribosome", "Lysosome", "Chloroplast"], answer: 0, why: "Circular extrachromosomal DNA with ori + selectable marker.", exam: "IOE 2079" },
      { q: "PCR stands for:", options: ["Polymerase Chain Reaction", "Protein Catalytic Reaction", "Primary Cell Replication", "Plasmid Clone Ring"], answer: 0, why: "Thermus aquaticus Taq polymerase, denature–anneal–extend cycles.", exam: "CEE 2081" },
      { q: "Separation of DNA fragments in gel electrophoresis is:", options: ["Smaller fragments move farther", "Larger fragments move farther", "All move equally", "Depends on sequence"], answer: 0, why: "DNA is negative → migrates to anode; pore size sieves by length.", exam: "NEB Board" },
    ],
  },
  {
    units: ["biotechnology-applications"],
    questions: [
      { q: "Golden rice is engineered for:", options: ["β-carotene (provitamin A)", "Iron only", "Extra gluten", "Drought tolerance"], answer: 0, why: "Psy + crtI genes make the endosperm accumulate β-carotene.", exam: "CEE 2080" },
      { q: "Insulin from recombinant DNA is produced in:", options: ["E. coli bacteria", "Cow pancreas", "Yeast only", "Human cells"], answer: 0, why: "Human insulin genes cloned into plasmids — Humulin since 1983.", exam: "CEE 2079" },
      { q: "Gene therapy's first successful target was:", options: ["ADA deficiency (SCID)", "Diabetes", "Haemophilia", "Albinism"], answer: 0, why: "1990: functional ADA gene inserted into lymphocytes.", exam: "IOE 2079" },
      { q: "Bt cotton's insect resistance comes from:", options: ["Bacillus thuringiensis toxin genes", "Fungal genes", "Bacterial antibiotics", "Viral coat protein"], answer: 0, why: "cry genes make crystal toxins lethal to bollworm larvae in alkaline gut.", exam: "CEE 2081" },
      { q: "Transgenic animals are made to:", options: ["Study gene function & produce human proteins", "Be pets", "Replace wild species", "Produce more CO₂"], answer: 0, why: "Rosie the cow's milk carried human alpha-lactalbumin.", exam: "NEB Board" },
    ],
  },
  {
    units: ["organisms-and-environment"],
    questions: [
      { q: "Organisms able to tolerate a narrow temperature range are:", options: ["Stenothermal", "Eurythermal", "Euryhaline", "Stenohaline"], answer: 0, why: "Steno = narrow, eury = wide; -thermal for heat, -haline for salt.", exam: "CEE 2080" },
      { q: "Camel's water conservation adaptations include:", options: ["Concentrated urine & dry faeces", "Sweating freely", "Storing water in hump", "Drinking rarely by choice"], answer: 0, why: "The hump stores FAT; urine concentration spares water.", exam: "CEE 2079" },
      { q: "The logistic growth equation is:", options: ["dN/dt = rN(K−N)/K", "dN/dt = rN", "N = N₀e^(rt) forever", "dN/dt = K"], answer: 0, why: "Exponential growth modified by the (K−N)/K resistance term.", exam: "IOE 2079" },
      { q: "Mutualism is illustrated by:", options: ["Lichen (alga + fungus)", "Cuscuta on host", "Tapeworm in gut", "Cattle egret and cattle"], answer: 0, why: "Both partners benefit permanently; egret–cattle is commensalism.", exam: "CEE 2081" },
      { q: "The r-strategist species typically:", options: ["Produce many small offspring, little care", "Have few large offspring", "Live long", "Stabilise at K"], answer: 0, why: "r/K selection: quantity vs quality of offspring.", exam: "NEB Board" },
    ],
  },
  {
    units: ["biodiversity-and-conservation"],
    questions: [
      { q: "Nepal's conservation category for protected landscapes blending use and protection is:", options: ["Conservation area", "National park", "Strict nature reserve", "Hunting reserve"], answer: 0, why: "Annapurna Conservation Area is the flagship community-managed model.", exam: "CEE 2079" },
      { q: "The hottest biodiversity hotspot in Nepal's context is the:", options: ["Eastern Himalaya", "Terai savanna", "Kali Gandaki desert", "Rara Lake"], answer: 0, why: "One of 36 global hotspots; exceptional endemism under threat.", exam: "CEE 2080" },
      { q: "In-situ conservation means:", options: ["Protecting species in their natural habitat", "Zoo keeping", "Seed banks", "Cryopreservation"], answer: 0, why: "National parks/wildlife reserves; zoos & seed banks are ex-situ.", exam: "IOE 2079" },
      { q: "Species–area relationship is:", options: ["S = C·A^z", "S = C·A^−z", "S linear in A always", "Independent of area"], answer: 0, why: "Log S = log C + z log A; z ~ 0.1–0.2 on continents.", exam: "CEE 2081" },
      { q: "Amazon rainforest represents about what share of world's species?", options: ["Over 30%", "5%", "60%", "10%"], answer: 0, why: "The single largest tropical reservoir — 'lungs of the planet' cliché aside.", exam: "NEB Board" },
    ],
  },
  {
    units: ["environmental-issues"],
    questions: [
      { q: "The greenhouse gas with the highest per-molecule warming potential listed is:", options: ["SF₆ / PFCs class", "CO₂", "CH₄", "Water vapour"], answer: 0, why: "Fully-fluorinated gases trap thousands of times more IR than CO₂ per molecule.", exam: "CEE 2080" },
      { q: "Eutrophication results from:", options: ["Nutrient (N, P) enrichment of water", "Thermal pollution only", "Oil spills", "Acid rain"], answer: 0, why: "Algal bloom → O₂ depletion → fish kill.", exam: "CEE 2079" },
      { q: "The Montreal Protocol targeted:", options: ["Ozone-depleting CFCs", "CO₂ emissions", "Deforestation", "Oil spills"], answer: 0, why: "1987 phase-out schedule — the most successful environmental treaty.", exam: "IOE 2079" },
      { q: "DBT (Deeni Biosphere Reserve style) — the Kathmandu valley's chief air pollutant in dry season is:", options: ["PM2.5 particulate", "Ozone", "CFCs", "Methane"], answer: 0, why: "Vehicle + brick-kiln soot drives winter smog episodes.", exam: "CEE 2081" },
      { q: "Biochemical oxygen demand (BOD) measures:", options: ["O₂ consumed by microbes decomposing organic waste", "Total O₂ in water", "CO₂ level", "pH only"], answer: 0, why: "Higher BOD = more organic pollution = dirtier water.", exam: "NEB Board" },
    ],
  },
];

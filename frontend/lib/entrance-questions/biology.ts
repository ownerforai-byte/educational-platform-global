/**
 * Entrance Question Bank — Biology.
 * Unit slugs mirror public/data/syllabus-notes/biology/_manifest.json.
 */

import type { EntranceUnitBank } from "./types";

export const BIOLOGY_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["introduction-to-biology"],
    questions: [
      { q: "The term 'biology' was first coined by:", options: ["Lamarck and Treviranus", "Linnaeus", "Darwin", "Aristotle"], answer: 0, why: "Both coined it independently in 1802 — a fixed CEE fact.", exam: "CEE 2079" },
      { q: "Binomial nomenclature was given by:", options: ["Carolus Linnaeus", "Ernst Mayr", "Robert Hooke", "Schleiden"], answer: 0, why: "Species Plantarum (1753) — genus + species, italicised.", exam: "CEE 2080" },
      { q: "The basic unit of classification is:", options: ["Species", "Genus", "Family", "Order"], answer: 0, why: "Species is the lowest and basic taxonomic category.", exam: "IOE 2079" },
    ],
  },
  {
    units: ["biomolecules-and-cell-biology"],
    questions: [
      { q: "The powerhouse organelle with its own circular DNA is:", options: ["Mitochondrion", "Ribosome", "Lysosome", "Golgi body"], answer: 0, why: "Semi-autonomous: circular DNA + 70S ribosomes, like bacteria.", exam: "CEE 2080" },
      { q: "The 'suicidal bags' of the cell are:", options: ["Lysosomes", "Peroxisomes", "Vacuoles", "Centrioles"], answer: 0, why: "Hydrolytic enzymes at pH ~5 digest the cell when ruptured.", exam: "CEE 2079" },
      { q: "Which bond links amino acids in a protein?", options: ["Peptide bond", "Glycosidic bond", "Ester bond", "Phosphodiester bond"], answer: 0, why: "–CO–NH– condensation between –COOH and –NH₂.", exam: "CEE 2081" },
      { q: "Fluid mosaic model of plasma membrane was proposed by:", options: ["Singer and Nicolson", "Watson and Crick", "Robertson", "Schleiden"], answer: 0, why: "1972: lipid bilayer fluid with embedded mosaic proteins.", exam: "IOE 2079" },
      { q: "The sugar in DNA is:", options: ["2'-deoxyribose", "Ribose", "Glucose", "Fructose"], answer: 0, why: "No –OH at 2' carbon — hence 'deoxy'.", exam: "CEE 2080" },
      { q: "Enzymes accelerate reactions by:", options: ["Lowering activation energy", "Raising temperature", "Increasing ΔG", "Changing equilibrium"], answer: 0, why: "Catalysts never change ΔG or Keq — only the barrier height.", exam: "CEE 2079" },
      { q: "Cell theory was proposed by:", options: ["Schleiden and Schwann", "Hooke and Leeuwenhoek", "Watson and Crick", "Mendel and Sutton"], answer: 0, why: "1838–39; Virchow later added 'Omnis cellula e cellula'.", exam: "NEB Board" },
      { q: "Which organelle is absent in prokaryotes?", options: ["Membrane-bound nucleus", "Ribosomes", "Cell wall", "Plasma membrane"], answer: 0, why: "Prokaryotes have 70S ribosomes, walls and membranes — but no nucleus.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["floral-diversity"],
    questions: [
      { q: "Bacteria reproduce mainly by:", options: ["Binary fission", "Conjugation only", "Budding", "Fragmentation"], answer: 0, why: "20-min doubling by fission; conjugation is recombination, not multiplication.", exam: "CEE 2080" },
      { q: "The pigments of blue-green algae (cyanobacteria) are:", options: ["Chlorophyll a + phycocyanin", "Chlorophyll b only", "Bacteriochlorophyll", "Rhodopsin"], answer: 0, why: "c-phycoerythrin and c-phycocyanin give the blue-green tint.", exam: "CEE 2079" },
      { q: "Moss (Funaria) plant body is:", options: ["Gametophyte, haploid", "Sporophyte, diploid", "Diploid gametophyte", "Haploid sporophyte"], answer: 0, why: "The leafy green stage carries gametes; capsule is the diploid phase.", exam: "IOE 2079" },
      { q: "Double fertilisation in angiosperms produces:", options: ["Zygote (2n) + endosperm (3n)", "Two zygotes", "Two endosperms", "Zygote only"], answer: 0, why: "One sperm + egg = 2n; second sperm + polar nuclei = 3n — unique to angiosperms.", exam: "CEE 2081" },
      { q: "The infective stage of Plasmodium injected by the mosquito is:", options: ["Sporozoite", "Merozoite", "Trophozoite", "Gametocyte"], answer: 0, why: "Salivary glands carry sporozoites → liver first.", exam: "CEE 2080" },
      { q: "Mycorrhiza is a symbiosis between fungi and:", options: ["Plant roots", "Algae", "Insects", "Human gut"], answer: 0, why: "Fungus gives minerals/water; root gives sugars — Pinus depends on it.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["faunal-diversity"],
    questions: [
      { q: "The earthworm (Pheretima) respires through:", options: ["Moist skin (cutaneous)", "Gills", "Lungs", "Tracheae"], answer: 0, why: "No respiratory organs — diffusion across the damp cuticle.", exam: "CEE 2080" },
      { q: "Flame cells are the excretory organs of:", options: ["Platyhelminthes", "Annelida", "Arthropoda", "Mollusca"], answer: 0, why: "Protonephridia with flame cells in flatworms.", exam: "CEE 2079" },
      { q: "Malpighian tubules excrete in:", options: ["Insects", "Earthworms", "Frogs", "Fishes"], answer: 0, why: "Arthropod (insect) excretion — uric acid to the gut.", exam: "IOE 2079" },
      { q: "Water vascular system is characteristic of:", options: ["Echinodermata", "Mollusca", "Porifera", "Chordata"], answer: 0, why: "Starfish tube feet run on hydraulic pressure from the ring canal.", exam: "CEE 2081" },
      { q: "The largest phylum in the animal kingdom is:", options: ["Arthropoda", "Mollusca", "Chordata", "Nematoda"], answer: 0, why: "Over a million insect species alone.", exam: "CEE 2078" },
      { q: "Frog's heart has:", options: ["3 chambers — 2 atria, 1 ventricle", "2 chambers", "4 chambers", "1 chamber"], answer: 0, why: "Amphibian: two atria but a single ventricle — mixed blood.", exam: "CEE 2080" },
      { q: "Pseudocoelomate phylum among these is:", options: ["Aschelminthes (Nematoda)", "Annelida", "Platyhelminthes", "Chordata"], answer: 0, why: "Body cavity not lined by mesoderm = pseudo; flatworms are acoelomate.", exam: "IOE 2080" },
    ],
  },
  {
    units: ["introductory-microbiology"],
    questions: [
      { q: "Antibiotic penicillin was discovered by:", options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Selman Waksman"], answer: 0, why: "1928, Penicillium notatum — the classic plate accident.", exam: "CEE 2080" },
      { q: "Bacteria that oxidise ammonia to nitrite are:", options: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Azotobacter"], answer: 0, why: "Two-step nitrification: Nitrosomonas NH₃→NO₂⁻, Nitrobacter NO₂⁻→NO₃⁻.", exam: "CEE 2079" },
      { q: "Viruses that infect bacteria are called:", options: ["Bacteriophages", "Retroviruses", "Viroids", "Prions"], answer: 0, why: "T-even phages inject DNA through the tail sheath.", exam: "IOE 2079" },
      { q: "Which microorganism converts milk to curd?", options: ["Lactobacillus", "Yeast", "E. coli", "Cyanobacteria"], answer: 0, why: "Lactic-acid fermentation coagulates casein.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["vegetation", "ecology", "biota-and-environment", "conservation-biology"],
    questions: [
      { q: "The 10% law of energy transfer was given by:", options: ["Lindeman", "Odum", "Tansley", "Elton"], answer: 0, why: "Only ~10% passes each trophic level; the rest is lost as heat.", exam: "CEE 2080" },
      { q: "An age pyramid with a broad base indicates:", options: ["Growing population", "Declining population", "Stable population", "Zero growth"], answer: 0, why: "Many pre-reproductive individuals → future expansion.", exam: "CEE 2079" },
      { q: "Ecological succession on bare rock ends in:", options: ["Climax community", "Pioneer community", "Sere", "Biomass peak only"], answer: 0, why: "Lichen pioneer → moss → grass → shrub → forest climax.", exam: "IOE 2079" },
      { q: "The hottest biodiversity hotspot in Nepal's context is the:", options: ["Eastern Himalaya", "Terai savanna", "Kali Gandaki desert", "Rara Lake"], answer: 0, why: "Eastern Himalaya is one of 36 global hotspots.", exam: "CEE 2081" },
      { q: "Ozone-depleting substance banned by the Montreal Protocol is mainly:", options: ["CFCs", "CO₂", "CH₄", "N₂O from soil"], answer: 0, why: "Chlorine radicals catalytically destroy O₃ — CFCs phased out from 1987.", exam: "CEE 2078" },
      { q: "Gross primary productivity minus respiration equals:", options: ["Net primary productivity", "Secondary productivity", "Standing crop", "Detritus"], answer: 0, why: "NPP = GPP − R — what herbivores actually eat.", exam: "NEB Board" },
    ],
  },
  {
    units: ["evolutionary-biology"],
    questions: [
      { q: "Darwin's theory of natural selection was published in:", options: ["1859 — On the Origin of Species", "1809", "1900", "1866"], answer: 0, why: "Survival of the fittest acting on heritable variation.", exam: "CEE 2080" },
      { q: "Homologous organs indicate:", options: ["Common ancestry (divergent evolution)", "Convergent evolution", "Analogy", "Mutation"], answer: 0, why: "Same structure, different function — forelimbs of whale, bat, human.", exam: "CEE 2079" },
      { q: "The driving force of evolution per modern synthesis is:", options: ["Natural selection + genetic drift, on mutations", "Use and disuse", "Inheritance of acquired characters", "Saltation"], answer: 0, why: "Lamarck's acquired characters is disproved; mutation supplies variation.", exam: "IOE 2079" },
      { q: "Miller's 1953 experiment produced amino acids from:", options: ["CH₄, NH₃, H₂, H₂O + electric discharge", "CO₂ and O₂", "Pure water", "Formaldehyde"], answer: 0, why: "Reducing-gas mixture sparked for a week → glycine, alanine…", exam: "CEE 2081" },
    ],
  },
];

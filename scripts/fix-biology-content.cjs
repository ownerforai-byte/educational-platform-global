/**
 * Fix placeholder/generic content in Biology concept JSON files
 * Replace with topic-specific detailed notes, confusion, and examples
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes', 'biology');

// Define proper content for problematic topics
const TOPIC_FIXES = {
  // ── BIOMOLECULES AND CELL BIOLOGY ──
  'biomolecules-functions': {
    notes: [
      "**Carbohydrates (Hydrates of Carbon, $(CH_2O)_n$):** Polyhydroxy aldehydes or ketones classified into monosaccharides (triose, tetrose, pentose: ribose/deoxyribose, hexose: glucose/fructose/galactose), disaccharides linked by α/β-glycosidic bonds (maltose: α-1,4-glucose+glucose; sucrose: α-1,2-glucose+fructose [non-reducing]; lactose: β-1,4-galactose+glucose [reducing]), and polysaccharides (storage: starch with amylose α-1,4 and amylopectin α-1,6 branches in plants, glycogen in animal liver/muscle; structural: cellulose β-1,4-glucan [most abundant organic polymer on Earth], chitin in fungal cell walls and arthropod exoskeletons).",
      "**Proteins (Polypeptides of L-α-Amino Acids):** 20 standard proteinogenic amino acids linked covalently via peptide bonds (-CO-NH-) formed by dehydration synthesis. Amino acids exist as dipolar zwitterions at their isoelectric point (pI). Four organizational hierarchies: Primary (linear sequence dictated by mRNA), Secondary (α-helix stabilized by intrachain H-bonds every 3.6 residues or β-pleated sheets), Tertiary (overall 3D globular conformation stabilized by hydrophobic interactions, ionic bridges, hydrogen bonds, and covalent disulfide -S-S- bonds), and Quaternary (assembly of multiple polypeptide subunits, e.g., adult hemoglobin α₂β₂ with heme Fe²⁺ prosthetic group).",
      "**Lipids (Esters of Fatty Acids & Glycerol):** Hydrophobic water-insoluble biomolecules soluble in organic solvents. Simple lipids: Triglycerides (triacylglycerols stored in adipose tissue for insulation and metabolic energy yielding ~9.3 kcal/g). Compound lipids: Phospholipids (amphipathic molecules with hydrophilic choline-phosphate head and two hydrophobic fatty acid tails forming the lipid bilayer of cellular membranes), Glycolipids, and Sphingolipids. Derived lipids: Steroids (four fused carbon rings cyclopentanoperhydrophenanthrene, e.g., cholesterol regulating membrane fluidity, steroid hormones cortisol/testosterone/estrogen, and bile salts).",
      "**Nucleic Acids (Polynucleotides of Genetic Information):** Linear polymers of nucleotides linked via 3'-to-5' phosphodiester linkages. Each nucleotide comprises a pentose sugar (ribose in RNA, 2'-deoxyribose in DNA), a purine (Adenine, Guanine) or pyrimidine (Cytosine, Thymine in DNA, Uracil in RNA) nitrogenous base, and 1 to 3 phosphate groups. DNA forms an antiparallel right-handed B-DNA double helix (Watson & Crick model: 2 nm diameter, 3.4 nm pitch with 10 base pairs per turn) governed by Chargaff's parity rules: [A] = [T] (2 hydrogen bonds) and [G]≡[C] (3 hydrogen bonds). RNA is predominantly single-stranded and functions in information transfer (mRNA), aminoacyl-tRNA decoding (cloverleaf tRNA), and peptidyl transferase catalysis (ribosomal 28S/23S rRNA).",
      "**Enzymes & Biocatalysis:** Specialized globular protein catalysts that accelerate biochemical reaction rates by factors of 10⁶ to 10¹² by stabilizing the transition state and dramatically decreasing the activation energy barrier (Eₐ) without altering thermodynamic equilibrium constant (K_eq) or standard Gibbs free energy change (ΔG°). Catalytic cycle operates via the induced-fit model (Koshland). Many require non-protein cofactors: inorganic metal activators (Fe²⁺, Zn²⁺ in carbonic anhydrase, Mg²⁺ in kinases) or organic coenzymes derived from B-vitamins (NAD⁺ from niacin, FAD from riboflavin, TPP from thiamine)."
    ],
    confusion: [
      "❌ 'Sucrose is a reducing sugar because it is made of glucose and fructose.' ✅ Sucrose is NON-REDUCING because both anomeric carbons (C1 of glucose and C2 of fructose) are tied up in the α-1,2-glycosidic bond.",
      "❌ 'All enzymes are proteins.' ✅ Ribozymes (such as 23S rRNA in prokaryotes) are catalytic RNA molecules capable of peptide bond synthesis.",
      "❌ 'Lipids are true macromolecules formed by polymer chains.' ✅ Lipids are NOT true polymers; they are relatively small hydrophobic molecules assembled into supramolecular non-covalent aggregates (bilayers and micelles).",
      "❌ 'Cellulose can be digested by humans because it is made of glucose.' ✅ Humans lack the enzyme cellulase to cleave the β-1,4-glycosidic bonds of cellulose; it passes as dietary fiber.",
      "❌ 'Disulfide bonds stabilize the primary structure of proteins.' ✅ Disulfide (-S-S-) bonds form between cysteine side chains and stabilize TERTIARY and QUATERNARY structure, not primary."
    ],
    examples: [
      "Hemoglobin: Allosteric tetramer (α₂β₂) transporting 4 molecules of O₂ with sigmoidal cooperative binding curve.",
      "Rubisco (Ribulose-1,5-bisphosphate carboxylase-oxygenase): The most abundant protein and enzyme on Earth, catalyzing carbon fixation.",
      "Collagen: Triple-helical structural protein rich in glycine and proline, providing tensile strength to connective tissues and bones.",
      "ATP (Adenosine Triphosphate): Universal bioenergetic currency containing two high-energy phosphoanhydride bonds releasing ~7.3 kcal/mol upon hydrolysis."
    ],
    universalFacts: [
      "Cellulose is the most abundant biopolymer on Earth, constituting over 50% of all organic carbon in the biosphere.",
      "Proteins contain exclusively L-stereoisomers of amino acids, whereas carbohydrates in biological systems are predominantly D-stereoisomers.",
      "Double-stranded B-DNA has a helical pitch of 3.4 nm containing 10 base pairs, with an inter-base rise of 0.34 nm.",
      "Phospholipids are amphipathic molecules whose spontaneous self-assembly into bilayers drives cellular compartmentalization."
    ],
    summary: "Biomolecules are the organic building blocks of cellular life. Carbohydrates provide immediate metabolic energy and structural cellulose/chitin matrices. Proteins, composed of 20 L-amino acids folded into specific 3D tertiary conformations, execute enzymatic catalysis, signal transduction, and structural support. Lipids provide hydrophobic membrane barriers and high-density caloric storage. Nucleic acids (DNA and RNA) encode, replicate, and translate genetic information with complementary base pairing. Water and essential minerals provide the aqueous solvent and catalytic cofactors necessary for life's metabolic machinery."
  },

  // ── CELL BIOLOGY ──
  'cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells': {
    notes: [
      "**Cell Theory:** All organisms are composed of one or more cells; the cell is the basic unit of structure and organization in organisms; all cells arise from pre-existing cells (Schleiden, Schwann, and Virchow).",
      "**Prokaryotic Cells:** Lack membrane-bound organelles; possess a nucleoid region containing circular DNA; cell wall composed of peptidoglycan; ribosomes are 70S; reproduce by binary fission; examples include bacteria and archaea.",
      "**Eukaryotic Cells:** Possess membrane-bound organelles including nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, and peroxisomes; ribosomes are 80S (or 70S in organelles); DNA is linear and organized into chromosomes; reproduce by mitosis/meiosis; examples include protists, fungi, plants, and animals.",
      "**Key Structural Differences:** Prokaryotes have no nuclear envelope (DNA is naked in nucleoid), no membrane-bound organelles, smaller 70S ribosomes, cell wall of peptidoglycan, circular chromosome, and may possess flagella made of flagellin protein. Eukaryotes have a true nucleus with nuclear envelope, membrane-bound organelles, larger 80S ribosomes, cell wall of cellulose (plants) or chitin (fungi) or none (animals), linear chromosomes with histones, and flagella made of microtubules (9+2 arrangement).",
      "**Endosymbiotic Theory:** Mitochondria and chloroplasts originated from free-living prokaryotes that were engulfed by ancestral eukaryotic cells, establishing symbiotic relationships. Evidence includes their own circular DNA, 70S ribosomes, double membranes, and ability to divide independently."
    ],
    confusion: [
      "❌ 'All cells look the same under a microscope.' ✅ Prokaryotic cells lack membrane-bound organelles; eukaryotic cells have them.",
      "❌ 'DNA and RNA are identical in structure.' ✅ DNA is double-stranded with deoxyribose and thymine; RNA is single-stranded with ribose and uracil.",
      "❌ 'Mitosis produces genetically different cells.' ✅ Mitosis produces genetically identical diploid daughter cells.",
      "❌ 'Meiosis produces identical cells.' ✅ Meiosis produces 4 genetically diverse haploid gametes.",
      "❌ 'Crossing over occurs in mitosis.' ✅ Crossing over occurs in Prophase I of meiosis only."
    ],
    examples: [
      "Animal cell: No cell wall, contains centrioles, lysosomes prominent, stores glycogen.",
      "Plant cell: Cellulose cell wall, chloroplasts for photosynthesis, large central vacuole, stores starch.",
      "Bacterial cell: Peptidoglycan cell wall, capsule, pili, 70S ribosomes, circular DNA.",
      "Fungal cell: Chitin cell wall, eukaryotic organelles, hyphae form mycelium network."
    ],
    universalFacts: [
      "The smallest known cell is Mycoplasma (0.1-0.3 μm); the largest is the ostrich egg (~17 cm diameter).",
      "Neurons can be up to 1 meter long (from spinal cord to foot muscles).",
      "Red blood cells are unique among human cells in lacking a nucleus and most organelles.",
      "A typical human body contains approximately 30-40 trillion cells."
    ],
    summary: "The cell is the fundamental structural and functional unit of all living organisms. Prokaryotic cells (bacteria and archaea) lack membrane-bound organelles and a true nucleus, while eukaryotic cells possess compartmentalized structures including a nucleus, mitochondria, and endoplasmic reticulum. Cell theory unifies all life: all organisms are composed of cells, cells are the basic units of life, and all cells arise from pre-existing cells through division."
  },

  // ── ECOTOLOGY ──
  'food-chain-web': {
    notes: [
      "**Food Chain:** A linear sequence of organisms through which nutrients and energy are transferred as one organism eats another. Types: Grazing food chain (starts with living green plants → herbivores → carnivores) and Detritus food chain (starts with dead organic matter → decomposers → detritivores → carnivores).",
      "**Food Web:** An interconnected network of multiple food chains within an ecosystem. Shows complex feeding relationships and energy flow pathways. Provides stability to ecosystems as organisms have alternative food sources.",
      "**Trophic Levels:** Position an organism occupies in a food chain. Producers (autotrophs) are at level 1; primary consumers (herbivores) at level 2; secondary consumers (carnivores) at level 3; tertiary consumers at level 4. Decomposers operate across all levels.",
      "**Ecological Pyramids:** Graphic representations of trophic structure. Pyramid of numbers (organisms per unit area), pyramid of biomass (total mass per unit area), pyramid of energy (energy flow per unit area per time). Energy pyramid is always upright because energy decreases at each level (~10% transfer efficiency).",
      "**10% Law (Lindeman's Law):** Only about 10% of energy is transferred from one trophic level to the next. The remaining ~90% is lost as heat through metabolic processes (respiration, movement, reproduction) or undigested waste."
    ],
    confusion: [
      "❌ 'Food chain shows all feeding relationships.' ✅ Food chain is linear; food web shows interconnected feeding relationships.",
      "❌ '90% of energy is transferred to next trophic level.' ✅ Only ~10% energy transfers; ~90% lost as heat.",
      "❌ 'Biomagnification decreases toxin concentration up the food chain.' ✅ Biomagnification increases toxin concentration at higher trophic levels.",
      "❌ 'All food chains start with consumers.' ✅ All food chains start with producers (autotrophs).",
      "❌ 'Energy flows in cycles in ecosystems.' ✅ Energy flowsunidirectionally; only nutrients cycle."
    ],
    examples: [
      "Grassland: Grass → Grasshopper → Frog → Snake → Hawk",
      "Aquatic: Phytoplankton → Zooplankton → Small fish → Large fish → Human",
      "Decomposer: Dead leaves → Earthworm → Bird → Fox",
      "Parasitic: Tree → Aphid → Ladybug → Spider"
    ],
    universalFacts: [
      "Only about 10% of energy transfers between trophic levels; the rest is lost as heat.",
      "Food chains rarely exceed 4-5 trophic levels due to energy constraints.",
      "Biomagnification causes toxin concentrations to increase 10-100x at each trophic level.",
      "Detritus food chains often contribute more energy flow than grazing chains in forests."
    ],
    summary: "Food chains represent linear energy transfer pathways from producers to top predators, while food webs depict the complex interconnected feeding relationships in ecosystems. The 10% law explains why energy decreases at successive trophic levels, limiting food chain length. Ecological pyramids visualize these relationships in terms of numbers, biomass, and energy flow."
  },

  'biogeochemical-cycles': {
    notes: [
      "**Carbon Cycle:** Carbon moves between atmosphere (CO₂), biosphere (organic compounds), hydrosphere (dissolved CO₂, carbonates), and lithosphere (fossil fuels, limestone). Photosynthesis fixes atmospheric CO₂ into organic molecules; respiration and decomposition release CO₂ back. Ocean currents and sedimentation store carbon long-term.",
      "**Nitrogen Cycle:** Nitrogen gas (N₂, 78% of atmosphere) must be 'fixed' into usable forms. Processes: Biological nitrogen fixation (Rhizobium in legume root nodules, Azotobacter, cyanobacteria), atmospheric fixation (lightning), industrial fixation (Haber process). Nitrification: NH₃ → NO₂⁻ → NO₃⁻ by soil bacteria. Denitrification: NO₃⁻ → N₂ by anaerobic bacteria.",
      "**Water Cycle:** Evaporation from oceans/lakes → Transpiration from plants → Condensation → Precipitation → Runoff → Infiltration → Groundwater → Back to oceans. Driven by solar energy and gravity.",
      "**Phosphorus Cycle:** Slowest major biogeochemical cycle. Weathering of rocks releases phosphate; absorbed by plants; passed through food chains; returned to soil by decomposition; deposited in sediments. No significant atmospheric component.",
      "**Ecological Succession:** Gradual, predictable change in species composition of an ecosystem over time. Primary succession begins on bare rock/lava; secondary succession follows disturbance. Climax community represents stable endpoint."
    ],
    confusion: [
      "❌ 'Carbon cycle only involves plants and animals.' ✅ Carbon cycle involves atmosphere, oceans, fossils, rocks, and decomposers.",
      "❌ 'Nitrogen fixation only occurs in bacteria.' ✅ Some lightning and industrial processes (Haber) also fix nitrogen.",
      "❌ 'Phosphorus cycle has a significant atmospheric component.' ✅ Phosphorus cycle is primarily sedimentary with no gaseous phase.",
      "❌ 'Succession always leads to a forest climax.' ✅ Climax community depends on climate; can be grassland, desert, or tundra.",
      "❌ 'Decomposers only work in soil.' ✅ Decomposers (bacteria, fungi) work in soil, water, and detritus."
    ],
    examples: [
      "Carbon: Forest absorbs CO₂ via photosynthesis; respiration and decomposition return it.",
      "Nitrogen: Legume-Rhizobium symbiosis fixes atmospheric N₂ into ammonia for plant use.",
      "Water: Rainfall → Plant uptake → Transpiration → Cloud formation → Precipitation cycle.",
      "Phosphorus: Rock weathering releases phosphate → Plant absorption → Animal consumption → Decomposition returns phosphate."
    ],
    universalFacts: [
      "Carbon makes up about 18% of living organism dry weight.",
      "Nitrogen fixation by bacteria provides essential usable nitrogen for all life.",
      "The ocean stores about 50 times more carbon than the atmosphere.",
      "Phosphorus is often the limiting nutrient in freshwater ecosystems."
    ],
    summary: "Biogeochemical cycles describe the movement of essential elements (carbon, nitrogen, phosphorus, water) through biotic and abiotic components of ecosystems. These cycles maintain elemental balance necessary for life. Understanding these cycles is crucial for addressing environmental issues like climate change, eutrophication, and fertilizer runoff."
  },

  'ecological-imbalances-climate-change': {
    notes: [
      "**Greenhouse Effect:** Natural warming of Earth caused by greenhouse gases (CO₂, CH₄, N₂O, H₂O vapor) trapping infrared radiation. Enhanced greenhouse effect from human activities (fossil fuel burning, deforestation) causes global warming.",
      "**Climate Change Impacts:** Rising temperatures, changing precipitation patterns, sea-level rise from ice melt, increased frequency of extreme weather events, shifting biomes, ocean acidification from CO₂ absorption.",
      "**Ozone Layer Depletion:** Caused by chlorofluorocarbons (CFCs), halons, and other ozone-depleting substances (ODS). UV-B radiation damage increases skin cancer, cataracts, immune suppression, and ecosystem disruption. Montreal Protocol (1987) phased out CFC production.",
      "**Acid Rain:** Caused by SO₂ and NOₓ emissions reacting with atmospheric water to form sulfuric and nitric acids. Damages forests, acidifies lakes, corrodes buildings, leaches soil nutrients.",
      "**Biological Invasion:** Introduction of non-native species that disrupt ecosystems. Examples: Water hyacinth in Indian subcontinent, Lantana camara in tropical regions, African catfish in Nepal."
    ],
    confusion: [
      "❌ 'Ozone depletion causes global warming.' ✅ Ozone depletion and global warming are related but distinct problems.",
      "❌ 'CFCs are still widely used.' ✅ CFC production was phased out by Montreal Protocol in developed countries.",
      "❌ 'Acid rain only affects water bodies.' ✅ Acid rain damages forests, soils, buildings, and human health.",
      "❌ 'All introduced species are harmful.' ✅ Most introduced species fail to establish; only some become invasive.",
      "❌ 'Greenhouse gases are all pollutants.' ✅ Some greenhouse gases (CO₂, water vapor) are natural; problems arise from excess concentrations."
    ],
    examples: [
      "Greenhouse effect: CO₂ from vehicle exhaust and factory emissions traps heat, raising global temperatures.",
      "Ozone depletion: CFCs from aerosols and refrigerants break down ozone in stratosphere.",
      "Acid rain: Coal-burning power plants release SO₂, causing acid deposition damaging forests.",
      "Invasive species: Water hyacinth clogs waterways in Nepal, blocking sunlight and oxygen."
    ],
    universalFacts: [
      "Global temperature has risen about 1.1°C since pre-industrial times.",
      "Ozone hole over Antarctica was discovered in 1985 by British Antarctic Survey.",
      "Acid rain has pH below 5.6 (normal rain is slightly acidic at pH 5.6 due to CO₂).",
      "Invasive species are the second leading cause of biodiversity loss globally."
    ],
    summary: "Ecological imbalances result from human activities disrupting natural cycles and introducing pollutants. Greenhouse gas emissions drive climate change; CFCs deplete ozone layer; SO₂ and NOₓ cause acid rain; invasive species disrupt local ecosystems. International agreements and sustainable practices are essential for mitigation."
  },

  // ── EVOLUTION ──
  'origin-life': {
    notes: [
      "**Oparin-Haldane Theory (1920s):** Proposed that life arose from non-living organic molecules through gradual chemical evolution. Early Earth atmosphere was reducing (no free O₂) with CH₄, NH₃, H₂, and H₂O vapor. Energy from lightning, UV radiation, and volcanic activity drove chemical reactions producing simple organic compounds.",
      "**Miller-Urey Experiment (1953):** Stanley Miller simulated early Earth conditions in a closed system with CH₄, NH₃, H₂, and H₂O. Electric sparks (simulating lightning) produced amino acids (glycine, alanine, aspartic acid), sugars, urea, and other organic compounds after one week. Supported chemical origin of life hypothesis.",
      "**Subsequent Research:** Later experiments produced nucleotides, lipids, and sugars under simulated primitive conditions. Hydrothermal vent hypothesis proposes life originated near deep-sea vents where mineral catalysts and chemical gradients provided energy.",
      "**First Living Organisms:** Likely simple heterotrophic prokaryotes that consumed organic molecules from 'primordial soup.' Photoautotrophs evolved later, producing O₂ through photosynthesis, transforming atmosphere.",
      "**Timeline:** Earth formed ~4.6 billion years ago; first evidence of life ~3.5-3.8 billion years ago (stromatolites, isotopic signatures)."
    ],
    confusion: [
      "❌ 'Miller-Urey proved life originated from non-living matter.' ✅ They demonstrated organic molecules CAN form under simulated early Earth conditions, not that life actually originated this way.",
      "❌ 'Early Earth had abundant free oxygen.' ✅ Early atmosphere was reducing with no free O₂; oxygen accumulated only after photosynthetic organisms evolved.",
      "❌ 'Life appeared immediately after Earth formed.' ✅ Life took hundreds of millions of years; Earth was molten initially.",
      "❌ 'Oparin-Haldane theory is proven fact.' ✅ It's a well-supported hypothesis but cannot be directly tested; alternative theories exist (panspermia, hydrothermal vent origin).",
      "❌ 'RNA world hypothesis is disproven.' ✅ RNA world remains the leading hypothesis for prebiotic evolution; RNA can store information and catalyze reactions."
    ],
    examples: [
      "Miller-Urey: Simulated lightning in reducing atmosphere produced 11 amino acids from inorganic precursors.",
      "Hydrothermal vents: Alkaline vents on ocean floor could have provided energy and mineral catalysts for life's origin.",
      "Panspermia hypothesis: Microfossils found in meteorites suggest organic matter may arrive from space.",
      "Stromatolites: Fossilized microbial mats from 3.5 billion years ago provide earliest evidence of life."
    ],
    universalFacts: [
      "Over 20 different amino acids have been synthesized in laboratory simulations of early Earth conditions.",
      "RNA can act as both genetic material and catalyst (ribozyme), supporting the RNA world hypothesis.",
      "The oldest known fossils are stromatolites dating to ~3.5 billion years ago.",
      "Comets may have delivered water and organic compounds to early Earth."
    ],
    summary: "The Oparin-Haldane theory and Miller-Urey experiment demonstrate that organic molecules essential for life could form spontaneously from inorganic precursors under early Earth conditions. Life likely originated from simple molecules that self-replicated and evolved complexity over billions of years, possibly beginning with an RNA world before DNA and proteins evolved."
  },

  'theories-of-evolution': {
    notes: [
      "**Lamarckism (Inheritance of Acquired Characters):** Jean-Baptiste Lamarck proposed that organisms acquire characteristics during their lifetime through use or disuse, and these acquired traits are inherited by offspring. Example: Giraffes stretching necks to reach leaves led to longer-necked offspring. Discredited because acquired characteristics do not alter genetic material.",
      "**Darwinism (Natural Selection):** Charles Darwin proposed that individuals with heritable traits better suited to their environment survive and reproduce more successfully ('survival of the fittest'). Key observations: Overproduction of offspring, variation exists in populations, resources are limited, differential survival and reproduction. Mechanism: Natural selection acts on heritable variation, leading to adaptation and speciation over generations.",
      "**Neo-Darwinism (Modern Synthesis):** Combines Darwin's natural selection with Mendelian genetics and population genetics. Mutations provide raw genetic variation; natural selection acts on this variation. Population gene pool changes over time through selection, genetic drift, gene flow, and mutation. Applies to populations, not just individuals.",
      "**Evidence Supporting Evolution:** Morphological (homologous structures like vertebrate forelimbs), embryological (similar developmental stages), paleontological (fossil record showing progression), molecular (universal genetic code, shared genes across species), biogeographical (species distribution patterns)."
    ],
    confusion: [
      "❌ 'Lamarckism is completely wrong with no validity.' ✅ While inheritance of acquired characters is rejected, some epigenetic effects show environmental influences can sometimes be inherited.",
      "❌ 'Evolution is goal-oriented toward perfection.' ✅ Evolution has no goal; it acts on random variation filtered by current environmental pressures.",
      "❌ 'Darwin discovered evolution.' ✅ Evolution was recognized earlier; Darwin explained the mechanism (natural selection).",
      "❌ 'Individuals evolve during their lifetime.' ✅ Populations evolve over generations; individuals develop but do not evolve.",
      "❌ 'Natural selection creates new traits.' ✅ Natural selection acts on existing variation; mutations and recombination generate new variation."
    ],
    examples: [
      "Darwin's finches: Beak shapes adapted to different food sources on Galápagos Islands.",
      "Peppered moth: Industrial melanism showed natural selection changing moth color frequencies.",
      "Antibiotic resistance: Bacteria with resistance genes survive antibiotic treatment and reproduce.",
      "Darwin's finches: Different beak shapes adapted to different food sources on Galápagos Islands."
    ],
    universalFacts: [
      "All known organisms share the same genetic code, providing strong evidence for common ancestry.",
      "Homologous structures (same origin, different function) indicate descent from common ancestors.",
      "Vestigial structures (reduced function organs) like pelvic bones in whales evidence evolutionary history.",
      "The fossil record shows progressive complexity over geological time, though with gaps."
    ],
    summary: "Evolutionary theory explains how life changes over time. Lamarck's inheritance of acquired characters was disproven. Darwin's natural selection describes how advantageous traits become more common in populations. Neo-Darwinism combines natural selection with genetics, explaining evolution as change in allele frequencies within populations driven by selection, drift, mutation, and gene flow."
  },

  'human-evolution': {
    notes: [
      "**Position in Animal Kingdom:** Humans belong to Kingdom Animalia, Phylum Chordata, Subphylum Vertebrata, Class Mammalia, Order Primates, Family Hominidae, Genus Homo. Shared features with other primates: forward-facing eyes, grasping hands, large brains relative to body size.",
      "**New World vs Old World Monkeys:** New World monkeys (Platyrrhini) have flat noses with sideways nostrils, prehensile tails, live in Central/South America. Old World monkeys (Catarrhini) have downward-facing nostrils, non-prehensile tails, live in Africa/Asia. Humans are closer to Old World monkeys.",
      "**Great Apes vs Humans:** Great apes (orangutans, gorillas, chimpanzees, bonobos) share ~98-99% DNA with humans. Differences: larger brain, bipedal locomotion, reduced jaw/teeth, reduced body hair, complex culture/language in humans. Chimpanzees are our closest living relatives, sharing a common ancestor ~6-7 million years ago.",
      "**Human Evolution Timeline:** Ardipithecus (~4.4 Ma) → Australopithecus (Lucy, ~3.2 Ma, bipedal) → Homo habilis (~2.4 Ma, tool use) → Homo erectus (~1.8 Ma, fire, migration out of Africa) → Homo heidelbergensis → Neanderthals and Denisovans → Homo sapiens (~300,000 years ago).",
      "**Modern Human Origins:** Anatomically modern humans evolved in Africa ~300,000 years ago. Migration out of Africa ~60,000-100,000 years ago replaced other Homo species. Interbreeding occurred with Neanderthals and Denisovans (evidence in modern human DNA)."
    ],
    confusion: [
      "❌ 'Humans evolved from chimpanzees.' ✅ Humans and chimps share a common ancestor; neither evolved from the other.",
      "❌ 'Evolution is a straight line from ape to human.' ✅ Human evolution branched extensively; many hominin species existed simultaneously.",
      "❌ 'Neanderthals were primitive brutish ancestors.' ✅ Neanderthals had large brains, used tools, buried dead, and were contemporaries, not direct ancestors.",
      "❌ 'Homo sapiens replaced all other humans without interbreeding.' ✅ Genetic evidence shows interbreeding with Neanderthals and Denisovans occurred.",
      "❌ 'Evolution means progress toward perfection.' ✅ Evolution produces adaptation to current environments, not perfection."
    ],
    examples: [
      "Lucy (Australopithecus afarensis): 3.2 million year-old fossil showing bipedalism with small brain.",
      "Homo erectus: First hominin to migrate out of Africa; used fire and Acheulean tools.",
      "Neanderthals: Lived in Eurasia 400,000-40,000 years ago; interbred with modern humans.",
      "Denisovans: Known mainly from DNA; contributed to modern Tibetan and Melanesian populations."
    ],
    universalFacts: [
      "Humans share ~98.8% DNA with chimpanzees and ~96% with gorillas.",
      "Brain size increased from ~400cc in australopithecines to ~1350cc in modern humans.",
      "All living humans trace maternal lineage to a woman in Africa ~150,000-200,000 years ago ('Mitochondrial Eve').",
      "Non-African populations carry 1-4% Neanderthal DNA from ancient interbreeding."
    ],
    summary: "Human evolution traces a branch of the primate family tree from common ancestors with chimpanzees through australopithecines, Homo habilis, Homo erectus, and ultimately Homo sapiens. Key adaptations include bipedalism, increased brain size, tool use, and language. Modern humans originated in Africa and migrated worldwide, interbreeding with other Homo species along the way."
  },

  // ── FAUNAL DIVERSITY ──
  'frog': {
    notes: [
      "**Rana tigrina (Common Frog):** Amphibian with double life (aquatic larva, terrestrial adult). Body divided into head and trunk; no neck. Skin smooth, moist, permeable for cutaneous respiration. Hind limbs longer than forelimbs for jumping/swimming. Webbed feet aid swimming. Three-chambered heart (two atria, one ventricle).",
      "**Digestive System:** Complete tube from mouth to cloaca. Mouth has teeth (small, for gripping prey only) and tongue (hinged at front, sticky for catching prey). Esophagus short; stomach J-shaped; intestine short in adults (carnivorous diet). Liver and pancreas produce digestive enzymes. Cloaca receives digestive, urinary, and reproductive tracts.",
      "**Circulatory System:** Closed system with three-chambered heart (right atrium, left atrium, single ventricle). Deoxygenated blood enters right atrium; oxygenated blood enters left atrium. Partial mixing occurs in ventricle. Sinus venosus receives blood from veins. Conus arteriosus leads to ventral aorta.",
      "**Respiratory System:** Multiple respiratory surfaces: Skin (cutaneous respiration, especially during hibernation), buccal cavity lining, lungs (simple sacs with internal folds for increased surface area). No diaphragm; breathing by buccal pumping mechanism."
    ],
    confusion: [
      "❌ 'Frogs breathe only through lungs.' ✅ Frogs use cutaneous respiration (skin), buccal cavity, and lungs.",
      "❌ 'Frog heart has four chambers.' ✅ Frog heart has three chambers: two atria and one ventricle.',
      "❌ 'Frog teeth are for chewing food.' ✅ Frog teeth are small and used only for gripping prey, not chewing.",
      "❌ 'Frogs have a complete digestive system with large intestine.' ✅ Adult frogs have a short intestine suitable for carnivorous diet.",
      "❌ 'Frogs excrete urea like mammals.' ✅ Frogs excrete urea (ammonotelic as larvae, ureotelic as adults)."
    ],
    examples: [
      "Digestive: Frog eats insect with sticky tongue; food travels esophagus → stomach → intestine → cloaca.",
      "Circulatory: Heart pumps mixed blood to lungs/skin (pulmocutaneous) and body (systemic circulation).",
      "Respiratory: Frog gulps air through nostrils; pushes into lungs; exchanges gases in lung folds.",
      "Adaptation: Webbed hind feet for swimming; long legs for jumping; moist skin for gas exchange."
    ],
    universalFacts: [
      "Frogs can absorb up to 90% of their oxygen through their skin.",
      "A frog's heart continues beating even when removed from the body (has its own pacemaker).",
      "Frogs swallow prey using their eyes; eye muscles help push food down the throat.",
      "Some frog species can freeze solid in winter and survive thawing in spring."
    ],
    summary: "Rana tigrina (frog) is a model amphibian with adaptations for both aquatic and terrestrial life. Key features include smooth permeable skin for cutaneous respiration, three-chambered heart with partial mixing of oxygenated/deoxygenated blood, simple lungs with buccal pumping, and complete digestive system adapted for carnivorous diet. Frogs serve as important indicators of ecosystem health."
  },

  'earthworm': {
    notes: [
      "**Pheretima posthuma (Earthworm):** Segmented worm (annelid) with metamerically segmented body. Body covered by thin cuticle; each segment has setae (bristles) for locomotion. Dioecious (separate sexes) but hermaphroditic reproductive organs. Lives in burrows in moist soil; nocturnal; feeds on decaying organic matter.",
      "**Digestive System:** Complete alimentary canal from mouth to anus. Mouth → Buccal cavity → Pharynx (suctorial) → Esophagus → Gizzard (muscular, grinds food) → Intestine (with typhlosole for absorption) → Anus. Salivary glands secrete mucus and proteolytic enzymes. Ccalciferous glands in segments 9-14 neutralize soil acids.",
      "**Circulatory System:** Closed circulatory system with dorsal and ventral blood vessels connected by 'hearts' (vascular loops) in segments 7-12. Blood is red due to hemoglobin dissolved in plasma. Blood flows forward in dorsal vessel, backward in ventral vessel. Five pair of pseudoforks (augmenting hearts) pump blood.",
      "**Excretory System:** Nephridia (excretory organs) in each segment except first few. Septal nephridia on septa connect dorsal and ventral vessels; integumentary nephridia in body wall; pharyngeal nephridia in segments 4-6. Remove waste from coelomic fluid and blood; open to exterior by nephridiopores."
    ],
    confusion: [
      "❌ 'Earthworms have an open circulatory system.' ✅ Earthworms have a CLOSED circulatory system with dorsal and ventral vessels.",
      "❌ 'Earthworms have nephrons like mammals.' ✅ Earthworms have nephridia, not nephrons; nephridia filter coelomic fluid directly.',
      "❌ 'Earthworms breathe through gills.' ✅ Earthworms respire through moist skin (cutaneous respiration); no specialized respiratory organs.",
      "❌ 'Earthworms are male and female separately.' ✅ Earthworms are hermaphroditic (both sexes in one individual) but cross-fertilize.',
      "❌ 'Earthworms have a brain like vertebrates.' ✅ Earthworms have a pair of cerebral ganglia (brain) above pharynx; nervous system is ladder-like with ventral nerve cord."
    ],
    examples: [
      "Digestion: Earthworm ingests soil with organic matter; gizzard grinds particles; typhlosole increases absorption surface.",
      "Circulation: Dorsal vessel collects blood; 'hearts' pump blood to ventral vessel; capillaries deliver oxygen/nutrients.",
      "Excretion: Nephridia filter waste from coelomic fluid and blood; excrete through nephridiopores.",
      "Reproduction: Clitellum secretes cocoon; sperm transferred during mating; eggs fertilized inside cocoon."
    ],
    universalFacts: [
      "Earthworms can regenerate lost segments (except head region).",
      "An earthworm's blood is red due to dissolved hemoglobin (not enclosed in cells).",
      "Earthworms are hermaphrodites but cross-fertilize; each worm has both male and female reproductive organs.",
      "Earthworms are vital for soil health; they aerate soil and recycle nutrients."
    ],
    summary: "Pheretima posthuma (earthworm) is a segmented annelid with complete digestive, closed circulatory, and nephridial excretory systems. Key adaptations include setae for locomotion, moist skin for respiration, hermaphroditic reproduction with cocoon formation, and soil-dwelling lifestyle making them ecologically important for soil fertility and aeration."
  },

  // ── FLORAL DIVERSITY ──
  'fungi': {
    notes: [
      "**General Characteristics:** Fungi are eukaryotic, heterotrophic organisms with chitinous cell walls. Reproduce by spores (sexual and asexual). Body is thallus composed of filamentous hyphae forming mycelium. Absorptive nutrition (secrete enzymes, absorb nutrients). Store food as glycogen and oil droplets.",
      "**Phycomycetes (Lower Fungi):** Coenocytic (multinucleate, no septa) hyphae. Asexual reproduction by zoospores (motile) or aplanospores. Sexual reproduction by oospores. Examples: Rhizopus (bread mold), Mucor, Albugo (pathogen).",
      "**Ascomycetes (Sac Fungi):** Septate hyphae. Asexual reproduction by conidia. Sexual reproduction by ascospores formed in sac-like asci (8 per ascus). Asci often clustered in fruiting bodies (ascocarps). Examples: Saccharomyces (yeast), Penicillium, Aspergillus, Claviceps (ergot).",
      "**Basidiomycetes (Club Fungi):** Septate hyphae. Asexual reproduction rare. Sexual reproduction by basidiospores on club-shaped basidia (4 per basidium). Basidia clustered in fruiting bodies (basidiocarps/mushrooms). Examples: Agaricus (button mushroom), Puccinia (rusts), Ustilago (smuts).",
      "**Deuteromycetes (Fungi Imperfecti):** Only asexual stage known; no sexual reproduction observed. Septate hyphae reproduce by conidia. Many are beneficial (Penicillium produces antibiotic) or pathogenic. Examples: Alternaria, Colletotrichum, Trichoderma."
    ],
    confusion: [
      "❌ 'All fungi are harmful pathogens.' ✅ Many fungi are beneficial: decomposers, mycorrhizal symbionts, food (mushrooms), antibiotics (penicillin).",
      "❌ 'Fungi are plants.' ✅ Fungi are in their own kingdom; they have chitin cell walls (not cellulose), are heterotrophic (not photosynthetic).",
      "❌ 'Mushrooms are plants.' ✅ Mushrooms are fungi (basidiomycetes); they lack chlorophyll and cannot photosynthesize.",
      "❌ 'Yeasts are multicellular.' ✅ Yeasts (Saccharomyces) are unicellular fungi that reproduce by budding.',
      "❌ 'All molds are phycomycetes.' ✅ Molds occur in multiple fungal groups; Rhizopus is phycomycete, Penicillium is ascomycete."
    ],
    examples: [
      "Rhizopus (bread mold): Coenocytic hyphae, sporangia produce zoospores, reproduces rapidly on bread.",
      "Saccharomyces cerevisiae (baker's yeast): Unicellular ascomycete, ferments sugars to produce CO₂ and ethanol.",
      "Penicillium: Produces penicillin antibiotic; grows on bread/fruit as blue-green mold.",
      "Agaricus bisporus (button mushroom): Basidiomycete with fleshy basidiocarp; commercially cultivated."
    ],
    universalFacts: [
      "Fungi are more closely related to animals than to plants (shared recent common ancestor).",
      "Mycorrhizal fungi form symbiotic relationships with ~90% of land plant species.",
      "Penicillin, the first antibiotic, was discovered from Penicillium mold by Alexander Fleming (1928).",
      "Fungal biomass exceeds all plant and animal biomass combined in many ecosystems."
    ],
    summary: "Fungi are diverse eukaryotic heterotrophs with chitinous cell walls, classified into Phycomycetes (coenocytic), Ascomycetes (sac fungi), Basidiomycetes (club fungi), and Deuteromycetes (imperfect fungi). They play crucial roles as decomposers, symbionts (mycorrhizae, lichens), pathogens, and sources of antibiotics and food. Understanding fungal biology is essential for medicine, agriculture, and ecology."
  },

  'algae': {
    notes: [
      "**General Characteristics:** Algae are photosynthetic, thallophytic organisms ranging from unicellular to multicellular forms. Aquatic (freshwater and marine). Cell walls contain cellulose; some have silica (diatoms) or calcium carbonate (coralline algae). Pigments: chlorophyll a, b, c, carotenoids, phycobilins (red/blue algae). Store food as starch, floridean starch, or laminarin.",
      "**Green Algae (Chlorophyceae):** Chlorophyll a and b; store starch; cellulosic cell walls; flagellated cells when present. Examples: Spirogyra (filamentous, spiral chloroplasts, conjugation), Chlamydomonas (unicellular), Volvox (colonial), Ulothrix, Chara (stonewort). Sexual reproduction: isogamy, anisogamy, or oogamy.",
      "**Brown Algae (Phaeophyceae):** Chlorophyll a and c; brown pigment fucoxanthin; store laminarin and mannitol. Mostly marine; range from unicellular to large kelps (up to 60m). Examples: Ectocarpus ( filamentous), Dictyota (branched), Sargassum (floating), Laminaria (kelp), Fucus. Reproduction: isomorphic or heteromorphic alternation of generations.",
      "**Red Algae (Rhodophyceae):** Chlorophyll a and d; red pigment phycoerythrin; store floridean starch. Mostly marine; many in deep water (phycoerythrin absorbs blue light penetrating deep). Cell walls contain cellulose and polysaccharides (agar, carrageenan). Examples: Polysiphonia, Batrachospermum, Porphyra (nori), Gracilaria (agar source). No flagellated cells at any stage."
    ],
    confusion: [
      "❌ 'All algae are aquatic.' ✅ Some algae live in soil, on tree bark, or in symbiotic relationships (lichens with fungi).",
      "❌ 'Algae are plants.' ✅ Algae are protists (or plants in broad sense); they lack true roots, stems, leaves, and vascular tissue.',
      "❌ 'Red algae are not photosynthetic.' ✅ Red algae ARE photosynthetic; phycoerythrin allows them to photosynthesize in deep water.',
      "❌ 'Brown algae are close to green algae.' ✅ Brown algae (stramenopiles) are more closely related to diatoms than to green algae.',
      "❌ 'Spirogyra reproduces by zoospores.' ✅ Spirogyra reproduces asexually by fragmentation and sexually by conjugation (no flagellated cells)."
    ],
    examples: [
      "Spirogyra: Filamentous green alga with spiral chloroplasts; conjugation bridges form zygospores.",
      "Ectocarpus: Brown alga with isomorphic alternation of generations; model organism for brown algae.",
      "Porphyra: Red alga cultivated as 'nori' for sushi; blade-like thallus.",
      "Laminaria: Large brown kelp; commercial source of algin (thickening agent)."
    ],
    universalFacts: [
      "Algae produce over 70% of Earth's oxygen through photosynthesis.",
      "Agar, extracted from red algae, is essential for microbiology culture media.",
      "Kelp forests (brown algae) are among the most productive ecosystems on Earth.",
      "Diatoms (single-celled algae with silica shells) contribute ~20% of global oxygen production."
    ],
    summary: "Algae are diverse photosynthetic organisms classified into Green (Chlorophyceae), Brown (Phaeophyceae), and Red (Rhodophyceae) algae based on pigments, stored food, and ultrastructure. They range from unicellular to giant kelps, occupy diverse aquatic habitats, and are ecologically vital as primary producers. Economic importance includes food, agar, algin, and pharmaceuticals."
  },

  'bryophytes': {
    notes: [
      "**General Characteristics:** Bryophytes are non-vascular land plants (mosses, liverworts, hornworts). Dominant gametophyte generation; sporophyte dependent on gametophyte. Require water for fertilization (flagellated sperm swim to egg). No true roots, stems, or leaves; have rhizoids for attachment. Reproduce by spores. Poikilohydric (cannot regulate water content).",
      "**Liverworts (Marchantiophyta):** Thalloid or leafy body. Calyptra covers sporophyte (remnant of vesture). Capsule with elaters for spore dispersal. Gemmae cups for asexual reproduction in Marchantia. Examples: Marchantia (thalloid), Riccia (simple thallus), Pellia.",
      "**Mosses (Bryophyta):** Leafy shoot with stem-like and leaf-like structures. Protonema is filamentous juvenile stage from spore. Gametophyte dominant, green, photosynthetic. Sporophyte consists of foot, seta, and capsule with peristome teeth for spore dispersal. Examples: Funaria (common moss), Polytrichum, Sphagnum (peat moss).",
      "**Hornworts (Anthocerotophyta):** Thalloid body with single large chloroplast per cell (unique). Sporophyte horn-shaped, grows from base (intercalary meristem), photosynthetic. Examples: Anthoceros, Drymaria.",
      "**Ecological Importance:** Pioneer species colonizing bare rock; soil formation; water retention (Sphagnum holds 20x its weight in water); peat formation; bioindicators of pollution."
    ],
    confusion: [
      "❌ 'Bryophytes have vascular tissue.' ✅ Bryophytes LACK true vascular tissue (xylem/phloem); they are non-vascular plants.",
      "❌ 'Bryophytes produce seeds.' ✅ Bryophytes reproduce by spores, not seeds; seeds are characteristic of spermatophytes.',
      "❌ 'Sporophyte is independent in bryophytes.' ✅ Sporophyte is PARASITIC on gametophyte in bryophytes; derives nutrients from it.',
      "❌ 'Bryophytes can grow tall because they have vascular tissue.' ✅ Bryophytes remain small due to lack of vascular tissue and reliance on diffusion.',
      "❌ 'All bryophytes look alike.' ✅ Liverworts, mosses, and hornworts have distinct morphologies and life cycles."
    ],
    examples: [
      "Marchantia: Thallose liverwort with umbrella-like archegoniophores and antheridiophores; gemmae cups for asexual reproduction.",
      "Funaria: Common moss with hairy capsules; protonema stage from spore germination; sporophyte with seta and operculate capsule.",
      "Sphagnum (peat moss): Forms extensive bogs; acidic, anaerobic conditions preserve organic matter; important fuel source historically.",
      "Polytrichum: Tall moss with leafy shoots;假 roots (rhizoids); sporophyte with elaborate capsule structure."
    ],
    universalFacts: [
      "Bryophytes were among the first plants to colonize land (~450 million years ago).",
      "Sphagnum peat moss can absorb and retain 20 times its dry weight in water.",
      "Bryophytes lack true vascular tissue but have specialized conducting cells in some species.",
      "Mosses can survive complete desiccation and revive when water becomes available (poikilohydric)."
    ],
    summary: "Bryophytes (mosses, liverworts, hornworts) are non-vascular land plants with dominant gametophyte generation. They require water for fertilization and reproduce by spores. Liverworts include thalloid Marchantia with gemmae cups; mosses have leafy shoots and protonema stages. Bryophytes are ecologically important as pioneers, soil formers, and water regulators."
  },

  'pteridophytes': {
    notes: [
      "**General Characteristics:** Pteridophytes are vascular seedless plants (ferns and allies). Dominant sporophyte generation; gametophyte (prothallus) is small, independent, photosynthetic. First plants with true vascular tissue (xylem and phloem). Reproduce by spores; require water for fertilization. Heterosporous (some) or homosporous (most).",
      "**Classification:** Lycopsida (club mosses: Selaginella, Lycopodium), Sphenopsida (horsetails: Equisetum), Psilotophyta (whisk ferns: Psilotum), Pteridopsida (true ferns: Dryopteris, Adiantum).",
      "**Dryopteris (Fern):** Common forest fern with compound leaves (fronds). Underground rhizome with roots. Sporangia clustered in sori on underside of sporophylls; protected by indusium (flap). Sporocytes undergo meiosis to produce haploid spores. Spores germinate into small heart-shaped prothallus (gametophyte) with archegonia and antheridia.",
      "**Life Cycle:** Alternation of generations with sporophyte dominant. Sporophyte produces sporangia → meiosis → spores → gametophyte (prothallus) → gametes (sperm and egg) → fertilization (requires water) → zygote → sporophyte.",
      "**Economic Importance:** Ornamental plants (ferns), medicinal (dryopteris extract for tapeworm), food (young fronds), soil erosion control, bioindicators."
    ],
    confusion: [
      "❌ 'Pteridophytes produce seeds.' ✅ Pteridophytes are SEEDLESS vascular plants; they reproduce by spores, not seeds.',
      "❌ 'Ferns are gymnosperms.' ✅ Ferns are pteridophytes; gymnosperms produce naked seeds in cones.',
      "❌ 'Spores are the same as seeds.' ✅ Spores are single cells that germinate into gametophytes; seeds are multicellular embryos with food supply.',
      "❌ 'Gametophyte is dominant in ferns.' ✅ Sporophyte is dominant in ferns; gametophyte (prothallus) is small and short-lived.',
      "❌ 'All pteridophytes are homosporous.' ✅ Some pteridophytes (Selaginella, Salvinia) are heterosporous, producing microspores and megaspores."
    ],
    examples: [
      "Dryopteris: Common wood fern with compound fronds; sori protected by indusia; homosporous.",
      "Selaginella (club moss): Heterosporous with ligulate leaves; spikemosses in tropical forests.",
      "Equisetum (horsetail): Jointed stems with silica deposits; ancient giant horsetails formed coal deposits.",
      "Adiantum (maidenhair fern): Delicate fan-shaped leaflets; popular ornamental fern."
    ],
    universalFacts: [
      "Ferns were dominant vegetation during Carboniferous period (~360-300 million years ago), forming vast coal deposits.",
      "Some ferns (Marsilea) are heterosporous; others are homosporous.",
      "Fern prothallus can be hermaphroditic (both archegonia and antheridia) or unisexual.",
      "Horsetails (Equisetum) have silicon-rich cell walls, making them abrasive and useful as sandpaper."
    ],
    summary: "Pteridophytes are vascular seedless plants including ferns, club mosses, horsetails, and whisk ferns. They have dominant sporophyte generation with true vascular tissue, reproducing by spores. Dryopteris (fern) exemplifies the group with compound fronds, sori-bearing sporophylls, and independent prothallus gametophyte. Pteridophytes were ecologically dominant in Carboniferous period and remain important in modern forests."
  },

  'gymnosperms': {
    notes: [
      "**General Characteristics:** Gymnosperms are 'naked-seeded' vascular plants. Seeds not enclosed in ovary/fruit; exposed on cone scales or modified leaves. Dominant sporophyte generation. Usually woody trees/shrubs. Vascular tissue well-developed with tracheids (no vessel elements in most). Pollen grains carried by wind to ovules. Require water for fertilization? NO! Pollen tube delivers sperm to egg.",
      "**Pinus (Pine):** Evergreen conifer with needle-like leaves (foliar sclerenchyma reduces water loss). Monoecious: male (strobili) and female (strobili) cones on same tree. Male cones: microsporophylls with microsporangia producing pollen grains (2-winged for wind dispersal). Female cones: macrosporophylls with ovules containing nucellus, integument, micropyle.",
      "**Seed Development:** Pollen grain germinates on ovule → pollen tube grows through nucellus → generative cell divides into body cell and tube cell → sperm cells formed → fertilization (one sperm fuses with egg → zygote; other degenerates in Pinus). Seed consists of embryo, endosperm (haploid female tissue), and seed coat (integument).",
      "**Life Cycle:** Sporophyte dominant. Cones bear sporangia. Microsporangia → microspores → pollen grains (male gametophyte). Megasporangium → megaspore → female gametophyte (in ovule). Fertilization → zygote → embryo → seed. Germination → new sporophyte.",
      "**Economic Importance:** Timber (pine, spruce, fir), paper pulp, resin/turpentine, food (nuts: pine seeds, cashew), ornamental, medicinal (taxol from yew for cancer)."
    ],
    confusion: [
      "❌ 'Gymnosperms produce flowers.' ✅ Gymnosperms have CONES (strobili), not flowers; flowers are characteristic of angiosperms.",
      "❌ 'Gymnosperm seeds are enclosed in fruit.' ✅ Gymnosperm means 'naked seed'; seeds are exposed on cone scales, not enclosed in ovary.',
      "❌ 'Gymnosperms require water for fertilization.' ✅ Gymnosperms have POLLEN TUBES; water is NOT required for sperm delivery (unlike bryophytes/pteridophytes).',
      "❌ 'All gymnosperms are herbaceous.' ✅ Most gymnosperms are woody trees (pines, firs, cedars); only Ginkgo and Cycads are trees, Ephedra is shrubby.',
      "❌ 'Endosperm in gymnosperms is diploid.' ✅ Endosperm in gymnosperms is HAPLOID (female gametophyte tissue), unlike angiosperms where it is triploid."
    ],
    examples: [
      "Pinus roxburghii (Chir pine): Common in Nepal; needle bundles of 3; cones persist 18 months.",
      "Cedrus deodara (Deodar): Tall evergreen; religious significance in Himalayas; timber and oil.",
      "Taxus wallichiana (Himalayan yew): Source of taxol (anticancer drug); endangered.",
      "Gnetum: Unique gymnosperm with vessel elements and double fertilization (anomalous feature)."
    ],
    universalFacts: [
      "Gymnosperms dominated Earth during Mesozoic era ('Age of Gymnosperms', 252-66 million years ago).",
      "Pine pollen grains have two air bladders (wings) aiding wind dispersal over long distances.",
      "Ginkgo biloba is the only surviving species of its division; called 'living fossil'.",
      "Yew trees produce taxol, a potent anticancer drug used in chemotherapy."
    ],
    summary: "Gymnosperms are vascular seed plants with 'naked seeds' not enclosed in fruits. Pinus exemplifies the group with coniferous needles, monoecious cones, wind-pollinated pollen tubes, and seed development on cone scales. Gymnosperms include conifers, cycads, ginkgo, and gnetophytes. They are economically vital for timber, paper, resin, and pharmaceuticals."
  },

  'angiosperms': {
    notes: [
      "**General Characteristics:** Angiosperms are flowering plants with seeds enclosed in ovaries (fruits). Double fertilization unique: one sperm fertilizes egg → zygote (2n); other sperm fuses with polar nuclei → endosperm (3n). Vascular tissue includes vessels and sieve tubes. Flowers are modified shoots for reproduction.",
      "**Flower Structure:** Four whorls: Calyx (sepals), Corolla (petals), Androecium (stamens: anther + filament), Gynoecium (carpel/pistil: stigma, style, ovary). Flowers can be perfect (both sexes) or imperfect (one sex). Inflorescence types: racemose (acropetal) or cymose (basipetal).",
      "**Pollination:** Transfer of pollen from anther to stigma. Self-pollination (within same flower/plant) or cross-pollination (between plants). Agents: wind (anemophily), water (hydrophily), insects (entomophily), birds (ornithophily), bats (chiropterophily). Adaptations: colorful petals, nectar, scent, specialized flower shapes.",
      "**Double Fertilization:** Pollen grain germinates on stigma → pollen tube grows through style → reaches ovule through micropyle → generative cell divides into 2 sperm cells → one sperm fuses with egg → zygote (2n) → embryo; other sperm fuses with 2 polar nuclei → primary endosperm nucleus (3n) → endosperm. Unique to angiosperms.",
      "**Seed and Fruit Development:** Ovule → seed (embryo + endosperm + seed coat). Ovary → fruit (pericarp from ovary wall). Fruits aid seed dispersal: fleshy (berry, drupe, pome) or dry (achene, capsule, samara, schizocarp)."
    ],
    confusion: [
      "❌ 'Double fertilization occurs in gymnosperms.' ✅ Double fertilization (zygote + endosperm) is UNIQUE TO ANGIOSPERMS.',
      "❌ 'All flowers have both male and female parts.' ✅ Many flowers are unisexual (monoecious: separate male/female on same plant; dioecious: separate male/female plants).',
      "❌ 'Fruit is the seed.' ✅ Fruit develops from OVARY; seed develops from OVULE. Fruit protects and aids seed dispersal.',
      "❌ 'Endosperm is diploid.' ✅ Angiosperm endosperm is TRIPLOID (3n) from fusion of one sperm + two polar nuclei.',
      "❌ 'Pollination requires water.' ✅ Wind and animal pollination do NOT require water; only bryophytes/pteridophytes require water for fertilization."
    ],
    examples: [
      "Brassica (mustard): Perfect flowers, self-incompatible promoting cross-pollination; fruit is silique.",
      "Mango: Drupe fruit (fleshy mesocarp, stony endocarp); endosperm absorbed during seed development.",
      "Wheat: Cerealcaryopsis fruit (pericarp fused to seed coat); albuminous seed with endosperm.",
      "Pea: Papilionaceous flower (butterfly-shaped); legume fruit (pod) with adherent seeds."
    ],
    universalFacts: [
      "Angiosperms comprise ~300,000 species (~80% of all plant species) and dominate most terrestrial ecosystems.",
      "Double fertilization is unique to angiosperms and produces both embryo and nutritive endosperm.",
      "Co-evolution between flowers and pollinators has driven tremendous diversity in both groups.",
      "Grasses (Poaceae) are the most economically important angiosperm family, providing staple foods worldwide."
    ],
    summary: "Angiosperms are flowering plants with seeds enclosed in fruits, featuring double fertilization (zygote + endosperm). Flower structure includes four whorls (calyx, corolla, androecium, gynoecium) adapted for pollination by various agents. Fruits develop from ovaries and aid seed dispersal. Angiosperms are the most diverse plant group, dominating terrestrial ecosystems and providing essential food, fiber, and medicine."
  },

  // ── INTRODUCTION TO BIOLOGY ──
  'scope-fields-biology': {
    notes: [
      "**Definition of Biology:** Study of life and living organisms from Greek 'bios' (life) + 'logos' (study). Encompasses all aspects of life: structure, function, growth, evolution, distribution, and taxonomy of organisms.",
      "**Branches of Biology:** Morphology (form/structure), Anatomy (internal structure), Physiology (function), Biochemistry (chemical processes), Genetics (heredity), Ecology (organism-environment interactions), Taxonomy (classification), Evolution (descent with modification), Microbiology (microorganisms), Biotechnology (industrial use of organisms).",
      "**Interdisciplinary Connections:** Biology intersects with Chemistry (biochemistry, molecular biology), Physics (biophysics, medical imaging), Mathematics (biostatistics, modeling), Earth Science (ecology, paleontology), Computer Science (bioinformatics, computational biology).",
      "**Fields of Biology:** Botany (plants), Zoology (animals), Microbiology (microorganisms), Immunology (immune system), Virology (viruses), Parasitology (parasites), Paleontology (fossils), Marine Biology (ocean organisms), Cell Biology, Molecular Biology, Developmental Biology, Neurobiology.",
      "**Scope in Nepal:** Biodiversity hotspot with diverse ecosystems (Terai, Hills, Mountains); endemic species; traditional knowledge of medicinal plants; conservation challenges; agricultural biotechnology potential."
    ],
    confusion: [
      "❌ 'Biology only studies living organisms.' ✅ Biology also studies viruses (acellular), extinct organisms (paleontology), and life processes in dead material (biochemistry).",
      "❌ 'Botany and Zoology are the only branches.' ✅ Biology has dozens of specialized branches covering molecules to ecosystems.',
      "❌ 'Biology is unrelated to physics and chemistry.' ✅ Biophysics, biochemistry, and molecular biology bridge these disciplines.',
      "❌ 'Microbiology only studies disease-causing organisms.' ✅ Most microbes are beneficial; only few are pathogenic.',
      "❌ 'Nepal has no unique biological significance.' ✅ Nepal is a biodiversity hotspot with many endemic species and ecological zones."
    ],
    examples: [
      "Botany: Study of Nepal's rhododendron (national flower), medicinal plants (Yarsagumba), and rhino grasslands.",
      "Zoology: Research on snow leopards, Bengal tigers, and migratory birds in Nepal.",
      "Microbiology: Studying gut flora in digestion; industrial fermentation for cheese/yoghurt.",
      "Ecology: Monitoring ecosystem health through indicator species like amphibians."
    ],
    universalFacts: [
      "Biology ranges in scale from molecules (nanometers) to biosphere (planetary scale).",
      "Over 8.7 million species estimated on Earth; only ~1.2 million described so far.",
      "All known life shares common biochemical machinery (DNA, RNA, proteins, ATP).",
      "Biology drives solutions to global challenges: food security, medicine, climate change, conservation."
    ],
    summary: "Biology is the comprehensive study of life and living organisms across all scales, from molecules to ecosystems. Major branches include botany, zoology, microbiology, ecology, genetics, and biochemistry. Biology intersects extensively with other sciences and is essential for addressing global challenges in health, agriculture, and environment. Nepal's biodiversity richness makes biological research particularly valuable locally."
  },

  // ── INTRODUCTORY MICROBIOLOGY ──
  'monera-bacteria': {
    notes: [
      "**General Characteristics:** Monera (Kingdom) includes prokaryotic organisms: bacteria and cyanobacteria (blue-green algae). unicellular, microscopic, no membrane-bound organelles. Cell wall of peptidoglycan (bacteria) or polysaccharides (cyanobacteria). Reproduce by binary fission; some form endospores for survival. Morphology: cocci (spherical), bacilli (rod-shaped), spirilla (spiral), vibrio (comma-shaped).",
      "**Bacterial Cell Structure:** Capsule (protective slime layer), cell wall (peptidoglycan, Gram-positive thick, Gram-negative thin + outer membrane), cell membrane (selectively permeable), cytoplasm (70S ribosomes, mesosomes, plasmids), nucleoid (circular DNA, no nuclear envelope), flagella (protein, rotary motor, for motility), pili/fimbriae (for attachment/conjugation).",
      "**Gram Staining:** Differential staining method by Hans Gram (1884). Gram-positive: thick peptidoglycan retains crystal violet (purple). Gram-negative: thin peptidoglycan + outer membrane loses crystal violet, takes up safranin (pink/red). Important for identification and antibiotic selection.",
      "**Cyanobacteria (Blue-Green Algae):** Photosynthetic bacteria with chlorophyll a and phycobilins. No chloroplasts; pigments in thylakoids. Fix atmospheric nitrogen in specialized cells (heterocysts). Colonial (Microcystis) or filamentous (Nostoc, Oscillatoria). Important primary producers in aquatic ecosystems.",
      "**Economic Importance:** Beneficial: nitrogen fixation, decomposition, yogurt/cheese production, antibiotic production (Streptomyces), bioremediation. Harmful: pathogens (Tuberculosis, Cholera, Pneumonia), food spoilage, biofouling."
    ],
    confusion: [
      "❌ 'All bacteria are harmful pathogens.' ✅ Most bacteria are harmless or beneficial; only a few cause disease.',
      "❌ 'Bacteria have membrane-bound organelles.' ✅ Bacteria are prokaryotes; they LACK membrane-bound organelles like mitochondria, ER, Golgi.',
      "❌ 'Gram-positive and Gram-negative differ only in color.' ✅ Gram-positive has THICK peptidoglycan; Gram-negative has THIN peptidoglycan + OUTER MEMBRANE with LPS.',
      "❌ 'Bacteria reproduce by mitosis.' ✅ Bacteria reproduce by BINARY FISSION (simple division); mitosis occurs in eukaryotes.',
      "❌ 'Cyanobacteria are algae.' ✅ Cyanobacteria are BACTERIA (prokaryotes); algae are eukaryotic protists/plants."
    ],
    examples: [
      "Escherichia coli: Common gut bacterium; model organism in molecular biology; some strains pathogenic.",
      "Streptomyces: Soil bacterium producing >2/3 of clinical antibiotics (streptomycin, tetracycline).",
      "Rhizobium: Nitrogen-fixing symbiont in legume root nodules; converts N₂ to ammonia.",
      "Nostoc: Colonial cyanobacterium forming gelatinous masses; fixes nitrogen in heterocysts."
    ],
    universalFacts: [
      "Bacteria outnumber all other organisms combined; there are ~10³⁰ bacteria on Earth.",
      "Bacterial biomass exceeds all plant and animal biomass combined.",
      "Antibiotics like penicillin come from bacteria (Penicillium is fungus; streptomycin from Streptomyces bacteria).",
      "Human body contains ~38 trillion bacteria, mostly in gut, outnumbering human cells."
    ],
    summary: "Monera includes prokaryotic bacteria and cyanobacteria with peptidoglycan cell walls, 70S ribosomes, and circular DNA. Gram staining differentiates thick-walled Gram-positive from thin-walled Gram-negative bacteria. Cyanobacteria are photosynthetic prokaryotes with heterocysts for nitrogen fixation. Bacteria are essential for nutrient cycling, food production, and medicine, though some are pathogenic."
  },

  'virus': {
    notes: [
      "**General Characteristics:** Viruses are acellular infectious agents smaller than bacteria (20-300 nm). Not considered living outside host cells. Consist of nucleic acid (DNA or RNA, never both) surrounded by protein coat (capsid). Some have lipid envelope from host membrane. Obligate intracellular parasites; replicate only inside host cells.",
      "**Virus Structure:** Nucleic acid core (genome): single/double stranded, DNA or RNA, linear or circular. Capsid: protein shell made of capsomeres; protects genome; determines virus shape (helical, icosahedral, complex). Envelope: lipid membrane with viral glycoproteins (spikes) for host recognition. Some have additional layers (matrix protein).",
      "**Bacteriophage Structure:** Complex icosahedral head (capsid) containing DNA, contractile tail, tail fibers for host attachment. T4 phage model: head diameter ~90nm, tail ~100nm x 20nm. Lytic and lysogenic cycles. Tail fibers recognize specific bacterial receptors.",
      "**Viral Replication Cycles:** Lytic cycle: attachment → penetration → biosynthesis → maturation → lysis/release. Lysogenic cycle: attachment → penetration → integration (provirus/prophage) → replication with host → induction → lytic cycle. Retroviruses (HIV): RNA genome → reverse transcriptase → DNA → integrates into host genome.",
      "**Viral Diseases:** Common cold (rhinovirus), influenza, HIV/AIDS (retrovirus), hepatitis (multiple viruses), COVID-19 (SARS-CoV-2), polio, rabies, chickenpox, measles, Ebola. Animal viruses, plant viruses (TMV), bacterial viruses (bacteriophages)."
    ],
    confusion: [
      "❌ 'Viruses are living organisms.' ✅ Viruses are ACCELLULAR; they lack metabolism and cannot reproduce without a host cell.',
      "❌ 'Viruses have both DNA and RNA.' ✅ Viruses have EITHER DNA OR RNA, never both (unlike cells).',
      "❌ 'Antibiotics kill viruses.' ✅ Antibiotics target bacterial structures; viruses require ANTIVIRAL drugs or vaccines.',
      "❌ 'All viruses are spherical.' ✅ Virus shapes vary: helical (TMV), icosahedral (poliovirus), complex (bacteriophage).',
      "❌ 'Viruses are larger than bacteria.' ✅ Viruses are SMALLER than bacteria; most pass through bacterial filters."
    ],
    examples: [
      "T4 bacteriophage: Model virus infecting E. coli; complex structure with head, tail, fibers.",
      "Influenza virus: Enveloped RNA virus with hemagglutinin and neuraminidase spikes; mutates rapidly.",
      "HIV: Retrovirus attacking CD4+ T cells; reverse transcriptase converts RNA to DNA.",
      "TMV (Tobacco mosaic virus): First virus discovered; helical rod-shaped; RNA genome."
    ],
    universalFacts: [
      "Viruses are smaller than bacteria; most pass through filters that trap bacteria.",
      "Viruses can crystallize like chemicals, demonstrating their acellular nature.",
      "Bacteriophages are the most abundant biological entities on Earth (~10³¹ particles).",
      "Viruses drive evolution through horizontal gene transfer and selective pressure."
    ],
    summary: "Viruses are acellular infectious particles consisting of nucleic acid (DNA or RNA) enclosed in protein capsid, sometimes with lipid envelope. They are obligate intracellular parasites replicating only in host cells. Bacteriophages (e.g., T4) have complex结构与 lytic/lysogenic cycles. Viruses cause numerous diseases but also serve as tools in biotechnology and gene therapy."
  },

  // ── BIOITA AND ENVIRONMENT ──
  'animal-adaptation-aquatic-terrestrial-and-volant-adaptation': {
    notes: [
      "**Aquatic Adaptations:** Primary (structural): streamlined body, fins/flippers, gills for respiration, swim bladder for buoyancy, lateral line system, countercurrent heat exchange. Secondary (physiological): salt glands for osmoregulation, blubber for insulation, ability to hold breath (marine mammals), specialized hemoglobin for diving.",
      "**Cursorial Adaptations (Running):** Long slender limbs, reduced digits (hooves in ungulates, toes in horses), elastic tendons for energy storage, fused bones for strength, Digitigrade or unguligrade posture, specialized muscles for speed/endurance.",
      "**Fossorial Adaptations (Digging/Burrowing):** Spade-like forelimbs, powerful claws, reduced eyes (protected by eyelids/nictitating membrane), velvety fur (allows movement in tunnels), cylindrical body, vestigial external ears.",
      "**Arboreal Adaptations (Tree-dwelling):** Prehensile tails, grasping hands/feet with opposable thumbs/toes, binocular vision for depth perception, flexible limbs, nail instead of claws, keen balance.",
      "**Volant Adaptations (Flying):** Wings (modified forelimbs with feathers in birds, patagium in bats), hollow bones (pneumatized), keeled sternum for flight muscle attachment, efficient respiratory system (air sacs), lightweight skeleton, fused bones for rigidity."
    ],
    confusion: [
      "❌ 'All aquatic animals have gills.' ✅ Marine mammals (whales, dolphins) breathe air with lungs; some fish can breathe air.',
      "❌ 'Birds and bats have homologous wings.' ✅ Bird and bat wings are ANALOGOUS (similar function, different origin); bird wings are modified scales/feathers, bat wings are skin stretched over elongated fingers.',
      "❌ 'Burrowing animals have good eyesight.' ✅ Fossorial animals often have REDUCED eyes; living in darkness selects against vision.',
      "❌ 'Flying requires heavy bones for stability.' ✅ Flying animals have HOLLOW/pneumatized bones to reduce weight.',
      "❌ 'Arboreal animals all have prehensile tails.' ✅ Many arboreal animals use grasping hands/feet; prehensile tails are specific to some primates and marsupials."
    ],
    examples: [
      "Aquatic: Dolphin streamlined body, flippers, blowhole, blubber for insulation in cold water.",
      "Cursorial: Cheetah long legs, flexible spine, non-retractable claws for traction, sprint speed 110 km/h.",
      "Fossorial: Mole spade-like forelimbs, Velvety fur, reduced eyes, powerful digging claws.",
      "Arboreal: Monkey grasping hands with opposable thumb, binocular vision, prehensile tail in some species.",
      "Volant: Bird hollow bones, keeled sternum, air sacs, feathers for lift/thrust."
    ],
    universalFacts: [
      "Streamlined bodies reduce drag in water by up to 60%, enabling efficient swimming.",
      "Hummingbird wings can beat 50-80 times per second, enabling hovering flight.",
      "Moles can dig tunnels at rate of 18 feet per hour using powerful forelimbs.",
      "Tree frogs have adhesive toe pads with microscopic hairs for climbing smooth surfaces."
    ],
    summary: "Animal adaptations reflect evolutionary solutions to environmental challenges. Aquatic adaptations include streamlining and gills; cursorial for running (long limbs, reduced digits); fossorial for digging (spade-like limbs, reduced eyes); arboreal for climbing (prehensile appendages); volant for flying (wings, hollow bones). Each adaptation suite represents trade-offs optimized for specific ecological niches."
  },

  'animal-behavior-reflex-action-taxes-dominance-and-leadership-fish-and-bird-migration': {
    notes: [
      "**Reflex Action:** Involuntary, rapid response to stimulus via reflex arc (receptor → sensory neuron → interneuron in spinal cord → motor neuron → effector). Examples: knee-jerk (patellar) reflex, withdrawal from pain, pupil constriction to light. Fast, protective, does not involve brain consciousness initially.",
      "**Taxes (Taxis):** Directional movement response to stimulus. Positive (toward stimulus): phototaxis (moths to light), chemotaxis (bacteria to nutrients). Negative (away from stimulus): negative phototaxis (woodlice avoiding light). Simple orientation behavior.",
      "**Kinesis:** Non-directional movement response to stimulus intensity. Orthosis (change in speed): woodlice move faster in dry conditions, slower in humid. Turnosisis (change in turning rate): cockroaches turn more in bright light. Random direction, but stimulus affects activity level.",
      "**Dominance Hierarchy:** Social ranking system in animal groups. Establishes order of access to resources (food, mates, territory). Reduces conflict through established pecking orders (chickens). Determined by size, strength, aggression, experience. Alpha individuals dominate; beta, gamma subordinate.",
      "**Leadership:** In group movement, leaders guide direction and pace. Determined by experience, knowledge, status. Wolf packs: alpha pair leads hunting/migration. Elephant herds: matriarch remembers water sources. Fish schools: informed individuals lead escape responses.",
      "**Migration:** Seasonal long-distance movement between breeding and wintering grounds. Birds: route learning, celestial navigation, magnetic field detection, landmark recognition. Fish: salmon navigate by olfactory cues to natal streams; eels use magnetic fields. Driven by photoperiod, temperature, hormonal changes."
    ],
    confusion: [
      "❌ 'Reflex actions involve the brain.' ✅ Reflex arcs bypass brain; processed in SPINAL CORD for speed; brain becomes aware AFTER reflex occurs.',
      "❌ 'Taxes are random movements.' ✅ Taxes are DIRECTED movements toward or away from stimulus; kinesis is random.',
      "❌ 'Dominance hierarchy causes constant fighting.' ✅ Once established, hierarchy REDUCES conflict; subordinates yield to superiors.',
      "❌ 'All migration is instinctive.' ✅ Some migration is learned (young follow adults); routes can be culturally transmitted.',
      "❌ 'Leaders are always the strongest.' ✅ Leaders are often the MOST EXPERIENCED, not necessarily strongest."
    ],
    examples: [
      "Reflex: Pulling hand from hot stove before feeling pain; pupillary light reflex.",
      "Taxis: Moths flying toward lamp (positive phototaxis); bacteria swimming toward glucose.",
      "Kinesis: Woodlice moving faster in dry areas until finding humid refuge.",
      "Dominance: Chicken pecking order; wolf pack alpha-betas; baboon troop hierarchy.",
      "Migration: Arctic tern flies pole-to-pole (70,000 km annually); monarch butterfly multi-generational migration; salmon natal homing."
    ],
    universalFacts: [
      "Reflex arc processing takes ~30 milliseconds; conscious response takes ~200 milliseconds.",
      "Monarch butterflies migrate 4,000 km from Canada to Mexico using sun compass and magnetic sense.",
      "Salmon return to exact birth stream using olfactory imprinting from juvenile stage.",
      "Dominance hierarchies reduce energy expenditure on fighting by 50-80% in stable groups."
    ],
    summary: "Animal behavior ranges from simple reflexes (spinal arc, milliseconds) to taxes (directed movement to stimulus) and kinesis (activity modulation). Social behaviors include dominance hierarchies (reducing conflict) and leadership (guided movement). Migration involves seasonal long-distance movement using navigation mechanisms (celestial, magnetic, olfactory). These behaviors are shaped by natural selection for survival and reproduction."
  },

  'pollution-types-effects': {
    notes: [
      "**Air Pollution:** Sources: vehicles (CO, NOₓ), industry (SO₂, particulates), burning fossil fuels, agriculture (NH₃, methane). Effects: respiratory diseases, acid rain (SO₂ + NOₓ → H₂SO₄/HNO₃), greenhouse effect (CO₂, CH₄), ozone depletion (CFCs), smog formation. Control: catalytic converters, scrubbers, renewable energy, afforestation.",
      "**Water Pollution:** Sources: industrial effluents (heavy metals, chemicals), agricultural runoff (pesticides, fertilizers), sewage, oil spills, thermal pollution. Effects: eutrophication (nutrient overload → algal bloom → oxygen depletion), biomagnification of toxins, waterborne diseases (cholera, typhoid), destruction of aquatic life. Control: wastewater treatment, buffer zones, reduced fertilizer use.",
      "**Soil Pollution:** Sources: pesticides, herbicides, industrial waste, landfill leachate, acid deposition. Effects: loss of fertility, accumulation of toxic substances, soil erosion, contamination of groundwater, harm to soil organisms. Control: organic farming, crop rotation, bioremediation, proper waste disposal.",
      "**Pesticide Effects:**DDT biomagnification in food chains; causes eggshell thinning in birds (raptors). Organophosphates inhibit acetylcholinesterase → neurotoxicity. Herbicides (atrazine) disrupt endocrine systems. Integrated Pest Management (IPM) reduces pesticide dependence through biological control, crop rotation, resistant varieties.",
      "**Bioaccumulation and Biomagnification:** Bioaccumulation: toxin concentration increases in individual organism over time. Biomagnification: toxin concentration increases at each trophic level in food chain. DDT example: plankton → fish → fish-eating bird; concentrations amplify 10⁶-fold."
    ],
    confusion: [
      "❌ 'Air pollution only causes respiratory problems.' ✅ Air pollution also causes acid rain, climate change, ozone depletion, and ecosystem damage.',
      "❌ 'Eutrophication is caused by organic matter only.' ✅ Eutrophication is primarily caused by NUTRIENT OVERLOAD (N, P fertilizers), not just organic decay.',
      "❌ 'Pesticides break down quickly in environment.' ✅ Some pesticides (DDT, dieldrin) are PERSISTENT, remaining in environment for decades.',
      "❌ 'Biomagnification and bioaccumulation mean the same thing.' ✅ Bioaccumulation = increase in individual; biomagnification = increase ACROSS TROPHIC LEVELS.',
      "❌ 'All pollutants are visible.' ✅ Many pollutants (CO, heavy metals, radiation) are invisible, odorless, tasteless."
    ],
    examples: [
      "Air: Smog in Kathmandu valley from vehicle exhaust + industrial emissions + geographic trapping.",
      "Water: Bagmati river polluted by municipal sewage + industrial waste; E. coli counts exceed safe limits.",
      "Soil: Pesticide residues in Terai agricultural lands from intensive rice/wheat farming.",
      "Biomagnification: DDT accumulating in eagles → thin eggshells → population decline (Silent Spring, Carson 1962)."
    ],
    universalFacts: [
      "Air pollution causes ~7 million premature deaths annually worldwide (WHO).",
      "DDT concentrations in top predators can be 10 million times higher than in water.",
      "Nepal's Bagmati river has E. coli levels 100-1000x above WHO drinking water standards.",
      "Acid rain (pH < 5.6) damages forests, acidifies lakes, corrodes buildings and statues."
    ],
    summary: "Environmental pollution encompasses air (vehicles, industry), water (sewage, agricultural runoff), and soil (pesticides, waste) contamination. Effects include diseases, eutrophication, biomagnification, acid rain, and climate change. Pesticides like DDT biomagnify up food chains, causing ecological damage. Control measures include emission standards, wastewater treatment, integrated pest management, and renewable energy transition."
  },

  // ── CONSERVATION BIOLOGY ──
  'biodiversity-conservation': {
    notes: [
      "**Biodiversity Definition:** Variety of life at all levels: genetic diversity (variation within species), species diversity (variety of species), ecosystem diversity (variety of habitats/ecosystems). Measured by species richness (number of species) and evenness (relative abundance).",
      "**Levels of Biodiversity:** Genetic: variation in alleles/genes within populations (e.g., rice varieties, dog breeds). Species: number and abundance of species in area (tropics highest, poles lowest). Ecosystem: variety of habitats (forests, wetlands, coral reefs). Functional: variety of ecological processes (pollination, decomposition, nutrient cycling).",
      "**Importance of Biodiversity:** Ecological: ecosystem stability, productivity, resilience. Economic: food, medicine, raw materials, tourism. Cultural: spiritual, aesthetic, educational value. Ethical: intrinsic right to exist. Option value: potential future uses unknown.",
      "**Threats to Biodiversity:** Habitat loss/degradation (deforestation, urbanization, agriculture) - PRIMARY threat. Overexploitation (hunting, fishing, logging). Invasive species (competitive displacement, predation). Pollution (chemical, noise, light). Climate change (shifting ranges, phenology mismatch). Fragmentation (isolated populations, edge effects).",
      "**Conservation Strategies:** In-situ: protecting species in natural habitat (national parks, wildlife reserves, sanctuaries, biosphere reserves). Ex-situ: protecting species outside natural habitat (zoos, botanical gardens, seed banks, cryopreservation). Legal: Wildlife Protection Act, CITES, IUCN Red List. Community: joint forest management, eco-tourism."
    ],
    confusion: [
      "❌ 'Conservation only means protecting animals.' ✅ Conservation includes GENETIC, SPECIES, and ECOSYSTEM diversity; plants, fungi, microbes equally important.',
      "❌ 'In-situ and ex-situ conservation are the same.' ✅ In-situ = natural habitat (national parks); Ex-situ = outside habitat (zoos, seed banks).',
      "❌ 'Biodiversity hotspots are evenly distributed.' ✅ Hotspots are CLUSTERED in tropics/subtropics; Nepal has 3 of 36 global hotspots.',
      "❌ 'Extinct species can be brought back by cloning.' ✅ Cloning extinct species is theoretically possible but extremely impractical; habitat loss would remain unaddressed.',
      "❌ 'More species always means healthier ecosystem.' ✅ Species Richness matters, but ECOSYSTEM FUNCTION depends on keystone species and interactions."
    ],
    examples: [
      "Genetic: Nepal's rice landraces (300+ varieties) adapted to different altitudes/soils.",
      "Species: Greater one-horned rhinoceros in Chitwan National Park; Bengal tiger conservation success.",
      "Ecosystem: Sacred groves in western Nepal preserving forest fragments; wetland conservation (Ramsar sites).",
      "IUCN Categories: Critically Endangered (red panda, vulture); Endangered (tiger, rhino); Vulnerable (snow leopard)."
    ],
    universalFacts: [
      "Earth has experienced 5 mass extinctions; current extinction rate is 100-1000x background rate (sixth mass extinction).",
      "Nepal contains 3 of 36 global biodiversity hotspots: Indo-Burma, Himalaya, Sundaland.",
      "Tropical rainforests cover 6% of Earth's land but contain ~50% of species.",
      "Over 50% of global medicines originate from natural products (plants, animals, microbes)."
    ],
    summary: "Biodiversity encompasses genetic, species, and ecosystem variation essential for ecosystem functioning and human wellbeing. Major threats include habitat loss, overexploitation, invasive species, pollution, and climate change. Conservation strategies combine in-situ (protected areas) and ex-situ (seed banks, zoos) approaches with legal frameworks (Wildlife Protection Act, CITES) and community participation for effective protection."
  },

  // ── VEGETATION ──
  'nepal-vegetation-zones': {
    notes: [
      "**Vegetation Zones in Nepal:** Altitude-dependent zonation from Terai to High Mountains. Terai (100-600m): Tropical deciduous forests (sal, sisau, mahua), grasslands (phanta). Siwalik/Hills (600-2000m): Moist subtropical forests (sal, chiraunji), dry deciduous (neem, semal). Middle Hills (2000-3000m): Temperate forests (chestnut, oak, rhododendron, juniper). High Hills/Alpine (3000-4000m): Subalpine (juniper, birch, rhododendron), Alpine meadows. Above 4000m: Nival zone (bare rock, snow).",
      "**Factors Influencing Vegetation:** Temperature decreases ~6.5°C per 1000m elevation. Precipitation varies by monsoon influence and rain shadow. Soil type, slope aspect (sun-exposed vs shaded), human disturbance all affect vegetation patterns.",
      "**Unique Features:** Nepal has vegetation comparable to traveling from equator to arctic. Rhododendron (national flower) has 34+ species. Endemic species in isolated mountains (e.g., Marsdenia braunii). Sacred groves preserve forest fragments. Community forestry manages ~2.2 million hectares.",
      "**Human Impact:** Deforestation for agriculture, fuelwood, timber. Shrinking forest cover from ~60% (1950s) to ~45% (current). Rehabilitation through community forestry successful. Eco-tourism supports conservation. Climate change shifts treeline upward, threatening alpine species."
    ],
    confusion: [
      "❌ 'Nepal has only tropical vegetation.' ✅ Nepal spans TROPICAL to NIVAL zones due to extreme elevation range (88m to 8848m).'",
      "❌ 'Forest cover is increasing in Nepal.' ✅ Forest cover DECREASED from 60% to 45% mid-20th century; recent community forestry shows recovery.',
      "❌ 'Alpine meadows extend above 4000m.' ✅ Above ~4000m is NIVAL zone (bare rock, snow); alpine meadows are 3000-4000m.',
      "❌ 'All mountains have same vegetation.' ✅ Vegetation varies by LOCAL conditions: slope, aspect, rainfall, soil.',
      "❌ 'Deforestation stopped in Nepal.' ✅ Deforestation PRESSURE continues; community forestry mitigates but doesn't eliminate threats."
    ],
    examples: [
      "Terai: Sal (Shorea robusta) dominant forest; dwarf bamboo; elephant grass phantas.",
      "Hills: Chirai (Schima wallichii), Mahuwa (Madhuca latifolia), Sissoo (Dalbergia sissoo).",
      "Mountains: Blue pine (Pinus wallichiana), Oak (Quercus spp.), Rhododendron (Rhododendron arboreum).",
      "Alpine: Juniper (Juniperus recurvata), Birch (Betulautilis), Alpine herbs, cushion plants."
    ],
    universalFacts: [
      "Nepal's elevation range (88m to 8848m) creates 8 distinct vegetation zones.",
      "Rhododendron arboreum is Nepal's national flower; 34+ species native to Nepal.",
      "Community forestry manages ~27% of Nepal's forest cover, a global success story.",
      "Warm-adapted Terai species are migrating uphill ~30m per decade due to climate change."
    ],
    summary: "Nepal's vegetation zonation reflects dramatic elevation changes from Terai (tropical) through hills (subtropical/temperate) to mountains (alpine/nival). Key species include sal in lowlands, rhododendron and oak in mid-hills, juniper and birch in higher zones. Human activities have reduced forest cover, but community forestry initiatives have reversed degradation. Climate change threatens to shift vegetation zones upward."
  },

  'in-situ-ex-situ-conservation': {
    notes: [
      "**In-situ Conservation:** Protecting species in their NATURAL HABITAT. Methods: National Parks (strict protection, no human entry), Wildlife Reserves (habitat protection, some human activity allowed), Conservation Areas (community-managed), Protected Forests (regulated use), Religious/Cultural Sites (sacred groves). Benefits: maintains evolutionary processes, ecosystem interactions, natural behavior.",
      "**Ex-situ Conservation:** Protecting species OUTSIDE NATURAL HABITAT. Methods: Zoos (breeding programs, education), Botanical Gardens (plant conservation), Seed Banks (stored seeds at -20°C), Cryopreservation (gametes, embryos at -196°C liquid N₂), Tissue Culture (meristem culture, cloning). Benefits: insurance against extinction, research, education, propagation.",
      "**Nepal Protected Areas:** Chitwan National Park (1973, UNESCO World Heritage): rhino, tiger, gharial. Sagarmatha National Park (1976): Everest region, snow leopard. Royal Bardia National Park: tiger, rhino. Annapurna Conservation Area (1986): largest protected area. Koshi Tappu Wildlife Reserve: wetland, birds. Buffer zone management involves local communities.",
      "**Ramsar Sites (Wetlands):** International importance wetlands convention. Nepal has 4 Ramsar sites: Koshi Tappu (first, 1987), Shey Phoksundo, Gokyo, Jalpa. Protect waterfowl habitat, flood control, groundwater recharge.",
      "**IUCN Categories:** Extinct (Ex), Endangered (EN), Vulnerable (VU), Near Threatened (NT), Least Concern (LC). Nepal's threatened: Red panda (EN), vulture species (CR), tiger (EN), rhino (VU). Global: mountain gorilla (EN), saola (CR)."
    ],
    confusion: [
      "❌ 'National parks allow no human activity.' ✅ Buffer zones around parks allow SUSTAINABLE use by local communities.',
      "❌ 'Zoo conservation is useless.' ✅ Zoo breeding programs SAVE species from extinction (California condor, Arabian oryx).',
      "❌ 'Seed banks only store seeds.' ✅ Seed banks also preserve germplasm, tissue culture, and genetic resources for future breeding.',
      "❌ 'Protected areas exclude all people.' ✅ Community-based conservation involves locals in MANAGEMENT and BENEFIT SHARING.',
      "❌ 'IUCN categories are fixed permanently.' ✅ Species status REASSESED regularly; conservation successes can downgrade categories (bald eagle: EN → LC)."
    ],
    examples: [
      "In-situ: Chitwan National Park protects 600+ rhinos and 200+ tigers in natural habitat.",
      "Ex-situ: Seed bank at National Trust for Nature Conservation stores wild plant seeds.",
      "Community: Annapurna Conservation Area Project manages 7,629 km² with local participation.",
      "Ramsar: Koshi Tappu protects 177 sq km wetland for 360+ bird species including global threatened ones."
    ],
    universalFacts: [
      "Nepal has 11 national parks, 6 wildlife reserves, 3 hunting reserves, and 1 conservation area.",
      "Svalbard Global Seed Vault stores backup copies of seeds from national collections worldwide.",
      "Cryopreservation can preserve genetic material for centuries at -196°C liquid nitrogen.",
      "Community forestry in Nepal manages ~2.2 million hectares, involving ~22,000 user groups."
    ],
    summary: "Conservation employs in-situ (natural habitat protection: national parks, wildlife reserves) and ex-situ (outside habitat: zoos, seed banks, cryopreservation) strategies. Nepal's protected area network includes Chitwan, Sagarmatha, Bardia, and Annapurna Conservation Area. Ramsar sites protect wetlands. IUCN categories track extinction risk. Community involvement is key to conservation success."
  }
};

// Process all concept files
const conceptDir = path.join(ROOT);
const files = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.json') && !entry.name.startsWith('plan') && !entry.name.startsWith('mindmap')) {
      files.push(full);
    }
  }
}
walkDir(conceptDir);

console.log(`Found ${files.length} biology concept files`);

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  try {
    const data = JSON.parse(content);
    const slug = data.topicSlug;

    if (!slug || !TOPIC_FIXES[slug]) {
      skipped++;
      continue;
    }

    const fix = TOPIC_FIXES[slug];
    
    // Update only problematic fields
    if (fix.notes) data.notes = fix.notes;
    if (fix.confusion) data.confusion = fix.confusion;
    if (fix.examples) data.examples = fix.examples;
    if (fix.universalFacts) data.universalFacts = fix.universalFacts;
    if (fix.summary) data.summary = fix.summary;

    // Check if any changes were made
    const newContent = JSON.stringify(data, null, 2);
    if (newContent !== original) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      fixed++;
      console.log(`✓ Fixed: ${path.basename(filePath)}`);
    } else {
      skipped++;
    }
  } catch (e) {
    console.log(`✗ Error ${filePath}: ${e.message}`);
    errors++;
  }
}

console.log(`\n✅ Content fix complete: ${fixed} files updated, ${skipped} skipped, ${errors} errors`);

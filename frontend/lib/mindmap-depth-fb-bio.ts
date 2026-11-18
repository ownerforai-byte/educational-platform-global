import type { LeafDepth } from "./mindmap-depth";

/** Biology fallback leaves (bio-1 … bio-9). */
export const FALLBACK_BIO_A: Record<string, LeafDepth> = {
  "bio-1": {
    keyFacts: [
      "Prokaryotes lack membrane-bound organelles yet vastly outnumber eukaryotes in abundance, proving organelles are an OPTIMISATION for cell size, not a requirement for life.",
      "Surface-area-to-volume ratio sets an upper size limit: surface grows as $r^2$ but volume as $r^3$, so the ratio FALLS as size grows.",
      "The cytoskeleton (microtubules, actin, intermediate filaments) gives eukaryotic cells internal TRACKS for transport — the structural answer to the SA:V problem.",
      "Compartmentalisation lets incompatible reactions run side by side: glycolysis in cytosol, Krebs in the matrix, β-oxidation in peroxisomes.",
    ],
    edgeCases: [
      "Bacteria DO have internal compartments — carboxysomes, magnetosomes, gas vesicles — so 'prokaryotes have no internal organisation' is an oversimplification.",
      "A large cell compensates by becoming multinucleate or by having a huge vacuole that confines cytoplasm to a thin peripheral layer.",
      "Mycoplasmas are the smallest free-living cells yet still carry ribosomes and a genome — the minimal-cell logic question.",
      "Nerve and muscle cells are enormous but thin and multinucleate — geometry, not organelle count, solves their exchange problem.",
    ],
    examAsked: [
      "NEB: 'Why must a cell be of limited size?' — falling surface-area-to-volume ratio limits exchange.",
      "CEE: 'Name one prokaryotic internal compartment.' — carboxysome, magnetosome, gas vesicle.",
      "NEB: 'How does compartmentalisation benefit a eukaryotic cell?' — separate optimised environments for conflicting reactions.",
      "CEE: 'Why do small organisms have a higher metabolic rate per gram?' — the low SA:V ratio demands faster exchange per unit volume.",
    ],
    commonMistakes: [
      "Saying prokaryotes have NO internal structure at all.",
      "Reversing the trend and claiming the ratio increases with size.",
      "Treating the cell wall as part of the plasma membrane; it is external and differently composed.",
      "Claiming organelles evolved solely to beat surface-area limits; signalling and efficiency matter too.",
    ],
  },
  "bio-2": {
    keyFacts: [
      "Membrane fluidity is set by FATTY-ACID COMPOSITION and TEMPERATURE, not protein content: cis-unsaturated kinks and short chains keep it fluid.",
      "Cholesterol is a BIDIRECTIONAL buffer — it stiffens a warm membrane and fluidises a cold one, so its effect depends on temperature.",
      "The fluid mosaic model: a two-dimensional liquid of lipids with proteins floating in or spanning it — sideways diffusion is fast, flip-flop is rare.",
      "Membrane proteins do the selective work — channels, carriers and pumps turn an oily barrier into a controlled interface.",
    ],
    edgeCases: [
      "Homeoviscous adaptation: cold-water fish carry MORE unsaturated fatty acids to keep fluidity high — a direct, testable consequence.",
      "Polar head-group flip-flop is almost forbidden and needs flippase enzymes, so membrane ASYMMETRY is actively maintained at real cost.",
      "At the phase-transition temperature the bilayer leaks maximally — organisms keep growth temperature well away from that midpoint.",
      "Archaeal membranes use ether-linked isoprenoid chains instead of ester-linked fatty acids — the deep-divergence exception.",
    ],
    examAsked: [
      "NEB: 'Why do cold-water fish membranes contain more unsaturated fatty acids?' — to keep fluidity high at low temperature.",
      "CEE: 'Give two functions of cholesterol in the membrane.' — fluidity regulation and reduced permeability.",
      "NEB: 'Why is the membrane called a fluid mosaic?' — a liquid lipid bilayer with a mosaic of proteins.",
      "CEE: 'How does unsaturated fat content affect permeability?' — it raises it: kinks prevent tight packing.",
    ],
    commonMistakes: [
      "Saying the bilayer is held by covalent bonds — tails interact by van der Waals forces.",
      "Saying cholesterol always increases fluidity; above body temperature it does the opposite.",
      "Claiming cholesterol is a protein; it is a lipid, and its flip-flop is fast.",
      "Confusing simple diffusion (O₂, CO₂) with facilitated diffusion (glucose carriers) in transport questions.",
    ],
  },
  "bio-3": {
    keyFacts: [
      "Most ATP comes from OXIDATIVE PHOSPHORYLATION; the Krebs cycle's real output is NADH and FADH₂, which the ETC converts into a proton gradient.",
      "Yield depends on which SHUTTLE carries cytosolic NADH — 38 ATP (malate–aspartate) against 36 (glycerol-3-phosphate), so 'the number' is convention-dependent.",
      "The proton-motive force across the inner membrane drives ATP synthase — the chemiosmotic mechanism is the one big idea of the chapter.",
      "Glycolysis is the most ancient pathway: cytosolic, oxygen-free, and universal across all domains of life.",
    ],
    edgeCases: [
      "Anaerobic yield is 2 ATP per glucose, not zero — fermentation does produce ATP by substrate-level phosphorylation.",
      "Modern biochemistry gives 30–32 ATP because NADH is not a discrete package; quoting 38 may be marked wrong in newer schemes.",
      "Cyanide blocks complex IV, so the gradient collapses and oxidative phosphorylation dies — the poison mechanism is a gradient question.",
      "Brown fat's UCP1 uncouples the gradient to produce HEAT instead of ATP — non-shivering thermogenesis.",
    ],
    examAsked: [
      "NEB: 'Compare ATP yield of aerobic and anaerobic respiration.' — ~38 against 2 per glucose.",
      "CEE: 'Why is the Krebs cycle's direct ATP yield small?' — most energy is captured in NADH/FADH₂.",
      "NEB: 'Where does the electron transport chain occur?' — the inner mitochondrial membrane (cristae).",
      "CEE: 'Why is oxygen required in aerobic respiration?' — it is the final electron acceptor of the chain.",
    ],
    commonMistakes: [
      "Saying the Krebs cycle produces most of the ATP.",
      "Claiming anaerobic respiration gives zero ATP.",
      "Saying oxygen breaks glucose apart; carbon leaves as CO₂ and oxygen only accepts electrons at the end.",
      "Placing the Krebs cycle in the cytosol; it runs in the mitochondrial matrix.",
    ],
  },
  "bio-4": {
    keyFacts: [
      "Enzymes LOWER ACTIVATION ENERGY and change neither $\\Delta G$ nor the equilibrium position; they only affect how fast equilibrium is reached.",
      "$V_{max}$ is reached at substrate saturation, so it measures ENZYME CONCENTRATION in that assay — not an intrinsic constant of the enzyme.",
      "Lock-and-key was refined to INDUCED FIT: the active site moulds to the substrate, explaining specificity AND catalysis in one mechanism.",
      "Cofactors (metal ions) and coenzymes (vitamin-derived carriers) extend enzyme chemistry beyond the amino-acid repertoire.",
    ],
    edgeCases: [
      "Competitive inhibition raises apparent $K_m$ but leaves $V_{max}$; non-competitive lowers $V_{max}$ but leaves $K_m$. That pair is how inhibition type is identified.",
      "Enzymes are substrate- and condition-SPECIFIC: denaturation destroys activity, and pH or temperature can shift $V_{max}$ as well as $K_m$.",
      "Allosteric enzymes are SIGMOIDAL, not hyperbolic — Michaelis–Menten kinetics does not fit them; the sigmoid curve is the diagnostic.",
      "Zymogens (trypsinogen) are inactive precursors that prevent self-digestion — activation by cleavage is the safety design.",
    ],
    examAsked: [
      "NEB: 'Why do enzymes not change the equilibrium constant?' — they lower activation energy for both directions equally.",
      "CEE: 'A competitive inhibitor's effect on $V_{max}$ and $K_m$?' — $V_{max}$ unchanged, apparent $K_m$ increases.",
      "NEB: 'What is the induced-fit model?' — the active site reshapes as substrate binds, stabilising the transition state.",
      "CEE: 'Why does extreme pH denature an enzyme?' — it disrupts the ionic and hydrogen bonds holding the tertiary structure.",
    ],
    commonMistakes: [
      "Saying enzymes make a thermodynamically unfavourable reaction spontaneous. They cannot.",
      "Reading the Lineweaver–Burk x-intercept as $-1/K_m$ without noting it is the APPARENT $K_m$.",
      "Saying enzymes are consumed in the reaction; they are recovered unchanged.",
      "Defining $K_m$ as the substrate concentration at $V_{max}$; it is the concentration at HALF $V_{max}$.",
    ],
  },
  "bio-5": {
    keyFacts: [
      "Chargaff's rules require DOUBLE-STRANDED DNA; in ssDNA %A need not equal %T, which proves the rules come from base PAIRING rather than composition.",
      "The helix is stabilised by BASE STACKING as much as by hydrogen bonds, so stacking matters more for melting temperature than bond count alone.",
      "The strands are ANTIPARALLEL (5'→3' against 3'→5') — the direction rule underpinning replication and transcription.",
      "Deoxyribose and thymine make DNA chemically stable where RNA (ribose, uracil) is reactive — archive versus working copy.",
    ],
    edgeCases: [
      "A-DNA (10.5 bp/turn) forms when dehydrated and Z-DNA (12 bp/turn, left-handed) in alternating GC sequences — both differ from the school B-form.",
      "GC-rich DNA is more thermally stable, so melting temperature maps to different GC content in different organisms.",
      "Single-stranded DNA viruses and RNA genomes break Chargaff completely — the rules describe duplexes only.",
      "Unwinding a replicating chromosome creates supercoils that topoisomerases must relieve — the physical problem of replication.",
    ],
    examAsked: [
      "NEB: 'State Chargaff's rules.' — in dsDNA, %A = %T and %G = %C.",
      "CEE: 'Why is GC-rich DNA harder to separate into single strands?' — three hydrogen bonds per pair against two.",
      "NEB: 'Why is the DNA strand said to be antiparallel?' — the backbones run 5'→3' in opposite directions.",
      "CEE: 'Which enzyme relieves supercoils during replication?' — topoisomerase (DNA gyrase in prokaryotes).",
    ],
    commonMistakes: [
      "Reversing the hydrogen-bond counts: A=T has two, G≡C has three.",
      "Applying Chargaff's rules to single-stranded DNA.",
      "Drawing hydrogen bonds to the backbone; the bonds run between complementary BASES.",
      "Saying A–T pairs have three hydrogen bonds.",
    ],
  },
  "bio-6": {
    keyFacts: [
      "The central dogma states information flows DNA → RNA → PROTEIN; reverse transcription (RNA → DNA) in retroviruses is a recognised EXCEPTION, not a contradiction.",
      "Prokaryotes use the Pribnow box (−10, TATAAT) and eukaryotes the TATA box (−25) as the polymerase promoter.",
      "The code is read in TRIPLET codons and is degenerate but unambiguous — many codons per amino acid, one amino acid per codon.",
      "Eukaryotic pre-mRNA is processed three ways: 5' cap, intron splicing, poly-A tail — three steps, three marks.",
    ],
    edgeCases: [
      "Only ONE strand of a gene is transcribed at a time, and it may be the coding or the template strand depending on orientation — both are never transcribed for one gene.",
      "Eukaryotic RNA polymerase cannot read chromatin unaided, so it needs mediator and remodeler complexes; the prokaryotic single-enzyme picture does not transfer.",
      "Wobble at the third codon base lets one tRNA read several synonymous codons — the economy behind degeneracy.",
      "Polycistronic mRNA is normal in prokaryotes and nearly absent in eukaryotes — one-gene-one-mRNA is the eukaryotic picture.",
    ],
    examAsked: [
      "NEB: 'Name the promoter sequences for prokaryotes and eukaryotes.' — Pribnow box and TATA box.",
      "CEE: 'Does reverse transcription violate the central dogma?' — no, it is an exception, not a refutation.",
      "NEB: 'What are the three eukaryotic RNA processing steps?' — capping, splicing, polyadenylation.",
      "CEE: 'Why can one tRNA read more than one codon?' — wobble pairing at the third position.",
    ],
    commonMistakes: [
      "Saying both DNA strands are transcribed for one gene.",
      "Confusing the promoter (−10/−25 boxes) with the terminator, which stops transcription.",
      "Saying transcription and translation are coupled in eukaryotes; that is prokaryotic.",
      "Swapping codon (on mRNA) and anticodon (on tRNA).",
    ],
  },
  "bio-7": {
    keyFacts: [
      "Mitochondria and chloroplasts both have 70S ribosomes and circular DNA — bacterial signatures supporting ENDOSYMBiosis as the origin of eukaryotic organelles.",
      "Chloroplasts arose by a SECOND endosymbiosis (of a cyanobacterium), which is why they have a double membrane and keep their own prokaryotic-type genome.",
      "Mitochondria retain only 13 ETC subunits in their own genome; the rest are nuclear-imported — a co-evolutionary division of labour.",
      "The double membrane matches the endosymbiont's inner membrane plus the host's engulfing membrane — the structural fingerprint of engulfment.",
    ],
    edgeCases: [
      "Both organelle genomes are inherited MATERNALLY in almost all organisms, so they do not follow Mendelian ratios — a standard exam point.",
      "Some organisms (e.g. yeast) can lose mitochondria entirely, showing the endosymbiosis is ongoing and reversible rather than a fixed ancient event.",
      "Mitochondrial disease shows THRESHOLD effects: a cell's mutant load decides severity — the heteroplasmy concept.",
      "Mitoplasts (outer membrane stripped) still transcribe their DNA — the inner system is self-sufficient.",
    ],
    examAsked: [
      "NEB: 'Give two pieces of evidence for the endosymbiotic theory.' — 70S ribosomes and circular DNA with bacterial-type gene expression.",
      "CEE: 'How is mitochondrial DNA inherited?' — maternally, not Mendelian.",
      "NEB: 'Why do organelles have 70S ribosomes?' — they descend from engulfed prokaryotes.",
      "CEE: 'One difference between mitochondrial and nuclear ribosomes?' — 70S vs 80S (and antibiotic sensitivity).",
    ],
    commonMistakes: [
      "Saying organelle DNA is inherited equally from both parents.",
      "Confusing endosymbiotic theory with spontaneous generation.",
      "Saying organelles divide by mitosis; they divide by binary fission.",
      "Claiming chloroplast DNA is larger than nuclear DNA; it is far smaller.",
    ],
  },
  "bio-8": {
    keyFacts: [
      "Crossing over occurs in PROPHASE I (pachytene) at chiasmata, NOT in anaphase — the most frequently misplaced stage in genetics.",
      "Independent assortment comes from the RANDOM ORIENTATION of homologous pairs at metaphase I, not from crossing over; the two are separate mechanisms giving separate ratios.",
      "Prophase I's five sub-stages — leptotene, zygotene, pachytene, diplotene, diakinesis — are named for chromosome condensation behaviour.",
      "Synapsis builds the synaptonemal complex in zygotene; the bivalent (tetrad, four chromatids) is the unit of assortment.",
    ],
    edgeCases: [
      "Crossing over is ABSENT in Drosophila males (present in females), so a linkage map built from male crosses would carry no information — a real experimental design constraint.",
      "Recombination caps at 50%; genes far apart on one chromosome behave as unlinked, so a flat map region means 'unresolvable', not 'no recombination'.",
      "Mammalian oocytes arrest at dictyate (late diplotene) for years — the longest pause in meiosis and a mutation-risk window.",
      "Tetrad analysis needs organisms like Neurospora where the four products stay together — the tool behind classical genetic maps.",
    ],
    examAsked: [
      "NEB: 'At which stage does crossing over occur?' — prophase I, pachytene.",
      "CEE: 'Why do genes on the same chromosome fail the 9:3:3:1 ratio?' — linkage keeps alleles in parental combinations.",
      "NEB: 'List the sub-stages of prophase I in order.' — leptotene, zygotene, pachytene, diplotene, diakinesis.",
      "CEE: 'What is a bivalent?' — a pair of synapsed homologous chromosomes (four chromatids).",
    ],
    commonMistakes: [
      "Placing crossing over in anaphase II or in mitosis.",
      "Attributing independent assortment to crossing over rather than to metaphase I orientation.",
      "Confusing synapsis (pairing) with crossing over (exchange); they are sequential, not identical.",
      "Saying meiosis II separates homologues; meiosis I does — meiosis II separates sister chromatids.",
    ],
  },
  "bio-9": {
    keyFacts: [
      "PCR cycles through denaturation, annealing and extension using THERMOSTABLE Taq polymerase from Thermus aquaticus that survives 95 °C.",
      "Each cycle roughly DOUBLES the target, so after $n$ cycles there are about $2^n$ copies — 30 cycles means roughly a billion from one molecule.",
      "Restriction enzymes cut at palindromic recognition sequences, leaving sticky or blunt ends — end compatibility decides ligation success.",
      "Vectors supply three essentials — an origin, a selectable marker and a multiple-cloning site — the standard cloning-question trio.",
    ],
    edgeCases: [
      "The PRIMERS determine what is amplified; without them the reaction amplifies whatever template is present, so primer design IS the specificity of the method.",
      "PCR amplifies SEQUENCE, not expression — RT-PCR is needed before RNA can be amplified, otherwise genomic DNA is amplified instead.",
      "Blue–white screening inserts into lacZ: recombinant colonies stay white — the practical selection step after ligation.",
      "qPCR adds fluorescent dye to measure amplification in REAL time; its point is quantification, unlike endpoint PCR.",
    ],
    examAsked: [
      "NEB: 'Name the three PCR steps and their temperatures.' — denaturation ~95 °C, annealing ~55–65 °C, extension ~72 °C.",
      "CEE: 'Why is Taq used rather than an ordinary polymerase?' — it survives the 95 °C denaturation step.",
      "NEB: 'What is the role of a selectable marker?' — only transformed cells grow on it (e.g. antibiotic resistance).",
      "CEE: 'What makes a restriction site palindromic?' — it reads the same 5'→3' on both strands.",
    ],
    commonMistakes: [
      "Saying PCR measures gene expression; RT-PCR is required for RNA.",
      "Treating the annealing temperature as universal — it depends on the primers' melting temperatures.",
      "Saying ligase cuts DNA; it joins it — restriction enzymes do the cutting.",
      "Confusing annealing (primer binding) with denaturation (strand separation) in the PCR cycle.",
    ],
  },
};

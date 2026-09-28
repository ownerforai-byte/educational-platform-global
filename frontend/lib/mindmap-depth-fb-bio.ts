import type { LeafDepth } from "./mindmap-depth";

/** Biology fallback leaves (bio-1 … bio-5). */
export const FALLBACK_BIO_A: Record<string, LeafDepth> = {
  "bio-1": {
    keyFacts: [
      "Prokaryotes lack membrane-bound organelles yet vastly outnumber eukaryotes in abundance, proving organelles are an OPTIMISATION for cell size, not a requirement for life.",
      "Surface-area-to-volume ratio sets an upper size limit: surface grows as $r^2$ but volume as $r^3$, so the ratio FALLS as size grows.",
    ],
    edgeCases: [
      "Bacteria DO have internal compartments — carboxysomes, magnetosomes, gas vesicles — so 'prokaryotes have no internal organisation' is an oversimplification.",
      "A large cell compensates by becoming multinucleate or by having a huge vacuole that confines cytoplasm to a thin peripheral layer.",
    ],
    examAsked: [
      "NEB: 'Why must a cell be of limited size?' — falling surface-area-to-volume ratio limits exchange.",
      "CEE: 'Name one prokaryotic internal compartment.' — carboxysome, magnetosome, gas vesicle.",
    ],
    commonMistakes: [
      "Saying prokaryotes have NO internal structure at all.",
      "Reversing the trend and claiming the ratio increases with size.",
    ],
  },
  "bio-2": {
    keyFacts: [
      "Membrane fluidity is set by FATTY-ACID COMPOSITION and TEMPERATURE, not protein content: cis-unsaturated kinks and short chains keep it fluid.",
      "Cholesterol is a BIDIRECTIONAL buffer — it stiffens a warm membrane and fluidises a cold one, so its effect depends on temperature.",
    ],
    edgeCases: [
      "Homeoviscous adaptation: cold-water fish carry MORE unsaturated fatty acids to keep fluidity high — a direct, testable consequence.",
      "Polar head-group flip-flop is almost forbidden and needs flippase enzymes, so membrane ASYMMETRY is actively maintained at real cost.",
    ],
    examAsked: [
      "NEB: 'Why do cold-water fish membranes contain more unsaturated fatty acids?' — to keep fluidity high at low temperature.",
      "CEE: 'Give two functions of cholesterol in the membrane.' — fluidity regulation and reduced permeability.",
    ],
    commonMistakes: [
      "Saying the bilayer is held by covalent bonds — tails interact by van der Waals forces.",
      "Saying cholesterol always increases fluidity; above body temperature it does the opposite.",
    ],
  },
  "bio-3": {
    keyFacts: [
      "Most ATP comes from OXIDATIVE PHOSPHORYLATION; the Krebs cycle's real output is NADH and FADH₂, which the ETC converts into a proton gradient.",
      "Yield depends on which SHUTTLE carries cytosolic NADH — 38 ATP (malate–aspartate) against 36 (glycerol-3-phosphate), so 'the number' is convention-dependent.",
    ],
    edgeCases: [
      "Anaerobic yield is 2 ATP per glucose, not zero — fermentation does produce ATP by substrate-level phosphorylation.",
      "Modern biochemistry gives 30–32 ATP because NADH is not a discrete package; quoting 38 may be marked wrong in newer schemes.",
    ],
    examAsked: [
      "NEB: 'Compare ATP yield of aerobic and anaerobic respiration.' — ~38 against 2 per glucose.",
      "CEE: 'Why is the Krebs cycle's direct ATP yield small?' — most energy is captured in NADH/FADH₂.",
    ],
    commonMistakes: [
      "Saying the Krebs cycle produces most of the ATP.",
      "Claiming anaerobic respiration gives zero ATP.",
    ],
  },
  "bio-4": {
    keyFacts: [
      "Enzymes LOWER ACTIVATION ENERGY and change neither $\\Delta G$ nor the equilibrium position; they only affect how fast equilibrium is reached.",
      "$V_{max}$ is reached at substrate saturation, so it measures ENZYME CONCENTRATION in that assay — not an intrinsic constant of the enzyme.",
    ],
    edgeCases: [
      "Competitive inhibition raises apparent $K_m$ but leaves $V_{max}$; non-competitive lowers $V_{max}$ but leaves $K_m$. That pair is how inhibition type is identified.",
      "Enzymes are substrate- and condition-SPECIFIC: denaturation destroys activity, and pH or temperature can shift $V_{max}$ as well as $K_m$.",
    ],
    examAsked: [
      "NEB: 'Why do enzymes not change the equilibrium constant?' — they lower activation energy for both directions equally.",
      "CEE: 'A competitive inhibitor's effect on $V_{max}$ and $K_m$?' — $V_{max}$ unchanged, apparent $K_m$ increases.",
    ],
    commonMistakes: [
      "Saying enzymes make a thermodynamically unfavourable reaction spontaneous. They cannot.",
      "Reading the Lineweaver–Burk x-intercept as $-1/K_m$ without noting it is the APPARENT $K_m$.",
    ],
  },
  "bio-5": {
    keyFacts: [
      "Chargaff's rules require DOUBLE-STRANDED DNA; in ssDNA %A need not equal %T, which proves the rules come from base PAIRING rather than composition.",
      "The helix is stabilised by BASE STACKING as much as by hydrogen bonds, so stacking matters more for melting temperature than bond count alone.",
    ],
    edgeCases: [
      "A-DNA (10.5 bp/turn) forms when dehydrated and Z-DNA (12 bp/turn, left-handed) in alternating GC sequences — both differ from the school B-form.",
      "GC-rich DNA is more thermally stable, so melting temperature maps to different GC content in different organisms.",
    ],
    examAsked: [
      "NEB: 'State Chargaff's rules.' — in dsDNA, %A = %T and %G = %C.",
      "CEE: 'Why is GC-rich DNA harder to separate into single strands?' — three hydrogen bonds per pair against two.",
    ],
    commonMistakes: [
      "Reversing the hydrogen-bond counts: A=T has two, G≡C has three.",
      "Applying Chargaff's rules to single-stranded DNA.",
    ],
  },
  "bio-6": {
    keyFacts: [
      "The central dogma states information flows DNA → RNA → PROTEIN; reverse transcription (RNA → DNA) in retroviruses is a recognised EXCEPTION, not a contradiction.",
      "Prokaryotes use the Pribnow box (−10, TATAAT) and eukaryotes the TATA box (−25) as the polymerase promoter.",
    ],
    edgeCases: [
      "Only ONE strand of a gene is transcribed at a time, and it may be the coding or the template strand depending on orientation — both are never transcribed for one gene.",
      "Eukaryotic RNA polymerase cannot read chromatin unaided, so it needs mediator and remodeler complexes; the prokaryotic single-enzyme picture does not transfer.",
    ],
    examAsked: [
      "NEB: 'Name the promoter sequences for prokaryotes and eukaryotes.' — Pribnow box and TATA box.",
      "CEE: 'Does reverse transcription violate the central dogma?' — no, it is an exception, not a refutation.",
    ],
    commonMistakes: [
      "Saying both DNA strands are transcribed for one gene.",
      "Confusing the promoter (−10/−25 boxes) with the terminator, which stops transcription.",
    ],
  },
  "bio-7": {
    keyFacts: [
      "Mitochondria and chloroplasts both have 70S ribosomes and circular DNA — bacterial signatures supporting ENDOSYMBiosis as the origin of eukaryotic organelles.",
      "Chloroplasts arose by a SECOND endosymbiosis (of a cyanobacterium), which is why they have a double membrane and keep their own prokaryotic-type genome.",
    ],
    edgeCases: [
      "Both organelle genomes are inherited MATERNALLY in almost all organisms, so they do not follow Mendelian ratios — a standard exam point.",
      "Some organisms (e.g. yeast) can lose mitochondria entirely, showing the endosymbiosis is ongoing and reversible rather than a fixed ancient event.",
    ],
    examAsked: [
      "NEB: 'Give two pieces of evidence for the endosymbiotic theory.' — 70S ribosomes and circular DNA with bacterial-type gene expression.",
      "CEE: 'How is mitochondrial DNA inherited?' — maternally, not Mendelian.",
    ],
    commonMistakes: [
      "Saying organelle DNA is inherited equally from both parents.",
      "Confusing endosymbiotic theory with spontaneous generation.",
    ],
  },
  "bio-8": {
    keyFacts: [
      "Crossing over occurs in PROPHASE I (pachytene) at chiasmata, NOT in anaphase — the most frequently misplaced stage in genetics.",
      "Independent assortment comes from the RANDOM ORIENTATION of homologous pairs at metaphase I, not from crossing over; the two are separate mechanisms giving separate ratios.",
    ],
    edgeCases: [
      "Crossing over is ABSENT in Drosophila males (present in females), so a linkage map built from male crosses would carry no information — a real experimental design constraint.",
      "Recombination caps at 50%; genes far apart on one chromosome behave as unlinked, so a flat map region means 'unresolvable', not 'no recombination'.",
    ],
    examAsked: [
      "NEB: 'At which stage does crossing over occur?' — prophase I, pachytene.",
      "CEE: 'Why do genes on the same chromosome fail the 9:3:3:1 ratio?' — linkage keeps alleles in parental combinations.",
    ],
    commonMistakes: [
      "Placing crossing over in anaphase II or in mitosis.",
      "Attributing independent assortment to crossing over rather than to metaphase I orientation.",
    ],
  },
  "bio-9": {
    keyFacts: [
      "PCR cycles through denaturation, annealing and extension using THERMOSTABLE Taq polymerase from Thermus aquaticus that survives 95 °C.",
      "Each cycle roughly DOUBLES the target, so after $n$ cycles there are about $2^n$ copies — 30 cycles means roughly a billion from one molecule.",
    ],
    edgeCases: [
      "The PRIMERS determine what is amplified; without them the reaction amplifies whatever template is present, so primer design IS the specificity of the method.",
      "PCR amplifies SEQUENCE, not expression — RT-PCR is needed before RNA can be amplified, otherwise genomic DNA is amplified instead.",
    ],
    examAsked: [
      "NEB: 'Name the three PCR steps and their temperatures.' — denaturation ~95 °C, annealing ~55–65 °C, extension ~72 °C.",
      "CEE: 'Why is Taq used rather than an ordinary polymerase?' — it survives the 95 °C denaturation step.",
    ],
    commonMistakes: [
      "Saying PCR measures gene expression; RT-PCR is required for RNA.",
      "Treating the annealing temperature as universal — it depends on the primers' melting temperatures.",
    ],
  },
};

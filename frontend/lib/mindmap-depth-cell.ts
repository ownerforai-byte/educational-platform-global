import type { UnitDepth } from "./mindmap-depth";

/** Biomolecules & cell biology. */
export const CELL_DEPTH: Record<string, UnitDepth> = {
  "biomolecules-and-cell-biology": {
    unitFacts: [
      "Every macromolecule class is defined by its MONOMER and its BOND: polysaccharides from monosaccharides (glycosidic), proteins from amino acids (peptide), nucleic acids from nucleotides (phosphodiester).",
      "Eukaryotic organelles exist to raise local concentrations and compartmentalise incompatible reactions, not merely to 'store things'.",
    ],
    unitEdgeCases: [
      "Prokaryotes lack membrane-bound organelles yet are among the most successful organisms on Earth, proving organelles are an OPTIMISATION for cell size, not a requirement for life.",
      "Not all proteins are enzymes — fibrous structural proteins (collagen, keratin) have no active site, so 'protein = enzyme' is false.",
    ],
    unitExamAsked: [
      "NEB: 'Why must a cell be of limited size?' — surface-area-to-volume ratio falls as size grows, so exchange cannot meet metabolic demand.",
      "CEE: 'Which organelle has its own DNA and a 70S ribosome?' — mitochondrion (and chloroplast in plants).",
    ],
    unitCommonMistakes: [
      "Confusing the nucleus (DNA storage) with the nucleolus (ribosome assembly); the nucleolus is a sub-region, not a separate organelle.",
      "Saying the cell is 'held together by the cell wall' — the wall gives shape; the membrane encloses the cytoplasm and controls transport.",
    ],
    leaves: {
      "uc-cell-1a": {
        keyFacts: [
          "The nucleolus assembles rRNA and packages it with proteins into ribosomal subunits — a nucleus without a nucleolus cannot build ribosomes.",
          "The nuclear envelope is a double membrane with SELECTIVE pores: RNA leaves through them, yet the compartment stays distinct from the ER.",
        ],
        edgeCases: [
          "Mature red blood cells and sieve-tube elements have no nucleus and cannot synthesise new protein — their finite life follows directly.",
          "The nuclear envelope is CONTINUOUS with the ER, so it is not two independent sacs but one folded membrane system.",
        ],
        examAsked: [
          "NEB: 'State two functions of the nucleolus.' — rRNA synthesis and ribosomal subunit assembly.",
          "CEE: 'Why do mature RBCs lack a nucleus?' — to maximise haemoglobin per unit volume.",
        ],
        commonMistakes: [
          "Attributing 'control of all cell activities' to the nucleolus. That is the nucleus; the nucleolus only builds ribosomes.",
          "Calling nuclear pores permanent open holes — they are gated, selective channels.",
        ],
      },
      "uc-cell-1b": {
        keyFacts: [
          "The mitochondrion is the powerhouse because of the ELECTRON TRANSPORT CHAIN on its inner membrane; the proton gradient, not the Krebs cycle, makes most ATP.",
          "Circular DNA and 70S ribosomes are the evidence for the endosymbiotic origin of the eukaryotic cell.",
        ],
        edgeCases: [
          "Most ATP comes from OXIDATIVE PHOSPHORYLATION; only a small fraction arises from substrate-level phosphorylation in glycolysis or the Krebs cycle.",
          "Cristae multiply inner-membrane area, so highly active cells (heart, liver) have mitochondria densely packed with cristae.",
        ],
        examAsked: [
          "NEB: 'Why is the inner membrane folded into cristae?' — to maximise area for the ETC and ATP synthase.",
          "CEE: 'Why 70S and not 80S ribosomes?' — mitochondria are prokaryote-derived endosymbionts.",
        ],
        commonMistakes: [
          "Placing the Krebs cycle in the cytoplasm — it occurs in the mitochondrial MATRIX.",
          "Saying mitochondria 'store energy'. Energy is not a stored substance; ATP is the storage medium and it is made there.",
        ],
      },
      "uc-cell-2a": {
        keyFacts: [
          "The bilayer is ~7.5 nm (75 Å) thick and is held together by VAN DER WAALS forces between tails, not by covalent bonds — which is exactly why the membrane is fluid rather than rigid.",
          "Amphipathic phospholipids self-assemble into bilayers in water with no external energy input, because burying the hydrophobic tails is a thermodynamic gain.",
        ],
        edgeCases: [
          "Cholesterol is a BIDIRECTIONAL fluidity buffer: it stiffens a warm membrane and fluidises a cold one, so its effect depends on temperature.",
          "Polar head-group flip-flop across the bilayer is almost forbidden and needs flippase enzymes, so membrane asymmetry is maintained at real metabolic cost.",
        ],
        examAsked: [
          "NEB: 'Explain why a phospholipid bilayer is stable in water.' — heads face water while tails are buried, minimising free energy.",
          "CEE: 'Give two functions of cholesterol in the membrane.' — fluidity regulation and reduced permeability to small polar molecules.",
        ],
        commonMistakes: [
          "Saying the bilayer is held by covalent bonds — only the tails' C–C/C–H framework is covalent; tail-to-tail interaction is van der Waals.",
          "Treating cholesterol as purely harmful; at body temperature it is an essential stabiliser.",
        ],
      },
      "uc-cell-2b": {
        keyFacts: [
          "Transport is PROTEIN-MEDIATED because the hydrophobic core of the bilayer blocks ions and most polar molecules, while small non-polar molecules (O₂, CO₂) diffuse straight through.",
          "Channels give facilitated diffusion down a gradient (no ATP); pumps move material AGAINST a gradient and therefore consume ATP — the distinction that separates passive from active transport.",
        ],
        edgeCases: [
          "Channel and carrier proteins are gated: they open in response to a signal, a voltage, or ligand binding, so the membrane is not permanently leaky.",
          "The sodium–potassium pump moves 3 Na⁺ out for every 2 K⁺ in, making it ELECTROGENIC and generating the membrane potential directly.",
        ],
        examAsked: [
          "NEB: 'Distinguish between facilitated diffusion and active transport.' — direction relative to the gradient, and ATP use.",
          "CEE: 'Why can oxygen cross the membrane freely but glucose cannot?' — O₂ is small and non-polar; glucose is large and polar.",
        ],
        commonMistakes: [
          "Saying 'active transport means faster transport'. It means movement AGAINST a concentration or electrochemical gradient, which is the only correct distinction.",
          "Saying diffusion needs ATP. Passive transport never does; only the pump against a gradient does.",
        ],
      },
      "uc-cell-3a": {
        keyFacts: [
          "Carbohydrates and lipids are both built from a small number of units, but the units differ: monosaccharides (glucose, fructose) and fatty acids + glycerol respectively.",
          "Polysaccharides are for STORAGE and STRUCTURE (starch, glycogen, cellulose, chitin), with starch and glycogen branching differently — amylopectin and amylose in starch, glycogen more highly branched for faster mobilisation.",
        ],
        edgeCases: [
          "Cellulose and starch are both glucose polymers, yet humans cannot digest cellulose — there is no cellulase, only the $\\beta$-1,4 bond vs $\\alpha$-1,4 distinction that our enzymes cannot cleave.",
          "Fats store roughly TWICE the energy per gram of carbohydrates or proteins because they are more reduced (more C–H, less O), so yield more energy on oxidation.",
        ],
        examAsked: [
          "NEB: 'Why can a cow digest cellulose but a human cannot?' — rumen bacteria secrete cellulase to cleave $\\beta$-1,4 bonds.",
          "CEE: 'Why are lipids a better long-term energy store than carbohydrates?' — more reduced, so more energy per gram, and anhydrous so store without water.",
        ],
        commonMistakes: [
          "Saying glucose is a monosaccharide but calling sucrose a polysaccharide — sucrose is a DISaccharide.",
          "Confusing glycogen (animal) with starch (plant) as though both were 'the storage polysaccharide' with no species difference.",
        ],
      },
      "uc-cell-3b": {
        keyFacts: [
          "Proteins are chains of amino acids joined by PEPTIDE bonds; the specific sequence is the PRIMARY structure, and everything else (helix, sheet, fold) is determined by it.",
          "Nucleic acids store information in a SEQUENCE — the order of bases is the message, and the double helix exists to make accurate copying and repair possible.",
        ],
        edgeCases: [
          "Denaturation destroys the TERTIARY and secondary structure but usually leaves peptide bonds intact, so a denatured protein can often refold — the classic 'boiled egg' reversibility argument.",
          "Proteins are colloid-forming because they are enormous molecules; at high concentration they form a colloid rather than a true solution, and this is why proteins are classified as colloids.",
        ],
        examAsked: [
          "NEB: 'Name the bond linking amino acids in a protein.' — the peptide (amide) bond, $-\\text{CO}-\\text{NH}-$, formed by condensation.",
          "CEE: 'Why are proteins classified as colloids?' — their molecular size is large enough for Brownian motion and they do not diffuse like true solutes.",
        ],
        commonMistakes: [
          "Saying denaturation breaks peptide bonds. Heat and pH disrupt the tertiary shape; the primary sequence usually survives.",
          "Confusing a nucleotide's three parts — phosphate, pentose sugar, and nitrogenous base — with a nucleoside, which has no phosphate.",
        ],
      },
    },
  },
};
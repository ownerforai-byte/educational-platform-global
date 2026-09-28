import type { UnitDepth } from "./mindmap-depth";

/** Heredity, DNA & evolution. */
export const GEN_DEPTH: Record<string, UnitDepth> = {
  "heredity-and-evolution": {
    unitFacts: [
      "Mendel's laws describe STATISTICAL TENDENCIES in a population: a 3:1 ratio appears only in F₂ and only in a large enough sample.",
      "Evolution is a change in GENE FREQUENCIES of a population across generations, not a change in an individual — the most commonly mis-stated definition in the syllabus.",
    ],
    unitEdgeCases: [
      "Natural selection acts on PHENOTYPES but only heritable variation responds; nothing acquired in a lifetime is passed on. Selection on acquired traits is a Lamarckian error.",
      "Mendelian ratios break down in practice: incomplete dominance, codominance, multiple alleles, polygenic inheritance, pleiotropy and sex linkage each give their own pattern.",
    ],
    unitExamAsked: [
      "NEB: 'State Mendel's law of segregation and one exception.' — alleles separate during gamete formation; exceptions are linkage and crossing over.",
      "CEE: 'Why does a recessive phenotype reappear in F₂ when absent in F₁?' — the allele was masked, not destroyed.",
    ],
    unitCommonMistakes: [
      "Claiming evolution is goal-directed. 'Survival of the fittest' means fitness in the CURRENT environment, not a trend toward perfection.",
      "Saying the F₁ is 'pure' for a dominant trait; the F₁ is heterozygous throughout and carries the recessive allele silently.",
    ],
    leaves: {
      "uc-gen-1a": {
        keyFacts: [
          "Segregation arises from homologous chromosomes separating at ANAPHASE I, so each gamete receives one allele.",
          "3:1 is a PHENOTYPIC ratio resting on the genotypic 1:2:1 behind it, which itself assumes complete dominance.",
        ],
        edgeCases: [
          "A test cross (F₁ × homozygous recessive) reveals the F₁'s genotype directly: 1:1 if heterozygous, all dominant if homozygous.",
          "1:1 signals an F₁ × recessive cross, whereas 3:1 signals F₁ × F₁ — the ratio identifies the cross type.",
        ],
        examAsked: [
          "NEB: 'Cross two heterozygotes; give the genotypic and phenotypic ratios.' — 1 AA : 2 Aa : 1 aa, and 3 dominant : 1 recessive.",
          "CEE: 'How is the genotype of a dominant-phenotype organism determined?' — test cross with a homozygous recessive.",
        ],
        commonMistakes: [
          "Reporting 3:1 as a genotypic ratio — it is phenotypic only; genotypically it is 1:2:1.",
          "Expecting a ratio in F₁, which from two homozygous parents is uniformly heterozygous and shows none.",
        ],
      },
      "uc-gen-1b": {
        keyFacts: [
          "Independent assortment needs genes on DIFFERENT chromosomes (or far apart on one); genes on the same chromosome are LINKED and break the 9:3:3:1 dihybrid ratio.",
          "Crossing-over frequency gives a physical map distance: 1% recombination = 1 map unit (centimorgan).",
        ],
        edgeCases: [
          "Genes far apart on the same chromosome behave as unlinked because recombination between them is frequent enough to restore 9:3:3:1 by chance.",
          "Recombination is capped at 50% — genes can never appear more than half recombinant, so distant loci give a flat, uninformative map.",
        ],
        examAsked: [
          "NEB: 'Why does 9:3:3:1 fail for linked genes?' — alleles stay in parental combinations, giving only two parental classes.",
          "CEE: 'Two genes show 20% recombination. Map distance?' — 20 map units (2 cM).",
        ],
        commonMistakes: [
          "Applying 9:3:3:1 to genes on the same chromosome — always check the chromosome first.",
          "Saying crossing over occurs at anaphase II; it happens in PROPHASE I at chiasmata.",
        ],
      },
      "uc-gen-2a": {
        keyFacts: [
          "The double helix was established in 1953 from Rosalind Franklin's X-ray diffraction data, for which she received no Nobel Prize — a fact worth knowing in any genetics unit.",
          "B-DNA has a 3.4 Å rise per base pair, a 20 Å (2 nm) diameter and 10 base pairs per full turn (34 Å).",
        ],
        edgeCases: [
          "A-form DNA (10.5 bp/turn, dehydrated conditions) and left-handed Z-DNA (12 bp/turn) both differ from the B-form assumed in every school problem.",
          "Base pairing is not symmetric in bond count: A=T uses TWO hydrogen bonds, G≡C uses THREE, so GC-rich DNA is thermally more stable.",
        ],
        examAsked: [
          "NEB: 'State Chargaff's rules.' — in double-stranded DNA %A = %T and %G = %C, so purines equal pyrimidines overall.",
          "CEE: 'Why is GC-rich DNA harder to separate into single strands?' — three hydrogen bonds per G≡C against two per A=T.",
        ],
        commonMistakes: [
          "Reversing the hydrogen-bond counts: A=T has two, G≡C has three.",
          "Applying Chargaff's rules to single-stranded DNA, where %A need not equal %T.",
        ],
      },
      "uc-gen-2b": {
        keyFacts: [
          "Semiconservative replication gives each daughter DNA one PARENT and one NEW strand, proven by Meselson–Stahl: after one generation the density was INTERMEDIATE.",
          "DNA polymerase adds only in the 5'→3' direction, so the lagging strand is built as discontinuous OKAZI FRAGMENTS joined by ligase.",
        ],
        edgeCases: [
          "Replication is bidirectional and SEMI-DISCONTINUOUS: from each fork one strand is continuous and the other discontinuous.",
          "Because each parent strand is preserved, a mismatched base pair can persist through many replications — the molecular basis of hereditary disease.",
        ],
        examAsked: [
          "NEB: 'Describe Meselson and Stahl's experiment and its conclusion.' — density shift heavy → intermediate → light proves semiconservative replication.",
          "CEE: 'Why does DNA polymerase need a primer?' — it cannot start de novo and requires a free 3'-OH, supplied by an RNA primer.",
        ],
        commonMistakes: [
          "Claiming conservative replication. The intermediate band after one generation rules it out.",
          "Writing that the lagging strand grows 3'→5'. All DNA synthesis is 5'→3'; the lagging strand is merely discontinuous.",
        ],
      },
      "uc-gen-3a": {
        keyFacts: [
          "Natural selection requires three ingredients: variation, inheritance, and a difference in survival/reproduction — remove any one and no evolution follows.",
          "Directional, stabilising and disruptive selection produce three different phenotypic patterns, distinguished by whether intermediate, extreme or both-extreme phenotypes are favoured.",
        ],
        edgeCases: [
          "A trait must be heritable to respond to selection; an advantageous ACQUIRED trait confers no evolutionary advantage, which is why Lamarck's giraffe story fails.",
          "Evolutionary fitness is RELATIVE to a specific environment: a thick fur advantage flips to a liability in a warm environment, so fitness is never absolute.",
        ],
        examAsked: [
          "NEB: 'Why is the industrial melanism of Bistonis betularia evidence for natural selection?' — soot-dark trees favoured melanic moths via camouflage and bird predation, and the allele frequency shifted within a few decades.",
          "CEE: 'Distinguish stabilising from directional selection.' — stabilising favours intermediates; directional shifts the whole population toward one extreme.",
        ],
        commonMistakes: [
          "Saying individuals 'evolve'. Populations evolve; individuals acclimatise.",
          "Confusing variation (which is random) with selection (which is non-random) — only selection is directed by the environment.",
        ],
      },
      "uc-gen-3b": {
        keyFacts: [
          "Homologous structures share an underlying anatomy inherited from a common ancestor (human arm, whale flipper, bat wing), while ANALOGOUS structures such as a wing of a bird and of an insect share only a function.",
          "The strongest direct evidence is the fossil record showing transitional forms — Archaeopteryx linking reptiles and birds, and fossil whales with legs.",
        ],
        edgeCases: [
          "Vestigial structures are evidence AGAINST a purpose-driven view: a human coccyx, a whale pelvis and a python's hind limbs have no current function yet persist.",
          "Molecular evidence is the newest and strongest — the fact that human and chimpanzee genomes share ~98.8% sequence identity dates divergence far more precisely than fossils can.",
        ],
        examAsked: [
          "NEB: 'Why are homologous organs considered evidence of evolution?' — they share a common developmental origin, so similarity implies descent from a shared ancestor.",
          "CEE: 'Distinguish between analogous and homologous organs with an example each.'",
        ],
        commonMistakes: [
          "Calling a bird's and a fly's wing homologous — they are analogous; only their function is shared.",
          "Treating vestigial organs as 'useless', when they are informative precisely because they are inherited remnants.",
        ],
      },
    },
  },
};
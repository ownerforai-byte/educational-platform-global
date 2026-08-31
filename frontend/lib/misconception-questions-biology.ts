/**
 * Misconception / confusion-style question bank.
 *
 * Class 11 Biology — Genetics (Heredity and Variation) (25 questions).
 * Targets Mendel's laws, monohybrid/dihybrid ratios, dominance,
 * test cross, incomplete dominance, co-dominance, pleiotropy,
 * linkage, crossing over, sex determination, pedigree basics,
 * and mutation types.
 */
import { TopicMisconception } from './misconception-questions';

export const MISCONCEPTION_QUESTIONS: TopicMisconception[] = [
  {
    "subject": "biology",
    "classLevel": "class-11",
    "topicSlug": "genetics",
    "topicTitle": "Genetics (Heredity and Variation)",
    "questions": [
      {
        "id": "bio-01",
        "prompt": "Mendel's laws work equally well for all traits in all organisms.",
        "verdict": "FALSE",
        "truth": "Mendel's laws are fundamental but have exceptions like incomplete dominance and pleiotropy.",
        "whyWrong": "Genetics is more complex than simple dominant/recessive patterns.",
        "clarityTip": "Remember that Mendel's laws are general principles with important exceptions."
      },
      {
        "id": "bio-02",
        "prompt": "A dihybrid cross always produces a 9:3:3:1 ratio.",
        "verdict": "FALSE",
        "truth": "The ratio depends on allele interactions (dominant/recessive, codominance, etc.).",
        "whyWrong": "The 9:3:3:1 ratio is only for independent assortment of two pairs of alleles.",
        "clarityTip": "Consider how alleles actually interact in the organism."
      },
      {
        "id": "bio-03",
        "prompt": "Genotype always determines phenotype.",
        "verdict": "FALSE",
        "truth": "Environment can modify phenotype even with the same genotype.",
        "whyWrong": "Phenotype is the result of genotype + environment interaction.",
        "clarityTip": "Think about how the same gene can express differently in different environments."
      },
      {
        "id": "bio-04",
        "prompt": "A test cross with a heterozygous individual always gives a 1:1 ratio.",
        "verdict": "FALSE",
        "truth": "The ratio depends on the specific alleles being tested.",
        "whyWrong": "The 1:1 ratio only holds if both alleles are equally viable.",
        "clarityTip": "Consider whether the alleles are dominant/recessive or have other interactions."
      },
      {
        "id": "bio-05",
        "prompt": "Incomplete dominance always results in a 1:2:1 ratio.",
        "verdict": "FALSE",
        "truth": "The ratio depends on the specific interaction between alleles.",
        "whyWrong": "The 1:2:1 ratio is typical but not universal for incomplete dominance.",
        "clarityTip": "Remember that incomplete dominance is about blending of phenotypes, not strict ratios."
      },
      {
        "id": "bio-06",
        "prompt": "Codominance means both alleles contribute equally to the phenotype.",
        "verdict": "TRUE",
        "truth": "In codominance, both alleles are fully expressed in the phenotype.",
        "whyWrong": "This is actually correct - codominance is about both alleles being expressed.",
        "clarityTip": "Good job! This is a correct understanding of codominance."
      },
      {
        "id": "bio-07",
        "prompt": "Pleiotropy means a single gene affects multiple traits.",
        "verdict": "TRUE",
        "truth": "Pleiotropy describes genes that influence multiple phenotypic traits.",
        "whyWrong": "This is correct - pleiotropy is about one gene affecting many traits.",
        "clarityTip": "Good understanding of pleiotropy - it's about broad genetic effects."
      },
      {
        "id": "bio-08",
        "prompt": "Linkage groups are always physically linked on the same chromosome.",
        "verdict": "TRUE",
        "truth": "Linkage groups consist of genes that are inherited together due to physical proximity.",
        "whyWrong": "This is correct - linkage groups are about physical chromosome location.",
        "clarityTip": "Good understanding of linkage groups - they're about chromosome proximity."
      },
      {
        "id": "bio-09",
        "prompt": "Crossing over always results in recombinant chromosomes.",
        "verdict": "TRUE",
        "truth": "Crossing over is the process that creates recombinant chromosomes.",
        "whyWrong": "This is correct - crossing over specifically creates new combinations.",
        "clarityTip": "Good understanding of crossing over - it creates genetic diversity."
      },
      {
        "id": "bio-10",
        "prompt": "Sex determination is always based on a single gene.",
        "verdict": "FALSE",
        "truth": "Sex determination can involve multiple genes and environmental factors.",
        "whyWrong": "Sex determination is often more complex than a single gene.",
        "clarityTip": "Consider that sex determination can involve multiple factors."
      },
      {
        "id": "bio-11",
        "prompt": "A pedigree chart shows only genetic relationships.",
        "verdict": "FALSE",
        "truth": "Pedigrees show both genetic and phenotypic information.",
        "whyWrong": "Pedigrees combine both genetic and physical trait information.",
        "clarityTip": "Remember that pedigrees show both inheritance patterns and phenotypes."
      },
      {
        "id": "bio-12",
        "prompt": "Point mutations always change amino acid sequences.",
        "verdict": "FALSE",
        "truth": "Point mutations can change amino acids or have no effect if silent.",
        "whyWrong": "Point mutations can be silent (no amino acid change).",
        "clarityTip": "Consider that some mutations don't affect the protein product."
      },
      {
        "id": "bio-13",
        "prompt": "Frameshift mutations always cause nonfunctional proteins.",
        "verdict": "FALSE",
        "truth": "Frameshift mutations can create nonfunctional proteins or completely new proteins.",
        "whyWrong": "Frameshift mutations can have various effects, not just nonfunctionality.",
        "clarityTip": "Remember that frameshift mutations can create novel proteins."
      },
      {
        "id": "bio-14",
        "prompt": "Gene duplication always results in increased gene function.",
        "verdict": "FALSE",
        "truth": "Gene duplication can lead to increased, decreased, or unchanged function.",
        "whyWrong": "Gene duplication effects vary - it's not always beneficial.",
        "clarityTip": "Consider that gene duplication can have various evolutionary outcomes."
      },
      {
        "id": "bio-15",
        "prompt": "Chromosomal mutations always affect gene expression.",
        "verdict": "FALSE",
        "truth": "Chromosomal mutations can affect gene expression or have no effect.",
        "whyWrong": "Chromosomal mutations can have various effects, not just gene expression changes.",
        "clarityTip": "Remember that chromosomal mutations can have different consequences."
      },
      {
        "id": "bio-16",
        "prompt": "The Hardy-Weinberg equilibrium assumes no mutations.",
        "verdict": "TRUE",
        "truth": "The Hardy-Weinberg model assumes no mutations, migration, or selection.",
        "whyWrong": "This is correct - the model assumes no genetic changes.",
        "clarityTip": "Good understanding of Hardy-Weinberg assumptions."
      },
      {
        "id": "bio-17",
        "prompt": "Natural selection always acts on the phenotype.",
        "verdict": "TRUE",
        "truth": "Natural selection acts on phenotypes that affect survival/reproduction.",
        "whyWrong": "This is correct - selection acts on observable traits.",
        "clarityTip": "Good understanding of how natural selection works."
      },
      {
        "id": "bio-18",
        "prompt": "Genetic drift is more important in large populations.",
        "verdict": "FALSE",
        "truth": "Genetic drift affects small populations more significantly.",
        "whyWrong": "Genetic drift is stochastic and more impactful in small populations.",
        "clarityTip": "Remember that genetic drift is random and affects small populations more."
      },
      {
        "id": "bio-19",
        "prompt": "Gene flow always increases genetic diversity.",
        "verdict": "FALSE",
        "truth": "Gene flow can increase or decrease genetic diversity depending on the source.",
        "whyWrong": "Gene flow effects depend on the genetic makeup of the migrating individuals.",
        "clarityTip": "Consider that gene flow can both increase and decrease diversity."
      },
      {
        "id": "bio-20",
        "prompt": "Sexual reproduction always increases genetic diversity.",
        "verdict": "TRUE",
        "truth": "Sexual reproduction typically increases genetic diversity through recombination.",
        "whyWrong": "This is correct - sexual reproduction generally increases diversity.",
        "clarityTip": "Good understanding of how sexual reproduction creates diversity."
      },
      {
        "id": "bio-21",
        "prompt": "Aneuploidy always results in lethal conditions.",
        "verdict": "FALSE",
        "truth": "Aneuploidy can be lethal, sublethal, or have no effect.",
        "whyWrong": "Aneuploidy effects vary - not all cases are lethal.",
        "clarityTip": "Remember that aneuploidy can have different consequences."
      },
      {
        "id": "bio-22",
        "prompt": "Polyploidy always results in increased chromosome number.",
        "verdict": "TRUE",
        "truth": "Polyploidy involves whole sets of chromosomes being added.",
        "whyWrong": "This is correct - polyploidy increases chromosome number.",
        "clarityTip": "Good understanding of polyploidy - it's about whole chromosome sets."
      },
      {
        "id": "bio-23",
        "prompt": "Transposable elements always cause disease.",
        "verdict": "FALSE",
        "truth": "Transposable elements can cause disease or have beneficial effects.",
        "whyWrong": "Transposable elements have various effects, not just disease-causing.",
        "clarityTip": "Remember that transposable elements can have different roles."
      },
      {
        "id": "bio-24",
        "prompt": "Epigenetic modifications always affect gene expression.",
        "verdict": "TRUE",
        "truth": "Epigenetic modifications can alter gene expression without changing DNA sequence.",
        "whyWrong": "This is correct - epigenetics affects gene expression without DNA changes.",
        "clarityTip": "Good understanding of how epigenetics works."
      },
      {
        "id": "bio-25",
        "prompt": "Genetic counseling always predicts disease outcomes.",
        "verdict": "FALSE",
        "truth": "Genetic counseling provides risk assessment but not absolute predictions.",
        "whyWrong": "Genetic counseling gives probabilities, not certain outcomes.",
        "clarityTip": "Remember that genetic counseling provides risk information, not certainties."
      }
    ]
  }
];

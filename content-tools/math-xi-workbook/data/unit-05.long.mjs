/**
 * Unit 5 — Statistics and Probability: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "dispersion-cv-skewness",
    items: [
      [
        "For the data 4, 6, 8, 10, 12, 14, 16 find\n(a) the mean and standard deviation,\n(b) the coefficient of variation,\n(c) state, with a reason, whether the distribution is symmetric.",
        [
          "The data are equally spaced, so the mean is the middle value.",
          "Use σ² = Σ(x − x̄)²/n with the deviations −6, −4, …, 6.",
          "CV = (σ/x̄) × 100; symmetry follows from mean = median and balanced deviations.",
        ],
        "Given: 4, 6, 8, 10, 12, 14, 16 (n = 7)\nRequired: mean, SD, CV and the shape of the distribution\n\n1. x̄ = (4 + 6 + 8 + 10 + 12 + 14 + 16)/7 = 70/7 = 10\n2. deviations: −6, −4, −2, 0, 2, 4, 6; squares: 36, 16, 4, 0, 4, 16, 36\n3. Σ(x − x̄)² = 112 ⇒ σ² = 112/7 = 16 ⇒ σ = 4\n4. CV = (4/10) × 100 = 40%\n5. median = 10 = mean, and the deviations cancel in pairs\n6. so the distribution is symmetric — zero skewness",
        "x̄ = 10, σ = 4, CV = 40%; the distribution is symmetric because mean = median and the deviations pair off.",
        6,
        0,
        "Dispersion",
        "mean 1 + variance 2.5 + SD 1 + CV 1 + symmetry 0.5 = 6",
        "Dividing by n − 1 in an NEB item that asks for the population standard deviation given the whole data set.",
      ],
    ],
  },
  {
    slug: "probability-basics",
    items: [
      [
        "Two fair dice are thrown together. Find\n(a) P(sum = 9),\n(b) P(both numbers even),\n(c) P(sum ≥ 10 | sum is even).",
        [
          "The sample space has 36 equally likely ordered pairs.",
          "List the four pairs giving 9: (3,6), (4,5), (5,4), (6,3).",
          "For the conditional part, restrict the sample space to even sums first.",
        ],
        "Given: two fair dice, S with n(S) = 36\nRequired: two simple probabilities and one conditional probability\n\n1. sum 9: (3,6), (4,5), (5,4), (6,3) ⇒ 4 outcomes ⇒ P = 4/36 = 1/9\n2. both even: 3 × 3 = 9 outcomes ⇒ P = 9/36 = 1/4\n3. even sums: 2, 4, 6, 8, 10, 12 with counts 1, 3, 5, 5, 3, 1 ⇒ 18 outcomes\n4. of these, sum ≥ 10 means 10 or 12 ⇒ 3 + 1 = 4 outcomes\n5. P = 4/18 = 2/9\n6. conditional probability always divides by the reduced sample space, never by 36",
        "(a) 1/9  (b) 1/4  (c) 2/9.",
        6,
        1,
        "Dice",
        "each of (a) and (b) 1.5 + reduced space 1.5 + (c) 1.5 = 6",
        "Dividing the conditional count by 36. The condition shrinks the sample space to the 18 even-sum pairs.",
      ],
    ],
  },
  {
    slug: "addition-multiplication-laws",
    items: [
      [
        "For two events A and B, P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.2. Find\n(a) P(A ∪ B) and P(A | B),\n(b) P(A′ ∩ B′),\n(c) whether A and B are independent, with justification.",
        [
          "The addition law gives the union; the multiplication law gives the condition.",
          "A′ ∩ B′ is the complement of the union (De Morgan).",
          "Independence means P(A ∩ B) = P(A)P(B).",
        ],
        "Given: P(A) = 0.4, P(B) = 0.5, P(A ∩ B) = 0.2\nRequired: union, conditional, both-complements, independence\n\n1. P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7\n2. P(A | B) = P(A ∩ B)/P(B) = 0.2/0.5 = 0.4\n3. P(A′ ∩ B′) = 1 − P(A ∪ B) = 1 − 0.7 = 0.3\n4. P(A)P(B) = 0.4 × 0.5 = 0.2 = P(A ∩ B)\n5. also P(A | B) = 0.4 = P(A), a second confirmation\n6. hence A and B are independent but not mutually exclusive",
        "P(A ∪ B) = 0.7, P(A | B) = 0.4, P(A′ ∩ B′) = 0.3; A and B are independent since P(A ∩ B) = P(A)P(B).",
        6,
        2,
        "Laws of probability",
        "union 1.5 + conditional 1.5 + complement 1.5 + independence with reason 1.5 = 6",
        "Concluding \"independent\" from \"not mutually exclusive\". Independence compares a product; exclusivity compares with zero.",
      ],
    ],
  },
];

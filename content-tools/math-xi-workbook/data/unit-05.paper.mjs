/**
 * Unit 5 — Statistics and Probability: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 5,
    title: "Unit 5 — Statistics and Probability",
    note: "Show the deviation or outcome table in every Group B answer; in Group C the conditional-probability part must state the reduced sample space.",
    A: [
      ["The standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 is", ["1", "2", "3", "4"], 2, "mean 5, variance 32/8 = 4"],
      ["The coefficient of variation is", ["(x̄/σ) × 100", "(σ/x̄) × 100", "σ × x̄", "σ²/x̄"], 2, "CV expresses σ as a percentage of the mean"],
      ["For a perfectly symmetric distribution the skewness is", ["1", "−1", "0", "0.5"], 3, "mean = median = mode"],
      ["For any event E, P(E) + P(E′) equals", ["0", "1", "0.5", "2"], 2, "the two events are complementary"],
      ["Two fair coins are tossed. P(two heads) is", ["1/2", "1/3", "1/4", "2/3"], 3, "HH is one of four outcomes"],
      ["A fair die is rolled. P(an even number) is", ["1/6", "1/3", "1/2", "2/3"], 3, "three of the six faces are even"],
      ["If A and B are mutually exclusive, P(A ∪ B) is", ["P(A)P(B)", "P(A) + P(B)", "P(A) + P(B) − P(A ∩ B)", "0"], 2, "the intersection is empty"],
      ["P(A | B) equals", ["P(A ∩ B)/P(B)", "P(A ∪ B)/P(B)", "P(A)P(B)", "P(B)/P(A)"], 1, "definition of conditional probability"],
      ["A bag has 3 red and 2 blue balls. P(a red ball) is", ["2/5", "3/5", "1/2", "3/2"], 2, "3 of the 5 balls are red"],
      ["The mean of 5, 7, 9, 11, 13 is", ["7", "8", "9", "10"], 3, "sum 45 over 5"],
      ["The coefficient of range is", ["(max − min)/(max + min)", "(max + min)/(max − min)", "max − min", "max + min"], 1, "range expressed relative to the total"],
    ],
    B: [
      [
        "Find the variance and standard deviation of 3, 5, 7, 9, 11.",
        "1. x̄ = 35/5 = 7\n2. deviations: −4, −2, 0, 2, 4; squares 16, 4, 0, 4, 16\n3. Σ(x − x̄)² = 40\n4. σ² = 40/5 = 8, σ = √8 = 2√2",
        "variance 8, σ = 2√2 ≈ 2.83",
      ],
      [
        "Two dice are thrown. Find the probability that the sum is a prime number.",
        "1. n(S) = 36\n2. prime sums are 2, 3, 5, 7, 11\n3. favourable counts: 1 + 2 + 4 + 6 + 2 = 15\n4. P = 15/36 = 5/12",
        "P(prime sum) = 5/12",
      ],
      [
        "A card is drawn from a well-shuffled pack of 52. Find P(a king or a heart).",
        "1. P(king) = 4/52, P(heart) = 13/52\n2. P(king of hearts) = 1/52\n3. addition law: 4/52 + 13/52 − 1/52 = 16/52\n4. = 4/13",
        "P = 4/13",
      ],
      [
        "Three coins are tossed. Find the probability of getting at least two heads.",
        "1. n(S) = 8\n2. at least two heads: HHH, HHT, HTH, THH\n3. 4 favourable outcomes\n4. P = 4/8 = 1/2",
        "P = 1/2",
      ],
      [
        "A bag contains 4 white and 6 black balls. Two are drawn without replacement. Find P(both white).",
        "1. P(first white) = 4/10\n2. after one white ball is gone: P(second white) = 3/9\n3. multiply: (4/10)(3/9) = 12/90\n4. = 2/15",
        "P(both white) = 2/15",
      ],
      [
        "If P(A) = 0.5, P(B) = 0.3 and A, B are independent, find P(A ∪ B).",
        "1. independence: P(A ∩ B) = 0.5 × 0.3 = 0.15\n2. P(A ∪ B) = 0.5 + 0.3 − 0.15",
        "P(A ∪ B) = 0.65",
      ],
      [
        "Find the mean deviation about the mean for 4, 6, 8, 10, 12.",
        "1. x̄ = 40/5 = 8\n2. |deviations|: 4, 2, 0, 2, 4\n3. Σ|x − x̄| = 12\n4. mean deviation = 12/5",
        "mean deviation = 2.4",
      ],
      [
        "The mean of 10 observations is 20. If the observation 25 is replaced by 15, find the new mean.",
        "1. total of the original observations = 10 × 20 = 200\n2. the total changes by 15 − 25 = −10\n3. new total = 190\n4. new mean = 190/10",
        "new mean = 19",
      ],
    ],
    C: [
      [
        "For the distribution below, find (a) the mean, (b) the standard deviation, (c) the coefficient of variation. x: 1, 2, 3, 4, 5 with f: 2, 5, 8, 4, 1.",
        "1. n = 2 + 5 + 8 + 4 + 1 = 20\n2. Σfx = 2 + 10 + 24 + 16 + 5 = 57 ⇒ x̄ = 57/20 = 2.85\n3. Σfx² = 2 + 20 + 72 + 64 + 25 = 183\n4. variance = 183/20 − (2.85)² = 9.15 − 8.1225 = 1.0275\n5. σ = √1.0275 ≈ 1.014\n6. CV = (1.014/2.85) × 100 ≈ 35.6%",
        "mean 2.85, σ ≈ 1.01, CV ≈ 35.6%",
      ],
      [
        "Urn I holds 3 white and 2 black balls; urn II holds 2 white and 4 black balls. An urn is chosen at random and one ball drawn; it is white. Find the probability that it came from urn I.",
        "1. P(I) = P(II) = 1/2\n2. P(W | I) = 3/5, P(W | II) = 2/6 = 1/3\n3. P(W) = (1/2)(3/5) + (1/2)(1/3) = 3/10 + 1/6 = 7/15\n4. Bayes: P(I | W) = (3/10)/(7/15)\n5. = (3/10)(15/7) = 9/14\n6. check: P(II | W) = (1/6)/(7/15) = 5/14, and 9/14 + 5/14 = 1 ✓",
        "P(urn I | white) = 9/14 ≈ 0.643",
      ],
      [
        "(a) State the addition law of probability and use P(A) = 0.6, P(B) = 0.4, P(A ∪ B) = 0.8 to find P(A ∩ B) and P(A | B).\n(b) Decide whether A and B are independent, with justification.",
        "1. P(A ∪ B) = P(A) + P(B) − P(A ∩ B)\n2. 0.8 = 0.6 + 0.4 − P(A ∩ B) ⇒ P(A ∩ B) = 0.2\n3. P(A | B) = 0.2/0.4 = 0.5\n4. independence needs P(A ∩ B) = P(A)P(B)\n5. P(A)P(B) = 0.6 × 0.4 = 0.24 ≠ 0.2\n6. so the events are not independent",
        "P(A ∩ B) = 0.2, P(A | B) = 0.5; A and B are not independent (0.2 ≠ 0.24)",
      ],
    ],
  },
];

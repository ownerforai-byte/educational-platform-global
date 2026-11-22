/**
 * Unit 5 — Statistics and Probability: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 5,
    title: "Unit 5 — Statistics and Probability",
    set: "B",
    note: "Set B asks for the table before the formula in every statistics item; in probability, list the favourable outcomes and the reduced sample space explicitly.",
    A: [
      ["The mean of 2, 4, 6, 8, 10 is", ["5", "6", "7", "8"], 2, "30/5 = 6"],
      ["If every observation is increased by 5, the standard deviation", ["increases by 5", "decreases by 5", "is unchanged", "is multiplied by 5"], 3, "a shift does not change spread"],
      ["The probability of a sure event is", ["0", "0.5", "1", "∞"], 3, "one of the axioms"],
      ["In one throw of a die, P(number > 4) is", ["1/6", "1/3", "1/2", "2/3"], 2, "5 and 6 give 2 out of 6"],
      ["If P(A) = 1/4, then P(A′) is", ["1/4", "1/2", "3/4", "1"], 3, "1 − 1/4"],
      ["The median of 3, 5, 7, 9, 11 is", ["5", "7", "9", "11"], 2, "the middle value of the ordered data"],
      ["Two dice are thrown. P(a doublet) is", ["1/12", "1/6", "1/3", "1/36"], 2, "six doublets out of thirty-six"],
      ["Variance equals", ["SD", "SD²", "√SD", "2 × SD"], 2, "variance is the square of the standard deviation"],
      ["If A and B are independent, P(A ∩ B) equals", ["0", "P(A) + P(B)", "P(A)P(B)", "P(A)/P(B)"], 3, "the product rule for independent events"],
      ["The range of 4, 9, 2, 7 is", ["5", "7", "9", "2"], 2, "9 − 2 = 7"],
      ["For any two events, P(A ∪ B) is at most", ["0.5", "1", "2", "P(A) + P(B)"], 2, "probabilities cannot exceed 1"],
    ],
    B: [
      [
        "Find the mean and the median of 12, 15, 11, 18, 14.",
        "1. mean = 70/5 = 14\n2. ordered data: 11, 12, 14, 15, 18\n3. the middle value is 14",
        "mean 14, median 14",
      ],
      [
        "A die is thrown twice. Find the probability that the sum is 8.",
        "1. n(S) = 36\n2. favourable pairs: (2,6), (3,5), (4,4), (5,3), (6,2)\n3. five outcomes",
        "P(sum 8) = 5/36",
      ],
      [
        "From a pack of 52 cards, find P(a face card).",
        "1. face cards are the jacks, queens and kings: 3 × 4 = 12\n2. P = 12/52\n3. simplify",
        "P = 3/13",
      ],
      [
        "A bag has 5 red and 3 green balls. Two are drawn with replacement. Find P(both red).",
        "1. P(red) = 5/8 on each draw\n2. draws are independent\n3. P = (5/8)² = 25/64",
        "P = 25/64",
      ],
      [
        "If P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.2, find P(A ∪ B) and P(A′ ∩ B′).",
        "1. P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7\n2. P(A′ ∩ B′) = 1 − P(A ∪ B)\n3. = 0.3",
        "P(A ∪ B) = 0.7, P(A′ ∩ B′) = 0.3",
      ],
      [
        "Find the standard deviation of 5, 10, 15, 20, 25.",
        "1. mean = 75/5 = 15\n2. deviations −10, −5, 0, 5, 10; squares 100, 25, 0, 25, 100\n3. variance = 250/5 = 50\n4. σ = √50 = 5√2",
        "σ = 5√2 ≈ 7.07",
      ],
      [
        "The mean of a distribution is 25 and its standard deviation is 5. Find the coefficient of variation.",
        "1. CV = (σ/x̄) × 100\n2. = (5/25) × 100",
        "CV = 20%",
      ],
      [
        "Three coins are tossed. Find the probability of exactly one head.",
        "1. n(S) = 8\n2. exactly one head: HTT, THT, TTH\n3. three favourable outcomes",
        "P = 3/8",
      ],
    ],
    C: [
      [
        "For the distribution with x = 0, 1, 2, 3, 4 and f = 1, 4, 6, 4, 5, find (a) the mean, (b) the standard deviation, (c) the coefficient of variation.",
        "1. n = 1 + 4 + 6 + 4 + 5 = 20\n2. Σfx = 0 + 4 + 12 + 12 + 20 = 48 ⇒ x̄ = 2.4\n3. Σfx² = 0 + 4 + 24 + 36 + 80 = 144\n4. variance = 144/20 − (2.4)² = 7.2 − 5.76 = 1.44\n5. σ = 1.2\n6. CV = (1.2/2.4) × 100 = 50%",
        "mean 2.4, σ = 1.2, CV = 50%",
      ],
      [
        "Two cards are drawn from a pack of 52 without replacement. Find (a) P(both are kings), (b) P(at least one king).",
        "1. (a) P = (4/52)(3/51) = 12/2652 = 1/221\n2. (b) P(no king) = (48/52)(47/51) = 2256/2652\n3. P(at least one) = 1 − 2256/2652\n4. = 396/2652 = 33/221\n5. P(exactly one king) = 2(4/52)(48/51) = 384/2652 = 32/221\n6. the three cases add up: 1/221 + 32/221 + 188/221 = 221/221 ✓",
        "(a) 1/221  (b) 33/221",
      ],
      [
        "Box A has 2 red and 3 black balls; box B has 4 red and 1 black ball. A box is chosen at random and one ball drawn; it is red. Find the probability that it came from box B.",
        "1. P(A) = P(B) = 1/2\n2. P(R | A) = 2/5, P(R | B) = 4/5\n3. P(R) = (1/2)(2/5) + (1/2)(4/5) = 1/5 + 2/5 = 3/5\n4. Bayes: P(B | R) = (2/5)/(3/5)\n5. = 2/3\n6. check: P(A | R) = 1/3 and 1/3 + 2/3 = 1 ✓",
        "P(box B | red) = 2/3",
      ],
    ],
  },
];

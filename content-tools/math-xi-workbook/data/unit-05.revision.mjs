/**
 * Unit 5 — Statistics and Probability: timed revision paper (24 questions, 50 marks).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 5,
    title: "Unit 5 — Statistics and Probability: revision paper",
    minutes: 45,
    items: [
      ["Find the mean of 3, 5, 7, 9.", "24/4 = 6.", 1],
      ["Find the mode of 2, 3, 3, 4, 5.", "3, the most frequent value.", 1],
      ["Find the range of 5, 12, 3, 9.", "12 − 3 = 9.", 1],
      ["State the probability of a sure event.", "1.", 1],
      ["Find the median of 1, 2, 3, 4, 5, 6.", "(3 + 4)/2 = 3.5.", 1],
      ["If P(A) = 0.3, find P(A′).", "0.7.", 1],
      ["Find the variance of 2, 4, 6.", "Mean 4; squared deviations 4, 0, 4; variance 8/3 ≈ 2.67.", 1],
      ["Find the probability of a doublet with two dice.", "6/36 = 1/6.", 1],
      ["What is the sum of the probabilities of all outcomes?", "1.", 1],
      ["What does the coefficient of variation measure?", "Spread relative to the mean, i.e. (σ/x̄) × 100.", 1],
      ["Find the mean and the median of 10, 12, 14, 16, 18.", "Mean 70/5 = 14; the middle value is also 14.", 2],
      ["Find the standard deviation of 3, 3, 3, 3.", "Zero, since there is no deviation from the mean.", 2],
      ["Find the mean of the first ten natural numbers.", "55/10 = 5.5.", 2],
      ["Two dice are thrown. Find P(the sum is 9).", "Four favourable pairs out of 36, so 1/9.", 2],
      ["A card is drawn from a pack. Find P(a red king).", "2/52 = 1/26.", 2],
      ["A bag has 4 red and 6 black balls. Find P(red).", "4/10 = 2/5.", 2],
      [
        "If P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2, find P(A ∪ B).",
        "0.5 + 0.4 − 0.2 = 0.7.",
        2,
      ],
      ["Two coins are tossed. Find P(exactly one head).", "HT and TH out of four outcomes, so 1/2.", 2],
      ["Find the coefficient of variation if the mean is 40 and σ = 8.", "(8/40) × 100 = 20%.", 2],
      ["Find the median of 7, 3, 9, 1, 5.", "Ordered: 1, 3, 5, 7, 9, so the median is 5.", 2],
      [
        "For 2, 4, 6, 8, 10 find the mean, the standard deviation and the coefficient of variation.",
        "Mean 6; Σ(x − x̄)² = 16 + 4 + 0 + 4 + 16 = 40, so variance 8 and σ = 2√2 ≈ 2.83; CV = (2.83/6) × 100 ≈ 47.1%.",
        5,
      ],
      [
        "For x = 1, 2, 3, 4 with f = 2, 3, 4, 1 find the mean and the standard deviation.",
        "n = 10, Σfx = 24 so x̄ = 2.4; Σfx² = 66 so variance = 6.6 − 5.76 = 0.84 and σ ≈ 0.917.",
        5,
      ],
      [
        "Two cards are drawn without replacement. Find (a) P(both red) and (b) P(one red, one black).",
        "(a) (26/52)(25/51) = 25/102. (b) 2(26/52)(26/51) = 26/51, counting both orders red-then-black and black-then-red.",
        5,
      ],
      [
        "Urn A holds 3 red and 2 black balls; urn B holds 2 red and 4 black. An urn is chosen at random and one ball drawn; it is red. Find P(it came from A).",
        "P(red) = ½(3/5) + ½(2/6) = 3/10 + 1/6 = 7/15. Then P(A | red) = (3/10)/(7/15) = 9/14 ≈ 0.643.",
        5,
      ],
    ],
  },
];

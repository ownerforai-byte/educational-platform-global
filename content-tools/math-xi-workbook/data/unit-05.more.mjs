/**
 * Unit 5 — Statistics and Probability, second sheet: 12 questions per chapter.
 * Item shape: [question, working, answer, topicIndex, marks, typeLabel]
 */

export const EXTENSIONS = [
  {
    slug: "dispersion-cv-skewness",
    items: [
      ["The standard deviation of 5, 5, 5, 5 is (A) 5 (B) 1 (C) 0 (D) 25.", "Every deviation from the mean is zero.", "C — 0", 1, 1, "MCQ"],
      ["The coefficient of variation is (A) σ/x̄ (B) 100σ/x̄ (C) x̄/σ (D) σ²/x̄.", "It is quoted as a percentage.", "B — 100σ/x̄", 2, 1, "MCQ"],
      ["Karl Pearson's coefficient of skewness is (A) (mean − mode)/SD (B) (mode − mean)/SD (C) SD/mean (D) mean/mode.", "The standard form uses mean minus mode.", "A — (mean − mode)/SD", 3, 1, "MCQ"],
      ["True or false: adding the same constant to every observation leaves the SD unchanged.", "All deviations from the new mean are identical to before.", "True", 1, 1, "True/False"],
      ["True or false: the smaller the CV, the more consistent the series.", "CV measures spread relative to the mean.", "True", 2, 1, "True/False"],
      ["σ² is called the ______.", "It is the mean of the squared deviations.", "variance", 1, 1, "Fill in"],
      ["A perfectly symmetric distribution has coefficient of skewness ______.", "Mean, median and mode coincide.", "0", 3, 1, "Fill in"],
      ["A student writes σ = Σ(x − x̄)²/n. Correct it.", "That is the variance; the SD needs the square root.", "σ = √[Σ(x − x̄)²/n]", 1, 2, "Spot the error"],
      ["Assertion: a series with CV 10% is more consistent than one with CV 20%. Reason: CV measures spread relative to the mean.", "Smaller relative spread means more consistency.", "Both true, and the reason explains the comparison", 2, 2, "Assertion–reason"],
      ["Why is the variance difficult to read directly?", "It is measured in squared units of the data.", "Because its units are squared, the standard deviation is used to return to the original units", 1, 2, "Explain"],
      ["Match range and mean deviation with (a) average of |x − x̄|, (b) largest − smallest.", "One uses only the extremes, the other all values.", "Range → (b), mean deviation → (a)", 0, 2, "Match"],
      ["A series has mean 50 and SD 5. Find the CV and the variance.", "CV = 100(5)/50; variance = 5²", "CV = 10%, variance = 25", 2, 3, "Case study"],
    ],
  },
  {
    slug: "probability-basics",
    items: [
      ["The number of outcomes when two dice are thrown is (A) 12 (B) 6 (C) 36 (D) 18.", "6 × 6", "C — 36", 0, 1, "MCQ"],
      ["P(a total of 8 with two dice) = (A) 5/36 (B) 1/6 (C) 4/36 (D) 6/36.", "Pairs: (2,6), (3,5), (4,4), (5,3), (6,2)", "A — 5/36", 1, 1, "MCQ"],
      ["P(not a heart) from a full deck = (A) 1/4 (B) 3/4 (C) 13/52 (D) 1/13.", "1 − 13/52", "B — 3/4", 2, 1, "MCQ"],
      ["True or false: the sample space of one coin toss is {H, T}.", "Two equally likely outcomes.", "True", 0, 1, "True/False"],
      ["True or false: P(E) = 0.4 and P(E′) = 0.7 can both hold.", "The two probabilities must add to 1.", "False — they add to 1.1", 2, 1, "True/False"],
      ["P(E) = (number of favourable outcomes)/(______).", "Classical definition of probability.", "total number of equally likely outcomes", 1, 1, "Fill in"],
      ["P(E) + P(E′) = ______.", "E and E′ are complementary.", "1", 2, 1, "Fill in"],
      ["A student writes P(an ace) = 4/48. Correct it.", "A deck has 52 cards, not 48.", "P(ace) = 4/52 = 1/13", 1, 2, "Spot the error"],
      ["Assertion: the empirical probability approaches the theoretical value as the number of trials grows. Reason: relative frequency stabilises in the long run.", "That stabilisation is the empirical basis of probability.", "Both true, and the reason explains it", 3, 2, "Assertion–reason"],
      ["Why must every probability lie between 0 and 1?", "It is the ratio of a part to the whole.", "A favourable count cannot be negative or larger than the total count", 1, 2, "Explain"],
      ["Match one coin and two coins with (a) 4 outcomes, (b) 2 outcomes.", "Each extra toss doubles the count.", "One coin → (b), two coins → (a)", 0, 2, "Match"],
      ["Find P(at least one head in three tosses).", "1 − P(TTT) = 1 − 1/8", "7/8", 2, 3, "Case study"],
    ],
  },
  {
    slug: "addition-multiplication-laws",
    items: [
      ["P(A ∪ B) = (A) P(A) + P(B) (B) P(A) + P(B) − P(A ∩ B) (C) P(A)P(B) (D) P(A ∩ B)/P(B).", "The addition law counts the overlap once.", "B", 0, 1, "MCQ"],
      ["For independent events, P(A ∩ B) = (A) P(A) + P(B) (B) 0 (C) P(A)P(B) (D) P(A) − P(B).", "Multiplication law for independence.", "C — P(A)P(B)", 2, 1, "MCQ"],
      ["P(A | B) = (A) P(A ∩ B)/P(B) (B) P(B)/P(A) (C) P(A)P(B) (D) P(A ∪ B).", "Conditional probability definition.", "A", 3, 1, "MCQ"],
      ["True or false: mutually exclusive events with positive probabilities are independent.", "If A happens, B cannot, so P(B|A) = 0 ≠ P(B).", "False", 0, 1, "True/False"],
      ["True or false: P(A ∩ B) ≤ P(A) always.", "The intersection is contained in A.", "True", 1, 1, "True/False"],
      ["For independent events, P(A ∩ B) = ______.", "Multiply the separate probabilities.", "P(A)·P(B)", 2, 1, "Fill in"],
      ["P(A | B) = ______ for P(B) > 0.", "Condition out B.", "P(A ∩ B)/P(B)", 3, 1, "Fill in"],
      ["A student writes P(A ∪ B) = P(A) + P(B) always. Correct it.", "The intersection would then be counted twice.", "Subtract P(A ∩ B), which is 0 only when the events are mutually exclusive", 1, 2, "Spot the error"],
      ["Assertion: two draws with replacement are independent. Reason: the first draw does not change the probabilities for the second.", "Replacement restores the deck.", "Both true, and the reason explains independence", 2, 2, "Assertion–reason"],
      ["Why does the addition law subtract P(A ∩ B)?", "Those outcomes were counted in both P(A) and P(B).", "To count the overlap only once", 1, 2, "Explain"],
      ["Match mutually exclusive and independent events with (a) P(A ∩ B) = P(A)P(B), (b) P(A ∩ B) = 0.", "One forbids co-occurrence, the other merely makes it predictable.", "Mutually exclusive → (b), independent → (a)", 0, 2, "Match"],
      ["P(A) = 0.6, P(B) = 0.5, independent. Find P(exactly one occurs).", "P(A∩B′) + P(A′∩B) = 0.6(0.5) + 0.4(0.5)", "0.5", 3, 4, "Case study"],
    ],
  },
];

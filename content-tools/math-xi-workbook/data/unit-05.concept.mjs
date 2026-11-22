/**
 * Unit 5 — Statistics and Probability: two-mark conceptual answers.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "dispersion-cv-skewness",
    items: [
      ["Why is standard deviation preferred to range as a measure of spread?", "Range uses only two observations and ignores everything between them, while standard deviation uses every value through its deviations from the mean.", 2, 0],
      ["What does the coefficient of variation compare?", "Relative spread: CV = (σ/x̄) × 100 lets two distributions with different means or units be compared on the same footing.", 2, 1],
      ["What does skewness = 0 mean?", "The distribution is symmetric about its mean and the mean, median and mode coincide.", 2, 1],
      ["Why is variance measured in squared units?", "It averages the squared deviations, so its unit is the square of the data's unit; taking the square root brings it back to the original unit.", 2, 2],
      ["What does a large coefficient of variation indicate?", "The data are widely spread relative to their mean, so the mean is a less reliable summary of the set.", 2, 2],
      ["What happens to the standard deviation if every observation is increased by 5?", "It is unchanged: shifting all the data does not alter the deviations from the mean, so the spread is the same.", 2, 3],
    ],
  },
  {
    slug: "probability-basics",
    items: [
      ["What is a sample space?", "The set of all possible outcomes of an experiment; an event is a subset of it.", 2, 0],
      ["State the classical definition of probability.", "P(E) = number of favourable outcomes / total number of equally likely outcomes. It applies only when the outcomes are equally likely and finite.", 2, 1],
      ["What is the complementary event of E?", "The event that E does not happen, written E′ or Ē. Since E and E′ cover the sample space, P(E′) = 1 − P(E).", 2, 1],
      ["Why must the probabilities of all outcomes add to 1?", "They are mutually exclusive and together they exhaust the sample space, and the probability of the certain event is 1.", 2, 2],
      ["What is the probability of an impossible event?", "Zero — such an event contains no outcome of the sample space.", 2, 2],
      ["Why are the 36 outcomes of two dice treated as ordered pairs?", "Only then are all the outcomes equally likely; the unordered pair “a 3 and a 5” hides two distinct outcomes.", 2, 3],
    ],
  },
  {
    slug: "addition-multiplication-laws",
    items: [
      ["State the addition law of probability.", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B), because the outcomes in both events are counted twice in the sum.", 2, 0],
      ["When does the addition law reduce to P(A) + P(B)?", "When A and B are mutually exclusive, so P(A ∩ B) = 0 and the events cannot happen together.", 2, 0],
      ["State the multiplication law for conditional probability.", "P(A ∩ B) = P(A) P(B | A), provided P(A) ≠ 0; this is just the definition of P(B | A) rearranged.", 2, 1],
      ["When is P(A ∩ B) = P(A) P(B)?", "Exactly when A and B are independent, so the occurrence of one does not change the chance of the other.", 2, 2],
      ["Can two mutually exclusive events be independent?", "No, unless one of them has probability 0: exclusivity makes P(A ∩ B) = 0, while independence needs it to equal P(A)P(B) > 0 in general.", 2, 2],
      ["What is P(A | B) when A is a subset of B?", "It equals P(A)/P(B), because whenever B happens A also happens, so the overlap is all of A.", 2, 3],
    ],
  },
];

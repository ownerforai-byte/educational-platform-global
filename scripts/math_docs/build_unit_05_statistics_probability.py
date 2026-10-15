import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=5,
        unit_name="Statistics and Probability",
        area_name="Content area 5 (Mat. 007)"
    )

    # ==========================================
    # 5.1 Measures of Dispersion
    # ==========================================
    docx_styler.add_topic_heading(doc, "5.1", "Measures of Dispersion")

    docx_styler.add_question(
        doc, 1,
        "Distinguish between central tendency and dispersion, and between absolute and relative measures of dispersion.",
        "• Central Tendency measures the representative central value around which data clusters (Mean, Median, Mode).\n"
        "• Dispersion measures the degree of scatter, spread, or variability of individual observations away from the central value.\n"
        "• Absolute Measures are expressed in the SAME physical units as the original data (e.g., Range, Quartile Deviation, Mean Deviation, Standard Deviation). They cannot be used to compare two series with different units (e.g., height in cm vs weight in kg) or widely differing averages.\n"
        "• Relative Measures (Coefficients) are pure, dimensionless ratios or percentages (e.g., Coefficient of Range, Coefficient of QD, Coefficient of Variation). They enable fair comparison across differing units or scales.",
        "Central tendency = center; Dispersion = spread. Absolute has units; Relative is unitless."
    )

    docx_styler.add_question(
        doc, 2,
        "Define Range and its coefficient, and state its major advantages and limitations.",
        "• Range: Difference between the largest observation (L) and smallest observation (S): Range = L - S.\n"
        "• Coefficient of Range = (L - S) / (L + S).\n"
        "• Advantages: Extremely quick and simple to compute; widely used in statistical quality control (control charts) and daily weather forecasts.\n"
        "• Limitations: Highly unstable; relies solely on the two extreme values and ignores all intermediate data; cannot be calculated for open-ended frequency distributions; severely sensitive to outliers.",
        "Range = L - S. Coefficient = (L - S) / (L + S). Heavily distorted by extreme outliers."
    )

    docx_styler.add_question(
        doc, 3,
        "Define Quartile Deviation (Semi-Interquartile Range) and explain why it is preferred for open-ended data.",
        "• Quartile Deviation (QD): Half the difference between the third quartile (Q₃) and first quartile (Q₁):\n"
        "  QD = (Q₃ - Q₁) / 2.\n"
        "• Coefficient of QD = (Q₃ - Q₁) / (Q₃ + Q₁).\n"
        "• Conceptual Advantage: QD measures the spread of the middle 50% of observations. Unlike the Range, it is completely unaffected by extreme outliers in the top 25% or bottom 25%.\n"
        "• Open-ended classes: Because calculating Q₁ and Q₃ does not require values of the lowest or highest class boundaries, QD is the ONLY reliable measure of dispersion for open-ended frequency distributions.",
        "QD = (Q₃ - Q₁) / 2. Measures middle 50% spread. Ideal for open-ended frequency tables."
    )

    docx_styler.add_question(
        doc, 4,
        "Define Mean Deviation (MD) and explain why Mean Deviation is minimum when calculated about the median.",
        "• Mean Deviation: The arithmetic mean of the absolute deviations of observations from an average (A):\n"
        "  MD = (1/N) ∑ f |x - A|, where A can be Mean (x̄) or Median (M_d).\n"
        "• Coefficient of MD = MD / A.\n"
        "• Minimal Deviation Property: A fundamental mathematical theorem states that ∑ |x - A| is MINIMAL when A = Median! The median is the center of mass of order statistics, so the absolute distance sum from the median is strictly smaller than from the mean or mode.\n"
        "• Limitation of MD: Taking absolute values |x - A| artificially ignores signs, making MD algebraically intractable for higher-order statistical analysis (such as hypothesis testing).",
        "MD = ∑ f|x - A| / N. Minimal when taken about MEDIAN: ∑ |x - M_d| ≤ ∑ |x - x̄|."
    )

    docx_styler.add_question(
        doc, 5,
        "Define Standard Deviation (SD) and Variance, and state their mathematical formulations.",
        "• Standard Deviation (σ): The positive square root of the arithmetic mean of the squares of deviations from the arithmetic mean:\n"
        "  σ = √[ (1/N) ∑ f (x - x̄)² ].\n"
        "• Shortcut / Computation formula:\n"
        "  σ = √[ (1/N) ∑ f x² - (x̄)² ] = √[ (∑ f x² / N) - (∑ f x / N)² ].\n"
        "• Variance (σ²): The square of the standard deviation: σ² = (1/N) ∑ f (x - x̄)².\n"
        "• Why SD is the gold standard: It squares deviations (eliminating negative signs mathematically without ad-hoc absolute values), possesses rigorous algebraic properties, and forms the cornerstone of sampling theory, normal distribution, and regression analysis.",
        "σ = √[ (∑fx²/N) - (x̄)² ]. Variance = σ². Gold standard of dispersion in mathematics."
    )

    docx_styler.add_question(
        doc, 6,
        "Explain the effect of change of origin and change of scale on Mean and Standard Deviation.",
        "Let yᵢ = (xᵢ - a) / h, where 'a' represents change of origin (shift) and 'h' represents change of scale (scaling).\n"
        "1. Effect on Mean:\n"
        "   ȳ = (x̄ - a) / h ⇒ x̄ = a + h ȳ (Mean is affected by BOTH origin and scale!).\n"
        "2. Effect on Standard Deviation:\n"
        "   σ_y = σ_x / |h| ⇒ σ_x = |h| · σ_y.\n"
        "   Crucial Theorem: Standard deviation is completely INDEPENDENT of change of origin 'a'! Shifting every data point by adding or subtracting a constant does NOT change the spread. However, SD is DIRECTLY DEPENDENT on change of scale: multiplying all observations by c scales the SD by |c|.",
        "SD is invariant to adding/subtracting constants (origin). SD scales by |c| when multiplying by c."
    )

    docx_styler.add_question(
        doc, 7,
        "State formulas for combined mean and combined standard deviation of two groups.",
        "For Group 1 (size N₁, mean x̄₁, SD σ₁) and Group 2 (size N₂, mean x̄₂, SD σ₂):\n"
        "• Combined Mean: x̄₁₂ = (N₁ x̄₁ + N₂ x̄₂) / (N₁ + N₂).\n"
        "• Combined Standard Deviation: σ₁₂ = √[ {N₁(σ₁² + d₁²) + N₂(σ₂² + d₂²)} / (N₁ + N₂) ],\n"
        "  where d₁ = x̄₁ - x̄₁₂ and d₂ = x̄₂ - x̄₁₂ are the deviations of individual group means from the combined mean.",
        "Combined mean is a weighted average. Combined variance accounts for internal variances plus group mean shifts (d²)."
    )

    # ==========================================
    # 5.2 Coefficient of Variation
    # ==========================================
    docx_styler.add_topic_heading(doc, "5.2", "Coefficient of Variation (Consistency & Stability)")

    docx_styler.add_question(
        doc, 8,
        "Define the Coefficient of Variation (CV) and explain how it determines consistency, stability, and uniformity.",
        "• Definition: The Coefficient of Variation, introduced by Karl Pearson, is the standard deviation expressed as a percentage of the arithmetic mean:\n"
        "  CV = (σ / x̄) × 100%.\n"
        "• Decision Criteria for Comparing Two Series:\n"
        "  1. The series with LOWER CV has less relative dispersion and is therefore declared MORE CONSISTENT, MORE STABLE, MORE UNIFORM, or MORE HOMOGENEOUS.\n"
        "  2. The series with HIGHER CV has greater relative dispersion and is declared MORE VARIABLE, MORE VOLATILE, or LESS CONSISTENT.\n"
        "• Prerequisite: CV is meaningful only for ratio-scale data where the mean is strictly positive (x̄ > 0).",
        "CV = (σ / x̄) × 100%. LOWER CV = More Consistent / Stable. HIGHER CV = More Variable."
    )

    # ==========================================
    # 5.3 Skewness
    # ==========================================
    docx_styler.add_topic_heading(doc, "5.3", "Measures of Skewness")

    docx_styler.add_question(
        doc, 9,
        "Explain the concept of skewness and contrast symmetric, positively skewed, and negatively skewed distributions.",
        "Skewness denotes the lack of symmetry in a frequency distribution:\n"
        "1. Symmetrical Distribution: The curve is bell-shaped; Mean = Median = Mode; quartiles are equidistant from median: Q₃ - M_d = M_d - Q₁; Skewness = 0.\n"
        "2. Positively Skewed Distribution (Right-tailed): The tail extends longer towards the right (high values); Mean > Median > Mode; Q₃ - M_d > M_d - Q₁; Skewness > 0.\n"
        "3. Negatively Skewed Distribution (Left-tailed): The tail extends longer towards the left (low values); Mean < Median < Mode; Q₃ - M_d < M_d - Q₁; Skewness < 0.",
        "Symmetric: Mean = Median = Mode. Positive skew: Mean > Median > Mode. Negative skew: Mean < Median < Mode."
    )

    docx_styler.add_question(
        doc, 10,
        "State Karl Pearson's and Bowley's coefficients of skewness with their mathematical formulas.",
        "• Karl Pearson's Coefficient of Skewness (S_k):\n"
        "  1. Mode-based: S_k = (Mean - Mode) / σ.\n"
        "  2. Median-based (when mode is ill-defined, using empirical relation Mode ≈ 3 Median - 2 Mean):\n"
        "     S_k = 3 (Mean - Median) / σ.\n"
        "  Theoretical bounds: Values generally lie between -3 and +3.\n"
        "• Bowley's Quartile Coefficient of Skewness (S_b):\n"
        "  S_b = [ (Q₃ - M_d) - (M_d - Q₁) ] / [ (Q₃ - M_d) + (M_d - Q₁) ] = (Q₃ + Q₁ - 2 M_d) / (Q₃ - Q₁).\n"
        "  Strict mathematical bounds: -1 ≤ S_b ≤ +1. Ideal for open-ended frequency distributions.",
        "Pearson: 3(Mean - Median)/σ. Bowley: (Q₃ + Q₁ - 2M_d) / (Q₃ - Q₁), bounded strictly in [-1, +1]."
    )

    # ==========================================
    # 5.4 Probability
    # ==========================================
    docx_styler.add_topic_heading(doc, "5.4", "Probability Concepts & Theorems")

    docx_styler.add_question(
        doc, 11,
        "Define sample space, mutually exclusive events, independent events, and exhaustive events.",
        "• Sample Space (S): The set of all possible outcomes of a random experiment.\n"
        "• Mutually Exclusive (Disjoint) Events: Events that cannot happen simultaneously: A ∩ B = ∅ ⇒ P(A ∩ B) = 0.\n"
        "• Independent Events: Occurrence of one event does not influence the probability of the other: P(A ∩ B) = P(A) · P(B) or P(A|B) = P(A).\n"
        "• Exhaustive Events: The union of the events covers the entire sample space: A₁ ∪ A₂ ∪ ... ∪ Aₙ = S ⇒ P(A₁ ∪ ... ∪ Aₙ) = 1.",
        "Mutually Exclusive: P(A ∩ B) = 0 (cannot co-occur). Independent: P(A ∩ B) = P(A)P(B) (no influence)."
    )

    docx_styler.add_question(
        doc, 12,
        "State and prove the Addition Theorem of Probability for any two events.",
        "Theorem: For any two events A and B in a sample space S:\n"
        "P(A ∪ B) = P(A) + P(B) - P(A ∩ B).\n"
        "Proof from Axiomatic Set Theory:\n"
        "Notice that A ∪ B can be partitioned into mutually disjoint components:\n"
        "A ∪ B = A ∪ (B - A) = A ∪ (B ∩ A').\n"
        "Since A and (B ∩ A') are mutually disjoint:\n"
        "P(A ∪ B) = P(A) + P(B ∩ A').   --- (Equation 1)\n"
        "Similarly, event B can be partitioned as: B = (A ∩ B) ∪ (B ∩ A').\n"
        "Since these components are mutually disjoint: P(B) = P(A ∩ B) + P(B ∩ A')\n"
        "⇒ P(B ∩ A') = P(B) - P(A ∩ B).   --- (Equation 2)\n"
        "Substituting Equation 2 into Equation 1 yields:\n"
        "P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Q.E.D.\n"
        "Corollary: If A and B are mutually exclusive, P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).",
        "P(A ∪ B) = P(A) + P(B) - P(A ∩ B). For mutually exclusive events, subtract nothing."
    )

    docx_styler.add_question(
        doc, 13,
        "Define conditional probability and state the Multiplication Theorem.",
        "• Conditional Probability P(A|B): The probability of event A occurring given that event B has ALREADY occurred (with P(B) > 0):\n"
        "  P(A|B) = P(A ∩ B) / P(B).\n"
        "• Multiplication Theorem of Probability:\n"
        "  P(A ∩ B) = P(B) · P(A|B) = P(A) · P(B|A).\n"
        "• For Independent Events: Since P(A|B) = P(A), the formula simplifies to:\n"
        "  P(A ∩ B) = P(A) · P(B).\n"
        "  (For three independent events: P(A ∩ B ∩ C) = P(A) · P(B) · P(C)).",
        "P(A|B) = P(A ∩ B)/P(B). Multiplication theorem: P(A ∩ B) = P(B)P(A|B)."
    )

    docx_styler.add_question(
        doc, 14,
        "State Bayes' Theorem and explain its role in updating probabilities.",
        "Bayes' Theorem: Let B₁, B₂, ..., Bₙ be mutually exclusive and exhaustive events (partitions of sample space S with P(Bᵢ) > 0), and let A be an arbitrary event with P(A) > 0. Then for any k ∈ {1, 2, ..., n}:\n"
        "P(Bₖ | A) = [ P(Bₖ) · P(A | Bₖ) ] / [ ∑ᵢ₌₁ⁿ P(Bᵢ) · P(A | Bᵢ) ].\n"
        "Conceptual Role: Bayes' theorem enables inverse probability reasoning—updating a 'Prior probability' P(Bₖ) (initial belief before evidence) to a revised 'Posterior probability' P(Bₖ|A) after observing new evidence/event A.",
        "Posterior = (Prior × Likelihood) / Total Evidence. Updates initial beliefs with observed data."
    )

    docx_styler.add_compare_section_header(doc, "5.1 — 5.4", "Statistics & Probability Matrices")
    docx_styler.add_compare_table(
        doc, "Comparison of Measures of Dispersion",
        ["Measure", "Type", "Mathematical Definition", "Sensitivity to Outliers", "Open-Ended Usability"],
        [
            ["Range", "Absolute", "L - S", "Extremely High (uses only extremes)", "Impossible to compute"],
            ["Quartile Deviation", "Absolute", "(Q₃ - Q₁) / 2", "Completely Resistant (uses middle 50%)", "Fully Usable"],
            ["Mean Deviation", "Absolute", "∑ f|x - A| / N", "Moderate", "Cannot compute if open-ended"],
            ["Standard Deviation", "Absolute", "√[ ∑f(x-x̄)² / N ]", "High (squares large deviations)", "Cannot compute if open-ended"],
            ["Coefficient of Variation", "Relative", "(σ / x̄) × 100%", "Same as SD", "Unitless comparison standard"]
        ]
    )
    docx_styler.add_compare_table(
        doc, "Mutually Exclusive Events vs Independent Events",
        ["Criteria", "Mutually Exclusive Events", "Independent Events"],
        [
            ["Definition", "Cannot occur simultaneously in a single trial", "Occurrence of one does not affect probability of other"],
            ["Mathematical Test", "P(A ∩ B) = 0", "P(A ∩ B) = P(A) · P(B)"],
            ["Intersection Set", "A ∩ B = ∅ (disjoint sets)", "A ∩ B ≠ ∅ (unless an event is impossible)"],
            ["Venn Diagram", "Non-overlapping separate circles", "Overlapping circles"],
            ["Can non-trivial events be both?", "NO! If mutually exclusive and P(A),P(B)>0, they are heavily DEPENDENT!"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 1,
        "Derive the computational formula for variance: σ² = (1/N) ∑ f x² - (x̄)².",
        "By definition, σ² = (1/N) ∑ f (x - x̄)².\n"
        "Expand the square: (x - x̄)² = x² - 2 x x̄ + (x̄)².\n"
        "Multiply by f and sum across all observations:\n"
        "∑ f (x - x̄)² = ∑ f [x² - 2 x x̄ + (x̄)²] = ∑ f x² - 2 x̄ ∑ f x + (x̄)² ∑ f.\n"
        "Recall that N = ∑ f and x̄ = (∑ f x) / N ⇒ ∑ f x = N x̄.\n"
        "Substitute these identities:\n"
        "∑ f (x - x̄)² = ∑ f x² - 2 x̄ (N x̄) + (x̄)² (N)\n"
        "= ∑ f x² - 2 N (x̄)² + N (x̄)²\n"
        "= ∑ f x² - N (x̄)².\n"
        "Divide both sides by N:\n"
        "σ² = (1/N) [ ∑ f x² - N (x̄)² ] = (1/N) ∑ f x² - (x̄)². Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Derive", 2,
        "Prove mathematically that standard deviation is independent of change of origin.",
        "Let yᵢ = xᵢ - c, where c is an arbitrary constant (change of origin).\n"
        "Taking means: ȳ = (1/N) ∑ yᵢ = (1/N) ∑ (xᵢ - c) = (1/N) ∑ xᵢ - (N c / N) = x̄ - c.\n"
        "Now consider the deviations of y from its mean:\n"
        "yᵢ - ȳ = (xᵢ - c) - (x̄ - c) = xᵢ - x̄.\n"
        "The deviations are identical in both coordinate systems!\n"
        "Therefore: σ_y² = (1/N) ∑ (yᵢ - ȳ)² = (1/N) ∑ (xᵢ - x̄)² = σ_x².\n"
        "Taking square roots: σ_y = σ_x.\n"
        "Thus, adding or subtracting any constant c to all data points leaves the standard deviation completely unchanged. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 3,
        "Explain why the complement rule P(at least one) = 1 - P(none) is so powerful in probability.",
        "The event 'at least one' encompasses multiple compound cases (e.g., exactly 1, exactly 2, ..., all n).\n"
        "Calculating each case separately requires evaluating numerous complex combinations and summing them up.\n"
        "However, by the law of complementary events, the logical negation of 'at least one occurs' is simply 'none occurs'—which is a single, clean scenario.\n"
        "Because total probability is 1, P(at least one) = 1 - P(none). If events are independent with failure rates qᵢ, P(none) = q₁ · q₂ · ... · qₙ, reducing a tedious multi-page problem to a one-line evaluation."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 4,
        "Can two events with positive probabilities be both mutually exclusive AND independent simultaneously?",
        "NO, they CANNOT! This is one of the most common student misconceptions in probability.\n"
        "If A and B are mutually exclusive: P(A ∩ B) = 0.\n"
        "If A and B are independent: P(A ∩ B) = P(A) · P(B).\n"
        "For both to hold simultaneously: P(A) · P(B) = 0, which requires at least one event to have probability zero.\n"
        "If both events have positive probabilities (P(A) > 0 and P(B) > 0), P(A) · P(B) > 0 ≠ 0.\n"
        "In fact, mutually exclusive events are DEPENDENT: if A occurs, the probability of B occurring drops instantly to ZERO!"
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 5,
        "Factory A has mean wage $500 with SD $50. Factory B has mean wage $600 with SD $54. Which factory has greater uniformity in wages?",
        "We compute the Coefficient of Variation (CV) for both factories:\n"
        "Factory A: CV_A = (σ_A / x̄_A) × 100% = (50 / 500) × 100% = 10.0%.\n"
        "Factory B: CV_B = (σ_B / x̄_B) × 100% = (54 / 600) × 100% = 9.0%.\n"
        "Comparison: CV_B (9.0%) < CV_A (10.0%).\n"
        "Conclusion: Factory B has a lower coefficient of variation and therefore exhibits GREATER UNIFORMITY (consistency) in wage distribution than Factory A."
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 6,
        "A bag contains 4 red and 6 black balls. Two balls are drawn successively without replacement. Find the probability that both are red.",
        "Let R₁ be the event of drawing a red ball on the first draw, and R₂ on the second draw.\n"
        "Total balls = 4 + 6 = 10.\n"
        "P(R₁) = 4 / 10 = 2/5.\n"
        "Since drawing is without replacement, remaining balls = 9, remaining red balls = 3.\n"
        "Conditional probability P(R₂ | R₁) = 3 / 9 = 1/3.\n"
        "By the Multiplication Theorem: P(R₁ ∩ R₂) = P(R₁) · P(R₂ | R₁) = (4/10) · (3/9) = 12 / 90 = 2/15."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Range = L - S. Coefficient of Range = (L - S) / (L + S).",
        "Quartile Deviation: QD = (Q₃ - Q₁) / 2. Only dispersion measure usable for open-ended data.",
        "Mean Deviation: MD = ∑ f|x - A| / N. Minimal when taken about MEDIAN (A = M_d).",
        "Standard Deviation: σ = √[ (∑fx²/N) - (x̄)² ]. Independent of origin; scales by |c|.",
        "Coefficient of Variation: CV = (σ / x̄) × 100%. Lower CV = More consistent / stable.",
        "Skewness: Symmetrical (Mean = Median = Mode); Positive (Mean > Median > Mode); Negative (Mean < Median < Mode).",
        "Karl Pearson Skewness = 3(Mean - Median) / σ. Bowley Skewness = (Q₃ + Q₁ - 2M_d) / (Q₃ - Q₁).",
        "Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Disjoint ⇒ P(A ∩ B) = 0.",
        "Conditional: P(A|B) = P(A ∩ B) / P(B). Independent ⇒ P(A ∩ B) = P(A)P(B).",
        "Complement Shortcut: P(at least one) = 1 - P(none).",
        "Bayes' Theorem: P(Bₖ|A) = [P(Bₖ)P(A|Bₖ)] / [∑ P(Bᵢ)P(A|Bᵢ)]."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_05_statistics-probability.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()

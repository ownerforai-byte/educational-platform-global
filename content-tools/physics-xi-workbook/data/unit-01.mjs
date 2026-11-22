/**
 * Physics XI — Unit 1, Physical Quantities.
 * Item shape: [question, working, answer, marks, topicIndex]
 */

export const CHAPTERS = [
  {
    slug: "precision-and-significant-figures",
    items: [
      ["How many significant figures are there in 0.00450?", "Leading zeros are not significant; the digits 4, 5 and the trailing 0 are.\n3 significant figures.", "3 s.f.", "1", 1],
      ["How many significant figures are there in 2.50 × 10³?", "The trailing zero after the decimal point is significant; the power of ten is not counted.\n3 significant figures.", "3 s.f.", "1", 1],
      ["Which is the more precise measurement: 4.6 cm or 4.65 cm?", "Precision depends on the smallest division a scale can read.\n4.65 cm is read to 0.01 cm, 4.6 cm only to 0.1 cm.", "4.65 cm is more precise", "2", 0],
      ["Add 12.11, 0.2 and 3.1234, keeping the correct number of significant figures.", "For addition the answer keeps the fewest decimal places (0.2 has one).\n12.11 + 0.2 + 3.1234 = 15.4334.", "15.4 (one decimal place)", "2", 1],
      ["Multiply 2.5 by 1.24 and round correctly.", "For multiplication the answer keeps the fewest significant figures (2.5 has two).\n2.5 × 1.24 = 3.10.", "3.1 (two significant figures)", "2", 1],
      ["Express 0.000456 in scientific notation to two significant figures.", "Shift the point four places right: 4.56 × 10⁻⁴.\nRounding 4.56 to two figures gives 4.6.", "4.6 × 10⁻⁴", "2", 2],
      ["The mass of a body is (12 ± 0.5) kg. Find the fractional and percentage error.", "Fractional error = Δm/m = 0.5/12 = 0.0417.\nPercentage error = 0.0417 × 100%.", "0.042 and 4.2%", "3", 3],
      ["The radius of a circle is (2.1 ± 0.05) cm. Find the percentage error in its area.", "Area A = πr², so the relative error doubles: ΔA/A = 2(Δr/r).\n= 2(0.05/2.1) = 0.0476.", "4.8%", "3", 3],
      ["A mass of 5.00 g occupies 1.25 cm³. Find the density to the correct number of significant figures.", "ρ = m/V = 5.00/1.25.\n= 4.00 g/cm³, and three significant figures are justified by both data.", "4.00 g/cm³", "3", 1],
      ["Why is 3.14 × 2.0 written as 6.3 rather than 6.28?", "The factor 2.0 carries only two significant figures.\n3.14 × 2.0 = 6.28, which must be rounded to two figures.", "6.3", "2", 1],
      ["A true length is 10 m. One student measures 9.98 m and another 10.0 m. Whose reading is more accurate?", "Accuracy is closeness to the true value, so compare the errors: 0.02 m and 0.00 m.", "10.0 m — its error is zero", "2", 0],
      ["The period of a pendulum is measured five times: 2.0, 2.1, 1.9, 2.1 and 1.9 s. Find the mean and the percentage error.", "Mean = (2.0 + 2.1 + 1.9 + 2.1 + 1.9)/5 = 2.0 s.\nMaximum deviation = 0.1 s, so the percentage error = (0.1/2.0) × 100%.", "2.0 s with a 5% error", "3", 3],
    ],
  },
  {
    slug: "dimensions-and-dimensional-analysis",
    items: [
      ["Write the dimensional formula of force.", "F = ma = [M][L T⁻²].\nSo [F] = M L T⁻².", "[M L T⁻²]", "1", 0],
      ["Write the dimensional formula of work.", "W = Fs = [M L T⁻²][L].\nSo [W] = M L² T⁻².", "[M L² T⁻²]", "1", 0],
      ["Write the dimensional formula of pressure.", "p = F/A = [M L T⁻²]/[L²].\nSo [p] = M L⁻¹ T⁻².", "[M L⁻¹ T⁻²]", "1", 0],
      ["Write the dimensional formula of Planck's constant.", "E = hν ⇒ h = E/ν = [M L² T⁻²]/[T⁻¹].\nSo [h] = M L² T⁻¹.", "[M L² T⁻¹]", "1", 0],
      ["Check the equation v = u + at dimensionally.", "[v] = [u] = L T⁻¹.\n[at] = [L T⁻²][T] = L T⁻¹ — all three terms agree.", "Dimensionally correct", "2", 1],
      ["Check the equation s = ut + ½at² dimensionally.", "[ut] = [L T⁻¹][T] = L.\n[at²] = [L T⁻²][T²] = L — every term is a length.", "Dimensionally correct", "2", 1],
      ["Show that kinetic energy and gravitational potential energy have the same dimensions.", "½mv² = [M][L T⁻¹]² = M L² T⁻².\nmgh = [M][L T⁻²][L] = M L² T⁻² — the two agree.", "Both are [M L² T⁻²]", "2", 1],
      ["Derive the form of the period T of a simple pendulum from dimensions, given T ∝ lᵃ gᵇ.", "[T] = [L]ᵃ[L T⁻²]ᵇ gives L: a + b = 0 and T: −2b = 1.\nSo b = −½, a = ½ and T = k√(l/g).", "T = k √(l/g)", "3", 2],
      ["The frequency n of a stretched string depends on its length l, tension F and mass per unit length m. Derive n = k lᵃ Fᵇ mᶜ.", "[T⁻¹] = [L]ᵃ[M L T⁻²]ᵇ[M L⁻¹]ᶜ.\nM: b + c = 0, L: a + b − c = 0, T: −2b = −1 ⇒ b = ½, c = −½, a = −1.", "n = k (1/l) √(F/m)", "3", 2],
      ["Why can dimensional analysis not give the factor ½ in s = ut + ½at²?", "The method fixes only the powers of the base quantities.\nAny dimensionless constant, including ½, is invisible to dimensions.", "Dimensions fix powers, never pure numbers", "3", 3],
      ["Write the dimensional formula of the gravitational constant G.", "F = Gm₁m₂/r² ⇒ G = Fr²/(m₁m₂).\n= [M L T⁻²][L²]/[M²] = M⁻¹ L³ T⁻².", "[M⁻¹ L³ T⁻²]", "2", 0],
      ["In (P + a/V²)(V − b) = RT, find the dimensions of a and b.", "b is added to a volume, so [b] = L³.\na/V² has the dimensions of pressure ⇒ [a] = [p][V²] = [M L⁻¹ T⁻²][L⁶].", "[a] = M L⁵ T⁻², [b] = L³", "3", 3],
    ],
  },
];

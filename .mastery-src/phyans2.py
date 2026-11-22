#!/usr/bin/env python
# Populate PYQ answers - physics batch 2: dispersion, dynamics, elasticity, electric-charges, electric-field
import json

A = {}

A['dispersion/01-neb-2023.json'] = {0: (
"**Setup:** a ray strikes the first face at incidence angle i, refracts at angle r₁, crosses the "
"prism at angle r₂ to the second face, emerges at angle e; the prism's refracting angle is A. "
"**Geometry at the two faces:** the normals at the two faces meet at the prism's apex with angle A; "
"the quadrilateral formed by the ray and the two normals gives **r₁ + r₂ = A** (the angle between "
"the normals is 180° − A, and the four angles of the quadrilateral sum to 360°). "
"**Deviation at each face:** the ray bends toward the normal entering (deviation i − r₁) and away "
"from the normal leaving (deviation e − r₂). The exterior angle between the incident ray produced "
"and the emergent ray produced is the sum of the two deflections: "
"**δ = (i − r₁) + (e − r₂) = (i + e) − (r₁ + r₂) = i + e − A**. "
"**Deep point:** two geometric facts carry the derivation — r₁ + r₂ = A from the quadrilateral, and "
"deviation as the sum of the two face-bending; δ = i + e − A is their one-line consequence.")}

A['dispersion/02-neb-2022.json'] = {0: (
"**Dispersion of light:** the splitting of white (composite) light into its constituent colours "
"when it passes through a refracting medium — red bends least, violet most, giving the spectrum. "
"**Why it happens:** the **refractive index of a material depends on the wavelength (colour) of "
"light** (normal dispersion: n decreases as λ increases, because higher frequencies interact more "
"strongly with the medium's electrons). White light contains all wavelengths; in the prism each "
"colour obeys Snell's law sin i/sin r = n_λ with its own n: violet (largest n ≈ 1.53) refracts "
"most, red (smallest n ≈ 1.51) least. Since the prism's faces are not parallel, the tiny "
"per-refraction differences are **not cancelled on exit** — the colours emerge at different angles "
"and spread into the spectrum (seven colours: violet, indigo, blue, green, yellow, orange, red). "
"**Deep point:** dispersion needs two ingredients — wavelength-dependent n *and* non-parallel "
"surfaces; a glass slab refracts all colours by different amounts too, but its parallel faces "
"recombine them, so no spectrum appears.")}

A['dispersion/03-neb-2021.json'] = {0: (
"**Angular dispersion:** δ_v − δ_r, the angular separation between the violet and red rays. "
"**For a small-angled (thin) prism,** δ = (n − 1)A, so: "
"δ_v = (n_v − 1)A and δ_r = (n_r − 1)A ⟹ **angular dispersion = (n_v − n_r)A**. "
"**Mean deviation:** δ_y = (n_y − 1)A (yellow, the mean colour). "
"**Dispersive power:** the ratio of angular dispersion to mean deviation: "
"**ω = (δ_v − δ_r)/δ_y = (n_v − n_r)/(n_y − 1)**. "
"The A cancels — dispersive power depends only on the material's refractive indices, not the "
"prism's angle. **Deep point:** the cancellation of A is the result's meaning — a big prism "
"deviates more but does not *disperse relatively* more; spreading power is a material property.")}

A['dispersion/04-neb-2020.json'] = {0: (
"**Deviation of light:** the total angular deflection of a ray from its original direction after "
"passing through an optical element (prism, slab, lens) — a **single-ray** effect, measured for one "
"colour (usually yellow/mean light): δ = i + e − A for a prism. "
"**Dispersion of light:** the **splitting of composite (white) light into its component colours** "
"because n depends on wavelength — a **many-ray** effect measured by the angular spread between "
"extreme colours (δ_v − δ_r) or by dispersive power. "
"**Key differences:** (1) deviation is about one ray's bending; dispersion is about the *separation* "
"of rays of different colours; (2) deviation occurs even for monochromatic light; dispersion "
"requires polychromatic light and wavelength-dependent n; (3) deviation measures how *much* the "
"prism bends light, dispersion measures how *unequally* it bends it. **Deep point:** a prism "
"deviates *and* disperses simultaneously — deviation is the mean shift, dispersion the spread "
"around it; an achromatic combination cancels the spread while keeping the shift.")}

A['dispersion/05-neb-2024.json'] = {
0: ("**Dispersion of light:** the splitting of white light into its constituent colours on passing "
"through a prism (or any refracting medium), because the colours emerge at different angles. "
"**Cause:** the **refractive index depends on wavelength** — n is largest for violet (short λ) and "
"smallest for red (long λ), since higher-frequency light interacts more strongly with the medium's "
"electrons. Each colour obeys Snell's law with its own n, so each bends by a different amount at "
"each face; because the prism's faces are non-parallel, the differences accumulate on exit and the "
"colours fan out into a spectrum. **Deep point:** wavelength-dependent n is the cause; non-parallel "
"faces are the amplifier — a slab has the same n(λ) but cancels the spread."),
1: ("**Angular dispersion:** the angle between the emergent extreme rays — δ_v − δ_r; for a thin "
"prism, (n_v − n_r)A. **Dispersive power:** the angular dispersion per unit mean (yellow) "
"deviation — the material's intrinsic spreading ability: "
"**ω = (δ_v − δ_r)/δ_y = (n_v − n_r)/(n_y − 1)**. It is dimensionless and independent of the "
"prism angle. **Deep point:** dispersion is an angle; dispersive power is a *ratio* — dividing by "
"the mean deviation removes the geometry and leaves the glass."),
2: ("**Formula:** ω = (n_v − n_r)/(n_y − 1). "
"**Substitute:** n_v = 1.53, n_r = 1.51, n_y = 1.52: "
"ω = (1.53 − 1.51)/(1.52 − 1) = 0.02/0.52 = **0.038 (≈ 3.8%)**. "
"**Deep point:** the numerator is the spread, the denominator the mean bend — a dispersive power "
"of 0.038 means the spectrum's width is about 4% of the mean deviation, typical of crown glass."),
3: ("**Primary rainbow formation:** sunlight enters a **raindrop**, refracts at the front surface, "
"**undergoes one total internal reflection** at the back of the drop, and refracts out of the "
"front again — a net deviation of about 138° (so the light returns at ~42° from the antisolar "
"point). **Dispersion at each refraction** separates the colours: red, being least refracted, "
"emerges at the larger angle (~42°) and lies on the **outer (top) edge** of the bow; violet, most "
"refracted, at ~40° on the inner edge. Every drop on the cone of semi-angle ~42° about the "
"sun-observer line contributes, building the arc. **Deep point:** one internal reflection = "
"primary (42°, red outside); two reflections = secondary (51°, colours reversed, fainter) — the "
"count of reflections inside the drop orders the bows."),
4: ("**Achromatic combination:** two prisms (usually crown and flint glass) cemented with their "
"refracting angles opposed, so that the **dispersion of one cancels the dispersion of the other** "
"while a net deviation remains — the combination disperses no white light but still bends it. "
"**Condition:** the angular dispersions are equal and opposite: "
"**(n_v − n_r)A = (n′_v − n′_r)A′** (dispersive powers × angles equal: ωA = ω′A′). "
"The net deviation is then δ = (n_y − 1)A − (n′_y − 1)A′ ≠ 0. **Deep point:** the condition "
"cancels the *spread* but not the *mean bend* — which is exactly what a direct-vision "
"spectroscope needs: deviation without spectrum."),
5: ("**Because the refractive index decreases with wavelength:** violet (shortest λ) has the largest "
"n and obeys Snell's law with the greatest bending at both faces; red (longest λ) has the smallest "
"n and bends least. Deviation for a thin prism is δ = (n − 1)A, so δ_v = (n_v − 1)A > δ_r = "
"(n_r − 1)A. **Deep point:** the formula δ = (n − 1)A compresses the answer — bigger n, bigger "
"δ, and violet always owns the biggest n.")}

A['dynamics/01-neb-2024.json'] = {0: (
"**First law (inertia):** a body remains at rest or in uniform straight-line motion unless acted "
"on by a net external force — *example:* passengers lurch forward when a bus brakes (their bodies "
"keep the previous motion). **Second law:** the rate of change of momentum is proportional to the "
"applied net force and in its direction: **F = ma** — *example:* the same push accelerates an "
"empty trolley more than a loaded one. **Third law (action–reaction):** to every action there is "
"an equal and opposite reaction — *example:* a rocket rises by pushing exhaust gases down; the "
"gases push the rocket up (also: walking — you push the ground backward, the ground pushes you "
"forward). **Deep point:** the three laws are one story — the first defines force's absence "
"(inertia), the second measures it (F = ma), the third says it never acts alone (pairs on "
"different bodies).")}

A['dynamics/02-neb-2023.json'] = {0: (
"**Limiting friction:** f_max = μ_s N, with N = mg on a horizontal plane. "
"**Substitute:** N = 5 × 10 = 50 N; f_max = 0.4 × 50 = **20 N**. "
"**Answer:** a horizontal force **just over 20 N** is needed to start the block moving (at exactly "
"20 N it is on the verge; any excess accelerates it). "
"**Deep point:** 'needed to start' means 'to reach limiting friction' — below 20 N the block "
"matches the applied force with static friction and stays put; the question's answer is a "
"threshold, not an equality.")}

A['dynamics/03-neb-2021.json'] = {0: (
"**Check the motion first:** the component of weight down the incline is mg sin θ = 10 × 9.8 × "
"0.5 = 49 N (using g = 9.8; with g = 10 it is 50 N). The maximum static friction available is "
"μmg cos θ = 0.2 × 10 × 9.8 × cos 30° = 0.2 × 98 × 0.866 ≈ 17 N. Since 49 N > 17 N, **the block "
"slides** — so the friction acting is **kinetic**: "
"**f = μ_k mg cos θ = 0.2 × 10 × 9.8 × 0.866 ≈ 17.0 N** (16.97 N; ≈17.3 N with g = 10), directed "
"up the incline, opposing the motion. "
"**Deep point:** the question's hidden step is the slide-check — quoting the friction as μmg cos θ "
"is only valid *because* the block moves; had gravity's component been smaller than limiting "
"friction, the answer would have been mg sin θ (static friction matches, not maxes).")}

A['dynamics/04-neb-2020.json'] = {0: (
"**Mass:** the quantity of matter in a body; a measure of its **inertia** (resistance to change of "
"motion). Scalar; constant everywhere; measured in **kg** with a balance (comparing with "
"standards); never zero. **Weight:** the **gravitational force** on the body, W = mg. Vector "
"(toward the earth's centre); varies with location (g decreases with altitude, latitude); measured "
"in **newtons** with a spring balance; zero in weightlessness/free fall. **Relation:** W = mg — "
"weight is mass multiplied by the local gravitational field strength. **Deep point:** mass is what "
"the body *is*, weight is what gravity *does to it* — an astronaut's mass is unchanged on the Moon "
"while her weight falls to one-sixth.")}

A['elasticity/01-neb-2023.json'] = {
0: ("**Stress:** the deforming force per unit area: **stress = F/A**; SI unit **pascal (Pa = N/m²)** "
"(types: tensile, compressive, shear). **Strain:** the fractional deformation produced: "
"**strain = ΔL/L** (longitudinal) — a **pure ratio, dimensionless, no unit**. "
"**Young's modulus:** the ratio of tensile stress to longitudinal strain within the elastic limit: "
"**Y = stress/strain = (F/A)/(ΔL/L) = FL/(AΔL)**; SI unit the **pascal (N/m²)** — steel ≈ "
"2 × 10¹¹ Pa. **Deep point:** stress and strain are the cause and the effect; Young's modulus is "
"the material's constant linking them — it measures stiffness, not strength."),
1: ("**Young's modulus:** the ratio of tensile stress to longitudinal strain within the elastic "
"limit — the measure of a material's stiffness against stretching. "
"**Formula: Y = (F/A)/(ΔL/L) = FL/(AΔL)**. **SI unit: pascal (N/m²)** (Pa; commonly GPa for "
"metals). **Deep point:** 'within the elastic limit' is the qualifier that earns the mark — beyond "
"it the ratio stops being constant and the definition fails.")}

A['elasticity/02-neb-2022.json'] = {0: (
"**Stress:** F/A with A = 2 mm² = 2 × 10⁻⁶ m²: stress = 100/(2 × 10⁻⁶) = **5 × 10⁷ Pa = 50 MPa**. "
"**Strain:** strain = stress/Y = (5 × 10⁷)/(2 × 10¹¹) = **2.5 × 10⁻⁴**. "
"**(Bonus check:** for a 2 m wire this means ΔL = strain × L = 5 × 10⁻⁴ m = 0.5 mm.**)** "
"**Deep point:** the mm² → m² conversion (× 10⁻⁶) is the only trap — get it wrong by a factor of "
"a thousand and both answers follow the error.")}

A['elasticity/03-neb-2020.json'] = {0: (
"**Formula:** Y = FL/(AΔL). "
"**Substitute:** F = 200 N; L = 2 m; A = 2 × 10⁻⁵ m²; ΔL = 2 mm = 2 × 10⁻³ m. "
"Y = (200 × 2)/(2 × 10⁻⁵ × 2 × 10⁻³) = 400/(4 × 10⁻⁸) = **1 × 10¹⁰ Pa = 10 GPa**. "
"**(Sanity:** this is low for copper (typical ~1.1 × 10¹¹ Pa) — the given numbers describe a very "
"stretchy wire; the method is what the marks reward.**)** "
"**Deep point:** the four-factor formula is dimensionally a force × length over area × extension — "
"writing it as (F/A)/(ΔL/L) first keeps the stress and strain visible, and the Pa answer follows "
"from N/m² × dimensionless.")}

A['elasticity/04-neb-2024.json'] = {
0: ("**Stress:** force per unit area, F/A — SI unit **pascal (N/m²)**; measures the intensity of the "
"internal restoring force. **Strain:** fractional deformation, ΔL/L — **dimensionless** (no unit). "
"**Young's modulus:** stress/strain within the elastic limit, Y = FL/(AΔL) — SI unit **pascal**; "
"a material's stiffness constant (steel 2 × 10¹¹ Pa, rubber ~10⁷ Pa). "
"**Deep point:** stress has a unit, strain has none, and their ratio inherits the unit — that "
"asymmetry is why Y is in Pa while strain is a bare number."),
1: ("**Stress:** A = 2 mm² = 2 × 10⁻⁶ m² ⟹ stress = 100/(2 × 10⁻⁶) = **5 × 10⁷ Pa (50 MPa)**. "
"**Strain:** strain = stress/Y = (5 × 10⁷)/(2 × 10¹¹) = **2.5 × 10⁻⁴**. "
"**Deep point:** strain came from dividing by Y — the modulus's role is to convert the applied "
"stress into the geometric response."),
2: ("**Hooke's law:** within the elastic limit, the extension of a body is proportional to the "
"applied force: **F = kx** (k = force constant/spring constant, N/m). "
"**Force constant:** k = F/x = 50/(2 × 10⁻³) = **2.5 × 10⁴ N/m**. "
"**Deep point:** the force constant is stiffness per unit extension — 25 000 N needed per metre "
"of stretch, and its large value is what 'wire' (vs spring) implies."),
3: ("**Energy stored in a stretched wire: U = ½kx² = ½Fx** (for a linearly elastic stretch). "
"**Substitute:** U = ½ × 50 × 2 × 10⁻³ = **0.05 J** "
"(check via ½kx²: ½ × 2.5 × 10⁴ × (2 × 10⁻³)² = ½ × 2.5 × 10⁴ × 4 × 10⁻⁶ = 0.05 J ✓). "
"**Deep point:** the ½ is the area of the F–x triangle — the force ramps from 0 to F during "
"stretching, so the work is half of F × x, not F × x."),
4: ("**Bulk modulus:** the ratio of normal (volume) stress to volume strain — resistance to uniform "
"compression: **K = −ΔP/(ΔV/V)** (pressure increase per fractional volume decrease); SI unit Pa; "
"solids and liquids have large K (liquids nearly incompressible). "
"**Poisson's ratio:** within the elastic limit, the ratio of **lateral contraction strain to "
"longitudinal extension strain**: σ = −(Δd/d)/(ΔL/L); typical metals 0.25–0.35. "
"**Why dimensionless:** it is the ratio of **two strains**, and strain itself is a ratio of two "
"lengths — the units cancel twice over, leaving a pure number. **Deep point:** σ is the sideways "
"price of stretching — pull a rubber band and it thins; Poisson's ratio is the exchange rate "
"between the two deformations."),
5: ("**Breaking stress** = maximum stress before failure = 8 × 10⁸ Pa. **Maximum force:** "
"F_max = stress × A = 8 × 10⁸ × 5 × 10⁻⁶ m² (5 mm² = 5 × 10⁻⁶ m²) = **4000 N**. "
"**Maximum mass:** the cable must support the weight mg: m = F/g = 4000/10 = **400 kg**. "
"**Deep point:** the conversion mm² → m² (× 10⁻⁶) and the stress-to-force multiplication are the "
"two steps — the cable's strength is a stress, but what it lifts is a force, and area is the "
"bridge.")}

A['electric-charges/01-neb-2024.json'] = {0: (
"**Coulomb's law:** the force between two point charges is **directly proportional to the product "
"of the charges and inversely proportional to the square of the distance between them**, acting "
"along the line joining them: **F = (1/4πε₀) q₁q₂/r² = k q₁q₂/r²**, with k = 9 × 10⁹ N m² C⁻² in "
"air/vacuum. Like charges repel, unlike attract. "
"**Calculation:** q₁ = 2 μC = 2 × 10⁻⁶ C; q₂ = 3 μC = 3 × 10⁻⁶ C; r = 0.1 m. "
"F = (9 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶)/(0.1)² = (9 × 10⁹ × 6 × 10⁻¹²)/10⁻² = (5.4 × 10⁻²)/10⁻² = "
"**5.4 N, repulsive** (both charges positive). "
"**Deep point:** the micro-to-coulomb conversion (× 10⁻⁶ twice) and the squared distance are the "
"two classic slip points — the exponent bookkeeping decides the answer.")}

A['electric-charges/02-neb-2022.json'] = {0: (
"**Compute:** F = k|q₁q₂|/r² = (9 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶)/(0.6)² "
"= (9 × 10⁹ × 6 × 10⁻¹²)/0.36 = (5.4 × 10⁻²)/0.36 = **0.15 N**. "
"**Direction:** the charges are **opposite signs (+2 μC, −3 μC)** ⟹ the force is **attractive**. "
"**Answer: (a) 0.15 N attractive.** "
"**Deep point:** magnitude from the product of |q|'s, direction from the signs — the arithmetic "
"gives 0.15 N and the signs give 'attractive'; option (b) is the sign-slip distractor.")}

A['electric-charges/03-neb-2021.json'] = {0: (
"**Quantisation of charge:** electric charge exists only in **integer multiples of the elementary "
"charge e = 1.6 × 10⁻¹⁹ C** — q = ±ne, n = 0, 1, 2, …; charge is never found in fractions of e. "
"(It arises because charge is *carried* by particles: the electron carries −e, the proton +e; "
"charge is transferred whole-particle at a time.) "
"**Why 2.5e is impossible:** 2.5e = 4 × 10⁻¹⁹ C would require **2.5 electrons** — half an electron "
"cannot exist or be transferred; the electron is indivisible in ordinary physics, so only integer "
"counts of e are observable (fractional quark charges ⅔e, ⅓e never appear free). "
"**Deep point:** quantisation is the discreteness of the charge-carrier made visible — the unit "
"of charge is small enough that macroscopic charges look continuous, but every one of them is a "
"countable integer multiple.")}

A['electric-field/01-neb-2023.json'] = {
0: ("**Gauss's law:** the total electric flux through any closed surface equals **1/ε₀ times the net "
"charge enclosed**: **∮E·dA = q_enc/ε₀**. The surface (Gaussian surface) is imaginary; the flux "
"counts field lines crossing it, and charges outside contribute zero net flux. "
"**Infinite plane sheet of charge (surface density σ):** choose a **cylindrical Gaussian surface** "
"(a 'pillbox') piercing the sheet, with flat caps of area A parallel to the sheet. "
"**(1) Symmetry:** the field must be perpendicular to the sheet and equal on both sides. "
"**(2) Flux:** through the curved side, E is parallel to the surface ⟹ zero flux; through each "
"flat cap, E is perpendicular ⟹ flux EA each ⟹ total flux = 2EA. "
"**(3) Enclosed charge:** q = σA. "
"**(4) Gauss:** 2EA = σA/ε₀ ⟹ **E = σ/2ε₀**, directed away from a positive sheet (toward a "
"negative one), on both sides. "
"**Deep point:** the field is uniform — independent of distance from the sheet — because the "
"sheet is infinite; the pillbox's two caps are why the answer carries the factor 2."),
1: ("**Formula:** E = kq/r² = (1/4πε₀) q/r². "
"**Substitute:** k = 9 × 10⁹; q = 4 μC = 4 × 10⁻⁶ C; r = 2 m. "
"E = (9 × 10⁹ × 4 × 10⁻⁶)/4 = (3.6 × 10⁴)/4 = **9 × 10³ N/C = 9000 N/C**, directed radially away "
"from the positive charge. "
"**Deep point:** the inverse-square is why field falls fast — double the distance, quarter the "
"field; and 'N/C' and 'V/m' are the same unit in two costumes.")}

A['electric-field/02-neb-2020.json'] = {0: (
"**Setup:** two equal +2 μC charges 10 cm apart; the midpoint is 5 cm = 0.05 m from each. "
"**Each charge's field at the midpoint:** E = kq/r² = (9 × 10⁹ × 2 × 10⁻⁶)/(0.05)² "
"= (1.8 × 10⁴)/2.5 × 10⁻³ = 7.2 × 10⁶ N/C, directed **away** from each charge. "
"**Superposition:** at the midpoint the two fields point in **opposite directions** (each field "
"pushes away from its own charge — the left charge's field points right, the right charge's field "
"points left). Being **equal in magnitude** (equal charges, equal distances), they **cancel**: "
"**E_mid = 0**. "
"**Deep point:** symmetry is the solver — equal like charges always cancel at the midpoint; the "
"fields add only off-centre, and between *unlike* equal charges they would add instead.")}

A['electric-field/03-neb-2024.json'] = {
0: ("**Gauss's law:** ∮E·dA = q_enc/ε₀ — total flux through a closed surface equals the enclosed "
"charge divided by ε₀. **Infinite plane sheet (σ):** pillbox Gaussian surface with caps of area A "
"parallel to the sheet; flux = 2EA (two caps; zero through the curved side); enclosed charge σA; "
"2EA = σA/ε₀ ⟹ **E = σ/2ε₀** on each side, perpendicular to the sheet, uniform with distance. "
"**Deep point:** the factor 2 comes from the two caps, and the distance-independence from the "
"infinite symmetry — both are examinable."),
1: ("**E = kq/r²** = (9 × 10⁹ × 6 × 10⁻⁶)/(0.3)² = (5.4 × 10⁴)/0.09 = **6 × 10⁵ N/C**, radially "
"outward from the positive charge. "
"**Deep point:** (0.3)² = 0.09 — the squared-distance slip is the only hazard in an otherwise "
"one-line substitution."),
2: ("**Properties of electric field lines:** (1) they originate on **positive charges and terminate "
"on negative charges** (or at infinity); (2) **two lines never cross** (the field has a unique "
"direction at every point); (3) the **density of lines is proportional to the field strength** "
"(crowded lines = strong field); (4) lines are **perpendicular to conductor surfaces** in "
"electrostatic equilibrium and never form closed loops (electrostatic field is conservative); "
"(5) a tangent to a line at any point gives the field's direction there. **Deep point:** "
"'never cross' is the property with a reason — crossing would mean two directions for E at one "
"point, which is impossible."),
3: ("**Gauss's law:** ∮E·dA = q_enc/ε₀. "
"**Outside (r > R):** choose a **concentric spherical Gaussian surface** of radius r. By symmetry "
"E is radial and constant on the surface ⟹ flux = E × 4πr². Enclosed charge = Q. "
"E × 4πr² = Q/ε₀ ⟹ **E = Q/(4πε₀r²) = kQ/r²** — the shell acts as if all its charge were "
"concentrated at its centre. "
"**Inside (r < R):** the Gaussian sphere of radius r encloses **no charge** (all charge lies on "
"the shell at radius R) ⟹ flux = 0 ⟹ **E = 0 everywhere inside**. "
"**(On the surface, r = R: E = kQ/R².**)** "
"**Deep point:** the inside result is the shell theorem's electric half — a hollow charged sphere "
"exerts no field on its own interior, the same geometry that makes the outside field look "
"point-like."),
4: ("**Dipole moment:** p = q × (separation) — the product of either charge and the vector distance "
"from −q to +q, directed along the axis from negative to positive. "
"**p = 4 × 10⁻⁶ C × 0.2 m = 8 × 10⁻⁷ C·m**. "
"**Field on the axis at distance x = 0.5 m from the centre:** "
"E_axial = (1/4πε₀) × 2p/x³ (for x ≫ separation) = (9 × 10⁹ × 2 × 8 × 10⁻⁷)/(0.5)³ "
"= (1.44 × 10⁴)/0.125 = **1.152 × 10⁵ N/C ≈ 1.15 × 10⁵ N/C**, directed along the dipole axis "
"(from −q toward +q, pointing away from the dipole on this side). "
"**Deep point:** the axial field falls as 1/x³ — one power faster than a point charge, the "
"signature of a dipole's two cancelling monopoles."),
5: ("**Because of electrostatic induction and Gauss's law:** in equilibrium the conduction electrons "
"redistribute until the field they create inside exactly cancels the applied field — any residual "
"field would drive further current (electron flow), and 'equilibrium' means no current flows. "
"Formally: choose a Gaussian surface just inside the conductor; the field is zero everywhere on "
"it (else charges would move), so the enclosed charge is zero — excess charge resides on the "
"**surface**, and the interior is field-free. **Deep point:** zero internal field is not an "
"assumption but the definition of electrostatic equilibrium — 'no moving charges' *means* 'no "
"field to move them'.")}

def main():
    for key, ans in A.items():
        f = 'content/practice/questions/class-11/physics/' + key
        d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
        qs = d if isinstance(d, list) else d.get('questions', [])
        for i, text in ans.items():
            assert i < len(qs), (key, i)
            assert not (qs[i].get('answer') or '').strip(), (key, i)
            qs[i]['answer'] = text
        assert all((q.get('answer') or '').strip() for q in qs), key
        open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        print('filled', key, f'({len(ans)} answers, {len(qs)} questions)')

main()

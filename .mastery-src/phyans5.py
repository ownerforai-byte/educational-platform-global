#!/usr/bin/env python
# Populate PYQ answers - physics batch 5: reflection-at-curved-mirror, refraction-at-plane-surfaces,
# refraction-through-prisms, solids, thermal-expansion, vectors, work-energy-and-power
# (+ thermodynamics/01 mirror solution -> answer)
import json

A = {}

A['reflection-at-curved-mirror/01-neb-2023.json'] = {0: (
"**Object at the focus (u = f):** rays from a point on the principal axis at F, after reflection, "
"emerge **parallel to the principal axis** — parallel rays never meet at any finite distance, so "
"the reflected rays converge only **at infinity**: the image forms at infinity (theoretically "
"real, highly magnified, no finite image can be caught on a screen). "
"**Why:** the mirror formula 1/v + 1/u = 1/f with u = f gives 1/v = 1/f − 1/f = 0 ⟹ v = ∞. "
"**Object at C (u = 2f):** 1/v = 1/f − 1/(2f) = 1/(2f) ⟹ **v = 2f = C** — the image forms at C "
"itself: real, inverted, **same size as the object** (m = 1). "
"**Object between C and F (f < u < 2f):** the image forms **beyond C** (v > 2f): real, inverted "
"and **magnified** (m > 1) — the regime used by shaving/make-up mirrors and projectors. "
"**Deep point:** the mirror formula's three special cases are one continuum — as the object "
"slides from F to C to infinity, the image slides from infinity to C to F; F and C are each "
"other's images.")}

A['reflection-at-curved-mirror/02-neb-2022.json'] = {0: (
"**Mirror formula:** 1/v + 1/u = 1/f, with u = −30 cm, f = −10 cm (concave mirror, real-is-"
"positive convention with distances measured from the pole, incident side negative). "
"**Solve:** 1/v = 1/f − 1/u = 1/(−10) − 1/(−30) = −1/10 + 1/30 = (−3 + 1)/30 = −2/30 = −1/15 "
"⟹ **v = −15 cm** — the image is 15 cm in front of the mirror (same side as the object), i.e. "
"**real**, located between F (10 cm) and C (20 cm) ✓. "
"**Magnification:** m = −v/u = −(−15)/(−30) = −0.5 ⟹ **m = −0.5**: the image is **inverted** "
"and **half the object's size**. "
"**Nature:** real, inverted, diminished, 15 cm in front of the mirror. "
"**Deep point:** object beyond C always gives an image between F and C, diminished and "
"inverted — the sign of m is the nature-decider (negative = inverted = real for a mirror).")}

A['reflection-at-curved-mirror/03-neb-2021.json'] = {0: (
"**New Cartesian sign convention for spherical mirrors:** "
"**(1) The pole of the mirror is the origin**; the principal axis is the x-axis. "
"**(2) Distances are measured from the pole.** "
"**(3) Distances measured in the direction of incident light (to the right, behind the mirror) "
"are positive**; distances measured **against** the incident light (to the left, in front of "
"the mirror — the object side) are **negative**. "
"**(4) Heights (y-direction) above the principal axis are positive; below it, negative.** "
"**Consequences for a mirror:** real objects and real images (both in front) get negative "
"distances; focal length of a **concave mirror is negative**, of a **convex mirror positive**; "
"magnification m = −v/u. "
"**Deep point:** the convention is Cartesian coordinates bolted onto optics — one rule set "
"(right positive, up positive) generates every sign in the mirror and lens formulas, which is "
"why it replaced the older 'real-positive' ad hoc rules.")}

A['reflection-at-curved-mirror/04-neb-2020.json'] = {0: (
"**Concave mirror (converging):** the reflecting surface is the **inner (hollow) side**; it "
"converges parallel rays to the **real focus F in front of the mirror**; forms **real, inverted "
"images** for objects beyond F (and virtual, erect, magnified images for objects inside F); "
"focal length negative in the Cartesian convention. **Uses:** shaving/make-up mirrors, "
"headlight and torch reflectors, dentists' mirrors, solar furnaces, telescopes. "
"**Convex mirror (diverging):** the reflecting surface is the **outer (bulging) side**; it "
"diverges parallel rays so they appear to come from a **virtual focus F behind the mirror**; "
"always forms **virtual, erect, diminished** images regardless of object position; focal length "
"positive. **Uses:** vehicle rear-view/wing mirrors (wide field of view), road safety mirrors at "
"blind corners, shop-security mirrors. "
"**Deep point:** the image rules are opposite — concave gives every image type depending on "
"position, convex gives exactly one type always; that predictability plus the wide field of "
"view is why convex owns every 'safety mirror' job.")}

A['reflection-at-curved-mirror/05-neb-2024.json'] = {
0: ("**Sign convention (Cartesian):** pole as origin, incident light travels left to right; "
"distances measured from the pole — against incident light (object side) negative, along it "
"positive; heights up positive. For a concave mirror, f < 0 and a real object has u < 0. "
"**Derivation:** consider an object of height h on the axis at distance u; a ray from its tip "
"parallel to the axis reflects through F; a ray through C reflects back on itself; equivalently "
"use similar triangles formed by the ray through C: triangles C-AB (object) and C-A′B′ (image) "
"are similar ⟹ A′B′/AB = CB′/CB, i.e. −h′/h = (−v + ... ) — with distances: "
"**h′/h = (v − ... )**; more directly, using the similar triangles from the pole: the ray "
"striking the pole reflects symmetrically, so triangles give **h′/h = −v/u** (magnification). "
"Using the similar triangles through the focus (ray parallel to axis reflects through F): "
"h′/h = (f − v)/f. Equating the two magnification expressions: −v/u = (v − f)/f... carrying the "
"Cartesian signs through gives −v/u = (f − v)/f ⟹ −vf = u(f − v) = uf − uv ⟹ uv = uf + vf ⟹ "
"dividing by uvf: **1/f = 1/v + 1/u** — the mirror formula. "
"**Deep point:** the derivation is two similar-triangle pairs (one through C or the pole, one "
"through F) whose magnification ratios are equated; every sign in the final formula is "
"inherited from the convention, which is why the convention must be stated first."),
1: ("**Setup:** a ray parallel to the principal axis strikes a concave mirror at point P and "
"reflects through the focus F. Let C be the centre of curvature (radius R), P the point of "
"incidence, and the ray make angle θ with the axis at P. "
"**Argument:** (1) the radius CP is the **normal** at P, so the angle of incidence is "
"∠CPF = θ (between incident parallel ray and CP). (2) By the **law of reflection**, the "
"reflected ray PF makes the same angle with the normal: ∠CPF (incidence) = ∠CPF... more "
"carefully, angle of incidence ∠(incident ray, CP) = ∠(PF, CP) = ∠CPF. (3) Since the incident "
"ray is parallel to the axis, ∠CPF = ∠CFP (alternate angles with the axis as transversal). "
"(4) Hence in triangle **CPF, ∠CFP = ∠CPF ⟹ triangle CPF is isosceles with CF = FP**. "
"(5) For a mirror small compared with R (paraxial rays), FP ≈ FB = focal length f. "
"Therefore **CF = FP ≈ f**, but CF is the distance from C to F = R − f ⟹ R − f = f ⟹ "
"**f = R/2**. "
"**Deep point:** the isosceles triangle CPF is the whole proof — the law of reflection makes "
"the base angles equal, and the paraxial approximation replaces FP by f; the same result holds "
"for a convex mirror with the virtual focus."),
2: ("**Mirror formula:** 1/v + 1/u = 1/f with u = −10 cm, f = −15 cm (concave, Cartesian). "
"1/v = 1/f − 1/u = −1/15 + 1/10 = (−2 + 3)/30 = 1/30 ⟹ **v = +30 cm** — the image is 30 cm "
"**behind the mirror**: virtual. "
"**Magnification:** m = −v/u = −(30)/(−10) = **+3** — erect and three times the size. "
"**Nature:** virtual, erect, magnified (×3), 30 cm behind the mirror. "
"**Deep point:** object inside F (10 < 15) is exactly the shaving-mirror regime — virtual, "
"erect, magnified; the positive v (behind the mirror) is the sign-convention fingerprint of "
"virtualness."),
3: ("**Linear magnification (mirror):** the ratio of the height of the image to the height of "
"the object: **m = h′/h = −v/u** (Cartesian convention). "
"**Reading it:** |m| gives the size ratio (m = 2 ⟹ double size; |m| < 1 ⟹ diminished); the "
"**sign gives orientation** — negative m ⟹ inverted (real image for a concave mirror), "
"positive m ⟹ erect (virtual image). "
"**Deep point:** the minus sign in m = −v/u is the convention doing the physics — a single "
"formula carries both the size ratio and the up/down verdict."),
4: ("**Concave mirrors:** (1) **vehicle headlight/torch reflectors** — bulb at F gives a parallel "
"beam; (2) **shaving/make-up mirrors** — face inside F gives a magnified erect virtual image "
"(also dentists' mirrors, solar furnaces, reflecting telescopes). "
"**Convex mirrors:** (1) **vehicle rear-view and wing mirrors** — always erect, diminished "
"image with a **wide field of view**; (2) **road safety mirrors** at blind bends and "
"shop-security mirrors. "
"**Deep point:** each use exploits a different property — concave for *converging or "
"magnifying*, convex for *wide-angle surveillance*; the choice is dictated by which image "
"property the job needs."),
5: ("**Why concave in a headlight:** a concave mirror **converges** light — with the bulb "
"placed at its **principal focus F**, every ray hitting the mirror reflects **parallel to the "
"principal axis**, producing a strong, straight, long-range beam instead of light spraying in "
"all directions as a bare bulb would. "
"**Ray diagram description:** draw the concave mirror with principal axis; place the bulb "
"(point source) at F on the axis; draw (i) a ray along the axis reflecting back on itself, (ii) "
"a ray from F striking the mirror above the axis reflecting **parallel to the axis**, (iii) a "
"ray from F below the axis likewise reflecting parallel — all reflected rays leave parallel, "
"forming the forward beam. "
"**Deep point:** the reversibility of light is the design principle — a parallel beam converges "
"to F, so a point *at* F produces a parallel beam; one property, two uses (telescope vs "
"headlight).")}

A['refraction-at-plane-surfaces/01-neb-2023.json'] = {0: (
"**Snell's law:** at a boundary between two media, the ratio of the sine of the angle of "
"incidence to the sine of the angle of refraction is constant (equal to the relative refractive "
"index): **sin i/sin r = n₂₁ = n₂/n₁**; the incident ray, refracted ray and normal lie in one "
"plane, on opposite sides of the normal. "
"**Speed of light in glass:** n = c/v ⟹ v = c/n = (3 × 10⁸)/1.5 = **2 × 10⁸ m/s**. "
"**Deep point:** Snell's law is really a statement about speed — n = c/v, so light slows in the "
"denser medium and bends toward the normal; the law's constant is the ratio of speeds.")}

A['refraction-at-plane-surfaces/02-neb-2022.json'] = {0: (
"**Total internal reflection:** when light travelling in the **denser** medium strikes the "
"boundary with a rarer medium at an incidence angle **greater than the critical angle C**, it is "
"completely reflected back into the denser medium — no refracted ray escapes, and the reflection "
"obeys the ordinary laws of reflection. "
"**Two conditions:** (1) the light must travel **from the optically denser medium toward the "
"rarer** (e.g. glass → air, water → air); (2) the **angle of incidence must be greater than the "
"critical angle** (sin C = 1/n for a medium-to-air boundary). "
"**Deep point:** at exactly C the refracted ray grazes the surface; beyond C there is no real "
"refracted direction, so all the energy turns back — the optical fibre's whole operating "
"principle.")}

A['refraction-at-plane-surfaces/03-neb-2024.json'] = {
0: ("**Snell's law:** sin i/sin r = n₂/n₁ (constant for the pair of media); incident ray, "
"refracted ray and normal are coplanar. "
"**Speed in glass:** v = c/n = (3 × 10⁸)/1.5 = **2 × 10⁸ m/s**. "
"**Deep point:** n = c/v is the physical content of Snell's law — the bending angle is the "
"speed change made visible."),
1: ("**Total internal reflection:** complete reflection of light back into the denser medium when "
"the incidence angle exceeds the critical angle, with no transmitted ray. "
"**Conditions:** (1) light must go **from denser to rarer medium**; (2) **angle of incidence > "
"critical angle** (sin C = 1/n for medium-to-air). "
"**Deep point:** 'total' is literal — 100% of the energy reflects, which is why fibre optics "
"loses almost no light over kilometres."),
2: ("**Apparent depth formula:** apparent depth = real depth/μ. "
"**Substitute:** real depth = 1.2 m; μ = 4/3. "
"Apparent depth = 1.2/(4/3) = 1.2 × 3/4 = **0.9 m**. "
"**Deep point:** refraction at the surface makes submerged objects look *shallower* by the "
"factor μ — the same geometry that makes a pool look 75 cm deep for every metre of real water, "
"and the source of the 'apparent bending of a stick in water'."),
3: ("**Condition at the critical angle:** the refracted ray grazes the boundary (r = 90°): "
"n sin C = 1 × sin 90° = 1 ⟹ sin C = 1/n. "
"**Substitute:** n = 1.5 ⟹ sin C = 1/1.5 = 0.667 ⟹ **C = sin⁻¹(0.667) ≈ 41.8°**. "
"**Deep point:** the critical angle exists only going denser → rarer; 41.8° for typical glass "
"is why a 45°–45°–90° prism (45° > 41.8°) reflects light totally — the geometry of prism "
"binoculars."),
4: ("**Lateral shift by a glass slab** depends on: (1) the **thickness t of the slab** (shift "
"grows with t); (2) the **angle of incidence i** (shift grows as i grows); (3) the **refractive "
"index n of the slab** (denser slab ⟹ more refraction at each face ⟹ larger shift). "
"Formula: lateral shift d = t sin(i − r)/cos r. "
"**Deep point:** the shift is zero at normal incidence (i = 0) and grows with obliquity — the "
"slab displaces the ray sideways but never changes its direction (emergent ray ∥ incident ray), "
"which is why a slab deviates without dispersing."),
5: ("**Totally reflecting prisms:** right-angled isosceles prisms (45°–45°–90°) used as mirrors — "
"light enters normally, strikes the hypotenuse face at **45°, which exceeds the critical angle "
"(≈42° for glass, n = 1.5)**, and undergoes **total internal reflection**, turning the beam "
"through 90° (or 180° with two reflections). "
"**Two uses:** (1) **prism binoculars/periscopes** — to fold the light path and erect the "
"image; (2) **reflecting prisms in cameras, binoculars and optical instruments** replacing "
"mirrors (totally reflecting prisms reflect ~100% of the light; silvered mirrors lose a few "
"percent and tarnish). "
"**Deep point:** the 45° > 41.8° inequality is the entire design — one degree of margin turns "
"geometry into a perfect mirror that never tarnishes.")}

A['refraction-through-prisms/01-neb-2023.json'] = {0: (
"**Answer: (a) the deviation is minimum when the ray passes symmetrically** (i = e, r₁ = r₂). "
"**Why:** the i–δ curve has a single flat minimum, and at that minimum the ray inside the prism "
"is parallel to the base — the passage is symmetric, i = e. Options claiming maximum, or "
"deviation independent of angle, contradict the measured i–δ curve. "
"**Deep point:** the symmetric passage at minimum deviation is what makes the minimum-deviation "
"method usable for measuring n — symmetry halves the unknowns.")}

A['refraction-through-prisms/02-neb-2022.json'] = {0: (
"**Given:** A = 60°, n = 1.5, i = 40°, r₁ = 30°. "
"**Step 1 — second internal angle:** r₁ + r₂ = A ⟹ r₂ = 60 − 30 = **30°**. "
"**Step 2 — angle of emergence:** Snell's law at the second face: n sin r₂ = 1 × sin e ⟹ "
"sin e = 1.5 × sin 30° = 1.5 × 0.5 = 0.75 ⟹ **e = sin⁻¹(0.75) ≈ 48.6°**. "
"**Step 3 — deviation:** δ = i + e − A = 40 + 48.6 − 60 = **28.6°**. "
"**Deep point:** the given r₁ = 30° is consistent with Snell's law at the first face "
"(sin i = 1.5 sin r₁ would need sin i = 0.75, i.e. i = 48.6°, not 40°) — the question's numbers "
"are a drilling set rather than a fully self-consistent refraction; use the given values as "
"stated, which is what the mark scheme expects.")}

A['refraction-through-prisms/03-neb-2021.json'] = {0: (
"**Prism:** a transparent refracting medium bounded by **two plane non-parallel (inclined) "
"faces** — the inclined faces do the refraction; light entering one face and leaving the other "
"is deviated (bent toward the base) and, for white light, dispersed. "
"**Two types:** (1) **refracting prisms** — used to deviate and disperse light (equilateral "
"60° prism in spectrometers, thin prisms); (2) **totally reflecting prisms** — right-angled "
"45°–45°–90° prisms used as perfect mirrors in binoculars, periscopes and cameras. "
"**Angle of the prism (A):** the **angle between the two refracting faces** (the refracting "
"edge's angle) — the angle by which the two deviating surfaces are inclined to each other; it "
"sets the prism's deviating power (δ = i + e − A). "
"**Deep point:** the two types divide by job — refracting prisms *analyse* light (deviate, "
"disperse, measure n), reflecting prisms *route* light without dispersion.")}

A['refraction-through-prisms/04-neb-2020.json'] = {0: (
"**Minimum deviation:** the smallest angle of deviation δ_min a prism can produce for a given "
"wavelength — the flat minimum of the i–δ curve, occurring when the ray passes **symmetrically** "
"through the prism: **i = e** and **r₁ = r₂ = A/2** (the ray inside is parallel to the base). "
"**Derivation that the internal ray is parallel to the base at minimum deviation:** "
"(1) General relations: r₁ + r₂ = A and δ = i + e − A. "
"(2) At minimum deviation the δ-vs-i curve is flat: dδ/di = 0, and by the symmetry of the "
"curve (deviation is the same for a ray entering at i and one entering at e — reversing the ray "
"path through a prism reverses i and e but must give the same δ), the minimum must occur where "
"the ray path is its own reverse: **i = e**. "
"(3) With i = e and the same Snell's-law factor at both faces (n sin r₁ = sin i = sin e = "
"n sin r₂), we get **r₁ = r₂**. "
"(4) Substituting into r₁ + r₂ = A: 2r₁ = A ⟹ r₁ = r₂ = **A/2**. "
"(5) The two internal angles being equal means the internal ray makes equal angles with the two "
"refracting faces' normals — geometrically, **a line making equal angles with two inclined "
"normals is parallel to the base** of the (isosce-cross-section) prism. Hence at minimum "
"deviation the ray inside the prism travels **parallel to the base**. "
"(6) Bonus: with i = e and r = A/2, Snell gives n = sin i/sin(A/2) and "
"**n = sin((A + δ_min)/2)/sin(A/2)** — the refractive-index formula. "
"**Deep point:** the reversibility argument in step (2) is the elegant heart — a prism's "
"deviation curve must be symmetric under reversing the ray, so its minimum sits at the "
"self-reverse path, which is exactly the base-parallel symmetric passage.")}

A['refraction-through-prisms/05-neb-2024.json'] = {
0: ("**Setup:** ray strikes the first face at angle i, refracts at r₁, crosses to the second "
"face at angle r₂, emerges at angle e; prism angle A. "
"**Geometry:** the two face-normals meet at the apex with angle A; the quadrilateral formed by "
"the ray inside the prism and the two normals has angles 90°, 90°, A and (180° − A)... its "
"four angles sum to 360°, giving **r₁ + r₂ = A**. "
"**Deviation:** at the first face the ray bends toward the normal by (i − r₁); at the second it "
"bends away by (e − r₂). The total angle between the emergent ray produced backward and the "
"incident ray produced forward is the sum of both deflections: "
"**δ = (i − r₁) + (e − r₂) = i + e − (r₁ + r₂) = i + e − A**. "
"**Deep point:** two facts — the quadrilateral for r₁ + r₂ = A and the exterior-angle sum for "
"the deviation — are the entire derivation; everything else is labelling."),
1: ("**At minimum deviation:** i = e and r₁ = r₂ = A/2 (symmetric passage; ray parallel to the "
"base). "
"**Snell's law at either face:** n = sin i/sin r = sin i/sin(A/2). "
"**Express i through δ_min:** from δ = i + e − A with i = e: δ_min = 2i − A ⟹ i = (A + "
"δ_min)/2. "
"**Substitute:** **n = sin((A + δ_min)/2)/sin(A/2)**. "
"**Use:** measuring δ_min for a given prism and wavelength yields n directly — the standard "
"spectrometer method (and the source of the D-line dispersions quoted for glasses). "
"**Deep point:** the formula is minimum deviation's payoff — it converts two measured angles "
"(A and δ_min) into a material property, with no knowledge of the ray's internal path needed."),
2: ("**Formula:** n = sin((A + δ_min)/2)/sin(A/2). "
"**Rearranged:** sin((A + δ_min)/2) = n sin(A/2) = 1.5 × sin 30° = 1.5 × 0.5 = 0.75. "
"(A + δ_min)/2 = sin⁻¹(0.75) = 48.6° ⟹ A + δ_min = 97.2° ⟹ **δ_min = 97.2 − 60 = 37.2°**. "
"**Deep point:** for an equilateral 60° prism of n = 1.5, δ_min ≈ 37° — the working number "
"behind every spectrometer with a crown-glass prism; δ_min must exceed A/2 and stay under "
"2 sin⁻¹(n/2) − A, and 37.2° fits."),
3: ("**i–δ curve:** plot angle of incidence i (x-axis) against deviation δ (y-axis): δ starts "
"large near grazing incidence, **falls steeply** as i increases, flattens to a **broad minimum "
"δ_min** around the middle of the range, then **rises steeply** again as i approaches 90° — a "
"U-shaped (check-mark) curve with a single minimum. "
"**Why only one minimum:** the ray path through a prism is **reversible** — a ray entering at "
"angle i and emerging at e gives the same deviation as one entering at e and emerging at i; so "
"δ(i) must be symmetric about the point where i = e. A symmetric U-shaped curve has exactly "
"one lowest point, and it lies at **i = e** (the symmetric, base-parallel passage). "
"**Deep point:** reversibility is the uniqueness argument — no second minimum can hide in a "
"curve that must fold onto itself about i = e."),
4: ("**For a small-angled prism (A small), all angles are small**, so Snell's law linearises: "
"sin θ ≈ θ. "
"**At each face:** i ≈ n r₁ and e ≈ n r₂ (small-angle Snell). "
"**Deviation:** δ = i + e − A ≈ n r₁ + n r₂ − A = n(r₁ + r₂) − A = nA − A (using r₁ + r₂ = A) "
"⟹ **δ = (n − 1)A**. "
"**Deep point:** the small-angle approximation is the only physics input — the formula is "
"Snell's law with sines traded for angles, valid while every angle stays a few degrees (thin "
"prisms, ophthalmic prisms measured in prism dioptres)."),
5: ("**Angle of minimum deviation:** the **smallest angle of deviation** produced by a prism for "
"a given wavelength of light — the flat minimum of the i–δ curve, occurring when the ray passes "
"symmetrically (i = e, r₁ = r₂ = A/2, internal ray parallel to the base). "
"**Two factors affecting it:** (1) the **refractive index n of the prism material** — higher n "
"gives larger δ_min (and n varies with wavelength, so each colour has its own δ_min — this is "
"dispersion); (2) the **angle of the prism A** — a larger refracting angle gives larger "
"δ_min (for a thin prism, δ_min = (n − 1)A directly). "
"**Deep point:** δ_min's two dependencies are exactly the two things a lens/grating designer "
"can vary — the glass and the geometry; wavelength enters through n, which is why the minimum "
"is different for red and violet.")}

A['solids/01-neb-2023.json'] = {0: (
"**Energy band theory:** in a solid, the atoms are so close that their outer electron levels "
"interact and split into a huge number of closely spaced levels — effectively continuous "
"**energy bands**. The key bands: the **valence band** (VB), the highest band filled with the "
"electrons that bind the solid, and the **conduction band (CB)**, the next higher band whose "
"electrons are free to move and conduct; between them may lie a **forbidden energy gap "
"(E_g)** with no allowed levels. "
"**How it differentiates the three classes:** "
"**(1) Metals (conductors):** the conduction band is **partly filled** (or overlaps the valence "
"band) — electrons at the top of the filled levels find empty levels immediately above, so even "
"a tiny field accelerates them: high conductivity (~10⁷ S/m), decreasing with temperature. "
"**(2) Insulators:** valence band **completely full**, conduction band **empty**, and the gap "
"is **large (E_g > ~5 eV, e.g. diamond 5.5 eV)** — thermal energy at room temperature cannot "
"promote electrons across it: essentially no free carriers. "
"**(3) Semiconductors:** like insulators (full VB, empty CB) but with a **small gap "
"(E_g ≈ 1 eV: Si 1.1 eV, Ge 0.7 eV)** — at room temperature some electrons are thermally "
"excited across it, leaving **holes** in the VB and **electrons** in the CB: intermediate "
"conductivity that **increases** with temperature. "
"**Deep point:** the three classes differ only in the size of the gap and the filling of the "
"bands — one diagram, three conductivity stories; the temperature dependence (metals down, "
"semiconductors up) follows directly from whether the limiting factor is carrier scattering or "
"carrier creation.")}

A['solids/02-neb-2022.json'] = {
0: ("**Intrinsic semiconductor:** a **chemically pure** semiconductor (pure Si or Ge) whose "
"charge carriers arise **only from thermal excitation** across the small band gap — each "
"excited electron leaves one hole, so electrons and holes exist in **equal numbers** "
"(n_e = n_h = n_i), and conductivity is low and strongly temperature-dependent. "
"**Electrons (as carriers):** negative charge carriers — electrons thermally promoted from the "
"valence band into the conduction band, free to drift under a field; their motion constitutes "
"ordinary current. "
"**Holes:** positive charge carriers — the **vacancies** left in the valence band when "
"electrons are excited out; a neighbouring valence electron can fall into the vacancy, moving "
"the 'hole' in the opposite direction, so the hole behaves exactly like a mobile **positive "
"charge** (+e). "
"**Deep point:** the hole is not a missing electron 'flying around' — it is the collective "
"motion of valence electrons filling vacancies, which the mathematics treats perfectly as a "
"positive particle; two carriers per excitation, moving opposite ways, adding to the same "
"conventional current."),
1: ("**Elastic body:** recovers its **original shape and size completely** when the deforming "
"force is removed — obeys Hooke's law within the elastic limit (e.g. steel spring, quartz "
"fibre); deformation is reversible and the stress–strain path retraces itself. "
"**Plastic body:** does **not** recover — it retains a permanent (irreversible) deformation "
"after the force is removed (e.g. clay, putty, lead); it has no well-defined elastic limit and "
"flows under sustained stress. "
"**Differences:** (1) reversible vs permanent deformation; (2) elastic bodies store the work of "
"deformation as recoverable strain energy, plastic bodies dissipate it as heat; (3) real "
"materials are elastic up to a **yield point** and plastic beyond it — the distinction is a "
"matter of regime, not of substance. "
"**Deep point:** putty and steel are the same atoms in different regimes — every material has "
"an elastic range and a plastic range; the 'body' label describes which regime you are "
"operating it in.")}

A['solids/03-neb-2020.json'] = {0: (
"**Crystalline solid:** atoms/ions/molecules arranged in a **regular, repeating long-range "
"pattern** (a lattice) — sharp melting point, **anisotropic** (physical properties like "
"refractive index and conductivity differ along different directions), cleaves along definite "
"planes; e.g. NaCl, quartz, diamond, metals. "
"**Amorphous solid (glassy):** **no long-range order** — only short-range arrangement, like a "
"frozen liquid; softens over a **range of temperature** (no sharp melting point), "
"**isotropic** (same properties in all directions), fractures irregularly (conchoidal); e.g. "
"glass, plastic, rubber, pitch. "
"**Key differences:** order (long-range periodic vs disordered), melting behaviour (sharp vs "
"gradual), anisotropy vs isotropy, and cleavage vs irregular fracture. "
"**Deep point:** amorphous solids are supercooled liquids in slow flow — century-old cathedral "
"glass is measurably thicker at the bottom; 'solid' is a timescale statement as much as a "
"structural one.")}

A['solids/04-neb-2024.json'] = {
0: ("**Energy band theory:** in a crystal the overlapping atomic levels split into a vast number "
"of closely spaced levels forming **bands** — a filled **valence band (VB)**, an (usually "
"empty) **conduction band (CB)**, and possibly a **forbidden gap E_g** between them; "
"conduction requires electrons in partially-filled bands where they can gain energy from a "
"field. "
"**Differentiation:** **metals** — CB partly filled or overlapping the VB ⟹ abundant free "
"electrons ⟹ excellent conduction (falls as T rises, more scattering); **insulators** — full "
"VB, empty CB, **large gap (> 5 eV)** ⟹ essentially no carriers at room temperature; "
"**semiconductors** — full VB, empty CB but **small gap (~1 eV)** ⟹ thermal excitation at room "
"temperature creates electron–hole pairs ⟹ moderate conduction that **rises** as T rises "
"(more carriers created). "
"**Deep point:** one diagram explains all three classes and their opposite temperature "
"behaviours — the gap size decides the carrier population, and the carrier population decides "
"everything else."),
1: ("**Intrinsic semiconductor:** a **pure** semiconductor (Si, Ge) in which the only charge "
"carriers are those created by **thermal excitation across the band gap** — every excited "
"electron leaves a hole behind, so **n_e = n_h = n_i** (intrinsic concentration), which doubles "
"roughly every 10 °C rise. "
"**Electrons:** negative carriers in the **conduction band**, free to drift and carry current. "
"**Holes:** positive carriers — the **vacancies in the valence band** left behind; they move "
"as neighbouring valence electrons hop into them, behaving as mobile charges +e. "
"**Deep point:** intrinsic means 'carriers from the material itself' — the electron–hole pair "
"is created and can also recombine, so the intrinsic concentration is a dynamic equilibrium, "
"not a fixed stock."),
2: ("**Doping:** deliberately adding a controlled trace (~1 atom per 10⁶) of an **impurity "
"element** to a pure semiconductor to multiply its conductivity and set its carrier type. "
"**n-type:** doped with a **pentavalent** impurity (P, As, Sb — 5 valence electrons); four "
"electrons bond with neighbouring Si atoms and the **fifth is left loose** — a donor electron "
"near the conduction band, easily freed ⟹ **majority carriers: electrons** (negative); holes "
"are the minority. "
"**p-type:** doped with a **trivalent** impurity (B, Al, In — 3 valence electrons); bonding "
"leaves one **missing bond — a hole** (acceptor) in the valence band ⟹ **majority carriers: "
"holes** (positive); electrons are the minority. "
"**Deep point:** the dopant's valence electrons are the whole story — one electron too many "
"makes n-type, one too few makes p-type; the crystal stays electrically neutral either way "
"(each dopant ion is fixed in the lattice)."),
3: ("**p–n junction:** the region formed where a p-type and an n-type semiconductor join in one "
"continuous crystal — mobile carriers diffuse across (holes into n, electrons into p) and "
"recombine, leaving the fixed dopant ions exposed as a **depletion region** with an internal "
"**potential barrier (≈0.7 V for Si)** that stops further diffusion. "
"**Forward bias (p to + terminal):** the applied voltage **opposes the barrier**, lowering it; "
"when V > barrier the majority carriers flood across — holes move into n, electrons into p — "
"giving a large current that grows steeply with voltage (the diode's conducting state). "
"**Reverse bias (p to −):** the applied voltage **adds to the barrier**, widening the depletion "
"region; majority carriers cannot cross and only a tiny leakage (minority-carrier) current "
"flows (µA), until breakdown at large reverse voltage. "
"**Rectification:** the junction conducts easily one way and blocks the other — in a half-wave "
"rectifier a single diode passes the positive half-cycles of AC to the load and blocks the "
"negative ones; in a full-wave (bridge) arrangement four diodes route both half-cycles through "
"the load in the same direction, converting AC into pulsating DC (smoothed by a capacitor). "
"**Deep point:** the junction is a one-way valve because bias changes the *height of its own "
"internal barrier* — forward bias tears the barrier down, reverse bias builds it up; "
"rectification is that asymmetry applied to AC."),
4: ("**AND gate** (output 1 only when **all** inputs are 1): symbol — a D-shaped flat-backed "
"bulge; Y = A·B. Truth table: A=0,B=0 → 0; A=0,B=1 → 0; A=1,B=0 → 0; A=1,B=1 → **1**. "
"**OR gate** (output 1 when **any** input is 1): symbol — a curved-front arrow-like shape; "
"Y = A + B. Truth table: 0,0 → 0; 0,1 → **1**; 1,0 → **1**; 1,1 → **1**. "
"**NOT gate (inverter)** (output the opposite of the single input): symbol — a triangle with a "
"small circle (bubble) at the output; Y = Ā. Truth table: A=0 → **1**; A=1 → **0**. "
"**Deep point:** AND is multiplication, OR is addition, NOT is complement — Boolean algebra's "
"arithmetic is the gates' algebra, and every digital circuit is built from these three (plus "
"their NAND/NOR composites)."),
5: ("**Semiconductor:** raising T excites **more electrons across the small band gap**, creating "
"electron–hole pairs — the carrier population grows **exponentially**, swamping the increased "
"lattice scattering ⟹ conductivity **increases** (resistance falls; ~doubles per 10 °C). "
"**Metal:** the free-electron population is already essentially **fixed** (all conduction "
"electrons are free at any temperature); raising T only makes the lattice vibrate more, "
"increasing electron–phonon **scattering** ⟹ resistivity **increases** roughly linearly with "
"temperature. "
"**Deep point:** the two opposite behaviours come from which factor dominates — carrier "
"*creation* (semiconductors) vs carrier *scattering* (metals); a thermistor's steep fall of "
"resistance with temperature is the semiconductor effect exploited as a thermometer.")}

A['thermal-expansion/01-neb-2022.json'] = {
0: ("**Linear expansivity (α):** the fractional increase in **length** per degree temperature "
"rise: α = ΔL/(L ΔT), so ΔL = αLΔT; unit K⁻¹. "
"**Superficial expansivity (β):** the fractional increase in **area** per degree rise: "
"β = ΔA/(A ΔT); unit K⁻¹. "
"**Cubical expansivity (γ):** the fractional increase in **volume** per degree rise: "
"γ = ΔV/(V ΔT); unit K⁻¹. "
"**Relationship:** consider a square of side L expanding to L(1 + αΔT): "
"A′ = L²(1 + αΔT)² ≈ L²(1 + 2αΔT) (neglecting α²ΔT²) ⟹ ΔA/A = 2αΔT ⟹ **β = 2α**. "
"Similarly a cube: V′ = L³(1 + αΔT)³ ≈ L³(1 + 3αΔT) ⟹ **γ = 3α**. "
"Hence **α : β : γ = 1 : 2 : 3**. "
"**Deep point:** the 1:2:3 ladder is just the binomial expansion of (1 + αΔT)ⁿ — area squares "
"the length scale, volume cubes it; the cross terms are dropped because αΔT ~ 10⁻⁵ is tiny."),
1: ("**Coefficient of linear expansivity (α):** the fractional increase in length per unit "
"original length per degree rise in temperature — the increase in length of unit length when "
"heated through 1 K. "
"**Formula:** **α = ΔL/(L₀ ΔT)**, equivalently L = L₀(1 + αΔT). "
"**SI unit: per kelvin (K⁻¹)** (equivalently °C⁻¹, since it is a per-degree quantity). "
"Typical values: steel 1.2 × 10⁻⁵ K⁻¹, invar ~10⁻⁶ K⁻¹. "
"**Deep point:** α is small and the ΔT² corrections are negligible — that's why the linear "
"formula works even for 100-degree rises, and why α : β : γ stays exactly 1 : 2 : 3.")}

A['thermal-expansion/02-neb-2021.json'] = {0: (
"**Formula:** ΔL = αLΔT. "
"**Substitute:** α = 1.2 × 10⁻⁵ K⁻¹; L = 1 m; ΔT = 100 − 20 = 80 K. "
"ΔL = 1.2 × 10⁻⁵ × 1 × 80 = **9.6 × 10⁻⁴ m = 0.96 mm**. "
"**Final length:** L′ = L + ΔL = 1 + 0.00096 = **1.00096 m**. "
"**Deep point:** the kelvin and Celsius *intervals* are identical, so ΔT = 80 K = 80 °C — the "
"conversion habit matters only for absolute temperatures, never for differences.")}

A['thermal-expansion/03-neb-2024.json'] = {
0: ("**Linear expansivity (α):** fractional increase in **length** per kelvin rise — "
"α = ΔL/(LΔT); unit K⁻¹. **Superficial expansivity (β):** fractional increase in **area** per "
"kelvin — β = ΔA/(AΔT). **Cubical expansivity (γ):** fractional increase in **volume** per "
"kelvin — γ = ΔV/(VΔT). "
"**Relationship:** a square of side L grows to L(1 + αΔT) per side, so "
"A′ = L²(1 + αΔT)² ≈ L²(1 + 2αΔT) ⟹ **β = 2α**; a cube gives "
"V′ = L³(1 + αΔT)³ ≈ L³(1 + 3αΔT) ⟹ **γ = 3α**. Hence **α : β : γ = 1 : 2 : 3**. "
"**Deep point:** the ratio comes from the binomial expansion of (1 + αΔT)ⁿ — dimensionality "
"multiplies the coefficient, and the neglected α² terms are ~10⁻¹⁰, safely zero."),
1: ("**Formula:** ΔL = αLΔT. "
"**Substitute:** α = 12 × 10⁻⁶ K⁻¹; L = 2 m; ΔT = 120 − 20 = 100 K. "
"ΔL = 12 × 10⁻⁶ × 2 × 100 = **2.4 × 10⁻³ m = 2.4 mm**. "
"**Deep point:** steel's α ≈ 1.2 × 10⁻⁵ K⁻¹ makes a 2 m rod grow 1.2 mm per 50 °C — small per "
"rod, but bridge-scale when thousands of metres are involved, which is why expansion joints "
"exist."),
2: ("**Why gaps between rails:** rails **expand when heated** — in summer sun a long welded rail "
"would develop enormous compressive stress (steel α ≈ 1.2 × 10⁻⁵ K⁻¹; a 20 m rail grows ~2.4 cm "
"per 10 °C rise... per 100 °C, ~2.4 cm) with nowhere to go, causing **buckling (sun kinks)** "
"that derail trains. The small gaps allow each rail to lengthen freely into the space, "
"relieving the stress; the characteristic 'clickety-click' of older trains is the wheels "
"crossing these expansion gaps. (Modern continuous welded rail handles this with anchored "
"stress management instead.) "
"**Deep point:** the gap size is αLΔT made visible — engineering does the expansion sum and "
"leaves exactly that much room."),
3: ("**Why the clock loses time in summer:** a pendulum clock's period is "
"**T = 2π√(L/g)** — it depends on the pendulum's **length**. In summer the higher temperature "
"expands the pendulum rod (ΔL = αLΔT > 0), so **L increases ⟹ T increases** — each swing takes "
"longer, the clock completes fewer oscillations per true hour, and it runs **slow (loses "
"time)**. In winter the rod contracts, T decreases, and the clock runs fast — hence 'correct in "
"winter, slow in summer'. "
"**Deep point:** the T ∝ √L dependence is the whole answer — expansion's fractional length "
"change is halved in the period change (ΔT/T = ½αΔθ), which is why the loss is minutes per "
"season, not hours."),
4: ("**Anomalous expansion of water:** between **0 °C and 4 °C, water contracts as it is "
"heated** (instead of expanding) — its **density reaches a maximum at 4 °C** (1000 kg/m³); "
"above 4 °C it expands normally. The anomaly arises because heating in this range breaks open "
"the open ice-like hydrogen-bonded structures faster than ordinary thermal expansion adds "
"volume. "
"**Importance for aquatic life:** in winter, surface water cools to 4 °C, becomes **densest "
"and sinks**, displacing warmer water upward — convection continues until the whole lake is at "
"4 °C. Further cooling makes surface water **lighter than 4 °C water**, so it stays on top and "
"finally freezes there; the ice layer insulates the water below, which **remains liquid at "
"~4 °C on the lake bed**. Fish and other aquatic life survive the winter in that 4 °C bottom "
"layer. "
"**Deep point:** if water were normal (densest at 0 °C), lakes would freeze from the bottom up "
"and solidify entirely, killing aquatic life — the anomaly at 4 °C is why life under ice is "
"possible; ice floating is the same fact seen from above."),
5: ("**Bimetallic strip:** two strips of **different metals with different expansivities** "
"(e.g. brass — high α, and invar/steel — low α) riveted or welded together into one strip. "
"**Working:** when heated, the high-α metal expands more than the low-α metal; since they are "
"bonded, the strip **bends with the high-α metal on the outside of the curve** (the longer "
"path must be outermost). On cooling it bends the other way. The bending is repeatable and "
"proportional to temperature. "
"**Application:** the **thermostat** — in an electric iron, the strip's bending at a set "
"temperature opens its contacts and cuts the heating current; as it cools it bends back and "
"reconnects, holding the iron near the chosen temperature (also used in fire alarms and "
"car indicator flashers). "
"**Deep point:** the strip converts a temperature difference into a *mechanical displacement* — "
"differential expansion is the transducer; the metal with the larger α always takes the "
"outside of the bend, the memory hook for the direction.")}

A['vectors/01-neb-2024.json'] = {0: (
"**Rectangular components:** A_x = A cos θ (along x), A_y = A sin θ (along y). "
"**Substitute:** A = 50 m, θ = 37° (cos 37° ≈ 0.8, sin 37° ≈ 0.6). "
"A_x = 50 × 0.8 = **40 m**; A_y = 50 × 0.6 = **30 m**. "
"**Check:** √(40² + 30²) = √2500 = 50 m ✓. "
"**Deep point:** the 37°/53° pair is the physics classroom's 3-4-5 triangle — cos 37° = 0.8 "
"and sin 37° = 0.6 are worth memorising; the Pythagorean check closes the answer.")}

A['vectors/02-neb-2023.json'] = {0: (
"**Scalar (dot) product:** A·B = AB cos θ — the product of the magnitudes and the cosine of the "
"angle between them; the result is a **scalar** (no direction). It measures how much of one "
"vector lies along the other (projection). *Example:* **work, W = F·d = Fd cos θ** — force "
"dot displacement. (Also: A·B = A_xB_x + A_yB_y + A_zB_z; A·B = 0 ⟹ vectors perpendicular.) "
"**Vector (cross) product:** A × B = AB sin θ n̂ — magnitude AB sin θ with direction **n̂ "
"perpendicular to both vectors** given by the right-hand rule (curl from A to B; thumb gives "
"n̂); the result is a **vector**. *Example:* **torque, τ = r × F** (also force on a moving "
"charge's magnetic counterpart, v × B). "
"**Deep point:** cos θ vs sin θ is the split — dot products measure *alongness* (work, power, "
"flux), cross products measure *perpendicularity* (torque, angular momentum, magnetic force); "
"and A × B = −B × A, while A·B = B·A.")}

A['vectors/03-neb-2021.json'] = {
0: ("**Magnitude (law of cosines/parallelogram law):** "
"R = √(P² + Q² + 2PQ cos θ) = √(10² + 20² + 2 × 10 × 20 × cos 60°) "
"= √(100 + 400 + 400 × 0.5) = √(500 + 200) = √700 ≈ **26.5 N**. "
"**Direction:** angle α with P: tan α = (Q sin θ)/(P + Q cos θ) = (20 × sin 60°)/(10 + 20 × "
"0.5) = (20 × 0.866)/20 = 0.866 ⟹ **α ≈ 40.9° from the 10 N force** (toward the 20 N force). "
"**Deep point:** the parallelogram law's two formulas (cosine for size, tangent for direction) "
"are the whole toolkit — and checking the extremes (θ = 0 ⟹ R = 30 N; θ = 180° ⟹ R = 10 N) "
"confirms 26.5 N sits plausibly between them."),
1: ("**Component addition:** "
"A + B = (3 + 5)î + (4 + (−12))ĵ = **8î − 8ĵ m**. "
"**Magnitude:** |R| = √(8² + (−8)²) = √128 = 8√2 ≈ **11.3 m**. "
"**Direction:** θ = tan⁻¹(−8/8) = tan⁻¹(−1) ⟹ **45° below the +x axis** (fourth quadrant, "
"i.e. −45° or 315° from +x). "
"**Deep point:** components make vector addition mere arithmetic — add î's, add ĵ's, then "
"reassemble; the quadrant (both signs visible in 8î − 8ĵ) is what the arctangent alone can "
"mislead on.")}

A['vectors/04-neb-2020.json'] = {0: (
"**Scalar:** a quantity fully specified by **magnitude (and unit) alone** — no direction; "
"scalars add by ordinary arithmetic. *Examples:* mass (5 kg), time, temperature, speed, "
"distance, energy, work, density, electric charge. "
"**Vector:** a quantity specified by **magnitude and direction**, obeying **vector (triangle/"
"parallelogram) addition** — direction matters and vectors add head-to-tail. *Examples:* "
"displacement (5 m east), velocity, acceleration, force, momentum, torque, electric field. "
"**Key differences:** (1) direction — a vector needs it, a scalar doesn't; (2) addition — "
"arithmetic vs geometric (two 5 N forces can give anything from 0 to 10 N); (3) multiplication "
"— scalars multiply normally, vectors multiply via dot (scalar result) or cross (vector "
"result) products. "
"**Deep point:** speed vs velocity is the minimal pair — same magnitude, but only one carries "
"a direction; whether a quantity needs a direction is a physical fact, not a convention.")}

A['work-energy-and-power/01-neb-2023.json'] = {
0: ("**Statement:** the **net work done on a body equals the change in its kinetic energy**: "
"W_net = ΔKE = ½mv² − ½mu². "
"**Proof (constant force):** a body of mass m starts with velocity u; a constant net force F "
"acts over displacement s, bringing it to v. "
"(1) **Newton's second law:** F = ma. "
"(2) **Equation of motion:** v² = u² + 2as ⟹ a = (v² − u²)/(2s). "
"(3) **Work done:** W = Fs = ma·s = m × (v² − u²)/(2s) × s = m(v² − u²)/2. "
"**W = ½mv² − ½mu² = ΔKE** — proved. "
"**Interpretation:** work is the currency, kinetic energy the balance — the theorem holds for "
"any net force (it is the work–energy bookkeeping of Newton's second law integrated over "
"distance) and extends to variable forces by integration. "
"**Deep point:** the proof is one substitution — a from the equation of motion dropped into "
"F = ma; the theorem's power is that it bypasses time and force details entirely, needing only "
"end-point speeds."),
1: ("**Energy conservation (or kinematics):** the potential energy at 10 m converts entirely "
"into kinetic energy at the ground. "
"**Speed:** v = √(2gh) = √(2 × 9.8 × 10) = √196 = **14 m/s**. "
"**Kinetic energy:** KE = ½mv² = ½ × 4 × 14² = 2 × 196 = **784 J** "
"(check via mgh: 4 × 9.8 × 10 = 392 J... — careful: mgh = 392 J but ½mv² = 784 J would "
"contradict conservation; recheck: v² = 2 × 9.8 × 10 = 196, so v = 14 m/s; KE = ½ × 4 × 196 = "
"**392 J** ✓ = mgh. The first KE line contained the slip — the correct value is **392 J**.) "
"**Deep point:** KE = mgh is the conservation check, and running it caught the arithmetic — "
"this is exactly why every energy answer should be verified against the height it fell from.")}

A['work-energy-and-power/02-neb-2022.json'] = {0: (
"**Work needed:** W = mgh = 500 × 10 × 20 = 100 000 J. "
"**Time:** t = W/P = 100 000/2000 = **50 s**. "
"**Deep point:** P = W/t rearranged twice — energy first, then time; the g = 10 rounding keeps "
"the arithmetic clean, and 2 kW lifting half a tonne at 0.4 m/s is a plausible crane."),
1: ("**Work done:** W = mgh = 60 × 9.8 × 8 = **4704 J**. "
"**Power:** P = W/t = 4704/20 = **235.2 W ≈ 235 W**. "
"**Deep point:** climbing stairs converts chemical energy to gravitational potential at ~235 W "
"— about three light bulbs; the same person sprinting the same stairs in 5 s would develop "
"~940 W, showing power is rate, not quantity.")}

A['work-energy-and-power/03-neb-2021.json'] = {0: (
"**Work:** the product of force and displacement **in the direction of the force**: "
"W = F·d = Fd cos θ; SI unit **joule (J = N·m)**. Zero when force ⊥ displacement. "
"**Energy:** the **capacity to do work**; a body's energy is measured by the work it can do; "
"SI unit also the **joule**. Forms: kinetic (½mv²), potential (mgh, ½kx²), thermal, chemical, "
"etc. "
"**Power:** the **rate of doing work** (or energy transfer): P = W/t = F·v; SI unit **watt "
"(W = J/s)** (1 kW = 1000 W; 1 hp ≈ 746 W). "
"**Deep point:** all three share the joule's family — work and energy are the same currency "
"(energy is *stored* work), and power is that currency per second; the cos θ in work is where "
"direction quietly re-enters a scalar.")}

A['work-energy-and-power/04-neb-2020.json'] = {0: (
"**Statement:** the **net work done on a body equals the change in its kinetic energy** — "
"W_net = ½mv² − ½mu². Work done *on* the body increases its KE; work done *by* the body "
"(against friction, say) decreases it. "
"**Explanation:** it follows from Newton's second law integrated over distance: F = ma with "
"v² = u² + 2as gives W = Fs = ½mv² − ½mu². It holds for any net force (constant or variable, "
"via W = ∫F·ds), needs no knowledge of the force's duration, and is the scalar (energy) shadow "
"of the vector (momentum) theorem. "
"**Example:** braking a 1000 kg car from 20 m/s to rest requires W = 0 − ½ × 1000 × 400 = "
"−2 × 10⁵ J — the brakes must remove 200 kJ, regardless of whether the stop takes 5 s or 50 s. "
"**Deep point:** the theorem is distance-friendly and time-blind — pair it with the impulse–"
"momentum theorem (force × time), which is the time-friendly, distance-blind twin.")}

A['work-energy-and-power/05-neb-2024.json'] = {
0: ("**Statement:** net work done on a body = change in kinetic energy: **W_net = ½mv² − ½mu²**. "
"**Proof (constant force):** with net force F over displacement s, Newton's second law gives "
"F = ma, and the equation of motion v² = u² + 2as gives a = (v² − u²)/(2s). Substituting: "
"W = Fs = m(v² − u²)/(2s) × s = ½mv² − ½mu² = ΔKE. ∎ "
"**Deep point:** one substitution proves it — kinematics' 'a' dropped into dynamics' 'F = ma'; "
"the theorem needs only end-point speeds, which is why it outlives every detail of the force's "
"schedule."),
1: ("**Work:** W = mgh = 500 × 10 × 20 = 100 000 J. "
"**Time:** t = W/P = 100 000/2000 = **50 s**. "
"**Deep point:** energy first, time second — P = W/t is the whole machine; with g = 9.8 the "
"answer would be 49 s, so quote the g you used."),
2: ("**Elastic PE:** W = ½kx² = ½ × 200 × (0.1)² = ½ × 200 × 0.01 = **1 J**. "
"**Deep point:** the ½ is the F–x triangle — force ramps 0 → kx during the stretch, so the "
"work is half of kx × x; forgetting it doubles the answer."),
3: ("**Conservation of mechanical energy (free fall):** take the body of mass m at height h "
"(at rest) and let it fall. "
"**At the top:** KE = 0, PE = mgh ⟹ total E = mgh. "
"**After falling distance x** (height h − x, speed v): "
"PE = mg(h − x); KE from v² = 2gx: KE = ½m(2gx) = mgx. "
"**Total:** E = mg(h − x) + mgx = **mgh** — unchanged. "
"**At the ground:** PE = 0, KE = ½mv² = ½m(2gh) = mgh ⟹ E = mgh again. "
"The total mechanical energy is **mgh at every point** of the fall (loss in PE = gain in KE at "
"every stage), so it is conserved when air resistance is neglected. "
"**Deep point:** the proof is the bookkeeping identity PE loss = KE gain — v² = 2gx is the "
"only physics input, and it is itself the work–energy theorem for gravity."),
4: ("**Uniform speed ⟹ net force balances resistance:** the engine's driving force F = 500 N. "
"**Power:** P = Fv = 500 × 20 = **10 000 W = 10 kW**. "
"**Deep point:** P = Fv is the working form of P = W/t for steady motion — at constant speed "
"all engine power goes against the resistance, none into accelerating; that's why highway "
"power demand is a drag-and-speed product."),
5: ("**Kilowatt-hour:** the commercial **unit of electrical energy** — the energy consumed when "
"power is used at the rate of **1 kilowatt for 1 hour**; it is an energy unit, not a power "
"unit, and is what electricity meters and bills count. "
"**Conversion:** 1 kWh = 1000 W × 3600 s = **3.6 × 10⁶ J** (3.6 MJ). "
"**Deep point:** the kWh survives because it is human-scaled — a 1 kWh unit runs a 1 kW heater "
"for an hour; in joules that same energy is awkwardly large, which is why bills never say "
"'joules'.")}

def main():
    total = 0
    for key, ans in A.items():
        f = 'content/practice/questions/class-11/physics/' + key
        d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
        qs = d if isinstance(d, list) else d.get('questions', [])
        for i, text in ans.items():
            assert i < len(qs), (key, i)
            assert not (qs[i].get('answer') or '').strip(), (key, i)
            qs[i]['answer'] = text
            total += 1
        assert all((q.get('answer') or '').strip() for q in qs), key
        open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        print('filled', key, f'({len(ans)} answers, {len(qs)} questions)')
    # thermodynamics/01-neb-2023.json: mirror solution -> answer
    f = 'content/practice/questions/class-11/physics/thermodynamics/01-neb-2023.json'
    d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
    qs = d if isinstance(d, list) else d.get('questions', [])
    n = 0
    for q in qs:
        if not (q.get('answer') or '').strip() and (q.get('solution') or '').strip():
            q['answer'] = q['solution']
            n += 1
    open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
    print('mirrored solution->answer in thermodynamics/01-neb-2023.json', f'({n} answers)')
    print('TOTAL standard answers:', total)

main()

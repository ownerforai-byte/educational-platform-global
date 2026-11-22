#!/usr/bin/env python
# Populate PYQ answers - physics batch 3: gravitation, heat-and-temperature, ideal-gas,
# kinematics, lenses, mechanics, nuclear-physics, optics (optics/05: mirror solution -> answer)
import json

A = {}

A['gravitation/01-neb-2024.json'] = {0: (
"**Newton's law of gravitation:** every particle in the universe attracts every other particle with "
"a force **directly proportional to the product of their masses and inversely proportional to the "
"square of the distance between their centres**, acting along the line joining them: "
"**F = Gm₁m₂/r²**. "
"**Gravitational constant G:** the universal constant of proportionality in the law — the "
"gravitational force between two unit masses separated by unit distance. Its value is "
"**G = 6.67 × 10⁻¹¹ N m² kg⁻²** (measured by Cavendish). It is universal: the same for any pair "
"of masses anywhere. "
"**Deep point:** G is not g — G is the universal coupling constant of gravity, while g is the "
"local field strength; they meet in g = GM/R².")}

A['gravitation/02-neb-2023.json'] = {0: (
"**Escape velocity:** the minimum speed with which a body must be projected from a planet's "
"surface so that it just escapes the planet's gravitational field (reaches infinity with zero "
"kinetic energy). "
"**Derivation (energy conservation):** at the surface the body has kinetic energy ½mv² and "
"gravitational potential energy −GMm/R; at infinity (just escaping) both kinetic energy and "
"potential energy are zero. Total energy is conserved: "
"½mv² − GMm/R = 0 ⟹ **v_e = √(2GM/R)**. "
"Using g = GM/R² at the surface: v_e = √(2(GM/R²)R) = **v_e = √(2gR)**. "
"**Calculation:** v_e = √(2 × 9.8 × 6.4 × 10⁶) = √(1.2544 × 10⁸) = 1.12 × 10⁴ m/s ≈ "
"**11.2 km/s**. "
"**Deep point:** the two equivalent forms — √(2GM/R) and √(2gR) — differ only by substituting "
"g = GM/R²; escape velocity is √2 times the orbital speed and independent of the escaping "
"body's mass.")}

A['gravitation/03-neb-2022.json'] = {0: (
"**Concept:** escape velocity is the minimum projection speed for which the body's kinetic energy "
"exactly pays off its (negative) gravitational potential energy, so it reaches infinity with zero "
"speed: ½mv² = GMm/R ⟹ **v_e = √(2GM/R) = √(2gR)** (using g = GM/R²). "
"**Calculation:** v_e = √(2 × 5 × 6 × 10⁶) = √(6 × 10⁷) = √60 × 10³ ≈ 7.75 × 10³ m/s ≈ "
"**7.75 km/s**. "
"**Deep point:** v_e = √(2gR) needs only the surface gravity and radius — no planet mass "
"required; halving g from Earth's 9.8 to 5 m/s² while keeping a similar radius drops escape "
"velocity from 11.2 to 7.75 km/s.")}

A['gravitation/04-neb-2021.json'] = {
0: ("**Formula:** gravitational potential energy of a mass m at distance r from Earth's centre: "
"U = −GMm/r (negative because the field is attractive; zero at infinity). "
"**Orbit radius:** r = R + h = 6.4 × 10⁶ + 4 × 10⁵ = 6.8 × 10⁶ m. "
"**Substitute:** U = −(6.67 × 10⁻¹¹ × 6 × 10²⁴ × 200)/(6.8 × 10⁶) "
"= −(6.67 × 6 × 2 × 10⁻¹¹⁺²⁴⁺²)/6.8 × 10⁶ = −(8.004 × 10¹⁵)/(6.8 × 10⁶) "
"= −1.177 × 10⁹ ≈ **−1.18 × 10⁹ J**. "
"**Deep point:** the negative sign is the physics — the satellite is *bound*; 1.18 × 10⁹ J is "
"the energy that would have to be supplied to free it to infinity."),
1: ("**Formula:** surface gravity g = GM/R². "
"**Planet's values:** M′ = 8M; R′ = 2R. "
"g′ = G(8M)/(2R)² = 8GM/4R² = **2 × GM/R² = 2g**. "
"**Substitute:** g′ = 2 × 9.8 = **19.6 m/s²**. "
"**Deep point:** mass up 8×, radius up 2× ⟹ g up only 2×, because the R² in the denominator "
"eats four of the eight mass factors — g scales as M/R², a ratio, not a product.")}

A['heat-and-temperature/01-neb-2023.json'] = {
0: ("**Zeroth law:** if two bodies (A and B) are each in **thermal equilibrium with a third body "
"(C)**, then they are in thermal equilibrium with each other — all three share the same "
"temperature. This is the physical basis of **temperature**: it is the property that equalises "
"when bodies are in thermal equilibrium, and the third body (a thermometer) is what measures it. "
"**Why 'zeroth':** the first and second laws were already named when this principle was "
"recognised (around 1930) as logically *prior* to them — equilibrium must be defined before heat "
"can be discussed — so it was given the number zero rather than renumbering the others. "
"**Deep point:** the zeroth law is what makes a thermometer meaningful — the thermometer reads "
"its own temperature, and the law licenses you to assign that reading to the body it touched."),
1: ("**The thermometer is linear but mislabelled:** its scale stretches between two wrong fixed "
"points. True temperature T relates to the reading R by linear interpolation between the fixed "
"points: (R − R_ice)/(R_steam − R_ice) = (T − 0)/(100 − 0). "
"**Fixed points:** ice water (true 0 °C) reads R_ice = −5; boiling water (true 100 °C) reads "
"R_steam = 105. So R = −5 + (110/100)T = −5 + 1.1T. "
"**At T = 40 °C:** R = −5 + 1.1 × 40 = −5 + 44 = **39 on the faulty scale** "
"(i.e. the thermometer reads 39 where the true temperature is 40 °C). "
"**Deep point:** the correction factor is (100 − 0)/(105 − (−5)) = 100/110 — the thermometer's "
"degrees are 10% too big, which is exactly why 40 true degrees occupy only 44 of its divisions "
"starting from −5.")}

A['heat-and-temperature/02-neb-2022.json'] = {0: (
"**Heat:** the **energy** transferred between bodies because of a temperature difference — energy "
"in transit, measured in **joule (J)** (the calorie, 4.186 J, is the older unit). It depends on "
"mass, material and temperature change. "
"**Temperature:** the **degree of hotness** — the physical quantity that determines the direction "
"of heat flow (from higher to lower temperature) and is proportional to the average kinetic "
"energy of the body's molecules; measured in **kelvin (K)** (or °C). "
"**Key differences:** heat is energy (a body *contains* internal energy, not 'heat'); temperature "
"is an intensive state variable; heat flows *because of* a temperature difference, and flows stop "
"at thermal equilibrium. **Deep point:** a sparkler spark (≈2000 °C) has far higher temperature "
"than a bathtub of warm water, but the water delivers vastly more heat — temperature is "
"intensity, heat is quantity.")}

A['heat-and-temperature/03-neb-2021.json'] = {0: (
"**Heat** is the energy transferred between systems due to a temperature difference (unit: "
"**joule, J**); it depends on the mass and substance of the body. **Temperature** is the degree "
"of hotness — the state variable that decides the direction of heat flow and measures the "
"average molecular kinetic energy (unit: **kelvin, K**). "
"**Differences:** (1) heat is energy in transit; temperature is a state of the body; (2) heat is "
"extensive (scales with amount of substance), temperature is intensive; (3) equal heats raise "
"the temperatures of different bodies by different amounts (heat capacity); (4) heat flows from "
"high to low temperature until equilibrium, after which no net heat flows even though both "
"bodies still contain internal energy. **Deep point:** two bodies at the same temperature can "
"hold wildly different amounts of internal energy — a ocean and a cup of water at 20 °C — "
"because temperature says nothing about quantity.")}

A['heat-and-temperature/04-neb-2024.json'] = {
0: ("**Zeroth law:** if bodies A and B are each separately in thermal equilibrium with body C, then "
"A and B are in thermal equilibrium with each other — all three have the same temperature. "
"**Explanation:** thermal equilibrium means no net heat flows between the bodies; the law says "
"this 'no-flow' relation is transitive, which is what lets a thermometer (C) mediate: it "
"equalises with A, then with B, and can then certify A and B as equal. "
"**Why 'zeroth':** the first and second laws already existed when this principle was formally "
"recognised (early 20th century) as logically *prior* — equilibrium and temperature must be "
"defined before energy accounting makes sense — so it was numbered zero instead of renumbering "
"the others. **Deep point:** the law is the licence for every temperature measurement: the "
"thermometer reads itself, the law makes that reading the body's."),
1: ("**Heat:** energy transferred between bodies because of a temperature difference — SI unit "
"**joule (J)**. It is energy in transit, extensive (depends on mass, substance, temperature "
"change). **Temperature:** the degree of hotness that determines the *direction* of heat flow "
"and measures the average kinetic energy of molecules — SI unit **kelvin (K)**. It is "
"intensive (independent of amount). **Deep point:** heat flows because temperature differs; at "
"thermal equilibrium the flow stops but both bodies still hold internal energy — heat is the "
"transfer, temperature the level."),
2: ("**Formula:** T_C = (T_F − 32) × 5/9. "
"**Substitute:** T_C = (104 − 32) × 5/9 = 72 × 5/9 = **40 °C**. "
"**Kelvin:** T_K = T_C + 273.15 = 40 + 273.15 = **313.15 K** (≈ 313 K). "
"**Deep point:** the 32-offset comes from Fahrenheit's brine-based zero; subtract it *before* "
"scaling, and add 273 only at the end — Celsius and Kelvin share the degree size but differ by "
"a shift, not a factor."),
3: ("**Absolute zero:** the temperature at which a substance would have the **minimum possible "
"internal energy** — classically, the temperature at which molecular (translational) kinetic "
"energy vanishes; numerically **0 K = −273.15 °C**, the zero of the Kelvin scale (extrapolated "
"from the V–T and P–T graphs of gases, which meet the axis at −273.15 °C). "
"**Why unattainable:** cooling a body means extracting energy from it, but as T → 0 the energy "
"available to extract vanishes while the third law of thermodynamics (Nernst theorem) forbids "
"reaching 0 K in a finite number of steps — each successive cooling stage removes a smaller "
"fraction. (Laser-cooled atoms reach ~10⁻⁹ K but never exactly zero.) "
"**Deep point:** absolute zero is a limit, not a place — approachable asymptotically, "
"unreachable in principle; and even at 0 K quantum zero-point motion survives, so 'all motion "
"stops' is the classical half-truth."),
4: ("**Triple point of water:** the unique temperature and pressure at which **ice, liquid water "
"and water vapour coexist in equilibrium** — exactly **273.16 K (0.01 °C) at 611.7 Pa "
"(0.006 atm)**. "
"**Why it defines the kelvin:** the triple point is **reproducible anywhere in the universe** "
"with no dependence on container, purity handling or ambient pressure — unlike the melting/boiling "
"points, which shift with pressure. The kelvin was defined so that the triple point is exactly "
"273.16 K, making one kelvin = 1/273.16 of that interval (since 2019 the kelvin is defined via "
"the Boltzmann constant, with the triple point now *measured* at 273.16 K). "
"**Deep point:** a fixed point needs no artefact — no standard thermometer, no standard water "
"sample beyond purity; that universality is why thermometry anchored itself to a phase "
"equilibrium rather than to an object."),
5: ("**Conclusion: A and B are in thermal equilibrium with each other** — they have the same "
"temperature (and no net heat flows between them if brought into contact). "
"**Law used: the zeroth law of thermodynamics** — if A is in thermal equilibrium with C and B is "
"in thermal equilibrium with C, then A and B are in thermal equilibrium with each other. "
"**Deep point:** this transitivity is exactly how a thermometer works — C is the thermometer, "
"and the law is what lets its single reading certify equality between A and B.")}

A['ideal-gas/01-neb-2023.json'] = {0: (
"**Kinetic theory of gases:** the model that a gas consists of a very large number of molecules "
"in ceaseless random motion, whose **collisions with the walls cause pressure** and whose "
"**average kinetic energy is proportional to the absolute temperature** — connecting the "
"macroscopic gas laws to molecular mechanics (leading to PV = ⅓Nm⟨c²⟩). "
"**Assumptions:** (1) a gas consists of a very large number of identical molecules moving in "
"random directions with a distribution of speeds; (2) the volume of the molecules themselves is "
"**negligible** compared with the container volume (point molecules); (3) **intermolecular forces "
"act only during collisions** (no attraction/repulsion between collisions); (4) **all collisions "
"— molecule–molecule and molecule–wall — are perfectly elastic**, conserving kinetic energy; "
"(5) the duration of a collision is negligible compared with the time between collisions; "
"(6) between collisions molecules move in straight lines with uniform velocity (Newtonian "
"mechanics applies). "
"**Deep point:** the assumptions define the *ideal* gas — real gases deviate exactly where they "
"fail (molecular volume and intermolecular forces, which van der Waals' equation puts back in).")}

A['ideal-gas/02-neb-2022.json'] = {
0: ("**Formula:** c_rms = √(3RT/M), with M in kg/mol. "
"**Substitute:** T = 27 °C = 300 K; M = 32 g/mol = 0.032 kg/mol; R = 8.31 J/mol·K. "
"c_rms = √(3 × 8.31 × 300/0.032) = √(7479/0.032) = √(2.337 × 10⁵) ≈ **483 m/s**. "
"**Deep point:** the kg conversion (32 g → 0.032 kg) is the single slip point — forgetting it "
"inflates the answer by √1000; and 483 m/s is faster than a jetliner, a nice reality check on "
"how fast molecules actually move."),
1: ("**Identify the law:** constant pressure ⟹ **Charles's law**: V/T = constant ⟹ "
"V₂ = V₁ × T₂/T₁. "
"**Convert to kelvin first:** T₁ = 27 °C = 300 K; T₂ = 100 °C = 373 K. "
"**Substitute:** V₂ = 0.5 × 373/300 = 0.5 × 1.2433 = **0.622 m³**. "
"**(Note:** the given atmospheric pressure 1.01 × 10⁵ Pa is not needed — the gas is held at "
"1.0 × 10⁵ Pa which stays constant, and Charles's law needs only the temperature ratio.**)** "
"**Deep point:** the kelvin conversion is the marks-decider — using 27 and 100 directly gives "
"1.85 m³, a wrong answer that looks plausible; gas-law temperatures are always absolute.")}

A['ideal-gas/03-neb-2021.json'] = {
0: ("**Law of equipartition of energy:** in thermal equilibrium, the energy of a gas is **shared "
"equally among all its degrees of freedom**, each degree of freedom receiving an average energy "
"of **½kT per molecule** (½RT per mole), where k is the Boltzmann constant. "
"**Monoatomic molecule:** it can only translate — motion along x, y and z — so it has "
"**3 degrees of freedom**. (Hence average energy 3 × ½kT = 3kT/2 per molecule, and molar heat "
"capacity C_v = 3R/2.) **Deep point:** a point-like atom has no way to store rotational or "
"vibrational energy — that's why monatomic gases like helium have the lowest molar heat "
"capacity of all gases."),
1: ("**Boyle's law:** at constant temperature (and fixed amount of gas), the pressure of a gas is "
"inversely proportional to its volume — **PV = constant**, or P₁V₁ = P₂V₂ (isothermal). "
"**Charles's law:** at constant pressure, the volume is directly proportional to the absolute "
"temperature — **V/T = constant**, or V₁/T₁ = V₂/T₂ (isobaric). "
"**With μ (amount of gas in moles):** both laws combine with Avogadro's principle into the ideal "
"gas equation **PV = μRT** (R = 8.31 J/mol·K): Boyle's law is the special case μ, T fixed "
"(PV = μRT = constant); Charles's law is the case μ, P fixed (V/T = μR/P = constant). Each gas "
"law is the full equation with two of the three variables (P, V, T) held fixed. "
"**Deep point:** PV = μRT is the single sentence containing all the gas laws — every 'law' is "
"what remains when you freeze all but two of its letters.")}

A['ideal-gas/04-neb-2024.json'] = {
0: ("**Kinetic theory:** a gas is a vast collection of molecules in random motion whose wall "
"collisions produce pressure and whose average kinetic energy is proportional to absolute "
"temperature, giving PV = ⅓Nm⟨c²⟩ = μRT. "
"**Assumptions:** (1) enormous number of identical molecules in random motion; (2) molecular "
"volume negligible compared to the container; (3) no intermolecular forces except during "
"collisions; (4) all collisions perfectly elastic; (5) collision duration negligible vs free "
"path time; (6) straight-line uniform motion between collisions. **Deep point:** each assumption "
"marks a place where real gases bend the ideal — molecular size and intermolecular attraction "
"are the two van der Waals corrects."),
1: ("**Equipartition law:** in thermal equilibrium energy is shared equally among all degrees of "
"freedom, each getting **½kT per molecule** (½RT per mole). "
"**Monoatomic molecule:** **3 degrees of freedom** (translational only — x, y, z), so average "
"energy = 3kT/2 per molecule. **Deep point:** 'degrees of freedom' counts independent ways of "
"storing energy; a point atom has only three ways to move, so it has three."),
2: ("**Formula:** c_rms = √(3RT/M). "
"**Substitute:** T = 300 K; M = 0.032 kg/mol; R = 8.31. "
"c_rms = √(3 × 8.31 × 300/0.032) = √(2.337 × 10⁵) ≈ **483 m/s**. "
"**Deep point:** M must be in kg/mol — the 32 g → 0.032 kg conversion is where the marks live."),
3: ("**Boyle's law** (T, μ constant): PV = constant. **Charles's law** (P, μ constant): V/T = "
"constant. **Pressure law** (V, μ constant): P/T = constant. "
"**Combine:** suppose a gas goes from (P₁, V₁, T₁) to (P₂, V₂, T₂) via two steps — an "
"isothermal compression to an intermediate volume V′ (Boyle: P₁V₁ = P₂V′) then a constant-"
"pressure return to T₂ (Charles/pressure-law: V′/T₁ = V₂/T₂). Eliminating V′: "
"P₁V₁/T₁ = P₂V₂/T₂ ⟹ **PV/T = constant**, and with the amount of gas μ the constant is μR "
"(R = 8.31 J/mol·K), giving the **ideal gas equation PV = μRT**. "
"**Deep point:** the derivation is bookkeeping through an intermediate state — pick any two-step "
"path and the fixed-point combination PV/T falls out; R is what makes 'constant' universal per "
"mole."),
4: ("**Formula:** PV = μRT ⟹ P = μRT/V. "
"**Substitute:** μ = 2 mol; R = 8.31; T = 300 K; V = 0.05 m³. "
"P = (2 × 8.31 × 300)/0.05 = 4986/0.05 = **99 720 Pa ≈ 1.0 × 10⁵ Pa** — about atmospheric "
"pressure. "
"**Deep point:** the answer's scale is the check — a mole or two of gas in a 50-litre box at "
"room temperature *should* sit near one atmosphere; a wildly different pressure means a slipped "
"power of ten."),
5: ("**Formula:** average kinetic energy per molecule = (3/2)kT. "
"**Substitute:** k = 1.38 × 10⁻²³ J/K; T = 300 K. "
"E = 1.5 × 1.38 × 10⁻²³ × 300 = 1.5 × 4.14 × 10⁻²¹ = **6.21 × 10⁻²¹ J** "
"(≈ 3.9 × 10⁻² eV — tiny per molecule, enormous in aggregate). "
"**Deep point:** the 3/2 counts the three translational degrees of freedom at ½kT each — "
"equipartition in one line; per-mole it becomes 3RT/2 ≈ 3.7 kJ.")}

A['kinematics/01-neb-2024.json'] = {0: (
"**Position:** the location of a body relative to a chosen origin and reference direction — "
"specified by coordinates (x, or r as a position vector); it is where the body *is*. "
"**Velocity:** the **rate of change of position** — v = dx/dt (or dr/dt) — a vector giving both "
"speed and direction of motion; the magnitude of velocity is the speed. "
"**Acceleration:** the **rate of change of velocity** — a = dv/dt — a vector; it is nonzero "
"whenever the speed *or* the direction of motion changes (which is why uniform circular motion "
"has acceleration). **Deep point:** the three quantities form a derivative chain — position, its "
"first derivative (velocity), its second derivative (acceleration) — and each is a vector in "
"2-D/3-D motion.")}

A['kinematics/02-neb-2023.json'] = {
0: ("**(i) Time to fall:** s = ½gt² (dropped from rest) ⟹ t = √(2s/g) = √(2 × 200/10) = √40 ≈ "
"**6.32 s**. "
"**(ii) Velocity on impact:** v = gt = 10 × 6.32 ≈ **63.2 m/s** "
"(check via v² = 2gs = 2 × 10 × 200 = 4000 ⟹ v = √4000 = 63.2 m/s ✓). "
"**Deep point:** the two equations-of-motion routes (v = gt and v² = 2gs) must agree — running "
"both is the free check that catches arithmetic slips."),
1: ("**Final velocity:** v = u + at = 10 + 2 × 4 = **18 m/s**. "
"**Distance:** s = ut + ½at² = 10 × 4 + ½ × 2 × 16 = 40 + 16 = **56 m** "
"(check via v² = u² + 2as ⟹ s = (18² − 10²)/(2 × 2) = (324 − 100)/4 = 56 m ✓). "
"**Deep point:** any two of the three equations of motion confirm the third — solving with v = "
"u + at and checking with v² = u² + 2as is the standard insurance.")}

A['kinematics/03-neb-2022.json'] = {
0: ("**Horizontal projectile: independent motions.** u_x = 20 m/s (constant); vertical drop from "
"rest with g = 10 m/s² (taking g = 10; with 9.8 the answers shift slightly). "
"**(i) Time of flight:** from the vertical fall, h = ½gt² ⟹ t = √(2h/g) = √(2 × 80/10) = "
"√16 = **4 s**. "
"**(ii) Horizontal range:** R = u_x × t = 20 × 4 = **80 m**. "
"**(iii) Velocity on striking:** v_x = 20 m/s; v_y = gt = 10 × 4 = 40 m/s. "
"Speed = √(20² + 40²) = √(400 + 1600) = √2000 ≈ **44.7 m/s**, at angle "
"θ = tan⁻¹(v_y/v_x) = tan⁻¹(40/20) = tan⁻¹2 ≈ **63.4° below the horizontal**. "
"**Deep point:** the whole answer hangs on one idea — the horizontal and vertical motions are "
"independent and share only the time; the vertical drop alone fixes the flight time."),
1: ("**Time to maximum height:** at the top v = 0, so t = u/g = 49/9.8 = **5 s**. "
"**Maximum height:** h = u²/2g = (49)²/(2 × 9.8) = 2401/19.6 = **122.5 m** "
"(check via v² = u² − 2gh with v = 0 ✓). "
"**Total time of flight:** by symmetry, the fall takes the same 5 s ⟹ T = 2 × 5 = **10 s** "
"(or T = 2u/g = 98/9.8 = 10 s ✓). "
"**Deep point:** the up-journey and down-journey are mirror images — time up equals time down "
"and the landing speed equals the launch speed — so one calculation serves both halves.")}

A['lenses/01-neb-2023.json'] = {0: (
"**Magnification:** m = v/u = 2 (real image, twice the size) ⟹ **v = 2u**. "
"**Lens equation:** 1/f = 1/v − 1/u ⟹ 1/15 = 1/(2u) − 1/u = (1 − 2)/(2u) = −1/(2u). "
"Careful with sign convention: using the real-is-positive form 1/f = 1/v + 1/u for a real object "
"and real image: 1/15 = 1/(2u) + 1/u = 3/(2u) ⟹ 2u = 45 ⟹ **u = 22.5 cm**; "
"**v = 2u = 45 cm**; **m = v/u = 2** (image real, inverted, magnified). "
"**Deep point:** 'real image twice the size' pins m = +2 with v = 2u — the magnification "
"condition converts the lens equation from one unknown into a solvable one; the object must sit "
"between f and 2f, and 22.5 cm indeed lies between 15 and 30 cm ✓.")}

A['lenses/02-neb-2022.json'] = {0: (
"**Thin lens maker's formula:** **1/f = (n − 1)(1/R₁ − 1/R₂)**, where n is the refractive index "
"of the lens material relative to the surroundings, R₁ the radius of the first (front) surface "
"and R₂ of the second (back) surface, with radii positive for surfaces convex toward the "
"incoming light. It gives the focal length from the *material and geometry* of the lens, "
"independent of where the object is. "
"**Derivation for a convex lens (two refractions in succession):** "
"**(1) First surface:** light from a point object O at distance u refracts at the first surface "
"(radius R₁) and would form an image I′ at distance v′: n₂/v′ − n₁/u = (n₂ − n₁)/R₁ "
"(refraction at a single spherical surface). With n₁ = 1 (air), n₂ = n: n/v′ − 1/u = (n − 1)/R₁. "
"**(2) Second surface:** the image I′ acts as the (virtual) object for the second surface "
"(radius R₂); the final image I forms at v: treating the glass-to-air refraction, "
"1/v − n/v′ = (1 − n)/R₂ = −(n − 1)/R₂. "
"**(3) Add the two equations:** the internal terms n/v′ cancel: "
"1/v − 1/u = (n − 1)(1/R₁ − 1/R₂). "
"**(4) Define the focal length:** for an object at infinity (u → ∞), 1/v = 1/f, so "
"**1/f = (n − 1)(1/R₁ − 1/R₂)**. "
"**Deep point:** the derivation is two single-surface refractions added so the intermediate "
"image cancels — the lens never does anything but bend light twice; the 'maker' in the name is "
"because the formula tells the grinder what radii and glass to choose for a wanted f.")}

A['lenses/03-neb-2024.json'] = {
0: ("**Lens maker's formula:** **1/f = (n − 1)(1/R₁ − 1/R₂)** — focal length from the lens "
"material's refractive index n and the two surface radii (sign convention: radii positive for "
"convex-toward-light surfaces). "
"**Derivation (thin convex lens, two refractions):** (1) at the first surface (radius R₁) the "
"object at u would image at v′ inside the glass: n/v′ − 1/u = (n − 1)/R₁; (2) at the second "
"surface (radius R₂) that intermediate image is the object and the final image forms at v: "
"1/v − n/v′ = −(n − 1)/R₂; (3) adding cancels n/v′: 1/v − 1/u = (n − 1)(1/R₁ − 1/R₂); "
"(4) putting u = ∞ (object at infinity gives an image at the focus): **1/f = (n − 1)(1/R₁ − "
"1/R₂)**. "
"**Deep point:** the add-and-cancel step is the derivation — the intermediate image v′ is "
"internal bookkeeping that vanishes, leaving a formula with only the lens's own properties."),
1: ("**Lens equation:** 1/v − 1/u = 1/f with u = −30 cm, f = +20 cm (real-is-positive: "
"1/v = 1/f + 1/u = 1/20 + 1/30 = 5/60 = 1/12) ⟹ **v = +12 cm**... using the magnitude form "
"1/v = 1/f − 1/u = 1/20 − 1/30 = 1/60 ⟹ **v = 60 cm** on the far side (real image). "
"**Magnification:** m = v/u = 60/30 = **2** — image real, inverted, twice the size. "
"**Deep point:** object at 1.5f (between f and 2f) must give a real magnified image beyond 2f — "
"60 cm > 40 cm ✓; the position check is the sanity test."),
2: ("**Lens maker's formula:** 1/f = (n − 1)(1/R₁ − 1/R₂). "
"**Substitute:** n = 1.5; R₁ = +20 cm; R₂ = −20 cm. "
"1/f = (1.5 − 1)(1/20 − 1/(−20)) = 0.5 × (1/20 + 1/20) = 0.5 × 0.1 = 0.05 ⟹ "
"**f = 1/0.05 = 20 cm** (positive ⟹ converging/convex). "
"**Deep point:** the minus sign in front of R₂ is the formula's built-in sign convention — "
"entering it as +20 gives 1/f = 0 and 'no lens'; equal-and-opposite radii is the symmetric "
"biconvex case where the two surface powers simply add."),
3: ("**Powers in contact simply add:** P = P₁ + P₂ = +5 + (−2) = **+3 D**. "
"**Focal length:** f = 1/P = 1/3 m ≈ **0.333 m = 33.3 cm** (positive ⟹ net converging). "
"**Deep point:** the dioptre's virtue is additivity — powers add because thin-lens reciprocals "
"add when lenses touch; the combination is a weaker converging lens than the +5 D alone."),
4: ("**Myopia (short-sightedness):** the eye's far point is closer than infinity — distant objects "
"focus **in front of the retina** (eyeball too long or lens too converging); corrected by a "
"**concave (diverging) lens** which pushes the image back onto the retina. "
"**Hypermetropia (long-sightedness):** the eye's near point is farther than normal — nearby "
"objects focus **behind the retina** (eyeball too short or lens too weak); corrected by a "
"**convex (converging) lens** which adds converging power for close work. "
"**Deep point:** the correction always supplies the power the eye lacks — diverging for an "
"over-powered eye, converging for an under-powered one; 'which lens' is just 'which way the "
"error points'."),
5: ("**Simple microscope:** a single **convex lens of short focal length** used to view a small "
"object placed within its focal length, forming a virtual, erect, magnified image — it works by "
"letting the eye focus on the enlarged virtual image rather than straining on the tiny object. "
"**Magnifying power (image at the near point, D = 25 cm):** "
"**M = 1 + D/f**. "
"**Deep point:** the +1 is the unaided-eye baseline — magnifying *power* compares the angular "
"size with the naked eye at the near point; short focal length is the whole design goal, since "
"M grows as 1/f.")}

A['mechanics/01-neb-2023.json'] = {0: (
"**Acceleration:** a = (v − u)/t = (10 − 2)/4 = 8/4 = **2 m/s²**. "
"**Force:** F = ma = 5 × 2 = **10 N**. "
"**Deep point:** two one-liners chained — kinematics gives a, Newton's second law turns a into "
"F; the force is the *net* force, which is what F = ma always means.")}

A['mechanics/02-neb-2022.json'] = {0: (
"**Principle:** momentum is conserved in the collision (no external horizontal force on the "
"bullet + block system on the smooth surface). "
"**Before:** p = 0.02 × 500 = 10 kg·m/s. **After:** p = (0.02 + 4.98) × V = 5V. "
"**Solve:** 5V = 10 ⟹ **V = 2 m/s**, in the bullet's original direction. "
"**Deep point:** the bullet *embeds* — a perfectly inelastic collision — so kinetic energy is "
"NOT conserved (½ × 0.02 × 500² = 2500 J before vs ½ × 5 × 2² = 10 J after; the lost 2490 J "
"becomes heat and deformation), but momentum always survives.")}

A['mechanics/03-neb-2021.json'] = {0: (
"**Newton's three laws of motion:** "
"**(1) Law of inertia:** a body remains at rest or in uniform straight-line motion unless acted "
"upon by a net external force — force is what *changes* motion, not what maintains it. "
"**(2) Law of acceleration:** the rate of change of momentum of a body is directly proportional "
"to the applied net force and takes place in its direction: **F = ma** (F = dp/dt generally); "
"for a given force, acceleration is inversely proportional to mass. "
"**(3) Law of action–reaction:** to every action there is an equal and opposite reaction — "
"forces occur in pairs, equal in magnitude, opposite in direction, **acting on different "
"bodies** (which is why they never cancel each other on one body). "
"**Deep point:** the first law defines inertial frames and the concept of force, the second "
"quantifies it, the third insists it comes in pairs — one law per question: 'why does it keep "
"moving', 'how much', 'on whom'.")}

A['mechanics/04-neb-2020.json'] = {0: (
"**Elastic collision:** both **momentum and kinetic energy are conserved**; the bodies separate "
"after impact with no loss of kinetic energy to heat/deformation (e.g. gas molecules colliding, "
"steel balls, atomic collisions); relative velocity of approach = relative velocity of "
"separation. "
"**Inelastic collision:** **momentum is conserved but kinetic energy is not** — some KE becomes "
"heat, sound or deformation; the bodies may deform or stick (a perfectly inelastic collision is "
"one where they move off together, e.g. a bullet embedding in a block). "
"**Key differences:** (1) KE conserved vs not; (2) bodies rebound vs deform/stick; (3) elastic "
"collisions are the idealisation — all everyday macroscopic collisions are somewhat inelastic. "
"**Deep point:** momentum is conserved in *both* — it is the collision's invariant; kinetic "
"energy is the only thing that distinguishes the two types, and 'lost' KE is never destroyed, "
"just demoted to heat.")}

A['mechanics/05-neb-2024.json'] = {
0: ("**Resultant of two perpendicular forces:** R = √(F₁² + F₂²) = √(6² + 8²) = √(36 + 64) = "
"√100 = **10 N**. "
"**Direction:** θ = tan⁻¹(F₂/F₁) = tan⁻¹(8/6) = tan⁻¹(1.333) ≈ **53.1° from the 6 N force** "
"(≈ 36.9° from the 8 N force). "
"**Deep point:** the 6–8–10 right triangle is the scaled 3–4–5 — recognising Pythagorean "
"triples turns the square root into instant arithmetic."),
1: ("**Range:** R = (u² sin 2θ)/g. "
"**Maximise:** R is largest when sin 2θ is largest, and sin 2θ ≤ 1 with equality at "
"2θ = 90° ⟹ **θ = 45°**. "
"**Formally:** dR/dθ = (u²/g) × 2cos 2θ = 0 ⟹ cos 2θ = 0 ⟹ 2θ = 90° ⟹ θ = 45°; and the second "
"derivative is negative, confirming a maximum. **Maximum range: R_max = u²/g.** "
"**Deep point:** the sin 2θ is why *two* angles (θ and 90° − θ) give the same range — "
"complementary trajectories — and only their midpoint 45° gives the maximum."),
2: ("**Just begins to slide:** the angle of repose — at the verge of sliding, gravity's component "
"along the incline equals maximum static friction: mg sin θ = μ_s mg cos θ ⟹ "
"**μ_s = tan θ**. "
"**Substitute:** μ_s = tan 30° = 1/√3 ≈ **0.577**. "
"**Deep point:** tan θ = μ_s is the angle-of-repose identity — the measurement method itself: "
"tilt the plane until sliding starts and read the angle; no force meter needed."),
3: ("**Work per minute:** W = mgh = 200 × 10 × 10 = 20 000 J. "
"**Power:** P = W/t = 20 000/60 ≈ **333 W**. "
"**Deep point:** 'per minute' is the trap — the work happens in 60 s, not 1 s; forgetting the "
"÷60 inflates the answer twentyfold to 20 kW."),
4: ("**Momentum conservation (recoil):** before firing, total p = 0. After: "
"m_b v_b + M_g V_g = 0 ⟹ V_g = −m_b v_b/M_g. "
"**Substitute:** m_b = 10 g = 0.01 kg; v_b = 400 m/s; M_g = 5 kg. "
"V_g = −(0.01 × 400)/5 = −4/5 = **−0.8 m/s** — the gun recoils at **0.8 m/s opposite to the "
"bullet**. "
"**Deep point:** the mass ratio sets the recoil — the 500:1 mass ratio of gun to bullet makes "
"the velocity ratio 1:500; the negative sign is the physics (equal and opposite momenta)."),
5: ("**Boat heads straight across:** its 4 m/s points perpendicular to the bank while the 3 m/s "
"current carries it downstream — the motions are perpendicular components. "
"**(i) Crossing time:** set by the perpendicular motion only: t = width/v_boat = 200/4 = "
"**50 s** (the current cannot shorten or lengthen the crossing — it only adds drift). "
"**(ii) Downstream drift:** d = v_current × t = 3 × 50 = **150 m**. "
"**(Resultant velocity:** √(4² + 3²) = 5 m/s at tan⁻¹(3/4) ≈ 36.9° downstream of straight "
"across; total path √(200² + 150²) = 250 m.**)** "
"**Deep point:** perpendicular components are independent — the 3 m/s current has no component "
"across the river, so it cannot touch the crossing time; to land directly opposite, the boat "
"would have to aim upstream at sin θ = 3/4 and accept a slower crossing (5-3-4 triangle "
"throughout).")}

A['nuclear-physics/01-neb-2024.json'] = {0: (
"**Radioactive decay constant (λ):** the probability that a given nucleus decays **per unit "
"time** — λ = −(dN/N)/dt, the fraction of the remaining undecayed nuclei that decay each second; "
"SI unit **s⁻¹**. It leads to the decay law N = N₀e^(−λt). "
"**Half-life relation:** at t = T½, N = N₀/2 ⟹ N₀/2 = N₀e^(−λT½) ⟹ e^(−λT½) = ½ ⟹ "
"**T½ = ln 2/λ = 0.693/λ**. "
"**Deep point:** λ is a probability per unit time — a property of the nucleus alone, independent "
"of temperature, pressure or chemical state, which is why radioactive clocks are so reliable.")}

A['nuclear-physics/02-neb-2023.json'] = {
0: ("**Mass defect:** the difference between the **sum of the masses of the separate nucleons** "
"(Z protons + N neutrons, free) and the **actual mass of the nucleus**: Δm = (Zm_p + Nm_n) − "
"M_nucleus. The assembled nucleus is always *lighter* than its parts. "
"**Relation to binding energy:** the missing mass appears as the energy that bound the nucleus "
"together, by Einstein's mass–energy equivalence **E_b = Δmc²** — the binding energy is the "
"energy that would have to be supplied to pull the nucleus apart into free nucleons (per "
"nucleon: E_b/A, peaking near iron at ~8.8 MeV). "
"**Deep point:** mass defect is binding energy seen through E = mc² — a helium-4 nucleus weighs "
"about 0.7% less than 2p + 2n, and that 0.7% is the fusion energy of the Sun."),
1: ("**Fraction remaining after 24 days:** 24 days = 3 half-lives (24/8) ⟹ "
"N/N₀ = (½)³ = **1/8** remains. "
"**Activity:** activity is proportional to the number of undecayed nuclei (A = λN), so it decays "
"by the same factor: A = 4 curie × 1/8 = **0.5 curie**. "
"**Deep point:** every half-life halves *both* the atom count and the activity — one rule, two "
"quantities; after n half-lives, fraction remaining = 2⁻ⁿ, always.")}

A['nuclear-physics/03-neb-2022.json'] = {0: (
"**Nuclear fission:** a **heavy nucleus splits** into two (or more) lighter nuclei plus "
"neutrons, releasing energy because the fragments have higher binding energy per nucleon — "
"*example:* **²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n + ~200 MeV** (chain reaction in reactors and "
"weapons). "
"**Nuclear fusion:** **two light nuclei merge** into a heavier nucleus, releasing energy because "
"the product again has higher binding energy per nucleon — *example:* "
"**²H + ³H → ⁴He + n + 17.6 MeV** (the Sun's energy source; requires enormous temperature/"
"pressure to overcome Coulomb repulsion). "
"**Differences:** (1) fission breaks a heavy nucleus, fusion builds a light one; (2) fission "
"needs slow-neutron capture and is chain-reactive; fusion needs extreme temperature to force "
"like charges together; (3) both release energy *because both move products toward the iron "
"peak* of binding energy per nucleon. **Deep point:** the energy arrow points the same way for "
"both — toward higher binding energy per nucleon — which is why fission burns uranium downhill "
"from the peak and fusion burns hydrogen uphill toward it.")}

A['nuclear-physics/04-neb-2020.json'] = {0: (
"**Answer: (a) 1/2ⁿ.** "
"**Reason:** each half-life halves the remaining undecayed atoms: after 1 half-life N₀/2, after "
"2 → N₀/4, after n → **N₀/2ⁿ** (from N = N₀(½)ⁿ, equivalent to N = N₀e^(−λt) with t = nT½ = "
"n·0.693/λ). "
"**Deep point:** the halving is exponential, not linear — option (b) n/2 would eventually go "
"negative, the giveaway that linear intuition fails radioactive decay.")}

A['optics/01-neb-2023.json'] = {0: (
"**Total internal reflection:** when light travelling in the **denser medium** strikes the "
"boundary with a less dense medium at an incidence angle **greater than the critical angle**, no "
"refraction occurs — the light is **completely reflected back** into the denser medium, obeying "
"the ordinary laws of reflection. "
"**Conditions:** (1) the light must be travelling **from the denser to the rarer medium** "
"(e.g. glass → air, water → air); (2) the **angle of incidence must exceed the critical angle** "
"for the pair of media. "
"**Relation with critical angle:** at the critical angle the refracted ray grazes the surface "
"(r = 90°), so Snell's law gives n sin C = 1 × sin 90° ⟹ **n = 1/sin C** (for a medium-to-air "
"boundary; generally n₁ sin C = n₂). "
"**Deep point:** the same geometry that fails refraction perfects reflection — beyond C the "
"'refracted ray' has no real direction to go, and Fresnel's equations give 100% reflection; "
"optical fibres and prism binoculars are total internal reflection put to work.")}

A['optics/02-neb-2022.json'] = {0: (
"**Real image:** formed by the **actual intersection of refracted/reflected rays**; can be "
"caught on a **screen**; is formed **in front of** a mirror (same side as the object) or on the "
"opposite side of a lens; is always **inverted** (for a single mirror/lens); e.g. the image on "
"a cinema screen, a camera's sensor image. "
"**Virtual image:** formed at the point from which rays **appear to diverge** (the rays only "
"seem to come from there after back-extension); **cannot be caught on a screen**; forms "
"**behind** a mirror or on the object's side of a lens; is always **erect** (for a single "
"mirror/lens); e.g. the image in a plane mirror or a magnifying glass. "
"**Deep point:** the screen test is the operational difference — real images exist where the "
"rays actually cross, virtual images are a trick of ray geometry that only the eye (or camera "
"looking through the lens) can see.")}

A['optics/03-neb-2021.json'] = {0: (
"**Lens equation (real-is-positive):** 1/v + 1/u = 1/f with u = 60 cm, f = 20 cm: "
"1/v = 1/20 − 1/60 = (3 − 1)/60 = 2/60 = 1/30 ⟹ **v = 30 cm** (image 30 cm from the lens, on "
"the far side). "
"**Magnification:** m = v/u = 30/60 = **0.5**. "
"**Nature:** since v is positive (real side), the image is **real**; m < 1 and positive "
"magnitude means **diminished**; a single convex lens's real image is always **inverted**. "
"So: real, inverted, diminished, half the object's size, 30 cm beyond the lens. "
"**Deep point:** object at 3f (60 = 3 × 20) lands the image at 1.5f with m = ½ — the object-"
"outside-2f regime; checking m = v/u against the stated nature is the free verification.")}

A['optics/04-neb-2020.json'] = {0: (
"**Optical power of a lens:** the measure of its ability to **converge or diverge light**, "
"defined as the reciprocal of the focal length in metres: **P = 1/f** (f in metres). A stronger "
"(shorter-f) lens has greater power; converging lenses carry positive power, diverging negative. "
"**SI unit: the dioptre (D)** = m⁻¹ — a lens of f = 1 m has power 1 D; f = 0.5 m ⟹ 2 D; "
"f = −2 m ⟹ −0.5 D. "
"**Deep point:** power's usefulness is additivity — lenses in contact have powers that simply "
"add (P = P₁ + P₂), which is why optometrists prescribe in dioptres, not focal lengths.")}

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
    # optics/05-neb-2024.json: mirror existing solution -> answer (schema already answered)
    f = 'content/practice/questions/class-11/physics/optics/05-neb-2024.json'
    d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
    qs = d if isinstance(d, list) else d.get('questions', [])
    n = 0
    for q in qs:
        if not (q.get('answer') or '').strip() and (q.get('solution') or '').strip():
            q['answer'] = q['solution']
            n += 1
    open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
    print('mirrored solution->answer in optics/05-neb-2024.json', f'({n} answers)')
    print('TOTAL standard answers:', total)

main()

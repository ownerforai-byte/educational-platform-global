#!/usr/bin/env python
# Populate PYQ answers - physics batch 4: physical-quantities, potential/PE, quantity-of-heat,
# rate-of-heat-flow, recent-trends-in-physics
import json

A = {}

A['physical-quantities/01-neb-2024.json'] = {0: (
"**Accuracy:** how close a measurement is to the **true (accepted) value** — it depends on "
"systematic errors (calibration, zero error). **Precision:** how close repeated measurements are "
"to **each other** — the reproducibility of the reading, limited by random errors and the "
"instrument's least count. "
"**Example:** a true length is 10.00 cm. Measurements of 10.01, 9.99, 10.00 cm are both accurate "
"and precise; readings of 10.21, 10.20, 10.22 cm are **precise but not accurate** (closely "
"clustered, but clustered around the wrong value — a systematic error); readings of 9.7, 10.5, "
"10.1 cm are neither. "
"**Deep point:** precision without accuracy is a systematically wrong instrument that *agrees "
"with itself* — calibrating against a standard fixes accuracy, reducing the least count and "
"repeating measurements fixes precision.")}

A['physical-quantities/02-neb-2023.json'] = {
0: ("**Principle of homogeneity of dimensions:** a physical equation is valid only if **every term "
"added to (or equated with) another has the same dimensional formula** — dimensions cannot be "
"added or subtracted across different kinds of quantity. "
"**Check v² = u² + 2as:** [v²] = (LT⁻¹)² = **L²T⁻²**; [u²] = (LT⁻¹)² = **L²T⁻²**; "
"[2as] = [a][s] = (LT⁻²)(L) = **L²T⁻²**. All three terms are L²T⁻² ⟹ the equation is "
"dimensionally consistent. "
"**Deep point:** consistency is necessary but not sufficient — a dimensionally correct equation "
"can still be physically wrong (a factor of ½ is dimensionless and invisible to the check), but "
"a dimensionally *wrong* equation is certainly wrong."),
1: ("**Four fundamental quantities and SI units:** **length — metre (m)**; **mass — kilogram "
"(kg)**; **time — second (s)**; **electric current — ampere (A)** (also thermodynamic "
"temperature — kelvin (K), amount of substance — mole (mol), luminous intensity — candela (cd)). "
"**SI unit of mass, the kilogram:** the mass of the **international prototype kilogram** (the "
"platinum–iridium cylinder kept at Sèvres, France) — until 2019 the only base unit defined by an "
"artefact; since 2019 it is defined by fixing the **Planck constant** h = 6.62607015 × 10⁻³⁴ "
"J·s exactly. "
"**Deep point:** the 2019 redefinition ended the last artefact-based unit — the kilogram is now "
"realised from a fixed constant of nature, so it can be reproduced in any laboratory, not just "
"in one vault in France.")}

A['physical-quantities/03-neb-2022.json'] = {
0: ("**Seconds in a leap year:** 1 day = 24 × 60 × 60 = 86 400 s. "
"366 days × 86 400 s = **31 622 400 s** (= 3.16224 × 10⁷ s). "
"**Deep point:** the ordinary year (365 d) gives 31 536 000 s — the leap day adds exactly one "
"more 86 400; both are worth memorising to one significant figure (~3.16 × 10⁷ s)."),
1: ("**kg m² s⁻²** = (kg·m/s²)·m = N·m = **joule** ⟹ **(a) work**. "
"**Check the others:** force is kg·m·s⁻² (no m²); power is kg·m²·s⁻³ (one s more); impulse is "
"kg·m·s⁻¹ (one m fewer). "
"**Deep point:** reading a dimensional formula as a product of named units — here N × m — is "
"faster than matching letters; kg m² s⁻² is also the dimension of energy in *every* form "
"(kinetic, potential, heat).")}

A['potential-potential-difference-and-potential-energy/01-neb-2023.json'] = {0: (
"**Answer: (b) 1 joule per coulomb.** "
"**Reason:** potential difference is work done per unit charge, V = W/Q ⟹ 1 V = 1 J/C. "
"**Check the others:** 1 J is energy, not potential; 1 N is force; 1 A is current (C/s). "
"**Deep point:** the volt's definition hides a per-charge — every 'volt' statement (emf, p.d., "
"potential) is an energy statement about one coulomb.")}

A['potential-potential-difference-and-potential-energy/02-neb-2022.json'] = {0: (
"**Definition:** potential difference between two points is the work done per unit charge in "
"moving charge between them: **V = W/Q**. "
"**Derivation with n electrons:** if the charge flowing is carried by **n electrons**, each of "
"charge e = 1.6 × 10⁻¹⁹ C, the total charge transported is **Q = ne**. "
"Substituting in the definition: V = W/Q = W/(ne) ⟹ **W = Vne = nVe**. "
"So the work done (energy delivered by the source) equals the potential difference times the "
"number of electrons times the electronic charge — in joules if V is in volts. "
"**Deep point:** the equation W = nVe is the bridge between circuit quantities and particle "
"counting — it is why an electron accelerated through V volts gains V electron-volts of energy, "
"the definition of the eV unit.")}

A['potential-potential-difference-and-potential-energy/03-neb-2021.json'] = {0: (
"**Electric potential at a point:** the work done **per unit positive charge** in bringing a "
"small test charge from infinity to that point: **V = W/q**; SI unit **volt (V) = J/C**. It is a "
"scalar; potential due to a point charge is V = kq/r. "
"**Electric potential difference:** the work done per unit charge in moving charge **between two "
"points** (not from infinity): **V_AB = W_AB/q**; also SI unit the **volt**. "
"**Deep point:** potential is always a difference in disguise — 'the potential at a point' is "
"shorthand for the difference between that point and infinity; only differences are measurable.")}

A['potential-potential-difference-and-potential-energy/04-neb-2020.json'] = {0: (
"**Formula:** W = qV. "
"**Substitute:** q = 2 × 10⁻¹⁹ C; V = 300 V. W = 2 × 10⁻¹⁹ × 300 = **6 × 10⁻¹⁷ J**. "
"**In electron-volts:** 1 eV = 1.6 × 10⁻¹⁹ J ⟹ W = (6 × 10⁻¹⁷)/(1.6 × 10⁻¹⁹) = "
"**375 eV**. "
"**Deep point:** the eV conversion is just dividing by the electronic charge — a charge of "
"2e = 2 × 10⁻¹⁹ C moved through 300 V gains 2 × 300 = 600 eV... *if* it were exactly 2e; here "
"q = 2 × 10⁻¹⁹ C is slightly less than 2e = 3.2 × 10⁻¹⁹ C, which is why the answer is 375 eV, "
"not 600 eV — read the charge value literally.")}

A['potential-potential-difference-and-potential-energy/05-neb-2024.json'] = {
0: ("**Electric potential at a point:** the work done per unit positive charge in bringing a small "
"test charge from infinity to that point — **V = W/q**; SI unit the **volt (V = J/C)**; a "
"scalar. "
"**Relation between field and potential:** the electric field is the **negative potential "
"gradient**: **E = −dV/dr** (in magnitude, E = V/d for a uniform field) — the field points from "
"high to low potential, and its magnitude equals the rate at which potential falls per unit "
"distance. Units check: V/m = N/C ✓. "
"**Deep point:** E = −dV/dr is the most compact sentence in electrostatics — field is where "
"potential *changes*, which is why the field is zero inside a charged hollow conductor where "
"the potential is constant."),
1: ("**Formula:** V = kq/r (potential of a point charge). "
"**Substitute:** k = 9 × 10⁹; q = 2 μC = 2 × 10⁻⁶ C; r = 0.5 m. "
"V = (9 × 10⁹ × 2 × 10⁻⁶)/0.5 = (1.8 × 10⁴)/0.5 = **3.6 × 10⁴ V = 36 000 V**. "
"**Deep point:** potential falls as 1/r (not 1/r² like the field) — the gentler falloff is why "
"potential is the convenient bookkeeping quantity in circuits."),
2: ("**Equipotential surface:** a surface on which **every point is at the same potential** — "
"moving a charge anywhere on it requires no work (W = qΔV = 0). "
"**Three properties:** (1) **no work is done** in moving a charge along the surface; (2) the "
"**electric field is perpendicular** to the surface at every point (else a field component "
"along the surface would do work, contradiction); (3) **two equipotential surfaces never "
"intersect** (a point of intersection would have two potentials); also, they are crowded where "
"the field is strong. "
"**Deep point:** property (2) is the working one — field lines and equipotentials form an "
"orthogonal grid, which is how field maps are drawn from voltage measurements."),
3: ("**Electron-volt:** the kinetic energy gained by an electron (charge e) accelerated through a "
"potential difference of **1 volt**: W = eV. "
"**Conversion:** 1 eV = (1.6 × 10⁻¹⁹ C) × (1 V) = **1.6 × 10⁻¹⁹ J**. "
"**Deep point:** the eV is an *energy* unit despite the 'volt' in its name — atomic and nuclear "
"physics use it because particle energies come out in convenient numbers (a few eV for "
"chemical bonds, keV for X-rays, MeV for nuclear reactions)."),
4: ("**Formula:** electric potential energy of two point charges: U = kq₁q₂/r. "
"**Substitute:** k = 9 × 10⁹; q₁ = +3 μC = 3 × 10⁻⁶ C; q₂ = −2 μC = −2 × 10⁻⁶ C; r = 0.3 m. "
"U = (9 × 10⁹ × 3 × 10⁻⁶ × (−2) × 10⁻⁶)/0.3 = (−5.4 × 10⁻²)/0.3 = **−0.18 J**. "
"**Interpretation:** the negative sign means the unlike charges are *bound* — 0.18 J of work "
"would be needed to pull them apart to infinity. "
"**Deep point:** the sign of U carries the physics — negative for attraction (bound system), "
"positive for repulsion; magnitude alone loses half the answer."),
5: ("**Claim to show:** V_inside = V_surface = kQ/R everywhere inside a uniformly charged hollow "
"(conducting) sphere. "
"**Argument:** by Gauss's law, the field inside is **zero** (a Gaussian sphere inside encloses "
"no charge). Work done moving a test charge q from the surface to any interior point is "
"W = ∫E·dr = 0, since E = 0 along the whole path. Since potential difference is work per unit "
"charge, **V_interior − V_surface = 0** ⟹ the potential inside equals the surface value "
"V = kQ/R everywhere. "
"**Deep point:** zero *field* but non-zero constant *potential* inside is not a contradiction — "
"field measures potential's slope, and a flat potential has no slope; the interior is an "
"equipotential volume, the basis of electrostatic shielding (Faraday cage).")}

A['quantity-of-heat/01-neb-2024.json'] = {0: (
"**Specific heat capacity:** the heat required to raise the temperature of **unit mass** of a "
"substance by **one kelvin (or 1 °C)**: c = Q/(mΔT); SI unit **J kg⁻¹ K⁻¹** (water: 4200). "
"**Calculation:** Q = mcΔT with m = 200 g, c = 0.897 J/g°C, ΔT = 100 − 20 = 80 °C. "
"Q = 200 × 0.897 × 80 = 200 × 71.76 = **14 352 J ≈ 1.44 × 10⁴ J**. "
"**Deep point:** the J/g°C form lets you work in grams directly — the trap is mixing unit "
"systems (200 g with a J/kg K constant would overshoot a thousandfold).")}

A['quantity-of-heat/02-neb-2023.json'] = {
0: ("**Latent heat:** the heat absorbed or released during a **change of state** with **no change "
"in temperature** — the energy goes into rearranging molecular bonds, not into kinetic energy; "
"Q = mL, SI unit J/kg. "
"**Latent heat of fusion:** the heat needed to change unit mass from **solid to liquid** at the "
"melting point (ice → water: **334 000 J/kg ≈ 336 J/g**) — it weakens the rigid lattice. "
"**Latent heat of vaporization:** the heat needed to change unit mass from **liquid to gas** at "
"the boiling point (water → steam: **2 260 000 J/kg ≈ 2260 J/g**) — it completely separates the "
"molecules against their attraction. "
"**Why vaporization's is much larger:** separating molecules entirely (liquid → gas) requires "
"overcoming essentially all intermolecular attraction, while fusion only loosens the lattice — "
"hence L_vap ≈ 7 × L_fus for water. "
"**Deep point:** 'latent' means hidden — steam at 100 °C and water at 100 °C hold the same "
"thermometer reading but differ by 2260 J/g, the scalding reserve that makes steam burns far "
"worse than boiling-water burns."),
1: ("**Quantity of heat:** the **energy transferred** because of a temperature difference — SI "
"unit the **joule (J)** (the calorie = 4.186 J is the older unit). "
"**Specific heat capacity:** the heat required to raise the temperature of **unit mass** of a "
"substance by 1 K — SI unit **J kg⁻¹ K⁻¹** (water 4200 J/kg·K). "
"**Formula:** **Q = mcΔT** — heat needed = mass × specific heat × temperature rise. "
"**Deep point:** the formula's three factors are the three levers of any calorimetry problem — "
"more mass, a thirstier substance, or a bigger rise each scale the heat linearly.")}

A['quantity-of-heat/03-neb-2021.json'] = {0: (
"**Heat given out by the condensing steam** (two stages): (1) condensation at 100 °C: "
"Q₁ = mL = 5 × L (m = 5 g); (2) the resulting water cools 100 °C → 50 °C: "
"Q₂ = mcΔT = 5 × 4.2 × 50 = 1050 J (c = 4.2 J/g°C). "
"**Heat gained by the cold water:** Q = mcΔT = 50 × 4.2 × (50 − 30) = 50 × 4.2 × 20 = 4200 J. "
"**Energy balance (no losses):** Q₁ + Q₂ = Q ⟹ 5L + 1050 = 4200 ⟹ 5L = 3150 ⟹ "
"**L = 630 J/g**. "
"**Note:** this is far below water's accepted 2260 J/g — the given data describe a lossy or "
"idealised experiment; the method (heat lost = heat gained) is what is examined. "
"**Deep point:** steam problems always have *two* heat terms on the steam side — condensation "
"at constant temperature plus cooling of the condensate; forgetting Q₂ is the classic error.")}

A['quantity-of-heat/04-neb-2020.json'] = {0: (
"**Formula:** Q = mcΔT. "
"**Substitute:** m = 500 g = 0.5 kg; c = 4200 J/kg·K; ΔT = 60 − 20 = 40 K. "
"Q = 0.5 × 4200 × 40 = **84 000 J = 84 kJ**. "
"**Deep point:** the kg conversion (500 g → 0.5 kg) must precede multiplication when c is in "
"J/kg·K — the g/kg mismatch is the standard slip in calorimetry.")}

A['rate-of-heat-flow/01-neb-2023.json'] = {0: (
"**Rate of heat flow:** H = Q/t = 4200/4 = **1050 W** (joules per second). "
"**SI unit: the watt (W) = J/s.** "
"**Deep point:** 'rate of heat flow' is just power in thermal clothing — same unit, same "
"definition, energy divided by time.")}

A['rate-of-heat-flow/02-neb-2022.json'] = {0: (
"**Rate of flow of heat:** the **quantity of heat conducted through a body per unit time** — "
"H = Q/t. "
"**Formula (Fourier's law):** **H = kA(θ₁ − θ₂)/d** — proportional to the cross-sectional area "
"A and the temperature difference (θ₁ − θ₂), inversely proportional to the thickness d, with k "
"the thermal conductivity of the material. "
"**SI unit: the watt (W = J/s).** "
"**Deep point:** the formula's shape is an Ohm's law analogy — temperature difference is the "
"'voltage', d/(kA) the thermal 'resistance', and H the thermal 'current'.")}

A['rate-of-heat-flow/03-neb-2021.json'] = {0: (
"**Statement to derive:** the rate of loss of heat of a hot body is proportional to the "
"temperature difference between the body and its surroundings (for small differences): "
"**dQ/dt = −K(θ − θ₀)**. "
"**Derivation:** "
"**(1) Heat lost by the body in time dt:** the body's temperature falls by dθ, so the heat lost "
"is dQ = ms(−dθ) = −ms dθ (m = mass, s = specific heat; dθ < 0 as it cools). "
"**(2) Heat lost by convection:** by Newton's law of cooling (itself an empirical fact for small "
"excess temperatures, from boundary-layer convection), the heat lost per unit time is "
"proportional to the excess temperature: dQ/dt = K(θ − θ₀), where θ₀ is the surrounding "
"temperature and K a constant depending on the body's area and surface nature. "
"**(3) Equate the two expressions for dQ/dt:** −ms dθ/dt = K(θ − θ₀) ⟹ "
"**dθ/dt = −(K/ms)(θ − θ₀) = −k(θ − θ₀)**. "
"This is the **differential form of Newton's law of cooling**: the rate of fall of temperature "
"is proportional to the excess temperature. "
"**(4) Integrate:** ∫dθ/(θ − θ₀) = −k∫dt ⟹ ln(θ − θ₀) = −kt + c ⟹ "
"**θ − θ₀ = (θ₁ − θ₀)e^(−kt)** — the excess temperature decays exponentially. "
"**Deep point:** the derivation is a heat-balance statement — heat lost by the body equals heat "
"convected away — and its signature prediction is the exponential decay of excess temperature, "
"which is why a cooling coffee approaches room temperature asymptotically, never reaching it.")}

A['rate-of-heat-flow/04-neb-2020.json'] = {0: (
"**Answer: (b) watt.** "
"**Reason:** rate of flow of heat = energy/time = J/s = **W** (from H = kAΔθ/d, with k in "
"W/m·K, A in m², Δθ in K, d in m). "
"**Check the others:** joule is energy (not a rate); calorie is an energy unit; 'calorie per "
"square metre' is neither energy nor power. "
"**Deep point:** any 'rate of' quantity is its base quantity over time — heat rate inherits the "
"watt just as velocity inherits m/s.")}

A['rate-of-heat-flow/05-neb-2024.json'] = {
0: ("**Conduction:** heat transfer through a material **without bulk movement of the matter** — "
"energy passes molecule to molecule / by free electrons; *example:* a metal spoon handle heating "
"up in hot tea. **Convection:** heat transfer by the **bulk motion of the fluid itself** — hot "
"less-dense fluid rises, cool fluid sinks, setting up convection currents; *example:* boiling "
"water circulating in a pot, sea breeze. **Radiation:** heat transfer by **electromagnetic "
"waves (infrared)** requiring **no material medium** and working even through vacuum; "
"*example:* the Sun warming the Earth, heat felt from a fire. "
"**Deep point:** the three need progressively less matter — conduction needs a solid contact, "
"convection needs a fluid that can flow, radiation needs nothing at all."),
1: ("**Fourier's law of heat conduction:** the rate of heat flow through a conductor is "
"**proportional to the cross-sectional area A and the temperature gradient**, and inversely "
"proportional to the length: **H = dQ/dt = −kA dθ/dx**, or for a uniform rod of length d with "
"end temperatures θ₁, θ₂: **H = kA(θ₁ − θ₂)/d**. "
"**Terms:** **k** — the thermal conductivity of the material (W/m·K), measuring how well it "
"conducts; **A** — cross-sectional area through which heat flows; **(θ₁ − θ₂)/d** — the "
"temperature gradient (fall of temperature per unit length); the minus sign records that heat "
"flows from hot to cold, down the gradient. "
"**Deep point:** the law is thermal Ohm's law — Δθ is the driving 'voltage', d/kA the thermal "
"resistance, H the current; insulation problems are resistor networks in disguise."),
2: ("**Formula:** H = kA(θ₁ − θ₂)/d. "
"**Substitute:** k = 400 W/m·K; A = 4 cm² = 4 × 10⁻⁴ m²; θ₁ − θ₂ = 100 °C; d = 0.5 m. "
"H = (400 × 4 × 10⁻⁴ × 100)/0.5 = (16)/0.5 = **32 W**. "
"**Deep point:** the cm² → m² conversion (÷10⁴) is the slip point; the answer's modesty — only "
"32 W through a good conductor — shows how much area matters, since copper's huge k is divided "
"by a small A."),
3: ("**Stefan's law (Stefan–Boltzmann law):** the total energy radiated per unit time per unit "
"surface area of a **black body** is proportional to the **fourth power of its absolute "
"temperature**: **E = σT⁴**, with σ = 5.67 × 10⁻⁸ W/m²·K⁴ (for a non-black body, "
"E = eσT⁴ with emissivity e ≤ 1). "
"**Doubling T:** T → 2T ⟹ E → σ(2T)⁴ = 16σT⁴ ⟹ radiated power increases by a factor of "
"**16**. "
"**Deep point:** the fourth power is why radiation dominates at high temperature — doubling the "
"kelvin temperature multiplies radiated output sixteenfold, which is why white-hot objects "
"blaze while warm ones barely glow."),
4: ("**Blackened bottoms:** black surfaces are **good absorbers (and good emitters)** of "
"radiation — a blackened base absorbs the flame's radiant heat fastest, putting the heat into "
"the food rather than reflecting it. **White clothes in summer:** white surfaces are **good "
"reflectors and poor absorbers** — they reflect most of the Sun's radiation instead of "
"absorbing it, keeping the wearer cooler; black clothes would absorb it and heat up. "
"**Deep point:** absorption and emission are two faces of the same surface property (Kirchhoff's "
"law) — good absorbers are good emitters, which is also why the *inside* of a thermos flask is "
"silvered: to reflect radiation both ways."),
5: ("**Newton's law of cooling:** the rate of loss of heat of a body is **directly proportional "
"to the difference between its temperature and that of its surroundings** (valid for small "
"excess temperatures): dQ/dt = K(θ − θ₀), or in temperature terms dθ/dt = −k(θ − θ₀), giving "
"exponential decay of the excess temperature: θ − θ₀ = (θ₁ − θ₀)e^(−kt). "
"**Practical application:** **estimating time of death in forensics** — measuring a corpse's "
"temperature and applying the cooling law gives the time since body temperature began falling "
"toward ambient (also: designing cooling of electronics, and predicting how long food/drinks "
"take to cool). "
"**Deep point:** the law is a small-difference approximation of the full convection+radiation "
"physics — it fails when the excess temperature is large, which is why it is always stated with "
"the qualifier 'for small temperature differences'.")}

A['recent-trends-in-physics/01-neb-2023.json'] = {0: (
"**Superconductivity:** the phenomenon in which certain materials, cooled below a **critical "
"temperature T_c**, lose **all electrical resistance** (ρ = 0) and expel magnetic fields "
"(**Meissner effect**) — a current induced in a superconducting ring flows for years without "
"decay. "
"**Two properties:** (1) **zero electrical resistance** below T_c; (2) **perfect diamagnetism** "
"— the Meissner effect, in which the superconductor expels an applied magnetic field from its "
"interior (basis of magnetic levitation). "
"**Materials:** **mercury** (Onnes' 1911 discovery, T_c = 4.2 K); also niobium, lead, and "
"high-T_c ceramics like YBa₂Cu₃O₇ (~93 K, above liquid-nitrogen temperature). "
"**Deep point:** zero resistance is not just very low resistance — it is a distinct quantum "
"state (Cooper pairs moving without scattering), which is why warming past T_c destroys it "
"abruptly rather than gradually.")}

A['recent-trends-in-physics/02-neb-2022.json'] = {
0: ("**Elementary particles:** the fundamental constituents of matter that (in the current "
"Standard Model) have no known substructure — **quarks, leptons (electron, muon, neutrinos), "
"and gauge bosons (photon, gluon, W and Z)** — plus the Higgs boson; they are the particles from "
"which all matter is built and which mediate the fundamental interactions. "
"**Four fundamental forces, strongest first:** (1) **strong nuclear force** (binds quarks and "
"nucleons; range ~10⁻¹⁵ m); (2) **electromagnetic force** (acts on electric charge; infinite "
"range; binds atoms and molecules); (3) **weak nuclear force** (responsible for beta decay; "
"range ~10⁻¹⁸ m); (4) **gravitational force** (weakest, but infinite range and always "
"attractive, so it dominates at astronomical scales). "
"**Deep point:** relative strengths at nuclear scales are roughly 1 : 10⁻² : 10⁻⁶ : 10⁻³⁹ — "
"gravity is staggeringly weaker than the rest, yet rules the cosmos because mass is always "
"attractive and never cancelled like charge."),
1: ("**Ruby laser (three-level laser):** "
"**Structure:** a ruby rod (Al₂O₃ doped with ~0.05% Cr³⁺ ions) with its ends polished parallel "
"and mirrored — one fully silvered, one partially silvered — wrapped by a helical flash lamp "
"(optical pumping source). "
"**Working:** (1) **Absorption (pumping):** the flash lamp's green/blue light raises Cr³⁺ ions "
"from the ground state E₁ to the broad pump band E₃. (2) **Fast non-radiative decay:** ions drop "
"quickly (phonon emission, ~10⁻⁷ s) to the **metastable level E₂**, where they linger "
"(~10⁻³ s — much longer than ordinary excited states). (3) **Population inversion:** pumping "
"accumulates more ions in E₂ than in E₁ — a non-equilibrium condition. (4) **Stimulated "
"emission:** a spontaneously emitted photon of wavelength **694.3 nm** (red) travelling along "
"the rod axis triggers other excited ions to emit identical photons — same frequency, phase, "
"direction. (5) **Optical resonance:** the end mirrors reflect photons back and forth, "
"amplifying the beam on each pass; the partially silvered end leaks out the intense, "
"monochromatic, coherent, highly directional red laser beam. "
"**Three uses of lasers:** (1) **surgery and medicine** — bloodless eye (retina/LASIK) surgery, "
"tumour removal; (2) **communication and data** — fibre-optic links, CD/DVD/Blu-ray reading, "
"LiDAR; (3) **measurement and industry** — precision distance measurement (Earth–Moon ranging), "
"cutting, welding and drilling of metals. "
"**Deep point:** the metastable level is the design's keystone — without a long-lived state "
"there is no population inversion, and without inversion stimulated emission cannot dominate "
"spontaneous emission; every laser is an engineering answer to that one problem.")}

A['recent-trends-in-physics/03-neb-2021.json'] = {0: (
"**Big Bang theory:** the universe began about **13.8 billion years ago** from an extremely hot, "
"dense state and has been **expanding and cooling ever since**; the early universe was "
"radiation-dominated, forming the light nuclei (H, He) in the first minutes (nucleosynthesis) "
"and becoming transparent ~380 000 years in (recombination, releasing the cosmic microwave "
"background). "
"**Hubble's law:** galaxies recede with velocity proportional to their distance — "
"**v = H₀d** (H₀ ≈ 70 km/s per megaparsec); observed as the **redshift** of galactic spectra, "
"and interpreted as the stretching of space itself, not galaxies flying through space. "
"**Evidence for the expanding universe:** (1) **Hubble's redshift–distance law** — the recession "
"velocity of galaxies grows linearly with distance; (2) the **cosmic microwave background (CMB)** "
"— the cooled (~2.7 K) relic radiation of the hot early universe, matching the prediction of a "
"fireball phase; (3) the **abundance of light elements** (≈75% H, 25% He by mass) matching Big "
"Bang nucleosynthesis calculations; (4) the large-scale distribution and evolution of galaxies "
"consistent with gradual structure formation from a hot uniform start. "
"**Deep point:** the three independent lines — redshifts, CMB, light-element abundances — "
"converge on the same early-universe parameters; a static or steady-state universe predicts "
"none of them, which is why the evidence is considered decisive.")}

A['recent-trends-in-physics/04-neb-2024.json'] = {
0: ("**Big Bang theory:** the universe originated ~13.8 billion years ago from an ultra-hot, "
"ultra-dense state and has expanded and cooled ever since; light nuclei formed in the first "
"minutes, and the universe became transparent ~380 000 years in, releasing the cosmic microwave "
"background. "
"**Hubble's law:** galaxies recede at velocity proportional to distance — **v = H₀d** "
"(H₀ ≈ 70 km/s/Mpc), observed as galactic redshift, meaning space itself stretches. "
"**Evidence:** (1) Hubble's redshift–distance law; (2) the **cosmic microwave background** "
"(~2.7 K relic radiation); (3) **light-element abundances** (~75% H, 25% He) matching "
"nucleosynthesis predictions; (4) galaxy evolution consistent with formation from a hot uniform "
"beginning. **Deep point:** redshifts, CMB and abundances are three independent measurements "
"converging on one model — the convergent triangulation is what makes the case strong."),
1: ("**Elementary particles:** the fundamental, structureless constituents of matter in the "
"Standard Model — quarks, leptons (e.g. electron, neutrino), and force-carrying bosons (photon, "
"gluon, W, Z), plus the Higgs boson. "
"**Four fundamental forces (decreasing strength):** (1) **strong nuclear**; (2) "
"**electromagnetic**; (3) **weak nuclear**; (4) **gravitational**. "
"**Deep point:** strength order is the exam answer, but the range order is the insight — the "
"strong and weak forces are short-ranged (nuclear scale), while electromagnetism and gravity "
"reach across the universe."),
2: ("**Photoelectric effect:** the emission of **electrons from a metal surface** when light of "
"sufficiently high frequency falls on it — emission is instantaneous, and no electrons are "
"emitted below a threshold frequency regardless of intensity. "
"**Einstein's equation:** **hν = φ + ½mv²_max**, where **hν** is the energy of one photon "
"(h = Planck's constant, ν = frequency), **φ = hν₀** is the **work function** (minimum energy to "
"free an electron from the metal, ν₀ = threshold frequency), and **½mv²_max** is the maximum "
"kinetic energy of the emitted photoelectron. "
"**Explanation of terms:** each photon gives all its energy to one electron; the electron first "
"pays the exit fee φ, and whatever remains becomes kinetic energy — hence K_max depends "
"linearly on frequency and not at all on intensity (intensity only sets the *number* of "
"electrons). "
"**Deep point:** the equation is energy conservation for a single photon–electron transaction — "
"its success (Millikan's verification) is what established the photon and earned Einstein the "
"Nobel Prize."),
3: ("**de Broglie's hypothesis:** every moving particle has a **wave associated with it**, of "
"wavelength **λ = h/p = h/mv** — matter has wave nature just as light has particle nature; the "
"wave nature is negligible for macroscopic objects but measurable for electrons. "
"**Calculation:** an electron accelerated through V = 100 V gains kinetic energy "
"E = eV = 1.6 × 10⁻¹⁷ J. Its momentum p = √(2mE) = √(2 × 9.1 × 10⁻³¹ × 1.6 × 10⁻¹⁷) "
"= √(2.912 × 10⁻⁴⁷) ≈ 5.4 × 10⁻²⁴ kg·m/s. "
"λ = h/p = (6.63 × 10⁻³⁴)/(5.4 × 10⁻²⁴) ≈ **1.23 × 10⁻¹⁰ m ≈ 1.2 Å** — comparable to atomic "
"spacings, which is why electron diffraction works and electron microscopes resolve atoms. "
"**Deep point:** the shortcut λ = 12.27/√V Å (V in volts) gives 12.27/10 = 1.23 Å instantly; "
"the wavelength being atomic-sized is the physical reason electrons, not cricket balls, show "
"interference."),
4: ("**Nanotechnology:** the design, production and application of structures and devices with "
"dimensions in the **1–100 nanometre range** — where materials acquire new properties "
"(quantum confinement, enormous surface-to-volume ratio, size-tunable colour and reactivity). "
"**Two approaches:** **(1) Top-down:** start with bulk material and **carve/etch it down** to "
"nano-scale (lithography, etching, ball milling) — like sculpting. **(2) Bottom-up:** build "
"nanostructures **atom by atom or molecule by molecule** (self-assembly, chemical synthesis, "
"deposition) — like bricklaying. "
"**One application:** gold/silver **nanoparticles in targeted cancer therapy** (heat delivered "
"only at tumour sites), or **sunscreen with ZnO/TiO₂ nanoparticles** that block UV while "
"staying transparent, or carbon-nanotube composites, or nano-drug delivery. "
"**Deep point:** the two approaches are inverse arrows — milling a statue vs growing a crystal "
"— and real nanofabrication usually chains both: top-down patterning of the scaffold, bottom-up "
"growth of the functional layer."),
5: ("**GPS (Global Positioning System):** a navigation system of **~24 satellites** in medium "
"Earth orbit, each continuously broadcasting its position and time; a receiver on Earth "
"receives signals from **at least four satellites** and solves for its own position (latitude, "
"longitude, altitude) and clock error. "
"**Physical principles it depends on:** (1) **geometry of distances from known points** — "
"trilateration: each satellite signal gives a distance (light speed × travel time), and "
"intersection of spheres fixes the position; (2) **precise time measurement** — nanosecond "
"timing of signal travel; crucially, **relativity**: satellite clocks run faster than ground "
"clocks by ~38 μs/day (special-relativistic slowing −7 μs + general-relativistic speeding +45 "
"μs), which must be corrected or positions drift by ~10 km/day. "
"**Two other modern applications of physics:** **medical imaging** (MRI from nuclear magnetic "
"resonance; CT from X-ray absorption) and **semiconductor electronics** (quantum band theory "
"behind every chip); also fibre-optic communication (total internal reflection), lasers, "
"satellite communication. "
"**Deep point:** GPS is the everyday proof of relativity — without the 38-microsecond daily "
"correction the system would be useless within hours; a navigation utility is secretly a "
"relativity experiment.")}

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
    print('TOTAL standard answers:', total)

main()

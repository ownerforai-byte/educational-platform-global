#!/usr/bin/env python
# Populate PYQ answers - physics batch 1: capacitor, circular-motion, dc-circuits
# (no BOM on write)
import json

A = {}

A['capacitor/01-neb-2023.json'] = {0: (
"**Definition:** capacitance is the ratio of the charge stored on a conductor to the potential "
"difference between it and earth (or between the two plates of a capacitor): **C = Q/V**. Its SI unit "
"is the **farad (F)**: 1 F = 1 coulomb per volt. A 1 F capacitor stores 1 C of charge at 1 V. "
"**Derivation (parallel plate):** consider two parallel plates of area A, separation d, carrying "
"charges +Q and −Q, with surface charge density σ = Q/A. "
"(1) **Field between the plates:** by Gauss's law, each plate produces E = σ/2ε₀ between them; the two "
"fields add in the gap and cancel outside, so the resultant field is "
"**E = σ/ε₀ = Q/(ε₀A)**, uniform between the plates. "
"(2) **Potential difference:** for a uniform field, V = Ed = Qd/(ε₀A). "
"(3) **Capacitance:** C = Q/V = Q / (Qd/ε₀A) = **C = ε₀A/d**. "
"Capacitance increases with plate area, decreases with separation, and is filled-space independent of "
"charge — with a dielectric (constant K) it becomes C = Kε₀A/d. "
"**Deep point:** the derivation is a three-step ladder — Gauss gives E, E gives V, V gives C — and "
"the final formula contains no Q or V, which is the physical statement that capacitance is a "
"property of the geometry, not of the charge.")}

A['capacitor/02-neb-2022.json'] = {0: (
"**Formula:** energy stored in a capacitor, U = ½CV². "
"**Substitute:** C = 6 μF = 6 × 10⁻⁶ F; V = 100 V. "
"U = ½ × 6 × 10⁻⁶ × (100)² = ½ × 6 × 10⁻⁶ × 10⁴ = 3 × 10⁻² J = **0.03 J**. "
"**Deep point:** the V² dependence is the memory hook — doubling the charging voltage quadruples "
"the stored energy, which is why capacitor banks are rated in volts as much as in farads.")}

A['capacitor/03-neb-2024.json'] = {
0: ("**Definition:** capacitance C = Q/V — the charge stored per unit potential difference; SI unit the "
"**farad** (1 F = 1 C/V). **Derivation:** plates of area A, separation d, charge Q, surface density "
"σ = Q/A. (1) By Gauss's law the field between the plates is E = σ/ε₀ = Q/(ε₀A) (the two plates' "
"fields add in the gap, cancel outside); (2) for a uniform field V = Ed = Qd/(ε₀A); (3) "
"C = Q/V = **ε₀A/d** (with dielectric K: C = Kε₀A/d). **Deep point:** the formula contains neither Q "
"nor V — capacitance is geometry (area up, gap down), not charge."),
1: ("**Formula:** C = ε₀A/d (air). **Substitute:** A = 0.04 m²; d = 2 mm = 2 × 10⁻³ m. "
"C = (8.85 × 10⁻¹² × 0.04)/(2 × 10⁻³) = (3.54 × 10⁻¹³)/(2 × 10⁻³) = **1.77 × 10⁻¹⁰ F ≈ 177 pF**. "
"**Deep point:** the pF scale is the everyday reality of air capacitors — ε₀'s tiny value means "
"practical capacitances live in picofarads unless area is huge or a high-K dielectric is used."),
2: ("**(i) Series:** 1/C = 1/C₁ + 1/C₂ = 1/2 + 1/3 = 5/6 ⟹ C = 6/5 = **1.2 μF** (smaller than either — "
"series reduces capacitance, same charge on each). **(ii) Parallel:** C = C₁ + C₂ = 2 + 3 = "
"**5 μF** (larger than either — parallel adds plate area, same voltage on each). "
"**Deep point:** series and parallel capacitors combine opposite to resistors — memorise it as "
"'capacitors add in parallel, reciprocals add in series', and check the sanity: series must come "
"out below the smallest, parallel above the largest."),
3: ("**U = ½CV²** = ½ × 12 × 10⁻⁶ × (100)² = ½ × 12 × 10⁻⁶ × 10⁴ = 6 × 10⁻² J = **0.06 J**. "
"**Deep point:** same arithmetic as any ½CV² question — convert μF to F first, and the volts "
"squared does the scaling."),
4: ("**Dielectric:** an insulating material (paper, mica, glass, ceramic) placed between capacitor "
"plates; its molecules have no free charges but polarise in a field. **How it increases "
"capacitance:** when the slab fills the gap, its molecules polarise — positive ends face the "
"negative plate and vice versa — producing an **induced internal field opposite to the applied "
"field**. The net field inside falls to E/K (K = dielectric constant > 1), so the potential "
"difference for the *same charge* falls to V/K; since C = Q/V and Q is unchanged, "
"**C rises to K times its air value**: C = Kε₀A/d. (Equivalently, at constant V the polarised "
"surface charges let the plates hold K times more charge.) **Deep point:** the dielectric never "
"conducts — it *screens*: the induced field is the mechanism, and K is just the ratio measuring "
"how well the material screens."),
5: ("**Four uses of capacitors:** (1) **storing charge/energy** — camera flash, defibrillators, SMPS "
"filters; (2) **smoothing/filtering** in power supplies (rectifier output → steady DC); (3) "
"**tuning circuits** in radios (variable capacitor sets the resonant frequency); (4) **blocking DC "
"while passing AC** — coupling stages in amplifiers; (also: time-delay circuits with resistors, "
"motor starting, power-factor correction). **Deep point:** every use trades on one property — a "
"capacitor stores charge in an electric field and resists sudden voltage changes.")}

A['circular-motion/01-neb-2023.json'] = {
0: ("**Definition:** centripetal acceleration is the acceleration of a body in uniform circular motion, "
"directed **along the radius toward the centre** of the circle, with magnitude "
"**a = v²/r = ω²r** — it changes the direction of the velocity, not its speed. "
"**Derivation:** a body moves with constant speed v around a circle of radius r. In time Δt its "
"velocity vector turns through angle Δθ = vΔt/r (arc = radius × angle). Draw the velocity vectors v "
"and v′ at the two positions with their tails together: the triangle of velocity vectors is "
"**similar** to the triangle formed by the two radii (both isosceles with the same vertex angle "
"Δθ). Hence |Δv|/v = (chord length)/r, and for small Δt the chord ≈ vΔt, giving "
"|Δv| = v²Δt/r. Therefore **a = |Δv|/Δt = v²/r**, directed along Δv — which points toward the "
"centre as Δt → 0. With v = ωr: a = ω²r. "
"**Deep point:** the derivation's engine is the similarity of the two isosceles triangles — space "
"triangle of radii, velocity triangle of vectors — and the direction statement ('toward the centre') "
"is half the definition's marks."),
1: ("**Angular velocity:** ω = 2πN/60 = 2π × 300/60 = 2π × 5 = **10π ≈ 31.4 rad/s**. "
"**Linear speed:** v = ωr = 31.4 × 0.5 = **15.7 m/s**. "
"**Centripetal acceleration:** a = ω²r = (31.4)² × 0.5 = 986 × 0.5 ≈ **493 m/s²** "
"(or a = v²/r = 15.7²/0.5 ≈ 493 m/s²). "
"**Deep point:** the three answers chain through one relation, v = ωr — convert rpm to rad/s first "
"(÷60, ×2π), and every rim quantity follows.")}

A['circular-motion/02-neb-2022.json'] = {
0: ("**Angular velocity:** ω = v/r = 10/50 = **0.2 rad/s**. "
"**Centripetal acceleration:** a = v²/r = (10)²/50 = 100/50 = **2 m/s²**, directed toward the "
"centre of the turn. "
"**Deep point:** two formulas, one division each — and the direction clause ('toward the centre') "
"is the physics half of the centripetal answer."),
1: ("**Orbital speed:** for a circular orbit, gravity supplies the centripetal force: "
"GMm/r² = mv²/r ⟹ **v = √(GM/r)**. "
"**Orbit radius:** r = R + h = 6.4 × 10⁶ + 6 × 10⁵ = 7.0 × 10⁶ m. "
"**Substitute:** v = √(6.67 × 10⁻¹¹ × 6 × 10²⁴ / 7 × 10⁶) = √(4.002 × 10¹⁴/7 × 10⁶) "
"= √(5.717 × 10⁷) ≈ **7.56 × 10³ m/s ≈ 7.6 km/s**. "
"**Deep point:** v = √(GM/r) contains no satellite mass — orbital speed is set by the planet and "
"the orbit's radius alone, the same mass-independence that makes all masses fall alike.")}

A['circular-motion/03-neb-2024.json'] = {
0: ("**Definition:** centripetal acceleration is the acceleration of uniform circular motion, directed "
"**radially inward (toward the centre)**, of magnitude a = v²/r = ω²r; it changes the velocity's "
"direction at constant speed. **Derivation:** in time Δt the velocity vector rotates through "
"Δθ = vΔt/r. Placing v and v′ tail-to-tail, the velocity triangle is similar to the radius triangle "
"(both isosceles, same angle Δθ), so |Δv|/v = chord/r ≈ (vΔt)/r for small Δt ⟹ "
"|Δv| = v²Δt/r ⟹ **a = v²/r**, pointing along Δv toward the centre; with v = ωr, a = ω²r. "
"**Deep point:** the two similar isosceles triangles are the whole proof — one in space (radii), "
"one in velocity space (vectors)."),
1: ("**ω = v/r** = 10/50 = **0.2 rad/s**; **a = v²/r** = 100/50 = **2 m/s²** toward the centre. "
"**Deep point:** quote the direction — centripetal acceleration without 'toward the centre' is half "
"an answer."),
2: ("**Derivation:** for a vehicle on a banked road of angle θ (no friction needed), resolve forces: "
"normal reaction N acts perpendicular to the road surface; weight mg vertically down. "
"**Vertical equilibrium:** N cos θ = mg. **Horizontal (centripetal):** N sin θ = mv²/r. "
"**Divide:** tan θ = v²/(rg) ⟹ **θ = tan⁻¹(v²/rg)**. "
"**Calculation:** tan θ = (20)²/(100 × 10) = 400/1000 = 0.4 ⟹ **θ = tan⁻¹(0.4) ≈ 21.8°**. "
"**Deep point:** the two resolved equations are the derivation — vertical for balance, horizontal "
"for the circle — and their ratio eliminates N, leaving tan θ = v²/rg."),
3: ("**Condition at the top:** to just complete the loop, the string's tension (or the track's normal "
"force) is zero at the top and gravity alone supplies the centripetal force: "
"mg = mv²_top/r ⟹ **v_top = √(gr)**. "
"**Substitute:** v_top = √(9.8 × 1) = √9.8 ≈ **3.13 m/s**. "
"**Deep point:** 'minimum' in vertical-circle questions always means 'tension/normal force = 0 at "
"the top' — gravity exactly doing the centripetal job is the boundary between completing the loop "
"and falling away."),
4: ("**Conical pendulum:** the bob moves in a horizontal circle; the string traces a cone. "
"**Resolve:** T cos θ = mg (vertical); T sin θ = mv²/r (horizontal, centripetal), with r = L sin θ. "
"**Period:** T sin θ/T cos θ = v²/(rg) ⟹ tan θ = v²/(rg); with v = 2πr/T_time: "
"**T_time = 2π√(L cos θ/g)**. "
"**Substitute:** L = 1 m, θ = 30°, cos 30° = 0.866: "
"T_time = 2π√(1 × 0.866/9.8) = 2π√0.0884 = 2π × 0.297 ≈ **1.87 s**. "
"**Deep point:** the conical pendulum's period depends on the *horizontal* projection (L cos θ), "
"not the string length — a shorter effective pendulum swings faster, which is why θ ↑ gives a "
"shorter period."),
5: ("**Angular velocity:** ω = 2πN/60 = 2π × 300/60 = **31.4 rad/s**. "
"**Radius:** r = d/2 = 0.4 m. **Linear speed:** v = ωr = 31.4 × 0.4 = **12.6 m/s**. "
"**Deep point:** the diameter-to-radius step is the only trap — ω comes from the rotation rate, but "
"v = ωr needs the radius, not the diameter.")}

A['dc-circuits/01-neb-2022.json'] = {0: (
"**Kirchhoff's laws:** **(1) Current law (junction rule):** the algebraic sum of currents meeting at "
"a junction is zero — ΣI = 0 (charge conservation: charge neither accumulates nor vanishes at a "
"junction). **(2) Voltage law (loop rule):** the algebraic sum of potential differences (emfs and "
"IR drops) around any closed loop is zero — Σε = ΣIR (energy conservation: a charge returning to "
"its starting point has zero net energy change). "
"**Worked example:** a cell of emf ε = 6 V, internal resistance r = 1 Ω, drives two resistors R₁ = "
"2 Ω and R₂ = 3 Ω in series. **Loop equation:** ε = I(R₁ + R₂ + r) ⟹ I = 6/(2 + 3 + 1) = "
"**1 A**. (Checks: terminal voltage V = ε − Ir = 6 − 1 = 5 V = I(R₁ + R₂) = 1 × 5 ✓.) "
"**Deep point:** the two laws are the two conservation principles in circuit clothing — charge "
"(junction) and energy (loop) — and every circuit solution is just their bookkeeping.")}

A['dc-circuits/02-neb-2021.json'] = {0: (
"**Parallel resistance:** 1/R = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1 ⟹ **R = 1 Ω**. "
"**Total current:** I = V/R = 12/1 = **12 A**. "
"**(Check by branches:** I₂Ω = 6 A, I₃Ω = 4 A, I₆Ω = 2 A; sum = 12 A ✓.**)** "
"**Deep point:** the parallel-6 pairing (2, 3, 6) is built to collapse to 1 Ω — always sum the "
"branch currents as a check; if they don't add to the total current, a reciprocal slipped.")}

A['dc-circuits/03-neb-2024.json'] = {
0: ("**Kirchhoff's laws:** (1) **junction rule** — ΣI = 0 at any junction (charge conservation); "
"(2) **loop rule** — Σε = ΣIR around any closed loop (energy conservation). "
"**Application:** single loop with emf ε = 5 V, internal resistance r = 2 Ω, external R = 5 Ω: "
"ε = I(R + r) ⟹ I = 5/(5 + 2) = **5/7 ≈ 0.71 A**. "
"**Deep point:** with one loop, Kirchhoff's loop rule *is* the whole circuit equation — emf equals "
"the sum of all drops, internal and external."),
1: ("**Branch currents (same 12 V across each):** I₆ = V/R = 12/6 = **2 A**; I₃ = 12/3 = **4 A**. "
"**Total current:** I = 2 + 4 = **6 A** (equivalently R = 6×3/(6+3) = 2 Ω, I = 12/2 = 6 A ✓). "
"**Deep point:** in parallel, voltage is common and currents add — the product-over-sum "
"resistance is just the shortcut to the same total."),
2: ("**Wheatstone bridge principle:** four resistances P, Q, R, S form a quadrilateral fed by a cell "
"across one diagonal and a galvanometer across the other; when the bridge is **balanced** "
"(galvanometer shows no deflection), no current flows through the galvanometer branch and the two "
"voltage dividers agree — the potential at the galvanometer's ends is equal. "
"**Balance condition: P/Q = R/S** (product of opposite arms equal: PS = QR). "
"**Deep point:** 'no deflection' is the experimental signature and P/Q = R/S the algebraic "
"translation — the bridge measures an unknown resistance by comparison, null methods being "
"immune to meter errors."),
3: ("**Current:** I = ε/(R + r) = 2/(3.5 + 0.5) = 2/4 = **0.5 A**. "
"**Terminal voltage:** V = ε − Ir = 2 − 0.5 × 0.5 = 2 − 0.25 = **1.75 V** "
"(equivalently V = IR = 0.5 × 3.5 = 1.75 V ✓). "
"**Deep point:** the two routes to V (subtract the internal drop, or multiply the external drop) "
"must agree — their agreement is the check that r was included once, not twice."),
4: ("**Drift velocity:** the average velocity acquired by free electrons in a conductor along the "
"field direction, superimposed on their random thermal motion — small (≈mm/s) because collisions "
"with the lattice repeatedly reset the motion. **Derivation of I = neAv_d:** in time t, every "
"electron within a length v_d t of a cross-section A passes through it — a cylinder of volume "
"A v_d t containing **n A v_d t** electrons (n = number density), carrying charge "
"q = neAv_d t. **Current** is charge per time: **I = q/t = neAv_d**. "
"**Deep point:** the derivation is geometry, not electronics — count the electrons in the drift "
"cylinder; the formula's four factors (density, charge, area, drift speed) are exactly the four "
"things that set a wire's current."),
5: ("**Potentiometer principle:** the potential drop across a uniform resistance wire is "
"**proportional to its length** when a steady current flows (V = kL, k = fall of potential per "
"unit length); a sliding contact taps any desired potential difference along the wire. Because it "
"balances an unknown emf against a measured length **without drawing current from the cell at "
"balance**, it measures true emf (no internal-drop error). "
"**Comparing two emfs:** connect cell 1, find the balance length L₁ (galvanometer null); connect "
"cell 2, find balance length L₂. Since each emf equals k × its balance length: "
"**ε₁/ε₂ = L₁/L₂**. **Deep point:** the null method is the potentiometer's whole virtue — at "
"balance no current flows through the cell, so the reading is the emf itself, unpolluted by "
"internal resistance.")}

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

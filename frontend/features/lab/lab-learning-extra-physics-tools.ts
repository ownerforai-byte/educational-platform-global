/**
 * Learning packs for the physics calculators and interactive sims that had
 * none — previously "Under progress — will be added in a future update".
 *
 * Same `LabLearningPack` shape as `lab-learning.ts`; merged by
 * `getLabLearning`. Each pack teaches the physics BEHIND the tool: a worked
 * numerical case with real numbers, the concept backbone, the standard
 * wrong beliefs, and practice questions.
 */

import type { LabLearningPack } from "./lab-learning";

export const EXTRA_LEARNING_PHYSICS_TOOLS: Record<string, LabLearningPack> = {
  "ph-calc-ohms": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "12 V battery (internal resistance r = 0.5 Ω) driving a 5.5 Ω resistor",
      steps: [
        { text: "Current through the whole loop — emf over total resistance:", math: "I = E/(R + r) = 12/(5.5 + 0.5) = 2.0 A" },
        { text: "Terminal voltage — what the battery actually delivers under load:", math: "V = E − I·r = 12 − 2·0.5 = 11 V (not 12!)" },
        { text: "Power delivered to the load:", math: "P_R = I²R = 4·5.5 = 22 W" },
        { text: "Power wasted inside the battery:", math: "P_r = I²r = 4·0.5 = 2 W" },
        { text: "Efficiency of delivery:", math: "η = 22/24 = 91.7%" },
        { text: "Maximum-power check — load matched to internal resistance (R = r):", math: "P_max = E²/4r = 144/2 = 72 W, but then η drops to 50%" },
      ],
      takeaway: "Ohm's law is about the whole loop: the battery's emf is split between the external circuit and its own internal resistance, and the terminal voltage you measure depends on the current you draw.",
    },
    theory: [
      {
        heading: "Ohm's law, emf and terminal voltage",
        body: "V = IR holds for a metallic conductor at constant temperature — it is a material property, not a universal law (diodes and filament lamps violate it). For a real battery, emf E is the open-circuit voltage and terminal voltage V = E − Ir sags as load current grows; V = E only when I = 0. An ideal ammeter (0 Ω) goes in series, an ideal voltmeter (∞ Ω) in parallel.",
      },
      {
        heading: "Series, parallel, and Kirchhoff",
        body: "Series resistances add (same current, voltages share); parallel resistances combine as 1/R = 1/R₁ + 1/R₂ (same voltage, currents share). Kirchhoff's junction rule (charge conservation) and loop rule (energy conservation) solve any network: at every junction ΣI = 0, around every loop ΣE = ΣIR.",
      },
    ],
    confusions: [
      {
        wrong: "A voltmeter across a battery always reads its emf.",
        right: "It reads the terminal voltage E − Ir. Under heavy load (a starter motor), a 12 V car battery can sag to 9 V.",
        why: "Labelled '12 V' on the casing, so the label is trusted over the load line.",
      },
      {
        wrong: "Resistance and resistivity are the same thing.",
        right: "R = ρL/A: resistivity ρ is a property of the MATERIAL (copper ≈ 1.7×10⁻⁸ Ω·m), resistance R belongs to a specific OBJECT (longer wire → bigger R, thicker wire → smaller R).",
        why: "Both share the unit ohm in casual speech, so the distinction dissolves.",
      },
      {
        wrong: "Current gets used up as it goes around the circuit.",
        right: "Charge is conserved — the same current enters and leaves every series element. What decreases is the ENERGY per charge (voltage drops across each resistor).",
        why: "Bulbs get dimmer along a series string, which looks like 'used-up current'.",
      },
    ],
    questions: [
      { q: "6 Ω and 3 Ω in parallel. Equivalent resistance?", a: "R = 6·3/(6+3) = 2 Ω — always less than the smallest branch.", hint: "Product over sum for two." },
      { q: "A 60 W bulb on 120 V — what current and resistance?", a: "I = P/V = 0.5 A; R = V²/P = 240 Ω.", hint: "Two forms of P = VI." },
      { q: "Why do wires warm up when carrying current?", a: "Joule heating P = I²R converts electrical energy to heat inside the wire's resistance.", hint: "Every real conductor has R." },
    ],
  },

  "ph-calc-heat": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Mixing 200 g water at 80 °C with 300 g water at 20 °C (no losses)",
      steps: [
        { text: "Calorimetry balance — heat lost = heat gained (same c cancels):", math: "200(80 − T) = 300(T − 20)" },
        { text: "Solve:", math: "16000 − 200T = 300T − 6000 → 22000 = 500T → T = 44 °C" },
        { text: "Sanity check — the answer must sit between 20 and 80, closer to the bigger mass:", math: "44 °C ✓ (nearer 300 g side)" },
        { text: "Latent heat is different: melting 50 g of ice at 0 °C needs:", math: "Q = mL = 0.05·334 000 = 16 700 J — with NO temperature change" },
        { text: "For comparison, heating that 50 g of water by 80 ° would cost:", math: "0.05·4186·80 = 16 744 J ≈ the same — which is why ice is such an efficient coolant" },
      ],
      takeaway: "Q = mcΔT moves the thermometer; Q = mL moves the state. Mixing problems are just an energy ledger: everything the hot side loses, the cold side gains.",
    },
    theory: [
      {
        heading: "Specific heat, latent heat, and the water equivalent",
        body: "Specific heat c is the energy to raise 1 kg by 1 K (water's 4186 J/kg·K is remarkably high — climate and cooling systems depend on it). Latent heat L is the energy per kg to change state (fusion 334 kJ/kg, vaporisation 2260 kJ/kg for water) — no temperature change during the change. A calorimeter's water equivalent folds its heat capacity into an equivalent mass of water.",
      },
      {
        heading: "Conduction, convection, radiation",
        body: "Conduction: Q/t = kAΔT/d — k is conductivity (copper ≈ 400 W/m·K, still air ≈ 0.024: trapped air is the insulator in clothing and double glazing). Convection carries heat by bulk fluid motion; radiation follows Stefan–Boltzmann, P = eσAT⁴ — T to the fourth power is why the Sun at 5800 K dwarfs everything on Earth.",
      },
    ],
    confusions: [
      {
        wrong: "Adding heat always raises the temperature.",
        right: "During a phase change all the heat goes into breaking bonds (latent heat) — ice melting at 0 °C stays at 0 °C until it is all water.",
        why: "Everyday heating is nearly all sensible heat, so the exception surprises.",
      },
      {
        wrong: "A metal feels cold because it IS colder.",
        right: "It is at room temperature — it just conducts heat away from your hand much faster (k of aluminium ≈ 205 vs wood ≈ 0.1), so it FEELS colder.",
        why: "Touch measures heat FLOW rate, not temperature.",
      },
      {
        wrong: "Steam at 100 °C and water at 100 °C burn equally.",
        right: "Steam additionally releases 2260 kJ/kg when it condenses on skin — far more damaging than the water's sensible heat.",
        why: "Same temperature, so same burn seems logical — the phase change energy is invisible.",
      },
    ],
    questions: [
      { q: "Energy to turn 50 g of ice at 0 °C into water at 40 °C?", a: "Q = mL + mcΔT = 16 700 + 0.05·4186·40 = 16 700 + 8372 = 25 072 J.", hint: "Two stages: melt, then warm." },
      { q: "Why does a coastal city have milder weather than inland?", a: "Water's huge specific heat buffers temperature swings — the sea absorbs/releases heat with little ΔT.", hint: "c_water is 4186 J/kg·K." },
      { q: "Why is a thermos flask effective?", a: "Vacuum kills conduction and convection; silvering kills radiation. All three transfer modes are attacked at once.", hint: "Three modes, three countermeasures." },
    ],
  },

  "ph-calc-optics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Convex lens f = 15 cm throws a sharp image on a screen 30 cm from the lens",
      steps: [
        { text: "Thin-lens equation, solving for the object:", math: "1/u = 1/v − 1/f = 1/30 − 1/15 = −1/30 → u = 30 cm in front" },
        { text: "Magnification on the screen:", math: "m = v/|u| = 30/30 = 1 — same size, inverted (the photographic copy lens condition)" },
        { text: "Refraction check through the same glass (n = 1.5), light at 30°:", math: "sin r = sin30°/1.5 = 0.333 → r = 19.47° toward the normal" },
        { text: "Total internal reflection angle for that glass:", math: "θ_c = arcsin(1/1.5) = 41.8° — beyond this, glass-to-air is a mirror" },
        { text: "A −2 D spectacle lens has focal length:", math: "f = 1/P = −50 cm — diverging, for a myopic eye" },
      ],
      takeaway: "One lab bench, three tools: the lens equation locates images, Snell's law bends rays, and the power P = 1/f connects prescriptions to focal lengths — all sign-convention discipline.",
    },
    theory: [
      {
        heading: "Sign conventions make calculators work",
        body: "Pick ONE convention and hold it: with 'real-is-positive' for mirrors (1/v + 1/u = 1/f) or the Cartesian convention for lenses (1/v − 1/u = 1/f, distances against incident light negative). Every wrong-image bug in optics homework is a dropped sign, not a wrong formula. Powers add for lenses in contact: P = P₁ + P₂.",
      },
      {
        heading: "Snell's law and the critical angle",
        body: "n₁sinθ₁ = n₂sinθ₂ governs every refraction; n = c/v is the optical slowness of a medium. When light tries to leave a denser medium at more than the critical angle sinθ_c = n₂/n₁, it reflects totally — the working principle of optical fibres, binocular prisms, and the sparkle of diamonds (n = 2.42, θ_c = 24.4°).",
      },
    ],
    confusions: [
      {
        wrong: "Angles of incidence are measured from the surface.",
        right: "From the NORMAL — the perpendicular to the surface. A '30° angle with the surface' is a 60° incidence angle.",
        why: "Diagrams show the surface prominently; the normal is a construction line.",
      },
      {
        wrong: "The refractive index is a property of the angle.",
        right: "n is a property of the MEDIUM (and wavelength) only. The angles adjust to satisfy Snell; they do not define n.",
        why: "n = sin i/sin r is measured from angles, so n looks angle-dependent.",
      },
      {
        wrong: "A negative focal length means a broken lens.",
        right: "It is a diverging lens (concave), used for short-sighted eyes — the sign is information, not error.",
        why: "Negative results elsewhere in homework mean mistakes, so negativity is pre-panicked about.",
      },
    ],
    questions: [
      { q: "Reading glasses of +2 D: focal length and type?", a: "f = +50 cm, converging — for presbyopia (near work).", hint: "f = 1/P." },
      { q: "Apparent depth of a 3 m deep pool (n = 1.33)?", a: "d' = d/n = 2.26 m — the bottom looks raised.", hint: "Normal incidence shortcut." },
      { q: "Why does a diamond sparkle more than glass?", a: "n = 2.42 gives a tiny critical angle (24.4°), so rays TIR internally many times before exiting — most light leaves through the top facets.", hint: "Low θ_c → many internal reflections." },
    ],
  },

  "ph-calc-projectile": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Ball launched at v₀ = 20 m/s at 30° above the horizontal (g = 9.8 m/s²)",
      steps: [
        { text: "Split the launch velocity:", math: "vₓ = 20·cos30° = 17.32 m/s,  v_y = 20·sin30° = 10 m/s" },
        { text: "Time of flight — the vertical story alone (up, then back to 0):", math: "t = 2v_y/g = 2·10/9.8 = 2.04 s" },
        { text: "Range — horizontal speed × time:", math: "R = vₓ·t = 17.32·2.04 = 35.4 m" },
        { text: "Cross-check with the range formula:", math: "R = v₀²sin2θ/g = 400·sin60°/9.8 = 35.35 m ✓" },
        { text: "Maximum height:", math: "h = v_y²/2g = 100/19.6 = 5.1 m" },
        { text: "Complementary angle 60° gives the SAME range on a higher arc:", math: "sin(2·60°) = sin60° ✓ — but flight time doubles to 3.53 s" },
      ],
      takeaway: "Two independent one-dimensional problems glued by time: gravity runs the vertical clock, and nothing in the world disturbs the horizontal cruise. Range formula, time of flight, max height — all three fall out of the split.",
    },
    theory: [
      {
        heading: "Independence of horizontal and vertical motion",
        body: "Gravity acts only vertically; no horizontal force means vₓ never changes (ignoring air). The trajectory is a parabola because y grows quadratically in time while x grows linearly. The monkey-and-hunter demo is the purest proof: a horizontally-shot ball and a dropped ball hit the ground together.",
      },
      {
        heading: "The three working formulas and 45°",
        body: "R = v₀²sin2θ/g, t_flight = 2v₀sinθ/g, h_max = v₀²sin²θ/2g. R is maximised at θ = 45° (sin2θ = 1); complementary angles share a range but differ in time and height — the high-arc shot is not worse, just slower. With air drag, the optimum drops below 45° and real trajectories shorten.",
      },
    ],
    confusions: [
      {
        wrong: "At the top of the arc, the velocity is zero.",
        right: "Only the VERTICAL component is zero; vₓ = 17.32 m/s throughout. The speed at the top is at its minimum, not zero.",
        why: "The vertical graph flatlines at the apex, and the habit of tracking only y takes over.",
      },
      {
        wrong: "45° gives the maximum height too.",
        right: "45° maximises RANGE. Height keeps growing with θ up to 90° (straight up).",
        why: "One formula (range) peaks at 45° and gets blamed for everything.",
      },
      {
        wrong: "A thrown ball keeps moving because of the throw's force.",
        right: "After release, no horizontal force acts — it coasts by inertia (Newton's first law). The 'force of the throw' ended at the hand.",
        why: "Aristotelian 'motion needs a mover' is the default human intuition.",
      },
    ],
    questions: [
      { q: "Same 20 m/s at 45°: range?", a: "R = 400·1/9.8 = 40.8 m — the maximum for this speed.", hint: "sin90° = 1." },
      { q: "Ball thrown horizontally at 20 m/s from a 45 m cliff: when and where does it land?", a: "t = √(2h/g) = 3.03 s; x = 20·3.03 = 60.6 m from the base.", hint: "Vertical drop times the fall." },
      { q: "Why do long-range artillery use elevations above 45°?", a: "Air resistance and the need for steep descents/cover change the optimum — the vacuum 45° rule is drag-free only.", hint: "The formula assumes no drag." },
    ],
  },

  "ai-tutor": {
    proof: {
      title: "Proof on a specific case — a real tutoring exchange, not the general form",
      case: "Student pastes a weak prompt and a strong prompt about the same problem: 'A 2 kg block slides down a 30° incline, µ = 0.15. Find a.'",
      steps: [
        { text: "Weak prompt: 'explain this'. The tutor can only guess what you want — likely a lecture:", math: "output = generic theory dump (no numbers, no check)" },
        { text: "Strong prompt gives the data, the goal and the constraint:", math: "'solve a = g(sinθ − µcosθ) with g = 9.8, then quiz me' → 9.8(0.5 − 0.15·0.866) = 3.67 m/s²" },
        { text: "The arithmetic the tutor shows can be verified independently:", math: "µcosθ = 0.13; sinθ − µcosθ = 0.37; a = 3.63–3.67 m/s² depending on rounding ✓" },
        { text: "The strong prompt ends with a practice demand — retrieval, not reading:", math: "'quiz me' converts an answer into a memory trace (the testing effect)" },
        { text: "Feeding YOUR wrong answer back is the highest-value move:", math: "'I got 5.4 m/s² — where did I go wrong?' → the tutor hunts the specific slip (usually forgetting µ·cosθ)" },
      ],
      takeaway: "The tutor is only as good as the question: give data, goal, and a demand for practice — and always bring your own attempt first, because diagnosing a specific wrong answer beats receiving a correct one.",
    },
    theory: [
      {
        heading: "What the tutor is for",
        body: "Veer is grounded in this platform's own notes, syllabus and lab content, so it is strongest at: explaining a step you just failed, generating practice in the exact topic you are on, converting a page you did not understand into plain language, and checking your working line by line. It is a Socratic partner, not an answer vending machine — ask it to guide, not to replace, your attempt.",
      },
      {
        heading: "What it is not for",
        body: "It is not an exam oracle: under exam conditions you will not have it, so building the habit of asking it for hints instead of solutions protects your skill. It can also err on long multi-step derivations — verify any number it produces against a formula you trust, exactly as you would double-check a friend's working. Your own attempt must exist before the conversation; that is the deal.",
      },
    ],
    confusions: [
      {
        wrong: "Asking the AI for the full solution is efficient studying.",
        right: "Reading a solution builds recognition, not recall. Attempting first (even wrongly) then getting targeted correction builds the skill the exam tests.",
        why: "Watching someone else lift weights does not build muscle — but it feels productive.",
      },
      {
        wrong: "The tutor's answer must be right because it sounds confident.",
        right: "Fluency is not accuracy. Confident prose can carry a wrong sign or a misremembered constant — check numbers against first principles.",
        why: "Human experts are usually right when confident, so the heuristic is imported where it fails.",
      },
      {
        wrong: "If the AI cannot solve my problem instantly, it is useless.",
        right: "Its real value is the dialogues: 'why does the sign flip here?', 'give me an easier version first', 'test me'. Scaffolding, not oracles.",
        why: "Search-engine expectations (one query, one answer) do not fit a tutor.",
      },
    ],
    questions: [
      { q: "You got 5.4 m/s² for the incline (true answer 3.67). What prompt diagnoses it fastest?", a: "'I got 5.4 for a = g(sinθ − µcosθ); check each factor' — pointing at the FORMULA makes the slip (dropping µcosθ) findable in one pass.", hint: "Give your own working." },
      { q: "Best first prompt when starting a topic you know nothing about?", a: "'Explain at Class 11 level in 5 lines, then ask me 2 questions' — bounded explanation plus immediate retrieval.", hint: "Bound the output; demand interaction." },
      { q: "Why end every session with a quiz question?", a: "The testing effect: retrieving an answer strengthens memory far more than re-reading it — the quiz IS the study, not the wrap-up.", hint: "Retrieval practice." },
    ],
  },

  "advanced-circuit": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "12 V battery, r = 1 Ω, feeding 4 Ω and 12 Ω in parallel",
      steps: [
        { text: "Parallel pair first:", math: "R_p = (4·12)/(4 + 12) = 3 Ω" },
        { text: "Total loop resistance and current:", math: "R_total = 3 + 1 = 4 Ω → I = 12/4 = 3 A" },
        { text: "Terminal voltage across the parallel block:", math: "V = I·R_p = 9 V" },
        { text: "Branch currents — same voltage, independent currents:", math: "I₄ = 9/4 = 2.25 A, I₁₂ = 9/12 = 0.75 A; check 2.25 + 0.75 = 3 A ✓ (junction rule)" },
        { text: "Power audit:", math: "P_total = E·I = 36 W; useful in branches = 9·3 = 27 W; lost in r = I²r = 9 W ✓" },
      ],
      takeaway: "Reduce the network step by step (parallel → series → ohm's law), then walk the voltage back down the tree — every branch current must re-sum to the loop current or you dropped a sign.",
    },
    theory: [
      {
        heading: "Kirchhoff's two rules",
        body: "Junction rule: charge in = charge out at every node (ΣI = 0). Loop rule: going around any closed path, voltage gains equal voltage drops (ΣE = ΣIR) — energy conservation. Between them, ANY circuit can be solved: label currents with directions, write node and loop equations, solve the linear system, flip signs of any current that came out negative.",
      },
      {
        heading: "Null methods: Wheatstone bridge and the potentiometer",
        body: "A Wheatstone bridge balances when P/Q = R/S — at balance the galvanometer reads zero and the result is independent of the battery and its internal resistance (that is the power of a null method). The potentiometer compares EMFs by finding the balance length; because it draws no current at balance, it measures TRUE emf, not terminal voltage — the reason it remains the precision standard in labs.",
      },
    ],
    confusions: [
      {
        wrong: "A voltmeter measures the emf of a battery in circuit.",
        right: "It reads terminal voltage V = E − Ir. Only a potentiometer or a very-high-impedance meter approaches the true emf.",
        why: "Voltmeters are drawn ideally across batteries in textbook diagrams.",
      },
      {
        wrong: "Adding a resistor in parallel increases the total resistance.",
        right: "Parallel ALWAYS lowers the equivalent resistance (a new path for current): 6 Ω ∥ 3 Ω = 2 Ω.",
        why: "Series intuition ('more resistors = more R') is over-applied.",
      },
      {
        wrong: "If the bridge galvanometer shows zero, the battery is dead.",
        right: "Zero galvanometer current is the SUCCESS condition — the bridge is balanced and P/Q = R/S holds exactly.",
        why: "'No reading' is normally a fault; here it is the measurement.",
      },
    ],
    questions: [
      { q: "Wheatstone: P = 2 Ω, Q = 4 Ω, R = 3 Ω. What S balances?", a: "S = Q·R/P = 4·3/2 = 6 Ω.", hint: "P/Q = R/S." },
      { q: "Why does a potentiometer read emf, not terminal voltage?", a: "At the null point it draws no current from the cell, so Ir = 0 and V = E exactly.", hint: "Balance = no current through the cell." },
      { q: "Three 6 Ω resistors: all possible equivalents?", a: "All series 18 Ω; all parallel 2 Ω; two in series + one parallel: (12·6)/18 = 4 Ω.", hint: "Combine stepwise." },
    ],
  },

  "ph-sim-acceleration": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Ball rolls from rest with constant a = 2 m/s² — the three kinematic equations live-checked",
      steps: [
        { text: "Speed after 3 s:", math: "v = u + at = 0 + 2·3 = 6 m/s" },
        { text: "Distance in 3 s:", math: "s = ½at² = ½·2·9 = 9 m" },
        { text: "Average velocity check — for constant a from rest, v_avg = v/2:", math: "v_avg = 6/2 = 3 m/s → s = 3·3 = 9 m ✓" },
        { text: "Third equation as the cross-check:", math: "v² = u² + 2as → 36 = 0 + 2·2·s → s = 9 m ✓ (all three agree)" },
        { text: "The graph reading: on a v–t graph the SLOPE is a and the AREA is s:", math: "slope = 2; triangle area = ½·3·6 = 9 ✓" },
        { text: "Same 9 m at constant 6 m/s would take 1.5 s — acceleration means the trip starts slow and ends fast.", math: "t = 9/6 = 1.5 s ≠ 3 s" },
      ],
      takeaway: "The three SUVAT equations are one truth written three ways — if two of them agree on s, the third will too; if they disagree, one sign or one u = 0 slipped.",
    },
    theory: [
      {
        heading: "The kinematic quartet",
        body: "v = u + at; s = ut + ½at²; v² = u² + 2as; s = (u + v)t/2. They hold ONLY for constant acceleration — the single biggest failure condition. Each equation omits one variable (first omits s, second omits v, third omits t, fourth omits a); pick the one whose missing variable is the one you neither know nor need.",
      },
      {
        heading: "Graphs as the same physics in pictures",
        body: "On a v–t graph: slope = acceleration, area = displacement (area below the axis counts negative). On an s–t graph: slope = velocity, curvature = acceleration (a parabola opening up = speeding up). Reading motion from graphs and building graphs from equations are mirror skills — exam boards love exactly this round trip.",
      },
    ],
    confusions: [
      {
        wrong: "Negative acceleration always means slowing down.",
        right: "Deceleration means a opposes v. A ball thrown upward has NEGATIVE acceleration (downward g) while SLOWING; the same ball falling has negative acceleration while SPEEDING. The sign of a alone says nothing.",
        why: "'Negative = bad = slowing' is imported from everyday language.",
      },
      {
        wrong: "Acceleration means the velocity is large.",
        right: "A Formula 1 car cruising at 300 km/h has a ≈ 0; a cyclist braking hard has a huge negative a at low speed. Acceleration is the RATE of change, not the size.",
        why: "Fast things look like they must be accelerating — the two are independent.",
      },
      {
        wrong: "Distance and displacement are interchangeable.",
        right: "Distance is the path length (scalar); displacement is the straight arrow from start to finish. A lap of a track: 400 m distance, 0 displacement.",
        why: "Both come out in metres and both are called 'how far'.",
      },
    ],
    questions: [
      { q: "Braking at −5 m/s² from 25 m/s: stopping time and distance?", a: "t = 25/5 = 5 s; s = v²/2a = 625/10 = 62.5 m.", hint: "v = 0 at the stop." },
      { q: "Doubling the time from rest multiplies the distance by…?", a: "4× (s = ½at² — quadratic in t).", hint: "t² scaling." },
      { q: "Free fall for 1 s: how far, how fast (g = 9.8)?", a: "s = 4.9 m; v = 9.8 m/s — the distance is HALF the speed numerically, for any t, from rest.", hint: "s = ½gt², v = gt." },
    ],
  },

  "ph-sim-bounce": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Ball dropped from h = 5 m, coefficient of restitution e = 0.8",
      steps: [
        { text: "Impact speed from energy:", math: "v = √(2gh) = √98 = 9.9 m/s" },
        { text: "Restitution definition — rebound speed is e times impact speed:", math: "v' = 0.8·9.9 = 7.92 m/s" },
        { text: "Rebound height — energy scales as v², so height scales as e²:", math: "h' = e²·h = 0.64·5 = 3.2 m" },
        { text: "Time for the next full bounce (up and back):", math: "t = 2v'/g = 2·7.92/9.8 = 1.62 s (first drop took √(2·5/9.8) = 1.01 s)" },
        { text: "Total distance travelled (geometric series):", math: "d = h·(1 + e²)/(1 − e²) = 5·1.64/0.36 = 22.8 m" },
        { text: "…in a FINITE total time — infinitely many bounces, sum of times converges.", math: "Σ 2·eⁿ·√(2h/g) is geometric ✓" },
      ],
      takeaway: "e multiplies SPEEDS at each impact, so heights multiply by e² — the ball's bounce history is a geometric series in e², and 22.8 m of total travel happens in a finite number of seconds.",
    },
    theory: [
      {
        heading: "Coefficient of restitution",
        body: "e = relative speed after / relative speed before (along the line of impact): e = 1 perfectly elastic (speed conserved), 0 < e < 1 real materials (0.8 rubber, 0.6 tennis on concrete, ~0.3 clay), e = 0 perfectly plastic (thud, no bounce). It is a property of the PAIR of surfaces, not of either object alone.",
      },
      {
        heading: "Where the energy goes",
        body: "Every bounce converts a fraction (1 − e²) of the kinetic energy into heat, sound and permanent deformation — the ball and floor warm up by an immeasurable amount each hit. Nothing is destroyed: energy is conserved, it just leaves the 'bouncing' account. The thud gets quieter and the hops shrink until the ball rests, vibrating microscopically.",
      },
    ],
    confusions: [
      {
        wrong: "A heavier ball bounces higher.",
        right: "For the same drop height and e, height depends only on e² — mass cancels. The basketball feels bouncier because its e is higher.",
        why: "Heavier things hit harder, and 'harder' is misread as 'higher'.",
      },
      {
        wrong: "The energy 'disappears' at each bounce.",
        right: "It converts to heat, sound and deformation. The floor is microscopically warmer after a thousand bounces — energy moved accounts, never deleted.",
        why: "Nothing visible happens with the lost energy, so 'vanishing' seems right.",
      },
      {
        wrong: "A bouncing ball never stops bouncing.",
        right: "Infinitely many bounces take FINITE total time (geometric series) — after that the ball is simply at rest, micro-vibrating. Maths and reality agree here.",
        why: "The infinite-bounce picture implies infinite time by association.",
      },
    ],
    questions: [
      { q: "Height after the 3rd bounce for e = 0.8 from 5 m?", a: "h·e⁶ = 5·0.262 = 1.31 m.", hint: "Each bounce multiplies by e² = 0.64." },
      { q: "A superball with e = 0.9 from 2 m: first rebound height?", a: "0.81·2 = 1.62 m.", hint: "e²." },
      { q: "Why can't a real ball have e = 1?", a: "Some deformation heat is always generated — perfectly elastic collisions are an idealisation (gas molecules come closest).", hint: "Second law of thermodynamics." },
    ],
  },

  "ph-sim-gravity": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Stone dropped from a 20 m bridge — Earth vs Moon compared",
      steps: [
        { text: "Fall time on Earth (g = 9.8):", math: "t = √(2h/g) = √(40/9.8) = 2.02 s" },
        { text: "Impact speed:", math: "v = g·t = 19.8 m/s (equivalently √(2gh))" },
        { text: "Same drop on the Moon (g = 1.62):", math: "t = √(40/1.62) = 4.97 s — 2.47× longer, exactly √(9.8/1.62) ✓" },
        { text: "First-second distance check:", math: "s(1 s) = ½·9.8·1 = 4.9 m — the 'g/2 per first second' mnemonic" },
        { text: "Mass of the stone — nowhere in any equation: a 10 g pebble and a 10 kg rock hit together (air aside).", math: "a = mg/m = g ✓ mass cancels" },
        { text: "With air resistance, a skydiver stops accelerating at terminal velocity:", math: "mg = ½ρC_d·v_t² → v_t ≈ 55 m/s belly-down" },
      ],
      takeaway: "Vacuum free-fall is mass-blind and g-set: t = √(2h/g), v = √(2gh) — swap the planet and only g changes; add air and mass sneaks back in through terminal velocity.",
    },
    theory: [
      {
        heading: "Why all masses fall alike",
        body: "Gravity's force scales with mass (F = mg) but so does inertia (F = ma): dividing, a = g for everything. This equality of gravitational and inertial mass is the deep fact Einstein built general relativity on (the equivalence principle). Air resistance is the only everyday saboteur — a feather and hammer fell together on the Moon for exactly this reason.",
      },
      {
        heading: "Terminal velocity and the shape of g",
        body: "In air, drag grows as v², so falling objects reach a speed where drag = weight and acceleration stops — terminal velocity depends on mass, size and shape (a mouse survives falls a human does not). Meanwhile g itself varies: g(h) = g(R/(R+h))² drops with altitude; inside the Earth it falls roughly linearly toward the centre (shell theorem).",
      },
    ],
    confusions: [
      {
        wrong: "Heavy objects fall faster.",
        right: "In vacuum, identical acceleration. In air, DENSITY relative to size decides (a crumpled paper ball beats a flat sheet) — mass per drag area, not mass alone.",
        why: "Everyday experience with air resistance is over-generalised to 'gravity prefers heavy things'.",
      },
      {
        wrong: "Astronauts are weightless because there is no gravity in orbit.",
        right: "They are in freefall — gravity is ~89% of surface strength on the ISS. Weightlessness = falling WITH your surroundings, not the absence of gravity.",
        why: "'Zero-g' branding collides with the freefall concept.",
      },
      {
        wrong: "g increases as you go deeper underground.",
        right: "It DECREASES roughly linearly (less mass below you). At the centre it is zero.",
        why: "'Closer to the middle of Earth = stronger pull' ignores the shell theorem.",
      },
    ],
    questions: [
      { q: "Ball thrown up at 19.6 m/s: time to apex and height?", a: "t = 19.6/9.8 = 2 s; h = v²/2g = 19.6 m.", hint: "v = 0 at the top." },
      { q: "g at depth R/2 inside the Earth?", a: "g' = g·(1 − ½) = 4.9 m/s² (linear-with-radius approximation).", hint: "Only the mass inside your radius pulls." },
      { q: "Bullet fired horizontally and bullet dropped from the same height — which lands first?", a: "Same time: vertical motion is independent of horizontal velocity.", hint: "The Galileo thought experiment." },
    ],
  },

  "ph-sim-threebody": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Does Jupiter's gravity perturb Earth's orbit? Numbers at closest approach",
      steps: [
        { text: "Mass ratio first:", math: "M_J/M_Sun = 1/1047 = 9.55×10⁻⁴" },
        { text: "At opposition Jupiter is 4.2 AU away; gravity falls as 1/r²:", math: "distance factor = (1 AU/4.2 AU)² = 1/17.6" },
        { text: "Combined perturbation on Earth:", math: "F_J/F_S = 9.55×10⁻⁴ / 17.6 = 5.4×10⁻⁵ — a 0.005% nudge" },
        { text: "That is why Earth's orbit survives 4.5 billion years: the sun's pull dominates by a factor of ~18 000.", math: "hierarchical stability ✓" },
        { text: "Contrast the TRUE three-body problem: three COMPARABLE masses have no closed-form solution (Poincaré, 1890) — trajectories sensitive enough that tiny initial differences diverge exponentially.", math: "chaos, not randomness" },
      ],
      takeaway: "Real star systems are 'hierarchical' — one dominant pair plus small nudges — which is why planets are stable even though the full three-body problem is provably chaotic.",
    },
    theory: [
      {
        heading: "Why three bodies are harder than two",
        body: "The two-body problem has exact conic-section solutions. Add a third body and the integrals have no closed form — Poincaré proved no general solution exists, founding chaos theory. Computers integrate the equations step by step, which is what this simulation does: accurate short-term, inevitably divergent long-term (the Lyapunov time sets how far prediction is meaningful).",
      },
      {
        heading: "Lagrange points — the quiet places",
        body: "In the rotating frame, gravity and centrifugal effects cancel at five points: L1–L3 on the line between the bodies (unstable, but stations like SOHO park nearby with small corrections), and L4/L5 AHEAD of and BEHIND the smaller body at 60° — stable islands where Trojan asteroids gather by the thousands. Stability at L4/L5 needs a mass ratio below ~1/25, comfortably true for Sun–Jupiter.",
      },
    ],
    confusions: [
      {
        wrong: "Chaotic means random.",
        right: "Chaotic systems are fully deterministic — the equations never involve chance — but tiny initial differences grow exponentially, so long-range prediction fails in practice.",
        why: "'Unpredictable' is equated with 'has no cause'.",
      },
      {
        wrong: "The three-body problem is always unstable.",
        right: "Many configurations are stable for billions of years: hierarchical systems (Sun–planet–moon) and L4/L5 islands. Chaos lives in the comparable-mass case.",
        why: "The 'unsolvable' headline is read as 'always explodes'.",
      },
      {
        wrong: "If the simulation shows a planet flying off, the physics is broken.",
        right: "Either the initial setup was genuinely unstable, or integration error accumulated — both are real physics/numerics, not a bug. Try smaller time steps and compare.",
        why: "Screens look authoritative, so deviation from expectation reads as software error.",
      },
    ],
    questions: [
      { q: "Why do Trojan asteroids collect at Jupiter's L4 and L5?", a: "Those points are STABLE — small nudges lead to small oscillations, so asteroids that drift there stay there.", hint: "L4/L5 stability condition." },
      { q: "Could a 'figure-8' three-body orbit exist?", a: "Yes — Chenciner & Montgomery (2000) found one with equal masses following a figure-8 periodic orbit; fragile but exact.", hint: "Special solutions do exist." },
      { q: "Why do we still send spacecraft with estimated trajectories?", a: "N-body integration + mid-course corrections: measure the actual position, correct the estimate — prediction and feedback replace exactness.", hint: "Numerical integration." },
    ],
  },

  "ph-sim-double-pendulum": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Two 1 m rods, small swings: the two normal modes computed exactly",
      steps: [
        { text: "Linearised about the hanging position, the system has two normal-mode frequencies:", math: "ω² = (g/L)·(2 ± √2) for equal masses" },
        { text: "Slow mode (2 − √2 = 0.586):", math: "ω₁ = √(9.8·0.586) = 2.40 rad/s → T₁ = 2.62 s" },
        { text: "Fast mode (2 + √2 = 3.414):", math: "ω₂ = √(9.8·3.414) = 5.78 rad/s → T₂ = 1.09 s" },
        { text: "The two modes: both rods swinging TOGETHER (in phase) vs AGAINST each other (opposite) — like coupled atoms sharing one frequency each.", math: "in-phase / anti-phase" },
        { text: "Release both rods at 10°: motion is a mix of the two modes, and the amplitude of one rod beats slowly as energy sloshes between the rods.", math: "superposition of modes" },
        { text: "Push to large angles (say 90°) and the linear maths dies: the trajectory becomes chaotic — release angles differing by 0.01° give visibly different paths within seconds.", math: "chaos threshold ≈ beyond small-angle regime" },
      ],
      takeaway: "Small swings: two clean modes with exact periods (2.62 s and 1.09 s for 1 m rods). Large swings: chaos — but energy is still conserved throughout; chaos redistributes, it does not create.",
    },
    theory: [
      {
        heading: "Normal modes: the decoupling trick",
        body: "Any coupled linear oscillator is a mix of normal modes — patterns in which every part moves at one frequency. The double pendulum's two modes (in-phase, anti-phase) are the full vocabulary of its small motion; beating between them is what makes the lower rod swing grow and shrink. This mode idea scales to molecules (IR spectroscopy reads molecular normal modes), buildings and bridges.",
      },
      {
        heading: "Chaos: deterministic but unpredictable",
        body: "Beyond small angles the double pendulum is the textbook chaotic system: trajectories separate exponentially (sensitive dependence), the pendulum flips over unpredictably, and the phase-space plot fills fractal structure. Crucially, energy stays constant — you can verify it in the sim — and the equations are fully deterministic. Chaos is a limit on PREDICTION, not on determinism.",
      },
    ],
    confusions: [
      {
        wrong: "When the sim shows wild flips, energy is being created.",
        right: "Energy is constant; large amplitudes just move energy between kinetic and potential rapidly. Chaos redistributes existing energy, never invents it.",
        why: "Chaotic motion LOOKS like amplification, so it is read as free energy.",
      },
      {
        wrong: "A double pendulum still has period 2π√(L/g).",
        right: "That is the SINGLE pendulum's small-angle period. A double pendulum has TWO normal modes (2.62 s and 1.09 s for the 1 m case) — and no single period once nonlinear.",
        why: "The single-pendulum formula is the only one memorised.",
      },
      {
        wrong: "Chaos means the equations involve randomness.",
        right: "The equations are pure Newtonian mechanics — no dice anywhere. Unpredictability comes from exponential sensitivity to the initial numbers.",
        why: "'Unpredictable' is conflated with 'stochastic'.",
      },
    ],
    questions: [
      { q: "Why does a grandfather clock use a single pendulum?", a: "Single period (small-angle isochronism) = reliable timekeeping; a double pendulum's beats would ruin it.", hint: "Clocks need one stable period." },
      { q: "What does the beat frequency between the two modes look like?", a: "The slow envelope frequency is |ω₁ − ω₂|/2π — the lower rod's swing grows and shrinks at that rate.", hint: "Superposition of two frequencies." },
      { q: "Coupled pendulums on a shared beam: what transfers between them?", a: "Energy — complete transfer (beats) when they are identical, analogous to the double pendulum's mode mixing.", hint: "Resonance between neighbours." },
    ],
  },

  "ph-sim-pi-collisions": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "The famous π machine: small block between a wall and a big sliding block (all frictionless, elastic)",
      steps: [
        { text: "The rule discovered by Galperin: choose the mass ratio as a power of 100 —", math: "M/m = 100ⁿ gives the first (n+1) digits of π as the COLLISION COUNT" },
        { text: "M/m = 1 (equal masses):", math: "collisions = 3 → '3'" },
        { text: "M/m = 100:", math: "collisions = 31 → '3.1'" },
        { text: "M/m = 10 000:", math: "collisions = 314 → '3.14'" },
        { text: "Each collision is just elastic-collision algebra:", math: "v₁' = ((M−m)v₁ + 2mv₂)/(M+m); the wall reflects v₂ each time" },
        { text: "Energy and momentum are conserved at every hit — the pi is not numerology but a count of states:", math: "Galperin: the motion on a phase-space ellipse crosses lattice lines; each crossing = one collision → π emerges from a rotation" },
      ],
      takeaway: "Momentum conservation turns the collision count into a digit extractor: the mass ratio sets a 'wedge angle' in phase space, and π/θ counts the hits — the most unexpected appearance of π outside a circle.",
    },
    theory: [
      {
        heading: "Elastic collisions in one dimension",
        body: "Two equations — momentum (Mv₁ + mv₂ = Mv₁' + mv₂') and energy (½Mv₁² + ½mv₂² = ½Mv₁'² + ½mv₂'²) — fully determine both exit velocities. Equal masses SWAP velocities; a massive block barely notices the light one; a light block hit by a heavy one flies off at nearly double the heavy block's speed. The wall is the infinite-mass special case: it reflects speed without losing any.",
      },
      {
        heading: "Where π hides",
        body: "Galperin's 2003 result: plot the two blocks' momentum on axes rotated by the angle θ = arctan√(m/M). Conservation laws confine the point to an ellipse, and each collision steps it across a lattice line like a billiard ball bouncing in a WEDGE of angle θ. Bounces in a wedge of angle θ: total = ⌈π/θ⌉ − 1. With θ = arctan(10⁻ⁿ), that count is the first n+1 digits of π.",
      },
    ],
    confusions: [
      {
        wrong: "The collision count is π by magic or coincidence.",
        right: "It comes from counting lattice crossings of a rotating phase-space vector — geometry dressed as arithmetic. Not numerology; a theorem.",
        why: "π appearing without a circle feels impossible, so 'trick' is assumed.",
      },
      {
        wrong: "It works with inelastic (lossy) collisions too.",
        right: "The count needs ENERGY as well as momentum conserved — inelastic collisions break the phase-space ellipse and the clean count.",
        why: "The setup looks like everyday blocks, so everyday 'thud' physics seems fine.",
      },
      {
        wrong: "Any mass ratio gives π digits.",
        right: "Only powers of 100 give the digit staircase. M/m = 10 gives a different (non-π) count; the choice θ = arctan(10⁻ⁿ) is what encodes base-10 digits.",
        why: "The demo only ever shows the magic ratios, hiding the constraint.",
      },
    ],
    questions: [
      { q: "Mass ratio for four digits (3.141)?", a: "M/m = 100³ = 10⁶ collisions = 3141.", hint: "100ⁿ → n+1 digits." },
      { q: "Equal masses collide head-on elastically: what happens?", a: "They exchange velocities exactly.", hint: "v₁' = v₂, v₂' = v₁." },
      { q: "Why does the wall 'count' in the collision total?", a: "It is a collision too — infinite mass, reflecting the small block. Both block-block and block-wall hits add to the count.", hint: "The count includes every hit." },
    ],
  },
};

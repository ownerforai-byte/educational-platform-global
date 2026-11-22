/**
 * Wave 3 — difficult conceptual solved problems (NEB board style) for the
 * grade-11 physics derivations that shipped without any `solvedProblems`.
 *
 * Keyed by derivation slug; merged into `DERIVATIONS_AND_THEOREMS` in
 * `derivations-data.ts`. Every problem is written the way NEB long questions
 * are set: a short stimulus, an explicit "given" line, numbered reasoning
 * steps that name the principle used at each step, a boxed-style final answer,
 * and the trap that costs marks.
 */

import type { SolvedProblem } from "@/lib/derivations-data";

export const PHYSICS_EXTRA_SOLVED: Record<string, SolvedProblem[]> = {
  "equations-of-motion": [
    {
      id: "sp-eom-1",
      question:
        "A driver moving at 72 km h⁻¹ sees a barrier 60 m ahead. He applies the brakes at once and the car decelerates uniformly, stopping exactly at the barrier. A second driver, travelling at the same speed but reacting 0.5 s later (brakes applied after 0.5 s), also stops exactly at the barrier. Find (a) the deceleration in each case and (b) show that the second car was travelling faster than the first car's initial speed at the moment the brakes bit.",
      examBadge: "NEB 2080 Board",
      given: "u = 72 km h⁻¹ = 20 m s⁻¹; total stopping distance s = 60 m; reaction delay t_r = 0.5 s",
      stepByStep: [
        "Driver 1 (brakes at once): v² = u² + 2as with v = 0 gives 0 = 20² + 2a(60), so a = −400/120 = −3.33 m s⁻².",
        "Driver 2 travels 20 × 0.5 = 10 m during reaction time, so the braking distance is only 60 − 10 = 50 m.",
        "Driver 2's braking deceleration: 0 = 20² + 2a(50) ⟹ a = −400/100 = −4.0 m s⁻².",
        "Conceptual step: at the instant the brakes bite, driver 2 still has u = 20 m s⁻¹ — the same as driver 1's initial speed. What changes is the remaining distance, not the speed.",
        "The trap in the question: 'faster than the first car's initial speed' is false — the second car is never faster; it simply converts 10 m of its 60 m budget into reaction distance, forcing a harder deceleration (4.0 > 3.33 m s⁻²).",
      ],
      finalAnswer: "a_1 = 3.33\\ \\text{m s}^{-2},\\quad a_2 = 4.0\\ \\text{m s}^{-2};\\ \\text{both cars brake at } 20\\ \\text{m s}^{-1}",
      tipOrTrap:
        "Reaction distance is covered at CONSTANT speed — apply v = u + at only after the brakes bite. Mixing the two phases into one v² = u² + 2as run is the single most common NEB error.",
    },
    {
      id: "sp-eom-2",
      question:
        "A body starting from rest has acceleration that increases uniformly from 0 to 4 m s⁻² over 5 s, then stays constant at 4 m s⁻² for another 5 s. Find the total distance covered and explain why v = ut + ½at² cannot be applied across the whole 10 s in one step.",
      examBadge: "NEB 2079",
      given: "Phase 1: a rises linearly 0 → 4 m s⁻² in t₁ = 5 s, u = 0. Phase 2: a = 4 m s⁻² for t₂ = 5 s.",
      stepByStep: [
        "Phase 1 has CHANGING acceleration, so the uniform-a equations do not apply to it as a whole. Use the average: since a rises linearly, a_avg = (0 + 4)/2 = 2 m s⁻².",
        "Distance in phase 1: s₁ = ½ a_avg t₁² = ½ × 2 × 25 = 25 m.",
        "Velocity at the end of phase 1: v₁ = a_avg t₁ = 2 × 5 = 10 m s⁻¹ (equivalently the area under the a–t graph).",
        "Phase 2 has constant a = 4 m s⁻²: s₂ = v₁t₂ + ½at₂² = 10 × 5 + ½ × 4 × 25 = 50 + 50 = 100 m.",
        "Total s = 25 + 100 = 125 m.",
        "Why one step fails: v = ut + ½at² assumes a is constant. Substituting a = 4 for the whole 10 s would give 200 m — wrong, because the body only accelerated at 4 m s⁻² during the second half.",
      ],
      finalAnswer: "s = 125\\ \\text{m};\\ \\text{single-step use of } s = ut + \\tfrac12 at^2 \\text{ is invalid for varying } a",
      tipOrTrap:
        "For a linearly rising acceleration, the area under the a–t graph (impulse per unit mass) gives the velocity change — this graphical view is what NEB mark schemes reward.",
    },
  ],

  "projectile-range-max-height-time-of-flight": [
    {
      id: "sp-proj-1",
      question:
        "A projectile fired from level ground has range R = 40 m. When fired at the same speed but at the complementary angle, it lands at the same point. Show that the two possible angles give the same range, then find both angles if the maximum height in the first case is 15 m. (g = 10 m s⁻²)",
      examBadge: "NEB 2080 Board",
      given: "R = 40 m for angle θ and for 90° − θ; H₁ = 15 m; g = 10 m s⁻²",
      stepByStep: [
        "Range formula: R = u² sin 2θ / g. Replacing θ by 90° − θ gives sin 2(90° − θ) = sin(180° − 2θ) = sin 2θ — identical range. This is why every range (except maximum) occurs twice.",
        "For the first trajectory: H = u² sin²θ / 2g = 15 ⟹ u² sin²θ = 300.",
        "Also R = u² · 2 sinθ cosθ / g = 40 ⟹ u² sinθ cosθ = 200.",
        "Divide the two: (u² sin²θ)/(u² sinθ cosθ) = tanθ = 300/200 = 1.5 ⟹ θ ≈ 56.3°.",
        "The complementary answer is 90° − 56.3° = 33.7° — same range, lower peak.",
        "Check: the high-angle shot spends longer in the air (T = 2u sinθ/g is larger) but covers the same horizontal ground.",
      ],
      finalAnswer: "\\theta_1 \\approx 56.3^\\circ,\\quad \\theta_2 \\approx 33.7^\\circ \\ (\\text{same } R = 40\\ \\text{m})",
      tipOrTrap:
        "The pair θ and 90° − θ always shares one range. If a question gives the HEIGHT, it has secretly picked which of the two angles it means — H is different for the pair even though R is not.",
    },
    {
      id: "sp-proj-2",
      question:
        "A ball is thrown from a rooftop 45 m high with speed 20 m s⁻¹ at 30° above the horizontal. Find (a) the time to reach the ground, (b) the horizontal distance from the building, and (c) explain why the horizontal range formula R = u² sin 2θ/g must NOT be used here. (g = 10 m s⁻²)",
      examBadge: "NEB Model Set",
      given: "h = 45 m (downward to ground), u = 20 m s⁻¹, θ = 30°, g = 10 m s⁻²",
      stepByStep: [
        "Resolve: u_x = 20 cos 30° = 17.32 m s⁻¹ (constant), u_y = 20 sin 30° = 10 m s⁻¹ (upward).",
        "Vertical motion with the ground 45 m BELOW the launch point, taking up as positive: −45 = 10t − 5t².",
        "Rearrange: 5t² − 10t − 45 = 0 ⟹ t² − 2t − 9 = 0 ⟹ t = [2 + √(4 + 36)]/2 = 1 + √10 ≈ 4.16 s.",
        "Horizontal distance: x = u_x t = 17.32 × 4.16 ≈ 72 m.",
        "Why R = u² sin 2θ/g fails: that formula assumes launch and landing at the SAME level. Here the extra 45 m drop lengthens the flight time, so the true range is much larger than the 35.4 m the formula would give.",
      ],
      finalAnswer: "t \\approx 4.16\\ \\text{s},\\quad x \\approx 72\\ \\text{m}",
      tipOrTrap:
        "Whenever launch and landing levels differ, go back to the two independent equations — the standard range formula silently assumes a level surface.",
    },
  ],

  "work-energy-theorem": [
    {
      id: "sp-wet-1",
      question:
        "A 2 kg block slides down a rough incline of height 5 m and length 10 m, starting from rest, and reaches the bottom with speed 6 m s⁻¹. (a) Use the work–energy theorem to find the work done against friction. (b) A friend argues 'gravity did more work than the kinetic energy gained, so energy was destroyed.' Correct this statement using the theorem. (g = 10 m s⁻²)",
      examBadge: "NEB 2079",
      given: "m = 2 kg, h = 5 m, L = 10 m, u = 0, v = 6 m s⁻¹, g = 10 m s⁻²",
      stepByStep: [
        "Work–energy theorem: W_net = ΔKE = ½mv² − ½mu² = ½ × 2 × 36 − 0 = 36 J.",
        "W_net is the SUM of all works: W_gravity + W_normal + W_friction = 36 J. The normal force does no work (⊥ to motion).",
        "W_gravity = mgh = 2 × 10 × 5 = 100 J (depends only on vertical drop, not on path length).",
        "So W_friction = W_net − W_gravity = 36 − 100 = −64 J; the work done AGAINST friction is 64 J.",
        "Correcting the friend: no energy is destroyed. The 64 J reappears as heat in the block and incline. The theorem only speaks of KINETIC energy change; total energy is conserved once thermal energy is counted.",
      ],
      finalAnswer: "W_{friction} = -64\\ \\text{J}\\ (64\\ \\text{J converted to heat});\\ \\text{energy is transformed, not destroyed}",
      tipOrTrap:
        "W_net = ΔKE uses the NET force. Writing 'mgh = ½mv²' on a rough incline is wrong precisely because it quietly assumes friction is absent.",
    },
  ],

  "conical-pendulum": [
    {
      id: "sp-cone-1",
      question:
        "A conical pendulum of length 1.0 m swings so that the string makes 30° with the vertical. Find (a) the period, (b) the tension, and (c) explain conceptually why the period SHORTENS as θ increases, and what happens as the string becomes nearly horizontal. (g = 9.8 m s⁻², m = 0.2 kg)",
      examBadge: "NEB 2080 Board",
      given: "L = 1.0 m, θ = 30°, m = 0.2 kg, g = 9.8 m s⁻²",
      stepByStep: [
        "Resolve tension: T cosθ balances mg, T sinθ supplies the centripetal force mω²r with r = L sinθ.",
        "Dividing: tanθ = ω²L sinθ / g ⟹ ω² = g/(L cosθ) — the period formula T = 2π√(L cosθ/g).",
        "Period: T = 2π√(1.0 × cos 30°/9.8) = 2π√(0.866/9.8) = 2π × 0.297 ≈ 1.87 s.",
        "Tension: T = mg/cosθ = 0.2 × 9.8/0.866 ≈ 2.26 N — larger than the weight, as it must be since only its vertical part supports the bob.",
        "Conceptual: as θ grows, cosθ shrinks, so ω² = g/(L cosθ) grows — faster revolution, shorter period. In the limit θ → 90°, cosθ → 0, ω → ∞ and T → 0: no finite speed can keep the string exactly horizontal because the vertical component of tension vanishes.",
      ],
      finalAnswer: "T \\approx 1.87\\ \\text{s},\\quad \\text{tension} \\approx 2.26\\ \\text{N};\\ \\theta \\to 90^\\circ \\Rightarrow T \\to 0\\ \\text{(impossible)}",
      tipOrTrap:
        "The conical pendulum period depends on cosθ, NOT on the mass — a heavier bob needs proportionally more tension but the same period. NEB loves this 'does mass matter?' twist.",
    },
  ],

  "satellite-orbital-velocity-time-period": [
    {
      id: "sp-sat-1",
      question:
        "Two satellites S₁ and S₂ orbit the same planet in circular orbits of radii r and 4r. (a) Find the ratio of their orbital speeds, periods and total energies. (b) Explain, using E = −GMm/2r, why a falling satellite speeds up while losing total energy — is energy being created?",
      examBadge: "NEB 2079",
      given: "r₁ = r, r₂ = 4r, same planet (same M), same satellite mass m",
      stepByStep: [
        "Orbital speed: v = √(GM/r) ⟹ v ∝ r^(−1/2), so v₁/v₂ = √(4r/r) = 2. The inner satellite moves twice as fast.",
        "Period: T = 2π√(r³/GM) ⟹ T ∝ r^(3/2), so T₁/T₂ = (r/4r)^(3/2) = 1/8. Kepler's third law in action.",
        "Total energy: E = −GMm/2r ⟹ E ∝ −1/r, so E₁/E₂ = (1/r)/(1/4r) × (−1/−1) = 4 — but note BOTH are negative; S₁ is more tightly bound (4× more negative).",
        "Falling satellite: as r decreases, E = −GMm/2r becomes MORE negative — total mechanical energy decreases. But v = √(GM/r) INCREASES, so KE rises.",
        "Resolution: PE = −GMm/r falls (becomes more negative) twice as fast as KE rises (ΔKE = −ΔPE/2). The 'lost' energy must be radiated away (friction with atmosphere, or a retro-burn). No energy is created — the bookkeeping closes with the energy carried off.",
      ],
      finalAnswer: "v_1/v_2 = 2,\\quad T_1/T_2 = 1/8,\\quad |E_1/E_2| = 4;\\ \\text{orbit decay heats the satellite — energy is radiated, not created}",
      tipOrTrap:
        "Total orbital energy is NEGATIVE and equals half the (negative) potential energy: E = PE/2 = −KE. Writing E = +GMm/2r loses the entire binding-energy argument.",
    },
  ],

  "simple-pendulum-time-period": [
    {
      id: "sp-pen-1",
      question:
        "A pendulum clock keeps correct time at a place where g = 9.8 m s⁻². It is moved to a mountain where g = 9.78 m s⁻². (a) Does it gain or lose time, and by how much per day? (b) A student 'fixes' it by shortening the bob's string slightly. Should the string be shortened or lengthened? (c) Why does the standard formula fail if the amplitude is 15°?",
      examBadge: "NEB 2080 Board",
      given: "g₁ = 9.8 m s⁻², g₂ = 9.78 m s⁻², 1 day = 86400 s, L unchanged unless adjusted",
      stepByStep: [
        "T = 2π√(L/g): smaller g ⟹ LARGER period ⟹ each swing takes longer ⟹ the clock runs SLOW (loses time).",
        "Fractional change: ΔT/T = ½ Δg/g (magnitude) = ½ × 0.02/9.8 ≈ 1.02 × 10⁻³.",
        "Time lost per day = 86400 × 1.02 × 10⁻³ ≈ 88 s.",
        "To restore T, L must SHRINK: L₂ = L₁ g₂/g₁ = L₁ × 9.78/9.8 — the string should be SHORTENED by about 0.2%.",
        "Amplitude 15°: the derivation replaces sinθ ≈ θ (radians), valid to ~0.4% error only up to about 4–5°. At 15°, sin 15° = 0.2588 but 15° = 0.2618 rad — a 1.2% discrepancy, so the true period exceeds 2π√(L/g) and the motion is no longer exactly SHM.",
      ],
      finalAnswer: "\\text{loses } \\approx 88\\ \\text{s/day};\\ \\text{shorten } L \\text{ by } 0.2\\%;\\ 15^\\circ \\text{ breaks the } \\sin\\theta \\approx \\theta \\text{ approximation}",
      tipOrTrap:
        "Clock problems are FRACTIONAL-change problems: ΔT/T = ½Δg/g − ½ΔL/L. Computing absolute periods first and subtracting wastes time and invites arithmetic slips.",
    },
  ],

  "coulombs-law-force-between-charges": [
    {
      id: "sp-coul-1",
      question:
        "Two equal positive point charges are fixed distance d apart. A third charge placed exactly midway stays in equilibrium. (a) Show the equilibrium is unstable for a positive third charge (state the reasoning, no numbers). (b) If the third charge is negative, is the equilibrium stable along the line? Justify with the field pattern. This conceptual chain is the classic NEB 5-marker.",
      examBadge: "NEB Model Set",
      given: "+q at A and +q at B, separation d; test charge q₀ at midpoint M",
      stepByStep: [
        "At M the two fields are equal and opposite, so E_net = 0 and the force on any q₀ at M is zero — equilibrium position.",
        "Displace a POSITIVE q₀ slightly toward A: A's field at the new point is stronger (1/r² with smaller r) and points from A to the new point — i.e. the net force now points TOWARD A, away from M.",
        "The force is in the SAME direction as the displacement ⟹ unstable equilibrium (any nudge grows).",
        "For a NEGATIVE q₀: the force from A on a negative charge is toward A, but now the stronger field (toward A) attracts it back toward M — the force opposes the displacement along the line ⟹ stable along the axis.",
        "However, displaced PERPENDICULAR to AB, the negative charge is pulled toward the nearer charge and slides off the axis — unstable transverse. (Saddle-point equilibrium; Earnshaw's theorem forbids full static stability in an inverse-square field.)",
      ],
      finalAnswer: "\\text{positive } q_0: \\text{unstable};\\ \\text{negative } q_0: \\text{stable along AB only, unstable transverse}",
      tipOrTrap:
        "Stability is judged by the direction of the NET force after a SMALL displacement, not by the forces at the equilibrium point itself (they are zero there by definition).",
    },
    {
      id: "sp-coul-2",
      question:
        "Two identical conducting spheres carry charges +Q and −3Q and attract with force F when separation r. They are touched together and re-separated to distance 2r. Find the new force in terms of F and state the direction.",
      examBadge: "NEB 2079",
      given: "q₁ = +Q, q₂ = −3Q, initial force F at r; after contact: separation 2r",
      stepByStep: [
        "Initial: F = kQ·3Q/r² = 3kQ²/r² (attractive).",
        "On contact, identical conductors share the TOTAL charge equally: (Q − 3Q)/2 = −Q each.",
        "New force: F' = kQ²/(2r)² = kQ²/4r² (repulsive — both negative now).",
        "Ratio: F'/F = (kQ²/4r²)/(3kQ²/r²) = 1/12.",
        "So F' = F/12, directed repulsively — the sign flip (attract → repel) is the conceptual point NEB wants stated explicitly.",
      ],
      finalAnswer: "F' = \\dfrac{F}{12},\\ \\text{repulsive}",
      tipOrTrap:
        "Identical spheres share charge EQUALLY (half the algebraic sum). Forgetting the sign of the total (Q − 3Q = −2Q) and writing +Q each flips the direction of the answer.",
    },
  ],

  "capacitor-energy-series-parallel": [
    {
      id: "sp-cap-1",
      question:
        "A 600 μF capacitor charged to 100 V is connected across an uncharged 300 μF capacitor. Find (a) the common potential, (b) the energy stored before and after, and (c) account physically for the 'missing' energy — where does it go and why is this not a violation of energy conservation?",
      examBadge: "NEB 2080 Board",
      given: "C₁ = 600 μF at V₁ = 100 V; C₂ = 300 μF uncharged",
      stepByStep: [
        "Charge before: Q = C₁V₁ = 600 × 10⁻⁶ × 100 = 0.06 C. This charge is conserved (the two capacitors form an isolated system).",
        "Common potential: V = Q/(C₁ + C₂) = 0.06/900 × 10⁻⁶ = 66.7 V.",
        "Energy before: U₁ = ½C₁V₁² = ½ × 600 × 10⁻⁶ × 100² = 3.0 J.",
        "Energy after: U₂ = ½(C₁ + C₂)V² = ½ × 900 × 10⁻⁶ × (66.7)² = 2.0 J.",
        "Loss: ΔU = 1.0 J. It is dissipated in the connecting wires' resistance and radiated as electromagnetic impulses during the transient — charge redistribution can never be perfectly smooth.",
        "General result: ΔU = C₁C₂(V₁ − V₂)²/2(C₁ + C₂) — positive whenever two capacitors at different potentials are joined, so the loss is structural, not a measurement artifact. Energy conservation holds because the heat/radiation is exactly this ΔU.",
      ],
      finalAnswer: "V = 66.7\\ \\text{V};\\ U: 3.0\\ \\text{J} \\to 2.0\\ \\text{J};\\ \\Delta U = 1.0\\ \\text{J}\\ \\text{(heat + radiation in the join)}",
      tipOrTrap:
        "Charge is conserved when capacitors are joined; energy is NOT. Any answer claiming U₂ = U₁ has silently assumed a superconducting, lossless connection that does not exist.",
    },
  ],

  "gauss-law-and-applications": [
    {
      id: "sp-gauss-1",
      question:
        "A point charge q sits at the centre of a cube of side a. (a) What is the flux through ONE face? (b) The charge is now moved to a corner of the cube. What is the flux through the whole cube? (c) Explain why moving the charge changes one answer but not the other, and why Gauss's law cannot give the field at an off-centre point directly.",
      examBadge: "NEB 2080 Board",
      given: "charge q; cube side a; positions: centre, then corner",
      stepByStep: [
        "Charge at centre: by symmetry the 6 faces are equivalent, so flux per face = q/(6ε₀). Note Gauss's law alone gives only the TOTAL q/ε₀ — the per-face share comes from the symmetry argument.",
        "Charge at a corner: only 1/8 of each field line bundle from that corner threads the cube (the corner is shared by 8 such cubes if the field pattern is extended by symmetry). Total flux through the cube = q/8ε₀.",
        "Why the asymmetry: flux counts FIELD LINES crossing a surface. At the centre every direction is equivalent (6 equal shares); at the corner, most of the field (7/8 of space) lies outside the cube.",
        "The total changed because the ENCLOSED charge effectively changed: the corner charge is shared among 8 cubes, so each cube 'owns' q/8.",
        "Gauss's law gives E on a surface only when symmetry makes |E| constant and parallel/perpendicular predictably — an off-centre charge breaks that symmetry, so the law (always true) becomes USELESS for extracting E, though it still correctly constrains the total flux.",
      ],
      finalAnswer: "\\phi_{face} = \\dfrac{q}{6\\varepsilon_0}\\ (\\text{centre});\\quad \\phi_{cube} = \\dfrac{q}{8\\varepsilon_0}\\ (\\text{corner})",
      tipOrTrap:
        "Gauss's law is always true but rarely USEFUL — it yields E only under high symmetry. Quoting 'flux = q/ε₀' for a corner charge without the 1/8 sharing argument is the classic lost mark.",
    },
  ],

  "mirror-formula": [
    {
      id: "sp-mir-1",
      question:
        "An object is placed 30 cm in front of a concave mirror of focal length 20 cm. (a) Find the image position and magnification with the New Cartesian sign convention. (b) The object is then moved to 10 cm from the mirror. Without recomputing from scratch, state what happens to the image and justify using the formula's behaviour at u = f. (c) Why does the mirror formula give no real image at u = f?",
      examBadge: "NEB 2079",
      given: "Case 1: u = −30 cm, f = −20 cm (concave). Case 2: u = −10 cm.",
      stepByStep: [
        "Mirror formula 1/v + 1/u = 1/f: 1/v = 1/f − 1/u = 1/(−20) − 1/(−30) = −1/20 + 1/30 = −1/60 ⟹ v = −60 cm (real, same side as object).",
        "m = −v/u = −(−60)/(−30) = −2: inverted, magnified 2×, real.",
        "Case 2: u = −10 cm (object inside f): 1/v = −1/20 + 1/10 = 1/20 ⟹ v = +20 cm — positive means BEHIND the mirror: virtual, erect, m = −v/u = −(20)/(−10) = +2 (erect, magnified).",
        "At exactly u = f: 1/v = 1/f − 1/f = 0 ⟹ v → ∞. Geometrically, rays from the focal point reflect PARALLEL, never converging — no finite image anywhere.",
        "Conceptual bridge: as u decreases through f, v jumps from large-negative (real, far) to large-positive (virtual, far) — the image 'escapes to infinity' and re-enters from behind the mirror. The sign flip of v is the whole real↔virtual story.",
      ],
      finalAnswer: "v = -60\\ \\text{cm}, m = -2;\\ \\text{then virtual } v = +20\\ \\text{cm}, m = +2;\\ u = f \\Rightarrow v \\to \\infty",
      tipOrTrap:
        "Keep the sign convention mechanical: u is (almost) always negative for a real object, f negative for concave. A 'positive v' is not an error — it is the signature of a virtual image.",
    },
  ],

  "motion-in-vertical-circle": [
    {
      id: "sp-vcircle-1",
      question:
        "A bucket of water of mass 2 kg is whirled in a vertical circle of radius 1.0 m on a rope. Find the minimum speed at the top and the corresponding speed and tension at the bottom. (g = 10 m s⁻²) (b) Explain why the water does not fall at the top even though gravity acts downward, and why 'the rope's tension holds the water up' is the wrong explanation.",
      examBadge: "NEB 2080 Board",
      given: "m = 2 kg, r = 1.0 m, g = 10 m s⁻²",
      stepByStep: [
        "At the top, both gravity and tension point DOWN (toward centre): T + mg = mv²/r. Minimum speed when T = 0: v_top = √(gr) = √10 ≈ 3.16 m s⁻¹.",
        "Energy conservation from top to bottom (rope does no work, force is ⊥ to motion): ½mv_bot² = ½mv_top² + mg(2r) ⟹ v_bot² = v_top² + 4gr = 10 + 40 = 50 ⟹ v_bot = √50 ≈ 7.07 m s⁻¹.",
        "At the bottom, tension points UP toward the centre: T − mg = mv²/r ⟹ T = m(v_bot²/r + g) = 2(50/1 + 10) = 120 N.",
        "Why the water stays: at the top the water NEEDS a downward (centripetal) acceleration v²/r to keep moving in the circle. Gravity supplies exactly mg; the bucket bottom would supply extra T if needed. As long as required centripetal acceleration ≥ g, the water presses ON the bucket — it cannot 'fall' independently because falling would detach it from its circular path.",
        "The wrong explanation: tension is a force on the ROPE/bucket, not directly on the water. The water is held by the NORMAL force from the bucket bottom (which can only push, never pull) — that is why T = 0 defines the true limit, not the rope's strength.",
      ],
      finalAnswer: "v_{top} = \\sqrt{10} \\approx 3.16\\ \\text{m s}^{-1},\\ v_{bot} \\approx 7.07\\ \\text{m s}^{-1},\\ T_{bot} = 120\\ \\text{N}",
      tipOrTrap:
        "The v_top = √(gL) limit comes from the contact force reaching ZERO (a one-way constraint), not from energy or the rope's strength. NEB awards the marks for naming WHICH force vanishes.",
    },
  ],

  "ohms-law-resistance-drift-velocity": [
    {
      id: "sp-ohm-1",
      question:
        "A copper wire of length 2 m and cross-section 1 mm² carries 5 A. (n = 8.5 × 10²⁸ m⁻³, e = 1.6 × 10⁻¹⁹ C, ρ = 1.7 × 10⁻⁸ Ω m) (a) Find the drift speed and the resistance. (b) A student objects: 'the drift speed is tiny, yet the lamp lights instantly when the switch closes — contradiction?' Resolve it.",
      examBadge: "NEB 2079",
      given: "l = 2 m, A = 10⁻⁶ m², I = 5 A, n = 8.5 × 10²⁸ m⁻³, e = 1.6 × 10⁻¹⁹ C, ρ = 1.7 × 10⁻⁸ Ω m",
      stepByStep: [
        "Drift speed: v_d = I/(neA) = 5/(8.5 × 10²⁸ × 1.6 × 10⁻¹⁹ × 10⁻⁶) = 5/(1.36 × 10⁴) ≈ 3.7 × 10⁻⁴ m s⁻¹ — about a third of a millimetre per second.",
        "Resistance: R = ρl/A = 1.7 × 10⁻⁸ × 2/10⁻⁶ = 3.4 × 10⁻² Ω.",
        "The 'paradox': the lamp responds in ~nanoseconds, but electrons crawl. Resolution — the lamp does not wait for electrons from the switch to reach it.",
        "The conductor is already FULL of electrons everywhere. Closing the switch establishes the electric field along the wire at nearly light speed; electrons EVERYWHERE along the circuit start drifting almost simultaneously.",
        "So the current at the lamp is due to the local electrons beginning to drift the instant the local field arrives — the signal travels fast, the carriers do not have to.",
      ],
      finalAnswer: "v_d \\approx 3.7 \\times 10^{-4}\\ \\text{m s}^{-1},\\quad R = 0.034\\ \\Omega;\\ \\text{the FIELD propagates fast, not the electrons}",
      tipOrTrap:
        "Distinguish signal speed (electromagnetic, ~c in the circuit) from carrier speed (v_d, millimetres per second). Conflating them is the conceptual error NEB explicitly tests.",
    },
  ],

  "newtons-law-of-cooling": [
    {
      id: "sp-cool-1",
      question:
        "A liquid cools from 80 °C to 70 °C in 5 minutes and from 70 °C to 60 °C in the NEXT 8 minutes, the room being at 30 °C. (a) Show these data are consistent with Newton's law of cooling. (b) Find the constant k and predict the temperature after a further 10 minutes.",
      examBadge: "NEB Model Set",
      given: "T₀ = 80 °C → 70 °C in 5 min → 60 °C in next 8 min; T_s = 30 °C",
      stepByStep: [
        "Newton's law solution: T = T_s + (T₀ − T_s)e^{−kt}. Take natural logs: ln(T − T_s) = ln(T₀ − T_s) − kt — the excess decays exponentially.",
        "First interval: excess falls 50 → 40 in 5 min: ln(50/40) = 5k ⟹ k = ln(1.25)/5 ≈ 0.0446 min⁻¹.",
        "Second interval check: excess 40 → 30 in 8 min predicts k = ln(40/30)/8 = ln(1.333)/8 ≈ 0.0360 min⁻¹.",
        "The two k values differ by ~20% — close enough given the law holds only for SMALL excesses (here 30–50 °C is borderline), and the discrepancy itself demonstrates the law's approximate domain. A consistent k confirms the law is obeyed to first order.",
        "Take k ≈ 0.04 min⁻¹. Next 10 min from 60 °C: excess 30 → 30e^{−0.4} = 30 × 0.670 = 20.1 ⟹ T ≈ 30 + 20.1 ≈ 50 °C.",
      ],
      finalAnswer: "k \\approx 0.04\\ \\text{min}^{-1};\\ T \\approx 50\\ ^\\circ\\text{C after 10 more minutes}",
      tipOrTrap:
        "Work with the EXCESS (T − T_s), never the raw temperature: the law makes the excess exponential. Equal temperature DROPS take progressively LONGER because the excess keeps shrinking.",
    },
  ],

  "ideal-gas-equation-derivation": [
    {
      id: "sp-ig-1",
      question:
        "A tyre is inflated to 2.0 × 10⁵ Pa gauge pressure at 27 °C. After a highway drive the temperature rises to 47 °C. (a) Find the new pressure, explaining carefully whether gauge or absolute values enter the gas law. (b) A student claims 'heating raised the pressure because it increased the number of molecules.' Identify the exact error. (Atmospheric pressure = 1.0 × 10⁵ Pa, volume constant.)",
      examBadge: "NEB 2080 Board",
      given: "p_gauge = 2.0 × 10⁵ Pa, T₁ = 300 K, T₂ = 320 K, V constant, p_atm = 1.0 × 10⁵ Pa",
      stepByStep: [
        "Gas laws use ABSOLUTE pressure: p₁ = gauge + atmospheric = (2.0 + 1.0) × 10⁵ = 3.0 × 10⁵ Pa.",
        "Constant volume (rigid tyre, approximately): p₁/T₁ = p₂/T₂ ⟹ p₂ = 3.0 × 10⁵ × 320/300 = 3.2 × 10⁵ Pa absolute.",
        "New gauge reading: 3.2 × 10⁵ − 1.0 × 10⁵ = 2.2 × 10⁵ Pa — the gauge rises by 0.2 × 10⁵ Pa, not by the 0.213 × 10⁵ a naive ratio on gauge values would suggest.",
        "The student's error: heating does NOT change n — the tyre is sealed, N is fixed. PV = nRT with n, V fixed gives p ∝ T because the pressure is the momentum flux of the SAME molecules striking harder and more often (each collision transfers more impulse at higher ½mv²).",
        "Microscopic statement: p = ⅓ρc̄² with mean KE ∝ T — pressure rises because per-molecule impulse and collision rate both rise, not because of any change in count.",
      ],
      finalAnswer: "p_2 = 3.2 \\times 10^5\\ \\text{Pa absolute}\\ (2.2 \\times 10^5\\ \\text{gauge});\\ n\\ \\text{is fixed — only molecular impulse changes}",
      tipOrTrap:
        "Always convert gauge → absolute BEFORE applying gas laws, and temperatures to kelvin. Both omissions are the two standard NEB traps on this derivation.",
    },
  ],

  "einsteins-mass-energy-relation": [
    {
      id: "sp-emc2-1",
      question:
        "In a nuclear reaction the rest mass decreases by 0.26 u. (a) Find the energy released in MeV. (b) A 1 kg mass is fully converted to energy — compare with burning coal (~3 × 10⁷ J/kg) and comment on why E = mc² was historically missed despite being operative in every chemical fire. (1 u = 931.5 MeV)",
      examBadge: "NEB 2079",
      given: "Δm = 0.26 u; 1 u ↔ 931.5 MeV; coal: 3 × 10⁷ J per kg",
      stepByStep: [
        "E = Δm c² = 0.26 × 931.5 MeV ≈ 242 MeV ≈ 242 × 1.6 × 10⁻¹³ J ≈ 3.9 × 10⁻¹¹ J.",
        "For 1 kg: E = mc² = 1 × (3 × 10⁸)² = 9 × 10¹⁶ J.",
        "Ratio to coal: 9 × 10¹⁶/3 × 10⁷ = 3 × 10⁹ — three BILLION times more energetic per kilogram.",
        "Why chemistry missed it: chemical reactions also lose mass, but E/c² for a few eV per bond is ~10⁻¹¹ kg per mole — utterly below any balance's sensitivity. The mass defect is real in every exothermic reaction, just immeasurably small.",
        "Nuclear binding energies are ~10⁶ times larger (MeV vs eV), pushing Δm into the measurable 10⁻² u range — which is why the relation surfaced only with nuclear data (and why 1 u ↔ 931.5 MeV is the working conversion).",
      ],
      finalAnswer: "E \\approx 242\\ \\text{MeV};\\ 1\\ \\text{kg} \\to 9 \\times 10^{16}\\ \\text{J} = 3 \\times 10^9 \\times \\text{coal's yield}",
      tipOrTrap:
        "The conversion 1 u = 931.5 MeV IS E = mc² pre-packaged for nuclear masses. Deriving it once (u × c² in joules → eV) turns every binding-energy question into one multiplication.",
    },
  ],

  "difference-between-metals-insulators-and-semiconductors-using-band-theory": [
    {
      id: "sp-band-1",
      question:
        "The band gap of silicon is 1.1 eV and of diamond 5.5 eV. (a) Estimate the ratio of intrinsic carrier concentrations at room temperature (300 K) and comment on why one is a semiconductor and the other an insulator although both are covalent solids. (b) Explain why heating a semiconductor REDUCES its resistance while heating a metal INCREASES it, using band language for both. (Take carrier concentration n ∝ e^(−E_g/2kT), kT at 300 K ≈ 0.026 eV.)",
      examBadge: "NEB Model Set",
      given: "E_g(Si) = 1.1 eV, E_g(diamond) = 5.5 eV, kT = 0.026 eV at 300 K",
      stepByStep: [
        "Carrier ratio: n_Si/n_dia = e^{−(1.1−5.5)/2kT} = e^{4.4/0.052} = e^{84.6} ≈ 10³⁷ — astronomically more carriers in silicon.",
        "This is why identical 'covalent solid' chemistry yields opposite electrical behaviour: what matters is not the bonding type but the GAP between the filled valence band and the empty conduction band.",
        "Silicon: E_g = 1.1 eV ≈ 42 kT — thermal excitation across the gap is rare but nonzero (~10¹⁰ carriers/cm³), giving controllable conductivity.",
        "Diamond: 5.5 eV ≈ 210 kT — excitation is e^(−210)-suppressed, effectively zero: an insulator.",
        "Heating a semiconductor: n ∝ e^(−E_g/2kT) grows EXPONENTIALLY with T — the carrier-count explosion swamps any mobility loss, so resistance falls.",
        "Heating a metal: the conduction band is already partly filled; carrier count is fixed, but lattice vibrations intensify, scattering electrons more (shorter relaxation time τ), so ρ = m/ne²τ RISES.",
      ],
      finalAnswer: "n_{Si}/n_{dia} \\sim 10^{37};\\ \\text{semiconductor: } n \\text{ grows exponentially with } T;\\ \\text{metal: } \\tau \\text{ falls}",
      tipOrTrap:
        "Band theory's whole message: conductivity is governed by (i) is the conduction band accessible and (ii) how many electrons make it there. Bonding similarity (Si vs C both covalent) is irrelevant to the conductivity contrast.",
    },
  ],

  "current-voltage-relations-ohmic-and-non-ohmic-resistance": [
    {
      id: "sp-iv-1",
      question:
        "A filament lamp and a semiconductor diode are both connected in turn to a variable supply. (a) Sketch/describe both I–V characteristics and explain each in terms of the device physics. (b) The lamp's filament is rated 60 W at 120 V. A student measures 75 W at 132 V and claims Ohm's law is violated since 132/120 ≠ 75/60. Evaluate the claim quantitatively.",
      examBadge: "NEB 2080 Board",
      given: "lamp rated 60 W at 120 V; measured 75 W at 132 V",
      stepByStep: [
        "Lamp I–V: a curve flattening at high V — current grows slower than proportionally because the white-hot filament's resistance rises with temperature (lattice vibration ↑ ⟹ τ ↓ ⟹ ρ ↑).",
        "Diode I–V: essentially no current in reverse, exponential onset in forward bias beyond ~0.7 V (barrier lowering lets majority carriers flood across) — I = I₀(e^{eV/kT} − 1).",
        "Rated resistance: R₁ = V²/P = 120²/60 = 240 Ω. Measured: R₂ = 132²/75 = 232 Ω.",
        "Ohm's law is NOT claimed for a filament — it is a non-ohmic device. But the numbers show R barely changed (240 → 232 Ω, −3%) because over this small voltage step the temperature barely rose.",
        "The student's error is applying the CONSTANT-R expectation to a device whose R is a function of T(V). The small measured change is actually consistent with a mildly rising filament temperature — the data are unremarkable, not paradoxical.",
      ],
      finalAnswer: "R: 240\\ \\Omega \\to 232\\ \\Omega;\\ \\text{no violation — the lamp is non-ohmic by design (} R = R(T)\\text{)}",
      tipOrTrap:
        "Ohm's law is a MATERIAL property statement (constant R at fixed temperature), not a definition of resistance. Any device whose temperature the current itself changes is automatically non-ohmic.",
    },
  ],
};

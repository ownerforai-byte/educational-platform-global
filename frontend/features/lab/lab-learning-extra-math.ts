/**
 * Learning packs for the mathematics labs that had none — previously
 * "Under progress". Same `LabLearningPack` shape as `lab-learning.ts`,
 * merged by `getLabLearning`.
 */

import type { LabLearningPack } from "./lab-learning";

export const EXTRA_LEARNING_MATH: Record<string, LabLearningPack> = {
  "math-3d-geometry": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Point P(1, 2, 3) against the plane 2x − y + 2z = 9",
      steps: [
        { text: "Normal vector is read straight off the coefficients:", math: "n = (2, −1, 2), |n| = √9 = 3" },
        { text: "Point-to-plane distance:", math: "d = |2(1) − (2) + 2(3) − 9|/3 = |−3|/3 = 1" },
        { text: "Angle of a line (direction d = (2,1,2)) with the plane — note SINE, not cosine:", math: "sinθ = |d·n|/(|d||n|) = |4 − 1 + 4|/(3·3) = 7/9 → θ = 51.1°" },
        { text: "Foot of the perpendicular: P − (signed distance)·n̂:", math: "P + (3/9)·(2,−1,2) = (1+2/3, 2−1/3, 3+2/3) = (5/3, 5/3, 11/3) — check: 2(5/3) − 5/3 + 2(11/3) = 9 ✓" },
        { text: "Sphere with centre P through the plane's foot:", math: "(x−1)² + (y−2)² + (z−3)² = 1" },
      ],
      takeaway: "The plane's coefficients ARE its normal vector — distance is one dot product away, the foot of the perpendicular is one scaled step along n̂, and the line-plane angle hides in sinθ.",
    },
    theory: [
      {
        heading: "Lines and planes in space",
        body: "A plane is a point plus a normal: ax + by + cz = d, or r·n = d. A line is a point plus a direction: r = r₀ + t·v. Converting between forms is routine — two planes' cross product gives the direction of their intersection line; a point and two directions give a plane via normal = v₁×v₂. Direction cosines (cos α, cos β, cos γ) satisfy cos²α + cos²β + cos²γ = 1.",
      },
      {
        heading: "Distances and angles in 3D",
        body: "Point-plane: |n·(P − P₀)|/|n|. Point-line: |(P − P₀)×v|/|v| (cross-product form) or the perpendicular component of (P − P₀) (projection form). Skew lines: |(P₂−P₁)·(v₁×v₂)|/|v₁×v₂| — the triple product. Line-plane angle uses sinθ (because the line's angle with the NORMAL is complementary); plane-plane angle uses cosθ of the normals.",
      },
    ],
    confusions: [
      {
        wrong: "The angle between a line and a plane uses cos.",
        right: "sinθ = |d·n|/(|d||n|) — the line is steep when it is near-perpendicular to the normal, so sine captures the tilt from the plane.",
        why: "Every other 3D angle formula uses cosine.",
      },
      {
        wrong: "Direction cosines are the angles themselves.",
        right: "They are the COSINES of the axis angles: (3/13, 4/13, 12/13) for A = 3î+4ĵ+12k̂ — and their squares sum to 1, not the angles themselves to anything nice.",
        why: "The word 'cosine' is dropped in practice.",
      },
      {
        wrong: "A plane's normal is unique.",
        right: "Unique up to scale and sign: (2,−1,2), (−4,2,−4) and (4,−2,4) all describe the same perpendicular direction.",
        why: "Textbooks always print one normal, so uniqueness is assumed.",
      },
    ],
    questions: [
      { q: "Distance between parallel planes 2x−y+2z=9 and 2x−y+2z=15?", a: "|15−9|/3 = 2 — same normal, difference of constants over |n|.", hint: "Normalize once." },
      { q: "Direction of the line of intersection of x+y=0 and y+z=0?", a: "n₁×n₂ = (1,1,0)×(0,1,1) = (1,−1,1).", hint: "Cross the normals." },
      { q: "Does the point (5/3, 5/3, 11/3) lie on 2x − y + 2z = 9?", a: "10/3 − 5/3 + 22/3 = 27/3 = 9 ✓ — yes.", hint: "Substitute." },
    ],
  },

  "math-3d-perpendicular": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Distance from P(2, −1, 3) to the line through A(1, 0, 1) with direction v = (2, 3, 1)",
      steps: [
        { text: "Vector from the line to the point:", math: "AP = (1, −1, 2)" },
        { text: "Cross-product route — the parallelogram area divided by the base:", math: "AP×v = (−7, 3, 5), |AP×v| = √83 ≈ 9.11; |v| = √14 ≈ 3.74" },
        { text: "Distance:", math: "d = √83/√14 = 2.43" },
        { text: "Projection route — subtract the along-line part:", math: "AP·v = 1; |AP|² = 6; d = √(6 − 1/14) = √5.93 = 2.43 ✓ (two methods agree)" },
        { text: "Foot of the perpendicular:", math: "A + (AP·v/|v|²)·v = A + (1/14)(2,3,1) = (8/7, 3/14, 15/14)" },
      ],
      takeaway: "Point-to-line distance is a parallelogram: the cross product builds it, the line direction is its base, and dividing area by base leaves the height — the projection method is the same truth in subtractive form.",
    },
    theory: [
      {
        heading: "The two distance formulas and when each wins",
        body: "Cross-product form d = |AP×v|/|v| is one clean shot — best when you want the distance only. Projection form d² = |AP|² − (AP·v)²/|v|² exposes the foot of the perpendicular as a by-product — best when you also need WHERE the perpendicular lands. Both are Pythagoras in disguise.",
      },
      {
        heading: "Perpendicular distance is the theme of coordinate geometry",
        body: "The same 'drop a perpendicular' move recurs: point-to-line in 2D |ax₀+by₀+c|/√(a²+b²), point-to-plane |n·(P−P₀)|/|n|, point-to-line in 3D, skew-line separation via the triple product. Every one is 'distance along the normal direction, divided by the norm' — learn the pattern once, apply it four times.",
      },
    ],
    confusions: [
      {
        wrong: "Plug the point into the formula without normalising.",
        right: "Dividing by |v| (or |n|) is the step that converts a signed expression into a true distance — skip it and the 'distance' scales wrongly.",
        why: "The formula is memorised as a fraction and the denominator is treated as decoration.",
      },
      {
        wrong: "Measure from any old point on the line.",
        right: "Any point ON the line works — but only because the perpendicular foot compensates. Pick a clean one (A) and trust the algebra.",
        why: "Choosing the 'wrong' reference point seems to change the answer when arithmetic slips.",
      },
      {
        wrong: "The perpendicular foot lies between two known points on the segment.",
        right: "The foot lies on the infinite LINE; it can sit outside the segment you drew — the distance to the segment would then be to an endpoint.",
        why: "Diagrams usually show the foot inside.",
      },
    ],
    questions: [
      { q: "Distance from (0,0,0) to the line r = (1,2,3) + t(1,1,1)?", a: "AP = (−1,−2,−3); AP×v = (1, −2, 1); |AP×v| = √6; |v| = √3 → d = √6/√3 = √2.", hint: "Cross product over base." },
      { q: "Distance from (1,2,3) to plane x + 2y − 2z = 5?", a: "|1 + 4 − 6 − 5|/√9 = 6/3 = 2.", hint: "Point-to-plane form." },
      { q: "Verify the foot (8/7, 3/14, 15/14) lies on the line through (1,0,1) with v = (2,3,1)?", a: "(8/7−1, 3/14−0, 15/14−1) = (1/7, 3/14, 1/14) = (1/14)(2,3,1) ✓ — a scalar multiple of v.", hint: "Check the difference is parallel to v." },
    ],
  },

  "math-3d-surfaces": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "The paraboloid z = x² + y² over the unit disk — area, volume, tangent plane",
      steps: [
        { text: "Surface element for z = f(x, y):", math: "dA = √(1 + f_x² + f_y²) dx dy = √(1 + 4x² + 4y²) dx dy" },
        { text: "Polar conversion (x² + y² = r²) and integrate:", math: "Area = ∫₀^{2π}∫₀¹ √(1+4r²)·r dr dθ = 2π·[(1+4r²)^{3/2}/12]₀¹ = π(5√5 − 1)/6 ≈ 5.33" },
        { text: "Volume beneath it (plain double integral of z):", math: "V = ∫₀^{2π}∫₀¹ r²·r dr dθ = 2π·¼ = π/2 ≈ 1.571 — note the DISK is flat area 3.14, and the paraboloid adds 2.19 more surface" },
        { text: "Tangent plane at (1, 0, 1) — gradients give the local linear model:", math: "f_x = 2, f_y = 0 → z = 1 + 2(x − 1) = 2x − 1" },
        { text: "Gradient direction = steepest ascent:", math: "∇f(1,0) = (2,0) → climb along +x ✓ (checked by z(1.1,0) − z(1,0) = 0.21 vs any other direction)" },
      ],
      takeaway: "One paraboloid, three tools: the stretched area element gives surface area, plain integration gives volume, and the gradient gives the tangent plane — calculus is the machinery that turns 'curved' into computable.",
    },
    theory: [
      {
        heading: "Partial derivatives and the tangent plane",
        body: "f_x = ∂f/∂x holds y constant; the two partials form the gradient ∇f, the direction of fastest increase with magnitude = slope there. The tangent plane at (x₀, y₀): z = f₀ + f_x(x−x₀) + f_y(y−y₀) — the best linear approximation. Extrema need f_x = f_y = 0 plus the second-derivative test (D = f_xx·f_yy − f_xy²).",
      },
      {
        heading: "Multiple integrals and surface area",
        body: "Double integrals add slices: over rectangles directly, over disks/circles via polar (dx dy → r dr dθ — the extra r is the Jacobian). Surface area stretches the element by √(1 + |∇f|²) — flat projection corrected for tilt. Cylindrical/spherical coordinates generalise the Jacobian idea to 3D (ρ² sinφ for spheres).",
      },
    ],
    confusions: [
      {
        wrong: "The Jacobian r in polar is optional decoration.",
        right: "It is the area stretch of the coordinate change: a small dr dθ patch near radius r has area r·dr·dθ. Without it, areas near the origin are over-counted.",
        why: "The substitution is memorised mechanically.",
      },
      {
        wrong: "Partial derivative dz/dx exists.",
        right: "It is ∂z/∂x — a PARTIAL: y is held fixed. The d vs ∂ distinction marks the difference between one-variable and constrained slicing.",
        why: "Handwriting blurs the two symbols.",
      },
      {
        wrong: "A critical point is automatically a max or min.",
        right: "It can be a saddle: z = x² − y² at the origin has zero gradient but rises one way and falls the other — the second-derivative test (D < 0) catches it.",
        why: "Single-variable calculus trains max/min = f' = 0.",
      },
    ],
    questions: [
      { q: "Volume of the paraboloid bowl z = x² + y² up to height 1 (inside out)?", a: "π/2 by shells or the complement of the earlier integral: π − π/2 = π/2 ✓.", hint: "Complement or direct." },
      { q: "Gradient of f = x²y at (1, 2)?", a: "(2xy, x²) = (4, 1).", hint: "Partial by partial." },
      { q: "Tangent plane to z = x² + y² at (0, 1, 1)?", a: "z = 1 + 0(x) + 2(y − 1) = 2y − 1.", hint: "Evaluate partials at the point." },
    ],
  },

  "math-3d-fourier": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "The square wave f = +1 on (0, π), −1 on (−π, 0) decomposed",
      steps: [
        { text: "Odd function → all cosine coefficients vanish (a_n = 0):", math: "only sines survive" },
        { text: "The sine coefficients (odd n only):", math: "b_n = 4/(πn) → f(x) ≈ (4/π)(sin x + sin3x/3 + sin5x/5 + …)" },
        { text: "Three terms at x = π/2 — the value the wave should hit (+1):", math: "(4/π)(1 − 1/3 + 1/5) = 1.103 — overshoot of 10% at the jump" },
        { text: "More terms narrow the overshoot region but never remove it:", math: "Gibbs phenomenon: peak stays ≈ 8.95% above the jump, no matter N" },
        { text: "At the jump itself the series converges to the midpoint:", math: "f(0) → 0 = (1 + (−1))/2 ✓ (Dirichlet's rule)" },
      ],
      takeaway: "Any periodic signal is a chord: sines at harmonics of the fundamental — square wave's odd harmonics at 4/πn. And the corner case is honest: at a jump the series reports the midpoint and rings with Gibbs' fixed 9%.",
    },
    theory: [
      {
        heading: "Orthogonality is the engine",
        body: "Sines and cosines of integer frequency are perpendicular under integration (∫sin mx sin nx dx = 0 for m ≠ n) — that orthogonality is what makes each Fourier coefficient computable independently: project the function on one basis vector at a time. Half-range and complex forms (e^{inx}) are bookkeeping variations of the same projection.",
      },
      {
        heading: "Where Fourier shows up",
        body: "Signals: square waves = odd harmonics, triangle = odd harmonics at 1/n², sawtooth = all harmonics at 1/n — each waveform's harmonic recipe is its Fourier fingerprint. Heat equation: Fourier invented this to solve it (each mode decays as e^{−n²t}). Audio EQs, JPEG (DCT), MRI (k-space) — all 'edit the Fourier coefficients'.",
      },
    ],
    confusions: [
      {
        wrong: "Fourier series only apply to periodic functions.",
        right: "Periodic ones get series; aperiodic ones get the Fourier TRANSFORM (period → ∞ limit). Same idea, one continuum.",
        why: "The series is met first and looks inherently periodic.",
      },
      {
        wrong: "Adding more terms fixes the Gibbs overshoot.",
        right: "More terms make the ringing NARROWER, never shorter: the peak clings to 8.95% of the jump forever.",
        why: "'More terms = better convergence' is true elsewhere.",
      },
      {
        wrong: "The series equals the function everywhere.",
        right: "At jump discontinuities it returns the midpoint of the jump — a deliberate, provable compromise.",
        why: "Convergence is pictured as pointwise everywhere.",
      },
    ],
    questions: [
      { q: "Fourier series of f(x) = x on (−π, π)?", a: "2Σ(−1)^{n+1}·sin(nx)/n — odd function, sine series with alternating signs.", hint: "b_n by integration by parts." },
      { q: "Why does the square wave have only odd harmonics?", a: "Its half-wave symmetry (f(x+π) = −f(x)) kills even n — the shape repeats inverted at half period.", hint: "Symmetry filter." },
      { q: "Value of the 2-term square-wave series at x = π/2?", a: "(4/π)(1 − 1/3) = 0.849 — undershoot before the 3rd term pushes past 1.", hint: "Two terms: 1, −1/3." },
    ],
  },

  "math-3d-decay": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "80 mg of a radioisotope with half-life 5 days — where is it, when?",
      steps: [
        { text: "The half-life ladder:", math: "5 days: 40 mg; 10 days: 20; 15: 10; 20: 5 mg" },
        { text: "Continuous form N = N₀e^{−λt}, λ = ln2/T = 0.1386/day:", math: "N(8) = 80·e^{−1.109} = 26.5 mg ✓ (between the 20 and 40 ladder points)" },
        { text: "Mean lifetime vs half-life:", math: "τ = 1/λ = 7.21 days = T/ln2 — the 'average atom' outlives the half-life by 44%" },
        { text: "Activity (what the Geiger counter sees):", math: "A = λN — proportional to N, so activity halves on the same 5-day clock" },
        { text: "Never zero:", math: "after 50 days (10 half-lives): 80/1024 ≈ 0.078 mg — a thousandth, but never exactly nothing" },
      ],
      takeaway: "Exponential decay has no finish line: each half-life multiplies by ½, so 'when is it gone?' has no answer — only 'how much remains after n half-lives' (N₀/2ⁿ) does.",
    },
    theory: [
      {
        heading: "The decay law and where it comes from",
        body: "dN/dt = −λN is a differential equation whose solution is N = N₀e^{−λt}: the fraction decaying per unit time is CONSTANT, which is why halving takes equal steps. Half-life T = ln2/λ and mean life τ = 1/λ relate by τ = T/ln2 ≈ 1.44T. The law is statistical — exact for 10²⁰ atoms, noisy for 10.",
      },
      {
        heading: "Applications: dating and dosing",
        body: "Carbon-14 (T = 5730 y): living things hold a fixed C-14/C-12 ratio; after death it decays — 25% remaining ≈ 11 460 years old. Medical isotopes are chosen for SHORT half-lives (Tc-99m: 6 h — enough for the scan, gone by tomorrow); waste is ranked by LONG ones. The same mathematics runs radioactive decay, RC circuits, drug clearance and Newton's cooling.",
      },
    ],
    confusions: [
      {
        wrong: "After two half-lives, nothing remains.",
        right: "A quarter remains: ½ × ½ = ¼. The asymptote never touches zero.",
        why: "Discrete intuition ('run out') meets a geometric process.",
      },
      {
        wrong: "Half-life depends on how much material you have.",
        right: "It is a property of the NUCLIDE, not the sample — 1 g and 1 tonne of C-14 decay on the same 5730-year clock.",
        why: "Reaction rates in everyday chemistry do depend on amount.",
      },
      {
        wrong: "Decay eventually stops at some point.",
        right: "The process is continuous and asymptotic; 'practically gone' (10 half-lives) is an engineering threshold, not a law.",
        why: "Everything else in daily life finishes.",
      },
    ],
    questions: [
      { q: "Time for 80 mg to reach 5 mg (T = 5 days)?", a: "5/80 = 1/16 = (½)⁴ → 4 half-lives = 20 days.", hint: "Count the halvings." },
      { q: "C-14 sample at 12.5% of living level: age?", a: "3 half-lives = 17 190 years.", hint: "5730 × 3." },
      { q: "Why does Tc-99m suit medical imaging?", a: "6-hour half-life: strong signal during the scan, ~1% left after 40 h — minimal dose after use.", hint: "Match T to the procedure." },
    ],
  },

  "math-3d-labeled": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Labelling the 3D coordinate skeleton — every axis, octant and plane named",
      steps: [
        { text: "The three axes and their signed directions:", math: "x̂ (1,0,0), ŷ (0,1,0), ẑ (0,0,1) — right-handed: x̂ × ŷ = ẑ" },
        { text: "The three coordinate planes, each killing one coordinate:", math: "yz-plane (x = 0), xz-plane (y = 0), xy-plane (z = 0)" },
        { text: "Eight octants; the first octant is the all-positive one:", math: "(+, +, +) — where solids problems usually live" },
        { text: "A point's shadow geometry:", math: "(1, 2, 3): 1 along x, 2 along y, 3 up z; projections (1,2,0), (1,0,3), (0,2,3) are its feet on the planes" },
        { text: "Distance from origin:", math: "|OP| = √(1+4+9) = √14 — 3D Pythagoras across all three axes" },
      ],
      takeaway: "3D coordinates are a labelled machine: three signed axes, three planes where one coordinate dies, eight octants — and every formula (distance, planes, lines) is built on that skeleton.",
    },
    theory: [
      {
        heading: "The coordinate skeleton",
        body: "Origin, three mutually perpendicular axes in right-handed order, three coordinate planes, eight octants. A point (x, y, z) is read as distances along the axes; its absolute-value pattern (+/−) names its octant. Symmetry shortcuts: points mirrored in a plane flip one coordinate; mirrored through the origin flip all three.",
      },
      {
        heading: "Labelling as a problem-solving tool",
        body: "Naming the parts before computing prevents the classic sign chaos: write the axes, mark the point, drop the three shadows, THEN compute. In solids problems (find the volume of the tetrahedron cut by x/a + y/b + z/c = 1), the intercept labels a, b, c turn the plane into a picture first and algebra second.",
      },
    ],
    confusions: [
      {
        wrong: "The xy-plane is where z varies.",
        right: "The xy-plane is where z = 0 — it is the floor; points in it vary in x and y only.",
        why: "The plane's NAME contains x and y, so 'x and y vary' is right — but learners then expect z to vary too.",
      },
      {
        wrong: "Octants are numbered like quadrants, predictably.",
        right: "There are eight (2³ sign combinations); only the first (+,+,+) is universally named; conventions for the rest vary by textbook.",
        why: "Quadrant habits (I–IV) invite the same numbering.",
      },
      {
        wrong: "Handedness is cosmetic.",
        right: "Right-handed vs left-handed decides the SIGN of cross products and the geometry of rotations — flip it and every torques-and-fields computation flips.",
        why: "A mirror flip looks harmless on paper.",
      },
    ],
    questions: [
      { q: "Which plane contains (3, −2, 0) automatically?", a: "The xy-plane (z = 0).", hint: "A zero coordinate places you on that plane." },
      { q: "Distance from (1,2,3) to the x-axis?", a: "√(y² + z²) = √13 — drop the x-coordinate.", hint: "Perpendicular to the axis." },
      { q: "Mirror of (1,2,3) in the xz-plane?", a: "(1, −2, 3) — flip the coordinate the plane 'kills'.", hint: "One sign flips." },
    ],
  },

  "math-3d-syllabus-suite": {
    proof: {
      title: "Proof on a specific case — the math syllabus in one problem",
      case: "Solve, then dissect: minimize f(x, y) = x² + y² subject to x + 2y = 5",
      steps: [
        { text: "ALGEBRA — substitute the constraint y = (5−x)/2:", math: "f = x² + (5−x)²/4 = (5x² − 10x + 25)/4" },
        { text: "CALCULUS — minimize the single-variable version:", math: "f' = (10x − 10)/4 = 0 → x = 1, y = 2 → f_min = 5" },
        { text: "GEOMETRY check — distance from origin to line x + 2y = 5:", math: "d = |5|/√5 = √5 → d² = 5 ✓ (the minimum IS the squared distance)" },
        { text: "VECTORS — projection form:", math: "closest point = proj of (0,0) onto the line = (1, 2) ✓" },
        { text: "TRIGONOMETRY — parametrise the line:", math: "(x, y) = (√5 cos t, …) — same answer, third language" },
      ],
      takeaway: "One minimisation is four subjects at once: algebra sets it up, calculus finds the critical point, geometry names it (squared distance), vectors confirm by projection — the syllabus is one toolbox with four handles.",
    },
    theory: [
      {
        heading: "How the branches interlock",
        body: "Algebra manipulates, geometry visualises, calculus optimises and measures change, trigonometry bridges circles and triangles, vectors carry both geometry and algebra. Every NEB paper mixes them: a 'calculus' question usually needs algebraic setup; a 'geometry' question often hides a calculus minimum. Learn each as a VIEW of the same object.",
      },
      {
        heading: "Graphs and reasoning as the connective tissue",
        body: "Sketching turns constraints into pictures (the line, the circle of radius √f, the closest point). Dimensional reasoning and special-case checks (x = 0, symmetric cases) catch errors before the algebra does. The best single habit: after solving, re-read the problem in a second language (geometry after algebra) and check the story matches.",
      },
    ],
    confusions: [
      {
        wrong: "Each math branch is a separate subject with separate methods.",
        right: "They are views of shared objects: the same 'closest point' is a calculus minimum, a vector projection and a perpendicular foot. Fluency is switching views.",
        why: "Textbooks are organised by branch, so the seams feel real.",
      },
      {
        wrong: "The calculus answer is final even when the geometry disagrees.",
        right: "They must agree — a mismatch means an error in one of them. Two independent routes are the cheapest verification available.",
        why: "Single-method habit skips cross-checking.",
      },
      {
        wrong: "Constraints just make problems harder.",
        right: "They shrink the search space: here they reduce a 2D hunt to a 1D one. Constraints are structure, not obstruction.",
        why: "More conditions = more work is the surface impression.",
      },
    ],
    questions: [
      { q: "Same problem, matrix language: what is being minimised?", a: "|X|² for X on the line — a least-squares projection, the core of linear regression.", hint: "Distance squared." },
      { q: "Closest point of x + 2y = 5 to origin, by projection?", a: "(1, 2).", hint: "proj of 0 onto the line." },
      { q: "Why is f_min = d² rather than d?", a: "x² + y² is the SQUARED distance — minimising either gives the same point, but the value differs by the square.", hint: "Squares preserve order ≥ 0." },
    ],
  },

  "math-advanced": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Taylor series of e^x at x = 1: how fast do the terms die?",
      steps: [
        { text: "The series (all derivatives of e^x are 1 at 0):", math: "e = 1 + 1 + 1/2! + 1/3! + 1/4! + …" },
        { text: "Partial sums:", math: "N=3: 2.667; N=5: 2.717; N=8: 2.71825; N=10: 2.7182818 — e ≈ 2.718281828" },
        { text: "Why so fast: the error is bounded by the next term:", math: "R_N ≤ e·x^{N+1}/(N+1)! — factorials beat powers" },
        { text: "Term table:", math: "1/6! = 0.00139; 1/7! = 0.000198; 1/8! = 0.0000248 — each term ÷ by the next integer" },
        { text: "Contrast the geometric series for e = 2.718… would need infinitely slow terms; Taylor's factorial decay is the whole trick.", math: "9 terms → 7 correct digits" },
      ],
      takeaway: "Taylor series turn transcendental functions into polynomials whose error is the first omitted term — and factorial denominators make that error die at civilisational speed.",
    },
    theory: [
      {
        heading: "Taylor and Maclaurin series",
        body: "f(x) = Σ f⁽ⁿ⁾(a)(x−a)ⁿ/n! — the best polynomial approximation of degree n at a point, refined order by order. Maclaurin (a = 0) classics: e^x, sin x = x − x³/3! + x⁵/5! − …, cos x, ln(1+x) = x − x²/2 + …, (1+x)^p binomial. Radius of convergence limits where the polynomial is trusted (ln(1+x): |x| < 1).",
      },
      {
        heading: "What 'advanced' topics share",
        body: "Series, limits, complex numbers and differential equations all trade hard objects for polynomial/algebraic stand-ins: e^{iθ} = cosθ + i sinθ unifies trig and growth; integrating factor turns ODEs into exact derivatives; binomial/partial-fractions reduce any rational function to known integrals. The theme: transform, compute, transform back.",
      },
    ],
    confusions: [
      {
        wrong: "A Taylor series equals the function everywhere.",
        right: "Only inside the radius of convergence — ln(1+x) diverges past x = 1 despite the function existing.",
        why: "Early examples (e^x, sin x) converge everywhere, hiding the boundary.",
      },
      {
        wrong: "More terms always improve accuracy at every x.",
        right: "Outside the convergence radius, more terms DIVERGE; inside, they converge — accuracy is term count AND position.",
        why: "Polynomial intuition (bigger degree = better fit everywhere).",
      },
      {
        wrong: "sin x ≈ x is an approximation error to apologise for.",
        right: "It is the FIRST-ORDER Taylor term — exact to relative error x²/6 (0.5% at 10°). Physics runs on first-order Taylor.",
        why: "'Approximation' is heard as 'wrong'.",
      },
    ],
    questions: [
      { q: "sin x for x = 0.1 rad via Taylor (first two terms)?", a: "0.1 − 0.001/6 = 0.09983 vs true 0.09983 ✓.", hint: "x − x³/3!." },
      { q: "Radius of convergence of Σxⁿ/n²?", a: "|x| ≤ 1 (converges at both endpoints by comparison).", hint: "Ratio test." },
      { q: "Why does e^{iπ} = −1 make trig algebraic?", a: "Rotation by θ is multiplication by e^{iθ} — trig identities become exponent rules (add angles = multiply factors).", hint: "Euler's formula." },
    ],
  },

  "math-calc-deriv": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "f(x) = x³ − 3x² + 2x at x = 1 — slope, tangent, extrema, inflection",
      steps: [
        { text: "The derivative:", math: "f'(x) = 3x² − 6x + 2; f'(1) = −1 → falling at x = 1" },
        { text: "Tangent line through (1, 0):", math: "y = 0 − 1·(x − 1) = 1 − x" },
        { text: "Critical points:", math: "3x² − 6x + 2 = 0 → x = 1 ± 1/√3 ≈ 0.423, 1.577" },
        { text: "Classify with the second derivative f'' = 6x − 6:", math: "f''(0.423) < 0 → local MAX; f''(1.577) > 0 → local MIN" },
        { text: "Inflection where f'' = 0:", math: "x = 1 — concavity flips exactly where f'(1) was measured" },
        { text: "Chain rule spot-check:", math: "d/dx[sin(x²)] = 2x·cos(x²) — differentiate outside, multiply by the inside's derivative" },
      ],
      takeaway: "One cubic carries the whole derivative toolkit: f' gives slopes and critical points, f'' classifies them and finds inflection, and the tangent line is the linear forecast — each rule a different question about the same curve.",
    },
    theory: [
      {
        heading: "The definition and the rules",
        body: "f'(x) = lim_{h→0} (f(x+h) − f(x))/h — the instantaneous rate. Power/product/quotient/chain rules mechanise what the limit would do manually; implicit differentiation handles curves like x² + y² = 25 where y is not isolated. The derivative of a function AT a point is a number (the slope); the derivative FUNCTION is the slope-machine.",
      },
      {
        heading: "Applications: the working four",
        body: "(1) Tangents/normal lines; (2) maxima/minima via critical points + second-derivative or sign test; (3) related rates (ladder sliding, balloon inflating — differentiate the constraint in t); (4) approximations (linearisation: f(x+Δ) ≈ f(x) + f'(x)Δ). Monotonicity reads from f' sign; concavity from f'' sign.",
      },
    ],
    confusions: [
      {
        wrong: "f'(a) is the value of the function at a.",
        right: "f'(a) is the SLOPE there; f(a) is the height. The tangent line uses both: y = f(a) + f'(a)(x − a).",
        why: "Notation f' looks like 'the same thing, dashed'.",
      },
      {
        wrong: "f'(c) = 0 means a maximum at c.",
        right: "It means a HORIZONTAL tangent — could be max, min, or inflection-with-flat-tangent (x³ at 0). Classify with f'' or a sign chart.",
        why: "The one-variable max/min recipe is over-simplified in memory.",
      },
      {
        wrong: "The chain rule multiplies the derivatives of the pieces.",
        right: "It MULTIPLIES outside-derivative by inside-derivative evaluated at the inside — d/dx sin(x²) is NOT cos(x²)·2x·x… it is cos(x²)·2x.",
        why: "Product-rule muscle memory leaks into composition.",
      },
    ],
    questions: [
      { q: "Derivative of x²·sin x (product rule)?", a: "2x·sin x + x²·cos x.", hint: "First·d(second) + second·d(first)." },
      { q: "A ladder 5 m slides: bottom at 3 m moving 0.5 m/s — top speed?", a: "y = 4; x·ẋ + y·ẏ = 0 → ẏ = −(3·0.5)/4 = −0.375 m/s.", hint: "Differentiate x² + y² = 25." },
      { q: "Where does f = x³ − 3x² + 2x increase?", a: "f' > 0 on (−∞, 0.423) ∪ (1.577, ∞).", hint: "Sign chart of the quadratic." },
    ],
  },

  "math-calc-quad": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "2x² − 7x + 3 = 0 solved four ways",
      steps: [
        { text: "Quadratic formula with a=2, b=−7, c=3:", math: "D = b² − 4ac = 49 − 24 = 25; √D = 5" },
        { text: "Roots:", math: "x = (7 ± 5)/4 → x = 3, x = 0.5" },
        { text: "Vieta cross-check:", math: "sum = −b/a = 3.5 = 3 + 0.5 ✓;  product = c/a = 1.5 = 3 × 0.5 ✓" },
        { text: "Factored form (reverse-engineered from the roots):", math: "2(x − 3)(x − 0.5) = (x − 3)(2x − 1) ✓ expand to confirm" },
        { text: "Vertex — the minimum, midway between the roots:", math: "x_v = −b/2a = 1.75;  f(1.75) = −D/(4a) = −25/8 = −3.125" },
        { text: "Discriminant = 25 > 0 → two distinct real roots; D = 0 → one double root; D < 0 → complex conjugate pair.", math: "the D-cases" },
      ],
      takeaway: "The discriminant is the whole story: D > 0 two real roots, D = 0 one, D < 0 none (real) — and Vieta's sum/product turn the roots into verification without touching the formula again.",
    },
    theory: [
      {
        heading: "Roots, vertex, and the three solution methods",
        body: "Formula (always works), factoring (fast when rational roots exist), completing the square (reveals vertex form a(x − h)² + k). The vertex x = −b/2a is also the axis of symmetry — for a projectile h(t) = −5t² + 20t, the vertex gives max height at t = −b/2a = 2 s. Sum −b/a and product c/a reconstruct equations from roots.",
      },
      {
        heading: "When quadratics model reality",
        body: "Projectile height, revenue = price × (demand function), area problems (fence rectangles), and any quadratic inequality: solve the equation first, then read intervals where the parabola is above/below the axis — the ROOTS are the boundary posts of the solution set.",
      },
    ],
    confusions: [
      {
        wrong: "D < 0 means the equation has no solution.",
        right: "No REAL solution — complex conjugate roots exist (x = (−b ± i√|D|)/2a).",
        why: "'No solution' language omits the number-system scope.",
      },
      {
        wrong: "The vertex is a root.",
        right: "The vertex is the extremum point (x, f(x)); roots are where f = 0. They coincide only when D = 0 (tangent parabola).",
        why: "Both are 'special points' on the curve.",
      },
      {
        wrong: "Move terms without flipping signs — the formula forgives.",
        right: "Standard form ax² + bx + c = 0 is required; 2x² = 7x − 3 mis-fed into the formula (b = −7 vs +7) flips roots.",
        why: "The formula is memorised but the setup discipline is not.",
      },
    ],
    questions: [
      { q: "Equation with roots 2 and −5?", a: "x² + 3x − 10 = 0 (sum 3, product −10 → reverse Vieta).", hint: "x² − (sum)x + product." },
      { q: "Max height of h(t) = −5t² + 20t?", a: "Vertex: t = 2, h = 20 m.", hint: "−b/2a then evaluate." },
      { q: "Solve x² − 4x + 5 = 0 over the reals?", a: "D = 16 − 20 = −4 < 0 → no real solutions (complex 2 ± i).", hint: "Discriminant first." },
    ],
  },

  "math-calc-stats": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Data: 2, 4, 4, 4, 5, 5, 7, 9 — all three centers, one spread",
      steps: [
        { text: "Mean:", math: "Σx = 40, n = 8 → x̄ = 5" },
        { text: "Median (sorted):", math: "(4 + 5)/2 = 4.5;  mode = 4 (three times)" },
        { text: "Squared deviations:", math: "9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32" },
        { text: "Population SD:", math: "σ = √(32/8) = 2;  sample SD s = √(32/7) = 2.14 (n−1 corrects for estimating the mean)" },
        { text: "Add one outlier 100:", math: "mean jumps to 15.6; median moves 4.5 → 5; SD explodes to ≈ 33 — the mean is hostage, the median barely moves" },
      ],
      takeaway: "Mean is the balance point (outlier-sensitive), median the positional midpoint (robust), SD the average distance from the mean — choosing among them is choosing which question you are asking.",
    },
    theory: [
      {
        heading: "Centers and spreads",
        body: "Center: mean (uses all values, sensitive to outliers), median (positional, robust), mode (most frequent, works for categories). Spread: range (crude), IQR (middle 50%, robust), variance/SD (uses every deviation, the statistical workhorse). CV = σ/mean × 100% compares spread across different scales (a 2 kg SD means more for 5 kg than 500 kg).",
      },
      {
        heading: "Correlation and the z-score",
        body: "z = (x − x̄)/σ standardises: z = 2 means two SDs above the mean — comparable across different tests (the SAT/IQ trick). Correlation r ∈ [−1, 1] measures LINEAR association only: r = 0.9 does not say why, and curved relationships (y = x²) can have r ≈ 0 — always draw the scatterplot first.",
      },
    ],
    confusions: [
      {
        wrong: "The mean is the typical value.",
        right: "With skew (incomes: one billionaire among nine), the MEAN sits where nobody is; the MEDIAN is the typical person.",
        why: "Averages are reported constantly and read as 'typical'.",
      },
      {
        wrong: "Standard deviation can be negative.",
        right: "It is a square root of an average of SQUARES — non-negative by construction; σ = 0 only when every value is identical.",
        why: "Deviations are signed; their average-squared root is not.",
      },
      {
        wrong: "Correlation proves causation.",
        right: "r measures co-movement; confounders (ice-cream sales vs drownings, both driven by summer) produce strong r with no cause.",
        why: "Strong numbers feel like explanations.",
      },
    ],
    questions: [
      { q: "Sample SD vs population SD on the same data — which is bigger?", a: "Sample (divide by n−1 = 7 vs 8) — always bigger or equal.", hint: "Smaller denominator." },
      { q: "z-score of 9 in the original data (x̄=5, σ=2)?", a: "(9−5)/2 = 2 — two SDs out.", hint: "Standardise." },
      { q: "Best measure for house prices with a few mansions?", a: "Median — robust to the mansion outliers.", hint: "Skew → median." },
    ],
  },

  "math-calc-matrix": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "x + 2y = 5, 3x + 4y = 11 — three matrix routes, one answer",
      steps: [
        { text: "Matrix form AX = b:", math: "A = [[1,2],[3,4]],  b = (5, 11)" },
        { text: "Determinant and inverse:", math: "det A = 4 − 6 = −2;  A⁻¹ = (1/det)[[4,−2],[−3,1]] = [[−2,1],[1.5,−0.5]]" },
        { text: "Route 1 — inverse:", math: "X = A⁻¹b → x = −2(5) + 1(11) = 1;  y = 1.5(5) − 0.5(11) = 2" },
        { text: "Route 2 — Cramer:", math: "x = det[[5,2],[11,4]]/detA = (20−22)/(−2) = 1 ✓;  y = det[[1,5],[3,11]]/(−2) = (11−15)/(−2) = 2 ✓" },
        { text: "Verification in the original equations:", math: "1 + 2(2) = 5 ✓;  3(1) + 4(2) = 11 ✓" },
        { text: "det A = 0 is the fork: parallel (no solution) or coincident (infinitely many) — the inverse does not exist.", math: "singularity = the consistency question" },
      ],
      takeaway: "A linear system is one matrix equation: invert (det ≠ 0) or use Cramer (ratio of determinants); det = 0 is not an error but the boundary between unique and non-unique worlds.",
    },
    theory: [
      {
        heading: "Matrix operations that mean something",
        body: "Addition is component-wise (only same-shape). Multiplication is row-by-column — the composition of linear maps, so AB ≠ BA in general (rotate then stretch ≠ stretch then rotate). Identity I leaves everything fixed; inverse exists iff det ≠ 0; det(AB) = detA·detB. Transpose flips rows/columns; symmetric means Aᵀ = A.",
      },
      {
        heading: "Systems: the three outcomes and Gaussian elimination",
        body: "Unique (rank A = rank[A|b] = n), infinitely many (ranks equal < n), none (ranks differ). Gaussian elimination row-reduces to triangular form — the by-hand workhorse; Cramer is the 2×2 shortcut; the inverse method shines when the same A solves many right-hand sides (change b, reuse A⁻¹).",
      },
    ],
    confusions: [
      {
        wrong: "Matrix multiplication is commutative.",
        right: "AB ≠ BA in general — order encodes WHICH transformation happens first; only special pairs (scalar multiples, shared diagonals) commute.",
        why: "Number multiplication's habits carry over.",
      },
      {
        wrong: "Every square matrix has an inverse.",
        right: "Only non-singular ones (det ≠ 0). det = 0 means the map squashes space — information is lost and cannot be un-lost.",
        why: "Numbers (except 0) always have reciprocals, so the analogy is imported.",
      },
      {
        wrong: "det of a sum equals the sum of dets.",
        right: "No — but det(AB) = detA·detB is the true multiplicative law.",
        why: "Linear-looking operations are assumed linear.",
      },
    ],
    questions: [
      { q: "3×3 determinant of [[1,2,3],[0,1,4],[5,6,0]]?", a: "1(0−24) − 2(0−20) + 3(0−5) = −24 + 40 − 15 = 1.", hint: "Cofactor expansion." },
      { q: "When do two parallel planes' system have infinite solutions?", a: "When the equations are identical up to scale (coincident) — det = 0 with consistent rows.", hint: "Rank comparison." },
      { q: "AA⁻¹ = ?", a: "I — the defining property of the inverse.", hint: "Undo." },
    ],
  },

  "math-calc-trig": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Triangle with a = 7, b = 8, C = 60° — solved and cross-checked",
      steps: [
        { text: "Law of cosines for the missing side:", math: "c² = a² + b² − 2ab·cos60° = 49 + 64 − 56 = 57 → c = 7.55" },
        { text: "Law of sines for angle A:", math: "sinA/a = sinC/c → sinA = 7·0.866/7.55 = 0.803 → A = 53.4°" },
        { text: "Angle B by subtraction:", math: "B = 180 − 60 − 53.4 = 66.6°" },
        { text: "Area by two routes:", math: "½ab·sinC = ½·56·0.866 = 24.25;  Heron: s = 11.27, √(s(s−a)(s−b)(s−c)) = 24.2 ✓" },
        { text: "Calculator hygiene:", math: "degrees vs radians mode — sin60° = 0.866 in DEG; in RAD it is sin(60 rad) = −0.305 (a silent catastrophic error)" },
      ],
      takeaway: "Cosines find a side, sines find angles, subtraction finishes the triangle — and the single most common loss is a calculator in the wrong angle mode.",
    },
    theory: [
      {
        heading: "The identity toolkit",
        body: "Pythagorean sin²+cos² = 1 (with the 1+tan² = sec² spin-off); compound sin(A±B), cos(A±B); double-angle sin2A = 2sinAcosA, cos2A = cos²−sin² = 1−2sin²A. From these flow everything: product-to-sum, half-angle, and the a sinθ + b cosθ = R sin(θ+φ) compression used in wave problems.",
      },
      {
        heading: "Graphs, periodicity and inverse functions",
        body: "Periods: sin/cos 2π (360°), tan π; amplitude stretches a, phase shifts b in a·sin(bx + c). Inverse functions need domain restriction: arcsin returns values in [−90°, 90°] only — sin⁻¹(0.5) = 30° but 150° is also a solution; solving sin x = 0.5 means x = 30°, 150° + 360°k. The ambiguous SSA case in triangle-solving is the same multi-solution issue in disguise.",
      },
    ],
    confusions: [
      {
        wrong: "Degrees and radians are interchangeable in the calculator.",
        right: "Every formula (arc length s = rθ, area ½r²θ, calculus derivatives) assumes radians; mixing modes silently corrupts results.",
        why: "Both are displayed as plain numbers.",
      },
      {
        wrong: "sin²x means sin(x²).",
        right: "sin²x = (sin x)² — the square of the sine. sin(x²) is a different function entirely (its derivative is 2x·cos x²).",
        why: "Notation is compact and the placement of the exponent is easy to misread.",
      },
      {
        wrong: "sin⁻¹ x = 1/sin x.",
        right: "sin⁻¹ is the INVERSE FUNCTION (arcsin); 1/sin x is cosecant. The −1 exponent means 'undo', not reciprocal — csc x = (sin x)⁻¹ is the reciprocal.",
        why: "The notation genuinely collides.",
      },
    ],
    questions: [
      { q: "Solve sin 2x = ½ for 0° ≤ x ≤ 180°?", a: "2x = 30° or 150° → x = 15°, 75°.", hint: "Two cycles inside 2x." },
      { q: "Tower 20 m casts 15 m shadow: sun elevation?", a: "tanθ = 20/15 → θ = 53.1°.", hint: "Opposite/adjacent." },
      { q: "Express 3sinθ + 4cosθ as one sine?", a: "5·sin(θ + 53.1°) — R = √(9+16) = 5, φ = tan⁻¹(4/3).", hint: "R-form compression." },
    ],
  },

  "math-calc-series": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "AP a = 3, d = 4 and GP a = 3, r = 2 — five terms, summed",
      steps: [
        { text: "AP nth term:", math: "aₙ = 3 + (10−1)·4 = 39" },
        { text: "AP sum:", math: "S₁₀ = 10/2·(3 + 39) = 210" },
        { text: "GP nth term:", math: "a₅ = 3·2⁴ = 48" },
        { text: "GP sum:", math: "S₅ = 3(2⁵ − 1)/(2 − 1) = 93" },
        { text: "Infinite GP converges only if |r| < 1:", math: "r = ½ → S∞ = a/(1 − r) = 6;  r = 2 → diverges (93 grows without bound)" },
        { text: "Gauss's pairing trick:", math: "1+2+…+100 = 50·101 = 5050 — pair outer terms (101 each)" },
      ],
      takeaway: "AP adds the same amount (linear growth, S = n(a+l)/2); GP multiplies by the same factor (exponential, only finite if |r| < 1) — and both sums are 'pair the extremes' tricks formalised.",
    },
    theory: [
      {
        heading: "The formulas and their domains",
        body: "AP: aₙ = a + (n−1)d, Sₙ = n/2[2a + (n−1)d]. GP: aₙ = ar^{n−1}, Sₙ = a(rⁿ−1)/(r−1), S∞ = a/(1−r) for |r| < 1. AM–GM: (a+b)/2 ≥ √(ab), equality iff a = b — the inequality behind countless max/min problems (fixed perimeter → square maximises area). Special sums: Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6.",
      },
      {
        heading: "Where series model reality",
        body: "AP: arithmetic wages, seat rows, simple interest. GP: compound interest (A = P(1+r)ⁿ), population growth, radioactive decay (r = ½). The convergence condition is finance literacy: a debt growing at 20% is a GP with r = 1.2 — 'small forever' instalments that are LESS than the interest never repay it.",
      },
    ],
    confusions: [
      {
        wrong: "Every geometric series has a sum to infinity.",
        right: "Only |r| < 1. S∞ = a/(1−r) is a CONVERGENCE result, not a formula to apply blindly.",
        why: "The formula is memorable, its condition less so.",
      },
      {
        wrong: "The nth-term formula starts the index at 1 with a + nd.",
        right: "a₁ = a (the first term is a itself, not a + d): aₙ = a + (n−1)d.",
        why: "Off-by-one is the classic series error.",
      },
      {
        wrong: "AP and GP are unrelated topics.",
        right: "A GP's terms are an AP in the LOG domain: take ln of 3, 6, 12, 24 → ln3, ln3+ln2, … — arithmetic spacing. Log turns multiplication into addition.",
        why: "They are taught in separate chapters.",
      },
    ],
    questions: [
      { q: "Sum of the first n odd numbers?", a: "n² — 1+3+5+7 = 16 = 4² (AP with a = 1, d = 2).", hint: "Pair or formula." },
      { q: "Geometric mean of 8 and 32?", a: "√256 = 16 (the GP middle term).", hint: "√(ab)." },
      { q: "Rs 1000 at 10% compound for 3 years?", a: "1000·1.1³ = 1331 (a GP).", hint: "r = 1.1." },
    ],
  },

  "math-calc-vectors": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "A = (2, 3, 6), B = (1, 0, 2) — both products, then the angle back-calculated",
      steps: [
        { text: "Magnitudes:", math: "|A| = √49 = 7;  |B| = √5 ≈ 2.236" },
        { text: "Dot product:", math: "A·B = 2 + 0 + 12 = 14" },
        { text: "Angle from the dot:", math: "cosθ = 14/(7·2.236) = 0.8944 → θ = 26.6°" },
        { text: "Cross product:", math: "A×B = (3·2−6·0, 6·1−2·2, 2·0−3·1) = (6, 2, −3); |A×B| = √49 = 7" },
        { text: "Consistency check — the angle from the cross:", math: "|A×B| = |A||B|sinθ → sinθ = 7/(7·2.236) = 0.4472 → θ = 26.6° ✓ (cos² + sin² = 1: 0.8 + 0.2 = 1 ✓)" },
        { text: "Projection of A onto B:", math: "(A·B)/|B| = 14/2.236 = 6.26 — the shadow length" },
      ],
      takeaway: "Dot measures alignment (0 ⇔ 90°), cross measures perpendicular span (max ⇔ 90°) — computing BOTH on the same pair must give cos²θ + sin²θ = 1, the cheapest self-check in vector algebra.",
    },
    theory: [
      {
        heading: "The two products and their geometries",
        body: "A·B = AₓBₓ + A_yB_y + A_zB_z = |A||B|cosθ — a scalar, for work W = F·s and for the projection (A·B)/|B|. A×B is the vector perpendicular to both (right-hand rule), |A×B| = area of the parallelogram; scalar triple product [A B C] = A·(B×C) is the signed volume of the parallelepiped — zero ⇔ coplanar.",
      },
      {
        heading: "Components, unit vectors and applications",
        body: "Â = A/|A| isolates direction; direction cosines (Aₓ/|A|, …) satisfy the cos² sum = 1. Applications that reuse these constantly: work and flux (dot), torque, moment, angular momentum, and the area of a triangle = ½|AB×AC| (half the parallelogram).",
      },
    ],
    confusions: [
      {
        wrong: "A×B = B×A.",
        right: "A×B = −(B×A) — the cross product ANTICOMMUTES (direction flips with handedness).",
        why: "Every other multiplication learned so far commutes.",
      },
      {
        wrong: "Zero dot product means parallel.",
        right: "cosθ = 0 ⇔ θ = 90°: perpendicular. Parallel is the case where the CROSS product vanishes.",
        why: "'Zero relationship' is misread as 'same direction'.",
      },
      {
        wrong: "The angle between vectors is where the vectors point from the origin.",
        right: "It is the angle between their DIRECTIONS when placed tail-to-tail — position of the vectors in space is irrelevant; only direction matters.",
        why: "Vectors are drawn from the origin, so the 'between' feels positional.",
      },
    ],
    questions: [
      { q: "Area of the triangle with vertices 0, A = (2,3,6), B = (1,0,2)?", a: "½|A×B| = 3.5.", hint: "Half the parallelogram." },
      { q: "Are A and B coplanar with C = (1,1,1)?", a: "Compute A·(B×C): (6,2,−3)·(1,1,1) = 5 ≠ 0 → not coplanar.", hint: "Triple product." },
      { q: "Unit vector along A = (2,3,6)?", a: "(2/7, 3/7, 6/7).", hint: "Divide by 7." },
    ],
  },

  "math-calc-limit": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "lim_{x→2} (x² − 4)/(x − 2) — and the toolbox it demonstrates",
      steps: [
        { text: "Direct substitution gives 0/0 — INDETERMINATE, not 0 and not 1:", math: "the form 0/0 means 'work harder'" },
        { text: "Factor and cancel (x ≠ 2 is the limit's whole point):", math: "(x−2)(x+2)/(x−2) = x + 2 → limit = 4" },
        { text: "One-sided check confirms:", math: "from 1.9: (3.61−4)/(−0.1) = 3.9; from 2.1: 4.1 — both squeeze to 4 ✓" },
        { text: "Another classic: lim_{x→0} sinx/x = 1 — the squeeze theorem at work (cos x ≤ sinx/x ≤ 1)." },
        { text: "l'Hôpital on (sinx − x)/x³ (0/0 three times over):", math: "differentiate thrice → −cosx/6 → −1/6" },
      ],
      takeaway: "0/0 is a request for algebra (factor, rationalise, standard limit) or l'Hôpital — the limit exists when both sides squeeze to the same number, and the value need NOT equal f(2) (which does not exist here).",
    },
    theory: [
      {
        heading: "Techniques in order of cost",
        body: "(1) Direct substitution (continuous case); (2) factoring/cancelling for 0/0 polynomials; (3) rationalising for surds ((√x − 2)/x → multiply by conjugate); (4) standard limits sinx/x → 1, (1+1/n)ⁿ → e, (aˣ−1)/x → ln a; (5) l'Hôpital for stubborn 0/0 or ∞/∞; (6) squeeze theorem for trig-bounded expressions. One-sided limits decide existence: both sides equal ⇔ limit exists.",
      },
      {
        heading: "Continuity and limits at infinity",
        body: "Continuous at a means f(a) exists AND equals the limit — removable discontinuities are exactly the holes where they differ (the cancelled factor). Limits at infinity compare growth rates: polynomials beat roots, exponentials beat polynomials, ln loses to everything — x/lnx → ∞, eˣ/x² → ∞. These rankings are the backbone of asymptotic behaviour.",
      },
    ],
    confusions: [
      {
        wrong: "0/0 equals 0 or 1.",
        right: "It is INDETERMINATE — a warning sign, not an answer; the actual value can be anything (4 above, 1 for sinx/x).",
        why: "Division habits ('0 over anything is 0') collide with the indeterminate forms list.",
      },
      {
        wrong: "The limit exists only if the function is defined there.",
        right: "Limits ignore the point itself — (x²−4)/(x−2) has no value at 2 yet a perfect limit of 4.",
        why: "The function's graph is imagined as continuous.",
      },
      {
        wrong: "l'Hôpital always works.",
        right: "Only on 0/0 or ∞/∞ forms — applying it to a plain limit creates wrong answers, and some forms oscillate forever under it.",
        why: "It is the flashiest tool, so it is applied everywhere.",
      },
    ],
    questions: [
      { q: "lim_{x→0} (√(x+9) − 3)/x?", a: "Rationalise: 1/(√(x+9)+3) → 1/6.", hint: "Multiply by the conjugate." },
      { q: "lim_{n→∞} (1 + 1/n)ⁿ?", a: "e ≈ 2.71828 — the defining limit of e.", hint: "The compound-interest limit." },
      { q: "Is f(x) = (x²−4)/(x−2) continuous at x = 2?", a: "No — removable discontinuity; define f(2) = 4 and it becomes continuous.", hint: "Limit vs value." },
    ],
  },

  "math-calc-system": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "x + y = 3, y + z = 5, x + z = 4 — solved, then classified",
      steps: [
        { text: "Add all three equations:", math: "2(x + y + z) = 12 → x + y + z = 6" },
        { text: "Subtract each original:", math: "z = 6 − 3 = 3;  x = 6 − 5 = 1;  y = 6 − 4 = 2" },
        { text: "Verify all three:", math: "1+2 = 3 ✓;  2+3 = 5 ✓;  1+3 = 4 ✓" },
        { text: "Inconsistent case: x + y = 2 and x + y = 5 — parallel planes:", math: "no solution (subtracting gives 0 = 3, a contradiction)" },
        { text: "Dependent case: two identical equations —", math: "infinitely many (a whole line of solutions)" },
        { text: "The rank test (Rouché–Capelli):", math: "unique ⇔ rank A = rank[A|b] = n;  infinite ⇔ equal ranks < n;  none ⇔ ranks differ" },
      ],
      takeaway: "Every linear system is exactly one of three worlds — unique, infinite, or none — and elimination does not just solve: the row it reduces to 0 = nonzero is the fingerprint that names the world.",
    },
    theory: [
      {
        heading: "Gaussian elimination as the general method",
        body: "Eliminate variables systematically: swap/multiply/add rows to reach upper-triangular form, then back-substitute. Row operations preserve the solution set (each is invertible). For 2×2, substitution or elimination is fastest; for 3×3+, elimination scales where Cramer and matrix inversion become expensive (n³ vs n! for expansion).",
      },
      {
        heading: "Applications and consistency",
        body: "Mixture problems (coffee prices), network flow (junctions conserve current), motion (distance equations), and least squares (more equations than unknowns — overdetermined systems get best-fit instead of exact solutions). Homogeneous systems (b = 0) always have the trivial solution; nontrivial solutions exist iff det A = 0.",
      },
    ],
    confusions: [
      {
        wrong: "Two equations in two unknowns always give a solution.",
        right: "Parallel lines give none; coincident lines give infinitely many — 'two equations' describes a shape, not a guarantee.",
        why: "School problems are curated to intersect.",
      },
      {
        wrong: "More equations always over-determine and fail.",
        right: "Redundant equations (copies) change nothing; contradictory ones fail; independent consistent ones just confirm. Count INDEPENDENT equations, not rows.",
        why: "'More constraints = harder' is the intuition.",
      },
      {
        wrong: "During elimination, any row operation is allowed.",
        right: "Only the three invertible operations: swap, multiply by nonzero, add a multiple of another row. Dividing a row by itself (i.e. by a variable expression) can lose solutions.",
        why: "Algebraic freedom (dividing both sides) leaks into matrix rows unsafely.",
      },
    ],
    questions: [
      { q: "Classify: x + y = 1, 2x + 2y = 2, 3x + 3y = 3?", a: "Infinitely many — one independent equation (all three are the same line).", hint: "Check proportionality." },
      { q: "Homogeneous system with det A = 0: solutions?", a: "Infinitely many (the trivial solution plus a line/plane of others).", hint: "Singular ⇒ nontrivial." },
      { q: "Word problem: 3 chai + 2 coffee = Rs 190; 1 chai + 4 coffee = Rs 260. Prices?", a: "c = 260 − 4k → 3(260−4k) + 2k = 190 → 780 − 10k = 190 → k = 59, c = 24. Verify: 3(24)+2(59) = 190 ✓ and 24+4(59) = 260 ✓.", hint: "Substitution, then verify both." },
    ],
  },

  "equation-solver": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Four equation types, one checking discipline",
      steps: [
        { text: "EXPONENTIAL: 2ˣ = 10 — log both sides:", math: "x = log₂10 = ln10/ln2 = 3.32" },
        { text: "TRIGONOMETRIC: sin x = 0.5 has a FAMILY:", math: "x = 30°, 150° + 360°k — one equation, infinite solutions, principal value is only the start" },
        { text: "POLYNOMIAL: x³ − 6x² + 11x − 6 = 0 — test x = 1:", math: "1−6+11−6 = 0 ✓ → factor (x−1)(x−2)(x−3)" },
        { text: "LOGARITHMIC with the trap: ln x + ln(x−1) = ln 6 → x(x−1) = 6 → x = 3 or −2:", math: "x = −2 FAILS the domain (ln of negative) — an EXTRANEOUS root" },
        { text: "The universal law: every method that transforms (log, square, multiply) can create fake roots — substitute every candidate back.", math: "check: ln3 + ln2 = ln6 ✓; ln(−2) undefined ✗" },
      ],
      takeaway: "Solving is transforming plus VERIFYING: squaring and logging create extraneous roots, trig equations hide whole families, and substitution of each candidate back into the ORIGINAL equation is the step that separates correct from lucky.",
    },
    theory: [
      {
        heading: "The equation-type map",
        body: "Linear → isolate. Quadratic → formula/factor. Polynomial → rational root test, then factor. Exponential → log both sides (match bases if possible: 2ˣ = 8 → x = 3). Logarithmic → exponentiate, WATCH the domain (argument > 0). Trigonometric → principal value + period family. Absolute value → split into cases |u| = a → u = ±a. Radical → isolate, square, CHECK for extraneous.",
      },
      {
        heading: "Extraneous roots: why they exist",
        body: "Squaring turns x = 3 into x² = 9 — but x² = 9 also allows x = −3, a solution to the squared equation that never satisfied the original. Logging turns sums into products but erases domain violations. Every non-invertible step (squaring, multiplying by expressions containing x) can add solutions — verification is not optional politeness, it is part of the method.",
      },
    ],
    confusions: [
      {
        wrong: "Squaring both sides is a safe simplification.",
        right: "It is safe only with a check afterwards: √x = −3 squares to x = 9, but √9 = 3 ≠ −3 — x = 9 is extraneous.",
        why: "Algebra habits (do the same to both sides) hide that squaring is not one-to-one.",
      },
      {
        wrong: "ln(a + b) = ln a + ln b.",
        right: "ln(ab) = ln a + ln b. The log of a SUM has no such rule — the misremembered law creates phantom algebra everywhere.",
        why: "The product rule is over-generalised to sums.",
      },
      {
        wrong: "One solution to sin x = ½ is the answer.",
        right: "It is one of a periodic family (30° + 360°k, 150° + 360°k) — the general solution is part of the answer on exams.",
        why: "Calculator inverse buttons return only the principal value.",
      },
    ],
    questions: [
      { q: "Solve |2x − 1| = 7?", a: "2x − 1 = ±7 → x = 4 or −3.", hint: "Split into cases." },
      { q: "Solve 3ˣ = 81?", a: "x = 4 (match bases: 81 = 3⁴).", hint: "Same-base shortcut first." },
      { q: "√(x+6) = x: solutions?", a: "Square: x + 6 = x² → x = 3 or −2; check: √9 = 3 ✓, √4 = 2 ≠ −2 → only x = 3.", hint: "Verify both." },
    ],
  },
};

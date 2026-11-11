/**
 * FIGURE CONDITIONS — the physics & mathematics condition catalogue.
 *
 * Owner request (2026-11-10): "train the diagram hub and the part of veer chat
 * which does the diagram work for all physics and math conditions from
 * syllabus … make them draw each info precisely … all different conditions
 * graphs and all".
 *
 * The archetype engine (academic-figures.ts) says WHAT SHAPE a figure is;
 * this module says WHAT MUST BE TRUE inside it for the specific syllabus
 * topic — every standard case, every marked point, every axis unit. It is a
 * deterministic lookup keyed to the NEB Class 11/12 syllabus units
 * (frontend/lib/syllabus.ts): a request about a concave mirror receives the
 * six object-position laws, a request about gas processes receives the four
 * P-V/T curves, a request about quadratics receives all six sign cases.
 *
 * Only the MATCHED entries ride along (at most three), so a biology question
 * never pays for the physics catalogue and the first token stays fast.
 *
 * Consumers: buildFigureBrief (vector writer), withFigureToolInstruction
 * (chat svg law) and upgradeMessages (deep-answer rebuild) — one catalogue,
 * every drawing lane.
 */

export interface FigureCondition {
  id: string;
  /** Ordered most-specific-first, like classifyFigureKind. */
  match: RegExp;
  /** The drawing law for this syllabus family — cases, marks, units. */
  guide: string;
}

/**
 * The multi-case law. A family request ("concave mirror", "v-t graph") names
 * ONE case unless the student asks for all of them; then every standard case
 * gets its own titled panel on the one canvas.
 */
export const FIGURE_CONDITION_LAW =
  "CONDITION LAW: when the topic has several standard cases (object positions, motion types, process curves, sign cases), draw the asked case exactly with its standard labels; when the request asks for ALL cases/conditions/variants, draw one titled panel per standard case in a labelled grid on the same canvas, sharing one notation and one set of units. Never merge two different cases into one unlabelled curve.";

/** True when the student is asking for a drawing/graph rather than prose. */
export function isDiagramRequest(question: string): boolean {
  return /\b(draw|sketch|diagram|diagrams|graph|graphs|plot|curve|curves|labelled|labeled|illustrate|free[- ]body|ray diagram)\b/i.test(
    question ?? "",
  );
}

export const FIGURE_CONDITIONS: FigureCondition[] = [
  // ── PHYSICS · CLASS 11 ─────────────────────────────────────────────────────
  {
    id: "kinematics-graphs",
    match:
      /kinematic|motion graph|displacement[- ]time|distance[- ]time|velocity[- ]time|speed[- ]time|acceleration[- ]time|[sva][- –]t (graph|curve)|uniform (motion|acceleration|velocity)|free[- ]?fall|ticker.?timer|motion.*(graph|curve)|graph.*(motion|velocity|acceleration|displacement)/i,
    guide:
      "KINEMATICS GRAPHS — draw every standard case asked: body at rest (s-t horizontal, v-t on the axis); uniform motion (s-t straight with slope = v, v-t horizontal); uniform acceleration (s-t parabola, v-t straight with slope = a, a-t horizontal); retardation (negative slope, v falling to zero); motion reversing direction (v crosses the time axis, s turns at that instant); free fall (v = gt straight through origin, s = ½gt² parabola); two bodies compared on the SAME axes. Mark: slope meaning (s-t slope = velocity, v-t slope = acceleration), area under v-t = displacement (shade it), intercepts and the turning point. Axes: t (s), s (m), v (m s⁻¹), a (m s⁻²).",
  },
  {
    id: "projectile",
    match:
      /projectile|trajectory|horizontal projection|angle of projection|range of (a )?projectile|maximum height.*projectile|time of flight/i,
    guide:
      "PROJECTILE — parabolic trajectory with launch speed u at angle θ; velocity arrows at launch, peak and landing (vₓ = u cosθ constant, v_y = u sinθ − gt, zero at the peak); mark maximum height H, range R, time of flight T and the peak. Companion graphs when asked: vₓ-t horizontal, v_y-t straight crossing zero at T/2, y-x parabola. Axes in m and m s⁻¹; g = 9.8 m s⁻² downward arrow.",
  },
  {
    id: "forces-free-body",
    match:
      /free[- ]?body|force diagram|forces (acting|on)|incline|inclined plane|pulley|atwood|lift|elevator|apparent weight|friction.*(block|body|incline)|banking|conical pendulum|vertical circle|equilibrium.*(force|concurrent)|lami|parallelogram law|resolution of forces|resultant force/i,
    guide:
      "FORCES / FREE-BODY — draw the asked case exactly: horizontal surface (mg down, N up, applied F at its angle with components, friction f opposing impending motion); smooth/rough incline at θ (mg resolved into mg sinθ down the slope and mg cosθ into it, N perpendicular to the surface, f along it); connected bodies over a pulley (one tension T throughout a light string, heavier side accelerates down); lift accelerating up/down (N = m(g ± a), free fall N = 0); banking (N cosθ = mg, N sinθ = mv²/r); conical pendulum (T cosθ = mg, T sinθ = mω²r); vertical circle (T + mg at the top, T − mg at the bottom); equilibrium of concurrent forces (closed force triangle/parallelogram, Lami angles). Every force arrow starts at its true point of action and carries its symbol; no invented forces (no centrifugal force in an inertial frame).",
  },
  {
    id: "work-energy",
    match:
      /work[- ]energy|work done.*(graph|force)|f[- ]x graph|force[- ](displacement|extension)|spring.*(energy|force|constant)|potential energy curve|kinetic energy.*(graph|variation)|energy (conversion|transformation)|power.*(graph|curve)|work.*(graph|area)/i,
    guide:
      "WORK, ENERGY, POWER — F-x graph with the shaded area = work done (constant F: rectangle; spring F = kx: triangle ½kx²; variable F: strips); energy exchange of a falling body / pendulum / spring (KE + PE = constant horizontal line, KE and PE swapping); spring PE = ½kx² parabola about x = 0; P-t graph and P = Fv. Units: F (N), x (m), W (J), P (W). Mark the spring's natural length and the equilibrium point.",
  },
  {
    id: "gravitation",
    match:
      /gravitat|orbital (velocity|speed)|escape (velocity|speed)|satellite|kepler|variation of g|\bg\b.*(height|depth)|gravitational (field|potential)|geostationary/i,
    guide:
      "GRAVITATION — g vs height above the surface (∝ 1/r² decay) and g vs depth (linear to zero at the centre), joined into one g-r curve with the surface R marked; field E-r and potential V-r for a shell and a solid sphere (inside shell: E = 0, V constant; outside: E ∝ 1/r², V ∝ 1/r; solid sphere: E ∝ r inside); Kepler ellipse with the Sun at one focus, equal-area sweeps shaded, faster at perihelion; orbital velocity v = √(GM/r) and escape vₑ = √2·v arrows; satellite energy bars (PE = −2KE, total = −KE). Mark R, M, G and units (N kg⁻¹, J kg⁻¹, m s⁻¹).",
  },
  {
    id: "elasticity",
    match:
      /elastic|stress[- ]strain|hooke|young('s)? modulus|load[- ]extension|ductile|brittle|elastic limit|yield|breaking|ultimate.*strength|stress.*strain/i,
    guide:
      "ELASTICITY — stress-strain curve with proportional limit, elastic limit, yield point, ultimate tensile strength and fracture point marked IN ORDER; the linear Hooke region's slope = Young's modulus Y; ductile (long plastic region, necking before fracture) vs brittle (fracture just past the elastic limit) on the same axes; area under the curve = energy per unit volume; rubber hysteresis loop (loading curve above unloading, shaded loss). Axes: stress (Pa), strain (no unit).",
  },
  {
    id: "heat-thermal",
    match:
      /thermal|heat|temperature|calorimetr|specific heat|latent heat|expansion|bimetallic|cooling|black[- ]?body|wien|maxwell|boltzmann|conduction|convection|radiation|thermometer/i,
    guide:
      "HEAT & TEMPERATURE — heating curve (temperature plateaus at melting and boiling, phases and latent heats labelled); Newton's-law cooling curve (exponential approach to the surroundings' temperature); linear/areal/volume expansion vs ΔT (straight lines, slopes α, 2α, 3α); bimetallic strip bending with brass on the outside of the curve; steady-state conduction temperature gradient along a lagged rod; blackbody spectra at two temperatures (peak shifts left as T rises, λmaxT = b); Maxwell-Boltzmann speed distribution at T₁ < T₂ (peak lower and further right, area unchanged). Units: K or °C, J, J kg⁻¹ K⁻¹, W m⁻².",
  },
  {
    id: "gas-thermodynamics",
    match:
      /ideal gas|gas law|boyle|charles|gay[- ]lussac|isothermal|isobaric|isochoric|adiabatic|carnot|thermodynamic|p[- ]v (diagram|graph|curve)|pv diagram|heat engine|refrigerator|entropy|kinetic theory/i,
    guide:
      "GAS PROCESSES / THERMODYNAMICS — draw each asked process on P-V, P-T and V-T: isothermal (P-V hyperbola PV = const; vertical lines on P-T and V-T), isobaric (P-V horizontal; V-T straight through the origin; P-T horizontal), isochoric (P-V vertical; P-T straight through the origin; V-T vertical), adiabatic (P-V steeper than the isothermal through the same point, PV^γ = const). Carnot cycle: two isothermals + two adiabatics, clockwise for an engine, Q_H in, Q_C out, W = enclosed area shaded. Isotherms at T₁ < T₂ never cross; work = area under the P-V curve with its sign. Axes: P (Pa), V (m³), T (K).",
  },
  {
    id: "curved-mirrors",
    match:
      /mirror|concave mirror|convex mirror|reflection.*(curved|spherical)|centre of curvature|center of curvature|mirror formula|pole.*mirror/i,
    guide:
      "CURVED MIRRORS — CONCAVE, all six object positions: at ∞ (image at F, real, inverted, highly diminished); beyond C (between F and C, real, inverted, diminished); at C (at C, real, inverted, same size); between C and F (beyond C, real, inverted, magnified); at F (image at ∞); between F and P (behind the mirror, virtual, erect, magnified). CONVEX: any position gives an image between P and F behind the mirror — virtual, erect, diminished (object at ∞ → image at F). Draw the principal axis with P, F, C (C = 2F); object and image as upright arrows; at least two standard rays (parallel → through F; through C → retraces; through F → parallel); virtual rays/images dashed; state nature, position and size beside each case. Sign convention: distances from P, incident-light direction positive.",
  },
  {
    id: "plane-refraction",
    match:
      /refraction.*(plane|slab|surface)|real.*apparent depth|apparent depth|lateral (shift|displacement)|critical angle|total internal reflection|optical fibre|mirage|snell|refractive index/i,
    guide:
      "REFRACTION AT PLANE SURFACES — glass slab: incident ray, two refractions, emergent ray parallel to the incident one with lateral shift d marked; real vs apparent depth (object at the bottom, rays bending away from the normal, virtual image raised, apparent depth = real/n); critical angle (refracted ray grazing at 90°); total internal reflection (i > C, fully reflected); optical fibre (repeated TIR inside the core, cladding of lower n); mirage (inverted virtual image from a hot-air gradient). Mark n₁, n₂, i, r and the normal at every interface; Snell's law n₁ sin i = n₂ sin r.",
  },
  {
    id: "prism-dispersion",
    match:
      /prism|dispersion|deviation.*(prism|angle)|minimum deviation|spectrometer|rainbow|spectrum|vibgyor/i,
    guide:
      "PRISM & DISPERSION — triangular prism with i, r₁, r₂, e, A and δ all marked (A = r₁ + r₂, δ = i + e − A); minimum-deviation path symmetric (r₁ = r₂, i = e, internal ray parallel to the base); i-δ curve with δmin marked; dispersion of white light into VIBGYOR with violet deviated most and red least; primary rainbow (one internal reflection, red outer at 42°, violet inner at 40°) and secondary (two reflections, reversed order, 51°–54°).",
  },
  {
    id: "lenses",
    match:
      /lens|lenses|convex lens|concave lens|converging|diverging|lens maker|optical (centre|center)|power of.*(lens)|microscope|telescope|myopia|hypermetropia|presbyopia|magnifying glass/i,
    guide:
      "LENSES — CONVEX, all six object positions: at ∞ (image at F₂, real, inverted, highly diminished); beyond 2F₁ (between F₂ and 2F₂, real, inverted, diminished); at 2F₁ (at 2F₂, real, inverted, same size); between F₁ and 2F₁ (beyond 2F₂, real, inverted, magnified); at F₁ (image at ∞); between F₁ and O (same side as the object, virtual, erect, magnified). CONCAVE: every position gives an image between F₁ and O on the object side — virtual, erect, diminished. Mark O, F₁, F₂, 2F₁, 2F₂; three standard rays (parallel → through F₂; through O undeviated; through F₁ → parallel); virtual parts dashed; state nature/position/size per case; 1/v − 1/u = 1/f with the sign convention. Microscope: objective forms a real magnified image inside the eyepiece's focal length, eyepiece magnifies it to a final virtual image at D or ∞. Telescope: objective's real image at its focus, eyepiece magnifies, M = fₒ/fₑ. Eye defects: myopia corrected with concave, hypermetropia with convex.",
  },
  {
    id: "shm-waves",
    match:
      /simple harmonic|\bshm\b|oscillat|pendulum|spring[- ]mass|restoring force|resonance|damped|standing wave|stationary wave|harmonic|overtone|open pipe|closed pipe|beats|doppler|longitudinal|transverse wave|wave (motion|equation)|sonometer|wavefront/i,
    guide:
      "SHM & WAVES — SHM: x-t sine, v-t cosine (leads x by π/2), a-t = −ω²x (opposite phase to x) on aligned time axes; a-x straight line through the origin with negative slope; energy vs displacement (KE parabola maximum at 0, PE parabola minimum at 0, total energy horizontal). Standing waves: string fixed at both ends (nodes at the ends, harmonics n = 1, 2, 3…, λₙ = 2L/n); open pipe (antinodes at both ends, all harmonics); closed pipe (node at the closed end, antinode at the open, odd harmonics only, λₙ = 4L/n) — label every node N and antinode A and mark λ. Beats: two close frequencies with the envelope at |f₁ − f₂|. Doppler: source/observer approaching (wavefronts compressed, f′ > f) and receding (stretched, f′ < f). Transverse vs longitudinal particle motion arrows relative to propagation.",
  },
  {
    id: "electrostatics-capacitors",
    match:
      /electrostatic|electric (field|charge|potential|flux)|coulomb|dipole|equipotential|gauss|capacitor|capacitance|dielectric|van de graaff|charging|discharging/i,
    guide:
      "ELECTROSTATICS & CAPACITORS — field-line patterns: isolated + (radially outward), − (inward), dipole (curved + → −), two like charges (neutral point between), parallel plates (uniform, equally spaced, edge bulging); E-r and V-r for a point charge (1/r², 1/r), a shell (E = 0 inside, jump at R; V constant inside) and a solid sphere (E ∝ r inside); equipotentials perpendicular to field lines; dipole in a uniform field (τ = pE sinθ, stable at θ = 0, unstable at θ = π). Capacitor: charging Q-t/V-t exponential rise and I-t decay, discharging decay, τ = RC marked at 63% / 37%; series and parallel combinations; energy ½CV². Units: E (N C⁻¹ or V m⁻¹), V (V), C (F), Q (C).",
  },
  {
    id: "dc-circuits",
    match:
      /circuit|ohm|resist|kirchhoff|wheatstone|meter bridge|potentiometer|galvanometer|ammeter|voltmeter|\bemf\b|internal resistance|series.*parallel|rheostat|shunt/i,
    guide:
      "DC CIRCUITS — standard symbols only (cell long line = +, resistor, rheostat, key, ammeter in series, voltmeter in parallel); I-V graphs: ohmic conductor (straight through the origin, slope = 1/R), filament lamp (flattening curve), diode (forward knee ≈ 0.7 V, negligible reverse); terminal V vs I (V = E − Ir: intercept E, slope −r); series (same I, V divides) and parallel (same V, I divides); Kirchhoff junction and loop with labelled current directions and signs; Wheatstone balanced (P/Q = R/S, galvanometer null) and meter bridge (R/S = l/(100 − l)); potentiometer (E₁/E₂ = l₁/l₂, r = R(l₁ − l₂)/l₂ with the balance lengths marked); ammeter shunt and voltmeter multiplier conversions. Label every component with its letter/value and every meter with its polarity.",
  },
  // ── PHYSICS · CLASS 12 ─────────────────────────────────────────────────────
  {
    id: "magnetism",
    match:
      /magnet|solenoid|toroid|biot[- ]savart|ampere|cyclotron|motor effect|lorentz|hall effect|curie|ferromagnet|moving[- ]coil|magnetic (field|effect|force|flux)/i,
    guide:
      "MAGNETISM — field patterns: bar magnet (out of N, into S, closed loops), straight wire (concentric circles, right-hand thumb rule), circular loop (axial field), solenoid (uniform inside, weak outside), toroid; B-r for a wire (∝ r inside, ∝ 1/r outside) and a solenoid (flat inside, ≈ 0 outside). Force on a charge F = qv×B: circular path when v ⊥ B (r = mv/qB), helix when oblique, straight when parallel — draw v, B, F directions for each. Force on a wire F = BIL sinθ with Fleming's left-hand rule; moving-coil galvanometer (radial field, restoring torque); cyclotron (dees, spiral path, alternating gap field); motor (split-ring commutator, torque on the coil).",
  },
  {
    id: "emi",
    match:
      /electromagnetic induction|faraday|lenz|induced (emf|current)|flux.*(change|graph)|motional emf|eddy current|transformer|self[- ]induct|mutual induct|ac generator|dynamo|choke/i,
    guide:
      "ELECTROMAGNETIC INDUCTION — magnet approaching/receding a coil (Lenz: the induced current's pole opposes the motion, galvanometer deflects opposite ways); Φ-t graph with ε = −dΦ/dt as its negative slope; rod sliding on rails (ε = Blv, current direction, opposing magnetic force); AC generator (coil at 0, π/2, π, 3π/2 with slip rings, ε = ε₀ sinωt); transformer (step-up Nₛ > Nₚ, step-down, laminated core, Vₛ/Vₚ = Nₛ/Nₚ = Iₚ/Iₛ); self and mutual induction circuits; eddy currents as swirling loops in bulk metal. Mark flux direction, motion direction and induced-current direction on every case.",
  },
  {
    id: "ac-circuits",
    match:
      /alternating (current|circuit)|\bac\b|phasor|impedance|reactance|resonance.*(circuit|curve|frequency)|lcr|power factor|wattless|rms|lc oscillation/i,
    guide:
      "ALTERNATING CURRENT — phasor diagrams: R (V and I in phase), L (V leads I by π/2), C (I leads V by π/2), LCR series (V_L up, V_C down, V_R along I, resultant V, φ = tan⁻¹((X_L − X_C)/R)); impedance triangle (R, X_L − X_C, Z); resonance curve I vs f (peak at f₀ = 1/(2π√LC), sharper for smaller R, bandwidth and Q marked); v(t) and i(t) waveforms with the phase lead/lag marked; power factor cosφ and wattless current at φ = π/2; LC energy oscillation between C and L. Units: V (V), I (A), f (Hz), X and Z (Ω).",
  },
  {
    id: "wave-optics",
    match:
      /interference|young('s)? double|fringe|diffraction|polariz|brewster|wave optics|huygens|coherent/i,
    guide:
      "WAVE OPTICS — Young's double slit (S₁, S₂ separated by d, screen at D, β = λD/d, bright/dark positions, equal-width equal-brightness intensity fringes); single-slit diffraction (central maximum twice as wide, diminishing secondary maxima, minima at a sinθ = nλ); polarization by reflection (Brewster tanθₚ = n, reflected ray fully polarized) and by Polaroids (transmission axes); Huygens wavefront construction for reflection and refraction. Mark λ, d, D, θ and the fringe order n.",
  },
  {
    id: "photoelectric",
    match:
      /photoelectric|photon|work function|threshold frequency|stopping potential|planck|hertz.*experiment/i,
    guide:
      "PHOTOELECTRIC EFFECT — setup (evacuated tube, emitter C, collector A, variable voltage, microammeter); I-V curves at different intensities (same stopping potential, saturation current ∝ intensity) and at different frequencies (same saturation, stopping potential more negative); KEmax vs f straight line (slope h, x-intercept f₀, y-intercept −φ). Mark V₀, f₀, φ; Einstein's equation hν = φ + KEmax; emission is instantaneous.",
  },
  {
    id: "atomic-nuclear",
    match:
      /bohr|atomic (model|structure|spectra)|energy level|hydrogen spectrum|spectral series|lyman|balmer|paschen|radioactiv|half[- ]life|decay (curve|constant)|binding energy|fission|fusion|nuclear (reactor|reaction)|x[- ]ray|de broglie|davisson|compton|pair production/i,
    guide:
      "ATOMIC & NUCLEAR — Bohr orbits (rₙ ∝ n², Eₙ = −13.6/n² eV) with transitions and series (Lyman → n = 1 UV, Balmer → n = 2 visible, Paschen → n = 3 IR); energy-level diagram with arrows and wavelengths; decay curve N-t (exponential, T½ marked at N₀/2 and N₀/4, activity A = λN the same shape); binding energy per nucleon vs A (peak ≈ 8.8 MeV at Fe-56, fusion on the light side, fission on the heavy side); fission chain (U-235 + n → fragments + 2–3 n); X-ray spectrum (continuous bremsstrahlung with cutoff λmin = hc/eV plus characteristic Kα/Kβ spikes); de Broglie λ = h/p and Davisson-Germer crystal diffraction.",
  },
  {
    id: "solids-electronics",
    match:
      /semiconductor|band (gap|theory|diagram)|p[- ]n junction|diode.*(bias|characteristic)|zener|rectifier|transistor|logic gate|\bled\b|solar cell|photodiode|doping|intrinsic|extrinsic/i,
    guide:
      "SOLIDS & ELECTRONICS — band diagrams (conductor: overlap; semiconductor: gap ≈ 1 eV; insulator: large gap); p-n junction (depletion region, barrier potential; forward bias narrows it and conducts past ≈ 0.7 V for Si, reverse bias widens it with tiny leakage); diode I-V (forward knee, reverse saturation, breakdown); half-wave (one hump per cycle) and full-wave (both humps) rectifier input/output waveforms with capacitor smoothing ripple; Zener regulation (flat reverse-breakdown voltage); transistor CE input/output characteristics (active, saturation, cutoff regions); logic gate symbols with truth tables (AND, OR, NOT, NAND, NOR, XOR).",
  },
  {
    id: "communication",
    match:
      /communication|modulat|amplitude modulation|frequency modulation|bandwidth|propagation|sky wave|ground wave|space wave|ionosphere|antenna|transmitter|receiver|sampling|\bpcm\b/i,
    guide:
      "COMMUNICATION SYSTEMS — block diagram (source → transducer → transmitter → channel → receiver → destination, noise entering the channel); AM waveform (carrier envelope follows the message, μ marked) and FM (constant amplitude, varying frequency); sidebands f_c ± f_m, bandwidth 2f_m; propagation (ground wave along the surface, sky wave reflected by the ionosphere, space wave line-of-sight); sampling at fₛ ≥ 2f_m (Nyquist).",
  },
  // ── MATHEMATICS · CLASS 11 & 12 ────────────────────────────────────────────
  {
    id: "function-graphs",
    match:
      /graph of|curve sketch|function.*(graph|sketch)|linear function|quadratic (function|graph|equation)|cubic|polynomial|reciprocal|rational function|modulus|absolute value|exponential (function|graph)|logarithmic (function|graph)|greatest integer|step function|signum|even.*odd|periodic|domain.*range/i,
    guide:
      "FUNCTION GRAPHS — draw every asked sign case: linear y = mx + c (slope and intercept marked); quadratic y = ax² + bx + c — all six cases a > 0 / a < 0 × D > 0 (two x-intercepts) / D = 0 (touches the axis) / D < 0 (no real roots), vertex (−b/2a, −D/4a) and dashed axis of symmetry; cubic (positive/negative leading coefficient, turning points and inflection); y = 1/x and rational functions (dashed vertical/horizontal asymptotes, holes as open circles); |x| V-shape and |f(x)| (negative parts reflected up); e^x, e^−x, a^x (horizontal asymptote y = 0, pass through (0,1)); ln x (vertical asymptote x = 0, (1,0), domain x > 0); greatest-integer steps with open/closed endpoints. Mark intercepts, asymptotes, domain, range and symmetry on every panel.",
  },
  {
    id: "trigonometric-graphs",
    match:
      /trigonometric (function|graph|curve)|graph.*(sin|cos|tan)|unit circle|inverse (trig|circular|sin|cos|tan)|amplitude|phase (shift|angle)|period.*(graph|function)|arcsin|arccos|arctan|general (value|solution)/i,
    guide:
      "TRIGONOMETRIC GRAPHS — sin, cos, tan on [−2π, 2π] with exact ticks (π/2, π, 3π/2, 2π), amplitude 1, period 2π (tan: period π, dashed asymptotes at odd multiples of π/2); y = a sin(bx + c) + d with amplitude |a|, period 2π/|b|, phase shift −c/b and midline y = d marked; unit circle with exact values at the standard angles and quadrant signs (ASTC); inverse functions on their restricted branches (sin⁻¹: domain [−1,1], range [−π/2, π/2]; cos⁻¹: range [0, π]; tan⁻¹: horizontal asymptotes ±π/2).",
  },
  {
    id: "calculus-graphs",
    match:
      /derivative|differentiat|tangent|normal.*(curve|line)|increasing|decreasing|monoton|maxima|minima|extrem|concav|inflection|area (under|between)|definite integral|integration.*(graph|area)|limit.*(graph|function)|continuity|discontinu|slope field|anti[- ]?derivative/i,
    guide:
      "CALCULUS GRAPHS — tangent at a point (slope = f′(x)); increasing (f′ > 0) and decreasing (f′ < 0) intervals marked on the curve; local maxima/minima (f′ = 0 with sign change or the f″ test) and inflection points (concavity changes); concave-up/down arcs; area under a curve shaded between x = a and x = b (signed area — below the axis is negative); area between two curves (intersections found first, upper − lower shaded); discontinuity types — removable (hole), jump (open/closed dots at different heights), infinite (vertical asymptote); left/right limit approach arrows.",
  },
  {
    id: "conics-coordinate",
    match:
      /conic|parabola|ellipse|hyperbola|circle.*(equation|graph|tangent)|focus|foci|directrix|latus rectum|eccentricity|asymptote|pair of (straight )?lines|angle bisector|straight line.*(graph|figure)|coordinate (geometry|plane)/i,
    guide:
      "CONICS & COORDINATE GEOMETRY — parabola in all four orientations (y² = 4ax right, y² = −4ax left, x² = 4ay up, x² = −4ay down) with focus, directrix, vertex and latus rectum (length 4a); ellipse x²/a² + y²/b² = 1 (a > b: foci on the x-axis, c² = a² − b², e = c/a < 1; both orientations); hyperbola x²/a² − y²/b² = 1 (foci, dashed asymptotes y = ±(b/a)x, e > 1, conjugate and rectangular xy = c² forms); circle (centre, radius, tangent perpendicular to the radius at contact); pair of straight lines through the origin with the angle between them and its bisectors. Letter every point; mark a, b, c, e and the axes.",
  },
  {
    id: "vectors-3d",
    match:
      /vector|parallelogram law|triangle law|resolution|component|dot product|cross product|scalar product|vector product|collinear|coplanar|direction (cosine|ratio)|three dimensional|\b3d\b|plane.*(equation|angle)|section formula/i,
    guide:
      "VECTORS & 3D — addition (triangle head-to-tail, parallelogram diagonal, polygon), subtraction a − b = a + (−b), resolution into components (a cosθ, a sinθ) with θ marked; dot product as projection (a·b = |a||b|cosθ), cross product by the right-hand rule (parallelogram area); collinear vectors on one line, coplanar in one plane; 3D axes with P(x, y, z), direction cosines l, m, n (l² + m² + n² = 1), a line through a point with direction ratios, a plane with its normal, angle between line and plane; section formula point dividing AB in m : n.",
  },
  {
    id: "linear-programming",
    match:
      /linear programming|\blpp\b|feasible (region|solution)|constraint|objective function|corner point|optimal (solution|value)|bounded|unbounded.*(region|solution)|optimi[sz]/i,
    guide:
      "LINEAR PROGRAMMING — constraint lines solid (≤/≥ include the boundary), half-planes shaded with a test-point arrow, feasible region highlighted (bounded polygon or unbounded), corner points lettered with coordinates, objective Z = ax + by evaluated at every corner in a small table with the optimum starred; also the infeasible case (no common region) and multiple optima (objective edge parallel to a constraint). Non-negativity x, y ≥ 0 keeps the first quadrant.",
  },
  {
    id: "probability-statistics",
    match:
      /probability|venn|tree diagram|bayes|independent event|mutually exclusive|conditional|random variable|binomial|normal distribution|histogram|frequency (polygon|curve)|ogive|mean|median|mode|standard deviation|variance|skewness|dispersion/i,
    guide:
      "PROBABILITY & STATISTICS — Venn diagrams for 2/3 sets (regions labelled, asked event shaded, complement/union/intersection); probability trees (branch probabilities, multiply along a path, add across paths, with/without replacement changes the second stage); histogram (frequency density for unequal classes), frequency polygon (class midpoints), ogives (less-than and more-than crossing at the median); normal curve (bell symmetric about μ, μ ± σ and μ ± 2σ marked, total area 1); skewness (positive: tail right; negative: tail left; symmetric); binomial bars for p < 0.5, p = 0.5, p > 0.5.",
  },
  {
    id: "complex-numbers",
    match:
      /complex number|argand|imaginary|modulus.*(complex|z)|conjugate|\biota\b|polar form|de moivre|locus.*(z|complex)|roots of unity/i,
    guide:
      "COMPLEX NUMBERS — Argand plane (real x, imaginary y): z = x + iy as point and vector, |z| the distance from the origin, argument θ from the positive real axis, conjugate reflected across the real axis, polar form r(cosθ + i sinθ); loci |z − z₀| = r (circle) and |z − z₁| = |z − z₂| (perpendicular bisector); triangle inequality as a vector triangle; roots of unity equally spaced on the unit circle.",
  },
  {
    id: "numerical-methods",
    match:
      /bisection|newton[- ]raphson|trapezoidal|simpson|numerical (integration|method|root)|iteration|root.*(equation|finding)/i,
    guide:
      "NUMERICAL METHODS — bisection (f(a)f(b) < 0, midpoint halving, iteration table); Newton-Raphson (tangent at xₙ meets the x-axis at xₙ₊₁, two or three iterations drawn converging to the root); trapezoidal rule (strips as trapezoids under the curve) and Simpson's rule (parabolic arcs), strip width h and ordinates y₀…yₙ marked.",
  },
  {
    id: "sequences-series",
    match:
      /sequence|series|arithmetic progression|geometric progression|harmonic progression|\bap\b|\bgp\b|common (difference|ratio)|sum of.*(series|terms)|sigma notation/i,
    guide:
      "SEQUENCES & SERIES — terms on a number line (AP: equal spacing d; GP: multiplicative steps), bar chart of terms (AP linear, GP exponential growth/decay), sum visualised as accumulated bars; infinite GP with |r| < 1 shown converging (S = a/(1 − r)). Mark a, d or r and the term index n.",
  },
];

/** At most this many condition blocks ride on one request. */
export const MAX_CONDITION_MATCHES = 3;

/**
 * The matched condition laws for a drawing request — "" when nothing matches
 * (a biology or language figure keeps its archetype guide alone). Pure and
 * deterministic, so the owner can predict exactly what a prompt will teach.
 */
export function conditionGuideFor(request: string): string {
  const text = request ?? "";
  if (!text.trim()) return "";
  const matched = FIGURE_CONDITIONS.filter((c) => c.match.test(text)).slice(
    0,
    MAX_CONDITION_MATCHES,
  );
  if (!matched.length) return "";
  return [
    "[SYLLABUS CONDITION GUIDE — draw precisely these standard cases and marks]",
    FIGURE_CONDITION_LAW,
    ...matched.map((c) => c.guide),
  ].join("\n");
}
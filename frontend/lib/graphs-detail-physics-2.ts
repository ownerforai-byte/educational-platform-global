/**
 * Graph Bank — detail layer, Physics 2 (electricity, modern physics, waves).
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_PHYSICS_2: Record<string, GraphDetailInfo> = {
  "phy-vi-ohmic-nonohmic": {
    gives: [
      "Resistance from the graph: ohmic devices give a straight line through the origin (R = V/I constant).",
      "Instant classification: straight line = ohmic conductor, curve = non-ohmic device.",
      "Dynamic resistance at any point from the local slope of a curved characteristic.",
    ],
    applies: [
      "Identifying unknown circuit components by their V–I fingerprint.",
      "Filament lamps (curve flattens — heating raises R), diodes (knee then conduction).",
      "NEB practicals: plotting V–I for a wire, a bulb and a diode side by side.",
    ],
    happens: [
      "Drag along the ohmic line: doubling V exactly doubles I, whatever the value — resistance never changes.",
      "On the diode curve: nothing happens until the knee voltage, then current explodes — the forward threshold.",
      "On the lamp curve: the line bends over because the hot filament's resistance has grown.",
    ],
    limits: [
      "'Ohmic' holds only while temperature stays constant — most metals are ohmic only in gentle ranges.",
      "A straight line NOT through the origin is not ohmic (self doesn't qualify).",
      "The graph shows DC behaviour only; AC response of the same parts can differ.",
    ],
  },
  "phy-resistivity-temperature": {
    gives: [
      "Resistivity versus temperature for metals (rising, near-linear) and semiconductors (falling exponentially).",
      "Temperature coefficient of resistance from the metal's slope.",
      "The thermistor fingerprint: steep negative slope used as an electronic thermometer.",
    ],
    applies: [
      "Classifying materials as conductors, semiconductors or insulators.",
      "Thermistor circuits, digital thermometers, fire alarms.",
      "Explaining why bulb filaments draw a current surge when cold.",
    ],
    happens: [
      "Drag along the metal line: more T → more lattice vibration → more collisions → resistivity climbs.",
      "Drag along the semiconductor curve: more T frees more charge carriers — resistivity collapses despite worse collisions.",
      "The two opposite slopes on one graph are the whole conductor-vs-semiconductor story.",
    ],
    limits: [
      "Metals deviate from linearity at very low temperatures (and hit superconductivity).",
      "Semiconductor curve is exponential only in an intermediate range.",
      "Mechanical strain and impurities also shift resistivity — the graph holds them fixed.",
    ],
  },
  "phy-capacitor-charging": {
    gives: [
      "Charge/time curve q(t) = Q₀(1 − e^(−t/RC)): exponential approach to full charge.",
      "The time constant τ = RC — read it where the curve reaches 63.2% of maximum.",
      "Charging current decay i(t) = I₀e^(−t/RC) — steepest at the start, zero at saturation.",
    ],
    applies: [
      "Timing circuits (555 timers), camera flash charging, smoothing in power supplies.",
      "Predicting 'how full is the capacitor after n time constants?' (63%, 86%, 95%, 98%…).",
      "Displacement-current and transient analysis discussions.",
    ],
    happens: [
      "Drag t from zero: charge rises fast while the capacitor is empty (big current), then slows as back-voltage builds.",
      "After 1τ the curve sits at 63% of maximum — mark it on the axis and it repeats at every τ.",
      "The current curve is the mirror image: maximum at switch-on, dying to zero as the capacitor saturates.",
      "Full charge is approached asymptotically — strictly the capacitor is never '100%' done.",
    ],
    limits: [
      "Ideal RC only — real capacitors leak and real sources have internal resistance (folded into R).",
      "Assumes a constant supply voltage and fixed R.",
    ],
  },
  "phy-lr-circuit-graph": {
    gives: [
      "Current growth i(t) = I₀(1 − e^(−Rt/L)): the inductor's version of the RC curve.",
      "Time constant τ = L/R — read at 63.2% of final current.",
      "The back-emf decay curve mirror: v_L starts at max and dies away.",
    ],
    applies: [
      "Relay and solenoid switch-on behaviour, choke coils, filtering.",
      "Explaining why an inductor 'resists change' — current can't jump instantly.",
      "Analysing switch-off sparks (induced emf when current is interrupted).",
    ],
    happens: [
      "Drag from switch-on: current starts at zero because the inductor's back-emf cancels the supply.",
      "As current builds, the back-emf fades (it ∝ di/dt) and current approaches E/R asymptotically.",
      "Bigger L or smaller R → flatter curve → slower circuit (bigger τ).",
    ],
    limits: [
      "Constant R assumed — real inductors' winding resistance heats and drifts.",
      "Ignores core saturation and the switch-off transient entirely.",
    ],
  },
  "phy-photoelectric-stopping-potential": {
    gives: [
      "Stopping potential V₀ versus frequency: a straight line ABOVE the threshold only.",
      "Planck's constant from the slope (h = slope × e) — Millikan's historic measurement.",
      "Threshold frequency from the intercept; work function φ = eV₀ at ν = ν₀ extended.",
    ],
    applies: [
      "The decisive evidence for light quanta — one photon frees one electron.",
      "Determining work functions of metals from measured intercepts.",
      "NEB/CEE classics: comparing two metals' lines (parallel lines, different intercepts).",
    ],
    happens: [
      "Drag below threshold: nothing — zero stopping potential, no emission at any intensity.",
      "Cross the threshold: V₀ grows linearly with frequency — bluer light ejects faster electrons.",
      "Two metals: parallel lines — same slope h, different thresholds φ.",
    ],
    limits: [
      "Requires clean, uniform surfaces (oxide layers shift the intercepts).",
      "Classical wave theory cannot produce this graph at all — that's the point.",
      "Intensity never appears: it changes current, never this line.",
    ],
  },
  "phy-photoelectric-current-voltage": {
    gives: [
      "Photocurrent versus anode voltage: a saturation plateau and a hard cut-off at −V₀.",
      "Saturation current (all emitted electrons collected) — proportional to light intensity.",
      "Stopping potential V₀ where even the fastest electrons are turned back — depends only on frequency.",
    ],
    applies: [
      "Distinguishing intensity effects (current) from frequency effects (energy) in one graph.",
      "Practical photocell and photomultiplier operation.",
      "Classroom demonstration of the two independent quantum results.",
    ],
    happens: [
      "Drag along the plateau: raising V gains no more current — every emitted electron is already collected.",
      "Slide the voltage negative: current collapses exactly at −V₀ — the fastest electron just fails to arrive.",
      "Double the intensity at fixed frequency: the plateau doubles but −V₀ doesn't move.",
      "Raise the frequency at fixed intensity: −V₀ moves out; the plateau stays.",
    ],
    limits: [
      "Assumes monoenergetic collection geometry and no space-charge limits at the anode.",
      "Real photocells have dark current and leakage that tilt the plateau.",
    ],
  },
  "phy-binding-energy-curve": {
    gives: [
      "Binding energy per nucleon against mass number A: the famous curve peaking at Fe-56 (~8.8 MeV).",
      "The two energy valleys: light nuclei (rise steeply — fusion territory) and heavy nuclei (slow decline — fission territory).",
      "The stability argument: anything that climbs toward the peak releases energy.",
    ],
    applies: [
      "Why fusion powers stars (light nuclei climb the steep left flank).",
      "Why fission powers reactors (heavy nuclei step down the gentle right flank).",
      "Estimating energy release from the BE/nucleon difference between reactants and products.",
    ],
    happens: [
      "Drag from H upward: binding per nucleon shoots up — merging light nuclei pays hugely.",
      "Pass iron: the curve tops out — iron is the fusion endpoint of stars.",
      "Drag into the heavy region: slow decline — splitting uranium into mid-A fragments releases ~200 MeV.",
    ],
    limits: [
      "Averages hide structure: odd-A and odd-odd nuclei dip off the smooth trend.",
      "Says nothing about reaction rates or barriers (coulomb walls for fusion).",
    ],
  },
  "phy-radioactive-decay-graph": {
    gives: [
      "N(t) = N₀e^(−λt): the exponential decay of undecayed nuclei (or activity).",
      "Half-life read geometrically: every equal horizontal step halves the height.",
      "The decay constant λ as the initial slope/N₀ — steeper start = shorter half-life.",
    ],
    applies: [
      "Radiometric dating (C-14), medical tracer dosing, radioactive waste storage timescales.",
      "Half-life problems: after n half-lives, N₀/2ⁿ remains.",
      "Activity curves A(t) = λN(t) — same shape, different scale.",
    ],
    happens: [
      "Drag across one half-life: exactly half remains, whatever the starting number.",
      "Drag across another: half of the half — the ratio repeats forever; zero is approached but never reached.",
      "Steeper initial slope = larger λ = shorter half-life; the curves are all rescalings of one exponential.",
    ],
    limits: [
      "Law is statistical — meaningless for a handful of atoms (predicts probabilities, not events).",
      "Assumes a single decay mode; decay chains need sums of exponentials.",
    ],
  },
  "phy-resonance-curve": {
    gives: [
      "Amplitude (or power) versus driving frequency: a peak at the natural frequency ω₀.",
      "Sharpness of the peak = quality factor Q — high Q means tall and narrow.",
      "Bandwidth read at the half-power points (ω₂ − ω₁ = ω₀/Q).",
    ],
    applies: [
      "LCR radio tuning — selectivity is literally the curve's width.",
      "Mechanical resonance in structures (why soldiers break step on bridges).",
      "Microwave cavities, NMR, musical instruments.",
    ],
    happens: [
      "Drag across the peak: amplitude climbs as drive frequency approaches ω₀, then collapses on the far side.",
      "Reduce damping in your head: the peak gets taller and sharper — Q rises.",
      "Far from ω₀ the system barely responds — response ∉ {resonant} off-peak.",
    ],
    limits: [
      "Linear, steady-state response only; at large amplitudes systems go non-linear and the peak distorts.",
      "Requires continuous driving at constant amplitude.",
    ],
  },
  "phy-interference-fringes": {
    gives: [
      "Intensity versus position: I = I₀cos²(φ/2) fringes — bright/dark bands of equal width.",
      "Fringe spacing β = λD/d — measure β, D, d → wavelength (Young's classic).",
      "Energy conservation made visible: dark bands are energy REDISTRIBUTED, not destroyed.",
    ],
    applies: [
      "Wavelength measurement in the student lab (the canonical Young double-slit).",
      "Testing coherence of sources — fringes vanish for incoherent light.",
      "Thin-film colours and anti-reflection coatings (same cos² physics).",
    ],
    happens: [
      "Drag across fringes: intensity oscillates between I₀ and zero — maxima where path difference = nλ.",
      "Halve the slit separation d in your head: fringes spread apart (β ∝ 1/d).",
      "Move the screen closer: everything compresses (β ∝ D).",
    ],
    limits: [
      "Ideal two-point sources; the single-slit diffraction envelope (which modulates real fringes) is ignored here.",
      "Needs stable coherence; two independent lamps never produce this pattern.",
    ],
  },
  "phy-magnetic-field-wire": {
    gives: [
      "B versus distance from a long straight wire: B ∝ 1/r hyperbola.",
      "The steep near-wire rise — field strength doubles when you halve the distance.",
      "Ampèrian reasoning: the 1/r law straight from ∮B·dl = μ₀I.",
    ],
    applies: [
      "Field mapping around power lines and bus bars.",
      "Right-hand-rule lessons paired with the radial decay.",
      "Force-between-wires problems (field of one wire acting on the other).",
    ],
    happens: [
      "Drag toward the wire: B shoots up hyperbolically — never infinite, but the idealisation pretends the wire is thin.",
      "Drag away: B fades as 1/r; at double distance, half the field.",
      "Double the current: the whole curve lifts uniformly (same shape, taller).",
    ],
    limits: [
      "Long straight wire only — finite wires and loops obey different (Biot–Savart) shapes.",
      "Breaks down inside the wire radius (B falls linearly to zero at the centre, not up).",
    ],
  },
  "phy-shm-energy": {
    gives: [
      "Kinetic and potential energy at every displacement — read each curve straight off the y-axis.",
      "The total energy as a flat line: wherever you stand on the swing, K + U reads the same.",
      "The crossing points where K = U = E/2 (at x = ±a/√2) — a standard numerical answer.",
      "Fastest point (x = 0) and the turning points (x = ±a) at a glance.",
    ],
    applies: [
      "Every spring-mass, pendulum and molecular-vibration problem in NEB mechanics.",
      "Energy conversion reasoning: 'where is the block fastest, where is the spring most stretched?'",
      "The energy half of SHM numericals (E = ½mω²a²) alongside the kinematics half.",
    ],
    happens: [
      "Swing from x = ±a to the centre: the U parabola slides down exactly as fast as the K curve rises — the sum never changes.",
      "At x = 0 the K curve kisses its maximum and U touches zero: the block is unstoppably fast there.",
      "Increase the amplitude a: both parabolas stretch taller TOGETHER — the energy grows by a², not by a.",
      "Add damping: the flat total line picks up a downward slope — energy bleeds out each cycle.",
    ],
    limits: [
      "Ideal (undamped, single-frequency) oscillator only — real damped swings lose the flat line.",
      "Sketches show shape, not scale: the curves' heights encode E = ½mω²a² only qualitatively.",
      "Anharmonic systems (large pendulum swings) bend away from exact parabolas.",
    ],
  },
  "phy-faraday-flux-time": {
    gives: [
      "The phase relation the exam keeps testing: EMF is zero where flux peaks, and largest where flux crosses zero.",
      "A visual slope-reader: the steepness of the Φ(t) curve IS the induced EMF (times −N).",
      "The sign story of Lenz's law directly from the minus sign — rising flux gives negative EMF, falling gives positive.",
      "The flux change ΔΦ as the area under the ε(t) graph (with the N factor stripped out).",
    ],
    applies: [
      "AC generators and dynamos — the rotating-coil derivation drawn as two coupled waves.",
      "Switch-on/switch-off transients in coils (with linear or exponential flux instead of sine).",
      "Transformer theory: the same changing flux threads both windings, so both EMFs share this shape.",
    ],
    happens: [
      "Watch Φ climb: ε sits at its most negative (Lenz pushing back hardest).",
      "Across a flux peak: the ε curve sweeps through zero — flat flux induces nothing, however large.",
      "Into the tail: as Φ eases toward zero, ε eases back up — the two curves keep their 90° lockstep.",
      "Spin the coil faster (raise ω): both curves crowd together and every peak value grows — frequency and amplitude tied.",
    ],
    limits: [
      "Single loop geometry idealized: real coils have self-inductance that reshapes the current, not the EMF law.",
      "The sketch fixes the phase at exactly 90° — eddy currents and core losses shift real generator output slightly.",
      "Flux lines are assumed uniform across the coil area; fringing fields break the neat sine.",
    ],
  },
  "phy-transformer-efficiency": {
    gives: [
      "The load at which the machine runs best — the peak, sitting where copper loss equals iron loss.",
      "Both loss families at a glance: the fixed iron overhead and the I² copper tax that explodes at high load.",
      "Why a transformer idles warm and still meters current even with nothing plugged in.",
      "The shape every electrical-machine efficiency question borrows (motors, generators, transformers).",
    ],
    applies: [
      "Power-distribution design: why 11 kV/230 V transformers are specified the way they are.",
      "Load-scheduling reasoning: efficiency peaks dominate real demand (60–75% load) rather than nameplate rating.",
      "The same curve shape for AC motors and generators — one graph, every rotating machine.",
    ],
    happens: [
      "From no load: efficiency rockets up as useful output appears while iron loss stays fixed.",
      "At the design point: the rising copper loss meets the flat iron loss and the curve tops out.",
      "Beyond it: overload pours on I²R heating — the curve tips over and the windings heat up.",
      "Swap the core for better laminations: iron loss shrinks, so the peak slides higher and a touch left.",
    ],
    limits: [
      "Reads for a fixed voltage and power factor; a bad cos φ shifts the whole curve down.",
      "Idealized smooth peak — measured efficiency curves are slightly asymmetric around it.",
      "Assumes the core stays unsaturated; saturation distorts both losses and the curve.",
    ],
  },
  "phy-transistor-output": {
    gives: [
      "The two operating worlds on one frame: the steep saturation rise (switch ON) and the flat active shelves (amplifier).",
      "β read directly from the shelf spacing: equal steps in I_B lift the plateau by equal β-multiples.",
      "The cut-off floor: with I_B = 0 the collector line sits at the axis — the switch OFF.",
      "A training ground for separating dependent (I_C) from control (I_B) variables.",
    ],
    applies: [
      "Biasing an NPN in the active region for amplifier circuits — the flat shelf IS the amplifier's home.",
      "Switching circuits: choose the saturation valley for 'closed', cut-off for 'open'.",
      "Reading practical characteristic sheets in the physics lab and comparing with measured data.",
    ],
    happens: [
      "Sweep V_CE from zero: current shoots up — the transistor is still a pair of forward-biased junctions.",
      "Past ~0.3 V: the shelf flattens — collector current now answers only to the base.",
      "Raise I_B a notch: the whole shelf lifts β-multiples, not by equal milliamps.",
      "Push V_CE far right: the 'flat' shelf tilts gently upward as the effective base shortens (early effect).",
    ],
    limits: [
      "Small-signal NPN geometry only — power transistors show fatter saturation knees and stronger tilt.",
      "Temperature moves the shelves (β drifts and leakage rises at constant I_B).",
      "The sketch exaggerates shelf flatness; real curves tilt enough to matter for biasing calculations.",
    ],
  },
  "phy-doppler-shift": {
    gives: [
      "Both directions in one frame: the swoop upward of approach and the sag of recession from the rest-frequency line.",
      "The divergence warning: why the formula (and the pitch) blows up as the source nears the wave speed.",
      "The linear regime for slow sources — the regime every numerical problem uses.",
      "Wavelength thinking: pitch up means wavelengths squeezed, pitch down means stretched.",
    ],
    applies: [
      "The police speed gun and the weather radar — Doppler shift translated into velocity.",
      "Astronomy's redshift: the same structure at light speed measures galaxy recession.",
      "Medical ultrasound: blood flow speed from the shift in echoes, the modern stethoscope.",
    ],
    happens: [
      "At rest the curve sits on the reference line: f′ = f — silence in the shift language.",
      "Increasing v_s toward you: each extra percent of wave speed buys MORE than the last — the curve steepens.",
      "Crossing the line: the source passes and the sound drops — the curve jumps branches to the falling one.",
      "As v_s approaches v: the graph marches into a wall — the shock front that becomes a sonic boom.",
    ],
    limits: [
      "Observer stationary; move the observer and the formulas swap (and in relativity, merge).",
      "Classical (sound) model only — light needs the relativistic form, though the picture survives.",
      "Point source in open air: extended sources and echoes blur the neat two-branch shape.",
    ],
  },
};

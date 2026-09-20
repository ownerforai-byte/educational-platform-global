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
};

/**
 * Graph Bank — enrichment layer: real-world connections ("In reality") and
 * memorable conceptual/exam "Key facts" for every graph.
 *
 * Kept separate from the authored gives/applies/happens/limits detail so it can
 * be merged in without touching the per-subject detail files.
 * Merged into lib/graphs.ts → getGraphDetail().
 */

export interface GraphRealityFacts {
  /** Where this graph shows up in real life, engineering, nature or research. */
  reality: string[];
  /** Memorable, conceptual, exam-worthy facts about the graph. */
  facts: string[];
}

export const GRAPH_REALITY_FACTS: Record<string, GraphRealityFacts> = {
  /* ───────────────────────── Physics — Motion ───────────────────────── */
  "phy-displacement-time": {
    reality: [
      "The trip timeline on a GPS or fitness app is essentially an s–t graph of your journey.",
      "Lift/elevator controllers plot position vs time to plan smooth starts and stops.",
      "Traffic engineers use it to model a vehicle approaching and clearing a junction.",
    ],
    facts: [
      "Slope at any point IS the instantaneous velocity — no calculation needed.",
      "Trap: the area under an s–t graph has NO physical meaning (unlike v–t).",
      "A curved s–t line still describes straight-line motion; the curve means changing speed, not a bent path.",
      "A horizontal stretch is rest; a downward slope means the body is returning toward the origin.",
    ],
  },
  "phy-velocity-time": {
    reality: [
      "Braking-distance and reaction-time analysis in road safety is read straight off a v–t graph.",
      "An aircraft's take-off roll and a rocket's ascent profile are tracked as v–t curves.",
      "Speed-logging dashcams and telematics produce exactly this graph.",
    ],
    facts: [
      "Slope = acceleration; area between curve and t-axis = displacement.",
      "All three equations of uniformly accelerated motion fall out of the area of one trapezium on this graph.",
      "Area below the t-axis counts as negative displacement — the step students most often miss.",
      "The instant the curve crosses the t-axis is where the body reverses direction.",
    ],
  },
  "phy-acceleration-time": {
    reality: [
      "Rocket launch and stage-separation profiles are planned as a–t graphs.",
      "Crash tests and smartphone accelerometers record g-forces vs time.",
      "Sports biomechanics uses it to study a sprinter's explosive start.",
    ],
    facts: [
      "Area under an a–t graph = change in velocity (Δv = ∫a dt).",
      "A horizontal line at a = 0 means constant velocity; any non-zero flat line means steady acceleration.",
      "Slope of the a–t graph is 'jerk' — the rate at which acceleration itself changes.",
      "It gives only Δv; you must add the initial velocity to get the actual speed.",
    ],
  },
  "phy-projectile-trajectory": {
    reality: [
      "Basketball shots, javelin and shot-put, artillery aiming, and water-fountain arcs.",
      "Video-game physics engines (and Angry Birds) integrate exactly this parabola.",
      "Fireworks and ski-jump trajectories are designed around it.",
    ],
    facts: [
      "In a vacuum the path is a perfect parabola; air resistance makes it fall short and asymmetric.",
      "45° gives maximum range only when launch and landing heights are equal and drag is ignored.",
      "Horizontal velocity stays constant while vertical velocity changes at g — the two motions are independent (Galileo's insight).",
      "At the apex the vertical velocity is zero but acceleration is still g downward.",
    ],
  },
  "phy-shm-graphs": {
    reality: [
      "Pendulum clocks, guitar and violin strings, tuning forks, and a swinging bridge.",
      "Atoms vibrating in a crystal lattice, and the balance wheel of a mechanical watch.",
      "AC circuits: charge, current and voltage in an LC oscillator trace the same sinusoids.",
    ],
    facts: [
      "Velocity leads displacement by 90° (π/2); acceleration is exactly antiphase with displacement (a = −ω²y).",
      "SHM is the shadow (projection) of uniform circular motion onto a diameter.",
      "Energy sloshes between kinetic (max at equilibrium) and potential (max at the extremes); the total stays constant.",
      "Amplitude does not change the period for an ideal oscillator — the isochronism that makes clocks work.",
    ],
  },

  /* ───────────────── Physics — Heat & Thermodynamics ───────────────── */
  "phy-isothermal-adiabatic": {
    reality: [
      "A diesel engine ignites fuel purely by adiabatic compression — no spark plug.",
      "A bicycle pump barrel warms up because you compress air faster than heat can escape.",
      "Rising air in the atmosphere expands and cools adiabatically, forming clouds.",
    ],
    facts: [
      "Isotherm: pV = constant (slow, temperature held by the surroundings). Adiabat: pV^γ = constant (fast, no heat exchange).",
      "The adiabat is always steeper than the isotherm through the same point by a factor of γ (= Cp/Cv).",
      "Area under the curve down to the V-axis = work done by the gas.",
      "Isothermal expansion extracts more work than adabatic expansion over the same volume change.",
    ],
  },
  "phy-isobaric-isochoric": {
    reality: [
      "A sealed pressure cooker is nearly isochoric until the valve lifts; then it holds roughly constant pressure.",
      "Water boiling in an open pan is an isobaric process (at atmospheric pressure).",
      "Piston engines are analysed by splitting the cycle into isobaric, isochoric and isothermal legs.",
    ],
    facts: [
      "Isobaric = constant pressure (horizontal p–V line); work = p·ΔV is the rectangle underneath.",
      "Isochoric = constant volume (vertical line); work is exactly zero because the piston never moves.",
      "Extrapolating a V–T or p–T straight line back to zero volume/pressure lands on −273.15 °C — the origin of the absolute (kelvin) scale.",
      "Heat at constant volume goes entirely into internal energy; at constant pressure some escapes as work.",
    ],
  },
  "phy-newton-cooling-graph": {
    reality: [
      "Forensic scientists estimate time of death from a body's cooling curve.",
      "Why your tea cools fast at first then crawls toward room temperature.",
      "Quenching hot metal, electronics heat-sinks, and HVAC control all model this decay.",
    ],
    facts: [
      "The excess temperature (θ − θ₀) decays exponentially with time.",
      "Rate of cooling is proportional to the excess temperature — halve the excess and you halve the rate.",
      "The curve approaches room temperature asymptotically and never quite touches it.",
      "Strictly valid only for small excess temperatures where convection dominates; radiation bends the linearity.",
    ],
  },
  "phy-g-variation": {
    reality: [
      "Satellites in orbit experience a weaker g that falls with altitude.",
      "Geologists map tiny local g variations to locate oil, minerals and underground cavities.",
      "The classic thought-experiment: you would be weightless at Earth's exact centre.",
    ],
    facts: [
      "g is maximum at the surface, where the inner and outer branches meet at radius R.",
      "Inside a uniform Earth, g falls linearly to zero at the centre; outside it falls as 1/r².",
      "Doubling your distance from the centre drops g to one quarter of its surface value.",
      "Real Earth's dense core makes the inner branch slightly non-linear, and rotation makes g lower at the equator than the poles.",
    ],
  },
  "phy-thermal-expansion-graph": {
    reality: [
      "Expansion gaps in railway tracks and bridge joints prevent buckling on hot days.",
      "A bimetallic strip in a thermostat bends because two metals expand by different amounts.",
      "Overhead power lines sag more in summer and tighten in winter.",
    ],
    facts: [
      "Length vs temperature is a straight line: L = L₀(1 + αT); the slope reveals the expansion coefficient α.",
      "Invar (an iron–nickel alloy) has near-zero expansion, so it is used in precision clocks and surveying tapes.",
      "Aluminium expands roughly twice as much as steel per degree — the reason bimetallic strips curl.",
      "Water is anomalous: it contracts until 4 °C then expands, which is why lakes freeze from the top down.",
    ],
  },

  /* ───────────────────── Physics — Electricity ───────────────────── */
  "phy-vi-ohmic-nonohmic": {
    reality: [
      "A metal resistor obeys Ohm's law; a filament lamp and a semiconductor diode do not.",
      "Household wiring is designed around ohmic behaviour; LED drivers are not.",
      "The I–V curve is how engineers characterise any new electronic component.",
    ],
    facts: [
      "On a V–I graph the slope equals resistance; on an I–V graph the slope equals conductance.",
      "An ohmic conductor is a straight line through the origin (constant R at fixed temperature).",
      "A filament bulb's resistance rises as it heats, so its curve bends away from a straight line.",
      "A diode conducts in one direction only — its curve is flat one way and steep the other.",
    ],
  },
  "phy-resistivity-temperature": {
    reality: [
      "NTC thermistors in digital thermometers and engine coolant sensors exploit the semiconductor curve.",
      "Platinum RTDs use the metal curve for precise industrial temperature measurement.",
      "Why an incandescent bulb usually blows at the moment you switch it on (cold, low resistance, current surge).",
    ],
    facts: [
      "For metals, resistivity rises with temperature — hotter lattice ions scatter electrons more.",
      "For semiconductors and insulators, resistivity falls with temperature — heat frees more charge carriers.",
      "The two curves cross the temperature axis with opposite slopes, a favourite exam comparison.",
      "Superconductors crash to exactly zero resistivity below a critical temperature — a vertical cliff on this graph.",
    ],
  },
  "phy-capacitor-charging": {
    reality: [
      "A camera flash stores energy in a capacitor and dumps it in a millisecond.",
      "Defibrillators, backup power (supercapacitors), and touch-screen sensing all rely on charge/discharge timing.",
      "Capacitors smooth out ripples in every phone and laptop power supply.",
    ],
    facts: [
      "Both charge and discharge are exponential, governed by the time constant τ = RC.",
      "In one τ the capacitor reaches about 63% of full charge; in 5τ it is essentially full (99%).",
      "Current is maximum at the instant you connect it and decays to zero as the capacitor fills.",
      "A capacitor blocks steady DC but passes changing signals — the basis of filtering circuits.",
    ],
  },
  "phy-lr-circuit-graph": {
    reality: [
      "Electromagnets, relay coils and motor windings all build current gradually like this.",
      "The spark you see unplugging an inductive load is the collapsing magnetic field's 'back-EMF' kick.",
      "Ignition coils in cars use the sudden decay to generate a high-voltage spark.",
    ],
    facts: [
      "Current growth and decay are exponential with time constant τ = L/R.",
      "An inductor opposes any change in current, so current cannot jump instantly — it starts at zero.",
      "After about 5τ the current settles at its steady value V/R, and the inductor acts like a plain wire.",
      "The induced back-EMF is largest at the start and decays to zero as the current stabilises.",
    ],
  },

  /* ───────────────────── Physics — Modern ───────────────────── */
  "phy-photoelectric-stopping-potential": {
    reality: [
      "The photoelectric effect powers solar panels, photodiodes and camera light meters.",
      "Automatic doors, burglar alarms and smoke detectors use photoelectric sensors.",
      "Explaining this graph won Einstein the 1921 Nobel Prize — not relativity.",
    ],
    facts: [
      "The slope of the stopping-potential vs frequency line equals h/e — a way to measure Planck's constant.",
      "The frequency-axis intercept is the threshold frequency f₀ below which nothing is emitted.",
      "Stopping potential depends only on frequency, never on light intensity.",
      "The straight line confirms light comes in quanta: E = hf, and the work function φ = h f₀.",
    ],
  },
  "phy-photoelectric-current-voltage": {
    reality: [
      "Photocells that count objects on a conveyor belt or trigger street lights at dusk.",
      "The curve is how a light sensor's sensitivity and saturation are specified.",
      "Old film-light meters and TV camera tubes relied on this behaviour.",
    ],
    facts: [
      "Saturation current is directly proportional to light intensity (more photons, more electrons).",
      "Changing intensity changes the height of the curve but never the stopping potential.",
      "At the stopping potential the current falls to zero even though light still shines.",
      "Increasing frequency raises the maximum kinetic energy, so the curve reaches zero at a more negative voltage.",
    ],
  },
  "phy-binding-energy-curve": {
    reality: [
      "Nuclear power plants split heavy nuclei (fission); the Sun fuses light ones (fusion).",
      "Hydrogen bombs and experimental fusion reactors (tokamaks) sit at opposite ends of this curve.",
      "It explains why iron is the end point of stellar nucleosynthesis — the most stable nucleus.",
    ],
    facts: [
      "Binding energy per nucleon peaks near iron-56 (about 8.8 MeV) — the most tightly bound, most stable nucleus.",
      "Energy is released by fusion for light nuclei (A < 56) and by fission for heavy nuclei (A > 56), both moving toward the peak.",
      "The curve is steep for light nuclei and gently slopes down for heavy ones, which is why uranium is fissile.",
      "A higher binding energy per nucleon means a more stable nucleus.",
    ],
  },
  "phy-radioactive-decay-graph": {
    reality: [
      "Carbon-14 dating of fossils and archaeological artefacts.",
      "Radioactive tracers in medical imaging and cancer radiotherapy.",
      "Smoke detectors use a tiny americium source; nuclear waste is managed by its decay timescale.",
    ],
    facts: [
      "The number of undecayed nuclei falls exponentially: N = N₀ e^(−λt).",
      "Half-life is constant — the time to halve is the same whether you start with a million or a thousand atoms.",
      "The curve approaches zero but never actually reaches it: a sample is never 'completely' decayed.",
      "Activity (decays per second) = λN, so it follows the same exponential shape.",
    ],
  },

  /* ───────────────── Physics — Magnetism, AC & Waves ───────────────── */
  "phy-resonance-curve": {
    reality: [
      "Tuning a radio or TV to a station is picking one frequency out of many at resonance.",
      "Wireless phone chargers and induction cooktops use resonant coupling.",
      "A microwave oven drives water molecules at their resonant frequency; a singer can shatter a glass.",
    ],
    facts: [
      "Current is maximum at the resonant frequency f₀ = 1 / (2π√(LC)), where impedance is minimum and equal to R.",
      "At resonance the inductive and capacitive reactances cancel, so the circuit behaves purely resistively.",
      "A sharper, taller peak means a higher quality factor Q — better selectivity for a radio.",
      "Below resonance the circuit is capacitive; above it, inductive.",
    ],
  },
  "phy-interference-fringes": {
    reality: [
      "The colours on a soap bubble and an oil slick are thin-film interference.",
      "Anti-reflective coatings on glasses and camera lenses engineer this effect.",
      "Interferometers measure distances smaller than a wavelength — used in LIGO to detect gravitational waves.",
    ],
    facts: [
      "Young's double-slit experiment (1801) proved the wave nature of light and defeated Newton's corpuscular theory.",
      "Bright fringes occur where the path difference is a whole number of wavelengths (nλ); dark at (n + ½)λ.",
      "Intensity follows a cos² pattern between the bright maxima.",
      "All bright fringes have the same maximum intensity in ideal two-source interference.",
    ],
  },
  "phy-magnetic-field-wire": {
    reality: [
      "Oersted's 1820 compass-deflection experiment near a wire launched electromagnetism.",
      "The magnetic field around high-voltage power lines is a real-world health-and-safety concern.",
      "Electromagnets, relays and speakers are wound wires exploiting this field.",
    ],
    facts: [
      "Outside a long straight wire the field falls as B ∝ 1/r — hyperbolic decay.",
      "The field lines are concentric circles around the wire; use the right-hand grip rule for direction.",
      "Inside the wire (for a thick conductor) B rises linearly with r before the 1/r fall outside.",
      "This was the first hard evidence that electricity and magnetism are linked.",
    ],
  },

  /* ───────────────────────── Chemistry ───────────────────────── */
  "chem-order-diagnostics": {
    reality: [
      "Pharmacists use reaction order to predict a drug's shelf-life and how it clears the body.",
      "Industrial chemists identify order to optimise reactor conditions and catalysts.",
      "Environmental scientists model pollutant breakdown with the same straight-line tests.",
    ],
    facts: [
      "A straight line for ln[A] vs t means a first-order reaction; its slope is −k.",
      "A straight line for 1/[A] vs t means a second-order reaction; its slope is +k.",
      "A straight line for [A] vs t means a zero-order reaction; its slope is −k.",
      "First-order half-life is constant (t½ = 0.693/k) and independent of starting concentration.",
    ],
  },
  "chem-rate-time": {
    reality: [
      "Monitoring a batch reaction in a chemical plant as it runs to completion.",
      "How a catalytic converter's efficiency changes over a car's journey.",
      "Tracking fermentation in brewing or bread-making as reactants are consumed.",
    ],
    facts: [
      "Rate is highest at t = 0 when reactant concentration is greatest, then falls as reactants are used up.",
      "The slope of a tangent to a concentration–time curve gives the instantaneous rate at that moment.",
      "The rate curve approaches zero but the reaction theoretically never quite finishes.",
      "Adding a catalyst raises the whole curve early on without changing the final amount of product.",
    ],
  },
  "chem-maxwell-boltzmann": {
    reality: [
      "Why food cooks faster at a higher temperature and why we refrigerate to slow spoilage.",
      "Evaporative cooling: the fastest molecules escape, lowering the average energy of what remains.",
      "Light gases like hydrogen escaped Earth's early atmosphere because their molecules exceeded escape speed.",
    ],
    facts: [
      "The area under the curve equals the total number of molecules and stays constant at any temperature.",
      "Raising temperature flattens and shifts the peak to higher energy — more molecules can react.",
      "Only molecules with energy at or above the activation energy Eₐ (the right-hand tail) can react.",
      "A catalyst lowers Eₐ, sliding the threshold line left so a far larger fraction of molecules qualify.",
    ],
  },
  "chem-energy-profile": {
    reality: [
      "Hand-warmers are exothermic (ΔH negative); instant cold packs are endothermic (ΔH positive).",
      "Enzymes and catalytic converters work by lowering the hump on this diagram.",
      "Every combustion, from a match to a rocket engine, is an exothermic profile.",
    ],
    facts: [
      "The activation energy Eₐ is the height of the hump from reactants to the transition state.",
      "A catalyst lowers Eₐ but does NOT change ΔH — the start and end levels are untouched.",
      "ΔH = energy of products − energy of reactants: negative for exothermic, positive for endothermic.",
      "Exothermic reactions release heat because the products are more stable (lower energy) than the reactants.",
    ],
  },
  "chem-k-vs-t": {
    reality: [
      "The Haber process tunes temperature to balance rate against equilibrium yield of ammonia.",
      "Refrigeration and industrial synthesis rely on knowing how K shifts with temperature.",
      "Explains why some reactions must be run cold to favour products.",
    ],
    facts: [
      "For an exothermic reaction, K falls as temperature rises (Le Chatelier pushes back to reactants).",
      "For an endothermic reaction, K rises as temperature rises.",
      "A plot of ln K against 1/T is a straight line with slope −ΔH/R — the van't Hoff equation.",
      "A catalyst speeds up reaching equilibrium but does not change K at all.",
    ],
  },
  "chem-titration-curve": {
    reality: [
      "Testing drinking-water quality, food acidity (wine, juice) and soil pH.",
      "Pharmaceutical quality control checks the exact concentration of an active ingredient.",
      "Blood-gas and clinical labs titrate to determine unknown concentrations.",
    ],
    facts: [
      "The equivalence point is the steepest part of the curve — the inflection point.",
      "Strong acid + strong base has an equivalence pH of 7; weak acid + strong base is above 7; weak base + strong acid is below 7.",
      "The indicator must change colour inside the vertical (steep) region of the curve.",
      "A weak-acid curve starts higher and shows a buffer region (a flat stretch) around the half-equivalence point.",
    ],
  },
  "chem-vapour-pressure-t": {
    reality: [
      "On Mount Everest water boils near 70 °C because atmospheric pressure is low — food takes far longer to cook.",
      "A pressure cooker raises the pressure so water boils above 100 °C and cooks faster.",
      "Explains why a wet road dries faster on a hot, dry day.",
    ],
    facts: [
      "A liquid boils when its vapour pressure equals the external (atmospheric) pressure.",
      "The curve rises exponentially with temperature — described by the Clausius–Clapeyron equation.",
      "A liquid with a higher vapour pressure at a given temperature is more volatile (evaporates faster).",
      "Adding a non-volatile solute lowers the vapour pressure, which is why salt raises the boiling point.",
    ],
  },
  "chem-solubility-t": {
    reality: [
      "Recrystallisation purifies salts by dissolving them hot and letting them crystallise as they cool.",
      "Sugar dissolves far faster in hot tea than in iced tea.",
      "Warm river water holds less dissolved oxygen — 'thermal pollution' can suffocate fish.",
    ],
    facts: [
      "Most ionic solids become MORE soluble as temperature rises.",
      "Gases become LESS soluble as temperature rises (and more soluble under higher pressure).",
      "A few salts, like cerium(III) sulphate, become less soluble when heated — the curve slopes downward.",
      "Sodium chloride's solubility barely changes with temperature — an almost flat line.",
    ],
  },
  "chem-atomic-radius-trend": {
    reality: [
      "Predicting how atoms pack in metals and semiconductors.",
      "Understanding bonding strength and material hardness from atomic size.",
      "Explains trends in reactivity across the periodic table.",
    ],
    facts: [
      "Radius DECREASES across a period — more protons pull the same shell in tighter.",
      "Radius INCREASES down a group — each new period adds an electron shell.",
      "The graph is a sawtooth: it falls across each period then jumps up at the next alkali metal.",
      "Caesium is the largest stable atom; helium is among the smallest.",
    ],
  },
  "chem-ionization-energy-trend": {
    reality: [
      "Explains why alkali metals are so reactive (easy to remove an electron) and noble gases are inert.",
      "Predicts the charges ions form and how elements bond.",
      "Underpins the design of materials and photoelectric surfaces.",
    ],
    facts: [
      "Ionization energy generally INCREASES across a period and DECREASES down a group.",
      "There are tell-tale dips at Be→B and N→O caused by subshell stability and electron-pair repulsion.",
      "Helium has the highest first ionization energy; caesium and francium the lowest.",
      "Successive ionization energies jump sharply once you start removing core electrons.",
    ],
  },

  /* ───────────────────────── Biology ───────────────────────── */
  "bio-enzyme-temperature": {
    reality: [
      "A high fever can denature enzymes and become dangerous above ~41 °C.",
      "We refrigerate food to slow the enzyme activity of spoiling microbes.",
      "Thermophilic bacteria in hot springs have enzymes optimised for extreme heat.",
    ],
    facts: [
      "The curve is bell-shaped, peaking at the enzyme's optimum temperature (~37 °C for most human enzymes).",
      "Below the optimum, rate roughly doubles for every 10 °C rise (the Q₁₀ rule).",
      "Above the optimum, activity crashes because the enzyme's active site denatures — this is irreversible.",
      "Different enzymes have different optima, which is why organisms are adapted to their environment.",
    ],
  },
  "bio-enzyme-ph": {
    reality: [
      "Pepsin digests protein in the stomach's pH 2; trypsin works in the intestine at pH ~8.",
      "Antacids relieve indigestion by shifting stomach pH away from pepsin's optimum.",
      "Blood must stay near pH 7.4 or its enzymes stop functioning.",
    ],
    facts: [
      "The curve is bell-shaped with a sharp optimum pH — small deviations sharply reduce activity.",
      "Extreme pH changes ionise the active-site residues and denature the enzyme.",
      "Pepsin's optimum is ~2, most body enzymes ~7, trypsin's ~8 — location matches function.",
      "Outside its pH range the enzyme's shape, and therefore its activity, is lost.",
    ],
  },
  "bio-michaelis-menten": {
    reality: [
      "Drug companies use Km and Vmax to dose medicines and design enzyme inhibitors.",
      "Enzyme-based biosensors (e.g. blood glucose meters) rely on this kinetics.",
      "Detergent and food industries tune enzyme concentrations for maximum effect.",
    ],
    facts: [
      "The curve is a rectangular hyperbola: rate rises steeply then levels off as the enzyme saturates.",
      "Km is the substrate concentration at half Vmax — a LOW Km means HIGH affinity for the substrate.",
      "Vmax is reached when every enzyme molecule is busy; adding more substrate cannot speed it up.",
      "Adding more enzyme raises Vmax but leaves Km unchanged. Michaelis and Menten published this in 1913.",
    ],
  },
  "bio-population-growth": {
    reality: [
      "Human population growth, wildlife conservation quotas, and fisheries management.",
      "Bacteria multiplying in a petri dish or a wound infection.",
      "Invasive species spreading until resources run out.",
    ],
    facts: [
      "The exponential (J-shaped) curve assumes unlimited resources; the logistic (S-shaped) curve levels off at carrying capacity K.",
      "In the logistic model, growth is fastest at the inflection point, halfway to K.",
      "Real populations follow the logistic curve because food, space and disease limit growth.",
      "The logistic model was proposed by Verhulst; the environment's limit is the carrying capacity.",
    ],
  },
  "bio-oxygen-dissociation": {
    reality: [
      "Haemoglobin loads oxygen in the lungs and unloads it in active tissues.",
      "During exercise, working muscles release more CO₂ and heat, shifting the curve to dump oxygen where it is needed.",
      "Explains why fetal blood can steal oxygen from the mother's.",
    ],
    facts: [
      "The curve is sigmoid (S-shaped) because of cooperative binding between haemoglobin's four subunits.",
      "The Bohr effect: more CO₂, lower pH or higher temperature shifts the curve RIGHT, releasing oxygen.",
      "Fetal haemoglobin has a higher affinity — its curve is shifted LEFT to take oxygen from maternal blood.",
      "The plateau at high oxygen pressure guarantees near-full loading in the lungs even if pressure varies.",
    ],
  },
  "bio-photosynthesis-light": {
    reality: [
      "Greenhouses use supplemental lighting tuned to the saturation point.",
      "Plants under a dense canopy grow slower because light is the limiting factor.",
      "Farmers maximise crop yield by managing light, CO₂ and water together.",
    ],
    facts: [
      "Rate rises with light intensity then plateaus at the light-saturation point.",
      "Once saturated, something else (CO₂ or temperature) becomes the limiting factor — Blackman's principle of limiting factors.",
      "The compensation point is where photosynthesis exactly balances respiration (net gas exchange zero).",
      "Beyond a very high intensity, rate can fall as chlorophyll is photo-oxidised (photoinhibition).",
    ],
  },
  "bio-growth-curve": {
    reality: [
      "Bacterial growth in a culture vessel, and tumour growth in medicine.",
      "Crop and livestock growth curves guide farming and harvest timing.",
      "Fermentation industries (yogurt, antibiotics, beer) monitor exactly this curve.",
    ],
    facts: [
      "The sigmoid curve has four phases: lag, log (exponential), stationary and death.",
      "The lag phase is cells adapting; the log phase is fastest division; the stationary phase is where growth equals death.",
      "The same S-shape appears in populations, organisms and cultures because resources always run out.",
      "Industrial harvest is usually timed for the end of the log phase.",
    ],
  },

  /* ───────────────────────── Mathematics ───────────────────────── */
  "math-constant": {
    reality: [
      "A flat service charge or fixed monthly fee, whatever the usage.",
      "A horizontal speed limit sign: one value regardless of time.",
      "The baseline (zero) reference against which other quantities are measured.",
    ],
    facts: [
      "The graph is a horizontal line y = c, crossing the y-axis at c.",
      "Slope (and derivative) is zero everywhere — no change at all.",
      "It is a function (passes the vertical line test) but not one-to-one, so it has no inverse.",
      "Its integral is the straight line cx + C — a steadily growing area.",
    ],
  },
  "math-linear": {
    reality: [
      "A taxi fare: fixed flag-fall (c) plus a per-kilometre rate (m).",
      "Hooke's law (extension ∝ force), Celsius–Fahrenheit conversion, and simple interest.",
      "Any situation with a constant rate of change.",
    ],
    facts: [
      "Slope m is the constant rate of change; c is the y-intercept (the value at x = 0).",
      "It is a polynomial of degree one; equal steps in x give equal steps in y.",
      "The derivative is the constant m and the integral is a quadratic (parabola).",
      "Two lines are parallel if their slopes are equal, and perpendicular if the slopes multiply to −1.",
    ],
  },
  "math-quadratic": {
    reality: [
      "The parabolic path of any projectile under gravity.",
      "Satellite dishes and car headlights use a parabolic reflector to focus signals at one point.",
      "Arch bridges and the arc of a thrown ball; maximising area or profit in business.",
    ],
    facts: [
      "The graph is a parabola; a > 0 opens upward (a minimum), a < 0 opens downward (a maximum).",
      "The vertex sits on the axis of symmetry at x = −b/2a.",
      "The roots (x-intercepts) come from the quadratic formula; the discriminant b² − 4ac tells how many real roots there are.",
      "Every projectile path, area-optimisation and profit-maximisation problem reduces to this shape.",
    ],
  },
  "math-cubic": {
    reality: [
      "Modelling volume that scales with a cube of length.",
      "S-curves in economics (total cost) and the spread of some epidemics.",
      "The point of inflection appears in engineering beam-bending curves.",
    ],
    facts: [
      "The basic cubic y = x³ has an S-shape with a point of inflection at the origin.",
      "It can have one, two or three real roots depending on the turning points.",
      "It has origin symmetry (an odd function): f(−x) = −f(x).",
      "The derivative is a quadratic, so a cubic has at most two turning points.",
    ],
  },
  "math-modulus": {
    reality: [
      "Distance, error magnitude and absolute deviation are always non-negative.",
      "The V-shape appears in tariff jumps, taxi fares and some signal-rectification circuits.",
      "Machine-learning loss functions (L1 / least-absolute-deviation) use |x|.",
    ],
    facts: [
      "The graph is a V-shape with the corner (vertex) at the origin.",
      "Output is always ≥ 0; it reflects the negative part of y = x above the x-axis.",
      "It is not differentiable at x = 0 — there is a sharp corner, not a smooth tangent.",
      "It is an even function, symmetric about the y-axis.",
    ],
  },
  "math-sqrt": {
    reality: [
      "A pendulum's period grows with the square root of its length.",
      "Escape velocity and many physics scaling laws involve √.",
      "Standard deviation and root-mean-square quantities are square-root relationships.",
    ],
    facts: [
      "The graph is the upper half of a sideways parabola, defined only for x ≥ 0.",
      "It is increasing but the slope keeps flattening — growth slows as x grows.",
      "It passes through (0, 0), (1, 1), (4, 2) — perfect squares land on whole numbers.",
      "It is the inverse of y = x² restricted to x ≥ 0; the two curves are mirror images about y = x.",
    ],
  },
  "math-reciprocal": {
    reality: [
      "Boyle's law: pressure–volume of a gas at constant temperature is a 1/x hyperbola.",
      "Resistance of resistors in parallel, and lens/mirror relationships.",
      "Any inverse relationship — as one quantity grows the other shrinks.",
    ],
    facts: [
      "The graph is a rectangular hyperbola with two separate branches (in the first and third quadrants).",
      "It has two asymptotes: the vertical x = 0 and the horizontal y = 0 — the curve never touches either.",
      "It is an odd function, symmetric about the origin.",
      "The product x·y is constant (= 1), which is the signature of inverse proportion.",
    ],
  },
  "math-exponential": {
    reality: [
      "Compound interest, population growth, viral spread, and radioactive decay.",
      "Pandemic case curves and Moore's Law (transistor counts) both grow exponentially.",
      "Capacitor charging and drug clearance in the body follow exponential curves.",
    ],
    facts: [
      "The curve never touches the x-axis — y = 0 is a horizontal asymptote; it is always positive.",
      "It passes through (0, 1) for any base, since a⁰ = 1.",
      "Growth has a constant doubling time; decay has a constant half-life.",
      "For base e (≈2.718), the function is its own derivative — the reason e dominates calculus.",
    ],
  },
  "math-logarithm": {
    reality: [
      "The pH scale, Richter earthquake magnitudes, and decibel sound levels are all logarithmic.",
      "Human perception of loudness, brightness and pitch responds logarithmically (Fechner's law).",
      "Information theory and data-compression measures use log.",
    ],
    facts: [
      "The logarithm is the inverse of the exponential — its graph is eˣ reflected in the line y = x.",
      "It passes through (1, 0) because log 1 = 0, and is defined only for x > 0.",
      "It has a vertical asymptote at x = 0 and grows very slowly (slower than any power of x).",
      "It turns multiplication into addition: log(ab) = log a + log b.",
    ],
  },
  "math-sine": {
    reality: [
      "Sound waves, alternating current, ocean tides and any repeating oscillation.",
      "The pure tone from a tuning fork is a sine wave.",
      "Signal processing and Fourier analysis build every wave from sines.",
    ],
    facts: [
      "Period 2π (360°); range restricted to [−1, 1]; amplitude 1 for plain sin x.",
      "It is an odd function — symmetric about the origin, starting at 0.",
      "Its derivative is cos x, so slope is steepest where the curve crosses zero.",
      "Every sinusoidal wave is a sine stretched, shifted or reflected.",
    ],
  },
  "math-cosine": {
    reality: [
      "The horizontal component of circular motion and the phase of an AC voltage.",
      "Waves and vibrations, identical to sine but offset in time.",
      "Used in signal phase comparison and antenna arrays.",
    ],
    facts: [
      "Cosine is sine shifted left by π/2 — cos x = sin(x + π/2).",
      "It is an even function, symmetric about the y-axis, and starts at its maximum of 1.",
      "Period 2π; range [−1, 1].",
      "Its derivative is −sin x, which is why it lags sine by a quarter cycle.",
    ],
  },
  "math-tangent": {
    reality: [
      "The slope or angle of inclines in ramps, roads and projectile launch.",
      "Trigonometry for surveying, navigation and measuring heights.",
      "Optics and the direction of resultant vectors.",
    ],
    facts: [
      "Period π (180°) — it repeats twice as often as sine.",
      "Vertical asymptotes at 90° + n·180°, where cos x = 0, so tan = sin/cos blows up.",
      "Range is all real numbers (−∞ to +∞); it is an odd function through the origin.",
      "The curve passes through zero wherever sine does.",
    ],
  },
  "math-cotangent": {
    reality: [
      "Appears as the phase-shifted complement of tangent in wave and AC analysis.",
      "Used in some trigonometric identities and navigational calculations.",
      "The reciprocal ratio in right-triangle problems.",
    ],
    facts: [
      "cot x = 1/tan x = cos x / sin x; period π.",
      "Vertical asymptotes at n·180° (where sin x = 0) — the opposite of tangent.",
      "It is a decreasing odd function between its asymptotes.",
      "It is tangent reflected and shifted: cot x = tan(π/2 − x).",
    ],
  },
  "math-secant": {
    reality: [
      "The reciprocal ratio shows up in optics and some physics derivations.",
      "Used when simplifying integrals and trigonometric identities.",
      "Navigation and geodesy formulae occasionally express results as sec.",
    ],
    facts: [
      "sec x = 1/cos x; period 2π.",
      "Vertical asymptotes wherever cos x = 0, i.e. at 90° + n·180°.",
      "It is an even function with U-shaped branches; its range is (−∞, −1] ∪ [1, ∞) — never between −1 and 1.",
      "Each branch touches ±1 exactly where cosine is at its ±1 peaks.",
    ],
  },
  "math-cosecant": {
    reality: [
      "The reciprocal of sine appears in wave and diffraction mathematics.",
      "Used in trigonometric simplification and some physics formulae.",
      "Complements secant in the family of reciprocal trig functions.",
    ],
    facts: [
      "cosec x = 1/sin x; period 2π.",
      "Vertical asymptotes wherever sin x = 0, i.e. at n·180°.",
      "It is an odd function; range is (−∞, −1] ∪ [1, ∞).",
      "Its U-shaped branches peak where sine reaches ±1.",
    ],
  },
  "math-step": {
    reality: [
      "Parking fees, postal rates and tax brackets that jump at thresholds.",
      "Staircase profiles, digital (quantised) signals and rounding to whole units.",
      "Pricing tiers: the cost is flat within a band, then steps up.",
    ],
    facts: [
      "The greatest-integer (floor) function is constant between integers and jumps by 1 at each integer.",
      "It has jump discontinuities at every whole number — it is neither continuous nor differentiable there.",
      "Domain is all real numbers; range is only the integers.",
      "It is the mathematical model of any quantised or tiered quantity.",
    ],
  },
  "math-circle": {
    reality: [
      "Wheels, coins, roundabouts, gears and ripples spreading on water.",
      "Planetary orbits approximated as circles; radar and sonar sweeps.",
      "Round arches, domes and any perfectly symmetric shape.",
    ],
    facts: [
      "x² + y² = r² describes all points a fixed distance r from the centre.",
      "It is NOT a function — it fails the vertical line test (two y-values for most x).",
      "It has perfect rotational and reflectional symmetry; circumference 2πr, area πr².",
      "A circle is the special case of an ellipse with both axes equal (eccentricity 0).",
    ],
  },
  "math-ellipse": {
    reality: [
      "Planets orbit the Sun in ellipses with the Sun at one focus (Kepler's first law).",
      "A whispering gallery focuses sound from one focus to the other; lithotripsy uses it to break kidney stones.",
      "Rugby balls, running tracks and many architectural arches are elliptical.",
    ],
    facts: [
      "x²/a² + y²/b² = 1; the sum of distances from any point to the two foci is constant.",
      "Eccentricity e lies between 0 and 1; e = 0 gives a perfect circle, e near 1 is very stretched.",
      "It is a closed, symmetric curve — also not a function (fails the vertical line test).",
      "Reflective property: a ray from one focus always reflects to the other focus.",
    ],
  },
  "math-hyperbola": {
    reality: [
      "The shape of natural-draught cooling towers at power stations.",
      "A spacecraft's gravity-assist ('slingshot') and a comet's escape path are hyperbolic.",
      "LORAN and some GPS-style navigation locate a point from time differences on hyperbolas.",
    ],
    facts: [
      "x²/a² − y²/b² = 1 has two separate branches; the DIFFERENCE of distances to the two foci is constant.",
      "Eccentricity e > 1 (contrast with the ellipse, where e < 1).",
      "The curve approaches two straight asymptotes y = ±(b/a)x but never touches them.",
      "It is the mirror partner of the ellipse — the same conic section cut at a steeper angle.",
    ],
  },
  "math-inverse-trig": {
    reality: [
      "Finding an angle from a ratio — surveying, robotics arm angles, and projectile launch angle.",
      "Navigation and astronomy compute angles from measured heights and distances.",
      "Phase angles in AC circuits use inverse trigonometric functions.",
    ],
    facts: [
      "sin⁻¹x has domain [−1, 1] and range [−π/2, π/2]; cos⁻¹x has range [0, π].",
      "Each is the original trig curve reflected in y = x, but only after restricting the domain so it passes the horizontal line test.",
      "Without that restriction the inverse would not be a function — one x would map to many angles.",
      "The restricted ranges are called the principal values.",
    ],
  },
};

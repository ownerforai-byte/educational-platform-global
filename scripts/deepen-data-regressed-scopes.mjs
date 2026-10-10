// Authored NEB notes for the thin files that regressed formerly-CLEAN scopes
// during the 2026-10-10 consolidation (dedup-merged scaffolds + thin imports).
// Each replaces the target's `notes` array in place; every other field is kept.
// Key = source path prefix under content/ravikishan/ (resolved by unique prefix;
// the nepali entries use their numeric prefix so no Devanagari literal is needed).
export default [
  // ── physics/dc-circuits ──
  {
    file: "class-11-notes/physics/dc-circuits/concepts/01-electric-current-drift-velocity",
    notes: [
      "**Electric current.** Current is the rate of flow of charge, I = q/t; its SI unit is the ampere (1 A = 1 C/s) and conventional current is taken from positive to negative.",
      "**Drift velocity.** Free electrons gain a tiny average velocity v_d along the field between collisions: v_d = eEτ/m = eVτ/(ml); it is of the order of mm/s even in strong currents.",
      "**Relation I = nAev_d.** In time t electrons move v_d·t, so the charge crossing area A is q = nAev_d·t, giving I = nAev_d, where n is the number of free electrons per unit volume.",
      "**Current density and mobility.** J = I/A = nev_d is the current density; mobility μ = v_d/E, and conductivity σ = neμ connects drift to the microscopic picture.",
      "**Macroscopic vs microscopic.** Ohm's law in microscopic form is J = σE; the same field that drives the drift also sustains the current the ammeter reads.",
    ],
  },
  {
    file: "class-11-notes/physics/dc-circuits/concepts/02-ohms-law-resistance",
    notes: [
      "**Ohm's law.** At constant physical conditions (temperature, state) the potential difference across a conductor is directly proportional to the current: V ∝ I, or V = IR.",
      "**Resistance and resistivity.** R = ρL/A: resistance grows with length L and falls with area A; resistivity ρ (unit Ω·m) is a property of the material itself.",
      "**Temperature dependence.** For metals R_t = R_0(1 + αt) with α > 0; semiconductors have negative temperature coefficient as carrier density rises with heat.",
      "**Conductance and conductivity.** Conductance G = 1/R (siemens) and conductivity σ = 1/ρ; better conductors have large σ and small ρ.",
      "**Limitations.** Ohm's law does not hold for diodes, electrolytes, superconductors or conductors at changing temperature — there V–I is not a straight line through the origin.",
    ],
  },
  {
    file: "class-11-notes/physics/dc-circuits/concepts/06-work-power-circuits",
    notes: [
      "**Electrical work.** Moving charge q through potential V costs W = qV = VIt; in a pure resistance this equals I²Rt = V²t/R — the energy converted.",
      "**Electric power.** P = VI = I²R = V²/R, measured in watts; 1 horsepower ≈ 746 W and commercial rating is often in kW.",
      "**Energy unit.** 1 kWh (one 'unit' on a meter bill) = 3.6 × 10⁶ J — the energy a 1000 W appliance uses in an hour.",
      "**Joule's heating.** A current I through resistance R heats it by H = I²Rt (Joule's law); this is the working principle of heaters, bulbs and fuses.",
      "**Maximum power transfer.** A source of emf E and internal r delivers maximum power to an external R when R = r; the efficiency of energy transfer is then only 50%.",
    ],
  },
  // ── physics/rate-of-heat-flow ──
  {
    file: "class-11-notes/physics/rate-of-heat-flow/concepts/03-radiation-black-body",
    notes: [
      "**Thermal radiation.** Hot bodies emit energy as electromagnetic waves mainly in the infrared region; unlike conduction and conduction it needs no material medium.",
      "**Black body.** An ideal black body absorbs all incident radiation and, at the same temperature, emits the maximum possible radiation; a small hole in a hollow enclosure behaves like one.",
      "**Stefan's law.** The energy radiated per unit area per second is E = σT⁴; for a body at T losing heat to surroundings at T₀, P = σeA(T⁴ − T₀⁴), with σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴.",
      "**Wien's displacement law.** The wavelength of peak emission obeys λ_max T = b with b = 2.898 × 10⁻³ m·K — hotter bodies peak at shorter wavelengths (blue-shifted glow).",
      "**Kirchhoff's law and use.** At thermal equilibrium emissivity equals absorptivity; the balance of absorbed and re-radiated infrared explains the greenhouse effect and satellite thermal design.",
    ],
  },
  // ── physics/recent-trends-in-physics ──
  {
    file: "class-11-notes/physics/recent-trends-in-physics/concepts/02-universe-big-bang",
    notes: [
      "**Big Bang model.** The universe began about 13.8 billion years ago in an extremely hot, dense state and has been expanding and cooling ever since; space itself expands, galaxies recede from each other.",
      "**Hubble's evidence.** Galaxies show redshift proportional to distance (v = H₀d) — the expansion law that founded observational cosmology.",
      "**Cosmic microwave background.** The faint 2.7 K microwave glow filling the sky is the cooled remnant of the fireball, released when atoms formed about 380,000 years after the Big Bang.",
      "**Primordial nucleosynthesis.** In the first minutes, nuclear fusion made hydrogen, helium and traces of lithium; all heavier elements were forged later inside stars.",
      "**Timeline.** Inflation → matter–radiation equality → recombination and CMB → first stars and galaxies → solar system (about 9 Gyr later) → planets and life.",
    ],
  },
  {
    file: "class-11-notes/physics/recent-trends-in-physics/concepts/03-dark-matter-black-holes",
    notes: [
      "**Dark matter.** About 27% of the universe is invisible matter detected only through its gravity; it neither emits nor absorbs light and outweighs visible matter roughly five to one.",
      "**Evidence for dark matter.** Galaxy rotation curves stay flat far from the centre (Kepler's law fails), gravitational lensing is stronger than visible mass allows, and the CMB pattern fixes its share of the energy budget.",
      "**Black holes.** Where gravity is so strong that the escape velocity reaches c, nothing — not even light — can leave; the horizon radius is the Schwarzschild radius r_s = 2GM/c².",
      "**Signatures.** A black hole is revealed by its effects: stars orbiting an invisible companion, X-rays from a glowing accretion disc, and gravitational waves from merging black holes (LIGO).",
      "**Modern imaging.** The Event Horizon Telescope photographed the shadow of M87's central black hole, testing general relativity in the strong-field regime.",
    ],
  },
  // ── physics/refraction ──
  {
    file: "class-11-notes/physics/refraction-at-plane-surfaces/concepts/01-laws-refraction-refractive-index",
    notes: [
      "**Refraction.** Light bends while crossing obliquely between media of different optical density because its speed changes; it bends towards the normal entering a denser medium and away from it leaving.",
      "**Snell's law.** For a ray crossing the boundary, n₁ sin i = n₂ sin r, with the incident ray, refracted ray and normal all in one plane and sin i/sin r constant for the pair of media.",
      "**Refractive index.** The absolute index of a medium is n = c/v; the relative index of medium 2 w.r.t. 1 is n₂₁ = v₁/v₂ = sin i/sin r = 1/n₁₂.",
      "**Apparent depth.** Viewed normally, a depth t appears as t/n; the normal shift is t(1 − 1/n) — the standard numerical on river depth and pooled objects.",
      "**Dispersion's origin.** Because v depends on wavelength, n_violet > n_red; white light refracting at a surface separates colour — the seed of the prism spectrum.",
    ],
  },
  {
    file: "class-11-notes/physics/refraction-through-prisms/concepts/02-prism-deviation-formula",
    notes: [
      "**Geometry of a prism.** The refracting angle of the prism equals the sum of the internal angles, A = r₁ + r₂, whatever the incidence.",
      "**Angle of deviation.** The ray turns through δ = (i₁ + i₂) − A, where i₁ and i₂ are the angles at the two faces.",
      "**Minimum deviation.** Deviation is least when the ray passes symmetrically (i₁ = i₂, r₁ = r₂ = A/2); then δ_m = 2i − A — the setting used in all prism measurements.",
      "**Prism formula.** At minimum deviation the refractive index is n = sin[(A + δ_m)/2] / sin(A/2) — how n of a glass prism is found experimentally.",
      "**Dispersion and thin prisms.** For a thin prism δ = (n − 1)A; violet deviates most and red least, and the angular dispersion is θ = δ_v − δ_r, giving the dispersive power ω = θ/δ_y.",
    ],
  },
  // ── physics/thermal-expansion ──
  {
    file: "class-11-notes/physics/thermal-expansion/concepts/02-cubical-superficial-expansion",
    notes: [
      "**Superficial expansion.** A heated sheet grows in area as ΔA = A₀βt where β is the areal expansion coefficient; for isotropic solids β = 2α, α being the linear coefficient.",
      "**Cubical expansion.** A heated solid grows in volume as ΔV = V₀γt with γ = 3α — the cube relation follows because V = L³, so ΔV/V = 3ΔL/L.",
      "**Derivation.** From V = L³, differentiating gives dV/V = 3 dL/L; similarly dA/A = 2 dL/L — hence β : γ = 2 : 3 relative to α.",
      "**Holes and gaps.** A hole in a heated plate expands exactly as solid material would — the hole gets bigger, not smaller; railway gaps and bimetal strips exploit this.",
      "**Numerical habit.** Convert every temperature rise to Δt, pick the right coefficient (α, β or γ), then apply Δ = initial × coefficient × Δt with consistent units.",
    ],
  },
  {
    file: "class-11-notes/physics/thermal-expansion/concepts/04-dulong-petit-method",
    notes: [
      "**Dulong–Petit law.** The molar heat capacity of a solid is about 3R ≈ 25 J mol⁻¹ K⁻¹ near room temperature — each atom behaves as an independent oscillator with 3 kinetic + 3 potential degrees of freedom.",
      "**Finding atomic mass.** Atomic mass ≈ 3R / specific heat; measuring a metal's specific heat therefore gives its equivalent/atomic mass — the classic experiment.",
      "**Compounds (Kopp's rule).** For a compound the molecular heat capacity is the sum of the atomic contributions, letting unknown element masses be estimated from measured C.",
      "**Limitations.** The law fails at low temperatures — C falls toward zero as T³ (Debye) for metals and much faster for diamond/beryllium; quantum statistics, not classical, explains the falloff.",
      "**Exam angle.** Typical questions: state the law with its value, deduce atomic mass from specific heat, or name the solids that obey it least at low temperature.",
    ],
  },
  // ── nepali/sahitya-adhyayan (numeric prefixes — no Devanagari literals) ──
  {
    file: "class-11-notes/nepali/sahitya-adhyayan/concepts/03-",
    notes: [
      "**व्यङ्ग्यको परिभाषा।** व्यङ्ग्य भनेको कुनै विषय, व्यक्ति वा समाजको दोष, कुरीति र विसंगतिलाई हास्य, व्यंग्य र चुटीलो शैलीमार्फत चित्रण गर्ने साहित्यिक विधा हो; यसको मूल उद्देश्य त्रुटि सुधार नै हो।",
      "**उद्देश्य।** व्यङ्ग्यको मकसद हँसाउनु मात्र होइन — समाजमा व्याप्त बुराइको पोषक उद्देश्यपूर्ण आलोचना गरी सुधारको सन्देश दिनु हो।",
      "**प्रमुख विशेषता।** हास्यात्मकता, अतिशयोक्ति, यथार्थपरक चित्रण, चुटीलो संवाद, शैलीगत खरानी र विषयवस्तुको विद्रोही स्वर व्यङ्ग्यका पहिचान हुन्।",
      "**नेपाली व्यङ्ग्यका उदाहरण।** लक्ष्मीप्रसाद देवकोटाको 'लक्ष्मीनिबन्ध' नेपाली व्यङ्ग्य साहित्यको उत्कृष्ट नमुना मानिन्छ; यसरी व्यङ्ग्य विधाले आफ्नै विशिष्ट स्थान कायम गरेको छ।",
      "**परीक्षाको दृष्टिकोण।** प्रश्न प्रायः 'व्यङ्ग्यको परिभाषा, विशेषता र उदाहरणसहित व्याख्या गर्नुहोस्' वा 'दिइएको अंशबाट व्यङ्ग्यको पहिचान गर्नुहोस्' जस्तो आउँछ।",
    ],
  },
  {
    file: "class-11-notes/nepali/sahitya-adhyayan/concepts/04-",
    notes: [
      "**आधुनिक युगको सुरुवात।** वि.सं. २००७ सालको क्रान्तिपछि प्रजातन्त्र स्थापना भएपछि नेपाली साहित्यमा आधुनिक चेतना, यथार्थवाद र वैज्ञानिक दृष्टिकोणको विकास भयो — यहीँदेखि आधुनिक नेपाली साहित्यको गणना हुन्छ।",
      "**प्रतिकूल युग।** राना शासनकालको विरोधमा लिखित साहित्यलाई प्रतिकूल युग भनिन्छ; देवकोटाको 'प्रतिकूल' र 'आमा' जस्ता रचनाहरू यसै अवधिका उल्लेखनीय उदाहरण हुन्।",
      "**छायावाद।** भावप्रधानता, प्रकृति प्रेम र मनोवैज्ञानिक अभिव्यक्तिमा आधारित यो धाराका प्रवर्तकहरूमा मानिन्द्र प्रसाद आचार्य र सिद्धिदास महर्जन प्रमुख छन्।",
      "**अभिव्यक्तिवाद र प्रगतिवाद।** अभिव्यक्तिवादले व्यक्तिगत अनुभव र अन्तर्दृष्टिलाई प्राधान्य दिन्छ भने प्रगतिवादले समाज, यथार्थ र परिवर्तनलाई केन्द्रमा राख्छ।",
      "**महत्त्व।** आधुनिक युगदेखि नेपाली साहित्य विषयवस्तु, शैली, भाषा र विधाका दृष्टिले वैविध्यपूर्ण भई उपन्यास, कविता, नाटक, आलोचना तथा यात्रावृत्त जस्ता विधाहरू विकसित भए।",
    ],
  },
  {
    file: "class-11-notes/nepali/sahitya-adhyayan/concepts/05-",
    notes: [
      "**निबन्धको परिभाषा।** निबन्ध कुनै एउटा विषयमा लेखकको विचार, भाव र अनुभवलाई योजनाबद्ध रूपमा प्रस्तुत गर्ने गद्य विधा हो; यो शब्द फ्रान्सेली 'essai' (प्रयास) बाट बनेको मानिन्छ।",
      "**निबन्धका प्रकार।** विचारात्मक, वर्णनात्मक, भावात्मक (व्यक्तिगत), औपन्यासिक र विश्लेषणात्मक — यी निबन्धका प्रमुख प्रकारहरू हुन्।",
      "**लेखन चरण।** विषय छनोट → खरानी तयारी → आकर्षक भूमिका → तर्क र उदाहरणसहित शरीर → सारगर्भित निष्कर्ष, यो क्रम अपनाइन्छ।",
      "**भाषा र शैली।** सरल, प्रवाहमय र प्रभावकारी भाषा, उचित शीर्षक, सन्तुलित अनुच्छेद, सानो वाक्य र शब्दसीमाको पालना राम्रो निबन्धका गुण हुन्।",
      "**परीक्षाको दृष्टिकोण।** निबन्धका प्रश्न ६–१० अङ्कका हुन्छन्; परिभाषा, प्रकार, गुण र उपयुक्त उदाहरणसहित विषयलाई विस्तार गरेमा पूरै अङ्क प्राप्त हुन्छ।",
    ],
  },
];

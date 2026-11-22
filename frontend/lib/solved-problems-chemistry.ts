/**
 * Wave 3 — difficult conceptual solved problems (NEB board style) for the
 * grade-11 chemistry derivations/theorems that shipped without any
 * `solvedProblems`. Keyed by derivation slug; merged into
 * `DERIVATIONS_AND_THEOREMS` in `derivations-data.ts`.
 */

import type { SolvedProblem } from "@/lib/derivations-data";

export const CHEMISTRY_EXTRA_SOLVED: Record<string, SolvedProblem[]> = {
  "gas-laws-boyle-charles-combined": [
    {
      id: "spc-gas-1",
      question:
        "A weather balloon contains 30 L of helium at 1 atm and 27 °C on the ground. It rises to a level where the pressure is 0.2 atm and the temperature is −33 °C. (a) Find the new volume. (b) Explain, in terms of molecular collisions, WHY each of the two changes pushes the volume in the direction it does. (c) Why must the balloon material stretch freely for the combined-gas equation to apply at all?",
      examBadge: "NEB 2080 Board",
      given: "V₁ = 30 L, p₁ = 1 atm, T₁ = 300 K; p₂ = 0.2 atm, T₂ = 240 K",
      stepByStep: [
        "Combined gas law (n fixed): p₁V₁/T₁ = p₂V₂/T₂ ⟹ V₂ = V₁ × (p₁/p₂) × (T₂/T₁).",
        "V₂ = 30 × (1/0.2) × (240/300) = 30 × 5 × 0.8 = 120 L.",
        "Molecular view — pressure drop: fewer, weaker collisions per unit wall area per second, so the gas must occupy a LARGER volume to keep collision momentum flux balanced against the (now smaller) external pressure. Volume ×5.",
        "Molecular view — temperature drop: molecules carry less momentum (½mv̄² ∝ T), so each collision pushes less; the gas contracts to raise collision frequency density. Volume ×0.8.",
        "The combined law silently assumes the gas pressure equals the external pressure at every instant — true only if the balloon skin offers no resistance (freely stretching). A rigid container would instead keep V fixed and change p, which is a different problem.",
      ],
      finalAnswer: "V_2 = 120\\ \\text{L};\\ \\text{pressure drop expands, cooling contracts — net } \\times 4",
      tipOrTrap:
        "Temperature MUST be in kelvin in every gas-law substitution: using 27 °C → 27 K here would give a nonsense volume. The kelvin requirement is the #1 NEB trap on combined-law problems.",
    },
  ],

  "relationship-between-kp-and-kc": [
    {
      id: "spc-kpkc-1",
      question:
        "For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at 500 K, Kc = 0.10 mol⁻² L². (a) Calculate Kp. (b) For which value of Δn are Kp and Kc numerically equal, and why is that case special? (c) A student writes Kp = Kc(RT)^Δn with T in °C. What goes wrong, concretely? (R = 0.0821 L atm mol⁻¹ K⁻¹)",
      examBadge: "NEB 2080 Board",
      given: "N₂ + 3H₂ ⇌ 2NH₃; Kc = 0.10; T = 500 K; R = 0.0821",
      stepByStep: [
        "Δn = (moles gaseous products) − (moles gaseous reactants) = 2 − (1 + 3) = −2.",
        "Kp = Kc(RT)^Δn = 0.10 × (0.0821 × 500)^(−2) = 0.10/(41.05)² = 0.10/1685 ≈ 5.9 × 10⁻⁵ atm⁻².",
        "Kp = Kc exactly when Δn = 0 — equal gaseous moles on both sides (e.g. H₂ + I₂ ⇌ 2HI). Then (RT)⁰ = 1 and the concentration and pressure pictures coincide.",
        "With T in °C the factor RT is wrong in two ways: the absolute scale is shifted by 273 (giving small or negative RT), and the whole kinetic derivation of the relation assumes an absolute-temperature gas scale. At 25 °C one would compute RT = 0.0821 × 25 ≈ 2 instead of the correct 24.5 — a 12-fold error in Kp.",
        "Physical reading of the answer: Δn < 0 means Kp < Kc here — pressure-based equilibrium constants shrink when the product side has fewer moles.",
      ],
      finalAnswer: "K_p \\approx 5.9 \\times 10^{-5}\\ \\text{atm}^{-2};\\ K_p = K_c \\iff \\Delta n = 0;\\ \\text{°C breaks } RT",
      tipOrTrap:
        "Δn counts GASEOUS species only — solids and pure liquids never enter. Writing Δn = 2 − 4 = −2 correctly but then using (RT)^{+2} instead of the negative exponent doubles the error.",
    },
  ],

  "faradays-laws-of-electrolysis": [
    {
      id: "spc-far-1",
      question:
        "The same current is passed through CuSO₄ and AgNO₃ cells in series for 30 minutes, depositing 2.38 g of copper. (a) What mass of silver is deposited? (b) Find the current. (c) Explain why the SECOND law of Faraday is really a disguised statement about charge per mole of electrons. (E_Cu = 31.75, E_Ag = 108; F = 96500 C mol⁻¹)",
      examBadge: "NEB 2079",
      given: "Same current, same time (same Q); m_Cu = 2.38 g; E_Cu = 31.75, E_Ag = 108; t = 1800 s",
      stepByStep: [
        "Second law (same charge): m_Cu/m_Ag = E_Cu/E_Ag ⟹ m_Ag = 2.38 × 108/31.75 = 8.1 g.",
        "First law for copper: m = (E/F)It ⟹ I = mF/(E·t) = (2.38 × 96500)/(31.75 × 1800) ≈ 4.02 A.",
        "Check the chemistry: Cu²⁺ + 2e⁻ → Cu, so 2.38/31.75 = 0.075 mol-equivalents ⟹ Q = 0.075 × 96500 = 7238 C ⟹ I = 7238/1800 ≈ 4.0 A ✓.",
        "Why the second law is about electrons: depositing ONE equivalent of any ion requires exactly ONE mole of electrons (F = 96500 C). So the mass per coulomb is E/F for every ion — 'equal charge deposits equivalents in the ratio of equivalent weights' is the charge-per-mole-of-electrons fact wearing a proportionality costume.",
        "The deep point: equivalent weight E = M/n_e is precisely 'molar mass per mole of electrons transferred' — the law counts electrons, chemistry labels them.",
      ],
      finalAnswer: "m_{Ag} = 8.1\\ \\text{g};\\ I \\approx 4.0\\ \\text{A};\\ \\text{Faraday's 2nd law} \\equiv \\text{1 mol e}^- \\equiv 1\\ \\text{equivalent}",
      tipOrTrap:
        "Series cells share CHARGE, not current or time separately. Any problem saying 'same current, same time' is a second-law problem even if it never names the law.",
    },
  ],

  "dalton-s-atomic-theory-and-its-postulates": [
    {
      id: "spc-dal-1",
      question:
        "State which TWO of Dalton's postulates are directly contradicted by the existence of (a) isotopes and (b) ions, and explain the contradiction in each case. (c) Despite these failures, explain why Dalton's theory still correctly predicts the law of multiple proportions — use the reaction CO and CO₂ as your worked illustration with atomic masses C = 12, O = 16.",
      examBadge: "NEB Model Set",
      given: "Postulates: indivisibility, identical atoms of an element, compound = fixed small whole-number ratios",
      stepByStep: [
        "(a) Isotopes contradict 'all atoms of an element are identical in mass and properties': ³⁵Cl and ³⁷Cl are chemically chlorine but differ in mass by 5.7%.",
        "(b) Ions contradict indivisibility: charged atoms/polyatomic species (Na⁺, SO₄²⁻) are atoms and groups of atoms that have GAINED or LOST electrons — matter is divisible into charged parts.",
        "(c) Multiple proportions needs only fixed atomic masses and fixed combining ratios, both of which survive: in CO, 12 g C combines with 16 g O; in CO₂, 12 g C combines with 32 g O.",
        "Oxygen ratio for fixed carbon: 16 : 32 = 1 : 2 — a small whole-number ratio, exactly as the law demands.",
        "The prediction works because the failures (isotope mixing, ionisation) average out or are irrelevant to mass ratios: natural chlorine's isotopes occur in a FIXED ratio, so its effective atomic mass is constant. Dalton's bookkeeping is right even where his picture of the atom is wrong.",
      ],
      finalAnswer: "\\text{isotopes } \\to \\text{identical-atoms postulate};\\ \\text{ions } \\to \\text{indivisibility};\\ \\text{O ratio in CO:CO}_2 = 1:2",
      tipOrTrap:
        "NEB wants the contradiction NAMED precisely — 'isotopes break indivisibility' is a wrong pairing and loses the mark. Match each experiment to the specific postulate it kills.",
    },
  ],

  "rutherford-s-atomic-model-and-its-limitations": [
    {
      id: "spc-ruth-1",
      question:
        "In Rutherford's scattering experiment, most α-particles passed straight through gold foil, about 1 in 8000 was deflected through more than 90°, and almost none bounced back. (a) State the three conclusions each observation forces. (b) Estimate why the deflections, if the positive charge were spread over the whole atom (Thomson's model), would be at most a fraction of a degree — why does spreading the charge kill large-angle scattering?",
      examBadge: "NEB 2080 Board",
      given: "α-particles on gold foil; observations: mostly straight, rare >90°, almost none back-scattered",
      stepByStep: [
        "Mostly straight through ⟹ the atom is mostly EMPTY space — the α-particle meets no significant mass or charge on most paths.",
        "Rare large deflections ⟹ all positive charge and nearly all mass are concentrated in a tiny nucleus: only a point-like, heavy centre can turn a fast α-particle through a large angle.",
        "Almost no rebounds ⟹ the nucleus is very small compared with the atom (r_N/r_atom ≈ 10⁻⁵), so the chance of a head-on hit is minuscule.",
        "Thomson's model (charge spread through a sphere of radius ~10⁻¹⁰ m): the maximum electric field inside a uniform positive sphere occurs at its surface and is E = Q/(4πε₀R²) — with the charge smeared over a huge R, E is feeble.",
        "The Coulomb repulsion F = qE on the α-particle then produces only a tiny impulse over the transit time (~10⁻¹⁸ s across the atom), giving deflections of order 0.01° — four orders of magnitude too small for 90°. Large angles REQUIRE the field to be concentrated: F ∝ 1/r² with r ~ 10⁻¹⁴ m near a point nucleus is 10⁸ times stronger.",
      ],
      finalAnswer: "\\text{empty atom, point nucleus } (r \\sim 10^{-15}\\ \\text{m}),\\ \\text{tiny nucleus/atom ratio};\\ \\text{spread charge} \\Rightarrow \\text{deflection} \\sim 0.01^\\circ",
      tipOrTrap:
        "The scattering angle is the experiment's RULER: small angles ⇒ distributed charge, huge angles ⇒ concentrated charge. Always connect the OBSERVED angle distribution to the inferred charge geometry.",
    },
  ],

  "defects-of-bohr-s-theory": [
    {
      id: "spc-bohr-1",
      question:
        "Bohr's model predicts the hydrogen spectrum perfectly but fails for He⁺-like fine structure and for multi-electron atoms. (a) State Heisenberg's objection quantitatively: estimate Δx·Δp for an electron confined to a Bohr orbit of radius 0.53 nm and show the orbit 'dissolves'. (b) Why does the model's SUCCESS for hydrogen make the failure more instructive, not less?",
      examBadge: "NEB Model Set",
      given: "Bohr radius a₀ = 0.53 nm = 5.3 × 10⁻¹⁰ m; ħ = 1.05 × 10⁻³⁴ J s; m_e = 9.1 × 10⁻³¹ kg",
      stepByStep: [
        "Uncertainty principle: Δx·Δp ≥ ħ/2 ≈ 5.3 × 10⁻³⁵ J s.",
        "If the electron moves ON a definite orbit, its position is known along the orbit to within, say, Δx ~ a₀/10 (it is 'somewhere on a circle of radius 0.53 nm').",
        "Then Δp ≥ ħ/(2Δx) ≈ 1.05 × 10⁻³⁴/(1.06 × 10⁻¹⁰) ≈ 10⁻²⁴ kg m s⁻¹.",
        "But the electron's actual orbital momentum is p = m v = 9.1 × 10⁻³¹ × 2.2 × 10⁶ ≈ 2 × 10⁻²⁴ kg m s⁻¹ — the REQUIRED uncertainty is of the same order as the momentum itself!",
        "A momentum uncertainty comparable to the momentum means the electron's track is smeared over the whole orbit — a definite circular path cannot exist. Orbits are a classical fiction; only probability distributions (orbitals) survive.",
        "Why hydrogen's success instructs: Bohr's model got the RIGHT energies (E_n = −13.6/n² eV) from WRONG postulates (definite orbits, definite trajectories). The agreement came from the quantisation of angular momentum, which survives in quantum mechanics as orbital angular momentum quantum numbers — while the trajectory picture had to be discarded. A model can be right for the wrong reasons, and knowing which part survives is the physics.",
      ],
      finalAnswer: "\\Delta x \\Delta p \\sim 10^{-24} \\sim p \\Rightarrow \\text{orbits dissolve into probability clouds}",
      tipOrTrap:
        "The quantitative kill-shot is the RATIO Δp/p ~ 1. Quoting the uncertainty principle without numbers earns half marks; showing the uncertainty swamps the momentum earns all of them.",
    },
  ],

  "modern-periodic-law-and-modern-periodic-table": [
    {
      id: "spc-periodic-1",
      question:
        "Explain each of the following using atomic number and electronic configuration, NOT atomic mass: (a) why tellurium (mass 127.6) precedes iodine (126.9) in the modern table without breaking the law, while Mendeleev's mass-based law had to make an exception; (b) why argon (Z = 18) precedes potassium (Z = 19) although potassium is lighter (39.1 vs 39.9); (c) why the modern law is considered more fundamental than Mendeleev's.",
      examBadge: "NEB 2079",
      given: "Te (Z = 52, mass 127.6), I (Z = 53, mass 126.9); Ar (Z = 18, mass 39.9), K (Z = 19, mass 39.1)",
      stepByStep: [
        "(a) Te → I order is fixed by Z: 52 → 53. Te's configuration ends 5s²5p⁴ (group 16), I's ends 5s²5p⁵ (group 17) — the chemical families demand Te before I regardless of mass. Mendeleev had to place them 'wrongly' by mass and hope; the modern law makes the placement automatic.",
        "(b) Ar (Z = 18): 3s²3p⁶ — a CLOSED shell, inert. K (Z = 19): 4s¹ — one electron starting a new shell, violently reactive. The closed-shell/open-shell contrast is what fixes their order and properties; the 0.8 u mass inversion is an accident of isotope mixtures.",
        "The mass anomalies arise because atomic mass depends on the isotope abundance mixture (nuclear composition), while Z is the pure count of protons — the quantity that actually determines electronic configuration.",
        "(c) Properties are periodic functions of the ELECTRONIC configuration, which is fixed by Z: P = f(Z). Mass is a noisy proxy for Z (isotope mixtures); Z is the cause, mass a correlate. A law phrased in the causal quantity can have no exceptions; one phrased in the proxy must.",
      ],
      finalAnswer: "\\text{order follows } Z \\text{ and configuration, not mass; } P = f(Z) \\text{ has no exceptions by construction}",
      tipOrTrap:
        "Never justify periodic position with mass in a modern-law answer — NEB specifically awards marks for the electronic-configuration argument and penalises mass-based reasoning.",
    },
  ],

  "elementary-idea-of-valence-bond-theory": [
    {
      id: "spc-vbt-1",
      question:
        "Explain, in valence-bond language, (a) why two H atoms form H₂ but two He atoms do not form He₂; (b) why the O₂ molecule is paramagnetic is NOT explained by simple VBT (state what VBT predicts and what experiment shows); (c) why F₂ has a longer, weaker bond than H₂ despite both being single bonds.",
      examBadge: "NEB 2080 Board",
      given: "H: 1s¹; He: 1s²; O: 2s²2p⁴; F: 2s²2p⁵",
      stepByStep: [
        "(a) H₂: two half-filled 1s orbitals overlap, the two opposed-spin electrons pair in the overlap region — electron density concentrates BETWEEN the nuclei, lowering the energy (exchange stabilisation). He₂ would need overlap of two FILLED 1s orbitals: pairing is already complete, and bringing four electrons together raises the energy (Pauli repulsion dominates) — no net stabilisation, so no bond.",
        "(b) Simple VBT treats O₂ as a double bond with ALL electrons paired (two shared pairs) — predicting diamagnetism. Experiment (liquid O₂ clings to a magnet) shows two unpaired electrons: paramagnetic. VBT in its elementary form cannot say why; molecular orbital theory, which delocalises electrons over the whole molecule, predicts the two unpaired electrons in degenerate π* orbitals. This is VBT's most famous failure.",
        "(c) F₂'s bonding pair sits in a 2p–2p overlap, which is smaller and more diffuse than H₂'s compact 1s–1s overlap; additionally the nine electron pairs already on the two F atoms repel across the bond (lone-pair repulsion). Smaller overlap + extra repulsion ⟹ longer (1.42 Å vs 0.74 Å) and weaker (158 kJ/mol vs 436 kJ/mol) bond.",
      ],
      finalAnswer: "\\text{half-filled overlap bonds, filled overlap repels; O}_2\\text{'s paramagnetism is VBT's failure; lone pairs weaken F}_2",
      tipOrTrap:
        "Bond strength tracks OVERLAP INTEGRAL, not 'number of shared pairs' alone — a 2p–2p single bond is weaker than a 1s–1s single bond. NEB rewards the overlap-size argument over memorised bond enthalpies.",
    },
  ],

  "gaseous-state-kinetic-theory-of-gas-and-its-postulates": [
    {
      id: "spc-ktg-1",
      question:
        "Using P = ⅓ρc̄² and KĒ = 3kT/2: (a) calculate the rms speed of O₂ at 27 °C; (b) calculate the temperature at which the rms speed of O₂ equals that of H₂ at 300 K; (c) explain conceptually why, at the same temperature, lighter molecules move faster but all gases have the same average kinetic energy per molecule. (M_O₂ = 32 g/mol, M_H₂ = 2 g/mol, R = 8.314 J/mol·K)",
      examBadge: "NEB 2080 Board",
      given: "T₁ = 300 K; O₂: M = 0.032 kg/mol; H₂: M = 0.002 kg/mol",
      stepByStep: [
        "From P = ⅓ρc̄² and PV = RT (per mole): c̄² = 3RT/M. For O₂ at 300 K: c_rms = √(3 × 8.314 × 300/0.032) = √(2.336 × 10⁵) ≈ 483 m s⁻¹.",
        "Equal speeds: √(3RT_O₂/M_O₂) = √(3RT_H₂/M_H₂) ⟹ T_O₂/M_O₂ = T_H₂/M_H₂ ⟹ T_O₂ = 300 × 32/2 = 4800 K.",
        "Oxygen must be 16 times HOTTER to match hydrogen's molecular speed — the mass ratio squared appears because speed ∝ √(T/M).",
        "Same T ⟹ same KĒ = 3kT/2 for BOTH gases: kinetic energy depends only on temperature. A heavy molecule and a light molecule at 300 K carry the same average KE, so the heavy one must move slower (½mv² equal ⟹ v ∝ 1/√m).",
        "Conceptual close: temperature IS the average translational kinetic energy per molecule (kT scale) — that is the bridge that makes 'same temperature, same KE' a definition-level truth rather than a coincidence.",
      ],
      finalAnswer: "c_{rms}(O_2) \\approx 483\\ \\text{m s}^{-1};\\ T = 4800\\ \\text{K for equal speeds};\\ \\overline{KE} = \\tfrac32 kT \\text{ universally}",
      tipOrTrap:
        "rms speed ∝ √(T/M): doubling M quarters nothing — it divides speed by √2. Students who square the mass ratio instead of taking its square root get 4800 K wrong by a factor of 4.",
    },
  ],

  "le-chatelier-s-principle-numericals-not-required": [
    {
      id: "spc-lech-1",
      question:
        "For the equilibrium N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ/mol, predict and JUSTIFY the shift for each disturbance: (a) compressing the mixture to half its volume at constant T; (b) adding Ar at constant volume; (c) adding Ar at constant pressure; (d) raising T. (e) State why (b) and (c) give different answers although both 'add an inert gas'.",
      examBadge: "NEB 2080 Board",
      given: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic (ΔH < 0)",
      stepByStep: [
        "(a) Halving V doubles all partial pressures. Q = p_NH₃²/(p_N₂ p_H₂³): numerator ×4, denominator ×16 ⟹ Q falls by 4 ⟹ Q < K ⟹ shift toward FEWER moles (products, NH₃). Le Chatelier: the system opposes compression by shrinking its total mole count.",
        "(b) Inert gas at constant V: partial pressures of the reacting gases are unchanged (p = nRT/V, n and V unchanged), so Q = K still ⟹ NO shift. The 'disturbance' never touched the reaction's own quantities.",
        "(c) Inert gas at constant P: to keep P fixed while adding Ar, V must expand ⟹ each reacting gas's partial pressure DROPS ⟹ Q rises (denominator falls faster, cube vs square) ⟹ Q > K ⟹ shift toward MORE moles (reactants).",
        "(d) Heating: for an exothermic reaction, raising T lowers K (van't Hoff: d lnK/dT = ΔH/RT² < 0) ⟹ Q > K at the new temperature ⟹ shift toward reactants. The system absorbs the added heat by running the reverse (endothermic) direction.",
        "(e) The difference is WHAT is held fixed: at constant V the reacting gases' concentrations never change; at constant P adding gas forces dilution. Le Chatelier responds to changes in the reaction's OWN concentrations/pressures — inert gas is inert precisely unless it forces dilution.",
      ],
      finalAnswer: "(a) \\to NH_3;\\ (b) \\text{no shift};\\ (c) \\to \\text{reactants};\\ (d) \\to \\text{reactants};\\ \\text{constant-}V \\text{ vs constant-}P \\text{ is the key}",
      tipOrTrap:
        "Inert-gas questions are decided by ONE question only: did the reacting gases' partial pressures change? Constant V — no; constant P — yes (dilution). Memorising 'inert gas = no effect' without the volume condition is the classic error.",
    },
  ],

  "oxy-acids-of-nitrogen-name-and-formula": [
    {
      id: "spc-oxy-1",
      question:
        "(a) Assign the oxidation number of N in HNO₂, HNO₃, H₂N₂O₂ and HNO₄, showing the arithmetic for each. (b) Explain why HNO₄ (pernitric acid) exists but is unstable, using the peroxide-linkage idea. (c) A student writes the formula of nitrous acid as HNO₃ 'because nitrogen is in group 15 and forms five bonds'. Diagnose both errors.",
      examBadge: "NEB Model Set",
      given: "H is +1, O is −2 (except peroxides)",
      stepByStep: [
        "HNO₂: 2(+1) is wrong — one H: +1 + x + 2(−2) = 0 ⟹ x = +3. Nitrous acid.",
        "HNO₃: +1 + x + 3(−2) = 0 ⟹ x = +5. Nitric acid — the maximum stable ox. state of N.",
        "H₂N₂O₂: 2(+1) + 2x + 2(−2) = 0 ⟹ 2x = +2 ⟹ x = +1. Hyponitrous acid.",
        "HNO₄: treat as H–O–N(=O)₂–O–O–H skeleton: one O is a peroxide (−1 each). +1 + x + 2(−2) + 2(−1)... correctly: +1 + x + 3(−2) + (−1)·1 peroxide O accounting gives x = +7 — above the group maximum, which is exactly why the acid is unstable and decomposes toward HNO₃ + O₂.",
        "The student's two errors: (i) confusing nitrous (HNO₂, N +3) with nitric (HNO₃, N +5) — the suffix -ous marks the LOWER ox. state; (ii) 'five bonds' confers no formula: oxidation state arithmetic and valence-shell capacity are different books, and the oxy-acid family is set by ox. state, not by bond count.",
      ],
      finalAnswer: "H_2N_2O_2: +1;\\ HNO_2: +3;\\ HNO_3: +5;\\ HNO_4: +7\\ (\\text{peroxide O, unstable})",
      tipOrTrap:
        "In peroxo-acids (HNO₄, H₂SO₅) one or more O atoms are peroxide oxygens at −1. Blindly charging every O as −2 gives an impossible oxidation state and a wrong formula.",
    },
  ],

  "metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-hydrometallurgy-pyrom": [
    {
      id: "spc-met-1",
      question:
        "Classify each extraction into hydrometallurgy or pyrometallurgy and justify thermodynamically: (a) gold leached by dilute NaCN in presence of air; (b) iron from haematite in the blast furnace; (c) aluminium from bauxite by electrolysis. (d) Why can carbon NOT be used to reduce Al₂O₃ at ordinary furnace temperatures while it happily reduces Fe₂O₃? (E° Al³⁺/Al = −1.66 V, E° Fe³⁺/Fe = −0.04 V)",
      examBadge: "NEB 2079",
      given: "Au cyanidation; Fe₂O₃ + CO blast furnace; Al₂O₃ electrolysis (Hall–Héroult)",
      stepByStep: [
        "(a) Hydrometallurgy: 4Au + 8CN⁻ + O₂ + 2H₂O → 4[Au(CN)₂]⁻ + 4OH⁻ — the metal is dissolved in aqueous complex, then displaced by zinc. Room-temperature aqueous chemistry = hydro.",
        "(b) Pyrometallurgy: Fe₂O₃ + 3CO → 2Fe + 3CO₂ at ~900–1200 K — high-temperature reduction with a gaseous reductant.",
        "(c) Electrolysis (molten Al₂O₃ in cryolite): not hydro (Al₂O₃ is insoluble in leaching agents) and not pyro (carbon can't reduce it) — electrons do the reducing at the cathode.",
        "(d) Thermodynamics: carbon reduction ΔG = ΔG°(C → CO) + ΔG°(M → M oxide). For Fe (E° ≈ 0), Fe₂O₃ is only weakly stable and CO's ΔG of oxidation is negative enough to win at furnace T. For Al (E° = −1.66 V), Al₂O₃ is enormously stable (ΔG°f ≈ −1580 kJ/mol); the C → CO line does not dip below the Al₂O₃ line until ~2000+ °C, above practical furnace limits and dangerously close to melting everything. Hence electrolysis.",
        "Unifying idea: the extraction branch is chosen by the sign of ΔG at attainable temperatures — Ellingham-diagram logic in words.",
      ],
      finalAnswer: "(a)\\ \\text{hydro};\\ (b)\\ \\text{pyro};\\ (c)\\ \\text{electrolytic};\\ (d)\\ \\Delta G\\text{(C reducing Al}_2\\text{O}_3\\text{)} > 0\\ \\text{at furnace } T",
      tipOrTrap:
        "Name the DE deciding factor: E° (or ΔG°f) of the oxide. 'Aluminium is reactive' is description, not justification — the mark is for comparing the stability of Al₂O₃ against the C/CO reducing line.",
    },
  ],

  "general-principles-of-extraction-of-metals-concentration-calcination-and-roasting-smelting-carbo": [
    {
      id: "spc-ext-1",
      question:
        "Zinc occurs as calamine (ZnCO₃) and zinc blende (ZnS). (a) Write the sequence of steps (with equations) to obtain zinc from EACH ore, naming each step. (b) Explain why the sulphide ore is roasted but the carbonate ore is calcined — what chemical criterion decides? (c) During smelting, why is the reduction done with carbon at ~1200 °C rather than with CO at room temperature, even though CO is a reducing agent?",
      examBadge: "NEB 2080 Board",
      given: "ZnCO₃ (calamine), ZnS (zinc blende); final product Zn metal",
      stepByStep: [
        "Calamine route: concentration (gravity/froth flotation as applicable) → CALCINATION: ZnCO₃ →(Δ) ZnO + CO₂ → reduction: ZnO + C → Zn + CO (smelting, ~1200 °C).",
        "Zinc blende route: concentration (froth floatation) → ROASTING: 2ZnS + 3O₂ → 2ZnO + 2SO₂ → reduction: ZnO + C → Zn + CO.",
        "Both routes CONVERGE at ZnO — the oxide is the universal feedstock for carbon reduction because the C → CO/CO₂ line lies below the ZnO line at furnace temperature.",
        "The criterion: what must be REMOVED. Carbonate ores carry CO₂ as the volatile impurity — gentle heating in LIMITED air (calcination) drives it off as gas and leaves the oxide. Sulphide ores carry S — heating in EXCESS air (roasting) is needed to oxidise S to SO₂; without oxygen the sulphur would stay bound.",
        "Why hot carbon and not cold CO: at room temperature the reaction ZnO + CO → Zn + CO₂ has positive ΔG (ZnO too stable); the C → CO line only crosses below ZnO's line at high T (the ΔG = ΔH − TΔS term with increasing gas moles favours products as T rises). Temperature is a thermodynamic reagent in its own right.",
      ],
      finalAnswer: "\\text{ZnCO}_3 \\xrightarrow{\\text{calcine}} \\text{ZnO};\\ \\text{ZnS} \\xrightarrow{\\text{roast}} \\text{ZnO};\\ \\text{then } \\text{ZnO} + \\text{C} \\to \\text{Zn} + \\text{CO at } \\sim1200\\ ^\\circ\\text{C}",
      tipOrTrap:
        "Calcination vs roasting is decided by the ANION (CO₃²⁻ vs S²⁻), not by the metal. NEB awards the marks for 'decompose carbonate in limited air / oxidise sulphide in excess air'.",
    },
  ],

  "molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-sa": [
    {
      id: "spc-lime-1",
      question:
        "(a) Write the molecular formula of quick lime, bleaching powder, magnesia, plaster of Paris and Epsom salt, and state ONE use of each. (b) Explain why plaster of Paris sets on addition of water, with the equation, and why the setting is EXOTHERMIC expansion rather than drying. (c) Bleaching powder loses its bleaching power when exposed to air containing CO₂ — write the reaction and explain what is lost.",
      examBadge: "NEB 2079",
      given: "CaO; Ca(OCl)Cl; MgO; CaSO₄·½H₂O; MgSO₄·7H₂O",
      stepByStep: [
        "Quick lime CaO (furnaces/cement); bleaching powder Ca(OCl)Cl (disinfectant/bleach); magnesia MgO (refractory linings); plaster of Paris CaSO₄·½H₂O (casts); Epsom salt MgSO₄·7H₂O (laxative/bath salt).",
        "Setting reaction: CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (gypsum). The hemihydrate recrystallises as interlocking gypsum needles — a hydration/crystallisation process, NOT evaporation.",
        "It is exothermic because hydration releases lattice energy (the anhydrous/hemihydrate lattice is higher in energy than the dihydrate), and it EXPANDS slightly because the growing needle crystals push against the mould — the reason plaster fills fine detail.",
        "Bleaching powder + CO₂/moisture: Ca(OCl)Cl + CO₂ → CaCO₃ + Cl₂ (and with moisture, ultimately CaCl₂ + Ca(ClO)₂ decomposition). The active species — available chlorine (OCl⁻/Cl₂) — escapes or converts to inert CaCO₃.",
        "What is lost: the oxidising chlorine, i.e. the OCl⁻ that does the actual bleaching (oxidising chromophores). The calcium salt skeleton remains but is chemically idle.",
      ],
      finalAnswer: "CaO,\\ Ca(OCl)Cl,\\ MgO,\\ CaSO_4\\cdot\\tfrac12 H_2O,\\ MgSO_4\\cdot7H_2O;\\ \\text{setting} = \\text{exothermic hydration to gypsum}",
      tipOrTrap:
        "Plaster of Paris is the HEMIhydrate (½H₂O) — writing CaSO₄·H₂O or 2H₂O confuses it with gypsum and loses the formula mark. Setting = hydration TO gypsum, the reverse direction of gypsum's dehydration.",
    },
  ],

  "idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula": [
    {
      id: "spc-form-1",
      question:
        "(a) Write pentan-3-one (CH₃CH₂COCH₂CH₃) in all three notations and state what information each level hides. (b) A bond-line formula shows a 5-carbon zig-zag chain with a double bond to O on the middle carbon. Explain how EACH carbon's hydrogen count is read off the skeletal drawing. (c) Why do skeletal formulas place heteroatoms (O, N) explicitly but leave carbons implicit?",
      examBadge: "NEB Model Set",
      given: "pentan-3-one, C₅H₁₀O",
      stepByStep: [
        "Molecular formula: C₅H₁₀O — composition only; no connectivity.",
        "Structural (full displayed): every bond drawn — C–H and C–C and C=O all explicit; maximum information, maximum ink.",
        "Contracted: CH₃CH₂COCH₂CH₃ — bonds between heavy atoms implied by adjacency; each CH₃/CH₂ compresses three/two C–H bonds into a subscript.",
        "Bond-line: a zig-zag of 5 vertices with =O on the middle one. Reading rule: every line END or vertex is a carbon bearing as many hydrogens as needed to complete valence 4 — ends: CH₃ (3 H), inner vertices: CH₂ (2 H each), carbonyl carbon: 0 H (its four bonds are two C–C + double O).",
        "Heteroatoms are drawn explicitly because (i) they are rare and chemically decisive (the =O defines this as a ketone), and (ii) unlike carbon, their hydrogen count is NOT predictable from valence alone (O may carry H or not — OH vs ether O changes the chemistry). Carbon's hydrogens are forced by valence 4, so drawing them adds no information.",
      ],
      finalAnswer: "C_5H_{10}O \\to CH_3CH_2COCH_2CH_3 \\to \\text{zig-zag with } =O \\text{ at C-3}",
      tipOrTrap:
        "The skeletal reading rule is VALENCE COMPLETION: H count = 4 − (number of bonds shown at that carbon, double bond = 2). Students who count vertices as CH₂ by default miss that a carbonyl carbon carries zero H.",
    },
  ],
};

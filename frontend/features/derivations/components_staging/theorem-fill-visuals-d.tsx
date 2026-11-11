"use client";

/**
 * Theorem Fill visuals — Module D: Chemistry 2 (kinetics → metallurgy) + Faraday.
 */

import type { ReactNode } from "react";

export function renderTheoremFillVisualD(type: string, showAnnotations: boolean): ReactNode | null {
  switch (type) {
    case "tv-rate-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Generic reaction + rate law */}
          <text x="350" y="40" fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle">aA + bB → products · Rate = k[A]ᵐ[B]ⁿ (m, n = experimental)</text>
          {/* Concentration decay curves */}
          <g transform="translate(80, 70)">
            <line x1="0" y1="200" x2="260" y2="200" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="200" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="235" y="218" fill="#94a3b8" fontSize="10">time</text>
            <text x="-12" y="20" fill="#94a3b8" fontSize="10">[A]</text>
            {/* zero order */}
            <line x1="0" y1="40" x2="200" y2="200" stroke="#10b981" strokeWidth="2.5" />
            <text x="120" y="46" fill="#10b981" fontSize="9.5" fontWeight="bold">zero order (linear)</text>
            {/* first order */}
            <path d="M 0 40 Q 80 120 200 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="120" y="86" fill="#38bdf8" fontSize="9.5" fontWeight="bold">first order (exponential)</text>
            {/* second order */}
            <path d="M 0 40 Q 50 170 190 196" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="128" y="150" fill="#ef4444" fontSize="9.5" fontWeight="bold">second order</text>
            {/* half-life ticks */}
            <line x1="90" y1="200" x2="90" y2="120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="94" y="116" fill="#f59e0b" fontSize="9">t½ (1st): constant!</text>
          </g>
          {/* Orders table */}
          <g transform="translate(400, 60)">
            <rect x="0" y="0" width="260" height="230" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="24" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Order toolkit</text>
            <text x="14" y="48" fill="#e2e8f0" fontSize="9.5">Zero: rate = k · t½ = [A]₀/2k · [A] linear vs t</text>
            <text x="14" y="70" fill="#e2e8f0" fontSize="9.5">First: ln[A] vs t slope −k · t½ = 0.693/k</text>
            <text x="14" y="92" fill="#e2e8f0" fontSize="9.5">Second: 1/[A] vs t slope +k · t½ = 1/k[A]₀</text>
            <line x1="14" y1="108" x2="246" y2="108" stroke="#334155" strokeWidth="1" />
            <text x="14" y="130" fill="#38bdf8" fontSize="9.5">Initial-rates: double [A] → rate ×2ᵐ</text>
            <text x="14" y="152" fill="#a855f7" fontSize="9.5">Units of k: M¹⁻ⁿ s⁻¹ (zero M s⁻¹, first s⁻¹)</text>
            <text x="14" y="174" fill="#10b981" fontSize="9.5">k = A·e^(−Ea/RT) — Arrhenius links to T</text>
            <text x="14" y="198" fill="#94a3b8" fontSize="9">order ≠ stoichiometry (elementary only)</text>
            <text x="14" y="218" fill="#94a3b8" fontSize="9">pseudo-first-order: flood one reagent</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="80" y="312" width="580" height="38" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="96" y="330" fill="#38bdf8" fontSize="10" fontWeight="bold">Molecularity (mechanism step) vs order (overall) — slow step controls the rate law.</text>
              <text x="96" y="344" fill="#94a3b8" fontSize="9">SN1: rate = k[RX] (unimolecular) · SN2: rate = k[RX][Nu⁻] — measured, not guessed.</text>
            </g>
          )}
        </svg>
      );

    case "tv-arrhenius-equation":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Exponential k vs T */}
          <g transform="translate(80, 60)">
            <line x1="0" y1="220" x2="280" y2="220" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="220" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="250" y="238" fill="#94a3b8" fontSize="10">T</text>
            <text x="-16" y="22" fill="#94a3b8" fontSize="10">k</text>
            <path d="M 0 214 Q 120 208 180 160 Q 240 100 275 25" fill="none" stroke="#10b981" strokeWidth="3" />
            <text x="180" y="70" fill="#10b981" fontSize="10" fontWeight="bold">k rises exponentially</text>
            <text x="150" y="90" fill="#94a3b8" fontSize="9">≈ doubling per 10 K rise</text>
            <line x1="120" y1="220" x2="120" y2="205" stroke="#f59e0b" strokeWidth="2" />
            <text x="86" y="242" fill="#f59e0b" fontSize="9">T₁</text>
            <line x1="200" y1="220" x2="200" y2="132" stroke="#f59e0b" strokeWidth="2" />
            <text x="192" y="256" fill="#f59e0b" fontSize="9">T₂</text>
          </g>
          {/* Arrhenius plot */}
          <g transform="translate(420, 50)">
            <line x1="0" y1="210" x2="240" y2="210" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="210" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="200" y="228" fill="#94a3b8" fontSize="10">1/T</text>
            <text x="-30" y="22" fill="#94a3b8" fontSize="10">ln k</text>
            <line x1="10" y1="30" x2="230" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
            {[[30,34],[75,70],[120,110],[165,148],[210,182]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3.5" fill="#38bdf8" />))}
            <text x="60" y="80" fill="#38bdf8" fontSize="9.5" fontWeight="bold">slope = −Ea/R</text>
            <text x="24" y="200" fill="#a855f7" fontSize="9.5">intercept = ln A</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="80" y="270" width="580" height="80" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="96" y="294" fill="#f59e0b" fontSize="11.5" fontWeight="bold">k = A·e^(−Ea/RT) · ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)</text>
              <text x="96" y="318" fill="#e2e8f0" fontSize="9.5">A = frequency factor (orientation + collision rate) · e^(−Ea/RT) = Boltzmann fraction above the barrier</text>
              <text x="96" y="340" fill="#94a3b8" fontSize="9">higher Ea ⇒ steeper slope ⇒ stronger T sensitivity · catalyst lowers Ea: same A, bigger k · units of Ea: kJ/mol</text>
            </g>
          )}
        </svg>
      );

    case "tv-huckel-rule":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Benzene */}
          <g transform="translate(90, 110)">
            <circle cx="70" cy="70" r="58" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="70" cy="70" r="34" fill="#fbbf24" fillOpacity="0.25" stroke="#fbbf24" strokeWidth="2" />
            <text x="70" y="76" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">6π</text>
            <text x="70" y="160" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">benzene (6)</text>
            <text x="70" y="178" fill="#10b981" fontSize="9.5" textAnchor="middle">4n+2 ✓ aromatic</text>
          </g>
          {/* Cyclopentadienyl */}
          <g transform="translate(270, 110)">
            <circle cx="70" cy="70" r="58" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="70" cy="70" r="34" fill="#fbbf24" fillOpacity="0.25" stroke="#fbbf24" strokeWidth="2" />
            <text x="70" y="76" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">6π</text>
            <text x="70" y="160" fill="#a855f7" fontSize="10.5" fontWeight="bold" textAnchor="middle">C₅H₅⁻ (6)</text>
            <text x="70" y="178" fill="#10b981" fontSize="9.5" textAnchor="middle">✓ (−charge = 2 π e⁻)</text>
          </g>
          {/* Anti vs non */}
          <g transform="translate(450, 100)">
            <circle cx="60" cy="50" r="44" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="60" cy="50" r="24" fill="#ef4444" fillOpacity="0.2" />
            <text x="60" y="55" fill="#fecaca" fontSize="10" fontWeight="bold" textAnchor="middle">4π</text>
            <text x="60" y="112" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">cyclobutadiene (4)</text>
            <text x="60" y="130" fill="#ef4444" fontSize="9.5" textAnchor="middle">4n ✗ ANTI-aromatic</text>
            <circle cx="190" cy="50" r="44" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="190" y="112" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">cyclooctatetraene (8)</text>
            <text x="190" y="130" fill="#94a3b8" fontSize="9.5" textAnchor="middle">4n but NON-planar → non-aromatic</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="90" y="278" width="560" height="70" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="106" y="300" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Hückel: cyclic · planar · fully conjugated · (4n+2) π electrons ⇒ aromatic</text>
              <text x="106" y="322" fill="#e2e8f0" fontSize="9.5">n = 0,1,2 → 2, 6, 10 π · examples: naphthalene (10), anthracene (14), pyrrole/pyridine (6), cyclopropenyl cation (2)</text>
              <text x="106" y="340" fill="#94a3b8" fontSize="9">aromaticity ⇒ extra stability, equal bonds, substitution over addition, ring currents (NMR)</text>
            </g>
          )}
        </svg>
      );

    case "tv-structural-formulas":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <text x="350" y="36" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">C₂H₆O — one formula, two different worlds</text>
          {/* Ethanol */}
          <g transform="translate(80, 60)">
            <rect x="0" y="0" width="230" height="180" rx="10" fill="#0b1220" stroke="#10b981" strokeWidth="2" />
            <text x="115" y="28" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Ethanol CH₃–CH₂–OH</text>
            <text x="115" y="58" fill="#e2e8f0" fontSize="10" textAnchor="middle">H H</text>
            <text x="115" y="74" fill="#e2e8f0" fontSize="10" textAnchor="middle">| |</text>
            <text x="115" y="90" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">H–C–C–O–H</text>
            <text x="115" y="106" fill="#e2e8f0" fontSize="10" textAnchor="middle">| |</text>
            <text x="115" y="122" fill="#e2e8f0" fontSize="10" textAnchor="middle">H H</text>
            <text x="115" y="152" fill="#94a3b8" fontSize="9.5" textAnchor="middle">b.p. 78°C · miscible with water</text>
            <text x="115" y="168" fill="#10b981" fontSize="9.5" textAnchor="middle">—OH hydrogen bonds</text>
          </g>
          {/* Dimethyl ether */}
          <g transform="translate(390, 60)">
            <rect x="0" y="0" width="230" height="180" rx="10" fill="#0b1220" stroke="#ef4444" strokeWidth="2" />
            <text x="115" y="28" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Dimethyl ether CH₃–O–CH₃</text>
            <text x="115" y="70" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">H₃C–O–CH₃</text>
            <text x="115" y="94" fill="#e2e8f0" fontSize="10" textAnchor="middle">(no O–H bond at all)</text>
            <text x="115" y="130" fill="#94a3b8" fontSize="9.5" textAnchor="middle">b.p. −24°C · gas at room T</text>
            <text x="115" y="152" fill="#ef4444" fontSize="9.5" textAnchor="middle">same MF, same mass — different bonding</text>
            <text x="115" y="168" fill="#ef4444" fontSize="9.5" textAnchor="middle">⇒ structural formula is the identity</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="80" y="262" width="560" height="86" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="96" y="284" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Progression: molecular (counts) → structural (connectivity) → condensed (CH₃CH₂OH) → line-angle</text>
              <text x="96" y="306" fill="#e2e8f0" fontSize="9.5">chain isomerism (butane/isobutane) · position (1-/2-) · functional (ethanol/dimethyl ether)</text>
              <text x="96" y="328" fill="#94a3b8" fontSize="9">carbon is ALWAYS tetravalent — expand every condensed formula and every bond count must check out (4 per C)</text>
            </g>
          )}
        </svg>
      );

    case "tv-solution-types":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Solubility curve */}
          <g transform="translate(70, 55)">
            <line x1="0" y1="210" x2="280" y2="210" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="210" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="240" y="228" fill="#94a3b8" fontSize="10">T →</text>
            <text x="-24" y="20" fill="#94a3b8" fontSize="10">solubility</text>
            <line x1="10" y1="180" x2="260" y2="30" stroke="#10b981" strokeWidth="2.5" />
            <text x="150" y="70" fill="#10b981" fontSize="9.5" fontWeight="bold">KNO₃ (steep ↑)</text>
            <line x1="10" y1="150" x2="260" y2="110" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="170" y="140" fill="#38bdf8" fontSize="9.5">NaCl (gentle ↑)</text>
            <path d="M 10 60 Q 100 150 260 190" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="120" y="130" fill="#ef4444" fontSize="9.5">Ce₂(SO₄)₃ (↓ — exothermic)</text>
          </g>
          {/* Saturated card */}
          <g transform="translate(410, 55)">
            <rect x="0" y="0" width="250" height="220" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="26" fill="#f59e0b" fontSize="10.5" fontWeight="bold">States of a solution</text>
            <text x="14" y="52" fill="#10b981" fontSize="9.5">unsaturated: more can dissolve</text>
            <text x="14" y="76" fill="#38bdf8" fontSize="9.5">saturated: ⇌ dynamic with solid</text>
            <text x="14" y="100" fill="#a855f7" fontSize="9.5">supersaturated: metastable excess</text>
            <text x="14" y="124" fill="#94a3b8" fontSize="9.5">(seed crystal → instant crystallisation)</text>
            <line x1="14" y1="140" x2="236" y2="140" stroke="#334155" strokeWidth="1" />
            <text x="14" y="164" fill="#e2e8f0" fontSize="9.5">Henry: S ∝ P (soda fizzes when opened)</text>
            <text x="14" y="188" fill="#e2e8f0" fontSize="9.5">colligative: ΔTb = Kb·m · ΔTf = Kf·m</text>
            <text x="14" y="208" fill="#94a3b8" fontSize="9.5">i = van't Hoff factor (electrolytes)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="292" width="590" height="56" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="86" y="312" fill="#38bdf8" fontSize="10" fontWeight="bold">"like dissolves like": polar–polar, non-polar–non-polar · hydration energy vs lattice energy decides</text>
              <text x="86" y="332" fill="#94a3b8" fontSize="9">molarity (per L solution, T-dependent) vs molality (per kg solvent, T-safe) — molality for colligative work.</text>
            </g>
          )}
        </svg>
      );

    case "tv-extraction-principles":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Flow: ore → concentration → reduction → refining */}
          <g transform="translate(50, 45)">
            <rect x="0" y="0" width="150" height="80" rx="10" fill="#0b1220" stroke="#f59e0b" strokeWidth="2" />
            <text x="75" y="30" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">ORE (mineral)</text>
            <text x="75" y="52" fill="#e2e8f0" fontSize="9" textAnchor="middle">bauxite · haematite</text>
            <text x="75" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">galena · malachite</text>
            <line x1="150" y1="40" x2="195" y2="40" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
            <rect x="200" y="0" width="150" height="80" rx="10" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
            <text x="275" y="26" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">CONCENTRATION</text>
            <text x="275" y="48" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">gravity · magnetic ·</text>
            <text x="275" y="62" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">froth flotation · leaching</text>
            <line x1="350" y1="40" x2="395" y2="40" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
            <rect x="400" y="0" width="210" height="80" rx="10" fill="#0b1220" stroke="#ef4444" strokeWidth="2" />
            <text x="505" y="26" fill="#ef4444" fontSize="10.5" fontWeight="bold" textAnchor="middle">EXTRACTION OF METAL</text>
            <text x="505" y="48" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">calcination/roasting → reduction</text>
            <text x="505" y="62" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">(C, CO, Al, H₂, electrolysis)</text>
            <line x1="505" y1="80" x2="505" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
            <rect x="400" y="125" width="210" height="70" rx="10" fill="#0b1220" stroke="#10b981" strokeWidth="2" />
            <text x="505" y="150" fill="#10b981" fontSize="10.5" fontWeight="bold" textAnchor="middle">REFINING</text>
            <text x="505" y="172" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">distillation · liquation ·</text>
            <text x="505" y="186" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">electrolytic · zone refining · vapour phase</text>
          </g>
          {/* Ellingham-style reactivity ladder */}
          <g transform="translate(60, 240)">
            <text x="0" y="0" fill="#e2e8f0" fontSize="10.5" fontWeight="bold">Activity ladder (who reduces whom):</text>
            <text x="0" y="26" fill="#ef4444" fontSize="10" fontWeight="bold">K Na Ca Mg Al</text>
            <text x="150" y="26" fill="#f59e0b" fontSize="10">Zn Fe Pb</text>
            <text x="260" y="26" fill="#38bdf8" fontSize="10">Cu Hg Ag</text>
            <text x="360" y="26" fill="#a855f7" fontSize="10">Au Pt</text>
            <text x="0" y="52" fill="#94a3b8" fontSize="9">electrolysis needed</text>
            <text x="150" y="52" fill="#94a3b8" fontSize="9">carbon reduction (blast furnace)</text>
            <text x="360" y="52" fill="#94a3b8" fontSize="9">native / heat alone</text>
            <text x="0" y="76" fill="#10b981" fontSize="9.5">highly reactive oxides are TOO stable for C — that's why Al needs molten electrolysis</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="380" y="240" width="290" height="110" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
              <text x="394" y="262" fill="#a855f7" fontSize="10" fontWeight="bold">Thermodynamic driver: ΔG = ΔH − TΔS</text>
              <text x="394" y="284" fill="#e2e8f0" fontSize="9">C + [O] → CO: ΔS &gt; 0 ⇒ line falls with T</text>
              <text x="394" y="304" fill="#e2e8f0" fontSize="9">lower ΔG line reduces the higher one</text>
              <text x="394" y="330" fill="#94a3b8" fontSize="9">froth flotation: sulphide ores + pine oil;</text>
              <text x="394" y="346" fill="#94a3b8" fontSize="9">leaching: Au with NaCN (macArthur-Forrest)</text>
            </g>
          )}
        </svg>
      );

    case "tv-metallurgy-types":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <text x="350" y="36" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">Concentration methods matched to ore type</text>
          {[
            ["Gravity / hydraulic wash", "oxide + carbonate ores, density difference (SnO₂, haematite)", "#38bdf8"],
            ["Froth flotation", "SULPHIDE ores (galena, chalcopyrite) — pine oil, xanthates, froth carries sulphide", "#10b981"],
            ["Magnetic separation", "magnetic ores: magnetite Fe₃O₄ vs sand — drum magnet splits stream", "#ef4444"],
            ["Leaching (chemical)", "Au/Ag with NaCN; Al from bauxite with hot NaOH (Bayer) → Al(OH)₄⁻", "#a855f7"],
          ].map(([t, d, c], i) => (
            <g key={t} transform={`translate(70, ${60 + i * 62})`}>
              <rect x="0" y="0" width="560" height="52" rx="8" fill="#0b1220" stroke={c} strokeWidth="1.5" />
              <text x="14" y="22" fill={c} fontSize="10.5" fontWeight="bold">{t}</text>
              <text x="14" y="40" fill="#e2e8f0" fontSize="9">{d}</text>
            </g>
          ))}
          {showAnnotations && (
            <g>
              <rect x="70" y="312" width="560" height="38" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="86" y="330" fill="#f59e0b" fontSize="10" fontWeight="bold">Goal: raise the metal fraction BEFORE spending energy on reduction.</text>
              <text x="86" y="344" fill="#94a3b8" fontSize="9">gangue/flux → slag: CaO + SiO₂ → CaSiO₃ (blast furnace) — flux is chosen to oppose the gangue.</text>
            </g>
          )}
        </svg>
      );

    case "tv-oxyacids-nitrogen":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Oxidation ladder */}
          <g transform="translate(60, 50)">
            <text x="80" y="0" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N's oxyacid ladder</text>
            {[["+5", "HNO₃", "nitric · oxidising · yellow if NO₂ dissolved", "#ef4444"],
              ["+3", "HNO₂", "nitrous · BOTH oxidant & reductant (middle)", "#f59e0b"],
              ["+1", "HNO / H₂N₂O₂", "hyponitrous · unstable", "#94a3b8"]].map(([n, f, d, c], i) => (
              <g key={n} transform={`translate(0, ${16 + i * 66})`}>
                <rect x="0" y="0" width="340" height="54" rx="8" fill="#0b1220" stroke={c} strokeWidth="1.5" />
                <text x="14" y="24" fill={c} fontSize="12" fontWeight="bold">{n}</text>
                <text x="58" y="24" fill="#e2e8f0" fontSize="10.5" fontWeight="bold">{f}</text>
                <text x="14" y="42" fill="#94a3b8" fontSize="9">{d}</text>
              </g>
            ))}
          </g>
          {/* HNO3 structure + facts */}
          <g transform="translate(450, 55)">
            <text x="60" y="20" fill="#ef4444" fontSize="10.5" fontWeight="bold" textAnchor="middle">HNO₃: planar N</text>
            <text x="60" y="46" fill="#e2e8f0" fontSize="11" textAnchor="middle">HO–N(=O)=O</text>
            <text x="60" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle">(N: +5, sp², resonance-stabilised)</text>
            <line x1="0" y1="84" x2="230" y2="84" stroke="#334155" strokeWidth="1" />
            <text x="14" y="108" fill="#38bdf8" fontSize="9.5">dilute + Cu → NO</text>
            <text x="14" y="130" fill="#38bdf8" fontSize="9.5">conc. + Cu → NO₂ (brown)</text>
            <text x="14" y="152" fill="#38bdf8" fontSize="9.5">+ Zn (very dil.) → N₂O</text>
            <text x="14" y="180" fill="#f59e0b" fontSize="9.5">passivates Al, Fe, Cr</text>
            <text x="14" y="202" fill="#10b981" fontSize="9.5">aqua regia: 3 HCl : 1 HNO₃ dissolves Au</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="60" y="286" width="580" height="60" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="76" y="308" fill="#f59e0b" fontSize="10" fontWeight="bold">Oxyacid strength grows with O count AND central-atom electronegativity.</text>
              <text x="76" y="328" fill="#94a3b8" fontSize="9">O.N. = group val usually (N: max +5) · lower oxyacids disproportionate: 3HNO₂ → HNO₃ + 2NO + H₂O.</text>
            </g>
          )}
        </svg>
      );

    case "tv-thiosulphate":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Structure */}
          <g transform="translate(70, 55)">
            <rect x="0" y="0" width="300" height="150" rx="10" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
            <text x="150" y="28" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">S₂O₃²⁻: thiosulphate ("thio" = S replaces one O)</text>
            <text x="150" y="66" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">⁻O–S(=O)₂–S⁻</text>
            <text x="150" y="94" fill="#94a3b8" fontSize="9" textAnchor="middle">central S: +5 · terminal (sulphane) S: −1</text>
            <text x="150" y="116" fill="#94a3b8" fontSize="9" textAnchor="middle">average = +2 · tetrahedral, sp³</text>
            <text x="150" y="136" fill="#a855f7" fontSize="9" textAnchor="middle"> analogue of SO₄²⁻ with one O → S swap</text>
          </g>
          {/* Iodometry reaction */}
          <g transform="translate(430, 55)">
            <rect x="0" y="0" width="240" height="150" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="2" />
            <text x="120" y="26" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Iodometry workhorse:</text>
            <text x="120" y="56" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻</text>
            <text x="120" y="84" fill="#94a3b8" fontSize="9" textAnchor="middle">brown I₂ fades to colourless —</text>
            <text x="120" y="102" fill="#94a3b8" fontSize="9" textAnchor="middle">end point with starch = blue-black → gone</text>
            <text x="120" y="130" fill="#fbbf24" fontSize="9" textAnchor="middle">tetrathionate: the −1 S's couple (0)</text>
          </g>
          {/* Uses */}
          <g transform="translate(70, 235)">
            {[
              ["Antichlor", "removes excess Cl₂ after bleaching: S₂O₃²⁻ + 4Cl₂ + 5H₂O → 2SO₄²⁻ + 8Cl⁻ + 10H⁺", "#38bdf8"],
              ["Photography fixer", "dissolves unreacted AgBr as [Ag(S₂O₃)₂]³⁻ (hypo)", "#a855f7"],
              ["Chlorine estimation", "quantitative titration against standard iodine", "#10b981"],
            ].map(([t, d, c], i) => (
              <g key={t} transform={`translate(0, ${i * 38})`}>
                <rect x="0" y="0" width="600" height="32" rx="6" fill="#0b1220" stroke={c} strokeWidth="1.2" />
                <text x="12" y="20" fill={c} fontSize="9.5" fontWeight="bold">{t}</text>
                <text x="150" y="20" fill="#e2e8f0" fontSize="9">{d}</text>
              </g>
            ))}
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="332" width="600" height="20" rx="6" fill="#0f172a" fillOpacity="0.92" />
              <text x="86" y="346" fill="#94a3b8" fontSize="9">decomposes in acid: S₂O₃²⁻ + 2H⁺ → S↓ + SO₂↑ + H₂O (milky sulphur test).</text>
            </g>
          )}
        </svg>
      );

    case "tv-werner-cft":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Octahedral splitting */}
          <g transform="translate(60, 60)">
            <text x="90" y="0" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Octahedral d-splitting</text>
            <line x1="0" y1="100" x2="180" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="-8" y="104" fill="#94a3b8" fontSize="9" textAnchor="end">d (barycentre)</text>
            <line x1="30" y1="34" x2="150" y2="34" stroke="#ef4444" strokeWidth="2.5" />
            <text x="160" y="38" fill="#ef4444" fontSize="9.5">e_g (dz², dx²−y²) +0.6Δ₀</text>
            <line x1="30" y1="160" x2="150" y2="160" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="160" y="164" fill="#38bdf8" fontSize="9.5">t₂g (dxy, dyz, dxz) −0.4Δ₀</text>
            <text x="90" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">ligands approach along axes → repel axial d's</text>
          </g>
          {/* Strong vs weak field */}
          <g transform="translate(400, 55)">
            <rect x="0" y="0" width="250" height="230" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="24" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Spectrochemical series</text>
            <text x="14" y="48" fill="#ef4444" fontSize="9.5" fontWeight="bold">I⁻ &lt; Br⁻ &lt; SCN⁻ &lt; Cl⁻ &lt; F⁻ &lt; OH⁻</text>
            <text x="14" y="70" fill="#f59e0b" fontSize="9.5" fontWeight="bold">&lt; H₂O &lt; NH₃ &lt; en &lt; CN⁻ ≈ CO</text>
            <text x="14" y="98" fill="#10b981" fontSize="9.5" fontWeight="bold">strong field (CN⁻): LOW SPIN</text>
            <text x="14" y="118" fill="#e2e8f0" fontSize="9">Δ₀ &gt; P → pair up in t₂g first (d⁶: t₂g⁶)</text>
            <text x="14" y="146" fill="#38bdf8" fontSize="9.5" fontWeight="bold">weak field (H₂O): HIGH SPIN</text>
            <text x="14" y="166" fill="#e2e8f0" fontSize="9">Δ₀ &lt; P → fill e_g before pairing (d⁶: t₂g⁴e_g²)</text>
            <text x="14" y="194" fill="#a855f7" fontSize="9">CFSE = colour, magnetism, stability</text>
            <text x="14" y="216" fill="#94a3b8" fontSize="9">d⁰, d¹⁰ → colourless (no transition)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="60" y="300" width="590" height="48" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="76" y="320" fill="#38bdf8" fontSize="10" fontWeight="bold">Werner: primary (ionic) vs secondary (coordination) valence — [Co(NH₃)₆]Cl₃ gives 3 Cl⁻.</text>
              <text x="76" y="340" fill="#94a3b8" fontSize="9">CN = 4 (sp³ tetra / dsp² square-planar) · CN = 6 (d²sp³ inner / sp³d² outer orbital).</text>
            </g>
          )}
        </svg>
      );

    case "tv-industrial-compounds":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {[
            ["Contact process — H₂SO₄", "S + O₂ → SO₂; 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, 1–2 atm, ~450°C); SO₃ + H₂SO₄ → H₂S₂O₇ +H₂O", "#ef4444"],
            ["Haber process — NH₃", "N₂ + 3H₂ ⇌ 2NH₃ (Fe catalyst, K₂O/Al₂O₃ promoters, ~450°C, 200 atm) — Le Chatelier compromise", "#38bdf8"],
            ["Ostwald process — HNO₃", "4NH₃ + 5O₂ → 4NO + 6H₂O (Pt-Rh, 800°C); NO→NO₂; 3NO₂ + H₂O → 2HNO₃ + NO", "#10b981"],
            ["Solvay process — Na₂CO₃", "NH₃ + CO₂ + H₂O → NH₄HCO₃; + NaCl → NaHCO₃↓; heat → Na₂CO₃ (NH₃ recycled)", "#a855f7"],
          ].map(([t, d, c], i) => (
            <g key={t} transform={`translate(60, ${42 + i * 72})`}>
              <rect x="0" y="0" width="580" height="62" rx="9" fill="#0b1220" stroke={c} strokeWidth="1.5" />
              <text x="14" y="24" fill={c} fontSize="10.5" fontWeight="bold">{t}</text>
              <text x="14" y="46" fill="#e2e8f0" fontSize="8.5">{d}</text>
            </g>
          ))}
          {showAnnotations && (
            <g>
              <rect x="60" y="322" width="580" height="30" rx="7" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="76" y="341" fill="#f59e0b" fontSize="9.5">Every optimisation is thermodynamics vs kinetics: exothermic equilibria ⇒ moderate T (K) + catalyst (rate) + pressure (Δn).</text>
            </g>
          )}
        </svg>
      );

    case "tv-faraday-laws":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Cell */}
          <g transform="translate(70, 55)">
            <rect x="0" y="0" width="240" height="170" rx="10" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
            <text x="120" y="26" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Electrolytic cell</text>
            <rect x="30" y="50" width="14" height="90" rx="3" fill="#ef4444" />
            <rect x="196" y="50" width="14" height="90" rx="3" fill="#10b981" />
            <text x="37" y="158" fill="#ef4444" fontSize="9.5" textAnchor="middle">cathode (−)</text>
            <text x="203" y="158" fill="#10b981" fontSize="9.5" textAnchor="middle">anode (+)</text>
            <path d="M 110 60 A 22 22 0 1 1 109.9 60.01" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
            <text x="120" y="105" fill="#fbbf24" fontSize="9.5" textAnchor="middle">M²⁺ + 2e⁻ → M</text>
            <text x="120" y="125" fill="#94a3b8" fontSize="8.5" textAnchor="middle">1 F = 96,485 C per mole e⁻</text>
          </g>
          {/* Laws card */}
          <g transform="translate(390, 50)">
            <rect x="0" y="0" width="270" height="240" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="2" />
            <text x="14" y="26" fill="#f59e0b" fontSize="10.5" fontWeight="bold">First law: m ∝ Q (charge passed)</text>
            <text x="14" y="52" fill="#38bdf8" fontSize="11" fontWeight="bold">m = (E · Q) / F = Z·I·t</text>
            <text x="14" y="74" fill="#e2e8f0" fontSize="9">E = equivalent mass = M/(n e⁻) · Z = E/F</text>
            <line x1="14" y1="90" x2="256" y2="90" stroke="#334155" strokeWidth="1" />
            <text x="14" y="114" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Second law: same Q through cells →</text>
            <text x="14" y="136" fill="#f59e0b" fontSize="10.5" fontWeight="bold">deposited masses ∝ equivalent masses</text>
            <text x="14" y="160" fill="#e2e8f0" fontSize="9">m₁/m₂ = E₁/E₂ (Ag: E=108; Cu: E=63.5/2)</text>
            <line x1="14" y1="176" x2="256" y2="176" stroke="#334155" strokeWidth="1" />
            <text x="14" y="198" fill="#a855f7" fontSize="9">Q = I·t (t in seconds!) · 1 A·s = 1 C</text>
            <text x="14" y="220" fill="#94a3b8" fontSize="9">n(e⁻) = Q/F bridges to mole ratios</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="312" width="590" height="38" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
              <text x="86" y="330" fill="#10b981" fontSize="10" fontWeight="bold">Worked: 2 A for 965 s → Q = 1930 C → 0.02 mol e⁻ → 0.01 mol Cu = 0.64 g.</text>
              <text x="86" y="344" fill="#94a3b8" fontSize="9">current efficiency: actual/theoretical × 100 — side reactions waste charge.</text>
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
}

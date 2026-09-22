"use client";

/**
 * Theorem Fill visuals — Module C: Chemistry 1 (fundamentals → equilibrium).
 */

import type { ReactNode } from "react";

export function renderTheoremFillVisualC(type: string, showAnnotations: boolean): ReactNode | null {
  switch (type) {
    case "tv-chem-basic-concepts":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Atom → mole bridge */}
          <circle cx="110" cy="100" r="34" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2.5" />
          <circle cx="110" cy="100" r="8" fill="#ef4444" />
          <text x="110" y="155" fill="#fca5a5" fontSize="10" textAnchor="middle">atom (amu scale)</text>
          <circle cx="240" cy="100" r="34" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="240" y="106" fill="#bae6fd" fontSize="10" textAnchor="middle">molecule</text>
          <text x="240" y="155" fill="#93c5fd" fontSize="10" textAnchor="middle">Σ atomic masses</text>
          {/* N_A bridge */}
          <line x1="150" y1="100" x2="200" y2="100" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          <text x="126" y="82" fill="#f59e0b" fontSize="9.5" fontWeight="bold">bond / share</text>
          <line x1="276" y1="100" x2="340" y2="100" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          <text x="286" y="82" fill="#f59e0b" fontSize="9.5" fontWeight="bold">× N_A</text>
          <rect x="345" y="66" width="130" height="70" rx="10" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
          <text x="410" y="96" fill="#a7f3d0" fontSize="14" fontWeight="bold" textAnchor="middle">1 mole</text>
          <text x="410" y="120" fill="#6ee7b7" fontSize="10" textAnchor="middle">= M grams = 6.022×10²³</text>
          {/* amu card */}
          <g transform="translate(505, 50)">
            <rect x="0" y="0" width="175" height="110" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="12" y="24" fill="#f59e0b" fontSize="10.5" fontWeight="bold">1 amu = 1/N_A g</text>
            <text x="12" y="46" fill="#e2e8f0" fontSize="10">= 1.66×10⁻²⁴ g</text>
            <text x="12" y="70" fill="#38bdf8" fontSize="10">standard: C-12 = 12 u</text>
            <text x="12" y="94" fill="#94a3b8" fontSize="9">relative masses: no units</text>
          </g>
          {/* Radical + formula card */}
          <g transform="translate(60, 200)">
            <rect x="0" y="0" width="280" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
            <text x="14" y="24" fill="#a855f7" fontSize="10.5" fontWeight="bold">Radicals act as units:</text>
            <text x="14" y="48" fill="#e2e8f0" fontSize="11">Al₂(SO₄)₃ · Ca(OH)₂ · NH₄⁺</text>
            <text x="14" y="74" fill="#10b981" fontSize="10.5" fontWeight="bold">MF = n × EF:</text>
            <text x="14" y="96" fill="#e2e8f0" fontSize="10.5">n = M(molar) / M(empirical)</text>
            <text x="14" y="118" fill="#94a3b8" fontSize="9">CH₂O ×6 ⇒ C₆H₁₂O₆ (glucose)</text>
          </g>
          <g transform="translate(380, 200)">
            <rect x="0" y="0" width="280" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="14" y="24" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Worked flow:</text>
            <text x="14" y="48" fill="#e2e8f0" fontSize="10">% composition → EF</text>
            <text x="14" y="70" fill="#e2e8f0" fontSize="10">M (vapour density ×2) → n</text>
            <text x="14" y="94" fill="#e2e8f0" fontSize="10">MF = n·EF, verify % again</text>
            <text x="14" y="118" fill="#fbbf24" fontSize="9">hydrates: add waters to M</text>
          </g>
        </svg>
      );

    case "tv-chem-percent-composition":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Compound bar */}
          <text x="350" y="40" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">NH₄NO₃ (M = 80) — fertilizer nitrogen</text>
          <rect x="100" y="70" width="500" height="60" fill="#10b981" fillOpacity="0.35" stroke="#10b981" strokeWidth="2" />
          <text x="350" y="107" fill="#d1fae5" fontSize="12" fontWeight="bold" textAnchor="middle">N: 28/80 = 35%</text>
          <rect x="100" y="130" width="214" height="60" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
          <text x="207" y="167" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">H: 4/80 = 5%</text>
          <rect x="314" y="130" width="286" height="60" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
          <text x="457" y="167" fill="#fecaca" fontSize="11" fontWeight="bold" textAnchor="middle">O: 48/80 = 60%</text>
          <text x="350" y="225" fill="#94a3b8" fontSize="10.5" textAnchor="middle">bars ∝ mass percent — must total 100%</text>
          {showAnnotations && (
            <g>
              <rect x="90" y="250" width="520" height="90" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="106" y="274" fill="#f59e0b" fontSize="11" fontWeight="bold">%X = (a·A_X / M) × 100</text>
              <text x="106" y="298" fill="#e2e8f0" fontSize="10">count EVERY atom of X (2 N here) · hydrates: include waters · ore purity is a second %</text>
              <text x="106" y="322" fill="#94a3b8" fontSize="9.5">reverse route: % → 100 g basis → moles → EF (the same bridge walked backwards)</text>
            </g>
          )}
        </svg>
      );

    case "tv-dalton-theory":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Postulates left */}
          <g transform="translate(50, 40)">
            <rect x="0" y="0" width="270" height="270" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="2" />
            <text x="14" y="26" fill="#38bdf8" fontSize="11.5" fontWeight="bold">Dalton (1808): five postulates</text>
            <text x="14" y="52" fill="#e2e8f0" fontSize="10">1. Matter = indivisible atoms</text>
            <text x="14" y="74" fill="#e2e8f0" fontSize="10">2. Same element ⇒ identical atoms</text>
            <text x="14" y="96" fill="#e2e8f0" fontSize="10">3. Different elements ⇒ different atoms</text>
            <text x="14" y="118" fill="#e2e8f0" fontSize="10">4. Compounds: small whole-number ratios</text>
            <text x="14" y="140" fill="#e2e8f0" fontSize="10">5. Reactions only REARRANGE atoms</text>
            <line x1="14" y1="156" x2="256" y2="156" stroke="#334155" strokeWidth="1.5" />
            <text x="14" y="180" fill="#ef4444" fontSize="9.5">modern fixes: isotopes (2),</text>
            <text x="14" y="198" fill="#ef4444" fontSize="9.5">subatomic particles (1),</text>
            <text x="14" y="216" fill="#ef4444" fontSize="9.5">nuclear reactions (5)</text>
            <text x="14" y="244" fill="#10b981" fontSize="9.5">still true: 3, 4 — and 5 within chemistry</text>
          </g>
          {/* Atom symbols right */}
          <g transform="translate(400, 60)">
            <circle cx="40" cy="40" r="30" fill="#38bdf8" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="40" y="45" fill="#bae6fd" fontSize="11" textAnchor="middle">H</text>
            <circle cx="130" cy="40" r="38" fill="#ef4444" fillOpacity="0.35" stroke="#ef4444" strokeWidth="2.5" />
            <text x="130" y="46" fill="#fecaca" fontSize="12" textAnchor="middle">O</text>
            <text x="85" y="100" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">H₂O = fixed 1:8 by mass</text>
            <text x="85" y="122" fill="#94a3b8" fontSize="9.5" textAnchor="middle">(definite proportions — explained)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="360" y="180" width="310" height="160" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="374" y="204" fill="#f59e0b" fontSize="10.5" fontWeight="bold">What the postulates explain:</text>
              <text x="374" y="228" fill="#e2e8f0" fontSize="10">mass conservation (rearrangement only)</text>
              <text x="374" y="250" fill="#e2e8f0" fontSize="10">definite proportions (fixed formulas)</text>
              <text x="374" y="272" fill="#e2e8f0" fontSize="10">multiple proportions: CO vs CO₂ ⇒ O ratio 1:2</text>
              <text x="374" y="298" fill="#94a3b8" fontSize="9">predictive power made alchemy into science</text>
              <text x="374" y="322" fill="#a855f7" fontSize="9">exceptions: Berthollides Fe₀.₉₅O, isotopes</text>
            </g>
          )}
        </svg>
      );

    case "tv-stoichiometry-laws":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="620" height="300" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#10b981" strokeWidth="2" />
            <text x="16" y="28" fill="#10b981" fontSize="12" fontWeight="bold">The five laws of stoichiometry</text>
            <text x="16" y="56" fill="#e2e8f0" fontSize="10.5">1. Conservation of mass (Lavoisier) — closed system, mass constant</text>
            <text x="16" y="82" fill="#e2e8f0" fontSize="10.5">2. Definite proportions (Proust) — one compound, one mass ratio (H₂O always 1:8)</text>
            <text x="16" y="108" fill="#e2e8f0" fontSize="10.5">3. Multiple proportions (Dalton) — CO : CO₂ oxygen ratio = 1 : 2 (whole numbers)</text>
            <text x="16" y="134" fill="#e2e8f0" fontSize="10.5">4. Reciprocal proportions (Richter) — combining weights chain consistently</text>
            <text x="16" y="160" fill="#e2e8f0" fontSize="10.5">5. Gay-Lussac (gases) — volumes react in simple ratios at same T, P</text>
            <line x1="16" y1="180" x2="604" y2="180" stroke="#334155" strokeWidth="1.5" />
            <text x="16" y="206" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Gas-volume worked example (STP):</text>
            <text x="16" y="230" fill="#fbbf24" fontSize="11" fontWeight="bold">2CO + O₂ → 2CO₂ ⇒ 2 L CO needs 1 L O₂ (coefficient = volume ratio)</text>
            <text x="16" y="258" fill="#94a3b8" fontSize="9.5">law 5 only makes sense with molecules — historically the strongest atom evidence</text>
            <text x="16" y="280" fill="#a855f7" fontSize="9.5">workflow: balance → moles → mole ratio → quantity (limiting reagent caps yield)</text>
          </g>
        </svg>
      );

    case "tv-mole-map":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Central hub */}
          <circle cx="350" cy="180" r="62" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="3.5" />
          <text x="350" y="172" fill="#a7f3d0" fontSize="16" fontWeight="bold" textAnchor="middle">MOLE (n)</text>
          <text x="350" y="196" fill="#6ee7b7" fontSize="9.5" textAnchor="middle">6.022×10²³ units</text>
          {/* Four roads */}
          <line x1="290" y1="150" x2="150" y2="90" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <line x1="410" y1="150" x2="550" y2="90" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <line x1="290" y1="212" x2="150" y2="270" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <line x1="410" y1="212" x2="550" y2="270" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <rect x="30" y="50" width="150" height="54" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="105" y="72" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">MASS m (g)</text>
          <text x="105" y="92" fill="#e2e8f0" fontSize="10" textAnchor="middle">n = m / M</text>
          <rect x="520" y="50" width="150" height="54" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="595" y="72" fill="#ef4444" fontSize="10.5" fontWeight="bold" textAnchor="middle">VOLUME V (gas, STP)</text>
          <text x="595" y="92" fill="#e2e8f0" fontSize="10" textAnchor="middle">n = V / 22.4 L</text>
          <rect x="30" y="256" width="150" height="54" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
          <text x="105" y="278" fill="#a855f7" fontSize="10.5" fontWeight="bold" textAnchor="middle">PARTICLES N</text>
          <text x="105" y="298" fill="#e2e8f0" fontSize="10" textAnchor="middle">N = n × N_A</text>
          <rect x="520" y="256" width="150" height="54" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="595" y="278" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">SOLUTION C·V</text>
          <text x="595" y="298" fill="#e2e8f0" fontSize="10" textAnchor="middle">n = C × V(L)</text>
          {showAnnotations && (
            <g>
              <rect x="230" y="262" width="240" height="80" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="244" y="284" fill="#f59e0b" fontSize="10" fontWeight="bold">4 roads in, same hub:</text>
              <text x="244" y="306" fill="#e2e8f0" fontSize="9.5">equations are MOLE recipes, not grams</text>
              <text x="244" y="326" fill="#94a3b8" fontSize="9">NTP: ~24 L/mol — read conditions!</text>
            </g>
          )}
        </svg>
      );

    case "tv-empirical-formula":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <g transform="translate(50, 35)">
            <rect x="0" y="0" width="600" height="290" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="2" />
            <text x="16" y="28" fill="#f59e0b" fontSize="12" fontWeight="bold">Worked example: 40.0% C, 6.7% H, 53.3% O · M = 180</text>
            <line x1="16" y1="42" x2="584" y2="42" stroke="#334155" strokeWidth="1.5" />
            <text x="16" y="66" fill="#38bdf8" fontSize="10.5">① 100 g basis: C 40 g · H 6.7 g · O 53.3 g</text>
            <text x="16" y="90" fill="#38bdf8" fontSize="10.5">② moles: 40/12=3.33 · 6.7/1=6.7 · 53.3/16=3.33</text>
            <text x="16" y="114" fill="#38bdf8" fontSize="10.5">③ ÷ smallest (3.33): 1 : 2.01 : 1</text>
            <text x="16" y="138" fill="#10b981" fontSize="11" fontWeight="bold">④ EF = CH₂O (mass 30)</text>
            <text x="16" y="164" fill="#a855f7" fontSize="11" fontWeight="bold">⑤ n = 180/30 = 6 ⇒ MF = C₆H₁₂O₆ (glucose)</text>
            <line x1="16" y1="184" x2="584" y2="184" stroke="#334155" strokeWidth="1.5" />
            <text x="16" y="210" fill="#ef4444" fontSize="10" fontWeight="bold">Fraction families: 1.5→×2 · 1.33→×3 · 1.25→×4 · 1.67→×6</text>
            <text x="16" y="234" fill="#94a3b8" fontSize="9.5">oxygen missing? take remainder: 100 − (C + H + …)</text>
            <text x="16" y="258" fill="#94a3b8" fontSize="9.5">combustion data: C → CO₂ (÷44), H → H₂O (×2/18); O by difference</text>
            <text x="16" y="280" fill="#10b981" fontSize="9.5">verify: recompute percentages from your MF — must match</text>
          </g>
        </svg>
      );

    case "tv-rutherford-model":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Foil */}
          <rect x="330" y="60" width="18" height="240" fill="#fbbf24" fillOpacity="0.35" stroke="#fbbf24" strokeWidth="2" />
          <text x="339" y="52" fill="#fbbf24" fontSize="10.5" fontWeight="bold" textAnchor="middle">gold foil</text>
          {/* Alpha source */}
          <rect x="60" y="160" width="60" height="40" rx="6" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
          <text x="90" y="185" fill="#fecaca" fontSize="10" textAnchor="middle">α source</text>
          {/* Straight-through paths (most) */}
          <line x1="120" y1="170" x2="620" y2="170" stroke="#94a3b8" strokeWidth="2" opacity="0.7" />
          <line x1="120" y1="195" x2="620" y2="195" stroke="#94a3b8" strokeWidth="2" opacity="0.7" />
          <text x="520" y="160" fill="#94a3b8" fontSize="9.5">most pass straight — empty space</text>
          {/* Slight deflection */}
          <line x1="120" y1="215" x2="339" y2="215" stroke="#94a3b8" strokeWidth="2" />
          <line x1="339" y1="215" x2="600" y2="255" stroke="#94a3b8" strokeWidth="2" />
          {/* Bounce-back */}
          <line x1="120" y1="150" x2="336" y2="150" stroke="#ef4444" strokeWidth="2.5" />
          <line x1="336" y1="150" x2="150" y2="80" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <text x="170" y="66" fill="#ef4444" fontSize="10" fontWeight="bold">1 in 8000 rebounds &gt;90°!</text>
          {/* Nucleus */}
          <circle cx="339" cy="180" r="9" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="356" y="300" fill="#ef4444" fontSize="10" fontWeight="bold">nucleus: 10⁻¹⁵ m vs atom 10⁻¹⁰ m</text>
          {showAnnotations && (
            <g>
              <rect x="430" y="30" width="250" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="444" y="54" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Nuclear atom (1911):</text>
              <text x="444" y="78" fill="#e2e8f0" fontSize="10">mass + charge concentrated centrally</text>
              <text x="444" y="100" fill="#e2e8f0" fontSize="10">electrons orbit; atom mostly empty</text>
              <text x="444" y="128" fill="#ef4444" fontSize="10" fontWeight="bold">FATAL FLAW (classical):</text>
              <text x="444" y="150" fill="#e2e8f0" fontSize="9.5">accelerating e⁻ must radiate ⇒</text>
              <text x="444" y="168" fill="#e2e8f0" fontSize="9.5">spiral collapse ~10⁻⁸ s + continuous spectrum</text>
            </g>
          )}
        </svg>
      );

    case "tv-bohr-defects":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <g transform="translate(45, 35)">
            <rect x="0" y="0" width="610" height="290" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#ef4444" strokeWidth="2" />
            <text x="16" y="28" fill="#ef4444" fontSize="12" fontWeight="bold">Six standard defects of Bohr's theory</text>
            <text x="16" y="56" fill="#e2e8f0" fontSize="10.5">1. Multi-electron atoms (He onward): e–e repulsion — no clean solution</text>
            <text x="16" y="82" fill="#e2e8f0" fontSize="10.5">2. Fine structure: lines are close doublets (spin–orbit) — single n can't split them</text>
            <text x="16" y="108" fill="#e2e8f0" fontSize="10.5">3. Zeeman (magnetic) / Stark (electric) splitting — no mechanism in the model</text>
            <text x="16" y="134" fill="#e2e8f0" fontSize="10.5">4. Relative intensities of spectral lines unexplained</text>
            <text x="16" y="160" fill="#e2e8f0" fontSize="10.5">5. Violates Heisenberg: exact r AND v ⇒ ΔxΔp = 0 &lt; ℏ/2 — orbits unphysical</text>
            <text x="16" y="186" fill="#e2e8f0" fontSize="10.5">6. No chemical bonding; wave nature of the electron ignored</text>
            <line x1="16" y1="206" x2="594" y2="206" stroke="#334155" strokeWidth="1.5" />
            <text x="16" y="232" fill="#10b981" fontSize="10.5" fontWeight="bold">What survives: energy levels Eₙ = −13.6Z²/n² — exact for H, He⁺, Li²⁺ (1 electron)</text>
            <text x="16" y="258" fill="#38bdf8" fontSize="10">Schrödinger keeps the energies, replaces orbits (paths) with orbitals (probability clouds)</text>
            <text x="16" y="280" fill="#a855f7" fontSize="9.5">de Broglie rescues the spirit: 2πr = nλ standing waves ⇒ mvr = nℏ</text>
          </g>
        </svg>
      );

    case "tv-modern-periodic":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Mini periodic grid */}
          <g transform="translate(60, 50)">
            {Array.from({ length: 7 }).map((_, row) =>
              Array.from({ length: 18 }).map((_, col) => {
                const skip = row === 0 && col > 1 ? true : row === 1 && (col < 12 || col > 13) ? true : false;
                if (skip) return null;
                const isNoble = col === 17;
                const isAlkali = col === 0;
                const fill = isAlkali ? "#ef444422" : isNoble ? "#a855f722" : "#38bdf81a";
                const stroke = isAlkali ? "#ef4444" : isNoble ? "#a855f7" : "#38bdf8";
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 29}
                    y={row * 30}
                    width="25"
                    height="26"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1"
                    opacity="0.85"
                  />
                );
              })
            )}
            <text x="0" y="245" fill="#ef4444" fontSize="9.5" fontWeight="bold">Group 1 (ns¹)</text>
            <text x="300" y="245" fill="#a855f7" fontSize="9.5" fontWeight="bold">Group 18 (ns²np⁶)</text>
          </g>
          {/* Trend arrows */}
          <line x1="120" y1="300" x2="560" y2="300" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-end)" />
          <text x="240" y="292" fill="#10b981" fontSize="10" fontWeight="bold">across: Z_eff ↑ ⇒ size ↓, IE ↑, EA more negative</text>
          {showAnnotations && (
            <g>
              <rect x="430" y="40" width="250" height="160" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="444" y="64" fill="#f59e0b" fontSize="11" fontWeight="bold">Modern law: P = f(Z)</text>
              <text x="444" y="88" fill="#e2e8f0" fontSize="10">Moseley: √ν ∝ Z (X-ray order)</text>
              <text x="444" y="112" fill="#94a3b8" fontSize="9.5">fixes Te/I, Ar/K mass inversions</text>
              <text x="444" y="136" fill="#10b981" fontSize="9.5">down a group: new shells ⇒ size ↑, IE ↓</text>
              <text x="444" y="160" fill="#a855f7" fontSize="9.5">lanthanide contraction: Zr ≈ Hf</text>
              <text x="444" y="184" fill="#38bdf8" fontSize="9.5">18 groups · 7 periods · config-driven</text>
            </g>
          )}
        </svg>
      );

    case "tv-octet-theory":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Ionic route */}
          <g transform="translate(50, 50)">
            <circle cx="50" cy="50" r="28" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2.5" />
            <text x="50" y="55" fill="#fecaca" fontSize="11" textAnchor="middle">Na·</text>
            <line x1="86" y1="50" x2="140" y2="50" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
            <text x="88" y="36" fill="#f59e0b" fontSize="9.5" fontWeight="bold">e⁻ transfer</text>
            <circle cx="180" cy="50" r="28" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="180" y="55" fill="#bae6fd" fontSize="11" textAnchor="middle">·Cl:</text>
            <text x="115" y="100" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Na⁺[2,8] + Cl⁻[2,8,8] → NaCl</text>
            <text x="115" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">lattice energy binds the ions</text>
          </g>
          {/* Covalent route */}
          <g transform="translate(50, 190)">
            <circle cx="60" cy="45" r="26" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="140" cy="45" r="26" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2.5" />
            <rect x="86" y="38" width="28" height="14" rx="4" fill="#fbbf24" fillOpacity="0.5" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="100" y="49" fill="#fff" fontSize="8.5" textAnchor="middle">··</text>
            <text x="100" y="96" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">shared pair counts in BOTH octets</text>
            <text x="100" y="116" fill="#94a3b8" fontSize="9" textAnchor="middle">Cl–Cl, H₂O, CH₄ … double = 2 pairs</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="360" y="50" width="310" height="240" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="374" y="74" fill="#f59e0b" fontSize="11" fontWeight="bold">Octet rule (valence-shell chemistry):</text>
              <text x="374" y="98" fill="#e2e8f0" fontSize="10">goal: ns²np⁶ noble-gas count (duet for H, Li, Be)</text>
              <text x="374" y="122" fill="#10b981" fontSize="10">formula shortcut: cross the charges (Al³⁺, O²⁻ ⇒ Al₂O₃)</text>
              <text x="374" y="150" fill="#ef4444" fontSize="10" fontWeight="bold">Exceptions to know:</text>
              <text x="374" y="172" fill="#e2e8f0" fontSize="10">incomplete octet: BF₃ (B: 6e⁻), BeCl₂ (4e⁻)</text>
              <text x="374" y="194" fill="#e2e8f0" fontSize="10">expanded octet: SF₆ (12), PCl₅ (10) — 3rd period+</text>
              <text x="374" y="216" fill="#e2e8f0" fontSize="10">odd electron: NO, NO₂ (radicals)</text>
              <text x="374" y="244" fill="#94a3b8" fontSize="9.5">2nd-period elements NEVER expand (no d orbitals)</text>
              <text x="374" y="268" fill="#38bdf8" fontSize="9.5">valence = group number (main groups)</text>
            </g>
          )}
        </svg>
      );

    case "tv-vbt":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* s-s overlap H2 */}
          <g transform="translate(60, 70)">
            <circle cx="60" cy="50" r="38" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="120" cy="50" r="38" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="90" cy="50" rx="30" ry="38" fill="#10b981" fillOpacity="0.35" />
            <circle cx="60" cy="50" r="4" fill="#ef4444" />
            <circle cx="120" cy="50" r="4" fill="#ef4444" />
            <text x="90" y="110" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">H₂: s–s σ overlap</text>
            <text x="90" y="128" fill="#94a3b8" fontSize="9" textAnchor="middle">↑↓ paired — bond forms</text>
          </g>
          {/* p-p overlap */}
          <g transform="translate(60, 200)">
            <ellipse cx="55" cy="40" rx="14" ry="34" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="125" cy="40" rx="14" ry="34" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="90" cy="40" rx="22" ry="16" fill="#10b981" fillOpacity="0.4" />
            <text x="90" y="100" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">p–p head-on: σ (strongest)</text>
          </g>
          {/* Energy curve */}
          <g transform="translate(330, 50)">
            <line x1="0" y1="200" x2="300" y2="200" stroke="#64748b" strokeWidth="2" />
            <line x1="40" y1="230" x2="40" y2="10" stroke="#64748b" strokeWidth="2" />
            <path d="M 50 40 Q 100 40 130 140 Q 160 218 200 210 Q 260 200 295 195" fill="none" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="130" cy="140" r="5" fill="#10b981" />
            <text x="140" y="130" fill="#10b981" fontSize="9.5" fontWeight="bold">minimum = bond (74 pm H₂)</text>
            <text x="60" y="30" fill="#94a3b8" fontSize="9">repulsion dominates</text>
            <text x="240" y="185" fill="#94a3b8" fontSize="9">far apart</text>
            <text x="140" y="225" fill="#94a3b8" fontSize="9">internuclear distance →</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="330" y="0" width="350" height="0" />
            </g>
          )}
          {showAnnotations && (
            <g>
              <rect x="360" y="270" width="320" height="80" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="374" y="292" fill="#f59e0b" fontSize="10" fontWeight="bold">VBT essentials:</text>
              <text x="374" y="312" fill="#e2e8f0" fontSize="9.5">half-filled orbital overlap + spin pairing ⇒ bond</text>
              <text x="374" y="330" fill="#e2e8f0" fontSize="9.5">σ &gt; π strength · hybridization sets angles: sp³ 109.5°, H₂O 104.5° (lone pairs)</text>
              <text x="374" y="346" fill="#94a3b8" fontSize="9">N₂ 941 kJ/mol (1σ+2π) — why nitrogen is nearly inert</text>
            </g>
          )}
        </svg>
      );

    case "tv-oxidation-numbers":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="300" height="290" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="2" />
            <text x="14" y="26" fill="#38bdf8" fontSize="11.5" fontWeight="bold">Rules (in priority order)</text>
            <text x="14" y="50" fill="#e2e8f0" fontSize="10">1. Free element = 0 (O₂, Fe)</text>
            <text x="14" y="72" fill="#e2e8f0" fontSize="10">2. Monatomic ion = its charge</text>
            <text x="14" y="94" fill="#e2e8f0" fontSize="10">3. F = −1 always</text>
            <text x="14" y="116" fill="#e2e8f0" fontSize="10">4. Group 1 = +1 · Group 2 = +2</text>
            <text x="14" y="138" fill="#e2e8f0" fontSize="10">5. O = −2 (peroxide −1, OF₂ +2)</text>
            <text x="14" y="160" fill="#e2e8f0" fontSize="10">6. H = +1 (non-metals) / −1 (hydrides)</text>
            <line x1="14" y1="176" x2="286" y2="176" stroke="#334155" strokeWidth="1.5" />
            <text x="14" y="200" fill="#f59e0b" fontSize="11" fontWeight="bold">Σ O.N. = charge of species</text>
            <text x="14" y="226" fill="#10b981" fontSize="10">MnO₄⁻: x + 4(−2) = −1 ⇒ x = +7</text>
            <text x="14" y="252" fill="#a855f7" fontSize="10">Cr₂O₇²⁻: 2x − 14 = −2 ⇒ x = +6</text>
            <text x="14" y="278" fill="#94a3b8" fontSize="9">OIL RIG: oxidation ↑, reduction ↓</text>
          </g>
          {/* Oxidation ladder */}
          <g transform="translate(420, 45)">
            <text x="60" y="0" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Nitrogen's ladder</text>
            {[["+5", "HNO₃", "#ef4444"], ["+3", "HNO₂", "#f59e0b"], ["+2", "NO", "#38bdf8"], ["0", "N₂", "#10b981"], ["−3", "NH₃", "#a855f7"]].map(([n, f, c], i) => (
              <g key={n} transform={`translate(0, ${20 + i * 48})`}>
                <rect x="0" y="0" width="120" height="38" rx="6" fill="none" stroke={c} strokeWidth="2" />
                <text x="18" y="24" fill={c} fontSize="12" fontWeight="bold">{n}</text>
                <text x="58" y="24" fill="#e2e8f0" fontSize="11">{f}</text>
              </g>
            ))}
            <text x="60" y="290" fill="#94a3b8" fontSize="9" textAnchor="middle">disproportionation: 0 → −1 + +1 (Cl₂ in NaOH)</text>
          </g>
        </svg>
      );

    case "tv-kinetic-theory":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Postulates card */}
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="290" height="290" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#10b981" strokeWidth="2" />
            <text x="14" y="26" fill="#10b981" fontSize="11.5" fontWeight="bold">Postulates</text>
            <text x="14" y="50" fill="#e2e8f0" fontSize="10">1. Point molecules (V_mol ≪ V)</text>
            <text x="14" y="72" fill="#e2e8f0" fontSize="10">2. No forces except during collisions</text>
            <text x="14" y="94" fill="#e2e8f0" fontSize="10">3. Collisions elastic (KE conserved)</text>
            <text x="14" y="116" fill="#e2e8f0" fontSize="10">4. Random, isotropic motion</text>
            <text x="14" y="138" fill="#e2e8f0" fontSize="10">5. ⟨KE⟩ ∝ T only</text>
            <line x1="14" y1="156" x2="276" y2="156" stroke="#334155" strokeWidth="1.5" />
            <text x="14" y="180" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Everything follows:</text>
            <text x="14" y="204" fill="#e2e8f0" fontSize="10">Boyle: T fixed ⇒ c̄² fixed ⇒ PV const</text>
            <text x="14" y="228" fill="#e2e8f0" fontSize="10">Graham: rate ∝ 1/√M (effusion)</text>
            <text x="14" y="252" fill="#e2e8f0" fontSize="10">lighter gas ⇒ faster molecules (H₂ escapes)</text>
            <text x="14" y="276" fill="#94a3b8" fontSize="9">deviations appear when postulates 1–2 fail</text>
          </g>
          {/* Pressure formula */}
          <g transform="translate(380, 60)">
            <rect x="0" y="0" width="280" height="220" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="28" fill="#f59e0b" fontSize="11.5" fontWeight="bold">Pressure = momentum flux</text>
            <text x="14" y="58" fill="#e2e8f0" fontSize="11">per hit: Δp = 2mvₓ · Δt = 2l/vₓ</text>
            <text x="14" y="86" fill="#e2e8f0" fontSize="11">F₁ = mvₓ²/l (one molecule)</text>
            <text x="14" y="118" fill="#38bdf8" fontSize="13" fontWeight="bold">P = ⅓ ρ c̄²</text>
            <text x="14" y="146" fill="#10b981" fontSize="11">⟨½mc²⟩ = (3/2)kT</text>
            <text x="14" y="176" fill="#94a3b8" fontSize="9.5">c = √(3P/ρ) = √(3RT/M)</text>
            <text x="14" y="200" fill="#ef4444" fontSize="9.5">use rms speed — ⟨v²⟩, not mean speed</text>
          </g>
          {/* Maxwell curve */}
          <g transform="translate(390, 290)">
            <path d="M 0 40 Q 60 -30 120 12 Q 180 42 260 44" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <path d="M 0 44 Q 80 -10 160 26 Q 220 44 260 45" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 4" />
            <text x="0" y="60" fill="#a855f7" fontSize="9">higher T</text>
            <text x="180" y="60" fill="#64748b" fontSize="9">lower T</text>
            <text x="196" y="60" fill="#94a3b8" fontSize="9">speed →</text>
          </g>
        </svg>
      );

    case "tv-ideal-gas-equation":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Three laws feed in */}
          <g transform="translate(45, 40)">
            <rect x="0" y="0" width="200" height="66" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="26" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Boyle (T const)</text>
            <text x="100" y="48" fill="#e2e8f0" fontSize="11" textAnchor="middle">PV = const</text>
            <rect x="0" y="82" width="200" height="66" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="100" y="108" fill="#10b981" fontSize="10.5" fontWeight="bold" textAnchor="middle">Charles (P const)</text>
            <text x="100" y="130" fill="#e2e8f0" fontSize="11" textAnchor="middle">V ∝ T</text>
            <rect x="0" y="164" width="200" height="66" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
            <text x="100" y="190" fill="#a855f7" fontSize="10.5" fontWeight="bold" textAnchor="middle">Avogadro (P,T const)</text>
            <text x="100" y="212" fill="#e2e8f0" fontSize="11" textAnchor="middle">V ∝ n</text>
          </g>
          {/* Arrows into center */}
          <line x1="250" y1="140" x2="300" y2="165" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          <line x1="250" y1="175" x2="300" y2="175" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          <line x1="250" y1="210" x2="300" y2="185" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          {/* Central equation */}
          <rect x="305" y="130" width="220" height="90" rx="12" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeWidth="3" />
          <text x="415" y="172" fill="#a7f3d0" fontSize="20" fontWeight="bold" textAnchor="middle">PV = nRT</text>
          <text x="415" y="198" fill="#6ee7b7" fontSize="10" textAnchor="middle">the combined gas law</text>
          {/* R values */}
          <g transform="translate(45, 270)">
            <rect x="0" y="0" width="480" height="70" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="24" fill="#f59e0b" fontSize="10.5" fontWeight="bold">R = 8.314 J K⁻¹mol⁻¹ (Pa·m³) · 0.0821 L atm K⁻¹mol⁻¹ — universal for ALL gases</text>
            <text x="14" y="46" fill="#e2e8f0" fontSize="9.5">significance: work per mole per kelvin · R = k_B·N_A · also C_p − C_v</text>
            <text x="14" y="62" fill="#94a3b8" fontSize="9">PM = dRT gives molar mass from density · two-state: P₁V₁/T₁ = P₂V₂/T₂</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="540" y="40" width="130" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#ef4444" strokeWidth="1.5" />
              <text x="552" y="64" fill="#ef4444" fontSize="10" fontWeight="bold">Unit traps:</text>
              <text x="552" y="88" fill="#e2e8f0" fontSize="9.5">match R to PV units</text>
              <text x="552" y="110" fill="#e2e8f0" fontSize="9.5">T always kelvin (+273)</text>
              <text x="552" y="134" fill="#e2e8f0" fontSize="9.5">STP: 22.4 L/mol</text>
              <text x="552" y="158" fill="#e2e8f0" fontSize="9.5">NTP: ~24 L/mol</text>
              <text x="552" y="186" fill="#94a3b8" fontSize="9">ideal ⇒ point particles,</text>
              <text x="552" y="204" fill="#94a3b8" fontSize="9">no attractions</text>
            </g>
          )}
        </svg>
      );

    case "tv-real-gas-deviation":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="90" y1="290" x2="640" y2="290" stroke="#64748b" strokeWidth="2" />
          <line x1="90" y1="290" x2="90" y2="40" stroke="#64748b" strokeWidth="2" />
          <text x="600" y="312" fill="#94a3b8" fontSize="10.5" fontWeight="bold">P</text>
          <text x="56" y="52" fill="#94a3b8" fontSize="10.5" fontWeight="bold">Z = PV/nRT</text>
          {/* Ideal line */}
          <line x1="90" y1="200" x2="620" y2="200" stroke="#10b981" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="530" y="192" fill="#10b981" fontSize="10" fontWeight="bold">ideal (Z = 1)</text>
          {/* Real curves */}
          <path d="M 90 200 Q 200 260 320 220 Q 430 180 620 90" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="430" y="130" fill="#ef4444" fontSize="10.5" fontWeight="bold">NH₃ (large a — deep dip)</text>
          <path d="M 90 200 Q 190 225 300 205 Q 430 185 620 120" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <text x="450" y="165" fill="#f59e0b" fontSize="10.5">N₂ (moderate)</text>
          <path d="M 90 200 Q 200 212 340 200 Q 480 192 620 170" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <text x="490" y="212" fill="#38bdf8" fontSize="10.5">H₂ / He (Z ≥ 1)</text>
          {/* Zone labels */}
          <text x="130" y="255" fill="#a855f7" fontSize="9.5" fontWeight="bold">Z &lt; 1: attraction wins</text>
          <text x="420" y="240" fill="#38bdf8" fontSize="9.5" fontWeight="bold">Z &gt; 1: molecular volume wins</text>
          {showAnnotations && (
            <g>
              <rect x="240" y="40" width="440" height="90" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="254" y="64" fill="#f59e0b" fontSize="11" fontWeight="bold">(P + an²/V²)(V − nb) = nRT — van der Waals corrections</text>
              <text x="254" y="88" fill="#e2e8f0" fontSize="10">a: attraction (NH₃, CO₂ big) · b: excluded volume (~4× molecular volume)</text>
              <text x="254" y="112" fill="#94a3b8" fontSize="9.5">Boyle temperature T_B = a/Rb: Z ≈ 1 over wide P · high T, low P ⇒ ideal · T ≥ T_c: no liquefaction</text>
            </g>
          )}
        </svg>
      );

    case "tv-equilibrium-constant":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Reaction */}
          <text x="350" y="50" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">aA + bB ⇌ cC + dD</text>
          {/* Kc box */}
          <rect x="90" y="80" width="250" height="110" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="2" />
          <text x="215" y="110" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">K꜀ = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</text>
          <text x="215" y="136" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">= k_f / k_r (from rate equality)</text>
          <text x="215" y="160" fill="#94a3b8" fontSize="9.5" textAnchor="middle">solids &amp; pure liquids OMITTED</text>
          {/* Q gauge */}
          <rect x="360" y="80" width="250" height="110" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="2" />
          <text x="485" y="106" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Q (same expr, any moment)</text>
          <text x="485" y="132" fill="#38bdf8" fontSize="10.5" textAnchor="middle">Q &lt; K ⇒ forward</text>
          <text x="485" y="154" fill="#ef4444" fontSize="10.5" textAnchor="middle">Q &gt; K ⇒ reverse · Q = K ⇒ rest</text>
          <text x="485" y="178" fill="#94a3b8" fontSize="9" textAnchor="middle">ΔG° = −RT ln K links to spontaneity</text>
          {/* Magnitude scale */}
          <line x1="120" y1="250" x2="580" y2="250" stroke="#64748b" strokeWidth="2" />
          <text x="130" y="272" fill="#94a3b8" fontSize="9.5">K ≪ 1</text>
          <text x="330" y="272" fill="#94a3b8" fontSize="9.5">K ≈ 1</text>
          <text x="520" y="272" fill="#94a3b8" fontSize="9.5">K ≫ 1</text>
          <text x="120" y="292" fill="#ef4444" fontSize="9.5">reactants win</text>
          <text x="490" y="292" fill="#10b981" fontSize="9.5">products win</text>
          {showAnnotations && (
            <g>
              <rect x="120" y="305" width="460" height="44" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="136" y="325" fill="#38bdf8" fontSize="10">Only T changes K. Flip equation ⇒ 1/K · scale coefficients ⇒ Kⁿ · catalyst: faster, same K.</text>
              <text x="136" y="342" fill="#94a3b8" fontSize="9">heterogeneous: CaCO₃(s) ⇌ CaO(s) + CO₂ ⇒ Kp = P(CO₂) alone.</text>
            </g>
          )}
        </svg>
      );

    case "tv-kp-kc":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Central bridge */}
          <rect x="150" y="90" width="400" height="80" rx="12" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="350" y="126" fill="#f59e0b" fontSize="17" fontWeight="bold" textAnchor="middle">Kp = Kc (RT)^Δn</text>
          <text x="350" y="152" fill="#e2e8f0" fontSize="10" textAnchor="middle">Δn = gas moles (products − reactants)</text>
          {/* Derivation line */}
          <text x="350" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">from [X] = P_X/RT substituted into Kc — each species contributes (RT)⁻¹</text>
          {/* Three cases */}
          <g transform="translate(60, 240)">
            <rect x="0" y="0" width="180" height="90" rx="8" fill="#0b1220" stroke="#10b981" strokeWidth="1.5" />
            <text x="90" y="24" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Δn = 0</text>
            <text x="90" y="46" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">H₂ + I₂ ⇌ 2HI</text>
            <text x="90" y="68" fill="#94a3b8" fontSize="10" textAnchor="middle">Kp = Kc</text>
          </g>
          <g transform="translate(260, 240)">
            <rect x="0" y="0" width="180" height="90" rx="8" fill="#0b1220" stroke="#ef4444" strokeWidth="1.5" />
            <text x="90" y="24" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Δn = +2</text>
            <text x="90" y="46" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">PCl₅ ⇌ PCl₃ + Cl₂</text>
            <text x="90" y="68" fill="#94a3b8" fontSize="10" textAnchor="middle">Kp = Kc(RT)²</text>
          </g>
          <g transform="translate(460, 240)">
            <rect x="0" y="0" width="180" height="90" rx="8" fill="#0b1220" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="90" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Δn = −2</text>
            <text x="90" y="46" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">N₂ + 3H₂ ⇌ 2NH₃</text>
            <text x="90" y="68" fill="#94a3b8" fontSize="10" textAnchor="middle">Kp = Kc(RT)⁻²</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="150" y="30" width="400" height="44" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
              <text x="350" y="50" fill="#a855f7" fontSize="10" textAnchor="middle" fontWeight="bold">Count GASES ONLY — solids/liquids/aqueous are invisible to Δn.</text>
              <text x="350" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle">R = 0.0821 when Kp uses atm · T in kelvin.</text>
            </g>
          )}
        </svg>
      );

    case "tv-le-chatelier":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Haber system */}
          <text x="350" y="42" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">N₂ + 3H₂ ⇌ 2NH₃ · ΔH = −92 kJ (exothermic, Δn = −2)</text>
          {/* Stress rows */}
          <g transform="translate(70, 70)">
            <rect x="0" y="0" width="560" height="52" rx="8" fill="#0b1220" stroke="#ef4444" strokeWidth="1.5" />
            <text x="14" y="24" fill="#ef4444" fontSize="10.5" fontWeight="bold">Add N₂ (concentration ↑)</text>
            <text x="14" y="42" fill="#e2e8f0" fontSize="9.5">Q dips below K ⇒ shift forward ⇒ more NH₃ (K unchanged)</text>
            <rect x="0" y="62" width="560" height="52" rx="8" fill="#0b1220" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="14" y="86" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Compress (P ↑, V ↓)</text>
            <text x="14" y="104" fill="#e2e8f0" fontSize="9.5">relieve by fewer gas moles ⇒ shift RIGHT (4 mol → 2 mol) — industry runs high P</text>
            <rect x="0" y="124" width="560" height="52" rx="8" fill="#0b1220" stroke="#10b981" strokeWidth="1.5" />
            <text x="14" y="148" fill="#10b981" fontSize="10.5" fontWeight="bold">Heat (T ↑)</text>
            <text x="14" y="166" fill="#e2e8f0" fontSize="9.5">exothermic ⇒ shift LEFT (K itself drops) — hence compromise ~450°C, catalyst for speed</text>
            <rect x="0" y="186" width="560" height="52" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" />
            <text x="14" y="210" fill="#a855f7" fontSize="10.5" fontWeight="bold">Add catalyst / inert gas (constant V)</text>
            <text x="14" y="228" fill="#e2e8f0" fontSize="9.5">NO shift at all — equilibrium reached faster, position identical</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="312" width="560" height="40" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="86" y="330" fill="#f59e0b" fontSize="10" fontWeight="bold">The system ALWAYS opposes the disturbance — every shift restores Q = K.</text>
              <text x="86" y="346" fill="#94a3b8" fontSize="9">Δn = 0 reactions never shift with pressure · common-ion effect is Le Chatelier in solutions.</text>
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
}

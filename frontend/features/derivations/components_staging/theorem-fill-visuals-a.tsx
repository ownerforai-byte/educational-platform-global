"use client";

/**
 * Theorem Fill visuals — Module A: Physics 1 (vectors → gas pressure).
 * Consulted by DerivationVisual before its default case.
 * House style: 700×360 viewBox, slate proof cards, showAnnotations panel.
 */

import type { ReactNode } from "react";

export function renderTheoremFillVisualA(type: string, showAnnotations: boolean): ReactNode | null {
  switch (type) {
    case "tv-vector-laws":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />
          <line x1="350" y1="330" x2="350" y2="30" stroke="#64748b" strokeWidth="2" />
          <text x="645" y="184" fill="#94a3b8" fontSize="11" fontWeight="bold">X</text>
          <text x="350" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Y</text>
          <circle cx="350" cy="180" r="5" fill="#fff" />
          <text x="330" y="198" fill="#94a3b8" fontSize="10">O</text>
          {/* Vector A along x */}
          <line x1="350" y1="180" x2="560" y2="180" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="560,180 548,174 548,186" fill="#38bdf8" />
          <text x="450" y="170" fill="#38bdf8" fontSize="13" fontWeight="bold">A</text>
          {/* Vector B at angle */}
          <line x1="350" y1="180" x2="470" y2="90" stroke="#10b981" strokeWidth="4" />
          <polygon points="470,90 456,94 464,104" fill="#10b981" />
          <text x="398" y="122" fill="#10b981" fontSize="13" fontWeight="bold">B</text>
          {/* Parallelogram completion */}
          <line x1="560" y1="180" x2="680" y2="90" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <line x1="470" y1="90" x2="680" y2="90" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <line x1="680" y1="90" x2="560" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          {/* Resultant diagonal */}
          <line x1="350" y1="180" x2="680" y2="90" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="680,90 666,89 671,101" fill="#f59e0b" />
          <text x="530" y="112" fill="#f59e0b" fontSize="14" fontWeight="bold">R (resultant)</text>
          {/* Angle arcs */}
          <path d="M 395 180 A 45 45 0 0 0 385 150" fill="none" stroke="#a855f7" strokeWidth="1.5" />
          <text x="400" y="152" fill="#a855f7" fontSize="11" fontWeight="bold">θ</text>
          <path d="M 420 180 A 70 70 0 0 0 413 155" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="430" y="168" fill="#f59e0b" fontSize="11">α</text>
          {/* Triangle-law inset */}
          <g transform="translate(60, 240)">
            <rect x="0" y="0" width="230" height="100" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="15" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold">Triangle law:</text>
            <line x1="20" y1="70" x2="90" y2="70" stroke="#38bdf8" strokeWidth="3" />
            <line x1="90" y1="70" x2="140" y2="38" stroke="#10b981" strokeWidth="3" />
            <line x1="20" y1="70" x2="140" y2="38" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
            <text x="45" y="88" fill="#cbd5e1" fontSize="9">A</text>
            <text x="110" y="52" fill="#cbd5e1" fontSize="9">B</text>
            <text x="70" y="46" fill="#f59e0b" fontSize="9">R = closing side</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="380" y="220" width="300" height="112" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="395" y="242" fill="#f59e0b" fontSize="11" fontWeight="bold">Parallelogram Law:</text>
              <text x="395" y="262" fill="#e2e8f0" fontSize="11">R = √(A² + B² + 2AB·cos θ)</text>
              <text x="395" y="282" fill="#e2e8f0" fontSize="11">tan α = B sin θ / (A + B cos θ)</text>
              <text x="395" y="304" fill="#38bdf8" fontSize="10">θ = 0°: R max = A+B · θ = 180°: R min = |A−B|</text>
              <text x="395" y="322" fill="#10b981" fontSize="10">Polygon law = triangle law applied n times</text>
            </g>
          )}
        </svg>
      );

    case "tv-atwood-machine":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Pulley */}
          <circle cx="350" cy="70" r="34" fill="none" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="350" cy="70" r="5" fill="#64748b" />
          <rect x="336" y="10" width="28" height="18" fill="#475569" />
          {/* Strings */}
          <line x1="316" y1="70" x2="316" y2="200" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="384" y1="70" x2="384" y2="290" stroke="#cbd5e1" strokeWidth="2.5" />
          {/* Mass 1 (rising) */}
          <rect x="286" y="200" width="60" height="55" rx="6" fill="#38bdf8" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="316" y="233" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">m₁</text>
          <line x1="316" y1="255" x2="316" y2="285" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="316,290 310,278 322,278" fill="#38bdf8" />
          <text x="328" y="282" fill="#38bdf8" fontSize="11" fontWeight="bold">a</text>
          <text x="228" y="190" fill="#38bdf8" fontSize="10">T − m₁g = m₁a</text>
          {/* Mass 2 (falling) */}
          <rect x="354" y="290" width="60" height="55" rx="6" fill="#ef4444" fillOpacity="0.35" stroke="#ef4444" strokeWidth="2.5" />
          <text x="384" y="323" fill="#fecaca" fontSize="13" fontWeight="bold" textAnchor="middle">m₂</text>
          <line x1="448" y1="290" x2="448" y2="315" stroke="#ef4444" strokeWidth="3" />
          <polygon points="448,320 442,308 454,308" fill="#ef4444" />
          <text x="458" y="312" fill="#ef4444" fontSize="11" fontWeight="bold">a</text>
          <text x="452" y="270" fill="#ef4444" fontSize="10">m₂g − T = m₂a</text>
          {/* FBD card */}
          {showAnnotations && (
            <g>
              <rect x="30" y="60" width="200" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
              <text x="45" y="84" fill="#10b981" fontSize="11" fontWeight="bold">Add the equations:</text>
              <text x="45" y="106" fill="#e2e8f0" fontSize="11">(m₂−m₁)g = (m₁+m₂)a</text>
              <text x="45" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold">a = (m₂−m₁)g/(m₁+m₂)</text>
              <text x="45" y="154" fill="#f59e0b" fontSize="12" fontWeight="bold">T = 2m₁m₂g/(m₁+m₂)</text>
              <text x="45" y="176" fill="#94a3b8" fontSize="9">m₁g &lt; T &lt; m₂g always</text>
            </g>
          )}
          {/* Lift/apparent weight inset */}
          <g>
            <rect x="520" y="150" width="160" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
            <text x="535" y="174" fill="#a855f7" fontSize="11" fontWeight="bold">Lift (apparent wt):</text>
            <text x="535" y="196" fill="#e2e8f0" fontSize="10">up, a: N = m(g+a)</text>
            <text x="535" y="216" fill="#e2e8f0" fontSize="10">down, a: N = m(g−a)</text>
            <text x="535" y="236" fill="#e2e8f0" fontSize="10">free fall: N = 0</text>
            <text x="535" y="262" fill="#fbbf24" fontSize="10">Incline (smooth):</text>
            <text x="535" y="280" fill="#fbbf24" fontSize="10">a = g sin θ</text>
          </g>
        </svg>
      );

    case "tv-moment-torque":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Beam */}
          <line x1="100" y1="160" x2="600" y2="160" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
          {/* Fulcrum */}
          <polygon points="350,170 320,280 380,280" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="350" cy="165" r="6" fill="#f59e0b" />
          <text x="358" y="185" fill="#f59e0b" fontSize="11" fontWeight="bold">pivot O</text>
          {/* Force 1 down on left */}
          <line x1="180" y1="90" x2="180" y2="140" stroke="#ef4444" strokeWidth="4" />
          <polygon points="180,148 173,136 187,136" fill="#ef4444" />
          <text x="150" y="128" fill="#ef4444" fontSize="12" fontWeight="bold">F₁</text>
          <text x="168" y="106" fill="#ef4444" fontSize="10">↓ anticlockwise</text>
          {/* Force 2 down on right (longer arm) */}
          <line x1="540" y1="90" x2="540" y2="140" stroke="#10b981" strokeWidth="4" />
          <polygon points="540,148 533,136 547,136" fill="#10b981" />
          <text x="552" y="128" fill="#10b981" fontSize="12" fontWeight="bold">F₂</text>
          {/* Moment arms */}
          <line x1="180" y1="300" x2="350" y2="300" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="350" y1="300" x2="540" y2="300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <text x="250" y="318" fill="#38bdf8" fontSize="11" fontWeight="bold">d₁ (arm)</text>
          <text x="420" y="318" fill="#f59e0b" fontSize="11" fontWeight="bold">d₂ (arm)</text>
          {/* Right-angle at arm */}
          <path d="M 180 160 L 180 296" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 540 160 L 540 296" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          {/* Rotation arc */}
          <path d="M 300 130 A 55 55 0 0 1 350 110" fill="none" stroke="#a855f7" strokeWidth="2" />
          <polygon points="350,110 338,108 343,118" fill="#a855f7" />
          {showAnnotations && (
            <g>
              <rect x="60" y="30" width="280" height="100" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="75" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold">Torque (moment) of a force:</text>
              <text x="75" y="74" fill="#e2e8f0" fontSize="12">τ = r F sin θ = F × (moment arm)</text>
              <text x="75" y="96" fill="#38bdf8" fontSize="12" fontWeight="bold">Equilibrium: ΣF = 0 AND Στ = 0</text>
              <text x="75" y="118" fill="#94a3b8" fontSize="10">Lever rule: F₁d₁ = F₂d₂ (principle of moments)</text>
            </g>
          )}
          <g>
            <rect x="560" y="200" width="120" height="120" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
            <text x="572" y="224" fill="#a855f7" fontSize="10" fontWeight="bold">Couple:</text>
            <line x1="585" y1="250" x2="655" y2="250" stroke="#ef4444" strokeWidth="3" />
            <polygon points="655,250 646,245 646,255" fill="#ef4444" />
            <line x1="655" y1="290" x2="585" y2="290" stroke="#38bdf8" strokeWidth="3" />
            <polygon points="585,290 594,285 594,295" fill="#38bdf8" />
            <text x="572" y="312" fill="#94a3b8" fontSize="9">τ = Fd (same</text>
            <text x="572" y="325" fill="#94a3b8" fontSize="9">about any point)</text>
          </g>
        </svg>
      );

    case "tv-friction-laws":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Ground */}
          <line x1="40" y1="290" x2="660" y2="290" stroke="#64748b" strokeWidth="4" />
          {/* Block */}
          <rect x="260" y="200" width="150" height="90" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
          <text x="335" y="252" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">Block m</text>
          {/* Applied force */}
          <line x1="410" y1="245" x2="560" y2="245" stroke="#10b981" strokeWidth="4" />
          <polygon points="565,245 552,238 552,252" fill="#10b981" />
          <text x="480" y="232" fill="#10b981" fontSize="12" fontWeight="bold">F (applied)</text>
          {/* Friction */}
          <line x1="260" y1="245" x2="120" y2="245" stroke="#ef4444" strokeWidth="4" />
          <polygon points="115,245 128,238 128,252" fill="#ef4444" />
          <text x="140" y="232" fill="#ef4444" fontSize="12" fontWeight="bold">f (friction)</text>
          {/* Normal */}
          <line x1="335" y1="200" x2="335" y2="120" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="335,115 328,127 342,127" fill="#38bdf8" />
          <text x="345" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold">N</text>
          {/* Weight */}
          <line x1="335" y1="290" x2="335" y2="345" stroke="#a855f7" strokeWidth="3" />
          <polygon points="335,350 328,338 342,338" fill="#a855f7" />
          <text x="345" y="340" fill="#a855f7" fontSize="12" fontWeight="bold">mg</text>
          {/* Incline / repose angle inset */}
          <g transform="translate(430, 20)">
            <polygon points="0,110 170,110 170,45" fill="#334155" fillOpacity="0.6" stroke="#94a3b8" strokeWidth="2" />
            <rect x="120" y="58" width="38" height="30" rx="4" fill="#3b82f6" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="128" fill="#f59e0b" fontSize="11" fontWeight="bold">tan θ(repose) = μs</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="40" y="20" width="330" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="55" y="44" fill="#f59e0b" fontSize="11" fontWeight="bold">Laws of solid friction:</text>
              <text x="55" y="66" fill="#e2e8f0" fontSize="10">1. Opposes relative sliding (parallel to surface)</text>
              <text x="55" y="84" fill="#e2e8f0" fontSize="10">2. f ∝ N  →  f = μN</text>
              <text x="55" y="102" fill="#e2e8f0" fontSize="10">3. Independent of apparent contact area</text>
              <text x="55" y="120" fill="#e2e8f0" fontSize="10">4. μ depends only on the surface pair</text>
              <text x="55" y="140" fill="#38bdf8" fontSize="11" fontWeight="bold">fs ≤ μsN · fk = μkN · μs &gt; μk</text>
            </g>
          )}
        </svg>
      );

    case "tv-angular-linear":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <circle cx="250" cy="180" r="110" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="250" cy="180" r="6" fill="#f59e0b" />
          <text x="238" y="205" fill="#f59e0b" fontSize="11" fontWeight="bold">O (axis)</text>
          <line x1="250" y1="180" x2="360" y2="180" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="290" y="172" fill="#cbd5e1" fontSize="12" fontWeight="bold">r</text>
          <circle cx="360" cy="180" r="10" fill="#10b981" stroke="#fff" strokeWidth="2" />
          <text x="352" y="162" fill="#10b981" fontSize="12" fontWeight="bold">P (mass)</text>
          {/* Tangential velocity */}
          <line x1="360" y1="180" x2="360" y2="60" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="360,54 353,67 367,67" fill="#38bdf8" />
          <text x="370" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold">v = rω (tangent)</text>
          {/* Centripetal acceleration inward */}
          <line x1="360" y1="180" x2="285" y2="180" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="7 4" />
          <polygon points="280,180 292,174 292,186" fill="#ef4444" />
          <text x="288" y="206" fill="#ef4444" fontSize="11" fontWeight="bold">a = v²/r (inward)</text>
          {/* Angular sweep */}
          <path d="M 320 100 A 95 95 0 0 1 358 172" fill="none" stroke="#a855f7" strokeWidth="2" />
          <text x="300" y="92" fill="#a855f7" fontSize="11" fontWeight="bold">ω = dθ/dt</text>
          {showAnnotations && (
            <g>
              <rect x="470" y="50" width="215" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="485" y="74" fill="#38bdf8" fontSize="11" fontWeight="bold">Radius links them all:</text>
              <text x="485" y="98" fill="#e2e8f0" fontSize="12">v = rω</text>
              <text x="485" y="122" fill="#e2e8f0" fontSize="12">aₜ = rα (speed change)</text>
              <text x="485" y="146" fill="#e2e8f0" fontSize="12">a꜀ = v²/r = ω²r (turn)</text>
              <text x="485" y="170" fill="#f59e0b" fontSize="10">ω same for whole body;</text>
              <text x="485" y="186" fill="#f59e0b" fontSize="10">v ∝ r differs by point</text>
              <text x="485" y="212" fill="#10b981" fontSize="10">ω = 2π/T = 2πf</text>
            </g>
          )}
          {/* Rolling inset */}
          <g transform="translate(470, 250)">
            <circle cx="60" cy="45" r="38" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <line x1="22" y1="83" x2="98" y2="83" stroke="#64748b" strokeWidth="3" />
            <text x="30" y="20" fill="#e2e8f0" fontSize="10">rolling: v = rω</text>
          </g>
        </svg>
      );

    case "tv-gravitation-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Earth */}
          <circle cx="200" cy="180" r="70" fill="#1d4ed8" fillOpacity="0.35" stroke="#60a5fa" strokeWidth="3" />
          <text x="200" y="185" fill="#bfdbfe" fontSize="13" fontWeight="bold" textAnchor="middle">M (Earth)</text>
          {/* Moon/mass */}
          <circle cx="520" cy="180" r="26" fill="#f59e0b" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="3" />
          <text x="520" y="185" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">m</text>
          {/* Attraction forces */}
          <line x1="494" y1="150" x2="310" y2="150" stroke="#ef4444" strokeWidth="4" />
          <polygon points="304,150 318,144 318,156" fill="#ef4444" />
          <text x="380" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">F on m</text>
          <line x1="270" y1="220" x2="450" y2="220" stroke="#ef4444" strokeWidth="4" />
          <polygon points="456,220 442,214 442,226" fill="#ef4444" />
          <text x="320" y="242" fill="#ef4444" fontSize="12" fontWeight="bold">F on M (equal &amp; opposite)</text>
          {/* Distance */}
          <line x1="200" y1="310" x2="520" y2="310" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
          <line x1="200" y1="300" x2="200" y2="320" stroke="#94a3b8" strokeWidth="2" />
          <line x1="520" y1="300" x2="520" y2="320" stroke="#94a3b8" strokeWidth="2" />
          <text x="348" y="332" fill="#cbd5e1" fontSize="12" fontWeight="bold">r (centre-to-centre)</text>
          {/* Field lines */}
          <path d="M 270 130 Q 340 100 420 128" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
          <path d="M 270 230 Q 340 262 420 232" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
          {showAnnotations && (
            <g>
              <rect x="480" y="30" width="205" height="140" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="494" y="54" fill="#f59e0b" fontSize="11" fontWeight="bold">Newton's law:</text>
              <text x="494" y="78" fill="#e2e8f0" fontSize="12">F = G m₁m₂ / r²</text>
              <text x="494" y="102" fill="#38bdf8" fontSize="12" fontWeight="bold">g = GM/R²</text>
              <text x="494" y="126" fill="#94a3b8" fontSize="9.5">G = 6.67×10⁻¹¹ N m² kg⁻²</text>
              <text x="494" y="144" fill="#94a3b8" fontSize="9.5">(Cavendish torsion balance)</text>
              <text x="494" y="162" fill="#94a3b8" fontSize="9.5">Shell theorem ⇒ point mass</text>
            </g>
          )}
          <g>
            <rect x="60" y="30" width="240" height="70" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="74" y="54" fill="#10b981" fontSize="11" fontWeight="bold">Density of Earth:</text>
            <text x="74" y="78" fill="#e2e8f0" fontSize="12">ρ = 3g / (4πGR) ≈ 5500 kg/m³</text>
          </g>
        </svg>
      );

    case "tv-variation-g":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="80" y1="40" x2="80" y2="300" stroke="#64748b" strokeWidth="2" />
          <line x1="80" y1="170" x2="640" y2="170" stroke="#64748b" strokeWidth="2" />
          <text x="60" y="36" fill="#94a3b8" fontSize="11" fontWeight="bold">g</text>
          {/* Altitude curve: quadratic falloff */}
          <path d="M 80 100 Q 160 128 260 148 T 620 166" fill="none" stroke="#ef4444" strokeWidth="3.5" />
          <text x="440" y="128" fill="#ef4444" fontSize="12" fontWeight="bold">altitude: g(1−2h/R) — quadratic</text>
          {/* Surface marker */}
          <circle cx="80" cy="100" r="5" fill="#fbbf24" />
          <text x="92" y="96" fill="#fbbf24" fontSize="10" fontWeight="bold">surface (max g)</text>
          {/* Depth curve: linear */}
          <line x1="80" y1="100" x2="300" y2="270" stroke="#38bdf8" strokeWidth="3.5" />
          <text x="150" y="240" fill="#38bdf8" fontSize="12" fontWeight="bold">depth: g(1−d/R) — linear</text>
          <circle cx="300" cy="270" r="5" fill="#38bdf8" />
          <text x="310" y="275" fill="#38bdf8" fontSize="10">centre: g = 0</text>
          {/* Zone labels */}
          <text x="400" y="160" fill="#94a3b8" fontSize="10">↑ height h</text>
          <text x="130" y="185" fill="#94a3b8" fontSize="10">↓ depth d</text>
          {showAnnotations && (
            <g>
              <rect x="420" y="30" width="250" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="434" y="54" fill="#f59e0b" fontSize="11" fontWeight="bold">The 2h vs d rule:</text>
              <text x="434" y="78" fill="#e2e8f0" fontSize="11">g_h = g(1 − 2h/R)</text>
              <text x="434" y="100" fill="#e2e8f0" fontSize="11">g_d = g(1 − d/R)</text>
              <text x="434" y="126" fill="#38bdf8" fontSize="11" fontWeight="bold">g_h = g_d ⟺ d = 2h</text>
              <text x="434" y="152" fill="#10b981" fontSize="10">Shell theorem: only mass inside</text>
              <text x="434" y="168" fill="#10b981" fontSize="10">radius (R−d) attracts ⇒ linear</text>
              <text x="434" y="192" fill="#94a3b8" fontSize="9.5">Everest top: ~0.3% lighter</text>
            </g>
          )}
        </svg>
      );

    case "tv-hooke-const":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="90" y1="290" x2="640" y2="290" stroke="#64748b" strokeWidth="2" />
          <line x1="90" y1="290" x2="90" y2="40" stroke="#64748b" strokeWidth="2" />
          <text x="648" y="294" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
          <text x="76" y="36" fill="#94a3b8" fontSize="11" fontWeight="bold">F</text>
          {/* Two spring lines */}
          <line x1="90" y1="290" x2="470" y2="70" stroke="#38bdf8" strokeWidth="3.5" />
          <text x="478" y="64" fill="#38bdf8" fontSize="11" fontWeight="bold">stiff: k₁ (large)</text>
          <line x1="90" y1="290" x2="560" y2="160" stroke="#f59e0b" strokeWidth="3.5" />
          <text x="568" y="155" fill="#f59e0b" fontSize="11" fontWeight="bold">soft: k₂ (small)</text>
          {/* Elastic limit */}
          <line x1="430" y1="180" x2="430" y2="290" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
          <text x="380" y="172" fill="#ef4444" fontSize="10" fontWeight="bold">elastic limit</text>
          <rect x="430" y="50" width="200" height="240" fill="#ef4444" fillOpacity="0.05" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
          <text x="530" y="278" fill="#ef4444" fontSize="10" textAnchor="middle">plastic (permanent set)</text>
          {/* Energy triangle */}
          <polygon points="90,290 320,290 320,140" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5" />
          <text x="150" y="255" fill="#10b981" fontSize="11" fontWeight="bold">U = ½kx² (area)</text>
          {showAnnotations && (
            <g>
              <rect x="440" y="40" width="240" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="454" y="62" fill="#38bdf8" fontSize="11" fontWeight="bold">Spring combinations:</text>
              <text x="454" y="86" fill="#e2e8f0" fontSize="11">parallel: kₚ = k₁ + k₂</text>
              <text x="454" y="108" fill="#e2e8f0" fontSize="11">series: 1/kₛ = 1/k₁ + 1/k₂</text>
              <text x="454" y="134" fill="#f59e0b" fontSize="10">identical pair: 2k / k/2</text>
              <text x="454" y="156" fill="#94a3b8" fontSize="9.5">T = 2π√(m/k) from k</text>
            </g>
          )}
        </svg>
      );

    case "tv-zeroth-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Three bodies */}
          <rect x="70" y="60" width="160" height="110" rx="12" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="2.5" />
          <text x="150" y="108" fill="#fecaca" fontSize="15" fontWeight="bold" textAnchor="middle">System A</text>
          <text x="150" y="130" fill="#fca5a5" fontSize="12" textAnchor="middle">T_A = 80°C (hot)</text>
          <rect x="470" y="60" width="160" height="110" rx="12" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="550" y="108" fill="#bae6fd" fontSize="15" fontWeight="bold" textAnchor="middle">System B</text>
          <text x="550" y="130" fill="#7dd3fc" fontSize="12" textAnchor="middle">T_B = 20°C (cold)</text>
          <rect x="270" y="200" width="160" height="110" rx="12" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
          <text x="350" y="248" fill="#a7f3d0" fontSize="15" fontWeight="bold" textAnchor="middle">System C</text>
          <text x="350" y="270" fill="#6ee7b7" fontSize="12" textAnchor="middle">thermometer</text>
          {/* Contacts */}
          <line x1="215" y1="170" x2="285" y2="210" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
          <text x="215" y="205" fill="#f59e0b" fontSize="10" fontWeight="bold">A ~ C ✓</text>
          <line x1="420" y1="210" x2="490" y2="170" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
          <text x="445" y="205" fill="#f59e0b" fontSize="10" fontWeight="bold">B ~ C ✓</text>
          {/* Conclusion arrow A ~ B */}
          <line x1="235" y1="115" x2="465" y2="115" stroke="#a855f7" strokeWidth="3" />
          <polygon points="470,115 456,108 456,122" fill="#a855f7" />
          <text x="290" y="105" fill="#a855f7" fontSize="13" fontWeight="bold">⟹ A ~ B  (Zeroth law)</text>
          {/* Heat flow arrows */}
          <line x1="120" y1="175" x2="120" y2="215" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-end)" />
          <text x="90" y="205" fill="#ef4444" fontSize="9">heat flows</text>
          <line x1="590" y1="175" x2="590" y2="215" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-end)" />
          <text x="560" y="205" fill="#38bdf8" fontSize="9">no net flow</text>
          {showAnnotations && (
            <g>
              <rect x="40" y="300" width="620" height="48" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="56" y="322" fill="#f59e0b" fontSize="11" fontWeight="bold">If A ~ C and B ~ C then A ~ B — temperature is transitive and therefore MEASURABLE.</text>
              <text x="56" y="340" fill="#94a3b8" fontSize="10">Named "Zeroth" because it logically precedes the First and Second laws.</text>
            </g>
          )}
        </svg>
      );

    case "tv-mercury-thermometer":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Bulb + stem */}
          <circle cx="200" cy="280" r="42" fill="#ef4444" fillOpacity="0.75" stroke="#b91c1c" strokeWidth="3" />
          <rect x="188" y="60" width="24" height="220" rx="10" fill="#f8fafc" fillOpacity="0.15" stroke="#94a3b8" strokeWidth="3" />
          {/* Mercury column */}
          <rect x="193" y="150" width="14" height="130" fill="#ef4444" />
          <circle cx="200" cy="280" r="34" fill="#ef4444" />
          {/* Scale marks */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="212" y1={150 + i * 26} x2="228" y2={150 + i * 26} stroke="#94a3b8" strokeWidth="2" />
          ))}
          <text x="234" y="155" fill="#ef4444" fontSize="10" fontWeight="bold">t (measured)</text>
          <text x="234" y="281" fill="#38bdf8" fontSize="10" fontWeight="bold">0°C ice point</text>
          <line x1="212" y1="276" x2="232" y2="276" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="212" y1="66" x2="232" y2="66" stroke="#a855f7" strokeWidth="2.5" />
          <text x="234" y="70" fill="#a855f7" fontSize="10" fontWeight="bold">100°C steam point</text>
          {/* Body being measured */}
          <rect x="420" y="180" width="200" height="140" rx="14" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="520" y="245" fill="#fde68a" fontSize="14" fontWeight="bold" textAnchor="middle">Body (unknown T)</text>
          <line x1="242" y1="250" x2="418" y2="250" stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" />
          <text x="270" y="240" fill="#10b981" fontSize="11" fontWeight="bold">thermal contact → equilibrium</text>
          {showAnnotations && (
            <g>
              <rect x="380" y="30" width="300" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="394" y="52" fill="#38bdf8" fontSize="11" fontWeight="bold">Reading = equilibrium (Zeroth law)</text>
              <text x="394" y="76" fill="#e2e8f0" fontSize="11">ΔV = γVΔT (linear expansion)</text>
              <text x="394" y="98" fill="#e2e8f0" fontSize="11">h = ΔV / A(bore) — fine bore = sensitive</text>
              <text x="394" y="124" fill="#f59e0b" fontSize="11" fontWeight="bold">t = (l−l₀)/(l₁₀₀−l₀) × 100°C</text>
              <text x="394" y="146" fill="#94a3b8" fontSize="9.5">Hg range −39°…357°C · kink holds clinical reading</text>
            </g>
          )}
        </svg>
      );

    case "tv-expansion-relations":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* 1D: rod */}
          <rect x="80" y="70" width="150" height="18" rx="4" fill="#38bdf8" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />
          <line x1="230" y1="79" x2="300" y2="79" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-end)" />
          <text x="240" y="66" fill="#38bdf8" fontSize="11" fontWeight="bold">+αΔT per side</text>
          <text x="84" y="62" fill="#94a3b8" fontSize="10">linear: Δl = αlΔT</text>
          {/* 2D: plate */}
          <rect x="80" y="150" width="130" height="80" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
          <rect x="70" y="142" width="150" height="96" fill="none" stroke="#10b981" strokeWidth="2.5" />
          <text x="240" y="185" fill="#10b981" fontSize="11" fontWeight="bold">area: β = 2α</text>
          <text x="240" y="205" fill="#6ee7b7" fontSize="10">ΔA = βAΔT</text>
          {/* 3D: cube */}
          <g transform="translate(80, 250)">
            <rect x="0" y="0" width="90" height="60" fill="#a855f7" fillOpacity="0.25" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="0,0 26,-20 116,-20 90,0" fill="none" stroke="#a855f7" strokeWidth="2" />
            <polygon points="90,0 116,-20 116,40 90,60" fill="none" stroke="#a855f7" strokeWidth="2" />
            <rect x="-10" y="-10" width="110" height="80" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <polygon points="-10,-10 16,-30 126,-30 116,-20" fill="none" stroke="#a855f7" strokeWidth="2" />
            <polygon points="100,-10 126,-30 126,30 116,40" fill="none" stroke="#a855f7" strokeWidth="2.5" />
          </g>
          <text x="240" y="290" fill="#a855f7" fontSize="11" fontWeight="bold">volume: γ = 3α</text>
          <text x="240" y="310" fill="#c084fc" fontSize="10">ΔV = γVΔT</text>
          {/* Ratio card */}
          {showAnnotations && (
            <g>
              <rect x="400" y="60" width="270" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="415" y="84" fill="#f59e0b" fontSize="11" fontWeight="bold">The 1 : 2 : 3 rule (isotropic):</text>
              <text x="415" y="110" fill="#e2e8f0" fontSize="12">α : β : γ = 1 : 2 : 3</text>
              <text x="415" y="134" fill="#38bdf8" fontSize="10.5">A′ = l²(1+αΔT)² ≈ A(1+2αΔT)</text>
              <text x="415" y="156" fill="#a855f7" fontSize="10.5">V′ = l³(1+αΔT)³ ≈ V(1+3αΔT)</text>
              <text x="415" y="182" fill="#10b981" fontSize="10">Holes expand like the material around them</text>
              <text x="415" y="200" fill="#ef4444" fontSize="10">Water 0–4°C: γ &lt; 0 (anomaly — ice floats)</text>
              <text x="415" y="222" fill="#94a3b8" fontSize="9.5">Anisotropic crystal: γ = αx + αy + αz</text>
            </g>
          )}
        </svg>
      );

    case "tv-stefan-boltzmann":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Hot body */}
          <circle cx="180" cy="180" r="62" fill="#ef4444" fillOpacity="0.55" stroke="#f87171" strokeWidth="3" />
          <text x="180" y="175" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">Hot body</text>
          <text x="180" y="195" fill="#fecaca" fontSize="11" textAnchor="middle">T (kelvin!)</text>
          {/* Radiation waves */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="180" cy="180" r={90 + i * 34} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 5" opacity={0.8 - i * 0.22} />
          ))}
          {/* Surroundings */}
          <rect x="480" y="120" width="180" height="120" rx="12" fill="#1d4ed8" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="2.5" />
          <text x="570" y="175" fill="#bfdbfe" fontSize="12" fontWeight="bold" textAnchor="middle">Surroundings</text>
          <text x="570" y="195" fill="#93c5fd" fontSize="11" textAnchor="middle">T₀ (cooler)</text>
          {/* Net arrows */}
          <line x1="300" y1="140" x2="470" y2="140" stroke="#f59e0b" strokeWidth="3.5" />
          <polygon points="476,140 462,133 462,147" fill="#f59e0b" />
          <text x="340" y="128" fill="#f59e0b" fontSize="11" fontWeight="bold">P emitted = eσAT⁴</text>
          <line x1="470" y1="225" x2="300" y2="225" stroke="#60a5fa" strokeWidth="3" />
          <polygon points="294,225 308,218 308,232" fill="#60a5fa" />
          <text x="330" y="248" fill="#60a5fa" fontSize="11">P absorbed = eσAT₀⁴</text>
          {showAnnotations && (
            <g>
              <rect x="330" y="30" width="350" height="80" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="345" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold">Net exchange:</text>
              <text x="345" y="76" fill="#e2e8f0" fontSize="12">P = eσA(T⁴ − T₀⁴) · σ = 5.67×10⁻⁸ W m⁻²K⁻⁴</text>
              <text x="345" y="98" fill="#ef4444" fontSize="10">4th power: T×2 ⇒ P×16 · e = 1 only for black body</text>
            </g>
          )}
          <g>
            <rect x="40" y="290" width="620" height="50" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="56" y="312" fill="#10b981" fontSize="11" fontWeight="bold">T ≈ T₀: T⁴−T₀⁴ ≈ 4T₀³ΔT ⇒ Newton's cooling law (exponential decay).</text>
            <text x="56" y="330" fill="#94a3b8" fontSize="10">Always convert to kelvin before raising to the fourth power.</text>
          </g>
        </svg>
      );

    case "tv-gas-pressure":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Box */}
          <rect x="140" y="60" width="300" height="240" rx="10" fill="#0b1220" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="3" />
          {/* Molecules */}
          {[
            [190, 100, 1], [260, 140, -1], [340, 90, 1], [220, 200, 1], [300, 240, -1],
            [390, 180, 1], [180, 260, -1], [370, 270, 1], [250, 80, -1], [410, 120, 1],
          ].map(([x, y, d], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#10b981" />
              <line x1={x} y1={y} x2={x + 18 * d} y2={y + (i % 2 === 0 ? -10 : 12)} stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-end)" />
            </g>
          ))}
          {/* Wall collision highlight */}
          <circle cx="140" cy="200" r="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="60" y="195" fill="#f59e0b" fontSize="10" fontWeight="bold">momentum</text>
          <text x="60" y="209" fill="#f59e0b" fontSize="10" fontWeight="bold">2mv_x per hit</text>
          {/* Pressure arrows on walls */}
          <line x1="140" y1="330" x2="140" y2="306" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <line x1="440" y1="30" x2="440" y2="54" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-end)" />
          <text x="452" y="52" fill="#ef4444" fontSize="10" fontWeight="bold">P on walls</text>
          {showAnnotations && (
            <g>
              <rect x="480" y="60" width="200" height="210" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="494" y="84" fill="#38bdf8" fontSize="11" fontWeight="bold">Kinetic pressure:</text>
              <text x="494" y="110" fill="#e2e8f0" fontSize="11">one molecule: mvₓ²/l</text>
              <text x="494" y="134" fill="#e2e8f0" fontSize="11">⟨vₓ²⟩ = ⟨c²⟩/3 (isotropy)</text>
              <text x="494" y="160" fill="#f59e0b" fontSize="12" fontWeight="bold">P = ⅓ ρ c²</text>
              <text x="494" y="186" fill="#10b981" fontSize="11">⟨½mc²⟩ = (3/2)kT</text>
              <text x="494" y="212" fill="#94a3b8" fontSize="9.5">c = √(3P/ρ) = √(3RT/M)</text>
              <text x="494" y="234" fill="#94a3b8" fontSize="9.5">lighter gas ⇒ faster rms</text>
              <text x="494" y="256" fill="#94a3b8" fontSize="9.5">use rms, never mean speed</text>
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
}

"use client";

/**
 * Theorem Fill visuals — Module B: Physics 2 (optics, band theory, Hubble,
 * Coulomb, Ohm, Lenz, transformer, Huygens, Bohr, Gauss, DC circuits).
 */

import type { ReactNode } from "react";

export function renderTheoremFillVisualB(type: string, showAnnotations: boolean): ReactNode | null {
  switch (type) {
    case "tv-snells-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Interface: air above, glass below */}
          <rect x="100" y="180" width="500" height="150" fill="#1d4ed8" fillOpacity="0.22" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="610" y="330" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="end">medium 2 (μ₂ &gt; μ₁)</text>
          <line x1="100" y1="180" x2="600" y2="180" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="610" y="172" fill="#94a3b8" fontSize="11" textAnchor="end">interface</text>
          {/* Normal */}
          <line x1="350" y1="60" x2="350" y2="310" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" />
          <text x="358" y="70" fill="#a855f7" fontSize="10" fontWeight="bold">normal</text>
          {/* Incident ray */}
          <line x1="170" y1="70" x2="350" y2="180" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="350,180 335,172 341,161" fill="#f59e0b" />
          <text x="200" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">incident ray</text>
          {/* Refracted ray (bent toward normal) */}
          <line x1="350" y1="180" x2="415" y2="330" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="415,330 410,314 400,323" fill="#38bdf8" />
          <text x="430" y="320" fill="#38bdf8" fontSize="12" fontWeight="bold">refracted ray</text>
          {/* Angles */}
          <path d="M 350 130 A 50 50 0 0 0 315 147" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="322" y="118" fill="#f59e0b" fontSize="13" fontWeight="bold">i</text>
          <path d="M 350 230 A 50 50 0 0 1 376 222" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <text x="360" y="256" fill="#38bdf8" fontSize="13" fontWeight="bold">r &lt; i</text>
          {/* Wavefront hint */}
          <line x1="150" y1="100" x2="230" y2="46" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
          <line x1="420" y1="270" x2="470" y2="250" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
          {showAnnotations && (
            <g>
              <rect x="480" y="40" width="200" height="130" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="494" y="62" fill="#f59e0b" fontSize="11" fontWeight="bold">Snell's law:</text>
              <text x="494" y="86" fill="#e2e8f0" fontSize="12">sin i / sin r = n₂/n₁</text>
              <text x="494" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold">μ = c/v = λ_vac/λ_med</text>
              <text x="494" y="134" fill="#94a3b8" fontSize="9.5">frequency never changes;</text>
              <text x="494" y="150" fill="#94a3b8" fontSize="9.5">speed &amp; wavelength do</text>
              <text x="494" y="166" fill="#94a3b8" fontSize="9.5">violet bends most (μ&gt;)</text>
            </g>
          )}
          <g>
            <rect x="40" y="280" width="240" height="66" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="54" y="302" fill="#10b981" fontSize="10" fontWeight="bold">Huygens derivation:</text>
            <text x="54" y="322" fill="#e2e8f0" fontSize="10">sin i/sin r = (v₁t)/(v₂t) = v₁/v₂</text>
            <text x="54" y="338" fill="#94a3b8" fontSize="9">wavefront geometry, one line of algebra</text>
          </g>
        </svg>
      );

    case "tv-index-relations":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Parallel slab */}
          <rect x="120" y="80" width="460" height="200" fill="#1d4ed8" fillOpacity="0.22" stroke="#60a5fa" strokeWidth="2" />
          <text x="560" y="105" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="end">slab, thickness t, index μ</text>
          {/* Incident ray */}
          <line x1="40" y1="120" x2="220" y2="150" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="220,150 206,144 210,156" fill="#f59e0b" />
          <text x="60" y="108" fill="#f59e0b" fontSize="11" fontWeight="bold">i (in air)</text>
          {/* Inside slab */}
          <line x1="220" y1="150" x2="400" y2="205" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="400,205 386,199 390,211" fill="#38bdf8" />
          <text x="270" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">r inside</text>
          {/* Emergent parallel ray */}
          <line x1="400" y1="205" x2="600" y2="242" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="600,242 586,236 590,248" fill="#f59e0b" />
          <text x="490" y="230" fill="#f59e0b" fontSize="11" fontWeight="bold">e = i (parallel!)</text>
          {/* Lateral shift */}
          <line x1="220" y1="150" x2="440" y2="188" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 4" />
          <line x1="440" y1="188" x2="570" y2="211" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 4" />
          <text x="450" y="180" fill="#a855f7" fontSize="10" fontWeight="bold">lateral shift d = t sin(i−r)/cos r</text>
          {/* Apparent depth inset */}
          <g transform="translate(40, 240)">
            <rect x="0" y="0" width="220" height="100" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="12" y="22" fill="#10b981" fontSize="10" fontWeight="bold">Apparent depth:</text>
            <text x="12" y="44" fill="#e2e8f0" fontSize="10.5">μ = real depth / apparent depth</text>
            <text x="12" y="66" fill="#e2e8f0" fontSize="10.5">μ₂₁ = 1/μ₁₂ (reversal)</text>
            <text x="12" y="88" fill="#f59e0b" fontSize="10.5">μ₃₁ = μ₃₂·μ₂₁ (telescoping)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="300" y="290" width="380" height="56" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="316" y="312" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Through a parallel slab: direction preserved (e = i), only lateral shift remains.</text>
              <text x="316" y="332" fill="#94a3b8" fontSize="10">Normal incidence: d = 0. Pond bottoms look raised by t(1 − 1/μ).</text>
            </g>
          )}
        </svg>
      );

    case "tv-prism-formula":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Prism triangle */}
          <polygon points="350,60 180,290 520,290" fill="#a855f7" fillOpacity="0.15" stroke="#c084fc" strokeWidth="3" />
          <text x="350" y="88" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">A (apex)</text>
          {/* Incident ray */}
          <line x1="60" y1="150" x2="258" y2="216" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="258,216 244,208 248,220" fill="#f59e0b" />
          <text x="70" y="138" fill="#f59e0b" fontSize="11" fontWeight="bold">i₁</text>
          {/* First refraction inward */}
          <line x1="258" y1="216" x2="420" y2="216" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="420,216 406,209 406,223" fill="#38bdf8" />
          <text x="300" y="205" fill="#38bdf8" fontSize="10">r₁ + r₂ = A</text>
          {/* Emergent deviated ray */}
          <line x1="420" y1="216" x2="640" y2="120" stroke="#f59e0b" strokeWidth="4" />
          <polygon points="640,120 625,121 631,133" fill="#f59e0b" />
          <text x="500" y="150" fill="#f59e0b" fontSize="11" fontWeight="bold">i₂ (exit)</text>
          {/* Undeviated reference */}
          <line x1="258" y1="216" x2="660" y2="216" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M 560 216 A 60 60 0 0 0 548 180" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="568" y="204" fill="#ef4444" fontSize="12" fontWeight="bold">δ (deviation)</text>
          {/* Symmetric passage note */}
          <text x="90" y="255" fill="#10b981" fontSize="10" fontWeight="bold">At δm: i₁ = i₂, r₁ = r₂ = A/2</text>
          <text x="90" y="272" fill="#10b981" fontSize="10" fontWeight="bold">(symmetric passage)</text>
          {showAnnotations && (
            <g>
              <rect x="470" y="30" width="215" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="484" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold">Prism formula:</text>
              <text x="484" y="76" fill="#e2e8f0" fontSize="11">δ = i₁ + i₂ − A</text>
              <text x="484" y="102" fill="#38bdf8" fontSize="12" fontWeight="bold">μ = sin((A+δm)/2) / sin(A/2)</text>
              <text x="484" y="128" fill="#10b981" fontSize="10">Thin prism: δ = (μ−1)A</text>
              <text x="484" y="150" fill="#94a3b8" fontSize="9.5">violet δ &gt; red δ ⇒ spectrum</text>
              <text x="484" y="168" fill="#94a3b8" fontSize="9.5">two incidences give same δ (one may TIR)</text>
            </g>
          )}
        </svg>
      );

    case "tv-lens-makers-2":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Lens */}
          <path d="M 320 60 Q 380 180 320 300 Q 260 180 320 300" fill="none" />
          <path d="M 320 60 Q 388 180 320 300 Q 252 180 320 60 Z" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="3" />
          <text x="320" y="185" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">μ</text>
          {/* Principal axis */}
          <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 4" />
          {/* Radii */}
          <circle cx="180" cy="180" r="6" fill="#ef4444" />
          <text x="140" y="172" fill="#ef4444" fontSize="10" fontWeight="bold">C₁ (R₁&gt;0)</text>
          <circle cx="470" cy="180" r="6" fill="#f59e0b" />
          <text x="482" y="172" fill="#f59e0b" fontSize="10" fontWeight="bold">C₂ (R₂&lt;0)</text>
          <line x1="320" y1="110" x2="184" y2="176" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="320" y1="250" x2="466" y2="184" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Rays focusing */}
          <line x1="80" y1="130" x2="290" y2="130" stroke="#10b981" strokeWidth="3" />
          <line x1="290" y1="130" x2="500" y2="180" stroke="#10b981" strokeWidth="3" />
          <line x1="500" y1="180" x2="500" y2="180" stroke="#10b981" strokeWidth="3" />
          <circle cx="500" cy="180" r="6" fill="#10b981" />
          <text x="490" y="210" fill="#10b981" fontSize="11" fontWeight="bold">F (focal point)</text>
          <text x="90" y="118" fill="#10b981" fontSize="10">parallel rays (u = ∞)</text>
          {showAnnotations && (
            <g>
              <rect x="440" y="40" width="240" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="454" y="62" fill="#38bdf8" fontSize="11" fontWeight="bold">Lens maker's formula:</text>
              <text x="454" y="88" fill="#e2e8f0" fontSize="11">1/f = (μ/μₘ − 1)(1/R₁ − 1/R₂)</text>
              <text x="454" y="114" fill="#f59e0b" fontSize="10">equiconvex air: f = R/2(μ−1)</text>
              <text x="454" y="138" fill="#10b981" fontSize="10">in water: f increases ~4×</text>
              <text x="454" y="162" fill="#ef4444" fontSize="10">μ_lens = μ_medium ⇒ f → ∞ (invisible!)</text>
              <text x="454" y="186" fill="#94a3b8" fontSize="9.5">contact lenses: 1/F = 1/f₁ + 1/f₂</text>
              <text x="454" y="208" fill="#94a3b8" fontSize="9.5">P = 1/f dioptre — powers add</text>
            </g>
          )}
        </svg>
      );

    case "tv-band-theory":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* METAL */}
          <g transform="translate(60, 50)">
            <rect x="0" y="0" width="170" height="240" rx="10" fill="#0b1220" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="2" />
            <text x="85" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">METAL</text>
            <rect x="20" y="150" width="130" height="60" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
            <text x="85" y="186" fill="#d1fae5" fontSize="10" textAnchor="middle">VB (filled)</text>
            <rect x="20" y="60" width="130" height="80" fill="#f59e0b" fillOpacity="0.35" stroke="#f59e0b" strokeWidth="2" />
            <text x="85" y="92" fill="#fde68a" fontSize="10" textAnchor="middle">CB (half-filled)</text>
            <text x="85" y="120" fill="#fff" fontSize="14" textAnchor="middle">●●●</text>
            <circle cx="70" cy="105" r="6" fill="#fff" />
            <circle cx="100" cy="95" r="6" fill="#fff" />
            <text x="85" y="230" fill="#94a3b8" fontSize="9" textAnchor="middle">overlap — always conducts</text>
          </g>
          {/* SEMICONDUCTOR */}
          <g transform="translate(270, 50)">
            <rect x="0" y="0" width="170" height="240" rx="10" fill="#0b1220" fillOpacity="0.8" stroke="#10b981" strokeWidth="2" />
            <text x="85" y="26" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SEMICONDUCTOR</text>
            <rect x="20" y="140" width="130" height="70" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
            <text x="85" y="180" fill="#d1fae5" fontSize="10" textAnchor="middle">VB (filled)</text>
            <rect x="20" y="60" width="130" height="46" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <text x="85" y="88" fill="#bae6fd" fontSize="10" textAnchor="middle">CB (≈empty)</text>
            <circle cx="85" cy="72" r="6" fill="#fff" />
            <text x="115" y="76" fill="#fff" fontSize="9">e⁻ excited</text>
            <circle cx="85" cy="158" r="6" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <text x="104" y="162" fill="#fbbf24" fontSize="9">hole</text>
            <line x1="85" y1="134" x2="85" y2="112" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-end)" />
            <text x="85" y="230" fill="#94a3b8" fontSize="9" textAnchor="middle">Eg ≈ 1 eV — conducts when hot</text>
          </g>
          {/* INSULATOR */}
          <g transform="translate(480, 50)">
            <rect x="0" y="0" width="170" height="240" rx="10" fill="#0b1220" fillOpacity="0.8" stroke="#ef4444" strokeWidth="2" />
            <text x="85" y="26" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">INSULATOR</text>
            <rect x="20" y="180" width="130" height="30" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
            <text x="85" y="200" fill="#d1fae5" fontSize="10" textAnchor="middle">VB (filled)</text>
            <rect x="20" y="40" width="130" height="30" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" />
            <text x="85" y="60" fill="#bae6fd" fontSize="10" textAnchor="middle">CB (empty)</text>
            <text x="85" y="135" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">Eg ≥ 3 eV</text>
            <text x="85" y="230" fill="#94a3b8" fontSize="9" textAnchor="middle">kT ≈ 0.025 eV — too small to jump</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="40" y="300" width="620" height="44" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="56" y="320" fill="#f59e0b" fontSize="11" fontWeight="bold">One gap rules them all: metal (no gap) · semiconductor (Eg ≈ 0.7–1.1 eV) · insulator (Eg ≳ 3 eV).</text>
              <text x="56" y="337" fill="#94a3b8" fontSize="10">Semiconductors: σ rises with T (negative α); metals: σ falls with T. Si 1.1 eV, Ge 0.7 eV.</text>
            </g>
          )}
        </svg>
      );

    case "tv-hubble-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="80" y1="290" x2="640" y2="290" stroke="#64748b" strokeWidth="2" />
          <line x1="80" y1="290" x2="80" y2="40" stroke="#64748b" strokeWidth="2" />
          <text x="600" y="312" fill="#94a3b8" fontSize="11" fontWeight="bold">distance d (Mpc)</text>
          <text x="40" y="60" fill="#94a3b8" fontSize="11" fontWeight="bold">v</text>
          {/* Data scatter + fit line */}
          {[[150, 245], [220, 215], [300, 175], [380, 140], [460, 105], [540, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#38bdf8" opacity="0.85" />
          ))}
          <line x1="80" y1="290" x2="600" y2="45" stroke="#f59e0b" strokeWidth="3" />
          <text x="420" y="60" fill="#f59e0b" fontSize="12" fontWeight="bold">v = H₀d (slope = H₀)</text>
          {/* Redshift illustration */}
          <g transform="translate(90, 40)">
            <text x="0" y="14" fill="#cbd5e1" fontSize="10">redshift: z = Δλ/λ ≈ v/c</text>
            <line x1="0" y1="34" x2="90" y2="34" stroke="#38bdf8" strokeWidth="3" />
            <line x1="20" y1="26" x2="20" y2="42" stroke="#38bdf8" strokeWidth="2" />
            <line x1="60" y1="26" x2="60" y2="42" stroke="#38bdf8" strokeWidth="2" />
            <line x1="120" y1="34" x2="250" y2="34" stroke="#ef4444" strokeWidth="3" />
            <line x1="150" y1="26" x2="150" y2="42" stroke="#ef4444" strokeWidth="2" />
            <line x1="230" y1="26" x2="230" y2="42" stroke="#ef4444" strokeWidth="2" />
            <text x="260" y="38" fill="#ef4444" fontSize="10">stretched = receding</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="440" y="140" width="240" height="140" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="454" y="162" fill="#f59e0b" fontSize="11" fontWeight="bold">Big Bang picture:</text>
              <text x="454" y="184" fill="#e2e8f0" fontSize="11">t₀ ≈ 1/H₀ ≈ 14 billion yr</text>
              <text x="454" y="206" fill="#10b981" fontSize="10">CMB 2.7 K = cooled afterglow</text>
              <text x="454" y="226" fill="#94a3b8" fontSize="9.5">space itself expands — no centre</text>
              <text x="454" y="244" fill="#94a3b8" fontSize="9.5">H₀ ≈ 70 km s⁻¹ Mpc⁻¹</text>
              <text x="454" y="264" fill="#94a3b8" fontSize="9.5">local bound systems exempt</text>
            </g>
          )}
        </svg>
      );

    case "tv-coulomb-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Charges */}
          <circle cx="200" cy="180" r="30" fill="#ef4444" fillOpacity="0.7" stroke="#f87171" strokeWidth="3" />
          <text x="200" y="186" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">q₁</text>
          <circle cx="480" cy="180" r="30" fill="#38bdf8" fillOpacity="0.7" stroke="#38bdf8" strokeWidth="3" />
          <text x="480" y="186" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">q₂</text>
          {/* Forces (repulsive shown; note for attraction) */}
          <line x1="230" y1="130" x2="350" y2="130" stroke="#ef4444" strokeWidth="4" />
          <polygon points="356,130 342,124 342,136" fill="#ef4444" />
          <text x="255" y="118" fill="#ef4444" fontSize="11" fontWeight="bold">F on q₁</text>
          <line x1="450" y1="230" x2="330" y2="230" stroke="#38bdf8" strokeWidth="4" />
          <polygon points="324,230 338,224 338,236" fill="#38bdf8" />
          <text x="345" y="252" fill="#38bdf8" fontSize="11" fontWeight="bold">F on q₂ (equal &amp; opposite)</text>
          {/* Distance */}
          <line x1="200" y1="300" x2="480" y2="300" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
          <line x1="200" y1="290" x2="200" y2="310" stroke="#94a3b8" strokeWidth="2" />
          <line x1="480" y1="290" x2="480" y2="310" stroke="#94a3b8" strokeWidth="2" />
          <text x="316" y="322" fill="#cbd5e1" fontSize="12" fontWeight="bold">r</text>
          {/* Field lines */}
          <path d="M 232 165 Q 340 140 448 165" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          <path d="M 232 195 Q 340 220 448 195" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          {showAnnotations && (
            <g>
              <rect x="490" y="40" width="195" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="504" y="62" fill="#f59e0b" fontSize="11" fontWeight="bold">Coulomb's law:</text>
              <text x="504" y="86" fill="#e2e8f0" fontSize="12">F = kq₁q₂/r² · k = 9×10⁹</text>
              <text x="504" y="112" fill="#38bdf8" fontSize="11">medium: F → F/K</text>
              <text x="504" y="136" fill="#10b981" fontSize="10">superposition: ΣF = ΣFᵢ</text>
              <text x="504" y="158" fill="#94a3b8" fontSize="9.5">unlike signs ⇒ attraction</text>
              <text x="504" y="176" fill="#94a3b8" fontSize="9.5">~10³⁶ stronger than gravity</text>
            </g>
          )}
          <g>
            <rect x="40" y="40" width="220" height="66" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="54" y="62" fill="#10b981" fontSize="10" fontWeight="bold">Applications:</text>
            <text x="54" y="82" fill="#e2e8f0" fontSize="10">fields, potentials, capacitors,</text>
            <text x="54" y="98" fill="#e2e8f0" fontSize="10">electron–nucleus atomic bond</text>
          </g>
        </svg>
      );

    case "tv-ohm-limitations":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="90" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />
          <line x1="360" y1="320" x2="360" y2="40" stroke="#64748b" strokeWidth="2" />
          <text x="645" y="184" fill="#94a3b8" fontSize="11" fontWeight="bold">V</text>
          <text x="352" y="34" fill="#94a3b8" fontSize="11" fontWeight="bold">I</text>
          {/* Ohmic line */}
          <line x1="360" y1="180" x2="150" y2="70" stroke="#10b981" strokeWidth="3.5" />
          <line x1="360" y1="180" x2="570" y2="290" stroke="#10b981" strokeWidth="3.5" />
          <text x="480" y="265" fill="#10b981" fontSize="11" fontWeight="bold">ohmic (straight line)</text>
          <text x="170" y="88" fill="#10b981" fontSize="11" fontWeight="bold">R = const</text>
          {/* Filament curve */}
          <path d="M 360 180 Q 430 200 560 235" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <text x="470" y="228" fill="#f59e0b" fontSize="10.5" fontWeight="bold">filament (R↑ with heat)</text>
          {/* Diode curve */}
          <path d="M 355 60 L 355 150 Q 358 172 400 178 Q 520 186 620 188" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="420" y="150" fill="#ef4444" fontSize="10.5" fontWeight="bold">diode (knee 0.7 V)</text>
          <text x="180" y="210" fill="#ef4444" fontSize="9.5">reverse: tiny leakage</text>
          {showAnnotations && (
            <g>
              <rect x="90" y="230" width="250" height="110" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="104" y="252" fill="#38bdf8" fontSize="11" fontWeight="bold">Where Ohm's law fails:</text>
              <text x="104" y="274" fill="#e2e8f0" fontSize="10">self-heating (bulb), p-n junction,</text>
              <text x="104" y="292" fill="#e2e8f0" fontSize="10">thermistor, electrolytes, gas tubes</text>
              <text x="104" y="316" fill="#f59e0b" fontSize="10.5" fontWeight="bold">static R = V/I ≠ dynamic dV/dI</text>
              <text x="104" y="332" fill="#94a3b8" fontSize="9">origin of law: v_d = eEτ/m with τ, n fixed</text>
            </g>
          )}
        </svg>
      );

    case "tv-lenz-law":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Magnet falling into coil */}
          <rect x="150" y="40" width="70" height="46" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2.5" />
          <text x="185" y="68" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
          <rect x="150" y="86" width="70" height="40" rx="6" fill="#38bdf8" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="185" y="112" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">S</text>
          <line x1="185" y1="130" x2="185" y2="185" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-end)" />
          <text x="195" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold">v (falling)</text>
          {/* Coil */}
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx="185" cy={220 + i * 26} rx="65" ry="12" fill="none" stroke="#a855f7" strokeWidth="3" />
          ))}
          {/* Induced current direction */}
          <path d="M 250 246 A 65 12 0 0 1 120 246" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-end)" />
          <text x="270" y="250" fill="#10b981" fontSize="10" fontWeight="bold">induced I opposes</text>
          <text x="270" y="265" fill="#10b981" fontSize="10" fontWeight="bold">the approaching N</text>
          {/* Energy ledger */}
          {showAnnotations && (
            <g>
              <rect x="400" y="50" width="280" height="200" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="415" y="74" fill="#f59e0b" fontSize="11" fontWeight="bold">ε = −dΦ/dt (the minus!)</text>
              <text x="415" y="100" fill="#e2e8f0" fontSize="10.5">Flux growing ⇒ induced B opposes.</text>
              <text x="415" y="120" fill="#e2e8f0" fontSize="10.5">Flux shrinking ⇒ induced B supports.</text>
              <text x="415" y="150" fill="#38bdf8" fontSize="11" fontWeight="bold">Energy balance:</text>
              <text x="415" y="172" fill="#e2e8f0" fontSize="10.5">W(mech) = F·v·t = I²Rt (Joule heat)</text>
              <text x="415" y="196" fill="#ef4444" fontSize="10">If induced current HELPED the change:</text>
              <text x="415" y="214" fill="#ef4444" fontSize="10">runaway self-growth ⇒ perpetual motion</text>
              <text x="415" y="238" fill="#10b981" fontSize="10">Magnet in Cu pipe falls in slow motion</text>
            </g>
          )}
          <g>
            <rect x="400" y="270" width="280" height="60" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="415" y="292" fill="#10b981" fontSize="10.5" fontWeight="bold">Motional EMF (rod on rails): ε = Blv</text>
            <text x="415" y="312" fill="#94a3b8" fontSize="10">drag F = B²l²v/R — always opposing.</text>
          </g>
        </svg>
      );

    case "tv-transformer":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Core */}
          <rect x="220" y="70" width="260" height="220" rx="10" fill="none" stroke="#94a3b8" strokeWidth="10" opacity="0.5" />
          <text x="350" y="200" fill="#64748b" fontSize="11" textAnchor="middle">laminated iron core</text>
          {/* Primary */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx="250" cy={100 + i * 40} r="16" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
          ))}
          <text x="215" y="180" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="end">N₅=5</text>
          {/* Secondary */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="450" cy={120 + i * 60} r="16" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
          ))}
          <text x="485" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold">Nₛ=3</text>
          {/* AC source */}
          <circle cx="120" cy="180" r="26" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 104 180 Q 112 168 120 180 Q 128 192 136 180" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="120" y="222" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Vₚ (AC)</text>
          <line x1="146" y1="180" x2="234" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="466" y1="180" x2="560" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="585" cy="180" r="18" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="585" y="186" fill="#38bdf8" fontSize="12" textAnchor="middle">L</text>
          {/* Flux arrows */}
          <text x="350" y="96" fill="#a855f7" fontSize="10" textAnchor="middle">shared Φ (mutual induction)</text>
          {showAnnotations && (
            <g>
              <rect x="40" y="40" width="150" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="52" y="62" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Turns rule:</text>
              <text x="52" y="86" fill="#e2e8f0" fontSize="11">Vₛ/Vₚ = Nₛ/Nₚ</text>
              <text x="52" y="110" fill="#e2e8f0" fontSize="11">Iₛ/Iₚ = Nₚ/Nₛ</text>
              <text x="52" y="136" fill="#10b981" fontSize="9.5">step-up: V↑ I↓</text>
              <text x="52" y="154" fill="#10b981" fontSize="9.5">η ≈ 96–99%</text>
            </g>
          )}
          <g>
            <rect x="40" y="300" width="620" height="44" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#ef4444" strokeWidth="1.5" />
            <text x="56" y="320" fill="#ef4444" fontSize="10.5" fontWeight="bold">Losses: copper I²R · eddy currents (laminate the core!) · hysteresis (soft iron) · flux leakage.</text>
            <text x="56" y="337" fill="#94a3b8" fontSize="10">DC gives steady flux ⇒ dΦ/dt = 0 ⇒ no secondary EMF. Transformers are AC-only.</text>
          </g>
        </svg>
      );

    case "tv-huygens-principle":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Old wavefront */}
          <path d="M 150 80 Q 250 120 250 180 Q 250 240 150 280" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
          <text x="140" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">wavefront at t</text>
          {/* Wavelet sources */}
          {[100, 145, 180, 215, 250].map((y, i) => (
            <g key={i}>
              <circle cx="250" cy={y} r="4" fill="#f59e0b" />
              <circle cx="250" cy={y} r="34" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
            </g>
          ))}
          <text x="286" y="52" fill="#f59e0b" fontSize="10" fontWeight="bold">secondary wavelets (r = vΔt)</text>
          {/* New envelope */}
          <path d="M 284 80 Q 322 122 322 180 Q 322 238 284 280" fill="none" stroke="#10b981" strokeWidth="3.5" />
          <text x="330" y="180" fill="#10b981" fontSize="11" fontWeight="bold">new front (envelope)</text>
          {/* Direction arrow */}
          <line x1="180" y1="320" x2="290" y2="320" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-end)" />
          <text x="150" y="342" fill="#a855f7" fontSize="10" fontWeight="bold">propagation ⊥ wavefront (ray)</text>
          {showAnnotations && (
            <g>
              <rect x="440" y="60" width="240" height="180" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="454" y="84" fill="#38bdf8" fontSize="11" fontWeight="bold">Huygens' principle:</text>
              <text x="454" y="108" fill="#e2e8f0" fontSize="10.5">every front point = wavelet source</text>
              <text x="454" y="130" fill="#e2e8f0" fontSize="10.5">forward envelope = new front</text>
              <text x="454" y="158" fill="#f59e0b" fontSize="10.5">⇒ reflection: ∠i = ∠r</text>
              <text x="454" y="180" fill="#f59e0b" fontSize="10.5">⇒ refraction: sin i/sin r = v₁/v₂</text>
              <text x="454" y="208" fill="#10b981" fontSize="10">fronts: spherical (point), plane (far)</text>
              <text x="454" y="228" fill="#94a3b8" fontSize="9.5">bending at edges = diffraction</text>
            </g>
          )}
        </svg>
      );

    case "tv-bohr-model":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Nucleus */}
          <circle cx="230" cy="180" r="16" fill="#ef4444" />
          <text x="230" y="185" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>
          {/* Orbits n=1..3 */}
          <circle cx="230" cy="180" r="45" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="230" cy="180" r="80" fill="none" stroke="#10b981" strokeWidth="2" />
          <circle cx="230" cy="180" r="115" fill="none" stroke="#a855f7" strokeWidth="2" />
          <text x="230" y="142" fill="#38bdf8" fontSize="9" textAnchor="middle">n=1</text>
          <text x="230" y="107" fill="#10b981" fontSize="9" textAnchor="middle">n=2</text>
          <text x="230" y="72" fill="#a855f7" fontSize="9" textAnchor="middle">n=3</text>
          {/* Electron on n=3 */}
          <circle cx="345" cy="180" r="7" fill="#a855f7" stroke="#fff" strokeWidth="1.5" />
          {/* Transition arrow to n=2 */}
          <path d="M 330 168 Q 290 130 268 118" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          <circle cx="262" cy="112" r="7" fill="#f59e0b" />
          <text x="330" y="120" fill="#f59e0b" fontSize="10.5" fontWeight="bold">photon hν = E₃−E₂</text>
          {/* Energy level ladder */}
          <g transform="translate(440, 40)">
            <line x1="0" y1="240" x2="220" y2="240" stroke="#ef4444" strokeWidth="2.5" />
            <text x="8" y="232" fill="#ef4444" fontSize="10" fontWeight="bold">n=1: −13.6 eV</text>
            <line x1="0" y1="150" x2="220" y2="150" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="8" y="142" fill="#f59e0b" fontSize="10" fontWeight="bold">n=2: −3.4 eV</text>
            <line x1="0" y1="96" x2="220" y2="96" stroke="#a855f7" strokeWidth="2.5" />
            <text x="8" y="88" fill="#a855f7" fontSize="10" fontWeight="bold">n=3: −1.5 eV</text>
            <line x1="0" y1="10" x2="220" y2="10" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
            <text x="8" y="6" fill="#94a3b8" fontSize="10">n=∞: 0 eV (free)</text>
            <line x1="110" y1="96" x2="110" y2="150" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow-end-gold)" />
          </g>
          {showAnnotations && (
            <g>
              <rect x="40" y="300" width="620" height="46" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="56" y="320" fill="#38bdf8" fontSize="10.5" fontWeight="bold">mvr = nℏ ⇒ rₙ = 0.529n² Å · Eₙ = −13.6/n² eV · 1/λ = R(1/nf² − 1/ni²)</text>
              <text x="56" y="337" fill="#94a3b8" fontSize="10">Series: Lyman UV (nf=1) · Balmer visible (nf=2) · Paschen IR (nf=3) · H-like ions: ×Z².</text>
            </g>
          )}
        </svg>
      );

    case "tv-gauss-flux":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Point charge */}
          <circle cx="200" cy="180" r="14" fill="#ef4444" />
          <text x="200" y="185" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">+q</text>
          {/* Gaussian sphere */}
          <circle cx="200" cy="180" r="90" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="130" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">Gaussian surface</text>
          {/* Outward field lines with flux ticks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 200 + 20 * Math.cos(rad), y1 = 180 + 20 * Math.sin(rad);
            const x2 = 200 + 125 * Math.cos(rad), y2 = 180 + 125 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.8" markerEnd="url(#arrow-end-gold)" />;
          })}
          {/* Exterior charge ignored */}
          <circle cx="540" cy="120" r="12" fill="#38bdf8" />
          <text x="540" y="94" fill="#94a3b8" fontSize="9.5" textAnchor="middle">exterior q</text>
          <text x="540" y="150" fill="#94a3b8" fontSize="9.5" textAnchor="middle">net flux = 0</text>
          {showAnnotations && (
            <g>
              <rect x="420" y="180" width="260" height="160" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="434" y="204" fill="#f59e0b" fontSize="11" fontWeight="bold">Gauss's law:</text>
              <text x="434" y="228" fill="#e2e8f0" fontSize="12">∮E·dA = q_enc/ε₀</text>
              <text x="434" y="254" fill="#10b981" fontSize="10">sphere: E = kq/r² (out), kqr/R³ (in)</text>
              <text x="434" y="274" fill="#10b981" fontSize="10">line: E = λ/2πε₀r · sheet: σ/2ε₀</text>
              <text x="434" y="300" fill="#94a3b8" fontSize="9.5">4π steradians — every line exits once</text>
              <text x="434" y="320" fill="#94a3b8" fontSize="9.5">shape-independent, exterior-blind</text>
            </g>
          )}
        </svg>
      );

    case "tv-ohm-resistivity":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Wire geometry */}
          <rect x="80" y="70" width="360" height="40" rx="6" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="80" y1="130" x2="440" y2="130" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-end)" />
          <text x="230" y="150" fill="#cbd5e1" fontSize="11" fontWeight="bold">length l (double ⇒ R doubles)</text>
          <line x1="80" y1="60" x2="80" y2="120" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="88" y="58" fill="#38bdf8" fontSize="10.5" fontWeight="bold">area A (double ⇒ R halves)</text>
          {/* Formula card */}
          {showAnnotations && (
            <g>
              <rect x="80" y="180" width="280" height="160" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="94" y="204" fill="#38bdf8" fontSize="11" fontWeight="bold">R = ρl/A · σ = 1/ρ</text>
              <text x="94" y="228" fill="#e2e8f0" fontSize="10">ρ: Cu 1.7×10⁻⁸ · glass ~10¹² Ω m</text>
              <text x="94" y="250" fill="#e2e8f0" fontSize="10">V = IR (from v_d = eEτ/m)</text>
              <text x="94" y="274" fill="#f59e0b" fontSize="10.5">ρ = ρ₀(1+αΔT) — metals α&gt;0</text>
              <text x="94" y="296" fill="#ef4444" fontSize="10.5">stretched n× longer: R → n²R</text>
              <text x="94" y="318" fill="#94a3b8" fontSize="9.5">series ΣR · parallel 1/R = Σ1/Rᵢ</text>
            </g>
          )}
          {/* Resistivity ladder */}
          <g transform="translate(420, 60)">
            <rect x="0" y="0" width="240" height="240" rx="8" fill="#0b1220" fillOpacity="0.85" stroke="#10b981" strokeWidth="2" />
            <text x="120" y="26" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Material ladder (ρ, Ω m)</text>
            <text x="16" y="56" fill="#38bdf8" fontSize="10.5">Cu · Ag — 10⁻⁸ (conductors)</text>
            <text x="16" y="86" fill="#a855f7" fontSize="10.5">Si · Ge — 10⁻⁵…10² (semi)</text>
            <text x="16" y="116" fill="#ef4444" fontSize="10.5">glass · mica — 10⁸+ (insulators)</text>
            <text x="16" y="150" fill="#fbbf24" fontSize="10" fontWeight="bold">σ = ne²τ/m (microscopic)</text>
            <text x="16" y="176" fill="#94a3b8" fontSize="9.5">conductors: τ↓ when hot ⇒ ρ↑</text>
            <text x="16" y="196" fill="#94a3b8" fontSize="9.5">semiconductors: n↑ beats τ↓</text>
            <text x="16" y="222" fill="#10b981" fontSize="9.5">NTC thermistor = semiconductor α&lt;0</text>
          </g>
        </svg>
      );

    case "tv-ohmic-nonohmic":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <line x1="80" y1="180" x2="650" y2="180" stroke="#64748b" strokeWidth="2" />
          <line x1="200" y1="320" x2="200" y2="40" stroke="#64748b" strokeWidth="2" />
          <text x="654" y="184" fill="#94a3b8" fontSize="11" fontWeight="bold">V</text>
          <text x="192" y="34" fill="#94a3b8" fontSize="11" fontWeight="bold">I</text>
          {/* Ohmic */}
          <line x1="200" y1="180" x2="480" y2="70" stroke="#10b981" strokeWidth="3.5" />
          <text x="430" y="60" fill="#10b981" fontSize="11" fontWeight="bold">metal (ohmic): straight</text>
          {/* Filament */}
          <path d="M 200 180 Q 300 168 470 130" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <text x="330" y="112" fill="#f59e0b" fontSize="10.5" fontWeight="bold">filament: bends (R↑)</text>
          {/* Thermistor */}
          <path d="M 200 180 Q 280 210 430 265" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <text x="300" y="250" fill="#38bdf8" fontSize="10.5" fontWeight="bold">thermistor: bends up (R↓)</text>
          {/* Diode */}
          <path d="M 200 180 L 200 120 Q 202 96 240 90 Q 380 82 620 78" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="420" y="94" fill="#ef4444" fontSize="10.5" fontWeight="bold">diode: knee + one-way</text>
          {showAnnotations && (
            <g>
              <rect x="480" y="200" width="200" height="140" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
              <text x="494" y="224" fill="#a855f7" fontSize="10.5" fontWeight="bold">Reading the graph:</text>
              <text x="494" y="246" fill="#e2e8f0" fontSize="10">static R = V/I (origin line)</text>
              <text x="494" y="266" fill="#e2e8f0" fontSize="10">dynamic r = dV/dI (tangent)</text>
              <text x="494" y="292" fill="#f59e0b" fontSize="10">identify device by shape alone</text>
              <text x="494" y="312" fill="#94a3b8" fontSize="9.5">reverse leakage exists (≈nA)</text>
            </g>
          )}
        </svg>
      );

    case "tv-aufbau-pauli-hund":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Energy ladder */}
          <g transform="translate(60, 40)">
            {([
              ["1s", 250, "#ef4444"], ["2s", 210, "#f59e0b"], ["2p", 175, "#10b981"],
              ["3s", 140, "#38bdf8"], ["3p", 105, "#a855f7"], ["4s", 75, "#fbbf24"], ["3d", 45, "#64748b"],
            ] as [string, number, string][]).map(([label, y, color]) => (
              <g key={label}>
                <line x1="0" y1={y} x2="120" y2={y} stroke={color} strokeWidth="3" />
                <text x="128" y={y + 4} fill={color} fontSize="10.5" fontWeight="bold">{label}</text>
              </g>
            ))}
            <text x="0" y="285" fill="#94a3b8" fontSize="9.5">energy ↑ · order 1s→2s→2p→3s→3p→4s→3d</text>
          </g>
          {/* Orbital boxes */}
          <g transform="translate(320, 60)">
            <text x="0" y="0" fill="#10b981" fontSize="11" fontWeight="bold">Hund: 2p³ of nitrogen</text>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={i * 46} y="14" width="36" height="30" fill="none" stroke="#10b981" strokeWidth="2" />
                <text x={i * 46 + 18} y="36" fill="#e2e8f0" fontSize="13" textAnchor="middle">↑</text>
              </g>
            ))}
            <text x="0" y="70" fill="#94a3b8" fontSize="9">singly, parallel spins — paramagnetic</text>
            <text x="0" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold">Pauli: one orbital</text>
            <rect x="0" y="124" width="36" height="30" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x="18" y="146" fill="#e2e8f0" fontSize="13" textAnchor="middle">↑↓</text>
            <text x="0" y="180" fill="#94a3b8" fontSize="9">max 2 e⁻, opposite spins (shell 2n²)</text>
            <text x="0" y="220" fill="#f59e0b" fontSize="11" fontWeight="bold">Exceptions (exchange energy)</text>
            <text x="0" y="244" fill="#e2e8f0" fontSize="10.5">Cr: [Ar]3d⁵4s¹ · Cu: [Ar]3d¹⁰4s¹</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="470" y="60" width="210" height="220" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="484" y="84" fill="#f59e0b" fontSize="11" fontWeight="bold">The three rules:</text>
              <text x="484" y="108" fill="#e2e8f0" fontSize="10">1. Aufbau (n+l) — lowest first</text>
              <text x="484" y="130" fill="#e2e8f0" fontSize="10">2. Pauli — 2 e⁻/orbital max</text>
              <text x="484" y="152" fill="#e2e8f0" fontSize="10">3. Hund — spread before pairing</text>
              <text x="484" y="180" fill="#38bdf8" fontSize="10">Fe: [Ar]4s²3d⁶ (4 unpaired)</text>
              <text x="484" y="204" fill="#10b981" fontSize="10">4s fills first, IONIZES first</text>
              <text x="484" y="228" fill="#a855f7" fontSize="10">μ = √(n(n+2)) μ_B (spin-only)</text>
              <text x="484" y="256" fill="#94a3b8" fontSize="9">configurations up to Z = 30 required</text>
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
}

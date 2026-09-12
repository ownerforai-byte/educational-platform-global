"use client";

import React, { useState } from "react";
import { Sparkles, Sliders, Eye, RotateCcw, CheckCircle2 } from "lucide-react";

interface DerivationVisualProps {
  visualType: string;
  title?: string;
  className?: string;
}

export function DerivationVisual({
  visualType,
  title,
  className = "",
}: DerivationVisualProps) {
  // Interactive states for specific visuals
  const [interactiveParam, setInteractiveParam] = useState<number>(45); // Angle or slider
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  // Render specific SVG by visualType
  const renderVisualContent = () => {
    switch (visualType) {
      // ─────────────────────────────────────────────────────────────
      // 1. MATHEMATICS VISUALS
      // ─────────────────────────────────────────────────────────────
      case "point-to-line-distance":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Coordinate Axes */}
            <line x1="50" y1="300" x2="650" y2="300" stroke="#64748b" strokeWidth="2" />
            <line x1="180" y1="340" x2="180" y2="30" stroke="#64748b" strokeWidth="2" />
            <text x="655" y="304" fill="#94a3b8" fontSize="11" fontWeight="bold">X</text>
            <text x="180" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Y</text>
            <text x="165" y="315" fill="#94a3b8" fontSize="10">O(0,0)</text>

            {/* Line L: Ax + By + C = 0 passing through Q(440, 300) and R(180, 80) */}
            <line x1="120" y1="30" x2="490" y2="340" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <text x="500" y="335" fill="#38bdf8" fontSize="12" fontWeight="bold">Line L: Ax + By + C = 0</text>

            {/* Intercepts */}
            <circle cx="440" cy="300" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x="440" y="322" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Q(-C/A, 0)</text>

            <circle cx="180" cy="80" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x="105" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">R(0, -C/B)</text>

            {/* Point P(x1, y1) */}
            <circle cx="390" cy="85" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="400" y="80" fill="#ef4444" fontSize="13" fontWeight="bold">P(x₁, y₁)</text>

            {/* Normal / Perpendicular segment PM */}
            <line x1="390" y1="85" x2="310" y2="190" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
            <circle cx="310" cy="190" r="4" fill="#f59e0b" />
            <text x="318" y="210" fill="#f59e0b" fontSize="11" fontWeight="bold">M</text>

            {/* Right angle symbol at M */}
            <path d="M 302 178 L 314 170 L 322 182" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="365" y="145" fill="#f59e0b" fontSize="13" fontWeight="black">p (Length of ⟂)</text>

            {/* Triangle Area Construction PQR */}
            <polygon points="390,85 180,80 440,300" fill="#a855f7" fillOpacity="0.08" />
            <line x1="390" y1="85" x2="180" y2="80" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="390" y1="85" x2="440" y2="300" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Proof Card */}
            {showAnnotations && (
              <g>
                <rect x="420" y="25" width="265" height="95" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="435" y="46" fill="#f59e0b" fontSize="11" fontWeight="bold">Geometric Area Proof:</text>
                <text x="435" y="64" fill="#e2e8f0" fontSize="10">Area(ΔPQR) = ½ · Base(QR) · Height(p)</text>
                <text x="435" y="80" fill="#cbd5e1" fontSize="10">Base QR = (|C|/|AB|) √(A² + B²)</text>
                <text x="435" y="102" fill="#38bdf8" fontSize="12" fontWeight="bold">p = |Ax₁ + By₁ + C| / √(A² + B²)</text>
              </g>
            )}
          </svg>
        );

      case "pair-of-lines":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Coordinate Axes */}
            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />
            <line x1="350" y1="330" x2="350" y2="30" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="184" fill="#94a3b8" fontSize="11" fontWeight="bold">X</text>
            <text x="350" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Y</text>
            <text x="335" y="196" fill="#94a3b8" fontSize="10">O(0,0)</text>

            {/* Line 1: y = m1 x */}
            <line x1="80" y1="305" x2="620" y2="55" stroke="#38bdf8" strokeWidth="3" />
            <text x="600" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">L₁: y - m₁x = 0</text>

            {/* Line 2: y = m2 x */}
            <line x1="220" y1="330" x2="480" y2="30" stroke="#a855f7" strokeWidth="3" />
            <text x="490" y="35" fill="#a855f7" fontSize="12" fontWeight="bold">L₂: y - m₂x = 0</text>

            {/* Angle theta arc between L1 and L2 */}
            <path d="M 400 157 A 55 55 0 0 0 380 115" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="410" y="130" fill="#f59e0b" fontSize="13" fontWeight="bold">θ</text>

            {/* Homogeneous Equation Banner */}
            <rect x="45" y="35" width="275" height="95" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="60" y="58" fill="#38bdf8" fontSize="11" fontWeight="bold">Homogeneous Equation 2nd Degree:</text>
            <text x="60" y="77" fill="#e2e8f0" fontSize="11" fontWeight="bold">ax² + 2hxy + by² = 0</text>
            <text x="60" y="95" fill="#cbd5e1" fontSize="10">m₁ + m₂ = -2h/b,  m₁m₂ = a/b</text>
            <text x="60" y="115" fill="#f59e0b" fontSize="12" fontWeight="bold">tan θ = ± 2√(h² - ab) / (a + b)</text>

            {/* Exam Conditions Box */}
            <rect x="45" y="230" width="275" height="85" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="60" y="252" fill="#10b981" fontSize="11" fontWeight="bold">Crucial NEB Board Conditions:</text>
            <text x="60" y="272" fill="#e2e8f0" fontSize="10">Lines Perpendicular (θ = 90°): <tspan fill="#ef4444" fontWeight="bold">a + b = 0</tspan></text>
            <text x="60" y="292" fill="#e2e8f0" fontSize="10">Lines Coincident (θ = 0°): <tspan fill="#fbbf24" fontWeight="bold">h² - ab = 0</tspan></text>
          </svg>
        );

      case "limit-sin-x":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Unit Circle Arc Center O(130, 260) */}
            <line x1="80" y1="260" x2="620" y2="260" stroke="#64748b" strokeWidth="2" />
            <line x1="130" y1="300" x2="130" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="112" y="275" fill="#94a3b8" fontSize="11" fontWeight="bold">O(0,0)</text>

            {/* Unit Circle Arc r = 210 */}
            <path d="M 340 260 A 210 210 0 0 0 295 130" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="340" cy="260" r="4" fill="#38bdf8" />
            <text x="345" y="280" fill="#38bdf8" fontSize="11" fontWeight="bold">D(1, 0)</text>

            {/* Point A on unit circle */}
            <circle cx="295" cy="130" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <line x1="130" y1="260" x2="295" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="290" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold">A(cos θ, sin θ)</text>

            {/* Perpendicular AB from A to X-axis */}
            <line x1="295" y1="130" x2="295" y2="260" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="295" cy="260" r="4" fill="#ef4444" />
            <text x="298" y="278" fill="#ef4444" fontSize="11" fontWeight="bold">B</text>
            <text x="303" y="195" fill="#ef4444" fontSize="11" fontWeight="bold">AB = sin θ</text>

            {/* Tangent at D to meet ray OA extended at C */}
            <line x1="130" y1="260" x2="365" y2="75" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="340" y1="260" x2="340" y2="95" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="340" cy="95" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="345" y="90" fill="#10b981" fontSize="12" fontWeight="bold">C(1, tan θ)</text>
            <text x="350" y="175" fill="#10b981" fontSize="11" fontWeight="bold">CD = tan θ</text>

            {/* Shaded Areas */}
            <polygon points="130,260 295,130 295,260" fill="#ef4444" fillOpacity="0.15" />
            <polygon points="130,260 340,95 340,260" fill="#10b981" fillOpacity="0.08" />

            {/* Angle theta arc */}
            <path d="M 180 260 A 50 50 0 0 0 170 228" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <text x="190" y="245" fill="#fbbf24" fontSize="12" fontWeight="bold">θ</text>

            {/* Sandwich / Squeeze Theorem Inscription */}
            <rect x="420" y="35" width="265" height="150" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="435" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold">Geometric Squeeze / Sandwich:</text>
            <text x="435" y="82" fill="#cbd5e1" fontSize="10">Area(ΔOAB) &lt; Sector(OAD) &lt; Area(ΔOCD)</text>
            <text x="435" y="102" fill="#e2e8f0" fontSize="10">½·1·sin θ &lt; ½·1²·θ &lt; ½·1·tan θ</text>
            <text x="435" y="122" fill="#fbbf24" fontSize="10">sin θ &lt; θ &lt; tan θ ⟹ cos θ &lt; (sin θ)/θ &lt; 1</text>
            <text x="435" y="148" fill="#34d399" fontSize="13" fontWeight="extrabold">lim[θ→0] (sin θ / θ) = 1 (Q.E.D.)</text>
          </svg>
        );

      case "trapezoidal-rule":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Coordinate Axes */}
            <line x1="60" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="2" />
            <line x1="80" y1="320" x2="80" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="304" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
            <text x="80" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">y = f(x)</text>

            {/* Continuous Curve y = f(x) */}
            <path d="M 120 220 Q 220 70 380 90 T 580 180" fill="none" stroke="#38bdf8" strokeWidth="3" />

            {/* Trapezoidal Slices */}
            <polygon points="140,300 140,195 220,135 220,300" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
            <polygon points="220,300 220,135 300,95 300,300" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="1.5" />
            <polygon points="300,300 300,95 380,90 380,300" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="380,300 380,90 460,118 460,300" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
            <polygon points="460,300 460,118 540,165 540,300" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" />

            {/* Chords / Trapezoid Tops */}
            <line x1="140" y1="195" x2="220" y2="135" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="220" y1="135" x2="300" y2="95" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="300" y1="95" x2="380" y2="90" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="380" y1="90" x2="460" y2="118" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="460" y1="118" x2="540" y2="165" stroke="#ffffff" strokeWidth="2.5" />

            {/* Ordinates dots & labels */}
            <circle cx="140" cy="195" r="4" fill="#ffffff" />
            <text x="140" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₀</text>
            <text x="140" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₀=a</text>

            <circle cx="220" cy="135" r="4" fill="#ffffff" />
            <text x="220" y="125" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₁</text>
            <text x="220" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₁</text>

            <circle cx="300" cy="95" r="4" fill="#ffffff" />
            <text x="300" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₂</text>
            <text x="300" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₂</text>

            <circle cx="380" cy="90" r="4" fill="#ffffff" />
            <text x="380" y="80" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₃</text>
            <text x="380" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₃</text>

            <circle cx="460" cy="118" r="4" fill="#ffffff" />
            <text x="460" y="108" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₄</text>
            <text x="460" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₄</text>

            <circle cx="540" cy="165" r="4" fill="#ffffff" />
            <text x="540" y="155" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">y₅</text>
            <text x="540" y="316" fill="#94a3b8" fontSize="10" textAnchor="middle">x₅=b</text>

            {/* Step size h */}
            <line x1="220" y1="285" x2="300" y2="285" stroke="#f59e0b" strokeWidth="2" />
            <text x="260" y="280" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">h = (b-a)/n</text>

            {/* Formula Banner */}
            <rect x="170" y="25" width="400" height="42" rx="8" fill="#0f172a" fillOpacity="0.95" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="370" y="51" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
              ∫ₐᵇ f(x)dx ≈ (h/2) [ (y₀ + yₙ) + 2(y₁ + y₂ + ... + yₙ₋₁) ]
            </text>
          </svg>
        );

      case "am-gm-hm":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Diameter Base AB */}
            <line x1="110" y1="260" x2="590" y2="260" stroke="#64748b" strokeWidth="2.5" />

            {/* Semicircle Arc R = 240 */}
            <path d="M 590 260 A 240 240 0 0 0 110 260" fill="none" stroke="#38bdf8" strokeWidth="3" />

            {/* Points A, D, M, B */}
            <circle cx="110" cy="260" r="5" fill="#38bdf8" />
            <text x="95" y="280" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>

            <circle cx="590" cy="260" r="5" fill="#38bdf8" />
            <text x="595" y="280" fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>

            <circle cx="350" cy="260" r="5" fill="#10b981" />
            <text x="350" y="280" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">M (Center)</text>

            <circle cx="230" cy="260" r="5" fill="#f59e0b" />
            <text x="230" y="280" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">D</text>

            {/* Radius MC = AM = (a+b)/2 */}
            <line x1="350" y1="260" x2="350" y2="20" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" />
            <circle cx="350" cy="20" r="5" fill="#10b981" />
            <text x="360" y="40" fill="#10b981" fontSize="12" fontWeight="bold">Radius MC = AM = (a + b)/2</text>

            {/* Altitude CD = GM = √(ab) */}
            <line x1="230" y1="260" x2="230" y2="52" stroke="#f59e0b" strokeWidth="3.5" />
            <circle cx="230" cy="52" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="215" y="45" fill="#f59e0b" fontSize="12" fontWeight="bold">C</text>
            <text x="135" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">CD = GM = √(ab)</text>

            {/* Right angle at D */}
            <path d="M 230 245 L 245 245 L 245 260" fill="none" stroke="#f59e0b" strokeWidth="2" />

            {/* Segment MC and Projection HM */}
            <line x1="350" y1="260" x2="230" y2="52" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="230" y1="52" x2="310" y2="190" stroke="#a855f7" strokeWidth="2.5" />
            <text x="320" y="160" fill="#a855f7" fontSize="11" fontWeight="bold">HM = 2ab/(a+b)</text>

            {/* Segments a and b */}
            <line x1="110" y1="295" x2="230" y2="295" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="312" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Segment a</text>

            <line x1="230" y1="295" x2="590" y2="295" stroke="#cbd5e1" strokeWidth="2" />
            <text x="410" y="312" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Segment b</text>

            {/* Inscription Card */}
            <rect x="425" y="55" width="260" height="95" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="440" y="78" fill="#10b981" fontSize="11" fontWeight="bold">Geometric Theorem Hierarchy:</text>
            <text x="440" y="96" fill="#cbd5e1" fontSize="10">Hypotenuse MC (AM) ≥ Altitude CD (GM)</text>
            <text x="440" y="116" fill="#f59e0b" fontSize="13" fontWeight="extrabold">AM ≥ GM ≥ HM</text>
            <text x="440" y="136" fill="#38bdf8" fontSize="11" fontWeight="bold">Canonical Identity: G² = A · H</text>
          </svg>
        );

      case "lmvt-rolle":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Background Grid */}
            <defs>
              <pattern id="grid-lmvt" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.05" />
              </pattern>
            </defs>
            <rect width="700" height="360" fill="url(#grid-lmvt)" />

            {/* Axes */}
            <line x1="60" y1="310" x2="640" y2="310" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="90" y1="330" x2="90" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="645" y="315" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
            <text x="90" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">y</text>

            {/* Smooth Curve y = f(x) */}
            <path
              d="M 140 250 C 220 70, 360 80, 520 180"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Point A (a, f(a)) */}
            <circle cx="140" cy="250" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <line x1="140" y1="250" x2="140" y2="310" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="140" y="326" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="120" y="245" fill="#38bdf8" fontSize="11" fontWeight="bold">A(a, f(a))</text>

            {/* Point B (b, f(b)) */}
            <circle cx="520" cy="180" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <line x1="520" y1="180" x2="520" y2="310" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="520" y="326" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">b</text>
            <text x="530" y="175" fill="#38bdf8" fontSize="11" fontWeight="bold">B(b, f(b))</text>

            {/* Secant Chord AB */}
            <line x1="100" y1="257.4" x2="560" y2="172.6" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="350" y="235" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">
              Secant Slope = [f(b) - f(a)] / (b - a)
            </text>

            {/* Intermediate Point C (c, f(c)) with parallel tangent */}
            <circle cx="280" cy="116" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <line x1="280" y1="116" x2="280" y2="310" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="280" y="326" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">c</text>

            {/* Parallel Tangent Line at Point C */}
            <line x1="140" y1="142" x2="420" y2="90" stroke="#f59e0b" strokeWidth="3" />
            <text x="280" y="85" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
              Parallel Tangent: f'(c) = Secant Slope
            </text>

            {showAnnotations && (
              <g>
                <rect x="390" y="35" width="280" height="60" rx="8" fill="#0f172a" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="405" y="55" fill="#fbbf24" fontSize="10" fontWeight="bold">Geometric Interpretation:</text>
                <text x="405" y="70" fill="#cbd5e1" fontSize="9">Tangents at peak or trough match average secant.</text>
                <text x="405" y="85" fill="#38bdf8" fontSize="9">Rolle's: When f(a) = f(b), secant is horizontal (f'(c) = 0).</text>
              </g>
            )}
          </svg>
        );

      case "ftc-calculus":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="60" y1="310" x2="640" y2="310" stroke="#64748b" strokeWidth="2" />
            <line x1="90" y1="330" x2="90" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="315" fill="#94a3b8" fontSize="11" fontWeight="bold">t</text>
            <text x="90" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">f(t)</text>

            {/* Area under curve from a to x */}
            <path
              d="M 160 310 L 160 210 Q 280 100 420 170 L 420 310 Z"
              fill="#38bdf8"
              fillOpacity="0.25"
              stroke="none"
            />

            {/* Thin Differential Area Strip at x with width h */}
            <rect x="420" y="170" width="35" height="140" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
            <line x1="420" y1="170" x2="455" y2="170" stroke="#fbbf24" strokeWidth="2.5" />
            <text x="437" y="160" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">f(c)</text>
            <text x="437" y="326" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">h</text>

            {/* Curve y = f(t) */}
            <path
              d="M 120 240 Q 280 90 560 200"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
            />
            <text x="570" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold">y = f(t)</text>

            {/* Labels */}
            <text x="160" y="326" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="420" y="326" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">x</text>
            <text x="455" y="326" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">x+h</text>

            <text x="280" y="250" fill="#0284c7" fontSize="14" fontWeight="bold" textAnchor="middle">
              F(x) = ∫ₐˣ f(t) dt
            </text>

            {/* Floating Annotation Box */}
            <rect x="360" y="40" width="310" height="75" rx="10" fill="#0f172a" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="375" y="62" fill="#38bdf8" fontSize="11" fontWeight="bold">Fundamental Theorem of Calculus:</text>
            <text x="375" y="80" fill="#e2e8f0" fontSize="10">ΔArea ≈ f(c) · h  ⟹  dF/dx = lim (ΔArea / h) = f(x)</text>
            <text x="375" y="98" fill="#a855f7" fontSize="10" fontWeight="semibold">Conclusion: Differentiation precisely reverses integration.</text>
          </svg>
        );

      case "demoivre-roots":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Center origin (350, 180) */}
            <circle cx="350" cy="180" r="120" fill="#0f172a" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />

            {/* Axes */}
            <line x1="160" y1="180" x2="540" y2="180" stroke="#64748b" strokeWidth="2" />
            <line x1="350" y1="320" x2="350" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="545" y="184" fill="#94a3b8" fontSize="11" fontWeight="bold">Re</text>
            <text x="350" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Im</text>

            {/* Roots of Unity: n = 3 (Cube roots at 0°, 120°, 240°) forming equilateral triangle */}
            <polygon
              points="470,180 290,76 290,284"
              fill="#38bdf8"
              fillOpacity="0.1"
              stroke="#38bdf8"
              strokeWidth="2"
            />

            {/* Root 1: 1 + 0i (0 deg) */}
            <circle cx="470" cy="180" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="485" y="185" fill="#10b981" fontSize="12" fontWeight="bold">z₀ = 1</text>

            {/* Root 2: ω = e^(i 2π/3) (-1/2 + i√3/2) */}
            <circle cx="290" cy="76" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="220" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">z₁ = ω = e^(i2π/3)</text>
            <line x1="350" y1="180" x2="290" y2="76" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Root 3: ω² = e^(i 4π/3) (-1/2 - i√3/2) */}
            <circle cx="290" cy="284" r="7" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
            <text x="210" y="295" fill="#a855f7" fontSize="12" fontWeight="bold">z₂ = ω² = e^(i4π/3)</text>
            <line x1="350" y1="180" x2="290" y2="284" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Unit Radius Annotation */}
            <text x="410" y="170" fill="#38bdf8" fontSize="10" fontWeight="bold">r = 1</text>

            {/* Info Badge */}
            <rect x="490" y="40" width="190" height="75" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#10b981" strokeWidth="1.5" />
            <text x="505" y="60" fill="#10b981" fontSize="11" fontWeight="bold">Roots of Unity Properties:</text>
            <text x="505" y="78" fill="#e2e8f0" fontSize="10">Sum: 1 + ω + ω² = 0</text>
            <text x="505" y="94" fill="#e2e8f0" fontSize="10">Product: (1)(ω)(ω²) = 1</text>
          </svg>
        );

      case "conic-parabola":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="80" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />
            <line x1="260" y1="330" x2="260" y2="30" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="185" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
            <text x="260" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">y</text>

            {/* Directrix Line x = -a */}
            <line x1="160" y1="40" x2="160" y2="320" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 3" />
            <text x="150" y="55" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="end">Directrix x = -a</text>

            {/* Parabola Curve y² = 4ax opening right from vertex (260, 180) */}
            <path
              d="M 580 40 Q 260 110 260 180 Q 260 250 580 320"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Vertex V(0,0) */}
            <circle cx="260" cy="180" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x="270" y="195" fill="#38bdf8" fontSize="11" fontWeight="bold">V(0,0)</text>

            {/* Focus S(a, 0) */}
            <circle cx="360" cy="180" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="365" y="198" fill="#f59e0b" fontSize="11" fontWeight="bold">S(a, 0)</text>

            {/* Latus Rectum Chord */}
            <line x1="360" y1="80" x2="360" y2="280" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="360" cy="80" r="4" fill="#c084fc" />
            <circle cx="360" cy="280" r="4" fill="#c084fc" />
            <text x="370" y="85" fill="#c084fc" fontSize="10" fontWeight="bold">Latus Rectum = 4a</text>

            {/* Arbitrary Point P(x, y) */}
            <circle cx="480" cy="95" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="490" y="90" fill="#10b981" fontSize="12" fontWeight="bold">P(x, y)</text>

            {/* Segment SP */}
            <line x1="360" y1="180" x2="480" y2="95" stroke="#10b981" strokeWidth="2.5" />
            {/* Segment PM perpendicular to directrix */}
            <line x1="480" y1="95" x2="160" y2="95" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />
            <circle cx="160" cy="95" r="4" fill="#ef4444" />
            <text x="135" y="98" fill="#ef4444" fontSize="10" fontWeight="bold">M(-a, y)</text>

            {/* Invariant Note */}
            <rect x="420" y="240" width="250" height="70" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#10b981" strokeWidth="1.5" />
            <text x="435" y="262" fill="#10b981" fontSize="11" fontWeight="bold">Parabola Geometric Invariant:</text>
            <text x="435" y="280" fill="#e2e8f0" fontSize="10">SP = PM  ⟹  Distance to Focus =</text>
            <text x="435" y="296" fill="#38bdf8" fontSize="10">Perpendicular Distance to Directrix (e = 1)</text>
          </svg>
        );

      case "bayes-theorem":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Tree Diagram */}
            {/* Root */}
            <circle cx="100" cy="180" r="18" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="100" y="185" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">S</text>

            {/* Branch 1 to B1 */}
            <line x1="118" y1="170" x2="260" y2="90" stroke="#38bdf8" strokeWidth="3" />
            <text x="175" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold">P(B₁)</text>
            <circle cx="270" cy="85" r="16" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <text x="270" y="89" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">B₁</text>

            {/* Branch 2 to B2 */}
            <line x1="118" y1="190" x2="260" y2="270" stroke="#a855f7" strokeWidth="3" />
            <text x="175" y="250" fill="#a855f7" fontSize="11" fontWeight="bold">P(B₂)</text>
            <circle cx="270" cy="275" r="16" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
            <text x="270" y="279" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">B₂</text>

            {/* B1 to Evidence A */}
            <line x1="286" y1="85" x2="440" y2="55" stroke="#10b981" strokeWidth="2.5" />
            <text x="350" y="60" fill="#10b981" fontSize="10" fontWeight="bold">P(A|B₁)</text>
            <rect x="445" y="42" width="75" height="26" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <text x="482" y="59" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A ∩ B₁</text>

            {/* B2 to Evidence A */}
            <line x1="286" y1="275" x2="440" y2="245" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="350" y="250" fill="#f59e0b" fontSize="10" fontWeight="bold">P(A|B₂)</text>
            <rect x="445" y="232" width="75" height="26" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="482" y="249" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A ∩ B₂</text>

            {/* Total Probability Sum */}
            <path d="M 525 55 C 570 55, 570 245, 525 245" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="550" y="130" width="135" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="617" y="152" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Total Evidence P(A):</text>
            <text x="617" y="172" fill="#e2e8f0" fontSize="9" textAnchor="middle">P(B₁)P(A|B₁) + P(B₂)P(A|B₂)</text>
          </svg>
        );

      // ─────────────────────────────────────────────────────────────
      // 2. PHYSICS VISUALS
      // ─────────────────────────────────────────────────────────────
      case "projectile-motion":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Ground */}
            <line x1="60" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="2.5" />
            <line x1="80" y1="320" x2="80" y2="40" stroke="#64748b" strokeWidth="2" />

            {/* Parabolic Trajectory */}
            <path
              d="M 80 300 Q 340 40 600 300"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Launch Velocity Vector u */}
            <line x1="80" y1="300" x2="170" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="180" y="200" fill="#f59e0b" fontSize="12" fontWeight="bold">u</text>

            {/* Velocity Components at Launch */}
            <line x1="80" y1="300" x2="170" y2="300" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            <text x="125" y="316" fill="#38bdf8" fontSize="10" fontWeight="bold">u_x = u cos θ</text>
            <line x1="170" y1="300" x2="170" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <text x="175" y="255" fill="#ef4444" fontSize="10" fontWeight="bold">u_y = u sin θ</text>

            {/* Launch Angle Arc */}
            <path d="M 120 300 A 40 40 0 0 0 110 266" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <text x="130" y="285" fill="#fbbf24" fontSize="11" fontWeight="bold">θ</text>

            {/* Highest Point (Apex) */}
            <circle cx="340" cy="170" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <line x1="340" y1="170" x2="410" y2="170" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="415" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">v_x = u cos θ (v_y = 0)</text>
            <line x1="340" y1="170" x2="340" y2="300" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="350" y="240" fill="#ef4444" fontSize="11" fontWeight="bold">H_max = u²sin²θ / 2g</text>

            {/* Horizontal Range */}
            <line x1="80" y1="335" x2="600" y2="335" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="340" y="352" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
              Horizontal Range R = u² sin 2θ / g
            </text>
          </svg>
        );

      case "banked-road":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Incline triangle */}
            <polygon points="120,290 560,290 560,170" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <line x1="120" y1="290" x2="560" y2="170" stroke="#38bdf8" strokeWidth="4" />

            {/* Angle θ */}
            <path d="M 200 290 A 80 80 0 0 1 195 269" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="215" y="280" fill="#f59e0b" fontSize="12" fontWeight="bold">θ</text>

            {/* Car Box on Incline */}
            <g transform="translate(340, 230) rotate(-15.2)">
              <rect x="-35" y="-20" width="70" height="40" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="5" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Vehicle</text>
            </g>

            {/* Forces on Vehicle */}
            {/* Weight mg straight down */}
            <line x1="340" y1="230" x2="340" y2="330" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="350" y="325" fill="#ef4444" fontSize="11" fontWeight="bold">W = mg</text>

            {/* Normal Reaction N perpendicular to surface */}
            <line x1="340" y1="230" x2="310" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="280" y="115" fill="#10b981" fontSize="11" fontWeight="bold">N</text>

            {/* Resolved Normal Components */}
            <line x1="340" y1="230" x2="340" y2="124" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="345" y="145" fill="#10b981" fontSize="10" fontWeight="bold">N cos θ</text>

            <line x1="340" y1="230" x2="230" y2="230" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="180" y="222" fill="#f59e0b" fontSize="11" fontWeight="bold">N sin θ = mv²/r</text>

            {/* Summary Box */}
            <rect x="420" y="40" width="250" height="75" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="435" y="62" fill="#f59e0b" fontSize="11" fontWeight="bold">Optimum Banking Invariant:</text>
            <text x="435" y="80" fill="#e2e8f0" fontSize="10">tan θ = v² / (rg)  ⟹  Zero tire friction</text>
            <text x="435" y="98" fill="#38bdf8" fontSize="10">N sin θ provides 100% of centripetal force.</text>
          </svg>
        );

      case "bernoulli-fluid":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Venturi Tapered Pipe */}
            <path
              d="M 60 120 L 220 120 L 320 160 L 400 160 L 500 120 L 640 120 L 640 240 L 500 240 L 400 200 L 320 200 L 220 240 L 60 240 Z"
              fill="#0284c7"
              fillOpacity="0.12"
              stroke="#64748b"
              strokeWidth="3"
            />

            {/* Streamlines */}
            <path d="M 60 150 L 220 150 Q 320 175 400 175 L 500 150 L 640 150" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 60 180 L 220 180 L 320 180 L 400 180 L 500 180 L 640 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <path d="M 60 210 L 220 210 Q 320 185 400 185 L 500 210 L 640 210" fill="none" stroke="#38bdf8" strokeWidth="2" />

            {/* Section 1: Wide */}
            <text x="140" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">Wide Section A₁</text>
            <text x="140" y="260" fill="#10b981" fontSize="11" fontWeight="bold">Low Velocity v₁</text>
            <text x="140" y="280" fill="#ef4444" fontSize="11" fontWeight="bold">High Pressure P₁</text>

            {/* Section 2: Constriction */}
            <text x="360" y="145" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Constriction A₂</text>
            <text x="360" y="225" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">High Velocity v₂</text>
            <text x="360" y="245" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Low Pressure P₂</text>

            {/* Formula Banner */}
            <rect x="180" y="295" width="340" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="350" y="320" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
              P₁ + ½ρv₁² = P₂ + ½ρv₂² = constant
            </text>
          </svg>
        );

      case "lens-makers":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Optical Axis */}
            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="185" fill="#94a3b8" fontSize="11" fontWeight="bold">Axis</text>

            {/* Double Convex Lens */}
            <path
              d="M 330 60 Q 365 180 330 300 Q 295 180 330 60"
              fill="#38bdf8"
              fillOpacity="0.2"
              stroke="#0284c7"
              strokeWidth="3"
            />
            <line x1="330" y1="50" x2="330" y2="310" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="330" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Lens (μ)</text>

            {/* Incident Parallel Rays */}
            <line x1="80" y1="110" x2="320" y2="110" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <line x1="80" y1="250" x2="320" y2="250" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Refracted Converging Rays to Focus F */}
            <line x1="340" y1="110" x2="520" y2="180" stroke="#fbbf24" strokeWidth="2.5" />
            <line x1="340" y1="250" x2="520" y2="180" stroke="#fbbf24" strokeWidth="2.5" />

            {/* Principal Focus F */}
            <circle cx="520" cy="180" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="520" y="205" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Focus F</text>

            {/* Focal Length f */}
            <line x1="330" y1="210" x2="520" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="425" y="228" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">f</text>

            {/* Radius Markers R1 and R2 */}
            <text x="250" y="140" fill="#38bdf8" fontSize="11" fontWeight="bold">R₁ (+)</text>
            <text x="375" y="140" fill="#38bdf8" fontSize="11" fontWeight="bold">R₂ (-)</text>
          </svg>
        );

      case "kinetic-gas-pressure":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* 3D Isometric Cube Container */}
            <polygon points="180,100 340,100 340,260 180,260" fill="#0284c7" fillOpacity="0.06" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="260,50 420,50 420,210 260,210" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="180" y1="100" x2="260" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="340" y1="100" x2="420" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="340" y1="260" x2="420" y2="210" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="180" y1="260" x2="260" y2="210" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Shaded Impact Wall Face (Area A = L²) */}
            <polygon points="340,100 420,50 420,210 340,260" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" />
            <text x="430" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">Impact Face (A = L²)</text>

            {/* Molecule with incident momentum */}
            <circle cx="300" cy="180" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <line x1="300" y1="180" x2="355" y2="180" stroke="#ef4444" strokeWidth="3" />
            <polygon points="355,176 363,180 355,184" fill="#ef4444" />
            <text x="305" y="170" fill="#ef4444" fontSize="10" fontWeight="bold">+mv_x</text>

            {/* Molecule rebound momentum */}
            <line x1="355" y1="195" x2="300" y2="195" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
            <polygon points="305,191 297,195 305,199" fill="#38bdf8" />
            <text x="305" y="210" fill="#38bdf8" fontSize="10" fontWeight="bold">-mv_x</text>

            {/* Side L label */}
            <line x1="180" y1="275" x2="340" y2="275" stroke="#64748b" strokeWidth="2" />
            <text x="260" y="292" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">Side Length L (Volume V = L³)</text>

            {/* Other molecules */}
            <circle cx="220" cy="140" r="4" fill="#38bdf8" />
            <circle cx="260" cy="220" r="4" fill="#38bdf8" />
            <circle cx="280" cy="120" r="4" fill="#38bdf8" />
            <circle cx="360" cy="85" r="4" fill="#38bdf8" />

            {/* Derivation Steps Card */}
            <rect x="470" y="45" width="220" height="160" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="485" y="68" fill="#38bdf8" fontSize="11" fontWeight="bold">Kinetic Theory Derivation:</text>
            <text x="485" y="88" fill="#cbd5e1" fontSize="10">Δp = mv_x - (-mv_x) = 2mv_x</text>
            <text x="485" y="106" fill="#cbd5e1" fontSize="10">Collision period Δt = 2L / v_x</text>
            <text x="485" y="124" fill="#e2e8f0" fontSize="10">Force F = Δp/Δt = m(v_x)²/L</text>
            <text x="485" y="145" fill="#fbbf24" fontSize="10">Isotropic: v_x² = v_y² = v_z² = c²/3</text>
            <text x="485" y="172" fill="#34d399" fontSize="12" fontWeight="extrabold">P = ⅓ ρ (c_rms)²</text>
          </svg>
        );

      // ─────────────────────────────────────────────────────────────
      // 3. CHEMISTRY VISUALS
      // ─────────────────────────────────────────────────────────────
      case "bohr-hydrogen-atom":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Nucleus (+e) at Center (230, 180) */}
            <circle cx="230" cy="180" r="16" fill="#ef4444" stroke="#fca5a5" strokeWidth="2.5" />
            <text x="230" y="185" fill="#ffffff" fontSize="12" fontWeight="extrabold" textAnchor="middle">+e</text>
            <text x="230" y="210" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Proton</text>

            {/* Concentric Orbits n = 1, 2, 3 */}
            <circle cx="230" cy="180" r="55" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="230" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">n = 1 (r₁ = 0.529 Å, -13.6 eV)</text>

            <circle cx="230" cy="180" r="100" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="230" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">n = 2 (r₂ = 2.12 Å, -3.4 eV)</text>

            <circle cx="230" cy="180" r="145" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            <text x="230" y="30" fill="#38bdf8" fontSize="9" textAnchor="middle">n = 3 (r₃ = 4.76 Å, -1.51 eV)</text>

            {/* Electron on Orbit 3 */}
            <circle cx="375" cy="180" r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x="390" y="185" fill="#38bdf8" fontSize="11" fontWeight="bold">e⁻</text>

            {/* Downward Transition n=3 -> n=2 */}
            <path d="M 375 180 Q 345 160 330 180" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            {/* Emitted Photon Packet */}
            <path d="M 330 180 Q 340 165 350 180 T 370 180 T 390 180" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="400" y="184" fill="#ef4444" fontSize="11" fontWeight="bold">hν = E₃ - E₂ = 1.89 eV (H_α 656 nm)</text>

            {/* Formulas Box */}
            <rect x="440" y="30" width="250" height="155" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="455" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold">Bohr's Core Postulates:</text>
            <text x="455" y="72" fill="#cbd5e1" fontSize="10">1. Coulomb = Centripetal:</text>
            <text x="455" y="87" fill="#e2e8f0" fontSize="9">mv²/r = (1/4πε₀)(e²/r²)</text>
            <text x="455" y="105" fill="#cbd5e1" fontSize="10">2. Quantized Angular Momentum:</text>
            <text x="455" y="120" fill="#38bdf8" fontSize="10" fontWeight="bold">mvr = n(h / 2π)</text>
            <text x="455" y="140" fill="#cbd5e1" fontSize="10">3. Radius: r_n = 0.529 n² Å</text>
            <text x="455" y="158" fill="#34d399" fontSize="11" fontWeight="extrabold">E_n = -13.6 / n² eV</text>
          </svg>
        );

      case "kp-kc-equilibrium":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Reaction Vessel */}
            <rect x="50" y="60" width="280" height="230" rx="14" fill="#0284c7" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="190" y="88" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Gas Equilibrium Vessel (V, T)</text>

            {/* Particles */}
            <circle cx="100" cy="140" r="10" fill="#38bdf8" />
            <text x="100" y="144" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">A</text>
            <circle cx="140" cy="180" r="10" fill="#38bdf8" />
            <text x="140" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">A</text>
            <circle cx="210" cy="130" r="10" fill="#a855f7" />
            <text x="210" y="134" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">B</text>
            <circle cx="250" cy="170" r="12" fill="#10b981" />
            <text x="250" y="174" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">C</text>
            <circle cx="170" cy="230" r="12" fill="#f59e0b" />
            <text x="170" y="234" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">D</text>

            <text x="190" y="165" fill="#f59e0b" fontSize="20" fontWeight="black" textAnchor="middle">⇌</text>
            <text x="190" y="260" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">aA(g) + bB(g) ⇌ cC(g) + dD(g)</text>

            {/* Proof Card */}
            <rect x="360" y="40" width="310" height="260" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="380" y="68" fill="#10b981" fontSize="12" fontWeight="bold">Kinetic &amp; Thermodynamic Derivation:</text>
            <text x="380" y="92" fill="#cbd5e1" fontSize="10">Ideal Gas Law for Partial Pressure:</text>
            <text x="380" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold">P_i = (n_i / V) · RT = [i] · RT</text>
            
            <text x="380" y="135" fill="#cbd5e1" fontSize="10">Substitute into K_p Expression:</text>
            <text x="380" y="152" fill="#e2e8f0" fontSize="10">K_p = (P_C^c · P_D^d) / (P_A^a · P_B^b)</text>
            <text x="380" y="172" fill="#e2e8f0" fontSize="10">= ([C]^c [D]^d / [A]^a [B]^b) · (RT)^((c+d)-(a+b))</text>
            
            <line x1="380" y1="190" x2="650" y2="190" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            
            <text x="380" y="215" fill="#fbbf24" fontSize="12" fontWeight="extrabold">K_p = K_c (R · T)^(Δn_g)</text>
            <text x="380" y="235" fill="#cbd5e1" fontSize="10">Where Δn_g = (moles products) - (moles reactants)</text>
            <text x="380" y="255" fill="#34d399" fontSize="10">If Δn_g = 0 (e.g. H₂ + I₂ ⇌ 2HI), then K_p = K_c</text>
          </svg>
        );

      case "molecular-mass-vd":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Flask 1: Gas X */}
            <g transform="translate(70, 65)">
              <path d="M 60 40 L 60 70 L 10 170 A 30 30 0 0 0 35 210 L 125 210 A 30 30 0 0 0 150 170 L 100 70 L 100 40 Z" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="80" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Gas X</text>
              <text x="80" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">N molecules</text>
              <text x="80" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">Volume V at STP</text>
              <text x="80" y="235" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Mass = N × m(Gas)</text>
            </g>

            <text x="260" y="180" fill="#64748b" fontSize="22" fontWeight="bold">vs</text>

            {/* Flask 2: Hydrogen Gas */}
            <g transform="translate(300, 65)">
              <path d="M 60 40 L 60 70 L 10 170 A 30 30 0 0 0 35 210 L 125 210 A 30 30 0 0 0 150 170 L 100 70 L 100 40 Z" fill="#10b981" fillOpacity="0.15" stroke="#34d399" strokeWidth="2.5" />
              <text x="80" y="125" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Hydrogen Gas (H₂)</text>
              <text x="80" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">N molecules (Avogadro)</text>
              <text x="80" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">Equal Volume V at STP</text>
              <text x="80" y="235" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Mass = N × m(H₂)</text>
            </g>

            {/* Deduction Card */}
            <rect x="475" y="45" width="205" height="235" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="490" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold">Avogadro's Deduction:</text>
            <text x="490" y="92" fill="#cbd5e1" fontSize="10">V.D. = (Mass of V vol gas) /</text>
            <text x="510" y="108" fill="#cbd5e1" fontSize="10">(Mass of V vol H₂)</text>
            <text x="490" y="130" fill="#cbd5e1" fontSize="10">= (Mass of 1 mol. gas) /</text>
            <text x="510" y="146" fill="#cbd5e1" fontSize="10">(Mass of 1 mol. H₂)</text>
            <text x="490" y="170" fill="#38bdf8" fontSize="10">Since H₂ is diatomic:</text>
            <text x="490" y="186" fill="#e2e8f0" fontSize="10">Mass of 1 mol. H₂ = 2 × 1 = 2</text>
            <text x="490" y="208" fill="#fbbf24" fontSize="10">V.D. = Molecular Mass / 2</text>
            <text x="490" y="235" fill="#34d399" fontSize="13" fontWeight="extrabold">M = 2 × V.D. (Q.E.D.)</text>
          </svg>
        );

      case "arrhenius-kinetics":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="80" y1="300" x2="420" y2="300" stroke="#64748b" strokeWidth="2" />
            <line x1="80" y1="310" x2="80" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="425" y="305" fill="#94a3b8" fontSize="11" fontWeight="bold">Reaction Coordinate</text>
            <text x="80" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Potential Energy (kJ/mol)</text>

            {/* Reaction Profile: Reactants -> Activated Complex -> Products */}
            <path
              d="M 80 220 L 160 220 C 200 220, 220 70, 260 70 C 300 70, 320 270, 360 270 L 420 270"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
            />

            {/* Activation Energy Barrier E_a */}
            <line x1="260" y1="70" x2="260" y2="220" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="270" y="145" fill="#f59e0b" fontSize="12" fontWeight="bold">E_a (Activation Energy)</text>

            {/* Reactants and Products level */}
            <text x="100" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold">Reactants</text>
            <text x="370" y="260" fill="#10b981" fontSize="11" fontWeight="bold">Products</text>
            <circle cx="260" cy="70" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="260" y="55" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Activated Complex [X]‡</text>

            {/* Inset Arrhenius Plot: ln k vs 1/T */}
            <g transform="translate(470, 50)">
              <rect x="0" y="0" width="200" height="230" rx="8" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="100" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Arrhenius Plot</text>
              <line x1="30" y1="180" x2="180" y2="180" stroke="#64748b" strokeWidth="1.5" />
              <line x1="30" y1="190" x2="30" y2="40" stroke="#64748b" strokeWidth="1.5" />
              <text x="180" y="195" fill="#94a3b8" fontSize="9">1/T</text>
              <text x="20" y="45" fill="#94a3b8" fontSize="9">ln k</text>
              {/* Downward sloping line */}
              <line x1="40" y1="70" x2="160" y2="160" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="105" y="105" fill="#f59e0b" fontSize="10" fontWeight="bold">Slope = -E_a/R</text>
              <text x="45" y="60" fill="#cbd5e1" fontSize="8">y-intercept = ln A</text>
            </g>
          </svg>
        );

      case "nernst-equation":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Left Beaker (ZnSO4) */}
            <rect x="100" y="140" width="130" height="150" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#64748b" strokeWidth="2.5" />
            <rect x="105" y="180" width="120" height="105" rx="4" fill="#38bdf8" fillOpacity="0.25" />
            <rect x="145" y="100" width="25" height="130" rx="3" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
            <text x="157" y="125" fill="#0f172a" textAnchor="middle" fontSize="10" fontWeight="bold">Zn (-)</text>
            <text x="165" y="270" fill="#38bdf8" textAnchor="middle" fontSize="10" fontWeight="bold">Zn²⁺ (Anode)</text>

            {/* Right Beaker (CuSO4) */}
            <rect x="290" y="140" width="130" height="150" rx="8" fill="#0284c7" fillOpacity="0.12" stroke="#64748b" strokeWidth="2.5" />
            <rect x="295" y="180" width="120" height="105" rx="4" fill="#0284c7" fillOpacity="0.3" />
            <rect x="335" y="100" width="25" height="130" rx="3" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
            <text x="347" y="125" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">Cu (+)</text>
            <text x="355" y="270" fill="#7dd3fc" textAnchor="middle" fontSize="10" fontWeight="bold">Cu²⁺ (Cathode)</text>

            {/* Salt Bridge */}
            <path
              d="M 195 200 L 195 130 C 195 105, 325 105, 325 130 L 325 200"
              fill="none"
              stroke="#a855f7"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <text x="260" y="100" fill="#c084fc" textAnchor="middle" fontSize="9" fontWeight="bold">Salt Bridge (KCl)</text>

            {/* External Wire & Voltmeter */}
            <path d="M 157 100 L 157 60 L 225 60" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <path d="M 295 60 L 347 60 L 347 100" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="260" cy="60" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="260" y="65" fill="#fbbf24" textAnchor="middle" fontSize="11" fontWeight="bold">1.10 V</text>

            {/* Nernst Potential vs log Q Plot on the right */}
            <g transform="translate(460, 45)">
              <rect x="0" y="0" width="220" height="245" rx="8" fill="#0f172a" fillOpacity="0.85" stroke="#10b981" strokeWidth="1.5" />
              <text x="110" y="25" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Cell Potential vs Reaction Quotient</text>
              <line x1="30" y1="140" x2="190" y2="140" stroke="#64748b" strokeWidth="1.5" />
              <line x1="110" y1="210" x2="110" y2="40" stroke="#64748b" strokeWidth="1.5" />
              <text x="190" y="155" fill="#94a3b8" fontSize="9">log Q</text>
              <text x="95" y="45" fill="#94a3b8" fontSize="9">E_cell</text>
              {/* Nernst slope */}
              <line x1="40" y1="80" x2="180" y2="190" stroke="#ef4444" strokeWidth="2.5" />
              <circle cx="110" cy="135" r="4" fill="#fbbf24" />
              <text x="120" y="130" fill="#fbbf24" fontSize="9" fontWeight="bold">E° (Q=1)</text>
              <text x="110" y="230" fill="#cbd5e1" fontSize="9" textAnchor="middle">Slope = -0.0591 / n</text>
            </g>
          </svg>
        );

      case "buffer-henderson":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Titration Axes */}
            <line x1="80" y1="300" x2="620" y2="300" stroke="#64748b" strokeWidth="2" />
            <line x1="100" y1="310" x2="100" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="625" y="305" fill="#94a3b8" fontSize="11" fontWeight="bold">mL of Base Added</text>
            <text x="100" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">pH</text>

            {/* Sigmoidal Titration Curve */}
            <path
              d="M 100 270 Q 180 250 260 210 Q 340 210 380 90 Q 420 70 580 65"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
            />

            {/* Highlighted Buffer Region */}
            <rect x="180" y="170" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
            <text x="260" y="195" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
              Buffer Region (pH = pK_a ± 1)
            </text>

            {/* Half-Equivalence Point */}
            <circle cx="260" cy="210" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="275" y="225" fill="#f59e0b" fontSize="11" fontWeight="bold">
              Half-Equivalence: [Salt] = [Acid] ⟹ pH = pK_a
            </text>

            {/* Equivalence Point Jump */}
            <circle cx="380" cy="140" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="395" y="145" fill="#ef4444" fontSize="10" fontWeight="bold">Equivalence Point</text>
          </svg>
        );

      // ─────────────────────────────────────────────────────────────
      // 4. BIOLOGY VISUALS
      // ─────────────────────────────────────────────────────────────
      case "dna-double-helix":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Strand 1 (5' -> 3') Blue Wave */}
            <path
              d="M 100 80 C 160 80, 180 280, 240 280 C 300 280, 320 80, 380 80 C 440 80, 460 280, 520 280"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text x="75" y="85" fill="#38bdf8" fontSize="12" fontWeight="extrabold">5'</text>
            <text x="535" y="285" fill="#38bdf8" fontSize="12" fontWeight="extrabold">3'</text>

            {/* Strand 2 (3' -> 5') Purple Wave */}
            <path
              d="M 100 280 C 160 280, 180 80, 240 80 C 300 80, 320 280, 380 280 C 440 280, 460 80, 520 80"
              fill="none"
              stroke="#c084fc"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text x="75" y="285" fill="#c084fc" fontSize="12" fontWeight="extrabold">3'</text>
            <text x="535" y="85" fill="#c084fc" fontSize="12" fontWeight="extrabold">5'</text>

            {/* Base pairs rungs */}
            <line x1="140" y1="140" x2="140" y2="220" stroke="#10b981" strokeWidth="3" />
            <circle cx="140" cy="140" r="4" fill="#10b981" />
            <circle cx="140" cy="220" r="4" fill="#ef4444" />
            <text x="148" y="185" fill="#10b981" fontSize="10" fontWeight="bold">A = T (2 H-bonds)</text>

            <circle cx="210" cy="180" r="6" fill="#fbbf24" />

            <line x1="280" y1="220" x2="280" y2="140" stroke="#f59e0b" strokeWidth="3.5" />
            <circle cx="280" cy="220" r="4" fill="#f59e0b" />
            <circle cx="280" cy="140" r="4" fill="#38bdf8" />
            <text x="288" y="185" fill="#f59e0b" fontSize="10" fontWeight="bold">G ≡ C (3 H-bonds)</text>

            {/* Pitch of 1 helix turn: 34 Å */}
            <line x1="100" y1="50" x2="380" y2="50" stroke="#fbbf24" strokeWidth="2" />
            <line x1="100" y1="42" x2="100" y2="58" stroke="#fbbf24" strokeWidth="2" />
            <line x1="380" y1="42" x2="380" y2="58" stroke="#fbbf24" strokeWidth="2" />
            <text x="240" y="42" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">1 Turn (Pitch) = 34 Å (3.4 nm) = 10 Base Pairs</text>

            {/* Diameter: 20 Å */}
            <line x1="560" y1="80" x2="560" y2="280" stroke="#38bdf8" strokeWidth="2" />
            <line x1="552" y1="80" x2="568" y2="80" stroke="#38bdf8" strokeWidth="2" />
            <line x1="552" y1="280" x2="568" y2="280" stroke="#38bdf8" strokeWidth="2" />
            <text x="575" y="185" fill="#38bdf8" fontSize="11" fontWeight="bold">Diameter = 20 Å (2.0 nm)</text>

            {/* Chargaff's Rules Card */}
            <rect x="75" y="300" width="550" height="48" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="350" y="320" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
              Chargaff's Invariant: [Purines] = [Pyrimidines] ⟹ [A] = [T], [G] = [C] ⟹ (A + G)/(T + C) = 1
            </text>
            <text x="350" y="338" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              Adjacent Base Distance = 3.4 Å (0.34 nm) · Right-Handed B-DNA · Major &amp; Minor Grooves
            </text>
          </svg>
        );

      case "mitosis-meiosis-stages":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Side 1: Mitosis */}
            <rect x="40" y="35" width="295" height="295" rx="12" fill="#0284c7" fillOpacity="0.06" stroke="#38bdf8" strokeWidth="2" />
            <text x="187" y="62" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Mitosis (Equational Division)</text>
            <text x="187" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">Somatic Cells · Growth &amp; Repair · 2n ➔ 2n</text>

            {/* Metaphase alignment */}
            <circle cx="187" cy="150" r="50" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="187" y1="105" x2="187" y2="195" stroke="#ef4444" strokeWidth="3" />
            <circle cx="187" cy="150" r="5" fill="#f59e0b" />
            <text x="187" y="215" fill="#cbd5e1" fontSize="10" textAnchor="middle">Single plate alignment at Metaphase</text>

            {/* Daughter cells */}
            <circle cx="130" cy="275" r="26" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="130" y="280" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2n Clones</text>
            <circle cx="245" cy="275" r="26" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="245" y="280" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2n Clones</text>
            <text x="187" y="318" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">2 Genetically Identical Diploid Cells</text>

            {/* Side 2: Meiosis */}
            <rect x="365" y="35" width="295" height="295" rx="12" fill="#7c3aed" fillOpacity="0.06" stroke="#c084fc" strokeWidth="2" />
            <text x="512" y="62" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">Meiosis (Reductional Division)</text>
            <text x="512" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">Germ Cells · Gametogenesis · 2n ➔ 4 × n</text>

            {/* Crossing-over at Pachytene */}
            <circle cx="512" cy="150" r="50" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 495 110 Q 512 150 512 190" stroke="#38bdf8" strokeWidth="3" fill="none" />
            <path d="M 529 110 Q 512 150 512 190" stroke="#ef4444" strokeWidth="3" fill="none" />
            <circle cx="512" cy="150" r="6" fill="#f59e0b" />
            <text x="512" y="145" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">Chiasma</text>
            <text x="512" y="215" fill="#cbd5e1" fontSize="10" textAnchor="middle">Crossing-over at Pachytene (Recombination)</text>

            {/* 4 Haploid cells */}
            <circle cx="410" cy="275" r="17" fill="#7c3aed" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1.5" />
            <text x="410" y="279" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">n</text>
            <circle cx="475" cy="275" r="17" fill="#7c3aed" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1.5" />
            <text x="475" y="279" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">n</text>
            <circle cx="540" cy="275" r="17" fill="#7c3aed" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1.5" />
            <text x="540" y="279" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">n</text>
            <circle cx="605" cy="275" r="17" fill="#7c3aed" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1.5" />
            <text x="605" y="279" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">n</text>
            <text x="512" y="318" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">4 Recombinant Haploid Gametes</text>
          </svg>
        );

      case "lindeman-energy-pyramid":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Trophic Pyramid */}
            {/* T4: Top Predator */}
            <polygon points="350,45 390,105 310,105" fill="#ef4444" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
            <text x="350" y="85" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">T₄: 10 J (0.1%)</text>
            <text x="415" y="85" fill="#ef4444" fontSize="11" fontWeight="bold">Apex Predators (Eagle, Lion)</text>

            {/* T3: Secondary Consumers */}
            <polygon points="310,105 390,105 440,175 260,175" fill="#f59e0b" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
            <text x="350" y="145" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">T₃: 100 J (1%)</text>
            <text x="460" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">Secondary Consumers (Frog, Fox)</text>

            {/* T2: Primary Consumers */}
            <polygon points="260,175 440,175 500,245 200,245" fill="#38bdf8" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
            <text x="350" y="215" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">T₂: 1,000 J (10%)</text>
            <text x="515" y="215" fill="#38bdf8" fontSize="11" fontWeight="bold">Primary Consumers (Grasshopper, Deer)</text>

            {/* T1: Primary Producers */}
            <polygon points="200,245 500,245 560,315 140,315" fill="#10b981" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1.5" />
            <text x="350" y="285" fill="#ffffff" fontSize="12" fontWeight="extrabold" textAnchor="middle">T₁: 10,000 J (100% Net Primary Production)</text>
            <text x="350" y="305" fill="#ffffff" fontSize="10" textAnchor="middle">Primary Producers (Phytoplankton, Green Plants)</text>

            {/* Heat Loss Marker */}
            <rect x="40" y="45" width="200" height="110" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="55" y="68" fill="#10b981" fontSize="11" fontWeight="bold">Lindeman's 10% Law:</text>
            <text x="55" y="88" fill="#cbd5e1" fontSize="10">{"E_(n+1) = 0.10 × E_n"}</text>
            <text x="55" y="106" fill="#cbd5e1" fontSize="9">Only ~10% chemical energy</text>
            <text x="55" y="120" fill="#cbd5e1" fontSize="9">transfers to next trophic level.</text>
            <text x="55" y="140" fill="#fbbf24" fontSize="9" fontWeight="bold">90% dissipated as metabolic heat.</text>
          </svg>
        );

      case "hardy-weinberg":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Punnett Matrix (280x280) */}
            <g transform="translate(100, 40)">
              {/* Outer Square */}
              <rect x="40" y="40" width="240" height="240" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />

              {/* p x p Box (AA) - say 70% x 70% */}
              <rect x="40" y="40" width="160" height="160" fill="#3b82f6" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
              <text x="120" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">p² (AA)</text>
              <text x="120" y="135" fill="#bfdbfe" fontSize="11" textAnchor="middle">Homozygous Dominant</text>

              {/* p x q Box (Aa) */}
              <rect x="200" y="40" width="80" height="160" fill="#a855f7" fillOpacity="0.4" stroke="#c084fc" strokeWidth="2" />
              <text x="240" y="115" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">pq (Aa)</text>

              {/* q x p Box (aA) */}
              <rect x="40" y="200" width="160" height="80" fill="#a855f7" fillOpacity="0.4" stroke="#c084fc" strokeWidth="2" />
              <text x="120" y="245" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">pq (aA)</text>

              {/* q x q Box (aa) */}
              <rect x="200" y="200" width="80" height="80" fill="#ef4444" fillOpacity="0.4" stroke="#f87171" strokeWidth="2" />
              <text x="240" y="245" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">q² (aa)</text>
              <text x="240" y="260" fill="#fecaca" fontSize="9" textAnchor="middle">Recessive</text>

              {/* Labels top and left */}
              <text x="120" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">p (A)</text>
              <text x="240" y="25" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">q (a)</text>
              <text x="25" y="125" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">p (A)</text>
              <text x="25" y="245" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">q (a)</text>
            </g>

            {/* Right Information Panel */}
            <g transform="translate(420, 50)">
              <rect x="0" y="0" width="250" height="260" rx="10" fill="#0f172a" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">Hardy-Weinberg Theorem</text>
              <text x="20" y="55" fill="#e2e8f0" fontSize="11" fontWeight="bold">Allele Frequencies: p + q = 1</text>
              <text x="20" y="75" fill="#e2e8f0" fontSize="11" fontWeight="bold">Genotypes: p² + 2pq + q² = 1</text>

              <line x1="20" y1="95" x2="230" y2="95" stroke="#334155" strokeWidth="1.5" />
              <text x="20" y="118" fill="#10b981" fontSize="11" fontWeight="bold">5 Conditions for Equilibrium:</text>
              <text x="20" y="138" fill="#cbd5e1" fontSize="10">1. Large population (no drift)</text>
              <text x="20" y="156" fill="#cbd5e1" fontSize="10">2. Random mating (panmixia)</text>
              <text x="20" y="174" fill="#cbd5e1" fontSize="10">3. No mutations</text>
              <text x="20" y="192" fill="#cbd5e1" fontSize="10">4. No migration / gene flow</text>
              <text x="20" y="210" fill="#cbd5e1" fontSize="10">5. No natural selection</text>
              <text x="20" y="240" fill="#fbbf24" fontSize="10" fontWeight="bold">Deviation = Evolution has occurred</text>
            </g>
          </svg>
        );

      case "michaelis-menten":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="80" y1="300" x2="620" y2="300" stroke="#64748b" strokeWidth="2" />
            <line x1="100" y1="310" x2="100" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="625" y="305" fill="#94a3b8" fontSize="11" fontWeight="bold">Substrate Concentration [S]</text>
            <text x="100" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Initial Velocity v₀</text>

            {/* Asymptote V_max */}
            <line x1="100" y1="80" x2="620" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
            <text x="625" y="85" fill="#ef4444" fontSize="11" fontWeight="bold">V_max</text>

            {/* V_max / 2 */}
            <line x1="100" y1="190" x2="240" y2="190" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="60" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold">½ V_max</text>

            {/* K_m vertical line */}
            <line x1="240" y1="190" x2="240" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="240" y="320" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">K_m</text>

            {/* Hyperbolic Curve: Uninhibited Enzyme */}
            <path
              d="M 100 300 Q 180 180 340 110 T 620 85"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
            />
            <text x="480" y="105" fill="#10b981" fontSize="11" fontWeight="bold">Normal Enzyme</text>

            {/* Competitive Inhibitor Curve (same V_max, higher apparent K_m) */}
            <path
              d="M 100 300 Q 240 240 420 135 T 620 90"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            <text x="500" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold">+ Competitive Inhibitor (K_m ↑)</text>

            {/* Non-Competitive Inhibitor Curve (reduced V_max, same K_m) */}
            <path
              d="M 100 300 Q 180 230 340 180 T 620 160"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            <text x="500" y="185" fill="#ef4444" fontSize="10" fontWeight="bold">+ Non-Competitive (V_max ↓)</text>
          </svg>
        );

      case "cellular-respiration-atp":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Metabolic Stages Flowchart */}
            {/* Stage 1: Glycolysis */}
            <rect x="40" y="60" width="130" height="90" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
            <text x="105" y="85" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Glycolysis</text>
            <text x="105" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Cytoplasm (EMP)</text>
            <text x="105" y="125" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">+2 ATP (net)</text>
            <text x="105" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">+2 NADH</text>

            {/* Arrow to Link */}
            <line x1="170" y1="105" x2="205" y2="105" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Stage 2: Link Reaction */}
            <rect x="210" y="60" width="130" height="90" rx="8" fill="#7c3aed" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
            <text x="275" y="85" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">2. Link Reaction</text>
            <text x="275" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Mitochondrial Matrix</text>
            <text x="275" y="125" fill="#cbd5e1" fontSize="10" textAnchor="middle">2 Pyruvate → 2 Acetyl-CoA</text>
            <text x="275" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">+2 NADH</text>

            {/* Arrow to Krebs */}
            <line x1="340" y1="105" x2="375" y2="105" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Stage 3: Krebs Cycle */}
            <rect x="380" y="60" width="130" height="90" rx="8" fill="#b45309" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
            <text x="445" y="85" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">3. Krebs Cycle</text>
            <text x="445" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">2 Turns / Glucose</text>
            <text x="445" y="125" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">+2 ATP (GTP)</text>
            <text x="445" y="140" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">6 NADH + 2 FADH₂</text>

            {/* Downward Arrow to ETS */}
            <path d="M 445 150 L 445 190" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Stage 4: ETS & Oxidative Phosphorylation Banner */}
            <rect x="40" y="200" width="620" height="130" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="225" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">
              4. Electron Transport System (ETS) &amp; Chemiosmosis (Inner Mitochondrial Membrane)
            </text>

            <g transform="translate(60, 245)" className="text-xs">
              <text x="0" y="20" fill="#cbd5e1" fontSize="11">10 NADH × 3 ATP = <tspan fill="#fbbf24" fontWeight="bold">30 ATP</tspan></text>
              <text x="0" y="45" fill="#cbd5e1" fontSize="11">2 FADH₂ × 2 ATP = <tspan fill="#fbbf24" fontWeight="bold">4 ATP</tspan></text>
              <text x="250" y="20" fill="#cbd5e1" fontSize="11">Substrate-level ATP = <tspan fill="#10b981" fontWeight="bold">4 ATP</tspan> (2 Glyc + 2 Krebs)</text>
              <text x="250" y="45" fill="#cbd5e1" fontSize="11">Proton Gradient Engine = <tspan fill="#38bdf8" fontWeight="bold">F₀-F₁ ATP Synthase</tspan></text>
              <rect x="440" y="0" width="150" height="55" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
              <text x="515" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Total Net Yield:</text>
              <text x="515" y="45" fill="#34d399" fontSize="16" fontWeight="extrabold" textAnchor="middle">36–38 ATP</text>
            </g>
          </svg>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <Sparkles className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-semibold text-foreground">Interactive Conceptual Schematic</p>
            <p className="text-xs">{title || "Rigorous Scientific Visual Diagram"}</p>
          </div>
        );
    }
  };

  return (
    <div className={`rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm ${className}`}>
      {/* Visual Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/60 text-xs">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Interactive Visual &amp; Geometric Representation</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAnnotations((prev) => !prev)}
            className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded-md hover:bg-muted"
          >
            <Eye className="h-3 w-3" />
            <span>{showAnnotations ? "Hide Notes" : "Show Notes"}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="p-3 sm:p-4 bg-gradient-to-b from-card to-background/50 flex items-center justify-center">
        {renderVisualContent()}
      </div>
    </div>
  );
}

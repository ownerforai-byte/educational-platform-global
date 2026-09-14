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
<defs>
        <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9"/>
          <stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="grad-success" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#14b8a6"/>
        </linearGradient>
        <linearGradient id="grad-warn" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
        <marker id="arrow-end" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#38bdf8"/>
        </marker>
        <marker id="arrow-end-gold" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f59e0b"/>
        </marker>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

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


      case "hooke-spring-force":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* F-x Graph: two slopes (stiff + soft spring) */}
            <line x1="80" y1="300" x2="650" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="120" y1="320" x2="120" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="660" y="310" fill="#94a3b8" fontSize="11" fontWeight="bold">x (extension)</text>
            <text x="110" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">F (N)</text>
            {/* Stiff spring (k₁=5 N/m) */}
            <line x1="120" y1="300" x2="480" y2="60" stroke="#38bdf8" strokeWidth="3" />
            <text x="490" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold">Stiff: F = k₁·x (large k)</text>
            {/* Soft spring (k₂=2 N/m) */}
            <line x1="120" y1="300" x2="580" y2="180" stroke="#f59e0b" strokeWidth="3" />
            <text x="590" y="175" fill="#f59e0b" fontSize="10" fontWeight="bold">Soft: F = k₂·x (small k)</text>
            {/* Elastic limit */}
            <line x1="440" y1="200" x2="440" y2="300" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
            <text x="445" y="195" fill="#ef4444" fontSize="10" fontWeight="bold">Elastic limit</text>
            {/* Region */}
            <rect x="440" y="60" width="200" height="240" fill="#ef4444" fillOpacity="0.05" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
            <text x="540" y="280" fill="#ef4444" fontSize="10" textAnchor="middle">Plastic region (permanent deformation)</text>
            <text x="350" y="340" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">F = k·x  (Hooke's Law, linear region)</text>
          </svg>
        );

      case "coulomb-law-electrostatic":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Two point charges */}
            <circle cx="180" cy="180" r="30" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="3" />
            <text x="180" y="185" fill="#fff" fontSize="22" fontWeight="bold" textAnchor="middle">+</text>
            <text x="180" y="225" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">q₁</text>
            <circle cx="520" cy="180" r="30" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="3" />
            <text x="520" y="185" fill="#fff" fontSize="22" fontWeight="bold" textAnchor="middle">−</text>
            <text x="520" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">q₂</text>
            {/* Distance line */}
            <line x1="210" y1="180" x2="490" y2="180" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 3" />
            <text x="350" y="165" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">r</text>
            {/* Force arrows */}
            <line x1="215" y1="180" x2="485" y2="180" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="350" y="205" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">F = k·q₁·q₂ / r²</text>
            {/* Field lines (conceptual) */}
            <path d="M 210 150 C 300 100, 400 100, 490 150" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            <path d="M 210 210 C 300 260, 400 260, 490 210" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            {/* Formula box */}
            <rect x="180" y="270" width="340" height="50" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="300" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">F = (1 / 4πε₀) · (q₁ · q₂) / r²</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">Inverse-square law: 2× distance → ¼ force</text>
          </svg>
        );

      case "ohms-law-circuit":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* V-I Graph: two resistors */}
            <line x1="80" y1="300" x2="650" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="120" y1="320" x2="120" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="660" y="310" fill="#94a3b8" fontSize="11" fontWeight="bold">V (Volts)</text>
            <text x="110" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">I (Amps)</text>
            {/* R = 1 Ω (steep) */}
            <line x1="120" y1="300" x2="600" y2="80" stroke="#38bdf8" strokeWidth="3" />
            <text x="610" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">R₁ = 1 Ω</text>
            {/* R = 4 Ω (shallow) */}
            <line x1="120" y1="300" x2="600" y2="230" stroke="#f59e0b" strokeWidth="3" />
            <text x="610" y="225" fill="#f59e0b" fontSize="10" fontWeight="bold">R₂ = 4 Ω</text>
            {/* Slope label */}
            <text x="350" y="340" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">V = I·R  →  R = V/I = 1/(slope)</text>
            {/* Ohmic vs non-ohmic */}
            <rect x="440" y="280" width="200" height="40" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
            <text x="540" y="305" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Non-ohmic: curved V-I (diode, lamp)</text>
          </svg>
        );

      case "parallel-plate-capacitor":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Plates */}
            <rect x="200" y="140" width="16" height="180" rx="3" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="3" />
            <text x="185" y="235" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="end">+</text>
            <rect x="484" y="140" width="16" height="180" rx="3" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="3" />
            <text x="515" y="235" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="start">−</text>
            {/* Field lines */}
            {[0,1,2,3,4,5,6].map(i => (
              <line key={i} x1={240} y1={160 + i*24} x2={460} y2={160 + i*24} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)" />
            ))}
            <text x="350" y="130" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">E = V / d = Q / (ε₀·A)</text>
            {/* Dielectric */}
            <rect x="270" y="160" width="160" height="140" rx="6" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
            <text x="350" y="230" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Dielectric κ</text>
            {/* Formula */}
            <rect x="160" y="310" width="380" height="40" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="335" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">C = ε₀·A / d  →  with dielectric: C' = κ·C</text>
            {/* Dimension labels */}
            <line x1="200" y1="330" x2="200" y2="345" stroke="#64748b" strokeWidth="1.5" />
            <line x1="500" y1="330" x2="500" y2="345" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        );

      case "dot-product-vectors":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Origin */}
            <circle cx="120" cy="300" r="4" fill="#64748b" />
            <text x="110" y="315" fill="#94a3b8" fontSize="10">O</text>
            {/* Vector A */}
            <line x1="120" y1="300" x2="380" y2="100" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="395" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">A</text>
            {/* Vector B */}
            <line x1="120" y1="300" x2="500" y2="180" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="515" y="175" fill="#f59e0b" fontSize="14" fontWeight="bold">B</text>
            {/* Angle θ */}
            <path d="M 180 300 A 60 60 0 0 0 200 275" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <text x="195" y="295" fill="#10b981" fontSize="11" fontWeight="bold">θ</text>
            {/* Projection */}
            <line x1="380" y1="100" x2="380" y2="300" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="380" y1="300" x2="500" y2="300" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
            <rect x="380" y="290" width="120" height="10" fill="#a855f7" fillOpacity="0.2" />
            <text x="440" y="320" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">|B|·cos θ</text>
            {/* Formula */}
            <rect x="140" y="335" width="420" height="30" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="355" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">A · B = |A||B| cos θ  =  AₓBₓ + AᵧBᵧ + A₂B₂</text>
          </svg>
        );

      case "area-under-curve-integral":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="670" y="305" fill="#94a3b8" fontSize="11">x</text>
            <text x="95" y="20" fill="#94a3b8" fontSize="11" textAnchor="middle">y</text>
            {/* Curve y = f(x) */}
            <path d="M 150 280 C 250 100, 350 100, 450 180 C 550 260, 600 150, 640 120" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
            {/* Integration bounds */}
            <line x1="200" y1="300" x2="200" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="550" y1="300" x2="550" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
            <text x="195" y="315" fill="#ef4444" fontSize="11" fontWeight="bold">a</text>
            <text x="545" y="315" fill="#ef4444" fontSize="11" fontWeight="bold">b</text>
            {/* Filled area */}
            <path d="M 200 300 L 200 150 C 280 100, 380 110, 450 170 C 500 200, 530 190, 550 180 L 550 300 Z" fill="#a855f7" fillOpacity="0.15" />
            {/* Riemann strip */}
            <rect x="300" y="130" width="40" height="170" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="320" y="120" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Δx</text>
            {/* Formula */}
            <rect x="160" y="330" width="380" height="30" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="350" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">∫ₐᵇ f(x) dx = Area between curve and x-axis</text>
          </svg>
        );

      case "mass-action-equilibrium":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Reaction: A + B ⇌ C + D */}
            <rect x="80" y="80" width="120" height="60" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="140" y="115" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">aA</text>
            <rect x="220" y="80" width="120" height="60" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="280" y="115" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">bB</text>
            <text x="370" y="115" fill="#64748b" fontSize="20">⇌</text>
            <rect x="400" y="80" width="120" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <text x="460" y="115" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">cC</text>
            <rect x="540" y="80" width="120" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <text x="600" y="115" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">dD</text>
            {/* Rate arrows */}
            <line x1="140" y1="155" x2="140" y2="200" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="150" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold">Forward rate r_f = k_f·[A]ᵃ[B]ᵇ</text>
            <line x1="520" y1="200" x2="520" y2="155" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="530" y="185" fill="#10b981" fontSize="10" fontWeight="bold">Reverse r_r = k_r·[C]ᶜ[D]ᵈ</text>
            {/* Equilibrium condition */}
            <rect x="100" y="220" width="500" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="250" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">At equilibrium: r_f = r_r  ⟹  K = k_f/k_r = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ)</text>
            {/* Le Chatelier hint */}
            <text x="350" y="310" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">K depends ONLY on T.  Le Chatelier: shift right if [reactants]↑ or T↑ (endothermic)</text>
          </svg>
        );

      case "food-chain-energy":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Trophic levels (pyramid) */}
            <polygon points="350,30 420,90 280,90" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="75" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">T₄ Apex</text>
            <text x="350" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">~10 J</text>
            <polygon points="280,100 420,100 480,180 220,180" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="135" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">T₃ Carnivore</text>
            <text x="350" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">~100 J</text>
            <polygon points="220,190 480,190 560,280 140,280" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
            <text x="350" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">T₂ Herbivore</text>
            <text x="350" y="245" fill="#cbd5e1" fontSize="9" textAnchor="middle">~1,000 J</text>
            <polygon points="140,290 560,290 650,350 50,350" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="320" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">T₁ Producers (Photosynthetic Autotrophs)</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">~10,000 J</text>
            {/* Energy loss arrows */}
            <text x="580" y="110" fill="#ef4444" fontSize="10" fontWeight="bold">90% lost → heat</text>
            <text x="580" y="200" fill="#ef4444" fontSize="10" fontWeight="bold">90% lost</text>
            <text x="580" y="290" fill="#ef4444" fontSize="10" fontWeight="bold">90% lost</text>
            {/* Efficiency label */}
            <rect x="50" y="30" width="180" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="140" y="55" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Trophic Efficiency ≈ 10%</text>
            <text x="140" y="68" fill="#cbd5e1" fontSize="8" textAnchor="middle">(Lindeman's 10% Law)</text>
          </svg>
        );

      case "newton-gravitation-field":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Central mass */}
            <circle cx="350" cy="180" r="50" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="3" />
            <text x="350" y="185" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">M</text>
            {/* Field lines (radial) */}
            {[0,45,90,135,180,225,270,315].map(a => {
              const rad = a * Math.PI / 180;
              const x1 = 350 + 60 * Math.cos(rad), y1 = 180 + 60 * Math.sin(rad);
              const x2 = 350 + 130 * Math.cos(rad), y2 = 180 + 130 * Math.sin(rad);
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />;
            })}
            {/* Orbit rings */}
            <circle cx="350" cy="180" r="130" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="350" cy="180" r="200" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
            {/* g = GM/r² formula */}
            <rect x="160" y="320" width="380" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="343" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">F = G·M·m / r²  ⟹  g = G·M / r²  (inverse-square, radially inward)</text>
            {/* Test mass */}
            <circle cx="480" cy="180" r="12" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
            <text x="498" y="175" fill="#10b981" fontSize="10" fontWeight="bold">m (test)</text>
          </svg>
        );

      case "satellite-orbit":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Earth */}
            <circle cx="200" cy="200" r="60" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="3" />
            <text x="200" y="205" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">Earth</text>
            {/* Orbit ellipse */}
            <ellipse cx="350" cy="200" rx="200" ry="100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
            {/* Satellite at apogee */}
            <circle cx="550" cy="200" r="10" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />
            <text x="560" y="185" fill="#ef4444" fontSize="10" fontWeight="bold">v_apogee (slow)</text>
            {/* Satellite at perigee */}
            <circle cx="150" cy="200" r="10" fill="#10b981" fillOpacity="0.5" stroke="#10b981" strokeWidth="2" />
            <text x="100" y="230" fill="#10b981" fontSize="10" fontWeight="bold">v_perigee (fast)</text>
            {/* Velocity vector at perigee */}
            <line x1="150" y1="190" x2="150" y2="130" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
            {/* Velocity vector at apogee */}
            <line x1="550" y1="190" x2="550" y2="150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
            {/* Centripetal force */}
            <line x1="550" y1="200" x2="480" y2="200" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="490" y="190" fill="#a855f7" fontSize="10" fontWeight="bold">F_c = GmM/r²</text>
            {/* Formula */}
            <rect x="140" y="320" width="420" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="343" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">v_orbital = √(GM/r)  |  T = 2π√(r³/GM)  |  v_escape = √(2GM/r)</text>
          </svg>
        );

      case "newtons-law-cooling":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Axes */}
            <line x1="80" y1="300" x2="650" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="120" y1="320" x2="120" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="660" y="310" fill="#94a3b8" fontSize="11">t (time)</text>
            <text x="110" y="22" fill="#94a3b8" fontSize="11" textAnchor="middle">T</text>
            {/* Ambient line */}
            <line x1="120" y1="240" x2="640" y2="240" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
            <text x="650" y="245" fill="#a855f7" fontSize="10" fontWeight="bold">T₀ (ambient)</text>
            {/* Exponential cooling curve */}
            <path d="M 140 80 C 200 100, 260 160, 340 200 C 420 230, 500 238, 620 240" fill="none" stroke="#ef4444" strokeWidth="3.5" />
            {/* Initial point */}
            <circle cx="140" cy="80" r="5" fill="#ef4444" />
            <text x="150" y="70" fill="#ef4444" fontSize="10" fontWeight="bold">T(0) = T_initial</text>
            {/* Half-life marker */}
            <line x1="340" y1="200" x2="340" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="345" y="295" fill="#f59e0b" fontSize="10" fontWeight="bold">t₁/₂: T drops to ½(T₀−T_ambient)</text>
            {/* Rate labels */}
            <text x="200" y="95" fill="#cbd5e1" fontSize="9">fast cooling</text>
            <text x="500" y="225" fill="#cbd5e1" fontSize="9">slow approach</text>
            {/* Formula */}
            <rect x="140" y="315" width="420" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="335" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">T(t) = T₀ + (T_i − T₀)·e^(−kt)</text>
            <text x="350" y="350" fill="#cbd5e1" fontSize="9" textAnchor="middle">Newton's Law of Cooling: rate ∝ (T − T₀)</text>
          </svg>
        );

      case "linear-expansion":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Rod: cold vs hot */}
            <rect x="80" y="100" width="240" height="30" rx="4" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="200" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Cold: L₀</text>
            <rect x="80" y="140" width="280" height="30" rx="4" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2.5" />
            <text x="220" y="125" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Hot: L₀ + ΔL</text>
            {/* Expansion dimension */}
            <line x1="320" y1="140" x2="360" y2="140" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="340" y="170" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">ΔL</text>
            {/* ΔL vs T graph */}
            <line x1="450" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="470" y1="320" x2="470" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="665" y="308" fill="#94a3b8" fontSize="10">ΔT</text>
            <text x="465" y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">ΔL</text>
            <line x1="470" y1="300" x2="640" y2="90" stroke="#f59e0b" strokeWidth="3" />
            <text x="560" y="80" fill="#f59e0b" fontSize="10" fontWeight="bold">Slope = α·L₀</text>
            {/* Formula box */}
            <rect x="140" y="220" width="360" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="320" y="245" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">ΔL = α · L₀ · ΔT</text>
            <text x="320" y="268" fill="#cbd5e1" fontSize="10" textAnchor="middle">α = linear expansivity (per °C)  |  Steel α ≈ 11×10⁻⁶/°C</text>
          </svg>
        );

      case "energy-bands-semiconductor":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Energy axis */}
            <line x1="120" y1="320" x2="120" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="110" y="22" fill="#94a3b8" fontSize="11" textAnchor="middle">E</text>
            {/* Conduction Band */}
            <rect x="160" y="80" width="420" height="50" rx="6" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="370" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Conduction Band (EC)</text>
            {/* Valence Band */}
            <rect x="160" y="220" width="420" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <text x="370" y="250" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Valence Band (EV)</text>
            {/* Band Gap */}
            <rect x="160" y="130" width="420" height="90" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" />
            <text x="370" y="175" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Band Gap  E_g</text>
            <text x="370" y="195" fill="#cbd5e1" fontSize="10" textAnchor="middle">Si: 1.12 eV  |  Ge: 0.67 eV  |  GaAs: 1.43 eV</text>
            {/* Excited electron + hole */}
            <circle cx="420" cy="105" r="8" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
            <text x="435" y="110" fill="#38bdf8" fontSize="10">e⁻ (excited)</text>
            <circle cx="350" cy="245" r="8" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 2" />
            <text x="365" y="250" fill="#10b981" fontSize="10">hole (h⁺)</text>
            {/* Arrow for excitation */}
            <line x1="380" y1="230" x2="400" y2="130" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="410" y="185" fill="#f59e0b" fontSize="10" fontWeight="bold">hν ≥ E_g</text>
            {/* Fermi level */}
            <line x1="140" y1="175" x2="600" y2="175" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="610" y="180" fill="#a855f7" fontSize="10" fontWeight="bold">E_F</text>
          </svg>
        );

      case "electrolysis-faraday":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            {/* Beaker with electrolyte */}
            <rect x="180" y="100" width="340" height="200" rx="10" fill="#38bdf8" fillOpacity="0.08" stroke="#64748b" strokeWidth="3" />
            <rect x="185" y="140" width="330" height="155" rx="6" fill="#38bdf8" fillOpacity="0.2" />
            <text x="350" y="175" fill="#38bdf8" fontSize="10" textAnchor="middle">Electrolyte (molten / aq.)</text>
            {/* Cathode (left, negative) */}
            <rect x="220" y="120" width="14" height="150" rx="3" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
            <text x="205" y="115" fill="#ef4444" fontSize="11" fontWeight="bold">Cathode (−)</text>
            <text x="205" y="285" fill="#ef4444" fontSize="9">Reduction: M⁺ + e⁻ → M</text>
            {/* Anode (right, positive) */}
            <rect x="466" y="120" width="14" height="150" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <text x="495" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold">Anode (+)</text>
            <text x="495" y="285" fill="#38bdf8" fontSize="9">Oxidation: X⁻ → X + e⁻</text>
            {/* DC supply */}
            <rect x="310" y="30" width="80" height="40" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="55" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">DC Supply</text>
            <line x1="320" y1="70" x2="227" y2="120" stroke="#f59e0b" strokeWidth="2" />
            <line x1="380" y1="70" x2="473" y2="120" stroke="#f59e0b" strokeWidth="2" />
            {/* Ion migration */}
            <text x="310" y="220" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Cations → Cathode | Anions → Anode</text>
            {/* Faraday's law */}
            <rect x="140" y="315" width="420" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="335" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Faraday: m = (M / nF) · I · t  |  1 F = 96485 C/mol e⁻</text>
            <text x="350" y="350" fill="#cbd5e1" fontSize="9" textAnchor="middle">M = molar mass, n = electrons, I = current, t = time</text>
          </svg>
        );


      case "vector-laws-addition":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <circle cx="100" cy="300" r="4" fill="#64748b" />
            <line x1="100" y1="300" x2="320" y2="140" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
            <line x1="320" y1="140" x2="520" y2="220" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <line x1="100" y1="300" x2="520" y2="220" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" markerEnd="url(#arrow)" />
            <text x="330" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
            <text x="440" y="170" fill="#10b981" fontSize="12" fontWeight="bold">B</text>
            <text x="300" y="270" fill="#f59e0b" fontSize="12" fontWeight="bold">A + B = R</text>
            <rect x="430" y="280" width="240" height="45" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="550" y="300" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Head-to-tail: R = A + B</text>
            <text x="550" y="315" fill="#cbd5e1" fontSize="9" textAnchor="middle">Polygon law: A+B+C+... = resultant</text>
          </svg>
        );

      case "vector-resolution-unit-vectors":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="100" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="100" y1="320" x2="100" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="645" y="305" fill="#94a3b8" fontSize="11">x</text>
            <text x="95" y="30" fill="#94a3b8" fontSize="11" textAnchor="middle">y</text>
            <line x1="100" y1="300" x2="440" y2="120" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="290" y="180" fill="#38bdf8" fontSize="14" fontWeight="bold">A</text>
            <line x1="100" y1="300" x2="440" y2="300" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
            <line x1="440" y1="300" x2="440" y2="120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
            <line x1="440" y1="120" x2="100" y2="120" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
            <text x="270" y="320" fill="#f59e0b" fontSize="11" fontWeight="bold">Aₓ = A cos θ</text>
            <text x="450" y="215" fill="#f59e0b" fontSize="11" fontWeight="bold">Aᵧ = A sin θ</text>
            <path d="M 140 300 A 40 40 0 0 0 135 285" fill="none" stroke="#10b981" strokeWidth="2" />
            <text x="150" y="295" fill="#10b981" fontSize="10" fontWeight="bold">θ</text>
            <rect x="180" y="335" width="360" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="360" y="352" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">A = Aₓî + Aᵧĵ  |  |A| = √(Aₓ² + Aᵧ²)</text>
          </svg>
        );

      case "cross-product-vectors":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <circle cx="150" cy="300" r="4" fill="#64748b" />
            <line x1="150" y1="300" x2="500" y2="300" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="320" y="320" fill="#38bdf8" fontSize="13" fontWeight="bold">A</text>
            <line x1="150" y1="300" x2="450" y2="140" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="300" y="200" fill="#10b981" fontSize="13" fontWeight="bold">B</text>
            <path d="M 210 300 A 60 60 0 0 0 200 278" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="215" y="285" fill="#f59e0b" fontSize="11" fontWeight="bold">θ</text>
            <line x1="450" y1="300" x2="450" y2="90" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="465" y="90" fill="#ef4444" fontSize="12" fontWeight="bold">A × B</text>
            <text x="465" y="105" fill="#ef4444" fontSize="9">⊥ plane, RHR</text>
            <rect x="150" y="330" width="420" height="30" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="360" y="350" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">|A × B| = |A||B| sin θ  →  Area of parallelogram = |A × B|</text>
          </svg>
        );

      case "types-of-vectors":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <rect x="40" y="40" width="620" height="70" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />
            <text x="350" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">By Magnitude</text>
            <text x="350" y="90" fill="#cbd5e1" fontSize="11" textAnchor="middle">Unit vector (|A|=1) | Position vector | Displacement</text>
            <rect x="40" y="130" width="620" height="70" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="155" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">By Behavior (Frame)</text>
            <text x="350" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Polar vector | Axial (pseudo) vector | Null vector</text>
            <rect x="40" y="220" width="620" height="70" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="245" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">By Relation</text>
            <text x="350" y="270" fill="#cbd5e1" fontSize="11" textAnchor="middle">Equal | Like | Unlike | Co-initial | Coplanar</text>
            <rect x="40" y="310" width="620" height="40" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="350" y="335" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Axial example: angular velocity ω, torque τ, angular momentum L (along axis, RHR)</text>
          </svg>
        );

      case "instantaneous-velocity-acceleration":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="665" y="305" fill="#94a3b8" fontSize="11">t</text>
            <text x="95" y="22" fill="#94a3b8" fontSize="11" textAnchor="middle">x</text>
            <path d="M 120 280 C 220 240, 320 150, 450 110 C 540 80, 600 70, 640 65" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
            <circle cx="360" cy="140" r="5" fill="#ef4444" />
            <line x1="230" y1="205" x2="490" y2="90" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="360" y="120" fill="#f59e0b" fontSize="10" fontWeight="bold">slope = v</text>
            <text x="450" y="100" fill="#f59e0b" fontSize="9">v = dx/dt (tangent)</text>
            <text x="450" y="50" fill="#ef4444" fontSize="11" fontWeight="bold">Instantaneous v = dx/dt, a = dv/dt = d²x/dt²</text>
          </svg>
        );

      case "relative-velocity":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="60" y1="220" x2="640" y2="220" stroke="#64748b" strokeWidth="2" />
            <text x="645" y="215" fill="#94a3b8" fontSize="10">riverbank</text>
            <rect x="150" y="195" width="50" height="50" rx="4" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2.5" />
            <text x="175" y="270" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Boat (B)</text>
            <line x1="200" y1="220" x2="360" y2="220" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="280" y="210" fill="#10b981" fontSize="10">v_B/ground</text>
            <rect x="450" y="195" width="50" height="50" rx="4" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="475" y="270" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Current</text>
            <line x1="500" y1="220" x2="620" y2="220" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5 3" markerEnd="url(#arrow)" />
            <text x="560" y="240" fill="#38bdf8" fontSize="9">v_water</text>
            <rect x="180" y="315" width="360" height="30" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="360" y="335" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">v_B/ground = v_B/water + v_water/ground (Galilean)</text>
          </svg>
        );

      case "equations-of-motion-graphs":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <rect x="40" y="40" width="290" height="130" rx="8" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2" />
            <line x1="70" y1="150" x2="300" y2="150" stroke="#64748b" strokeWidth="1.5" />
            <line x1="70" y1="150" x2="70" y2="60" stroke="#64748b" strokeWidth="1.5" />
            <line x1="70" y1="150" x2="290" y2="70" stroke="#38bdf8" strokeWidth="3" />
            <text x="180" y="95" fill="#38bdf8" fontSize="10">v–t: slope = a, area = s</text>
            <text x="180" y="170" fill="#cbd5e1" fontSize="9" textAnchor="middle">v = u + at</text>
            <rect x="370" y="40" width="290" height="130" rx="8" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2" />
            <line x1="400" y1="150" x2="630" y2="150" stroke="#64748b" strokeWidth="1.5" />
            <line x1="400" y1="150" x2="400" y2="60" stroke="#64748b" strokeWidth="1.5" />
            <line x1="400" y1="150" x2="620" y2="60" stroke="#10b981" strokeWidth="3" />
            <text x="510" y="95" fill="#10b981" fontSize="10">x–t: slope = v</text>
            <text x="510" y="170" fill="#cbd5e1" fontSize="9" textAnchor="middle">x = ut + ½at²</text>
            <rect x="40" y="190" width="620" height="40" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="215" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">v² = u² + 2as  |  s = (u+v)t/2  |  a = 0: v = u, x = ut</text>
            <text x="350" y="230" fill="#cbd5e1" fontSize="9" textAnchor="middle">Graphical: area under v–t = displacement (SUVAT)</text>
          </svg>
        );

      case "free-falling-body":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="80" y1="60" x2="620" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <text x="630" y="55" fill="#94a3b8" fontSize="10">height h</text>
            <circle cx="180" cy="90" r="10" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
            <text x="180" y="130" fill="#ef4444" fontSize="9" textAnchor="middle">t=0, v=0</text>
            <line x1="180" y1="100" x2="180" y2="170" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
            <circle cx="340" cy="220" r="11" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
            <line x1="340" y1="232" x2="340" y2="300" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="340" y="315" fill="#f59e0b" fontSize="9" textAnchor="middle">v = gt (grows)</text>
            <circle cx="520" cy="290" r="12" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
            <line x1="520" y1="302" x2="520" y2="350" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="520" y="345" fill="#10b981" fontSize="9" textAnchor="middle">impacts ground</text>
            <rect x="150" y="350" width="400" height="20" rx="4" fill="#64748b" />
            <text x="350" y="365" fill="#cbd5e1" fontSize="10" textAnchor="middle">h = ½gt²,  v = √(2gh),  t = √(2h/g)</text>
          </svg>
        );

      case "impulse-momentum":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <rect x="80" y="230" width="120" height="60" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="140" y="265" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">m (ball)</text>
            <line x1="200" y1="260" x2="360" y2="260" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="280" y="250" fill="#38bdf8" fontSize="10">pᵢ = mu</text>
            <rect x="380" y="230" width="120" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <line x1="500" y1="260" x2="640" y2="260" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="570" y="250" fill="#10b981" fontSize="10">p_f = mv</text>
            <text x="350" y="220" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Impulse J = F·Δt = Δp = mv − mu</text>
            <rect x="120" y="90" width="460" height="60" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="115" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">F = Δp/Δt  →  average force over collision time</text>
            <text x="350" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle">Shorter impact time ⇒ larger force (cushioning principle)</text>
          </svg>
        );

      case "conservation-momentum":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="80" y1="180" x2="620" y2="180" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />
            <rect x="120" y="150" width="90" height="60" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="165" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">m₁</text>
            <line x1="210" y1="180" x2="320" y2="180" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="265" y="170" fill="#38bdf8" fontSize="9">u₁</text>
            <rect x="430" y="150" width="90" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.5" />
            <text x="475" y="185" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">m₂</text>
            <line x1="430" y1="180" x2="360" y2="180" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="400" y="170" fill="#10b981" fontSize="9">u₂</text>
            <rect x="150" y="250" width="400" height="60" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="275" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">No external force ⇒ m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</text>
            <text x="350" y="298" fill="#cbd5e1" fontSize="9" textAnchor="middle">Explosion: 0 = m₁v₁ + m₂v₂ (opposite velocities)</text>
          </svg>
        );

      case "newtons-laws-application":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <polygon points="80,300 620,300 620,120" fill="#64748b" fillOpacity="0.08" stroke="#64748b" strokeWidth="3" />
            <g transform="translate(300, 240) rotate(0)">
              <rect x="-35" y="-25" width="70" height="50" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
              <text x="0" y="5" fill="#fff" textAnchor="middle" fontSize="12" fontWeight="bold">m</text>
            </g>
            <line x1="300" y1="215" x2="300" y2="120" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="310" y="130" fill="#38bdf8" fontSize="10">N = mg cos θ</text>
            <line x1="300" y1="265" x2="430" y2="265" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="440" y="260" fill="#10b981" fontSize="10">mg sin θ</text>
            <line x1="300" y1="265" x2="200" y2="265" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="120" y="260" fill="#ef4444" fontSize="10">f = μN</text>
            <rect x="150" y="315" width="400" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="338" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Net: ma = mg sin θ − μmg cos θ  ⟹  a = g(sin θ − μcos θ)</text>
          </svg>
        );

      case "torque-equilibrium":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="80" y1="180" x2="620" y2="180" stroke="#64748b" strokeWidth="4" />
            <polygon points="340,180 350,150 330,150" fill="#f59e0b" />
            <circle cx="340" cy="180" r="8" fill="#f59e0b" />
            <line x1="140" y1="180" x2="140" y2="280" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="140" y="300" fill="#38bdf8" fontSize="10" textAnchor="middle">F₁ (down)</text>
            <text x="200" y="170" fill="#cbd5e1" fontSize="9">d₁</text>
            <line x1="520" y1="180" x2="520" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="520" y="70" fill="#10b981" fontSize="10" textAnchor="middle">F₂ (up)</text>
            <text x="430" y="170" fill="#cbd5e1" fontSize="9">d₂</text>
            <rect x="150" y="320" width="400" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="350" y="343" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Rotational equilibrium: Στ = 0  ⟹  F₁·d₁ = F₂·d₂</text>
          </svg>
        );

      case "solid-friction":
        return (
          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
            <line x1="60" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="4" />
            <rect x="250" y="220" width="180" height="80" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
            <text x="340" y="265" fill="#fff" textAnchor="middle" fontSize="13" fontWeight="bold">Block m</text>
            <line x1="430" y1="260" x2="600" y2="260" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="520" y="250" fill="#10b981" fontSize="11">F (applied)</text>
            <line x1="250" y1="260" x2="110" y2="260" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="180" y="245" fill="#ef4444" fontSize="11">f (friction)</text>
            <line x1="340" y1="220" x2="340" y2="150" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="350" y="145" fill="#38bdf8" fontSize="10">N</text>
            <line x1="340" y1="300" x2="340" y2="345" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="350" y="360" fill="#a855f7" fontSize="10">mg</text>
            <rect x="120" y="320" width="460" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="343" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">f_s ≤ μ_s·N  |  f_k = μ_k·N  (μ_s &gt; μ_k)</text>
          </svg>
        );



      case "conical-pendulum":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <circle cx="350" cy="50" r="6" fill="#f59e0b" />

            <line x1="350" y1="50" x2="250" y2="250" stroke="#38bdf8" strokeWidth="2.5" />

            <line x1="350" y1="50" x2="450" y2="250" stroke="#38bdf8" strokeWidth="2.5" />

            <circle cx="450" cy="250" r="18" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2.5" />

            <text x="475" y="255" fill="#10b981" fontSize="11" fontWeight="bold">m</text>

            <line x1="350" y1="50" x2="350" y2="250" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 3" />

            <text x="355" y="160" fill="#a855f7" fontSize="10">l</text>

            <path d="M 250 250 A 200 200 0 0 1 450 250" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />

            <text x="350" y="275" fill="#64748b" fontSize="9" textAnchor="middle">circular path (radius r = l sin θ)</text>

            <rect x="130" y="310" width="440" height="50" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="332" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">T cos θ = mg &amp; T sin θ = mv²/r</text>

            <text x="350" y="352" fill="#cbd5e1" fontSize="9" textAnchor="middle">Period: T = 2π√(l cos θ / g) — independent of mass!</text>

          </svg>

        );



      case "vertical-circle":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <circle cx="350" cy="180" r="130" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

            <circle cx="350" cy="50" r="10" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />

            <text x="365" y="45" fill="#ef4444" fontSize="10" fontWeight="bold">Top</text>

            <line x1="350" y1="60" x2="350" y2="110" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <text x="360" y="88" fill="#ef4444" fontSize="9">mg + T</text>

            <circle cx="350" cy="310" r="10" fill="#10b981" fillOpacity="0.5" stroke="#10b981" strokeWidth="2" />

            <text x="365" y="315" fill="#10b981" fontSize="10" fontWeight="bold">Bottom</text>

            <line x1="350" y1="300" x2="350" y2="250" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <text x="360" y="278" fill="#10b981" fontSize="9">T - mg</text>

            <circle cx="480" cy="180" r="10" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />

            <text x="495" y="185" fill="#f59e0b" fontSize="10">Side</text>

            <rect x="120" y="325" width="460" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="348" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Min speed at top: v ≥ √(gr) | Min at bottom: v = √(5gr)</text>

          </svg>

        );



      case "banking-of-roads":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <polygon points="80,280 620,280 620,200 80,200" fill="#64748b" fillOpacity="0.15" stroke="#64748b" strokeWidth="3" />

            <polygon points="80,200 620,200 620,170 80,170" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />

            <rect x="280" y="130" width="140" height="70" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />

            <text x="350" y="170" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold">Car m</text>

            <line x1="350" y1="200" x2="350" y2="250" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="365" y="235" fill="#a855f7" fontSize="10">N</text>

            <line x1="350" y1="195" x2="350" y2="140" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <text x="365" y="155" fill="#ef4444" fontSize="10">mg</text>

            <path d="M 140 280 A 30 30 0 0 1 170 260" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            <text x="145" y="275" fill="#f59e0b" fontSize="11" fontWeight="bold">θ</text>

            <rect x="140" y="305" width="420" height="50" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="328" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">tan θ = v²/(rg) → safe speed without friction</text>

            <text x="350" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">No reliance on friction → safer turns!</text>

          </svg>

        );



      case "centre-of-mass":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="80" y1="200" x2="620" y2="200" stroke="#64748b" strokeWidth="2" />

            <circle cx="160" cy="200" r="16" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />

            <text x="160" y="255" fill="#38bdf8" fontSize="10" textAnchor="middle">m₁</text>

            <circle cx="540" cy="200" r="12" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />

            <text x="540" y="255" fill="#10b981" fontSize="10" textAnchor="middle">m₂</text>

            <circle cx="340" cy="200" r="8" fill="#f59e0b" />

            <text x="340" y="220" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">COM</text>

            <line x1="160" y1="200" x2="340" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />

            <line x1="340" y1="200" x2="540" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />

            <text x="250" y="188" fill="#f59e0b" fontSize="9">r₁</text>

            <text x="440" y="188" fill="#f59e0b" fontSize="9">r₂</text>

            <rect x="150" y="295" width="400" height="50" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="318" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">X_com = (m₁r₁ + m₂r₂)/(m₁ + m₂)</text>

            <text x="350" y="338" fill="#cbd5e1" fontSize="9" textAnchor="middle">Internal forces cannot shift COM — only external forces can!</text>

          </svg>

        );



      case "gps-principle":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <circle cx="350" cy="200" r="80" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" />

            <text x="350" y="205" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Earth</text>

            <circle cx="350" cy="50" r="10" fill="#f59e0b" />

            <circle cx="150" cy="120" r="10" fill="#f59e0b" />

            <circle cx="550" cy="120" r="10" fill="#f59e0b" />

            <text x="350" y="35" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">Sat 1</text>

            <text x="120" y="115" fill="#f59e0b" fontSize="9" fontWeight="bold">Sat 2</text>

            <text x="580" y="115" fill="#f59e0b" fontSize="9" fontWeight="bold">Sat 3</text>

            <circle cx="350" cy="50" r="180" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />

            <circle cx="150" cy="120" r="180" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />

            <circle cx="550" cy="120" r="180" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />

            <circle cx="350" cy="280" r="6" fill="#ef4444" />

            <text x="350" y="300" fill="#ef4444" fontSize="9" textAnchor="middle">User</text>

            <rect x="140" y="335" width="420" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="352" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Trilateration: 4 satellites give X,Y,Z,t position</text>

          </svg>

        );



      case "stress-strain-curve":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="80" y1="310" x2="640" y2="310" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="330" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="645" y="315" fill="#94a3b8" fontSize="11">Strain ε</text>

            <text x="90" y="22" fill="#94a3b8" fontSize="11" textAnchor="middle">Stress σ</text>

            <path d="M 100 310 L 300 100 Q 350 40 380 35 L 420 30 L 450 32 L 520 60 L 600 280" fill="none" stroke="#38bdf8" strokeWidth="3.5" />

            <circle cx="150" cy="250" r="4" fill="#10b981" />

            <text x="130" y="245" fill="#10b981" fontSize="9">A (proportional limit)</text>

            <circle cx="300" cy="100" r="4" fill="#f59e0b" />

            <text x="300" y="85" fill="#f59e0b" fontSize="9" textAnchor="middle">B (yield point)</text>

            <circle cx="380" cy="35" r="4" fill="#ef4444" />

            <text x="380" y="22" fill="#ef4444" fontSize="9" textAnchor="middle">C (ultimate strength)</text>

            <circle cx="520" cy="60" r="4" fill="#a855f7" />

            <text x="520" y="50" fill="#a855f7" fontSize="9" textAnchor="middle">D (fracture)</text>

            <text x="520" y="295" fill="#cbd5e1" fontSize="9">Plastic region</text>

            <rect x="150" y="310" width="400" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="333" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Young's modulus: Y = σ/ε (slope of AB)</text>

          </svg>

        );



      case "elastic-moduli":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <rect x="80" y="40" width="540" height="60" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Y = Stress/Longitudinal strain = F·L₀/(A·ΔL) — rigidity</text>

            <rect x="80" y="115" width="540" height="60" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="150" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">B = Volumetric stress / Volumetric strain = P/(-ΔV/V) — bulk</text>

            <rect x="80" y="190" width="540" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="225" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">G (η) = Shear stress / Shear strain = (F/A)/tan θ — rigidity</text>

            <rect x="80" y="265" width="540" height="60" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />

            <text x="350" y="300" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">ν = lateral strain / longitudinal strain (0 &lt; ν &lt; 0.5)</text>

            <text x="350" y="335" fill="#cbd5e1" fontSize="9" textAnchor="middle">Typical values: Steel Y=200GPa, Copper Y=120GPa, Rubber ν≈0.49</text>

          </svg>

        );



      case "elastic-potential-energy":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="100" y1="200" x2="620" y2="200" stroke="#64748b" strokeWidth="2" />

            <circle cx="120" cy="200" r="6" fill="#64748b" />

            <path d="M 120 200 L 200 195 L 220 205 L 240 195 L 260 205 L 280 195 L 300 200 L 320 195 L 340 205 L 360 195 L 380 200 L 420 200" fill="none" stroke="#f59e0b" strokeWidth="3" />

            <line x1="420" y1="200" x2="560" y2="200" stroke="#64748b" strokeWidth="3" />

            <circle cx="560" cy="200" r="6" fill="#64748b" />

            <text x="340" y="175" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Spring stretched by x</text>

            <line x1="120" y1="220" x2="560" y2="220" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5 3" />

            <text x="340" y="235" fill="#38bdf8" fontSize="10" textAnchor="middle">Extension = x</text>

            <line x1="500" y1="200" x2="500" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="510" y="140" fill="#10b981" fontSize="11">F = kx</text>

            <rect x="150" y="280" width="400" height="65" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="305" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Elastic PE: U = ½kx²</text>

            <text x="350" y="325" fill="#cbd5e1" fontSize="9" textAnchor="middle">Work done stretching spring stored as elastic potential energy</text>

            <text x="350" y="342" fill="#cbd5e1" fontSize="9" textAnchor="middle">Area under F-x graph = ½·base·height = ½·x·kx = ½kx²</text>

          </svg>

        );



      case "zeroth-law-thermal-equilibrium":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <rect x="100" y="80" width="180" height="100" rx="10" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />

            <text x="190" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Body A</text>

            <text x="190" y="155" fill="#cbd5e1" fontSize="10" textAnchor="middle">T_A</text>

            <rect x="420" y="80" width="180" height="100" rx="10" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="3" />

            <text x="510" y="135" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Body B</text>

            <text x="510" y="155" fill="#cbd5e1" fontSize="10" textAnchor="middle">T_B</text>

            <circle cx="190" cy="220" r="50" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="3" />

            <text x="190" y="225" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Thermometer</text>

            <line x1="240" y1="220" x2="400" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="320" y="210" fill="#64748b" fontSize="10">t = t_A</text>

            <line x1="400" y1="180" x2="510" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="455" y="170" fill="#64748b" fontSize="10">t = t_B</text>

            <text x="350" y="320" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Transitive property: if t_A = t and t_B = t, then T_A = T_B</text>

          </svg>

        );



      case "principle-of-calorimetry":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <rect x="100" y="80" width="200" height="100" rx="10" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="3" />

            <text x="200" y="135" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Hot body</text>

            <text x="200" y="155" fill="#ef4444" fontSize="10" textAnchor="middle">m₁c₁(T₁−T)</text>

            <rect x="400" y="80" width="200" height="100" rx="10" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />

            <text x="500" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Cold body</text>

            <text x="500" y="155" fill="#38bdf8" fontSize="10" textAnchor="middle">m₂c₂(T−T₂)</text>

            <line x1="300" y1="130" x2="400" y2="130" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="350" y="120" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Heat</text>

            <rect x="150" y="240" width="400" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="270" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Heat lost = Heat gained (isolated system)</text>

            <text x="350" y="290" fill="#cbd5e1" fontSize="10" textAnchor="middle">m₁c₁(T₁−T) = m₂c₂(T−T₂)</text>

            <text x="350" y="320" fill="#cbd5e1" fontSize="9" textAnchor="middle">No heat lost to surroundings ⇒ calorimeter equation valid</text>

          </svg>

        );



      case "newtons-law-cooling-experiment":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="80" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="645" y="310" fill="#94a3b8" fontSize="10">t (time)</text>

            <text x="90" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">θ</text>

            <line x1="100" y1="240" x2="640" y2="240" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

            <text x="645" y="235" fill="#a855f7" fontSize="9">θ₀ (ambient)</text>

            <path d="M 120 60 C 200 80, 280 140, 380 200 C 480 240, 560 238, 640 240" fill="none" stroke="#ef4444" strokeWidth="3.5" />

            <text x="200" y="90" fill="#cbd5e1" fontSize="9">fast cooling (large ΔT)</text>

            <text x="520" y="220" fill="#cbd5e1" fontSize="9">slow approach to θ₀</text>

            <rect x="150" y="300" width="400" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="323" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">dθ/dt = −k(θ − θ₀) → θ(t) = θ₀ + (θᵢ − θ₀)e^(-kt)</text>

          </svg>

        );



      case "fourier-conduction":

        return (

          <svg viewBox="0 0 700 360" className="w是全 h-auto select-none">

            <line x1="80" y1="200" x2="620" y2="200" stroke="#64748b" strokeWidth="2" />

            <rect x="150" y="150" width="80" height="100" rx="4" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />

            <text x="190" y="265" fill="#ef4444" fontSize="10" textAnchor="middle">T₁ (hot)</text>

            <rect x="470" y="150" width="80" height="100" rx="4" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />

            <text x="510" y="265" fill="#38bdf8" fontSize="10" textAnchor="middle">T₂ (cold)</text>

            <line x1="230" y1="200" x2="470" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="350" y="190" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Q/t = kAΔT/L</text>

            <text x="350" y="285" fill="#cbd5e1" fontSize="9" textAnchor="middle">Fourier's Law: rate of heat flow ∝ area × temp gradient</text>

          </svg>

        );



      case "stefan-boltzmann-law":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <circle cx="350" cy="180" r="100" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="3" />

            <circle cx="350" cy="180" r="60" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />

            <text x="350" y="185" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">Black body</text>

            <line x1="450" y1="180" x2="580" y2="80" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5 3" />

            <line x1="450" y1="180" x2="580" y2="180" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5 3" />

            <line x1="450" y1="180" x2="580" y2="280" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5 3" />

            <text x="580" y="65" fill="#fbbf24" fontSize="9">Radiation</text>

            <rect x="150" y="310" width="400" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="335" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">P = εσAT⁴  |  Stefan-Boltzmann constant: σ = 5.67×10⁻⁸ W/m²K⁴</text>

          </svg>

        );



      case "kinetic-theory-gas":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <rect x="100" y="80" width="500" height="200" rx="10" fill="#38bdf8" fillOpacity="0.05" stroke="#38bdf8" strokeWidth="3" />

            {[0,1,2,3,4].map(i => [0,1,2,3,4].map(j => (

              <circle key={i+j} cx={150+i*90} cy={120+j*45} r="8" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />

            )))}

            <text x="350" y="305" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">N molecules: random motion, elastic collisions</text>

            <rect x="120" y="200" width="460" height="90" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="225" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Postulates: (1) Point masses (2) Random motion (3) No intermolecular forces</text>

            <text x="350" y="245" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">(4) Elastic collisions (5) KE ∝ T (absolute)</text>

          </svg>

        );



      case "pressure-exerted-by-gas":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="100" width="500" height="180" rx="10" fill="#38bdf8" fillOpacity="0.05" stroke="#38bdf8" strokeWidth="3" />

            <line x1="350" y1="100" x2="350" y2="280" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />

            <text x="350" y="90" fill="#64748b" fontSize="11" textAnchor="middle">Wall</text>

            <line x1="280" y1="190" x2="350" y2="190" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="290" y="175" fill="#38bdf8" fontSize="10">mv before</text>

            <line x1="350" y1="200" x2="420" y2="200" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="360" y="185" fill="#10b981" fontSize="10">−mv after</text>

            <text x="350" y="295" fill="#f59e0b" fontSize="10" textAnchor="middle">Δp = 2mv</text>

            <rect x="120" y="315" width="460" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="340" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">P = (1/3)ρc² = (1/3)(Nm/V)c_rms² = nRT/V</text>

          </svg>

        );



      case "boltzmann-rms-speed":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="100" y1="280" x2="620" y2="280" stroke="#64748b" strokeWidth="2" />

            <line x1="100" y1="300" x2="100" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="625" y="285" fill="#94a3b8" fontSize="10">v (speed)</text>

            <text x="90" y="30" fill="#94a3b8" fontSize="10" textAnchor="middle">N(v)</text>

            <path d="M 150 280 C 180 120, 300 40, 400 60 C 480 80, 540 200, 570 280" fill="none" stroke="#38bdf8" strokeWidth="3" />

            <path d="M 180 280 C 200 160, 320 80, 410 100 C 480 120, 520 220, 540 280" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />

            <text x="340" y="70" fill="#38bdf8" fontSize="10" fontWeight="bold">T₁ (higher T)</text>

            <text x="370" y="130" fill="#10b981" fontSize="10" fontWeight="bold">T₂ (lower T)</text>

            <rect x="120" y="300" width="460" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="322" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">c_rms = √(3k_BT/m) = √(3RT/M)</text>

            <text x="350" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">Most probable: c_mp = √(2RT/M), Mean: c_mean = √(8RT/πM)</text>

          </svg>

        );



      case "heat-capacities-gases":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="50" width="540" height="70" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="80" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">C_p: Heat capacity at constant pressure</text>

            <text x="350" y="100" fill="#cbd5e1" fontSize="10" textAnchor="middle">All heat goes to internal energy + work done</text>

            <rect x="80" y="135" width="540" height="70" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="165" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">C_v: Heat capacity at constant volume</text>

            <text x="350" y="185" fill="#cbd5e1" fontSize="10" textAnchor="middle">All heat goes to internal energy only (no work)</text>

            <rect x="80" y="220" width="540" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="250" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">γ = C_p/C_v (ratio of specific heats)</text>

            <text x="350" y="270" fill="#cbd5e1" fontSize="10" textAnchor="middle">Monoatomic: γ = 5/3 ≈ 1.67 | Diatomic: γ = 7/5 = 1.4</text>

            <rect x="150" y="295" width="400" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="318" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Mayer's relation: C_p − C_v = R</text>

            <text x="350" y="336" fill="#cbd5e1" fontSize="10" textAnchor="middle">R = universal gas constant = 8.314 J/(mol·K)</text>

          </svg>

        );




      case "mirror-formula":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <path d="M 350 80 C 250 80, 250 280, 350 280" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" />

            <text x="350" y="300" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Concave Mirror</text>

            <circle cx="350" cy="180" r="5" fill="#f59e0b" />

            <text x="350" y="320" fill="#f59e0b" fontSize="10" textAnchor="middle">P (pole)</text>

            <line x1="350" y1="80" x2="350" y2="280" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

            <text x="350" y="70" fill="#a855f7" fontSize="10" textAnchor="middle">Principal axis</text>

            <rect x="150" y="220" width="180" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="240" y="245" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1/f = 1/v + 1/u</text>

          </svg>

        );



      case "snells-law-refraction":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="350" y1="60" x2="350" y2="300" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />

            <line x1="350" y1="60" x2="350" y2="300" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />

            <path d="M 200 180 L 350 180 L 500 280" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            <path d="M 350 180 L 350 280" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <path d="M 230 150 A 30 30 0 0 1 245 168" fill="none" stroke="#f59e0b" strokeWidth="2" />

            <text x="240" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">i</text>

            <path d="M 350 210 A 30 30 0 0 1 335 225" fill="none" stroke="#ef4444" strokeWidth="2" />

            <text x="325" y="245" fill="#ef4444" fontSize="11" fontWeight="bold">r</text>

            <rect x="150" y="310" width="400" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="335" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">n₁ sin i = n₂ sin r  |  n = c/v</text>

          </svg>

        );



      case "total-internal-reflection":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" />

            <circle cx="350" cy="280" r="100" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />

            <line x1="350" y1="280" x2="350" y2="80" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

            <path d="M 250 180 L 350 280 L 450 180" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <path d="M 350 280 L 550 280" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <text x="350" y="310" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Critical angle: sin θ_c = n₂/n₁</text>

            <text x="350" y="330" fill="#cbd5e1" fontSize="9" textAnchor="middle">For water-air: θ_c ≈ 48.6°</text>

          </svg>

        );



      case "prism-minimum-deviation":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <polygon points="350,60 200,300 500,300" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" />

            <text x="350" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Prism</text>

            <text x="350" y="80" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">A (apex)</text>

            <path d="M 150 200 L 250 200 L 350 250 L 450 200 L 550 200" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <path d="M 350 250 L 350 300" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />

            <text x="350" y="320" fill="#f59e0b" fontSize="10" textAnchor="middle">δ_m (minimum deviation)</text>

            <rect x="150" y="330" width="400" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="347" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">n = sin((A+δ_m)/2) / sin(A/2)</text>

          </svg>

        );



      case "chromatic-aberration":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="60" y1="180" x2="640" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <ellipse cx="350" cy="180" rx="50" ry="120" fill="none" stroke="#38bdf8" strokeWidth="3" />

            <path d="M 150 180 L 350 180" stroke="#ef4444" strokeWidth="2" />

            <path d="M 150 170 L 350 170" stroke="#f59e0b" strokeWidth="2" />

            <path d="M 150 190 L 350 190" stroke="#38bdf8" strokeWidth="2" />

            <text x="360" y="170" fill="#f59e0b" fontSize="10">Red focus</text>

            <text x="360" y="180" fill="#ffd700" fontSize="10">Yellow focus</text>

            <text x="360" y="190" fill="#38bdf8" fontSize="10">Blue focus</text>

            <text x="350" y="330" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Chromatic aberration: different λ focus at different points</text>

          </svg>

        );



      case "gauss-law-application":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <circle cx="350" cy="180" r="60" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />

            <text x="350" y="185" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">Charge Q</text>

            <circle cx="350" cy="180" r="120" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />

            <circle cx="350" cy="180" r="180" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />

            <line x1="350" y1="60" x2="350" y2="300" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="230" y1="180" x2="470" y2="180" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="350" y="330" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">∮E·dA = Q_enc/ε₀ → E = Q/(4πε₀r²) (spherical symmetry)</text>

          </svg>

        );



      case "equipotential-surfaces":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <circle cx="350" cy="180" r="20" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />

            <text x="350" y="185" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>

            <circle cx="350" cy="180" r="80" fill="none" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="350" cy="180" r="140" fill="none" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="350" cy="180" r="200" fill="none" stroke="#38bdf8" strokeWidth="2" />

            <line x1="350" y1="60" x2="350" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="230" y1="180" x2="470" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">Equipotential surfaces ⊥ to electric field lines</text>

          </svg>

        );



      case "potential-gradient":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="620" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="625" y="305" fill="#94a3b8" fontSize="10">x (distance)</text>

            <text x="90" y="30" fill="#94a3b8" fontSize="10" textAnchor="middle">V</text>

            <line x1="100" y1="280" x2="600" y2="80" stroke="#38bdf8" strokeWidth="3.5" />

            <path d="M 300 200 L 320 160 L 340 200 Z" fill="#ef4444" />

            <text x="350" y="165" fill="#ef4444" fontSize="11" fontWeight="bold">E = -dV/dx</text>

            <text x="350" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">Potential gradient = negative of electric field strength</text>

          </svg>

        );



      case "capacitor-combination-series":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="100" y1="180" x2="200" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="200" y1="120" x2="200" y2="240" stroke="#38bdf8" strokeWidth="3" />

            <line x1="220" y1="120" x2="220" y2="240" stroke="#38bdf8" strokeWidth="3" />

            <text x="210" y="270" fill="#38bdf8" fontSize="10" textAnchor="middle">C₁</text>

            <line x1="220" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="300" y1="120" x2="300" y2="240" stroke="#10b981" strokeWidth="3" />

            <line x1="320" y1="120" x2="320" y2="240" stroke="#10b981" strokeWidth="3" />

            <text x="310" y="270" fill="#10b981" fontSize="10" textAnchor="middle">C₂</text>

            <line x1="320" y1="180" x2="420" y2="180" stroke="#64748b" strokeWidth="2" />

            <text x="210" y="100" fill="#f59e0b" fontSize="10" textAnchor="middle">V₁</text>

            <text x="310" y="100" fill="#f59e0b" fontSize="10" textAnchor="middle">V₂</text>

            <text x="350" y="320" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">1/C = 1/C₁ + 1/C₂  |  Q same, V divides</text>

          </svg>

        );



      case "energy-charged-capacitor":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="100" y1="180" x2="220" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="220" y1="100" x2="220" y2="260" stroke="#38bdf8" strokeWidth="3.5" />

            <line x1="240" y1="100" x2="240" y2="260" stroke="#38bdf8" strokeWidth="3.5" />

            <text x="230" y="280" fill="#38bdf8" fontSize="11" textAnchor="middle">C</text>

            <line x1="340" y1="180" x2="460" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="500" y1="140" x2="500" y2="220" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="510" y="150" fill="#10b981" fontSize="11">dW = V dq</text>

            <rect x="200" y="310" width="300" height="40" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="335" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">U = ∫Vdq = ½QV = ½CV² = Q²/(2C)</text>

          </svg>

        );



      case "emf-internal-resistance":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="200" y="100" width="300" height="160" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="350" cy="150" r="30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            <text x="350" y="155" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">E</text>

            <text x="350" y="220" fill="#cbd5e1" fontSize="10" textAnchor="middle">E: EMF, r: internal resistance</text>

            <line x1="500" y1="150" x2="600" y2="150" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            <rect x="600" y="130" width="80" height="40" rx="6" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />

            <text x="640" y="155" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">R</text>

            <text x="350" y="300" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">V = E - Ir  |  terminal voltage &lt; EMF</text>

          </svg>

        );



      case "work-power-circuits":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <circle cx="200" cy="180" r="50" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />

            <text x="200" y="185" fill="#38bdf8" fontSize="10" textAnchor="middle">Battery</text>

            <line x1="250" y1="180" x2="400" y2="180" stroke="#64748b" strokeWidth="2" />

            <rect x="400" y="150" width="80" height="60" rx="6" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />

            <text x="440" y="185" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">R</text>

            <line x1="480" y1="180" x2="600" y2="180" stroke="#64748b" strokeWidth="2" />

            <line x1="600" y1="180" x2="600" y2="260" stroke="#64748b" strokeWidth="2" />

            <line x1="200" y1="260" x2="600" y2="260" stroke="#64748b" strokeWidth="2" />

            <line x1="200" y1="180" x2="200" y2="260" stroke="#64748b" strokeWidth="2" />

            <rect x="180" y="300" width="340" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="322" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">W = VIt = I²Rt = V²t/R</text>

            <text x="350" y="342" fill="#cbd5e1" fontSize="10" textAnchor="middle">P = VI = I²R = V²/R  (Joule's law)</text>

          </svg>

        );



      case "mass-energy-equivalence":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <circle cx="250" cy="180" r="80" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="3" />

            <text x="250" y="185" fill="#ef4444" fontSize="20" fontWeight="bold" textAnchor="middle">m₀</text>

            <line x1="350" y1="180" x2="450" y2="180" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrow)" />

            <text x="400" y="165" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">→</text>

            <circle cx="550" cy="180" r="60" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="3" />

            <text x="550" y="185" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">E</text>

            <rect x="180" y="300" width="340" height="50" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="330" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">E = mc²</text>

            <text x="350" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Mass-energy equivalence: m in kg, c = 3×10⁸ m/s</text>

          </svg>

        );



      case "binding-energy-nucleus":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <circle cx="250" cy="180" r="50" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />

            <text x="250" y="185" fill="#fff" fontSize="10" textAnchor="middle">Nucleus</text>

            <circle cx="400" cy="100" r="15" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />

            <circle cx="420" cy="160" r="15" fill="#38bdf8" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="400" cy="220" r="15" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />

            <circle cx="380" cy="280" r="15" fill="#38bdf8" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="2" />

            <line x1="250" y1="180" x2="400" y2="200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />

            <rect x="150" y="310" width="400" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="332" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Δm = Zm_p + Nm_n - M_nucleus</text>

            <text x="350" y="350" fill="#cbd5e1" fontSize="9" textAnchor="middle">B.E. = Δm·c²  |  B.E./nucleon = stability indicator</text>

          </svg>

        );



      case "nuclear-fission-fusion":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <text x="180" y="50" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">FISSION</text>

            <circle cx="180" cy="100" r="40" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2.5" />

            <text x="180" y="105" fill="#fff" fontSize="10" textAnchor="middle">²³⁵U</text>

            <line x1="230" y1="100" x2="280" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            <circle cx="320" cy="80" r="20" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="320" cy="120" r="20" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />

            <circle cx="400" cy="80" r="20" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="400" cy="120" r="20" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />

            <text x="550" y="100" fill="#cbd5e1" fontSize="10">+ 2-3 n + Energy</text>

            <text x="520" y="200" fill="#f59e0b" fontSize="10" fontWeight="bold">E = Δm·c²</text>

            <line x1="100" y1="240" x2="600" y2="240" stroke="#64748b" strokeWidth="2" />

            <text x="180" y="270" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">FUSION</text>

            <circle cx="150" cy="310" r="15" fill="#38bdf8" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="2" />

            <circle cx="200" cy="310" r="15" fill="#10b981" fillOpacity="0.5" stroke="#10b981" strokeWidth="2" />

            <text x="175" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">²H + ³H → ⁴He + n</text>

            <text x="450" y="310" fill="#cbd5e1" fontSize="9">Releases more energy per unit mass</text>

          </svg>

        );



      case "ideal-gas-pv-graph":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="640" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="645" y="305" fill="#94a3b8" fontSize="10">V</text>

            <text x="90" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">P</text>

            <path d="M 150 250 C 250 250, 300 150, 550 150" fill="none" stroke="#38bdf8" strokeWidth="3" />

            <path d="M 150 280 C 300 280, 350 200, 550 200" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />

            <text x="560" y="140" fill="#38bdf8" fontSize="10">T₁ (hotter)</text>

            <text x="560" y="200" fill="#10b981" fontSize="10">T₂ (cooler)</text>

            <rect x="200" y="320" width="300" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="343" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">PV = nRT  (isotherms are hyperbolas)</text>

          </svg>

        );




      case "direction-cosines":

        return (

          <svg viewBox="0 0 700 360" className="w-full h-auto select-none">

            <circle cx="150" cy="300" r="5" fill="#64748b" />

            <line x1="150" y1="300" x2="450" y2="100" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />

            <text x="380" y="180" fill="#38bdf8" fontSize="14" fontWeight="bold">r</text>

            <line x1="150" y1="300" x2="450" y2="300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />

            <line x1="450" y1="300" x2="450" y2="100" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

            <path d="M 210 300 A 60 60 0 0 1 215 250" fill="none" stroke="#10b981" strokeWidth="2" />

            <text x="220" y="265" fill="#10b981" fontSize="11" fontWeight="bold">α</text>

            <path d="M 150 240 A 60 60 0 0 0 105 235" fill="none" stroke="#ef4444" strokeWidth="2" />

            <text x="95" y="235" fill="#ef4444" fontSize="11" fontWeight="bold">β</text>

            <line x1="150" y1="300" x2="150" y2="100" stroke="#64748b" strokeWidth="1.5" />

            <line x1="150" y1="300" x2="500" y2="300" stroke="#64748b" strokeWidth="1.5" />

            <line x1="450" y1="300" x2="450" y2="100" stroke="#64748b" strokeWidth="1.5" />

            <rect x="180" y="330" width="340" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="347" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">l² + m² + n² = 1  (direction cosines)</text>

          </svg>

        );



      case "lhospitals-rule":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="70" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="100" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Form: lim(x→a) f(x)/g(x) → 0/0 or ∞/∞</text>

            <text x="350" y="125" fill="#cbd5e1" fontSize="11" textAnchor="middle">Apply L'Hôpital: replace with f'(x)/g'(x)</text>

            <rect x="100" y="155" width="500" height="70" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="195" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Example: lim(x→0) sin x / x = lim(x→0) cos x / 1 = 1</text>

            <text x="350" y="220" fill="#cbd5e1" fontSize="11" textAnchor="middle">Repeat if still indeterminate: second derivative, etc.</text>

            <rect x="150" y="255" width="400" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="280" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x)</text>

            <text x="350" y="298" fill="#cbd5e1" fontSize="9" textAnchor="middle">Apply repeatedly until determinate form obtained</text>

          </svg>

        );



      case "tangent-normal-curve":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <path d="M 150 280 C 300 80, 400 80, 550 200" fill="none" stroke="#38bdf8" strokeWidth="3.5" />

            <circle cx="350" cy="130" r="6" fill="#ef4444" />

            <line x1="250" y1="230" x2="450" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            <text x="460" y="75" fill="#10b981" fontSize="11" fontWeight="bold">Tangent</text>

            <line x1="350" y1="130" x2="430" y2="80" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <text x="440" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold">Normal</text>

            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">Slope of tangent = dy/dx | Slope of normal = -dx/dy</text>

          </svg>

        );



      case "monotonicity-extrema":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <path d="M 120 280 Q 250 50, 350 280 T 580 100" fill="none" stroke="#38bdf8" strokeWidth="3.5" />

            <circle cx="250" cy="80" r="6" fill="#10b981" />

            <text x="250" y="65" fill="#10b981" fontSize="10" textAnchor="middle">Local max</text>

            <circle cx="350" cy="280" r="6" fill="#ef4444" />

            <text x="350" y="300" fill="#ef4444" fontSize="10" textAnchor="middle">Local min</text>

            <rect x="150" y="325" width="400" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="348" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">f'(x) &gt; 0 increasing | f'(x) &lt; 0 decreasing | f'(c)=0 critical point</text>

          </svg>

        );



      case "integration-by-parts":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="150" y="140" width="400" height="80" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="180" fill="#10b981" fontSize="18" fontWeight="bold" textAnchor="middle">∫u dv = uv - ∫v du</text>

            <text x="350" y="210" fill="#cbd5e1" fontSize="11" textAnchor="middle">ILATE rule: Inverse &gt; Logarithmic &gt; Algebraic &gt; Trig &gt; Exponential</text>

            <text x="350" y="260" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Example: ∫x·eˣ dx = x·eˣ - eˣ + C</text>

            <text x="350" y="300" fill="#cbd5e1" fontSize="10" textAnchor="middle">Choose u=x (simplifies on differentiation), dv=eˣdx</text>

          </svg>

        );



      case "area-between-curves":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="665" y="305" fill="#94a3b8" fontSize="10">x</text>

            <text x="90" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">y</text>

            <path d="M 150 250 C 250 100, 350 100, 450 200" fill="none" stroke="#38bdf8" strokeWidth="3" />

            <path d="M 150 280 C 250 180, 350 180, 450 260" fill="none" stroke="#10b981" strokeWidth="3" />

            <path d="M 150 250 L 150 280 L 450 260 L 450 200 Z" fill="#a855f7" fillOpacity="0.15" />

            <text x="140" y="275" fill="#a855f7" fontSize="10">a</text>

            <text x="455" y="255" fill="#a855f7" fontSize="10">b</text>

            <rect x="200" y="320" width="300" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="343" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Area = ∫ₐᵇ [f(x) - g(x)] dx</text>

          </svg>

        );



      case "newton-raphson-method":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="280" x2="660" y2="280" stroke="#64748b" strokeWidth="2" />

            <line x1="100" y1="300" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="665" y="285" fill="#94a3b8" fontSize="10">x</text>

            <text x="90" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">f(x)</text>

            <path d="M 120 250 C 250 320, 350 50, 500 200 C 580 280, 640 150, 660 180" fill="none" stroke="#38bdf8" strokeWidth="3" />

            <circle cx="300" cy="180" r="6" fill="#ef4444" />

            <line x1="300" y1="180" x2="200" y2="280" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />

            <circle cx="200" cy="280" r="5" fill="#10b981" />

            <text x="200" y="300" fill="#10b981" fontSize="10" textAnchor="middle">Root</text>

            <rect x="180" y="315" width="340" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="340" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ)</text>

          </svg>

        );



      case "pearson-skewness":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="60" width="540" height="100" rx="10" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="100" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Pearson's First Coefficient: Sk = (Mean - Mode) / σ</text>

            <text x="350" y="130" fill="#cbd5e1" fontSize="10" textAnchor="middle">Measures asymmetry of distribution</text>

            <rect x="80" y="185" width="540" height="100" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="225" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Pearson's Second Coefficient: Sk = 3(Mean - Median) / σ</text>

            <text x="350" y="255" fill="#cbd5e1" fontSize="10" textAnchor="middle">Used when mode is not well-defined</text>

            <rect x="80" y="305" width="540" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="335" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Sk &gt; 0 right skewed | Sk &lt; 0 left skewed | Sk = 0 symmetric</text>

          </svg>

        );



      case "parallelogram-law-forces":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <polygon points="200,280 400,120 600,280 400,440" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />

            <line x1="200" y1="280" x2="400" y2="120" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />

            <line x1="200" y1="280" x2="600" y2="280" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />

            <line x1="200" y1="280" x2="400" y2="120" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow)" />

            <line x1="400" y1="120" x2="600" y2="280" stroke="#a855f7" strokeWidth="3.5" markerEnd="url(#arrow)" />

            <text x="180" y="270" fill="#38bdf8" fontSize="12" fontWeight="bold">P</text>

            <text x="610" y="280" fill="#10b981" fontSize="12" fontWeight="bold">Q</text>

            <text x="400" y="105" fill="#a855f7" fontSize="12" fontWeight="bold">R (resultant)</text>

            <rect x="200" y="340" width="300" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="365" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">R² = P² + Q² + 2PQ cos θ</text>

          </svg>

        );



      case "amgm-relation":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="100" width="500" height="160" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="150" fill="#10b981" fontSize="18" fontWeight="bold" textAnchor="middle">AM ≥ GM ≥ HM</text>

            <text x="350" y="190" fill="#f59e0b" fontSize="14" textAnchor="middle">(a+b)/2 ≥ √(ab) ≥ 2/(1/a + 1/b)</text>

            <text x="350" y="230" fill="#cbd5e1" fontSize="11" textAnchor="middle">Equality holds when a = b</text>

            <text x="350" y="270" fill="#38bdf8" fontSize="12" textAnchor="middle">For n numbers: arithmetic mean ≥ geometric mean</text>

            <text x="350" y="300" fill="#cbd5e1" fontSize="10" textAnchor="middle">Useful for finding minimum/maximum values</text>

          </svg>

        );



      case "quadratic-formula-proof":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="50" width="500" height="260" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="90" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Proof: Completing the Square</text>

            <text x="130" y="125" fill="#cbd5e1" fontSize="12">ax² + bx + c = 0</text>

            <text x="130" y="155" fill="#cbd5e1" fontSize="12">x² + (b/a)x = -c/a</text>

            <text x="130" y="185" fill="#cbd5e1" fontSize="12">x² + (b/a)x + (b/2a)² = (b²-4ac)/4a²</text>

            <text x="130" y="215" fill="#cbd5e1" fontSize="12">(x + b/2a)² = (b²-4ac)/4a²</text>

            <text x="130" y="245" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">x = (-b ± √(b²-4ac))/2a</text>

            <text x="350" y="290" fill="#f59e0b" fontSize="11" textAnchor="middle">Discriminant D = b²-4ac determines nature of roots</text>

          </svg>

        );



      case "complex-number-properties":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="200" x2="660" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="350" y1="320" x2="350" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="665" y="205" fill="#94a3b8" fontSize="10">Real</text>

            <text x="345" y="30" fill="#94a3b8" fontSize="10" textAnchor="middle">Imag</text>

            <circle cx="450" cy="160" r="8" fill="#38bdf8" />

            <text x="465" y="155" fill="#38bdf8" fontSize="11">z = a+bi</text>

            <line x1="350" y1="200" x2="450" y2="160" stroke="#f59e0b" strokeWidth="2" />

            <text x="390" y="185" fill="#f59e0b" fontSize="10">|z| = √(a²+b²)</text>

            <text x="350" y="300" fill="#10b981" fontSize="12" textAnchor="middle">Conjugate: z̄ = a-bi</text>

            <rect x="200" y="310" width="300" height="45" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

            <text x="350" y="330" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">z·z̄ = |z|² = a² + b²</text>

            <text x="350" y="348" fill="#cbd5e1" fontSize="9" textAnchor="middle">|z₁·z₂| = |z₁|·|z₂|, arg(z₁/z₂) = arg z₁ - arg z₂</text>

          </svg>

        );




      case "curve-sketching-parabola":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="300" x2="660" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="320" x2="100" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <path d="M 150 280 Q 350 50, 550 280" fill="none" stroke="#38bdf8" strokeWidth="3.5" />

            <line x1="350" y1="50" x2="350" y2="280" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

            <circle cx="350" cy="280" r="6" fill="#ef4444" />

            <text x="350" y="300" fill="#ef4444" fontSize="10" textAnchor="middle">Vertex</text>

            <text x="550" y="270" fill="#38bdf8" fontSize="11" fontWeight="bold">x-intercepts</text>

            <rect x="180" y="325" width="340" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="348" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">x = (-b ± √(b²-4ac))/2a</text>

          </svg>

        );



      case "logarithm-properties-proof":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="240" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="100" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Logarithm Properties</text>

            <text x="140" y="140" fill="#cbd5e1" fontSize="12">logₐ(mn) = logₐm + logₐn</text>

            <text x="140" y="175" fill="#cbd5e1" fontSize="12">logₐ(m/n) = logₐm - logₐn</text>

            <text x="140" y="210" fill="#cbd5e1" fontSize="12">logₐ(mⁿ) = n·logₐm</text>

            <text x="140" y="245" fill="#cbd5e1" fontSize="12">logₐm = log m / log a (change of base)</text>

            <text x="140" y="280" fill="#f59e0b" fontSize="11" fontWeight="bold">Proof: Let logₐm = x, logₐn = y</text>

          </svg>

        );



      case "arithmetic-geometric-mean":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="100" width="500" height="150" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="140" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">AM = (a + b)/2  |  GM = √(ab)</text>

            <text x="350" y="180" fill="#cbd5e1" fontSize="12" textAnchor="middle">AM ≥ GM (equality when a = b)</text>

            <text x="350" y="210" fill="#f59e0b" fontSize="12" textAnchor="middle">Example: AM = 6, GM = 4 for {"{2, 8}"}</text>

            <rect x="150" y="270" width="400" height="80" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="300" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">For n numbers: (a₁+...+aₙ)/n ≥ ∜(a₁...aₙ)</text>

            <text x="350" y="330" fill="#cbd5e1" fontSize="10" textAnchor="middle">Used to find minimum/maximum values in optimization</text>

          </svg>

        );



      case "permutation-combination":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="50" width="250" height="120" rx="8" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" />

            <text x="205" y="90" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">PERMUTATION</text>

            <text x="205" y="120" fill="#cbd5e1" fontSize="11" textAnchor="middle">Order matters!</text>

            <text x="205" y="150" fill="#cbd5e1" fontSize="11" textAnchor="middle">nPr = n!/(n-r)!</text>

            <rect x="370" y="50" width="250" height="120" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />

            <text x="495" y="90" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">COMBINATION</text>

            <text x="495" y="120" fill="#cbd5e1" fontSize="11" textAnchor="middle">Order does NOT matter</text>

            <text x="495" y="150" fill="#cbd5e1" fontSize="11" textAnchor="middle">nCr = n!/(r!(n-r)!)</text>

            <text x="350" y="210" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Example: 5 students, choose 3</text>

            <text x="350" y="240" fill="#cbd5e1" fontSize="11" textAnchor="middle">P(5,3) = 60 ways (ordered)</text>

            <text x="350" y="265" fill="#cbd5e1" fontSize="11" textAnchor="middle">C(5,3) = 10 ways (unordered)</text>

          </svg>

        );



      case "binomial-theorem":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="200" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="100" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">(a+b)ⁿ = Σ(nCk)·aⁿ⁻ᵏ·bᵏ</text>

            <text x="350" y="140" fill="#cbd5e1" fontSize="11" textAnchor="middle">nCk = n!/(k!(n-k)!) = coefficients</text>

            <text x="350" y="180" fill="#f59e0b" fontSize="12" textAnchor="middle">Pascal's triangle gives coefficients</text>

            <text x="350" y="210" fill="#38bdf8" fontSize="11" textAnchor="middle">1: (a+b)¹ → 1 1</text>

            <text x="350" y="235" fill="#38bdf8" fontSize="11" textAnchor="middle">2: (a+b)² → 1 2 1</text>

            <text x="350" y="260" fill="#38bdf8" fontSize="11" textAnchor="middle">3: (a+b)³ → 1 3 3 1</text>

          </svg>

        );



      case "complex-number-geometric":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="80" y1="200" x2="660" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="350" y1="320" x2="350" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="665" y="205" fill="#94a3b8" fontSize="10">Real axis</text>

            <text x="350" y="30" fill="#94a3b8" fontSize="10" textAnchor="middle">Imaginary axis</text>

            <circle cx="350" cy="200" r="120" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />

            <line x1="350" y1="200" x2="470" y2="120" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            <circle cx="470" cy="120" r="6" fill="#38bdf8" />

            <text x="485" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold">z = r(cos θ + i sin θ)</text>

            <path d="M 420 200 A 70 70 0 0 0 470 120" fill="none" stroke="#10b981" strokeWidth="2" />

            <text x="430" y="175" fill="#10b981" fontSize="11">θ</text>

            <text x="350" y="290" fill="#cbd5e1" fontSize="10" textAnchor="middle">Argand diagram: complex plane</text>

          </svg>

        );



      case "de-moivres-theorem":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="150" y="120" width="400" height="120" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="170" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">[r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ)</text>

            <text x="350" y="210" fill="#cbd5e1" fontSize="12" textAnchor="middle">De Moivre's Theorem: raises complex number to power n</text>

            <rect x="100" y="260" width="500" height="80" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="295" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Applications: finding roots of unity</text>

            <text x="350" y="320" fill="#cbd5e1" fontSize="11" textAnchor="middle">nth roots: z^(1/n) = r^(1/n)[cos((θ+2kπ)/n) + i sin((θ+2kπ)/n)]</text>

          </svg>

        );



      case "quadratic-equation-nature-roots":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="50" width="540" height="80" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />

            <text x="350" y="90" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">D &gt; 0: Two distinct real roots (graph cuts x-axis twice)</text>

            <rect x="80" y="145" width="540" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="185" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">D = 0: Equal real roots (graph touches x-axis at one point)</text>

            <rect x="80" y="240" width="540" height="80" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="280" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">D &lt; 0: Complex conjugate roots (graph does not cut x-axis)</text>

            <rect x="180" y="335" width="340" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="352" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">D = b² - 4ac</text>

          </svg>

        );



      case "sequence-series-ap-gp-hp":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="50" width="540" height="70" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Arithmetic Progression (AP): a, a+d, a+2d, ...</text>

            <text x="350" y="110" fill="#cbd5e1" fontSize="10" textAnchor="middle">nth term: aₙ = a + (n-1)d | Sum: Sₙ = n/2[2a+(n-1)d]</text>

            <rect x="80" y="135" width="540" height="70" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="170" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Geometric Progression (GP): a, ar, ar², ...</text>

            <text x="350" y="195" fill="#cbd5e1" fontSize="10" textAnchor="middle">nth term: aₙ = arⁿ⁻¹ | Sum: Sₙ = a(1-rⁿ)/(1-r) | S∞ = a/(1-r) if |r| &lt; 1</text>

            <rect x="80" y="220" width="540" height="70" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="255" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Harmonic Progression (HP): reciprocals form AP</text>

            <rect x="150" y="305" width="400" height="50" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

            <text x="350" y="335" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">AM · GM = mean² | 1/a + 1/b = 2/AM (AM-GM-HM relation)</text>

          </svg>

        );



      case "probability-basic-theorems":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="50" width="500" height="100" rx="10" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="90" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Addition Theorem: P(A∪B) = P(A) + P(B) - P(A∩B)</text>

            <text x="350" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">For mutually exclusive events: P(A∪B) = P(A) + P(B)</text>

            <rect x="100" y="170" width="500" height="100" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="210" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Multiplication Theorem: P(A∩B) = P(A)·P(B|A)</text>

            <text x="350" y="240" fill="#cbd5e1" fontSize="10" textAnchor="middle">For independent events: P(A∩B) = P(A)·P(B)</text>

            <rect x="180" y="290" width="340" height="60" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

            <text x="350" y="320" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">P(not E) = 1 - P(E)</text>

            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">Total probability: ΣP(Eᵢ) = 1</text>

          </svg>

        );




      case "line-equation-forms":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="300" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="80" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Forms of a Line</text>

            <text x="120" y="120" fill="#cbd5e1" fontSize="12">• Slope-intercept: y = mx + c</text>

            <text x="120" y="150" fill="#cbd5e1" fontSize="12">• Point-slope: y - y₁ = m(x - x₁)</text>

            <text x="120" y="180" fill="#cbd5e1" fontSize="12">• Two-point form: (y-y₁)/(x-x₁) = (y₂-y₁)/(x₂-x₁)</text>

            <text x="120" y="210" fill="#cbd5e1" fontSize="12">• Intercept form: x/a + y/b = 1</text>

            <text x="120" y="240" fill="#cbd5e1" fontSize="12">• Normal form: x cos α + y sin α = p</text>

            <text x="120" y="270" fill="#cbd5e1" fontSize="12">• General form: ax + by + c = 0</text>

            <text x="350" y="320" fill="#f59e0b" fontSize="10" textAnchor="middle">m = tan θ = slope, p = perpendicular from origin</text>

          </svg>

        );



      case "angle-bisector-formula":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="100" width="500" height="160" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="140" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Angle Bisector Formula</text>

            <text x="350" y="180" fill="#cbd5e1" fontSize="12" textAnchor="middle">(a₁±a₂)x + (b₁±b₂)y + (c₁±c₂) = 0</text>

            <text x="350" y="220" fill="#f59e0b" fontSize="11" textAnchor="middle">+ for obtuse, - for acute angle bisector</text>

          </svg>

        );



      case "pair-of-lines-condition":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="100" width="500" height="160" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

            <text x="350" y="140" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Pair of Straight Lines</text>

            <text x="350" y="180" fill="#cbd5e1" fontSize="12" textAnchor="middle">ax² + 2hxy + by² + 2gx + 2fy + c = 0</text>

            <text x="350" y="220" fill="#f59e0b" fontSize="11" textAnchor="middle">Condition: abc + 2fgh - af² - bg² - ch² = 0</text>

          </svg>

        );



      case "direction-cosines":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <line x1="100" y1="300" x2="600" y2="300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="300" x2="100" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="100" y1="300" x2="300" y2="100" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow)" />

            <circle cx="200" cy="200" r="3" fill="#ef4444" />

            <path d="M 140 300 A 40 40 0 0 1 145 260" fill="none" stroke="#f59e0b" strokeWidth="2" />

            <text x="150" y="280" fill="#f59e0b" fontSize="11" fontWeight="bold">α</text>

            <path d="M 100 260 A 40 40 0 0 0 140 255" fill="none" stroke="#10b981" strokeWidth="2" />

            <text x="115" y="250" fill="#10b981" fontSize="11" fontWeight="bold">β</text>

            <rect x="200" y="320" width="300" height="35" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="343" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">cos²α + cos²β + cos²γ = 1</text>

          </svg>

        );



      case "bayes-theorem-proof":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="180" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="100" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Bayes' Theorem</text>

            <text x="350" y="145" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">P(Aᵢ|B) = P(B|Aᵢ)·P(Aᵢ) / Σ P(B|Aⱼ)·P(Aⱼ)</text>

            <text x="350" y="190" fill="#cbd5e1" fontSize="11" textAnchor="middle">Used to find conditional probability after evidence</text>

            <text x="350" y="230" fill="#f59e0b" fontSize="11" textAnchor="middle">Also called inverse probability theorem</text>

            <text x="350" y="270" fill="#cbd5e1" fontSize="10" textAnchor="middle">Applications: medical testing, machine learning, statistics</text>

          </svg>

        );



      case "numerical-integration":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="250" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="100" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Numerical Integration Methods</text>

            <text x="150" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">Trapezoidal Rule:</text>

            <text x="150" y="175" fill="#cbd5e1" fontSize="11">∫ₐᵇ f(x)dx ≈ (h/2)[f₀ + 2(f₁+...+fₙ₋₁) + fₙ]</text>

            <text x="150" y="210" fill="#38bdf8" fontSize="12" fontWeight="bold">Simpson's 1/3 Rule:</text>

            <text x="150" y="235" fill="#cbd5e1" fontSize="11">∫ₐᵇ f(x)dx ≈ (h/3)[f₀ + 4(f₁+f₃+...) + 2(f₂+f₄+...) + fₙ]</text>

            <text x="350" y="280" fill="#a855f7" fontSize="11" textAnchor="middle">Simpson's rule is more accurate (error ∝ h⁴)</text>

          </svg>

        );



      case "separable-differential-equation":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="80" width="500" height="200" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            <text x="350" y="120" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Separable Differential Equation</text>

            <text x="350" y="170" fill="#10b981" fontSize="13" textAnchor="middle">dy/dx = g(x)·h(y)</text>

            <text x="350" y="210" fill="#f59e0b" fontSize="12" textAnchor="middle">Separate: dy/h(y) = g(x)dx</text>

            <text x="350" y="250" fill="#cbd5e1" fontSize="12" textAnchor="middle">Integrate: ∫dy/h(y) = ∫g(x)dx</text>

            <text x="350" y="290" fill="#a855f7" fontSize="11" textAnchor="middle">Example: dy/dx = xy → ln|y| = x²/2 + C</text>

          </svg>

        );



      case "linear-differential-equation":

        return (

          <svg viewBox="0 0 700 360" className="w.full h-auto select-none">

            <rect x="100" y="60" width="500" height="250" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

            <text x="350" y="100" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Linear Differential Equation</text>

            <text x="350" y="150" fill="#38bdf8" fontSize="13" textAnchor="middle">dy/dx + P(x)y = Q(x)</text>

            <text x="350" y="190" fill="#f59e0b" fontSize="12" textAnchor="middle">Integrating Factor: IF = e^∫P(x)dx</text>

            <text x="350" y="230" fill="#cbd5e1" fontSize="12" textAnchor="middle">Solution: y·IF = ∫Q(x)·IF dx + C</text>

            <text x="350" y="270" fill="#a855f7" fontSize="11" textAnchor="middle">First-order linear ODE - standard method</text>

          </svg>

        );


case "avogadros-law-deduction":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">Avogadro's Law & Applications</text>

            <rect x="100" y="110" width="240" height="120" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="220" y="145" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Molecular Mass</text>

            <text x="220" y="175" fill="#cbd5e1" fontSize="12" textAnchor="middle">M = 2 × Vapor Density</text>

            <text x="220" y="200" fill="#cbd5e1" fontSize="11" textAnchor="middle">or M = m/n where n = V/22.4</text>

            <rect x="360" y="110" width="240" height="120" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

            <text x="480" y="145" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Number of Particles</text>

            <text x="480" y="175" fill="#cbd5e1" fontSize="12" textAnchor="middle">N = n × N_A = m/M × 6.022×10²³</text>

            <text x="480" y="200" fill="#cbd5e1" fontSize="11" textAnchor="middle">At STP: 1 mole = 22.4 L</text>

            <rect x="150" y="260" width="400" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="295" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Avogadro's Law: Equal volumes contain equal molecules</text>

            <text x="350" y="320" fill="#cbd5e1" fontSize="11" textAnchor="middle">V₁/n₁ = V₂/n₂ at constant T and P</text>

          </svg>

        );

      case "heisenberg-uncertainty":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="60" width="540" height="280" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="100" fill="#a855f7" fontSize="16" fontWeight="bold" textAnchor="middle">Heisenberg's Uncertainty Principle</text>

            <rect x="150" y="140" width="400" height="80" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="175" fill="#c084fc" fontSize="18" fontWeight="bold" textAnchor="middle">Δx · Δp ≥ ℏ/2</text>

            <text x="350" y="205" fill="#cbd5e1" fontSize="11" textAnchor="middle">where ℏ = h/2π = 1.055 × 10⁻³⁴ J·s</text>

            <rect x="120" y="250" width="460" height="70" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="285" fill="#38bdf8" fontSize="13" textAnchor="middle">Electron position and momentum cannot be measured simultaneously with arbitrary precision</text>

            <text x="350" y="310" fill="#f59e0b" fontSize="11" textAnchor="middle">→ Replaced Bohr orbits with probability orbitals</text>

          </svg>

        );

      case "quantum-numbers":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Quantum Numbers Table</text>

            {[

              {q:"n",name:"Principal",desc:"Energy level, shell size",val:"1,2,3...",color:"#38bdf8"},

              {q:"l",name:"Azimuthal",desc:"Subshell shape (s,p,d,f)",val:"0 to n-1",color:"#10b981"},

              {q:"m_l",name:"Magnetic",desc:"Orbital orientation in space",val:"-l to +l",color:"#f59e0b"},

              {q:"m_s",name:"Spin",desc:"Electron spin direction",val:"+½ or -½",color:"#ef4444"}

            ].map((qn,i) => (

              <g key={i}>

                <rect x="90+i*155" y="110" width="140" height="180" rx="8" fill={qn.color} fillOpacity="0.15" stroke={qn.color} strokeWidth="2"/>

                <text x="160+i*155" y="145" fill={qn.color} fontSize="28" fontWeight="bold" textAnchor="middle">{qn.q}</text>

                <text x="160+i*155" y="175" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">{qn.name}</text>

                <text x="160+i*155" y="205" fill="#cbd5e1" fontSize="10" textAnchor="middle">{qn.desc}</text>

                <text x="160+i*155" y="240" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">{qn.val}</text>

              </g>

            ))}

          </svg>

        );

      case "vsepr-theory":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">VSEPR Molecular Shapes</text>

            {[

              {shape:"Linear",angle:"180°",bp:2,ex:"BeF₂",color:"#38bdf8"},

              {shape:"Trigonal Planar",angle:"120°",bp:3,ex:"BF₃",color:"#10b981"},

              {shape:"Tetrahedral",angle:"109.5°",bp:4,ex:"CH₄",color:"#f59e0b"},

              {shape:"Trigonal Pyramidal",angle:"107°",bp:4,ex:"NH₃",color:"#a855f7"},

              {shape:"Bent/V-shaped",angle:"104.5°",bp:4,ex:"H₂O",color:"#ef4444"}

            ].map((m,i) => (

              <g key={i}>

                <rect x="80+i*125" y="110" width="110" height="150" rx="8" fill={m.color} fillOpacity="0.1" stroke={m.color} strokeWidth="2"/>

                <text x="135+i*125" y="140" fill={m.color} fontSize="11" fontWeight="bold" textAnchor="middle">{m.shape}</text>

                <circle cx="135+i*125" cy="180" r="12" fill={m.color} fillOpacity="0.3" stroke={m.color} strokeWidth="2"/>

                <text x="135+i*125" y="220" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">{m.angle}</text>

                <text x="135+i*125" y="240" fill="#cbd5e1" fontSize="9" textAnchor="middle">{m.ex}</text>

              </g>

            ))}

            <rect x="150" y="280" width="400" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="315" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">VSEPR: Valence shell electron pair repulsion determines geometry</text>

          </svg>

        );

      case "hybridization-spspsp2spp3":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Hybridization Types</text>

            {[

              {type:"sp",mix:"s + p",angle:"180°",geom:"Linear",ex:"BeCl₂",color:"#38bdf8"},

              {type:"sp²",mix:"s + 2p",angle:"120°",geom:"Trigonal",ex:"BF₃",color:"#10b981"},

              {type:"sp³",mix:"s + 3p",angle:"109.5°",geom:"Tetrahedral",ex:"CH₄",color:"#f59e0b"}

            ].map((h,i) => (

              <g key={i}>

                <rect x="100+i*190" y="110" width="170" height="180" rx="8" fill={h.color} fillOpacity="0.15" stroke={h.color} strokeWidth="2"/>

                <text x="185+i*190" y="145" fill={h.color} fontSize="20" fontWeight="bold" textAnchor="middle">{h.type}</text>

                <text x="185+i*190" y="175" fill="#cbd5e1" fontSize="11" textAnchor="middle">{h.mix} hybridization</text>

                <text x="185+i*190" y="210" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Angle: {h.angle}</text>

                <text x="185+i*190" y="240" fill="#38bdf8" fontSize="11" textAnchor="middle">{h.geom}</text>

                <text x="185+i*190" y="265" fill="#a855f7" fontSize="10" textAnchor="middle">Ex: {h.ex}</text>

              </g>

            ))}

          </svg>

        );

      case "inductive-resonance-effect":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="80" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">Inductive vs Resonance Effects</text>

            <rect x="100" y="110" width="230" height="140" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="215" y="145" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">+I / -I Effect</text>

            <text x="215" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Through σ-bonds</text>

            <text x="215" y="205" fill="#cbd5e1" fontSize="11" textAnchor="middle">Permanent effect</text>

            <text x="215" y="230" fill="#cbd5e1" fontSize="11" textAnchor="middle">Distance dependent</text>

            <rect x="370" y="110" width="230" height="140" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2"/>

            <text x="485" y="145" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">+R / -R Effect</text>

            <text x="485" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Through π-system</text>

            <text x="485" y="205" fill="#cbd5e1" fontSize="11" textAnchor="middle">Resonance stabilization</text>

            <rect x="150" y="270" width="400" height="80" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="305" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key: Inductive=σ-electrons | Resonance=π-electrons delocalized</text>

          </svg>

        );

      case "redox-balancing-half-reaction":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>

            <text x="350" y="80" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">Redox Balancing - Ion-Electron Method</text>

            <rect x="120" y="110" width="200" height="120" rx="8" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2"/>

            <text x="220" y="145" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Oxidation Half</text>

            <text x="220" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Loss of e⁻</text>

            <text x="220" y="205" fill="#f59e0b" fontSize="12" textAnchor="middle">Fe²⁺ → Fe³⁺ + e⁻</text>

            <rect x="380" y="110" width="200" height="120" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>

            <text x="480" y="145" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Reduction Half</text>

            <text x="480" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">Gain of e⁻</text>

            <text x="480" y="205" fill="#f59e0b" fontSize="11" textAnchor="middle">MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O</text>

            <rect x="150" y="260" width="400" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="290" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Steps:</text>

            <text x="180" y="315" fill="#cbd5e1" fontSize="10">1. Separate half-reactions | 2. Balance atoms | 3. Balance charge with e⁻ | 4. Equalize electrons</text>

          </svg>

        );

      case "kinetic-theory-gas-derive":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">Kinetic Theory of Gases Derivation</text>

            <rect x="120" y="110" width="460" height="60" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="145" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Postulates: Point masses, random motion, elastic collisions</text>

            <rect x="120" y="190" width="460" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="225" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">PV = (1/3)Nm&lt;c_rms²&gt; derivation</text>

            <text x="150" y="255" fill="#cbd5e1" fontSize="11">Force on wall = Δp/Δt = 2mv/t where t = 2L/v</text>

            <text x="150" y="275" fill="#cbd5e1" fontSize="11">P = F/A = Nm&lt;v²&gt;/(3V)</text>

            <rect x="150" y="310" width="400" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="335" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">PV = nRT  →  c_rms = √(3RT/M)</text>

          </svg>

        );

      case "combined-gas-law":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Gas Laws - Combined</text>

            {[

              {law:"Boyle's Law",cond:"T constant",eq:"P₁V₁ = P₂V₂",color:"#38bdf8"},

              {law:"Charles' Law",cond:"P constant",eq:"V₁/T₁ = V₂/T₂",color:"#10b981"},

              {law:"Gay-Lussac's",cond:"V constant",eq:"P₁/T₁ = P₂/T₂",color:"#f59e0b"}

            ].map((g,i) => (

              <g key={i}>

                <rect x="100+i*190" y="110" width="170" height="100" rx="8" fill={g.color} fillOpacity="0.1" stroke={g.color} strokeWidth="2"/>

                <text x="185+i*190" y="145" fill={g.color} fontSize="12" fontWeight="bold" textAnchor="middle">{g.law}</text>

                <text x="185+i*190" y="170" fill="#cbd5e1" fontSize="10" textAnchor="middle">{g.cond}</text>

                <text x="185+i*190" y="195" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">{g.eq}</text>

              </g>

            ))}

            <rect x="150" y="240" width="400" height="140" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="280" fill="#a855f7" fontSize="15" fontWeight="bold" textAnchor="middle">Combined Gas Law</text>

            <text x="350" y="315" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">PV/T = constant  →  PV = nRT</text>

            <text x="350" y="350" fill="#cbd5e1" fontSize="11" textAnchor="middle">Universal gas constant R = 8.314 J mol⁻¹ K⁻¹</text>

          </svg>

        );

      case "real-gas-compressibility":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="80" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">Real Gas - Van der Waals Equation</text>

            <rect x="120" y="110" width="460" height="100" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>

            <text x="350" y="150" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">(P + an²/V²)(V - nb) = nRT</text>

            <text x="350" y="190" fill="#cbd5e1" fontSize="11" textAnchor="middle">a = correction for intermolecular forces</text>

            <text x="350" y="210" fill="#cbd5e1" fontSize="11" textAnchor="middle">b = correction for molecular volume</text>

            <rect x="120" y="230" width="210" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="225" y="265" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Compressibility Factor</text>

            <text x="225" y="295" fill="#cbd5e1" fontSize="11" textAnchor="middle">Z = PV/nRT</text>

            <text x="225" y="315" fill="#f59e0b" fontSize="10" textAnchor="middle">Z = 1 ideal, Z ≠ 1 real gas</text>

            <rect x="370" y="230" width="210" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

            <text x="475" y="265" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Critical Constants</text>

            <text x="475" y="295" fill="#cbd5e1" fontSize="11" textAnchor="middle">T_c = 8a/27Rb</text>

            <text x="475" y="315" fill="#cbd5e1" fontSize="11" textAnchor="middle">P_c = a/27b²</text>

          </svg>

        );

      case "le-chateliers-principle":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="80" fill="#a855f7" fontSize="16" fontWeight="bold" textAnchor="middle">Le Chatelier's Principle</text>

            <rect x="120" y="110" width="460" height="70" rx="8" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="150" fill="#c084fc" fontSize="13" textAnchor="middle">If system at equilibrium is disturbed, it shifts to counteract change</text>

            {[

              {disturb:"Concentration",shift:"Shifts away from added substance",color:"#38bdf8"},

              {disturb:"Temperature",shift:"Shifts in endothermic direction",color:"#ef4444"},

              {disturb:"Pressure",shift:"Shifts to fewer moles side",color:"#10b981"}

            ].map((l,i) => (

              <rect key={i} x={100+i*190} y="200" width={170} height={120} rx={8} fill={l.color} fillOpacity={0.1} stroke={l.color} strokeWidth={2}/>

            ))}

            {["#38bdf8","#ef4444","#10b981"].map((c,i) => (

              <text key={i} x={185+i*190} y={235} fill={c} fontSize={11} fontWeight={"bold"} textAnchor={"middle"}>{c==="#38bdf8"?"Concentration":c==="#ef4444"?"Temperature":"Pressure"}</text>

            ))}

            {[

              {x:100,y:255,text:"Increases",color:"#38bdf8"},

              {x:290,y:255,text:"Endo ↑ shifts",color:"#ef4444"},

              {x:480,y:255,text:"Fewer moles",color:"#10b981"}

            ].map((t,i) => <text key={i} x={t.x} y={t.y} fill={t.color} fontSize={10} textAnchor={"middle"}>{t.text}</text>)}

          </svg>

        );

      case "haber-process-flow":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">Haber's Process - Ammonia Manufacture</text>

            <rect x="120" y="110" width="460" height="60" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="350" y="145" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ/mol)</text>

            <rect x="120" y="190" width="210" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

            <text x="225" y="225" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Optimum Conditions</text>

            <text x="225" y="255" fill="#cbd5e1" fontSize="11" textAnchor="middle">T = 450°C</text>

            <text x="225" y="280" fill="#cbd5e1" fontSize="11" textAnchor="middle">P = 200 atm</text>

            <rect x="370" y="190" width="210" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

            <text x="475" y="225" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Catalyst</text>

            <text x="475" y="255" fill="#cbd5e1" fontSize="11" textAnchor="middle">Finely divided Fe</text>

            <text x="475" y="280" fill="#cbd5e1" fontSize="11" textAnchor="middle">Promoted with Mo</text>

            <rect x="150" y="310" width="400" height="40" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="335" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">Yield: ~15% per pass | Unreacted gases recycled</text>

          </svg>

        );

      case "contact-process-h2so4":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>

            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Contact Process - H₂SO₄</text>

            {[

              {step:"1. SO₂ Production",eq:"S + O₂ → SO₂",color:"#ef4444"},

              {step:"2. SO₂ → SO₃",eq:"2SO₂ + O₂ ⇌ 2SO₃",color:"#f59e0b"},

              {step:"3. Absorption",eq:"SO₃ + H₂SO₄ → H₂S₂O₇",color:"#38bdf8"},

              {step:"4. Dilution",eq:"H₂S₂O₇ + H₂O → 2H₂SO₄",color:"#10b981"}

            ].map((st,i) => (

              <rect key={i} x={100+i*140} y={110} width={120} height={180} rx={8} fill={st.color} fillOpacity={0.1} stroke={st.color} strokeWidth={2}/>

            ))}

            {[

              {x:100,text:"Combustion"},

              {x:240,text:"Oxidation (V₂O₅)"},

              {x:380,text:"Absorption"},

              {x:520,text:"Dilution"}

            ].map((t,i) => <text key={i} x={t.x} y={310} fill={"#cbd5e1"} fontSize={10} textAnchor={"middle"}>{t.text}</text>)}

          </svg>

        );

      case "solvay-process-na2co3":

        return (

          <svg viewBox="0 0 700 400" className="w.full h-auto select-none">

            <rect x="80" y="40" width="540" height="320" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="80" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">Solvay Process - Na₂CO₃</text>

            <rect x="120" y="110" width="460" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

            <text x="350" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ ↓ + NH₄Cl</text>

            <rect x="120" y="190" width="210" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>

            <text x="225" y="225" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Step 1: Brine sat. with NH₃</text>

            <text x="225" y="265" fill="#cbd5e1" fontSize="11" textAnchor="middle">NaCl + NH₃ + H₂O</text>

            <rect x="370" y="190" width="210" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

            <text x="475" y="225" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Step 2: CO₂ absorption</text>

            <text x="475" y="265" fill="#cbd5e1" fontSize="11" textAnchor="middle">NaHCO₃ precipitates</text>

            <rect x="150" y="310" width="400" height="40" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>

            <text x="350" y="335" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">Calcination: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂</text>

          </svg>

        );


      case "biomolecule-types-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="340" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Four Major Biomolecule Classes</text>
            {[
              {name:"Carbohydrates",formula:"(CH₂O)_n",examples:"Glucose, Starch, Cellulose",color:"#38bdf8",y:110},
              {name:"Proteins",formula:"Polypeptides (20 AA)",examples:"Enzymes, Collagen, Hb",color:"#10b981",y:200},
              {name:"Lipids",formula:"Fatty acid esters",examples:"Triglycerides, Phospholipids",color:"#f59e0b",y:290}
            ].map((bio,i) => (
              <g key={i}>
                <rect x={80+i*170} y={bio.y} width={150} height={85} rx="8" fill={bio.color} fillOpacity="0.12" stroke={bio.color} strokeWidth="2"/>
                <text x={155+i*170} y={bio.y+25} fill={bio.color} fontSize="12" fontWeight="bold" textAnchor="middle">{bio.name}</text>
                <text x={155+i*170} y={bio.y+45} fill="#cbd5e1" fontSize="10" textAnchor="middle">{bio.formula}</text>
                <text x={155+i*170} y={bio.y+65} fill="#94a3b8" fontSize="9" textAnchor="middle">{bio.examples}</text>
              </g>
            ))}
            <rect x="80" y="350" width="540" height="20" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="350" y="365" fill="#a855f7" fontSize="10" textAnchor="middle">DNA/RNA → Proteins → Cellular functions</text>
          </svg>
        );

      case "animal-vs-plant-cell":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="300" height="340" rx="10" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="190" y="60" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Plant Cell</text>
            <rect x="80" y="90" width="220" height="25" rx="4" fill="#10b981" fillOpacity="0.3"/>
            <text x="190" y="107" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Cell Wall (Cellulose)</text>
            <circle cx="190" cy="180" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Nucleus</text>
            {[100,160,220,280].map((y,i) => (
              <ellipse key={i} cx={130+i*40} cy={y} rx="20" ry="12" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1"/>
            ))}
            <text x="190" y="330" fill="#cbd5e1" fontSize="9" textAnchor="middle">Chloroplasts · Large Vacuole · No Centrioles</text>
            <rect x="360" y="30" width="300" height="340" rx="10" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="2"/>
            <text x="510" y="60" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Animal Cell</text>
            <circle cx="510" cy="180" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="510" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Nucleus</text>
            <rect x="440" y="260" width="140" height="20" rx="4" fill="#ef4444" fillOpacity="0.3"/>
            <text x="510" y="274" fill="#ef4444" fontSize="9" textAnchor="middle">Centrioles</text>
            {[80,140,200,260].map((y,i) => (
              <rect key={i} x={440+i*50} y={y} width="25" height="15" rx="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1"/>
            ))}
            <text x="510" y="330" fill="#cbd5e1" fontSize="9" textAnchor="middle">No Cell Wall · Small Vacuoles · Lysosomes</text>
            <line x1="340" y1="200" x2="360" y2="200" stroke="#f59e0b" strokeWidth="2"/>
          </svg>
        );

      case "prokaryotic-vs-eukaryotic-cell":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="300" height="340" rx="10" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            <text x="190" y="60" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Prokaryotic Cell</text>
            <circle cx="190" cy="180" r="80" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="190" y="170" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Nucleoid</text>
            <text x="190" y="190" fill="#cbd5e1" fontSize="9" textAnchor="middle">(circular DNA)</text>
            <rect x="80" y="280" width="220" height="70" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
            <text x="190" y="305" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Features:</text>
            <text x="190" y="325" fill="#cbd5e1" fontSize="9" textAnchor="middle">No nucleus · 70S ribosomes</text>
            <text x="190" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">Peptidoglycan wall · Binary fission</text>
            <rect x="360" y="30" width="300" height="340" rx="10" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="510" y="60" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Eukaryotic Cell</text>
            <circle cx="510" cy="160" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="510" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Nucleus</text>
            {[380,440,500,560,620].map((x,i) => (
              <ellipse key={i} cx={x} cy={240} rx="25" ry="15" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1"/>
            ))}
            <text x="510" y="275" fill="#cbd5e1" fontSize="9" textAnchor="middle">Organelles: ER, Golgi, Mito</text>
            <rect x="400" y="300" width="220" height="70" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="510" y="325" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Features:</text>
            <text x="510" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">True nucleus · 80S ribosomes</text>
            <text x="510" y="360" fill="#cbd5e1" fontSize="9" textAnchor="middle">Mitosis/Meiosis · Complex</text>
          </svg>
        );

      case "mitosis-vs-meiosis":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="30" y="30" width="320" height="340" rx="10" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Mitosis</text>
            <circle cx="190" cy="110" r="30" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="10" textAnchor="middle">2n→2n</text>
            <line x1="120" y1="110" x2="260" y2="110" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="100" cy="170" r="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <circle cx="280" cy="170" r="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="100" y="175" fill="#10b981" fontSize="8" textAnchor="middle">2n</text>
            <text x="280" y="175" fill="#10b981" fontSize="8" textAnchor="middle">2n</text>
            <rect x="60" y="220" width="260" height="130" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
            <text x="190" y="245" fill="#cbd5e1" fontSize="10" textAnchor="middle">• One division</text>
            <text x="190" y="265" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Identical daughter cells</text>
            <text x="190" y="285" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Growth & repair</text>
            <text x="190" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">• No crossing over</text>
            <text x="190" y="335" fill="#f59e0b" fontSize="9" textAnchor="middle">Somatic cells (skin, meristem)</text>
            <rect x="350" y="30" width="320" height="340" rx="10" fill="#a855f7" fillOpacity="0.08" stroke="#a855f7" strokeWidth="2"/>
            <text x="510" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Meiosis</text>
            <circle cx="510" cy="110" r="30" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
            <text x="510" y="115" fill="#a855f7" fontSize="10" textAnchor="middle">2n→n</text>
            <line x1="440" y1="110" x2="580" y2="110" stroke="#f59e0b" strokeWidth="2"/>
            {[460,500,540,580].map((x,i) => (
              <circle key={i} cx={x} cy="170" r="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5"/>
            ))}
            <rect x="380" y="220" width="260" height="130" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="510" y="245" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Two divisions</text>
            <text x="510" y="265" fill="#cbd5e1" fontSize="10" textAnchor="middle">• 4 diverse haploid cells</text>
            <text x="510" y="285" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Crossing over (Prophase I)</text>
            <text x="510" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Genetic diversity</text>
            <text x="510" y="335" fill="#f59e0b" fontSize="9" textAnchor="middle">Gametes (sperm, egg)</text>
          </svg>
        );

      case "organelle-functions":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Eukaryotic Organelle Functions</text>
            {[
              {name:"Nucleus",func:"Genetic control center",color:"#38bdf8"},
              {name:"Mitochondria",func:"ATP production (respiration)",color:"#ef4444"},
              {name:"Rough ER",func:"Protein synthesis & folding",color:"#10b981"},
              {name:"Smooth ER",func:"Lipid synthesis, detox",color:"#f59e0b"},
              {name:"Golgi",func:"Package & ship proteins",color:"#a855f7"},
              {name:"Lysosome",func:"Digestion & recycling",color:"#ec4899"},
              {name:"Chloroplast",func:"Photosynthesis (plants)",color:"#22c55e"}
            ].map((o,i) => (
              <g key={i}>
                <rect x={55+i%4*150} y={95+Math.floor(i/4)*110} width={140} height={95} rx="6" fill={o.color} fillOpacity="0.12" stroke={o.color} strokeWidth="1.5"/>
                <text x={125+i%4*150} y={120} fill={o.color} fontSize="11" fontWeight="bold" textAnchor="middle">{o.name}</text>
                <text x={125+i%4*150} y={145} fill="#cbd5e1" fontSize="9" textAnchor="middle">{o.func}</text>
              </g>
            ))}
            <text x="350" y="360" fill="#94a3b8" fontSize="9" textAnchor="middle">Endosymbiotic theory: mitochondria & chloroplasts originated from prokaryotes</text>
          </svg>
        );

      case "food-chain-web":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Food Chain & Food Web</text>
            <rect x="60" y="90" width="130" height="70" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="125" y="120" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Producer</text>
            <text x="125" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Grass / Phytoplankton</text>
            <text x="125" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 1: 10,000 kcal</text>
            <line x1="190" y1="125" x2="250" y2="125" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="250" y="90" width="130" height="70" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="315" y="120" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Primary Consumer</text>
            <text x="315" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Rabbit / Zooplankton</text>
            <text x="315" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 2: ~1,000 kcal</text>
            <line x1="380" y1="125" x2="440" y2="125" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="440" y="90" width="130" height="70" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2"/>
            <text x="505" y="120" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Secondary Consumer</text>
            <text x="505" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Fox / Small fish</text>
            <text x="505" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 3: ~100 kcal</text>
            <line x1="505" y1="165" x2="505" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"/>
            <text x="505" y="240" fill="#ef4444" fontSize="9" textAnchor="middle">~90% lost as heat</text>
            <rect x="60" y="270" width="580" height="80" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="300" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">10% Law (Lindeman): Only ~10% energy transfers between trophic levels</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Rest lost as heat via respiration, movement, undigested waste</text>
            <text x="350" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">Limits food chains to 4-5 levels; explains pyramid of energy shape</text>
          </svg>
        );

      case "carbon-nitrogen-cycles":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Carbon & Nitrogen Cycles</text>
            <circle cx="180" cy="160" r="60" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="180" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">CO₂</text>
            <text x="180" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Atmosphere</text>
            <circle cx="180" cy="280" r="50" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="180" y="275" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Plants</text>
            <text x="180" y="295" fill="#cbd5e1" fontSize="9" textAnchor="middle">Photosynthesis</text>
            <line x1="180" y1="220" x2="180" y2="225" stroke="#10b981" strokeWidth="2"/>
            <text x="195" y="225" fill="#10b981" fontSize="8">Photosynthesis</text>
            <circle cx="500" cy="160" r="60" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2"/>
            <text x="500" y="155" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">N₂</text>
            <text x="500" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Atmosphere 78%</text>
            <circle cx="500" cy="280" r="50" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="500" y="275" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Soil Bacteria</text>
            <text x="500" y="295" fill="#cbd5e1" fontSize="9" textAnchor="middle">Fixation</text>
            <rect x="60" y="340" width="580" height="25" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="350" y="357" fill="#10b981" fontSize="10" textAnchor="middle">Key: Carbon cycles via atmosphere; Nitrogen requires bacterial fixation; Phosphorus is sedimentary (no atmosphere)</text>
          </svg>
        );

      case "hydrophyte-xerophyte-adaptations":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Hydrophytes vs Xerophytes Adaptations</text>
            <rect x="60" y="90" width="260" height="250" rx="8" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Aquatic Plants (Hydrophytes)</text>
            <text x="80" y="150" fill="#cbd5e1" fontSize="11">• Thin cuticle (no water loss risk)</text>
            <text x="80" y="175" fill="#cbd5e1" fontSize="11">• Stomata on UPPER leaf surface only</text>
            <text x="80" y="200" fill="#cbd5e1" fontSize="11">• Aerenchyma (air spaces) for buoyancy</text>
            <text x="80" y="225" fill="#cbd5e1" fontSize="11">• Weak mechanical tissue (water supports)</text>
            <text x="80" y="250" fill="#cbd5e1" fontSize="11">• Reduced root system</text>
            <text x="80" y="275" fill="#cbd5e1" fontSize="11">• Example: Lotus, Duckweed, Hydrilla</text>
            <rect x="380" y="90" width="260" height="250" rx="8" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            <text x="510" y="115" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Arid Plants (Xerophytes)</text>
            <text x="400" y="150" fill="#cbd5e1" fontSize="11">• Thick waxy cuticle (reduce water loss)</text>
            <text x="400" y="175" fill="#cbd5e1" fontSize="11">• Sunken stomata (reduce transpiration)</text>
            <text x="400" y="200" fill="#cbd5e1" fontSize="11">• CAM photosynthesis (open stomata at night)</text>
            <text x="400" y="225" fill="#cbd5e1" fontSize="11">• Succulent stems (water storage)</text>
            <text x="400" y="250" fill="#cbd5e1" fontSize="11">• Deep/extensive root systems</text>
            <text x="400" y="275" fill="#cbd5e1" fontSize="11">• Example: Cactus, Agave, Opuntia</text>
          </svg>
        );

      case "pollution-climate-change":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Ecological Imbalances: Pollution & Climate Change</text>
            {[
              {title:"Greenhouse Effect",cause:"CO₂, CH₄, N₂O from fossil fuels",effect:"Global temp +1.1°C since 1850",color:"#ef4444"},
              {title:"Ozone Depletion",cause:"CFCs break down stratospheric O₃",effect:"Increased UV-B → skin cancer",color:"#a855f7"},
              {title:"Acid Rain",cause:"SO₂ + NOₓ → H₂SO₄/HNO₃",effect:"pH<5.6 damages forests, lakes",color:"#f59e0b"},
              {title:"Biological Invasion",cause:"Non-native species disrupt ecosystems",effect:"Water hyacinth, Lantana in Nepal",color:"#38bdf8"}
            ].map((item,i) => (
              <rect key={i} x={50+i*160} y="90" width="145" height="140" rx="8" fill={item.color} fillOpacity="0.1" stroke={item.color} strokeWidth="1.5"/>
            ))}
            {[
              {x:122,y:115,title:"Greenhouse",desc:"Global warming"},
              {x:282,y:115,title:"Ozone",desc:"UV increase"},
              {x:442,y:115,title:"Acid Rain",desc:"Ecosystem damage"},
              {x:602,y:115,title:"Invasive",desc:"Biodiversity loss"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="10" textAnchor="middle">{t.title}</text>
            ))}
            <rect x="60" y="250" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="280" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key Solutions</text>
            <text x="350" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">Montreal Protocol (CFCs phase-out) · Paris Agreement (GHG reduction)</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Renewable energy · Reforestation · Integrated Pest Management</text>
            <text x="350" y="345" fill="#f59e0b" fontSize="9" textAnchor="middle">Biomagnification: DDT concentrations amplify 10⁶-fold up food chain</text>
          </svg>
        );

      case "origin-of-life-experiment":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Origin of Life: Oparin-Haldane & Miller-Urey</text>
            <rect x="60" y="90" width="260" height="120" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Early Earth Conditions (~4.6 Ga)</text>
            <text x="80" y="145" fill="#cbd5e1" fontSize="10">• Reducing atmosphere: CH₄, NH₃, H₂, H₂O</text>
            <text x="80" y="165" fill="#cbd5e1" fontSize="10">• No free oxygen (anoxic)</text>
            <text x="80" y="185" fill="#cbd5e1" fontSize="10">• Energy: lightning, UV radiation, volcanic</text>
            <rect x="380" y="90" width="260" height="120" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="510" y="115" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Miller-Urey Experiment (1953)</text>
            <text x="400" y="145" fill="#cbd5e1" fontSize="10">• Simulated early atmosphere + electric sparks</text>
            <text x="400" y="165" fill="#cbd5e1" fontSize="10">• Result: 11 amino acids after 1 week</text>
            <text x="400" y="185" fill="#cbd5e1" fontSize="10">• Supports chemical evolution hypothesis</text>
            <rect x="60" y="230" width="580" height="120" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="255" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">Timeline of Life's Origin</text>
            <line x1="100" y1="290" x2="600" y2="290" stroke="#a855f7" strokeWidth="2"/>
            {[
              {x:120,label:"4.6 Ga",sub:"Earth forms"},
              {x:250,label:"4.0 Ga",sub:"First organic molecules"},
              {x:380,label:"3.5 Ga",sub:"Stromatolites (earliest fossils)"},
              {x:510,label:"2.4 Ga",sub:"O₂ accumulates (Great Oxidation)"}
            ].map((t,i) => (
              <g key={i}>
                <circle cx={t.x} cy="290" r="6" fill="#f59e0b"/>
                <text x={t.x} y="310" fill="#cbd5e1" fontSize="9" textAnchor="middle">{t.label}</text>
                <text x={t.x} y="325" fill="#94a3b8" fontSize="8" textAnchor="middle">{t.sub}</text>
              </g>
            ))}
          </svg>
        );

      case "evidences-of-evolution":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Evidence for Evolution</text>
            {[
              {title:"Morphological",subtitle:"Homologous structures",desc:"Same origin, different function",color:"#38bdf8"},
              {title:"Embryological",subtitle:"Developmental similarities",desc:"Pharyngeal pouches, tails",color:"#10b981"},
              {title:"Paleontological",subtitle:"Fossil record",desc:"Transitional: Archaeopteryx",color:"#f59e0b"},
              {title:"Biochemical",subtitle:"Universal genetic code",desc:"Cytochrome c comparisons",color:"#a855f7"},
              {title:"Biogeographical",subtitle:"Species distribution",desc:"Galápagos finches",color:"#ef4444"}
            ].map((e,i) => (
              <rect key={i} x={50+i*125} y="90" width="115" height="130" rx="8" fill={e.color} fillOpacity="0.1" stroke={e.color} strokeWidth="1.5"/>
            ))}
            <rect x="60" y="240" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="270" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Homologous vs Analogous Structures</text>
            <text x="200" y="300" fill="#38bdf8" fontSize="10" textAnchor="middle">Homologous: Common ancestry → Divergent evolution</text>
            <text x="200" y="320" fill="#38bdf8" fontSize="10" textAnchor="middle">Example: Vertebrate forelimbs (arm, wing, flipper)</text>
            <text x="500" y="300" fill="#ef4444" fontSize="10" textAnchor="middle">Analogous: Similar function, different origin</text>
            <text x="500" y="320" fill="#ef4444" fontSize="10" textAnchor="middle">Example: Bird wing vs Insect wing (convergent evolution)</text>
          </svg>
        );

      case "evolution-theories-comparison":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Evolution Theories Comparison</text>
            <rect x="50" y="90" width="190" height="250" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="145" y="120" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Lamarckism</text>
            <text x="145" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Inheritance of Acquired Traits</text>
            <text x="70" y="185" fill="#cbd5e1" fontSize="10">✗ Use/disuse → inherited</text>
            <text x="70" y="210" fill="#cbd5e1" fontSize="10">✗ Giraffe neck stretching</text>
            <text x="70" y="235" fill="#cbd5e1" fontSize="10">✗ Discredited mechanism</text>
            <rect x="260" y="90" width="190" height="250" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="355" y="120" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Darwinism</text>
            <text x="355" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Natural Selection (1859)</text>
            <text x="280" y="185" fill="#cbd5e1" fontSize="10">✓ Overproduction → variation</text>
            <text x="280" y="210" fill="#cbd5e1" fontSize="10">✓ Survival of fitted</text>
            <text x="280" y="235" fill="#cbd5e1" fontSize="10">✓ Heritable advantageous traits</text>
            <rect x="470" y="90" width="190" height="250" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="565" y="120" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Neo-Darwinism</text>
            <text x="565" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Modern Synthesis</text>
            <text x="490" y="185" fill="#cbd5e1" fontSize="10">✓ Natural selection + Genetics</text>
            <text x="490" y="210" fill="#cbd5e1" fontSize="10">✓ Mutations = raw variation</text>
            <text x="490" y="235" fill="#cbd5e1" fontSize="10">✓ Population allele frequency</text>
          </svg>
        );

      case "human-evolution-tree":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Human Evolution Timeline</text>
            {[
              {name:"Ardipithecus",year:"~4.4 Ma",brain:"~350cc",feat:"Bipedal",color:"#94a3b8"},
              {name:"Australopithecus",year:"~3.2 Ma",brain:"~450cc",feat:"Lucy, bipedal",color:"#f59e0b"},
              {name:"Homo habilis",year:"~2.4 Ma",brain:"~650cc",feat:"Stone tools",color:"#38bdf8"},
              {name:"Homo erectus",year:"~1.8 Ma",brain:"~900cc",feat:"Fire, migration",color:"#10b981"},
              {name:"H. sapiens",year:"~300 ka",brain:"~1350cc",feat:"Language, culture",color:"#a855f7"}
            ].map((h,i) => (
              <g key={i}>
                <circle cx={100+i*120} cy="120" r="35" fill={h.color} fillOpacity="0.2" stroke={h.color} strokeWidth="2"/>
                <text x={100+i*120} y="115" fill={h.color} fontSize="9" fontWeight="bold" textAnchor="middle">{h.name}</text>
                <text x={100+i*120} y="135" fill="#cbd5e1" fontSize="8" textAnchor="middle">{h.year}</text>
                <text x={100+i*120} y="190" fill="#94a3b8" fontSize="9" textAnchor="middle">Brain: {h.brain}</text>
                <text x={100+i*120} y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">{h.feat}</text>
                {i < 4 && <line x1={135+i*120} y1="120" x2={220+i*120} y2="120" stroke="#64748b" strokeWidth="2"/>}
              </g>
            ))}
            <rect x="60" y="260" width="580" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="290" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Key Human Adaptations</text>
            <text x="350" y="315" fill="#cbd5e1" fontSize="10" textAnchor="middle">Bipedalism → Freed hands for tool use</text>
            <text x="350" y="335" fill="#cbd5e1" fontSize="10" textAnchor="middle">Brain expansion (400cc→1350cc) → Language, culture</text>
            <text x="350" y="350" fill="#f59e0b" fontSize="9" textAnchor="middle">Shared 98.8% DNA with chimpanzees; common ancestor ~6-7 Ma</text>
          </svg>
        );

      case "protist-diversity":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Protozoa Classification by Locomotion</text>
            {[
              {name:"Amoebozoa",locomotion:"Pseudopodia",example:"Amoeba, Entamoeba",disease:"Dysentery",color:"#38bdf8"},
              {name:"Flagellata",locomotion:"Flagella",example:"Trypanosoma, Giardia",disease:"Sleeping sickness",color:"#10b981"},
              {name:"Ciliophora",locomotion:"Cilia",example:"Paramecium",disease:"Balantidiasis",color:"#f59e0b"},
              {name:"Sporozoa",locomotion:"None (parasitic)",example:"Plasmodium",disease:"Malaria",color:"#ef4444"}
            ].map((p,i) => (
              <rect key={i} x={55+i*150} y="90" width="140" height="200" rx="8" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="310" width="580" height="50" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="350" y="340" fill="#a855f7" fontSize="10" textAnchor="middle">Plasmodium life cycle: Human (asexual in RBCs) → Mosquito (sexual) → Sporozoites in salivary glands</text>
          </svg>
        );

      case "animal-phyla-key-features":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Animal Phyla Key Features</text>
            {[
              {phylum:"Porifera",symmetry:"Asymmetrical",cavity:"None",example:"Sponge",color:"#94a3b8"},
              {phylum:"Cnidaria",symmetry:"Radial",cavity:"Gastrovascular",example:"Jellyfish",color:"#38bdf8"},
              {phylum:"Platyhelminthes",symmetry:"Bilateral",cavity:"Acoelomate",example:"Flatworm",color:"#10b981"},
              {phylum:"Nematoda",symmetry:"Bilateral",cavity:"Pseudocoelomate",example:"Roundworm",color:"#f59e0b"},
              {phylum:"Annelida",symmetry:"Bilateral",cavity:"Coelomate",example:"Earthworm",color:"#a855f7"},
              {phylum:"Arthropoda",symmetry:"Bilateral",cavity:"Coelomate",example:"Insects (LARGEST)",color:"#ef4444"},
              {phylum:"Chordata",symmetry:"Bilateral",cavity:"Coelomate",example:"Vertebrates",color:"#38bdf8"}
            ].map((p,i) => (
              <rect key={i} x={50+Math.floor(i/3)*210} y={90+(i%3)*80} width="200" height="70" rx="6" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1.5"/>
            ))}
            <text x="350" y="370" fill="#94a3b8" fontSize="10" textAnchor="middle">Complexity progression: Cellular → Tissue → Organ → Organ system levels</text>
          </svg>
        );

      case "earthworm-external-anatomy":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Earthworm (Pheretima) External Anatomy</text>
            <ellipse cx="350" cy="160" rx="250" ry="50" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="155" fill="#f59e0b" fontSize="11" textAnchor="middle">Pheretima posthuma — Segmented Body (100+ metameres)</text>
            <line x1="120" y1="140" x2="80" y2="100" stroke="#38bdf8" strokeWidth="1.5"/>
            <text x="60" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold">Prostomium</text>
            <line x1="200" y1="130" x2="160" y2="80" stroke="#10b981" strokeWidth="1.5"/>
            <text x="120" y="75" fill="#10b981" fontSize="10" fontWeight="bold">Clitellum</text>
            <line x1="500" y1="130" x2="560" y2="80" stroke="#a855f7" strokeWidth="1.5"/>
            <text x="560" y="75" fill="#a855f7" fontSize="10" fontWeight="bold">Setae</text>
            <line x1="550" y1="150" x2="600" y2="120" stroke="#ef4444" strokeWidth="1.5"/>
            <text x="600" y="115" fill="#ef4444" fontSize="10" fontWeight="bold">Pygidium</text>
            <rect x="60" y="230" width="580" height="120" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="260" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key Features</text>
            <text x="100" y="290" fill="#cbd5e1" fontSize="10">• Hermaphroditic (both sexes in one individual)</text>
            <text x="100" y="310" fill="#cbd5e1" fontSize="10">• Cross-fertilization during mating</text>
            <text x="350" y="290" fill="#cbd5e1" fontSize="10">• Cutaneous respiration (moist skin required)</text>
            <text x="350" y="310" fill="#cbd5e1" fontSize="10">• Hydrostatic skeleton (fluid-filled coelom)</text>
          </svg>
        );

      case "frog-anatomy-overview":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Rana tigrina (Frog) — Amphibian Overview</text>
            <rect x="60" y="90" width="260" height="130" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Aquatic Larva (Tadpole)</text>
            <text x="80" y="145" fill="#cbd5e1" fontSize="10">• Gills for breathing</text>
            <text x="80" y="165" fill="#cbd5e1" fontSize="10">• Herbivorous (algae/detritus)</text>
            <text x="80" y="185" fill="#cbd5e1" fontSize="10">• Long coiled intestine</text>
            <text x="80" y="205" fill="#cbd5e1" fontSize="10">• Tail for swimming</text>
            <rect x="380" y="90" width="260" height="130" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="510" y="115" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Terrestrial Adult</text>
            <text x="400" y="145" fill="#cbd5e1" fontSize="10">• Lungs + skin breathing</text>
            <text x="400" y="165" fill="#cbd5e1" fontSize="10">• Carnivorous (insects)</text>
            <text x="400" y="185" fill="#cbd5e1" fontSize="10">• Short intestine</text>
            <text x="400" y="205" fill="#cbd5e1" fontSize="10">• Strong hind legs for jumping</text>
            <rect x="60" y="240" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="270" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Physiological Systems</text>
            <text x="120" y="300" fill="#38bdf8" fontSize="10">Heart: 3 chambers (2 atria + 1 ventricle)</text>
            <text x="120" y="320" fill="#38bdf8" fontSize="10">Excretion: Urea (ureotelic as adult)</text>
            <text x="400" y="300" fill="#10b981" fontSize="10">Respiration: Skin + buccal + lungs</text>
            <text x="400" y="320" fill="#10b981" fontSize="10">Metamorphosis: Thyroxine-triggered</text>
          </svg>
        );

      case "fungi-life-cycles":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Fungal Kingdom Classification</text>
            {[
              {name:"Phycomycetes",desc:"Coenocytic hyphae, no septa",spores:"Zoospores/Oospores",ex:"Rhizopus, Mucor",color:"#38bdf8"},
              {name:"Ascomycetes",desc:"Septate hyphae",spores:"Ascospores (8/ascus)",ex:"Yeast, Penicillium",color:"#10b981"},
              {name:"Basidiomycetes",desc:"Septate hyphae",spores:"Basidiospores (4/basidium)",ex:"Mushroom, Rusts",color:"#f59e0b"},
              {name:"Deuteromycetes",desc:"Imperfect fungi",spores:"Only asexual known",ex:"Alternaria, Trichoderma",color:"#ef4444"}
            ].map((f,i) => (
              <rect key={i} x={55+i*155} y="90" width="145" height="180" rx="8" fill={f.color} fillOpacity="0.1" stroke={f.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="290" width="580" height="65" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="315" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Economic Importance</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">Decomposers · Mycorrhizal symbionts (90% plants) · Antibiotics (penicillin) · Food (mushrooms, yeast)</text>
          </svg>
        );

      case "algae-types-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Algae Classification by Pigment</text>
            {[
              {name:"Chlorophyceae",nameCN:"Green Algae",pigments:"Chl a+b",storage:"Starch",ex:"Spirogyra, Chlamydomonas",color:"#10b981"},
              {name:"Phaeophyceae",nameCN:"Brown Algae",pigments:"Chl a+c + fucoxanthin",storage:"Laminarin",ex:"Laminaria, Fucus",color:"#f59e0b"},
              {name:"Rhodophyceae",nameCN:"Red Algae",pigments:"Chl a+d + phycoerythrin",storage:"Floridean starch",ex:"Porphyra, Gracilaria",color:"#ef4444"}
            ].map((a,i) => (
              <rect key={i} x={60+i*210} y="90" width="190" height="220" rx="8" fill={a.color} fillOpacity="0.1" stroke={a.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="330" width="580" height="25" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
            <text x="350" y="347" fill="#38bdf8" fontSize="10" textAnchor="middle">Key: Red algae survive deep water (phycoerythrin absorbs blue light); Agar from red algae essential for microbiology</text>
          </svg>
        );

      case "bryophyte-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Bryophyte Life Cycle — Gametophyte Dominant</text>
            <circle cx="100" cy="130" r="25" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
            <text x="100" y="135" fill="#f59e0b" fontSize="10" textAnchor="middle">Spore</text>
            <line x1="125" y1="130" x2="180" y2="130" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="180" y="105" width="100" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="230" y="130" fill="#10b981" fontSize="10" textAnchor="middle">Protonema</text>
            <line x1="280" y1="130" x2="340" y2="130" stroke="#10b981" strokeWidth="2"/>
            <rect x="340" y="90" width="140" height="80" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="410" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gametophyte</text>
            <text x="410" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle">(n) dominant phase</text>
            <line x1="480" y1="130" x2="540" y2="130" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="560" cy="130" r="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
            <text x="560" y="135" fill="#ef4444" fontSize="9" textAnchor="middle">Zygote</text>
            <line x1="560" y1="150" x2="560" y2="200" stroke="#ef4444" strokeWidth="2"/>
            <rect x="520" y="200" width="120" height="70" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
            <text x="580" y="225" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Sporophyte</text>
            <text x="580" y="245" fill="#cbd5e1" fontSize="9" textAnchor="middle">(2n) parasitic on gametophyte</text>
            <rect x="60" y="300" width="440" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="280" y="330" fill="#10b981" fontSize="10" textAnchor="middle">Requirement: Water for fertilization (flagellated sperm swim to egg)</text>
          </svg>
        );

      case "pteridophyte-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Pteridophyte Life Cycle — Sporophyte Dominant</text>
            <rect x="60" y="90" width="260" height="140" rx="8" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="120" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Sporophyte (2n) — Dominant</text>
            <text x="80" y="155" fill="#cbd5e1" fontSize="10">• Fern fronds with sori (sporangia)</text>
            <text x="80" y="175" fill="#cbd5e1" fontSize="10">• True vascular tissue (xylem + phloem)</text>
            <text x="80" y="195" fill="#cbd5e1" fontSize="10">• Rhizome + adventitious roots</text>
            <text x="80" y="215" fill="#cbd5e1" fontSize="10">• Examples: Dryopteris, Adiantum</text>
            <line x1="320" y1="160" x2="380" y2="160" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="410" cy="160" r="25" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
            <text x="410" y="165" fill="#f59e0b" fontSize="10" textAnchor="middle">Spores</text>
            <line x1="435" y1="160" x2="490" y2="160" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="490" y="130" width="170" height="60" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="575" y="155" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Prothallus (n)</text>
            <text x="575" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Heart-shaped, independent</text>
            <rect x="60" y="310" width="400" height="50" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
            <text x="260" y="340" fill="#f59e0b" fontSize="10" textAnchor="middle">vs Bryophytes: Sporophyte dominant, not parasitic; true vascular tissue</text>
          </svg>
        );

      case "gymnosperm-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Gymnosperm Life Cycle (Pinus)</text>
            <rect x="60" y="90" width="200" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="160" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Male Cone (Strobilus)</text>
            <text x="80" y="140" fill="#cbd5e1" fontSize="10">Microsporophylls → Microsporangia</text>
            <text x="80" y="160" fill="#cbd5e1" fontSize="10">→ Pollen grains (2-winged)</text>
            <rect x="440" y="90" width="200" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="540" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Female Cone (Strobilus)</text>
            <text x="460" y="140" fill="#cbd5e1" fontSize="10">Megasporophylls → Ovules</text>
            <text x="460" y="160" fill="#cbd5e1" fontSize="10">Nucellus + Integument + Micropyle</text>
            <line x1="260" y1="140" x2="440" y2="140" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="130" fill="#a855f7" fontSize="9" textAnchor="middle">Pollen tube</text>
            <rect x="60" y="220" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="250" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key: NO double fertilization (unlike angiosperms)</text>
            <text x="350" y="275" fill="#cbd5e1" fontSize="10" textAnchor="middle">One sperm fertilizes egg → zygote (2n); Other sperm degenerates</text>
            <text x="350" y="295" fill="#f59e0b" fontSize="9" textAnchor="middle">Endosperm is HAPLOID (n, female gametophyte tissue)</text>
          </svg>
        );

      case "flower-anatomy-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Flower Anatomy & Double Fertilization</text>
            <rect x="60" y="90" width="130" height="80" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="125" y="115" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Calyx</text>
            <text x="125" y="140" fill="#cbd5e1" fontSize="10" textAnchor="middle">Sepals (protective)</text>
            <rect x="210" y="90" width="130" height="80" rx="6" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
            <text x="275" y="115" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Corolla</text>
            <text x="275" y="140" fill="#cbd5e1" fontSize="10" textAnchor="middle">Petals (attract pollinators)</text>
            <rect x="360" y="90" width="130" height="80" rx="6" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2"/>
            <text x="425" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Androecium</text>
            <text x="425" y="140" fill="#cbd5e1" fontSize="10" textAnchor="middle">Stamens (male)</text>
            <rect x="510" y="90" width="130" height="80" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="575" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Gynoecium</text>
            <text x="575" y="140" fill="#cbd5e1" fontSize="10" textAnchor="middle">Carpel (female)</text>
            <rect x="60" y="195" width="580" height="140" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="225" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">Double Fertilization (Unique to Angiosperms)</text>
            <text x="150" y="260" fill="#38bdf8" fontSize="11" fontWeight="bold">Sperm 1 + Egg → Zygote (2n) → Embryo</text>
            <text x="150" y="285" fill="#10b981" fontSize="11" fontWeight="bold">Sperm 2 + 2 Polar nuclei → Primary Endosperm Nucleus (3n)</text>
            <text x="150" y="310" fill="#f59e0b" fontSize="10" fontWeight="bold">→ Triploid Endosperm (nutritive tissue for embryo)</text>
            <text x="350" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">After fertilization: Ovule → Seed; Ovary → Fruit</text>
          </svg>
        );

      case "biology-scope-branches":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Biology: Scope & Major Branches</text>
            {[
              {name:"Morphology",sub:"Form & structure",color:"#38bdf8"},
              {name:"Anatomy",sub:"Internal structure",color:"#10b981"},
              {name:"Physiology",sub:"Function & processes",color:"#f59e0b"},
              {name:"Genetics",sub:"Heredity & variation",color:"#a855f7"},
              {name:"Ecology",sub:"Organism-environment",color:"#ef4444"},
              {name:"Taxonomy",sub:"Classification",color:"#ec4899"},
              {name:"Evolution",sub:"Descent with modification",color:"#38bdf8"},
              {name:"Microbiology",sub:"Microorganisms",color:"#10b981"}
            ].map((b,i) => (
              <rect key={i} x={55+Math.floor(i/4)*155} y={90+(i%4)*75} width={145} height={65} rx="6" fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.5"/>
            ))}
            <rect x="60" y="310" width="580" height="45" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="337" fill="#f59e0b" fontSize="11" textAnchor="middle">Interdisciplinary: Biochemistry · Biophysics · Bioinformatics · Biostatistics · Environmental Science</text>
          </svg>
        );

      case "biology-interdisciplinary":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Biology Interdisciplinary Connections</text>
            {[
              {field:"Chemistry",link:"Biochemistry",ex:"Metabolism, drug design",color:"#38bdf8"},
              {field:"Physics",link:"Biophysics",ex:"MRI, biomechanics, vision",color:"#10b981"},
              {field:"Mathematics",link:"Biostatistics",ex:"Population models, epidemiology",color:"#f59e0b"},
              {field:"Computer Sci",link:"Bioinformatics",ex:"Genomics, sequence analysis",color:"#a855f7"},
              {field:"Earth Science",link:"Ecology",ex:"Biogeochemical cycles",color:"#ef4444"}
            ].map((c,i) => (
              <rect key={i} x={60+i*120} y="90" width="105" height="140" rx="8" fill={c.color} fillOpacity="0.1" stroke={c.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="250" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="280" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Critical Applications</text>
            <text x="350" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">CRISPR gene editing (derived from bacterial immunity) · mRNA vaccines · Epidemic SIR models</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Human Genome Project (3 billion bases) · Climate modeling · Precision agriculture</text>
          </svg>
        );

      case "bacterial-cell-structure":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Bacterial Cell Structure</text>
            <ellipse cx="350" cy="180" rx="180" ry="100" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            <ellipse cx="350" cy="180" rx="195" ry="110" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3"/>
            <text x="350" y="75" fill="#a855f7" fontSize="10" textAnchor="middle">Capsule (slime layer)</text>
            <ellipse cx="350" cy="180" rx="180" ry="100" fill="none" stroke="#ef4444" strokeWidth="3"/>
            <text x="540" y="100" fill="#ef4444" fontSize="10">Cell Wall (peptidoglycan)</text>
            <ellipse cx="350" cy="180" rx="165" ry="90" fill="none" stroke="#38bdf8" strokeWidth="2"/>
            <text x="540" y="160" fill="#38bdf8" fontSize="10">Cell Membrane</text>
            <circle cx="320" cy="170" r="35" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="320" y="175" fill="#10b981" fontSize="10" textAnchor="middle">Nucleoid</text>
            <text x="320" y="190" fill="#cbd5e1" fontSize="8" textAnchor="middle">(circular DNA)</text>
            <rect x="60" y="300" width="270" height="55" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>
            <text x="195" y="325" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Gram-Positive</text>
            <text x="195" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Thick peptidoglycan → PURPLE</text>
            <rect x="370" y="300" width="270" height="55" rx="6" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="505" y="325" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gram-Negative</text>
            <text x="505" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Thin peptidoglycan + outer membrane → PINK</text>
          </svg>
        );

      case "virion-structure":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Virus Structure & Replication</text>
            <circle cx="180" cy="150" r="60" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2"/>
            <circle cx="180" cy="150" r="20" fill="#ef4444" fillOpacity="0.3"/>
            <text x="180" y="155" fill="#ef4444" fontSize="9" textAnchor="middle">RNA/DNA</text>
            <text x="180" y="230" fill="#cbd5e1" fontSize="10" textAnchor="middle">Capsid (protein coat)</text>
            <rect x="350" y="80" width="120" height="120" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="410" cy="120" r="30" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="410" y="115" fill="#38bdf8" fontSize="9" textAnchor="middle">Head</text>
            <line x1="410" y1="150" x2="410" y2="190" stroke="#38bdf8" strokeWidth="3"/>
            <text x="410" y="210" fill="#cbd5e1" fontSize="9" textAnchor="middle">Tail</text>
            <rect x="500" y="80" width="160" height="170" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="580" y="105" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Lytic Cycle</text>
            <text x="520" y="135" fill="#cbd5e1" fontSize="9">1. Attachment</text>
            <text x="520" y="155" fill="#cbd5e1" fontSize="9">2. Penetration</text>
            <text x="520" y="175" fill="#cbd5e1" fontSize="9">3. Biosynthesis</text>
            <text x="520" y="195" fill="#cbd5e1" fontSize="9">4. Maturation</text>
            <text x="520" y="215" fill="#cbd5e1" fontSize="9">5. Lysis/Release</text>
            <rect x="60" y="310" width="580" height="45" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="337" fill="#a855f7" fontSize="11" textAnchor="middle">Viruses are ACCELLULAR: no metabolism, obligate intracellular parasites, DNA OR RNA (never both)</text>
          </svg>
        );

      case "biotech-microbe-applications":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Microbial Biotechnology Applications</text>
            {[
              {area:"Industry",ex:"Fermentation, antibiotics, enzymes",color:"#38bdf8"},
              {area:"Medicine",ex:"Insulin, vaccines, monoclonal antibodies",color:"#10b981"},
              {area:"Agriculture",ex:"Biofertilizers (Rhizobium), Bt crops",color:"#f59e0b"},
              {area:"Environment",ex:"Bioremediation, wastewater treatment",color:"#a855f7"}
            ].map((a,i) => (
              <rect key={i} x={60+i*155} y="90" width="140" height="140" rx="8" fill={a.color} fillOpacity="0.1" stroke={a.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="250" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="280" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Landmark Achievements</text>
            <text x="120" y="310" fill="#38bdf8" fontSize="10">• Humulin (1982): First GMO drug — human insulin from E. coli</text>
            <text x="120" y="330" fill="#10b981" fontSize="10">• Bt cotton: 50%+ pesticide reduction via bacterial crystal protein</text>
            <text x="400" y="310" fill="#a855f7" fontSize="10">• Pseudomonas putida: Oil spill bioremediation (Exxon Valdez)</text>
            <text x="400" y="330" fill="#ef4444" fontSize="10">• Gut microbiome: 10¹⁴ microbes essential for digestion & immunity</text>
          </svg>
        );

      case "biodiversity-conservation":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Biodiversity & Conservation Strategies</text>
            <rect x="60" y="90" width="180" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="150" y="120" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Genetic Diversity</text>
            <text x="150" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Nepal rice landraces (300+)</text>
            <rect x="260" y="90" width="180" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="120" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Species Diversity</text>
            <text x="350" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Rhino, tiger, red panda</text>
            <rect x="460" y="90" width="180" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="550" y="120" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Ecosystem Diversity</text>
            <text x="550" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Terai to nival zones</text>
            <rect x="60" y="210" width="280" height="140" rx="8" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="2"/>
            <text x="200" y="240" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Major Threats</text>
            <text x="80" y="270" fill="#cbd5e1" fontSize="10">1. Habitat loss/degradation (PRIMARY)</text>
            <text x="80" y="295" fill="#cbd5e1" fontSize="10">2. Overexploitation (poaching, logging)</text>
            <text x="80" y="320" fill="#cbd5e1" fontSize="10">3. Invasive species</text>
            <rect x="360" y="210" width="280" height="140" rx="8" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="500" y="240" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Conservation Strategies</text>
            <text x="380" y="270" fill="#cbd5e1" fontSize="10">In-situ: National parks, wildlife reserves</text>
            <text x="380" y="295" fill="#cbd5e1" fontSize="10">Ex-situ: Seed banks, zoos, cryopreservation</text>
          </svg>
        );

      case "conservation-strategies-nepal":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Nepal Conservation: In-situ & Ex-situ</text>
            <rect x="50" y="90" width="290" height="220" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="195" y="120" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">In-situ Conservation</text>
            <text x="70" y="155" fill="#cbd5e1" fontSize="10">• National Parks (11): Chitwan, Sagarmatha</text>
            <text x="70" y="180" fill="#cbd5e1" fontSize="10">• Wildlife Reserves (6): Bardia, Koshi Tappu</text>
            <text x="70" y="205" fill="#cbd5e1" fontSize="10">• Conservation Areas (1): Annapurna (7,629 km²)</text>
            <text x="70" y="265" fill="#f59e0b" fontSize="9">Coverage: ~21% of Nepal land area</text>
            <rect x="360" y="90" width="290" height="220" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="505" y="120" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Ex-situ Conservation</text>
            <text x="380" y="155" fill="#cbd5e1" fontSize="10">• Seed banks (NTNC × Millennium Seed Bank)</text>
            <text x="380" y="180" fill="#cbd5e1" fontSize="10">• Botanical gardens (National, Bhaktapur)</text>
            <text x="380" y="205" fill="#cbd5e1" fontSize="10">• Zoos & safari parks (Chitwan Safari Park)</text>
            <text x="380" y="265" fill="#f59e0b" fontSize="9">Community forestry: 22,000 user groups</text>
          </svg>
        );

      case "nepal-vegetation-zones":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Nepal Vegetation Zones (Altitude-Based)</text>
            {[
              {zone:"Terai",alt:"100-600m",veg:"Tropical deciduous (sal)",color:"#10b981"},
              {zone:"Siwalik",alt:"600-2000m",veg:"Moist subtropical (chirai)",color:"#38bdf8"},
              {zone:"Middle Hills",alt:"2000-3000m",veg:"Temperate (oak, rhodo)",color:"#f59e0b"},
              {zone:"High Hills",alt:"3000-4000m",veg:"Subalpine (birch, juniper)",color:"#a855f7"},
              {zone:"Alpine",alt:"4000-4800m",veg:"Alpine meadows (herbs)",color:"#ef4444"},
              {zone:"Nival",alt:"4800m+",veg:"Bare rock, snow only",color:"#94a3b8"}
            ].map((z,i) => (
              <rect key={i} x={50+i*105} y="90" width="95" height="180" rx="6" fill={z.color} fillOpacity="0.1" stroke={z.color} strokeWidth="2"/>
            ))}
            <rect x="60" y="290" width="580" height="65" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="315" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Key Facts</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">34+ rhododendron species (national flower: R. arboreum) · Community forestry managing 2.2M hectares</text>
            <text x="350" y="355" fill="#94a3b8" fontSize="9" textAnchor="middle">Climate change shifting treeline upward ~30m/decade; alpine species face habitat compression</text>
          </svg>
        );


      // ============ CHEMISTRY VISUALIZATIONS ============
      case "bohr-hydrogen-atom":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Bohr Model of Hydrogen Atom</text>
            <circle cx="350" cy="250" r="15" fill="#ef4444"/>
            <text x="350" y="255" textAnchor="middle" fill="white" fontSize="8">+</text>
            {[1,2,3,4].map(n => (
              <circle key={n} cx="350" cy="250" r={40*n} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray={n===1?"":"5,3"}/>
            ))}
            <circle cx={350+40} cy="250" r="6" fill="#22c55e"/>
            <text x={350+50} y="255" fill="#22c55e" fontSize="10">n=1</text>
            <circle cx={350} cy={250-80} r="6" fill="#22c55e"/>
            <text x={350+10} y={240} fill="#22c55e" fontSize="10">n=2</text>
            <rect x="80" y="380" width="260" height="60" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="405" textAnchor="middle" fill="#f59e0b" fontSize="12">E_n = -13.6/n^2 eV</text>
            <text x="210" y="425" textAnchor="middle" fill="#94a3b8" fontSize="10">Quantized energy levels</text>
            <rect x="380" y="380" width="240" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="405" textAnchor="middle" fill="#8b5cf6" fontSize="10">Spectral Series</text>
            <text x="390" y="425" fill="#e2e8f0" fontSize="9">Lyman (UV) · Balmer (Visible)</text>
          </svg>
        );
      case "rutherford-alpha-scattering":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">Rutherford Gold Foil Experiment</text>
            {[100,200,300,400,500].map((x,i) => (
              <g key={i}>
                <line x1={x} y1="120" x2={x} y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"/>
                <polygon points={`${x},115 ${x+5},125 ${x-5},125`} fill="#fbbf24"/>
              </g>
            ))}
            <rect x="100" y="200" width="500" height="20" rx="3" fill="#d97706" opacity="0.8"/>
            <circle cx="350" cy="280" r="12" fill="#ef4444"/>
            <text x="350" y="285" textAnchor="middle" fill="white" fontSize="8">N</text>
            <path d="M 100 200 Q 200 280 150 380" fill="none" stroke="#f87171" strokeWidth="2"/>
            <path d="M 500 200 Q 450 280 500 380" fill="none" stroke="#f87171" strokeWidth="2"/>
            <path d="M 350 200 L 350 280" fill="none" stroke="#fbbf24" strokeWidth="2"/>
            <text x="100" y="390" fill="#f87171" fontSize="10">Deflected</text>
            <text x="350" y="390" textAnchor="middle" fill="#fbbf24" fontSize="10">Most pass through</text>
            <text x="550" y="390" textAnchor="end" fill="#f87171" fontSize="10">Small angle</text>
            <rect x="80" y="410" width="540" height="40" rx="6" fill="#1e293b" stroke="#10b981"/>
            <text x="350" y="435" textAnchor="middle" fill="#e2e8f0" fontSize="11">Atom is mostly empty space with dense positive nucleus</text>
          </svg>
        );
      case "hydrogen-spectrum":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Hydrogen Emission Spectrum</text>
            <rect x="100" y="100" width="500" height="80" rx="6" fill="#1e293b"/>
            <text x="110" y="120" fill="#94a3b8" fontSize="10">Visible Region (Balmer)</text>
            <line x1="150" y1="140" x2="150" y2="170" stroke="#ef4444" strokeWidth="4"/>
            <text x="150" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Hα 656nm</text>
            <line x1="220" y1="140" x2="220" y2="170" stroke="#22c55e" strokeWidth="4"/>
            <text x="220" y="185" textAnchor="middle" fill="#22c55e" fontSize="9">Hβ 486nm</text>
            <line x1="290" y1="140" x2="290" y2="170" stroke="#3b82f6" strokeWidth="4"/>
            <text x="290" y="185" textAnchor="middle" fill="#3b82f6" fontSize="9">Hγ 434nm</text>
            <line x1="350" y1="140" x2="350" y2="170" stroke="#8b5cf6" strokeWidth="4"/>
            <text x="350" y="185" textAnchor="middle" fill="#8b5cf6" fontSize="9">Hδ 410nm</text>
            <rect x="100" y="240" width="240" height="200" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="220" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Energy Levels</text>
            {[1,2,3,4,5,'∞'].map((n,i) => (
              <g key={n}>
                <line x1="130" y1={290+i*25} x2="310" y2={290+i*25} stroke="#475569" strokeWidth="2"/>
                <text x="120" y={295+i*25} textAnchor="end" fill="#94a3b8" fontSize="10">n={n}</text>
                <text x="320" y={295+i*25} fill="#64748b" fontSize="9">{n==='∞'?'0':((-13.6/Number(n)/Number(n)).toFixed(1))+'eV'}</text>
              </g>
            ))}
            <rect x="370" y="240" width="260" height="200" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="260" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Spectral Series</text>
            <text x="380" y="290" fill="#ef4444" fontSize="10">· Lyman: n→1 (UV)</text>
            <text x="380" y="315" fill="#22c55e" fontSize="10">· Balmer: n→2 (Visible)</text>
            <text x="380" y="340" fill="#3b82f6" fontSize="10">· Paschen: n→3 (IR)</text>
            <text x="380" y="365" fill="#8b5cf6" fontSize="10">· Brackett: n→4 (IR)</text>
            <text x="380" y="390" fill="#ec4899" fontSize="10">· Pfund: n→5 (IR)</text>
            <text x="380" y="420" fill="#94a3b8" fontSize="10">Rydberg: 1/λ = R(1/n²-1/m²)</text>
          </svg>
        );
      case "quantum-numbers":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Quantum Numbers</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="210" y="115" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">Principal (n)</text>
            <text x="90" y="140" fill="#e2e8f0" fontSize="10">· Energy level/shell</text>
            <text x="90" y="160" fill="#e2e8f0" fontSize="10">· n = 1, 2, 3...</text>
            <text x="90" y="180" fill="#e2e8f0" fontSize="10">· Determines size</text>
            <text x="90" y="200" fill="#e2e8f0" fontSize="10">· Max electrons: 2n²</text>
            <text x="90" y="225" fill="#94a3b8" fontSize="10">Example: n=2 → 8 e⁻ max</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#10b981"/>
            <text x="500" y="115" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Azimuthal (l)</text>
            <text x="380" y="140" fill="#e2e8f0" fontSize="10">· Subshell shape</text>
            <text x="380" y="160" fill="#e2e8f0" fontSize="10">· l = 0 to n-1</text>
            <text x="380" y="180" fill="#e2e8f0" fontSize="10">· s,p,d,f orbitals</text>
            <text x="380" y="200" fill="#e2e8f0" fontSize="10">· Determines angular mom.</text>
            <text x="380" y="225" fill="#94a3b8" fontSize="10">l=0(s), 1(p), 2(d), 3(f)</text>
            <rect x="80" y="290" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="315" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Magnetic (ml)</text>
            <text x="90" y="340" fill="#e2e8f0" fontSize="10">· Orbital orientation</text>
            <text x="90" y="360" fill="#e2e8f0" fontSize="10">· ml = -l to +l</text>
            <text x="90" y="380" fill="#e2e8f0" fontSize="10">· Number of orbitals</text>
            <text x="90" y="400" fill="#e2e8f0" fontSize="10">· Each holds 2 e⁻</text>
            <text x="90" y="430" fill="#94a3b8" fontSize="10">l=1 → ml=-1,0,+1 (3 p-orbitals)</text>
            <rect x="370" y="290" width="260" height="160" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="500" y="315" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Spin (ms)</text>
            <text x="380" y="340" fill="#e2e8f0" fontSize="10">· Electron spin direction</text>
            <text x="380" y="360" fill="#e2e8f0" fontSize="10">· ms = +½ or -½</text>
            <text x="380" y="380" fill="#e2e8f0" fontSize="10">· Up ↑ or down ↓</text>
            <text x="380" y="400" fill="#e2e8f0" fontSize="10">· Pauli exclusion principle</text>
            <text x="380" y="430" fill="#94a3b8" fontSize="10">No two e⁻ share all 4 quantum #'s</text>
          </svg>
        );
      case "orbital-shapes-s-p":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Orbital Shapes: s and p Orbitals</text>
            <rect x="80" y="90" width="220" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="190" y="115" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">s Orbital</text>
            <circle cx="190" cy="190" r="60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="190" cy="190" r="40" fill="#3b82f6" opacity="0.3"/>
            <circle cx="190" cy="190" r="20" fill="#3b82f6" opacity="0.5"/>
            <text x="190" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">Spherical symmetry</text>
            <text x="190" y="295" textAnchor="middle" fill="#64748b" fontSize="9">l = 0, 1 orbital</text>
            <rect x="330" y="90" width="310" height="180" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="485" y="115" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">p Orbitals (px, py, pz)</text>
            <ellipse cx="400" cy="185" rx="40" ry="25" fill="#22c55e" opacity="0.4"/>
            <text x="400" y="230" textAnchor="middle" fill="#22c55e" fontSize="9">px</text>
            <ellipse cx="485" cy="185" rx="25" ry="40" fill="#3b82f6" opacity="0.4"/>
            <text x="485" y="230" textAnchor="middle" fill="#3b82f6" fontSize="9">py</text>
            <ellipse cx="570" cy="185" rx="40" ry="25" fill="#f59e0b" opacity="0.4" transform="rotate(90,570,185)"/>
            <text x="570" y="230" textAnchor="middle" fill="#f59e0b" fontSize="9">pz</text>
            <text x="485" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">Dumbbell shaped</text>
            <text x="485" y="275" textAnchor="middle" fill="#64748b" fontSize="9">l = 1, 3 orbitals</text>
            <rect x="80" y="300" width="560" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="360" y="330" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Key Properties</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">· s orbital: spherical, no nodal plane through nucleus</text>
            <text x="100" y="385" fill="#e2e8f0" fontSize="11">· p orbital: dumbbell, one nodal plane through nucleus</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">· Each orbital holds max 2 electrons (opposite spins)</text>
            <text x="100" y="435" fill="#e2e8f0" fontSize="11">· n=2: one 2s + three 2p orbitals = 4 total orbitals, 8 electrons</text>
          </svg>
        );
      case "vsepr-geometry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">VSEPR Theory - Molecular Geometry</text>
            <rect x="80" y="90" width="160" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="160" y="115" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">AX₂ (0 LP)</text>
            <circle cx="160" cy="155" r="10" fill="#ef4444"/>
            <line x1="160" y1="155" x2="120" y2="195" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="120" cy="195" r="6" fill="#3b82f6"/>
            <line x1="160" y1="155" x2="200" y2="195" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="200" cy="195" r="6" fill="#3b82f6"/>
            <text x="160" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">Linear 180°</text>
            <text x="160" y="240" textAnchor="middle" fill="#64748b" fontSize="8">CO₂, BeCl₂</text>
            <rect x="260" y="90" width="160" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="340" y="115" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">AX₃ (0 LP)</text>
            <circle cx="340" cy="155" r="10" fill="#ef4444"/>
            <line x1="340" y1="155" x2="300" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="300" cy="200" r="6" fill="#3b82f6"/>
            <line x1="340" y1="155" x2="380" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="380" cy="200" r="6" fill="#3b82f6"/>
            <line x1="340" y1="155" x2="340" y2="210" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="340" cy="210" r="6" fill="#3b82f6"/>
            <text x="340" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Trigonal Planar 120°</text>
            <text x="340" y="255" textAnchor="middle" fill="#64748b" fontSize="8">BF₃</text>
            <rect x="440" y="90" width="180" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="530" y="115" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">AX₄ (0 LP)</text>
            <circle cx="530" cy="155" r="10" fill="#ef4444"/>
            <line x1="530" y1="155" x2="490" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="490" cy="200" r="6" fill="#3b82f6"/>
            <line x1="530" y1="155" x2="570" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="570" cy="200" r="6" fill="#3b82f6"/>
            <line x1="530" y1="155" x2="530" y2="210" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="530" cy="210" r="6" fill="#3b82f6"/>
            <text x="530" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Tetrahedral 109.5°</text>
            <text x="530" y="255" textAnchor="middle" fill="#64748b" fontSize="8">CH₄</text>
            <rect x="80" y="230" width="160" height="120" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="160" y="255" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">AX₂E₂ (2 LP)</text>
            <circle cx="160" cy="295" r="10" fill="#ef4444"/>
            <ellipse cx="160" cy="275" rx="20" ry="10" fill="#ec4899" opacity="0.5"/>
            <line x1="160" y1="295" x2="130" y2="340" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="130" cy="340" r="6" fill="#3b82f6"/>
            <line x1="160" y1="295" x2="190" y2="340" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="190" cy="340" r="6" fill="#3b82f6"/>
            <text x="160" y="365" textAnchor="middle" fill="#94a3b8" fontSize="9">Bent ~104.5°</text>
            <text x="160" y="380" textAnchor="middle" fill="#64748b" fontSize="8">H₂O</text>
            <rect x="260" y="230" width="360" height="120" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="440" y="255" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">VSEPR Principles</text>
            <text x="270" y="280" fill="#e2e8f0" fontSize="10">· Electron pairs repel each other</text>
            <text x="270" y="300" fill="#e2e8f0" fontSize="10">· Lone pairs repel more than bonding pairs</text>
            <text x="270" y="320" fill="#e2e8f0" fontSize="10">· Geometry minimizes repulsion</text>
            <text x="270" y="340" fill="#e2e8f0" fontSize="10">Bond angles: LP-LP {"<"} LP-BP {"<"} BP-BP</text>
            <text x="270" y="360" fill="#94a3b8" fontSize="10">Example: NH₃ (107) {"<"} CH₄ (109.5) due to LP</text>
            <rect x="80" y="370" width="560" height="70" rx="6" fill="#1e293b" stroke="#475569"/>
            <text x="100" y="395" fill="#ef4444" fontSize="11">●</text>
            <text x="115" y="395" fill="#e2e8f0" fontSize="10">Central atom</text>
            <text x="230" y="395" fill="#3b82f6" fontSize="11">●</text>
            <text x="245" y="395" fill="#e2e8f0" fontSize="10">Bonding pair</text>
            <text x="370" y="395" fill="#ec4899" fontSize="11">●</text>
            <text x="385" y="395" fill="#e2e8f0" fontSize="10">Lone pair</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">Note: Molecular shape considers atoms only, not lone pairs</text>
          </svg>
        );
      case "hybridization-orbitals":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Hybridization of Atomic Orbitals</text>
            <rect x="80" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="115" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">sp³</text>
            <text x="165" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 3p → 4 sp³</text>
            <circle cx="165" cy="180" r="8" fill="#ef4444"/>
            <line x1="165" y1="180" x2="130" y2="230" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="130" cy="230" r="6" fill="#3b82f6"/>
            <line x1="165" y1="180" x2="200" y2="230" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="200" cy="230" r="6" fill="#3b82f6"/>
            <line x1="165" y1="180" x2="165" y2="260" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="165" cy="260" r="6" fill="#3b82f6"/>
            <text x="165" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">109.5°</text>
            <text x="165" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">CH₄, CCl₄</text>
            <rect x="270" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="115" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">sp²</text>
            <text x="355" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 2p → 3 sp²</text>
            <circle cx="355" cy="180" r="8" fill="#ef4444"/>
            <line x1="355" y1="180" x2="310" y2="235" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="310" cy="235" r="6" fill="#22c55e"/>
            <line x1="355" y1="180" x2="400" y2="235" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="400" cy="235" r="6" fill="#22c55e"/>
            <line x1="355" y1="180" x2="355" y2="260" stroke="#f59e0b" strokeWidth="3"/>
            <circle cx="355" cy="260" r="6" fill="#f59e0b"/>
            <text x="355" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">120°</text>
            <text x="355" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">C₂H₄, BF₃</text>
            <rect x="460" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="115" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">sp</text>
            <text x="545" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 1p → 2 sp</text>
            <circle cx="545" cy="180" r="8" fill="#ef4444"/>
            <line x1="545" y1="180" x2="490" y2="230" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="490" cy="230" r="6" fill="#22c55e"/>
            <line x1="545" y1="180" x2="600" y2="230" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="600" cy="230" r="6" fill="#22c55e"/>
            <text x="545" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">180°</text>
            <text x="545" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">C₂H₂, BeCl₂</text>
            <rect x="80" y="310" width="560" height="130" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="360" y="340" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Hybridization Summary</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">sp³: 4 hybrid orbitals, tetrahedral, single bonds (σ)</text>
            <text x="100" y="395" fill="#e2e8f0" fontSize="11">sp²: 3 hybrid orbitals, trigonal planar, one double bond (1σ + 1π)</text>
            <text x="100" y="420" fill="#e2e8f0" fontSize="11">sp: 2 hybrid orbitals, linear, two double bonds or one triple (2σ + 2π)</text>
            <text x="360" y="445" textAnchor="middle" fill="#94a3b8" fontSize="10">Unhybridized p orbitals form π bonds in multiple bonds</text>
          </svg>
        );
      case "molecular-orbital-theory":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ec4899" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ec4899" fontSize="16" fontWeight="bold">Molecular Orbital Theory - O₂ Example</text>
            <rect x="80" y="100" width="140" height="300" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="150" y="130" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">O Atom</text>
            <line x1="100" y1="160" x2="200" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="210" y="165" fill="#94a3b8" fontSize="10">1s²</text>
            <line x1="100" y1="190" x2="200" y2="190" stroke="#475569" strokeWidth="2"/>
            <text x="210" y="195" fill="#94a3b8" fontSize="10">2s²</text>
            <line x1="100" y1="220" x2="200" y2="220" stroke="#22c55e" strokeWidth="2"/>
            <text x="210" y="225" fill="#22c55e" fontSize="10">2p⁴</text>
            <rect x="480" y="100" width="140" height="300" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="550" y="130" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">O Atom</text>
            <line x1="500" y1="160" x2="600" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="490" y="165" fill="#94a3b8" fontSize="10">1s²</text>
            <line x1="500" y1="190" x2="600" y2="190" stroke="#475569" strokeWidth="2"/>
            <text x="490" y="195" fill="#94a3b8" fontSize="10">2s²</text>
            <line x1="500" y1="220" x2="600" y2="220" stroke="#22c55e" strokeWidth="2"/>
            <text x="490" y="225" fill="#22c55e" fontSize="10">2p⁴</text>
            <line x1="220" y1="200" x2="330" y2="200" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="480" y1="200" x2="370" y2="200" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="250" y="100" width="200" height="300" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="350" y="130" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">O₂ M.O.</text>
            <line x1="270" y1="160" x2="310" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="320" y="165" fill="#94a3b8" fontSize="9">σ2s</text>
            <line x1="390" y1="160" x2="430" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="440" y="165" fill="#94a3b8" fontSize="9">σ*2s</text>
            <line x1="270" y1="200" x2="310" y2="200" stroke="#22c55e" strokeWidth="2"/>
            <text x="320" y="205" fill="#22c55e" fontSize="9">σ2p</text>
            <line x1="270" y1="240" x2="310" y2="240" stroke="#f59e0b" strokeWidth="2"/>
            <text x="320" y="245" fill="#f59e0b" fontSize="9">π2p</text>
            <line x1="390" y1="240" x2="430" y2="240" stroke="#f59e0b" strokeWidth="2"/>
            <text x="440" y="245" fill="#f59e0b" fontSize="9">π*2p</text>
            <line x1="390" y1="200" x2="430" y2="200" stroke="#ef4444" strokeWidth="2"/>
            <text x="440" y="205" fill="#ef4444" fontSize="9">σ*2p</text>
            <rect x="80" y="420" width="540" height="30" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="440" textAnchor="middle" fill="#06b6d4" fontSize="12">Bond Order = (Bonding e⁻ - Antibonding e⁻)/2 = (8-4)/2 = 2 (Double bond)</text>
          </svg>
        );
      case "mole-concept":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">The Mole Concept</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Avogadro's Number</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="20">N₀ = 6.022 × 10²³</text>
            <text x="210" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">particles per mole</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Molar Mass</text>
            <text x="500" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="16">M = mass/moles</text>
            <text x="500" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">g/mol (numerically equal to atomic mass)</text>
            <rect x="80" y="210" width="260" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Ideal Gas at STP</text>
            <text x="210" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="16">V = 22.4 L/mol</text>
            <text x="210" y="295" textAnchor="middle" fill="#94a3b8" fontSize="10">0°C, 1 atm</text>
            <rect x="370" y="210" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Key Formulas</text>
            <text x="380" y="270" fill="#e2e8f0" fontSize="11">n = m/M = N/N₀ = V/V₀</text>
            <text x="380" y="290" fill="#94a3b8" fontSize="10">moles = mass/molar mass</text>
            <text x="500" y="310" textAnchor="middle" fill="#94a3b8" fontSize="10">or particles/Avogadro's #</text>
            <rect x="80" y="330" width="550" height="110" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="355" y="360" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Common Examples</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">· 1 mol H₂O = 18 g = 6.022×10²³ molecules</text>
            <text x="100" y="415" fill="#e2e8f0" fontSize="11">· 1 mol C = 12 g = 6.022×10²³ atoms</text>
            <text x="380" y="390" fill="#e2e8f0" fontSize="11">· 1 mol O₂ = 32 g = 6.022×10²³ molecules</text>
            <text x="380" y="415" fill="#e2e8f0" fontSize="11">· 1 mol gas at STP = 22.4 L</text>
          </svg>
        );
      case "periodic-trends":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Periodic Trends</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Across a Period (← →)</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Atomic Radius: DECREASES</text>
            <text x="100" y="175" fill="#94a3b8" fontSize="10">More protons pull e⁻ closer</text>
            <text x="100" y="205" fill="#e2e8f0" fontSize="11">Ionization Energy: INCREASES</text>
            <text x="100" y="225" fill="#94a3b8" fontSize="10">Harder to remove e⁻ from small atom</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Electronegativity: INCREASES</text>
            <text x="100" y="275" fill="#94a3b8" fontSize="10">F is most electronegative (4.0)</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="120" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Down a Group (↑ ↓)</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Atomic Radius: INCREASES</text>
            <text x="390" y="175" fill="#94a3b8" fontSize="10">More electron shells added</text>
            <text x="390" y="205" fill="#e2e8f0" fontSize="11">Ionization Energy: DECREASES</text>
            <text x="390" y="225" fill="#94a3b8" fontSize="10">Outer e⁻ farther from nucleus</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">Electronegativity: DECREASES</text>
            <text x="390" y="275" fill="#94a3b8" fontSize="10">Less attraction for bonding e⁻</text>
            <rect x="80" y="290" width="540" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="320" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Important Concepts</text>
            <text x="100" y="355" fill="#e2e8f0" fontSize="11">Metallic Character: Increases down &amp; left (opposite of EN)</text>
            <text x="100" y="380" fill="#e2e8f0" fontSize="11">Cation Size {'<'} Parent Atom {'<'} Anion Size (for same element)</text>
            <text x="100" y="405" fill="#e2e8f0" fontSize="11">Noble gases have highest IE in their period</text>
            <text x="350" y="430" textAnchor="middle" fill="#94a3b8" fontSize="10">Reason: Nuclear charge vs shielding effect balance</text>
          </svg>
        );
      case "redox-reactions":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Redox Reactions</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">MNEMONIC</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="16">OIL RIG</text>
            <text x="210" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Oxidation Is Loss (of e⁻)</text>
            <text x="210" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Reduction Is Gain (of e⁻)</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">HALF REACTIONS</text>
            <text x="390" y="155" fill="#ef4444" fontSize="12">Oxidation: Zn → Zn²⁺ + 2e⁻</text>
            <text x="390" y="180" fill="#22c55e" fontSize="12">Reduction: Cu²⁺ + 2e⁻ → Cu</text>
            <text x="500" y="205" textAnchor="middle" fill="#94a3b8" fontSize="10">Electrons cancel in overall</text>
            <rect x="80" y="230" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="260" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">AGENTS</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">Oxidizing Agent: Gets REDUCED</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">(Causes oxidation, accepts e⁻)</text>
            <text x="100" y="340" fill="#e2e8f0" fontSize="11">Reducing Agent: Gets OXIDIZED</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">(Causes reduction, donates e⁻)</text>
            <rect x="370" y="230" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">EXAMPLE</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="12">Zn + CuSO₄ → ZnSO₄ + Cu</text>
            <text x="390" y="320" fill="#ef4444" fontSize="10">Zn: 0 → +2 (oxidized, reducing agent)</text>
            <text x="390" y="340" fill="#22c55e" fontSize="10">Cu: +2 → 0 (reduced, oxidizing agent)</text>
            <text x="500" y="365" textAnchor="middle" fill="#94a3b8" fontSize="10">Electrons flow from Zn to Cu²⁺</text>
          </svg>
        );
      case "le-chateliers-principle":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Le Chatelier's Principle</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">If a system at equilibrium is disturbed, it shifts to counteract the disturbance</text>
            <rect x="80" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="200" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Concentration</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="10">Add reactant → shift RIGHT</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="10">Add product → shift LEFT</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="10">Remove substance →</text>
            <text x="100" y="290" fill="#94a3b8" fontSize="10">fill the gap</text>
            <rect x="270" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="355" y="200" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Pressure (gas)</text>
            <text x="290" y="235" fill="#e2e8f0" fontSize="10">Increase P → fewer moles</text>
            <text x="290" y="255" fill="#e2e8f0" fontSize="10">Decrease P → more moles</text>
            <text x="290" y="275" fill="#94a3b8" fontSize="10">Only affects gaseous</text>
            <text x="290" y="290" fill="#94a3b8" fontSize="10">species</text>
            <rect x="460" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="200" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Temperature</text>
            <text x="480" y="235" fill="#e2e8f0" fontSize="10">Exothermic: ↑T → shift LEFT</text>
            <text x="480" y="255" fill="#e2e8f0" fontSize="10">Endothermic: ↑T → shift RIGHT</text>
            <text x="480" y="275" fill="#94a3b8" fontSize="10">Treat heat as reactant/product</text>
            <rect x="80" y="310" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="345" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Catalyst: Does NOT shift equilibrium</text>
            <text x="350" y="370" textAnchor="middle" fill="#94a3b8" fontSize="12">Both forward and reverse rates increase equally</text>
            <rect x="80" y="400" width="540" height="30" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="11">Haber Process: N₂ + 3H₂ ⇌ 2NH₃ + heat → High P, low T favor NH₃</text>
          </svg>
        );
      case "alkanes":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Alkanes - Saturated Hydrocarbons</text>
            <rect x="80" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">General Formula</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="18">CₙH₂ₙ₊₂</text>
            <rect x="370" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="145" fill="#e2e8f0" fontSize="11">· Nonpolar, hydrophobic</text>
            <text x="390" y="165" fill="#e2e8f0" fontSize="11">· Low reactivity (except combustion)</text>
            <text x="500" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Single C-C and C-H bonds (sp³)</text>
            <rect x="80" y="190" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="220" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Homologous Series</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Methane CH₄ → Ethane C₂H₆ → Propane C₃H₈ → Butane C₄H₁₀</text>
            <text x="100" y="275" fill="#94a3b8" fontSize="10">BP increases with molecular weight</text>
            <rect x="80" y="310" width="260" height="110" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="210" y="340" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Combustion</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + heat</text>
            <text x="100" y="390" fill="#94a3b8" fontSize="10">Exothermic, used as fuel</text>
            <rect x="370" y="310" width="260" height="110" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="340" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Halogenation</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">CH₄ + Cl₂ → CH₃Cl + HCl (UV)</text>
            <text x="390" y="390" fill="#94a3b8" fontSize="10">Free radical substitution</text>
          </svg>
        );
      case "alkenes":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Alkenes - Unsaturated Hydrocarbons</text>
            <rect x="80" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">General Formula</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="18">CₙH₂ₙ</text>
            <rect x="370" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Structure</text>
            <text x="390" y="145" fill="#e2e8f0" fontSize="11">C=C double bond (1σ + 1π)</text>
            <text x="390" y="165" fill="#e2e8f0" fontSize="11">sp² hybridized, trigonal planar</text>
            <text x="500" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">π bond is reactive site</text>
            <rect x="80" y="190" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Geometric Isomerism</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Cis: similar groups on same side</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">Trans: similar groups on opposite sides</text>
            <text x="100" y="300" fill="#94a3b8" fontSize="10">Requires: 2 different groups on EACH C</text>
            <rect x="370" y="190" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="220" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Addition Reactions</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">H₂/Pt → Alkane (hydrogenation)</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">X₂ → Dihaloalkane (halogenation)</text>
            <text x="390" y="295" fill="#e2e8f0" fontSize="11">HX → Haloalkane (hydrohalogenation)</text>
            <text x="390" y="315" fill="#94a3b8" fontSize="10">Markovnikov: H adds to C with more H</text>
            <rect x="80" y="330" width="540" height="110" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="360" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Polymerization</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">n(CH₂=CH₂) → -(CH₂-CH₂)n- (polyethylene)</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">n(CH₂=CHCl) → -(CH₂-CHCl)n- (PVC)</text>
            <text x="100" y="430" fill="#94a3b8" fontSize="10">π bond breaks, forms new σ bonds</text>
          </svg>
        );
      case "benzene-aromatic":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Benzene - Aromatic Compound</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Structure</text>
            <polygon points="210,140 252,164 252,212 210,236 168,212 168,164" fill="none" stroke="#f59e0b" strokeWidth="3"/>
            <circle cx="210" cy="188" r="28" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2"/>
            <text x="210" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">C₆H₆ - all C-C bonds equal (1.39 Å)</text>
            <text x="210" y="285" textAnchor="middle" fill="#64748b" fontSize="9">Delocalized π electrons</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Kekulé Structures</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Two equivalent resonance forms:</text>
            <text x="390" y="180" fill="#ef4444" fontSize="11">Form I:  C=C-C=C-C=C</text>
            <text x="390" y="200" fill="#3b82f6" fontSize="11">Form II: C-C=C-C=C-C</text>
            <text x="390" y="230" fill="#94a3b8" fontSize="10">Actual structure is hybrid</text>
            <text x="390" y="250" fill="#94a3b8" fontSize="10">of both forms</text>
            <rect x="80" y="290" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="320" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Properties</text>
            <text x="100" y="350" fill="#e2e8f0" fontSize="11">· Planar hexagonal ring</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">· sp² hybridized carbons</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">· 120° bond angles</text>
            <text x="100" y="410" fill="#94a3b8" fontSize="10">· Exceptionally stable (resonance)</text>
            <rect x="370" y="290" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="320" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Hückel's Rule</text>
            <text x="390" y="350" fill="#e2e8f0" fontSize="11">· Cyclic structure</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">· Planar (all sp²)</text>
            <text x="390" y="390" fill="#e2e8f0" fontSize="11">· Fully conjugated</text>
            <text x="390" y="410" fill="#22c55e" fontSize="11">· 4n+2 π electrons</text>
            <rect x="80" y="420" width="540" height="60" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="455" textAnchor="middle" fill="#ef4444" fontSize="13">Electrophilic Substitution - preserves aromaticity</text>
          </svg>
        );
      case "isomerism":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Isomerism in Organic Compounds</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">Isomers: Same molecular formula, different structural arrangement</text>
            <rect x="80" y="170" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="200" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Structural Isomers</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">Chain: Different carbon skeleton</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Position: Different position of group</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">Functional: Different functional group</text>
            <text x="100" y="305" fill="#94a3b8" fontSize="10">Example: C₄H₁₀</text>
            <text x="100" y="320" fill="#94a3b8" fontSize="10">n-butane vs isobutane</text>
            <rect x="370" y="170" width="260" height="160" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="200" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Stereoisomers</text>
            <text x="390" y="235" fill="#e2e8f0" fontSize="11">Geometric: Cis-trans</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">Optical: Enantiomers</text>
            <text x="390" y="285" fill="#94a3b8" fontSize="10">Same connectivity,</text>
            <text x="390" y="300" fill="#94a3b8" fontSize="10">different spatial arrangement</text>
            <rect x="80" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="380" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Chain Isomerism</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">C₅H₁₂: pentane, isopentane,</text>
            <text x="100" y="430" fill="#e2e8f0" fontSize="11">neopentane (3 isomers)</text>
            <rect x="370" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="380" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Position Isomerism</text>
            <text x="390" y="410" fill="#e2e8f0" fontSize="11">C₃H₇OH: 1-propanol vs</text>
            <text x="390" y="430" fill="#e2e8f0" fontSize="11">2-propanol (different OH pos.)</text>
          </svg>
        );
      case "empirical-molecular-formula":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Empirical & Molecular Formulas</text>
            <rect x="80" y="90" width="260" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Empirical Formula</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Simplest whole-number ratio</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">of atoms in compound</text>
            <text x="100" y="205" fill="#94a3b8" fontSize="10">Example: Glucose</text>
            <text x="100" y="225" fill="#94a3b8" fontSize="10">Empirical: CH₂O</text>
            <rect x="370" y="90" width="260" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Molecular Formula</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Actual number of atoms</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">in one molecule</text>
            <text x="390" y="205" fill="#94a3b8" fontSize="10">Example: Glucose</text>
            <text x="390" y="225" fill="#94a3b8" fontSize="10">Molecular: C₆H₁₂O₆</text>
            <rect x="80" y="250" width="540" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="280" textAnchor="middle" fill="#f59e0b" fontSize="14">Molecular Formula = n × Empirical Formula</text>
            <text x="350" y="310" textAnchor="middle" fill="#94a3b8" fontSize="12">where n = Molar Mass / Empirical Formula Mass</text>
            <rect x="80" y="350" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="380" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Worked Example</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">Compound: 40% C, 6.7% H, 53.3% O; Molar mass = 180 g/mol</text>
            <text x="100" y="430" fill="#22c55e" fontSize="11">Empirical: CH₂O (mass 30) → n = 6 → C₆H₁₂O₆</text>
          </svg>
        );
      case "chemical-equilibrium":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Chemical Equilibrium</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Dynamic Equilibrium</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Forward rate = Reverse rate</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">Concentrations constant (not equal!)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">Closed system, constant T</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Equilibrium Constant</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="12">K = [Products]/[Reactants]</text>
            <text x="390" y="180" fill="#94a3b8" fontSize="10">{"K < 1: products favored"}</text>
            <text x="390" y="195" fill="#94a3b8" fontSize="10">{"K > 1: reactants favored"}</text>
            <rect x="80" y="230" width="540" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="350" y="260" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Le Chatelier's Principle Effects</text>
            <text x="100" y="295" fill="#e2e8f0" fontSize="11">· Increase [reactant] → shift right</text>
            <text x="100" y="315" fill="#e2e8f0" fontSize="11">· Increase pressure (gas) → shift to fewer moles</text>
            <text x="100" y="335" fill="#e2e8f0" fontSize="11">· Increase temperature → shift endothermic direction</text>
            <rect x="80" y="370" width="540" height="60" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="405" textAnchor="middle" fill="#ef4444" fontSize="14">Kp = Kc(RT)^Δn where Δn = moles gas products - moles gas reactants</text>
          </svg>
        );
      case "law-of-mass-action":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Law of Mass Action</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Rate of reaction ∝ Product of active masses of reactants</text>
            <rect x="80" y="190" width="540" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">For aA + bB ⇌ cC + dD</text>
            <text x="350" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="16">K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</text>
            <text x="350" y="275" textAnchor="middle" fill="#94a3b8" fontSize="10">At equilibrium, K is constant at given temperature</text>
            <rect x="80" y="310" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="340" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Key Points</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">· K depends only on temperature</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">· Large K (greater than 1): products favored</text>
            <rect x="370" y="310" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="340" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Applications</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">· Predict direction of reaction</text>
            <text x="390" y="390" fill="#e2e8f0" fontSize="11">· Calculate equilibrium concentrations</text>
          </svg>
        );
      case "hydrogen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Hydrogen - The First Element</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Position in Periodic Table</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">· Group 1 (alkali metals) - 1 valence e⁻</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">· Also resembles Group 17 (halogens)</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Isotopes</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">· Protium (¹H): 1p, 0n - 99.98%</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">· Deuterium (²H/D): 1p, 1n</text>
            <rect x="80" y="210" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Lab Preparation</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">Zn + H₂SO₄ → ZnSO₄ + H₂</text>
            <text x="100" y="290" fill="#94a3b8" fontSize="10">Metal + acid method</text>
            <rect x="370" y="210" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Industrial</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">Steam reforming: CH₄ + H₂O → CO + 3H₂</text>
            <text x="390" y="290" fill="#94a3b8" fontSize="10">Primary source of industrial H₂</text>
            <rect x="80" y="350" width="540" height="90" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="380" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Uses</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">· Haber process (NH₃) · Rocket fuel · Hydrogenation · Fuel cells</text>
          </svg>
        );
      case "oxygen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Oxygen - Essential Element</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Occurrence</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">· 21% of atmosphere (most abundant gas)</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">· 46% of Earth's crust (by mass)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">· Found in water, minerals, organic compounds</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Allotropes</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">· O₂ (dioxygen): colorless gas, paramagnetic</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">· O₃ (ozone): pale blue gas, bent structure</text>
            <text x="390" y="195" fill="#94a3b8" fontSize="10">O₃ is 1000× more soluble in water</text>
            <rect x="80" y="230" width="260" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Lab Preparation</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">2H₂O₂ → 2H₂O + O₂ (MnO₂ catalyst)</text>
            <text x="100" y="315" fill="#e2e8f0" fontSize="11">2KClO₃ → 2KCl + 3O₂ (heat)</text>
            <text x="100" y="340" fill="#94a3b8" fontSize="10">Collected by downward displacement of water</text>
            <rect x="370" y="230" width="260" height="140" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="260" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">· Supports combustion (burning)</text>
            <text x="390" y="315" fill="#e2e8f0" fontSize="11">· Oxidizing agent in reactions</text>
            <text x="390" y="340" fill="#94a3b8" fontSize="10">Essential for respiration</text>
            <rect x="80" y="390" width="540" height="50" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="12">Medical oxygen · Steel production · Rocket oxidizer · Water treatment · Welding</text>
          </svg>
        );
      case "nitrogen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Nitrogen - Inert Gas</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Occurrence</text>
            <text x="100" y="150" fill="#e2e8f0" fontSize="11">· 78% of atmosphere (N₂ gas)</text>
            <text x="100" y="170" fill="#e2e8f0" fontSize="11">· Found in proteins, DNA, fertilizers</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Inertness of N₂</text>
            <text x="390" y="150" fill="#e2e8f0" fontSize="11">· Triple bond N≡N: very strong (941 kJ/mol)</text>
            <text x="390" y="170" fill="#e2e8f0" fontSize="11">· Requires high T or catalyst to react</text>
            <rect x="80" y="210" width="260" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Ammonia (NH₃)</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">Haber process: N₂ + 3H₂ ⇌ 2NH₃</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">Conditions: 450°C, 200 atm, Fe catalyst</text>
            <text x="100" y="330" fill="#94a3b8" fontSize="10">Used in fertilizers, explosives, cleaning</text>
            <rect x="370" y="210" width="260" height="140" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Nitrogen Oxides</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">NO: colorless gas, from lightning/cars</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">NO₂: brown gas, air pollutant</text>
            <text x="390" y="330" fill="#94a3b8" fontSize="10">Contribute to acid rain and smog</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="400" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">HNO₃ (Nitric Acid)</text>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="12">Strong acid, oxidizing agent, used in fertilizers and explosives</text>
          </svg>
        );
      case "halogens":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ec4899" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ec4899" fontSize="16" fontWeight="bold">Halogens - Group 17 Elements</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="350" y="120" textAnchor="middle" fill="#ec4899" fontSize="14" fontWeight="bold">F₂  Cl₂  Br₂  I₂  At</text>
            <text x="350" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">Color: Pale yellow → Green → Red-brown → Violet</text>
            <rect x="80" y="190" width="260" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Periodic Trends</text>
            <text x="100" y="250" fill="#e2e8f0" fontSize="11">· Reactivity decreases down group</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">· Electronegativity decreases</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">· Melting/boiling points increase</text>
            <rect x="370" y="190" width="260" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="220" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="250" fill="#e2e8f0" fontSize="11">· Strong oxidizing agents</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">· Form -1 ions (halides)</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">· Displacement reactions occur</text>
            <rect x="80" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="380" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Chlorine (Cl₂)</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">Yellow-green gas, toxic</text>
            <text x="100" y="430" fill="#94a3b8" fontSize="10">Water purification, PVC production</text>
            <rect x="370" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="380" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Fluorine (F₂)</text>
            <text x="390" y="410" fill="#e2e8f0" fontSize="11">Most reactive nonmetal</text>
            <text x="390" y="430" fill="#94a3b8" fontSize="10">Teflon, refrigerants, uranium enrichment</text>
          </svg>
        );
      case "sodium-compounds":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Sodium Compounds (Solvay Process)</text>
            <rect x="80" y="90" width="540" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Solvay Process - Na₂CO₃ Production</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">1. NH₃ + CO₂ + H₂O → NH₄HCO₃</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">2. NaCl + NH₄HCO₃ → NaHCO₃↓ + NH₄Cl</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">3. 2NaHCO₃ → Na₂CO₃ + CO₂ + H₂O (heat)</text>
            <text x="350" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">NaHCO₃ precipitates due to low solubility</text>
            <rect x="80" y="250" width="260" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="280" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">NaOH (Soda Lye)</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">· Strong base, deliquescent</text>
            <text x="100" y="330" fill="#e2e8f0" fontSize="11">· Used in soap, paper, textiles</text>
            <rect x="370" y="250" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="280" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Na₂CO₃ (Soda Ash)</text>
            <text x="390" y="310" fill="#e2e8f0" fontSize="11">· Washing soda, glass making</text>
            <text x="390" y="330" fill="#e2e8f0" fontSize="11">· Water softening agent</text>
            <rect x="80" y="390" width="540" height="50" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="420" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">NaHCO₃ (Baking Soda): antacid, fire extinguisher, baking powder</text>
          </svg>
        );
      case "lattice-energy":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Lattice Energy</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Energy released when gaseous ions form 1 mole of ionic solid</text>
            <rect x="80" y="190" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Factors Affecting</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">· Ionic charge: U ∝ |Q₁Q₂|</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">· Ionic radius: U ∝ 1/(r₊ + r₋)</text>
            <text x="100" y="305" fill="#94a3b8" fontSize="10">Higher charge → stronger attraction</text>
            <text x="100" y="325" fill="#94a3b8" fontSize="10">Smaller ions → closer packing</text>
            <rect x="370" y="190" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="220" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Examples</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">NaCl: -788 kJ/mol</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">MgO: -3795 kJ/mol</text>
            <text x="390" y="305" fill="#94a3b8" fontSize="10">MgO has 2+ and 2- charges</text>
            <text x="390" y="325" fill="#94a3b8" fontSize="10">vs NaCl with 1+ and 1-</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="400" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Predicts Solubility & Stability</text>
            <text x="350" y="420" textAnchor="middle" fill="#94a3b8" fontSize="11">High lattice energy → insoluble salts · Determines melting point</text>
          </svg>
        );
      case "chemical-industry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Major Chemical Industries</text>
            <rect x="80" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Haber Process</text>
            <text x="100" y="150" fill="#e2e8f0" fontSize="10">N₂ + 3H₂ ⇌ 2NH₃</text>
            <text x="100" y="170" fill="#e2e8f0" fontSize="10">450°C, 200 atm</text>
            <text x="100" y="190" fill="#94a3b8" fontSize="9">Fe catalyst</text>
            <text x="100" y="210" fill="#94a3b8" fontSize="9">Fertilizers, explosives</text>
            <rect x="270" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Contact Process</text>
            <text x="290" y="150" fill="#e2e8f0" fontSize="10">SO₂ + ½O₂ ⇌ SO₃</text>
            <text x="290" y="170" fill="#e2e8f0" fontSize="10">450°C, 1-2 atm</text>
            <text x="290" y="190" fill="#94a3b8" fontSize="9">V₂O₅ catalyst</text>
            <text x="290" y="210" fill="#94a3b8" fontSize="9">H₂SO₄ production</text>
            <rect x="460" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Solvay Process</text>
            <text x="480" y="150" fill="#e2e8f0" fontSize="10">NaCl + NH₃ + CO₂</text>
            <text x="480" y="170" fill="#e2e8f0" fontSize="10">→ NaHCO₃ → Na₂CO₃</text>
            <text x="480" y="195" fill="#94a3b8" fontSize="9">Room temperature</text>
            <text x="480" y="215" fill="#94a3b8" fontSize="9">Washing soda, glass</text>
            <rect x="80" y="250" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="280" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Other Major Industries</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">· Chlor-alkali: NaCl → Cl₂ + NaOH + H₂</text>
            <text x="100" y="330" fill="#e2e8f0" fontSize="11">· Ostwald: NH₃ → HNO₃ (oxidation)</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="400" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Environmental Concerns</text>
            <text x="350" y="420" textAnchor="middle" fill="#94a3b8" fontSize="11">Acid rain (SO₂, NOₓ) · Greenhouse gases · Wastewater treatment</text>
          </svg>
        );
      case "balancing-equations":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Balancing Chemical Equations</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">Law of Conservation of Mass: atoms neither created nor destroyed</text>
            <rect x="80" y="170" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="200" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Steps to Balance</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">1. Write unbalanced equation</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">2. Count atoms on each side</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">3. Add coefficients (never subscripts!)</text>
            <text x="100" y="295" fill="#e2e8f0" fontSize="11">4. Check all atoms balance</text>
            <rect x="370" y="170" width="260" height="180" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="200" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Tips</text>
            <text x="390" y="235" fill="#e2e8f0" fontSize="11">· Start with most complex compound</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">· Leave O and H for last</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">· Use smallest whole numbers</text>
            <text x="390" y="295" fill="#94a3b8" fontSize="10">· Check charge balance for ionic</text>
            <rect x="80" y="370" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="400" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Example: Fe + O₂ → Fe₂O₃</text>
            <text x="350" y="425" textAnchor="middle" fill="#e2e8f0" fontSize="12">4Fe + 3O₂ → 2Fe₂O₃ (balanced)</text>
          </svg>
        );
      case "electrolysis":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Electrolysis</text>
            <rect x="80" y="90" width="540" height="70" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Decomposition of electrolyte by electric current</text>
            <rect x="80" y="180" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="210" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Electrolytic Cell</text>
            <text x="100" y="245" fill="#e2e8f0" fontSize="11">Anode (+): Oxidation occurs</text>
            <text x="100" y="265" fill="#e2e8f0" fontSize="11">Cathode (-): Reduction occurs</text>
            <text x="100" y="285" fill="#e2e8f0" fontSize="11">Electrons flow: power supply → cathode</text>
            <text x="100" y="315" fill="#94a3b8" fontSize="10">Ions move through electrolyte</text>
            <rect x="370" y="180" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="210" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Faraday's Laws</text>
            <text x="390" y="245" fill="#e2e8f0" fontSize="11">1st: mass ∝ charge (Q = It)</text>
            <text x="390" y="265" fill="#e2e8f0" fontSize="11">2nd: mass ∝ equivalent mass</text>
            <text x="390" y="295" fill="#94a3b8" fontSize="10">1 Faraday = 96500 C/mol e⁻</text>
            <rect x="80" y="360" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="390" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Applications</text>
            <text x="100" y="420" fill="#e2e8f0" fontSize="11">Electroplating · Metal extraction (Al, Na) · Purification · Chlor-alkali industry</text>
          </svg>
        );
      case "gas-laws":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Gas Laws</text>
            <rect x="80" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Boyle's Law</text>
            <text x="165" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">P₁V₁ = P₂V₂</text>
            <text x="165" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">T constant</text>
            <rect x="270" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="355" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Charles's Law</text>
            <text x="355" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">V₁/T₁ = V₂/T₂</text>
            <text x="355" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">P constant</text>
            <rect x="460" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="120" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Gay-Lussac's</text>
            <text x="545" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">P₁/T₁ = P₂/T₂</text>
            <text x="545" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">V constant</text>
            <rect x="80" y="200" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="235" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Combined Gas Law</text>
            <text x="350" y="265" textAnchor="middle" fill="#e2e8f0" fontSize="14">PV/T = constant  OR  P₁V₁/T₁ = P₂V₂/T₂</text>
            <rect x="80" y="300" width="540" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="335" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Ideal Gas Equation</text>
            <text x="350" y="370" textAnchor="middle" fill="#e2e8f0" fontSize="18">PV = nRT</text>
            <text x="350" y="390" textAnchor="middle" fill="#94a3b8" fontSize="10">R = 0.0821 L·atm/(mol·K)  or  8.314 J/(mol·K)</text>
            <rect x="80" y="400" width="540" height="40" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="425" textAnchor="middle" fill="#e2e8f0" fontSize="11">Assumptions: negligible volume, no intermolecular forces, elastic collisions</text>
          </svg>
        );
      case "kinetic-theory-gases":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Kinetic Theory of Gases</text>
            <rect x="80" y="90" width="260" height="200" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Postulates</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">1. Gas consists of tiny particles</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">2. Particles in constant random motion</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">3. Collisions are perfectly elastic</text>
            <text x="100" y="215" fill="#e2e8f0" fontSize="11">4. No intermolecular forces</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">5. KE ∝ absolute temperature</text>
            <rect x="370" y="90" width="260" height="200" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Key Equations</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="12">KE_avg = 3/2 kT</text>
            <text x="390" y="180" fill="#94a3b8" fontSize="10">k = Boltzmann constant</text>
            <text x="390" y="210" fill="#e2e8f0" fontSize="12">v_rms = sqrt(3RT/M)</text>
            <text x="390" y="235" fill="#94a3b8" fontSize="10">Root mean square speed</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="12">PV = 1/3 Nm(v_rms)²</text>
            <rect x="80" y="310" width="540" height="130" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="340" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Real Gas Deviation</text>
            <text x="100" y="375" fill="#e2e8f0" fontSize="11">Van der Waals equation: (P+a/V²)(V-b) = RT</text>
            <text x="100" y="400" fill="#94a3b8" fontSize="10">a = attraction correction, b = volume correction</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">Deviation at high P, low T (intermolecular forces matter)</text>
          </svg>
        );
      case "crystal-lattices":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Solid State - Crystal Lattices</text>
            <rect x="80" y="90" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Types of Solids</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">· Ionic: NaCl, MgO (hard, brittle)</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">· Molecular: ice, dry ice (soft)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">· Covalent: diamond, SiO₂ (very hard)</text>
            <text x="100" y="215" fill="#e2e8f0" fontSize="11">· Metallic: Fe, Cu (malleable)</text>
            <rect x="370" y="90" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Unit Cells</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">· Simple cubic (SC): 1 atom/cell</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">· Body-centered (BCC): 2 atoms/cell</text>
            <text x="390" y="195" fill="#e2e8f0" fontSize="11">· Face-centered (FCC): 4 atoms/cell</text>
            <text x="390" y="215" fill="#94a3b8" fontSize="10">Packing efficiency: SC 52%, BCC 68%, FCC 74%</text>
            <rect x="80" y="270" width="540" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="350" y="300" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Crystal Defects</text>
            <text x="100" y="335" fill="#e2e8f0" fontSize="11">Point defects: vacancy (missing atom), interstitial (extra atom)</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">Impurity defects: substitutional or interstitial impurities</text>
          </svg>
        );
      case "basic-concepts-chemistry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Basic Concepts of Chemistry</text>
            <rect x="80" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="165" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Atom</text>
            <text x="165" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Smallest particle</text>
            <text x="165" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of an element</text>
            <rect x="270" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="355" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Molecule</text>
            <text x="355" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Smallest particle</text>
            <text x="355" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of a compound</text>
            <rect x="460" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Formula</text>
            <text x="545" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Symbolic representation</text>
            <text x="545" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of composition</text>
            <rect x="80" y="210" width="540" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Fundamental Laws</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">· Conservation of Mass: mass neither created nor destroyed</text>
            <text x="100" y="300" fill="#e2e8f0" fontSize="11">· Definite Proportions: compound always has same elements ratio</text>
            <text x="350" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="11">· Multiple Proportions: different compounds show simple ratios</text>
            <text x="350" y="300" textAnchor="middle" fill="#94a3b8" fontSize="10">e.g., CO and CO₂ → oxygen ratio 1:2</text>
            <rect x="80" y="350" width="540" height="90" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="380" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Atomic Mass Unit (amu)</text>
            <text x="350" y="410" textAnchor="middle" fill="#e2e8f0" fontSize="12">1 amu = 1/12 mass of ¹²C atom = 1.6605 × 10⁻²⁴ g</text>
          </svg>
        );
      case "chemistry-intro":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Introduction to Chemistry</text>
            <rect x="80" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Organic</text>
            <text x="165" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Carbon compounds</text>
            <rect x="270" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Inorganic</text>
            <text x="355" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Non-carbon compounds</text>
            <rect x="460" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Physical</text>
            <text x="545" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Energy & kinetics</text>
            <rect x="80" y="210" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="250" textAnchor="middle" fill="#e2e8f0" fontSize="14">Chemistry: Study of matter, its properties, composition, and transformations</text>
            <rect x="80" y="310" width="540" height="130" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="340" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Importance in Daily Life</text>
            <text x="100" y="375" fill="#e2e8f0" fontSize="11">· Food preservation, medicines, fuels, plastics, fertilizers</text>
            <text x="100" y="400" fill="#e2e8f0" fontSize="11">· Understanding digestion, respiration, photosynthesis</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">· Environmental chemistry, pollution control</text>
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

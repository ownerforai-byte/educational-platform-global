"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, ChevronDown, ChevronUp } from "lucide-react";

const TOPICS = [
  {
    title: "Kinematics",
    problems: [
      {
        q: "A car accelerates from rest at 2 m/s² for 10 s. Find final velocity and distance.",
        steps: ["u = 0, a = 2 m/s², t = 10 s", "v = u + at = 0 + 2×10 = 20 m/s", "s = ut + ½at² = 0 + ½×2×100"],
        answer: "v = 20 m/s, s = 100 m",
      },
      {
        q: "A ball is thrown upward at 30 m/s. Find max height and time to reach it.",
        steps: ["u = 30 m/s, v = 0 at max height, g = 10 m/s²", "v² = u² - 2gh → 0 = 900 - 20h", "t = u/g = 30/10"],
        answer: "h = 45 m, t = 3 s",
      },
      {
        q: "A projectile is launched at 40 m/s at 30°. Find range and max height.",
        steps: ["R = u²sin(2θ)/g = 1600×sin(60°)/10", "H = u²sin²θ/(2g) = 1600×0.25/20"],
        answer: "R ≈ 69.3 m, H = 20 m",
      },
    ],
  },
  {
    title: "Laws of Motion & Work-Energy",
    problems: [
      {
        q: "A 5 kg block slides down a 30° incline with μ = 0.2. Find acceleration.",
        steps: ["a = g(sinθ - μcosθ)", "a = 10(0.5 - 0.2×0.866)"],
        answer: "a ≈ 3.27 m/s²",
      },
      {
        q: "A 2 kg object moving at 10 m/s stops in 5 m. Find stopping force.",
        steps: ["v² = u² + 2as → 0 = 100 + 20s → a = -10 m/s²", "F = ma = 2×10"],
        answer: "F = 20 N",
      },
      {
        q: "Calculate KE of a 500 g ball moving at 20 m/s.",
        steps: ["KE = ½mv² = ½×0.5×400"],
        answer: "KE = 100 J",
      },
    ],
  },
  {
    title: "Gravitation",
    problems: [
      {
        q: "Find gravitational force between two 1000 kg masses 2 m apart.",
        steps: ["F = Gm₁m₂/r² = 6.67×10⁻¹¹×10⁶/4"],
        answer: "F ≈ 1.67×10⁻⁴ N",
      },
      {
        q: "Find orbital speed of a satellite at height h = R (Earth's radius).",
        steps: ["r = 2R = 2×6.4×10⁶ m", "v = √(GM/r) = √(gR²/2R) = √(gR/2)"],
        answer: "v ≈ 5590 m/s",
      },
    ],
  },
  {
    title: "Electrostatics & Current",
    problems: [
      {
        q: "Find force between two charges 2μC and 3μC separated by 0.1 m.",
        steps: ["F = kq₁q₂/r² = 9×10⁹×6×10⁻¹²/0.01"],
        answer: "F = 5.4 N",
      },
      {
        q: "A 12V battery connected to 4Ω resistor. Find current and power.",
        steps: ["I = V/R = 12/4 = 3 A", "P = VI = 12×3"],
        answer: "I = 3 A, P = 36 W",
      },
      {
        q: "Three resistors 2Ω, 3Ω, 6Ω in parallel. Find equivalent resistance.",
        steps: ["1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 1"],
        answer: "R = 1 Ω",
      },
    ],
  },
  {
    title: "Optics",
    problems: [
      {
        q: "An object is placed 15 cm from a convex lens (f = 10 cm). Find image distance and magnification.",
        steps: ["1/v - 1/u = 1/f → 1/v = 1/10 - 1/(-15) = 1/10 + 1/15 = 5/30", "m = v/u"],
        answer: "v = 30 cm, m = -2 (real, inverted, magnified)",
      },
      {
        q: "Find critical angle for glass (n = 1.5) to air.",
        steps: ["sin C = 1/n = 1/1.5 = 2/3"],
        answer: "C = sin⁻¹(0.667) ≈ 41.8°",
      },
      {
        q: "A prism has refracting angle 60°. If minimum deviation is 30°, find refractive index.",
        steps: ["μ = sin((A+Dm)/2)/sin(A/2) = sin(45°)/sin(30°)"],
        answer: "μ = 0.707/0.5 = 1.414",
      },
    ],
  },
  {
    title: "Modern Physics",
    problems: [
      {
        q: "Find energy of a photon with wavelength 500 nm.",
        steps: ["E = hc/λ = 6.626×10⁻³⁴×3×10⁸/(500×10⁻⁹)"],
        answer: "E ≈ 3.98×10⁻¹⁹ J ≈ 2.48 eV",
      },
      {
        q: "A photoelectric metal has work function 2 eV. Find threshold frequency.",
        steps: ["φ = hν₀ → ν₀ = φ/h = 2×1.6×10⁻¹⁹/(6.626×10⁻³⁴)"],
        answer: "ν₀ ≈ 4.83×10¹⁴ Hz",
      },
      {
        q: "Find de Broglie wavelength of an electron accelerated through 100 V.",
        steps: ["λ = h/√(2meV) = 6.626×10⁻³⁴/√(2×9.1×10⁻³¹×1.6×10⁻¹⁹×100)"],
        answer: "λ ≈ 1.23 Å",
      },
    ],
  },
];

export default function NumericalPhysicsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl space-y-4 md:space-y-6 py-4 md:py-8 px-3 md:px-4">
      <Link href="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg md:text-2xl font-bold truncate">Numerical Physics</h1>
          <p className="text-xs text-muted-foreground">Practice calculations for NEB exams</p>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3">
        {TOPICS.map((topic, i) => (
          <div key={topic.title} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-5 md:py-4 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-sm md:text-base truncate pr-2">{topic.title}</span>
              {openIdx === i
                ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              }
            </button>
            {openIdx === i && (
              <div className="border-t border-border px-4 py-3 md:px-5 md:py-4 space-y-4">
                {topic.problems.map((p, pi) => (
                  <div key={pi} className="space-y-2">
                    <p className="text-sm md:text-base font-medium text-foreground">{p.q}</p>
                    <div className="pl-3 space-y-1">
                      {p.steps.map((s, si) => (
                        <p key={si} className="text-xs md:text-sm text-muted-foreground font-mono">→ {s}</p>
                      ))}
                      <p className="text-xs md:text-sm font-semibold text-green-600 dark:text-green-400 mt-1">✓ {p.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeesDiscExperiment } from "@/components/lab/physics-3d-lees-disc";
import { SearlesBarExperiment } from "@/components/lab/physics-3d-searles-bar";
import { NewtonCoolingExperiment } from "@/components/lab/physics-3d-newtons-cooling";
import { LinearExpansionExperiment } from "@/components/lab/physics-3d-linear-expansion";
import { Flame } from "lucide-react";

export const metadata = {
  title: "Heat Determination Labs — Labelled 3D Apparatus",
  description:
    "Four classic 'Determination of…' heat experiments — Lee's disc, Searle's bar, Newton's law of cooling and linear expansion — in interactive 3D with labelled components, live formulas and full significance theory.",
};

const SECTIONS = [
  {
    id: "lees",
    title: "1 · Lee's Disc Method",
    tagline: "Determination of thermal conductivity K of a BAD conductor",
    recap: [
      "Steady-state balance: heat conducted through the sample equals the free-cooling rate of the copper Lee's disc (m·c·dθ/dt).",
      "Every formula symbol maps to one labelled part: steam chamber → θ₁, radial T₂ pocket → θ₂, sample disc → d, disc → m·c.",
      "Compare measured K against literature for cardboard, wood, rubber, ebonite and glass.",
    ],
    Component: LeesDiscExperiment,
  },
  {
    id: "searles",
    title: "2 · Searle's Bar Method",
    tagline: "Determination of thermal conductivity K of a GOOD conductor",
    recap: [
      "Constant-flux balance between thermojunctions T₁/T₂ and the calorimetric signal ṁ·s·(T₄−T₃) of the cooling water.",
      "Labelled coil, IN/OUT bulbs, measuring jar and purple distance bracket L make the energy audit visible.",
      "Validate copper, aluminium, brass and iron against accepted k values.",
    ],
    Component: SearlesBarExperiment,
  },
  {
    id: "newton",
    title: "3 · Newton's Law of Cooling",
    tagline: "Determination of the cooling constant k",
    recap: [
      "dT/dt = −k(T − Ts) integrates to an exponential the thermometer traces live on the right-hand graph.",
      "ln(T − Ts) vs t is a straight line of slope −k — the standard graphical extraction.",
      "Half-excess time ln2/k is the memorable equal-fraction signature of the law.",
    ],
    Component: NewtonCoolingExperiment,
  },
  {
    id: "expansion",
    title: "4 · Linear Expansion Apparatus",
    tagline: "Determination of the coefficient of linear expansion α",
    recap: [
      "Fixed clamp A + micrometer screw B convert rod growth into dial motion: α = ΔL/(L₀·ΔT).",
      "Millimetre-scale expansions demand a screw gauge — sensitivity panel shows why ±0.01 mm matters.",
      "Covers aluminium → Pyrex with the 1 : 2 : 3 α : β : γ family relationship.",
    ],
    Component: LinearExpansionExperiment,
  },
] as const;

export default function HeatDeterminationsPage() {
  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-6 sm:py-10 px-4 sm:px-6">
      {/* ---------- hero ---------- */}
      <header className="space-y-3 border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-500/40 bg-orange-500/10 text-orange-500">
            <Flame className="h-5 w-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">🔬 Heat Determination Labs — 3D with Labels</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
          Four classic <em>Determination of…</em> experiments rendered as interactive, orbitable 3D apparatus. Every component is labelled
          <span className="font-medium text-foreground"> inside the scene</span> (colour-bordered CSS2D tags), and every experiment carries its
          <span className="font-medium text-foreground"> full significance theory inside and below</span> the canvas — vocabulary, principle, prediction,
          real-world why, procedure order and error sources.
        </p>
        <nav aria-label="Jump to experiment" className="flex flex-wrap gap-2 pt-1">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
              {s.title}
            </a>
          ))}
          <Link href="/lab/3d" className="ml-auto">
            <Button size="sm" variant="outline">← Back to all 3D labs</Button>
          </Link>
        </nav>
      </header>

      {/* ---------- one bordered section per experiment ---------- */}
      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-20 space-y-4 rounded-xl border border-primary/25 bg-card p-3 sm:p-5 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-semibold">{s.title}</h2>
              <p className="text-sm text-muted-foreground">{s.tagline}</p>
            </div>
            <s.Component />
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-primary mb-1.5">📌 Significance recap</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                {s.recap.map((r) => (
                  <li key={r.slice(0, 24)}>{r}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* ---------- viva corner ---------- */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">🎓 Viva & exam corner</CardTitle>
          <CardDescription>Quick oral-exam pointers that examiners love across all four experiments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>Why must Lee&apos;s-disc faces be clamped? — an air film (k ≈ 0.026) would dominate the stack.</li>
              <li>Why read dθ/dt exactly at θ₂? — the cooling curve is curved; slope at θ₂ equals the steady flux.</li>
              <li>Why is ln(T−Ts) vs t a straight line? — e^(−kt) inverts to a linear relation in the log of the excess.</li>
              <li>Why can&apos;t Newton&apos;s law use huge temperature differences? — radiation (T⁴) bends the line.</li>
            </ul>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>Why lag Searle&apos;s bar? — sideways losses break the one-dimensional flux assumption.</li>
              <li>Why a long rod for α? — ΔL = α·L₀·ΔT scales with L₀; longer rods lift ΔL into measurable range.</li>
              <li>Relation α : β : γ? — 1 : 2 : 3 for linear, superficial and cubic expansivity.</li>
              <li>Good vs bad conductor methods? — Searle&apos;s steady-flow bar vs Lee&apos;s disc cooling-rate trick.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


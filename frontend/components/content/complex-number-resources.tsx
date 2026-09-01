/**
 * Complex Number Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Algebra → Complex Number
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Argand Diagram Visual ---------- */
function ArgandDiagramVisual() {
  const [real, setReal] = useState(1);
  const [imaginary, setImaginary] = useState(1);

  const modulus = Math.sqrt(real * real + imaginary * imaginary);
  const argument = (Math.atan2(imaginary, real) * 180) / Math.PI;

  const w = 400;
  const h2 = 350;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 60;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  const pointX = toSvgX(real);
  const pointY = toSvgY(imaginary);
  const conjX = toSvgX(real);
  const conjY = toSvgY(-imaginary);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Re(z) =</span>
          <span className="font-mono font-semibold w-12 text-center">
            {real.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Im(z) =</span>
          <span className="font-mono font-semibold w-12 text-center">
            {imaginary.toFixed(1)}
          </span>
        </div>
        <div className="font-mono text-orange-500 ml-4">
          |z| = {modulus.toFixed(2)}
        </div>
        <div className="font-mono text-purple-500">
          arg(z) = {argument.toFixed(1)}°
        </div>
      </div>

      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${w} ${h2}`}
          className="w-full max-w-lg border rounded-lg bg-slate-950"
        >
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="1" />
          <line x1={ox} y1={0} x2={ox} y2={h2} stroke="#475569" strokeWidth="1" />
          <text x={w - 10} y={oy - 5} fill="#64748b" fontSize="10">Re</text>
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">Im</text>

          {Array.from({ length: 10 }, (_, i) => i - 5).map((v) => (
            <line
              key={`grid-x-${v}`}
              x1={toSvgX(v)}
              y1={0}
              x2={toSvgX(v)}
              y2={h2}
              stroke="#334155"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
          {Array.from({ length: 10 }, (_, i) => i - 5).map((v) => (
            <line
              key={`grid-y-${v}`}
              x1={0}
              y1={toSvgY(v)}
              x2={w}
              y2={toSvgY(v)}
              stroke="#334155"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          <circle
            cx={ox}
            cy={oy}
            r={scale}
            fill="none"
            stroke="#64748b"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            opacity="0.5"
          />

          <line
            x1={ox}
            y1={oy}
            x2={pointX}
            y2={pointY}
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.7"
          />

          <circle cx={pointX} cy={pointY} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          <circle cx={conjX} cy={conjY} r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />

          <line
            x1={pointX}
            y1={pointY}
            x2={conjX}
            y2={conjY}
            stroke="#a855f7"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          <text x={pointX + 8} y={pointY - 8} fill="#38bdf8" fontSize="10">
            z = {real.toFixed(1)} + {imaginary.toFixed(1)}i
          </text>
          <text x={conjX + 8} y={conjY + 12} fill="#a855f7" fontSize="10">
            z̄ = {real.toFixed(1)} - {imaginary.toFixed(1)}i
          </text>
          <text x={ox + 10} y={oy + 15} fill="#10b981" fontSize="10">
            |z| = {modulus.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Real Part</div>
          <div className="font-mono">Re(z) = {real.toFixed(2)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Imaginary Part</div>
          <div className="font-mono">Im(z) = {imaginary.toFixed(2)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Modulus</div>
          <div className="font-mono">|z| = {modulus.toFixed(4)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Argument</div>
          <div className="font-mono">arg(z) = {argument.toFixed(1)}°</div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Argand Diagram:</strong> A complex number z = a + bi is represented as a point (a, b)
        in the complex plane. The real part is on the x-axis (Re), and the imaginary part on the y-axis (Im).
        The modulus |z| = √(a² + b²) is the distance from the origin, and arg(z) is the angle with the positive real axis.
        The conjugate z̄ = a - bi is the reflection across the real axis.
      </div>
    </div>
  );
}

/* ---------- Complex Algebra Visual ---------- */
function ComplexAlgebraVisual() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const [d, setD] = useState(4);
  const [operation, setOperation] = useState<"+" | "-" | "*" | "/">("+");

  let resultReal = 0;
  let resultImag = 0;
  let resultModulus = 0;
  let resultArg = 0;
  let stepText = "";

  const z1Modulus = Math.sqrt(a * a + b * b);
  const z1Arg = (Math.atan2(b, a) * 180) / Math.PI;
  const z2Modulus = Math.sqrt(c * c + d * d);
  const z2Arg = (Math.atan2(d, c) * 180) / Math.PI;

  switch (operation) {
    case "+":
      resultReal = a + c;
      resultImag = b + d;
      stepText = `(${a} + ${b}i) + (${c} + ${d}i) = (${a}+${c}) + (${b}+${d})i`;
      break;
    case "-":
      resultReal = a - c;
      resultImag = b - d;
      stepText = `(${a} + ${b}i) - (${c} + ${d}i) = (${a}-${c}) + (${b}-${d})i`;
      break;
    case "*":
      resultReal = a * c - b * d;
      resultImag = a * d + b * c;
      stepText = `(${a} + ${b}i) × (${c} + ${d}i) = (${a}×${c} - ${b}×${d}) + (${a}×${d} + ${b}×${c})i`;
      break;
    case "/":
      const denominator = c * c + d * d;
      resultReal = (a * c + b * d) / denominator;
      resultImag = (b * c - a * d) / denominator;
      stepText = `(${a} + ${b}i) ÷ (${c} + ${d}i) = [(${a}×${c} + ${b}×${d}) + (${b}×${c} - ${a}×${d})i] / (${c}² + ${d}²)`;
      break;
  }

  resultModulus = Math.sqrt(resultReal * resultReal + resultImag * resultImag);
  resultArg = (Math.atan2(resultImag, resultReal) * 180) / Math.PI;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">z₁ =</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
          <span>+</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground"
            step="0.1"
          />
          <span className="text-muted-foreground">i</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">z₂ =</span>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
          <span>+</span>
          <input
            type="number"
            value={d}
            onChange={(e) => setD(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground"
            step="0.1"
          />
          <span className="text-muted-foreground">i</span>
        </div>
      </div>

      <div className="flex gap-2">
        {(["+", "-", "*", "/"] as const).map((op) => (
          <Button
            key={op}
            variant={operation === op ? "default" : "outline"}
            size="sm"
            onClick={() => setOperation(op)}
            className="text-xs w-16"
          >
            {op}
          </Button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border">
        <div className="text-sm font-mono text-center text-purple-400 mb-3">
          Operation: z₁ {operation} z₂
        </div>

        <div className="p-3 bg-slate-800 rounded-lg mb-3">
          <div className="text-xs text-muted-foreground mb-1">Step-by-step calculation:</div>
          <div className="text-sm font-mono text-blue-400">{stepText}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">Result</div>
            <div className="font-mono text-green-400">
              {resultReal.toFixed(4)} + {resultImag.toFixed(4)}i
            </div>
          </div>
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">Modulus</div>
            <div className="font-mono text-orange-400">|result| = {resultModulus.toFixed(4)}</div>
          </div>
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">z₁ Modulus</div>
            <div className="font-mono">|z₁| = {z1Modulus.toFixed(4)}</div>
          </div>
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">z₂ Modulus</div>
            <div className="font-mono">|z₂| = {z2Modulus.toFixed(4)}</div>
          </div>
        </div>

        {operation === "*" && (
          <div className="mt-3 p-2 bg-slate-800 rounded text-xs">
            <div className="text-muted-foreground">Property Check:</div>
            <div className="font-mono text-green-400">
              |z₁ × z₂| = {resultModulus.toFixed(4)} ≈ |z₁| × |z₂| = {(z1Modulus * z2Modulus).toFixed(4)}
            </div>
            <div className="font-mono text-purple-400">
              arg(z₁ × z₂) = {resultArg.toFixed(1)}° ≈ arg(z₁) + arg(z₂) = {(z1Arg + z2Arg).toFixed(1)}°
            </div>
          </div>
        )}

        {operation === "/" && (
          <div className="mt-3 p-2 bg-slate-800 rounded text-xs">
            <div className="text-muted-foreground">Property Check:</div>
            <div className="font-mono text-green-400">
              |z₁ ÷ z₂| = {resultModulus.toFixed(4)} ≈ |z₁| ÷ |z₂| = {(z1Modulus / z2Modulus).toFixed(4)}
            </div>
            <div className="font-mono text-purple-400">
              arg(z₁ ÷ z₂) = {resultArg.toFixed(1)}° ≈ arg(z₁) - arg(z₂) = {(z1Arg - z2Arg).toFixed(1)}°
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Complex Operations:</strong> Addition and subtraction are component-wise.
        Multiplication uses the distributive property: (a+bi)(c+di) = (ac-bd) + (ad+bc)i.
        Division requires multiplying numerator and denominator by the conjugate of the denominator.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Imaginary Unit",
    points: [
      "i = √(-1) is the imaginary unit",
      "i² = -1, i³ = -i, i⁴ = 1, and the pattern repeats every 4 powers",
      "√(-a) = i√a for a > 0",
    ],
  },
  {
    title: "Complex Number Form",
    points: [
      "A complex number: z = a + bi where a, b are real numbers",
      "a is the real part: Re(z) = a",
      "b is the imaginary part: Im(z) = b",
      "Example: 3 + 4i has Re(z) = 3, Im(z) = 4",
    ],
  },
  {
    title: "Conjugate",
    points: [
      "The conjugate of z = a + bi is z̄ = a - bi",
      "Properties: z + z̄ = 2a (real), z - z̄ = 2bi (purely imaginary)",
      "z × z̄ = a² + b² = |z|² (real and non-negative)",
    ],
  },
  {
    title: "Modulus and Argument",
    points: [
      "Modulus: |z| = √(a² + b²) is the distance from origin",
      "Argument: arg(z) = θ = arctan(b/a) is the angle with positive real axis",
      "Polar form: z = |z|(cos θ + i sin θ)",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function ComplexNumberResources() {
  return (
    <div className="space-y-6">
      {/* PDF Resources */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Complex Numbers — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises covering algebra, modulus, and geometric representation
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-7-1",
              title: "Exercise 7.1 — Complex Numbers",
              description:
                "Imaginary unit, algebra of complex numbers, modulus, conjugate.",
              url: "https://drive.google.com/file/d/1lHI5f50Nh0j5XABla38VqSa9tOPG9-uG/preview",
              pdfUrl: "https://drive.google.com/file/d/1lHI5f50Nh0j5XABla38VqSa9tOPG9-uG/view?usp=sharing",
              tags: ["Exercise 7.1", "Algebra", "Modulus"],
            },
            {
              id: "ex-7-2",
              title: "Exercise 7.2 — Complex Numbers",
              description:
                "Geometric representation, square root of complex numbers, properties.",
              url: "https://drive.google.com/file/d/1lItRW2_216i39rItR1MNFaixJOsb-Q_n/preview",
              pdfUrl: "https://drive.google.com/file/d/1lItRW2_216i39rItR1MNFaixJOsb-Q_n/view?usp=sharing",
              tags: ["Exercise 7.2", "Geometric", "Square Root"],
            },
          ].map((res) => (
            <div
              key={res.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{res.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {res.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="shrink-0">
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Open
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interactive Visuals */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore complex numbers and their geometric interpretation
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="argand" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="argand">Argand Diagram</TabsTrigger>
              <TabsTrigger value="algebra">Complex Algebra</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="argand" className="space-y-4">
              <ArgandDiagramVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Argand Diagram:</strong> Visual representation of complex numbers as points in the complex plane.
                The real part is on the horizontal axis (Re), and the imaginary part on the vertical axis (Im).
              </div>
            </TabsContent>

            <TabsContent value="algebra" className="space-y-4">
              <ComplexAlgebraVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Complex Operations:</strong> Perform addition, subtraction, multiplication, and division
                on complex numbers. Each operation follows specific rules.
              </div>
            </TabsContent>

            <TabsContent value="theory" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {THEORY_SECTIONS.map((sec) => (
                  <div
                    key={sec.title}
                    className="p-3 rounded-lg border bg-background/60"
                  >
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      {sec.title}
                    </h4>
                    <ul className="space-y-1">
                      {sec.points.map((p, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground flex items-start gap-1.5"
                        >
                          <span className="text-purple-500 mt-0.5">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

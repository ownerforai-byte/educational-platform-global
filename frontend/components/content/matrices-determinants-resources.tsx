/**
 * Matrices & Determinants Resources Panel
 * Interactive visuals + theory for Class 11 Matrices & Determinants
 * Topic: Class 11 Mathematics → Unit: Algebra → Matrices and Determinants
 */

"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Matrix 3x3 Interactive Visual ---------- */
function MatrixVisual() {
  const [matrix, setMatrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [showTranspose, setShowTranspose] = useState(false);

  const transpose = useMemo(
    () => [
      [matrix[0][0], matrix[1][0], matrix[2][0]],
      [matrix[0][1], matrix[1][1], matrix[2][1]],
      [matrix[0][2], matrix[1][2], matrix[2][2]],
    ],
    [matrix]
  );

  const display = showTranspose ? transpose : matrix;

  const setVal = (r: number, c: number, val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    const next = matrix.map((row) => [...row]);
    next[r][c] = num;
    setMatrix(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Edit matrix:</span>
        <Button
          variant={showTranspose ? "default" : "outline"}
          size="sm"
          onClick={() => setShowTranspose(!showTranspose)}
          className="text-xs"
        >
          {showTranspose ? "Show Original (A)" : "Show Transpose (Aᵀ)"}
        </Button>
      </div>

      <div className="flex justify-center gap-8 items-center">
        <div>
          <p className="text-xs text-muted-foreground mb-1 text-center">
            {showTranspose ? "Aᵀ" : "A"} =
          </p>
          <div className="relative inline-block">
            {/* Matrix brackets */}
            <span className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-foreground rounded-l-sm" />
            <span className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-foreground rounded-r-sm" />
            <table className="border-collapse">
              <tbody>
                {display.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c} className="px-3 py-1.5">
                        {showTranspose ? (
                          <span className="font-mono text-purple-400 text-lg">
                            {val}
                          </span>
                        ) : (
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(r, c, e.target.value)}
                            className="w-14 text-center bg-transparent border-b border-muted-foreground/30 font-mono text-lg text-foreground focus:border-primary outline-none"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showTranspose && (
          <div className="text-2xl text-muted-foreground">→</div>
        )}

        {showTranspose && (
          <div>
            <p className="text-xs text-muted-foreground mb-1 text-center">A =</p>
            <div className="relative inline-block">
              <span className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-foreground rounded-l-sm" />
              <span className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-foreground rounded-r-sm" />
              <table className="border-collapse">
                <tbody>
                  {matrix.map((row, r) => (
                    <tr key={r}>
                      {row.map((val, c) => (
                        <td key={c} className="px-3 py-1.5">
                          <span className="font-mono text-lg text-foreground">
                            {val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Transpose:</strong> The transpose
        Aᵀ is obtained by swapping rows and columns — (Aᵀ)ᵢⱼ = Aⱼᵢ. A matrix
        where A = Aᵀ is called <em>symmetric</em>.
      </div>
    </div>
  );
}

/* ---------- Determinant Calculator Visual ---------- */
function DeterminantVisual() {
  const [matrix, setMatrix] = useState([
    [2, 1, 3],
    [0, -1, 2],
    [1, 4, 5],
  ]);

  const setVal = (r: number, c: number, val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    const next = matrix.map((row) => [...row]);
    next[r][c] = num;
    setMatrix(next);
  };

  // 3x3 determinant via cofactor expansion along first row
  const det = useMemo(() => {
    const a = matrix;
    return (
      a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
      a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
      a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0])
    );
  }, [matrix]);

  // 2x2 minors for first row
  const m11 = matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1];
  const m12 = matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0];
  const m13 = matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0];

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Edit matrix — determinant updates live:</p>

      <div className="flex justify-center">
        <div className="relative inline-block">
          <span className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-foreground rounded-l-sm" />
          <span className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-foreground rounded-r-sm" />
          <table className="border-collapse">
            <tbody>
              {matrix.map((row, r) => (
                <tr key={r}>
                  {row.map((val, c) => (
                    <td key={c} className="px-3 py-1.5">
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => setVal(r, c, e.target.value)}
                        className="w-14 text-center bg-transparent border-b border-muted-foreground/30 font-mono text-lg text-foreground focus:border-primary outline-none"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-muted/30 p-3 rounded-lg font-mono text-xs space-y-1">
        <div className="text-foreground font-semibold mb-2">
          Cofactor expansion along Row 1:
        </div>
        <div>
          det(A) = {matrix[0][0]}·(<span className="text-purple-400">{m11}</span>)
          − {matrix[0][1]}·(<span className="text-purple-400">{m12}</span>)
          + {matrix[0][2]}·(<span className="text-purple-400">{m13}</span>)
        </div>
        <div>
          = {matrix[0][0]}×{m11} − {matrix[0][1]}×{m12} +{" "}
          {matrix[0][2]}×{m13}
        </div>
        <div className="text-lg font-bold mt-2">
          det(A) ={" "}
          <span className={det === 0 ? "text-red-400" : "text-green-400"}>
            {det}
          </span>
          {det === 0 && (
            <span className="text-red-400 text-sm ml-2 font-normal">
              (singular — inverse does not exist)
            </span>
          )}
          {det !== 0 && (
            <span className="text-green-400 text-sm ml-2 font-normal">
              (non-singular — inverse exists)
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Properties:</strong>{" "}
        det(AB) = det(A)·det(B), det(Aᵀ) = det(A), det(kA) = kⁿ·det(A)
        (n×n matrix), swapping two rows flips the sign of det.
      </div>
    </div>
  );
}

/* ---------- Inverse Matrix Visual ---------- */
function InverseVisual() {
  const [matrix, setMatrix] = useState([
    [1, 2],
    [3, 4],
  ]);

  const setVal = (r: number, c: number, val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const next = matrix.map((row) => [...row]);
    next[r][c] = num;
    setMatrix(next);
  };

  const [[a, b], [c, d]] = matrix;
  const det = a * d - b * c;

  // Inverse of 2x2
  const inverse =
    det !== 0
      ? [
          [+(d / det).toFixed(3), +(-b / det).toFixed(3)],
          [(-c / det).toFixed(3) as unknown as number, +(a / det).toFixed(3)],
        ]
      : null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        2×2 Inverse — edit A, see A⁻¹ live:
      </p>

      <div className="flex justify-center gap-6 items-center flex-wrap">
        <div>
          <p className="text-xs text-muted-foreground mb-1 text-center">A =</p>
          <div className="relative inline-block">
            <span className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-foreground rounded-l-sm" />
            <span className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-foreground rounded-r-sm" />
            <table className="border-collapse">
              <tbody>
                {matrix.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c} className="px-3 py-1.5">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => setVal(r, c, e.target.value)}
                          className="w-14 text-center bg-transparent border-b border-muted-foreground/30 font-mono text-lg text-foreground focus:border-primary outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-lg text-muted-foreground">→</div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 text-center">
            A⁻¹ =
          </p>
          {inverse ? (
            <div className="relative inline-block">
              <span className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-foreground rounded-l-sm" />
              <span className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-foreground rounded-r-sm" />
              <table className="border-collapse">
                <tbody>
                  {inverse.map((row, r) => (
                    <tr key={r}>
                      {row.map((val, c) => (
                        <td key={c} className="px-3 py-1.5">
                          <span className="font-mono text-lg text-purple-400">
                            {val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="text-red-400 font-mono text-sm">
              det = 0 → no inverse
            </span>
          )}
        </div>
      </div>

      <div className="bg-muted/30 p-3 rounded-lg font-mono text-xs space-y-1">
        <div className="text-foreground font-semibold">Formula:</div>
        <div>
          A⁻¹ = (1/det(A)) · adj(A) = (1/{det}) · [{d}, {-b}; {-c}, {a}]
        </div>
        <div>
          det(A) = {a}×{d} − {b}×{c} ={" "}
          <span className={det === 0 ? "text-red-400" : "text-green-400"}>
            {det}
          </span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Adjoint:</strong> The adjugate
        matrix adj(A) is the transpose of the cofactor matrix. For 2×2:{" "}
        <span className="font-mono">adj([a,b;c,d]) = [d,−b;−c,a]</span>.
        A·A⁻¹ = I (identity matrix).
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Matrix Operations",
    points: [
      "A + B: add corresponding elements (matrices must be same size)",
      "kA: multiply every element by scalar k",
      "AB: (AB)ᵢⱼ = Σₖ Aᵢₖ·Bₖⱼ — row × column dot products",
      "Matrix multiplication is NOT commutative: AB ≠ BA in general",
      "(AB)ᵀ = BᵀAᵀ, (AB)⁻¹ = B⁻¹A⁻¹",
    ],
  },
  {
    title: "Transpose Properties",
    points: [
      "(Aᵀ)ᵢⱼ = Aⱼᵢ — swap rows and columns",
      "(Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ",
      "(kA)ᵀ = k·Aᵀ, (AB)ᵀ = BᵀAᵀ",
      "A is symmetric if A = Aᵀ, skew-symmetric if Aᵀ = −A",
    ],
  },
  {
    title: "Determinant Properties",
    points: [
      "det(A) = det(Aᵀ) — unchanged by transpose",
      "Swapping two rows flips sign: det → −det",
      "det(AB) = det(A)·det(B)",
      "det(kA) = kⁿ·det(A) for n×n matrix",
      "If any row is all zeros, det = 0",
      "A is singular (no inverse) ⟺ det(A) = 0",
    ],
  },
  {
    title: "Minors, Cofactors & Adjoint",
    points: [
      "Minor Mᵢⱼ = determinant of submatrix after removing row i, column j",
      "Cofactor Cᵢⱼ = (−1)ⁱ⁺ʲ · Mᵢⱼ",
      "Cofactor matrix: entry (i,j) is Cᵢⱼ",
      "Adjoint adj(A) = transpose of cofactor matrix",
      "A⁻¹ = (1/det(A)) · adj(A) when det(A) ≠ 0",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function MatricesDeterminantsResources() {
  return (
    <div className="space-y-6">
      {/* Resource Links */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Matrices & Determinants — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Theory summaries, formula references, and practice material
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "theory",
              title: "Matrix Theory — Definitions & Formulas",
              description:
                "Matrix addition, multiplication, transpose, minors, cofactors, adjoint, and inverse formulas with examples.",
              tags: ["Theory", "Formulas", "Definitions"],
            },
            {
              id: "det-props",
              title: "Determinant Properties — Key Results",
              description:
                "Properties of determinants: row operations, cofactor expansion, det(AB)=det(A)det(B), singular matrices.",
              tags: ["Determinants", "Properties", "Proofs"],
            },
            {
              id: "practice",
              title: "Practice Problems — Matrices & Determinants",
              description:
                "Worked examples: finding inverses, computing determinants, applying properties. Use the interactive tools below.",
              tags: ["Practice", "Examples", "Exercises"],
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
                Interactive Calculators
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit matrices and see results update live
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transpose" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transpose">Transpose</TabsTrigger>
              <TabsTrigger value="determinant">Determinant</TabsTrigger>
              <TabsTrigger value="inverse">Inverse (2×2)</TabsTrigger>
            </TabsList>

            <TabsContent value="transpose" className="space-y-4">
              <MatrixVisual />
            </TabsContent>

            <TabsContent value="determinant" className="space-y-4">
              <DeterminantVisual />
            </TabsContent>

            <TabsContent value="inverse" className="space-y-4">
              <InverseVisual />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Theory Summary */}
      <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Theory Summary</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Key concepts at a glance
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {THEORY_SECTIONS.map((sec) => (
              <div
                key={sec.title}
                className="p-3 rounded-lg border bg-background/60"
              >
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {sec.title}
                </h4>
                <ul className="space-y-1">
                  {sec.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

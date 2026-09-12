/**
 * Logic and Sets Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics Algebra → Logic and Set
 * Topic: Class 11 Mathematics → Unit: Algebra → Logic and Set
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Calculator,
  CheckCircle2,
  XCircle,
  Sigma,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Truth Table Visual ---------- */
function TruthTableVisual() {
  const [pValue, setPValue] = useState<boolean>(true);
  const [qValue, setQValue] = useState<boolean>(true);
  const [connective, setConnective] = useState<
    "AND" | "OR" | "IMPLIES" | "IFF" | "NOT"
  >("AND");

  // Calculate truth table based on connective
  const rows = [];
  for (let p = 0; p <= 1; p++) {
    for (let q = 0; q <= 1; q++) {
      let result: boolean;
      const pBool = p === 1;
      const qBool = q === 1;

      switch (connective) {
        case "AND":
          result = pBool && qBool;
          break;
        case "OR":
          result = pBool || qBool;
          break;
        case "IMPLIES":
          result = !pBool || qBool;
          break;
        case "IFF":
          result = pBool === qBool;
          break;
        case "NOT":
          result = !pBool;
          break;
      }

      rows.push({ p: p === 1, q: q === 1, result });
    }
  }

  // Highlight rows where result is true
  const highlightRows = rows.filter((r) => r.result);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">p:</span>
          <Button
            variant={pValue ? "default" : "outline"}
            size="sm"
            onClick={() => setPValue(!pValue)}
          >
            {pValue ? "True" : "False"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">q:</span>
          <Button
            variant={qValue ? "default" : "outline"}
            size="sm"
            onClick={() => setQValue(!qValue)}
          >
            {qValue ? "True" : "False"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Connective:</span>
          <select
            value={connective}
            onChange={(e) => setConnective(e.target.value as any)}
            className="px-2 py-1 text-sm border rounded-md bg-background"
          >
            <option value="AND">AND (∧)</option>
            <option value="OR">OR (∨)</option>
            <option value="IMPLIES">IMPLIES (→)</option>
            <option value="IFF">IFF (↔)</option>
            <option value="NOT">NOT (¬)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-1 text-left">p</th>
              <th className="px-2 py-1 text-left">q</th>
              <th className="px-2 py-1 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={
                  highlightRows.some(
                    (r) => r.p === row.p && r.q === row.q && r.result === row.result
                  )
                    ? "bg-green-50 dark:bg-green-900/20"
                    : ""
                }
              >
                <td className="px-2 py-1 border">{row.p ? "T" : "F"}</td>
                <td className="px-2 py-1 border">{row.q ? "T" : "F"}</td>
                <td className="px-2 py-1 border">
                  {row.result ? "T" : "F"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Truth Table:</strong> Shows all possible combinations of p and q values. Rows where the result is TRUE are highlighted in green.
      </div>
    </div>
  );
}

/* ---------- Venn Diagram Visual ---------- */
function VennDiagramVisual() {
  const [operation, setOperation] = useState<
    "union" | "intersect" | "minusA" | "minusB"
  >("union");

  // Calculate which regions to highlight
  const highlightRegions = {
    A: false,
    B: false,
    both: false,
    neither: false,
  };

  switch (operation) {
    case "union":
      highlightRegions.A = true;
      highlightRegions.B = true;
      highlightRegions.both = true;
      break;
    case "intersect":
      highlightRegions.both = true;
      break;
    case "minusA":
      highlightRegions.A = true;
      highlightRegions.neither = true;
      break;
    case "minusB":
      highlightRegions.B = true;
      highlightRegions.neither = true;
      break;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(
          ["union", "intersect", "minusA", "minusB"] as const
        ).map((op) => (
          <Button
            key={op}
            variant={operation === op ? "default" : "outline"}
            size="sm"
            onClick={() => setOperation(op)}
            className="text-xs"
          >
            {op === "union" ? "A ∪ B" : op === "intersect" ? "A ∩ B" : op === "minusA" ? "A - B" : "B - A"}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative w-64 h-40">
          {/* Circle A */}
          <div
            className={`absolute top-1/2 left-1/4 w-40 h-40 rounded-full border-2 border-blue-500 bg-blue-500/10 transition-all ${highlightRegions.A || highlightRegions.both || operation === "minusA" ? "opacity-100" : "opacity-30"}`}
          />
          <span className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-blue-600 font-semibold">A</span>

          {/* Circle B */}
          <div
            className={`absolute top-1/2 right-1/4 w-40 h-40 rounded-full border-2 border-purple-500 bg-purple-500/10 transition-all ${highlightRegions.B || highlightRegions.both || operation === "minusB" ? "opacity-100" : "opacity-30"}`}
          />
          <span className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 text-purple-600 font-semibold">B</span>

          {/* Overlap */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ${highlightRegions.both ? "opacity-100" : "opacity-30"}`}
          />

          {/* Labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-medium">
            {operation === "union" && "A ∪ B = All elements in A or B"}
            {operation === "intersect" && "A ∩ B = Elements in both A and B"}
            {operation === "minusA" && "A - B = Elements in A but not in B"}
            {operation === "minusB" && "B - A = Elements in B but not in A"}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Set Operations:</strong> Visualize how sets combine. The highlighted regions show the result of the selected operation.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Logical Connectives",
    points: [
      "AND (∧): True only when both operands are true",
      "OR (∨): True when at least one operand is true",
      "NOT (¬): Inverts the truth value (negation)",
      "IMPLIES (→): False only when true → false",
      "IFF (↔): True when both operands have same truth value (if and only if)",
    ],
  },
  {
    title: "De Morgan's Laws",
    points: [
      "¬(p ∧ q) ≡ ¬p ∨ ¬q",
      "¬(p ∨ q) ≡ ¬p ∧ ¬q",
      "Useful for simplifying logical expressions and circuit design",
    ],
  },
  {
    title: "Set Operations",
    points: [
      "Union (A ∪ B): All elements in A or B",
      "Intersection (A ∩ B): Elements common to both A and B",
      "Complement (A'): All elements not in A",
      "Difference (A - B): Elements in A but not in B",
      "Symmetric Difference: Elements in exactly one set",
    ],
  },
  {
    title: "Set Identities",
    points: [
      "Idempotent: A ∪ A = A, A ∩ A = A",
      "Commutative: A ∪ B = B ∪ A, A ∩ B = B ∩ A",
      "Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)",
      "Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function LogicSetsResources() {
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
                Logic, Sets and Real Numbers — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise 1.1 with statements, logical connectives, and set operations
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-1-1",
              title: "Exercise 1.1 — Logic, Sets and Real Numbers",
              description:
                "Statements, logical connectives, truth tables, set operations.",
              url: "https://drive.google.com/file/d/18dLnNxv2ymykLKsa5Qwr1rQh8LsI_o3r/preview",
              pdfUrl:
                "https://drive.google.com/file/d/18dLnNxv2ymykLKsa5Qwr1rQh8LsI_o3r/view?usp=sharing",
              tags: ["Exercise 1.1", "Truth Tables", "Sets"],
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
                Explore logic and set theory interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="truthtable" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="truthtable">Truth Table</TabsTrigger>
              <TabsTrigger value="venn">Venn Diagram</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="truthtable" className="space-y-4">
              <TruthTableVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Interactive Truth Table:</strong> Select p and q values, choose a logical connective, and see the resulting truth table. Rows with TRUE results are highlighted.
              </div>
            </TabsContent>

            <TabsContent value="venn" className="space-y-4">
              <VennDiagramVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Interactive Venn Diagram:</strong> Toggle between set operations (union, intersection, difference) to see how sets combine. Highlighted regions show the result.
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
                      <Sigma className="w-4 h-4 text-purple-500" />
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

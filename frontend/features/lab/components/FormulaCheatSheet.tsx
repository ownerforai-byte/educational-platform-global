"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MathDisplay } from "@/components/content/MathRenderer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: string;
}

const FORMULAS: Formula[] = [
  { id: "1", name: "Area of Circle", formula: "A = \\pi r^2", description: "Where r is the radius", category: "Geometry" },
  { id: "2", name: "Circumference", formula: "C = 2\\pi r", description: "Perimeter of a circle", category: "Geometry" },
  { id: "3", name: "Volume of Sphere", formula: "V = \\frac{4}{3}\\pi r^3", description: "Space occupied by a sphere", category: "Geometry" },
  { id: "4", name: "Surface Area of Sphere", formula: "A = 4\\pi r^2", description: "Total surface area", category: "Geometry" },
  { id: "5", name: "Volume of Cylinder", formula: "V = \\pi r^2 h", description: "Where h is height", category: "Geometry" },
  { id: "6", name: "Pythagorean Theorem", formula: "a^2 + b^2 = c^2", description: "Right triangle relationship", category: "Algebra" },
  { id: "7", name: "Quadratic Formula", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", description: "Solve ax² + bx + c = 0", category: "Algebra" },
  { id: "8", name: "Distance Formula", formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}", description: "Distance between two points", category: "Algebra" },
  { id: "9", name: "Slope", formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}", description: "Rate of change", category: "Algebra" },
  { id: "10", name: "Sin Rule", formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}", description: "Triangle relationship", category: "Trigonometry" },
  { id: "11", name: "Cos Rule", formula: "c^2 = a^2 + b^2 - 2ab\\cos C", description: "Triangle relationship", category: "Trigonometry" },
  { id: "12", name: "Sin²θ + Cos²θ", formula: "\\sin^2\\theta + \\cos^2\\theta = 1", description: "Fundamental identity", category: "Trigonometry" },
  { id: "13", name: "Volume of Cone", formula: "V = \\frac{1}{3}\\pi r^2 h", description: "Space occupied by cone", category: "Geometry" },
  { id: "14", name: "Surface Area of Cone", formula: "A = \\pi r(r + \\sqrt{r^2 + h^2})", description: "Total surface area", category: "Geometry" },
  { id: "15", name: "Volume of Pyramid", formula: "V = \\frac{1}{3}Bh", description: "Where B is base area", category: "Geometry" },
  { id: "16", name: "Limit Definition", formula: "\\lim_{x \\to a} f(x) = L", description: "Limit of function", category: "Calculus" },
  { id: "17", name: "Derivative", formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", description: "Definition of derivative", category: "Calculus" },
  { id: "18", name: "Integral", formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)", description: "Fundamental theorem", category: "Calculus" },
  { id: "19", name: "Matrix Determinant", formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc", description: "2×2 matrix determinant", category: "Linear Algebra" },
  { id: "20", name: "Eigenvalue", formula: "A\\mathbf{v} = \\lambda\\mathbf{v}", description: "Eigenvalue equation", category: "Linear Algebra" },
];

export function FormulaCheatSheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(FORMULAS.map((f) => f.category)))],
    []
  );

  const filteredFormulas = FORMULAS.filter((f) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      f.name.toLowerCase().includes(query) || f.formula.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search formulas…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="rounded-lg border border-border bg-muted/40 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{formula.name}</span>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {formula.category}
              </span>
            </div>
            <MathDisplay expression={formula.formula} />
            <div className="mt-2 text-xs text-muted-foreground">{formula.description}</div>
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No formulas found
        </div>
      )}
    </div>
  );
}

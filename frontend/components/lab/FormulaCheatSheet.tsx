"use client";

import { useState } from "react";
import { MathDisplay } from "../content/MathRenderer";

interface Formula {
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

export function FormulaCheatSheet({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isDark = theme === "dark";
  const categories = ["All", ...new Set(FORMULAS.map((f) => f.category))];

  const filteredFormulas = FORMULAS.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 600 }}>📐 Formula Cheat Sheet</h2>
      
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search formulas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "14px",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            style={{
              padding: "16px 20px",
              borderRadius: "8px",
              background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
              border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontWeight: 600, fontSize: "14px" }}>{formula.name}</span>
              <span style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: "rgba(99, 102, 241, 0.2)",
                color: "#818cf8",
              }}>
                {formula.category}
              </span>
            </div>
            <MathDisplay expression={formula.formula} />
            <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "8px" }}>{formula.description}</div>
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", opacity: 0.6 }}>
          No formulas found
        </div>
      )}
    </div>
  );
}

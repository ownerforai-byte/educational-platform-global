"use client";

import { useState } from "react";

interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: string;
}

const FORMULAS: Formula[] = [
  { id: "1", name: "Area of Circle", formula: "A = πr²", description: "Where r is the radius", category: "Geometry" },
  { id: "2", name: "Circumference", formula: "C = 2πr", description: "Perimeter of a circle", category: "Geometry" },
  { id: "3", name: "Volume of Sphere", formula: "V = (4/3)πr³", description: "Space occupied by a sphere", category: "Geometry" },
  { id: "4", name: "Surface Area of Sphere", formula: "A = 4πr²", description: "Total surface area", category: "Geometry" },
  { id: "5", name: "Volume of Cylinder", formula: "V = πr²h", description: "Where h is height", category: "Geometry" },
  { id: "6", name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "Right triangle relationship", category: "Algebra" },
  { id: "7", name: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", description: "Solve ax² + bx + c = 0", category: "Algebra" },
  { id: "8", name: "Distance Formula", formula: "d = √((x₂-x₁)² + (y₂-y₁)²)", description: "Distance between two points", category: "Algebra" },
  { id: "9", name: "Slope", formula: "m = (y₂-y₁) / (x₂-x₁)", description: "Rate of change", category: "Algebra" },
  { id: "10", name: "Sin Rule", formula: "a/sinA = b/sinB = c/sinC", description: "Triangle relationship", category: "Trigonometry" },
  { id: "11", name: "Cos Rule", formula: "c² = a² + b² - 2ab·cosC", description: "Triangle relationship", category: "Trigonometry" },
  { id: "12", name: "Sin²θ + Cos²θ", formula: "sin²θ + cos²θ = 1", description: "Fundamental identity", category: "Trigonometry" },
  { id: "13", name: "Volume of Cone", formula: "V = (1/3)πr²h", description: "Space occupied by cone", category: "Geometry" },
  { id: "14", name: "Surface Area of Cone", formula: "A = πr(r + √(r²+h²))", description: "Total surface area", category: "Geometry" },
  { id: "15", name: "Volume of Pyramid", formula: "V = (1/3)Bh", description: "Where B is base area", category: "Geometry" },
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

      <div style={{ display: "grid", gap: "12px" }}>
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            style={{
              padding: "14px 16px",
              borderRadius: "8px",
              background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
              border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
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
            <div style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#818cf8",
              marginBottom: "4px",
              fontWeight: 600,
            }}>
              {formula.formula}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>{formula.description}</div>
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

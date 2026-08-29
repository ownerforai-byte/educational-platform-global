"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Class11MathTheory: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Mathematics Theory</CardTitle>
        <CardDescription>
          Comprehensive Class 11 Mathematics concepts organized by chapters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="sets" className="w-full">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="sets">Sets & Functions</TabsTrigger>
            <TabsTrigger value="trigonometry">Trigonometry</TabsTrigger>
            <TabsTrigger value="algebra">Algebra</TabsTrigger>
            <TabsTrigger value="coordinate">Coordinate Geometry</TabsTrigger>
            <TabsTrigger value="calculus">Calculus</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="sets" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 1: Sets</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Set:</h4>
                <p className="text-sm">A well-defined collection of distinct objects, considered as an object in its own right.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Roster Form:</p>
                    <p className="text-sm"><span className="text-purple-600">{'{'}</span>1, 2, 3, 4, 5<span className="text-purple-600">{'}'}</span></p>
                  </div>
                  <div>
                    <p className="font-medium">Set-builder Form:</p>
                    <p className="text-sm"><span className="text-purple-600">{'{'}</span>x | x is a natural number &lt; 6<span className="text-purple-600">{'}'}</span></p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Types of Sets:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Empty Set (∅):</p>
                    <p className="text-xs">Set with no elements.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Singleton Set:</p>
                    <p className="text-xs">Set with exactly one element.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Finite Set:</p>
                    <p className="text-xs">Set with finite number of elements.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Infinite Set:</p>
                    <p className="text-xs">Set with infinite number of elements.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Subset (⊆):</p>
                    <p className="text-xs">A ⊆ B if every element of A is in B.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Proper Subset (⊂):</p>
                    <p className="text-xs">A ⊂ B if A ⊆ B and A ≠ B.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Equal Sets:</p>
                    <p className="text-xs">A = B if A ⊆ B and B ⊆ A.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Disjoint Sets:</p>
                    <p className="text-xs">A and B are disjoint if A ∩ B = ∅.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Set Operations:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Union (A ∪ B):</p>
                    <p className="text-sm">Set of all elements in A or B.</p>
                  </div>
                  <div>
                    <p className="font-medium">Intersection (A ∩ B):</p>
                    <p className="text-sm">Set of all elements in both A and B.</p>
                  </div>
                  <div>
                    <p className="font-medium">Difference (A - B):</p>
                    <p className="text-sm">Set of all elements in A but not in B.</p>
                  </div>
                  <div>
                    <p className="font-medium">Symmetric Difference (A Δ B):</p>
                    <p className="text-sm">(A - B) ∪ (B - A)</p>
                  </div>
                  <div>
                    <p className="font-medium">Complement (A'):</p>
                    <p className="text-sm">U - A (where U is universal set)</p>
                  </div>
                  <div>
                    <p className="font-medium">Cartesian Product (A &times; B):</p>
                    <p className="text-sm"><span className="text-purple-600">{'{'}</span>(a,b) | a &isin; A and b &isin; B<span className="text-purple-600">{'}'}</span></p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Laws of Set Theory:</h4>
                <div className="space-y-2">
                  <p><strong>Commutative:</strong> A ∪ B = B ∪ A, A ∩ B = B ∩ A</p>
                  <p><strong>Associative:</strong> (A ∪ B) ∪ C = A ∪ (B ∪ C), (A ∩ B) ∩ C = A ∩ (B ∩ C)</p>
                  <p><strong>Distributive:</strong> A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C), A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</p>
                  <p><strong>Idempotent:</strong> A ∪ A = A, A ∩ A = A</p>
                  <p><strong>Identity:</strong> A ∪ ∅ = A, A ∩ U = A</p>
                  <p><strong>De Morgan's:</strong> (A ∪ B)' = A' ∩ B', (A ∩ B)' = A' ∪ B'</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Venn Diagrams:</h4>
                <p className="text-sm">Geometric representation of sets using rectangles and circles.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Number of Elements in Sets:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">n(A ∪ B):</p>
                    <p className="text-lg font-bold">n(A) + n(B) - n(A ∩ B)</p>
                  </div>
                  <div>
                    <p className="font-medium">n(A ∪ B ∪ C):</p>
                    <p className="text-lg font-bold">n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(C ∩ A) + n(A ∩ B ∩ C)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Chapter 2: Relations and Functions</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Ordered Pair:</h4>
                <p className="text-sm">Two elements a and b, written as (a, b), where order matters.</p>
                <p className="text-sm mt-1">(a, b) = (c, d) iff a = c and b = d</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Cartesian Product of Sets:</h4>
                <p className="text-sm">A &times; B = <span className="text-purple-600">{'{'}</span>(a, b) | a &isin; A and b &isin; B<span className="text-purple-600">{'}'}</span></p>
                <p className="text-sm mt-1">n(A &times; B) = n(A) &times; n(B)</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Relation:</h4>
                <p className="text-sm">A subset of A × B. A relation R from A to B is a subset of A × B.</p>
                <p className="text-sm mt-1">If (a, b) ∈ R, we say a R b.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Domain, Co-domain and Range:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Domain:</p>
                    <p className="text-xs">Set of all first elements of ordered pairs.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Co-domain:</p>
                    <p className="text-xs">Set of all second elements of ordered pairs (in A × B).</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Range:</p>
                    <p className="text-xs">Set of all second elements of ordered pairs that appear in the relation.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Types of Relations:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Reflexive:</p>
                    <p className="text-xs">(a, a) ∈ R for all a ∈ A</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Symmetric:</p>
                    <p className="text-xs">(a, b) ∈ R ⇒ (b, a) ∈ R</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Transitive:</p>
                    <p className="text-xs">(a, b) ∈ R and (b, c) ∈ R ⇒ (a, c) ∈ R</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Antisymmetric:</p>
                    <p className="text-xs">(a, b) ∈ R and (b, a) ∈ R ⇒ a = b</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equivalence Relation:</h4>
                <p className="text-sm">A relation that is reflexive, symmetric, and transitive.</p>
                <p className="text-sm mt-1"><strong>Example:</strong> Relation of equality, Congruence of triangles, Parallel lines.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Function:</h4>
                <p className="text-sm">A relation f from A to B is a function if every element in A has exactly one image in B.</p>
                <p className="text-sm mt-1">f: A → B, where f(a) = b means (a, b) ∈ f.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Types of Functions:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm">One-One (Injective):</p>
                    <p className="text-xs">Different elements in A have different images in B.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Onto (Surjective):</p>
                    <p className="text-xs">Every element in B has a pre-image in A.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bijective:</p>
                    <p className="text-xs">Both one-one and onto.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Constant Function:</p>
                    <p className="text-xs">f(x) = c for all x ∈ A.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Identity Function:</p>
                    <p className="text-xs">f(x) = x for all x ∈ A.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Modulus Function:</p>
                    <p className="text-xs">f(x) = |x|</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Signum Function:</p>
                    <p className="text-xs">f(x) = |x|/x for x ≠ 0, f(0) = 0</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Greatest Integer Function:</p>
                    <p className="text-xs">f(x) = [x] (floor function)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Composition of Functions:</h4>
                <p className="text-sm">If f: A → B and g: B → C, then g ∘ f: A → C is defined by (g ∘ f)(x) = g(f(x)).</p>
                <p className="text-sm mt-1"><strong>Properties:</strong></p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Composition is not commutative: g ∘ f ≠ f ∘ g</li>
                  <li>Composition is associative: (h ∘ g) ∘ f = h ∘ (g ∘ f)</li>
                  <li>If f is one-one and onto, then f⁻¹ exists such that f⁻¹ ∘ f = f ∘ f⁻¹ = I</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Inverse of a Function:</h4>
                <p className="text-sm">Let f: A → B be a bijective function. Then f⁻¹: B → A is defined by f⁻¹(y) = x ⇔ f(x) = y.</p>
                <p className="text-sm mt-1"><strong>Properties:</strong></p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>(f⁻¹)⁻¹ = f</li>
                  <li>f⁻¹ is also bijective</li>
                  <li>Graph of f⁻¹ is the reflection of graph of f about y = x</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trigonometry" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 3: Trigonometric Functions</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Measurement of Angles:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Degree:</p>
                    <p className="text-sm">1° = 60' (minutes)</p>
                    <p className="text-xs">1' = 60" (seconds)</p>
                  </div>
                  <div>
                    <p className="font-medium">Radian:</p>
                    <p className="text-sm">Angle subtended by an arc of length 1 unit in a circle of radius 1 unit.</p>
                  </div>
                  <div>
                    <p className="font-medium">Relation:</p>
                    <p className="text-lg font-bold">π radians = 180°</p>
                    <p className="text-sm">1 rad ≈ 57.3°</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Trigonometric Ratios:</h4>
                <p className="text-sm">For a right-angled triangle with angle θ:</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Primary Ratios:</p>
                    <p>sinθ = Perpendicular/Hypotenuse</p>
                    <p>cosθ = Base/Hypotenuse</p>
                    <p>tanθ = Perpendicular/Base = sinθ/cosθ</p>
                    <p>cosecθ = Hypotenuse/Perpendicular = 1/sinθ</p>
                    <p>secθ = Hypotenuse/Base = 1/cosθ</p>
                    <p>cotθ = Base/Perpendicular = cosθ/sinθ</p>
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Reciprocal Relations:</p>
                    <p>sinθ × cosecθ = 1</p>
                    <p>cosθ × secθ = 1</p>
                    <p>tanθ × cotθ = 1</p>
                    <p>tanθ = 1/cotθ</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Trigonometric Identities:</h4>
                <div className="space-y-3">
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Pythagorean Identities:</p>
                    <p>sin²θ + cos²θ = 1</p>
                    <p>1 + tan²θ = sec²θ</p>
                    <p>1 + cot²θ = cosec²θ</p>
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Sum of Angles:</p>
                    <p>sin(A+B) = sinAcosB + cosAsinB</p>
                    <p>cos(A+B) = cosAcosB - sinAsinB</p>
                    <p>tan(A+B) = (tanA + tanB)/(1 - tanAtanB)</p>
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Difference of Angles:</p>
                    <p>sin(A-B) = sinAcosB - cosAsinB</p>
                    <p>cos(A-B) = cosAcosB + sinAsinB</p>
                    <p>tan(A-B) = (tanA - tanB)/(1 + tanAtanB)</p>
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Double Angle:</p>
                    <p>sin2θ = 2sinθcosθ</p>
                    <p>cos2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</p>
                    <p>tan2θ = 2tanθ/(1 - tan²θ)</p>
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <p className="font-bold">Triple Angle:</p>
                    <p>sin3θ = 3sinθ - 4sin³θ</p>
                    <p>cos3θ = 4cos³θ - 3cosθ</p>
                    <p>tan3θ = (3tanθ - tan³θ)/(1 - 3tan²θ)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Values of Trigonometric Functions:</h4>
                <p className="text-sm">Standard angles (0°, 30°, 45°, 60°, 90°):</p>
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Angle</th>
                        <th className="text-left p-2">0°</th>
                        <th className="text-left p-2">30°</th>
                        <th className="text-left p-2">45°</th>
                        <th className="text-left p-2">60°</th>
                        <th className="text-left p-2">90°</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">sinθ</td>
                        <td className="p-2">0</td>
                        <td className="p-2">1/2</td>
                        <td className="p-2">√2/2</td>
                        <td className="p-2">√3/2</td>
                        <td className="p-2">1</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">cosθ</td>
                        <td className="p-2">1</td>
                        <td className="p-2">√3/2</td>
                        <td className="p-2">√2/2</td>
                        <td className="p-2">1/2</td>
                        <td className="p-2">0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">tanθ</td>
                        <td className="p-2">0</td>
                        <td className="p-2">1/√3</td>
                        <td className="p-2">1</td>
                        <td className="p-2">√3</td>
                        <td className="p-2">∞</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">cotθ</td>
                        <td className="p-2">∞</td>
                        <td className="p-2">√3</td>
                        <td className="p-2">1</td>
                        <td className="p-2">1/√3</td>
                        <td className="p-2">0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">secθ</td>
                        <td className="p-2">1</td>
                        <td className="p-2">2/√3</td>
                        <td className="p-2">√2</td>
                        <td className="p-2">2</td>
                        <td className="p-2">∞</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">cosecθ</td>
                        <td className="p-2">∞</td>
                        <td className="p-2">2</td>
                        <td className="p-2">√2</td>
                        <td className="p-2">2/√3</td>
                        <td className="p-2">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Unit Circle:</h4>
                <p className="text-sm">Circle with center at origin and radius 1.</p>
                <p className="text-sm mt-1">For any angle θ (in standard position):</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">cosθ + i sinθ = e^(iθ)</p>
                <p className="text-sm text-muted-foreground">Euler's Formula</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Trigonometric Equations:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">sinθ = k:</p>
                    <p className="text-sm">θ = nπ + (-1)ⁿ α, where sinα = k, |k| ≤ 1, n ∈ ℤ</p>
                  </div>
                  <div>
                    <p className="font-medium">cosθ = k:</p>
                    <p className="text-sm">θ = 2nπ ± α, where cosα = k, |k| ≤ 1, n ∈ ℤ</p>
                  </div>
                  <div>
                    <p className="font-medium">tanθ = k:</p>
                    <p className="text-sm">θ = nπ + α, where tanα = k, n ∈ ℤ</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Graphs of Trigonometric Functions:</h4>
                <div className="space-y-2">
                  <p><strong>sinθ:</strong> Period = 2π, Range = [-1, 1]</p>
                  <p><strong>cosθ:</strong> Period = 2π, Range = [-1, 1]</p>
                  <p><strong>tanθ:</strong> Period = π, Range = ℝ</p>
                  <p><strong>cotθ:</strong> Period = π, Range = ℝ</p>
                  <p><strong>secθ:</strong> Period = 2π, Range = (-∞, -1] ∪ [1, ∞)</p>
                  <p><strong>cosecθ:</strong> Period = 2π, Range = (-∞, -1] ∪ [1, ∞)</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Inverse Trigonometric Functions:</h4>
                <p className="text-sm">Principal values:</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">arcsin(x):</p>
                    <p className="text-sm">Domain: [-1, 1], Range: [-π/2, π/2]</p>
                  </div>
                  <div>
                    <p className="font-medium">arccos(x):</p>
                    <p className="text-sm">Domain: [-1, 1], Range: [0, π]</p>
                  </div>
                  <div>
                    <p className="font-medium">arctan(x):</p>
                    <p className="text-sm">Domain: ℝ, Range: (-π/2, π/2)</p>
                  </div>
                  <div>
                    <p className="font-medium">arccot(x):</p>
                    <p className="text-sm">Domain: ℝ, Range: (0, π)</p>
                  </div>
                  <div>
                    <p className="font-medium">arcsec(x):</p>
                    <p className="text-sm">Domain: (-∞, -1] ∪ [1, ∞), Range: [0, π] - {π/2}</p>
                  </div>
                  <div>
                    <p className="font-medium">arccosec(x):</p>
                    <p className="text-sm">Domain: (-∞, -1] ∪ [1, ∞), Range: [-π/2, π/2] - {0}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="algebra" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 4: Algebra</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Principle of Mathematical Induction:</h4>
                <p className="text-sm">Used to prove statements for all positive integers.</p>
                <p className="text-sm mt-1"><strong>Steps:</strong></p>
                <ol className="text-sm list-decimal pl-5 space-y-1">
                  <li><strong>Base Case:</strong> Verify for n = 1.</li>
                  <li><strong>Inductive Hypothesis:</strong> Assume true for n = k.</li>
                  <li><strong>Inductive Step:</strong> Prove true for n = k + 1 using the assumption.</li>
                </ol>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Complex Numbers:</h4>
                <p className="text-sm">Numbers of the form a + bi, where a, b are real numbers and i = √(-1).</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Addition:</p>
                    <p className="text-sm">(a + bi) + (c + di) = (a + c) + (b + d)i</p>
                  </div>
                  <div>
                    <p className="font-medium">Subtraction:</p>
                    <p className="text-sm">(a + bi) - (c + di) = (a - c) + (b - d)i</p>
                  </div>
                  <div>
                    <p className="font-medium">Multiplication:</p>
                    <p className="text-sm">(a + bi)(c + di) = (ac - bd) + (ad + bc)i</p>
                  </div>
                  <div>
                    <p className="font-medium">Division:</p>
                    <p className="text-sm">(a + bi)/(c + di) = [(a + bi)(c - di)]/(c² + d²)</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Conjugate:</p>
                  <p className="text-sm">Conjugate of a + bi is a - bi.</p>
                  <p className="text-sm mt-1">|a + bi| = √(a² + b²) (Modulus)</p>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Polar Form:</p>
                  <p className="text-sm">a + bi = r(cosθ + i sinθ) = r e^(iθ)</p>
                  <p className="text-sm">where r = |a + bi|, θ = arg(a + bi)</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Quadratic Equations:</h4>
                <p className="text-sm">ax² + bx + c = 0, where a ≠ 0.</p>
                <div className="bg-primary/10 rounded p-3 mt-2">
                  <p className="font-bold">Solutions:</p>
                  <p className="text-lg">x = [-b ± √(b² - 4ac)]/(2a)</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-medium">Discriminant (D):</p>
                    <p className="text-lg font-bold">D = b² - 4ac</p>
                  </div>
                  <div>
                    <p className="font-medium">Nature of Roots:</p>
                    <p className="text-sm">D &gt; 0: Two distinct real roots</p>
                    <p className="text-sm">D = 0: One real root (repeated)</p>
                    <p className="text-sm">D &lt; 0: Two complex conjugate roots</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Sum and Product of Roots:</p>
                  <p className="text-lg font-bold">α + β = -b/a, αβ = c/a</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Permutations and Combinations:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Permutation (nPr):</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded">P(n, r) = n!/(n-r)!</p>
                    <p className="text-sm text-muted-foreground">Order matters</p>
                  </div>
                  <div>
                    <p className="font-medium">Combination (nCr):</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded">C(n, r) = n!/[r!(n-r)!]</p>
                    <p className="text-sm text-muted-foreground">Order does not matter</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Properties:</p>
                  <p className="text-sm">C(n, r) = C(n, n-r)</p>
                  <p className="text-sm">C(n, 0) = C(n, n) = 1</p>
                  <p className="text-sm">C(n, 1) = n</p>
                  <p className="text-sm">C(n+1, r) = C(n, r) + C(n, r-1) (Pascal's Identity)</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Binomial Theorem:</h4>
                <p className="text-sm">For any positive integer n:</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">(a + b)ⁿ = Σ C(n, r) a^(n-r) b^r</p>
                <p className="text-sm text-muted-foreground">for r = 0 to n</p>
                <div className="mt-3">
                  <p className="font-medium">General Term:</p>
                  <p className="text-lg font-bold">T_(r+1) = C(n, r) a^(n-r) b^r</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Sequence and Series:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Arithmetic Progression (AP):</p>
                    <p className="text-sm">a, a+d, a+2d, ..., a+(n-1)d</p>
                    <p className="text-sm mt-1"><strong>Sum:</strong> S_n = n/2 [2a + (n-1)d] = n/2 (first term + last term)</p>
                  </div>
                  <div>
                    <p className="font-medium">Geometric Progression (GP):</p>
                    <p className="text-sm">a, ar, ar², ..., ar^(n-1)</p>
                    <p className="text-sm mt-1"><strong>Sum:</strong> S_n = a(1-r^n)/(1-r) for r ≠ 1</p>
                    <p className="text-xs text-muted-foreground">S_∞ = a/(1-r) for |r| &lt; 1</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Harmonic Progression (HP):</p>
                  <p className="text-sm">1/a, 1/(a+d), 1/(a+2d), ...</p>
                  <p className="text-sm mt-1"><strong>Relation:</strong> If a₁, a₂, ..., a_n are in HP, then 1/a₁, 1/a₂, ..., 1/a_n are in AP.</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Inequalities:</h4>
                <div className="space-y-2">
                  <p><strong>AM-GM Inequality:</strong> (a + b)/2 ≥ √(ab) for a, b ≥ 0</p>
                  <p><strong>Triangle Inequality:</strong> |a + b| ≤ |a| + |b|</p>
                  <p><strong>Cauchy-Schwarz:</strong> (Σa_i²)(Σb_i²) ≥ (Σa_ib_i)²</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coordinate" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 5: Coordinate Geometry</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Distance Formula:</h4>
                <p className="text-sm">Distance between two points (x₁, y₁) and (x₂, y₂):</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Section Formula:</h4>
                <p className="text-sm">Coordinates of point dividing the line segment joining (x₁, y₁) and (x₂, y₂) in the ratio m:n:</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Internal Division:</p>
                    <p className="text-sm">x = (mx₂ + nx₁)/(m+n)</p>
                    <p className="text-sm">y = (my₂ + ny₁)/(m+n)</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">External Division:</p>
                    <p className="text-sm">x = (mx₂ - nx₁)/(m-n)</p>
                    <p className="text-sm">y = (my₂ - ny₁)/(m-n)</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Mid-point:</p>
                  <p className="text-sm">m:n = 1:1 ⇒ x = (x₁ + x₂)/2, y = (y₁ + y₂)/2</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Area of Triangle:</h4>
                <p className="text-sm">Area of triangle formed by points (x₁, y₁), (x₂, y₂), (x₃, y₃):</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">Area = ½ |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Slope of a Line:</h4>
                <p className="text-sm">Slope (m) of line joining (x₁, y₁) and (x₂, y₂):</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">m = (y₂ - y₁)/(x₂ - x₁)</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">Angle between two lines:</p>
                    <p className="text-sm">tanθ = |(m₂ - m₁)/(1 + m₁m₂)|</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Parallel lines:</p>
                    <p className="text-sm">m₁ = m₂</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Perpendicular lines:</p>
                    <p className="text-sm">m₁ × m₂ = -1</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equation of a Line:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Slope-Intercept Form:</p>
                    <p className="text-lg font-bold">y = mx + c</p>
                    <p className="text-sm text-muted-foreground">where m = slope, c = y-intercept</p>
                  </div>
                  <div>
                    <p className="font-medium">Point-Slope Form:</p>
                    <p className="text-lg font-bold">y - y₁ = m(x - x₁)</p>
                  </div>
                  <div>
                    <p className="font-medium">Two-Point Form:</p>
                    <p className="text-lg font-bold">(y - y₁)/(y₂ - y₁) = (x - x₁)/(x₂ - x₁)</p>
                  </div>
                  <div>
                    <p className="font-medium">Intercept Form:</p>
                    <p className="text-lg font-bold">x/a + y/b = 1</p>
                    <p className="text-sm text-muted-foreground">where a = x-intercept, b = y-intercept</p>
                  </div>
                  <div>
                    <p className="font-medium">General Form:</p>
                    <p className="text-lg font-bold">Ax + By + C = 0</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Distance from a Point to a Line:</h4>
                <p className="text-sm">Distance from point (x₀, y₀) to line Ax + By + C = 0:</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">d = |Ax₀ + By₀ + C|/√(A² + B²)</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Circle:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Standard Form:</p>
                    <p className="text-lg font-bold">(x - h)² + (y - k)² = r²</p>
                    <p className="text-sm text-muted-foreground">where (h, k) = center, r = radius</p>
                  </div>
                  <div>
                    <p className="font-medium">General Form:</p>
                    <p className="text-lg font-bold">x² + y² + 2gx + 2fy + c = 0</p>
                    <p className="text-sm text-muted-foreground">Center = (-g, -f), Radius = √(g² + f² - c)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Conic Sections:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Parabola:</p>
                    <p className="text-sm">y² = 4ax (opens right)</p>
                    <p className="text-sm">Focus = (a, 0), Directrix = x = -a</p>
                  </div>
                  <div>
                    <p className="font-medium">Ellipse:</p>
                    <p className="text-sm">x&sup2;/a&sup2; + y&sup2;/b&sup2; = 1 (a &gt; b)</p>
                    <p className="text-sm">Foci = (&plusmn;c, 0), where c&sup2; = a&sup2; - b&sup2;</p>
                    <p className="text-sm">Eccentricity = e = c/a</p>
                  </div>
                  <div>
                    <p className="font-medium">Hyperbola:</p>
                    <p className="text-sm">x²/a² - y²/b² = 1</p>
                    <p className="text-sm">Foci = (±c, 0), where c² = a² + b²</p>
                    <p className="text-sm">Eccentricity = e = c/a</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculus" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 6: Calculus</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Limit:</h4>
                <p className="text-sm">lim_(x&rarr;a) f(x) = L if for every &epsilon; &gt; 0, there exists &delta; &gt; 0 such that |f(x) - L| &lt; &epsilon; whenever |x - a| &lt; &delta;.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Left-hand Limit:</p>
                    <p className="text-sm">lim_(x→a⁻) f(x)</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Right-hand Limit:</p>
                    <p className="text-sm">lim_(x→a⁺) f(x)</p>
                  </div>
                </div>
                <p className="text-sm mt-2">Limit exists if left-hand limit = right-hand limit.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Continuity:</h4>
                <p className="text-sm">A function f is continuous at x = a if:</p>
                <ol className="text-sm list-decimal pl-5 space-y-1">
                  <li>f(a) is defined</li>
                  <li>lim_(x→a) f(x) exists</li>
                  <li>lim_(x→a) f(x) = f(a)</li>
                </ol>
                <p className="text-sm mt-2"><strong>Types of Discontinuities:</strong></p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Removable:</p>
                    <p className="text-xs">Limit exists but not equal to f(a)</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Jump:</p>
                    <p className="text-xs">Left and right limits exist but not equal</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Infinite:</p>
                    <p className="text-xs">Limit approaches ±∞</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Differentiability:</h4>
                <p className="text-sm">A function is differentiable at x = a if:</p>
                <p className="text-sm mt-1">lim_(h→0) [f(a+h) - f(a)]/h exists.</p>
                <p className="text-sm mt-2"><strong>Differentiability ⇒ Continuity</strong> (but not conversely)</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Derivative:</h4>
                <p className="text-sm">Rate of change of a function with respect to its independent variable.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">f'(x) = dy/dx = lim_(h→0) [f(x+h) - f(x)]/h</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">Physical Meaning:</p>
                    <p className="text-xs">Slope of the tangent to the curve y = f(x) at point (x, f(x))</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Geometric Meaning:</p>
                    <p className="text-xs">Rate of change of y with respect to x</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Rules of Differentiation:</h4>
                <div className="space-y-2">
                  <p><strong>(1) Constant Rule:</strong> d/dx (c) = 0</p>
                  <p><strong>(2) Power Rule:</strong> d/dx (xⁿ) = n x^(n-1)</p>
                  <p><strong>(3) Sum Rule:</strong> d/dx (u ± v) = du/dx ± dv/dx</p>
                  <p><strong>(4) Product Rule:</strong> d/dx (uv) = u dv/dx + v du/dx</p>
                  <p><strong>(5) Quotient Rule:</strong> d/dx (u/v) = (v du/dx - u dv/dx)/v²</p>
                  <p><strong>(6) Chain Rule:</strong> d/dx f(g(x)) = f'(g(x)) · g'(x)</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Derivatives of Standard Functions:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Trigonometric:</p>
                    <p className="text-xs">sinx → cosx</p>
                    <p className="text-xs">cosx → -sinx</p>
                    <p className="text-xs">tanx → sec²x</p>
                    <p className="text-xs">cotx → -cosec²x</p>
                    <p className="text-xs">secx → secx tanx</p>
                    <p className="text-xs">cosecx → -cosecx cotx</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Inverse Trigonometric:</p>
                    <p className="text-xs">arcsinx → 1/√(1-x²)</p>
                    <p className="text-xs">arccosx → -1/√(1-x²)</p>
                    <p className="text-xs">arctanx → 1/(1+x²)</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Exponential & Logarithmic:</p>
                    <p className="text-xs">eˣ → eˣ</p>
                    <p className="text-xs">aˣ → aˣ ln a</p>
                    <p className="text-xs">lnx → 1/x</p>
                    <p className="text-xs">logₐx → 1/(x ln a)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Higher Order Derivatives:</h4>
                <p className="text-sm">Second derivative: f''(x) or d²y/dx²</p>
                <p className="text-sm">n-th derivative: f⁽ⁿ⁾(x) or dⁿy/dxⁿ</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Integral:</h4>
                <p className="text-sm">Inverse process of differentiation.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">∫ f(x) dx = F(x) + C</p>
                <p className="text-sm text-muted-foreground">where F'(x) = f(x), C = constant of integration</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">Indefinite Integral:</p>
                    <p className="text-sm">∫ f(x) dx = F(x) + C</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Definite Integral:</p>
                    <p className="text-sm">∫_a^b f(x) dx = F(b) - F(a)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Rules of Integration:</h4>
                <div className="space-y-2">
                  <p><strong>(1) Constant Rule:</strong> ∫ c dx = c x + C</p>
                  <p><strong>(2) Power Rule:</strong> ∫ xⁿ dx = x^(n+1)/(n+1) + C (n ≠ -1)</p>
                  <p><strong>(3) Sum Rule:</strong> ∫ [u ± v] dx = ∫ u dx ± ∫ v dx</p>
                  <p><strong>(4) Substitution:</strong> ∫ f(g(x)) g'(x) dx = ∫ f(u) du, where u = g(x)</p>
                  <p><strong>(5) Integration by Parts:</strong> ∫ u dv = uv - ∫ v du</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Standard Integrals:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Trigonometric:</p>
                    <p className="text-xs">∫ sinx dx = -cosx + C</p>
                    <p className="text-xs">∫ cosx dx = sinx + C</p>
                    <p className="text-xs">∫ tanx dx = -ln|cosx| + C</p>
                    <p className="text-xs">∫ cotx dx = ln|sinx| + C</p>
                    <p className="text-xs">∫ secx dx = ln|secx + tanx| + C</p>
                    <p className="text-xs">∫ cosecx dx = ln|cosecx - cotx| + C</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Exponential:</p>
                    <p className="text-xs">∫ eˣ dx = eˣ + C</p>
                    <p className="text-xs">∫ aˣ dx = aˣ/ln a + C</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Special:</p>
                    <p className="text-xs">∫ 1/x dx = ln|x| + C</p>
                    <p className="text-xs">∫ 1/(1+x²) dx = arctanx + C</p>
                    <p className="text-xs">∫ 1/√(1-x²) dx = arcsinx + C</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Application of Derivatives:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Slope of Tangent:</p>
                    <p className="text-sm">m = f'(x)</p>
                  </div>
                  <div>
                    <p className="font-medium">Equation of Tangent:</p>
                    <p className="text-sm">y - y₁ = m(x - x₁), where m = f'(x₁)</p>
                  </div>
                  <div>
                    <p className="font-medium">Equation of Normal:</p>
                    <p className="text-sm">y - y<sub>1</sub> = (-1/m)(x - x<sub>1</sub>), where m = f'(x<sub>1</sub>)</p>
                  </div>
                  <div>
                    <p className="font-medium">Increasing/Decreasing:</p>
                    <p className="text-sm">Increasing if f'(x) &gt; 0, Decreasing if f'(x) &lt; 0</p>
                  </div>
                  <div>
                    <p className="font-medium">Maxima/Minima:</p>
                    <p className="text-sm">Critical points: f'(x) = 0 or f'(x) does not exist</p>
                    <p className="text-xs"><strong>Second Derivative Test:</strong></p>
                    <p className="text-xs">f''(x) &gt; 0 at critical point &rarr; local minimum</p>
                    <p className="text-xs">f''(x) &lt; 0 at critical point &rarr; local maximum</p>
                    <p className="text-xs">f''(x) = 0 &rarr; test fails, use first derivative test</p>
                  </div>
                  <div>
                    <p className="font-medium">Concavity:</p>
                    <p className="text-sm">Concave up if f''(x) &gt; 0, Concave down if f''(x) &lt; 0</p>
                  </div>
                  <div>
                    <p className="font-medium">Inflection Point:</p>
                    <p className="text-sm">Point where concavity changes, f''(x) = 0 and changes sign</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Application of Integrals:</h4>
                <div className="space-y-2">
                  <p><strong>Area under curve:</strong> A = ∫_a^b f(x) dx</p>
                  <p><strong>Area between two curves:</strong> A = ∫_a^b |f(x) - g(x)| dx</p>
                  <p><strong>Volume of revolution:</strong> V = π ∫_a^b y² dx (about x-axis)</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 7: Statistics</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Measures of Central Tendency:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Mean (Average):</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">x̄ = Σx/n</p>
                    <p className="text-sm text-muted-foreground">For ungrouped data</p>
                  </div>
                  <div>
                    <p className="font-medium">Median:</p>
                    <p className="text-sm">Middle value when data is arranged in order.</p>
                    <p className="text-xs">For even n: Median = (n/2 th + (n/2+1) th)/2</p>
                  </div>
                  <div>
                    <p className="font-medium">Mode:</p>
                    <p className="text-sm">Most frequently occurring value.</p>
                  </div>
                </div>
                <p className="text-sm mt-3"><strong>Relation:</strong> 3 Median = Mode + 2 Mean (approximately for moderately asymmetric data)</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Measures of Dispersion:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Range:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">Range = Max - Min</p>
                  </div>
                  <div>
                    <p className="font-medium">Mean Deviation:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">MD = Σ|x - x̄|/n</p>
                  </div>
                  <div>
                    <p className="font-medium">Variance:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">σ² = Σ(x - x̄)²/n</p>
                  </div>
                  <div>
                    <p className="font-medium">Standard Deviation:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">σ = √(Σ(x - x̄)²/n)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Measures of Dispersion for Grouped Data:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Mean:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">x̄ = Σf_i x_i / Σf_i</p>
                  </div>
                  <div>
                    <p className="font-medium">Variance:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">σ² = Σf_i(x_i - x̄)² / Σf_i</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Coefficient of Variation:</h4>
                <p className="text-sm">Relative measure of dispersion.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">CV = (σ / x̄) × 100%</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Moments:</h4>
                <p className="text-sm">k-th moment about mean = (1/n) Σ(x_i - x̄)^k</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">First Moment:</p>
                    <p className="text-sm">(1/n) Σ(x_i - x̄) = 0</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Second Moment:</p>
                    <p className="text-sm">(1/n) Σ(x_i - x̄)² = σ²</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Third Moment:</p>
                    <p className="text-sm">Used to measure skewness</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Fourth Moment:</p>
                    <p className="text-sm">Used to measure kurtosis</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Skewness:</h4>
                <p className="text-sm">Measure of asymmetry of the distribution.</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Positive Skewness:</p>
                    <p className="text-xs">Mean &gt; Median &gt; Mode</p>
                    <p className="text-xs">Right-tailed distribution</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Negative Skewness:</p>
                    <p className="text-xs">Mean &lt; Median &lt; Mode</p>
                    <p className="text-xs">Left-tailed distribution</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Zero Skewness:</p>
                    <p className="text-xs">Mean = Median = Mode</p>
                    <p className="text-xs">Symmetric distribution</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Correlation:</h4>
                <p className="text-sm">Measure of linear relationship between two variables.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Karl Pearson's Coefficient:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">r = Cov(X,Y)/(σ_X σ_Y)</p>
                    <p className="text-sm text-muted-foreground">where Cov(X,Y) = (1/n) Σ(x_i - x̄)(y_i - ȳ)</p>
                    <p className="text-xs text-muted-foreground">-1 ≤ r ≤ 1</p>
                  </div>
                  <div>
                    <p className="font-medium">Spearman's Rank Coefficient:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">r_s = 1 - [6 Σd²]/[n(n²-1)]</p>
                    <p className="text-sm text-muted-foreground">where d = difference in ranks</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">r ≈ 1:</p>
                    <p className="text-xs">Perfect positive correlation</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">r ≈ -1:</p>
                    <p className="text-xs">Perfect negative correlation</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">r ≈ 0:</p>
                    <p className="text-xs">No correlation</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Regression:</h4>
                <p className="text-sm">Estimation of relationship between variables.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Regression Line of Y on X:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">Y - ȳ = b_xy (X - x̄)</p>
                    <p className="text-sm text-muted-foreground">where b_xy = r (σ_Y/σ_X)</p>
                  </div>
                  <div>
                    <p className="font-medium">Regression Line of X on Y:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">X - x̄ = b_yx (Y - ȳ)</p>
                    <p className="text-sm text-muted-foreground">where b_yx = r (σ_X/σ_Y)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Class11MathTheory;

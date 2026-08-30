"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// DEEP Grade 11 Mathematics Theory: Probability and Statistics
// NEB/CDC Class 11 - Statistics and Probability
// Specific to Nepal curriculum with peculiar exam-focused facts, not general knowledge

export const Class11MathTheoryProbability: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Mathematics - Probability & Statistics (NEB Curriculum)</CardTitle>
        <CardDescription>
          Deep dive into NEB/CDC Grade 11 Statistics and Probability: Measures of Central Tendency, Dispersion, Probability Theory, Binomial Distribution, Normal Distribution - with peculiar Nepal-specific exam facts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* NEB/CDC Specific Syllabus Mapping */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Syllabus Reference</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Chapter:</strong> Statistics and Probability
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Weightage:</strong> 10-12 marks (High weightage - always 1 numerical + 1-2 theory questions)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Pre-requisite:</strong> Algebra, Basic arithmetic
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Exam Pattern:</strong> 1 Numerical (5 marks) + 1 Theory (5 marks) + Short questions (2-3 marks)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Practical:</strong> Data collection and analysis projects
          </p>
        </div>

        {/* Measures of Central Tendency - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Measures of Central Tendency (NEB Precise Definitions)</h4>
          
          <div className="space-y-6">
            {/* Mean */}
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-3">Arithmetic Mean (A.M.)</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium mb-2">Simple Mean (Ungrouped):</p>
                  <p className="font-mono text-lg">X̄ = Σx / n</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>Σx = Sum of all observations</li>
                    <li>n = Number of observations</li>
                    <li>Best for: Symmetric distributions</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Direct Method (Grouped):</p>
                  <p className="font-mono text-lg">X̄ = Σ(f x) / Σf</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>f = frequency of each class</li>
                    <li>x = mid-point of each class</li>
                    <li>Used when class intervals are equal</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Assumed Mean Method:</p>
                  <p className="font-mono text-lg">X̄ = A + Σ(f d) / Σf</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>A = Assumed mean (any central value)</li>
                    <li>d = x - A (deviation from A)</li>
                    <li>Faster calculation for large data</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium mb-2">Step-Deviation Method:</p>
                <p className="font-mono text-lg">X̄ = A + (Σ(f u) / Σf) × h</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                  <li>A = Assumed mean</li>
                  <li>u = (x - A) / h (step deviation)</li>
                  <li>h = class width</li>
                  <li>Most efficient for grouped data</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-amber-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-amber-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Mean is affected by <strong>extreme values</strong> (outliers)</li>
                  <li>If all values are multiplied by k, mean is <strong>multiplied by k</strong></li>
                  <li>If all values are increased by k, mean is <strong>increased by k</strong></li>
                  <li>Mean of first n natural numbers: <strong>(n+1)/2</strong></li>
                  <li>Mean of squares of first n natural numbers: <strong>(n+1)(2n+1)/6</strong></li>
                  <li><strong>Σx = n X̄</strong> (very useful for finding missing values)</li>
                  <li>If Σ(x - a) = 0, then <strong>a = X̄</strong></li>
                </ul>
              </div>
            </div>
            
            {/* Median */}
            <div className="bg-green-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-green-600 mb-3">Median (Middle Value)</h5>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The value that divides the data into <strong>two equal parts</strong>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Ungrouped Data:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                    <li>Arrange data in ascending order</li>
                    <li>If n is odd: Median = (n+1)/2 th term</li>
                    <li>If n is even: Median = average of (n/2)th and (n/2 + 1)th terms</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium mb-2">Grouped Data:</p>
                  <p className="font-mono text-lg">Median = L + (h/f) (n/2 - C)</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>L = Lower boundary of median class</li>
                    <li>h = Width of median class</li>
                    <li>f = Frequency of median class</li>
                    <li>C = Cumulative frequency before median class</li>
                    <li>n = Total number of observations</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-purple-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-purple-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Median is <strong>not affected by extreme values</strong></li>
                  <li>Median can be calculated for <strong>qualitative data</strong> (after ranking)</li>
                  <li>For symmetric distribution: <strong>Mean = Median = Mode</strong></li>
                  <li>For positively skewed: <strong>Mean &gt; Median &gt; Mode</strong></li>
                  <li>For negatively skewed: <strong>Mean &lt; Median &lt; Mode</strong></li>
                  <li>Median divides the area of histogram into <strong>two equal parts</strong></li>
                </ul>
              </div>
            </div>
            
            {/* Mode */}
            <div className="bg-orange-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-orange-600 mb-3">Mode (Most Frequent Value)</h5>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The value that occurs <strong>most frequently</strong> in the data set.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Ungrouped Data:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Find the value with highest frequency</li>
                    <li>Can have multiple modes (bi-modal, multi-modal)</li>
                    <li>Can be no mode (all values unique)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Grouped Data:</p>
                  <p className="font-mono text-lg">Mode = L + (h (f₁ - f₀)) / (2f₁ - f₀ - f₂)</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>L = Lower boundary of modal class</li>
                    <li>h = Width of modal class</li>
                    <li>f₁ = Frequency of modal class</li>
                    <li>f₀ = Frequency of class before modal class</li>
                    <li>f₂ = Frequency of class after modal class</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-red-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-red-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Mode is the <strong>least stable</strong> measure of central tendency</li>
                  <li>Mode can be found <strong>graphically</strong> from histogram</li>
                  <li>For uniform distribution: <strong>All values are modes</strong></li>
                  <li>Mode is used for <strong>manufacturing</strong> (most demanded size)</li>
                  <li>In symmetrical distribution: <strong>Mode = 3 Median - 2 Mean</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Measures of Dispersion - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Measures of Dispersion (NEB Exam Focus)</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Measure the <strong>scatter</strong> or <strong>spread</strong> of data around the central value.
          </p>
          
          <div className="space-y-4">
            {/* Range */}
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-2">Range</h5>
              <p className="font-mono text-lg">Range = Maximum value - Minimum value</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                <li>Simplest measure of dispersion</li>
                <li>Highly affected by <strong>extreme values</strong></li>
                <li>Coefficient of Range = (Max - Min) / (Max + Min)</li>
              </ul>
            </div>
            
            {/* Quartile Deviation */}
            <div className="bg-green-500/10 p-3 rounded-lg">
              <h5 className="font-medium text-green-600 mb-2">Quartile Deviation (Q.D.)</h5>
              <p className="font-mono text-lg">Q.D. = (Q₃ - Q₁) / 2</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                <li>Also called Semi-Interquartile Range (S.I.R.)</li>
                <li>Not affected by extreme values</li>
                <li>Best for <strong>open-ended distributions</strong></li>
                <li>Coefficient of Q.D. = (Q₃ - Q₁) / (Q₃ + Q₁)</li>
              </ul>
            </div>
            
            {/* Mean Deviation */}
            <div className="bg-orange-500/10 p-3 rounded-lg">
              <h5 className="font-medium text-orange-600 mb-2">Mean Deviation (M.D.)</h5>
              <p className="font-mono text-lg">M.D. = Σ|x - X̄| / n</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                <li>Based on <strong>absolute deviations</strong> from mean</li>
                <li>Less affected by extreme values than range</li>
                <li>For grouped data: M.D. = Σf|x - X̄| / Σf</li>
                <li>Coefficient of M.D. = M.D. / X̄</li>
              </ul>
            </div>
            
            {/* Standard Deviation */}
            <div className="bg-red-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-red-600 mb-3">Standard Deviation (σ) - NEB Most Important</h5>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The <strong>root mean square</strong> deviation of values from their mean.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Ungrouped Data:</p>
                  <p className="font-mono text-lg">σ = √[Σ(x - X̄)² / n]</p>
                  <p className="font-mono text-lg">OR σ² = Σx²/n - (X̄)²</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>Variance = σ²</li>
                    <li>Most stable measure of dispersion</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Grouped Data:</p>
                  <p className="font-mono text-lg">σ = √[Σf(x - X̄)² / Σf]</p>
                  <p className="font-mono text-sm">OR σ² = Σfx²/Σf - (X̄)²</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>More accurate for grouped data</li>
                    <li>Used in advanced statistics</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-purple-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-purple-600 mb-2">Coefficient of Variation (C.V.):</h5>
                <p className="font-mono text-lg">C.V. = (σ / X̄) × 100%</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                  <li>Compares dispersion of <strong>two different datasets</strong></li>
                  <li>Independent of units (dimensionless)</li>
                  <li>Lower C.V. = More consistent data</li>
                  <li>If C.V. &lt; 10%: Highly consistent</li>
                  <li>If C.V. &gt; 20%: Highly variable</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-cyan-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-cyan-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Chebyshev&apos;s Theorem:</strong> For any distribution, at least (1 - 1/k²) × 100% of data lies within X̄ ± kσ</li>
                  <li><strong>Empirical Rule (Normal Distribution):</strong> 68% within X̄ ± σ, 95% within X̄ ± 2σ, 99.7% within X̄ ± 3σ</li>
                  <li>If all values are multiplied by k: σ is <strong>multiplied by |k|</strong></li>
                  <li>If all values are increased by k: σ <strong>remains unchanged</strong></li>
                  <li>Standard deviation of first n natural numbers: <strong>√[(n² - 1)/12]</strong></li>
                  <li><strong>σ₁² + σ₂² + 2rσ₁σ₂ = σ₁₊₂²</strong> (for combined data)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Probability Theory - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Probability Theory (NEB Chapter Specific)</h4>
          
          <div className="space-y-6">
            {/* Basic Definitions */}
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-3">Fundamental Definitions</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Experiment:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Process with <strong>well-defined outcomes</strong></li>
                    <li>Example: Tossing a coin, rolling a die</li>
                  </ul>
                  <p className="font-medium mb-2 mt-3">Sample Space (S):</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Set of <strong>all possible outcomes</strong></li>
                    <li>Example: S = {'{H, T}'} for coin toss</li>
                    <li>n(S) = Total number of possible outcomes</li>
                  </ul>
                  <p className="font-medium mb-2 mt-3">Event (E):</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Subset of sample space</li>
                    <li>Example: E = {'{H}'} for getting head</li>
                    <li>n(E) = Number of favorable outcomes</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Probability Definition:</p>
                  <p className="font-mono text-lg">P(E) = n(E) / n(S)</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>0 ≤ P(E) ≤ 1</li>
                    <li>P(Impossible event) = 0</li>
                    <li>P(Certain event) = 1</li>
                  </ul>
                  <p className="font-medium mb-2 mt-3">Complementary Event (E&apos;):</p>
                  <p className="font-mono text-lg">P(E) + P(E&apos;) = 1</p>
                  <p className="text-sm text-muted-foreground mt-1">P(E&apos;) = 1 - P(E)</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-green-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-green-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Classical Definition:</strong> Applicable when outcomes are equally likely</li>
                  <li><strong>Statistical Definition:</strong> P(E) = lim (m/n) as n→∞ (m = frequency of E)</li>
                  <li><strong>Subjective Definition:</strong> Based on personal belief/opinion</li>
                  <li><strong>Odds in Favor:</strong> n(E) : n(E&apos;)</li>
                  <li><strong>Odds Against:</strong> n(E&apos;) : n(E)</li>
                </ul>
              </div>
            </div>
            
            {/* Probability Rules */}
            <div className="bg-orange-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-orange-600 mb-3">Probability Rules (NEB Exam Critical)</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Addition Rule (OR):</p>
                  <p className="font-mono text-lg">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    For mutually exclusive events: P(A ∪ B) = P(A) + P(B)
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>Mutually exclusive: P(A ∩ B) = 0</li>
                    <li>Exhaustive: P(A) + P(B) + ... = 1</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Multiplication Rule (AND):</p>
                  <p className="font-mono text-lg">P(A ∩ B) = P(A) × P(B|A)</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    For independent events: P(A ∩ B) = P(A) × P(B)
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                    <li>Independent: P(B|A) = P(B)</li>
                    <li>Conditional Probability: P(B|A) = P(A ∩ B) / P(A)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-medium text-primary mb-2">Other Important Rules:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Probability of At Least One:</p>
                    <p className="font-mono">P(at least one) = 1 - P(none)</p>
                    <p className="text-sm text-muted-foreground">Example: P(at least one head in 3 tosses) = 1 - P(no head) = 1 - (1/2)³ = 7/8</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Probability of Exactly k:</p>
                    <p className="font-mono">P(exactly k) = P(at most k) - P(at most k-1)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border bg-purple-500/10 p-3 rounded-lg">
                <h5 className="font-medium text-purple-600 mb-2">PECULIAR NEB FACTS:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>If A ⊆ B, then P(A) ≤ P(B)</li>
                  <li>P(A ∪ B) ≤ P(A) + P(B) (Equality for mutually exclusive)</li>
                  <li>P(A ∩ B) ≥ P(A) + P(B) - 1</li>
                  <li><strong>Boole&apos;s Inequality:</strong> P(A₁ ∪ A₂ ∪ ... ∪ Aₙ) ≤ ΣP(Aᵢ)</li>
                  <li><strong>Bayes&apos; Theorem:</strong> P(B|A) = P(A|B) P(B) / P(A)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Binomial Distribution - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Binomial Distribution (NEB Chapter Specific)</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Discrete probability distribution for <strong>n independent trials</strong> with <strong>two possible outcomes</strong> (success/failure) and <strong>constant probability of success</strong>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-cyan-600 mb-3">Conditions (Bernoulli Trials):</h5>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li><strong>Fixed number of trials (n):</strong> Known in advance</li>
                <li><strong>Independent trials:</strong> Outcome of one doesn&apos;t affect others</li>
                <li><strong>Two possible outcomes:</strong> Success (p) and Failure (q = 1-p)</li>
                <li><strong>Constant probability:</strong> Probability of success remains same for all trials</li>
              </ol>
              
              <div className="mt-4 pt-3 border-t border-border">
                <p className="font-medium mb-2">Probability Mass Function:</p>
                <p className="font-mono text-lg">P(X = k) = C(n, k) pᵏ qⁿ⁻ᵏ</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                  <li>k = number of successes (0, 1, 2, ..., n)</li>
                  <li>C(n, k) = n! / (k! (n-k)!) = Binomial coefficient</li>
                  <li>p = probability of success</li>
                  <li>q = probability of failure = 1 - p</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-orange-600 mb-3">Parameters:</h5>
              <p className="font-medium">Mean (μ):</p>
              <p className="font-mono text-lg">μ = n p</p>
              <p className="text-sm text-muted-foreground mb-3">
                Variance (σ²): σ² = n p q
              </p>
              <p className="font-medium mb-2">Standard Deviation (σ):</p>
              <p className="font-mono text-lg">σ = √(n p q)</p>
              <p className="text-sm text-muted-foreground mt-2">
                For Binomial distribution: <strong>Mean &gt; Variance</strong> (since q &lt; 1)
              </p>
              
              <div className="mt-4 pt-3 border-t border-border">
                <h5 className="font-medium text-primary mb-2">Special Cases:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>p = q = 0.5: Symmetric distribution</li>
                  <li>p = 1: All trials successful (degenerate at n)</li>
                  <li>p = 0: All trials failure (degenerate at 0)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-green-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-green-600 mb-2">PECULIAR NEB FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Binomial distribution is <strong>discrete</strong> (only integer values)</li>
              <li>Sum of all probabilities: <strong>Σ P(X=k) from k=0 to n = 1</strong></li>
              <li>Mode = <strong>floor((n+1)p)</strong> or <strong>ceil((n+1)p - 1)</strong></li>
              <li>Skewness: <strong>(q - p) / √(npq)</strong> (positive if p &lt; 0.5, negative if p &gt; 0.5)</li>
              <li>If n is large and p is small: <strong>Poisson approximation</strong> (λ = np)</li>
              <li>If n is large and p near 0.5: <strong>Normal approximation</strong></li>
              <li><strong>Recurrence Relation:</strong> P(X=k+1) = (n-k)/(k+1) × (p/q) × P(X=k)</li>
            </ul>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-amber-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-amber-600 mb-2">NEB EXAM APPLICATIONS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Number of heads in n coin tosses (p = 0.5)</li>
              <li>Number of boys in n children (p = 0.5)</li>
              <li>Number of defective items in sample of n (p = defect rate)</li>
              <li>Number of questions answered correctly in MCQ test</li>
              <li>Probability of exactly k successes in n trials</li>
            </ul>
          </div>
        </div>

        {/* Normal Distribution - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Normal Distribution (NEB Chapter Specific)</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Continuous probability distribution characterized by its <strong>bell-shaped, symmetric curve</strong> about the mean.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-3">Probability Density Function:</h5>
              <p className="font-mono text-lg">f(x) = (1/σ√2π) e<sup>-½((x-μ)/σ)²</sup></p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-3">
                <li>μ = mean (center of distribution)</li>
                <li>σ = standard deviation (spread of distribution)</li>
                <li>σ² = variance</li>
                <li>E(x) = μ (expected value = mean)</li>
                <li>Var(x) = σ²</li>
              </ul>
              
              <div className="mt-4 pt-3 border-t border-border">
                <h5 className="font-medium text-primary mb-2">Properties:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Symmetric about mean: <strong>μ = median = mode</strong></li>
                  <li>Area under curve = <strong>1</strong> (total probability = 1)</li>
                  <li>Points of inflection at <strong>μ ± σ</strong></li>
                  <li>Asymptotic to x-axis: <strong>lim f(x) = 0 as x → ±∞</strong></li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-green-600 mb-3">Standard Normal Distribution:</h5>
              <p className="font-mono text-lg">Z = (X - μ) / σ</p>
              <p className="text-sm text-muted-foreground mt-2">
                Z follows standard normal distribution N(0, 1)
              </p>
              
              <div className="mt-4 pt-3 border-t border-border">
                <h5 className="font-medium text-primary mb-2">Standard Normal Table:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Gives area from 0 to Z: <strong>Φ(Z)</strong></li>
                  <li>P(0 ≤ Z ≤ z) = Φ(z)</li>
                  <li>P(Z ≤ z) = 0.5 + Φ(z) for z &gt; 0</li>
                  <li>P(Z ≤ -z) = 0.5 - Φ(z) for z &gt; 0</li>
                  <li>P(a ≤ Z ≤ b) = Φ(b) - Φ(a)</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border bg-cyan-500/10 p-2 rounded">
                <h5 className="font-medium text-cyan-600 mb-2">NEB Table Values:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Φ(1) = 0.3413 → P(0 ≤ Z ≤ 1) = 0.3413</li>
                  <li>Φ(1.96) = 0.4750 → P(-1.96 ≤ Z ≤ 1.96) = 0.95 (95% confidence)</li>
                  <li>Φ(2.58) = 0.4950 → P(-2.58 ≤ Z ≤ 2.58) = 0.99 (99% confidence)</li>
                  <li>Φ(3) = 0.4986 → P(|Z| ≤ 3) ≈ 0.997 (99.7% for normal distribution)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-orange-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-orange-600 mb-2">Empirical Rule (NEB Exam Essential):</h5>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li><strong>68.27%</strong> of data lies within μ ± σ</li>
              <li><strong>95.45%</strong> of data lies within μ ± 2σ</li>
              <li><strong>99.73%</strong> of data lies within μ ± 3σ</li>
              <li>Approximately <strong>0.3%</strong> of data lies beyond μ ± 3σ</li>
            </ul>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-purple-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-purple-600 mb-2">PECULIAR NEB FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Normal distribution is <strong>continuous</strong> and <strong>symmetric</strong></li>
              <li>Also called <strong>Gaussian distribution</strong></li>
              <li><strong>Central Limit Theorem:</strong> Sum of large number of independent random variables (regardless of distribution) tends to normal distribution</li>
              <li>Many natural phenomena follow normal distribution: heights, IQ scores, measurement errors</li>
              <li>For any normal distribution: <strong>Q₁ = μ - 0.6745σ, Q₃ = μ + 0.6745σ</strong></li>
              <li><strong>Skewness = 0</strong> (perfectly symmetric)</li>
              <li><strong>Kurtosis = 3</strong> (mesokurtic)</li>
              <li><strong>Moment Generating Function:</strong> M(t) = exp(μt + ½σ²t²)</li>
            </ul>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="rounded-md border-2 border-amber-500 bg-amber-500/10 p-4">
          <h4 className="font-semibold mb-3 text-amber-600">NEB EXAM TIPS - Statistics & Probability</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-primary mb-2">High Weightage Topics:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Standard deviation calculations</li>
                <li>Binomial distribution problems</li>
                <li>Normal distribution applications</li>
                <li>Probability conditional problems</li>
                <li>Coefficient of variation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Common Mistakes:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Forgetting to divide by n in mean calculation</li>
                <li>Using class mark instead of mid-point</li>
                <li>Wrong formula for variance (use Σx²/n - X̄²)</li>
                <li>Incorrect cumulative frequency in median</li>
                <li>Forgetting absolute value in mean deviation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Important Constants:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Σ(x - X̄) = 0 (always true)</li>
                <li>Σ(x - X̄)² is minimum</li>
                <li>Σ(x - a)² = Σ(x - X̄)² + n(X̄ - a)²</li>
                <li>For standard normal: μ = 0, σ = 1</li>
                <li>Φ(∞) = 0.5</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11MathTheoryProbability;

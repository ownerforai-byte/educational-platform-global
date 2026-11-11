# Math 3D Topic Mappings — Changes for topic-3d-map.ts

Apply these exact replacements to `frontend/lib/topic-3d-map.ts`.
Add new imports at the top (after existing imports), then replace each `make(...)` line with `makeTopic(...)`.

## New Imports (add after line 11)

```typescript
import { LogicSetVisual } from "@/components/lab/topic-visuals/logic-set";
import { RealNumbersVisual } from "@/components/lab/topic-visuals/real-numbers";
import { FunctionVisual } from "@/components/lab/topic-visuals/function-graphs";
import { CurveSketchingVisual } from "@/components/lab/topic-visuals/curve-sketching";
import { SequenceSeriesVisual } from "@/components/lab/topic-visuals/sequence-series";
import { MatricesDeterminantsVisual } from "@/components/lab/topic-visuals/matrices-determinants";
import { InverseTrigVisual } from "@/components/lab/topic-visuals/inverse-trig";
import { TrigEquationsVisual } from "@/components/lab/topic-visuals/trigonometric-eq";
import { MeasureDispersionVisual } from "@/components/lab/topic-visuals/measure-dispersion";
import { ProbabilityBasicVisual } from "@/components/lab/topic-visuals/probability-basic";
import { NumericalComputationVisual } from "@/components/lab/topic-visuals/numerical-computation";
import { NumericalIntegrationVisual } from "@/components/lab/topic-visuals/numerical-integration";
import { StaticsVisual } from "@/components/lab/topic-visuals/statics";
import { DynamicsVisual } from "@/components/lab/topic-visuals/dynamics";
import { FormationDEVisual } from "@/components/lab/topic-visuals/formation-de";
import { VariableSeparableDEVisual } from "@/components/lab/topic-visuals/variable-separable-de";
import { GrowthDecayDEVisual } from "@/components/lab/topic-visuals/growth-decay";
import { LPPFormulationVisual } from "@/components/lab/topic-visuals/lpp-formulation";
import { LPPGraphicalVisual } from "@/components/lab/topic-visuals/lpp-graphical";
import { ConditionalProbabilityVisual } from "@/components/lab/topic-visuals/conditional-prob";
import { IndependentEventsVisual } from "@/components/lab/topic-visuals/independent-events";
import { BayesTheoremVisual } from "@/components/lab/topic-visuals/bayes-theorem";
import { RandomVariableVisual } from "@/components/lab/topic-visuals/random-variable";
import { MeanVarianceVisual } from "@/components/lab/topic-visuals/mean-variance";
import { BinomialDistVisual } from "@/components/lab/topic-visuals/binomial-dist";
import { PoissonDistVisual } from "@/components/lab/topic-visuals/poisson-dist";
```

---

## MATH_11 Changes (replace lines ~434–468)

### Line ~435: algebra → Logic & Sets
**Replace:**
```typescript
"logic-and-set-statements-logical-connectives-truth-tables-theorems-based-on-set-operations": make("set", "Logic & Sets", "algebra", "mathematics"),
```
**With:**
```typescript
"logic-and-set-statements-logical-connectives-truth-tables-theorems-based-on-set-operations": makeTopic(LogicSetVisual, "Logic & Sets"),
```

### Line ~436: real-numbers
**Replace:**
```typescript
"real-numbers-geometric-representation-of-real-numbers-interval-absolute-value": make("real number", "Real Numbers", "algebra", "mathematics"),
```
**With:**
```typescript
"real-numbers-geometric-representation-of-real-numbers-interval-absolute-value": makeTopic(RealNumbersVisual, "Real Numbers"),
```

### Line ~437: function-domain-and-range
**Replace:**
```typescript
"function-domain-and-range-of-a-function-inverse-function-composite-function-algebraic-linear-quadratic-and-cubic-and-transcendental-trigonometric-exponential-logarithmic-functions": make("function", "Functions", "algebra", "mathematics"),
```
**With:**
```typescript
"function-domain-and-range-of-a-function-inverse-function-composite-function-algebraic-linear-quadratic-and-cubic-and-transcendental-trigonometric-exponential-logarithmic-functions": makeTopic(FunctionVisual, "Functions"),
```

### Line ~438: curve-sketching
**Replace:**
```typescript
"curve-sketching-odd-and-even-functions-periodicity-symmetry-about-origin-x-and-y-axis-monotonicity-graphs-of-quadratic-cubic-and-rational-functions-trigonometric-asinbx-and-acosbx-exponential-ex-lnx": make("curve sketching", "Curve Sketching", "algebra", "mathematics"),
```
**With:**
```typescript
"curve-sketching-odd-and-even-functions-periodicity-symmetry-about-origin-x-and-y-axis-monotonicity-graphs-of-quadratic-cubic-and-rational-functions-trigonometric-asinbx-and-acosbx-exponential-ex-lnx": makeTopic(CurveSketchingVisual, "Curve Sketching"),
```

### Line ~439: sequence-and-series
**Replace:**
```typescript
"sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-am-gm-hm-and-their-relations-sum-of-infinite-geometric-series": make("sequence", "Sequences & Series", "algebra", "mathematics"),
```
**With:**
```typescript
"sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-am-gm-hm-and-their-relations-sum-of-infinite-geometric-series": makeTopic(SequenceSeriesVisual, "Sequences & Series"),
```

### Line ~440: matrices-and-determinants
**Replace:**
```typescript
"matrices-and-determinants-transpose-of-a-matrix-and-its-properties-minors-and-cofactors-adjoint-inverse-matrix-determinant-properties-of-determinants-without-proof": make("matrix", "Matrices & Determinants", "algebra", "mathematics"),
```
**With:**
```typescript
"matrices-and-determinants-transpose-of-a-matrix-and-its-properties-minors-and-cofactors-adjoint-inverse-matrix-determinant-properties-of-determinants-without-proof": makeTopic(MatricesDeterminantsVisual, "Matrices & Determinants"),
```

### Line ~444: inverse-circular-functions
**Replace:**
```typescript
"inverse-circular-functions": make("inverse circular", "Inverse Circular Functions", "trigonometry", "mathematics"),
```
**With:**
```typescript
"inverse-circular-functions": makeTopic(InverseTrigVisual, "Inverse Circular Functions"),
```

### Line ~445: trigonometric-equations
**Replace:**
```typescript
"trigonometric-equations-and-general-values": make("trigonometric equation", "Trigonometric Equations", "trigonometry", "mathematics"),
```
**With:**
```typescript
"trigonometric-equations-and-general-values": makeTopic(TrigEquationsVisual, "Trigonometric Equations"),
```

### Line ~454: measure-of-dispersion
**Replace:**
```typescript
"measure-of-dispersion-standard-deviation-variance-coefficient-of-variation-skewness-karl-pearsons-coefficient-of-skewness": make("standard deviation", "Measure of Dispersion", "statistics-and-probability", "mathematics"),
```
**With:**
```typescript
"measure-of-dispersion-standard-deviation-variance-coefficient-of-variation-skewness-karl-pearsons-coefficient-of-skewness": makeTopic(MeasureDispersionVisual, "Measure of Dispersion"),
```

### Line ~455: probability-independent-cases
**Replace:**
```typescript
"probability-independent-cases-mathematical-and-empirical-definition-of-probability-two-basic-laws-of-probability-without-proof": make("probability", "Probability", "statistics-and-probability", "mathematics"),
```
**With:**
```typescript
"probability-independent-cases-mathematical-and-empirical-definition-of-probability-two-basic-laws-of-probability-without-proof": makeTopic(ProbabilityBasicVisual, "Probability"),
```

### Lines ~464–468: computational-methods-or-mechanics
**Replace:**
```typescript
"computational-methods-or-mechanics": make("numerical computation", "Computational Methods", "computational-methods-or-mechanics", "mathematics"),
"numerical-computation-roots-of-algebraic-and-transcendental-equations-bisection-and-newton-raphson-method": make("bisection", "Roots of Equations", "computational-methods-or-mechanics", "mathematics"),
"numerical-integration-trapezoidal-rule-and-simpsons-rule": make("trapezoidal", "Numerical Integration", "computational-methods-or-mechanics", "mathematics"),
"mechanics-optional-statics-forces-and-resultant-forces-parallelogram-law-of-forces-composition-and-resolution-of-forces-resultant-of-coplanar-forces-acting-on-a-point": make("parallelogram law", "Statics", "computational-methods-or-mechanics", "mathematics"),
"mechanics-optional-dynamics-motion-of-particle-in-a-straight-line-motion-with-uniform-acceleration-motion-under-gravity-motion-down-a-smooth-inclined-plane": make("uniform acceleration", "Dynamics", "computational-methods-or-mechanics", "mathematics"),
```
**With:**
```typescript
"computational-methods-or-mechanics": makeTopic(NumericalComputationVisual, "Computational Methods"),
"numerical-computation-roots-of-algebraic-and-transcendental-equations-bisection-and-newton-raphson-method": makeTopic(NumericalComputationVisual, "Roots of Equations"),
"numerical-integration-trapezoidal-rule-and-simpsons-rule": makeTopic(NumericalIntegrationVisual, "Numerical Integration"),
"mechanics-optional-statics-forces-and-resultant-forces-parallelogram-law-of-forces-composition-and-resolution-of-forces-resultant-of-coplanar-forces-acting-on-a-point": makeTopic(StaticsVisual, "Statics"),
"mechanics-optional-dynamics-motion-of-particle-in-a-straight-line-motion-with-uniform-acceleration-motion-under-gravity-motion-down-a-smooth-inclined-plane": makeTopic(DynamicsVisual, "Dynamics"),
```

---

## MATH_12 Changes (replace lines ~619–648)

### Line ~619: differential-equations (unit heading)
**Replace:**
```typescript
"differential-equations": make("differential equation", "Differential Equations", "differential-equations", "mathematics"),
```
**With:**
```typescript
"differential-equations": makeTopic(FormationDEVisual, "Differential Equations"),
```

### Line ~620: formation-of-differential-equations
**Replace:**
```typescript
"formation-of-differential-equations": make("differential equation", "Formation", "differential-equations", "mathematics"),
```
**With:**
```typescript
"formation-of-differential-equations": makeTopic(FormationDEVisual, "Formation"),
```

### Line ~621: solving-first-order-first-degree-equations-variable-separable-homogeneous-linear
**Replace:**
```typescript
"solving-first-order-first-degree-equations-variable-separable-homogeneous-linear": make("variable separable", "Solving DE", "differential-equations", "mathematics"),
```
**With:**
```typescript
"solving-first-order-first-degree-equations-variable-separable-homogeneous-linear": makeTopic(VariableSeparableDEVisual, "Solving DE"),
```

### Line ~622: applications-growth-and-decay-population-dynamics
**Replace:**
```typescript
"applications-growth-and-decay-population-dynamics": make("growth", "Growth & Decay", "differential-equations", "mathematics"),
```
**With:**
```typescript
"applications-growth-and-decay-population-dynamics": makeTopic(GrowthDecayDEVisual, "Growth & Decay"),
```

### Line ~636: linear-programming (unit heading)
**Replace:**
```typescript
"linear-programming": make("linear programming", "Linear Programming", "linear-programming", "mathematics"),
```
**With:**
```typescript
"linear-programming": makeTopic(LPPFormulationVisual, "Linear Programming"),
```

### Line ~637: linear-programming-formulation-of-lpp
**Replace:**
```typescript
"linear-programming-formulation-of-lpp": make("linear programming", "Formulation of LPP", "linear-programming", "mathematics"),
```
**With:**
```typescript
"linear-programming-formulation-of-lpp": makeTopic(LPPFormulationVisual, "Formulation of LPP"),
```

### Line ~638: graphical-method-for-solving-lpp-with-two-variables
**Replace:**
```typescript
"graphical-method-for-solving-lpp-with-two-variables": make("graphical method", "Graphical Method", "linear-programming", "mathematics"),
```
**With:**
```typescript
"graphical-method-for-solving-lpp-with-two-variables": makeTopic(LPPGraphicalVisual, "Graphical Method"),
```

### Line ~639: maximization-and-minimization-problems
**Replace:**
```typescript
"maximization-and-minimization-problems": make("maximization", "Max/Min Problems", "linear-programming", "mathematics"),
```
**With:**
```typescript
"maximization-and-minimization-problems": makeTopic(LPPGraphicalVisual, "Max/Min Problems"),
```

### Line ~640: probability (unit heading)
**Replace:**
```typescript
"probability": make("probability", "Probability", "probability", "mathematics"),
```
**With:**
```typescript
"probability": makeTopic(RandomVariableVisual, "Probability"),
```

### Line ~641: conditional-probability-and-multiplication-theorem
**Replace:**
```typescript
"conditional-probability-and-multiplication-theorem": make("conditional probability", "Conditional Probability", "probability", "mathematics"),
```
**With:**
```typescript
"conditional-probability-and-multiplication-theorem": makeTopic(ConditionalProbabilityVisual, "Conditional Probability"),
```

### Line ~642: independent-events
**Replace:**
```typescript
"independent-events": make("independent", "Independent Events", "probability", "mathematics"),
```
**With:**
```typescript
"independent-events": make("independent", "Independent Events", "probability", "mathematics"),
```
**Note:** This also needs to be changed to makeTopic. Replace with:
```typescript
"independent-events": makeTopic(IndependentEventsVisual, "Independent Events"),
```

### Line ~643: bayes-theorem-and-its-applications
**Replace:**
```typescript
"bayes-theorem-and-its-applications": make("bayes", "Bayes' Theorem", "probability", "mathematics"),
```
**With:**
```typescript
"bayes-theorem-and-its-applications": makeTopic(BayesTheoremVisual, "Bayes' Theorem"),
```

### Line ~644: random-variable-and-its-probability-distribution
**Replace:**
```typescript
"random-variable-and-its-probability-distribution": make("random variable", "Random Variable", "probability", "mathematics"),
```
**With:**
```typescript
"random-variable-and-its-probability-distribution": makeTopic(RandomVariableVisual, "Random Variable"),
```

### Line ~645: mean-variance-and-standard-deviation-of-a-random-variable
**Replace:**
```typescript
"mean-variance-and-standard-deviation-of-a-random-variable": make("variance", "Mean & Variance", "probability", "mathematics"),
```
**With:**
```typescript
"mean-variance-and-standard-deviation-of-a-random-variable": makeTopic(MeanVarianceVisual, "Mean & Variance"),
```

### Line ~646: binomial-distribution-definition-mean-variance
**Replace:**
```typescript
"binomial-distribution-definition-mean-variance": make("binomial", "Binomial Distribution", "probability", "mathematics"),
```
**With:**
```typescript
"binomial-distribution-definition-mean-variance": makeTopic(BinomialDistVisual, "Binomial Distribution"),
```

### Line ~647: poisson-distribution-definition-mean-variance
**Replace:**
```typescript
"poisson-distribution-definition-mean-variance": make("poisson", "Poisson Distribution", "probability", "mathematics"),
```
**With:**
```typescript
"poisson-distribution-definition-mean-variance": makeTopic(PoissonDistVisual, "Poisson Distribution"),
```

---

## Summary

| File Created | Topic Slug(s) it covers |
|---|---|
| `logic-set.tsx` | logic-and-set-... |
| `real-numbers.tsx` | real-numbers-... |
| `function-graphs.tsx` | function-domain-and-range-... |
| `curve-sketching.tsx` | curve-sketching-... |
| `sequence-series.tsx` | sequence-and-series-... |
| `matrices-determinants.tsx` | matrices-and-determinants-... |
| `inverse-trig.tsx` | inverse-circular-functions |
| `trigonometric-eq.tsx` | trigonometric-equations-and-general-values |
| `measure-dispersion.tsx` | measure-of-dispersion-... |
| `probability-basic.tsx` | probability-independent-cases-... |
| `numerical-computation.tsx` | numerical-computation-..., computational-methods-or-mechanics |
| `numerical-integration.tsx` | numerical-integration-... |
| `statics.tsx` | mechanics-optional-statics-... |
| `dynamics.tsx` | mechanics-optional-dynamics-... |
| `formation-de.tsx` | differential-equations, formation-of-differential-equations |
| `variable-separable-de.tsx` | solving-first-order-first-degree-equations-... |
| `growth-decay.tsx` | applications-growth-and-decay-... |
| `lpp-formulation.tsx` | linear-programming, linear-programming-formulation-of-lpp |
| `lpp-graphical.tsx` | graphical-method-for-solving-lpp-with-two-variables, maximization-and-minimization-problems |
| `conditional-prob.tsx` | conditional-probability-and-multiplication-theorem |
| `independent-events.tsx` | independent-events |
| `bayes-theorem.tsx` | bayes-theorem-and-its-applications |
| `random-variable.tsx` | probability, random-variable-and-its-probability-distribution |
| `mean-variance.tsx` | mean-variance-and-standard-deviation-of-a-random-variable |
| `binomial-dist.tsx` | binomial-distribution-definition-mean-variance |
| `poisson-dist.tsx` | poisson-distribution-definition-mean-variance |

**Total new components: 26 files**

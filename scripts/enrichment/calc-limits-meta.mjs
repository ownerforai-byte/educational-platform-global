export const calc01Meta = {
  animation3D: "calculus",
  motionGraphics: "calculus",
  examples: [
    "Instantaneous speed: the speedometer value is a limit of average velocities taken over a shrinking interval.",
    "Camera shutter speeds: at very short exposures the 'instant' is really an average over sensor read-out time, so a limit is only ever approached.",
  ],
  practiceQuestions: [
    "Q1. State the $\\varepsilon$-$\\delta$ definition of $\\lim_{x\\to a}f(x)=L$ and explain why $0<|x-a|$ appears.",
    "Q2. Evaluate $\\lim_{x\\to4}\\frac{x^2-16}{x-4}$ and $\\lim_{x\\to5}\\frac{x-2}{x-5}$, stating which is undefined at the point.",
    "Q3. Find the horizontal and vertical asymptotes of $y=\\frac{2x+1}{x^2-4}$.",
  ],
  formulas: [
    "Limit: $\\lim_{x \\to a} f(x) = L$",
    "Epsilon-delta: $|f(x)-L|<\\varepsilon$ whenever $0<|x-a|<\\delta$",
    "One-sided: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L$",
    "Standard limit: $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ (radians only)",
    "Conjugate: $\\frac{1-\\cos x}{1+\\cos x}=\\frac{\\sin^2x}{1+\\cos x}$",
  ],
  keyPoints: [
    "A limit describes the value approached, not the value taken at the point.",
    "The two-sided limit exists only if the one-sided limits are equal and finite.",
    "$0/0$ signals failure of substitution, not a result of zero.",
    "Infinity is never a value; it denotes unbounded growth or a vertical asymptote.",
    "Horizontal asymptotes come from limits at infinity via the dominant-term rule.",
  ],
  summary: "A limit fixes the value a function approaches as $x$ nears $a$, independently of whether $f(a)$ is defined, which is why $\\frac{x^2-4}{x-2}$ is undefined at 2 yet has limit 4. A two-sided limit requires matching one-sided limits. Forms such as $0/0$ are not answers but signals that the function must first be rewritten by factorising, rationalising, or using $\\lim\\frac{\\sin x}{x}=1$. Limits at infinity yield horizontal asymptotes.",
  specialNotes: [
    "The exclusion of $x=a$ in the epsilon-delta definition is the key subtlety: it is what makes a limit independent of the function's value at the point.",
    "$\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ holds only in radians; in degrees the value is $\\frac{\\pi}{180}$.",
  ],
  importantStatements: [
    "Statement 1: $\\lim_{x\\to a}f(x)=L$ does not require $f(a)$ to be defined.",
    "Statement 2: The two-sided limit exists if and only if both one-sided limits equal the same finite number.",
    "Statement 3: $0/0$ indicates that substitution failed, not that the limit is zero.",
    "Statement 4: A vertical asymptote occurs where the one-sided limits diverge with opposite signs.",
    "Statement 5: If $\\lim_{x\\to\\infty}f(x)=L$ then $y=L$ is a horizontal asymptote.",
  ],
  importantNotes: [
    "A limit is a boundary of behaviour, never an attained value — the same reason $f'(a)$ is independent of $f(a)$.",
  ],
  examShortTricks: [
    "$0/0$ fix order: factorise, rationalise (conjugate), divide by the highest vanishing power, then use $\\lim\\frac{\\sin x}{x}=1$.",
    "Degree check at infinity: smaller numerator degree gives 0, equal degrees gives the ratio of leading coefficients, larger gives $\\pm\\infty$.",
    "Always state BOTH one-sided limits when asked about discontinuity at a point — the values carry the marks.",
  ],
  examNotes: [
    "The epsilon-delta definition and evaluation of $0/0$ forms are the most frequently asked 2–3 mark items from this topic.",
  ],
  mcs: [
    {
      question: "The value $f(2)$ for $f(x)=\\frac{x^2-4}{x-2}$ is:",
      options: ["Undefined", "0", "4", "2"],
      answer: "A",
      explanation: "Substitution gives $0/0$, so $f(2)$ is undefined, yet $\\lim_{x\\to2}f(x)=x+3=4$.",
    },
    {
      question: "If $\\lim_{x\\to a^-}f(x)=5$ and $\\lim_{x\\to a^+}f(x)=5$, then $\\lim_{x\\to a}f(x)$ is:",
      options: ["0", "5", "10", "Does not exist"],
      answer: "B",
      explanation: "The two-sided limit exists precisely because the one-sided limits agree.",
    },
    {
      question: "$\\lim_{x\\to0}\\frac{\\sin x}{x}$ with $x$ in DEGREES equals:",
      options: ["1", "$\\frac{\\pi}{180}$", "$\\frac{180}{\\pi}$", "0"],
      answer: "B",
      explanation: "The standard limit equals 1 only in radians; in degrees it is $\\frac{\\pi}{180}\\approx0.01745$.",
    },
  ],
  importantConcepts: [
    "Informal and epsilon-delta meanings of a limit, and why $x=a$ is excluded.",
    "Left-hand, right-hand and two-sided limits, and the jump discontinuity.",
    "Indeterminate forms and the rewrites that resolve them.",
    "Infinite limits, vertical asymptotes and horizontal asymptotes.",
  ],
  importantTasks: [
    "State and interpret the epsilon-delta definition.",
    "Evaluate limits using factorisation, conjugates and standard trigonometric limits.",
    "Locate vertical and horizontal asymptotes from limits.",
  ],
  duplicateType: 1,
  visualType: "limit",
};

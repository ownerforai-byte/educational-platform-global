export const calc01 = {
  title: "Limits of a Function",
  topicTitle: "Limits of a function",
  relevance: 100,
  notes: [
    "**Meaning of a limit:** $\\lim_{x \\to a} f(x) = L$ means that as $x$ gets arbitrarily close to $a$ (from either side, and without ever requiring $x = a$) the value of $f(x)$ gets arbitrarily close to $L$. The point $x=a$ may be undefined and the limit still exist — which is why $\\frac{x^2-4}{x-2}$, undefined at 2, has limit 4.",
    "**The $\\varepsilon$-$\\delta$ definition:** for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $0 < |x-a| < \\delta$ implies $|f(x)-L| < \\varepsilon$. The condition $0 < |x-a|$ EXCLUDES the point itself, and that exclusion is exactly what makes a limit independent of $f(a)$.",
    "**One-sided limits:** $\\lim_{x \\to a^-}$ approaches from below, $\\lim_{x \\to a^+}$ from above. The two-sided limit exists **if and only if** both exist and are equal. Equal-but-different still means no limit — a jump discontinuity is the standard counter-example.",
    "**Indeterminate forms are signals, not answers:** $0/0$, $\\infty-\\infty$, $0\\cdot\\infty$, $\\infty/\\infty$, $1^\\infty$, $0^0$, $\\infty^0$ mean direct substitution FAILED. Rewrite instead: factorise and cancel, rationalise with the conjugate, divide by the highest vanishing power, or use $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$.",
    "**Infinite limits and asymptotes:** $\\infty$ is never a value, only shorthand for unbounded growth. Opposite-sign one-sided limits give a VERTICAL asymptote; a finite limit at infinity gives a HORIZONTAL asymptote, found by the dominant-term rule.",
  ],
  confusion: [
    "Substituting the point and stopping — the limit asks what the function APPROACHES, not what it equals there.",
    "Concluding the limit exists because both sides are 'big' — they must be the SAME FINITE number; $0/0$ or $-\\infty/+\\infty$ is a jump.",
    "Writing $\\lim = \\infty$ as a result — a divergent limit says the function is unbounded, not that it reached a value.",
  ],
  practice: [
    "$\\lim_{x\\to3}\\frac{x^2-9}{x-3}$: substitution gives $0/0$, so factorise $x^2-9=(x-3)(x+3)$, cancel, then substitute to get $6$.",
    "$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$: multiply by the conjugate to get $\\frac{\\sin^2x}{x^2(1+\\cos x)}$, then apply $\\lim\\frac{\\sin x}{x}=1$ to obtain $\\frac12$.",
    "Horizontal asymptote of $y=\\frac{3x^2+1}{x^2-5}$: divide by $x^2$, take the ratio of leading coefficients $\\frac31=3$, so $y=3$.",
  ],
  universalFacts: [
    "The derivative is itself a limit, $f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$, so differential calculus rests entirely on the limit concept.",
    "A speedometer reports a limit, not an average: it is the limit of average velocities as the averaging interval shrinks to zero.",
  ],
};

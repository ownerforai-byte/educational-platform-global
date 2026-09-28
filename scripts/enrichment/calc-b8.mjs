import { mk } from "./topic-factory.mjs";
import { CALC_B7 } from "./calc-b7.mjs";

/** Batch 8 — the rules of differentiation as a decision procedure. */
export const CALC_B8 = [
  mk({
    title: "Rules of Differentiation",
    topicTitle: "Rules of differentiation",
    topicSlug: "rules-of-differentiation",
    notes: [
      "**The chain rule is the workhorse:** for $y=f(u(x))$, $\\frac{dy}{dx}=f'(u)\\cdot\\frac{du}{dx}$. Work OUTSIDE-IN, labelling each layer, then multiply the derivatives back in reverse order — this 'outside-in, inside-out' order is what prevents missed factors.",
      "**The rule is valid for arbitrarily many layers:** $\\frac{d}{dx}(3x^2+1)^4 = 4(3x^2+1)^3\\cdot6x = 24x(3x^2+1)^3$. Three layers require two multiplications, and dropping the innermost derivative is the standard error.",
      "**Sum and difference rules let you differentiate term by term.** A polynomial needs no product or chain rule at all, which is why $\\frac{d}{dx}(x^3-4x+7)=3x^2-4$ is a one-line exercise with the constant vanishing.",
      "**Implicit differentiation:** for $F(x,y)=0$ differentiate BOTH sides with respect to $x$ and use $\\frac{dy}{dx}$ throughout, then collect $\\frac{dy}{dx}$ terms and solve. From $x^2+y^2=r^2$ we get $2x+2y\\frac{dy}{dx}=0$, hence $\\frac{dy}{dx}=-\\frac{x}{y}$ — the slope of a circle is never constant, which the formula makes obvious.",
      "**Parametric forms:** if $x=x(t)$ and $y=y(t)$, then $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$, provided $\\frac{dx}{dt}\\ne0$. The parameter cancels, so $dx/dt=0$ is a point where the curve turns vertically.",
      "**Logarithmic differentiation handles awkward powers:** for $y=u^v$ take logs, $\\ln y = v\\ln u$, differentiate, then exponentiate. This is the standard route for expressions like $y=x^x$ or $y=(1+x)^{1/x}$ where no ordinary rule applies.",
    ],
    confusions: [
      "Differentiating only the outer function of a composite and forgetting the inner derivative.",
      "In implicit differentiation, treating $y$ as a constant instead of a function of $x$.",
      "Writing $\\frac{d}{dx}(u^n)=nu^{n-1}$ for a general $u(x)$, which silently assumes $u$ is constant — the power rule only applies directly to $x^n$.",
    ],
    practice: [
      "$y=(2x^3+1)^5$: differentiate outside-in, $y'=5(2x^3+1)^4\\cdot 6x^2 = 30x^2(2x^3+1)^4$.",
      "$x^2+y^2=25$ at $(3,4)$: $\\frac{dy}{dx}=-\\frac{x}{y}=-\\frac34$.",
      "$y=x^x$: take logs, $\\ln y = x\\ln x$, so $\\frac{y'}{y}=\\ln x + 1$ and $y'=x^x(\\ln x+1)$.",
    ],
    universalFacts: [
      "Rate problems are chain-rule problems in disguise: a falling tank's drain rate is the area rate composed with the depth rate, $\\frac{dV}{dt}=A(h)\\frac{dh}{dt}$.",
      "The gradient of a circle $\\frac{dy}{dx}=-\\frac{x}{y}$ is infinite at the poles and zero at the equator, which is why a level tangent is the natural condition for the maximum or minimum of a circle's height.",
    ],
    formulas: [
      "Chain: $\\frac{d}{dx}f(u)=f'(u)u'$",
      "Sum/difference: $\\frac{d}{dx}(u\\pm v)=u'\\pm v'$",
      "Implicit: differentiate $F(x,y)=0$ w.r.t. $x$ and solve for $y'$",
      "Parametric: $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$, $dx/dt\\ne0$",
      "Logarithmic: $y=u^v \\Rightarrow \\frac{y'}{y}=v'\\ln u + v\\frac{u'}{u}$",
    ],
    keyPoints: [
      "Chain rule: differentiate outside-in, multiply inside-out.",
      "The power rule on $u(x)^n$ needs the chain rule, not the bare power rule.",
      "For $y=u^v$ take logarithms — no ordinary rule handles a variable exponent.",
    ],
    summary:
      "Differentiation is a decision procedure. Sums and differences go term by term, composites go through the chain rule worked outside-in, implicit relations are differentiated in $x$ with $y=y(x)$ treated as a function, and parametric curves divide the two parameter derivatives. When neither the base rules nor the chain rule fit — a variable exponent — logarithms reduce it to the earlier cases.",
    importantStatements: [
      "Statement 1: $\\frac{d}{dx}f(u(x)) = f'(u(x))\\cdot u'(x)$.",
      "Statement 2: $\\frac{d}{dx}(u^n)$ requires the chain rule unless $u$ is constant.",
      "Statement 3: Implicit differentiation assumes $y$ is a differentiable function of $x$.",
      "Statement 4: For parametric equations $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$ when $dx/dt\\ne0$.",
      "Statement 5: $y=u^v$ with $v$ variable requires logarithmic differentiation.",
    ],
    examShortTricks: [
      "Label every layer of a composite before differentiating, then multiply the derivatives in reverse label order.",
      "For $y=u^v$, always take logarithms first — it converts the problem into addition and multiplication.",
    ],
    examNotes: [
      "Chain-rule and implicit-differentiation problems are the two most reliable 3–4 mark derivative questions.",
    ],
    mcs: [
      {
        question: "$\\frac{d}{dx}(2x+1)^4$ is:",
        options: ["$4(2x+1)^3$", "$8(2x+1)^3$", "$4(2x+1)^5$", "$2(2x+1)^3$"],
        answer: "B",
        explanation: "Chain rule: $4(2x+1)^3\\cdot 2 = 8(2x+1)^3$. The inner derivative 2 must be included.",
      },
      {
        question: "For $x^2+y^2=25$, $\\frac{dy}{dx}$ is:",
        options: ["$\\frac{x}{y}$", "$-\\frac{x}{y}$", "$\\frac{y}{x}$", "$-\\frac{y}{x}$"],
        answer: "B",
        explanation: "$2x+2y\\frac{dy}{dx}=0$ gives $\\frac{dy}{dx}=-\\frac{x}{y}$.",
      },
      {
        question: "To differentiate $y=x^x$, first:",
        options: ["use the power rule", "take logarithms", "use the quotient rule", "assume $x$ is constant"],
        answer: "B",
        explanation: "A variable exponent is outside the power rule. Logarithms give $\\ln y = x\\ln x$, which is differentiable by ordinary rules.",
      },
    ],
    visualType: "derivative",
  }),
];
export { CALC_B7 };

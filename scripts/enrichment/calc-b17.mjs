import { mk } from "./topic-factory.mjs";
import { CALC_B16 } from "./calc-b16.mjs";

/** Batch 17 — parametric & implicit differentiation, geometric meaning, concavity. */
export const CALC_B17 = [
  mk({
    title: "Parametric and Implicit Derivatives",
    topicTitle: "Parametric and implicit derivatives",
    topicSlug: "parametric-implicit-derivatives",
    notes: [
      "**Parametric rule:** if $x=x(t)$ and $y=y(t)$ then $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$, provided $\\frac{dx}{dt}\\ne0$. The parameter cancels, which is what allows a curve with no closed-form $y=f(x)$ to be differentiated at all.",
      "**Why $\\frac{dx}{dt}=0$ is special:** it means $\\frac{dy}{dx}$ is infinite, i.e. a vertical tangent. A circle $x=\\cos t$, $y=\\sin t$ gives $\\frac{dy}{dx}=\\frac{\\cos t}{-\\sin t}$ and a vertical tangent at $t=0$, matching the geometry.",
      "**Implicit differentiation:** differentiate $F(x,y)=0$ with respect to $x$, treating $y$ as a function of $x$ throughout, then collect the $\\frac{dy}{dx}$ terms. For $x^2+y^2=25$ one gets $2x+2y\\frac{dy}{dx}=0$, hence $\\frac{dy}{dx}=-\\frac{x}{y}$.",
      "**Always state the assumption $y=y(x)$** when differentiating implicitly; without it the method is a guess, and the resulting formula is only valid where $\\frac{\\partial F}{\\partial y}\\ne0$.",
      "**Second derivatives from parametric form are found by differentiating $\\frac{dy}{dx}$ with respect to $t$ and dividing by $\\frac{dx}{dt}$ again:** $\\frac{d^2y}{dx^2}=\\frac{d}{dt}\\left(\\frac{dy/dt}{dx/dt}\\right)\\div\\frac{dx}{dt}$.",
      "**Higher-order implicit derivatives substitute back** the expression obtained for $\\frac{dy}{dx}$ before differentiating again, so for a circle $\\frac{d^2y}{dx^2}=-\\frac{r^2}{y^3}$ once $x^2+y^2=r^2$ is used.",
    ],
    confusions: [
      "Inverting the ratio in the parametric rule, giving $\\frac{dx}{dt}/\\frac{dy}{dt}$ instead.",
      "Treating $y$ as a constant in implicit differentiation.",
      "Forgetting the second division by $\\frac{dx}{dt}$ when computing a parametric second derivative.",
    ],
    practice: [
      "$x=t^2$, $y=2t$: $\\frac{dy}{dx}=\\frac{2}{2t}=\\frac1t$, and eliminating $t$ gives the parabola $y^2=4x$.",
      "$x=\\cos t$, $y=\\sin t$: $\\frac{dy}{dx}=\\frac{\\cos t}{-\\sin t}=-\\cot t$, undefined at $t=0$, a vertical tangent.",
      "$x^3+y^3=9$: $3x^2+3y^2\\frac{dy}{dx}=0$, so $\\frac{dy}{dx}=-\\frac{x^2}{y^2}$.",
    ],
    universalFacts: [
      "Projectile motion is the standard parametric curve: eliminating $t$ is clumsy, while $\\frac{dy}{dx}=\\frac{v_y}{v_x}$ gives the trajectory angle instantly.",
      "A cycloid, the curve traced by a point on a rolling wheel, has no single-valued $y(x)$ over a full arch, which is precisely why parametric differentiation is needed for it.",
    ],
    formulas: [
      "Parametric: $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$ for $dx/dt\\ne0$",
      "Implicit: differentiate $F(x,y)=0$ w.r.t. $x$ and solve for $y'$",
      "Parametric 2nd: $\\frac{d^2y}{dx^2}=\\frac{d}{dt}(\\frac{dy}{dx})\\div\\frac{dx}{dt}$",
      "Circle: $\\frac{dy}{dx}=-\\frac{x}{y}$, $\\frac{d^2y}{dx^2}=-\\frac{r^2}{y^3}$",
    ],
    keyPoints: [
      "Parametric derivatives are a ratio of parameter derivatives, not a product.",
      "$\\frac{dx}{dt}=0$ corresponds to a vertical tangent.",
      "Implicit differentiation presumes $y$ is a differentiable function of $x$.",
    ],
    summary:
      "Parametric and implicit differentiation both exist because a curve need not be expressible as $y=f(x)$. In the parametric case the parameter cancels, leaving a ratio of parameter derivatives, and a vanishing $\\frac{dx}{dt}$ marks a vertical tangent. In the implicit case one differentiates an equation solved for neither variable, treating $y$ as a function of $x$ throughout, then isolates $\\frac{dy}{dx}$.",
    importantStatements: [
      "Statement 1: $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$ for parametric equations when $dx/dt\\ne0$.",
      "Statement 2: $\\frac{dx}{dt}=0$ indicates a vertical tangent.",
      "Statement 3: Implicit differentiation requires $y$ to be a differentiable function of $x$.",
      "Statement 4: For $x^2+y^2=r^2$, $\\frac{dy}{dx}=-\\frac{x}{y}$.",
      "Statement 5: A parametric second derivative divides by $\\frac{dx}{dt}$ a second time.",
    ],
    examShortTricks: [
      "For the circle, always convert $y$ to $\\pm\\sqrt{r^2-x^2}$ before computing a second derivative — implicit is faster but needs the substitution step.",
      "Draw the parametric curve for a few values of $t$ if the shape is unclear; the vertical tangent becomes obvious.",
    ],
    examNotes: [
      "Slope of a parametric curve and slope of a circle by implicit differentiation are both standard 3-mark questions.",
    ],
    mcs: [
      {
        question: "For $x=t^2$, $y=2t$, $\\frac{dy}{dx}$ is:",
        options: ["$\\frac1t$", "$t$", "$2t$", "$\\frac{t}{2}$"],
        answer: "A",
        explanation: "$\\frac{dy}{dt}=2$ and $\\frac{dx}{dt}=2t$, so the ratio is $\\frac1t$.",
      },
      {
        question: "For $x^2+y^2=25$, $\\frac{dy}{dx}$ is:",
        options: ["$\\frac{x}{y}$", "$-\\frac{x}{y}$", "$\\frac{y}{x}$", "$-\\frac{y}{x}$"],
        answer: "B",
        explanation: "$2x+2y\\frac{dy}{dx}=0$ gives $\\frac{dy}{dx}=-\\frac{x}{y}$, zero at the top of the circle and vertical at the sides.",
      },
      {
        question: "$\\frac{dx}{dt}=0$ at some $t$ means:",
        options: ["the curve has ended", "a vertical tangent", "$y$ is constant", "the curve is a circle"],
        answer: "B",
        explanation: "$\\frac{dy}{dx}$ becomes infinite, which is the signature of a vertical tangent.",
      },
    ],
    visualType: "derivative",
  }),
];
export { CALC_B16 };

import type { UnitDepth } from "./mindmap-depth";

/** Work, energy, conservation, power & efficiency. */
export const WEP_DEPTH: Record<string, UnitDepth> = {
  "work-energy-and-power": {
    unitFacts: [
      "Work is a SCALAR, not a vector: it is a dot product, which is why the work done around a closed loop is always zero for conservative forces.",
      "Energy is the capacity to do work, so $W = \\Delta KE$, $W = -\\Delta PE$ and $P = W/t$ are the same physics written three ways.",
    ],
    unitEdgeCases: [
      "Zero work has three distinct causes: $\\vec F = 0$, $\\vec d = 0$, or $\\vec F \\perp \\vec d$. Name which case applies, do not just write 'zero'.",
      "Efficiency exceeds 100% only for a machine being DRIVEN, when the load does positive work on it (a car starter motor) — the standard 'efficiency > 100%' MCQ.",
    ],
    unitExamAsked: [
      "NEB: 'Why is the work done by the centripetal force in one revolution zero?' — $\\vec F$ stays perpendicular to the instantaneous displacement throughout.",
      "CEE: 'Can efficiency be greater than unity?' — yes, for a driven machine where output exceeds input.",
    ],
    unitCommonMistakes: [
      "Citing conservation of mechanical energy when friction is present. Mechanical energy survives only for conservative forces; with friction it is the TOTAL (mechanical + thermal) that is conserved.",
      "Reporting a bare number of joules for 'work' and 'change in KE' without saying which — they are numerically equal but the wording carries the mark.",
    ],
    leaves: {
      "uc-wep-1": {
        keyFacts: [
          "Work by a constant force is the signed AREA under the F–x graph, so a negative region subtracts from the total.",
          "Work is frame-dependent — the same motion has different work in different inertial frames, while energy conservation holds in every one of them.",
        ],
        edgeCases: [
          "Constant-$g$ is valid only while $h \\ll R_{\\oplus}$; at a geostationary satellite's height $3.6\\times10^7$ m, $g$ has fallen to about $0.22\\,\\text{m/s}^2$ and the constant-$g$ work formula fails.",
          "A spring force is NOT constant: $F = -kx$ grows from zero, so $W = Fd$ is wrong and $W = -\\tfrac12kx^2$ is right. This is the commonest 'constant force' trap.",
        ],
        examAsked: [
          "NEB: 'A 10 N force displaces a body 5 m at 60° to the force. Find the work.' — $W = 10\\times5\\times\\cos60 = 25$ J.",
          "CEE: 'Work done by the centripetal force in half a revolution at constant speed?' — zero.",
        ],
        commonMistakes: [
          "Omitting $\\cos\\theta$: $10 \\times 5 = 50$ J is right only for a force along the displacement.",
          "Writing a negative answer without saying why. Negative work means the force opposed the motion; say so.",
        ],
      },
      "uc-wep-2": {
        keyFacts: [
          "For a variable force $W = \\int \\vec F\\cdot d\\vec x$ IS the signed area under the F–x curve — the graphical method is the definition, not an approximation.",
          "A straight line with a non-zero intercept (a spring) gives a TRAPEZIUM, $\\tfrac12(F_1+F_2)d$, not a triangle.",
        ],
        edgeCases: [
          "A curve crossing the axis gives cancellation: only the algebraic area counts, not the total shaded area.",
          "Force against TIME gives IMPULSE, $J = \\int F\\,dt = \\Delta p$, not work. The axis label decides the meaning entirely.",
        ],
        examAsked: [
          "NEB: 'A F–x graph is a rectangle 20 N by 4 m followed by a triangle of base 4 m and height 20 N. Find the work.' — $80 + 40 = 120$ J.",
          "CEE: 'The area under a force–time graph represents?' — impulse, equal to change in momentum.",
        ],
        commonMistakes: [
          "Using the average-force trapezium rule on a CURVED F–x graph, where it is not exact.",
          "Taking total shaded area instead of signed area, so cancellation regions are counted as positive.",
        ],
      },
      "uc-wep-3": {
        keyFacts: [
          "Mechanical energy $E = KE + PE$ is conserved only when every force is conservative; with friction the lost mechanical energy becomes thermal energy of the system.",
          "The work–energy theorem $W_{net} = \\Delta KE$ holds for ANY net force, so unlike energy conservation it never needs a caveat.",
        ],
        edgeCases: [
          "Constant energy does not mean rest: at the top of a vertical circle the KE is minimal but non-zero unless $v_{top} = \\sqrt{gr}$ exactly.",
          "For a spring on a rough surface, $\\tfrac12kx^2 = \\tfrac12mv^2 + \\mu mg x$. Both PE terms scale with $x$, so the maximum compression $x = 2\\mu mg/k$ is INDEPENDENT of mass — a classic surprise.",
        ],
        examAsked: [
          "NEB: 'A block slides from rest down a smooth track of height h. Find its speed at the bottom.' — $v = \\sqrt{2gh}$.",
          "CEE: 'A ball falls from height h with air resistance ignored. With what speed does it strike?' — the same $\\sqrt{2gh}$, independent of mass.",
        ],
        commonMistakes: [
          "Reading $mgh = \\tfrac12mv^2$ as $h = v$. The mass cancels on both sides, exactly why gravitational PE and KE scale together.",
          "Cancelling $m$ where it should not cancel. In $\\tfrac12kx^2 = \\tfrac12mv^2 + \\mu mgx$ the mass stays, because $k$ is mass-independent.",
        ],
      },
      "uc-wep-4": {
        keyFacts: [
          "The elastic PE graph is the same $F$–$x$ shape as the force graph with one extra factor of $x$: the area up to $x$ under $F$ vs $x$ is $\\tfrac12kx^2$.",
          "Hooke's law $F = -kx$ holds only within the elastic limit; beyond it the material deforms plastically and does NOT return the stored energy.",
        ],
        edgeCases: [
          "Zero force does not imply zero energy: a spring pre-compressed relative to a shifted origin stores $\\tfrac12kx^2$ even where the net force reads zero.",
          "A vertical spring carrying a mass has BOTH $\\tfrac12kx^2$ and the gravitational $mgx$, with equilibrium extension $x_0 = mg/k$ — beginners routinely double-count these two.",
        ],
        examAsked: [
          "NEB: 'A spring of force constant 200 N/m is compressed 5 cm. Find the elastic PE.' — $\\tfrac12(200)(0.05)^2 = 0.25$ J.",
          "CEE: 'Springs of k and 4k are stretched by the same force. Compare stored energies.' — inversely proportional, $U \\propto 1/k$.",
        ],
        commonMistakes: [
          "Using $W = Fd$ with $F = kx$ at the FINAL extension, getting $kx^2$ instead of $\\tfrac12kx^2$. The force ramps linearly from 0 to $kx$.",
          "Forgetting that extension and compression cost the same: both use $x^2$, so the sign of $x$ is irrelevant.",
        ],
      },
      "uc-wep-5": {
        keyFacts: [
          "Instantaneous power is $P = \\vec F\\cdot\\vec v$ and can be NEGATIVE: a decelerating body has negative power, meaning energy flows FROM the body to whatever is braking it.",
          "Power is a RATE, not an amount — the same energy delivered in half the time needs double the peak output, which is the entire engineering argument for gearing.",
        ],
        edgeCases: [
          "Power is zero whenever force is perpendicular to velocity — the reason a magnetic force does no work, so a charged particle in a pure magnetic field has constant KE while the motor keeps supplying power.",
          "Zero NET power does not mean zero power per force: in circular motion each individual force may do work while the resultant does none.",
        ],
        examAsked: [
          "NEB: 'A lift of mass 1000 kg rises 20 m in 40 s. Power developed, g = 9.8.' — $P = \\frac{mgh}{t} = 4900$ W.",
          "CEE: 'A particle moves in a circle at constant speed under a centripetal force. Its power?' — zero, since $\\vec F \\perp \\vec v$.",
        ],
        commonMistakes: [
          "Borrowing a total work from an earlier part and pairing it with a different time interval.",
          "Saying a constant-speed body experiences 'no force' — it experiences force, just no NET force.",
        ],
      },
      "uc-wep-6": {
        keyFacts: [
          "$\\eta = \\frac{\\text{output}}{\\text{input}} \\le 1$ describes a DEVICE, not a law: a lossy machine still obeys energy conservation perfectly.",
          "Efficiency is a pure number, so '75 joules of efficiency' is an immediate mark loss.",
        ],
        edgeCases: [
          "$\\eta$ depends on the LOAD. An engine is most efficient near its best-power point, not at top speed — the reason real vehicles need a torque curve and gear ratios.",
          "For a machine being DRIVEN, output exceeds input and $\\eta > 1$; the surplus work comes FROM the load, so calling it 'perfectly efficient' is wrong.",
        ],
        examAsked: [
          "NEB: 'A machine lifts 100 kg through 3 m in 10 s using 1500 W. Find efficiency.' — output 294 W, so $\\eta = 19.6\\%$.",
          "CEE: 'Can a device exceed 100% efficiency?' — yes, when driven by the load.",
        ],
        commonMistakes: [
          "Using $g = 10$ when the paper states $g = 9.8\\,\\text{m/s}^2$, or the reverse. Match the supplied value exactly.",
          "Computing output/input against the load's total mechanical energy instead of against input power, which silently absorbs the load's own KE.",
        ],
      },
    },
  },
};
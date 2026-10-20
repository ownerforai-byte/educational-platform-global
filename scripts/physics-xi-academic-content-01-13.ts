/**
 * Physics XI Academic Companion — authored exam-anchored content, units 1-13.
 *
 * The unit-level layer (facts, conditions, mysteries, prompts, key numbers,
 * further reading) lives in the canonical dataset
 * `frontend/public/data/physics-xi-academic/units.json`. This file holds the
 * layer that turns a brief into a self-test:
 *
 *   • misconceptions — three real student errors per unit, each with why it
 *     is wrong and the correct statement;
 *   • workbook — three items per unit, one numerical (with units), one
 *     derivation, one conceptual-with-reasoning;
 *   • nextSteps — links into the platform's own physics material for that unit.
 *
 * `scripts/build-physics-xi-academic.ts` merges this with the syllabus topic
 * list and writes the dataset. Edit here, never in the JSON by hand.
 */
export interface PhysicsXiMisconception {
  /** The wrong belief, phrased the way a student actually states it. */
  claim: string;
  /** Why it fails: the case that breaks it, or the quantity it confuses. */
  why: string;
  /** The correct statement, with the governing law. */
  correction: string;
}

export interface PhysicsXiWorkbookItem {
  kind: "numerical" | "derivation" | "reasoning";
  question: string;
  answer: string;
}

export interface PhysicsXiNextStep {
  label: string;
  href: string;
}

export interface PhysicsXiUnitEnrichment {
  misconceptions: PhysicsXiMisconception[];
  workbook: PhysicsXiWorkbookItem[];
  nextSteps: PhysicsXiNextStep[];
}

export const PHYSICS_XI_ENRICHMENT_01_13: Record<string, PhysicsXiUnitEnrichment> = {
  "physical-quantities": {
    misconceptions: [
      {
        claim:
          "A 2 kg body has a weight of 2 g, so the weight of a body tells you how much matter it contains.",
        why:
          "Weight is a force and mass is a property of the body. The number 2 is the mass in kilograms; the weight is the force with which the body presses on a support, which is m times the local g.",
        correction:
          "Mass m = 2 kg is the amount of matter (and the measure of inertia). Weight W = m g = 2 x 9.8 = 19.6 N. On the Moon the mass is still 2 kg but the weight is about 3.2 N.",
      },
      {
        claim:
          "If a formula is dimensionally correct, it must be physically correct.",
        why:
          "Dimensional analysis only rejects a formula. A dimensionally consistent formula can still be wrong: v = k a t is dimensionally sound and still false for free fall.",
        correction:
          "Dimensional homogeneity is a necessary but not sufficient condition. A formula must first be dimensionally consistent, and then be derived or confirmed by experiment.",
      },
      {
        claim:
          "The number of significant figures is decided by the number of decimal places.",
        why:
          "Significant figures and decimal places are different counts. 0.00450 m has two significant figures and three decimal places; 4500 m written without a decimal point has an ambiguous figure count.",
        correction:
          "Significant figures count the meaningful digits of a measurement, and the last one is the uncertain digit. In multiplication and division the answer takes the fewest significant figures of the operands; in addition and subtraction it takes the fewest decimal places.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A rod is measured as 4.56 m with an uncertainty of +/- 0.01 m. State the absolute and the percentage uncertainty, and the number of significant figures the result should be quoted to.",
        answer:
          "Absolute uncertainty = 0.01 m. Percentage uncertainty = (0.01 / 4.56) x 100 = 0.22 per cent. The reading has three significant figures (4, 5, 6), so the length is quoted as 4.56 m and the uncertainty as +/- 0.01 m.",
      },
      {
        kind: "derivation",
        question:
          "A fluid of viscosity eta flowing through a pipe exerts a retarding force F = eta A (dv/dx), where A is the cross-sectional area and dv/dx is the velocity gradient. Derive the dimensional formula of eta.",
        answer:
          "From the equation, [eta] = [F] / ([A][dv/dx]) = (M L T^-2) / (L^2 x (L T^-1 / L)) = (M L T^-2) / (L T^-1) = M L^-1 T^-1. So [eta] = [M L^-1 T^-1], the dimensions of the poise (Pa s) or of the pascal-second.",
      },
      {
        kind: "reasoning",
        question:
          "A student writes that 'g = 9.8 m/s^2 is the weight of a 1 kg mass'. Explain, with the definition of the quantity, exactly what is wrong with the statement and what value is exact rather than measured.",
        answer:
          "g is the acceleration of a body in free fall near the Earth's surface, a field strength, not a weight and not a force; it has units of m/s^2, whereas weight is a force in newtons. The weight of a 1 kg body is m g = 9.8 N. The value that is exact by definition is the standard gravity g_0 = 9.80665 m/s^2, fixed in the 1901 international convention; the measured local g differs from it because Earth's mass distribution and rotation make the field non-uniform.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Physical Quantities",
        href: "/class-11-notes/physics/chapters/physical-quantities",
      },
      {
        label: "Measurement 3D lab",
        href: "/lab/ph-3d-measurement",
      },
      {
        label: "Mechanics symbols reference",
        href: "/lab/ph-symbols-mechanics",
      },
    ],
  },

  vectors: {
    misconceptions: [
      {
        claim:
          "Two vectors are equal if they have the same magnitude, whatever their direction.",
        why:
          "Equality of vectors requires both magnitude and direction to match. Two equal-length vectors at 120 degrees to each other have a resultant of magnitude equal to each one, not zero - the classic trap in which the student 'adds' magnitudes and forgets direction.",
        correction:
          "A = B only if |A| = |B| and the direction of A is the same as the direction of B. Two vectors of equal magnitude at 120 degrees have a resultant of the same magnitude as each, because 2 A cos(60 degrees) = A.",
      },
      {
        claim:
          "The dot product A.B of two vectors is another vector, like the cross product.",
        why:
          "The dot product is a scalar: it is a single number with no direction, equal to |A||B| cos theta. Only the cross product is a vector, and it is perpendicular to both operands.",
        correction:
          "A.B = |A||B| cos theta is a scalar, so A.B = B.A. A x B is a vector of magnitude |A||B| sin theta, perpendicular to the plane of A and B, and A x B = -(B x A).",
      },
      {
        claim:
          "Multiplying a vector by a scalar changes its direction.",
        why:
          "A scalar multiple of a vector is parallel to it. The scalar sets the magnitude and may reverse the sense if it is negative, but the line of action is unchanged.",
        correction:
          "k A is parallel to A for any real k; k > 0 keeps the sense, k < 0 reverses it, and k = 0 gives the zero vector, which has no defined direction.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A force of 10 N acts at 60 degrees to the horizontal. Find its horizontal and vertical components, and the magnitude of the resultant of this force and a 6 N force along the horizontal in the same sense.",
        answer:
          "Horizontal component = 10 cos 60 degrees = 5.0 N; vertical component = 10 sin 60 degrees = 8.66 N. The two forces are at 60 degrees, so the resultant is sqrt(5^2 + 6^2 + 2 x 5 x 6 cos 60 degrees) = sqrt(25 + 36 + 30) = sqrt(91) = 9.54 N. (Resolving first and then adding the components gives the same magnitude.)",
      },
      {
        kind: "derivation",
        question:
          "Two vectors P and Q have equal magnitude A and the angle between them is theta. Show that the resultant has the same magnitude as each vector when theta = 120 degrees.",
        answer:
          "The resultant of two equal vectors is R = 2 A cos(theta / 2), from the parallelogram law. Setting R = A gives 2 A cos(theta/2) = A, so cos(theta/2) = 1/2 and theta/2 = 60 degrees, hence theta = 120 degrees. At that angle the resultant is also along the bisector and has magnitude A.",
      },
      {
        kind: "reasoning",
        question:
          "A box of weight 50 N rests on a rough horizontal floor. A rope pulls it at 30 degrees above the horizontal. Explain which part of the pull actually tends to move the box, and what the upward part of the pull does to the contact force.",
        answer:
          "Only the horizontal component, T cos 30 degrees, tends to move the box; the vertical component T sin 30 degrees is perpendicular to the floor and merely reduces the normal reaction, so the friction available is mu (W - T sin 30 degrees) rather than mu W. The upward component therefore helps the box slide by reducing the normal force. This is the standard argument for why a rope pulled upward is less efficient than one pulled horizontally.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Vectors",
        href: "/class-11-notes/physics/chapters/vectors",
      },
      {
        label: "Vector Addition 3D lab",
        href: "/lab/ph-3d-vectors",
      },
      {
        label: "Vectors Comprehensive 3D lab",
        href: "/lab/ph-3d-vectors-full",
      },
    ],
  },

  kinematics: {
    misconceptions: [
      {
        claim:
          "A body at the top of its vertical throw has zero velocity, so it has zero acceleration.",
        why:
          "Velocity and acceleration are different quantities. At the top the velocity is momentarily zero, but the acceleration is still g downwards - that is exactly what turns the upward motion into the downward motion.",
        correction:
          "Acceleration is the rate of change of velocity. The velocity changes from +u to -u through zero, so the acceleration at the top is g = 9.8 m/s^2 downwards, not zero.",
      },
      {
        claim:
          "The three equations of motion are three separate laws of physics.",
        why:
          "They are not independent and they are not laws of nature; they are algebraic consequences of the definitions of velocity and acceleration, and they hold only for motion with constant acceleration along a straight line.",
        correction:
          "v = u + at, s = ut + (1/2) a t^2 and v^2 = u^2 + 2 a s are one relation written in three ways. Each requires constant a and one-dimensional motion; any other motion must be handled in pieces or by calculus.",
      },
      {
        claim:
          "Two bodies thrown horizontally from the same height hit the ground at the same time, because they fall the same distance.",
        why:
          "The fall time depends on the vertical motion only, and the vertical motion is identical for both - but the speed with which each body covers the horizontal distance is different, so they land at different places.",
        correction:
          "t = sqrt(2 h / g) is the same for both bodies, while the horizontal ranges are R = u_x t and differ with the horizontal launch speed. What differs is the range, not the time.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A car starts from rest and accelerates uniformly at 2.0 m/s^2 for 5.0 s on a level road. Find its final speed and the distance covered.",
        answer:
          "v = u + a t = 0 + 2.0 x 5.0 = 10 m/s. s = u t + (1/2) a t^2 = 0 + (1/2)(2.0)(5.0^2) = 25 m. (Cross-check with v^2 = u^2 + 2 a s: 100 = 2 x 2.0 x s, so s = 25 m.)",
      },
      {
        kind: "derivation",
        question:
          "Starting from v = u + a t and s = u t + (1/2) a t^2, derive the third equation of motion v^2 = u^2 + 2 a s.",
        answer:
          "From v = u + a t, t = (v - u)/a. Substituting into s = u t + (1/2) a t^2 gives s = u (v - u)/a + (1/2) a (v - u)^2 / a^2 = (v - u)/a [u + (1/2)(v - u)] = (v - u)(v + u) / (2 a) = (v^2 - u^2) / (2 a). Multiplying by 2 a gives v^2 - u^2 = 2 a s, i.e. v^2 = u^2 + 2 a s. The step requires a != 0.",
      },
      {
        kind: "reasoning",
        question:
          "A stone is dropped from rest from a 45 m cliff. Find the time of fall and the speed on landing, and state the assumptions your answer depends on.",
        answer:
          "Taking g = 9.8 m/s^2: t = sqrt(2 h / g) = sqrt(2 x 45 / 9.8) = sqrt(9.18) = 3.03 s; v = g t = 9.8 x 3.03 = 29.7 m/s. The assumptions are: a uniform gravitational field (valid over 45 m), no air resistance, the stone treated as a point, and the cliff top taken as the datum. The last assumption is what makes the speed 29.7 m/s and not 30.6 m/s measured from the base.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Kinematics",
        href: "/class-11-notes/physics/chapters/kinematics",
      },
      {
        label: "Kinematics theory lab",
        href: "/lab/ph-th-kinematics",
      },
      {
        label: "Projectile motion calculator",
        href: "/lab/ph-calc-projectile",
      },
    ],
  },

  dynamics: {
    misconceptions: [
      {
        claim:
          "The reaction force a table exerts on a book is equal and opposite to the weight of the book, so the net force on the book is zero.",
        why:
          "The action and reaction in a third-law pair act on different bodies. The table pushes up on the book and the book pushes down on the table; they do not cancel on the book. The forces that cancel on the book are its weight and the normal reaction.",
        correction:
          "Third-law pairs never cancel each other because they act on different objects. On the book the forces are weight (down) and normal reaction (up); these are not a third-law pair, and they balance only when the book has no vertical acceleration.",
      },
      {
        claim:
          "A body moving at constant velocity must have no forces acting on it.",
        why:
          "That is the first law, and it holds only in an inertial frame. A body going round a curve at constant speed has a real net force, and a body sliding on a rough surface with constant velocity has a net force of zero only if friction exactly balances the applied force.",
        correction:
          "In an inertial frame a body has constant velocity if and only if the resultant force on it is zero. In a non-inertial (rotating or accelerating) frame a body at rest still needs a real or fictitious force to keep it at rest.",
      },
      {
        claim:
          "Friction always opposes motion.",
        why:
          "Static friction opposes the tendency to slip, not motion. On a book sliding on a table friction opposes the motion; on a book on a accelerating trolley that slides forward without tipping, friction accelerates the book forward.",
        correction:
          "Friction opposes relative motion at the contact. Static friction is self-adjusting with 0 <= f <= mu_s N and only reaches mu_s N at impending slip; kinetic friction is approximately mu_k N and opposes the sliding.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 5.0 kg block rests on a rough horizontal surface with coefficient of friction 0.40. A horizontal force of 50 N is applied. Find the acceleration of the block.",
        answer:
          "Normal reaction N = m g = 5.0 x 9.8 = 49 N. Limiting friction = mu N = 0.40 x 49 = 19.6 N, which is less than the applied 50 N, so the block slides. Net force = 50 - 19.6 = 30.4 N, so a = 30.4 / 5.0 = 6.08 m/s^2 (about 6.1 m/s^2).",
      },
      {
        kind: "derivation",
        question:
          "Show that the impulse of a constant force acting for a time t equals the change in momentum of the body it acts on.",
        answer:
          "Newton's second law in momentum form is F = dp/dt. For a constant force, integrating over the interval from t1 to t2 gives the impulse J = integral F dt = F (t2 - t1) = p(t2) - p(t1) = change in momentum. The same result follows for a variable force, where the impulse is the area under the force-time graph; it is then the average force times t that equals the change in momentum.",
      },
      {
        kind: "reasoning",
        question:
          "A bus brakes sharply and a standing passenger falls forward. Explain this using Newton's laws, and say which law the passenger's reaction illustrates.",
        answer:
          "When the bus decelerates, the floor exerts a backward friction force on the passenger's feet. The passenger's body would continue at the original velocity (first law) except that the feet are held back, so the body moves forward relative to the bus. The floor's forward force on the feet and the backward force of the body on the floor are a third-law pair, and the forward motion of the body is the reaction to the backward friction on the feet. A passenger who is seated and belted does not fall because the belt supplies the force needed to decelerate with the bus.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Dynamics",
        href: "/class-11-notes/physics/chapters/dynamics",
      },
      {
        label: "Laws of motion theory lab",
        href: "/lab/ph-th-laws",
      },
      {
        label: "Dynamics 3D lab",
        href: "/lab/ph-3d-dynamics",
      },
    ],
  },

  "work-energy-and-power": {
    misconceptions: [
      {
        claim:
          "Work is done only when a force is applied; a body moving on its own does no work on itself.",
        why:
          "Work is a transfer of energy by a force through a displacement, and the agent doing the work is not restricted to whoever pushes. A falling body does work on whatever it strikes, and the muscles of a person walking upstairs do work on the person.",
        correction:
          "W = F.s cos theta is the work done by a force on a body. A body can do work on another body even while the two move together, and the work done by the net force equals the change in kinetic energy.",
      },
      {
        claim:
          "Energy is conserved, so the energy of a book that slides to rest on a table must still be there somewhere.",
        why:
          "The mechanical energy (K + U) of the book is not conserved, because kinetic friction is a non-conservative force. The first law still holds for the book-plus-table-plus-surroundings system, but the energy has left the book as internal energy and sound.",
        correction:
          "Total energy of the isolated system is conserved; mechanical energy of the book alone is not. The work done by friction equals the loss of mechanical energy, and it appears as thermal energy of the book and table and as sound.",
      },
      {
        claim:
          "Since F = ma, a force acting for a longer time always does more work.",
        why:
          "Work is F times the displacement, and a longer time does not imply a larger displacement. A small force acting for a long time through a small distance can do less work than a large force acting briefly through a large distance.",
        correction:
          "Compare W = F s cos theta, not F t. Power P = dW/dt compares rates of doing work; a large power applied briefly can transfer less total energy than a small power applied for long.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 2.0 kg body is lifted steadily through 5.0 m in 4.0 s. Find the work done against gravity and the average power developed.",
        answer:
          "Work done against gravity W = m g h = 2.0 x 9.8 x 5.0 = 98 J. Average power P = W / t = 98 / 4.0 = 24.5 W. (Lifted steadily means the applied force equals mg, so the net work on the body is zero and its kinetic energy does not change.)",
      },
      {
        kind: "derivation",
        question:
          "Derive the work-energy theorem for a body acted on by a constant resultant force F moving along its line of action through a distance s.",
        answer:
          "Newton's second law gives F = m a. Since a = v dv/ds, F = m v dv/ds, so F ds = m v dv. Integrating from the initial speed u to the final speed v gives W = integral F ds = integral m v dv = (1/2) m v^2 - (1/2) m u^2 = change in kinetic energy. The theorem therefore says that the net work on a body equals its change in kinetic energy.",
      },
      {
        kind: "reasoning",
        question:
          "A car of mass 1500 kg accelerates from rest to 20 m/s in 6 s on a level road. Use the work-energy theorem to find the average driving force, and explain why this average is smaller than the peak force needed at the start.",
        answer:
          "Change in kinetic energy = (1/2)(1500)(20^2 - 0) = (1/2)(1500)(400) = 3.0 x 10^5 J. Over 6 s the average driving force is W / s. From the constant-acceleration kinematics, s = (1/2) a t^2 = (1/2)(20/6)(36) = 60 m, so F_avg = 3.0 x 10^5 / 60 = 5.0 x 10^3 N. The average is smaller than the peak because the driving force is largest at the start, when the speed (and hence the power required) is lowest and the resistive forces (rolling resistance, air drag) are smallest; the rest of the work goes into overcoming resistance during the later, faster part of the motion.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Work, Energy and Power",
        href: "/class-11-notes/physics/chapters/work-energy-and-power",
      },
      {
        label: "Work and energy theory lab",
        href: "/lab/ph-th-work",
      },
      {
        label: "Collisions simulation",
        href: "/lab/ph-sim-pi-collisions",
      },
    ],
  },

  "circular-motion": {
    misconceptions: [
      {
        claim:
          "A body moving in a circle at constant speed has no acceleration because its speed is constant.",
        why:
          "Acceleration is the rate of change of velocity, and the velocity is a vector: its direction changes continuously even when its magnitude does not. The acceleration is therefore centripetal and its magnitude is v^2/r.",
        correction:
          "In uniform circular motion the speed is constant but the velocity is not, so a = v^2 / r directed towards the centre. Acceleration is the rate of change of the whole velocity vector, not of its magnitude alone.",
      },
      {
        claim:
          "A passenger in a turning car feels pushed to the outside by a centrifugal force.",
        why:
          "In the inertial frame of the road there is no outward force on the passenger. What the passenger feels is the reaction to the inward (centripetal) force that the car door or seat exerts on them - a real inward force, felt as an apparent outward push.",
        correction:
          "In an inertial frame the only horizontal force on the passenger is the inward contact force. The 'centrifugal force' is a fictitious force that appears only if you work in the rotating frame of the car, where it balances the centripetal force.",
      },
      {
        claim:
          "In a banked curve the banking replaces gravity so that the car can turn without friction.",
        why:
          "Banking does not replace gravity. The normal reaction is tilted, and its horizontal component supplies the centripetal force while its vertical component balances the weight.",
        correction:
          "For a frictionless banked curve of angle theta, N sin theta = m v^2 / r and N cos theta = m g, so tan theta = v^2 / (r g). Friction is only needed when the speed differs from the design speed of the banking.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A stone is whirled in a horizontal circle of radius 0.50 m at 2.0 revolutions per second. Find its speed, its centripetal acceleration and the tension in the string (mass of stone 0.10 kg, string horizontal).",
        answer:
          "Angular speed = 2 x 2 pi = 12.6 rad/s. Speed v = omega r = 12.6 x 0.50 = 6.28 m/s. Centripetal acceleration a = v^2 / r = (6.28^2)/0.50 = 78.9 m/s^2. The only horizontal force is the tension, so T = m a = 0.10 x 78.9 = 7.89 N (about 7.9 N).",
      },
      {
        kind: "derivation",
        question:
          "Derive the condition for a vehicle to travel round a banked circular road of radius r at speed v without any friction, where the road is banked at angle theta to the horizontal.",
        answer:
          "Let N be the normal reaction. In the vertical direction there is no acceleration, so N cos theta = m g. Horizontally the component N sin theta must provide the centripetal force, so N sin theta = m v^2 / r. Dividing the second equation by the first gives tan theta = v^2 / (r g). Note that the banking angle is fixed by the design speed: a vehicle slower or faster than v must use friction to follow the curve.",
      },
      {
        kind: "reasoning",
        question:
          "A conical pendulum consists of a bob on a string making a constant angle with the vertical while it swings in a horizontal circle. Show that the string must make the same angle for every angular speed only if the radius is fixed, and derive the relation between the angle, the radius and g.",
        answer:
          "With the bob in circular motion of radius r, the tension T has a vertical component T cos theta balancing the weight and a horizontal component T sin theta supplying the centripetal force: T cos theta = m g and T sin theta = m omega^2 r. Dividing gives tan theta = omega^2 r / g, or omega^2 = g tan theta / r. For a fixed string length L, r = L sin theta, so omega^2 = g / (L cos theta): the angle changes with the angular speed, and the bob rises as the swing is made faster. A given angle corresponds to one r and one omega together.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Circular Motion",
        href: "/class-11-notes/physics/chapters/circular-motion",
      },
      {
        label: "Pendulum 3D lab",
        href: "/lab/ph-3d-pendulum",
      },
      {
        label: "Double pendulum simulation",
        href: "/lab/ph-sim-double-pendulum",
      },
    ],
  },

  gravitation: {
    misconceptions: [
      {
        claim:
          "A satellite in a circular orbit has no net force on it, so it must fly off in a straight line.",
        why:
          "The satellite does have a net force: the gravitational pull of the Earth, which is continuously turning its velocity towards the centre. The misconception comes from reading 'no net force' as 'no forces'.",
        correction:
          "In a circular orbit the net force is centripetal, F = G M m / r^2 = m v^2 / r, and it is not zero. The satellite keeps moving because no force is needed to maintain its speed; the force only continually changes the direction of the velocity.",
      },
      {
        claim:
          "The value of g is 9.8 m/s^2 everywhere on the Earth, because g is a constant.",
        why:
          "g is a field strength that depends on position: it varies with latitude (because the Earth rotates and because it is an oblate spheroid), with altitude, and with the local geology. The constant 9.80665 m/s^2 is the standard value adopted by convention.",
        correction:
          "g = GM/R^2 at the surface of a spherical Earth. Measured g is about 9.78 m/s^2 at the equator and about 9.83 m/s^2 at the poles, decreases with altitude as g' = g (1 - 2h/R), and varies over Nepal by roughly 0.5 per cent between the Terai plains and the high Himalaya.",
      },
      {
        claim:
          "Gravity between two objects is the same as the force of the Earth on a falling stone, so the Earth must be pulling the stone and the stone must be pulling the Earth with the same force.",
        why:
          "The two are equal in magnitude (a third-law pair) but they act on different bodies, and the accelerations are wildly different because the masses are different.",
        correction:
          "F = G m1 m2 / r^2 is one interaction; the equal-and-opposite forces act on the two different bodies. The Earth's acceleration is negligible compared with the stone's because the Earth's mass is about 6 x 10^24 times larger, and the acceleration ratio is the inverse of the mass ratio.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Find the escape velocity from the Earth's surface, given g = 9.8 m/s^2 and R = 6.4 x 10^6 m, and compare it with the orbital velocity of a satellite just above the surface.",
        answer:
          "Escape velocity v_e = sqrt(2 g R) = sqrt(2 x 9.8 x 6.4 x 10^6) = sqrt(1.254 x 10^8) = 1.12 x 10^4 m/s = 11.2 km/s. For a circular orbit at the surface, v = sqrt(g R) = sqrt(9.8 x 6.4 x 10^6) = 7.9 x 10^3 m/s = 7.9 km/s. The escape speed is sqrt(2) = 1.414 times the orbital speed.",
      },
      {
        kind: "derivation",
        question:
          "Show that the value of g at a height h above the Earth's surface (h much smaller than R) is approximately g' = g (1 - 2h/R).",
        answer:
          "At radius R + h the field strength is g' = GM / (R + h)^2. Since g = GM / R^2, we have g' = g R^2 / (R + h)^2 = g (1 + h/R)^-2. For h << R, expand: (1 + x)^-2 = 1 - 2x + 3x^2 ... with x = h/R, so g' = g (1 - 2h/R + 3(h/R)^2 ...). To first order, g' = g (1 - 2h/R) = g - 2gh/R. The correction is small: at h = 100 km, g falls by about 3 per cent.",
      },
      {
        kind: "reasoning",
        question:
          "A geostationary satellite must stay above the same point of the Earth. Explain the two conditions this places on the orbit, and show why the orbit must lie in the equatorial plane.",
        answer:
          "First, the orbital period must equal the Earth's sidereal rotation period, 86 164 s (23 h 56 m 4 s), otherwise the satellite drifts westwards relative to the ground. Second, the orbit must be circular, because an elliptical orbit spends part of each revolution far from the Earth and cannot keep a fixed angular position. With a period T, the orbital radius follows from T^2 = 4 pi^2 r^3 / (G M), giving r = 4.23 x 10^7 m, about 42 200 km from the centre, some 35 800 km above the surface. The orbit lies in the equatorial plane because the orbital angular momentum vector is perpendicular to the plane of the orbit, and for the satellite to keep pace with the Earth's rotation its angular momentum must be parallel to the Earth's rotation axis, which lies in the equatorial plane.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Gravitation",
        href: "/class-11-notes/physics/chapters/gravitation",
      },
      {
        label: "Gravitation theory lab",
        href: "/lab/ph-th-grav",
      },
      {
        label: "Gravitation 3D lab",
        href: "/lab/ph-3d-gravitation",
      },
    ],
  },

  elasticity: {
    misconceptions: [
      {
        claim:
          "Steel is stronger than rubber, so a steel wire is stiffer and will stretch less than a rubber band under the same load.",
        why:
          "Stretch under a given load depends on the cross-sectional area and length as well as the material, and strength and stiffness are different properties. A thick short steel bar can easily stretch less than a thin rubber band.",
        correction:
          "Stiffness is measured by Young's modulus E (stress/strain) and strength by the ultimate tensile stress. Steel has a much larger E than rubber, so for identical geometry it stretches less, but strength tells how much stress it can bear before permanent deformation or fracture - a different question.",
      },
      {
        claim:
          "The elastic limit and the tensile strength of a wire are the same quantity.",
        why:
          "They are two different points on the stress-strain curve, and confusing them makes the curve unreadable. The elastic limit comes before the yield point; the tensile strength is the maximum stress, reached much later, in the plastic region.",
        correction:
          "The elastic limit is the largest stress for which the body returns to its original size and shape; beyond it permanent deformation begins. The tensile (ultimate) strength is the maximum stress the material can bear, and it lies well beyond the elastic region for ductile materials.",
      },
      {
        claim:
          "Poisson's ratio must be less than one for every material.",
        why:
          "It is bounded above by 0.5 from the requirement of positive compressibility, but the lower bound is not zero: auxetic materials have a negative Poisson's ratio and become wider when stretched.",
        correction:
          "For an isotropic elastic solid, -1 < mu < 0.5. Ordinary materials such as rubber (about 0.49) and steel (about 0.3) are positive; auxetic metamaterials have mu < 0 and expand laterally when pulled.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A steel wire of length 2.0 m and cross-sectional area 1.0 mm^2 stretches by 1.0 mm when a load of 100 N is applied. Find Young's modulus for the wire.",
        answer:
          "Stress = F / A = 100 / (1.0 x 10^-6) = 1.0 x 10^8 Pa. Strain = extension / original length = (1.0 x 10^-3) / 2.0 = 5.0 x 10^-4. Young's modulus E = stress / strain = (1.0 x 10^8) / (5.0 x 10^-4) = 2.0 x 10^11 Pa = 200 GPa, the accepted value for steel.",
      },
      {
        kind: "derivation",
        question:
          "Derive the expression for the elastic potential energy stored in a stretched wire, and show that the energy per unit volume is (1/2) x stress x strain.",
        answer:
          "For a wire of length L, area A and extension x, the force needed is F = (E A / L) x. The work done in stretching from 0 to x is W = integral F dx = integral (E A / L) x dx = (E A / 2 L) x^2, and this is stored as elastic potential energy U = (1/2)(E A / L) x^2. Dividing by the original volume A L gives the energy density u = U / (A L) = (1/2) E (x/L)^2 = (1/2) x stress x strain, since stress = E x / L and strain = x / L. The area under the stress-strain curve is the energy density.",
      },
      {
        kind: "reasoning",
        question:
          "A wire is stretched to twice its original length. Without the stress-strain graph, explain what information is needed to decide whether the wire returns to its original length, and how the answer would differ for copper and glass.",
        answer:
          "One needs the stress-strain curve of the material, and specifically where the applied point lies relative to the elastic limit. If the stress stays below the elastic limit the deformation is entirely reversible and the wire returns to its original length; beyond it, permanent (plastic) deformation remains. Copper is ductile: it has a long plastic region, so it can be drawn far beyond the elastic limit and still retain most of its shape on unloading. Glass is brittle: it fractures rather than plastically deforming, so exceeding the elastic limit usually means the wire snaps, with almost no warning.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Elasticity",
        href: "/class-11-notes/physics/chapters/elasticity",
      },
      {
        label: "Elasticity and gas unit suite 3D",
        href: "/lab/ph-3d-elasticity-gas",
      },
    ],
  },

  "heat-and-temperature": {
    misconceptions: [
      {
        claim:
          "Heat is a substance contained in a body, and a hot body has more heat in it.",
        why:
          "Heat is not stored; it is energy in transit across a boundary because of a temperature difference. A body contains internal energy, and calling that 'heat' leads to statements like 'the heat of a body is proportional to its temperature' that have no meaning.",
        correction:
          "Heat Q is energy transferred thermally. A body contains internal energy U; the part of it that can be transferred as heat is the internal energy, and the transfer stops when the temperatures are equal.",
      },
      {
        claim:
          "If two bodies are at the same temperature there is no heat flowing between them.",
        why:
          "At equal temperature the NET heat transfer is zero, but microscopic energy exchange continues in both directions all the time. Thermal equilibrium is a statistical statement about the balance of many exchanges.",
        correction:
          "At equal temperature the gross exchange of energy continues in both directions, but the rates are equal, so the net flow is zero. That is the content of the zeroth law and of thermal equilibrium.",
      },
      {
        claim:
          "Temperature and heat are the same thing, so a smaller body with the same temperature contains less heat.",
        why:
          "Temperature is an intensive property (it does not depend on the amount of matter); heat is an energy transferred, and internal energy is extensive. The confusion is very common in exam questions that mix the two words.",
        correction:
          "Temperature T is a state variable (the average kinetic energy of the particles, defined through the zeroth law). Heat Q is energy transferred, and the heat required for a given temperature change is Q = m c dT, which does depend on the mass.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 200 g aluminium block at 100 degrees C is dropped into 100 g of water at 20 degrees C. Take c_aluminium = 900 J/(kg K) and c_water = 4200 J/(kg K). Find the equilibrium temperature.",
        answer:
          "Heat lost by aluminium = heat gained by water: 0.2 x 900 x (100 - T) = 0.1 x 4200 x (T - 20), i.e. 180 (100 - T) = 420 (T - 20). Expanding: 18000 - 180 T = 420 T - 8400, so 26400 = 600 T and T = 44 degrees C. (The aluminium has the smaller heat capacity, so the equilibrium temperature sits much closer to the water's initial temperature.)",
      },
      {
        kind: "derivation",
        question:
          "State the zeroth law of thermodynamics and show how it is the precondition for the definition of temperature, and hence for the existence of a thermometer.",
        answer:
          "The zeroth law states: if A and B are in thermal equilibrium, and B and C are in thermal equilibrium, then A and C are in thermal equilibrium. The temperature of a body is defined as that quantity whose equality is equivalent to thermal equilibrium. Because the law is transitive, a body A can be compared with a reference body C by interposing B, and this is exactly the working of a thermometer: the liquid column of a mercury thermometer is body B, in equilibrium with the unknown A, and the scale is calibrated against a fixed reference. Without the zeroth law there would be no consistent scale, and thermometers could not be compared with one another.",
      },
      {
        kind: "reasoning",
        question:
          "A hot steel spoon is placed in a bowl of cold water. Describe the direction of heat flow at the microscopic level, and explain why the water's temperature rises even though no 'heat' is stored in it at the start.",
        answer:
          "At the steel-water interface the surface metal atoms vibrate more energetically than the adjacent water molecules, so energy passes from the steel to the water: as an exchange of photons (or, more accurately, of vibrational energy quanta) across the interface. The water gains internal energy, which shows up as a rise in the average kinetic energy of its molecules and hence as a rise in temperature. Nothing 'containing heat' moved into the water; what moved was energy, and the water's internal energy increased by exactly the amount the steel lost (minus a small part carried away as sound and to the surroundings).",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Heat and Temperature",
        href: "/class-11-notes/physics/chapters/heat-and-temperature",
      },
      {
        label: "Thermodynamics 3D lab",
        href: "/lab/ph-3d-thermodynamics",
      },
      {
        label: "Heat determinations 3D lab",
        href: "/lab/ph-3d-heat-determinations",
      },
    ],
  },

  "thermal-expansion": {
    misconceptions: [
      {
        claim:
          "All substances expand by the same fraction when heated, so a metal and a glass rod of the same length change length equally.",
        why:
          "The coefficient of expansion is a property of the material, set by the anharmonicity of its interatomic potential. It ranges over more than an order of magnitude between common materials.",
        correction:
          "alpha is characteristic of the material: about 12 x 10^-6 per K for steel, 23 x 10^-6 for aluminium, and about 0.5 x 10^-6 for fused silica. For a given dT and L, the extension is dL = alpha L dT, so a fused-silica optical element changes length by about 25 times less than a steel one of the same size.",
      },
      {
        claim:
          "Water expands when it freezes, so the volume expansion coefficient of water is always positive.",
        why:
          "Water is anomalous between 0 and 4 degrees C: it contracts on cooling down to 4 degrees C and then expands again as it cools towards freezing, because the open hydrogen-bonded structure of ice occupies more volume.",
        correction:
          "Water's expansion is negative between 0 and 4 degrees C (density maximum at 4 degrees C) and positive outside that range. Hence the apparent expansion of a liquid in a container, and the freezing of a full bottle into a cracked one, and the reason lakes freeze from the top down.",
      },
      {
        claim:
          "The cubical expansion coefficient gamma is a completely independent material constant.",
        why:
          "For an isotropic solid the volume and length changes are tied together, so gamma is fixed by alpha. It is not independent data.",
        correction:
          "gamma = 3 alpha for a solid (V' = V(1 + 3 alpha dT) to first order), the superficial expansion coefficient is 2 alpha, and for a liquid the cubical coefficient is the sum of the real (cubical) and the apparent (container) contributions.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 10 m long steel rail (alpha = 12 x 10^-6 per K) is laid with both ends fixed. The temperature rises by 40 K. Find the thermal stress developed in the rail if E = 200 GPa.",
        answer:
          "Free expansion would be dL = alpha L dT = 12 x 10^-6 x 10 x 40 = 4.8 x 10^-3 m. The ends cannot move, so this expansion is prevented and the rail is compressed by the equivalent strain eps = dL / L = 4.8 x 10^-4. The stress is sigma = E eps = 200 x 10^9 x 4.8 x 10^-4 = 9.6 x 10^7 Pa = 96 MPa. Equivalently sigma = E alpha dT, the standard formula for a constrained bar.",
      },
      {
        kind: "derivation",
        question:
          "Derive the relation gamma = 3 alpha between the cubical and linear expansivities of an isotropic solid.",
        answer:
          "Let the solid have side L and volume V = L^3. After a temperature rise dT the side becomes L' = L (1 + alpha dT), so V' = L^3 (1 + alpha dT)^3 = V (1 + 3 alpha dT + 3 alpha^2 dT^2 + alpha^3 dT^3). For small dT the higher-order terms are negligible, so V' = V (1 + 3 alpha dT). Comparing with the definition V' = V (1 + gamma dT) gives gamma = 3 alpha. The same argument for area, A' = A (1 + 2 alpha dT), gives the superficial expansivity 2 alpha.",
      },
      {
        kind: "reasoning",
        question:
          "A telescope mirror is machined from fused silica rather than aluminium. Explain the thermal reasoning, and say what property of the mirror material the design is really protecting.",
        answer:
          "A mirror's figure must stay within a fraction of a wavelength of perfect over the night, so its shape must not change as the night temperature swings. An aluminium mirror expands about 23 x 10^-6 per K and fused silica only about 0.5 x 10^-6, so the silica mirror's shape changes roughly 25 times less. The property being protected is really the thermal stability of the figure (and the focal length), not the absolute size: the mirror's expansion is matched by the support and the spacing of the segments, and the design compensates the remaining expansion. The low expansivity of fused silica comes from the very stiff, nearly harmonic Si-O bond, whose low anharmonicity makes the mean interatomic separation almost independent of temperature.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Thermal Expansion",
        href: "/class-11-notes/physics/chapters/thermal-expansion",
      },
      {
        label: "Heat determinations 3D lab",
        href: "/lab/ph-3d-heat-determinations",
      },
      {
        label: "Heat calculator",
        href: "/lab/ph-calc-heat",
      },
    ],
  },

  "quantity-of-heat": {
    misconceptions: [
      {
        claim:
          "While water boils, the temperature of the water keeps rising because the flame is still heating it.",
        why:
          "During a phase change the energy supplied goes into breaking intermolecular bonds (latent heat), not into raising the kinetic energy of the molecules. The temperature stays at the boiling point until the liquid has all become vapour.",
        correction:
          "Q = m L is the energy needed for the change of phase at constant temperature. For water at 100 degrees C, L = 2.26 x 10^6 J/kg; boiling 1 kg absorbs 2.26 MJ with no change in temperature.",
      },
      {
        claim:
          "The specific heat capacity of water is the heat needed to raise 1 kg of water by 1 degree C, so it is the same for all bodies with the same mass.",
        why:
          "Specific heat capacity is a property of the material, not of the mass alone. Water's is unusually large because of the hydrogen-bonded structure, and the value also depends slightly on the temperature range and on whether the heating is at constant pressure or constant volume.",
        correction:
          "c is characteristic of the material: about 4200 J/(kg K) for water, 900 for aluminium, 380 for copper, 840 for glass. The heat needed is Q = m c dT, so it depends on the mass, the material and the temperature change together.",
      },
      {
        claim:
          "A cold bottle taken out of a refrigerator warms up at a steady rate until it reaches room temperature.",
        why:
          "The rate of warming falls as the temperature difference shrinks, following Newton's law of cooling. The curve is exponential, never a straight line, and in practice the last few degrees take a long time.",
        correction:
          "dT/dt = -k (T - T_s), so T - T_s = (T_0 - T_s) e^(-k t). The rate of change is largest at the start and tends to zero as equilibrium is approached.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "How much heat is needed to melt 0.50 kg of ice at 0 degrees C and then raise the resulting water to 20 degrees C? Take L_f = 3.34 x 10^5 J/kg and c_water = 4200 J/(kg K).",
        answer:
          "Melting: Q1 = m L = 0.50 x 3.34 x 10^5 = 1.67 x 10^5 J (at constant temperature). Warming: Q2 = m c dT = 0.50 x 4200 x 20 = 4.2 x 10^4 J. Total Q = 1.67 x 10^5 + 4.2 x 10^4 = 2.09 x 10^5 J. Note that the first stage changes no temperature at all, which is the point of the latent heat.",
      },
      {
        kind: "derivation",
        question:
          "Derive Newton's law of cooling from the assumption that the rate of heat loss is proportional to the excess of temperature over the surroundings.",
        answer:
          "Let the body's temperature be T and the surroundings T_s, and let the heat lost per second be proportional to the excess: dQ/dt = -k (T - T_s), with k > 0. By the definition of heat, dQ = m c dT for a body of constant specific heat, so m c dT/dt = -k (T - T_s). Separating variables, dT/(T - T_s) = -(k/m c) dt. Integrating from T_0 at t = 0 gives ln[(T - T_s)/(T_0 - T_s)] = -(k/m c) t, so T - T_s = (T_0 - T_s) e^(-k t / m c). The excess temperature therefore falls exponentially, with time constant m c / k.",
      },
      {
        kind: "reasoning",
        question:
          "A kettle of water is heated on a stove. The water reaches a boil and then the temperature stops rising. Explain the energy balance once boiling starts, and identify where the energy is going.",
        answer:
          "Once boiling starts, the temperature stays at the boiling point (100 degrees C at 1 atm) because the energy supplied is used as latent heat of vaporisation: the rate of vaporisation is set by the rate of energy supply, Q/t = m_dot L. The energy goes into overcoming the intermolecular attraction that holds the liquid together, and the escaping vapour carries away the energy that a thermometer would otherwise register. Some is also lost to the vessel and the air. This is why boiling is a good way to cook: the temperature is capped at 100 degrees C, and the energy delivered goes into turning liquid into steam rather than into overheating the water.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Quantity of Heat",
        href: "/class-11-notes/physics/chapters/quantity-of-heat",
      },
      {
        label: "Heat calculator",
        href: "/lab/ph-calc-heat",
      },
      {
        label: "Heat determinations 3D lab",
        href: "/lab/ph-3d-heat-determinations",
      },
    ],
  },

  "rate-of-heat-flow": {
    misconceptions: [
      {
        claim:
          "Heat always flows from the hotter body to the colder one, and stops only when the two reach the same temperature.",
        why:
          "That is right for conduction and convection, but radiation can flow in both directions simultaneously, and the net radiation flow depends on the fourth power of temperature, not on the difference.",
        correction:
          "The net conductive and convective flow is down the temperature gradient. For radiation the net power is P = epsilon sigma A (T_hot^4 - T_cold^4), which is down the gradient of the fourth power, and each body both emits and absorbs at all times.",
      },
      {
        claim:
          "Metal is a good conductor of heat, so a metal spoon in a bowl of soup is used to stir it.",
        why:
          "A good conductor carries heat quickly away from the spoon's surface into the hand as well as into the soup, so the handle becomes hot. The cooking spoon is made of an insulator for exactly this reason.",
        correction:
          "A wooden or plastic handle is used because wood and plastic conduct heat poorly (k about 0.1 to 0.2 W/(m K)) compared with metal (copper 400 W/(m K)), so the handle stays near the ambient temperature while the metal part is in the soup.",
      },
      {
        claim:
          "The amount of heat conducted through a slab depends only on the temperature difference across it.",
        why:
          "Fourier's law has three factors besides the temperature difference: the area, the length of the slab and the conductivity of the material. A thin sheet conducts far more heat than a thick one at the same dT.",
        correction:
          "dQ/dt = -k A dT/dx. Doubling the area doubles the flow; doubling the length halves it; and the conductivity of the material sets the scale. A wall's insulation value is best expressed as a thermal resistance, R = L/(k A).",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A copper rod of length 1.0 m and cross-sectional area 1.0 x 10^-4 m^2 has its ends held at 100 degrees C and 0 degrees C. Take k = 400 W/(m K). Find the rate of heat flow through the rod.",
        answer:
          "dQ/dt = k A dT/dx = 400 x 1.0 x 10^-4 x (100 - 0) / 1.0 = 4.0 W. The rate is constant along a uniform rod, since the same energy passes every cross-section; it is the temperature gradient, not the heat flow, that changes.",
      },
      {
        kind: "derivation",
        question:
          "Derive the form of the Stefan-Boltzmann law for the power radiated by a black body, starting from the fact that the radiated power per unit area is proportional to the fourth power of the absolute temperature.",
        answer:
          "The empirical starting point is that the power emitted per unit area of a black body is E = sigma T^4, where sigma is the Stefan-Boltzmann constant. For a body of area A the total emitted power is P = sigma A T^4, and the same body absorbs radiation from its surroundings, so the net power lost to an environment at temperature T_s is P_net = sigma A (T^4 - T_s^4). Dividing the equation by A gives the energy density of radiation as u = (4 sigma / c) T^4, and comparing with the Planck distribution shows that sigma = 2 pi^5 k^4 / (15 c^2 h^3) = 5.670374419 x 10^-8 W/(m^2 K^4), a value fixed by the constants k, h and c.",
      },
      {
        kind: "reasoning",
        question:
          "A vacuum flask keeps soup hot for hours. Using the three mechanisms of heat transfer, explain which one the flask is designed to suppress and how the design does it.",
        answer:
          "The three mechanisms are conduction, convection and radiation, and a good flask suppresses all three, in that order of importance for a hot liquid. Conduction is reduced by the double wall and the thin, poorly conducting neck (a glass or plastic lid rather than metal); convection is suppressed by the narrow neck and the still air trapped in the evacuated gap, since there is no bulk motion of a medium to carry heat; radiation is reduced by silvering the reflective surfaces facing the gap, because a polished surface has a low emissivity and so both emits and absorbs little. The evacuated space between the walls also removes the thermal conduction through the air, which is the dominant loss in an ordinary single-walled bottle.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Rate of Heat Flow",
        href: "/class-11-notes/physics/chapters/rate-of-heat-flow",
      },
      {
        label: "Thermodynamics theory lab",
        href: "/lab/ph-th-thermo",
      },
      {
        label: "Heat determinations 3D lab",
        href: "/lab/ph-3d-heat-determinations",
      },
    ],
  },

  "ideal-gas": {
    misconceptions: [
      {
        claim:
          "All the molecules of a gas at a given temperature move with the same speed.",
        why:
          "Molecular speeds are distributed over a wide range (the Maxwell-Boltzmann distribution); only the mean translational kinetic energy is fixed by the temperature. Collisions constantly redistribute energy between molecules.",
        correction:
          "T fixes the average: (1/2) m <v^2> = (3/2) k T. Individual molecules move at very different speeds, from near zero to many times the root mean square speed, and the temperature of the gas is a statistical statement about the ensemble.",
      },
      {
        claim:
          "The pressure of a gas is caused by the molecules pushing on the walls.",
        why:
          "That is a good picture, but it is incomplete: the pressure is the rate of momentum transfer at the wall, and the molecules are not constantly pushing - they are in free flight between collisions.",
        correction:
          "Each collision transfers 2 m v_x of momentum to the wall (in the wall's frame the molecule's normal momentum reverses). Summing over all molecules gives P = (1/3) (N/V) m <v^2>, which is the kinetic-theory result: pressure is a consequence of molecular motion, not of a steady push.",
      },
      {
        claim:
          "The molar heat capacity of a gas is the same whether it is heated at constant pressure or at constant volume.",
        why:
          "At constant pressure the gas expands and does work, so more heat is needed for the same temperature rise. The two heat capacities differ by exactly R.",
        correction:
          "C_P - C_V = R for an ideal gas. For a monatomic gas C_V = 3R/2 and C_P = 5R/2; for a diatomic gas at ordinary temperatures C_V = 5R/2 and C_P = 7R/2, the extra degree of freedom being rotation.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 2.0 litre container holds nitrogen gas at 300 K and 1.00 atm. Find the number of moles, the number of molecules, and the root mean square speed of the molecules. Take R = 8.314 J/(mol K) and the mass of N2 as 28 x 1.66 x 10^-27 kg.",
        answer:
          "n = PV/(RT) = (1.00 x 1.013 x 10^5 x 2.0 x 10^-3) / (8.314 x 300) = 202.6 / 2494 = 0.0812 mol. Number of molecules N = n x 6.022 x 10^23 = 4.89 x 10^22. The molecular mass is m = 28 x 1.66 x 10^-27 = 4.65 x 10^-26 kg, so v_rms = sqrt(3 k T / m) = sqrt(3 x 1.380649 x 10^-23 x 300 / 4.65 x 10^-26) = sqrt(2.67 x 10^5) = 517 m/s.",
      },
      {
        kind: "derivation",
        question:
          "Starting from the elastic collisions of molecules with the walls of a container, derive the kinetic-theory expression P = (1/3) (N/V) m v_rms^2 for the pressure of an ideal gas.",
        answer:
          "Consider a molecule of mass m with velocity components (v_x, v_y, v_z) in a cube of side L. A collision with a wall reverses v_x, so the impulse delivered to the wall is 2 m v_x. If the molecule makes n_x collisions per second with that wall, the force on it is 2 m v_x n_x, and since it crosses the cube n_x = v_x / (2L) times per second, the force is m v_x^2 / L. Summing over all molecules and over the three directions, the total force on the wall is (m/L) sum(v_x^2 + v_y^2 + v_z^2) = (m/L) N <v^2> for a gas in equilibrium. Dividing by the wall area A = L^2 gives P = (m N <v^2>) / (V L) = (N/V) m <v^2> / 3, since <v^2> = <v_x^2> + <v_y^2> + <v_z^2> = 3 <v_x^2> by isotropy. Hence P = (1/3) (N/V) m v_rms^2.",
      },
      {
        kind: "reasoning",
        question:
          "A gas is compressed in a cylinder with a piston, and the temperature stays constant. Explain what happens to the rms speed, to the pressure, and to the time between successive collisions of a given molecule with the container wall.",
        answer:
          "At constant temperature (1/2) m v_rms^2 = (3/2) k T is unchanged, so the rms speed does not change - compression at constant temperature changes only how the molecules are packed, not how fast they move. The pressure rises, because P = (1/3) (N/V) m v_rms^2 and N/V increases as the volume falls: halving the volume doubles the pressure. The time between successive collisions of a given molecule with the wall falls, because the wall is closer to the molecule on average, and there are correspondingly more molecules per unit volume, so the collision rate goes up roughly as 1/sqrt(V). This is why a gas heats up when it is compressed rapidly: there is no time for the heat to escape, and the work done on the gas becomes internal energy.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Ideal Gas",
        href: "/class-11-notes/physics/chapters/ideal-gas",
      },
      {
        label: "Elasticity and gas unit suite 3D",
        href: "/lab/ph-3d-elasticity-gas",
      },
      {
        label: "Thermodynamics theory lab",
        href: "/lab/ph-th-thermo",
      },
    ],
  },
};

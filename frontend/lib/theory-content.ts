/**
 * Theory content data extracted from theory-panel.tsx
 * This module contains all the theory data for the TheoryPanel component.
 * Keep this file organized by subject → topic → content.
 */

interface SectionData {
  heading: string;
  content: string;
  formula?: string;
  example?: string;
  keyPoints?: string[];
  commonMistakes?: string[];
  practiceQuestions?: string[];
}

interface TopicData {
  title: string;
  overview: string;
  sections: SectionData[];
  keyPoints: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
  /** Optional enriched variant of the content; when present the panel offers a tab switch */
  enrichedContent?: TopicData;
}

export const THEORY_CONTENT: Record<string, Record<string, TopicData>> = {
  physics: {
    kinematics: {
      title: "Kinematics — Motion in One and Two Dimensions",
      overview: "Kinematics is the branch of classical mechanics that describes the motion of points, objects, and systems without reference to the forces that cause the motion. It covers linear motion with constant acceleration, projectile motion, relative velocity, and graphical representations of motion.",
      sections: [
        {
          heading: "1. Basic Quantities in Motion",
          content: "Before analyzing any motion, we must distinguish between scalar and vector quantities. Distance is the total path covered (scalar), while displacement is the shortest distance from initial to final position with direction (vector). Similarly, speed is distance/time (scalar), while velocity is displacement/time (vector). Acceleration is the rate of change of velocity — an object can have constant speed but still accelerate if its direction changes.",
          formula: "\\begin{aligned} \\text{Average speed} &= \\frac{\\text{total distance}}{\\text{total time}} \\\\ \\text{Average velocity} &= \\frac{\\Delta \\vec{s}}{\\Delta t} = \\frac{\\vec{s}_f - \\vec{s}_i}{t_f - t_i} \\\\ \\text{Instantaneous velocity} &= \\frac{d\\vec{s}}{dt} \\end{aligned}",
        },
        {
          heading: "2. Equations of Motion (Constant Acceleration)",
          content: "When acceleration is constant, three kinematic equations relate initial velocity (u), final velocity (v), acceleration (a), displacement (s), and time (t). These are derived from the definitions of velocity and acceleration. They are valid only for constant acceleration.",
          formula: "\\begin{aligned} v &= u + at \\\\ s &= ut + \\tfrac{1}{2}at^2 \\\\ v^2 &= u^2 + 2as \\end{aligned}",
          example: "Example: A car accelerates from rest at 2 m/s² for 5 seconds. Find (a) final velocity and (b) distance covered.\n(a) v = u + at = 0 + (2)(5) = 10 m/s\n(b) s = ut + ½at² = 0 + ½(2)(25) = 25 m",
        },
        {
          heading: "3. Projectile Motion",
          content: "Projectile motion is the motion of an object thrown into the air, subject only to acceleration due to gravity. The key insight is that horizontal and vertical motions are independent. The horizontal motion has constant velocity; the vertical motion has constant downward acceleration g. The trajectory is a parabola.",
          formula: "\\begin{aligned} R &= \\frac{u^2 \\sin 2\\theta}{g} \\\\ H &= \\frac{u^2 \\sin^2 \\theta}{2g} \\\\ T &= \\frac{2u \\sin\\theta}{g} \\end{aligned}",
          example: "Example: A ball is projected at 20 m/s at 30° to the horizontal. Find range, max height, and time of flight. (g = 10 m/s²)\nT = 2(20)sin30°/10 = 2 s\nR = (400)(sin60°)/10 = 34.64 m\nH = (400)(sin²30°)/20 = 5 m",
        },
        {
          heading: "4. Relative Velocity",
          content: "Relative velocity is the velocity of one object as observed from another moving object. If object A has velocity v_A and object B has velocity v_B (both measured in the same frame), the velocity of A relative to B is v_AB = v_A - v_B.",
          formula: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B, \\qquad \\vec{v}_{BA} = -\\vec{v}_{AB}",
        },
      ],
      keyPoints: [
        "Kinematic equations apply ONLY for constant acceleration",
        "Horizontal and vertical components of projectile motion are independent",
        "Range is maximum at θ = 45° (same launch speed)",
        "At the highest point of projectile motion, vertical velocity is zero but acceleration is still g downward",
        "The slope of an s-t graph = velocity; slope of v-t graph = acceleration; area under v-t graph = displacement",
      ],
      commonMistakes: [
        "Using kinematic equations when acceleration is not constant",
        "Forgetting that acceleration due to gravity is always downward",
        "Confusing distance (scalar) with displacement (vector)",
        "Using R = u²/g for non-level ground",
      ],
      practiceQuestions: [
        "A stone is thrown vertically upward with velocity 50 m/s. Find the maximum height reached. (g = 10 m/s²)",
        "A projectile is launched at 30° with initial speed 40 m/s. Calculate time of flight, range, and maximum height. (g = 9.8 m/s²)",
        "A car traveling at 20 m/s applies brakes and decelerates at 4 m/s². How far does it travel before stopping?",
        "A boat crosses a 200 m wide river flowing at 3 m/s. The boat heads perpendicular to the current at 4 m/s. Find time to cross and downstream drift.",
        "Two cars move toward each other at 30 m/s and 20 m/s. What is the relative velocity of one car with respect to the other?",
      ],
      enrichedContent: {
        title: "Kinematics — The Grammar of Motion",
        overview: "Kinematics does not ask WHY things move — that is dynamics. It asks a subtler question: how do we describe motion so precisely that we can predict it? This enriched view treats kinematics as a language: position, velocity and acceleration are its nouns, graphs are its pictures, vectors are its grammar, and reference frames are its point of view. Master the language and every projectile, river-crossing and racing-car problem becomes a sentence you can read at sight.",
        sections: [
          {
            heading: "1. Motion Is a Story Told in Three Voices",
            content: "Every motion has three layers. Position says WHERE you are. Velocity says where you are HEADING and how fast the story is moving. Acceleration says how the heading itself is changing — it is the plot twist. The deep insight: these layers are a hierarchy of change. Velocity is the rate of change of position; acceleration is the rate of change of velocity. Each layer is the slope of the one below it on a time graph. Your body knows this hierarchy intuitively: in a car at steady 100 km/h you feel nothing (velocity is invisible to the senses), but you feel pressed into the seat when the car speeds up (acceleration is what you FEEL). Physics formalizes what your body already knows: only change of motion is directly perceptible; motion itself is not.",
            formula: "\\vec{v} = \\frac{d\\vec{s}}{dt}, \\qquad \\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{s}}{dt^2}",
            keyPoints: [
              "Position → velocity → acceleration is a ladder of rates of change; each rung is the derivative (slope) of the one below",
              "You never feel velocity — you feel acceleration. A jet at 900 km/h feels like standing still",
              "The reverse ladder also works: the area under an a-t graph gives velocity, and under a v-t graph gives displacement",
            ],
          },
          {
            heading: "2. Reference Frames — Motion Does Not Exist Without an Observer",
            content: "Ask 'is the passenger on a moving bus at rest or in motion?' and the honest answer is BOTH. Relative to the bus seat, she is at rest; relative to the road, she moves at the bus speed; relative to the Sun, she moves at about 30 km/s because the Earth orbits it. Motion is not a property of an object alone — it is a property of the object-observer PAIR. This is Galileo's great insight, and it is deeper than it looks: the laws of physics take exactly the same form in every frame moving at constant velocity (an 'inertial frame'). No experiment done entirely inside a smoothly moving bus can reveal the bus's speed — only acceleration betrays absolute change. Relative velocity is simply the arithmetic of switching viewpoints: v_AB = v_A − v_B means 'subtract the observer's own motion to see the world from their eyes.'",
            formula: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B \\quad\\text{(velocity of A as seen from B's moving viewpoint)}",
            example: "Thought experiment: you drop a ball inside a train moving at constant 30 m/s. To you it falls straight down. To a platform observer it traces a parabola — it kept the train's horizontal velocity while falling. BOTH descriptions are correct. The ball's vertical fall is identical in both frames; only the horizontal bookkeeping differs. This single example contains the whole secret of projectile motion.",
            keyPoints: [
              "'At rest' and 'in motion' are meaningless without specifying the frame",
              "All inertial frames are equally valid — physics cannot prefer one (Galilean relativity)",
              "Relative velocity = translating the origin of your viewpoint onto a moving object",
            ],
          },
          {
            heading: "3. Projectile Motion — Two Motions Sharing One Clock",
            content: "A projectile is an object doing two completely independent things at once. Horizontally, nothing pushes it (ignoring air), so it coasts at constant velocity — a steady, unchanging straight line. Vertically, gravity pulls constantly, so it is simple free fall. The only thing the two motions share is TIME: the clock ticks identically for both. This 'independence principle' is why a bullet fired horizontally and a bullet dropped from the same height hit the ground simultaneously — the fired bullet's horizontal speed does nothing to slow its fall. Newton pushed this idea to its limit with his famous cannonball: fire it faster and it lands farther because the Earth curves away beneath it. At about 8 km/s the ground curves away exactly as fast as the ball falls — and the ball never lands. That is an orbit. An astronaut is not beyond gravity; she is falling forever and constantly missing the Earth.",
            formula: "\\begin{aligned} x(t) &= (u\\cos\\theta)\\,t \\\\ y(t) &= (u\\sin\\theta)\\,t - \\tfrac{1}{2}gt^2 \\\\ \\text{Orbit condition:} \\quad \\frac{v^2}{R_{\\text{Earth}}} &= g \\end{aligned}",
            example: "Range symmetry: launch angles 30° and 60° with the same speed give the SAME range, because R depends on sin2θ and sin60° = sin120°. The 30° shot flies flat and fast; the 60° shot hangs in the air. Different stories, same ending. This is why a cricketer can hit a six lofted high or driven flat and still clear the boundary.",
            keyPoints: [
              "Horizontal and vertical motions are independent — time is the only shared variable",
              "Complementary angles (θ and 90°−θ) give equal ranges; only 45° is self-complementary, hence unique maximum",
              "An orbit is projectile motion where the surface curves away as fast as the object falls",
              "45° is optimal ONLY in vacuum — with air resistance the best angle is lower (~40° for a baseball)",
            ],
          },
          {
            heading: "4. Graphs — Pictures of the Story",
            content: "A motion graph is not just data; it is a narrative you can read with your eyes. On a position-time graph, the SLOPE at any point is the velocity: steep = fast, flat = stopped, negative = moving backwards. Curvature tells the deeper story — a curve bending upward means the slope is growing, i.e. positive acceleration. On a velocity-time graph the slope is acceleration, and now a new power appears: the AREA between the curve and the time axis is the displacement. Area means accumulation — adding up little strips of (velocity × time) = little distances. This slope/area duality is the heartbeat of calculus, and graphs make it visible without any formulas. Two objects' graphs crossing does NOT mean they collide — it means they share a position at that instant; whether they hit depends on whether they are at the same place at the same TIME, which is exactly what an intersection encodes.",
            formula: "\\text{slope of } s\\text{-}t = v, \\quad \\text{slope of } v\\text{-}t = a, \\quad \\text{area under } v\\text{-}t = \\Delta s, \\quad \\text{area under } a\\text{-}t = \\Delta v",
            example: "Reading trick: a v-t graph that dips below the time axis means the object reversed direction — and the 'area' below the axis counts as NEGATIVE displacement but POSITIVE distance. Distance travelled = total area ignoring sign; displacement = signed area. One graph, two different questions, two different readings.",
            keyPoints: [
              "Slope reads the layer above; area reads the layer below — graphs and calculus are the same language",
              "Curvature of an s-t graph reveals the SIGN of acceleration before any calculation",
              "Signed area = displacement; absolute area = distance travelled",
            ],
          },
          {
            heading: "5. Vectors — The Grammar of Direction",
            content: "Scalars say 'how much'; vectors say 'how much AND which way.' The reason we can split motion into x and y pieces and recombine them is superposition: perpendicular directions do not interfere. A river flowing east cannot make your boat drift north; it can only add an eastward component to whatever you do. This is why every 2D problem reduces to two independent 1D problems. Vector addition is displacement bookkeeping — walking 3 km east then 4 km north lands you exactly where a single 5 km walk at 53° would (the 3-4-5 triangle is Pythagoras wearing a physics costume). Subtraction is addition of the opposite: v_A − v_B asks 'what must I add to B's motion to get A's?' — which is precisely the velocity of A as seen by an observer riding along with B.",
            formula: "|\\vec{R}| = \\sqrt{R_x^2 + R_y^2}, \\qquad \\tan\\phi = \\frac{R_y}{R_x}",
            example: "The classic river crossing: you row straight across at 4 m/s while the current pushes you downstream at 3 m/s. You cannot 'fight' the current by aiming across — to land directly opposite you must aim UPSTREAM at an angle so your rowing vector plus the current vector sum to a straight-across result. The boat's heading and the boat's path are two different vectors; confusing them is the oldest mistake in kinematics.",
            keyPoints: [
              "Perpendicular components are independent — 2D motion is two 1D motions in disguise",
              "Heading (where you point) ≠ path (where you go); the current/wind adds the difference",
              "Vector subtraction = 'what is missing from B to reach A'",
            ],
          },
          {
            heading: "6. Where the Equations Stop Telling the Truth",
            content: "Every kinematic equation you have met assumes constant acceleration. The moment acceleration varies, they silently lie. Real projectiles feel air drag that grows with speed, so their acceleration is NOT constant: the parabola skews — the falling half is steeper and shorter than the rising half, and the range collapses. A skydiver's acceleration starts at g and decays to zero as drag balances weight; her velocity then stops growing — terminal velocity. Kinematics can still DESCRIBE such motion (graphs always work; they make no assumptions), but the tidy three equations do not apply. Finally, remember kinematics is the 'what,' not the 'why': it never explains where the acceleration came from. That question — forces causing acceleration — is dynamics, Newton's second law, the next chapter of the story. Kinematics gives dynamics a precise language to speak in.",
            formula: "v_t = \\sqrt{\\frac{2mg}{\\rho C_d A}} \\quad\\text{(terminal velocity when drag } = \\text{weight)}",
            keyPoints: [
              "Graphs are always valid; the three SUVAT equations are valid ONLY for constant acceleration",
              "Air drag makes real trajectories asymmetric — rise gentler than fall, range shorter than predicted",
              "Terminal velocity = the moment acceleration dies while velocity survives",
              "Kinematics describes motion; dynamics explains it — know which question you are answering",
            ],
          },
        ],
        keyPoints: [
          "Velocity is invisible to the senses; acceleration is what you feel — physics formalizes bodily intuition",
          "Motion is always relative to a chosen frame; all inertial frames are equally legitimate",
          "Projectile motion = free fall layered over constant-velocity coasting, joined only by time",
          "Slope climbs the ladder of motion, area descends it — the whole of calculus visible on a graph",
          "Orbits are falls that keep missing the ground; terminal velocity is acceleration surrendering to drag",
        ],
        commonMistakes: [
          "Believing the fired bullet lands after the dropped one — horizontal speed has zero effect on fall time",
          "Reading an s-t graph as a picture of the path in space; it is a picture of position versus time, not a map",
          "Assuming 45° always gives maximum range — true only without air resistance",
          "Averaging speeds arithmetically instead of harmonic-mean/total-distance-over-total-time for equal legs of a trip",
          "Confusing heading with resultant path in river/wind problems — forgetting the medium's velocity adds to yours",
        ],
        practiceQuestions: [
          "Conceptual: inside a smoothly moving train you toss a ball straight up. Where does it land, and how does the answer differ for a platform observer? Explain using frames of reference.",
          "A hunter aims directly at a monkey hanging from a branch; the monkey lets go the instant the gun fires. Show that the bullet still hits the monkey (ignore air resistance) and explain why independence of motion guarantees this.",
          "Two stones are launched with the same speed at 30° and 60°. Without calculation, argue why their ranges are equal and which stays airborne longer.",
          "From a v-t graph that is a triangle rising to 20 m/s in 5 s then falling to zero in 10 s, find total distance, displacement, and the acceleration in each phase — using slopes and areas only, no equations.",
          "A plane must fly due north in a wind blowing east at 50 km/h. If its airspeed is 250 km/h, what heading must it maintain, and what is its ground speed? Why is the heading not due north?",
          "Estimate: at what speed does air drag begin to noticeably break the 'constant acceleration' assumption for a falling cricket ball? Justify your estimate.",
        ],
      },
    },
    "laws-motion": {
      title: "Newton's Laws of Motion and Friction",
      overview: "Newton's three laws of motion form the foundation of classical mechanics. The first law defines inertia, the second law quantifies force (F = ma), and the third law describes action-reaction pairs. Friction is a contact force that opposes relative motion between surfaces.",
      sections: [
        {
          heading: "1. Newton's First Law (Inertia)",
          content: "An object at rest stays at rest, and an object in motion continues in uniform motion in a straight line, unless acted upon by a net external force. Inertia is the property of matter that resists changes in motion. The mass of an object is a measure of its inertia.",
          formula: "\\text{If } \\sum \\vec{F} = 0, \\text{ then } \\vec{a} = 0 \\implies \\vec{v} = \\text{constant}",
        },
        {
          heading: "2. Newton's Second Law",
          content: "The net force acting on an object equals the rate of change of its momentum. For constant mass, this simplifies to F = ma. This is the most important equation in mechanics. When multiple forces act, resolve them into components and apply F_net = ma separately for each direction.",
          formula: "\\vec{F}_{\\text{net}} = m\\vec{a}",
          example: "Example: A 5 kg block is pulled by a 20 N horizontal force on a frictionless surface. Find acceleration.\nF_net = ma → 20 = 5a → a = 4 m/s²",
        },
        {
          heading: "3. Newton's Third Law",
          content: "For every action there is an equal and opposite reaction. Action-reaction pairs act on DIFFERENT bodies — they never cancel each other on a single body.",
          formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
        },
        {
          heading: "4. Friction",
          content: "Friction opposes relative motion between surfaces. Static friction (f_s) prevents motion from starting: f_s ≤ μ_s N. Kinetic friction (f_k) acts when surfaces slide: f_k = μ_k N. Typically μ_s > μ_k.",
          formula: "\\begin{aligned} f_s &\\leq \\mu_s N \\\\ f_k &= \\mu_k N \\end{aligned}",
        },
        {
          heading: "5. Motion on an Inclined Plane",
          content: "On an incline at angle θ, weight resolves into mg sin θ down the slope and mg cos θ perpendicular to the slope. The normal force equals mg cos θ. If frictionless, acceleration down the plane is g sin θ.",
          formula: "\\begin{aligned} N &= mg\\cos\\theta \\\\ a &= g\\sin\\theta - \\mu g\\cos\\theta \\end{aligned}",
        },
      ],
      keyPoints: [
        "F = ma is valid in inertial (non-accelerating) reference frames",
        "Action-reaction pairs act on different bodies — they don't cancel",
        "Static friction is self-adjusting up to its maximum value μ_s N",
        "On an incline: normal force = mg cos θ, component down slope = mg sin θ",
      ],
      commonMistakes: [
        "Thinking a larger mass falls faster (in vacuum, all objects fall at same rate)",
        "Confusing weight (mg) with mass (m)",
        "Forgetting that friction opposes relative motion, not necessarily motion itself",
        "Using f = μN for static friction (should be f ≤ μ_s N)",
      ],
      practiceQuestions: [
        "A 10 kg box is pushed with 50 N on a rough surface (μ = 0.3). Find the acceleration.",
        "Two masses (3 kg and 5 kg) are connected by a string over a frictionless pulley. Find acceleration and tension.",
        "A block just begins to slide down a 35° incline. Find the coefficient of static friction.",
        "A 60 kg person stands on a scale in an elevator accelerating upward at 2 m/s². What does the scale read?",
        "A car rounds a curve of radius 50 m. If μ = 0.6, find the maximum safe speed.",
      ],
      enrichedContent: {
        title: "Newton's Laws — The Operating System of the Physical World",
        overview: "The three laws are not three tips about pushing things. Together they form a complete logical machine: the first law builds the stage (frames where physics behaves), the second law is the equation of motion that predicts the future from the present, and the third law reveals that forces are never solitary — they are the two ends of a single interaction, and their bookkeeping is why momentum is conserved across the universe. Seen this way, everything from rockets to walking to elevators becomes an application of one coherent system.",
        sections: [
          {
            heading: "1. The First Law Is Not a Special Case — It Builds the Stage",
            content: "Students often think the first law is just F = ma with F = 0. It is deeper than that: it DEFINES the kind of reference frame in which F = ma is even allowed to work. Watch a ball on the floor of a braking bus: with no horizontal force on it, the ball mysteriously rolls forward — the second law appears violated. What actually failed is the frame: the braking bus is accelerating, and Newton's laws only hold in inertial (non-accelerating) frames. The first law's job is to identify those frames — frames where force-free objects coast in straight lines. So the logical order is: first law finds the stage, second law runs the play, third law accounts for the actors. This is also why the first law feels 'obvious' yet was missed for two thousand years: Aristotle saw friction everywhere and concluded that motion needs a continuous cause. Galileo's genius was to IMAGINE the friction away and see that motion needs no cause at all — only CHANGE of motion does.",
            formula: "\\text{First law} \\;\\equiv\\; \\text{definition of an inertial frame: } \\sum\\vec{F}=0 \\implies \\vec{v}=\\text{const}",
            keyPoints: [
              "The first law defines WHERE the second law is valid — it is a statement about frames, not just about force-free objects",
              "Aristotle's error was treating friction as a law of nature instead of a nuisance force",
              "In an accelerating frame, free objects appear to accelerate with no cause — the frame itself is broken, not the laws",
            ],
          },
          {
            heading: "2. The Second Law Is a Prediction Machine (and Its True Form Is Momentum)",
            content: "F = ma is really a shortcut. Newton's actual statement was F = dp/dt: force is the rate at which momentum flows. For constant mass this collapses to ma, but the momentum form survives cases the shortcut cannot handle — a rocket accelerating by THROWING MASS BACKWARD has no constant m, yet F = dp/dt governs it perfectly. More importantly, understand what kind of object this law is: a differential equation. Give it the present (position and velocity of everything) and the forces, and it marches time forward in tiny steps, producing the entire future. That is the deep reason classical physics feels deterministic — the second law is the engine of prediction itself. One more subtlety: mass appears twice in physics — as inertia (resistance to acceleration, in F = ma) and as gravity (source of weight, in W = mg). That these two 'different' quantities are always exactly proportional is not an accident of units; it is the equivalence principle, the seed from which Einstein grew general relativity.",
            formula: "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt} \\;\\xrightarrow{\\;m\\text{ const}\\;}\\; m\\vec{a}",
            example: "Rocket logic in one line: exhaust gas gains backward momentum at rate F; by the third law the rocket gains forward momentum at the same rate — the rocket surfs on the momentum it throws away. No air to 'push against' is needed; rockets work best in vacuum.",
            keyPoints: [
              "F = dp/dt is the fundamental law; F = ma is its constant-mass special case",
              "The second law is a differential equation — it converts the present state plus forces into the entire future",
              "Inertial mass and gravitational mass being identical is the equivalence principle, not a coincidence",
            ],
          },
          {
            heading: "3. The Third Law — Forces Are Never Alone, and That Is Why Momentum Is Immortal",
            content: "A force is always one end of an interaction between TWO bodies; the other end is the equal-and-opposite force on the other body. The pair never cancels because the two forces act on different objects — cancelling requires acting on the same object. The third law's real content is conservation: if every interaction swaps equal and opposite momentum between bodies, then the TOTAL momentum of an isolated system cannot change, no matter how complicated the internals. Collisions, explosions, recoil — all are just momentum being redistributed. This resolves the horse-and-cart paradox: the horse pulls the cart and the cart pulls the horse equally — so how does anything move? Because motion is decided by the forces on EACH body separately. The horse also pushes BACKWARD on the ground; the ground pushes the horse FORWARD (that is the external force). The horse-cart system moves because the Earth joins the interaction. Walk, drive, fly — every locomotion is pushing something else backwards and being pushed forwards in return.",
            formula: "\\vec{F}_{AB} = -\\vec{F}_{BA} \\;\\implies\\; \\frac{d}{dt}\\left(\\vec{p}_A + \\vec{p}_B\\right) = 0 \\;\\text{(momentum conservation)}",
            example: "You jump: your legs push the Earth down with a force; the Earth pushes you up with the same force. You soar; the Earth recoils — by about 10⁻²³ m/s. The third law holds exactly; the asymmetry you see is just mass hiding the Earth's share of the motion.",
            keyPoints: [
              "Action-reaction pairs act on DIFFERENT bodies — they can never cancel each other",
              "The third law, applied system-wide, IS conservation of momentum",
              "All locomotion is pushing something else away; there is no other way to move yourself",
            ],
          },
          {
            heading: "4. Friction — Microscopic Welding, Macroscopic Rules",
            content: "Even 'smooth' surfaces are mountain ranges under magnification. When two surfaces meet, their peaks touch at a tiny fraction of the apparent area, and at those contact points atoms bond — microscopic welds. Friction is the force needed to keep breaking these welds. This picture explains the two strange empirical laws: (1) friction is independent of APPARENT contact area, because doubling the area halves the pressure, leaving the real contact area — and hence the total welding — unchanged; (2) friction is proportional to normal force, because pressing harder increases the real contact area. Static friction is not a fixed value but a self-adjusting RESPONSE: it matches your push exactly, up to a breaking point μ_sN. That is why it appears with an inequality. Once sliding begins, welds form and break continuously and kinetic friction settles at a lower, roughly constant μ_kN — surfaces in motion have less time to bond. Friction is thus the one force that knows your intentions: it only opposes the motion you are ABOUT to attempt.",
            formula: "f_s \\leq \\mu_s N \\quad\\text{(self-adjusting up to the limit)}, \\qquad f_k = \\mu_k N \\quad\\text{(constant once sliding)}",
            example: "The angle-of-repose trick: a block just starts to slide at incline angle θ. At that instant mg sinθ = μ_s mg cosθ, so μ_s = tanθ — the coefficient of friction is readable directly from an angle, with no force sensor. This is why engineers measure μ by tilting, not pulling.",
            keyPoints: [
              "Friction comes from microscopic welds at real contact points, not surface 'roughness' alone",
              "Real contact area ∝ normal force — this is WHY friction ∝ N and ignores apparent area",
              "Static friction is a self-adjusting response (inequality); kinetic friction is a constant (equality)",
            ],
          },
          {
            heading: "5. Centripetal Force Is a Job Title, Not a Force",
            content: "'Centripetal force' is not a new kind of force you add to a free-body diagram — it is a ROLE that some real force plays. In a car turning a corner, the role is cast as friction between tyre and road. For a satellite, gravity plays it. For a ball on a string, tension does. The requirement is geometrical: to bend a path of radius r at speed v, SOMETHING must supply mv²/r toward the centre; if no available force can, the object simply goes straight (the car skids outward — not because a 'centrifugal force' pushed it, but because inertia won). From inside the turning car you feel thrown outward; that sensation is real but it is your body demanding straight-line motion while the car turns beneath you — a frame effect, not a force. Banking a road cleverly recruits the NORMAL force into the centripetal role, so a curve can be taken even with zero friction at the design speed.",
            formula: "F_{\\text{centripetal}} = \\frac{mv^2}{r} \\quad\\text{(a requirement, met by friction, tension, gravity, or a banked normal force)}",
            example: "Banking: on a frictionless banked curve, N sinθ supplies the centripetal force and N cosθ balances weight. Dividing: tanθ = v²/(rg). The ideal banking angle depends only on design speed and radius — that is why highway ramps are banked exactly the way they are.",
            keyPoints: [
              "Never draw 'centripetal force' on a free-body diagram — identify the REAL force doing the job",
              "Centrifugal 'force' is an illusion of the rotating frame; the physics is inertia resisting the turn",
              "Banking transfers the centripetal job from friction to the normal force",
            ],
          },
          {
            heading: "6. Apparent Weight — When the Ground Lies to Your Feet",
            content: "Your sensation of weight is not gravity pulling you — it is the ground pushing back. A scale reads the NORMAL force, and the normal force only equals mg when nothing is accelerating vertically. In an elevator accelerating upward, the floor must push harder than gravity to accelerate you with it, so the scale reads m(g+a): you feel heavier — and you ARE being pushed harder. Accelerating down, the floor's push relaxes to m(g−a). In free fall the floor pushes not at all and the scale reads zero — not because gravity vanished (it is very much there, keeping you in orbit-sized acceleration) but because weight-as-felt is a contact force, and contact has been withdrawn. Astronauts are 'weightless' for exactly this reason: they and their craft are falling together, so neither pushes on the other. Apparent weight teaches the deepest lesson of Newtonian mechanics: what you FEEL is never the net force — it is one force among many.",
            formula: "N = m(g + a_{\\text{lift}}) \\;\\text{(up positive)}; \\qquad \\text{free fall: } N = 0 \\text{ while } g \\neq 0",
            keyPoints: [
              "Scales read normal force, not gravity — apparent weight is the floor's opinion of you",
              "Weightlessness = absence of contact force, not absence of gravity",
              "You feel individual forces, never the net force — the net force is what your motion reports",
            ],
          },
        ],
        keyPoints: [
          "Law 1 defines the frames, Law 2 predicts the future, Law 3 conserves momentum — one logical system",
          "The fundamental second law is F = dp/dt; rockets work because momentum, not air, is what gets pushed",
          "Every force is half of an interaction; the halves act on different bodies and never cancel",
          "Friction is microscopic welding: real contact area ∝ N explains both friction laws",
          "Centripetal force is a role played by real forces; centrifugal force is a frame illusion",
        ],
        commonMistakes: [
          "Adding a 'centripetal force' arrow to a free-body diagram alongside the real force already doing the job",
          "Saying action-reaction forces cancel — they act on different objects",
          "Believing constant force is needed for constant velocity — it is needed only to CHANGE velocity (friction hides this on Earth)",
          "Explaining the horse-cart paradox with the third law alone; you must analyse each body's forces separately",
          "Reading a scale as 'mass' — it measures the normal force, which varies with acceleration",
        ],
        practiceQuestions: [
          "A ball rolls toward the back of a suddenly accelerating truck, seemingly violating Newton's laws. Resolve the paradox by identifying the frame problem and re-analysing from the road frame.",
          "Derive why a rocket accelerates in vacuum using only F = dp/dt and the third law — no 'pushing against air' allowed in your explanation.",
          "Two blocks (2 kg, 3 kg) are pushed across a frictionless floor by a 10 N force on the 2 kg block. Find the acceleration and the contact force between the blocks. Why is the contact force less than 10 N?",
          "A 70 kg person stands on a scale in an elevator. Predict the reading when it (a) accelerates up at 2 m/s², (b) accelerates down at 2 m/s², (c) free-falls after a cable snap. Explain each using 'scales read normal force'.",
          "A curve of radius 80 m is to be banked for 20 m/s with zero reliance on friction. Find the banking angle. Then find the friction coefficient needed for the same speed on a FLAT curve.",
          "Conceptual: you cannot lift yourself by pulling your shoelaces. Prove it with the third law and momentum conservation, then explain why a person CAN lift themselves with a pulley attached to the ceiling.",
        ],
      },
    },
    "work-energy": {
      title: "Work, Energy, and Power",
      overview: "The work-energy theorem relates the work done by net force to the change in kinetic energy. Conservative forces store energy as potential energy. Power is the rate at which work is done.",
      sections: [
        {
          heading: "1. Work Done by a Force",
          content: "Work is done when a force causes displacement. For a constant force, W = F·s·cos θ. Work is a scalar measured in joules (J). If force is perpendicular to displacement, no work is done.",
          formula: "W = \\vec{F} \\cdot \\vec{s} = Fs\\cos\\theta",
        },
        {
          heading: "2. Kinetic and Potential Energy",
          content: "Kinetic energy (KE = ½mv²) is the energy of motion. Gravitational potential energy (PE = mgh) is energy due to position. Elastic PE in a spring is PE = ½kx².",
          formula: "\\begin{aligned} KE &= \\tfrac{1}{2}mv^2 \\\\ PE_{\\text{grav}} &= mgh \\\\ PE_{\\text{spring}} &= \\tfrac{1}{2}kx^2 \\end{aligned}",
        },
        {
          heading: "3. Work-Energy Theorem",
          content: "The net work done on an object equals its change in kinetic energy: W_net = ΔKE. This is valid for any net force (constant or variable).",
          formula: "W_{\\text{net}} = \\Delta KE = \\tfrac{1}{2}mv_f^2 - \\tfrac{1}{2}mv_i^2",
          example: "Example: A 2 kg ball dropped from 20 m. Find speed before hitting ground.\nmgh = ½mv² → v = √(2gh) = √(2×10×20) = 20 m/s",
        },
        {
          heading: "4. Conservation of Mechanical Energy",
          content: "When only conservative forces do work, KE + PE = constant. Non-conservative forces (friction) convert mechanical energy into heat.",
          formula: "KE_i + PE_i = KE_f + PE_f",
        },
        {
          heading: "5. Power",
          content: "Power is the rate at which work is done: P = W/t = F·v. The SI unit is the watt (W = J/s).",
          formula: "P_{\\text{avg}} = \\frac{W}{t}, \\qquad P_{\\text{inst}} = \\vec{F} \\cdot \\vec{v}",
        },
      ],
      keyPoints: [
        "Work is a scalar (dot product of force and displacement)",
        "Conservative forces conserve mechanical energy",
        "Power measures how fast work is done",
        "In elastic collisions, both KE and momentum are conserved",
      ],
      commonMistakes: [
        "Forgetting that work can be negative",
        "Assuming mechanical energy is always conserved",
        "Using W = Fd without the cos θ factor when force and displacement are not parallel",
      ],
      practiceQuestions: [
        "A 500 N force pulls a 20 kg box 10 m across a frictionless floor. Find the final speed if the box starts from rest.",
        "A spring with k = 200 N/m is compressed 0.1 m. A 0.5 kg ball is placed against it. Find the ball's speed when released.",
        "A 60 kg climber ascends 10 m in 20 s. Find the average power output.",
        "A 1000 kg car traveling at 20 m/s brakes to a stop over 50 m. Find the braking force.",
        "A pendulum of length 1 m is released from 30° from vertical. Find its speed at the lowest point.",
      ],
      enrichedContent: {
        title: "Work & Energy — The Currency of the Universe",
        overview: "Energy is not a substance but an accounting system: a single number that nature keeps perfectly balanced, passing it between kinetic, potential, thermal and other forms without ever creating or destroying a joule. Work is the transfer slip; power is the transaction speed. Once you see energy as currency, mechanics problems stop being force puzzles and become bookkeeping — often solvable in one line where Newton's laws would need pages.",
        sections: [
          {
            heading: "1. Energy Is Accounting, Work Is the Transfer",
            content: "No one has ever seen 'energy' — it is a calculated quantity, yet the most reliable number in all of science: the total energy of an isolated system NEVER changes, through every collision, explosion, chemical reaction and nuclear process we can measure. This is why physicists call it a conserved currency. Kinetic energy is energy booked to motion; potential energy is energy booked to configuration (height, compression, separation). Work is the mechanism that moves energy from one account to another: when a force acts through a displacement, it transfers F·s·cosθ joules. Negative work is not a mistake — it is a withdrawal (friction draining kinetic energy into heat; gravity draining a rising ball's KE and crediting its PE). The power of this view: instead of tracking every force moment by moment, you compare the ledger at the start and the end.",
            formula: "W = \\Delta E \\quad\\text{(work done on a system = energy transferred to it)}",
            keyPoints: [
              "Energy is a bookkeeping quantity — never seen directly, never found violated",
              "Work is energy in transit; negative work is a withdrawal, not an error",
              "Ledger thinking (compare start vs end) often replaces force-by-force analysis entirely",
            ],
          },
          {
            heading: "2. Why Kinetic Energy Goes as v² — The Squaring Has Consequences",
            content: "KE = ½mv² is not arbitrary; integrate F = ma along the path and the square emerges necessarily. But its physical meaning is dramatic: speed counts DOUBLE. Double your speed and you carry four times the energy — which is why stopping distance quadruples when speed doubles (brakes can only remove energy at a roughly fixed rate), and why a 60 km/h crash delivers four times the energy of 30 km/h, not twice. Traffic safety is applied work-energy theorem. The ½ factor also hides a relativistic truth: ½mv² is the low-speed approximation of (γ−1)mc² — at everyday speeds the correction is invisible, but energy and mass were always two accounts of the same currency.",
            formula: "W_{\\text{net}} = \\int \\vec{F}\\cdot d\\vec{s} = \\Delta\\left(\\tfrac{1}{2}mv^2\\right) \\;\\implies\\; \\text{stopping distance} \\propto v^2",
            example: "A car braking from 20 m/s stops in 40 m. From 40 m/s it needs 160 m — four times farther, not twice. Every metre of the extra 120 m is the v² law made visible on asphalt.",
            keyPoints: [
              "The v² law makes speed the dominant term in every energy budget — double speed, quadruple energy",
              "Braking distance ∝ v² follows directly from the work-energy theorem",
              "½mv² is the slow-motion limit of relativistic energy; mass itself is stored energy",
            ],
          },
          {
            heading: "3. Potential Energy Belongs to the SYSTEM, Not the Object",
            content: "Saying 'the ball has potential energy mgh' is a convenient lie. Potential energy is stored in the CONFIGURATION of a system — it takes at least two bodies to have one. The ball-Earth pair has gravitational PE; the block-spring pair has elastic PE. This matters conceptually because PE measures work the system can still do as it relaxes toward lower configuration. The deep distinction behind 'conservative' forces: gravity and springs are path-blind — the work they do depends only on start and end points, so energy spent against them can be fully refunded. That refundability is exactly what makes PE definable. Friction is path-obsessed (longer path = more work lost), so no 'friction potential' can exist. Also note mgh itself is an approximation: it assumes g is constant, valid only near Earth's surface. The true account is −GMm/r, and satellites use it.",
            formula: "PE_{\\text{grav}} = -\\frac{GMm}{r} \\;\\xrightarrow{\\text{near surface}}\\; mgh; \\qquad PE_{\\text{spring}} = \\tfrac{1}{2}kx^2",
            example: "A pendulum is a continuous audit: PE and KE trade back and forth, sum constant. At the extremes the ledger is all PE; at the bottom all KE. Release height alone determines bottom speed (v = √(2gh)) — mass and path are irrelevant. That is the accounting view at its most powerful.",
            keyPoints: [
              "PE is a property of a system's configuration, never of a single object",
              "Conservative = path-independent = refundable; that refundability is what makes PE definable",
              "mgh is the near-surface approximation of −GMm/r",
            ],
          },
          {
            heading: "4. Friction, Heat, and the Arrow of Time",
            content: "When friction does negative work, energy is not destroyed — it changes FORM, from organized (every molecule of the block moving together) to disorganized (molecules jostling randomly = heat). Total energy is still conserved; mechanical energy is not. This one-way street is the seed of the second law of thermodynamics: organized motion degrades into heat spontaneously, but heat never spontaneously re-organizes into motion. That asymmetry is why you remember yesterday but not tomorrow — friction gave time its arrow. In engineering terms, every real machine loses part of the budget to heat, and efficiency = useful output / total input measures how much survived the trip. A roller coaster that returns exactly to its launch height exists only in problems; real ones always arrive lower, the difference paid to friction and air.",
            formula: "\\Delta E_{\\text{mech}} = W_{\\text{friction}} < 0, \\qquad \\text{efficiency} = \\frac{E_{\\text{useful out}}}{E_{\\text{total in}}}",
            keyPoints: [
              "Friction converts organized energy into heat — conserved in total, degraded in quality",
              "The one-way nature of this degradation is the microscopic origin of time's arrow",
              "Real machines always arrive with less mechanical energy than they left with",
            ],
          },
          {
            heading: "5. Collisions — Momentum Always Balances, Kinetic Energy Sometimes Doesn't",
            content: "In EVERY collision of an isolated system, total momentum is conserved — this is non-negotiable (it is Newton's third law summed over time). Kinetic energy is the flexible account: if it too is conserved, the collision is elastic (billiard balls, gas molecules); if some KE converts to heat, sound and deformation, it is inelastic; if the bodies stick together, maximum KE is lost and the collision is perfectly inelastic — yet momentum still balances exactly. The useful diagnostic is the coefficient of restitution e = (separation speed)/(approach speed): e = 1 elastic, e = 0 perfectly inelastic. Notice the paradox that makes inelastic collisions feel wrong: two equal cars meeting head-on at equal speed stop dead — all KE vanished — while momentum was zero before and after, perfectly conserved. Energy did not disappear; it became crumple zones and heat. Crumple zones are deliberately designed inelasticity: the car sacrifices KE-absorbing structure so your body does not have to.",
            formula: "m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2 \\;\\text{(always)}; \\qquad e = \\frac{v_2 - v_1}{u_1 - u_2} \\in [0,1]",
            keyPoints: [
              "Momentum conservation is universal; KE conservation is a special property of elastic collisions",
              "Perfectly inelastic = bodies stick = maximum KE loss, zero momentum loss",
              "Crumple zones are engineered inelasticity — structure absorbs the energy instead of passengers",
            ],
          },
          {
            heading: "6. Power — Energy per Second, and the Force-Speed Bargain",
            content: "Power answers 'how fast can you move energy?' Two workers lifting identical loads to identical heights do identical work; the one who finishes in half the time delivers double the power. The relation P = F·v contains a profound trade-off used by every machine ever built: at fixed power, force and speed are inversely proportional. A car engine produces roughly constant power at full throttle, so low gears 'spend' speed to buy force (climbing hills), and high gears spend force to buy speed (cruising). A cyclist's legs do the same: gearing converts pedal force into wheel force at a chosen ratio. There is also an absolute speed limit hiding in P = Fv: a vehicle fighting drag F = ½ρC_dAv² reaches terminal speed when engine power equals drag power, giving v_max ∝ P^(1/3) — tripling top speed needs twenty-seven times the power. Nature's own power ratings: a human sprinter peaks near 2 kW but sustains only ~0.3 kW; a horse ≈ 746 W by definition — James Watt literally invented the unit to market his steam engines against horses.",
            formula: "P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}, \\qquad v_{\\max} \\propto P^{1/3} \\;\\text{(against quadratic drag)}",
            keyPoints: [
              "P = Fv is a bargain: at constant power, more force means less speed and vice versa — gears negotiate it",
              "Top speed against air drag scales as the cube root of power — small speed gains cost huge power",
              "'Horsepower' was a marketing unit invented by Watt to compare engines with horses",
            ],
          },
        ],
        keyPoints: [
          "Energy is a conserved currency; work is its transfer; power is the transfer rate",
          "The v² in kinetic energy quadruples stopping distance when speed doubles",
          "Potential energy belongs to systems and exists only for path-independent (conservative) forces",
          "Momentum always survives a collision; kinetic energy survives only elastic ones",
          "P = Fv explains gears, top speeds, and why Watt invented horsepower",
        ],
        commonMistakes: [
          "Saying energy is 'used up' — it is converted; total energy never decreases",
          "Assigning potential energy to a single object instead of the system (ball + Earth)",
          "Expecting mechanical energy conservation in the presence of friction or drag",
          "Assuming KE is conserved in every collision — momentum is the universal one",
          "Confusing work with impulse: work = force × distance (changes energy); impulse = force × time (changes momentum)",
        ],
        practiceQuestions: [
          "A 1200 kg car speeds up from 10 to 30 m/s. Compute the KE change and explain why the second doubling of speed costs three times the energy of the first.",
          "Show that a pendulum's speed at the bottom depends only on release height, not mass or string length. Where does the mass go in the ledger?",
          "Two identical putty balls collide head-on at equal speed and stick. Verify momentum conservation and account for the missing kinetic energy — where did each joule go?",
          "A cyclist must climb a hill at constant speed. Using P = Fv, explain why she shifts to a lower gear and pedals faster in circles rather than pushing harder in a high gear.",
          "A 2 kg block slides 5 m on a rough surface (μ = 0.25) starting at 6 m/s. Use energy accounting (not kinematics) to find the final speed.",
          "Estimate your own sustainable power output climbing stairs, in watts and horsepower. State every assumption.",
        ],
      },
    },
    gravitation: {
      title: "Universal Gravitation and Satellite Motion",
      overview: "Newton's law of universal gravitation states that every particle attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.",
      sections: [
        {
          heading: "1. Newton's Law of Gravitation",
          content: "Every mass attracts every other mass with a force along the line joining them. G = 6.674 × 10⁻¹¹ N·m²/kg² is the universal gravitational constant.",
          formula: "F = G\\,\\dfrac{m_1\\, m_2}{r^2}, \\qquad G = 6.674 \\times 10^{-11} \\; \\text{N·m}^2/\\text{kg}^2",
        },
        {
          heading: "2. Gravitational Field Strength",
          content: "The gravitational field strength g at distance r from mass M is g = GM/r². Near Earth's surface, g ≈ 9.8 m/s².",
          formula: "g = \\dfrac{GM}{r^2}",
        },
        {
          heading: "3. Orbital Velocity",
          content: "For a satellite in circular orbit, gravitational force provides centripetal force: GMm/r² = mv²/r.",
          formula: "v_{\\text{orb}} = \\sqrt{\\dfrac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}",
          example: "Example: Find orbital velocity of a satellite 300 km above Earth. (R = 6400 km, M = 6×10²⁴ kg)\nr = 6700 km. v = √(GM/r) ≈ 7730 m/s",
        },
        {
          heading: "4. Escape Velocity",
          content: "Escape velocity is the minimum speed needed to escape a planet's gravitational field: v_e = √(2GM/R) ≈ 11.2 km/s for Earth.",
          formula: "v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2 \\; \\text{km/s}",
        },
      ],
      keyPoints: [
        "Gravitational force is always attractive and follows inverse-square law",
        "Escape velocity is independent of the escaping object's mass",
        "Geostationary satellites have orbital period = 24 hours",
        "Gravitational PE is negative (zero at infinity)",
      ],
      commonMistakes: [
        "Using F = mg everywhere (only valid near surface)",
        "Thinking escape velocity depends on projectile mass",
        "Confusing orbital velocity with escape velocity (v_orb = v_e/√2)",
      ],
      practiceQuestions: [
        "Find the gravitational force between two 1000 kg spheres whose centers are 2 m apart.",
        "Calculate the orbital period of a satellite 500 km above Earth's surface.",
        "What is the escape velocity from the Moon? (M_moon = 7.35×10²² kg, R_moon = 1.74×10⁶ m)",
        "At what height above Earth's surface is g reduced to 1/4 of its surface value?",
        "A satellite orbits Earth at radius 2R. Find its orbital speed.",
      ],
      enrichedContent: {
        title: "Gravitation — The Force That Built the Universe",
        overview: "Gravity is the weakest fundamental force yet the architect of everything large: it gathered dust into planets, planets into systems, systems into galaxies. Newton's stroke of genius was unification — the same pull that drops an apple holds the Moon in orbit. This enriched view follows that thread: universality, the field picture, orbits as conic sections, the meaning of negative energy, and Einstein's final upgrade where gravity stops being a force and becomes the shape of spacetime itself.",
        sections: [
          {
            heading: "1. The Apple and the Moon — One Force, Two Worlds United",
            content: "Before Newton, falling apples and orbiting moons belonged to different sciences: terrestrial physics (things fall) and celestial physics (heavenly things circle eternally). Newton merged them with a single quantitative test. The Moon is 60 Earth-radii away; if gravity weakens as 1/r², the Moon's inward acceleration should be 9.8/60² ≈ 0.0027 m/s². From the Moon's known orbit (v²/r) the actual acceleration is — 0.0027 m/s². The match proved the Moon is FALLING, exactly like the apple, but moving sideways fast enough to keep missing the Earth. This is the birth of unification as a scientific method: two 'different' phenomena shown to be one law. The inverse-square form itself is no accident — any influence spreading evenly in 3D space dilutes over the surface of a growing sphere (area ∝ r²), so intensity ∝ 1/r². Gravity, light, and electric fields all share this geometry.",
            formula: "a_{\\text{moon}} = \\frac{g}{60^2} = \\frac{v^2}{r} \\;\\text{(Newton's test)}; \\qquad F \\propto \\frac{1}{r^2} \\;\\text{(spreading over a sphere's area)}",
            keyPoints: [
              "The Moon accelerates earthward at g/3600 — it is falling, not floating",
              "Inverse-square is the geometry of anything spreading evenly through 3D space",
              "Newton invented 'unification' as a method: explain two phenomena with one tested law",
            ],
          },
          {
            heading: "2. The Shell Theorem — Why Planets Behave Like Points",
            content: "Earth is a ball of rock, not a point mass — so why can we compute g with r measured from the centre? Newton proved a beautiful result (the shell theorem): a uniform spherical shell attracts an outside object exactly as if all its mass sat at the centre — and attracts an INSIDE object not at all (the pulls from all directions cancel perfectly). Stacking shells builds a planet, so outside any sphere, all the mass acts from the centre. Inside the Earth the story reverses: as you descend, the shells above you contribute nothing, and the remaining interior mass shrinks, so g DECREASES linearly toward zero at the core's centre — you would be weightless at Earth's heart, crushed by pressure but pulled equally in all directions. Near the surface g actually peaks just above the core-mantle boundary because the dense core outweighs the thinning shell effect. This theorem is also why black holes can be treated with the same 1/r² law far away — mass distribution details wash out at distance.",
            formula: "g_{\\text{inside}}(r) = \\frac{GM(r)}{r^2} = g_{\\text{surface}}\\frac{r}{R} \\;\\text{(uniform Earth, } r<R\\text{)}",
            example: "A tunnel through Earth: drop a ball and it oscillates simple-harmonically between the two ends with a period of about 84 minutes — the same period as a low-orbit satellite skimming the surface. Falling THROUGH the Earth and flying AROUND it are the same motion viewed differently.",
            keyPoints: [
              "Spheres act like point masses outside; shells pull to zero inside — gravity's great simplification",
              "g is zero at Earth's centre and roughly linear inside a uniform planet",
              "Earth-tunnel oscillation period = low-orbit period ≈ 84 min: one law, two disguises",
            ],
          },
          {
            heading: "3. Orbits Are Conic Sections — Energy Chooses the Shape",
            content: "Solve Newton's law with the inverse-square force and the possible paths are exactly the conic sections of Greek geometry: circle, ellipse, parabola, hyperbola. Which one you get is decided by TOTAL energy — the ledger from work-energy applied to the two-body system. Negative total energy means bound: the object cannot pay the potential-energy bill to reach infinity, so it loops forever (circle is the special case of zero eccentricity; ellipse is the general bound orbit — Kepler's first law, now derived, not just observed). Zero total energy gives the parabola: the object reaches infinity with exactly zero speed left over — the escape boundary. Positive energy gives the hyperbola: it escapes with speed to spare. This is why escape velocity is √2 times orbital velocity: orbiting has KE = −½PE, escaping needs KE = −PE, so the speed ratio is √2. Comets on elliptical orbits speed up near the Sun and crawl far away (Kepler's second law = angular momentum conservation); geostationary satellites exploit the fact that one particular radius (~42,000 km from Earth's centre) gives a 24-hour period, letting them hover over one longitude — the physics reason your satellite TV dish never moves.",
            formula: "E = -\\frac{GMm}{2r} < 0 \\;(\\text{ellipse}), \\quad E = 0 \\;(\\text{parabola}), \\quad E > 0 \\;(\\text{hyperbola}); \\qquad v_e = \\sqrt{2}\\,v_{\\text{orb}}",
            keyPoints: [
              "Orbit shape is set by total energy: bound (ellipse), marginal (parabola), escaping (hyperbola)",
              "Kepler's laws are consequences: ellipses from 1/r², equal areas from angular momentum conservation",
              "Geostationary orbit = the unique radius where period is 24 h — physics that keeps your dish still",
            ],
          },
          {
            heading: "4. Negative Energy — The Accounting Convention That Means Something",
            content: "Gravitational PE is negative, with zero set at infinite separation. This is not a quirk but a statement: gravity is attractive, so a bound system has LESS energy than its parts scattered to infinity — the deficit is what you must pay back (as work) to separate them. Your gravitational binding energy to Earth is about −62 MJ; escape velocity is simply the speed whose kinetic energy covers that bill: ½mv² = GMm/R. Notice the escaping object's mass cancels — the bill per kilogram is the same for a feather and a rocket, so escape velocity is a property of the PLANET, not the traveller. The same accounting explains why the sky is not full of free satellites: to orbit, you must deliver both the climb (altitude) AND the speed (~7.8 km/s) — and speed dominates the budget, which is why rockets are mostly fuel tank. Deep-space missions exploit this ledger in reverse with gravity assists: a spacecraft steals a tiny fraction of a planet's orbital momentum, gaining km/s for free.",
            formula: "PE = -\\frac{GMm}{r}, \\qquad \\tfrac{1}{2}mv_e^2 = \\frac{GMm}{R} \\;\\implies\\; v_e = \\sqrt{\\frac{2GM}{R}} \\;(\\text{mass-independent})",
            keyPoints: [
              "Negative PE = binding energy: the debt owed to separate a bound system",
              "Escape velocity depends only on the planet — the traveller's mass cancels",
              "Gravity assists are momentum theft from planets, legal under the same conservation law",
            ],
          },
          {
            heading: "5. Weightlessness and Tides — Gravity's Subtler Effects",
            content: "Astronauts float NOT because there is no gravity — at the ISS altitude, g is still about 8.7 m/s², nearly 90% of the surface value. They float because they and their craft are in free fall together, the elevator-cable-snap scenario from apparent weight, sustained forever by orbital speed. Weightlessness is withdrawal of contact, not of gravity. Tides are gravity's other subtlety: they come from DIFFERENCES in the Moon's pull across Earth's diameter. The near side is pulled slightly harder than the centre, the far side slightly weaker — so the oceans are stretched along the Earth-Moon line, producing two bulges: one toward the Moon, one away. Earth's rotation carries any coast through both bulges daily, hence two high tides. The Sun contributes too (spring tides when Sun and Moon align, neap tides when they oppose). Tidal friction is also slowly braking Earth's spin and pushing the Moon away 3.8 cm per year — the same force that lifts your harbour water is lengthening your day.",
            formula: "\\text{Tidal acceleration} \\approx \\frac{2GM_{\\text{moon}}\\, d}{r^3} \\quad\\text{(difference across Earth's diameter } d\\text{)}",
            keyPoints: [
              "Orbital weightlessness = free fall, not absent gravity (ISS feels ~90% of surface g)",
              "Tides are caused by gravity's VARIATION across a body — hence two bulges, two high tides daily",
              "Tidal friction transfers Earth's spin to the Moon's orbit: days lengthen, Moon recedes",
            ],
          },
          {
            heading: "6. Einstein's Upgrade — Gravity as Geometry",
            content: "Newton's law leaves one number unexplained: Mercury's orbit precesses 43 arc-seconds per century more than predicted. Einstein resolved it by reinterpreting gravity entirely — not a force but the curvature of spacetime caused by mass, with free-falling objects simply following the straightest available paths (geodesics) in that curved geometry. The equivalence principle was his entry ticket: since inertial and gravitational mass are identical (remember the two roles of m in the laws of motion?), being in free fall is locally INDISTINGUISHABLE from floating in deep space — gravity can be transformed away by choosing the right frame, which is no way for a real force to behave. Consequences that Newton's theory cannot produce: light bends around massive objects (gravitational lensing — now a standard astronomical tool), time runs slower deeper in a gravitational field, and collapse past a critical density forms black holes, where escape velocity exceeds c and the 1/r² law's gentle geometry becomes something else entirely. This is not philosophy — your phone's GPS must correct satellite clocks for both special and general relativity (about 38 microseconds/day net); without the correction, positions would drift ~10 km per day. Einstein's gravity is in your pocket.",
            formula: "\\Delta t_{\\text{grav}} \\approx \\frac{gh}{c^2}\\,t \\;\\text{(clocks higher run faster — measured with atomic clocks over 30 cm!)}",
            keyPoints: [
              "General relativity = gravity is spacetime curvature; free fall is inertial motion along geodesics",
              "The equivalence principle (why all masses fall alike) is the doorway to the whole theory",
              "GPS requires relativistic clock corrections daily — relativity is an engineering dependency",
              "Black holes are where escape velocity exceeds light speed; Mercury's precession was the first proof",
            ],
          },
        ],
        keyPoints: [
          "The Moon falls like an apple — Newton's unification, verified numerically (g/60²)",
          "Shell theorem: spheres act as points outside, cancel to zero inside",
          "Orbit shape is chosen by total energy; escape speed = √2 × orbit speed, independent of the traveller",
          "Weightlessness is free fall; tides are gravity's differential pull — two bulges, two high tides",
          "Einstein replaced the force with geometry: lensing, time dilation, black holes — and GPS corrections",
        ],
        commonMistakes: [
          "Saying astronauts float because 'there is no gravity in space' — the ISS still feels ~90% of surface g",
          "Using F = mg far from a planet's surface — g = GM/r² changes with altitude",
          "Thinking escape velocity depends on the object's mass or launch direction (for a ballistic, non-powered escape it does not)",
          "Explaining tides with the Moon 'pulling water up' only — the far-side bulge is the giveaway of differential gravity",
          "Confusing geostationary with low-Earth orbit: 24 h period requires ~42,000 km orbital radius, not 400 km",
        ],
        practiceQuestions: [
          "Derive Newton's Moon test: using the Moon's distance (60R) and period (27.3 days), compute its centripetal acceleration and compare with g/3600.",
          "Show that a tunnel through a uniform Earth gives simple harmonic motion, and find the period. Compare it with a surface-skimming satellite's period and explain why they match.",
          "Using energy arguments, prove v_escape = √2 × v_orbit for any circular orbit radius — and explain why neither depends on the satellite's mass.",
          "A geostationary satellite must orbit in the equatorial plane. Explain why a satellite 'hovering' over Kathmandu (latitude 28°N) is impossible.",
          "At what height above Earth does g drop to half its surface value? What fraction of surface gravity does the ISS (400 km up) actually feel?",
          "The Moon recedes 3.8 cm/year due to tides. Using angular momentum conservation, argue whether Earth's day lengthens or shortens, and estimate the direction of the Moon's orbital speed change.",
          "GPS satellites orbit at 20,200 km. Research and explain why their clocks gain about 45 μs/day from general relativity and lose about 7 μs/day from special relativity — and what happens to your map app if uncorrected.",
        ],
      },
    },
    thermodynamics: {
      title: "Thermodynamics",
      overview: "Thermodynamics deals with heat, work, and internal energy. The first law is energy conservation; the second law introduces entropy and the direction of spontaneous processes.",
      sections: [
        {
          heading: "1. First Law of Thermodynamics",
          content: "Conservation of energy for thermal systems: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added, and W is work done by the system.",
          formula: "\\Delta U = Q - W",
        },
        {
          heading: "2. Heat and Temperature",
          content: "Heat required to change temperature: Q = mcΔT. For phase change: Q = mL. Specific latent heat of fusion (ice) = 334 kJ/kg; vaporization (water) = 2260 kJ/kg.",
          formula: "Q = mc\\,\\Delta T, \\qquad Q = mL",
        },
        {
          heading: "3. Ideal Gas Laws",
          content: "PV = nRT relates pressure, volume, temperature, and amount of gas. R = 8.314 J/(mol·K).",
          formula: "PV = nRT",
        },
        {
          heading: "4. Second Law and Entropy",
          content: "Entropy of an isolated system never decreases. Heat cannot spontaneously flow from cold to hot.",
          formula: "\\Delta S_{\\text{universe}} \\geq 0",
        },
        {
          heading: "5. Carnot Efficiency",
          content: "Maximum theoretical efficiency of a heat engine: η = 1 - T_C/T_H (temperatures in kelvin).",
          formula: "\\eta = 1 - \\dfrac{T_C}{T_H}",
          example: "Example: Carnot engine between 500 K and 300 K absorbs 1000 J. Find work done.\nη = 1 - 300/500 = 0.4. W = 0.4 × 1000 = 400 J",
        },
      ],
      keyPoints: [
        "First law: energy is conserved; ΔU = Q - W",
        "Second law: entropy of the universe always increases",
        "Carnot efficiency is the maximum possible",
        "Always use Kelvin in thermodynamic formulas",
      ],
      commonMistakes: [
        "Using Celsius instead of Kelvin",
        "Forgetting sign convention: W is work done BY the system",
        "Thinking heat and temperature are the same",
      ],
      practiceQuestions: [
        "How much heat is needed to convert 2 kg of ice at -10°C to steam at 100°C?",
        "A Carnot engine has efficiency 40% with cold reservoir at 300 K. Find hot reservoir temperature.",
        "5 moles of ideal gas at 300 K expands isothermally from 2 L to 5 L. Find work done.",
        "An adiabatic compression reduces volume by half. If γ = 1.4, by what factor does temperature increase?",
        "A heat engine absorbs 800 J and rejects 500 J per cycle. Find efficiency.",
      ],
      enrichedContent: {
        title: "Thermodynamics — The Rules of the Energy Game",
        overview: "Thermodynamics is what happens when you stop tracking individual atoms and ask statistical questions about trillions of them together. Its two great laws are the deepest constraints in physics: energy can never be created or destroyed (first law), and the universe keeps a one-way ratchet called entropy that decides which processes are ALLOWED (second law). Every engine, every weather system, every living cell, and the eventual fate of the cosmos are governed by these rules.",
        sections: [
          {
            heading: "1. Temperature Is Statistics — The Kinetic Story",
            content: "What IS temperature? For a gas, it is exactly the average translational kinetic energy per molecule: ½m⟨v²⟩ = (3/2)kT. Temperature is not a substance or a fluid — it is a statistic, a crowd property of enormous numbers of particles, like the 'average family size' of a city. This kinetic view explains everything qualitatively: pressure is the drumbeat of molecular collisions on walls (more hits, harder hits = higher P); heating a sealed gas raises molecular speeds, so the drumbeat intensifies; compressing it packs molecules closer so they hit walls more often — PV = nRT is just this bookkeeping compressed into an equation. Two profound consequences: (1) there is an absolute zero because you cannot have less than zero motion — temperature has a floor, which is why Kelvin is the honest scale (0 K = motion stopped; Celsius is a shifted convenience); (2) individual molecules have a huge spread of speeds (Maxwell-Boltzmann distribution) — even in cold water, a few molecules are fast enough to escape, which is why evaporation happens below boiling and why puddles dry at room temperature.",
            formula: "\\tfrac{1}{2}m\\langle v^2 \\rangle = \\tfrac{3}{2}kT, \\qquad P = \\frac{1}{3}\\frac{N}{V}m\\langle v^2\\rangle \\;\\implies\\; PV = nRT",
            keyPoints: [
              "Temperature = average molecular kinetic energy — a statistic, not a substance",
              "Pressure = collision drumbeat on walls; PV = nRT is crowd bookkeeping, not magic",
              "Absolute zero exists because motion cannot go below zero — Kelvin is the honest scale",
              "Speed spread explains evaporation below boiling: a few molecules always have escape energy",
            ],
          },
          {
            heading: "2. Heat vs Temperature — The Ocean and the Teacup",
            content: "Heat and temperature are different currencies: temperature is energy PER molecule (intensity); heat is energy IN TRANSIT (quantity). A teacup of tea at 90°C has a far higher temperature than the ocean at 20°C — but the ocean holds astronomically more thermal energy, because it has ~10²¹ times more molecules paying into the pot. Specific heat capacity measures thermal INERTIA: how much energy one kilogram needs per degree of warming. Water's is enormous (4186 J/kg·K — about five times rock's) because heating water must first break hydrogen bonds before molecules can speed up. This single number shapes your world: oceans store summer heat and release it in winter, making coastal climates mild; your body is 60% water, so it resists temperature swings; a pressure cooker works by raising the boiling point with pressure so food cooks at higher temperature. Latent heat is stranger still: during melting or boiling, added energy does NOT raise temperature at all — every joule goes into breaking bonds, not speeding molecules. That is why ice water stays at exactly 0°C until the last cube melts, and why steam at 100°C burns far worse than water at 100°C: steam carries an extra 2260 kJ/kg of bond-breaking energy that it dumps into your skin when it condenses.",
            formula: "Q = mc\\Delta T \\;(\\text{warming}), \\qquad Q = mL \\;(\\text{phase change, no } \\Delta T\\text{)}; \\quad L_v^{\\text{water}} = 2260\\,\\text{kJ/kg} \\approx 5.4 \\times c\\,\\Delta T_{100°}",
            example: "Budget of a kettle: to take 1 kg from 20°C to steam costs 80 kJ (warming) + 2260 kJ (vaporizing) — 97% of the energy is spent at constant 100°C, invisible on a thermometer. Thermometers only see the 3%.",
            keyPoints: [
              "Temperature is per-molecule intensity; heat is total energy in transit — the teacup vs ocean distinction",
              "High specific heat of water = planetary and biological temperature stability",
              "Latent heat breaks bonds at constant temperature; steam burns carry it as hidden cargo",
            ],
          },
          {
            heading: "3. The First Law — Accounting with a Path-Dependent Twist",
            content: "ΔU = Q − W says internal energy is a conserved bank account: heat deposited minus work withdrawn. The subtlety that trips everyone: Q and W are separately PATH-DEPENDENT — the route from state A to state B decides how much heat flows and how much work is done — but their difference ΔU is not, because U is a state function (an account balance that only knows where you ended up). A PV diagram makes this visible: the work done by an expanding gas is the AREA under its path, and different paths between the same two states enclose different areas. The four classic processes are the vocabulary: isothermal (T fixed — slow, heat flows in to pay for the work of expansion), adiabatic (no heat exchange — fast, so the gas pays for expansion from its own internal energy and COOLS; this is why a spray can gets cold, why rising air forms clouds, and why diesel engines ignite fuel by compression-heating alone), isochoric (fixed volume — no work possible, all heat goes to U), isobaric (fixed pressure — heat splits between work and U). The adiabatic cooling of rising air is the atmosphere's engine: about 10°C per kilometre of altitude, which is why mountaintops are cold even though heat rises.",
            formula: "\\Delta U = Q - W, \\qquad W = \\int P\\,dV \\;(\\text{area under PV path}), \\qquad TV^{\\gamma-1} = \\text{const (adiabatic)}",
            keyPoints: [
              "Q and W depend on the path; ΔU depends only on endpoints — state function vs process quantity",
              "Work = area under the curve on a PV diagram — geometry becomes energy",
              "Adiabatic expansion self-cools (spray cans, clouds); adiabatic compression self-heats (diesel engines)",
              "The atmosphere cools ~10°C/km because rising air expands adiabatically",
            ],
          },
          {
            heading: "4. Entropy — The Universe Counts Possibilities",
            content: "The second law is often mumbled as 'disorder increases.' The real mechanism is counting. Entropy S = k ln Ω, where Ω is the number of microscopic arrangements compatible with what you observe. A dropped egg has exactly one arrangement that looks like an intact egg and ~10²⁵ that look like a mess — so the system wanders into the mess, not because a force pushes it, but because probability is overwhelming. THAT is the second law: isolated systems drift toward macrostates with more microstates, because there are simply more of them. This gives time its direction: every process you have ever seen 'run backwards' (smoke gathering into a cigarette, heat flowing cold→hot) is not forbidden by energy conservation — it is forbidden by combinatorics, with odds like 1 in 10^(10²³). Entropy also sets a quality tax on energy: energy in concentrated form (a hot reservoir, a fuel bond) can do work; once spread evenly as lukewarm molecular jitter, the same joules are useless. The first law says you cannot win; the second says you cannot even break even. Cosmically, the universe is slowly walking toward maximum entropy — the 'heat death' where every temperature is equal and nothing interesting can ever happen again.",
            formula: "S = k \\ln \\Omega, \\qquad \\Delta S_{\\text{universe}} \\geq 0 \\;\\text{(equality only for ideal reversible processes)}",
            example: "Maxwell's demon: a hypothetical being sorting fast molecules from slow, cheating the second law. Resolution (Landauer): the demon must MEASURE and ERASE information, and erasure itself costs entropy ≥ the amount stolen. Information is physical — the second law survives even against a perfect bookkeeper.",
            keyPoints: [
              "Entropy = log of the number of microscopic arrangements; the second law is overwhelming probability, not a force",
              "Time's arrow: reverse processes are not energy-forbidden, they are combinatorically absurd",
              "Energy degrades in quality — the same joules, spread thin, can no longer do work",
              "Maxwell's demon fails because erasing information has an unavoidable entropy price",
            ],
          },
          {
            heading: "5. Engines — Why No Machine Can Be Perfect, and Heat Pumps Cheat (Legally)",
            content: "A heat engine runs on a temperature DIFFERENCE: it takes Q_H from a hot reservoir, converts part to work, and must dump the remainder Q_C to a cold one. The dumping is not an engineering failure — it is the second law's tax: converting heat fully to work in a cycle would mean decreasing total entropy, which is forbidden. Carnot proved the tax has a fixed rate: the best possible engine (reversible, frictionless, ideal) achieves η = 1 − T_C/T_H, and no real engine ever beats it. Note the brutal arithmetic: with a cold reservoir at 300 K, even a heroic 900 K hot side gives only 67%. Real power plants run at ~40%; car engines ~25%. The corollary is the engineer's commandment: to gain efficiency, raise T_H (better turbine alloys) or lower T_C (bigger condensers) — there is no third lever. Run the cycle BACKWARD and you get a refrigerator or heat pump: work is spent to carry heat from cold to hot. Here the accounting flips gloriously — a heat pump's coefficient of performance exceeds 1 routinely, delivering 3–4 joules of heat per joule of electricity, not by creating energy but by MOVING it. This is why heat pumps beat resistive heaters: one hauls existing heat indoors from outside air, the other converts precious electricity one-for-one. The second law forbids free energy; it does not forbid free heat transport.",
            formula: "\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} \\;(\\text{Kelvin!}), \\qquad COP_{\\text{heat pump}} = \\frac{Q_H}{W} = \\frac{T_H}{T_H - T_C} > 1",
            example: "A heat pump between 275 K outside and 295 K inside has ideal COP = 295/20 ≈ 15. Real ones achieve 3–4. Each unit of grid electricity still buys 3–4 units of warmth — legally cheating the 'one joule in, one joule out' intuition that the first law alone would suggest.",
            keyPoints: [
              "Engines pay an entropy tax: Q_C MUST be dumped — perfection is forbidden, not merely hard",
              "Carnot efficiency depends only on the two temperatures — no engineering beats 1 − T_C/T_H",
              "Heat pumps run the engine backwards and deliver more heat than work — because they move energy, not create it",
            ],
          },
          {
            heading: "6. Thermodynamics Alive — From Cells to Climate to Cosmos",
            content: "These are not steam-engine laws — they run everything. A LIVING organism is an open system exporting entropy: you maintain your improbable internal order by dumping disorder (heat and waste) into your surroundings, so your local entropy decrease is always outpaid by the environment's increase. Life does not violate the second law; life is the second law's most elaborate payment scheme. The GREENHOUSE effect is radiative thermodynamics: Earth must re-radiate every joule it receives from the Sun, and does so from an effective radiating layer whose temperature is set by the balance. Greenhouse gases raise that layer, and since the atmosphere cools with altitude (adiabatic lapse rate), a higher radiating layer means a warmer surface beneath it — the planet's thermostat with a stuck dial. Even the COSMOS obeys the ledger: stars are heat engines converting gravitational collapse into radiation, black holes carry entropy proportional to their surface area (Bekenstein-Hawking), and the universe's total entropy climbs toward the heat death. Thermodynamics earned its reputation as the one body of theory Einstein said would 'never be overthrown' — it is not about steam; it is about what is possible, anywhere, forever.",
            formula: "\\text{Life: } \\Delta S_{\\text{organism}} < 0 \\;\\text{allowed, since } \\Delta S_{\\text{surroundings}} > |\\Delta S_{\\text{organism}}|",
            keyPoints: [
              "Organisms are entropy exporters — local order paid for with environmental disorder",
              "The greenhouse effect is a radiative-balance argument built on the adiabatic lapse rate",
              "Thermodynamics constrains stars, black holes and the fate of the cosmos — it is the physics of the possible",
            ],
          },
        ],
        keyPoints: [
          "Temperature is molecular statistics; absolute zero is the floor because motion cannot go lower",
          "Heat and temperature are different currencies — quantity vs intensity (ocean vs teacup)",
          "First law: ΔU is a state balance; Q and W are path-dependent flows; work = PV area",
          "Second law is counting: entropy = k ln Ω; reverse processes are combinatorically absurd",
          "Carnot caps all engines at 1 − T_C/T_H; heat pumps legally beat 100% by moving heat, not making it",
        ],
        commonMistakes: [
          "Using Celsius in η = 1 − T_C/T_H — ratios only make sense on the absolute (Kelvin) scale",
          "Calling entropy 'disorder' loosely — it is the count of microscopic arrangements; a crystal can be 'ordered' yet have entropy",
          "Confusing heat with temperature — a sparkler's sparks are ~1000°C but carry almost no heat",
          "Assuming adiabatic means constant temperature — it means no heat exchange; temperature changes MORE (the gas pays from internal energy)",
          "Believing COP > 1 for heat pumps violates energy conservation — it moves existing heat, it does not create energy",
        ],
        practiceQuestions: [
          "Full ledger: compute the energy to turn 1 kg of ice at −20°C into steam at 120°C, and identify which stages are invisible to a thermometer.",
          "Explain with the speed-distribution picture: why does a puddle evaporate at 25°C, and why does evaporation COOL the remaining water?",
          "A gas expands isothermally doing 500 J of work. How much heat entered, and what happened to U? Repeat for an adiabatic expansion doing 500 J.",
          "A Carnot engine runs between 600 K and 300 K. Find its efficiency, then find the new efficiency if the hot reservoir rises by 50 K vs the cold reservoir dropping by 50 K. Which lever is stronger, and why?",
          "Using Ω-counting, argue why an intact egg never reassembles itself, even though every molecular collision involved is individually reversible.",
          "A heat pump keeps a house at 293 K when it is 268 K outside. Compute the ideal COP and the minimum electrical power needed to deliver 10 kW of heating. Why is this better than a 10 kW resistive heater?",
          "Explain in four sentences why mountaintops are cold even though hot air rises — using adiabatic expansion, not 'distance from the Sun'.",
        ],
      },
    },
    optics: {
      title: "Optics — Reflection and Refraction",
      overview: "Optics studies light behavior. Reflection and refraction govern how light interacts with surfaces and media. Lenses and mirrors form images described by the thin lens/mirror equations.",
      sections: [
        {
          heading: "1. Mirror Equation",
          content: "For spherical mirrors: 1/v + 1/u = 1/f. Magnification m = -v/u. Concave mirrors can form real or virtual images; convex mirrors always form virtual, diminished images.",
          formula: "\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}, \\qquad m = -\\dfrac{v}{u}",
          example: "Example: Object 3 cm tall at 20 cm from concave mirror (f = 10 cm).\n1/v = 1/10 - 1/20 = 1/20 → v = 20 cm\nm = -20/20 = -1 → real, inverted, same size",
        },
        {
          heading: "2. Snell's Law",
          content: "Refraction at interface: n₁ sin θ₁ = n₂ sin θ₂. Light bends toward normal entering denser medium.",
          formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
        },
        {
          heading: "3. Total Internal Reflection",
          content: "When light travels dense→rare at angle > critical angle, all light reflects back. Critical angle: sin C = n₂/n₁.",
          formula: "\\sin C = \\dfrac{n_2}{n_1}",
        },
        {
          heading: "4. Thin Lenses",
          content: "Lens maker's formula: 1/f = (n-1)(1/R₁ - 1/R₂). Thin lens equation: 1/v - 1/u = 1/f. Power P = 1/f (diopters when f in meters).",
          formula: "\\dfrac{1}{f} = (n-1)\\!\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right), \\qquad P = \\dfrac{1}{f}",
        },
      ],
      keyPoints: [
        "Mirror/lens equation: 1/v ± 1/u = 1/f",
        "Concave mirrors and convex lenses converge; convex mirrors and concave lenses diverge",
        "TIR requires: dense→rare AND angle > critical angle",
        "Power of lenses in contact adds: P_total = P₁ + P₂",
      ],
      commonMistakes: [
        "Mixing up mirror and lens sign conventions",
        "Forgetting focal length is negative for diverging elements",
        "Confusing real and virtual images",
      ],
      practiceQuestions: [
        "An object is placed 15 cm from a convex lens of focal length 10 cm. Find image distance and magnification.",
        "Light passes from glass (n = 1.5) to water (n = 1.33). Find the critical angle.",
        "A convex lens (f = 20 cm) and concave lens (f = -10 cm) are in contact. Find combined focal length.",
        "An object is placed at the focus of a concave mirror (f = 10 cm). Where is the image?",
        "A ray passes from air into glass (n = 1.5) at 60° incidence. Find angle of refraction.",
      ],
      enrichedContent: {
        title: "Optics — How Light Finds Its Way (and How We Trick It)",
        overview: "Light is an electromagnetic wave that always takes the fastest available route between two points — Fermat's principle — and every law of optics (reflection, refraction, lens focusing) is a consequence of that one economical rule. Optics is therefore the science of controlling paths: mirrors and lenses are devices that sculpt light's travel time so that information from an object is reassembled somewhere useful — an image. From your eye to the fibre carrying this page to your screen, it is all applied Fermat.",
        sections: [
          {
            heading: "1. Fermat's Principle — Light Is the Universe's Optimizer",
            content: "Why does light obey such tidy laws? Because it follows the path of LEAST TIME, and least-time paths are smooth and calculable. Reflection: the shortest-time route from A to a mirror to B obeys θᵢ = θᵣ — any other bounce point wastes distance at the same speed. Refraction is subtler and more beautiful: light slows down inside glass (v = c/n), so the fastest route from A in air to B in glass is NOT the straight line — it is a bent path that trades extra air-distance (fast medium) for less glass-distance (slow medium). Doing the minimization yields Snell's law exactly: n₁sinθ₁ = n₂sinθ₂. Light 'solves an optimization problem' without thinking; the wave explanation (Huygens' wavelets interfering destructively on all but the fastest path) shows how the trick is done mechanically. Fermat's principle is also why optical design works at all: lenses are shaped pieces of glass whose varying thickness equalizes travel time from object to image, so all rays arrive in step.",
            formula: "\\delta \\int \\frac{ds}{v} = 0 \\;\\text{(path of stationary time)} \\;\\implies\\; \\theta_i = \\theta_r, \\;\\; n_1\\sin\\theta_1 = n_2\\sin\\theta_2",
            example: "The lifeguard problem: to reach a drowning swimmer fastest, a lifeguard does not run in a straight line — she runs farther on the beach (fast medium) and swims less (slow medium), bending her path at the shoreline exactly as light bends at a glass surface. Snell's law describes the optimal strategy for any fast-then-slow journey.",
            keyPoints: [
              "All of geometric optics follows from one rule: light takes the path of least time",
              "Refraction is a speed-trade optimization — the bent path is FASTER than the straight one",
              "Lens surfaces are shaped to equalize travel time so every ray from an object meets at one image point",
            ],
          },
          {
            heading: "2. Reflection and the Mirror's Honest Lie",
            content: "A plane mirror creates a virtual image: light rays appear to diverge from a point BEHIND the glass, though none ever travels there. The image is exactly as far behind the mirror as you are in front — a perfect geometric ghost. The classic puzzle: why does a mirror reverse left and right but not up and down? The real answer is that it reverses NEITHER. A mirror reverses front-back — the direction perpendicular to the glass. Raise your right hand; your mirror image raises the hand on the same side of the image you see. The 'left-right reversal' you perceive is your brain mentally rotating the image into a person facing you, and THAT rotation is what swaps left and right. Text in a mirror is unreadable for the same reason: you rotated the page to face the mirror. This front-back insight also explains why the image is laterally faithful: write on a transparent sheet and hold it up — no reversal at all. Meanwhile, real surfaces split into two families: specular (smooth, all rays reflect in step → images) and diffuse (rough at the wavelength scale, rays scatter randomly → no image, but the object is visible from everywhere). Most of what you 'see' around you is diffuse reflection — the world's ambient lighting system.",
            formula: "\\theta_i = \\theta_r \\;\\text{(per ray)}; \\qquad d_{\\text{image}} = -d_{\\text{object}} \\;\\text{(virtual, front-back reversed)}",
            keyPoints: [
              "Mirrors reverse front-back, not left-right — the swap is your brain's rotation, not the glass",
              "Virtual image = rays only APPEAR to come from there; nothing travels behind the mirror",
              "Specular surfaces make images; diffuse surfaces make the visible world",
            ],
          },
          {
            heading: "3. Refraction in the Wild — Mirages, Diamonds, and the Bent Pencil",
            content: "The refractive index n = c/v measures how much a medium slows light: 1.0 for vacuum, 1.33 water, 1.5 glass, 2.42 diamond. Every refraction phenomenon is bookkeeping of that slowdown. The pencil looks bent in water because rays from the submerged part change direction at the surface, so your eye back-traces them to a false position — you literally see the pencil where it is not. A mirage is refraction without any obvious boundary: hot air near a road is less dense (lower n), so light from the sky curves continuously upward, and your brain reports a 'puddle' reflecting the sky — the road is showing you sky-light arriving along a curved path. Diamonds sparkle because n = 2.42 gives a tiny critical angle (24°): most entering light undergoes total internal reflection repeatedly before escaping through the top facets, and different colors bend by slightly different amounts (dispersion), splitting white light into spectral flashes. Refraction is also why the setting Sun appears flattened and why it is still 'visible' minutes after it has geometrically set — Earth's atmosphere bends the light over the horizon; every sunrise you see is technically an optical illusion granted by the sky.",
            formula: "n = \\frac{c}{v}; \\qquad \\text{apparent depth} = \\frac{\\text{real depth}}{n} \\;\\text{(looking straight down into water)}",
            keyPoints: [
              "Refraction moves images, not objects — apparent position is where back-traced rays meet",
              "Mirages are curved-path refraction in a gradient-index atmosphere — the road shows you sky",
              "Diamond brilliance = small critical angle (24°) + dispersion; sunsets are refraction over the horizon",
            ],
          },
          {
            heading: "4. Total Internal Reflection — The Perfect Mirror and the Internet",
            content: "When light travels from dense to rare medium (glass→air), Snell's law eventually asks for sinθ₂ > 1 — impossible. Past that critical angle (sinC = n₂/n₁), refraction ceases and 100% of the light reflects back: total internal reflection. No silvered mirror achieves this; even the best reflect ~95%. TIR is nature's perfect mirror, and we have built civilization on it. An optical fibre is a hair-thin glass strand whose core (higher n) is wrapped in cladding (lower n); any ray entering within the acceptance cone bounces down the fibre by TIR, losing almost nothing even around gentle bends. Multiples of these strands carry the world's internet traffic as light pulses — your video call is photons ricocheting through glass under the ocean, because TIR beats electrical copper on bandwidth and loss by orders of magnitude. The same principle lets doctors see inside your stomach (endoscopes are fibre bundles: one bundle illuminates, another carries the image back), and lets binoculars use prisms instead of mirrors (TIR flips the image without tarnishing). The sparkle of a well-cut diamond is TIR marketing: the cut angles are engineered so entering light cannot escape except back upward, toward the viewer's eye.",
            formula: "\\sin C = \\frac{n_2}{n_1} \\;\\implies\\; C_{\\text{glass-air}} \\approx 42°, \\;\\; C_{\\text{diamond-air}} \\approx 24°",
            example: "Why 45° prisms are everywhere in optics: glass-air critical angle is 42°, so a ray hitting a glass surface at 45° ALWAYS totally reflects — a self-guaranteed perfect mirror built into the geometry.",
            keyPoints: [
              "TIR is 100% reflection — better than any manufactured mirror, and it cannot tarnish",
              "Optical fibres = TIR pipelines; the global internet is light bouncing through glass",
              "Endoscopes, prisms and diamond cuts are the same trick wearing different costumes",
            ],
          },
          {
            heading: "5. Images — Real vs Virtual Is a Physical Distinction, Not a Trick",
            content: "An image is a place where light rays either MEET (real) or only APPEAR to come from (virtual). The distinction is testable: put a screen at a real image and the picture appears on it — light genuinely converges there; a virtual image can never be projected, because no light ever visits that location. Convex lenses make real images when the object is outside the focal point (cameras, projectors, your eye's lens onto the retina — your retina is a screen catching a real, inverted image) and virtual magnified images when the object is inside the focal length (a magnifying glass — rays diverge but your eye back-traces them to a big ghost). This is why 'magnification' can be positive or negative and why sign conventions exist at all: they encode WHERE light actually goes. The lensmaker's formula reveals the engineering: focal length is set by glass index and surface curvature — bend the surfaces more (smaller R) or use higher-n glass, and the lens focuses harder (shorter f, higher power in diopters). Stacked thin lenses simply add powers (P = P₁ + P₂), which is why your prescription combines corrections, and why every camera, microscope and telescope is a stack of lenses whose powers are budgeted like an equation. The human eye is the original instrument: a variable-power lens (ciliary muscles change its shape — accommodation) projecting onto a curved sensor (retina), with a blind spot your brain edits out in real time.",
            formula: "\\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad P_{\\text{total}} = P_1 + P_2, \\qquad m = \\frac{h_i}{h_o} = \\frac{v}{u}",
            keyPoints: [
              "Real image = rays physically converge (projectable); virtual = rays only appear to diverge from a point",
              "Your retina catches a real inverted image; the brain flips the interpretation, not the optics",
              "Lens power budgets (diopters add) are how every optical instrument is designed",
            ],
          },
          {
            heading: "6. Color, Dispersion, and What Light Actually Is",
            content: "White light is a mixture, and n depends slightly on wavelength — blue slows more than red in glass (dispersion). A prism exploits this to fan white light into its spectrum: Newton's decisive experiment, in which he further proved the colors were ORIGINAL components by recombining the spectrum with a second prism into white light again. The rainbow is a prism at planetary scale: sunlight enters a raindrop, refracts (dispersing), reflects once off the back surface, and refracts out — concentrating red at 42° and violet at 40° from the anti-solar point, which is why a rainbow is always a circular arc centered on your shadow, and why two people never see the same rainbow (each stands at the centre of their own). Colour itself deserves honesty: wavelength is physics, colour is perception. There is no 'red' in 700 nm light — your eye's three cone types sample the spectrum and your brain constructs the experience; magenta corresponds to NO single wavelength at all, it is the brain's invention for simultaneous red-and-blue stimulation. Finally, the sky's palette is scattering, not refraction: air molecules scatter short wavelengths far more strongly (Rayleigh, ∝ 1/λ⁴), so the sky glows blue (scattered sunlight) and sunsets burn red (the surviving long wavelengths after the blue has been scattered out of the direct beam). Optics ends where it began — with light's wave nature deciding everything you see.",
            formula: "\\text{Rayleigh scattering} \\propto \\frac{1}{\\lambda^4} \\;\\implies\\; \\text{blue scatters } \\approx 5.6\\times \\text{ more than red}",
            keyPoints: [
              "Dispersion = n varies with wavelength; prisms and raindrops fan white light into spectra",
              "A rainbow is a 42°/40° circle centred on your shadow — strictly personal to each observer",
              "Colour is perception, not substance: magenta has no wavelength; the sky's blue is scattered light",
            ],
          },
        ],
        keyPoints: [
          "Fermat's least-time principle generates every law of geometric optics — light optimizes",
          "Mirrors reverse front-back; the left-right swap is your brain's rotation",
          "TIR is perfect reflection — fibres, endoscopes, prisms and diamonds all run on it",
          "Real images converge (projectable); virtual images are back-traced ghosts",
          "Dispersion makes spectra, rainbows and diamond fire; Rayleigh scattering paints the sky",
        ],
        commonMistakes: [
          "Saying mirrors 'swap left and right' — they swap front-back; your mental rotation does the swapping",
          "Drawing a mirage as reflection off water — it is continuous refraction in hot, low-density air",
          "Expecting TIR when going rare→dense — it only happens dense→rare past the critical angle",
          "Confusing the sign conventions of mirrors and lenses and then 'fixing' answers by guessing signs",
          "Believing colour lives in the light — wavelength is physical, colour is constructed by the visual system",
        ],
        practiceQuestions: [
          "Derive Snell's law from Fermat's principle by minimizing travel time across an air-glass boundary (or explain the lifeguard analogy as a proof sketch).",
          "A fish looks 30 cm below the surface to a bird directly above. Where is the fish actually? Does the bird dive at the image or the reality?",
          "Compute the critical angle for (a) glass-air and (b) diamond-air, then explain quantitatively why a 45° glass prism is a guaranteed perfect mirror while a 45° diamond facet is a spectacular one.",
          "Your eye's lens has variable power from about 40 D (relaxed, distant objects) to 60 D (fully accommodated, near point ~25 cm). Show how this range matches a 2 cm-deep eyeball, and explain why reading gets harder with age (presbyopia).",
          "Using the ray picture, explain why a convex lens held at arm's length projects an inverted image of a window onto a wall, but the same lens close to the page magnifies upright text.",
          "Two observers stand 100 m apart and both see 'a rainbow.' Argue precisely in what sense they are seeing different rainbows.",
          "Why is the evening sky red while the midday sky is blue? Give the λ⁴ argument and predict the sky colour on a planet whose atmosphere scatters long wavelengths more strongly.",
        ],
      },
    },
    electrostatics: {
      title: "Electrostatics",
      overview: "Electrostatics deals with electric charges at rest. Coulomb's law gives the force between point charges. Electric field and potential describe the influence of charges on their surroundings.",
      sections: [
        {
          heading: "1. Coulomb's Law",
          content: "Force between two point charges: F = kq₁q₂/r². Like charges repel; opposite charges attract. k = 9 × 10⁹ N·m²/C².",
          formula: "F = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{q_1\\, q_2}{r^2} = k\\,\\dfrac{q_1\\, q_2}{r^2}",
          example: "Example: Two charges +2μC and -3μC are 0.1 m apart.\nF = (9×10⁹)(2×10⁻⁶)(3×10⁻⁶)/(0.1)² = 5.4 N (attractive)",
        },
        {
          heading: "2. Electric Field",
          content: "Electric field E = F/q₀ = kQ/r² for a point charge. Field lines start on positive charges and end on negative charges.",
          formula: "\\vec{E} = \\dfrac{\\vec{F}}{q_0} = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r^2}\\,\\hat{r}",
        },
        {
          heading: "3. Electric Potential",
          content: "Potential V = kQ/r. Potential is a scalar. Equipotential surfaces are perpendicular to field lines.",
          formula: "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r}",
        },
        {
          heading: "4. Gauss's Law",
          content: "Total electric flux through a closed surface equals enclosed charge divided by ε₀. Most useful for symmetric charge distributions.",
          formula: "\\oint \\vec{E}\\cdot d\\vec{A} = \\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}",
        },
        {
          heading: "5. Capacitors",
          content: "Capacitance C = Q/V. Parallel plate: C = ε₀A/d. Energy stored: U = ½CV². Capacitors in parallel add; in series, reciprocals add.",
          formula: "C = \\dfrac{Q}{V}, \\quad C_0 = \\dfrac{\\varepsilon_0 A}{d}, \\quad U = \\tfrac{1}{2}CV^2",
        },
      ],
      keyPoints: [
        "Coulomb force follows inverse-square law",
        "Electric field inside a conductor is zero in electrostatic equilibrium",
        "Potential is scalar; superposition is simpler for potential",
        "Capacitors in parallel: add capacitances; in series: add reciprocals",
      ],
      commonMistakes: [
        "Confusing electric field (vector) with electric potential (scalar)",
        "Choosing a poor Gaussian surface",
        "Adding capacitances for series connection",
      ],
      practiceQuestions: [
        "Two charges +4μC and +6μC are 0.3 m apart. Find where the electric field is zero.",
        "A parallel plate capacitor has plates of area 0.01 m² separated by 1 mm. Find capacitance.",
        "Three capacitors (2μF, 3μF, 6μF) in series. Find equivalent capacitance.",
        "An electron accelerated through 1000 V. Find its final speed. (m_e = 9.1×10⁻³¹ kg)",
        "Find electric field at midpoint between +10μC and -10μC separated by 10 cm.",
      ],
      enrichedContent: {
        title: "Electrostatics — The Force That Holds the World Together",
        overview: "Every contact force you have ever felt — the chair holding you, friction, a handshake — is electromagnetism at the atomic scale, and it is 10³⁶ times stronger than gravity. Electrostatics is the study of charge at rest: the source of that force, the field it weaves through space, the potential landscape it carves, and the capacitor, its most useful invention. Understand charge and you understand why matter is solid, why lightning strikes where it does, and why your phone screen knows where you touched it.",
        sections: [
          {
            heading: "1. Charge — The Strongest Force in the Universe, Hidden by Balance",
            content: "There are exactly two kinds of charge, carried by two particles: the electron (negative) and proton (positive), in equal-magnitude units e = 1.6×10⁻¹⁹ C — charge is quantized, always a whole number of these. The electric force between two electrons is about 10⁴² times stronger than their gravitational pull. Why, then, does gravity run the cosmos? Because charge comes in two signs that cancel, while mass only comes in one. Ordinary matter is neutral to a few parts per 10²⁰ — if your body carried even a 1% excess of electrons over protons, the repulsion would exceed the weight of the Earth. Solidity itself is electrostatic: your hand never 'touches' a table — the electron clouds of your atoms repel the table's atoms, and that repulsion is what you feel as contact. Chemistry is applied electrostatics: every bond is a negotiated arrangement of positive nuclei and negative electrons. Static electricity is this force caught unbalanced — rubbing transfers electrons, and suddenly the strongest force in nature is visible in a sticking balloon or a doorknob spark.",
            formula: "F = k\\frac{q_1 q_2}{r^2}, \\qquad \\frac{F_{\\text{electric}}}{F_{\\text{gravity}}} \\bigg|_{\\text{2 electrons}} \\approx 4 \\times 10^{42}",
            keyPoints: [
              "Charge is quantized in units of e and comes in exactly two cancelling signs",
              "Electric force is 10⁴² times gravity per electron pair — the universe hides it behind near-perfect neutrality",
              "Contact, friction and chemistry are all electrostatics in disguise",
            ],
          },
          {
            heading: "2. The Field — Space Itself Carries the Influence",
            content: "How does one charge 'know' about another across empty space? Newton himself called action-at-a-distance 'so great an absurdity' that no thinking person could accept it. Faraday's answer: charges modify the space around them, creating an electric field — a vector assigned to every point, E = F/q₀, meaning 'the force a unit positive charge WOULD feel here.' The field is not bookkeeping fiction: it carries energy and momentum, it propagates changes at the speed of light (move a charge, and distant space updates only after a delay), and light itself is a travelling field disturbance. Field lines are the visualization language: they begin on + charges, end on − charges, never cross, and their density encodes strength. The superposition principle is the engine of all electrostatics: the field of many charges is the vector sum of individual fields — every complicated arrangement is built from point-charge arithmetic. This linearity is why electrostatics is solvable at all.",
            formula: "\\vec{E} = \\frac{\\vec{F}}{q_0} = k\\frac{Q}{r^2}\\hat{r}, \\qquad \\vec{E}_{\\text{total}} = \\sum_i \\vec{E}_i \\;\\text{(superposition)}",
            example: "The classic null point: two like charges +4μC and +6μC separated by 0.3 m have a point between them where the fields cancel exactly. Setting kq₁/x² = kq₂/(0.3−x)² gives x ≈ 0.135 m from the smaller charge — the quiet eye of the electric storm, where a test charge feels nothing.",
            keyPoints: [
              "Fields replace spooky action-at-a-distance: space itself carries the influence, at light speed",
              "Field lines start on + and end on −; density = strength; they never cross",
              "Superposition makes every complex charge distribution a sum of simple ones",
            ],
          },
          {
            heading: "3. Potential — The Landscape Voltage",
            content: "The electric field is a vector map; the potential V is the same information as a scalar HEIGHT map — the electrical landscape. V at a point is the potential energy per unit charge: the work needed to bring 1 coulomb from infinity. Just as water flows downhill and balls roll off summits, positive charges accelerate from high V to low V, and electrons (negative) climb 'uphill' toward positive potential. The field points steepest-downhill: E = −dV/dx, and equipotential surfaces — contours of equal voltage — are always perpendicular to field lines, because moving along a contour costs no work. This landscape view explains two everyday mysteries. Why doesn't a bird on a 100,000 V power line fry? Because voltage is a DIFFERENCE: both feet sit at essentially the same potential, so almost no energy is exchanged — the bird is safe as long as it touches only one wire (bridge to ground or another wire and the difference does the damage). And why do charges concentrate on sharp points of a conductor? Because surface charge density must arrange itself so the entire conductor is one equipotential; tight curvature forces charge close together, spiking the local field until air ionizes — corona discharge, the operating principle of lightning rods, which quietly leak charge and bleed the thundercloud's aim away from your house.",
            formula: "V = k\\frac{Q}{r} \\;(\\text{scalar}), \\qquad \\vec{E} = -\\nabla V, \\qquad W_{A\\to B} = q(V_B - V_A)",
            keyPoints: [
              "Potential is the height map; field is the downhill direction — same physics, scalar vs vector",
              "Only voltage DIFFERENCES do work; a bird at uniform potential is safe on a live line",
              "Sharp conductor points concentrate field → corona → lightning rods bleed strikes away",
            ],
          },
          {
            heading: "4. Conductors, Shielding, and the Faraday Cage",
            content: "In a metal, some electrons roam freely. Give a conductor any excess charge and the mutual repulsion shoves it to the surface within nanoseconds — the interior stays neutral. Place a conductor in an external field and its free electrons instantly rearrange until their own field exactly cancels the intruder inside: E = 0 throughout any conductor in electrostatic equilibrium. This is not an approximation; it is self-consistency — any residual internal field would keep moving charges, contradicting equilibrium. The consequence is profound and practical: a hollow conductor shields its cavity COMPLETELY from outside fields, whatever happens outside. A Faraday cage. Your car during lightning, an aircraft shell struck at 30,000 A (passengers feel nothing; the current rides the skin), MRI rooms, microwave oven doors with their perforated metal (holes smaller than the wavelength keep microwaves in while letting light out), and signal-blocking bags for phones — all the same theorem. Note the asymmetry: a cage blocks outside fields from inside, but charges INSIDE still project fields outside unless the cage is grounded — grounding is the drain wire that makes the shield total.",
            formula: "\\vec{E}_{\\text{inside conductor}} = 0, \\qquad \\sigma = \\varepsilon_0 E_{\\text{just outside}} \\;\\text{(surface charge supports the external field)}",
            example: "The classroom demonstration: a person stands inside a metal mesh cage while a Tesla coil arcs hundreds of kilovolts onto it. Inside, a candle flame doesn't flicker — the field is exactly zero. The lightning current flows on the cage's skin; the interior is another electrostatic universe.",
            keyPoints: [
              "E = 0 inside any conductor at equilibrium — free electrons enforce it in nanoseconds",
              "A hollow conductor is a perfect shield (Faraday cage): cars, planes and MRI rooms exploit it",
              "Grounding completes the shield; ungrounded cages still block external fields but leak internal charges outward",
            ],
          },
          {
            heading: "5. Gauss's Law — Counting Field Lines",
            content: "Gauss's law is Coulomb's law promoted to a global statement: the total electric flux (field-line flow) through any CLOSED surface equals the enclosed charge divided by ε₀ — regardless of the surface's shape or where inside the charges sit. Why must this be true? Precisely BECAUSE the force is inverse-square: field lines from a point charge spread over sphere areas ∝ r², while field strength ∝ 1/r² — the product, the flux, never changes with distance, so any enclosing surface catches exactly the same count of lines. Deviate from 1/r² even slightly and Gauss's law breaks; experiments confirm it holds to better than 1 part in 10¹⁶. The law becomes a superpower when symmetry lets you choose a surface on which E is constant: spherical symmetry (point charges, shells — reproducing the shell theorem for gravity instantly), cylindrical (wires), planar (infinite sheets give E = σ/2ε₀, astonishingly independent of distance). Watch the pattern: gravity obeyed the same inverse-square geometry, so Gauss's law has a gravitational twin. It is the mathematical statement that inverse-square forces conserve flux.",
            formula: "\\oint \\vec{E}\\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0} \\;\\xrightarrow{\\text{sheet}}\\; E = \\frac{\\sigma}{2\\varepsilon_0} \\;(\\text{distance-independent!})",
            keyPoints: [
              "Gauss's law works BECAUSE the force is exactly inverse-square — flux is conserved through any sphere",
              "Choose Gaussian surfaces that match the symmetry: spheres, cylinders, boxes/pillboxes",
              "An infinite charged sheet's field never weakens with distance — symmetry demands it",
            ],
          },
          {
            heading: "6. Capacitors — Bottling the Electric Field",
            content: "A capacitor is two conductors held apart, storing equal and opposite charge: C = Q/V measures how much charge per volt of separation the geometry supports. But the deeper truth is WHERE the energy lives — not in the charges but in the FIELD between them, at density ½ε₀E² joules per cubic metre. A charged capacitor is a bottle of electric field. Insert a dielectric (any insulator) and capacitance grows: the field polarizes the dielectric's molecules, and their aligned response partially cancels the field, letting more charge pile up at the same voltage. The numbers reveal why capacitors are everywhere: a camera flash capacitor stores joules and dumps them in microseconds (power = energy/time → kilowatt flash from a tiny battery); a defibrillator stores ~200 J and delivers it through a chest in milliseconds; your phone's touchscreen is a grid of tiny capacitors that your finger (a conductor) locally detunes, and the controller triangulates the disturbance; computer memory (DRAM) stores each bit as charge on a microscopic capacitor. Capacitors oppose sudden voltage change — they are the shock absorbers of electronics, smoothing power supplies and filtering signals. Series/parallel combination follows from voltage and charge bookkeeping: parallel shares voltage so capacitances ADD (bigger plates); series shares charge so reciprocals add (effectively a bigger gap).",
            formula: "C = \\frac{Q}{V} = \\frac{\\varepsilon_0 \\kappa A}{d}, \\qquad U = \\tfrac{1}{2}CV^2, \\qquad u_E = \\tfrac{1}{2}\\varepsilon_0 E^2 \\;\\text{(energy density of the field itself)}",
            example: "Camera flash arithmetic: a 100 μF capacitor at 300 V stores ½CV² = 4.5 J. Released in 1 ms, that is 4.5 kW of light power — from a capacitor charged slowly by a 3 W battery circuit. Capacitors do not create energy; they TIME-SHIFT it, trading slow charge for fast discharge.",
            keyPoints: [
              "Capacitor energy lives in the field between plates (½ε₀E² per m³), not in the charge itself",
              "Dielectrics raise C by polarizing against the field — molecules become tiny cancelling dipoles",
              "Flash, defibrillator, touchscreen, DRAM: all are capacitors doing charge bookkeeping",
              "Parallel adds C (shared V, bigger plates); series adds reciprocals (shared Q, bigger gap)",
            ],
          },
        ],
        keyPoints: [
          "Electromagnetism is 10⁴² times gravity per particle pair — matter feels solid because of it",
          "Fields are real carriers of force, energy and information, propagating at light speed",
          "Potential is the scalar landscape; voltage differences do the work; birds survive equipotentials",
          "E = 0 inside conductors → Faraday cages shield perfectly; sharp points leak charge (lightning rods)",
          "Gauss's law = flux counting, exact because the force is inverse-square; capacitors bottle field energy",
        ],
        commonMistakes: [
          "Treating voltage as an absolute quantity — only differences are physical; 'the wire is at 100 kV' means relative to ground",
          "Forgetting that a Faraday cage needs no power or grounding to block external fields — equilibrium does the work",
          "Applying Gauss's law without symmetry — the integral is always true, but only symmetric surfaces let you extract E",
          "Saying charge 'flows onto capacitor plates' through the gap — current charges one plate and repels charge off the other; nothing crosses",
          "Confusing energy stored (½CV²) with charge stored (CV) — flash brightness scales with energy, not charge",
        ],
        practiceQuestions: [
          "Estimate the fraction of excess electrons needed on your body for electrostatic repulsion to balance your weight against gravity. Comment on what the tiny answer says about matter's neutrality.",
          "Find the point where E = 0 between +4μC and +6μC charges 0.3 m apart. Then ask: is the potential zero there too? Compute it and explain the difference between a vector null and a scalar null.",
          "Prove that an infinite charged sheet's field is independent of distance using a Gaussian pillbox — then give the intuition for why the field never fades.",
          "A defibrillator's 20 μF capacitor charged to 5000 V discharges 90% of its energy in 5 ms. Compute the stored energy and average power delivered, and compare with a household appliance.",
          "Why does a microwave oven door have a metal mesh with visible holes? Use the Faraday-cage idea and wavelength comparison to explain why microwaves stay in but light gets out.",
          "A parallel-plate capacitor stays connected to a battery while you double the plate separation. Determine what happens to Q, E, and stored U — and account for where the energy went.",
          "Explain why lightning rods have sharp tips using surface charge density and corona discharge. Would a blunt rod work as well? Justify with the field-at-a-point argument.",
        ],
      },
    },
    current: {
      title: "Current Electricity",
      overview: "Current electricity deals with flow of electric charge. Ohm's law (V = IR) relates voltage, current, and resistance. Kirchhoff's laws govern complex circuits.",
      sections: [
        {
          heading: "1. Ohm's Law and Resistance",
          content: "V = IR for ohmic conductors. Resistance depends on material and geometry: R = ρL/A, where ρ is resistivity.",
          formula: "V = IR, \\qquad R = \\rho\\dfrac{L}{A}",
        },
        {
          heading: "2. Resistors in Series and Parallel",
          content: "Series: R_eq = R₁ + R₂ + R₃ + ... (same current). Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (same voltage).",
          formula: "\\begin{aligned} \\text{Series:} \\quad R_{\\text{eq}} &= R_1 + R_2 + R_3 \\\\ \\text{Parallel:} \\quad \\dfrac{1}{R_{\\text{eq}}} &= \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3} \\end{aligned}",
        },
        {
          heading: "3. Kirchhoff's Laws",
          content: "KCL (junction rule): sum of currents entering = sum leaving. KVL (loop rule): sum of potential differences around any loop = 0.",
          formula: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\qquad \\sum \\Delta V = 0",
        },
        {
          heading: "4. Electrical Power",
          content: "Power dissipated in a resistor: P = IV = I²R = V²/R. Energy: E = Pt.",
          formula: "P = IV = I^2R = \\dfrac{V^2}{R}",
        },
        {
          heading: "5. EMF and Internal Resistance",
          content: "Terminal voltage: V = ε - Ir. A real battery has internal resistance r.",
          formula: "V_{\\text{terminal}} = \\varepsilon - Ir",
        },
      ],
      keyPoints: [
        "Current is same through series components; voltage is same across parallel components",
        "Kirchhoff's laws apply charge and energy conservation to circuits",
        "Internal resistance causes terminal voltage to drop under load",
      ],
      commonMistakes: [
        "Adding resistances for parallel connection",
        "Forgetting internal resistance in battery calculations",
        "Sign errors in Kirchhoff's loop rule",
      ],
      practiceQuestions: [
        "Three resistors (2Ω, 3Ω, 6Ω) in parallel. Find equivalent resistance.",
        "A 12V battery with internal resistance 1Ω is connected to a 5Ω resistor. Find current and terminal voltage.",
        "A 100W bulb is connected to 220V mains. Find current and resistance.",
        "Two cells (2V, r=0.5Ω) and (3V, r=1Ω) in parallel across 4Ω. Find current through resistor.",
        "Find the equivalent resistance between two corners of a cube made of 1Ω resistors.",
      ],
      enrichedContent: {
        title: "Current Electricity — The Slow River That Moves at Light Speed",
        overview: "Flip a switch and the light obeys instantly — yet the electrons carrying that command crawl at millimetres per second. Current electricity is full of such paradoxes, and each one dissolves once you see circuits as energy-plumbing: batteries are pumps, voltage is pressure, current is flow rate, resistors are friction, and the energy itself travels in the FIELDS around the wires, not inside them. Kirchhoff's rules are just conservation of charge and energy doing bookkeeping. Master the picture and every circuit becomes readable.",
        sections: [
          {
            heading: "1. Current vs Electron Speed — The Pipe Already Full of Water",
            content: "A copper wire carries ~10²³ free electrons per cm³, so even a hefty current needs only a crawl: drift velocity in household wiring is roughly 0.1 mm/s — slower than a snail. Yet the lamp lights the instant you flip the switch. Resolution: the wire is like a pipe already packed with water — push one electron in and another pops out the far end almost immediately, because the ELECTRIC FIELD establishing the push propagates along the wire at a substantial fraction of light speed. Current is the collective response, not the travel of any individual carrier. This also answers where the energy actually flows: not through the copper, but through the electromagnetic field SURROUNDING the wire (Poynting flux) — the wire merely guides the field like a rail guides a train. The humble extension cord is a field-delivery system; electrons are just the medium that shapes it.",
            formula: "I = nqAv_d \\;\\implies\\; v_d = \\frac{I}{nqA} \\sim 10^{-4}\\ \\text{m/s}, \\qquad \\text{signal speed} \\sim 10^8\\ \\text{m/s}",
            keyPoints: [
              "Electrons drift at snail pace; the field that organizes them races near light speed",
              "Current is a collective flow rate (charge/second), not a particle's journey",
              "Energy travels in the fields around wires — conductors are waveguides, not energy pipes",
            ],
          },
          {
            heading: "2. Resistance Microscopically — Why Ohm's Law Is Almost True",
            content: "An electron in a wire accelerates under the field, then collides with a vibrating lattice ion and loses its gained velocity — resistance is the average drag of this pinball game. The Drude picture yields Ohm's law naturally: double the field, double the drift speed between collisions, double the current — V ∝ I emerges from microscopic chaos. Resistivity ρ is the material's pinball density: copper (1.7×10⁻⁸ Ω·m) versus nichrome (10⁻⁶ Ω·m), a factor of ~60, which is why wires are copper and heater coils are nichrome — heaters are resistors engineered to glow. Temperature raises resistance in metals (hotter lattice vibrates harder, more collisions) — the reason a bulb usually dies at switch-on, when the cold filament draws a huge inrush current. But ohmic behavior is a habit, not a law of nature: filament resistance climbs as it heats (non-linear), diodes conduct one way only (exponential I-V), and superconductors below a critical temperature drop to EXACTLY zero resistance — current loops persist for years without a power source, because the quantum ground state forbids small energy losses entirely. 'Ohm's law' is really a property of some materials in some regimes, and knowing when it fails is what makes an engineer.",
            formula: "R = \\rho\\frac{L}{A}, \\qquad v_d = \\frac{eE\\tau}{m} \\;(\\text{Drude: } \\tau = \\text{mean collision time})",
            keyPoints: [
              "Resistance = electron pinball against lattice vibrations; Ohm's law emerges from averaged chaos",
              "Heating elements are engineered resistors; wiring is engineered non-resistors",
              "Bulbs die at switch-on: cold filament → low R → inrush current → weak spot fails",
              "Superconductors have exactly zero resistance — persistent currents need no battery",
            ],
          },
          {
            heading: "3. Series and Parallel Are Topology, Not Just Formulas",
            content: "The combination rules are not arbitrary algebra — they are water plumbing. Series: one pipe, one flow (same current everywhere), pressure drops add (voltages add), and total resistance is the sum because the water fights friction over the whole combined length. Parallel: one pressure across each branch (same voltage), flows split and add, and total resistance DROPS below the smallest branch because you have opened extra lanes — more paths means easier overall passage. This 'extra lanes' intuition explains the counter-intuitive formula: adding a resistor in parallel always reduces equivalent resistance. Your house is wired in parallel for exactly this reason — every socket gets the full 220 V regardless of how many appliances run, and each appliance independently draws its own current. The dark side of parallel wiring: total current grows with every appliance, so the shared wire heats as I²R — hence fuses and breakers, deliberate weak links that melt or trip before your walls do. Series wiring would be a catastrophe: every lamp dimmed by every other lamp, one failure killing the whole string (old Christmas lights, famously).",
            formula: "R_{\\text{series}} = \\sum R_i, \\qquad \\frac{1}{R_{\\text{parallel}}} = \\sum \\frac{1}{R_i} \\;<\\; \\min(R_i)",
            keyPoints: [
              "Series = one lane, shared current, added friction; parallel = extra lanes, shared pressure",
              "Parallel resistance always drops — more lanes always ease traffic",
              "Homes are parallel-wired so each appliance gets full voltage; breakers protect the shared lanes",
            ],
          },
          {
            heading: "4. Kirchhoff's Laws Are Conservation in Disguise",
            content: "Circuit analysis looks like arbitrary rules until you see its skeleton. KCL (currents entering a junction equal currents leaving) IS conservation of charge: charge cannot pile up at a node, so what flows in must flow out — an incompressibility condition. KVL (voltages around any closed loop sum to zero) IS conservation of energy: voltage is energy per coulomb, and a charge returning to its start must have gained exactly what it lost, or energy would be created from nothing. Every 'trick' of circuit analysis — mesh currents, node voltages, superposition — is bookkeeping built on these two conservation laws plus Ohm's law as the material's local behavior. That is also why the sign conventions matter and are learnable: walk a loop, tally rises and drops, and the algebra cannot lie because physics already balanced the books. The deepest lesson: circuits are not a separate science. They are Maxwell's equations constrained to wires, and Kirchhoff is what conservation looks like when the geometry is one-dimensional.",
            formula: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\;(\\text{charge}), \\qquad \\oint \\Delta V = 0 \\;(\\text{energy})",
            example: "Sign-convention discipline: pick a loop direction, cross each element, and tally: through a resistor with the current = −IR; against it = +IR; battery − to + = +ε; + to − = −ε. Sum to zero. Every circuit mistake traceable to 'Kirchhoff is confusing' is actually a bookkeeping slip, not a physics failure.",
            keyPoints: [
              "KCL = charge conservation (no pile-ups); KVL = energy conservation (no free round trips)",
              "Sign conventions are bookkeeping discipline, not new physics",
              "All circuit theory = conservation laws + Ohm's local material rule",
            ],
          },
          {
            heading: "5. Power, Losses, and Why the Grid Runs at 400 kV",
            content: "Power dissipated in a resistance is P = I²R — note the SQUARE of current. This single exponent shaped the entire electrical grid. To deliver a fixed power P = VI, you can push high current at low voltage or low current at high voltage. Transmission losses are I²R in the wires, so halving the current cuts losses to a quarter: stepping voltage up 20× cuts losses 400×. This is why power leaves the station at hundreds of kilovolts, transformers step it down region by region, and your home receives a safe 220 V — the same watts, transported with almost no waste. It is also why AC won the 'War of Currents' in the 1890s: transformers only work with changing current, and Tesla/Westinghouse had them while Edison's DC grid did not (modern HVDC now exists for very long links, thanks to power electronics). The I²R law is also domestic: extension cords warm under a heater because their thin wires carry the full current, and a 100 W bulb's filament runs at ~2500°C precisely because its thin tungsten is a high-resistance bottleneck converting electrical energy into light and heat. Safety corollary: it is CURRENT through tissue that kills (~50 mA can stop a heart), which is why high-voltage signs are honest — but a static spark at 20,000 V is harmless because almost no sustained current flows.",
            formula: "P = IV = I^2R = \\frac{V^2}{R}, \\qquad P_{\\text{loss}} = I^2R_{\\text{wire}} \\;\\implies\\; \\text{step } V \\text{ up } n\\times \\Rightarrow \\text{losses} \\downarrow n^2\\times",
            keyPoints: [
              "Losses scale as I² — the grid's high voltage is just low current in disguise",
              "Transformers made AC win the War of Currents; they only work on changing fields",
              "Lethality is current through the body, not voltage on the sign — a spark at 20 kV carries almost none",
            ],
          },
          {
            heading: "6. Batteries — Chemical Pumps with a Price",
            content: "A battery is not a charge reservoir — it is a PUMP that uses chemical reactions to haul charge from its low-potential terminal to its high-potential terminal, maintaining a voltage the way a water pump maintains pressure. EMF ε is the ideal pump head; internal resistance r is friction inside the pump itself. Under load, terminal voltage sags: V = ε − Ir, because part of the pump's own work is spent overcoming its internal friction — dissipated as heat inside the battery, which is why a phone battery warms during fast charging and why a car's headlights dim exactly when the starter motor draws hundreds of amps. Maximum power transfer occurs when load resistance equals internal resistance (R = r) — matched, but only 50% efficient; power grids deliberately operate FAR from this point because efficiency matters more than raw transfer. Battery chemistry is a menu of energy-density trade-offs: lead-acid (heavy, cheap, surges well — cars), lithium-ion (light, energy-dense, needs careful management — phones and EVs), and the horizon of solid-state designs. The deep lesson of this section: every real source has an inside, and circuit theory only tells the truth when you model it.",
            formula: "V = \\varepsilon - Ir, \\qquad P_{\\text{load}} \\text{ maximal at } R = r \\;\\text{(but only 50\\% efficient there)}",
            example: "Dead-battery jump-start physics: a 'dead' 12 V battery still reads ~12 V on a voltmeter (no load, no Ir drop) but collapses under current — its r has grown. The voltmeter sees ε; the engine sees V. Measuring a battery under load is the only honest test.",
            keyPoints: [
              "Batteries pump charge chemically; EMF is the ideal head, internal resistance is pump friction",
              "Terminal voltage sags under load (V = ε − Ir) — sag and heat are the same physics",
              "Maximum power transfer (R = r) is 50% efficient — grids avoid it on purpose",
              "A battery's true state shows only under load; open-circuit voltage can lie",
            ],
          },
        ],
        keyPoints: [
          "Electrons drift at ~0.1 mm/s while the field commands at near light speed — the pipe is already full",
          "Ohm's law emerges from collision-averaged electron pinball; it fails in diodes, filaments, superconductors",
          "Series/parallel are topology: one lane vs extra lanes — parallel always lowers equivalent R",
          "Kirchhoff's rules are charge and energy conservation wearing circuit clothes",
          "P = I²R made high-voltage transmission inevitable; batteries are pumps whose internal friction sags their voltage",
        ],
        commonMistakes: [
          "Imagining electrons race from switch to lamp — they drift imperceptibly; the field is what's fast",
          "Saying 'current is used up' in a resistor — current is the same in and out; energy is what's spent",
          "Adding resistances in parallel instead of reciprocals, or forgetting parallel R is smaller than the smallest branch",
          "Treating battery voltage as constant — terminal voltage depends on the load through internal resistance",
          "Confusing energy (kWh, what you pay for) with power (kW, the rate) — utility bills charge joules, not watts",
        ],
        practiceQuestions: [
          "Compute the drift velocity of electrons in a 1 mm² copper wire carrying 5 A (n ≈ 8.5×10²⁸/m³), then estimate how long one electron takes to travel 1 m. Reconcile with the lamp lighting instantly.",
          "A bulb rated 100 W at 220 V: find its operating resistance and the current. Then estimate its cold resistance and explain why it usually fails at switch-on.",
          "Show that a transmission line carrying fixed power P loses power ∝ 1/V². Quantify the loss reduction when a 10 kV line is upgraded to 100 kV.",
          "A 12 V battery with r = 0.5 Ω powers a variable load R. Tabulate terminal voltage and load power for R = 0.5, 2, 6, 24 Ω. Locate the maximum-power point and its efficiency.",
          "Apply KCL and KVL to a two-loop circuit with two batteries and three resistors; solve fully, then verify energy conservation: total power supplied = total power dissipated.",
          "Why does adding another appliance in a house never dim the others significantly, but a long thin extension cord feeding a heater makes lamps flicker? Answer in terms of parallel topology and series wire resistance.",
          "Design question: using only 1 Ω resistors, build an equivalent of 0.75 Ω. Then build 1.5 Ω. Explain the topology of each.",
        ],
      },
    },
    emw: {
      title: "Electromagnetic Waves",
      overview: "EM waves are oscillating electric and magnetic fields propagating at the speed of light. They are transverse waves with E and B perpendicular to each other and to the direction of propagation.",
      sections: [
        {
          heading: "1. EM Wave Properties",
          content: "All EM waves travel at c = 3 × 10⁸ m/s in vacuum. E and B are in phase: E = cB. EM waves carry energy and momentum.",
          formula: "c = \\lambda\\nu = 3 \\times 10^8 \\; \\text{m/s}, \\qquad E = cB",
        },
        {
          heading: "2. EM Spectrum",
          content: "Ordered by frequency: radio < microwave < IR < visible < UV < X-ray < gamma ray. Higher frequency = higher photon energy.",
          formula: "\\lambda: \\text{radio} > \\text{microwave} > \\text{IR} > \\text{visible} > \\text{UV} > \\text{X-ray} > \\gamma\\text{-ray}",
        },
        {
          heading: "3. Photon Energy",
          content: "Energy of a photon: E = hν = hc/λ, where h = 6.626 × 10⁻³⁴ J·s.",
          formula: "E = h\\nu = \\dfrac{hc}{\\lambda}",
        },
      ],
      keyPoints: [
        "EM waves are transverse and need no medium",
        "Higher frequency = higher photon energy",
        "EM waves can be polarized",
      ],
      commonMistakes: [
        "Thinking EM waves need a medium",
        "Confusing frequency with wavelength",
      ],
      practiceQuestions: [
        "Find the frequency of a radio wave with wavelength 300 m.",
        "What is the energy of a photon of green light (λ = 550 nm)?",
        "An EM wave has E₀ = 100 V/m. Find B₀.",
        "Calculate radiation pressure by 1000 W/m² light on a reflecting surface.",
        "Find wavelength of EM wave with frequency 10¹⁵ Hz.",
      ],
      enrichedContent: {
        title: "Electromagnetic Waves — Light Is Just One Note in a Vast Chord",
        overview: "In 1865 Maxwell combined the known laws of electricity and magnetism and found they predicted a self-propagating wave of interlocking fields — travelling at a speed already measured in labs, the speed of light. His conclusion reshaped physics: light IS electromagnetism, and the visible rainbow is one thin octave of a spectrum stretching from kilometre-long radio waves to gamma rays smaller than atoms. This section follows the chain: how fields bootstrap each other into existence, why no medium is needed, how one phenomenon spans 24 octaves, and the strange fact that this wave also arrives in indivisible packets.",
        sections: [
          {
            heading: "1. Maxwell's Synthesis — How a Wave Bootstraps Itself",
            content: "The ingredients were experimental: changing magnetic fields make electric fields (Faraday), and changing electric fields make magnetic fields (Maxwell's addition to Ampère). Maxwell noticed the two rules interlock — a changing E breeds a changing B, which breeds a changing E — a self-sustaining cycle that needs no charges and no currents once launched. Solving his equations gave a wave speed of 1/√(μ₀ε₀), computable from two purely electrical lab measurements, and it came out at 3×10⁸ m/s — the already-known speed of light. 'We can scarcely avoid the inference,' Maxwell wrote, 'that light consists in transverse undulations of the same medium which is the cause of electric and magnetic phenomena.' This was the greatest unification since Newton: optics became a chapter of electromagnetism. The wave's structure is rigidly geometric: E ⊥ B ⊥ direction of travel, both fields oscillating in phase, with E = cB locking their amplitudes. And the speed is universal — every EM wave in vacuum travels at exactly c regardless of frequency, which is why starlight of all colors reaches us simultaneously and why we can see the universe coherently at all.",
            formula: "c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3\\times10^8\\ \\text{m/s} \\;(\\text{from pure electrical constants!}), \\qquad E = cB",
            keyPoints: [
              "Changing E makes B, changing B makes E — the wave is self-sustaining, needing no source once launched",
              "c is computable from bench-top electrical constants — light's speed was predicted before it was identified as EM",
              "E ⊥ B ⊥ propagation; in phase; amplitude-locked by E = cB",
            ],
          },
          {
            heading: "2. No Medium Required — The Death of the Aether",
            content: "Every other wave you know is motion OF something: sound is air, water waves are water. Light crosses 150 million km of vacuum, so physicists of the 1800s invented a medium — the luminiferous aether — filling all space. Michelson and Morley's 1887 interferometer experiment tried to detect Earth's motion through it by measuring light-speed differences with the seasons. Result: none. The aether does not exist. The resolution (completed by Einstein in 1905) was radical: the fields THEMSELVES are the substance. An EM wave is not a vibration in anything else; the oscillating electric and magnetic fields are the physical reality, carrying energy and momentum through empty space. This is why light from the Sun arrives across the void and sound from the Sun never does. The vacuum's 'stiffness' is encoded in the constants ε₀ and μ₀ — space itself sets the speed limit, and c is not really about light; it is the universe's causality speed, the rate at which ANY influence can propagate. Light simply happens to travel at the cosmic speed limit because photons have no mass.",
            formula: "c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\;\\text{(vacuum's electromagnetic 'stiffness')}, \\qquad \\text{no aether wind: } \\Delta c = 0",
            keyPoints: [
              "Light needs no medium — the fields are the medium; Michelson-Morley buried the aether",
              "Sound cannot cross space; light can, because light IS field, not matter-motion",
              "c is the universe's causality speed limit; massless photons simply always travel at it",
            ],
          },
          {
            heading: "3. One Phenomenon, 24 Octaves — The Spectrum as a Continuum",
            content: "Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma — these are not different kinds of thing. They are the SAME self-propagating field oscillation, differing only in frequency, spanning 10⁴ Hz to 10²⁰ Hz: twenty-four octaves, of which your eyes see barely one. The divisions are human bookkeeping based on how the waves are PRODUCED and DETECTED: radio from electrons oscillating in antenna wires (antenna size ≈ wavelength, which is why AM radio towers are football-field-scale and phone antennas are centimetre-scale); visible light from electrons dropping between atomic energy levels; X-rays from inner-shell electrons or braking charges; gamma rays from nuclear transitions. The atmosphere is picky about what it admits — it is transparent to visible light and radio (the two 'windows' that ground-based astronomy uses) but blocks most UV, X-rays and gamma rays, which is why those telescopes must orbit. Here is an evolutionary curiosity: the Sun's output peaks almost exactly in the visible band, and water is most transparent there too — eyes did not adapt to see visible light by chance; visible light is DEFINED as the part of the spectrum that was most worth seeing. Infrared is thermal radiation: your body glows at ~10 μm right now, and night-vision goggles are simply cameras honest enough to see it.",
            formula: "c = \\lambda\\nu \\;\\text{(one equation, all 24 octaves)}, \\qquad E_{\\text{photon}} = h\\nu",
            keyPoints: [
              "The spectrum is one phenomenon parametrized by frequency — names mark production/detection methods, not physics differences",
              "Antenna size tracks wavelength; atmospheric windows (visible, radio) dictate telescope placement",
              "'Visible' light is visible because the Sun peaks there — evolution defined the band, not the reverse",
            ],
          },
          {
            heading: "4. Wave and Particle — Light Arrives in Packets",
            content: "The wave picture explains interference, diffraction and polarization; but certain experiments refuse it. The photoelectric effect: light below a threshold frequency ejects NO electrons no matter how intense, while dim light above threshold ejects them instantly — impossible for a continuous wave, whose energy should accumulate with brightness. Einstein's 1905 resolution: light energy is delivered in indivisible packets, photons, each carrying E = hν. One photon liberates one electron, all-or-nothing; intensity is photon COUNT, frequency is photon ENERGY. This single idea explains the entire danger-scale of the spectrum: ionizing radiation begins in the UV because that is the photon energy at which a single quantum can break a chemical bond and damage DNA — microwaves at a billion times the intensity are harmless in comparison because each photon is individually feeble (it can only jiggle molecules = heat, as your microwave oven's 2.45 GHz water-resonance setting does deliberately). Photovoltaic cells are applied photoelectric effect: photons above silicon's bandgap energy knock electrons into a circuit. The duality is not a contradiction but a division of labour — light PROPAGATES as a wave (interference en route) and EXCHANGES energy as a particle (detection events). Which face it shows depends on the question you ask.",
            formula: "E = h\\nu = \\frac{hc}{\\lambda} \\approx \\frac{1240\\ \\text{eV·nm}}{\\lambda}, \\qquad K_{\\max} = h\\nu - \\phi \\;\\text{(photoelectric)}",
            example: "Spectrum danger ladder in eV: radio 10⁻⁹, microwave 10⁻⁵, visible 1.6–3.1, UV 3–100, X-ray 100–100,000. The chemical-bond-breaking threshold sits at ~3 eV — exactly where UV begins. Sunburn is quantum mechanics on your skin.",
            keyPoints: [
              "E = hν: frequency is per-photon energy; intensity is photon count — the two are independent",
              "Ionizing radiation starts at UV because that is the single-quantum bond-breaking threshold",
              "Light propagates as a wave, exchanges energy as particles — both pictures are load-bearing",
            ],
          },
          {
            heading: "5. Polarization — The Signature That Light Is Transverse",
            content: "A polarized wave oscillates in one plane; unpolarized light (sun, bulbs) oscillates in every transverse direction at once. Only TRANSVERSE waves can be polarized — sound in air cannot — so polarization is light's fingerprint as a transverse wave. A polarizing filter is a molecular grid that passes one oscillation direction and absorbs the perpendicular one, cutting unpolarized light to half intensity; a second filter at angle θ passes cos²θ of what survived (Malus's law) — cross them at 90° and nothing gets through, the principle behind every LCD pixel, which is a liquid-crystal sandwich electrically rotating polarization to gate light. Nature polarizes constantly: reflection off water, glass and roads polarizes horizontally — which is exactly why polarized sunglasses (vertical pass-axis) erase glare. Bees and many insects navigate by the polarization pattern of skylight, seeing a compass the sky draws that you cannot. Photographers use polarizers to darken skies and remove water reflections. And polarization carries information across the cosmos: magnetic fields in distant galaxies align emitted light's polarization, letting astronomers map fields billions of light-years away.",
            formula: "I = I_0 \\cos^2\\theta \\;\\text{(Malus)}, \\qquad I_{\\text{after first}} = \\tfrac{1}{2}I_0 \\;\\text{(unpolarized input)}",
            keyPoints: [
              "Polarization proves transversality — longitudinal waves cannot have it",
              "Malus's law (cos²θ) is the engine of LCD screens and polarizing photography",
              "Glare is horizontally polarized reflection; sunglasses are vertical grids; bees read sky polarization as a compass",
            ],
          },
          {
            heading: "6. Light Pushes — Momentum and Radiation Pressure",
            content: "EM waves carry momentum as well as energy, so light exerts a genuine mechanical pressure: absorbing a beam delivers pressure I/c; reflecting it doubles the push (the photon reverses, transferring twice its momentum). The number is tiny in daily life — full sunlight presses with about 5 μPa, a billionth of atmospheric pressure — but it is not negligible in space, where friction is absent and time is long. Comet tails point AWAY from the Sun largely because radiation pressure (and solar wind) sweeps dust and gas outward, whatever the comet's direction of travel — a tail is a windsock, not an exhaust. The same physics is now engineering: solar sails (Japan's IKAROS, the LightSail missions) use photon pressure for propellantless propulsion, and the James Webb Space Telescope's huge sunshield must account for photon momentum in its attitude control. The ultimate demonstration was Kepler's 400-year-old intuition — he noticed comet tails always face away from the Sun and guessed sunlight pushes them — correct, centuries before anyone knew light carried momentum.",
            formula: "p_{\\text{photon}} = \\frac{E}{c} = \\frac{h}{\\lambda}, \\qquad P_{\\text{radiation}} = \\frac{I}{c} \\;(\\text{absorb}), \\;\\; \\frac{2I}{c} \\;(\\text{reflect})",
            keyPoints: [
              "Photons carry momentum h/λ — light mechanically pushes what it illuminates",
              "Comet tails are radiation-pressure windsocks pointing anti-sunward, proved correct Kepler's hunch",
              "Solar sails trade time for propellant: tiny force, zero fuel, unlimited patience",
            ],
          },
        ],
        keyPoints: [
          "Maxwell's equations predict a self-sustaining field wave at c — light is electromagnetism",
          "No aether: fields are the substance; c is the universe's causality speed limit",
          "One phenomenon across 24 octaves; production and detection methods give the bands their names",
          "E = hν makes frequency the danger scale: UV is where single photons break bonds",
          "Polarization is light's transverse fingerprint — LCDs, glare, bee navigation, cosmic magnetic maps",
          "Light carries momentum: comet tails, solar sails, and photon pressure are all one effect",
        ],
        commonMistakes: [
          "Saying light 'needs a medium like all waves' — it is the exception that defined the rule's limit",
          "Confusing intensity with photon energy — bright red light cannot do what dim UV can (photoelectric threshold)",
          "Thinking polarized sunglasses work by simply dimming — they selectively block horizontally polarized glare",
          "Believing radio waves and gamma rays are different phenomena — same fields, different frequency",
          "Assuming comet tails trail behind motion — they point away from the Sun, whichever way the comet travels",
        ],
        practiceQuestions: [
          "Compute c from μ₀ = 4π×10⁻⁷ and ε₀ = 8.85×10⁻¹² and comment on why Maxwell considered the match with measured light speed the discovery of the century.",
          "Rank by single-photon energy: microwave oven photon, green photon, dental X-ray photon, FM radio photon. Which can ionize atoms, and what does that imply about standing in front of a radar dish vs an X-ray machine?",
          "Unpolarized light of intensity I₀ passes through three polarizers at 0°, 45°, and 90°. Compute the final intensity — and explain why removing the middle polarizer gives ZERO instead of more light.",
          "A solar sail of 100 m² near Earth (I = 1360 W/m²) is perfectly reflecting. Compute the force, then the acceleration for a 300 kg craft. Estimate the speed gained in one year.",
          "Why do AM radio stations need towers hundreds of metres tall while Wi-Fi antennas fit in your phone? Answer with the antenna-size/wavelength relationship and compute both wavelengths.",
          "Your body at 310 K radiates mostly at λ ≈ 9.7 μm. Identify the band, explain why you cannot see yourself glow, and why night-vision cameras can.",
          "Sunlight delivers about 1000 W/m² at the surface. Compute the photon flux (photons per second per m²) for 550 nm light — and reflect on the number's size.",
        ],
      },
    },
    modern: {
      title: "Modern Physics",
      overview: "Modern physics covers phenomena unexplained by classical physics: photoelectric effect, atomic spectra, de Broglie waves, and nuclear physics.",
      sections: [
        {
          heading: "1. Photoelectric Effect",
          content: "Light behaves as photons. KE_max = hν - φ, where φ is the work function. If hν < φ, no electrons are emitted regardless of intensity.",
          formula: "KE_{\\max} = h\\nu - \\phi = h\\nu - h\\nu_0",
          example: "Example: Light of λ = 300 nm on metal with φ = 2.13 eV.\nE_photon = hc/λ = 4.14 eV. KE = 4.14 - 2.13 = 2.01 eV",
        },
        {
          heading: "2. Bohr Model",
          content: "Electrons orbit in quantized levels: E_n = -13.6/n² eV for hydrogen. Photons are emitted/absorbed during transitions.",
          formula: "E_n = -\\dfrac{13.6}{n^2}\\;\\text{eV}",
        },
        {
          heading: "3. de Broglie Wavelength",
          content: "Matter has wave properties: λ = h/p = h/mv. For electron accelerated through V: λ = h/√(2meV).",
          formula: "\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}",
        },
        {
          heading: "4. Nuclear Physics",
          content: "Binding energy: BE = Δm·c². Radioactive decay: N = N₀e^(-λt). Half-life: T₁/₂ = ln2/λ.",
          formula: "\\text{BE} = \\Delta m\\,c^2, \\qquad N = N_0\\,e^{-\\lambda t}, \\qquad T_{1/2} = \\dfrac{\\ln 2}{\\lambda}",
        },
      ],
      keyPoints: [
        "Photoelectric effect proves particle nature of light",
        "Bohr model: angular momentum is quantized",
        "de Broglie wavelength applies to ALL matter",
        "Binding energy per nucleon peaks at iron-56",
      ],
      commonMistakes: [
        "Thinking photoelectric effect depends on intensity for electron energy",
        "Using E_n = -13.6/n (should be n²)",
        "Forgetting mass defect in nuclear reactions",
      ],
      practiceQuestions: [
        "Work function of sodium is 2.3 eV. Find threshold wavelength.",
        "Calculate wavelength of photon emitted when H electron jumps from n=3 to n=2.",
        "An electron and proton have same KE. Which has larger de Broglie wavelength?",
        "A radioactive sample has half-life 10 days. What fraction remains after 30 days?",
        "4 ¹H nuclei fuse to form ⁴He. Find energy released. (mass ¹H = 1.007825 u, ⁴He = 4.002603 u)",
      ],
      enrichedContent: {
        title: "Modern Physics — When the Classical World Broke (and What Replaced It)",
        overview: "By 1900 classical physics seemed finished — until a handful of stubborn experiments refused to fit: hot objects glowed with the wrong colors, light ejected electrons by rules no wave could explain, atoms emitted light in discrete lines, and matter itself turned out to have wavelengths. Each anomaly forced a concession: energy comes in packets, light comes in particles, electrons come in standing waves, and mass is congealed energy. This section tells that story as one narrative — the birth of the quantum world and the nuclear accounting that runs the stars.",
        sections: [
          {
            heading: "1. The Ultraviolet Catastrophe — Where the Old Physics Died",
            content: "Classical theory predicted that a hot object (a 'blackbody') should radiate infinite energy at short wavelengths — the ultraviolet catastrophe. Every oven, every star, should blast lethal UV. Obviously false, and obviously a sign the theory was broken at a deep level. In 1900 Max Planck fixed the math by a desperate assumption he himself called an 'act of despair': the oscillators in the walls can only exchange energy in discrete packets, E = hν, with h a tiny new constant of nature. The prediction then matched experiment PERFECTLY at every wavelength. Planck spent years trying to retract the quantization as a mathematical trick — he couldn't, because it was real. This is the pattern of every scientific revolution: an anomaly no one expected, a fix that seems absurd, and a new constant that rewrites the rules. The lesson of h: the universe is granular at the bottom, and the grain size is 6.6×10⁻³⁴ J·s — so small that daily life looks continuous, the way a beach looks smooth from an airplane.",
            formula: "E = nh\\nu \\;\\text{(energy exchanged only in packets)}, \\qquad h = 6.626\\times10^{-34}\\ \\text{J·s}",
            keyPoints: [
              "Classical physics predicted infinite UV radiation from hot bodies — observation said no",
              "Planck's quantum was a mathematical 'desperation' that turned out to be the texture of reality",
              "h is the grain size of the universe; its smallness is why the world looks continuous",
            ],
          },
          {
            heading: "2. The Photoelectric Effect — Light Behaves Like Bullets",
            content: "Shine light on metal and electrons can be knocked out. The wave picture predicts the wrong things in every particular: brighter light should eject faster electrons (it doesn't — brightness changes only the COUNT), dim light should take time to accumulate energy (electrons emerge instantly), and any frequency should work given enough intensity (below a threshold frequency, NOTHING is emitted, ever). Einstein took Planck's packets literally in 1905: light itself arrives in quanta of energy hν, and ONE photon liberates ONE electron in a single all-or-nothing collision. The accounting is a straight line: KE_max = hν − φ, where φ (work function) is the electron's escape tax. This is why Einstein's Nobel citation names the photoelectric effect, not relativity — it was the decisive proof that quantization was physical. And it is not museum history: photomultiplier tubes detecting single photons, CCD and CMOS sensors in every camera phone (each pixel counts photons), solar panels, night vision, and photodiode light switches all run on photons paying the work-function toll.",
            formula: "K_{\\max} = h\\nu - \\phi, \\qquad \\nu_0 = \\frac{\\phi}{h} \\;\\text{(threshold)}, \\qquad \\text{intensity} = \\text{photon count, } \\nu = \\text{photon energy}",
            example: "Sodium's work function is 2.3 eV, so its threshold wavelength is λ₀ = hc/φ ≈ 540 nm — green light. Sodium responds to blue and UV but is blind to red, no matter how bright. The metal itself has a colour cutoff built into its atomic structure.",
            keyPoints: [
              "One photon, one electron, all-or-nothing — intensity is quantity, frequency is quality",
              "The three classical predictions fail in three different ways; one quantum rule explains all",
              "Your camera sensor is a photoelectric device counting photons pixel by pixel",
            ],
          },
          {
            heading: "3. Bohr and the Atomic Fingerprint — Why Atoms Are Stable at All",
            content: "Classical physics could not explain why atoms exist. An orbiting electron is accelerating, and accelerating charges radiate — so a classical atom should collapse in about a nanosecond, radiating a continuous smear of light as it spirals in. Instead atoms are eternal and emit only SHARP spectral lines — each element a unique barcode (sodium's yellow doublet at 589 nm is why street lamps are orange; helium was discovered in the Sun's spectrum before anyone found it on Earth). Bohr's 1913 fix imposed quantized orbits: electrons may only occupy levels with angular momentum in units of ħ, with energies E_n = −13.6/n² eV for hydrogen. Light is emitted or absorbed ONLY when an electron jumps between levels, the photon carrying exactly the energy difference — hence sharp lines, hence barcodes. Bohr's model was half-right and knew it; the full answer came with de Broglie and Schrödinger: the allowed orbits are exactly those where the electron's matter wave closes on itself constructively — a standing wave wrapped around the nucleus, like a guitar string's harmonics. Atoms are stable for the same reason a guitar string only sings certain notes. The 'orbits' became orbitals: probability clouds, not paths — the electron has no trajectory, only a distribution.",
            formula: "E_n = -\\frac{13.6}{n^2}\\ \\text{eV}, \\qquad h\\nu = E_i - E_f, \\qquad L = n\\hbar \\;\\text{(standing-wave condition)}",
            example: "The Balmer series — hydrogen's visible lines — are all jumps DOWN to n=2: red 656 nm (3→2), cyan 486 nm (4→2), blue-violet 434 nm (5→2). Astronomers read these barcodes in starlight to determine what stars are made of, billions of light-years away, without visiting.",
            keyPoints: [
              "Classical atoms collapse in a nanosecond; quantized standing waves are why matter is permanent",
              "Spectral lines = energy differences between levels; each element has a unique barcode",
              "Bohr's orbits became orbitals — probability distributions, not planetary paths",
            ],
          },
          {
            heading: "4. de Broglie — Matter Waves and the Double Slit",
            content: "If light waves behave as particles, de Broglie argued in 1924, then particles should behave as waves: every object with momentum p carries a wavelength λ = h/p. The symmetry was radical — and testable. Electrons (massive, definitely particles) were diffracted by crystals in 1927, exactly as waves should be. The scale saves our sanity: a cricket ball at 30 m/s has λ ≈ 10⁻³⁴ m, billions of times smaller than an atom — undetectable, so balls do not diffract around corners. But an electron accelerated through 100 V has λ ≈ 0.12 nm — atom-spaced — which is why ELECTRON MICROSCOPES see atoms: their 'light' has wavelengths thousands of times finer than visible light. Then the experiment that defines quantum strangeness: fire electrons one at a time through a double slit. Each arrives as a single localized dot (particle!). But after thousands, the dots accumulate into an interference pattern (wave!). Each electron somehow passes through both slits as a probability wave and interferes with itself; watch which slit it takes, and the pattern vanishes. Matter is described by a wavefunction whose square is the probability of finding the particle — the deepest statement modern physics has managed, and still the subject of interpretive argument nearly a century later.",
            formula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}, \\qquad \\lambda_{\\text{electron}} \\approx \\frac{1.23}{\\sqrt{V}}\\ \\text{nm} \\;(V \\text{ in volts})",
            keyPoints: [
              "Everything has a wavelength h/p; it only shows when the wavelength matches the structure (atoms, slits)",
              "Electron microscopes exploit matter waves to image below light's resolution limit",
              "Single electrons build an interference pattern dot by dot — each interferes with itself",
            ],
          },
          {
            heading: "5. The Nuclear Ledger — E = mc² as an Accounting Rule",
            content: "Weigh any nucleus and it is LIGHTER than its separated protons and neutrons. The missing mass (mass defect) is the binding energy that holds the nucleus together, cashed out by E = mc² — mass is not lost but CONVERTED, and the conversion rate is staggering: one gram of mass equals 90 terajoules, the energy of ~20 kilotons of TNT. The binding energy per nucleon curve explains the whole nuclear landscape: it rises steeply for light nuclei, peaks at iron-56 (~8.8 MeV/nucleon), and declines gently for heavy ones. Iron is the ash of the nuclear fire — everything lighter WANTS to fuse (climbing the curve toward iron releases energy: this powers the Sun, where hydrogen fuses to helium at 15 million K, and hydrogen bombs), and everything heavier wants to SPLIT (descending toward iron releases energy: uranium fission, nuclear reactors). Stars are fusion reactors that live and die by this curve; elements heavier than iron exist only because supernovae and neutron-star collisions paid the energy bill to build them — your body contains atoms forged in stellar explosions. Radioactive decay runs on a different rule: the half-life is a purely STATISTICAL clock — no nucleus ages, each has a fixed probability per second, so large populations decay exponentially with eerie precision. That predictability makes decay a calendar: carbon-14 (5730 y) dates archaeology, uranium-lead (billions of y) dates the Earth itself.",
            formula: "E = \\Delta m\\,c^2, \\qquad N = N_0 e^{-\\lambda t}, \\qquad T_{1/2} = \\frac{\\ln 2}{\\lambda}, \\qquad \\text{BE/nucleon peaks at } {}^{56}\\text{Fe}",
            example: "Solar fusion accounting: the Sun converts ~4 million TONNES of mass to energy every second (0.7% of the fused hydrogen's mass), yet has burned for 4.6 billion years and has fuel for 5 billion more — the mass-energy exchange rate is so favourable that a star is a candle that barely consumes its wick.",
            keyPoints: [
              "Mass defect = binding energy; E = mc² is an exchange rate, not magic",
              "Iron-56 is the curve's peak: fusion pays below it, fission pays above it — stars and reactors both slide toward iron",
              "Half-life is memoryless statistics — perfect for dating everything from mummies to the Earth",
            ],
          },
          {
            heading: "6. The Uncertainty Principle and Tunnelling — Rules That Run the Sun",
            content: "Heisenberg's principle is usually misstated as 'measurement disturbs the particle.' The truth is deeper: a quantum object simply does not HAVE a precise position and momentum simultaneously — Δx·Δp ≥ ħ/2 is a property of waves, not of clumsy instruments. (A pure wavelength extends forever; a localized wave packet must mix wavelengths — the same mathematics that makes a musical note's pitch fuzzy if the note is very short.) Its consequences are structural: electrons cannot sit in the nucleus (localizing that tightly would demand enormous momentum), atoms have a minimum size, and matter is stable — the uncertainty principle is literally why you have volume. Quantum tunnelling is its practical sibling: a particle's wavefunction does not stop dead at an energy barrier but leaks through, giving a small probability of appearing on the far side. Without tunnelling the Sun would not shine — protons at 15 million K have only a fraction of the energy needed to overcome their electric repulsion; they fuse because they TUNNEL through the barrier. Tunnelling is also engineering: flash memory and SSDs store your data as electrons trapped in wells they classically cannot leave (but quantum-mechanically can, on command), scanning tunnelling microscopes image individual atoms by tunnelling current, and alpha decay (radium, uranium) is tunnelling from inside the nucleus — the same mathematics that lights the Sun also dates rocks and stores your photos.",
            formula: "\\Delta x\\,\\Delta p \\geq \\frac{\\hbar}{2}, \\qquad \\Delta E\\,\\Delta t \\geq \\frac{\\hbar}{2}, \\qquad P_{\\text{tunnel}} \\sim e^{-2\\kappa L} \\;(\\text{exponentially sensitive to barrier width})",
            keyPoints: [
              "Uncertainty is a property of waves, not of measurement error — particles do not possess exact x and p together",
              "The principle gives atoms their size: without it, all matter would collapse",
              "Tunnelling powers the Sun, alpha decay, SSDs and atomic-resolution microscopes — one effect, four roles",
            ],
          },
        ],
        keyPoints: [
          "Quantization began as Planck's fix for blackbody radiation — h is the universe's grain size",
          "Photoelectric effect: one photon, one electron; frequency is quality, intensity is quantity",
          "Atoms are stable because electron waves form standing patterns; spectra are elemental barcodes",
          "All matter has wavelength h/p — electron microscopes and the double slit prove it",
          "E = mc² runs the nuclear ledger; iron is the peak — fusion below, fission above",
          "Uncertainty gives atoms size; tunnelling lights the Sun and stores your data",
        ],
        commonMistakes: [
          "Believing brighter light ejects faster photoelectrons — brightness is photon count; energy per electron is set by frequency",
          "Describing Bohr orbits as planetary paths — the modern picture is orbitals, probability clouds",
          "Saying the uncertainty principle is about measurement disturbance — it is about waves not having simultaneous exact position and wavelength",
          "Assuming fusion can power anything lighter than anything — energy release requires moving TOWARD iron on the binding curve",
          "Thinking half-life means a nucleus 'ages' or weakens — decay probability per second is constant and memoryless",
        ],
        practiceQuestions: [
          "Sodium's work function is 2.3 eV: find its threshold wavelength and explain why sodium-based sensors are blind to red light no matter how intense.",
          "Compute the wavelengths of hydrogen's 3→2 and 2→1 transitions; identify their colours/bands and explain why the n→2 series is the visible one.",
          "An electron and a proton have the same kinetic energy. Which has the larger de Broglie wavelength? Derive the ratio λ_e/λ_p and connect it to why electron microscopes (not proton microscopes) are practical.",
          "In the single-electron double-slit experiment, state precisely what is wave-like and what is particle-like. Predict the pattern if a detector records which slit each electron uses.",
          "For the fusion 4¹H → ⁴He, compute the mass defect and energy released; then find what fraction of the Sun's 4×10⁹ kg/s mass loss this represents per reaction chain.",
          "A sample shows 12.5% of its original activity. How many half-lives have passed? If it is carbon-14, how old is the sample, and what is the practical upper dating limit of ¹⁴C and why?",
          "Estimate, with the Δx·Δp relation, the kinetic energy an electron confined to a nucleus (Δx ≈ 10⁻¹⁴ m) would have — and use the answer to argue why electrons cannot live in nuclei.",
        ],
      },
    },
  },

  chemistry: {
    atomic: {
      title: "Atomic Structure",
      overview: "Atomic structure describes the arrangement of electrons in atoms using quantum numbers. The quantum mechanical model uses orbitals (probability clouds) instead of fixed orbits.",
      sections: [
        {
          heading: "1. Quantum Numbers",
          content: "Four quantum numbers describe each electron: n (principal, shell), l (azimuthal, subshell: 0=s, 1=p, 2=d, 3=f), m_l (magnetic, orbital orientation), m_s (spin, +½ or -½).",
          formula: "\\begin{aligned} n &\\rightarrow \\text{shell (1, 2, 3, ...)} \\\\ l &\\rightarrow \\text{subshell: } 0\\text{(s)},\\; 1\\text{(p)},\\; 2\\text{(d)},\\; 3\\text{(f)} \\\\ m_l &\\rightarrow -l,\\;\\ldots,\\; +l \\\\ m_s &\\rightarrow +\\tfrac{1}{2}\\text{ or } -\\tfrac{1}{2} \\end{aligned}",
        },
        {
          heading: "2. Aufbau Principle",
          content: "Electrons fill orbitals in order of increasing energy: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → ...",
          formula: "1s \\lt 2s \\lt 2p \\lt 3s \\lt 3p \\lt 4s \\lt 3d \\lt 4p \\lt 5s \\lt 4d \\lt 5p \\lt 6s \\lt 4f \\lt \\cdots",
        },
        {
          heading: "3. Pauli Exclusion Principle",
          content: "No two electrons can have the same four quantum numbers. Each orbital holds max 2 electrons with opposite spins.",
          formula: "Each orbital: max 2 electrons with opposite spins (m_s = +½, -½)",
        },
        {
          heading: "4. Hund's Rule",
          content: "For degenerate orbitals (same energy), electrons fill singly first with parallel spins before pairing up.",
          formula: "\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,} \\quad (3\\text{ unpaired in } p^3)",
        },
        {
          heading: "5. Exceptions to Aufbau",
          content: "Cr (Z=24) is [Ar]4s¹3d⁵ and Cu (Z=29) is [Ar]4s¹3d¹⁰ for extra stability of half-filled and fully-filled d subshells.",
          formula: "\\text{Cr: } [Ar]\\,4s^1\\,3d^5 \\quad (\\text{not } 4s^2\\,3d^4)",
        },
      ],
      keyPoints: [
        "Maximum electrons in shell n = 2n²",
        "Half-filled and fully-filled subshells are extra stable",
        "s subshell: 1 orbital; p: 3; d: 5; f: 7",
      ],
      commonMistakes: [
        "Writing 4s²3d⁴ for Cr (should be 4s¹3d⁵)",
        "Forgetting 4s fills before 3d but 3d is written first",
        "Assigning l = 2 to a p orbital",
      ],
      practiceQuestions: [
        "Write electron configuration for: (a) O (Z=8), (b) Ca (Z=20), (c) Fe³⁺ (Z=26), (d) Cu (Z=29).",
        "What are the four quantum numbers for the last electron in chlorine (Z = 17)?",
        "How many electrons can have n = 3? How many can have n = 3, l = 2?",
        "Explain why Cr has [Ar]4s¹3d⁵ instead of [Ar]4s²3d⁴.",
        "Which element has [Ar]4s²3d¹⁰4p³? What is its group and period?",
      ],
      enrichedContent: {
        title: "Atomic Structure: The Atom Is Not a Mini Solar System",
        overview:
          "The biggest obstacle to understanding atoms is the picture everyone learns first — electrons orbiting a nucleus like planets around the Sun. That model is wrong, and unlearning it is the real lesson. Electrons are not particles tracing paths; they are standing waves of probability described by quantum numbers, and the periodic table is simply a map of how those waves stack up. Once you see electron configuration as the filling of three-dimensional probability shapes governed by a few rules, the entire structure of the periodic table — periods, groups, and chemical behaviour — falls out logically instead of being memorised.",
        sections: [
          {
            heading: "1. Electrons Are Standing Waves, Not Orbiting Particles",
            content:
              "An electron bound to a nucleus behaves like a wave that must fit around the nucleus without cancelling itself — a standing wave, like the vibration of a guitar string. Only certain wave patterns are stable, which is why only certain energies are allowed. This quantisation is not an arbitrary rule imposed on the atom; it is a natural consequence of wave behaviour in a confined space. The 'orbital' is therefore not a track but a region of space where the electron's wave has large amplitude — a probability cloud. The famous shapes (spherical s, dumbbell p, cloverleaf d) are literally the three-dimensional shapes of these standing waves.",
            formula:
              "\\text{Electron} = \\text{standing wave} \\Rightarrow \\text{only certain energies allowed} \\Rightarrow \\text{orbitals}",
          },
          {
            heading: "2. Four Quantum Numbers: The Electron's Address",
            content:
              "Each electron's wave is fully specified by four numbers, and together they act like an address. The principal quantum number n sets the shell — roughly the size and energy. The azimuthal number l sets the subshell shape (0 = s spherical, 1 = p dumbbell, 2 = d cloverleaf, 3 = f complex). The magnetic number m_l sets the orientation of that shape in space (a p subshell has three orientations, so three orbitals). The spin m_s is an intrinsic two-valued property (+½ or −½). The Pauli exclusion principle — no two electrons share all four numbers — is the rule that forces electrons to stack into higher shells instead of all collapsing into the lowest, and it is the reason matter has volume and chemistry has variety.",
            formula:
              "n\\ (\\text{shell}) \\rightarrow l\\ (\\text{shape}) \\rightarrow m_l\\ (\\text{orientation}) \\rightarrow m_s\\ (\\text{spin})",
          },
          {
            heading: "3. The Periodic Table Is an Aufbau Diagram",
            content:
              "The periodic table is not an arbitrary grid; it is a picture of the order in which electron waves fill. Each period adds a new shell, each block (s, p, d, f) corresponds to a subshell being filled, and each group shares an outer-electron configuration — which is why elements in a group behave alike. The filling order (1s, 2s, 2p, 3s, 3p, 4s, 3d...) looks irregular only until you realise it follows increasing energy, and the 4s-before-3d quirk is a consequence of how nuclear charge and shielding shift the energy levels. Reading the table as a filling sequence turns 'memorise the configuration' into 'walk across the table and count electrons'.",
            formula:
              "\\text{Period} = \\text{new shell}; \\quad \\text{Block} = \\text{subshell}; \\quad \\text{Group} = \\text{same outer config}",
          },
          {
            heading: "4. Why Half-Filled and Full Subshells Are Special",
            content:
              "The famous exceptions — chromium is [Ar]4s¹3d⁵ not 4s²3d⁴, copper is [Ar]4s¹3d¹⁰ not 4s²3d⁹ — are not random glitches. A half-filled (d⁵) or completely filled (d¹⁰) subshell is unusually stable because it maximises symmetry and exchange energy: electrons with parallel spins in separate orbitals keep further apart on average, lowering their mutual repulsion. When promoting one electron from 4s to 3d achieves this symmetric arrangement, the stability gained outweighs the small cost, so the atom adopts it. The lesson is that electron configurations are the result of an energy balance, not a rigid filling rule — the rules are tendencies, and nature optimises.",
            formula:
              "Cr:\\ [Ar]\\,4s^1\\,3d^5 \\quad (\\text{half-filled } d^5 \\text{ stability}), \\qquad Cu:\\ [Ar]\\,4s^1\\,3d^{10} \\quad (\\text{full } d^{10})",
          },
          {
            heading: "5. Shielding and the Periodic Trends That Follow",
            content:
              "Inner electrons screen the nucleus, so outer electrons feel less than the full nuclear pull — this is effective nuclear charge (Z_eff = Z − shielding). Almost every periodic trend is a consequence of the tug-of-war between rising nuclear charge and this shielding. Across a period, Z_eff increases while the shell stays the same, so atoms shrink, hold electrons more tightly (higher ionisation energy), and attract bonding electrons harder (higher electronegativity). Down a group, new shells are added, outer electrons are further away and more shielded, so atoms grow and hold electrons more loosely. Configuration is therefore not an end in itself — it predicts size, reactivity, and bonding.",
            formula:
              "Z_{\\text{eff}} = Z - S \\quad (S = \\text{shielding}) \\Rightarrow \\text{trends in radius, IE, electronegativity}",
          },
          {
            heading: "6. From Orbits to Orbitals: The Model That Replaced Bohr",
            content:
              "Bohr's model — electrons in fixed circular orbits — correctly explained hydrogen's line spectrum but failed for every larger atom, and it still pictures electrons as little planets. Quantum mechanics replaced orbits with orbitals: solutions to a wave equation that give probability distributions, not paths. The Heisenberg uncertainty principle makes the planetary picture impossible in principle — you cannot know an electron's exact position and momentum at once, so there is no well-defined orbit to speak of. What remains is the electron cloud, the quantised energies that produce spectral lines, and the four quantum numbers. Understanding this shift is what separates memorising configurations from actually understanding atoms.",
            formula:
              "\\Delta x\\,\\Delta p \\geq \\frac{\\hbar}{2} \\quad \\Rightarrow \\quad \\text{no definite orbits, only probability clouds}",
          },
        ],
        keyPoints: [
          "Electrons are standing probability waves (orbitals), not particles in fixed orbits — Bohr's model is wrong",
          "Four quantum numbers specify each electron's shell, shape, orientation, and spin; Pauli forces them to stack up",
          "The periodic table is literally a map of the orbital-filling (Aufbau) order — groups share outer configurations",
          "Half-filled and full subshells (Cr, Cu exceptions) are stabilised by symmetry and exchange energy",
          "Effective nuclear charge and shielding explain every periodic trend in radius, ionisation energy, and electronegativity",
        ],
        commonMistakes: [
          "Imagining electrons orbiting like planets; orbitals are probability clouds from standing waves",
          "Treating Aufbau as an inflexible rule and being confused by Cr and Cu — these follow an energy balance",
          "Confusing filling order (4s before 3d) with writing order (3d written before 4s)",
          "Memorising configurations without connecting them to periodic trends and reactivity",
          "Assigning the wrong l value to a subshell shape (l = 1 is p, not 2)",
        ],
        practiceQuestions: [
          "Explain why the quantum model uses orbitals (probability clouds) rather than Bohr's fixed orbits.",
          "Show how the structure of the periodic table reflects the order in which subshells fill.",
          "Why does chromium adopt [Ar]4s¹3d⁵ instead of [Ar]4s²3d⁴? What stability is gained?",
          "Using effective nuclear charge and shielding, explain why atomic radius decreases across a period but increases down a group.",
          "Give the four quantum numbers for the outermost electron of nitrogen (Z = 7).",
          "Why does the Heisenberg uncertainty principle make the idea of a defined electron orbit impossible?",
          "Predict which of Na, Mg, or Al has the highest first ionisation energy, and justify using configuration.",
        ],
      },
    },
    bonding: {
      title: "Chemical Bonding and Molecular Structure",
      overview: "Chemical bonds hold atoms together. Ionic bonds form by electron transfer; covalent bonds by electron sharing. VSEPR theory and hybridization explain molecular geometries.",
      sections: [
        {
          heading: "1. Ionic Bonding",
          content: "Ionic bonds form by complete electron transfer from metal to non-metal, creating ions that attract electrostatically. Ionic compounds have high melting points and conduct when molten or dissolved.",
          formula: "\\text{Na} \\rightarrow \\text{Na}^+ + e^- \\qquad \\text{Cl} + e^- \\rightarrow \\text{Cl}^- \\qquad \\text{Na}^+ + \\text{Cl}^- \\rightarrow \\text{NaCl}",
        },
        {
          heading: "2. Covalent Bonding",
          content: "Covalent bonds form by sharing electron pairs. Single bond = 1σ; double bond = 1σ+1π; triple bond = 1σ+2π. σ bonds allow rotation; π bonds restrict rotation.",
          formula: "\\text{H}\\cdot \\; + \\; \\cdot\\text{H} \\rightarrow \\text{H:H} \\quad (\\sigma\\text{ bond})",
        },
        {
          heading: "3. VSEPR Theory",
          content: "Electron pairs around a central atom arrange to minimize repulsion. Order: LP-LP > LP-BP > BP-BP. Steric number determines geometry.",
          formula: "\\begin{aligned} \\text{SN=2:} &\\quad \\text{linear, } 180° \\\\ \\text{SN=3:} &\\quad \\text{trigonal planar, } 120° \\\\ \\text{SN=4:} &\\quad \\text{tetrahedral, } 109.5° \\end{aligned}",
          example: "Example: Predict geometry of CH₄, NH₃, H₂O.\nCH₄: SN=4 (4 BP, 0 LP) → tetrahedral, 109.5°\nNH₃: SN=4 (3 BP, 1 LP) → trigonal pyramidal, 107°\nH₂O: SN=4 (2 BP, 2 LP) → bent, 104.5°",
        },
        {
          heading: "4. Hybridization",
          content: "Hybridization mixes atomic orbitals: sp³ (tetrahedral, 4 hybrids), sp² (trigonal planar, 3 hybrids), sp (linear, 2 hybrids).",
          formula: "\\begin{aligned} sp^3 &: 4\\text{ hybrids, tetrahedral} \\\\ sp^2 &: 3\\text{ hybrids, trigonal planar} \\\\ sp &: 2\\text{ hybrids, linear} \\end{aligned}",
        },
      ],
      keyPoints: [
        "Lone pairs compress bond angles more than bonding pairs",
        "sp³ = 4 hybrids; sp² = 3; sp = 2",
        "Resonance structures are not real — actual molecule is a hybrid",
      ],
      commonMistakes: [
        "Predicting tetrahedral for NH₃ (it's trigonal pyramidal)",
        "Confusing electron geometry with molecular geometry",
        "Thinking double bonds are twice as strong as single bonds",
      ],
      practiceQuestions: [
        "Predict geometry of: (a) BeCl₂, (b) BF₃, (c) CH₄, (d) SF₄, (e) XeF₄.",
        "What is the hybridization of central atom in: (a) NH₃, (b) C₂H₄, (c) C₂H₂?",
        "Draw resonance structures for O₃ and CO₃²⁻.",
        "Arrange in order of increasing bond length: C₂H₆, C₂H₄, C₂H₂.",
        "Explain why BF₃ is nonpolar but NF₃ is polar.",
      ],
      enrichedContent: {
        title: "Bonding: Why Atoms Share, Steal, and Arrange",
        overview:
          "Bonding is driven by one principle: atoms arrange their electrons to reach a lower-energy, more stable state, and almost always this means achieving a full outer shell of eight electrons (the octet). Whether an atom transfers electrons (ionic), shares them (covalent), or pools them (metallic) depends entirely on how strongly the partners hold onto electrons — their electronegativity difference. But bonding does not stop at the pair of atoms; the three-dimensional shape of a molecule, dictated by electron-pair repulsion, determines whether it is polar, how it reacts, and even whether life's molecules fit together. Shape is function.",
        sections: [
          {
            heading: "1. Bonding Is One Spectrum, Not Separate Types",
            content:
              "Ionic and covalent bonds are taught as opposites, but they are really two ends of a continuum governed by electronegativity difference. When two atoms are identical (ΔEN = 0), electrons are shared perfectly equally — a pure covalent bond. As the difference grows, sharing becomes unequal — a polar covalent bond, with a partial positive and partial negative end. When the difference is very large (>~1.7), the electron is essentially transferred — an ionic bond. So 'ionic vs covalent' is not a switch but a dial. This continuum explains why there is no sharp boundary and why many real bonds are partly ionic and partly covalent.",
            formula:
              "\\Delta EN \\approx 0:\\ \\text{nonpolar covalent} \\;\\rightarrow\\; \\text{polar covalent} \\;\\rightarrow\\; \\Delta EN > 1.7:\\ \\text{ionic}",
          },
          {
            heading: "2. The Octet Rule and Its Deep Reason",
            content:
              "Atoms bond to reach a stable eight-electron outer shell, mirroring the unreactive noble gases. But why eight? Because a filled s and p subshell (s²p⁶) is a particularly low-energy, symmetric, hard-to-disturb configuration. Atoms that are one or two electrons short of an octet (like Cl or O) grab or share eagerly; those with one or two to spare (like Na or Mg) give them away readily. The octet rule is a shortcut for 'reach a full outer subshell', and its exceptions (expanded octets in period 3+ using d orbitals, or electron-deficient species like BF₃) occur where that underlying logic changes.",
            formula:
              "s^2 p^6 = \\text{full outer shell} = \\text{noble-gas stability} = \\text{octet}",
          },
          {
            heading: "3. VSEPR: Shape Comes From Repulsion",
            content:
              "Once atoms are bonded, the molecule adopts a shape that minimises the repulsion between electron pairs around the central atom — this is VSEPR (Valence Shell Electron Pair Repulsion). Electron pairs, being negatively charged, push as far apart as possible: two pairs go linear (180°), three go trigonal planar (120°), four go tetrahedral (109.5°). Crucially, lone pairs repel more strongly than bonding pairs because they are held closer to the nucleus and occupy more space, squeezing the bond angles down — which is why water (two lone pairs) is bent at 104.5° rather than tetrahedral. Shape is not decorative; it determines polarity and how molecules interact.",
            formula:
              "\\text{Repulsion: } LP\\text{-}LP > LP\\text{-}BP > BP\\text{-}BP \\quad \\Rightarrow \\quad \\text{lone pairs compress angles}",
            example:
              "CH₄ (4 BP) → tetrahedral 109.5°; NH₃ (3 BP, 1 LP) → trigonal pyramidal 107°; H₂O (2 BP, 2 LP) → bent 104.5°. Same electron geometry, different molecular shape.",
          },
          {
            heading: "4. Polarity: Why Shape Determines Everything",
            content:
              "A molecule is polar if its bond dipoles do not cancel. This is where shape becomes decisive. CO₂ has two polar C=O bonds, but because they point in exactly opposite directions (linear), the dipoles cancel and the molecule is non-polar. Water has two polar O–H bonds bent at an angle, so the dipoles do not cancel and water is strongly polar. This single difference explains why water is a superb solvent for salts and sugars while CO₂ is not, and why oil and water separate. Polarity governs solubility, boiling point, and the three-dimensional folding of proteins and DNA — life depends on molecules being polar in the right places.",
            formula:
              "\\text{Symmetric shape} \\Rightarrow \\text{dipoles cancel (nonpolar)}; \\quad \\text{asymmetric} \\Rightarrow \\text{net dipole (polar)}",
          },
          {
            heading: "5. σ and π Bonds: Why Double Bonds Are Rigid",
            content:
              "A single covalent bond is a sigma (σ) bond, formed by head-on overlap of orbitals along the bond axis; it is cylindrically symmetric, so the two atoms can rotate freely around it. A double bond adds a pi (π) bond, formed by side-on overlap of parallel p orbitals above and below the axis. This side-on overlap breaks if you twist the atoms, so π bonds lock the molecule into a rigid plane and prevent rotation. That rigidity is the origin of cis-trans (geometric) isomerism — the reason a molecule can exist in two distinct forms that cannot interconvert without breaking a bond. π bonds are also weaker and more exposed, which is why double bonds are the reactive sites in organic chemistry.",
            formula:
              "\\text{Single} = 1\\sigma; \\quad \\text{Double} = 1\\sigma + 1\\pi; \\quad \\text{Triple} = 1\\sigma + 2\\pi",
          },
          {
            heading: "6. Resonance and Hybridisation: Models, Not Reality",
            content:
              "Two ideas often confuse students because they are models, not physical things. Resonance occurs when a single Lewis structure cannot represent a molecule — like ozone or benzene, where the true electron distribution is a blend (hybrid) of several contributing structures. The molecule does not flip between them; it exists permanently in the averaged, lower-energy state, with bonds of intermediate length. Hybridisation is a bookkeeping trick: to explain observed shapes, we mathematically mix atomic s and p orbitals into new equivalent hybrids (sp³, sp², sp) that point in the right directions. Neither resonance structures nor hybrid orbitals are literally 'real' — they are powerful fictions that correctly predict what we measure.",
            formula:
              "\\text{Resonance hybrid} = \\text{average of structures (not flipping)}; \\quad sp^3/sp^2/sp = \\text{mixed orbitals}",
          },
        ],
        keyPoints: [
          "Ionic and covalent are ends of one electronegativity continuum, not separate categories",
          "Atoms bond to reach a low-energy full outer shell (octet = s²p⁶, noble-gas configuration)",
          "VSEPR: electron pairs repel into maximum separation; lone pairs squeeze bond angles",
          "Molecular polarity depends on shape — symmetric shapes cancel dipoles, asymmetric shapes do not",
          "π bonds lock geometry (cis-trans isomerism); resonance and hybridisation are predictive models, not literal structures",
        ],
        commonMistakes: [
          "Treating ionic vs covalent as a binary switch rather than a continuum of electron sharing",
          "Predicting molecular shape from electron geometry without accounting for lone pairs (NH₃ is pyramidal, not tetrahedral)",
          "Assuming polar bonds always make a polar molecule — symmetry can cancel them (CO₂)",
          "Thinking resonance structures are real forms the molecule alternates between",
          "Believing a double bond is exactly twice as strong or as long-related as a single bond",
        ],
        practiceQuestions: [
          "Explain why the electronegativity difference places ionic and covalent bonding on a single continuum.",
          "Predict the shape and bond angle of NH₃ and explain why it differs from the tetrahedral angle.",
          "CO₂ and H₂O both contain polar bonds. Why is one non-polar and the other polar?",
          "Why does a carbon-carbon double bond prevent free rotation while a single bond allows it?",
          "Describe what a resonance hybrid actually is, using ozone or benzene as an example.",
          "Explain how molecular shape and polarity account for why water dissolves salt but oil does not.",
          "Determine the hybridisation of the central atom in BF₃ and predict its geometry.",
        ],
      },
    },
    equilibrium: {
      title: "Chemical Equilibrium",
      overview: "At equilibrium, forward and reverse rates are equal. The equilibrium constant K quantifies the position. Le Chatelier's principle predicts shifts when conditions change.",
      sections: [
        {
          heading: "1. Equilibrium Constant",
          content: "For aA + bB ⇌ cC + dD: Kc = [C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ). K > 1 favors products; K < 1 favors reactants. Pure solids and liquids are excluded.",
          formula: "K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}, \\qquad K_p = K_c(RT)^{\\Delta n}",
        },
        {
          heading: "2. Le Chatelier's Principle",
          content: "System opposes imposed changes. Increase T → shifts endothermic direction. Increase P → shifts toward fewer gas moles. Catalyst does not shift equilibrium.",
          formula: "\\begin{aligned} \\text{Increase } T &: \\text{shifts in endothermic direction} \\\\ \\text{Increase } P &: \\text{shifts toward fewer gas moles} \\end{aligned}",
        },
        {
          heading: "3. pH and Buffers",
          content: "pH = -log[H⁺]. Henderson-Hasselbalch: pH = pK_a + log([A⁻]/[HA]). Buffers resist pH change when [A⁻] ≈ [HA].",
          formula: "\\text{pH} = -\\log[\\text{H}^+], \\qquad \\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}",
        },
      ],
      keyPoints: [
        "K depends only on temperature",
        "Q < K → shifts right; Q > K → shifts left",
        "Catalysts speed up both directions equally",
      ],
      commonMistakes: [
        "Including pure solids in K expressions",
        "Thinking catalysts shift equilibrium",
        "Forgetting to use Kelvin with Kp = Kc(RT)^Δn",
      ],
      practiceQuestions: [
        "For N₂ + 3H₂ ⇌ 2NH₃, Kc = 0.5. If [N₂]=0.1, [H₂]=0.3, [NH₃]=0.2, is system at equilibrium?",
        "Calculate pH of 0.1 M acetic acid (Ka = 1.8 × 10⁻⁵).",
        "For 2SO₂ + O₂ ⇌ 2SO₃, Kp = 40 at 1000 K. Find Kc.",
        "Solubility of AgCl is 1.3 × 10⁻⁵ M. Find K_sp.",
        "How does increasing pressure affect N₂O₄(g) ⇌ 2NO₂(g)?",
      ],
      enrichedContent: {
        title: "Equilibrium: The Dynamic Balance at the Heart of Chemistry",
        overview:
          "Chemical equilibrium looks like nothing is happening, but it is one of the most dynamic states in nature: the forward and reverse reactions continue at exactly equal rates, so concentrations stay constant while individual molecules react ceaselessly. The key insight is that a reaction does not simply 'go to completion' — it settles at a balance point described by a single number, K, that depends only on temperature. Equilibrium is not just an exam topic; it governs how much ammonia the world can make for fertiliser, how oxygen loads onto your haemoglobin, and how your blood resists pH change. Understanding the balance, and how to shift it deliberately, is the essence of controlling chemistry.",
        sections: [
          {
            heading: "1. Equilibrium Is Dynamic, Not Static",
            content:
              "At equilibrium the macroscopic picture is frozen — concentrations do not change — but the microscopic reality is a hive of activity. Reactants keep forming products and products keep reforming reactants, at precisely equal rates, so the net change is zero. This is a dynamic equilibrium, like a busy footbridge with equal numbers crossing each way: the crowd on each side stays constant while individuals keep moving. This is why equilibrium only makes sense for reversible reactions in a closed system, and why adding a catalyst does not shift the balance — it speeds up both directions equally, reaching the same point faster.",
            formula:
              "\\text{At equilibrium: } \\text{rate}_{\\text{forward}} = \\text{rate}_{\\text{reverse}} \\Rightarrow \\text{no net change}",
          },
          {
            heading: "2. K Is a Single Number That Encodes the Balance",
            content:
              "The equilibrium constant K is the ratio of product concentrations to reactant concentrations (each raised to its coefficient) at equilibrium. It is remarkably powerful: K depends only on temperature, not on starting amounts, pressure, or catalyst. Whether you begin with all reactants or all products, the system always settles to the same K. A large K (>1) means products dominate at equilibrium; a small K (<1) means reactants dominate. Pure solids and liquids are left out of the expression because their 'concentration' is fixed. K is a thermodynamic fingerprint of how far a reaction wants to go.",
            formula:
              "K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b} \\qquad (\\text{solids and pure liquids omitted})",
          },
          {
            heading: "3. Q vs K: The Reaction's Compass",
            content:
              "At any moment, you can compute the same ratio from the current concentrations — this is the reaction quotient Q. Comparing Q to K tells you which way the reaction will proceed. If Q < K, there are too few products, so the reaction shifts forward (right) to make more. If Q > K, there are too many products, so it shifts backward (left). If Q = K, the system is at equilibrium and does not shift. This Q-versus-K comparison is the quantitative engine behind Le Chatelier's principle — it lets you predict direction without intuition, and it is how you solve 'is this mixture at equilibrium?' problems.",
            formula:
              "Q < K \\rightarrow \\text{right}; \\quad Q > K \\rightarrow \\text{left}; \\quad Q = K \\rightarrow \\text{equilibrium}",
          },
          {
            heading: "4. Le Chatelier: The System Fights Back",
            content:
              "Le Chatelier's principle says that if you disturb an equilibrium, the system shifts to partly oppose the disturbance. Add more reactant — it shifts right to use some up. Increase pressure on a gas mixture — it shifts toward the side with fewer gas molecules to reduce the pressure. Increase temperature — it shifts in the endothermic direction, absorbing the added heat. A catalyst does not shift the position at all, only how fast it is reached. This is not mysticism; every shift is the system re-establishing the same K (except for temperature, which actually changes K). It is the practical toolkit for maximising yield in industry.",
            formula:
              "\\text{Disturb} \\Rightarrow \\text{shift to oppose}; \\quad \\text{only } T \\text{ changes } K \\text{ itself}",
          },
          {
            heading: "5. The Haber Process: Equilibrium as an Engineering Compromise",
            content:
              "The industrial synthesis of ammonia (N₂ + 3H₂ ⇌ 2NH₃) is the classic demonstration of equilibrium under real constraints, and it feeds half the world through fertiliser. The forward reaction is exothermic and reduces gas moles, so Le Chatelier says high pressure and low temperature maximise yield. But low temperature makes the reaction impractically slow. Industry therefore compromises: high pressure (~200 atm) to push the equilibrium right, a moderate temperature (~450 °C) that is a trade-off between yield and speed, an iron catalyst to speed up reaching equilibrium, and continuous removal of ammonia to keep pulling the reaction forward. It is equilibrium reasoning balanced against kinetics and economics.",
            formula:
              "N_2 + 3H_2 \\rightleftharpoons 2NH_3,\\ \\Delta H < 0 \\quad \\Rightarrow \\quad \\text{high } P,\\ \\text{moderate } T,\\ \\text{catalyst}",
          },
          {
            heading: "6. Buffers: Equilibrium Defending Your Blood",
            content:
              "A buffer uses equilibrium to resist pH change, and it is why your blood stays near pH 7.4 despite the acids your metabolism constantly produces. A buffer is a mixture of a weak acid and its conjugate base in balance. Add a little strong acid and the conjugate base mops up the extra H⁺; add a little base and the weak acid donates H⁺ to replace it. In both cases the equilibrium shifts to absorb the disturbance, so pH barely moves. The Henderson-Hasselbalch equation shows buffering is strongest when the acid and base are present in equal amounts (pH = pKa). The same principle governs ocean acidity and every biological pH-control system.",
            formula:
              "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[A^-]}{[HA]} \\quad \\Rightarrow \\quad \\text{strongest buffer when } [A^-] = [HA]",
          },
        ],
        keyPoints: [
          "Equilibrium is dynamic: forward and reverse rates are equal, so no net change despite constant reaction",
          "K depends only on temperature and encodes how far a reaction proceeds; solids and liquids are excluded",
          "Comparing Q to K predicts the direction of shift — the quantitative basis of Le Chatelier",
          "Le Chatelier: the system shifts to oppose a disturbance; only temperature changes K itself",
          "The Haber process and blood buffers are real applications of deliberately managing equilibrium",
        ],
        commonMistakes: [
          "Thinking reactions stop at equilibrium; they continue with equal forward and reverse rates",
          "Believing a catalyst shifts the equilibrium position; it only changes how fast equilibrium is reached",
          "Including pure solids or liquids in the K expression",
          "Assuming pressure changes shift every equilibrium; they only matter when gas moles differ between sides",
          "Forgetting that changing temperature changes the value of K, unlike other disturbances",
        ],
        practiceQuestions: [
          "Explain what 'dynamic equilibrium' means and why concentrations stay constant while reactions continue.",
          "For a reaction with Q > K, predict the direction of shift and explain using the reaction quotient.",
          "Use Le Chatelier's principle to explain how the Haber process maximises ammonia yield.",
          "Why does adding a catalyst not change the amount of product at equilibrium?",
          "Explain how a blood buffer resists pH change when acid is added, using the equilibrium shift.",
          "For N₂O₄(g) ⇌ 2NO₂(g), predict and justify the effect of increasing pressure and increasing temperature.",
          "Why is buffering capacity greatest when pH equals pKa?",
        ],
      },
    },
    thermo: {
      title: "Thermochemistry",
      overview: "Thermochemistry studies heat changes in reactions. Enthalpy (ΔH) measures heat at constant pressure. Gibbs free energy (ΔG) determines spontaneity.",
      sections: [
        {
          heading: "1. Enthalpy",
          content: "ΔH = H_products - H_reactants. Exothermic: ΔH < 0 (releases heat). Endothermic: ΔH > 0 (absorbs heat).",
          formula: "\\Delta H = H_{\\text{products}} - H_{\\text{reactants}}",
        },
        {
          heading: "2. Hess's Law",
          content: "Enthalpy is a state function. Total ΔH equals sum of ΔH for individual steps, regardless of path.",
          formula: "\\Delta H_{\\text{total}} = \\sum \\Delta H_{\\text{steps}}",
          example: "Example: Find ΔH for C + ½O₂ → CO given:\nC + O₂ → CO₂, ΔH = -393.5 kJ; CO + ½O₂ → CO₂, ΔH = -283.0 kJ\nReverse second and add: ΔH = -393.5 + 283.0 = -110.5 kJ",
        },
        {
          heading: "3. Gibbs Free Energy",
          content: "ΔG = ΔH - TΔS. Spontaneous when ΔG < 0. ΔG° = -RT ln K.",
          formula: "\\Delta G = \\Delta H - T\\Delta S, \\qquad \\Delta G^\\circ = -RT\\ln K",
        },
        {
          heading: "4. Entropy",
          content: "Entropy (S) measures disorder. ΔS_universe > 0 for spontaneous processes. Entropy increases with temperature, phase changes (solid→liquid→gas), and increasing gas moles.",
          formula: "\\Delta S_{\\text{universe}} = \\Delta S_{\\text{system}} + \\Delta S_{\\text{surroundings}} > 0",
        },
      ],
      keyPoints: [
        "Enthalpy is a state function — Hess's law applies",
        "ΔG < 0 → spontaneous; ΔG > 0 → non-spontaneous",
        "Entropy of universe always increases in spontaneous processes",
      ],
      commonMistakes: [
        "Forgetting to reverse sign of ΔH when reversing reactions",
        "Not converting Celsius to Kelvin in ΔG = ΔH - TΔS",
        "Assuming all exothermic reactions are spontaneous",
      ],
      practiceQuestions: [
        "Using ΔH_f° values, find ΔH for CH₃OH + ½O₂ → CO₂ + 2H₂O. (ΔH_f°: CH₃OH = -238.7, CO₂ = -393.5, H₂O = -285.8 kJ/mol)",
        "A reaction has ΔH = -100 kJ and ΔS = -200 J/K. At what temperature does it become non-spontaneous?",
        "Calculate ΔG° for K = 10³ at 298 K.",
        "Enthalpy of combustion of methane is -890 kJ/mol. How much heat from 8 g CH₄?",
        "Why is ice melting at 25°C spontaneous even though ΔH > 0?",
      ],
      enrichedContent: {
        title: "Thermochemistry: What Makes a Reaction Happen on Its Own",
        overview:
          "Thermochemistry answers a deceptively simple question: will a reaction happen by itself, and how much energy will it release or absorb? The naive answer — 'exothermic reactions are spontaneous' — is wrong, because ice melts spontaneously while absorbing heat. The true answer is Gibbs free energy, which balances two competing drives: the tendency to release energy (enthalpy) and the tendency to become more disordered (entropy). Understanding thermochemistry means seeing every process as a tug-of-war between wanting low energy and wanting high disorder, with temperature deciding which side wins. This single framework explains combustion, dissolving, melting, and why life needs a constant energy supply.",
        sections: [
          {
            heading: "1. Enthalpy: The Heat Ledger of a Reaction",
            content:
              "Enthalpy change ΔH measures the heat exchanged at constant pressure — essentially the difference in stored chemical energy between products and reactants. A negative ΔH (exothermic) means the products are lower in energy and the excess is released as heat, like combustion. A positive ΔH (endothermic) means energy was absorbed to make higher-energy products, like photosynthesis or melting ice. The crucial idea is that ΔH is a state function: it depends only on the start and end points, not the path taken. This is what makes Hess's law possible — you can add up known reactions to find the enthalpy of a reaction you cannot measure directly.",
            formula:
              "\\Delta H = H_{\\text{products}} - H_{\\text{reactants}} \\quad (<0\\ \\text{exothermic},\\ >0\\ \\text{endothermic})",
          },
          {
            heading: "2. Entropy: The Drive Toward Disorder",
            content:
              "Entropy S measures the number of ways energy and matter can be dispersed — loosely, disorder or randomness. The second law of thermodynamics says the total entropy of the universe always increases in a spontaneous process. This is not a mystical preference for mess; it is probability. Disordered arrangements are vastly more numerous than ordered ones, so systems naturally evolve toward them. Entropy rises when a solid melts, a liquid boils, a gas expands, or a reaction produces more gas molecules. The universe 'wants' disorder simply because disorder is overwhelmingly more likely — this is the deep reason processes have a direction and time has an arrow.",
            formula:
              "\\Delta S_{\\text{universe}} = \\Delta S_{\\text{system}} + \\Delta S_{\\text{surroundings}} > 0 \\quad (\\text{spontaneous})",
          },
          {
            heading: "3. Gibbs Free Energy: The Real Test of Spontaneity",
            content:
              "Gibbs free energy combines both drives into one number: ΔG = ΔH − TΔS. A reaction is spontaneous when ΔG < 0. The brilliance of this equation is that it explains the cases enthalpy alone cannot. Ice melting is endothermic (ΔH > 0, unfavourable) but increases entropy a lot (ΔS > 0, favourable); at room temperature the TΔS term outweighs ΔH, so ΔG < 0 and melting is spontaneous. The temperature T is the arbiter: it decides how much weight entropy gets. This is why some reactions are spontaneous only above or below a certain temperature — the point where ΔH and TΔS exactly balance and ΔG = 0.",
            formula:
              "\\Delta G = \\Delta H - T\\Delta S \\quad (\\Delta G < 0 \\Rightarrow \\text{spontaneous})",
            example:
              "For ΔH = −100 kJ, ΔS = −200 J/K: ΔG = 0 when T = ΔH/ΔS = 500 K. Below 500 K it is spontaneous (ΔG < 0); above, it is not.",
          },
          {
            heading: "4. The Four Sign Cases: Predicting Spontaneity",
            content:
              "The signs of ΔH and ΔS sort every reaction into four predictable cases. Both favourable (ΔH < 0, ΔS > 0): always spontaneous at any temperature, like combustion. Both unfavourable (ΔH > 0, ΔS < 0): never spontaneous. Enthalpy-driven (ΔH < 0, ΔS < 0): spontaneous only at low temperature, where the favourable enthalpy wins. Entropy-driven (ΔH > 0, ΔS > 0): spontaneous only at high temperature, where TΔS wins. Memorising these four cases is far more useful than memorising individual reactions — it lets you reason about any process from just two numbers and the temperature.",
            formula:
              "(\\Delta H{-},\\Delta S{+}):\\ \\text{always} \\;|\\; (\\Delta H{+},\\Delta S{-}):\\ \\text{never} \\;|\\; (\\Delta H{-},\\Delta S{-}):\\ \\text{low } T \\;|\\; (\\Delta H{+},\\Delta S{+}):\\ \\text{high } T",
          },
          {
            heading: "5. Hess's Law: Enthalpy Is Path-Independent",
            content:
              "Because enthalpy is a state function, the total heat change of a reaction is the same no matter how many steps it takes to get there — like the height difference between two floors is fixed regardless of the staircase you climb. Hess's law exploits this: if you cannot measure ΔH for a reaction directly, you can build it from other reactions whose ΔH you know, adding and reversing them like algebraic equations (reversing flips the sign, multiplying scales it). This turns an impossible measurement into a simple sum, and it is why tables of standard enthalpies of formation are so powerful — any reaction's ΔH can be assembled from them.",
            formula:
              "\\Delta H_{\\text{total}} = \\sum \\Delta H_{\\text{steps}} \\qquad \\Delta H^\\circ_{rxn} = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})",
          },
          {
            heading: "6. Bond Energies: Where the Heat Actually Comes From",
            content:
              "The enthalpy change of a reaction has a concrete physical origin: breaking bonds costs energy, forming bonds releases it. ΔH is the net of these two — the energy spent to break reactant bonds minus the energy recovered forming product bonds. If the products have stronger bonds overall, the reaction is exothermic and releases the difference as heat. This is why combustion releases so much energy: the strong C=O and O–H bonds formed in CO₂ and water are far more stable than the bonds broken in fuel and oxygen. Viewing ΔH as a bond-energy balance makes thermochemistry tangible rather than abstract.",
            formula:
              "\\Delta H = \\sum \\text{(bond energies broken)} - \\sum \\text{(bond energies formed)}",
          },
        ],
        keyPoints: [
          "Spontaneity is decided by Gibbs free energy ΔG = ΔH − TΔS, not by enthalpy alone",
          "Enthalpy is a state function, which makes Hess's law and formation-enthalpy tables possible",
          "Entropy is the drive toward disorder and gives processes a direction (the arrow of time)",
          "Temperature arbitrates the ΔH-versus-TΔS tug-of-war; the four sign cases predict spontaneity",
          "ΔH physically equals bond energy broken minus bond energy formed — stronger product bonds release heat",
        ],
        commonMistakes: [
          "Assuming every exothermic reaction is spontaneous — entropy and temperature matter too",
          "Forgetting to convert Celsius to Kelvin in ΔG = ΔH − TΔS",
          "Failing to reverse the sign of ΔH when reversing a reaction in Hess's law",
          "Treating entropy as vague 'messiness' rather than the number of ways energy can be dispersed",
          "Confusing ΔG (spontaneity) with reaction rate — a spontaneous reaction can still be extremely slow",
        ],
        practiceQuestions: [
          "Why does ice melt spontaneously at 25 °C even though melting absorbs heat (ΔH > 0)?",
          "Use the four sign cases to predict at which temperatures a reaction with ΔH < 0 and ΔS < 0 is spontaneous.",
          "Explain why ΔG < 0 tells you a reaction is spontaneous but not how fast it occurs.",
          "Apply Hess's law to find ΔH for a reaction you cannot measure directly.",
          "Using bond energies, explain why the combustion of methane releases so much heat.",
          "A reaction has ΔH = −100 kJ and ΔS = −200 J/K. Find the temperature at which it switches from spontaneous to non-spontaneous.",
          "Explain the connection between the second law of thermodynamics and the direction of time.",
        ],
      },
    },
    kinetics: {
      title: "Chemical Kinetics",
      overview: "Chemical kinetics studies reaction rates. Rate = k[A]ᵐ[B]ⁿ. Order is determined experimentally. Half-life and Arrhenius equation describe time dependence and temperature effects.",
      sections: [
        {
          heading: "1. Rate Law",
          content: "Rate = k[A]ᵐ[B]ⁿ. Orders m and n are determined experimentally, not from stoichiometry. Overall order = m + n.",
          formula: "\\text{Rate} = k[\\text{A}]^m[\\text{B}]^n",
        },
        {
          heading: "2. Integrated Rate Laws",
          content: "Zero order: [A] = [A]₀ - kt. First order: ln[A] = ln[A]₀ - kt. Second order: 1/[A] = 1/[A]₀ + kt.",
          formula: "\\begin{aligned} \\text{Zero order:} \\quad &[A] = [A]_0 - kt \\\\ \\text{First order:} \\quad &\\ln[A] = \\ln[A]_0 - kt \\\\ \\text{Second order:} \\quad &\\dfrac{1}{[A]} = \\dfrac{1}{[A]_0} + kt \\end{aligned}",
        },
        {
          heading: "3. Half-life",
          content: "First order: t₁/₂ = ln2/k (constant, independent of concentration). Second order: t₁/₂ = 1/(k[A]₀).",
          formula: "t_{1/2} = \\dfrac{\\ln 2}{k} \\quad (\\text{first order}), \\qquad t_{1/2} = \\dfrac{1}{k[A]_0} \\quad (\\text{second order})",
        },
        {
          heading: "4. Arrhenius Equation",
          content: "k = Ae^(-Ea/RT). Higher activation energy → smaller rate constant. Catalysts lower Ea.",
          formula: "k = A\\,e^{-E_a/RT}, \\qquad \\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\!\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)",
        },
      ],
      keyPoints: [
        "Rate law orders are determined experimentally",
        "First-order half-life is constant",
        "Catalysts lower activation energy without changing ΔH",
      ],
      commonMistakes: [
        "Assuming reaction order equals stoichiometric coefficient",
        "Using t₁/₂ = 0.693/k for zero or second order",
        "Thinking catalysts change equilibrium position",
      ],
      practiceQuestions: [
        "First-order half-life is 50 min. How long to drop to 25% of initial?",
        "For second-order with k = 0.5 L/mol·s and [A]₀ = 0.1 M, find [A] after 10 s.",
        "Rate constant doubles from 300 K to 310 K. Find Ea. (R = 8.314 J/mol·K)",
        "Zero-order reaction: k = 0.02 M/s. Time to reduce [A] from 0.5 to 0.1 M?",
        "Ea = 75 kJ/mol. By what factor does rate increase from 300 K to 350 K?",
      ],
      enrichedContent: {
        title: "Kinetics: Why Reactions Are Fast or Slow",
        overview:
          "Thermodynamics tells you whether a reaction can happen; kinetics tells you whether it will happen on a timescale you care about. A diamond is thermodynamically unstable — it 'wants' to turn into graphite — but the reaction is so slow it will never be noticed. Kinetics is the study of reaction speed and, more importantly, of the pathway a reaction takes: the sequence of molecular collisions and bond-breaking events called the mechanism. The central idea is the activation energy barrier — reactions need a push over a hill before they can roll down to products. Understanding kinetics explains everything from why food keeps longer in a fridge to how enzymes make life possible.",
        sections: [
          {
            heading: "1. Thermodynamics vs Kinetics: Possible Is Not the Same as Fast",
            content:
              "A reaction can be highly spontaneous (ΔG very negative) and still take a million years, because spontaneity says nothing about speed. Thermodynamics answers 'will it happen?' by comparing the energy of reactants and products. Kinetics answers 'how fast?' by examining the barrier between them. The classic example is the conversion of diamond to graphite: thermodynamically favoured, kinetically frozen. This separation is profound — it means metastable states (diamond, gasoline plus air at room temperature, your own body) can persist indefinitely because the path to the lower-energy state is blocked by a high barrier.",
            formula:
              "\\text{Thermodynamics: } \\Delta G\\ (\\text{will it?}) \\qquad \\text{Kinetics: } E_a\\ (\\text{how fast?})",
          },
          {
            heading: "2. The Activation Energy Barrier",
            content:
              "For reactants to become products, bonds must first break before new ones form, and breaking bonds requires an input of energy. The minimum energy needed is the activation energy E_a — a hill the reaction must climb. Even a strongly exothermic reaction must first go up this hill, because the reacting molecules need enough energy to reach a high-energy transition state (an unstable arrangement midway between reactants and products). Only collisions with energy ≥ E_a succeed. This is why a match is needed to start a fire even though burning releases far more energy than the match provides — the match supplies the activation energy to get over the initial hill.",
            formula:
              "\\text{Reactants} \\xrightarrow{+E_a} \\text{transition state} \\xrightarrow{-\\Delta H} \\text{products}",
          },
          {
            heading: "3. Collision Theory: Why Rate Depends on Concentration",
            content:
              "Reactions occur when molecules collide with sufficient energy and the correct orientation. This collision theory explains the rate law directly. Higher concentration means more molecules per volume, so more collisions per second, so a faster rate. Higher temperature does two things: molecules move faster (more collisions) and, more importantly, a much larger fraction of them have energy above E_a — which is why rate is exquisitely sensitive to temperature. The orientation requirement explains why not every energetic collision reacts; molecules must hit in the right way for the bonds to rearrange.",
            formula:
              "\\text{Rate} \\propto (\\text{collision frequency}) \\times (\\text{fraction with } E \\geq E_a) \\times (\\text{correct orientation})",
          },
          {
            heading: "4. The Arrhenius Equation: Temperature Is Exponential",
            content:
              "The Arrhenius equation k = Ae^(−E_a/RT) quantifies the temperature dependence, and the exponential is the key. Because E_a appears in an exponential, a modest rise in temperature produces a dramatic increase in rate — roughly, many reactions double in speed for every 10 °C rise. The term e^(−E_a/RT) is the fraction of molecules with enough energy to surmount the barrier, and it grows rapidly with T. This is why refrigeration preserves food (slowing the reactions of spoilage) and why fever matters biologically. The equation also lets you determine E_a experimentally by measuring k at two temperatures.",
            formula:
              "k = A\\,e^{-E_a/RT} \\quad \\Rightarrow \\quad \\text{rate rises exponentially with } T",
          },
          {
            heading: "5. Mechanisms and the Rate-Determining Step",
            content:
              "Most reactions do not happen in a single collision; they proceed through a sequence of elementary steps called a mechanism, with short-lived intermediates formed along the way. The overall rate is governed by the slowest step — the rate-determining step — just as the slowest stage of an assembly line sets the pace of the whole factory. This is why the experimentally measured rate law often does not match the overall balanced equation: the rate law reflects the molecularity of the slow step, not the net stoichiometry. Determining a mechanism means finding a sequence of steps whose slow step reproduces the observed rate law.",
            formula:
              "\\text{Overall rate} = \\text{rate of slowest (rate-determining) step}",
          },
          {
            heading: "6. Catalysts: Lowering the Hill Without Being Consumed",
            content:
              "A catalyst speeds up a reaction by providing an alternative pathway with a lower activation energy — it lowers the hill rather than pushing harder. Crucially, a catalyst is not consumed; it participates but is regenerated, so a tiny amount can turn over a huge quantity of reactant. It speeds up the forward and reverse reactions equally, so it does not change the equilibrium position or ΔG — it only helps the system reach equilibrium faster. This is the basis of enormous practical power: the catalytic converter cleans car exhaust, industrial catalysts make fertiliser and plastics, and enzymes are biological catalysts that run every reaction in your body fast enough to sustain life.",
            formula:
              "\\text{Catalyst} \\downarrow E_a,\\ \\text{not consumed},\\ \\text{same } \\Delta G \\text{ and equilibrium, faster rate}",
          },
        ],
        keyPoints: [
          "Thermodynamics decides if a reaction can occur; kinetics decides if it occurs at a useful speed",
          "Reactions must overcome an activation energy barrier via an unstable transition state",
          "Collision theory: rate rises with concentration (more collisions) and especially temperature (more energetic collisions)",
          "The Arrhenius equation shows rate depends exponentially on temperature — small T change, large rate change",
          "Mechanisms proceed by elementary steps; the slowest sets the rate; catalysts lower E_a without being consumed",
        ],
        commonMistakes: [
          "Confusing spontaneity (ΔG) with speed — a spontaneous reaction can be immeasurably slow",
          "Assuming reaction order equals the stoichiometric coefficient; orders come from experiment",
          "Thinking a catalyst changes the equilibrium yield or ΔG; it only changes the rate",
          "Using the first-order half-life formula for zero- or second-order reactions",
          "Believing an exothermic reaction needs no activation energy; it still must climb the barrier first",
        ],
        practiceQuestions: [
          "Explain how diamond can be thermodynamically unstable yet persist indefinitely.",
          "Using collision theory, explain why reaction rate is so sensitive to temperature but only linearly to concentration.",
          "A reaction needs a spark to start but then releases far more energy than the spark provided. Explain using activation energy.",
          "Why does a catalyst speed up a reaction without changing the amount of product at equilibrium?",
          "For a multi-step mechanism, explain how the rate-determining step dictates the observed rate law.",
          "A first-order reaction has a half-life of 50 min. How long until only 25% of the reactant remains?",
          "Using the Arrhenius equation, explain why food spoils much more slowly in a refrigerator.",
        ],
      },
    },
    "acid-base": {
      title: "Acid-Base Chemistry",
      overview: "Acid-base chemistry covers pH, strong/weak acids and bases, buffers, and titrations. The Brønsted-Lowry theory defines acids as proton donors and bases as proton acceptors.",
      sections: [
        {
          heading: "1. pH and pOH",
          content: "pH = -log[H⁺]; pOH = -log[OH⁻]; pH + pOH = 14 at 25°C. Strong acids/bases dissociate completely; weak acids/bases partially.",
          formula: "\\text{pH} = -\\log[\\text{H}^+], \\qquad \\text{pH} + \\text{pOH} = 14",
        },
        {
          heading: "2. Weak Acids",
          content: "For weak acid HA: [H⁺] ≈ √(Ka·C). pH ≈ ½pKa - ½log C (when Ka << C).",
          formula: "[\\text{H}^+] \\approx \\sqrt{K_a \\cdot C}, \\qquad \\text{pH} \\approx \\tfrac{1}{2}\\text{p}K_a - \\tfrac{1}{2}\\log C",
        },
        {
          heading: "3. Buffers",
          content: "Buffers resist pH change. Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). Best buffer when [A⁻] = [HA] (pH = pKa).",
          formula: "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}",
        },
        {
          heading: "4. Salt Hydrolysis",
          content: "Salt of weak acid + strong base → basic solution. Salt of strong acid + weak base → acidic solution. Salt of strong + strong → neutral.",
          formula: "K_h = \\dfrac{K_w}{K_a} \\quad (\\text{WA+SB salt}), \\qquad K_h = \\dfrac{K_w}{K_b} \\quad (\\text{SA+WB salt})",
        },
      ],
      keyPoints: [
        "Strong acids/bases dissociate completely",
        "Buffers work best when pH ≈ pKa",
        "Conjugate acid-base pairs differ by one H⁺",
      ],
      commonMistakes: [
        "Using pH = -log C for weak acids (need √(Ka·C))",
        "Thinking all salts are neutral",
        "Choosing wrong indicator for titration",
      ],
      practiceQuestions: [
        "Calculate pH of 0.1 M CH₃COOH (Ka = 1.8 × 10⁻⁵).",
        "Find pH of buffer with 0.1 M CH₃COOH and 0.1 M CH₃COONa.",
        "What is pH at equivalence point of 50 mL 0.1 M NaOH + 50 mL 0.1 M CH₃COOH?",
        "Calculate pH of 0.01 M NH₄Cl (Kb = 1.8 × 10⁻⁵).",
        "How many grams of NaCH₃COO (M = 82) in 1 L of 0.1 M CH₃COOH for pH 4.74?",
      ],
      enrichedContent: {
        title: "Acids and Bases: The Proton Handshake That Runs Life",
        overview:
          "Acid-base chemistry looks like a sea of formulas — pH, Ka, pOH, buffers, titration curves — but it rests on one simple idea: acids donate protons (H⁺) and bases accept them. Nearly every biological and environmental process you care about is proton transfer: digestion, blood pH, enzyme function, acid rain, and ocean acidification. The power of the subject comes from the logarithmic pH scale, which compresses an enormous range of proton concentrations into a few numbers, and from the concept of conjugate pairs, which reveals that every acid has a partner base. Once you see acid-base reactions as a proton handshake between partners, the formulas become tools rather than obstacles.",
        sections: [
          {
            heading: "1. Three Definitions, One Deepening Idea",
            content:
              "The definition of acids and bases grew more general over time. Arrhenius said acids produce H⁺ in water and bases produce OH⁻ — useful but limited to aqueous solutions. Brønsted-Lowry broadened it to proton transfer: an acid is any proton donor, a base any proton acceptor, which works without requiring water. Lewis broadened it further to electron pairs: an acid accepts an electron pair, a base donates one — the widest definition, covering reactions with no protons at all (like BF₃ acting as an acid). Each definition subsumes the last. For most of biology and solution chemistry, the Brønsted-Lowry proton view is the most useful.",
            formula:
              "\\text{Arrhenius (H}^+/\\text{OH}^-) \\subset \\text{Brønsted-Lowry (proton transfer)} \\subset \\text{Lewis (electron pairs)}",
          },
          {
            heading: "2. The Logarithmic pH Scale: Why One Number Hides a Lot",
            content:
              "pH = −log[H⁺] is not an arbitrary formula; it is a way to tame a colossal range. Proton concentrations in real solutions span over fourteen orders of magnitude, from ~1 M in strong acid to 10⁻¹⁴ M in strong base. The logarithm compresses this into the tidy 0–14 scale. The critical consequence is that each single pH unit is a tenfold change in acidity: pH 3 is ten times more acidic than pH 4 and a hundred times more than pH 5. This is why a shift of one pH unit in blood or ocean water is chemically enormous — the logarithm hides just how violent these changes really are.",
            formula:
              "\\text{pH} = -\\log[H^+], \\qquad \\text{pH} + \\text{pOH} = 14, \\qquad [H^+][OH^-] = K_w = 10^{-14}",
          },
          {
            heading: "3. Strong vs Weak: It's About Degree of Dissociation",
            content:
              "A strong acid (HCl, HNO₃, H₂SO₄) dissociates completely in water — every molecule gives up its proton, so [H⁺] equals the acid concentration and pH is simply −log C. A weak acid (acetic acid, carbonic acid) only partially dissociates, establishing an equilibrium, so [H⁺] is much smaller and must be found from Ka using [H⁺] ≈ √(Ka·C). Strength is not the same as concentration: a dilute strong acid and a concentrated weak acid can have similar pH. The distinction matters everywhere — your stomach uses strong acid to digest, while your blood relies on weak-acid buffers to stay near neutral.",
            formula:
              "\\text{Strong: } [H^+] = C \\qquad \\text{Weak: } [H^+] \\approx \\sqrt{K_a \\cdot C}",
          },
          {
            heading: "4. Conjugate Pairs: Every Acid Has a Partner",
            content:
              "A Brønsted-Lowry acid-base reaction is always a proton transfer between two conjugate pairs. When an acid HA donates a proton, it becomes its conjugate base A⁻; when a base accepts a proton, it becomes its conjugate acid. The two are linked by exactly one H⁺. There is a seesaw relationship: the stronger an acid, the weaker its conjugate base, and vice versa — a species that gives up protons readily leaves behind a partner that has little appetite to take one back. This conjugate-pair thinking is the foundation of buffers and of predicting which direction an acid-base reaction will favour.",
            formula:
              "HA + B \\rightleftharpoons A^- + HB^+ \\quad (\\text{two conjugate pairs differing by one } H^+)",
          },
          {
            heading: "5. Buffers: Why Your Blood Doesn't Kill You",
            content:
              "A buffer resists pH change when small amounts of acid or base are added, and it is essential to life — blood must stay within about pH 7.35–7.45 or you die. A buffer is a mixture of a weak acid and its conjugate base in equilibrium. Add acid (H⁺) and the conjugate base absorbs it; add base (OH⁻) and the weak acid donates H⁺ to neutralise it. Either way the equilibrium shifts to soak up the disturbance, so pH barely moves. Buffering is strongest when the acid and base are equal (pH = pKa), which is why the body uses buffer systems whose pKa sits near the pH it must defend — like the carbonic acid/bicarbonate system in blood.",
            formula:
              "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[A^-]}{[HA]} \\quad (\\text{Henderson-Hasselbalch});\\ \\text{best buffer at pH} = \\text{p}K_a",
          },
          {
            heading: "6. Titration and Salt Hydrolysis: Reading the Curve",
            content:
              "A titration gradually adds one solution to another to find an unknown concentration, and its pH curve reveals the chemistry. The equivalence point is where moles of acid equal moles of base — but its pH is not always 7. A strong acid titrated with a strong base gives a neutral equivalence point (pH 7), while a weak acid with a strong base gives a basic equivalence point because the salt formed hydrolyses: the conjugate base of the weak acid reacts with water to produce OH⁻. This salt hydrolysis is why solutions of salts are not always neutral. Choosing an indicator whose colour change matches the equivalence-point pH is the practical key to a successful titration.",
            formula:
              "\\text{WA} + \\text{SB} \\rightarrow \\text{basic salt}\\ (\\text{pH}>7); \\quad \\text{SA} + \\text{WB} \\rightarrow \\text{acidic salt}\\ (\\text{pH}<7)",
          },
        ],
        keyPoints: [
          "Acids donate protons and bases accept them (Brønsted-Lowry); Lewis generalises to electron pairs",
          "pH is logarithmic — each unit is a tenfold change, so small pH shifts are chemically large",
          "Strong acids dissociate fully ([H⁺] = C); weak acids partially ([H⁺] ≈ √(Ka·C)); strength ≠ concentration",
          "Every acid has a conjugate base differing by one H⁺; stronger acid means weaker conjugate base",
          "Buffers (weak acid + conjugate base) resist pH change; salt hydrolysis makes equivalence points non-neutral",
        ],
        commonMistakes: [
          "Using pH = −log C for a weak acid instead of √(Ka·C)",
          "Confusing acid strength (degree of dissociation) with concentration (amount dissolved)",
          "Assuming all salt solutions are neutral — salts of weak acids or bases hydrolyse",
          "Assuming the equivalence point of every titration is at pH 7",
          "Forgetting that a buffer works best near its pKa, not at any arbitrary pH",
        ],
        practiceQuestions: [
          "Explain how the Brønsted-Lowry definition generalises the Arrhenius definition.",
          "Why does a change of one pH unit represent a tenfold change in acidity?",
          "Calculate the pH of 0.1 M acetic acid (Ka = 1.8 × 10⁻⁵) and explain why it is not simply −log(0.1).",
          "Identify the two conjugate acid-base pairs in the reaction between acetic acid and water.",
          "Explain how the carbonic acid/bicarbonate buffer keeps blood near pH 7.4.",
          "Why is the equivalence point basic when a weak acid is titrated with a strong base?",
          "Distinguish between a strong dilute acid and a weak concentrated acid of the same pH.",
        ],
      },
    },
    redox: {
      title: "Redox Reactions and Electrochemistry",
      overview: "Redox reactions involve electron transfer. Oxidation is loss (OIL); reduction is gain (RIG). Electrochemical cells convert chemical energy to electricity.",
      sections: [
        {
          heading: "1. Oxidation and Reduction",
          content: "Oxidation: loss of electrons (increase in oxidation number). Reduction: gain of electrons (decrease in oxidation number). Mnemonic: OIL RIG.",
          formula: "\\text{Oxidation: } \\text{A} \\rightarrow \\text{A}^+ + e^- \\qquad \\text{Reduction: } \\text{B} + e^- \\rightarrow \\text{B}^-",
        },
        {
          heading: "2. Balancing Redox Reactions",
          content: "Use ion-electron method: split into half-reactions, balance atoms and charges, then combine. In acidic medium, balance O with H₂O and H with H⁺.",
          formula: "\\text{Acidic: balance O with H}_2\\text{O, then H with H}^+",
        },
        {
          heading: "3. Cell Potential",
          content: "E°_cell = E°_cathode - E°_anode. If E°_cell > 0, reaction is spontaneous.",
          formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        },
        {
          heading: "4. Nernst Equation",
          content: "E = E° - (0.0591/n)log Q at 25°C. As cell discharges, Q increases and E decreases.",
          formula: "E = E^\\circ - \\dfrac{0.0591}{n}\\log Q",
        },
        {
          heading: "5. Faraday's Laws",
          content: "Mass deposited: m = MIt/(nF), where F = 96,485 C/mol. One Faraday deposits one equivalent weight of substance.",
          formula: "m = \\dfrac{MIt}{nF}, \\qquad F = 96485 \\; \\text{C/mol}",
        },
      ],
      keyPoints: [
        "Anode = oxidation (negative in galvanic cell)",
        "Cathode = reduction (positive in galvanic cell)",
        "E°_cell > 0 means spontaneous",
        "Faraday's constant: 1 mol e⁻ = 96,485 C",
      ],
      commonMistakes: [
        "Confusing anode and cathode",
        "Using E°_anode - E°_cathode (should be cathode - anode)",
        "Forgetting sign convention in electrolytic cells",
      ],
      practiceQuestions: [
        "Balance: MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O (acidic).",
        "Calculate E°_cell for Zn|Zn²⁺||Cu²⁺|Cu. (E°_Zn = -0.76 V, E°_Cu = +0.34 V)",
        "How many grams of Cu deposited by 2 F through CuSO₄?",
        "Calculate E at 25°C for Zn|Zn²⁺(0.01 M)||Cu²⁺(0.1 M)|Cu. (E° = 1.10 V)",
        "What charge deposits 5.4 g Al from AlCl₃? (Al = 27 g/mol)",
      ],
      enrichedContent: {
        title: "Redox: The Flow of Electrons That Powers Everything",
        overview:
          "Redox reactions — where electrons are transferred from one species to another — are the chemistry of energy flow. They are why batteries work, why iron rusts, why your cells extract energy from food, and how metals are extracted from ores. The unifying idea is that oxidation (loss of electrons) and reduction (gain of electrons) always occur together: electrons given up by one species must be accepted by another. When you physically separate the two half-reactions and connect them by a wire, the electrons are forced to travel through the wire — and that flow is electricity. Understanding redox is understanding how chemical energy is converted to electrical energy and back.",
        sections: [
          {
            heading: "1. Oxidation and Reduction Are Inseparable",
            content:
              "The mnemonic OIL RIG — Oxidation Is Loss, Reduction Is Gain (of electrons) — captures the core, but the deeper point is that the two always happen simultaneously. An electron cannot simply vanish; if one species loses an electron, another must gain it at the same instant. So every redox reaction couples an oxidation half-reaction to a reduction half-reaction. The species that loses electrons is oxidised and acts as the reducing agent (it reduces the other); the species that gains electrons is reduced and is the oxidising agent. Tracking oxidation numbers is the bookkeeping tool that reveals who lost and who gained.",
            formula:
              "\\text{Oxidation (loss)} \\;+\\; \\text{Reduction (gain)} \\Rightarrow \\text{always coupled}",
          },
          {
            heading: "2. Oxidation Numbers: The Electron Accounting System",
            content:
              "Oxidation numbers are a formal bookkeeping device that lets you track electron transfer even in covalent compounds where no real ions exist. By assigning electrons in each bond to the more electronegative atom, every atom gets a notional charge. An increase in oxidation number is oxidation; a decrease is reduction. This is what lets you identify the oxidising and reducing agents in any reaction and balance redox equations systematically. The rules (O is usually −2, H is usually +1, elemental form is 0, etc.) are conventions, but they work perfectly for accounting because the total electrons lost must equal the total gained.",
            formula:
              "\\Delta(\\text{oxidation number}) > 0 \\Rightarrow \\text{oxidised}; \\quad < 0 \\Rightarrow \\text{reduced}",
          },
          {
            heading: "3. Half-Reactions and Balancing Redox",
            content:
              "The ion-electron (half-reaction) method turns the messy task of balancing redox equations into a systematic procedure. Split the reaction into an oxidation half and a reduction half. Balance each for atoms, then for oxygen by adding H₂O, for hydrogen by adding H⁺ (in acid) or OH⁻ (in base), and finally for charge by adding electrons. Multiply the halves so the electrons lost equal the electrons gained, then add them and cancel. This method works because it enforces the fundamental conservation of both mass and charge — and it makes the electron transfer explicit, which is exactly what you need to connect the reaction to an electrical circuit.",
            formula:
              "\\text{Balance atoms} \\rightarrow \\text{O with } H_2O \\rightarrow \\text{H with } H^+ \\rightarrow \\text{charge with } e^- \\rightarrow \\text{equalise electrons}",
          },
          {
            heading: "4. Galvanic Cells: Forcing Electrons Through a Wire",
            content:
              "If you allow oxidation and reduction to happen in the same beaker, the electron transfer is direct and the energy is released as heat. But if you separate the two half-reactions into different compartments and connect them with a wire, the electrons are forced to travel through the wire to get from the oxidation site (anode) to the reduction site (cathode) — and that flow of electrons is an electric current you can use. A salt bridge completes the circuit by allowing ions to flow and maintain charge balance. This is a galvanic (voltaic) cell: a battery. The spontaneous redox reaction is harnessed to do electrical work instead of just making heat.",
            formula:
              "\\text{Anode (oxidation)} \\xrightarrow{\\text{electrons through wire}} \\text{Cathode (reduction)}; \\quad \\text{salt bridge balances charge}",
          },
          {
            heading: "5. Cell Potential and the Link to Free Energy",
            content:
              "The driving force of a galvanic cell is its cell potential E°_cell = E°_cathode − E°_anode, measured in volts. A positive E°_cell means the reaction is spontaneous. This connects directly to thermodynamics: ΔG° = −nFE°_cell, where n is the moles of electrons and F is Faraday's constant. So a redox reaction's free energy change and its voltage are two faces of the same thing — the greater the potential, the more spontaneous the reaction and the more electrical work it can do. The Nernst equation extends this to non-standard conditions, showing that the voltage drops as the cell discharges and the reaction quotient Q rises toward equilibrium (where E = 0 and the battery is 'dead').",
            formula:
              "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}; \\qquad \\Delta G^\\circ = -nFE^\\circ_{cell}; \\qquad E = E^\\circ - \\frac{0.0591}{n}\\log Q",
          },
          {
            heading: "6. Electrolysis and Faraday's Laws: Running It Backwards",
            content:
              "A galvanic cell converts spontaneous chemical energy into electricity; an electrolytic cell does the reverse, using electrical energy to drive a non-spontaneous reaction. This is how we electroplate metals, purify copper, and extract reactive metals like aluminium from their ores — reactions that would never happen on their own are forced by applying a voltage greater than the cell potential. Faraday's laws quantify this: the mass of substance deposited is proportional to the charge passed, with one mole of electrons (one Faraday, 96,485 C) depositing one equivalent. This precise charge-to-mass relationship is the basis of electroplating, batteries being recharged, and industrial electrochemistry.",
            formula:
              "m = \\dfrac{MIt}{nF}, \\qquad F = 96485\\ \\text{C/mol} \\quad (1\\ \\text{mol } e^- = 1\\ \\text{Faraday})",
          },
        ],
        keyPoints: [
          "Oxidation (loss) and reduction (gain) of electrons always occur together in a redox reaction",
          "Oxidation numbers are a bookkeeping tool to track electron transfer and identify oxidising/reducing agents",
          "Half-reaction balancing enforces conservation of both mass and charge",
          "Separating the half-reactions forces electrons through a wire — a galvanic cell (battery)",
          "E°_cell links to ΔG° = −nFE°; electrolysis runs the non-spontaneous reverse using applied voltage",
        ],
        commonMistakes: [
          "Confusing the anode and cathode, or forgetting the anode is where oxidation occurs",
          "Computing E°_cell as anode − cathode instead of cathode − anode",
          "Assuming a redox reaction can have oxidation without a matching reduction",
          "Applying the wrong sign convention between galvanic and electrolytic cells",
          "Forgetting to equalise electrons between half-reactions before combining them",
        ],
        practiceQuestions: [
          "Explain why oxidation and reduction must always occur together in a redox reaction.",
          "Assign oxidation numbers and identify the oxidising and reducing agents in a given reaction.",
          "Describe how separating two half-reactions into compartments produces an electric current.",
          "Use ΔG° = −nFE°_cell to explain why a positive cell potential means a spontaneous reaction.",
          "Explain why a battery's voltage falls as it discharges, using the Nernst equation.",
          "Balance MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O using the half-reaction method.",
          "How is electrolysis used to extract aluminium, and why can't this be done chemically?",
        ],
      },
    },
    organic: {
      title: "Organic Chemistry Fundamentals",
      overview: "Organic chemistry studies carbon compounds. Carbon's tetravalency and catenation enable diverse molecules. IUPAC nomenclature provides systematic names. Functional groups determine reactivity.",
      sections: [
        {
          heading: "1. IUPAC Nomenclature",
          content: "Name = prefix(substituents) + root(chain length) + suffix(function group). Number chain to give lowest locants to substituents. Alphabetical order for prefixes.",
          formula: "\\text{Name} = \\text{prefix} + \\text{root} + \\text{suffix}",
          example: "Example: Name CH₃CH(CH₃)CH₂CH₃.\nLongest chain: 4 carbons (butane). Branch: methyl at C2.\nName: 2-methylbutane",
        },
        {
          heading: "2. Functional Groups",
          content: "Key groups: -OH (alcohol), -CHO (aldehyde), -CO- (ketone), -COOH (carboxylic acid), -NH₂ (amine), -X (halide), -O- (ether), -CN (nitrile).",
          formula: "\\begin{aligned} \\text{Alcohol:} && \\text{-OH} &\\rightarrow \\text{R-OH} \\\\ \\text{Aldehyde:} && \\text{-CHO} &\\rightarrow \\text{R-CHO} \\\\ \\text{Ketone:} && \\text{-CO-} &\\rightarrow \\text{R-CO-R'} \\\\ \\text{Carboxylic acid:} && \\text{-COOH} &\\rightarrow \\text{R-COOH} \\\\ \\text{Amine:} && \\text{-NH}_2 &\\rightarrow \\text{R-NH}_2 \\end{aligned}",
        },
        {
          heading: "3. Isomerism",
          content: "Structural isomers: same formula, different connectivity. Types: chain, position, functional, metamerism, tautomerism. Stereoisomers: same connectivity, different spatial arrangement.",
          formula: "\\begin{aligned} \\text{Chain:} &\\quad \\text{different carbon skeleton} \\\\ \\text{Position:} &\\quad \\text{different position of functional group} \\\\ \\text{Functional:} &\\quad \\text{different functional groups} \\end{aligned}",
        },
        {
          heading: "4. Reaction Mechanisms",
          content: "Homolytic fission: each atom gets one electron (free radicals). Heterolytic fission: one atom gets both electrons (ions). Electrophiles (E⁺) seek electrons; nucleophiles (Nu⁻) donate electrons.",
          formula: "\\begin{aligned} \\text{Homolytic:} \\quad &\\text{A-B} \\rightarrow \\text{A}^\\cdot + \\text{B}^\\cdot \\\\ \\text{Heterolytic:} \\quad &\\text{A-B} \\rightarrow \\text{A}^+ + \\text{B}^- \\end{aligned}",
        },
        {
          heading: "5. Electronic Effects",
          content: "Inductive effect (+I/-I): electron donation/withdrawal through σ bonds. Resonance effect (+R/-R): delocalization through π bonds. Hyperconjugation stabilizes carbocations: 3° > 2° > 1°.",
          formula: "\\text{Carbocation stability:} \\quad 3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3^+",
        },
      ],
      keyPoints: [
        "Carbon forms 4 covalent bonds (tetravalency) and can catenate",
        "IUPAC: longest chain first, lowest numbers, alphabetical prefixes",
        "Electrophiles accept electrons; nucleophiles donate electrons",
        "3° carbocations are most stable (hyperconjugation)",
      ],
      commonMistakes: [
        "Numbering chain to give higher locants",
        "Confusing electrophiles with nucleophiles",
        "Forgetting that resonance structures are not real",
      ],
      practiceQuestions: [
        "Name: CH₃CH(CH₃)CH₂CH₃",
        "Draw all structural isomers of C₄H₁₀.",
        "Identify the electrophile and nucleophile in: CH₃Br + OH⁻ → CH₃OH + Br⁻",
        "Arrange in order of increasing acidity: ethanol, phenol, acetic acid.",
        "Explain why t-butyl carbocation is more stable than ethyl carbocation.",
      ],
      enrichedContent: {
        title: "Organic Chemistry: The Chemistry of Carbon's Infinite Versatility",
        overview:
          "Organic chemistry seems like an overwhelming flood of reactions and names until you see its underlying logic: carbon is uniquely able to build large, stable, varied skeletons, and a handful of principles — functional groups, electron flow, and stability of intermediates — explain almost all of its behaviour. Instead of memorising thousands of reactions, you learn to recognise the reactive site (the functional group), track where electrons want to go (from electron-rich nucleophiles to electron-poor electrophiles), and predict products from the stability of what forms in between. Organic chemistry is the chemistry of life itself: your DNA, proteins, sugars, and fats are all carbon compounds following these same rules.",
        sections: [
          {
            heading: "1. Why Carbon? Tetravalency and Catenation",
            content:
              "Carbon dominates the chemistry of life for two structural reasons. First, tetravalency: with four valence electrons it forms four strong covalent bonds, allowing it to be a junction connecting many other atoms in three dimensions. Second, catenation: carbon-carbon bonds are strong enough that carbon chains and rings of almost any length and shape are stable — no other element matches this. Combined with its moderate electronegativity (so bonds are shared, not fully ionic) and its ability to form double and triple bonds, carbon can build an essentially infinite variety of stable structures. This versatility is why there are millions of known organic compounds and why life is carbon-based rather than silicon-based.",
            formula:
              "\\text{4 bonds (tetravalency)} + \\text{strong C-C chains (catenation)} \\Rightarrow \\text{near-infinite variety}",
          },
          {
            heading: "2. Functional Groups: The Reactive Personality of a Molecule",
            content:
              "The carbon-hydrogen skeleton of an organic molecule is relatively inert; nearly all its reactivity comes from a small set of functional groups — specific arrangements of atoms that behave predictably wherever they appear. An alcohol (−OH), an aldehyde (−CHO), a carboxylic acid (−COOH), an amine (−NH₂) each impose a characteristic chemistry regardless of the rest of the molecule. This is the great simplifier of organic chemistry: instead of studying millions of compounds, you study a dozen functional groups. It is also why molecules in your body work the way they do — the functional groups on an amino acid or a sugar determine how it reacts and what it can build.",
            formula:
              "\\text{-OH (alcohol)},\\ \\text{-CHO (aldehyde)},\\ \\text{-COOH (acid)},\\ \\text{-NH}_2\\ (\\text{amine}) \\Rightarrow \\text{predictable reactivity}",
          },
          {
            heading: "3. Electron Flow: Nucleophiles Attack Electrophiles",
            content:
              "Almost every organic reaction mechanism is the same story: an electron-rich species attacks an electron-poor one. A nucleophile ('nucleus-loving', often negatively charged or lone-pair bearing) donates electrons to an electrophile ('electron-loving', electron-deficient, often positively charged or bonded to something more electronegative). Reactions happen where there is a mismatch in electron density, and the curly-arrow notation simply tracks the movement of electron pairs. Once you learn to spot the nucleophile and the electrophile in any reaction, you can predict the product by following where the electrons naturally want to flow — this is the master key to organic mechanisms.",
            formula:
              "\\text{Nucleophile } (Nu^-,\\ \\text{electron-rich}) \\rightarrow \\text{Electrophile } (E^+,\\ \\text{electron-poor})",
          },
          {
            heading: "4. Bond Fission: Radicals Versus Ions",
            content:
              "When a covalent bond breaks, it can do so in two fundamentally different ways, leading to two families of reactions. Homolytic fission splits the bonding pair evenly — each atom keeps one electron — producing highly reactive free radicals (species with unpaired electrons). Radicals drive chain reactions like combustion and polymerisation. Heterolytic fission gives both electrons to one atom, producing a pair of ions — a cation and an anion. Ionic reactions dominate most laboratory and biological organic chemistry. Recognising which type of fission is occurring tells you whether to expect radical or ionic behaviour, and hence what products and mechanisms to predict.",
            formula:
              "\\text{Homolytic: } A{-}B \\rightarrow A^\\cdot + B^\\cdot \\ (\\text{radicals}) \\qquad \\text{Heterolytic: } A{-}B \\rightarrow A^+ + B^- \\ (\\text{ions})",
          },
          {
            heading: "5. Stability of Intermediates: Carbocations and Beyond",
            content:
              "Many organic reactions pass through short-lived, high-energy intermediates, and the stability of these intermediates determines which product forms and how fast. The carbocation (a carbon with a positive charge) is the most important: its stability increases with substitution, tertiary > secondary > primary > methyl. This is because neighbouring alkyl groups donate electron density through the inductive effect and hyperconjugation (overlap of adjacent C–H bonds with the empty orbital), spreading out and stabilising the positive charge. This ordering explains Markovnikov's rule and why certain products dominate. The general principle — reactions favour the pathway through the most stable intermediate — is a powerful predictive tool across organic chemistry.",
            formula:
              "\\text{Carbocation stability: } 3^\\circ > 2^\\circ > 1^\\circ > CH_3^+ \\quad (\\text{inductive + hyperconjugation})",
          },
          {
            heading: "6. Electronic Effects and Isomerism: Same Atoms, Different Behaviour",
            content:
              "Two further ideas explain much of organic chemistry's richness. Electronic effects describe how electron density is pushed or pulled through a molecule: the inductive effect operates through σ bonds, the resonance effect delocalises electrons through π systems, and together they determine where reactions occur and how stable intermediates are. Isomerism explains how the same molecular formula can give very different compounds — structural isomers differ in connectivity (chain, position, functional group), while stereoisomers have the same connectivity but different spatial arrangement. Stereoisomerism is crucial in biology: the two mirror-image forms (enantiomers) of a drug or amino acid can behave completely differently, because life's molecules are chirally selective.",
            formula:
              "\\text{Isomers: same formula} \\Rightarrow \\text{structural (connectivity) or stereoisomers (arrangement)}",
          },
        ],
        keyPoints: [
          "Carbon's tetravalency and catenation give it unmatched ability to build diverse stable skeletons",
          "Functional groups, not the carbon skeleton, determine a molecule's reactivity — study the groups, not every compound",
          "Most mechanisms are electron flow: nucleophiles (electron-rich) attack electrophiles (electron-poor)",
          "Bond fission is homolytic (radicals) or heterolytic (ions), dictating the reaction family",
          "Intermediate stability (3° > 2° > 1° carbocations) and electronic effects predict products; stereoisomerism matters in biology",
        ],
        commonMistakes: [
          "Trying to memorise individual reactions instead of learning functional-group behaviour and electron flow",
          "Confusing nucleophiles (electron donors) with electrophiles (electron acceptors)",
          "Treating resonance structures as real, interconverting forms rather than one delocalised hybrid",
          "Forgetting that a more substituted carbocation is more stable, leading to wrong major products",
          "Ignoring stereoisomerism, which is critical in biological and pharmaceutical contexts",
        ],
        practiceQuestions: [
          "Explain why carbon, more than any other element, can form such a vast variety of stable compounds.",
          "Identify the functional group in a molecule and predict its characteristic reactivity.",
          "For CH₃Br + OH⁻ → CH₃OH + Br⁻, identify the nucleophile and electrophile and show the electron flow.",
          "Explain the difference between homolytic and heterolytic bond fission and the reaction types each leads to.",
          "Why is a tertiary carbocation more stable than a primary one? Use hyperconjugation and the inductive effect.",
          "Draw and classify the isomers of C₄H₁₀ and explain why they are structural isomers.",
          "Why can two enantiomers of the same drug have dramatically different biological effects?",
        ],
      },
    },
  },

  mathematics: {
    calculus: {
      title: "Calculus",
      overview: "Calculus deals with limits, derivatives, and integrals. Derivatives measure instantaneous rates of change; integrals compute accumulated quantities. The Fundamental Theorem of Calculus connects differentiation and integration.",
      sections: [
        {
          heading: "1. Limits",
          content: "The limit of f(x) as x approaches a is L if f(x) gets arbitrarily close to L. Standard limits: lim(x→0) sin x/x = 1, lim(x→0) (eˣ-1)/x = 1, lim(x→0) ln(1+x)/x = 1. Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞-∞, 1^∞, 0^0, ∞^0.",
          formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1",
        },
        {
          heading: "2. Derivatives — Basic Rules",
          content: "Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Derivatives of trig functions: d/dx[sin x] = cos x, d/dx[cos x] = -sin x. Exponential: d/dx[eˣ] = eˣ. Logarithmic: d/dx[ln x] = 1/x.",
          formula: "\\dfrac{d}{dx}\\big[x^n\\big] = nx^{n-1}, \\quad \\dfrac{d}{dx}[\\sin x] = \\cos x, \\quad \\dfrac{d}{dx}[e^x] = e^x",
        },
        {
          heading: "3. Product and Quotient Rules",
          content: "Product rule: d/dx[fg] = f'g + fg'. Quotient rule: d/dx[f/g] = (f'g - fg')/g².",
          formula: "\\dfrac{d}{dx}[f \\cdot g] = f'g + fg', \\qquad \\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
        },
        {
          heading: "4. Chain Rule",
          content: "For composite functions: d/dx[f(g(x))] = f'(g(x))·g'(x). Essential for differentiating nested functions.",
          formula: "\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}",
          example: "Example: Find d/dx[sin(x²)].\nu = x², dy/du = cos u, du/dx = 2x\nd/dx = cos(x²)·2x = 2x cos(x²)",
        },
        {
          heading: "5. Integration — Basic Formulas",
          content: "Integration is the inverse of differentiation. Standard integrals: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, ∫1/x dx = ln|x| + C, ∫eˣ dx = eˣ + C, ∫sin x dx = -cos x + C.",
          formula: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\quad \\int \\dfrac{1}{x}\\,dx = \\ln|x| + C, \\quad \\int e^x\\,dx = e^x + C",
        },
        {
          heading: "6. Fundamental Theorem of Calculus",
          content: "If F is an antiderivative of f, then ∫_a^b f(x) dx = F(b) - F(a). This connects differentiation and integration — they are inverse operations.",
          formula: "\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\text{where } F'(x) = f(x)",
        },
        {
          heading: "7. Integration by Parts",
          content: "For products: ∫u dv = uv - ∫v du. Choose u using LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
          formula: "\\int u\\,dv = uv - \\int v\\,du",
        },
      ],
      keyPoints: [
        "Derivative = instantaneous rate of change (slope of tangent)",
        "Integration = accumulation / area under curve",
        "Differentiation and integration are inverse operations",
        "Don't forget the constant of integration (+C) for indefinite integrals",
      ],
      commonMistakes: [
        "Forgetting the chain rule when differentiating composite functions",
        "Writing ∫xⁿ dx = xⁿ/n (should be xⁿ⁺¹/(n+1))",
        "Forgetting +C in indefinite integrals",
        "Confusing differentiation rules with integration rules",
      ],
      practiceQuestions: [
        "Find derivative of f(x) = x³ + 2x² - 5x + 3.",
        "Find d/dx[ln(sin x)].",
        "Evaluate ∫(3x² + 2x + 1) dx.",
        "Find ∫x·eˣ dx using integration by parts.",
        "Evaluate ∫₀¹ x²eˣ dx.",
      ],
      enrichedContent: {
        title: "Calculus — The Mathematics of Change",
        overview: "Calculus was invented to answer two questions that defeated mathematicians for two thousand years: how fast is something changing RIGHT NOW, and how much has accumulated over time? Its answer — the limit — lets you work with the infinitely small without ever dividing by zero. Derivatives turn curves into slopes, integrals turn slices into totals, and the Fundamental Theorem reveals they are two ends of one idea. Calculus is not a toolbox of formulas; it is the language in which the universe writes its laws.",
        sections: [
          {
            heading: "1. The Idea That Tamed Infinity — Limits",
            content: "The Greeks hit a wall: Zeno's paradoxes (an arrow must first cross half the distance, then half the rest, forever — so motion should be impossible) showed that naively using 'the infinitely small' leads to nonsense. Calculus's resolution is the LIMIT: you never actually reach the forbidden step (dividing by zero, summing infinitely many pieces); instead you prove the answer that the process APPROACHES as closely as anyone could ever demand. 'sin x/x → 1 as x → 0' does not mean the fraction equals 1 at zero (it is 0/0, undefined) — it means the values get arbitrarily close to 1 as x shrinks. Bishop Berkeley mocked Newton's infinitesimals as 'the ghosts of departed quantities,' and he was RIGHT: the early calculus lacked foundations. Cauchy and Weierstrass supplied them in the 1800s with the epsilon-delta definition — a game of precision: 'for ANY tolerance ε you name, I can find a δ-window where the function stays within ε of L.' Calculus is thus the rigorous art of reasoning about processes that never end, and it is why 0.999... = 1 exactly, why infinite series can have finite sums, and why Zeno's arrow does reach its target.",
            formula: "\\lim_{x\\to a} f(x) = L \\;\\iff\\; \\forall\\varepsilon>0\\;\\exists\\delta>0: 0<|x-a|<\\delta \\implies |f(x)-L|<\\varepsilon",
            keyPoints: [
              "Limits never perform the forbidden step — they certify the value the process approaches",
              "0/0 is not a number but a SIGNAL that structure is hiding; calculus extracts it",
              "ε-δ turned 'ghosts of departed quantities' into the most rigorous mathematics ever built",
            ],
          },
          {
            heading: "2. The Derivative — Every Curve Is a Straight Line in Disguise",
            content: "The deepest meaning of the derivative is LOCAL LINEARIZATION: zoom in far enough on any smooth curve and it becomes indistinguishable from its tangent line. f′(a) is the slope of that best-fitting line — the linear approximation f(a+h) ≈ f(a) + f′(a)h that powers everything from error estimation to physics to machine-learning gradient descent. This is why 'instantaneous velocity' is not a contradiction: over an infinitesimal time window, motion really IS uniform — the curve really is straight. The derivative is also a sensitivity meter: if y = f(x), then f′ tells you how much y moves per unit x — marginal cost in economics, reaction rate in chemistry, growth rate in biology, all the same object. The SECOND derivative reads curvature — how the rate itself changes: concave up (accelerating, f″>0) or concave down (decelerating). Points where f′ = 0 with a sign flip are peaks and valleys, which is why optimization = solve f′(x) = 0: at the top of a hill the tangent is flat. Nature itself seems to optimize — light takes least-time paths (Fermat), mechanics follows least-action paths — and calculus is how we find what nature has already found.",
            formula: "f'(a) = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}, \\qquad f(x) \\approx f(a) + f'(a)(x-a) \\;\\text{(local linearity)}",
            example: "Gradient descent — how AI learns: a loss function L(θ) measures error; the gradient ∇L points uphill, so stepping REPEATEDLY downhill (θ ← θ − η∇L) finds a minimum. The entire deep-learning revolution is the power rule and the chain rule, iterated billions of times.",
            keyPoints: [
              "Derivative = slope of the tangent = best linear approximation = sensitivity per unit change",
              "Zoom in enough and smooth curves are straight — that is instantaneous rate made rigorous",
              "Optimization lives where f′ = 0; f″ decides peak vs valley — and nature optimizes everywhere",
            ],
          },
          {
            heading: "3. The Integral — Accumulation Made Exact",
            content: "Integration answers: if you know the RATE, what is the TOTAL? Slice the total into thin pieces so small each is essentially constant, multiply rate × slice, and add them all up — in the limit of infinitely many infinitely thin slices, the sum becomes exact: ∫f(x)dx. This 'slice and accumulate' pattern is one idea wearing countless costumes: area under a curve (height × width slices), volume (cross-section slices), work (force × distance slices), probability (density slices), average value (total ÷ length), even centre of mass (position-weighted slices). The Riemann sum makes the machinery visible: with n slices the answer has error; as n → ∞ the error dies. That is why the integral sign ∫ is a stylized 'S' — for SUM. The constant of integration +C is the honest admission that accumulation from an unknown starting point is known only up to an offset: differentiation destroys the constant, integration cannot recover it, so the answer is a FAMILY of functions. Definite integrals (with limits a and b) escape this — the offset cancels between F(b) and F(a), which is the first hint of the Fundamental Theorem.",
            formula: "\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^{n} f(x_i)\\,\\Delta x, \\qquad \\int f\\,dx = F(x) + C",
            keyPoints: [
              "Integration = exact accumulation: slice thin, multiply, add, take the limit",
              "Area, volume, work, probability, averages — all are the same slice-and-sum pattern",
              "+C is a family, not a mistake: differentiation erases constants and integration cannot restore them",
            ],
          },
          {
            heading: "4. The Fundamental Theorem — The Two Problems Were One Problem",
            content: "Here is the shock that makes calculus a single subject. Finding tangent slopes (differentiation) and finding areas (integration) look utterly unrelated — one about steepness, one about size. The Fundamental Theorem says they are INVERSE operations: d/dx ∫ₐˣ f(t)dt = f(x). Unpack it: build the accumulated area as a function of its upper limit; ask how fast that accumulation grows as the limit moves; answer: exactly at the rate f(x). Accumulation's rate of change is the rate being accumulated. So the laborious limit-of-sums disappears: to total up f between a and b, find ANY antiderivative F and evaluate F(b) − F(a) — an algebraic subtraction replaces an infinite process. This is why tables of integrals exist, why your syllabus pairs each derivative rule with an integral twin, and why engineers can compute bridge loads and astronomers can integrate orbits: the theorem converts an impossible limit into a lookup. It is arguably the most consequential single result in mathematics — the bridge that unified two thousand years of separate geometry.",
            formula: "\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x), \\qquad \\int_a^b f(x)\\,dx = F(b) - F(a)",
            example: "The waterfall reading: water flows at rate f(t) litres/second; ∫₀^T f dt is the total volume that passed. The theorem says the volume-so-far's growth rate is exactly today's flow — obvious for water, revolutionary for arbitrary curves.",
            keyPoints: [
              "Slope problems and area problems are inverses — the discovery that unified mathematics",
              "F(b) − F(a): an infinite limit process collapses to two evaluations",
              "Any antiderivative works — the constants cancel, which is why definite integrals ignore +C",
            ],
          },
          {
            heading: "5. e and the Calculus of Growth",
            content: "Among all exponential bases, one is natural: e ≈ 2.71828, the unique base whose exponential is its OWN derivative, d/dx eˣ = eˣ. That self-similarity makes e the language of growth and decay. Any quantity whose rate of change is proportional to its current size obeys dy/dt = ky, and the ONLY solution is y = y₀e^{kt}: k > 0 gives explosion (populations with unlimited resources, chain reactions, viral videos, compound interest in the continuous limit), k < 0 gives decay (radioactivity, cooling, drug clearance from blood — every exponential half-life story). The number itself falls out of compounding: (1 + 1/n)ⁿ → e as n → ∞ — interest compounded continuously. Real growth is never unlimited; the logistic equation dy/dt = ky(1 − y/K) adds a carrying capacity K and produces the S-curve seen in every real population, every product adoption, every epidemic: exponential at first, bending, then saturating. Recognizing which regime you are in — exponential or logistic — is the single most practically useful piece of mathematical literacy, from pandemics to investment returns.",
            formula: "\\frac{dy}{dt} = ky \\implies y = y_0e^{kt}, \\qquad \\left(1+\\tfrac{1}{n}\\right)^n \\to e, \\qquad \\text{logistic: } \\frac{dy}{dt} = ky\\left(1-\\tfrac{y}{K}\\right)",
            keyPoints: [
              "eˣ is its own derivative — that self-similarity is why e runs all growth and decay",
              "Proportional growth (rate ∝ size) forces exponential form; nothing escapes it",
              "Logistic curves are exponentials with a ceiling — knowing which regime you are in is practical wisdom",
            ],
          },
          {
            heading: "6. Differential Equations — The Universe Runs on Calculus",
            content: "Physics does not hand you formulas; it hands you RULES about rates, and calculus turns rules into predictions. Newton's second law F = m·d²x/dt² is a differential equation: solve it with gravity and you get parabolic projectiles and elliptical orbits; solve it with a spring force and you get sine waves; with drag, terminal velocity. The heat equation, the wave equation, Maxwell's equations (light!), Schrödinger's equation (atoms!), the Lotka-Volterra predator-prey cycles of ecology, the Black-Scholes equation of finance, epidemic SIR models — all are differential equations, and all were decoded with the derivative-integral machinery. The pattern is universal: nature speaks locally (what happens next depends on the state NOW and its rates), and calculus is the tool that iterates local rules into global behaviour. Numerically, this is what computers do: take tiny time steps, apply the derivative rule, accumulate — Euler's method, the Riemann sum wearing a simulation's clothes. Every weather forecast, crash-test simulation and orbital insertion is integration at industrial scale. When Feynman said mathematics is 'unreasonably effective' in physics, differential equations are the exhibit.",
            formula: "F = m\\frac{d^2x}{dt^2}, \\qquad \\frac{\\partial u}{\\partial t} = \\alpha\\nabla^2 u \\;(\\text{heat}), \\qquad i\\hbar\\frac{\\partial\\psi}{\\partial t} = \\hat{H}\\psi \\;(\\text{Schrödinger})",
            keyPoints: [
              "Laws of nature are rate rules; differential equations are how rate rules become trajectories",
              "Same equation, different force: projectile, orbit, oscillation are all F = ma wearing costumes",
              "Computer simulation = Riemann sums in time — numerical calculus runs the modern world",
            ],
          },
        ],
        keyPoints: [
          "Limits tame infinity rigorously — you approach, you never divide by zero",
          "Derivatives linearize locally: slope, sensitivity, and the engine of gradient descent",
          "Integrals accumulate exactly: area, volume, work and probability are one slice-and-sum idea",
          "The Fundamental Theorem: rates and totals are inverses — F(b) − F(a) replaces infinite sums",
          "e is the self-derivative base: all proportional growth is exponential, all real growth is logistic",
          "The universe runs on differential equations; calculus is how we read its source code",
        ],
        commonMistakes: [
          "Treating 0/0 as 'undefined, stop' instead of 'a limit is hiding here'",
          "Forgetting the chain rule on composite functions — the single most common derivative error",
          "Omitting +C on indefinite integrals, or worrying about C on definite ones (it cancels)",
          "Confusing the derivative (rate) with the integral (accumulation) in word problems — ask which one the question wants",
          "Assuming exponential growth continues forever — real systems bend logistic; know the carrying capacity",
        ],
        practiceQuestions: [
          "Explain in your own words why sin x/x has a limit at 0 despite being 0/0 there — use the squeeze idea with a sketch.",
          "Use local linearization of √x at x = 100 to estimate √102 without a calculator; then bound your error using concavity.",
          "A balloon's radius grows at 2 cm/s. How fast is its volume growing when r = 10 cm? Identify the rate rule you wrote as a differential equation.",
          "Show that ∫₀¹ x² dx = 1/3 directly from a Riemann sum with n equal slices (use the formula for Σi²), and watch the Fundamental Theorem agree.",
          "A drug clears the bloodstream at 15% per hour. Write the differential equation, solve it, find the half-life, and determine when 10% of a dose remains.",
          "Fit the logistic idea to a rumour spreading through a school of 1000 students: write the equation, explain each regime of the S-curve, and say what data you would collect to estimate k and K.",
          "Differentiate y = e^{sin(x²)} completely; then explain how automatic differentiation in software applies exactly your chain-rule steps.",
        ],
      },
    },
    trigonometry: {
      title: "Trigonometry",
      overview: "Trigonometry studies relationships between angles and sides of triangles. Key identities, equations, and inverse functions are essential tools in calculus and beyond.",
      sections: [
        {
          heading: "1. Basic Ratios",
          content: "In a right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent = sin θ/cos θ. Remember SOH CAH TOA.",
          formula: "\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}",
        },
        {
          heading: "2. Pythagorean Identities",
          content: "The fundamental identity sin²θ + cos²θ = 1 generates two others by dividing by cos²θ or sin²θ.",
          formula: "\\sin^2\\theta + \\cos^2\\theta = 1, \\qquad 1 + \\tan^2\\theta = \\sec^2\\theta, \\qquad 1 + \\cot^2\\theta = \\csc^2\\theta",
        },
        {
          heading: "3. Double Angle Formulas",
          content: "Sin 2θ = 2sin θ cos θ. Cos 2θ has three forms: cos²θ - sin²θ, 2cos²θ - 1, 1 - 2sin²θ.",
          formula: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta",
        },
        {
          heading: "4. Sum and Difference",
          content: "sin(A ± B) = sin A cos B ± cos A sin B. cos(A ± B) = cos A cos B ∓ sin A sin B.",
          formula: "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B",
        },
        {
          heading: "5. Law of Sines and Cosines",
          content: "For any triangle: a/sin A = b/sin B = c/sin C. Law of cosines: c² = a² + b² - 2ab cos C.",
          formula: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}, \\qquad c^2 = a^2 + b^2 - 2ab\\cos C",
        },
      ],
      keyPoints: [
        "Period of sin/cos: 2π; period of tan: π",
        "All angles in radians for calculus",
        "sin²θ + cos²θ = 1 is the most important identity",
        "Law of sines/cosines work for ANY triangle, not just right triangles",
      ],
      commonMistakes: [
        "Using degrees instead of radians in calculus",
        "Forgetting that sin²θ means (sin θ)², not sin(θ²)",
        "Applying law of sines to find all angles without checking for ambiguous case",
        "Confusing sin(A+B) with sin A + sin B (they are NOT equal)",
      ],
      practiceQuestions: [
        "Find sin 75° using sum formula.",
        "Solve: 2sin²x - sin x - 1 = 0 for 0 ≤ x ≤ 2π.",
        "Prove: sin 2θ = 2tan θ/(1 + tan²θ).",
        "In triangle ABC, a = 5, b = 7, C = 60°. Find c.",
        "Find the general solution of tan θ = 1.",
      ],
      enrichedContent: {
        title: "Trigonometry — The Mathematics of Circles, Waves, and Rotation",
        overview: "Trigonometry is introduced with triangles, but that is its disguise. Its true subject is CIRCULAR MOTION — and therefore everything that repeats: pendulums, heartbeats, tides, alternating current, sound, light, seasons. Sin and cos are the coordinates of a point walking around a circle; every identity is a geometric fact in costume; and via Euler's formula, trigonometry turns out to be the imaginary half of exponentiation. Master the circle and the triangles solve themselves.",
        sections: [
          {
            heading: "1. The Unit Circle Is the Machine — Triangles Are Just Snapshots",
            content: "Forget SOH CAH TOA for a moment. The real definition: walk a distance θ around a circle of radius 1, and your coordinates ARE (cos θ, sin θ). That single moving point generates everything — the right-triangle ratios are just snapshots of it, and the 'signs in quadrants' confusion dissolves because x- and y-coordinates have obvious signs. Radians are the native unit of this machine: θ in radians is literally the arc length walked, which is why they are indispensable in calculus. Degrees are an arbitrary Babylonian tax (360 = a divisible number of days per year); in degrees, d/dx sin x = (π/180) cos x — an ugly toll on every derivative. In radians the circle's geometry and the calculus interlock perfectly: lim sin x/x = 1 exactly, d/dx sin x = cos x exactly. This is the deep reason your textbook says 'always use radians': it is not pedantry, it is choosing units where the mathematics has no friction.",
            formula: "(\\cos\\theta,\\ \\sin\\theta) = \\text{position after walking } \\theta \\text{ around the unit circle}; \\qquad 2\\pi\\ \\text{rad} = 360°",
            keyPoints: [
              "Sin and cos are the y- and x-coordinates of circular motion — triangles are frozen frames of the walk",
              "Radians = arc length on the unit circle; calculus formulas are clean ONLY in radians",
              "Quadrant signs are just coordinate signs — no memorization needed",
            ],
          },
          {
            heading: "2. The Master Identity Is Just Pythagoras on a Circle",
            content: "sin²θ + cos²θ = 1 is not a trigonometric fact — it is the equation of the unit circle, x² + y² = 1, evaluated at the walking point. Every other identity descends from geometry the same way. Divide the master identity by cos²θ and 1 + tan²θ = sec²θ falls out — algebra on the same circle. The sum formulas look like memorization burden, but they are statements about ROTATION: adding angles is composing rotations, and composing rotations multiplies their coordinate transformations. The cleanest proof of cos(A−B) uses the distance formula between two points on the circle — pure Pythagoras. Once you see identities as geometry wearing algebra's clothes, you stop memorizing and start deriving: any identity can be rebuilt from the circle in seconds. This is also why trigonometry and complex numbers will merge later — both are secretly about rotation.",
            formula: "\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B \\;\\text{(from the distance formula on the circle)}; \\qquad \\sin^2+\\cos^2=1 \\iff x^2+y^2=1",
            example: "Derive-on-demand trick: need sin 2θ? Set A = B = θ in the sine sum formula: sin(θ+θ) = sinθcosθ + cosθsinθ = 2sinθcosθ. Every double-angle formula is a sum formula with equal inputs — nothing to memorize.",
            keyPoints: [
              "The master identity is the unit circle equation — trigonometry's root axiom",
              "Sum formulas = rotation composition; derive any identity from the circle instead of memorizing",
              "Double angles are sum formulas in disguise (A = B)",
            ],
          },
          {
            heading: "3. Sinusoids — The Shape That Preserves Itself",
            content: "Why do sine waves appear everywhere in nature — sound, AC power, radio, vibrating strings, springs, quantum states? Because a sinusoid is the unique shape that reproduces itself under differentiation: differentiate sin and you get cos, differentiate again and you get −sin — the family {sin, cos} is closed. Any system whose acceleration is proportional to its displacement (spring, pendulum, LC circuit) therefore MUST oscillate sinusoidally; the sine is not a description of the motion, it is forced by the equation. This self-preservation makes sinusoids the 'atoms of vibration.' Their anatomy is universal: amplitude (size), frequency (speed of repetition), phase (offset in the cycle) — and the superposition principle: waves add pointwise, which is why noise-cancelling headphones work (add the anti-phase wave and silence results), why chords sound like chords (frequencies stack), and why ripples pass through each other unharmed. The projection view completes the circle: uniform circular motion seen edge-on IS a sinusoid — the shadow of a point on a spinning wheel moves in perfect simple harmonic motion. Cosines are just sines shifted by π/2; phase is the only difference.",
            formula: "y = A\\sin(\\omega t + \\phi), \\qquad \\frac{d^2y}{dt^2} = -\\omega^2 y \\;\\iff\\; \\text{sinusoidal motion}",
            keyPoints: [
              "Sinusoids are closed under differentiation — any restoring-force system is forced to oscillate as one",
              "Circular motion viewed edge-on IS simple harmonic motion — the wheel's shadow is a sine wave",
              "Superposition makes waves add: chords, noise cancellation and passing ripples are one principle",
            ],
          },
          {
            heading: "4. Euler's Formula — Trigonometry Is Exponentiation in Disguise",
            content: "The most remarkable formula in mathematics, per Feynman: e^{iθ} = cos θ + i sin θ. It fuses the exponential function with circular motion: multiplying by e^{iθ} ROTATES the complex plane by angle θ. Trigonometry is therefore not a separate subject but the imaginary slice of exponentiation — which is why sin and cos inherit exponential properties, why their Taylor series interleave (e^{ix} splits into the cos series plus i times the sin series), and why oscillation and growth are two faces of one function. The formula's most famous special case: at θ = π, e^{iπ} + 1 = 0 — five fundamental constants (e, i, π, 1, 0) from analysis, algebra, geometry, arithmetic and nothingness, bound in one equation. Practically, Euler's formula is the working engine of electrical engineering: AC circuit analysis, signal processing and quantum mechanics all use complex exponentials because multiplication (rotation) is simpler than addition of angles — then take the real part at the end. Trigonometric identities become one-line algebra: e^{i(A+B)} = e^{iA}·e^{iB} expanded IS the sum formulas.",
            formula: "e^{i\\theta} = \\cos\\theta + i\\sin\\theta, \\qquad e^{i\\pi} + 1 = 0, \\qquad \\cos\\theta = \\frac{e^{i\\theta}+e^{-i\\theta}}{2}",
            keyPoints: [
              "Multiplying by e^{iθ} = rotating by θ — trigonometry is the geometry of complex exponentials",
              "e^{iπ} + 1 = 0 unites the five most fundamental constants in one equation",
              "Sum formulas collapse to exponent laws under Euler — identities become algebra",
            ],
          },
          {
            heading: "5. Measuring the Unreachable — Triangulation Since the Ancients",
            content: "Solving triangles is the oldest scientific instrument. With one measured baseline and two angles, the laws of sines and cosines deliver distances you cannot walk: Eratosthenes measured Earth's circumference (240 BC) by comparing shadow angles at Syene and Alexandria — pure trigonometry, accurate within a few percent. Parallax extends it to the stars: observe a star from opposite sides of Earth's orbit (baseline = 2 AU), measure its tiny angular shift, and distance = baseline/angle — this is how the cosmic distance ladder's first rung is built, and why 'parsec' means PARallax-arcSECond. The same geometry runs GPS (trilateration with clocks), surveying, artillery, camera focus and 3D game engines. The ambiguous case deserves respect because it is honest: given two sides and a non-included angle (SSA), the swinging side can land in two places, one place, or nowhere — zero, one or two valid triangles. Mathematics that admits multiple answers is not broken; it is reporting that your measurements genuinely underdetermine the world.",
            formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R \\;(\\text{circumradius!}), \\qquad d_{\\text{star}} = \\frac{1\\ \\text{AU}}{\\tan p}",
            example: "The law of sines hides a bonus: the common ratio equals 2R, the diameter of the triangle's circumscribed circle. Every triangle you solve also tells you the size of the unique circle passing through its three corners.",
            keyPoints: [
              "One baseline + angles = any distance: Earth's size, star distances, GPS fixes — all triangulation",
              "SSA ambiguity is real geometry: the swinging side can reach zero, one, or two triangles",
              "The law of sines' ratio is the circumdiameter — a circle hiding in every triangle",
            ],
          },
          {
            heading: "6. Fourier — Every Wave Is a Chord of Sines",
            content: "The crowning result: ANY periodic signal — a violin note, a heartbeat trace, your voice, a JPEG image row — can be written exactly as a sum of sinusoids of different frequencies, amplitudes and phases. Fourier's theorem means sinusoids are a complete BASIS for waves, the way x, y, z are a basis for space: every signal has a unique 'frequency fingerprint' (its spectrum). This single idea powers the modern world: MP3 and audio codecs discard sine components your ear cannot hear; JPEG does the same to image blocks your eye cannot see; Wi-Fi and mobile networks stack thousands of sine carriers (OFDM) to pack data; MRI reconstructs images from raw frequency data that was never a picture; noise cancellation identifies the offending frequency and subtracts exactly that sine. Even solving the heat equation — how temperature smooths out in a bar of metal — was Fourier's original motive: sinusoids are the heat equation's natural shapes, each decaying at its own rate. When you hear 'frequency analysis,' 'spectrum,' or 'bandwidth,' the machinery underneath is trigonometry at industrial scale: the humble unit circle, decomposing the world into its harmonics.",
            formula: "f(t) = \\sum_{n} A_n \\sin(n\\omega t + \\phi_n) \\;\\text{(any periodic signal)}",
            keyPoints: [
              "Sinusoids form a complete basis: every periodic signal is a sum of them — uniquely",
              "Compression, Wi-Fi, MRI and noise cancellation all run on Fourier decomposition",
              "'Spectrum' = a signal's fingerprint in frequency space — the same information, seen through the circle",
            ],
          },
        ],
        keyPoints: [
          "The unit circle is the machine; (cosθ, sinθ) is the walking point; triangles are snapshots",
          "Radians make calculus frictionless — degrees add a π/180 toll to every derivative",
          "All identities are circle geometry in disguise; derive, don't memorize",
          "Sinusoids are self-preserving under differentiation — nature's default oscillation",
          "Euler: rotation = complex multiplication; Fourier: every wave = a chord of sines",
        ],
        commonMistakes: [
          "Using degrees where calculus demands radians — d/dx sin x = cos x is FALSE in degrees",
          "Believing sin(A+B) = sin A + sin B — rotation does not distribute over addition",
          "Memorizing identities instead of deriving from the circle — memory fails under exam pressure, geometry doesn't",
          "Accepting the first law-of-sines angle without checking the ambiguous SSA case for a second solution",
          "Confusing frequency with amplitude when sketching waves — one stretches horizontally, the other vertically",
        ],
        practiceQuestions: [
          "A point walks the unit circle at 1 rad/s. Write its coordinates at t, prove its shadow (y-projection) obeys d²y/dt² = −y, and conclude the shadow moves as a sinusoid.",
          "Derive cos(A−B) from the distance formula between two points on the unit circle; then obtain all remaining sum/difference formulas from it algebraically.",
          "Use Euler's formula to prove sin 2θ = 2 sinθ cosθ in two lines — no geometric diagram allowed.",
          "From a 100 m baseline, the angles to a tower top are 30° and 45° at the two ends. Compute the tower's height — the classical surveying problem.",
          "Solve the ambiguous case: a = 7, b = 10, A = 30°. Find how many triangles fit and solve each completely.",
          "A note played on a guitar has spectrum peaks at 110, 220, 330 and 440 Hz with decreasing amplitudes. Identify the fundamental, the harmonics, and explain in Fourier terms why it sounds like one note rather than four.",
          "Explain why noise-cancelling headphones cannot cancel a sudden loud bang as well as a steady engine drone — answer using phase, prediction, and the Fourier view.",
        ],
      },
    },
    algebra: {
      title: "Algebra — Matrices, Determinants, and Complex Numbers",
      overview: "Matrix algebra handles arrays of numbers with operations like addition, multiplication, and inversion. Determinants help solve systems of equations. Complex numbers extend the real number system.",
      sections: [
        {
          heading: "1. Matrix Operations",
          content: "Matrices are rectangular arrays. Addition: element-wise. Scalar multiplication: multiply each element. Matrix multiplication: row-by-column dot product. AB ≠ BA in general (not commutative).",
          formula: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}",
        },
        {
          heading: "2. Determinant (2×2)",
          content: "For A = [[a,b],[c,d]], det(A) = ad - bc. Properties: det(AB) = det(A)·det(B), det(Aᵀ) = det(A), det(A⁻¹) = 1/det(A).",
          formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
        },
        {
          heading: "3. Inverse of a Matrix",
          content: "For 2×2 matrix: A⁻¹ = (1/det(A))·[[d,-b],[-c,a]]. A matrix has an inverse only if det(A) ≠ 0 (non-singular).",
          formula: "A^{-1} = \\dfrac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
        },
        {
          heading: "4. Complex Numbers",
          content: "i² = -1. A complex number z = a + bi has real part a and imaginary part b. Conjugate: z̄ = a - bi. Modulus: |z| = √(a² + b²). Multiplying by conjugate: (a+bi)(a-bi) = a² + b².",
          formula: "i^2 = -1, \\qquad |a+bi| = \\sqrt{a^2 + b^2}, \\qquad (a+bi)(a-bi) = a^2 + b^2",
        },
        {
          heading: "5. Quadratic Formula",
          content: "For ax² + bx + c = 0: x = (-b ± √(b²-4ac))/(2a). Discriminant D = b²-4ac determines nature of roots: D > 0 (two real), D = 0 (one repeated), D < 0 (complex).",
          formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        },
      ],
      keyPoints: [
        "Matrix multiplication is not commutative (AB ≠ BA)",
        "Conjugate of a + bi is a - bi",
        "det(AB) = det(A)·det(B)",
        "A matrix is invertible iff det(A) ≠ 0",
      ],
      commonMistakes: [
        "Assuming AB = BA for matrices",
        "Writing √(-4) = 2i (should be 2i, but √(-9) = 3i not -3i — principal root)",
        "Forgetting that complex roots come in conjugate pairs for real-coefficient equations",
      ],
      practiceQuestions: [
        "Find determinant of [[2,3],[1,4]].",
        "Find the inverse of [[1,2],[3,4]].",
        "Solve: z² - 4z + 13 = 0.",
        "If A = [[2,1],[1,3]], find A² and A⁻¹.",
        "Find the modulus and conjugate of z = 3 + 4i.",
      ],
      enrichedContent: {
        title: "Algebra — Matrices as Machines, Complex Numbers as Rotations",
        overview: "Matrices are not tables of numbers; they are MACHINES that transform space — spinning, stretching and shearing it — and matrix multiplication is running one machine after another. Determinants measure how much a machine scales areas, inverses undo machines, and complex numbers turn out to be the algebra of rotation and scaling combined. Seen this way, linear algebra is the geometry of data: the mathematics behind computer graphics, Google's ranking, quantum states and every neural network.",
        sections: [
          {
            heading: "1. A Matrix Is a Transformation, Not a Table",
            content: "The picture that unlocks everything: a 2×2 matrix M tells you where the basis vectors land — the first column is where î = (1,0) goes, the second where ĵ = (0,1) goes — and every other point is dragged along consistently, grid lines staying parallel and evenly spaced. The rotation matrix [[cosθ, −sinθ],[sinθ, cosθ]] literally spins the plane; [[2,0],[0,2]] inflates it; [[1,1],[0,1]] shears it (a deck-of-cards slide). Matrix multiplication AB now reads as COMPOSITION: apply B's transformation first, then A's. And the notorious fact AB ≠ BA stops being an algebraic annoyance and becomes obvious geometry: rotate then shear ≠ shear then rotate — try it with a book. This is why linear algebra runs computer graphics: every 3D scene is points transformed by stacked matrices (model × view × projection), and your GPU is fundamentally a matrix-multiplication engine. Vectors themselves are the points; matrices are the verbs that act on them.",
            formula: "R_\\theta = \\begin{pmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix} \\;(\\text{rotation}), \\qquad (AB)\\vec{x} = A(B\\vec{x}) \\;(\\text{composition})",
            keyPoints: [
              "Columns of a matrix = destinations of the basis vectors; the whole grid follows linearly",
              "Matrix multiplication = composition of transformations — order matters because transformations do",
              "Graphics pipelines, robotics and neural networks are all stacked matrix machines",
            ],
          },
          {
            heading: "2. The Determinant — How Much Does the Machine Scale Area?",
            content: "det(A) answers one geometric question: by what factor does the transformation stretch areas (volumes in 3D)? The unit square becomes a parallelogram of area |det|. This single meaning explains every determinant 'rule' you memorized: det(AB) = det A · det B because scaling by B then by A scales areas by the product; det = 0 means the machine CRUSHES space into a lower dimension — a plane squashed onto a line loses all area, information is destroyed, and no machine can un-crush it (no inverse exists — that is WHY singular matrices have no inverse, not just that they don't); negative determinant means the transformation FLIPS orientation (like viewing space in a mirror) while still scaling area by |det|. The 2×2 formula ad − bc stops being arbitrary once you see it as the signed area of the parallelogram spanned by the columns. Determinants also compute volumes in physics (Jacobians when changing coordinates in multiple integrals are exactly this area-scaling idea in calculus clothing).",
            formula: "\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc \\;(\\text{signed area of the column parallelogram}), \\qquad \\det(AB) = \\det A \\cdot \\det B",
            example: "Quick singularity test with meaning: [[2,1],[4,2]] — the second column is exactly twice the first, so the 'parallelogram' is flat (area zero), det = 0: the machine squashes the whole plane onto one line. Information destroyed, inverse impossible.",
            keyPoints: [
              "|det| = area-scaling factor; sign = orientation kept or flipped",
              "det = 0 ⇔ space crushed to lower dimension ⇔ information lost ⇔ no inverse",
              "det(AB) = detA·detB is just 'scaling twice = multiplying the scalings'",
            ],
          },
          {
            heading: "3. Inverses and Systems — Solving 'What Input Gave This Output?'",
            content: "If a matrix is a machine, its inverse is the machine run backwards: A⁻¹ undoes A exactly (AA⁻¹ = I, the do-nothing machine). Solving the linear system A𝐱 = 𝐛 is the universal question 'what input 𝐱 produces this output 𝐛?' — and the answer 𝐱 = A⁻¹𝐛 exists precisely when the machine destroys no information (det ≠ 0). Gaussian elimination is the practical algorithm: add multiples of equations to each other (operations that never change the solution set) until the system becomes triangular and solvable by back-substitution — the same row operations, applied to I, BUILD A⁻¹. Linear systems are everywhere in disguise: circuit analysis (Kirchhoff's rules give one), structural engineering (force balance in a truss), economics (input-output models — Leontief's Nobel-winning work is matrix algebra), least-squares fitting of data, and the steady states of Markov chains. A deep fact ties it together: A𝐱 = 𝐛 has a unique solution for every 𝐛 if and only if det A ≠ 0 if and only if A's columns are independent — invertibility, non-crushing, and independence are three names for one property.",
            formula: "A\\vec{x} = \\vec{b} \\implies \\vec{x} = A^{-1}\\vec{b}, \\qquad AA^{-1} = I, \\qquad \\det A \\neq 0 \\iff A \\text{ invertible}",
            keyPoints: [
              "Solving a system = running the machine backwards; elimination = building the reverse machine",
              "Invertible ⇔ det ≠ 0 ⇔ columns independent — one property, three disguises",
              "Circuits, trusses, economies and data fitting are all linear systems in costume",
            ],
          },
          {
            heading: "4. Complex Numbers — i Is a Quarter Turn",
            content: "'Imaginary' is history's worst name — i is completely real, it is just not a NUMBER along the line, it is a ROTATION. Multiplying by i turns any point 90° counterclockwise in the plane; multiply twice and you have turned 180° — which is exactly multiplication by −1. So i² = −1 is not a paradox, it is geometry: two quarter-turns make a half-turn. A complex number a + bi is simply the POINT (a, b) in the plane; adding complexes adds points; MULTIPLYING them multiplies their lengths and ADDS their angles — complex multiplication is scale-and-rotate in one operation. This is why complex numbers are the natural algebra of oscillation: Euler's formula e^{iθ} = cosθ + i sinθ (from trigonometry) says the unit circle IS the exponential function with imaginary exponents, and AC circuit analysis, signal processing and quantum mechanics all run on it because waves are rotations. The modulus |z| = √(a²+b²) is the distance from origin; the conjugate a − bi is the mirror image across the real axis, and z·z̄ = |z|² is real — which is why dividing by a complex means multiplying by its conjugate. And the Fundamental Theorem of Algebra crowns the extension: over the complex numbers, EVERY polynomial factors completely — n roots for degree n, no exceptions. The complex plane is algebra's promised land.",
            formula: "i = e^{i\\pi/2} \\;(90° \\text{ rotation}), \\qquad z = re^{i\\theta} \\;(\\text{polar form}), \\qquad z_1z_2 = r_1r_2 e^{i(\\theta_1+\\theta_2)}",
            example: "Solve z² = i geometrically: you need a rotation that, applied twice, gives 90° — so z is a 45° rotation: z = (√2/2)(1 + i) (and its opposite −z, the 225° rotation). No algebra needed; the circle does the work.",
            keyPoints: [
              "i = 90° rotation; i² = −1 is two quarter-turns, pure geometry",
              "Complex multiplication = multiply lengths, add angles — rotation and scaling unified",
              "Over ℂ every polynomial has exactly n roots — the complex numbers complete algebra",
            ],
          },
          {
            heading: "5. The Dot Product — Measuring Alignment",
            content: "The dot product 𝐚·𝐛 = |a||b|cosθ is a similarity meter: it answers 'how much does 𝐚 point along 𝐛?' Maximum when aligned (cos = 1), zero when perpendicular (the algebraic test for orthogonality — which is why perpendicular lines have slopes multiplying to −1), negative when opposed. Its two faces — geometric (|a||b|cosθ) and algebraic (Σaᵢbᵢ) — are equal, and that equality is a theorem, not a definition to swallow. The faces power different applications: the geometric side gives WORK in physics (W = F·d — only the force component along motion counts), projections (the shadow of one vector on another), and the angle between any two things; the algebraic side gives least-squares fitting (the normal equations ARE dot-product orthogonality conditions) and machine learning's workhorse — cosine similarity between feature vectors, which is how search engines judge that two documents are 'about the same thing' regardless of length. The Cauchy-Schwarz inequality |𝐚·𝐛| ≤ |a||b| is simply the statement that cosθ ≤ 1 — the deepest facts of linear algebra are often trigonometry in disguise.",
            formula: "\\vec{a}\\cdot\\vec{b} = \\sum a_ib_i = |\\vec{a}||\\vec{b}|\\cos\\theta, \\qquad \\text{proj}_{\\vec{b}}\\vec{a} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}",
            keyPoints: [
              "Dot product = alignment meter: positive alike, zero perpendicular, negative opposed",
              "Work, projections, least squares and document similarity are all dot products",
              "Cauchy-Schwarz is just cosθ ≤ 1 — geometry hiding inside an algebraic inequality",
            ],
          },
          {
            heading: "6. Eigenvectors — The Directions a Machine Refuses to Turn",
            content: "Ask any transformation matrix a strange question: are there directions that do NOT get rotated — vectors the machine only stretches or squashes, leaving their line intact? Those are eigenvectors, and their stretch factors are eigenvalues: A𝐯 = λ𝐯. Every 'diagonalization' trick in mathematics is the search for the viewpoint (the eigenbasis) in which a complicated machine becomes a simple list of stretches — the matrix equivalent of rotating your head until a tilted ellipse looks axis-aligned. This is not abstract ornament: Google's original PageRank was the eigenvector of the web's link matrix (the steady importance distribution); Markov chains converge to their dominant eigenvector (why long-run probabilities stabilize); quantum mechanics says measurement outcomes ARE eigenvalues of operators (energy levels of atoms are literally an eigenvector problem — Schrödinger's equation is Ĥψ = Eψ); vibration analysis finds a bridge's natural frequencies as eigenvalues; principal component analysis (PCA) reduces data dimensions by keeping the eigenvectors of greatest variance. Eigen-thinking is the deepest habit in applied mathematics: find the directions nature treats simply, and every problem decomposes along them.",
            formula: "A\\vec{v} = \\lambda\\vec{v} \\iff \\det(A - \\lambda I) = 0 \\;(\\text{characteristic equation})",
            example: "Why atoms have discrete energy levels, in one line: the electron's wavefunction must be an eigenvector of the Hamiltonian operator, and eigenvectors exist only at specific eigenvalues — quantization is linear algebra, not magic.",
            keyPoints: [
              "Eigenvectors = directions a transformation only stretches; eigenvalues = the stretch factors",
              "Diagonalization = finding the natural viewpoint where the machine is simple",
              "PageRank, quantum levels, bridge resonances and PCA are all eigenvector problems",
            ],
          },
        ],
        keyPoints: [
          "Matrices are machines: columns show where basis vectors land; multiplication composes them",
          "Determinant = signed area scaling; zero means crushed space and lost information",
          "Solving A𝐱 = 𝐛 is running the machine backwards; invertible ⇔ det ≠ 0 ⇔ independent columns",
          "i is a 90° rotation — complex multiplication is scale-and-rotate; ℂ completes every polynomial",
          "Dot product measures alignment; eigenvectors are nature's preferred directions",
        ],
        commonMistakes: [
          "Treating matrix multiplication as commutative — transformations do not commute in general",
          "Computing det as 'a formula' without knowing it means signed area — then det = 0 singularity is memorized instead of understood",
          "Calling i 'imaginary' or 'unreal' — it is a rotation, as concrete as a compass turn",
          "Dividing by a complex number by 'dividing parts' — multiply by the conjugate instead",
          "Confusing eigenvalues with arbitrary scalars — they exist only along special directions, found via det(A − λI) = 0",
        ],
        practiceQuestions: [
          "Write the matrix that rotates by 90° and the one that shears x by y. Multiply both orders and explain geometrically why the results differ.",
          "Show that det = 0 for [[3,6],[1,2]] and interpret: onto what line does this machine crush the plane?",
          "Solve the system 2x + y = 5, x − y = 1 by elimination, then by computing A⁻¹ explicitly — verify both agree.",
          "Solve z² = −i geometrically (as a rotation problem) and algebraically; confirm the two answers match.",
          "Prove that perpendicular lines have slopes multiplying to −1 using the dot product of their direction vectors.",
          "Find the eigenvalues and eigenvectors of [[2,1],[1,2]] and describe the transformation geometrically in the eigenbasis.",
          "A Markov chain has matrix [[0.8,0.3],[0.2,0.7]]. Find its steady-state eigenvector (λ = 1) and explain why long-run probabilities stop changing.",
        ],
      },
    },
    statistics: {
      title: "Statistics and Probability",
      overview: "Statistics summarizes and analyzes data. Probability quantifies uncertainty. Key concepts include measures of central tendency, dispersion, and fundamental probability rules.",
      sections: [
        {
          heading: "1. Measures of Central Tendency",
          content: "Mean: x̄ = Σxᵢ/n. Median: middle value when data is ordered. Mode: most frequent value. Mean is affected by outliers; median is robust.",
          formula: "\\bar{x} = \\dfrac{\\sum_{i=1}^{n} x_i}{n}",
        },
        {
          heading: "2. Variance and Standard Deviation",
          content: "Variance measures spread: σ² = Σ(xᵢ - μ)²/n. Standard deviation is the square root: σ = √σ². For sample data, use n-1 in denominator (unbiased estimator).",
          formula: "\\sigma^2 = \\dfrac{\\sum (x_i - \\mu)^2}{n}, \\qquad \\sigma = \\sqrt{\\sigma^2}",
        },
        {
          heading: "3. Probability Basics",
          content: "P(E) = n(E)/n(S) for equally likely outcomes. P(A∪B) = P(A) + P(B) - P(A∩B). For independent events: P(A∩B) = P(A)·P(B).",
          formula: "P(E) = \\dfrac{n(E)}{n(S)}, \\qquad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        },
        {
          heading: "4. Conditional Probability and Bayes' Theorem",
          content: "P(A|B) = P(A∩B)/P(B). Bayes' theorem: P(Aᵢ|B) = P(B|Aᵢ)·P(Aᵢ) / ΣP(B|Aⱼ)·P(Aⱼ).",
          formula: "P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}, \\qquad P(A_i|B) = \\dfrac{P(B|A_i)\\cdot P(A_i)}{\\sum_j P(B|A_j)\\cdot P(A_j)}",
        },
        {
          heading: "5. Binomial Distribution",
          content: "For n independent trials with success probability p: P(X = k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ. Mean = np, variance = np(1-p).",
          formula: "P(X = k) = \\binom{n}{k}\\,p^k\\,(1-p)^{n-k}",
        },
      ],
      keyPoints: [
        "Mean is affected by outliers; median is robust",
        "Standard deviation measures average distance from the mean",
        "P(A∩B) = P(A)·P(B) only for independent events",
        "Binomial requires: fixed n, independent trials, constant p, two outcomes",
      ],
      commonMistakes: [
        "Using population formula (divide by n) for sample data (should divide by n-1)",
        "Adding probabilities for independent events (should multiply for intersection)",
        "Confusing permutation with combination (order matters in permutation)",
        "Applying binomial distribution when trials are not independent",
      ],
      practiceQuestions: [
        "Find mean, median, and mode of: 2, 3, 3, 4, 5, 5, 5, 6.",
        "A die is rolled twice. Find P(sum = 7).",
        "In a class, 60% study math, 50% study physics, 30% study both. Find P(studying math or physics).",
        "A bag has 3 red and 2 blue balls. Two balls are drawn without replacement. Find P(both red).",
        "Find the probability of getting exactly 3 heads in 5 coin tosses.",
      ],
      enrichedContent: {
        title: "Statistics — Reading the World Through Uncertainty",
        overview: "Statistics is the science of learning about a population you cannot fully see, from a sample you can — with honest error bars. Probability runs the other direction: given the rules, predict the data. Together they are the mathematics of evidence: why averages mislead, why 'significant' results can be meaningless, why a 99%-accurate test can be mostly wrong, and why randomness looks nothing like what people expect. Statistical literacy is not exam skill — it is self-defence in a world of data.",
        sections: [
          {
            heading: "1. The Sample and the Population — Statistics Is Inverse Probability",
            content: "Probability asks: I know the machine (a fair die), what data will it produce? Statistics asks the inverse, harder question: I only see the DATA, what machine produced it? You never observe the population — only samples of it — and every statistical tool is a bridge across that gap with a stated uncertainty. The bridge works because of a profound fact: sample averages behave predictably even when individual data points do not. One voter is chaos; ten thousand voters polled is a measurement with known precision. This is why polling, clinical trials, quality control and election forecasts are possible at all — and why their failure modes are always the same: the sample stopped being representative (selection bias), or was too small for the question (noise mistaken for signal). The cardinal rule: HOW the data was collected matters more than any formula applied afterwards. A biased million-row dataset tells you less than a random hundred.",
            formula: "\\text{population } (\\mu, \\sigma) \\;\\xrightarrow{\\text{sample}}\\; \\text{statistics } (\\bar{x}, s) \\;\\xrightarrow{\\text{inference}}\\; \\text{estimates with error bars}",
            keyPoints: [
              "Probability predicts data from rules; statistics infers rules from data — inverses of each other",
              "You never see the population; every statistic is an estimate with attached uncertainty",
              "Sampling method beats sample size: a biased million tells less than a random hundred",
            ],
          },
          {
            heading: "2. Averages Can Lie — Central Tendency and Its Traps",
            content: "'The average' is three different numbers wearing one name. The MEAN uses every value and is therefore dragged by outliers: one billionaire walking into a bar makes the 'average wealth' inside exceed ₹100 crore while every actual person remains ordinary — the median barely moves. The MEDIAN is the position-based middle, immune to extremes, which is why income and house prices are always quoted as medians. The MODE is the popularity winner, the only sensible average for categories. The deeper trap is SHAPE: a distribution can be symmetric (mean ≈ median), skewed (mean pulled toward the tail — right-skewed incomes, left-skewed exam scores where most score high), or BIMODAL — and for bimodal data every average is a fiction. The classic: 'average' human body temperature blends two populations; average family size of 2.4 children describes no family; average of a 50/50 mix of hot and cold water is lukewarm, but the mix of two DESERT climates (noon 45°, midnight 5°) averages a pleasant 25° that never exists. Always ask: what does the distribution LOOK like? A histogram is worth ten averages.",
            formula: "\\text{right-skew: mean} > \\text{median}; \\quad \\text{left-skew: mean} < \\text{median}; \\quad \\text{symmetric: equal}",
            keyPoints: [
              "Mean = value-sensitive (outliers drag it); median = position-based (robust); mode = most frequent",
              "Skew direction is readable from mean vs median — a free diagnostic",
              "For bimodal data, every average describes nobody; demand the histogram",
            ],
          },
          {
            heading: "3. Spread, the Normal Curve, and Why It Appears Everywhere",
            content: "The mean says where the centre is; the standard deviation says what 'typical' means — roughly the average distance of data from the centre. Squaring the deviations (rather than absolute values) punishes outliers and makes the mathematics differentiable, and dividing by n−1 for samples corrects a subtle bias (the sample mean is fitted to the same data, slightly underestimating true spread). The reason σ matters so much: an astonishing range of phenomena — heights, measurement errors, exam scores, molecular speeds — pile up into the same bell shape, the NORMAL distribution, and it obeys the 68-95-99.7 rule (within 1σ, 2σ, 3σ). This is not coincidence but the Central Limit Theorem: when many small INDEPENDENT effects add up, their sum is approximately normal regardless of the individual shapes. Noise averages into the bell. Two practical superpowers follow. First, standardization: the z-score (x−μ)/σ measures any value in 'typical distances,' letting you compare a maths mark with a physics mark on one scale. Second, REGRESSION TO THE MEAN: extreme performances are partly luck, so they naturally drift back — the reason a student's miraculous 98% tends to settle, why 'sophomore slumps' follow breakout seasons, and why reward-and-punishment studies famously mislead (coaches punish great performances, which regress anyway, concluding punishment works).",
            formula: "\\sigma = \\sqrt{\\frac{\\sum(x_i-\\bar{x})^2}{n-1}}, \\qquad z = \\frac{x-\\mu}{\\sigma}, \\qquad 68\\%-95\\%-99.7\\% \\text{ within } 1\\sigma\\text{-}2\\sigma\\text{-}3\\sigma",
            keyPoints: [
              "σ defines 'typical'; n−1 corrects the sample's built-in optimism about spread",
              "The Central Limit Theorem: sums of many independent effects are normal — why the bell is universal",
              "z-scores put anything on one scale; regression to the mean makes extremes temporary",
            ],
          },
          {
            heading: "4. Bayes — Updating Beliefs Like a Scientist Should",
            content: "Conditional probability P(A|B) is belief AFTER seeing evidence; Bayes' theorem is the exact machinery for updating. Its most counterintuitive lesson is the BASE RATE: evidence must be weighed against how common the thing already is. The medical example that breaks most intuitions: a disease affects 1 in 1000 people; a test is 99% accurate (both directions). You test positive — probability you actually have it? Not 99%. Out of 100,000 people: 100 are sick (~99 test positive), and of the 99,900 healthy, ~1% = ~999 FALSE positives. So ~99 true positives hide among ~1098 total positives → P(sick | positive) ≈ 9%. The test is excellent; the base rate is rare, and rarity wins. This single calculation explains why screening programs re-test before treating, why '99% accurate' face recognition fails catastrophically against a million-person database, and why extraordinary claims require extraordinary evidence — with weak prior odds, strong likelihood ratios are needed. Bayes also exposes Simpson's paradox: aggregated data can reverse when groups differ in size and base rates (a treatment can look worse overall while being better in EVERY subgroup). The habit Bayes installs: never ask 'what does the evidence show?' alone — always ask 'evidence, GIVEN what I already believed?'",
            formula: "P(A|B) = \\frac{P(B|A)\\,P(A)}{P(B)}, \\qquad \\text{posterior} \\propto \\text{likelihood} \\times \\text{prior}",
            example: "The 9%-shocker restated as a formula: P(sick|+) = (0.99 × 0.001) / (0.99×0.001 + 0.01×0.999) ≈ 0.09. Prior 0.001, likelihood 0.99, false-positive flood 0.01×0.999 — the denominator is where intuition dies.",
            keyPoints: [
              "Bayes = disciplined belief updating: posterior ∝ likelihood × prior",
              "Rare things produce more false positives than true ones — the base-rate trap",
              "Simpson's paradox: aggregation can reverse subgroup truths; always ask 'compared within what groups?'",
            ],
          },
          {
            heading: "5. Randomness Behaves Badly — The Clusters, Streaks and Coincidences",
            content: "Human pattern-recognition is so eager that true randomness LOOKS suspicious. In 200 coin flips, a run of 6+ heads or tails is nearly certain — yet people judging 'random' sequences reject exactly those, calling them rigged. The GAMBLER'S FALLACY is the same bug in reverse: after five reds, roulette players bet black, believing 'due' — but the wheel has no memory; each spin is fresh (p = 18/37 forever). The birthday paradox compounds it: in a class of just 23, the chance two students share a birthday exceeds 50% — because the number of PAIRS grows quadratically (253 pairs), and we intuitively count people, not comparisons. This is why coincidences constantly occur: with billions of daily events, 'one-in-a-million' happen dozens of times daily — improbability for a SPECIFIC outcome, near-certainty for SOME surprise. Statisticians call the cluster of cancers near one factory the Texas sharpshooter fallacy: draw the target around the bullet holes after firing. The law of large numbers is the taming force: individual events stay wild, but averages converge — short-run streaks are noise, long-run rates are signal, and knowing which run you are in is the entire skill.",
            formula: "\\text{pairs among } n = \\binom{n}{2} = \\frac{n(n-1)}{2} \\;\\implies\\; P(\\text{shared birthday}) > 0.5 \\text{ at } n = 23",
            keyPoints: [
              "True randomness contains streaks and clusters — their absence is the real red flag",
              "Gambler's fallacy: independent events have no memory; 'due' is not a probability",
              "Birthday paradox: count PAIRS, not people — coincidences are pairwise phenomena",
            ],
          },
          {
            heading: "6. From Counts to Confidence — The Binomial and the Logic of Inference",
            content: "The binomial distribution is the mathematics of repeated yes/no trials: exactly k successes in n independent flips each with probability p, and the combinatorial factor C(n,k) counts the ORDERINGS — the paths through the trial tree that end at the same score. Its mean np and spread √(np(1−p)) are all you usually need, and as n grows its bell shape emerges (the CLT again). This is the gateway to INFERENCE, which runs on one elegant trick — proof by contradiction with dice. Hypothesis testing: assume the null (no effect), ask how surprising the observed data would be under it, and if the surprise (p-value) is tiny, reject the null. The p-value is widely and dangerously misread: it is NOT the probability the null is true, nor that results occurred by chance — it is P(data this extreme | null true), the forward direction only. A p = 0.03 result means: IF there were no effect, data this weird would arise 3% of the time. With enough subjects even trivial effects become 'significant'; with small samples huge effects miss significance — significance is a statement about noise, not importance, which is why modern practice demands EFFECT SIZES and CONFIDENCE INTERVALS: a 95% CI is the range of true values consistent with your data, and 'CI excludes zero' IS the significance test, wearing more honest clothes.",
            formula: "P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}, \\qquad \\text{p-value} = P(\\text{data} \\geq \\text{observed} \\mid H_0 \\text{ true})",
            keyPoints: [
              "Binomial = counting paths to k successes; C(n,k) is the path multiplicity",
              "Hypothesis testing is proof-by-contradiction against a chance model",
              "p-values answer 'how weird is this data if H₀?' — never 'what is P(H₀?)'",
              "Effect size + confidence interval = the honest report; significance alone is a noise statement",
            ],
          },
        ],
        keyPoints: [
          "Statistics infers the machine from the data; collection method outranks every formula",
          "Mean, median, mode answer different questions; skew and bimodality are read between them",
          "The CLT makes the bell universal; z-scores standardize; extremes regress to the mean",
          "Bayes weights evidence by base rates — rare things generate mostly false positives",
          "Randomness clusters; p-values measure data-weirdness under H₀, never H₀'s probability",
        ],
        commonMistakes: [
          "Quoting a mean for skewed or bimodal data without the median — the billionaire-in-the-bar error",
          "Reading a positive test as near-certain disease — ignoring the base rate",
          "Believing streaks are 'due' to end — independent events have no memory",
          "Interpreting p < 0.05 as 'the effect is real and important' — significance ≠ magnitude",
          "Applying binomial formulas to dependent trials (drawing without replacement changes p each draw)",
        ],
        practiceQuestions: [
          "Compute mean, median and mode for incomes {20k, 22k, 25k, 28k, 10,000k} and write one sentence on which number a politician and which a union would quote — and why both are 'true'.",
          "A test is 95% sensitive and 95% specific for a disease with 2% prevalence. Compute P(disease | positive) with Bayes, and explain the result to a frightened patient in two sentences.",
          "In 100 flips of a fair coin, find P(exactly 50 heads) and P(at least one run of 6). Comment on why the second answer surprises people.",
          "Two hospitals record daily boy-birth fractions. Which sees more days with >60% boys — the large or the small hospital? Justify with the law of large numbers.",
          "A drug trial reports p = 0.01 with a tiny effect size (0.2°C fever reduction, n = 5000). Write the honest interpretation, and what additional statistic you would demand.",
          "Roll a die 120 times and observe 30 sixes. Test whether the die is fair (binomial, mean np, σ = √(npq), z-score) and state the conclusion with a confidence caveat.",
          "Explain Simpson's paradox with a constructed two-hospital surgery dataset where Hospital A is better in both mild and severe cases yet worse overall. What confounder did the aggregation hide?",
        ],
      },
    },
    geometry: {
      title: "Coordinate Geometry",
      overview: "Coordinate geometry uses algebra to solve geometric problems. Key concepts include distance, slope, equations of lines, circles, and conic sections.",
      sections: [
        {
          heading: "1. Distance and Section Formulas",
          content: "Distance between (x₁,y₁) and (x₂,y₂): d = √[(x₂-x₁)² + (y₂-y₁)²]. Section formula: point dividing line in ratio m:n is ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).",
          formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\qquad \\left(\\dfrac{mx_2 + nx_1}{m+n},\\; \\dfrac{my_2 + ny_1}{m+n}\\right)",
        },
        {
          heading: "2. Slope and Equation of a Line",
          content: "Slope: m = (y₂-y₁)/(x₂-x₁) = tan θ. Forms: point-slope y-y₁ = m(x-x₁), slope-intercept y = mx + c, general ax + by + c = 0.",
          formula: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}, \\qquad y - y_1 = m(x - x_1)",
        },
        {
          heading: "3. Circle",
          content: "Standard form: (x-h)² + (y-k)² = r² with center (h,k) and radius r. General form: x² + y² + 2gx + 2fy + c = 0 with center (-g,-f) and radius √(g²+f²-c).",
          formula: "(x - h)^2 + (y - k)^2 = r^2",
        },
        {
          heading: "4. Conic Sections",
          content: "Parabola: y² = 4ax (opens right). Ellipse: x²/a² + y²/b² = 1. Hyperbola: x²/a² - y²/b² = 1. Each has specific eccentricity: e = 1 (parabola), e < 1 (ellipse), e > 1 (hyperbola).",
          formula: "\\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1, \\quad \\text{Hyperbola: } \\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1",
        },
      ],
      keyPoints: [
        "Parallel lines: equal slopes (m₁ = m₂)",
        "Perpendicular lines: m₁·m₂ = -1",
        "Distance from point to line: d = |ax₁+by₁+c|/√(a²+b²)",
        "Eccentricity determines the type of conic section",
      ],
      commonMistakes: [
        "Using wrong sign in circle equation (center is (-g,-f) not (g,f))",
        "Confusing slope formula (y₁-y₂ vs y₂-y₁ — should be consistent)",
        "Forgetting that vertical lines have undefined slope",
      ],
      practiceQuestions: [
        "Find distance between (1,2) and (4,6).",
        "Find the equation of the line through (2,3) with slope -1/2.",
        "Find the center and radius of x² + y² - 6x + 8y - 11 = 0.",
        "Find the equation of the parabola with focus (3,0) and directrix x = -3.",
        "Find the area of triangle with vertices (1,2), (3,4), (5,0).",
      ],
      enrichedContent: {
        title: "Coordinate Geometry — When Shapes Learned Algebra",
        overview: "In 1637 Descartes had a idea that fused two thousand years of separate mathematics: give every point a pair of numbers, and geometry becomes algebra — every shape an equation, every equation a shape, and the full machine of symbolic manipulation available to prove things about space. This single move made calculus possible, gave physics its stage, and still runs every pixel on your screen. Coordinate geometry is the operating system of the visual world.",
        sections: [
          {
            heading: "1. The Fusion — Every Shape an Equation, Every Equation a Shape",
            content: "The legend: Descartes, lying in bed, watched a fly crawl across the ceiling tiles and wondered how to describe its position unambiguously — two distances from the walls. That coordinate pair is the Rosetta Stone translating between two languages. In geometry you SEE: symmetry, tangency, inside and outside. In algebra you COMPUTE: expand, factor, solve. The dictionary runs both ways — 'the point lies on the circle' becomes 'its coordinates satisfy (x−h)² + (y−k)² = r²' — and suddenly questions that defeated the Greeks for millennia (where do these curves meet? how many solutions?) become routine equation-solving. This is why analytic geometry precedes calculus historically and logically: Newton and Leibniz needed curves as equations before they could differentiate and integrate them. Even your textbook's habit of 'sketch first, compute second' is the dictionary in action: the sketch builds geometric intuition, the algebra delivers exact answers, and each catches the other's mistakes.",
            formula: "\\text{point } (x,y) \\;\\leftrightarrow\\; \\text{solution pair}; \\qquad \\text{curve} \\;\\leftrightarrow\\; \\text{equation in } x, y",
            keyPoints: [
              "Coordinates are a translation dictionary: geometry you see, algebra you compute — same truths",
              "Intersections = simultaneous solutions; tangency = a repeated root — algebra sees geometry's special positions",
              "Calculus was only possible after curves became equations",
            ],
          },
          {
            heading: "2. The Distance Formula Is Pythagoras in Disguise — and Slope Is Calculus Waiting",
            content: "Draw the horizontal and vertical legs between two points and the distance formula is literally Pythagoras: d² = Δx² + Δy². Nothing new — the same theorem from 500 BC, now fed coordinates. Slope deserves more respect than m = Δy/Δx suggests: it is RISE PER UNIT RUN, a rate — the steepness of change — and it equals tan θ because slope is literally the tangent of the tilt angle (the trigonometric function named for this very picture). A line is the unique curve with CONSTANT rate, which is why linear functions model anything with steady change, and why the derivative of calculus is defined as 'the slope of the best-fitting line' — local linearization is coordinate geometry applied to curves that are not lines. Perpendicularity's rule m₁m₂ = −1 is the dot product in disguise (direction vectors (1,m₁)·(1,m₂) = 0), and parallelism m₁ = m₂ says direction vectors are proportional — the linear-algebra viewpoint from the algebra topic, already working silently inside your line equations.",
            formula: "d = \\sqrt{\\Delta x^2 + \\Delta y^2} \\;(\\text{Pythagoras}), \\qquad m = \\tan\\theta = \\text{rate}, \\qquad m_1m_2 = -1 \\;(\\perp)",
            keyPoints: [
              "Distance formula = Pythagoras with coordinates; nothing is new, everything is computable",
              "Slope = rate = tan(tilt): the word 'tangent' in trigonometry was born from this picture",
              "Perpendicular slope rule is the dot product wearing a geometry coat",
            ],
          },
          {
            heading: "3. The Circle Equation — Pythagoras at Every Point",
            content: "A circle is the set of points at fixed distance r from a centre. Unpack that sentence with coordinates and the equation writes itself: for any point (x,y) on the circle, the horizontal leg (x−h), vertical leg (y−k) and radius form a right triangle, so (x−h)² + (y−k)² = r² is Pythagoras enforced at EVERY point simultaneously. This is why 'completing the square' reveals the centre of x² + y² + 2gx + 2fy + c = 0 — you are reverse-engineering the hidden (h, k). The circle's deepest application is the tangent line: it touches at exactly ONE point, and algebraically that means the line-circle system has a REPEATED ROOT (discriminant zero) — tangency is where algebra and geometry agree on 'just barely touching.' And three circles locate you: GPS trilateration measures distances to three satellites, draws three spheres, and your position is their intersection — every navigation fix on your phone is a circle equation solved three ways at once.",
            formula: "(x-h)^2 + (y-k)^2 = r^2, \\qquad \\text{tangency} \\iff \\text{discriminant} = 0 \\;(\\text{repeated root})",
            example: "Completing the square as detective work: x² − 6x + y² + 8y = 11 becomes (x−3)² + (y+4)² = 36 — the equation confessed its centre (3, −4) and radius 6. Every general circle equation hides this standard form; the algebra just makes it talk.",
            keyPoints: [
              "The circle equation is Pythagoras applied to every point — centre and radius are its confession",
              "Tangency = repeated root: 'one intersection point' in geometry is 'discriminant zero' in algebra",
              "GPS = three circle equations intersecting — coordinate geometry in every phone",
            ],
          },
          {
            heading: "4. Conics — Sliced Cones, Stretched Circles, and the Shape of Orbits",
            content: "Slice a cone with a plane at different tilts and you get the conic family: shallow tilt = ellipse, exact-parallel-to-side tilt = parabola, steep tilt = hyperbola. The Greeks studied them as pure curiosity — Apollonius wrote eight volumes on conics with no application in mind — and eighteen centuries later Kepler found the solar system was running on them: planets trace ellipses with the Sun at a focus, comets swing on hyperbolas, and escape trajectories ride the parabola boundary. The eccentricity e is the family dial: e = 0 circle (the special ellipse), 0 < e < 1 ellipse (stretched), e = 1 parabola (open, single-escape), e > 1 hyperbola (two branches, always escaping) — and from gravitation's energy ledger, WHICH conic you fly is decided by your total energy (negative = bound ellipse, zero = parabola, positive = hyperbola). Each conic also has a focus-directrix definition — the set of points whose distance ratio to a focus and a line is constant e — which unifies the family algebraically. The parabola's signature property makes it an engineering staple: rays from the focus reflect parallel (torches, headlights) and parallel rays converge to the focus (satellite dishes, telescope mirrors) — one curve, perfect at both broadcasting and collecting.",
            formula: "e = 0: \\text{circle}, \\;\\; 0<e<1: \\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1, \\;\\; e=1: y^2 = 4ax, \\;\\; e>1: \\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1",
            keyPoints: [
              "Conics are one family dialled by eccentricity; orbits select their conic by total energy",
              "The Greeks' pure curiosity became Kepler's astronomy — mathematics banks applications centuries early",
              "Parabolic reflectors send and gather perfectly: focus ↔ parallel is the property behind dishes and headlights",
            ],
          },
          {
            heading: "5. Loci and Level Sets — An Equation Is a Membership Test",
            content: "Every equation f(x,y) = c is a filter: points pass the test if their coordinates satisfy it, and the passing set is the locus — the curve. This viewpoint scales beyond school geometry. A contour map is a stack of loci (all points at equal elevation); weather charts are pressure level sets; indifference curves in economics, equipotential lines in electrostatics (from the potential landscape), and isotherms in heat flow are the same object — curves of constant value of some function. Coordinate geometry is where you learn to READ such pictures: closer contours = steeper change (the gradient points perpendicular to level sets — exactly why electric field lines cross equipotentials at 90°, and why water flows downhill perpendicular to contour lines). Implicit equations also describe curves no function can — the circle fails the vertical-line test, yet (x−h)²+(y−k)²=r² handles it perfectly. Recognizing that 'equation = membership test = picture' is the mental upgrade that turns algebra into vision, and it is the ancestor of every computer-graphics renderer that decides, pixel by pixel, whether a point is inside a shape.",
            formula: "\\{(x,y) : f(x,y) = c\\} = \\text{level set}; \\qquad \\nabla f \\perp \\text{level sets}",
            keyPoints: [
              "Equations are membership tests; their passing sets are the curves you graph",
              "Level sets run the world: contours, isobars, equipotentials, indifference curves",
              "Gradients are perpendicular to level sets — one fact explains field lines, water flow and steepest ascent",
            ],
          },
          {
            heading: "6. Coordinates Run the Visual World",
            content: "Every digital image you have ever seen is coordinate geometry executing at machine speed. A screen is a grid of pixel coordinates; fonts are outlines of Bézier curves — polynomials whose control points are coordinates, scaled and rendered at any size without blur; a video game's 3D world is points in space transformed by matrices (rotation, translation, projection — the algebra topic's machines) onto the 2D screen by perspective division, which is the section formula's projective cousin. Even the humble triangle vertices area formula — ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)| — is a determinant in disguise (shoelace formula), the same signed-area machinery from linear algebra, and it is what game engines use thousands of times per frame for collision detection. The deep lesson: analytic geometry did not just solve classical problems, it created the possibility of COMPUTER graphics — because computers cannot see shapes, they can only manipulate numbers. Descartes' dictionary is the reason the visual world became programmable.",
            formula: "\\text{Area} = \\tfrac{1}{2}\\left|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)\\right| \\;(\\text{shoelace} = \\text{determinant})",
            keyPoints: [
              "Screens, fonts and games are coordinate geometry at machine speed — computers see only numbers",
              "Bézier curves = polynomial loci through control points; perspective = projective coordinates",
              "The triangle-area shoelace formula is a determinant — linear algebra hiding in plain geometry",
            ],
          },
        ],
        keyPoints: [
          "Coordinates fuse seeing (geometry) with computing (algebra) — Descartes' dictionary",
          "Distance is Pythagoras; slope is rate and tan(tilt); perpendicularity is a dot product",
          "Circles are Pythagoras at every point; tangency = repeated root; GPS = three circles",
          "Conics are the eccentricity dial: orbits, dishes and headlights all ride them",
          "Level sets generalize curves: contours, equipotentials, isobars — gradients cross them at 90°",
        ],
        commonMistakes: [
          "Reading the general circle equation's centre with wrong signs — it is (−g, −f), completing the square proves it",
          "Forgetting vertical lines have undefined slope — the tan(90°) blow-up; handle them as x = a",
          "Treating y² = 4ax as 'a parabola that opens up' — the squared variable tells the axis; y² opens sideways",
          "Confusing the ellipse's a and b with the hyperbola's — in the ellipse a > b along the major axis; hyperbolas have no 'larger' direction",
          "Applying the point-to-line distance formula with an un-normalized equation — put the line in ax+by+c = 0 form first",
        ],
        practiceQuestions: [
          "Prove the distance formula from Pythagoras by drawing the legs, then use it to show the points (0,0), (3,4), (3,−4) form an isosceles triangle — without plotting.",
          "Complete the square on x² + y² + 10x − 4y + 20 = 0 to find centre and radius; then explain what a negative radius-squared would have meant geometrically.",
          "Find both tangent lines to x² + y² = 25 through the external point (7, 1) using the discriminant-zero condition.",
          "A satellite dish is a paraboloid with focus 1 m from the vertex. Explain with the focus-parallel property why the receiver sits at the focus, and compute where incoming parallel rays converge.",
          "Show that an orbiting body's conic type follows its energy by connecting e to the gravitation topic's negative/zero/positive total energy.",
          "Compute the area of the triangle (1,2), (3,4), (5,0) by the shoelace determinant AND by base×height with a point-to-line distance — confirm they agree.",
          "Explain, using level sets and gradients, why a ball released on a contour map rolls perpendicular to the contour lines — and connect this to equipotentials in electrostatics.",
        ],
      },
    },

    theorems: {
      title: "Theorems — All NEB Class 11 & 12 Mathematics Proofs",
      overview: "This section contains formal, step-by-step proofs for all major theorems from the NEB Class 11 & 12 Mathematics syllabus. Proofs are organized by syllabus unit and include theorem statements, detailed proofs, and examples.",
      sections: [
        {
          heading: "Algebra Theorems",
          content: "Matrix algebra and complex numbers form the foundation of higher algebra. These theorems establish key properties essential for solving systems of equations and working with complex numbers.",
          formula: "\\text{Matrix: } A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad \\text{Complex: } z = a + bi",
        },
        {
          heading: "Theorem 1: Determinant of Product of Matrices",
          content: "For any two square matrices A and B of the same size, the determinant of their product equals the product of their determinants: det(AB) = det(A)·det(B).",
          formula: "\\det(AB) = \\det(A) \\cdot \\det(B)",
          example: "A = [[1,2],[3,4]], B = [[2,0],[1,3]]\ndet(A) = 4 - 6 = -2, det(B) = 6 - 0 = 6\ndet(AB) = (-2)(6) = -12",
        },
        {
          heading: "Theorem 2: Inverse of a 2×2 Matrix",
          content: "For A = [[a,b],[c,d]], the inverse exists iff det(A) ≠ 0, and A⁻¹ = (1/det(A))·[[d,-b],[-c,a]].",
          formula: "A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
          example: "A = [[1,2],[3,4]], det(A) = -2\nA⁻¹ = (-1/2)[[4,-2],[-3,1]] = [[-2,1],[3/2,-1/2]]",
        },
        {
          heading: "Theorem 3: Modulus of Product of Complex Numbers",
          content: "For complex numbers z₁ and z₂: |z₁z₂| = |z₁||z₂|.",
          formula: "|z_1 z_2| = |z_1| \\cdot |z_2|",
          example: "z₁ = 3+4i, z₂ = 1-2i\n|z₁| = 5, |z₂| = √5\n|z₁z₂| = |(3+4i)(1-2i)| = |11-2i| = √125 = 5√5",
        },
        {
          heading: "Theorem 4: Quadratic Formula",
          content: "For ax² + bx + c = 0: x = (-b ± √(b²-4ac))/(2a).",
          formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          example: "2x² - 5x + 3 = 0\nx = (5 ± √(25-24))/4 = (5 ± 1)/4\nx₁ = 3/2, x₂ = 1",
        },
        {
          heading: "Theorem 5: Sum and Product of Roots",
          content: "For ax² + bx + c = 0 with roots α and β: α + β = -b/a and αβ = c/a.",
          formula: "\\alpha + \\beta = -\\dfrac{b}{a}, \\qquad \\alpha\\beta = \\dfrac{c}{a}",
          example: "2x² - 5x + 3 = 0\nSum = -(-5)/2 = 5/2\nProduct = 3/2",
        },

        {
          heading: "\nTrigonometry Theorems",
          content: "Trigonometric identities are fundamental relationships used throughout mathematics.",
        },
        {
          heading: "Theorem 6: Pythagorean Identity",
          content: "For any angle θ: sin²θ + cos²θ = 1.",
          formula: "\\sin^2\\theta + \\cos^2\\theta = 1",
          example: "θ = 30°: (1/2)² + (√3/2)² = 1/4 + 3/4 = 1",
        },
        {
          heading: "Theorem 7: tan²θ + 1 = sec²θ",
          content: "Derived by dividing sin²θ + cos²θ = 1 by cos²θ.",
          formula: "\\tan^2\\theta + 1 = \\sec^2\\theta",
          example: "θ = 45°: 1² + 1 = 2, (√2)² = 2 ✓",
        },
        {
          heading: "Theorem 8: sin(A+B) = sin A cos B + cos A sin B",
          content: "The sine addition formula can be derived using Euler's formula.",
          formula: "\\sin(A+B) = \\sin A \\cos B + \\cos A \\sin B",
          example: "sin(45°+30°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4",
        },
        {
          heading: "Theorem 9: cos(A+B) = cos A cos B - sin A sin B",
          content: "The cosine addition formula from Euler's formula.",
          formula: "\\cos(A+B) = \\cos A \\cos B - \\sin A \\sin B",
          example: "cos(60°+30°) = (1/2)(√3/2) - (√3/2)(1/2) = 0 = cos 90°",
        },
        {
          heading: "Theorem 10: Double Angle sin(2θ) = 2sin θ cos θ",
          content: "Special case of sin(A+B) when A = B.",
          formula: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta",
          example: "sin(60°) = 2sin30°cos30° = 2(1/2)(√3/2) = √3/2",
        },

        {
          heading: "\nCalculus Theorems",
          content: "Calculus theorems establish the fundamental relationships between limits, derivatives, and integrals.",
        },
        {
          heading: "Theorem 11: Limit of Sum Equals Sum of Limits",
          content: "If lim f(x) = L and lim g(x) = M, then lim [f(x)+g(x)] = L+M.",
          formula: "\\lim[f(x)+g(x)] = \\lim f(x) + \\lim g(x)",
        },
        {
          heading: "Theorem 12: Derivative of xⁿ",
          content: "For any real n: d/dx[xⁿ] = nxⁿ⁻¹.",
          formula: "\\dfrac{d}{dx}[x^n] = nx^{n-1}",
          example: "d/dx[x³] = 3x², d/dx[x⁻²] = -2x⁻³",
        },
        {
          heading: "Theorem 13: Product Rule",
          content: "(fg)' = f'g + fg'.",
          formula: "\\dfrac{d}{dx}[fg] = f'g + fg'",
          example: "d/dx[x²sin x] = 2x sin x + x² cos x",
        },
        {
          heading: "Theorem 14: Quotient Rule",
          content: "(f/g)' = (f'g - fg')/g².",
          formula: "\\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
          example: "d/dx[sin x/cos x] = sec²x",
        },
        {
          heading: "Theorem 15: Chain Rule",
          content: "d/dx[f(g(x))] = f'(g(x))·g'(x).",
          formula: "\\dfrac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
          example: "d/dx[sin(x²)] = cos(x²)·2x",
        },
        {
          heading: "Theorem 16: Fundamental Theorem of Calculus",
          content: "If F' = f, then ∫_a^b f(x) dx = F(b) - F(a).",
          formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
          example: "∫₀^π sin x dx = [-cos x]₀^π = -(-1) - (-1) = 2",
        },
        {
          heading: "Theorem 17: Integration by Parts",
          content: "∫u dv = uv - ∫v du.",
          formula: "\\int u\\,dv = uv - \\int v\\,du",
          example: "∫x eˣ dx = x eˣ - ∫eˣ dx = eˣ(x-1) + C",
        },

        {
          heading: "\nCoordinate Geometry Theorems",
          content: "Analytic geometry theorems provide algebraic methods for geometric problems.",
        },
        {
          heading: "Theorem 18: Distance Formula",
          content: "Distance between (x₁,y₁) and (x₂,y₂): d = √[(x₂-x₁)² + (y₂-y₁)²].",
          formula: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
          example: "d between (1,2) and (4,6) = √[9+16] = 5",
        },
        {
          heading: "Theorem 19: Section Formula",
          content: "Point dividing segment in ratio m:n: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).",
          formula: "\\left(\\dfrac{mx_2+nx_1}{m+n},\\;\\dfrac{my_2+ny_1}{m+n}\\right)",
          example: "(1,2) and (7,5) in ratio 2:3 → (17/5, 16/5)",
        },
        {
          heading: "Theorem 20: Equation of a Line",
          content: "Line through (x₁,y₁) with slope m: y - y₁ = m(x - x₁).",
          formula: "y - y_1 = m(x - x_1)",
          example: "Through (2,3) with slope -1/2: y = -x/2 + 4",
        },
        {
          heading: "Theorem 21: Equation of a Circle",
          content: "Circle with center (h,k) and radius r: (x-h)² + (y-k)² = r².",
          formula: "(x-h)^2 + (y-k)^2 = r^2",
          example: "Center (3,-2), r = 5: (x-3)² + (y+2)² = 25",
        },

        {
          heading: "\nVectors Theorems",
          content: "Vector theorems establish fundamental properties of vector operations.",
        },
        {
          heading: "Theorem 22: Dot Product Properties",
          content: "a·b = |a||b|cos θ where θ is the angle between them.",
          formula: "\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta",
          example: "a = (1,0), b = (0,1): a·b = 0, cos 90° = 0",
        },
        {
          heading: "Theorem 23: Cross Product Magnitude",
          content: "|a×b| = |a||b|sin θ (area of parallelogram).",
          formula: "|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta",
          example: "a = (1,0,0), b = (0,1,0): |a×b| = 1 = sin 90°",
        },
        {
          heading: "Theorem 24: Scalar Triple Product",
          content: "a·(b×c) equals the volume of the parallelepiped.",
          formula: "\\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) = [\\vec{a}\\;\\vec{b}\\;\\vec{c}]",
        },

        {
          heading: "\nStatistics & Probability Theorems",
          content: "Probability theorems provide the foundation for statistical reasoning.",
        },
        {
          heading: "Theorem 25: Bayes' Theorem",
          content: "P(A|B) = P(B|A)P(A)/P(B).",
          formula: "P(A|B) = \\dfrac{P(B|A) \\cdot P(A)}{P(B)}",
          example: "P(A)=0.4, P(B|A)=0.7, P(B|A')=0.2\nP(B)=0.40, P(A|B)=0.7",
        },
        {
          heading: "Theorem 26: Addition Rule",
          content: "P(A∪B) = P(A) + P(B) - P(A∩B).",
          formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
          example: "P(A)=0.5, P(B)=0.6, P(A∩B)=0.3\nP(A∪B) = 0.8",
        },
        {
          heading: "Theorem 27: Multiplication Rule (Independent)",
          content: "For independent A and B: P(A∩B) = P(A)P(B).",
          formula: "P(A \\cap B) = P(A) \\cdot P(B)",
          example: "Two dice: P(6,6) = (1/6)(1/6) = 1/36",
        },
        {
          heading: "Theorem 28: Mean of Binomial Distribution",
          content: "For X ~ Bin(n,p): μ = np.",
          formula: "\\mu = np",
          example: "10 coin tosses, p=0.5: mean = 5",
        },
        {
          heading: "Theorem 29: Variance of Binomial Distribution",
          content: "For X ~ Bin(n,p): σ² = np(1-p).",
          formula: "\\sigma^2 = np(1-p)",
          example: "10 coin tosses: variance = 10(0.5)(0.5) = 2.5",
        },
        {
          heading: "Exercise Pattern 1: Matrix Determinant Calculation",
          content: "Find the determinant of any 2x2 or 3x3 matrix. Pattern: For 2x2 [[a,b],[c,d]], det = ad - bc. For 3x3, use cofactor expansion along any row or column. Always check if the matrix is singular (det = 0) before proceeding.",
          formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
          example: "Find det(A) where A = [[3,1],[2,4]]. Step 1: a=3, b=1, c=2, d=4. Step 2: det(A) = (3)(4) - (1)(2) = 12 - 2 = 10. Step 3: Since det != 0, the matrix is invertible.",
          keyPoints: [
            "det(A) = 0 means no inverse exists",
            "det(AB) = det(A)*det(B)",
            "det(A^T) = det(A)",
          ],
          commonMistakes: [
            "Forgetting the minus sign: ad - bc (not ad + bc)",
            "Swapping rows and columns incorrectly for 3x3",
          ],
          practiceQuestions: [
            "Find det([[5,2],[1,3]]).",
            "Find det([[1,0,1],[0,1,0],[1,0,1]]) and interpret.",
            "If det(A) = 3 and det(B) = -2, find det(AB).",
          ],
        },

        {
          heading: "Exercise Pattern 2: Finding Matrix Inverse",
          content: "Given a 2x2 matrix, find its inverse using A^-1 = (1/det(A))*[[d,-b],[-c,a]]. First check det(A) != 0, then swap diagonal elements, negate off-diagonal elements, and divide by determinant.",
          formula: "A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
          example: "Find A^-1 where A = [[2,3],[1,4]]. Step 1: det(A) = (2)(4) - (3)(1) = 5. Step 2: Swap diagonals: [[4,...],[...,2]]. Step 3: Negate off-diagonals: [[4,-3],[-1,2]]. Step 4: A^-1 = (1/5)[[4,-3],[-1,2]].",
          keyPoints: [
            "Inverse only exists if det != 0",
            "AA^-1 = I (identity matrix)",
          ],
          commonMistakes: [
            "Using det = 0 (singularity) to divide",
            "Forgetting to negate both off-diagonal elements",
          ],
          practiceQuestions: [
            "Find inverse of [[3,1],[2,5]].",
            "Show that [[1,2],[2,3]] has no inverse.",
            "Verify AA^-1 = I for A = [[2,1],[1,3]].",
          ],
        },

        {
          heading: "Exercise Pattern 3: Complex Number Operations",
          content: "Simplify expressions involving complex numbers using i^2 = -1. For division, multiply numerator and denominator by the conjugate. For powers of i, use the cycle: i, i^2=-1, i^3=-i, i^4=1.",
          formula: "(a+bi)(a-bi) = a^2 + b^2, \\qquad i^2 = -1",
          example: "Simplify (3+2i)/(1-i). Step 1: Multiply by conjugate: (3+2i)(1+i)/((1-i)(1+i)). Step 2: Numerator: 3+3i+2i+2i^2 = 1+5i. Step 3: Denominator: 1-i^2 = 2. Result: (1+5i)/2 = 1/2 + (5/2)i.",
          keyPoints: [
            "Conjugate of a+bi is a-bi",
            "|z|^2 = z*z_conj = a^2+b^2",
          ],
          commonMistakes: [
            "Forgetting i^2 = -1 when expanding",
            "Not rationalizing the denominator",
          ],
          practiceQuestions: [
            "Simplify (2+3i)^2.",
            "Find |3-4i|.",
            "Simplify i^47.",
          ],
        },

        {
          heading: "Exercise Pattern 4: Solving Quadratic Equations",
          content: "Solve ax^2+bx+c=0 using the quadratic formula or factoring. Check discriminant D = b^2-4ac first: D>0 (two real roots), D=0 (one repeated root), D<0 (complex roots).",
          formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          example: "Solve 2x^2 - 7x + 3 = 0. Step 1: a=2, b=-7, c=3. D = 49-24 = 25 > 0. Step 2: x = (7 +/- 5)/4. Step 3: x1 = 3, x2 = 1/2. Check: 2(9)-21+3=0.",
          keyPoints: [
            "Always check discriminant first",
            "Sum of roots = -b/a, product = c/a",
          ],
          commonMistakes: [
            "Sign errors in -b+-sqrt(D)",
            "Forgetting to divide by 2a",
          ],
          practiceQuestions: [
            "Solve x^2-5x+6=0 by factoring.",
            "Find the nature of roots of 3x^2+2x+1=0.",
            "If roots of x^2-kx+6=0 differ by 5, find k.",
          ],
        },

        {
          heading: "Exercise Pattern 5: Limit by Direct Substitution",
          content: "Evaluate lim(x->a) f(x) by directly substituting x=a. If the result is a finite number, that is the limit. This works for all polynomial, rational (when denominator!=0), trigonometric, and exponential functions.",
          formula: "\\lim_{x \\to a} f(x) = f(a) \\quad \\text{(when f is continuous at } a\\text{)}",
          example: "Evaluate lim(x->2) (x^2+3x-2). Substitute x = 2: (2)^2 + 3(2) - 2 = 4 + 6 - 2 = 8. Since this is a polynomial, it is continuous. Answer: 8.",
          keyPoints: [
            "Direct substitution works for continuous functions",
            "Polynomials are continuous everywhere",
          ],
          commonMistakes: [
            "Substituting into discontinuous functions",
            "Not checking if denominator is zero",
          ],
          practiceQuestions: [
            "Evaluate lim(x->1) (x^3-1)/(x-1).",
            "Find lim(x->pi/2) sin x.",
            "Evaluate lim(x->0) (e^x-1)/x.",
          ],
        },

        {
          heading: "Exercise Pattern 6: Limit by L'Hopital's Rule",
          content: "When lim f(x)/g(x) gives 0/0 or infinity/infinity, differentiate numerator and denominator separately: lim f/g = lim f'/g'. Apply repeatedly until the indeterminate form is resolved.",
          formula: "\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = \\lim_{x \\to a} \\dfrac{f'(x)}{g'(x)} \\quad \\text{(for 0/0 or } \\infty/\\infty\\text{)}",
          example: "Evaluate lim(x->0) sin(3x)/x. Step 1: Substituting gives 0/0. Step 2: Apply L'Hopital: differentiate num and den. Step 3: lim(x->0) 3cos(3x)/1 = 3. Answer: 3.",
          keyPoints: [
            "Only use for 0/0 or infinity/infinity forms",
            "Differentiate numerator and denominator separately",
          ],
          commonMistakes: [
            "Applying L'Hopital when not indeterminate",
            "Using quotient rule instead of differentiating top and bottom",
          ],
          practiceQuestions: [
            "Evaluate lim(x->0) (e^x-1-x)/x^2.",
            "Find lim(x->infinity) x/e^x.",
            "Evaluate lim(x->0) tan x/x.",
          ],
        },

        {
          heading: "Exercise Pattern 7: Derivative by Power Rule",
          content: "For f(x) = x^n, f'(x) = nx^(n-1). Extend to sums using linearity: d/dx[f+g] = f'+g'. Also use constant multiple: d/dx[c*f] = c*f'.",
          formula: "\\dfrac{d}{dx}[x^n] = nx^{n-1}",
          example: "Find d/dx[3x^4 - 2x^3 + 5x - 7]. d/dx[3x^4] = 12x^3. d/dx[-2x^3] = -6x^2. d/dx[5x] = 5. d/dx[-7] = 0. Answer: f'(x) = 12x^3 - 6x^2 + 5.",
          keyPoints: [
            "Power rule works for any real n",
            "Constant term derivative is 0",
          ],
          commonMistakes: [
            "Writing x^n/n instead of nx^(n-1)",
            "Forgetting to multiply by the exponent",
          ],
          practiceQuestions: [
            "Find d/dx[x^(3/2)].",
            "Differentiate f(x) = 1/x^2 + sqrt(x).",
            "Find the slope of y=x^3 at x=2.",
          ],
        },

        {
          heading: "Exercise Pattern 8: Product and Quotient Rules",
          content: "Product rule: d/dx[fg] = f'g + fg'. Quotient rule: d/dx[f/g] = (f'g - fg')/g^2. Product rule adds, quotient rule subtracts and divides by g^2.",
          formula: "\\dfrac{d}{dx}[fg] = f'g + fg', \\qquad \\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
          example: "Find d/dx[x^2*sin x]. Let f=x^2, g=sin x. f'=2x, g'=cos x. By product rule: (2x)(sin x) + (x^2)(cos x) = 2x sin x + x^2 cos x.",
          keyPoints: [
            "Product rule: f'g + fg'",
            "Quotient rule: (f'g - fg')/g^2",
          ],
          commonMistakes: [
            "Forgetting the product rule entirely",
            "Sign error in quotient rule",
          ],
          practiceQuestions: [
            "Differentiate x^3*e^x.",
            "Find d/dx[tan x/x].",
            "Differentiate sqrt(x)*ln x.",
          ],
        },

        {
          heading: "Exercise Pattern 9: Chain Rule",
          content: "For composite functions f(g(x)): differentiate the outer function (keeping inner as-is), then multiply by the derivative of the inner function. Work from outside in.",
          formula: "\\dfrac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
          example: "Find d/dx[sin(x^2+1)]. Outer: sin(u), inner: u=x^2+1. d/du[sin u] = cos u = cos(x^2+1). du/dx = 2x. Multiply: 2x cos(x^2+1).",
          keyPoints: [
            "Identify outer and inner functions",
            "Differentiate outer first, then multiply by inner derivative",
          ],
          commonMistakes: [
            "Forgetting to multiply by the inner derivative",
            "Differentiating both outer and inner incorrectly",
          ],
          practiceQuestions: [
            "Find d/dx[e^(sin x)].",
            "Differentiate sqrt(x^2+1).",
            "Find d/dx[ln(x^3+2x)].",
          ],
        },

        {
          heading: "Exercise Pattern 10: Basic Integration",
          content: "Reverse the power rule: integral of x^n dx = x^(n+1)/(n+1) + C (for n!=-1). Standard integrals: integral e^x dx = e^x+C, integral 1/x dx = ln|x|+C, integral cos x dx = sin x+C.",
          formula: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\quad \\int e^x\\,dx = e^x + C",
          example: "Evaluate integral(4x^3 - 6x + 2) dx. integral 4x^3 dx = x^4. integral (-6x) dx = -3x^2. integral 2 dx = 2x. Answer: x^4 - 3x^2 + 2x + C.",
          keyPoints: [
            "Always add +C for indefinite integrals",
            "Reverse the power rule: increase exponent by 1, divide by new exponent",
          ],
          commonMistakes: [
            "Forgetting +C",
            "Writing x^n/n instead of x^(n+1)/(n+1)",
          ],
          practiceQuestions: [
            "Evaluate integral(3x^2+2x-1) dx.",
            "Find integral(1/x + e^x) dx.",
            "Evaluate integral cos(2x) dx.",
          ],
        },

        {
          heading: "Exercise Pattern 11: Integration by Substitution",
          content: "When integrand contains a function and its derivative, substitute u = g(x), du = g'(x)dx. Rewrite in terms of u, integrate, then substitute back.",
          formula: "\\int f(g(x)) \\cdot g'(x)\\,dx = \\int f(u)\\,du \\quad \\text{where } u = g(x)",
          example: "Evaluate integral 2x*e^(x^2) dx. Let u = x^2, du = 2x dx. Integral becomes integral e^u du = e^u + C = e^(x^2) + C.",
          keyPoints: [
            "Look for g'(x) alongside g(x)",
            "Don't forget to substitute back to x",
          ],
          commonMistakes: [
            "Choosing wrong u (must include g'(x))",
            "Forgetting to substitute back to x",
          ],
          practiceQuestions: [
            "Evaluate integral x*cos(x^2) dx.",
            "Find integral (2x+1)^3 dx.",
            "Evaluate integral x/sqrt(x^2+1) dx.",
          ],
        },

        {
          heading: "Exercise Pattern 12: Integration by Parts",
          content: "Use LIATE to choose u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Then integral u dv = uv - integral v du.",
          formula: "\\int u\\,dv = uv - \\int v\\,du",
          example: "Evaluate integral x*e^x dx. By LIATE, u = x, dv = e^x dx. du = dx, v = e^x. Apply: x*e^x - integral e^x dx = x*e^x - e^x + C = e^x(x-1) + C.",
          keyPoints: [
            "LIATE guides u selection",
            "Apply formula: uv - integral v du",
          ],
          commonMistakes: [
            "Choosing u wrong (should be LIATE order)",
            "Sign errors in -integral v du",
          ],
          practiceQuestions: [
            "Evaluate integral x*cos x dx.",
            "Find integral ln x dx.",
            "Evaluate integral x^2*e^x dx.",
          ],
        },

        {
          heading: "Exercise Pattern 13: Dot Product Calculations",
          content: "The dot product a.b = |a||b|cos(theta) = a1*b1 + a2*b2 + a3*b3. Use it to find angles between vectors and check perpendicularity (a.b = 0 means perpendicular).",
          formula: "\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1 + a_2b_2 + a_3b_3",
          example: "Angle between a=(1,2,3) and b=(4,-1,2). a.b = 4-2+6 = 8. |a|=sqrt(14), |b|=sqrt(21). cos(theta) = 8/sqrt(294) = 0.466. theta = 62.2 degrees.",
          keyPoints: [
            "a.b = 0 implies vectors are perpendicular",
            "|a.b| <= |a||b| (Cauchy-Schwarz)",
          ],
          commonMistakes: [
            "Adding corresponding components wrong",
            "Forgetting to take arccos",
          ],
          practiceQuestions: [
            "Find a.b for a=(2,-1,3), b=(1,4,-2).",
            "Are (1,2) and (4,-2) perpendicular?",
            "Find theta between (3,0) and (0,5).",
          ],
        },

        {
          heading: "Exercise Pattern 14: Cross Product Calculations",
          content: "For a=(a1,a2,a3) and b=(b1,b2,b3), a x b = (a2*b3-a3*b2, a3*b1-a1*b3, a1*b2-a2*b1). The result is perpendicular to both vectors. Its magnitude equals the area of the parallelogram.",
          formula: "\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}",
          example: "Find a x b for a=(1,2,3), b=(4,0,5). i: (2)(5)-(3)(0)=10. j: -[(1)(5)-(3)(4)]=7. k: (1)(0)-(2)(4)=-8. Answer: (10, 7, -8).",
          keyPoints: [
            "Cross product gives a perpendicular vector",
            "a x b = -(b x a) (anti-commutative)",
          ],
          commonMistakes: [
            "Sign error in j-component",
            "Confusing cross product with dot product",
          ],
          practiceQuestions: [
            "Find (1,0,0) x (0,1,0).",
            "Compute (2,-1,3) x (1,4,-2).",
            "Find a vector perpendicular to both (1,2,3) and (4,5,6).",
          ],
        },

        {
          heading: "Exercise Pattern 15: Vector Projections",
          content: "The projection of a onto b: proj_b(a) = (a.b/|b|^2)*b. Scalar projection is a.b/|b|. Use these to find components of forces and resolve vectors.",
          formula: "\\text{proj}_{\\vec{b}}\\,\\vec{a} = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\,\\vec{b}",
          example: "Projection of a=(3,4) onto b=(1,0). a.b = 3. |b|^2 = 1. proj_b(a) = (3/1)*(1,0) = (3,0).",
          keyPoints: [
            "Projection is parallel to b",
            "Scalar projection = |a|cos(theta)",
          ],
          commonMistakes: [
            "Using |b| instead of |b|^2",
            "Confusing projection of a on b vs b on a",
          ],
          practiceQuestions: [
            "Project (2,3) onto (1,1).",
            "Find scalar projection of (3,4) on (0,5).",
            "Decompose (5,1) into components parallel and perpendicular to (1,0).",
          ],
        },

        {
          heading: "Exercise Pattern 16: Scalar Triple Product and Volume",
          content: "The scalar triple product a.(bxc) gives the signed volume of the parallelepiped. Absolute value gives actual volume. If [abc]=0, the vectors are coplanar.",
          formula: "[\\vec{a}\\;\\vec{b}\\;\\vec{c}] = \\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
          example: "Volume with a=(1,0,1), b=(2,1,0), c=(0,1,1). Det: 1(1-0) - 0 + 1(2-0) = 3. Volume = |3| = 3 cubic units.",
          keyPoints: [
            "|scalar triple product| = volume",
            "[abc]=0 means coplanar vectors",
          ],
          commonMistakes: [
            "Forgetting absolute value for volume",
            "Expanding determinant incorrectly",
          ],
          practiceQuestions: [
            "Find volume with edges (1,1,0),(0,1,1),(1,0,1).",
            "Show (1,2,3),(4,5,6),(7,8,9) are coplanar.",
            "Find volume of tetrahedron with same edges.",
          ],
        },

        {
          heading: "Exercise Pattern 17: Vector Equation of a Line",
          content: "Line through point A with position vector a, direction d: r = a + td where t is a scalar parameter. Convert to Cartesian by eliminating t.",
          formula: "\\vec{r} = \\vec{a} + t\\vec{d}, \\qquad \\dfrac{x-x_1}{a} = \\dfrac{y-y_1}{b} = \\dfrac{z-z_1}{c}",
          example: "Cartesian form of r = (1,2,3) + t(2,-1,4). x=1+2t, y=2-t, z=3+4t. Solve: (x-1)/2 = (y-2)/(-1) = (z-3)/4.",
          keyPoints: [
            "t is any real number",
            "Direction ratios come from d = (a,b,c)",
          ],
          commonMistakes: [
            "Writing direction ratios as denominators wrong",
            "Confusing parametric and Cartesian forms",
          ],
          practiceQuestions: [
            "Convert r=(0,1,-1)+t(1,2,3) to Cartesian.",
            "Find the point on line r=(2,0,1)+t(1,1,0) at t=3.",
            "Do lines r=(1,0,0)+t(1,1,0) and r=(0,1,0)+s(0,1,1) intersect?",
          ],
        },

        {
          heading: "Exercise Pattern 18: Vector Equation of a Plane",
          content: "Plane through point with position vector a, normal n: (r-a).n = 0, or r.n = a.n. Cartesian form: a(x-x1)+b(y-y1)+c(z-z1)=0.",
          formula: "(\\vec{r} - \\vec{a}) \\cdot \\vec{n} = 0, \\qquad \\text{Cartesian: } ax+by+cz=d",
          example: "Plane through (1,2,3) with normal (2,-1,4). (x-1)(2)+(y-2)(-1)+(z-3)(4)=0. Simplify: 2x-y+4z=12.",
          keyPoints: [
            "Normal vector coefficients = plane coefficients",
            "d = a.n (dot product of point and normal)",
          ],
          commonMistakes: [
            "Sign errors when expanding",
            "Using position vector incorrectly",
          ],
          practiceQuestions: [
            "Find plane through (1,-1,2) normal to (3,0,-1).",
            "Find distance from origin to 2x+3y-z=6.",
            "Find intersection of line r=(0,0,1)+t(1,1,1) with plane x+y+z=3.",
          ],
        },

        {
          heading: "Exercise Pattern 19: Bayes' Theorem Applications",
          content: "Given P(A) and conditional probabilities P(B|A), P(B|A'), find P(A|B) = P(B|A)*P(A) / [P(B|A)*P(A) + P(B|A')*P(A')]. Compute total P(B) first.",
          formula: "P(A|B) = \\dfrac{P(B|A)\\cdot P(A)}{P(B|A)\\cdot P(A) + P(B|A')\\cdot P(A')}",
          example: "Factory: M1=40% (2% defective), M2=30% (3%), M3=30% (1%). P(D) = 0.4(0.02)+0.3(0.03)+0.3(0.01) = 0.020. P(M1|D) = 0.008/0.020 = 0.4 = 40%.",
          keyPoints: [
            "Bayes' theorem reverses conditional probability",
            "Compute total P(B) first",
          ],
          commonMistakes: [
            "Forgetting to compute P(B) first",
            "Confusing P(A|B) with P(B|A)",
          ],
          practiceQuestions: [
            "2% from A defective, 5% from B. 60% from A. Find P(A|defective).",
            "Test 95% accurate, prevalence 1%. Find P(disease|positive).",
            "P(A)=0.3, P(B|A)=0.5, P(B|A')=0.2. Find P(A|B).",
          ],
        },

        {
          heading: "Exercise Pattern 20: Probability Rules",
          content: "Addition rule: P(A U B) = P(A)+P(B)-P(A n B). Independent: P(A n B) = P(A)*P(B). Mutually exclusive: P(A U B) = P(A)+P(B). Complement: P(A') = 1-P(A).",
          formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\qquad P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}",
          example: "P(math)=0.7, P(physics)=0.6, P(both)=0.5. P(M U P) = 0.7+0.6-0.5 = 0.8. P(neither) = 1-0.8 = 0.2.",
          keyPoints: [
            "Addition rule subtracts intersection",
            "Independent: P(A n B) = P(A)P(B)",
            "Mutually exclusive: P(A n B) = 0",
          ],
          commonMistakes: [
            "Adding without subtracting intersection",
            "Assuming independence when events are dependent",
          ],
          practiceQuestions: [
            "P(A)=0.4, P(B)=0.5, P(A n B)=0.2. Find P(A U B).",
            "Two dice rolled. P(sum>9)?",
            "P(A)=0.3, P(B)=0.5. If independent, find P(A n B).",
          ],
        },

      ],
      keyPoints: [
        "All proofs follow NEB Class 11 & 12 Mathematics syllabus",
        "Each theorem includes statement, proof, and example",
        "Organized by syllabus unit for easy navigation",
        "Formulas use KaTeX for proper rendering",
        "20 exercise patterns cover Algebra, Calculus, Vectors, and Probability",
        "Each pattern shows the standard approach with worked solutions",
      ],
      commonMistakes: [
        "Confusing sin(A+B) with sin A + sin B",
        "Forgetting chain rule for composite functions",
        "Using degrees instead of radians in calculus",
        "Confusing population variance with sample variance",
        "Applying L'Hopital's rule when not indeterminate (0/0 or inf/inf)",
        "Forgetting +C in indefinite integrals",
        "Using AB = BA for matrices (not true in general)",
      ],
      practiceQuestions: [
        "Prove det(AB) = det(A)·det(B) for 2×2 matrices.",
        "Prove the quadratic formula by completing the square.",
        "Prove sin(A+B) = sin A cos B + cos A sin B using Euler's formula.",
        "Prove the product rule using the definition of derivative.",
        "Prove the Fundamental Theorem of Calculus.",
        "Prove integration by parts from the product rule.",
        "Prove the distance formula using the Pythagorean theorem.",
        "Prove Bayes' theorem from the definition of conditional probability.",
        "Prove the addition rule of probability using Venn diagrams.",
        "Prove that the mean of Bin(n,p) is np using linearity of expectation.",
      ],
      enrichedContent: {
        title: "The Art of Proof — How Mathematics Knows What It Knows",
        overview: "Every other science confirms claims by experiment; mathematics confirms them by PROOF — a finite chain of logic that makes a statement certain forever, for every case, past and future. This enriched section is not another list of theorems (the original tab has all 29) but the craft behind them: the four great proof methods — direct, contrapositive, contradiction, and induction — the classic showpieces that teach them, and how to reconstruct any forgotten proof under exam pressure by understanding its skeleton.",
        sections: [
          {
            heading: "1. What a Proof Is — Certainty of a Different Species",
            content: "A physicist trusts F = ma because experiments keep agreeing; a mathematician trusts the Pythagorean theorem because it has been PROVED — and no future experiment can ever overthrow a valid proof. A proof is a chain of statements, each justified by (a) an axiom or definition, (b) a previously proved theorem, or (c) pure logic — leading from hypothesis to conclusion with no gaps. The vocabulary is standardized: a THEOREM is a major proved statement; a LEMMA is a helper theorem proved en route to a bigger one; a COROLLARY is a quick consequence that falls out almost for free; a CONJECTURE is an unproved candidate (Fermat's Last Theorem was a conjecture for 358 years — the name survived even after Wiles proved it in 1995). The deepest point: proof gives UNIVERSALITY. Checking a million examples proves nothing — the polynomial n² + n + 41 yields primes for n = 0 through 39 and then fails at 40 (41² + 41 + 41 = 41·43). One proof beats a billion examples, and one counterexample kills a billion confirmations. This asymmetry — proof is forever, evidence is never enough — is what makes mathematics unique among all human knowledge.",
            formula: "\\text{axioms/definitions} + \\text{logic} + \\text{proven theorems} \\;\\longrightarrow\\; \\text{new theorem (certain, universal)}",
            keyPoints: [
              "Proof = a gapless chain from accepted truths to the new claim; certainty no experiment can match",
              "Theorem/lemma/corollary/conjecture are ranks of importance, not different kinds of truth",
              "n²+n+41 is prime 40 times running, then fails — examples never prove; one counterexample always refutes",
            ],
          },
          {
            heading: "2. Direct Proof — The Assembly Line",
            content: "The default method: assume the hypothesis, apply definitions and known theorems step by step, arrive at the conclusion. The engine is always DEFINITIONS — 'even' means n = 2k for some integer k, and that translation from word to algebra is where proofs begin. Classic warm-up: prove the sum of two even numbers is even. Let a = 2k, b = 2m (definition). Then a + b = 2k + 2m = 2(k + m) — and k + m is an integer, so a + b fits the DEFINITION of even. Done. Notice the structure: unpack definitions → manipulate → repack into a definition. Most NEB proofs (quadratic formula by completing the square, product rule from the limit definition, det(AB) = det A det B for 2×2) are direct proofs of exactly this shape. For IDENTITIES (sin(A+B) formulas and friends), the working style is: start from ONE side and transform it into the other, or transform both sides toward a common middle — never manipulate both sides simultaneously by equal operations, which secretly assumes the result (begging the question). Exam tip: write the definition you are about to use BEFORE using it; graders award method marks for exactly those justifications.",
            formula: "\\text{even} + \\text{even}: \\; 2k + 2m = 2(k+m) \\;\\checkmark \\qquad \\text{odd} \\times \\text{odd}: \\; (2k+1)(2m+1) = 2(2km+k+m)+1 \\;\\checkmark",
            keyPoints: [
              "Unpack definitions → manipulate → repack: the direct-proof assembly line",
              "Identity proofs: transform one side into the other, or both into a common middle — never assume equality",
              "State the definition/theorem you invoke at each step — that IS the proof, not decoration",
            ],
          },
          {
            heading: "3. Contrapositive and Contradiction — Proving by Impossibility",
            content: "Two related weapons for when the direct road is blocked. CONTRAPOSITIVE: 'if P then Q' is logically identical to 'if NOT Q then NOT P' — so to prove P ⇒ Q you may assume ¬Q and derive ¬P, which is often far easier. Example: prove 'if n² is even then n is even.' Directly awkward; contrapositive is clean: suppose n is ODD (n = 2k+1); then n² = 4k²+4k+1 = 2(2k²+2k)+1 is ODD. So n² even forces n even. CONTRADICTION goes further: assume the statement is FALSE and deduce an absurdity — anything impossible (0 = 1, a number both even and odd). The two showpieces every student should be able to reproduce: (1) √2 is irrational — suppose √2 = p/q in lowest terms; squaring gives p² = 2q², so p is even, p = 2r, then 2r² = q², so q is even too — but lowest terms forbids both even. Contradiction; √2 cannot be a fraction. (2) Euclid's infinite primes — suppose finitely many, p₁…pₙ; form N = p₁p₂…pₙ + 1. N is not divisible by ANY listed prime (remainder 1 always), so N is either itself a new prime or has a prime factor outside the list — either way the list was incomplete. Both proofs are two thousand years old and still the standard-bearers: contradiction is how mathematics discovers that its own intuitions (every number is a ratio; primes could be finite) are wrong.",
            formula: "P \\Rightarrow Q \\;\\equiv\\; \\neg Q \\Rightarrow \\neg P \\;(\\text{contrapositive}); \\qquad \\sqrt{2} = p/q \\;\\Rightarrow\\; p,q \\text{ both even} \\;\\Rightarrow\\; \\text{contradiction}",
            keyPoints: [
              "Contrapositive: prove ¬Q ⇒ ¬P instead — logically identical, often easier",
              "Contradiction: assume the negation, derive ANY impossibility — the claim must hold",
              "√2 irrational and primes infinite are the two proofs worth memorizing as templates",
            ],
          },
          {
            heading: "4. Induction — Toppling Infinite Dominoes",
            content: "How do you prove a statement for EVERY natural number — infinitely many cases — in finitely many lines? Mathematical induction: (1) BASE CASE — prove it for n = 1; (2) INDUCTIVE STEP — prove that IF it holds for n = k, THEN it holds for n = k+1. Together they are the domino setup: the first domino falls (base), and every domino knocks the next (step) — so all infinitely many fall. The showpiece: 1 + 2 + ... + n = n(n+1)/2. Base: 1 = 1·2/2 ✓. Step: assume true for k; then the sum to k+1 equals [k(k+1)/2] + (k+1) = (k+1)(k+2)/2 — exactly the formula with n = k+1 ✓. The crucial discipline: in the inductive step you MUST USE the assumption — a proof that never invokes the hypothesis for k is not induction, it is usually a disguised direct proof (or a gap). This is also the deepest connection in the subject: induction is the mirror of RECURSION — the way computer science defines lists, programs and proofs — and it is why the binomial theorem, the derivatives of xⁿ, and the correctness of algorithms are all provable. Common trap: 'proving' by induction without checking the base case — the classic fake proof that all horses are the same colour collapses exactly there (the k → k+1 step fails between k=1 and k=2).",
            formula: "\\big[P(1) \\;\\wedge\\; \\forall k\\,(P(k) \\Rightarrow P(k+1))\\big] \\;\\Rightarrow\\; \\forall n\\, P(n)",
            keyPoints: [
              "Base case starts the dominoes; inductive step connects every domino to the next",
              "The inductive step must actually USE the k-assumption — otherwise it is not induction",
              "Induction mirrors recursion: the proof technique behind algorithm correctness",
              "Skipping the base case is the classic fatal error — the chain needs its first link",
            ],
          },
          {
            heading: "5. Reading and Writing Proofs — The Exam Craft",
            content: "Proofs have anatomy, and exams reward the anatomy explicitly. Structure of a clean written proof: (i) restate what is GIVEN and what must be SHOWN; (ii) declare the method if non-obvious ('we prove the contrapositive'); (iii) chain justified steps, each citing a definition or theorem; (iv) close with the conclusion and the tombstone □. Recognize the standard logical hazards: BEGGING THE QUESTION (manipulating both sides of an identity until they meet — assumes what you must prove), DIVISION BY ZERO in disguise (cancelling a factor that could vanish — the source of the fake proof 1 = 2), PROVING BY EXAMPLE (works only for existence claims: 'find an n with...' needs one witness; 'for all n' needs generality), and the CONVERSE ERROR (proving Q ⇒ P when P ⇒ Q was asked — 'all squares are rectangles' proves nothing about rectangles being squares). For NEB specifically, most required proofs are reconstructions of known derivations — completing the square, limit definitions, Bayes from conditional probability — so the winning study strategy is not memorizing lines but remembering each proof's SKELETON: the one move that makes it work (e.g., Bayes = write both conditionals over P(A∩B), then divide; quadratic formula = complete the square on ax²+bx = −c). Skeletons survive exam nerves; sentences do not.",
            formula: "\\text{Given} \\;\\to\\; \\text{Method} \\;\\to\\; \\text{Justified steps} \\;\\to\\; \\text{Conclusion } \\blacksquare",
            keyPoints: [
              "Declare your method; justify each step; close explicitly — anatomy earns method marks",
              "Hazards: begging the question, hidden division by zero, example-as-proof, proving the converse",
              "Memorize skeletons (the one key move), not sentences — they rebuild under pressure",
            ],
          },
          {
            heading: "6. The Theorem Web — Nothing Is Isolated",
            content: "The 29 theorems in the original list look like a catalogue, but they form a network with a few roots. Trace any branch back: the quadratic formula is completing-the-square applied to the general quadratic (algebra); the product, quotient and chain rules all descend from the limit DEFINITION of the derivative plus algebraic tricks (add-and-subtract f(x+h)g(x) for the product rule); the Fundamental Theorem of Calculus rests on the Mean Value Theorem, which rests on Rolle's, which rests on extreme-value existence — one chain from continuity to the whole of integral calculus. In probability, everything is counting plus the definition P(A|B) = P(A∩B)/P(B): Bayes is that definition read twice and divided; the addition rule is set-bookkeeping (add, subtract the double-counted overlap); the binomial mean np is linearity of expectation applied to n indicator variables. Seeing the web changes revision strategy: instead of 29 memorized items, hold 5 roots (definitions of derivative and integral, P(A|B), matrix multiplication, the Pythagorean identity) and re-grow the rest on demand. This is also what mathematicians mean when they say understanding beats memory — a theorem you can re-derive is a theorem you cannot forget.",
            formula: "\\text{roots: } f'(x)=\\lim\\frac{f(x+h)-f(x)}{h}, \\;\\; P(A|B)=\\frac{P(A\\cap B)}{P(B)}, \\;\\; \\sin^2+\\cos^2=1, \\;\\; (AB)_{ij}=\\sum_k A_{ik}B_{kj}",
            keyPoints: [
              "The syllabus's theorems are branches of ~5 roots — learn roots, re-grow branches",
              "Each famous rule has ONE key move; that move is what 'understanding the proof' means",
              "A theorem you can re-derive cannot be forgotten — derivation is the durable memory",
            ],
          },
        ],
        keyPoints: [
          "Proof = gapless logical chain; one proof outweighs a billion examples",
          "Four methods: direct (definition assembly line), contrapositive (¬Q ⇒ ¬P), contradiction (assume false, derive absurdity), induction (dominoes)",
          "√2 irrational, primes infinite, sum formula — the three templates every student should reproduce cold",
          "Identity proofs: transform one side only; induction: must use the k-assumption; always check base cases",
          "The theorem syllabus is a web with few roots — learn skeletons, re-grow details",
        ],
        commonMistakes: [
          "Begging the question: manipulating both sides of an identity as if equality already held",
          "Induction without using the inductive hypothesis, or without verifying the base case",
          "Proving the converse of what was asked ('all squares are rectangles' ≠ 'all rectangles are squares')",
          "Using one example to prove a 'for all' statement",
          "Cancelling a factor that could equal zero — the hidden division by zero behind fake proofs that 1 = 2",
        ],
        practiceQuestions: [
          "Prove directly: the sum of two odd numbers is even, and the product of two odd numbers is odd. Identify the definition doing the work in each.",
          "Prove by contrapositive: if 3n + 2 is odd, then n is odd.",
          "Reproduce Euclid's proof of infinitely many primes from memory; then explain precisely where the 'remainder 1' observation is used.",
          "Prove by induction: 1 + 3 + 5 + ... + (2n−1) = n². Point out where the induction hypothesis is consumed.",
          "Find the flaw in this 'proof' that 1 = 2: let a = b; then a² = ab; a² − b² = ab − b²; (a+b)(a−b) = b(a−b); a+b = b; 2b = b; 1 = 2.",
          "Re-derive the quadratic formula from ax² + bx + c = 0 by completing the square, stating every algebraic move — then state its skeleton in one sentence.",
          "Derive Bayes' theorem from P(A|B) = P(A∩B)/P(B) in three lines; then derive the law of total probability P(B) = P(B|A)P(A) + P(B|A')P(A') and substitute.",
          "Explain why 'all horses are the same colour' induction fails: locate the exact step that breaks between k = 1 and k = 2.",
        ],
      },
    },
  },

  biology: {
    cell: {
      title: "Cell Theory & Structure",
      overview: "The cell is the basic unit of life. Cell theory states that all organisms are composed of cells, cells are the smallest unit of life, and all cells come from pre-existing cells. Prokaryotic cells lack a nucleus; eukaryotic cells have membrane-bound organelles.",
      sections: [
        {
          heading: "1. Cell Theory",
          content: "Cell theory has three main tenets: (1) All living organisms are composed of one or more cells. (2) The cell is the basic unit of structure and organization in organisms. (3) All cells arise from pre-existing cells (Virchow, 1855). Cells range from 0.1 μm (bacteria) to over 100 μm (some plant/animal cells).",
          formula: "\\text{Schleiden (1838) + Schwann (1839) + Virchow (1855) = Cell Theory}",
        },
        {
          heading: "2. Prokaryotic vs Eukaryotic Cells",
          content: "Prokaryotes (bacteria, archaea) lack a membrane-bound nucleus and organelles. Their DNA is a single circular chromosome in the nucleoid region. Eukaryotes (plants, animals, fungi, protists) have a true nucleus and membrane-bound organelles. Eukaryotic cells are typically 10-100 μm; prokaryotic cells are 0.1-5 μm.",
          formula: "\\text{Prokaryote: } 0.1{-}5\\,\\mu\\text{m} \\qquad \\text{Eukaryote: } 10{-}100\\,\\mu\\text{m}",
        },
        {
          heading: "3. Cell Membrane",
          content: "The cell membrane (plasma membrane) is a selectively permeable phospholipid bilayer with embedded proteins (fluid mosaic model). It controls what enters and exits the cell, provides structural support, and contains receptors for cell signaling.",
          formula: "\\text{Fluid Mosaic Model: } \\text{phospholipids} + \\text{proteins} + \\text{cholesterol}",
        },
        {
          heading: "4. Key Organelles",
          content: "Nucleus: stores DNA, controls cell activities. Mitochondria: ATP production (cell's powerhouse). Ribosomes: protein synthesis. Endoplasmic reticulum (ER): rough ER (with ribosomes) synthesizes proteins; smooth ER synthesizes lipids. Golgi apparatus: modifies, sorts, and packages proteins. Lysosomes: digest waste. Vacuoles: storage (large central vacuole in plant cells). Chloroplasts: photosynthesis (plant cells only).",
          formula: "\\text{Mitochondria: } 2C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\,ATP",
        },
        {
          heading: "5. Plant vs Animal Cells",
          content: "Plant cells have: cell wall (cellulose), chloroplasts, large central vacuole. Animal cells have: centrioles, lysosomes, smaller vacuoles. Both have: nucleus, mitochondria, ER, Golgi, ribosomes, plasma membrane.",
          formula: "\\text{Cell wall: } (C_6H_{10}O_5)_n \\quad (\\text{cellulose})",
        },
      ],
      keyPoints: [
        "Cell is the smallest unit of life",
        "All cells come from pre-existing cells",
        "Plant cells have cell walls; animal cells do not",
        "Mitochondria and chloroplasts have their own DNA (endosymbiotic theory)",
        "The nucleus contains the cell's genetic material (DNA)",
      ],
      commonMistakes: [
        "Thinking all cells have a nucleus (prokaryotes don't)",
        "Confusing cell wall with cell membrane (wall is outside membrane, made of cellulose in plants)",
        "Thinking animal cells have chloroplasts (they don't — only plant cells do)",
        "Forgetting that ribosomes are found in both prokaryotes and eukaryotes",
      ],
      practiceQuestions: [
        "Label the parts of a plant cell and state the function of each.",
        "What are the key differences between prokaryotic and eukaryotic cells?",
        "Why are mitochondria called the 'powerhouse of the cell'?",
        "Explain the fluid mosaic model of the cell membrane.",
        "How does the cell wall differ from the cell membrane in structure and function?",
      ],
      enrichedContent: {
        title: "The Cell: Why Life Is Built From Boxes",
        overview:
          "Before memorising organelles, ask a deeper question: why is life cellular at all, and why are cells so small? A cell is not a bag of parts — it is a bounded chemical system that solves three impossible problems at once: it must concentrate reactions in a tiny volume, exchange materials fast enough to stay alive, and copy itself with near-perfect fidelity. Everything about cell structure follows from those constraints. The real story of the eukaryotic cell is a merger: an ancient archaeon swallowed a bacterium and never digested it, and that captive became the mitochondrion. You are a collaboration, not a single lineage.",
        sections: [
          {
            heading: "1. Why Cells? The Boundary Is the Invention",
            content:
              "Chemistry alone is not life; a soup of amino acids drifts apart. What makes a cell alive is a boundary that creates a difference between inside and outside. By walling off a small volume, a cell can concentrate reactants millions of times above their environmental level, keep the products it just made instead of losing them to diffusion, and maintain gradients (ions, protons, charge) that store energy like a charged battery. Life is fundamentally a non-equilibrium process — it persists only by constantly spending energy to stay different from its surroundings. The membrane is therefore the most important molecule-level invention in biology: without a boundary there is no 'self' to be a unit of selection.",
            formula:
              "\\text{Cell} = \\text{bounded volume} + \\text{energy-coupled chemistry} + \\text{heritable information}",
          },
          {
            heading: "2. The Surface-Area Crisis: Why Cells Stay Tiny",
            content:
              "A cell's metabolism scales with its volume (the amount of cytoplasm doing reactions), but its ability to import food and export waste scales with its surface area (the membrane). Volume grows as r³ while surface grows only as r² — so as a cell enlarges, surface area falls behind fast. Double the radius and volume octuples (×8) but surface only quadruples (×4). Past a critical size a cell simply cannot feed its own interior or clear its heat and CO₂ quickly enough. This single geometric fact explains why organisms are made of trillions of small cells rather than a few giant ones, and why specialised exchange surfaces (villi, alveoli, capillaries, root hairs, gill filaments) are all folded — folding is biology's trick for buying surface area without buying volume.",
            formula:
              "\\frac{\\text{Surface}}{\\text{Volume}} = \\frac{4\\pi r^2}{\\tfrac{4}{3}\\pi r^3} = \\frac{3}{r} \\quad (\\text{shrinks as } r \\text{ grows})",
            example:
              "A spherical cell of radius 1 μm has S/V = 3. At radius 10 μm, S/V = 0.3 — a tenfold worse exchange ratio, so ten times harder to keep the interior supplied.",
          },
          {
            heading: "3. The Membrane Is Not a Wall — It Is a Decision Engine",
            content:
              "The fluid mosaic model is usually taught as 'phospholipids plus proteins', but the deeper idea is selective gating. The hydrophobic core of the bilayer lets small non-polar molecules (O₂, CO₂) slip straight through, blocks ions and large polar molecules entirely, and leaves everything else to protein machines. Channels are water-filled tunnels (fast, passive); carriers change shape to shuttle specific solutes; pumps spend ATP to move substances against their gradient, building up the very imbalances the cell lives on. The membrane therefore does not merely enclose the cell — it decides what the cell is chemically, moment to moment. Your nerve impulses, kidney filtration, and nutrient absorption are all just elaborate forms of a membrane saying yes or no.",
            formula:
              "\\text{Passive (down gradient, free)} \\;\\leftrightarrow\\; \\text{Active (against gradient, costs ATP)}",
          },
          {
            heading: "4. Organelles as Compartmentalised Factories",
            content:
              "Eukaryotes do not run all chemistry in one open space; they separate incompatible reactions into membrane-bound rooms so each can be optimised independently. The lysosome keeps digestive acid and enzymes (pH ≈ 4.5) sealed away from the neutral cytosol, so digestion happens only where intended. The mitochondrion folds its inner membrane into cristae to pack in electron-transport chains and build a proton gradient — the cristae are the surface-area trick again, applied internally. The nucleus walls DNA away from the churn of the cytoplasm so transcription can be regulated. Compartmentalisation is the same principle as a factory floor: specialise each station, protect sensitive steps, and route the product between them (the endomembrane system: ER → Golgi → vesicles).",
            formula:
              "\\text{Mitochondrion: } C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\sim\\!30\\,ATP",
          },
          {
            heading: "5. Endosymbiosis: You Are Two Lineages in One Body",
            content:
              "The most striking fact about eukaryotic cells is that mitochondria and chloroplasts look and behave like bacteria: they are about bacterial size, carry their own small circular DNA, have their own ribosomes (70S, like bacteria), divide by simple fission independently of the cell, and are enclosed by a double membrane. The endosymbiotic theory explains this as ancestry, not coincidence: roughly 1.5–2 billion years ago an archaeal host cell engulfed an aerobic α-proteobacterium but failed to digest it. The captive supplied efficient ATP using oxygen; the host supplied protection and nutrients. The partnership became permanent and the captive became the mitochondrion. A later, separate engulfment of a cyanobacterium gave rise to chloroplasts in plants. Every breath you take is powered by a former free-living bacterium living inside your cells.",
            formula:
              "\\text{Archaeon} + \\text{α-proteobacterium} \\rightarrow \\text{mitochondrion}; \\quad \\text{+ cyanobacterium} \\rightarrow \\text{chloroplast}",
          },
          {
            heading: "6. Prokaryote vs Eukaryote: A Difference of Organisation, Not Worth",
            content:
              "Prokaryotes (bacteria and archaea) are not 'primitive failures to make a nucleus' — they are supremely successful, having dominated Earth for ~3.5 billion years and still outweighing all other life. Their design is streamlined: a single circular chromosome in a nucleoid, no internal membranes, transcription and translation happening simultaneously in the same compartment. That coupling is actually an advantage for speed — a bacterium can begin making a protein from an mRNA before the mRNA is even finished. Eukaryotes traded that speed for regulation: by separating transcription (nucleus) from translation (cytoplasm), they gained the chance to edit, splice, and control messages, enabling complexity and multicellularity. Small and fast versus large and controllable — both are winning strategies, not steps on a ladder.",
            formula:
              "\\text{Prokaryote: } 0.1{-}5\\,\\mu m,\\ \\text{no nucleus} \\qquad \\text{Eukaryote: } 10{-}100\\,\\mu m,\\ \\text{true nucleus}",
          },
        ],
        keyPoints: [
          "The membrane — a boundary that maintains non-equilibrium — is the defining invention of life, not a passive wrapper",
          "Cells stay small because surface area (r²) can't keep up with volume (r³); folding buys surface without volume",
          "Selective permeability makes the membrane a decision engine: channels, carriers, and ATP-driven pumps",
          "Compartmentalisation separates incompatible reactions (lysosomal acid, mitochondrial gradients) so each is optimised",
          "Mitochondria and chloroplasts are former free-living bacteria captured by endosymbiosis — you are a merger of lineages",
        ],
        commonMistakes: [
          "Treating the cell membrane as a static wall; it is fluid, dynamic, and actively selective",
          "Explaining small cell size as 'they need less food' — the real reason is the surface-to-volume limit on exchange",
          "Calling prokaryotes 'simpler therefore inferior'; they are highly successful and their coupled transcription-translation is faster",
          "Forgetting that mitochondria/chloroplasts have their own DNA, ribosomes, and division — evidence for endosymbiosis",
          "Assuming all reactions happen freely in the cytosol; eukaryotes deliberately isolate them in organelles",
        ],
        practiceQuestions: [
          "Using the surface-to-volume ratio, explain mathematically why a cell cannot simply grow indefinitely.",
          "Why is folding (cristae, villi, microvilli) such a common solution across very different organ systems?",
          "List three pieces of evidence for the endosymbiotic origin of mitochondria and explain why each is convincing.",
          "A membrane must be selectively permeable to be useful. Explain what would go wrong if it were freely permeable to everything.",
          "Compare the speed advantage of coupled transcription-translation in prokaryotes with the regulatory advantage of separating them in eukaryotes.",
          "Explain how the lysosome's internal pH and sealed membrane protect the rest of the cell.",
          "If life requires a boundary, energy-coupled chemistry, and heritable information, argue why a virus is or is not a cell.",
        ],
      },
    },
    genetics: {
      title: "Genetics & Heredity",
      overview: "Genetics studies heredity and variation. Mendel's laws describe inheritance patterns. DNA is the genetic material — a double helix with complementary base pairing. The central dogma describes information flow: DNA → RNA → protein.",
      sections: [
        {
          heading: "1. Mendel's Laws",
          content: "Law of Segregation: allele pairs separate during gamete formation — each gamete gets one allele. Law of Independent Assortment: genes for different traits segregate independently (true for genes on different chromosomes). Monohybrid cross (Aa × Aa) gives 3:1 phenotypic ratio; dihybrid cross (AaBb × AaBb) gives 9:3:3:1 ratio.",
          formula: "\\text{Monohybrid cross: } Aa \\times Aa \\rightarrow 1\\,AA : 2\\,Aa : 1\\,aa \\quad (3:1 \\text{ phenotypic ratio})",
        },
        {
          heading: "2. DNA Structure",
          content: "DNA is a double helix with two antiparallel strands. The backbone is sugar-phosphate; bases project inward. Base pairing: A=T (2 hydrogen bonds), G≡C (3 hydrogen bonds). This complementarity enables replication and transcription.",
          formula: "A = T \\;(2\\;\\text{H-bonds}), \\qquad G \\equiv C \\;(3\\;\\text{H-bonds})",
        },
        {
          heading: "3. DNA Replication",
          content: "Replication is semi-conservative: each new DNA molecule has one old strand and one new strand. Helicase unwinds the double helix. DNA polymerase adds nucleotides in the 5'→3' direction. Leading strand is synthesized continuously; lagging strand in Okazaki fragments.",
          formula: "Helicase opens → DNA polymerase adds nucleotides 5'\\rightarrow 3'",
        },
        {
          heading: "4. Transcription",
          content: "Transcription is the synthesis of mRNA from a DNA template. RNA polymerase reads the template strand (3'→5') and synthesizes mRNA (5'→3'). In eukaryotes, the pre-mRNA undergoes processing: 5' cap, poly-A tail, and splicing (removal of introns).",
          formula: "DNA: 3'-TACGG-5' \\rightarrow \\text{mRNA: } 5'-AUGCC-3'",
        },
        {
          heading: "5. Translation",
          content: "Translation is protein synthesis at the ribosome. mRNA codons (triplets of nucleotides) specify amino acids. tRNA molecules carry specific amino acids and have anticodons complementary to mRNA codons. The genetic code is degenerate (multiple codons can code for the same amino acid) but unambiguous (each codon codes for only one amino acid).",
          formula: "\\text{Genetic code: } 64\\;\\text{codons} \\rightarrow 20\\;\\text{amino acids} \\quad (\\text{degenerate but unambiguous})",
        },
      ],
      keyPoints: [
        "DNA is a double helix with complementary base pairing (A=T, G≡C)",
        "mRNA carries genetic information from nucleus to ribosome",
        "One gene → one polypeptide (central dogma)",
        "Codon: 3 nucleotides = 1 amino acid; start codon = AUG (methionine)",
        "Replication is semi-conservative",
      ],
      commonMistakes: [
        "Thinking DNA replication is conservative (it's semi-conservative)",
        "Confusing transcription (DNA→RNA) with translation (RNA→protein)",
        "Forgetting that RNA has uracil (U) instead of thymine (T)",
        "Thinking each codon can code for multiple amino acids (each codon is unambiguous)",
      ],
      practiceQuestions: [
        "If a DNA strand is 3'-TACGTA-5', write the mRNA sequence.",
        "A monohybrid cross between two heterozygotes (Aa × Aa) produces what genotypic and phenotypic ratios?",
        "What is the complementary DNA strand to 5'-ATGGCC-3'?",
        "If a protein has 300 amino acids, what is the minimum number of nucleotides in the coding DNA?",
        "Explain why the genetic code is described as 'degenerate but unambiguous.'",
      ],
      enrichedContent: {
        title: "Genetics: How Chemistry Became Memory",
        overview:
          "The deepest idea in genetics is not the Punnett square — it is that information can be stored in matter. A gene is not a mystical blueprint; it is a polymer whose sequence of four bases encodes instructions the way letters encode a sentence. This reframes heredity as a molecular copy-and-read problem, and explains everything from Mendel's ratios to mutations to why you resemble your parents. Genetics is also the origin of a profound asymmetry: the code is degenerate (redundant, so many mutations are silent) yet unambiguous (each codon means exactly one thing). Life runs on error-tolerant, digital chemistry.",
        sections: [
          {
            heading: "1. Mendel Was Doing Statistics Before Statistics",
            content:
              "Mendel had no idea about DNA or chromosomes, yet he recovered the laws of inheritance by an act of genius: he chose traits with clean either/or outcomes, counted huge numbers of offspring, and looked for ratios. The 3:1 ratio in a monohybrid cross is not magic — it is the arithmetic of two hidden factors (alleles) separating into gametes and recombining at random. His 'law of segregation' is really a statement about probability: each parent contributes one of its two alleles with equal chance. This is why genetics became the first truly quantitative biology, and why the Punnett square is just a probability table. Mendel's insight was to realise that invisible discrete units, not blending fluids, carry traits — otherwise variation would wash out in a generation.",
            formula:
              "Aa \\times Aa \\;\\rightarrow\\; 1\\,AA : 2\\,Aa : 1\\,aa \\;\\Rightarrow\\; 3:1 \\text{ phenotype (dominant:recessive)}",
          },
          {
            heading: "2. Why Ratios Break: The Beautiful Exceptions",
            content:
              "Real inheritance rarely gives clean 3:1 or 9:3:3:1 ratios, and the deviations are where the biology lives. Incomplete dominance blends (red × white → pink); codominance shows both (blood type AB expresses A and B equally); multiple alleles give more than two options (the ABO system has three: Iᴬ, Iᴮ, i). Genes on the same chromosome violate independent assortment because they are physically linked and travel together — the closer they are, the more often they are inherited as a unit, and the crossover frequency between them became the first way to map a chromosome. Sex-linked genes on the X chromosome produce the striking pattern where colour-blindness and haemophilia affect males far more often (they have only one X, so a single recessive allele shows). The exceptions are not noise; they are the map.",
            formula:
              "\\text{Recombination frequency} = \\frac{\\text{recombinant offspring}}{\\text{total}} \\times 100\\% \\;\\Rightarrow\\; \\text{map units (cM)}",
          },
          {
            heading: "3. DNA Is Digital Chemistry",
            content:
              "The double helix is revolutionary because it solves a physical problem: how can a molecule store vast information and copy it exactly? The answer is that the two strands are complementary — A always pairs with T, G always with C. This means each strand is a template for rebuilding the other. Unzip the helix and each half dictates the reconstruction of its missing partner, so copying is automatic and near-perfect. The information is not in the shape but in the sequence, exactly like the meaning of a sentence is in the order of its letters, not the ink. Complementarity is why heredity works at all: it gives chemistry a way to remember and to reproduce what it remembers.",
            formula:
              "A = T \\;(2\\,\\text{H-bonds}), \\quad G \\equiv C \\;(3\\,\\text{H-bonds}) \\;\\Rightarrow\\; \\text{each strand templates its partner}",
          },
          {
            heading: "4. The Central Dogma Has a Direction — and Loopholes",
            content:
              "Information normally flows DNA → RNA → protein, and this one-way street matters: proteins do the work of the cell but cannot rewrite the DNA that made them, so acquired traits are not inherited (this is why Lamarck was wrong). The flow is also lossy at each step — DNA is transcribed to mRNA (with U replacing T), the mRNA is edited and shipped out of the nucleus, and ribosomes translate its codons into an amino-acid chain. But nature keeps loopholes: some viruses run the dogma backwards with reverse transcriptase (RNA → DNA, as in HIV), and prions transmit information as folded protein shape with no nucleic acid at all. The dogma describes the dominant rule, not an absolute law — and knowing the exceptions is what lets us understand retroviruses and certain diseases.",
            formula:
              "DNA \\xrightarrow{\\text{transcription}} RNA \\xrightarrow{\\text{translation}} \\text{Protein} \\qquad (\\text{reverse transcriptase: } RNA \\rightarrow DNA)",
          },
          {
            heading: "5. The Code Is Degenerate but Unambiguous — and Nearly Universal",
            content:
              "Three bases give 4³ = 64 possible codons, but there are only 20 amino acids, so the code is redundant: several codons specify the same amino acid (degenerate). Crucially it is never ambiguous — a given codon always means the same amino acid. This redundancy is a built-in error buffer: a mutation in the third base of a codon often lands on the same amino acid (a silent mutation), so DNA tolerates change far better than a one-to-one code would. The code also has punctuation: AUG starts (and codes methionine), while UAA/UAG/UGA stop. Most astonishing is that the same code is used by bacteria, oak trees, and you — powerful evidence that all life shares a single common ancestor, because a different code would be lethal to switch.",
            formula:
              "4^3 = 64\\ \\text{codons} \\rightarrow 20\\ \\text{amino acids} + 3\\ \\text{stop} \\;\\Rightarrow\\; \\text{degenerate, unambiguous, universal}",
          },
          {
            heading: "6. Mutation Is the Raw Material of Everything",
            content:
              "Without change in DNA there would be no variation, and without variation natural selection has nothing to select — evolution would be impossible. Mutations are the ultimate source of all genetic novelty. Most are neutral (silent or in non-coding DNA), some are harmful (a single base change causes sickle-cell anaemia by swapping one amino acid in haemoglobin), and rarely one is advantageous. The sickle-cell story is the classic paradox: the same allele that causes disease in the homozygous form protects against malaria in the heterozygous form, so it is maintained at high frequency exactly where malaria is common — a balanced trade-off, not a simple defect. Mutations are random with respect to need; the environment does not direct them, it only filters the results afterwards.",
            formula:
              "\\text{Point mutation} = \\text{single base change} \\;\\rightarrow\\; \\text{silent} \\;|\\; \\text{missense} \\;|\\; \\text{nonsense}",
          },
        ],
        keyPoints: [
          "A gene is digital information stored in a base sequence — heredity is a molecular copy-and-read process",
          "Mendel's ratios are probability tables; the exceptions (linkage, codominance, sex-linkage) reveal the chromosome map",
          "Complementary strands make DNA self-copying: each strand is a template for the other",
          "The central dogma flows DNA→RNA→protein (why acquired traits aren't inherited), with viral loopholes",
          "The genetic code is degenerate yet unambiguous and nearly universal — evidence for a single common ancestor",
        ],
        commonMistakes: [
          "Treating deviations from 3:1 as errors rather than the informative cases (linkage, dominance patterns)",
          "Thinking proteins can rewrite DNA — the dogma's one-way flow is why acquired traits aren't inherited",
          "Confusing 'degenerate' (redundant code) with 'sloppy'; it is redundancy with zero ambiguity",
          "Assuming mutations are directed by need; they arise randomly and the environment only filters them",
          "Calling the sickle-cell allele purely harmful and ignoring the heterozygote malaria advantage",
        ],
        practiceQuestions: [
          "Explain why a 3:1 phenotypic ratio is really a statement about probability, not a guarantee for any single family.",
          "Two genes are inherited together far more often than expected. What does this suggest, and how would you map their distance?",
          "Why does DNA complementarity make exact copying almost automatic?",
          "A retrovirus converts its RNA into DNA inside your cells. Which enzyme does this, and why does it not violate the point of the central dogma?",
          "Show how the code's degeneracy acts as a buffer against the effects of many point mutations.",
          "Explain the sickle-cell paradox: how can an allele that causes disease stay common in a population?",
          "The genetic code is nearly the same in every organism. What does this imply about the origin of life?",
        ],
      },
    },
    ecology: {
      title: "Ecology & Environment",
      overview: "Ecology studies interactions between organisms and their environment. Energy flows through ecosystems in one direction; nutrients cycle. The 10% rule states that only about 10% of energy transfers between trophic levels.",
      sections: [
        {
          heading: "1. Ecosystem Components",
          content: "Biotic components: producers (autotrophs), consumers (heterotrophs), decomposers (detritivores). Abiotic components: sunlight, water, soil, temperature, nutrients. An ecosystem includes all biotic and abiotic components in a defined area.",
          formula: "\\text{Energy flow: Sun} \\rightarrow \\text{Producer} \\rightarrow \\text{Consumer} \\rightarrow \\text{Decomposer}",
        },
        {
          heading: "2. Food Chain and Food Web",
          content: "A food chain shows linear feeding relationships: producer → primary consumer → secondary consumer → tertiary consumer. A food web is a network of interconnected food chains. The 10% rule: only ~10% of energy transfers to the next trophic level; the rest is lost as heat.",
          formula: "10\\%\\;\\text{rule: only ~10\\% energy transfers to next trophic level}",
        },
        {
          heading: "3. Biogeochemical Cycles",
          content: "Carbon cycle: photosynthesis fixes CO₂ into organic compounds; respiration and decomposition release CO₂ back. Nitrogen cycle: N₂ is fixed by bacteria into usable forms (nitrification), taken up by plants, returned to soil by decomposition, and converted back to N₂ by denitrifying bacteria.",
          formula: "\\text{Carbon: } 6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2",
        },
        {
          heading: "4. Population Ecology",
          content: "Population growth can be exponential (J-curve, unlimited resources) or logistic (S-curve, limited by carrying capacity K). The logistic equation: dN/dt = rN((K-N)/K), where r is the intrinsic growth rate.",
          formula: "\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right) \\quad (\\text{logistic growth})",
        },
        {
          heading: "5. Biodiversity and Conservation",
          content: "Biodiversity exists at genetic, species, and ecosystem levels. Biodiversity hotspots have high species richness and significant habitat loss. Conservation strategies: in-situ (protecting habitats: national parks, reserves) and ex-situ (protecting outside habitats: zoos, seed banks, botanical gardens).",
          formula: "\\text{Biodiversity hotspots: } \\gt 1500\\;\\text{vascular plant species, } \\gt 70\\%\\;\\text{original habitat lost}",
        },
      ],
      keyPoints: [
        "Energy flows one way; nutrients cycle",
        "Only ~10% energy transfers between trophic levels",
        "Biodiversity = variety of life at all levels (genetic, species, ecosystem)",
        "Carrying capacity (K) limits population growth in logistic model",
        "In-situ conservation protects species in their natural habitat",
      ],
      commonMistakes: [
        "Thinking energy cycles in ecosystems (it flows one way and is lost as heat)",
        "Confusing biotic (living) with abiotic (non-living) components",
        "Thinking all ecosystems have the same number of trophic levels (usually 3-5)",
        "Confusing in-situ with ex-situ conservation",
      ],
      practiceQuestions: [
        "Draw a food web for a forest ecosystem and identify trophic levels.",
        "If a producer has 10,000 J of energy, how much reaches the tertiary consumer?",
        "Explain the difference between exponential and logistic population growth.",
        "Describe the nitrogen cycle and the role of bacteria in each step.",
        "What makes a region a biodiversity hotspot? Give one example from Nepal.",
      ],
      enrichedContent: {
        title: "Ecology: The Economy of Energy and the Web of Dependence",
        overview:
          "Ecology is best understood as the study of flows. Two things move through every ecosystem and they behave in opposite ways: energy flows through once and is lost, while matter cycles endlessly and is reused. Grasping this asymmetry explains the shape of all life on Earth — why food chains are short, why there are far more plants than predators, and why a top carnivore needs a whole landscape beneath it. Beyond energy, ecology reveals that no species stands alone: each is a node in a network of dependencies, and perturbing one node ripples through the rest. The 'balance of nature' is really a dynamic, self-correcting tension, not a static peace.",
        sections: [
          {
            heading: "1. The Two Flows: Energy Leaks, Matter Recycles",
            content:
              "The most important sentence in ecology: energy flows one way, matter cycles. Sunlight arrives as high-quality energy, passes through living things, and leaves as low-quality heat that can never be reused by organisms — so the ecosystem must be fed a constant stream of new solar energy or it stops. Matter is different: the carbon in your body was once in the air, in a plant, perhaps in a dinosaur, and will return to the soil and atmosphere to be used again. There is no 'new' matter on Earth; every atom you contain has been recycled countless times. This is why energy pyramids are always upright and finite while nutrients loop forever, and why life ultimately depends on an external power source (the Sun) but a closed set of building blocks.",
            formula:
              "\\text{Sun} \\rightarrow \\text{producers} \\rightarrow \\text{consumers} \\rightarrow \\text{heat (lost)} \\qquad \\text{matter: } \\text{recycled}",
          },
          {
            heading: "2. The 10% Rule Is Really the Second Law of Thermodynamics",
            content:
              "Only about 10% of the energy at one trophic level appears at the next, and this is not an arbitrary number — it is a consequence of physics. At each transfer most energy is lost as metabolic heat (respiration, movement, keeping warm), in undigested material, and in waste; only a fraction is converted into new body tissue a predator can eat. Because each level keeps only ~10%, a chain of four levels passes on just 0.1% of the original energy. This hard limit explains why food chains rarely exceed four or five links, why herbivore biomass vastly exceeds carnivore biomass, and why eating lower on the chain (plants over meat) can feed many more people from the same land — you skip the losses.",
            formula:
              "100\\% \\rightarrow 10\\% \\rightarrow 1\\% \\rightarrow 0.1\\% \\;\\Rightarrow\\; \\text{chains stay short}",
            example:
              "10,000 J in grass → ~1,000 J in a grasshopper → ~100 J in a frog → ~10 J in a snake. Only 0.1% of the grass's energy reaches the snake.",
          },
          {
            heading: "3. Everything Is Connected: Keystone Species and Cascades",
            content:
              "Some species hold up an entire community far out of proportion to their numbers. Remove a keystone species and the ecosystem reorganises dramatically. The classic case is the sea otter: otters eat sea urchins, urchins graze kelp forests. Hunt the otters and urchins explode, strip the kelp, and collapse a whole habitat that sheltered hundreds of other species. Similarly wolves reintroduced to Yellowstone reduced over-grazing elk, which let riverside willows recover, which brought back beavers and songbirds — a trophic cascade that even changed the paths of rivers. The lesson is that ecosystems are networks, not lists: the connections matter as much as the members, and the strongest effects often come from the top down, not the bottom up.",
            formula:
              "\\text{Keystone removed} \\Rightarrow \\text{trophic cascade} \\Rightarrow \\text{community restructures}",
          },
          {
            heading: "4. Populations: The Struggle Between r and K",
            content:
              "A population with unlimited resources grows exponentially — a J-curve, where each generation multiplies the last and growth accelerates. But no environment is unlimited. Resources, space, and predators impose a carrying capacity K, bending the curve into an S-shape (logistic growth): fast at first, slowing as the population approaches K, then levelling off. Species fall into two broad strategies. r-strategists (insects, weeds, bacteria) reproduce fast and in huge numbers, betting on quantity in unstable environments. K-strategists (elephants, whales, humans) invest heavily in few offspring, betting on quality in stable, crowded ones. Understanding where a species sits on this spectrum explains everything from pest outbreaks to why large animals are so vulnerable to overhunting.",
            formula:
              "\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right) \\quad \\xrightarrow{N \\to K}\\; \\text{growth} \\to 0",
          },
          {
            heading: "5. Interactions Beyond Eat-or-Be-Eaten",
            content:
              "Predation is only one of many relationships. Mutualism benefits both partners (bees and flowers, nitrogen-fixing bacteria and legume roots, the gut microbiome and you). Commensalism helps one and leaves the other unaffected (barnacles on a whale). Parasitism benefits one at the other's expense (ticks, tapeworms, mistletoe) — and parasites are among the most successful organisms on Earth, driving much of evolution through the arms race with hosts. Competition, when two species need the same limited resource, pushes them to diverge: the competitive-exclusion principle says two species cannot occupy the exact same niche indefinitely, so evolution nudges them apart (character displacement) — this is a hidden engine of biodiversity.",
            formula:
              "\\text{Mutualism } (+/+),\\ \\text{Commensalism } (+/0),\\ \\text{Parasitism } (+/-),\\ \\text{Competition } (-/-)",
          },
          {
            heading: "6. Ecosystems Are Dynamic, Not Balanced",
            content:
              "The old picture of a perfectly 'balanced' nature in steady equilibrium is misleading. Ecosystems are constantly perturbed and are resilient rather than static — disturbances like fire, flood, and storm are not damage but part of the cycle. Fire clears deadwood and releases nutrients, letting fire-adapted species regenerate; without periodic burning some forests decline. What keeps systems functioning is redundancy and feedback: many species can fill a role, and negative feedbacks (predators rise when prey are abundant, then fall) dampen swings. The real ecological concern today is that human pressure removes redundancy and pushes systems past tipping points where feedbacks flip — a lake that eutrophies, a forest that becomes savanna — and these shifts are hard to reverse.",
            formula:
              "\\text{Resilience} = \\text{redundancy} + \\text{negative feedback} \\quad (\\text{lost} \\Rightarrow \\text{tipping point})",
          },
        ],
        keyPoints: [
          "Energy flows one way and is lost as heat; matter cycles endlessly — the core asymmetry of ecosystems",
          "The ~10% transfer rule is a consequence of thermodynamics and keeps food chains short (4–5 links)",
          "Keystone species and trophic cascades show ecosystems are networks where top-down effects dominate",
          "Populations balance exponential (r) growth against carrying capacity (K); species adopt r- or K-strategies",
          "Interactions span mutualism to parasitism; competition drives niche divergence and biodiversity",
        ],
        commonMistakes: [
          "Thinking energy is recycled like nutrients — energy is lost as heat and must be continually resupplied",
          "Treating the 10% figure as exact or arbitrary rather than an emergent consequence of the second law",
          "Assuming ecosystems seek a fixed 'balance'; they are dynamic and disturbance is often essential",
          "Judging a species' importance by its numbers, missing keystone species that are few but pivotal",
          "Ignoring competition's role — it is a major driver of speciation and niche separation",
        ],
        practiceQuestions: [
          "Explain why energy must flow continuously into an ecosystem while matter does not.",
          "Using the 10% rule, calculate how much energy from 50,000 J of algae reaches a tertiary consumer.",
          "Describe a trophic cascade and explain why the keystone predator is essential to it.",
          "Contrast r- and K-strategists and explain why large mammals are especially vulnerable to overexploitation.",
          "Two similar bird species share one island but feed at different heights in the same trees. What principle explains this?",
          "Give one example each of mutualism, commensalism, and parasitism from a Nepali ecosystem.",
          "Why is a forest fire sometimes beneficial rather than destructive to an ecosystem?",
        ],
      },
    },
    human: {
      title: "Human Physiology",
      overview: "Human physiology studies the functions of organ systems. The circulatory system transports substances; the respiratory system exchanges gases; the digestive system breaks down food; the nervous system coordinates activities; the excretory system removes waste.",
      sections: [
        {
          heading: "1. Circulatory System",
          content: "The heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle. Blood flows: body → right atrium → right ventricle → lungs → left atrium → left ventricle → body. Cardiac output = heart rate × stroke volume ≈ 70 × 70 = 4900 mL/min at rest.",
          formula: "\\text{Cardiac output} = \\text{HR} \\times \\text{SV} = 70 \\times 70 = 4900\\;\\text{mL/min}",
        },
        {
          heading: "2. Respiratory System",
          content: "Gas exchange occurs in alveoli: O₂ diffuses into blood, CO₂ diffuses out. Hemoglobin (Hb) carries O₂: O₂ + 4Hb ⇌ Hb₄O₈. Breathing is controlled by the medulla oblongata, responding to CO₂ levels in blood.",
          formula: "O_2 + 4Hb \\rightleftharpoons Hb_4O_8 \\quad (\\text{hemoglobin})",
        },
        {
          heading: "3. Digestive System",
          content: "Mechanical and chemical digestion breaks food into absorbable units. Enzymes: amylase (carbs in mouth), pepsin (protein in stomach), lipase (fats in small intestine). The small intestine is the primary site of absorption with villi and microvilli increasing surface area.",
          formula: "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{Maltose} \\xrightarrow{\\text{maltase}} \\text{Glucose}",
        },
        {
          heading: "4. Nervous System",
          content: "Neurons transmit electrical signals. Resting potential: -70 mV. Action potential: +30 mV. The signal travels: dendrite → cell body → axon → terminal. Synapses transmit signals via neurotransmitters. The brain has cerebrum (thinking), cerebellum (coordination), and brainstem (vital functions).",
          formula: "\\text{Resting potential: } -70\\,\\text{mV} \\quad \\text{Action potential: } +30\\,\\text{mV}",
        },
        {
          heading: "5. Excretory System",
          content: "Kidneys filter blood to produce urine. Each kidney has ~1 million nephrons. Glomerular filtration rate (GFR) ≈ 125 mL/min. The nephron filters blood, reabsorbs useful substances, and secretes waste. Urine passes through ureter → bladder → urethra.",
          formula: "\\text{GFR} \\approx 125\\;\\text{mL/min} \\quad (\\text{glomerular filtration rate})",
        },
      ],
      keyPoints: [
        "Blood circulates in a closed double circulation system",
        "Alveoli provide huge surface area for gas exchange",
        "Nephron is the functional unit of the kidney",
        "Neurons communicate via electrical signals and chemical neurotransmitters",
        "The heart's pacemaker (SA node) generates electrical impulses",
      ],
      commonMistakes: [
        "Confusing pulmonary circulation (heart-lungs) with systemic circulation (heart-body)",
        "Thinking the heart pumps blood to the lungs (it receives blood FROM the lungs)",
        "Forgetting that the small intestine is the primary site of digestion and absorption",
        "Thinking action potential travels continuously along axon (it jumps between nodes of Ranvier in myelinated neurons)",
      ],
      practiceQuestions: [
        "Describe the path of a red blood cell from the heart to the big toe and back.",
        "Explain how the structure of alveoli is adapted for efficient gas exchange.",
        "What happens to blood glucose levels after a meal, and how does insulin regulate this?",
        "Describe the process of nerve impulse transmission across a synapse.",
        "Explain how the nephron filters blood and forms urine.",
      ],
      enrichedContent: {
        title: "Human Physiology: An Orchestra of Control Loops",
        overview:
          "The organ systems are usually taught as separate plumbing, but they are one integrated machine held in balance by a single principle: homeostasis. Every system is a control loop with a sensor, a set-point, and a corrector that pushes conditions back toward the target. Your temperature, blood glucose, blood pH, oxygen, and water balance are all actively defended moment to moment, mostly by negative feedback. Understanding physiology as a set of self-correcting loops — rather than a catalogue of parts — turns memorisation into reasoning: once you see the loop, you can predict what happens when it breaks.",
        sections: [
          {
            heading: "1. Homeostasis: The Idea That Unifies Everything",
            content:
              "Your internal environment is held remarkably constant while the outside world swings wildly — blood stays near 37 °C, pH near 7.4, glucose in a narrow band. This stability is not passive; it is actively maintained by negative feedback, where any deviation from a set-point triggers a response that reverses it. If you get too hot, you sweat and dilate skin vessels to cool; too cold, you shiver and constrict vessels to conserve. The body never simply 'tolerates' change — it detects and corrects it continuously. Almost every disease can be framed as a control loop that has failed, which is why homeostasis is the master concept of physiology.",
            formula:
              "\\text{Sensor} \\rightarrow \\text{control centre} \\rightarrow \\text{effector} \\rightarrow \\text{reverses deviation}",
          },
          {
            heading: "2. Circulation: Two Loops and a Pressure Puzzle",
            content:
              "Humans have double circulation — blood passes through the heart twice per circuit. The right side is a low-pressure pump to the lungs (pulmonary circuit); the left side is a powerful high-pressure pump to the whole body (systemic circuit). This separation is essential: it lets blood be fully re-oxygenated at the lungs before being driven hard to the tissues, and keeps oxygenated and deoxygenated blood from mixing. The left ventricle is therefore far thicker than the right — same organ, two jobs, two wall thicknesses. The system also faces an engineering trade-off: high pressure delivers blood fast but risks damage, so arteries branch into vast capillary beds where pressure drops and slow, thin-walled exchange can occur.",
            formula:
              "\\text{Cardiac output} = \\text{HR} \\times \\text{SV} \\approx 70 \\times 70 = 4900\\;\\text{mL/min}",
          },
          {
            heading: "3. Respiration: It's Really About CO₂, Not Oxygen",
            content:
              "A surprising fact: your breathing is driven mainly by carbon dioxide, not by a lack of oxygen. Sensors in the brainstem and arteries monitor CO₂ (via blood pH); when CO₂ rises, you breathe faster and deeper to blow it off. Oxygen levels matter far less to the drive to breathe. This is why holding your breath becomes unbearable from CO₂ build-up long before you actually run out of O₂, and why hyperventilating before diving underwater is dangerous — it dumps CO₂ and delays the urge to breathe until oxygen runs out without warning. Gas exchange itself is pure diffusion across the enormous, thin alveolar surface, maximised by the folded surface-area trick seen throughout biology.",
            formula:
              "CO_2 + H_2O \\rightleftharpoons H_2CO_3 \\rightleftharpoons H^+ + HCO_3^- \\quad (\\text{CO}_2 \\text{ drives pH, drives breathing})",
          },
          {
            heading: "4. Digestion: From Macro to Micro, Then Absorb",
            content:
              "Digestion is a single goal executed in stages: break large, insoluble food molecules into small, soluble ones that can cross a membrane and enter the blood. It is mechanical (chewing, churning) plus chemical (enzymes that hydrolyse bonds), each enzyme specific to its substrate and its pH — amylase works on starch in the near-neutral mouth, pepsin on protein in the acidic stomach, pancreatic enzymes on everything in the alkaline small intestine. The small intestine is the true workhorse: its folded lining with villi and microvilli multiplies surface area roughly 600-fold, making absorption efficient. The large intestine then reclaims water and electrolytes and houses bacteria that ferment leftovers and make vitamins.",
            formula:
              "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{maltose} \\xrightarrow{\\text{maltase}} \\text{glucose} \\xrightarrow{\\text{villi}} \\text{blood}",
          },
          {
            heading: "5. Nervous System: Electricity and Chemistry Working Together",
            content:
              "Neurons compute with voltage and communicate with chemistry. At rest, a neuron holds a charge difference (about −70 mV) across its membrane, built by ion pumps. When stimulated past a threshold, voltage-gated channels flip the charge in a wave — the action potential (≈ +30 mV) — that travels down the axon. In myelinated neurons the signal leaps between gaps (nodes of Ranvier), which is far faster. At the axon's end the electrical signal is converted into a chemical one: neurotransmitters cross the synapse to the next cell, which may be excited or inhibited. The brain is thus a vast network summing excitatory and inhibitory inputs, and everything from a reflex to a thought is a pattern of firing in that network.",
            formula:
              "\\text{Resting} \\approx -70\\,mV \\;\\rightarrow\\; \\text{threshold} \\rightarrow \\text{action potential} \\approx +30\\,mV",
          },
          {
            heading: "6. Excretion and Coordination: The Kidney as a Homeostasis Machine",
            content:
              "The kidney does far more than make urine — it is a master regulator of blood volume, pressure, pH, and ion balance. Each nephron filters blood, then reabsorbs almost everything useful back (over 99% of the filtrate) and secretes specific wastes, so the final urine is a precisely adjusted output, not just waste water. Hormones tune this in real time: ADH tells the kidney to retain water when you are dehydrated, aldosterone retains sodium, and the kidney even releases erythropoietin to trigger red-cell production when oxygen is low. This ties excretion back to the whole-body theme: a single organ running several control loops at once to keep the internal environment stable.",
            formula:
              "\\text{GFR} \\approx 125\\;\\text{mL/min};\\quad >99\\%\\ \\text{of filtrate reabsorbed}",
          },
        ],
        keyPoints: [
          "Homeostasis via negative feedback is the unifying principle — nearly every system is a control loop",
          "Double circulation separates low-pressure lung pumping from high-pressure body pumping; the left ventricle is thicker",
          "Breathing is driven mainly by CO₂ (via blood pH), not by oxygen lack",
          "Digestion converts large insoluble molecules to small soluble ones; the folded small intestine maximises absorption",
          "Neurons use electrical action potentials internally and chemical neurotransmitters between cells",
        ],
        commonMistakes: [
          "Studying systems in isolation and missing that they are coordinated control loops serving homeostasis",
          "Thinking the urge to breathe comes from low oxygen — it is mainly rising CO₂",
          "Confusing the two circulations or assuming both ventricles are equally muscular",
          "Treating urine as simple 'waste water' rather than a hormonally tuned, mostly-reabsorbed filtrate",
          "Believing the action potential travels continuously in myelinated neurons; it jumps node to node",
        ],
        practiceQuestions: [
          "Define homeostasis and give an example of a negative feedback loop for blood glucose.",
          "Why is the left ventricle wall much thicker than the right, even though both are part of the same heart?",
          "Explain why hyperventilating before swimming underwater can cause a blackout.",
          "How does the folding of the small intestine (villi, microvilli) relate to the surface-area principle seen across biology?",
          "Describe how a neuron converts an electrical signal into a chemical one at a synapse.",
          "The kidney reabsorbs over 99% of its filtrate. Explain how ADH adjusts this and why.",
          "Frame one human disease as a failure of a specific homeostatic control loop.",
        ],
      },
    },
    evolution: {
      title: "Evolution & Classification",
      overview: "Evolution explains the diversity of life through descent with modification. Natural selection is the primary mechanism. Evidence comes from fossils, comparative anatomy, embryology, and molecular biology. Classification organizes life into a hierarchical system.",
      sections: [
        {
          heading: "1. Origin of Life",
          content: "The Oparin-Haldane hypothesis proposed that organic molecules formed from inorganic precursors under early Earth conditions (reducing atmosphere with CH₄, NH₃, H₂, H₂O). Miller and Urey's experiment (1953) demonstrated this by producing amino acids from these gases using electrical sparks.",
          formula: "\\text{Miller-Urey: } CH_4 + NH_3 + H_2 + H_2O \\xrightarrow{\\text{spark}} \\text{amino acids}",
        },
        {
          heading: "2. Natural Selection",
          content: "Darwin's theory: individuals with favorable variations survive and reproduce more (survival of the fittest). Key observations: (1) Populations produce more offspring than can survive. (2) Variation exists within populations. (3) Some variation is heritable. (4) Individuals with advantageous traits leave more offspring.",
          formula: "\\text{Fitness} = \\dfrac{\\text{reproductive success}}{\\text{population}} \\propto \\text{adaptation}",
        },
        {
          heading: "3. Evidence of Evolution",
          content: "Fossil record shows progression of life forms. Comparative anatomy: homologous structures (same origin, different function — e.g., human arm and whale flipper) indicate common ancestry. Analogous structures (different origin, same function — e.g., wing of insect and wing of bird) indicate convergent evolution. Molecular evidence: DNA similarity between species reflects evolutionary relationship.",
          formula: "\\text{Human-Chimp DNA similarity} \\approx 98.7\\%",
        },
        {
          heading: "4. Taxonomy and Classification",
          content: "Linnaean classification hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species. Binomial nomenclature: each species has a two-part Latin name (Genus species, e.g., Homo sapiens). The five-kingdom system: Monera, Protista, Fungi, Plantae, Animalia.",
          formula: "\\text{Binomial nomenclature: } \\textit{Homo\\;sapiens}",
        },
        {
          heading: "5. Phylogenetic Trees",
          content: "Phylogenetic trees (cladograms) show evolutionary relationships. Nodes represent common ancestors; branches represent lineages. Closely related species share more recent common ancestors. Molecular data (DNA/protein sequences) are now the primary basis for constructing phylogenetic trees.",
          formula: "\\text{Cladogram: nodes = common ancestors, branches = lineages}",
        },
      ],
      keyPoints: [
        "Natural selection drives evolution",
        "Homologous structures indicate common ancestry; analogous structures indicate convergent evolution",
        "Five-kingdom system: Monera, Protista, Fungi, Plantae, Animalia",
        "DNA similarity reflects evolutionary relatedness",
        "Extinction is natural; current extinction rate is unusually high due to human activity",
      ],
      commonMistakes: [
        "Thinking evolution is goal-oriented or 'progressive' (it has no direction or goal)",
        "Confusing homologous with analogous structures",
        "Thinking individuals evolve (populations evolve, not individuals)",
        "Thinking use/disuse of organs leads to inheritance of acquired characteristics (Lamarck was wrong)",
      ],
      practiceQuestions: [
        "Explain how homologous structures provide evidence for evolution.",
        "What is the difference between analogous and homologous structures? Give examples.",
        "Describe the evidence for evolution from molecular biology (DNA/protein comparisons).",
        "Why is the current rate of extinction considered alarming?",
        "Construct a simple phylogenetic tree for: human, chimpanzee, gorilla, orangutan (given DNA similarity data).",
      ],
      enrichedContent: {
        title: "Evolution: The Unifying Idea of All Biology",
        overview:
          "Nothing in biology makes sense except in the light of evolution — the phrase is famous because it is true. Every adaptation, every oddity of anatomy, every shared gene is a leftover or a product of descent with modification. The key mental shift is that evolution has no goal, no direction, and no notion of 'better' — only differential survival and reproduction in a particular environment, generation after generation. It is also not just about the famous mechanism of natural selection; mutation, genetic drift, gene flow, and non-random mating all shift populations. Understanding evolution means reasoning about populations over time, not individuals striving to improve.",
        sections: [
          {
            heading: "1. The Mechanism Is Simple; The Consequences Are Staggering",
            content:
              "Natural selection needs only three facts: variation exists, variation is heritable, and more offspring are produced than can survive so there is competition. From these alone, traits that help survival and reproduction become more common over generations — no foresight, no intent, no ladder of progress. The power is in cumulative change: tiny advantages compounded over millions of generations produce eyes, wings, and the bacterial flagellum. Selection does not create perfection; it keeps whatever works well enough in the current environment, which is why organisms carry historical baggage (the human appendix, the recurrent laryngeal nerve's absurd detour) — evolution tinkers with what already exists rather than designing from scratch.",
            formula:
              "\\text{Variation} + \\text{Heritability} + \\text{Competition} \\Rightarrow \\text{differential reproduction} \\Rightarrow \\text{evolution}",
          },
          {
            heading: "2. Selection Is Not the Only Force",
            content:
              "The modern synthesis adds three other engines that change allele frequencies without any 'fitness' involved. Genetic drift is pure chance: in small populations, random sampling of who reproduces can fix or lose alleles regardless of benefit — this is why island and endangered populations change fast and lose diversity. Gene flow (migration) mixes alleles between populations, tending to make them more similar and opposing divergence. Non-random mating (sexual selection) changes who pairs with whom; the peacock's tail is not about surviving predators — it is about being chosen, even at a cost. Recognising all four forces explains why not every trait is an adaptation, a subtlety often lost in the 'survival of the fittest' slogan.",
            formula:
              "\\Delta \\text{(allele frequency)} = \\text{selection} + \\text{drift} + \\text{gene flow} + \\text{non-random mating}",
          },
          {
            heading: "3. Evidence Is Everywhere and Independent",
            content:
              "Evolution is not one observation but many lines of evidence that independently converge — the hallmark of a well-supported theory. Fossils document transitional forms and the sequence of life over time. Comparative anatomy reveals homologous structures (human arm, whale flipper, bat wing — same bones, different uses) betraying shared ancestry, versus analogous structures (insect wing vs bird wing — different origin, same function) produced by convergent evolution under similar pressures. Embryology shows shared early development. Most decisively, molecular biology lets us read the family tree directly: the degree of DNA and protein similarity tracks evolutionary relatedness quantitatively, and it agrees with the fossil and anatomical evidence.",
            formula:
              "\\text{Human–Chimp DNA} \\approx 98.7\\% \\quad (\\text{molecular clock} \\Rightarrow \\text{recent common ancestor})",
          },
          {
            heading: "4. Homology vs Analogy: The Trap Students Fall Into",
            content:
              "This distinction is the single most common source of error. Homologous structures share a common origin but may serve different functions — the forelimb bones of a human, cat, whale, and bat. Their similarity is inherited, evidence of descent from a shared ancestor. Analogous structures do the same job but arose independently — the wings of a bird, a bat, and an insect all fly, but insects are not related to vertebrates; they evolved flight separately. Analogy is the product of convergent evolution: unrelated lineages hit on similar solutions to similar problems (streamlined bodies in sharks, dolphins, and ichthyosaurs). The rule of thumb: similarity of underlying structure and development signals common ancestry (homology); similarity of function alone does not.",
            formula:
              "\\text{Homologous} = \\text{same origin, may differ in function} \\qquad \\text{Analogous} = \\text{same function, different origin}",
          },
          {
            heading: "5. Speciation: When One Lineage Becomes Two",
            content:
              "Evolution's grand pattern — the branching tree of life — comes from speciation, the splitting of one species into two that can no longer interbreed. The most common route is geographic (allopatric) isolation: a barrier separates a population, and the two halves accumulate different mutations and face different selection until they diverge beyond reuniting. Sympatric speciation happens without a physical barrier, often through changes like polyploidy in plants. Reproductive isolation is the key concept — it can be pre-zygotic (different mating times, behaviours, or incompatible gametes) or post-zygotic (hybrid inviability or sterility, as in the mule). Speciation is why life is a branching bush, not a ladder.",
            formula:
              "\\text{Isolation} \\rightarrow \\text{divergence} \\rightarrow \\text{reproductive barrier} \\rightarrow \\text{two species}",
          },
          {
            heading: "6. Evolution Has No Goal — and We Are Not Its Pinnacle",
            content:
              "The most persistent misconception is that evolution is a march of progress toward 'higher' forms, with humans at the top. It is not. Evolution is local adaptation to current conditions; a bacterium exquisitely suited to a hot spring is just as 'evolved' as a human, and far more numerous. Traits are not aimed at a future target, and environments change, so today's advantage can be tomorrow's liability. There is also no 'missing link' ladder — the tree of life branches in all directions, and every living species sits at the tip of its own equally long branch. Humans are one recent twig, not the trunk or the crown. This reframing is not just pedantry; it prevents misreading the evidence and misunderstanding our own place in nature.",
            formula:
              "\\text{Evolution} = \\text{adaptation to local conditions},\\ \\text{not progress toward a goal}",
          },
        ],
        keyPoints: [
          "Natural selection needs only variation, heritability, and competition; it has no foresight or goal",
          "Drift, gene flow, and sexual selection also change allele frequencies — not every trait is an adaptation",
          "Multiple independent lines of evidence (fossils, anatomy, embryology, molecules) converge",
          "Homologous = shared ancestry (may differ in function); analogous = convergent function (different origin)",
          "Evolution is local adaptation, not progress; humans are one recent twig, not the pinnacle",
        ],
        commonMistakes: [
          "Thinking evolution is goal-directed or 'strives' toward complexity or perfection",
          "Confusing homologous with analogous structures",
          "Believing individuals evolve within their lifetime; populations evolve over generations",
          "Invoking Lamarckian inheritance of acquired characteristics (use/disuse)",
          "Treating natural selection as the only evolutionary force, ignoring drift and gene flow",
        ],
        practiceQuestions: [
          "State the three conditions natural selection requires and give a real-world example of each in action.",
          "Explain why genetic drift has a stronger effect in small populations than large ones.",
          "A bird's wing and an insect's wing both enable flight. Are they homologous or analogous, and why?",
          "Describe how geographic isolation can lead to speciation, using an island population as an example.",
          "The recurrent laryngeal nerve takes a long detour in mammals. Why does this support evolution over design?",
          "Explain why the peacock's tail is a product of sexual rather than natural selection.",
          "Argue against the statement 'humans are the most highly evolved species.'",
        ],
      },
    },
    plant: {
      title: "Plant Physiology",
      overview: "Plant physiology studies how plants function. Photosynthesis converts light energy to chemical energy. Transpiration drives water transport. Plants respond to environmental stimuli through hormones.",
      sections: [
        {
          heading: "1. Photosynthesis",
          content: "Photosynthesis occurs in chloroplasts. Light-dependent reactions (thylakoid membrane) produce ATP and NADPH. The Calvin cycle (stroma) fixes CO₂ into glucose using ATP and NADPH. Overall: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. C₃, C₄, and CAM plants have different adaptations for carbon fixation.",
          formula: "6CO_2 + 6H_2O \\xrightarrow{\\text{light, chlorophyll}} C_6H_{12}O_6 + 6O_2",
        },
        {
          heading: "2. Transpiration",
          content: "Transpiration is water loss as vapor through stomata. It creates transpiration pull, which drives water ascent in xylem. Factors affecting transpiration rate: temperature, humidity, wind, light intensity, and stomatal opening.",
          formula: "\\text{Transpiration rate} \\propto \\dfrac{\\Delta RH \\times \\text{leaf area}}{\\text{stomatal resistance}}",
        },
        {
          heading: "3. Transport in Plants",
          content: "Xylem transports water and minerals upward (transpiration pull). Phloem transports sugars bidirectionally (pressure flow hypothesis). Source (leaf) to sink (root, fruit, growing tip).",
          formula: "\\text{Pressure flow: } P_{\\text{source}} \\gt P_{\\text{sink}} \\rightarrow \\text{mass flow}",
        },
        {
          heading: "4. Plant Hormones",
          content: "Auxin: cell elongation, apical dominance, phototropism. Gibberellin: stem elongation, seed germination. Cytokinin: cell division. Abscisic acid: stress response, stomatal closure. Ethylene: fruit ripening, leaf abscission.",
          formula: "\\text{Phototropism: } \\text{auxin accumulates on shaded side} \\rightarrow \\text{bending toward light}",
        },
        {
          heading: "5. Plant Nutrition",
          content: "Essential elements: macronutrients (N, P, K, Ca, Mg, S) and micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl). Nitrogen deficiency causes chlorosis (yellowing) of older leaves. Potassium deficiency causes weak stems and poor disease resistance.",
          formula: "\\text{N deficiency: } \\text{chlorosis (yellowing) of older leaves}",
        },
      ],
      keyPoints: [
        "Photosynthesis occurs in chloroplasts; light reactions produce ATP+NADPH; Calvin cycle fixes CO₂",
        "Xylem transports water up; phloem transports food both ways",
        "Plant hormones regulate growth and responses to environment",
        "Transpiration pull is the main force for water ascent in tall trees",
        "C₄ and CAM plants have adaptations for hot/dry environments",
      ],
      commonMistakes: [
        "Thinking plants get their mass from soil (most comes from CO₂ in air)",
        "Confusing xylem (water up) with phloem (food both ways)",
        "Thinking all plant hormones are produced in the same organ",
        "Forgetting that transpiration is a passive process (no energy required)",
      ],
      practiceQuestions: [
        "Explain the light-dependent and light-independent reactions of photosynthesis.",
        "How does transpiration pull help water ascend in tall trees?",
        "Describe the role of auxin in phototropism.",
        "What are the symptoms of nitrogen deficiency in plants? Why does it appear in older leaves first?",
        "Compare C₃, C₄, and CAM photosynthesis. Why are C₄ and CAM adaptations beneficial in hot environments?",
      ],
      enrichedContent: {
        title: "Plants: The Slow Engineers That Built the Atmosphere",
        overview:
          "Plants solved the hardest engineering problems in biology without moving, without a nervous system, and using only sunlight, water, air, and minerals. They lift water tens of metres against gravity with no pump, manufacture sugar from a gas, and — through photosynthesis — created the oxygen atmosphere that made animal life possible. The key to understanding plants is that they are almost entirely built from air and water, not soil: the mass of a tree is mostly carbon captured from CO₂. Their physiology is a study in elegant physical solutions — cohesion, osmosis, diffusion gradients, and hormones doing the work that animals solve with muscles and nerves.",
        sections: [
          {
            heading: "1. Photosynthesis: Turning Air and Light Into Wood",
            content:
              "The most important chemical reaction on Earth converts carbon dioxide and water into sugar and oxygen, powered by light — and it is the source of nearly all food and free oxygen. It runs in two coupled stages. The light-dependent reactions, in the thylakoid membranes, use chlorophyll to capture light energy and convert it into chemical carriers (ATP and NADPH), splitting water and releasing O₂ as a by-product. The Calvin cycle, in the surrounding stroma, then spends that ATP and NADPH to fix CO₂ into sugar — no light needed directly. The profound point: a tree's trunk is not dug from the ground, it is assembled from carbon pulled out of the air. The mass of a forest is solidified atmosphere.",
            formula:
              "6CO_2 + 6H_2O \\xrightarrow{\\text{light, chlorophyll}} C_6H_{12}O_6 + 6O_2",
          },
          {
            heading: "2. Climbing Without a Pump: Cohesion-Tension",
            content:
              "A tall tree must lift water from roots to leaves tens of metres up, yet it has no heart and no pump. It uses physics instead. Water molecules stick to each other by hydrogen bonding (cohesion) and to the xylem walls (adhesion), forming a continuous unbroken column. When water evaporates from the leaf surface through stomata (transpiration), it creates a tension that pulls the whole column upward, like sucking on a straw — the evaporation at the top drags water all the way from the roots. This cohesion-tension mechanism is entirely passive, powered ultimately by the Sun's energy driving evaporation. It explains why water transport costs the plant no metabolic energy, and why an air bubble (cavitation) in the column is so damaging — it breaks the continuous chain.",
            formula:
              "\\text{Transpiration at leaf} \\Rightarrow \\text{tension} \\Rightarrow \\text{cohesive column pulled from roots}",
          },
          {
            heading: "3. Transpiration: A Cost That Cannot Be Avoided",
            content:
              "Plants face an unavoidable trade-off. To take in CO₂ for photosynthesis they must open stomata, but opening stomata lets water escape — a plant loses hundreds of grams of water for every gram of CO₂ fixed. Transpiration is therefore the price of photosynthesis, not a wasteful accident. The good news: it also cools the leaf (evaporative cooling) and drives the water-and-mineral stream upward. The plant's entire physiology is a balancing act between capturing carbon and conserving water, which is why so many adaptations exist — waxy cuticles, sunken stomata, and the specialised carbon-fixing pathways of hot, dry environments.",
            formula:
              "\\text{Open stomata} = \\text{CO}_2\\ \\text{in (good)} + \\text{H}_2O\\ \\text{out (cost)}",
          },
          {
            heading: "4. Two Plumbing Systems: Xylem Up, Phloem Both Ways",
            content:
              "Plants run separate transport systems for water and for food. Xylem carries water and dissolved minerals upward only, from roots to leaves, driven passively by transpiration pull through dead, hollow, lignin-reinforced tubes. Phloem carries the sugar-rich sap made in photosynthesis to wherever it is needed — growing tips, roots, fruits — and can move both up and down, driven actively by the pressure-flow mechanism: sugars are loaded into the phloem at a 'source' (leaf), drawing in water osmotically and building pressure that pushes the sap toward a 'sink' where sugar is used or stored. The distinction (dead xylem, one-way, passive; living phloem, two-way, active) is fundamental.",
            formula:
              "\\text{Xylem: } \\text{water up (dead, passive)} \\qquad \\text{Phloem: } \\text{sugar both ways (living, pressure flow)}",
          },
          {
            heading: "5. Hormones: Growth as a Response to Direction",
            content:
              "Without nerves or muscles, plants coordinate growth and respond to their environment using a handful of hormones that alter cell behaviour. Auxin is the master regulator of direction: in phototropism it redistributes to the shaded side of a stem, making those cells elongate so the stem bends toward the light — a movement produced by uneven growth, not by muscle. The same hormone drives apical dominance (a growing tip suppressing side branches) and root gravitropism (growing downward). Other hormones divide the labour: gibberellins elongate stems and trigger germination, cytokinins promote cell division, abscisic acid is the stress hormone that closes stomata in drought, and ethylene, a gas, ripens fruit and sheds leaves. Plant 'behaviour' is really chemistry steering growth.",
            formula:
              "\\text{Phototropism: auxin} \\rightarrow \\text{shaded side} \\rightarrow \\text{cells elongate} \\rightarrow \\text{bend toward light}",
          },
          {
            heading: "6. Beating the Heat: C₃, C₄, and CAM",
            content:
              "The CO₂-fixing enzyme rubisco has an annoying flaw: in hot, bright conditions it grabs oxygen instead of CO₂ (photorespiration), wasting energy. Plants evolved three strategies to cope. Ordinary C₃ plants (rice, wheat) fix carbon directly and thrive in cool, moist climates. C₄ plants (maize, sugarcane) add a spatial trick — they concentrate CO₂ in special bundle-sheath cells away from oxygen, so rubisco works efficiently even in heat. CAM plants (cacti, pineapple) add a time trick — they open stomata only at night to collect CO₂, store it as acid, and use it by day, minimising water loss in deserts. These are not different photosyntheses but clever workarounds to the same problem, and they explain why certain crops dominate certain climates.",
            formula:
              "C_3\\ (\\text{direct}) \\;|\\; C_4\\ (\\text{spatial CO}_2 \\text{ concentration}) \\;|\\; CAM\\ (\\text{night-time CO}_2 \\text{ uptake})",
          },
        ],
        keyPoints: [
          "Photosynthesis builds sugar from air and water; a tree's mass is mostly carbon captured from CO₂, not soil",
          "Water climbs tall trees by cohesion-tension — passive, sun-driven, with no pump",
          "Transpiration is the unavoidable cost of opening stomata to take in CO₂, but it also cools and drives uptake",
          "Xylem moves water up (dead, passive); phloem moves sugar both ways (living, pressure flow)",
          "Hormones steer growth as directional responses; C₄/CAM are workarounds to rubisco's oxygen problem",
        ],
        commonMistakes: [
          "Believing plants get most of their mass from soil — it comes overwhelmingly from CO₂ in the air",
          "Confusing xylem (water, up only, passive) with phloem (food, both ways, active)",
          "Treating transpiration as pure waste rather than a necessary cost plus a driver of water ascent",
          "Thinking phototropism is movement like an animal's — it is uneven growth driven by auxin",
          "Assuming all plants photosynthesise the same way, ignoring C₄ and CAM adaptations",
        ],
        practiceQuestions: [
          "Explain why the bulk of a tree's dry mass comes from carbon dioxide rather than from the soil.",
          "Describe the cohesion-tension mechanism and explain why an air bubble in the xylem is harmful.",
          "Why is transpiration described as a 'necessary evil' for a photosynthesising plant?",
          "Compare the structure and function of xylem and phloem, including why one is dead and the other living.",
          "Explain how auxin causes a stem to bend toward light without any muscle-like contraction.",
          "Why does nitrogen-deficiency yellowing appear in older leaves first?",
          "Contrast the spatial solution of C₄ plants with the temporal solution of CAM plants.",
        ],
      },
    },
  },
};

export type { TopicData, SectionData };

/**
 * Misconception / confusion-style question bank.
 *
 * Each entry targets a specific concept-clarity trap: the student sees a
 * plausible-but-wrong statement, the correct truth, WHY the misconception
 * feels right, and a memory anchor for clarity.
 *
 * Structure is intentionally data-only so any viewer component can render
 * it (flip-cards, quiz-style, expandable explanations). One topic per
 * object = easy review + reuse.
 *
 * ⚠️ QUALITY SAMPLE — Class 11 Physics: Kinematics (25 questions).
 * Confirm this shape + tone before replicating across the curriculum.
 */

export type MisconceptionQuestion = {
  id: string;
  prompt: string; // the misconception-style statement / question
  verdict: "TRUE" | "FALSE"; // is the statement technically correct?
  truth: string; // what is actually correct
  whyWrong: string; // why students believe the misconception
  clarityTip: string; // memory anchor / one-line concept clarity max
};

export type TopicMisconception = {
  subject: string;
  classLevel: "class-11" | "class-12";
  topicSlug: string;
  topicTitle: string;
  questions: MisconceptionQuestion[];
};

export const MISCONCEPTION_QUESTIONS: TopicMisconception[] = [
  {
    subject: "physics",
    classLevel: "class-11",
    topicSlug: "kinematics",
    topicTitle: "Kinematics — Motion in One and Two Dimensions",
    questions: [
      {
        id: "kin-01",
        prompt: "An object moving in a circle at constant speed is NOT accelerating, because its speed never changes.",
        verdict: "FALSE",
        truth:
          "It IS accelerating. Acceleration is the rate of change of VELOCITY (a vector), not just speed. In circular motion, direction changes continuously, so there is centripetal acceleration even at constant speed.",
        whyWrong:
          "Students equate acceleration with 'speeding up'. Direction change isn't felt like acceleration in daily life.",
        clarityTip: "Acceleration = any change in velocity — speed UP, speed DOWN, or TURNING.",
      },
      {
        id: "kin-02",
        prompt: "If the average velocity of an object over a whole journey is zero, the object never moved.",
        verdict: "FALSE",
        truth:
          "Average velocity zero only means displacement over the whole trip is zero (net start = net end). The object can have moved a great deal — out and back to the same point.",
        whyWrong:
          "Students reuse the intuition from average speed (total distance / total time) and forget average velocity divides displacement, not distance.",
        clarityTip: "Average velocity cares about the straight line from start to finish, not the winding road.",
      },
      {
        id: "kin-03",
        prompt: "The kinematic equations v = u + at, s = ut + ½at² are valid for ANY motion.",
        verdict: "FALSE",
        truth:
          "They are ONLY valid for motion with constant acceleration. With variable acceleration they are wrong — you'd need calculus instead.",
        whyWrong:
          "Textbooks drill these three equations so hard that they become reflex. Students apply them to pendulum swings and rockets where 'a' changes mid-flight.",
        clarityTip: "These are THE CONSTANT-a equations. They work ONLY when a = constant.",
      },
      {
        id: "kin-04",
        prompt: "Displacement can be larger than distance for the same journey.",
        verdict: "FALSE",
        truth:
          "Displacement (straight-line start-to-finish vector) can never exceed distance (total path length). Distance >= |displacement| always.",
        whyWrong:
          "Since displacement is direction-aware and distance isn't, it feels like displacement could be 'bigger' — but a non-straight path only lengthens the distance.",
        clarityTip: "Displacement is the shortcut. The shortcut is always <= the full winding road.",
      },
      {
        id: "kin-05",
        prompt: "A stone dropped from a moving train falls straight down to the ground.",
        verdict: "FALSE",
        truth:
          "It falls in a parabola (as seen from the ground). It retains the train's forward velocity at the moment of release, so it lands ahead of the drop point.",
        whyWrong:
          "People anchor to their own moving frame and forget the released object keeps the horizontal velocity it already has.",
        clarityTip: "Objects keep the horizontal speed they inherited at release — the train is just a story about frames.",
      },
    {
        id: "kin-06",
        prompt: "If an object's velocity is zero at some instant, its acceleration must also be zero at that instant.",
        verdict: "FALSE",
        truth:
          "Velocity zero does not imply acceleration zero. At the very top of a vertical throw, velocity is momentarily zero while acceleration is still g downward (it is about to reverse direction).",
        whyWrong:
          "'Stopped' feels like 'nothing is happening'. The instant of zero velocity is just one frame of the film — the forces don't pause.",
        clarityTip: "Top of the throw: v = 0, a = g. Parked on the road: v = 0, a = 0. The difference is who's pushing when.",
      },
      {
        id: "kin-07",
        prompt: "Two objects dropped from the same height always reach the ground at the same time, regardless of mass, even with air resistance.",
        verdict: "FALSE",
        truth:
          "In a vacuum, yes — they fall together. In air, the one with more air resistance relative to mass falls slower. Air resistance breaks the rule.",
        whyWrong:
          "The famous Galileo hammer-and-feather experiment is taught so strongly (in vacuum) that the air-resistance caveat gets dropped.",
        clarityTip: "Equal fall = vacuum story. Feather vs brick in real air = air resistance story.",
      },
      {
        id: "kin-08",
        prompt: "Acceleration always points in the direction of motion.",
        verdict: "FALSE",
        truth:
          "Acceleration points in the direction of the NET FORCE / velocity change. In braking it points OPPOSITE to motion; in turning it points sideways toward the center.",
        whyWrong:
          "Students glue 'a' to the velocity arrow. But a is about how v CHANGES, not where v points right now.",
        clarityTip: "a points where the change is, not where the car is heading. Braking = a backwards.",
      },
      {
        id: "kin-09",
        prompt: "Running with constant velocity means you are being pushed forward by a constant net force.",
        verdict: "FALSE",
        truth:
          "Constant velocity means net force = 0. Your muscle push is exactly cancelled by air resistance and friction. Motion persists without leftover force.",
        whyWrong:
          "Intuitive physics says: to keep moving you need to keep pushing. The first law is exactly about this — you only push to cancel friction.",
        clarityTip: "Cruise control on flat road: engine force = drag + rolling friction. Net = 0, v stays constant.",
      },
      {
        id: "kin-10",
        prompt: "A graph of position vs time that is a straight line means the object is accelerating.",
        verdict: "FALSE",
        truth:
          "A straight s–t line means constant VELOCITY (slope = velocity). Acceleration shows as a CURVE on s–t, or as a sloped line on v–t.",
        whyWrong:
          "Students read any straight line as 'linear = something happening continuously' and merge the s–t, v–t, and a–t graphs into one fuzzy blob.",
        clarityTip: "Read slopes: s–t slope = v; v–t slope = a. Straight s–t => constant v => a = 0.",
      },
      {
        id: "kin-11",
        prompt: "A ball thrown upward has zero acceleration at the highest point of its path.",
        verdict: "FALSE",
        truth:
          "At the top, velocity is zero but acceleration is still g downward for the entire flight (neglecting air). It is not 'floating'.",
        whyWrong:
          "The zenith looks frozen, so students grant it force-free status.",
        clarityTip: "g rarely takes a holiday. At the top: v = 0, a = g, then it must come back down.",
      },
      {
        id: "kin-12",
        prompt: "Distance and displacement have the same magnitude when an object returns to its starting point.",
        verdict: "FALSE",
        truth:
          "Displacement is zero (you're back where you started); distance is whatever total path you walked (e.g., a 400 m lap = 400 m distance, 0 m displacement).",
        whyWrong:
          "Students compute path length for both and forget displacement tracks the net vector from start to end.",
        clarityTip: "One lap on a 400 m track: distance 400 m, displacement 0 m.",
      },
{
        id: "kin-13",
        prompt: "If acceleration is negative, the object is slowing down.",
        verdict: "FALSE",
        truth:
          "Negative acceleration only means the acceleration vector points opposite your chosen positive direction. If velocity is also negative, negative a makes the object FASTER. 'Slowing' requires a and v to oppose each other.",
        whyWrong:
          "Students assign sign a moral meaning — minus = brake. Sign is a coordinate convention, not physics.",
        clarityTip: "Same signs (v+,a+) speed up; opposite signs (v+,a−) slow down. Sign of a alone says nothing.",
      },
      {
        id: "kin-14",
        prompt: "Projectile motion can be described as constant velocity vertically and constant acceleration horizontally.",
        verdict: "FALSE",
        truth:
          "It's the reverse: vertical motion has constant acceleration g, horizontal motion has constant velocity (no horizontal force, neglecting air resistance).",
        whyWrong:
          "Students swap the two because 'gravity acts down' feels like the big thing should be vertical — but gravity being the only force is exactly why the OTHER axis stays clean.",
        clarityTip: "Gravity owns the vertical; the horizontal axis has no owner, so it coasts.",
      },
      {
        id: "kin-15",
        prompt: "The range of a projectile is always larger when the launch speed is higher.",
        verdict: "FALSE",
        truth:
          "Range grows with launch speed, but for a fixed speed the maximum occurs at 45°. A high speed at a bad angle loses to a moderate speed at 45°. Range = (v² sin 2θ)/g.",
        whyWrong:
          "Students know speed helps and stop there; the 45° optimum is forgotten.",
        clarityTip: "For a given speed, 45° is the champ. sin 2θ peaks at θ = 45°.",
      },
      {
        id: "kin-16",
        prompt: "A falling object accelerates at 9.8 m/s² forever, no matter how long it falls.",
        verdict: "FALSE",
        truth:
          "Only in a vacuum. In air, terminal velocity caps the speed — acceleration drops toward zero as drag builds.",
        whyWrong:
          "The constant-g approximation is drilled so hard that terminal velocity gets erased entirely.",
        clarityTip: "Skydivers hit ~60 m/s ceiling. g = 9.8 only while drag is negligible.",
      },
      {
        id: "kin-17",
        prompt: "If A is moving faster than B, A's acceleration must be greater than B's.",
        verdict: "FALSE",
        truth:
          "Speed and acceleration are independent. A can cruise at 100 m/s with a = 0 while B accelerates from 0 at 10 m/s².",
        whyWrong:
          "Speed and acceleration get conflated in everyday language — 'accelerate faster' blurs the two.",
        clarityTip: "Speed = how fast you're going. Acceleration = how fast your speed is changing.",
      },
      {
        id: "kin-18",
        prompt: "The time of flight of a projectile depends on its horizontal velocity.",
        verdict: "FALSE",
        truth:
          "Time of flight depends only on the vertical component (T = 2u sinθ/g). Horizontal velocity affects how far it lands, not for how long.",
        whyWrong:
          "Students blur the two axes and feel 'faster forward = longer in air'.",
        clarityTip: "Air time is a VERTICAL story. Forward speed just stretches the landing.",
      },
      {
        id: "kin-19",
        prompt: "A velocity–time graph with a negative slope shows motion back toward the start.",
        verdict: "FALSE",
        truth:
          "A negative slope on v–t means negative ACCELERATION, not reversal of position. Moving back shows as velocity crossing below zero.",
        whyWrong:
          "Students map slope sign onto direction of travel, colliding the s–t and v–t graph dialects.",
        clarityTip: "On v–t: slope = a, above-axis = forward, below-axis = backward.",
      },
      {
        id: "kin-20",
        prompt: "When you jump inside a moving bus, you land behind where you jumped.",
        verdict: "FALSE",
        truth:
          "You land exactly at the jump point in a constant-velocity bus. You carry the bus's velocity, so relative to the bus you move straight up and down. You'd land behind only if the bus accelerated mid-jump.",
        whyWrong:
          "Ground-frame intuition leaks into the bus frame; people think the bus slips out from under the jumper.",
        clarityTip: "You're already moving AT the bus speed. Jumping doesn't cancel that gift.",
      },
      {
        id: "kin-21",
        prompt: "Increasing g (say, on Jupiter) would not change the time of flight for a given launch.",
        verdict: "FALSE",
        truth:
          "Higher g means stronger vertical pull, so the object spends less time in the air (T = 2u sinθ/g drops) and lands closer.",
        whyWrong:
          "Students treat g as a scaffold of numbers rather than a physical driver.",
        clarityTip: "Stronger gravity = shorter, flatter flights. Moon (small g) vs Jupiter (big g).",
      },
      {
        id: "kin-22",
        prompt: "An object that is decelerating (slowing) must be moving in the negative direction.",
        verdict: "FALSE",
        truth:
          "Deceleration = acceleration opposing velocity — it can happen going forward (braking) or backward (braking while reversing). Direction of motion is independent.",
        whyWrong:
          "'Slowing' feels like 'heading back', so students tie it to the sign of motion.",
        clarityTip: "Slowing down = a opposite v, in EITHER direction. Brakes don't care which way the car faces.",
      },
      {
        id: "kin-23",
        prompt: "The area under a velocity–time graph gives the object's speed.",
        verdict: "FALSE",
        truth:
          "It gives DISPLACEMENT (signed). To get distance, you'd take the area of |v|. Same only when velocity never changes sign.",
        whyWrong:
          "Students remember 'area under v-t' but lose whether that area is a signed vector sum or a path length.",
        clarityTip: "Signed area on v–t = displacement. Total unsigned area = distance.",
      },
      {
        id: "kin-24",
        prompt: "An object's average speed over a journey is always equal to the magnitude of its average velocity.",
        verdict: "FALSE",
        truth:
          "Average speed = total distance / time; average velocity magnitude = |net displacement| / time. Equal only for straightforward motion. Any back-tracking makes average speed greater.",
        whyWrong:
          "Slang treats speed and velocity as synonyms; the distance-vs-displacement difference leaks into averages.",
        clarityTip: "Wiggle your path → distance grows, displacement doesn't. Average speed wins.",
      },
      {
        id: "kin-25",
        prompt: "If a position–time graph is a horizontal straight line, the object is moving at constant speed.",
        verdict: "FALSE",
        truth:
          "A horizontal s–t line means position never changes — the object is AT REST (v = 0). Constant speed shows as a sloped straight line.",
        whyWrong:
          "Any unmoving straight line reads as 'constant something', so students grant it constant speed.",
        clarityTip: "Flat s–t = parked. Slanted s–t = cruising. Steeper = faster cruising.",
      },
    ],
  },
];
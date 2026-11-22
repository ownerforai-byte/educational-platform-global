/**
 * Physics XI — Unit 5, Work, Energy and Power.
 * Item shape: [question, working, answer, marks, topicIndex]
 */

export const CHAPTERS = [
  {
    slug: "work-energy-and-power",
    items: [
      ["Find the work done by a 20 N force in moving a body 5 m along its direction.", "W = Fs cos θ = 20(5)(1).\n= 100 J.", "100 J", "1", 0],
      ["Find the work done by a 10 N force acting at 60° to a displacement of 4 m.", "W = Fs cos 60° = 10(4)(0.5).\n= 20 J.", "20 J", "2", 0],
      ["Find the work done by gravity on a 2 kg body falling 5 m (g = 10 m/s²).", "W = mgh = 2(10)(5), positive because gravity and the displacement agree.\n= 100 J.", "100 J", "2", 0],
      ["A friction force of 15 N acts over 10 m. Find the work done by friction.", "Friction opposes the motion, so θ = 180°.\nW = 15(10)(−1) = −150 J.", "−150 J", "2", 0],
      ["A 4 kg body speeds up from rest to 10 m/s. Find the work done on it.", "Work–energy theorem: W = ΔKE = ½(4)(100) − 0.\n= 200 J.", "200 J", "2", 1],
      ["A 2 kg block moving at 6 m/s is brought to rest by friction over 9 m. Find the friction force.", "½mv² = Fs ⇒ ½(2)(36) = F(9).\nF = 36/9 = 4 N.", "4 N", "3", 1],
      ["Find the power when 300 J of work is done in 5 s.", "P = W/t = 300/5.\n= 60 W.", "60 W", "1", 2],
      ["A 60 kg person climbs 10 m in 20 s. Find the average power developed (g = 10 m/s²).", "W = mgh = 60(10)(10) = 6000 J.\nP = 6000/20 = 300 W.", "300 W", "2", 2],
      ["A motor lifts a 200 kg load at a steady 0.5 m/s. Find its power output.", "F = mg = 2000 N, and P = Fv = 2000(0.5).\n= 1000 W.", "1 kW", "2", 2],
      ["Define one watt.", "One watt is the power developed when one joule of work is done in one second: 1 W = 1 J s⁻¹.", "1 J/s", "1", 2],
      ["A pump delivers 800 W of useful power from a 1 kW input. Find its efficiency.", "η = (useful power/input power) × 100 = (800/1000) × 100.\n= 80%.", "80%", "2", 3],
      ["A machine lifts a 50 kg load through 6 m in 30 s using an input power of 150 W. Find its efficiency (g = 10 m/s²).", "Useful work = 50(10)(6) = 3000 J, so useful power = 3000/30 = 100 W.\nη = (100/150) × 100 = 66.7%.", "66.7%", "3", 3],
    ],
  },
  {
    slug: "conservation-of-energy-and-collisions",
    items: [
      ["Find the kinetic energy of a 2 kg body moving at 5 m/s.", "KE = ½mv² = ½(2)(25).\n= 25 J.", "25 J", "1", 0],
      ["Find the potential energy of a 2 kg body raised 10 m (g = 10 m/s²).", "PE = mgh = 2(10)(10).\n= 200 J.", "200 J", "1", 0],
      ["A body falls 5 m from rest. Find its speed at the bottom (g = 10 m/s²).", "mgh = ½mv² ⇒ v = √(2gh) = √100.\n= 10 m/s.", "10 m/s", "2", 0],
      ["A pendulum bob is released from a height of 0.8 m. Find its speed at the lowest point (g = 10 m/s²).", "v = √(2gh) = √(2 × 10 × 0.8) = √16.\n= 4 m/s.", "4 m/s", "2", 1],
      ["A 1 kg ball is projected up a smooth plane inclined at 30° at 10 m/s. How far along the plane does it travel before stopping?", "Rise h = u²/2g = 100/20 = 5 m.\nAlong the plane s = h/sin 30° = 10 m.", "10 m", "3", 1],
      ["Define an elastic collision and state its defining property.", "A collision in which both momentum and kinetic energy are conserved; the coefficient of restitution e = 1.", "KE is conserved, e = 1", "2", 2],
      ["Two equal masses collide elastically, one at rest. Describe the motion afterwards.", "For equal masses the formulas give v₁ = 0 and v₂ = u.\nThe moving body stops and the stationary one moves off with the original velocity.", "They exchange velocities", "3", 2],
      ["What is a perfectly inelastic collision?", "One in which the bodies stick together after impact: momentum is conserved but kinetic energy is not, and e = 0.", "The bodies move off together, e = 0", "2", 3],
      ["A 2 kg body at 6 m/s sticks to a 4 kg body at rest. Find the kinetic energy lost.", "v = 12/6 = 2 m/s.\nKE before = ½(2)(36) = 36 J, after = ½(6)(4) = 12 J, so 24 J is lost.", "24 J", "3", 3],
      ["For that collision, what fraction of the kinetic energy survives?", "Final 12 J against an initial 36 J.\nThe ratio is 12/36 = 1/3.", "One third", "2", 3],
      ["Why is momentum conserved in an inelastic collision when kinetic energy is not?", "Momentum conservation depends only on the absence of external forces during the brief impact.\nKinetic energy is converted into heat, sound and deformation instead of being retained.", "No external force acts; energy changes form", "2", 3],
      ["A 10 g bullet at 500 m/s embeds in a 990 g block at rest on a smooth surface. Find the loss of kinetic energy.", "v = (0.01)(500)/1 = 5 m/s.\nKE before = ½(0.01)(250000) = 1250 J; after = ½(1)(25) = 12.5 J, so 1237.5 J is lost.", "≈1238 J", "3", 3],
    ],
  },
];

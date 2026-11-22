/**
 * Physics XI — Unit 4, Dynamics.
 * Item shape: [question, working, answer, marks, topicIndex]
 */

export const CHAPTERS = [
  {
    slug: "momentum-impulse-and-newtons-laws",
    items: [
      ["Find the momentum of a 2 kg body moving at 3 m/s.", "p = mv = 2(3).\n= 6 kg m s⁻¹.", "6 kg m/s", "1", 0],
      ["Find the impulse of a 10 N force acting for 0.5 s.", "J = FΔt = 10(0.5).\n= 5 N s.", "5 N s", "1", 0],
      ["A 0.2 kg ball hits a wall at 10 m/s and rebounds at 10 m/s. Find the impulse.", "Taking the incoming direction as positive, Δp = m(v − u) = 0.2(−10 − 10).\nMagnitude = 4 N s, directed away from the wall.", "4 N s away from the wall", "2", 0],
      ["Find the force needed to stop a 1000 kg car from 20 m/s in 5 s.", "a = (0 − 20)/5 = −4 m/s².\nF = ma = 1000(−4) = −4000 N, i.e. 4000 N opposite to the motion.", "4000 N", "2", 0],
      ["State Newton's second law in terms of momentum.", "The rate of change of momentum of a body is proportional to the applied force and takes place in the direction of the force: F = dp/dt.", "F = dp/dt", "1", 1],
      ["A 5 kg body rests on a smooth horizontal surface. Find its acceleration under a 20 N horizontal force.", "a = F/m = 20/5.\n= 4 m/s².", "4 m/s²", "2", 1],
      ["A lift of mass 100 kg accelerates upward at 2 m/s². Find the tension in its cable (g = 10 m/s²).", "T − mg = ma ⇒ T = m(g + a) = 100(12).\n= 1200 N.", "1200 N", "3", 1],
      ["Find the tension when the same lift accelerates downward at 2 m/s².", "mg − T = ma ⇒ T = m(g − a) = 100(8).\n= 800 N.", "800 N", "2", 1],
      ["A 2 kg body moving at 5 m/s sticks to a 3 kg body at rest. Find their common velocity.", "Momentum before = 2(5) = 10 kg m/s, after = 5v.\nSo v = 2 m/s.", "2 m/s", "2", 2],
      ["A 3 kg body at 4 m/s collides elastically with a 1 kg body at rest. Find both final velocities.", "v₁ = ((m₁ − m₂)/(m₁ + m₂))u = (2/4)(4) = 2 m/s.\nv₂ = (2m₁/(m₁ + m₂))u = (6/4)(4) = 6 m/s.", "2 m/s and 6 m/s", "3", 2],
      ["A 4 kg gun fires a 0.02 kg bullet at 400 m/s. Find the recoil speed of the gun.", "Momentum is conserved starting from rest: 0.02(400) = 4v.\nv = 8/4 = 2 m/s backward.", "2 m/s", "2", 3],
      ["A 0.05 kg bullet at 400 m/s embeds in a 1.95 kg block at rest. Find the common speed and the kinetic energy lost.", "Momentum: 0.05(400) = 2v ⇒ v = 10 m/s.\nKE before = ½(0.05)(160000) = 4000 J; after = ½(2)(100) = 100 J, so 3900 J is lost.", "10 m/s, losing 3900 J", "3", 3],
    ],
  },
  {
    slug: "torque-equilibrium-and-friction",
    items: [
      ["Find the torque of a 10 N force applied perpendicularly at 0.5 m from a pivot.", "τ = Fr sin θ = 10(0.5)(1).\n= 5 N m.", "5 N m", "1", 0],
      ["A 20 N force acts at 30° to a 2 m rod, at its end. Find the torque about the other end.", "τ = Fr sin θ = 20(2)(0.5).\n= 20 N m.", "20 N m", "2", 0],
      ["Two children of mass 30 kg and 20 kg sit on a 4 m seesaw. Where must they sit to balance it?", "Taking moments about the pivot: 30x = 20(4 − x).\n50x = 80 ⇒ x = 1.6 m from the 30 kg child.", "1.6 m and 2.4 m from the pivot", "2", 0],
      ["State the two conditions for a rigid body in equilibrium.", "The vector sum of the forces must vanish (no translation) and the sum of the moments about any point must vanish (no rotation).", "ΣF = 0 and Στ = 0", "1", 1],
      ["A uniform 2 m rod of weight 20 N is pivoted at one end and held horizontally by a string at the other end, making 30° with the rod. Find the tension.", "The weight acts at the centre (1 m). Moments about the pivot: 20(1) = T sin 30°(2).\nT = 20/1 = 20 N.", "20 N", "3", 1],
      ["A uniform metre rod of weight 10 N is supported at its centre. A 20 N weight hangs at the 20 cm mark. Where must a 30 N weight be hung to balance it?", "The 20 cm mark is 30 cm from the centre, giving a moment 20(30) = 600 N cm.\n30d = 600 ⇒ d = 20 cm on the other side, at the 70 cm mark.", "At the 70 cm mark", "2", 1],
      ["Define the coefficient of friction.", "It is the ratio of the limiting friction to the normal reaction, μ = F/N; it is dimensionless.", "μ = F/N", "1", 2],
      ["A 5 kg block rests on a horizontal table with μ = 0.4. Find the limiting friction (g = 10 m/s²).", "N = mg = 50 N, so F = μN = 0.4(50).\n= 20 N.", "20 N", "2", 2],
      ["A 30 N horizontal force acts on that block. Find its acceleration.", "Net force = 30 − 20 = 10 N (friction acts while it slides).\na = 10/5 = 2 m/s².", "2 m/s²", "3", 2],
      ["Why is the force of static friction greater than kinetic friction?", "At rest the microscopic contact points weld together and every one of them must be broken before sliding starts.\nOnce sliding, contact is renewed continuously and the average bond is weaker.", "Static bonds are stronger than sliding ones", "2", 2],
      ["If μ = 1/√3, find the angle of friction.", "tan λ = μ = 1/√3.\nλ = 30°.", "30°", "2", 3],
      ["A body just begins to slide down a plane inclined at 30°. Find the coefficient of friction.", "At the angle of repose θ, μ = tan θ.\nμ = tan 30° = 0.577.", "μ = 1/√3 ≈ 0.577", "3", 3],
    ],
  },
];

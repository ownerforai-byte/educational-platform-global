/**
 * Physics XI — Unit 3, Kinematics.
 * Item shape: [question, working, answer, marks, topicIndex]
 */

export const CHAPTERS = [
  {
    slug: "velocity-and-acceleration",
    items: [
      ["A car moves so that x = 3t² metres. Find its velocity at t = 2 s.", "v = dx/dt = 6t.\nAt t = 2, v = 12 m/s.", "12 m/s", "1", 0],
      ["For x = 3t², find the acceleration.", "a = dv/dt = d(6t)/dt.\n= 6 m/s², a constant.", "6 m/s²", "1", 0],
      ["Distinguish average velocity from instantaneous velocity.", "Average velocity is the total displacement divided by the total time, Δx/Δt.\nInstantaneous velocity is its limit as Δt → 0, i.e. dx/dt.", "Δx/Δt against dx/dt", "2", 0],
      ["A body moves 10 m east and then 10 m west in 5 s. Find its average velocity.", "Displacement = 10 − 10 = 0 m, while the distance travelled is 20 m.\nAverage velocity = 0/5.", "0 m/s (but the average speed is 4 m/s)", "2", 0],
      ["What do the slope and the area of a velocity–time graph give?", "Slope = dv/dt = acceleration, and area under the graph = ∫v dt = displacement.", "Slope → acceleration, area → displacement", "2", 1],
      ["A velocity–time graph rises from 0 to 20 m/s in 4 s, stays at 20 m/s for 6 s and falls to 0 in 2 s. Find the distance covered.", "Area = ½(4)(20) + 20(6) + ½(2)(20).\n= 40 + 120 + 20 = 180 m.", "180 m", "3", 1],
      ["What does the area under an acceleration–time graph represent?", "a = dv/dt, so ∫a dt = Δv.\nThe area gives the change in velocity, not the distance.", "The change in velocity", "2", 1],
      ["A body starts from rest with a = 3 m/s². Find its speed after 4 s.", "v = u + at = 0 + 3(4).\n= 12 m/s.", "12 m/s", "1", 2],
      ["A body has u = 5 m/s and a = 2 m/s². Find the distance in 3 s.", "s = ut + ½at² = 5(3) + ½(2)(9).\n= 15 + 9 = 24 m.", "24 m", "2", 2],
      ["A car slows from 20 m/s to rest in 50 m. Find its deceleration.", "v² = u² + 2as ⇒ 0 = 400 + 100a.\na = −4 m/s², so the retardation is 4 m/s².", "4 m/s²", "2", 2],
      ["Two cars travel in the same direction at 10 m/s and 15 m/s. Find their relative velocity.", "Relative velocity = 15 − 10.\n= 5 m/s.", "5 m/s", "2", 3],
      ["Rain falls vertically at 10 m/s while a man walks horizontally at 10 m/s. In what direction does the rain appear to him?", "The apparent velocity is the rain velocity minus his own: (0, −10) − (10, 0).\ntan θ = 10/10 = 1 ⇒ 45° to the vertical, speed √200 ≈ 14.1 m/s.", "45° from the vertical, 14.1 m/s", "3", 3],
    ],
  },
  {
    slug: "free-fall-and-projectiles",
    items: [
      ["A ball is dropped from rest. Find its speed after 3 s (g = 10 m/s²).", "v = u + gt = 0 + 10(3).\n= 30 m/s.", "30 m/s", "1", 0],
      ["Find the height it has fallen in those 3 s.", "h = ½gt² = ½(10)(9).\n= 45 m.", "45 m", "2", 0],
      ["A body is thrown vertically upward at 20 m/s. Find the time to reach the top.", "At the top v = 0: 0 = 20 − 10t.\nt = 2 s.", "2 s", "2", 0],
      ["Find the greatest height reached in that throw.", "H = u²/2g = 400/20.\n= 20 m.", "20 m", "1", 0],
      ["Find the total time of flight for the same upward throw.", "Ascent 2 s and descent 2 s, since the motion is symmetric about the top.", "4 s", "2", 0],
      ["A projectile is fired at 20 m/s at 30° to the horizontal. Find its time of flight (g = 10 m/s²).", "T = 2u sin θ/g = 2(20)(0.5)/10.\n= 2 s.", "2 s", "2", 1],
      ["Find the maximum height of that projectile.", "H = u²sin²θ/2g = 400(0.25)/20.\n= 5 m.", "5 m", "1", 1],
      ["Find its horizontal range.", "R = u²sin 2θ/g = 400 sin 60°/10.\n= 400(0.866)/10 = 34.6 m.", "34.6 m", "2", 2],
      ["At what angle should a projectile be fired at 20 m/s for the maximum range, and what is that range?", "Range is greatest at 45°: R = u²/g = 400/10.\n= 40 m.", "45°, giving 40 m", "3", 2],
      ["For what angle of projection is the maximum height equal to the horizontal range?", "H = R ⇒ u²sin²θ/2g = u²(2 sin θ cos θ)/g.\nCancelling gives tan θ = 4, so θ = 76°.", "θ = tan⁻¹4 ≈ 76°", "3", 2],
      ["A boat heads across a river at 4 m/s while the current flows at 3 m/s. Find its speed over the ground.", "The two velocities are perpendicular: v = √(16 + 9).\n= 5 m/s.", "5 m/s", "2", 3],
      ["An aircraft flies north at 120 km/h in a wind blowing east at 50 km/h. Find its speed relative to the ground.", "v = √(120² + 50²) = √(14400 + 2500) = √16900.\n= 130 km/h, directed east of north.", "130 km/h", "2", 3],
    ],
  },
];

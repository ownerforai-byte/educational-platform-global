# Gravitation

Gravity is the universal attraction between masses, and Newton's insight was that the force pulling an apple earthward also holds the Moon in orbit. This NEB Class 11 Physics unit develops the law of gravitation, gravitational field and potential, the variation of g with altitude and depth, satellite motion including orbital and escape velocities, geostationary satellites and GPS applications.

## Newton's Law of Gravitation

Every two point masses attract with F = G m₁m₂ / r², where G = 6.67 × 10⁻¹¹ N m² kg⁻². The gravitational field strength at distance r from mass M is g = GM/r², and the potential V = −GM/r (zero chosen at infinity). Potential energy of a pair follows as U = −GMm/r; the negative sign signals a bound system — energy must be supplied to separate the masses to infinity.

| Situation | Formula for g | Trend |
| --- | --- | --- |
| Surface of Earth | g = GM/R² ≈ 9.8 m/s² | reference value |
| At altitude h | g′ = g(R/(R+h))² | decreases quadratically |
| At depth d | g′ = g(1 − d/R) | decreases linearly to zero at centre |

## Satellite Motion

A satellite of mass m orbiting at radius r needs centripetal force mv²/r supplied by gravity, giving orbital velocity v = √(GM/r); just above Earth's surface this equals √(gR) ≈ 7.9 km/s. Escape velocity — the launch speed that lets a body leave Earth's gravity entirely — comes from equating kinetic energy to |U|: v_e = √(2GM/R) = √2 × v_orbital ≈ 11.2 km/s for Earth. The orbital time period T = 2π√(r³/GM), Kepler's third law in disguise. A **geostationary satellite** orbits in the equatorial plane west-to-east with period 24 h at about 35,800–36,000 km altitude, appearing fixed over one longitude — ideal for communication and weather monitoring, while constellations like GPS use precisely timed signals from multiple satellites to triangulate positions.

## Worked Calculation

```text
Question: Estimate Earth's escape velocity.
Given: R = 6400 km, g = 9.8 m/s^2.

Step 1: v_e = √(2gR)
Step 2: R = 6400 km = 6.4 × 10^6 m
Step 3: v_e^2 = 2 × 9.8 × 6.4×10^6 = 1.2544 × 10^8
Step 4: v_e = 1.12 × 10^4 m/s ≈ 11.2 km/s

Note the elegant relation v_e = √2 × v_orbital(near surface).
```

## Key points

- G is a universal constant; g varies with location, altitude and depth.
- Weightlessness in orbit arises because satellite and astronaut fall with equal acceleration, not because gravity vanishes.
- Total energy of an orbiting satellite E = −GMm/2r is negative; positive total energy means escape.
- Increasing altitude lowers orbital velocity but lengthens the period (Kepler III).
- Geostationary requires three conditions: equatorial plane, period 24 h, west-to-east sense.

## Common mistakes

- Using g = 9.8 m/s² inside formulas where r changes (orbital radius ≠ Earth's radius).
- Dropping the negative sign of potential or potential energy when comparing energies.
- Confusing escape velocity direction-dependence claims — it is independent of launch angle in the ideal model.
- Believing air resistance alone keeps satellites up; only sufficient tangential velocity does.
- Mixing up G (gravitational constant) with g (field strength at a surface).

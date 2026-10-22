# Optics

Optics is the branch of physics that studies the behaviour and properties of light — its interactions with matter, and the instruments we build to control it. This NEB Class 11 Physics unit covers reflection at curved mirrors, refraction at plane surfaces, refraction through prisms, lenses, and dispersion. Light travels at 3.00 × 10⁸ m/s in vacuum, but slows down in any material medium — and that change in speed is the root cause of every optical phenomenon you will study here.

## Reflection at Curved Mirrors

### Real and Virtual Images

When light rays meet a **concave mirror** (curved inward like a cave), they converge to form a **real image** — an image that can be projected onto a screen because the rays actually meet there. A **convex mirror** (curved outward like the back of a spoon) diverges rays, so the rays only *appear* to come from a point behind the mirror — this is a **virtual image**, which cannot be projected.

| Mirror type | Focal length f | Image nature | Common use |
| --- | --- | --- | --- |
| Concave | Positive (f = R/2) | Real (object beyond F), virtual (object inside F) | Shaving mirrors, dentist mirrors, headlights |
| Convex | Negative (f = −R/2) | Always virtual, upright, diminished | Rear-view mirrors, security mirrors |

### Mirror Formula

The **mirror formula** relates object distance u, image distance v, and focal length f:

```
1/f = 1/u + 1/v
```

With the **sign convention**: distances measured in the direction of incident light are positive; distances against it are negative. For a concave mirror, f is positive; for a convex mirror, f is negative. The **magnification** m = −v/u tells you the size and orientation: m > 1 means enlarged, m < 1 means diminished, and a negative m means the image is inverted.

**Key insight:** The focal length of a spherical mirror is exactly half its radius of curvature: f = R/2. This is why the mirror formula works for both concave and convex mirrors — the only difference is the sign of f.

## Refraction at Plane Surfaces

### Laws of Refraction and Refractive Index

When light passes from one transparent medium to another, it changes speed and bends. **Snell's law** quantifies this:

```
n₁·sin θ₁ = n₂·sin θ₂
```

where n₁ and n₂ are the refractive indices of the two media, and θ₁ and θ₂ are the angles of incidence and refraction measured from the **normal** (the line perpendicular to the surface). The refractive index of a medium is defined as:

```
n = c / v
```

where c = 3.00 × 10⁸ m/s is the speed of light in vacuum and v is its speed in the medium. Since light always slows down in a material (v < c), every real medium has n > 1. Air has n ≈ 1.0003, water n ≈ 1.333, crown glass n ≈ 1.52, and diamond n ≈ 2.417 — the highest of any natural material.

### Relation Between Refractive Indices

When light passes from medium 1 to medium 2, the relative refractive index is:

```
n₂₁ = n₂ / n₁ = v₁ / v₂
```

This means: if light enters a *denser* medium (higher n), it bends *toward* the normal; if it enters a *rarer* medium (lower n), it bends *away* from the normal.

### Lateral Shift

When light passes through a **parallel-sided glass slab**, it emerges parallel to its original direction but displaced sideways. The **lateral shift** d is:

```
d = t·sin(θ₁ − θ₂) / cos(θ₂)
```

where t is the slab thickness. The shift increases with thickness and with the angle of incidence. This is why objects viewed through a glass window appear slightly displaced.

### Total Internal Reflection

When light travels from a denser to a rarer medium (e.g., glass to air), the refracted ray bends away from the normal. As the angle of incidence increases, the refracted angle approaches 90°. The **critical angle** θ_c is the angle of incidence for which the refracted angle is exactly 90°:

```
sin θ_c = n₂ / n₁  (where n₁ > n₂)
```

For glass-to-air (n₁ = 1.52, n₂ = 1.0): θ_c = sin⁻¹(1/1.52) ≈ 41.1°. For diamond-to-air: θ_c ≈ 24.4° — this tiny critical angle is why diamonds sparkle so brilliantly. When the angle of incidence exceeds θ_c, **total internal reflection** occurs — 100% of the light is reflected back into the denser medium. This is the principle behind optical fibres, prisms in binoculars, and the brilliance of cut gemstones.

## Refraction Through Prisms

A prism is a wedge of transparent material with two refracting surfaces meeting at the **refracting angle A**. Light entering a prism bends toward the base on entry and again on exit, producing a net **deviation δ** from its original path.

### Minimum Deviation

The deviation δ depends on the angle of incidence. As the angle of incidence increases from zero, δ first *decreases* to a minimum value δ_min, then *increases*. At **minimum deviation**, the light passes symmetrically through the prism — the angle of incidence equals the angle of emergence, and the ray inside the prism is parallel to the base.

### Relation Between Prism Angle, Minimum Deviation, and Refractive Index

At minimum deviation, the refractive index of the prism material is:

```
n = sin((A + δ_min)/2) / sin(A/2)
```

This is the **prism formula**. It's how you can measure the refractive index of a material without knowing the speed of light in it — just measure the prism angle A and the minimum deviation δ_min.

### Deviation in a Small-Angle Prism

For a thin prism (small A), the deviation is approximately:

```
δ ≈ (n − 1)·A
```

This is a remarkably simple result: the deviation of a thin prism depends only on the refractive index and the prism angle. It's the basis for understanding how prisms are used in optical instruments.

## Lenses

### Spherical Lenses and Angular Magnification

A **convex (converging) lens** is thicker at the centre than at the edges and brings parallel rays to a focus. A **concave (diverging) lens** is thinner at the centre and spreads parallel rays apart as if they came from a virtual focus. The **lens formula** is identical in form to the mirror formula:

```
1/f = 1/v − 1/u
```

The **angular magnification** of a simple magnifier (a convex lens used to view a small object) is:

```
M = 1 + D/f
```

where D = 25 cm is the near point of a normal eye and f is the focal length. A lens with f = 5 cm gives M = 1 + 25/5 = 6× magnification.

### Lens Maker's Formula

The **lens maker's formula** relates the focal length of a lens to its geometry and the refractive index of its material:

```
1/f = (n − 1)·(1/R₁ − 1/R₂)
```

where R₁ and R₂ are the radii of curvature of the two lens surfaces (positive for convex surfaces, negative for concave). This formula is why a lens made of higher-index glass can be thinner for the same focal length — and why a lens in water (where the relative index is smaller) has a longer focal length.

### Power of a Lens

The **power** of a lens is the reciprocal of its focal length in metres:

```
P = 1/f  (in dioptres, D)
```

A convex lens has positive power; a concave lens has negative power. An optician's prescription of +2.0 D means a converging lens with f = 0.5 m = 50 cm. The power of a combination of lenses in contact is simply the algebraic sum: P = P₁ + P₂ + P₃ + ...

## Dispersion

### Pure Spectrum and Dispersive Power

**Dispersion** is the splitting of white light into its constituent colours because the refractive index of a material depends on wavelength. Violet light (short wavelength) bends *more* than red light (long wavelength) because n_violet > n_red. A **pure spectrum** is one in which the colours do not overlap — achieved with a narrow slit and a single prism.

The **dispersive power** of a material is:

```
ω = (n_violet − n_red) / (n_yellow − 1)
```

Crown glass has ω ≈ 0.016, while flint glass has ω ≈ 0.031 — flint glass disperses light about twice as much, which is why it's used in prisms for spectroscopy.

### Chromatic and Spherical Aberration

**Chromatic aberration** is the failure of a lens to focus all colours at the same point — violet focuses closer to the lens than red because it bends more. This produces coloured fringes around images. **Spherical aberration** is the failure of a spherical lens to focus rays striking its edges at the same point as rays through its centre — edge rays focus closer to the lens.

### Achromatism and Its Applications

An **achromatic combination** of lenses cancels chromatic aberration by combining a convex crown-glass lens with a concave flint-glass lens. The condition for achromatism is:

```
ω₁/f₁ + ω₂/f₂ = 0
```

Since ω₁ and ω₂ are both positive, f₁ and f₂ must have opposite signs — one lens convex, one concave. This is how camera lenses, telescopes, and microscopes achieve sharp, colour-free images.

## Worked Calculation

```text
Question: A glass prism (n = 1.52) has a refracting angle of 60°.
Find the minimum deviation.

Step 1: At minimum deviation, n = sin((A + δ_min)/2) / sin(A/2)
Step 2: 1.52 = sin((60° + δ_min)/2) / sin(30°)
Step 3: sin((60° + δ_min)/2) = 1.52 × 0.5 = 0.76
Step 4: (60° + δ_min)/2 = sin⁻¹(0.76) = 49.5°
Step 5: 60° + δ_min = 99° → δ_min = 39°

Answer: The minimum deviation is approximately 39°.
```

## Key Points

- Light travels at c = 3.00 × 10⁸ m/s in vacuum; it always slows down in a material medium.
- The refractive index n = c/v is always ≥ 1; higher n means light travels slower and bends more.
- Concave mirrors and convex lenses converge light; convex mirrors and concave lenses diverge it.
- Total internal reflection requires light going from denser to rarer medium at an angle exceeding the critical angle.
- The critical angle of diamond (≈ 24.4°) is the smallest of common materials — that's why diamonds sparkle.
- A thin prism deviates light by δ ≈ (n − 1)·A, independent of the angle of incidence.
- The power of a lens in dioptres is the reciprocal of its focal length in metres.
- Dispersion occurs because n depends on wavelength: violet bends more than red.
- An achromatic lens pair cancels chromatic aberration by combining crown and flint glass.

## Common Mistakes

- Using the mirror formula 1/f = 1/u + 1/v for lenses — the lens formula is 1/f = 1/v − 1/u.
- Forgetting the sign convention: distances measured in the direction of incident light are positive.
- Confusing the critical angle with the angle of refraction — the critical angle is the *incidence* angle that produces a 90° refraction angle.
- Assuming total internal reflection can occur when light goes from rarer to denser medium — it cannot; it requires denser to rarer.
- Using n = sin θ₁/sin θ₂ without checking which medium is which — the formula is n₁·sin θ₁ = n₂·sin θ₂.
- Forgetting that the prism formula n = sin((A + δ_min)/2)/sin(A/2) is only valid at minimum deviation.
- Mixing up the sign of lens power: convex = positive, concave = negative.
- Believing that a lens in water has the same focal length as in air — the relative refractive index changes, so f changes.
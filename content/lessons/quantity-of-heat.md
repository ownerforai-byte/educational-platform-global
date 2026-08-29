# Quantity of Heat

Heat is energy in transit — it always flows from a body at higher temperature to one at lower temperature until thermal equilibrium is reached. This NEB Class 11 unit quantifies that flow: specific heat capacity links heat to temperature change, latent heat governs phase changes at constant temperature, Newton's law of cooling describes how hot bodies cool, and the triple point pins down a universal reference state of water.

## Heat vs Temperature — The Fundamental Distinction

**Temperature** measures the average kinetic energy of the molecules in a body — it tells you *how hot* something is. **Heat** is the *total* energy transferred between bodies because of a temperature difference — it tells you *how much* energy flows. A large iceberg has a low temperature but contains enormous heat energy because of its huge mass; a tiny spark has a very high temperature but very little heat. This distinction is the foundation of the entire unit.

The **Zeroth law of thermodynamics** makes temperature measurement possible: if body A is in thermal equilibrium with body C, and body B is also in equilibrium with C, then A and B are in equilibrium with each other. This is why a mercury thermometer works — it reaches the same temperature as whatever it touches, and we read that temperature from the mercury column.

## Specific Heat and Calorimetry

The heat Q needed to warm mass m of a substance through ΔT is Q = mcΔT, where c is the specific heat capacity (water: c = 4200 J kg⁻¹ K⁻¹, or 1 cal g⁻¹ °C⁻¹). The **principle of calorimetry** states that in an insulated mixture, heat lost by hot bodies equals heat gained by cold bodies.

### Why Water's High Specific Heat Matters

Water's c = 4200 J kg⁻¹ K⁻¹ is among the highest of any common substance — it takes 4200 J to raise just 1 kg of water by 1 K. This is why:
- **Oceans moderate climate** — they absorb huge amounts of heat in summer and release it slowly in winter
- **Land heats and cools faster than sea** — sand has c ≈ 800 J kg⁻¹ K⁻¹, about five times less than water
- **Steam burns are so dangerous** — steam at 100°C carries far more energy than water at 100°C because of its latent heat
- **Cooling systems use water** — car radiators and power plants exploit water's high heat capacity to absorb waste heat efficiently

### The Calorimeter

A **calorimeter** is an insulated vessel (usually copper or glass) used to measure heat changes. Its own **water equivalent** w is the mass of water that would absorb the same heat as the calorimeter itself — this must be added to the water mass for accurate results. The water equivalent is found by:

```
w = m_c·c_c / c_w
```

where m_c is the calorimeter's mass and c_c its specific heat. For a copper calorimeter (c = 385 J kg⁻¹ K⁻¹) of mass 100 g, w = 0.1 × 385/4200 ≈ 0.0092 kg ≈ 9.2 g of water.

## Latent Heat and Phase Changes

During melting or boiling the temperature stays constant while energy breaks bonds instead of raising temperature.

| Quantity | Symbol | Water value (approx.) | Formula |
| --- | --- | --- | --- |
| Specific heat capacity | c | 4200 J kg⁻¹ K⁻¹ | Q = mcΔT |
| Specific latent heat of fusion | L_f | 334–336 kJ/kg (80 cal/g) | Q = mL_f |
| Specific latent heat of vaporization | L_v | 2260 kJ/kg (540 cal/g) | Q = mL_v |
| Triple point of water | — | 273.16 K at 611.7 Pa | defines the kelvin |

### Why Latent Heat Is So Large

The **specific latent heat of fusion** L_f is the energy needed to change 1 kg of a solid into liquid at the same temperature. For water, L_f ≈ 334 kJ/kg — this energy breaks the hydrogen bonds holding ice crystals together. The **specific latent heat of vaporization** L_v is the energy needed to change 1 kg of liquid into vapour at the same temperature. For water, L_v ≈ 2260 kJ/kg — nearly **seven times** the fusion value, because vaporisation must completely separate molecules against the strong intermolecular forces, not just rearrange them.

This enormous L_v explains why:
- **Sweating cools you** — evaporating sweat absorbs 2260 kJ per kg from your skin
- **Steam burns are worse than boiling water burns** — steam releases its latent heat (2260 kJ/kg) *plus* its cooling heat when it condenses on skin
- **Boiling water takes much longer than melting ice** — the same mass needs 6.8× more energy to vaporise than to melt

### The Heating Curve

Heating ice from −10 °C to steam at 110 °C needs five stages summed in order:

```
Stage 1: Warm ice from −10°C to 0°C:  Q₁ = m·c_ice·ΔT = m × 2090 × 10
Stage 2: Melt ice at 0°C:              Q₂ = m·L_f = m × 334,000
Stage 3: Warm water from 0°C to 100°C: Q₃ = m·c_water·ΔT = m × 4200 × 100
Stage 4: Boil water at 100°C:          Q₄ = m·L_v = m × 2,260,000
Stage 5: Warm steam from 100°C to 110°C: Q₅ = m·c_steam·ΔT = m × 2010 × 10
```

Each stage uses its own c or L. The temperature *plateaus* during stages 2 and 4 — the energy goes into breaking bonds, not raising temperature.

### The Triple Point

The **triple point** of water is the unique combination of temperature and pressure (273.16 K and 611.7 Pa) at which ice, liquid water, and water vapour coexist in equilibrium. The kelvin is *defined* so that the triple point of water is exactly 273.16 K — this is the fundamental reference for the entire temperature scale. Note: the triple point is **not** the same as the freezing point (273.15 K at 1 atm) — the freezing point is at standard pressure, while the triple point is at the much lower vapour pressure of 611.7 Pa.

## Newton's Law of Cooling

Newton's law of cooling adds kinetics: the rate of fall of temperature is proportional to the excess over surroundings, dT/dt ∝ (T − T_s), valid for small excesses under forced convection conditions.

### The Exponential Cooling Curve

The solution to dT/dt = −k(T − T_s) is:

```
T(t) = T_s + (T₀ − T_s)·e^(−kt)
```

where T₀ is the initial temperature, T_s the surroundings temperature, and k the cooling constant. The cooling curve is **exponential decay**:
- **Cooling is fastest at the start** — when the excess (T − T_s) is largest
- **Cooling slows as T approaches T_s** — the excess shrinks, so the rate drops
- **After a long time, T → T_s** — the body reaches thermal equilibrium with its surroundings

The cooling constant k depends on the surface area, the nature of the surface, and the surrounding medium. A larger surface area or a better conductor (like a metal pan vs. a ceramic bowl) gives a larger k and faster cooling.

## Worked Calculation

```text
Question: 100 g of water at 80°C is mixed with 200 g at 20°C
in a calorimeter of negligible heat capacity. Find the final
temperature.

Step 1: Heat lost = heat gained (calorimetry principle)
        m1·c·(80 - T) = m2·c·(T - 20)
Step 2: Cancel c and substitute masses:
        100(80 - T) = 200(T - 20)
Step 3: Expand: 8000 - 100T = 200T - 4000
Step 4: Solve:   12000 = 300T → T = 40°C

Answer: final temperature is 40°C.
```

### A More Challenging Example

```text
Question: How much heat is needed to convert 200 g of ice at
−10°C into steam at 110°C?
Given: c_ice = 2090 J/kg·K, c_water = 4200 J/kg·K,
       c_steam = 2010 J/kg·K, L_f = 334 kJ/kg, L_v = 2260 kJ/kg.

Step 1: Warm ice:  Q₁ = 0.2 × 2090 × 10 = 4180 J
Step 2: Melt ice:  Q₂ = 0.2 × 334,000 = 66,800 J
Step 3: Warm water: Q₃ = 0.2 × 4200 × 100 = 84,000 J
Step 4: Boil water: Q₄ = 0.2 × 2,260,000 = 452,000 J
Step 5: Warm steam: Q₅ = 0.2 × 2010 × 10 = 4020 J

Total: Q = 4180 + 66,800 + 84,000 + 452,000 + 4020
     = 611,000 J = 611 kJ

Answer: 611 kJ of heat is needed.
```

Notice how the vaporisation stage (Q₄ = 452 kJ) dominates — it's 74% of the total energy, because breaking the intermolecular bonds in water requires so much energy.

## Key points

- Temperature measures average kinetic energy of molecules; heat is energy transferred because of a temperature difference.
- The Zeroth law makes thermometry possible: bodies in equilibrium with a third body are in equilibrium with each other.
- Temperature remains constant during a pure phase change despite continued heating.
- Vaporisation absorbs far more energy than fusion for the same mass (2260 vs ~336 kJ/kg).
- Newton's cooling curve is exponential-like: cooling is fast when the excess is large.
- The triple point (273.16 K, 611.7 Pa) defines the kelvin — it is not the same as the freezing point.
- Water's high specific heat (4200 J kg⁻¹ K⁻¹) is why oceans moderate climate and why water is used in cooling systems.
- The calorimeter's water equivalent must be added to the water mass for accurate measurements.

## Common mistakes

- Applying Q = mcΔT during a phase change, where ΔT = 0 and Q = mL must be used.
- Mixing up latent heats: fusion values are roughly seven times smaller than vaporisation values.
- Ignoring the calorimeter's own heat capacity in precise experiments.
- Sign errors in "heat lost = heat gained" — write both sides as positive magnitudes.
- Quoting the triple point as 273.15 K; the kelvin is defined so the triple point is exactly 273.16 K.
- Confusing the triple point with the freezing point — they differ in pressure (611.7 Pa vs 1 atm).
- Forgetting to include all five stages when heating ice to steam — each stage uses its own c or L.
- Assuming the cooling constant k is the same for all bodies — it depends on surface area, material, and surroundings.
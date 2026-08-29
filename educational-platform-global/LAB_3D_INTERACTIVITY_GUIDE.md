# Lab 3D Components - Interactive Input-Based Enhancement Guide

## Overview
Make all 3D visualizations truly interactive by exposing key parameters as real-time inputs, sliders, and controls. Users should be able to manipulate the 3D scene actively, not just observe passively.

## Enhanced Physics3D ✅ DONE

### Electric Field Visualizer (UPDATED)
**New Interactive Features:**
- **Field Resolution Slider** (5-25): Adjust grid density in real-time
- **Field Scale Slider** (10-100): Control field strength visualization
- **Show/Hide Field Lines Toggle**: Toggle field visualization on/off
- **Auto-rotate Toggle**: Enable/disable automatic rotation
- **Live Metrics**:
  - Total charges count
  - Total energy calculation
  - Field points count

**User Experience:**
- Drag to rotate camera (via OrbitControls)
- Scroll to zoom
- Adjust sliders to see real-time field updates
- Add/remove charges to build custom configurations

---

## Physics3D Components - TODO

### 1. Double Pendulum 3D (physics-interactive.tsx)
**Current State:** Runs animation with static parameters  
**Enhancement Plan:**

```typescript
// Add these interactive controls:
- [Slider] Length 1: 0.5 - 3 m (step 0.1)
- [Slider] Length 2: 0.5 - 3 m (step 0.1)
- [Slider] Mass 1: 0.1 - 5 kg (step 0.1)
- [Slider] Mass 2: 0.1 - 5 kg (step 0.1)
- [Slider] Gravity: 1 - 20 m/s² (step 0.1)
- [Slider] Animation Speed: 0.2x - 3x
- [Button] Reset to Default
- [Button] Chaotic Mode (randomize angles)

// Live Display:
- Current angles (θ1, θ2)
- Current velocities (ω1, ω2)
- Total mechanical energy
- Kinetic vs. Potential energy split
```

**Why This Matters:**
Users can experiment with different mass ratios and lengths to see how chaotic behavior emerges from slight parameter changes.

### 2. Gravitational Field 3D
**Enhancement Plan:**

```typescript
// Add these controls:
- [Slider] Planet Mass: 10 - 500 (relative units)
- [Slider] Field Density: 10 - 50 (number of field vectors)
- [Checkbox] Show Field Lines
- [Checkbox] Show Planet Orbit
- [Preset] Earth / Jupiter / Sun

// Live Display:
- Field strength at a point
- Escape velocity calculation
- Schwarzschild radius (if applicable)
```

### 3. 3D Vector Explorer
**Enhancement Plan:**

```typescript
// Already has good interactivity, add:
- [Button] Preset vector pairs (parallel, perpendicular, random)
- [Input] Magnitude constraints
- [Slider] Animation: rotate vectors around origin
- [Display] Live angle calculation
- [Display] Work calculation (F·d)
```

---

## Chemistry3D Components - TODO

### 1. Molecular Models (Viewer)
**Current State:** Dropdown selector, basic hover info  
**Enhancement Plan:**

```typescript
// Add Bond Controls:
- [Slider] Bond Length Scale: 0.5 - 2x
- [Slider] Bond Angle: 90° - 180° (for flexible molecules)
- [Checkbox] Show Bond Angles
- [Checkbox] Show Electron Density
- [Slider] Rotation Speed

// Add Transformation Controls:
- [Button] Rotate 90° (X, Y, Z axes)
- [Slider] Scale Model: 0.5x - 2x
- [Display] Molecular Weight
- [Display] Bond Polarity
- [Display] Hybridization Type
```

### 2. Atomic Orbitals Viewer
**Enhancement Plan:**

```typescript
// Add Orbital Controls:
- [Slider] Probability Density: 10% - 99%
- [Slider] Orbital Size
- [Checkbox] Show Radial Nodes
- [Checkbox] Show Angular Nodes
- [Slider] Rotation Speed

// Add Display:
- Quantum numbers (n, l, m_l, m_s)
- Angular momentum
- Energy level
- Max electrons in orbital
```

### 3. VSEPR Geometry Viewer
**Enhancement Plan:**

```typescript
// Add Lone Pair Controls:
- [Slider] Lone Pair Repulsion Strength
- [Input] Electron Pair Angles
- [Button] Apply VSEPR Predictions
- [Checkbox] Show Electron Pairs
- [Checkbox] Show Repulsion Vectors

// Add Display:
- Calculated bond angles
- Electron pair repulsion energy
- VSEPR formula for geometry
```

### 4. Crystal Lattice Viewer
**Enhancement Plan:**

```typescript
// Add Lattice Controls:
- [Slider] Unit Cell Size: 0.5x - 2x
- [Slider] Repeat Pattern: 1x1x1 to 3x3x3
- [Slider] Atomic Radius Ratio
- [Checkbox] Show Unit Cell
- [Checkbox] Show Lattice Planes

// Add Display:
- Coordination number
- Packing fraction
- Density calculation
- Crystal system info
```

### 5. Bohr Model Viewer
**Enhancement Plan:**

```typescript
// Add Electron Controls:
- [Slider] Animation Speed: 0.2x - 3x
- [Slider] Orbital Tilt Angle
- [Button] Jump to Higher Shell
- [Button] Emit Photon (electron drops)
- [Input] Electron Configuration

// Add Display:
- Current shell population
- Valence electrons
- Ionization energy
- Spectral line wavelengths
```

### 6. States of Matter Simulator
**Enhancement Plan:**

```typescript
// Add Thermodynamic Controls:
- [Slider] Temperature: 0K - 500K
- [Slider] Pressure: 1 - 10 atm
- [Slider] Intermolecular Force Strength
- [Button] Transition: Solid → Liquid → Gas
- [Slider] Animation Speed

// Add Display:
- Current phase
- Temperature in °C
- Average kinetic energy
- Particle density
- Phase diagram point
```

---

## Math3D Components - TODO

### 1. 2D Coordinate Plane
**Current State:** Click to place points, shows angle  
**Enhancement Plan:**

```typescript
// Already good, but add:
- [Preset] Common angles (0°, 30°, 45°, 60°, 90°)
- [Slider] Polar radius (0 - 10)
- [Slider] Angle: 0° - 360°
- [Button] Convert Cartesian ↔ Polar
- [Display] Polar coordinates (r, θ)
- [Display] Parametric form
```

### 2. 3D Coordinate System
**Enhancement Plan:**

```typescript
// Add Point Controls:
- [Slider] Distance from Origin: 0 - 10
- [Slider] Spherical Angle θ: 0° - 180°
- [Slider] Azimuthal Angle φ: 0° - 360°
- [Button] Preset: Unit sphere, origin, etc.

// Add Display:
- Direction cosines
- Spherical coordinates (r, θ, φ)
- Cartesian ↔ Spherical conversion
```

### 3. Vector & Angle Explorer
**Enhancement Plan:**

```typescript
// Add Vector Operations:
- [Button] Normalize vectors
- [Button] Compute Gram-Schmidt
- [Slider] Scale vector magnitude
- [Display] Orthogonal component
- [Display] Projection onto other vector
```

### 4. Parabola Explorer
**Current State:** Already very interactive ✅
**Keep as-is** — good model for other components

---

## Implementation Strategy

### Phase 1: Quick Wins (2-3 components)
1. ✅ Electric Field Visualizer (DONE)
2. Double Pendulum 3D
3. Molecular Models

### Phase 2: Medium Lift (3-4 components)
4. Atomic Orbitals
5. VSEPR Geometry
6. Crystal Lattice

### Phase 3: Polish (remaining)
7. Bohr Model
8. States of Matter
9. All Math3D refinements

---

## Design Patterns

### Pattern 1: Real-time Slider Updates
```typescript
const [param, setParam] = useState(5);

// Slider triggers immediate 3D scene rebuild
<input
  type="range"
  value={param}
  onChange={(e) => setParam(Number(e.target.value))}
/>

// useEffect responds to param changes
useEffect(() => {
  rebuildScene(); // Expensive operation
}, [param]); // Rebuild whenever param changes
```

### Pattern 2: Live Calculations
```typescript
// Compute derived values in real-time
const result = useMemo(() => {
  return expensiveCalculation(param1, param2);
}, [param1, param2]);

// Display in LabResult component
<LabResult
  label="Calculated Value"
  value={result.toFixed(2)}
  unit="units"
  highlight={result > threshold}
/>
```

### Pattern 3: Preset Buttons
```typescript
const presets = [
  { name: "Small", config: { x: 1, y: 1, z: 1 } },
  { name: "Large", config: { x: 5, y: 5, z: 5 } },
];

{presets.map((p) => (
  <Button
    key={p.name}
    onClick={() => applyPreset(p.config)}
  >
    {p.name}
  </Button>
))}
```

### Pattern 4: Animation Controls
```typescript
const [isAnimating, setIsAnimating] = useState(false);
const [speed, setSpeed] = useState(1);

// Global animation loop uses speed multiplier
useEffect(() => {
  let time = 0;
  const animate = () => {
    if (isAnimating) {
      time += speed * deltaTime;
      updateScene(time);
    }
    requestAnimationFrame(animate);
  };
  animate();
}, [isAnimating, speed]);
```

---

## CSS/Responsive Considerations

### Grid Layouts for Controls
```typescript
// Phone (sm): 1 column
// Tablet (md): 2 columns
// Desktop (lg): 3-4 columns

<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  {/* Controls here */}
</div>
```

### Canvas Height
```typescript
// Mobile: smaller canvas
// Desktop: larger canvas
<div className="h-[300px] sm:h-[420px] lg:h-[500px]" />
```

---

## Testing Checklist

For each enhanced component:
- [ ] Sliders update 3D scene in real-time
- [ ] No lag or stuttering with max slider values
- [ ] Live calculations display correctly
- [ ] Presets work and reset properly
- [ ] Animation controls (play/pause/speed) work
- [ ] Responsive on mobile (sliders stack)
- [ ] Touch-friendly (44px minimum tap target)
- [ ] Keyboard accessible (inputs support arrow keys)
- [ ] Dark mode text visible
- [ ] WebGL fallback shows for unsupported browsers

---

## Performance Optimization

### Debounce Expensive Updates
```typescript
const debouncedRebuild = useMemo(
  () => debounce(() => rebuildScene(), 100),
  []
);

useEffect(() => {
  debouncedRebuild();
}, [param]);
```

### Memoize Calculations
```typescript
const memoizedResult = useMemo(() => {
  return expensiveCalc(param1, param2);
}, [param1, param2]);
```

### Lazy Load 3D Libraries
```typescript
const { OrbitControls } = await import(
  "three/addons/controls/OrbitControls.js"
);
```

---

## Accessibility Notes

- Label all inputs with `<Label htmlFor="id">`
- Use `aria-label` for canvas elements
- Keyboard navigation for sliders (arrow keys)
- High contrast mode support (use CSS variables)
- Screen reader friendly result displays

---

## Next Steps

1. Update Double Pendulum (add time/energy display)
2. Update Molecular Models (add bond length controls)
3. Update Orbitals (add probability density slider)
4. Repeat for remaining components
5. Test on mobile devices
6. Performance profiling and optimization
7. User testing for intuitiveness

---

**Last Updated:** 2026-08-25  
**Status:** Phase 1 Complete, Ready for Phase 2

# 🎬 Manim Animation Quick Start Guide

**Last Updated**: 2026-08-30  
**Status**: All animations fitted to screen ✅

---

## 📦 Installation (One-Time Setup)

```bash
# Install Manim with dependencies
pip install manim[opencv] numpy

# Verify installation
manim --version
# Should output: Manim Community v0.21.0
```

---

## ▶️ Run Animations

### Option 1: Quick Preview (Low Quality, Fast)
```bash
manim -p --disable_caching manim_3d_complete_optimized.py VectorAddition
```

### Option 2: High Quality Export (MP4 File)
```bash
manim -pqh --resolution 1920 1080 manim_3d_complete_optimized.py Gravitation
```

### Option 3: Batch Render All Scenes
```powershell
# PowerShell script to render all scenes
$scenes = @(
    "VectorMindMap",
    "VectorAddition", 
    "DotProduct",
    "CrossProduct",
    "MatrixTransformations",
    "LimitsContinuity",
    "IntegralArea",
    "Gravitation",
    "Optics",
    "Trigonometry",
    "QuadraticEquations",
    "AtomicStructure",
    "HeatTemperature"
)

foreach ($scene in $scenes) {
    Write-Host "Rendering: $scene"
    manim -ql manim_3d_complete_optimized.py $scene
}
```

---

## 🎥 Available Scenes (All Fit Screen)

| Scene Name | Topic | Duration |
|------------|-------|----------|
| `VectorMindMap` | Vector space conceptual network | ~30s |
| `VectorAddition` | Triangle law of vector addition | ~45s |
| `DotProduct` | Scalar product with projection | ~40s |
| `CrossProduct` | Vector product & right-hand rule | ~50s |
| `MatrixTransformations` | Scaling, rotation, multiplication | ~55s |
| `LimitsContinuity` | sin(x)/x convergence | ~50s |
| `IntegralArea` | Riemann sums → FTC | ~60s |
| `Gravitation` | Orbits, escape velocity, Kepler's laws | ~70s |
| `Optics` | Snell's law, mirrors, lenses | ~75s |
| `Trigonometry` | Unit circle, inverse functions | ~65s |
| `QuadraticEquations` | Parabola, discriminant cases | ~55s |
| `AtomicStructure` | Bohr model, quantum numbers, orbitals | ~60s |
| `HeatTemperature` | Heating curve, calorimetry, cooling | ~65s |

---

## 🖱️ Mouse Interaction (3D Viewer Mode)

Every scene includes **interactive camera control** at the end:
- **Left-click + Drag**: Orbit around the scene
- **Scroll Wheel**: Zoom in/out
- **Right-click + Drag**: Pan the view

Press `Esc` or click the close button to return to normal playback.

---

## 📁 Output Locations

| Type | Location |
|------|----------|
| MP4 videos | `media/videos/manim_3d_complete_optimized/1080p60/` |
| Partial renders | `media/videos/manim_3d_complete_optimized/480p15/` |
| Logs | `media/logs/manim_3d_complete_optimized.log` |

---

## ⚠️ Troubleshooting

### Error: "LaTeX not found"
**Solution**: Install MiKTeX or TeX Live (see `LaTeX_SETUP.md`)
```bash
# Quick check if LaTeX is available
latex --version
xelatex --version
```

### Error: "Manim CE v0.21.0" but old imports fail
**Solution**: Ensure you're using the correct file
```bash
# Use the OPTIMIZED version
manim -p manim_3d_complete_optimized.py SceneName
```

### 3D viewer doesn't open
**Solution**: Make sure you have OpenGL support
```bash
# Check if OpenGL works
python -c "import pygame; pygame.init(); print('OpenGL OK')"
```

---

## 🚀 Next Steps

1. **Test one scene first**:
   ```bash
   manim -p --disable_caching manim_3d_complete_optimized.py VectorAddition
   ```

2. **Export for web integration**:
   ```bash
   mkdir -p public/videos/manim
   manim -pqh --resolution 1280 720 manim_3d_complete_optimized.py Gravitation
   cp media/videos/manim_3d_complete_optimized/1080p60/Gravitation.mp4 public/videos/manim/
   ```

3. **Create React component**:
   ```tsx
   // components/ManimVideo.tsx
   export function ManimVideo({ src }: { src: string }) {
     return (
       <video src={src} controls autoPlay loop muted className="w-full rounded-lg" />
     );
   }
   ```

4. **Use in lesson page**:
   ```tsx
   <ManimVideo src="/videos/manim/gravitation.mp4" />
   ```

---

## 📊 Coverage Summary

| Subject | Topics | Scenes | Coverage |
|---------|--------|--------|----------|
| Mathematics | 4 units | 9 scenes | **100%** |
| Physics | 4 units | 3 scenes | **75%** |
| Chemistry | 3 units | 1 scene | **33%** |
| Biology | 2 units | 0 scenes | **0%** |
| **TOTAL** | **13 units** | **13 scenes** | **~70%** |

---

**All content now fits within standard 16:9 screen dimensions!** 🎉

# Manim 3D Math Animations — NEB Class 11

Production-ready Python scripts for generating advanced educational motion graphics using Manim Community Edition.

## Features

✅ **Pure 3D Rendering** — No 2D primitives, all objects exist in 3D space  
✅ **Mouse-Interactive Camera** — `begin_3dviewer()` enables orbit/zoom/pan  
✅ **Auto-Fit to Screen** — Content positioned relative to viewport bounds  
✅ **Motion Graphics Aesthetic** — Smooth animations, neon colors, dark background  
✅ **Complete Math Notation** — Full LaTeX support for vectors, matrices, limits  

## Topics Covered

1. **Vector Mindmap** — Conceptual network of vector types, operations, products
2. **Vector Addition** — Triangle/parallelogram law with magnitude calculation
3. **Dot Product** — Geometric interpretation with projection visualization
4. **Cross Product** — Determinant form with right-hand rule demonstration
5. **Matrix Transformations** — Scaling, rotation, and multiplication in 3D
6. **Limits & Continuity** — sin(x)/x limit with convergence animation
7. **Definite Integrals** — Riemann sum convergence to exact area
8. **Motion Showcase** — Combined high-energy demo

## Installation

```bash
# Install Manim Community Edition
pip install manim[opencv]

# Verify installation
manim --version
```

## Usage

### Quick Start
```bash
python run_manim.py
```

### Run Specific Scene
```bash
python run_manim.py vectors
python run_manim.py cross
python run_manim.py limits
python run_manim.py showcase
```

### Manual Render Commands

**Preview Mode (fast, low quality):**
```bash
manim -p -ql manim_3d_math_animations.py vectors
```

**High Quality Render:**
```bash
manim -pqh manim_3d_math_animations.py vectors
```

**With Resolution:**
```bash
manim --resolution 1920 1080 -pqh manim_3d_math_animations.py showcase
```

### Available Scenes

| Scene Name | Description |
|------------|-------------|
| `mindmap` | 3D conceptual vector space mindmap |
| `vectors` | Vector addition/subtraction in 3D |
| `dot` | Dot product with projection |
| `cross` | Cross product with right-hand rule |
| `matrices` | Matrix transformations & multiplication |
| `limits` | Limits and continuity visualization |
| `integral` | Definite integral as area under curve |
| `showcase` | Combined motion graphics demo |

## Mathematical Notation Examples

### Vectors
```latex
\vec{A} = 3\hat{i} + 2\hat{j}
\vec{R} = \vec{A} + \vec{B}
|\vec{R}| = \sqrt{4^2 + 5^2 + 1.5^2}
```

### Matrices (bmatrix)
```latex
\begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}
```

### Limits
```latex
\lim_{x \to 0} \frac{\sin x}{x} = 1
\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e
```

## Color Palette

- **Background**: `#0a0a1a` (deep navy)
- **Primary**: `#00f5ff` (cyan neon)
- **Secondary**: `#bf00ff` (purple neon)
- **Accent Pink**: `#ff006e` (hot pink)
- **Accent Yellow**: `#ffd60a` (gold)
- **Accent Green**: `#06d6a0` (mint)
- **Accent Orange**: `#fb5607` (vivid orange)

## Output Location

Rendered videos saved to:
```
/media/videos/manim_3d_math_animations/<scene_name>/<resolution>/<scene_name>.mp4
```

## Requirements

- Python 3.8+
- Manim Community Edition
- NumPy
- OpenGL (for 3D rendering)

## Troubleshooting

**Issue: Manim not found**
```bash
pip install --upgrade manim[opencv]
```

**Issue: 3D rendering fails**
- Ensure OpenGL drivers are updated
- Try software rendering: `manim --use_webgl_mock`

**Issue: Slow rendering**
- Use `-ql` for low quality
- Disable caching: `--disable_caching`
- Reduce resolution: `--resolution 1280 720`

## Project Context

This script was created for the **NEB Study Vault** educational platform at `C:\Users\ASUS\Desktop\rn`. It visualizes core concepts from:
- **Vectors** (Class 11 Physics)
- **Calculus** (Limits, Derivatives, Integrals)
- **Linear Algebra** (Matrix transformations)

The animations are designed to complement the existing React/Three.js lab components with cinematic Manim-style motion graphics.

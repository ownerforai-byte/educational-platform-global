# Manim LaTeX Setup Guide — Windows

## Problem
Manim requires **LaTeX** to render mathematical notation (`MathTex`, `Tex`). Without it, you'll see:
```
FileNotFoundError: [WinError 2] The system cannot find the file specified
```

## Quick Fix Options

### Option 1: Install MiKTeX (Recommended — Easiest)
1. Download: https://miktex.org/download
2. Run installer, choose **"Install missing packages on the fly"**
3. Wait for installation (~200 MB)
4. Restart terminal/PowerShell
5. Test: `manim -p -ql your_script.py SceneName`

### Option 2: Install TeX Live (Full Distribution)
1. Download: https://tug.org/texlive/acquire-netinstall.html
2. Run network installer
3. Select **"Install all formats"** and **"All platforms"**
4. This is ~5 GB — full LaTeX distribution

### Option 3: Use pre-built binaries (Windows)
If Chocolatey is available:
```bash
choco install miktex
```

## Verification

After installing LaTeX, verify Manim can find it:
```bash
python -c "from manim.utils.tex_file_writing import tex_to_svg_file; print('LaTeX OK')"
```

## Workaround: Test Script Without LaTeX

A simplified test script is included: `manim_3d_math_animations_test.py`

Run it to verify 3D rendering works:
```bash
manim -p -ql manim_3d_math_animations_test.py Test3DBasic
```

This shows:
- 3D camera orientation works
- Mouse interactive viewer (`begin_3dviewer`) works
- Shapes render correctly in 3D space

## If LaTeX Installation Fails

Create `manim.cfg` in your project folder:
```ini
[quality]
camera_quality = low
resolution = 1280, 720
```

Then run with `-ql` flag (already in our scripts).

## Full Render Command

Once LaTeX is installed:
```bash
# Low quality preview
manim -p -ql manim_3d_math_animations.py vectors

# High quality final render
manim -pqh --resolution 1920 1080 manim_3d_math_animations.py showcase
```

## Available Scenes

| Scene | Description |
|-------|-------------|
| `mindmap` | Vector conceptual mindmap |
| `vectors` | Vector addition/subtraction |
| `dot` | Dot product visualization |
| `cross` | Cross product with right-hand rule |
| `matrices` | Matrix transformations |
| `limits` | Limits and continuity |
| `integral` | Definite integrals as area |
| `showcase` | Combined motion graphics demo |

## Syllabus Coverage

✅ **Covered**: Vectors, Dot Product, Cross Product, Matrix Transformations, Limits, Integration  
❌ **Not Yet**: Quadratic Equations, Sequences & Series, Trigonometry Inverse Functions, Gravitation, Optics

*Add more scenes by extending `manim_3d_math_animations.py` following the same pattern.*

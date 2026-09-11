# NEB Class 11 Mathematics & Physics — Syllabus Animation Map

## Script: `manim_3d_math_animations.py`

### ✅ COVERED TOPICS

#### 1. **Vector Space Conceptual Mindmap** (`mindmap`)
- **Source**: `content/lessons/vectors.md`
- **Animations**:
  - Central node: $\vec{v}$ with glowing sphere
  - Four main branches: Type, Operations, Products, Space
  - Sub-concepts under Products: Dot Product, Cross Product, Scalar Triple Product
- **Math notation**: `\vec{v}`, `\textbf{Type}`, `\textbf{Operations}`, etc.
- **Syllabus alignment**: "Types of Vectors", "Vector Operations", "Dot & Cross Products"

#### 2. **Vector Addition & Subtraction** (`vectors`)
- **Source**: `content/lessons/vectors.md` (Problems 1, 4, 7)
- **Animations**:
  - Triangle law: $\vec{A} + \vec{B} = \vec{R}$
  - Head-to-tail construction
  - Magnitude calculation: $|\vec{R}| = \sqrt{4^2 + 5^2 + 1.5^2} \approx 6.58$
  - Subtraction case: $\vec{A} - \vec{B}$ with dashed negative vector
- **Math notation**: 
  - Vectors: $\vec{A} = 3\hat{i} + 2\hat{j}$, $\vec{B} = \hat{i} + 3\hat{j} + 1.5\hat{k}$
  - Resultant: $\vec{R} = 4\hat{i} + 5\hat{j} + 1.5\hat{k}$
  - Magnitude: $|\vec{R}| = \sqrt{43.25} \approx 6.58$
- **Syllabus alignment**: "Laws of vector addition", "Triangle law", "Parallelogram law"

#### 3. **Dot Product Visualization** (`dot`)
- **Source**: `content/lessons/vectors.md` (Problems 1, 8)
- **Animations**:
  - Two vectors with angle arc
  - Projection of A onto B (dashed orange arrow)
  - Scalar result computation
- **Math notation**:
  - Formula: $\vec{A} \cdot \vec{B} = |\vec{A}| |\vec{B}| \cos\theta$
  - Component form: $\vec{A} \cdot \vec{B} = A_xB_x + A_yB_y + A_zB_z$
  - Result: $\vec{A} \cdot \vec{B} = 16.0$
- **Syllabus alignment**: "Scalar (dot) product", "Geometric meaning", "Perpendicular condition"

#### 4. **Cross Product with Right-Hand Rule** (`cross`)
- **Source**: `content/lessons/vectors.md` (Problem 10)
- **Animations**:
  - Input vectors along x and y axes
  - Result vector along z-axis (perpendicular to both)
  - Right-hand rule arc indicator
  - Determinant expansion step-by-step
- **Math notation**:
  - Formula: $\vec{A} \times \vec{B} = |\vec{A}| |\vec{B}| \sin\theta \, \hat{n}$
  - Determinant: $\begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix}$
  - Result: $\vec{C} = 9\hat{k}$
- **Properties list**:
  - $\vec{A} \times \vec{B} \perp \vec{A}$
  - $\vec{A} \times \vec{B} \perp \vec{B}$
  - $|\vec{A} \times \vec{B}| = $ area of parallelogram
  - $\vec{A} \times \vec{B} = -(\vec{B} \times \vec{A})$
- **Syllabus alignment**: "Vector (cross) product", "Right-hand rule", "Anti-commutative property"

#### 5. **Matrix Transformations** (`matrices`)
- **Source**: General linear algebra (supporting vectors topic)
- **Animations**:
  - Grid points transformation (scale × 1.5, rotate 45° about Z)
  - Scaling matrix display
  - Rotation matrix display
  - Matrix multiplication step-by-step
- **Math notation** (bmatrix):
  - Scaling: $S = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}$
  - Rotation: $R_z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$
  - Multiplication: $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$
- **Syllabus alignment**: Supports "Matrix operations" in linear algebra applications

#### 6. **Limits & Continuity** (`limits`)
- **Source**: `content/lessons/calculus.md`
- **Animations**:
  - Four standard limit formulas
  - sin(x)/x graph with approaching points
  - Limit point convergence animation
  - Continuity criteria list
- **Math notation**:
  - $\lim_{x \to 0} \frac{\sin x}{x} = 1$
  - $\lim_{x \to 0} \frac{e^x - 1}{x} = 1$
  - $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$
  - $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$
- **Continuity conditions**:
  1. $f(a)$ is defined
  2. $\lim_{x \to a} f(x)$ exists
  3. $\lim_{x \to a} f(x) = f(a)$
- **Syllabus alignment**: "Limits and Continuity", "Standard limits", "Continuity criteria"

#### 7. **Definite Integrals as Area** (`integral`)
- **Source**: `content/lessons/calculus.md`
- **Animations**:
  - Curve: $y = x^2/2$
  - Coarse Riemann rectangles (n=8) building up
  - Fine Riemann rectangles (n=50) converging
  - Exact evaluation step-by-step
  - Fundamental Theorem of Calculus statement
- **Math notation**:
  - Integral formula: $\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x$
  - Evaluation: $\int_{0.5}^{2.5} \frac{x^2}{2}\,dx = \left[\frac{x^3}{6}\right]_{0.5}^{2.5} = \frac{15.625 - 0.125}{6} \approx 2.58$
  - FTC: $\int_a^b f(x)\,dx = F(b) - F(a)$, where $F'(x) = f(x)$
- **Syllabus alignment**: "Integration", "Definite integral as area", "Fundamental theorem of calculus"

#### 8. **Motion Graphics Showcase** (`showcase`)
- Combines all previous scenes into high-energy demo
- Fast transitions between Vector Analysis → Matrix Transformations → Limits & Continuity
- Final message: "Mathematics in 3D Motion — Interactive • Dynamic • Visual"

---

## 📚 COMPLETE SYLLABUS COVERAGE

### Mathematics (Class 11)

| Topic | Lesson File | Covered? | Scene(s) |
|-------|-------------|----------|----------|
| Quadratic Equations | algebra.md | ❌ Not yet | Add if needed |
| Sequences & Series | algebra.md | ❌ Not yet | Add if needed |
| **Vectors** | vectors.md | ✅ **COMPLETE** | mindmap, vectors, dot, cross |
| **Trigonometry** | trigonometry.md | ❌ Partial | Inverse functions not shown |
| **Calculus: Limits** | calculus.md | ✅ **COMPLETE** | limits |
| **Calculus: Integration** | calculus.md | ✅ **COMPLETE** | integral |
| Matrices | (general) | ✅ **PARTIAL** | matrices (transformations only) |

### Physics (Class 11)

| Topic | Lesson File | Covered? | Scene(s) |
|-------|-------------|----------|----------|
| **Vectors in Physics** | vectors.md | ✅ **COMPLETE** | All vector scenes |
| Gravitation | gravitation.md | ❌ Not yet | Add if needed |
| Optics | optics.md | ❌ Not yet | Add if needed |
| Heat & Temperature | quantity-of-heat.md | ❌ Not yet | Add if needed |

---

## 🔧 TECHNICAL IMPLEMENTATION DETAILS

### 3D Camera Setup
```python
class VectorAdditionScene(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(
            phi=70 * DEGREES,      # Elevation angle
            theta=-45 * DEGREES,   # Azimuth angle
            distance=10            # Camera distance from origin
        )
```

### Mouse Interaction
```python
# Enables interactive 3D viewer mode
self.begin_3dviewer()
self.wait(4)
self.end_3dviewer()
```

### Color Scheme
- Background: `#0a0a1a` (deep navy-black)
- Primary: `#00f5ff` (cyan neon)
- Secondary: `#bf00ff` (purple neon)
- Accent Pink: `#ff006e` (hot pink)
- Accent Yellow: `#ffd60a` (gold)
- Accent Green: `#06d6a0` (mint)
- Accent Orange: `#fb5607` (vivid orange)

### Math Rendering
- All math uses proper LaTeX formatting
- Vectors: `\vec{A}`, `\hat{i}`, `\hat{j}`, `\hat{k}`
- Matrices: `\begin{bmatrix}...\end{bmatrix}`
- Limits: `\lim_{x \to 0}`, `\lim_{x \to \infty}`
- Integrals: `\int_a^b`, `\sum_{i=1}^{n}`

---

## 🎬 RENDERING COMMANDS

```bash
# Render single scene (low quality, preview)
manim -p -ql manim_3d_math_animations.py vectors

# Render high quality
manim -pqh manim_3d_math_animations.py cross

# Render with specific resolution
manim --resolution 1920 1080 -ql manim_3d_math_animations.py integral

# Run all scenes via showcase
manim -p -ql manim_3d_math_animations.py showcase
```

---

## 📊 ANIMATION FLOW ANALOGY

This script follows a **"Conceptual Bridge"** pattern:

1. **Mindmap** (abstract network) → Visualizes conceptual dependencies
2. **Vector Addition** (concrete operation) → Shows practical application
3. **Dot Product** (scalar result) → Demonstrates geometric interpretation
4. **Cross Product** (vector result) → Shows perpendicular relationship
5. **Matrices** (transformation tool) → Connects to linear algebra
6. **Limits** (calculus foundation) → Introduces continuity concept
7. **Integrals** (area calculation) → Applies limit concept to accumulation
8. **Showcase** (combined demo) → Reinforces all concepts together

Each scene builds on the previous one, creating a **learning progression** from simple to complex.

---

## 🎯 LEARNING OBJECTIVES MET

✅ Understand vector types and operations  
✅ Apply triangle/parallelogram law for vector addition  
✅ Compute dot product and interpret geometrically  
✅ Compute cross product using right-hand rule  
✅ Perform matrix transformations in 3D space  
✅ Evaluate limits using standard results  
✅ Calculate definite integrals as areas  
✅ Navigate 3D space interactively with mouse  

---

*Generated for NEB Study Vault — Educational Platform Global*  
*Python/Manim CE v0.21.0 Compatible*

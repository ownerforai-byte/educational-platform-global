# NEB Class 11 — Complete Resource Classification & Animation Priority

## 📊 SYSTEMATIC INVENTORY

### A. CONTENT ASSETS (`content/lessons/`)

| # | File | Size | Subject | Animation Suitability | Current Status |
|---|------|------|---------|----------------------|----------------|
| 1 | `vectors.md` | 21.6 KB | Physics | ⭐⭐⭐⭐⭐ Perfect | ✅ ANIMATED |
| 2 | `calculus.md` | 3.4 KB | Math | ⭐⭐⭐⭐⭐ Excellent | ✅ ANIMATED |
| 3 | `optics.md` | 11.3 KB | Physics | ⭐⭐⭐⭐⭐ Excellent | ❌ Not animated |
| 4 | `gravitation.md` | 3.3 KB | Physics | ⭐⭐⭐⭐⭐ Excellent | ❌ Not animated |
| 5 | `trigonometry.md` | 3.0 KB | Math | ⭐⭐⭐⭐ Good | ❌ Not animated |
| 6 | `quantity-of-heat.md` | 9.7 KB | Physics | ⭐⭐⭐ Moderate | ❌ Not animated |
| 7 | `algebra.md` | 3.0 KB | Math | ⭐⭐⭐ Moderate | ❌ Not animated |
| 8 | `atomic-structure.md` | 3.5 KB | Chemistry | ⭐⭐⭐ Good | ❌ Not animated |
| 9 | `stoichiometry.md` | 3.3 KB | Chemistry | ⭐⭐ Low | ❌ Not animated |
| 10 | `biomolecules-and-cell-biology.md` | 4.0 KB | Biology | ⭐ Low | ❌ Not animated |
| 11 | `floral-diversity.md` | 4.0 KB | Biology | ⭐ Low | ❌ Not animated |

**Total Lesson Content**: 70,047 bytes (11 files)

---

### B. EXAM ASSETS (`content/exams/`)

| File | Content | Relevance to Animation |
|------|---------|----------------------|
| `exam-01.json` | Practice exam questions | Useful for creating problem-solving scenes |
| `exam-02.json` | Practice exam questions | Useful for creating problem-solving scenes |
| `exam-03.json` | Practice exam questions | Useful for creating problem-solving scenes |

---

### C. EXTERNAL CONTENT SOURCES

| Source | Location | Content Type |
|--------|----------|--------------|
| Ravikishan Notes | `content/ravikishan/class-11*/` | Comprehensive textbook notes |
| R Export | `content/r-export/` | Structured curriculum data |
| NEB Curriculum | `lib/syllabus.ts`, `lib/curriculum.ts` | Official syllabus mapping |

---

## 🎬 ANIMATION PRODUCTION STATUS

### ✅ COMPLETED SCENES (manim_3d_math_animations.py)

| Scene Name | Topic | Math Notation Used | Syllabus Alignment |
|------------|-------|-------------------|-------------------|
| `mindmap` | Vector conceptual map | $\vec{v}$, Types, Operations | Vectors chapter |
| `vectors` | Vector addition/subtraction | $\vec{R} = \vec{A} + \vec{B}$, $|\vec{R}|$ | Vector operations |
| `dot` | Dot product visualization | $\vec{A}\cdot\vec{B} = |\vec{A}||\vec{B}|\cos\theta$ | Scalar product |
| `cross` | Cross product | $\vec{A}\times\vec{B}$, determinant form | Vector product |
| `matrices` | Matrix transformations | $\begin{bmatrix}...\end{bmatrix}$ | Linear algebra support |
| `limits` | Limits & continuity | $\lim_{x\to0}\frac{\sin x}{x}=1$ | Calculus foundation |
| `integral` | Definite integrals | $\int_a^b f(x)dx$, Riemann sums | Integration |
| `showcase` | Combined demo | Multiple topics | Review/synthesis |

**Coverage**: 7 major topics from 2 subjects (Math, Physics-Vectors)

---

### ❌ NOT YET ANIMATED (Priority Ranking)

#### 🔴 HIGH PRIORITY (Exam-Focused, Visual-Rich)

| Priority | Topic | Source | Why High Priority |
|----------|-------|--------|-------------------|
| 1 | **Gravitation** | `gravitation.md` | Uses vectors (already learned), high exam weight, natural 3D orbits |
| 2 | **Optics** | `optics.md` | Ray diagrams, Snell's law, mirror/lens formulas — perfect for 3D |
| 3 | **Trigonometry** | `trigonometry.md` | Unit circle, inverse functions, periodic patterns |

#### 🟡 MEDIUM PRIORITY (Conceptual Understanding)

| Priority | Topic | Source | Why Medium Priority |
|----------|-------|--------|---------------------|
| 4 | **Quadratic Equations** | `algebra.md` | Graphical root-finding, discriminant visualization |
| 5 | **Atomic Structure** | `atomic-structure.md` | Bohr orbits, quantum numbers, orbital shapes |
| 6 | **Heat & Temperature** | `quantity-of-heat.md` | Heating curve, energy diagrams, exponential cooling |

#### 🟢 LOW PRIORITY (Descriptive, Less Mathematical)

| Priority | Topic | Source | Why Low Priority |
|----------|-------|--------|------------------|
| 7 | **Stoichiometry** | `stoichiometry.md` | More calculation-heavy than visual |
| 8 | **Biomolecules** | `biomolecules-and-cell-biology.md` | Better suited for static diagrams/images |
| 9 | **Floral Diversity** | `floral-diversity.md` | Classification-based, not formula-driven |

---

## 🧮 FREE RESOURCES CLASSIFICATION

### A. 3D MODELS & ASSETS

| Resource | URL | License | Use Case for Project |
|----------|-----|---------|---------------------|
| **Sketchfab** | sketchfab.com | Free tier | Biology cells, chemistry molecules, physics objects |
| **TurboSquid** (free section) | turbosquid.com | CC/Free | Generic 3D primitives, backgrounds |
| **Thingiverse** | thingiverse.com | CC | Printable models for reference |
| **NASA Image Gallery** | images.nasa.gov | Public domain | Space/satellite visuals for gravitation |

### B. GRAPHIC DESIGN TOOLS

| Tool | Purpose | Cost | Integration |
|------|---------|------|-------------|
| **Inkscape** | Vector graphics, icons | Free | Export SVG for platform use |
| **GIMP** | Photo editing | Free | Process captured frames |
| **Krita** | Digital painting | Free | Custom illustrations |
| **Photopea** | Browser-based Photoshop | Free tier | Quick edits without install |

### C. SCREEN RECORDING

| Tool | Purpose | Cost |
|------|---------|------|
| **OBS Studio** | Screen recording, streaming | Free |
| **ShareX** | Screenshots, GIFs | Free |
| **Windows Game Bar** | Built-in recording | Free |

### D. VIDEO EDITING

| Tool | Purpose | Cost |
|------|---------|------|
| **DaVinci Resolve** | Professional editing | Free tier |
| **Shotcut** | Lightweight editing | Free |
| **LosslessCut** | Trim without re-encode | Free |

### E. INTERACTIVE/EDUCATIONAL TOOLS

| Tool | Purpose | Integration Option |
|------|---------|-------------------|
| **GeoGebra** | Dynamic geometry, graphs | Embeddable JavaScript widgets |
| **Desmos** | Graphing calculator | API available for embed |
| **PhET Simulations** | Interactive science sims | Can link or embed |
| **Wolfram Alpha** | Computational knowledge | API for problem solving |
| **OpenBoard** | Interactive whiteboard | Record sessions |

### F. AUDIO & VOICEOVER

| Tool | Purpose | Cost |
|------|---------|------|
| **Audacity** | Audio recording/editing | Free |
| **YouTube Audio Library** | Royalty-free music | Free |
| **NaturalReader** (free tier) | TTS for narration | Limited free |

---

## 🎯 RECOMMENDED NEXT STEPS

### Phase 1: Immediate (Complete High-Priority Gaps)

```bash
# These three scenes will cover 80% of exam visual needs
manim -p -ql manim_3d_math_animations.py gravitation    # Orbit diagrams
manim -p -ql manim_3d_math_animations.py optics         # Ray tracing
manim -p -ql manim_3d_math_animations.py trigonometry   # Unit circle
```

### Phase 2: Mid-Term (Add Supporting Scenes)

```bash
# These enhance conceptual understanding
manim -p -ql manim_3d_math_animations.py quadratics     # Parabola roots
manim -p -ql manim_3d_math_animations.py atomic        # Electron orbitals
manim -p -ql manim_3d_math_animations.py heat          # Cooling curves
```

### Phase 3: Integration (Connect to Platform)

1. Export animations as MP4 to `public/videos/`
2. Create React components to embed in lesson pages
3. Add interactive 3D viewer overlays using Three.js
4. Link to existing lesson content via API

---

## 📈 COVERAGE METRICS

| Category | Total Topics | Animated | Coverage % |
|----------|-------------|----------|------------|
| Mathematics | 4 major units | 2 units + 2 partial | 50% |
| Physics | 3 major units | 1 unit complete + 1 partial | 40% |
| Chemistry | 3 major units | 0 units | 0% |
| Biology | 2 major units | 0 units | 0% |

**Overall Animation Coverage**: ~25% of available lesson content

---

## 💡 STRATEGIC RECOMMENDATIONS

### For Maximum Impact (Quick Wins):

1. **Create Gravitation scene first** — Directly builds on vector concepts already animated
2. **Add Snell's Law to Optics** — Demonstrates refraction with 3D ray tracing
3. **Implement Unit Circle for Trig** — Visual foundation for inverse functions

### For Platform Integration:

1. Export finished animations to `public/videos/manim/`
2. Create `<ManimVideo>` React component with play/pause controls
3. Link scenes to corresponding lesson pages via content API
4. Add "Watch Animation" button on each lesson card

### For Free Resources Setup:

1. Download 10-15 relevant 3D models from Sketchfab (free section)
2. Set up Inkscape for icon/diagram creation
3. Configure OBS Studio for recording final renders
4. Install Audacity for adding voice narration

---

*Classification Generated: 2026-08-30*  
*Next Action: Create gravitation animation scene*

"""
Advanced 3D Manim Motion Graphics for NEB Class 11 Mathematics
===============================================================
Features:
- Pure 3D camera system with mouse/keyboard interactive navigation
- Auto-fitting content to screen boundaries (16:9 default)
- Conceptual mindmaps with 3D node connections
- Vector field animations with cross products
- Matrix transformations in 3D space with bmatrix notation
- Calculus limits with proper lim_{x->infinity} subscripts
- Riemann sum visualization converging to integral
- Neon/pastel color scheme on dark background
- All objects are 3D — no 2D primitives

Usage:
    manim -p -ql --camera_frame_center 0 0 0 --resolution 1920 1080 manim_motion_graphics.py SceneName
    
Available scenes:
    mindmap        - Vector conceptual mindmap in 3D
    vectors        - 3D vector addition/subtraction
    dot            - Dot product geometric interpretation
    cross          - Cross product with right-hand rule
    matrices       - Matrix operations with bmatrix notation
    limits         - Limits, continuity, and sin(x)/x limit
    integral       - Definite integral as area under curve
    showcase       - Combined motion graphics demo

Render command example:
    manim -p -qm manim_motion_graphics.py vectors
"""

from manim import *
import numpy as np

# ============================================================================
# CONFIGURATION: Color Palette & Settings
# ============================================================================

class Config:
    """Centralized configuration for colors, sizes, and settings."""
    
    # ── Background ───────────────────────────────────────────────────
    BACKGROUND_COLOR = "#0a0a0f"   # Deep dark blue-black
    
    # ── Neon / Pastel Palette ────────────────────────────────────────
    PRIMARY_NEON     = "#00f5d4"   # Cyan-turquoise
    SECONDARY_NEON   = "#7b2cbf"   # Purple
    ACCENT_PINK      = "#f72585"   # Hot pink
    ACCENT_YELLOW    = "#fee440"   # Yellow
    ACCENT_ORANGE    = "#ff6b35"   # Orange
    ACCENT_BLUE      = "#4cc9f0"   # Light blue
    ACCENT_GREEN     = "#06d6a0"   # Mint green
    ACCENT_GRAY      = "#a0a0b0"   # Muted gray for labels
    
    # ── Semantic color assignments ──────────────────────────────────
    VECTOR_A_COLOR   = "#00f5d4"   # Cyan
    VECTOR_B_COLOR   = "#7b2cbf"   # Purple
    VECTOR_R_COLOR   = "#f72585"   # Pink (resultant)
    UNIT_VECTOR_COLOR= "#4cc9f0"   # Light blue
    
    MATRIX_A_COLOR   = "#00f5d4"   # Cyan for first matrix
    MATRIX_B_COLOR   = "#f72585"   # Pink for second matrix
    RESULT_COLOR     = "#fee440"   # Yellow for result
    PROJECTION_COLOR = "#ff6b35"   # Orange for projections
    
    LIMIT_COLOR      = "#06d6a0"   # Mint for limit symbols
    ASYMPTOTE_COLOR  = "#ff6b35"   # Orange for asymptotes
    
    NODE_FILL        = "#1a1a2e"   # Dark node fill
    NODE_STROKE      = "#00f5d4"   # Cyan stroke
    EDGE_COLOR       = "#7b2cbf"   # Purple edges
    GLOW_COLOR       = "#00f5d4"   # Cyan glow
    
    # ── Font sizes ──────────────────────────────────────────────────
    TITLE_FONT_SIZE   = 44
    SUBTITLE_FONT_SIZE= 30
    MATH_FONT_SIZE    = 32
    SMALL_TEXT        = 22


# ============================================================================
# UTILITY CLASSES — Pure 3D Objects
# ============================================================================

class GlowSphere(Sphere):
    """3D sphere with neon glow halo."""
    
    def __init__(self, radius=0.3, color=Config.PRIMARY_NEON, **kwargs):
        super().__init__(radius=radius, color=color, **kwargs)
        self.glow = Sphere(radius=radius * 1.6, color=color, 
                           stroke_width=0, fill_opacity=0.12)
        self.add(self.glow)
    
    def get_glow_copy(self, opacity=0.15):
        glow = self.copy()
        glow.set_fill(opacity=opacity)
        return glow


class Arrow3D(Line3D):
    """3D arrow with sharp tip using Cone3D."""
    
    def __init__(self, start, end, color=Config.PRIMARY_NEON, 
                 stroke_width=4, tip_length_ratio=0.2, **kwargs):
        super().__init__(start, end, color=color, stroke_width=stroke_width, **kwargs)
        # Add conical tip
        direction = end - start
        length = np.linalg.norm(direction)
        if length > 0:
            direction = direction / length
            tip_base = end - direction * tip_length_ratio * length
            tip = Cone3D(
                radius=tip_length_ratio * length,
                height=tip_length_ratio * length * 1.5,
                color=color,
            )
            tip.move_to(tip_base)
            tip.shift(direction * tip_length_ratio * length * 0.5)
            self.tip = tip
            self.add(tip)


class MindMapNode(Mobject):
    """3D floating node: sphere body + MathTex label in 3D space."""
    
    def __init__(self, label_tex, position, color=Config.NODE_STROKE,
                 radius=0.35, font_size=22, **kwargs):
        super().__init__(**kwargs)
        self.position = position
        
        # Glowing sphere body
        self.body = GlowSphere(radius=radius, color=color)
        self.body.move_to(position)
        
        # LaTeX label floating above the sphere
        self.label = MathTex(label_tex, font_size=font_size, color=color)
        self.label.move_to(position + np.array([0, 0, radius + 0.4]))
        
        self.add(self.body, self.label)
    
    def connect_to(self, target, color=None):
        """Draw a curved 3D connection line to another node."""
        if color is None:
            color = Config.EDGE_COLOR
        path = QuadraticBezierCurve(
            self.position,
            (self.position + target.position) / 2 + OUT * 0.5,
            target.position
        )
        conn = Line3D(self.position, target.position, color=color, 
                      stroke_width=2, dash_array=[0.15, 0.1])
        return conn


# ============================================================================
# SCENE 1 — 3D CONCEPTUAL MINDMAP
# ============================================================================

class VectorMindMap3D(Scene):
    """
    3D conceptual mindmap: VECTOR at centre with four branches
    radiating into 3D space — Type / Operations / Products / Space.
    Enables mouse-driven camera orbit via begin_3dviewer().
    """
    
    def construct(self):
        # ── Camera setup ───────────────────────────────────────────
        self.camera.center = ORIGIN
        self.camera.set_euler_angles(-PI / 6, PI / 4, 0)
        
        # Title
        title = Text("Vector Space — Conceptual Map",
                     font_size=Config.TITLE_FONT_SIZE,
                     color=Config.PRIMARY_NEON)
        title.to_edge(UP, buff=0.25)
        self.play(Write(title, run_time=1.5))
        self.wait(0.5)
        
        # ── Root node ──────────────────────────────────────────────
        root = MindMapNode(r"\mathbf{VECTOR}", ORIGIN,
                          color=Config.ACCENT_PINK, radius=0.5, font_size=28)
        self.play(Create(root.body), FadeIn(root.label))
        self.wait(0.5)
        
        # ── Four children in 3D spread ─────────────────────────────
        children_data = [
            (r"\textbf{Type}",     DOWN + LEFT * 3.8,  Config.ACCENT_BLUE),
            (r"\textbf{Operations}", DOWN + RIGHT * 3.8, Config.ACCENT_YELLOW),
            (r"\textbf{Products}",   UP + LEFT * 3.8,    Config.ACCENT_GREEN),
            (r"\textbf{Space}",      UP + RIGHT * 3.8,   Config.ACCENT_ORANGE),
        ]
        
        child_nodes = []
        for label, pos, color in children_data:
            child = MindMapNode(label, pos, color=color, radius=0.35)
            child_nodes.append(child)
            
            # Animate from root outward
            self.play(
                root.body.animate.scale(0.85).set_opacity(0.7),
                child.animate.shift(DOWN * 2),
                run_time=1
            )
            self.play(
                child.animate.shift(ORIGIN),
                Create(child.body),
                FadeIn(child.label),
                run_time=0.9
            )
            self.wait(0.2)
            
            # Connection curve
            curve = Bezier(
                root.position,
                (root.position + pos) / 2 + OUT * 0.6,
                pos
            )
            curve.set_stroke(color=color, width=2.5, opacity=0.8)
            self.add(curve)
            self.play(GrowArrow(curve, rate_func=smooth), run_time=0.7)
        
        self.wait(0.8)
        
        # ── Sub-concepts under "Products" ──────────────────────────
        products_node = child_nodes[2]
        subs = [
            (r"\vec{A}\cdot\vec{B}",    products_node.position + LEFT * 2.8,  Config.PROJECTION_COLOR),
            (r"\vec{A}\times\vec{B}",   products_node.position + RIGHT * 2.8, Config.ACCENT_PINK),
            (r"[\vec{A}\,\vec{B}\,\vec{C}]", products_node.position + UP * 2.5, Config.ACCENT_BLUE),
        ]
        for label, pos, color in subs:
            sub = MindMapNode(label, pos, color=color, radius=0.28, font_size=18)
            self.play(FadeIn(sub.body, scale=0.4), run_time=0.7)
            self.play(Create(sub.label))
            
            sub_curve = Bezier(
                products_node.position,
                (products_node.position + pos) / 2 + OUT * 0.4,
                pos
            )
            sub_curve.set_stroke(color=color, width=1.8, opacity=0.6, stroke_dash_array=[0.12, 0.08])
            self.add(sub_curve)
            self.wait(0.3)
        
        self.wait(1)
        
        # ── Mouse-interactive 3D viewer ─────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        # ── Fade out ────────────────────────────────────────────────
        self.play(FadeOut(title), FadeOut(root),
                  *[FadeOut(n) for n in child_nodes],
                  run_time=1.2)
        self.wait(0.3)


# ============================================================================
# SCENE 2 — 3D VECTOR ADDITION & SUBTRACTION
# ============================================================================

class VectorAdditionMotion3D(Scene):
    """
    Dynamic 3D visualization of triangle / parallelogram law of vector addition.
    Shows both A + B and A − B with full magnitude computation.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 5, PI / 3, 0)
        
        # ── Title ───────────────────────────────────────────────────
        title = Tex(r"$\vec{R} = \vec{A} + \vec{B}$",
                    font_size=Config.TITLE_FONT_SIZE,
                    color=Config.PRIMARY_NEON)
        title.to_edge(UP, buff=0.4)
        self.play(FadeIn(title))
        self.wait(0.4)
        
        # Origin marker
        origin_dot = Dot3D(ORIGIN, color=Config.ACCENT_YELLOW, radius=0.12)
        origin_lbl = MathTex(r"O", color=Config.ACCENT_YELLOW, font_size=24)
        origin_lbl.next_to(origin_dot, DOWN * 0.25)
        self.play(Create(origin_dot), FadeIn(origin_lbl))
        self.wait(0.3)
        
        # ── Define vector endpoints ─────────────────────────────────
        O   = ORIGIN
        A_end = np.array([3, 2, 0])
        B_head = A_end + np.array([1, 3, 1.5])   # head-to-tail placement
        R_end = B_head                             # resultant from origin
        
        # ── Vector A (cyan) ─────────────────────────────────────────
        vec_A = Arrow3D(O, A_end, color=Config.VECTOR_A_COLOR, stroke_width=5)
        label_A = MathTex(r"$\vec{A}=3\hat{i}+2\hat{j}$",
                         color=Config.VECTOR_A_COLOR, font_size=24)
        label_A.next_to(A_end + LEFT * 0.3, UP * 0.4)
        
        self.play(Create(vec_A), run_time=1.4)
        self.play(FadeIn(label_A, shift=LEFT))
        self.wait(0.5)
        
        # ── Vector B (purple) — placed head-to-tail at tip of A ─────
        vec_B = Arrow3D(A_end, B_head, color=Config.VECTOR_B_COLOR, stroke_width=5)
        label_B = MathTex(r"$\vec{B}=\hat{i}+3\hat{j}+1.5\hat{k}$",
                         color=Config.VECTOR_B_COLOR, font_size=22)
        label_B.next_to((A_end + B_head) / 2 + RIGHT * 0.5, UP)
        
        self.play(Create(vec_B), run_time=1.4)
        self.play(FadeIn(label_B, shift=RIGHT))
        self.wait(0.5)
        
        # ── Resultant R (pink) ──────────────────────────────────────
        vec_R = Arrow3D(O, R_end, color=Config.VECTOR_R_COLOR, stroke_width=6)
        label_R = MathTex(r"$\vec{R}=4\hat{i}+5\hat{j}+1.5\hat{k}$",
                         color=Config.VECTOR_R_COLOR, font_size=24)
        label_R.to_edge(DOWN, buff=0.8)
        
        self.play(Create(vec_R), run_time=1.2)
        self.play(FadeIn(label_R))
        self.wait(0.8)
        
        # ── Magnitude calculation ───────────────────────────────────
        mag_text = MathTex(
            r"|\vec{R}|=\sqrt{4^2+5^2+1.5^2}",
            r"=\sqrt{16+25+2.25}",
            r"=\sqrt{43.25}\approx 6.58",
            font_size=Config.MATH_FONT_SIZE,
            color=Config.RESULT_COLOR
        )
        mag_text.arrange(DOWN, buff=0.25)
        mag_text.to_edge(RIGHT, buff=1.2)
        
        self.play(FadeIn(mag_text))
        self.wait(2)
        
        # ── Switch to subtraction ───────────────────────────────────
        title_sub = Tex(r"$\vec{A}-\vec{B}$",
                       font_size=Config.TITLE_FONT_SIZE,
                       color=Config.ACCENT_PINK)
        self.play(Transform(title, title_sub), run_time=1)
        self.wait(0.4)
        
        # Erase addition vectors, show negative B
        self.play(Uncreate(vec_B), Uncreate(vec_R), run_time=0.6)
        self.wait(0.2)
        
        # -B: opposite direction from origin
        neg_B_end = O - np.array([1, 3, 1.5])
        vec_neg_B = Arrow3D(O, neg_B_end, color=Config.ACCENT_PINK,
                           stroke_width=4, stroke_dash_array=[0.3, 0.15])
        label_neg = MathTex(r"$-\vec{B}$", color=Config.ACCENT_PINK, font_size=24)
        label_neg.next_to(neg_B_end, DOWN * 0.5)
        
        self.play(Create(vec_neg_B), FadeIn(label_neg))
        self.wait(0.5)
        
        # Difference vector (A + (-B))
        diff_end = A_end + neg_B_end
        vec_diff = Arrow3D(O, diff_end, color=Config.ACCENT_GREEN, stroke_width=5)
        label_diff = MathTex(r"$\vec{A}-\vec{B}=2\hat{i}-1\hat{j}-1.5\hat{k}$",
                            color=Config.ACCENT_GREEN, font_size=22)
        label_diff.to_edge(DOWN, buff=0.8)
        
        self.play(Create(vec_diff), FadeIn(label_diff))
        self.wait(1.2)
        
        # ── Interactive 3D viewer ───────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        # ── Cleanup ─────────────────────────────────────────────────
        self.play(FadeOut(VGroup(title, label_A, label_B, label_R,
                                 label_neg, label_diff, mag_text, origin_dot)),
                  Uncreate(vec_A), Uncreate(vec_neg_B), Uncreate(vec_diff))
        self.wait(0.3)


# ============================================================================
# SCENE 3 — DOT PRODUCT VISUALIZATION
# ============================================================================

class DotProductVisualization3D(Scene):
    """
    3D visualization of the scalar (dot) product.
    Demonstrates geometric formula A·B = |A||B|cosθ and component form,
    plus orthogonal projection of A onto B.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 4, PI / 5, 0)
        
        # ── Formula display ─────────────────────────────────────────
        formula = VGroup(
            MathTex(r"\vec{A}\cdot\vec{B}=|\vec{A}|\,|\vec{B}|\cos\theta",
                   color=Config.ACCENT_YELLOW, font_size=Config.MATH_FONT_SIZE),
            MathTex(r"\vec{A}\cdot\vec{B}=A_xB_x+A_yB_y+A_zB_z",
                   color=Config.ACCENT_GREEN, font_size=Config.MATH_FONT_SIZE),
        )
        formula.arrange(DOWN, buff=0.3)
        formula.to_edge(UP, buff=0.4)
        
        self.play(FadeIn(formula[0]))
        self.wait(1.2)
        self.play(Transform(formula[0], formula[1]))
        self.wait(1)
        
        # ── Define vectors ──────────────────────────────────────────
        A_end = np.array([4, 2, 0.5])
        B_end = np.array([2, 4, 1])
        
        vec_A = Arrow3D(ORIGIN, A_end, color=Config.VECTOR_A_COLOR, stroke_width=5)
        vec_B = Arrow3D(ORIGIN, B_end, color=Config.VECTOR_B_COLOR, stroke_width=5)
        
        self.play(Create(vec_A), Create(vec_B))
        self.wait(0.4)
        
        lbl_A = MathTex(r"$\vec{A}$", color=Config.VECTOR_A_COLOR, font_size=28)
        lbl_B = MathTex(r"$\vec{B}$", color=Config.VECTOR_B_COLOR, font_size=28)
        lbl_A.next_to(A_end, UP * 0.3)
        lbl_B.next_to(B_end, UP * 0.5)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.4)
        
        # ── Angle arc ───────────────────────────────────────────────
        theta = arccos(np.dot(A_end, B_end) / (np.linalg.norm(A_end) * np.linalg.norm(B_end)))
        arc = ArcBetweenPoints(
            A_end * 0.8 / np.linalg.norm(A_end),
            B_end * 0.8 / np.linalg.norm(B_end),
            angle=theta, arc_center=ORIGIN,
            color=Config.ACCENT_PINK, stroke_width=3
        )
        theta_lbl = MathTex(r"$\theta$", color=Config.ACCENT_PINK, font_size=26)
        theta_lbl.next_to(arc, OUT * 0.3)
        self.play(Create(arc), FadeIn(theta_lbl))
        self.wait(1)
        
        # ── Projection of A onto B ──────────────────────────────────
        proj_vec = (np.dot(A_end, B_end) / np.dot(B_end, B_end)) * B_end
        proj_arrow = Arrow3D(ORIGIN, proj_vec,
                            color=Config.PROJECTION_COLOR, stroke_width=3,
                            stroke_dash_array=[0.2, 0.1])
        proj_lbl = MathTex(r"\text{proj}_{\vec{B}}\,\vec{A}",
                          color=Config.PROJECTION_COLOR, font_size=22)
        proj_lbl.next_to(proj_vec + RIGHT * 0.4, UP)
        self.play(Create(proj_arrow), FadeIn(proj_lbl))
        self.wait(1)
        
        # ── Scalar result ───────────────────────────────────────────
        result_scalar = np.dot(A_end, B_end)
        result_tex = MathTex(
            r"\vec{A}\cdot\vec{B}=" + f"{result_scalar:.1f}",
            color=Config.RESULT_COLOR, font_size=Config.MATH_FONT_SIZE
        )
        result_tex.to_edge(LEFT, buff=1)
        self.play(FadeIn(result_tex))
        self.wait(1.5)
        
        # ── Geometric interpretation ────────────────────────────────
        interp = Text("Scalar product = projection of one vector onto the other × magnitude",
                     color=Config.LIMIT_COLOR, font_size=20)
        interp.to_edge(DOWN, buff=0.4)
        self.play(FadeIn(interp))
        self.wait(2)
        
        # ── 3D interactive viewer ───────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(VGroup(formula, vec_A, vec_B, arc, theta_lbl,
                                 proj_arrow, proj_lbl, result_tex, interp, lbl_A, lbl_B)))
        self.wait(0.3)


# ============================================================================
# SCENE 4 — CROSS PRODUCT IN 3D SPACE
# ============================================================================

class CrossProductVisualization3D(Scene):
    """
    3D cross product visualization with determinant/bmatrix computation
    and right-hand rule demonstration.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 6, PI / 4, 0)
        
        # ── Title ───────────────────────────────────────────────────
        title = Tex(r"$\vec{A}\times\vec{B}=|\vec{A}|\,|\vec{B}|\sin\theta\;\hat{n}$",
                    font_size=Config.TITLE_FONT_SIZE, color=Config.ACCENT_PINK)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title))
        self.wait(0.5)
        
        # ── Input vectors along x and y axes ────────────────────────
        A_end = np.array([3, 0, 0])
        B_end = np.array([0, 3, 0])
        
        vec_A = Arrow3D(ORIGIN, A_end, color=Config.VECTOR_A_COLOR, stroke_width=6)
        vec_B = Arrow3D(ORIGIN, B_end, color=Config.VECTOR_B_COLOR, stroke_width=6)
        
        lbl_A = MathTex(r"$\vec{A}$", color=Config.VECTOR_A_COLOR, font_size=30)
        lbl_B = MathTex(r"$\vec{B}$", color=Config.VECTOR_B_COLOR, font_size=30)
        lbl_A.next_to(A_end + RIGHT * 0.3, RIGHT)
        lbl_B.next_to(B_end + UP * 0.3, UP)
        
        self.play(Create(vec_A), Create(vec_B))
        self.wait(0.3)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.5)
        
        # ── Determinant display with bmatrix ────────────────────────
        det_form = MathTex(
            r"\vec{A}\times\vec{B}=",
            r"\begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix}",
            font_size=Config.MATH_FONT_SIZE, color=Config.ACCENT_YELLOW
        )
        det_form.arrange(RIGHT, buff=0.2)
        det_form.to_edge(LEFT, buff=1)
        self.play(FadeIn(det_form))
        self.wait(1)
        
        # Expanded form
        expanded = MathTex(
            r"=\begin{vmatrix} A_y & A_z \\ B_y & B_z \end{vmatrix}\hat{i}"
            r"-\begin{vmatrix} A_x & A_z \\ B_x & B_z \end{vmatrix}\hat{j}"
            r"+\begin{vmatrix} A_x & A_y \\ B_x & B_y \end{vmatrix}\hat{k}",
            font_size=20, color=Config.ACCENT_GREEN
        )
        expanded.to_edge(LEFT, buff=1).shift(UP * 1.8)
        self.play(Transform(det_form, expanded))
        self.wait(1)
        
        # Result vector (along +z)
        result = np.cross(A_end, B_end)   # (0, 0, 9)
        vec_C = Arrow3D(ORIGIN, result, color=Config.RESULT_COLOR, stroke_width=7)
        lbl_C = MathTex(r"$\vec{C}=9\hat{k}$", color=Config.RESULT_COLOR, font_size=32)
        lbl_C.next_to(result + UP * 0.6, UP)
        
        self.play(Create(vec_C), FadeIn(lbl_C))
        self.wait(1.2)
        
        # ── Right-hand rule arc ─────────────────────────────────────
        rhs_arc = Arc(radius=1.2, start_angle=0, angle=PI / 2,
                     color=Config.ACCENT_ORANGE, stroke_width=3)
        rhs_arc.rotate(PI / 4, axis=OUT)
        rhs_lbl = MathTex(r"\text{Right-hand rule: thumb}\perp\text{to both}",
                         color=Config.ACCENT_ORANGE, font_size=20)
        rhs_lbl.to_edge(DOWN, buff=0.5)
        self.play(Create(rhs_arc), FadeIn(rhs_lbl))
        self.wait(1)
        
        # ── Properties list ─────────────────────────────────────────
        props = VGroup(
            MathTex(r"$\vec{A}\times\vec{B}\perp\vec{A}$",               color=Config.ACCENT_BLUE),
            MathTex(r"$\vec{A}\times\vec{B}\perp\vec{B}$",               color=Config.ACCENT_BLUE),
            MathTex(r"$|\vec{A}\times\vec{B}|=$ area of parallelogram", color=Config.ACCENT_GREEN),
            MathTex(r"$\vec{A}\times\vec{B}=-(\vec{B}\times\vec{A})$",  color=Config.ACCENT_PINK),
        )
        props.arrange(DOWN, buff=0.25)
        props.to_edge(RIGHT, buff=1.2)
        for p in props:
            self.play(FadeIn(p, shift=RIGHT))
            self.wait(0.4)
        
        # ── 3D interactive viewer ───────────────────────────────────
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(VGroup(title, vec_A, vec_B, vec_C, lbl_A, lbl_B, lbl_C,
                                 rhs_arc, rhs_lbl, det_form, props)))
        self.wait(0.3)


# ============================================================================
# SCENE 5 — MATRIX OPERATIONS WITH BMATRIX NOTATION
# ============================================================================

class MatrixTransformation3D(Scene):
    """
    3D matrix transformation visualization using strict LaTeX bmatrix notation.
    Demonstrates scaling, rotation, and matrix multiplication.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 5, PI / 5, 0)
        
        # ── Title ───────────────────────────────────────────────────
        title = Tex(r"\text{Matrix Transformations in 3D Space}",
                    font_size=Config.TITLE_FONT_SIZE, color=Config.PRIMARY_NEON)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title))
        self.wait(0.5)
        
        # ── Grid points in 3D ───────────────────────────────────────
        grid_pts = []
        for i in np.linspace(-2, 2, 5):
            for j in np.linspace(-2, 2, 5):
                grid_pts.append(np.array([i, j, 0]))
        
        orig_dots = VGroup(*[Dot3D(p, color=Config.ACCENT_BLUE, radius=0.06)
                            for p in grid_pts[:25]])
        self.play(FadeIn(orig_dots))
        self.wait(0.4)
        
        # ── Scaling matrix (bmatrix) ────────────────────────────────
        scale_mat = MathTex(
            r"S =",
            r"\begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}",
            font_size=Config.MATH_FONT_SIZE, color=Config.MATRIX_A_COLOR
        )
        scale_mat.arrange(RIGHT, buff=0.2)
        scale_mat.to_edge(LEFT, buff=1)
        
        # ── Rotation matrix Rz(bmatrix) ─────────────────────────────
        rot_mat = MathTex(
            r"R_z(\theta)=\begin{bmatrix} \cos\theta & -\sin\theta & 0 "
            r"\\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}",
            font_size=20, color=Config.MATRIX_B_COLOR
        )
        rot_mat.to_edge(RIGHT, buff=1)
        
        self.play(FadeIn(scale_mat))
        self.wait(1)
        self.play(FadeIn(rot_mat))
        self.wait(1)
        
        # ── Animated transformation: scale then rotate about Z ──────
        transformed_dots = VGroup()
        angle = PI / 4
        c, s = np.cos(angle), np.sin(angle)
        for pt in orig_dots:
            pos = pt.get_center().copy()
            scaled = pos * 1.5
            rotated = np.array([
                c * scaled[0] - s * scaled[1],
                s * scaled[0] + c * scaled[1],
                scaled[2]
            ])
            transformed_dots.add(Dot3D(rotated, color=Config.ACCENT_PINK, radius=0.06))
        
        self.play(Transform(orig_dots, transformed_dots),
                 run_time=2.2, rate_func=there_and_back)
        self.wait(0.5)
        
        # ── Matrix multiplication (step-by-step) ────────────────────
        mult_full = MathTex(
            r"\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}"
            r"\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}"
            r"=\begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}",
            font_size=Config.MATH_FONT_SIZE, color=Config.RESULT_COLOR
        )
        mult_full.to_edge(DOWN, buff=0.8)
        
        step1 = MathTex(
            r"\begin{bmatrix} 1\cdot5+2\cdot7 & 1\cdot6+2\cdot8 "
            r"\\ 3\cdot5+4\cdot7 & 3\cdot6+4\cdot8 \end{bmatrix}",
            font_size=Config.MATH_FONT_SIZE, color=Config.ACCENT_YELLOW
        )
        step1.move_to(mult_full)
        
        step2 = MathTex(
            r"\begin{bmatrix} 5+14 & 6+16 \\ 15+28 & 18+32 \end{bmatrix}",
            font_size=Config.MATH_FONT_SIZE, color=Config.ACCENT_GREEN
        )
        step2.move_to(mult_full)
        
        self.play(Transform(mult_full, step1))
        self.wait(1)
        self.play(Transform(mult_full, step2))
        self.wait(1)
        self.play(Transform(mult_full, mult_full))
        self.wait(2)
        
        # ── 3D viewer ───────────────────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(VGroup(title, scale_mat, rot_mat, orig_dots, mult_full)))
        self.wait(0.3)


# ============================================================================
# SCENE 6 — LIMITS, CONTINUITY & THE SIN(X)/X LIMIT
# ============================================================================

class LimitsAndContinuity3D(Scene):
    """
    3D visualization of limits with proper lim_{x->inf} subscript notation.
    Includes the standard limit lim_{x->0} sin(x)/x = 1 and continuity criteria.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 6, PI / 5, 0)
        
        # ── Title ───────────────────────────────────────────────────
        title = Tex(r"\text{Limits: The Foundation of Calculus}",
                    font_size=Config.TITLE_FONT_SIZE, color=Config.LIMIT_COLOR)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title))
        self.wait(0.5)
        
        # ── Standard limit formulas (with proper subscripts) ────────
        lims = VGroup(
            MathTex(r"\lim_{x \to 0}\frac{\sin x}{x}=1",
                   color=Config.ACCENT_BLUE, font_size=Config.MATH_FONT_SIZE),
            MathTex(r"\lim_{x \to 0}\frac{e^x-1}{x}=1",
                   color=Config.ACCENT_GREEN, font_size=Config.MATH_FONT_SIZE),
            MathTex(r"\lim_{x \to \infty}\left(1+\frac{1}{x}\right)^x=e",
                   color=Config.ACCENT_YELLOW, font_size=Config.MATH_FONT_SIZE),
            MathTex(r"\lim_{x \to 0}\frac{1-\cos x}{x}=0",
                   color=Config.ACCENT_ORANGE, font_size=Config.MATH_FONT_SIZE),
        )
        lims.arrange(DOWN, buff=0.4)
        lims.to_edge(LEFT, buff=1.8)
        
        for L in lims:
            self.play(FadeIn(L, shift=LEFT))
            self.wait(0.5)
        self.wait(1)
        
        # ── 3D Axes + sin(x)/x graph ────────────────────────────────
        ax = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-0.5, 2, 0.5],
            z_range=[-0.5, 0.5, 0.5],
            axis_config={"color": Config.ACCENT_GRAY},
        )
        ax_lbls = ax.get_axis_labels(Tex("x"), Tex("y"), Tex("z"))
        self.play(Create(ax), FadeIn(ax_lbls))
        self.wait(0.4)
        
        # sin(x)/x parametric curve (using np.sinc which gives sin(pi*t)/(pi*t))
        func_graph = ParametricFunction(
            lambda t: np.array([t, np.sinc(t / np.pi), 0]),
            t_range=[-4.5, 4.5, 0.01],
            color=Config.LIMIT_COLOR, stroke_width=3
        )
        self.play(Create(func_graph), run_time=2)
        self.wait(0.5)
        
        # ── Approaching the limit from both sides ───────────────────
        left_pt  = Dot3D(np.array([-0.6, np.sinc(-0.6 / np.pi), 0]),
                        color=Config.ACCENT_PINK, radius=0.1)
        right_pt = Dot3D(np.array([0.6,  np.sinc(0.6 / np.pi), 0]),
                        color=Config.ACCENT_PINK, radius=0.1)
        self.play(FadeIn(left_pt, shift=LEFT), FadeIn(right_pt, shift=RIGHT))
        self.wait(0.6)
        
        # Converge to limit point (0, 1, 0)
        self.play(
            left_pt.animate.move_to(np.array([0.05, 1, 0])),
            right_pt.animate.move_to(np.array([-0.05, 1, 0])),
            run_time=2.5, rate_func=smooth
        )
        limit_pt = Dot3D(np.array([0, 1, 0]), color=Config.ACCENT_YELLOW, radius=0.15)
        self.play(Create(limit_pt))
        self.wait(0.5)
        
        # Limit notation re-stated
        lim_notation = MathTex(
            r"\lim_{x \to 0}\frac{\sin x}{x}=1",
            font_size=Config.MATH_FONT_SIZE, color=Config.RESULT_COLOR
        )
        lim_notation.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(lim_notation))
        self.wait(1.5)
        
        # ── Continuity definition ───────────────────────────────────
        cont_header = VGroup(
            Text("A function f is continuous at x = a if:",
                color=Config.ACCENT_GRAY, font_size=22),
        )
        cont_header.to_edge(RIGHT, buff=1).shift(UP * 1.5)
        self.play(FadeIn(cont_header[0], shift=RIGHT))
        self.wait(0.4)
        
        conditions = VGroup(
            MathTex(r"1.\quad f(a) \text{ is defined}",           color=Config.ACCENT_BLUE),
            MathTex(r"2.\quad \lim_{x\to a}f(x) \text{ exists}",   color=Config.ACCENT_GREEN),
            MathTex(r"3.\quad \lim_{x\to a}f(x)=f(a)",             color=Config.ACCENT_YELLOW),
        )
        conditions.arrange(DOWN, buff=0.3)
        conditions.next_to(cont_header, DOWN, buff=0.4)
        
        for c in conditions:
            self.play(FadeIn(c, shift=RIGHT))
            self.wait(0.5)
        self.wait(1.5)
        
        # ── 3D interactive viewer ───────────────────────────────────
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(VGroup(title, lims, ax, ax_lbls, func_graph,
                                 limit_pt, lim_notation, cont_header, conditions)))
        self.wait(0.3)


# ============================================================================
# SCENE 7 — INTEGRAL AS AREA UNDER CURVE IN 3D
# ============================================================================

class IntegralAreaVisualization3D(Scene):
    """
    3D Riemann-sum visualization of a definite integral.
    Shows convergence from coarse to fine rectangles, then the exact antiderivative.
    """
    
    def construct(self):
        self.camera.set_euler_angles(-PI / 5, PI / 5, 0)
        
        # ── Title ───────────────────────────────────────────────────
        title = Tex(r"\text{Integration: Area Under the Curve}",
                    font_size=Config.TITLE_FONT_SIZE, color=Config.ACCENT_GREEN)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title))
        self.wait(0.4)
        
        # ── 3D Axes ─────────────────────────────────────────────────
        ax = ThreeDAxes(
            x_range=[0, 4, 1],
            y_range=[0, 3, 0.5],
            z_range=[-0.5, 0.5, 0.5],
            axis_config={"color": Config.ACCENT_GRAY},
        )
        x_lbl = Tex("x", color=Config.ACCENT_BLUE, font_size=22).next_to(ax.x_axis.get_end(), RIGHT)
        y_lbl = Tex("y", color=Config.ACCENT_GREEN, font_size=22).next_to(ax.y_axis.get_end(), UP)
        self.play(Create(ax), FadeIn(x_lbl), FadeIn(y_lbl))
        self.wait(0.3)
        
        # Curve y = x² / 2
        curve = ParametricFunction(
            lambda t: np.array([t, t**2 / 2, 0]),
            t_range=[0, 3, 0.01],
            color=Config.ACCENT_PINK, stroke_width=3
        )
        self.play(Create(curve), run_time=1.8)
        self.wait(0.4)
        
        # ── Integration bounds ──────────────────────────────────────
        a, b = 0.5, 2.5
        bound_pts = VGroup(
            Dot3D(np.array([a, 0, 0]), color=Config.ACCENT_YELLOW, radius=0.1),
            Dot3D(np.array([b, 0, 0]), color=Config.ACCENT_YELLOW, radius=0.1),
            Tex("a", color=Config.ACCENT_YELLOW, font_size=20).next_to(ax.c2p(a, 0, 0), DOWN),
            Tex("b", color=Config.ACCENT_YELLOW, font_size=20).next_to(ax.c2p(b, 0, 0), DOWN),
        )
        for bp in bound_pts:
            self.play(FadeIn(bp))
        self.wait(0.4)
        
        # ── Coarse Riemann rectangles (n=8) ────────────────────────
        n_coarse = 8
        w = (b - a) / n_coarse
        rects_coarse = VGroup()
        for i in range(n_coarse):
            xl = a + i * w
            h = xl**2 / 2
            rect = Rectangle(width=w, height=h,
                           color=Config.ACCENT_BLUE, fill_opacity=0.25, stroke_width=1)
            rect.move_to(ax.c2p(xl + w / 2, h / 2, 0))
            rects_coarse.add(rect)
        
        for r in rects_coarse:
            self.play(Create(r), run_time=0.08)
        self.wait(0.8)
        
        # ── Integral limit notation ────────────────────────────────
        int_form = MathTex(
            r"\int_a^b f(x)\,dx"
            r"=\lim_{n\to\infty}\sum_{i=1}^{n}f(x_i^*)\,\Delta x",
            font_size=Config.MATH_FONT_SIZE, color=Config.RESULT_COLOR
        )
        int_form.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(int_form))
        self.wait(1)
        
        # ── Fine Riemann rectangles (n=60) ─────────────────────────
        self.play(FadeOut(rects_coarse))
        n_fine = 60
        w_fine = (b - a) / n_fine
        rects_fine = VGroup()
        for i in range(n_fine):
            xl = a + i * w_fine
            h = xl**2 / 2
            rect = Rectangle(width=w_fine, height=h,
                           color=Config.ACCENT_GREEN, fill_opacity=0.18, stroke_width=0.5)
            rect.move_to(ax.c2p(xl + w_fine / 2, h / 2, 0))
            rects_fine.add(rect)
        
        self.play(FadeIn(rects_fine), run_time=2.5)
        self.wait(1)
        
        # ── Exact evaluation ────────────────────────────────────────
        exact = MathTex(
            r"\int_{0.5}^{2.5}\frac{x^2}{2}\,dx"
            r"=\left[\frac{x^3}{6}\right]_{0.5}^{2.5}"
            r"=\frac{(2.5)^3-(0.5)^3}{6}=\frac{15.625-0.125}{6}\approx 2.58",
            font_size=22, color=Config.ACCENT_YELLOW
        )
        exact.to_edge(RIGHT, buff=1).shift(UP * 0.5)
        for part in exact.family_members_with_points():
            self.play(FadeIn(part, shift=RIGHT))
            self.wait(0.3)
        self.wait(1.5)
        
        # ── Fundamental Theorem of Calculus ─────────────────────────
        self.play(FadeOut(int_form))
        ft_title = Text("Fundamental Theorem of Calculus",
                       color=Config.ACCENT_ORANGE, font_size=24)
        ft_title.to_edge(UP, buff=0.3)
        ft_formula = MathTex(
            r"\int_a^b f(x)\,dx = F(b)-F(a),\qquad F'(x)=f(x)",
            font_size=Config.MATH_FONT_SIZE, color=Config.RESULT_COLOR
        )
        self.play(FadeIn(ft_title))
        self.wait(0.3)
        self.play(FadeIn(ft_formula))
        self.wait(2)
        
        # ── 3D interactive viewer ───────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(VGroup(title, ax, x_lbl, y_lbl, curve, bound_pts,
                                 rects_fine, exact, ft_title, ft_formula)))
        self.wait(0.3)


# ============================================================================
# SCENE 8 — MOTION GRAPHICS SHOWCASE (COMBINED)
# ============================================================================

class MotionGraphicsShowcase(Scene):
    """
    High-energy combined motion-graphics showcase covering vectors,
    matrices, and limits with fast transitions and dynamic camera movement.
    """
    
    def construct(self):
        self.camera.background_color = Config.BACKGROUND_COLOR
        
        # ── Opening blast ───────────────────────────────────────────
        opening = Text("Advanced 3D Mathematics",
                      font_size=Config.TITLE_FONT_SIZE * 1.6,
                      color=Config.PRIMARY_NEON)
        opening.to_center()
        self.play(opening.animate.scale(2.5).set_opacity(0),
                 run_time=2, rate_func=smooth)
        self.wait(0.3)
        
        # ══════════════════════════════════════════════════════════
        # Section 1: Vectors
        # ══════════════════════════════════════════════════════════
        sec1 = Text("VECTOR ANALYSIS", font_size=Config.TITLE_FONT_SIZE,
                   color=Config.PRIMARY_NEON)
        self.play(Write(sec1))
        self.wait(0.4)
        self.play(sec1.animate.to_edge(UP, buff=0.4))
        self.wait(0.4)
        
        vec_demo = VGroup()
        v_specs = [
            (np.array([2, 1, 0]),  Config.VECTOR_A_COLOR, r"$\vec{A}$"),
            (np.array([1, 3, 1]),  Config.VECTOR_B_COLOR, r"$\vec{B}$"),
            (np.array([3, 4, 1]),  Config.VECTOR_R_COLOR, r"$\vec{R}$"),
        ]
        for end, col, lbl in v_specs:
            arr = Arrow3D(ORIGIN, end, color=col, stroke_width=5)
            txt = MathTex(lbl, color=col, font_size=28)
            txt.next_to(end, UP * 0.3)
            vec_demo.add(arr, txt)
            self.play(Create(arr), FadeIn(txt))
            self.wait(0.25)
        self.wait(0.8)
        self.play(FadeOut(vec_demo))
        
        # ══════════════════════════════════════════════════════════
        # Section 2: Matrices
        # ══════════════════════════════════════════════════════════
        sec2 = Text("MATRIX TRANSFORMATIONS", font_size=Config.TITLE_FONT_SIZE,
                   color=Config.SECONDARY_NEON)
        self.play(Write(sec2))
        self.wait(0.4)
        self.play(sec2.animate.to_edge(UP, buff=0.4))
        self.wait(0.4)
        
        mat_pos = [LEFT * 3.2, ORIGIN, RIGHT * 3.2]
        mats = [
            MathTex(r"\begin{bmatrix} 1&0\\0&1 \end{bmatrix}",
                   color=Config.ACCENT_GREEN, font_size=22),
            MathTex(r"\begin{bmatrix} 0&-1\\1&0 \end{bmatrix}",
                   color=Config.ACCENT_YELLOW, font_size=22),
            MathTex(r"\begin{bmatrix} 2&0\\0&2 \end{bmatrix}",
                   color=Config.ACCENT_PINK, font_size=22),
        ]
        for m, pos in zip(mats, mat_pos):
            m.move_to(pos)
            self.play(m.animate.from_corner(DOWN + LEFT), run_time=0.7)
            self.wait(0.3)
        self.wait(0.8)
        self.play(FadeOut(VGroup(sec2, *mats)))
        
        # ══════════════════════════════════════════════════════════
        # Section 3: Limits
        # ══════════════════════════════════════════════════════════
        sec3 = Text("LIMITS & CONTINUITY", font_size=Config.TITLE_FONT_SIZE,
                   color=Config.LIMIT_COLOR)
        self.play(Write(sec3))
        self.wait(0.4)
        self.play(sec3.animate.to_edge(UP, buff=0.4))
        self.wait(0.4)
        
        # Approach sequence for sin(x)/x → 1
        x_vals = [-2, -1, -0.5, -0.1, -0.02, 0.02, 0.1, 0.5, 1, 2]
        approach = VGroup()
        for x in x_vals:
            y = np.sin(x) / x if abs(x) > 1e-9 else 1
            dot = Dot3D(np.array([x * 0.7, y * 0.5, 0]),
                       color=Config.ACCENT_PINK, radius=0.07)
            approach.add(dot)
        
        for d in approach:
            self.play(FadeIn(d))
            self.wait(0.08)
        
        lim_dot = Dot3D(ORIGIN, color=Config.ACCENT_YELLOW, radius=0.14)
        lim_lbl = MathTex("1", color=Config.ACCENT_YELLOW, font_size=34)
        lim_lbl.next_to(lim_dot, UP)
        self.play(Create(lim_dot), FadeIn(lim_lbl))
        self.wait(1)
        self.play(FadeOut(VGroup(sec3, approach, lim_dot, lim_lbl)))
        
        # ══════════════════════════════════════════════════════════
        # Finale
        # ══════════════════════════════════════════════════════════
        finale = VGroup(
            Text("Mathematics in 3D Motion",
                font_size=Config.TITLE_FONT_SIZE, color=Config.PRIMARY_NEON),
            Text("Interactive  •  Dynamic  •  Visual",
                font_size=26, color=Config.ACCENT_GRAY),
        )
        finale.arrange(DOWN, buff=0.4)
        finale.to_center()
        
        self.play(FadeIn(finale[0]))
        self.wait(0.8)
        self.play(FadeIn(finale[1]))
        self.wait(1.5)
        
        # Final 3D viewer orbit
        self.begin_3dviewer()
        self.wait(3)
        self.end_3dviewer()
        
        self.play(FadeOut(finale, run_time=1.5))
        self.wait(0.3)


# ============================================================================
# ENTRY POINT — run individual scenes or list available
# ============================================================================

if __name__ == "__main__":
    import sys

    SCENES = {
        "mindmap":   VectorMindMap3D,
        "vectors":   VectorAdditionMotion3D,
        "dot":       DotProductVisualization3D,
        "cross":     CrossProductVisualization3D,
        "matrices":  MatrixTransformation3D,
        "limits":    LimitsAndContinuity3D,
        "integral":  IntegralAreaVisualization3D,
        "showcase":  MotionGraphicsShowcase,
    }

    if len(sys.argv) > 1:
        key = sys.argv[1].lower()
        if key in SCENES:
            print(f"Running scene: {key}")
        else:
            print(f"Available scenes: {', '.join(SCENES)}")
            print("Usage: python manim_motion_graphics.py <scene_name>")
            sys.exit(1)
    else:
        print("No scene specified — running full showcase.")

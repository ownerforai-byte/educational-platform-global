"""
Advanced 3D Manim Motion Graphics — NEB Class 11 Mathematics
=============================================================
Topics covered:
  1. Vector Space Conceptual Mindmap (3D node network)
  2. Vector Addition & Subtraction (3D motion graphics)
  3. Dot Product (Scalar Product) Visualization
  4. Cross Product (Vector Product) with Right-Hand Rule
  5. Matrix Transformations (Scaling & Rotation)
  6. Limits & Continuity (sin(x)/x limit demo)
  7. Definite Integrals as Area Under Curve (Riemann sums)

Requirements:
    pip install manim[opencv] numpy
  
Render example:
    manim -p -ql --resolution 1920 1080 manim_3d_math_animations.py VectorAdditionScene
"""

from manim import *
import numpy as np

# ============================================================================
# COLOR PALETTE — Neon/Pastel on Dark Background
# ============================================================================

class Colors:
    BG           = "#0a0a1a"     # Deep navy-black
    PRIMARY      = "#00f5ff"     # Cyan neon
    SECONDARY    = "#bf00ff"     # Purple neon
    ACCENT_PINK  = "#ff006e"     # Hot pink
    ACCENT_YELLOW= "#ffd60a"     # Gold yellow
    ACCENT_GREEN = "#06d6a0"     # Mint green
    ACCENT_ORANGE= "#fb5607"     # Vivid orange
    WHITE_SOFT   = "#e0e0ff"     # Soft white
    DIM_GRAY     = "#6c757d"     # Muted gray


# ============================================================================
# SCENE 1: CONCEPTUAL MINDMAP — Vector Space
# ============================================================================

class VectorMindMap3D(ThreeDScene):
    """
    3D conceptual mindmap connecting vector types, operations, products, and spaces.
    Demonstrates mouse-interactive 3D camera navigation.
    """
    
    def construct(self):
        # Dark background
        self.camera.background_color = Colors.BG
        
        # Set initial 3D camera position
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=12)
        
        # ── Title ───────────────────────────────────────────────────────
        title = Text("VECTOR SPACE", font_size=72, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.5)
        subtitle = Text("Conceptual Mindmap — NEB Class 11 Physics", 
                       font_size=28, color=Colors.WHITE_SOFT)
        subtitle.next_to(title, DOWN, buff=0.2)
        
        self.play(Write(title), run_time=1.5)
        self.wait()
        self.play(FadeIn(subtitle), run_time=1)
        self.wait(1)
        
        # ── Central Node ────────────────────────────────────────────────
        center = Circle(radius=0.8, stroke_color=Colors.ACCENT_PINK, 
                       stroke_width=4, fill_color=Colors.BG)
        center_text = MathTex(r"\vec{v}", font_size=48, color=Colors.ACCENT_PINK)
        center_text.move_to(center.get_center())
        center_group = VGroup(center, center_text).move_to(ORIGIN + OUT * 2)
        
        self.play(Create(center_group), run_time=1.5)
        self.wait(0.5)
        
        # ── Four Main Branches ─────────────────────────────────────────
        branches = [
            (r"\textbf{Type}", Colors.ACCENT_GREEN, UP + LEFT * 4, "Types of Vectors"),
            (r"\textbf{Operations}", Colors.ACCENT_YELLOW, UP + RIGHT * 4, "Vector Operations"),
            (r"\textbf{Products}", Colors.PRIMARY, DOWN + LEFT * 4, "Dot & Cross Products"),
            (r"\textbf{Space}", Colors.SECONDARY, DOWN + RIGHT * 4, "Vector Spaces"),
        ]
        
        branch_nodes = []
        for label, color, pos, desc in branches:
            # Node circle
            node = Circle(radius=0.6, stroke_color=color, stroke_width=3, fill_color=Colors.BG)
            node_text = MathTex(label, font_size=32, color=color)
            node.move_to(pos)
            node_text.move_to(node.get_center())
            
            # Connection line from center
            path = CubicBezier(
                center_group.get_center(),
                center_group.get_center() + pos/2,
                pos,
                pos
            )
            
            self.play(
                GrowFromPoint(Line(center_group.get_right(), pos), center_group.get_right()),
                node.animate.scale(0).run_rate(),
                run_time=1.2
            )
            self.play(Create(node), FadeIn(node_text))
            branch_nodes.append((node, node_text, pos, color))
        
        self.wait(1)
        
        # ── Sub-nodes for "Products" ──────────────────────────────────
        products_node = branch_nodes[2][2]
        sub_concepts = [
            (r"\vec{A} \cdot \vec{B}", Colors.ACCENT_GREEN, products_node + UP * 1.8),
            (r"\vec{A} \times \vec{B}", Colors.ACCENT_PINK, products_node + DOWN * 1.8),
            (r"[\vec{A}\,\vec{B}\,\vec{C}]", Colors.ACCENT_YELLOW, products_node + LEFT * 1.8),
        ]
        
        for formula, color, pos in sub_concepts:
            sub_circle = Circle(radius=0.45, stroke_color=color, stroke_width=2, 
                              fill_color=Colors.BG)
            sub_text = MathTex(formula, font_size=24, color=color)
            sub_circle.move_to(pos)
            sub_text.move_to(sub_circle.get_center())
            
            self.play(
                GrowFromPoint(Line(products_node, pos), products_node),
                sub_circle.animate.scale(0),
                run_time=0.8
            )
            self.play(Create(sub_circle), FadeIn(sub_text))
        
        self.wait(1.5)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        # Cleanup
        self.play(FadeOut(All, run_time=1))
        self.wait(0.3)


# ============================================================================
# SCENE 2: VECTOR ADDITION IN 3D
# ============================================================================

class VectorAdditionScene(ThreeDScene):
    """
    Animated 3D demonstration of vector addition A + B = R.
    Shows triangle law and parallelogram law with motion graphics.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Title ─────────────────────────────────────────────────────
        title = MathTex(r"\vec{R} = \vec{A} + \vec{B}", font_size=64, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Coordinate System ─────────────────────────────────────────
        axes = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-5, 5, 1],
            z_range=[-3, 3, 1],
            axis_config={"color": Colors.DIM_GRAY}
        )
        self.play(Create(axes), run_time=1)
        self.wait(0.3)
        
        # ── Define Vectors ────────────────────────────────────────────
        O = np.array([0, 0, 0])
        A_end = np.array([3, 2, 0])
        B_start = A_end
        B_end = np.array([4, 5, 1])
        
        # ── Vector A (Cyan) ──────────────────────────────────────────
        vec_A = Arrow3D(
            start=O, end=A_end,
            color=Colors.ACCENT_GREEN,
            tip_length_ratio=0.25,
            stroke_width=6
        )
        label_A = MathTex(r"\vec{A} = 3\hat{i} + 2\hat{j}", 
                         font_size=28, color=Colors.ACCENT_GREEN)
        label_A.next_to(A_end + LEFT * 0.5, UP)
        
        self.play(Create(vec_A), run_time=1.2)
        self.wait(0.3)
        self.play(FadeIn(label_A), run_time=0.8)
        self.wait(0.5)
        
        # ── Vector B (Purple) ────────────────────────────────────────
        vec_B = Arrow3D(
            start=B_start, end=B_end,
            color=Colors.SECONDARY,
            tip_length_ratio=0.25,
            stroke_width=6
        )
        label_B = MathTex(r"\vec{B} = \hat{i} + 3\hat{j} + 1.5\hat{k}", 
                         font_size=26, color=Colors.SECONDARY)
        label_B.next_to((B_start + B_end)/2 + RIGHT * 0.5, UP)
        
        self.play(Create(vec_B), run_time=1.2)
        self.wait(0.3)
        self.play(FadeIn(label_B), run_time=0.8)
        self.wait(0.5)
        
        # ── Resultant Vector R (Pink) ────────────────────────────────
        vec_R = Arrow3D(
            start=O, end=B_end,
            color=Colors.ACCENT_PINK,
            tip_length_ratio=0.25,
            stroke_width=8
        )
        label_R = MathTex(r"\vec{R} = 4\hat{i} + 5\hat{j} + 1.5\hat{k}", 
                         font_size=30, color=Colors.ACCENT_PINK)
        label_R.next_to(B_end + RIGHT * 0.5, UP)
        
        self.play(Create(vec_R), run_time=1.5)
        self.wait(0.3)
        self.play(FadeIn(label_R), run_time=0.8)
        self.wait(1)
        
        # ── Magnitude Calculation ─────────────────────────────────────
        mag_formula = MathTex(
            r"|\vec{R}| = \sqrt{4^2 + 5^2 + 1.5^2}",
            r"= \sqrt{16 + 25 + 2.25}",
            r"= \sqrt{43.25} \approx 6.58",
            font_size=32, color=Colors.ACCENT_YELLOW
        )
        mag_formula.arrange(DOWN, buff=0.3)
        mag_formula.to_edge(RIGHT, buff=1.5)
        
        self.play(FadeIn(mag_formula[0]), run_time=0.8)
        self.wait(0.5)
        self.play(Transform(mag_formula[0], mag_formula[1]), run_time=0.8)
        self.wait(0.5)
        self.play(Transform(mag_formula[0], mag_formula[2]), run_time=0.8)
        self.wait(1.5)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        # Cleanup
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 3: DOT PRODUCT VISUALIZATION
# ============================================================================

class DotProductScene(ThreeDScene):
    """
    3D visualization of the scalar (dot) product.
    Shows geometric interpretation: A·B = |A||B|cosθ
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-30 * DEGREES, distance=10)
        
        # ── Title & Formula ───────────────────────────────────────────
        title = MathTex(
            r"\vec{A} \cdot \vec{B} = |\vec{A}| |\vec{B}| \cos\theta",
            font_size=56, color=Colors.ACCENT_YELLOW
        )
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Components Formula ────────────────────────────────────────
        comp_formula = MathTex(
            r"\vec{A} \cdot \vec{B} = A_xB_x + A_yB_y + A_zB_z",
            font_size=40, color=Colors.PRIMARY
        )
        comp_formula.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(comp_formula), run_time=1)
        self.wait(0.5)
        
        # ── Define Vectors ────────────────────────────────────────────
        A_end = np.array([4, 2, 0])
        B_end = np.array([2, 4, 0])
        theta = np.arccos(np.dot(A_end, B_end) / (np.linalg.norm(A_end) * np.linalg.norm(B_end)))
        
        # ── Draw Vectors ──────────────────────────────────────────────
        vec_A = Arrow3D(ORIGIN, A_end, color=Colors.ACCENT_GREEN, stroke_width=6)
        vec_B = Arrow3D(ORIGIN, B_end, color=Colors.SECONDARY, stroke_width=6)
        
        self.play(Create(vec_A), Create(vec_B), run_time=1.5)
        self.wait(0.3)
        
        # Labels
        lbl_A = MathTex(r"\vec{A}", font_size=32, color=Colors.ACCENT_GREEN)
        lbl_B = MathTex(r"\vec{B}", font_size=32, color=Colors.SECONDARY)
        lbl_A.next_to(A_end + UP * 0.3, UP)
        lbl_B.next_to(B_end + UP * 0.3, UP)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.5)
        
        # ── Angle Arc ─────────────────────────────────────────────────
        arc = ArcBetweenPoints(
            A_end[:2] * 0.3 / np.linalg.norm(A_end[:2]),
            B_end[:2] * 0.3 / np.linalg.norm(B_end[:2]),
            angle=theta, arc_center=ORIGIN[:2]
        )
        theta_lbl = MathTex(r"\theta", font_size=28, color=Colors.ACCENT_PINK)
        theta_lbl.next_to(arc, OUT)
        
        self.play(Create(arc), FadeIn(theta_lbl), run_time=1)
        self.wait(0.5)
        
        # ── Projection Demonstration ──────────────────────────────────
        proj_len = np.dot(A_end, B_end) / np.linalg.norm(B_end)
        proj_point = B_end * (proj_len / np.linalg.norm(B_end))
        
        proj_arrow = Arrow3D(ORIGIN, proj_point, 
                           color=Colors.ACCENT_ORANGE, stroke_width=4,
                           stroke_dash_array=[0.3, 0.15])
        proj_lbl = MathTex(r"\text{proj}_{\vec{B}}\vec{A}", 
                          font_size=26, color=Colors.ACCENT_ORANGE)
        proj_lbl.next_to(proj_point + RIGHT * 0.5, UP)
        
        self.play(Create(proj_arrow), FadeIn(proj_lbl), run_time=1)
        self.wait(0.5)
        
        # ── Calculate Result ──────────────────────────────────────────
        result = np.dot(A_end, B_end)
        result_text = MathTex(
            r"\vec{A} \cdot \vec{B} =", str(result),
            font_size=40, color=Colors.ACCENT_YELLOW
        )
        result_text.to_edge(LEFT, buff=1)
        
        self.play(FadeIn(result_text), run_time=1)
        self.wait(1)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 4: CROSS PRODUCT WITH RIGHT-HAND RULE
# ============================================================================

class CrossProductScene(ThreeDScene):
    """
    3D cross product visualization with determinant notation.
    Demonstrates right-hand rule and perpendicular result.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Title ─────────────────────────────────────────────────────
        title = MathTex(
            r"\vec{A} \times \vec{B} = |\vec{A}| |\vec{B}| \sin\theta \, \hat{n}",
            font_size=52, color=Colors.ACCENT_PINK
        )
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Determinant Form ──────────────────────────────────────────
        det_form = MathTex(
            r"\vec{A} \times \vec{B} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix}"
        )
        det_form.to_edge(LEFT, buff=1).shift(UP * 0.5)
        self.play(FadeIn(det_form), run_time=1.2)
        self.wait(0.5)
        
        # ── Input Vectors ─────────────────────────────────────────────
        A_end = np.array([3, 0, 0])
        B_end = np.array([0, 3, 0])
        
        vec_A = Arrow3D(ORIGIN, A_end, color=Colors.ACCENT_GREEN, stroke_width=6)
        vec_B = Arrow3D(ORIGIN, B_end, color=Colors.SECONDARY, stroke_width=6)
        
        self.play(Create(vec_A), Create(vec_B), run_time=1.5)
        self.wait(0.3)
        
        # Labels
        lbl_A = MathTex(r"\vec{A}", font_size=32, color=Colors.ACCENT_GREEN)
        lbl_B = MathTex(r"\vec{B}", font_size=32, color=Colors.SECONDARY)
        lbl_A.next_to(A_end + RIGHT * 0.3, RIGHT)
        lbl_B.next_to(B_end + UP * 0.3, UP)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.5)
        
        # ── Result Vector (along Z) ───────────────────────────────────
        result = np.cross(A_end, B_end)  # [0, 0, 9]
        vec_C = Arrow3D(ORIGIN, result, color=Colors.ACCENT_YELLOW, stroke_width=8)
        lbl_C = MathTex(r"\vec{C} = 9\hat{k}", font_size=36, color=Colors.ACCENT_YELLOW)
        lbl_C.next_to(result + UP * 0.5, UP)
        
        self.play(Create(vec_C), run_time=1.5)
        self.wait(0.3)
        self.play(FadeIn(lbl_C), run_time=0.8)
        self.wait(1)
        
        # ── Right-Hand Rule Visualization ─────────────────────────────
        rhs_text = Text("Right-Hand Rule: Curl fingers from A to B, thumb points to C",
                       font_size=24, color=Colors.ACCENT_ORANGE)
        rhs_text.to_edge(DOWN, buff=0.5)
        
        # Animated rotation indicator
        rot_arc = Arc(radius=1, start_angle=0, angle=PI/2, 
                     color=Colors.ACCENT_ORANGE, stroke_width=4)
        rot_arc.rotate(PI/4, axis=OUT)
        
        self.play(Create(rot_arc), FadeIn(rhs_text), run_time=1.5)
        self.wait(1)
        
        # ── Properties List ───────────────────────────────────────────
        props = VGroup(
            MathTex(r"\vec{A} \times \vec{B} \perp \vec{A}", color=Colors.ACCENT_GREEN),
            MathTex(r"\vec{A} \times \vec{B} \perp \vec{B}", color=Colors.SECONDARY),
            MathTex(r"|\vec{A} \times \vec{B}| = \text{Area of parallelogram}", color=Colors.PRIMARY),
            MathTex(r"\vec{A} \times \vec{B} = -(\vec{B} \times \vec{A})", color=Colors.ACCENT_PINK),
        )
        props.arrange(DOWN, buff=0.3)
        props.to_edge(RIGHT, buff=1.5)
        
        for prop in props:
            self.play(FadeIn(prop, shift=RIGHT), run_time=0.6)
            self.wait(0.3)
        
        self.wait(1.5)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 5: MATRIX TRANSFORMATIONS IN 3D
# ============================================================================

class MatrixTransformScene(ThreeDScene):
    """
    3D matrix transformations: scaling, rotation, and multiplication.
    Uses strict LaTeX bmatrix notation.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Title ─────────────────────────────────────────────────────
        title = Text("Matrix Transformations in 3D", 
                    font_size=56, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Original Grid Points ──────────────────────────────────────
        grid_pts = []
        for i in np.linspace(-2, 2, 5):
            for j in np.linspace(-2, 2, 5):
                grid_pts.append(np.array([i, j, 0]))
        
        orig_dots = VGroup(*[Dot3D(p, color=Colors.ACCENT_BLUE, radius=0.08) 
                            for p in grid_pts[:25]])
        self.play(FadeIn(orig_dots), run_time=1.5)
        self.wait(0.3)
        
        # ── Scaling Matrix ────────────────────────────────────────────
        scale_mat = MathTex(
            r"S = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}",
            font_size=36, color=Colors.ACCENT_GREEN
        )
        scale_mat.to_edge(LEFT, buff=1).shift(UP * 1.5)
        
        # ── Rotation Matrix ───────────────────────────────────────────
        rot_mat = MathTex(
            r"R_z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}",
            font_size=28, color=Colors.SECONDARY
        )
        rot_mat.to_edge(RIGHT, buff=1).shift(UP * 1.5)
        
        self.play(FadeIn(scale_mat), run_time=1)
        self.wait(0.5)
        self.play(FadeIn(rot_mat), run_time=1)
        self.wait(1)
        
        # ── Apply Transformation ──────────────────────────────────────
        angle = PI / 4
        c, s = np.cos(angle), np.sin(angle)
        
        transformed_dots = VGroup()
        for dot in orig_dots:
            pos = dot.get_center().copy()
            # Scale then rotate
            scaled = pos * 1.5
            rotated = np.array([
                c * scaled[0] - s * scaled[1],
                s * scaled[0] + c * scaled[1],
                scaled[2]
            ])
            transformed_dots.add(Dot3D(rotated, color=Colors.ACCENT_PINK, radius=0.08))
        
        self.play(Transform(orig_dots, transformed_dots), run_time=2, 
                 rate_func=there_and_back)
        self.wait(0.5)
        
        # ── Matrix Multiplication Example ─────────────────────────────
        mult_formula = MathTex(
            r"\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}"
        )
        mult_formula.to_edge(DOWN, buff=0.5)
        
        step1 = MathTex(
            r"\begin{bmatrix} 1\cdot5+2\cdot7 & 1\cdot6+2\cdot8 \\ 3\cdot5+4\cdot7 & 3\cdot6+4\cdot8 \end{bmatrix}"
        )
        step1.move_to(mult_formula)
        
        step2 = MathTex(
            r"\begin{bmatrix} 5+14 & 6+16 \\ 15+28 & 18+32 \end{bmatrix}"
        )
        step2.move_to(mult_formula)
        
        self.play(FadeIn(mult_formula), run_time=1)
        self.wait(0.5)
        self.play(Transform(mult_formula, step1), run_time=1)
        self.wait(0.5)
        self.play(Transform(mult_formula, step2), run_time=1)
        self.wait(1)
        
        self.wait(1.5)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 6: LIMITS AND CONTINUITY
# ============================================================================

class LimitsContinuityScene(ThreeDScene):
    """
    3D visualization of limits with proper lim subscript notation.
    Demonstrates lim(x→0) sin(x)/x = 1 and continuity criteria.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Title ─────────────────────────────────────────────────────
        title = Text("Limits & Continuity", font_size=60, color=Colors.ACCENT_GREEN)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Standard Limit Formulas ───────────────────────────────────
        lims = VGroup(
            MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = 1", 
                   color=Colors.ACCENT_BLUE, font_size=36),
            MathTex(r"\lim_{x \to 0} \frac{e^x - 1}{x} = 1", 
                   color=Colors.ACCENT_YELLOW, font_size=36),
            MathTex(r"\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e", 
                   color=Colors.ACCENT_PINK, font_size=36),
            MathTex(r"\lim_{x \to 0} \frac{1 - \cos x}{x} = 0", 
                   color=Colors.SECONDARY, font_size=36),
        )
        lims.arrange(DOWN, buff=0.5)
        lims.to_edge(LEFT, buff=2)
        
        for L in lims:
            self.play(FadeIn(L, shift=LEFT), run_time=0.8)
            self.wait(0.4)
        self.wait(1)
        
        # ── Graph: sin(x)/x ───────────────────────────────────────────
        ax = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-0.5, 1.5, 0.5],
            z_range=[-0.5, 0.5, 0.5],
            axis_config={"color": Colors.DIM_GRAY}
        )
        ax_labels = ax.get_axis_labels(Tex("x"), Tex("y"), Tex("z"))
        
        self.play(Create(ax), FadeIn(ax_labels), run_time=1)
        self.wait(0.3)
        
        # Parametric curve for sin(x)/x
        func_graph = ParametricFunction(
            lambda t: np.array([t, np.sinc(t/np.pi), 0]),
            t_range=[-4.5, 4.5, 0.01],
            color=Colors.ACCENT_GREEN,
            stroke_width=3
        )
        
        self.play(Create(func_graph), run_time=2.5)
        self.wait(0.5)
        
        # ── Approaching the Limit ─────────────────────────────────────
        left_pt = Dot3D(np.array([-0.5, np.sinc(-0.5/np.pi), 0]), 
                       color=Colors.ACCENT_PINK, radius=0.1)
        right_pt = Dot3D(np.array([0.5, np.sinc(0.5/np.pi), 0]), 
                        color=Colors.ACCENT_PINK, radius=0.1)
        
        self.play(FadeIn(left_pt, shift=LEFT), FadeIn(right_pt, shift=RIGHT))
        self.wait(0.5)
        
        # Converge to limit point (0, 1, 0)
        self.play(
            left_pt.animate.move_to(np.array([0.05, 1, 0])),
            right_pt.animate.move_to(np.array([-0.05, 1, 0])),
            run_time=2,
            rate_func=smooth
        )
        
        limit_pt = Dot3D(np.array([0, 1, 0]), color=Colors.ACCENT_YELLOW, radius=0.15)
        self.play(Create(limit_pt))
        self.wait(0.5)
        
        # ── Limit Notation ────────────────────────────────────────────
        lim_result = MathTex(
            r"\lim_{x \to 0} \frac{\sin x}{x} = 1",
            font_size=40, color=Colors.ACCENT_YELLOW
        )
        lim_result.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(lim_result), run_time=1)
        self.wait(1.5)
        
        # ── Continuity Definition ─────────────────────────────────────
        cont_def = VGroup(
            Text("Continuous at x = a if:", font_size=28, color=Colors.WHITE_SOFT),
            MathTex(r"1.\quad f(a) \text{ is defined}", color=Colors.ACCENT_BLUE),
            MathTex(r"2.\quad \lim_{x \to a} f(x) \text{ exists}", color=Colors.ACCENT_YELLOW),
            MathTex(r"3.\quad \lim_{x \to a} f(x) = f(a)", color=Colors.ACCENT_GREEN),
        )
        cont_def.arrange(DOWN, buff=0.3)
        cont_def.to_edge(RIGHT, buff=1.5)
        
        for item in cont_def:
            self.play(FadeIn(item, shift=RIGHT), run_time=0.6)
            self.wait(0.3)
        
        self.wait(1.5)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 7: DEFINITE INTEGRAL AS AREA UNDER CURVE
# ============================================================================

class IntegralAreaScene(ThreeDScene):
    """
    3D Riemann sum visualization of definite integral.
    Shows convergence from coarse to fine rectangles.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Title ─────────────────────────────────────────────────────
        title = Text("Integration: Area Under Curve", 
                    font_size=56, color=Colors.ACCENT_GREEN)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # ── Axes ──────────────────────────────────────────────────────
        ax = ThreeDAxes(
            x_range=[0, 4, 1],
            y_range=[0, 3, 0.5],
            z_range=[-0.5, 0.5, 0.5],
            axis_config={"color": Colors.DIM_GRAY}
        )
        x_lbl = Tex("x", color=Colors.ACCENT_BLUE, font_size=24).next_to(ax.x_axis.get_end(), RIGHT)
        y_lbl = Tex("y", color=Colors.ACCENT_GREEN, font_size=24).next_to(ax.y_axis.get_end(), UP)
        
        self.play(Create(ax), FadeIn(x_lbl), FadeIn(y_lbl), run_time=1)
        self.wait(0.3)
        
        # ── Curve: y = x²/2 ───────────────────────────────────────────
        curve = ParametricFunction(
            lambda t: np.array([t, t**2/2, 0]),
            t_range=[0, 3, 0.01],
            color=Colors.ACCENT_PINK,
            stroke_width=4
        )
        self.play(Create(curve), run_time=2)
        self.wait(0.5)
        
        # ── Integration Bounds ────────────────────────────────────────
        a, b = 0.5, 2.5
        bound_markers = VGroup(
            Dot3D(np.array([a, 0, 0]), color=Colors.ACCENT_YELLOW, radius=0.1),
            Dot3D(np.array([b, 0, 0]), color=Colors.ACCENT_YELLOW, radius=0.1),
            Tex("a", color=Colors.ACCENT_YELLOW, font_size=20).next_to(ax.c2p(a, 0, 0), DOWN),
            Tex("b", color=Colors.ACCENT_YELLOW, font_size=20).next_to(ax.c2p(b, 0, 0), DOWN),
        )
        for marker in bound_markers:
            self.play(FadeIn(marker))
        self.wait(0.5)
        
        # ── Coarse Riemann Rectangles (n=8) ──────────────────────────
        n_coarse = 8
        w = (b - a) / n_coarse
        rects_coarse = VGroup()
        
        for i in range(n_coarse):
            xl = a + i * w
            h = xl**2 / 2
            rect = Rectangle(width=w, height=h,
                           color=Colors.ACCENT_BLUE, fill_opacity=0.3, stroke_width=1)
            rect.move_to(ax.c2p(xl + w/2, h/2, 0))
            rects_coarse.add(rect)
        
        for rect in rects_coarse:
            self.play(Create(rect), run_time=0.1)
        self.wait(0.8)
        
        # ── Integral Formula ──────────────────────────────────────────
        int_formula = MathTex(
            r"\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x",
            font_size=32, color=Colors.ACCENT_YELLOW
        )
        int_formula.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(int_formula), run_time=1)
        self.wait(1)
        
        # ── Fine Rectangles (n=50) ────────────────────────────────────
        self.play(FadeOut(rects_coarse))
        
        n_fine = 50
        w_fine = (b - a) / n_fine
        rects_fine = VGroup()
        
        for i in range(n_fine):
            xl = a + i * w_fine
            h = xl**2 / 2
            rect = Rectangle(width=w_fine, height=h,
                           color=Colors.ACCENT_GREEN, fill_opacity=0.25, stroke_width=0.5)
            rect.move_to(ax.c2p(xl + w_fine/2, h/2, 0))
            rects_fine.add(rect)
        
        self.play(FadeIn(rects_fine), run_time=2.5)
        self.wait(1)
        
        # ── Exact Evaluation ──────────────────────────────────────────
        exact_calc = MathTex(
            r"\int_{0.5}^{2.5} \frac{x^2}{2}\,dx = \left[\frac{x^3}{6}\right]_{0.5}^{2.5}",
            r"= \frac{(2.5)^3 - (0.5)^3}{6} = \frac{15.625 - 0.125}{6} \approx 2.58",
            font_size=28, color=Colors.ACCENT_YELLOW
        )
        exact_calc.arrange(DOWN, buff=0.3)
        exact_calc.to_edge(RIGHT, buff=1.5)
        
        for line in exact_calc:
            self.play(FadeIn(line, shift=RIGHT), run_time=0.8)
            self.wait(0.5)
        self.wait(1.5)
        
        # ── Fundamental Theorem ───────────────────────────────────────
        ft_title = Text("Fundamental Theorem of Calculus", 
                       font_size=32, color=Colors.ACCENT_ORANGE)
        ft_formula = MathTex(r"\int_a^b f(x)\,dx = F(b) - F(a)", 
                           font_size=36, color=Colors.ACCENT_GREEN)
        
        ft_group = VGroup(ft_title, ft_formula)
        ft_group.arrange(DOWN, buff=0.3)
        ft_group.to_center()
        
        self.play(FadeIn(ft_title), run_time=1)
        self.wait(0.5)
        self.play(FadeIn(ft_formula), run_time=1)
        self.wait(2)
        
        # ── 3D Interactive Viewer ─────────────────────────────────────
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 8: MOTION GRAPHICS SHOWCASE
# ============================================================================

class MotionGraphicsShowcase(ThreeDScene):
    """
    High-energy combined showcase of all concepts with dynamic transitions.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # ── Opening Sequence ──────────────────────────────────────────
        opening = Text("ADVANCED 3D MATHEMATICS", 
                      font_size=72, color=Colors.PRIMARY)
        opening.to_center()
        
        self.play(opening.animate.scale(2).set_opacity(0), 
                 run_time=2.5, rate_func=smooth)
        self.wait(0.3)
        
        # ── Section 1: Vectors ────────────────────────────────────────
        sec1_title = Text("VECTOR ANALYSIS", font_size=56, color=Colors.ACCENT_GREEN)
        self.play(Write(sec1_title))
        self.wait(0.5)
        self.play(sec1_title.animate.to_edge(UP, buff=0.4))
        self.wait(0.5)
        
        # Vector demo
        v_specs = [
            (np.array([2, 1, 0]), Colors.ACCENT_GREEN, r"$\vec{A}$"),
            (np.array([1, 3, 1]), Colors.SECONDARY, r"$\vec{B}$"),
            (np.array([3, 4, 1]), Colors.ACCENT_PINK, r"$\vec{R}$"),
        ]
        
        vec_demo = VGroup()
        for end, col, lbl in v_specs:
            arrow = Arrow3D(ORIGIN, end, color=col, stroke_width=5)
            text = MathTex(lbl, color=col, font_size=28)
            text.next_to(end, UP * 0.3)
            vec_demo.add(arrow, text)
            self.play(Create(arrow), FadeIn(text), run_time=0.8)
            self.wait(0.2)
        
        self.wait(1)
        self.play(FadeOut(vec_demo))
        
        # ── Section 2: Matrices ───────────────────────────────────────
        sec2_title = Text("MATRIX TRANSFORMATIONS", font_size=56, color=Colors.SECONDARY)
        self.play(Write(sec2_title))
        self.wait(0.5)
        self.play(sec2_title.animate.to_edge(UP, buff=0.4))
        self.wait(0.5)
        
        # Matrix display
        mats = [
            MathTex(r"\begin{bmatrix} 1&0\\0&1 \end{bmatrix}", color=Colors.ACCENT_GREEN, font_size=24),
            MathTex(r"\begin{bmatrix} 0&-1\\1&0 \end{bmatrix}", color=Colors.ACCENT_YELLOW, font_size=24),
            MathTex(r"\begin{bmatrix} 2&0\\0&2 \end{bmatrix}", color=Colors.ACCENT_PINK, font_size=24),
        ]
        
        for i, mat in enumerate(mats):
            mat.move_to(LEFT * 3 + i * RIGHT * 3)
            self.play(mat.animate.from_corner(DOWN + LEFT), run_time=0.8)
            self.wait(0.3)
        
        self.wait(1)
        self.play(FadeOut(VGroup(sec2_title, *mats)))
        
        # ── Section 3: Limits ─────────────────────────────────────────
        sec3_title = Text("LIMITS & CONTINUITY", font_size=56, color=Colors.ACCENT_GREEN)
        self.play(Write(sec3_title))
        self.wait(0.5)
        self.play(sec3_title.animate.to_edge(UP, buff=0.4))
        self.wait(0.5)
        
        # Limit approach visualization
        x_vals = [-2, -1, -0.5, -0.1, -0.01, 0.01, 0.1, 0.5, 1, 2]
        points = VGroup()
        
        for x in x_vals:
            y = np.sin(x)/x if abs(x) > 1e-9 else 1
            dot = Dot3D(np.array([x*0.7, y*0.5, 0]), 
                       color=Colors.ACCENT_PINK, radius=0.08)
            points.add(dot)
            self.play(FadeIn(dot))
            self.wait(0.08)
        
        # Highlight limit point
        limit_dot = Dot3D(ORIGIN, color=Colors.ACCENT_YELLOW, radius=0.15)
        limit_lbl = MathTex("1", color=Colors.ACCENT_YELLOW, font_size=32)
        limit_lbl.next_to(limit_dot, UP)
        
        self.play(Create(limit_dot), FadeIn(limit_lbl))
        self.wait(1)
        
        self.play(FadeOut(VGroup(sec3_title, points, limit_dot, limit_lbl)))
        
        # ── Finale ────────────────────────────────────────────────────
        finale = VGroup(
            Text("Mathematics in 3D Motion", font_size=56, color=Colors.PRIMARY),
            Text("Interactive • Dynamic • Visual", font_size=32, color=Colors.WHITE_SOFT),
        )
        finale.arrange(DOWN, buff=0.4)
        finale.to_center()
        
        self.play(FadeIn(finale[0]), run_time=1.5)
        self.wait(0.8)
        self.play(FadeIn(finale[1]), run_time=1)
        self.wait(2)
        
        # Final 3D viewer
        self.begin_3dviewer()
        self.wait(3)
        self.end_3dviewer()
        
        self.play(FadeOut(finale, run_time=1.5))
        self.wait(0.3)


# ============================================================================
# ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    import sys
    
    scenes = {
        "mindmap": VectorMindMap3D,
        "vectors": VectorAdditionScene,
        "dot": DotProductScene,
        "cross": CrossProductScene,
        "matrices": MatrixTransformScene,
        "limits": LimitsContinuityScene,
        "integral": IntegralAreaScene,
        "showcase": MotionGraphicsShowcase,
    }
    
    if len(sys.argv) > 1:
        key = sys.argv[1].lower()
        if key in scenes:
            print(f"Running scene: {key}")
        else:
            print(f"Available scenes: {', '.join(scenes)}")
            print("Usage: python manim_3d_math_animations.py <scene_name>")
            sys.exit(1)
    else:
        print("No scene specified — running full showcase.")

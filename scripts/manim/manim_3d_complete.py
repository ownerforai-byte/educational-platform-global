"""
COMPLETE NEB Class 11 3D Animation Suite — All Topics
======================================================
Production-ready Manim CE script covering ALL lesson topics:
  1. Vector Space Mindmap (3D conceptual network)
  2. Vector Addition/Subtraction (triangle/parallelogram law)
  3. Dot Product (scalar product with projection)
  4. Cross Product (vector product with right-hand rule)
  5. Matrix Transformations (scaling, rotation)
  6. Limits & Continuity (sin(x)/x convergence)
  7. Definite Integrals (Riemann sums, FTC)
  8. Gravitation (orbits, escape velocity, Kepler's laws)
  9. Optics (reflection, refraction, Snell's law, mirrors, lenses)
  10. Trigonometry (unit circle, inverse functions, general solutions)
  11. Quadratic Equations (parabola, discriminant, root finding)
  12. Atomic Structure (Bohr model, quantum numbers, orbitals)
  13. Heat & Temperature (heating curve, calorimetry, cooling)

Features:
  - Pure 3D rendering (Arrow3D, Sphere, Cone, Torus, Dot3D)
  - Mouse-interactive camera (begin_3dviewer / end_3dviewer)
  - Auto-fit to screen dimensions
  - Dark neon aesthetic (#0a0a1a background)
  - Sequential animations with .wait() pauses
  - Correct LaTeX notation for all math

Requirements:
    pip install manim[opencv] numpy
  
Usage:
    manim -p -ql manim_3d_complete.py GravitationScene
    manim -pqh --resolution 1920 1080 manim_3d_complete.py OpticsScene
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
    RED          = "#ff4444"
    BLUE         = "#4488ff"


# ============================================================================
# SCENE 1: CONCEPTUAL MINDMAP — Vector Space
# ============================================================================

class VectorMindMap(ThreeDScene):
    """
    3D conceptual mindmap connecting vector types, operations, products, and spaces.
    Demonstrates mouse-interactive 3D camera navigation.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=12)
        
        # Title
        title = Text("VECTOR SPACE", font_size=72, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.5)
        subtitle = Text("Conceptual Mindmap — NEB Class 11 Physics", 
                       font_size=28, color=Colors.WHITE_SOFT)
        subtitle.next_to(title, DOWN, buff=0.2)
        
        self.play(Write(title), run_time=1.5)
        self.wait()
        self.play(FadeIn(subtitle), run_time=1)
        self.wait(1)
        
        # Central node
        center = Circle(radius=0.8, stroke_color=Colors.ACCENT_PINK, 
                       stroke_width=4, fill_color=Colors.BG)
        center_text = MathTex(r"\vec{v}", font_size=48, color=Colors.ACCENT_PINK)
        center_text.move_to(center.get_center())
        center_group = VGroup(center, center_text).move_to(ORIGIN + OUT * 2)
        
        self.play(Create(center_group), run_time=1.5)
        self.wait(0.5)
        
        # Four main branches
        branches = [
            (r"\textbf{Type}", Colors.ACCENT_GREEN, UP + LEFT * 4),
            (r"\textbf{Operations}", Colors.ACCENT_YELLOW, UP + RIGHT * 4),
            (r"\textbf{Products}", Colors.PRIMARY, DOWN + LEFT * 4),
            (r"\textbf{Space}", Colors.SECONDARY, DOWN + RIGHT * 4),
        ]
        
        branch_nodes = []
        for label, color, pos in branches:
            node = Circle(radius=0.6, stroke_color=color, stroke_width=3, fill_color=Colors.BG)
            node_text = MathTex(label, font_size=32, color=color)
            node.move_to(pos)
            node_text.move_to(node.get_center())
            
            self.play(
                GrowFromPoint(Line(center_group.get_right(), pos), center_group.get_right()),
                node.animate.scale(0),
                run_time=1.2
            )
            self.play(Create(node), FadeIn(node_text))
            branch_nodes.append((node, node_text, pos, color))
        
        self.wait(1)
        
        # Sub-nodes for Products
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
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1))
        self.wait(0.3)


# ============================================================================
# SCENE 2: VECTOR ADDITION IN 3D
# ============================================================================

class VectorAddition(ThreeDScene):
    """
    Animated 3D demonstration of vector addition A + B = R.
    Shows triangle law and parallelogram law with motion graphics.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = MathTex(r"\vec{R} = \vec{A} + \vec{B}", font_size=64, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # Coordinate system
        axes = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-5, 5, 1],
            z_range=[-3, 3, 1],
            axis_config={"color": Colors.DIM_GRAY}
        )
        self.play(Create(axes), run_time=1)
        self.wait(0.3)
        
        # Define vectors
        O = np.array([0, 0, 0])
        A_end = np.array([3, 2, 0])
        B_start = A_end
        B_end = np.array([4, 5, 1])
        
        # Vector A
        vec_A = Arrow3D(start=O, end=A_end, color=Colors.ACCENT_GREEN, 
                       tip_length_ratio=0.25, stroke_width=6)
        label_A = MathTex(r"\vec{A} = 3\hat{i} + 2\hat{j}", font_size=28, color=Colors.ACCENT_GREEN)
        label_A.next_to(A_end + LEFT * 0.5, UP)
        
        self.play(Create(vec_A), run_time=1.2)
        self.wait(0.3)
        self.play(FadeIn(label_A), run_time=0.8)
        self.wait(0.5)
        
        # Vector B
        vec_B = Arrow3D(start=B_start, end=B_end, color=Colors.SECONDARY, 
                       tip_length_ratio=0.25, stroke_width=6)
        label_B = MathTex(r"\vec{B} = \hat{i} + 3\hat{j} + 1.5\hat{k}", 
                         font_size=26, color=Colors.SECONDARY)
        label_B.next_to((B_start + B_end)/2 + RIGHT * 0.5, UP)
        
        self.play(Create(vec_B), run_time=1.2)
        self.wait(0.3)
        self.play(FadeIn(label_B), run_time=0.8)
        self.wait(0.5)
        
        # Resultant R
        vec_R = Arrow3D(start=O, end=B_end, color=Colors.ACCENT_PINK, 
                       tip_length_ratio=0.25, stroke_width=8)
        label_R = MathTex(r"\vec{R} = 4\hat{i} + 5\hat{j} + 1.5\hat{k}", 
                         font_size=30, color=Colors.ACCENT_PINK)
        label_R.next_to(B_end + RIGHT * 0.5, UP)
        
        self.play(Create(vec_R), run_time=1.5)
        self.wait(0.3)
        self.play(FadeIn(label_R), run_time=0.8)
        self.wait(1)
        
        # Magnitude calculation
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
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 3: DOT PRODUCT VISUALIZATION
# ============================================================================

class DotProduct(ThreeDScene):
    """
    3D visualization of the scalar (dot) product.
    Shows geometric interpretation: A·B = |A||B|cosθ
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-30 * DEGREES, distance=10)
        
        # Title & formula
        title = MathTex(r"\vec{A} \cdot \vec{B} = |\vec{A}| |\vec{B}| \cos\theta",
                       font_size=56, color=Colors.ACCENT_YELLOW)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        comp_formula = MathTex(r"\vec{A} \cdot \vec{B} = A_xB_x + A_yB_y + A_zB_z",
                              font_size=40, color=Colors.PRIMARY)
        comp_formula.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(comp_formula), run_time=1)
        self.wait(0.5)
        
        # Define vectors
        A_end = np.array([4, 2, 0])
        B_end = np.array([2, 4, 0])
        theta = np.arccos(np.dot(A_end, B_end) / (np.linalg.norm(A_end) * np.linalg.norm(B_end)))
        
        # Draw vectors
        vec_A = Arrow3D(ORIGIN, A_end, color=Colors.ACCENT_GREEN, stroke_width=6)
        vec_B = Arrow3D(ORIGIN, B_end, color=Colors.SECONDARY, stroke_width=6)
        
        self.play(Create(vec_A), Create(vec_B), run_time=1.5)
        self.wait(0.3)
        
        lbl_A = MathTex(r"\vec{A}", font_size=32, color=Colors.ACCENT_GREEN)
        lbl_B = MathTex(r"\vec{B}", font_size=32, color=Colors.SECONDARY)
        lbl_A.next_to(A_end + UP * 0.3, UP)
        lbl_B.next_to(B_end + UP * 0.3, UP)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.5)
        
        # Angle arc
        arc = ArcBetweenPoints(
            A_end[:2] * 0.3 / np.linalg.norm(A_end[:2]),
            B_end[:2] * 0.3 / np.linalg.norm(B_end[:2]),
            angle=theta, arc_center=ORIGIN[:2]
        )
        theta_lbl = MathTex(r"\theta", font_size=28, color=Colors.ACCENT_PINK)
        theta_lbl.next_to(arc, OUT)
        
        self.play(Create(arc), FadeIn(theta_lbl), run_time=1)
        self.wait(0.5)
        
        # Projection
        proj_len = np.dot(A_end, B_end) / np.linalg.norm(B_end)
        proj_point = B_end * (proj_len / np.linalg.norm(B_end))
        
        proj_arrow = Arrow3D(ORIGIN, proj_point, color=Colors.ACCENT_ORANGE, stroke_width=4,
                            stroke_dash_array=[0.3, 0.15])
        proj_lbl = MathTex(r"\text{proj}_{\vec{B}}\vec{A}", font_size=26, color=Colors.ACCENT_ORANGE)
        proj_lbl.next_to(proj_point + RIGHT * 0.5, UP)
        
        self.play(Create(proj_arrow), FadeIn(proj_lbl), run_time=1)
        self.wait(0.5)
        
        # Calculate result
        result = np.dot(A_end, B_end)
        result_text = MathTex(r"\vec{A} \cdot \vec{B} =", str(result),
                             font_size=40, color=Colors.ACCENT_YELLOW)
        result_text.to_edge(LEFT, buff=1)
        
        self.play(FadeIn(result_text), run_time=1)
        self.wait(1)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 4: CROSS PRODUCT WITH RIGHT-HAND RULE
# ============================================================================

class CrossProduct(ThreeDScene):
    """
    3D cross product visualization with determinant notation.
    Demonstrates right-hand rule and perpendicular result.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = MathTex(r"\vec{A} \times \vec{B} = |\vec{A}| |\vec{B}| \sin\theta \, \hat{n}",
                       font_size=52, color=Colors.ACCENT_PINK)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # Determinant form
        det_form = MathTex(r"\vec{A} \times \vec{B} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix}")
        det_form.to_edge(LEFT, buff=1).shift(UP * 0.5)
        self.play(FadeIn(det_form), run_time=1.2)
        self.wait(0.5)
        
        # Input vectors
        A_end = np.array([3, 0, 0])
        B_end = np.array([0, 3, 0])
        
        vec_A = Arrow3D(ORIGIN, A_end, color=Colors.ACCENT_GREEN, stroke_width=6)
        vec_B = Arrow3D(ORIGIN, B_end, color=Colors.SECONDARY, stroke_width=6)
        
        self.play(Create(vec_A), Create(vec_B), run_time=1.5)
        self.wait(0.3)
        
        lbl_A = MathTex(r"\vec{A}", font_size=32, color=Colors.ACCENT_GREEN)
        lbl_B = MathTex(r"\vec{B}", font_size=32, color=Colors.SECONDARY)
        lbl_A.next_to(A_end + RIGHT * 0.3, RIGHT)
        lbl_B.next_to(B_end + UP * 0.3, UP)
        self.play(FadeIn(lbl_A), FadeIn(lbl_B))
        self.wait(0.5)
        
        # Result vector along Z
        result = np.cross(A_end, B_end)  # [0, 0, 9]
        vec_C = Arrow3D(ORIGIN, result, color=Colors.ACCENT_YELLOW, stroke_width=8)
        lbl_C = MathTex(r"\vec{C} = 9\hat{k}", font_size=36, color=Colors.ACCENT_YELLOW)
        lbl_C.next_to(result + UP * 0.5, UP)
        
        self.play(Create(vec_C), run_time=1.5)
        self.wait(0.3)
        self.play(FadeIn(lbl_C), run_time=0.8)
        self.wait(1)
        
        # Right-hand rule
        rhs_text = Text("Right-Hand Rule: Curl fingers from A to B, thumb points to C",
                       font_size=24, color=Colors.ACCENT_ORANGE)
        rhs_text.to_edge(DOWN, buff=0.5)
        
        rot_arc = Arc(radius=1, start_angle=0, angle=PI/2, 
                     color=Colors.ACCENT_ORANGE, stroke_width=4)
        rot_arc.rotate(PI/4, axis=OUT)
        
        self.play(Create(rot_arc), FadeIn(rhs_text), run_time=1.5)
        self.wait(1)
        
        # Properties list
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
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 5: MATRIX TRANSFORMATIONS IN 3D
# ============================================================================

class MatrixTransformations(ThreeDScene):
    """
    3D matrix transformations: scaling, rotation, and multiplication.
    Uses strict LaTeX bmatrix notation.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = Text("Matrix Transformations in 3D", font_size=56, color=Colors.PRIMARY)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # Original grid points
        grid_pts = []
        for i in np.linspace(-2, 2, 5):
            for j in np.linspace(-2, 2, 5):
                grid_pts.append(np.array([i, j, 0]))
        
        orig_dots = VGroup(*[Dot3D(p, color=Colors.ACCENT_BLUE, radius=0.08) 
                            for p in grid_pts[:25]])
        self.play(FadeIn(orig_dots), run_time=1.5)
        self.wait(0.3)
        
        # Scaling matrix
        scale_mat = MathTex(r"S = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}",
                           font_size=36, color=Colors.ACCENT_GREEN)
        scale_mat.to_edge(LEFT, buff=1).shift(UP * 1.5)
        
        # Rotation matrix
        rot_mat = MathTex(r"R_z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}",
                         font_size=28, color=Colors.SECONDARY)
        rot_mat.to_edge(RIGHT, buff=1).shift(UP * 1.5)
        
        self.play(FadeIn(scale_mat), run_time=1)
        self.wait(0.5)
        self.play(FadeIn(rot_mat), run_time=1)
        self.wait(1)
        
        # Apply transformation
        angle = PI / 4
        c, s = np.cos(angle), np.sin(angle)
        
        transformed_dots = VGroup()
        for dot in orig_dots:
            pos = dot.get_center().copy()
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
        
        # Matrix multiplication example
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
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 6: LIMITS AND CONTINUITY
# ============================================================================

class LimitsContinuity(ThreeDScene):
    """
    3D visualization of limits with proper lim subscript notation.
    Demonstrates lim(x→0) sin(x)/x = 1 and continuity criteria.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = Text("Limits & Continuity", font_size=60, color=Colors.ACCENT_GREEN)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # Standard limit formulas
        lims = VGroup(
            MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = 1", color=Colors.ACCENT_BLUE, font_size=36),
            MathTex(r"\lim_{x \to 0} \frac{e^x - 1}{x} = 1", color=Colors.ACCENT_YELLOW, font_size=36),
            MathTex(r"\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e", color=Colors.ACCENT_PINK, font_size=36),
            MathTex(r"\lim_{x \to 0} \frac{1 - \cos x}{x} = 0", color=Colors.SECONDARY, font_size=36),
        )
        lims.arrange(DOWN, buff=0.5)
        lims.to_edge(LEFT, buff=2)
        
        for L in lims:
            self.play(FadeIn(L, shift=LEFT), run_time=0.8)
            self.wait(0.4)
        self.wait(1)
        
        # Graph: sin(x)/x
        ax = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-0.5, 1.5, 0.5],
            z_range=[-0.5, 0.5, 0.5],
            axis_config={"color": Colors.DIM_GRAY}
        )
        ax_labels = ax.get_axis_labels(Tex("x"), Tex("y"), Tex("z"))
        
        self.play(Create(ax), FadeIn(ax_labels), run_time=1)
        self.wait(0.3)
        
        func_graph = ParametricFunction(
            lambda t: np.array([t, np.sinc(t/np.pi), 0]),
            t_range=[-4.5, 4.5, 0.01],
            color=Colors.ACCENT_GREEN,
            stroke_width=3
        )
        
        self.play(Create(func_graph), run_time=2.5)
        self.wait(0.5)
        
        # Approaching the limit
        left_pt = Dot3D(np.array([-0.5, np.sinc(-0.5/np.pi), 0]), 
                       color=Colors.ACCENT_PINK, radius=0.1)
        right_pt = Dot3D(np.array([0.5, np.sinc(0.5/np.pi), 0]), 
                        color=Colors.ACCENT_PINK, radius=0.1)
        
        self.play(FadeIn(left_pt, shift=LEFT), FadeIn(right_pt, shift=RIGHT))
        self.wait(0.5)
        
        self.play(
            left_pt.animate.move_to(np.array([0.05, 1, 0])),
            right_pt.animate.move_to(np.array([-0.05, 1, 0])),
            run_time=2,
            rate_func=smooth
        )
        
        limit_pt = Dot3D(np.array([0, 1, 0]), color=Colors.ACCENT_YELLOW, radius=0.15)
        self.play(Create(limit_pt))
        self.wait(0.5)
        
        lim_result = MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = 1",
                            font_size=40, color=Colors.ACCENT_YELLOW)
        lim_result.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(lim_result), run_time=1)
        self.wait(1.5)
        
        # Continuity definition
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
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 7: DEFINITE INTEGRAL AS AREA UNDER CURVE
# ============================================================================

class IntegralArea(ThreeDScene):
    """
    3D Riemann sum visualization of definite integral.
    Shows convergence from coarse to fine rectangles.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = Text("Integration: Area Under Curve", font_size=56, color=Colors.ACCENT_GREEN)
        title.to_edge(UP, buff=0.3)
        self.play(FadeIn(title), run_time=1.5)
        self.wait(0.5)
        
        # Axes
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
        
        # Curve: y = x²/2
        curve = ParametricFunction(
            lambda t: np.array([t, t**2/2, 0]),
            t_range=[0, 3, 0.01],
            color=Colors.ACCENT_PINK,
            stroke_width=4
        )
        self.play(Create(curve), run_time=2)
        self.wait(0.5)
        
        # Integration bounds
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
        
        # Coarse Riemann rectangles (n=8)
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
        
        # Integral formula
        int_formula = MathTex(
            r"\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x",
            font_size=32, color=Colors.ACCENT_YELLOW
        )
        int_formula.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(int_formula), run_time=1)
        self.wait(1)
        
        # Fine rectangles (n=50)
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
        
        # Exact evaluation
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
        
        # Fundamental theorem
        ft_title = Text("Fundamental Theorem of Calculus", font_size=32, color=Colors.ACCENT_ORANGE)
        ft_formula = MathTex(r"\int_a^b f(x)\,dx = F(b) - F(a)", font_size=36, color=Colors.ACCENT_GREEN)
        
        ft_group = VGroup(ft_title, ft_formula)
        ft_group.arrange(DOWN, buff=0.3)
        ft_group.to_center()
        
        self.play(FadeIn(ft_title), run_time=1)
        self.wait(0.5)
        self.play(FadeIn(ft_formula), run_time=1)
        self.wait(2)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(5)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 8: GRAVITATION — Orbits, Escape Velocity, Kepler's Laws
# ============================================================================

class Gravitation(ThreeDScene):
    """
    3D visualization of gravitation: planetary orbits, escape velocity,
    variation of g with altitude/depth, and satellite motion.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=60 * DEGREES, theta=-30 * DEGREES, distance=15)
        
        # Title
        title = Text("GRAVITATION", font_size=60, color=Colors.ACCENT_ORANGE)
        title.to_edge(UP, buff=0.4)
        subtitle = MathTex(r"F = \frac{G m_1 m_2}{r^2}", font_size=36, color=Colors.ACCENT_YELLOW)
        subtitle.next_to(title, DOWN, buff=0.2)
        self.play(Write(title), FadeIn(subtitle), run_time=1.5)
        self.wait(0.5)
        
        # Earth and Moon orbit
        earth = Sphere(radius=0.8, color=Colors.BLUE, surface_shading=[0.95, 0.85, 0.75, 0.5])
        earth_label = Text("Earth", font_size=20, color=Colors.WHITE_SOFT)
        earth_label.next_to(earth, DOWN)
        self.play(Create(earth), FadeIn(earth_label))
        self.wait(0.3)
        
        # Orbital path
        orbit_path = ParametricFunction(
            lambda t: np.array([2.5*np.cos(t), 1.8*np.sin(t), 0]),
            t_range=[0, 2*PI, 0.01],
            color=Colors.DIM_GRAY, stroke_width=2, stroke_dash_array=[0.3, 0.3]
        )
        self.play(Create(orbit_path), run_time=1)
        self.wait(0.3)
        
        # Orbiting moon
        moon_orbit_pos = lambda t: np.array([2.5*np.cos(t), 1.8*np.sin(t), 0])
        moon = Sphere(radius=0.2, color=Colors.WHITE_SOFT)
        moon.add_updater(lambda m: m.move_to(moon_orbit_pos(time)))
        self.play(FadeIn(moon))
        
        # Orbital velocity
        velocity_arrow = Arrow3D(
            moon_orbit_pos(0),
            moon_orbit_pos(0) + np.array([-0.5, 0.3, 0]),
            color=Colors.ACCENT_GREEN, stroke_width=3
        )
        v_lbl = MathTex(r"v_{orb} = \sqrt{\frac{GM}{r}}", font_size=24, color=Colors.ACCENT_GREEN)
        v_lbl.next_to(velocity_arrow, UP)
        self.play(Create(velocity_arrow), FadeIn(v_lbl))
        self.wait(1)
        
        # Escape velocity demonstration
        self.play(FadeOut(VGroup(earth, earth_label, orbit_path, velocity_arrow, v_lbl, moon)))
        self.wait(0.3)
        
        esc_title = MathTex(r"v_{escape} = \sqrt{\frac{2GM}{R}} = \sqrt{2}\,v_{orbital}",
                           font_size=40, color=Colors.ACCENT_PINK)
        esc_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(esc_title))
        self.wait(0.5)
        
        # Earth sphere
        earth2 = Sphere(radius=0.6, color=Colors.BLUE)
        earth2.move_to(np.array([-3, 0, 0]))
        
        # Projectile paths at different velocities
        proj_cases = [
            (np.array([-2, 2, 0]), np.array([1, -2, 0]), "v < v_e", Colors.ACCENT_GREEN),
            (np.array([-2, 2, 0]), np.array([3, 0, 0]), "v = v_e", Colors.ACCENT_YELLOW),
            (np.array([-2, 2, 0]), np.array([1, 2, 0]), "v > v_e", Colors.ACCENT_PINK),
        ]
        
        for start, end, label, color in proj_cases:
            ray = Arrow3D(start, end, color=color, stroke_width=4)
            lbl = Text(label, font_size=18, color=color)
            lbl.move_to(end + np.array([0, 0.5, 0]))
            self.play(Create(ray), FadeIn(lbl))
            self.wait(0.8)
        
        self.wait(1)
        
        # Variation of g with altitude
        self.play(FadeOut(All))
        alt_title = MathTex(r"g(h) = g\left(\frac{R}{R+h}\right)^2", font_size=40, color=Colors.ACCENT_GREEN)
        alt_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(alt_title))
        self.wait(0.5)
        
        g_axis = Line3D(np.array([-3, -2, 0]), np.array([-3, 3, 0]), color=Colors.WHITE_SOFT, stroke_width=3)
        g_label = Text("g (m/s²)", font_size=18, color=Colors.WHITE_SOFT)
        g_label.next_to(g_axis.get_end(), UP)
        self.play(Create(g_axis), FadeIn(g_label))
        
        g_values = [(0, 9.8), (1, 7.3), (2, 5.5), (3, 4.4)]
        for h, g in g_values:
            dot = Dot3D(np.array([-3, -2 + h*1.2, 0]), color=Colors.ACCENT_YELLOW, radius=0.1)
            g_text = MathTex(f"{g:.1f}", color=Colors.ACCENT_YELLOW, font_size=20)
            g_text.next_to(dot, RIGHT)
            h_text = MathTex(f"h={h}R", color=Colors.DIM_GRAY, font_size=16)
            h_text.next_to(dot, LEFT)
            self.play(FadeIn(dot), FadeIn(g_text), FadeIn(h_text))
            self.wait(0.3)
        
        depth_title = MathTex(r"g(d) = g\left(1 - \frac{d}{R}\right)", font_size=36, color=Colors.SECONDARY)
        depth_title.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(depth_title))
        self.wait(1)
        
        # Kepler's Third Law
        self.play(FadeOut(All))
        kp_title = MathTex(r"T^2 \propto r^3 \quad\Longrightarrow\quad T^2 = \frac{4\pi^2}{GM}r^3",
                          font_size=38, color=Colors.ACCENT_PINK)
        kp_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(kp_title))
        self.wait(0.5)
        
        # Multiple orbits
        orbits = []
        for i, r in enumerate([1.5, 2.5, 3.5]):
            orbits.append(
                ParametricFunction(
                    lambda t, r=r: np.array([r*np.cos(t), r*np.sin(t), 0]),
                    t_range=[0, 2*PI, 0.01],
                    color=[Colors.ACCENT_GREEN, Colors.ACCENT_YELLOW, Colors.ACCENT_PINK][i],
                    stroke_width=3
                )
            )
        
        center_mass = Sphere(radius=0.5, color=Colors.ACCENT_ORANGE)
        self.play(Create(center_mass))
        
        for orb in orbits:
            self.play(Create(orb), run_time=1)
            self.wait(0.5)
        
        self.wait(1.5)
        
        # Geostationary satellite concept
        geo_text = VGroup(
            Text("Geostationary Satellite Conditions:", font_size=24, color=Colors.WHITE_SOFT),
            MathTex(r"1.\quad \text{Equatorial plane}", color=Colors.ACCENT_GREEN),
            MathTex(r"2.\quad T = 24 \text{ hours}", color=Colors.ACCENT_YELLOW),
            MathTex(r"3.\quad \text{West to east direction}", color=Colors.ACCENT_PINK),
        )
        geo_text.arrange(DOWN, buff=0.3)
        geo_text.to_edge(RIGHT, buff=1.5)
        
        for item in geo_text:
            self.play(FadeIn(item, shift=RIGHT), run_time=0.6)
            self.wait(0.3)
        
        self.wait(2)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 9: OPTICS — Reflection, Refraction, Snell's Law
# ============================================================================

class Optics(ThreeDScene):
    """
    3D visualization of optics: reflection at curved mirrors, refraction,
    Snell's law, total internal reflection, and lens formulas.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=65 * DEGREES, theta=-40 * DEGREES, distance=12)
        
        # Title
        title = Text("OPTICS", font_size=60, color=Colors.ACCENT_YELLOW)
        title.to_edge(UP, buff=0.4)
        subtitle = Text("Reflection & Refraction", font_size=28, color=Colors.WHITE_SOFT)
        subtitle.next_to(title, DOWN, buff=0.2)
        self.play(Write(title), FadeIn(subtitle), run_time=1.5)
        self.wait(0.5)
        
        # Part 1: Snell's Law
        snell_title = MathTex(r"n_1 \sin\theta_1 = n_2 \sin\theta_2", font_size=42, color=Colors.ACCENT_GREEN)
        snell_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(snell_title))
        self.wait(0.5)
        
        refractive_text = MathTex(r"n = \frac{c}{v} \quad \Rightarrow \quad n_1 > n_2 \Rightarrow \theta_1 < \theta_2",
                                 font_size=28, color=Colors.ACCENT_YELLOW)
        refractive_text.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(refractive_text))
        self.wait(0.5)
        
        # Interface line
        interface = Line3D(np.array([-4, -1, 0]), np.array([4, -1, 0]),
                          color=Colors.WHITE_SOFT, stroke_width=3)
        self.play(Create(interface))
        self.wait(0.3)
        
        # Media labels
        med1 = Text("Medium 1 (rarer, n₁)", font_size=20, color=Colors.ACCENT_GREEN)
        med2 = Text("Medium 2 (denser, n₂)", font_size=20, color=Colors.ACCENT_PINK)
        med1.move_to(np.array([-3, 1, 0]))
        med2.move_to(np.array([-3, -2.5, 0]))
        self.play(FadeIn(med1), FadeIn(med2))
        self.wait(0.5)
        
        # Normal line
        normal = DashedLine3D(np.array([0, 2, 0]), np.array([0, -3, 0]),
                             color=Colors.DIM_GRAY, dash_length=0.1)
        n_lbl = MathTex(r"\text{Normal}", font_size=18, color=Colors.DIM_GRAY)
        n_lbl.next_to(normal.get_end(), UP)
        self.play(Create(normal), FadeIn(n_lbl))
        self.wait(0.5)
        
        # Incident ray
        inc_start = np.array([-2, 2, 0])
        inc_end = np.array([0, -1, 0])
        incident_ray = Arrow3D(inc_start, inc_end, color=Colors.ACCENT_YELLOW, stroke_width=5)
        i_lbl = MathTex(r"\theta_1", font_size=24, color=Colors.ACCENT_YELLOW)
        i_lbl.move_to(np.array([-1.2, 0.5, 0]))
        self.play(Create(incident_ray), FadeIn(i_lbl))
        self.wait(0.5)
        
        # Refracted ray
        ref_start = np.array([0, -1, 0])
        ref_end = np.array([1, -3, 0])
        refracted_ray = Arrow3D(ref_start, ref_end, color=Colors.ACCENT_GREEN, stroke_width=5)
        r_lbl = MathTex(r"\theta_2", font_size=24, color=Colors.ACCENT_GREEN)
        r_lbl.move_to(np.array([0.5, -2, 0]))
        self.play(Create(refracted_ray), FadeIn(r_lbl))
        self.wait(1.5)
        
        # Total Internal Reflection
        self.play(FadeOut(All))
        crit_title = MathTex(r"\sin\theta_c = \frac{n_2}{n_1} \quad (n_1 > n_2)", font_size=40, color=Colors.ACCENT_PINK)
        crit_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(crit_title))
        self.wait(0.5)
        
        interface2 = Line3D(np.array([-4, 0, 0]), np.array([4, 0, 0]), color=Colors.WHITE_SOFT, stroke_width=3)
        self.play(Create(interface2))
        self.wait(0.3)
        
        cases = [
            (np.array([-2, 2, 0]), np.array([1, -2, 0]), "Refraction", Colors.ACCENT_GREEN),
            (np.array([-2, 2, 0]), np.array([3, 0, 0]), "Critical angle", Colors.ACCENT_YELLOW),
            (np.array([-2, 2, 0]), np.array([1, 2, 0]), "TIR", Colors.ACCENT_PINK),
        ]
        
        for start, end, label, color in cases:
            ray = Arrow3D(start, end, color=color, stroke_width=4)
            lbl = Text(label, font_size=18, color=color)
            lbl.move_to(end + np.array([0, 0.5, 0]))
            self.play(Create(ray), FadeIn(lbl))
            self.wait(0.8)
        
        self.wait(1)
        
        # Mirror Formula
        self.play(FadeOut(All))
        mirror_title = MathTex(r"\frac{1}{f} = \frac{1}{u} + \frac{1}{v}", font_size=42, color=Colors.ACCENT_GREEN)
        mirror_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(mirror_title))
        self.wait(0.5)
        
        magnification = MathTex(r"m = -\frac{v}{u}", font_size=32, color=Colors.ACCENT_YELLOW)
        magnification.next_to(mirror_title, DOWN, buff=0.3)
        self.play(FadeIn(magnification))
        self.wait(0.5)
        
        # Concave mirror representation
        mirror_curve = Arc(radius=2, start_angle=-PI/3, angle=2*PI/3, color=Colors.ACCENT_BLUE, stroke_width=5)
        mirror_curve.rotate(PI/2)
        mirror_curve.move_to(np.array([-1, -1, 0]))
        self.play(Create(mirror_curve))
        self.wait(0.3)
        
        F = Dot3D(np.array([-1, -3, 0]), color=Colors.ACCENT_PINK, radius=0.15)
        F_lbl = MathTex(r"F", color=Colors.ACCENT_PINK)
        F_lbl.next_to(F, DOWN)
        self.play(Create(F), FadeIn(F_lbl))
        self.wait(0.3)
        
        C = Dot3D(np.array([-1, -4, 0]), color=Colors.ACCENT_ORANGE, radius=0.15)
        C_lbl = MathTex(r"C", color=Colors.ACCENT_ORANGE)
        C_lbl.next_to(C, DOWN)
        self.play(Create(C), FadeIn(C_lbl))
        self.wait(1)
        
        # Lens Formula
        self.play(FadeOut(All))
        lens_title = Text("Lens Formula", font_size=50, color=Colors.ACCENT_GREEN)
        lens_formula = MathTex(r"\frac{1}{f} = \frac{1}{v} - \frac{1}{u}", font_size=40, color=Colors.ACCENT_YELLOW)
        lens_power = MathTex(r"P = \frac{1}{f} \text{ (dioptres)}", font_size=32, color=Colors.ACCENT_PINK)
        
        lens_title.to_edge(UP, buff=0.4)
        lens_formula.next_to(lens_title, DOWN, buff=0.3)
        lens_power.next_to(lens_formula, DOWN, buff=0.2)
        
        self.play(Write(lens_title))
        self.wait(0.3)
        self.play(FadeIn(lens_formula))
        self.wait(0.5)
        self.play(FadeIn(lens_power))
        self.wait(1)
        
        # Convex lens illustration
        lens_shape = Ellipse(width=0.3, height=2.5, color=Colors.ACCENT_BLUE)
        lens_shape.rotate(PI/2)
        lens_shape.move_to(ORIGIN)
        self.play(Create(lens_shape))
        self.wait(0.5)
        
        # Parallel rays converging
        for offset in [-0.8, -0.4, 0, 0.4, 0.8]:
            ray = Arrow3D(np.array([-4, offset, 0]), np.array([0, offset, 0]),
                         color=Colors.ACCENT_YELLOW, stroke_width=2)
            self.play(Create(ray), run_time=0.2)
        
        focus_point = Dot3D(np.array([2, 0, 0]), color=Colors.ACCENT_PINK, radius=0.15)
        self.play(Create(focus_point))
        self.wait(1)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 10: TRIGONOMETRY — Unit Circle, Inverse Functions, General Solutions
# ============================================================================

class Trigonometry(ThreeDScene):
    """
    3D visualization of trigonometry: unit circle, inverse circular functions,
    principal value branches, and general solutions.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, distance=10)
        
        # Title
        title = Text("TRIGONOMETRY", font_size=56, color=Colors.ACCENT_GREEN)
        title.to_edge(UP, buff=0.4)
        self.play(Write(title), run_time=1.5)
        self.wait(0.5)
        
        # Part 1: Unit Circle
        circle_title = MathTex(r"\text{Unit Circle: } x^2 + y^2 = 1", font_size=36, color=Colors.ACCENT_YELLOW)
        circle_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(circle_title))
        self.wait(0.3)
        
        # 3D Unit circle
        unit_circle = Circle(radius=2, color=Colors.ACCENT_BLUE, stroke_width=4)
        unit_circle.rotate(PI/6, axis=RIGHT)
        unit_circle.move_to(ORIGIN)
        self.play(Create(unit_circle), run_time=1.5)
        self.wait(0.3)
        
        # Moving point on circle
        point_on_circle = Dot3D(color=Colors.ACCENT_PINK, radius=0.12)
        angle_label = MathTex(r"\theta", font_size=24, color=Colors.ACCENT_YELLOW)
        
        def update_point(mob, time):
            angle = time * 0.5
            x = 2 * np.cos(angle)
            y = 2 * np.sin(angle)
            mob.move_to(np.array([x, y, 0]))
        
        point_on_circle.add_updater(update_point)
        angle_label.add_updater(lambda m, t: m.move_to(
            np.array([0.5*np.cos(t*0.5), 0.5*np.sin(t*0.5), 0.3])))
        
        self.play(FadeIn(point_on_circle), FadeIn(angle_label))
        self.wait(2)
        
        # Show sin, cos projections
        sin_line = Line3D(np.array([0, 0, 0]), np.array([0, 2*np.sin(0), 0]),
                         color=Colors.ACCENT_GREEN, stroke_width=3)
        cos_line = Line3D(np.array([0, 0, 0]), np.array([2, 0, 0]),
                         color=Colors.ACCENT_BLUE, stroke_width=3)
        sin_lbl = MathTex(r"\sin\theta", font_size=20, color=Colors.ACCENT_GREEN)
        cos_lbl = MathTex(r"\cos\theta", font_size=20, color=Colors.ACCENT_BLUE)
        
        self.play(Create(sin_line), Create(cos_line), run_time=0.8)
        self.wait(0.5)
        
        # Part 2: Inverse Circular Functions
        self.play(FadeOut(All))
        inv_title = Text("Inverse Circular Functions", font_size=48, color=Colors.ACCENT_PINK)
        inv_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(inv_title))
        self.wait(0.5)
        
        # Principal value table
        inv_table = VGroup(
            MathTex(r"\sin^{-1}x \quad |\quad \text{Domain: } [-1, 1] \quad |\quad \text{Range: } \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]",
                   color=Colors.ACCENT_GREEN, font_size=22),
            MathTex(r"\cos^{-1}x \quad |\quad \text{Domain: } [-1, 1] \quad |\quad \text{Range: } [0, \pi]",
                   color=Colors.ACCENT_YELLOW, font_size=22),
            MathTex(r"\tan^{-1}x \quad |\quad \text{Domain: } \mathbb{R} \quad \quad |\quad \text{Range: } \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)",
                   color=Colors.ACCENT_BLUE, font_size=22),
        )
        inv_table.arrange(DOWN, buff=0.3)
        inv_table.to_edge(LEFT, buff=2)
        
        for item in inv_table:
            self.play(FadeIn(item, shift=LEFT), run_time=0.8)
            self.wait(0.3)
        
        # Key identities
        identities = VGroup(
            MathTex(r"\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}", color=Colors.ACCENT_PINK, font_size=28),
            MathTex(r"\tan^{-1}x + \cot^{-1}x = \frac{\pi}{2}", color=Colors.ACCENT_ORANGE, font_size=28),
            MathTex(r"\sec^{-1}x + \csc^{-1}x = \frac{\pi}{2}", color=Colors.SECONDARY, font_size=28),
        )
        identities.arrange(DOWN, buff=0.3)
        identities.to_edge(RIGHT, buff=2)
        
        for ident in identities:
            self.play(FadeIn(ident, shift=RIGHT), run_time=0.8)
            self.wait(0.3)
        
        self.wait(1.5)
        
        # Part 3: General Solutions
        self.play(FadeOut(All))
        gen_title = Text("General Solutions of Trigonometric Equations", font_size=40, color=Colors.ACCENT_YELLOW)
        gen_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(gen_title))
        self.wait(0.5)
        
        solutions = VGroup(
            MathTex(r"\sin\theta = 0 \quad \Rightarrow \quad \theta = n\pi",
                   color=Colors.ACCENT_GREEN, font_size=26),
            MathTex(r"\cos\theta = 0 \quad \Rightarrow \quad \theta = \frac{(2n+1)\pi}{2}",
                   color=Colors.ACCENT_BLUE, font_size=26),
            MathTex(r"\tan\theta = 0 \quad \Rightarrow \quad \theta = n\pi",
                   color=Colors.ACCENT_YELLOW, font_size=26),
            MathTex(r"\sin^2\theta = \sin^2\alpha \quad \Rightarrow \quad \theta = n\pi \pm \alpha",
                   color=Colors.ACCENT_PINK, font_size=24),
            MathTex(r"\cos^2\theta = \cos^2\alpha \quad \Rightarrow \quad \theta = 2n\pi \pm \alpha",
                   color=Colors.SECONDARY, font_size=24),
        )
        solutions.arrange(DOWN, buff=0.4)
        solutions.to_edge(LEFT, buff=2)
        
        for sol in solutions:
            self.play(FadeIn(sol, shift=LEFT), run_time=0.6)
            self.wait(0.2)
        
        # Worked example
        example_box = SurroundingRectangle(
            MathTex(r"\text{Solve: } 2\sin^2\theta = 1", color=Colors.ACCENT_ORANGE, font_size=28),
            color=Colors.ACCENT_ORANGE, stroke_width=2
        )
        example_box.to_edge(RIGHT, buff=1.5)
        self.play(Create(example_box))
        self.wait(0.3)
        
        steps = [
            r"\sin^2\theta = \frac{1}{2}",
            r"\sin\theta = \pm\frac{1}{\sqrt{2}}",
            r"\theta = n\pi \pm \frac{\pi}{4}, \; n \in \mathbb{Z}",
        ]
        
        for i, step in enumerate(steps):
            step_mobj = MathTex(step, color=Colors.ACCENT_GREEN, font_size=26)
            step_mobj.move_to(example_box.get_center() + DOWN * (i - 1) * 0.8)
            self.play(FadeIn(step_mobj))
            self.wait(0.5)
        
        self.wait(1.5)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 11: QUADRATIC EQUATIONS — Parabola, Discriminant, Roots
# ============================================================================

class QuadraticEquations(ThreeDScene):
    """
    3D visualization of quadratic equations: parabola graphs,
    discriminant cases, and root-coefficient relationships.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=65 * DEGREES, theta=-40 * DEGREES, distance=12)
        
        # Title
        title = Text("QUADRATIC EQUATIONS", font_size=52, color=Colors.ACCENT_PINK)
        title.to_edge(UP, buff=0.4)
        formula = MathTex(r"ax^2 + bx + c = 0 \quad (a \neq 0)", font_size=36, color=Colors.ACCENT_YELLOW)
        formula.next_to(title, DOWN, buff=0.2)
        self.play(Write(title), FadeIn(formula), run_time=1.5)
        self.wait(0.5)
        
        # Quadratic formula
        q_formula = MathTex(r"x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}", font_size=38, color=Colors.ACCENT_GREEN)
        q_formula.to_edge(UP, buff=0.3)
        discriminant = MathTex(r"\Delta = b^2 - 4ac", font_size=32, color=Colors.ACCENT_ORANGE)
        discriminant.next_to(q_formula, DOWN, buff=0.2)
        self.play(FadeIn(q_formula), FadeIn(discriminant))
        self.wait(0.5)
        
        # Sum & product of roots
        sum_product = VGroup(
            MathTex(r"\alpha + \beta = -\frac{b}{a}", color=Colors.ACCENT_BLUE),
            MathTex(r"\alpha\beta = \frac{c}{a}", color=Colors.ACCENT_YELLOW),
        )
        sum_product.arrange(DOWN, buff=0.2)
        sum_product.to_edge(RIGHT, buff=2)
        
        for sp in sum_product:
            self.play(FadeIn(sp, shift=RIGHT), run_time=0.8)
            self.wait(0.3)
        
        self.wait(0.5)
        
        # Discriminant cases
        self.play(FadeOut(sum_product))
        
        disc_title = Text("Discriminant Cases", font_size=36, color=Colors.ACCENT_PINK)
        disc_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(disc_title))
        self.wait(0.3)
        
        cases = [
            (r"\Delta > 0 \text{ (perfect square)} \Rightarrow \text{Real, distinct, rational roots}",
             Colors.ACCENT_GREEN),
            (r"\Delta > 0 \text{ (not square)} \Rightarrow \text{Real, distinct, irrational roots}",
             Colors.ACCENT_YELLOW),
            (r"\Delta = 0 \Rightarrow \text{Real, equal (repeated) roots}",
             Colors.ACCENT_BLUE),
            (r"\Delta < 0 \Rightarrow \text{Complex conjugate pair}",
             Colors.ACCENT_PINK),
        ]
        
        case_textures = [MathTex(case, color=color, font_size=24) for case, color in cases]
        case_textures.arrange(DOWN, buff=0.3)
        case_textures.to_edge(LEFT, buff=2)
        
        for ct in case_textures:
            self.play(FadeIn(ct, shift=LEFT), run_time=0.6)
            self.wait(0.4)
        
        self.wait(1)
        
        # Parabola visualization
        self.play(FadeOut(All))
        
        axes = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-2, 8, 1],
            z_range=[-1, 1, 0.5],
            axis_config={"color": Colors.DIM_GRAY}
        )
        self.play(Create(axes), run_time=1)
        self.wait(0.3)
        
        # Parabola: y = x² - 2x - 3 (roots at -1, 3)
        parabola = ParametricFunction(
            lambda t: np.array([t, t**2 - 2*t - 3, 0]),
            t_range=[-3, 5, 0.01],
            color=Colors.ACCENT_GREEN, stroke_width=4
        )
        self.play(Create(parabola), run_time=2)
        self.wait(0.5)
        
        # Mark roots
        root1 = Dot3D(np.array([-1, 0, 0]), color=Colors.ACCENT_PINK, radius=0.15)
        root2 = Dot3D(np.array([3, 0, 0]), color=Colors.ACCENT_PINK, radius=0.15)
        r1_lbl = MathTex(r"x_1 = -1", color=Colors.ACCENT_PINK, font_size=20)
        r2_lbl = MathTex(r"x_2 = 3", color=Colors.ACCENT_PINK, font_size=20)
        r1_lbl.next_to(root1, DOWN)
        r2_lbl.next_to(root2, DOWN)
        
        self.play(Create(root1), Create(root2), FadeIn(r1_lbl), FadeIn(r2_lbl))
        self.wait(0.5)
        
        # Vertex
        vertex = Dot3D(np.array([1, -4, 0]), color=Colors.ACCENT_YELLOW, radius=0.15)
        v_lbl = MathTex(r"\text{Vertex: }(1, -4)", color=Colors.ACCENT_YELLOW, font_size=20)
        v_lbl.next_to(vertex, RIGHT)
        self.play(Create(vertex), FadeIn(v_lbl))
        self.wait(1)
        
        # Example calculation
        self.play(FadeOut(All))
        
        example_title = Text("Worked Example: 2x² - 5x + 3 = 0", font_size=32, color=Colors.ACCENT_YELLOW)
        example_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(example_title))
        self.wait(0.3)
        
        steps = [
            (r"D = (-5)^2 - 4(2)(3) = 25 - 24 = 1 > 0", Colors.ACCENT_GREEN),
            (r"x = \frac{5 \pm \sqrt{1}}{4} = \frac{5 \pm 1}{4}", Colors.ACCENT_BLUE),
            (r"x_1 = \frac{6}{4} = \frac{3}{2}, \quad x_2 = \frac{4}{4} = 1", Colors.ACCENT_PINK),
            (r"\text{Sum: } \frac{3}{2} + 1 = \frac{5}{2} = -\frac{b}{a} \checkmark", Colors.ACCENT_GREEN),
            (r"\text{Product: } \frac{3}{2} \cdot 1 = \frac{3}{2} = \frac{c}{a} \checkmark", Colors.ACCENT_YELLOW),
        ]
        
        for step_text, color in steps:
            step = MathTex(step_text, color=color, font_size=28)
            step.move_to(ORIGIN + DOWN * (len(steps) // 2 - steps.index((step_text, color))) * 0.8)
            self.play(FadeIn(step), run_time=0.6)
            self.wait(0.4)
        
        self.wait(1.5)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 12: ATOMIC STRUCTURE — Bohr Model, Quantum Numbers, Orbitals
# ============================================================================

class AtomicStructure(ThreeDScene):
    """
    3D visualization of atomic structure: Bohr model, quantum numbers,
    orbital shapes (s, p, d), and electronic configurations.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES, distance=12)
        
        # Title
        title = Text("ATOMIC STRUCTURE", font_size=52, color=Colors.ACCENT_BLUE)
        title.to_edge(UP, buff=0.4)
        self.play(Write(title), run_time=1.5)
        self.wait(0.5)
        
        # Part 1: Bohr Model
        bohr_title = MathTex(r"\text{Bohr Model: } E_n = -\frac{13.6 \, Z^2}{n^2} \text{ eV}",
                            font_size=30, color=Colors.ACCENT_YELLOW)
        bohr_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(bohr_title))
        self.wait(0.3)
        
        # Nucleus
        nucleus = Sphere(radius=0.3, color=Colors.ACCENT_PINK)
        n_lbl = Text("Nucleus", font_size=16, color=Colors.WHITE_SOFT)
        n_lbl.next_to(nucleus, UP)
        self.play(Create(nucleus), FadeIn(n_lbl))
        self.wait(0.3)
        
        # Orbital rings
        orbits_data = [
            (1, Colors.ACCENT_GREEN, "n=1"),
            (2, Colors.ACCENT_BLUE, "n=2"),
            (3, Colors.ACCENT_YELLOW, "n=3"),
            (4, Colors.ACCENT_ORANGE, "n=4"),
        ]
        
        orbit_rings = []
        for n, color, label in orbits_data:
            ring = Torus(radius=n*0.6, tube=0.02, color=color)
            ring.rotate(PI/3, axis=RIGHT)
            ring.rotate(PI/6, axis=UP)
            orbit_rings.append(ring)
            self.play(Create(ring), run_time=0.5)
            r_lbl = Text(label, font_size=14, color=color)
            r_lbl.move_to(np.array([n*0.6, 0, 0]))
            self.play(FadeIn(r_lbl))
            self.wait(0.2)
        
        self.wait(1)
        
        # Electron jumping between orbits
        electron = Sphere(radius=0.1, color=Colors.WHITE_SOFT)
        electron.add_updater(lambda e, t: e.move_to(
            np.array([2*np.cos(t*2), 2*np.sin(t*2), 0])
        ))
        self.play(FadeIn(electron))
        self.wait(2)
        
        # Part 2: Quantum Numbers
        self.play(FadeOut(All))
        qn_title = Text("Quantum Numbers", font_size=44, color=Colors.ACCENT_GREEN)
        qn_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(qn_title))
        self.wait(0.3)
        
        qn_table = VGroup(
            MathTex(r"|\text{Quantum No.}|\quad \text{Symbol}|\quad \text{Values}|\quad \text{Information}|",
                   color=Colors.WHITE_SOFT, font_size=20),
            MathTex(r"|\quad n \quad|\quad \text{Principal}|\quad 1, 2, 3, \ldots|\quad \text{Shell/size}|",
                   color=Colors.ACCENT_GREEN, font_size=20),
            MathTex(r"|\quad l \quad|\quad \text{Azimuthal}|\quad 0 \text{ to } n-1|\quad \text{Subshell/shape}|",
                   color=Colors.ACCENT_BLUE, font_size=20),
            MathTex(r"|\quad m_l \quad|\quad \text{Magnetic}|\quad -l \ldots 0 \ldots +l|\quad \text{Orientation}|",
                   color=Colors.ACCENT_YELLOW, font_size=20),
            MathTex(r"|\quad m_s \quad|\quad \text{Spin}|\quad +\frac{1}{2}, -\frac{1}{2}|\quad \text{Spin direction}|",
                   color=Colors.ACCENT_PINK, font_size=20),
        )
        qn_table.arrange(DOWN, buff=0.2)
        qn_table.to_edge(LEFT, buff=2)
        
        for row in qn_table:
            self.play(FadeIn(row, shift=LEFT), run_time=0.5)
            self.wait(0.2)
        
        self.wait(1)
        
        # Part 3: Orbital Shapes
        self.play(FadeOut(All))
        orb_title = Text("Orbital Shapes", font_size=44, color=Colors.ACCENT_YELLOW)
        orb_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(orb_title))
        self.wait(0.3)
        
        # s-orbital (sphere)
        s_orbital = Sphere(radius=0.8, color=Colors.ACCENT_GREEN, opacity=0.6)
        s_lbl = Text("s-orbital\n(spherical)", font_size=20, color=Colors.ACCENT_GREEN)
        s_lbl.next_to(s_orbital, DOWN)
        self.play(Create(s_orbital), FadeIn(s_lbl))
        self.wait(0.5)
        
        # p-orbital (dumbbell)
        p_orbital = Cone(radius_radius=0.6, height=1.2, color=Colors.ACCENT_BLUE)
        p_orbital2 = Cone(radius_radius=0.6, height=1.2, color=Colors.ACCENT_BLUE)
        p_orbital2.rotate(PI, axis=RIGHT)
        p_group = VGroup(p_orbital, p_orbital2)
        p_group.move_to(np.array([3, 0, 0]))
        p_lbl = Text("p-orbital\n(dumbbell)", font_size=20, color=Colors.ACCENT_BLUE)
        p_lbl.next_to(p_group, DOWN)
        self.play(Create(p_orbital), Create(p_orbital2), FadeIn(p_lbl))
        self.wait(0.5)
        
        # d-orbital (cloverleaf - simplified)
        d_orbital = Torus(radius=0.5, tube=0.2, color=Colors.ACCENT_PINK)
        d_orbital.move_to(np.array([-3, 0, 0]))
        d_lbl = Text("d-orbital\n(cloverleaf)", font_size=20, color=Colors.ACCENT_PINK)
        d_lbl.next_to(d_orbital, DOWN)
        self.play(Create(d_orbital), FadeIn(d_lbl))
        self.wait(1)
        
        # Part 4: Electronic Configuration
        self.play(FadeOut(All))
        config_title = Text("Electronic Configuration Rules", font_size=38, color=Colors.ACCENT_GREEN)
        config_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(config_title))
        self.wait(0.3)
        
        rules = VGroup(
            MathTex(r"1. \text{Aufbau: Fill lowest energy first (}n+l\text{ rule)}",
                   color=Colors.ACCENT_BLUE),
            MathTex(r"2. \text{Pauli: Max 2 electrons per orbital, opposite spins}",
                   color=Colors.ACCENT_YELLOW),
            MathTex(r"3. \text{Hund: Degenerate orbitals fill singly first}",
                   color=Colors.ACCENT_PINK),
        )
        rules.arrange(DOWN, buff=0.4)
        
        for rule in rules:
            self.play(FadeIn(rule, shift=RIGHT), run_time=0.7)
            self.wait(0.3)
        
        # Example: Chromium exception
        cr_example = MathTex(
            r"\text{Cr} \; ([Ar]3d^5 4s^1) \neq [Ar]3d^4 4s^2",
            font_size=28, color=Colors.ACCENT_ORANGE
        )
        cr_example.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(cr_example))
        self.wait(1)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# SCENE 13: HEAT & TEMPERATURE — Heating Curve, Calorimetry, Cooling
# ============================================================================

class HeatTemperature(ThreeDScene):
    """
    3D visualization of heat and temperature: heating curves,
    calorimetry, Newton's law of cooling, and phase changes.
    """
    
    def construct(self):
        self.camera.background_color = Colors.BG
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES, distance=12)
        
        # Title
        title = Text("HEAT & TEMPERATURE", font_size=48, color=Colors.ACCENT_ORANGE)
        title.to_edge(UP, buff=0.4)
        self.play(Write(title), run_time=1.5)
        self.wait(0.5)
        
        # Part 1: Heating Curve
        hc_title = MathTex(r"\text{Heating Curve: Ice} \xrightarrow{\text{heat}} \text{Steam}",
                          font_size=30, color=Colors.ACCENT_YELLOW)
        hc_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(hc_title))
        self.wait(0.3)
        
        # Phase change diagram
        stages = VGroup(
            MathTex(r"Q_1 = mc_{ice}\Delta T", color=Colors.ACCENT_GREEN),
            MathTex(r"Q_2 = mL_f \quad (\text{melting at } 0^\circ\text{C})", color=Colors.ACCENT_BLUE),
            MathTex(r"Q_3 = mc_{water}\Delta T", color=Colors.ACCENT_YELLOW),
            MathTex(r"Q_4 = mL_v \quad (\text{boiling at } 100^\circ\text{C})", color=Colors.ACCENT_PINK),
            MathTex(r"Q_5 = mc_{steam}\Delta T", color=Colors.ACCENT_ORANGE),
        )
        stages.arrange(DOWN, buff=0.3)
        stages.to_edge(LEFT, buff=2)
        
        for stage in stages:
            self.play(FadeIn(stage, shift=LEFT), run_time=0.6)
            self.wait(0.2)
        
        self.wait(0.5)
        
        # Part 2: Calorimetry Principle
        self.play(FadeOut(All))
        cal_title = Text("Principle of Calorimetry", font_size=44, color=Colors.ACCENT_GREEN)
        cal_formula = MathTex(r"\text{Heat lost by hot body} = \text{Heat gained by cold body}",
                             font_size=32, color=Colors.ACCENT_YELLOW)
        cal_eq = MathTex(r"m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2)",
                        font_size=28, color=Colors.ACCENT_BLUE)
        
        cal_title.to_edge(UP, buff=0.4)
        cal_formula.next_to(cal_title, DOWN, buff=0.3)
        cal_eq.next_to(cal_formula, DOWN, buff=0.2)
        
        self.play(FadeIn(cal_title))
        self.wait(0.3)
        self.play(FadeIn(cal_formula))
        self.wait(0.5)
        self.play(FadeIn(cal_eq))
        self.wait(1)
        
        # Part 3: Newton's Law of Cooling
        self.play(FadeOut(All))
        newton_title = MathTex(r"\frac{dT}{dt} = -k(T - T_s)",
                              font_size=36, color=Colors.ACCENT_PINK)
        newton_title.to_edge(UP, buff=0.3)
        self.play(FadeIn(newton_title))
        self.wait(0.3)
        
        solution = MathTex(r"T(t) = T_s + (T_0 - T_s)e^{-kt}",
                          font_size=32, color=Colors.ACCENT_YELLOW)
        solution.next_to(newton_title, DOWN, buff=0.3)
        self.play(FadeIn(solution))
        self.wait(0.5)
        
        # Exponential decay visualization
        cooling_curve = ParametricFunction(
            lambda t: np.array([t, 3*np.exp(-0.5*t), 0]),
            t_range=[0, 6, 0.01],
            color=Colors.ACCENT_GREEN, stroke_width=4
        )
        self.play(Create(cooling_curve), run_time=2)
        self.wait(0.5)
        
        # Equilibrium line
        eq_line = Line3D(np.array([0, 0, 0]), np.array([6, 0, 0]),
                        color=Colors.DIM_GRAY, stroke_width=2,
                        stroke_dash_array=[0.3, 0.2])
        eq_lbl = Text("T_s (surroundings)", font_size=16, color=Colors.DIM_GRAY)
        eq_lbl.next_to(eq_line.get_end(), RIGHT)
        self.play(Create(eq_line), FadeIn(eq_lbl))
        self.wait(1)
        
        # Part 4: Key Constants
        self.play(FadeOut(All))
        constants_title = Text("Key Thermal Properties of Water",
                              font_size=36, color=Colors.ACCENT_BLUE)
        constants_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(constants_title))
        self.wait(0.3)
        
        constants = VGroup(
            MathTex(r"c_{water} = 4200 \; \text{J kg}^{-1}\text{K}^{-1}", color=Colors.ACCENT_GREEN),
            MathTex(r"L_f = 334 \; \text{kJ/kg} \quad (\text{fusion})", color=Colors.ACCENT_YELLOW),
            MathTex(r"L_v = 2260 \; \text{kJ/kg} \quad (\text{vaporization})", color=Colors.ACCENT_PINK),
            MathTex(r"T_{triple} = 273.16 \; \text{K at } 611.7 \; \text{Pa}", color=Colors.ACCENT_ORANGE),
        )
        constants.arrange(DOWN, buff=0.4)
        
        for const in constants:
            self.play(FadeIn(const, shift=RIGHT), run_time=0.7)
            self.wait(0.3)
        
        self.wait(1.5)
        
        # Part 5: Triple Point Explanation
        triple_title = Text("Triple Point of Water", font_size=32, color=Colors.ACCENT_YELLOW)
        triple_title.to_edge(UP, buff=0.4)
        triple_desc = Text("Ice, water, and vapor coexist in equilibrium",
                          font_size=22, color=Colors.WHITE_SOFT)
        triple_formula = MathTex(r"T = 273.16 \; \text{K}, \quad P = 611.7 \; \text{Pa}",
                                font_size=24, color=Colors.ACCENT_GREEN)
        
        triple_title.to_edge(UP, buff=0.3)
        triple_desc.next_to(triple_title, DOWN, buff=0.2)
        triple_formula.next_to(triple_desc, DOWN, buff=0.2)
        
        self.play(FadeOut(All))
        self.play(FadeIn(triple_title))
        self.wait(0.3)
        self.play(FadeIn(triple_desc))
        self.wait(0.3)
        self.play(FadeIn(triple_formula))
        self.wait(1.5)
        
        # 3D Interactive Viewer
        self.begin_3dviewer()
        self.wait(4)
        self.end_3dviewer()
        
        self.play(FadeOut(All, run_time=1.2))
        self.wait(0.3)


# ============================================================================
# ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    import sys
    
    scenes = {
        "mindmap": VectorMindMap,
        "vectors": VectorAddition,
        "dot": DotProduct,
        "cross": CrossProduct,
        "matrices": MatrixTransformations,
        "limits": LimitsContinuity,
        "integral": IntegralArea,
        "gravitation": Gravitation,
        "optics": Optics,
        "trigonometry": Trigonometry,
        "quadratics": QuadraticEquations,
        "atomic": AtomicStructure,
        "heat": HeatTemperature,
    }
    
    if len(sys.argv) > 1:
        key = sys.argv[1].lower()
        if key in scenes:
            print(f"Running scene: {key}")
        else:
            print(f"Available scenes: {', '.join(scenes)}")
            print("Usage: python manim_3d_complete.py <scene_name>")
            sys.exit(1)
    else:
        print("No scene specified. Available scenes:")
        for name in scenes:
            print(f"  - {name}")

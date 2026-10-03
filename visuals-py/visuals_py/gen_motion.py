"""Motion-graphics generators — choreographed multi-object keyframe animations.

Where ``gen_sim`` is "physics truth", motion graphics are *designed* visual
sequences (rotating vectors, interference, Lissajous figures, EM wave fronts)
that look good and read clearly. Every frame is a list of positioned objects
the browser interpolates between.
"""
from __future__ import annotations

import numpy as np

from .assets import Frame, FrameObject, SceneSpec, VisualAsset


def _circle_points(cx: float, cy: float, r: float, n: int = 48, z: float = 0.0) -> list:
    a = np.linspace(0, 2 * np.pi, n + 1)
    pts = []
    for t in a:
        pts.extend([cx + r * np.cos(t), cy + r * np.sin(t), z])
    return pts


def rotating_vectors() -> VisualAsset:
    """Two counter-rotating vectors + resultant — classic phasor motion graphic."""
    n = 120
    w1, w2 = 1.0, 1.6
    A1, A2 = 3.0, 2.2
    frames = []
    for i in range(n):
        t = i * 2 * np.pi / (n * 4)  # slow, 4 full turns
        a1, a2 = w1 * t, -w2 * t
        p1x, p1y = A1 * np.cos(a1), A1 * np.sin(a1)
        p2x, p2y = p1x + A2 * np.cos(a2), p1y + A2 * np.sin(a2)
        frames.append(Frame(t=float(t), objects=[
            FrameObject(type="line", position=[0, 0, 0], points=_circle_points(0, 0, A1), color="#334155"),
            FrameObject(type="arrow", position=[0, 0, 0], target=[p1x, p1y, 0], color="#3B82F6", radius=0.1),
            FrameObject(type="arrow", position=[p1x, p1y, 0], target=[p2x, p2y, 0], color="#10B981", radius=0.1),
            FrameObject(type="line", position=[0, 0, 0], points=[0, 0, 0, p2x, p2y, 0], color="#F59E0B"),
            FrameObject(type="sphere", position=[p2x, p2y, 0], color="#F59E0B", radius=0.25),
        ]))
    return VisualAsset(
        id="math-motion-phaser",
        kind="motion",
        title="Rotating Phasors (Vector Addition)",
        description="Two counter-rotating phasors with a live resultant — the motion-graphic behind AC / superposition.",
        subject="mathematics",
        unit="Unit: Vectors",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="mathematics"),
        frames=frames,
        fps=30,
        meta={"formula": "R = A1·e^{iω1t} + A2·e^{iω2t}"},
    )


def interference() -> VisualAsset:
    """Two overlapping circular wavefronts (Huygens) as expanding rings."""
    n = 60
    frames = []
    for i in range(n):
        phase = i / n
        rings = []
        for src, sx, sy in [("#3B82F6", -3.0, 0.0), ("#10B981", 3.0, 0.0)]:
            # up to 3 concurrent wavefronts
            for k in range(3):
                r = ((phase + k / 3) % 1.0) * 7.0
                rings.append(FrameObject(type="line", position=[sx, sy, 0],
                                         points=_circle_points(sx, sy, r, z=0.0), color=src))
        frames.append(Frame(t=float(phase), objects=rings))
    return VisualAsset(
        id="ph-motion-interference",
        kind="motion",
        title="Wave Interference (Two Sources)",
        description="Huygens wavefronts from two point sources; where rings cross, constructive interference.",
        subject="physics",
        unit="Unit: Wave Optics",
        scene=SceneSpec(camera_position=[0, 0, 16], grid=False, subject="physics"),
        frames=frames,
        fps=30,
        meta={"formula": "Δr = mλ (constructive)"},
    )


def lissajous() -> VisualAsset:
    """A Lissajous curve (δ-swept) with a moving tracer — math motion graphic."""
    n = 240
    a, b, delta = 3, 2, 0.0
    T = 2 * np.pi
    frames = []
    trace_pts: list = []
    for i in range(n):
        t = T * i / n
        x = 4.0 * np.sin(a * t + delta)
        y = 4.0 * np.sin(b * t)
        trace_pts.extend([float(x), float(y), 0.0])
        if len(trace_pts) > 200 * 3:
            trace_pts = trace_pts[-200 * 3:]
        frames.append(Frame(t=float(t), objects=[
            FrameObject(type="line", position=[0.0, 0.0, 0.0], points=list(trace_pts), color="#8B5CF6"),
            FrameObject(type="sphere", position=[float(x), float(y), 0.0], color="#F59E0B", radius=0.3),
        ]))
    return VisualAsset(
        id="math-motion-lissajous",
        kind="motion",
        title="Lissajous Figure (3:2)",
        description="x = 4·sin(3t), y = 4·sin(2t) traced with a moving point — frequency-ratio pattern.",
        subject="mathematics",
        unit="Unit: Oscillations",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, axes=True, subject="mathematics"),
        frames=frames,
        fps=30,
        meta={"formula": "x = A sin(at+δ), y = B sin(bt)"},
    )


def em_wave() -> VisualAsset:
    """A travelling transverse EM wave (E & B out of phase) as a ribbon of points."""
    n = 100
    k, w = 1.0, 1.5
    frames = []
    for i in range(n):
        t = i * 0.1
        xs = np.linspace(-6, 6, 60)
        e_pts, b_pts = [], []
        for x in xs:
            ez = 3.0 * np.sin(k * x - w * t)
            bz = 3.0 * np.sin(k * x - w * t + np.pi / 2)
            e_pts.extend([float(x), ez, 0.0])
            b_pts.extend([float(x), bz, 2.0])
        frames.append(Frame(t=float(t), objects=[
            FrameObject(type="line", position=[-6, 0, 0], points=e_pts, color="#EF4444"),
            FrameObject(type="line", position=[-6, 0, 2], points=b_pts, color="#3B82F6"),
        ]))
    return VisualAsset(
        id="ph-motion-emwave",
        kind="motion",
        title="Transverse EM Wave (E ⊥ B)",
        description="Electric and magnetic fields oscillating in phase with each other, perpendicular to propagation.",
        subject="physics",
        unit="Unit: EM Waves",
        scene=SceneSpec(camera_position=[0, 4, 12], grid=False, axes=True, subject="physics"),
        frames=frames,
        fps=30,
        meta={"formula": "E, B in phase; c = E/B"},
    )

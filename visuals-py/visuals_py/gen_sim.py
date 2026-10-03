"""Physics simulation generators — numerical integration in Python, keyframed for the browser.

The browser plays these back by interpolating between frames and building
three.js objects (sphere / trail / arrow) at each step. All physics happens in
Python (numpy / closed-form), so the values are authoritative and reproducible.
"""
from __future__ import annotations

import numpy as np

from .assets import Frame, FrameObject, SceneSpec, VisualAsset


def _resample(t: np.ndarray, xs: list, n: int):
    """Evenly pick `n` samples over the index range, keeping t + arrays aligned."""
    idx = np.linspace(0, len(xs) - 1, n).astype(int)
    t_pick = t[idx]
    picked = [a[idx] for a in xs]
    return t_pick, picked


def projectile() -> VisualAsset:
    v0, g = 18.0, 9.81
    angle = np.deg2rad(55.0)
    tmax = 2 * v0 * np.sin(angle) / g
    n = 240
    t = np.linspace(0, tmax, n)
    vx = v0 * np.cos(angle)
    vy = v0 * np.sin(angle)
    x = vx * t
    y = vy * t - 0.5 * g * t**2
    # Fit the trajectory into the ~12 x 8 world box while keeping its shape.
    x = x * (12.0 / np.max(x) if np.max(x) else 1.0)
    y = y * (8.0 / np.max(y) if np.max(y) else 1.0)

    frames = []
    for i in range(n):
        px, py = float(x[i]), float(y[i])
        vx_i, vy_i = vx, float(vy - g * t[i])
        frames.append(Frame(t=float(t[i]), objects=[
            FrameObject(type="sphere", position=[px, py, 0.0], color="#EF4444", radius=0.35),
            FrameObject(type="arrow", position=[px, py, 0.0],
                        target=[px + vx_i * 0.15, py + vy_i * 0.15, 0.0], color="#F59E0B"),
        ]))

    return VisualAsset(
        id="ph-sim-projectile",
        kind="sim",
        title="Projectile Motion",
        description="Parabolic trajectory with live velocity vector; v0=18 m/s, θ=55°, g=9.81 m/s².",
        subject="physics",
        unit="Unit: Kinematics",
        scene=SceneSpec(camera_position=[0, 6, 16], subject="physics"),
        frames=frames,
        fps=30,
        meta={"formula": "y = (v0 sinθ)t − ½gt²", "range_m": float(tmax * vx), "v0": v0, "angle_deg": 55.0},
    )


def pendulum() -> VisualAsset:
    L, g, theta0 = 1.0, 9.81, np.deg2rad(60.0)
    n = 300
    dt = 1 / 120
    # Full nonlinear pendulum via RK-ish Euler for the keyframe path
    theta = np.zeros(n)
    omega = np.zeros(n)
    th, om = theta0, 0.0
    for i in range(n):
        alpha = -(g / L) * np.sin(th)
        om += alpha * dt
        th += om * dt
        theta[i], omega[i] = th, om

    # Resample to ~150 keyframes
    n_k = 150
    k_idx = np.linspace(0, n - 1, n_k).astype(int)
    frames = []
    for i in k_idx:
        x = L * np.sin(theta[i]) * 4.0
        y = -L * np.cos(theta[i]) * 4.0 + 4.0
        frames.append(Frame(t=float(i * dt), objects=[
            FrameObject(type="line", position=[0.0, 4.0, 0.0], points=[0.0, 4.0, 0.0, float(x), float(y), 0.0],
                        color="#64748B"),
            FrameObject(type="sphere", position=[float(x), float(y), 0.0], color="#3B82F6", radius=0.45),
        ]))

    T = 2 * np.pi * np.sqrt(L / g)
    return VisualAsset(
        id="ph-sim-pendulum",
        kind="sim",
        title="Nonlinear Pendulum",
        description="Full (sinθ) pendulum, L=1 m, θ0=60°. Period readout uses the small-angle value.",
        subject="physics",
        unit="Unit: Oscillations",
        scene=SceneSpec(camera_position=[0, 5, 12], subject="physics"),
        frames=frames,
        fps=30,
        meta={"formula": "α = −(g/L)·sinθ", "period_s": float(T)},
    )


def simple_harmonic() -> VisualAsset:
    A, w0 = 4.0, 2.0
    n, dt = 200, 1 / 60
    omega = np.arange(n) * w0 * dt
    x = A * np.cos(omega)
    v = -A * w0 * np.sin(omega)
    k_idx = np.linspace(0, n - 1, 120).astype(int)
    frames = []
    for i in k_idx:
        frames.append(Frame(t=float(i * dt), objects=[
            FrameObject(type="sphere", position=[float(x[i]), 0.0, 0.0], color="#3B82F6", radius=0.4),
            FrameObject(type="arrow", position=[float(x[i]), 0.0, 0.0],
                        target=[float(x[i] + v[i] * 0.2), 0.0, 0.0], color="#F59E0B"),
        ]))
    return VisualAsset(
        id="ph-sim-shm",
        kind="sim",
        title="Simple Harmonic Motion",
        description="x = A·cos(ωt) with velocity vector; A=4, ω=2 rad/s.",
        subject="physics",
        unit="Unit: Oscillations",
        scene=SceneSpec(camera_position=[0, 4, 14], subject="physics"),
        frames=frames,
        fps=30,
        meta={"formula": "x = A·cos(ωt)", "period_s": float(2 * np.pi / w0)},
    )

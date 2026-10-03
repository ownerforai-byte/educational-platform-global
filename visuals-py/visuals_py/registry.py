"""Generator registry — the single map from asset id to factory function."""
from __future__ import annotations

from typing import Callable, Dict

from .assets import VisualAsset
from .gen_3d import sine_surface, paraboloid, gaussian_blob
from .gen_sim import projectile, pendulum, simple_harmonic
from .gen_motion import rotating_vectors, interference, lissajous, em_wave

GENERATORS: Dict[str, Callable[[], VisualAsset]] = {
    # 3D surfaces
    "ph-surface-wave": sine_surface,
    "math-surface-paraboloid": paraboloid,
    "bio-surface-terrain": gaussian_blob,
    # simulations
    "ph-sim-projectile": projectile,
    "ph-sim-pendulum": pendulum,
    "ph-sim-shm": simple_harmonic,
    # motion graphics
    "math-motion-phaser": rotating_vectors,
    "ph-motion-interference": interference,
    "math-motion-lissajous": lissajous,
    "ph-motion-emwave": em_wave,
}


def generate_one(asset_id: str) -> VisualAsset:
    if asset_id not in GENERATORS:
        raise KeyError(f"unknown asset id: {asset_id}. Known: {sorted(GENERATORS)}")
    return GENERATORS[asset_id]()


def generate_all() -> list:
    return [fn() for fn in GENERATORS.values()]

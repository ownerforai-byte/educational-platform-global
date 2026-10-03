"""Generator registry — the single map from asset id to factory function."""
from __future__ import annotations

from typing import Callable, Dict

from .assets import VisualAsset
from .gen_3d import sine_surface, paraboloid, gaussian_blob
from .gen_sim import projectile, pendulum, simple_harmonic
from .gen_motion import rotating_vectors, interference, lissajous, em_wave
from . import gen_bio

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
    # biology unit scenes (Class 11 + Class 12, one per NEB unit)
    "bio-py-cell": gen_bio.bio_cell,
    "bio-py-flower": gen_bio.bio_flower,
    "bio-py-bacteria": gen_bio.bio_bacteria,
    "bio-py-foodweb": gen_bio.bio_foodweb,
    "bio-py-vegetation": gen_bio.bio_vegetation,
    "bio-py-scope": gen_bio.bio_scope,
    "bio-py-phylogeny": gen_bio.bio_phylogeny,
    "bio-py-worm": gen_bio.bio_worm,
    "bio-py-migration": gen_bio.bio_migration,
    "bio-py-reserve": gen_bio.bio_reserve,
    "bio-py-dna": gen_bio.bio_dna,
    "bio-py-antibody": gen_bio.bio_antibody,
    "bio-py-crop": gen_bio.bio_crop,
    "bio-py-fermenter": gen_bio.bio_fermenter,
    "bio-py-pcr": gen_bio.bio_pcr,
    "bio-py-insulin": gen_bio.bio_insulin,
    "bio-py-logistic": gen_bio.bio_logistic,
    "bio-py-hotspot": gen_bio.bio_hotspot,
    "bio-py-greenhouse": gen_bio.bio_greenhouse,
}


def generate_one(asset_id: str) -> VisualAsset:
    if asset_id not in GENERATORS:
        raise KeyError(f"unknown asset id: {asset_id}. Known: {sorted(GENERATORS)}")
    return GENERATORS[asset_id]()


def generate_all() -> list:
    return [fn() for fn in GENERATORS.values()]

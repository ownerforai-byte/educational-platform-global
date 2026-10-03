"""3D surface / solid generators (static meshes rendered by three.js)."""
from __future__ import annotations

import numpy as np

from .assets import FrameObject, Frame, MeshSpec, SceneSpec, VisualAsset


def _grid_mesh(
    name: str,
    z: np.ndarray,
    color: str,
    res_x: float = 0.5,
    res_z: float = 0.5,
    x_min: float = -5.0,
    x_max: float = 5.0,
    z_min: float = -5.0,
    z_max: float = 5.0,
    material=None,
) -> MeshSpec:
    """Triangulate a height field z[xi, zi] into a MeshSpec."""
    rows, cols = z.shape
    xi = np.linspace(x_min, x_max, cols)
    zi = np.linspace(z_min, z_max, rows)
    XX, ZZ = np.meshgrid(xi, zi, indexing="ij")

    positions = []
    for i in range(rows):
        for j in range(cols):
            positions.append((XX[i, j], float(z[i, j]), ZZ[i, j]))
    positions_flat = [v for p in positions for v in p]

    idx = []
    for i in range(rows - 1):
        for j in range(cols - 1):
            a = i * cols + j
            b = i * cols + (j + 1)
            c = (i + 1) * cols + j
            d = (i + 1) * cols + (j + 1)
            idx.extend([a, c, b, b, c, d])

    return MeshSpec(
        name=name,
        positions=positions_flat,
        indices=idx,
        normals=None,  # let three.js compute normals
        color=color,
        wireframe=False,
        material=material or {"metalness": 0.15, "roughness": 0.35},
    )


def sine_surface() -> VisualAsset:
    """A damped travelling-wave surface — the canonical "surface3d" demo."""
    g = 96
    x = np.linspace(-5, 5, g)
    z = np.linspace(-5, 5, g)
    X, Z = np.meshgrid(x, z, indexing="ij")
    R = np.hypot(X, Z)
    Y = 1.5 * np.sin(R * 1.3) * np.exp(-R / 6.0) + 0.4 * np.sin(X * 1.7) * np.sin(Z * 1.7)

    return VisualAsset(
        id="ph-surface-wave",
        kind="surface3d",
        title="Damped Wave Surface",
        description="A damped radial travelling wave superimposed on a grid sine field.",
        subject="physics",
        unit="Unit: Waves",
        scene=SceneSpec(camera_position=[9, 8, 9], subject="physics"),
        meshes=[_grid_mesh("surface", Y, color="#3B82F6", material={"metalness": 0.3, "roughness": 0.25})],
        meta={"formula": "y = 1.5·sin(1.3·r)·e^(−r/6) + 0.4·sin(1.7x)·sin(1.7z)"},
    )


def paraboloid() -> VisualAsset:
    g = 72
    x = np.linspace(-4, 4, g)
    z = np.linspace(-4, 4, g)
    X, Z = np.meshgrid(x, z, indexing="ij")
    Y = 0.12 * (X**2 + Z**2) - 3.0

    return VisualAsset(
        id="math-surface-paraboloid",
        kind="surface3d",
        title="Paraboloid of Revolution",
        description="The paraboloid y = 0.12(x²+z²)−3 with a focal-depth readout.",
        subject="mathematics",
        unit="Unit: 3D Geometry",
        scene=SceneSpec(camera_position=[8, 6, 8], subject="mathematics"),
        meshes=[_grid_mesh("paraboloid", Y, color="#8B5CF6")],
        meta={"formula": "y = 0.12·(x² + z²) − 3"},
    )


def gaussian_blob() -> VisualAsset:
    g = 88
    x = np.linspace(-5, 5, g)
    z = np.linspace(-5, 5, g)
    X, Z = np.meshgrid(x, z, indexing="ij")
    Y = 2.2 * np.exp(-((X + 1.5) ** 2 + (Z - 1.5) ** 2) / 4.0) + 1.2 * np.exp(-((X - 2) ** 2 + (Z + 2) ** 2) / 2.5)

    return VisualAsset(
        id="bio-surface-terrain",
        kind="surface3d",
        title="Gaussian Terrain (Height-Field)",
        description="Two Gaussian peaks combined — a height-field demo for biology terrain / cell-surface work.",
        subject="biology",
        unit="Unit: Cell Biology",
        scene=SceneSpec(camera_position=[8, 6, 8], subject="biology"),
        meshes=[_grid_mesh("terrain", Y, color="#22C55E")],
        meta={"formula": "sum of two 2D Gaussians"},
    )

"""Optional static image export (PNG / GIF) for the same assets.

Kept separate so the core JSON pipeline never requires matplotlib/Pillow.
``make_images`` is the callback passed to ``VisualAsset.write`` when
``--images`` is requested.
"""
from __future__ import annotations

import shutil
from pathlib import Path
from typing import Callable, Optional

from .assets import VisualAsset

try:
    import numpy as np
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d import Axes3D  # noqa: F401
    HAS_MPL = True
except Exception:  # pragma: no cover - optional dep
    HAS_MPL = False

try:
    import imageio  # type: ignore
    HAS_GIF = True
except Exception:
    HAS_GIF = False


def _scene_fig(asset: VisualAsset):
    fig = plt.figure(figsize=(7, 5))
    ax = fig.add_subplot(111, projection="3d")
    for m in asset.meshes:
        pos = np.array(m.positions).reshape(-1, 3)
        idx = m.indices
        if len(pos):
            x, y, z = pos[:, 0], pos[:, 1], pos[:, 2]
            for i in range(0, len(idx), 3):
                a, b, c = pos[idx[i]], pos[idx[i + 1]], pos[idx[i + 2]]
                ax.plot([a[0], b[0], c[0], a[0]], [a[1], b[1], c[1], a[1]],
                        [a[2], b[2], c[2], a[2]], color=m.color, alpha=0.35, linewidth=0.5)
    return fig, ax


def _anim_fig(asset: VisualAsset, frame_idx: int):
    fig = plt.figure(figsize=(7, 5))
    ax = fig.add_subplot(111, projection="3d")
    fr = asset.frames[frame_idx]
    for o in fr.objects:
        p = o.position
        if o.type == "sphere":
            ax.scatter([p[0]], [p[1]], [p[2]], s=120, color=o.color, depthshade=False)
        elif o.type in ("line",) and o.points:
            pts = np.array(o.points).reshape(-1, 3)
            ax.plot(pts[:, 0], pts[:, 1], pts[:, 2], color=o.color, linewidth=1.2)
        elif o.type == "arrow" and o.target:
            ax.quiver(p[0], p[1], p[2], o.target[0] - p[0], o.target[1] - p[1],
                      o.target[2] - p[2], color=o.color, arrow_length_ratio=0.3)
    ax.set_title(f"{asset.title} — frame {frame_idx}/{len(asset.frames)-1}")
    return fig, ax


def make_images(asset: VisualAsset, out_dir: Path) -> Optional[Path]:
    """Render a static PNG (surface) or a short GIF (frames) next to the JSON."""
    if not HAS_MPL:
        return None
    out_dir.mkdir(parents=True, exist_ok=True)
    if asset.kind == "surface3d" and asset.meshes:
        fig, _ = _scene_fig(asset)
        out = out_dir / f"{asset.id}.png"
        fig.savefig(out, dpi=140, bbox_inches="tight")
        plt.close(fig)
        return out
    # animation -> gif if possible, else first/mid/last pngs
    if asset.frames:
        if HAS_GIF:
            imgs = []
            for i in [0, len(asset.frames) // 2, len(asset.frames) - 1]:
                fig, _ = _anim_fig(asset, i)
                imgs.append(np.array(fig.canvas.renderer))
                plt.close(fig)
            out = out_dir / f"{asset.id}.gif"
            imageio.mimwrite(str(out), imgs, duration=120, loop=0)
            return out
        out = out_dir / f"{asset.id}.png"
        fig, _ = _anim_fig(asset, len(asset.frames) // 2)
        fig.savefig(out, dpi=140, bbox_inches="tight")
        plt.close(fig)
        return out
    return None


def available() -> dict:
    return {"matplotlib": HAS_MPL, "imageio": HAS_GIF}

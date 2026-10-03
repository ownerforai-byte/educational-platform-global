"""
Asset schema + writer for visuals-py.

Every generator returns an *asset dict* (plain JSON-serialisable data) that is
written to ``frontend/public/data/visuals/py/<id>.json`` and indexed in
``manifest.json``. The Next.js renderer loads these via ``loadData``.

The schema is deliberately flat so the browser can build three.js geometry
directly without a second parse layer.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional

REPO_ROOT = Path(__file__).resolve().parent.parent.parent  # C:\\...\\rn
DEFAULT_OUT_DIR = REPO_ROOT / "frontend" / "public" / "data" / "visuals" / "py"

GENERATOR_TAG = "visuals-py@0.1.0"
REQUIRED_NP_LIB = "numpy"


# ---------------------------------------------------------------------------
# Scene / object primitives (JSON-friendly)
# ---------------------------------------------------------------------------
@dataclass
class SceneSpec:
    """Parameters the three.js rig reads to set up a scene."""
    camera_position: List[float] = field(default_factory=lambda: [8, 7, 11])
    background: int = 0x0F172A
    grid: bool = True
    axes: bool = False
    subject: Optional[str] = None  # "physics" | "chemistry" | ...

    def to_json(self) -> Dict[str, Any]:
        return {
            "cameraPosition": self.camera_position,
            "background": self.background,
            "grid": self.grid,
            "axes": self.axes,
            **({"subject": self.subject} if self.subject else {}),
        }


@dataclass
class MeshSpec:
    """A static triangle mesh (surface / solid)."""
    name: str
    positions: List[float]          # flat [x,y,z, x,y,z, ...]
    indices: List[int]
    normals: Optional[List[float]]  # flat, or None to auto-compute
    color: str = "#3B82F6"
    wireframe: bool = False
    material: Dict[str, float] = field(default_factory=lambda: {"metalness": 0.15, "roughness": 0.35})

    def to_json(self) -> Dict[str, Any]:
        d: Dict[str, Any] = {
            "name": self.name,
            "positions": positions_rounded(self.positions),
            "indices": self.indices,
            "color": self.color,
            "wireframe": self.wireframe,
            "material": self.material,
        }
        if self.normals is not None:
            d["normals"] = positions_rounded(self.normals)
        return d


def _round3(x: float) -> float:
    return round(float(x), 4)


def positions_rounded(flat: List[float]) -> List[float]:
    """Round a flat coordinate list to keep JSON small but visually lossless."""
    return [_round3(v) for v in flat]


@dataclass
class FrameObject:
    """A single entity at one moment in a simulation / motion keyframe."""
    type: str                       # "sphere" | "box" | "trail" | "arrow" | "line"
    position: List[float] = field(default_factory=lambda: [0.0, 0.0, 0.0])
    scale: float = 1.0
    color: str = "#EF4444"
    points: Optional[List[float]] = None   # flat, for trail/line
    target: Optional[List[float]] = None   # arrow end
    radius: Optional[float] = None

    def to_json(self) -> Dict[str, Any]:
        d: Dict[str, Any] = {"type": self.type, "position": positions_rounded(self.position)}
        if self.scale != 1.0:
            d["scale"] = _round3(self.scale)
        if self.color:
            d["color"] = self.color
        if self.points is not None:
            d["points"] = positions_rounded(self.points)
        if self.target is not None:
            d["target"] = positions_rounded(self.target)
        if self.radius is not None:
            d["radius"] = _round3(self.radius)
        return d


@dataclass
class Frame:
    t: float
    objects: List[FrameObject]

    def to_json(self) -> Dict[str, Any]:
        return {"t": _round3(self.t), "objects": [o.to_json() for o in self.objects]}


# ---------------------------------------------------------------------------
# The top-level asset
# ---------------------------------------------------------------------------
@dataclass
class VisualAsset:
    id: str
    kind: str                       # "surface3d" | "sim" | "motion"
    title: str
    description: str
    subject: str
    unit: str
    scene: SceneSpec = field(default_factory=SceneSpec)
    meshes: List[MeshSpec] = field(default_factory=list)
    frames: List[Frame] = field(default_factory=list)
    fps: int = 30
    meta: Dict[str, Any] = field(default_factory=dict)

    def to_json(self) -> Dict[str, Any]:
        out: Dict[str, Any] = {
            "id": self.id,
            "kind": self.kind,
            "title": self.title,
            "description": self.description,
            "subject": self.subject,
            "unit": self.unit,
            "scene": self.scene.to_json(),
            "fps": self.fps,
            "meta": {"generator": GENERATOR_TAG, **self.meta},
        }
        if self.meshes:
            out["meshes"] = [m.to_json() for m in self.meshes]
        if self.frames:
            out["frames"] = [f.to_json() for f in self.frames]
        return out

    def write(self, out_dir: Path, make_images: bool = False, image_renderer=None) -> Path:
        out_dir.mkdir(parents=True, exist_ok=True)
        path = out_dir / f"{self.id}.json"
        payload = self.to_json()
        payload["_bytes"] = len(json.dumps(payload).encode("utf-8"))
        path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
        if make_images and image_renderer is not None:
            image_renderer(self, out_dir)
        return path


# ---------------------------------------------------------------------------
# Manifest
# ---------------------------------------------------------------------------
def write_manifest(out_dir: Path, assets: List[VisualAsset]) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest = {
        "generator": GENERATOR_TAG,
        "count": len(assets),
        "assets": [
            {
                "id": a.id,
                "kind": a.kind,
                "title": a.title,
                "subject": a.subject,
                "unit": a.unit,
                "description": a.description,
                "file": f"{a.id}.json",
                "frames": len(a.frames),
                "meshes": len(a.meshes),
            }
            for a in assets
        ],
    }
    path = out_dir / "manifest.json"
    path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return path

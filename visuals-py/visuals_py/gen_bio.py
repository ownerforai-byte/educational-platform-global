"""Biology unit generators — one Python-computed 3D scene per NEB biology unit.

Covers Class 11 (10 units) + Class 12 (9 units). Every generator returns a
VisualAsset using only the renderer-supported primitives (sphere / box /
line / trail / arrow), so each scene plays back in the three.js rig.
"""
from __future__ import annotations

import numpy as np

from .assets import Frame, FrameObject, MeshSpec, SceneSpec, VisualAsset
from .gen_3d import _grid_mesh


def _circle_pts(cx: float, cy: float, r: float, n: int = 40, z: float = 0.0) -> list:
    a = np.linspace(0, 2 * np.pi, n + 1)
    pts: list = []
    for t in a:
        pts.extend([float(cx + r * np.cos(t)), float(cy + r * np.sin(t)), float(z)])
    return pts


def _ball(x: float, y: float, z: float = 0.0, color: str = "#EF4444", radius: float = 0.3) -> FrameObject:
    return FrameObject(type="sphere", position=[float(x), float(y), float(z)], color=color, radius=radius)


def _seg(from_xyz: list, to_xyz: list, color: str = "#64748B") -> FrameObject:
    return FrameObject(type="line", position=list(from_xyz),
                       points=[*from_xyz, *to_xyz], color=color)


# ===========================================================================
# CLASS 11
# ===========================================================================

def bio_cell() -> VisualAsset:
    """Animal cell — membrane ring, nucleus, mitochondria drifting inside."""
    n = 90
    mito = [(-1.6, 0.6), (1.4, -1.0), (0.2, 1.8)]
    frames = []
    for i in range(n):
        t = i / n * 2 * np.pi
        objs = [FrameObject(type="line", position=[0, 0, 0], points=_circle_pts(0, 0, 4.2, n=64), color="#22C55E")]
        objs.append(_ball(0, 0, color="#8B5CF6", radius=1.1))  # nucleus
        objs.append(_ball(0, 0, color="#C4B5FD", radius=0.45))  # nucleolus
        for k, (mx, my) in enumerate(mito):
            ph = t + k * 2.1
            objs.append(_ball(mx + 0.5 * np.cos(ph), my + 0.5 * np.sin(ph), color="#F59E0B", radius=0.45))
        objs.append(_ball(2.6 * np.cos(-t * 1.4), 2.6 * np.sin(-t * 1.4), color="#3B82F6", radius=0.3))  # ribosome cluster
        frames.append(Frame(t=float(t), objects=objs))
    return VisualAsset(
        id="bio-py-cell", kind="motion", title="Animal Cell 3D",
        description="Cell membrane, nucleus with nucleolus, mitochondria and ribosome bodies in motion.",
        subject="biology", unit="Unit: Biomolecules and Cell Biology",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "cell = membrane + cytoplasm + nucleus"},
    )


def bio_flower() -> VisualAsset:
    """Angiosperm flower — blooming petals around ovary, stem + leaf."""
    n = 80
    frames = []
    for i in range(n):
        open_f = 0.35 + 0.65 * (i / (n - 1))  # bloom progress
        objs = [
            _seg([0, -5, 0], [0, -1.2, 0], "#16A34A"),
            _seg([0, -3.2, 0], [1.8, -2.2, 0], "#16A34A"),
            _ball(0, 0, color="#FACC15", radius=0.55),  # ovary
        ]
        for k in range(6):
            a = k * np.pi / 3 + 0.3
            r = 0.7 + 1.5 * open_f
            objs.append(_ball(r * np.cos(a), r * np.sin(a), color="#EC4899", radius=0.62))
        for k in range(6):  # stamens
            a = k * np.pi / 3
            objs.append(_ball(0.85 * np.cos(a), 0.85 * np.sin(a), color="#F97316", radius=0.22))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-flower", kind="motion", title="Angiosperm Flower (Bloom)",
        description="Ovary, six petals blooming open, stamens, stem and leaf — Brassicaceae-type flower.",
        subject="biology", unit="Unit: Floral Diversity",
        scene=SceneSpec(camera_position=[0, 1, 13], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "flower = sepals + petals + androecium + gynoecium"},
    )


def bio_bacteria() -> VisualAsset:
    """Bacterial binary fission — rod elongates, septum forms, splits in two."""
    n = 100
    frames = []
    for i in range(n):
        f = i / (n - 1)
        sep = 3.2 * f  # daughter separation
        objs = [
            _ball(-sep / 2 - 0.8, 0, color="#22C55E", radius=0.7),
            _ball(-sep / 2 + 0.8, 0, color="#22C55E", radius=0.7),
            _ball(sep / 2 - 0.8, 0, color="#22C55E", radius=0.7),
            _ball(sep / 2 + 0.8, 0, color="#22C55E", radius=0.7),
            _ball(-sep / 2, 0, color="#15803D", radius=0.3),  # nucleoid L
            _ball(sep / 2, 0, color="#15803D", radius=0.3),  # nucleoid R
        ]
        if f > 0.15:  # flagella appear
            objs.append(_seg([-sep / 2 - 1.4, 0.3, 0], [-sep / 2 - 3.0, 1.4, 0], "#65A30D"))
            objs.append(_seg([sep / 2 + 1.4, -0.3, 0], [sep / 2 + 3.0, -1.4, 0], "#65A30D"))
        frames.append(Frame(t=float(f * 4), objects=objs))
    return VisualAsset(
        id="bio-py-bacteria", kind="motion", title="Binary Fission in Bacteria",
        description="Rod-shaped bacterium elongates, nucleoid divides, septum splits it into two daughters.",
        subject="biology", unit="Unit: Introductory Microbiology",
        scene=SceneSpec(camera_position=[0, 1, 13], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "1 → 2 → 4 … (exponential, generation time g)"},
    )


def bio_foodweb() -> VisualAsset:
    """Ecological pyramid — stacked trophic boxes with energy-flow arrows."""
    n = 60
    frames = []
    for i in range(n):
        pulse = 0.5 + 0.5 * np.sin(i / n * 2 * np.pi)
        objs = [
            FrameObject(type="box", position=[0, -3, 0], color="#16A34A", radius=5.2),
            FrameObject(type="box", position=[0, -1, 0], color="#65A30D", radius=3.8),
            FrameObject(type="box", position=[0, 1, 0], color="#CA8A04", radius=2.4),
            FrameObject(type="box", position=[0, 3, 0], color="#DC2626", radius=1.2),
            FrameObject(type="arrow", position=[-4, -3, 0], target=[-4, 3.4, 0],
                        color="#FACC15" if pulse > 0.5 else "#A16207"),
        ]
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-foodweb", kind="motion", title="Ecological Pyramid of Energy",
        description="Producers → herbivores → carnivores → top carnivores; ~10% energy passes each level.",
        subject="biology", unit="Unit: Ecology",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "10% law — only ~1/10 energy transfers upward"},
    )


def bio_vegetation() -> VisualAsset:
    """Vegetation zones of Nepal — altitude belts from tropical to alpine."""
    n = 60
    frames = []
    belts = [("#16A34A", -3.4, 5.0), ("#4D7C0F", -1.4, 4.0), ("#854D0E", 0.6, 3.0), ("#E5E7EB", 2.6, 2.0)]
    for i in range(n):
        sway = 0.25 * np.sin(i / n * 2 * np.pi)
        objs = [_seg([-5.5, -4, 0], [5.5, 4, 0], "#78716C")]  # slope
        for color, y, w in belts:
            objs.append(FrameObject(type="box", position=[sway, y, 0], color=color, radius=w * 0.55))
        objs.append(FrameObject(type="arrow", position=[5.8, -4, 0], target=[5.8, 4.4, 0], color="#0EA5E9"))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-vegetation", kind="motion", title="Altitudinal Vegetation Belts",
        description="Tropical → subtropical → temperate → alpine belts rising with altitude in Nepal.",
        subject="biology", unit="Unit: Vegetation",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "vegetation belt ≈ f(altitude, 60–8848 m)"},
    )


def bio_scope() -> VisualAsset:
    """Branches of biology orbiting the central life-science core."""
    n = 120
    fields = ["Botany", "Zoology", "Genetics", "Ecology", "Microbiology", "Physiology"]
    colors = ["#16A34A", "#F97316", "#8B5CF6", "#0EA5E9", "#65A30D", "#EC4899"]
    frames = []
    for i in range(n):
        t = i / n * 2 * np.pi
        objs = [_ball(0, 0, color="#DC2626", radius=0.9)]
        for k, (f, c) in enumerate(zip(fields, colors)):
            a = t * 0.6 + k * np.pi / 3
            x, y = 4.2 * np.cos(a), 4.2 * np.sin(a)
            objs.append(_seg([0, 0, 0], [x, y, 0], "#94A3B8"))
            objs.append(_ball(x, y, color=c, radius=0.5))
        frames.append(Frame(t=float(t), objects=objs))
    return VisualAsset(
        id="bio-py-scope", kind="motion", title="Scope of Biology",
        description="Six great fields — botany, zoology, genetics, ecology, microbiology, physiology — orbiting biology.",
        subject="biology", unit="Unit: Introduction to Biology",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "biology = botany + zoology + allied fields"},
    )


def bio_phylogeny() -> VisualAsset:
    """Phylogenetic tree growing — lineages splitting through time."""
    branches = [
        ([0, -4.5, 0], [-2.5, -1.5, 0]), ([0, -4.5, 0], [2.5, -1.5, 0]),
        ([-2.5, -1.5, 0], [-3.6, 1.5, 0]), ([-2.5, -1.5, 0], [-1.4, 1.5, 0]),
        ([2.5, -1.5, 0], [1.4, 1.5, 0]), ([2.5, -1.5, 0], [3.6, 1.5, 0]),
        ([-3.6, 1.5, 0], [-4.2, 4, 0]), ([-3.6, 1.5, 0], [-3.0, 4, 0]),
    ]
    tips = [([-4.2, 4], "#16A34A"), ([-3.0, 4], "#65A30D"), ([-1.4, 1.5], "#CA8A04"),
            ([1.4, 1.5], "#0EA5E9"), ([3.6, 1.5], "#8B5CF6")]
    n = 80
    frames = []
    for i in range(n):
        f = (i + 1) / n
        show = int(f * len(branches))
        objs = [FrameObject(type="line", position=b[0], points=[*b[0], *b[1]], color="#78716C")
                for b in branches[:show]]
        if f > 0.9:
            objs += [_ball(x, y, color=c, radius=0.4) for (x, y), c in tips]
        frames.append(Frame(t=float(f * 6), objects=objs))
    return VisualAsset(
        id="bio-py-phylogeny", kind="motion", title="Phylogenetic Tree (Growing)",
        description="A common ancestor splits into lineages; survivors bloom as species at the tips.",
        subject="biology", unit="Unit: Evolutionary Biology",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "descent with modification + natural selection"},
    )


def bio_worm() -> VisualAsset:
    """Earthworm crawling — metameric segments rippling forward."""
    n = 100
    frames = []
    for i in range(n):
        t = i / n * 2 * np.pi
        objs = []
        for s in range(9):
            x = -4 + s * 1.0 + 0.35 * np.sin(t - s * 0.7)
            y = 0.3 * np.sin(t * 2 - s * 0.7)
            objs.append(_ball(x, y, color="#B45309" if s == 4 else "#D97706", radius=0.55))
        objs.append(_seg([-4.6, 0.4, 0], [-5.4, 1.2, 0], "#92400E"))  # prostomium
        frames.append(Frame(t=float(t), objects=objs))
    return VisualAsset(
        id="bio-py-worm", kind="motion", title="Earthworm — Metameric Crawling",
        description="Nine segments ripple in peristaltic waves; clitellum band rides the middle.",
        subject="biology", unit="Unit: Faunal Diversity",
        scene=SceneSpec(camera_position=[0, 1, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "peristalsis = circular + longitudinal muscle waves"},
    )


def bio_migration() -> VisualAsset:
    """Bird migration — flock travelling a flyway between seasonal ranges."""
    n = 110
    frames = []
    for i in range(n):
        f = (i / (n - 1)) * 2 - 1  # -1 → 1
        x0 = f * 5.0
        objs = [
            _ball(-5.5, -2.5, color="#0EA5E9", radius=1.0),  # breeding range
            _ball(5.5, 2.5, color="#F97316", radius=1.0),  # wintering range
            FrameObject(type="trail", position=[x0, 0, 0], color="#64748B",
                        points=[float(v) for p in [(-5.5 + k * 0.25, -2.5 + k * 0.125 + 0.6 * np.sin(k * 0.3), 0.0) for k in range(45)] for v in p]),
        ]
        for k in range(5):
            objs.append(_ball(x0 - k * 0.7, 0.6 * np.sin(i * 0.25 - k) + (-2.5 + (f + 1) * 2.5), color="#1E293B", radius=0.28))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-migration", kind="motion", title="Bird Migration Flyway",
        description="A flock commutes between breeding and wintering ranges along a fixed flyway.",
        subject="biology", unit="Unit: Biota and Environment",
        scene=SceneSpec(camera_position=[0, 0, 16], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "migration = photoperiod + fat store + navigation"},
    )


def bio_reserve() -> VisualAsset:
    """Conservation reserve — guarded habitat terrain with species markers."""
    g = 48
    x = np.linspace(-5, 5, g)
    z = np.linspace(-5, 5, g)
    X, Z = np.meshgrid(x, z, indexing="ij")
    Y = 1.6 * np.exp(-(X**2 + Z**2) / 6.0) + 0.3 * np.sin(X) * np.cos(Z)
    n = 50
    species = [(-2.5, 1.2, "#16A34A"), (2.0, 0.8, "#F97316"), (0.2, -2.2, "#0EA5E9"), (-0.5, 2.6, "#8B5CF6")]
    frames = []
    for i in range(n):
        blink = 0.6 + 0.4 * np.sin(i / n * 4 * np.pi)
        objs = [FrameObject(type="line", position=[0, 0, 0], points=_circle_pts(0, 0.4, 4.4, n=64), color="#DC2626")]
        for sx, sy, c in species:
            objs.append(_ball(sx, sy + 1.2, color=c, radius=0.35 * blink + 0.15))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-reserve", kind="surface3d", title="Conservation Reserve (Terrain)",
        description="A guarded reserve boundary ringed in red; flagship species blink inside the safe habitat.",
        subject="biology", unit="Unit: Conservation Biology",
        scene=SceneSpec(camera_position=[8, 7, 9], subject="biology"),
        meshes=[_grid_mesh("habitat", Y, color="#22C55E")],
        frames=frames, fps=30,
        meta={"formula": "in-situ = national parks + reserves + Ramsar sites"},
    )


# ===========================================================================
# CLASS 12
# ===========================================================================

def bio_dna() -> VisualAsset:
    """DNA double helix rotating — sugar-phosphate rails + base-pair rungs."""
    n = 110
    frames = []
    xs = np.linspace(-4.5, 4.5, 26)
    for i in range(n):
        t = i * 0.12
        e_pts: list = []
        b_pts: list = []
        objs: list = []
        for x in xs:
            e_pts.extend([float(x), float(1.6 * np.sin(x * 1.2 + t)), float(1.6 * np.cos(x * 1.2 + t))])
            b_pts.extend([float(x), float(-1.6 * np.sin(x * 1.2 + t)), float(-1.6 * np.cos(x * 1.2 + t))])
        objs.append(FrameObject(type="line", position=[-4.5, 0, 0], points=e_pts, color="#3B82F6"))
        objs.append(FrameObject(type="line", position=[-4.5, 0, 0], points=b_pts, color="#22C55E"))
        for k in range(0, len(xs), 3):
            x = float(xs[k])
            y1, z1 = 1.6 * np.sin(x * 1.2 + t), 1.6 * np.cos(x * 1.2 + t)
            objs.append(FrameObject(type="line", position=[x, y1, z1],
                                    points=[x, y1, z1, x, -y1, -z1], color="#94A3B8"))
        objs.append(_ball(-4.5, 1.6 * np.sin(-4.5 * 1.2 + t), 1.6 * np.cos(-4.5 * 1.2 + t), color="#F59E0B", radius=0.3))
        frames.append(Frame(t=float(t), objects=objs))
    return VisualAsset(
        id="bio-py-dna", kind="motion", title="DNA Double Helix (Rotating)",
        description="Two sugar-phosphate rails wind around base-pair rungs; the tracer rides the leading strand.",
        subject="biology", unit="Unit: Heredity and Evolution",
        scene=SceneSpec(camera_position=[0, 3, 13], grid=False, axes=True, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "A=T, G≡C — Chargaff + antiparallel 5'→3'"},
    )


def bio_antibody() -> VisualAsset:
    """Antibody binding its antigen — Y-locks onto target, then neutralizes."""
    n = 90
    frames = []
    for i in range(n):
        f = i / (n - 1)
        ax = -4.5 + 3.0 * f  # antibody advances
        objs = [
            _ball(2.2, 0, color="#DC2626", radius=0.8),  # antigen
            _seg([ax - 1.2, -1.4, 0], [ax, 0, 0], "#3B82F6"),
            _seg([ax - 1.2, 1.4, 0], [ax, 0, 0], "#3B82F6"),
            _seg([ax - 1.2, -1.4, 0], [ax - 1.2, -2.4, 0], "#1D4ED8"),
        ]
        if f > 0.75:  # neutralization ring
            objs.append(FrameObject(type="line", position=[2.2, 0, 0], points=_circle_pts(2.2, 0, 1.4, n=40), color="#22C55E"))
        frames.append(Frame(t=float(f * 5), objects=objs))
    return VisualAsset(
        id="bio-py-antibody", kind="motion", title="Antibody–Antigen Binding",
        description="A Y-shaped antibody docks its variable arms onto the antigen, then flags it neutralized.",
        subject="biology", unit="Unit: Human Health and Diseases",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "specificity = variable-region complementarity"},
    )


def bio_crop() -> VisualAsset:
    """High-yield crop rows growing — selection multiplies plant density."""
    n = 80
    frames = []
    for i in range(n):
        f = i / (n - 1)
        objs = [_seg([-5, -3.5, 0], [5, -3.5, 0], "#78716C")]
        for r in range(3):
            for c in range(9):
                h = (0.4 + 2.6 * f) * (0.8 + 0.2 * np.sin(c + r))
                x = -4 + c * 1.0
                y = -3.5 + h / 2
                objs.append(FrameObject(type="box", position=[x, y, r * 0.8 - 0.8], color="#16A34A", radius=0.42))
                if f > 0.6:
                    objs.append(_ball(x, -3.5 + h + 0.2, color="#FACC15", radius=0.22))
        frames.append(Frame(t=float(f * 5), objects=objs))
    return VisualAsset(
        id="bio-py-crop", kind="motion", title="High-Yield Crop Rows (Growing)",
        description="Selected rows thicken and head with grain — plant breeding made visible.",
        subject="biology", unit="Unit: Strategies for Enhancement in Food Production",
        scene=SceneSpec(camera_position=[0, 1, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "yield = variety × management × season"},
    )


def bio_fermenter() -> VisualAsset:
    """Fermenter — microbe bubbles rise as sugar converts to product."""
    n = 100
    rng = np.random.default_rng(7)
    seeds = rng.uniform(-3, 3, size=(26, 3))
    frames = []
    for i in range(n):
        f = (i / 12) % 1.0
        objs = [
            FrameObject(type="box", position=[0, 0, 0], color="#0EA5E9", radius=6.4),
            _ball(-1.5, -2.2, color="#65A30D", radius=0.5),
            _ball(1.2, -2.4, color="#65A30D", radius=0.5),
            _ball(0.1, -1.8, color="#65A30D", radius=0.5),
        ]
        for sx, sy, sz in seeds:
            y = -3 + ((sy + 3 + i * 0.12) % 6.0)
            objs.append(_ball(sx * 0.8, y, (sz - 1.5) * 0.4, color="#BAE6FD", radius=0.16))
        frames.append(Frame(t=float(f * 6), objects=objs))
    return VisualAsset(
        id="bio-py-fermenter", kind="motion", title="Fermenter (Microbes at Work)",
        description="Immobilised microbes (green) bubble product gas through the blue broth.",
        subject="biology", unit="Unit: Microbes in Human Welfare",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "sugar → (yeast) → ethanol + CO₂"},
    )


def bio_pcr() -> VisualAsset:
    """PCR doubling — DNA copies double every thermal cycle: 1→2→4→8."""
    n = 96
    frames = []
    for i in range(n):
        cycle = min(i // 24 + 1, 4)
        count = 2 ** (cycle - 1)
        t = i / n * 2 * np.pi
        objs = [FrameObject(type="line", position=[0, -3.4, 0], points=_circle_pts(0, 0, 3.6, n=56), color="#DC2626")]
        for k in range(count):
            a = t + k * 2 * np.pi / count
            r = 1.0 + 0.5 * cycle
            objs.append(_ball(r * np.cos(a), r * np.sin(a), color="#8B5CF6", radius=0.42))
        objs.append(_ball(0, 4.4, color="#F59E0B", radius=0.3 + 0.12 * cycle))  # cycler lamp
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-pcr", kind="motion", title="PCR — Exponential Doubling",
        description="Each thermal cycle doubles the DNA: one template becomes 2, 4, then 8 copies.",
        subject="biology", unit="Unit: Biotechnology — Principles and Processes",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "copies = 2ⁿ after n cycles"},
    )


def bio_insulin() -> VisualAsset:
    """Recombinant insulin — proinsulin chain folds, C-peptide leaves."""
    n = 100
    frames = []
    for i in range(n):
        f = i / (n - 1)
        objs = []
        for k in range(12):
            x = -3.3 + k * 0.6
            y = (1.6 - 1.6 * f) * np.sin(k * 0.9) + 0.4 * f * np.cos(k * 1.3)
            c = "#3B82F6" if k < 4 or k > 7 else ("#F59E0B" if f < 0.6 else "#94A3B8")
            objs.append(_ball(x, y, color=c, radius=0.34))
        if f > 0.55:  # freed C-peptide drifts away
            d = (f - 0.55) * 8
            for k in range(4, 8):
                x = -3.3 + k * 0.6
                objs.append(_ball(x, 1.6 * np.sin(k * 0.9) + d, color="#94A3B8", radius=0.28))
        frames.append(Frame(t=float(f * 6), objects=objs))
    return VisualAsset(
        id="bio-py-insulin", kind="motion", title="Recombinant Insulin Maturation",
        description="Proinsulin folds; the C-peptide (grey) is clipped out, leaving active A+B chain insulin.",
        subject="biology", unit="Unit: Biotechnology and Its Applications",
        scene=SceneSpec(camera_position=[0, 0, 14], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "proinsulin − C-peptide = active insulin (A+B)"},
    )


def bio_logistic() -> VisualAsset:
    """Logistic population growth — S-curve traced toward carrying capacity."""
    n = 120
    K = 3.4
    xs = np.linspace(-5, 5, 120)
    ys = -K + 2 * K / (1 + np.exp(-1.1 * xs))
    frames = []
    for i in range(n):
        upto = max(i, 2)
        pts: list = []
        for x, y in zip(xs[:upto], ys[:upto]):
            pts.extend([float(x), float(y), 0.0])
        objs = [
            FrameObject(type="trail", position=[float(xs[upto - 1]), float(ys[upto - 1]), 0],
                        color="#16A34A", points=pts),
            _ball(float(xs[upto - 1]), float(ys[upto - 1]), color="#DC2626", radius=0.32),
            FrameObject(type="line", position=[-5, K, 0], points=[-5.0, K, 0.0, 5.0, K, 0.0], color="#94A3B8"),
            FrameObject(type="arrow", position=[-5.2, -K, 0], target=[-5.2, K + 0.6, 0], color="#64748B"),
        ]
        frames.append(Frame(t=float(i * 0.08), objects=objs))
    return VisualAsset(
        id="bio-py-logistic", kind="motion", title="Logistic Growth (S-Curve)",
        description="Population traces an S-curve that levels at carrying capacity K.",
        subject="biology", unit="Unit: Organisms and Environment",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, axes=True, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "dN/dt = rN(1 − N/K)"},
    )


def bio_hotspot() -> VisualAsset:
    """Biodiversity hotspot — species richness peaks on the terrain."""
    g = 52
    x = np.linspace(-5, 5, g)
    z = np.linspace(-5, 5, g)
    X, Z = np.meshgrid(x, z, indexing="ij")
    Y = 2.4 * np.exp(-((X + 1.0) ** 2 + (Z - 1.0) ** 2) / 5.0) + 1.1 * np.exp(-((X - 2.5) ** 2 + (Z + 2.0) ** 2) / 3.0)
    cols = ["#16A34A", "#0EA5E9", "#8B5CF6", "#F97316", "#EC4899", "#65A30D"]
    rng = np.random.default_rng(11)
    spots = list(zip(rng.uniform(-3.5, 3.5, 14), rng.uniform(-3.5, 3.5, 14)))
    n = 60
    frames = []
    for i in range(n):
        glow = 0.5 + 0.5 * np.sin(i / n * 2 * np.pi)
        objs = []
        for k, (sx, sy) in enumerate(spots):
            richness = float(np.exp(-((sx + 1.0) ** 2 + (sy - 1.0) ** 2) / 5.0))
            objs.append(_ball(sx, sy + 1.0, color=cols[k % len(cols)], radius=0.18 + 0.45 * richness * glow))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-hotspot", kind="surface3d", title="Biodiversity Hotspot (Terrain)",
        description="Species markers swell where richness peaks — hotspots glow over the landscape.",
        subject="biology", unit="Unit: Biodiversity and Conservation",
        scene=SceneSpec(camera_position=[8, 7, 9], subject="biology"),
        meshes=[_grid_mesh("richness", Y, color="#15803D")],
        frames=frames, fps=30,
        meta={"formula": "hotspot = endemism + threat (Myers)"},
    )


def bio_greenhouse() -> VisualAsset:
    """Greenhouse effect — heat arrows trapped under gas layers."""
    n = 90
    frames = []
    for i in range(n):
        f = (i % 30) / 30
        objs = [
            FrameObject(type="box", position=[0, -3.2, 0], color="#15803D", radius=7.0),  # earth
            FrameObject(type="line", position=[-4.5, 0.5, 0],
                        points=[-4.5, 0.5, 0.0, 4.5, 0.5, 0.0], color="#38BDF8"),  # CO2 layer
            FrameObject(type="line", position=[-4.5, 2.2, 0],
                        points=[-4.5, 2.2, 0.0, 4.5, 2.2, 0.0], color="#818CF8"),  # upper layer
            FrameObject(type="arrow", position=[-2, -2.6, 0], target=[-2, 0.4, 0], color="#FACC15"),  # incoming sun
        ]
        for k in range(4):  # trapped heat rising and bouncing back
            x = -3 + k * 2.0
            y = -1.5 + f * 3.4
            yy = y if y < 0.5 else 0.5 - (y - 0.5)
            objs.append(FrameObject(type="arrow", position=[x, yy - 0.8, 0], target=[x, yy, 0], color="#EF4444"))
        frames.append(Frame(t=float(i * 0.1), objects=objs))
    return VisualAsset(
        id="bio-py-greenhouse", kind="motion", title="Greenhouse Effect (Trapped Heat)",
        description="Sunlight enters; CO₂ layers bounce outgoing heat back — the planet warms.",
        subject="biology", unit="Unit: Environmental Issues",
        scene=SceneSpec(camera_position=[0, 0, 15], grid=False, subject="biology"),
        frames=frames, fps=30,
        meta={"formula": "warming ≈ f(CO₂, CH₄, N₂O retained IR)"},
    )

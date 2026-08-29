"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";

/* ============================================================
   Shared 3D helpers
   ============================================================ */

type AtomInfo = {
  symbol: string;
  name: string;
  color: number;
  radius: number;
  info: string;
};

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Meaning & Why It Matters</p>
      <h4 className="mt-1 text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{meaning}</p>
      {points.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          {points.map((p, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-primary">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const ATOM_STYLES: Record<string, AtomInfo> = {
  H: { symbol: "H", name: "Hydrogen", color: 0xffffff, radius: 0.3, info: "Atomic #1 • 1 proton • 1 electron" },
  C: { symbol: "C", name: "Carbon", color: 0x333333, radius: 0.45, info: "Atomic #6 • 4 valence electrons • Tetravalent" },
  N: { symbol: "N", name: "Nitrogen", color: 0x3b82f6, radius: 0.42, info: "Atomic #7 • 5 valence electrons • Trivalent" },
  O: { symbol: "O", name: "Oxygen", color: 0xef4444, radius: 0.4, info: "Atomic #8 • 6 valence electrons • Divalent" },
  F: { symbol: "F", name: "Fluorine", color: 0x22c55e, radius: 0.38, info: "Atomic #9 • 7 valence electrons • Monovalent" },
  Cl: { symbol: "Cl", name: "Chlorine", color: 0x84cc16, radius: 0.5, info: "Atomic #17 • 7 valence electrons • Monovalent" },
  Na: { symbol: "Na", name: "Sodium", color: 0xf97316, radius: 0.55, info: "Atomic #11 • 1 valence electron • +1 ion" },
  S: { symbol: "S", name: "Sulfur", color: 0xeab308, radius: 0.48, info: "Atomic #16 • 6 valence electrons • Divalent" },
  P: { symbol: "P", name: "Phosphorus", color: 0xf59e0b, radius: 0.48, info: "Atomic #15 • 5 valence electrons • Trivalent" },
  Br: { symbol: "Br", name: "Bromine", color: 0xa16207, radius: 0.55, info: "Atomic #35 • 7 valence electrons • Monovalent" },
  I: { symbol: "I", name: "Iodine", color: 0x7c3aed, radius: 0.6, info: "Atomic #53 • 7 valence electrons • Monovalent" },
  Fe: { symbol: "Fe", name: "Iron", color: 0xdc2626, radius: 0.5, info: "Atomic #26 • Transition metal • Variable valency" },
  Cu: { symbol: "Cu", name: "Copper", color: 0xd97706, radius: 0.5, info: "Atomic #29 • Excellent conductor" },
  Zn: { symbol: "Zn", name: "Zinc", color: 0x94a3b8, radius: 0.5, info: "Atomic #30 • Used in galvanization" },
  Ag: { symbol: "Ag", name: "Silver", color: 0xc0c0c0, radius: 0.55, info: "Atomic #47 • Best electrical conductor" },
  Au: { symbol: "Au", name: "Gold", color: 0xfbbf24, radius: 0.55, info: "Atomic #79 • Noble metal • Unreactive" },
};

type MoleculeDef = {
  id: string;
  name: string;
  formula: string;
  geometry: string;
  bondAngle: string;
  description: string;
  atoms: { symbol: string; pos: [number, number, number] }[];
  bonds: [number, number, number?][]; // [atomIdxA, atomIdxB, bondOrder?]
};

const MOLECULES: MoleculeDef[] = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    geometry: "Bent (V-shaped)",
    bondAngle: "104.5°",
    description: "Oxygen is sp³ hybridized with 2 lone pairs, pushing the H-O-H bond angle from 109.5° to 104.5°. Water is a polar molecule essential for life.",
    atoms: [
      { symbol: "O", pos: [0, 0, 0] },
      { symbol: "H", pos: [0.9, 0.7, 0] },
      { symbol: "H", pos: [-0.9, 0.7, 0] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
    ],
  },
  {
    id: "co2",
    name: "Carbon Dioxide",
    formula: "CO₂",
    geometry: "Linear",
    bondAngle: "180°",
    description: "Carbon is sp hybridized. Two double bonds (O=C=O) give a linear geometry. CO₂ is a greenhouse gas produced by respiration and combustion.",
    atoms: [
      { symbol: "C", pos: [0, 0, 0] },
      { symbol: "O", pos: [1.4, 0, 0] },
      { symbol: "O", pos: [-1.4, 0, 0] },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
    ],
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    geometry: "Tetrahedral",
    bondAngle: "109.5°",
    description: "Carbon is sp³ hybridized. Four equivalent C-H bonds point to the corners of a tetrahedron. Methane is the main component of natural gas.",
    atoms: [
      { symbol: "C", pos: [0, 0, 0] },
      { symbol: "H", pos: [0.8, 0.8, 0.8] },
      { symbol: "H", pos: [-0.8, -0.8, 0.8] },
      { symbol: "H", pos: [-0.8, 0.8, -0.8] },
      { symbol: "H", pos: [0.8, -0.8, -0.8] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ],
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    geometry: "Trigonal Pyramidal",
    bondAngle: "107°",
    description: "Nitrogen is sp³ hybridized with 1 lone pair. The lone pair compresses the H-N-H angle from 109.5° to 107°. Ammonia is a weak base.",
    atoms: [
      { symbol: "N", pos: [0, 0.4, 0] },
      { symbol: "H", pos: [0.8, -0.4, 0] },
      { symbol: "H", pos: [-0.4, -0.4, 0.7] },
      { symbol: "H", pos: [-0.4, -0.4, -0.7] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
    ],
  },
  {
    id: "o2",
    name: "Oxygen Gas",
    formula: "O₂",
    geometry: "Linear (Diatomic)",
    bondAngle: "—",
    description: "Two oxygen atoms joined by a double bond. O₂ is paramagnetic (has 2 unpaired electrons) and essential for respiration.",
    atoms: [
      { symbol: "O", pos: [-0.7, 0, 0] },
      { symbol: "O", pos: [0.7, 0, 0] },
    ],
    bonds: [[0, 1, 2]],
  },
  {
    id: "n2",
    name: "Nitrogen Gas",
    formula: "N₂",
    geometry: "Linear (Diatomic)",
    bondAngle: "—",
    description: "Two nitrogen atoms joined by a triple bond (N≡N). The triple bond is very strong (945 kJ/mol), making N₂ very unreactive. 78% of air.",
    atoms: [
      { symbol: "N", pos: [-0.7, 0, 0] },
      { symbol: "N", pos: [0.7, 0, 0] },
    ],
    bonds: [[0, 1, 3]],
  },
  {
    id: "hcl",
    name: "Hydrogen Chloride",
    formula: "HCl",
    geometry: "Linear (Diatomic)",
    bondAngle: "—",
    description: "Polar covalent bond between H and Cl. Dissolves in water to form hydrochloric acid, a strong acid.",
    atoms: [
      { symbol: "H", pos: [-0.8, 0, 0] },
      { symbol: "Cl", pos: [0.8, 0, 0] },
    ],
    bonds: [[0, 1, 1]],
  },
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl",
    geometry: "Ionic (Crystal)",
    bondAngle: "90°",
    description: "Ionic compound. Na⁺ donates an electron to Cl⁻. Forms a face-centered cubic crystal lattice. Table salt.",
    atoms: [
      { symbol: "Na", pos: [-0.8, 0, 0] },
      { symbol: "Cl", pos: [0.8, 0, 0] },
    ],
    bonds: [[0, 1, 1]],
  },
  {
    id: "so2",
    name: "Sulfur Dioxide",
    formula: "SO₂",
    geometry: "Bent",
    bondAngle: "119°",
    description: "Sulfur is sp² hybridized with 1 lone pair. SO₂ is a pollutant produced by burning fossil fuels; causes acid rain.",
    atoms: [
      { symbol: "S", pos: [0, 0, 0] },
      { symbol: "O", pos: [1.1, 0.6, 0] },
      { symbol: "O", pos: [-1.1, 0.6, 0] },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
    ],
  },
  {
    id: "ccl4",
    name: "Carbon Tetrachloride",
    formula: "CCl₄",
    geometry: "Tetrahedral",
    bondAngle: "109.5°",
    description: "Carbon is sp³ hybridized. Four C-Cl bonds in a tetrahedral arrangement. Non-polar molecule despite polar bonds (symmetry cancels dipoles).",
    atoms: [
      { symbol: "C", pos: [0, 0, 0] },
      { symbol: "Cl", pos: [1.0, 1.0, 1.0] },
      { symbol: "Cl", pos: [-1.0, -1.0, 1.0] },
      { symbol: "Cl", pos: [-1.0, 1.0, -1.0] },
      { symbol: "Cl", pos: [1.0, -1.0, -1.0] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ],
  },
];

/* ============================================================
   3D Molecular Model Viewer
   ============================================================ */

function MolecularModelViewer() {
  const [moleculeId, setMoleculeId] = useState("h2o");
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedAtom, setSelectedAtom] = useState<AtomInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const molecule = MOLECULES.find((m) => m.id === moleculeId) ?? MOLECULES[0];

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: any;
  let raycaster: THREE.Raycaster;
  const mouse = new THREE.Vector2();
  let frameId: number;
  const atomMeshes: THREE.Mesh[] = [];
  const bondMeshes: THREE.Mesh[] = [];
  let pointerDownPos = { x: 0, y: 0 };

  const init = async () => {
    const THREE = await import("three");
    const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(3, 2.5, 4);

    if (!isWebGLAvailable()) {
      return;
    }
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 12;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;

    raycaster = new THREE.Raycaster();

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
    dir2.position.set(-4, -2, -3);
    scene.add(dir2);

    const point = new THREE.PointLight(0x22d3ee, 0.5, 20);
    point.position.set(0, 2, 3);
    scene.add(point);

    // Build molecule
    const group = new THREE.Group();

    molecule.atoms.forEach((atom, idx) => {
      const style = ATOM_STYLES[atom.symbol] ?? { symbol: atom.symbol, name: atom.symbol, color: 0x888888, radius: 0.4, info: "" };
      const geo = new THREE.SphereGeometry(style.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: style.color,
        roughness: 0.3,
        metalness: 0.2,
        emissive: style.color,
        emissiveIntensity: 0.05,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...atom.pos);
      mesh.userData = { atomStyle: style, atomIdx: idx };
      group.add(mesh);
      atomMeshes.push(mesh);
    });

    molecule.bonds.forEach(([a, b, order = 1]) => {
      const p1 = new THREE.Vector3(...molecule.atoms[a].pos);
      const p2 = new THREE.Vector3(...molecule.atoms[b].pos);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const length = p1.distanceTo(p2);
      const dirVec = p2.clone().sub(p1).normalize();

      const bondCount = order ?? 1;
      const offsets = bondCount === 1 ? [0] : bondCount === 2 ? [-0.12, 0.12] : [-0.18, 0, 0.18];

      offsets.forEach((offset) => {
        const perp = new THREE.Vector3(0, 1, 0).cross(dirVec);
        if (perp.length() < 0.01) perp.set(1, 0, 0);
        perp.normalize();

        const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, length * 0.9, 12);
        const bondMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.4,
          metalness: 0.3,
          transparent: true,
          opacity: 0.85,
        });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.copy(mid).add(perp.multiplyScalar(offset));
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
        group.add(bond);
        bondMeshes.push(bond);
      });
    });

    scene.add(group);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const getIntersections = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(atomMeshes, false);
    };

    renderer.domElement.addEventListener("pointermove", (event: PointerEvent) => {
      const hits = getIntersections(event);
      if (hits.length > 0) {
        renderer.domElement.style.cursor = "pointer";
        const style = hits[0].object.userData.atomStyle as AtomInfo;
        setSelectedAtom(style);
      } else {
        renderer.domElement.style.cursor = "grab";
      }
    });

    renderer.domElement.addEventListener("pointerdown", (event: PointerEvent) => {
      pointerDownPos = { x: event.clientX, y: event.clientY };
    });

    renderer.domElement.addEventListener("pointerup", (event: PointerEvent) => {
      const dx = event.clientX - pointerDownPos.x;
      const dy = event.clientY - pointerDownPos.y;
      if (Math.sqrt(dx * dx + dy * dy) < 4) {
        const hits = getIntersections(event);
        if (hits.length > 0) {
          const style = hits[0].object.userData.atomStyle as AtomInfo;
          setSelectedAtom(style);
        }
      }
    });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose?.();
      atomMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      bondMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
  };

  const cleanup = init();
  return () => {
    cleanup.then((dispose) => dispose?.());
  };
}, [moleculeId, autoRotate, molecule.atoms, molecule.bonds]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Molecular Models</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Hover atoms for info</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Molecule & View Options">
          <div className="w-48">
            <Select value={moleculeId} onValueChange={(v) => { setMoleculeId(v); setSelectedAtom(null); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOLECULES.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.formula} — {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{molecule.formula} — {molecule.name}</h3>
              <span className="text-xs text-muted-foreground">{molecule.geometry}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{molecule.description}</p>
            <p className="mt-2 text-xs">
              <span className="font-medium text-foreground">Bond angle:</span>{" "}
              <span className="text-muted-foreground">{molecule.bondAngle}</span>
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            {selectedAtom ? (
              <>
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: `#${selectedAtom.color.toString(16).padStart(6, "0")}` }}
                  >
                    {selectedAtom.symbol}
                  </span>
                  <h3 className="font-semibold">{selectedAtom.name}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{selectedAtom.info}</p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Hover or click any atom in the 3D model to see its properties, atomic number, and valence electrons.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(ATOM_STYLES).map(([sym, style]) => (
            <span
              key={sym}
              className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5"
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                style={{ backgroundColor: `#${style.color.toString(16).padStart(6, "0")}` }}
              >
                {sym}
              </span>
              {style.name}
            </span>
          ))}
        </div>

        <MeaningPanel
          title="What do molecular models teach us?"
          meaning="The 3D shape of a molecule determines its polarity, reactivity, and physical properties. A bent water molecule is polar (allows dissolving salts), while linear CO₂ is non-polar."
          points={[
            "Single bond (C–H): 1 shared electron pair",
            "Double bond (C=O): 2 shared electron pairs — shorter and stronger",
            "Triple bond (N≡N): 3 shared electron pairs — very strong (945 kJ/mol)",
            "Bond angle + shape → determines if molecule is polar or non-polar",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Atomic Orbital Viewer
   ============================================================ */

type OrbitalDef = {
  id: string;
  name: string;
  shape: string;
  description: string;
  color: number;
  lobes: { pos: [number, number, number]; scale: [number, number, number]; rot?: [number, number, number] }[];
};

const ORBITALS: OrbitalDef[] = [
  {
    id: "1s",
    name: "1s Orbital",
    shape: "Spherical",
    description: "The 1s orbital is a sphere around the nucleus. It can hold 2 electrons. Found in the first energy level (n=1).",
    color: 0x22c55e,
    lobes: [{ pos: [0, 0, 0], scale: [1, 1, 1] }],
  },
  {
    id: "2s",
    name: "2s Orbital",
    shape: "Spherical (larger)",
    description: "The 2s orbital is a larger sphere with a radial node. It can hold 2 electrons in the second energy level (n=2).",
    color: 0x3b82f6,
    lobes: [{ pos: [0, 0, 0], scale: [1.6, 1.6, 1.6] }],
  },
  {
    id: "2px",
    name: "2pₓ Orbital",
    shape: "Dumbbell (x-axis)",
    description: "The 2pₓ orbital has two lobes along the x-axis with a node at the nucleus. Each p orbital holds 2 electrons.",
    color: 0xef4444,
    lobes: [
      { pos: [0.9, 0, 0], scale: [0.7, 0.5, 0.5] },
      { pos: [-0.9, 0, 0], scale: [0.7, 0.5, 0.5] },
    ],
  },
  {
    id: "2py",
    name: "2pᵧ Orbital",
    shape: "Dumbbell (y-axis)",
    description: "The 2pᵧ orbital has two lobes along the y-axis. Three p orbitals (pₓ, pᵧ, p_z) are mutually perpendicular.",
    color: 0xf97316,
    lobes: [
      { pos: [0, 0.9, 0], scale: [0.5, 0.7, 0.5] },
      { pos: [0, -0.9, 0], scale: [0.5, 0.7, 0.5] },
    ],
  },
  {
    id: "2pz",
    name: "2p_z Orbital",
    shape: "Dumbbell (z-axis)",
    description: "The 2p_z orbital has two lobes along the z-axis. Together with pₓ and pᵧ, they form the three degenerate p orbitals.",
    color: 0xeab308,
    lobes: [
      { pos: [0, 0, 0.9], scale: [0.5, 0.5, 0.7] },
      { pos: [0, 0, -0.9], scale: [0.5, 0.5, 0.7] },
    ],
  },
  {
    id: "3dxy",
    name: "3dₓᵧ Orbital",
    shape: "Four-leaf clover (xy-plane)",
    description: "The 3dₓᵧ orbital has 4 lobes in the xy-plane between the axes. d orbitals appear in the third energy level (n=3).",
    color: 0xa855f7,
    lobes: [
      { pos: [0.7, 0.7, 0], scale: [0.5, 0.5, 0.3], rot: [0, 0, Math.PI / 4] },
      { pos: [-0.7, -0.7, 0], scale: [0.5, 0.5, 0.3], rot: [0, 0, Math.PI / 4] },
      { pos: [0.7, -0.7, 0], scale: [0.5, 0.5, 0.3], rot: [0, 0, -Math.PI / 4] },
      { pos: [-0.7, 0.7, 0], scale: [0.5, 0.5, 0.3], rot: [0, 0, -Math.PI / 4] },
    ],
  },
  {
    id: "3dz2",
    name: "3d_z² Orbital",
    shape: "Dumbbell + ring (z-axis)",
    description: "The 3d_z² orbital has two lobes along the z-axis plus a donut-shaped ring in the xy-plane. It's unique among d orbitals.",
    color: 0xec4899,
    lobes: [
      { pos: [0, 0, 1.0], scale: [0.5, 0.5, 0.7] },
      { pos: [0, 0, -1.0], scale: [0.5, 0.5, 0.7] },
      { pos: [0, 0, 0], scale: [0.9, 0.9, 0.25] },
    ],
  },
];

function OrbitalViewer() {
  const [orbitalId, setOrbitalId] = useState("1s");
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const orbital = ORBITALS.find((o) => o.id === orbitalId) ?? ORBITALS[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const lobeMeshes: THREE.Mesh[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(3, 2.5, 4);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;

      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.5);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.8,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      scene.add(nucleus);

      // Axes
      const axisLen = 2.2;
      const axisMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 });
      [
        [new THREE.Vector3(-axisLen, 0, 0), new THREE.Vector3(axisLen, 0, 0)],
        [new THREE.Vector3(0, -axisLen, 0), new THREE.Vector3(0, axisLen, 0)],
        [new THREE.Vector3(0, 0, -axisLen), new THREE.Vector3(0, 0, axisLen)],
      ].forEach(([p1, p2]) => {
        const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const line = new THREE.Line(geo, axisMat);
        scene.add(line);
      });

      // Orbital lobes
      orbital.lobes.forEach((lobe) => {
        const geo = new THREE.SphereGeometry(1, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: orbital.color,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.55,
          emissive: orbital.color,
          emissiveIntensity: 0.15,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...lobe.pos);
        mesh.scale.set(...lobe.scale);
        if (lobe.rot) mesh.rotation.set(...lobe.rot);
        scene.add(mesh);
        lobeMeshes.push(mesh);
      });

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        lobeMeshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [orbitalId, autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Atomic Orbitals</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Select different orbitals</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Orbital & View Options">
          <div className="w-48">
            <Select value={orbitalId} onValueChange={setOrbitalId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORBITALS.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          <h3 className="font-semibold">{orbital.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{orbital.description}</p>
          <p className="mt-2 text-xs">
            <span className="font-medium text-foreground">Shape:</span>{" "}
            <span className="text-muted-foreground">{orbital.shape}</span>
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Quantum Numbers</p>
          <p>n = principal (energy level) • l = azimuthal (shape: 0=s, 1=p, 2=d, 3=f) • m = magnetic (orientation)</p>
        </div>

        <MeaningPanel
          title="Why orbital shapes matter"
          meaning="Orbitals describe the probability of finding an electron. s orbitals are spherical, p orbitals are dumbbell-shaped, and d orbitals are clover-shaped. These shapes determine how atoms bond and form molecules."
          points={[
            "n (principal quantum number): 1, 2, 3... — larger n = higher energy level, farther from nucleus",
            "l (azimuthal): 0=s, 1=p, 2=d, 3=f — determines orbital shape",
            "Each orbital holds max 2 electrons (Pauli exclusion principle)",
            "s holds 2, p holds 6, d holds 10, f holds 14 electrons total",
            "Electrons fill lowest energy orbitals first (Aufbau principle)",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D VSEPR Geometry Viewer
   ============================================================ */

type VSEPRDef = {
  id: string;
  name: string;
  formula: string;
  electronPairs: number;
  lonePairs: number;
  bondAngle: string;
  description: string;
  atomPositions: [number, number, number][];
  lonePairPositions: [number, number, number][];
};

const VSEPR_SHAPES: VSEPRDef[] = [
  {
    id: "linear",
    name: "Linear",
    formula: "BeCl₂, CO₂",
    electronPairs: 2,
    lonePairs: 0,
    bondAngle: "180°",
    description: "2 electron pairs, 0 lone pairs. sp hybridization. Atoms arranged in a straight line.",
    atomPositions: [
      [0, 0, 0],
      [1.4, 0, 0],
      [-1.4, 0, 0],
    ],
    lonePairPositions: [],
  },
  {
    id: "trigonal-planar",
    name: "Trigonal Planar",
    formula: "BF₃, SO₃",
    electronPairs: 3,
    lonePairs: 0,
    bondAngle: "120°",
    description: "3 electron pairs, 0 lone pairs. sp² hybridization. Flat triangular arrangement.",
    atomPositions: [
      [0, 0, 0],
      [1.3, 0, 0],
      [-0.65, 1.13, 0],
      [-0.65, -1.13, 0],
    ],
    lonePairPositions: [],
  },
  {
    id: "bent-2",
    name: "Bent (2 lone pairs)",
    formula: "H₂O, H₂S",
    electronPairs: 4,
    lonePairs: 2,
    bondAngle: "104.5°",
    description: "4 electron pairs, 2 lone pairs. sp³ hybridization. Lone pairs compress the bond angle from 109.5° to 104.5°.",
    atomPositions: [
      [0, 0, 0],
      [1.0, 0.6, 0],
      [-1.0, 0.6, 0],
    ],
    lonePairPositions: [
      [0, -0.8, 0.4],
      [0, -0.8, -0.4],
    ],
  },
  {
    id: "tetrahedral",
    name: "Tetrahedral",
    formula: "CH₄, CCl₄",
    electronPairs: 4,
    lonePairs: 0,
    bondAngle: "109.5°",
    description: "4 electron pairs, 0 lone pairs. sp³ hybridization. Four bonds point to corners of a tetrahedron.",
    atomPositions: [
      [0, 0, 0],
      [1.0, 1.0, 1.0],
      [-1.0, -1.0, 1.0],
      [-1.0, 1.0, -1.0],
      [1.0, -1.0, -1.0],
    ],
    lonePairPositions: [],
  },
  {
    id: "trigonal-pyramidal",
    name: "Trigonal Pyramidal",
    formula: "NH₃, PH₃",
    electronPairs: 4,
    lonePairs: 1,
    bondAngle: "107°",
    description: "4 electron pairs, 1 lone pair. sp³ hybridization. Lone pair pushes bonds down, compressing angle to 107°.",
    atomPositions: [
      [0, 0.5, 0],
      [1.0, -0.4, 0],
      [-0.5, -0.4, 0.87],
      [-0.5, -0.4, -0.87],
    ],
    lonePairPositions: [[0, 1.1, 0]],
  },
  {
    id: "trigonal-bipyramidal",
    name: "Trigonal Bipyramidal",
    formula: "PCl₅, PF₅",
    electronPairs: 5,
    lonePairs: 0,
    bondAngle: "90°, 120°",
    description: "5 electron pairs, 0 lone pairs. sp³d hybridization. Three equatorial (120°) + two axial (90°) bonds.",
    atomPositions: [
      [0, 0, 0],
      [1.3, 0, 0],
      [-0.65, 1.13, 0],
      [-0.65, -1.13, 0],
      [0, 0, 1.3],
      [0, 0, -1.3],
    ],
    lonePairPositions: [],
  },
  {
    id: "octahedral",
    name: "Octahedral",
    formula: "SF₆, PF₆⁻",
    electronPairs: 6,
    lonePairs: 0,
    bondAngle: "90°",
    description: "6 electron pairs, 0 lone pairs. sp³d² hybridization. Six bonds point to corners of an octahedron.",
    atomPositions: [
      [0, 0, 0],
      [1.3, 0, 0],
      [-1.3, 0, 0],
      [0, 1.3, 0],
      [0, -1.3, 0],
      [0, 0, 1.3],
      [0, 0, -1.3],
    ],
    lonePairPositions: [],
  },
  {
    id: "square-planar",
    name: "Square Planar",
    formula: "XeF₄, PtCl₄²⁻",
    electronPairs: 6,
    lonePairs: 2,
    bondAngle: "90°",
    description: "6 electron pairs, 2 lone pairs. sp³d² hybridization. Lone pairs occupy axial positions, leaving a square plane.",
    atomPositions: [
      [0, 0, 0],
      [1.2, 0, 0],
      [-1.2, 0, 0],
      [0, 1.2, 0],
      [0, -1.2, 0],
    ],
    lonePairPositions: [
      [0, 0, 1.2],
      [0, 0, -1.2],
    ],
  },
];

function VSEPRViewer() {
  const [shapeId, setShapeId] = useState("tetrahedral");
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const shape = VSEPR_SHAPES.find((s) => s.id === shapeId) ?? VSEPR_SHAPES[3];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const meshes: THREE.Mesh[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(3.5, 2.5, 4);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Central atom
      const centerGeo = new THREE.SphereGeometry(0.4, 24, 24);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.3,
        metalness: 0.2,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.1,
      });
      const center = new THREE.Mesh(centerGeo, centerMat);
      scene.add(center);
      meshes.push(center);

      // Bond atoms
      shape.atomPositions.slice(1).forEach((pos) => {
        const geo = new THREE.SphereGeometry(0.3, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          roughness: 0.3,
          metalness: 0.2,
          emissive: 0xef4444,
          emissiveIntensity: 0.1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...pos);
        scene.add(mesh);
        meshes.push(mesh);

        // Bond line
        const p1 = new THREE.Vector3(0, 0, 0);
        const p2 = new THREE.Vector3(...pos);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const len = p1.distanceTo(p2);
        const dirVec = p2.clone().sub(p1).normalize();
        const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, len * 0.9, 8);
        const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.3 });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.copy(mid);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
        scene.add(bond);
        meshes.push(bond);
      });

      // Lone pairs (semi-transparent)
      shape.lonePairPositions.forEach((pos) => {
        const geo = new THREE.SphereGeometry(0.28, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x22c55e,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.4,
          emissive: 0x22c55e,
          emissiveIntensity: 0.2,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...pos);
        scene.add(mesh);
        meshes.push(mesh);

        // Dashed bond to lone pair
        const p1 = new THREE.Vector3(0, 0, 0);
        const p2 = new THREE.Vector3(...pos);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const len = p1.distanceTo(p2);
        const dirVec = p2.clone().sub(p1).normalize();
        const bondGeo = new THREE.CylinderGeometry(0.05, 0.05, len * 0.9, 8);
        const bondMat = new THREE.MeshStandardMaterial({
          color: 0x22c55e,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.3,
        });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.copy(mid);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
        scene.add(bond);
        meshes.push(bond);
      });

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        meshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [shapeId, autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D VSEPR Molecular Geometry</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Select a shape</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Shape & View Options">
          <div className="w-56">
            <Select value={shapeId} onValueChange={setShapeId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VSEPR_SHAPES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <h3 className="font-semibold">{shape.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{shape.description}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Example:</span>
                <p className="font-medium">{shape.formula}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Bond angle:</span>
                <p className="font-medium">{shape.bondAngle}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Electron pairs:</span>
                <p className="font-medium">{shape.electronPairs}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Lone pairs:</span>
                <p className="font-medium">{shape.lonePairs}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-500" /> Central atom
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-500" /> Bonded atom
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-green-500 opacity-50" /> Lone pair
          </span>
        </div>

        <MeaningPanel
          title="What is VSEPR theory?"
          meaning="Valence Shell Electron Pair Repulsion (VSEPR) theory states that electron pairs around a central atom arrange themselves as far apart as possible to minimize repulsion. This predicts molecular shapes."
          points={[
            "Lone pair–lone pair repulsion > lone pair–bond pair > bond pair–bond pair",
            "Lone pairs compress bond angles: CH₄=109.5°, NH₃=107°, H₂O=104.5°",
            "2 pairs → linear (180°), 3 pairs → trigonal planar (120°)",
            "4 pairs → tetrahedral (109.5°), 5 pairs → trigonal bipyramidal, 6 pairs → octahedral",
            "This predicts polarity: symmetric shapes can be non-polar despite polar bonds",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Crystal Lattice Viewer
   ============================================================ */

type LatticeDef = {
  id: string;
  name: string;
  formula: string;
  structure: string;
  description: string;
  atomA: { symbol: string; color: number; radius: number };
  atomB?: { symbol: string; color: number; radius: number };
  positions: { type: "A" | "B"; pos: [number, number, number] }[];
};

const LATTICES: LatticeDef[] = [
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl",
    structure: "Face-Centered Cubic (FCC)",
    description: "Na⁺ and Cl⁻ ions alternate in a face-centered cubic lattice. Each Na⁺ is surrounded by 6 Cl⁻ ions (octahedral coordination).",
    atomA: { symbol: "Na", color: 0xf97316, radius: 0.22 },
    atomB: { symbol: "Cl", color: 0x22c55e, radius: 0.32 },
    positions: [
      // Cl at corners + face centers
      { type: "B", pos: [0, 0, 0] }, { type: "B", pos: [1, 0, 0] }, { type: "B", pos: [0, 1, 0] }, { type: "B", pos: [0, 0, 1] },
      { type: "B", pos: [1, 1, 0] }, { type: "B", pos: [1, 0, 1] }, { type: "B", pos: [0, 1, 1] }, { type: "B", pos: [1, 1, 1] },
      { type: "B", pos: [0.5, 0.5, 0] }, { type: "B", pos: [0.5, 0, 0.5] }, { type: "B", pos: [0, 0.5, 0.5] },
      { type: "B", pos: [0.5, 0.5, 1] }, { type: "B", pos: [0.5, 1, 0.5] }, { type: "B", pos: [1, 0.5, 0.5] },
      // Na at edge centers + body center
      { type: "A", pos: [0.5, 0, 0] }, { type: "A", pos: [0, 0.5, 0] }, { type: "A", pos: [0, 0, 0.5] },
      { type: "A", pos: [0.5, 1, 0] }, { type: "A", pos: [1, 0.5, 0] }, { type: "A", pos: [1, 0, 0.5] },
      { type: "A", pos: [0.5, 0, 1] }, { type: "A", pos: [0, 0.5, 1] }, { type: "A", pos: [0, 1, 0.5] },
      { type: "A", pos: [0.5, 1, 1] }, { type: "A", pos: [1, 0.5, 1] }, { type: "A", pos: [1, 1, 0.5] },
      { type: "A", pos: [0.5, 0.5, 0.5] },
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    formula: "C",
    structure: "Diamond Cubic",
    description: "Each carbon atom is sp³ hybridized and bonded to 4 others in a tetrahedral arrangement. This 3D network makes diamond the hardest natural material.",
    atomA: { symbol: "C", color: 0x38bdf8, radius: 0.25 },
    positions: [
      { type: "A", pos: [0, 0, 0] }, { type: "A", pos: [1, 0, 0] }, { type: "A", pos: [0, 1, 0] }, { type: "A", pos: [0, 0, 1] },
      { type: "A", pos: [1, 1, 0] }, { type: "A", pos: [1, 0, 1] }, { type: "A", pos: [0, 1, 1] }, { type: "A", pos: [1, 1, 1] },
      { type: "A", pos: [0.5, 0.5, 0.5] },
      { type: "A", pos: [0.25, 0.25, 0.25] }, { type: "A", pos: [0.75, 0.75, 0.25] },
      { type: "A", pos: [0.75, 0.25, 0.75] }, { type: "A", pos: [0.25, 0.75, 0.75] },
      { type: "A", pos: [0.25, 0.25, 0.75] }, { type: "A", pos: [0.75, 0.75, 0.75] },
      { type: "A", pos: [0.75, 0.25, 0.25] }, { type: "A", pos: [0.25, 0.75, 0.25] },
    ],
  },
  {
    id: "graphite",
    name: "Graphite",
    formula: "C",
    structure: "Layered Hexagonal",
    description: "Carbon atoms form hexagonal sheets (sp² hybridized) with weak van der Waals forces between layers. This is why graphite is soft and a good lubricant.",
    atomA: { symbol: "C", color: 0x64748b, radius: 0.22 },
    positions: [
      // Layer 1
      { type: "A", pos: [0, 0, 0] }, { type: "A", pos: [1, 0, 0] }, { type: "A", pos: [0.5, 0.87, 0] },
      { type: "A", pos: [1.5, 0.87, 0] }, { type: "A", pos: [0, 1.73, 0] }, { type: "A", pos: [1, 1.73, 0] },
      { type: "A", pos: [0.5, 2.6, 0] }, { type: "A", pos: [1.5, 2.6, 0] },
      // Layer 2 (offset)
      { type: "A", pos: [0.5, 0.43, 0.8] }, { type: "A", pos: [1.5, 0.43, 0.8] },
      { type: "A", pos: [0, 1.3, 0.8] }, { type: "A", pos: [1, 1.3, 0.8] },
      { type: "A", pos: [0.5, 2.17, 0.8] }, { type: "A", pos: [1.5, 2.17, 0.8] },
      // Layer 3
      { type: "A", pos: [0, 0, 1.6] }, { type: "A", pos: [1, 0, 1.6] }, { type: "A", pos: [0.5, 0.87, 1.6] },
      { type: "A", pos: [1.5, 0.87, 1.6] }, { type: "A", pos: [0, 1.73, 1.6] }, { type: "A", pos: [1, 1.73, 1.6] },
    ],
  },
  {
    id: "fcc",
    name: "Copper (FCC)",
    formula: "Cu",
    structure: "Face-Centered Cubic",
    description: "Copper crystallizes in a face-centered cubic lattice. Each atom touches 12 neighbors (coordination number 12). Excellent electrical conductivity.",
    atomA: { symbol: "Cu", color: 0xd97706, radius: 0.28 },
    positions: [
      { type: "A", pos: [0, 0, 0] }, { type: "A", pos: [1, 0, 0] }, { type: "A", pos: [0, 1, 0] }, { type: "A", pos: [0, 0, 1] },
      { type: "A", pos: [1, 1, 0] }, { type: "A", pos: [1, 0, 1] }, { type: "A", pos: [0, 1, 1] }, { type: "A", pos: [1, 1, 1] },
      { type: "A", pos: [0.5, 0.5, 0] }, { type: "A", pos: [0.5, 0, 0.5] }, { type: "A", pos: [0, 0.5, 0.5] },
      { type: "A", pos: [0.5, 0.5, 1] }, { type: "A", pos: [0.5, 1, 0.5] }, { type: "A", pos: [1, 0.5, 0.5] },
    ],
  },
  {
    id: "bcc",
    name: "Iron (BCC)",
    formula: "Fe",
    structure: "Body-Centered Cubic",
    description: "Iron crystallizes in a body-centered cubic lattice at room temperature. Each atom touches 8 neighbors. This structure gives iron its strength.",
    atomA: { symbol: "Fe", color: 0xdc2626, radius: 0.28 },
    positions: [
      { type: "A", pos: [0, 0, 0] }, { type: "A", pos: [1, 0, 0] }, { type: "A", pos: [0, 1, 0] }, { type: "A", pos: [0, 0, 1] },
      { type: "A", pos: [1, 1, 0] }, { type: "A", pos: [1, 0, 1] }, { type: "A", pos: [0, 1, 1] }, { type: "A", pos: [1, 1, 1] },
      { type: "A", pos: [0.5, 0.5, 0.5] },
    ],
  },
];

function CrystalLatticeViewer() {
  const [latticeId, setLatticeId] = useState("nacl");
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const lattice = LATTICES.find((l) => l.id === latticeId) ?? LATTICES[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const meshes: THREE.Mesh[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(3.5, 2.5, 4);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.0;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Unit cell wireframe
      const cellSize = 1.6;
      const cellGeo = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
      const cellEdges = new THREE.EdgesGeometry(cellGeo);
      const cellLine = new THREE.LineSegments(
        cellEdges,
        new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 })
      );
      cellLine.position.set(cellSize / 2, cellSize / 2, cellSize / 2);
      scene.add(cellLine);

      // Atoms
      lattice.positions.forEach((p) => {
        const style = p.type === "A" ? lattice.atomA : lattice.atomB!;
        const geo = new THREE.SphereGeometry(style.radius * cellSize, 20, 20);
        const mat = new THREE.MeshStandardMaterial({
          color: style.color,
          roughness: 0.3,
          metalness: 0.3,
          emissive: style.color,
          emissiveIntensity: 0.08,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(p.pos[0] * cellSize, p.pos[1] * cellSize, p.pos[2] * cellSize);
        scene.add(mesh);
        meshes.push(mesh);
      });

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        meshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [latticeId, autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Crystal Lattices</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Select a lattice</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Lattice & View Options">
          <div className="w-56">
            <Select value={latticeId} onValueChange={setLatticeId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LATTICES.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.formula} — {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <h3 className="font-semibold">{lattice.name} ({lattice.formula})</h3>
            <p className="mt-1 text-xs text-muted-foreground">{lattice.description}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <p className="text-xs">
              <span className="font-medium text-foreground">Structure:</span>{" "}
              <span className="text-muted-foreground">{lattice.structure}</span>
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: `#${lattice.atomA.color.toString(16).padStart(6, "0")}` }}
                />
                {lattice.atomA.symbol}
              </span>
              {lattice.atomB && (
                <span className="flex items-center gap-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: `#${lattice.atomB.color.toString(16).padStart(6, "0")}` }}
                  />
                  {lattice.atomB.symbol}
                </span>
              )}
            </div>
          </div>
        </div>

        <MeaningPanel
          title="Why crystal structure matters"
          meaning="The arrangement of atoms in a crystal determines its hardness, conductivity, density, and melting point. Diamond and graphite are both pure carbon but have opposite properties due to different lattices."
          points={[
            "BCC (Iron): 8 neighbors per atom → strong and ductile",
            "FCC (Copper): 12 neighbors per atom → excellent conductor",
            "Diamond: tetrahedral covalent network → hardest natural material",
            "Graphite: layered hexagonal sheets → soft, slippery, conducts electricity in sheets",
            "NaCl: ionic lattice with 6:6 coordination → dissolves in water due to ion-dipole forces",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Bohr Atomic Model Viewer (animated electron shells)
   ============================================================ */

type BohrElementDef = {
  symbol: string;
  name: string;
  protons: number;
  shells: number[];
};

const BOHR_ELEMENTS: BohrElementDef[] = [
  { symbol: "H", name: "Hydrogen", protons: 1, shells: [1] },
  { symbol: "He", name: "Helium", protons: 2, shells: [2] },
  { symbol: "Li", name: "Lithium", protons: 3, shells: [2, 1] },
  { symbol: "Be", name: "Beryllium", protons: 4, shells: [2, 2] },
  { symbol: "B", name: "Boron", protons: 5, shells: [2, 3] },
  { symbol: "C", name: "Carbon", protons: 6, shells: [2, 4] },
  { symbol: "N", name: "Nitrogen", protons: 7, shells: [2, 5] },
  { symbol: "O", name: "Oxygen", protons: 8, shells: [2, 6] },
  { symbol: "F", name: "Fluorine", protons: 9, shells: [2, 7] },
  { symbol: "Ne", name: "Neon", protons: 10, shells: [2, 8] },
  { symbol: "Na", name: "Sodium", protons: 11, shells: [2, 8, 1] },
  { symbol: "Mg", name: "Magnesium", protons: 12, shells: [2, 8, 2] },
  { symbol: "Al", name: "Aluminium", protons: 13, shells: [2, 8, 3] },
  { symbol: "Cl", name: "Chlorine", protons: 17, shells: [2, 8, 7] },
  { symbol: "Ar", name: "Argon", protons: 18, shells: [2, 8, 8] },
  { symbol: "K", name: "Potassium", protons: 19, shells: [2, 8, 8, 1] },
  { symbol: "Ca", name: "Calcium", protons: 20, shells: [2, 8, 8, 2] },
];

function BohrModelViewer() {
  const [elementId, setElementId] = useState("Na");
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const element = BOHR_ELEMENTS.find((e) => e.symbol === elementId) ?? BOHR_ELEMENTS[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const electronMeshes: { mesh: THREE.Mesh; radius: number; angle: number; tiltX: number; tiltZ: number; speed: number }[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
      if (!isWebGLAvailable()) return;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(3, 2.5, 4);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 15;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Nucleus: protons + neutrons
      const protons = element.protons;
      const neutrons = Math.round(protons * 1.1);
      const nucleusGroup = new THREE.Group();

      const nucleusRadius = 0.25 + protons * 0.008;
      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(nucleusRadius, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xef4444,
          roughness: 0.3,
          metalness: 0.2,
          emissive: 0xef4444,
          emissiveIntensity: 0.3,
        })
      );
      nucleusGroup.add(nucleus);

      // Small spheres for protons (red) and neutrons (gray) orbiting nucleus
      for (let i = 0; i < protons; i++) {
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0xf87171, emissive: 0xf87171, emissiveIntensity: 0.2 })
        );
        const theta = Math.PI * 2 * (i / protons);
        const phi = Math.acos(2 * (i % 7) / 7 - 1);
        p.position.set(
          nucleusRadius * 1.5 * Math.sin(phi) * Math.cos(theta),
          nucleusRadius * 1.5 * Math.cos(phi),
          nucleusRadius * 1.5 * Math.sin(phi) * Math.sin(theta)
        );
        nucleusGroup.add(p);
      }
      for (let i = 0; i < neutrons; i++) {
        const n = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.5 })
        );
        const theta = Math.PI * 2 * (i / neutrons) + 0.5;
        const phi = Math.acos(2 * (i % 5) / 5 - 1);
        n.position.set(
          nucleusRadius * 1.5 * Math.sin(phi) * Math.cos(theta),
          nucleusRadius * 1.5 * Math.cos(phi),
          nucleusRadius * 1.5 * Math.sin(phi) * Math.sin(theta)
        );
        nucleusGroup.add(n);
      }

      scene.add(nucleusGroup);

      // Electron shells
      const baseRadius = 1.2;
      element.shells.forEach((count, shellIdx) => {
        const shellRadius = baseRadius + shellIdx * 1.1;

        // Shell ring (semi-transparent torus)
        const ringGeo = new THREE.TorusGeometry(shellRadius, 0.02, 8, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.25,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        // Second perpendicular ring
        const ring2 = new THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.z = Math.PI / 2;
        scene.add(ring2);

        // Electrons
        for (let i = 0; i < count; i++) {
          const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
          const electronMat = new THREE.MeshStandardMaterial({
            color: 0x22d3ee,
            roughness: 0.1,
            metalness: 0.2,
            emissive: 0x22d3ee,
            emissiveIntensity: 0.6,
          });
          const electron = new THREE.Mesh(electronGeo, electronMat);
          scene.add(electron);
          electronMeshes.push({
            mesh: electron,
            radius: shellRadius,
            angle: (Math.PI * 2 * i) / count,
            tiltX: Math.random() * Math.PI,
            tiltZ: Math.random() * Math.PI,
            speed: (0.8 + shellIdx * 0.4) / Math.sqrt(shellRadius),
          });
        }
      });

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001 * speed;

        // Pulse nucleus
        nucleus.scale.setScalar(1 + Math.sin(time * 3) * 0.05);

        electronMeshes.forEach((em) => {
          const a = em.angle + time * em.speed;
          const x = em.radius * Math.cos(a) * Math.cos(em.tiltX);
          const y = em.radius * Math.sin(a) * Math.sin(em.tiltZ);
          const z = em.radius * Math.sin(a) * Math.cos(em.tiltX) + em.radius * Math.cos(a) * Math.sin(em.tiltZ) * 0.5;
          em.mesh.position.set(x, y * 0.5, z);
        });

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [elementId, speed]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Bohr Atomic Model</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Watch electrons orbit</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Element & Speed Options">
          <div className="w-44">
            <Select value={elementId} onValueChange={setElementId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOHR_ELEMENTS.map((e) => (
                  <SelectItem key={e.symbol} value={e.symbol}>
                    {e.symbol} — {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Speed:</Label>
            <Input
              type="range"
              min={0.2}
              max={3}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-xs font-medium tabular-nums">{speed.toFixed(1)}×</span>
          </div>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <h3 className="font-semibold">{element.name} ({element.symbol})</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Protons:</span>
                <p className="font-medium">{element.protons}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Electrons:</span>
                <p className="font-medium">{element.shells.reduce((a, b) => a + b, 0)}</p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <h3 className="font-semibold mb-1">Electron Configuration</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {element.shells.map((count, idx) => (
                <span key={idx} className="rounded-full border border-border px-2 py-0.5">
                  Shell {idx + 1}: {count} e⁻
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-500" /> Proton
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-gray-400" /> Neutron
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-cyan-400" /> Electron
          </span>
        </div>

        <MeaningPanel
          title="Bohr's Model — the theory behind this"
          meaning="Neils Bohr (1913) proposed that electrons orbit the nucleus in fixed circular paths called shells or energy levels. Electrons can only exist in these quantized orbits — they absorb energy to jump to higher shells and emit energy (as light) when dropping back."
          points={[
            "Shell formula: max electrons = 2n² (n=1→2, n=2→8, n=3→18)",
            "Electrons in outermost shell = valence electrons → determines reactivity",
            "Noble gases (He, Ne, Ar) have full outer shells → chemically inert",
            "Group 1 metals have 1 valence electron → highly reactive (lose 1 e⁻)",
            "Halogens have 7 valence electrons → reactive (gain 1 e⁻)",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D States of Matter particle simulator
   ============================================================ */

type MatterState = "solid" | "liquid" | "gas";

const MATTER_INFO: Record<MatterState, { label: string; description: string }> = {
  solid: {
    label: "Solid",
    description: "Particles vibrate around fixed positions. Strong intermolecular forces. Definite shape and volume.",
  },
  liquid: {
    label: "Liquid",
    description: "Particles move past each other but stay close. Moderate intermolecular forces. Definite volume, no fixed shape.",
  },
  gas: {
    label: "Gas",
    description: "Particles move freely at high speed. Weak intermolecular forces. No fixed shape or volume; fills container.",
  },
};

function StatesOfMatterSimulator() {
  const [state, setState] = useState<MatterState>("solid");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const particles: { mesh: THREE.Mesh; baseX: number; baseY: number; baseZ: number; phaseX: number; phaseY: number; phaseZ: number; velX: number; velY: number; velZ: number; color: number }[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
      if (!isWebGLAvailable()) return;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 5.5);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 10;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Container box outline
      const boxSize = 2.8;
      const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize * 0.7);
      const boxEdges = new THREE.EdgesGeometry(boxGeo);
      const boxLine = new THREE.LineSegments(
        boxEdges,
        new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 })
      );
      scene.add(boxLine);

      // Create 64 particles arranged in a cubic grid
      const gridSize = 4;
      const spacing = 0.5;
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          for (let z = 0; z < gridSize; z++) {
            const hue = (x + y + z) / (gridSize * 3);
            const color = new THREE.Color().setHSL(hue * 0.8 + 0.55, 0.8, 0.6);
            const geo = new THREE.SphereGeometry(0.16, 16, 16);
            const mat = new THREE.MeshStandardMaterial({
              color: color.getHex(),
              roughness: 0.2,
              metalness: 0.3,
              emissive: color.getHex(),
              emissiveIntensity: 0.1,
            });
            const mesh = new THREE.Mesh(geo, mat);
            const px = (x - gridSize / 2 + 0.5) * spacing;
            const py = (y - gridSize / 2 + 0.5) * spacing;
            const pz = (z - gridSize / 2 + 0.5) * spacing * 0.7;
            mesh.position.set(px, py, pz);
            scene.add(mesh);
            particles.push({
              mesh,
              baseX: px,
              baseY: py,
              baseZ: pz,
              phaseX: Math.random() * Math.PI * 2,
              phaseY: Math.random() * Math.PI * 2,
              phaseZ: Math.random() * Math.PI * 2,
              velX: (Math.random() - 0.5) * 0.05,
              velY: (Math.random() - 0.5) * 0.05,
              velZ: (Math.random() - 0.5) * 0.05,
              color: color.getHex(),
            });
          }
        }
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        particles.forEach((p) => {
          if (state === "solid") {
            // Small vibration around fixed lattice positions
            p.mesh.position.set(
              p.baseX + Math.sin(time * 5 + p.phaseX) * 0.08,
              p.baseY + Math.sin(time * 5 + p.phaseY) * 0.08,
              p.baseZ + Math.sin(time * 5 + p.phaseZ) * 0.08
            );
          } else if (state === "liquid") {
            // Slow drifting with bounds
            p.velX += (Math.random() - 0.5) * 0.0004;
            p.velY += (Math.random() - 0.5) * 0.0004 - 0.002; // gravity
            p.velZ += (Math.random() - 0.5) * 0.0004;
            p.velX = Math.max(-0.05, Math.min(0.05, p.velX));
            p.velY = Math.max(-0.05, Math.min(0.05, p.velY));
            p.velZ = Math.max(-0.05, Math.min(0.05, p.velZ));

            const bounds = 1.2;
            p.mesh.position.x += p.velX;
            p.mesh.position.y += p.velY;
            p.mesh.position.z += p.velZ;

            if (p.mesh.position.x > bounds) p.velX = -Math.abs(p.velX);
            if (p.mesh.position.x < -bounds) p.velX = Math.abs(p.velX);
            if (p.mesh.position.y > 0.5) p.velY = -Math.abs(p.velY);
            if (p.mesh.position.y < -1.4) p.velY = Math.abs(p.velY);
            if (p.mesh.position.z > bounds * 0.7) p.velZ = -Math.abs(p.velZ);
            if (p.mesh.position.z < -bounds * 0.7) p.velZ = Math.abs(p.velZ);
          } else {
            // Fast free movement with bounds
            p.velX += (Math.random() - 0.5) * 0.002;
            p.velY += (Math.random() - 0.5) * 0.002;
            p.velZ += (Math.random() - 0.5) * 0.002;
            p.velX = Math.max(-0.12, Math.min(0.12, p.velX));
            p.velY = Math.max(-0.12, Math.min(0.12, p.velY));
            p.velZ = Math.max(-0.12, Math.min(0.12, p.velZ));

            const bounds = 1.3;
            p.mesh.position.x += p.velX;
            p.mesh.position.y += p.velY;
            p.mesh.position.z += p.velZ;

            if (p.mesh.position.x > bounds) p.velX = -Math.abs(p.velX);
            if (p.mesh.position.x < -bounds) p.velX = Math.abs(p.velX);
            if (p.mesh.position.y > bounds * 0.9) p.velY = -Math.abs(p.velY);
            if (p.mesh.position.y < -bounds * 0.9) p.velY = Math.abs(p.velY);
            if (p.mesh.position.z > bounds * 0.6) p.velZ = -Math.abs(p.velZ);
            if (p.mesh.position.z < -bounds * 0.6) p.velZ = Math.abs(p.velZ);
          }
        });

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        particles.forEach((p) => {
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D States of Matter</span>
          <span className="text-xs text-muted-foreground font-normal">Particle motion in solids, liquids & gases</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {(["solid", "liquid", "gas"] as MatterState[]).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={state === s ? "default" : "outline"}
              onClick={() => setState(s)}
            >
              {MATTER_INFO[s].label}
            </Button>
          ))}
        </div>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          <h3 className="font-semibold">{MATTER_INFO[state].label}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{MATTER_INFO[state].description}</p>
        </div>

        <MeaningPanel
          title="Kinetic Theory of Matter"
          meaning="All matter is made of tiny particles (atoms, molecules, ions) in constant motion. The state of matter depends on the balance between kinetic energy (particle motion) and intermolecular forces (particle attraction)."
          points={[
            "Solid: strong forces hold particles in fixed lattice — only vibration",
            "Liquid: forces keep particles together but allow sliding — can flow",
            "Gas: kinetic energy overcomes forces — particles fill all available space",
            "Temperature ↑ → kinetic energy ↑ → solid → liquid → gas",
            "Melting point & boiling point are determined by intermolecular force strength",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Hybridization Viewer (sp, sp², sp³)
   ============================================================ */

type HybridDef = {
  id: string;
  name: string;
  geometry: string;
  angle: string;
  description: string;
  lobes: { dir: [number, number, number]; color: number }[];
};

const HYBRIDS: HybridDef[] = [
  {
    id: "sp",
    name: "sp Hybridization",
    geometry: "Linear",
    angle: "180°",
    description: "One s + one p orbital → 2 equivalent sp orbitals. Linear geometry (e.g. BeCl₂, CO₂, C₂H₂).",
    lobes: [
      { dir: [1, 0, 0], color: 0x3b82f6 },
      { dir: [-1, 0, 0], color: 0xef4444 },
    ],
  },
  {
    id: "sp2",
    name: "sp² Hybridization",
    geometry: "Trigonal Planar",
    angle: "120°",
    description: "One s + two p orbitals → 3 equivalent sp² orbitals. Trigonal planar (e.g. BF₃, SO₃, C₂H₄). The unhybridized p orbital forms a π bond.",
    lobes: [
      { dir: [1, 0, 0], color: 0x3b82f6 },
      { dir: [-0.5, Math.sqrt(3) / 2, 0], color: 0xef4444 },
      { dir: [-0.5, -Math.sqrt(3) / 2, 0], color: 0x22c55e },
    ],
  },
  {
    id: "sp3",
    name: "sp³ Hybridization",
    geometry: "Tetrahedral",
    angle: "109.5°",
    description: "One s + three p orbitals → 4 equivalent sp³ orbitals. Tetrahedral (e.g. CH₄, NH₃, H₂O). Carbon in diamond is sp³ hybridized.",
    lobes: [
      { dir: [1, 1, 1], color: 0x3b82f6 },
      { dir: [-1, -1, 1], color: 0xef4444 },
      { dir: [-1, 1, -1], color: 0x22c55e },
      { dir: [1, -1, -1], color: 0xeab308 },
    ],
  },
];

function HybridizationViewer() {
  const [hybridId, setHybridId] = useState("sp3");
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const hybrid = HYBRIDS.find((h) => h.id === hybridId) ?? HYBRIDS[2];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const meshes: THREE.Mesh[] = [];

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(3, 2.5, 4);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;

      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.5);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Center nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.8,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      scene.add(nucleus);
      meshes.push(nucleus);

      // Hybrid lobes
      hybrid.lobes.forEach((lobe) => {
        const dirVec = new THREE.Vector3(...lobe.dir).normalize();

        // Large lobe (positive phase)
        const largeGeo = new THREE.SphereGeometry(0.6, 24, 24);
        const largeMat = new THREE.MeshStandardMaterial({
          color: lobe.color,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.55,
          emissive: lobe.color,
          emissiveIntensity: 0.15,
        });
        const large = new THREE.Mesh(largeGeo, largeMat);
        large.position.copy(dirVec.clone().multiplyScalar(0.55));
        large.scale.set(1.2, 0.75, 0.75);
        large.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dirVec);
        scene.add(large);
        meshes.push(large);

        // Small lobe (negative phase)
        const smallGeo = new THREE.SphereGeometry(0.35, 24, 24);
        const smallMat = new THREE.MeshStandardMaterial({
          color: lobe.color,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.3,
        });
        const small = new THREE.Mesh(smallGeo, smallMat);
        small.position.copy(dirVec.clone().multiplyScalar(-0.35));
        small.scale.set(0.7, 0.5, 0.5);
        small.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dirVec);
        scene.add(small);
        meshes.push(small);
      });

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        meshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [hybridId, autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Orbital Hybridization</span>
          <span className="text-xs text-muted-foreground font-normal">View how s and p orbitals combine</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Hybridization & View Options">
          <div className="w-52">
            <Select value={hybridId} onValueChange={setHybridId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HYBRIDS.map((h) => (
                  <SelectItem key={h.id} value={h.id}>
                    {h.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          <h3 className="font-semibold">{hybrid.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{hybrid.description}</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Geometry:</span>
              <p className="font-medium">{hybrid.geometry}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Bond angle:</span>
              <p className="font-medium">{hybrid.angle}</p>
            </div>
          </div>
        </div>

        <MeaningPanel
          title="Why hybridization happens"
          meaning="Atomic orbitals (s, p) mix to form new equivalent hybrid orbitals that point in directions that maximize bond strength and minimize repulsion. This explains why carbon in CH₄ has 4 identical bonds despite having only 2 unpaired electrons."
          points={[
            "sp: 1s + 1p → 2 orbitals, linear, 180° (BeCl₂, C₂H₂)",
            "sp²: 1s + 2p → 3 orbitals, trigonal planar, 120° (BF₃, C₂H₄)",
            "sp³: 1s + 3p → 4 orbitals, tetrahedral, 109.5° (CH₄, NH₃, H₂O)",
            "Remaining unhybridized p orbitals form π bonds in double/triple bonds",
            "Carbon's ability to hybridize explains the vast diversity of organic compounds",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Bohr's Theory: Energy Levels, Transitions & Spectral Series
   ============================================================ */

const RYDBERG = 1.097e7; // m⁻¹
const H_SPEED = 2.998e8; // m/s
const PLANCK = 6.626e-34; // J·s

type Transition = {
  from: number;
  to: number;
};

function wavelengthOfTransition(from: number, to: number): number {
  const waveNumber = RYDBERG * (1 / (to * to) - 1 / (from * from));
  return 1 / waveNumber; // meters
}

function wavelengthToColor(wavelengthM: number): number {
  const wl = wavelengthM * 1e9; // nm
  if (wl >= 620) return 0xef4444;
  if (wl >= 590) return 0xf97316;
  if (wl >= 570) return 0xeab308;
  if (wl >= 495) return 0x22c55e;
  if (wl >= 450) return 0x3b82f6;
  if (wl >= 380) return 0x8b5cf6;
  return 0xa855f7;
}

const SPECTRAL_SERIES: { name: string; to: number; region: string; description: string }[] = [
  { name: "Lyman", to: 1, region: "Ultraviolet", description: "n ≥ 2 → n = 1. UV region. Highest energy photons." },
  { name: "Balmer", to: 2, region: "Visible", description: "n ≥ 3 → n = 2. Four visible lines: Hα (red), Hβ (blue-green), Hγ (violet), Hδ." },
  { name: "Paschen", to: 3, region: "Infrared", description: "n ≥ 4 → n = 3. Infrared region." },
  { name: "Brackett", to: 4, region: "Far Infrared", description: "n ≥ 5 → n = 4. Far infrared region." },
  { name: "Pfund", to: 5, region: "Infrared", description: "n ≥ 6 → n = 5. Deep infrared region." },
];

function BohrTheoryViewer() {
  const [series, setSeries] = useState(1); // Lyman
  const [fromLevel, setFromLevel] = useState(4);
  const [toLevel, setToLevel] = useState(2);
  const [showElectrons, setShowElectrons] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const activeSeries = SPECTRAL_SERIES[series];
  const transition: Transition = { from: fromLevel, to: toLevel };

  const wl = wavelengthOfTransition(transition.from, transition.to);
  const freq = H_SPEED / wl;
  const energy = PLANCK * freq;
  const color = wavelengthToColor(wl);
  const transitionName = `n = ${transition.from} → n = ${transition.to}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const electronMeshes: { mesh: THREE.Mesh; radius: number; angle: number; speed: number }[] = [];
    let photonMesh: THREE.Mesh | null = null;
    let animTime = 0;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
      if (!isWebGLAvailable()) return;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 6);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.2,
        emissive: 0xef4444,
        emissiveIntensity: 0.5,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      scene.add(nucleus);

      // Energy level rings (n=1 to n=6)
      const baseRadius = 0.8;
      for (let n = 1; n <= 6; n++) {
        const radius = baseRadius * n;
        const ringGeo = new THREE.TorusGeometry(radius, 0.025, 8, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: n === transition.from ? 0x22d3ee : n === transition.to ? 0xfbbf24 : 0x3b82f6,
          transparent: true,
          opacity: n === transition.from || n === transition.to ? 0.7 : 0.3,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        // Level label sprite (canvas texture)
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 128, 64);
        ctx.font = "bold 28px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = n === transition.from || n === transition.to ? "#ffffff" : "#94a3b8";
        ctx.fillText(`n=${n}`, 64, 32);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(radius + 0.3, 0.3, 0);
        sprite.scale.set(0.7, 0.35, 1);
        scene.add(sprite);
      }

      // Electron at "from" level (glowing cyan)
      if (showElectrons) {
        const eGeo = new THREE.SphereGeometry(0.14, 16, 16);
        const eMat = new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          roughness: 0.1,
          metalness: 0.2,
          emissive: 0x22d3ee,
          emissiveIntensity: 0.8,
        });
        const electron = new THREE.Mesh(eGeo, eMat);
        scene.add(electron);
        electronMeshes.push({
          mesh: electron,
          radius: baseRadius * transition.from,
          angle: 0,
          speed: 1.5,
        });
      }

      // Emitted photon (glowing sphere that travels outward from "to" level)
      const photonGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const photonMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
      });
      photonMesh = new THREE.Mesh(photonGeo, photonMat);
      photonMesh.visible = false;
      scene.add(photonMesh);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.016;

        // Electron orbits at "from" radius
        electronMeshes.forEach((em) => {
          const a = em.angle + animTime * em.speed;
          em.mesh.position.set(
            em.radius * Math.cos(a),
            0,
            em.radius * Math.sin(a)
          );
        });

        // Photon emission animation every 3 seconds
        const cycle = animTime % 4;
        if (cycle > 1 && cycle < 3.5) {
          const progress = (cycle - 1) / 2.5;
          const radius = baseRadius * (transition.to + 0.5 + progress * 2.5);
          const a = animTime * 2;
          photonMesh!.visible = true;
          photonMesh!.position.set(
            radius * Math.cos(a),
            0,
            radius * Math.sin(a)
          );
          (photonMesh!.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - progress);
        } else {
          photonMesh!.visible = false;
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
        electronMeshes.forEach((em) => {
          em.mesh.geometry.dispose();
          (em.mesh.material as THREE.Material).dispose();
        });
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [transition.from, transition.to, showElectrons]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Bohr&rsquo;s Theory — Energy Transitions</span>
          <span className="text-xs text-muted-foreground font-normal">Electron jumps emit photons of specific colors</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Series & Transition Options">
          <div className="w-44">
            <Select
              value={String(series)}
              onValueChange={(v) => {
                const s = Number(v);
                setSeries(s);
                setToLevel(SPECTRAL_SERIES[s].to);
                setFromLevel(SPECTRAL_SERIES[s].to + 2);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SPECTRAL_SERIES.map((s, i) => (
                  <SelectItem key={s.name} value={String(i)}>
                    {s.name} Series
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">From n=</Label>
            <Input
              type="number"
              min={2}
              max={6}
              value={fromLevel}
              onChange={(e) => setFromLevel(Number(e.target.value))}
              className="w-16"
            />
            <Label className="text-xs text-muted-foreground">To n=</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={toLevel}
              onChange={(e) => setToLevel(Number(e.target.value))}
              className="w-16"
            />
          </div>
          <Button
            variant={showElectrons ? "default" : "outline"}
            size="sm"
            onClick={() => setShowElectrons(!showElectrons)}
          >
            {showElectrons ? "Electrons: ON" : "Electrons: OFF"}
          </Button>
        </CollapsibleControls>

        {error ? <WebGLFallback /> : <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-950" />}

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Transition</p>
            <p className="text-sm font-semibold">{transitionName}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wavelength</p>
            <p className="text-sm font-semibold">{(wl * 1e9).toFixed(1)} nm</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Frequency</p>
            <p className="text-sm font-semibold">{(freq / 1e14).toFixed(2)} × 10¹⁴ Hz</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Photon Energy</p>
            <p className="text-sm font-semibold">{(energy * 1e19).toFixed(2)} × 10⁻¹⁹ J</p>
          </div>
        </div>

        <div
          className="flex items-center gap-3 rounded-md border p-3"
          style={{ borderColor: `#${color.toString(16).padStart(6, "0")}`, backgroundColor: `#${color.toString(16).padStart(6, "0")}20` }}
        >
          <span
            className="h-8 w-8 rounded-full border-2 border-black/20"
            style={{ backgroundColor: `#${color.toString(16).padStart(6, "0")}` }}
          />
          <div>
            <p className="text-sm font-semibold">
              {activeSeries.name} Series — {activeSeries.region}
            </p>
            <p className="text-xs text-muted-foreground">{transitionName} emits light of this color</p>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Formula: 1/λ = R·(1/n₁² − 1/n₂²)</p>
          <p>{activeSeries.description}</p>
          <p className="mt-1">R = 1.097 × 10⁷ m⁻¹ (Rydberg constant)</p>
        </div>

        <MeaningPanel
          title="Bohr's Postulates (Class 11)"
          meaning="Bohr explained why atoms emit only specific colors of light: electrons can only occupy fixed energy levels (quantized orbits). When an electron falls from a higher level to a lower one, it releases a photon whose energy equals the difference between the two levels."
          points={[
            "Energy of a level: Eₙ = −2.18 × 10⁻¹⁸ / n² J (hydrogen)",
            "Photon energy = E_final − E_initial = h·ν = h·c/λ",
            "Lyman (UV): falls to n=1 • Balmer (visible): falls to n=2",
            "Paschen, Brackett, Pfund: fall to n=3, 4, 5 (infrared)",
            "This explains hydrogen's line spectrum — only certain colors appear",
            "Larger jump (n=6→1) = more energy = shorter wavelength = more violet/UV",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Main export
   ============================================================ */

export function Chemistry3D() {
  return (
    <Tabs defaultValue="molecules" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="molecules">Molecular Models</TabsTrigger>
        <TabsTrigger value="orbitals">Atomic Orbitals</TabsTrigger>
        <TabsTrigger value="vsepr">VSEPR Geometry</TabsTrigger>
        <TabsTrigger value="lattices">Crystal Lattices</TabsTrigger>
        <TabsTrigger value="bohr">Bohr Model</TabsTrigger>
        <TabsTrigger value="bohr-theory">Bohr Theory</TabsTrigger>
        <TabsTrigger value="matter">States of Matter</TabsTrigger>
        <TabsTrigger value="hybrid">Hybridization</TabsTrigger>
      </TabsList>

      <TabsContent value="molecules" className="mt-4">
        <MolecularModelViewer />
      </TabsContent>

      <TabsContent value="orbitals" className="mt-4">
        <OrbitalViewer />
      </TabsContent>

      <TabsContent value="vsepr" className="mt-4">
        <VSEPRViewer />
      </TabsContent>

      <TabsContent value="lattices" className="mt-4">
        <CrystalLatticeViewer />
      </TabsContent>

      <TabsContent value="bohr" className="mt-4">
        <BohrModelViewer />
      </TabsContent>

      <TabsContent value="bohr-theory" className="mt-4">
        <BohrTheoryViewer />
      </TabsContent>

      <TabsContent value="matter" className="mt-4">
        <StatesOfMatterSimulator />
      </TabsContent>

      <TabsContent value="hybrid" className="mt-4">
        <HybridizationViewer />
      </TabsContent>
    </Tabs>
  );
}

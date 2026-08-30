"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

type Molecule = {
  name: string;
  formula: string;
  atoms: { element: string; x: number; y: number; z: number; color: number; radius: number }[];
  bonds: { from: number; to: number; color: number }[];
  description: string;
};

const MOLECULES: Molecule[] = [
  {
    name: "Water (H₂O)",
    formula: "H₂O",
    atoms: [
      { element: "O", x: 0, y: 0, z: 0, color: 0xff0000, radius: 0.6 },
      { element: "H", x: 0.76, y: 0.58, z: 0, color: 0xffffff, radius: 0.3 },
      { element: "H", x: -0.76, y: 0.58, z: 0, color: 0xffffff, radius: 0.3 }
    ],
    bonds: [
      { from: 0, to: 1, color: 0x00ffff },
      { from: 0, to: 2, color: 0x00ffff }
    ],
    description: "Water molecule with bent shape (104.5° bond angle). Oxygen is electronegative, creating polar molecule."
  },
  {
    name: "Carbon Dioxide (CO₂)",
    formula: "CO₂",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, color: 0x000000, radius: 0.5 },
      { element: "O", x: 1.16, y: 0, z: 0, color: 0xff0000, radius: 0.45 },
      { element: "O", x: -1.16, y: 0, z: 0, color: 0xff0000, radius: 0.45 }
    ],
    bonds: [
      { from: 0, to: 1, color: 0x00ffff },
      { from: 0, to: 2, color: 0x00ffff }
    ],
    description: "Linear molecule with double bonds. Non-polar despite having polar bonds due to symmetry."
  },
  {
    name: "Methane (CH₄)",
    formula: "CH₄",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, color: 0x000000, radius: 0.5 },
      { element: "H", x: 0.62, y: 0.62, z: 0.62, color: 0xffffff, radius: 0.25 },
      { element: "H", x: -0.62, y: -0.62, z: 0.62, color: 0xffffff, radius: 0.25 },
      { element: "H", x: -0.62, y: 0.62, z: -0.62, color: 0xffffff, radius: 0.25 },
      { element: "H", x: 0.62, y: -0.62, z: -0.62, color: 0xffffff, radius: 0.25 }
    ],
    bonds: [
      { from: 0, to: 1, color: 0x00ffff },
      { from: 0, to: 2, color: 0x00ffff },
      { from: 0, to: 3, color: 0x00ffff },
      { from: 0, to: 4, color: 0x00ffff }
    ],
    description: "Tetrahedral molecule. First member of alkane series. Non-polar due to symmetrical shape."
  },
  {
    name: "Ammonia (NH₃)",
    formula: "NH₃",
    atoms: [
      { element: "N", x: 0, y: 0, z: 0, color: 0x0000ff, radius: 0.55 },
      { element: "H", x: 0.7, y: 0.4, z: 0, color: 0xffffff, radius: 0.25 },
      { element: "H", x: -0.7, y: 0.4, z: 0, color: 0xffffff, radius: 0.25 },
      { element: "H", x: 0, y: -0.6, z: 0, color: 0xffffff, radius: 0.25 }
    ],
    bonds: [
      { from: 0, to: 1, color: 0x00ffff },
      { from: 0, to: 2, color: 0x00ffff },
      { from: 0, to: 3, color: 0x00ffff }
    ],
    description: "Trigonal pyramidal molecule. Polar due to lone pair on nitrogen. Forms hydrogen bonds."
  },
  {
    name: "Glucose (C₆H₁₂O₆)",
    formula: "C₆H₁₂O₆",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, color: 0x000000, radius: 0.4 },
      { element: "C", x: 1, y: 0, z: 0, color: 0x000000, radius: 0.4 },
      { element: "C", x: 1.5, y: 1, z: 0, color: 0x000000, radius: 0.4 },
      { element: "C", x: 2.5, y: 1, z: 0, color: 0x000000, radius: 0.4 },
      { element: "C", x: 3, y: 0, z: 0, color: 0x000000, radius: 0.4 },
      { element: "C", x: 3.5, y: -1, z: 0, color: 0x000000, radius: 0.4 },
      { element: "O", x: 4.5, y: 0, z: 0, color: 0xff0000, radius: 0.35 },
      { element: "O", x: -1, y: 0, z: 0, color: 0xff0000, radius: 0.35 }
    ],
    bonds: [
      { from: 0, to: 1, color: 0x00ffff },
      { from: 1, to: 2, color: 0x00ffff },
      { from: 2, to: 3, color: 0x00ffff },
      { from: 3, to: 4, color: 0x00ffff },
      { from: 4, to: 5, color: 0x00ffff },
      { from: 5, to: 6, color: 0x00ffff },
      { from: 0, to: 7, color: 0x00ffff }
    ],
    description: "Hexose sugar. Chain structure with hydroxyl groups. Important energy source for cells."
  }
];

export const Chemistry3DMolecules: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedMolecule, setSelectedMolecule] = useState(MOLECULES[0]);
  const [showLabels, setShowLabels] = useState(true);
  const [showBonds, setShowBonds] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 8),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Lighting
        ts.group.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(5, 10, 7);
        ts.group.add(dir);

        // Molecule group
        const moleculeGroup = new THREE.Group();
        ts.group.add(moleculeGroup);

        // Atom spheres
        const atomGroup = new THREE.Group();
        moleculeGroup.add(atomGroup);

        // Bond lines
        const bondGroup = new THREE.Group();
        moleculeGroup.add(bondGroup);

        // LABELS
        let labelRenderer: any = null;
        let atomLabels: any[] = [];

        try {
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);
        } catch (e) { console.log("CSS2DRenderer not available"); }

        function createMolecule() {
          // Clear previous atoms
          while (atomGroup.children.length > 0) {
            const child = atomGroup.children[0];
            atomGroup.remove(child);
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }
          
          // Clear previous bonds
          while (bondGroup.children.length > 0) {
            const child = bondGroup.children[0];
            bondGroup.remove(child);
            if (child instanceof THREE.Line) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }

          // Clear previous labels
          atomLabels.forEach(label => {
            if (label && label.parent) {
              (label.parent as any).remove(label);
            }
          });
          atomLabels = [];

          // Create atoms
          selectedMolecule.atoms.forEach((atom, index) => {
            const geo = new THREE.SphereGeometry(atom.radius, 32, 32);
            const mat = standardMaterial(atom.color, { 
              emissive: atom.color, 
              emissiveIntensity: 0.2,
              metalness: 0.1,
              roughness: 0.4
            });
            const sphere = new THREE.Mesh(geo, mat);
            sphere.position.set(atom.x, atom.y, atom.z);
            sphere.castShadow = true;
            atomGroup.add(sphere);

            // Add label
            if (showLabels && labelRenderer) {
              const label = new CSS2DObject(document.createElement("div"));
              label.element.className = "label";
              label.element.innerHTML = `<div style="background:rgba(0,0,0,0.75);padding:3px 6px;border-radius:3px;color:white;font-weight:600;font-size:10px">${atom.element}</div>`;
              label.position.set(atom.x, atom.y + atom.radius + 0.3, atom.z);
              sphere.add(label);
              atomLabels.push(label);
            }
          });

          // Create bonds
          if (showBonds) {
            selectedMolecule.bonds.forEach(bond => {
              const from = selectedMolecule.atoms[bond.from];
              const to = selectedMolecule.atoms[bond.to];
              const fromVec = new THREE.Vector3(from.x, from.y, from.z);
              const toVec = new THREE.Vector3(to.x, to.y, to.z);
              const geo = new THREE.BufferGeometry().setFromPoints([fromVec, toVec]);
              const mat = new THREE.LineBasicMaterial({ color: bond.color, linewidth: 3 });
              const line = new THREE.Line(geo, mat);
              bondGroup.add(line);
            });
          }

          // Molecule name label
          if (labelRenderer) {
            const nameLabel = new CSS2DObject(document.createElement("div"));
            nameLabel.element.className = "label";
            nameLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.85);padding:8px 14px;border-radius:6px;border:2px solid #3b82f6"><span style="color:#3b82f6;font-weight:700;font-size:14px">${selectedMolecule.name}</span><br><span style="color:#93c5fd;font-size:11px">${selectedMolecule.formula}</span></div>`;
            nameLabel.position.set(0, selectedMolecule.atoms.reduce((max, a) => Math.max(max, a.y), 0) + 1.5, 0);
            moleculeGroup.add(nameLabel);
            atomLabels.push(nameLabel);
          }
        }

        createMolecule();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          ts.controls.autoRotate = autoRotate;
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }

        animate();
      } catch (error) { console.error("Error:", error); }
    }

    init();

    return () => {
      cancelled = true; if (unbind) unbind();
      if (ts) try { disposeThreeScene(ts); } catch (e) {}
    };
  }, [selectedMolecule, showLabels, showBonds, autoRotate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Molecular Structures with Labels</CardTitle>
        <CardDescription>
          Interactive 3D molecules with clearly labelled atoms and bonds. Rotate, zoom, and explore.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select value={selectedMolecule.name} onValueChange={(v) => setSelectedMolecule(MOLECULES.find(m => m.name === v) || MOLECULES[0])}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOLECULES.map(molecule => (
                  <SelectItem key={molecule.name} value={molecule.name}>
                    {molecule.name} ({molecule.formula})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">{selectedMolecule.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>
              {showLabels ? 'Hide' : 'Show'} Atom Labels
            </Button>
            <Button variant={showBonds ? "default" : "outline"} size="sm" onClick={() => setShowBonds(!showBonds)}>
              {showBonds ? 'Hide' : 'Show'} Bonds
            </Button>
            <Button variant={autoRotate ? "default" : "outline"} size="sm" onClick={() => setAutoRotate(!autoRotate)}>
              {autoRotate ? 'Stop' : 'Rotate'} Auto-Rotate
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">ATOM LEGEND:</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black rounded-full" />
              <span className="text-sm">Carbon (C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full border" />
              <span className="text-sm">Hydrogen (H)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-sm">Oxygen (O)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <span className="text-sm">Nitrogen (N)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-cyan-400" />
              <span className="text-sm">Bond</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">About 3D Molecules:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Drag to rotate:</strong> Explore the molecule from any angle</li>
            <li><strong>Scroll to zoom:</strong> Get closer to see atomic details</li>
            <li><strong>Atoms are color-coded:</strong> Standard CPK coloring (Carbon=black, Hydrogen=white, Oxygen=red, Nitrogen=blue)</li>
            <li><strong>Bonds:</strong> Cyan lines represent covalent bonds between atoms</li>
            <li><strong>Labels:</strong> Each atom is labelled with its element symbol</li>
          </ul>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Selected Molecule Properties:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium">Name:</p>
              <p>{selectedMolecule.name}</p>
            </div>
            <div>
              <p className="font-medium">Formula:</p>
              <p>{selectedMolecule.formula}</p>
            </div>
            <div>
              <p className="font-medium">Atoms:</p>
              <p>{selectedMolecule.atoms.length}</p>
            </div>
            <div>
              <p className="font-medium">Bonds:</p>
              <p>{selectedMolecule.bonds.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chemistry3DMolecules;

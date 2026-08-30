"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11ChemicalBonding: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [bondType, setBondType] = useState<"ionic" | "covalent" | "metallic">("covalent");
  const [moleculeType, setMoleculeType] = useState("water");
  const [bondLength, setBondLength] = useState(1.5);
  const [bondAngle, setBondAngle] = useState(104.5);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showOrbitals, setShowOrbitals] = useState(true);

  // Get molecule info
  const moleculeInfo = useMemo(() => {
    const molecules = {
      water: {
        name: "Water (H₂O)",
        atoms: [
          { symbol: "O", color: 0xef4444, radius: 0.4, position: [0, 0, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [1.5, 0.5, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [-1.5, 0.5, 0] },
        ],
        bonds: [[0, 1], [0, 2]],
        bondAngle: 104.5,
        description: "Polar covalent bond with bent shape",
        type: "covalent"
      },
      methane: {
        name: "Methane (CH₄)",
        atoms: [
          { symbol: "C", color: 0x6366f1, radius: 0.35, position: [0, 0, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [1, 1, 1] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [-1, 1, -1] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [1, -1, -1] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [-1, -1, 1] },
        ],
        bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
        bondAngle: 109.5,
        description: "Tetrahedral with 4 covalent bonds",
        type: "covalent"
      },
      sodiumChloride: {
        name: "Sodium Chloride (NaCl)",
        atoms: [
          { symbol: "Na", color: 0x22c55e, radius: 0.5, position: [0, 0, 0] },
          { symbol: "Cl", color: 0x88ff00, radius: 0.6, position: [2.5, 0, 0] },
        ],
        bonds: [[0, 1]],
        bondAngle: 180,
        description: "Ionic bond: Na⁺ + Cl⁻ → NaCl",
        type: "ionic"
      },
      oxygen: {
        name: "Oxygen (O₂)",
        atoms: [
          { symbol: "O", color: 0xef4444, radius: 0.4, position: [0, 0, 0] },
          { symbol: "O", color: 0xef4444, radius: 0.4, position: [1.2, 0, 0] },
        ],
        bonds: [[0, 1]],
        bondAngle: 180,
        description: "Double covalent bond: O=O",
        type: "covalent"
      },
      carbonDioxide: {
        name: "Carbon Dioxide (CO₂)",
        atoms: [
          { symbol: "C", color: 0x6366f1, radius: 0.35, position: [0, 0, 0] },
          { symbol: "O", color: 0xef4444, radius: 0.4, position: [1.2, 0, 0] },
          { symbol: "O", color: 0xef4444, radius: 0.4, position: [-1.2, 0, 0] },
        ],
        bonds: [[0, 1], [0, 2]],
        bondAngle: 180,
        description: "Linear molecule with double bonds: O=C=O",
        type: "covalent"
      },
      ammonia: {
        name: "Ammonia (NH₃)",
        atoms: [
          { symbol: "N", color: 0x00ffff, radius: 0.35, position: [0, 0, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [1, 0, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [-0.5, 0.866, 0] },
          { symbol: "H", color: 0xffffff, radius: 0.2, position: [-0.5, -0.866, 0] },
        ],
        bonds: [[0, 1], [0, 2], [0, 3]],
        bondAngle: 107,
        description: "Trigonal pyramidal with 3 covalent bonds",
        type: "covalent"
      }
    };
    return (molecules as any)[moleculeType] || molecules.water;
  }, [moleculeType]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 15),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Clear existing objects
        ts.group.children.forEach((child: any) => {
          ts.group.remove(child);
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });

        // Ground
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Create atoms
        const atomGroups: THREE.Group[] = [];
        const bondLines: THREE.Line[] = [];

        moleculeInfo.atoms.forEach((atom: any, index: number) => {
          const atomGroup = new THREE.Group();
          const atomGeo = new THREE.SphereGeometry(atom.radius, 32, 32);
          const atomMat = standardMaterial(atom.color, { 
            emissive: atom.color, 
            emissiveIntensity: 0.3,
            metalness: 0.2
          });
          const atomMesh = new THREE.Mesh(atomGeo, atomMat);
          atomMesh.castShadow = true;
          atomGroup.add(atomMesh);
          atomGroup.position.set(
            atom.position[0] * bondLength / 1.5,
            atom.position[1] * bondLength / 1.5,
            atom.position[2] * bondLength / 1.5
          );
          ts.group.add(atomGroup);
          atomGroups.push(atomGroup);
        });

        // Create bonds
        moleculeInfo.bonds.forEach((bond: any[]) => {
          const atom1 = moleculeInfo.atoms[bond[0]];
          const atom2 = moleculeInfo.atoms[bond[1]];
          
          const start = new THREE.Vector3(
            atom1.position[0] * bondLength / 1.5,
            atom1.position[1] * bondLength / 1.5,
            atom1.position[2] * bondLength / 1.5
          );
          const end = new THREE.Vector3(
            atom2.position[0] * bondLength / 1.5,
            atom2.position[1] * bondLength / 1.5,
            atom2.position[2] * bondLength / 1.5
          );

          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 });
          const line = new THREE.Line(geometry, material);
          ts.group.add(line);
          bondLines.push(line);
        });

        // Electron pairs for covalent bonds
        if (showElectrons && bondType === "covalent") {
          moleculeInfo.bonds.forEach((bond: any[]) => {
            const atom1 = moleculeInfo.atoms[bond[0]];
            const atom2 = moleculeInfo.atoms[bond[1]];
            
            const start = new THREE.Vector3(
              atom1.position[0] * bondLength / 1.5,
              atom1.position[1] * bondLength / 1.5,
              atom1.position[2] * bondLength / 1.5
            );
            const end = new THREE.Vector3(
              atom2.position[0] * bondLength / 1.5,
              atom2.position[1] * bondLength / 1.5,
              atom2.position[2] * bondLength / 1.5
            );

            // Create electron pairs
            const electronGeo = new THREE.SphereGeometry(0.1, 16, 16);
            const electronMat = standardMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 });

            for (let i = 0; i < 2; i++) {
              const electron1 = new THREE.Mesh(electronGeo, electronMat);
              const electron2 = new THREE.Mesh(electronGeo, electronMat);
              
              const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
              const offset = new THREE.Vector3(0, 0.3, 0);
              const offset2 = new THREE.Vector3(0, -0.3, 0);
              
              electron1.position.copy(midPoint).add(offset);
              electron2.position.copy(midPoint).add(offset2);
              
              ts.group.add(electron1);
              ts.group.add(electron2);
            }
          });
        }

        let startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed;

          // Rotate molecule
          ts.group.rotation.y = time * 0.1;

          // Animate electron pairs
          ts.group.children.forEach((child: any) => {
            if (child.geometry && (child.geometry as any).type === 'SphereGeometry' && child.material.emissiveIntensity > 0.5) {
              child.position.y += Math.sin(time * 2 + child.position.x * 10) * 0.02;
            }
          });

          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          updateScene();
        }

        animate();
      } catch (error) {
        console.error("Error initializing 3D scene:", error);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (unbind) unbind();
      if (ts) {
        try {
          disposeThreeScene(ts);
        } catch (e) {}
      }
    };
  }, [bondType, moleculeType, bondLength, bondAngle, showElectrons, showOrbitals, moleculeInfo]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Chemical Bonding</CardTitle>
        <CardDescription>
          Interactive 3D visualization of chemical bonds: ionic, covalent, and metallic.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Bond Type</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  variant={bondType === "covalent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBondType("covalent")}
                >
                  Covalent
                </Button>
                <Button
                  variant={bondType === "ionic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBondType("ionic")}
                >
                  Ionic
                </Button>
                <Button
                  variant={bondType === "metallic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBondType("metallic")}
                >
                  Metallic
                </Button>
              </div>
            </div>
            <div>
              <Label>Molecule</Label>
              <div className="flex gap-2 mt-1 flex-wrap">
                <Button
                  variant={moleculeType === "water" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("water")}
                >
                  H₂O
                </Button>
                <Button
                  variant={moleculeType === "methane" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("methane")}
                >
                  CH₄
                </Button>
                <Button
                  variant={moleculeType === "ammonia" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("ammonia")}
                >
                  NH₃
                </Button>
                <Button
                  variant={moleculeType === "carbonDioxide" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("carbonDioxide")}
                >
                  CO₂
                </Button>
                <Button
                  variant={moleculeType === "oxygen" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("oxygen")}
                >
                  O₂
                </Button>
                <Button
                  variant={moleculeType === "sodiumChloride" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMoleculeType("sodiumChloride")}
                >
                  NaCl
                </Button>
              </div>
            </div>
            <div>
              <Label>Bond Length</Label>
              <Slider min={1} max={3} step={0.1} value={[bondLength]} onValueChange={(v) => setBondLength(v[0])} />
              <p className="text-sm text-gray-500">Current: {bondLength} Å</p>
            </div>
            <div>
              <Label>Bond Angle (°)</Label>
              <Slider min={90} max={180} step={1} value={[bondAngle]} onValueChange={(v) => setBondAngle(v[0])} />
              <p className="text-sm text-gray-500">Current: {bondAngle}°</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowElectrons(!showElectrons)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showElectrons ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Electrons: {showElectrons ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Molecule: {moleculeInfo.name}</span></p>
              <p><strong>Type:</strong> {moleculeInfo.type === 'covalent' ? 'Covalent Bond' : moleculeInfo.type === 'ionic' ? 'Ionic Bond' : 'Metallic Bond'}</p>
              <p><strong>Atoms:</strong> {moleculeInfo.atoms.length}</p>
              <p><strong>Bonds:</strong> {moleculeInfo.bonds.length}</p>
              <p><strong>Shape:</strong> {moleculeInfo.description}</p>
            </div>

            <div>
              <h3 className="font-semibold">Chemical Bonding Types (Class 11)</h3>
              <div className="text-sm mt-2 space-y-3">
                <div>
                  <p className="font-medium text-primary">1. Ionic Bond:</p>
                  <p className="pl-4">Complete transfer of valence electrons from one atom to another</p>
                  <p className="pl-4 text-xs text-muted-foreground">Metal + Non-metal → Ionic compound (e.g., NaCl, MgO)</p>
                </div>
                <div>
                  <p className="font-medium text-primary">2. Covalent Bond:</p>
                  <p className="pl-4">Sharing of valence electrons between atoms</p>
                  <p className="pl-4 text-xs text-muted-foreground">Non-metal + Non-metal → Covalent compound (e.g., H₂O, CH₄)</p>
                </div>
                <div>
                  <p className="font-medium text-primary">3. Metallic Bond:</p>
                  <p className="pl-4">Electron sea model: Free electrons in a lattice of positive ions</p>
                  <p className="pl-4 text-xs text-muted-foreground">Metal atoms only (e.g., Na, Cu, Fe)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Covalent Bond Types</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Single Bond:</strong> 1 shared pair of electrons (e.g., H-H in H₂)</li>
                <li><strong>Double Bond:</strong> 2 shared pairs (e.g., O=O in O₂)</li>
                <li><strong>Triple Bond:</strong> 3 shared pairs (e.g., N≡N in N₂)</li>
                <li><strong>Polar Covalent:</strong> Unequal sharing, partial charges (e.g., H-Cl in HCl)</li>
                <li><strong>Non-polar Covalent:</strong> Equal sharing (e.g., H-H in H₂)</li>
                <li><strong>Coordinate Covalent:</strong> Both electrons from one atom (e.g., NH₄⁺)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Key Concepts</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Valence Electrons:</strong> Electrons in the outermost shell available for bonding</li>
                <li><strong>Octet Rule:</strong> Atoms tend to gain, lose, or share electrons to achieve 8 valence electrons</li>
                <li><strong>Lewis Dot Structures:</strong> Represent valence electrons as dots around atomic symbols</li>
                <li><strong>VSEPR Theory:</strong> Predicts molecular geometry based on electron pair repulsion</li>
                <li><strong>Bond Length:</strong> Distance between bonded nuclei (shorter = stronger bond)</li>
                <li><strong>Bond Angle:</strong> Angle between two bonds (e.g., 104.5° in water, 109.5° in methane)</li>
                <li><strong>Bond Energy:</strong> Energy required to break a bond (stronger bond = higher energy)</li>
                <li><strong>Resonance:</strong> Delocalized electrons in structures with multiple equivalent forms</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500"></div><span>Bond</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full border"></div><span>Electrons</span></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Different colors represent different atoms</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11ChemicalBonding;

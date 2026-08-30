"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11AtomicStructure: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [atomicNumber, setAtomicNumber] = useState(8);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showOrbitals, setShowOrbitals] = useState(true);
  const [showNucleus, setShowNucleus] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Get element info
  const elementInfo = useMemo(() => {
    const elements = [
      { symbol: 'H', name: 'Hydrogen', protons: 1, neutrons: 0, electrons: 1, color: 0xff0000 },
      { symbol: 'He', name: 'Helium', protons: 2, neutrons: 2, electrons: 2, color: 0xffff00 },
      { symbol: 'Li', name: 'Lithium', protons: 3, neutrons: 4, electrons: 3, color: 0xff00ff },
      { symbol: 'Be', name: 'Beryllium', protons: 4, neutrons: 5, electrons: 4, color: 0x00ff00 },
      { symbol: 'B', name: 'Boron', protons: 5, neutrons: 6, electrons: 5, color: 0x00ffff },
      { symbol: 'C', name: 'Carbon', protons: 6, neutrons: 6, electrons: 6, color: 0xff8800 },
      { symbol: 'N', name: 'Nitrogen', protons: 7, neutrons: 7, electrons: 7, color: 0xff0088 },
      { symbol: 'O', name: 'Oxygen', protons: 8, neutrons: 8, electrons: 8, color: 0x88ff00 },
      { symbol: 'F', name: 'Fluorine', protons: 9, neutrons: 10, electrons: 9, color: 0x00ff88 },
      { symbol: 'Ne', name: 'Neon', protons: 10, neutrons: 10, electrons: 10, color: 0x8800ff },
    ];
    return elements[Math.min(Math.max(atomicNumber, 1), 10) - 1] || elements[0];
  }, [atomicNumber]);

  // Electron shell configuration (simplified)
  const electronShells = useMemo(() => {
    const config: { shell: number; maxElectrons: number; electrons: number }[] = [];
    let remainingElectrons = elementInfo.electrons;
    let shell = 1;
    
    while (remainingElectrons > 0) {
      const maxInShell = shell === 1 ? 2 : 8; // Simplified for first 10 elements
      const electronsInShell = Math.min(remainingElectrons, maxInShell);
      config.push({ shell, maxElectrons: maxInShell, electrons: electronsInShell });
      remainingElectrons -= electronsInShell;
      shell++;
    }
    return config;
  }, [elementInfo.electrons]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 0, 25),
          autoRotate: false,
          background: 0x000000
        });
        
        unbind = bindResize(ts);

        // Nucleus
        const nucleusGroup = new THREE.Group();
        const nucleusGeo = new THREE.SphereGeometry(1, 32, 32);
        const nucleusMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5, metalness: 0.3 });
        const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
        nucleus.castShadow = true;
        nucleusGroup.add(nucleus);
        nucleusGroup.position.set(0, 0, 0);

        // Add protons and neutrons inside nucleus
        if (showNucleus) {
          const protonGeo = new THREE.SphereGeometry(0.15, 16, 16);
          const protonMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.8 });
          const neutronGeo = new THREE.SphereGeometry(0.15, 16, 16);
          const neutronMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.8 });

          // Add protons
          for (let i = 0; i < elementInfo.protons; i++) {
            const angle1 = (i / elementInfo.protons) * Math.PI * 2;
            const distance1 = 0.4;
            const proton = new THREE.Mesh(protonGeo, protonMat);
            proton.position.set(
              distance1 * Math.cos(angle1),
              0,
              distance1 * Math.sin(angle1)
            );
            nucleusGroup.add(proton);
          }

          // Add neutrons
          for (let i = 0; i < elementInfo.neutrons; i++) {
            const angle2 = (i / elementInfo.neutrons) * Math.PI * 2;
            const distance2 = 0.7;
            const neutron = new THREE.Mesh(neutronGeo, neutronMat);
            neutron.position.set(
              distance2 * Math.cos(angle2),
              0,
              distance2 * Math.sin(angle2)
            );
            nucleusGroup.add(neutron);
          }
        }

        ts.group.add(nucleusGroup);

        // Electron shells
        const electronGroups: THREE.Group[] = [];
        const orbitalLines: THREE.Line[] = [];

        if (showOrbitals) {
          electronShells.forEach((shellConfig) => {
            const radius = shellConfig.shell * 3;
            
            // Create orbital path
            const points: THREE.Vector3[] = [];
            const steps = 64;
            for (let i = 0; i <= steps; i++) {
              const theta = (i / steps) * Math.PI * 2;
              points.push(new THREE.Vector3(
                radius * Math.cos(theta),
                0,
                radius * Math.sin(theta)
              ));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
              color: 0x3b82f6, 
              transparent: true, 
              opacity: 0.3 
            });
            const line = new THREE.Line(geometry, material);
            ts.group.add(line);
            orbitalLines.push(line);
          });
        }

        // Electrons
        if (showElectrons) {
          electronShells.forEach((shellConfig) => {
            const radius = shellConfig.shell * 3;
            const electronGroup = new THREE.Group();
            const electronGeo = new THREE.SphereGeometry(0.2, 16, 16);
            const electronMat = standardMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.6 });

            for (let i = 0; i < shellConfig.electrons; i++) {
              const electron = new THREE.Mesh(electronGeo, electronMat);
              const angle = (i / shellConfig.electrons) * Math.PI * 2;
              electron.position.set(
                radius * Math.cos(angle),
                0,
                radius * Math.sin(angle)
              );
              electronGroup.add(electron);
            }
            ts.group.add(electronGroup);
            electronGroups.push(electronGroup);
          });
        }

        // Element symbol label
        const symbolGeo = new THREE.PlaneGeometry(2, 1);
        const symbolMat = new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
          transparent: true,
          side: THREE.DoubleSide
        });
        const symbolLabel = new THREE.Mesh(symbolGeo, symbolMat);
        symbolLabel.position.set(0, 4, 0);
        ts.group.add(symbolLabel);

        let startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed * animationSpeed;

          // Rotate electrons in their shells
          electronGroups.forEach((group, shellIndex) => {
            const shellConfig = electronShells[shellIndex];
            const radius = shellConfig.shell * 3;
            const speed = 0.5 + shellIndex * 0.3;
            
            group.children.forEach((electron, eIndex) => {
              const angle = time * speed + (eIndex / shellConfig.electrons) * Math.PI * 2;
              electron.position.x = radius * Math.cos(angle);
              electron.position.z = radius * Math.sin(angle);
            });
          });

          // Rotate nucleus
          nucleusGroup.rotation.y += 0.005 * animationSpeed;

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
  }, [atomicNumber, showElectrons, showOrbitals, showNucleus, animationSpeed, elementInfo, electronShells]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Atomic Structure</CardTitle>
        <CardDescription>
          Interactive 3D visualization of atomic structure with electron configuration for first 10 elements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-black rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Atomic Number Z</Label>
              <Slider min={1} max={10} step={1} value={[atomicNumber]} onValueChange={(v) => setAtomicNumber(v[0])} />
              <p className="text-sm text-gray-500">
                Element: <strong>{elementInfo.symbol}</strong> ({elementInfo.name}) - 
                P: {elementInfo.protons}, N: {elementInfo.neutrons}, E: {elementInfo.electrons}
              </p>
            </div>
            <div>
              <Label>Animation Speed</Label>
              <Slider min={0.1} max={2} step={0.1} value={[animationSpeed]} onValueChange={(v) => setAnimationSpeed(v[0])} />
              <p className="text-sm text-gray-500">Current: {animationSpeed}x</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowElectrons(!showElectrons)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showElectrons ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Electrons: {showElectrons ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowOrbitals(!showOrbitals)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showOrbitals ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Orbitals: {showOrbitals ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowNucleus(!showNucleus)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showNucleus ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Nucleus: {showNucleus ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Element: {elementInfo.name} ({elementInfo.symbol})</span></p>
              <p><strong>Atomic Number:</strong> {elementInfo.protons}</p>
              <p><strong>Mass Number:</strong> {elementInfo.protons + elementInfo.neutrons}</p>
              <p><strong>Electron Configuration:</strong>
                {electronShells.map(shell => (
                  <span key={shell.shell} className="ml-2">{'KLMNOPQRSTUVWXYZ'[shell.shell - 1] || shell.shell}: {shell.electrons}</span>
                ))}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Atomic Structure Theory (Class 11)</h3>
              <div className="text-sm mt-2 space-y-3">
                <p><strong>Atomic Number (Z):</strong> Number of protons in the nucleus. Determines the element's identity.</p>
                <p><strong>Mass Number (A):</strong> Sum of protons and neutrons (A = Z + N).</p>
                <p><strong>Isotopes:</strong> Atoms of the same element with different numbers of neutrons.</p>
                <p><strong>Isobars:</strong> Atoms of different elements with the same mass number.</p>
                <p><strong>Electrons:</strong> Negatively charged particles that orbit the nucleus.</p>
                <p><strong>Protons:</strong> Positively charged particles in the nucleus.</p>
                <p><strong>Neutrons:</strong> Neutral particles in the nucleus.</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Electron Shells</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>K Shell (n=1):</strong> Maximum 2 electrons, closest to nucleus, lowest energy</li>
                <li><strong>L Shell (n=2):</strong> Maximum 8 electrons, second orbit</li>
                <li><strong>M Shell (n=3):</strong> Maximum 18 electrons, third orbit</li>
                <li><strong>Valence Electrons:</strong> Electrons in the outermost shell, determine chemical properties</li>
                <li><strong>Valency:</strong> Combining capacity of an element</li>
                <li><strong>Bohr's Model:</strong> Electrons revolve in discrete orbits (stationary orbits)</li>
                <li><strong>Quantum Numbers:</strong> n (principal), l (azimuthal), m (magnetic), s (spin)</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div><span>Nucleus</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span>Protons</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span>Neutrons</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full border"></div><span>Electrons</span></div>
                <div className="flex items-center gap-1"><div className="w-6 h-0.5 bg-blue-500"></div><span>Orbitals</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11AtomicStructure;

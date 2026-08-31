"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene, clearGroup, standardMaterial } from "@/components/lab/three-scene";

type DopingType = "intrinsic" | "n-type" | "p-type";

export const MotionGraphicsSemiconductors: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dopingType, setDopingType] = useState<DopingType>("intrinsic");
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [voltage, setVoltage] = useState(0); // Volts
  const [showElectrons, setShowElectrons] = useState(true);
  const [showHoles, setShowHoles] = useState(true);
  const [showLattice, setShowLattice] = useState(true);
  const [showDopants, setShowDopants] = useState(true);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let animationId: number;
    let time = 0;
    let labelRenderer: any = null;
    let labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 20),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x0f0f23
        });
        
        unbind = bindResize(ts);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        ts.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        ts.scene.add(directionalLight);

        // Create CSS2D Label Renderer
        try {
          const { CSS2DRenderer } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);
        } catch {
          console.log("CSS2DRenderer not available");
        }

        // Animation loop
        function animate() {
          if (cancelled) return;
          
          animationId = requestAnimationFrame(animate);
          
          time += 0.016;
          
          // Clear and rebuild
          clearGroup(ts.group);
          
          // Clear previous labels
          labels.forEach(label => {
            if (label?.element?.parentNode) {
              label.element.parentNode.removeChild(label.element);
            }
          });
          labels = [];
          
          // Create semiconductor lattice
          if (showLattice) {
            createLattice(ts.group);
          }
          
          // Create dopants with labels
          if (showDopants && dopingType !== "intrinsic") {
            createDopants(ts.group, dopingType);
          }
          
          // Create charge carriers with labels
          if (showElectrons || showHoles) {
            createChargeCarriers(ts.group, dopingType, voltage, temperature, time);
          }
          
          // Create p-n junction if needed
          if (voltage !== 0) {
            createPNJunction(ts.group, voltage);
          }
          
          // Add main title label
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const titleLabel = new CSS2DObject(document.createElement("div"));
            titleLabel.element.innerHTML = `
              <div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:8px;color:black;font-weight:700;font-size:14px;border:2px solid #3b82f6">
                <div>🔬 Semiconductor Physics</div>
                <div style="font-size:11px;color:#666">${dopingType === 'intrinsic' ? 'Intrinsic' : dopingType === 'n-type' ? 'n-Type (Donor)' : 'p-Type (Acceptor)'} Silicon</div>
              </div>
            `;
            titleLabel.element.style.pointerEvents = "none";
            titleLabel.position.set(0, 12, 0);
            ts.group.add(titleLabel);
            labels.push(titleLabel);
          }
          
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        
        animate();
      } catch (error) {
        console.error("Error initializing Semiconductor animation:", error);
      }
    }

    function createLattice(group: THREE.Group) {
      // Create silicon crystal lattice
      const latticeSize = 10;
      const spacing = 2.5;
      
      for (let x = -latticeSize; x <= latticeSize; x += spacing) {
        for (let y = -latticeSize; y <= latticeSize; y += spacing) {
          for (let z = -latticeSize; z <= latticeSize; z += spacing) {
            // Create silicon atom (diamond structure)
            const atomGeo = new THREE.SphereGeometry(0.3, 8, 8);
            const atomMat = standardMaterial(0x808080, { 
              emissive: 0x404040, 
              emissiveIntensity: 0.3
            });
            const atom = new THREE.Mesh(atomGeo, atomMat);
            atom.position.set(x + (Math.random() - 0.5) * 0.2, y + (Math.random() - 0.5) * 0.2, z + (Math.random() - 0.5) * 0.2);
            group.add(atom);
            
            // Add atom label
            if (labelRenderer && Math.random() < 0.1) {
              const CSS2DObject = (THREE as any).CSS2DObject;
              const atomLabel = new CSS2DObject(document.createElement("div"));
              atomLabel.element.innerHTML = `<div style="background:rgba(128,128,128,0.7);padding:2px 4px;border-radius:2px;color:white;font-size:8px">Si</div>`;
              atomLabel.element.style.pointerEvents = "none";
              atomLabel.position.set(0, 0.5, 0);
              atom.add(atomLabel);
              labels.push(atomLabel);
            }
          }
        }
      }
      
      // Add lattice label
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const latticeLabel = new CSS2DObject(document.createElement("div"));
        latticeLabel.element.innerHTML = `
          <div style="background:rgba(128,128,128,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">
            <div>🔶 Silicon Lattice</div>
            <div style="font-size:9px;opacity:0.8">Diamond cubic structure</div>
          </div>
        `;
        latticeLabel.element.style.pointerEvents = "none";
        latticeLabel.position.set(0, -10, -12);
        group.add(latticeLabel);
        labels.push(latticeLabel);
      }
    }

    function createDopants(group: THREE.Group, type: DopingType) {
      const numDopants = 20;
      
      for (let i = 0; i < numDopants; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        
        if (type === "n-type") {
          // Phosphorus/Arsenic donor atom (red - extra electron)
          const donorGeo = new THREE.SphereGeometry(0.4, 8, 8);
          const donorMat = standardMaterial(0xff4444, { 
            emissive: 0xff0000, 
            emissiveIntensity: 0.5
          });
          const donor = new THREE.Mesh(donorGeo, donorMat);
          donor.position.set(x, y, z);
          group.add(donor);
          
          // Extra electron orbiting
          const electronGeo = new THREE.SphereGeometry(0.15, 6, 6);
          const electronMat = standardMaterial(0x00aaff);
          const electron = new THREE.Mesh(electronGeo, electronMat);
          electron.position.set(
            x + 0.8 * Math.cos(time * 2 + i),
            y + 0.8 * Math.sin(time * 2 + i),
            z
          );
          group.add(electron);
          
          // Label for donor
          if (labelRenderer && i < 5) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const donorLabel = new CSS2DObject(document.createElement("div"));
            donorLabel.element.innerHTML = `<div style="background:rgba(255,68,68,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">P⁺ (Donor)</div>`;
            donorLabel.element.style.pointerEvents = "none";
            donorLabel.position.set(0, 0.7, 0);
            donor.add(donorLabel);
            labels.push(donorLabel);
          }
        } else {
          // Boron/Aluminum acceptor atom (blue - hole)
          const acceptorGeo = new THREE.SphereGeometry(0.4, 8, 8);
          const acceptorMat = standardMaterial(0x4444ff, { 
            emissive: 0x0000ff, 
            emissiveIntensity: 0.5
          });
          const acceptor = new THREE.Mesh(acceptorGeo, acceptorMat);
          acceptor.position.set(x, y, z);
          group.add(acceptor);
          
          // Label for acceptor
          if (labelRenderer && i < 5) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const acceptorLabel = new CSS2DObject(document.createElement("div"));
            acceptorLabel.element.innerHTML = `<div style="background:rgba(68,68,255,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">B⁻ (Acceptor)</div>`;
            acceptorLabel.element.style.pointerEvents = "none";
            acceptorLabel.position.set(0, 0.7, 0);
            acceptor.add(acceptorLabel);
            labels.push(acceptorLabel);
          }
        }
      }
      
      // Add dopant type explanation
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const infoLabel = new CSS2DObject(document.createElement("div"));
        const info = type === "n-type" 
          ? "n-Type: Donor atoms (P, As) add extra electrons → More free electrons"
          : "p-Type: Acceptor atoms (B, Al) create holes → More free holes";
        infoLabel.element.innerHTML = `
          <div style="background:rgba(139,92,246,0.85);padding:8px 14px;border-radius:6px;color:white;font-size:10px;font-weight:600">
            <div>ℹ️ ${type === 'n-type' ? 'n-Type' : 'p-Type'} Doping</div>
            <div style="font-size:9px;opacity:0.9">${info}</div>
          </div>
        `;
        infoLabel.element.style.pointerEvents = "none";
        infoLabel.position.set(type === "n-type" ? -12 : 12, 0, -15);
        group.add(infoLabel);
        labels.push(infoLabel);
      }
    }

    function createChargeCarriers(
      group: THREE.Group, 
      type: DopingType, 
      voltage: number, 
      temperature: number,
      animTime: number
    ) {
      const numCarriers = 50;
      const thermalEnergy = temperature / 300; // Normalized
      const driftVelocity = voltage * 0.1;
      
      // Explanation label for carriers
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        
        // Electron explanation
        if (showElectrons) {
          const eLabel = new CSS2DObject(document.createElement("div"));
          eLabel.element.innerHTML = `
            <div style="background:rgba(0,170,255,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:10px;font-weight:600">
              <div>⚡ e⁻ : Free Electron</div>
              <div style="font-size:9px;opacity:0.9">Negative charge, moves towards +</div>
            </div>
          `;
          eLabel.element.style.pointerEvents = "none";
          eLabel.position.set(-15, 8, 0);
          group.add(eLabel);
          labels.push(eLabel);
        }
        
        // Hole explanation
        if (showHoles) {
          const hLabel = new CSS2DObject(document.createElement("div"));
          hLabel.element.innerHTML = `
            <div style="background:rgba(255,170,0,0.85);padding:6px 12px;border-radius:6px;color:black;font-size:10px;font-weight:600">
              <div>⚪ h⁺ : Hole</div>
              <div style="font-size:9px;opacity:0.9">Positive charge, moves towards -</div>
            </div>
          `;
          hLabel.element.style.pointerEvents = "none";
          hLabel.position.set(15, 8, 0);
          group.add(hLabel);
          labels.push(hLabel);
        }
      }
      
      for (let i = 0; i < numCarriers; i++) {
        if (showElectrons) {
          // Free electrons (more in n-type)
          const electronCount = type === "n-type" ? 40 : type === "p-type" ? 5 : 20;
          
          if (i < electronCount) {
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 25;
            
            const electronGeo = new THREE.SphereGeometry(0.2, 6, 6);
            const electronMat = standardMaterial(0x00aaff, { 
              emissive: 0x0088ff,
              emissiveIntensity: 0.8
            });
            const electron = new THREE.Mesh(electronGeo, electronMat);
            
            // Random thermal motion + drift due to voltage
            electron.position.set(
              x + Math.sin(animTime * 10 + i * 13) * thermalEnergy * 0.1 - driftVelocity * animTime,
              y + Math.cos(animTime * 7 + i * 17) * thermalEnergy * 0.1,
              z + Math.sin(animTime * 13 + i * 19) * thermalEnergy * 0.1
            );
            group.add(electron);
            
            // Add e- label
            if (labelRenderer && i < 3) {
              const CSS2DObject = (THREE as any).CSS2DObject;
              const eLabel = new CSS2DObject(document.createElement("div"));
              eLabel.element.innerHTML = `<div style="background:rgba(0,170,255,0.7);padding:2px 4px;border-radius:2px;color:white;font-size:8px">e⁻</div>`;
              eLabel.element.style.pointerEvents = "none";
              eLabel.position.set(0, 0.3, 0);
              electron.add(eLabel);
              labels.push(eLabel);
            }
          }
        }
        
        if (showHoles) {
          // Holes (more in p-type)
          const holeCount = type === "p-type" ? 40 : type === "n-type" ? 5 : 20;
          
          if (i < holeCount) {
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 25;
            
            const holeGeo = new THREE.SphereGeometry(0.2, 6, 6);
            const holeMat = standardMaterial(0xffaa00, { 
              emissive: 0xff8800,
              emissiveIntensity: 0.8
            });
            const hole = new THREE.Mesh(holeGeo, holeMat);
            
            // Holes move in opposite direction to electrons
            hole.position.set(
              x + Math.cos(animTime * 8 + i * 11) * thermalEnergy * 0.1 + driftVelocity * animTime,
              y + Math.sin(animTime * 12 + i * 23) * thermalEnergy * 0.1,
              z + Math.cos(animTime * 15 + i * 29) * thermalEnergy * 0.1
            );
            group.add(hole);
            
            // Add h+ label
            if (labelRenderer && i < 3) {
              const CSS2DObject = (THREE as any).CSS2DObject;
              const hLabel = new CSS2DObject(document.createElement("div"));
              hLabel.element.innerHTML = `<div style="background:rgba(255,170,0,0.7);padding:2px 4px;border-radius:2px;color:black;font-size:8px">h⁺</div>`;
              hLabel.element.style.pointerEvents = "none";
              hLabel.position.set(0, 0.3, 0);
              hole.add(hLabel);
              labels.push(hLabel);
            }
          }
        }
      }
    }

    function createPNJunction(group: THREE.Group, voltage: number) {
      // Create p-n junction depletion region
      const depletionWidth = Math.abs(voltage) * 0.5 + 1;
      
      // p-side (left)
      const pSideGeo = new THREE.BoxGeometry(depletionWidth + 5, 20, 20);
      const pSideMat = new THREE.MeshPhongMaterial({ 
        color: 0x4444ff, 
        transparent: true, 
        opacity: 0.3
      });
      const pSide = new THREE.Mesh(pSideGeo, pSideMat);
      pSide.position.set(-(depletionWidth + 5) / 2 - 0.1, 0, 0);
      group.add(pSide);
      
      // n-side (right)
      const nSideGeo = new THREE.BoxGeometry(depletionWidth + 5, 20, 20);
      const nSideMat = new THREE.MeshPhongMaterial({ 
        color: 0xff4444, 
        transparent: true, 
        opacity: 0.3
      });
      const nSide = new THREE.Mesh(nSideGeo, nSideMat);
      nSide.position.set((depletionWidth + 5) / 2 + 0.1, 0, 0);
      group.add(nSide);
      
      // Depletion region (center)
      const depletionGeo = new THREE.BoxGeometry(depletionWidth, 20, 20);
      const depletionMat = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.1
      });
      const depletion = new THREE.Mesh(depletionGeo, depletionMat);
      group.add(depletion);
      
      // Labels for p-n junction
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        
        const pLabel = new CSS2DObject(document.createElement("div"));
        pLabel.element.innerHTML = `<div style="background:rgba(68,68,255,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">p-Type (Holes)</div>`;
        pLabel.element.style.pointerEvents = "none";
        pLabel.position.set(-(depletionWidth + 5) / 2 - 6, 10, 0);
        group.add(pLabel);
        labels.push(pLabel);
        
        const nLabel = new CSS2DObject(document.createElement("div"));
        nLabel.element.innerHTML = `<div style="background:rgba(255,68,68,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">n-Type (Electrons)</div>`;
        nLabel.element.style.pointerEvents = "none";
        nLabel.position.set((depletionWidth + 5) / 2 + 6, 10, 0);
        group.add(nLabel);
        labels.push(nLabel);
        
        const depletionLabel = new CSS2DObject(document.createElement("div"));
        depletionLabel.element.innerHTML = `<div style="background:rgba(255,255,255,0.85);padding:6px 12px;border-radius:6px;color:black;font-size:11px;font-weight:600">Depletion Region</div>`;
        depletionLabel.element.style.pointerEvents = "none";
        depletionLabel.position.set(0, 10, 0);
        depletion.add(depletionLabel);
        labels.push(depletionLabel);
      }
      
      // Battery connections
      if (voltage > 0) {
        // Forward bias
        const batteryGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 16);
        const batteryMat = standardMaterial(0x333333);
        
        const batteryPos = new THREE.Mesh(batteryGeo, batteryMat);
        batteryPos.position.set(-12, 0, 0);
        batteryPos.rotation.x = Math.PI / 2;
        group.add(batteryPos);
        
        const batteryNeg = new THREE.Mesh(batteryGeo, batteryMat);
        batteryNeg.position.set(12, 0, 0);
        batteryNeg.rotation.x = Math.PI / 2;
        group.add(batteryNeg);
        
        // Battery labels
        if (labelRenderer) {
          const CSS2DObject = (THREE as any).CSS2DObject;
          
          const posLabel = new CSS2DObject(document.createElement("div"));
          posLabel.element.innerHTML = `<div style="background:rgba(255,0,0,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">+</div>`;
          posLabel.element.style.pointerEvents = "none";
          posLabel.position.set(-12, 2, 0);
          group.add(posLabel);
          labels.push(posLabel);
          
          const negLabel = new CSS2DObject(document.createElement("div"));
          negLabel.element.innerHTML = `<div style="background:rgba(0,0,255,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">-</div>`;
          negLabel.element.style.pointerEvents = "none";
          negLabel.position.set(12, 2, 0);
          group.add(negLabel);
          labels.push(negLabel);
        }
        
        // Wires
        const wireGeo = new THREE.CylinderGeometry(0.1, 0.1, 10, 8);
        const wireMat = standardMaterial(0xcccccc);
        
        const wire1 = new THREE.Mesh(wireGeo, wireMat);
        wire1.position.set(-9, 0, 0);
        wire1.rotation.x = Math.PI / 2;
        group.add(wire1);
        
        const wire2 = new THREE.Mesh(wireGeo, wireMat);
        wire2.position.set(9, 0, 0);
        wire2.rotation.x = Math.PI / 2;
        group.add(wire2);
        
        // Bias label
        if (labelRenderer) {
          const CSS2DObject = (THREE as any).CSS2DObject;
          const biasLabel = new CSS2DObject(document.createElement("div"));
          biasLabel.element.innerHTML = `<div style="background:rgba(34,197,94,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">Forward Bias</div>`;
          biasLabel.element.style.pointerEvents = "none";
          biasLabel.position.set(0, -10, -10);
          group.add(biasLabel);
          labels.push(biasLabel);
        }
      } else if (voltage < 0) {
        // Reverse bias
        const batteryGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 16);
        const batteryMat = standardMaterial(0x333333);
        
        const batteryNeg = new THREE.Mesh(batteryGeo, batteryMat);
        batteryNeg.position.set(-12, 0, 0);
        batteryNeg.rotation.x = Math.PI / 2;
        group.add(batteryNeg);
        
        const batteryPos = new THREE.Mesh(batteryGeo, batteryMat);
        batteryPos.position.set(12, 0, 0);
        batteryPos.rotation.x = Math.PI / 2;
        group.add(batteryPos);
        
        // Battery labels
        if (labelRenderer) {
          const CSS2DObject = (THREE as any).CSS2DObject;
          
          const negLabel = new CSS2DObject(document.createElement("div"));
          negLabel.element.innerHTML = `<div style="background:rgba(0,0,255,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">-</div>`;
          negLabel.element.style.pointerEvents = "none";
          negLabel.position.set(-12, 2, 0);
          group.add(negLabel);
          labels.push(negLabel);
          
          const posLabel = new CSS2DObject(document.createElement("div"));
          posLabel.element.innerHTML = `<div style="background:rgba(255,0,0,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:10px;font-weight:600">+</div>`;
          posLabel.element.style.pointerEvents = "none";
          posLabel.position.set(12, 2, 0);
          group.add(posLabel);
          labels.push(posLabel);
        }
        
        // Bias label
        if (labelRenderer) {
          const CSS2DObject = (THREE as any).CSS2DObject;
          const biasLabel = new CSS2DObject(document.createElement("div"));
          biasLabel.element.innerHTML = `<div style="background:rgba(239,68,68,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">Reverse Bias</div>`;
          biasLabel.element.style.pointerEvents = "none";
          biasLabel.position.set(0, -10, -10);
          group.add(biasLabel);
          labels.push(biasLabel);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      if (unbind) unbind();
      disposeThreeScene(ts);
      // Clean up label renderer
      if (labelRenderer && labelRenderer.domElement?.parentNode) {
        labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      }
      labels = [];
    };
  }, [dopingType, temperature, voltage, showElectrons, showHoles, showLattice, showDopants]);

  const carrierConcentration = useMemo(() => {
    switch (dopingType) {
      case "n-type": return { electrons: "High", holes: "Low" };
      case "p-type": return { electrons: "Low", holes: "High" };
      default: return { electrons: "Moderate", holes: "Moderate" };
    }
  }, [dopingType]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/>
            <circle cx="15" cy="12" r="1" fill="currentColor"/>
            <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Semiconductor Physics
        </CardTitle>
        <CardDescription>
          Interactive 3D visualization of semiconductor band structure, doping, and p-n junction operation with labelled components.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 3D Visualization */}
          <div 
            ref={mountRef}
            className="w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg border border-border bg-black/10 relative"
          />
          
          {/* Labels & Meanings Guide */}
          <Card className="bg-gradient-to-r from-yellow-500/10 to-blue-500/10 border-yellow-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-yellow-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Silicon (Si)</div>
                  <div className="text-xs text-muted-foreground">Lattice atoms - Grey</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-red-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Donor (P⁺)</div>
                  <div className="text-xs text-muted-foreground">n-Type doping - Red</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-blue-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Acceptor (B⁻)</div>
                  <div className="text-xs text-muted-foreground">p-Type doping - Blue</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-blue-500 text-xl mb-2">⚡</div>
                  <div className="text-sm font-medium">Electron (e⁻)</div>
                  <div className="text-xs text-muted-foreground">Negative charge - Blue</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                  <div className="text-yellow-600 text-xl mb-2">⚪</div>
                  <div className="text-sm font-medium">Hole (h⁺)</div>
                  <div className="text-xs text-muted-foreground">Positive charge - Orange</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Doping Controls */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={dopingType === "intrinsic" ? "default" : "outline"}
                onClick={() => setDopingType("intrinsic")}
                className="flex-1"
              >
                Intrinsic
              </Button>
              <Button
                variant={dopingType === "n-type" ? "default" : "outline"}
                onClick={() => setDopingType("n-type")}
                className="flex-1"
              >
                n-Type
              </Button>
              <Button
                variant={dopingType === "p-type" ? "default" : "outline"}
                onClick={() => setDopingType("p-type")}
                className="flex-1"
              >
                p-Type
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium">
                  Temperature: {temperature}K
                </Label>
                <Slider
                  id="temperature"
                  min={100}
                  max={600}
                  step={10}
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                />
                <div className="text-xs text-muted-foreground">Higher temp = more carriers</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voltage" className="text-sm font-medium">
                  Voltage: {voltage}V
                </Label>
                <Slider
                  id="voltage"
                  min={-5}
                  max={5}
                  step={0.1}
                  value={[voltage]}
                  onValueChange={(v) => setVoltage(v[0])}
                />
                <div className="text-xs text-muted-foreground">{voltage > 0 ? 'Forward bias' : voltage < 0 ? 'Reverse bias' : 'No bias'}</div>
              </div>
            </div>
            
            {/* Carrier Concentration Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Charge Carrier Concentration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{carrierConcentration.electrons}</div>
                  <div className="text-sm text-muted-foreground">Electrons (e⁻)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{carrierConcentration.holes}</div>
                  <div className="text-sm text-muted-foreground">Holes (h⁺)</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showElectrons}
                onChange={(e) => setShowElectrons(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Electrons</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHoles}
                onChange={(e) => setShowHoles(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Holes</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLattice}
                onChange={(e) => setShowLattice(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Lattice</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDopants}
                onChange={(e) => setShowDopants(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Dopants</span>
            </label>
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Semiconductor Theory with Meanings</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 What is a Semiconductor?</h4>
                  <p>
                    A semiconductor is a material with electrical conductivity <strong>between that of a conductor and an insulator</strong>. At absolute zero, pure (intrinsic) semiconductors behave like insulators. As temperature increases, electrons gain energy and can jump to the conduction band, making the material conductive. This temperature-dependent behavior is the key characteristic of semiconductors.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">🧪 n-Type Semiconductor:</h4>
                    <p className="text-xs">
                      <strong>Meaning:</strong> "n" stands for negative, referring to the negative charge of electrons.<br/>
                      <strong>Doping:</strong> Adding pentavalent atoms (P, As, Sb) which have 5 valence electrons.<br/>
                      <strong>Effect:</strong> Extra electron becomes free, creating <strong>majority carriers (electrons)</strong> and fixed positive ions.<br/>
                      <strong>Conductivity:</strong> Increases dramatically because more free electrons are available for conduction.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-orange-400 mb-2">🧪 p-Type Semiconductor:</h4>
                    <p className="text-xs">
                      <strong>Meaning:</strong> "p" stands for positive, referring to the positive charge of holes.<br/>
                      <strong>Doping:</strong> Adding trivalent atoms (B, Al, Ga) which have 3 valence electrons.<br/>
                      <strong>Effect:</strong> Creates electron deficiencies (holes) which act like positive charges, creating <strong>majority carriers (holes)</strong> and fixed negative ions.<br/>
                      <strong>Conductivity:</strong> Increases dramatically because more free holes are available for conduction.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-green-400 mb-2">⚡ p-n Junction:</h4>
                  <p className="text-xs">
                    <strong>Meaning:</strong> When p-type and n-type semiconductors are joined, they form a p-n junction.<br/>
                    <strong>Depletion Region:</strong> At the junction, free electrons from n-side diffuse to p-side and recombine with holes, creating a region <strong>depleted of free charge carriers</strong>.<br/>
                    <strong>Forward Bias:</strong> Positive voltage on p-side, negative on n-side. Reduces depletion width, <strong>allows current to flow</strong>.<br/>
                    <strong>Reverse Bias:</strong> Negative voltage on p-side, positive on n-side. Increases depletion width, <strong>blocks current flow</strong>.
                  </p>
                </div>
                
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-400 mb-2">💡 Applications:</h4>
                  <p className="text-xs">
                    Diodes, Transistors, Solar cells, LEDs, Integrated circuits - all rely on doped semiconductors and p-n junctions. The ability to control conductivity through doping is what makes modern electronics possible.
                  </p>
                </div>
                
                <div className="bg-cyan-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-cyan-400 mb-2">📊 Key Formula:</h4>
                  <p className="font-mono text-cyan-300 text-center">nᵢ² = n₀ × p₀</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Law of mass action: In intrinsic semiconductor, the product of electron and hole concentrations is constant at a given temperature.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

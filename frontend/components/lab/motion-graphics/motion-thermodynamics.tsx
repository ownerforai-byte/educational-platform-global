"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, clearGroup, standardMaterial } from "@/components/lab/three-scene";

type ProcessType = "isothermal" | "adiabatic" | "isobaric" | "isochoric";

export const MotionGraphicsThermodynamics: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [processType, setProcessType] = useState<ProcessType>("isothermal");
  const [pistonPosition, setPistonPosition] = useState(5);
  const [temperature, setTemperature] = useState(300);
  const [volume, setVolume] = useState(5);
  const [pressure, setPressure] = useState(1);
  const [showPiston, setShowPiston] = useState(true);
  const [showGas, setShowGas] = useState(true);
  const [showPVDiagram, setShowPVDiagram] = useState(true);

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
        } catch (e) {
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
          
          // Add main title label
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const titleLabel = new CSS2DObject(document.createElement("div"));
            titleLabel.element.innerHTML = `
              <div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:8px;color:black;font-weight:700;font-size:14px;border:2px solid #ef4444">
                <div>🔥 Thermodynamics</div>
                <div style="font-size:11px;color:#666">Process: ${processType.replace('-',' ').charAt(0).toUpperCase() + processType.replace('-',' ').slice(1)}</div>
              </div>
            `;
            titleLabel.element.style.pointerEvents = "none";
            titleLabel.position.set(0, 15, 0);
            ts.group.add(titleLabel);
            labels.push(titleLabel);
          }
          
          // Create cylinder (piston container)
          createCylinder(ts.group);
          
          // Create piston with labels
          if (showPiston) {
            createPiston(ts.group, time);
          }
          
          // Create gas particles with labels
          if (showGas) {
            createGasParticles(ts.group, time, temperature);
          }
          
          // Create PV diagram in corner with labels
          if (showPVDiagram) {
            createPVDiagram(ts.group);
          }
          
          // Add process info label
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const processInfo = {
              isothermal: "ΔT = 0 (Temperature constant)",
              adiabatic: "Q = 0 (No heat transfer)",
              isobaric: "ΔP = 0 (Pressure constant)",
              isochoric: "ΔV = 0 (Volume constant)"
            };
            const infoLabel = new CSS2DObject(document.createElement("div"));
            infoLabel.element.innerHTML = `
              <div style="background:rgba(139,92,246,0.85);padding:8px 14px;border-radius:6px;color:white;font-size:10px;font-weight:600">
                <div>ℹ️ ${processType.charAt(0).toUpperCase() + processType.slice(1)} Process</div>
                <div style="font-size:9px;opacity:0.9">${processInfo[processType]}</div>
              </div>
            `;
            infoLabel.element.style.pointerEvents = "none";
            infoLabel.position.set(0, -10, -12);
            ts.group.add(infoLabel);
            labels.push(infoLabel);
          }
          
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        
        animate();
      } catch (error) {
        console.error("Error initializing Thermodynamics animation:", error);
      }
    }

    function createCylinder(group: THREE.Group) {
      // Cylinder base
      const cylinderGeo = new THREE.CylinderGeometry(4, 4, 12, 32);
      const cylinderMat = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        transparent: true,
        opacity: 0.5
      });
      const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
      cylinder.position.y = -6;
      group.add(cylinder);
      
      // Top rim
      const rimGeo = new THREE.TorusGeometry(4, 0.1, 16, 32);
      const rimMat = standardMaterial(0x666666);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.y = 0;
      rim.rotation.x = Math.PI / 2;
      group.add(rim);
      
      // Label for cylinder
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const cylLabel = new CSS2DObject(document.createElement("div"));
        cylLabel.element.innerHTML = `<div style="background:rgba(128,128,128,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">Cylinder Container</div>`;
        cylLabel.element.style.pointerEvents = "none";
        cylLabel.position.set(0, -6, -5);
        group.add(cylLabel);
        labels.push(cylLabel);
      }
    }

    function createPiston(group: THREE.Group, time: number) {
      // Piston (moves up and down)
      const pistonHeight = 0.5;
      const pistonY = pistonPosition - 6;
      
      // Piston head
      const headGeo = new THREE.CylinderGeometry(3.8, 3.8, pistonHeight, 32);
      const headMat = standardMaterial(0x888888);
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = pistonY;
      group.add(head);
      
      // Piston rod
      const rodGeo = new THREE.CylinderGeometry(0.3, 0.3, 3, 16);
      const rodMat = standardMaterial(0x666666);
      const rod = new THREE.Mesh(rodGeo, rodMat);
      rod.position.y = pistonY + pistonHeight / 2 + 1.5;
      group.add(rod);
      
      // Piston handle
      const handleGeo = new THREE.BoxGeometry(1, 0.3, 0.3);
      const handleMat = standardMaterial(0x444444);
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.y = pistonY + pistonHeight + 3;
      group.add(handle);
      
      // Add weight indicator
      const weightGeo = new THREE.CylinderGeometry(1, 1, 0.5, 16);
      const weightMat = standardMaterial(0xff4444);
      const weight = new THREE.Mesh(weightGeo, weightMat);
      weight.position.y = pistonY + pistonHeight + 4;
      group.add(weight);
      
      // Animate piston slightly
      head.position.y = pistonY + Math.sin(time * 2) * 0.1;
      
      // Label for piston
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const pistonLabel = new CSS2DObject(document.createElement("div"));
        pistonLabel.element.innerHTML = `<div style="background:rgba(136,136,136,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">Piston (Movable)</div>`;
        pistonLabel.element.style.pointerEvents = "none";
        pistonLabel.position.set(0, pistonY + pistonHeight + 0.5, 0);
        head.add(pistonLabel);
        labels.push(pistonLabel);
        
        // Weight label
        const weightLabel = new CSS2DObject(document.createElement("div"));
        weightLabel.element.innerHTML = `<div style="background:rgba(255,68,68,0.85);padding:4px 8px;border-radius:4px;color:white;font-size:9px">Weight (Pressure)</div>`;
        weightLabel.element.style.pointerEvents = "none";
        weightLabel.position.set(0, 0.5, 0);
        weight.add(weightLabel);
        labels.push(weightLabel);
      }
    }

    function createGasParticles(group: THREE.Group, time: number, temp: number) {
      const numParticles = 200;
      const speedFactor = temp / 300; // Higher temperature = faster movement
      
      // Particle explanation label
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const particleLabel = new CSS2DObject(document.createElement("div"));
        particleLabel.element.innerHTML = `
          <div style="background:rgba(0,170,255,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:10px;font-weight:600">
            <div>🔵 Gas Particles</div>
            <div style="font-size:9px;opacity:0.9">Ideal gas molecules</div>
          </div>
        `;
        particleLabel.element.style.pointerEvents = "none";
        particleLabel.position.set(-12, 8, 0);
        group.add(particleLabel);
        labels.push(particleLabel);
      }
      
      for (let i = 0; i < numParticles; i++) {
        // Random position within cylinder
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 3.5;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = -6 + Math.random() * pistonPosition;
        
        // Create particle
        const particleGeo = new THREE.SphereGeometry(0.1 + Math.random() * 0.1, 4, 4);
        const particleMat = standardMaterial(0x00aaff, {
          emissive: 0x0088ff,
          emissiveIntensity: 0.5 + Math.random() * 0.5
        });
        const particle = new THREE.Mesh(particleGeo, particleMat);
        
        // Random motion
        const offset = i * 100;
        particle.position.set(
          x + Math.sin(time * 10 + offset) * speedFactor * 0.2,
          y + Math.cos(time * 15 + offset * 2) * speedFactor * 0.3,
          z + Math.sin(time * 20 + offset * 3) * speedFactor * 0.2
        );
        
        group.add(particle);
        
        // Add particle label (only for first few)
        if (i < 3) {
          const CSS2DObject = (THREE as any).CSS2DObject;
          const pLabel = new CSS2DObject(document.createElement("div"));
          pLabel.element.innerHTML = `<div style="background:rgba(0,170,255,0.7);padding:2px 4px;border-radius:2px;color:white;font-size:8px">Particle</div>`;
          pLabel.element.style.pointerEvents = "none";
          pLabel.position.set(0, 0.2, 0);
          particle.add(pLabel);
          labels.push(pLabel);
        }
      }
      
      // Temperature explanation label
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const tempLabel = new CSS2DObject(document.createElement("div"));
        tempLabel.element.innerHTML = `
          <div style="background:rgba(239,68,68,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:10px;font-weight:600">
            <div>🌡️ Temperature: ${temp}K</div>
            <div style="font-size:9px;opacity:0.9">Higher T = faster particles</div>
          </div>
        `;
        tempLabel.element.style.pointerEvents = "none";
        tempLabel.position.set(12, 8, 0);
        group.add(tempLabel);
        labels.push(tempLabel);
      }
    }

    function createPVDiagram(group: THREE.Group) {
      // Create a mini PV diagram in the corner
      const diagramX = 15;
      const diagramY = 10;
      const diagramSize = 8;
      
      // Background
      const bgGeo = new THREE.PlaneGeometry(diagramSize, diagramSize);
      const bgMat = new THREE.MeshBasicMaterial({ 
        color: 0x111111,
        transparent: true,
        opacity: 0.7
      });
      const bg = new THREE.Mesh(bgGeo, bgMat);
      bg.position.set(diagramX, diagramY, -1);
      group.add(bg);
      
      // P axis
      const pAxisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(diagramX - diagramSize/2, diagramY - diagramSize/2, -1),
        new THREE.Vector3(diagramX + diagramSize/2, diagramY - diagramSize/2, -1),
        new THREE.Vector3(diagramX + diagramSize/2, diagramY + diagramSize/2, -1)
      ]);
      const pAxis = new THREE.Line(pAxisGeo, new THREE.LineBasicMaterial({ color: 0xff0000 }));
      group.add(pAxis);
      
      // V axis
      const vAxisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(diagramX - diagramSize/2, diagramY - diagramSize/2, -1),
        new THREE.Vector3(diagramX - diagramSize/2, diagramY + diagramSize/2, -1),
        new THREE.Vector3(diagramX + diagramSize/2, diagramY + diagramSize/2, -1)
      ]);
      const vAxis = new THREE.Line(vAxisGeo, new THREE.LineBasicMaterial({ color: 0x00ff00 }));
      group.add(vAxis);
      
      // Curve
      const curvePoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 10; i++) {
        const x = diagramX - diagramSize/2 + (i / 10) * diagramSize;
        const y = diagramY - diagramSize/2 + (i / 10) * diagramSize;
        curvePoints.push(new THREE.Vector3(x, y, -1));
      }
      const curve = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curvePoints),
        new THREE.LineBasicMaterial({ color: 0x00aaff })
      );
      group.add(curve);
      
      // Add PV diagram label
      if (labelRenderer) {
        const CSS2DObject = (THREE as any).CSS2DObject;
        const pvLabel = new CSS2DObject(document.createElement("div"));
        pvLabel.element.innerHTML = `<div style="background:rgba(128,128,128,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">P-V Diagram</div>`;
        pvLabel.element.style.pointerEvents = "none";
        pvLabel.position.set(diagramX, diagramY + diagramSize/2 + 1, -1);
        group.add(pvLabel);
        labels.push(pvLabel);
        
        // P axis label
        const pLabel = new CSS2DObject(document.createElement("div"));
        pLabel.element.innerHTML = `<div style="background:rgba(255,0,0,0.8);padding:3px 6px;border-radius:3px;color:white;font-size:8px">P</div>`;
        pLabel.element.style.pointerEvents = "none";
        pLabel.position.set(diagramX + diagramSize/2, diagramY - diagramSize/2, -1);
        group.add(pLabel);
        labels.push(pLabel);
        
        // V axis label
        const vLabel = new CSS2DObject(document.createElement("div"));
        vLabel.element.innerHTML = `<div style="background:rgba(0,255,0,0.8);padding:3px 6px;border-radius:3px;color:white;font-size:8px">V</div>`;
        vLabel.element.style.pointerEvents = "none";
        vLabel.position.set(diagramX - diagramSize/2, diagramY - diagramSize/2, -1);
        group.add(vLabel);
        labels.push(vLabel);
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
  }, [pistonPosition, temperature, showPiston, showGas, showPVDiagram]);

  // Calculate work done (W = PΔV)
  const workDone = useMemo(() => {
    return (pressure * volume).toFixed(2);
  }, [pressure, volume]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Advanced Thermodynamics
        </CardTitle>
        <CardDescription>
          3D simulation of thermodynamic processes: Isothermal, Adiabatic, Isobaric, and Isochoric with interactive P-V-T surfaces and labelled components.
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
          <Card className="bg-gradient-to-r from-red-500/10 to-blue-500/10 border-red-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-red-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Cylinder</div>
                  <div className="text-xs text-muted-foreground">Container - Grey</div>
                </div>
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-600 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Piston</div>
                  <div className="text-xs text-muted-foreground">Movable - Dark Grey</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-blue-500 text-xl mb-2">🔵</div>
                  <div className="text-sm font-medium">Gas Particles</div>
                  <div className="text-xs text-muted-foreground">Ideal gas - Blue</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="text-red-500 text-xl mb-2">⚪</div>
                  <div className="text-sm font-medium">Weight</div>
                  <div className="text-xs text-muted-foreground">Pressure - Red</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="text-green-500 text-xl mb-2">📊</div>
                  <div className="text-sm font-medium">P-V Diagram</div>
                  <div className="text-xs text-muted-foreground">State visualization</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Process Selection */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={processType === "isothermal" ? "default" : "outline"}
                onClick={() => setProcessType("isothermal")}
                className="flex-1"
              >
                Isothermal
              </Button>
              <Button
                variant={processType === "adiabatic" ? "default" : "outline"}
                onClick={() => setProcessType("adiabatic")}
                className="flex-1"
              >
                Adiabatic
              </Button>
              <Button
                variant={processType === "isobaric" ? "default" : "outline"}
                onClick={() => setProcessType("isobaric")}
                className="flex-1"
              >
                Isobaric
              </Button>
              <Button
                variant={processType === "isochoric" ? "default" : "outline"}
                onClick={() => setProcessType("isochoric")}
                className="flex-1"
              >
                Isochoric
              </Button>
            </div>
            
            {/* Parameter Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="piston" className="text-sm font-medium">
                  Piston: {pistonPosition.toFixed(1)}
                </Label>
                <Slider
                  id="piston"
                  min={1}
                  max={10}
                  step={0.5}
                  value={[pistonPosition]}
                  onValueChange={(v) => setPistonPosition(v[0])}
                />
                <div className="text-xs text-muted-foreground">Controls volume</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium">
                  Temperature: {temperature}K
                </Label>
                <Slider
                  id="temperature"
                  min={100}
                  max={1000}
                  step={10}
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                />
                <div className="text-xs text-muted-foreground">Particle speed</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volume" className="text-sm font-medium">
                  Volume: {volume}L
                </Label>
                <Slider
                  id="volume"
                  min={1}
                  max={10}
                  step={0.5}
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                />
                <div className="text-xs text-muted-foreground">Cylinder size</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pressure" className="text-sm font-medium">
                  Pressure: {pressure}atm
                </Label>
                <Slider
                  id="pressure"
                  min={0.5}
                  max={5}
                  step={0.1}
                  value={[pressure]}
                  onValueChange={(v) => setPressure(v[0])}
                />
                <div className="text-xs text-muted-foreground">Force on piston</div>
              </div>
            </div>
            
            {/* Process Info Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Thermodynamic Process Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center text-sm">
                  <div className="font-bold text-primary">
                    {processType === "isothermal" ? "ΔT = 0" : 
                     processType === "adiabatic" ? "Q = 0" :
                     processType === "isobaric" ? "ΔP = 0" : "ΔV = 0"}
                  </div>
                  <div className="text-muted-foreground">Condition</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-blue-500">{workDone}</div>
                  <div className="text-muted-foreground">Work (W = PΔV)</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-red-500">{temperature}K</div>
                  <div className="text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-green-500">{volume}L</div>
                  <div className="text-muted-foreground">Volume</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPiston}
                onChange={(e) => setShowPiston(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Piston</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGas}
                onChange={(e) => setShowGas(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Gas Particles</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPVDiagram}
                onChange={(e) => setShowPVDiagram(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show PV Diagram</span>
            </label>
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Thermodynamics Laws with Meanings</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 What is Thermodynamics?</h4>
                  <p>
                    Thermodynamics is the study of <strong>heat, work, temperature, and energy</strong>. It explains how energy moves and changes form. The laws of thermodynamics govern all energy transformations in the universe, from engines to chemical reactions to biological systems.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">📐 Zeroth Law:</h4>
                    <p className="font-mono text-purple-300">If A = B and B = C, then A = C</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> If two systems are in thermal equilibrium with a third, they are in equilibrium with each other. This law defines temperature as a property that determines thermal equilibrium.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-green-400 mb-2">⚡ First Law:</h4>
                    <p className="font-mono text-green-300">ΔU = Q - W</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> Energy is conserved. The change in internal energy (ΔU) equals heat added to system (Q) minus work done by system (W). Energy cannot be created or destroyed, only transformed.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-400 mb-2">🔥 Second Law:</h4>
                    <p className="font-mono text-yellow-300">ΔS ≥ 0</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> In any energy transfer, the total entropy (disorder) of a closed system always increases. Heat flows spontaneously from hot to cold, not the reverse. Natural processes are irreversible.
                    </p>
                  </div>
                  
                  <div className="bg-cyan-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-cyan-400 mb-2">❄️ Third Law:</h4>
                    <p className="font-mono text-cyan-300">S → 0 as T → 0K</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero. This is the lowest possible temperature, but it can never be exactly reached.
                    </p>
                  </div>
                </div>
                
                <div className="bg-orange-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-orange-400 mb-2">💡 Ideal Gas Law:</h4>
                  <p className="font-mono text-orange-300 text-center text-lg">PV = nRT</p>
                  <p className="text-sm mt-2">
                    <strong>Meaning:</strong> For an ideal gas, Pressure × Volume = number of moles × gas constant × Temperature. This relates the four key properties of a gas.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>P</strong> = Pressure, <strong>V</strong> = Volume, <strong>n</strong> = moles, <strong>R</strong> = 8.314 J/mol·K, <strong>T</strong> = Temperature (K)
                  </p>
                </div>
                
                <div className="bg-pink-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-pink-400 mb-2">📊 Thermodynamic Processes:</h4>
                  <ul className="text-xs space-y-1">
                    <li><strong>Isothermal:</strong> Temperature constant. ΔT = 0</li>
                    <li><strong>Adiabatic:</strong> No heat transfer. Q = 0</li>
                    <li><strong>Isobaric:</strong> Pressure constant. ΔP = 0</li>
                    <li><strong>Isochoric:</strong> Volume constant. ΔV = 0</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

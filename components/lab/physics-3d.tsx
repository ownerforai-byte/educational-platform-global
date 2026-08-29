"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

export function Physics3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedScene, setSelectedScene] = useState("electric-field");
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1.0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x6366f1, 0.8, 50);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x334155, 0x1e293b);
    scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // Scene objects
    const groups: Record<string, THREE.Group> = {};
    
    // Electric Field - Point Charges
    const electricFieldGroup = new THREE.Group();
    const chargeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const positiveMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 0.3
    });
    const negativeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.3
    });
    
    const positiveCharge = new THREE.Mesh(chargeGeometry, positiveMaterial);
    positiveCharge.position.set(-3, 0, 0);
    electricFieldGroup.add(positiveCharge);
    
    const negativeCharge = new THREE.Mesh(chargeGeometry, negativeMaterial);
    negativeCharge.position.set(3, 0, 0);
    electricFieldGroup.add(negativeCharge);
    
    // Field lines
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const x = -3 + Math.cos(angle) * t * 6;
        const y = Math.sin(angle) * t * 4 * (1 - t);
        const z = 0;
        points.push(new THREE.Vector3(x, y, z));
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      electricFieldGroup.add(line);
    }
    
    // Labels
    const createTextSprite = (text: string, position: THREE.Vector3, color: string = "#ffffff") => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 256;
        canvas.height = 64;
        context.font = 'Bold 32px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, 128, 40);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.scale.set(2, 0.5, 1);
      return sprite;
    };
    
    // Long arrows for force vectors
    const createArrow = (start: THREE.Vector3, end: THREE.Vector3, color: number = 0xffaa00) => {
      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();
      const arrowHelper = new THREE.ArrowHelper(direction.normalize(), start, length, color);
      arrowHelper.line.material.transparent = true;
      arrowHelper.line.material.opacity = 0.8;
      arrowHelper.cone.material.transparent = true;
      arrowHelper.cone.material.opacity = 0.9;
      return arrowHelper;
    };
    
    // Add force arrows
    electricFieldGroup.add(createArrow(
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 2, 0),
      0xff6b6b
    ));
    electricFieldGroup.add(createArrow(
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(1, 2, 0),
      0x4ecdc4
    ));
    
    electricFieldGroup.add(createTextSprite("+Q", new THREE.Vector3(-3, 1.5, 0), "#ef4444"));
    electricFieldGroup.add(createTextSprite("-Q", new THREE.Vector3(3, 1.5, 0), "#3b82f6"));
    electricFieldGroup.add(createTextSprite("F₁ (repulsion)", new THREE.Vector3(-4, -1, 0), "#ff6b6b"));
    electricFieldGroup.add(createTextSprite("F₂ (attraction)", new THREE.Vector3(4, -1, 0), "#4ecdc4"));
    
    groups["electric-field"] = electricFieldGroup;
    scene.add(electricFieldGroup);

    // Double Pendulum
    const pendulumGroup = new THREE.Group();
    const pivotPoint = new THREE.Vector3(0, 5, 0);
    const rodMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5, roughness: 0.3 });
    const bobMaterial = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.3, roughness: 0.4 });
    
    let angle1 = Math.PI / 4;
    let angle2 = Math.PI / 3;
    let angularVelocity1 = 0;
    let angularVelocity2 = 0;
    
    const pivotSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), rodMaterial);
    pivotSphere.position.copy(pivotPoint);
    pendulumGroup.add(pivotSphere);
    
    const rod1Length = 3;
    const bob1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), bobMaterial);
    pendulumGroup.add(bob1);
    
    const rod1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, rod1Length, 8), rodMaterial);
    pendulumGroup.add(rod1);
    
    const bob2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), bobMaterial.clone());
    bob2.material.color.set(0x10b981);
    pendulumGroup.add(bob2);
    
    const rod2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, rod1Length, 8), rodMaterial);
    pendulumGroup.add(rod2);
    
    // Trajectory trail
    const trailPoints: THREE.Vector3[] = [];
    const trailGeometry = new THREE.BufferGeometry();
    const trailMaterial = new THREE.LineBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.7 });
    const trailLine = new THREE.Line(trailGeometry, trailMaterial);
    pendulumGroup.add(trailLine);
    
    pendulumGroup.add(createTextSprite("Bob 1 (mass m₁)", new THREE.Vector3(2, -1, 0), "#f59e0b"));
    pendulumGroup.add(createTextSprite("Bob 2 (mass m₂)", new THREE.Vector3(2, -3, 0), "#10b981"));
    pendulumGroup.add(createTextSprite("Pendulum Length L", new THREE.Vector3(-4, 3, 0), "#94a3b8"));
    
    groups["double-pendulum"] = pendulumGroup;
    scene.add(pendulumGroup);

    // Gravitational Field
    const gravityGroup = new THREE.Group();
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xfbbf24,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    gravityGroup.add(sun);
    
    // Planet
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(5, 0, 0);
    gravityGroup.add(planet);
    
    // Orbital path
    const orbitCurve = new THREE.EllipseCurve(0, 0, 5, 4, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(p => new THREE.Vector3(p.x, p.y, 0)));
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    gravityGroup.add(orbitLine);
    
    // Gravitational field lines
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const startRadius = 2;
      const endRadius = 8;
      const startPoint = new THREE.Vector3(
        Math.cos(angle) * startRadius,
        Math.sin(angle) * startRadius,
        0
      );
      const endPoint = new THREE.Vector3(
        Math.cos(angle) * endRadius,
        Math.sin(angle) * endRadius,
        0
      );
      gravityGroup.add(createArrow(startPoint, endPoint, 0x818cf8));
    }
    
    gravityGroup.add(createTextSprite("Sun (Mass M)", new THREE.Vector3(0, 2.5, 0), "#fbbf24"));
    gravityGroup.add(createTextSprite("Planet (Mass m)", new THREE.Vector3(5, 1.5, 0), "#3b82f6"));
    gravityGroup.add(createTextSprite("Gravitational Force F_g", new THREE.Vector3(3, -1.5, 0), "#818cf8"));
    gravityGroup.add(createTextSprite("Orbital Velocity v", new THREE.Vector3(5, 2, 0), "#34d399"));
    
    groups["gravitation"] = gravityGroup;
    scene.add(gravityGroup);

    // Vector Explorer
    const vectorGroup = new THREE.Group();
    const origin = new THREE.Vector3(0, 0, 0);
    
    // Coordinate axes with arrows
    const xAxisArrow = createArrow(new THREE.Vector3(0, 0, 0), new THREE.Vector3(6, 0, 0), 0xef4444);
    const yAxisArrow = createArrow(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 6, 0), 0x22c55e);
    const zAxisArrow = createArrow(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 6), 0x3b82f6);
    vectorGroup.add(xAxisArrow);
    vectorGroup.add(yAxisArrow);
    vectorGroup.add(zAxisArrow);
    
    // Sample vectors
    const vecA = new THREE.Vector3(3, 2, 1);
    const vecB = new THREE.Vector3(2, -1, 2);
    const vecSum = new THREE.Vector3().addVectors(vecA, vecB);
    
    vectorGroup.add(createArrow(origin, vecA, 0xf59e0b));
    vectorGroup.add(createArrow(origin, vecB, 0x10b981));
    vectorGroup.add(createArrow(origin, vecSum, 0xf43f5e));
    
    // Dot product visualization
    const dotProductArrow = createArrow(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(4, 1, 0),
      0xa855f7
    );
    vectorGroup.add(dotProductArrow);
    
    vectorGroup.add(createTextSprite("A⃗ = (3, 2, 1)", new THREE.Vector3(3.5, 2.5, 1), "#f59e0b"));
    vectorGroup.add(createTextSprite("B⃗ = (2, -1, 2)", new THREE.Vector3(2.5, -1.5, 2), "#10b981"));
    vectorGroup.add(createTextSprite("A⃗ + B⃗ = (5, 1, 3)", new THREE.Vector3(5.5, 1.5, 3), "#f43f5e"));
    vectorGroup.add(createTextSprite("A⃗ · B⃗ = 3 (dot product)", new THREE.Vector3(4, 1.5, 0), "#a855f7"));
    
    groups["vectors"] = vectorGroup;
    scene.add(vectorGroup);

    // Show initial scene
    Object.entries(groups).forEach(([key, group]) => {
      group.visible = key === selectedScene;
    });

    // Animation loop
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      
      if (isPlaying) {
        time += 0.016;
        setTime(time);
        
        // Animate double pendulum
        if (groups["double-pendulum"]) {
          const newAngle1 = angle1 + angularVelocity1 * 0.016;
          const newAngle2 = angle2 + angularVelocity2 * 0.016;
          
          const bob1Pos = new THREE.Vector3(
            Math.sin(newAngle1) * rod1Length,
            pivotPoint.y - Math.cos(newAngle1) * rod1Length,
            0
          );
          const bob2Pos = new THREE.Vector3(
            bob1Pos.x + Math.sin(newAngle1 + newAngle2) * rod1Length,
            bob1Pos.y - Math.cos(newAngle1 + newAngle2) * rod1Length,
            0
          );
          
          bob1.position.copy(bob1Pos);
          bob2.position.copy(bob2Pos);
          
          rod1.position.set(
            (pivotPoint.x + bob1Pos.x) / 2,
            (pivotPoint.y + bob1Pos.y) / 2,
            0
          );
          rod1.lookAt(bob1Pos);
          rod1.rotateX(Math.PI / 2);
          
          rod2.position.set(
            (bob1Pos.x + bob2Pos.x) / 2,
            (bob1Pos.y + bob2Pos.y) / 2,
            0
          );
          rod2.lookAt(bob2Pos);
          rod2.rotateX(Math.PI / 2);
          
          // Update trail
          trailPoints.push(bob2Pos.clone());
          if (trailPoints.length > 200) trailPoints.shift();
          trailGeometry.setFromPoints(trailPoints);
          
          // Simple pendulum physics
          angularVelocity1 -= Math.sin(angle1) * 0.02;
          angularVelocity1 *= 0.995;
          angle1 += angularVelocity1 * 0.016;
          
          angularVelocity2 -= Math.sin(angle2) * 0.02;
          angularVelocity2 *= 0.995;
          angle2 += angularVelocity2 * 0.016;
        }
        
        // Animate gravitational orbit
        if (groups["gravitation"]) {
          const orbitAngle = time * 0.5;
          planet.position.set(
            Math.cos(orbitAngle) * 5,
            0,
            Math.sin(orbitAngle) * 4
          );
        }
      }
      
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedScene, isPlaying]);

  const handleSceneChange = (scene: string) => {
    setSelectedScene(scene);
    setTime(0);
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="relative h-[600px] w-full rounded-lg overflow-hidden border border-border" />
      
      <div className="grid md:grid-cols-4 gap-3">
        <Button 
          variant={selectedScene === "electric-field" ? "default" : "outline"}
          onClick={() => handleSceneChange("electric-field")}
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Electric Field
        </Button>
        <Button 
          variant={selectedScene === "double-pendulum" ? "default" : "outline"}
          onClick={() => handleSceneChange("double-pendulum")}
          className="flex items-center gap-2"
        >
          <RotateCw className="h-4 w-4" />
          Double Pendulum
        </Button>
        <Button 
          variant={selectedScene === "gravitation" ? "default" : "outline"}
          onClick={() => handleSceneChange("gravitation")}
          className="flex items-center gap-2"
        >
          <Atom className="h-4 w-4" />
          Gravitational Field
        </Button>
        <Button 
          variant={selectedScene === "vectors" ? "default" : "outline"}
          onClick={() => handleSceneChange("vectors")}
          className="flex items-center gap-2"
        >
          <Move3d className="h-4 w-4" />
          Vector Explorer
        </Button>
      </div>

      {/* Theory Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            📖 Theory & Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedScene === "electric-field" && (
            <div className="space-y-3">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">🔴 Coulomb's Law</h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  The force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.
                </p>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded font-mono text-center">
                  <p className="text-lg font-bold">F = k · q₁q₂ / r²</p>
                  <p className="text-xs text-muted-foreground mt-1">Where k = 8.99 × 10⁹ N·m²/C²</p>
                </div>
              </div>
              
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🔵 Electric Field</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Electric field is the force per unit charge. Field lines point away from positive charges and toward negative charges.
                </p>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded font-mono text-center">
                  <p className="text-lg font-bold">E = F/q = kQ/r²</p>
                  <p className="text-xs text-muted-foreground mt-1">Unit: N/C or V/m</p>
                </div>
              </div>
            </div>
          )}
          
          {selectedScene === "double-pendulum" && (
            <div className="space-y-3">
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚡ Chaotic Motion</h4>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  A double pendulum is a chaotic system - small changes in initial conditions lead to vastly different outcomes. This is sensitivity to initial conditions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">📐 Equations of Motion</h4>
                  <div className="mt-2 space-y-2 text-sm font-mono">
                    <p>τ₁ = I₁α₁ = -m₁gLsin(θ₁) - m₂gLsin(θ₁-θ₂)</p>
                    <p>τ₂ = I₂α₂ = m₂gLsin(θ₁-θ₂)</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">🎯 Key Properties</h4>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                    <li>• Non-linear differential equations</li>
                    <li>• Chaos theory demonstration</li>
                    <li>• Energy conservation: KE + PE = constant</li>
                    <li>• Period depends on amplitude (non-isochronous)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {selectedScene === "gravitation" && (
            <div className="space-y-3">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-4">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">🌍 Newton's Law of Gravitation</h4>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded font-mono text-center">
                  <p className="text-xl font-bold">F = GMm/r²</p>
                  <p className="text-xs text-muted-foreground mt-1">G = 6.674 × 10⁻¹¹ N·m²/kg²</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-4">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">📊 Orbital Mechanics</h4>
                  <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                    <li><strong>Orbital velocity:</strong> v = √(GM/r)</li>
                    <li><strong>Escape velocity:</strong> v_e = √(2GM/r)</li>
                    <li><strong>Period:</strong> T = 2π√(r³/GM)</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-4">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">🎯 Real-World Examples</h4>
                  <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                    <li>• Planets orbiting the Sun</li>
                    <li>• Moons orbiting planets</li>
                    <li>• Satellites around Earth</li>
                    <li>• Binary star systems</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {selectedScene === "vectors" && (
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">✖️ Cross Product</h4>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded font-mono">
                    <p>A⃗ × B⃗ = |A||B|sin(θ)n̂</p>
                    <p className="text-xs mt-1">Result is perpendicular to both A and B</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-cyan-50 dark:bg-cyan-950/30 p-4">
                  <h4 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-2">• Scalar (Dot) Product</h4>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded font-mono">
                    <p>A⃗ · B⃗ = |A||B|cos(θ)</p>
                    <p className="text-xs mt-1">Result is a scalar (number)</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-violet-50 dark:bg-violet-950/30 p-4">
                <h4 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">📐 Vector Addition Rules</h4>
                <ul className="text-sm text-violet-800 dark:text-violet-200 space-y-1">
                  <li><strong>Triangle Law:</strong> Place tail of second vector at head of first</li>
                  <li><strong>Parallelogram Law:</strong> Resultant is diagonal of parallelogram</li>
                  <li><strong>Component Method:</strong> Sum x-components and y-components separately</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            ⚙️ Interactive Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Simulation Speed</Label>
              <Input type="range" min="0" max="3" step="0.1" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label>Arrow Opacity</Label>
              <Input type="range" min="0.1" max="1" step="0.1" defaultValue="0.8" />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={() => setIsPlaying(!isPlaying)} className="flex-1">
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="outline" onClick={() => setTime(0)}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NEB/CDC Exam Focus */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            ⚡ NEB/CDC Exam Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">📝 High Priority Topics</h4>
              <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                <li>• Coulomb's Law numerical problems (5-8 marks)</li>
                <li>• Electric field calculations (3-5 marks)</li>
                <li>• Gravitational potential energy (4-6 marks)</li>
                <li>• Vector operations in physics problems (3-5 marks)</li>
              </ul>
            </div>
            
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ Common Mistakes</h4>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>• Forgetting that force is a vector (direction matters!)</li>
                <li>• Confusing electric field with electric potential</li>
                <li>• Wrong sign convention for gravitational potential</li>
                <li>• Mixing up dot product (scalar) and cross product (vector)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

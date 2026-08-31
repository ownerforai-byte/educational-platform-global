"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";

/* ============================================================
   Shared helpers
   ============================================================ */

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3 w-full">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Formula & Why It Matters</p>
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

type ProjectileResults = {
  timeOfFlight: number;
  maxHeight: number;
  range: number;
  vx: number;
  vy: number;
  maxRangeAngle: number;
};

function calculateProjectile(velocity: number, angleDeg: number, gravity: number): ProjectileResults {
  const rad = (angleDeg * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vy = velocity * Math.sin(rad);
  const timeOfFlight = (2 * vy) / gravity;
  const maxHeight = (vy * vy) / (2 * gravity);
  const range = (velocity * velocity * Math.sin(2 * rad)) / gravity;
  return { timeOfFlight, maxHeight, range, vx, vy, maxRangeAngle: 45 };
}

/* ============================================================
   Complete Projectile Motion (3D)
   ============================================================ */

function ProjectileMotion3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [isRunning, setIsRunning] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [showPath, setShowPath] = useState(true);
  const isRunningRef = useRef(false);
  const ballIndexRef = useRef(0);

  const results = useMemo(
    () => calculateProjectile(velocity, angle, gravity),
    [velocity, angle, gravity]
  );

  const getTrajectoryPoints = useCallback(
    (v: number, a: number, g: number) => {
      const rad = (a * Math.PI) / 180;
      const vx = v * Math.cos(rad);
      const vy = v * Math.sin(rad);
      const points: Array<{ x: number; y: number; z: number }> = [];
      const dt = 0.02;
      const totalTime = (2 * vy) / g;
      for (let t = 0; t <= totalTime + dt; t += dt) {
        const x = vx * t;
        const y = vy * t - 0.5 * g * t * t;
        if (y < 0) break;
        points.push({ x, y, z: 0 });
      }
      return points;
    },
    []
  );

  const [trajectory, setTrajectory] = useState<Array<{ x: number; y: number; z: number }>>([]);

  useEffect(() => {
    setTrajectory(getTrajectoryPoints(velocity, angle, gravity));
  }, [velocity, angle, gravity, getTrajectoryPoints]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let ballIndex = 0;
    let lastBallUpdate = 0;
    let ball: THREE.Mesh;
    let pathLine: THREE.Line | null = null;
    let peakMarker: THREE.Mesh | null = null;
    let landingMarker: THREE.Mesh | null = null;
    let vxArrow: THREE.ArrowHelper | null = null;
    let vyArrow: THREE.ArrowHelper | null = null;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 40, 90);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(15, 10, 20);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 20, 15);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      scene.add(dirLight);

      const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
      dirLight2.position.set(-10, -5, -10);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 50);
      pointLight.position.set(0, 0, 15);
      scene.add(pointLight);

      const gridHelper = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
      scene.add(gridHelper);

      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      const groundGeo = new THREE.PlaneGeometry(30, 30);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      // Cannon
      const cannonGroup = new THREE.Group();
      const barrelGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 16);
      const barrelMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.2, metalness: 0.8 });
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.z = Math.PI / 2;
      barrel.castShadow = true;
      cannonGroup.add(barrel);

      const baseGeo = new THREE.SphereGeometry(1, 16, 16);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.scale.set(1, 0.5, 1);
      base.castShadow = true;
      cannonGroup.add(base);

      cannonGroup.position.set(0, 0.5, 0);
      cannonGroup.rotation.y = -Math.PI / 2;
      scene.add(cannonGroup);

      // Ball
      const ballGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.15, metalness: 0.4, emissive: 0xef4444, emissiveIntensity: 0.15 });
      ball = new THREE.Mesh(ballGeo, ballMat);
      ball.castShadow = true;
      ball.visible = false;
      scene.add(ball);

      // Update view
      const updateView = () => {
        if (pathLine) {
          scene.remove(pathLine);
          pathLine.geometry.dispose();
          (pathLine.material as THREE.Material).dispose();
          pathLine = null;
        }
        if (peakMarker) {
          scene.remove(peakMarker);
          peakMarker.geometry.dispose();
          (peakMarker.material as THREE.Material).dispose();
          peakMarker = null;
        }
        if (landingMarker) {
          scene.remove(landingMarker);
          landingMarker.geometry.dispose();
          (landingMarker.material as THREE.Material).dispose();
          landingMarker = null;
        }
        if (vxArrow) scene.remove(vxArrow);
        if (vyArrow) scene.remove(vyArrow);

        if (trajectory.length === 0) return;

        const scaleX = 1;
        const scaleY = 1;

        // Trajectory path
        if (showPath) {
          const points = trajectory.map((p) => new THREE.Vector3(p.x * scaleX, p.y * scaleY, p.z));
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0x3b82f6 });
          pathLine = new THREE.Line(geometry, material);
          scene.add(pathLine);
        }

        // Peak marker
        const peak = trajectory.reduce((max, p) => (p.y > max.y ? p : max), trajectory[0]);
        const peakGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const peakMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, emissive: 0xfbbf24, emissiveIntensity: 0.4, metalness: 0.2 });
        peakMarker = new THREE.Mesh(peakGeo, peakMat);
        peakMarker.position.set(peak.x * scaleX, peak.y * scaleY, peak.z);
        peakMarker.castShadow = true;
        scene.add(peakMarker);

        // Landing marker
        const last = trajectory[trajectory.length - 1];
        const landingGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const landingMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.2, metalness: 0.3 });
        landingMarker = new THREE.Mesh(landingGeo, landingMat);
        landingMarker.position.set(last.x * scaleX, 0, last.z);
        landingMarker.castShadow = true;
        scene.add(landingMarker);

        // Velocity component arrows at origin
        if (showVectors) {
          const rad = (angle * Math.PI) / 180;
          const vx = velocity * Math.cos(rad);
          const vy = velocity * Math.sin(rad);
          const arrowScale = 0.05;
          vxArrow = new THREE.ArrowHelper(
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 0.5, 0),
            vx * arrowScale,
            0x3b82f6
          );
          vyArrow = new THREE.ArrowHelper(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, 0.5, 0),
            vy * arrowScale,
            0xef4444
          );
          scene.add(vxArrow);
          scene.add(vyArrow);
        }
      };

      updateView();

      // Aim cannon barrel
      const rad = (angle * Math.PI) / 180;
      cannonGroup.rotation.z = -rad;
      cannonGroup.position.set(0, 0.5, 0);

      let cancelled = false;

      // Sync local index with ref on every frame
      const animate = (time: number) => {
        if (cancelled) return;
        frameId = requestAnimationFrame(animate);
        ballIndex = ballIndexRef.current || ballIndex;

        if (isRunningRef.current && trajectory.length > 1) {
          if (time - lastBallUpdate > 1000 / 60) {
            ballIndex = Math.min(ballIndex + 1, trajectory.length - 1);
            ballIndexRef.current = ballIndex;
            const point = trajectory[ballIndex];
            ball.position.set(point.x, point.y, point.z);
            ball.visible = true;
            lastBallUpdate = time;
            if (ballIndex >= trajectory.length - 1) {
              isRunningRef.current = false;
              ballIndexRef.current = 0;
            }
          }
        }

        controls.update();
        renderer.render(scene, camera);
      };
      frameId = requestAnimationFrame(animate);

      const resizeObserver = new ResizeObserver(() => {
        if (!container || cancelled) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
      resizeObserver.observe(container);

      return () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
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
  }, [trajectory, showVectors, showPath, angle, velocity]);

  const handleRun = () => {
    ballIndexRef.current = 0;
    setIsRunning(true);
    isRunningRef.current = true;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Projectile Motion (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom • Run to launch</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Projectile Parameters">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Initial Velocity (m/s)</Label>
                <Input
                  type="number"
                  value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Launch Angle (°)</Label>
                <Input
                  type="number"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Gravity (m/s²)</Label>
                <Input
                  type="number"
                  value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full">
              <Button onClick={handleRun} disabled={isRunning} className="w-full sm:w-auto">
                {isRunning ? "Launching..." : "🚀 Launch"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPath(!showPath)}
                className="flex-1 min-w-[100px]"
              >
                Path: {showPath ? "ON" : "OFF"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVectors(!showVectors)}
                className="flex-1 min-w-[100px]"
              >
                Vectors: {showVectors ? "ON" : "OFF"}
              </Button>
            </div>
          </div>
        </CollapsibleControls>

        <div 
          ref={containerRef} 
          className="lab-3d-container w-full rounded-md border border-border" 
          aria-label="Interactive 3D projectile motion"
          style={{ height: 'clamp(300px, 50vh, 600px)' }}
        />

        {/* Results grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">⏱ Time of Flight</p>
            <p className="text-sm font-semibold">{results.timeOfFlight.toFixed(2)} s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">⬆ Max Height</p>
            <p className="text-sm font-semibold">{results.maxHeight.toFixed(2)} m</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">↔ Horizontal Range</p>
            <p className="text-sm font-semibold">{results.range.toFixed(2)} m</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Velocities</p>
            <p className="text-sm font-semibold">vₓ={results.vx.toFixed(2)} • vᵧ={results.vy.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 bg-blue-500" /> vₓ (horizontal velocity)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 bg-red-500" /> vᵧ (vertical velocity)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-yellow-400" /> Max height point
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-green-500" /> Landing point
          </span>
        </div>

        <MeaningPanel
          title="Projectile Motion Formulas (Class 11)"
          meaning="A projectile follows a parabolic path under constant gravity. Horizontal motion is uniform (vₓ = u·cosθ), vertical motion has constant acceleration (vᵧ = u·sinθ − gt)."
          points={[
            "Time of flight: T = 2u·sinθ / g — the total time the projectile is in air",
            "Maximum height: H = u²·sin²θ / 2g — reached when vᵧ = 0",
            "Horizontal range: R = u²·sin(2θ) / g — max when θ = 45°",
            "Equation of trajectory: y = x·tanθ − g·x²/(2·u²·cos²θ) — a parabola",
            "Horizontal velocity remains constant; vertical velocity changes by −g each second",
            "At 45°, range is maximum: R_max = u²/g",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Circular Motion Viewer
   ============================================================ */

function CircularMotion3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(3);
  const [speed, setSpeed] = useState(2);
  const [showCentripetal, setShowCentripetal] = useState(true);
  const [showVelocity, setShowVelocity] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let ball: THREE.Mesh;
    let velocityArrow: THREE.ArrowHelper | null = null;
    let centripetalArrow: THREE.ArrowHelper | null = null;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 5, 10);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Ground grid
      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Center point
      const centerGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const center = new THREE.Mesh(centerGeo, centerMat);
      scene.add(center);

      // Circular path
      const pathPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pathPoints.push(new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)));
      }
      const pathLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pathPoints),
        new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5 })
      );
      scene.add(pathLine);

      // Ball
      const ballGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.3, emissive: 0xef4444, emissiveIntensity: 0.2 });
      ball = new THREE.Mesh(ballGeo, ballMat);
      scene.add(ball);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        const a = time * speed;
        const x = radius * Math.cos(a);
        const z = radius * Math.sin(a);
        ball.position.set(x, 0, z);

        if (velocityArrow) scene.remove(velocityArrow);
        if (centripetalArrow) scene.remove(centripetalArrow);

        if (showVelocity) {
          // Velocity is tangential
          const vx = -Math.sin(a);
          const vz = Math.cos(a);
          velocityArrow = new THREE.ArrowHelper(
            new THREE.Vector3(vx, 0, vz),
            new THREE.Vector3(x, 0, z),
            1.5,
            0x22c55e
          );
          scene.add(velocityArrow);
        }
        if (showCentripetal) {
          // Centripetal acceleration points to center
          const cx = -x / radius;
          const cz = -z / radius;
          centripetalArrow = new THREE.ArrowHelper(
            new THREE.Vector3(cx, 0, cz),
            new THREE.Vector3(x, 0, z),
            1.5,
            0xef4444
          );
          scene.add(centripetalArrow);
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
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
  }, [radius, speed, showVelocity, showCentripetal]);

  const angularVel = speed / radius;
  const linearVel = radius * angularVel;
  const centripetalAccel = (linearVel * linearVel) / radius;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Uniform Circular Motion</span>
          <span className="text-xs text-muted-foreground font-normal">3D rotatable view of centripetal forces</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Motion Parameters">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Radius (m)</Label>
                <Input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Angular Speed (ω)</Label>
                <Input type="number" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full">
              <Button variant={showVelocity ? "default" : "outline"} size="sm" onClick={() => setShowVelocity(!showVelocity)} className="flex-1 min-w-[100px]">
                Velocity
              </Button>
              <Button variant={showCentripetal ? "default" : "outline"} size="sm" onClick={() => setShowCentripetal(!showCentripetal)} className="flex-1 min-w-[100px]">
                Centripetal Accel
              </Button>
            </div>
          </div>
        </CollapsibleControls>

        <div 
          ref={containerRef} 
          className="lab-3d-container w-full rounded-md border border-border" 
          aria-label="Interactive 3D circular motion"
          style={{ height: 'clamp(300px, 50vh, 600px)' }}
        />

        <div className="grid gap-3 sm:grid-cols-3 w-full">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angular Velocity</p>
            <p className="text-sm font-semibold">{angularVel.toFixed(2)} rad/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Linear Speed</p>
            <p className="text-sm font-semibold">{linearVel.toFixed(2)} m/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Centripetal Acceleration</p>
            <p className="text-sm font-semibold">{centripetalAccel.toFixed(2)} m/s²</p>
          </div>
        </div>

        <MeaningPanel
          title="Uniform Circular Motion (Class 11)"
          meaning="Even at constant speed, circular motion is accelerated because velocity changes direction. The inward acceleration is centripetal acceleration, produced by a centripetal force."
          points={[
            "Angular velocity: ω = v/r (rad/s) — angle swept per second",
            "Linear speed: v = ω·r = 2πr/T where T is the period",
            "Centripetal acceleration: a = v²/r = ω²·r — always toward center",
            "Centripetal force: F = mv²/r = mω²r",
            "Velocity is always tangential (green arrow); acceleration always toward center (red arrow)",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Simple Harmonic Motion (SHM) Viewer
   ============================================================ */

function SHMViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [amplitude, setAmplitude] = useState(2.5);
  const [frequency, setFrequency] = useState(0.8);
  const [showTimeGraph, setShowTimeGraph] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let ball: THREE.Mesh;
    let timeBall: THREE.Mesh;
    let tracedLine: THREE.Line | null = null;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 6);

      if (!isWebGLAvailable()) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Equilibrium position line
      const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, 0, 0),
      ]);
      const axisMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 });
      scene.add(new THREE.Line(axisGeo, axisMat));

      // Ball
      const ballGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.3, emissive: 0xef4444, emissiveIntensity: 0.3 });
      ball = new THREE.Mesh(ballGeo, ballMat);
      scene.add(ball);

      // Time graph ball (in background plane)
      const timeBallGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const timeBallMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, roughness: 0.2, emissive: 0x22d3ee, emissiveIntensity: 0.5 });
      timeBall = new THREE.Mesh(timeBallGeo, timeBallMat);
      scene.add(timeBall);

      // Collects path points for trailing line
      const trail: THREE.Vector3[] = [];

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        const omega = 2 * Math.PI * frequency;
        const displacement = amplitude * Math.cos(omega * time);
        ball.position.set(displacement, 0, 0);

        // Time graph: trace x vs t in z-axis
        if (showTimeGraph) {
          trail.push(new THREE.Vector3(displacement, 0, -1 + (time % 2)));
          if (trail.length > 100) trail.shift();
          const points = trail.map((p) => new THREE.Vector3(p.x, p.y, p.z));
          if (tracedLine) {
            scene.remove(tracedLine);
            tracedLine.geometry.dispose();
            (tracedLine.material as THREE.Material).dispose();
          }
          tracedLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color: 0x22d3ee })
          );
          scene.add(tracedLine);
          timeBall.position.set(displacement, 0, -1);
        } else {
          timeBall.visible = false;
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
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
  }, [amplitude, frequency, showTimeGraph]);

  const period = 1 / frequency;
  const angularFreq = 2 * Math.PI * frequency;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Simple Harmonic Motion (SHM)</span>
          <span className="text-xs text-muted-foreground font-normal">Spring oscillation with displacement–time graph</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="SHM Parameters">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Amplitude (m)</Label>
                <Input type="number" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="w-full" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-xs text-muted-foreground">Frequency (Hz)</Label>
                <Input type="number" step="0.1" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full">
              <Button variant={showTimeGraph ? "default" : "outline"} size="sm" onClick={() => setShowTimeGraph(!showTimeGraph)} className="flex-1 min-w-[100px]">
                Time graph
              </Button>
            </div>
          </div>
        </CollapsibleControls>

        <div 
          ref={containerRef} 
          className="lab-3d-container w-full rounded-md border border-border" 
          aria-label="Interactive 3D simple harmonic motion"
          style={{ height: 'clamp(300px, 50vh, 600px)' }}
        />

        <div className="grid gap-3 sm:grid-cols-3 w-full">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Period</p>
            <p className="text-sm font-semibold">{period.toFixed(2)} s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angular Frequency</p>
            <p className="text-sm font-semibold">{angularFreq.toFixed(2)} rad/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Displacement Equation</p>
            <p className="text-sm font-semibold">x = {amplitude}·cos({angularFreq.toFixed(2)}t)</p>
          </div>
        </div>

        <MeaningPanel
          title="Simple Harmonic Motion (Class 11)"
          meaning="SHM is the oscillatory motion where the restoring force is directly proportional to displacement and directed toward equilibrium: F = −kx. The displacement follows a sine/cosine wave."
          points={[
            "Displacement: x = A·cos(ωt) — A is amplitude, ω = 2π/T",
            "Velocity: v = −Aω·sin(ωt) — max at equilibrium (v_max = Aω)",
            "Acceleration: a = −ω²x — max at extremes (a_max = Aω²)",
            "Velocity maximum at x=0; acceleration maximum at x=±A",
            "Spring-mass: T = 2π√(m/k) — no dependence on amplitude",
            "Simple pendulum: T = 2π√(L/g) — independent of mass",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Physics Lab Main Export
   ============================================================ */

export function PhysicsLab() {
  const [tab, setTab] = useState("projectile");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Physics Lab</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive mechanics and waves for Class 11</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex-wrap w-full">
            <TabsTrigger value="projectile" className="flex-1 min-w-[120px]">Projectile Motion</TabsTrigger>
            <TabsTrigger value="circular" className="flex-1 min-w-[120px]">Circular Motion</TabsTrigger>
            <TabsTrigger value="shm" className="flex-1 min-w-[120px]">SHM</TabsTrigger>
          </TabsList>

          <TabsContent value="projectile" className="mt-4">
            <ProjectileMotion3D />
          </TabsContent>

          <TabsContent value="circular" className="mt-4">
            <CircularMotion3D />
          </TabsContent>

          <TabsContent value="shm" className="mt-4">
            <SHMViewer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

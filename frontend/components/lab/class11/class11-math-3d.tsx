"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Slider from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const Class11Math3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  const [tangentX, setTangentX] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Latest rotation lives in a ref so moving the rotation slider never rebuilds the scene.
  const rotationRef = useRef(rotation);
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Quadratic function and its derivative — recomputed from current coefficients.
  const f = (x: number) => a * x * x + b * x + c;
  const fp = (x: number) => 2 * a * x + b;

  // Dynamic view window derived from the curve itself (no hardcoded plot bounds).
  const view = useMemo(() => {
    const vertexX = Math.abs(a) > 1e-9 ? -b / (2 * a) : 0;
    let halfWidth = 3;
    halfWidth = Math.max(halfWidth, Math.abs(vertexX) * 1.5 + 1.5);
    halfWidth = Math.max(halfWidth, Math.abs(tangentX) * 1.5 + 1.5);

    // Sample f to derive the vertical window so steep parabolas stay visible.
    let yMin = Infinity;
    let yMax = -Infinity;
    const samples = 240;
    for (let i = 0; i <= samples; i++) {
      const x = -halfWidth + (i / samples) * halfWidth * 2;
      const y = f(x);
      if (Number.isFinite(y)) {
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
      }
    }
    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) { yMin = -5; yMax = 5; }
    yMin = Math.min(yMin, f(tangentX));
    yMax = Math.max(yMax, f(tangentX), 0);
    const yPad = Math.max((yMax - yMin) * 0.15, 1);
    return { halfWidth, yMin: yMin - yPad, yMax: yMax + yPad };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b, c, tangentX]);

  // Live quadratic properties read-out (vertex, axis, discriminant, roots).
  const props = useMemo(() => {
    const discriminant = b * b - 4 * a * c;
    const isQuadratic = Math.abs(a) > 1e-9;
    const roots =
      discriminant > 0
        ? [(-b + Math.sqrt(discriminant)) / (2 * a), (-b - Math.sqrt(discriminant)) / (2 * a)]
        : discriminant === 0
          ? [-b / (2 * a)]
          : [];
    return {
      isQuadratic,
      vertex: isQuadratic ? { h: -b / (2 * a), k: f(-b / (2 * a)) } : null,
      axis: isQuadratic ? -b / (2 * a) : null,
      discriminant,
      roots,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b, c]);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xf1f5f9);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(view.halfWidth * 0.6, (view.yMin + view.yMax) / 2 + view.halfWidth * 1.2, view.halfWidth * 2.4);
    controls.target.set(0, (view.yMin + view.yMax) / 2, 0);
    controls.update();

    // Track GPU resources so nothing leaks between rebuilds.
    const disposables: Array<{ dispose: () => void }> = [];

    // Axes scaled to the dynamic view window.
    const axesSize = Math.max(view.halfWidth, Math.abs(view.yMin), Math.abs(view.yMax));
    const axesHelper = new THREE.AxesHelper(axesSize);
    scene.add(axesHelper);

    // ---- Parabola: sampled over the DYNAMIC x-window ----
    const parabolaGeometry = new THREE.BufferGeometry();
    const parabolaMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    disposables.push(parabolaGeometry, parabolaMaterial);
    const parabolaPoints: THREE.Vector3[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const x = -view.halfWidth + (i / steps) * view.halfWidth * 2;
      parabolaPoints.push(new THREE.Vector3(x, f(x), 0));
    }
    parabolaGeometry.setFromPoints(parabolaPoints);
    const parabola = new THREE.Line(parabolaGeometry, parabolaMaterial);
    scene.add(parabola);

    // ---- Tangent line at x = x₀ ----
    // Correct tangent formula: y = f(x₀) + f′(x₀)·(x − x₀), where f′(x₀) = 2a·x₀ + b.
    const y0 = f(tangentX);
    const m0 = fp(tangentX);
    const tangentGeometry = new THREE.BufferGeometry();
    const tangentMaterial = new THREE.LineBasicMaterial({ color: 0x00aa00 });
    disposables.push(tangentGeometry, tangentMaterial);
    const tangentPoints: THREE.Vector3[] = [];
    const tHalf = view.halfWidth * 0.7; // segment centred on the contact point
    for (let i = 0; i <= steps; i++) {
      const x = tangentX - tHalf + (i / steps) * tHalf * 2;
      tangentPoints.push(new THREE.Vector3(x, y0 + m0 * (x - tangentX), 0));
    }
    tangentGeometry.setFromPoints(tangentPoints);
    const tangent = new THREE.Line(tangentGeometry, tangentMaterial);
    scene.add(tangent);

    // Contact-point marker on the curve at x₀.
    const markerGeometry = new THREE.SphereGeometry(Math.max(0.06, view.halfWidth * 0.02), 16, 16);
    const markerMaterial = new THREE.MeshStandardMaterial({ color: 0x9333ea });
    disposables.push(markerGeometry, markerMaterial);
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(tangentX, y0, 0);
    scene.add(marker);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation — reads rotation through the ref (no scene rebuild when rotating).
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      scene.rotation.y = rotationRef.current;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b, c, tangentX, view.halfWidth, view.yMin, view.yMax]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Math 3D: Quadratic Functions Visualization</CardTitle>
        <CardDescription>
          Interactive 3D visualization of quadratic functions and their properties.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Coefficient a</Label>
<Slider
  min={-2}
  max={2}
  step={0.1}
  value={[a]}
  onValueChange={(value: number[]) => setA(value[0])}
/>
              <p className="text-sm text-gray-500">Current: {a.toFixed(1)}</p>
            </div>
            <div>
              <Label>Coefficient b</Label>
<Slider
  min={-2}
  max={2}
  step={0.1}
  value={[b]}
  onValueChange={(value: number[]) => setB(value[0])}
/>
              <p className="text-sm text-gray-500">Current: {b.toFixed(1)}</p>
            </div>
            <div>
              <Label>Coefficient c</Label>
<Slider
  min={-2}
  max={2}
  step={0.1}
  value={[c]}
  onValueChange={(value: number[]) => setC(value[0])}
/>
              <p className="text-sm text-gray-500">Current: {c.toFixed(1)}</p>
            </div>
            <div>
              <Label>Tangent point x₀</Label>
              <Slider
                min={-Math.max(2, view.halfWidth)}
                max={Math.max(2, view.halfWidth)}
                step={0.1}
                value={[tangentX]}
                onValueChange={(value: number[]) => setTangentX(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {tangentX.toFixed(1)}</p>
            </div>
            <div>
              <Label>Rotation</Label>
<Slider
  min={0}
  max={Math.PI * 2}
  step={0.1}
  value={[rotation]}
  onValueChange={(value: number[]) => setRotation(value[0])}
/>
              <p className="text-sm text-gray-500">Current: {rotation.toFixed(1)} radians</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-1">
              <p><span className="font-semibold">Tangent at x₀ = {tangentX.toFixed(2)}:</span></p>
              <p>f(x₀) = {f(tangentX).toFixed(4)},&nbsp; f′(x₀) = slope = {fp(tangentX).toFixed(4)}</p>
              <p>y = {fp(tangentX).toFixed(3)}(x − {tangentX.toFixed(2)}) + {f(tangentX).toFixed(3)}</p>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-1">
              {props.isQuadratic && props.vertex ? (
                <>
                  <p><span className="font-semibold">Vertex:</span> ({props.vertex.h.toFixed(3)}, {props.vertex.k.toFixed(3)})</p>
                  <p><span className="font-semibold">Axis of symmetry:</span> x = {props.axis?.toFixed(3)}</p>
                  <p>
                    <span className="font-semibold">Discriminant:</span> {props.discriminant.toFixed(3)} →{" "}
                    {props.discriminant > 0
                      ? `2 real roots (${props.roots.map((r) => r.toFixed(3)).join(", ")})`
                      : props.discriminant === 0
                        ? `1 repeated root (x = ${props.roots[0]?.toFixed(3)})`
                        : "no real roots"}
                  </p>
                </>
              ) : (
                <p>a = 0 → the graph degenerates to the straight line y = {b.toFixed(1)}x + {c.toFixed(1)}</p>
              )}
              <p><span className="font-semibold">View window:</span> x ∈ [{(-view.halfWidth).toFixed(1)}, {view.halfWidth.toFixed(1)}], y ∈ [{view.yMin.toFixed(1)}, {view.yMax.toFixed(1)}]</p>
            </div>
            <div>
              <h3 className="font-semibold">Theory</h3>
              <p className="text-sm">
                A quadratic function is a second-degree polynomial of the form: f(x) = ax² + bx + c.
              </p>
              <p className="text-sm mt-2">
                Key properties:
                <ul className="list-disc pl-5 mt-1">
                  <li>Vertex: The highest or lowest point of the parabola</li>
                  <li>Axis of Symmetry: The vertical line that passes through the vertex</li>
                  <li>Y-intercept: The point where the parabola crosses the y-axis</li>
                  <li>X-intercepts: The points where the parabola crosses the x-axis</li>
                  <li>Direction: Determined by the sign of 'a' (upwards if a &gt; 0, downwards if a &lt; 0)</li>
                </ul>
              </p>
              <p className="text-sm mt-2">
                Vertex form: f(x) = a(x - h)² + k, where (h, k) is the vertex.
              </p>
              <p className="text-sm mt-2">
                Factored form: f(x) = a(x - r₁)(x - r₂), where r₁ and r₂ are the roots.
              </p>
              <p className="text-sm mt-2">
                Tangent line at x₀: y = f(x₀) + f′(x₀)(x − x₀) with f′(x) = 2ax + b — the green line touches
                the red curve exactly at the purple marker and matches its slope there.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Math3D;

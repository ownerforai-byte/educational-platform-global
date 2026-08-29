"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11SetsFunctions: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [numElementsA, setNumElementsA] = useState(5);
  const [numElementsB, setNumElementsB] = useState(5);
  const [overlap, setOverlap] = useState(3);
  const [functionType, setFunctionType] = useState<"linear" | "quadratic" | "cubic" | "trigonometric">("linear");
  const [showSets, setShowSets] = useState(true);
  const [showFunctions, setShowFunctions] = useState(true);

  // Set theory calculations
  const setA = useMemo(() => Array.from({ length: numElementsA }, (_, i) => i + 1), [numElementsA]);
  const setB = useMemo(() => Array.from({ length: numElementsB }, (_, i) => i + numElementsA - overlap + 1), [numElementsB, overlap, numElementsA]);
  const unionAB = useMemo(() => new Set([...setA, ...setB]).size, [setA, setB]);
  const intersectionAB = useMemo(() => {
    const aSet = new Set(setA);
    const bSet = new Set(setB);
    return Array.from(aSet).filter(x => bSet.has(x)).length;
  }, [setA, setB]);
  const differenceAB = useMemo(() => setA.filter(x => !setB.includes(x)).length, [setA, setB]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 10, 20),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Axes
        const axes = new THREE.AxesHelper(10);
        ts.group.add(axes);

        // Set A visualization (left circle)
        const setACircle = new THREE.Group();
        const circleRadius = 4;
        const circlePoints: THREE.Vector3[] = [];
        const circleSteps = 64;
        for (let i = 0; i <= circleSteps; i++) {
          const theta = (i / circleSteps) * Math.PI * 2;
          circlePoints.push(new THREE.Vector3(
            -8 + circleRadius * Math.cos(theta),
            0,
            circleRadius * Math.sin(theta)
          ));
        }
        const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
        const circleMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });
        const circleA = new THREE.Line(circleGeo, circleMat);
        setACircle.add(circleA);
        ts.group.add(setACircle);

        // Set B visualization (right circle)
        const setBCircle = new THREE.Group();
        const circlePointsB: THREE.Vector3[] = [];
        for (let i = 0; i <= circleSteps; i++) {
          const theta = (i / circleSteps) * Math.PI * 2;
          circlePointsB.push(new THREE.Vector3(
            8 - circleRadius * Math.cos(theta),
            0,
            circleRadius * Math.sin(theta)
          ));
        }
        const circleGeoB = new THREE.BufferGeometry().setFromPoints(circlePointsB);
        const circleMatB = new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 });
        const circleB = new THREE.Line(circleGeoB, circleMatB);
        setBCircle.add(circleB);
        ts.group.add(setBCircle);

        // Overlapping region visualization
        const overlapGroup = new THREE.Group();
        if (overlap > 0) {
          const overlapPoints: THREE.Vector3[] = [];
          const overlapAngle = Math.acos((16 - overlap * 0.8) / (2 * circleRadius)) * 2;
          for (let i = 0; i <= circleSteps; i++) {
            const theta = (i / circleSteps) * overlapAngle - overlapAngle / 2;
            overlapPoints.push(new THREE.Vector3(
              -8 + circleRadius * Math.cos(theta),
              0,
              circleRadius * Math.sin(theta)
            ));
          }
          const overlapGeo = new THREE.BufferGeometry().setFromPoints(overlapPoints);
          const overlapMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.7 });
          const overlapLine = new THREE.Line(overlapGeo, overlapMat);
          overlapGroup.add(overlapLine);
        }
        ts.group.add(overlapGroup);

        // Elements in sets as spheres
        const elements: THREE.Mesh[] = [];
        if (showSets) {
          // Set A elements
          for (let i = 0; i < setA.length; i++) {
            const angle = (i / setA.length) * Math.PI * 2;
            const distance = 2.5;
            const elementGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const elementMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.5 });
            const element = new THREE.Mesh(elementGeo, elementMat);
            element.position.set(
              -8 + distance * Math.cos(angle),
              0.5,
              distance * Math.sin(angle)
            );
            element.castShadow = true;
            ts.group.add(element);
            elements.push(element);
          }

          // Set B elements
          for (let i = 0; i < setB.length; i++) {
            const angle = (i / setB.length) * Math.PI * 2;
            const distance = 2.5;
            const elementGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const elementMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
            const element = new THREE.Mesh(elementGeo, elementMat);
            element.position.set(
              8 - distance * Math.cos(angle),
              0.5,
              distance * Math.sin(angle)
            );
            element.castShadow = true;
            ts.group.add(element);
            elements.push(element);
          }
        }

        // Function visualization
        if (showFunctions) {
          const funcGroup = new THREE.Group();
          const points: THREE.Vector3[] = [];
          const steps = 200;
          const scale = 2;

          for (let i = 0; i <= steps; i++) {
            const x = (i / steps - 0.5) * 15;
            let y = 0;
            const xVal = x / scale;

            switch (functionType) {
              case "linear":
                y = xVal * 2;
                break;
              case "quadratic":
                y = xVal * xVal;
                break;
              case "cubic":
                y = xVal * xVal * xVal * 0.5;
                break;
              case "trigonometric":
                y = Math.sin(xVal * 2) * 2;
                break;
            }

            points.push(new THREE.Vector3(x, y * scale, -10));
          }

          const funcGeo = new THREE.BufferGeometry().setFromPoints(points);
          const funcMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 3 });
          const funcLine = new THREE.Line(funcGeo, funcMat);
          funcGroup.add(funcLine);
          ts.group.add(funcGroup);

          // Axes for function
          const xAxisGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-8, 0, -10),
            new THREE.Vector3(8, 0, -10)
          ]);
          const xAxis = new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({ color: 0x6366f1 }));
          funcGroup.add(xAxis);

          const yAxisGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, -3, -10),
            new THREE.Vector3(0, 5, -10)
          ]);
          const yAxis = new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({ color: 0x6366f1 }));
          funcGroup.add(yAxis);
        }

        // Labels
        const labelAGeo = new THREE.PlaneGeometry(1, 0.3);
        const labelAMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true });
        const labelA = new THREE.Mesh(labelAGeo, labelAMat);
        labelA.position.set(-10, 0, 0);
        ts.group.add(labelA);

        const labelBGeo = new THREE.PlaneGeometry(1, 0.3);
        const labelBMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true });
        const labelB = new THREE.Mesh(labelBGeo, labelBMat);
        labelB.position.set(10, 0, 0);
        ts.group.add(labelB);

        let startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed;

          // Rotate circles
          setACircle.rotation.y = time * 0.1;
          setBCircle.rotation.y = time * 0.1;

          // Animate elements
          elements.forEach((element, index) => {
            element.position.y = 0.5 + Math.sin(time + index * 0.3) * 0.2;
            element.rotation.y += 0.02;
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
  }, [numElementsA, numElementsB, overlap, functionType, showSets, showFunctions, setA, setB, unionAB, intersectionAB, differenceAB]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Sets and Functions</CardTitle>
        <CardDescription>
          Interactive 3D visualization of set theory and function concepts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Set A Elements (n(A))</Label>
              <Slider min={1} max={10} step={1} value={[numElementsA]} onValueChange={(v) => setNumElementsA(v[0])} />
              <p className="text-sm text-gray-500">Current: {numElementsA}</p>
            </div>
            <div>
              <Label>Set B Elements (n(B))</Label>
              <Slider min={1} max={10} step={1} value={[numElementsB]} onValueChange={(v) => setNumElementsB(v[0])} />
              <p className="text-sm text-gray-500">Current: {numElementsB}</p>
            </div>
            <div>
              <Label>Overlap Elements</Label>
              <Slider min={0} max={Math.min(numElementsA, numElementsB)} step={1} value={[overlap]} onValueChange={(v) => setOverlap(v[0])} />
              <p className="text-sm text-gray-500">Current: {overlap}</p>
            </div>
            <div>
              <Label>Function Type</Label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setFunctionType("linear")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${functionType === 'linear' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setFunctionType("quadratic")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${functionType === 'quadratic' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Quadratic
                </button>
                <button
                  onClick={() => setFunctionType("cubic")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${functionType === 'cubic' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Cubic
                </button>
                <button
                  onClick={() => setFunctionType("trigonometric")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${functionType === 'trigonometric' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Trigonometric
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSets(!showSets)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showSets ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Sets: {showSets ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowFunctions(!showFunctions)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showFunctions ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Functions: {showFunctions ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Set Theory Calculations:</span></p>
              <p><strong>A:</strong> {JSON.stringify(setA)}</p>
              <p><strong>B:</strong> {JSON.stringify(setB)}</p>
              <p><strong>|A ∪ B|:</strong> {unionAB} (Union)</p>
              <p><strong>|A ∩ B|:</strong> {intersectionAB} (Intersection)</p>
              <p><strong>|A - B|:</strong> {differenceAB} (Difference)</p>
              <p><strong>|A × B|:</strong> {numElementsA * numElementsB} (Cartesian Product)</p>
            </div>

            <div>
              <h3 className="font-semibold">Set Theory (Class 11)</h3>
              <p className="text-sm mt-2">
                A set is a well-defined collection of distinct objects, considered as an object in its own right.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Empty Set:</strong> ∅ or {} - A set with no elements</p>
                <p><strong>Singleton Set:</strong> A set with exactly one element</p>
                <p><strong>Finite Set:</strong> A set with finite number of elements</p>
                <p><strong>Infinite Set:</strong> A set with infinite number of elements</p>
                <p><strong>Subset:</strong> A ⊆ B if every element of A is also an element of B</p>
                <p><strong>Proper Subset:</strong> A ⊂ B if A ⊆ B and A ≠ B</p>
                <p><strong>Power Set:</strong> P(A) = {all subsets of A}</p>
                <p><strong>Universal Set:</strong> The set containing all objects under consideration</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Set Operations</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Union:</strong> A ∪ B = {x | x ∈ A or x ∈ B}</li>
                <li><strong>Intersection:</strong> A ∩ B = {x | x ∈ A and x ∈ B}</li>
                <li><strong>Difference:</strong> A - B = {x | x ∈ A and x ∉ B}</li>
                <li><strong>Symmetric Difference:</strong> A Δ B = (A - B) ∪ (B - A)</li>
                <li><strong>Complement:</strong> A' = {x | x ∉ A and x ∈ Universal Set}</li>
                <li><strong>Cartesian Product:</strong> A × B = {(a, b) | a ∈ A and b ∈ B}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Set Identities</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Commutative:</strong> A ∪ B = B ∪ A, A ∩ B = B ∩ A</li>
                <li><strong>Associative:</strong> (A ∪ B) ∪ C = A ∪ (B ∪ C)</li>
                <li><strong>Distributive:</strong> A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</li>
                <li><strong>De Morgan's:</strong> (A ∪ B)' = A' ∩ B', (A ∩ B)' = A' ∪ B'</li>
                <li><strong>Idempotent:</strong> A ∪ A = A, A ∩ A = A</li>
                <li><strong>Identity:</strong> A ∪ ∅ = A, A ∩ U = A</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Functions (Class 11)</h3>
              <p className="text-sm mt-2">
                A function is a relation from a set of inputs (domain) to a set of permissible outputs (codomain).
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Linear Function:</strong> f(x) = mx + b (Graph is a straight line)</p>
                <p><strong>Quadratic Function:</strong> f(x) = ax² + bx + c (Parabola)</p>
                <p><strong>Cubic Function:</strong> f(x) = ax³ + bx² + cx + d</p>
                <p><strong>Trigonometric Functions:</strong> sin(x), cos(x), tan(x)</p>
              </div>
              <p className="text-sm mt-2 font-medium">Types of Functions:</p>
              <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
                <li>Injective (One-to-One): Different inputs give different outputs</li>
                <li>Surjective (Onto): Every element in codomain is mapped to</li>
                <li>Bijective: Both injective and surjective</li>
                <li>Polynomial: f(x) = a_nxⁿ + ... + a₁x + a₀</li>
                <li>Rational: Ratio of two polynomials</li>
                <li>Exponential: f(x) = aˣ</li>
                <li>Logarithmic: f(x) = logₐ(x)</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>Set A</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-green-500"></div><span>Set B</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-500"></div><span>Overlap</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span>Elements of A</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span>Elements of B</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-blue-500"></div><span>Function Graph</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11SetsFunctions;

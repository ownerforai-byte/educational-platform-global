"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

type Shape = {
  name: string;
  description: string;
  create: (scene: any) => { meshes: THREE.Mesh[]; labels: { position: THREE.Vector3; text: string; color: string }[] };
};

const SHAPES: Shape[] = [
  {
    name: "Cube",
    description: "Regular hexahedron with 6 square faces, 12 edges, 8 vertices",
    create: (scene) => {
      const size = 3;
      const geo = new THREE.BoxGeometry(size, size, size);
      const mat = standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = size/2;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, size + 0.5, 0), text: "Cube", color: "#3b82f6" },
          { position: new THREE.Vector3(0, size/2, size/2 + 0.5), text: "Face", color: "#3b82f6" },
          { position: new THREE.Vector3(size/2 + 0.5, size/2, size/2 + 0.5), text: "Edge", color: "#ffffff" }
        ]
      };
    }
  },
  {
    name: "Cuboid",
    description: "Rectangular prism with 6 rectangular faces",
    create: (scene) => {
      const geo = new THREE.BoxGeometry(4, 2, 3);
      const mat = standardMaterial(0xa855f7, { emissive: 0xa855f7, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 1;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, 2.5, 0), text: "Cuboid", color: "#a855f7" },
          { position: new THREE.Vector3(0, 1, 0), text: "l×b×h", color: "#a855f7" }
        ]
      };
    }
  },
  {
    name: "Sphere",
    description: "Perfectly symmetrical 3D shape, all points equidistant from center",
    create: (scene) => {
      const radius = 2.5;
      const geo = new THREE.SphereGeometry(radius, 32, 32);
      const mat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = radius;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, radius * 2 + 0.3, 0), text: "Sphere", color: "#ef4444" },
          { position: new THREE.Vector3(0, radius + 0.3, radius + 0.5), text: "Surface", color: "#ef4444" },
          { position: new THREE.Vector3(0, 0, 0), text: "Center", color: "#ef4444" }
        ]
      };
    }
  },
  {
    name: "Cylinder",
    description: "Circular base with parallel sides, has 2 circular faces and 1 curved surface",
    create: (scene) => {
      const radius = 2;
      const height = 4;
      const geo = new THREE.CylinderGeometry(radius, radius, height, 32);
      const mat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = height/2;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, height + 0.5, 0), text: "Cylinder", color: "#22c55e" },
          { position: new THREE.Vector3(radius + 0.5, height/2, 0), text: "Radius", color: "#22c55e" },
          { position: new THREE.Vector3(0, height/2, radius + 0.5), text: "Curved Surface", color: "#22c55e" }
        ]
      };
    }
  },
  {
    name: "Cone",
    description: "Pointed shape with circular base tapering to apex",
    create: (scene) => {
      const radius = 2;
      const height = 4;
      const geo = new THREE.ConeGeometry(radius, height, 32);
      const mat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = height/2;
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(height/2 + 0.5, 0, 0), text: "Cone", color: "#fbbf24" },
          { position: new THREE.Vector3(0, 0, radius + 0.5), text: "Base", color: "#fbbf24" },
          { position: new THREE.Vector3(height + 0.5, 0, 0), text: "Apex", color: "#fbbf24" },
          { position: new THREE.Vector3(height/4 + 0.5, 0, radius/2), text: "Slant Height", color: "#fbbf24" }
        ]
      };
    }
  },
  {
    name: "Pyramid",
    description: "Polygonal base with triangular faces meeting at apex",
    create: (scene) => {
      const geo = new THREE.ConeGeometry(2, 4, 4);
      const mat = standardMaterial(0x6366f1, { emissive: 0x6366f1, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 2;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, 4.5, 0), text: "Square Pyramid", color: "#6366f1" },
          { position: new THREE.Vector3(0, 0, 1.5), text: "Base (Square)", color: "#6366f1" },
          { position: new THREE.Vector3(0, 4, 0), text: "Apex", color: "#6366f1" },
          { position: new THREE.Vector3(1.5, 2, 1), text: "Triangular Face", color: "#6366f1" }
        ]
      };
    }
  },
  {
    name: "Torus",
    description: "Doughnut-shaped surface of revolution",
    create: (scene) => {
      const radius = 2;
      const tube = 0.6;
      const geo = new THREE.TorusGeometry(radius, tube, 16, 48);
      const mat = standardMaterial(0xec4899, { emissive: 0xec4899, emissiveIntensity: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = radius;
      scene.add(mesh);
      return {
        meshes: [mesh],
        labels: [
          { position: new THREE.Vector3(0, radius * 2 + 0.3, 0), text: "Torus", color: "#ec4899" },
          { position: new THREE.Vector3(radius + tube + 0.5, radius, 0), text: "Major Radius", color: "#ec4899" },
          { position: new THREE.Vector3(0, radius, radius + tube + 0.5), text: "Minor Radius", color: "#ec4899" }
        ]
      };
    }
  }
];

export const Math3DGeometryLabeled: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [showLabels, setShowLabels] = useState(true);
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
          cameraPosition: new THREE.Vector3(0, 5, 12),
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

        // Shape group
        const shapeGroup = new THREE.Group();
        ts.group.add(shapeGroup);

        // LABELS
        let labelRenderer: any = null;
        let shapeLabels: any[] = [];

        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current.appendChild(labelRenderer.domElement);
        } catch (e) { console.log("CSS2DRenderer not available"); }

        function createShape() {
          // Clear previous shape
          while (shapeGroup.children.length > 0) {
            const child = shapeGroup.children[0];
            shapeGroup.remove(child);
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }

          // Clear previous labels
          shapeLabels.forEach(label => {
            if (label && label.parent) {
              (label.parent as any).remove(label);
            }
          });
          shapeLabels = [];

          // Create new shape
          const result = selectedShape.create(ts.group);
          result.meshes.forEach(m => shapeGroup.add(m));

          // Add labels
          if (showLabels && labelRenderer) {
            result.labels.forEach(labelInfo => {
              const label = new CSS2DObject(document.createElement("div"));
              label.element.className = "label";
              label.element.innerHTML = `<div style="background:rgba(0,0,0,0.75);padding:4px 8px;border-radius:4px;color:${labelInfo.color};font-weight:600;font-size:11px">${labelInfo.text}</div>`;
              label.position.set(labelInfo.position.x, labelInfo.position.y, labelInfo.position.z);
              shapeGroup.add(label);
              shapeLabels.push(label);
            });
          }
        }

        createShape();

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
  }, [selectedShape, showLabels, autoRotate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Geometry Shapes with Labels</CardTitle>
        <CardDescription>
          Interactive 3D geometric shapes with clearly labelled parts. Explore faces, edges, vertices, and properties.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select value={selectedShape.name} onValueChange={(v) => setSelectedShape(SHAPES.find(s => s.name === v) || SHAPES[0])}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHAPES.map(shape => (
                  <SelectItem key={shape.name} value={shape.name}>
                    {shape.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">{selectedShape.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>
              {showLabels ? 'Hide' : 'Show'} Labels
            </Button>
            <Button variant={autoRotate ? "default" : "outline"} size="sm" onClick={() => setAutoRotate(!autoRotate)}>
              {autoRotate ? 'Stop' : 'Rotate'} Auto-Rotate
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">SHAPE PROPERTIES:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {selectedShape.name === "Cube" && (
              <>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">6</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">12</span></div>
                <div className="flex justify-between"><span>Vertices:</span><span className="font-mono">8</span></div>
                <div className="flex justify-between"><span>Face Shape:</span><span className="font-mono">Square</span></div>
              </>
            )}
            {selectedShape.name === "Cuboid" && (
              <>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">6</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">12</span></div>
                <div className="flex justify-between"><span>Vertices:</span><span className="font-mono">8</span></div>
                <div className="flex justify-between"><span>Face Shape:</span><span className="font-mono">Rectangle</span></div>
              </>
            )}
            {selectedShape.name === "Sphere" && (
              <>
                <div className="flex justify-between"><span>Surface Area:</span><span className="font-mono">4πr²</span></div>
                <div className="flex justify-between"><span>Volume:</span><span className="font-mono">(4/3)πr³</span></div>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">∞</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">0</span></div>
              </>
            )}
            {selectedShape.name === "Cylinder" && (
              <>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">3</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">2</span></div>
                <div className="flex justify-between"><span>Vertices:</span><span className="font-mono">0</span></div>
                <div className="flex justify-between"><span>Lateral Area:</span><span className="font-mono">2πrh</span></div>
              </>
            )}
            {selectedShape.name === "Cone" && (
              <>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">2</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">1</span></div>
                <div className="flex justify-between"><span>Vertices:</span><span className="font-mono">1 (Apex)</span></div>
                <div className="flex justify-between"><span>Volume:</span><span className="font-mono">(1/3)πr²h</span></div>
              </>
            )}
            {selectedShape.name === "Pyramid" && (
              <>
                <div className="flex justify-between"><span>Base:</span><span className="font-mono">Square</span></div>
                <div className="flex justify-between"><span>Faces:</span><span className="font-mono">5</span></div>
                <div className="flex justify-between"><span>Edges:</span><span className="font-mono">8</span></div>
                <div className="flex justify-between"><span>Vertices:</span><span className="font-mono">5</span></div>
              </>
            )}
            {selectedShape.name === "Torus" && (
              <>
                <div className="flex justify-between"><span>Type:</span><span className="font-mono">Ring</span></div>
                <div className="flex justify-between"><span>Surface:</span><span className="font-mono">Revolution</span></div>
                <div className="flex justify-between"><span>Hole:</span><span className="font-mono">Yes</span></div>
                <div className="flex justify-between"><span>Genus:</span><span className="font-mono">1</span></div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">LABELLED PARTS:</h4>
          <div className="flex flex-wrap gap-3">
            {selectedShape.name === "Cube" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500" /><span className="text-sm">Cube Body</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border" /><span className="text-sm">Face</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-white" /><span className="text-sm">Edge</span></div>
              </>
            )}
            {selectedShape.name === "Cuboid" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-500" /><span className="text-sm">Cuboid Body</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border" /><span className="text-sm">Rectangle Face</span></div>
              </>
            )}
            {selectedShape.name === "Sphere" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded-full" /><span className="text-sm">Sphere Surface</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full" /><span className="text-sm">Center Point</span></div>
              </>
            )}
            {selectedShape.name === "Cylinder" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500" /><span className="text-sm">Cylinder Body</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border" /><span className="text-sm">Circular Base</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-white" /><span className="text-sm">Curved Surface</span></div>
              </>
            )}
            {selectedShape.name === "Cone" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500" /><span className="text-sm">Cone Body</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border" /><span className="text-sm">Circular Base</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500" /><span className="text-sm">Apex Point</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-white" /><span className="text-sm">Slant Height</span></div>
              </>
            )}
            {selectedShape.name === "Pyramid" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-500" /><span className="text-sm">Pyramid Body</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border" /><span className="text-sm">Square Base</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500" /><span className="text-sm">Apex Point</span></div>
                <div className="flex items-center gap-2"><div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-indigo-500" /><span className="text-sm">Triangular Face</span></div>
              </>
            )}
            {selectedShape.name === "Torus" && (
              <>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-pink-500" /><span className="text-sm">Torus Body</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-pink-500" /><span className="text-sm">Major Radius</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-pink-500" /><span className="text-sm">Minor Radius</span></div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Interactive Controls:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Left-click + drag:</strong> Rotate the shape</li>
            <li><strong>Right-click + drag:</strong> Pan the view</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
            <li><strong>Auto-rotate:</strong> Toggle continuous rotation</li>
            <li><strong>Show/Hide Labels:</strong> Toggle component labels</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Math3DGeometryLabeled;

"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3 w-full">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Concept & Why It Matters</p>
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

function Molecule3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [molecule, setMolecule] = useState("h2o");
  const sceneRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 40, 90);

        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 5, 5);

        if (!isWebGLAvailable()) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
        dirLight2.position.set(-10, -5, -10);
        scene.add(dirLight2);

        const group = new THREE.Group();
        scene.add(group);

        const atoms: Record<string, { color: number; radius: number; position: [number, number, number] }> = {
          h: { color: 0xffffff, radius: 0.3, position: [0, 0, 0] },
          o: { color: 0xef4444, radius: 0.5, position: [0, 0, 0] },
          c: { color: 0x64748b, radius: 0.45, position: [0, 0, 0] },
          n: { color: 0x3b82f6, radius: 0.45, position: [0, 0, 0] },
        };

        const renderMolecule = (type: string) => {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
              child.geometry?.dispose();
              (child.material as THREE.Material)?.dispose();
            }
          }

          if (type === "h2o") {
            const oGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const oMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
            const o = new THREE.Mesh(oGeo, oMat);
            o.position.set(0, 0, 0);
            o.castShadow = true;
            group.add(o);

            const hGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const hMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
            
            const h1 = new THREE.Mesh(hGeo, hMat);
            h1.position.set(0.7, 0.5, 0);
            h1.castShadow = true;
            group.add(h1);

            const h2 = new THREE.Mesh(hGeo, hMat);
            h2.position.set(-0.7, 0.5, 0);
            h2.castShadow = true;
            group.add(h2);

            const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
            const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
            
            const bond1 = new THREE.Mesh(bondGeo, bondMat);
            bond1.position.set(0.35, 0.25, 0);
            bond1.rotation.z = Math.PI / 4;
            group.add(bond1);

            const bond2 = new THREE.Mesh(bondGeo, bondMat);
            bond2.position.set(-0.35, 0.25, 0);
            bond2.rotation.z = -Math.PI / 4;
            group.add(bond2);
          } else if (type === "co2") {
            const cGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const cMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.3 });
            const c = new THREE.Mesh(cGeo, cMat);
            c.position.set(0, 0, 0);
            c.castShadow = true;
            group.add(c);

            const oGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const oMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
            
            const o1 = new THREE.Mesh(oGeo, oMat);
            o1.position.set(1.2, 0, 0);
            o1.castShadow = true;
            group.add(o1);

            const o2 = new THREE.Mesh(oGeo, oMat);
            o2.position.set(-1.2, 0, 0);
            o2.castShadow = true;
            group.add(o2);

            const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
            const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8);
            
            const bond1 = new THREE.Mesh(bondGeo, bondMat);
            bond1.position.set(0.6, 0.1, 0);
            group.add(bond1);

            const bond2 = new THREE.Mesh(bondGeo, bondMat);
            bond2.position.set(0.6, -0.1, 0);
            group.add(bond2);

            const bond3 = new THREE.Mesh(bondGeo, bondMat);
            bond3.position.set(-0.6, 0.1, 0);
            group.add(bond3);

            const bond4 = new THREE.Mesh(bondGeo, bondMat);
            bond4.position.set(-0.6, -0.1, 0);
            group.add(bond4);
          } else if (type === "ch4") {
            const cGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const cMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.3 });
            const c = new THREE.Mesh(cGeo, cMat);
            c.position.set(0, 0, 0);
            c.castShadow = true;
            group.add(c);

            const hGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const hMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
            
            const positions = [
              [0.8, 0.8, 0.8],
              [0.8, -0.8, -0.8],
              [-0.8, 0.8, -0.8],
              [-0.8, -0.8, 0.8]
            ];

            positions.forEach(pos => {
              const h = new THREE.Mesh(hGeo, hMat);
              h.position.set(pos[0], pos[1], pos[2]);
              h.castShadow = true;
              group.add(h);

              const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
              const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8);
              const bond = new THREE.Mesh(bondGeo, bondMat);
              bond.position.set(pos[0] / 2, pos[1] / 2, pos[2] / 2);
              bond.lookAt(new THREE.Vector3(pos[0], pos[1], pos[2]));
              bond.rotateX(Math.PI / 2);
              group.add(bond);
            });
          }
        };

        renderMolecule(molecule);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const resizeObserver = new ResizeObserver(() => {
          if (!container || cancelled) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        sceneRef.current = {
          dispose: () => {
            cancelled = true;
            resizeObserver.disconnect();
            renderer.dispose();
            if (container && renderer.domElement.parentNode === container) {
              container.removeChild(renderer.domElement);
            }
          }
        };

        return () => {
          cancelled = true;
          resizeObserver.disconnect();
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        // 3D not available
      }
    }

    const cleanup = load();
    return () => {
      cancelled = true;
      cleanup.then((fn) => fn?.());
    };
  }, [molecule]);

  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  const moleculeLabels: Record<string, string> = {
    h2o: "Water (H₂O)",
    co2: "Carbon Dioxide (CO₂)",
    ch4: "Methane (CH₄)",
  };

  return (
    <div className="space-y-3 w-full">
      <div 
        ref={containerRef} 
        className="lab-3d-container w-full rounded-md border border-border" 
        aria-label="Interactive 3D molecule visualization"
        style={{ height: 'clamp(300px, 50vh, 600px)' }}
      />
      <CollapsibleControls label="Molecule Options">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <Label>Molecule:</Label>
          <Select value={molecule} onValueChange={setMolecule}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select molecule" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(moleculeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <MeaningPanel
        title="Molecular Geometry (Class 11)"
        meaning="Molecules have specific 3D shapes determined by electron pair repulsion. These shapes affect chemical properties and reactivity."
        points={[
          "H₂O: Bent shape (104.5°)",
          "CO₂: Linear shape (180°)",
          "CH₄: Tetrahedral shape (109.5°)",
          "VSEPR theory predicts molecular geometry",
          "Shape determines polarity and reactivity",
        ]}
      />
    </div>
  );
}

function PeriodicTable3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 40, 90);

        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(12, 8, 12);

        if (!isWebGLAvailable()) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const group = new THREE.Group();
        scene.add(group);

        const elements = [
          { symbol: "H", x: 0, z: 0, color: 0x60a5fa },
          { symbol: "He", x: 7, z: 0, color: 0xfbbf24 },
          { symbol: "Li", x: 0, z: 1, color: 0xf87171 },
          { symbol: "Be", x: 1, z: 1, color: 0x34d399 },
          { symbol: "B", x: 2, z: 1, color: 0xa78bfa },
          { symbol: "C", x: 3, z: 1, color: 0x64748b },
          { symbol: "N", x: 4, z: 1, color: 0x3b82f6 },
          { symbol: "O", x: 5, z: 1, color: 0xef4444 },
          { symbol: "F", x: 6, z: 1, color: 0x22c55e },
          { symbol: "Ne", x: 7, z: 1, color: 0xfbbf24 },
          { symbol: "Na", x: 0, z: 2, color: 0xf87171 },
          { symbol: "Mg", x: 1, z: 2, color: 0x34d399 },
          { symbol: "Al", x: 2, z: 2, color: 0xa78bfa },
          { symbol: "Si", x: 3, z: 2, color: 0x64748b },
          { symbol: "P", x: 4, z: 2, color: 0xfbbf24 },
          { symbol: "S", x: 5, z: 2, color: 0xeab308 },
          { symbol: "Cl", x: 6, z: 2, color: 0x22c55e },
          { symbol: "Ar", x: 7, z: 2, color: 0xfbbf24 },
        ];

        elements.forEach(el => {
          const boxGeo = new THREE.BoxGeometry(0.8, 0.8, 0.2);
          const boxMat = new THREE.MeshStandardMaterial({ 
            color: el.color,
            roughness: 0.4,
            metalness: 0.2
          });
          const box = new THREE.Mesh(boxGeo, boxMat);
          box.position.set(el.x * 1.2 - 4.2, 0, el.z * 1.2 - 2.4);
          box.castShadow = true;
          box.receiveShadow = true;
          group.add(box);

          const canvas = document.createElement("canvas");
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 32px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(el.symbol, 32, 32);
          }
          const tex = new THREE.CanvasTexture(canvas);
          const labelGeo = new THREE.PlaneGeometry(0.6, 0.6);
          const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
          const label = new THREE.Mesh(labelGeo, labelMat);
          label.position.copy(box.position);
          label.position.z += 0.11;
          group.add(label);
        });

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const resizeObserver = new ResizeObserver(() => {
          if (!container || cancelled) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        sceneRef.current = {
          dispose: () => {
            cancelled = true;
            resizeObserver.disconnect();
            renderer.dispose();
            if (container && renderer.domElement.parentNode === container) {
              container.removeChild(renderer.domElement);
            }
          }
        };

        return () => {
          cancelled = true;
          resizeObserver.disconnect();
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        // 3D not available
      }
    }

    const cleanup = load();
    return () => {
      cancelled = true;
      cleanup.then((fn) => fn?.());
    };
  }, []);

  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  return (
    <div className="space-y-3 w-full">
      <div 
        ref={containerRef} 
        className="lab-3d-container w-full rounded-md border border-border" 
        aria-label="Interactive 3D periodic table"
        style={{ height: 'clamp(300px, 50vh, 600px)' }}
      />
      <MeaningPanel
        title="Periodic Table (Class 11)"
        meaning="Elements are arranged by atomic number. Properties repeat periodically, creating groups and periods with similar characteristics."
        points={[
          "Groups: Vertical columns with similar properties",
          "Periods: Horizontal rows showing electron shells",
          "Metals on left, nonmetals on right",
          "Atomic number increases left to right",
          "Reactivity follows periodic trends",
        ]}
      />
    </div>
  );
}

export function Chemistry3D() {
  const [tab, setTab] = useState("molecule");

  return (
    <div className="space-y-4 w-full">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex-wrap w-full">
          <TabsTrigger value="molecule" className="flex-1 min-w-[120px]">Molecular Models</TabsTrigger>
          <TabsTrigger value="periodic" className="flex-1 min-w-[120px]">Periodic Table</TabsTrigger>
        </TabsList>

        <TabsContent value="molecule" className="mt-4">
          <Molecule3D />
        </TabsContent>

        <TabsContent value="periodic" className="mt-4">
          <PeriodicTable3D />
        </TabsContent>
      </Tabs>
    </div>
  );
}

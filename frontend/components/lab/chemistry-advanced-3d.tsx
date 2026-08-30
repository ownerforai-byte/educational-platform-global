"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function MolecularOrbitalViewer() {
  const [orbitalType, setOrbitalType] = useState<"s" | "p" | "d">("p");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const getOrbitalPoints = (type: string): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const count = type === "s" ? 2000 : type === "p" ? 3000 : 4000;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      let r: number;
      if (type === "s") {
        r = 2 + Math.random() * 1.5;
      } else if (type === "p") {
        const pTheta = Math.random() * Math.PI;
        r = 2 + Math.abs(Math.cos(pTheta)) * 1.5 + Math.random() * 0.3;
        points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
        continue;
      } else {
        const dTheta = Math.random() * Math.PI * 2;
        const dPhi = Math.acos(2 * Math.random() - 1);
        const shape = Math.sin(2 * dTheta) * Math.cos(dPhi);
        r = 2 + Math.abs(shape) * 1.5 + Math.random() * 0.3;
        points.push(new THREE.Vector3(r * Math.sin(dPhi) * Math.cos(dTheta), r * Math.sin(dPhi) * Math.sin(dTheta), r * Math.cos(dPhi)));
        continue;
      }
      points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
    }
    return points;
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        if (!isWebGLAvailable()) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 4, 6);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);

        const group = new THREE.Group();
        scene.add(group);

        function rebuild() {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Points || child instanceof THREE.Mesh) { child.geometry.dispose(); (child.material as THREE.Material).dispose(); }
          }

          const points = getOrbitalPoints(orbitalType);
          const geo = new THREE.BufferGeometry().setFromPoints(points);
          const mat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.08, sizeAttenuation: true });
          const pts = new THREE.Points(geo, mat);
          group.add(pts);

          const nucleusGeo = new THREE.SphereGeometry(0.3, 16, 16);
          const nucleusMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.3 });
          const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
          group.add(nucleus);

          if (orbitalType === "p") {
            const axisGeo = new THREE.CylinderGeometry(0.02, 0.02, 6, 8);
            const axisMat = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.3 });
            const axisX = new THREE.Mesh(axisGeo, axisMat);
            axisX.rotation.z = Math.PI / 2;
            group.add(axisX);
            const axisY = new THREE.Mesh(axisGeo, axisMat);
            group.add(axisY);
            const axisZ = new THREE.Mesh(axisGeo, axisMat);
            axisZ.rotation.x = Math.PI / 2;
            group.add(axisZ);
          }
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [orbitalType]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Molecular Orbitals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Orbital Options">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Orbital:</Label>
            <Select value={orbitalType} onValueChange={(v) => setOrbitalType(v as "s" | "p" | "d")}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="s">s Orbital</SelectItem>
                <SelectItem value="p">p Orbital</SelectItem>
                <SelectItem value="d">d Orbital</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleControls>
        {error ? <WebGLFallback /> : <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D molecular orbitals" />}
        <p className="text-xs text-muted-foreground">Electron cloud probability distribution. Cyan dots = electron positions. Red sphere = nucleus. Drag to rotate.</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Cyan dots form cloud shapes around a red nucleus. s orbital is spherical; p has two lobes; d has four lobes.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Orbitals are probability clouds, not fixed paths. s orbitals are spherically symmetric. p orbitals are directional (x, y, z). d orbitals have complex shapes.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Orbital shapes determine chemical bonding geometry, molecular polarity, and spectral lines. This is the basis of quantum chemistry and spectroscopy.</p>
        </div>
</CardContent>
    </Card>
  );
}

function CrystalStructureViewer() {
  const [structure, setStructure] = useState<"sc" | "fcc" | "bcc">("fcc");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const getAtomPositions = (type: string): THREE.Vector3[] => {
    const positions: THREE.Vector3[] = [];
    const size = 3;
    if (type === "sc") {
      for (let x = -size; x <= size; x++) {
        for (let y = -size; y <= size; y++) {
          for (let z = -size; z <= size; z++) {
            positions.push(new THREE.Vector3(x, y, z));
          }
        }
      }
    } else if (type === "fcc") {
      for (let x = -size; x <= size; x++) {
        for (let y = -size; y <= size; y++) {
          for (let z = -size; z <= size; z++) {
            positions.push(new THREE.Vector3(x, y, z));
            positions.push(new THREE.Vector3(x + 0.5, y + 0.5, z));
            positions.push(new THREE.Vector3(x + 0.5, y, z + 0.5));
            positions.push(new THREE.Vector3(x, y + 0.5, z + 0.5));
          }
        }
      }
    } else {
      for (let x = -size; x <= size; x++) {
        for (let y = -size; y <= size; y++) {
          for (let z = -size; z <= size; z++) {
            positions.push(new THREE.Vector3(x, y, z));
            positions.push(new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5));
          }
        }
      }
    }
    return positions;
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        if (!isWebGLAvailable()) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 6, 10);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);

        const group = new THREE.Group();
        scene.add(group);

        const atomGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const atomMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3, metalness: 0.3 });

        function rebuild() {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh) { child.geometry.dispose(); (child.material as THREE.Material).dispose(); }
          }
          const positions = getAtomPositions(structure);
          positions.forEach((pos) => {
            const atom = new THREE.Mesh(atomGeo, atomMat);
            atom.position.copy(pos);
            group.add(atom);
          });
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [structure]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Crystal Lattice Structures</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Structure Options">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Structure:</Label>
            <Select value={structure} onValueChange={(v) => setStructure(v as "sc" | "fcc" | "bcc")}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sc">Simple Cubic (SC)</SelectItem>
                <SelectItem value="fcc">Face-Centered Cubic (FCC)</SelectItem>
                <SelectItem value="bcc">Body-Centered Cubic (BCC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleControls>
        {error ? <WebGLFallback /> : <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D crystal lattice" />}
        <p className="text-xs text-muted-foreground">Green spheres = atoms. Simple Cubic: atoms at corners only. FCC: atoms at corners + face centers. BCC: atoms at corners + body center. Drag to rotate.</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Green spheres arrange in repeating 3D patterns. SC = corners only. FCC = corners + face centers. BCC = corners + body center.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Packing efficiency: SC 52%, BCC 68%, FCC 74%. More close-packed structures have higher density and stronger metallic bonding.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Crystal structure determines material properties: strength, conductivity, melting point, and corrosion resistance. FCC metals (Cu, Al, Au) are ductile; BCC (Fe, W) are harder.</p>
        </div>
</CardContent>
    </Card>
  );
}

export function ChemistryAdvanced3D() {
  return (
    <Tabs defaultValue="orbitals" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="orbitals">Molecular Orbitals</TabsTrigger>
        <TabsTrigger value="crystal">Crystal Lattices</TabsTrigger>
      </TabsList>
      <TabsContent value="orbitals" className="mt-4">
        <MolecularOrbitalViewer />
      </TabsContent>
      <TabsContent value="crystal" className="mt-4">
        <CrystalStructureViewer />
      </TabsContent>
    </Tabs>
  );
}

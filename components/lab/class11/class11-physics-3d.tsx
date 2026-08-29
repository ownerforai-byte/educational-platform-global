"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Slider from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const Class11Physics3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mass, setMass] = useState(1);
  const [springConstant, setSpringConstant] = useState(10);
  const [damping, setDamping] = useState(0);
  const [amplitude, setAmplitude] = useState(1);

  // Derived SHM quantities — angular frequency follows from k and m: ω = √(k/m)
  const omega = Math.sqrt(springConstant / mass);
  const period = (2 * Math.PI) / omega;
  // Motion model (viscous damping): x(t) = A·e^(−bt/(2m))·cos(ωt)

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
    camera.position.set(0, 0, 9);
    controls.update();

    // Track GPU resources so nothing leaks between rebuilds.
    const disposables: Array<{ dispose: () => void }> = [];

    // Ceiling anchor
    const anchorGeometry = new THREE.BoxGeometry(2.4, 0.15, 0.6);
    const anchorMaterial = new THREE.MeshStandardMaterial({ color: 0x334155 });
    disposables.push(anchorGeometry, anchorMaterial);
    const anchor = new THREE.Mesh(anchorGeometry, anchorMaterial);
    anchor.position.y = 2.2;
    scene.add(anchor);

    const ANCHOR_Y = 2.1;
    const REST_LENGTH = 2;

    // Objects — mass size scales with the mass value; spring hangs from the anchor.
    const massGeometry = new THREE.SphereGeometry(0.25 + Math.min(mass, 5) * 0.06, 32, 32);
    const massMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    disposables.push(massGeometry, massMaterial);
    const massObject = new THREE.Mesh(massGeometry, massMaterial);
    scene.add(massObject);

    const springGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
    const springMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    disposables.push(springGeometry, springMaterial);
    const springObject = new THREE.Mesh(springGeometry, springMaterial);
    scene.add(springObject);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation — damped SHM driven by the LIVE parameters: x(t) = A·e^(−bt/2m)·cos(ωt)
    let time = 0;
    let rafId = 0;
    let lastFrame = performance.now();
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Advance simulation time with real elapsed time so speed is frame-rate independent
      const now = performance.now();
      time += Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      const omegaLocal = Math.sqrt(springConstant / mass);
      const envelope = Math.exp((-damping * time) / (2 * mass));
      const displacement = amplitude * envelope * Math.cos(omegaLocal * time);

      // Mass hangs below the ceiling anchor; positive displacement stretches the spring downward
      const springLength = REST_LENGTH + displacement;
      massObject.position.y = ANCHOR_Y - springLength;

      // Stretch the spring mesh between anchor and mass
      springObject.scale.y = springLength;
      springObject.position.y = ANCHOR_Y - springLength / 2;

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
  }, [mass, springConstant, damping, amplitude]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Physics 3D: Simple Harmonic Motion</CardTitle>
        <CardDescription>
          Interactive 3D visualization of simple harmonic motion with adjustable parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Amplitude A (m)</Label>
              <Slider
                min={0.1}
                max={2}
                step={0.1}
                value={[amplitude]}
                onValueChange={(value: number[]) => setAmplitude(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {amplitude.toFixed(1)} m</p>
            </div>
            <div>
              <Label>Mass m (kg)</Label>
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={[mass]}
                onValueChange={(value: number[]) => setMass(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {mass.toFixed(1)} kg</p>
            </div>
            <div>
              <Label>Spring constant k (N/m)</Label>
              <Slider
                min={1}
                max={50}
                step={0.5}
                value={[springConstant]}
                onValueChange={(value: number[]) => setSpringConstant(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {springConstant.toFixed(1)} N/m</p>
            </div>
            <div>
              <Label>Damping coefficient b (N·s/m)</Label>
              <Slider
                min={0}
                max={2}
                step={0.05}
                value={[damping]}
                onValueChange={(value: number[]) => setDamping(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {damping.toFixed(2)} N·s/m {damping === 0 ? "(undamped)" : ""}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-1">
              <p><span className="font-semibold">Derived from m and k (live):</span></p>
              <p>ω = √(k/m) = √({springConstant.toFixed(1)}/{mass.toFixed(1)}) = {omega.toFixed(3)} rad/s</p>
              <p>T = 2π√(m/k) = {period.toFixed(3)} s</p>
              <p>f = 1/T = {(omega > 0 ? 1 / period : 0).toFixed(3)} Hz</p>
            </div>
            <div>
              <h3 className="font-semibold">Theory</h3>
              <p className="text-sm">
                Simple harmonic motion is a special type of periodic motion where the restoring force is directly proportional to the displacement and acts in the opposite direction.
              </p>
              <p className="text-sm mt-2">
                Equation: x(t) = A·e^(−bt/2m)·cos(ωt), with ω = √(k/m)
              </p>
              <p className="text-sm mt-2">
                Where:
                <ul className="list-disc pl-5 mt-1">
                  <li>A = Amplitude (maximum displacement)</li>
                  <li>k = Spring constant — a stiffer spring raises ω and shortens T</li>
                  <li>m = Mass — a heavier mass lowers ω and lengthens T</li>
                  <li>b = Damping coefficient — energy decays as e^(−bt/m); set b = 0 for ideal SHM</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Physics3D;

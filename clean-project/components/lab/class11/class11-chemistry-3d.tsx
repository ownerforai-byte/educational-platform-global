"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Slider from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const R_GAS = 0.0821; // L·atm·K⁻¹·mol⁻¹

export const Class11Chemistry3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(300);
  const [volume, setVolume] = useState(2);
  const [moles, setMoles] = useState(1);

  // Ideal Gas Law: with T, V and n chosen by the user, pressure is DERIVED — P = nRT/V.
  const derivedPressure = useMemo(
    () => (volume > 0 ? (moles * R_GAS * temperature) / volume : 0),
    [moles, temperature, volume]
  );
  // Particle count scales with amount of substance; speed scales with √T (Kinetic Theory).
  const particleCount = Math.min(200, Math.max(10, Math.round(moles * 40)));

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
    camera.position.set(0, 0, 7);
    controls.update();

    // Track GPU resources so nothing leaks between rebuilds.
    const disposables: Array<{ dispose: () => void }> = [];

    // Container box scaled by the volume slider (∛V keeps the box proportional to volume).
    const containerScale = Math.cbrt(Math.max(volume, 0.1)) * 1.6;
    const containerGeometry = new THREE.BoxGeometry(containerScale, containerScale, containerScale);
    const containerMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, transparent: true, opacity: 0.3 });
    disposables.push(containerGeometry, containerMaterial);
    const container = new THREE.Mesh(containerGeometry, containerMaterial);
    scene.add(container);

    const gasGeometry = new THREE.SphereGeometry(containerScale * 0.05, 16, 16);
    const gasMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    disposables.push(gasGeometry, gasMaterial);
    const gasParticles: THREE.Mesh[] = [];

    // Particle count derives from moles (not hardcoded)
    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(gasGeometry, gasMaterial);
      particle.position.set(
        Math.random() * containerScale - containerScale / 2,
        Math.random() * containerScale - containerScale / 2,
        Math.random() * containerScale - containerScale / 2
      );
      gasParticles.push(particle);
      scene.add(particle);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation — particle speed follows Kinetic Theory: v_rms ∝ √T
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const bound = containerScale / 2 - containerScale * 0.07;
      const speed = 0.02 + 0.06 * Math.sqrt(Math.max(temperature, 1) / 300);
      gasParticles.forEach(particle => {
        particle.position.x += (Math.random() - 0.5) * speed;
        particle.position.y += (Math.random() - 0.5) * speed;
        particle.position.z += (Math.random() - 0.5) * speed;

        // Keep particles within the (dynamic) container
        if (Math.abs(particle.position.x) > bound) particle.position.x *= -0.9;
        if (Math.abs(particle.position.y) > bound) particle.position.y *= -0.9;
        if (Math.abs(particle.position.z) > bound) particle.position.z *= -0.9;
      });

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
  }, [temperature, volume, moles, particleCount]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Chemistry 3D: Gas Laws Visualization</CardTitle>
        <CardDescription>
          Interactive 3D visualization of gas behavior according to the Ideal Gas Law.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Temperature T (K)</Label>
              <Slider
                min={50}
                max={600}
                step={1}
                value={[temperature]}
                onValueChange={(value: number[]) => setTemperature(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {temperature} K</p>
            </div>
            <div>
              <Label>Volume V (L)</Label>
              <Slider
                min={0.5}
                max={8}
                step={0.1}
                value={[volume]}
                onValueChange={(value: number[]) => setVolume(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {volume.toFixed(1)} L</p>
            </div>
            <div>
              <Label>Moles n (mol)</Label>
              <Slider
                min={0.25}
                max={5}
                step={0.25}
                value={[moles]}
                onValueChange={(value: number[]) => setMoles(value[0])}
              />
              <p className="text-sm text-gray-500">Current: {moles.toFixed(2)} mol → {particleCount} particles shown</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-1">
              <p><span className="font-semibold">Ideal Gas Law (live):</span></p>
              <p>P = nRT / V = ({moles.toFixed(2)} × {R_GAS} × {temperature}) / {volume.toFixed(1)}</p>
              <p className="font-semibold text-primary">P = {derivedPressure.toFixed(3)} atm</p>
              <p className="text-xs text-muted-foreground">Particle speed scales with √T (Kinetic Theory); container size scales with ∛V; particle count scales with n.</p>
            </div>
            <div>
              <h3 className="font-semibold">Theory</h3>
              <p className="text-sm">
                The Ideal Gas Law relates the state variables of an ideal gas: pressure (P), volume (V), temperature (T), and amount of substance (n).
              </p>
              <p className="text-sm mt-2">
                Equation: PV = nRT
              </p>
              <p className="text-sm mt-2">
                Where:
                <ul className="list-disc pl-5 mt-1">
                  <li>P = Pressure (atm) — computed from the other three state variables</li>
                  <li>V = Volume (L)</li>
                  <li>n = Number of moles</li>
                  <li>R = Ideal gas constant (0.0821 L·atm·K⁻¹·mol⁻¹)</li>
                  <li>T = Temperature (K)</li>
                </ul>
              </p>
              <p className="text-sm mt-2">
                Key relationships:
                <ul className="list-disc pl-5 mt-1">
                  <li>Boyle&apos;s Law: P ∝ 1/V (constant T and n)</li>
                  <li>Charles&apos;s Law: V ∝ T (constant P and n)</li>
                  <li>Gay-Lussac&apos;s Law: P ∝ T (constant V and n)</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Chemistry3D;

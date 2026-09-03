'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isWebGLAvailable } from '@/lib/webgl';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function PhysicsBallAcceleration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mass, setMass] = useState(1);
  const [restitution, setAcceleration] = useState(0.8);
  const [gravity, setGravity] = useState(9.8);
  const [isRunning, setIsRunning] = useState(true);
  const frameRef = useRef(0);
  const velRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 8 });
  const trailPtsRef = useRef<THREE.Vector3[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;
    let cancelled = false;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls;
    let ball: THREE.Mesh, trail: THREE.Points;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 15, 30);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 4, 10);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 10, 5); dir.castShadow = true;
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x6366f1, 0.3);
      fill.position.set(-5, 3, -5);
      scene.add(fill);

      scene.add(new THREE.GridHelper(16, 16, 0x334155, 0x1e293b));
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = -0.01; floor.receiveShadow = true;
      scene.add(floor);

      const wallMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
      const bw = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), wallMat);
      bw.position.set(0, 5, -8); scene.add(bw);

      ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.4, emissive: 0xef4444, emissiveIntensity: 0.15 }));
      ball.castShadow = true; ball.position.set(0, 8, 0);
      scene.add(ball);

      const tGeo = new THREE.BufferGeometry();
      const tPos = new Float32Array(900);
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      trail = new THREE.Points(tGeo, new THREE.PointsMaterial({ color: 0xef4444, size: 0.08, transparent: true, opacity: 0.6 }));
      scene.add(trail);

      const animate = () => {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        if (isRunning) {
          const dt = 1 / 60;
          velRef.current.y -= gravity * dt;
          posRef.current.x += velRef.current.x * dt.current.x * dt;
          posRef.current.y += velRef.current.y * dt;
          if (posRef.current.y - 0.5 < -0.01) { posRef.current.y = 0.5; velRef.current.y = -velRef.current.y * restitution; if (Math.abs(velRef.current.y) < 0.1) velRef.current.y = 0; }
          if (posRef.current.x > 7.5) { posRef.current.x = 7.5; velRef.current.x = -velRef.current.x * restitution; }
          if (posRef.current.x < -7.5) { posRef.current.x = -7.5; velRef.current.x = -velRef.current.x * restitution; }
          if (posRef.current.y > 9.5) { posRef.current.y = 9.5; velRef.current.y = -velRef.current.y * restitution; }
          ball.position.set(posRef.current.x, posRef.current.y, 0);
          ball.scale.setScalar(0.5 + mass * 0.15);
          trailPtsRef.current.push(new THREE.Vector3(posRef.current.x, posRef.current.y, 0));
          if (trailPtsRef.current.length > 300) trailPtsRef.current.shift();
          const arr = tGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < 300; i++) {
            if (i < trailPtsRef.current.length) { const p = trailPtsRef.current[i]; arr[i*3] = p.x; arr[i*3+1] = p.y; arr[i*3+2] = p.z; } else { arr[i*3] = 0; arr[i*3+1] = -10; arr[i*3+2] = 0; }
          }
          tGeo.attributes.position.needsUpdate = true;
        }
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      const handleResize = () => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); };
      window.addEventListener('resize', handleResize);
      return () => { cancelled = true; cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', handleResize); renderer.dispose(); controls.dispose(); };
    };
    init();
  }, [gravity, restitution, mass, isRunning]);

  return (
    <div className='space-y-4'>
      <div ref={containerRef} className='w-full rounded-md border border-border' style={{ height: 'clamp(300px, 50vh, 500px)' }} />
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-md border border-border bg-muted/30 p-3 space-y-2'><Label>Mass</Label><Input type='range' min={0.5} max={3} step={0.1} value={mass} onChange={(e) => setMass(parseFloat(e.target.value))} /><p className='text-xs text-muted-foreground'>{mass.toFixed(1)} kg</p></div>
        <div className='rounded-md border border-border bg-muted/30 p-3 space-y-2'><Label>Acceleration</Label><Input type='range' min={0} max={1} step={0.05} value={restitution} onChange={(e) => setAcceleration(parseFloat(e.target.value))} /><p className='text-xs text-muted-foreground'>{(restitution * 100).toFixed(0)}% energy</p></div>
        <div className='rounded-md border border-border bg-muted/30 p-3 space-y-2'><Label>Gravity</Label><Input type='range' min={1} max={20} step={0.1} value={gravity} onChange={(e) => setGravity(parseFloat(e.target.value))} /><p className='text-xs text-muted-foreground'>{gravity.toFixed(1)} m/s2</p></div>
        <div className='rounded-md border border-border bg-muted/30 p-3 flex items-center justify-between'><Label>Sim</Label><button onClick={() => setIsRunning(!isRunning)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}>{isRunning ? 'Pause' : 'Play'}</button></div>
      </div>
      <div className='rounded-md border border-primary/20 bg-primary/5 p-3'>
        <p className='text-xs font-semibold uppercase tracking-wide text-primary'>Formula & Why It Matters</p>
        <h4 className='mt-1 text-sm font-semibold'>Ball Acceleration - Coefficient of Acceleration</h4>
        <p className='mt-1 text-xs text-muted-foreground'>a = F / m determines energy retention per bounce. Each bounce height: h_n = e^(2n) * h_0. Real balls lose energy to heat, sound, and deformation.</p>
        <ul className='mt-2 space-y-1 text-xs text-muted-foreground'>
          <li className='flex gap-1.5'><span className='text-primary'>•</span><span>e = 1: perfectly elastic - ball returns to original height forever</span></li>
          <li className='flex gap-1.5'><span className='text-primary'>•</span><span>e = 0: perfectly inelastic - ball stops on impact</span></li>
          <li className='flex gap-1.5'><span className='text-primary'>•</span><span>Bounce height decays geometrically: h_n = e^(2n) * h_0</span></li>
        </ul>
      </div>
    </div>
  );
}

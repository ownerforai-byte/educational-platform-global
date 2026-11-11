'use client';

/**
 * Python Visuals — renders assets produced by the `visuals-py` pipeline
 * (JSON in /public/data/visuals/py) using three.js.
 *
 * Two shapes are supported (see visuals-py/visuals_py/assets.py):
 *   - surface3d : static triangle meshes (built from flat positions + indices)
 *   - sim/motion: keyframed object lists (sphere / line / arrow / trail)
 *     interpolated between frames at the asset's fps.
 *
 * The Python side is the source of truth for geometry + physics; this file only
 * plays the result back.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isWebGLAvailable } from '@/lib/webgl';
import { loadData } from '@/lib/data-loader';
import { Label } from '@/components/ui/label';

/* ------------------------------------------------------------------ *
 * Types mirroring the Python JSON schema
 * ------------------------------------------------------------------ */
interface PyScene {
  cameraPosition: number[];
  background: number;
  grid: boolean;
  axes: boolean;
  subject?: string;
}
interface PyMesh {
  name: string;
  positions: number[];
  indices: number[];
  normals?: number[];
  color: string;
  wireframe: boolean;
  material?: { metalness?: number; roughness?: number };
}
interface PyFrameObject {
  type: 'sphere' | 'box' | 'line' | 'trail' | 'arrow';
  position: number[];
  scale?: number;
  color?: string;
  points?: number[];
  target?: number[];
  radius?: number;
}
interface PyFrame { t: number; objects: PyFrameObject[] }
interface PyAsset {
  id: string; kind: 'surface3d' | 'sim' | 'motion';
  title: string; description: string; subject: string; unit: string;
  scene: PyScene; meshes?: PyMesh[]; frames?: PyFrame[]; fps?: number;
  meta?: Record<string, unknown>;
}
interface PyManifest { assets: { id: string; kind: string; title: string; subject: string; unit: string; frames: number; meshes: number }[] }

/* ------------------------------------------------------------------ *
 * Per-asset renderer
 * ------------------------------------------------------------------ */
export function PythonVisuals({ assetId, className }: { assetId: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [asset, setAsset] = useState<PyAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadData<PyAsset>(`visuals/py/${assetId}`)
      .then((a) => { if (!cancelled && a && a.id) setAsset(a); else if (!cancelled) setError('asset not found'); })
      .catch(() => { if (!cancelled) setError('failed to load asset'); });
    return () => { cancelled = true; };
  }, [assetId]);

  const metaRows = useMemo(() => {
    if (!asset?.meta) return [];
    return Object.entries(asset.meta).filter(([k]) => !k.startsWith('_')).map(([k, v]) => [k, String(v)] as const);
  }, [asset]);

  if (error) {
    return (
      <div className={className ?? 'space-y-4'}>
        <div className="w-full rounded-md border border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground" style={{ height: 'clamp(300px,50vh,500px)' }}>
          Could not load Python visual: {error}
        </div>
      </div>
    );
  }
  if (!asset) {
    return <div ref={containerRef} className={className ?? 'space-y-4'} style={{ height: 'clamp(300px,50vh,500px)' }} />;
  }
  return (
    <div className={className ?? 'space-y-4'}>
      <div ref={containerRef} className="w-full rounded-md border border-border" style={{ height: 'clamp(300px,50vh,500px)' }} data-py-asset={asset.id} />
      <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{asset.kind} · Python-generated</p>
        <h4 className="mt-1 text-sm font-semibold">{asset.title}</h4>
        <p className="mt-1 text-xs text-muted-foreground">{asset.description}</p>
        {metaRows.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {metaRows.slice(0, 4).map(([k, v]) => (
              <li key={k} className="flex gap-1.5"><span className="text-primary">•</span><span className="font-mono">{k} = {v}</span></li>
            ))}
          </ul>
        )}
      </div>
      <MountVisual containerRef={containerRef} asset={asset} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The three.js mount — builds geometry / plays frames
 * ------------------------------------------------------------------ */
function MountVisual({ containerRef, asset }: { containerRef: React.MutableRefObject<HTMLDivElement | null>; asset: PyAsset }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;
    let disposed = false;
    let raf = 0;
    let controls: OrbitControls | null = null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(asset.scene.background);
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight || 1, 0.1, 1000);
    camera.position.fromArray(asset.scene.cameraPosition);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, asset.scene.axes ? 0 : -1, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(8, 14, 10);
    scene.add(dir);
    if (asset.scene.grid) scene.add(new THREE.GridHelper(20, 40, 0x334155, 0x1e293b));
    if (asset.scene.axes) scene.add(new THREE.AxesHelper(5));

    const group = new THREE.Group();
    scene.add(group);

    const disposables: { dispose: () => void }[] = [];

    // ---- static meshes (surface3d) ----
    if (asset.kind === 'surface3d' && asset.meshes) {
      for (const m of asset.meshes) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(m.positions, 3));
        if (m.normals) geo.setAttribute('normal', new THREE.Float32BufferAttribute(m.normals, 3));
        geo.setIndex(m.indices);
        if (!m.normals) geo.computeVertexNormals();
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(m.color),
          metalness: m.material?.metalness ?? 0.15,
          roughness: m.material?.roughness ?? 0.35,
          wireframe: m.wireframe,
          side: THREE.DoubleSide,
        });
        group.add(new THREE.Mesh(geo, mat));
        disposables.push(geo, mat);
      }
    }

    // ---- frames (sim / motion) ----
    let frameGroup: THREE.Group | null = null;
    const clearFrame = () => {
      if (!frameGroup) return;
      frameGroup.traverse((o) => {
        const any = o as unknown as { geometry?: { dispose?: () => void }; material?: { dispose?: () => void }[] | { dispose?: () => void } };
        any.geometry?.dispose?.();
        const mat = any.material;
        if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((mm) => mm.dispose?.());
      });
      group.remove(frameGroup);
      frameGroup = null;
    };
    const buildFrame = (frame: PyFrame) => {
      clearFrame();
      frameGroup = new THREE.Group();
      group.add(frameGroup);
      for (const ob of frame.objects) {
        if (ob.type === 'line' && ob.points && ob.points.length >= 6) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ob.points), 3));
          const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(ob.color ?? '#3B82F6') });
          frameGroup.add(new THREE.Line(geo, mat));
        } else if (ob.type === 'sphere') {
          const geo = new THREE.SphereGeometry(ob.radius ?? 0.3, 24, 24);
          const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(ob.color ?? '#EF4444'), roughness: 0.3, metalness: 0.3, emissive: new THREE.Color(ob.color ?? '#EF4444'), emissiveIntensity: 0.15 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.fromArray(ob.position);
          if (ob.scale) mesh.scale.setScalar(ob.scale);
          frameGroup.add(mesh);
        } else if (ob.type === 'arrow' && ob.target) {
          const start = new THREE.Vector3().fromArray(ob.position);
          const lenV = new THREE.Vector3().fromArray(ob.target).sub(start);
          const len = Math.max(lenV.length(), 0.001);
          frameGroup.add(new THREE.ArrowHelper(lenV.clone().normalize(), start, len, new THREE.Color(ob.color ?? '#F59E0B'), 0.35, 0.2));
        } else if (ob.type === 'box') {
          const geo = new THREE.BoxGeometry(ob.radius ?? 0.6, ob.radius ?? 0.6, ob.radius ?? 0.6);
          const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(ob.color ?? '#3B82F6'), roughness: 0.4, metalness: 0.2 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.fromArray(ob.position);
          if (ob.scale) mesh.scale.setScalar(ob.scale);
          frameGroup.add(mesh);
        } else if (ob.type === 'trail' && ob.points && ob.points.length >= 6) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ob.points), 3));
          const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(ob.color ?? '#3B82F6'), transparent: true, opacity: 0.7 });
          frameGroup.add(new THREE.Line(geo, mat));
        }
      }
    };

    const frames = asset.kind === 'surface3d' ? [] : (asset.frames ?? []);
    if (frames.length) buildFrame(frames[0]);

    const fps = asset.fps ?? 30;
    const clock = new THREE.Clock();
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      if (frames.length > 1) {
        const t = clock.getElapsedTime();
        const idx = Math.floor(t * fps) % frames.length;
        buildFrame(frames[idx]);
      }
      controls?.update();
      if (asset.kind === 'surface3d') group.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      clearFrame();
      controls?.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [containerRef, asset]);

  return null;
}

/* ------------------------------------------------------------------ *
 * Hub — list every generated asset, render the selected one
 * ------------------------------------------------------------------ */
export function PythonVisualsHub() {
  const [manifest, setManifest] = useState<PyManifest | null>(null);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData<PyManifest>('visuals/py/manifest')
      .then((m) => { setManifest(m); if (m?.assets?.[0]) setSelected(m.assets[0].id); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading Python visuals…</div>;
  if (!manifest) return <div className="p-6 text-sm text-muted-foreground">No Python visuals found. Run `npm run visuals:py`.</div>;

  const counts = manifest.assets.reduce((acc, a) => ((acc[a.kind] = (acc[a.kind] ?? 0) + 1), acc), {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Label className="text-xs font-semibold text-foreground">{manifest.assets.length} Python-generated visuals</Label>
        {Object.entries(counts).map(([k, n]) => (
          <span key={k} className="rounded-full border border-border bg-muted/40 px-2 py-0.5">{k}: {n}</span>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {manifest.assets.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelected(a.id)}
            className={`rounded-md border p-3 text-left transition-all ${selected === a.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/40'}`}
          >
            <p className="text-sm font-semibold">{a.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{a.unit}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground/70">{a.kind} · {a.subject}</p>
          </button>
        ))}
      </div>
      <PythonVisuals assetId={selected} />
    </div>
  );
}

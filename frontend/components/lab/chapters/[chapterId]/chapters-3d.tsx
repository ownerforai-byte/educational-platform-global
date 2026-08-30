"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating background particles
function FloatingParticles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new THREE.BufferAttribute(positions, 3)}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#f97316" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Main rotating geometry with glow
function ChapterGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      innerRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -clock.getElapsedTime() * 0.2;
      outerRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Outer wireframe icosahedron */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color="#fb923c"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
        {/* Core icosahedron with emissive glow */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Orbiting smaller shapes */}
        {[-0.8, 0.8].map((offset, i) => (
          <mesh key={i} position={[offset, 0, 0]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color={i === 0 ? "#fbbf24" : "#34d399"}
              emissive={i === 0 ? "#f59e0b" : "#10b981"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function Chapter3DComponent() {
  return (
    <div className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#f97316" />
        <pointLight position={[-8, -4, 6]} intensity={0.5} color="#3b82f6" />
        <Stars radius={30} depth={60} count={300} factor={4} saturation={0} fade speed={0.8} />
        <ChapterGeometry />
        <FloatingParticles count={60} />
        <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={12} />
      </Canvas>
    </div>
  );
}

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleNetwork({ scrollY }) {
  const pointsRef = useRef();
  const { mouse, viewport } = useThree();

  // Create point positions and connections
  const count = 120;
  const [positions, stepSizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const steps = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      steps[i] = 0.02 + Math.random() * 0.03;
    }
    return [pos, steps];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate points group slowly based on time and scroll
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05 + (scrollY * 0.0005);
      pointsRef.current.rotation.x = time * 0.02;

      // Mouse attraction simulation
      const targetX = (mouse.x * viewport.width) / 8;
      const targetY = (mouse.y * viewport.height) / 8;
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3} limit={count}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas({ scrollY }) {
  return (
    <div className="three-canvas-container" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.65
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <ParticleNetwork scrollY={scrollY} />
      </Canvas>
    </div>
  );
}

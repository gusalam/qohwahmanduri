import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Coffee Cup Component
function CoffeeCup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Cup Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1.2, 32]} />
          <meshStandardMaterial
            color="#f5e6d3"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Cup Handle */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#f5e6d3"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Coffee Inside */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
          <meshStandardMaterial
            color="#3d2314"
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        
        {/* Saucer */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[1.2, 1.1, 0.1, 32]} />
          <meshStandardMaterial
            color="#f5e6d3"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Steam Effect
function Steam() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const positions = new Float32Array(30 * 3);
  for (let i = 0; i < 30; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = Math.random() * 1.5 + 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={30}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f5e6d3"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fff5e6" />
      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#c9a962" />
      
      <CoffeeCup />
      <Steam />
      
      <Environment preset="sunset" />
    </>
  );
}

export default function RotatingCup() {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

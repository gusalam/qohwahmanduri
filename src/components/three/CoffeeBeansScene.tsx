import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Coffee Bean Shape Component
function CoffeeBean({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create coffee bean geometry (ellipsoid with groove)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.ellipse(0, 0, 0.5, 0.8, 0, Math.PI * 2, false, 0);
    
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.15,
      bevelThickness: 0.1,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        geometry={geometry}
      >
        <meshStandardMaterial
          color="#3d2314"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Multiple Coffee Beans
function CoffeeBeans() {
  const beans = useMemo(() => {
    const beanData = [];
    for (let i = 0; i < 20; i++) {
      beanData.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.2 + Math.random() * 0.3,
      });
    }
    return beanData;
  }, []);

  return (
    <>
      {beans.map((bean, index) => (
        <CoffeeBean
          key={index}
          position={bean.position}
          rotation={bean.rotation}
          scale={bean.scale}
        />
      ))}
    </>
  );
}

// Steam/Smoke Particles
function SteamParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, velocities } = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = Math.random() * 3 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = 0.02 + Math.random() * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positionArray.length / 3; i++) {
        positionArray[i * 3] += velocities[i * 3];
        positionArray[i * 3 + 1] += velocities[i * 3 + 1];
        positionArray[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Reset particle when it goes too high
        if (positionArray[i * 3 + 1] > 4) {
          positionArray[i * 3] = (Math.random() - 0.5) * 2;
          positionArray[i * 3 + 1] = -1;
          positionArray[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#f5e6d3"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#fff5e6" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#c9a962" />
      
      <CoffeeBeans />
      <SteamParticles />
      
      <Environment preset="sunset" />
    </>
  );
}

export default function CoffeeBeansScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
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

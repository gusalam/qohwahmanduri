import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Coffee stream particle
function CoffeeStream() {
  const streamRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const streamGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0.05, 2, 0),
      new THREE.Vector3(-0.03, 1.5, 0),
      new THREE.Vector3(0.02, 1, 0),
      new THREE.Vector3(0, 0.5, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.08, 8, false);
  }, []);

  useFrame((state) => {
    if (streamRef.current) {
      // Subtle wobble animation
      streamRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.02;
      streamRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={streamRef} position={[0, 0.3, 0]}>
      <mesh geometry={streamGeometry}>
        <meshPhysicalMaterial
          color="#4a2c1a"
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

// Splash particles
function SplashParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>();
  
  const { positions, velocities } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.2;
      
      positions[i * 3] = Math.cos(angle) * radius * 0.1;
      positions[i * 3 + 1] = 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.1;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.08;
      velocities[i * 3 + 1] = Math.random() * 0.15 + 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    
    return { positions, velocities };
  }, []);

  velocitiesRef.current = velocities;

  useFrame((state) => {
    if (particlesRef.current && velocitiesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.length / 3; i++) {
        const phase = (time * 2 + i * 0.1) % 2;
        
        if (phase < 1) {
          // Rising phase
          const t = phase;
          positions[i * 3] = velocitiesRef.current[i * 3] * t * 8;
          positions[i * 3 + 1] = 0.5 + velocitiesRef.current[i * 3 + 1] * t * 8 - 4.9 * t * t;
          positions[i * 3 + 2] = velocitiesRef.current[i * 3 + 2] * t * 8;
        } else {
          // Reset and wait
          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0.5;
          positions[i * 3 + 2] = 0;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6b3a1f"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Droplet particles flying up
function Droplets() {
  const dropletsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = 0.5 + Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (dropletsRef.current) {
      const pos = dropletsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < pos.length / 3; i++) {
        const offset = i * 0.15;
        const cycle = (time + offset) % 1.5;
        
        // Parabolic motion
        const x = (Math.sin(i * 2.5) * 0.3) * (cycle / 1.5);
        const y = 0.5 + cycle * 1.2 - cycle * cycle * 0.8;
        const z = (Math.cos(i * 2.5) * 0.3) * (cycle / 1.5);
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
      }
      
      dropletsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={dropletsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8b4513"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

// Steam effect
function Steam() {
  const steamRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 0.6 + Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (steamRef.current) {
      const pos = steamRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < pos.length / 3; i++) {
        const offset = i * 0.08;
        const cycle = (time * 0.5 + offset) % 3;
        
        // Steam rising with swirl
        pos[i * 3] = Math.sin(cycle * 2 + i) * 0.15 * (cycle / 3);
        pos[i * 3 + 1] = 0.6 + cycle * 0.6;
        pos[i * 3 + 2] = Math.cos(cycle * 2 + i) * 0.15 * (cycle / 3);
      }
      
      steamRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Fade based on position
      const material = steamRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.15 + Math.sin(time) * 0.05;
    }
  });

  return (
    <points ref={steamRef}>
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
        color="#ffffff"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Coffee surface with ripples
function CoffeeSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.CircleGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        const distance = Math.sqrt(x * x + z * z);
        
        // Ripple effect from center
        positions[i + 1] = Math.sin(distance * 8 - time * 4) * 0.02 * (1 - distance);
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.48, 0]}>
      <circleGeometry args={[0.42, 32, 32]} />
      <meshPhysicalMaterial
        color="#3a1f0d"
        roughness={0.1}
        metalness={0.05}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

// Coffee cup
function CoffeeCup({ isHovered }: { isHovered: boolean }) {
  const cupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cupRef.current) {
      // Subtle rotation on hover
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Cup body shape
  const cupShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points: THREE.Vector2[] = [];
    
    // Cup profile (half cross-section)
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const radius = 0.35 + t * 0.1 + Math.sin(t * Math.PI) * 0.05;
      const y = t * 0.8;
      points.push(new THREE.Vector2(radius, y));
    }
    
    return points;
  }, []);

  return (
    <group ref={cupRef}>
      {/* Cup body */}
      <mesh position={[0, 0, 0]}>
        <latheGeometry args={[cupShape, 32]} />
        <meshPhysicalMaterial
          color="#f5f0e8"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.3}
        />
      </mesh>
      
      {/* Cup rim */}
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.025, 8, 32]} />
        <meshPhysicalMaterial
          color="#f5f0e8"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      
      {/* Cup handle */}
      <mesh position={[0.55, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.18, 0.03, 8, 16, Math.PI]} />
        <meshPhysicalMaterial
          color="#f5f0e8"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      
      {/* Cup interior (dark) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.43, 0.35, 0.75, 32, 1, true]} />
        <meshStandardMaterial color="#2a1505" side={THREE.BackSide} />
      </mesh>
      
      {/* Brand text - "Qohwah Manduri" curved on cup */}
      <group position={[0, 0.4, 0]}>
        {/* Create curved text by positioning individual letters */}
        {'Qohwah Manduri'.split('').map((char, i) => {
          const total = 14;
          const angle = ((i - total / 2 + 0.5) / total) * 0.8;
          const radius = 0.46;
          return (
            <Text
              key={i}
              position={[
                Math.sin(angle) * radius,
                0,
                Math.cos(angle) * radius
              ]}
              rotation={[0, angle, 0]}
              fontSize={0.065}
              color="#8B6914"
              anchorX="center"
              anchorY="middle"
            >
              {char}
            </Text>
          );
        })}
      </group>
      
      {/* Decorative line under text */}
      <mesh position={[0, 0.28, 0.455]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.008, 0.005]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
    </group>
  );
}

// Saucer
function Saucer() {
  const saucerShape = useMemo(() => {
    const points: THREE.Vector2[] = [];
    
    // Saucer profile
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const radius = t * 0.7;
      const y = Math.sin(t * Math.PI * 0.5) * 0.08;
      points.push(new THREE.Vector2(radius, y));
    }
    
    return points;
  }, []);

  return (
    <group position={[0, -0.12, 0]}>
      <mesh>
        <latheGeometry args={[saucerShape, 32]} />
        <meshPhysicalMaterial
          color="#f5f0e8"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.3}
        />
      </mesh>
      
      {/* Saucer rim */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshPhysicalMaterial
          color="#f5f0e8"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

// Main scene component
function Scene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#ffeedd" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#ffd9b3"
      />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffcc80" />
      
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <group position={[0, -0.3, 0]}>
          <CoffeeCup isHovered={isHovered} />
          <Saucer />
          <CoffeeSurface />
          <CoffeeStream />
          <SplashParticles />
          <Droplets />
          <Steam />
        </group>
      </Float>
      
      <Environment preset="studio" />
    </>
  );
}

// Exported component
export default function CoffeePourScene() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Scene isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function CentralCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function InnerCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} scale={0.55}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#8b5cf6"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

const orbitConfigs = [
  { radius: 2.2, speed: 0.3, phase: 0, tilt: 0.3, shape: "octahedron" as const, size: 0.15 },
  { radius: 2.2, speed: 0.3, phase: Math.PI * 0.66, tilt: 0.3, shape: "octahedron" as const, size: 0.15 },
  { radius: 2.2, speed: 0.3, phase: Math.PI * 1.33, tilt: 0.3, shape: "octahedron" as const, size: 0.15 },
  { radius: 2.6, speed: -0.18, phase: 0, tilt: -0.5, shape: "tetrahedron" as const, size: 0.12 },
  { radius: 2.6, speed: -0.18, phase: Math.PI, tilt: -0.5, shape: "tetrahedron" as const, size: 0.12 },
  { radius: 1.8, speed: 0.4, phase: Math.PI * 0.5, tilt: 0.8, shape: "octahedron" as const, size: 0.1 },
  { radius: 1.8, speed: 0.4, phase: Math.PI * 1.5, tilt: 0.8, shape: "octahedron" as const, size: 0.1 },
];

function OrbitingNode({
  config,
}: {
  config: (typeof orbitConfigs)[0];
}) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current || !meshRef.current) return;
    const t = state.clock.elapsedTime * config.speed + config.phase;
    ref.current.position.x = Math.cos(t) * config.radius;
    ref.current.position.z = Math.sin(t) * config.radius;
    ref.current.position.y = Math.sin(t * 1.5) * config.tilt;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  const geo = useMemo(() => {
    switch (config.shape) {
      case "tetrahedron":
        return <tetrahedronGeometry args={[config.size, 0]} />;
      default:
        return <octahedronGeometry args={[config.size, 0]} />;
    }
  }, [config.shape, config.size]);

  return (
    <group ref={ref}>
      <mesh ref={meshRef}>
        {geo}
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

function OrbitalRing({ radius, tilt, opacity }: { radius: number; tilt: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = tilt;
    ref.current.rotation.z = state.clock.elapsedTime * 0.03;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 8, 100]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function VertexParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 1.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a78bfa"
        transparent
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroObject() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef}>
        <CentralCore />
        <InnerCore />

        {orbitConfigs.map((config, i) => (
          <OrbitingNode key={i} config={config} />
        ))}

        <OrbitalRing radius={2.2} tilt={0.3} opacity={0.12} />
        <OrbitalRing radius={2.6} tilt={-0.5} opacity={0.08} />
        <OrbitalRing radius={1.8} tilt={0.8} opacity={0.1} />

        <VertexParticles />
      </group>
    </Float>
  );
}

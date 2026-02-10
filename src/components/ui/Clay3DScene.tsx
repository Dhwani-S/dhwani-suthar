"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

/**
 * Clay 3D Scene - "The Data Studio"
 * Playful, tactile, Mr. Panda-style floating objects
 */

// The Code Cube - Matte Blue
function CodeCube({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.02 : 0.005;
      meshRef.current.rotation.x += hovered ? 0.01 : 0.002;
      const scale = hovered ? 1.15 : 1;
      targetScale.current.set(scale, scale, scale);
      meshRef.current.scale.lerp(targetScale.current, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <RoundedBox
        ref={meshRef}
        args={[1.8, 1.8, 1.8]}
        radius={0.2}
        smoothness={4}
        position={[-1, 0.5, 0]}
      >
        <meshStandardMaterial
          color="#4f46e5"
          roughness={0.75}
          metalness={0.05}
        />
      </RoundedBox>
    </Float>
  );
}

// The Art Sphere - Matte Coral with squish effect
function ArtSphere({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      const scale = hovered ? 1.2 : 1;
      targetScale.current.set(scale, scale, scale);
      meshRef.current.scale.lerp(targetScale.current, 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={meshRef} position={[1.5, -0.3, 0.5]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#f97316"
          roughness={0.7}
          metalness={0.05}
          distort={hovered ? 0.4 : 0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// The Structure Torus - Matte White Pipeline Ring
function PipelineTorus({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += hovered ? 0.015 : 0.005;
      meshRef.current.rotation.z += hovered ? 0.008 : 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -1]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.15, 16, 48]} />
        <meshStandardMaterial
          color="#f5f5f4"
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>
    </Float>
  );
}

// Small Accent Spheres
function AccentSpheres() {
  return (
    <>
      <Float speed={4} floatIntensity={3}>
        <mesh position={[-2.5, 1.5, 1]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#10b981" roughness={0.7} metalness={0.05} />
        </mesh>
      </Float>
      <Float speed={3.5} floatIntensity={2.5}>
        <mesh position={[2.5, 1, -0.5]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.7} metalness={0.05} />
        </mesh>
      </Float>
      <Float speed={5} floatIntensity={2}>
        <mesh position={[0.5, -1.8, 0.5]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#eab308" roughness={0.7} metalness={0.05} />
        </mesh>
      </Float>
    </>
  );
}

// Main Scene
function Scene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#fff5e6"
        castShadow
      />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#e0f2fe" />

      {/* Environment for subtle reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Objects */}
      <CodeCube hovered={hovered} />
      <ArtSphere hovered={hovered} />
      <PipelineTorus hovered={hovered} />
      <AccentSpheres />
    </group>
  );
}

export function Clay3DScene() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative w-full h-[500px] lg:h-[550px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/30 via-orange-100/20 to-emerald-100/20 rounded-full blur-[80px] -z-10" />

      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene hovered={hovered} />
      </Canvas>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-zinc-400 font-mono"
      >
        Hover to interact
      </motion.p>
    </motion.div>
  );
}

export default Clay3DScene;

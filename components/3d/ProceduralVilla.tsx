"use client";
import { MeshStandardMaterial } from "three";
import { useMemo } from "react";
function Box({
  position,
  scale,
  material,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  material: MeshStandardMaterial;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
export type MaterialMood = "warm" | "contemporary" | "earthen";
const palettes: Record<
  MaterialMood,
  { stone: string; dark: string; glass: string }
> = {
  warm: { stone: "#d1c7b4", dark: "#443b32", glass: "#789399" },
  contemporary: { stone: "#bec0bb", dark: "#25282a", glass: "#748c95" },
  earthen: { stone: "#ae9678", dark: "#4c392f", glass: "#788b85" },
};
export function ProceduralVilla({
  night = false,
  variant = "villa",
  materialMood = "warm",
}: {
  night?: boolean;
  variant?: string;
  materialMood?: MaterialMood;
}) {
  const p = palettes[materialMood];
  const m = useMemo(
    () => ({
      stone: new MeshStandardMaterial({
        color: variant === "mountain" ? "#746d61" : p.stone,
        roughness: 0.8,
      }),
      dark: new MeshStandardMaterial({
        color: p.dark,
        roughness: 0.55,
        metalness: 0.15,
      }),
      glass: new MeshStandardMaterial({
        color: night ? "#d7934d" : p.glass,
        roughness: 0.12,
        metalness: 0.35,
        transparent: true,
        opacity: night ? 0.72 : 0.45,
        emissive: night ? "#c47631" : "#000000",
        emissiveIntensity: night ? 0.85 : 0,
      }),
      water: new MeshStandardMaterial({
        color: night ? "#194a63" : "#638c96",
        roughness: 0.12,
        metalness: 0.1,
        emissive: night ? "#0a374f" : "#000000",
        emissiveIntensity: night ? 0.45 : 0,
      }),
      grass: new MeshStandardMaterial({
        color: night ? "#18231d" : "#536652",
        roughness: 1,
      }),
    }),
    [night, variant, p],
  );
  return (
    <group position={[0, -0.25, 0]}>
      <Box position={[0, -0.18, 0]} scale={[12, 0.3, 10]} material={m.grass} />
      <Box
        position={[-0.2, 1.2, 0.2]}
        scale={[7.3, 2.5, 3.8]}
        material={m.stone}
      />
      <Box
        position={[-0.2, 3.2, 0.2]}
        scale={[8, 0.32, 4.5]}
        material={m.dark}
      />
      <Box position={[2.6, 4.35, 0.3]} scale={[3, 2, 3.5]} material={m.stone} />
      <Box
        position={[2.6, 5.5, 0.3]}
        scale={[3.4, 0.25, 4]}
        material={m.dark}
      />
      <Box
        position={[-2.1, 1.55, 2.18]}
        scale={[3.3, 2.3, 0.08]}
        material={m.glass}
      />
      <Box
        position={[1.7, 1.55, 2.18]}
        scale={[2.4, 2.3, 0.08]}
        material={m.glass}
      />
      <Box
        position={[2.6, 4.3, 2.1]}
        scale={[2.4, 1.55, 0.08]}
        material={m.glass}
      />
      {[-3.5, -1.2, 1.1, 3.5].map((x) => (
        <Box
          key={x}
          position={[x, 1.55, 2.43]}
          scale={[0.22, 2.7, 0.25]}
          material={m.dark}
        />
      ))}
      <Box
        position={[-4.1, 0.18, 3.8]}
        scale={[5.5, 0.12, 2.2]}
        material={m.water}
      />
      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          position={[-1.5 + i * 0.75, 0.15, 2.7 + i * 0.28]}
          scale={[3.6 - i * 0.35, 0.22, 0.55]}
          material={m.stone}
        />
      ))}
      {[
        [-4.7, 1, -2.7],
        [4.5, 1, -2.5],
        [-5, 1, 2.5],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh castShadow>
            <sphereGeometry args={[0.75, 8, 8]} />
            <meshStandardMaterial color={night ? "#162318" : "#405a3e"} />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 1.3, 8]} />
            <meshStandardMaterial color="#5b4937" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

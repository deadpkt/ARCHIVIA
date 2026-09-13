"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import type { Group, Material, Mesh, Object3D } from "three";
import { Color, MeshStandardMaterial } from "three";

type MaterialRole =
  | "wall"
  | "stone"
  | "concrete"
  | "wood"
  | "metal"
  | "glass"
  | "paving";
export type MaterialMood =
  | "warm"
  | "contemporary"
  | "earthen"
  | "naturalStone"
  | "warmLimestone"
  | "concrete"
  | "darkStone"
  | "woodStone";

const palettes: Record<MaterialMood, Record<MaterialRole, string>> = {
  warm: {
    wall: "#d8cdb8",
    stone: "#d8cdb8",
    concrete: "#b8b4aa",
    wood: "#8a613d",
    metal: "#3a3029",
    glass: "#78939b",
    paving: "#a59d8e",
  },
  contemporary: {
    wall: "#c5c6c1",
    stone: "#c5c6c1",
    concrete: "#a7aaa7",
    wood: "#76665a",
    metal: "#202426",
    glass: "#718993",
    paving: "#969994",
  },
  earthen: {
    wall: "#bca080",
    stone: "#bca080",
    concrete: "#a69a88",
    wood: "#583d2b",
    metal: "#49382d",
    glass: "#778a84",
    paving: "#998873",
  },
  naturalStone: {
    wall: "#aaa18f",
    stone: "#aaa18f",
    concrete: "#9e9b94",
    wood: "#6e5239",
    metal: "#30302d",
    glass: "#6f8990",
    paving: "#8f8b81",
  },
  warmLimestone: {
    wall: "#d5c2a2",
    stone: "#d5c2a2",
    concrete: "#bfb4a2",
    wood: "#966b43",
    metal: "#44372d",
    glass: "#7d9599",
    paving: "#b4a78f",
  },
  concrete: {
    wall: "#a9aaa5",
    stone: "#a9aaa5",
    concrete: "#90938f",
    wood: "#71695e",
    metal: "#202426",
    glass: "#738b95",
    paving: "#858984",
  },
  darkStone: {
    wall: "#4b4a45",
    stone: "#4b4a45",
    concrete: "#5d5c57",
    wood: "#624731",
    metal: "#171918",
    glass: "#6e8990",
    paving: "#55554f",
  },
  woodStone: {
    wall: "#b8aa91",
    stone: "#b8aa91",
    concrete: "#a79c8c",
    wood: "#7c4e2e",
    metal: "#322d27",
    glass: "#789299",
    paving: "#968a77",
  },
};

function roleFor(material: Material): MaterialRole {
  const name = material.name.toLowerCase();
  if (name === "material_6" || material.transparent) return "glass";
  if (["wall", "material_24", "material_248", "line016__0", "material_2"].includes(name)) {
    return "wall";
  }
  if (["material_244", "material_245", "material_13", "material_4"].includes(name)) {
    return "wood";
  }
  if (["material_246", "material_243", "material_249", "material_12", "material_11"].includes(name)) {
    return "metal";
  }
  if (["material_250", "material_251", "material_252"].includes(name)) return "concrete";
  if (["material_247", "material_15"].includes(name)) return "paving";
  return "stone";
}

function prepareMaterial(material: Material) {
  const cloned = material.clone();
  cloned.userData.archiviaRole = roleFor(cloned);
  return cloned;
}

function prepareScene(scene: Group) {
  const model = scene.clone(true);
  model.traverse((object: Object3D) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(prepareMaterial)
      : prepareMaterial(mesh.material);
  });
  return model;
}

function updateMaterial(material: Material, mood: MaterialMood, night: boolean) {
  if (!(material instanceof MeshStandardMaterial)) return;
  const role = material.userData.archiviaRole as MaterialRole;
  material.userData.archiviaTarget = {
    color: new Color(palettes[mood][role]),
    roughness: role === "glass" ? 0.12 : role === "metal" ? 0.38 : 0.66,
    metalness: role === "metal" ? 0.5 : role === "glass" ? 0.18 : 0.04,
    opacity: role === "glass" ? (night ? 0.7 : 0.48) : 1,
    emissive: new Color(role === "glass" && night ? "#b96c2f" : "#000000"),
    emissiveIntensity: role === "glass" && night ? 0.45 : 0,
  };
  material.transparent = role === "glass";
}

export function VillaAureliaModel({
  mood,
  night,
}: {
  mood: MaterialMood;
  night: boolean;
}) {
  const { scene } = useGLTF("/models/villa-aurelia.glb") as { scene: Group };
  const model = useMemo(() => prepareScene(scene), [scene]);
  const materials = useMemo(() => {
    const unique = new Set<MeshStandardMaterial>();
    model.traverse((object: Object3D) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      meshMaterials.forEach((material) => {
        if (material instanceof MeshStandardMaterial) unique.add(material);
      });
    });
    return [...unique];
  }, [model]);

  useEffect(() => {
    model.traverse((object: Object3D) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => updateMaterial(material, mood, night));
    });
  }, [model, mood, night]);

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-delta * 10);
    materials.forEach((material) => {
      const target = material.userData.archiviaTarget as
        | {
            color: Color;
            roughness: number;
            metalness: number;
            opacity: number;
            emissive: Color;
            emissiveIntensity: number;
          }
        | undefined;
      if (!target) return;
      material.color.lerp(target.color, blend);
      material.emissive.lerp(target.emissive, blend);
      material.roughness += (target.roughness - material.roughness) * blend;
      material.metalness += (target.metalness - material.metalness) * blend;
      material.opacity += (target.opacity - material.opacity) * blend;
      material.emissiveIntensity +=
        (target.emissiveIntensity - material.emissiveIntensity) * blend;
    });
  });

  return <primitive object={model} position={[-0.31, 0.04, 0.58]} scale={0.42} />;
}

useGLTF.preload("/models/villa-aurelia.glb");

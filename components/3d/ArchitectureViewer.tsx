"use client";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Maximize2, RotateCcw, Sun, Moon } from "lucide-react";
import { MaterialMood, ProceduralVilla } from "./ProceduralVilla";
type Preset = "exterior" | "living" | "kitchen" | "pool";
const positions: Record<Preset, [number, number, number]> = {
  exterior: [10, 6, 11],
  living: [4, 2.8, 7],
  kitchen: [-1.5, 3.1, 6.8],
  pool: [-10, 4.4, 9],
};
function Scene({
  night,
  variant,
  mood,
  preset,
  reset,
}: {
  night: boolean;
  variant: string;
  mood: MaterialMood;
  preset: Preset;
  reset: number;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...positions[preset]);
    controls.current?.target.set(0, 1.7, 0);
    controls.current?.update();
  }, [camera, preset, reset]);
  return (
    <>
      <PerspectiveCamera makeDefault position={positions.exterior} fov={42} />
      <ambientLight intensity={night ? 0.32 : 1.4} />
      <directionalLight
        castShadow
        position={[5, 9, 5]}
        intensity={night ? 1.2 : 3}
        color={night ? "#e5a563" : "#fff3d9"}
      />
      {night && (
        <pointLight
          position={[-1, 2.5, 2]}
          intensity={8}
          color="#dc8c3d"
          distance={7}
        />
      )}
      <ProceduralVilla night={night} variant={variant} materialMood={mood} />
      <ContactShadows
        position={[0, -0.37, 0]}
        opacity={0.35}
        scale={20}
        blur={2.5}
      />
      <OrbitControls
        ref={controls}
        makeDefault
        target={[0, 1.7, 0]}
        minDistance={7}
        maxDistance={18}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}
const moods: { id: MaterialMood; label: string }[] = [
  { id: "warm", label: "Warm stone" },
  { id: "contemporary", label: "Contemporary" },
  { id: "earthen", label: "Earthen" },
];
export function ArchitectureViewer({
  variant = "villa",
  showMaterials = false,
}: {
  variant?: string;
  showMaterials?: boolean;
}) {
  const [night, setNight] = useState(false);
  const [preset, setPreset] = useState<Preset>("exterior");
  const [mood, setMood] = useState<MaterialMood>("warm");
  const [reset, setReset] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="viewer">
      <Canvas shadows dpr={[1, 1.7]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene
            night={night}
            variant={variant}
            mood={mood}
            preset={preset}
            reset={reset}
          />
        </Suspense>
      </Canvas>
      <div className="preset-controls">
        {(["exterior", "living", "kitchen", "pool"] as Preset[]).map((item) => (
          <button
            onClick={() => setPreset(item)}
            className={preset === item ? "active" : ""}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      {showMaterials && (
        <div className="materials">
          {moods.map((item) => (
            <button
              key={item.id}
              onClick={() => setMood(item.id)}
              className={mood === item.id ? "active" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <div className="controls">
        <button onClick={() => setNight(!night)}>
          {night ? <Sun size={15} /> : <Moon size={15} />}
          <span>{night ? "Day" : "Night"}</span>
        </button>
        <button
          onClick={() => {
            setPreset("exterior");
            setReset((x) => x + 1);
          }}
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
        <button onClick={() => root.current?.requestFullscreen()}>
          <Maximize2 size={15} />
          <span>Fullscreen</span>
        </button>
      </div>
      <div className="hint eyebrow">Drag to rotate · Scroll to zoom</div>
      <style jsx>{`
        .viewer {
          height: 100%;
          min-height: 470px;
          position: relative;
          overflow: hidden;
          background: #c7d3d0;
        }
        .controls,
        .preset-controls,
        .materials {
          position: absolute;
          display: flex;
          gap: 7px;
        }
        .controls {
          bottom: 18px;
          left: 18px;
        }
        .preset-controls {
          top: 18px;
          left: 18px;
        }
        .materials {
          top: 18px;
          right: 18px;
        }
        .controls button,
        .preset-controls button,
        .materials button {
          border: 1px solid rgba(255, 255, 255, 0.42);
          background: rgba(20, 24, 21, 0.72);
          color: #fff;
          padding: 10px 12px;
          display: flex;
          gap: 7px;
          align-items: center;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .preset-controls .active,
        .materials .active {
          background: #e9e2d5;
          color: #1b1b19;
        }
        .hint {
          position: absolute;
          right: 18px;
          bottom: 20px;
          color: white;
          font-size: 8px;
        }
        @media (max-width: 600px) {
          .viewer {
            min-height: 430px;
          }
          .controls button span {
            display: none;
          }
          .hint {
            display: none;
          }
          .preset-controls {
            max-width: calc(100% - 36px);
            flex-wrap: wrap;
          }
          .materials {
            top: 64px;
            right: 18px;
            max-width: 180px;
            flex-wrap: wrap;
            justify-content: end;
          }
        }
      `}</style>
    </div>
  );
}

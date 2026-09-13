"use client";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Maximize2, RotateCcw, Sun, Moon } from "lucide-react";
import { VillaAureliaModel } from "./VillaAureliaModel";
import type { MaterialMood } from "./VillaAureliaModel";
const INITIAL_CAMERA_POSITION = new Vector3(10, 6, 11);
const INITIAL_ORBIT_TARGET = new Vector3(0, 1.7, 0);
const CANVAS_CAMERA = { position: [10, 6, 11] as [number, number, number], fov: 42 };

const ViewerRig = memo(function ViewerRig({ reset }: { reset: number }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(INITIAL_CAMERA_POSITION);
    controls.current?.target.copy(INITIAL_ORBIT_TARGET);
    controls.current?.update();
  }, [camera, reset]);
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      minDistance={7}
      maxDistance={18}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
});

function Scene({ night, mood, reset }: { night: boolean; mood: MaterialMood; reset: number }) {
  return (
    <>
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
      <VillaAureliaModel night={night} mood={mood} />
      <ContactShadows
        position={[0, -0.04, 0]}
        opacity={0.35}
        scale={20}
        blur={2.5}
      />
      <ViewerRig reset={reset} />
    </>
  );
}
type MaterialOption = { id: MaterialMood; label: string; swatch?: string };
const projectMoods: MaterialOption[] = [
  { id: "warm", label: "Warm stone" },
  { id: "contemporary", label: "Contemporary" },
  { id: "earthen", label: "Earthen" },
];
const homepageMoods: MaterialOption[] = [
  { id: "naturalStone", label: "Natural Stone", swatch: "#aaa18f" },
  { id: "warmLimestone", label: "Warm Limestone", swatch: "#d5c2a2" },
  { id: "concrete", label: "Concrete", swatch: "#90938f" },
  { id: "darkStone", label: "Dark Stone", swatch: "#4b4a45" },
  { id: "woodStone", label: "Wood + Stone", swatch: "#8a613d" },
];
export function ArchitectureViewer({
  variant = "villa",
  showMaterials = false,
  materialSet = "project",
}: {
  variant?: string;
  showMaterials?: boolean;
  materialSet?: "project" | "homepage";
}) {
  const [night, setNight] = useState(false);
  const [mood, setMood] = useState<MaterialMood>(
    materialSet === "homepage" ? "naturalStone" : "warm",
  );
  const [reset, setReset] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const materialMoods = materialSet === "homepage" ? homepageMoods : projectMoods;
  return (
    <div ref={root} className="viewer">
      <Canvas shadows dpr={[1, 1.7]} gl={{ antialias: true }} camera={CANVAS_CAMERA}>
        <Suspense fallback={null}>
          <Scene
            night={night}
            mood={mood}
            reset={reset}
          />
        </Suspense>
      </Canvas>
      {showMaterials && (
        <div className="materials">
          {materialSet === "homepage" && (
            <div className="material-heading">
              <span className="eyebrow">Material study</span>
              <strong>Villa Aurelia</strong>
            </div>
          )}
          {materialMoods.map((item) => (
            <button
              key={item.id}
              onClick={() => setMood(item.id)}
              className={mood === item.id ? "active" : ""}
              aria-pressed={mood === item.id}
            >
              {item.swatch && (
                <i className="swatch" style={{ background: item.swatch }} />
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
      <div className="controls">
        <button onClick={() => setNight(!night)}>
          {night ? <Sun size={15} /> : <Moon size={15} />}
          <span className="control-label">{night ? "Day" : "Night"}</span>
        </button>
        <button
          onClick={() => {
            setReset((x) => x + 1);
          }}
        >
          <RotateCcw size={15} />
          <span className="control-label">Reset</span>
        </button>
        <button onClick={() => root.current?.requestFullscreen()}>
          <Maximize2 size={15} />
          <span className="control-label">Fullscreen</span>
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
        .materials {
          position: absolute;
          display: flex;
          gap: 7px;
        }
        .controls {
          bottom: 18px;
          left: 18px;
        }
        .materials {
          top: 96px;
          right: 4.5vw;
          width: 208px;
          padding: 16px;
          flex-direction: column;
          gap: 4px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(24, 26, 23, 0.68);
          backdrop-filter: blur(12px);
        }
        .material-heading {
          display: grid;
          gap: 5px;
          padding: 0 3px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.19);
          margin-bottom: 5px;
        }
        .material-heading strong {
          color: #f1ece2;
          font: 500 20px/1 "Playfair Display", serif;
        }
        .controls button,
        .materials button {
          border: 1px solid rgba(255, 255, 255, 0.42);
          background: rgba(20, 24, 21, 0.72);
          color: #fff;
          padding: 9px 10px;
          display: flex;
          gap: 7px;
          align-items: center;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .materials .active {
          background: rgba(235, 229, 217, 0.92);
          color: #1b1b19;
        }
        .materials button:hover { border-color: rgba(255, 255, 255, 0.85); }
        .swatch { width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(255,255,255,.45); flex: 0 0 auto; }
        .materials .active .swatch { border-color: rgba(23,23,22,.4); }
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
          .control-label {
            display: none;
          }
          .hint {
            display: none;
          }
          .materials {
            top: 72px;
            right: 14px;
            width: 190px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

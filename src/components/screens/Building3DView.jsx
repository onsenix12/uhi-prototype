import React, { useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls, Html } from "@react-three/drei";
import { ChevronRight } from "lucide-react";
import { buildingHeatData, userBuilding } from "../../data/mockData";
import { getTempColor, formatTemp } from "../../utils/heatColors";
import HeatCanvas from "../HeatCanvas";
import TowerDetailsPanel from "../building3d/TowerDetailsPanel";
import HotspotSummary from "../building3d/HotspotSummary";
import BuildingOverview from "../building3d/BuildingOverview";
import SidePanelTip from "../building3d/SidePanelTip";

// Individual Tower Component
const Tower = ({ data, onHover, onSelect, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Simple procedural "window grid" texture using a small canvas
  const windowTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Base facade color (neutral gray, actual heat color comes from material tint)
    ctx.fillStyle = "#222831";
    ctx.fillRect(0, 0, size, size);

    const cols = 8;
    const rows = 12;
    const padding = 6;
    const cellW = size / cols;
    const cellH = size / rows;

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const x = i * cellW + padding;
        const y = j * cellH + padding;
        const w = cellW - padding * 2;
        const h = cellH - padding * 2;

        // Slight variation in window brightness
        const brightness = 180 + Math.floor(Math.random() * 40);
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.fillRect(x, y, w, h);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 4;

    return texture;
  }, []);

  // Calculate average temperature for tower color
  const avgTemp =
    Object.values(data.faces).reduce((sum, f) => sum + f.temp, 0) / 5;
  const baseColor = getTempColor(avgTemp);

  // Get the hottest face for highlight
  // (currently unused but kept for potential future use)
  // const hottestFace = Object.entries(data.faces).reduce(
  //   (max, [key, val]) => (val.temp > max.temp ? { key, ...val } : max),
  //   { temp: 0 }
  // );

  return (
    <group position={data.position}>
      {/* Main tower body */}
      <mesh
        castShadow
        receiveShadow
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(data);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
      >
        <boxGeometry args={[data.width, data.height, data.depth]} />
        <meshStandardMaterial
          color={isSelected ? "#3b82f6" : hovered ? "#60a5fa" : baseColor}
          map={windowTexture}
          metalness={0.4}
          roughness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Subtle base podium to ground the tower visually */}
      <mesh
        castShadow
        receiveShadow
        position={[0, -data.height / 2 + 0.4, 0]}
      >
        <boxGeometry args={[data.width * 1.15, 0.8, data.depth * 1.15]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.2}
          roughness={0.85}
        />
      </mesh>

      {/* Simple repeating balcony bands on one facade */}
      {Array.from({ length: 5 }).map((_, i) => {
        const levelY =
          -data.height / 2 + 1.5 + (i * data.height) / 5; // evenly spaced
        return (
          <mesh
            key={`balcony-${data.id}-${i}`}
            castShadow
            receiveShadow
            position={[0, levelY, data.depth / 2 + 0.25]}
          >
            <boxGeometry
              args={[data.width * 0.9, 0.18, Math.min(0.6, data.depth * 0.8)]}
            />
            <meshStandardMaterial
              color="#e5e7eb"
              metalness={0.1}
              roughness={0.7}
            />
          </mesh>
        );
      })}

      {/* Roof highlight (hottest part) */}
      <mesh position={[0, data.height / 2 + 0.1, 0]} castShadow>
        <boxGeometry args={[data.width, 0.2, data.depth]} />
        <meshStandardMaterial color={getTempColor(data.faces.roof.temp)} />
      </mesh>

      {/* Simple rooftop plant room / lift lobby */}
      <mesh
        castShadow
        receiveShadow
        position={[-data.width * 0.25, data.height / 2 + 0.7, -data.depth * 0.15]}
      >
        <boxGeometry
          args={[data.width * 0.55, 1.2, data.depth * 0.6]}
        />
        <meshStandardMaterial
          color="#374151"
          metalness={0.25}
          roughness={0.7}
        />
      </mesh>
      {/* Small rooftop water tank element */}
      <mesh
        castShadow
        receiveShadow
        position={[data.width * 0.4, data.height / 2 + 1.0, data.depth * 0.1]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.9, 16]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Tower label */}
      <Html
        position={[0, data.height / 2 + 1, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div className="bg-primary-800 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
          {data.name}
        </div>
      </Html>

      {/* Temperature label on hover */}
      {(hovered || isSelected) && (
        <Html position={[0, 0, data.depth / 2 + 0.5]} center>
          <div className="bg-white shadow-lg rounded-lg p-2 text-xs whitespace-nowrap">
            <div className="font-bold text-primary-800">
              {formatTemp(avgTemp)}
            </div>
            <div className="text-gray-500">avg surface temp</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Ground Level Element Component (pool, garden, carpark, entrance)
const GroundElement = ({ data, onHover }) => {
  const [hovered, setHovered] = useState(false);
  const color = getTempColor(data.temp);

  const isPool = data.id === "pool";
  const isGarden = data.id === "garden";
  const isCarpark = data.id === "carpark";

  return (
    <group position={data.position}>
      {/* Base clickable heat patch */}
      <mesh
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(data);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <boxGeometry args={data.size} />
        <meshStandardMaterial
          color={hovered ? "#60a5fa" : color}
          transparent
          opacity={isPool ? 0.6 : 0.8}
          metalness={isPool ? 0.7 : 0.1}
          roughness={isPool ? 0.2 : 0.8}
        />
      </mesh>

      {/* Extra visual context per element type */}
      {isGarden && (
        <group>
          {/* A few simple trees (cylinder trunk + cone canopy) */}
          {[[-1, 0, -0.5], [0.5, 0, 0.5], [1, 0, -1]].map((pos, idx) => (
            <group key={idx} position={pos}>
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#854d0e" />
              </mesh>
              <mesh position={[0, 1, 0]} castShadow>
                <coneGeometry args={[0.5, 1.2, 8]} />
                <meshStandardMaterial color="#15803d" />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {isCarpark && (
        <group>
          {/* Simple white parking lines */}
          {[ -2, -1, 0, 1, 2 ].map((x, idx) => (
            <mesh key={idx} position={[x, data.size[1] / 2 + 0.01, 0]} receiveShadow>
              <boxGeometry args={[0.1, 0.01, data.size[2] * 0.8]} />
              <meshStandardMaterial color="#e5e5e5" />
            </mesh>
          ))}
        </group>
      )}

      {isPool && (
        <group>
          {/* Slightly inset, more reflective water surface */}
          <mesh position={[0, data.size[1] / 2 + 0.01, 0]} receiveShadow>
            <boxGeometry args={[data.size[0] * 0.9, 0.02, data.size[2] * 0.9]} />
            <meshStandardMaterial
              color="#38bdf8"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      )}

      {hovered && (
        <Html center position={[0, 1, 0]}>
          <div className="bg-white shadow-lg rounded-lg p-2 text-xs whitespace-nowrap">
            <div className="font-bold text-primary-800">{data.name}</div>
            <div className="text-orange-500">{formatTemp(data.temp)}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Ground Plane with softer, neutral styling
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, 0]} receiveShadow>
    <planeGeometry args={[24, 24]} />
    <meshStandardMaterial
      color="#e5e7eb"
      emissive="#9ca3af"
      emissiveIntensity={0.08}
      roughness={0.9}
      metalness={0.05}
    />
  </mesh>
);

// 3D Scene Component
const BuildingScene = ({ onTowerSelect, selectedTower }) => {
  return (
    <>
      {/* Ground */}
      <Ground />

      {/* Towers */}
      {buildingHeatData.towers.map((tower) => (
        <Tower
          key={tower.id}
          data={tower}
          onHover={() => {}}
          onSelect={onTowerSelect}
          isSelected={selectedTower?.id === tower.id}
        />
      ))}

      {/* Ground level elements */}
      {buildingHeatData.groundLevel.map((element) => (
        <GroundElement
          key={element.id}
          data={element}
          onHover={() => {}}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={10}
        maxDistance={40}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};

// Main Component
const Building3DView = ({ onNavigate }) => {
  const [selectedTower, setSelectedTower] = useState(null);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-2 overflow-hidden">
      {/* 3D Canvas */}
      <div className="flex-1 relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <HeatCanvas camera={{ position: [15, 15, 15], fov: 50 }}>
            <BuildingScene
              onTowerSelect={setSelectedTower}
              selectedTower={selectedTower}
            />
          </HeatCanvas>

          {/* Slide-style title banner */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-wide">
              Conduct Thermal Comfort Study
            </p>
          </div>

          {/* Controls overlay */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Controls</p>
            <div className="flex gap-2 text-xs text-gray-600">
              <span>🖱️ Drag to rotate</span>
              <span>•</span>
              <span>Scroll to zoom</span>
              <span>•</span>
              <span>Click tower for details</span>
            </div>
          </div>

          {/* Heat Legend */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">
              Temperature Scale
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs">25°C</span>
              <div className="flex h-3 rounded overflow-hidden">
                <div
                  className="w-6"
                  style={{ backgroundColor: getTempColor(25) }}
                />
                <div
                  className="w-6"
                  style={{ backgroundColor: getTempColor(32) }}
                />
                <div
                  className="w-6"
                  style={{ backgroundColor: getTempColor(38) }}
                />
                <div
                  className="w-6"
                  style={{ backgroundColor: getTempColor(44) }}
                />
                <div
                  className="w-6"
                  style={{ backgroundColor: getTempColor(50) }}
                />
              </div>
              <span className="text-xs">50°C</span>
            </div>
          </div>
        </div>

      {/* Side Panel */}
      <div className="w-full lg:w-96 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-y-auto">
          {selectedTower ? (
            <TowerDetailsPanel
              tower={selectedTower}
              onClose={() => setSelectedTower(null)}
            />
          ) : (
            <>
              <HotspotSummary />
              <BuildingOverview />
              <SidePanelTip />
            </>
          )}

          <div className="p-4">
            <button
              type="button"
              onClick={() => onNavigate("interventions")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg font-medium"
            >
              Explore Interventions
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
      </div>
    </div>
  );
};

export default Building3DView;



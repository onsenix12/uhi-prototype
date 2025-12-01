import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Info, ChevronRight } from "lucide-react";
import { buildingHeatData, userBuilding } from "../../data/mockData";
import { getTempColor, formatTemp, getSeverityClass } from "../../utils/heatColors";

// Individual Tower Component
const Tower = ({ data, onHover, onSelect, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

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
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Roof highlight (hottest part) */}
      <mesh position={[0, data.height / 2 + 0.1, 0]}>
        <boxGeometry args={[data.width, 0.2, data.depth]} />
        <meshStandardMaterial color={getTempColor(data.faces.roof.temp)} />
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

// Ground Level Element Component
const GroundElement = ({ data, onHover }) => {
  const [hovered, setHovered] = useState(false);
  const color = getTempColor(data.temp);

  return (
    <mesh
      position={data.position}
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
        opacity={0.8}
      />
      {hovered && (
        <Html center position={[0, 1, 0]}>
          <div className="bg-white shadow-lg rounded-lg p-2 text-xs whitespace-nowrap">
            <div className="font-bold text-primary-800">{data.name}</div>
            <div className="text-orange-500">{formatTemp(data.temp)}</div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Ground Plane
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial color="#e5e7eb" />
  </mesh>
);

// 3D Scene Component
const BuildingScene = ({ onTowerSelect, selectedTower }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary-800 text-white py-4 px-6 pt-16">
        <h1 className="text-2xl font-bold">{userBuilding.name}</h1>
        <p className="text-primary-200">3D Heat Analysis View</p>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)]">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [15, 15, 15], fov: 50 }}
            style={{
              background:
                "linear-gradient(to bottom, #e0f2fe, #f0f9ff)",
            }}
          >
            <BuildingScene
              onTowerSelect={setSelectedTower}
              selectedTower={selectedTower}
            />
          </Canvas>

          {/* Controls overlay */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
            <p className="text-xs text-gray-500 mb-2">Controls</p>
            <div className="flex gap-2 text-xs text-gray-600">
              <span>🖱️ Drag to rotate</span>
              <span>•</span>
              <span>Scroll to zoom</span>
              <span>•</span>
              <span>Click tower for details</span>
            </div>
          </div>

          {/* Heat Legend */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
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
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
          {/* Tower Details (when selected) */}
          {selectedTower ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary-800">
                  {selectedTower.name}
                </h2>
                <button
                  onClick={() => setSelectedTower(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                {selectedTower.floors} floors •{" "}
                {selectedTower.width * selectedTower.depth * 10} sqm
                footprint
              </div>

              {/* Face temperatures */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">
                  Surface Temperatures
                </h3>
                {Object.entries(selectedTower.faces).map(
                  ([key, face]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {face.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {face.description}
                        </div>
                      </div>
                      <div
                        className="text-lg font-bold px-3 py-1 rounded"
                        style={{
                          backgroundColor: `${getTempColor(
                            face.temp
                          )}20`,
                          color:
                            face.temp > 38
                              ? "#dc2626"
                              : face.temp > 34
                              ? "#ea580c"
                              : "#16a34a",
                        }}
                      >
                        {face.temp}°C
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Hotspot Summary */}
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-primary-800 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Hotspot Summary
                </h2>
                <div className="space-y-2">
                  {buildingHeatData.hotspots.map((hotspot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {hotspot.area}
                        </div>
                        <div className="text-orange-600 font-medium">
                          {hotspot.temp}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getSeverityClass(
                          hotspot.severity
                        )}`}
                      >
                        {hotspot.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Building Overview */}
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-700 mb-3">
                  Building Overview
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-500">Towers</div>
                    <div className="font-bold text-primary-800">
                      {buildingHeatData.towers.length}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-500">Total Floors</div>
                    <div className="font-bold text-primary-800">
                      {buildingHeatData.towers.reduce(
                        (sum, t) => sum + t.floors,
                        0
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-500">Avg Roof Temp</div>
                    <div className="font-bold text-orange-500">
                      {(
                        buildingHeatData.towers.reduce(
                          (sum, t) => sum + t.faces.roof.temp,
                          0
                        ) / 3
                      ).toFixed(1)}
                      °C
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-500">Worst Area</div>
                    <div className="font-bold text-red-500">Carpark</div>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="p-4 border-b bg-blue-50">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Click on any tower to see
                  detailed surface temperatures for each face.
                </p>
              </div>
            </>
          )}

          {/* Action Button */}
          <div className="p-4">
            <button
              onClick={() => onNavigate("interventions")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
            >
              Explore Interventions
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Building3DView;



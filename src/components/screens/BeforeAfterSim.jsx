import React, { useMemo, useState } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import {
  GitCompare,
  ChevronRight,
  TrendingDown,
  Award,
  Check,
} from "lucide-react";
import {
  buildingHeatData,
  buildingHeatDataAfter,
  userBuilding,
  interventions,
} from "../../data/mockData";
import { getTempColor } from "../../utils/heatColors";
import HeatCanvas from "../HeatCanvas";

// Helper: derive an "after" dataset depending on selected intervention
const getAfterDataForIntervention = (intervention) => {
  if (!intervention) return buildingHeatDataAfter;

  switch (intervention.id) {
    case "cool-coating":
      // Use detailed cool-roof scenario
      return buildingHeatDataAfter;
    case "cool-pavement": {
      // Focus cooling on carpark/ground surfaces; towers remain as before
      const base = buildingHeatData;
      return {
        ...base,
        groundLevel: base.groundLevel.map((element) => {
          if (element.id === "carpark") {
            const reduced =
              element.temp - (intervention.tempReduction || 2);
            return {
              ...element,
              temp: Math.max(reduced, 26),
            };
          }
          return element;
        }),
      };
    }
    default:
      // For other interventions, reuse the cool-roof scenario but add disclaimer in UI
      return buildingHeatDataAfter;
  }
};

// Simplified Building for comparison view
const SimplifiedBuilding = ({ data, variant, roofBeforeById, roofAfterById }) => {
  const isAfter = variant === "after";

  return (
    <>
      {/* Ground plane (match main 3D view styling for consistency) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#9ca3af"
          emissiveIntensity={0.08}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Towers */}
      {data.towers.map((tower) => {
        const avgTemp =
          Object.values(tower.faces).reduce((sum, f) => sum + f.temp, 0) / 5;
        const roofTemp = tower.faces.roof.temp;
        const roofBefore = roofBeforeById[tower.id];
        const roofAfter = roofAfterById[tower.id];
        const roofDelta =
          typeof roofBefore === "number" && typeof roofAfter === "number"
            ? roofBefore - roofAfter
            : null;

        return (
          <group key={tower.id} position={tower.position}>
            <mesh>
              <boxGeometry args={[tower.width, tower.height, tower.depth]} />
              <meshStandardMaterial color={getTempColor(avgTemp)} />
            </mesh>
            {/* Roof */}
            <mesh position={[0, tower.height / 2 + 0.1, 0]}>
              <boxGeometry args={[tower.width, 0.2, tower.depth]} />
              <meshStandardMaterial
                // Slightly exaggerate cooling effect visually in AFTER view
                color={getTempColor(isAfter ? roofTemp - 2 : roofTemp)}
              />
            </mesh>

            {/* Clear label showing where improvement is applied (rooftops) */}
            {isAfter && roofDelta !== null && roofDelta > 0 && (
              <Html position={[0, tower.height / 2 + 1.2, 0]} center>
                <div className="bg-white/95 border border-green-200 rounded-lg px-2 py-1 text-[10px] shadow-md whitespace-nowrap">
                  <span className="font-semibold text-green-700">
                    Roof cooled {roofDelta.toFixed(1)}°C
                  </span>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Ground elements */}
      {data.groundLevel.map((element) => (
        <mesh key={element.id} position={element.position}>
          <boxGeometry args={element.size} />
          <meshStandardMaterial
            color={getTempColor(element.temp)}
            opacity={0.8}
            transparent
          />
        </mesh>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
};

const BeforeAfterSim = ({ onNavigate, selectedIntervention }) => {
  const [viewMode, setViewMode] = useState("split"); // 'split', 'before', 'after', 'slider'
  const [sliderPosition, setSliderPosition] = useState(50);

  // Use the selected intervention or default to first one
  const intervention = selectedIntervention || interventions[0];

  // Derive AFTER dataset for current intervention
  const afterData = useMemo(
    () => getAfterDataForIntervention(intervention),
    [intervention]
  );

  // Roof temperature maps for delta labels
  const roofBeforeById = useMemo(() => {
    const map = {};
    buildingHeatData.towers.forEach((tower) => {
      map[tower.id] = tower.faces.roof.temp;
    });
    return map;
  }, []);

  const roofAfterById = useMemo(() => {
    const map = {};
    afterData.towers.forEach((tower) => {
      map[tower.id] = tower.faces.roof.temp;
    });
    return map;
  }, [afterData]);

  // Calculate improvements
  const beforeAvgRoof =
    buildingHeatData.towers.reduce((sum, t) => sum + t.faces.roof.temp, 0) / 3;
  const afterAvgRoof =
    afterData.towers.reduce(
      (sum, t) => sum + t.faces.roof.temp,
      0
    ) / 3;
  const tempImprovement = beforeAvgRoof - afterAvgRoof;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Info Banner */}
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 mb-2 mx-2 mt-2 px-6 py-3">
        <p className="text-blue-700 text-xs">
          3D before/after visuals are illustrative. Detailed cooling effects are shown
          for Cool Roof Coating and Cool Pavement; other options reuse the cool roof
          scenario.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mb-2 mx-2">
        <div className="px-6 py-3">
          <div className="flex gap-2">
            {["split", "slider", "before", "after"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                  viewMode === mode
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:shadow-md"
                }`}
              >
                {mode === "split" ? "Side by Side" : mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {/* 3D Comparison View */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-3">
          {viewMode === "split" ? (
            <div className="grid grid-cols-2 divide-x">
              {/* Before */}
              <div>
                <div className="bg-red-50 px-4 py-2 text-center">
                  <span className="text-red-700 font-bold">BEFORE</span>
                  <span className="text-red-600 text-sm ml-2">
                    Current State
                  </span>
                </div>
                <div style={{ height: "350px" }}>
                  <HeatCanvas camera={{ position: [10, 10, 10], fov: 50 }}>
                    <SimplifiedBuilding
                      data={buildingHeatData}
                      variant="before"
                      roofBeforeById={roofBeforeById}
                      roofAfterById={roofAfterById}
                    />
                  </HeatCanvas>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="bg-green-50 px-4 py-2 text-center">
                  <span className="text-green-700 font-bold">AFTER</span>
                  <span className="text-green-600 text-sm ml-2">
                    {intervention.name}
                  </span>
                </div>
                <div style={{ height: "350px" }}>
                  <HeatCanvas camera={{ position: [10, 10, 10], fov: 50 }}>
                    <SimplifiedBuilding
                      data={afterData}
                      variant="after"
                      roofBeforeById={roofBeforeById}
                      roofAfterById={roofAfterById}
                    />
                  </HeatCanvas>
                </div>
              </div>
            </div>
          ) : viewMode === "slider" ? (
            <div className="relative" style={{ height: "400px" }}>
              {/* Before (full width) */}
              <div className="absolute inset-0">
                <HeatCanvas camera={{ position: [12, 12, 12], fov: 50 }}>
                  <SimplifiedBuilding
                    data={buildingHeatData}
                    variant="before"
                    roofBeforeById={roofBeforeById}
                    roofAfterById={roofAfterById}
                  />
                </HeatCanvas>
              </div>

              {/* After (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  style={{
                    width: `${100 / (sliderPosition / 100)}%`,
                    height: "100%",
                  }}
                >
                  <HeatCanvas camera={{ position: [12, 12, 12], fov: 50 }}>
                    <SimplifiedBuilding
                      data={afterData}
                      variant="after"
                      roofBeforeById={roofBeforeById}
                      roofAfterById={roofAfterById}
                    />
                  </HeatCanvas>
                </div>
              </div>

              {/* Slider control */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center"
                style={{
                  left: `${sliderPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <GitCompare className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Slider input */}
              <input
                type="range"
                min="10"
                max="90"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64"
              />

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                BEFORE
              </div>
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                AFTER
              </div>
            </div>
          ) : (
            /* Single view (before or after) */
              <div style={{ height: "400px" }}>
                <div
                  className={`${
                    viewMode === "before" ? "bg-red-50" : "bg-green-50"
                  } px-4 py-2 text-center`}
                >
                  <span
                    className={`${
                      viewMode === "before"
                        ? "text-red-700"
                        : "text-green-700"
                    } font-bold uppercase`}
                  >
                    {viewMode}
                  </span>
                </div>
                <HeatCanvas camera={{ position: [12, 12, 12], fov: 50 }}>
                  {viewMode === "before" ? (
                    <SimplifiedBuilding
                      data={buildingHeatData}
                      variant="before"
                      roofBeforeById={roofBeforeById}
                      roofAfterById={roofAfterById}
                    />
                  ) : (
                    <SimplifiedBuilding
                      data={afterData}
                      variant="after"
                      roofBeforeById={roofBeforeById}
                      roofAfterById={roofAfterById}
                    />
                  )}
                </HeatCanvas>
              </div>
          )}
        </div>

        {/* Projected Outcomes */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-3">
          <h2 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            Projected Outcomes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                -{intervention.tempReduction}°C
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Temperature Reduction
              </div>
              <div className="text-xs text-gray-400">on treated areas</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                ~{intervention.energySavings}%
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Energy Savings
              </div>
              <div className="text-xs text-gray-400">reduced AC load</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                $
                {(
                  (intervention.energySavings / 100) *
                  80000
                ).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Annual Savings
              </div>
              <div className="text-xs text-gray-400">estimated</div>
            </div>

            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">
                {intervention.carbonReduction}t
              </div>
              <div className="text-sm text-gray-600 mt-1">
                CO₂ Reduction
              </div>
              <div className="text-xs text-gray-400">per year</div>
            </div>
          </div>

          {/* Roof temperature improvement using tempImprovement */}
          <div className="mt-4 text-sm text-gray-600">
            Based on the 3D model, average rooftop temperature improves by{" "}
            <span className="font-semibold text-green-700">
              -{tempImprovement.toFixed(1)}°C
            </span>
            {" "}after applying {intervention.name}.
          </div>

          {/* Ranking Improvement */}
          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  District Ranking Improvement
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">
                      #12
                    </div>
                    <div className="text-xs text-gray-400">Current</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      #7
                    </div>
                    <div className="text-xs text-gray-400">Projected</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">
                  Top 50% Potential
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-3">
          <h2 className="text-xl font-bold text-primary-800 mb-4">
            Investment Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Estimated Cost</span>
                <span className="font-medium">
                  $
                  {intervention.costRange[0].toLocaleString()} - $
                  {intervention.costRange[1].toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">
                  Grant ({intervention.grantName})
                </span>
                <span className="font-medium text-green-600">
                  -{intervention.grantPercent}%
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Net Cost (after grant)</span>
                <span className="font-bold text-primary-800">
                  $
                  {(
                    intervention.costRange[0] *
                    (1 - intervention.grantPercent / 100)
                  ).toLocaleString()}{" "}
                  - $
                  {(
                    intervention.costRange[1] *
                    (1 - intervention.grantPercent / 100)
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Payback Period</span>
                <span className="font-medium">
                  {intervention.roiYears} years
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-700 mb-3">
                What&apos;s Included
              </h3>
              <ul className="space-y-2">
                {[
                  "Professional heat assessment",
                  "Material and installation",
                  "5-year performance warranty",
                  "Post-installation monitoring",
                  "Certification documentation",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("interventions")}
            className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all font-medium"
          >
            Compare Other Options
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("grant")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all"
          >
            Apply for Grant
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSim;



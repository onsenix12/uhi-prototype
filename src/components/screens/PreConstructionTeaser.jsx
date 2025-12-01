import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  HardHat,
  Lightbulb,
  Check,
  X,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { preConstructionData } from "../../data/mockData";
import { getTempColor } from "../../utils/heatColors";

// Simplified building for design comparison
const DesignModel = ({ isOptimized }) => {
  const rotation = isOptimized ? Math.PI * 0.08 : 0; // ~15 degrees rotation

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {/* Wind corridor visualization (only for optimized) */}
      {isOptimized && (
        <>
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2, 14]} />
            <meshStandardMaterial
              color="#93c5fd"
              transparent
              opacity={0.4}
            />
          </mesh>
          {/* Wind arrows */}
          {[-5, -2, 1, 4].map((z) => (
            <mesh key={z} position={[0, 0.2, z]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.2, 0.5, 8]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
          ))}
        </>
      )}

      {/* Green buffer (only for optimized) */}
      {isOptimized && (
        <>
          <mesh position={[-5, 0.3, 0]}>
            <boxGeometry args={[2, 0.6, 10]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <mesh position={[5, 0.3, 0]}>
            <boxGeometry args={[2, 0.6, 10]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
        </>
      )}

      {/* Building towers */}
      <group rotation={[0, rotation, 0]}>
        {/* Tower A */}
        <mesh position={[-2.5, 6, -2]}>
          <boxGeometry args={[2.5, 12, 2.5]} />
          <meshStandardMaterial
            color={getTempColor(isOptimized ? 32 : 38)}
          />
        </mesh>

        {/* Tower B */}
        <mesh position={[0, 7.5, 2]}>
          <boxGeometry args={[2.5, 15, 2.5]} />
          <meshStandardMaterial
            color={getTempColor(isOptimized ? 31 : 39)}
          />
        </mesh>

        {/* Tower C */}
        <mesh position={[2.5, 5, -2]}>
          <boxGeometry args={[2.5, 10, 2.5]} />
          <meshStandardMaterial
            color={getTempColor(isOptimized ? 33 : 40)}
          />
        </mesh>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

const PreConstructionTeaser = ({ onNavigate }) => {
  const [selectedView, setSelectedView] = useState("comparison"); // 'comparison', 'original', 'optimized'

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary-800 text-white py-4 px-6 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <HardHat className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Design for Cool</h1>
          </div>
          <p className="text-primary-200">
            AI-optimized design for new developments
          </p>
        </div>
      </div>

      {/* Intro Banner */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">
                What if Palm Gardens had this data BEFORE construction?
              </p>
              <p className="text-blue-600 text-sm">
                This preview shows how AI simulation can optimize building
                design for heat resilience from day one - the same
                technology HDB uses (DUCT), extended to private
                developments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "comparison", label: "Side by Side" },
            { id: "original", label: "Original Design" },
            { id: "optimized", label: "Optimized Design" },
          ].map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setSelectedView(view.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedView === view.id
                  ? "bg-primary-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* 3D Comparison */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {selectedView === "comparison" ? (
            <div className="grid grid-cols-2 divide-x">
              {/* Original */}
              <div>
                <div className="bg-red-50 px-4 py-2 text-center border-b">
                  <span className="text-red-700 font-bold">
                    ORIGINAL DESIGN
                  </span>
                </div>
                <div style={{ height: "350px" }}>
                  <Canvas camera={{ position: [12, 12, 12], fov: 50 }}>
                    <DesignModel isOptimized={false} />
                  </Canvas>
                </div>
                <div className="p-4 bg-red-50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      +2.3°C
                    </div>
                    <div className="text-sm text-red-500">
                      Predicted heat impact
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimized */}
              <div>
                <div className="bg-green-50 px-4 py-2 text-center border-b">
                  <span className="text-green-700 font-bold">
                    AI-OPTIMIZED DESIGN
                  </span>
                </div>
                <div style={{ height: "350px" }}>
                  <Canvas camera={{ position: [12, 12, 12], fov: 50 }}>
                    <DesignModel isOptimized />
                  </Canvas>
                </div>
                <div className="p-4 bg-green-50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +0.8°C
                    </div>
                    <div className="text-sm text-green-500">
                      Predicted heat impact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`${
                  selectedView === "original" ? "bg-red-50" : "bg-green-50"
                } px-4 py-2 text-center border-b`}
              >
                <span
                  className={`${
                    selectedView === "original"
                      ? "text-red-700"
                      : "text-green-700"
                  } font-bold uppercase`}
                >
                  {selectedView} Design
                </span>
              </div>
              <div style={{ height: "400px" }}>
                <Canvas camera={{ position: [14, 14, 14], fov: 50 }}>
                  <DesignModel isOptimized={selectedView === "optimized"} />
                </Canvas>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-primary-800">
              Design Comparison
            </h2>
          </div>

          <div className="divide-y">
            {[
              {
                feature: "Building Orientation",
                original: preConstructionData.original.orientation,
                optimized: preConstructionData.optimized.orientation,
                originalBad: true,
              },
              {
                feature: "Wind Corridor",
                original: preConstructionData.original.windCorridor
                  ? "Included"
                  : "Not considered",
                optimized: preConstructionData.optimized.windCorridor
                  ? "Central wind corridor"
                  : "Not considered",
                originalBad: true,
              },
              {
                feature: "Green Buffer",
                original: preConstructionData.original.greenBuffer
                  ? "Included"
                  : "Minimal landscaping",
                optimized: preConstructionData.optimized.greenBuffer
                  ? "Perimeter green buffer"
                  : "Not included",
                originalBad: true,
              },
              {
                feature: "Predicted Temperature",
                original: `+${preConstructionData.original.predictedTemp}°C above baseline`,
                optimized: `+${preConstructionData.optimized.predictedTemp}°C above baseline`,
                originalBad: true,
              },
              {
                feature: "Natural Ventilation",
                original: "Standard",
                optimized: "18% better natural ventilation",
                originalBad: false,
              },
              {
                feature: "Green Mark Score",
                original: "Gold",
                optimized: "Platinum potential",
                originalBad: false,
              },
            ].map((row) => (
              <div key={row.feature} className="grid grid-cols-3 divide-x">
                <div className="p-4 bg-gray-50 font-medium text-gray-700">
                  {row.feature}
                </div>
                <div className="p-4 flex items-center gap-2">
                  {row.originalBad && (
                    <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={
                      row.originalBad ? "text-red-600" : "text-gray-600"
                    }
                  >
                    {row.original}
                  </span>
                </div>
                <div className="p-4 flex items-center gap-2 bg-green-50">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-green-700 font-medium">
                    {row.optimized}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-primary-800 mb-4">
            Benefits of AI-Optimized Design
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {preConstructionData.optimized.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {benefit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Message */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-700 rounded-xl p-6 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Prevention is Better Than Cure
              </h3>
              <p className="opacity-90">
                This is what HDB&apos;s Digital Urban Climate Twin (DUCT)
                does for public housing. Our proposal extends this
                capability to private developments, ensuring all new
                buildings are designed for heat resilience from day one.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm opacity-75">
                <span>Learn more about DUCT</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-primary-800">
                Interested in heat-optimized design?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Contact our team to learn how AI simulation can improve
                your development plans.
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors flex items-center gap-2"
            >
              Get in Touch
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreConstructionTeaser;



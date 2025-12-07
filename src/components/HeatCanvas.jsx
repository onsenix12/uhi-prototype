import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

const HeatCanvas = ({
  children,
  camera = { position: [12, 12, 12], fov: 50 },
  style,
}) => {
  const baseStyle = {
    width: "100%",
    height: "100%",
    // Softer, less saturated background (cool-neutral vignette)
    background:
      "radial-gradient(circle at center, #f9fafb 0%, #e5e7eb 35%, #cbd5f5 70%, #1e293b 100%)",
    ...style,
  };

  return (
    <Canvas
      camera={camera}
      style={baseStyle}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      {/* Shared modern lighting & subtle depth */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Subtle atmospheric depth */}
      <fog attach="fog" args={["#1f2937", 24, 80]} />
      {/* Realistic environment reflections/lighting */}
      <Environment preset="city" />
      {children}
    </Canvas>
  );
};

export default HeatCanvas;


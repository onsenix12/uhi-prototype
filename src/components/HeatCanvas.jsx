import React from "react";
import { Canvas } from "@react-three/fiber";

const HeatCanvas = ({
  children,
  camera = { position: [12, 12, 12], fov: 50 },
  style,
}) => {
  const baseStyle = {
    width: "100%",
    height: "100%",
    // Warm, radial heat-field background similar to slide
    background:
      "radial-gradient(circle at center, #fed7aa 0%, #fb923c 35%, #c2410c 70%, #7c2d12 100%)",
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
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[14, 18, 10]}
        intensity={1}
        castShadow
        color="#fde68a"
      />
      <directionalLight position={[-12, 10, -8]} intensity={0.35} color="#fecaca" />
      {/* Subtle atmospheric depth */}
      <fog attach="fog" args={["#7c2d12", 24, 80]} />
      {children}
    </Canvas>
  );
};

export default HeatCanvas;


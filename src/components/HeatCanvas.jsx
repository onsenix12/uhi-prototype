import React from "react";
import { Canvas } from "@react-three/fiber";

const HeatCanvas = ({ children, camera = { position: [12, 12, 12], fov: 50 }, style }) => {
  const baseStyle = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, #e0f2fe, #f0f9ff)",
    ...style,
  };

  return (
    <Canvas camera={camera} style={baseStyle}>
      {/* Basic shared lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />
      {children}
    </Canvas>
  );
};

export default HeatCanvas;



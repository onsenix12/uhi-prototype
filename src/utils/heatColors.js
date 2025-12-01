/**
 * Maps temperature to a color on a gradient scale
 * @param {number} temp - Temperature in Celsius
 * @param {number} min - Minimum temperature (default 25°C - comfortable)
 * @param {number} max - Maximum temperature (default 50°C - extreme)
 * @returns {string} - Hex color code
 */
export const getTempColor = (temp, min = 25, max = 50) => {
  // Normalize temperature to 0-1 range
  const normalized = Math.max(0, Math.min(1, (temp - min) / (max - min)));

  // Color stops: green -> yellow -> orange -> red
  if (normalized < 0.25) {
    // Green to light green
    return interpolateColor("#22c55e", "#84cc16", normalized / 0.25);
  } else if (normalized < 0.5) {
    // Light green to yellow
    return interpolateColor("#84cc16", "#eab308", (normalized - 0.25) / 0.25);
  } else if (normalized < 0.75) {
    // Yellow to orange
    return interpolateColor("#eab308", "#f97316", (normalized - 0.5) / 0.25);
  } else {
    // Orange to red
    return interpolateColor("#f97316", "#ef4444", (normalized - 0.75) / 0.25);
  }
};

/**
 * Interpolate between two hex colors
 */
const interpolateColor = (color1, color2, factor) => {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

/**
 * Get status color based on temperature difference
 */
export const getStatusColor = (status) => {
  const colors = {
    cool: "#22c55e", // Green
    mild: "#84cc16", // Light green
    warm: "#eab308", // Yellow
    hot: "#f97316", // Orange
    extreme: "#ef4444", // Red
  };
  return colors[status] || "#6b7280";
};

/**
 * Get Tailwind class for status
 */
export const getStatusClass = (status) => {
  const classes = {
    cool: "bg-green-500",
    mild: "bg-lime-500",
    warm: "bg-yellow-500",
    hot: "bg-orange-500",
    extreme: "bg-red-500",
  };
  return classes[status] || "bg-gray-500";
};

/**
 * Get text color class for status (for contrast)
 */
export const getStatusTextClass = (status) => {
  const classes = {
    cool: "text-green-500",
    mild: "text-lime-500",
    warm: "text-yellow-500",
    hot: "text-orange-500",
    extreme: "text-red-500",
  };
  return classes[status] || "text-gray-500";
};

/**
 * Get status label
 */
export const getStatusLabel = (tempDiff) => {
  if (tempDiff <= 1.0) return { status: "cool", label: "Cool" };
  if (tempDiff <= 1.5) return { status: "mild", label: "Mild" };
  if (tempDiff <= 2.0) return { status: "warm", label: "Warm" };
  if (tempDiff <= 2.5) return { status: "hot", label: "Hot" };
  return { status: "extreme", label: "Extreme" };
};

/**
 * Convert hex to RGB for Three.js
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Format temperature display
 */
export const formatTemp = (temp, showPlus = true) => {
  const sign = temp > 0 && showPlus ? "+" : "";
  return `${sign}${temp.toFixed(1)}°C`;
};

/**
 * Get severity badge class
 */
export const getSeverityClass = (severity) => {
  const classes = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };
  return classes[severity] || "bg-gray-100 text-gray-800";
};



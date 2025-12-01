import React from "react";
import { getTempColor } from "../../utils/heatColors";

const TowerDetailsPanel = ({ tower, onClose }) => {
  if (!tower) return null;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary-800">{tower.name}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {tower.floors} floors • {tower.width * tower.depth * 10} sqm footprint
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Surface Temperatures</h3>
        {Object.entries(tower.faces).map(([key, face]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="font-medium text-gray-800">{face.label}</div>
              <div className="text-xs text-gray-500">{face.description}</div>
            </div>
            <div
              className="text-lg font-bold px-3 py-1 rounded"
              style={{
                backgroundColor: `${getTempColor(face.temp)}20`,
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
        ))}
      </div>
    </div>
  );
};

export default TowerDetailsPanel;



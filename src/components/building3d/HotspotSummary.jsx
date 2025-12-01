import React from "react";
import { Info } from "lucide-react";
import { getSeverityClass } from "../../utils/heatColors";
import { buildingHeatData } from "../../data/mockData";

const HotspotSummary = () => {
  return (
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
  );
};

export default HotspotSummary;



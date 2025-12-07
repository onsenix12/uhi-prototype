import React from "react";

const StatsBar = ({ estates, districtAvg }) => {
  if (!estates?.length) return null;

  const bestEstate = estates[0];
  const worstEstate = estates[estates.length - 1];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 mb-4 mx-6">
      <div className="px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-700">
              {estates.length}
            </div>
            <div className="text-xs text-gray-600 font-medium">Estates Monitored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              +{districtAvg.toFixed(1)}°C
            </div>
            <div className="text-xs text-gray-600 font-medium">District Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              +{bestEstate.tempDiff}°C
            </div>
            <div className="text-xs text-gray-600 font-medium">Best Performer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              +{worstEstate.tempDiff}°C
            </div>
            <div className="text-xs text-gray-600 font-medium">Needs Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;



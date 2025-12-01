import React from "react";

const StatsBar = ({ estates, districtAvg }) => {
  if (!estates?.length) return null;

  const bestEstate = estates[0];
  const worstEstate = estates[estates.length - 1];

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-800">
              {estates.length}
            </div>
            <div className="text-sm text-gray-500">Estates Monitored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              +{districtAvg.toFixed(1)}°C
            </div>
            <div className="text-sm text-gray-500">District Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              +{bestEstate.tempDiff}°C
            </div>
            <div className="text-sm text-gray-500">Best Performer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              +{worstEstate.tempDiff}°C
            </div>
            <div className="text-sm text-gray-500">Needs Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;



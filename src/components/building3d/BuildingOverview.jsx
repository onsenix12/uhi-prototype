import React from "react";
import { buildingHeatData } from "../../data/mockData";

const BuildingOverview = () => {
  const totalFloors = buildingHeatData.towers.reduce(
    (sum, t) => sum + t.floors,
    0
  );
  const avgRoofTemp = (
    buildingHeatData.towers.reduce(
      (sum, t) => sum + t.faces.roof.temp,
      0
    ) / buildingHeatData.towers.length
  ).toFixed(1);

  return (
    <div className="p-4 border-b">
      <h3 className="font-medium text-gray-700 mb-3">Building Overview</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Towers</div>
          <div className="font-bold text-primary-800">
            {buildingHeatData.towers.length}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Total Floors</div>
          <div className="font-bold text-primary-800">{totalFloors}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Avg Roof Temp</div>
          <div className="font-bold text-orange-500">{avgRoofTemp}°C</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Worst Area</div>
          <div className="font-bold text-red-500">Carpark</div>
        </div>
      </div>
    </div>
  );
};

export default BuildingOverview;



import React from "react";
import { Building2, ChevronRight } from "lucide-react";
import { formatTemp } from "../../utils/heatColors";

const YourEstatePanel = ({
  userEstate,
  estatesCount,
  districtAvg,
  bestTempDiff,
  onNavigate,
}) => {
  if (!userEstate) return null;

  return (
    <div className="w-full lg:w-80">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 lg:sticky lg:top-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-primary-700" />
          <h3 className="font-bold text-primary-800">Your Estate</h3>
        </div>

        <div className="text-center py-4 border-b">
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {formatTemp(userEstate.tempDiff)}
          </div>
          <div className="text-sm text-gray-500">above baseline</div>
          <div className="mt-2 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            Rank #{userEstate.rank} of {estatesCount}
          </div>
        </div>

        <div className="py-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">vs District Average</span>
            <span
              className={
                userEstate.tempDiff > districtAvg
                  ? "text-red-600 font-medium"
                  : "text-green-600 font-medium"
              }
            >
              {formatTemp(userEstate.tempDiff - districtAvg, false)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">vs Best Performer</span>
            <span className="text-red-600 font-medium">
              {formatTemp(userEstate.tempDiff - bestTempDiff, false)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Percentile</span>
            <span className="text-orange-600 font-medium">
              Bottom {Math.round((userEstate.rank / estatesCount) * 100)}%
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-4">
            Your estate has potential for significant improvement. View your
            building&apos;s heat map to identify hotspots.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("building")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-400/80 to-cyan-400/80 backdrop-blur-sm text-white rounded-xl hover:from-teal-500 hover:to-cyan-500 shadow-lg hover:shadow-xl transition-all font-medium border border-white/30"
          >
            View 3D Building Analysis
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourEstatePanel;



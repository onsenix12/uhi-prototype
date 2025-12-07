import React, { useState } from "react";
import {
  Lightbulb,
  Star,
  DollarSign,
  Clock,
  Leaf,
  ChevronRight,
  CheckCircle,
  Info,
} from "lucide-react";
import { interventions, userBuilding } from "../../data/mockData";

const InterventionOptions = ({ onNavigate, onSelectIntervention }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (intervention) => {
    setSelectedId(intervention.id);
    onSelectIntervention?.(intervention);
  };

  const handleProceed = () => {
    const selected = interventions.find((i) => i.id === selectedId);
    if (selected) {
      onSelectIntervention?.(selected);
      onNavigate?.("simulation");
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* AI Analysis Banner */}
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 mb-2 mx-2 mt-2">
        <div className="px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-800 font-semibold text-sm">
                Based on your building&apos;s heat profile
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Our AI has analyzed your hotspots (rooftop: 45°C, west
                walls: 38-40°C) and recommends the following
                interventions ranked by cost-effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {/* Intervention Cards */}
        <div className="space-y-3 mb-6">
          {interventions.map((intervention) => (
            <div
              key={intervention.id}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all border ${
                selectedId === intervention.id
                  ? "ring-2 ring-teal-400 shadow-2xl border-teal-200"
                  : "border-white/50 hover:shadow-xl hover:border-teal-100"
              }`}
              onClick={() => handleSelect(intervention)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Selection indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                      selectedId === intervention.id
                        ? "border-teal-500 bg-teal-500 shadow-lg"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedId === intervention.id && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-primary-800">
                          {intervention.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {intervention.description}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < intervention.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Target areas */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {intervention.targetAreas.map((area) => (
                        <span
                          key={area}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
                          <Leaf className="w-4 h-4" />
                          Cooling
                        </div>
                        <div className="text-xl font-bold text-green-700">
                          -{intervention.tempReduction}°C
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-blue-600 text-sm mb-1">
                          <DollarSign className="w-4 h-4" />
                          Est. Cost
                        </div>
                        <div className="text-lg font-bold text-blue-700">
                          $
                          {(intervention.costRange[0] / 1000).toFixed(
                            0
                          )}
                          -
                          {(intervention.costRange[1] / 1000).toFixed(
                            0
                          )}
                          k
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-purple-600 text-sm mb-1">
                          <DollarSign className="w-4 h-4" />
                          Grant
                        </div>
                        <div className="text-lg font-bold text-purple-700">
                          {intervention.grantPercent}%
                        </div>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-orange-600 text-sm mb-1">
                          <Clock className="w-4 h-4" />
                          ROI
                        </div>
                        <div className="text-lg font-bold text-orange-700">
                          {intervention.roiYears} yrs
                        </div>
                      </div>
                    </div>

                    {/* Additional Benefits */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>
                        ⚡ {intervention.energySavings}% energy savings
                      </span>
                      <span>
                        🌱 {intervention.carbonReduction} tonnes CO₂/year
                      </span>
                      <span>🔧 {intervention.implementationTime}</span>
                    </div>

                    {/* Grant Info */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <span className="text-gray-500">
                          Eligible for:{" "}
                        </span>
                        <span className="text-primary-700 font-medium">
                          {intervention.grantName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("building")}
            className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all font-medium"
          >
            Back to Building View
          </button>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!selectedId}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              selectedId
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl"
                : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
            }`}
          >
            Simulate Impact
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Help Text */}
        {!selectedId && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Select an intervention above to see the simulated before/after
            impact
          </p>
        )}
      </div>
    </div>
  );
};

export default InterventionOptions;



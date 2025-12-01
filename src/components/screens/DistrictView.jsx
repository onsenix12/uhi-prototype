import React, { useState } from "react";
import {
  Map as MapIcon,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { bishanEstates } from "../../data/mockData";
import { getStatusColor, formatTemp } from "../../utils/heatColors";
import { getDistrictAverage, getUserEstate } from "../../utils/district";
import StatsBar from "../district/StatsBar";
import YourEstatePanel from "../district/YourEstatePanel";

const DistrictView = ({ onNavigate }) => {
  const [hoveredEstate, setHoveredEstate] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'

  const districtAvg = getDistrictAverage(bishanEstates);
  const userEstate = getUserEstate(bishanEstates);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary-800 text-white py-4 px-6 pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <MapIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Bishan District</h1>
          </div>
          <p className="text-primary-200">Heat Performance Comparison</p>
        </div>
      </div>

      {/* Stats Bar */}
      <StatsBar estates={bishanEstates} districtAvg={districtAvg} />

      {/* View Toggle */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "map"
                ? "bg-primary-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Map View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "list"
                ? "bg-primary-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Ranking View
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map / Visualization */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-lg font-bold text-primary-800 mb-4">
                  District Heat Map
                </h2>

                {/* Simplified Map Visualization */}
                <div
                  className="relative bg-gradient-to-br from-green-50 to-orange-50 rounded-lg"
                  style={{ height: "400px" }}
                >
                  {/* Grid lines for reference */}
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full border-t border-gray-400"
                        style={{ top: `${i * 10}%` }}
                      />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full border-l border-gray-400"
                        style={{ left: `${i * 10}%` }}
                      />
                    ))}
                  </div>

                  {/* Estate markers */}
                  {bishanEstates.map((estate) => (
                    <div
                      key={estate.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125 z-10"
                      style={{
                        left: `${estate.coords.x}%`,
                        top: `${estate.coords.y}%`,
                      }}
                      onMouseEnter={() => setHoveredEstate(estate)}
                      onMouseLeave={() => setHoveredEstate(null)}
                      onClick={() =>
                        estate.isUser && onNavigate && onNavigate("building")
                      }
                    >
                      {/* Marker dot */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                          estate.isUser
                            ? "ring-4 ring-blue-300 ring-opacity-50"
                            : ""
                        }`}
                        style={{
                          backgroundColor: getStatusColor(estate.status),
                        }}
                      />

                      {/* Tooltip */}
                      {(hoveredEstate?.id === estate.id || estate.isUser) && (
                        <div
                          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 whitespace-nowrap z-20 ${
                            estate.isUser ? "border-2 border-blue-500" : ""
                          }`}
                        >
                          <div className="font-bold text-primary-800 text-sm">
                            {estate.name}
                            {estate.isUser && (
                              <span className="text-blue-500 ml-1">
                                (You)
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="font-bold"
                              style={{
                                color: getStatusColor(estate.status),
                              }}
                            >
                              {formatTemp(estate.tempDiff)}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 text-sm">
                              Rank #{estate.rank}
                            </span>
                          </div>
                          {estate.isUser && (
                            <div className="mt-2 text-xs text-blue-600 font-medium">
                              Click to view details →
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow p-3">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      Temperature Difference
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Cool (&lt;1.5°C)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span>Warm (1.5-2.0°C)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span>Hot (2.0-2.5°C)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span>Extreme (&gt;2.5°C)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Ranking List View */
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-primary-800">
                    Estate Rankings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Temperature difference from rural baseline
                  </p>
                </div>
                <div className="divide-y">
                  {bishanEstates.map((estate) => (
                    <div
                      key={estate.id}
                      className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                        estate.isUser
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : ""
                      }`}
                    >
                      {/* Rank */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          estate.rank <= 3
                            ? "bg-green-100 text-green-700"
                            : estate.rank <= 7
                            ? "bg-yellow-100 text-yellow-700"
                            : estate.rank <= 11
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {estate.rank}
                      </div>

                      {/* Estate Info */}
                      <div className="flex-1">
                        <div className="font-medium text-primary-800">
                          {estate.name}
                          {estate.isUser && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Your Building
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Temperature */}
                      <div className="text-right">
                        <div
                          className="text-lg font-bold"
                          style={{
                            color: getStatusColor(estate.status),
                          }}
                        >
                          {formatTemp(estate.tempDiff)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {estate.tempDiff < districtAvg ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <TrendingDown className="w-3 h-3" />
                              Below avg
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Above avg
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      {estate.isUser && (
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate && onNavigate("building")
                          }
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                        >
                          View
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Panel - Your Estate Summary */}
          <YourEstatePanel
            userEstate={userEstate}
            estatesCount={bishanEstates.length}
            districtAvg={districtAvg}
            bestTempDiff={bishanEstates[0].tempDiff}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default DistrictView;



import React, { useState } from "react";
import {
  Map as MapIcon,
  Building2,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { bishanEstates, userBuilding } from "../../data/mockData";
import { getStatusColor, formatTemp } from "../../utils/heatColors";

const DistrictView = ({ onNavigate }) => {
  const [hoveredEstate, setHoveredEstate] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'

  const districtAvg =
    bishanEstates.reduce((sum, e) => sum + e.tempDiff, 0) /
    bishanEstates.length;
  const userEstate =
    bishanEstates.find((e) => e.isUser) ||
    bishanEstates.find((e) => e.name === userBuilding.name) ||
    bishanEstates[0];

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
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-800">
                {bishanEstates.length}
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
                +{bishanEstates[0].tempDiff}°C
              </div>
              <div className="text-sm text-gray-500">Best Performer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                +{bishanEstates[bishanEstates.length - 1].tempDiff}°C
              </div>
              <div className="text-sm text-gray-500">Needs Improvement</div>
            </div>
          </div>
        </div>
      </div>

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
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-xl shadow-lg p-4 lg:sticky lg:top-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary-700" />
                <h3 className="font-bold text-primary-800">
                  Your Estate
                </h3>
              </div>

              <div className="text-center py-4 border-b">
                <div className="text-3xl font-bold text-orange-500 mb-1">
                  {formatTemp(userEstate.tempDiff)}
                </div>
                <div className="text-sm text-gray-500">above baseline</div>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  Rank #{userEstate.rank} of {bishanEstates.length}
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
                    {formatTemp(
                      userEstate.tempDiff - districtAvg,
                      false
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">vs Best Performer</span>
                  <span className="text-red-600 font-medium">
                    {formatTemp(
                      userEstate.tempDiff - bishanEstates[0].tempDiff,
                      false
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Percentile</span>
                  <span className="text-orange-600 font-medium">
                    Bottom{" "}
                    {Math.round(
                      (userEstate.rank / bishanEstates.length) * 100
                    )}
                    %
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  Your estate has potential for significant improvement.
                  View your building&apos;s heat map to identify hotspots.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("building")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
                >
                  View 3D Building Analysis
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictView;



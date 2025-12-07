import React, { useState } from "react";
import { Map as MapIcon, TrendingUp, TrendingDown } from "lucide-react";
import { bishanEstates } from "../../data/mockData";
import { getStatusColor, formatTemp } from "../../utils/heatColors";
import { getDistrictAverage, getUserEstate } from "../../utils/district";
import StatsBar from "../district/StatsBar";
import YourEstatePanel from "../district/YourEstatePanel";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

const DistrictView = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'

  const districtAvg = getDistrictAverage(bishanEstates);
  const userEstate = getUserEstate(bishanEstates);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Stats Bar */}
      <div className="flex-shrink-0">
        <StatsBar estates={bishanEstates} districtAvg={districtAvg} />
      </div>

      {/* View Toggle */}
      <div className="flex-shrink-0 px-6 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm ${
              viewMode === "map"
                ? "bg-gradient-to-r from-teal-400/40 to-cyan-400/40 text-teal-700 border border-teal-300/50 shadow-lg"
                : "bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-lg border border-white/50"
            }`}
          >
            Map View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm ${
              viewMode === "list"
                ? "bg-gradient-to-r from-teal-400/40 to-cyan-400/40 text-teal-700 border border-teal-300/50 shadow-lg"
                : "bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-lg border border-white/50"
            }`}
          >
            Ranking View
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map / Visualization */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  District Heat Map (Real Bishan Map)
                </h2>

                {/* Real map of Bishan using OpenStreetMap tiles */}
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <MapContainer
                    center={[1.3515, 103.848]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {bishanEstates.map((estate) => (
                      <CircleMarker
                        key={estate.id}
                        center={[estate.lat, estate.lng]}
                        radius={estate.isUser ? 10 : 7}
                        pathOptions={{
                          color: estate.isUser ? "#3b82f6" : getStatusColor(estate.status),
                          weight: estate.isUser ? 3 : 2,
                          fillColor: getStatusColor(estate.status),
                          fillOpacity: 0.9,
                        }}
                        eventHandlers={{
                          click: () => {
                            if (estate.isUser && onNavigate) {
                              onNavigate("building");
                            }
                          },
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                          <div className="space-y-1">
                            <div className="font-bold text-primary-800 text-sm">
                              {estate.name}
                              {estate.isUser && (
                                <span className="text-blue-500 ml-1">
                                  (You)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className="font-bold"
                                style={{
                                  color: getStatusColor(estate.status),
                                }}
                              >
                                {formatTemp(estate.tempDiff)}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">
                                Rank #{estate.rank}
                              </span>
                            </div>
                            {estate.isUser && (
                              <div className="text-[11px] text-blue-600 font-medium">
                                Click marker to view building details
                              </div>
                            )}
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>

                {/* Legend */}
                <div className="mt-4 inline-block bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-4">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">
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
            ) : (
              /* Ranking List View */
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="p-6 border-b border-gray-200/50">
                  <h2 className="text-lg font-bold text-gray-800">
                    Estate Rankings
                  </h2>
                  <p className="text-sm text-gray-600">
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
                          className="px-4 py-2 bg-gradient-to-r from-teal-400/80 to-cyan-400/80 backdrop-blur-sm text-white rounded-xl text-sm hover:from-teal-500 hover:to-cyan-500 shadow-lg hover:shadow-xl transition-all font-medium border border-white/30"
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



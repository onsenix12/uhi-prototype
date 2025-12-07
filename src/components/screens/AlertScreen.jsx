import React from "react";
import {
  AlertTriangle,
  ThermometerSun,
  TrendingUp,
  Calendar,
  MapPin,
  ChevronRight,
  Bell,
  Shield,
} from "lucide-react";
import { userBuilding, bishanEstates } from "../../data/mockData";
import { getDistrictAverage, getUserEstate } from "../../utils/district";

const AlertScreen = ({ onNavigate }) => {
  const userEstate = getUserEstate(bishanEstates);
  const districtAvg = getDistrictAverage(bishanEstates);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Alert Banner */}
      <div className="flex-shrink-0 bg-gradient-to-r from-orange-400/80 to-amber-400/80 backdrop-blur-sm text-white rounded-2xl shadow-lg border border-orange-200/30 mb-2 mx-2 mt-2 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs opacity-95 font-medium">
              Heat Performance Alert
            </div>
            <div className="text-lg font-bold">Action Recommended</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {/* Main Alert Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden mb-4">
          {/* Alert Header */}
          <div className="bg-gradient-to-r from-orange-400/90 to-amber-400/90 backdrop-blur-sm text-white p-6 rounded-t-2xl border-b border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                <ThermometerSun className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {userBuilding.name}
                </h2>
                <p className="opacity-95 text-sm">
                  is significantly warmer than neighboring estates
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-100/50 shadow-md">
                <div className="text-4xl font-bold text-orange-600">
                  +{userEstate.tempDiff}°C
                </div>
                <div className="text-sm text-gray-600 mt-1 font-medium">
                  Above Baseline
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-red-100/50 shadow-md">
                <div className="text-4xl font-bold text-red-600">
                  #{userEstate.rank}
                </div>
                <div className="text-sm text-gray-600 mt-1 font-medium">
                  of {bishanEstates.length} Estates
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-3">
                How You Compare
              </h3>

              {/* Visual bar comparison */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">
                      Best in District (Sky Habitat)
                    </span>
                    <span className="text-green-600 font-medium">
                      +{bishanEstates[0].tempDiff}°C
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${(bishanEstates[0].tempDiff / 3) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">District Average</span>
                    <span className="text-yellow-600 font-medium">
                      +{districtAvg.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(districtAvg / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-700 font-medium">
                      Your Estate
                    </span>
                    <span className="text-orange-600 font-medium">
                      +{userEstate.tempDiff}°C
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(userEstate.tempDiff / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-gray-50/80 to-blue-50/50 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-gray-100/50 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-3">
                Estimated Impact
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      +12-15%
                    </div>
                    <div className="text-gray-500">Higher AC costs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <ThermometerSun className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Reduced</div>
                    <div className="text-gray-500">Outdoor comfort</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Details */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Alert generated:{" "}
                  {new Date().toLocaleDateString("en-SG", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  Location: {userBuilding.address},{" "}
                  {userBuilding.district}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Bell className="w-4 h-4" />
                <span>Based on 7-day rolling average from IoT sensors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("district")}
            className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all text-left flex items-center gap-4 border border-white/60"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-100/70 to-cyan-100/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                Compare with Neighbors
              </div>
              <div className="text-sm text-gray-600">
                See how other estates in Bishan are performing
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("building")}
            className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all text-left flex items-center gap-4 border border-white/60"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100/70 to-orange-100/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <ThermometerSun className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                View Building Hotspots
              </div>
              <div className="text-sm text-gray-600">
                Identify which areas are warmest
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("interventions")}
            className="w-full bg-gradient-to-r from-teal-400/70 to-cyan-400/70 backdrop-blur-md text-white rounded-2xl p-4 shadow-lg hover:from-teal-500/80 hover:to-cyan-500/80 hover:shadow-xl transition-all text-left flex items-center gap-4 border border-white/40 font-medium"
          >
            <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Explore Cooling Solutions</div>
              <div className="text-sm opacity-95">
                AI-recommended interventions with grant options
              </div>
            </div>
            <ChevronRight className="w-5 h-5 opacity-90" />
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This alert is generated by the Heat Resilience Monitoring System
          </p>
          <p className="mt-1">
            Data from NEA environmental sensors • Updated hourly
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertScreen;



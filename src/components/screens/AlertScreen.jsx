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

const AlertScreen = ({ onNavigate }) => {
  const userEstate =
    bishanEstates.find((e) => e.isUser) || bishanEstates[0];
  const districtAvg =
    bishanEstates.reduce((sum, e) => sum + e.tempDiff, 0) /
    bishanEstates.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-orange-500 text-white py-6 px-6 pt-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm opacity-80">
                Heat Performance Alert
              </div>
              <div className="text-xl font-bold">Action Recommended</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Main Alert Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Alert Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <ThermometerSun className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {userBuilding.name}
                </h2>
                <p className="opacity-90">
                  is significantly warmer than neighboring estates
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-orange-600">
                  +{userEstate.tempDiff}°C
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Above Baseline
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-red-600">
                  #{userEstate.rank}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  of {bishanEstates.length} Estates
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="border rounded-xl p-4 mb-6">
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
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
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
            className="w-full bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-left flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-800">
                Compare with Neighbors
              </div>
              <div className="text-sm text-gray-500">
                See how other estates in Bishan are performing
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("building")}
            className="w-full bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-left flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <ThermometerSun className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-800">
                View Building Hotspots
              </div>
              <div className="text-sm text-gray-500">
                Identify which areas are warmest
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("interventions")}
            className="w-full bg-primary-700 text-white rounded-xl p-4 shadow-lg hover:bg-primary-800 transition-all text-left flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Explore Cooling Solutions</div>
              <div className="text-sm opacity-80">
                AI-recommended interventions with grant options
              </div>
            </div>
            <ChevronRight className="w-5 h-5 opacity-60" />
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



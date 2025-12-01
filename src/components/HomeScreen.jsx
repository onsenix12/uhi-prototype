import React from "react";
import {
  AlertTriangle,
  Map,
  Building2,
  Lightbulb,
  GitCompare,
  FileText,
  TrendingUp,
  HardHat,
  ThermometerSun,
} from "lucide-react";
import { userBuilding, navigationItems } from "../data/mockData";

// Icon mapping for navigation items
const iconMap = {
  AlertTriangle,
  Map,
  Building2,
  Lightbulb,
  GitCompare,
  FileText,
  TrendingUp,
  HardHat,
};

// Navigation descriptions
const getNavDescription = (id) => {
  const descriptions = {
    alert: "View heat alerts and notifications",
    district: "Compare with neighboring estates",
    building: "3D view of building hotspots",
    interventions: "AI-recommended cooling solutions",
    simulation: "See before/after impact",
    grant: "Apply for government grants",
    results: "Track improvement over time",
    preconstruction: "Design optimization for new builds",
  };
  return descriptions[id] || "";
};

const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ThermometerSun className="w-12 h-12 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">
              Heat Resilience Dashboard
            </h1>
          </div>
          <p className="text-primary-200 text-lg">
            AI + IoT Urban Heat Monitoring for Private Estates
          </p>
        </div>

        {/* User Building Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary-800">
                {userBuilding.name}
              </h2>
              <p className="text-gray-500">{userBuilding.address}</p>
              <p className="text-gray-400 text-sm mt-1">
                {userBuilding.totalUnits} units • {userBuilding.towers} towers •
                {" "}Built {userBuilding.yearBuilt}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-orange-500">
                  +{userBuilding.tempDiff}°C
                </span>
              </div>
              <p className="text-gray-500 text-sm">above district average</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Rank: {userBuilding.currentRank} of {userBuilding.totalEstates}
              </div>
            </div>
          </div>

          {/* Quick Alert Banner */}
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-orange-800 font-medium">
                Your estate is warmer than 80% of buildings in Bishan
              </p>
              <p className="text-orange-600 text-sm">
                Explore interventions to improve your heat performance
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate?.("alert")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-primary-700" />
                  )}
                </div>
                <h3 className="font-semibold text-primary-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {getNavDescription(item.id)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-primary-300 text-sm">
          <p>IS626 Digital Tech & Sustainability • UHI Monitoring Prototype</p>
          <p className="mt-1">Powered by AI + IoT • Demo Version</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;



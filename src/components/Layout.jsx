import React from "react";
import {
  Map,
  Building2,
  Lightbulb,
  FileText,
  Home,
  Users,
  FileBarChart,
  Bell,
  Settings,
  GitCompare,
  AlertTriangle,
  HardHat,
} from "lucide-react";

const Layout = ({ currentScreen, onNavigate, title, subtitle, children }) => {
  const navigationItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "alert", label: "Heat Alerts", icon: AlertTriangle },
    { id: "district", label: "District View", icon: Map },
    { id: "building", label: "3D Climate Twin", icon: Building2 },
    { id: "interventions", label: "Interventions", icon: Lightbulb },
    { id: "simulation", label: "Valuation Model", icon: GitCompare },
    { id: "grant", label: "Grant Application", icon: FileText },
    { id: "results", label: "Reports", icon: FileBarChart },
    { id: "preconstruction", label: "Pre-Construction", icon: HardHat },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex relative overflow-hidden">
      {/* Decorative Wave Patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="none">
          <path d="M 400 0 Q 300 100, 400 200 T 400 400 T 400 600 T 400 800 L 400 0 Z" fill="white" opacity="0.3"/>
          <path d="M 400 50 Q 320 130, 400 250 T 400 450 T 400 650 L 400 50 Z" fill="white" opacity="0.2"/>
        </svg>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-2xl flex flex-col relative z-10">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img src={`${process.env.PUBLIC_URL}/Logo.png`} alt="UHPS Logo" className="h-12 w-auto object-contain" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all ${
                  isActive
                    ? "bg-teal-400/30 text-teal-700 backdrop-blur-sm border border-teal-400/50 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
              <Users className="w-3 h-3 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-800">User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3 overflow-hidden relative z-10 flex flex-col">
        {/* Header with User Actions */}
        <div className="mb-2 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-0">
              {title || "Urban Heat Planning Suite"}
            </h1>
            <p className="text-xs text-gray-600">
              {subtitle || "AI + IoT Climate Intelligence for Urban Planning"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-md">
              <Bell className="w-3 h-3 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-md">
              <Settings className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Page Content Container */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;


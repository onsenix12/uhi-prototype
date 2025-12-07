import React, { useState } from "react";
import {
  Wind,
  Leaf,
  Droplets,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const HomeScreen = ({ onNavigate }) => {
  const [mapZoom, setMapZoom] = useState(1);

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.2, 1));
  };
  return (
    <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/50 h-full overflow-hidden">
          {/* Dashboard Grid - 1/3 left column, 2/3 right column */}
          <div className="flex gap-2 h-full">
            {/* Left Column - 1/3 width */}
            <div className="flex flex-col gap-2" style={{width: '33.333%'}}>
              {/* Estate Heat Score Card */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-3 text-white shadow-2xl relative overflow-hidden flex-1">
                <button className="absolute top-2 right-2 text-white/90 hover:bg-white/20 rounded-full p-1 transition-all">
                  <X className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-semibold mb-2 text-white">Estate Heat Score</h3>
                <div className="mb-2">
                  <div className="text-3xl font-bold mb-1 tracking-tight">+2.3°C</div>
                  <p className="text-orange-50 text-xs font-medium">above baseline</p>
                </div>
                <div className="bg-white/25 rounded-xl p-2 backdrop-blur-md border border-white/30">
                  <p className="font-semibold text-xs mb-0.5">Your district ranks warmer than</p>
                  <p className="text-base font-bold">80% of Singapore</p>
                </div>
              </div>

              {/* Microclimate Insights */}
              <div className="bg-white rounded-2xl p-2 shadow-xl flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  Microclimate Insights
                </h3>
                <div className="flex-1 flex items-center justify-center mb-2">
                  <img
                    src={`${process.env.PUBLIC_URL}/Microclimate_Insights.png`}
                    alt="Microclimate Insights"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Solar radiation</p>
                    <p className="text-xs text-gray-500">Index</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Shading</p>
                    <p className="text-xs text-gray-500">Shading analysis</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-2xl p-2 shadow-xl flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-gray-800 mb-1.5">
                  AI Recommendations
                </h3>
                <div className="flex-1 flex flex-col justify-center gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">
                        Green Infrastructure
                      </p>
                      <p className="text-xs text-gray-500">Add vertical gardens & green roofs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Wind className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">
                        Optimize Airflow
                      </p>
                      <p className="text-xs text-gray-500">Enhance natural ventilation corridors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">Cool Surface Materials</p>
                      <p className="text-xs text-gray-500">Apply reflective coatings & paints</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 2/3 width */}
            <div className="flex flex-col gap-2" style={{width: '66.666%'}}>
              {/* Heat Map Viewer */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1">
                <div className="p-2 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-sm font-bold text-gray-800">Heat Map Viewer</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-all shadow-sm"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-all shadow-sm"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="relative h-full bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100 overflow-auto">
                  {/* Singapore Heatmap Image */}
                  <div
                    className="w-full h-full transition-transform duration-300"
                    style={{
                      transform: `scale(${mapZoom})`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/SG_Heatmap.png`}
                      alt="Singapore Heat Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Impact Forecast Cards Row */}
              <div className="flex gap-2">
                {/* Impact Forecast - Before/After */}
                <div className="bg-white rounded-2xl p-2 shadow-xl flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1.5">
                    Impact Forecast
                  </h3>
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={`${process.env.PUBLIC_URL}/Impact Forecast_1.png`}
                      alt="Impact Forecast"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Impact Forecast - Chart */}
                <div className="bg-white rounded-2xl p-2 shadow-xl flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-gray-800 mb-1.5">
                    Impact Forecast
                  </h3>
                  <div className="mb-2 bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700 w-12">Before</span>
                      <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 relative">
                        <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full" style={{width: '80%'}}></div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white shadow-sm" style={{left: '80%'}}></div>
                      </div>
                      <span className="text-xs font-bold text-gray-900 w-8 text-right">120</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700 w-12">After</span>
                      <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 relative">
                        <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full" style={{width: '100%'}}></div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 bg-teal-600 rounded-full border-2 border-white shadow-sm" style={{left: '100%'}}></div>
                      </div>
                      <span className="text-xs font-bold text-gray-900 w-8 text-right">150</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    {/* Chart with axes */}
                    <div className="flex-1 flex">
                      {/* Y-axis */}
                      <div className="flex flex-col justify-between py-2 pr-1 text-xs text-gray-400">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                      </div>
                      {/* Chart area */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src={`${process.env.PUBLIC_URL}/Impact Forecast_2.png`}
                            alt="Impact Forecast Chart"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* X-axis */}
                        <div className="flex justify-between px-2 pt-1 text-xs text-gray-400">
                          <span>Jan</span>
                          <span>Apr</span>
                          <span>Jul</span>
                          <span>Oct</span>
                          <span>Dec</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
  );
};

export default HomeScreen;



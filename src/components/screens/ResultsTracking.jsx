import React from "react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Award,
  Zap,
  Leaf,
  Share2,
  Download,
  Calendar,
} from "lucide-react";
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  userBuilding,
  temperatureHistory,
  grantApplication,
  resultsSummary,
} from "../../data/mockData";

const ResultsTracking = ({ onNavigate }) => {
  // Timeline steps
  const timelineSteps = [
    {
      label: "Application Submitted",
      date: grantApplication.submittedDate,
      status: "completed",
      description: "Grant application submitted via dashboard",
    },
    {
      label: "Grant Approved",
      date: grantApplication.approvedDate,
      status: "completed",
      description: `$${grantApplication.grantAmount.toLocaleString()} funding approved`,
    },
    {
      label: "Installation Complete",
      date: grantApplication.installationDate,
      status: "completed",
      description: "Cool roof coating applied to all towers",
    },
    {
      label: "Monitoring Period",
      date: "Ongoing",
      status: "current",
      description: "3-month verification in progress",
    },
    {
      label: "Final Verification",
      date: "Feb 2026",
      status: "pending",
      description: "Performance certification",
    },
  ];

  const handleDownloadReport = () => {
    const content = [
      `Heat Resilience Report for ${userBuilding.name}`,
      "",
      `Temp reduction achieved: -${resultsSummary.tempReductionActual}°C (predicted -${resultsSummary.tempReductionPredicted}°C)`,
      `Ranking improvement: #${resultsSummary.rankBefore} → #${resultsSummary.rankAfter}`,
      `Energy savings: ${resultsSummary.energySavings}% (~$${resultsSummary.annualCostSavings.toLocaleString()}/year)`,
      `CO₂ reduction: ${resultsSummary.carbonReduction}t/year`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "heat-resilience-report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareResults = async () => {
    const shareText = `${userBuilding.name} just reduced rooftop temperatures by -${resultsSummary.tempReductionActual}°C and improved its district rank from #${resultsSummary.rankBefore} to #${resultsSummary.rankAfter}.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Heat Resilience Results",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Ignore cancel errors and fall through to clipboard
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareText);
        // eslint-disable-next-line no-alert
        alert("Summary copied to clipboard. Paste it into email or chat to share.");
        return;
      } catch (e) {
        // Ignore and fall through
      }
    }

    // eslint-disable-next-line no-alert
    alert(shareText);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary-800 text-white py-4 px-6 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Results Tracking</h1>
          </div>
          <p className="text-primary-200">
            {userBuilding.name} - Performance Monitoring
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-green-500 text-white">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <div className="font-bold">Installation Complete</div>
                <div className="text-sm opacity-90">
                  Cool roof coating applied Nov 15, 2025
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">
                On track for Cool District Award
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Key Results Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium">Temp Reduction</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              -{resultsSummary.tempReductionActual}°C
            </div>
            <div className="text-xs text-gray-500 mt-1">
              vs predicted -{resultsSummary.tempReductionPredicted}°C
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Ranking</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">
                #{resultsSummary.rankAfter}
              </span>
              <span className="text-sm text-gray-400">
                from #{resultsSummary.rankBefore}
              </span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              ↑ {resultsSummary.rankBefore - resultsSummary.rankAfter} positions
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Energy Savings</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {resultsSummary.energySavings}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ~${resultsSummary.annualCostSavings.toLocaleString()}/year
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 text-teal-600 mb-2">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">CO₂ Reduced</span>
            </div>
            <div className="text-3xl font-bold text-teal-600">
              {resultsSummary.carbonReduction}t
            </div>
            <div className="text-xs text-gray-500 mt-1">
              tonnes per year
            </div>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-primary-800">
                Temperature Performance
              </h2>
              <p className="text-sm text-gray-500">
                Temperature differential vs rural baseline
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>Before</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>After</span>
              </div>
            </div>
          </div>

          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureHistory}>
                <defs>
                  <linearGradient
                    id="beforeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#f97316"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#f97316"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="afterGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#22c55e"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#22c55e"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  domain={[0, 3]}
                  stroke="#6b7280"
                  tickFormatter={(value) => `+${value}°C`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    value ? `+${value}°C` : "N/A",
                    name === "before" ? "Before" : "After",
                  ]}
                />
                <ReferenceLine
                  y={1.6}
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  label={{
                    value: "District Avg",
                    position: "right",
                    fill: "#6b7280",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="before"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#beforeGradient)"
                  dot={{ r: 4, fill: "#f97316" }}
                  connectNulls={false}
                />
                <Area
                  type="monotone"
                  dataKey="after"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#afterGradient)"
                  dot={{ r: 4, fill: "#22c55e" }}
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Annotation */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Installation completed in November - monitoring ongoing
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-primary-800 mb-6">
            Project Timeline
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200" />

            {/* Steps */}
            <div className="space-y-6">
              {timelineSteps.map((step) => (
                <div key={step.label} className="flex items-start gap-4">
                  {/* Status dot */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "current"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-300"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : step.status === "current" ? (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    ) : (
                      <div className="w-3 h-3 bg-white rounded-full opacity-50" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-4 ${
                      step.status === "pending" ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-primary-800">
                        {step.label}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Award Eligibility */}
        {resultsSummary.eligibleForAward && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-yellow-800">
                  Cool District Award Eligible! 🏆
                </h2>
                <p className="text-yellow-700 mt-1">
                  Based on your verified performance improvement, Palm
                  Gardens is eligible for the Cool District Award 2026. This
                  recognition highlights estates that demonstrate exceptional
                  commitment to urban heat resilience.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Nominate for Award
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-yellow-600 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button
            type="button"
            onClick={handleShareResults}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("interventions")}
            className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800"
          >
            Explore More Interventions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTracking;



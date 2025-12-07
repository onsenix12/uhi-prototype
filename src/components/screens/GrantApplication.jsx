import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  Building2,
  DollarSign,
  ChevronRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { userBuilding, interventions } from "../../data/mockData";

const GrantApplication = ({ onNavigate, selectedIntervention }) => {
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState(null);
  const [formData, setFormData] = useState({
    mcstResolution: false,
    quotation: false,
    buildingPlans: false,
  });

  const intervention = selectedIntervention || interventions[0];
  const estimatedCost =
    (intervention.costRange[0] + intervention.costRange[1]) / 2;
  const grantAmount = estimatedCost * (intervention.grantPercent / 100);

  const allChecked = Object.values(formData).every((v) => v);

  const handleSubmit = () => {
    if (!referenceNumber) {
      const generated = `HRG-2025-${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`;
      setReferenceNumber(generated);
    }
    setSubmitted(true);
  };

  if (submitted && referenceNumber) {

    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-primary-800 mb-2">
              Application Submitted!
            </h1>
            <p className="text-gray-600 mb-6">
              Your grant application has been submitted successfully.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reference Number</span>
                  <span className="font-mono font-medium">
                    {referenceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submission Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString("en-SG")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Processing</span>
                  <span className="font-medium">2-3 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grant Amount</span>
                  <span className="font-medium text-green-600">
                    ${grantAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-left text-sm">
                  <p className="text-blue-800 font-medium">
                    What happens next?
                  </p>
                  <p className="text-blue-600 mt-1">
                    You&apos;ll receive an email confirmation shortly. Our
                    team will review your application and contact you within 5
                    business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.("home")}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all font-medium"
              >
                Back to Dashboard
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("results")}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all font-medium"
              >
                Track Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Info Banner */}
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 mb-2 mx-2 mt-2 px-6 py-3">
        <p className="text-blue-700 text-sm font-medium">
          Apply for {intervention.grantName}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {/* Pre-filled Data Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-3">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-primary-800">
              Pre-filled from Dashboard
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            The following information has been automatically populated from
            your heat analysis.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Building Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Building Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">Estate Name</span>
                  <span className="font-medium">{userBuilding.name}</span>
                </div>
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium">{userBuilding.address}</span>
                </div>
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">District</span>
                  <span className="font-medium">{userBuilding.district}</span>
                </div>
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">Total Units</span>
                  <span className="font-medium">
                    {userBuilding.totalUnits}
                  </span>
                </div>
              </div>
            </div>

            {/* Intervention Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Intervention Details
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">Intervention</span>
                  <span className="font-medium">{intervention.name}</span>
                </div>
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded">
                  <span className="text-gray-500">Estimated Cost</span>
                  <span className="font-medium">
                    ${estimatedCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 bg-green-50 px-3 rounded">
                  <span className="text-green-700">
                    Grant ({intervention.grantPercent}%)
                  </span>
                  <span className="font-medium text-green-700">
                    ${grantAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 bg-blue-50 px-3 rounded">
                  <span className="text-blue-700">Net Cost</span>
                  <span className="font-bold text-blue-700">
                    ${(estimatedCost - grantAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attached Data */}
          <div className="mt-6 p-4 border rounded-xl">
            <h3 className="font-medium text-gray-700 mb-3">
              Supporting Data (Auto-attached)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Heat Analysis Report", attached: true },
                { label: "Simulation Results", attached: true },
                { label: "Energy Baseline", attached: true },
                { label: "Building Photos", attached: true },
              ].map((doc) => (
                <div
                  key={doc.label}
                  className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">{doc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-3">
          <h2 className="text-lg font-bold text-primary-800 mb-4">
            Required Documents
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Please confirm you have the following documents ready for
            submission.
          </p>

          <div className="space-y-3">
            {[
              {
                key: "mcstResolution",
                label: "MCST Resolution",
                desc: "Approval from management committee",
              },
              {
                key: "quotation",
                label: "Contractor Quotation",
                desc: "From BCA-registered contractor",
              },
              {
                key: "buildingPlans",
                label: "Building Plans",
                desc: "Floor plans showing intervention areas",
              },
            ].map((doc) => (
              <label
                key={doc.key}
                className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                  formData[doc.key]
                    ? "border-green-500 bg-green-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData[doc.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [doc.key]: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {doc.label}
                  </div>
                  <div className="text-sm text-gray-500">{doc.desc}</div>
                </div>
                <div
                  className={`px-3 py-1 rounded text-sm ${
                    formData[doc.key]
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {formData[doc.key] ? "Ready" : "Pending"}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-3">
          <h2 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Expected Timeline
          </h2>

          <div className="flex items-center justify-between text-sm">
            {[
              { label: "Submit", time: "Today" },
              { label: "Review", time: "1-2 weeks" },
              { label: "Approval", time: "2-3 weeks" },
              { label: "Installation", time: "4-6 weeks" },
              { label: "Verification", time: "8-10 weeks" },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary-700 font-medium">
                      {i + 1}
                    </span>
                  </div>
                  <div className="font-medium text-gray-800">
                    {step.label}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {step.time}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Fast Track Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">
                Fast Track Eligible
              </p>
              <p className="text-blue-600 text-sm">
                Applications with complete dashboard data have 40% faster
                approval rates. Your application qualifies for expedited
                processing.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("simulation")}
            className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all font-medium"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allChecked}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              allChecked
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl"
                : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Application
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {!allChecked && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Please confirm all required documents are ready
          </p>
        )}
      </div>
    </div>
  );
};

export default GrantApplication;



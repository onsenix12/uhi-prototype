import React, { useState } from "react";
import { Home } from "lucide-react";

import AlertScreen from "./components/screens/AlertScreen";
import DistrictView from "./components/screens/DistrictView";
import Building3DView from "./components/screens/Building3DView";
import InterventionOptions from "./components/screens/InterventionOptions";
import BeforeAfterSim from "./components/screens/BeforeAfterSim";
import GrantApplication from "./components/screens/GrantApplication";
import ResultsTracking from "./components/screens/ResultsTracking";
import PreConstructionTeaser from "./components/screens/PreConstructionTeaser";
import HomeScreen from "./components/HomeScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen || "home");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "alert":
        return <AlertScreen onNavigate={handleNavigate} />;
      case "district":
        return <DistrictView onNavigate={handleNavigate} />;
      case "building":
        return <Building3DView onNavigate={handleNavigate} />;
      case "interventions":
        return (
          <InterventionOptions
            onNavigate={handleNavigate}
            onSelectIntervention={setSelectedIntervention}
          />
        );
      case "simulation":
        return (
          <BeforeAfterSim
            onNavigate={handleNavigate}
            selectedIntervention={selectedIntervention}
          />
        );
      case "grant":
        return (
          <GrantApplication
            onNavigate={handleNavigate}
            selectedIntervention={selectedIntervention}
          />
        );
      case "results":
        return <ResultsTracking onNavigate={handleNavigate} />;
      case "preconstruction":
        return <PreConstructionTeaser onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {/* Back to Home button (shown on all screens except home) */}
      {currentScreen !== "home" && (
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-primary-700 font-medium"
        >
          <Home className="w-4 h-4" />
          Dashboard
        </button>
      )}

      {renderScreen()}
    </div>
  );
}

export default App;

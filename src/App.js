import React, { useState } from "react";

import Layout from "./components/Layout";
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

  // Get page title and subtitle based on current screen
  const getPageInfo = () => {
    switch (currentScreen) {
      case "home":
        return {
          title: "Urban Heat Planning Suite",
          subtitle: "AI + IoT Climate Intelligence for Urban Planning"
        };
      case "alert":
        return {
          title: "Heat Alerts",
          subtitle: "Real-time heat notifications"
        };
      case "district":
        return {
          title: "Bishan District",
          subtitle: "Heat Performance Comparison"
        };
      case "building":
        return {
          title: "3D Climate Twin",
          subtitle: "3D Heat Analysis View"
        };
      case "interventions":
        return {
          title: "Recommended Interventions",
          subtitle: "AI-powered cooling solutions"
        };
      case "simulation":
        return {
          title: "Valuation Model",
          subtitle: "Before & After Simulation"
        };
      case "grant":
        return {
          title: "Grant Application",
          subtitle: "Funding opportunities"
        };
      case "results":
        return {
          title: "Results Tracking",
          subtitle: "Monitor your impact"
        };
      case "preconstruction":
        return {
          title: "Design for Cool",
          subtitle: "AI-optimized design for new developments"
        };
      default:
        return {
          title: "Urban Heat Planning Suite",
          subtitle: "AI + IoT Climate Intelligence for Urban Planning"
        };
    }
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

  const pageInfo = getPageInfo();

  return (
    <Layout
      currentScreen={currentScreen}
      onNavigate={handleNavigate}
      title={pageInfo.title}
      subtitle={pageInfo.subtitle}
    >
      {renderScreen()}
    </Layout>
  );
}

export default App;

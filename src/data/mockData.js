// District estates data for Bishan
// Note: lat/lng values are approximate but are positioned correctly within Singapore
// so you can see where Bishan sits on the map and how the estates relate spatially.
export const bishanEstates = [
  {
    id: 1,
    name: "Sky Habitat",
    tempDiff: 0.8,
    rank: 1,
    status: "cool",
    lat: 1.3524,
    lng: 103.848,
  },
  {
    id: 2,
    name: "Clover by the Park",
    tempDiff: 1.1,
    rank: 2,
    status: "cool",
    lat: 1.3509,
    lng: 103.8435,
  },
  {
    id: 3,
    name: "The Canopy",
    tempDiff: 1.4,
    rank: 3,
    status: "mild",
    lat: 1.354,
    lng: 103.845,
  },
  {
    id: 4,
    name: "Bishan Ridges",
    tempDiff: 1.5,
    rank: 4,
    status: "mild",
    lat: 1.352,
    lng: 103.851,
  },
  {
    id: 5,
    name: "Natura Loft",
    tempDiff: 1.7,
    rank: 5,
    status: "mild",
    lat: 1.3535,
    lng: 103.8405,
  },
  {
    id: 6,
    name: "The Residence",
    tempDiff: 1.8,
    rank: 6,
    status: "warm",
    lat: 1.3495,
    lng: 103.8465,
  },
  {
    id: 7,
    name: "Park Central",
    tempDiff: 1.9,
    rank: 7,
    status: "warm",
    lat: 1.349,
    lng: 103.8505,
  },
  {
    id: 8,
    name: "Bishan Point",
    tempDiff: 2.0,
    rank: 8,
    status: "warm",
    lat: 1.3475,
    lng: 103.845,
  },
  {
    id: 9,
    name: "Central Grove",
    tempDiff: 2.1,
    rank: 9,
    status: "warm",
    lat: 1.3465,
    lng: 103.8485,
  },
  {
    id: 10,
    name: "Thomson View",
    tempDiff: 2.2,
    rank: 10,
    status: "hot",
    lat: 1.3545,
    lng: 103.832,
  },
  {
    id: 11,
    name: "Rafflesia Condo",
    tempDiff: 2.2,
    rank: 11,
    status: "hot",
    lat: 1.354,
    lng: 103.839,
  },
  {
    id: 12,
    name: "Palm Gardens",
    tempDiff: 2.3,
    rank: 12,
    status: "hot",
    isUser: true,
    lat: 1.3515,
    lng: 103.846,
  },
  {
    id: 13,
    name: "Bishan Loft",
    tempDiff: 2.5,
    rank: 13,
    status: "hot",
    lat: 1.351,
    lng: 103.842,
  },
  {
    id: 14,
    name: "Golden Heights",
    tempDiff: 2.6,
    rank: 14,
    status: "extreme",
    lat: 1.3485,
    lng: 103.852,
  },
  {
    id: 15,
    name: "North Park",
    tempDiff: 2.8,
    rank: 15,
    status: "extreme",
    lat: 1.355,
    lng: 103.843,
  },
];

// User's building data
export const userBuilding = {
  name: "Palm Gardens Condominium",
  address: "123 Bishan Street 22",
  district: "Bishan",
  totalUnits: 320,
  towers: 3,
  yearBuilt: 2008,
  mcstContact: "Mr. Tan Wei Ming",
  currentRank: 12,
  totalEstates: 15,
  tempDiff: 2.3,
  districtAvg: 1.6,
};

// 3D Building heat data
export const buildingHeatData = {
  towers: [
    {
      id: "A",
      name: "Tower A",
      position: [-3, 0, 0],
      height: 12,
      width: 2.5,
      depth: 2.5,
      floors: 24,
      faces: {
        north: {
          temp: 32,
          label: "North Face",
          description: "Shaded, good ventilation",
        },
        south: {
          temp: 34,
          label: "South Face",
          description: "Moderate sun exposure",
        },
        east: {
          temp: 33,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 38,
          label: "West Face",
          description: "Afternoon sun - HOTSPOT",
        },
        roof: {
          temp: 45,
          label: "Rooftop",
          description: "No coating, direct exposure",
        },
      },
    },
    {
      id: "B",
      name: "Tower B",
      position: [0, 0, 2],
      height: 15,
      width: 2.5,
      depth: 2.5,
      floors: 30,
      faces: {
        north: {
          temp: 31,
          label: "North Face",
          description: "Well shaded",
        },
        south: {
          temp: 35,
          label: "South Face",
          description: "Some exposure",
        },
        east: {
          temp: 34,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 39,
          label: "West Face",
          description: "Afternoon sun - HOTSPOT",
        },
        roof: {
          temp: 46,
          label: "Rooftop",
          description: "No coating - CRITICAL",
        },
      },
    },
    {
      id: "C",
      name: "Tower C",
      position: [3, 0, -1],
      height: 10,
      width: 2.5,
      depth: 2.5,
      floors: 20,
      faces: {
        north: {
          temp: 33,
          label: "North Face",
          description: "Partial shade",
        },
        south: {
          temp: 36,
          label: "South Face",
          description: "Direct exposure",
        },
        east: {
          temp: 35,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 40,
          label: "West Face",
          description: "Afternoon sun - HOTSPOT",
        },
        roof: {
          temp: 44,
          label: "Rooftop",
          description: "No coating",
        },
      },
    },
  ],
  groundLevel: [
    {
      id: "carpark",
      name: "Carpark",
      temp: 42,
      position: [0, 0.1, -4],
      size: [8, 0.2, 3],
    },
    {
      id: "pool",
      name: "Pool Deck",
      temp: 35,
      position: [4, 0.1, 3],
      size: [3, 0.2, 3],
    },
    {
      id: "garden",
      name: "Garden",
      temp: 29,
      position: [-4, 0.1, 3],
      size: [3, 0.2, 3],
    },
    {
      id: "entrance",
      name: "Main Entrance",
      temp: 36,
      position: [0, 0.1, 5],
      size: [4, 0.2, 2],
    },
  ],
  hotspots: [
    {
      area: "West-facing walls (All Towers)",
      temp: "+3.1°C above ambient",
      severity: "high",
    },
    {
      area: "Rooftop areas",
      temp: "+4.2°C (no shade/coating)",
      severity: "critical",
    },
    {
      area: "Carpark surface",
      temp: "+5.8°C",
      severity: "critical",
    },
    {
      area: "Pool deck",
      temp: "+2.1°C",
      severity: "medium",
    },
  ],
};

// After intervention data (for before/after comparison)
export const buildingHeatDataAfter = {
  towers: [
    {
      id: "A",
      name: "Tower A",
      position: [-3, 0, 0],
      height: 12,
      width: 2.5,
      depth: 2.5,
      floors: 24,
      faces: {
        north: {
          temp: 31,
          label: "North Face",
          description: "Shaded, good ventilation",
        },
        south: {
          temp: 33,
          label: "South Face",
          description: "Moderate sun exposure",
        },
        east: {
          temp: 32,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 35,
          label: "West Face",
          description: "Cool coating applied",
        },
        roof: {
          temp: 38,
          label: "Rooftop",
          description: "Cool coating applied ✓",
        },
      },
    },
    {
      id: "B",
      name: "Tower B",
      position: [0, 0, 2],
      height: 15,
      width: 2.5,
      depth: 2.5,
      floors: 30,
      faces: {
        north: {
          temp: 30,
          label: "North Face",
          description: "Well shaded",
        },
        south: {
          temp: 34,
          label: "South Face",
          description: "Some exposure",
        },
        east: {
          temp: 33,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 36,
          label: "West Face",
          description: "Cool coating applied",
        },
        roof: {
          temp: 39,
          label: "Rooftop",
          description: "Cool coating applied ✓",
        },
      },
    },
    {
      id: "C",
      name: "Tower C",
      position: [3, 0, -1],
      height: 10,
      width: 2.5,
      depth: 2.5,
      floors: 20,
      faces: {
        north: {
          temp: 32,
          label: "North Face",
          description: "Partial shade",
        },
        south: {
          temp: 35,
          label: "South Face",
          description: "Direct exposure",
        },
        east: {
          temp: 34,
          label: "East Face",
          description: "Morning sun",
        },
        west: {
          temp: 37,
          label: "West Face",
          description: "Cool coating applied",
        },
        roof: {
          temp: 37,
          label: "Rooftop",
          description: "Cool coating applied ✓",
        },
      },
    },
  ],
  groundLevel: [
    {
      id: "carpark",
      name: "Carpark",
      temp: 38,
      position: [0, 0.1, -4],
      size: [8, 0.2, 3],
    },
    {
      id: "pool",
      name: "Pool Deck",
      temp: 32,
      position: [4, 0.1, 3],
      size: [3, 0.2, 3],
    },
    {
      id: "garden",
      name: "Garden",
      temp: 28,
      position: [-4, 0.1, 3],
      size: [3, 0.2, 3],
    },
    {
      id: "entrance",
      name: "Main Entrance",
      temp: 33,
      position: [0, 0.1, 5],
      size: [4, 0.2, 2],
    },
  ],
};

// Intervention options
export const interventions = [
  {
    id: "cool-coating",
    name: "Cool Roof Coating",
    rating: 3,
    description:
      "Specialized reflective paint that reduces heat absorption on roof surfaces",
    tempReduction: 1.8,
    costRange: [45000, 60000],
    grantName: "BCA Green Mark Incentive",
    grantPercent: 50,
    roiYears: 3.5,
    energySavings: 12,
    carbonReduction: 15,
    implementationTime: "2-3 weeks",
    targetAreas: ["Rooftop areas"],
  },
  {
    id: "vertical-green",
    name: "Vertical Greenery",
    rating: 2,
    description:
      "Living green walls on west-facing facades to provide natural cooling",
    tempReduction: 1.2,
    costRange: [80000, 120000],
    grantName: "Skyrise Greenery Incentive Scheme",
    grantPercent: 50,
    roiYears: 5,
    energySavings: 8,
    carbonReduction: 10,
    implementationTime: "4-6 weeks",
    targetAreas: ["West-facing walls"],
  },
  {
    id: "shade-structure",
    name: "Shade Structures",
    rating: 1,
    description:
      "Tensile fabric canopies for pool deck and common areas",
    tempReduction: 2.5,
    costRange: [30000, 50000],
    grantName: "NEA 3R Fund",
    grantPercent: 30,
    roiYears: 4,
    energySavings: 5,
    carbonReduction: 5,
    implementationTime: "3-4 weeks",
    targetAreas: ["Pool deck", "Common areas"],
  },
  {
    id: "cool-pavement",
    name: "Cool Pavement Coating",
    rating: 2,
    description:
      "Reflective coating for carpark and walkway surfaces",
    tempReduction: 2.0,
    costRange: [35000, 55000],
    grantName: "BCA Green Mark Incentive",
    grantPercent: 40,
    roiYears: 4,
    energySavings: 6,
    carbonReduction: 8,
    implementationTime: "1-2 weeks",
    targetAreas: ["Carpark surface"],
  },
];

// Results tracking data (time series for chart)
export const temperatureHistory = [
  { month: "Jun", before: 2.3, after: null },
  { month: "Jul", before: 2.4, after: null },
  { month: "Aug", before: 2.5, after: null },
  { month: "Sep", before: 2.3, after: null },
  { month: "Oct", before: 2.2, after: null },
  { month: "Nov", before: null, after: 1.8, label: "Coating Applied" },
  { month: "Dec", before: null, after: 1.5 },
  { month: "Jan", before: null, after: 1.4 },
  { month: "Feb", before: null, after: 1.3 },
];

// Grant application data
export const grantApplication = {
  status: "approved",
  submittedDate: "2025-09-15",
  approvedDate: "2025-10-01",
  installationDate: "2025-11-15",
  intervention: "Cool Roof Coating",
  estimatedCost: 52000,
  grantAmount: 26000,
  netCost: 26000,
};

// Results summary
export const resultsSummary = {
  tempReductionActual: 1.6,
  tempReductionPredicted: 1.8,
  rankBefore: 12,
  rankAfter: 8,
  energySavings: 9,
  annualCostSavings: 9600,
  carbonReduction: 12.5,
  eligibleForAward: true,
};

// Pre-construction comparison data
export const preConstructionData = {
  original: {
    name: "Original Design",
    orientation: "West-facing towers",
    windCorridor: false,
    greenBuffer: false,
    predictedTemp: 2.3,
  },
  optimized: {
    name: "AI-Optimized Design",
    orientation: "Rotated 15° from west",
    windCorridor: true,
    greenBuffer: true,
    predictedTemp: 0.8,
    benefits: [
      "2.1°C cooler at ground level",
      "18% better natural ventilation",
      "Reduced AC load from day one",
      "Higher Green Mark score",
    ],
  },
};

// Navigation items for hub
export const navigationItems = [
  { id: "alert", name: "Heat Alert", icon: "AlertTriangle", available: true },
  { id: "district", name: "District View", icon: "Map", available: true },
  { id: "building", name: "3D Building", icon: "Building2", available: true },
  {
    id: "interventions",
    name: "Interventions",
    icon: "Lightbulb",
    available: true,
  },
  {
    id: "simulation",
    name: "Before/After",
    icon: "GitCompare",
    available: true,
  },
  { id: "grant", name: "Apply Grant", icon: "FileText", available: true },
  { id: "results", name: "Results", icon: "TrendingUp", available: true },
  { id: "preconstruction", name: "New Builds", icon: "HardHat", available: true },
];



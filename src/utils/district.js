import { bishanEstates, userBuilding } from "../data/mockData";

/**
 * Get the district average temperature difference.
 * Uses bishanEstates by default but allows overriding for reuse.
 */
export const getDistrictAverage = (estates = bishanEstates) => {
  if (!estates?.length) return 0;
  const total = estates.reduce((sum, e) => sum + (e.tempDiff || 0), 0);
  return total / estates.length;
};

/**
 * Get the user's estate from the estates list.
 * Prefers the isUser flag, falls back to matching the userBuilding name,
 * then finally defaults to the first estate.
 */
export const getUserEstate = (estates = bishanEstates) => {
  if (!estates?.length) return null;

  return (
    estates.find((e) => e.isUser) ||
    estates.find((e) => e.name === userBuilding.name) ||
    estates[0]
  );
};



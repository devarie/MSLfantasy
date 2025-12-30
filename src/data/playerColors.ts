// Player color mappings for consistent colors across charts and cards
export const playerColors: Record<string, string> = {
  'Dylan': '#10b981',    // emerald-500
  'Mike': '#f59e0b',     // amber-500
  'Arie': '#3b82f6',     // blue-500
  'Maus': '#8b5cf6',     // violet-500
  'Diederik': '#ec4899', // pink-500
  'Minne': '#14b8a6',    // teal-500
  'Stephan': '#f97316',  // orange-500
  'Oscar': '#6366f1',    // indigo-500
  'Maarten': '#84cc16',  // lime-500
  'Geert': '#06b6d4',    // cyan-500
  'Mischa': '#a855f7',   // purple-500
  'Sanford': '#eab308',  // yellow-500
  'Wout': '#22c55e',     // green-500
};

// Get color for a player, with fallback to emerald if not found
export function getPlayerColor(playerName: string): string {
  return playerColors[playerName] || '#10b981';
}

// Get all defined player colors as an array
export function getAllPlayerColors(): string[] {
  return Object.values(playerColors);
}

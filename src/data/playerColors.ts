// Player color mappings for consistent colors across charts and cards
export const playerColors: Record<string, string> = {
  'Dylan': '#10b981',    // emerald-500
  'Mike': '#d4a574',     // beige
  'Arie': '#3b82f6',     // blue-500
  'Maus': '#8b5cf6',     // violet-500
  'Diederik': '#ec4899', // pink-500
  'Died': '#ec4899',     // pink-500 (alias for Diederik)
  'Minne': '#14b8a6',    // teal-500
  'Stephan': '#dc2626',  // red-600 (changed from orange for better distinction)
  'Oscar': '#6366f1',    // indigo-500
  'Maarten': '#7c3aed',  // violet-600 (changed for better distinction from Mike)
  'Geert': '#06b6d4',    // cyan-500
  'Mischa': '#a855f7',   // purple-500
  'Sanford': '#facc15',  // yellow-400 (brighter yellow for better distinction)
  'Wout': '#059669',     // emerald-600 (darker green for better distinction from lime)
};

// Get color for a player, with fallback to emerald if not found
export function getPlayerColor(playerName: string): string {
  return playerColors[playerName] || '#10b981';
}

// Get all defined player colors as an array
export function getAllPlayerColors(): string[] {
  return Object.values(playerColors);
}

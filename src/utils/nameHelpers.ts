// Helper functions to extract alias and internal names from player strings
// Format: "Alias Name (InternalName)" -> Alias: "Alias Name", Internal: "InternalName"

export interface PlayerNames {
  alias: string;      // The display name (e.g., "Michael Jordan")
  internal: string;   // The internal name for lookups (e.g., "Geert")
}

/**
 * Extract both alias and internal name from a cell value
 * @param cellValue - The raw cell value (e.g., "Michael Jordan (Geert)")
 * @returns Object with alias and internal name
 */
export function extractPlayerNames(cellValue: string): PlayerNames {
  if (!cellValue) {
    return { alias: '', internal: '' };
  }

  // Check if there's a name in parentheses (allow optional trailing content)
  const match = cellValue.match(/^(.+?)\s*\(([^)]+)\)/);

  if (match) {
    return {
      alias: match[1].trim(),      // Everything before parentheses
      internal: match[2].trim(),   // Everything inside parentheses
    };
  }

  // No parentheses found, use the whole string for both
  return {
    alias: cellValue.trim(),
    internal: cellValue.trim(),
  };
}

/**
 * Extract just the internal name (for lookups)
 * @param cellValue - The raw cell value
 * @returns The internal name
 */
export function getInternalName(cellValue: string): string {
  return extractPlayerNames(cellValue).internal;
}

/**
 * Extract just the alias (for display)
 * @param cellValue - The raw cell value
 * @returns The alias name
 */
export function getAliasName(cellValue: string): string {
  return extractPlayerNames(cellValue).alias;
}

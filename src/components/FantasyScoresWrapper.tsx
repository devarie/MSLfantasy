import FantasyScoreCards from './FantasyScoreCards';
import { extractPlayerNames } from '@/utils/nameHelpers';

interface Player {
  name: string;        // Internal name for lookups
  alias: string;       // Display name (alias)
  score: number;
}

async function getFantasyScores(): Promise<Player[]> {
  try {
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/sheets`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      return [];
    }

    // Skip header row and extract names (column A) and scores (column B - Fantasy Total Score)
    const [, ...rows] = data.data;

    const players: Player[] = rows
      .map((row: string[]) => {
        const cellValue = row[0] || 'Unknown';
        const names = extractPlayerNames(cellValue);
        return {
          name: names.internal,    // Internal name for lookups
          alias: names.alias,      // Display name (alias)
          score: parseInt(row[1], 10) || 0, // Column B is Fantasy Total Score
        };
      })
      .filter((player: Player) => player.name !== 'Unknown');

    return players;
  } catch (error) {
    console.error('Failed to fetch fantasy scores:', error);
    return [];
  }
}

export default async function FantasyScoresWrapper() {
  const players = await getFantasyScores();

  if (players.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <FantasyScoreCards players={players} />
    </div>
  );
}

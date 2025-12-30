import FantasyChartsContainer from './FantasyChartsContainer';

interface CompetitionSheet {
  name: string;
  data: string[][];
  error?: string;
}

interface CompetitionData {
  success: boolean;
  sheets: CompetitionSheet[];
  lastUpdated: string;
}

async function getCompetitionData(): Promise<CompetitionData | null> {
  try {
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/competitions`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch competition data:', error);
    return null;
  }
}

export default async function FantasyChartsWrapper() {
  const competitionData = await getCompetitionData();

  if (!competitionData || !competitionData.success || competitionData.sheets.length === 0) {
    return null;
  }

  return <FantasyChartsContainer sheets={competitionData.sheets} />;
}

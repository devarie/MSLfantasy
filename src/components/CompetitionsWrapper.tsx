import CompetitionTabs from './CompetitionTabs';

interface CompetitionData {
  success: boolean;
  sheets: Array<{
    name: string;
    data: string[][];
    error?: string;
  }>;
  lastUpdated: string;
  error?: string;
}

async function getCompetitionsData(): Promise<CompetitionData | null> {
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
    console.error('Failed to fetch competitions data:', error);
    return null;
  }
}

export default async function CompetitionsWrapper() {
  const data = await getCompetitionsData();

  if (!data || !data.success) {
    return (
      <div className="w-full rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
        <p className="text-red-800 dark:text-red-200">
          Kan competitiedata niet laden
        </p>
      </div>
    );
  }

  // Sort sheets to put Deelnemers first
  const sortedSheets = [...data.sheets].sort((a, b) => {
    if (a.name === 'Deelnemers') return -1;
    if (b.name === 'Deelnemers') return 1;
    return 0;
  });

  return <CompetitionTabs sheets={sortedSheets} lastUpdated={data.lastUpdated} />;
}

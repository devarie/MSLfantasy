interface SheetData {
  success: boolean;
  data: string[][];
  lastUpdated: string;
  range: string;
}

async function getDeelnemersData(): Promise<SheetData | null> {
  try {
    // Use absolute URL for server-side rendering on Railway
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

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch deelnemers data:', error);
    return null;
  }
}

export default async function Deelnemersstand() {
  const sheetData = await getDeelnemersData();

  if (!sheetData || !sheetData.success) {
    return (
      <div className="w-full rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
        <p className="text-red-800 dark:text-red-200">
          Kan deelnemersdata niet laden. Start de update service met: npm run update-sheets
        </p>
      </div>
    );
  }

  const [headers, ...rows] = sheetData.data;
  const lastUpdate = new Date(sheetData.lastUpdated).toLocaleString('nl-NL');

  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Deelnemersstand
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Laatst bijgewerkt: {lastUpdate}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-3 text-sm ${
                      cellIndex === 0
                        ? 'font-medium text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {cell || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Data wordt automatisch elke 5 minuten bijgewerkt
      </div>
    </div>
  );
}

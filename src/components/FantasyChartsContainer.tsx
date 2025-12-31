'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPlayerColor } from '@/data/playerColors';
import { extractPlayerNames } from '@/utils/nameHelpers';

interface CompetitionSheet {
  name: string;
  data: string[][];
  error?: string;
}

interface FantasyChartsContainerProps {
  sheets: CompetitionSheet[];
}

export default function FantasyChartsContainer({ sheets }: FantasyChartsContainerProps) {
  // Filter out 'Deelnemers' sheet and only keep game sheets
  const gameSheets = sheets.filter(sheet => sheet.name !== 'Deelnemers' && !sheet.error);

  if (gameSheets.length === 0) {
    return null;
  }

  // Extract player names from first game sheet (skip header row)
  const firstGameData = gameSheets[0]?.data || [];
  const [, ...playerRows] = firstGameData;

  // Get unique player names (both internal and alias)
  const playerNamesMap = playerRows
    .map(row => {
      const cellValue = row[0];
      if (!cellValue) return null;
      return extractPlayerNames(cellValue);
    })
    .filter(Boolean) as { alias: string; internal: string }[];

  // Create cumulative score tracker for each player
  const cumulativeFantasyScores: Record<string, number> = {};
  const cumulativeResults: Record<string, number> = {};

  // Initialize cumulative scores to 0 for all players
  playerNamesMap.forEach(({ alias }) => {
    cumulativeFantasyScores[alias] = 0;
    cumulativeResults[alias] = 0;
  });

  // Prepare data for Fantasy Scores chart (Column C) - CUMULATIVE
  const fantasyScoresData = gameSheets.map((sheet) => {
    const [, ...rows] = sheet.data;
    const dataPoint: Record<string, string | number> = { game: sheet.name };

    rows.forEach(row => {
      const cellValue = row[0];
      if (!cellValue) return;

      const names = extractPlayerNames(cellValue);
      const fantasyScore = parseInt(row[2] || '0', 10); // Column C (index 2)

      // Add to cumulative total
      cumulativeFantasyScores[names.alias] = (cumulativeFantasyScores[names.alias] || 0) + fantasyScore;

      // Use cumulative score in chart
      dataPoint[names.alias] = cumulativeFantasyScores[names.alias];
    });

    return dataPoint;
  });

  // Prepare data for Results chart (Column B) - CUMULATIVE
  const resultsData = gameSheets.map((sheet) => {
    const [, ...rows] = sheet.data;
    const dataPoint: Record<string, string | number> = { game: sheet.name };

    rows.forEach(row => {
      const cellValue = row[0];
      if (!cellValue) return;

      const names = extractPlayerNames(cellValue);
      const result = parseInt(row[1] || '0', 10); // Column B (index 1) - Results

      // Add to cumulative total
      cumulativeResults[names.alias] = (cumulativeResults[names.alias] || 0) + result;

      // Use cumulative score in chart
      dataPoint[names.alias] = cumulativeResults[names.alias];
    });

    return dataPoint;
  });

  return (
    <div className="w-full mt-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
        Voortgang per Spel
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Fantasy Scores Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-4 md:p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Fantasy Totale Score
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={fantasyScoresData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="game"
                className="text-xs text-zinc-600 dark:text-zinc-400"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis className="text-xs text-zinc-600 dark:text-zinc-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#18181b', fontWeight: 'bold' }}
              />
              {playerNamesMap.map(({ alias, internal }) => (
                <Line
                  key={alias}
                  type="monotone"
                  dataKey={alias}
                  stroke={getPlayerColor(internal)}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Results Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-4 md:p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Beste Mike Score
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={resultsData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="game"
                className="text-xs text-zinc-600 dark:text-zinc-400"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis className="text-xs text-zinc-600 dark:text-zinc-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#18181b', fontWeight: 'bold' }}
              />
              {playerNamesMap.map(({ alias, internal }) => (
                <Line
                  key={alias}
                  type="monotone"
                  dataKey={alias}
                  stroke={getPlayerColor(internal)}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

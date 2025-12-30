'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getPlayerBio } from '@/data/playerBios';
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
  // Find the Deelnemers sheet
  const deelnemersSheet = sheets.find(sheet => sheet.name === 'Deelnemers');

  if (!deelnemersSheet || !deelnemersSheet.data || deelnemersSheet.data.length === 0) {
    return null;
  }

  // Extract data from Deelnemers sheet
  const [headers, ...rows] = deelnemersSheet.data;

  // Find column indices (assuming headers are in Dutch)
  const nameColumnIndex = 0; // Column A
  const fantasyTotaleScoreIndex = headers.findIndex(h => h && h.toLowerCase().includes('fantasy totale'));
  const besteMikeScoreIndex = headers.findIndex(h => h && h.toLowerCase().includes('beste mike'));

  if (fantasyTotaleScoreIndex === -1 || besteMikeScoreIndex === -1) {
    console.error('Could not find required columns in Deelnemers sheet');
    return null;
  }

  // Prepare data for charts
  const chartData = rows
    .map(row => {
      const cellValue = row[nameColumnIndex];
      if (!cellValue) return null;

      const names = extractPlayerNames(cellValue);
      const fantasyScore = parseInt(row[fantasyTotaleScoreIndex] || '0', 10);
      const besteMikeScore = parseInt(row[besteMikeScoreIndex] || '0', 10);

      return {
        name: names.alias,
        internalName: names.internal,
        fantasyScore,
        besteMikeScore,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b?.fantasyScore || 0) - (a?.fantasyScore || 0)); // Sort by fantasy score descending

  return (
    <div className="w-full mt-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
        Score Overzicht
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fantasy Totale Score Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Fantasy Totale Score
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="name"
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
              <Bar dataKey="fantasyScore" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getPlayerColor(entry?.internalName || '')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Beste Mike Score Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Beste Mike Score
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="name"
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
              <Bar dataKey="besteMikeScore" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getPlayerColor(entry?.internalName || '')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

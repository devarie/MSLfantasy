'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPlayerBio } from '@/data/playerBios';
import { getPlayerColor } from '@/data/playerColors';
import Image from 'next/image';

interface CompetitionSheet {
  name: string;
  data: string[][];
  error?: string;
}

interface FantasyChartsContainerProps {
  sheets: CompetitionSheet[];
}

// Custom dot component with avatar
const CustomDot = (props: any) => {
  const { cx, cy, payload, dataKey } = props;
  const playerBio = getPlayerBio(dataKey);

  if (!playerBio || !playerBio.avatar || playerBio.avatar === '/images/avatars/placeholder.jpg') {
    return null;
  }

  return (
    <g>
      <defs>
        <clipPath id={`clip-${dataKey}`}>
          <circle cx={cx} cy={cy} r={12} />
        </clipPath>
      </defs>
      <image
        x={cx - 12}
        y={cy - 12}
        width={24}
        height={24}
        href={playerBio.avatar}
        clipPath={`url(#clip-${dataKey})`}
        style={{ cursor: 'pointer' }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill="none"
        stroke="#10b981"
        strokeWidth={2}
      />
    </g>
  );
};

export default function FantasyChartsContainer({ sheets }: FantasyChartsContainerProps) {
  // Filter out 'Deelnemers' sheet and only keep game sheets
  const gameSheets = sheets.filter(sheet => sheet.name !== 'Deelnemers' && !sheet.error);

  if (gameSheets.length === 0) {
    return null;
  }

  // Extract player names from first game sheet (skip header row)
  const firstGameData = gameSheets[0]?.data || [];
  const [, ...playerRows] = firstGameData;

  // Get unique player names
  const playerNames = playerRows
    .map(row => {
      const cellValue = row[0];
      if (!cellValue) return null;
      // Extract name from parentheses if present
      const match = cellValue.match(/\(([^)]+)\)/);
      return match ? match[1] : cellValue;
    })
    .filter(Boolean) as string[];


  // Prepare data for Fantasy Scores chart
  const fantasyScoresData = gameSheets.map((sheet, gameIndex) => {
    const [, ...rows] = sheet.data;
    const dataPoint: Record<string, string | number> = { game: sheet.name };

    rows.forEach(row => {
      const cellValue = row[0];
      if (!cellValue) return;

      const match = cellValue.match(/\(([^)]+)\)/);
      const playerName = match ? match[1] : cellValue;
      const fantasyScore = parseInt(row[2] || '0', 10); // Column C (index 2)

      dataPoint[playerName] = fantasyScore;
    });

    return dataPoint;
  });

  // Prepare data for Game Results chart
  const gameResultsData = gameSheets.map((sheet, gameIndex) => {
    const [, ...rows] = sheet.data;
    const dataPoint: Record<string, string | number> = { game: sheet.name };

    rows.forEach(row => {
      const cellValue = row[0];
      if (!cellValue) return;

      const match = cellValue.match(/\(([^)]+)\)/);
      const playerName = match ? match[1] : cellValue;
      const gameResult = parseInt(row[3] || '0', 10); // Column D (index 3)

      dataPoint[playerName] = gameResult;
    });

    return dataPoint;
  });

  return (
    <div className="w-full mt-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
        Voortgang Grafieken
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fantasy Scores Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Fantasy Scores na elk spel
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={fantasyScoresData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="game"
                className="text-xs text-zinc-600 dark:text-zinc-400"
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              {playerNames.map((player) => (
                <Line
                  key={player}
                  type="monotone"
                  dataKey={player}
                  stroke={getPlayerColor(player)}
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={{ r: 14 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Game Results Chart */}
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
          <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
            Uitslag na elk spel
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={gameResultsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-emerald-200 dark:stroke-emerald-700" />
              <XAxis
                dataKey="game"
                className="text-xs text-zinc-600 dark:text-zinc-400"
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              {playerNames.map((player) => (
                <Line
                  key={player}
                  type="monotone"
                  dataKey={player}
                  stroke={getPlayerColor(player)}
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={{ r: 14 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

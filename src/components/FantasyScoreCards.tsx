'use client';

import { getPlayerColor } from '@/data/playerColors';

interface Player {
  name: string;
  score: number;
}

interface FantasyScoreCardsProps {
  players: Player[];
}

export default function FantasyScoreCards({ players }: FantasyScoreCardsProps) {
  // Get top 3 players
  const top3 = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

  // Find max score for percentage calculation
  const maxScore = Math.max(...players.map(p => p.score));

  // Get player colors and create ring configs
  const ringConfigs = top3.map((player, index) => ({
    color: getPlayerColor(player.name),
    label: index === 0 ? '🥇 1e plaats' : index === 1 ? '🥈 2e plaats' : '🥉 3e plaats',
    radius: 140 - (index * 30), // 140, 110, 80
  }));

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
        Top 3 Klassement
      </h2>

      {/* Single Activity Card */}
      <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-xl dark:border-emerald-800 dark:bg-emerald-950/50">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-around">
          {/* Activity Rings */}
          <div className="relative flex h-80 w-80 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 320 320">
              <defs>
                {ringConfigs.map((config, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: config.color, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: config.color, stopOpacity: 0.6 }} />
                  </linearGradient>
                ))}
              </defs>

              {/* Draw rings for top 3 */}
              {top3.map((player, index) => {
                const config = ringConfigs[index];
                const percentage = maxScore > 0 ? (player.score / maxScore) * 100 : 0;
                const circumference = 2 * Math.PI * config.radius;
                const offset = circumference * (1 - percentage / 100);

                return (
                  <g key={player.name}>
                    {/* Background circle */}
                    <circle
                      cx="160"
                      cy="160"
                      r={config.radius}
                      stroke="currentColor"
                      strokeWidth="20"
                      fill="none"
                      className="text-zinc-100 dark:text-zinc-800"
                      opacity="0.3"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="160"
                      cy="160"
                      r={config.radius}
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="20"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className="transition-all duration-1000 ease-out"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Center text */}
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Fantasy
              </span>
              <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                Top 3
              </span>
            </div>
          </div>

          {/* Player details */}
          <div className="flex flex-col gap-4">
            {top3.map((player, index) => {
              const config = ringConfigs[index];
              const percentage = maxScore > 0 ? (player.score / maxScore) * 100 : 0;

              return (
                <div
                  key={player.name}
                  className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-700 dark:bg-emerald-900/30"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {player.name}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {config.label}
                      </span>
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        {player.score}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

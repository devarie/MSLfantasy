'use client';

interface Player {
  name: string;
  score: number;
}

interface FantasyScoreCardsProps {
  players: Player[];
}

export default function FantasyScoreCards({ players }: FantasyScoreCardsProps) {
  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Find max score for percentage calculation
  const maxScore = Math.max(...players.map(p => p.score));

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Fantasy Totaal Scores
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedPlayers.map((player, index) => {
          const percentage = maxScore > 0 ? (player.score / maxScore) * 100 : 0;
          const isTop3 = index < 3;

          // Color based on position
          const ringColor = isTop3
            ? index === 0
              ? 'from-yellow-400 to-amber-500' // Gold
              : index === 1
              ? 'from-gray-300 to-gray-400' // Silver
              : 'from-amber-600 to-amber-700' // Bronze
            : 'from-blue-400 to-blue-600'; // Default blue

          return (
            <div
              key={player.name}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition-all hover:scale-105 ${
                isTop3
                  ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-900 dark:from-amber-950 dark:to-orange-950'
                  : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
              {/* Position badge for top 3 */}
              {isTop3 && (
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white shadow-lg">
                  #{index + 1}
                </div>
              )}

              {/* Circular progress ring */}
              <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center">
                {/* Background circle */}
                <svg className="absolute h-full w-full -rotate-90 transform">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-zinc-200 dark:text-zinc-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient-${player.name})"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id={`gradient-${player.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop
                        offset="0%"
                        style={{ stopColor: isTop3 ? (index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : '#d97706') : '#60a5fa' }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: isTop3 ? (index === 0 ? '#f59e0b' : index === 1 ? '#9ca3af' : '#b45309') : '#2563eb' }}
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score in center */}
                <div className="relative flex flex-col items-center">
                  <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    {player.score}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Player name */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {player.name}
                </h3>
                {isTop3 && (
                  <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                    {index === 0 ? '🏆 Kampioen' : index === 1 ? '🥈 Tweede' : '🥉 Derde'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

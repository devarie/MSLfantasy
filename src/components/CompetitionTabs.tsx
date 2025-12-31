'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getPlayerBio, PlayerBio } from '@/data/playerBios';
import { extractPlayerNames, getInternalName } from '@/utils/nameHelpers';
import Image from 'next/image';
import { User } from 'lucide-react';

const PlayerBioModal = dynamic(() => import('./PlayerBioModal'), {
  ssr: false,
  loading: () => null,
});

interface CompetitionSheet {
  name: string;
  data: string[][];
  error?: string;
}

interface CompetitionTabsProps {
  sheets: CompetitionSheet[];
  lastUpdated: string;
}

export default function CompetitionTabs({ sheets, lastUpdated }: CompetitionTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);

  if (!sheets || sheets.length === 0) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950">
        <p className="text-yellow-800 dark:text-yellow-200">
          Geen competities gevonden
        </p>
      </div>
    );
  }

  const currentSheet = sheets[activeTab];
  const [headers, ...rows] = currentSheet.data || [[]];
  const lastUpdate = new Date(lastUpdated).toLocaleString('nl-NL');

  // Get all unique player names from the current sheet (internal names for lookups)
  const allPlayerNames = rows
    .map(row => {
      const cellValue = row[0];
      if (!cellValue) return null;
      return getInternalName(cellValue);
    })
    .filter(Boolean) as string[];

  // Get all valid player bios
  const allPlayers = allPlayerNames
    .map(name => getPlayerBio(name))
    .filter(Boolean) as PlayerBio[];

  // Navigation functions
  const handleNextPlayer = () => {
    if (!selectedPlayer || allPlayers.length === 0) return;
    const currentIndex = allPlayers.findIndex(p => p.name === selectedPlayer.name);
    const nextIndex = (currentIndex + 1) % allPlayers.length;
    setSelectedPlayer(allPlayers[nextIndex]);
  };

  const handlePreviousPlayer = () => {
    if (!selectedPlayer || allPlayers.length === 0) return;
    const currentIndex = allPlayers.findIndex(p => p.name === selectedPlayer.name);
    const previousIndex = (currentIndex - 1 + allPlayers.length) % allPlayers.length;
    setSelectedPlayer(allPlayers[previousIndex]);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-6 flex items-center justify-between">
        <div className="overflow-x-auto">
          <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
            {sheets.map((sheet, index) => (
              <button
                key={sheet.name}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'border-b-2 border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100'
                }`}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        </div>
        <p className="ml-4 text-sm text-zinc-500 dark:text-zinc-400" suppressHydrationWarning>
          Bijgewerkt: {lastUpdate}
        </p>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-emerald-200 bg-white/95 p-6 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
          {currentSheet.name}
        </h2>

        {currentSheet.error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-red-800 dark:text-red-200">
              Fout bij laden: {currentSheet.error}
            </p>
          </div>
        ) : !currentSheet.data || currentSheet.data.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">Geen data beschikbaar</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  {headers?.map((header, index) => (
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
                {rows?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-emerald-100 transition-colors hover:bg-emerald-50/50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
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
                        {cellIndex === 0 && cell ? (
                          <button
                            onClick={() => {
                              // Extract internal name for bio lookup
                              const playerNames = extractPlayerNames(cell);
                              const playerBio = getPlayerBio(playerNames.internal);
                              if (playerBio) {
                                setSelectedPlayer(playerBio);
                              } else {
                                console.log('No bio found for:', playerNames.internal, 'from cell:', cell);
                              }
                            }}
                            className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 transition-all hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-800 dark:hover:text-emerald-100"
                          >
                            {/* Avatar */}
                            {(() => {
                              const playerNames = extractPlayerNames(cell);
                              const playerBio = getPlayerBio(playerNames.internal);
                              const hasValidAvatar = playerBio?.avatar && playerBio.avatar !== '/images/avatars/placeholder.jpg';

                              return hasValidAvatar ? (
                                <div className="relative h-8 w-8 flex-shrink-0">
                                  <Image
                                    src={playerBio.avatar}
                                    alt={playerNames.alias}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover rounded-full border-2 border-emerald-600"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 bg-emerald-100 dark:bg-emerald-800">
                                  <User className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                                </div>
                              );
                            })()}
                            {/* Player name */}
                            <span>{extractPlayerNames(cell).alias}</span>
                          </button>
                        ) : (
                          cell || '-'
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Player Bio Modal */}
      <PlayerBioModal
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        player={selectedPlayer}
        onNext={handleNextPlayer}
        onPrevious={handlePreviousPlayer}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';

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
                    ? 'border-b-2 border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        </div>
        <p className="ml-4 text-sm text-zinc-500 dark:text-zinc-400">
          Bijgewerkt: {lastUpdate}
        </p>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
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
        )}
      </div>
    </div>
  );
}

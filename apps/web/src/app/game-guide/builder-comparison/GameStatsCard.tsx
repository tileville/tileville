import React from "react";

type GameStat = {
  label: string;
  value: string | number;
  change?: number;
};

type GameStatsCardProps = {
  title: string;
  stats: GameStat[];
};

export default function GameStatsCard({ title, stats }: GameStatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{stat.value}</span>
              {stat.change !== undefined && (
                <span
                  className={`text-xs ${
                    stat.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

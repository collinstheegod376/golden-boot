import React from 'react';
import { useStats } from '../hooks/useStats';

const StatsBar: React.FC = () => {
  const stats = useStats();

  const statsList = [
    { label: 'PLAYERS', value: stats.totalPlayers },
    { label: 'TOTAL MARKET CAP', value: stats.totalMarketCap },
    { label: 'TOTAL 24H VOLUME', value: stats.totalVolume24h },
    { label: 'TOP GAINER', value: stats.topGainer },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-y border-[#1a1a1a] py-12">
        {statsList.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center">
            <span className="text-3xl md:text-4xl font-black text-primary-gold mb-2 gold-glow">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-text-secondary tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;

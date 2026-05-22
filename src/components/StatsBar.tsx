
import React from 'react';
import { useStats } from '../hooks/useStats';

const StatsBar: React.FC = () => {
  const { stats, loading } = useStats();

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(2)}K`;
    return `$${val.toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[#1a1a1a] py-12">
        <StatBox 
          label="Players" 
          value={stats.playerCount.toString()} 
          loading={loading}
        />
        <StatBox 
          label="Total Market Cap" 
          value={formatCurrency(stats.totalMarketCap)} 
          loading={loading}
          isGlow
        />
        <StatBox 
          label="Total 24h Volume" 
          value={formatCurrency(stats.totalVolume)} 
          loading={loading}
          isGlow
        />
        <StatBox 
          label="Top Gainer" 
          value={stats.topGainer ? stats.topGainer.ticker.toUpperCase() : "---"} 
          loading={loading}
          isGlow
        />
      </div>
    </div>
  );
};

interface StatBoxProps {
  label: string;
  value: string;
  loading: boolean;
  isGlow?: boolean;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, loading, isGlow }) => {
  const hasValue = value.trim() !== '' && value !== '---';

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {loading && !hasValue ? (
        <div className="h-10 w-24 bg-[#121214] animate-pulse rounded mb-2" />
      ) : (
        <span className={`text-3xl md:text-4xl font-black font-mono transition-all duration-500 ${isGlow ? 'text-primary-gold gold-glow' : 'text-white'}`}>
          {value}
        </span>
      )}
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary mt-2">
        {label}
      </span>
    </div>
  );
};

export default StatsBar;

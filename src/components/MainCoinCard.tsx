
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { METADATA } from '../data/metadata';

const MainCoinCard: React.FC = () => {
  const { mainCoin } = METADATA;

  const copyCA = () => {
    navigator.clipboard.writeText(mainCoin.ca);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-[#0B0B0C] border border-[#2d2d30] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Branding */}
        <div className="flex-1 p-8 md:p-12 border-r border-[#2d2d30]">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-[#121214] border border-primary-gold rounded-full p-4 gold-glow flex items-center justify-center">
              <img src={mainCoin.image} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-secondary text-xs font-bold tracking-widest uppercase opacity-60">Main Coin</span>
              <h2 className="text-4xl font-black text-white">{mainCoin.ticker}</h2>
            </div>
          </div>
          
          <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
            {mainCoin.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#121214] border border-[#2d2d30] rounded-lg px-4 py-2 flex items-center gap-3">
              <span className="text-xs font-mono text-text-secondary uppercase truncate max-w-[150px]">
                {mainCoin.ca}
              </span>
              <button onClick={copyCA} className="text-text-secondary hover:text-white transition-colors">
                <Copy size={14} />
              </button>
            </div>
            <a 
              href={mainCoin.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-green hover:bg-[#00c574] text-black font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              BUY {mainCoin.ticker} ON PUMP.FUN
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Right Side: Stats Grid */}
        <div className="flex-1 bg-[#121214]/30 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <StatRow label="Price" value={mainCoin.stats.price} />
            <StatRow label="Market Cap" value={mainCoin.stats.marketCap} />
            <StatRow label="24h Volume" value={mainCoin.stats.volume24h} />
            <StatRow label="24h Change" value={mainCoin.stats.change24h} isChange />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, isChange }: { label: string; value: string; isChange?: boolean }) => {
  const isPositive = value.startsWith('+');
  const colorClass = isChange ? (isPositive ? 'text-accent-green' : 'text-accent-red') : 'text-white';

  return (
    <div className="flex flex-col justify-center border-b border-[#2d2d30] pb-6">
      <span className="text-text-secondary text-xs font-bold tracking-widest uppercase mb-2">{label}</span>
      <span className={`text-2xl md:text-3xl font-black font-mono ${colorClass}`}>{value}</span>
    </div>
  );
};

export default MainCoinCard;

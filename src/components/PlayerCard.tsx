
import React from 'react';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PlayerData } from '../data/metadata';
import { usePumpData } from '../hooks/usePumpData';

interface PlayerCardProps {
  player: PlayerData;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { data: pumpData, loading } = usePumpData(player.ca);
  const isPositive = player.change24h >= 0;

  // Derive display values with fallbacks and skeletons
  const displayPrice = pumpData ? `$${(pumpData.usd_market_cap / pumpData.total_supply * 10**6).toFixed(6)}` : player.price;
  const displayMC = pumpData ? `$${(pumpData.usd_market_cap / 1000).toFixed(2)}K` : player.marketCap;
  const displayImage = pumpData?.image_uri || player.image || "https://premium.pump.fun/placeholder.png";
  const displayName = pumpData?.name || player.name || "Loading Player...";
  const displayTicker = pumpData?.symbol ? `$${pumpData.symbol}` : (player.ticker || "???");

  const copyToClipboard = () => {
    const ca = player.ca.includes('/') ? player.ca.split('/').pop()?.split('?')[0] : player.ca;
    if (ca) {
      navigator.clipboard.writeText(ca);
    }
  };

  if (!player.ca) {
    return (
      <div className="relative bg-[#0B0B0C] border border-dashed border-[#2d2d30] rounded-sm p-8 flex flex-col items-center justify-center text-center opacity-30 h-full min-h-[400px]">
        <div className="w-12 h-12 bg-[#121214] rounded-full mb-4 flex items-center justify-center">
            <span className="text-secondary text-2xl">+</span>
        </div>
        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Available Slot</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-[#0B0B0C] border border-[#ffd70033] hover:border-[#ffd700aa] transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full"
    >
      {/* Golden Boot Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-10 h-10 bg-[#0B0B0C] border border-primary-gold rounded-full flex items-center justify-center p-2 shadow-lg">
        <img src="/boot-logo.png" alt="Boot" className="w-full h-full object-contain" />
      </div>

      {/* Player Image / Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#121214]">
        {loading ? (
          <div className="absolute inset-0 bg-[#121214] animate-pulse" />
        ) : (
          <img 
            src={displayImage} 
            alt={displayName} 
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-60" />
      </div>

      {/* Player Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            {loading ? (
              <div className="h-6 w-24 bg-[#121214] animate-pulse rounded mb-2" />
            ) : (
              <h3 className="text-lg font-black text-white leading-tight uppercase truncate">{displayName}</h3>
            )}
            <span className="text-text-secondary text-xs font-mono tracking-tighter uppercase">{displayTicker}</span>
          </div>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-2 py-1 rounded text-[10px] font-bold ${isPositive ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}
          >
            {isPositive ? '+' : ''}{player.change24h.toFixed(2)}%
          </motion.div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">Price</span>
            {loading ? (
              <div className="h-4 w-16 bg-[#121214] animate-pulse rounded" />
            ) : (
              <span className="font-mono text-white">{displayPrice || '$0.0000'}</span>
            )}
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">Market Cap</span>
            {loading ? (
              <div className="h-4 w-12 bg-[#121214] animate-pulse rounded" />
            ) : (
              <span className="font-mono text-white">{displayMC || '$0.00K'}</span>
            )}
          </div>
        </div>

        {/* Contract Address Section */}
        <div className="mt-auto pt-4 border-t border-[#ffffff10] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#ffffff4d] truncate max-w-[140px] uppercase">
             {player.ca.includes('/') ? player.ca.split('/').pop() : player.ca}
          </span>
          <button 
            onClick={copyToClipboard}
            className="p-1 text-text-secondary hover:text-primary-gold transition-colors"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
      
      {/* Decorative Golden Border corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-gold" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-gold" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-gold" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-gold" />
    </motion.div>
  );
};

export default PlayerCard;


import React from 'react';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PlayerData } from '../data/metadata';

interface PlayerCardProps {
  player: PlayerData;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const isPositive = player.change24h >= 0;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(player.ca);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-[#0B0B0C] border border-[#ffd70033] hover:border-[#ffd700aa] transition-all duration-300 rounded-sm overflow-hidden flex flex-col"
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-10 h-10 bg-[#0B0B0C] border border-primary-gold rounded-full flex items-center justify-center p-2 shadow-lg">
        <img src="/boot-logo.png" alt="Boot" className="w-full h-full object-contain" />
      </div>

      <div className="relative aspect-[3/4] overflow-hidden bg-[#121214]">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black text-white leading-tight">{player.name}</h3>
            <span className="text-text-secondary text-sm font-mono tracking-tighter uppercase">{player.ticker}</span>
          </div>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-2 py-1 rounded text-xs font-bold ${isPositive ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}
          >
            {isPositive ? '+' : ''}{player.change24h.toFixed(2)}%
          </motion.div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Price</span>
            <span className="font-mono text-white">{player.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Market Cap</span>
            <span className="font-mono text-white">{player.marketCap}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#ffffff10] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#ffffff4d] truncate max-w-[140px] uppercase">
            {player.ca}
          </span>
          <button 
            onClick={copyToClipboard}
            className="p-1 text-text-secondary hover:text-primary-gold transition-colors"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-gold" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-gold" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-gold" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-gold" />
    </motion.div>
  );
};

export default PlayerCard;

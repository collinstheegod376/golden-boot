
import { useMemo } from 'react';
import { PLAYERS, METADATA } from '../data/metadata';

export const useStats = () => {
  return useMemo(() => {
    const totalPlayers = PLAYERS.length;
    
    // In a real app, you'd parse these strings or fetch them
    // For now, we use the ones in METADATA as the user can edit them there
    
    const topGainerPlayer = [...PLAYERS].sort((a, b) => b.change24h - a.change24h)[0];
    
    return {
      totalPlayers,
      totalMarketCap: METADATA.stats.totalMarketCap,
      totalVolume24h: METADATA.stats.totalVolume24h,
      topGainer: topGainerPlayer ? topGainerPlayer.ticker.replace('$', '') : METADATA.stats.topGainer
    };
  }, []);
};

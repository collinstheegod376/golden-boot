
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface GlobalStats {
  totalMarketCap: number;
  totalVolume: number;
  topGainer: {
    name: string;
    ticker: string;
    change: number;
  } | null;
  playerCount: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<GlobalStats>({
    totalMarketCap: 0,
    totalVolume: 0,
    topGainer: null,
    playerCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      setLoading(true);
      try {
        const { data: players, error } = await supabase
          .from('players')
          .select('*');

        if (players && !error) {
          let totalMC = 0;
          let highestGainer = { name: '', ticker: '', change: -999 };

          players.forEach(res => {
            totalMC += Number(res.market_cap || 0);
            if (Number(res.change_24h) > highestGainer.change) {
              highestGainer = { name: res.name, ticker: res.ticker, change: Number(res.change_24h) };
            }
          });

          setStats({
            totalMarketCap: totalMC,
            totalVolume: totalMC * 0.1, 
            topGainer: highestGainer.name ? highestGainer : null,
            playerCount: players.length
          });
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
    
    // Subscribe to any changes in the players table with a unique channel name
    const channel = supabase
      .channel('global-dashboard-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchGlobalData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading };
};


import { useEffect, useId, useState } from 'react';
import { supabase } from '../lib/supabase';
import { METADATA, PLAYERS } from '../data/metadata';

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

const parseCurrency = (value: string) => {
  const cleaned = value.replace(/[$,\s]/g, '').trim();
  const suffix = cleaned.slice(-1).toUpperCase();
  const amount = Number.parseFloat(cleaned);

  if (Number.isNaN(amount)) {
    return 0;
  }

  if (suffix === 'M') return amount * 1000000;
  if (suffix === 'K') return amount * 1000;
  return amount;
};

const createFallbackStats = (): GlobalStats => ({
  totalMarketCap: parseCurrency(METADATA.stats.totalMarketCap),
  totalVolume: parseCurrency(METADATA.stats.totalVolume24h),
  topGainer: METADATA.stats.topGainer && METADATA.stats.topGainer !== '???'
    ? {
        name: METADATA.stats.topGainer,
        ticker: METADATA.stats.topGainer.replace(/^\$/, ''),
        change: 0,
      }
    : null,
  playerCount: PLAYERS.filter((player) => player.ca).length || METADATA.stats.totalPlayers,
});

export const useStats = () => {
  const channelId = useId();
  const [stats, setStats] = useState<GlobalStats>(createFallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchGlobalData = async () => {
      setLoading(true);

      try {
        const { data: players, error } = await supabase
          .from('players')
          .select('*');

        if (!isActive) {
          return;
        }

        if (error) {
          throw error;
        }

        if (players && players.length > 0) {
          let totalMC = 0;
          let totalVolume = 0;
          let highestGainer = { name: '', ticker: '', change: -999 };

          players.forEach(res => {
            totalMC += Number(res.market_cap || 0);
            totalVolume += Number(res.volume_24h || 0);
            if (Number(res.change_24h) > highestGainer.change) {
              highestGainer = { name: res.name, ticker: res.ticker, change: Number(res.change_24h) };
            }
          });

          setStats({
            totalMarketCap: totalMC,
            totalVolume,
            topGainer: highestGainer.name ? highestGainer : null,
            playerCount: players.length
          });
        } else {
          setStats(createFallbackStats());
        }
      } catch (err) {
        if (isActive) {
          console.error('Stats fetch error:', err);
          setStats(createFallbackStats());
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchGlobalData();

    const channel = supabase
      .channel(`global-dashboard-stats-${channelId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchGlobalData)
      .subscribe();

    return () => {
      isActive = false;
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  return { stats, loading };
};

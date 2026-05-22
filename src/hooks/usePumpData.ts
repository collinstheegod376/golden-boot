
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PumpCoinData {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  usd_market_cap: number;
  total_supply: number;
}

const cleanMintAddress = (input: string) => {
  if (!input) return '';
  let mint = input.trim();
  if (mint.includes('pump.fun/coin/')) {
    mint = mint.split('/').pop()?.split('?')[0] || mint;
  }
  if (mint.toLowerCase().endsWith('pump') && mint.length > 40) {
    mint = mint.substring(0, mint.length - 4).trim();
  }
  return mint;
};

export const usePumpData = (inputAddress: string) => {
  const [data, setData] = useState<PumpCoinData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mintAddress = cleanMintAddress(inputAddress);

    if (!mintAddress || mintAddress.length < 32 || mintAddress.includes('...')) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Query Supabase for cached data (Bypasses CORS issues)
        const { data: cached, error: supabaseError } = await supabase
            .from('players')
            .select('*')
            .eq('ca', mintAddress)
            .single();

        if (cached && !supabaseError) {
          setData({
            mint: cached.ca,
            name: cached.name,
            symbol: cached.ticker,
            description: "",
            image_uri: cached.image_url,
            usd_market_cap: cached.market_cap,
            total_supply: 1000000000
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Subscribe to real-time updates from Supabase with a unique channel name
    const channel = supabase
      .channel(`player-updates-${mintAddress}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'players', filter: `ca=eq.${mintAddress}` },
        (payload) => {
           setData({
            mint: payload.new.ca,
            name: payload.new.name,
            symbol: payload.new.ticker,
            description: "",
            image_uri: payload.new.image_url,
            usd_market_cap: payload.new.market_cap,
            total_supply: 1000000000
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [inputAddress]);

  return { data, loading, error };
};

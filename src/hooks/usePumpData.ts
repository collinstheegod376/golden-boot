
import { useEffect, useId, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface PumpCoinData {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  usd_market_cap: number;
  total_supply: number;
  price?: number;
  volume_24h?: number;
  change_24h?: number;
}

const cleanMintAddress = (input: string) => {
  if (!input) return '';
  let mint = input.trim();
  if (mint.includes('pump.fun/coin/')) {
    mint = mint.split('/').pop()?.split('?')[0] || mint;
  }
  return mint;
};

const getAddressCandidates = (input: string) => {
  const exactMint = cleanMintAddress(input);

  if (!exactMint) {
    return [];
  }

  const candidates = [exactMint];

  if (exactMint.toLowerCase().endsWith('pump') && exactMint.length > 40) {
    candidates.push(exactMint.slice(0, -4).trim());
  }

  return [...new Set(candidates)];
};

const getPrimaryPair = (pairs: any[]) => {
  if (!Array.isArray(pairs) || pairs.length === 0) {
    return null;
  }

  return [...pairs].sort((left, right) => {
    const rightScore = Number(right.marketCap ?? right.fdv ?? right.liquidity?.usd ?? 0);
    const leftScore = Number(left.marketCap ?? left.fdv ?? left.liquidity?.usd ?? 0);
    return rightScore - leftScore;
  })[0];
};

const pickText = (...values: Array<string | undefined | null>) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0) ?? '';

const pickNumber = (...values: Array<number | undefined | null>) =>
  values.find((value) => typeof value === 'number' && Number.isFinite(value) && value > 0) ?? 0;

const pickSignedNumber = (...values: Array<number | undefined | null>) =>
  values.find((value) => typeof value === 'number' && Number.isFinite(value)) ?? 0;

const fetchDexScreenerData = async (mintAddress: string): Promise<PumpCoinData | null> => {
  const response = await fetch(`https://api.dexscreener.com/token-pairs/v1/solana/${mintAddress}`);

  if (!response.ok) {
    throw new Error(`DEX Screener request failed with ${response.status}`);
  }

  const pairs = await response.json();
  const pair = getPrimaryPair(pairs);

  if (!pair) {
    return null;
  }

  return {
    mint: mintAddress,
    name: pair.baseToken?.name ?? '',
    symbol: pair.baseToken?.symbol ?? '',
    description: '',
    image_uri: pair.info?.imageUrl ?? '',
    usd_market_cap: Number(pair.marketCap ?? pair.fdv ?? 0),
    total_supply: 0,
    price: Number(pair.priceUsd ?? 0),
    volume_24h: Number(pair.volume?.h24 ?? 0),
    change_24h: Number(pair.priceChange?.h24 ?? 0),
  };
};

const fetchPumpFunData = async (mintAddress: string): Promise<PumpCoinData | null> => {
  const response = await fetch(`https://frontend-api.pump.fun/coins/${mintAddress}`);

  if (!response.ok) {
    return null;
  }

  const coin = await response.json();

  return {
    mint: mintAddress,
    name: coin.name ?? '',
    symbol: coin.symbol ?? '',
    description: coin.description ?? '',
    image_uri: coin.image_uri ?? '',
    usd_market_cap: Number(coin.usd_market_cap ?? 0),
    total_supply: Number(coin.total_supply ?? 0),
    price: Number(coin.usd_market_cap && coin.total_supply ? coin.usd_market_cap / coin.total_supply : 0),
    volume_24h: Number(coin.volume_24h ?? 0),
    change_24h: Number(coin.price_change_percent ?? 0),
  };
};

const mergeTokenData = (
  cachedData: PumpCoinData | null,
  dexData: PumpCoinData | null,
  pumpFunData: PumpCoinData | null,
  mintAddress: string,
): PumpCoinData | null => {
  const merged: PumpCoinData = {
    mint: mintAddress,
    name: pickText(cachedData?.name, pumpFunData?.name, dexData?.name),
    symbol: pickText(cachedData?.symbol, pumpFunData?.symbol, dexData?.symbol),
    description: pickText(cachedData?.description, pumpFunData?.description, dexData?.description),
    image_uri: pickText(cachedData?.image_uri, pumpFunData?.image_uri, dexData?.image_uri),
    usd_market_cap: pickNumber(cachedData?.usd_market_cap, pumpFunData?.usd_market_cap, dexData?.usd_market_cap),
    total_supply: pickNumber(cachedData?.total_supply, pumpFunData?.total_supply, dexData?.total_supply),
    price: pickNumber(cachedData?.price, pumpFunData?.price, dexData?.price),
    volume_24h: pickNumber(cachedData?.volume_24h, pumpFunData?.volume_24h, dexData?.volume_24h),
    change_24h: pickSignedNumber(cachedData?.change_24h, pumpFunData?.change_24h, dexData?.change_24h),
  };

  const hasMeaningfulData = Boolean(
    merged.name ||
    merged.symbol ||
    merged.image_uri ||
    merged.usd_market_cap ||
    merged.price,
  );

  return hasMeaningfulData ? merged : null;
};

export const usePumpData = (inputAddress: string) => {
  const channelId = useId();
  const [data, setData] = useState<PumpCoinData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const addressCandidates = getAddressCandidates(inputAddress);
    const mintAddress = addressCandidates[0] ?? '';

    if (!mintAddress || mintAddress.length < 32 || mintAddress.includes('...')) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let isActive = true;

    const mapRowToPumpData = (row: Record<string, any>): PumpCoinData => ({
      mint: row.ca,
      name: row.name ?? '',
      symbol: row.ticker ?? '',
      description: row.description ?? '',
      image_uri: row.image_url ?? '',
      usd_market_cap: Number(row.market_cap ?? 0),
      total_supply: Number(row.total_supply ?? 1000000000),
      price: Number(row.price ?? 0),
      volume_24h: Number(row.volume_24h ?? 0),
      change_24h: Number(row.change_24h ?? 0),
    });

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Cached reads from Supabase avoid direct browser calls to Pump.fun.
        const { data: cached, error: supabaseError } = await supabase
          .from('players')
          .select('*')
          .in('ca', addressCandidates)
          .limit(1)
          .maybeSingle();

        if (!isActive) {
          return;
        }

        if (supabaseError) {
          throw supabaseError;
        }

        const cachedData = cached ? mapRowToPumpData(cached) : null;

        setData(cachedData);

        const needsMarketFallback = !cachedData ||
          !cachedData.image_uri ||
          !cachedData.price ||
          !cachedData.usd_market_cap;

        if (needsMarketFallback) {
          const settledResults = await Promise.all(
            addressCandidates.map(async (candidate) => {
              const [dexData, pumpFunData] = await Promise.allSettled([
                fetchDexScreenerData(candidate),
                fetchPumpFunData(candidate),
              ]);

              return {
                candidate,
                dexData: dexData.status === 'fulfilled' ? dexData.value : null,
                pumpFunData: pumpFunData.status === 'fulfilled' ? pumpFunData.value : null,
              };
            }),
          );

          if (!isActive) {
            return;
          }

          const firstResolved = settledResults.find(
            (result) => result.dexData || result.pumpFunData,
          );

          const merged = mergeTokenData(
            cachedData,
            firstResolved?.dexData ?? null,
            firstResolved?.pumpFunData ?? null,
            mintAddress,
          );

          setData(merged);
        }
      } catch (err) {
        if (!isActive) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Unable to load token data.');
        setData(null);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    const channel = supabase
      .channel(`player-updates-${mintAddress}-${channelId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'players', filter: `ca=eq.${mintAddress}` },
        (payload) => {
          if (!isActive) {
            return;
          }

          setData(mapRowToPumpData(payload.new));
        }
      )
      .subscribe();

    return () => {
      isActive = false;
      supabase.removeChannel(channel);
    };
  }, [channelId, inputAddress]);

  return { data, loading, error };
};

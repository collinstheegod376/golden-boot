
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { METADATA } from '../data/metadata';
import { usePumpData } from '../hooks/usePumpData';

const MainCoinCard: React.FC = () => {
  const { mainCoin } = METADATA;
  const { data: pumpData, loading } = usePumpData(mainCoin.ca);

  const formatPrice = (value?: number) => {
    if (!value || value <= 0) return '';
    return `$${value.toFixed(6)}`;
  };

  const formatCurrency = (value?: number) => {
    if (!value || value <= 0) return '';
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const displayPrice = formatPrice(pumpData?.price) || mainCoin.stats.price;
  const displayMC = formatCurrency(pumpData?.usd_market_cap) || mainCoin.stats.marketCap;
  const displayVolume = formatCurrency(pumpData?.volume_24h) || mainCoin.stats.volume24h;
  const displayChange = pumpData?.change_24h !== undefined
    ? `${pumpData.change_24h >= 0 ? '+' : ''}${pumpData.change_24h.toFixed(2)}%`
    : mainCoin.stats.change24h;
  const displayImage = pumpData?.image_uri || mainCoin.image || '/boot-logo.png';
  const displayTicker = pumpData?.symbol ? `$${pumpData.symbol}` : mainCoin.ticker;
  const displayDescription = pumpData?.description || mainCoin.description;
  const showImageSkeleton = loading && !pumpData && !mainCoin.image;
  const showTickerSkeleton = loading && !pumpData && !mainCoin.ticker;
  const showDescriptionSkeleton = loading && !pumpData && !mainCoin.description;

  const copyCA = () => {
    const ca = mainCoin.ca.includes('/') ? mainCoin.ca.split('/').pop()?.split('?')[0] : mainCoin.ca;
    if (ca) navigator.clipboard.writeText(ca);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-[#0B0B0C] border border-[#2d2d30] rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[300px]">
        {/* Left Side: Branding */}
        <div className="flex-1 p-8 md:p-12 border-r border-[#2d2d30]">
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-24 h-24 bg-[#121214] border border-primary-gold rounded-full p-4 gold-glow flex items-center justify-center ${showImageSkeleton ? 'animate-pulse' : ''}`}>
              {!showImageSkeleton && (
                <img
                  src={displayImage}
                  alt="Logo"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/boot-logo.png';
                  }}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div>
              <span className="text-secondary text-xs font-bold tracking-widest uppercase opacity-60">Main Coin</span>
              {showTickerSkeleton ? (
                  <div className="h-10 w-32 bg-[#121214] animate-pulse rounded mt-2" />
              ) : (
                  <h2 className="text-4xl font-black text-white">{displayTicker}</h2>
              )}
            </div>
          </div>
          
          {showDescriptionSkeleton ? (
             <div className="space-y-2 mb-8">
                <div className="h-4 w-full bg-[#121214] animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-[#121214] animate-pulse rounded" />
             </div>
          ) : (
            <p className="text-text-secondary leading-relaxed mb-8 max-w-lg line-clamp-3 italic">
               "{displayDescription}"
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#121214] border border-[#2d2d30] rounded-lg px-4 py-2 flex items-center gap-3">
              <span className="text-xs font-mono text-text-secondary uppercase truncate max-w-[150px]">
                {mainCoin.ca.includes('/') ? mainCoin.ca.split('/').pop() : mainCoin.ca}
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
              BUY {displayTicker} ON PUMP.FUN
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Right Side: Stats Grid */}
        <div className="flex-1 bg-[#121214]/30 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <StatRow label="Price" value={displayPrice} loading={loading && !pumpData && !mainCoin.stats.price} />
            <StatRow label="Market Cap" value={displayMC} loading={loading && !pumpData && !mainCoin.stats.marketCap} />
            <StatRow label="24h Volume" value={displayVolume} loading={loading && !pumpData && !mainCoin.stats.volume24h} />
            <StatRow label="24h Change" value={displayChange} isChange loading={loading && !pumpData && !mainCoin.stats.change24h} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, isChange, loading }: { label: string; value: string; isChange?: boolean; loading?: boolean }) => {
  const isPositive = value && value.startsWith('+');
  const colorClass = isChange ? (isPositive ? 'text-accent-green' : 'text-accent-red') : 'text-white';

  return (
    <div className="flex flex-col justify-center border-b border-[#2d2d30] pb-6">
      <span className="text-text-secondary text-xs font-bold tracking-widest uppercase mb-2">{label}</span>
      {loading ? (
          <div className="h-10 w-24 bg-[#121214] animate-pulse rounded" />
      ) : (
          <span className={`text-2xl md:text-3xl font-black font-mono ${colorClass}`}>{value}</span>
      )}
    </div>
  );
};

export default MainCoinCard;

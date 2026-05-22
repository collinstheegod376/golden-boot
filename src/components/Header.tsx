
import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-black text-white">All Players</h1>
          <span className="text-secondary text-lg mt-2 opacity-50">20 Listed</span>
        </div>
        <p className="max-w-2xl text-text-secondary leading-relaxed">
          Every top striker in the World Cup 2026 has their own pump.fun coin. All coins are independently deployed on Solana via pump.fun — not affiliated with FIFA, the World Cup or the players.
        </p>
      </div>
      
      <div className="relative w-full md:w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input 
          type="text" 
          placeholder="Search players, countries, tickers..."
          className="w-full bg-[#121214] border border-[#2d2d30] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary-gold transition-colors"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import PlayerGrid from './components/PlayerGrid';
import MatchTimer from './components/MatchTimer';
import MainCoinCard from './components/MainCoinCard';
import { METADATA, PLAYERS } from './data/metadata';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalListed = PLAYERS.filter((player) => player.ca).length || METADATA.stats.totalPlayers;

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return PLAYERS.filter((player) =>
      player.name.toLowerCase().includes(normalizedSearch) ||
      player.ticker.toLowerCase().includes(normalizedSearch) ||
      player.country.toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-gold/5 blur-[120px] rounded-full"
        />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-white/[0.02] blur-[100px] rotate-12" />
      </div>

      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header onSearch={setSearchTerm} totalListed={totalListed} />
        </motion.div>

        <AnimatePresence mode="popLayout">
          <PlayerGrid players={filteredPlayers} />
        </AnimatePresence>

        <StatsBar />
        <MatchTimer />
        <MainCoinCard />

        <footer className="max-w-7xl mx-auto px-6 pt-12 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/boot-logo.png" alt="Golden Boot" className="w-8 h-8 opacity-50" />
            <span className="text-text-secondary text-sm font-bold tracking-widest uppercase">Golden Boot 2026</span>
          </div>
          <p className="text-[10px] text-text-secondary/50 max-w-sm text-center md:text-right">
            Disclaimer: Golden Boot coins are for entertainment purposes and community engagement only, inspired by the spirit of competition.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;

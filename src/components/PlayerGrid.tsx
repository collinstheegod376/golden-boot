
import React from 'react';
import PlayerCard from './PlayerCard';
import type { PlayerData } from '../data/metadata';

interface PlayerGridProps {
  players: PlayerData[];
}

const PlayerGrid: React.FC<PlayerGridProps> = ({ players }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
      
      {players.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-text-secondary text-xl">No players found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerGrid;

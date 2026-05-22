
import React, { useState, useEffect } from 'react';
import { METADATA } from '../data/metadata';

const MatchTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(METADATA.match.countdownTarget).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#121214] border border-[#2d2d30] rounded-lg w-16 h-20 md:w-20 md:h-24 flex items-center justify-center mb-2">
        <span className="text-3xl md:text-4xl font-black text-white">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] md:text-xs font-bold text-text-secondary tracking-widest uppercase">{label}</span>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="bg-[#0B0B0C] border border-[#2d2d30] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-primary-gold/5 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <span className="inline-block text-primary-gold font-bold text-xs tracking-widest uppercase mb-4 py-1 px-3 border border-primary-gold/30 rounded-full">
            Opening Match
          </span>
          <h2 className="text-xl md:text-2xl text-white mb-2">{METADATA.match.teams}</h2>
          <p className="text-text-secondary text-sm mb-8">{METADATA.match.date}</p>
          
          <div className="flex justify-center gap-4 md:gap-6">
            <TimerBox value={timeLeft.days} label="Days" />
            <TimerBox value={timeLeft.hours} label="Hrs" />
            <TimerBox value={timeLeft.minutes} label="Min" />
            <TimerBox value={timeLeft.seconds} label="Sec" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchTimer;

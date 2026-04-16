'use client';
import { useEffect, useState } from 'react';

export default function SeasonalEffect() {
  const [season, setSeason] = useState('');

  useEffect(() => {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 3 && month <= 5) setSeason('spring'); // Mùa xuân (Hoa rơi)
    else if (month >= 9 && month <= 10) setSeason('autumn'); // Mùa thu (Lá rụng)
    else if (month === 12 || month <= 2) setSeason('winter'); // Mùa đông (Tuyết)
  }, []);

  if (!season) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30 dark:opacity-20">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className={`absolute animate-fall`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * -20}s`,
            fontSize: `${Math.random() * 1.5 + 0.5}rem`
          }}
        >
          {season === 'spring' && '🌸'}
          {season === 'autumn' && '🍂'}
          {season === 'winter' && '❄️'}
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}</style>
    </div>
  );
}

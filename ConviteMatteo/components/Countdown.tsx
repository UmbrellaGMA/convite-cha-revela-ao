
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      // Garante suporte com ou sem hora especificada
      const targetTime = targetDate.includes('T') ? new Date(targetDate) : new Date(`${targetDate}T14:00:00`);
      const difference = +targetTime - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex justify-center gap-2 md:gap-3 text-[#5D4330] my-5">
      {[
        { label: 'Dias', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Seg', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white/90 backdrop-blur-sm py-2 px-2 md:px-3 rounded-xl border border-[#E4D5C7] w-14 sm:w-16 shadow-[0_2px_10px_rgba(100,70,45,0.06)]"
        >
          <span className="text-lg md:text-xl font-serif-delicate font-bold text-[#745037]">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#9C7A5E] font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;



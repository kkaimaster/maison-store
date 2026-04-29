import { useState, useEffect } from 'react';
import { Link } from 'wouter';

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, mins, secs, ended: diff === 0 };
}

export default function PromoCountdown() {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);
  const [time, setTime] = useState(getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="bg-[#1A1A18] py-12 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">LIMITED TIME OFFER</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-white">
            {time.ended ? 'SALE ENDED' : 'Summer Sale — Up to 30% Off'}
          </h2>
          <p className="text-[#8A8A82] text-sm font-light mt-2">On selected T-Shirts. While stocks last.</p>
        </div>

        {!time.ended && (
          <div className="flex items-center gap-4 md:gap-6">
            {[
              { value: pad(time.days), label: 'DAYS' },
              { value: pad(time.hours), label: 'HRS' },
              { value: pad(time.mins), label: 'MIN' },
              { value: pad(time.secs), label: 'SEC' },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-4 md:gap-6">
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl font-light text-white leading-none tabular-nums">
                    {unit.value}
                  </div>
                  <p className="section-label text-[9px] text-[#8A8A82] mt-1">{unit.label}</p>
                </div>
                {i < 3 && <span className="font-display text-3xl text-[#C9A96E] font-light leading-none mb-4">:</span>}
              </div>
            ))}
          </div>
        )}

        <Link href="/collections/sale">
          <button className="btn-gold whitespace-nowrap">SHOP SALE</button>
        </Link>
      </div>
    </section>
  );
}

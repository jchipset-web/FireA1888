import React from 'react';

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      kicker: 'LOCAL CAUSES',
      value: '$84,500+',
      description: 'Reinvested in youth athletics, municipal & local medical relief',
    },
    {
      kicker: 'ANNUAL SERVICE',
      value: '500+ Hours',
      description: 'Contributed by members to civic support, events, & parades',
    },
    {
      kicker: 'HERITAGE LEGACY',
      value: '135+ Years',
      description: 'Preserving Forest’s volunteer fire history and the 1922 Bickle pumper',
    },
    {
      kicker: 'LOCAL REINVESTMENT',
      value: '100% Retained',
      description: 'Every single dollar stays right here in Lambton Shores',
    },
  ];

  return (
    <section className="bg-[#0B132B] py-10 sm:py-12 border-b border-slate-800 text-white relative overflow-hidden">
      {/* Subtle ambient amber glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3.5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-amber-400 uppercase mb-1 sm:mb-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform"></span>
                  <span className="truncate">{stat.kicker}</span>
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 sm:mb-2 font-mono tabular-nums group-hover:text-amber-300 transition-colors">
                  {stat.value}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-snug sm:leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

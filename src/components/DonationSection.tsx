import React, { useState } from 'react';
import { Heart, Trophy, Landmark, Users, ShieldCheck, Check } from 'lucide-react';

interface DonationSectionProps {
  onTriggerCheckout: (amount: number, impact: string) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ onTriggerCheckout }) => {
  const [selectedTier, setSelectedTier] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  const tiers = [
    {
      amount: 25,
      impact: 'Provides immediate support for community emergency food drives and holiday relief hampers.',
    },
    {
      amount: 50,
      impact: 'Supports youth athletics equipment for the champion Forest ringette program and maintains holiday fireworks supply reserves.',
    },
    {
      amount: 100,
      impact: 'Dedicated toward the preservation and maintenance of our operational 1922 Oldsmobile Bickle historic pumper.',
    },
    {
      amount: 250,
      impact: 'Underwrites major community traditions, local park amenities, and civic landmark preservation projects.',
    },
  ];

  const currentImpact = isCustom
    ? `Custom philanthropic gift of $${customAmount || '0'} directly stewarded by Association Treasurer Cody Wilcox for vital local causes.`
    : (tiers.find((t) => t.amount === selectedTier)?.impact || tiers[1].impact);

  const finalAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedTier;

  const handleSelectTier = (amount: number) => {
    setSelectedTier(amount);
    setIsCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setIsCustom(true);
  };

  return (
    <section id="support" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4">
            <span>— DIRECT LOCAL STEWARDSHIP —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Support Us / Donations: <span className="text-amber-500">Why Your Support Matters</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The Forest Firefighters Association 1888 is an independent, non-profit organization made
            up of off-duty personnel, retirees, and alumni. When you donate to the Association, 100% of
            your contribution stays right here in Forest.
          </p>
        </div>

        {/* 4 Impact Pillars - 2x2 on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {/* Pillar 1 */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-3.5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 sm:mb-4">
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">
                Community Traditions & Events
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-4 sm:mb-6">
                Funding and volunteer support for Canada Day fireworks, Halloween Party, Two-Pitch, and tournaments.
              </p>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-stone-200 text-[10px] sm:text-[11px] font-semibold text-amber-800">
              100% Retained in Town
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-3.5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 sm:mb-4">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">
                Youth Athletics
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-4 sm:mb-6">
                Equipment and sponsorships for youth teams, including champion Forest ringette squads.
              </p>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-stone-200 text-[10px] sm:text-[11px] font-semibold text-amber-800">
              Youth Team Sponsorships
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-3.5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 sm:mb-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">
                Preserving Local Landmarks
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-4 sm:mb-6">
                Capital support for vital community hubs like the Forest Legion Branch 176.
              </p>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-stone-200 text-[10px] sm:text-[11px] font-semibold text-amber-800">
              Legion Branch 176 Backing
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-3.5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 sm:mb-4">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">
                Local Charities & Relief
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-4 sm:mb-6">
                Sustained backing for food banks, holiday hampers, and community emergency funds.
              </p>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-stone-200 text-[10px] sm:text-[11px] font-semibold text-amber-800">
              Crisis Relief Network
            </div>
          </div>
        </div>

        {/* Interactive Donation Box */}
        <div className="max-w-3xl mx-auto bg-[#0F172A] text-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>SECURE NON-PROFIT PHILANTHROPIC CONTRIBUTION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Invest in the Legacy of Forest, Ontario
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Select a contribution tier below or enter a customized gift amount. Every dollar is tracked
              transparently by our Association Treasurer.
            </p>
          </div>

          {/* Tier Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            {tiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => handleSelectTier(tier.amount)}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-extrabold tracking-wide font-mono transition-all cursor-pointer ${
                  !isCustom && selectedTier === tier.amount
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 scale-105 shadow-md'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                ${tier.amount}
              </button>
            ))}

            {/* Custom Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">$</span>
              <input
                type="number"
                min="5"
                placeholder="Custom"
                value={customAmount}
                onChange={handleCustomChange}
                onClick={() => setIsCustom(true)}
                className={`w-28 pl-6 pr-3 py-2 rounded-xl text-sm font-extrabold font-mono transition-all focus:outline-none ${
                  isCustom
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 placeholder:text-slate-900'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Dynamic Allocation Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-8 text-center">
            <p className="text-xs text-amber-300 font-medium leading-relaxed">
              <span className="font-bold text-amber-400">Allocation Impact: </span>
              {currentImpact}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="text-center">
            <button
              onClick={() => onTriggerCheckout(finalAmount > 0 ? finalAmount : 50, currentImpact)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Make a Donation to the Association (${finalAmount > 0 ? finalAmount : 50})</span>
            </button>
          </div>

          {/* Security & Receipt Note */}
          <p className="text-[11px] text-slate-400 text-center mt-6 leading-relaxed max-w-md mx-auto">
            Contributions support non-profit association initiatives, fleet preservation, and community
            sponsorship. Receipt issued by Association Treasurer Cody Wilcox.
          </p>
        </div>
      </div>
    </section>
  );
};

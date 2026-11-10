import React from 'react';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenDonation: () => void;
  onOpenEvents: () => void;
  onOpenCalendar: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDonation,
  onOpenEvents,
  onOpenCalendar,
}) => {
  return (
    <section id="home" className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Kicker Tag */}
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4 sm:mb-6">
              <span>— SERVING BEYOND THE FIREGROUND SINCE 1888 —</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Building Stronger{' '}
              <span className="text-amber-500">Communities</span>
            </h1>

            {/* Body Description */}
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
              We deliver high-impact volunteer service and philanthropic support for Forest and
              Lambton Shores — funding youth athletics, preserving our 1922 historic pumper, and
              showing up for our neighbors for over 135 years.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={onOpenDonation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Support Our Causes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenEvents}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-800 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Upcoming Events</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-stone-200/80 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Volunteer Driven</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Station 2 - Forest, Ontario</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registered Non-Profit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Brand Emblem / Logo Image */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md aspect-square bg-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center group">
              {/* Subtle amber ambient glow behind logo */}
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />
              <img
                src="/images/station2_patch.png"
                alt="Forest Firefighters Association Logo"
                className="w-full h-full object-contain max-w-[280px] max-h-[280px] sm:max-w-[330px] sm:max-h-[330px] drop-shadow-2xl transform group-hover:scale-103 transition-transform duration-300 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

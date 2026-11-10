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
    <section id="home" className="relative pt-8 pb-14 lg:pt-14 lg:pb-20 bg-[#FBF9F5] border-b border-stone-200 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column on Desktop / Centered Below Crest on Mobile */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-700 mb-4 sm:mb-6">
              <span>Serving Beyond the Fireground Since 1888</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-5">
              Building Stronger{' '}
              <span className="text-amber-500">Communities</span>
            </h1>

            {/* Body Description */}
            <p className="text-base text-slate-600 leading-relaxed max-w-xl lg:max-w-2xl mb-8">
              Volunteer service and philanthropic support for Forest and
              Lambton Shores — showing up for our neighbours for over 135 years.
            </p>

            {/* CTAs: Equal full-width buttons on mobile, side-by-side on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 mb-8 w-full sm:w-auto">
              <button
                onClick={onOpenDonation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Support Our Causes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenEvents}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Upcoming Events</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-medium text-slate-600 pt-4 border-t border-stone-200/80 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Volunteer Driven</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Station 2 - Forest, ON</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registered Non-Profit</span>
              </div>
            </div>
          </div>

          {/* Right Column on Desktop / Centered Crest Medallion at Top on Mobile */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center">
            <div className="relative flex items-center justify-center">
              {/* Soft warm halo behind the shield so it feels anchored to the page */}
              <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <img
                src="/images/as-logo.webp"
                alt="Forest Firefighters Association Logo"
                fetchPriority="high"
                loading="eager"
                className="relative z-10 w-auto h-auto object-contain max-w-[145px] sm:max-w-[200px] lg:max-w-[360px] drop-shadow-xl transition-transform duration-300 hover:scale-103"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

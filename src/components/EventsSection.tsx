import React from 'react';
import { Calendar, MapPin, ExternalLink, Users, Sparkles } from 'lucide-react';
import { EVENTS_DATA, SPONSORS_DATA, CommunityEvent } from '../data/associationData';

interface EventsSectionProps {
  onSelectEvent: (event: CommunityEvent) => void;
  onOpenCalendar: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onSelectEvent,
  onOpenCalendar,
}) => {
  const [mobileEventsExpanded, setMobileEventsExpanded] = React.useState(false);

  return (
    <section id="community" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4">
            <span>— CALENDAR & GATHERINGS —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Upcoming Events <span className="text-amber-500">& Community Traditions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Through local fundraising and countless volunteer hours, the Association proudly
            reinvests in the town that has supported us for over 135 years.
          </p>
        </div>

        {/* Championing Local Causes Box */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 shadow-xs">
          <div className="max-w-4xl mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Championing Local Causes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The funds we raise at our events go directly back into the community. We are dedicated
              sponsors of local youth athletics—including the champion Forest ringette squads—and
              provide crucial financial backing for vital hubs like the Forest Legion Branch 176.
              Throughout the year, we also proudly support local food banks, holiday toy drives, and
              families in need.
            </p>
          </div>

          {/* 2 Showcase Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Fireworks */}
            <div
              onClick={() => onSelectEvent(EVENTS_DATA[0])}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src="/images/canada_day_fireworks.jpg"
                  alt="Kiwanis Canada Day Fireworks"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5">
                  <span className="text-amber-700">30+ YEAR TRADITION</span>
                  <span className="text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded">
                    Every July 1st
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Kiwanis Canada Day Fireworks
                </h4>
              </div>
            </div>

            {/* Card 2: Ringette Squads */}
            <div
              onClick={() => onSelectEvent(EVENTS_DATA[2])}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src="/images/ringette_team.jpg"
                  alt="Champion Forest Ringette Squads"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5">
                  <span className="text-amber-700">YOUTH ATHLETICS SPONSORSHIP</span>
                  <span className="text-slate-600 bg-stone-100 px-2 py-0.5 rounded">
                    Shores Arena
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Champion Forest Ringette Squads
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Community Events Grid - on mobile only show top 2 unless expanded */}
        <div id="events" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 sm:mb-20 scroll-mt-28">
          {EVENTS_DATA.map((event, index) => {
            const isHiddenOnMobile = !mobileEventsExpanded && index >= 2;
            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={`${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } bg-stone-50/70 hover:bg-stone-50 border border-stone-200 hover:border-amber-400 rounded-xl p-5 flex-col justify-between transition-all hover:shadow-md cursor-pointer group`}
              >
                <div>
                  <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700 mb-2">
                    {event.category}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-amber-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.dateBadge || 'Annual'}</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-amber-600 transition-colors font-medium">
                    Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile toggle button for events */}
        <div className="mb-14 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileEventsExpanded(!mobileEventsExpanded)}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors text-center"
          >
            {mobileEventsExpanded ? 'Show Fewer Events ▲' : 'View All 4 Traditions (+2) ▼'}
          </button>
        </div>

        {/* Sponsors & Community Partners */}
        <div className="border-t border-stone-200 pt-14 sm:pt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="text-xs font-bold tracking-wider uppercase text-amber-700 mb-3">
              <span>— SPONSORS & COMMUNITY PARTNERS —</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Generously Backed by Forest & Lambton County Leaders
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Our events and philanthropic projects are made possible by the dedicated support of
              local businesses, civic service clubs, and agricultural partners.
            </p>
          </div>

          {/* 2x2 on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {SPONSORS_DATA.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-5 text-center shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 mb-1">
                    {sponsor.role}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-snug">
                    {sponsor.name}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
                  {sponsor.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

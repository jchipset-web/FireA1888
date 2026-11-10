import React from 'react';
import { Wrench, Shield, Info, ArrowUpRight } from 'lucide-react';
import { FLEET_DATA, FleetRig } from '../data/associationData';

interface FleetSectionProps {
  onSelectRig: (rig: FleetRig) => void;
  onRequestAppearance: () => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  onSelectRig,
  onRequestAppearance,
}) => {
  const [mobileFleetExpanded, setMobileFleetExpanded] = React.useState(false);

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4">
            <span>— MOTORIZED APPARATUS ROLL —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Historic Fleet: <span className="text-amber-500">Preserving the Legacy</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            For over a century, the rigs parked inside the Forest fire hall have been a symbol of
            safety, readiness, and community resilience. These vehicles represent the evolution of
            firefighting technology and the generations of local volunteers who rode them into
            action.
          </p>
        </div>

        {/* Crown Jewel Spotlight Card */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Photo with Overlays */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-stone-900 overflow-hidden group">
              <img
                src="/images/1922_oldsmobile_bickle.jpg"
                alt="1922 Oldsmobile Bickle 300 GPM Pumper"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-xs text-amber-400 border border-amber-500/40 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-sm">
                RUNNING HISTORIC RIG • 300 GPM BICKLE PUMPER
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                Preserved in Lambton Shores
              </div>
            </div>

            {/* Right: Technical Narrative */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-3">
                  <span className="text-amber-600">THE CROWN JEWEL</span>
                  <span className="text-slate-400 font-mono">Woodstock Coachwork</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                  The Pride of the Association — 1922 Oldsmobile Bickle
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  The crown jewel of our Association’s history is our 1922 Oldsmobile Bickle pumper.
                  Representing the department’s monumental transition from hand-drawn hose carts to the
                  motorized era, this apparatus revolutionized how Forest firefighters protected the town.
                  Outfitted by Bickle Fire Engines in Woodstock, Ontario, it was capable of pumping 300
                  gallons per minute (GPM)—a massive technological leap for the 1920s.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  Today, thanks to the meticulous care and restoration efforts of our Association
                  members and retirees, the 1922 Oldsmobile remains in running condition. It serves as
                  a fully functional piece of rolling history and is a beloved fixture of the annual
                  Forest Kiwanis Canada Day parade, community festivals, and firefighter memorials.
                </p>
              </div>

              {/* Bottom Specs & Action */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" />
                    <span>Woodstock, ON Coachwork</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Maintained by Association Volunteers</span>
                  </span>
                </div>

                <button
                  onClick={onRequestAppearance}
                  className="inline-flex items-center gap-1 font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Request Parade Appearance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Retired Legends Subheading Strip */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Retired Legends of Forest Station
          </h3>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
            4 VINTAGE RIGS TOTAL
          </span>
        </div>

        {/* 4 Cards Grid - on mobile only show first 2 unless expanded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET_DATA.map((rig, index) => {
            const isHiddenOnMobile = !mobileFleetExpanded && index >= 2;
            return (
              <div
                key={rig.id}
                onClick={() => onSelectRig(rig)}
                className={`${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } bg-stone-50/70 hover:bg-stone-50 border border-stone-200 hover:border-amber-400 rounded-xl p-5 flex-col justify-between transition-all hover:shadow-md cursor-pointer group`}
              >
                <div>
                  <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700 mb-2">
                    {rig.type}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-amber-600 transition-colors">
                    {rig.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {rig.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="font-semibold text-slate-700">{rig.chassis}</span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {rig.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-only toggle button */}
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileFleetExpanded(!mobileFleetExpanded)}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors text-center"
          >
            {mobileFleetExpanded ? 'Show Fewer Apparatus ▲' : 'Show All 4 Vintage Apparatus (+2) ▼'}
          </button>
        </div>
      </div>
    </section>
  );
};

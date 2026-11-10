import React, { useState } from 'react';
import { Heart, Landmark, ChevronRight, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showMilestones, setShowMilestones] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);

  const milestones = [
    { year: '1888', title: 'Founding of the Volunteer Brigade', desc: 'Formed in Forest, Ontario with horse-drawn manual pumps and hand-pulled hose reels.' },
    { year: '1922', title: 'Acquisition of the Oldsmobile Bickle', desc: 'Transition to motorized apparatus with the custom Bickle 300 GPM pumper.' },
    { year: '1968', title: 'Structural Modernization & King Seagrave', desc: 'Arrival of high-capacity water tender apparatus to protect expanding local agriculture and commerce.' },
    { year: '1992', title: 'Kiwanis Fireworks Stewardship', desc: 'Association assumes official coordination and pyrotechnic stewardship for the annual Canada Day fireworks.' },
    { year: '2026', title: '135+ Years of Service', desc: 'Over $84,500 reinvested into Lambton County youth athletics, local heritage, and emergency relief.' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4">
            <span>— ABOUT OUR ASSOCIATION —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Positive Change <span className="text-amber-500">That Last</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The Forest Firefighters Association 1888 was built on a lasting bond and a deep
            commitment to our community.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Archival Photo */}
          <div className="lg:col-span-7 space-y-6">
            {/* Lead paragraph with amber accent bar */}
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <p className="text-lg font-bold text-slate-900 leading-snug">
                Since 1888, the men and women of Forest’s fire service have shared a bond extending
                far beyond the fireground.
              </p>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              While the municipal fire department handles emergency response, our independent
              Association serves as the philanthropic and social heartbeat of our membership.
              Comprised of active firefighters, retirees, and alumni, our goal is to preserve our local
              heritage and reinvest in Forest. For us, public service doesn’t end when the gear is stowed.
            </p>

            {/* Archival Photo Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-xs">
              <div className="relative rounded-lg overflow-hidden bg-stone-100 aspect-16/10">
                <img
                  src="/images/historic_brigade_archive.jpg"
                  alt="Historic Volunteer Brigade & Station Apparatus"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 px-1 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
                <span className="font-medium text-stone-600">
                  Archival Catalog #1888-A • As Volunteer Brigade & Station Apparatus
                </span>
                <span className="font-mono text-amber-700 tracking-wider uppercase font-semibold">
                  HISTORIC FOREST & REGIONAL FIRE SERVICE LEDGER
                </span>
              </div>
            </div>

            {/* Mobile Expand / Collapse Button for Secondary History (lg:hidden only) */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <span>{mobileAboutExpanded ? 'Collapse Historical Story' : 'Read Full History & Member Legacy'}</span>
                <ChevronRight className={`w-4 h-4 text-amber-700 transition-transform ${mobileAboutExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Additional Historical Narrative & Quote Box: Always visible on lg+, toggleable on mobile */}
            <div className={`space-y-6 ${mobileAboutExpanded ? 'block' : 'hidden lg:block'}`}>
              <p className="text-base text-slate-700 leading-relaxed">
                We are deeply embedded in local life, funding youth sports, sponsoring landmarks like
                the Forest Legion, and spearheading events. We are especially proud to coordinate and
                safely host the town’s spectacular Kiwanis Canada Day fireworks—a tradition our members
                have managed for over three decades.
              </p>

              {/* Dark Quote Box */}
              <div className="bg-[#0F172A] text-white rounded-xl p-6 shadow-md border-l-4 border-amber-500 relative">
                <p className="italic text-slate-200 text-sm sm:text-base leading-relaxed">
                  “The Association is more than a roster of personnel; it is an enduring legacy of
                  neighbours helping neighbours, dedicated to strengthening this community for
                  generations to come.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillar Feature Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Philanthropic Heartbeat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reinvesting all raised funds into Lambton Shores: sponsoring ringette squads, local
                holiday drives, and food assistance networks.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Heritage Preservation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Curating century-old records, antique gear, and maintaining the fully operational
                1922 Oldsmobile Bickle apparatus for upcoming generations.
              </p>
            </div>


            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowMilestones(!showMilestones)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase text-white bg-[#0F172A] hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
              >
                <span>{showMilestones ? 'Hide History Timeline' : 'Discover More'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showMilestones ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Expanded Milestones Timeline */}
            {showMilestones && (
              <div className="mt-4 bg-white rounded-xl p-5 border border-stone-200 shadow-md space-y-4 animate-fadeIn">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Historical Milestones of Forest Station 2</span>
                </h4>
                <div className="space-y-3 relative pl-4 border-l-2 border-amber-200">
                  {milestones.map((item) => (
                    <div key={item.year} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white" />
                      <div className="font-mono text-xs font-bold text-amber-600">{item.year}</div>
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

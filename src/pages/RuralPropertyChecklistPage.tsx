import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Truck, Droplets, MapPin, AlertTriangle, Printer, Check, CheckCircle2, Shield, TreePine } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface PageProps {
  onBackToHome: () => void;
}

export const RuralPropertyChecklistPage: React.FC<PageProps> = ({ onBackToHome }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    r1: true,
    r2: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ruralChecklist = [
    {
      id: 'r1',
      category: 'CIVIC ADDRESSING',
      text: 'Green reflective 9-1-1 civic number sign clearly posted at the driveway entrance, visible from both travel directions and clear of snowbanks or tall brush.',
    },
    {
      id: 'r2',
      category: 'APPARATUS ACCESS',
      text: 'Driveway maintains a minimum 4-metre (13-foot) width and 4-metre vertical clearance, with tree branches trimmed back for heavy fire pumpers and water tenders.',
    },
    {
      id: 'r3',
      category: 'TURNAROUND CAPACITY',
      text: 'Adequate turnaround space (cul-de-sac, Y-turn, or circular driveway) available near the main buildings for 20-tonne emergency rigs.',
    },
    {
      id: 'r4',
      category: 'CULVERTS & BRIDGES',
      text: 'Driveway culverts, bridges, and cattle guards inspected and rated to safely support heavy fire apparatus axle loads.',
    },
    {
      id: 'r5',
      category: 'WATER SUPPLY MAPPING',
      text: 'Ponds, cisterns, swimming pools, or dry hydrants on or near the property are documented, accessible, and cleared of snow/ice in winter.',
    },
    {
      id: 'r6',
      category: 'FUEL & COMBUSTIBLE STORAGE',
      text: 'Fuel storage tanks (diesel, gasoline, propane bullet tanks) situated at least 12 metres (40 feet) away from wooden structures and living quarters.',
    },
    {
      id: 'r7',
      category: 'HAY & AGRICULTURAL COMBUSTIBLES',
      text: 'Baled hay and straw stored in well-ventilated dry outbuildings separated from live animal quarters, monitored for internal heating.',
    },
    {
      id: 'r8',
      category: 'AGRICULTURAL CHEMICALS',
      text: 'Fertilizers, pesticides, and hazardous agricultural chemicals clearly placarded and inventoried for responding emergency crews.',
    },
    {
      id: 'r9',
      category: 'OPEN AIR BURNING COMPLIANCE',
      text: 'Open air burn permits obtained in accordance with Lambton Shores municipal by-laws, with burning only conducted in low wind (<15 km/h) with continuous supervision.',
    },
    {
      id: 'r10',
      category: 'POWER & UTILITY ISOLATION',
      text: 'Main electrical shut-off and gas/propane emergency valves clearly marked and accessible outside the primary buildings.',
    },
  ];

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full">
            Lambton County Agricultural & Rural Protocol
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-4">
            <TreePine className="w-3.5 h-3.5" />
            <span>FARM & ACREAGE SAFETY ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Rural Property <span className="text-amber-400">Fire Safety Checklist</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Fighting fires on rural acreages, farms, and concession roads presents unique challenges.
            Ensuring rapid apparatus access, water availability, and hazard separation safeguards your
            livelihood, livestock, and home.
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <strong className="text-slate-900 block text-sm">Station 2 Rural Preparedness Guideline</strong>
            Recommended annual self-inspection for all Lambton County farms and rural properties.
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print Inspection Sheet</span>
          </button>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Pillar 1 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Visible 9-1-1 Green Signs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Volunteer firefighters responding in darkness, heavy fog, or winter squalls rely entirely on
              reflective green civic blades at the road edge. Keep them unobstructed by foliage.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Clear 4m x 4m Clearance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modern heavy fire engines and water tankers are over 3 metres wide with side mirrors. Overhanging
              tree branches and narrow laneways can prevent apparatus from reaching the fireground.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Tanker Shuttle Water
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without municipal hydrants, our members establish high-volume tanker shuttles. Identifying farm
              ponds or static cisterns allows crews to draft thousands of gallons rapidly.
            </p>
          </div>
        </div>

        {/* Interactive Checklist Card */}
        <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-md mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 mb-6">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-700">
                FARM & ACREAGE AUDIT
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                10-Point Rural Property Safety Audit
              </h3>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900">
              Completed: {completedCount} of {ruralChecklist.length}
            </div>
          </div>

          <div className="space-y-3">
            {ruralChecklist.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                    : 'bg-stone-50/60 border-stone-200 text-slate-600 hover:bg-stone-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checkedItems[item.id] ? 'bg-emerald-600 text-white font-bold' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {checkedItems[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-700 block mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-xs leading-relaxed font-medium">
                    {item.text}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {completedCount === ruralChecklist.length && (
            <div className="mt-6 p-4 bg-emerald-100 border border-emerald-400 rounded-xl text-emerald-950 text-xs flex items-center gap-2 animate-fadeIn font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Full Rural Safety Certification achieved! Your property provides optimal access, water, and safety separation for Station 2 responders.
              </span>
            </div>
          )}
        </div>

        {/* Open Air Burning By-law Reminder */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 sm:p-8 mb-10 text-xs text-amber-950 space-y-2">
          <div className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Lambton Shores Open Air Burning Regulations</span>
          </div>
          <p className="leading-relaxed">
            Agricultural land clearing, brush piles, and recreational campfires are subject to municipal by-law.
            Always confirm active fire bans before igniting. Fires must be attended continuously by an adult with
            adequate water extinguishing tools until cold to the touch.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};

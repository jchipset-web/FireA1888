import React, { useState } from 'react';
import { ArrowLeft, Bell, Flame, ShieldAlert, CheckCircle2, AlertOctagon, Printer, Download, Clock, Home, Check } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface PageProps {
  onBackToHome: () => void;
}

export const FireSafetyPage: React.FC<PageProps> = ({ onBackToHome }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    item1: true,
    item2: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    { id: 'item1', text: 'Working smoke alarms installed on every level of the home and outside sleeping quarters.' },
    { id: 'item2', text: 'Carbon Monoxide (CO) alarms installed outside all bedrooms (mandatory in Ontario homes with fuel appliances or attached garages).' },
    { id: 'item3', text: 'Smoke alarm test button pressed and verified audible this month.' },
    { id: 'item4', text: 'Home fire escape plan mapped with two exits per room and a designated outside meeting tree/point.' },
    { id: 'item5', text: 'Stove and cooking surfaces clear of dishtowels, paper, and grease buildup.' },
    { id: 'item6', text: 'Space heaters, woodstoves, and baseboard radiators kept at least 1 metre (3 feet) clear of furniture and curtains.' },
    { id: 'item7', text: 'All smoke alarms checked for manufacture date—none older than 10 years.' },
    { id: 'item8', text: 'Civic address numbers clearly visible from the roadway day and night for responding fire trucks.' },
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
          <span className="text-xs font-mono text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">
            Lambton Shores Station 2 Public Advisory
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase mb-4">
            <Bell className="w-3.5 h-3.5" />
            <span>COMMUNITY SAFETY INITIATIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Smoke Alarms & <span className="text-amber-400">Home Fire Safety</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            In a typical residential fire, you may have as little as two minutes to escape safely once
            a smoke alarm sounds. Early detection and an escape plan are your family’s best defense.
          </p>
        </div>

        {/* Ontario Fire Law Callout */}
        <div className="bg-amber-500 text-slate-950 rounded-2xl p-6 sm:p-8 mb-10 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-950">
              ONTARIO FIRE CODE MANDATE
            </div>
            <h3 className="text-xl font-black tracking-tight">
              Working Smoke Alarms are the Law in Ontario
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 leading-relaxed max-w-xl">
              Ontario law requires working smoke alarms on <strong>every storey</strong> of the home and
              outside all sleeping areas. Failure to comply carries substantial fines up to $50,000 for homeowners.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-900 transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Guide</span>
          </button>
        </div>

        {/* Core Safety Directives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Directive 1: Testing & Replacement */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Alarm Maintenance Schedule
              </h3>
              <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Every Month:</span>
                  <span>Push the test button to ensure buzzer and battery circuit function properly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Every 6 Months:</span>
                  <span>Change batteries when you adjust your clocks for Daylight Saving Time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Every 10 Years:</span>
                  <span>Replace the entire alarm unit. Sensing sensors degrade and fail over time.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-amber-700">
              Tip: Vacuum alarm exteriors gently to remove cobwebs and dust.
            </div>
          </div>

          {/* Directive 2: Home Fire Escape Plan */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Home Escape Planning
              </h3>
              <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">2 Ways Out:</span>
                  <span>Plan two exits out of every room (typically the door and an unobstructed window).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Meeting Place:</span>
                  <span>Designate an immovable landmark outside (a tree, mailbox, or lightpost).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Once Out, Stay Out:</span>
                  <span>Never, under any circumstance, go back inside a burning building for pets or belongings.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-amber-700">
              Practice your escape plan at night with the whole family twice a year.
            </div>
          </div>
        </div>

        {/* Kitchen & Heating Safety Cards */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-10 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-3">
            <Flame className="w-5 h-5 text-amber-600" />
            <span>Essential Preventative Measures for Lambton Households</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Kitchen & Cooking Safety:</h4>
              <p className="leading-relaxed">
                Cooking fires are the leading cause of home fires. Never leave stovetops unattended. If a pan
                catches fire:
              </p>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-slate-800 space-y-1">
                <p><strong>1. DO NOT USE WATER:</strong> Water will cause grease to vaporize and erupt into a fireball.</p>
                <p><strong>2. SLIDE A LID:</strong> Carefully slide a metal lid or cookie sheet over the pan.</p>
                <p><strong>3. TURN OFF HEAT:</strong> Leave the lid on until the pan has completely cooled.</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Woodstoves & Rural Heating:</h4>
              <p className="leading-relaxed">
                With many rural homes in Lambton County utilizing woodstoves or auxiliary heating:
              </p>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-slate-800 space-y-1">
                <p><strong>• Chimney Inspections:</strong> Have chimneys inspected and swept annually for creosote.</p>
                <p><strong>• Safe Ash Disposal:</strong> Place woodstove ashes in a covered metal container, stored at least 3 metres away from buildings.</p>
                <p><strong>• Clear Radiators:</strong> Maintain 1 metre (3 feet) clearance around all heaters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Self-Audit Checklist */}
        <div className="bg-white border-2 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-md mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 mb-6">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700">
                INTERACTIVE HOME AUDIT
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Station 2 Fire Safety Self-Inspection Checklist
              </h3>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900">
              Completed: {completedCount} of {checklist.length}
            </div>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? 'bg-amber-50/60 border-amber-300 text-slate-900'
                    : 'bg-stone-50/60 border-stone-200 text-slate-600 hover:bg-stone-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checkedItems[item.id] ? 'bg-amber-500 text-slate-950 font-bold' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {checkedItems[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs leading-relaxed font-medium">
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          {completedCount === checklist.length && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Outstanding! Your household meets the Forest Station 2 Fire Safety Checklist standard. Thank you for protecting our community.
              </span>
            </div>
          )}
        </div>

        {/* Bottom Contact & Back */}
        <div className="text-center space-y-4">
          <p className="text-xs text-stone-500">
            Need smoke alarms or battery assistance? Forest Station 2 volunteer firefighters are here to help.
            Email us at <a href={`mailto:${STATION_INFO.email}`} className="text-amber-700 font-bold underline">{STATION_INFO.email}</a>.
          </p>
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

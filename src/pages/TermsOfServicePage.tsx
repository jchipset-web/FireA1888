import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, Scale, ShieldCheck, Heart } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface PageProps {
  onBackToHome: () => void;
}

export const TermsOfServicePage: React.FC<PageProps> = ({ onBackToHome }) => {
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
          <span className="text-xs font-mono text-stone-500">
            Effective Date: January 2026
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-10">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold tracking-wider uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>GOVERNANCE & TRUST • CHARTER OF SERVICE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Terms of Service & Association Charter
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            These terms govern the use of the official web platform, document repository, event
            registrations, and philanthropic contributions for the Forest Firefighters Association 1888.
          </p>
        </div>

        {/* Terms Content Sections */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 text-sm text-slate-700 leading-relaxed">
          {/* Emergency Alert Callout */}
          <div className="p-5 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-extrabold text-sm text-rose-900 uppercase tracking-wide">
                Critical Safety Notice — Not an Emergency Dispatch Service
              </div>
              <p className="text-xs leading-relaxed text-rose-900">
                This website, its inquiry forms, and contact emails are strictly for administrative,
                historical, and philanthropic purposes. <strong>Do not submit emergency requests through this site.</strong> In
                an emergency requiring fire, rescue, or medical assistance in Forest or Lambton Shores,
                you must immediately <strong>dial 9-1-1</strong>.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              1. Non-Profit Constitution & Community Mandate
            </h2>
            <p>
              The Forest Firefighters Association 1888 is an incorporated non-profit entity operating
              independently from the municipal corporate administration of the Municipality of Lambton Shores.
              Our activities are governed by our Association Constitution, elected Executive Board, and volunteer
              membership dedicated to community reinvestment and historical apparatus preservation.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              2. Charitable Contributions & Stewardship
            </h2>
            <p>
              When contributing to our Community Reinvestment Fund:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>100% Local Retention:</strong> All funds contributed to the Association are retained in
                Lambton Shores to support local youth athletics, civic events, and historic fleet preservation.
              </li>
              <li>
                <strong>Official Receipts:</strong> A formal acknowledgment and official non-profit receipt is
                generated for all contributions and countersigned by Association Treasurer Cody Wilcox.
              </li>
              <li>
                <strong>Finality of Donations:</strong> Contributions are deemed final once processed, though
                refunds may be requested within 30 days in cases of accidental duplicate transactions.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              3. Community Event Registration & Safety Compliance
            </h2>
            <p>
              Participants registering for Association-sponsored traditions (including the Annual Two-Pitch
              Tournament, Firefighters Hockey Tournament, and Kiwanis Canada Day Fireworks Volunteer Crews) agree
              to abide by all safety guidelines established by the Association Event Marshals:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Safety Perimeters:</strong> Attendees of the Kiwanis Fireworks must respect all marked
                fallout exclusion zones and follow instructions from certified Association pyrotechnicians.
              </li>
              <li>
                <strong>Sportsmanship & Conduct:</strong> Teams participating in charitable tournaments are
                expected to uphold values of fellowship, respect for officials, and community spirit.
              </li>
              <li>
                <strong>Waivers & Releases:</strong> Standard athletic liability waivers provided in our Document
                Repository must be executed prior to tournament participation.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              4. Historic Apparatus Appearances (1922 Bickle Pumper)
            </h2>
            <p>
              Requests for the ceremonial appearance of our running 1922 Oldsmobile Bickle apparatus are subject to
              volunteer crew availability, road conditions, and inclement weather protection. The Association
              reserves the right to cancel or postpone motorized vintage vehicle appearances to protect historical
              equipment integrity.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              5. Intellectual Property & Historic Archives
            </h2>
            <p>
              All historical photographs, Station 2 insignia, commemorative badges, and archival documents published
              on this site are protected by copyright. Non-commercial civic and educational reuse is permitted with
              attribution to the <em>Forest Firefighters Association 1888</em>.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              6. Governance & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by the laws of the Province of Ontario and the applicable federal
              laws of Canada. Any inquiries regarding governance or Executive Board resolutions may be submitted to:
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-xs text-slate-700">
              <strong>Executive Board of the Forest Firefighters Association 1888</strong><br />
              Station 2 — Forest Hall, Lambton Shores<br />
              45 Main Street South, P.O. Box 219, Forest, Ontario N0N 1J0<br />
              Email: {STATION_INFO.email}
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
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

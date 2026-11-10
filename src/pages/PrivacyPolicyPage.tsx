import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Mail, MapPin, Calendar } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface PageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onBackToHome }) => {
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
            Last Reviewed: January 2026
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-10">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold tracking-wider uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>GOVERNANCE & TRUST • PRIVACY PROTOCOL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            The Forest Firefighters Association 1888 is committed to maintaining the highest standards
            of integrity, transparency, and data protection for our donors, event participants, volunteers,
            and community members across Lambton Shores.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              1. Organizational Identity & Scope
            </h2>
            <p>
              The <strong>Forest Firefighters Association 1888</strong> is an independent registered
              non-profit association representing active volunteer firefighters, retirees, and alumni of
              Station 2 in Lambton Shores.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <strong>Emergency Services Notice:</strong> This website and our Association email
              addresses do not handle emergency 911 dispatch. Emergency fire and medical responses are
              managed exclusively by municipal Lambton Shores Fire Services and regional dispatch centers.
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              2. Information We Collect
            </h2>
            <p>
              We only collect personal information that you intentionally and voluntarily provide to us when
              interacting with the Association:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Philanthropic Contributions:</strong> Donor full name, email address, mailing address
                (for official tax receipts), contribution amount, and optional memorial or dedication notes.
              </li>
              <li>
                <strong>Event Signups & Team Registrations:</strong> Contact coordinator details, team rosters,
                and emergency contact phone numbers for the Annual Two-Pitch Tournament, Firefighters Hockey
                Tournament, and Kiwanis Fireworks volunteer crews.
              </li>
              <li>
                <strong>Sponsorship & Grant Applications:</strong> Youth athletics league representatives,
                grant applicant contact information, and funding allocation requests.
              </li>
              <li>
                <strong>General Inquiries & Correspondence:</strong> Name, email address, phone number, and
                correspondence message body sent through our contact form.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              3. Protection of Donor Information & No-Sale Pledge
            </h2>
            <p>
              We adhere to strict donor privacy principles. <strong>We do not sell, rent, trade, lease, or
              commercialize donor or participant lists to any third party under any circumstances.</strong>
            </p>
            <p>
              Donor contribution records are maintained confidentially by Association Treasurer Cody Wilcox
              solely for financial stewardship, annual non-profit audit reporting, and issuing official
              charitable contribution acknowledgments.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              4. Event Photography & Public Traditions
            </h2>
            <p>
              As part of our historic documentation, volunteer photographers record public community
              traditions (such as the Kiwanis Canada Day Fireworks, civic parades featuring our 1922
              Oldsmobile Bickle, and youth sports presentations).
            </p>
            <p>
              Images published on this site celebrate volunteer heritage and civic spirit. If you or a family
              member appear in a photograph on our website and wish for it to be removed, please contact our
              Secretary, and we will honor your request promptly.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              5. Data Security & Retention
            </h2>
            <p>
              We implement appropriate physical, technical, and administrative safeguards to protect your
              information against unauthorized access, alteration, or disclosure. Internal member portal
              access is restricted strictly to active Station 2 personnel, retirees, and authorized officers.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              6. Privacy Officer Contact Information
            </h2>
            <p>
              For questions regarding this privacy policy, access to your contribution records, or removal
              requests, please contact our designated Executive Officer:
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">
                Cody Wilcox, Treasurer & Privacy Liaison
              </div>
              <div className="text-slate-600">
                Forest Firefighters Association 1888 • Station 2
              </div>
              <div className="text-slate-600">
                45 Main Street South, P.O. Box 219, Forest, ON N0N 1J0
              </div>
              <div className="text-amber-700 font-semibold pt-1">
                Email: {STATION_INFO.treasuryEmail}
              </div>
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

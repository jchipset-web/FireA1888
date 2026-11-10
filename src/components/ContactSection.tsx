import React, { useState } from 'react';
import { ShieldAlert, Mail, MapPin, Phone, Send, CheckCircle2, Building, Calendar } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'Event Signup / Question',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-4">
            <span>— DISPATCH & CORRESPONDENCE —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Connect with the Association: <span className="text-amber-500">Inquiries & Fellowship</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you have questions regarding upcoming community events, historic archives,
            sponsorship opportunities, or volunteering alongside our members, we welcome your
            correspondence.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Liaisons & Archives */}
          <div className="lg:col-span-5 space-y-6">
            {/* Emergency Notice Card */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-rose-950">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>EMERGENCY RESPONSE NOTICE</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                For active emergency fire and medical services, please <strong className="text-rose-700 underline font-extrabold">dial 911 immediately</strong>. Active municipal emergency response is operated by Lambton Shores Fire Services.
              </p>
            </div>

            {/* Station Archives & Hall */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700 mb-2">
                STATION ARCHIVES & HALL
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {STATION_INFO.name}
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-1">
                {STATION_INFO.hall}
              </p>
              <p className="text-xs text-slate-500">
                {STATION_INFO.address}
              </p>
            </div>

            {/* Executive Direct Liaisons */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-700">
                EXECUTIVE DIRECT LIAISONS
              </div>

              {/* Dave Solway */}
              <div className="border-b border-stone-100 pb-4">
                <div className="text-sm font-bold text-slate-900 mb-0.5">
                  Dave Solway, President
                </div>
                <div className="text-xs text-slate-500 mb-1.5">
                  Community Partnerships, Fireworks & Fleet Demonstrations
                </div>
                <a
                  href={`mailto:${STATION_INFO.presidentEmail}`}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{STATION_INFO.presidentEmail}</span>
                </a>
              </div>

              {/* Cody Wilcox */}
              <div>
                <div className="text-sm font-bold text-slate-900 mb-0.5">
                  Cody Wilcox, Treasurer
                </div>
                <div className="text-xs text-slate-500 mb-1.5">
                  Charitable Stewardship, Sponsorship Grants & Receipts
                </div>
                <a
                  href={`mailto:${STATION_INFO.treasuryEmail}`}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{STATION_INFO.treasuryEmail}</span>
                </a>
              </div>
            </div>

            {/* Assemblies Notice */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900 mb-1">
                  Regular Association Assemblies
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Held monthly at the Forest Firehall. Active members, retirees, and community
                  delegations welcome.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-600 block mb-1">
                OFFICIAL INQUIRY
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Send a Message to the Association
              </h3>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-emerald-950 mb-1">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto mb-6">
                  Thank you, {formData.fullName}. Your inquiry regarding{' '}
                  <strong>{formData.category}</strong> has been transmitted to Association Secretary
                  and Executive Officers.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      category: 'Event Signup / Question',
                      details: '',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John MacDonald"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@lambtonshores.ca"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(519) 555-0188"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                    >
                      <option>Event Signup / Question</option>
                      <option>Youth Athletics & Sponsorship</option>
                      <option>1922 Bickle Appearance Request</option>
                      <option>Historic Archive & Genealogy</option>
                      <option>General Fellowship / Volunteer Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Correspondence Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Please provide details regarding your event inquiry, grant application, or message for the Executive Board..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message to the Association'}</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center pt-2">
                  Transmitted directly to Association Secretary & Executive Officers. Responses typically dispatched within 1-2 business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

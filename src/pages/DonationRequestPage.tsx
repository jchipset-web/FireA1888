import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Printer,
  RotateCcw,
  HeartHandshake,
  Building2,
  Users,
  ShieldCheck,
  FileText,
  CalendarClock,
} from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface DonationRequestPageProps {
  onBackToHome: () => void;
}

export const DonationRequestPage: React.FC<DonationRequestPageProps> = ({ onBackToHome }) => {
  // 1. Organization Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [nonprofitStatus, setNonprofitStatus] = useState('');

  // 2. Community Impact
  const [beneficiaries, setBeneficiaries] = useState('');
  const [specificPurpose, setSpecificPurpose] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');

  // 3. Accountability
  const [willingFollowUp, setWillingFollowUp] = useState<'Yes' | 'No' | ''>('');
  const [pastSupport, setPastSupport] = useState<'Yes' | 'No' | ''>('');

  // 4. Final Steps
  const [additionalNotes, setAdditionalNotes] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatRequestedAmount = () => {
    const num = parseFloat(requestedAmount);
    if (isNaN(num)) return requestedAmount || '$0.00';
    return num.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    });
  };

  const handleReset = () => {
    if (!window.confirm('Clear all entered fields on this donation request form?')) return;
    setFirstName('');
    setLastName('');
    setOrganizationName('');
    setEmail('');
    setWebsiteUrl('');
    setNonprofitStatus('');
    setBeneficiaries('');
    setSpecificPurpose('');
    setRequestedAmount('');
    setWillingFollowUp('');
    setPastSupport('');
    setAdditionalNotes('');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !nonprofitStatus.trim() ||
      !specificPurpose.trim() ||
      !requestedAmount.trim() ||
      !willingFollowUp ||
      !pastSupport
    ) {
      setErrorMsg('Please complete all required (*) fields before submitting your request.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrorMsg('');
    setSubmitModalOpen(true);
  };

  const generateApplicationReport = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    return [
      `FOREST FIREFIGHTERS ASSOCIATION 1888 — DONATION REQUEST APPLICATION`,
      `===================================================================`,
      `Submission Date: ${todayStr}`,
      ``,
      `1. ORGANIZATION DETAILS`,
      `-------------------------------------------------------------------`,
      `Contact Name: ${firstName} ${lastName}`,
      `Organization / Group: ${organizationName.trim() || 'Not specified'}`,
      `Email Address: ${email}`,
      `Website URL: ${websiteUrl.trim() || 'N/A'}`,
      `Registered Nonprofit / Charity?: ${nonprofitStatus}`,
      ``,
      `2. COMMUNITY IMPACT`,
      `-------------------------------------------------------------------`,
      `Who specifically benefits from your programs or services?:`,
      `${beneficiaries.trim() || 'Not specified'}`,
      ``,
      `Specific purpose for the requested donation:`,
      `${specificPurpose}`,
      ``,
      `Total Amount Requested: ${formatRequestedAmount()}`,
      ``,
      `3. ACCOUNTABILITY`,
      `-------------------------------------------------------------------`,
      `Willing to provide a follow-up report, update, or photos?: ${willingFollowUp}`,
      `Received support from us in the past?: ${pastSupport}`,
      ``,
      `4. ADDITIONAL INFORMATION`,
      `-------------------------------------------------------------------`,
      `${additionalNotes.trim() || 'None provided'}`,
    ].join('\n');
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateApplicationReport());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const mailtoHref = `mailto:${STATION_INFO.email}?subject=${encodeURIComponent(
    `[Donation Request] ${organizationName.trim() || `${firstName} ${lastName}`} — ${formatRequestedAmount()}`
  )}&body=${encodeURIComponent(generateApplicationReport())}`;

  return (
    <div className="py-8 sm:py-12 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 bg-white border border-stone-300 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Form</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-600" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 text-rose-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold mb-6">
            {errorMsg}
          </div>
        )}

        {/* Main Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-stone-200 rounded-2xl shadow-md overflow-hidden"
        >
          {/* Top Branded Header Banner */}
          <div className="bg-[#0F172A] text-white p-6 sm:p-8 border-b-4 border-amber-500">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Community Stewardship & Philanthropy</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
                  Donation Request Form
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Submit your organization&apos;s information and funding request for consideration by the Forest Firefighters Association 1888.
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center">
                <img
                  src="/images/as-logo.webp"
                  alt="Forest Firefighters Association 1888 Crest"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-5 sm:p-8 space-y-10">
            {/* SECTION 1: Organization Details */}
            <section className="space-y-5">
              <div className="border-b-2 border-amber-500/80 pb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                  Organization Details
                </h2>
              </div>

              {/* Full Name (First & Last) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      aria-label="First Name"
                      className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="block text-[11px] text-slate-500 mt-1">First Name</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      aria-label="Last Name"
                      className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="block text-[11px] text-slate-500 mt-1">Last Name</span>
                  </div>
                </div>
              </div>

              {/* Organization Name */}
              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Organization / Group Name (if applicable)
                </label>
                <input
                  id="organizationName"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="e.g., Forest Ringette Association, Local Community Group"
                  className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Email & Website URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="block text-[11px] text-slate-500 mt-1">
                    example@example.com
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="websiteUrl"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Website URL (if available)
                  </label>
                  <input
                    id="websiteUrl"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://www.yourorganization.ca"
                    className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="block text-[11px] text-slate-500 mt-1">
                    Please enter your website address
                  </span>
                </div>
              </div>

              {/* Registered Nonprofit / Charity */}
              <div className="sm:w-2/3">
                <label
                  htmlFor="nonprofitStatus"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Are you a registered nonprofit / charity? <span className="text-rose-600">*</span>
                </label>
                <input
                  id="nonprofitStatus"
                  type="text"
                  required
                  value={nonprofitStatus}
                  onChange={(e) => setNonprofitStatus(e.target.value)}
                  placeholder="e.g., Yes (Registered Non-Profit / Charity #) or Community Initiative"
                  className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </section>

            {/* SECTION 2: Community Impact */}
            <section className="space-y-5">
              <div className="border-b-2 border-amber-500/80 pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                  Community Impact
                </h2>
              </div>

              {/* Who specifically benefits */}
              <div>
                <label
                  htmlFor="beneficiaries"
                  className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
                >
                  Who specifically benefits from your programs or services? (e.g., youth, seniors, low-income families)
                </label>
                <textarea
                  id="beneficiaries"
                  rows={5}
                  value={beneficiaries}
                  onChange={(e) => setBeneficiaries(e.target.value)}
                  placeholder="Describe the local residents, age groups, or community members in Forest and Lambton Shores who will benefit..."
                  className="w-full p-3.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="border-t border-amber-500/40 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Specific Purpose */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="specificPurpose"
                    className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                  >
                    What is the specific purpose for the requested donation?{' '}
                    <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="specificPurpose"
                    type="text"
                    required
                    value={specificPurpose}
                    onChange={(e) => setSpecificPurpose(e.target.value)}
                    placeholder="e.g., New youth safety gear, event sponsorship, facility upgrade"
                    className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Total Amount Requesting */}
                <div>
                  <label
                    htmlFor="requestedAmount"
                    className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
                  >
                    What is the total amount you are requesting?{' '}
                    <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-500">
                      $
                    </span>
                    <input
                      id="requestedAmount"
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      required
                      value={requestedAmount}
                      onChange={(e) => setRequestedAmount(e.target.value)}
                      placeholder="e.g., 500"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50/70 border border-stone-300 rounded-xl font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Accountability */}
            <section className="space-y-5">
              <div className="border-b-2 border-amber-500/80 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                  Accountability
                </h2>
              </div>

              {/* Follow-up report question */}
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2.5">
                  Are you willing to provide a follow-up report, update, or photos of the funded project?{' '}
                  <span className="text-rose-600">*</span>
                </p>
                <div className="grid grid-cols-2 sm:w-80 gap-3">
                  {(['Yes', 'No'] as const).map((option) => (
                    <label
                      key={`followup-${option}`}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                        willingFollowUp === option
                          ? 'bg-amber-500/15 border-amber-500 text-slate-950 shadow-2xs'
                          : 'bg-stone-50/70 border-stone-300 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="willingFollowUp"
                        value={option}
                        required
                        checked={willingFollowUp === option}
                        onChange={() => setWillingFollowUp(option)}
                        className="w-4 h-4 accent-amber-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Past support question */}
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2.5">
                  Have you received support from us in the past?{' '}
                  <span className="text-rose-600">*</span>
                </p>
                <div className="grid grid-cols-2 sm:w-80 gap-3">
                  {(['Yes', 'No'] as const).map((option) => (
                    <label
                      key={`past-${option}`}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                        pastSupport === option
                          ? 'bg-amber-500/15 border-amber-500 text-slate-950 shadow-2xs'
                          : 'bg-stone-50/70 border-stone-300 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pastSupport"
                        value={option}
                        required
                        checked={pastSupport === option}
                        onChange={() => setPastSupport(option)}
                        className="w-4 h-4 accent-amber-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: Final Steps */}
            <section className="space-y-4">
              <div className="border-b-2 border-amber-500/80 pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                  Final Steps
                </h2>
              </div>

              <div>
                <label
                  htmlFor="additionalNotes"
                  className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
                >
                  Is there anything else you&apos;d like us to know about your organization or funding request?
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Include any key event dates, recognition opportunities, or timeline details..."
                  className="w-full p-3.5 bg-stone-50/70 border border-stone-300 rounded-xl text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </section>

            {/* Submit & Review Schedule Footer */}
            <div className="pt-6 border-t-2 border-stone-200 space-y-5 print:hidden">
              {/* Review Schedule Notice Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
                <CalendarClock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Review Schedule:</span> All funding requests are reviewed and voted on by Association members during our monthly meeting on the{' '}
                  <span className="font-bold underline decoration-amber-400 underline-offset-2">
                    third week of each month
                  </span>
                  . Please submit your application ahead of time if your event or project is time-sensitive.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Submitted directly to the <span className="font-semibold text-slate-700">Forest Firefighters Association 1888</span>.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400 bg-[#0F172A] hover:bg-slate-800 border-2 border-amber-500 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Donation Request</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation & Email Dispatch Modal */}
      {submitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn print:hidden"
          onClick={() => setSubmitModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Donation Request Ready to Send
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Click <span className="font-bold text-slate-800">Send Request via Email</span> below to transmit your completed funding request directly to{' '}
              <span className="font-mono text-xs text-amber-800">{STATION_INFO.email}</span>. Association members review all requests during the <span className="font-semibold text-slate-800">third week of each month</span>.
            </p>

            {/* Quick Summary Preview */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 mb-5 text-xs font-mono space-y-1.5">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">APPLICANT:</span>
                <span className="font-bold text-slate-900 text-right">
                  {firstName} {lastName}
                </span>
              </div>
              {organizationName.trim() && (
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">ORGANIZATION:</span>
                  <span className="font-bold text-slate-900 text-right">{organizationName}</span>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">PURPOSE:</span>
                <span className="font-bold text-slate-900 text-right truncate max-w-[240px]">
                  {specificPurpose}
                </span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-stone-200 text-sm">
                <span className="font-extrabold text-slate-900">AMOUNT REQUESTED:</span>
                <span className="font-extrabold text-amber-700">{formatRequestedAmount()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={mailtoHref}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Send Request via Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyReport}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied Request to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Formatted Application Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Back to Edit Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

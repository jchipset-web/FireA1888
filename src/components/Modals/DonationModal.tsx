import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Download, Printer, CreditCard } from 'lucide-react';
import { STATION_INFO } from '../../data/associationData';

interface DonationModalProps {
  initialAmount: number;
  initialImpact: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  initialAmount,
  initialImpact,
  isOpen,
  onClose,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount || 50);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedication, setDedication] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'etransfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    receiptNumber: string;
    date: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    impact: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setReceiptData({
        receiptNumber: `FFA1888-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        amount: amount,
        donorName: donorName || 'Valued Lambton Shores Resident',
        donorEmail: donorEmail || 'supporter@community.ca',
        impact: initialImpact,
      });
    }, 900);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400">
                COMMUNITY REINVESTMENT FUND
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Philanthropic Contribution
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {receiptData ? (
          /* Receipt Screen */
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                Thank You for Your Generous Support!
              </h3>
              <p className="text-xs text-slate-500">
                100% of your contribution stays right here in Forest & Lambton Shores.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="border border-stone-200 rounded-xl p-5 bg-stone-50 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-slate-700">
                <div>
                  <div className="font-bold">{STATION_INFO.name}</div>
                  <div className="text-[10px] text-stone-500">{STATION_INFO.hall}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-700">{receiptData.receiptNumber}</div>
                  <div className="text-[10px] text-stone-500">{receiptData.date}</div>
                </div>
              </div>

              <div className="space-y-1.5 text-slate-700 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Benefactor:</span>
                  <span className="font-semibold">{receiptData.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span>{receiptData.donorEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Contribution Amount:</span>
                  <span className="font-bold text-slate-900 text-sm">${receiptData.amount}.00 CAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Certified Officer:</span>
                  <span>Cody Wilcox, Treasurer</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 text-[10px] text-stone-500 leading-relaxed font-sans">
                Official non-profit acknowledgment issued by Forest Firefighters Association 1888. Keep this record for your personal charitable filing.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleProcessDonation} className="p-6 sm:p-8 space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Gift Amount (CAD)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[25, 50, 100, 250].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAmount(t)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      amount === t
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                        : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                    }`}
                  >
                    ${t}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">$</span>
                <input
                  type="number"
                  min="5"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-stone-50 border border-stone-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name (For Receipt) *
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Eleanor Campbell"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address (For Tax Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="eleanor@forestmail.ca"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Optional Dedication / In Memory Of
                </label>
                <input
                  type="text"
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="In honor of past Station 2 volunteer firefighters"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Contribution Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900'
                      : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold">Credit Card / Debit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('etransfer')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'etransfer'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900'
                      : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold">Interac e-Transfer</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>
                  {isProcessing
                    ? 'Processing Contribution...'
                    : `Complete Donation of $${amount}.00 CAD`}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

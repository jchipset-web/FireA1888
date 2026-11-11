import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Calculator,
} from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface ExpenseSheetPageProps {
  onBackToHome: () => void;
}

interface ExpenseItem {
  id: string;
  description: string;
  amount: string;
}

const BILL_DENOMINATIONS = [
  { key: 'b5', label: '$5 Bills', multiplier: 5 },
  { key: 'b10', label: '$10 Bills', multiplier: 10 },
  { key: 'b20', label: '$20 Bills', multiplier: 20 },
  { key: 'b50', label: '$50 Bills', multiplier: 50 },
  { key: 'b100', label: '$100 Bills', multiplier: 100 },
] as const;

type BillKey = (typeof BILL_DENOMINATIONS)[number]['key'];

export const ExpenseSheetPage: React.FC<ExpenseSheetPageProps> = ({ onBackToHome }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [eventName, setEventName] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  const [eventDate, setEventDate] = useState(todayStr);
  const [comments, setComments] = useState('');

  // Bill counts stored as strings so mobile inputs can be cleared cleanly while typing
  const [billCounts, setBillCounts] = useState<Record<BillKey, string>>({
    b5: '',
    b10: '',
    b20: '',
    b50: '',
    b100: '',
  });

  // Direct dollar values for Coin, Cheque, E-Transfer
  const [coinValue, setCoinValue] = useState('');
  const [chequeValue, setChequeValue] = useState('');
  const [etransferValue, setEtransferValue] = useState('');

  // Dynamic Expense Rows (Start with 4 rows so it looks like a proper ledger right away)
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'exp-1', description: '', amount: '' },
    { id: 'exp-2', description: '', amount: '' },
    { id: 'exp-3', description: '', amount: '' },
    { id: 'exp-4', description: '', amount: '' },
  ]);

  const [errorMsg, setErrorMsg] = useState('');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    });
  };

  // Calculations
  const calculations = useMemo(() => {
    const billTotals: Record<BillKey, number> = {
      b5: (parseInt(billCounts.b5 || '0', 10) || 0) * 5,
      b10: (parseInt(billCounts.b10 || '0', 10) || 0) * 10,
      b20: (parseInt(billCounts.b20 || '0', 10) || 0) * 20,
      b50: (parseInt(billCounts.b50 || '0', 10) || 0) * 50,
      b100: (parseInt(billCounts.b100 || '0', 10) || 0) * 100,
    };

    const coin = parseFloat(coinValue || '0') || 0;
    const cheque = parseFloat(chequeValue || '0') || 0;
    const etransfer = parseFloat(etransferValue || '0') || 0;

    const grossIncome =
      billTotals.b5 +
      billTotals.b10 +
      billTotals.b20 +
      billTotals.b50 +
      billTotals.b100 +
      coin +
      cheque +
      etransfer;

    const totalExpenses = expenses.reduce((sum, item) => {
      return sum + (parseFloat(item.amount || '0') || 0);
    }, 0);

    const netTotal = grossIncome - totalExpenses;

    return {
      billTotals,
      coin,
      cheque,
      etransfer,
      grossIncome,
      totalExpenses,
      netTotal,
    };
  }, [billCounts, coinValue, chequeValue, etransferValue, expenses]);

  const handleBillChange = (key: BillKey, val: string) => {
    // Allow only whole numbers
    const cleaned = val.replace(/[^0-9]/g, '');
    setBillCounts((prev) => ({ ...prev, [key]: cleaned }));
  };

  const handleAddExpenseRow = () => {
    setExpenses((prev) => [
      ...prev,
      { id: `exp-${Date.now()}-${Math.random()}`, description: '', amount: '' },
    ]);
  };

  const handleRemoveExpenseRow = (id: string) => {
    if (expenses.length <= 1) {
      setExpenses([{ id: 'exp-1', description: '', amount: '' }]);
      return;
    }
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExpenseChange = (id: string, field: 'description' | 'amount', value: string) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleReset = () => {
    if (!window.confirm('Clear all entered numbers and reset this expense sheet?')) return;
    setEventName('');
    setPreparedBy('');
    setEventDate(todayStr);
    setComments('');
    setBillCounts({ b5: '', b10: '', b20: '', b50: '', b100: '' });
    setCoinValue('');
    setChequeValue('');
    setEtransferValue('');
    setExpenses([
      { id: 'exp-1', description: '', amount: '' },
      { id: 'exp-2', description: '', amount: '' },
      { id: 'exp-3', description: '', amount: '' },
      { id: 'exp-4', description: '', amount: '' },
    ]);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !preparedBy.trim()) {
      setErrorMsg('Please enter both the Event Name and Prepared By member name before submitting.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrorMsg('');
    setSubmitModalOpen(true);
  };

  // Build plain-text ledger for email/copy
  const generateLedgerReport = () => {
    const activeExpenses = expenses.filter(
      (e) => e.description.trim() !== '' || (parseFloat(e.amount) || 0) > 0
    );

    const expenseLines =
      activeExpenses.length > 0
        ? activeExpenses
            .map(
              (e, i) =>
                `  ${i + 1}. ${e.description || 'Unspecified Expense'}: ${formatCurrency(
                  parseFloat(e.amount || '0') || 0
                )}`
            )
            .join('\n')
        : '  None recorded';

    return [
      `FOREST FIREFIGHTERS ASSOCIATION 1888 — EVENT SETTLEMENT LEDGER`,
      `=============================================================`,
      `Event: ${eventName}`,
      `Prepared By: ${preparedBy}`,
      `Date: ${eventDate}`,
      ``,
      `SUMMARY RECONCILIATION`,
      `-------------------------------------------------------------`,
      `GROSS TOTAL:  ${formatCurrency(calculations.grossIncome)}`,
      `EXPENSES:    -${formatCurrency(calculations.totalExpenses)}`,
      `NET TOTAL:    ${formatCurrency(calculations.netTotal)}`,
      ``,
      `INCOME & CASH FLOAT BREAKDOWN`,
      `-------------------------------------------------------------`,
      `  $5 Bills (${billCounts.b5 || 0}): ${formatCurrency(calculations.billTotals.b5)}`,
      `  $10 Bills (${billCounts.b10 || 0}): ${formatCurrency(calculations.billTotals.b10)}`,
      `  $20 Bills (${billCounts.b20 || 0}): ${formatCurrency(calculations.billTotals.b20)}`,
      `  $50 Bills (${billCounts.b50 || 0}): ${formatCurrency(calculations.billTotals.b50)}`,
      `  $100 Bills (${billCounts.b100 || 0}): ${formatCurrency(calculations.billTotals.b100)}`,
      `  Coin: ${formatCurrency(calculations.coin)}`,
      `  Cheque: ${formatCurrency(calculations.cheque)}`,
      `  E-Transfer: ${formatCurrency(calculations.etransfer)}`,
      `  TOTAL INCOME: ${formatCurrency(calculations.grossIncome)}`,
      ``,
      `EXPENSE ITEMIZATION`,
      `-------------------------------------------------------------`,
      expenseLines,
      `  TOTAL EXPENSES: ${formatCurrency(calculations.totalExpenses)}`,
      ``,
      `COMMENTS / NOTES`,
      `-------------------------------------------------------------`,
      comments.trim() || 'None',
    ].join('\n');
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateLedgerReport());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback ignored
    }
  };

  const mailtoHref = `mailto:${STATION_INFO.treasuryEmail}?subject=${encodeURIComponent(
    `[Event Settlement] ${eventName || 'Event'} — Prepared by ${preparedBy}`
  )}&body=${encodeURIComponent(generateLedgerReport())}`;

  return (
    <div className="py-8 sm:py-12 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Action Bar */}
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
              <span>Reset</span>
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

        {/* Instruction Callout */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs sm:text-sm text-amber-950 print:hidden">
          <Calculator className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Member Event Settlement Sheet:</span> Count your physical bill denominations, record any event expenses, review your net total reconciliation, and click{' '}
            <span className="font-semibold">Submit to Treasurer</span> at the bottom to send your final tally to Cody Wilcox.
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 text-rose-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold mb-6">
            {errorMsg}
          </div>
        )}

        {/* Main Ledger Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-stone-300 rounded-2xl shadow-md overflow-hidden"
        >
          {/* Sheet Header: Event Meta + Association Crest */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-stone-300 bg-stone-50/70">
            <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r-2 border-stone-300">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">
                <span>— OFFICIAL EVENT CASH & EXPENSE LEDGER —</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="eventName"
                    className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1"
                  >
                    Event: <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="eventName"
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., Annual Two-Pitch Tournament"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-base sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preparedBy"
                    className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1"
                  >
                    Prepared By: <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="preparedBy"
                    type="text"
                    required
                    value={preparedBy}
                    onChange={(e) => setPreparedBy(e.target.value)}
                    placeholder="Member Full Name"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-base sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:w-1/2 sm:pr-2">
                <label
                  htmlFor="eventDate"
                  className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1"
                >
                  Settlement Date:
                </label>
                <input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-base sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Top Crest Box (Matches Excel Sheet Top-Right Logo) */}
            <div className="lg:col-span-4 p-5 flex flex-col items-center justify-center bg-white text-center">
              <img
                src="/images/as-logo.webp"
                alt="Forest Firefighters Association 1888 Crest"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-2 drop-shadow-sm"
              />
              <div className="text-xs font-extrabold uppercase tracking-tight text-slate-900">
                Forest Firefighters
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600">
                Association 1888
              </div>
            </div>
          </div>

          {/* Main 2-Column Ledger Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT COLUMN: Income Type & Cash Float Breakdown */}
            <div className="lg:col-span-6 p-4 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-stone-300 bg-stone-50/30">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900">
                  1. Income Type & Cash Float
                </h2>
                <span className="text-[11px] text-slate-500 font-medium">
                  Enter bill count, auto-calculates $
                </span>
              </div>

              <div className="border border-stone-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] font-mono uppercase tracking-wider">
                      <th className="py-2.5 px-3 text-left">Income Type</th>
                      <th className="py-2.5 px-2 text-center w-28"># of Bills</th>
                      <th className="py-2.5 px-3 text-right">$ Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {BILL_DENOMINATIONS.map((bill) => (
                      <tr key={bill.key} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2 px-3 font-bold text-slate-800">{bill.label}</td>
                        <td className="py-1.5 px-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="0"
                            value={billCounts[bill.key]}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => handleBillChange(bill.key, e.target.value)}
                            aria-label={`Quantity of ${bill.label}`}
                            className="w-full text-center py-1.5 px-2 bg-stone-50 border border-stone-300 rounded-lg font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900">
                          {formatCurrency(calculations.billTotals[bill.key])}
                        </td>
                      </tr>
                    ))}

                    {/* Coin */}
                    <tr className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-2 px-3 font-bold text-slate-800">Coin</td>
                      <td className="py-2 px-2 text-center text-[11px] font-mono text-stone-400">
                        Direct $
                      </td>
                      <td className="py-1.5 px-2">
                        <input
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={coinValue}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setCoinValue(e.target.value)}
                          aria-label="Coin total dollar amount"
                          className="w-full text-right py-1.5 px-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </td>
                    </tr>

                    {/* Cheque */}
                    <tr className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-2 px-3 font-bold text-slate-800">Cheque</td>
                      <td className="py-2 px-2 text-center text-[11px] font-mono text-stone-400">
                        Direct $
                      </td>
                      <td className="py-1.5 px-2">
                        <input
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={chequeValue}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setChequeValue(e.target.value)}
                          aria-label="Cheque total dollar amount"
                          className="w-full text-right py-1.5 px-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </td>
                    </tr>

                    {/* E-Transfer */}
                    <tr className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-2 px-3 font-bold text-slate-800">E-Transfer</td>
                      <td className="py-2 px-2 text-center text-[11px] font-mono text-stone-400">
                        Direct $
                      </td>
                      <td className="py-1.5 px-2">
                        <input
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={etransferValue}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setEtransferValue(e.target.value)}
                          aria-label="E-Transfer total dollar amount"
                          className="w-full text-right py-1.5 px-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-amber-100/80 border-t-2 border-stone-300 font-extrabold text-slate-900">
                      <td colSpan={2} className="py-3 px-3 text-right font-mono text-xs uppercase">
                        Total Income:
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-base text-amber-950">
                        {formatCurrency(calculations.grossIncome)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Comments Box (Matches Spreadsheet Comments Area) */}
              <div className="mt-6">
                <label
                  htmlFor="comments"
                  className="block text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800 mb-2"
                >
                  Comments / Float Notes:
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Record any starting float deductions, vendor receipts, or notes for Cody Wilcox..."
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl text-base sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Gross/Expenses/Net Summary + Expense Itemization */}
            <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between bg-white">
              {/* Flex container swaps order between Mobile (Expenses -> Summary) and Desktop (Summary -> Expenses) */}
              <div className="flex flex-col">
                
                {/* Summary Box: 2nd on Mobile (below expenses), 1st on Desktop (top right) */}
                <div className="order-2 lg:order-1 mt-6 lg:mt-0 lg:mb-6 bg-[#0F172A] text-white rounded-2xl p-4 sm:p-5 border-2 border-amber-500 shadow-sm">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-3 pb-2 border-b border-slate-800">
                    Event Financial Reconciliation
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-slate-300 font-semibold">
                        Gross Total:
                      </span>
                      <span className="font-mono font-bold text-base text-white">
                        {formatCurrency(calculations.grossIncome)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-slate-300 font-semibold">
                        Expenses:
                      </span>
                      <span className="font-mono font-bold text-base text-rose-400">
                        -{formatCurrency(calculations.totalExpenses)}
                      </span>
                    </div>
                    <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                        Net Total:
                      </span>
                      <span
                        className={`font-mono font-extrabold text-xl ${
                          calculations.netTotal < 0 ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {formatCurrency(calculations.netTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expense Itemization Table: 1st on Mobile, 2nd on Desktop */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900">
                      2. Expense Itemization
                    </h2>
                    <button
                      type="button"
                      onClick={handleAddExpenseRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer print:hidden"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Row</span>
                    </button>
                  </div>

                  <div className="border border-stone-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[11px] font-mono uppercase tracking-wider">
                          <th className="py-2.5 px-3 text-left">Expense Item</th>
                          <th className="py-2.5 px-3 text-right w-32 sm:w-36">$ Amount</th>
                          <th className="py-2.5 px-2 text-center w-10 print:hidden" aria-label="Remove">
                            &nbsp;
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {expenses.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="p-1.5">
                              <input
                                type="text"
                                placeholder={`Expense item #${idx + 1} (e.g., Ice, BBQ, Referee)`}
                                value={item.description}
                                onChange={(e) =>
                                  handleExpenseChange(item.id, 'description', e.target.value)
                                }
                                className="w-full py-1.5 px-2.5 bg-stone-50 border border-stone-300 rounded-lg text-base sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="number"
                                inputMode="decimal"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={item.amount}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) =>
                                  handleExpenseChange(item.id, 'amount', e.target.value)
                                }
                                className="w-full text-right py-1.5 px-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-base sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                              />
                            </td>
                            <td className="p-1 text-center print:hidden">
                              <button
                                type="button"
                                onClick={() => handleRemoveExpenseRow(item.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                aria-label="Remove expense row"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-rose-50/80 border-t-2 border-stone-300 font-extrabold text-slate-900">
                          <td className="py-3 px-3 text-right font-mono text-xs uppercase">
                            Total Expenses:
                          </td>
                          <td
                            colSpan={2}
                            className="py-3 px-3 text-right font-mono text-base text-rose-900"
                          >
                            {formatCurrency(calculations.totalExpenses)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

              </div>

              {/* Submit Footer */}
              <div className="mt-8 pt-6 border-t-2 border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 print:hidden">
                <div className="text-xs text-slate-500">
                  Submits directly to <span className="font-semibold text-slate-700">Cody Wilcox (Treasurer)</span>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit to Treasurer</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Submission & Email Confirmation Modal */}
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
              Settlement Sheet Ready for Cody Wilcox
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Click <span className="font-bold text-slate-800">Send via Email App</span> below to transmit this formatted breakdown directly to{' '}
              <span className="font-mono text-xs text-amber-800">{STATION_INFO.treasuryEmail}</span>, or copy the ledger text to paste into a message.
            </p>

            {/* Quick Summary Preview */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 mb-5 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">EVENT:</span>
                <span className="font-bold text-slate-900">{eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PREPARED BY:</span>
                <span className="font-bold text-slate-900">{preparedBy}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200">
                <span className="text-slate-500">GROSS INCOME:</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(calculations.grossIncome)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TOTAL EXPENSES:</span>
                <span className="font-bold text-rose-700">
                  -{formatCurrency(calculations.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 text-sm">
                <span className="font-extrabold text-slate-900">NET TOTAL:</span>
                <span className="font-extrabold text-amber-700">
                  {formatCurrency(calculations.netTotal)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={mailtoHref}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Send via Email App to Treasurer</span>
              </a>

              <button
                type="button"
                onClick={handleCopyReport}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied Ledger to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Formatted Summary Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Back to Edit Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

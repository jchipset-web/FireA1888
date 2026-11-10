import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Shield, Calendar, User, Printer } from 'lucide-react';
import { ArchiveDocument, STATION_INFO } from '../../data/associationData';

interface DocumentModalProps {
  document: ArchiveDocument | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!document) return null;

  const handleDownload = () => {
    // Generate text/pdf document blob
    const content = `=====================================================
${STATION_INFO.name.toUpperCase()}
${STATION_INFO.hall}
Official Document Archive & Public Ledger
=====================================================

DOCUMENT TITLE: ${document.title}
DOCUMENT ID:    ${document.documentNumber}
CLASSIFICATION: ${document.categoryLabel}
FILE SIZE:      ${document.fileSize}
LAST REVIEW:    ${document.updatedDate}
AUTHORITY:      ${document.author}

-----------------------------------------------------
OFFICIAL SYNOPSIS & INSTRUCTIONS:
-----------------------------------------------------
${document.description}

1. PURPOSE & JURISDICTION
This instrument is issued under the non-profit bylaws of the Forest Firefighters
Association 1888. All filings, participant waivers, and funding allocations are
subject to review by the elected Executive Board of Station 2, Forest, Ontario.

2. SUBMISSION GUIDELINES
Completed forms may be delivered in sealed correspondence to Station 2 Hall or
transmitted via email to:
- Event Signups: ${STATION_INFO.email}
- Sponsorship Grants: ${STATION_INFO.treasuryEmail}

3. CERTIFICATION
Registered Non-Profit Entity • Lambton Shores Fire Station 2
© 1888-2026 Forest Firefighters Association 1888.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.documentNumber}_${document.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 rounded-t-2xl flex items-start justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400">
                OFFICIAL REPOSITORY LEDGER
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {document.documentNumber}
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              {document.categoryLabel}
            </span>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {document.title}
            </h2>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 font-mono block text-[10px] uppercase">Format & Size</span>
              <span className="font-bold text-slate-800">{document.fileSize}</span>
            </div>
            <div>
              <span className="text-stone-400 font-mono block text-[10px] uppercase">Status</span>
              <span className="font-bold text-emerald-700">{document.updatedDate}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-stone-400 font-mono block text-[10px] uppercase">Signoff Authority</span>
              <span className="font-medium text-slate-800 truncate block">{document.author}</span>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Official Description & Guidance:
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-white border border-stone-200 p-4 rounded-xl">
              {document.description}
            </p>
          </div>

          {/* Submission Instructions */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Official Filing Instructions</span>
            </div>
            <p className="text-amber-900/90 leading-relaxed">
              Print or fill out this form and deliver to Lambton Shores Fire Station 2 (45 Main St S)
              or email directly to{' '}
              <a href={`mailto:${STATION_INFO.email}`} className="font-bold underline">
                {STATION_INFO.email}
              </a>
              . Receipts for charitable grants are issued following monthly Executive Board review.
            </p>
          </div>

          {downloadSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Document packet downloaded to your device successfully. You may print or archive this file.
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-stone-500">
            Certified Record • Forest Firefighters Association 1888
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, Download, FileText, X } from 'lucide-react';
import { DOCUMENTS_DATA, ArchiveDocument } from '../data/associationData';

interface DocumentRepositoryProps {
  onOpenDocument: (doc: ArchiveDocument) => void;
}

export const DocumentRepository: React.FC<DocumentRepositoryProps> = ({ onOpenDocument }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'event_signups' | 'sponsorship_grants' | 'public_records'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDocsExpanded, setMobileDocsExpanded] = useState(false);

  const filteredDocuments = useMemo(() => {
    return DOCUMENTS_DATA.filter((doc) => {
      const matchesCategory =
        activeCategory === 'all' || doc.category === activeCategory;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="repository" className="py-16 sm:py-24 bg-[#0F172A] border-b border-slate-800 text-white scroll-mt-12 relative overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-400 mb-4">
            <span>— COMMUNITY ARCHIVE & DISPATCH —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Community Ledger & <span className="text-amber-400">Document Repository</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Official Association forms, event registration ledgers, sponsorship grant applications,
            and public notices. Community members and team organizers may review and download official
            documentation directly below.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          {/* Segmented Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              ALL DOCUMENTS ({DOCUMENTS_DATA.length})
            </button>
            {DOCUMENTS_DATA.some((d) => d.category === 'event_signups') && (
              <button
                onClick={() => setActiveCategory('event_signups')}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeCategory === 'event_signups'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                EVENT SIGNUPS
              </button>
            )}
            {DOCUMENTS_DATA.some((d) => d.category === 'sponsorship_grants') && (
              <button
                onClick={() => setActiveCategory('sponsorship_grants')}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeCategory === 'sponsorship_grants'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                SPONSORSHIP & GRANTS
              </button>
            )}
            {DOCUMENTS_DATA.some((d) => d.category === 'public_records') && (
              <button
                onClick={() => setActiveCategory('public_records')}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeCategory === 'public_records'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                PUBLIC RECORDS
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms & files..."
              className="w-full pl-10 pr-9 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Document Cards Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/90 rounded-2xl border border-slate-800 text-white">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-200 mb-1">No documents found</p>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc, index) => {
                const isHiddenOnMobile = !mobileDocsExpanded && index >= 3;
                return (
                  <div
                    key={doc.id}
                    className={`${
                      isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                    } bg-white border border-stone-200 hover:border-amber-400 rounded-xl p-5 sm:p-6 flex-col justify-between shadow-xl hover:shadow-2xl transition-all`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono font-medium text-amber-700 mb-2.5">
                        <span className="flex items-center gap-1.5 font-bold">
                          <FileText className="w-3.5 h-3.5 text-amber-600" />
                          <span>{doc.categoryLabel}</span>
                        </span>
                        <span className="text-stone-400 font-semibold">{doc.fileSize}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#0F172A] leading-snug mb-3 hover:text-blue-800 transition-colors">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-slate-700 leading-relaxed mb-6">
                        {doc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">
                        {doc.updatedDate}
                      </span>
                      <button
                        onClick={() => onOpenDocument(doc)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider text-white bg-[#0F172A] hover:bg-slate-800 active:bg-slate-950 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile toggle button when filtered list exceeds 3 */}
            {filteredDocuments.length > 3 && (
              <div className="mt-6 md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileDocsExpanded(!mobileDocsExpanded)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-slate-800/90 border border-slate-700 hover:bg-slate-750 transition-colors text-center"
                >
                  {mobileDocsExpanded
                    ? 'Show Fewer Documents ▲'
                    : `Show All Documents (${filteredDocuments.length}) ▼`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

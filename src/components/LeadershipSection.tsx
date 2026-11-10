import React from 'react';
import { UserCheck, ShieldCheck, Landmark, FileText, Mail } from 'lucide-react';
import { BOARD_MEMBERS, BoardMember } from '../data/associationData';

interface LeadershipSectionProps {
  onContactOfficer: (officer: BoardMember) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onContactOfficer }) => {
  const [mobileBoardExpanded, setMobileBoardExpanded] = React.useState(false);

  const getIcon = (id: string) => {
    switch (id) {
      case 'dave-solway':
        return <UserCheck className="w-5 h-5 text-amber-600" />;
      case 'vice-president':
        return <ShieldCheck className="w-5 h-5 text-blue-900" />;
      case 'cody-wilcox':
        return <Landmark className="w-5 h-5 text-amber-600" />;
      case 'secretary':
      default:
        return <FileText className="w-5 h-5 text-blue-900" />;
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'dave-solway':
        return 'bg-amber-50 border-amber-200';
      case 'vice-president':
        return 'bg-blue-50 border-blue-200';
      case 'cody-wilcox':
        return 'bg-amber-50 border-amber-200';
      case 'secretary':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <section id="leadership" className="py-16 sm:py-24 bg-[#0F172A] border-b border-slate-800 text-white scroll-mt-12 relative overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-400 mb-4">
            <span>— GOVERNANCE & TRUST —</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Executive Board <span className="text-amber-400">& Leadership</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The Forest Firefighters Association 1888 is a registered non-profit organization driven
            entirely by the dedication of our membership. Our operations, community events, and
            charitable initiatives are overseen by an elected Executive Board comprised of off-duty
            active personnel, retirees, and alumni.
          </p>
        </div>

        {/* 4 Board Member Cards - White background with rich blue writing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOARD_MEMBERS.map((member, index) => {
            const isHiddenOnMobile = !mobileBoardExpanded && index >= 2;
            return (
              <div
                key={member.id}
                className={`${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } bg-white border border-stone-200 hover:border-amber-400 rounded-xl p-6 flex-col justify-between shadow-xl hover:shadow-2xl transition-all group`}
              >
                <div>
                  {/* Header Icon + Role Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getIconBg(member.id)} group-hover:scale-105 transition-transform`}>
                      {getIcon(member.id)}
                    </div>
                    <button
                      onClick={() => onContactOfficer(member)}
                      className="text-slate-400 hover:text-amber-600 transition-colors p-1 cursor-pointer"
                      title={`Contact ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-blue-900 mb-1">
                    {member.title}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-blue-800 transition-colors mb-3">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mb-6">
                    {member.description}
                  </p>
                </div>

                {/* Footer Badges */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-500">{member.tag1}</span>
                  <span className="font-semibold text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {member.tag2}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile toggle button */}
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileBoardExpanded(!mobileBoardExpanded)}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-slate-800/90 border border-slate-700 hover:bg-slate-750 transition-colors text-center"
          >
            {mobileBoardExpanded ? 'Show Fewer Officers ▲' : 'View All Board Officers (4) ▼'}
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock, Users, Download } from 'lucide-react';
import { CommunityEvent, STATION_INFO } from '../../data/associationData';

interface EventDetailModalProps {
  event: CommunityEvent | null;
  onClose: () => void;
  onVolunteer: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onVolunteer,
}) => {
  const [calendarSaved, setCalendarSaved] = useState(false);

  if (!event) return null;

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Forest Firefighters Association 1888//Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} - Organized by Forest Firefighters Association 1888
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${event.id}_forest_firefighters_event.ics`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400">
              COMMUNITY TRADITION DETAILS
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
              {event.category}
            </span>
            {event.dateBadge && (
              <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-[11px] font-semibold">
                {event.dateBadge}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
            {event.description}
          </p>

          {/* Key Event Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 font-mono block text-[10px] uppercase">Date & Timing</span>
                <span className="font-semibold text-slate-800">{event.dateText}</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 font-mono block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-slate-800">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Highlights List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Community Highlights & Participation</span>
            </h4>
            <div className="space-y-2">
              {event.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {calendarSaved && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Event calendar file (.ics) downloaded. Added to your calendar schedule!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-stone-300 hover:bg-stone-100 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onVolunteer();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-white hover:bg-stone-100 border border-stone-300 transition-colors"
            >
              Volunteer for Event
            </button>
            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

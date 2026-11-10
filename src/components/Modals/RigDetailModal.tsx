import React from 'react';
import { X, Wrench, Shield, Info, Gauge, Fuel } from 'lucide-react';
import { FleetRig } from '../../data/associationData';

interface RigDetailModalProps {
  rig: FleetRig | null;
  onClose: () => void;
  onRequestAppearance: () => void;
}

export const RigDetailModal: React.FC<RigDetailModalProps> = ({
  rig,
  onClose,
  onRequestAppearance,
}) => {
  if (!rig) return null;

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
              HISTORIC FLEET SPECIFICATION
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {rig.chassis}
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
          <div>
            <div className="text-[11px] font-mono font-bold uppercase text-amber-700 mb-1">
              {rig.type} • {rig.role}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {rig.name}
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
            {rig.description}
          </p>

          {/* Technical Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-600" />
              <span>Engineering & Apparatus Specifications</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {rig.specs.engine && (
                <div className="p-3 bg-white border border-stone-200 rounded-lg">
                  <span className="text-stone-400 font-mono block text-[10px] uppercase">Engine / Powertrain</span>
                  <span className="font-semibold text-slate-800">{rig.specs.engine}</span>
                </div>
              )}
              {rig.specs.pump && (
                <div className="p-3 bg-white border border-stone-200 rounded-lg">
                  <span className="text-stone-400 font-mono block text-[10px] uppercase">Pump Rating</span>
                  <span className="font-semibold text-slate-800">{rig.specs.pump}</span>
                </div>
              )}
              {rig.specs.tank && (
                <div className="p-3 bg-white border border-stone-200 rounded-lg">
                  <span className="text-stone-400 font-mono block text-[10px] uppercase">Water Tank / Reservoir</span>
                  <span className="font-semibold text-slate-800">{rig.specs.tank}</span>
                </div>
              )}
              {rig.specs.coachwork && (
                <div className="p-3 bg-white border border-stone-200 rounded-lg">
                  <span className="text-stone-400 font-mono block text-[10px] uppercase">Coachwork Builder</span>
                  <span className="font-semibold text-slate-800">{rig.specs.coachwork}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Maintained as part of the Forest Firefighters Association Historical Apparatus Registry. Available for civic festivals, parades, and historical demonstrations upon advance booking.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-stone-300 hover:bg-stone-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestAppearance();
            }}
            className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors"
          >
            Request Fleet Appearance
          </button>
        </div>
      </div>
    </div>
  );
};

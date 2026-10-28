import React from 'react';
import { HeartPulse, Calculator, ShieldAlert, FileText } from 'lucide-react';

interface HeaderProps {
  activeView: 'drugs' | 'calculators' | 'protocols' | 'interactions' | 'anticoag-reversal';
  onNavigate: (view: 'drugs' | 'calculators' | 'protocols' | 'interactions' | 'anticoag-reversal') => void;
  selectedDrugsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  selectedDrugsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <button
              onClick={() => onNavigate('drugs')}
              className="text-left group cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors whitespace-nowrap">
                EmergenzFarmaco
              </span>
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('drugs')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'drugs'
                  ? 'text-rose-600 border-rose-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Prontuario
            </button>

            <button
              onClick={() => onNavigate('anticoag-reversal')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'anticoag-reversal'
                  ? 'text-rose-600 border-rose-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Reverse Anticoagulanti</span>
            </button>

            <button
              onClick={() => onNavigate('calculators')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'calculators'
                  ? 'text-rose-600 border-rose-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calcolatori Clinici</span>
            </button>

            <button
              onClick={() => onNavigate('protocols')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'protocols'
                  ? 'text-rose-600 border-rose-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Protocolli Rapidi</span>
            </button>

            <button
              onClick={() => onNavigate('interactions')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 relative ${
                activeView === 'interactions'
                  ? 'text-rose-600 border-rose-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Verifica Interazioni</span>
              {selectedDrugsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-mono font-bold bg-amber-100 text-amber-800 rounded">
                  {selectedDrugsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Quick Action / Mobile helper */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('anticoag-reversal')}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Reverse</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PS & Medicina d'Urgenza</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

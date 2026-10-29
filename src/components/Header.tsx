import React from 'react';
import { HeartPulse, Calculator, ShieldAlert, FileText, Share2, Layers } from 'lucide-react';

interface HeaderProps {
  activeView: 'drugs' | 'calculators' | 'protocols' | 'interactions' | 'anticoag-reversal';
  onNavigate: (view: 'drugs' | 'calculators' | 'protocols' | 'interactions' | 'anticoag-reversal') => void;
  selectedDrugsCount: number;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  selectedDrugsCount,
  onOpenShare,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
            <button
              onClick={() => onNavigate('drugs')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors whitespace-nowrap">
                  EmergenzFarmaco
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-rose-50 text-rose-700 border border-rose-200/60">
                  PS & OBI
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onNavigate('drugs')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'drugs'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Prontuario
            </button>

            <button
              onClick={() => onNavigate('anticoag-reversal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'anticoag-reversal'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Reverse Anticoagulanti</span>
            </button>

            <button
              onClick={() => onNavigate('calculators')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'calculators'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calcolatori Clinici</span>
            </button>

            <button
              onClick={() => onNavigate('protocols')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'protocols'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Protocolli</span>
            </button>

            <button
              onClick={() => onNavigate('interactions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer relative ${
                activeView === 'interactions'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interazioni</span>
              {selectedDrugsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono font-bold bg-amber-200 text-amber-900 rounded-full">
                  {selectedDrugsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Action / Share Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Condividi indirizzo web dell'app"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Condividi</span>
            </button>

            <button
              onClick={() => onNavigate('calculators')}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-rose-600" />
              <span>Calc</span>
            </button>

            <button
              onClick={() => onNavigate('anticoag-reversal')}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-2xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Reverse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Secondary Navigation Strip */}
      <div className="md:hidden flex items-center justify-between px-3 py-1.5 border-t border-slate-200/70 bg-slate-50/80 overflow-x-auto scrollbar-none gap-1 text-[11px] font-semibold text-slate-600">
        <button
          onClick={() => onNavigate('drugs')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
            activeView === 'drugs'
              ? 'bg-rose-600 text-white font-bold'
              : 'hover:bg-slate-200/60'
          }`}
        >
          Prontuario
        </button>

        <button
          onClick={() => onNavigate('anticoag-reversal')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeView === 'anticoag-reversal'
              ? 'bg-rose-600 text-white font-bold'
              : 'hover:bg-slate-200/60'
          }`}
        >
          <ShieldAlert className="w-3 h-3 text-rose-500" />
          <span>Reverse</span>
        </button>

        <button
          onClick={() => onNavigate('calculators')}
          className="px-2.5 py-1 rounded-lg whitespace-nowrap hover:bg-slate-200/60 flex items-center gap-1"
        >
          <Calculator className="w-3 h-3 text-slate-500" />
          <span>Calcolatori</span>
        </button>

        <button
          onClick={() => onNavigate('protocols')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
            activeView === 'protocols'
              ? 'bg-rose-600 text-white font-bold'
              : 'hover:bg-slate-200/60'
          }`}
        >
          Protocolli
        </button>

        <button
          onClick={() => onNavigate('interactions')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeView === 'interactions'
              ? 'bg-rose-600 text-white font-bold'
              : 'hover:bg-slate-200/60'
          }`}
        >
          <span>Interazioni</span>
          {selectedDrugsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 text-[9px] flex items-center justify-center font-bold">
              {selectedDrugsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

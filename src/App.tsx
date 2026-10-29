import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar, SearchFilterState } from './components/SearchBar';
import { DrugCard } from './components/DrugCard';
import { DrugDetailModal } from './components/DrugDetailModal';
import { CalculatorsModal } from './components/CalculatorsModal';
import { InteractionsChecker } from './components/InteractionsChecker';
import { QuickProtocolsView } from './components/QuickProtocolsModal';
import { AnticoagReversalView } from './components/AnticoagReversalView';
import { ShareModal } from './components/ShareModal';
import { EMERGENCY_DRUGS } from './data/drugsData';
import { DrugClass, EmergencyDrug, TherapeuticIndication } from './types/pharmacy';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  FileText,
  Calculator,
  ShieldAlert,
  Wind,
  Compass,
  Smile,
  ShieldCheck,
  Stethoscope,
  Brain,
  Timer,
  Flame,
  Zap,
  Heart,
  Scale,
} from 'lucide-react';

const INITIAL_SEARCH_FILTERS: SearchFilterState = {
  query: '',
  setting: 'tutti',
  indication: 'tutte',
  drugClass: 'tutte',
  highAlertOnly: false,
  qtRiskOnly: false,
  renalAdjustmentOnly: false,
  pregnancyFilter: 'all',
};

export default function App() {
  const [activeView, setActiveView] = useState<
    'drugs' | 'calculators' | 'protocols' | 'interactions' | 'anticoag-reversal'
  >('drugs');

  const [searchFilters, setSearchFilters] = useState<SearchFilterState>(
    INITIAL_SEARCH_FILTERS
  );

  const [selectedDrug, setSelectedDrug] = useState<EmergencyDrug | null>(null);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // Multi-drug interactions cart
  const [interactionsCartIds, setInteractionsCartIds] = useState<string[]>([
    'amiodarone',
    'metoprololo-ev',
  ]);

  // Extract all unique indications and classes
  const allIndications = useMemo(() => {
    const set = new Set<TherapeuticIndication>();
    EMERGENCY_DRUGS.forEach((d) => d.emergencyIndications.forEach((ind) => set.add(ind)));
    return Array.from(set).sort();
  }, []);

  const allClasses = useMemo(() => {
    const set = new Set<DrugClass>();
    EMERGENCY_DRUGS.forEach((d) => set.add(d.drugClass));
    return Array.from(set).sort();
  }, []);

  // Filtered drugs computation
  const filteredDrugs = useMemo(() => {
    return EMERGENCY_DRUGS.filter((drug) => {
      // 1. Text search
      if (searchFilters.query.trim()) {
        const q = searchFilters.query.toLowerCase().trim();
        const nameMatch = drug.name.toLowerCase().includes(q);
        const brandMatch = drug.brandNames.some((b) => b.toLowerCase().includes(q));
        const classMatch = drug.drugClass.toLowerCase().includes(q);
        const summaryMatch = drug.quickSummary.toLowerCase().includes(q);
        const indicationMatch = drug.emergencyIndications.some((ind) =>
          ind.toLowerCase().includes(q)
        );
        const dosageMatch = drug.dosages.some(
          (d) =>
            d.indication.toLowerCase().includes(q) ||
            d.preparation.toLowerCase().includes(q)
        );

        if (
          !nameMatch &&
          !brandMatch &&
          !classMatch &&
          !summaryMatch &&
          !indicationMatch &&
          !dosageMatch
        ) {
          return false;
        }
      }

      // 2. Setting filter (Adult only: PS vs Reparto)
      if (searchFilters.setting !== 'tutti') {
        if (searchFilters.setting === 'ps') {
          if (drug.clinicalSetting !== 'ps' && drug.clinicalSetting !== 'entrambi') {
            return false;
          }
        } else if (searchFilters.setting === 'reparto') {
          if (drug.clinicalSetting !== 'reparto' && drug.clinicalSetting !== 'entrambi') {
            return false;
          }
        } else if (searchFilters.setting === 'entrambi') {
          if (drug.clinicalSetting !== 'entrambi') {
            return false;
          }
        }
      }

      // 3. Indication filter
      if (searchFilters.indication !== 'tutte') {
        if (!drug.emergencyIndications.includes(searchFilters.indication)) {
          return false;
        }
      }

      // 4. Drug Class filter
      if (searchFilters.drugClass !== 'tutte') {
        if (drug.drugClass !== searchFilters.drugClass) {
          return false;
        }
      }

      // 5. Safety filters
      if (searchFilters.highAlertOnly && !drug.isHighAlert) {
        return false;
      }

      if (searchFilters.qtRiskOnly && !drug.warnings.some((w) => w.isQTC)) {
        return false;
      }

      if (
        searchFilters.renalAdjustmentOnly &&
        drug.renalAdjustment.crclSevere === 'Nessun aggiustamento.'
      ) {
        return false;
      }

      if (searchFilters.pregnancyFilter === 'contraindicated') {
        if (drug.pregnancy.riskLevel !== 'contraindicated' && drug.pregnancy.riskLevel !== 'high_risk') {
          return false;
        }
      } else if (searchFilters.pregnancyFilter === 'safe') {
        if (drug.pregnancy.riskLevel !== 'safe') {
          return false;
        }
      }

      return true;
    });
  }, [searchFilters]);

  const toggleInteractionsCart = (drug: EmergencyDrug) => {
    setInteractionsCartIds((prev) =>
      prev.includes(drug.id) ? prev.filter((id) => id !== drug.id) : [...prev, drug.id]
    );
  };

  const handleSelectDrugById = (drugId: string) => {
    const found = EMERGENCY_DRUGS.find((d) => d.id === drugId);
    if (found) {
      setSelectedDrug(found);
    }
  };

  const quickFilterByIndication = (ind: TherapeuticIndication) => {
    setSearchFilters({
      ...searchFilters,
      indication: ind,
      query: '',
    });
    setActiveView('drugs');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar Contract (1 line brand, 4-5 nav links, 1 primary action) */}
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'calculators') {
            setIsCalculatorsOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        selectedDrugsCount={interactionsCartIds.length}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: PRONTUARIO FARMACI */}
        {activeView === 'drugs' && (
          <div>
            {/* Clinical Hero Intro */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                  <span>Farmacologia Clinica & Emergenza Urgenza</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-rose-600">Pronto Soccorso & Reparto</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Prontuario Terapeutico d'Urgenza
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Consultazione rapida al letto del paziente: dosaggi, diluizioni pratiche in pompa siringa,
                  indicazioni da ultime linee guida (ERC, ESC, SSC, KDIGO), warning, correzioni renali ed epatiche.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  onClick={() => setActiveView('anticoag-reversal')}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
                >
                  <ShieldAlert className="w-4 h-4 text-white" />
                  <span>Reverse Anticoagulanti</span>
                </button>
                <button
                  onClick={() => setIsCalculatorsOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
                >
                  <Calculator className="w-4 h-4 text-slate-600" />
                  <span>Calcolatori Clinici</span>
                </button>
                <button
                  onClick={() => setActiveView('protocols')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
                >
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Protocolli Rapidi</span>
                </button>
              </div>
            </div>

            {/* High-Priority Clinical Banner: Protocollo Reversal */}
            <div className="mb-5 p-3.5 sm:p-4 rounded-xl border border-rose-200 bg-linear-to-r from-rose-50 via-white to-rose-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-rose-700">
                    <span>PROTOCOLLO CLINICO EMOSTATICO</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">EMORRAGIE ACUTE & MANOVRE INVASIVE</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium leading-snug">
                    Linee di condotta e calcolo rapido dosi di reverse per <strong>DOAC (Dabigatran, Apixaban, Rivaroxaban, Edoxaban)</strong>, <strong>AVK (Warfarin)</strong> ed <strong>Eparine</strong> secondo cut-off plasmatici e gravità.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('anticoag-reversal')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 bg-white hover:bg-rose-100/50 border border-rose-300 rounded-lg transition-colors shadow-2xs whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <span>Apri Protocollo & Calcolatore</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            {/* Dedicated Clinical Sections Cards (Vertigini, Ansia/Panico, BPCO, Asma, Reazioni Allergiche) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Sezioni Cliniche di Pronto Soccorso & Degenza:
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    (Clicca per consultare i farmaci e le linee guida della sezione)
                  </span>
                </div>
                {searchFilters.indication !== 'tutte' && (
                  <button
                    onClick={() =>
                      setSearchFilters({ ...searchFilters, indication: 'tutte' })
                    }
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Mostra tutti i farmaci</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5">
                {/* 1. VERTIGINI */}
                <button
                  onClick={() => quickFilterByIndication('Vertigini & Sindromi Vestibolari')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Vertigini & Sindromi Vestibolari'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Compass className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">HINTS</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Vertigini & Vestibolare</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Levosulpiride, Torecan, Dimenidrinato
                  </p>
                </button>

                {/* 2. ATTACCHI DI PANICO ED ANSIA */}
                <button
                  onClick={() => quickFilterByIndication('Ansia Acuta & Attacchi di Panico')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Ansia Acuta & Attacchi di Panico'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <Smile className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">BDZ / H1</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Ansia & Panico</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Alprazolam, Tavor, Diazepam, Atarax
                  </p>
                </button>

                {/* 3. BPCO RIACUTIZZATA */}
                <button
                  onClick={() => quickFilterByIndication('BPCO Riacutizzata')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'BPCO Riacutizzata'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                      <Wind className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">GOLD</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">BPCO Riacutizzata</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Breva, Urbason, Atem, Tefamin
                  </p>
                </button>

                {/* 4. ASMA ACUTO */}
                <button
                  onClick={() => quickFilterByIndication('Asma Acuto')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Asma Acuto'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                      <HeartPulse className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">GINA</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Asma Acuto</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Salbutamolo, Mg Solfato, Cortisonici
                  </p>
                </button>

                {/* 5. REAZIONI ALLERGICHE & ANAFILASSI */}
                <button
                  onClick={() => quickFilterByIndication('Reazioni Allergiche & Anafilassi')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Reazioni Allergiche & Anafilassi'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">EAACI</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Reazioni Allergiche</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Adrenalina IM, Trimeton, Soldesam
                  </p>
                </button>

                {/* 6. COLICA RENALE & ADDOME ACUTO */}
                <button
                  onClick={() => quickFilterByIndication('Colica Renale & Addome Acuto')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Colica Renale & Addome Acuto'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">EAU / WSES</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Colica Renale & Addome</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Artrosilene, Buscopan, Toradol, Morfina
                  </p>
                </button>

                {/* 7. EMERGENZE METABOLICHE & DISIONIE */}
                <button
                  onClick={() => quickFilterByIndication('Emergenze Metaboliche & Disionie')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Emergenze Metaboliche & Disionie'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Flame className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">DISIONIE</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Emergenze Metaboliche</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Calcio Gluconato, Insulina, Sol. 3%, Bicarb.
                  </p>
                </button>

                {/* 8. AGITAZIONE PSICOMOTORIA & DELIRIUM */}
                <button
                  onClick={() => quickFilterByIndication('Agitazione Psicomotoria & Delirium')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Agitazione Psicomotoria & Delirium'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                      <Brain className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">OBI / PS</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Agitazione & Delirium</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Olanzapina IM, Entumin, Serenase, Tavor
                  </p>
                </button>

                {/* 9. ICTUS ISCHEMICO ACUTO & FIBRINOLISI */}
                <button
                  onClick={() => quickFilterByIndication('Ictus Ischemico Acuto & Fibrinolisi')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    searchFilters.indication === 'Ictus Ischemico Acuto & Fibrinolisi'
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
                      <Timer className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">ESO 2024</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Ictus & Fibrinolisi</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Tenecteplase, Alteplase, Labetalolo, Urapidil
                  </p>
                </button>
              </div>

              {/* Other clinical syndromes pills */}
              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap mr-1">
                  Altri quadri:
                </span>
                <button
                  onClick={() => quickFilterByIndication('Arresto Cardiaco / ACLS')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Arresto Cardiaco / ACLS'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Arresto Cardiaco / ACLS
                </button>
                <button
                  onClick={() => quickFilterByIndication('Shock & Ipotensione')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Shock & Ipotensione'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Shock & Vasopressori
                </button>
                <button
                  onClick={() => quickFilterByIndication('Infezione & Sepsi')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Infezione & Sepsi'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Infezione & Sepsi
                </button>
                <button
                  onClick={() => quickFilterByIndication('EPA & Insufficienza Cardiaca')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'EPA & Insufficienza Cardiaca'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  EPA & Scompenso
                </button>
                <button
                  onClick={() => quickFilterByIndication('Aritmie & Cardioversione')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Aritmie & Cardioversione'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Aritmie & Cardioversione
                </button>
                <button
                  onClick={() => quickFilterByIndication('Emorragia & Inversione Anticoagulanti')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Emorragia & Inversione Anticoagulanti'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Emorragie & Reversal
                </button>
                <button
                  onClick={() => quickFilterByIndication('Dolore Acuto & Analgesia')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Dolore Acuto & Analgesia'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Dolore Acuto
                </button>
                <button
                  onClick={() => quickFilterByIndication('Sedazione Procedurale & RSI')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Sedazione Procedurale & RSI'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Sedazione & RSI
                </button>
                <button
                  onClick={() => quickFilterByIndication('Intossicazioni & Antidoti')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    searchFilters.indication === 'Intossicazioni & Antidoti'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  Antidoti d'Urgenza
                </button>
              </div>
            </div>

            {/* Advanced Search & Filtering Component */}
            <SearchBar
              filters={searchFilters}
              onFilterChange={setSearchFilters}
              onReset={() => setSearchFilters(INITIAL_SEARCH_FILTERS)}
              totalResults={filteredDrugs.length}
              allIndications={allIndications}
              allClasses={allClasses}
            />

            {/* Drug Cards Grid */}
            {filteredDrugs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <AlertTriangle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Nessun farmaco corrispondente ai criteri impostati
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                  Prova a modificare i filtri per indicazione terapeutica o classe farmacologica,
                  oppure azzera la ricerca.
                </p>
                <button
                  onClick={() => setSearchFilters(INITIAL_SEARCH_FILTERS)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ripristina Tutti i Farmaci</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDrugs.map((drug) => (
                  <DrugCard
                    key={drug.id}
                    drug={drug}
                    onSelect={setSelectedDrug}
                    isInInteractionsCart={interactionsCartIds.includes(drug.id)}
                    onToggleInteractionsCart={toggleInteractionsCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: PROTOCOLLI OPERATIVI GUIDELINE-BASED */}
        {activeView === 'protocols' && (
          <QuickProtocolsView
            allDrugs={EMERGENCY_DRUGS}
            onSelectDrugById={handleSelectDrugById}
            onOpenAnticoagReversal={() => setActiveView('anticoag-reversal')}
          />
        )}

        {/* VIEW 4: VERIFICATORE INTERAZIONI */}
        {activeView === 'interactions' && (
          <InteractionsChecker
            selectedDrugIds={interactionsCartIds}
            allDrugs={EMERGENCY_DRUGS}
            onAddDrug={(id) => setInteractionsCartIds((prev) => [...prev, id])}
            onRemoveDrug={(id) =>
              setInteractionsCartIds((prev) => prev.filter((dId) => dId !== id))
            }
            onClearAll={() => setInteractionsCartIds([])}
            onSelectDrug={setSelectedDrug}
          />
        )}

        {/* VIEW 5: GESTIONE SANGUINAMENTI & REVERSE ANTICOAGULANTI */}
        {activeView === 'anticoag-reversal' && (
          <AnticoagReversalView
            allDrugs={EMERGENCY_DRUGS}
            onSelectDrugById={handleSelectDrugById}
          />
        )}
      </main>

      {/* Drug Detail Modal */}
      {selectedDrug && (
        <DrugDetailModal
          drug={selectedDrug}
          onClose={() => setSelectedDrug(null)}
          isInInteractionsCart={interactionsCartIds.includes(selectedDrug.id)}
          onToggleInteractionsCart={toggleInteractionsCart}
          onOpenInteractionChecker={() => {
            setSelectedDrug(null);
            setActiveView('interactions');
          }}
          onOpenAnticoagReversal={() => {
            setSelectedDrug(null);
            setActiveView('anticoag-reversal');
          }}
        />
      )}



      {/* Integrated Calculators Modal */}
      {isCalculatorsOpen && (
        <CalculatorsModal
          onClose={() => setIsCalculatorsOpen(false)}
          drugs={EMERGENCY_DRUGS}
          onSelectDrug={(drug) => {
            setIsCalculatorsOpen(false);
            setSelectedDrug(drug);
          }}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Clinical Disclaimer & Legal Notice Footer */}
      <footer className="bg-white border-t border-slate-200 mt-14 pt-8 pb-10 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Legal Disclaimer Box */}
          <div className="bg-slate-50 border border-slate-300/80 rounded-2xl p-4 sm:p-6 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              <Scale className="w-4 h-4 text-slate-700 shrink-0" />
              <span>NOTA LEGALE & MEDICA · ESCLUSIONE TOTALE DI RESPONSABILITÀ (LEGAL DISCLAIMER)</span>
            </div>

            <div className="text-[11px] sm:text-xs leading-relaxed text-slate-600 space-y-2.5">
              <p>
                <strong>1. Finalità dello strumento:</strong> La presente applicazione web (<em>EmergenzFarmaco</em>) costituisce un ausilio tecnologico indipendente ad esclusivo scopo consultivo, informativo ed educativo, concepito per agevolare l'orientamento clinico rapido da parte di medici chirurghi e personale sanitario abilitato operanti nell'emergenza-urgenza.
              </p>

              <p>
                <strong>2. Esclusione totale di responsabilità civile e penale:</strong> L'autore, lo sviluppatore, i collaboratori e chiunque abbia concorso alla stesura, pubblicazione o diffusione di questa applicazione <strong>declinano espressamente e incondizionatamente qualsiasi responsabilità</strong> civile, penale, disciplinare o deontologica per qualsivoglia danno diretto, indiretto, accidentale, consequenziale, morale o materiale a persone o cose (inclusi eventi avversi, lesioni personali, complicanze terapeutiche, peggioramenti prognostici o decesso) derivante direttamente o indirettamente dall'accesso, dall'uso, dall'affidamento o dall'impossibilità di utilizzo della presente applicazione, nonché da eventuali errori, refusi, omissioni, inesattezze o mancati aggiornamenti nei dati pubblicati.
              </p>

              <p>
                <strong>3. Dovere inderogabile di verifica autonoma da parte del medico:</strong> La farmacoterapia d'urgenza è soggetta a continua evoluzione scientifica, eterogeneità di tolleranza e complessità del quadro clinico individuale. <strong>È onere e responsabilità inderogabile ed esclusiva del medico curante/prescrittore verificare personalmente e scrupolosamente ogni singola informazione</strong> (ivi compresi dosaggi, schemi di titolazione, diluizioni, compatibilità chimico-fisiche in Y, velocità di infusione in pompa siringa, aggiustamenti per funzionalità renale ed epatica, controindicazioni e alert per gravidanza/allattamento) mediante riscontro diretto con i <em>Riassunti delle Caratteristiche del Prodotto (RCP / SmPC ufficiali AIFA ed EMA)</em>, i prontuari e protocolli operativi aziendali della propria Azienda Sanitaria/Ospedaliera e le più recenti linee guida delle società scientifiche accreditate.
              </p>

              <p>
                <strong>4. Autonomia della decisione clinica:</strong> Questa applicazione non sostituisce in alcun modo l'anamnesi, l'esame obiettivo, la diagnosi, il giudizio clinico critico e l'insindacabile discrezionalità del medico chirurgo, unico responsabile dell'atto medico e della prescrizione. I calcolatori integrati (Cockcroft-Gault, Child-Pugh, calcolo ml/h e schemi di reversal) sono forniti "<em>così come sono</em>" (as is) senza garanzia di assoluta accuratezza o idoneità per un caso specifico. L'utilizzo dell'applicazione comporta la piena, informata e irrevocabile accettazione di tutte le clausole della presente nota legale.
              </p>
            </div>
          </div>

          {/* Dedica ad Alessia */}
          <div className="pt-2 pb-1 text-center">
            <div className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-linear-to-r from-rose-50 via-pink-50/70 to-rose-50 border border-rose-200/80 shadow-2xs">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs sm:text-sm font-medium text-slate-800">
                Applicazione dedicata ad <span className="font-semibold text-rose-700">Alessia</span>
              </span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* App Info Line */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">EmergenzFarmaco</span>
              <span aria-hidden="true">·</span>
              <span>Farmacologia Clinica d'Emergenza & Pronto Soccorso</span>
            </div>

            <p className="text-center sm:text-right">
              Linee guida di riferimento: ERC 2021/2025, ESC 2023/2024, Surviving Sepsis 2021/2024, KDIGO, ESO 2024, EAU 2024.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}

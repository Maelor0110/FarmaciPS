import React from 'react';
import { Search, X, RotateCcw, Stethoscope, Pill } from 'lucide-react';
import { ClinicalSetting, DrugClass, TherapeuticIndication } from '../types/pharmacy';

export interface SearchFilterState {
  query: string;
  setting?: ClinicalSetting | 'tutti';
  indication: TherapeuticIndication | 'tutte';
  drugClass: DrugClass | 'tutte';
  highAlertOnly: boolean;
  qtRiskOnly: boolean;
  renalAdjustmentOnly: boolean;
  pregnancyFilter: 'all' | 'safe' | 'contraindicated';
}

interface SearchBarProps {
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onReset: () => void;
  totalResults: number;
  allIndications: TherapeuticIndication[];
  allClasses: DrugClass[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  allIndications,
  allClasses,
}) => {
  const hasActiveFilters =
    filters.query !== '' ||
    filters.indication !== 'tutte' ||
    filters.drugClass !== 'tutte' ||
    filters.highAlertOnly ||
    filters.qtRiskOnly ||
    filters.renalAdjustmentOnly ||
    filters.pregnancyFilter !== 'all';

  const updateField = <K extends keyof SearchFilterState>(
    key: K,
    value: SearchFilterState[K]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Search Input Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={filters.query}
          onChange={(e) => updateField('query', e.target.value)}
          placeholder="Cerca per farmaco (es. Noradrenalina, Krenosin), nome commerciale, indicazione o meccanismo..."
          className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-lg text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
        />
        {filters.query && (
          <button
            onClick={() => updateField('query', '')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            title="Cancella ricerca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Structured Advanced Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Filter 1: Indicazione Terapeutica Specifica */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
            <span>Indicazione Terapeutica</span>
          </label>
          <select
            value={filters.indication}
            onChange={(e) =>
              updateField('indication', e.target.value as TherapeuticIndication | 'tutte')
            }
            aria-label="Indicazione Terapeutica"
            className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden"
          >
            <option value="tutte">Tutte le Indicazioni Cliniche</option>
            {allIndications.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 3: Classe Farmacologica */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
            <Pill className="w-3.5 h-3.5 text-slate-500" />
            <span>Classe Farmacologica</span>
          </label>
          <select
            value={filters.drugClass}
            onChange={(e) => updateField('drugClass', e.target.value as DrugClass | 'tutte')}
            aria-label="Classe Farmacologica"
            className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden"
          >
            <option value="tutte">Tutte le Classi Farmacologiche</option>
            {allClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Safety and Warning Quick Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-1">Filtri di Sicurezza:</span>
          
          <button
            type="button"
            onClick={() => updateField('highAlertOnly', !filters.highAlertOnly)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.highAlertOnly
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Farmaci High-Alert
          </button>

          <button
            type="button"
            onClick={() => updateField('qtRiskOnly', !filters.qtRiskOnly)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.qtRiskOnly
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Rischio QTc / TdP
          </button>

          <button
            type="button"
            onClick={() => updateField('renalAdjustmentOnly', !filters.renalAdjustmentOnly)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.renalAdjustmentOnly
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Aggiustamento Renale (CrCl &lt; 50)
          </button>

          <button
            type="button"
            onClick={() =>
              updateField(
                'pregnancyFilter',
                filters.pregnancyFilter === 'contraindicated' ? 'all' : 'contraindicated'
              )
            }
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.pregnancyFilter === 'contraindicated'
                ? 'bg-rose-100 text-rose-950 border border-rose-300 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Gravidanza: Controindicati
          </button>

          <button
            type="button"
            onClick={() =>
              updateField(
                'pregnancyFilter',
                filters.pregnancyFilter === 'safe' ? 'all' : 'safe'
              )
            }
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.pregnancyFilter === 'safe'
                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Gravidanza: Compatibili
          </button>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            <span className="font-semibold text-slate-900">{totalResults}</span> farmaci trovati
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Azzera Filtri</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

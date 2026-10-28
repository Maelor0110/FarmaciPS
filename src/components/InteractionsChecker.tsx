import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { EmergencyDrug } from '../types/pharmacy';
import { checkDrugInteractions, DetectedInteraction } from '../utils/clinicalCalculators';

interface InteractionsCheckerProps {
  selectedDrugIds: string[];
  allDrugs: EmergencyDrug[];
  onAddDrug: (drugId: string) => void;
  onRemoveDrug: (drugId: string) => void;
  onClearAll: () => void;
  onSelectDrug: (drug: EmergencyDrug) => void;
}

export const InteractionsChecker: React.FC<InteractionsCheckerProps> = ({
  selectedDrugIds,
  allDrugs,
  onAddDrug,
  onRemoveDrug,
  onClearAll,
  onSelectDrug,
}) => {
  const [candidateDrugId, setCandidateDrugId] = useState<string>('');

  const selectedDrugs = allDrugs.filter((d) => selectedDrugIds.includes(d.id));
  const availableToAdd = allDrugs.filter((d) => !selectedDrugIds.includes(d.id));

  const interactions: DetectedInteraction[] = checkDrugInteractions(
    selectedDrugIds,
    allDrugs
  );

  const contraindicatedCount = interactions.filter(
    (i) => i.severity === 'contraindicated'
  ).length;
  const majorCount = interactions.filter((i) => i.severity === 'major').length;
  const moderateCount = interactions.filter((i) => i.severity === 'moderate').length;

  const handleAdd = () => {
    if (!candidateDrugId) return;
    onAddDrug(candidateDrugId);
    setCandidateDrugId('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Verificatore Interazioni Multi-Farmaco d'Urgenza
              </h2>
              <p className="text-xs text-slate-500">
                Analisi istantanea delle interazioni farmacocinetiche e farmacodinamiche acute nel paziente critico
              </p>
            </div>
          </div>

          {selectedDrugs.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Svuota Terapia Paziente</span>
            </button>
          )}
        </div>

        {/* Drug Adder Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-slate-100">
          <div className="flex-1">
            <select
              value={candidateDrugId}
              onChange={(e) => setCandidateDrugId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden"
            >
              <option value="">-- Seleziona un farmaco da aggiungere alla terapia --</option>
              {availableToAdd.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.drugClass})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            disabled={!candidateDrugId}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Aggiungi Farmaco</span>
          </button>
        </div>

        {/* Active Drugs Selected Tray */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            Farmaci Attivi nel Paziente ({selectedDrugs.length}):
          </div>

          {selectedDrugs.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Nessun farmaco selezionato. Aggiungi 2 o più farmaci dal menu a tendina o clicca
              su "+ Interazioni" nelle schede del prontuario.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedDrugs.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-medium text-slate-800 transition-colors border border-slate-200"
                >
                  <button
                    onClick={() => onSelectDrug(d)}
                    className="hover:underline font-semibold"
                    title="Vedi scheda farmaco"
                  >
                    {d.name}
                  </button>
                  <button
                    onClick={() => onRemoveDrug(d.id)}
                    className="p-1 hover:text-rose-600 rounded text-slate-400"
                    title="Rimuovi"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Metrics Bar if drugs are present */}
      {selectedDrugs.length >= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase">
                Controindicazioni Assolute
              </div>
              <div className="text-2xl font-bold font-mono text-rose-600 tabular-nums">
                {contraindicatedCount}
              </div>
            </div>
            <AlertTriangle className="w-7 h-7 text-rose-500/30" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase">
                Interazioni Maggiori
              </div>
              <div className="text-2xl font-bold font-mono text-amber-600 tabular-nums">
                {majorCount}
              </div>
            </div>
            <AlertTriangle className="w-7 h-7 text-amber-500/30" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase">
                Interazioni Moderate
              </div>
              <div className="text-2xl font-bold font-mono text-blue-600 tabular-nums">
                {moderateCount}
              </div>
            </div>
            <Info className="w-7 h-7 text-blue-500/30" />
          </div>
        </div>
      )}

      {/* Interaction Report Cards */}
      {selectedDrugs.length < 2 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">
            Aggiungi almeno 2 farmaci per avviare il controllo automatico delle interazioni.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Il sistema verifica interazioni farmacodinamiche, sinergie di sedazione, allungamento
            del QTc e interferenze sul citocromo P450.
          </p>
        </div>
      ) : interactions.length === 0 ? (
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6 flex items-center gap-4 text-emerald-900">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h3 className="font-bold text-sm">Nessuna interazione critica nota rilevata</h3>
            <p className="text-xs text-emerald-800 mt-0.5">
              I farmaci selezionati ({selectedDrugs.map((d) => d.name).join(', ')}) non
              presentano note incompatibilità maggiori o controindicazioni dirette secondo le linee
              guida vigenti. Monitorare comunque parametri clinici e compatibilità fisica delle vie di infusione.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
            Interazioni Cliniche Identificate ({interactions.length})
          </h3>

          {interactions.map((inter, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-5 bg-white space-y-3 ${
                inter.severity === 'contraindicated'
                  ? 'border-rose-300 shadow-xs'
                  : inter.severity === 'major'
                  ? 'border-amber-300 shadow-xs'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <button
                    onClick={() => onSelectDrug(inter.drug1)}
                    className="hover:text-rose-600 underline decoration-slate-300 hover:decoration-rose-500"
                  >
                    {inter.drug1.name}
                  </button>
                  <span className="text-slate-400 font-normal">+</span>
                  <button
                    onClick={() => onSelectDrug(inter.drug2)}
                    className="hover:text-rose-600 underline decoration-slate-300 hover:decoration-rose-500"
                  >
                    {inter.drug2.name}
                  </button>
                </div>

                <span
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded ${
                    inter.severity === 'contraindicated'
                      ? 'bg-rose-100 text-rose-800'
                      : inter.severity === 'major'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  {inter.severity === 'contraindicated'
                    ? 'CONTROINDICAZIONE ASSOLUTA'
                    : inter.severity === 'major'
                    ? 'INTERAZIONE MAGGIORE'
                    : 'INTERAZIONE MODERATA'}
                </span>
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <div>
                  <strong className="text-slate-900 block mb-0.5">Meccanismo Farmacologico:</strong>
                  <p className="text-slate-600 leading-relaxed">{inter.mechanism}</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                  <strong className="text-slate-900 block mb-0.5">
                    Condotta Clinica & Raccomandazione Linee Guida:
                  </strong>
                  <p className="text-slate-800 leading-relaxed">{inter.clinicalAdvice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

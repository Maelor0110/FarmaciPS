import React, { useState } from 'react';
import { Calculator, X, Droplets, Layers, Syringe, AlertCircle, ArrowRight, Plus, Minus } from 'lucide-react';
import {
  calculateCockcroftGault,
  calculateChildPugh,
  calculateInfusionMlPerHour,
  ChildPughParams
} from '../utils/clinicalCalculators';
import { EmergencyDrug } from '../types/pharmacy';

interface CalculatorsModalProps {
  onClose: () => void;
  drugs: EmergencyDrug[];
  onSelectDrug: (drug: EmergencyDrug) => void;
}

export const CalculatorsModal: React.FC<CalculatorsModalProps> = ({
  onClose,
  drugs,
  onSelectDrug,
}) => {
  const [calcTab, setCalcTab] = useState<'renal' | 'infusion' | 'hepatic'>('renal');

  // 1. Renal state - string inputs with direct typing & auto-select
  const [ageStr, setAgeStr] = useState<string>('65');
  const [weightStr, setWeightStr] = useState<string>('75');
  const [creatinineStr, setCreatinineStr] = useState<string>('1.5');
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [selectedDrugForRenalId, setSelectedDrugForRenalId] = useState<string>('enoxaparina');

  // Parsed numerical values
  const age = parseFloat(ageStr) || 0;
  const weight = parseFloat(weightStr.replace(',', '.')) || 0;
  const creatinine = parseFloat(creatinineStr.replace(',', '.')) || 0;

  // 2. Infusion state - string inputs with direct typing & auto-select
  const [infusionDrugId, setInfusionDrugId] = useState<string>('noradrenalina');
  const [patientWeightStr, setPatientWeightStr] = useState<string>('70');
  const patientWeight = parseFloat(patientWeightStr.replace(',', '.')) || 0;

  const selectedInfusionDrug = drugs.find((d) => d.id === infusionDrugId) || drugs[0];
  const infusionConfig = selectedInfusionDrug?.dosages.find((d) => d.infusionRateCalc)?.infusionRateCalc || {
    defaultConcentrationMgPerMl: 0.08,
    defaultDilutionText: '4 mg in 50 ml (80 mcg/ml)',
    unit: 'mcg/kg/min' as const,
    minRate: 0.02,
    maxRate: 2.0,
    defaultRate: 0.1,
    step: 0.02,
  };

  const [targetDoseStr, setTargetDoseStr] = useState<string>(String(infusionConfig.defaultRate));
  const targetDose = parseFloat(targetDoseStr.replace(',', '.')) || 0;

  // 3. Child-Pugh state
  const [childPughParams, setChildPughParams] = useState<ChildPughParams>({
    encephalopathy: 1,
    ascites: 1,
    bilirubin: 1,
    albumin: 1,
    inr: 1,
  });

  // Calculations
  const crclResult = calculateCockcroftGault(age, weight, creatinine, isFemale);
  const selectedRenalDrug = drugs.find((d) => d.id === selectedDrugForRenalId);

  const calculatedMlPerHour = calculateInfusionMlPerHour(
    targetDose,
    infusionConfig.unit,
    infusionConfig.defaultConcentrationMgPerMl,
    patientWeight
  );

  const childPughResult = calculateChildPugh(childPughParams);

  // Stepper helper for Target Dose
  const adjustTargetDose = (delta: number) => {
    const current = parseFloat(targetDoseStr.replace(',', '.')) || 0;
    const step = infusionConfig.step || 0.01;
    const precision = step < 0.1 ? 2 : 1;
    const next = Math.max(
      infusionConfig.minRate,
      Math.min(infusionConfig.maxRate, Math.round((current + delta * step) * 100) / 100)
    );
    setTargetDoseStr(next.toFixed(precision));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 bg-linear-to-r from-slate-50 via-white to-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Calcolatori Clinici di Pronto Soccorso
              </h2>
              <p className="text-xs text-slate-500">
                Cockcroft-Gault con dosaggio renale · Pompe di Infusione Elettriche · Child-Pugh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Chiudi calcolatori"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modern Segmented Navigation Tabs */}
        <div className="p-3 border-b border-slate-200/70 bg-slate-50/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
            <button
              onClick={() => setCalcTab('renal')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                calcTab === 'renal'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Droplets className="w-4 h-4 text-rose-600" />
              <span>Clearance & Funzione Renale</span>
            </button>

            <button
              onClick={() => setCalcTab('infusion')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                calcTab === 'infusion'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Syringe className="w-4 h-4 text-rose-600" />
              <span>Pompe di Infusione (ml/h)</span>
            </button>

            <button
              onClick={() => setCalcTab('hepatic')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                calcTab === 'hepatic'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-rose-600" />
              <span>Score Epatopatia (Child-Pugh)</span>
            </button>
          </div>
        </div>

        {/* Body Stage */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          
          {/* TAB 1: COCKCROFT-GAULT & RENAL ADJUSTMENT */}
          {calcTab === 'renal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Inputs Column */}
                <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                      Parametri Paziente
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Digita direttamente il valore
                    </span>
                  </div>

                  {/* Età */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Età (anni)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={ageStr}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*$/.test(val)) setAgeStr(val);
                      }}
                      placeholder="es. 65"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl font-mono font-medium text-slate-900 outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  {/* Peso */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Peso Corporeo (kg)
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={weightStr}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*([.,]\d*)?$/.test(val)) setWeightStr(val);
                      }}
                      placeholder="es. 75"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl font-mono font-medium text-slate-900 outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  {/* Creatinina */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Creatinina (mg/dL)
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={creatinineStr}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*([.,]\d*)?$/.test(val)) setCreatinineStr(val);
                      }}
                      placeholder="es. 1.5"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl font-mono font-medium text-slate-900 outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  {/* Sesso Biologico */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Sesso Biologico
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFemale(false)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                          !isFemale
                            ? 'bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-500/20 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Maschio (1.00)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFemale(true)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                          isFemale
                            ? 'bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-500/20 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Femmina (× 0.85)
                      </button>
                    </div>
                  </div>

                  {/* Select Farmaco */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Verifica dosaggio per farmaco specifico:
                    </label>
                    <select
                      value={selectedDrugForRenalId}
                      onChange={(e) => setSelectedDrugForRenalId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      {drugs.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.drugClass})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Result Column */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Risultato Cockcroft-Gault
                    </h3>

                    {/* Cockcroft Result Display */}
                    <div className="p-4 rounded-xl bg-slate-900 text-white mb-4 shadow-sm">
                      <div className="text-[11px] text-slate-400 font-mono uppercase mb-0.5">
                        Clearance Creatinina Calcolata
                      </div>
                      <div className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight">
                        {crclResult.crcl > 0 ? crclResult.crcl : '--'}{' '}
                        <span className="text-sm font-normal text-slate-400">ml/min</span>
                      </div>
                      <div className="mt-2 font-medium text-xs text-rose-300">
                        {crclResult.stageLabel}
                      </div>
                    </div>

                    {selectedRenalDrug && (
                      <div className="border border-rose-200 bg-rose-50/40 rounded-xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-950">
                            {selectedRenalDrug.name}
                          </span>
                          {selectedRenalDrug.renalAdjustment.nephrotoxicRisk && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono bg-rose-200 text-rose-900 rounded font-semibold">
                              Nefrotossico
                            </span>
                          )}
                        </div>

                        <div>
                          <strong className="text-slate-800 block mb-0.5">
                            Indicazione di dosaggio per questo stadio renale:
                          </strong>
                          <p className="text-slate-800 leading-relaxed font-mono text-[11px] bg-white p-2.5 rounded-lg border border-rose-200">
                            {selectedRenalDrug.renalAdjustment[crclResult.recommendationKey]}
                          </p>
                        </div>

                        {selectedRenalDrug.renalAdjustment.notes && (
                          <p className="text-slate-500 italic text-[11px]">
                            {selectedRenalDrug.renalAdjustment.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedRenalDrug && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectDrug(selectedRenalDrug);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      <span>Apri Scheda Completa di {selectedRenalDrug.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CALCOLATORE POMPE DI INFUSIONE */}
          {calcTab === 'infusion' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Infusion Settings */}
                <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                      Parametri Infusione Pompa Elettrica
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Titolazione ml/h
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Farmaco Vasoattivo / Sedativo Titolabile
                    </label>
                    <select
                      value={infusionDrugId}
                      onChange={(e) => {
                        setInfusionDrugId(e.target.value);
                        const found = drugs.find((d) => d.id === e.target.value);
                        const c = found?.dosages.find((d) => d.infusionRateCalc)?.infusionRateCalc;
                        if (c) setTargetDoseStr(String(c.defaultRate));
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      {drugs
                        .filter((d) => d.dosages.some((dose) => dose.infusionRateCalc))
                        .map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.drugClass})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs shadow-2xs">
                    <span className="font-semibold text-slate-700 block mb-1">
                      Diluizione Standard Ospedaliera in Pompa Siringa (50 ml):
                    </span>
                    <span className="font-mono text-slate-900 font-bold">
                      {infusionConfig.defaultDilutionText}
                    </span>
                  </div>

                  {/* Peso Paziente */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Peso Paziente (kg)
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={patientWeightStr}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*([.,]\d*)?$/.test(val)) setPatientWeightStr(val);
                      }}
                      placeholder="es. 70"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl font-mono text-slate-900 outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  {/* Dose Target con Stepper +/- e digitazione diretta */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Dose Target ({infusionConfig.unit})
                      </label>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustTargetDose(-1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer shadow-2xs"
                          title="Diminuisci dose"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustTargetDose(1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer shadow-2xs"
                          title="Aumenta dose"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={targetDoseStr}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*([.,]\d*)?$/.test(val)) setTargetDoseStr(val);
                      }}
                      placeholder={`es. ${infusionConfig.defaultRate}`}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl font-mono font-bold text-slate-900 outline-hidden transition-all shadow-2xs"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>Min: {infusionConfig.minRate} {infusionConfig.unit}</span>
                      <span>Max: {infusionConfig.maxRate} {infusionConfig.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Speed Result Card */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Velocità di Infusione Pompa Siringa
                    </h3>

                    <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md text-center">
                      <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                        Impostazione Pompa Elettrica
                      </div>
                      <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tabular-nums tracking-tight">
                        {calculatedMlPerHour}{' '}
                        <span className="text-lg font-normal text-slate-400">ml/h</span>
                      </div>
                      <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold">
                        {targetDose} {infusionConfig.unit} su {patientWeight} kg
                      </div>
                    </div>

                    <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Regole di Sicurezza Somministrazione</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Verificare sempre la compatibilità in Y della linea infusiva. Nel caso di
                        Noradrenalina e Adrenalina preferire l'infusione via CVC; se periferica
                        usare vena di grosso calibro ed evitare prolunghe a basso flusso.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectDrug(selectedInfusionDrug);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Vedi dosaggi e compatibilità di {selectedInfusionDrug.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCORE CHILD-PUGH */}
          {calcTab === 'hepatic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Inputs */}
                <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-3.5 text-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-2">
                    Criteri di Punteggio Child-Pugh
                  </h3>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Encefalopatia Porto-Sistemica
                    </label>
                    <select
                      value={childPughParams.encephalopathy}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          encephalopathy: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      <option value="1">Nessuna (1 punto)</option>
                      <option value="2">Grado 1 - 2 (Confusione lieve, asterixis) (2 punti)</option>
                      <option value="3">Grado 3 - 4 (Stupor grave o Coma) (3 punti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Ascite
                    </label>
                    <select
                      value={childPughParams.ascites}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          ascites: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      <option value="1">Assente (1 punto)</option>
                      <option value="2">Lieve / Moderata (controllata da diuretici) (2 punti)</option>
                      <option value="3">Severa / Tesa o refrattaria (3 punti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Bilirubina Totale (mg/dL)
                    </label>
                    <select
                      value={childPughParams.bilirubin}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          bilirubin: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      <option value="1">&lt; 2.0 mg/dL (1 punto)</option>
                      <option value="2">2.0 – 3.0 mg/dL (2 punti)</option>
                      <option value="3">&gt; 3.0 mg/dL (3 punti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Albumina (g/dL)
                    </label>
                    <select
                      value={childPughParams.albumin}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          albumin: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      <option value="1">&gt; 3.5 g/dL (1 punto)</option>
                      <option value="2">2.8 – 3.5 g/dL (2 punti)</option>
                      <option value="3">&lt; 2.8 g/dL (3 punti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      INR (Tempo di Protrombina)
                    </label>
                    <select
                      value={childPughParams.inr}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          inr: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                    >
                      <option value="1">&lt; 1.7 (1 punto)</option>
                      <option value="2">1.7 – 2.3 (2 punti)</option>
                      <option value="3">&gt; 2.3 (3 punti)</option>
                    </select>
                  </div>
                </div>

                {/* Result */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Classificazione Funzionale Epatica
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-900 text-white mb-4 shadow-sm">
                      <div className="text-xs text-slate-400 font-mono uppercase mb-0.5">
                        Punteggio Totale Score
                      </div>
                      <div className="text-4xl font-extrabold font-mono text-white tabular-nums">
                        {childPughResult.score}{' '}
                        <span className="text-sm font-normal text-slate-400">/ 15 punti</span>
                      </div>
                      <div className="mt-2 text-sm font-bold text-rose-300">
                        Classe Child-Pugh {childPughResult.classGrade}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
                      {childPughResult.description}
                    </p>

                    <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <span className="font-bold block">Attenzione Farmacologica:</span>
                      <p className="text-[11px] leading-relaxed">
                        I pazienti in Classe B e C presentano marcata riduzione dell'attività dei
                        citocromi epatici (CYP450) e ridotta sintesi di albumina e fattori della
                        coagulazione. Evitare sedativi pesanti a lunga emivita e titolare con dosi
                        dimezzate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
          >
            Chiudi Calcolatori
          </button>
        </div>
      </div>
    </div>
  );
};

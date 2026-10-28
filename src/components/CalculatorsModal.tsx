import React, { useState } from 'react';
import { Calculator, X, Droplets, Layers, Syringe, AlertCircle, ArrowRight } from 'lucide-react';
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

  // 1. Renal state
  const [age, setAge] = useState<number>(65);
  const [weight, setWeight] = useState<number>(75);
  const [creatinine, setCreatinine] = useState<number>(1.5);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [selectedDrugForRenalId, setSelectedDrugForRenalId] = useState<string>('enoxaparina');

  // 2. Infusion state
  const [infusionDrugId, setInfusionDrugId] = useState<string>('noradrenalina');
  const [patientWeight, setPatientWeight] = useState<number>(70);
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
  const [targetDose, setTargetDose] = useState<number>(infusionConfig.defaultRate);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Calcolatori Clinici d'Emergenza
              </h2>
              <p className="text-xs text-slate-500">
                Clearance Creatinina (Cockcroft-Gault), Pompe Siringa e Score Child-Pugh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white">
          <button
            onClick={() => setCalcTab('renal')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              calcTab === 'renal'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Clearance Creatinina & Aggiustamento</span>
          </button>

          <button
            onClick={() => setCalcTab('infusion')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              calcTab === 'infusion'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Syringe className="w-4 h-4" />
            <span>Calcolatore Pompe di Infusione (ml/h)</span>
          </button>

          <button
            onClick={() => setCalcTab('hepatic')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              calcTab === 'hepatic'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Score Child-Pugh (Funzionalità Epatica)</span>
          </button>
        </div>

        {/* Body Stage */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          
          {/* TAB 1: COCKCROFT-GAULT & RENAL ADJUSTMENT */}
          {calcTab === 'renal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Column */}
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                    Parametri Paziente
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Età (anni)
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="115"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Peso Corporeo (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="250"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Creatinina Serica (mg/dL)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.2"
                        max="20"
                        value={creatinine}
                        onChange={(e) => setCreatinine(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Sesso Biologico
                      </label>
                      <select
                        value={isFemale ? 'F' : 'M'}
                        onChange={(e) => setIsFemale(e.target.value === 'F')}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-medium"
                      >
                        <option value="M">Maschio</option>
                        <option value="F">Femmina (* 0.85)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Verifica dosaggio per farmaco specifico:
                    </label>
                    <select
                      value={selectedDrugForRenalId}
                      onChange={(e) => setSelectedDrugForRenalId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-medium"
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
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Risultato Cockcroft-Gault
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                      <div className="text-xs text-slate-500 font-mono uppercase mb-0.5">
                        Clearance Creatinina Calcolata
                      </div>
                      <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                        {crclResult.crcl}{' '}
                        <span className="text-sm font-normal text-slate-500">ml/min</span>
                      </div>
                      <div className="mt-1 font-semibold text-xs text-slate-700">
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
                          <p className="text-slate-700 leading-relaxed font-mono text-[11px] bg-white p-2 rounded border border-rose-100">
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
                      className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Infusion Settings */}
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                    Parametri Infusione Farmaco Titolabile
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Farmaco Vasoattivo / Sedativo
                    </label>
                    <select
                      value={infusionDrugId}
                      onChange={(e) => {
                        setInfusionDrugId(e.target.value);
                        const found = drugs.find((d) => d.id === e.target.value);
                        const c = found?.dosages.find((d) => d.infusionRateCalc)?.infusionRateCalc;
                        if (c) setTargetDose(c.defaultRate);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-medium"
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

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700 block mb-1">
                      Diluizione Standard Ospedaliera:
                    </span>
                    <span className="font-mono text-slate-900 font-bold">
                      {infusionConfig.defaultDilutionText}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Peso Paziente (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="220"
                        value={patientWeight}
                        onChange={(e) => setPatientWeight(Number(e.target.value) || 70)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Dose Target ({infusionConfig.unit})
                      </label>
                      <input
                        type="number"
                        step={infusionConfig.step}
                        min={infusionConfig.minRate}
                        max={infusionConfig.maxRate}
                        value={targetDose}
                        onChange={(e) => setTargetDose(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Speed Result Card */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Velocità di Infusione Pompa Siringa
                    </h3>

                    <div className="p-5 rounded-xl bg-slate-900 text-white shadow-md text-center">
                      <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                        Impostazione Pompa Elettrica
                      </div>
                      <div className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight">
                        {calculatedMlPerHour}{' '}
                        <span className="text-lg font-normal text-slate-400">ml/h</span>
                      </div>
                      <div className="mt-2 text-xs font-mono text-emerald-400">
                        {targetDose} {infusionConfig.unit} su {patientWeight} kg
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
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
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-3 text-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-2">
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
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
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
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
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
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="1">&lt; 2.0 mg/dL (1 punto)</option>
                      <option value="2">2.0 – 3.0 mg/dL (2 punti)</option>
                      <option value="3">&gt; 3.0 mg/dL (3 punti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Albumina Sierica (g/dL)
                    </label>
                    <select
                      value={childPughParams.albumin}
                      onChange={(e) =>
                        setChildPughParams({
                          ...childPughParams,
                          albumin: Number(e.target.value) as 1 | 2 | 3,
                        })
                      }
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
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
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="1">&lt; 1.7 (1 punto)</option>
                      <option value="2">1.7 – 2.3 (2 punti)</option>
                      <option value="3">&gt; 2.3 (3 punti)</option>
                    </select>
                  </div>
                </div>

                {/* Result */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Classificazione Funzionale Epatica
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                      <div className="text-xs text-slate-500 font-mono uppercase mb-0.5">
                        Punteggio Totale Score
                      </div>
                      <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                        {childPughResult.score}{' '}
                        <span className="text-base font-normal text-slate-500">/ 15 punti</span>
                      </div>
                      <div className="mt-2 text-sm font-bold text-rose-600">
                        Classe Child-Pugh {childPughResult.classGrade}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-100 p-3 rounded-lg">
                      {childPughResult.description}
                    </p>

                    <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
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
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Chiudi Calcolatori
          </button>
        </div>
      </div>
    </div>
  );
};

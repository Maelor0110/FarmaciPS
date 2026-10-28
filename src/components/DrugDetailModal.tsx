import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  FileText,
  Activity,
  Heart,
  Syringe,
  ShieldAlert,
  ArrowRight,
  Plus,
  Check,
  Calculator,
  Printer,
  Sparkles,
  Info,
  Clock,
  Droplets,
  Layers,
  Baby,
  AlertCircle
} from 'lucide-react';
import { EmergencyDrug } from '../types/pharmacy';
import { calculateCockcroftGault, calculateInfusionMlPerHour } from '../utils/clinicalCalculators';

interface DrugDetailModalProps {
  drug: EmergencyDrug;
  onClose: () => void;
  isInInteractionsCart: boolean;
  onToggleInteractionsCart: (drug: EmergencyDrug) => void;
  onOpenInteractionChecker?: () => void;
  onOpenAnticoagReversal?: () => void;
}

type TabType = 'dosages' | 'guidelines' | 'renal' | 'hepatic' | 'safety' | 'pregnancy' | 'interactions';

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({
  drug,
  onClose,
  isInInteractionsCart,
  onToggleInteractionsCart,
  onOpenInteractionChecker,
  onOpenAnticoagReversal,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dosages');

  // Quick renal calculator state inside modal
  const [calcAge, setCalcAge] = useState<number>(68);
  const [calcWeight, setCalcWeight] = useState<number>(75);
  const [calcCreatinine, setCalcCreatinine] = useState<number>(1.4);
  const [calcIsFemale, setCalcIsFemale] = useState<boolean>(false);

  // Quick infusion pump calculator state
  const defaultDosage = drug.dosages.find((d) => d.infusionRateCalc) || drug.dosages[0];
  const infusionConfig = defaultDosage?.infusionRateCalc;
  const [infusionPatientWeight, setInfusionPatientWeight] = useState<number>(70);
  const [infusionTargetDose, setInfusionTargetDose] = useState<number>(
    infusionConfig ? infusionConfig.defaultRate : 0.1
  );

  const crclCalcResult = calculateCockcroftGault(
    calcAge,
    calcWeight,
    calcCreatinine,
    calcIsFemale
  );

  const calculatedMlPerHour = infusionConfig
    ? calculateInfusionMlPerHour(
        infusionTargetDose,
        infusionConfig.unit,
        infusionConfig.defaultConcentrationMgPerMl,
        infusionPatientWeight
      )
    : 0;

  const hasQTc = drug.warnings.some((w) => w.isQTC);
  const requiresCVC = drug.warnings.some((w) => w.requiresCVC);
  const hasExtravasation = drug.warnings.some((w) => w.extravasationRisk);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">{drug.drugClass}</span>
              <span aria-hidden="true">·</span>
              <span>
                {drug.clinicalSetting === 'ps'
                  ? 'Pronto Soccorso / OBI'
                  : drug.clinicalSetting === 'reparto'
                  ? 'Reparto Medicina d\'Urgenza'
                  : 'Pronto Soccorso & Reparto'}
              </span>
              {drug.isHighAlert && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> FARMACEUTICO AD ALTO RISCHIO
                  </span>
                </>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {drug.name}
            </h2>
            {drug.brandNames.length > 0 && (
              <p className="text-xs text-slate-600 italic mt-0.5">
                Nomi commerciali in Italia: {drug.brandNames.join(', ')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              title="Stampa scheda clinica"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Chiudi scheda"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>



        {/* Reversal Protocol Jump Banner for Anticoagulants and Reversal Agents */}
        {(drug.emergencyIndications.includes('Emorragia & Inversione Anticoagulanti') ||
          drug.drugClass === 'Antiaggreganti & Anticoagulanti' ||
          drug.id === '4f-pcc' ||
          drug.id === 'idarucizumab' ||
          drug.id === 'vitamina-k1' ||
          drug.id === 'protamina-solfato') &&
          onOpenAnticoagReversal && (
            <div className="bg-rose-50/80 border-b border-rose-200 px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-rose-900">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>Protocollo Emostatico d'Urgenza:</strong> Gestione Sanguinamenti Acuti & Manovre Invasive in corso di {drug.name}.
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenAnticoagReversal}
                className="px-2.5 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
              >
                Apri Calcolatore Reverse &rarr;
              </button>
            </div>
          )}

        {/* Pregnancy Alert Banner for Contraindicated or High Risk */}
        {drug.pregnancy && (drug.pregnancy.riskLevel === 'contraindicated' || drug.pregnancy.riskLevel === 'high_risk') && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-rose-950">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>ALERT GRAVIDANZA (Cat. {drug.pregnancy.fdaCategory}):</strong>{' '}
                <span className="font-semibold">
                  {drug.pregnancy.riskLevel === 'contraindicated'
                    ? 'CONTROINDICATO ASSOLUTO'
                    : 'ALTO RISCHIO FETALE'}
                </span>{' '}
                — {drug.pregnancy.clinicalSummary}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('pregnancy')}
              className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-100 border border-rose-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              Scheda Gravidanza &rarr;
            </button>
          </div>
        )}

        {/* Tab Navigation Controls */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('dosages')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'dosages'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>Dosaggi & Diluizioni</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'guidelines'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Indicazioni & Linee Guida</span>
          </button>

          <button
            onClick={() => setActiveTab('renal')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'renal'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Aggiustamento Renale</span>
          </button>

          <button
            onClick={() => setActiveTab('hepatic')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'hepatic'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Aggiustamento Epatico</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'safety'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Warning & Monitoraggio</span>
          </button>

          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pregnancy'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            <span>Gravidanza & Allattamento</span>
            {drug.pregnancy.riskLevel === 'contraindicated' && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white text-[10px] rounded font-bold">X</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('interactions')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'interactions'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interazioni ({drug.interactions.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Content Stage */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          
          {/* TAB 1: DOSAGGI & DILUIZIONI */}
          {activeTab === 'dosages' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
                  Meccanismo d'Azione Rapido
                </h4>
                <p className="text-xs leading-relaxed text-slate-800">
                  {drug.mechanismOfAction}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-rose-600" />
                  <span>Schemi di Dosaggio per Indicazione d'Emergenza</span>
                </h4>

                {drug.dosages.map((dose, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <h5 className="font-bold text-slate-900 text-sm">{dose.indication}</h5>
                      <div className="flex items-center gap-2">
                        {dose.route.map((r, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-700 rounded"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {dose.bolusDose && (
                        <div className="bg-slate-50 rounded-lg p-3">
                          <span className="font-semibold text-slate-800 block mb-1">
                            Bolo / Dose di Carico:
                          </span>
                          <span className="text-slate-700 leading-relaxed font-mono">
                            {dose.bolusDose}
                          </span>
                        </div>
                      )}

                      {dose.maintenanceDose && (
                        <div className="bg-slate-50 rounded-lg p-3">
                          <span className="font-semibold text-slate-800 block mb-1">
                            Mantenimento / Infusione Continua:
                          </span>
                          <span className="text-slate-700 leading-relaxed font-mono">
                            {dose.maintenanceDose}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs bg-rose-50/50 border border-rose-100 rounded-lg p-3">
                      <span className="font-semibold text-rose-950 block mb-1">
                        Allestimento e Diluizione Pratica in PS/Reparto:
                      </span>
                      <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                        {dose.preparation}
                      </p>
                    </div>

                    {dose.clinicalTips && (
                      <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1">
                        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-medium text-slate-700">Perla Clinica:</strong>{' '}
                          {dose.clinicalTips}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Infusion Pump Titrator if drug is continuous infusion */}
              {infusionConfig && (
                <div className="mt-6 border-2 border-slate-200 bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-rose-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                        Calcolatore Rapido Pompa Siringa (ml/h)
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {infusionConfig.defaultDilutionText}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Peso Paziente (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="200"
                        value={infusionPatientWeight}
                        onChange={(e) => setInfusionPatientWeight(Number(e.target.value) || 70)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Dose Target ({infusionConfig.unit})
                      </label>
                      <input
                        type="number"
                        step={infusionConfig.step}
                        min={infusionConfig.minRate}
                        max={infusionConfig.maxRate}
                        value={infusionTargetDose}
                        onChange={(e) => setInfusionTargetDose(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono"
                      />
                    </div>

                    <div className="bg-white rounded border border-rose-200 p-2.5 flex flex-col justify-center">
                      <span className="text-[10px] font-mono uppercase text-slate-500">
                        Velocità Pompa Infusione
                      </span>
                      <span className="text-xl font-bold font-mono text-rose-600 tabular-nums">
                        {calculatedMlPerHour} <span className="text-xs font-normal text-slate-600">ml/h</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Range terapeutico raccomandato: {infusionConfig.minRate} – {infusionConfig.maxRate}{' '}
                    {infusionConfig.unit}. Verificare sempre la concentrazione allestita in siringa.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INDICAZIONI & LINEE GUIDA */}
          {activeTab === 'guidelines' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Indicazioni Terapeutiche da Ultime Linee Guida
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {drug.emergencyIndications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Raccomandazioni Ufficiali delle Società Scientifiche
                </h4>

                {drug.guidelines.map((guide, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs font-mono">
                        {guide.society}
                      </span>
                      {guide.evidenceLevel && (
                        <span className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                          {guide.evidenceLevel}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {guide.keyRecommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AGGIUSTAMENTO RENALE */}
          {activeTab === 'renal' && (
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                    Adattamento Posologico Funzione Renale
                  </h4>
                  {drug.renalAdjustment.nephrotoxicRisk && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Rischio Nefrotossico Diretto
                    </span>
                  )}
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800 sm:w-1/3">
                      CrCl &gt; 50 ml/min (Normale/Lieve):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.renalAdjustment.crclNormal}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/40">
                    <span className="font-semibold text-slate-800 sm:w-1/3">
                      CrCl 30 - 50 ml/min (Moderata):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.renalAdjustment.crclModerate}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/30">
                    <span className="font-semibold text-amber-900 sm:w-1/3">
                      CrCl 10 - 29 ml/min (Severa):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.renalAdjustment.crclSevere}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-rose-50/30">
                    <span className="font-semibold text-rose-900 sm:w-1/3">
                      CrCl &lt; 10 ml/min o Emodialisi:
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.renalAdjustment.dialysis}
                    </span>
                  </div>
                </div>

                {drug.renalAdjustment.notes && (
                  <div className="bg-slate-50 p-3 text-xs text-slate-600 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Note farmacocinetiche renali:</span>{' '}
                    {drug.renalAdjustment.notes}
                  </div>
                )}
              </div>

              {/* Integrated Cockcroft-Gault Calculator */}
              <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono">
                    Calcolatore Rapido Clearance Creatinina (Cockcroft-Gault)
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Età (anni)
                    </label>
                    <input
                      type="number"
                      value={calcAge}
                      onChange={(e) => setCalcAge(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Peso Corporeo (kg)
                    </label>
                    <input
                      type="number"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Creatinina (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={calcCreatinine}
                      onChange={(e) => setCalcCreatinine(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Sesso Biologico
                    </label>
                    <select
                      value={calcIsFemale ? 'F' : 'M'}
                      onChange={(e) => setCalcIsFemale(e.target.value === 'F')}
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                    >
                      <option value="M">Maschio</option>
                      <option value="F">Femmina (*0.85)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-blue-200 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">
                      Clearance Stimata:
                    </div>
                    <div className="text-xl font-bold font-mono text-blue-900 tabular-nums">
                      {crclCalcResult.crcl}{' '}
                      <span className="text-xs font-normal text-slate-600">ml/min</span>
                    </div>
                    <div className="text-xs font-medium text-slate-700">
                      {crclCalcResult.stageLabel}
                    </div>
                  </div>

                  <div className="text-right max-w-xs">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                      Raccomandazione per questo paziente:
                    </span>
                    <span className="text-xs text-rose-700 font-medium">
                      {drug.renalAdjustment[crclCalcResult.recommendationKey]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGGIUSTAMENTO EPATICO */}
          {activeTab === 'hepatic' && (
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                    Adattamento Posologico Funzione Epatica (Child-Pugh)
                  </h4>
                  {drug.hepaticAdjustment.hepatotoxicRisk && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Rischio Epatotossico / Monitorare Transaminasi
                    </span>
                  )}
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800 sm:w-1/3">
                      Child-Pugh A (Lieve / Compensata):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.hepaticAdjustment.childPughA}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/40">
                    <span className="font-semibold text-slate-800 sm:w-1/3">
                      Child-Pugh B (Moderata):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.hepaticAdjustment.childPughB}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/30">
                    <span className="font-semibold text-amber-900 sm:w-1/3">
                      Child-Pugh C (Severa / Scompensata):
                    </span>
                    <span className="text-slate-700 sm:w-2/3">
                      {drug.hepaticAdjustment.childPughC}
                    </span>
                  </div>
                </div>

                {drug.hepaticAdjustment.notes && (
                  <div className="bg-slate-50 p-3 text-xs text-slate-600 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Note cliniche:</span>{' '}
                    {drug.hepaticAdjustment.notes}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: WARNING & MONITORAGGIO */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Avvertenze Critiche e Warning di Sicurezza</span>
                </h4>

                {drug.warnings.map((warn, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-xl p-4 space-y-1.5 ${
                      warn.severity === 'black_box'
                        ? 'border-rose-300 bg-rose-50/60'
                        : warn.severity === 'high'
                        ? 'border-amber-300 bg-amber-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 shrink-0 ${
                          warn.severity === 'black_box'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}
                      />
                      <h5
                        className={`text-xs font-bold ${
                          warn.severity === 'black_box'
                            ? 'text-rose-950 uppercase font-mono'
                            : 'text-amber-950 font-semibold'
                        }`}
                      >
                        {warn.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-6">
                      {warn.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Clinical Monitoring Requirements */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-600" />
                  <span>Monitoraggio Clinico e Strumentale Richiesto</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {drug.monitoring.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Antidote Banner if available */}
              {drug.antidote && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Antidoto Specifico Reperibile:</strong>
                    <span>{drug.antidote}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: GRAVIDANZA & ALLATTAMENTO */}
          {activeTab === 'pregnancy' && (
            <div className="space-y-6">
              {/* Main Risk Status Card */}
              <div
                className={`border rounded-2xl p-5 ${
                  drug.pregnancy.riskLevel === 'contraindicated'
                    ? 'border-rose-300 bg-rose-50/80'
                    : drug.pregnancy.riskLevel === 'high_risk'
                    ? 'border-orange-300 bg-orange-50/80'
                    : drug.pregnancy.riskLevel === 'caution'
                    ? 'border-amber-200 bg-amber-50/60'
                    : 'border-emerald-200 bg-emerald-50/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    {drug.pregnancy.riskLevel === 'contraindicated' ? (
                      <ShieldAlert className="w-6 h-6 text-rose-700 shrink-0" />
                    ) : drug.pregnancy.riskLevel === 'high_risk' ? (
                      <AlertTriangle className="w-6 h-6 text-orange-700 shrink-0" />
                    ) : drug.pregnancy.riskLevel === 'caution' ? (
                      <AlertCircle className="w-6 h-6 text-amber-700 shrink-0" />
                    ) : (
                      <Check className="w-6 h-6 text-emerald-700 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {drug.pregnancy.riskLevel === 'contraindicated'
                          ? 'CONTROINDICATO IN GRAVIDANZA (Rischio Teratogeno / Fetotossico Grave)'
                          : drug.pregnancy.riskLevel === 'high_risk'
                          ? 'ALTO RISCHIO FETALE (Riservato a Emergenze Vitali Materne Refrattarie)'
                          : drug.pregnancy.riskLevel === 'caution'
                          ? 'CAUTELA — Valutazione Rapporto Rischio/Beneficio'
                          : 'COMPATIBILE & PRIMA LINEA IN GRAVIDANZA'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Classificazione di sicurezza in Medicina d'Urgenza e Terapia Intensiva (ACOG / ESC / FDA)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-white border border-slate-300 shadow-2xs">
                      Categoria FDA: <span className="text-rose-700 text-sm">{drug.pregnancy.fdaCategory}</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-4 border border-slate-200/80 shadow-2xs">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                    <span>Sintesi Clinica & Raccomandazioni di Emergenza</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {drug.pregnancy.clinicalSummary}
                  </p>
                </div>
              </div>

              {/* Grid: Trimester Notes + Lactation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trimester Notes */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span>Trimestri & Gestione Ostetrica</span>
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {drug.pregnancy.trimesterNotes ||
                      'Valutabile in tutti i trimestri in base all\'indicazione clinica d\'urgenza.'}
                  </p>
                </div>

                {/* Lactation & Puerperium */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <span>Allattamento & Puerperio</span>
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {drug.pregnancy.lactation}
                  </p>
                </div>
              </div>

              {/* Safe Alternatives if available */}
              {drug.pregnancy.safeAlternatives && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider font-mono text-emerald-900 mb-1">
                      Alternative Terapeutiche Sicure Raccomandate in Gravidanza:
                    </h5>
                    <p className="leading-relaxed">
                      {drug.pregnancy.safeAlternatives}
                    </p>
                  </div>
                </div>
              )}

              {/* General Emergency Care Clinical Rule */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-800 block">
                  Principio Generale di Terapia in Emergenza-Urgenza Materno-Fetale:
                </span>
                <p className="leading-relaxed">
                  In caso di arresto cardiaco, shock distributivo/settico grave, anafilassi acuta severa o stato epilettico, il trattamento rianimatorio tempestivo della madre (ABCDE) è SEMPRE prioritario e costituisce il miglior presidio salvavita per il feto. Non ritardare mai farmaci salvavita essenziali (es. Adrenalina, Noradrenalina, Magnesio Solfato, Lorazepam).
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: INTERAZIONI FARMACOLOGICHE */}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Interazioni Farmacologiche d'Urgenza Note
                </h4>
                {onOpenInteractionChecker && (
                  <button
                    onClick={onOpenInteractionChecker}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <span>Apri Verificatore Multi-Farmaco</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {drug.interactions.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Nessuna interazione critica specifica registrata per questo principio attivo.
                </p>
              ) : (
                <div className="space-y-3">
                  {drug.interactions.map((inter, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">
                          {inter.interactingDrug}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-mono font-semibold rounded ${
                            inter.severity === 'contraindicated'
                              ? 'bg-rose-100 text-rose-800'
                              : inter.severity === 'major'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {inter.severity === 'contraindicated'
                            ? 'Controindicato'
                            : inter.severity === 'major'
                            ? 'Maggiore'
                            : 'Moderato'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        <strong className="text-slate-700 font-medium">Meccanismo:</strong>{' '}
                        {inter.mechanism}
                      </p>

                      <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded">
                        <strong className="text-slate-900 font-medium">Consiglio Clinico:</strong>{' '}
                        {inter.clinicalAdvice}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleInteractionsCart(drug)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isInInteractionsCart
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {isInInteractionsCart ? (
              <>
                <Check className="w-4 h-4 text-amber-700" />
                <span>Presente in Verifica Interazioni</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-slate-600" />
                <span>Aggiungi a Verifica Interazioni</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Chiudi Scheda
          </button>
        </div>
      </div>
    </div>
  );
};

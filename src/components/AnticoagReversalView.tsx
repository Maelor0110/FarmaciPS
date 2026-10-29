import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Activity,
  Layers,
  ArrowRight,
  Info,
  Scale,
  Zap,
  Download,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  Pill,
  Droplet
} from 'lucide-react';
import {
  AnticoagulantType,
  ClinicalScenario,
  BleedingSeverity,
  SurgeryUrgency,
  ProcedureBleedingRisk,
  calculateReversalProtocol,
  PatientParameters,
  ReversalCalculationResult
} from '../utils/anticoagReversalEngine';
import {
  PROTOCOL_METADATA,
  HIGH_THROMBOEMBOLIC_RISK_CONDITIONS,
  CUTOFF_REFERENCES,
  BLEEDING_SEVERITY_CRITERIA,
  SURGERY_TIMING_AND_RISK,
  LAB_ROUTINE_INSTRUCTIONS
} from '../data/anticoagReversalData';
import { EmergencyDrug } from '../types/pharmacy';

interface AnticoagReversalViewProps {
  allDrugs: EmergencyDrug[];
  onSelectDrugById: (id: string) => void;
}

export const AnticoagReversalView: React.FC<AnticoagReversalViewProps> = ({
  allDrugs,
  onSelectDrugById,
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'algorithms' | 'cutoffs' | 'document'>(
    'calculator'
  );

  // Form State for Reversal Decision Support
  const [scenario, setScenario] = useState<ClinicalScenario>('bleeding');
  const [anticoagulant, setAnticoagulant] = useState<AnticoagulantType>('warfarin_aceno');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [weightStr, setWeightStr] = useState<string>('75');
  const [bleedingSeverity, setBleedingSeverity] = useState<BleedingSeverity>('major_ich');
  const [urgencyTiming, setUrgencyTiming] = useState<SurgeryUrgency>('emergency');
  const [procedureRisk, setProcedureRisk] = useState<ProcedureBleedingRisk>('high');
  const [inrValue, setInrValue] = useState<number>(4.2);
  const [inrStr, setInrStr] = useState<string>('4.2');
  const [doacLevelNgMl, setDoacLevelNgMl] = useState<
    'unknown' | 'less_30' | 'between_30_50' | 'between_50_100' | 'more_50'
  >('more_50');
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(3);
  const [hoursStr, setHoursStr] = useState<string>('3');
  const [recentIngestionWithin4Hours, setRecentIngestionWithin4Hours] = useState<boolean>(false);
  const [coAntiplateletOrThrombocytopenia, setCoAntiplateletOrThrombocytopenia] = useState<boolean>(false);
  const [isTraumaWithin3Hours, setIsTraumaWithin3Hours] = useState<boolean>(false);

  // Active Algorithm Branch in Tab 2
  const [selectedAlgoBranch, setSelectedAlgoBranch] = useState<'bleeding' | 'surgery'>('bleeding');

  // Compute live reversal calculation
  const calculationResult: ReversalCalculationResult = useMemo(() => {
    const params: PatientParameters = {
      scenario,
      anticoagulant,
      weightKg,
      bleedingSeverity: scenario === 'bleeding' ? bleedingSeverity : undefined,
      urgencyTiming: scenario === 'procedure' ? urgencyTiming : undefined,
      procedureRisk: scenario === 'procedure' ? procedureRisk : undefined,
      inrValue: anticoagulant === 'warfarin_aceno' ? inrValue : undefined,
      doacLevelNgMl:
        anticoagulant === 'dabigatran' ||
        anticoagulant === 'apixaban' ||
        anticoagulant === 'rivaroxaban' ||
        anticoagulant === 'edoxaban'
          ? doacLevelNgMl
          : undefined,
      hoursSinceLastDose,
      recentIngestionWithin4Hours,
      coAntiplateletOrThrombocytopenia,
      isTraumaWithin3Hours,
    };
    return calculateReversalProtocol(params);
  }, [
    scenario,
    anticoagulant,
    weightKg,
    bleedingSeverity,
    urgencyTiming,
    procedureRisk,
    inrValue,
    doacLevelNgMl,
    hoursSinceLastDose,
    recentIngestionWithin4Hours,
    coAntiplateletOrThrombocytopenia,
    isTraumaWithin3Hours,
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="font-semibold text-rose-600">Protocollo Clinico Emostatico d'Urgenza</span>
              <span aria-hidden="true">·</span>
              <span>Linee Guida ISTH · ESC · ESAIC · ACC</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
              <span>Gestione Sanguinamenti Acuti & Manovre Invasive in Anticoagulati</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Algoritmo decisionale e calcolatore delle dosi di reverse (4F-CCP, Idarucizumab, Vitamina K, Protamina)
              secondo la gravità emorragica, la tempistica chirurgica (&lt;6h, 6-24h, 24-48h) e i cut-off di sicurezza plasmatici.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Calcolatore & Decision Support Guidato</span>
          </button>

          <button
            onClick={() => setActiveTab('algorithms')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'algorithms'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Algoritmi di Flusso Decisionali</span>
          </button>

          <button
            onClick={() => setActiveTab('cutoffs')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cutoffs'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Cut-Off Plasmatici & Rischio Tromboembolico</span>
          </button>

          <button
            onClick={() => setActiveTab('document')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'document'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Linee Guida & Laboratorio d'Urgenza</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CALCOLATORE & DECISION SUPPORT GUIDATO */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Parameters Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-rose-600" />
                <span>1. Parametri Clinici del Paziente</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Imposta lo scenario per calcolare l'indicazione e le dosi esatte sul peso.
              </p>
            </div>

            {/* Scenario Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Scenario Clinico in Acuto:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setScenario('bleeding')}
                  className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all ${
                    scenario === 'bleeding'
                      ? 'border-rose-600 bg-rose-50/70 text-rose-900 ring-1 ring-rose-500/20'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <Droplet className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sanguinamento in atto</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block font-normal">
                    Emorragia maggiore, CRNMB o minore
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setScenario('procedure')}
                  className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all ${
                    scenario === 'procedure'
                      ? 'border-rose-600 bg-rose-50/70 text-rose-900 ring-1 ring-rose-500/20'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>Chirurgia / Manovra</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block font-normal">
                    Paziente non sanguinante candidato
                  </span>
                </button>
              </div>
            </div>

            {/* Anticoagulant Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Anticoagulante Assunto:
              </label>
              <select
                value={anticoagulant}
                onChange={(e) => setAnticoagulant(e.target.value as AnticoagulantType)}
                className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-rose-500"
              >
                <optgroup label="Antagonisti della Vitamina K (AVK)">
                  <option value="warfarin_aceno">Warfarin (Coumadin) / Acenocumarolo (Sintrom)</option>
                </optgroup>
                <optgroup label="DOAC - Inibitori Diretti del Fattore Xa">
                  <option value="apixaban">Apixaban (Eliquis)</option>
                  <option value="rivaroxaban">Rivaroxaban (Xarelto)</option>
                  <option value="edoxaban">Edoxaban (Lixiana)</option>
                </optgroup>
                <optgroup label="DOAC - Inibitore Diretto della Trombina (IIa)">
                  <option value="dabigatran">Dabigatran (Pradaxa)</option>
                </optgroup>
                <optgroup label="Eparine Parenterali">
                  <option value="enf">Eparina Non Frazionata (ENF sodica/calcica EV)</option>
                  <option value="ebpm">Eparina a Basso Peso Molecolare (Enoxaparina / EBPM)</option>
                  <option value="fondaparinux">Fondaparinux (Arixtra SC)</option>
                </optgroup>
              </select>
            </div>

            {/* Weight Input */}
            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Peso Corporeo Reale del Paziente:</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={weightStr}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*([.,]\d*)?$/.test(val)) {
                        setWeightStr(val);
                        const n = parseFloat(val.replace(',', '.'));
                        if (!isNaN(n) && n > 0) setWeightKg(Math.round(n));
                      }
                    }}
                    placeholder="es. 75"
                    className="w-16 px-2 py-1 text-xs text-right font-mono font-bold text-rose-700 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                  />
                  <span className="font-mono text-slate-500 text-xs">kg</span>
                </div>
              </div>


              <input
                type="range"
                min="40"
                max="140"
                step="1"
                value={weightKg}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWeightKg(val);
                  setWeightStr(String(val));
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>40 kg</span>
                <span>70 kg (standard)</span>
                <span>140 kg</span>
              </div>
            </div>

            {/* Scenario Specifics: Bleeding Severity */}
            {scenario === 'bleeding' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">
                  Gravità dell'Emorragia (Classificazione ISTH):
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-start gap-2 p-2 rounded-lg border border-red-200 bg-red-50/40 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value="major_ich"
                      checked={bleedingSeverity === 'major_ich'}
                      onChange={() => setBleedingSeverity('major_ich')}
                      className="mt-0.5 accent-red-600"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-red-900 block">
                        Maggiore: Emorragia Intracranica (ICH) o Sede Critica
                      </span>
                      <span className="text-[11px] text-red-700 leading-tight block mt-0.5">
                        Intracranica, spinale, intraoculare, pericardica o shock emorragico.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-2 rounded-lg border border-red-200 bg-red-50/20 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value="major_other"
                      checked={bleedingSeverity === 'major_other'}
                      onChange={() => setBleedingSeverity('major_other')}
                      className="mt-0.5 accent-red-600"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-red-900 block">
                        Maggiore: Altra Sede / Calo Hb ≥ 2 g/dL o ≥ 2 U Emazie
                      </span>
                      <span className="text-[11px] text-red-700 leading-tight block mt-0.5">
                        Retroperitoneale, intramuscolare compartimentale, GI massiva con ipotensione.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-2 rounded-lg border border-amber-200 bg-amber-50/30 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value="crnmb"
                      checked={bleedingSeverity === 'crnmb'}
                      onChange={() => setBleedingSeverity('crnmb')}
                      className="mt-0.5 accent-amber-600"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-amber-900 block">
                        Non Maggiore ma Clinicamente Rilevante (CRNMB)
                      </span>
                      <span className="text-[11px] text-amber-700 leading-tight block mt-0.5">
                        Ospedalizzazione, re-imaging o GI senza shock o supporto &lt; 2 U emazie in comorbido.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-2 rounded-lg border border-emerald-200 bg-emerald-50/30 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value="minor"
                      checked={bleedingSeverity === 'minor'}
                      onChange={() => setBleedingSeverity('minor')}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-emerald-900 block">
                        Sanguinamento Minore
                      </span>
                      <span className="text-[11px] text-emerald-700 leading-tight block mt-0.5">
                        Epistassi lieve, congiuntivale, ecchimosi cutanea superficiale, ORL minore.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Scenario Specifics: Surgery Timing & Bleeding Risk */}
            {scenario === 'procedure' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tempistica dell'Intervento Chirurgico:
                  </label>
                  <select
                    value={urgencyTiming}
                    onChange={(e) => setUrgencyTiming(e.target.value as SurgeryUrgency)}
                    className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="emergency">Emergenza (&lt; 6 ore) - Es. perforazione, rottura aneurisma, NCH</option>
                    <option value="urgency">Urgenza (6 - 24 ore) - Es. frattura femore, ischemia critica arto</option>
                    <option value="semi_urgency">Semi-Urgenza (24 - 48 ore) - Es. colecistite acuta, ascesso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rischio Emorragico Procedurale:
                  </label>
                  <select
                    value={procedureRisk}
                    onChange={(e) => setProcedureRisk(e.target.value as ProcedureBleedingRisk)}
                    className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="high">Alto Rischio (2-4% sanguinamento post-op: NCH, cardiochirurgia, ortopedia maggiore, TURP, anestesia spinale/epidurale, biopsie profonde)</option>
                    <option value="low">Minimo / Basso Rischio (0-2% sanguinamento: endoscopia digestiva diagnostica, piccola chirurgia superficiale)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Laboratory & Time Values */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              {anticoagulant === 'warfarin_aceno' && (
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Valore INR Attuale:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={inrStr}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d*([.,]\d*)?$/.test(val)) {
                            setInrStr(val);
                            const n = parseFloat(val.replace(',', '.'));
                            if (!isNaN(n) && n >= 1) setInrValue(Math.round(n * 10) / 10);
                          }
                        }}
                        placeholder="es. 4.2"
                        className="w-16 px-2 py-1 text-xs text-right font-mono font-bold text-rose-700 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setInrValue(2.8);
                        setInrStr('2.8');
                      }}
                      className={`py-1 text-xs font-mono rounded border transition-colors ${
                        inrValue >= 2.0 && inrValue < 4.0
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      INR 2.0-3.9
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInrValue(4.8);
                        setInrStr('4.8');
                      }}
                      className={`py-1 text-xs font-mono rounded border transition-colors ${
                        inrValue >= 4.0 && inrValue <= 6.0
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      INR 4.0-6.0
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInrValue(7.2);
                        setInrStr('7.2');
                      }}
                      className={`py-1 text-xs font-mono rounded border transition-colors ${
                        inrValue > 6.0 && inrValue <= 10.0
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      INR &gt; 6.0
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInrValue(11.5);
                        setInrStr('11.5');
                      }}
                      className={`py-1 text-xs font-mono rounded border transition-colors ${
                        inrValue > 10.0
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      INR &gt; 10
                    </button>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="14.0"
                    step="0.1"
                    value={inrValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInrValue(val);
                      setInrStr(val.toFixed(1));
                    }}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              )}

              {(anticoagulant === 'dabigatran' ||
                anticoagulant === 'apixaban' ||
                anticoagulant === 'rivaroxaban' ||
                anticoagulant === 'edoxaban') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Livello Plasmatico DOAC (Attività anti-Xa / dTT):
                  </label>
                  <select
                    value={doacLevelNgMl}
                    onChange={(e) => setDoacLevelNgMl(e.target.value as any)}
                    className="w-full text-xs font-medium bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                  >
                    <option value="more_50">&gt; 50 ng/mL (Livello non sicuro: indicata reverse in urgenza/emergenza)</option>
                    <option value="between_50_100">50 - 100 ng/mL (Valutare rinvio intervento 20-24h se 6-24h)</option>
                    <option value="between_30_50">30 - 50 ng/mL (Livello sicuro SOLO per procedure a basso rischio)</option>
                    <option value="less_30">&lt; 30 ng/mL (Livello sicuro anche per alto rischio, NCH e trombolisi)</option>
                    <option value="unknown">Non noto / Esito in attesa (Trattare come scoagulato se emergenza)</option>
                  </select>
                </div>
              )}

              {(anticoagulant === 'enf' || anticoagulant === 'ebpm') && (
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Tempo Trascorso dall'Ultima Somministrazione:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={hoursStr}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d*$/.test(val)) {
                            setHoursStr(val);
                            const n = parseInt(val, 10);
                            if (!isNaN(n) && n >= 0) setHoursSinceLastDose(n);
                          }
                        }}
                        placeholder="es. 3"
                        className="w-16 px-2 py-1 text-xs text-right font-mono font-bold text-rose-700 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500/20 outline-hidden shadow-2xs"
                      />
                      <span className="font-mono text-slate-500 text-xs">ore</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={hoursSinceLastDose}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setHoursSinceLastDose(val);
                      setHoursStr(String(val));
                    }}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>1 ora</span>
                    <span>3h (cut-off ENF)</span>
                    <span>8h (cut-off EBPM)</span>
                    <span>24h</span>
                  </div>
                </div>
              )}

              {/* Co-factors checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recentIngestionWithin4Hours}
                    onChange={(e) => setRecentIngestionWithin4Hours(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>Assunzione orale recente dell'anticoagulante nelle ultime 2-4 ore</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={coAntiplateletOrThrombocytopenia}
                    onChange={(e) => setCoAntiplateletOrThrombocytopenia(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>Co-assunzione di Antiaggreganti (DAPT/ASA) o Piastrine &lt; 50.000/mm³</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTraumaWithin3Hours}
                    onChange={(e) => setIsTraumaWithin3Hours(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>Politrauma o trauma maggiore entro 3 ore dall'evento</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Output Decision Support Card */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Decision Banner */}
            <div
              className={`rounded-2xl border p-5 shadow-xs transition-all ${
                calculationResult.decision === 'INDICATED'
                  ? 'bg-red-50/90 border-red-200'
                  : calculationResult.decision === 'CONSIDER'
                  ? 'bg-amber-50/90 border-amber-200'
                  : 'bg-emerald-50/90 border-emerald-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    calculationResult.decision === 'INDICATED'
                      ? 'bg-red-600 text-white'
                      : calculationResult.decision === 'CONSIDER'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {calculationResult.decision === 'INDICATED' && <AlertTriangle className="w-6 h-6" />}
                  {calculationResult.decision === 'CONSIDER' && <Clock className="w-6 h-6" />}
                  {calculationResult.decision === 'NOT_INDICATED' && <CheckCircle2 className="w-6 h-6" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        calculationResult.decision === 'INDICATED'
                          ? 'bg-red-200/80 text-red-900'
                          : calculationResult.decision === 'CONSIDER'
                          ? 'bg-amber-200/80 text-amber-900'
                          : 'bg-emerald-200/80 text-emerald-900'
                      }`}
                    >
                      {calculationResult.decisionLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      (Linee Guida ISTH · ESC · ESAIC)
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 mt-2 leading-relaxed">
                    {calculationResult.summaryText}
                  </p>
                </div>
              </div>
            </div>

            {/* Prescribed Reversal Agent Card */}
            {calculationResult.primaryAgent && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-rose-600" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {calculationResult.primaryAgent.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono">
                        Target Posologico: {calculationResult.primaryAgent.targetDoseText}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    1ª Scelta Emostatica
                  </span>
                </div>

                {/* Dose and Vials Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Dose Totale Calcolata sul Peso ({weightKg} kg):
                    </span>
                    <span className="text-lg font-bold font-mono text-slate-900 block mt-0.5">
                      {calculationResult.primaryAgent.totalDoseCalculated}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Numero Flaconcini / Fiale da Preparare:
                    </span>
                    <span className="text-lg font-bold font-mono text-rose-600 block mt-0.5">
                      {calculationResult.primaryAgent.vialsCountText}
                    </span>
                  </div>
                </div>

                {/* Infusion Speed & Notes */}
                <div className="text-xs space-y-2">
                  <div className="p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-lg text-amber-900">
                    <span className="font-bold">Velocità di Somministrazione: </span>
                    <span>{calculationResult.primaryAgent.infusionSpeed}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {calculationResult.primaryAgent.notes}
                  </p>
                </div>

                {/* Second Line Agent if present */}
                {calculationResult.secondLineAgent && (
                  <div className="pt-3 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700 block mb-1">
                      Opzione di 2ª Scelta (se il farmaco principale non è disponibile):
                    </span>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 space-y-0.5">
                      <span className="font-bold text-slate-900">
                        {calculationResult.secondLineAgent.name}:{' '}
                      </span>
                      <span>
                        {calculationResult.secondLineAgent.totalDoseCalculated} ({calculationResult.secondLineAgent.vialsCountText}).
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Adjuvant Measures & Clinical Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Misure Adcoadiuvanti & Trattamenti Specifici</span>
              </h3>

              <div className="space-y-2">
                {calculationResult.adjuvantMeasures.map((measure, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs ${
                      measure.urgency === 'high'
                        ? 'border-rose-200 bg-rose-50/40 text-slate-800'
                        : 'border-slate-200 bg-slate-50/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-0.5">
                      {measure.urgency === 'high' && (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      )}
                      <span>{measure.action}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {measure.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Laboratory & Thrombosis Safety Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lab Followup */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Monitoraggio di Laboratorio (LRR)</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Esame:</span>
                  <span className="text-slate-600">{calculationResult.labFollowup.test}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Timing Prelievo:</span>
                  <span className="text-slate-600">{calculationResult.labFollowup.timing}</span>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  {calculationResult.labFollowup.cutoffs}
                </p>
              </div>

              {/* Thrombosis Post-Reverse Safety Warning */}
              <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/30 p-4 shadow-xs space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 border-b border-amber-200/60 pb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Rischio Trombosi Post-Reverse (TEE)</span>
                </div>
                <div>
                  <span className="font-semibold text-amber-950 block">Incidenza Attesa:</span>
                  <span className="font-mono font-bold text-amber-900">
                    {calculationResult.thrombosisPostReverseWarning.riskRate}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-amber-950 block">Raccomandazioni di Sicurezza:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-800">
                    {calculationResult.thrombosisPostReverseWarning.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALGORITMI DI FLUSSO INTERATTIVI (APPENDICE 5 & 6) */}
      {activeTab === 'algorithms' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Algoritmi Decisionali di Gestione Emostatica
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rappresentazione interattiva degli alberi decisionali per sanguinamento attivo e per chirurgia in acuto.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedAlgoBranch('bleeding')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedAlgoBranch === 'bleeding'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sanguinamento in Atto
              </button>
              <button
                onClick={() => setSelectedAlgoBranch('surgery')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedAlgoBranch === 'surgery'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Valutazione Chirurgica in Acuto
              </button>
            </div>
          </div>

          {/* ALGORITHM 1: SANGUINAMENTO IN ATTO (APPENDICE 5) */}
          {selectedAlgoBranch === 'bleeding' && (
            <div className="space-y-6">
              {/* Initial Evaluation Step */}
              <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl text-center max-w-2xl mx-auto shadow-2xs">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider block">
                  Paziente con Emorragia in Atto in Terapia Anticoagulante
                </span>
                <p className="text-xs text-red-800 mt-1 leading-relaxed">
                  Valutare stabilità emodinamica (PA, FC, diuresi). Prelevare subito in urgenza (provetta azzurro citrato):
                  PT, aPTT, fibrinogeno, emocromo, creatinina/funzione renale ed epatica.
                  <strong> INR per AVK · Dosaggio attività specifico anti-Xa / dTT per DOAC</strong>.
                  Determinare dose e orario dell'ultima assunzione. Verificare co-assunzione FANS / antiaggreganti.
                </p>
              </div>

              {/* 3 Drug Class Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Branch 1: Eparine */}
                <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <h3 className="text-sm font-bold text-emerald-950">Eparine (ENF / EBPM)</h3>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Sospendere eparina ed eseguire interventi diagnostici e/o terapeutici.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                      <span className="font-bold text-emerald-900 block">ENF (Sodica o Calcica):</span>
                      <span className="text-[11px] text-slate-600 block">
                        • &gt; 3 ore: usualmente NON richiesta reverse.
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • &lt; 3 ore: SÌ REVERSE con PROTAMINA SOLFATO (1 mg / 100 UI di eparina; in emergenza 25 mg in bolo lento in 10 min, max 50 mg).
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                      <span className="font-bold text-emerald-900 block">ENOXAPARINA (EBPM):</span>
                      <span className="text-[11px] text-slate-600 block">
                        • &gt; 8-12 ore: usualmente NON richiesta reverse.
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • &lt; 8 ore: SÌ REVERSE con PROTAMINA (1 mg / 100 UI di EBPM; abitualmente 25 mg = 1/2 fiala; ripetibile 0.5 mg).
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • Tra 8 e 12 ore: 0.5 mg / 100 UI di EBPM.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Branch 2: AVK */}
                <div className="border border-amber-200 bg-amber-50/30 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                    <h3 className="text-sm font-bold text-amber-950">AVK (Warfarin / Sintrom)</h3>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Sospendere AVK ed eseguire interventi diagnostici e/o emostatici.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                      <span className="font-bold text-amber-900 block">Emorragia Minore:</span>
                      <span className="text-[11px] text-slate-600 block">
                        • Differire somministrazione AVK.
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • INR &lt; 5: di solito nulla.
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • INR 5-10: 1 - 2.5 mg Vitamina K per os.
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • INR &gt; 10: 2 - 5 mg Vitamina K per os (NO CCP).
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-red-200 shadow-2xs space-y-1">
                      <span className="font-bold text-red-900 block">Emorragia Maggiore / Chirurgia &lt; 6h:</span>
                      <span className="text-[11px] text-red-700 font-bold block">
                        • SÌ REVERSE con 4F-CCP (1ª scelta) + Vitamina K 10 mg EV!
                      </span>
                      <span className="text-[11px] text-slate-800 block">
                        • INR 2.0 - 3.9: 25 UI/kg
                      </span>
                      <span className="text-[11px] text-slate-800 block">
                        • INR 4.0 - 6.0: 35 UI/kg
                      </span>
                      <span className="text-[11px] text-slate-800 block">
                        • INR &gt; 6.0: 50 UI/kg (max 5000 UI)
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • PFC (10-20 mL/kg) solo se CCP assenti.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Branch 3: DOAC */}
                <div className="border border-rose-200 bg-rose-50/30 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2 border-b border-rose-200 pb-2">
                    <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                    <h3 className="text-sm font-bold text-rose-950">DOAC (Dabigatran & Anti-Xa)</h3>
                  </div>
                  <p className="text-[11px] text-rose-800">
                    Sospendere DOAC. Reintegro volemico. Carbone attivo 50g se assunto 2-4h prima.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-rose-200 shadow-2xs space-y-1">
                      <span className="font-bold text-rose-900 block">DABIGATRAN:</span>
                      <span className="text-[11px] text-rose-800 font-bold block">
                        • IDARUCIZUMAB 5 g EV (2 fiale da 2.5 g a 15 min l'una dall'altra).
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • 2ª scelta: 4F-CCP 25 UI/kg (ripetibile +25 UI/kg).
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • Emodialisi da valutare con nefrologo.
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-red-300 shadow-2xs space-y-1">
                      <span className="font-bold text-red-900 block">APIXABAN / RIVAROXABAN / EDOXABAN:</span>
                      <span className="text-[11px] text-red-800 font-bold block">
                        • 4F-CCP 50 UI/kg SUBITO se Sanguinamento Intracranico (ICH) o Neurochirurgia / Cardiochirurgia.
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • 4F-CCP 25 UI/kg (ripetibile +25 UI/kg) per altre sedi maggiori.
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • Acido Tranexamico 10 mg/kg (o 1 g EV) se trauma o sedi critiche.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALGORITHM 2: CHIRURGIA / MANOVRA INVASIVA IN ACUTO (APPENDICE 6) */}
          {selectedAlgoBranch === 'surgery' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-center max-w-2xl mx-auto shadow-2xs">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Paziente Anticoagulato (Non Sanguinante) in Valutazione Chirurgica in Acuto
                </span>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Valutare condizioni emodinamiche. Prelevare in urgenza INR per AVK e livello DOAC (anti-Xa / dTT).
                  Stratificare in base alla <strong>TEMPISTICA</strong> (&lt;6h, 6-24h, 24-48h) e al <strong>RISCHIO EMORRAGICO</strong> della procedura.
                </p>
              </div>

              {/* 3 Timing Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Column 1: Emergenza < 6 ore */}
                <div className="border border-red-200 bg-red-50/30 rounded-xl p-4 space-y-3">
                  <div className="border-b border-red-200 pb-2">
                    <span className="text-[11px] font-mono font-bold text-red-700 uppercase block">
                      Emergenza Immediata (&lt; 6 ore)
                    </span>
                    <h3 className="text-sm font-bold text-red-950">REVERSE INDICATA</h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-red-200 shadow-2xs space-y-1">
                      <span className="font-bold text-red-900 block">DOAC:</span>
                      <span className="text-[11px] text-slate-600 block">
                        • Se &lt; 30 ng/mL: <strong>NO REVERSE</strong> (livello emostatico sicuro!).
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • Se ≥ 50 ng/mL o ignoto: <strong>SÌ REVERSE</strong>.
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • Dabigatran: Idarucizumab 5 g EV (4F-CCP 25 UI/kg 2ª scelta).
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • Anti-Xa: 4F-CCP 50 UI/kg per neurochirurgia/cardiochirurgia; 25 UI/kg per altri interventi.
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-red-200 shadow-2xs space-y-1">
                      <span className="font-bold text-red-900 block">AVK:</span>
                      <span className="text-[11px] text-slate-600 block">
                        • Se INR &lt; 1.5: sicuro per alto rischio (NO REVERSE).
                      </span>
                      <span className="text-[11px] text-slate-800 font-semibold block">
                        • Se INR &gt; 1.5 - 2.0: 4F-CCP (25-50 UI/kg) + Vitamina K 10 mg EV.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Urgenza 6 - 24 ore */}
                <div className="border border-amber-200 bg-amber-50/30 rounded-xl p-4 space-y-3">
                  <div className="border-b border-amber-200 pb-2">
                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase block">
                      Urgenza (6 - 24 ore)
                    </span>
                    <h3 className="text-sm font-bold text-amber-950">REVERSE DA CONSIDERARE</h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                      <span className="font-bold text-amber-900 block">DOAC:</span>
                      <span className="text-[11px] text-slate-700 block">
                        • Se livello tra 50 e 100 ng/mL: <strong>RINVIARE L'INTERVENTO di 20-24 ore</strong> per consentire discesa spontanea sotto 50 ng/mL senza farmaci di reverse!
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        • Se non differibile o livello non noto: 4F-CCP 25 UI/kg (50 UI/kg per NCH) o Idarucizumab.
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                      <span className="font-bold text-amber-900 block">AVK:</span>
                      <span className="text-[11px] text-slate-600 block">
                        • Valutare rinvio con somministrazione di sola Vitamina K 10 mg EV; altrimenti 4F-CCP.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Semi-Urgenza 24 - 48 ore */}
                <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4 space-y-3">
                  <div className="border-b border-emerald-200 pb-2">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase block">
                      Semi-Urgenza (24 - 48 ore)
                    </span>
                    <h3 className="text-sm font-bold text-emerald-950">REVERSE NON INDICATA</h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                      <span className="font-bold text-emerald-900 block">DOAC:</span>
                      <span className="text-[11px] text-slate-700 block">
                        • La sola sospensione (emivita 8-12 ore) è sufficiente per raggiungere spontaneamente livelli sicuri (&lt; 30-50 ng/mL).
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                      <span className="font-bold text-emerald-900 block">AVK:</span>
                      <span className="text-[11px] text-slate-700 block">
                        • Sospensione AVK + Vitamina K 10 mg EV lenta per spontanea normalizzazione dell'emostasi entro 24 ore.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TABELLE DI RIFERIMENTO, CUT-OFF E RISCHIO TROMBOEMBOLICO */}
      {activeTab === 'cutoffs' && (
        <div className="space-y-6">
          {/* Cut-off Plasmatici Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-rose-600" />
              <span>Soglie e Cut-Off Plasmatici di Sicurezza Emostatica</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Anticoagulante</th>
                    <th className="py-2.5 px-3">Test Diagnostico</th>
                    <th className="py-2.5 px-3">Sicuro Alto Rischio / NCH</th>
                    <th className="py-2.5 px-3">Sicuro Solo Basso Rischio</th>
                    <th className="py-2.5 px-3">NON Sicuro (Reverse Indicata)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CUTOFF_REFERENCES.map((cutoff, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-900">{cutoff.anticoagulant}</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">{cutoff.test}</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">{cutoff.safeHighRisk}</td>
                      <td className="py-3 px-3 text-amber-700">{cutoff.safeLowRisk}</td>
                      <td className="py-3 px-3 text-red-700 font-semibold">{cutoff.unsafeReverseIndicated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* High Thromboembolic Risk Conditions (ACC / ESC) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Principali Condizioni ad Alto Rischio Tromboembolico Basale (ACC / ESC)
                </h3>
                <span className="text-xs text-slate-500">
                  Da bilanciare attentamente prima della sospensione o della reverse farmacologica.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HIGH_THROMBOEMBOLIC_RISK_CONDITIONS.map((cond, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">{cond.category}</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                    {cond.criteria.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Bleeding Risk Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Stratificazione del Rischio Emorragico Procedurale
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-red-50/40 rounded-xl border border-red-200 space-y-2">
                <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                  <span className="font-bold text-red-900">Alto Rischio Emorragico</span>
                  <span className="font-mono text-red-700 text-[11px] font-bold">2 - 4% a 48 ore</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                  {SURGERY_TIMING_AND_RISK.bleedingRisk[0].examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                  <span className="font-bold text-emerald-900">Basso / Minimo Rischio Emorragico</span>
                  <span className="font-mono text-emerald-700 text-[11px] font-bold">0 - 2% a 48 ore</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                  {SURGERY_TIMING_AND_RISK.bleedingRisk[1].examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LINEE GUIDA & LABORATORIO D'URGENZA */}
      {activeTab === 'document' && (
        <div className="space-y-6">
          {/* Clinical Guidelines Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono text-rose-600 font-bold block uppercase tracking-wider">
                Linee Guida Internazionali di Riferimento
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {PROTOCOL_METADATA.title}
              </h2>
              <span className="text-xs text-slate-500">
                {PROTOCOL_METADATA.sources}
              </span>
            </div>

            {/* Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Sospensione Immediata</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Primo atto fondamentale in attesa di inquadrare fonte, gravità dell'emorragia o fattibilità dell'intervento.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Supporto Emodinamico</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Cristalloidi bilanciati, emotrasfusioni e correzione dei fattori aggravanti (acidosi, ipotermia, piastrinopenia).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. Reverse Farmacologica</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Riservata a emorragie maggiori a rischio di vita o chirurgia d'urgenza/emergenza ad alto rischio. Usare la dose minima efficace.
                </p>
              </div>
            </div>

            {/* Overview of Reversal Agents */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Farmaci di Reverse Disponibili in Acuto:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <strong className="text-slate-900">4F-CCP (flaconcini 500 UI / 20 mL):</strong> Contiene fattori II, VII, IX, X, Proteina C e S. Bolo lento &lt; 8 mL/min. Efficacia entro 5-15 min, persiste 6-8h. Tetto max 5000 UI.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <strong className="text-slate-900">Idarucizumab (flaconcini 2.5 g / 50 mL):</strong> Frammento Fab umanizzato anti-Dabigatran (Praxbind). 5 g totali (2 dosi da 2.5 g a 15 min). Efficacia completa in 2-4h, persiste 24h.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <strong className="text-slate-900">Vitamina K1 (fiale 10 mg / 1 mL):</strong> Indispensabile CONTESTUALMENTE a CCP negli AVK per evitare il rebound dopo 6-8h. Infondere 10 mg EV lento in 100 mL SF in 30 min.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <strong className="text-slate-900">Protamina Solfato (fiale 50 mg / 5 mL):</strong> 1 mg neutralizza 100 UI di eparina. Bolo molto lento in 10 min (rischio ipotensione grave e anafilassi se rapida).
                </div>
              </div>
            </div>
          </div>

          {/* Laboratory Rapid Response Instructions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-900">
                Istruzioni per il Laboratorio d'Urgenza & Risposta Rapida
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-1.5">
                <span className="font-bold text-blue-950 block">Modalità di Prelievo e Trasporto:</span>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  • {LAB_ROUTINE_INSTRUCTIONS.tubeType}
                </p>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  • {LAB_ROUTINE_INSTRUCTIONS.sampleDelivery}
                </p>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  • {LAB_ROUTINE_INSTRUCTIONS.preAlert}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1.5">
                <span className="font-bold text-amber-950 block">Principio Clinico Fondamentale:</span>
                <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                  {LAB_ROUTINE_INSTRUCTIONS.keyPrinciple}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Tempo di refertazione medio target h24: entro 60 minuti.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

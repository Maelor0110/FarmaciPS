import React, { useState } from 'react';
import { FileText, ArrowRight, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { EMERGENCY_PROTOCOLS, EmergencyProtocol } from '../data/protocolsData';
import { EmergencyDrug } from '../types/pharmacy';

interface QuickProtocolsViewProps {
  allDrugs: EmergencyDrug[];
  onSelectDrugById: (drugId: string) => void;
  onOpenAnticoagReversal?: () => void;
}

export const QuickProtocolsView: React.FC<QuickProtocolsViewProps> = ({
  allDrugs,
  onSelectDrugById,
  onOpenAnticoagReversal,
}) => {
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>(
    EMERGENCY_PROTOCOLS[0].id
  );

  const selectedProtocol =
    EMERGENCY_PROTOCOLS.find((p) => p.id === selectedProtocolId) ||
    EMERGENCY_PROTOCOLS[0];

  const getDrugName = (id: string): string => {
    const found = allDrugs.find((d) => d.id === id);
    return found ? found.name : id;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Protocolli & Algoritmi Farmacologici d'Urgenza
            </h2>
            <p className="text-xs text-slate-500">
              Flowchart operative basate sulle ultime linee guida internazionali (ERC, ESC, SSC, ESO)
            </p>
          </div>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {EMERGENCY_PROTOCOLS.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => setSelectedProtocolId(protocol.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                selectedProtocolId === protocol.id
                  ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {protocol.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Protocol Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-1">
            <span className="font-bold text-rose-700">{selectedProtocol.category}</span>
            <span className="text-slate-500">{selectedProtocol.guidelineSource}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {selectedProtocol.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {selectedProtocol.summary}
          </p>

          {selectedProtocol.id === 'inversione-anticoagulanti' && onOpenAnticoagReversal && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-rose-950">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>Vuoi calcolare la dose personalizzata di 4F-CCP o Idarucizumab sul peso del paziente?</strong>{' '}
                  Utilizza il Decision Support interattivo con alberi decisionali dedicati.
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenAnticoagReversal}
                className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
              >
                Apri Calcolatore Reverse &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {selectedProtocol.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 relative flex gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {step.stepNumber}
              </div>

              <div className="flex-1 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{step.action}</p>

                {step.alert && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold">Avvertenza:</strong> {step.alert}
                    </span>
                  </div>
                )}

                {step.drugsInvolved.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      Farmaci correlati:
                    </span>
                    {step.drugsInvolved.map((drugId) => (
                      <button
                        key={drugId}
                        onClick={() => onSelectDrugById(drugId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-md transition-all shadow-2xs"
                        title={`Apri scheda posologica completa di ${getDrugName(drugId)}`}
                      >
                        <span>{getDrugName(drugId)}</span>
                        <ArrowRight className="w-3 h-3 text-rose-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

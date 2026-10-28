import React from 'react';
import { AlertCircle, Activity, Heart, ShieldAlert, ArrowRight, Plus, Check } from 'lucide-react';
import { EmergencyDrug } from '../types/pharmacy';

interface DrugCardProps {
  drug: EmergencyDrug;
  onSelect: (drug: EmergencyDrug) => void;
  isInInteractionsCart: boolean;
  onToggleInteractionsCart: (drug: EmergencyDrug) => void;
}

export const DrugCard: React.FC<DrugCardProps> = ({
  drug,
  onSelect,
  isInInteractionsCart,
  onToggleInteractionsCart,
}) => {
  const primaryDosage = drug.dosages[0];
  const hasQTcRisk = drug.warnings.some((w) => w.isQTC);
  const requiresCVC = drug.warnings.some((w) => w.requiresCVC);
  const hasExtravasationRisk = drug.warnings.some((w) => w.extravasationRisk);

  const settingLabel =
    drug.clinicalSetting === 'ps'
      ? 'Pronto Soccorso / OBI'
      : drug.clinicalSetting === 'reparto'
      ? 'Reparto Med. Urgenza'
      : 'Pronto Soccorso & Reparto';

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-5 flex flex-col justify-between shadow-xs">
      <div>
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2 font-mono">
          <span className="font-semibold text-slate-700">{drug.drugClass}</span>
          <span aria-hidden="true">·</span>
          <span>{settingLabel}</span>
          {drug.isHighAlert && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> High Alert
              </span>
            </>
          )}
        </div>

        {/* Drug Name & Brand Names */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors">
            {drug.name}
          </h3>
          {drug.brandNames.length > 0 && (
            <p className="text-xs text-slate-500 italic mt-0.5">
              Nomi commerciali: {drug.brandNames.join(', ')}
            </p>
          )}
        </div>

        {/* Quick Clinical Summary */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {drug.quickSummary}
        </p>

        {/* Primary Dosage Teaser */}
        {primaryDosage && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4 text-xs">
            <div className="font-semibold text-slate-800 mb-1 truncate">
              {primaryDosage.indication}
            </div>
            {primaryDosage.bolusDose && (
              <div className="text-slate-600 mb-0.5">
                <span className="font-medium text-slate-700">Bolo:</span> {primaryDosage.bolusDose}
              </div>
            )}
            {primaryDosage.maintenanceDose && (
              <div className="text-slate-600">
                <span className="font-medium text-slate-700">Mantenimento:</span>{' '}
                {primaryDosage.maintenanceDose}
              </div>
            )}
          </div>
        )}

        {/* Key Safety Badges with text and icon (no hue-only signaling) */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-mono">
          {drug.pregnancy && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-sans text-[11px] font-medium border ${
                drug.pregnancy.riskLevel === 'contraindicated'
                  ? 'bg-rose-100 text-rose-950 border-rose-300 font-semibold'
                  : drug.pregnancy.riskLevel === 'high_risk'
                  ? 'bg-orange-100 text-orange-950 border-orange-300 font-medium'
                  : drug.pregnancy.riskLevel === 'caution'
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              {drug.pregnancy.riskLevel === 'contraindicated' ? (
                <>
                  <ShieldAlert className="w-3 h-3 text-rose-700 shrink-0" />
                  <span>Gravidanza: Controindicato</span>
                </>
              ) : drug.pregnancy.riskLevel === 'high_risk' ? (
                <>
                  <AlertCircle className="w-3 h-3 text-orange-700 shrink-0" />
                  <span>Gravidanza: Alto Rischio (Cat. {drug.pregnancy.fdaCategory})</span>
                </>
              ) : drug.pregnancy.riskLevel === 'caution' ? (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Gravidanza: Cautela (Cat. {drug.pregnancy.fdaCategory})</span>
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Gravidanza: Compatibile</span>
                </>
              )}
            </span>
          )}
          {hasQTcRisk && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
              <Activity className="w-3 h-3 text-amber-700" /> Rischio QTc
            </span>
          )}
          {requiresCVC && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
              <Heart className="w-3 h-3 text-rose-600" /> Richiesto CVC
            </span>
          )}
          {hasExtravasationRisk && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-50 text-orange-900 border border-orange-200">
              <AlertCircle className="w-3 h-3 text-orange-700" /> Rischio Stravaso
            </span>
          )}
          {drug.renalAdjustment.crclSevere !== 'Nessun aggiustamento.' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
              Aggiust. Renale
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onToggleInteractionsCart(drug)}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            isInInteractionsCart
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
          }`}
          title={
            isInInteractionsCart
              ? 'Rimuovi dal verificatore interazioni'
              : 'Aggiungi a carrello interazioni'
          }
        >
          {isInInteractionsCart ? (
            <>
              <Check className="w-3.5 h-3.5 text-amber-700" />
              <span>In verifica</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Interazioni</span>
            </>
          )}
        </button>

        <button
          onClick={() => onSelect(drug)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-rose-500"
        >
          <span>Scheda Clinica</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

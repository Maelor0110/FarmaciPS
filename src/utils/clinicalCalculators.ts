import { EmergencyDrug } from '../types/pharmacy';

export interface CrClResult {
  crcl: number;
  stage: 'normale' | 'lieve' | 'moderata' | 'severa' | 'terminale';
  stageLabel: string;
  recommendationKey: 'crclNormal' | 'crclModerate' | 'crclSevere' | 'dialysis';
}

/**
 * Calculates Creatinine Clearance using the standard Cockcroft-Gault formula
 * utilized in pharmacokinetics and drug label dosage adjustments.
 */
export function calculateCockcroftGault(
  age: number,
  weight: number,
  serumCreatinine: number, // mg/dL
  isFemale: boolean
): CrClResult {
  if (serumCreatinine <= 0 || weight <= 0 || age <= 0) {
    return {
      crcl: 0,
      stage: 'normale',
      stageLabel: 'Dati insufficienti',
      recommendationKey: 'crclNormal',
    };
  }

  // CrCl (ml/min) = [((140 - age) * weight) / (72 * sCr)] * (0.85 if female)
  let crcl = ((140 - age) * weight) / (72 * serumCreatinine);
  if (isFemale) {
    crcl *= 0.85;
  }

  const rounded = Math.round(crcl * 10) / 10;

  if (rounded >= 90) {
    return {
      crcl: rounded,
      stage: 'normale',
      stageLabel: 'Normale (CrCl >= 90 ml/min)',
      recommendationKey: 'crclNormal',
    };
  } else if (rounded >= 60) {
    return {
      crcl: rounded,
      stage: 'lieve',
      stageLabel: 'Compromissione Lieve (CrCl 60 - 89 ml/min)',
      recommendationKey: 'crclNormal',
    };
  } else if (rounded >= 30) {
    return {
      crcl: rounded,
      stage: 'moderata',
      stageLabel: 'Compromissione Moderata (CrCl 30 - 59 ml/min)',
      recommendationKey: 'crclModerate',
    };
  } else if (rounded >= 15) {
    return {
      crcl: rounded,
      stage: 'severa',
      stageLabel: 'Compromissione Severa (CrCl 15 - 29 ml/min)',
      recommendationKey: 'crclSevere',
    };
  } else {
    return {
      crcl: rounded,
      stage: 'terminale',
      stageLabel: 'Insufficienza Terminale (CrCl < 15 ml/min o Dialisi)',
      recommendationKey: 'dialysis',
    };
  }
}

export interface ChildPughParams {
  encephalopathy: 1 | 2 | 3; // 1 = Nessuna, 2 = Grado 1-2, 3 = Grado 3-4
  ascites: 1 | 2 | 3;        // 1 = Assente, 2 = Lieve/Modica, 3 = Severa/Tesa
  bilirubin: 1 | 2 | 3;      // 1 = < 2 mg/dL, 2 = 2-3 mg/dL, 3 = > 3 mg/dL
  albumin: 1 | 2 | 3;        // 1 = > 3.5 g/dL, 2 = 2.8-3.5 g/dL, 3 = < 2.8 g/dL
  inr: 1 | 2 | 3;            // 1 = < 1.7, 2 = 1.7-2.3, 3 = > 2.3
}

export interface ChildPughResult {
  score: number;
  classGrade: 'A' | 'B' | 'C';
  description: string;
  hepaticAdjustmentKey: 'childPughA' | 'childPughB' | 'childPughC';
}

export function calculateChildPugh(params: ChildPughParams): ChildPughResult {
  const score =
    params.encephalopathy +
    params.ascites +
    params.bilirubin +
    params.albumin +
    params.inr;

  if (score <= 6) {
    return {
      score,
      classGrade: 'A',
      description: 'Classe A (5-6 punti) - Malattia epatica compensata. Funzione metabolica epatica preservata.',
      hepaticAdjustmentKey: 'childPughA',
    };
  } else if (score <= 9) {
    return {
      score,
      classGrade: 'B',
      description: 'Classe B (7-9 punti) - Compromissione funzionale epatica moderata. Cautela con farmaci a esteso metabolismo epatico.',
      hepaticAdjustmentKey: 'childPughB',
    };
  } else {
    return {
      score,
      classGrade: 'C',
      description: 'Classe C (10-15 punti) - Epatopatia avanzata scompensata. Clearance epatica marcatamente ridotta, elevato rischio di encefalopatia e tossicità.',
      hepaticAdjustmentKey: 'childPughC',
    };
  }
}

/**
 * Calculates infusion rate in ml/h based on target dose and dilution
 */
export function calculateInfusionMlPerHour(
  targetDose: number,
  unit: 'mcg/kg/min' | 'mcg/min' | 'mg/h' | 'UI/h' | 'mg/kg/h',
  concentrationMgOrUiPerMl: number,
  patientWeightKg: number
): number {
  if (concentrationMgOrUiPerMl <= 0 || targetDose <= 0) return 0;

  let mlPerHour = 0;

  switch (unit) {
    case 'mcg/kg/min': {
      // dose (mcg/kg/min) * weight (kg) * 60 (min/h) / (conc (mg/ml) * 1000 mcg/mg)
      const mcgPerHour = targetDose * patientWeightKg * 60;
      const concMcgPerMl = concentrationMgOrUiPerMl * 1000;
      mlPerHour = mcgPerHour / concMcgPerMl;
      break;
    }
    case 'mcg/min': {
      const mcgPerHour = targetDose * 60;
      const concMcgPerMl = concentrationMgOrUiPerMl * 1000;
      mlPerHour = mcgPerHour / concMcgPerMl;
      break;
    }
    case 'mg/h': {
      mlPerHour = targetDose / concentrationMgOrUiPerMl;
      break;
    }
    case 'UI/h': {
      mlPerHour = targetDose / concentrationMgOrUiPerMl;
      break;
    }
    case 'mg/kg/h': {
      const mgPerHour = targetDose * patientWeightKg;
      mlPerHour = mgPerHour / concentrationMgOrUiPerMl;
      break;
    }
  }

  return Math.round(mlPerHour * 10) / 10;
}

export interface DetectedInteraction {
  drug1: EmergencyDrug;
  drug2: EmergencyDrug;
  severity: 'contraindicated' | 'major' | 'moderate';
  mechanism: string;
  clinicalAdvice: string;
}

/**
 * Detects interactions among a collection of active drugs selected by user
 */
export function checkDrugInteractions(
  selectedDrugIds: string[],
  allDrugs: EmergencyDrug[]
): DetectedInteraction[] {
  const selectedDrugs = allDrugs.filter((d) => selectedDrugIds.includes(d.id));
  const results: DetectedInteraction[] = [];
  const processedPairs = new Set<string>();

  for (let i = 0; i < selectedDrugs.length; i++) {
    for (let j = i + 1; j < selectedDrugs.length; j++) {
      const d1 = selectedDrugs[i];
      const d2 = selectedDrugs[j];
      const pairKey = [d1.id, d2.id].sort().join('___');

      if (processedPairs.has(pairKey)) continue;

      // Check if d1 mentions d2 or d2 mentions d1 in interactions
      const match1 = d1.interactions.find(
        (inter) =>
          inter.interactingDrug.toLowerCase().includes(d2.name.toLowerCase()) ||
          d2.brandNames.some((b) => inter.interactingDrug.toLowerCase().includes(b.toLowerCase()))
      );

      const match2 = d2.interactions.find(
        (inter) =>
          inter.interactingDrug.toLowerCase().includes(d1.name.toLowerCase()) ||
          d1.brandNames.some((b) => inter.interactingDrug.toLowerCase().includes(b.toLowerCase()))
      );

      if (match1) {
        results.push({
          drug1: d1,
          drug2: d2,
          severity: match1.severity,
          mechanism: match1.mechanism,
          clinicalAdvice: match1.clinicalAdvice,
        });
        processedPairs.add(pairKey);
      } else if (match2) {
        results.push({
          drug1: d1,
          drug2: d2,
          severity: match2.severity,
          mechanism: match2.mechanism,
          clinicalAdvice: match2.clinicalAdvice,
        });
        processedPairs.add(pairKey);
      } else {
        // High alert combinations: e.g. multiple QT prolonging drugs
        const d1QT = d1.warnings.some((w) => w.isQTC);
        const d2QT = d2.warnings.some((w) => w.isQTC);
        if (d1QT && d2QT) {
          results.push({
            drug1: d1,
            drug2: d2,
            severity: 'major',
            mechanism: 'Entrambi i farmaci prolungano l\'intervallo elettrocardiografico QTc con effetto sinergico.',
            clinicalAdvice: 'Monitoraggio continuo telemetrico dell\'intervallo QTc ed elettroliti plasmatici (K+ >= 4.0 mEq/L, Mg2+ >= 2.0 mg/dL). Alto rischio di Torsione di Punta e FV.',
          });
          processedPairs.add(pairKey);
        }

        // Sedative synergy: e.g. Opioid + Benzodiazepine
        const isD1Sedative = d1.drugClass === 'Oppioidi' || d1.drugClass === 'Benzodiazepine & Sedativi-Ipnotici';
        const isD2Sedative = d2.drugClass === 'Oppioidi' || d2.drugClass === 'Benzodiazepine & Sedativi-Ipnotici';
        if (isD1Sedative && isD2Sedative && d1.drugClass !== d2.drugClass) {
          results.push({
            drug1: d1,
            drug2: d2,
            severity: 'major',
            mechanism: 'Sinergia profonda di depressione del sistema nervoso centrale e del centro respiratorio bulbare.',
            clinicalAdvice: 'Dimezzare le dosi se co-somministrati; capnografia ed ossimetria continua obbligatoria; avere pronti Naloxone e Flumazenil.',
          });
          processedPairs.add(pairKey);
        }
      }
    }
  }

  return results;
}

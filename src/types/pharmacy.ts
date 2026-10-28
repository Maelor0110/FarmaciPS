/**
 * Emergency Medicine and Clinical Pharmacology Data Models
 * Designed strictly for Adult Emergency Department (Pronto Soccorso)
 * and Acute Medical Ward (Reparto Medicina d'Urgenza / Semintensiva).
 */

export type ClinicalSetting = 'ps' | 'reparto' | 'entrambi';

export type TherapeuticIndication =
  | 'Arresto Cardiaco / ACLS'
  | 'Shock & Ipotensione'
  | 'Aritmie & Cardioversione'
  | 'Crisi Ipertensiva & Dissecazione'
  | 'EPA & Insufficienza Cardiaca'
  | 'Infezione & Sepsi'
  | 'Tromboembolismo & SCA'
  | 'Emorragia & Inversione Anticoagulanti'
  | 'Dolore Acuto & Analgesia'
  | 'Sedazione Procedurale & RSI'
  | 'Convulsioni & Neurologia d\'Urgenza'
  | 'Intossicazioni & Antidoti'
  | 'Vertigini & Sindromi Vestibolari'
  | 'Ansia Acuta & Attacchi di Panico'
  | 'BPCO Riacutizzata'
  | 'Asma Acuto'
  | 'Reazioni Allergiche & Anafilassi';

export type DrugClass =
  | 'Vasopressori & Inotropi'
  | 'Anti-aritmici'
  | 'Beta-bloccanti'
  | 'Calcio-antagonisti'
  | 'Antiaggreganti & Anticoagulanti'
  | 'Antibiotici'
  | 'Diuretici dell\'ansa'
  | 'Nitrati & Vasodilatatori'
  | 'Oppioidi'
  | 'FANS & Analgesici non oppioidi'
  | 'Benzodiazepine & Sedativi-Ipnotici'
  | 'Bloccanti neuromuscolari'
  | 'Antidoti specifici'
  | 'Corticosteroidi'
  | 'Inibitori di pompa protonica & Procinetici'
  | 'Soluzioni osmotiche & Cristalloidi'
  | 'Broncodilatatori'
  | 'Antiemetici & Antivertiginosi'
  | 'Antistaminici & Antiallergici';

export type PregnancyRiskLevel =
  | 'safe'            // Compatibile / Prima linea (es. Paracetamolo, Idrocortisone, Eparina, Ceftriaxone)
  | 'caution'         // Cautela / Valutare rapporto rischio-beneficio (es. Salbutamolo, Fentanil, Labetalolo)
  | 'high_risk'       // Rischio potenziale o elevato / Solo per emergenze vitali materne (es. Benzodiazepine, Amiodarone)
  | 'contraindicated';// CONTROINDICATO / Teratogeno accertato (es. Warfarin, DOAC, Valproato, FANS 3° trim)

export interface PregnancySafety {
  fdaCategory: 'A' | 'B' | 'C' | 'D' | 'X';
  riskLevel: PregnancyRiskLevel;
  clinicalSummary: string;
  lactation: string;
  trimesterNotes?: string;
  safeAlternatives?: string;
}

export interface RenalAdjustment {
  crclNormal: string;
  crclModerate: string; // 30-50 ml/min
  crclSevere: string;   // 10-29 ml/min
  dialysis: string;     // < 10 ml/min o Emodialisi (HD / CRRT)
  nephrotoxicRisk: boolean;
  notes?: string;
}

export interface HepaticAdjustment {
  childPughA: string;
  childPughB: string;
  childPughC: string;
  hepatotoxicRisk: boolean;
  notes?: string;
}

export interface InfusionRateConfig {
  defaultConcentrationMgPerMl: number;
  defaultDilutionText: string;
  unit: 'mcg/kg/min' | 'mcg/min' | 'mg/h' | 'UI/h' | 'mg/kg/h';
  minRate: number;
  maxRate: number;
  defaultRate: number;
  step: number;
}

export interface DrugDosage {
  indication: string;
  bolusDose?: string;
  maintenanceDose?: string;
  preparation: string;
  infusionRateCalc?: InfusionRateConfig;
  route: string[];
  maxDailyDose?: string;
  clinicalTips?: string;
}

export interface DrugWarning {
  severity: 'black_box' | 'high' | 'moderate';
  title: string;
  description: string;
  isQTC?: boolean;
  requiresCVC?: boolean;
  extravasationRisk?: boolean;
}

export interface DrugInteraction {
  interactingDrug: string;
  severity: 'contraindicated' | 'major' | 'moderate';
  mechanism: string;
  clinicalAdvice: string;
}

export interface GuidelineReference {
  society: string; // es. "ERC 2021/2025", "ESC ACS 2023", "Surviving Sepsis Campaign 2021"
  year: number;
  keyRecommendation: string;
  evidenceLevel?: string;
}

export interface EmergencyDrug {
  id: string;
  name: string; // DCI (Generic)
  brandNames: string[]; // Italian market common brands
  drugClass: DrugClass;
  clinicalSetting: ClinicalSetting;
  emergencyIndications: TherapeuticIndication[];
  quickSummary: string;
  mechanismOfAction: string;
  dosages: DrugDosage[];
  renalAdjustment: RenalAdjustment;
  hepaticAdjustment: HepaticAdjustment;
  warnings: DrugWarning[];
  interactions: DrugInteraction[];
  guidelines: GuidelineReference[];
  monitoring: string[];
  antidote?: string;
  isHighAlert: boolean;
  pregnancy: PregnancySafety;
}


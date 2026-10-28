/**
 * Protocollo Clinico per la Gestione dei Sanguinamenti Acuti e delle Manovre Invasive in Acuto
 * in Corso di Terapia Anticoagulante
 * Sintesi delle Linee Guida Internazionali di Riferimento:
 * ISTH 2024, ESC AF 2024, ESAIC 2024, ACC 2020, AHA 2017, EHRA 2021, FCSA 2024.
 */

export interface ThromboembolicRiskCondition {
  category: string;
  criteria: string[];
}

export interface CutoffReference {
  anticoagulant: string;
  test: string;
  safeHighRisk: string;
  safeLowRisk: string;
  unsafeReverseIndicated: string;
  notes: string;
}

export interface ReversalSchemeDetail {
  drugName: string;
  firstLine: string;
  secondLine?: string;
  specificAntidote?: string;
  dosageRules: {
    condition: string;
    dose: string;
    notes?: string;
  }[];
  administration: string;
  laboratoryMonitoring: string;
  adjuvantTherapy: string[];
  safetyWarnings: string[];
}

export const PROTOCOL_METADATA = {
  title: 'Gestione Emostatica dei Sanguinamenti Acuti e Manovre Invasive in Anticoagulati',
  sources: 'Linee Guida Internazionali ISTH 2024 · ESC AF 2024 · ESAIC 2024 · ACC 2020 · AHA 2017 · FCSA 2024',
  scope: 'Pronto Soccorso, Medicina d\'Urgenza, Chirurgia d\'Urgenza e Terapia Intensiva / Anestesia',
  targetAudience: 'Medici d\'Urgenza, Anestesisti-Rianimatori, Cardiologi, Chirurghi',
};

// Tabella 1: Principali condizioni ad alto rischio tromboembolico basale (modificato da ACC / ESC)
export const HIGH_THROMBOEMBOLIC_RISK_CONDITIONS: ThromboembolicRiskCondition[] = [
  {
    category: 'Protesi valvolare meccanica con o senza Fibrillazione Atriale',
    criteria: [
      'Valvola meccanica mitralica (rischio maggiore di aortica) + fattori aggiuntivi (FA, Heart Failure, pregresso TIA/Stroke)',
      'Valvole di vecchia generazione (es. a gabbia con pallina / caged ball)',
      'Stroke / TIA recente (≤ 3 mesi)',
    ],
  },
  {
    category: 'Fibrillazione atriale non valvolare ad altissimo rischio',
    criteria: [
      'CHA₂DS₂-VASc ≥ 4',
      'Stroke / TIA recente (≤ 3 mesi)',
      'Rischio annuo stimato di stroke ≥ 10%/anno',
    ],
  },
  {
    category: 'Tromboembolismo venoso (TEV)',
    criteria: [
      'TEV recente (< 3 mesi)',
      'TEV non provocato o recidivante',
      'Neoplasia attiva + storia documentata di trombosi',
    ],
  },
  {
    category: 'Trombosi endocavitaria cardiaca',
    criteria: [
      'Post infarto miocardico recente con trombo in ventricolo sinistro (prime settimane/mesi)',
      'Trombosi documentata in atrio o auricola sinistra',
    ],
  },
];

// Cut-off plasmatici e di laboratorio per procedure e urgenze
export const CUTOFF_REFERENCES: CutoffReference[] = [
  {
    anticoagulant: 'DOAC (Apixaban, Rivaroxaban, Edoxaban, Dabigatran)',
    test: 'Attività anti-Xa con calibratore specifico (per A, E, R) / Tempo di trombina diluito dTT (per Dabigatran)',
    safeHighRisk: '< 30 ng/mL (livello sicuro per chirurgia maggiore, neurochirurgia, blocchi neuro-assiali, trombolisi sistemica)',
    safeLowRisk: '30 - 50 ng/mL (livello sicuro SOLO per procedure a basso/minimo rischio emorragico)',
    unsafeReverseIndicated: '> 50 ng/mL (livello NON sicuro: indicata reverse se procedura d\'urgenza/emergenza non differibile o chirurgia ad alto rischio)',
    notes: 'In emergenza se il dosaggio non è disponibile o l\'orario dell\'ultima assunzione è ignoto: considerare il paziente scoagulato e procedere a reverse se quadro critico.',
  },
  {
    anticoagulant: 'AVK (Warfarin / Acenocumarolo)',
    test: 'INR (International Normalized Ratio)',
    safeHighRisk: 'INR < 1.5 (valore sicuro per procedure chirurgiche ad alto rischio emorragico)',
    safeLowRisk: 'INR < 2.0 (valore tollerabile solo per manovre a basso rischio emorragico)',
    unsafeReverseIndicated: 'INR > 2.0 (o > 1.5 per chirurgia critica): indicata reverse con 4F-CCP + Vitamina K 10 mg EV in urgenza/emergenza',
    notes: 'Nei sanguinamenti maggiori la somministrazione di 4F-CCP deve essere sempre associata a Vitamina K 10 mg EV per garantire il mantenimento dell\'emostasi oltre le 6-8 ore di emivita del CCP.',
  },
  {
    anticoagulant: 'Eparina Non Frazionata (ENF)',
    test: 'aPTT ratio (> 1.5 v.n.) / Attività specifica anti-Xa (0.3 - 0.7 UI/mL)',
    safeHighRisk: 'aPTT ratio normale / Somministrazione interrotta da > 3 ore (emivita 60-90 min)',
    safeLowRisk: 'aPTT ratio moderatamente prolungato',
    unsafeReverseIndicated: 'Se somministrata da < 3 ore con sanguinamento in atto o chirurgia immediata: Protamina solfato 1 mg/100 UI di eparina (max 50 mg)',
    notes: 'Emivita breve (60-90 min). Se infusione sospesa da oltre 3 ore, la reversal farmacologica con protamina usualmente non è necessaria.',
  },
  {
    anticoagulant: 'Eparina a Basso Peso Molecolare (EBPM es. Enoxaparina)',
    test: 'Attività anti-Xa con calibratore specifico (intervallo terapeutico 0.4 - 1.2 UI/mL)',
    safeHighRisk: 'Somministrazione da > 12 ore (profilattica) o > 24 ore (terapeutica) / anti-Xa < 0.1 UI/mL',
    safeLowRisk: 'Somministrazione da > 8-12 ore',
    unsafeReverseIndicated: 'Se assunta da < 8 ore con sanguinamento maggiore: Protamina 1 mg ogni 100 UI di EBPM (usualmente in acuto 25 mg = 1/2 fiala)',
    notes: 'Se assunta da 8-12 ore: dose ridotta di protamina a 0.5 mg/100 UI. Oltre le 12 ore: spontanea eliminazione.',
  },
  {
    anticoagulant: 'Fondaparinux (Arixtra)',
    test: 'Attività anti-Xa specifica con calibratore fondaparinux (profilattico 0.39-0.50 mcg/mL; terapeutico 0.50-1.50 mcg/mL)',
    safeHighRisk: 'Somministrazione da > 24-36 ore (emivita terminale fino a 21 ore)',
    safeLowRisk: 'Somministrazione da > 18-24 ore',
    unsafeReverseIndicated: 'Non esiste antidoto approvato: solo sospensione, reintegro volemico e supporto emostatico',
    notes: 'Escrezione renale al 100%. Prestare massima attenzione in pazienti con insufficienza renale per marcato prolungamento dell\'emivita.',
  },
];

// Classificazione di Gravità dei Sanguinamenti (Criteri ISTH)
export const BLEEDING_SEVERITY_CRITERIA = {
  major: {
    title: 'Sanguinamento Maggiore (Life-threatening / Sedi Critiche)',
    indication: 'REVERSE INDICATA',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    criteria: [
      'Sanguinamento con instabilità emodinamica: PAS < 90 mmHg, calo PAS > 40 mmHg, calo ortostatico PAS > 20 / PAD > 10 mmHg, PAM < 65 mmHg continuo, diuresi < 0.5 mL/kg/h, segni di shock / ipoperfusione sistemica',
      'Sanguinamento in SEDE CRITICA: intracranica, intraspinale, intraoculare, pericardica, intra-articolare, intramuscolare con sindrome compartimentale, retroperitoneale',
      'Sanguinamento clinicamente manifesto con calo di Emoglobina ≥ 2 g/dL o che richiede emotrasfusione di ≥ 2 unità di emazie concentrate',
    ],
  },
  clinicallyRelevantNonMajor: {
    title: 'Sanguinamento Non Maggiore ma Clinicamente Rilevante (CRNMB)',
    indication: 'REVERSE DA CONSIDERARE',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    criteria: [
      'Emorragia toracica, pericardica, intraddominale, vie aeree, retroperitoneale, intra-articolare o intramuscolare che NON rischia di causare grave disabilità e non richiede emostasi chirurgica immediata',
      'Emorragia gastrointestinale senza shock/instabilità emodinamica',
      'Emorragia che necessita di ospedalizzazione o rivalutazione diagnostica strumentale ripetuta per definire la sede o l\'evoluzione clinica (es. trauma cranico con stillicidio)',
      'Necessità di supporto emotrasfusivo < 2 unità di emazie in presenza di comorbilità cardiopolmonari rilevanti, insufficienza d\'organo o fragilità neoplastica',
    ],
  },
  minor: {
    title: 'Sanguinamento Minore',
    indication: 'REVERSE NON INDICATA',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    criteria: [
      'Sanguinamento che non soddisfa i criteri di maggiore né di clinicamente rilevante',
      'Tipicamente: emorragie congiuntivali, epistassi anteriore lieve e comprimibile, ecchimosi cutanee non espansive, sanguinamento gengivale o ORL minore',
      'Sanguinamento mestruale isolato senza alterazioni emodinamiche o malattia emorragica sottostante',
    ],
  },
};

// Classificazione Tempistica Interventi e Rischio Emorragico Procedurale
export const SURGERY_TIMING_AND_RISK = {
  timing: [
    {
      type: 'emergenza',
      label: 'Emergenza (< 6 ore)',
      description: 'Da eseguire nel più breve tempo possibile entro 6 ore (es. rottura di viscere o occlusione meccanica, emorragia potenzialmente letale, rottura di aneurisma, neurochirurgia per ematoma intracranico).',
      reverseStatus: 'INDICATA',
      statusColor: 'text-red-700 bg-red-50 border-red-200',
    },
    {
      type: 'urgenza',
      label: 'Urgenza (6 - 24 ore)',
      description: 'Da eseguire tra 6 e 24 ore (es. frattura di femore nell\'anziano, ischemia critica acuta di arto).',
      reverseStatus: 'DA CONSIDERARE',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      type: 'semi-urgenza',
      label: 'Semi-Urgenza (24 - 48 ore)',
      description: 'Eseguibile tra 24 e 48 ore (es. colecistite acuta, diverticolite non perforata, ascesso drenabile).',
      reverseStatus: 'NON INDICATA',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ],
  bleedingRisk: [
    {
      level: 'alto',
      rate: '2 - 4% di rischio sanguinamento nei 2 giorni post-operatori',
      examples: [
        'Cardiochirurgia e chirurgia vascolare maggiore (aneurismi aortici, bypass vascolari)',
        'Neurochirurgia intracranica e spinale',
        'Chirurgia toracica e addominale maggiore',
        'Chirurgia ortopedica maggiore (artroprotesi d\'anca o ginocchio)',
        'Resezione transuretrale della prostata (TURP)',
        'Biopsie di organi parenchimatosi profondi (fegato, rene)',
        'Anestesia neuroassiale (spinale ed epidurale - intervalli ESAIC/ASRA > 24-48 ore)',
        'Endoscopia complessa (ERCP con sfinterotomia, polipectomie multiple o di ampi polipi)',
      ],
    },
    {
      level: 'basso',
      rate: '0 - 2% di rischio sanguinamento nei 2 giorni post-operatori',
      examples: [
        'Endoscopia digestiva diagnostica (con o senza biopsie mucose superficiali)',
        'Chirurgia oftalmica minore (cataratta)',
        'Piccola chirurgia dermatologica / escissioni cutanee superficiali',
        'Chirurgia odontoiatrica ambulatoriale',
      ],
    },
  ],
};

// Istruzioni per il Laboratorio d'Urgenza & Risposta Rapida
export const LAB_ROUTINE_INSTRUCTIONS = {
  turnaroundTime: 'Tempo di refertazione medio target: entro 60 minuti dal ricevimento del campione in laboratorio.',
  tubeType: '1 provetta con citrato di sodio TAPPO AZZURRO (2.7 mL). Scrivere sempre sulla provetta l\'orario esatto del prelievo.',
  sampleDelivery: 'Il campione deve pervenire in laboratorio entro 4 ore dal prelievo (entro 2 ore per test specialistici di 2° livello).',
  preAlert: 'Pre-allertare telefonicamente il Laboratorio d\'Urgenza dell\'invio critico per ottimizzare i tempi analitici.',
  keyPrinciple: 'L\'attesa dell\'esito del laboratorio NON DEVE MAI procrastinare le scelte terapeutiche di salvataggio in situazioni critiche o instabilità emodinamica!',
};

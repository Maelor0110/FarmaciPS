import { EmergencyDrug } from '../types/pharmacy';

export const ADDITIONAL_EMERGENCY_DRUGS_BATCH_5: Omit<EmergencyDrug, 'pregnancy'>[] = [
  // ==========================================
  // ICTUS ISCHEMICO ACUTO & FIBRINOLISI
  // ==========================================
  {
    id: 'tenecteplase',
    name: 'Tenecteplase (TNK-tPA)',
    brandNames: ['Metalyse'],
    drugClass: 'Fibrinolitici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Ictus Ischemico Acuto & Fibrinolisi', 'Tromboembolismo & SCA'],
    quickSummary: 'Attivatore ricombinante tissutale del plasminogeno (t-PA) modificato ad altissima specificità per la fibrina. Raccomandato dalle Linee Guida ESO 2024 come alternativa di prima linea ad Alteplase per l\'Ictus Ischemico Acuto entro 4.5 ore: somministrazione rapida in bolo singolo endovenoso in 5-10 secondi (senza infusione continua di 1 ora!).',
    mechanismOfAction: 'Si lega con affinità 14 volte superiore alla fibrina rispetto ad alteplase e presenta resistenza 80 volte maggiore all\'inibitore dell\'attivatore del plasminogeno (PAI-1). Converte il plasminogeno legato al coagulo in plasmina, dissolvendo rapidamente il trombo intravascolare con minore consumo di fibrinogeno sistemico.',
    dosages: [
      {
        indication: 'Ictus Ischemico Acuto entro 4.5 ore dall\'esordio (ESO Guidelines 2024)',
        bolusDose: '0.25 mg/kg (massimo 25 mg) somministrati in BOLO SINGOLO ENDOVENOSO rapido in 5-10 secondi.',
        preparation: 'Flacone liofilizzato da 50 mg (10.000 UI) ricostituito con la siringa pre-riempita di acqua p.p.i. (10 ml -> concentrazione 5 mg/ml o 1.000 UI/ml). Aspirare la dose calcolata sul peso corporeo (es. 70 kg = 17.5 mg = 3.5 ml; se >= 100 kg = 25 mg = 5 ml).',
        route: ['EV rapido'],
        clinicalTips: 'ESO 2024: Prima della somministrazione confermare assenza di emorragia cerebrale alla TC encefalo, score NIHSS e verificare che la pressione arteriosa sia rigorosamente < 185/110 mmHg (trattare con Labetalolo EV o Urapidil EV prima della lisi!).'
      },
      {
        indication: 'Infarto Miocardico Acuto con Sopraslivellamento del Tratto ST (STEMI) con tempo stimato per PCI > 120 min',
        bolusDose: 'Bolo singolo EV in 10 secondi basato sul peso: < 60 kg: 30 mg; 60-69 kg: 35 mg; 70-79 kg: 40 mg; 80-89 kg: 45 mg; >= 90 kg: 50 mg. Dimezzare la dose (50%) nei pazienti di età >= 75 anni.',
        preparation: 'Bolo EV diretto.',
        route: ['EV rapido'],
        clinicalTips: 'Co-somministrare con ASA, Clopidogrel ed Enoxaparina (studio STREAM).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (metabolismo epatico clearance epatica).',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard; cautela per coagulopatia associata.',
      childPughC: 'CONTROINDICATO se grave coagulopatia epatica (INR elevato, piastrinopenia < 100.000/mcL).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'RISCHIO DI EMORRAGIA CEREBRALE FATALE ED EMORRAGIE SISTEMICHE GRAVI',
        description: 'Controindicato in caso di emorragia endocranica pregressa, ictus ischemico o trauma cranico grave negli ultimi 3 mesi, malformazione artero-venosa o aneurisma, sanguinamento interno attivo, diatesi emorragica, terapia anticoagulante con INR > 1.7 o recente assunzione di DOAC (< 48h con attività residua), e pressione refrattaria > 185/110 mmHg.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anticoagulanti orali (DOAC, Warfarin) ed Eparine',
        severity: 'contraindicated',
        mechanism: 'Rischio emorragico massivo letale da lisi e scoagulazione combinata.',
        clinicalAdvice: 'Non somministrare fibrinolitici se il paziente assume anticoagulanti a meno di reversione documentata (es. Idarucizumab per Dabigatran).'
      }
    ],
    guidelines: [
      {
        society: 'European Stroke Organisation (ESO) Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Tenecteplase 0.25 mg/kg in bolo singolo EV è raccomandato come alternativa efficace e sicura ad Alteplase nell\'Ictus Ischemico Acuto entro 4.5 ore con il vantaggio cruciale del bolo singolo immediato prima del trasporto per trombectomia meccanica (drip-and-ship).',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Valutazione neurologica con scala NIHSS ogni 15 minuti durante la prima ora, poi ogni 30 min per 6 ore',
      'Pressione arteriosa continua (mantenere rigorosamente < 180/105 mmHg nelle 24h post-lisi)',
      'Sorveglianza segni di emorragia sistemica o cefalea acuta ingravescente con vomito'
    ],
    antidote: 'Acido Tranexamico 1 g EV + Fibrinogeno concentrato / Crio-precipitato in caso di emorragia cerebrale post-trombolisi',
    isHighAlert: true
  },

  // ==========================================
  // COLICA RENALE & ADDOME ACUTO
  // ==========================================
  {
    id: 'ketoprofene',
    name: 'Ketoprofene',
    brandNames: ['Artrosilene', 'Orudis', 'Ketoprofene Fiale'],
    drugClass: 'FANS & Analgesici non oppioidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Colica Renale & Addome Acuto', 'Dolore Acuto & Analgesia'],
    quickSummary: 'FANS derivato dell\'acido propionico ad elevatissima potenza analgesica ed anti-infiammatoria. Nei Pronto Soccorso italiani rappresenta il farmaco di prima scelta assoluta (EAU Guidelines 2024) per la Colica Renale Acuta, superiore agli oppioidi per la risoluzione del dolore e la riduzione del tono muscolare ureterale.',
    mechanismOfAction: 'Inibizione non selettiva delle ciclossigenasi (COX-1 e COX-2) con arresto della sintesi di prostaglandine renali (PGE2, PGI2). Nella colica renale acuta, riduce la pressione intrarenale, il flusso ematico glomerulare e il conseguente edema della parete ureterale nel punto di impatto del calcolo, riducendo lo spasmo muscolare liscio.',
    dosages: [
      {
        indication: 'Colica Renale / Ureterale Acuta da Litiasi',
        bolusDose: '100 mg (fiala da 100 mg/2 ml) o 160 mg (Artrosilene fiala da 160 mg/2 ml) diluiti in 100 ml di Soluzione Fisiologica o Glucosata 5% infusi EV in 15-20 minuti, oppure per via intramuscolare profonda.',
        maintenanceDose: '100-160 mg ogni 12 ore al bisogno (massimo 200 mg/die di ketoprofene base o 320 mg/die di sale di lisina).',
        preparation: 'Fiale da 100 mg o sale di lisina 160 mg/2 ml. Per via endovenosa diluire sempre in 100 ml SF.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'EAU Guidelines 2024: I FANS (Ketoprofene/Ketorolac) sono più efficaci degli oppioidi per la colica renale e riducono significativamente il ricorso a rescue medication e la nausea.'
      },
      {
        indication: 'Dolore Traumatico Acuto / Dolore Muscolo-Scheletrico Severo',
        bolusDose: '100 - 160 mg IM o EV lenta.',
        preparation: 'Come sopra.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'Associare IPP protettivo (Pantoprazolo 40 mg) nei pazienti a rischio gastrointestinale.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: ridurre la dose del 50% ed assicurare adeguata idratazione.',
      crclSevere: 'CrCl < 30 ml/min: CONTROINDICATO. I FANS bloccano la sintesi di prostaglandine vasodilatatrici renali precipitando un\'Insufficienza Renale Acuta emodinamica oligurica.',
      dialysis: 'Controindicato. Non rimosso con dialisi (legame proteico 99%).',
      nephrotoxicRisk: true,
      notes: 'Non somministrare mai se il paziente è disidratato o ipovolemico.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'CONTROINDICATO: rischio di sanguinamento gastrico da gastropatia ipertensiva portale e peggioramento dell\'insufficienza epatica/sindrome epatorenale.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Danno Renale Acuto in Pazienti Disidratati o con Nefropatia',
        description: 'L\'inibizione della sintesi di prostaglandine renali abolisce l\'autoregolazione dell\'arteriola afferente renale: grave rischio di IRA ischemica, specie se associato ad ACE-inibitori o diuretici (la cosiddetta "Triple Whammy").',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Gastrolesività ed Emorragia Digestiva Superiore',
        description: 'Controindicato in caso di ulcera peptica attiva, storia di sanguinamento gastrointestinale o perforazione.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anticoagulanti orali (Warfarin, DOAC) ed Antiaggreganti',
        severity: 'major',
        mechanism: 'Effetto antiaggregante da inibizione di trombossano A2 piastrinico associato a lesione della mucosa gastrica con marcato rischio emorragico.',
        clinicalAdvice: 'Evitare o usare paracetamolo come alternativa sicura.'
      },
      {
        interactingDrug: 'ACE-inibitori / Sartani e Diuretici dell\'ansa',
        severity: 'major',
        mechanism: 'Triplice insulto renale (Triple Whammy) con crollo immediato della filtrazione glomerulare.',
        clinicalAdvice: 'Monitorare la creatinina e la diuresi oraria.'
      }
    ],
    guidelines: [
      {
        society: 'European Association of Urology (EAU) Guidelines 2024',
        year: 2024,
        keyRecommendation: 'I FANS (come ketoprofene 100-160 mg EV) sono la terapia analgesica di prima scelta raccomandata per i pazienti con colica ureterale acuta, offrendo una migliore attenuazione del dolore e un minor tasso di recidiva rispetto agli oppioidi.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Valutazione della scala del dolore (NRS o VAS) a 15, 30 e 60 minuti',
      'Funzionalità renale (creatinina sierica ed eGFR) e diuresi',
      'Pressione arteriosa'
    ],
    isHighAlert: false
  },
  {
    id: 'butilscopolamina',
    name: 'Butilscopolamina Bromuro',
    brandNames: ['Buscopan', 'Butilscopolamina Fiale'],
    drugClass: 'Antispastici & Spasmolitici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Colica Renale & Addome Acuto', 'Dolore Acuto & Analgesia'],
    quickSummary: 'Ammonio quaternario derivato semisintetico della scopolamina dotato di potente azione spasmolitica mirata sulla muscolatura liscia del tratto gastroenterico, delle vie biliari e dell\'apparato genito-urinario. Farmaco cardine in PS per colica biliare, spasmi viscerali e terapia coadiuvante della colica renale.',
    mechanismOfAction: 'Antagonista competitivo selettivo dei recettori colinergici muscarinici (M2 ed M3) a livello delle cellule muscolari lisce viscerali e gangli intramurali. A causa della struttura quaternaria polare, non supera la barriera emato-encefalica (assenza di tossicità centrale anticolinergica a dosi terapeutiche).',
    dosages: [
      {
        indication: 'Colica Biliare Acuta / Spasmi Gastrointestinali Acuti / Dismenorrea Spastica',
        bolusDose: '20 mg (1 fiala da 20 mg/1 ml) EV lenta in 2-3 minuti o intramuscolare profonda. Ripetibile ogni 6-8 ore al bisogno (massimo 100 mg/die).',
        preparation: 'Fiala pronta da 20 mg/1 ml. Per somministrazione EV lenta diluire in 10 ml di Soluzione Fisiologica.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'Nella colica biliare acuta non complicata è il trattamento spasmolitico di prima linea; se dolore refrattario associare FANS o Paracetamolo EV.'
      },
      {
        indication: 'Colica Renale / Ureterale Spastica (Terapia coadiuvante)',
        bolusDose: '20 mg EV lenta somministrati insieme o subito dopo il FANS parenterale.',
        preparation: 'Fiala da 20 mg in 10-20 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'L\'associazione FANS + Butilscopolamina riduce il consumo di oppioidi di salvataggio.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (escrezione mista renale/biliare dei metaboliti).',
      dialysis: 'Dose standard.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard (basso metabolismo epatico).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Glaucoma ad Angolo Acuto e Ritenzione Urinaria da Ipertrofia Prostatica',
        description: 'Controindicato in caso di glaucoma ad angolo chiuso non trattato (midriasi con blocco del canale di Schlemm) e nell\'ipertrofia prostatica severa con rischio di ritenzione urinaria acuta con globo vescicale.',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Tachiaritmie cardiache e stenosi pilorica/ileo meccanico',
        description: 'Il blocco vagale può provocare tachicardia transitoria; controindicato nell\'occlusione intestinale meccanica o megacolon tossico.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Antidepressivi triciclici, antistaminici H1, neurolettici',
        severity: 'moderate',
        mechanism: 'Potenziamento degli effetti anticolinergici periferici (secchezza fauci, tachicardia, stipsi).',
        clinicalAdvice: 'Monitorare la frequenza cardiaca e il residuo urinario vescicale.'
      }
    ],
    guidelines: [
      {
        society: 'Emergency Medicine Visceral Pain Protocols & EAES Guidelines',
        year: 2023,
        keyRecommendation: 'Butilscopolamina 20 mg EV è un presidio efficace e sicuro per il rapido sollievo dello spasmo viscerale nella colica biliare acuta e negli spasmi gastroenterici non complicati.',
        evidenceLevel: 'Grado 1B'
      }
    ],
    monitoring: [
      'Frequenza cardiaca e pressione arteriosa',
      'Valutazione della diuresi e palpazione ipogastrica per escludere globo vescicale',
      'Monitoraggio del dolore addominale'
    ],
    isHighAlert: false
  },

  // ==========================================
  // AGITAZIONE PSICOMOTORIA & DELIRIUM
  // ==========================================
  {
    id: 'olanzapina',
    name: 'Olanzapina IM',
    brandNames: ['Zyprexa IM', 'Olanzapina Fiale'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Agitazione Psicomotoria & Delirium', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Antipsicotico atipico thienobenzodiazepinico di seconda generazione. Farmaco di prima scelta assoluta nei Pronto Soccorso per la gestione dell\'agitazione psicomotoria acuta severa associata a schizofrenia, disturbo bipolare o psicosi acuta: garantisce rapida tranquillizzazione senza eccessiva sedazione e con rischio extrapiramidale drasticamente inferiore rispetto ad Aloperidolo.',
    mechanismOfAction: 'Antagonismo ad alta affinità per i recettori dopaminergici D2, serotoninergici 5-HT2A e 5-HT2C, istaminergici H1 e alfa-1 adrenergici. L\'elevato rapporto di blocco 5-HT2A/D2 riduce i sintomi positivi dell\'agitazione e il delirio senza indurre rigidità extrapiramidale severa.',
    dosages: [
      {
        indication: 'Agitazione Psicomotoria Acuta Grave in Pronto Soccorso (Adulto)',
        bolusDose: '10 mg per via INTRAMUSCOLARE profonda (solitamente nel muscolo deltoide o quadrante supero-esterno del gluteo). Se risposta incompleta, è possibile somministrare una seconda dose da 5-10 mg dopo 2 ore (massimo 20 mg/die nell\'adulto; iniziare con 2.5-5 mg nell\'anziano).',
        preparation: 'Flacone liofilizzato da 10 mg ricostituito esclusivamente con 2.1 ml di acqua per preparazioni iniettabili (concentrazione 5 mg/ml). La soluzione deve essere limpida e gialla; iniettare entro 1 ora dalla ricostituzione.',
        route: ['IM'],
        clinicalTips: 'NICE Guidelines & American College of Emergency Physicians (ACEP): Olanzapina IM ha un tempo di inizio d\'azione di 15-30 minuti, con efficacia tranquillizzante superiore e minor rischio di acatisia rispetto ad Aloperidolo.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard 10 mg IM.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (eliminazione renale dei metaboliti inattivi); iniziare con 5 mg se paziente defedato.',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Iniziare con dose ridotta (5 mg IM).',
      childPughC: 'Metabolismo epatico esteso (CYP1A2/FMO). Ridurre la dose a 2.5 - 5 mg per clearance ritardata e monitorare la vigilanza.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'DIVIETO ASSOLUTO DI CO-SOMMINISTRAZIONE PARENTERALE RAVVICINATA CON BENZODIAZEPINE EV',
        description: 'La somministrazione concomitante o ravvicinata (< 1 ora) di Olanzapina IM con Benzodiazepine per via endovenosa (es. Diazepam EV o Lorazepam EV) è gravata da documentati decessi per collasso cardiocircolatorio improvviso, grave ipotensione e arresto respiratorio da depressione sinergica bulbare! Se è necessaria una BDZ, attendere almeno 1-2 ore.',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Ipotensione Ortostatica e Sincope',
        description: 'Il blocco alfa-1 adrenergico può indurre ipotensione posturale marcata e bradicardia o tachicardia riflessa; mantenere il paziente in decubito per almeno 1 ora post-iniezione.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Benzodiazepine EV (Diazepam, Lorazepam, Midazolam)',
        severity: 'contraindicated',
        mechanism: 'Grave sinergismo deprimente centrale ed emodinamico con collasso cardiopolmonare letale.',
        clinicalAdvice: 'NON associare per via parenterale nello stesso intervallo temporale (< 60-90 min).'
      },
      {
        interactingDrug: 'Farmaci che prolungano l\'intervallo QTc (Amiodarone, Aloperidolo, Macrolidi)',
        severity: 'major',
        mechanism: 'Effetto additivo sul prolungamento del QTc con rischio di Torsione di Punta.',
        clinicalAdvice: 'Eseguire ECG basale se possibile.'
      }
    ],
    guidelines: [
      {
        society: 'ACEP (American College of Emergency Physicians) & NICE Guidelines',
        year: 2024,
        keyRecommendation: 'Gli antipsicotici atipici parenterali come Olanzapina 10 mg IM sono raccomandati come opzione di prima linea per l\'agitazione psicomotoria acuta severa nei servizi di emergenza grazie al profilo favorevole di efficacia e tollerabilità neurologica.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa e frequenza cardiaca a 15, 30 e 60 minuti post-iniezione IM',
      'Frequenza respiratoria e saturazione SpO2 continua',
      'Livello di sedazione e reattività (Richmond Agitation-Sedation Scale - RASS)'
    ],
    isHighAlert: false
  },
  {
    id: 'clotiapina',
    name: 'Clotiapina',
    brandNames: ['Entumin', 'Clotiapina Fiale / Gocce'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Agitazione Psicomotoria & Delirium', 'Sedazione Procedurale & RSI', 'Ansia Acuta & Attacchi di Panico'],
    quickSummary: 'Neurolettico dibenzotiazepinico ad azione sedativa immediata e potente. Farmaco storico e di amplissimo impiego nei Pronto Soccorso italiani e nei Servizi Psichiatrici di Diagnosi e Cura (SPDC) per il controllo urgente dell\'agitazione violenta, dell\'aggressività acuta incoercibile e delle crisi psicotiche floride.',
    mechanismOfAction: 'Potente blocco dei recettori dopaminergici D2 centrali associato a spiccato antagonismo dei recettori istaminergici H1, colinergici muscarinici e alfa-1 adrenergici, inducendo una rapida e profonda de-escalation dell\'iperattività psicomotoria e sedazione.',
    dosages: [
      {
        indication: 'Agitazione Psicomotoria Severa / Aggressività Acuta / Crisi Psicotica Acuta in PS',
        bolusDose: '20 - 40 mg (1 o 2 fiale da 20 mg/2 ml) per via INTRAMUSCOLARE profonda o per via ENDOVENOSA LENTA (diluita in 10-20 ml SF ed iniettata in almeno 3-5 minuti sotto monitoraggio). In alternativa, se il paziente collabora: 10-20 gocce per os (soluzione 40 mg/ml; 10 gocce = 20 mg).',
        maintenanceDose: '20-40 mg ogni 8-12 ore secondo risposta clinica (massimo 120-160 mg/die in urgenza).',
        preparation: 'Fiale da 20 mg/2 ml pronte. Per EV lenta diluire sempre in fisiologica; MAI bolo EV rapido.',
        route: ['IM', 'EV lento', 'Sublinguale'],
        clinicalTips: 'L\'effetto sedativo compare entro 10-15 minuti per via EV/IM. Nei soggetti anziani o debilitati iniziare sempre con 10 mg (mezza fiala o 5 gocce) per prevenire grave ipotensione.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 25-50% per aumentata sensibilità agli effetti sedativi ed ipotensivi.',
      dialysis: 'Dose ridotta.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica severa (metabolismo epatico esteso con rischio precipitoso di encefalopatia epatica).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipotensione Arteriosa Acuta e Collasso da Bolo EV Rapido',
        description: 'La potente azione alfa-1 litica periferica induce marcata vasodilatazione con ipotensione posturale grave, vertigini e sincope. Iniettare per via EV solo lentamente a paziente supino.',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Sindrome Neurolettica Maligna (NMS) e Reazioni Distoniche Acute',
        description: 'Sorvegliare la comparsa di iperpiressia, rigidità muscolare a tubo di piombo, instabilità autonomica ed elevazione di CPK. Antidoto per crisi distoniche: Biperidene (Akineton) o antistaminici anticolinergici.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi, Benzodiazepine ed Alcool',
        severity: 'major',
        mechanism: 'Depressione respiratoria e sedazione profonda sinergica.',
        clinicalAdvice: 'Monitorare pulsossimetria e pressione arteriosa.'
      }
    ],
    guidelines: [
      {
        society: 'Linee Guida Nazionali Psichiatria d\'Urgenza & Emergenza Sanitaria',
        year: 2023,
        keyRecommendation: 'Clotiapina parenterale (20-40 mg IM o EV lenta) è indicata nei contesti di emergenza-urgenza ospedaliera per la sedazione tempestiva del paziente con grave agitazione psicomotoria e rischio per sé o per gli operatori.',
        evidenceLevel: 'Consenso degli Esperti'
      }
    ],
    monitoring: [
      'Pressione arteriosa clino- ed ortostatica e frequenza cardiaca',
      'Saturazione SpO2 e frequenza respiratoria',
      'Temperatura corporea e tono muscolare (sorveglianza NMS)'
    ],
    isHighAlert: false
  },

  // ==========================================
  // EMERGENZE METABOLICHE & DISIONIE
  // ==========================================
  {
    id: 'calcio-gluconato',
    name: 'Calcio Gluconato 10%',
    brandNames: ['Calcio Gluconato Fiale 10%'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emergenze Metaboliche & Disionie', 'Arresto Cardiaco / ACLS', 'Aritmie & Cardioversione'],
    quickSummary: 'Sale di calcio organico al 10% (1 fiala da 10 ml = 1 g di calcio gluconato = circa 2.2 mmol o 90 mg di calcio elementare). Presidio salvavita essenziale di prima linea per la CARDIOPROTEZIONE immediata nell\'Iperkaliemia Grave con alterazioni ECG, ipocalcemia sintomatica (tetania/convulsioni) e tossicità da calcio-antagonisti o magnesio. A differenza del Calcio Cloruro, ha osmolarità fisiologica ed è molto più sicuro per infusione periferica.',
    mechanismOfAction: 'Non abbassa la concentrazione plasmatica di potassio, ma agisce istantaneamente (entro 1-3 minuti) sul potenziale di membrana miocardico: ripristina la differenza tra potenziale di riposo e soglia di eccitabilità, stabilizzando il sarcolemma cardiaco e prevenendo la degenerazione in FV o asistolia.',
    dosages: [
      {
        indication: 'Iperkaliemia Severa con Segni ECG (Onde T a tenda, allargamento QRS, scomparsa onda P, ritmo a onda sinusoidale)',
        bolusDose: '10 - 20 ml di Calcio Gluconato 10% (1-2 fiale = 1-2 g) somministrati per via ENDOVENOSA LENTA in 3-5 minuti sotto monitoraggio ECG continuo. L\'effetto cardioprotettivo svanisce in 30-60 minuti; ripetere la dose se le anomalie ECG persistono dopo 5-10 minuti.',
        preparation: 'Fiale da 10 ml al 10% (1 g). Può essere iniettato direttamente in accesso venoso periferico ben pervio o diluito in 50-100 ml di Soluzione Fisiologica.',
        route: ['EV lento'],
        clinicalTips: 'ERC 2021/2025: Il calcio gluconato è il primo presidio da somministrare per salvare il paziente da arresto aritmico imminente, PRIMA di iniziare i trattamenti che abbassano il potassio (Insulina + Glucosata, Salbutamolo, Bicarbonato).'
      },
      {
        indication: 'Ipocalcemia Acuta Sintomatica Severa (Tetania, spasmo carpo-podalico, segno di Trousseau/Chvostek, prolungamento QTc)',
        bolusDose: '10 - 20 ml EV lenti in 10-15 minuti, seguiti se necessario da infusione continua (50-100 ml di Calcio Gluconato 10% in 500-1000 ml SF a 0.5-1.5 mg/kg/h di calcio elementare).',
        preparation: 'Fiale al 10%.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Correggere sempre contemporaneamente l\'eventuale ipomagnesiemia associata, che causa refrattarietà all\'azione del calcio e del PTH.'
      },
      {
        indication: 'Ipermagnesiemia Grave / Tossicità da Solfato di Magnesio (Abolizione ROT, depressione respiratoria)',
        bolusDose: '10 ml EV lenti in 5 minuti (antagonismo fisiologico diretto competitivo sui canali ionici).',
        preparation: 'Fiala pura in bolo lento.',
        route: ['EV lento'],
        clinicalTips: 'Antidoto ufficiale per sovradosaggio di magnesio in eclampsia o asma.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard d\'urgenza; monitorare la calcemia totale e ionizzata (escrezione renale).',
      dialysis: 'Dose standard in emergenza acuta.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard (il gluconato viene convertito a livello epatico, ma la liberazione di calcio è immediata in vivo).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'ARRESTO CARDIACO DA BOLO TROPPO RAPIDO E CAUTELA ESTREMA NELL\'INTOSSICAZIONE DA DIGOSSINA',
        description: 'La somministrazione EV rapida (< 2 minuti) può provocare vasodilatazione massiva con crollo pressorio, bradicardia grave, sincope e asistolia. Nei pazienti che assumono Digossina o con tossicità digitalica conclamata, il calcio aumenta drasticamente il rischio di aritmie ventricolari fatali (somministrare solo se iperkaliemia minacciosa per la vita, lentamente in 20-30 min).',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Incompatibilità Chimica Assoluta con Bicarbonato di Sodio e Fosfati',
        description: 'MAI miscelare o iniettare nella stessa linea endovenosa con Bicarbonato di Sodio: precipitazione istantanea insolubile di Calcio Carbonato bianco latte (rischio di embolia solida microvascolare e ostruzione del catetere venoso!). Eseguire flush accurato con SF tra le due somministrazioni.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Digossina (Digitale)',
        severity: 'contraindicated',
        mechanism: 'Sinergismo cardiotossico letale: il calcio intracellulare elevato scatena post-depolarizzazioni ritardate e FV refrattaria.',
        clinicalAdvice: 'Se possibile usare prima anticorpi anti-digossina (DigiFab); se calcio indispensabile, infondere lentissimamente in 30 minuti.'
      },
      {
        interactingDrug: 'Bicarbonato di Sodio 8.4%',
        severity: 'contraindicated',
        mechanism: 'Precipitazione chimica fisica istantanea di carbonato di calcio.',
        clinicalAdvice: 'Usare accessi venosi separati o lavare abbondantemente con 20 ml di fisiologica.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation Guidelines 2021/2025 & KDIGO Hyperkalemia Consensus',
        year: 2024,
        keyRecommendation: 'Calcio Gluconato 10% (10-20 ml EV lenti) è il presidio prioritario raccomandato per la stabilizzazione miocardica immediata nell\'iperkaliemia grave con alterazioni elettrocardiografiche.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Monitoraggio elettrocardiografico continuo durante l\'iniezione (normalizzazione QRS e onde T)',
      'Controllo emogasanalitico seriato (EGA: calcio ionizzato Ca++, potassio K+, pH)',
      'Pressione arteriosa e controllo della pervietà dell\'accesso venoso'
    ],
    isHighAlert: true
  },

  // ==========================================
  // GASTROENTEROLOGIA & EMORRAGIE DIGESTIVE
  // ==========================================
  {
    id: 'octreotide',
    name: 'Octreotide',
    brandNames: ['Sandostatin', 'Octreotide Fiale'],
    drugClass: 'Nitrati & Vasodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti', 'Colica Renale & Addome Acuto'],
    quickSummary: 'Analogo sintetico a lunga durata d\'azione della somatostatina naturale. Farmaco cardine raccomandato dalle linee guida EASL e Baveno VII per il trattamento d\'urgenza dell\'Emorragia Digestiva Superiore da Varici Esofagee o Gastriche nel paziente cirrotico e per le ulcere peptiche sanguinanti refrattarie. A differenza della terlipressina, non causa spasmo coronarico né contrazioni uterine miometriali (sicuro in gravidanza e cardiopatia ischemica).',
    mechanismOfAction: 'Inibisce selettivamente il rilascio di peptidi vasodilatatori splancnici (glucagone, VIP) inducendo vasocostrizione selettiva del letto arterioso mesenterico. Riduce drasticamente il flusso sanguigno nella vena porta e la pressione portale (gradiente pressorio venoso epatico HVPG), arrestando il sanguinamento dalle varici esofagee. Inibisce inoltre la secrezione acida gastrica e la motilità enterica.',
    dosages: [
      {
        indication: 'Sanguinamento Acuto da Varici Esofagee / Ipertensione Portale (Baveno VII Consensus)',
        bolusDose: 'Bolo endovenoso iniziale: 50 mcg EV lenti (in 2-3 minuti). Seguito immediatamente da infusione continua a 50 mcg/ora per 3-5 giorni.',
        maintenanceDose: '50 mcg/ora in infusione continua (1200 mcg/24 ore) mantenuta fino a 5 giorni post-emostasi endoscopica.',
        preparation: 'Fiale da 50 mcg, 100 mcg o 500 mcg/1 ml. Preparazione standard infusione: 1000 mcg (2 fiale da 500 mcg) in 500 ml di Soluzione Fisiologica 0.9% (concentrazione: 2 mcg/ml) -> velocità: 25 ml/ora (pari a 50 mcg/h).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 0.002,
          defaultDilutionText: '1000 mcg in 500 ml SF (2 mcg/ml)',
          unit: 'mcg/h',
          minRate: 25.0,
          maxRate: 100.0,
          defaultRate: 50.0,
          step: 5.0
        },
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Baveno VII: Iniziare l\'infusione vasoattiva (Octreotide o Terlipressina) il più precocemente possibile all\'arrivo in Pronto Soccorso, ancor prima di eseguire l\'esofagogastroduodenoscopia (EGDS).'
      },
      {
        indication: 'Ulcera Peptica Emorragica Severa Refrattaria / Fistola Entero-cutanea ad alta portata',
        bolusDose: '50 mcg EV bolo seguito da 25-50 mcg/ora EV continua.',
        preparation: 'Come sopra.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Associare sempre ad infusione continua di Inibitore di Pompa Protonica (Pantoprazolo 80 mg bolo + 8 mg/h).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la velocità di infusione del 25-50% (l\'insufficienza renale prolunga l\'emivita plasmatica).',
      dialysis: 'Dose ridotta del 50%. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard: clearance biliare/epatica ridotta ma i benefici emostatici superano i rischi di accumulo.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Fluttuazioni Glicemiche Marcate (Ipoglicemia o Iperglicemia)',
        description: 'Inibisce sia la secrezione di insulina che quella di glucagone e GH: può causare sia ipoglicemie severe (specie nel paziente cirrotico con ridotta riserva di glicogeno epatico) sia iperglicemia. Monitorare la glicemia capillare ogni 2-4 ore.',
        isQTC: true
      },
      {
        severity: 'moderate',
        title: 'Bradicardia Sinusale e disturbi di conduzione',
        description: 'Può rallentare la frequenza cardiaca ed allungare il QT: monitorare ECG se associato a farmaci bradizzanti.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti (Propranololo, Nadololo, Carvedilolo)',
        severity: 'major',
        mechanism: 'Effetto bradizzante additivo sul nodo seno-atriale.',
        clinicalAdvice: 'Sospendere i beta-bloccanti durante l\'emorragia attiva acuta e reintrodurli solo dopo stabilizzazione.'
      },
      {
        interactingDrug: 'Insulina ed Ipoglicemizzanti orali',
        severity: 'moderate',
        mechanism: 'Alterazione del fabbisogno insulinico per soppressione ormonale mista.',
        clinicalAdvice: 'Adeguare le dosi di insulina su stick glicemici seriati.'
      }
    ],
    guidelines: [
      {
        society: 'Baveno VII Consensus & EASL Liver Cirrhosis Guidelines',
        year: 2024,
        keyRecommendation: 'I farmaci vasoattivi come Octreotide (50 mcg bolo + 50 mcg/h EV) devono essere iniziati immediatamente al sospetto clinico di emorragia da varici e proseguiti per 3-5 giorni per prevenire il re-bleeding precoce.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Stabilità emodinamica (pressione arteriosa, frequenza cardiaca, emoglobina e diuresi)',
      'Glicemia capillare ogni 2-4 ore durante l\'infusione continua',
      'ECG e ritmo cardiaco'
    ],
    isHighAlert: false
  },

  // ==========================================
  // TOSSICOLOGIA D'URGENZA AVANZATA
  // ==========================================
  {
    id: 'idrossocobalamina',
    name: 'Idrossocobalamina (Vitamina B12a)',
    brandNames: ['Cyanokit'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Intossicazioni & Antidoti', 'Arresto Cardiaco / ACLS', 'Shock & Ipotensione'],
    quickSummary: 'Antidoto salvavita universale di prima scelta per l\'Intossicazione Acuta da Cianuro e per le vittime di Incendi in Ambienti Chiusi esposte a fumi tossici con inalazione di cianuro e monossido di carbonio. Indicato tempestivamente nei pazienti con arresto cardiaco, coma, grave instabilità emodinamica o acidosi lattica profonda (> 8-10 mmol/L). A differenza dei vecchi nitriti, non induce metaemoglobinemia ed è perfettamente sicuro anche in presenza di carbossiemoglobina (COHb).',
    mechanismOfAction: 'Ogni molecola di idrossocobalamina lega reversibilmente uno ione cianuro (CN-) sostituendo il gruppo idrossilico legato allo ione cobalto centrale, formando cianocobalamina (Vitamina B12 fisiologica non tossica) che viene eliminata innocuamente per via renale nelle urine.',
    dosages: [
      {
        indication: 'Intossicazione Severa da Cianuro / Inalazione di Fumi d\'Incendio con Shock, Coma o Lattati > 8 mmol/L',
        bolusDose: '5 g per via endovenosa (due flaconi da 2.5 g) infusi in 15 minuti. Se l\'instabilità emodinamica o il coma persistono, è possibile somministrare una seconda dose da 5 g infusa in 15-120 minuti (massimo 10 g totali).',
        preparation: 'Ogni flacone da 2.5 g viene ricostituito con 100 ml di Soluzione Fisiologica 0.9% (inclusa nel kit) e agitato capovolgendo il flacone per 60 secondi (concentrazione finale 25 mg/ml). Infondere con il deflussore dedicato.',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'ERC 2021/2025: Somministrare immediatamente sul posto o in Shock Room in caso di intossicazione da fumi da incendio con alterazione della coscienza, convulsioni, ipotensione severa o arresto cardiaco. Non attendere il dosaggio ematico del cianuro!'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard 5 g.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (antidoto salvavita tempo-dipendente). Possibile temporanea insufficienza renale transitoria da nefropatia da cristalli/pigmenti.',
      dialysis: 'Dose standard salvavita. La cianocobalamina è eliminabile con emodialisi.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard (antidoto salvavita).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Colorazione Rosso Vino di Cute, Mucose e Urine (Cromaturia)',
        description: 'L\'idrossocobalamina induce una marcata colorazione rosso porpora transitoria della pelle e delle urine (che permane per diversi giorni). Informare l\'équipe medica per non confondere con eritema da ustione o ematuria massiva.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Interferenza Spettrofotometrica con Esami di Laboratorio e Coossimetria',
        description: 'Il colore rosso intenso del siero altera temporaneamente la lettura automatica di laboratorio: falsa elevazione di bilirubina, emoglobina e AST/ALT, e falsa alterazione della coossimetria (SpO2 e COHb) ed emodialisi (allarme perdita ematica). Prelevare i campioni per EGA e laboratorio PRIMA di iniziare l\'infusione!'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Tiosolfato di Sodio, Bicarbonato di Sodio ed Epinefrina',
        severity: 'major',
        mechanism: 'Incompatibilità fisica e chimica diretta: non infondere nella stessa linea venosa.',
        clinicalAdvice: 'Usare lumi separati o lavare accuratamente la via venosa.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation Guidelines & European Cyanide Antidote Consensus',
        year: 2024,
        keyRecommendation: 'L\'Idrossocobalamina 5 g EV è l\'antidoto di prima scelta raccomandato per l\'intossicazione acuta da cianuro e fumi d\'incendio con acidosi lattica grave (lattati > 8 mmol/L) o instabilità neurologica/cardiovascolare.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Emogasanalisi seriata (monitoraggio della clearance dei lattati e dell\'acidosi metabolica)',
      'Pressione arteriosa continua (può indurre ipertensione transitoria per scavenging di NO vascolare)',
      'ECG e ritmo cardiaco'
    ],
    isHighAlert: true
  },

  // ==========================================
  // SINDROME CORONARICA ACUTA (SCA)
  // ==========================================
  {
    id: 'prasugrel',
    name: 'Prasugrel',
    brandNames: ['Efient'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Tromboembolismo & SCA'],
    quickSummary: 'Potente tienopiridina di terza generazione inibitore irreversibile del recettore piastrinico P2Y12. Nelle Linee Guida ESC 2023/2024 per le Sindromi Coronariche Acute (SCA), è l\'inibitore P2Y12 di prima scelta preferito rispetto a Ticagrelor e Clopidogrel nei pazienti sottoposti ad Angioplastica Coronarica Primaria (PCI), garantendo un\'inibizione piastrinica più rapida, potente e costante con riduzione comprovata di re-infarto e trombosi di stent.',
    mechanismOfAction: 'Profarmaco convertito a livello epatico in metabolita attivo che si lega irreversibilmente ai recettori P2Y12 dell\'ADP sulle piastrine, bloccando l\'attivazione della glicoproteina IIb/IIIa e prevenendo l\'aggregazione piastrinica per l\'intera durata di vita della piastrina (7-10 giorni).',
    dosages: [
      {
        indication: 'Sindrome Coronarica Acuta (STEMI / NSTE-ACS) sottoposta a Coronarografia / PCI (ESC Guidelines 2023)',
        bolusDose: 'DOSE DI CARICO (Loading Dose): 60 mg per os (6 compresse da 10 mg) somministrati in dose singola non appena l\'anatomia coronarica è nota o prima della PCI.',
        maintenanceDose: '10 mg una volta al giorno per os. RIDURRE a 5 mg/die se peso corporeo < 60 kg o età >= 75 anni.',
        preparation: 'Compresse rivestite da 10 mg e 5 mg.',
        route: ['Sublinguale'],
        clinicalTips: 'ESC ACS Guidelines 2023: Nello STEMI somministrare la dose di carico da 60 mg al momento della diagnosi o in sala emodinamica; nell\'NSTE-ACS evitare il pre-trattamento alla cieca prima della coronarografia anatomica.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (nessun aggiustamento di dose; i metaboliti inattivi sono escreti per via renale).',
      dialysis: 'Dose standard. Non dializzabile (legame proteico 98%).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica severa (aumentato rischio intrinseco di sanguinamento e deficit coagulativo).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CONTROINDICAZIONE ASSOLUTA: Pregresso TIA o Ictus Ischemico/Emorragico',
        description: 'Prasugrel è formalmente CONTROINDICATO in qualsiasi paziente con storia anamnestica di attacco ischemico transitorio (TIA) o ictus cerebrale di qualsiasi natura: nello studio TRITON-TIMI 38 ha dimostrato un aumento inaccettabile di emorragie intracraniche fatali senza beneficio clinico netto!',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Attenzione ai pazienti di età >= 75 anni o con peso < 60 kg',
        description: 'Nei pazienti anziani (>= 75 anni) l\'uso è generalmente sconsigliato salvo condizioni ad altissimo rischio trombotico (in tal caso dose ridotta a 5 mg/die). Nei pazienti con peso corporeo < 60 kg la dose di mantenimento deve essere tassativamente dimezzata a 5 mg/die per eccesso di sanguinamenti maggiori.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anticoagulanti orali (Warfarin, DOAC) ed Eparine',
        severity: 'major',
        mechanism: 'Marcato potenziamento del rischio emorragico maggiore.',
        clinicalAdvice: 'Se indicata triplice terapia (SCA + Fibrillazione Atriale), le linee guida ESC raccomandano preferibilmente Clopidogrel associato a DOAC singolo per ridurre il rischio emorragico.'
      },
      {
        interactingDrug: 'FANS (Ibuprofene, Ketoprofene, Ketorolac)',
        severity: 'major',
        mechanism: 'Aumento del rischio di sanguinamento gastrointestinale.',
        clinicalAdvice: 'Evitare l\'uso concomitante di FANS.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Acute Coronary Syndromes (ACS) Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Prasugrel (carico 60 mg, mantenimento 10 mg/die) è raccomandato in preferenza a Ticagrelor nei pazienti con SCA sottoposti a PCI (sulla base del trial randomizzato ISAR-REACT 5).',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Segni clinici di sanguinamento mucoso o gastrointestinale e ferita dell\'accesso vascolare radiale/femorale',
      'Emocromo con piastrine ed emoglobina',
      'Pressione arteriosa'
    ],
    isHighAlert: true
  },

  // ==========================================
  // INFEZIONI INTRA-ADDOMINALI & SEPSI
  // ==========================================
  {
    id: 'metronidazolo',
    name: 'Metronidazolo EV',
    brandNames: ['Deflamon', 'Metronidazolo Fiale'],
    drugClass: 'Antibiotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Infezione & Sepsi', 'Colica Renale & Addome Acuto'],
    quickSummary: 'Antibiotico di riferimento della classe dei nitroimidazoli ad eccellente attività battericida mirata contro i batteri anaerobi obbligati (Bacteroides fragilis, Clostridioides, Fusobacterium) e protozoi. Pilastro fondamentale in Pronto Soccorso nei regimi di combinazione per la sepsi intra-addominale (perforazione viscerale, peritonite, appendicite acuta complicata, diverticolite, ascesso epatico e pelvico).',
    mechanismOfAction: 'Penetra passivamente nella cellula batterica dove il suo gruppo nitro viene ridotto da enzimi anaerobi a metaboliti intermedi citotossici radicalici a vita breve. Questi reagiscono con il DNA batterico rompendone i filamenti ed inibendo irreversibilmente la sintesi di acidi nucleici con lisi cellulare rapida.',
    dosages: [
      {
        indication: 'Infezioni Intra-addominali Complicate / Peritonite Acuta da Perforazione / Sepsi Addominale (SIS/WSES Guidelines 2024)',
        bolusDose: '500 mg (flacone da 500 mg/100 ml) infusi per via endovenosa in 30-60 minuti. Ripetere 500 mg ogni 8 ore (o dose di carico iniziale di 1000 mg nei casi critici settici).',
        maintenanceDose: '500 mg EV ogni 8 ore (o 1000 mg ogni 12 ore) in associazione a Cefalosporina di 3a generazione (Ceftriaxone) o Fluorochinolone.',
        preparation: 'Flacone pronto per infusione endovenosa da 500 mg/100 ml (5 mg/ml). Non richiede ulteriore diluizione.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'WSES 2024: Non necessario se il paziente assume già piperacillina/tazobactam o carbapenemico (meropenem), che possiedono già uno spettro anti-anaerobio massimale intrinseco!'
      },
      {
        indication: 'Colite Pseudomembranosa da Clostridioides difficile (Forma non severa)',
        bolusDose: '500 mg per os/EV ogni 8 ore per 10 giorni (alternativa a Vancomicina orale).',
        preparation: 'Flacone pronto EV o compresse da 250-500 mg.',
        route: ['EV lento', 'Sublinguale'],
        clinicalTips: 'Nelle forme severe di colite da C. difficile con shock la vancomicina per os è preferita, ma metronidazolo EV può essere associato in caso di ileo paralitico.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard 500 mg ogni 8 ore.',
      crclModerate: 'Dose standard.',
      crclSevere: 'CrCl < 15 ml/min: ridurre la dose del 50% (500 mg ogni 12 ore) per accumulo dei metaboliti attivi ossidati.',
      dialysis: 'Dose aggiuntiva post-emodialisi (rimosso ampiamente durante il trattamento emodialitico).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Metabolismo epatico al 60-80%. Clearance drasticamente ridotta: dimezzare la dose (500 mg ogni 12 ore o 250 mg ogni 8 ore) con stretto monitoraggio della tossicità neurologica periferica.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Effetto Disulfiram-Simile (Reazione Antabuse) con Alcool',
        description: 'L\'assunzione contemporanea di alcool etilico provoca accumulo tossico di acetaldeide con flushing cutaneo intenso, vampate, nausea, vomito a getto, tachicardia e collasso ipotensivo. Vietare l\'assunzione di alcool durante e per almeno 48h dopo la sospensione.',
        isQTC: true
      },
      {
        severity: 'moderate',
        title: 'Neurotossicità Centrale e Periferica con Trattamenti Prolungati',
        description: 'Può causare sapore metallico sgradevole, neuropatia periferica sensitivo-motoria, parestesie, atassia, vertigini e raramente convulsioni.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Warfarin (Coumadin) e dicumarolici',
        severity: 'major',
        mechanism: 'Potente inibizione del metabolismo del Warfarin (CYP2C9) con allungamento esponenziale dell\'INR e grave rischio emorragico.',
        clinicalAdvice: 'Monitorare l\'INR frequentemente e ridurre la dose di Warfarin del 30-50%.'
      },
      {
        interactingDrug: 'Alcool etilico (etanolo)',
        severity: 'contraindicated',
        mechanism: 'Inibizione dell\'aldeide deidrogenasi con reazione disulfiramica grave.',
        clinicalAdvice: 'Astensione totale da bevande alcoliche.'
      }
    ],
    guidelines: [
      {
        society: 'World Society of Emergency Surgery (WSES) & SIS Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Metronidazolo 500 mg EV ogni 8 ore combinato con Ceftriaxone 2 g EV è uno dei regimi empirici cardine di prima scelta raccomandati per le infezioni intra-addominali acute comunitarie complicate.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Valutazione della risposta clinica (temperatura, conta leucocitaria neutrofila, PCR e lattati)',
      'Sorveglianza peritonitica (riduzione del dolore addominale e ripresa della canalizzazione)',
      'Segni di neurotossicità o neuropatia periferica'
    ],
    isHighAlert: false
  }
];

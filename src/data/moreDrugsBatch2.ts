import { EmergencyDrug } from '../types/pharmacy';

export const ADDITIONAL_EMERGENCY_DRUGS_BATCH_2: Omit<EmergencyDrug, 'pregnancy'>[] = [
  {
    id: 'aloperidolo',
    name: 'Aloperidolo EV / IM',
    brandNames: ['Haldol', 'Serenase'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Agitazione Psicomotoria & Delirium', 'Convulsioni & Neurologia d\'Urgenza', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Antipsicotico tipico butirrofenone ad alta potenza. Farmaco di prima linea per la gestione dell\'agitazione psicomotoria acuta severa, delirium iperattivo nel paziente critico in PS o reparto e psicosi acuta.',
    mechanismOfAction: 'Potente antagonista selettivo dei recettori dopaminergici D2 post-sinaptici nel sistema mesolimbico ed extrapiramidale, riducendo le allucinazioni, il delirio e l\'eccitamento psicomotorio. Debole attività alfa-1 e anticolinergica (minima ipotensione rispetto ad altri neurolettici).',
    dosages: [
      {
        indication: 'Delirium Iperattivo Grave / Agitazione Psicomotoria Acuta Pericolosa',
        bolusDose: '1 - 5 mg IM o EV lento (in almeno 2-3 minuti). Ripetibile dopo 20-30 minuti a dose raddoppiata se agitazione refrattaria (massimo 15-20 mg/die; nell\'anziano iniziare con 0.5 - 1 mg).',
        preparation: 'Fiale da 2 mg/1 ml o 5 mg/1 ml. Per somministrazione EV diluire in 10-20 ml di Soluzione Fisiologica o Glucosata 5% ed iniettare lentamente sotto monitoraggio ECG continuo.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'Nell\'anziano con delirium ipoattivo non somministrare antipsicotici. Nell\'agitazione severa l\'associazione con basse dosi di Lorazepam (1-2 mg) o Midazolam aumenta l\'efficacia e riduce gli effetti collaterali extrapiramidali.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Nessun aggiustamento renale (metabolismo epatico esteso).',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50% (metabolismo epatico via CYP3A4 e glucuronidazione).',
      childPughC: 'Ridurre drasticamente la dose; clearance diminuita e rischio aumentato di sedazione profonda ed encefalopatia.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'ALLUNGAMENTO DEL TRATTO QTc E TORSIONE DI PUNTA (TdP)',
        description: 'La somministrazione EV di aloperidolo prolunga l\'intervallo QTc e può scatenare Torsione di Punta e fibrillazione ventricolare fatale, specie a dosi > 5-10 mg, con QTc basale > 500 ms, ipopotassiemia/ipomagnesiemia o in co-somministrazione con Amiodarone/Macrolidi/Chinolonici. Eseguire sempre ECG basale!',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Sindrome Neurolettica Maligna (NMS) e Distonie Acute',
        description: 'Possibile insorgenza di crisi distonica acuta (oculogira, trisma, torcicollo: trattabile con Biperidene 5 mg EV) o Sindrome Neurolettica Maligna (ipertermia > 40°C, rigidità muscolare a tubo di piombo, instabilità autonomica e rabdomiolisi con CPK elevate).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Amiodarone / Farmaci allunganti il QTc',
        severity: 'contraindicated',
        mechanism: 'Effetto sinergico grave sul blocco dei canali del potassio con rischio moltiplicato di Torsione di Punta.',
        clinicalAdvice: 'Evitare l\'associazione; preferire benzodiazepine per l\'agitazione nel paziente con QT lungo o in amiodarone.'
      },
      {
        interactingDrug: 'Levodopa e Agonisti Dopaminergici',
        severity: 'contraindicated',
        mechanism: 'Antagonismo dopaminergico diretto: precipita blocco motorio acuto nel malato di Parkinson.',
        clinicalAdvice: 'Nel Parkinson con psicosi/delirium preferire Quetiapina a basse dosi.'
      }
    ],
    guidelines: [
      {
        society: 'PADIS Critical Care Delirium Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Aloperidolo a basse dosi per brevi periodi è raccomandato per la gestione dell\'agitazione acuta severa che mette a rischio l\'incolumità del paziente o del personale in terapia intensiva o PS, sotto monitoraggio elettrocardiografico continuo.',
        evidenceLevel: 'Grado 1B'
      }
    ],
    monitoring: [
      'Telemetria ECG continua (intervallo QTc e frequenza cardiaca)',
      'Potassiemia e magnesiemia (mantenere K+ >= 4.0, Mg2+ >= 2.0)',
      'Valutazione della comparsa di rigidità muscolare e febbre (screening NMS)'
    ],
    antidote: 'Biperidene (Akineton 5 mg EV/IM per crisi distoniche acute)',
    isHighAlert: true
  },
  {
    id: 'levosimendan',
    name: 'Levosimendan',
    brandNames: ['Simdax'],
    drugClass: 'Vasopressori & Inotropi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['EPA & Insufficienza Cardiaca', 'Shock & Ipotensione'],
    quickSummary: 'Inodilatatore sensibilizzante al calcio della troponina C cardiaca. Indicato nello shock cardiogeno o nell\'insufficienza cardiaca acuta a bassa portata, particolarmente efficace nei pazienti in terapia cronica con beta-bloccanti o con ischemia acuta.',
    mechanismOfAction: 'Aumenta la sensibilità della troponina C al calcio durante la sistole senza aumentare i livelli intracellulari di calcio (inotropismo positivo senza aumento del consumo di ossigeno miocardico né rischio aritmico catecolaminico). Apre inoltre i canali del potassio ATP-dipendenti (K-ATP) nella muscolatura liscia vascolare (potente vasodilatazione arteriosa sistemica, coronarica e venosa). Genera il metabolita attivo OR-1896 con emivita prolungata di 70-80 ore (effetto che dura 7-10 giorni dopo 24 ore di infusione).',
    dosages: [
      {
        indication: 'Scompenso Cardiaco Acuto a Bassa Gittata / Shock Cardiogeno con PAS > 85-90 mmHg',
        maintenanceDose: 'Infusione continua: iniziare a 0.05 - 0.1 mcg/kg/min per 2-3 ore; se tollerata e PAS stabile, incrementare a 0.2 mcg/kg/min per un totale di 24 ore continue.',
        preparation: 'Flacone da 12.5 mg/5 ml (2.5 mg/ml). Diluire 1 flacone (12.5 mg) in 500 ml di Glucosata 5% o Soluzione Fisiologica -> Concentrazione: 25 mcg/ml (0.025 mg/ml).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 0.025,
          defaultDilutionText: '12.5 mg in 500 ml G5% (25 mcg/ml)',
          unit: 'mcg/kg/min',
          minRate: 0.05,
          maxRate: 0.2,
          defaultRate: 0.1,
          step: 0.05
        },
        route: ['Infusione continua'],
        clinicalTips: 'NON ESEGUIRE IL BOLO DI CARICO iniziale (6-12 mcg/kg) in emergenza: causa ipotensione marcata severa! Avviare direttamente l\'infusione continua senza bolo.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: dose standard; monitorare pressione arteriosa.',
      crclSevere: 'CrCl < 30 ml/min: CONTROINDICATO da scheda tecnica per accumulo del metabolita attivo OR-1896 ed eliminazione rallentata.',
      dialysis: 'Controindicato.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Usare con cautela a dosi dimezzate.',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica severa.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ipotensione Arteriosa Marcata e Tachiaritmie',
        description: 'La potente vasodilatazione può indurre severo calo pressorio, specie in presenza di ipovolemia o se associato a vasodilatatori. Richiede PAS basale > 85-90 mmHg. In shock ipoteso associare sempre Noradrenalina per mantenere la PAM di perfusione.',
        requiresCVC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Nitrati e altri vasodilatatori ad alte dosi',
        severity: 'major',
        mechanism: 'Vasodilatazione sinergica e grave ipotensione.',
        clinicalAdvice: 'Ridurre la dose dei vasodilatatori.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Heart Failure Guidelines 2023 Update',
        year: 2023,
        keyRecommendation: 'Levosimendan è raccomandato nei pazienti con shock cardiogeno o insufficienza cardiaca acuta a bassa portata in trattamento cronico con beta-bloccanti, poiché agisce a valle del recettore adrenergico senza competere con il blocco beta.',
        evidenceLevel: 'Classe IIb, Livello B'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua (NIBP o linea arteriosa)',
      'Telemetria ECG continua (tachicardia riflessa o fibrillazione atriale)',
      'Diuresi oraria e lattati'
    ],
    isHighAlert: true
  },
  {
    id: 'nicardipina',
    name: 'Nicardipina EV',
    brandNames: ['Perdipina EV'],
    drugClass: 'Calcio-antagonisti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Crisi Ipertensiva & Dissecazione', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Calcio-antagonista diidropiridinico vasodilatatore arterioso selettivo ad azione rapida e titolabile per via endovenosa. Farmaco di scelta nelle emergenze ipertensive con emorragia intracranica (ICH), stroke ischemico pre-trombolisi e dissecazione aortica.',
    mechanismOfAction: 'Inibisce selettivamente i canali del calcio di tipo L della muscolatura liscia arteriosa sistemica e cerebrale, provocando potente vasodilatazione arteriosa e riduzione delle resistenze periferiche senza deprimere la contrattilità miocardica (nessun effetto inotropo negativo) e senza indurre venodilatazione o aumento della pressione intracranica.',
    dosages: [
      {
        indication: 'Emergenza Ipertensiva / Emorragia Intracranica Acuta (Target PAS 140 mmHg) / Ictus Ischemico',
        maintenanceDose: 'Iniziare l\'infusione a 5 mg/h; incrementare di 2.5 mg/h ogni 5-15 minuti fino a target pressorio (massimo 15 mg/h). Una volta raggiunta la pressione target, ridurre a dose di mantenimento di 3 mg/h.',
        preparation: 'Fiale da 10 mg/10 ml o flaconi pronti da 20 mg/200 ml. Diluire 25 mg (2 fiale e mezza) in 250 ml di Glucosata 5% o SF (conc. 0.1 mg/ml = 100 mcg/ml) oppure 50 mg in 50 ml per pompa siringa.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 1.0,
          defaultDilutionText: '50 mg in 50 ml SF (1 mg/ml)',
          unit: 'mg/h',
          minRate: 2.5,
          maxRate: 15.0,
          defaultRate: 5.0,
          step: 2.5
        },
        route: ['Infusione continua'],
        clinicalTips: 'Ha una prevedibilità di titolazione superiore rispetto a Urapidil e Nitroprussiato. Cambiare sito venoso periferico ogni 12 ore per evitare flebite locale chimica.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard titolata su PA.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Titolare con cautela a incrementi più lenti (1.25-2.5 mg/h).',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la velocità iniziale a 2.5 mg/h; metabolismo epatico via CYP3A4.',
      childPughC: 'Clearance epatica marcatamente ridotta. Iniziare con dosi minime e monitorare continuamente.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Flebite chimica periferica',
        description: 'La soluzione è irritante per le vene: somministrare preferibilmente via CVC o vene periferiche di grosso calibro cambiando accesso ogni 12 ore.',
        extravasationRisk: true
      },
      {
        severity: 'high',
        title: 'Calo pressorio eccessivo nello stroke acuto',
        description: 'Non abbattere la pressione oltre i target raccomandati dalle linee guida (nello stroke ischemico mantenere PAS < 185 prima di rt-PA; nell\'emorragia cerebrale target PAS 140 mmHg senza scendere sotto 130 mmHg).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti',
        severity: 'moderate',
        mechanism: 'Effetto antiipertensivo sinergico.',
        clinicalAdvice: 'Eccellente sinergia terapeutica nella dissecazione aortica acuta per prevenire tachicardia riflessa.'
      }
    ],
    guidelines: [
      {
        society: 'ESO / AHA Stroke & Hypertension Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Nicardipina EV in infusione continua titolata è raccomandata come farmaco di prima scelta per il controllo pressorio acuto nell\'emorragia intracranica spontanea e nell\'ictus ischemico candidato a trombolisi.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua (ogni 5 minuti durante titolazione)',
      'Frequenza cardiaca continua',
      'Valutazione neurologica (GCS, NIHSS)'
    ],
    isHighAlert: false
  },
  {
    id: 'insulina-regolare',
    name: 'Insulina Regolare Rapida EV',
    brandNames: ['Actrapid', 'Humulin R'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emergenze Metaboliche & Disionie', 'Intossicazioni & Antidoti', 'Arresto Cardiaco / ACLS'],
    quickSummary: 'Insulina umana solubile endovenosa ad azione rapida. Trattamento cardine nella Chetoacidosi Diabetica (DKA), nello Stato Iperglicemico Iperosmolare (HHS), nello shift cellulare dell\'iperkaliemia grave e nella terapia ad alte dosi (HDIE) per lo shock tossico da calcio-antagonisti e beta-bloccanti.',
    mechanismOfAction: 'Si lega al recettore tirosin-chinasico dell\'insulina: promuove la captazione cellulare di glucosio nel muscolo e nel tessuto adiposo (via traslocazione del GLUT4), stimola la pompa Na+/K+ ATPasi facendo entrare rapidamente il potassio nelle cellule e inibisce la lipolisi e la chetogenesi epatica. Nello shock da calcio-antagonisti (HDIE) ripristina il metabolismo dei carboidrati nei miociti cardiaci aumentandone contrattilità e gettata.',
    dosages: [
      {
        indication: 'Iperkaliemia Grave con Rischio di Arresto Cardiaco (Shift Intracellulare)',
        bolusDose: '10 UI di Insulina Regolare EV in bolo somministrate CONTESTUALMENTE a 50 ml di Glucosata 33% o 50% (o 500 ml di Glucosata 10%) infusi in 15-30 minuti.',
        preparation: 'Prelevare 10 UI con siringa da insulina (0.1 ml della fiala da 100 UI/ml) e iniettare in bolo EV, seguita immediatamente dal bolo glucosato.',
        route: ['EV rapido'],
        clinicalTips: 'Abbassa la potassiemia di 0.5 - 1.2 mEq/L entro 15 minuti, con effetto per 4-6 ore. MONITORARE GLICEMIA OGNI 30-60 MINUTI per prevenire ipoglicemia iatrogena grave tardiva!'
      },
      {
        indication: 'Chetoacidosi Diabetica (DKA) / Stato Iperglicemico Iperosmolare (HHS)',
        maintenanceDose: 'Infusione continua a 0.1 UI/kg/h (circa 5-8 UI/h) senza bolo iniziale (oppure bolo 0.1 UI/kg seguito da 0.1 UI/kg/h) titolata per calo glicemico di 50-75 mg/dL all\'ora.',
        preparation: '50 UI di Insulina Regolare in 50 ml di Soluzione Fisiologica 0.9% in siringa per pompa -> Concentrazione: 1 UI/ml. Spurgare 20 ml prima dell\'uso (l\'insulina aderisce alle pareti plastiche del deflussore).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 1.0,
          defaultDilutionText: '50 UI in 50 ml SF (1 UI/ml)',
          unit: 'UI/h',
          minRate: 1.0,
          maxRate: 20.0,
          defaultRate: 7.0,
          step: 1.0
        },
        route: ['Infusione continua'],
        clinicalTips: 'NON iniziare l\'infusione se il potassio plasmatico è < 3.3 mEq/L (rischio arresto cardiaco da ipokaliemia indotta!). Quando la glicemia scende sotto 200-250 mg/dL, associare Glucosata 5% o 10% mantenendo l\'insulina per chiudere il gap anionico.'
      },
      {
        indication: 'Overdose Severa da Calcio-Antagonisti con Shock Refrattario (Terapia HDIE)',
        bolusDose: 'Bolo iniziale di 1 UI/kg EV + infusione continua di 1 - 10 UI/kg/h associata a Glucosata concentrata per mantenere euglicemia (100-200 mg/dL) e reintegro di potassio.',
        preparation: 'Pompa siringa.',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Riconosciuta come terapia salvavita di prima linea nei centri antiveleni mondiali per il ripristino inotropo miocardico.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: ridurre il fabbisogno del 25% per ridotta degradazione renale.',
      crclSevere: 'CrCl < 30 ml/min: ridurre del 50% per prolungamento marcato dell\'emivita dell\'insulina e rischio elevatissimo di ipoglicemia protratta.',
      dialysis: 'Dose ridotta del 50%.',
      nephrotoxicRisk: false,
      notes: 'I reni filtrano e degradano circa il 30-40% dell\'insulina endogena ed esogena: l\'insufficienza renale prolunga l\'azione dell\'insulina.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Monitoraggio frequente glicemia.',
      childPughC: 'Il fegato cirrotico ha ridotta glicogenolisi e gluconeogenesi: alto rischio di ipoglicemie severe.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'IPOGLICEMIA SEVERA E ARRESTO CARDIACO DA IPOKALIEMIA',
        description: 'L\'ipoglicemia iatrogena severa (< 40 mg/dL) provoca coma, convulsioni e danno cerebrale permanente. Il trattamento dell\'iperkaliemia con insulina senza adeguato apporto di glucosio o monitoraggio prolungato causa ipoglicemia sintomatica tardiva nel 15-20% dei pazienti a distanza di 2-3 ore. Inoltre, se somministrata con potassio basale basso, può causare fibrillazione ventricolare!',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti',
        severity: 'major',
        mechanism: 'I beta-bloccanti mascherano i sintomi vegetativi d\'allarme dell\'ipoglicemia (tachicardia, tremori, ansia), lasciando solo la sudorazione profusa.',
        clinicalAdvice: 'Monitoraggio orario della glicemia capillare.'
      }
    ],
    guidelines: [
      {
        society: 'ADA Standards of Care & ERC Resuscitation 2024',
        year: 2024,
        keyRecommendation: 'Insulina Regolare 10 UI EV con Glucosata è raccomandata come prima scelta per lo shift intracellulare rapido del potassio nell\'iperkaliemia grave. Nella DKA l\'infusione continua a 0.1 UI/kg/h è il gold standard.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Glicemia capillare oraria obbligatoria durante l\'infusione continua',
      'Potassiemia sierica ed emogasanalisi arteriosa (pH, bicarbonati, anion gap) ogni 2 ore nella DKA',
      'Monitoraggio ECG continuo per aritmie ipo/iperkaliemiche'
    ],
    antidote: 'Glucosata 33% o 50% EV (fiale da 20-50 ml) o Glucagone 1 mg IM',
    isHighAlert: true
  },
  {
    id: 'glucosata-33',
    name: 'Glucosata 33% - 50% EV',
    brandNames: ['Glucosio 33% Fiale 10 ml', 'Glucosio 50% Flaconi'],
    drugClass: 'Soluzioni osmotiche & Cristalloidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emergenze Metaboliche & Disionie', 'Intossicazioni & Antidoti', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Soluzione ipertonica di glucosio ad alta concentrazione (Glucosata 33%: 330 mg/ml; Glucosata 50%: 500 mg/ml). Trattamento d\'emergenza salvavita immediato dell\'Ipoglicemia Grave con perdita di coscienza, coma o convulsioni nel paziente adulto in Pronto Soccorso.',
    mechanismOfAction: 'Ripristina istantaneamente la concentrazione plasmatica di glucosio e il gradiente di diffusione cerebrale, interrompendo la neuroglicopenia acuta e prevenendo la necrosi neuronale irreversibile entro 1-3 minuti dall\'iniezione endovenosa.',
    dosages: [
      {
        indication: 'Coma Ipoglicemico / Ipoglicemia Grave Sintomatica (Glicemia < 54 mg/dL con alterazione neurologica)',
        bolusDose: 'Adulto: 20 - 50 ml di Glucosata 33% (circa 7 - 16 g di glucosio puro) o 25-50 ml di Glucosata 50% EV in bolo lento in 2-3 minuti.',
        preparation: 'Fiale da 10 ml o 20 ml al 33% (o flaconcini al 50%). Iniettare direttamente in vena periferica di calibro adeguato.',
        route: ['EV rapido'],
        clinicalTips: 'Il risveglio neurologico avviene tipicamente entro 2-5 minuti. Ricontrollare la glicemia capillare dopo 10-15 minuti. Se l\'ipoglicemia è secondaria a ipoglicemizzanti orali a lunga durata (Sulfoniluree, es. Glibenclamide, Glimepiride), ricoverare il paziente e mantenere infusione continua di Glucosata 10% per almeno 24-48 ore per evitare recidive comatose mortali.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento in emergenza.',
      dialysis: 'Nessun aggiustamento in emergenza.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard; fondamentale nei cirrotici con deplezione di riserve glicogeniche.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Encefalopatia di Wernicke nel Paziente Alcolista o Malnutrito',
        description: 'La somministrazione rapida di carichi elevati di glucosio a pazienti con deficit di tiamina (alcolisti cronici, malnutriti, iperemesi) precipita la sindrome di Wernicke acuta con emorragie petecchiali nei corpi mammillari e atassia/oftalmoplegia irreversibile. Somministrare Tiamina (Vitamina B1) 100-200 mg EV contestualmente o prima del glucosio!',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Necrosi Tessutale da Stravaso',
        description: 'Le soluzioni al 33% e 50% sono fortemente iperosmolari (fino a 2700 mOsm/L per la 50%): lo stravaso stravascolare provoca flebite chimica severa e necrosi cutanea. Verificare il ritorno venoso prima dell\'iniezione.',
        extravasationRisk: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Insulina',
        severity: 'moderate',
        mechanism: 'Antagonismo terapeutico diretto per neutralizzare il coma ipoglicemico.',
        clinicalAdvice: 'Monitorare la glicemia fino a stabilizzazione.'
      }
    ],
    guidelines: [
      {
        society: 'ADA / ERC Resuscitation Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Glucosata concentrata al 33% o 50% EV in bolo rapido è il trattamento salvavita di prima scelta raccomandato nell\'ipoglicemia grave dell\'adulto con compromissione della coscienza.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Glicemia capillare a 10 minuti, 30 minuti e ogni ora per le successive 4-6 ore',
      'Stato di vigilanza neurologico (GCS) e riflessi',
      'Ispezione del sito di iniezione venoso periferico per stravaso'
    ],
    isHighAlert: false
  },
  {
    id: 'metoclopramide',
    name: 'Metoclopramide EV',
    brandNames: ['Plasil'],
    drugClass: 'Inibitori di pompa protonica & Procinetici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Dolore Acuto & Analgesia'],
    quickSummary: 'Antiemetico e procinetico gastrointestinale dopaminergico. Trattamento di prima linea per nausea e vomito acuto in Pronto Soccorso, emicrania acuta (in associazione ad analgesici) e gastroparesi acuta.',
    mechanismOfAction: 'Antagonista dei recettori dopaminergici D2 centrali nell\'area postrema (chemoreceptor trigger zone CTZ) e periferici nel tratto gastroenterico. Aumenta il tono dello sfintere esofageo inferiore, accelera lo svuotamento gastrico e promuove la peristalsi antrale e duodenale.',
    dosages: [
      {
        indication: 'Nausea e Vomito Acuto in Emergenza / Attacco Acuto di Emicrania',
        bolusDose: '10 mg EV lento in almeno 3-5 minuti (o IM profonda). Ripetibile fino a un massimo di 30 mg/die (10 mg ogni 8 ore).',
        preparation: 'Fiala da 10 mg/2 ml pronta. Somministrare SEMPRE lentamente in almeno 3 minuti (l\'iniezione rapida scatena acatisia e ansia intollerabile!).',
        route: ['EV lento', 'IM'],
        clinicalTips: 'Nell\'emicrania acuta non solo arresta la nausea, ma ripristina l\'assorbimento gastrico rallentato degli analgesici orali e mostra efficacia analgesica intrinseca.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard (10 mg tid).',
      crclModerate: 'CrCl 30-50 ml/min: ridurre la dose del 25-50% (5 mg tid o 10 mg bid).',
      crclSevere: 'CrCl < 30 ml/min: ridurre la dose del 50-75% (5 mg ogni 12h o 10 mg die).',
      dialysis: 'CrCl < 15 ml/min o Emodialisi: dose dimezzata; non dializzabile.',
      nephrotoxicRisk: false,
      notes: 'L\'eliminazione renale del farmaco intatto è pari al 30-40%: l\'accumulo in insufficienza renale causa reazioni distoniche extrapiramidali severe.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Metabolismo epatico. Dimezzare la dose per clearance ridotta ed evitare sedazione nel cirrotico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Reazioni Extrapiramidali Acute e Crisi Oculogire',
        description: 'Può causare distonie acute (torcicollo spastico, trisma, crisi oculogira, protrusione linguale) e acatisia grave (irrequietezza psicomotoria incoercibile), specie nei giovani adulti (< 30 anni) o in caso di bolo rapido. Antidoto: Biperidene (Akineton 5 mg EV) o Prometazina/Difenidramina.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Allungamento del QTc e Aritmie',
        description: 'Puo allungare l\'intervallo QTc ed è controindicata in associazione ad altri farmaci che inducono torsione di punta o in feocromocitoma noto.',
        isQTC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci Dopaminergici (Levodopa)',
        severity: 'contraindicated',
        mechanism: 'Antagonismo reciproco: peggiora drammaticamente il parkinsonismo.',
        clinicalAdvice: 'Controindicato nel Parkinson (usare Domperidone per via orale se non controindicato o Ondansetron).'
      }
    ],
    guidelines: [
      {
        society: 'European Headache Federation (EHF) & EMA Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Metoclopramide 10 mg EV lenta è raccomandata come antiemetico di scelta nell\'attacco acuto di emicrania e nella nausea acuta, limitando la durata a massimo 5 giorni.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Segni di reazioni distoniche extrapiramidali o acatisia',
      'Velocità di iniezione (mai bolo rapido)'
    ],
    antidote: 'Biperidene (Akineton 5 mg EV) per distonia acuta',
    isHighAlert: false
  },
  {
    id: 'ondansetron',
    name: 'Ondansetron EV',
    brandNames: ['Zofran', 'Setron'],
    drugClass: 'Inibitori di pompa protonica & Procinetici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Dolore Acuto & Analgesia', 'Intossicazioni & Antidoti'],
    quickSummary: 'Antagonista selettivo dei recettori serotoninergici 5-HT3 ad altissima efficacia antiemetica privo di effetti collaterali extrapiramidali. Farmaco di scelta per nausea e vomito incoercibile in Pronto Soccorso, chemioterapia e post-operatorio.',
    mechanismOfAction: 'Blocca competitivamente i recettori 5-HT3 sia a livello centrale nella chemoreceptor trigger zone (CTZ) del tronco encefalico sia a livello periferico sui terminali vagali gastrointestinali, arrestando il riflesso del vomito mediato da rilascio di serotonina dalle cellule enterocromaffini.',
    dosages: [
      {
        indication: 'Nausea e Vomito Incoercibile in Emergenza / Gastroenterite Acuta / Indotto da Oppioidi',
        bolusDose: '4 - 8 mg EV lenti in 2-5 minuti (solitamente 4 mg nell\'adulto, ripetibile a 8 mg dopo 4 ore; massimo 16 mg in singola dose EV).',
        preparation: 'Fiale da 4 mg/2 ml o 8 mg/4 ml pronte per somministrazione EV o diluite in 50 ml SF.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'A differenza della metoclopramide non provoca acatisia né distonie extrapiramidali: ideale nel paziente anziano o con morbo di Parkinson.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Nessun aggiustamento. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Massimo 8 mg al giorno.',
      childPughC: 'Metabolismo epatico esteso via citocromo P450 (CYP3A4, CYP2D6). Clearance marcatamente ridotta: NON SUPERARE 8 mg al giorno!',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Allungamento Dose-Dipendente del QTc',
        description: 'Prolunga l\'intervallo QTc in modo dose-dipendente. Controindicato nei pazienti con sindrome del QT lungo congenita o QTc basale > 500 ms. Dosi singole EV superiori a 16 mg sono vietate per il rischio di Torsione di Punta e decesso improvviso!',
        isQTC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Apomorfina',
        severity: 'contraindicated',
        mechanism: 'Ipotensione profonda irreversibile e perdita di coscienza fatale.',
        clinicalAdvice: 'Controindicazione assoluta.'
      },
      {
        interactingDrug: 'Farmaci allunganti il QTc (Amiodarone, Aloperidolo, Claritromicina)',
        severity: 'major',
        mechanism: 'Rischio additivo di allungamento del QTc e aritmie ventricolari.',
        clinicalAdvice: 'Monitorare ECG continuo.'
      }
    ],
    guidelines: [
      {
        society: 'MASCC / ESMO Antiemetic Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Ondansetron 4-8 mg EV è raccomandato come antiemetico di scelta nel vomito refrattario in emergenza per l\'eccellente profilo di efficacia e l\'assenza di sedazione o distonia.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Tracciato ECG (intervallo QTc se fattori di rischio associati)',
      'Elettroliti serici (potassio e magnesio)'
    ],
    isHighAlert: false
  },
  {
    id: 'ipratropio-bromuro',
    name: 'Ipratropio Bromuro',
    brandNames: ['Atem', 'Ipravent'],
    drugClass: 'Broncodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['BPCO Riacutizzata', 'Asma Acuto'],
    quickSummary: 'Anticolinergico parasimpaticolitico inalatorio a breve durata d\'azione (SAMA). Co-somministrato con Salbutamolo nelle prime ore dell\'attacco acuto di asma grave e nella BPCO riacutizzata per broncodilatazione sinergica massimale.',
    mechanismOfAction: 'Antagonista non selettivo competitivo dei recettori colinergici muscarinici M1, M2 ed M3 nella muscolatura liscia bronchiale. Inibisce il tono vagale broncocostrittore riflesso e riduce le secrezioni mucose bronchiali senza inibire la clearance mucociliare.',
    dosages: [
      {
        indication: 'Asma Acuto Grave / Riacutizzazione Severa di BPCO',
        bolusDose: '0.5 mg (1 contenitore monodose da 0.5 mg/2 ml) nebulizzato insieme a Salbutamolo ogni 20-30 minuti per 3 dosi nelle prime ore, poi ogni 4-6 ore.',
        preparation: 'Fiale monodose da 0.5 mg/2 ml miscelabili direttamente nella stessa ampollina di aerosol con il Salbutamolo.',
        route: ['Inalatoria'],
        clinicalTips: 'L\'associazione Ipratropio + Salbutamolo nelle prime 2 ore dell\'asma acuto riduce significativamente i tassi di ricovero ospedaliero rispetto al solo salbutamolo.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (assorbimento sistemico < 1-2%).',
      dialysis: 'Dose standard.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard per via inalatoria.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'moderate',
        title: 'Glaucoma ad Angolo Chiuso e Ritenzione Urinaria',
        description: 'Evitare il contatto accidentale del vapore dell\'aerosol con gli occhi (può scatenare un attacco acuto di glaucoma per midriasi da parasimpaticolisi; usare boccaglio o maschera ben aderente). Usare con cautela in ipertrofia prostatica grave.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri farmaci anticolinergici',
        severity: 'moderate',
        mechanism: 'Effetti antimuscarinici additivi (secchezza fauci, midriasi).',
        clinicalAdvice: 'Monitorare.'
      }
    ],
    guidelines: [
      {
        society: 'GINA 2024 & GOLD 2024 Guidelines',
        year: 2024,
        keyRecommendation: 'L\'aggiunta di Ipratropio bromuro (0.5 mg) ai beta-2 agonisti (Salbutamolo) nelle prime ore del trattamento dell\'asma acuto grave in Pronto Soccorso migliora la broncodilatazione e riduce l\'ospedalizzazione.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Saturazione SpO2 e meccanica respiratoria',
      'Protezione degli occhi dal flusso della maschera'
    ],
    isHighAlert: false
  },
  {
    id: 'intralipid',
    name: 'Emulsione Lipidica 20%',
    brandNames: ['Intralipid 20%', 'Lipofundin 20%'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Intossicazioni & Antidoti', 'Arresto Cardiaco / ACLS'],
    quickSummary: 'Emulsione lipidica endovenosa purificata (terapia "Lipid Rescue"). Antidoto salvavita universale di prima scelta per la Tossicità Sistemica da Anestetici Locali (LAST da Lidocaina, Bupivacaina, Ropivacaina) e per overdose cardiotossica grave refrattaria da farmaci altamente lipofili (Beta-bloccanti, Calcio-antagonisti, Bupropione).',
    mechanismOfAction: 'Meccanismo combinato del "Lipid Sink" (crea una fase lipidica intravascolare che estrae e sequestra il farmaco lipofilo cardiotossico dai tessuti bersaglio cuore e cervello) ed effetto metabolico diretto (fornisce acidi grassi liberi come substrato energetico essenziale per il miocardio ischemico/inibito e apre i canali del calcio voltaggio-dipendenti).',
    dosages: [
      {
        indication: 'Tossicità Sistemica da Anestetici Locali (LAST) con Collasso Circolatorio / Arresto Cardiaco o Aritmie Maligne',
        bolusDose: 'Bolo EV iniziale immediato: 1.5 ml/kg di Emulsione Lipidica 20% in 1-2 minuti (circa 100 ml nell\'adulto di 70 kg). Ripetibile fino a 2 volte ogni 5 minuti se la stabilità non viene ripristinata (massimo cumulativo 12 ml/kg nelle prime 24h).',
        maintenanceDose: 'Subito dopo il bolo avviare infusione continua a 0.25 ml/kg/min (circa 1000 ml/h per 70 kg = 15-20 ml/min) per almeno 10 minuti dopo il recupero della stabilità emodinamica (incrementabile a 0.5 ml/kg/min se ipotensione persiste).',
        preparation: 'Sacca di emulsione lipidica al 20% pronta all\'uso (deve essere sempre presente in sala emergenza/shock room). Infondere via accesso venoso dedicato.',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'In arresto cardiaco da anestetico locale continuare la RCP di supporto vitale durante l\'infusione: i lipidi possono richiedere diversi cicli di massaggio per distribuirsi e sequestrare il tossico.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento in emergenza vitale.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard salvavita.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Interferenza con Esami di Laboratorio da Ipertrigliceridemia Acuta',
        description: 'La massiccia infusione di lipidi rende il plasma lattescente provocando interferenza analitica transitoria negli esami di laboratorio spettrofotometrici (emocromo, elettroliti, coagulazione).'
      },
      {
        severity: 'moderate',
        title: 'Non superare 12 ml/kg nelle prime 24 ore',
        description: 'Dosi eccessive possono provocare sovraccarico lipidico, danno polmonare acuto o pancreatite acuta.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anestetici Locali e Farmaci Lipofili (Bupivacaina, Lidocaina)',
        severity: 'moderate',
        mechanism: 'Sequestro intravascolare specifico (azione antidotica desiderata).',
        clinicalAdvice: 'Trattamento salvavita.'
      }
    ],
    guidelines: [
      {
        society: 'ASRA / ESRA / ERC Resuscitation Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Emulsione Lipidica 20% al dosaggio di 1.5 ml/kg bolo + 0.25 ml/kg/min è il cardine terapeutico di prima scelta obbligatorio per la tossicità cardiovascolare da anestetici locali (LAST).',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Ripristino della circolazione spontanea (ROSC) e ritmo cardiaco telemetrico',
      'Pressione arteriosa continua',
      'Saturazione SpO2 e parametri ventilatori'
    ],
    isHighAlert: true
  },
  {
    id: 'vitamina-k1',
    name: 'Fitomenadione (Vitamina K1)',
    brandNames: ['Konakion'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti'],
    quickSummary: 'Vitamina liposolubile cofattore essenziale per la gamma-carbossilazione dei fattori della coagulazione II, VII, IX e X. Antidoto per il sovradosaggio da anticoagulanti orali AVK (Warfarin / Sintrom) con emorragia maggiore o INR critico.',
    mechanismOfAction: 'Supera l\'inibizione competitiva esercitata dagli AVK sull\'enzima epossido-reduttasi della vitamina K a livello degli epatociti, permettendo la ripresa della sintesi epatica endogena dei fattori della coagulazione funzionali (effetto misurabile a partire da 4-6 ore dall\'infusione).',
    dosages: [
      {
        indication: 'Emorragia Maggiore da Antagonisti della Vitamina K (Warfarin / Sintrom) - IN ASSOCIAZIONE A 4F-PCC',
        bolusDose: '5 - 10 mg EV somministrati lentamente in 100 ml di Soluzione Fisiologica o Glucosata 5% in almeno 20-30 minuti (INSIEME a 4F-PCC 25-50 UI/kg).',
        preparation: 'Fiale da 10 mg/1 ml. DILUIRE SEMPRE ed iniettare lentamente per evitare reazioni anafilattoidi da solvente.',
        route: ['EV lento', 'Sublinguale'],
        clinicalTips: 'FONDAMENTALE: Il 4F-PCC ripristina i fattori istantaneamente ma decade dopo 6-8 ore. La Vitamina K1 è INDISPENSABILE per stimolare il fegato a produrre nuovi fattori impedendo che l\'INR risalga a distanza di 12 ore! La via EV è molto più rapida e prevedibile della via IM o SC.'
      },
      {
        indication: 'INR Asintomatico Molto Elevato (> 10 senza emorragia)',
        bolusDose: '1 - 3 mg per via orale o sublinguale (utilizzare la fiala bevibile).',
        preparation: 'Fiala da 10 mg (dosare 0.2-0.3 ml con siringa).',
        route: ['Sublinguale'],
        clinicalTips: 'Dosi orali basse correggono l\'INR entro 24 ore senza indurre resistenza prolungata alla reintroduzione del warfarin.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Nell\'insufficienza epatica severa la risposta può essere incompleta per incapacità degli epatociti danneggiati di sintetizzare i fattori della coagulazione.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Reazioni Anafilattoidi da Bolo EV Rapido',
        description: 'L\'iniezione endovenosa diretta non diluita o troppo rapida può scatenare broncospasmo severo, flushing, arresto cardiorespiratorio e shock da degranulazione (dovuto anche all\'emulsionante lecitina/glicocolato). Infondere sempre diluito in almeno 20-30 minuti.'
      },
      {
        severity: 'moderate',
        title: 'Resistenza temporanea al Warfarin',
        description: 'Dosi elevate (> 10-20 mg) inducono saturazione epatica con resistenza all\'anticoagulazione per diverse settimane; usare eparina ponte se necessario.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Warfarin / Acenocumarolo (Sintrom)',
        severity: 'major',
        mechanism: 'Antagonismo competitivo diretto (scopo clinico desiderato).',
        clinicalAdvice: 'Monitorare INR a 6, 12 e 24 ore.'
      }
    ],
    guidelines: [
      {
        society: 'CHEST & ESC Anticoagulation Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Nei pazienti con sanguinamento maggiore in corso di AVK, la Vitamina K1 5-10 mg EV lenta deve essere SEMPRE somministrata contestualmente al 4F-PCC per sostenere la correzione dell\'INR.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'INR a 15-30 minuti post-PCC e a 6-12 ore post-Vitamina K',
      'Segni clinici di cessazione dell\'emorragia attiva'
    ],
    isHighAlert: false
  },
  {
    id: 'protamina-solfato',
    name: 'Solfato di Protamina',
    brandNames: ['Protamina Solfato Fiale'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti'],
    quickSummary: 'Polipeptide cationico ad azione specifica per la neutralizzazione immediata dell\'effetto anticoagulante dell\'Eparina Non Frazionata (UFH) e parziale dell\'Enoxaparina (LMWH) in caso di emorragia maggiore o chirurgia urgente.',
    mechanismOfAction: 'Proteina fortemente basica (policationica) ricca di arginina che si lega stechiometricamente all\'eparina fortemente acida e polianionica, formando un sale stabile inattivo privo di proprietà anticoagulanti.',
    dosages: [
      {
        indication: 'Inversione Immediata da Sovradosaggio / Emorragia Grave da Eparina Non Frazionata (UFH)',
        bolusDose: '1 mg di protamina neutralizza 100 UI di eparina somministrata nelle ultime 2 ore (es. se infusione a 1000 UI/h nelle ultime 2h -> circa 20-25 mg). VELOCITÀ MASSIMA: non superare 50 mg in 10 minuti.',
        preparation: 'Fiale da 50 mg/5 ml (10 mg/ml). Diluire in 50-100 ml di Soluzione Fisiologica ed iniettare lentamente in almeno 10 minuti.',
        route: ['EV lento'],
        clinicalTips: 'Se l\'eparina è stata interrotta da più di 2 ore, la dose richiesta di protamina si dimezza poiché l\'emivita dell\'eparina è di circa 60-90 minuti.'
      },
      {
        indication: 'Inversione da Eparina a Basso Peso Molecolare (Enoxaparina) con Sanguinamento Minaccioso',
        bolusDose: 'Se enoxaparina somministrata nelle ultime 8 ore: 1 mg di protamina per ogni 1 mg (100 UI) di enoxaparina. Neutralizza circa il 60% dell\'attività anti-Xa e completamente l\'attività anti-IIa.',
        preparation: 'Come sopra.',
        route: ['EV lento'],
        clinicalTips: 'Se il sanguinamento persiste dopo 2-4 ore, può essere somministrata una seconda dose minore di 0.5 mg per 1 mg di enoxaparina.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ipotensione Grave, Collasso Cardiocircolatorio e Vasocostrizione Polmonare',
        description: 'La somministrazione EV rapida provoca un rilascio massivo di istamina ed ossido nitrico con caduta catastrofica della pressione arteriosa, bradicardia riflessa e ipertensione polmonare acuta con insufficienza del ventricolo destro! Infondere SEMPRE lentamente in non meno di 10 minuti.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Rischio Anafilassi in Pazienti Trattati con Insulina NPH o Vasectomizzati',
        description: 'La protamina deriva dallo sperma di salmone: rischio elevato di reazioni anafilattiche IgE-mediate severe nei diabetici trattati con insulina-protamina (NPH), pazienti con allergia al pesce o uomini vasectomizzati (anticorpi anti-protamina).'
      },
      {
        severity: 'moderate',
        title: 'Effetto Anticoagulante Paradosso da Eccesso di Dose',
        description: 'A dosi sproporzionate la protamina libera non legata all\'eparina manifesta essa stessa una debole attività anticoagulante intrinseca (inibisce piastrine e trombina).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Eparine (UFH, Enoxaparina)',
        severity: 'major',
        mechanism: 'Neutralizzazione stechiometrica 1:1 diretta.',
        clinicalAdvice: 'Monitorare aPTT o tempo di coagulazione attivato (ACT).'
      }
    ],
    guidelines: [
      {
        society: 'CHEST & ESC Antithrombotic Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Protamina solfato EV lenta è l\'antidoto di prima linea raccomandato per la neutralizzazione immediata dell\'eparina non frazionata in corso di emorragia grave o complicanze invasive.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua durante e dopo l\'infusione (sorveglianza ipotensione)',
      'aPTT o ACT a 15 minuti dal termine per confermare l\'avvenuta neutralizzazione',
      'Saturazione SpO2 e parametri respiratori'
    ],
    isHighAlert: true
  }
];

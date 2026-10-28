import { EmergencyDrug } from '../types/pharmacy';
import { getPregnancySafety } from './pregnancyData';
import { ADDITIONAL_EMERGENCY_DRUGS } from './moreDrugs';
import { ADDITIONAL_EMERGENCY_DRUGS_BATCH_2 } from './moreDrugsBatch2';
import { ADDITIONAL_EMERGENCY_DRUGS_BATCH_3 } from './moreDrugsBatch3';
import { ADDITIONAL_EMERGENCY_DRUGS_BATCH_4 } from './moreDrugsBatch4';

const INITIAL_EMERGENCY_DRUGS: Omit<EmergencyDrug, 'pregnancy'>[] = [
  {
    id: 'noradrenalina',
    name: 'Noradrenalina (Norepinefrina)',
    brandNames: ['Noradrenalina Tartrato', 'Levophed'],
    drugClass: 'Vasopressori & Inotropi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Shock & Ipotensione', 'Infezione & Sepsi', 'Arresto Cardiaco / ACLS'],
    quickSummary: 'Vasopressore di prima scelta nello shock settico, cardiogeno e distributivo. Potente agonista alfa-1 con modesta attività beta-1.',
    mechanismOfAction: 'Agonista recettoriale alfa-1 adrenergico prevalente (intensa vasocostrizione arteriosa e venosa sistemica, aumento delle resistenze vascolari sistemiche SVR e pressione arteriosa media PAM) con lieve effetto beta-1 (inotropo positivo moderato).',
    dosages: [
      {
        indication: 'Shock Settico / Shock Vasoplegico (Target PAM >= 65 mmHg)',
        maintenanceDose: '0.05 - 1.0 mcg/kg/min (fino a 2.0 mcg/kg/min nei casi refrattari) in infusione continua titolata su PAM.',
        preparation: 'Diluizione standard PS/Reparto: 4 mg (2 fiale da 2mg/2ml) portati a 50 ml con Glucosata 5% o Fisiologica 0.9% in siringa per pompa -> Concentrazione: 80 mcg/ml (0.08 mg/ml).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 0.08,
          defaultDilutionText: '4 mg in 50 ml G5% (80 mcg/ml)',
          unit: 'mcg/kg/min',
          minRate: 0.02,
          maxRate: 2.0,
          defaultRate: 0.1,
          step: 0.02,
        },
        route: ['Infusione continua'],
        clinicalTips: 'Preferire Glucosata 5% per proteggere dalla degradazione ossidativa. Iniziare precocemente (entro la 1a ora se PAM < 65 refrattaria ai fluidi).'
      },
      {
        indication: 'Shock Cardiogeno (con ipotensione severa PAS < 80 mmHg)',
        maintenanceDose: '0.05 - 0.5 mcg/kg/min per ripristinare PAM minima di perfusione, spesso associata a Dobutamina.',
        preparation: 'Come sopra (80 mcg/ml).',
        route: ['Infusione continua'],
        clinicalTips: 'Attenzione all\'eccessivo aumento del post-carico ventricolare sinistro.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento di dose richiesto. Il ripristino della PAM migliora la perfusione renale.',
      crclModerate: 'Nessun aggiustamento. Monitorare diuresi oraria.',
      crclSevere: 'Nessun aggiustamento. Evitare vasocostrizione eccessiva con dosi sproporzionate.',
      dialysis: 'Nessun aggiustamento. Non dializzabile.',
      nephrotoxicRisk: false,
      notes: 'La vasocostrizione renale eccessiva compare solo se la volemia non è stata adeguatamente ripristinata.'
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento di dose.',
      childPughB: 'Nessun aggiustamento. Titolare su PAM.',
      childPughC: 'Possibile ridotta reattività vascolare (downregulation recettoriale nella cirrosi); possono essere necessarie dosi più elevate.',
      hepatotoxicRisk: false,
      notes: 'Metabolismo epatico via MAO e COMT.'
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Rischio Necrosi Tessutale da Stravaso',
        description: 'La somministrazione periferica prolungata può causare grave ischemia e necrosi cutanea. Infondere preferibilmente via Catetere Venoso Centrale (CVC). Se periferica: usare vena di grosso calibro (fossa antecubitale), massima diluizione e passare a CVC appena possibile. Antidoto per stravaso: Fentolamina 5-10 mg sottocute locale.',
        requiresCVC: true,
        extravasationRisk: true
      },
      {
        severity: 'high',
        title: 'Ischemia periferica e miocardica',
        description: 'A dosi elevate può provocare ischemia acuta delle estremità, ischemia mesenterica e aumento del consumo miocardico di ossigeno.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti non selettivi (es. Propranololo)',
        severity: 'major',
        mechanism: 'L\'inibizione della vasodilatazione beta-2 lascia inalterata la vasocostrizione alfa-1, potendo provocare ipertensione marcata e bradicardia riflessa.',
        clinicalAdvice: 'Monitoraggio pressorio stretto; considerare agenti alternativi.'
      },
      {
        interactingDrug: 'Antidepressivi Triciclici (TCA) / IMAO',
        severity: 'major',
        mechanism: 'Potenziamento drastico della risposta vasopressoria per inibizione del reuptake catecolaminico.',
        clinicalAdvice: 'Ridurre la dose iniziale del 50-75% e titolare con estrema cautela.'
      }
    ],
    guidelines: [
      {
        society: 'Surviving Sepsis Campaign 2021/2024',
        year: 2021,
        keyRecommendation: 'Vasopressore di prima linea raccomandato per raggiungere target PAM >= 65 mmHg rispetto ad altri vasopressori.',
        evidenceLevel: 'Forte raccomandazione, evidenza moderata'
      },
      {
        society: 'ESC Acute Heart Failure 2023',
        year: 2023,
        keyRecommendation: 'Indicato nello shock cardiogeno quando è necessario mantenere PAM e perfusione d\'organo vitale in presenza di ipotensione grave persistente.',
        evidenceLevel: 'Classe IIb, Livello B'
      }
    ],
    monitoring: [
      'Pressione Arteriosa invasiva (linea arteriosa raccomandata)',
      'Frequenza e ritmo cardiaco telemetrico continuo',
      'Diuresi oraria (catetere vescicale)',
      'Lattati arteriosi serici e saturazione venosa centrale ScvO2',
      'Perfusione periferica (tempo di refill capillare, temperatura cutanea)'
    ],
    isHighAlert: true,
    antidote: 'Fentolamina sottocute per stravaso locale'
  },
  {
    id: 'adrenalina',
    name: 'Adrenalina (Epinefrina)',
    brandNames: ['Adrenalina Fiale', 'Fastjekt', 'EpiPen'],
    drugClass: 'Vasopressori & Inotropi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Reazioni Allergiche & Anafilassi', 'Asma Acuto', 'Shock & Ipotensione'],
    quickSummary: 'Agonista alfa e beta adrenergico non selettivo. Farmaco cardine in arresto cardiaco (ALS), anafilassi grave (IM immediata) e shock anafilattico/settico refrattario.',
    mechanismOfAction: 'Potente stimolazione recettoriale beta-1 (inotropismo, cronotropismo, dromotropismo positivi), beta-2 (broncodilatazione e vasodilatazione a basse dosi) e alfa-1 (vasocostrizione periferica spiccata ad alte dosi). Stabilizza inoltre la membrana dei mastociti.',
    dosages: [
      {
        indication: 'Arresto Cardiaco ALS (Adulto: FV/TV senza polso, Asistolia, PEA)',
        bolusDose: '1 mg EV/IO (1 fiala da 1 mg/1 ml non diluita o diluita a 10 ml SF) seguito da flush di 20 ml SF ed elevazione dell\'arto.',
        preparation: 'Fiala da 1 mg/1 ml pronta all\'uso per bolo ALS ogni 3-5 minuti (dopo il 3° shock in FV/TV; immediatamente in PEA/Asistolia).',
        route: ['EV rapido', 'Endoossea'],
        clinicalTips: 'ERC 2021/2025: Non interrompere le compressioni toraciche durante la somministrazione.'
      },
      {
        indication: 'Anafilassi Severa (Adulto)',
        bolusDose: '0.5 mg (0.5 ml della fiala 1:1000 da 1 mg/ml) INTRAMUSCOLO nella faccia antero-laterale della coscia.',
        preparation: 'Fiala pura 1 mg/ml: aspirare 0.5 ml con siringa da 1 ml. Ripetibile ogni 5-15 minuti in caso di mancata risposta.',
        route: ['IM'],
        clinicalTips: 'La via IM antero-laterale è molto più rapida e sicura della SC. Mai EV diretta in bolo nell\'anafilassi senza arresto!'
      },
      {
        indication: 'Shock Anafilattico refrattario / Shock Settico 2a linea',
        maintenanceDose: '0.02 - 0.5 mcg/kg/min in infusione continua titolata.',
        preparation: '4 mg in 50 ml G5% o SF (80 mcg/ml) via pompa siringa.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 0.08,
          defaultDilutionText: '4 mg in 50 ml G5% (80 mcg/ml)',
          unit: 'mcg/kg/min',
          minRate: 0.01,
          maxRate: 1.0,
          defaultRate: 0.05,
          step: 0.01
        },
        route: ['Infusione continua'],
        clinicalTips: 'Monitorare la comparsa di tachiaritmie e iperlattatemia (effetto beta-2 glicogenolitico tipico).'
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
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento. Rapido catabolismo tissutale ed epatico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Errore di concentrazione e via di somministrazione',
        description: 'La somministrazione EV diretta di adrenalina 1:1000 in bolo a paziente con polso può provocare emorragia cerebrale, ischemia miocardica e tachiaritmie fatali. La fiala 1:1000 (1 mg/ml) si usa SOLO IM nell\'anafilassi. In arresto cardiaco si usa 1 mg EV. In infusione continua va sempre diluita!',
        extravasationRisk: true
      },
      {
        severity: 'high',
        title: 'Iperlattatemia secondaria a stimolazione beta-2',
        description: 'L\'aumento dei lattati durante infusione di adrenalina è spesso metabolico (glicogenolisi da recettore beta-2) e non necessariamente indice di peggiorata ipoperfusione.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti non cardio-selettivi',
        severity: 'major',
        mechanism: 'Blocco dell\'effetto vasodilatatore beta-2 con conseguente vasocostrizione alfa-1 incontrastata: ipertensione severa e bradicardia paradossa.',
        clinicalAdvice: 'In anafilassi su paziente in beta-bloccante: considerare Glucagone 1-5 mg EV se scarsa risposta ad Adrenalina.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Guidelines 2021/2025 (Resuscitation)',
        year: 2021,
        keyRecommendation: '1 mg EV/IO ogni 3-5 minuti durante ALS. Somministrare dopo il 3° shock nei ritmi defibrillabili (FV/TV) e il prima possibile nei ritmi non defibrillabili (PEA/Asistolia).',
        evidenceLevel: 'Classe I, Livello A'
      },
      {
        society: 'EAACI Anaphylaxis Guidelines 2022',
        year: 2022,
        keyRecommendation: 'Adrenalina IM 0.5 mg nella coscia anterolaterale è il cardine immediato di trattamento di prima linea nell\'anafilassi.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Monitoraggio ECG continuo per tachiaritmie',
      'Pressione arteriosa (invasiva o non invasiva ravvicinata)',
      'Saturimetria SpO2',
      'Glicemia ed EGA (lattati, pH)'
    ],
    isHighAlert: true
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    brandNames: ['Cordarone', 'Amiodar'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Aritmie & Cardioversione'],
    quickSummary: 'Anti-aritmico di classe III (con proprietà di classe I, II e IV). Indicato in arresto cardiaco da FV/TV refrattaria a 3 shock e nel controllo di aritmie atriali e ventricolari stabili.',
    mechanismOfAction: 'Prolunga la durata del potenziale d\'azione e il periodo refrattario bloccando i canali del potassio (classe III). Mostra anche blocco dei canali del sodio (classe I), effetto antiadrenergico non competitivo (classe II) e blocco dei canali del calcio (classe IV).',
    dosages: [
      {
        indication: 'Arresto Cardiaco da FV / TV senza polso refrattaria (dopo 3° shock)',
        bolusDose: '1° bolo: 300 mg EV/IO rapido (in 20 ml G5% o fisiologica); 2° bolo: 150 mg se FV/TV persiste dopo il 5° shock.',
        preparation: '300 mg (2 fiale da 150 mg/3 ml) diluite in 20 ml di Glucosata 5% o pure se in siringa rapida, seguite da flush.',
        route: ['EV rapido', 'Endoossea'],
        clinicalTips: 'ERC 2021/2025 raccomanda Amiodarone 300 mg (o Lidocaina 100 mg) dopo il terzo shock in FV/TV.'
      },
      {
        indication: 'Tachicardia Ventricolare stabile o Fibrillazione Atriale ad elevata risposta',
        bolusDose: 'Carico: 300 mg (5 mg/kg) in 100-250 ml di Glucosata 5% infusi in 20-60 minuti.',
        maintenanceDose: 'Mantenimento: 900 mg nelle 24 ore successive (circa 37.5 mg/h = 15-20 ml/h della soluzione preparata) in G5%.',
        preparation: 'DILUIRE SEMPRE IN GLUCOSATA 5%. Incompatibile con Fisiologica a concentrazioni < 0.6 mg/ml (precipita). 900 mg (6 fiale) in 500 ml G5%.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Utilizzare possibilmente una via venosa centrale per evitare flebiti periferiche chimiche gravi.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento di dose.',
      crclModerate: 'Nessun aggiustamento di dose.',
      crclSevere: 'Nessun aggiustamento di dose (eliminazione prevalentemente biliare ed epatica).',
      dialysis: 'Nessun aggiustamento. Non dializzabile.',
      nephrotoxicRisk: false,
      notes: 'Non richiede riduzione di dosaggio nell\'insufficienza renale acuta o cronica.'
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento dose acuta in emergenza.',
      childPughB: 'Carico invariato; ridurre dose di mantenimento del 25-50% se infusione prolungata.',
      childPughC: 'Usare con estrema cautela. Metabolismo epatico esteso (CYP3A4, CYP2C8) con formazione di desetilamiodarone attivo.',
      hepatotoxicRisk: true,
      notes: 'Rischio di epatotossicità acuta (ipertransaminasemia acuta spesso legata al solvente polisorbato 80 delle fiale EV).'
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Allungamento del QTc e Torsione di Punta',
        description: 'Prolunga il tratto QT/QTc. Sebbene il rischio di TdP sia inferiore rispetto ad altri classe III per il contestuale blocco dei canali del calcio, è controindicato se QTc basale > 500 ms o in associazione con altri farmaci allunganti il QT o grave ipopotassiemia/ipomagnesiemia.',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Ipotensione e Flebite chimica periferica',
        description: 'L\'infusione EV rapida provoca ipotensione marcata per vasodilatazione (dovuta anche al solvente). Non infondere in bolo rapido nel paziente con polso! Infondere in vene di grosso calibro o CVC.',
        requiresCVC: true,
        extravasationRisk: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci allunganti il QTc (Aloperidolo, Claritromicina, Chinolonici, Antipsicotici)',
        severity: 'contraindicated',
        mechanism: 'Effetto sinergico sul prolungamento del QTc con rischio esponenziale di Torsione di Punta e FV.',
        clinicalAdvice: 'Evitare la combinazione; monitorare QTc continuo e reintegrare K+ e Mg2+.'
      },
      {
        interactingDrug: 'Digossina',
        severity: 'major',
        mechanism: 'Amiodarone inibisce la P-glicoproteina, raddoppiando i livelli plasmatici di digossina.',
        clinicalAdvice: 'Dimezzare la dose di digossina e monitorare digossinemia e telemetria per blocco AV.'
      },
      {
        interactingDrug: 'Anticoagulanti orali AVK (Warfarin / Sintrom)',
        severity: 'major',
        mechanism: 'Potente inibizione del metabolismo di Warfarin (CYP2C9), con impennata repentina dell\'INR.',
        clinicalAdvice: 'Ridurre la dose di Warfarin del 30-50% e monitorare INR frequentemente.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation Guidelines 2021/2025',
        year: 2021,
        keyRecommendation: 'Amiodarone 300 mg EV/IO dopo il 3° shock per FV/TV senza polso; ulteriore dose di 150 mg dopo il 5° shock. Lidocaina 100 mg è alternativa equivalente di pari livello.',
        evidenceLevel: 'Classe I, Livello A'
      },
      {
        society: 'ESC AF Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Indicato per il controllo della frequenza ventricolare nella FA acuta in pazienti emodinamicamente instabili o con Frazione di Eiezione marcatamente ridotta (HFrEF) quando i beta-bloccanti sono controindicati.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Telemetria ECG continua (intervallo QTc, frequenza, comparsa di BAV)',
      'Pressione arteriosa durante carico e mantenimento',
      'Elettroliti serici (Potassio >= 4.0 mEq/L, Magnesio >= 2.0 mg/dL)',
      'Transaminasi epatiche se infusione prolungata'
    ],
    isHighAlert: true
  },
  {
    id: 'dobutamina',
    name: 'Dobutamina',
    brandNames: ['Dobutrex', 'Dobutamina Fiale'],
    drugClass: 'Vasopressori & Inotropi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Shock & Ipotensione', 'EPA & Insufficienza Cardiaca'],
    quickSummary: 'Inotropo positivo puro con moderata vasodilatazione periferica (inodilatatore). Indicato nello shock cardiogeno e nell\'insufficienza cardiaca acuta a bassa portata.',
    mechanismOfAction: 'Agonista predominante dei recettori beta-1 cardiaci (aumento della contrattilità miocardica e della gittata cardiaca) con debole stimolazione beta-2 (vasodilatazione) e minima alfa-1.',
    dosages: [
      {
        indication: 'Shock Cardiogeno / Bassa Gittata Cardiaca',
        maintenanceDose: '2.5 - 20 mcg/kg/min in infusione continua titolata. Iniziare a 2.5-5 mcg/kg/min ed incrementare gradualmente.',
        preparation: '250 mg (1 fiala da 250 mg/20 ml) portata a 50 ml con G5% o SF in siringa per pompa -> Concentrazione: 5 mg/ml (5000 mcg/ml).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 5.0,
          defaultDilutionText: '250 mg in 50 ml G5% o SF (5 mg/ml)',
          unit: 'mcg/kg/min',
          minRate: 2.0,
          maxRate: 20.0,
          defaultRate: 5.0,
          step: 1.0
        },
        route: ['Infusione continua'],
        clinicalTips: 'Se il paziente è marcatamente ipoteso (PAS < 80 mmHg), associare prima o contestualmente Noradrenalina per prevenire ulteriore caduta pressoria.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento. L\'aumento della portata cardiaca spesso migliora la perfusione renale.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento; metabolizzata a livello tissutale e dalla COMT.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipotensione da vasodilatazione periferica (beta-2)',
        description: 'In pazienti ipovolemici o con vasodilatazione concomitante, può causare un calo repentino della pressione arteriosa.',
        requiresCVC: true
      },
      {
        severity: 'high',
        title: 'Tachiaritmie e aumento del consumo d\'ossigeno',
        description: 'Aumenta significativamente il consumo miocardico di ossigeno (MVO2) e può innescare tachicardia sinusale marcata, fibrillazione atriale o aritmie ventricolari.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti',
        severity: 'major',
        mechanism: 'Antagonismo competitivo sui recettori beta-1 cardiaci, annullando l\'efficacia inotropa.',
        clinicalAdvice: 'In pazienti recentemente trattati con beta-bloccante, considerare Levosimendan o inibitori della PDE-3 (Milrinone) che agiscono a valle del recettore beta.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Acute Heart Failure Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Indicata per via endovenosa in pazienti con shock cardiogeno o scompenso cardiaco acuto con ipoperfusione d\'organo e PAS preservata (> 85-90 mmHg).',
        evidenceLevel: 'Classe IIa, Livello C'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua',
      'Monitoraggio ECG continuo (frequenza ed ectopie ventricolari)',
      'Diuresi oraria',
      'Lattati serici e ScvO2'
    ],
    isHighAlert: true
  },
  {
    id: 'adenosina',
    name: 'Adenosina',
    brandNames: ['Krenosin'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Aritmie & Cardioversione'],
    quickSummary: 'Agente di prima linea per la diagnosi e l\'interruzione rapida delle Tachicardie Parossistiche Sopraventricolari (TPSV) da rientro (AVNRT / AVRT).',
    mechanismOfAction: 'Attiva i recettori A1 purinergici del miocardio atriale e del nodo AV, provocando apertura dei canali del potassio e blocco transitorio della conduzione nel nodo atrio-ventricolare (emivita ultrabreve < 10 secondi).',
    dosages: [
      {
        indication: 'Tachicardia Parossistica Sopraventricolare a complessi stretti regolare stabile',
        bolusDose: '1° bolo: 6 mg EV rapido. Se inefficace dopo 1-2 minuti: 2° bolo: 12 mg EV rapido. Opzionale 3° bolo: 12 mg (o 18 mg).',
        preparation: 'Fiala da 6 mg/2 ml pronta. Somministrare in BOLO RAPIDO (in 1-2 secondi) attraverso accesso venoso periferico di grosso calibro prossimale (fossa antecubitale), immediatamente seguito da flush a pressione di 20 ml di Soluzione Fisiologica.',
        route: ['EV rapido'],
        clinicalTips: 'Usare rubinetto a 3 vie (una via con Adenosina, l\'altra con siringa da 20 ml SF). Avvisare SEMPRE il paziente prima della somministrazione della sensazione imminente di oppressione toracica, calore e dispnea transitoria (dura 5-10 secondi).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Nessun aggiustamento. Emivita determinata dalla captazione eritrocitaria ed endoteliale (< 10 secondi).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Asma bronchiale grave e broncospasmo severo',
        description: 'Controindicata in pazienti con asma bronchiale grave nota (rischio di broncospasmo acuto fatale per stimolazione recettori A2B/A3 bronchiali). In asma severo preferire Verapamil o Diltiazem o cardioversione sincronizzata.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Controindicata in WPW con Fibrillazione Atriale preeccitata',
        description: 'Nella FA preeccitata (a complessi larghi irregolare) l\'adenosina può accelerare la conduzione lungo la via accessoria e precipitare la Fibrillazione Ventricolare fatale!'
      },
      {
        severity: 'moderate',
        title: 'Dose ridotta in CVC o con Dipiridamolo',
        description: 'Se somministrata via Catetere Venoso Centrale (CVC) o in pazienti in terapia con Dipiridamolo, RIDURRE la dose iniziale a 3 mg (o 1.5 mg).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Teofillina / Caffeina (Antagonisti recettoriali metilxantine)',
        severity: 'major',
        mechanism: 'Le metilxantine bloccano competitivamente i recettori dell\'adenosina rendendola inefficace alle dosi standard.',
        clinicalAdvice: 'Possono essere necessarie dosi più elevate (es. 12 o 18 mg).'
      },
      {
        interactingDrug: 'Dipiridamolo',
        severity: 'major',
        mechanism: 'Inibisce la captazione dell\'adenosina potenziandone drasticamente l\'effetto.',
        clinicalAdvice: 'Ridurre la dose a 3 mg o evitare.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Supraventricular Tachycardia Guidelines & ACLS 2024',
        year: 2024,
        keyRecommendation: 'Trattamento farmacologico di prima linea per la terminazione acuta della tachicardia a complessi stretti regolare (AVNRT/AVRT) dopo insuccesso delle manovre vagali.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Tracciato ECG a 12 derivazioni in registrazione continua durante e dopo il bolo',
      'Defibrillatore con piastre adesive posizionate e carrello emergenza presente al letto',
      'Saturazione SpO2 e pressione arteriosa'
    ],
    isHighAlert: true
  },
  {
    id: 'furosemide',
    name: 'Furosemide',
    brandNames: ['Lasix'],
    drugClass: 'Diuretici dell\'ansa',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['EPA & Insufficienza Cardiaca', 'Crisi Ipertensiva & Dissecazione'],
    quickSummary: 'Diuretico dell\'ansa cardine nell\'edema polmonare acuto (EPA) e nell\'insufficienza cardiaca congestizia scompensata.',
    mechanismOfAction: 'Inibisce il cotrasportatore Na+/K+/2Cl- nel tratto ascendente spesso dell\'ansa di Henle, determinando marcata natriuresi e diuresi osmotica. Possiede anche un rapido effetto venodilatatore periferico acuto (prima dell\'inizio della diuresi).',
    dosages: [
      {
        indication: 'Edema Polmonare Acuto / Insufficienza Cardiaca Acuta Decompensata',
        bolusDose: 'Paziente naive: 20-40 mg EV bolo lento. Paziente già in terapia cronica orale: dose EV equivalente ad almeno 1 - 2.5 volte la dose domiciliare giornaliera orale (es. se assumeva 50 mg die -> 50-100 mg EV).',
        maintenanceDose: 'Successivo bolo ogni 8-12 ore o infusione continua a 5 - 20 mg/h.',
        preparation: 'Fiale da 20 mg/2 ml. Per infusione continua: 100-250 mg in 50 ml SF via siringa per pompa.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Iniettare lentamente in bolo (<= 4 mg/min per dosi elevate) per minimizzare il rischio di ototossicità acuta.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Possono essere necessarie dosi più elevate (resistenza ai diuretici).',
      crclSevere: 'Dosi elevate richieste (es. 100-250 mg EV) per raggiungere concentrazione efficace al sito d\'azione luminale tubulare.',
      dialysis: 'Inefficace nei pazienti anurici in dialisi. Se diuresi residua: dosi elevate (100-250 mg). Non rimosso dalla dialisi.',
      nephrotoxicRisk: false,
      notes: 'Monitorare creatinina e azotemia; transitori incrementi della creatinina durante decongestione non impongono la sospensione se la diuresi è adeguata e l\'emodinamica stabile.'
    },
    hepaticAdjustment: {
      childPughA: 'Dosi standard.',
      childPughB: 'Monitoraggio attento del potassio e dello stato di coscienza.',
      childPughC: 'Cautela estrema nella cirrosi scompensata: una diuresi eccessiva con ipopotassiemia e alcalosi metabolica precipita l\'encefalopatia epatica!',
      hepatotoxicRisk: false,
      notes: 'Nel paziente cirrotico associare sempre antialdosteronico (Spironolattone) e monitorare sodio e potassio.'
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipopotassiemia, ipomagnesiemia e alcalosi ipocloremica',
        description: 'La perdita urinaria di elettroliti favorisce aritmie ventricolari maligne (specie se associata a digossina o amiodarone). Reintegrare aggressivamente potassio e magnesio.'
      },
      {
        severity: 'moderate',
        title: 'Ototossicità a dosi elevate',
        description: 'Rischio di tinnito e sordità transitoria o permanente in caso di infusione EV rapida di dosi superiori a 80-100 mg, specie con concomitanti aminoglicosidi.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Aminoglicosidi (Gentamicina, Amikacina)',
        severity: 'major',
        mechanism: 'Effetto ototossico e nefrotossico sinergico.',
        clinicalAdvice: 'Monitorare funzione renale e audiometria; evitare boli rapidi di furosemide.'
      },
      {
        interactingDrug: 'FANS (Ketorolac, Ibuprofene)',
        severity: 'major',
        mechanism: 'I FANS inibiscono la sintesi renale di prostaglandine vasodilatatrici, riducendo l\'effetto natriuretico del diuretico e peggiorando la funzione renale.',
        clinicalAdvice: 'Sospendere i FANS nell\'insufficienza cardiaca acuta.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Heart Failure Guidelines 2023 Update',
        year: 2023,
        keyRecommendation: 'Nei pazienti con scompenso cardiaco acuto con sovraccarico idrico, somministrare tempestivamente Furosemide EV (dose iniziale 1-2 volte la dose orale giornaliera o 20-40 mg nei non trattati). Valutare la risposta natriuretica a 2 ore (> 50-70 mmol/L di Na spot urinario) o volume urinario > 100-150 ml/h.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Diuresi oraria (target > 100-150 ml/h nelle prime 6 ore nell\'EPA)',
      'Sodio, Potassio, Magnesio, Cloro, Creatinina ed EGA',
      'Pressione arteriosa (rischio ipotensione se volemia depleta)',
      'Peso corporeo e bilancio idrico giornaliero'
    ],
    isHighAlert: false
  },
  {
    id: 'nitroglicerina',
    name: 'Nitroglicerina (Trinitrina)',
    brandNames: ['Venitrin EV', 'Carvasin', 'Trinitrina cerotti/compresse'],
    drugClass: 'Nitrati & Vasodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['EPA & Insufficienza Cardiaca', 'Crisi Ipertensiva & Dissecazione', 'Tromboembolismo & SCA'],
    quickSummary: 'Vasodilatatore venoso primario e coronarico (e arteriolare ad alte dosi). Fondamentale nell\'Edema Polmonare Acuto e nell\'angina/ischemia miocardica acuta con PAS conservata.',
    mechanismOfAction: 'Rilascio di ossido nitrico (NO) nelle cellule muscolari lisce vascolari con stimolazione della guanilato ciclasi e aumento di cGMP. Prevalente venodilatazione a dosi standard (riduzione precarico e pressione di incuneamento capillare polmonare PCWP) e dilatazione coronarica; vasodilatazione arteriosa sistemica a dosi elevate.',
    dosages: [
      {
        indication: 'Edema Polmonare Acuto Ipertensivo (High-dose Nitrates)',
        bolusDose: 'Opzionale in emergenza: Boli EV ripetuti di 1-2 mg ogni 3-5 minuti sotto stretto controllo pressorio (o sublinguale 0.4 mg spray ogni 5 min).',
        maintenanceDose: 'Iniziare a 10-20 mcg/min e titolare rapidamente di 10-20 mcg/min ogni 3-5 minuti fino a remissione della dispnea e target pressorio (fino a 100-200 mcg/min).',
        preparation: 'Venitrin fiale 5 mg/1.5 ml o flaconi infusionali. Diluizione classica: 25 mg (5 fiale) in 250 ml SF (100 mcg/ml) oppure 50 mg in 50 ml SF (1 mg/ml = 1000 mcg/ml) per pompa siringa.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 1.0,
          defaultDilutionText: '50 mg in 50 ml SF (1000 mcg/ml)',
          unit: 'mcg/min',
          minRate: 5.0,
          maxRate: 300.0,
          defaultRate: 20.0,
          step: 5.0
        },
        route: ['Sublinguale', 'EV lento', 'Infusione continua'],
        clinicalTips: 'Mantenere PAS > 90-100 mmHg. Richiede set di infusione in polietilene/vetro (il PVC standard assorbe fino all\'80% del farmaco!).'
      },
      {
        indication: 'Sindrome Coronarica Acuta / Angina instabile persistente',
        maintenanceDose: '5 - 10 mcg/min titolati fino a risoluzione del dolore toracico ischemico o PAS limite (riduzione PAS del 10% nei normotesi, 25-30% negli ipertesi, mai PAS < 90 mmHg).',
        preparation: 'Come sopra via pompa siringa.',
        route: ['Infusione continua'],
        clinicalTips: 'Interrompere se compare cefalea incoercibile o ipotensione.'
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
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Rapido metabolismo epatico e vascolare. Titolare con cautela su PAS.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CONTROINDICAZIONE ASSOLUTA: Inibitori PDE-5 (Sildenafil, Tadalafil, Vardenafil)',
        description: 'La co-somministrazione con Sildenafil/Vardenafil nelle ultime 24 ore o Tadalafil nelle ultime 48 ore provoca vasodilatazione massiva irreversibile con ipotensione fatale e arresto cardiaco!',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Infarto Miocardico del Ventricolo Destro e Stenosi Aortica severa',
        description: 'Controindicato nell\'IMA inferiore con estensione al ventricolo destro (dipendente dal precarico: rischio collasso cardiocircolatorio severo) e nella stenosi aortica severa.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori della PDE-5 (Sildenafil / Tadalafil)',
        severity: 'contraindicated',
        mechanism: 'Accumulo estremo di cGMP con vasodilatazione letale.',
        clinicalAdvice: 'Non somministrare MAI nitrati prima che siano trascorse 24h (Sildenafil) o 48h (Tadalafil).'
      }
    ],
    guidelines: [
      {
        society: 'ESC NSTE-ACS & STEMI Guidelines 2023',
        year: 2023,
        keyRecommendation: 'I nitrati EV sono raccomandati nei pazienti con ischemia miocardica in atto, ipertensione non controllata o insufficienza cardiaca, a patto che non vi sia ipotensione o infarto del ventricolo destro.',
        evidenceLevel: 'Classe I, Livello C'
      },
      {
        society: 'ESC Acute Heart Failure Guidelines 2023',
        year: 2023,
        keyRecommendation: 'I vasodilatatori EV (nitroglicerina) devono essere considerati come terapia iniziale per migliorare i sintomi e ridurre la congestione nell\'EPA con PAS > 110 mmHg.',
        evidenceLevel: 'Classe IIa, Livello B'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua (NIBP ogni 3-5 min durante titolazione, poi oraria)',
      'Frequenza cardiaca (rischio tachicardia riflessa)',
      'Saturazione SpO2 e parametri respiratori',
      'Eventuale insorgenza di tolleranza ai nitrati dopo 24-48 ore di infusione continua'
    ],
    isHighAlert: false
  },
  {
    id: 'metoprololo-ev',
    name: 'Metoprololo EV',
    brandNames: ['Seloken EV'],
    drugClass: 'Beta-bloccanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Aritmie & Cardioversione', 'Tromboembolismo & SCA', 'Crisi Ipertensiva & Dissecazione'],
    quickSummary: 'Beta-bloccante cardio-selettivo (beta-1) somministrabile per via endovenosa rapida. Indicato nel controllo urgente della frequenza nella Fibrillazione Atriale e tachicardie sopraventricolari stabili.',
    mechanismOfAction: 'Blocco selettivo dei recettori beta-1 adrenergici cardiaci: rallenta la conduzione nel nodo atrioventricolare, deprime la frequenza cardiaca (cronotropismo negativo) e riduce la contrattilità (inotropismo negativo).',
    dosages: [
      {
        indication: 'Fibrillazione Atriale ad elevata risposta ventricolare (Rate Control)',
        bolusDose: '2.5 - 5 mg EV lenti in 2-3 minuti. Ripetibile ogni 5-10 minuti fino a controllo della frequenza (max 15 mg totali).',
        preparation: 'Fiala da 5 mg/5 ml (1 mg/ml) pronta per iniezione EV lenta senza diluizione o diluita a 10 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'Se efficace, passare a terapia orale dopo 1-2 ore (Metoprololo tartrato 25-50 mg os o succinato).'
      },
      {
        indication: 'Dissecazione Aortica Acuta Tipo A / B (in associazione a vasodilatatore)',
        bolusDose: '5 mg EV ogni 5-10 min fino a target frequenza cardiaca < 60 bpm e PAS < 120 mmHg.',
        preparation: 'Fiala da 5 mg/5 ml pura iniettata in 2 minuti.',
        route: ['EV lento'],
        clinicalTips: 'Nella dissecazione aortica iniziare SEMPRE il beta-bloccante PRIMA del vasodilatatore (es. nitroprussiato/urapidil) per evitare la tachicardia riflessa e l\'aumento dello shear stress sulla parete aortica.'
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
      childPughA: 'Dosi standard.',
      childPughB: 'Carico standard; cautela con dosi cumulative (metabolismo epatico via CYP2D6).',
      childPughC: 'Ridurre le dosi o allungare gli intervalli; clearance epatica ridotta.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Insufficienza Cardiaca Acuta Scompensata / Shock Cardiogeno',
        description: 'Controindicato nei pazienti con EPA in fase acuta conclamata, segni di ipoperfusione periferica o shock cardiogeno: l\'effetto inotropo negativo può precipitare il collasso emodinamico irreversibile.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Blocchi Atrio-Ventricolari e Bradicardia Severa',
        description: 'Controindicato con BAV di 2° o 3° grado, malattia del nodo del seno e frequenza cardiaca basale < 50-55 bpm.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Calcio-antagonisti non diidropiridinici (Verapamil EV, Diltiazem EV)',
        severity: 'contraindicated',
        mechanism: 'Sinergia profonda di depressione della contrattilità e della conduzione AV con rischio di arresto sinusale, BAV totale e shock.',
        clinicalAdvice: 'NON somministrare mai Verapamil EV insieme o a breve distanza da Metoprololo EV.'
      }
    ],
    guidelines: [
      {
        society: 'ESC AF Guidelines 2024',
        year: 2024,
        keyRecommendation: 'I beta-bloccanti EV sono la prima linea raccomandata per il controllo della frequenza nella FA acuta in pazienti con LVEF >= 40% emodinamicamente stabili.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Telemetria ECG continua (FC, intervallo PR, comparsa di BAV)',
      'Pressione arteriosa prima e dopo ogni bolo EV',
      'Esame obiettivo polmonare (comparsa di rantoli o peggioramento dispnea)'
    ],
    isHighAlert: false
  },
  {
    id: 'esmololo',
    name: 'Esmololo',
    brandNames: ['Brevibloc'],
    drugClass: 'Beta-bloccanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Aritmie & Cardioversione', 'Crisi Ipertensiva & Dissecazione'],
    quickSummary: 'Beta-bloccante adrenergico ultra-breve cardioselettivo. Ideale in terapia intensiva e PS per la titolazione rapida e reversibilità in pochi minuti (emivita 9 min).',
    mechanismOfAction: 'Beta-1 selettivo idrolizzato rapidamente dalle esterasi eritrocitarie citosoliche (indipendente dalla funzione renale ed epatica!). Inizia ad agire in 2 minuti, cessa l\'effetto entro 15-20 minuti dallo stop dell\'infusione.',
    dosages: [
      {
        indication: 'Tachiaritmie sopraventricolari / Crisi Ipertensiva d\'Urgenza',
        bolusDose: 'Bolo di carico opzionale: 500 mcg/kg (0.5 mg/kg) in 1 minuto.',
        maintenanceDose: 'Iniziare a 50 mcg/kg/min; se risposta inadeguata dopo 4 minuti, ripetere bolo da 500 mcg/kg e salire a 100, 150 fino a max 200-300 mcg/kg/min.',
        preparation: 'Flacone o sacca pronta da 2500 mg in 250 ml (10 mg/ml) per infusione.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 10.0,
          defaultDilutionText: '2500 mg in 250 ml (10 mg/ml)',
          unit: 'mcg/kg/min',
          minRate: 25.0,
          maxRate: 300.0,
          defaultRate: 50.0,
          step: 25.0
        },
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Se compaiono ipotensione o bradicardia eccessive, basta arrestare l\'infusione: il recupero emodinamico avviene entro 10-15 minuti.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento (metabolizzato da esterasi dei globuli rossi). Il metabolita inattivo acido viene eliminato dai reni ma non ha tossicità acuta.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento (non metabolizzato dal fegato).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipotensione marcata dose-dipendente',
        description: 'Circa il 20-30% dei pazienti sviluppa ipotensione arteriosa reversibile con la riduzione o lo stop della dose.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Verapamil / Diltiazem EV',
        severity: 'contraindicated',
        mechanism: 'Arresto sinusale o collasso emodinamico da duplice blocco nodale AV.',
        clinicalAdvice: 'Non associare EV.'
      }
    ],
    guidelines: [
      {
        society: 'ESC AF & Hypertension Emergency Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Farmaco di scelta quando è richiesta beta-bloccata rapida ma con profilo di sicurezza elevato in pazienti con stabilità emodinamica marginale.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua durante titolazione',
      'Monitoraggio ECG telemetrico continuo'
    ],
    isHighAlert: false
  },
  {
    id: 'urapidil',
    name: 'Urapidil',
    brandNames: ['Ebrantil'],
    drugClass: 'Nitrati & Vasodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Crisi Ipertensiva & Dissecazione', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Antiipertensivo ad azione rapida con duplice meccanismo (blocco alfa-1 periferico e stimolazione 5-HT1A centrale). Ideale nelle emergenze ipertensive con stroke, emorragia cerebrale o edema polmonare.',
    mechanismOfAction: 'Antagonista selettivo post-sinaptico dei recettori alfa-1 periferici (vasodilatazione arteriosa e riduzione delle resistenze periferiche) e agonista dei recettori serotoninergici 5-HT1A a livello bulbare centrale (previene la tachicardia riflessa tipica dei vasodilatatori).',
    dosages: [
      {
        indication: 'Emergenza Ipertensiva (Ipertensione severa con danno d\'organo, Stroke emorragico, Encefalopatia ipertensiva)',
        bolusDose: 'Bolo iniziale: 12.5 - 25 mg EV lenti in 20 secondi. Se PAS inadeguata dopo 5 minuti, ripetere 25 mg.',
        maintenanceDose: 'Infusione continua: iniziare a 5 - 15 mg/h (circa 9-40 mcg/min) e titolare su PAM target (max 40 mg/h).',
        preparation: 'Fiale da 25 mg/5 ml o 50 mg/10 ml. Per infusione continua: 100 mg (2 fiale da 50 mg) portati a 50 ml SF -> Concentrazione: 2 mg/ml.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 2.0,
          defaultDilutionText: '100 mg in 50 ml SF (2 mg/ml)',
          unit: 'mg/h',
          minRate: 2.0,
          maxRate: 40.0,
          defaultRate: 10.0,
          step: 2.0
        },
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Conserva la pressione di perfusione cerebrale e non induce tachicardia riflessa o aumento della pressione intracranica.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la velocità di infusione di mantenimento del 25-30% per ridotta clearance.',
      dialysis: 'Nessun accumulo tossico dialitico specifico. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la velocità di infusione di mantenimento del 30-50%.',
      childPughC: 'Metabolismo epatico esteso. Usare dosi iniziali ridotte e titolazione lenta.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Calo pressorio eccessivamente repentino',
        description: 'Nello stroke ischemico o emorragico non ridurre la PAM di oltre il 15-20% nelle prime ore per prevenire ischemia cerebrale secondaria nella penombra ischemica.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri antiipertensivi e sedativi',
        severity: 'moderate',
        mechanism: 'Effetto ipotensivo additivo.',
        clinicalAdvice: 'Titolare con attenzione se associato a nitrati o diuretici.'
      }
    ],
    guidelines: [
      {
        society: 'ESO Stroke Guidelines & ESC Hypertension 2024',
        year: 2024,
        keyRecommendation: 'Raccomandato come farmaco endovenoso di prima scelta nelle emergenze ipertensive, specialmente in corso di ictus ischemico (candidato a trombolisi con PA > 185/110) ed emorragia intracranica (target PAS 140 mmHg).',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua (NIBP ogni 2-5 min durante bolo/titolazione, poi continua con linea arteriosa)',
      'Esame neurologico seriato (GCS, NIHSS)',
      'Frequenza cardiaca'
    ],
    isHighAlert: false
  },
  {
    id: 'eparina-non-frazionata',
    name: 'Eparina Non Frazionata (UFH)',
    brandNames: ['Eparina Sodica Fiale', 'Calciparina'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Tromboembolismo & SCA', 'Arresto Cardiaco / ACLS'],
    quickSummary: 'Anticoagulante parenterale ad azione immediata, monitorabile con aPTT e rapidamente neutralizzabile con Protamina. Di prima scelta in insufficienza renale severa (CrCl < 15-30 ml/min) e pazienti candidati a procedure invasive immediate.',
    mechanismOfAction: 'Si lega all\'antitrombina III (ATIII) potenziando di 1000 volte la sua capacità di inattivare la trombina (Fattore IIa) e il Fattore Xa.',
    dosages: [
      {
        indication: 'Embolia Polmonare ad Alto Rischio / SCA STEMI / NSTEMI con IRC o instabilità',
        bolusDose: 'Bolo EV iniziale: 60 - 80 UI/kg (max 4000-5000 UI) EV in bolo lento.',
        maintenanceDose: 'Infusione continua iniziale: 12 - 18 UI/kg/h (max 1000 UI/h) titolata con nomogramma su aPTT ratio target 1.5 - 2.5 (o aPTT 50-70 secondi).',
        preparation: '25.000 UI (1 flacone da 5 ml) portate a 50 ml con Soluzione Fisiologica -> Concentrazione: 500 UI/ml.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 500.0,
          defaultDilutionText: '25.000 UI in 50 ml SF (500 UI/ml)',
          unit: 'UI/h',
          minRate: 200.0,
          maxRate: 2500.0,
          defaultRate: 1000.0,
          step: 50.0
        },
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Prelevare il primo controllo aPTT dopo 4-6 ore dall\'inizio dell\'infusione o dopo ogni variazione di velocità.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard su nomogramma aPTT.',
      crclModerate: 'Dose standard su nomogramma aPTT.',
      crclSevere: 'FARMACO DI PRIMA SCELTA IN IRC GRAVE (CrCl < 15-30 ml/min) rispetto a EBPM o Fondaparinux, poiché eliminato dal sistema reticolo-endoteliale e non si accumula a livello renale.',
      dialysis: 'Utilizzabile in dialisi. Non richiede riduzione di dose empirica ma stretto monitoraggio aPTT.',
      nephrotoxicRisk: false,
      notes: 'L\'eparina non frazionata è l\'anticoagulante di sicurezza per eccellenza nel paziente con insufficienza renale acuta o cronica severa.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Monitorare aPTT con cautela (possibile coagulopatia basale).',
      childPughC: 'I pazienti con insufficienza epatica severa hanno ridotta sintesi di antitrombina III e fattori della coagulazione; dosaggio e monitoraggio complessi.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Trombocitopenia Indotta da Eparina (HIT Tipo II)',
        description: 'Reazione immuno-mediata grave con caduta delle piastrine (> 50%) e trombosi paradossa arteriosa e venosa diffusa. Monitorare emocromo e conta piastrinica ogni 2-3 giorni. In caso di HIT sospendere immediatamente e passare ad anticoagulanti non eparinici (Fondaparinux o Argatroban).',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Rischio Emorragico Maggiore',
        description: 'Controindicato in emorragia attiva maggiore, recente ictus emorragico (< 30 giorni) o piastrinopenia severa (< 50.000/uL). Antidoto specifico: Solfato di Protamina.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri antitrombotici (Aspirina, Clopidogrel, Ticagrelor, DOAC)',
        severity: 'major',
        mechanism: 'Effetto anticoagulante/antiaggregante additivo con aumento del rischio di emorragia digestiva e intracranica.',
        clinicalAdvice: 'Associare solo se indicazione formale (es. SCA) e monitorare segni di sanguinamento.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Pulmonary Embolism & ACS Guidelines 2023/2024',
        year: 2023,
        keyRecommendation: 'UFH è raccomandata come prima scelta nei pazienti con embolia polmonare ad alto rischio (emodinamicamente instabili) o con severa compromissione renale (CrCl < 30 ml/min) grazie alla rapidità di reversione con protamina.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'aPTT ratio ogni 4-6 ore fino a 2 controlli consecutivi nel range terapeutico (1.5 - 2.5), poi ogni 24 ore',
      'Conta piastrinica (PLT) a tempo 0 e ogni 48-72 ore (screening HIT)',
      'Emoglobina e segni clinici di sanguinamento (feci, urine, ematomi)'
    ],
    antidote: 'Solfato di Protamina (1 mg neutralizza 100 UI di eparina somministrata nelle ultime 2 ore)',
    isHighAlert: true
  },
  {
    id: 'enoxaparina',
    name: 'Enoxaparina',
    brandNames: ['Clexane'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Tromboembolismo & SCA'],
    quickSummary: 'Eparina a basso peso molecolare (LMWH) di riferimento per la profilassi e il trattamento del tromboembolismo venoso e delle sindromi coronariche acute.',
    mechanismOfAction: 'Inibizione elevata e selettiva del Fattore Xa rispetto al Fattore IIa (rapporto circa 4:1) mediata da antitrombina III. Biodisponibilità sottocutanea vicina al 100% ed emivita prolungata.',
    dosages: [
      {
        indication: 'Trattamento TVP / Embolia Polmonare a rischio non alto',
        bolusDose: '1 mg/kg (100 UI/kg) ogni 12 ore SOTTOCUTE oppure 1.5 mg/kg una volta al giorno SC.',
        preparation: 'Siringhe preriempite da 20 mg (2000 UI), 40 mg (4000 UI), 60 mg (6000 UI), 80 mg (8000 UI), 100 mg (10.000 UI).',
        route: ['SC'],
        clinicalTips: 'Non spurgare la bolla d\'aria presente nella siringa preriempita prima dell\'iniezione sottocute (serve a sigillare il farmaco nel tessuto adiposo).'
      },
      {
        indication: 'STEMI (< 75 anni) in corso di fibrinolisi o PCI primaria',
        bolusDose: 'Bolo EV iniziale di 30 mg seguito dopo 15 minuti da 1 mg/kg SC (max 100 mg per le prime 2 dosi SC). Se età >= 75 anni: NO bolo EV, dose 0.75 mg/kg SC ogni 12 ore.',
        preparation: 'Bolo EV prelevato da siringa graduata o fiala.',
        route: ['EV rapido', 'SC'],
        clinicalTips: 'Nei pazienti >= 75 anni evitare il bolo EV per elevato rischio emorragico intracranico.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl >= 50 ml/min: 1 mg/kg ogni 12 ore.',
      crclModerate: 'CrCl 30-50 ml/min: 1 mg/kg ogni 12 ore (monitorare o ridurre se anziano/basso peso).',
      crclSevere: 'CrCl 15-29 ml/min: RIDURRE LA DOSE al 50%: 1 mg/kg UNA SOLA VOLTA AL GIORNO (ogni 24 ore).',
      dialysis: 'CrCl < 15 ml/min o Emodialisi: CONTROINDICATA per trattamento terapeutico (accumulo massivo di attività anti-Xa con emorragie letali). Passare a Eparina Non Frazionata (UFH)!',
      nephrotoxicRisk: false,
      notes: 'L\'enoxaparina viene eliminata per via renale. L\'accumulo in caso di clearance < 30 ml/min è una causa frequente di emorragie iatrogene maggiori in PS/reparto.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Cautela; monitorare emocromo e segni emorragici.',
      childPughC: 'Usare con prudenza; emivita prolungata e coagulopatia epatica concomitante.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ematoma Spinale ed Epidurale con Anestesia / Puntura Lombare',
        description: 'La puntura lombare o l\'anestesia spinale/epidurale in corso di enoxaparina comporta rischio di ematoma midollare con paralisi permanente. Rispettare intervallo di almeno 12-24 ore prima e 4 ore dopo la procedura.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Accumulo renale fatale se CrCl non verificata',
        description: 'Calcolare SEMPRE la Clearance della Creatinina (Cockcroft-Gault) prima della prescrizione terapeutica.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Antiaggreganti (ASA, Ticagrelor, Clopidogrel) e FANS',
        severity: 'major',
        mechanism: 'Effetto emorragico sinergico gastrico e sistemico.',
        clinicalAdvice: 'Monitorare segni di sanguinamento occulta.'
      }
    ],
    guidelines: [
      {
        society: 'ESC ACS Guidelines 2023 & CHEST Antithrombotic Guidelines',
        year: 2023,
        keyRecommendation: 'Enoxaparina 1 mg/kg bid SC è preferita a UFH per efficacia e prevedibilità nelle sindromi coronariche acute NSTE-ACS se CrCl > 30 ml/min.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Clearance Creatinina basale e periodica',
      'Conta piastrinica (screening per HIT, sebbene meno frequente di UFH)',
      'Emoglobina e segni clinici di sanguinamento',
      'Attività anti-Fattore Xa nei casi complessi (obesità patologica, gravidanza, CrCl borderline)'
    ],
    antidote: 'Solfato di Protamina (neutralizza parzialmente l\'attività anti-IIa, circa il 60% dell\'attività anti-Xa)',
    isHighAlert: true
  },
  {
    id: '4f-pcc',
    name: 'Complesso Protrombinico a 4 Fattori (4F-PCC)',
    brandNames: ['Confidex', 'Beriplex', 'Octaplex'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti'],
    quickSummary: 'Concentrato di fattori vitamina K-dipendenti (II, VII, IX, X, Proteina C e S). Trattamento d\'urgenza di prima scelta per l\'inversione immediata del sovradosaggio da AVK (Warfarin/Sintrom) e per emorragie maggiori da inibitori del Fattore Xa (Rivaroxaban, Apixaban, Edoxaban se Andexanet non disponibile).',
    mechanismOfAction: 'Ripristina istantaneamente nel plasma i livelli funzionali dei quattro fattori della coagulazione vitamina K-dipendenti, correggendo l\'INR e arrestando la coagulopatia entro 10-15 minuti dall\'infusione.',
    dosages: [
      {
        indication: 'Emorragia Maggiore / Intervento Urgente in corso di Warfarin (Sintrom) basato su INR iniziale',
        bolusDose: 'INR 2.0 - 3.9: 25 UI/kg (max 2500 UI). INR 4.0 - 6.0: 35 UI/kg (max 3500 UI). INR > 6.0: 50 UI/kg (max 5000 UI).',
        preparation: 'Flacone liofilizzato da 500 UI o 1000 UI con solvente annesso. Ricostituire delicatamente senza agitare. Infondere EV a velocità max 8 ml/min (circa 200 UI/min).',
        route: ['EV lento'],
        clinicalTips: 'SOMMINISTRARE SEMPRE INSIEME A VITAMINA K1 (Konakion 10 mg EV lento in 100 ml SF), altrimenti dopo 6-8 ore i fattori infusi decadono e l\'INR risale!'
      },
      {
        indication: 'Emorragia Maggiore Intracranica / Trattamento Rescue da Inibitori diretti del Fattore Xa (se Andexanet alfa assente)',
        bolusDose: 'Dose fissa: 2000 - 3000 UI EV (o 50 UI/kg).',
        preparation: 'Come sopra.',
        route: ['EV lento'],
        clinicalTips: 'Linee guida europee raccomandano 4F-PCC come alternativa valida se l\'antidoto specifico non è disponibile in farmacia ospedaliera.'
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
      childPughB: 'Dose standard guidata da INR e quadro clinico.',
      childPughC: 'Può essere utilizzato per correggere la coagulopatia grave con emorragia attiva; monitorare rischio trombotico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Rischio Tromboembolico Arterioso e Venoso',
        description: 'La rapida reintroduzione di concentrati di fattori procoagulanti può innescare trombosi venosa profonda, embolia polmonare o ictus ischemico, specie se la causa iniziale dell\'anticoagulazione era una valvola meccanica o FA ad alto rischio.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Acido Tranexamico (TXA)',
        severity: 'moderate',
        mechanism: 'Effetto procoagulante e antifibrinolitico combinato.',
        clinicalAdvice: 'Utilizzabile in traumi maggiori con emorragia catastrofica ma valutare attentamente il rischio trombotico sistemico.'
      }
    ],
    guidelines: [
      {
        society: 'ESC / ESO / CHEST Anticoagulation Reversal Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Nei pazienti con emorragia maggiore potenzialmente fatale (es. emorragia intracranica) in corso di AVK, il 4F-PCC è fortemente raccomandato rispetto al Plasma Fresco Congelato (FFP) per rapidità, minore volume ed efficacia superiore.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'INR a 15-30 minuti dal termine dell\'infusione (target INR <= 1.3 - 1.5)',
      'Controllo INR a 6-12 ore per verificare che la Vitamina K abbia riattivato la sintesi endogena',
      'Monitoraggio per complicanze tromboemboliche'
    ],
    isHighAlert: true
  },
  {
    id: 'idarucizumab',
    name: 'Idarucizumab',
    brandNames: ['Praxbind'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti'],
    quickSummary: 'Frammento di anticorpo monoclonale umanizzato (Fab) antidoto specifico e immediato per il Dabigatran (Pradaxa). Inverte l\'effetto anticoagulante in pochi minuti.',
    mechanismOfAction: 'Si lega a Dabigatran libero e legato alla trombina con un\'affinità circa 350 volte superiore a quella di Dabigatran per la trombina, neutralizzandone istantaneamente l\'azione senza mostrare attività procoagulante intrinseca.',
    dosages: [
      {
        indication: 'Emorragia fatale o intervento chirurgico indifferibile in paziente trattato con Dabigatran',
        bolusDose: '5 g EV totali, somministrati in 2 dosi consecutive da 2.5 g (2 flaconi da 50 ml ciascuno) ciascuna infusa in 5-10 minuti o in bolo EV rapido.',
        preparation: 'Due flaconi da 2.5 g/50 ml pronti per l\'infusione endovenosa.',
        route: ['EV rapido', 'EV lento'],
        clinicalTips: 'Non richiede aggiustamenti in base al peso o al tempo dall\'ultima assunzione. L\'effetto neutralizzante è completo entro 5 minuti.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento (5 g dose fissa).',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento. Il complesso Idarucizumab-Dabigatran viene escreto per via renale.',
      dialysis: 'Nessun aggiustamento.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'moderate',
        title: 'Iperkaliemia transitoria o reazioni anafilattoidi rare',
        description: 'I flaconi contengono sorbitolo (attenzione nei rari pazienti con intolleranza ereditaria al fruttosio).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Nessuna interazione farmacologica nota con altri farmaci d\'urgenza.',
        severity: 'moderate',
        mechanism: 'Altamente specifico per Dabigatran.',
        clinicalAdvice: 'La terapia anticoagulante (es. eparina) può essere reintrodotta dopo 24 ore se il paziente è emodinamicamente stabile ed emostasi raggiunta.'
      }
    ],
    guidelines: [
      {
        society: 'ESC AF Guidelines & ESO Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Idarucizumab 5 g EV è raccomandato come prima linea immediata per pazienti in terapia con Dabigatran che presentano emorragia maggiore pericolosa per la vita (es. intracranica) o richiedono chirurgia d\'urgenza.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'aPTT o tempo di trombina diluito (dTT) per confermare l\'avvenuta neutralizzazione',
      'Segni clinici di cessazione dell\'emorragia',
      'Valutazione per ripresa anticoagulazione protettiva appena sicuro'
    ],
    isHighAlert: true
  },
  {
    id: 'acido-tranexamico',
    name: 'Acido Tranexamico (TXA)',
    brandNames: ['Tranex', 'Ugurol'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti', 'Tromboembolismo & SCA'],
    quickSummary: 'Antifibrinolitico di comprovata efficacia salvavita nel trauma maggiore con shock emorragico (CRASH-2), emorragia post-partum (WOMAN) ed emorragia traumatica intracranica (CRASH-3 entro 3 ore).',
    mechanismOfAction: 'Inibitore competitivo dell\'attivazione del plasminogeno in plasmina; a concentrazioni più elevate inibisce direttamente la plasmina, prevenendo la degradazione della fibrina e stabilizzando il coagulo.',
    dosages: [
      {
        indication: 'Trauma Maggiore con emorragia severa o rischio emorragico (CRASH-2)',
        bolusDose: 'Carico: 1 g EV in 100 ml SF infusi in 10 minuti (ENTRO LE PRIME 3 ORE dal trauma).',
        maintenanceDose: 'Mantenimento: 1 g EV in 500 ml SF o fisiologica infuso in 8 ore continue.',
        preparation: 'Fiale da 500 mg/5 ml. Diluire in 100 ml di fisiologica per il carico.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'FONDAMENTALE IL TEMPO: Somministrare entro 3 ore dall\'evento traumatico. Se somministrato dopo 3 ore aumenta la mortalità!'
      },
      {
        indication: 'Emorragia Traumatica Intracranica lieve-moderata (GCS 9-15 entro 3 ore, CRASH-3)',
        bolusDose: '1 g EV in 10 minuti seguito da 1 g in 8 ore.',
        preparation: 'Come sopra.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Non indicato se GCS = 3 o pupille bilateralmente midriatiche fisse.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: Ridurre la dose di mantenimento del 50%.',
      crclSevere: 'CrCl 10-29 ml/min: Carico 1 g, mantenimento ridotto a 500 mg ogni 12-24 ore.',
      dialysis: 'CrCl < 10 ml/min: Rischio di accumulo con neurotossicità e convulsioni; ridurre fortemente.',
      nephrotoxicRisk: false,
      notes: 'L\'acido tranexamico ad alte dosi o se accumulato per insufficienza renale può provocare crisi convulsive miocloniche (antagonismo recettoriale GABA).'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard (escrezione renale per il 95%).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Finestra terapeutica temporale restrittiva (< 3 ore)',
        description: 'La somministrazione oltre le 3 ore dal trauma è inefficace e associata a un aumento del rischio di decesso e complicanze trombotiche.'
      },
      {
        severity: 'moderate',
        title: 'Ipotensione da bolo EV troppo rapido',
        description: 'L\'infusione del carico di 1 g in meno di 10 minuti può causare vasodilatazione e ipotensione transitoria.'
      }
    ],
    interactions: [
      {
        interactingDrug: '4F-PCC / Fattori procoagulanti concentrati',
        severity: 'moderate',
        mechanism: 'Potenziale incremento del rischio di trombosi micro e macrovascolare.',
        clinicalAdvice: 'Monitorare segni di ischemia d\'organo.'
      }
    ],
    guidelines: [
      {
        society: 'European Trauma Guidelines 2023 & CRASH-2/CRASH-3',
        year: 2023,
        keyRecommendation: 'Raccomandato il prima possibile nel paziente traumatizzato con emorragia attiva o a rischio di emorragia significativa alla dose di 1 g in 10 min seguito da 1 g in 8 ore, tassativamente entro 3 ore dall\'evento lesivo.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Stato neurologico (sorveglianza per convulsioni se insufficienza renale)',
      'Segni di emostasi e stabilità emodinamica',
      'Parametri emogasanalitici (lattati, deficit di basi, emoglobina)'
    ],
    isHighAlert: false
  },
  {
    id: 'piperacillina-tazobactam',
    name: 'Piperacillina / Tazobactam',
    brandNames: ['Tazocin', 'Piperacillina Tazobactam generico'],
    drugClass: 'Antibiotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Infezione & Sepsi'],
    quickSummary: 'Penicillina ad ampio spettro antipseudomonas con inibitore delle beta-lattamasi. Cardine nella sepsi di origine addominale, polmonite nosocomiale e sepsi a partenza sconosciuta nel paziente critico.',
    mechanismOfAction: 'Inibizione della sintesi della parete cellulare batterica legando le PBP (penicillin-binding proteins). Il tazobactam protegge la piperacillina dalla degradazione da parte delle beta-lattamasi plasmidiche e cromosomiche.',
    dosages: [
      {
        indication: 'Sepsi Grave / Shock Settico / Polmonite Ospedaliera / Sepsi Addominale (Adulto)',
        bolusDose: 'Dose di carico: 4.5 g (4 g piperacillina + 0.5 g tazobactam) EV infusi in 30-60 minuti (o infusione estesa in 3-4 ore dopo il carico iniziale per ottimizzare T > MIC).',
        maintenanceDose: '4.5 g ogni 6 ore (o 8 ore se infezioni non critiche) oppure infusione continua di 18 g/24h dopo dose di carico.',
        preparation: 'Flacone polvere da 4.5 g ricostituito con 20 ml di Soluzione Fisiologica o Acqua per preparazioni iniettabili, poi diluito in 100 ml SF.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'L\'infusione estesa (in 3-4 ore) o continua massimizza il tempo in cui la concentrazione supera la MIC (T > MIC) migliorando la sopravvivenza nello shock settico.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl > 50 ml/min: 4.5 g ogni 6 ore.',
      crclModerate: 'CrCl 30-50 ml/min: 4.5 g ogni 8 ore (o 3.375 g ogni 6 ore).',
      crclSevere: 'CrCl < 30 ml/min: 4.5 g ogni 12 ore (o 2.25 g ogni 6 ore).',
      dialysis: 'Emodialisi: 2.25 g ogni 8 ore + dose supplementare di 2.25 g al termine di ciascuna seduta dialitica. CRRT: 4.5 g ogni 8 ore.',
      nephrotoxicRisk: true,
      notes: 'ATTENZIONE: La combinazione con Vancomicina aumenta marcatamente l\'incidenza di danno renale acuto (AKI) rispetto a Vancomicina + Cefepime/Meropenem!'
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento di dose significativo; monitorare nei pazienti con insufficienza epatica e renale combinata.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Nefrotossicità sinergica con Vancomicina',
        description: 'La co-somministrazione empirica con Vancomicina è associata a un tasso significativamente più alto di insufficienza renale acuta (AKI). Considerare Cefepime o Meropenem come alternativa se il paziente ha già funzione renale borderline o altri agenti nefrotossici.'
      },
      {
        severity: 'high',
        title: 'Allergia a Penicilline e Beta-lattamici',
        description: 'Controindicato in caso di anamnesi positiva per anafilassi, angioedema o reazioni severe (DRESS, Stevens-Johnson) a penicilline.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Vancomicina',
        severity: 'major',
        mechanism: 'Sinergia nefrotossica a livello tubulare renale.',
        clinicalAdvice: 'Monitorare quotidianamente creatinina e diuresi; appena possibile de-escalare o sostituire uno dei due agenti.'
      },
      {
        interactingDrug: 'Metotressato',
        severity: 'major',
        mechanism: 'Riduce la clearance renale del metotressato con grave tossicità midollare.',
        clinicalAdvice: 'Evitare l\'associazione.'
      }
    ],
    guidelines: [
      {
        society: 'Surviving Sepsis Campaign Guidelines 2021/2024',
        year: 2021,
        keyRecommendation: 'Antibioticoterapia empirica ad ampio spettro deve essere somministrata entro 1 ora dal riconoscimento dello shock settico. L\'infusione prolungata delle beta-lattamine è raccomandata per migliorare la farmacocinetica/farmacodinamica nei pazienti critici.',
        evidenceLevel: 'Forte raccomandazione, evidenza moderata'
      }
    ],
    monitoring: [
      'Creatinina serica e diuresi oraria (sorveglianza AKI)',
      'Elettroliti (contiene circa 9.4 mEq di sodio per flacone da 4.5 g: rischio ipernatriemia)',
      'Procalcitonina e PCR per de-escalation guidata'
    ],
    isHighAlert: false
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    brandNames: ['Merrem'],
    drugClass: 'Antibiotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Infezione & Sepsi', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Carbapenemico ad amplissimo spettro d\'azione, attivo su batteri Gram-positivi, Gram-negativi compresi ESBL e Pseudomonas aeruginosa, e anaerobi. Farmaco di scelta nello shock settico nosocomiale e nella meningite batterica severa.',
    mechanismOfAction: 'Blocco della sintesi peptidoglicanica della parete cellulare batterica tramite legame ad alta affinità con le PBP 2 e 3. Elevata stabilità contro le beta-lattamasi compresi ceppi ESBL e AmpC.',
    dosages: [
      {
        indication: 'Shock Settico / Sepsi severa nosocomiale ad alto rischio patogeni resistenti',
        bolusDose: 'Carico: 1 - 2 g EV in 30 minuti seguito da infusione estesa in 3-4 ore o continua.',
        maintenanceDose: '1 g ogni 8 ore (o 2 g ogni 8 ore in infezioni da Pseudomonas o shock grave).',
        preparation: 'Flacone polvere da 1 g ricostituito con 20 ml SF, diluito in 100 ml SF.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'L\'infusione estesa in 3 ore di ogni dose ottimizza la percentuale di tempo sopra la MIC (T > MIC).'
      },
      {
        indication: 'Meningite Batterica Acuta dell\'Adulto',
        bolusDose: '2 g EV ogni 8 ore in 30 minuti.',
        preparation: '2 flaconi da 1 g diluiti in 100 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'Ha profilo pro-convulsivo notevolmente inferiore rispetto all\'Imipenem.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl > 50 ml/min: 1 - 2 g ogni 8 ore.',
      crclModerate: 'CrCl 26-50 ml/min: 1 g ogni 12 ore.',
      crclSevere: 'CrCl 10-25 ml/min: 500 mg ogni 12 ore.',
      dialysis: 'CrCl < 10 ml/min: 500 mg ogni 24 ore. Emodialisi: dose supplementare dopo seduta.',
      nephrotoxicRisk: false,
      notes: 'L\'accumulo per mancato aggiustamento in insufficienza renale severa può provocare neurotossicità ed encefalopatia.'
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento (eliminato prevalentemente per via renale).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'INTERAZIONE CRITICA: Crollo dei livelli di Acido Valproico',
        description: 'La co-somministrazione con Acido Valproico (Depakin) determina un crollo repentino e drastico (> 80%) dei livelli ematici di valproato entro 24 ore, precipitando crisi convulsive incontrollabili e stato di male epilettico refrattario! Associazione da evitare assolutamente.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Acido Valproico (Depakin)',
        severity: 'contraindicated',
        mechanism: 'I carbapenemi inibiscono l\'idrolisi del valproato glucuronide e ne aumentano la clearance renale, azzerando i livelli plasmatici.',
        clinicalAdvice: 'NON usare mai insieme. Se è necessario un carbapenemico, sostituire il valproato con Levetiracetam o Lacosamide.'
      }
    ],
    guidelines: [
      {
        society: 'Surviving Sepsis Campaign 2021 & ESCMID 2024',
        year: 2024,
        keyRecommendation: 'Terapia empirica di elezione per pazienti con shock settico e rischio di infezione da patogeni multiresistenti (MDR) produttori di ESBL.',
        evidenceLevel: 'Forte raccomandazione'
      }
    ],
    monitoring: [
      'Funzione renale (creatinina serica e clearance)',
      'Stato neurologico (monitoraggio comparsa di mioclonie se insufficienza renale)',
      'Conta leucocitaria e biomarcatori infettivi'
    ],
    isHighAlert: false
  },
  {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    brandNames: ['Rocefin'],
    drugClass: 'Antibiotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Infezione & Sepsi', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Cefalosporina di terza generazione ad ampio spettro con emivita lunga (mono-somministrazione giornaliera). Cardine nel trattamento empirico di polmoniti comunitarie gravi (CAP), pielonefriti e meningiti.',
    mechanismOfAction: 'Inibizione della sintesi della parete batterica mediante legame irreversibile alle PBP. Eccellente penetrazione nella barriera emato-encefalica in caso di meningite infiammatoria.',
    dosages: [
      {
        indication: 'Polmonite Acuta Comunitaria Grave (CAP) / Pielonefrite Acuta',
        bolusDose: '2 g EV in 30 minuti in mono-somministrazione giornaliera (ogni 24 ore).',
        preparation: 'Flacone polvere da 2 g diluito in 100 ml di Soluzione Fisiologica o Glucosata 5%.',
        route: ['EV lento'],
        clinicalTips: 'ATTENZIONE: NON diluire MAI in soluzioni contenenti calcio (es. Ringer Lattato) per rischio di precipitazione di cristalli insolubili!'
      },
      {
        indication: 'Meningite Batterica Acuta Comunitaria',
        bolusDose: '2 g EV ogni 12 ore (4 g/die totali) in 30 minuti (associato ad Ampicillina se età > 50 anni e Desametasone prima dose).',
        preparation: '2 g in 100 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'Somministrare la prima dose prima possibile senza ritardare per attendere TC o rachicentesi se non immediatamente eseguibili.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard (2 g/die).',
      crclModerate: 'Dose standard (2 g/die).',
      crclSevere: 'CrCl < 10 ml/min: Max 2 g al giorno (doppia via di eliminazione renale ed epatico-biliare).',
      dialysis: 'Dose standard (2 g/die). Non richiede dosi supplementari dopo dialisi (non dializzabile).',
      nephrotoxicRisk: false,
      notes: 'Uno dei pochi antibiotici che NON richiede riduzioni di dose nella quasi totalità dei pazienti con insufficienza renale pura, grazie al compenso biliare.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Se insufficienza epatica E renale grave concomitante: ridurre la dose a max 1-2 g/die e monitorare concentrazioni.',
      hepatotoxicRisk: false,
      notes: 'Possibile formazione di fango biliare (biliary sludging) da sali di ceftriaxone calcico, di solito asintomatico e reversibile.'
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'INCOMPATIBILITÀ FATALE CON SOLUZIONI CONTENENTI CALCIO',
        description: 'La miscelazione o la co-somministrazione con soluzioni contenenti calcio (es. Ringer Lattato, Ringer Acetato, Calcio Gluconato/Cloruro) provoca precipitazione massiva di sali insolubili di ceftriaxone-calcio con rischio di embolizzazione polmonare o renale letale!',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Soluzioni EV contenenti Calcio (Ringer Lattato)',
        severity: 'contraindicated',
        mechanism: 'Precipitazione chimica fisica immediata endovenosa.',
        clinicalAdvice: 'Usare SOLO Soluzione Fisiologica 0.9% o Glucosata 5% per la diluizione e lavare accuratamente la linea prima e dopo.'
      }
    ],
    guidelines: [
      {
        society: 'IDSA / ATS CAP Guidelines & ESCMID Meningitis 2024',
        year: 2024,
        keyRecommendation: 'Ceftriaxone 2 g EV die è la base empirica della terapia per polmonite comunitaria grave (in associazione con Macrolide) e per meningite comunitaria (2 g bid).',
        evidenceLevel: 'Forte raccomandazione, livello A'
      }
    ],
    monitoring: [
      'Segni clinici di tollerabilità ed esantemi',
      'Emocromo e parametri di flogosi'
    ],
    isHighAlert: false
  },
  {
    id: 'fentanil',
    name: 'Fentanil (Fentanyl)',
    brandNames: ['Fentanest', 'Sublimaze'],
    drugClass: 'Oppioidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Dolore Acuto & Analgesia', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Potente oppioide sintetico ad azione rapida (1-2 minuti) e breve durata (30-60 min). Prima scelta per l\'analgesia d\'urgenza nel paziente emodinamicamente instabile e per il pre-trattamento nell\'intubazione (RSI).',
    mechanismOfAction: 'Agonista puro selettivo dei recettori oppioidi mu nel sistema nervoso centrale. Circa 50-100 volte più potente della morfina. Minimo rilascio di istamina (non causa vasodilatazione o ipotensione significativa a differenza della morfina).',
    dosages: [
      {
        indication: 'Dolore Acuto Severo in Emergenza / Trauma / SCA',
        bolusDose: '1 - 2 mcg/kg EV lento (solitamente 50 - 100 mcg nell\'adulto). Ripetibile a dosi di 25-50 mcg ogni 5-10 minuti fino a controllo del dolore (NRS < 4).',
        preparation: 'Fiale da 0.1 mg/2 ml (50 mcg/ml) o 0.5 mg/10 ml. Iniettare lentamente in almeno 1-2 minuti.',
        route: ['EV lento', 'Intranasale'],
        clinicalTips: 'Disponibile anche per via intranasale (con dispositivo atomizzatore MAD a 1.5 mcg/kg) nel paziente senza accesso venoso immediato.'
      },
      {
        indication: 'Pre-trattamento RSI (Rapid Sequence Intubation)',
        bolusDose: '2 - 3 mcg/kg EV lento (circa 150-200 mcg) 3 minuti prima dell\'induzione per smussare la risposta simpatectomica ipertensiva alla laringoscopia (specie in stroke, dissezione aortica, ipertensione endocranica).',
        preparation: 'Fiala pura iniettata lentamente.',
        route: ['EV lento'],
        clinicalTips: 'Evitare se shock o ipovolemia marcata.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 25% (nessun metabolita tossico attivo a differenza della morfina, quindi OPPIOIDE DI PRIMA SCELTA IN INSUFFICIENZA RENALE).',
      dialysis: 'Dose ridotta del 25-50%. Non dializzabile.',
      nephrotoxicRisk: false,
      notes: 'A differenza della Morfina (i cui metaboliti M6G e M3G si accumulano causando coma e tossicità), il Fentanil non ha metaboliti attivi ed è sicuro in dialisi e IRC.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose iniziale del 25-50% e titolare lentamente.',
      childPughC: 'Metabolismo epatico esteso via CYP3A4. Clearance fortemente diminuita; prolungamento della sedazione e depressione respiratoria.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Depressione Respiratoria Grave e Rigidità della Parete Toracica (Wooden Chest)',
        description: 'La somministrazione EV troppo rapida di dosi elevate può causare apnea immediata e rigidità muscolare della parete toracica e glottica (chest wall rigidity), rendendo impossibile la ventilazione con pallone autoespandibile! Trattamento: Naloxone o bloccante neuromuscolare.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Benzodiazepine (Midazolam, Lorazepam) e altri sedativi centrali',
        severity: 'major',
        mechanism: 'Depressione respiratoria sinergica profonda e ipotensione.',
        clinicalAdvice: 'Se combinati per sedazione procedurale, dimezzare le dosi di entrambi e avere sempre pronto Naloxone e carrello per gestione vie aeree.'
      },
      {
        interactingDrug: 'Inibitori potenti del CYP3A4 (Claritromicina, Ketoconazolo)',
        severity: 'moderate',
        mechanism: 'Aumento dei livelli ematici e prolungamento dell\'azione.',
        clinicalAdvice: 'Monitorare sedazione.'
      }
    ],
    guidelines: [
      {
        society: 'ERC / ESAIC Procedural Sedation & Analgesia Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Oppioide di prima scelta per il controllo rapido del dolore severo nel paziente traumatizzato instabile e per la sedo-analgesia procedurale d\'urgenza.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Capnografia (EtCO2) raccomandata in sedazione procedurale',
      'Saturazione SpO2 e frequenza respiratoria continua',
      'Pressione arteriosa e stato di coscienza',
      'Disponibilità immediata al letto di Naloxone'
    ],
    antidote: 'Naloxone (0.1 - 0.4 mg EV)',
    isHighAlert: true
  },
  {
    id: 'morfina-cloridrato',
    name: 'Morfina Cloridrato EV',
    brandNames: ['Morfina Cloridrato Fiale'],
    drugClass: 'Oppioidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Dolore Acuto & Analgesia'],
    quickSummary: 'Oppioide naturale di riferimento per il dolore acuto oncologico o da trauma maggiore nel paziente con funzione renale integra. Nota: non più raccomandata di routine nell\'Edema Polmonare Acuto.',
    mechanismOfAction: 'Agonista potente dei recettori oppioidi mu. Produce analgesia profonda, sedazione, anxiolisi e vasodilatazione sistemica (in parte mediata da rilascio istaminico).',
    dosages: [
      {
        indication: 'Dolore Acuto Severo (Trauma, Ischemia degli arti, Dolore toracico non controllato)',
        bolusDose: '2 - 5 mg EV lenti (0.05 - 0.1 mg/kg) ogni 5-15 minuti fino a remissione del dolore.',
        preparation: 'Diluire 1 fiala da 10 mg/1 ml in 9 ml di Soluzione Fisiologica per ottenere una concentrazione di 1 mg/ml. Titolare 2 ml (2 mg) alla volta.',
        route: ['EV lento', 'SC'],
        clinicalTips: 'Titolare sempre a piccoli boli frazionati monitorando la frequenza respiratoria dopo ciascuna dose.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: Ridurre la dose del 25-50% o allungare gli intervalli.',
      crclSevere: 'CrCl < 30 ml/min: CONTROINDICATA o evitare l\'uso ripetuto! I metaboliti attivi morfina-6-glucuronide (M6G) e morfina-3-glucuronide (M3G) si accumulano provocando narcosi prolungata, mioclonie e arresto respiratorio tardivo!',
      dialysis: 'Evitare nei dializzati. Preferire Fentanil.',
      nephrotoxicRisk: false,
      notes: 'In insufficienza renale acuta o cronica (CrCl < 50 ml/min), il Fentanil è nettamente più sicuro della Morfina.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Estrema prudenza nella cirrosi avanzata: la morfina può precipitare rapidamente encefalopatia epatica e coma!',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Non più raccomandata di routine nell\'Edema Polmonare Acuto (EPA)',
        description: 'Le linee guida ESC Heart Failure sconsigliano l\'uso routinario della morfina nell\'EPA: associata a un aumento del tasso di intubazione, ricovero in terapia intensiva e mortalità.'
      },
      {
        severity: 'high',
        title: 'Depressione respiratoria e ipotensione da istamino-liberazione',
        description: 'Puo causare ipotensione ortostatica o vasodilatazione per liberazione di istamina (a differenza del fentanil).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori della ricaptazione P2Y12 (Ticagrelor, Clopidogrel, Prasugrel)',
        severity: 'major',
        mechanism: 'La morfina ritarda lo svuotamento gastrico e riduce significativamente l\'assorbimento e l\'azione antiaggregante dei farmaci P2Y12 orali nelle SCA.',
        clinicalAdvice: 'Nelle sindromi coronariche acute somministrare la morfina solo se dolore persistente refrattario a nitrati.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Acute Heart Failure Guidelines 2023',
        year: 2023,
        keyRecommendation: 'L\'uso routinario di oppiacei nell\'insufficienza cardiaca acuta non è raccomandato e può essere considerato solo con cautela in pazienti selezionati con dolore severo o agitazione intrattabile.',
        evidenceLevel: 'Classe III (Non raccomandato), Livello C'
      }
    ],
    monitoring: [
      'Frequenza respiratoria e saturazione SpO2',
      'Pressione arteriosa e sedazione',
      'Valutazione della scala del dolore NRS/VAS'
    ],
    antidote: 'Naloxone',
    isHighAlert: true
  },
  {
    id: 'propofol',
    name: 'Propofol',
    brandNames: ['Diprivan', 'Propofol Kabi'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Sedazione Procedurale & RSI', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Ipnotico endovenoso ad azione rapidissima (30-45 secondi) e risveglio pronto (5-10 minuti). Ideale per cardioversioni elettriche d\'urgenza, sedazione procedurale e induzione RSI nel paziente normoteso.',
    mechanismOfAction: 'Modulazione allosterica positiva dei recettori GABA-A nel SNC con aumento della conduttanza al cloro e inibizione dell\'attività neuronale. Proprietà anticonvulsivanti e di riduzione del consumo metabolico cerebrale di O2 (CMRO2).',
    dosages: [
      {
        indication: 'Cardioversione Elettrica Sincronizzata / Sedazione Procedurale Breve',
        bolusDose: '0.5 - 1.0 mg/kg EV lento (solitamente 30-70 mg nell\'adulto) infuso in 30-60 secondi.',
        preparation: 'Emulsione lipidica all\'1% (10 mg/ml) pronta in fiale da 20 ml o siringa pre-riempita.',
        route: ['EV lento'],
        clinicalTips: 'Provoca dolore bruciante all\'iniezione periferica: prevenibile con pre-trattamento con Lidocaina 20-40 mg EV o accesso su vena di grosso calibro.'
      },
      {
        indication: 'Induzione RSI (Rapid Sequence Intubation) in paziente emodinamicamente stabile',
        bolusDose: '1.5 - 2.5 mg/kg EV (ridurre a 0.5-1.0 mg/kg se anziano o paziente borderline).',
        preparation: 'Emulsione 1% pronta.',
        route: ['EV rapido'],
        clinicalTips: 'CONTROINDICATO se shock o ipotensione marcata (preferire Ketamina o Etomidato!).'
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
      childPughB: 'Ridurre la dose del 25-30% e titolare lentamente.',
      childPughC: 'Metabolismo epatico esteso. Ridurre dose di carico e velocità di mantenimento.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ipotensione Arteriosa Marcata e Apnea',
        description: 'Potente vasodilatatore venoso e arterioso e depressore miocardico: provoca caduta marcata della PAM (-20% / -30%). Non usare come induttore primario nel paziente in shock! Avere sempre pronta Noradrenalina o fluidi.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Sindrome da Infusione di Propofol (PRIS)',
        description: 'In caso di infusione prolungata (> 48h) a dosi elevate (> 4-5 mg/kg/h): acidosi metabolica refrattaria, rabdomiolisi, iperkaliemia, epatomegalia e collasso cardiocircolatorio fatale.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri deprimenti del SNC (Oppioidi, Benzodiazepine)',
        severity: 'major',
        mechanism: 'Effetto sinergico ipotensivo e di depressione respiratoria.',
        clinicalAdvice: 'Ridurre i dosaggi di entrambi.'
      }
    ],
    guidelines: [
      {
        society: 'ESAIC / ASA Procedural Sedation Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Farmaco di scelta per sedazione procedurale rapida in emergenza (es. cardioversione) grazie alla rapidità d\'azione e alla pronta ripresa dei riflessi protettivi.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua o a intervalli di 1-2 minuti',
      'Capnografia (EtCO2) e saturazione SpO2',
      'Presenza di materiale per intubazione e gestione avanzata delle vie aeree'
    ],
    isHighAlert: true
  },
  {
    id: 'ketamina',
    name: 'Ketamina',
    brandNames: ['Ketalar'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Sedazione Procedurale & RSI', 'Dolore Acuto & Analgesia', 'Asma Acuto'],
    quickSummary: 'Anestetico dissociativo con proprietà simpaticomimetiche e broncodilatatrici. Preserva il drive respiratorio e la pressione arteriosa. Induttore di prima scelta nella RSI in shock, asma critico e politrauma.',
    mechanismOfAction: 'Antagonista non competitivo dei recettori NMDA del glutammato e modulatore dei recettori oppioidi, colinergici e monoaminergici. Stimolazione simpatica centrale con rilascio di catecolamine (aumento PA e FC) e potente broncodilatazione diretta.',
    dosages: [
      {
        indication: 'Induzione RSI in paziente ipoteso / in shock o con asma acuto severo',
        bolusDose: '1.5 - 2.0 mg/kg EV (o 4-5 mg/kg IM se mancato accesso venoso in paziente agitato non gestibile).',
        preparation: 'Fiale da 50 mg/ml (10 ml = 500 mg) o 10 mg/ml. Prelevare la dose calcolata per peso.',
        route: ['EV rapido', 'IM'],
        clinicalTips: 'Mantiene il tono vascolare e induce eccellente broncodilatazione nei pazienti con asma quasi-fatale.'
      },
      {
        indication: 'Analgesia a Basso Dosaggio (Low-dose Ketamine) per dolore acuto severo',
        bolusDose: '0.2 - 0.3 mg/kg EV lenti in 10-15 minuti (es. 15-20 mg nell\'adulto).',
        preparation: 'Diluire in 100 ml di fisiologica e infondere in 15 minuti per minimizzare allucinazioni/disforia.',
        route: ['EV lento'],
        clinicalTips: 'Fornisce potente risparmio oppioide senza depressione respiratoria.'
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
      childPughB: 'Ridurre la dose del 25% o allungare gli intervalli.',
      childPughC: 'Metabolismo epatico esteso (demetilazione a norketamina attiva). Prolungamento dell\'emivita.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Reazioni da Risveglio (Emergence Delirium / Disforia)',
        description: 'Circa il 10-20% dei pazienti adulti può sviluppare allucinazioni vivide, sogni bizzarri o agitazione al risveglio. Prevenibile/trattabile con basse dosi di Midazolam (1-2 mg EV).'
      },
      {
        severity: 'moderate',
        title: 'Deplezione catecolaminica nello shock prolungato',
        description: 'Nel paziente con shock grave prolungato con riserve catecolaminiche completamente esaurite, la ketamina può manifestare il suo effetto depressore miocardico intrinseco (ridurre la dose a 0.5-1 mg/kg).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Sedativi e oppioidi',
        severity: 'moderate',
        mechanism: 'Effetto sinergico analgesico e sedativo.',
        clinicalAdvice: 'Monitorare parametri vitali.'
      }
    ],
    guidelines: [
      {
        society: 'National / European Airway Management Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Ketamina 1.5-2 mg/kg è l\'agente di induzione di prima scelta per l\'intubazione a sequenza rapida (RSI) in pazienti emodinamicamente compromessi o con broncospasmo acuto.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa e frequenza cardiaca',
      'Saturazione SpO2 e capnografia',
      'Valutazione della comparsa di scialorrea (ipersecrezione salivare)'
    ],
    isHighAlert: false
  },
  {
    id: 'rocuronio',
    name: 'Rocuronio',
    brandNames: ['Esmeron'],
    drugClass: 'Bloccanti neuromuscolari',
    clinicalSetting: 'ps',
    emergencyIndications: ['Sedazione Procedurale & RSI'],
    quickSummary: 'Bloccante neuromuscolare non depolarizzante ad azione rapida. Farmaco di prima scelta per la miorisoluzione nella RSI d\'urgenza, con disponibilità dell\'antidoto specifico immediato (Sugammadex).',
    mechanismOfAction: 'Antagonista competitivo reversibile dei recettori colinergici nicotinici a livello della placca motrice terminale del muscolo scheletrico.',
    dosages: [
      {
        indication: 'Intubazione a Sequenza Rapida (RSI) in Emergenza',
        bolusDose: '1.2 mg/kg EV in bolo rapido (dose piena RSI per ottenere paralisi completa e ottime condizioni di intubazione entro 45-60 secondi). Se intubazione standard: 0.6 mg/kg.',
        preparation: 'Fiale da 50 mg/5 ml (10 mg/ml) o 100 mg/10 ml pronte per somministrazione rapida.',
        route: ['EV rapido'],
        clinicalTips: 'A 1.2 mg/kg l\'onset è rapido quanto la succinilcolina (~60 sec) ma senza i rischi di iperkaliemia. Durata della paralisi: 45-70 minuti.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento della dose di intubazione.',
      crclModerate: 'Dose di intubazione invariata (1.2 mg/kg). Durata d\'azione lievemente prolungata.',
      crclSevere: 'Dose di intubazione invariata. Durata del blocco allungata (eliminazione renale ~30%).',
      dialysis: 'Dose di carico invariata. In caso di necessità di reversal urgente, Sugammadex può essere utilizzato anche in dialisi.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose di carico standard.',
      childPughB: 'Dose di carico standard (1.2 mg/kg). Durata d\'azione prolungata (eliminazione biliare prevalente ~70%).',
      childPughC: 'Durata d\'azione significativamente più lunga. Monitoraggio train-of-four (TOF).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'PARALISI SENZA SEDAZIONE: MAI SOMMINISTRARE SENZA PREVIA IPNOSI PROFONDA',
        description: 'Il rocuronio paralizza tutti i muscoli scheletrici ma non ha alcun effetto sedativo, ipnotico o analgesico. La somministrazione in paziente cosciente provoca terrore psicologico estremo e asfissia cosciente! Somministrare SEMPRE solo DOPO la perdita di coscienza indotta dall\'ipnotico.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Sugammadex (Bridion)',
        severity: 'major',
        mechanism: 'Chela il rocuronio 1:1 nel plasma con reversione immediata della paralisi in < 3 minuti.',
        clinicalAdvice: 'Antidoto specifico salvavita in caso di "cannot intubate, cannot oxygenate" (CICO).'
      }
    ],
    guidelines: [
      {
        society: 'Difficult Airway Society (DAS) & ERC Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Rocuronio ad alte dosi (1.2 mg/kg) è fortemente raccomandato come miorilassante di scelta nella RSI d\'urgenza, con disponibilità al letto di Sugammadex per reversal immediato in caso di via aerea fallita.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Capnografia continua a conferma dell\'intubazione tracheale',
      'Profondità dell\'anestesia e sedazione continua',
      'Train-of-Four (TOF) se blocco prolungato'
    ],
    antidote: 'Sugammadex (Bridion: 16 mg/kg per reversal immediato post-RSI)',
    isHighAlert: true
  },
  {
    id: 'sugammadex',
    name: 'Sugammadex',
    brandNames: ['Bridion'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Sedazione Procedurale & RSI', 'Intossicazioni & Antidoti'],
    quickSummary: 'Ciclodestrina modificata per la reversione selettiva e immediata del blocco neuromuscolare da Rocuronio e Vecuronio. Salvavita nello scenario "Cannot Intubate, Cannot Oxygenate" (CICO).',
    mechanismOfAction: 'Incapsula direttamente le molecole di rocuronio libero nel torrente circolatorio con un rapporto 1:1 formando un complesso inattivo stabile ad altissima affinità, dissociandolo dalla giunzione neuromuscolare ed eliminandolo per via renale.',
    dosages: [
      {
        indication: 'Reversione Immediata d\'Emergenza post-RSI con Rocuronio 1.2 mg/kg (Scenario CICO)',
        bolusDose: '16 mg/kg EV in bolo rapido singolo (reversione della paralisi entro 90-180 secondi).',
        preparation: 'Flaconi da 200 mg/2 ml o 500 mg/5 ml (100 mg/ml). Per un adulto di 70 kg: circa 1100 mg = 11 ml (poco più di 2 flaconi da 500 mg).',
        route: ['EV rapido'],
        clinicalTips: 'Permette la ripresa spontanea della respirazione e dei riflessi protettivi in circa 2 minuti dopo rocuronio.'
      },
      {
        indication: 'Reversione di routine del blocco profondo o moderato',
        bolusDose: 'Blocco profondo: 4 mg/kg EV. Blocco moderato: 2 mg/kg EV.',
        preparation: 'Come sopra.',
        route: ['EV rapido'],
        clinicalTips: 'Molto più rapido ed esente dai severi effetti collaterali colinergici della Neostigmina + Atropina.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'CrCl < 30 ml/min: L\'emivita di eliminazione del complesso è prolungata, ma in emergenza vitale (CICO) si usa ugualmente a dose piena (16 mg/kg); il complesso viene rimosso con filtri ad alto flusso in dialisi.',
      dialysis: 'Utilizzabile in emergenza salvavita a dose piena.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento (eliminazione prevalentemente renale).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Bradicardia marcata e arresto sinusale',
        description: 'Sono stati segnalati rari casi di bradicardia severa transitoria e arresto cardiaco entro pochi minuti dalla somministrazione. Avere pronta Atropina.'
      },
      {
        severity: 'moderate',
        title: 'Interferenza con Contraccettivi Orali Ormonali',
        description: 'Sugammadex chela anche gli ormoni steroidei: le donne che assumono estroprogestinici orali devono usare metodi barriera aggiuntivi per i successivi 7 giorni.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Contraccettivi orali',
        severity: 'moderate',
        mechanism: 'Riduzione dei livelli plasmatici di progestinici.',
        clinicalAdvice: 'Avvisare la paziente.'
      }
    ],
    guidelines: [
      {
        society: 'ESAIC Guidelines on Neuromuscular Block Management 2023',
        year: 2023,
        keyRecommendation: 'Sugammadex 16 mg/kg deve essere immediatamente disponibile in sala emergenza/shock room per reversione immediata del rocuronio nello scenario critico CICO.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Frequenza cardiaca e ritmo (sorveglianza bradicardia transitoria)',
      'Ripresa della ventilazione spontanea e del volume corrente'
    ],
    isHighAlert: false
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    brandNames: ['Ipnovel'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Convulsioni & Neurologia d\'Urgenza', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Benzodiazepina idrosolubile ad azione rapida e breve durata. Farmaco di prima scelta per lo stato di male epilettico attivo (somministrabile anche per via intramuscolare o buccale) e per la sedazione procedurale.',
    mechanismOfAction: 'Agonista allosterico dei recettori GABA-A: potenzia l\'azione inibitoria del GABA aprendo i canali del cloro con iperpolarizzazione neuronale.',
    dosages: [
      {
        indication: 'Stato di Male Epilettico (Convulsioni continue > 5 minuti)',
        bolusDose: 'Se via EV disponibile: 0.1 mg/kg (circa 5 - 10 mg) EV lenti in 2 minuti. Se NO via EV immediata: 10 mg INTRAMUSCOLO (o buccale/intranasale a 0.2 mg/kg).',
        preparation: 'Fiale da 5 mg/1 ml o 15 mg/3 ml pronte.',
        route: ['EV lento', 'IM', 'Intranasale'],
        clinicalTips: 'Nello studio RAMPART, Midazolam 10 mg IM è risultato più rapido ed efficace del Lorazepam EV nel controllo dello stato epilettico preospedaliero e di PS per il risparmio del tempo di incannulamento venoso.'
      },
      {
        indication: 'Sedazione Procedurale / Ansiolisi pre-procedura',
        bolusDose: '1 - 2.5 mg EV lenti in 2 minuti (ridurre a 0.5-1 mg nell\'anziano).',
        preparation: 'Fiala da 5 mg/5 ml diluita.',
        route: ['EV lento'],
        clinicalTips: 'Attendere almeno 2-3 minuti prima di somministrare dosi ulteriori per valutare il picco di sedazione.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose iniziale invariata; in caso di infusione continua ridurre del 50% per accumulo del metabolita 1-idrossi-midazolam glucuronide attivo.',
      dialysis: 'Dose singola invariata; evitare infusioni prolungate.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 30-50%.',
      childPughC: 'Metabolismo epatico esteso via CYP3A4. Clearance ridotta fino a 3 volte; forte rischio di coma e depressione respiratoria prolungata.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Depressione respiratoria e ipotensione',
        description: 'La depressione respiratoria è frequente, specie se associato a oppioidi o nell\'anziano. Avere pronto Flumazenil.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi e altri sedativi',
        severity: 'major',
        mechanism: 'Effetto sinergico di depressione respiratoria.',
        clinicalAdvice: 'Monitorare con capnografia e pulsossimetria.'
      }
    ],
    guidelines: [
      {
        society: 'AES / ESO Guidelines on Status Epilepticus 2023',
        year: 2023,
        keyRecommendation: 'Le benzodiazepine (Midazolam IM 10 mg o Lorazepam/Diazepam EV) sono la terapia iniziale di Fase 1 raccomandata con il massimo livello di evidenza nello stato epilettico convulsivo.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Pulsossimetria SpO2 e pervietà delle vie aeree',
      'Stato neurologico e cessazione dell\'attività critica motoria ed elettroencefalografica',
      'Pressione arteriosa'
    ],
    antidote: 'Flumazenil (Anexate: 0.2 - 0.5 mg EV lenti)',
    isHighAlert: false
  },
  {
    id: 'levetiracetam',
    name: 'Levetiracetam',
    brandNames: ['Keppra EV'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Antiepilettico di seconda linea nello stato di male epilettico refrattario alle benzodiazepine (ESETT trial). Profilo di tollerabilità eccellente con assenza di sedazione o depressione emodinamica.',
    mechanismOfAction: 'Si lega selettivamente alla proteina della vescicola sinaptica SV2A, inibendo il rilascio presinaptico dei neurotrasmettitori eccitatori e stabilizzando l\'ipereccitabilità neuronale parossistica.',
    dosages: [
      {
        indication: 'Stato di Male Epilettico (Fase 2: crisi persistenti dopo benzodiazepina)',
        bolusDose: '60 mg/kg EV (max 4500 mg, dose standard adulto tipica 3000 - 4000 mg) infusi in 10-15 minuti.',
        preparation: 'Fiale da 500 mg/5 ml. Diluire la dose (es. 3000-4000 mg) in 100 ml di Soluzione Fisiologica.',
        route: ['EV lento'],
        clinicalTips: 'Lo studio ESETT ha dimostrato non-inferiorità rispetto a Fosfenitoina e Valproato con minore cardiotossicità ed eccezionale stabilità pressoria.'
      },
      {
        indication: 'Profilassi post-traumatica / Crisi epilettica isolata',
        maintenanceDose: '500 - 1000 mg ogni 12 ore EV o os.',
        preparation: 'Diluire in 100 ml SF e infondere in 15 minuti.',
        route: ['EV lento'],
        clinicalTips: 'Ottima compatibilità; non richiede monitoraggio terapeutico ematico routinario in emergenza.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl > 80 ml/min: 1000 - 1500 mg ogni 12 ore (carico acuto invariato).',
      crclModerate: 'CrCl 50-79 ml/min: 500 - 1000 mg ogni 12 ore. CrCl 30-49 ml/min: 250 - 750 mg ogni 12 ore.',
      crclSevere: 'CrCl < 30 ml/min: 250 - 500 mg ogni 12 ore.',
      dialysis: 'Emodialisi: 500 - 1000 mg ogni 24 ore + dose supplementare di 250-500 mg post-dialisi.',
      nephrotoxicRisk: false,
      notes: 'La dose di carico acuta iniziale in stato di male epilettico (60 mg/kg) NON si riduce; si aggiustano solo le dosi successive di mantenimento!'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Se insufficienza epatica severa associata a compromissione renale: dimezzare la dose di mantenimento.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'moderate',
        title: 'Disturbi neuropsichiatrici e irritabilità',
        description: 'Può causare agitazione, psicosi, depressione o aggressività paradossa nel 5-10% dei pazienti.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Nessuna interazione epatica clinicamente significativa via citocromo P450.',
        severity: 'moderate',
        mechanism: 'Non induce né inibisce il CYP450; eccellente profilo di sicurezza in polifarmacoterapia.',
        clinicalAdvice: 'Farmaco di scelta nel paziente critico con molteplici terapie concomitanti.'
      }
    ],
    guidelines: [
      {
        society: 'ESETT Trial & Neurocritical Care Society Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Levetiracetam EV 60 mg/kg è raccomandato come prima opzione di Fase 2 nello stato epilettico convulsivo refrattario alle benzodiazepine a pari merito con Valproato.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Monitoraggio clinico ed elettroencefalografico (EEG continuo se disponibile)',
      'Funzione renale per aggiustamento dosi di mantenimento',
      'Valutazione dello stato di coscienza post-critico'
    ],
    isHighAlert: false
  },
  {
    id: 'naloxone',
    name: 'Naloxone',
    brandNames: ['Narcan'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Intossicazioni & Antidoti'],
    quickSummary: 'Antagonista puro e specifico dei recettori oppioidi. Antidoto salvavita per overdose acuta da oppiacei con coma e depressione respiratoria.',
    mechanismOfAction: 'Antagonista competitivo reversibile con altissima affinità per i recettori oppioidi mu, kappa e delta nel sistema nervoso centrale, spiazzando l\'oppioide e ripristinando la ventilazione spontanea entro 1-2 minuti.',
    dosages: [
      {
        indication: 'Overdose da Oppioidi con Ipoventilazione / Coma (Adulto)',
        bolusDose: '0.04 - 0.4 mg EV lento (iniziare con basse dosi 0.04-0.1 mg se tossicodipendente noto per evitare crisi d\'astinenza acuta severa; salire a 0.4-2.0 mg se apnea conclamata o arresto respiratorio).',
        preparation: 'Fiala da 0.4 mg/1 ml pronta per iniezione pura o diluita a 10 ml SF. Se non c\'è accesso venoso: somministrare IM, SC o Intranasale (2 mg spray).',
        route: ['EV lento', 'IM', 'Intranasale', 'SC'],
        clinicalTips: 'L\'obiettivo clinico NON è risvegliare completamente il paziente, ma ripristinare un\'adeguata ventilazione spontanea (FR > 10-12/min)! Ripetibile ogni 2-3 minuti fino a 10 mg totali.'
      },
      {
        indication: 'Intossicazione da Oppioidi a Lunga Durata (Metadone, cerotti di Fentanil)',
        maintenanceDose: 'Infusione continua: calcolare 2/3 della dose di bolo efficace e infonderla ogni ora in Soluzione Fisiologica.',
        preparation: '2 mg in 500 ml SF.',
        route: ['Infusione continua'],
        clinicalTips: 'L\'emivita del naloxone è di soli 30-90 minuti, molto più breve di quella di Metadone o Buprenorfina: sorvegliare il paziente per almeno 6-12 ore per evitare rinarcotizzazione fatale!'
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
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Nessun aggiustamento (titolare a risposta clinica respiratoria).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Sindrome da Astinenza Acuta da Oppioidi e Rischio Edema Polmonare',
        description: 'La somministrazione rapida di alte dosi (es. 2 mg in bolo) a soggetti dipendenti da oppioidi provoca sindrome da astinenza violenta con crisi adrenergica acuta, ipertensione, tachicardia, vomito incoercibile (rischio ab ingestis) e raro edema polmonare neurogeno.'
      },
      {
        severity: 'high',
        title: 'Rinarcotizzazione Tardiva',
        description: 'L\'emivita breve (30-60 min) espone al rischio di ricaduta nel coma e arresto respiratorio non appena l\'effetto svanisce, mentre l\'oppioide ingerito è ancora attivo.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi analgesici terapeutici',
        severity: 'major',
        mechanism: 'Annullamento istantaneo dell\'analgesia con riacutizzazione del dolore acuto severo.',
        clinicalAdvice: 'Titolare con microdosi (0.04 mg) se si vuole trattare solo la depressione respiratoria iatrogene preservando l\'analgesia.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation & WHO Opioid Overdose Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Naloxone somministrato tempestivamente per via EV, IM o Intranasale è l\'antidoto di prima scelta salvavita nei casi di arresto respiratorio o sospetta overdose da oppiacei.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Frequenza respiratoria, espansione toracica e saturazione SpO2',
      'Stato di vigilanza e riflessi protettivi delle vie aeree',
      'Osservazione prolungata (minimo 4-6 ore per oppioidi a breve durata; 24 ore per formulazioni retard)'
    ],
    isHighAlert: false
  },
  {
    id: 'alteplase',
    name: 'Alteplase (rt-PA)',
    brandNames: ['Actilyse'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'ps',
    emergencyIndications: ['Tromboembolismo & SCA', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Attivatore ricombinante del plasminogeno tissutale (rt-PA). Indicato nella trombolisi sistemica dell\'Ictus Ischemico Acuto (entro 4.5 ore), dell\'Embolia Polmonare Massiva instabile e dello STEMI se PCI non disponibile entro 120 minuti.',
    mechanismOfAction: 'Si lega alla fibrina nel trombo convertendo selettivamente il plasminogeno legato in plasmina, che degrada la rete di fibrina dissolvendo il coagulo vascolare occludente.',
    dosages: [
      {
        indication: 'Ictus Ischemico Acuto dell\'Adulto (Finestra temporale <= 4.5 ore dall\'esordio)',
        bolusDose: 'Dose totale: 0.9 mg/kg (massimo 90 mg). Il 10% della dose totale viene somministrato come BOLO EV in 1 minuto; il restante 90% in INFUSIONE CONTINUA in 60 minuti.',
        preparation: 'Flaconi da 50 mg con acqua per preparazioni iniettabili. Calcolare la dose esatta per peso (es. 70 kg -> 63 mg totali = 6.3 mg bolo in 1 min + 56.7 mg in 60 min). Eliminare fisicamente l\'eccedenza dal flacone prima dell\'avvio!',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Tassativo: PAS < 185 mmHg e PAD < 110 mmHg prima e durante l\'infusione (trattare con Urapidil o Labetalolo se superiore).'
      },
      {
        indication: 'Embolia Polmonare Massiva ad Alto Rischio (Shock / Ipotensione sistemica persistente)',
        bolusDose: 'Regime standard: 100 mg EV infusi in 2 ore (oppure regime accelerato 0.6 mg/kg in 15 minuti max 50 mg se arresto cardiaco imminente).',
        preparation: '100 mg in 2 flaconi.',
        route: ['Infusione continua'],
        clinicalTips: 'Interrompere l\'infusione di eparina durante le 2 ore di alteplase.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Nessun aggiustamento (clearance epatica rapida, emivita 4-5 minuti).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Controindicato se grave coagulopatia epatica con piastrinopenia o INR alterato.',
      childPughC: 'CONTROINDICATO per rischio emorragico catastrofico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CONTROINDICAZIONI ASSOLUTE E RISCHIO EMORRAGIA CEREBRALE',
        description: 'Controindicato se emorragia intracranica alla TC, recente chirurgia maggiore o trauma cranico grave (< 3 mesi), emorragia gastrointestinale attiva (< 21 giorni), piastrine < 100.000/uL, INR > 1.7 o assunzione di DOAC nelle ultime 24-48 ore con test alterati.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Angioedema Oro-linguale',
        description: 'Reazione rara ma potenzialmente fatale (specie nei pazienti in terapia concomitante con ACE-inibitori). Monitorare la lingua e le labbra durante l\'infusione.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anticoagulanti e antiaggreganti',
        severity: 'contraindicated',
        mechanism: 'Rischio moltiplicato di emorragia sistemica e intracranica fatale.',
        clinicalAdvice: 'Non somministrare ASA o eparina nelle prime 24 ore successive alla trombolisi per ictus ischemico prima di aver eseguito TC di controllo.'
      }
    ],
    guidelines: [
      {
        society: 'ESO Stroke Guidelines 2024 & ESC Pulmonary Embolism 2024',
        year: 2024,
        keyRecommendation: 'Alteplase EV (0.9 mg/kg) è fortemente raccomandato entro 4.5 ore dall\'esordio dell\'ictus ischemico dopo esclusione di emorragia alla neuroimaging. Nell\'EP ad alto rischio emodinamico la trombolisi è raccomandata come prima linea.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Pressione arteriosa ogni 15 minuti per 2 ore, poi ogni 30 min per 6 ore, poi oraria per 16 ore',
      'Valutazione neurologica continua (NIHSS, GCS): stop immediato e TC urgente se cefalea acuta o deficit peggiora',
      'Sorveglianza per sanguinamenti (accesso venoso, urine, feci)'
    ],
    isHighAlert: true
  },
  {
    id: 'calcio-cloruro',
    name: 'Calcio Cloruro 10%',
    brandNames: ['Calcio Cloruro Fiale 10%'],
    drugClass: 'Soluzioni osmotiche & Cristalloidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Intossicazioni & Antidoti'],
    quickSummary: 'Stabilizzatore di membrana cellulare cardiaco essenziale nell\'iperkaliemia grave con alterazioni ECG, ipocalcemia sintomatica e overdose da calcio-antagonisti. Nota: contiene 3 volte più calcio elementare rispetto al Calcio Gluconato.',
    mechanismOfAction: 'Ripristina il normale potenziale di soglia di membrana cellulare miocardica, contrastando la depolarizzazione patologica indotta dagli ioni potassio extracellulari e prevenendo la fibrillazione ventricolare.',
    dosages: [
      {
        indication: 'Iperkaliemia Grave (K+ > 6.5 mEq/L o onde T a tenda, allargamento QRS, perdita onda P)',
        bolusDose: '5 - 10 ml di Calcio Cloruro 10% (500 - 1000 mg) EV lenti in 2-5 minuti. Ripetibile dopo 5-10 minuti se il tracciato ECG non si normalizza.',
        preparation: 'Fiala da 10 ml al 10% (1000 mg = 27 mEq di Ca2+). Somministrare preferibilmente via CVC.',
        route: ['EV lento'],
        clinicalTips: 'Se disponibile solo via periferica, preferire Calcio Gluconato 10% (30 ml) perché meno irritante per le vene.'
      },
      {
        indication: 'Intossicazione da Calcio-Antagonisti con shock refrattario',
        bolusDose: '1 - 2 g (10-20 ml) EV lenti in 10 minuti, seguito da infusione continua.',
        preparation: 'Fiale 10%.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Parte del protocollo con Insulina ad alte dosi (HDIE).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Dose guidata da ECG e potassiemia (fondamentale nel paziente renale acuto iperkaliemico).',
      dialysis: 'Nessun aggiustamento in emergenza.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'A differenza del Calcio Gluconato (che richiede metabolismo epatico per liberare Ca2+), il Calcio Cloruro è già ionizzato ed è efficace anche in insufficienza epatica fulminante.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Necrosi Tessutale da Stravaso Periferico',
        description: 'Il Calcio Cloruro è fortemente iperosmolare e vescicante: lo stravaso da una vena periferica provoca necrosi cutanea e calcinosi tissutale severa. Somministrare solo in vene di calibro adeguato o via CVC.',
        requiresCVC: true,
        extravasationRisk: true
      },
      {
        severity: 'high',
        title: 'Tossicità da Digossina',
        description: 'La somministrazione rapida di calcio in paziente intossicato da digitale può teoricamente scatenare aritmie ventricolari fatali (stone heart); somministrare con estrema lentezza in 20-30 minuti.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Sodio Bicarbonato EV o Fosfati',
        severity: 'contraindicated',
        mechanism: 'Precipitazione fisica immediata di carbonato di calcio insolubile (gesso) nella linea venosa.',
        clinicalAdvice: 'NON somministrare mai nella stessa linea venosa; lavare abbondantemente tra le due infusioni.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Special Situations Resuscitation Guidelines 2021/2025',
        year: 2021,
        keyRecommendation: 'Calcio EV (Cloruro o Gluconato) è il primo provvedimento salvavita immediato nell\'iperkaliemia grave con alterazioni elettrocardiografiche.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Monitoraggio ECG continuo (normalizzazione del QRS e delle onde T)',
      'Calcemia ionizzata ed elettroliti serici (K+, Mg2+)',
      'Pressione arteriosa (l\'infusione troppo rapida può causare vasodilatazione e bradicardia)'
    ],
    isHighAlert: true
  },
  {
    id: 'sodio-bicarbonato',
    name: 'Sodio Bicarbonato 8.4%',
    brandNames: ['Sodio Bicarbonato 8.4% Fiale/Flaconi'],
    drugClass: 'Soluzioni osmotiche & Cristalloidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Intossicazioni & Antidoti'],
    quickSummary: 'Soluzione alcalinizzante molare (1 mEq/ml). Indicata nell\'iperkaliemia acuta, nell\'intossicazione da Antidepressivi Triciclici (TCA) con allargamento del QRS e nell\'acidosi metabolica severa con pH < 7.10.',
    mechanismOfAction: 'Aumenta il pH ematico inducendo shift intracellulare di potassio in scambio con ioni idrogeno. Nelle intossicazioni da farmaci bloccanti i canali del sodio (TCA), l\'alcalinizzazione e l\'elevato carico di sodio distaccano il farmaco dal canale, restringendo il complesso QRS.',
    dosages: [
      {
        indication: 'Overdose da Antidepressivi Triciclici (TCA) con allargamento QRS > 100 ms o aritmie',
        bolusDose: '1 - 2 mEq/kg (circa 50 - 100 ml di 8.4%) EV in bolo in 2-3 minuti. Ripetere fino a restringimento del QRS < 100 ms o target pH arterioso 7.50 - 7.55.',
        preparation: 'Flacone da 8.4% (1000 mEq/L = 1 mEq/ml).',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Mantenere pH arterioso tra 7.45 e 7.55 con infusione continua (es. 150 ml di 8.4% in 850 ml G5%).'
      },
      {
        indication: 'Arresto cardiaco prolungato con acidosi metabolica severa documentata o iperkaliemia',
        bolusDose: '50 mmol (50 ml di 8.4%) EV rapido.',
        preparation: 'Flacone puro.',
        route: ['EV rapido'],
        clinicalTips: 'ERC: Non raccomandato di routine nell\'arresto cardiaco; riservato a iperkaliemia nota o overdose da bloccanti dei canali del sodio.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard guidata da EGA e pH.',
      crclModerate: 'Monitorare ritenzione sodica e volemia.',
      crclSevere: 'Attenzione al massiccio apporto di sodio (rischio edema polmonare e iperosmolarità nel paziente anurico).',
      dialysis: 'Usare con prudenza; l\'emodialisi è il trattamento definitivo per l\'acidosi severa e l\'iperkaliemia anurica.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'L\'alcalosi metabolica iatrogena aumenta la frazione diffusibile di ammoniaca indissociata (NH3) verso il cervello, peggiorando l\'encefalopatia epatica!',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipernatriemia, ipokaliemia, ipocalcemia e ipercapnia paradossa',
        description: 'L\'alcalinizzazione riduce il calcio ionizzato (rischio tetania) e sposta il potassio nelle cellule. Inoltre genera CO2 libera che diffonde rapidamente attraverso la barriera emato-encefalica causando acidosi cerebrale paradossa se il paziente non è iperventilato!'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Calcio sali (Calcio Cloruro / Gluconato)',
        severity: 'contraindicated',
        mechanism: 'Precipitazione chimica immediata.',
        clinicalAdvice: 'Non infondere insieme.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Guidelines 2021/2025 & Toxicology Consensus',
        year: 2021,
        keyRecommendation: 'Bicarbonato di sodio EV è il trattamento di prima scelta comprovato per la cardiotossicità indotta da TCA con QRS allargato.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Emogasanalisi arteriosa seriata (pH, pCO2, HCO3-, lattati)',
      'Elettroliti (Sodio, Potassio, Calcio ionizzato)',
      'Tracciato ECG a 12 derivazioni continuo (durata QRS)'
    ],
    isHighAlert: false
  },
  {
    id: 'terlipressina',
    name: 'Terlipressina',
    brandNames: ['Glypressin'],
    drugClass: 'Vasopressori & Inotropi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti', 'Shock & Ipotensione'],
    quickSummary: 'Analogo sintetico della vasopressina a lunga durata d\'azione. Trattamento vasocostrittore splancnico di prima linea nell\'emorragia acuta da varici esofagee nel paziente cirrotico e nella sindrome epato-renale (HRS-AKI).',
    mechanismOfAction: 'Profarmaco convertito per via enzimatica in lisina-vasopressina. Stimola selettivamente i recettori V1 della muscolatura liscia vascolare splancnica, inducendo marcata vasocostrizione splancnica con netta riduzione della pressione portale e del flusso varicoso.',
    dosages: [
      {
        indication: 'Emorragia Acuta da Varici Esofagee / Ipertensione Portale',
        bolusDose: 'Bolo iniziale: 2 mg EV lenti in 2-3 minuti, seguiti da 1 - 2 mg ogni 4 ore (o infusione continua a 2-4 mg/24h) per 48-72 ore fino all\'arresto del sanguinamento.',
        preparation: 'Flacone polvere da 1 mg con solvente da 5 ml. Ricostituire e iniettare lentamente.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Iniziare IMMEDIATAMENTE al sospetto di emorragia digestiva alta nel paziente con epatopatia nota, prima ancora dell\'endoscopia digestiva d\'urgenza!'
      },
      {
        indication: 'Sindrome Epato-Renale (HRS-AKI)',
        maintenanceDose: 'Infusione continua a partire da 2 mg/die fino a 12 mg/die in combinazione con Albumina umana 20% (1 g/kg al giorno 1, poi 20-40 g/die).',
        preparation: 'Pompa siringa in soluzione fisiologica.',
        route: ['Infusione continua'],
        clinicalTips: 'L\'infusione continua ha mostrato minore tasso di ischemia ed eventi avversi rispetto ai boli ripetuti.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Indicata specificamente nell\'HRS-AKI con insufficienza renale acuta oligurica.',
      dialysis: 'Utilizzabile; monitorare segni di ischemia.',
      nephrotoxicRisk: false,
      notes: 'Migliora la perfusione renale nel paziente cirrotico riducendo la vasodilatazione splancnica.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Farmaco cardine nell\'insufficienza epatica severa Child-Pugh C con ipertensione portale scompensata.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ischemia Miocardica, Periferica e Intestinale',
        description: 'La potente vasocostrizione può scatenare ischemia coronarica acuta, necrosi cutanea delle estremità o ischemia mesenterica. Eseguire ECG basale e monitorare troponina se fattori di rischio.'
      },
      {
        severity: 'high',
        title: 'Iposodiemia severa da ritenzione idrica (effetto V2)',
        description: 'Provoca marcata ritenzione di acqua libera per debole azione recettoriale V2 renale; monitorare quotidianamente il sodio serico.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci bradizzanti (Beta-bloccanti)',
        severity: 'moderate',
        mechanism: 'Può indurre bradicardia marcata per aumento delle resistenze vascolari.',
        clinicalAdvice: 'Sospendere i beta-bloccanti nella fase emorragica acuta.'
      }
    ],
    guidelines: [
      {
        society: 'Baveno VII Consensus & EASL Guidelines 2023',
        year: 2023,
        keyRecommendation: 'I farmaci vasoattivi splancnici (Terlipressina preferita, o Somatostatina/Octreotide) devono essere iniziati il prima possibile al sospetto di emorragia da varici, prima dell\'endoscopia, e continuati per 5 giorni.',
        evidenceLevel: 'Livello 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa e frequenza cardiaca (sorveglianza bradicardia)',
      'Sodio plasmatico (rischio iponatriemia severa)',
      'Perfusione delle estremità ed eventuale dolore toracico/addominale',
      'Conta ematica ed emoglobina'
    ],
    isHighAlert: true
  },
  {
    id: 'pantoprazolo',
    name: 'Pantoprazolo EV',
    brandNames: ['Pantorc EV', 'Pantopan'],
    drugClass: 'Inibitori di pompa protonica & Procinetici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emorragia & Inversione Anticoagulanti'],
    quickSummary: 'Inibitore della pompa protonica gastrica (IPP) per via endovenosa. Fondamentale per l\'alcalinizzazione gastrica (target pH > 6.0) nell\'emorragia digestiva alta non da varici per stabilizzare il coagulo piastrinico.',
    mechanismOfAction: 'Inibizione irreversibile della pompa idrogeno-potassio ATPasi (H+/K+ ATPasi) nelle cellule parietali gastriche. Riduce la produzione di acido gastrico favorendo l\'aggregazione piastrinica e prevenendo la lisi del coagulo.',
    dosages: [
      {
        indication: 'Emorragia Digestiva Superiore da Ulcera Peptica con stigmata ad alto rischio (Forrest I e IIa/IIb)',
        bolusDose: 'Bolo iniziale: 80 mg EV in 20-30 minuti, seguito da infusione continua a 8 mg/h per 72 ore (oppure regime alternativo a boli intermittenti: 40 mg EV bid dopo il bolo iniziale).',
        preparation: 'Flacone polvere da 40 mg o 80 mg ricostituito con 10 ml SF. Per infusione continua: 200 mg (5 flaconi da 40 mg) portati a 50 ml SF (4 mg/ml) -> velocità 2 ml/h.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'L\'alcalinizzazione gastrica con pH > 6 previene la degradazione del coagulo da parte della pepsina acuta.'
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
      childPughC: 'Nei cirrotici gravi la clearance è ridotta: nella profilassi standard non superare 20-40 mg/die; nell\'emorragia attiva acuta il bolo iniziale da 80 mg resta raccomandato.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'moderate',
        title: 'Interferenza con Clopidogrel (minima rispetto a Omeprazolo)',
        description: 'Pantoprazolo ha una minima inibizione del CYP2C19 ed è l\'IPP di prima scelta nel paziente con sindrome coronarica acuta che assume contemporaneamente Clopidogrel.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Clopidogrel (Plavix)',
        severity: 'moderate',
        mechanism: 'Pantoprazolo presenta minima interazione con il CYP2C19 rispetto a Omeprazolo, preservando l\'attivazione di Clopidogrel.',
        clinicalAdvice: 'Pantoprazolo è l\'IPP raccomandato nei pazienti in DAPT.'
      }
    ],
    guidelines: [
      {
        society: 'ESGE Non-variceal Upper GI Bleeding Guidelines 2022',
        year: 2022,
        keyRecommendation: 'Nei pazienti con emorragia digestiva superiore acuta, dopo emostasi endoscopica di lesioni ad alto rischio, la terapia con IPP ad alte dosi (80 mg bolo + 8 mg/h per 72h o 40-80 mg bid) riduce significativamente il re-bleeding e la mortalità.',
        evidenceLevel: 'Livello 1A'
      }
    ],
    monitoring: [
      'Segni clinici di re-bleeding (melena, ematemesi, caduta Hb)',
      'Pressione arteriosa e frequenza cardiaca'
    ],
    isHighAlert: false
  },
  {
    id: 'mannitolo',
    name: 'Mannitolo 18% - 20%',
    brandNames: ['Mannitolo 18% o 20% Flaconi'],
    drugClass: 'Soluzioni osmotiche & Cristalloidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Diuretico osmotico di riferimento per il trattamento rapido dell\'Ipertensione Endocranica Acuta (ICP) e dell\'erniazione cerebrale imminente.',
    mechanismOfAction: 'Aumenta l\'osmolarità plasmatica richiamando acqua libera dal parenchima cerebrale intatto verso il compartimento intravascolare attraverso la barriera emato-encefalica integra, riducendo volume cerebrale e pressione intracranica entro 15-30 minuti. Riduce inoltre la viscosità ematica migliorando la reologia cerebrale.',
    dosages: [
      {
        indication: 'Ipertensione Endocranica Severa Acuta / Segni di Erniazione Cerebrale Imminente (Tris di Cushing, midriasi anisocorica acuta)',
        bolusDose: '0.5 - 1.0 g/kg (circa 250 - 500 ml di soluzione al 18-20% nell\'adulto) infusi rapidamente in 15-20 minuti.',
        preparation: 'Flacone pronto da 250 ml o 500 ml al 18% o 20%. Verificare l\'assenza di cristalli (riscaldare a bagnomaria se cristallizzato) e utilizzare un deflussore con filtro.',
        route: ['EV rapido'],
        clinicalTips: 'L\'effetto inizia in 15-30 minuti e dura circa 4-6 ore. Ripetibile ogni 6-8 ore mantenendo osmolarità plasmatica < 320 mOsm/kg.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Monitorare osmolarità ed elettroliti.',
      crclSevere: 'CrCl < 30 ml/min: CONTROINDICATO se anuria (il mannitolo non può essere escreto, causando ipervolemia massiva, edema polmonare acuto ed edema cerebrale secondario da rebound). Preferire Soluzione Ipertonica NaCl 3%!',
      dialysis: 'Controindicato.',
      nephrotoxicRisk: true,
      notes: 'Può causare nefrosi osmotica acuta se l\'osmolarità plasmatica supera 320 mOsm/kg.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard; attenzione allo stato volemico ed elettrolitico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ipotensione e disidratazione severa con collasso volemico',
        description: 'La massiccia diuresi osmotica può indurre deplezione volemica severa con caduta della pressione arteriosa media (PAM) e conseguente crollo critico della Pressione di Perfusione Cerebrale (CPP = PAM - ICP)! Reintegrare con Fisiologica isotonica per mantenere euvolemia.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Effetto Rebound per accumulo tissutale',
        description: 'Dosi ripetute prolungate possono attraversare la barriera emato-encefalica danneggiata, invertendo il gradiente osmotico e provocando edema cerebrale da rimbalzo.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri diuretici (Furosemide)',
        severity: 'moderate',
        mechanism: 'Diuresi massiva e rapido squilibrio elettrolitico.',
        clinicalAdvice: 'Monitorare attentamente pressione e sodio.'
      }
    ],
    guidelines: [
      {
        society: 'Neurocritical Care Society & Brain Trauma Foundation 2023',
        year: 2023,
        keyRecommendation: 'Mannitolo (0.5-1 g/kg) o Soluzione Salina Ipertonica sono raccomandati per la riduzione acuta della pressione intracranica elevata in pazienti neurocritici con monitoraggio osmolarità < 320 mOsm/L.',
        evidenceLevel: 'Livello II'
      }
    ],
    monitoring: [
      'Osmolarità sierica (target < 320 mOsm/kg) e gap osmolare',
      'Pressione Arteriosa Media (mantenere PAM per CPP > 60-70 mmHg)',
      'Diuresi oraria (catetere vescicale obbligatorio)',
      'Sodio e potassio serici'
    ],
    isHighAlert: false
  },
  {
    id: 'metilprednisolone',
    name: 'Metilprednisolone',
    brandNames: ['Solu-Medrol', 'Urbason'],
    drugClass: 'Corticosteroidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['BPCO Riacutizzata', 'Asma Acuto', 'Reazioni Allergiche & Anafilassi', 'Infezione & Sepsi'],
    quickSummary: 'Glucocorticoide sintetico ad azione intermedia con spiccata attività anti-infiammatoria e minima attività mineralcorticoide. Prima scelta nelle riacutizzazioni severe di BPCO, asma bronchiale acuto e anafilassi.',
    mechanismOfAction: 'Inibizione della trascrizione genica delle citochine pro-infiammatorie (IL-1, IL-6, TNF-alfa), inibizione della fosfolipasi A2 con blocco della sintesi di prostaglandine e leucotrieni, e upregulation dei recettori beta-2 adrenergici bronchiali.',
    dosages: [
      {
        indication: 'BPCO Riacutizzata Grave / Asma Bronchiale Acuto Grave',
        bolusDose: '40 - 60 mg (o 1 - 2 mg/kg) EV in bolo lento, ripetibile ogni 12 o 24 ore.',
        preparation: 'Flacone liofilizzato da 40 mg o 125 mg ricostituito con fiala solvente.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'L\'effetto clinico inizia a manifestarsi dopo 4-6 ore dalla somministrazione: non sostituisce i broncodilatatori inalatori rapidi (Salbutamolo + Ipratropio) che agiscono istantaneamente!'
      },
      {
        indication: 'Anafilassi (Trattamento adiuvante di seconda linea dopo Adrenalina)',
        bolusDose: '1 - 2 mg/kg EV (solitamente 80-125 mg) per prevenire la reazione bifasica tardiva.',
        preparation: 'Come sopra.',
        route: ['EV lento'],
        clinicalTips: 'Non ritardare mai l\'Adrenalina IM per somministrare cortisonici o antistaminici!'
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
      childPughC: 'Metabolismo epatico. Dosi standard ben tollerate nei cicli brevi d\'urgenza; monitorare ritenzione idrica e glicemia.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Iperglicemia severa acuta',
        description: 'Provoca marcato incremento della glicemia, specialmente nei pazienti diabetici noti. Monitorare glicemia capillare e prevedere schema insulinico sottocute al bisogno.'
      },
      {
        severity: 'moderate',
        title: 'Agitazione psicomotoria e psicosi steroidea acuta',
        description: 'Possibile insorgenza di insonnia, euforia marcata, psicosi o agitazione acuta, specie nell\'anziano.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'FANS (Ketorolac, Ibuprofene)',
        severity: 'major',
        mechanism: 'Effetto ulcerogeno sinergico sulla mucosa gastrica con marcato aumento del rischio di emorragia digestiva superiore.',
        clinicalAdvice: 'Associare IPP protettivo ed evitare la combinazione se non indispensabile.'
      }
    ],
    guidelines: [
      {
        society: 'GOLD COPD Report 2024 & GINA Asthma 2024',
        year: 2024,
        keyRecommendation: 'I corticosteroidi sistemici (es. Metilprednisolone 40 mg die EV o Prednisone 40 mg os per 5 giorni) accorciano i tempi di recupero, migliorano la funzione respiratoria (FEV1) e riducono il fallimento del trattamento e la durata del ricovero nella BPCO riacutizzata.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Glicemia capillare ogni 4-6 ore nei pazienti critici e diabetici',
      'Parametri respiratori (SpO2, EGA, frequenza respiratoria)',
      'Pressione arteriosa ed equilibrio idro-elettrolitico'
    ],
    isHighAlert: false
  },
  {
    id: 'idrocortisone',
    name: 'Idrocortisone',
    brandNames: ['Flebocortid'],
    drugClass: 'Corticosteroidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Shock & Ipotensione', 'Asma Acuto', 'Reazioni Allergiche & Anafilassi', 'Infezione & Sepsi'],
    quickSummary: 'Glucocorticoide a breve durata d\'azione con bilanciata attività glucocorticoide e mineralcorticoide. Trattamento salvavita per la crisi surrenalica acuta e raccomandato nello shock settico refrattario ai vasopressori.',
    mechanismOfAction: 'Ripristina la reattività vascolare adrenergica (upregulation dei recettori alfa-1 sui vasi) compromessa dall\'insufficienza surrenalica relativa o assoluta, sopprime la risposta infiammatoria sistemica e favorisce la ritenzione idro-salina.',
    dosages: [
      {
        indication: 'Shock Settico Refrattario (Vasopressori ad alte dosi per mantenere PAM >= 65 mmHg)',
        maintenanceDose: '200 mg/die in infusione continua EV oppure 50 mg EV ogni 6 ore.',
        preparation: 'Flacone polvere da 100 mg o 500 mg. Per infusione continua: 200 mg in 50 ml SF via siringa per pompa.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Surviving Sepsis Campaign raccomanda l\'avvio di idrocortisone se la dose di Noradrenalina o vasopressori supera 0.25 mcg/kg/min per almeno 4 ore.'
      },
      {
        indication: 'Crisi Surrenalica Acuta (Addisonian Crisis)',
        bolusDose: 'Bolo immediato di 100 mg EV, seguito da 100-200 mg nelle 24 ore successive (in infusione continua o 50 mg ogni 6 ore) associato a idratazione vigorosa con Soluzione Fisiologica.',
        preparation: '100 mg in 2 ml solvente iniettati in bolo EV.',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Non attendere i risultati del dosaggio del cortisolo per iniziare il trattamento se il sospetto clinico è forte!'
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
      childPughC: 'Metabolismo epatico. Titolare con attenzione per ridotta clearance plasmatica.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Iperglicemia e Ipernatriemia',
        description: 'La moderata attività mineralcorticoide intrinseca favorisce la ritenzione di sodio e l\'iperglicemia. Monitorare elettroliti ed emogasanalisi.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Insulina',
        severity: 'moderate',
        mechanism: 'Aumento delle resistenze insuliniche.',
        clinicalAdvice: 'Aumentare il fabbisogno di insulina.'
      }
    ],
    guidelines: [
      {
        society: 'Surviving Sepsis Campaign Guidelines 2021/2024',
        year: 2021,
        keyRecommendation: 'Nei pazienti con shock settico e necessità continua di vasopressori (Noradrenalina >= 0.25 mcg/kg/min) è raccomandata la somministrazione di Idrocortisone EV alla dose di 200 mg/die.',
        evidenceLevel: 'Raccomandazione debole, evidenza moderata'
      }
    ],
    monitoring: [
      'Glicemia ogni 4-6 ore',
      'Pressione arteriosa e possibilità di svezzamento dai vasopressori',
      'Sodio e potassio serici'
    ],
    isHighAlert: false
  },
  {
    id: 'atropina',
    name: 'Atropina Solfato',
    brandNames: ['Atropina Solfato Fiale'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Aritmie & Cardioversione', 'Intossicazioni & Antidoti'],
    quickSummary: 'Anticolinergico parasimpaticolitico d\'urgenza. Trattamento di prima linea per la bradicardia sintomatica instabile e antidoto per l\'intossicazione da insetticidi organofosforici o sindrome colinergica.',
    mechanismOfAction: 'Antagonista competitivo reversibile dei recettori colinergici muscarinici post-gangliari. Blocca l\'ipertono vagale sul nodo seno-atriale e sul nodo atrio-ventricolare, aumentando la frequenza cardiaca e la velocità di conduzione AV.',
    dosages: [
      {
        indication: 'Bradicardia Sinusale Sintomatica / BAV Nodale con segni di instabilità emodinamica (ipotensione, shock, sincope)',
        bolusDose: '0.5 - 1.0 mg EV in bolo rapido. Ripetibile ogni 3-5 minuti fino a risposta o dose massima cumulativa di 3 mg (blocco vagale completo).',
        preparation: 'Fiale da 0.5 mg/1 ml o 1 mg/1 ml pronte per iniezione EV rapida.',
        route: ['EV rapido'],
        clinicalTips: 'Non somministrare dosi < 0.5 mg: dosi sub-terapeutiche causano bradicardia paradossa centrale! Inefficace nei BAV di II grado tipo Mobitz 2 e nei BAV di III grado sotto-nodali con QRS largo.'
      },
      {
        indication: 'Intossicazione da Organofosforici / Sindrome Colinergica (Toxidrome SLUDGE)',
        bolusDose: '1 - 2 mg EV ogni 5-10 minuti, raddoppiando la dose fino alla comparsa di "atropinizzazione" (risoluzione dei rantoli bronchiali, essiccamento delle secrezioni tracheo-bronchiali, FC > 80 bpm). Possono essere necessari centinaia di milligrammi!',
        preparation: 'Fiale pure in bolo ripetuto continuo.',
        route: ['EV rapido', 'Infusione continua'],
        clinicalTips: 'Endpoint terapeutico primario: scomparsa delle secrezioni tracheo-bronchiali asfissianti (asciugatura polmonare).'
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
      childPughA: 'Nessun aggiustamento.',
      childPughB: 'Nessun aggiustamento.',
      childPughC: 'Metabolismo epatico. Dosi acuta standard invariata.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Inefficace nel Cuore Trapiantato e BAV infra-hissiano',
        description: 'Nel cuore denervato da trapianto cardiaco l\'atropina è completamente inefficace. Nei BAV di grado avanzato con blocco infrahissiano può accelerare la frequenza atriale senza migliorare la conduzione ventricolare, peggiorando l\'ischemia.'
      },
      {
        severity: 'moderate',
        title: 'Bradicardia paradossa con dosi < 0.5 mg',
        description: 'Dosi inferiori a 0.5 mg stimolano i recettori muscarinici centrali provocando ulteriore rallentamento della frequenza cardiaca.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri farmaci anticolinergici (Antistaminici, Antipsicotici, TCA)',
        severity: 'moderate',
        mechanism: 'Effetto anticolinergico sinergico (ritenzione urinaria, midriasi, delirio).',
        clinicalAdvice: 'Monitorare ritenzione urinaria acuta con ecografia vescicale.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation & ESC Bradycardia Guidelines 2021/2025',
        year: 2021,
        keyRecommendation: 'Atropina 0.5 - 1 mg EV è il farmaco di prima linea raccomandato nella bradicardia sintomatica con segni avversi di instabilità.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Telemetria ECG continua (risposta della frequenza ed ectopie ventricolari)',
      'Pressione arteriosa',
      'Diametro pupillare e secrezioni respiratorie'
    ],
    isHighAlert: false
  }
];

const RAW_EMERGENCY_DRUGS: Omit<EmergencyDrug, 'pregnancy'>[] = [
  ...INITIAL_EMERGENCY_DRUGS,
  ...ADDITIONAL_EMERGENCY_DRUGS,
  ...ADDITIONAL_EMERGENCY_DRUGS_BATCH_2,
  ...ADDITIONAL_EMERGENCY_DRUGS_BATCH_3,
  ...ADDITIONAL_EMERGENCY_DRUGS_BATCH_4,
];

export const EMERGENCY_DRUGS: EmergencyDrug[] = RAW_EMERGENCY_DRUGS.map((drug) => ({
  ...drug,
  pregnancy: getPregnancySafety(drug.id),
}));

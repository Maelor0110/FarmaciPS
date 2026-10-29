import { EmergencyDrug } from '../types/pharmacy';

export const ADDITIONAL_EMERGENCY_DRUGS: Omit<EmergencyDrug, 'pregnancy'>[] = [
  {
    id: 'lidocaina',
    name: 'Lidocaina Cloridrato EV',
    brandNames: ['Xilocaina 2%', 'Lidocaina Cloridrato Fiale'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Aritmie & Cardioversione'],
    quickSummary: 'Anti-aritmico di classe Ib bloccante rapido dei canali del sodio voltaggio-dipendenti. Indicato in arresto cardiaco da FV/TV senza polso refrattaria (alternativa equivalente ad amiodarone) e nelle tachiaritmie ventricolari associate ad ischemia miocardica acuta.',
    mechanismOfAction: 'Blocca i canali del sodio attivati e inattivati nello stato aperto, riducendo la velocità di depolarizzazione di fase 0 nel tessuto ischemico/depolarizzato, accorciando la durata del potenziale d\'azione e sopprimendo l\'automatismo ectopico ventricolare.',
    dosages: [
      {
        indication: 'Arresto Cardiaco da FV / TV senza polso refrattaria (ERC 2021/2025 alternativa ad Amiodarone)',
        bolusDose: '1° bolo: 100 mg EV/IO (o 1 - 1.5 mg/kg) dopo il 3° shock. Se FV/TV persiste dopo il 5° shock: 2° bolo da 50 mg EV/IO.',
        preparation: 'Fiala al 2% (20 mg/ml): 100 mg = 5 ml somministrati in bolo rapido seguito da flush di 20 ml SF.',
        route: ['EV rapido', 'Endoossea'],
        clinicalTips: 'ERC 2021/2025: Lidocaina è raccomandata come alternativa di pari classe di evidenza all\'Amiodarone (300 mg) dopo il 3° shock.'
      },
      {
        indication: 'Tachicardia Ventricolare Monomorfa Stabile / Ectopie Ventricolari Ripetitive in IMA',
        bolusDose: 'Carico: 1 - 1.5 mg/kg (circa 70-100 mg) EV lenti in 2-3 minuti.',
        maintenanceDose: 'Infusione continua: 1 - 4 mg/min (circa 20-50 mcg/kg/min).',
        preparation: 'Diluire 1 g (5 fiale da 200 mg/10 ml al 2%) in 250 ml di Glucosata 5% o SF (conc. 4 mg/ml).',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 4.0,
          defaultDilutionText: '1 g in 250 ml SF (4 mg/ml)',
          unit: 'mg/h',
          minRate: 60.0,
          maxRate: 240.0,
          defaultRate: 120.0,
          step: 30.0
        },
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Iniziare l\'infusione subito dopo il carico per evitare la finestra di caduta dei livelli plasmatici.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose di carico invariata. In caso di infusione > 24h, ridurre velocità del 25%.',
      crclSevere: 'Carico standard. Nelle infusioni prolungate ridurre del 50% per accumulo del metabolita neurotossico glicinexilidide (GX).',
      dialysis: 'Dose di carico standard. Ridurre mantenimento. Non dializzabile.',
      nephrotoxicRisk: false,
      notes: 'L\'emivita dei metaboliti attivi si allunga considerevolmente in uremia.'
    },
    hepaticAdjustment: {
      childPughA: 'Carico standard; mantenimento ridotto del 25%.',
      childPughB: 'Carico standard; dimezzare la velocità di infusione (50%).',
      childPughC: 'Metabolismo epatico esteso (CYP1A2/3A4). Clearance ridotta del 60-70%: alto rischio di tossicità neurologica (LAST); titolare a livelli minimi.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Tossicità Sistemica da Anestetici Locali (LAST)',
        description: 'Il sovradosaggio o l\'accumulo causano tossicità neurologica precoce (sapore metallico, parestesie periorali, acufeni, disartria, tremori, convulsioni) e cardiotossicità fatale (bradicardia, allargamento QRS, arresto cardiaco). Antidoto: Emulsione Lipidica 20% (Intralipid).',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Blocco AV avanzato e Bradicardia Severa',
        description: 'Controindicata nei blocchi atrio-ventricolari di II o III grado senza pacemaker funzionante e nella grave bradicardia sinusale.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti (Propranololo, Metoprololo)',
        severity: 'major',
        mechanism: 'I beta-bloccanti riducono il flusso ematico epatico e inibiscono il metabolismo della lidocaina, aumentandone le concentrazioni plasmatiche del 30-50%.',
        clinicalAdvice: 'Monitorare segni di tossicità e ridurre la velocità di mantenimento.'
      },
      {
        interactingDrug: 'Amiodarone',
        severity: 'major',
        mechanism: 'Effetto cardiodepressore ed elettrofisiologico additivo.',
        clinicalAdvice: 'Non combinare di routine a meno di aritmie ventricolari refrattarie in ambiente intensivistico.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation Guidelines 2021/2025',
        year: 2021,
        keyRecommendation: 'Lidocaina 100 mg EV/IO dopo il 3° shock per FV/TV senza polso persistente è raccomandata come alternativa di pari efficacia ad Amiodarone 300 mg.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Telemetria ECG continua',
      'Valutazione neurologica dello stato di coscienza e comparsa di mioclonie',
      'Pressione arteriosa'
    ],
    antidote: 'Emulsione Lipidica 20% (Intralipid: bolo 1.5 ml/kg + infusione 0.25 ml/kg/min)',
    isHighAlert: true
  },
  {
    id: 'verapamil',
    name: 'Verapamil EV',
    brandNames: ['Isoptin EV'],
    drugClass: 'Calcio-antagonisti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Aritmie & Cardioversione', 'Crisi Ipertensiva & Dissecazione'],
    quickSummary: 'Calcio-antagonista non diidropiridinico (fenilalchilamina) ad azione bradizzante e dromotropa negativa. Farmaco di scelta per la terminazione della TPSV refrattaria a manovre vagali (se adenosina controindicata per asma) e per il controllo rapido della frequenza nella Fibrillazione Atriale con frazione d\'eiezione preservata.',
    mechanismOfAction: 'Inibisce selettivamente i canali del calcio di tipo L voltaggio-dipendenti nel nodo seno-atriale e atrio-ventricolare, rallentando la conduzione nodale e prolungando il periodo refrattario. Esercita inoltre un marcato effetto inotropo negativo sulla contrattilità miocardica e vasodilatatore arterioso.',
    dosages: [
      {
        indication: 'Tachicardia Parossistica Sopraventricolare (TPSV) / Fibrillazione Atriale ad elevata risposta con LVEF >= 40%',
        bolusDose: 'Bolo iniziale: 2.5 - 5 mg EV lenti in 2-3 minuti. Se risposta inadeguata dopo 15-30 minuti, somministrare un secondo bolo di 5 - 10 mg.',
        preparation: 'Fiala da 5 mg/2 ml pura o diluita a 10 ml con Soluzione Fisiologica somministrata in almeno 2 minuti.',
        route: ['EV lento'],
        clinicalTips: 'Mantenere il paziente in monitoraggio ECG continuo. In caso di ipotensione transitoria o bradicardia eccessiva, somministrare Calcio Gluconato o Cloruro EV.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Carico standard; monitorare la pressione e l\'intervallo PR (eliminazione renale dei metaboliti ~70%).',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50% e somministrare in 3-5 minuti.',
      childPughC: 'Metabolismo epatico esteso di primo passaggio. Biodisponibilità aumentata e clearance ridotta: dimezzare la dose e prolungare i tempi di infusione.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CONTROINDICAZIONE ASSOLUTA: Associazione con Beta-bloccanti EV',
        description: 'La somministrazione EV combinata o ravvicinata di Verapamil con Beta-bloccanti EV provoca sinergismo letale con arresto sinusale, blocco AV completo, shock cardiogeno e asistolia!',
        isQTC: false
      },
      {
        severity: 'black_box',
        title: 'Controindicato in Insufficienza Cardiaca a Frazione Ridotta (HFrEF)',
        description: 'Il potente effetto inotropo negativo può precipitare shock cardiogeno fatale in pazienti con FE < 40% o edema polmonare acuto. In HFrEF preferire Amiodarone o Digossina.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Controindicato nella FA pre-eccitata (Sindrome di WPW)',
        description: 'Accelera la conduzione lungo la via anomala accessoria con rischio di degenerazione rapida in Fibrillazione Ventricolare.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti EV (Metoprololo, Esmololo, Atenololo)',
        severity: 'contraindicated',
        mechanism: 'Collasso emodinamico da blocco atrioventricolare totale e asistolia.',
        clinicalAdvice: 'NON somministrare mai insieme per via endovenosa.'
      },
      {
        interactingDrug: 'Digossina',
        severity: 'major',
        mechanism: 'Inibisce l\'escrezione renale della digossina aumentandone i livelli ematici del 50-70%.',
        clinicalAdvice: 'Ridurre la dose di digossina e monitorare ECG.'
      }
    ],
    guidelines: [
      {
        society: 'ESC AF Guidelines 2024 & ACLS 2024',
        year: 2024,
        keyRecommendation: 'Verapamil EV (o Diltiazem EV) è raccomandato di prima scelta per il controllo acuto della frequenza nella FA in pazienti stabili con frazione di eiezione preservata (LVEF >= 40%) o con asma/BPCO grave in cui i beta-bloccanti sono controindicati.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Tracciato ECG continuo durante l\'iniezione lenta',
      'Pressione arteriosa prima e dopo il bolo',
      'Esame clinico per segni di scompenso cardiaco acuto'
    ],
    antidote: 'Calcio Cloruro / Gluconato EV (per ipotensione da sovradosaggio)',
    isHighAlert: true
  },
  {
    id: 'digossina',
    name: 'Digossina EV',
    brandNames: ['Lanoxin EV'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Aritmie & Cardioversione', 'EPA & Insufficienza Cardiaca'],
    quickSummary: 'Glicoside cardioattivo con azione inotropa positiva e dromotropa negativa (rallentamento nodale AV mediato da ipertono vagale). Farmaco di scelta per il controllo della frequenza nella Fibrillazione Atriale acuta nel paziente con insufficienza cardiaca scompensata e ipotensione.',
    mechanismOfAction: 'Inibizione reversibile della pompa Na+/K+ ATPasi sarcolemmale: aumento del sodio intracellulare con incremento del calcio intracellulare via scambiatore Na+/Ca2+ (inotropismo positivo). Potenzia inoltre il tono parasimpatico vagale centrale riducendo la conduzione e aumentando la refrattarietà del nodo AV.',
    dosages: [
      {
        indication: 'Controllo della Frequenza nella Fibrillazione Atriale con Scompenso Cardiaco Acuto (HFrEF)',
        bolusDose: 'Bolo iniziale: 0.25 - 0.5 mg EV lenti in 10-20 minuti. Ripetibile a dosi di 0.25 mg ogni 4-6 ore fino a dose massima di carico di 1.0 - 1.5 mg nelle 24 ore.',
        preparation: 'Fiala da 0.5 mg/2 ml. Diluire in 100 ml di Soluzione Fisiologica o Glucosata 5% e infondere in almeno 15-20 minuti.',
        route: ['EV lento'],
        clinicalTips: 'L\'effetto farmacologico inizia dopo 15-30 minuti e raggiunge il picco a 1-4 ore: non è un farmaco ad effetto istantaneo. Non richiede sospensione se PAS è bassa (a differenza dei beta-bloccanti).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl > 50 ml/min: carico standard; mantenimento 0.125 - 0.25 mg/die.',
      crclModerate: 'CrCl 30-50 ml/min: ridurre la dose del 30-50% (es. 0.125 mg a giorni alterni o 0.0625 mg/die).',
      crclSevere: 'CrCl 10-29 ml/min: ridurre la dose del 50-75%; monitorare strettamente digossinemia (target 0.5 - 0.9 ng/ml).',
      dialysis: 'CrCl < 10 ml/min o Emodialisi: 0.0625 mg 2-3 volte a settimana. Non dializzabile (alto volume di distribuzione). Rischio elevatissimo di intossicazione!',
      nephrotoxicRisk: false,
      notes: 'L\'eliminazione è renale per l\'80%. Il mancato adeguamento posologico in AKI/IRC è la causa primaria di tossicità digitalica fatale.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Metabolismo epatico limitato (20%). Dosi standard; monitorare elettroliti ed equilibrio acido-base.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Intossicazione Digitalica Potenzialmente Fatale',
        description: 'Indice terapeutico estremamente stretto (range sicuro 0.5 - 0.9 ng/ml). Sintomi: nausea, vomito, xantopsia (visione gialla), delirio, BAV di grado variabile, extrasistolia ventricolare bigemina e Tachicardia Ventricolare Bidirezionale patognomonica. Antidoto: Frammenti Fab anti-digossina (DigiFab).',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Ipopotassiemia e Ipomagnesiemia aumentano drasticamente la tossicità',
        description: 'La carenza di potassio e magnesio facilita il legame della digossina alla pompa Na/K: mantenere sempre K+ >= 4.0 mEq/L e Mg2+ >= 2.0 mg/dL.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Amiodarone',
        severity: 'major',
        mechanism: 'Amiodarone inibisce la P-glicoproteina, raddoppiando i livelli ematici di digossina.',
        clinicalAdvice: 'Dimezzare la dose di digossina prima di somministrare amiodarone.'
      },
      {
        interactingDrug: 'Diuretici depletori di potassio (Furosemide)',
        severity: 'major',
        mechanism: 'L\'ipokaliemia indotta da furosemide precipita aritmie letali da digossina.',
        clinicalAdvice: 'Monitorare e reintegrare potassio.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Heart Failure & AF Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Digossina EV è raccomandata per il controllo della frequenza ventricolare nella fibrillazione atriale nei pazienti con insufficienza cardiaca scompensata e/o ipotensione, in cui i beta-bloccanti sono controindicati o insufficienti.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Monitoraggio ECG continuo (frequenza ventricolare, intervallo PR, comparsa di aritmie ventricolari)',
      'Potassiemia, magnesiemia e calcemia',
      'Funzionalità renale (creatinina e clearance)',
      'Digossinemia dopo 6-8 ore dalla somministrazione (target 0.5-0.9 ng/ml)'
    ],
    antidote: 'Frammenti Fab specifici anti-digossina (DigiFab)',
    isHighAlert: true
  },
  {
    id: 'labetalolo',
    name: 'Labetalolo EV',
    brandNames: ['Trandate EV'],
    drugClass: 'Beta-bloccanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Crisi Ipertensiva & Dissecazione', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Bloccante alfa-1 e beta-1/beta-2 adrenergico combinato per via endovenosa. Farmaco di prima linea nelle emergenze ipertensive con preeclampsia/eclampsia, dissecazione aortica acuta e ictus ischemico prima della trombolisi.',
    mechanismOfAction: 'Blocco competitivo alfa-1 (vasodilatazione arteriosa e riduzione delle resistenze periferiche senza tachicardia riflessa) e blocco beta-1/beta-2 (previene la tachicardia riflessa e riduce la gittata cardiaca e la contrattilità). Rapporto di blocco alfa:beta pari a circa 1:7 per via endovenosa.',
    dosages: [
      {
        indication: 'Emergenza Ipertensiva (Preeclampsia Severa, Eclampsia, Stroke candidato a trombolisi con PA > 185/110)',
        bolusDose: 'Bolo iniziale: 10 - 20 mg EV lenti in 2 minuti. Se risposta inadeguata dopo 10 minuti: raddoppiare a 20, 40, fino a 80 mg ogni 10 minuti (massimo cumulativo 300 mg).',
        maintenanceDose: 'Infusione continua: 0.5 - 2 mg/min (30 - 120 mg/h) titolata su PA target.',
        preparation: 'Fiale da 100 mg/20 ml (5 mg/ml). Per infusione: 200 mg (2 fiale) in 200 ml SF (1 mg/ml).',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Nei casi ostetrici (preeclampsia) il labetalolo è il farmaco antiipertensivo di prima scelta raccomandato a livello internazionale (target PAS 140-150 mmHg).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento (metabolismo epatico prevalente per glucuronidazione).',
      dialysis: 'Nessun aggiustamento. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la velocità di mantenimento del 25-50%.',
      childPughC: 'Metabolismo epatico esteso. Ridurre dosi e titolare lentamente per aumentata biodisponibilità.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Broncocostrizione in Pazienti Asmatici',
        description: 'Il blocco beta-2 non selettivo può scatenare broncospasmo severo in pazienti con asma bronchiale o BPCO grave.'
      },
      {
        severity: 'high',
        title: 'Bradicardia e Blocco AV',
        description: 'Controindicato in caso di BAV di II o III grado, malattia del nodo del seno o bradicardia marcata (< 50 bpm).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Calcio-antagonisti (Verapamil / Diltiazem)',
        severity: 'contraindicated',
        mechanism: 'Depressione miocardica e dromotropa sinergica severa.',
        clinicalAdvice: 'Non associare per via endovenosa.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Hypertension 2024 & ESO Stroke Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Labetalolo EV è raccomandato come farmaco di prima scelta nelle emergenze ipertensive, nell\'ictus ischemico acuto pre-trombolisi e nelle crisi ipertensive in gravidanza (preeclampsia grave).',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua (ogni 5 minuti durante bolo/titolazione)',
      'Frequenza cardiaca continua telemetrica',
      'Parametri cardiotocografici fetali se preeclampsia'
    ],
    isHighAlert: false
  },
  {
    id: 'nitroprussiato-sodio',
    name: 'Nitroprussiato di Sodio',
    brandNames: ['Nipride'],
    drugClass: 'Nitrati & Vasodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Crisi Ipertensiva & Dissecazione', 'EPA & Insufficienza Cardiaca'],
    quickSummary: 'Potentissimo vasodilatatore arteriolare e venoso ad azione immediata (secondi) ed emivita ultrabreve (1-2 minuti). Farmaco di salvataggio nelle emergenze ipertensive estreme, dissecazione aortica (associato a beta-bloccante) ed edema polmonare ipertensivo refrattario.',
    mechanismOfAction: 'Cede spontaneamente ossido nitrico (NO) senza richiedere bioattivazione enzimatica tissutale, stimolando la guanilato ciclasi solubile con aumento di cGMP e rilasciamento immediato e bilanciato della muscolatura liscia arteriosa e venosa sistemica.',
    dosages: [
      {
        indication: 'Emergenza Ipertensiva Maligna / Crisi Ipertensiva Refrattaria',
        maintenanceDose: 'Iniziare a 0.3 - 0.5 mcg/kg/min; titolare a piccoli incrementi di 0.5 mcg/kg/min ogni 5 minuti (dose media 1 - 3 mcg/kg/min; max 10 mcg/kg/min per non oltre 10 minuti!).',
        preparation: 'Flacone polvere da 50 mg. Sciogliere con 2-3 ml di Glucosata 5% e diluire in 250 o 500 ml G5%. FOTOLABILE: avvolgere IMMEDIATAMENTE il flacone e il deflussore con foglio di alluminio opaco protettivo!',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 0.2,
          defaultDilutionText: '50 mg in 250 ml G5% (200 mcg/ml)',
          unit: 'mcg/kg/min',
          minRate: 0.2,
          maxRate: 5.0,
          defaultRate: 0.5,
          step: 0.2
        },
        route: ['Infusione continua'],
        clinicalTips: 'Obbligatorio monitoraggio continuo con linea arteriosa cruenta. Non superare 2 mcg/kg/min per più di 24-48 ore per prevenire accumulo di cianuro e tiocianato.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard titolata su PAM.',
      crclModerate: 'Titolare con attenzione; rischio accumulo tiocianato se infusione > 24h.',
      crclSevere: 'CrCl < 30 ml/min: Rischio elevatissimo di intossicazione da tiocianato (eliminato dai reni). Limitare l\'infusione al minor tempo possibile e dosare tiocianato.',
      dialysis: 'Il tiocianato è emodializzabile; usare solo se alternative non disponibili.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Rischio di accumulo di cianuro per ridotta conversione epatica da parte della rodanasi.',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica grave per incapacità di detossificare il cianuro in tiocianato.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Tossicità Letale da Cianuro e Tiocianato',
        description: 'La molecola contiene 5 gruppi cianuro. A dosi > 2 mcg/kg/min o infusioni prolungate si sviluppa acidosi lattica profonda da blocco della citocromo ossidasi mitocondriale, ipossia cellulare e arresto cardiaco. Trattamento tossicità: Idrossocobalamina (Cyanokit 5 g EV) o Sodio Tiosolfato.',
        isQTC: false
      },
      {
        severity: 'black_box',
        title: 'Fotolabilità Estrema e Ipotensione Precipite',
        description: 'La soluzione si decompone alla luce: proteggere la sacca e le linee con involucro schermante scuro. Provoca calo pressorio fulmineo; richiede linea arteriosa.',
        requiresCVC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori della PDE-5 (Sildenafil, Tadalafil)',
        severity: 'contraindicated',
        mechanism: 'Collasso circolatorio irreversibile.',
        clinicalAdvice: 'Controindicazione assoluta.'
      }
    ],
    guidelines: [
      {
        society: 'ESC Hypertension & Heart Failure Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Riservato alle emergenze ipertensive estreme e all\'EPA ipertensivo refrattario sotto monitoraggio invasivo della pressione arteriosa in terapia intensiva.',
        evidenceLevel: 'Classe IIa, Livello C'
      }
    ],
    monitoring: [
      'Pressione arteriosa invasiva continua (linea arteriosa obbligatoria)',
      'Emogasanalisi arteriosa continua (lattati e deficit di basi per screening cianuro)',
      'Dosaggio livelli sierici di tiocianato se infusione > 24-48 ore'
    ],
    antidote: 'Idrossocobalamina (Cyanokit 5 g EV) o Sodio Tiosolfato',
    isHighAlert: true
  },
  {
    id: 'ticagrelor',
    name: 'Ticagrelor',
    brandNames: ['Brilique'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Tromboembolismo & SCA'],
    quickSummary: 'Antiaggregante piastrinico inibitore reversibile del recettore P2Y12 ad azione diretta. Farmaco di scelta raccomandato dalle linee guida ESC nella Sindrome Coronarica Acuta (STEMI e NSTE-ACS) rispetto a Clopidogrel.',
    mechanismOfAction: 'Antagonista allosterico reversibile del recettore P2Y12 dell\'ADP sulle piastrine: non richiede attivazione metabolica epatica (farmaco attivo), con inizio dell\'inibizione piastrinica rapido (< 30 minuti) e prevedibile. Inibisce inoltre il trasportatore ENT1 aumentando i livelli locali di adenosina.',
    dosages: [
      {
        indication: 'Sindrome Coronarica Acuta (STEMI / NSTEMI / Angina Instabile ad alto rischio)',
        bolusDose: 'Dose di carico immediata: 180 mg per via orale (2 compresse da 90 mg) assunte al momento della diagnosi.',
        maintenanceDose: 'Mantenimento: 90 mg per via orale due volte al giorno (ogni 12 ore) in associazione con Aspirina (ASA 75-100 mg/die) per 12 mesi.',
        preparation: 'Compresse rivestite da 90 mg. Nei pazienti intubati o con disfagia possono essere frantumate e somministrate via sondino naso-gastrico.',
        route: ['Sublinguale'],
        clinicalTips: 'Iniziare il prima possibile nello STEMI prima della coronarografia; nel NSTE-ACS le linee guida ESC 2023 raccomandano il pre-trattamento solo se l\'anatomia coronarica è nota o coronarografia ritardata > 24h.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento di dose (eliminazione epatica/biliare per il 74%).',
      dialysis: 'Dose standard. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Usare con cautela; monitorare rischio emorragico.',
      childPughC: 'CONTROINDICATO per compromissione della coagulazione epatica.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Rischio Emorragico e Chirurgia Urgente (CABG)',
        description: 'Sospendere almeno 3 giorni (preferibilmente 5 giorni) prima di chirurgia cardiochirurgica o maggiore programmata per ridurre sanguinamenti catastrofici.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Dispnea da Adenosina',
        description: 'Circa il 10-15% dei pazienti sviluppa una sensazione di dispnea benigna a riposo (mediata dall\'aumento di adenosina plasmatica), di solito autolimitante nelle prime settimane.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori potenti del CYP3A4 (Ketoconazolo, Claritromicina)',
        severity: 'contraindicated',
        mechanism: 'Aumento marcato delle concentrazioni plasmatiche e del rischio emorragico.',
        clinicalAdvice: 'Evitare la co-somministrazione.'
      },
      {
        interactingDrug: 'Morfina EV',
        severity: 'major',
        mechanism: 'La morfina ritarda lo svuotamento gastrico e riduce l\'assorbimento e l\'azione antiaggregante di ticagrelor nelle prime 2-4 ore dell\'infarto.',
        clinicalAdvice: 'Usare morfina solo se dolore refrattario severo.'
      }
    ],
    guidelines: [
      {
        society: 'ESC ACS Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Ticagrelor 180 mg carico + 90 mg bid è raccomandato in tutti i pazienti con SCA senza controindicazioni (emorragia attiva, pregresso ictus emorragico), con superiorità dimostrata rispetto a Clopidogrel sulla mortalità cardiovascolare.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Emoglobina ed ematocrito (sorveglianza sanguinamenti occulti)',
      'Valutazione della dispnea (differenziare da dispnea ischemica o scompenso cardiaco)',
      'Funzionalità renale (può causare transitori incrementi della creatinina)'
    ],
    isHighAlert: false
  },
  {
    id: 'acido-acetilsalicilico',
    name: 'Acido Acetilsalicilico (ASA)',
    brandNames: ['Cardioaspirina', 'Aspirina', 'Flectadol EV'],
    drugClass: 'Antiaggreganti & Anticoagulanti',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Tromboembolismo & SCA'],
    quickSummary: 'Antiaggregante piastrinico cardine universale. Somministrazione immediata obbligatoria al sospetto di Sindrome Coronarica Acuta (SCA) e nell\'ictus ischemico dopo 24 ore dalla trombolisi o immediatamente se non trombolisato.',
    mechanismOfAction: 'Acetilazione irreversibile della ciclossigenasi-1 (COX-1) piastrinica, bloccando la sintesi di trombossano A2 (TXA2) per l\'intera vita vitale della piastrina (7-10 giorni).',
    dosages: [
      {
        indication: 'Sindrome Coronarica Acuta (STEMI / NSTEMI / Angina Instabile)',
        bolusDose: 'Carico immediato: 150 - 300 mg per os MASTICATI (per accelerare l\'assorbimento buccale immediato) oppure 75 - 250 mg EV lenti (es. Flectadol 250-500 mg).',
        maintenanceDose: 'Mantenimento: 75 - 100 mg per os al giorno a tempo indefinito.',
        preparation: 'Compresse non gastroprotette masticate o fiala iniettabile EV.',
        route: ['Sublinguale', 'EV lento'],
        clinicalTips: 'Non usare compresse gastroresistenti per il carico in emergenza (assorbimento ritardato di ore!). Far masticare compresse standard.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard nella SCA (beneficio anti-ischemico supera il rischio). Evitare dosi antinfiammatorie elevate.',
      dialysis: 'Dose standard.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Cautela; monitorare rischio emorragico gastrico.',
      childPughC: 'Usare con estrema prudenza nella cirrosi grave con varici esofagee note.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ulcera peptica attiva ed emorragia gastrointestinale',
        description: 'Controindicato in caso di emorragia gastrointestinale attiva maggiore.'
      },
      {
        severity: 'high',
        title: 'Allergia / Asma da ASA (Triade di Samter)',
        description: 'Controindicato nei pazienti con asma bronchiale indotta da aspirina con poliposi nasale (rischio broncospasmo asfittico fatale!).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'FANS (Ibuprofene, Ketorolac)',
        severity: 'major',
        mechanism: 'I FANS bloccano competitivamente l\'accesso dell\'ASA al sito catalitico della COX-1 annullandone l\'effetto cardioprotettivo irreversibile.',
        clinicalAdvice: 'Assumere l\'ASA almeno 2 ore prima dei FANS o evitare FANS nella cardiopatia ischemica.'
      }
    ],
    guidelines: [
      {
        society: 'ESC ACS Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Dose di carico orale di 150-300 mg (masticata) o 75-250 mg EV è raccomandata per tutti i pazienti senza controindicazioni al primo contatto medico per sospetta SCA.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Segni di sanguinamento gastroenterico o mucoso',
      'Valutazione di reazioni anafilattoidi o broncospasmo'
    ],
    isHighAlert: false
  },
  {
    id: 'vancomicina',
    name: 'Vancomicina EV',
    brandNames: ['Zinforo / Vancomicina Fiale'],
    drugClass: 'Antibiotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Infezione & Sepsi'],
    quickSummary: 'Glicopeptide di riferimento per infezioni severe da batteri Gram-positivi resistenti (MRSA, Enterococchi ampicillino-resistenti). Farmaco cardine empirico nella sepsi catetere-correlata, endocardite acuta e meningite batterica.',
    mechanismOfAction: 'Inibisce la biosintesi del peptidoglicano della parete cellulare batterica legando con alta affinità il terminale D-alanil-D-alanina, bloccando la polimerizzazione e la formazione dei legami crociati.',
    dosages: [
      {
        indication: 'Sepsi Grave / Shock Settico da sospetto MRSA / Endocardite Batterica',
        bolusDose: 'Dose di carico basata su peso effettivo: 25 - 30 mg/kg (massimo 2 - 2.5 g) EV infusa lentamente.',
        maintenanceDose: '15 - 20 mg/kg ogni 8 - 12 ore (o infusione continua di 30-40 mg/kg/die dopo il carico) con target AUC/MIC 400-600 mg*h/L o valle (trough) 15-20 mcg/ml.',
        preparation: 'Flacone polvere da 500 mg o 1 g ricostituito con acqua PPI e diluito in almeno 200-500 ml di Soluzione Fisiologica o G5%. VELOCITÀ DI INFUSIONE: NON SUPERARE 10 mg/min (massimo 1 g in almeno 60-90 minuti, 2 g in 120 minuti).',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Infusioni rapide scatenano la "Red Man Syndrome" (rilascio istaminico massivo con eritema toracico-facciale, prurito e ipotensione).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'CrCl > 80 ml/min: 15-20 mg/kg ogni 8-12 ore.',
      crclModerate: 'CrCl 50-79 ml/min: 15 mg/kg ogni 12-24 ore. CrCl 30-49 ml/min: 15 mg/kg ogni 24 ore.',
      crclSevere: 'CrCl < 30 ml/min: Dose di carico 25-30 mg/kg INVARIATA; dosi successive guidate SOLO dal dosaggio terapeutico ematico (trough < 15-20 mcg/ml prima della risomministrazione).',
      dialysis: 'Emodialisi: carico 25-30 mg/kg; dosi successive (circa 500-1000 mg) somministrate post-dialisi solo quando il livello ematico pre-dialisi scende sotto 15-20 mcg/ml.',
      nephrotoxicRisk: true,
      notes: 'L\'eliminazione è al 90% renale. Rischio di necrosi tubulare acuta dose-dipendente e concentrazione-dipendente.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard; attenzione se sindrome epato-renale.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Nefrotossicità Sinergica Letale con Tazocin',
        description: 'La co-somministrazione empirica con Piperacillina/Tazobactam aumenta di quasi 3 volte l\'incidenza di danno renale acuto (AKI) rispetto a Vancomicina + Cefepime o Meropenem! Monitorare quotidianamente la funzione renale.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Sindrome dell\'Uomo Rosso (Red Man Syndrome)',
        description: 'Reazione pseudo-allergica da degranulazione istaminica massiva dovuta ad infusione EV troppo rapida: eritema a mantellina su viso, collo e tronco, ipotensione e brividi. Prevenzione: infondere a velocità non superiore a 1 g/h.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Piperacillina / Tazobactam',
        severity: 'major',
        mechanism: 'Sinergia nefrotossica diretta a livello delle cellule tubulari renali.',
        clinicalAdvice: 'Evitare se possibile nei pazienti a rischio di AKI; monitorare creatinina e diuresi.'
      },
      {
        interactingDrug: 'Aminoglicosidi (Amikacina, Gentamicina)',
        severity: 'major',
        mechanism: 'Potenziamento marcato di oto- e nefrotossicità.',
        clinicalAdvice: 'Monitoraggio TDM rigoroso.'
      }
    ],
    guidelines: [
      {
        society: 'IDSA / ASHP Consensus & Surviving Sepsis 2021',
        year: 2021,
        keyRecommendation: 'Dose di carico empirica di 25-30 mg/kg è raccomandata nei pazienti con sepsi grave o shock settico per raggiungere rapidamente concentrazioni battericide efficaci.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Creatinina sierica giornaliera e calcolo clearance',
      'Monitoraggio terapeutico dei livelli ematici (TDM): valle (trough) prima della 4a dose',
      'Velocità di infusione e monitoraggio pressorio durante l\'infusione'
    ],
    isHighAlert: true
  },
  {
    id: 'salbutamolo',
    name: 'Salbutamolo (Albuterolo)',
    brandNames: ['Ventolin'],
    drugClass: 'Broncodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Asma Acuto', 'BPCO Riacutizzata', 'Arresto Cardiaco / ACLS'],
    quickSummary: 'Agonista selettivo beta-2 adrenergico a rapida insorgenza d\'azione. Farmaco cardine per il broncospasmo severo in corso di asma acuto, riacutizzazione di BPCO e come trattamento temporaneo per l\'iperkaliemia grave con alterazioni ECG.',
    mechanismOfAction: 'Stimola selettivamente i recettori beta-2 della muscolatura liscia bronchiale con attivazione dell\'adenilato ciclasi e aumento di cAMP: broncodilatazione potente entro 5 minuti. Attiva inoltre la pompa Na+/K+ ATPasi cellulare determinando il rapido passaggio di ioni potassio dal compartimento extracellulare all\'interno delle cellule.',
    dosages: [
      {
        indication: 'Asma Bronchiale Acuto Grave / Riacutizzazione Severa di BPCO',
        bolusDose: '2.5 - 5 mg (1 - 2 fialette monodose da 2.5 mg) nebulizzati con aerosol guidato da ossigeno (flusso 6-8 L/min). Ripetibile ogni 20 minuti per 3 dosi nelle prime 2 ore, poi ogni 1-4 ore.',
        preparation: 'Soluzione per nebulizzazione 2.5 mg o 5 mg. In asma quasi fatale: nebulizzazione continua a 10-15 mg/h.',
        route: ['Inalatoria'],
        clinicalTips: 'Associare sempre Ipratropio bromuro (0.5 mg) nelle prime dosi dell\'asma grave: sinergia terapeutica comprovata.'
      },
      {
        indication: 'Iperkaliemia Grave con Alterazioni ECG (Trattamento Shift Intracellulare Temporaneo)',
        bolusDose: '10 - 20 mg nebulizzati con maschera in 15 minuti (dose 4 volte superiore alla dose asmatica standard per ottenere lo shift di potassio!).',
        preparation: '4-8 fialette da 2.5 mg nebulizzate.',
        route: ['Inalatoria'],
        clinicalTips: 'Abbassa la potassiemia di 0.5 - 1.0 mEq/L entro 15-30 minuti, con effetto per 2-4 ore. Nel 10-20% dei pazienti in terapia con beta-bloccanti l\'effetto è ridotto.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard per via inalatoria (assorbimento sistemico limitato).',
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
        title: 'Tachicardia, tremori e ipokaliemia',
        description: 'La stimolazione beta-1 accessoria o l\'eccesso di dosaggio possono indurre tachicardia sinusale marcata, extrasistolia ventricolare, tremore alle estremità e caduta del potassio.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti non selettivi (Propranololo, Sotalolo)',
        severity: 'major',
        mechanism: 'Antagonismo recettoriale diretto che precipita broncospasmo severo e annulla l\'effetto del salbutamolo.',
        clinicalAdvice: 'Controindicati negli asmatici.'
      }
    ],
    guidelines: [
      {
        society: 'GINA Asthma Guidelines 2024 & GOLD COPD 2024',
        year: 2024,
        keyRecommendation: 'I SABA inalatori (Salbutamolo) a dosi ripetute frequenti rappresentano la terapia broncodilatatrice cardine di prima linea nell\'attacco acuto d\'asma.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Saturazione SpO2 e parametri emogasanalitici (pCO2: attenzione se pCO2 normale o in salita in paziente tachipnoico: segno di esaurimento muscolare imminente!)',
      'Frequenza cardiaca e ritmo',
      'Potassiemia serica'
    ],
    isHighAlert: false
  },
  {
    id: 'desametasone',
    name: 'Desametasone Fosfato Sodico EV',
    brandNames: ['Soldesam', 'Decadron'],
    drugClass: 'Corticosteroidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Convulsioni & Neurologia d\'Urgenza', 'Infezione & Sepsi', 'Reazioni Allergiche & Anafilassi', 'Asma Acuto'],
    quickSummary: 'Potentissimo glucocorticoide a lunga durata d\'azione privo di attività mineralcorticoide. Indicato nell\'edema cerebrale vasogenico peritumorale, nella prima dose della meningite batterica acuta, nell\'angioedema acuto/anafilassi e nel laringospasmo/croup severo.',
    mechanismOfAction: 'Attività glucocorticoide circa 25-30 volte superiore a quella dell\'idrocortisone, senza ritenzione sodica (zero effetto mineralcorticoide). Ripristina l\'integrità della barriera emato-encefalica riducendo la permeabilità vascolare nell\'edema cerebrale vasogenico e sopprime la cascata citochinica infiammatoria meningea ed allergico-anafilattica.',
    dosages: [
      {
        indication: 'Meningite Batterica Acuta dell\'Adulto (Sospetto o conferma di Streptococcus pneumoniae)',
        bolusDose: '10 mg EV somministrati PRIMA o CONTESTUALMENTE alla prima dose di antibiotico (Ceftriaxone). Ripetere 10 mg ogni 6 ore per 4 giorni.',
        preparation: 'Fiale da 4 mg/1 ml o 8 mg/2 ml somministrate in bolo EV.',
        route: ['EV rapido'],
        clinicalTips: 'FONDAMENTALE IL TIMING: se somministrato dopo l\'antibiotico non riduce la mortalità né le sequele uditive/neurologiche. Sospendere se l\'esame colturale isola patogeno diverso da pneumococco.'
      },
      {
        indication: 'Angioedema Acuto / Reazione Allergica Severa / Edema della Glottide',
        bolusDose: '8 - 16 mg (1 o 2 fiale da 4 mg/1 ml o 8 mg/2 ml) EV lenta in bolo in 2-3 minuti o IM profonda.',
        maintenanceDose: '4 - 8 mg ogni 12 ore per 24-48 ore fino a risoluzione dell\'edema mucoso.',
        preparation: 'Fiale pronte da 4 mg/1 ml o 8 mg/2 ml (fosfato sodico iniettabile).',
        route: ['EV rapido', 'IM'],
        clinicalTips: 'L\'effetto anti-edema inizia dopo 1-2 ore, con emivita biologica tessutale lunga (36-72 ore). Nell\'anafilassi non sostituisce l\'adrenalina IM.'
      },
      {
        indication: 'Edema Cerebrale Vasogenico da Neoplasia Cerebrale o Metastasi',
        bolusDose: 'Bolo iniziale: 10 - 16 mg EV, seguito da 4 - 8 mg EV ogni 6 ore.',
        preparation: 'Fiala pura EV lenta.',
        route: ['EV lento'],
        clinicalTips: 'Inefficace nell\'edema cerebrale citotossico da ictus ischemico acuto o trauma cranico isolato (CRASH trial)!'
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
      childPughC: 'Metabolismo epatico. Clearance prolungata; cicli brevi di emergenza ben tollerati.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Iperglicemia marcata acuta',
        description: 'Potente stimolazione della gluconeogenesi con rapido innalzamento dei valori glicemici, specie nei diabetici.'
      },
      {
        severity: 'moderate',
        title: 'Prurito o bruciore perineale da bolo EV rapido',
        description: 'L\'iniezione endovenosa troppo rapida (< 30 secondi) può causare una sensazione transitoria sgradevole di bruciore intenso o parestesie in regione perineale.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'FANS',
        severity: 'major',
        mechanism: 'Grave incremento del rischio di ulcera ed emorragia gastrica.',
        clinicalAdvice: 'Associare IPP protettivo.'
      }
    ],
    guidelines: [
      {
        society: 'ESCMID Meningitis Guidelines 2024',
        year: 2024,
        keyRecommendation: 'Desametasone 10 mg EV ogni 6 ore per 4 giorni iniziato con la prima dose di antibiotico riduce significativamente la mortalità e la perdita dell\'udito nella meningite pneumococcica.',
        evidenceLevel: 'Livello 1A'
      },
      {
        society: 'EAACI & WAO Anaphylaxis Guidelines 2022',
        year: 2022,
        keyRecommendation: 'I corticosteroidi sistemici ad alta potenza (desametasone 8-16 mg EV) sono raccomandati come terapia adiuvante per ridurre il rischio di reazione anafilattica bifasica tardiva e trattare l\'edema mucoso.',
        evidenceLevel: 'Grado 2B'
      }
    ],
    monitoring: [
      'Pervietà delle vie aeree e risoluzione dell\'edema',
      'Glicemia capillare ogni 4-6 ore',
      'Esame neurologico seriato',
      'Pressione arteriosa'
    ],
    isHighAlert: false
  },
  {
    id: 'valproato-sodio',
    name: 'Valproato di Sodio EV',
    brandNames: ['Depakin EV'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Antiepilettico ad ampio spettro per via endovenosa. Agente di seconda linea di pari efficacia rispetto a Levetiracetam nello stato di male epilettico refrattario alle benzodiazepine (ESETT trial).',
    mechanismOfAction: 'Aumenta i livelli cerebrali di GABA (inibendo la GABA transaminasi e la semialdeide deidrogenasi succinica), blocca i canali del sodio voltaggio-dipendenti e sopprime i canali del calcio di tipo T talamici a bassa soglia.',
    dosages: [
      {
        indication: 'Stato di Male Epilettico Convulsivo (Fase 2: crisi persistente dopo benzodiazepina)',
        bolusDose: '40 mg/kg EV (massimo 3000 mg) infusi rapidamente a velocità fino a 3-6 mg/kg/min (in 10 minuti).',
        preparation: 'Flacone liofilizzato da 400 mg con 4 ml di solvente. Diluire la dose calcolata in 100 ml di Soluzione Fisiologica o Glucosata 5%.',
        route: ['EV lento'],
        clinicalTips: 'Eccellente stabilità emodinamica; a differenza della fenitoina non induce ipotensione marcata né aritmie cardiache da solvente.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Carico standard; in IRC severa la frazione libera non legata alle proteine aumenta: monitorare tossicità.',
      dialysis: 'Dose supplementare richiesta post-emodialisi (rimosso parzialmente).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Carico standard.',
      childPughB: 'CONTROINDICATO se epatopatia acuta severa o cirrosi scompensata.',
      childPughC: 'CONTROINDICATO: rischio di necrosi epatica fulminante e iperammoniemia con coma epatico!',
      hepatotoxicRisk: true,
      notes: 'Può causare encefalopatia iperammoniemica anche con transaminasi normali per inibizione dell\'enzima carbamilfosfato sintetasi.'
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CONTROINDICAZIONE ASSOLUTA: Associazione con Carbapenemi (Meropenem)',
        description: 'La somministrazione concomitante con Meropenem, Imipenem o Ertapenem provoca un crollo istantaneo dei livelli di valproato (> 80% entro 24 ore), scatenando recidive convulsive incoercibili e stato di male epilettico refrattario! Associazione da evitare assolutamente.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Encefalopatia Iperammoniemica con transaminasi normali',
        description: 'Nel paziente che peggiora lo stato di coscienza dopo valproato, dosare sempre l\'ammoniemia sierica (trattare con L-carnitina).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Carbapenemi (Meropenem, Imipenem)',
        severity: 'contraindicated',
        mechanism: 'I carbapenemi inibiscono l\'idrolisi del valproato glucuronide e aumentano la clearance renale azzerando i livelli plasmatici.',
        clinicalAdvice: 'NON usare mai insieme. Passare a Levetiracetam o Lacosamide.'
      }
    ],
    guidelines: [
      {
        society: 'AES / Neurocritical Care Society Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Valproato EV 40 mg/kg è raccomandato di prima linea in Fase 2 nello stato epilettico a pari merito con Levetiracetam.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Tracciato EEG e frequenza delle crisi',
      'Ammoniemia e transaminasi epatiche',
      'Conta piastrinica (può indurre trombocitopenia dose-dipendente)'
    ],
    isHighAlert: false
  },
  {
    id: 'etomidato',
    name: 'Etomidato',
    brandNames: ['Hypnomidate'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'ps',
    emergencyIndications: ['Sedazione Procedurale & RSI'],
    quickSummary: 'Ipnotico imidazolo carbossilato per via endovenosa caratterizzato da una stabilità emodinamica insuperata. Induttore di prima scelta per l\'intubazione a sequenza rapida (RSI) nel paziente con grave compromissione emodinamica, politrauma o sepsi.',
    mechanismOfAction: 'Modulatore allosterico positivo dei recettori GABA-A. Inizio d\'azione rapidissimo (entro 30-45 secondi) e risveglio in 5-10 minuti. Non induce vasodilatazione periferica significativa né deprime la contrattilità miocardica (PAM stabile). Riduce inoltre la pressione intracranica e il consumo metabolico cerebrale.',
    dosages: [
      {
        indication: 'Induzione nell\'Intubazione a Sequenza Rapida (RSI) nel paziente instabile / in shock',
        bolusDose: '0.3 mg/kg EV in bolo rapido in 30-60 secondi (solitamente 15-20 mg nell\'adulto).',
        preparation: 'Fiale da 20 mg/10 ml (2 mg/ml) pronte per iniezione EV rapida.',
        route: ['EV rapido'],
        clinicalTips: 'A differenza del Propofol non causa caduta pressoria; a differenza della Ketamina non aumenta la richiesta di O2 miocardico.'
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
      childPughB: 'Dose standard acuta.',
      childPughC: 'Metabolismo epatico. Dose singola standard; durata lievemente prolungata.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Soppressione Corticosurrenalica Transitoria',
        description: 'Inibisce reversibilmente l\'enzima 11-beta-idrossilasi surrenalico bloccando la sintesi di cortisolo e aldosterone per circa 24 ore. Per questo motivo è controindicato in infusione continua ed è limitato al singolo bolo di induzione RSI.',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Mioclonie all\'induzione e dolore venoso',
        description: 'Circa il 20-30% dei pazienti sviluppa mioclonie benigne durante l\'induzione (da disinibizione sottocorticale, non epilettiche).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi (Fentanil)',
        severity: 'moderate',
        mechanism: 'Effetto ipnotico additivo.',
        clinicalAdvice: 'Normale sinergia per intubazione.'
      }
    ],
    guidelines: [
      {
        society: 'European Difficult Airway Guidelines & ACLS 2023',
        year: 2023,
        keyRecommendation: 'Etomidato 0.3 mg/kg è raccomandato come agente induttore di prima scelta per l\'intubazione in pazienti critici emodinamicamente instabili grazie al profilo di sicurezza cardiocircolatorio.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Pressione arteriosa e frequenza cardiaca',
      'Pulsossimetria SpO2 e capnografia continua',
      'Profondità dell\'ipnosi prima della paralisi muscolare'
    ],
    isHighAlert: false
  },
  {
    id: 'succinilcolina',
    name: 'Succinilcolina (Sussametonio)',
    brandNames: ['Midarine', 'Succinilcolina Cloruro Fiale'],
    drugClass: 'Bloccanti neuromuscolari',
    clinicalSetting: 'ps',
    emergencyIndications: ['Sedazione Procedurale & RSI'],
    quickSummary: 'Bloccante neuromuscolare depolarizzante ad azione ultra-rapida (45 secondi) e brevissima durata (6-10 minuti). Utilizzato tradizionalmente per l\'intubazione a sequenza rapida (RSI) d\'emergenza.',
    mechanismOfAction: 'Si lega ai recettori colinergici nicotinici della placca motrice provocando una depolarizzazione prolungata e refrattarietà con fascicolazioni muscolari diffuse seguite da paralisi flaccida completa. Idrolizzata rapidamente dalle pseudocolinesterasi plasmatiche.',
    dosages: [
      {
        indication: 'Intubazione a Sequenza Rapida (RSI) in Emergenza',
        bolusDose: '1.5 - 2.0 mg/kg EV in bolo rapido singolo (circa 100-140 mg nell\'adulto).',
        preparation: 'Fiale da 100 mg/2 ml conservate in frigorifero (+2°C / +8°C).',
        route: ['EV rapido'],
        clinicalTips: 'L\'onset è rapidissimo (45 secondi); il recupero completo della respirazione spontanea avviene in 6-10 minuti (se pseudocolinesterasi normali).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Controllare potassiemia basale!',
      crclSevere: 'CONTROINDICATA SE IPERKALIEMIA NOTA O PRESUNTA (K+ > 5.5 mEq/L): la succinilcolina causa sempre un rialzo transitorio del potassio di 0.5 - 1.0 mEq/L che in IRC severa scatena arresto cardiaco in asistolia! Preferire Rocuronio 1.2 mg/kg.',
      dialysis: 'Controindicata se potassio elevato. Preferire Rocuronio.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Durata d\'azione prolungata (le pseudocolinesterasi sono sintetizzate dal fegato).',
      childPughC: 'Paralisi notevolmente prolungata per deficit di pseudocolinesterasi epatiche.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'IPERKALIEMIA MASSIVA LETALE ED ARRESTO CARDIACO',
        description: 'CONTROINDICAZIONE ASSOLUTA in: grandi ustionati (> 24-48 ore dall\'evento), politraumatizzati con schiacciamento/rabdomiolisi, lesioni midollari/denervazione muscolare (> 48h), miopatie e iperkaliemia preesistente (> 5.5 mEq/L): la upregulation dei recettori colinergici extra-giunzionali causa un massiccio efflusso di potassio con arresto cardiaco immediato e morte in sala emergenza!',
        isQTC: false
      },
      {
        severity: 'black_box',
        title: 'Ipertermia Maligna',
        description: 'Trigger comprovato di ipertermia maligna genetica in soggetti predisposti: rigidità muscolare severa, ipertermia rapida > 42°C, ipercapnia esplosiva alla capnografia e rabdomiolisi. Antidoto specifico: Dantrolene sodico EV (2.5 mg/kg).',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori della colinesterasi (Neostigmina)',
        severity: 'contraindicated',
        mechanism: 'Prolungano drammaticamente il blocco neuromuscolare (non usare per il reversal!).',
        clinicalAdvice: 'Non somministrare neostigmina.'
      }
    ],
    guidelines: [
      {
        society: 'DAS Airway Guidelines & ERC 2023',
        year: 2023,
        keyRecommendation: 'Rocuronio ad alte dosi (1.2 mg/kg) ha ampiamente sostituito la succinilcolina nella RSI d\'urgenza per l\'assenza di iperkaliemia letale e la disponibilità dell\'antidoto Sugammadex.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Capnografia (EtCO2) immediata per conferma intubazione e screening ipertermia maligna',
      'Telemetria ECG continua (potassio, ritmo)',
      'Ripresa del tono muscolare e della respirazione'
    ],
    antidote: 'Dantrolene sodico (per Ipertermia Maligna)',
    isHighAlert: true
  },
  {
    id: 'ketorolac',
    name: 'Ketorolac EV / IM',
    brandNames: ['Toradol', 'Lixidol'],
    drugClass: 'FANS & Analgesici non oppioidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Colica Renale & Addome Acuto', 'Dolore Acuto & Analgesia'],
    quickSummary: 'FANS ad elevatissima potenza analgesica per via parenterale. Trattamento di prima linea comprovato per la colica renale/ureterale acuta e dolore muscolo-scheletrico severo privo di debolezza emodinamica o respiratoria.',
    mechanismOfAction: 'Potente inibizione non selettiva delle ciclossigenasi COX-1 e COX-2 con soppressione della sintesi delle prostaglandine periferiche. Nella colica renale riduce la pressione intracavitica pelvi-ureterale e l\'edema ureterale riducendo il filtrato glomerulare mediato da prostaglandine.',
    dosages: [
      {
        indication: 'Colica Renale Acuta Ureterale Severa / Dolore Acuto da Trauma Minore',
        bolusDose: '30 mg EV lento in 100 ml SF (o IM profonda). Se età >= 65 anni o peso < 50 kg: RIDURRE la dose a 10 - 15 mg.',
        maintenanceDose: 'Massimo 60 - 90 mg/die (max 60 mg/die nell\'anziano) per non più di 2 giorni consecutivi.',
        preparation: 'Fiale da 30 mg/1 ml (o 10 mg/1 ml). Diluire in 100 ml di Soluzione Fisiologica e infondere in 15 minuti.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'Nella colica renale i FANS per via endovenosa sono superiori agli oppioidi per controllo del dolore e minori effetti collaterali (minore vomito, nessuna sedazione).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard (max 2 giorni).',
      crclModerate: 'CrCl 30-50 ml/min: Ridurre la dose del 50% (10-15 mg) e limitare a singola somministrazione.',
      crclSevere: 'CrCl < 30 ml/min o Insufficienza Renale Acuta: CONTROINDICATO ASSOLUTAMENTE per rischio di nefropatia ischemica acuta anurica da blocco delle prostaglandine vasodilatatrici renali.',
      dialysis: 'Controindicato.',
      nephrotoxicRisk: true,
      notes: 'La somministrazione a pazienti disidratati o con ipoperfusione renale è una causa primaria di AKI iatrogena in PS.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Evitare o usare con cautela (rischio emorragia digestiva).',
      childPughC: 'CONTROINDICATO nel cirrotico scompensato: precipita la sindrome epato-renale (HRS) ed emorragie da varici esofagee!',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Ulcera Gastrica, Emorragia e Danno Renale Acuto',
        description: 'Controindicato in caso di emorragia attiva o recente, ulcera peptica, insufficienza renale severa, gravidanza, shock ipovolemico o disidratazione marcata. Durata massima del trattamento: 2 giorni per via parenterale.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Anticoagulanti (Eparina, DOAC, Warfarin) e Antiaggreganti',
        severity: 'major',
        mechanism: 'Effetto emorragico sinergico gastrico e sistemico.',
        clinicalAdvice: 'Evitare la combinazione nel paziente in terapia anticoagulante piena.'
      },
      {
        interactingDrug: 'ACE-inibitori e Sartani',
        severity: 'major',
        mechanism: 'La combinazione FANS + ACEi compromette contemporaneamente l\'arteriola afferente ed efferente con caduta del filtrato glomerulare.',
        clinicalAdvice: 'Evitare se ipoperfusione o disidratazione.'
      }
    ],
    guidelines: [
      {
        society: 'EAU Guidelines on Urolithiasis 2024',
        year: 2024,
        keyRecommendation: 'I FANS (Ketorolac o Diclofenac parenterali) sono raccomandati come farmaci di prima scelta per l\'analgesia nella colica renale acuta, mostrando efficacia superiore e minore necessità di analgesia rescue rispetto agli oppioidi.',
        evidenceLevel: 'Livello 1A'
      }
    ],
    monitoring: [
      'Creatinina e diuresi (sorveglianza AKI)',
      'Scala del dolore NRS prima e a 30 minuti',
      'Segni di emorragia digestiva'
    ],
    isHighAlert: false
  },
  {
    id: 'paracetamolo',
    name: 'Paracetamolo EV',
    brandNames: ['Perfalgan', 'Tachipirina EV'],
    drugClass: 'FANS & Analgesici non oppioidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Dolore Acuto & Analgesia'],
    quickSummary: 'Analgesico ed antipiretico non oppioide parenterale di riferimento per dolore lieve-moderato, febbre acuta nel paziente critico e analgesia multimodale di base (risparmio oppioidi).',
    mechanismOfAction: 'Inibizione centrale della sintesi di prostaglandine a livello cerebrale (COX-3 / varianti centrali COX), modulazione delle vie serotoninergiche discendenti inibitorie e interazione con il sistema cannabinoide/vanilloide endogeno (AM404).',
    dosages: [
      {
        indication: 'Dolore Acuto Lieve-Moderato / Febbre Elevata nel Paziente Critico',
        bolusDose: '1 g EV (1 flacone da 100 ml) infuso in 15 minuti. Ripetibile ogni 6 ore (massimo 4 g/die).',
        preparation: 'Flacone per infusione da 1000 mg/100 ml pronto all\'uso.',
        route: ['EV lento'],
        clinicalTips: 'Se peso corporeo < 50 kg o malnutrizione cronica / alcolismo: ridurre la singola dose a 15 mg/kg (massimo 2-3 g/die).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard (1 g ogni 6h, max 4 g/die).',
      crclModerate: 'CrCl 30-50 ml/min: intervallo minimo di somministrazione allungato a 6 ore.',
      crclSevere: 'CrCl 10-29 ml/min: allungare l\'intervallo a 8 ore (max 3 g/die).',
      dialysis: 'CrCl < 10 ml/min o Emodialisi: intervallo di somministrazione ogni 8-12 ore. Parzialmente dializzabile.',
      nephrotoxicRisk: false,
      notes: 'Analgesico di prima scelta nel paziente con insufficienza renale acuta o cronica (nessuna tossicità renale emodinamica a differenza dei FANS).'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard (max 3 g/die).',
      childPughB: 'Ridurre la dose massima giornaliera a 2 g/die (500-1000 mg ogni 12h).',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica severa attiva. Nei cirrotici stabili max 2 g/die con cautela.',
      hepatotoxicRisk: true,
      notes: 'Metabolismo epatico via citocromo P450 (CYP2E1) con produzione del metabolita tossico NAPQI, normalmente detossificato dal glutatione.'
    },
    warnings: [
      {
        severity: 'high',
        title: 'Epatotossicità Acuta da Sovradosaggio',
        description: 'Dosi cumulative > 4 g/die (o > 2 g nel cirrotico o malnutrito) saturano le riserve epatiche di glutatione provocando accumulo di NAPQI con necrosi centrilobulare epatica massiva e insufficienza epatica fulminante. Antidoto: N-Acetilcisteina (NAC).',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Alcol acuto / cronico e farmaci induttori del CYP2E1 (Rifampicina, Isoniazide)',
        severity: 'major',
        mechanism: 'Induzione enzimatica che accelera la formazione del metabolita epatotossico NAPQI.',
        clinicalAdvice: 'Ridurre la dose massima a 2 g/die.'
      }
    ],
    guidelines: [
      {
        society: 'ESAIC Multimodal Pain Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Paracetamolo EV 1 g rappresenta il farmaco di base dell\'analgesia multimodale in emergenza e post-operatoria, consentendo un risparmio del 20-30% sul consumo di oppioidi.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Temperatura corporea e scala del dolore NRS',
      'Transaminasi epatiche nei trattamenti prolungati (> 48h) o pazienti a rischio'
    ],
    antidote: 'N-Acetilcisteina (NAC)',
    isHighAlert: false
  },
  {
    id: 'flumazenil',
    name: 'Flumazenil',
    brandNames: ['Anexate'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Intossicazioni & Antidoti', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Antagonista competitivo puro dei recettori delle benzodiazepine. Utilizzato per la reversione rapida della sedazione iatrogena da benzodiazepine o per diagnosi/trattamento nell\'overdose pura.',
    mechanismOfAction: 'Si lega competitivamente con altissima affinità al sito recettoriale delle benzodiazepine sul complesso GABA-A nel SNC, spiazzando le benzodiazepine e antagonizzandone gli effetti sedativi, ipnotici e deprimenti respiratori entro 1-2 minuti.',
    dosages: [
      {
        indication: 'Reversione Sedazione Iatrogene o Overdose Pura da Benzodiazepine con Depressione Respiratoria',
        bolusDose: 'Bolo iniziale: 0.2 mg EV in 30 secondi. Se non si ottiene risveglio dopo 60 secondi, somministrare 0.1 mg ogni 60 secondi fino a un massimo di 1.0 mg (raramente 2 mg).',
        preparation: 'Fiale da 0.5 mg/5 ml (0.1 mg/ml) pronte per somministrazione lenta frazionata.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'L\'emivita è breve (circa 40-80 minuti): sorvegliare per resedazione tardiva nei pazienti intossicati da benzodiazepine a lunga durata d\'azione (Diazepam, Clonazepam) e considerare infusione a 0.1-0.4 mg/h.'
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
      childPughB: 'Titolare con microdosi; clearance epatica ridotta.',
      childPughC: 'Metabolismo epatico esteso. Usare con cautela.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'CRISI CONVULSIVE INCOERCIBILI E STATO DI MALE EPILETTICO',
        description: 'CONTROINDICAZIONE ASSOLUTA nei pazienti con epilessia nota in terapia cronica con benzodiazepine, nei soggetti con sospetta dipendenza cronica da BDZ o in caso di intossicazione mista con farmaci pro-convulsivanti (Antidepressivi Triciclici TCA, Bupropione, Teofillina, Cocaina): la somministrazione di Flumazenil annulla il tono inibitorio GABA scatenando crisi convulsive refrattarie potenzialmente letali!',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Antidepressivi Triciclici (Amitriptilina, Clomipramina)',
        severity: 'contraindicated',
        mechanism: 'Scatena aritmie ventricolari e convulsioni incoercibili.',
        clinicalAdvice: 'Non somministrare MAI in intossicazioni da farmaci misti con QRS allargato!'
      }
    ],
    guidelines: [
      {
        society: 'European Association of Poison Centres and Clinical Toxicologists (EAPCCT) 2023',
        year: 2023,
        keyRecommendation: 'Flumazenil deve essere usato con estrema selettività; la ventilazione assistita e il supporto delle vie aeree sono preferibili nell\'overdose da benzodiazepine se sussiste il minimo dubbio di assunzione concomitante di pro-convulsivanti.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Stato di coscienza e frequenza respiratoria',
      'Monitoraggio per ricomparsa di sedazione a distanza di 1 ora',
      'Sorveglianza mioclonie o segni di astinenza acuta'
    ],
    isHighAlert: true
  },
  {
    id: 'n-acetilcisteina',
    name: 'N-Acetilcisteina EV (NAC)',
    brandNames: ['Fluimucil Antidoto Fiale', 'Hidonac'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Intossicazioni & Antidoti'],
    quickSummary: 'Antidoto salvavita universale per l\'intossicazione acuta da Paracetamolo. Previene la necrosi epatica fulminante se somministrato tempestivamente (massima efficacia entro le prime 8 ore dall\'ingestione).',
    mechanismOfAction: 'Agisce come precursore diretto della L-cisteina per la rapida sintesi epatica di glutatione (GSH), che inattiva per coniugazione il metabolita tossico reattivo NAPQI. Funziona inoltre come scavenger diretto dei radicali liberi dell\'ossigeno migliorando l\'emodinamica microcircolatoria epatica.',
    dosages: [
      {
        indication: 'Intossicazione Acuta da Paracetamolo (Ingestione >= 7.5-10 g o livelli sopra il nomogramma di Rumack-Matthew)',
        bolusDose: 'Protocollo Classico EV in 3 Fasi (totale 300 mg/kg in 21 ore): Fase 1 (Carico): 150 mg/kg in 200 ml G5% infusi in 60 minuti. Fase 2: 50 mg/kg in 500 ml G5% in 4 ore. Fase 3: 100 mg/kg in 1000 ml G5% in 16 ore.',
        preparation: 'Flaconi/fiale al 20% (200 mg/ml). Calcolare la dose esatta in base al peso del paziente (max calcolato su 110 kg). Diluire in Glucosata 5% o Soluzione Fisiologica.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Se il paziente giunge entro le 8 ore dall\'ingestione l\'efficacia nel prevenire l\'insufficienza epatica grave è vicina al 100%. Continuare l\'infusione oltre le 21 ore se transaminasi o paracetamolemia restano elevate.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Nessun aggiustamento.',
      crclModerate: 'Nessun aggiustamento.',
      crclSevere: 'Nessun aggiustamento.',
      dialysis: 'Durante l\'emodialisi la clearance della NAC aumenta: raddoppiare la velocità di infusione durante la seduta dialitica.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'FARMACO SALVAVITA: dose standard a pieno dosaggio nell\'insufficienza epatica acuta da paracetamolo.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Reazioni Anafilattoidi Non-IgE Mediate',
        description: 'Frequenti (10-20% dei pazienti), specie durante la prima ora di infusione ad alta concentrazione: flushing facciale, rash cutaneo, broncospasmo lieve e ipotensione. Trattamento: arrestare temporaneamente l\'infusione per 15-30 min, somministrare antistaminico EV e riprendere a velocità dimezzata.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Carbone attivo',
        severity: 'moderate',
        mechanism: 'Il carbone attivo assorbe la NAC orale (ma non interferisce con la somministrazione endovenosa).',
        clinicalAdvice: 'La via endovenosa è preferibile e non risente del carbone attivo somministrato per decontaminazione gastrica.'
      }
    ],
    guidelines: [
      {
        society: 'EAPCCT / British Toxicology Guidelines 2023',
        year: 2023,
        keyRecommendation: 'La somministrazione immediata di N-Acetilcisteina EV è raccomandata in caso di ingestione tossica nota o sospetta di paracetamolo, senza attendere i livelli ematici se sono trascorse più di 8 ore.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Transaminasi (ALT/AST), INR, creatinina e bilirubina a tempo 0 e a 20 ore',
      'Paracetamolemia a 4 ore dall\'ingestione',
      'Segni di reazione anafilattoide durante la prima ora di infusione'
    ],
    isHighAlert: false
  },
  {
    id: 'magnesio-solfato',
    name: 'Magnesio Solfato EV',
    brandNames: ['Magnesio Solfato Fiale 10% - 20%'],
    drugClass: 'Anti-aritmici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Arresto Cardiaco / ACLS', 'Aritmie & Cardioversione', 'Asma Acuto', 'Crisi Ipertensiva & Dissecazione'],
    quickSummary: 'Catione intracellulare fisiologico fondamentale. Trattamento salvavita di prima scelta per la Torsione di Punta e fibrillazione ventricolare refrattaria da ipomagnesiemia, per l\'asma acuto grave quasi-fatale e per la prevenzione e il controllo delle crisi eclamptiche in gravidanza.',
    mechanismOfAction: 'Modula i canali ionici cellulari: riduce le correnti precoci inward di calcio che innescano i post-potenziali precoci nella Torsione di Punta. Nel muscolo liscio bronchiale inibisce il flusso di calcio inducendo marcata broncodilatazione. Nel sistema nervoso centrale deprime la trasmissione neuromuscolare e l\'attività corticale prevenendo le convulsioni eclamptiche.',
    dosages: [
      {
        indication: 'Torsione di Punta (Polymorphic VT con QT lungo) / FV refrattaria in ACLS',
        bolusDose: '2 g EV (8 mmol = 20 ml al 10%) in 1 - 2 minuti in bolo rapido in arresto cardiaco; in 10-15 minuti nel paziente con polso.',
        preparation: 'Fiale al 10% (1 g/10 ml) o 20% (2 g/10 ml).',
        route: ['EV rapido', 'EV lento'],
        clinicalTips: 'Efficace anche se i livelli plasmatici di magnesio basali risultano apparentemente normali.'
      },
      {
        indication: 'Asma Bronchiale Acuto Grave Refrattario ai beta-2 agonisti',
        bolusDose: '2 g EV in 100 ml di Soluzione Fisiologica infusi in 20 minuti.',
        preparation: '2 g in 100 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'GINA 2024: Raccomandato per pazienti con asma severo che non rispondono alla terapia inalatoria iniziale o con SpO2 < 92%.'
      },
      {
        indication: 'Eclampsia / Preeclampsia Grave (Prevenzione delle convulsioni)',
        bolusDose: 'Dose di carico: 4 g EV in 15-20 minuti, seguita da infusione continua di mantenimento a 1 - 2 g/h per 24 ore.',
        preparation: 'Pompa siringa.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Monitorare la presenza dei riflessi osteotendinei rotulei e la diuresi oraria (antidoto per intossicazione: Calcio Cloruro/Gluconato).'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Carico standard; ridurre la velocità di mantenimento del 25-50%.',
      crclSevere: 'CrCl < 30 ml/min: Il magnesio viene eliminato esclusivamente per via renale. Carico standard in emergenza acuta; dimezzare il mantenimento ed eseguire frequenti controlli della magnesiemia.',
      dialysis: 'Dose di bolo acuto standard; evitare infusioni continuate senza monitoraggio.',
      nephrotoxicRisk: false,
      notes: 'L\'accumulo in insufficienza renale può provocare arresto respiratorio e asistolia.'
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Dose standard (escrezione renale).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipermagnesiemia Severa e Arresto Respiratorio',
        description: 'Livelli > 4-5 mmol/L sopprimono i riflessi osteotendinei (segno precoce di allarme), causano ipotensione, sonnolenza e, a livelli > 7 mmol/L, paralisi dei muscoli respiratori e arresto cardiaco. Antidoto: Calcio Cloruro o Gluconato 1 g EV.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Bloccanti neuromuscolari (Rocuronio, Succinilcolina)',
        severity: 'major',
        mechanism: 'Il magnesio potenzia fortemente il blocco neuromuscolare.',
        clinicalAdvice: 'Monitorare recupero con TOF.'
      }
    ],
    guidelines: [
      {
        society: 'ERC Resuscitation 2021/2025 & GINA Asthma 2024',
        year: 2021,
        keyRecommendation: 'Magnesio Solfato 2 g EV è il trattamento di prima scelta per la Torsione di Punta ed è fortemente raccomandato come broncodilatatore adiuvante nell\'asma grave refrattario.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Presenza dei riflessi osteotendinei rotulei (se assenti: stop infusione)',
      'Frequenza respiratoria e saturazione SpO2',
      'Pressione arteriosa e telemetria ECG',
      'Diuresi oraria (necessaria >= 25-30 ml/h per eliminare il magnesio)'
    ],
    antidote: 'Calcio Cloruro o Gluconato 10% (1 g EV lento antagonizza istantaneamente la tossicità)',
    isHighAlert: false
  },
  {
    id: 'glucagone',
    name: 'Glucagone',
    brandNames: ['GlucaGen HypoKit'],
    drugClass: 'Antidoti specifici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Intossicazioni & Antidoti', 'Shock & Ipotensione'],
    quickSummary: 'Ormone polipeptidico con azione inotropa e cronotropa cardiaca indipendente dai recettori adrenergici. Antidoto di prima linea nel sovradosaggio acuto e shock da Beta-bloccanti o Calcio-antagonisti refrattario alle catecolamine, e trattamento dell\'ipoglicemia severa senza accesso venoso.',
    mechanismOfAction: 'Si lega a recettori specifici del glucagone sui miociti stimolando direttamente la subunità Gs e l\'adenilato ciclasi senza passare attraverso i recettori beta-adrenergici bloccati: aumento di cAMP intracellulare, aumento della frequenza cardiaca e della contrattilità miocardica. Stimola inoltre la glicogenolisi epatica.',
    dosages: [
      {
        indication: 'Tossicità / Overdose Grave da Beta-Bloccanti o Calcio-Antagonisti con Shock e Bradicardia Refrattaria',
        bolusDose: 'Bolo iniziale: 5 - 10 mg EV lenti in 2 minuti. Se risposta emodinamica positiva dopo 10-15 minuti: avviare infusione continua alla velocità di 2 - 5 mg/h (o dose oraria pari al bolo efficace).',
        preparation: 'Flaconi polvere da 1 mg con solvente. Ricostituire più flaconi (5-10 mg) e somministrare in bolo EV.',
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'Se efficace la pressione e la frequenza aumentano entro 5 minuti. Effetto collaterale frequente: vomito profuso (garantire pervietà vie aeree e pretrattare con antiemetico Ondansetron).'
      },
      {
        indication: 'Ipoglicemia Grave con Coma/Convulsioni in assenza di accesso venoso periferico',
        bolusDose: '1 mg (1 flacone) INTRAMUSCOLO o sottocute.',
        preparation: 'Flacone pronto 1 mg ricostituito con la siringa preriempita annessa.',
        route: ['IM', 'SC'],
        clinicalTips: 'Richiede riserve epatiche di glicogeno integre: inefficace nel digiuno prolungato o nel cirrotico scompensato (in tal caso reperire accesso venoso per Glucosata 33%).'
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
      childPughB: 'Nell\'ipoglicemia l\'effetto glicemizzante può essere ridotto per deplezione di glicogeno; nell\'overdose da beta-bloccanti l\'effetto inotropo cardiaco resta preservato.',
      childPughC: 'Come sopra.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Vomito incoercibile e rischio inalazione (ab ingestis)',
        description: 'La stimolazione ad alte dosi induce nausea e vomito profuso in oltre il 50% dei pazienti. Proteggere le vie aeree nel paziente soporoso.',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Iperglicemia seguita da ipoglicemia rebound',
        description: 'La massiccia stimolazione pancreatica di insulina può determinare una marcata ipoglicemia secondaria da rimbalzo dopo qualche ora.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti',
        severity: 'moderate',
        mechanism: 'Scopo terapeutico antidotico: bypassa il blocco recettoriale.',
        clinicalAdvice: 'Monitorare la risposta emodinamica.'
      }
    ],
    guidelines: [
      {
        society: 'EAPCCT / AHA Toxicology Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Glucagone EV (5-10 mg bolo seguito da infusione) è raccomandato come terapia di prima linea nell\'avvelenamento da beta-bloccanti sintomatico refrattario alle catecolamine.',
        evidenceLevel: 'Classe I, Livello B'
      }
    ],
    monitoring: [
      'Pressione arteriosa continua e telemetria ECG',
      'Glicemia oraria (sorveglianza iperglicemia e ipoglicemia secondaria)',
      'Protezione delle vie aeree da vomito'
    ],
    isHighAlert: false
  },
  {
    id: 'soluzione-ipertonica-3',
    name: 'Soluzione Ipertonica NaCl 3%',
    brandNames: ['Sodio Cloruro 3% Sacche/Flaconi'],
    drugClass: 'Soluzioni osmotiche & Cristalloidi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Emergenze Metaboliche & Disionie', 'Convulsioni & Neurologia d\'Urgenza'],
    quickSummary: 'Soluzione osmotica ipertonica (513 mEq/L di Na+ e Cl-, osmolarità 1026 mOsm/L). Trattamento salvavita d\'emergenza per l\'edema cerebrale acuto con ipertensione endocranica / erniazione e per l\'iponatriemia severa acuta sintomatica con coma o convulsioni.',
    mechanismOfAction: 'Crea un forte gradiente osmotico transendoteliale richiamando rapidamente acqua libera dal compartimento parenchimale cerebrale edematoso verso il torrente circolatorio intravascolare, abbattendo la pressione intracranica (ICP) e aumentando la pressione di perfusione cerebrale (CPP). Nel trattamento dell\'iponatriemia acuta ripristina rapidamente la natriemia prevenendo l\'edema cellulare cerebrale.',
    dosages: [
      {
        indication: 'Ipertensione Endocranica Severa Acuta / Erniazione Transtentoriale Imminente (Midriasi anisocorica, decerebrazione)',
        bolusDose: 'Bolo rapido di 150 - 250 ml di NaCl 3% EV infusi in 15-20 minuti (oppure bolo da 2-3 ml/kg). Ripetibile dopo 20 minuti se la risposta clinica o pupillare è incompleta.',
        preparation: 'Sacca o flacone pronto da 250 ml o 500 ml al 3%. Infondere preferibilmente via Catetere Venoso Centrale (CVC) per elevata osmolarità; in emergenza vitale è consentita via periferica di grosso calibro.',
        route: ['EV rapido'],
        clinicalTips: 'Spesso preferita al Mannitolo nel paziente politraumatizzato o ipoteso perché espande il volume intravascolare e sostiene la pressione arteriosa media anziché indurre diuresi osmotica spinta.'
      },
      {
        indication: 'Iponatriemia Severa Acuta Sintomatica (Na+ < 120 mEq/L con convulsioni, coma o stato confusionale acuto)',
        bolusDose: 'Bolo di 100 - 150 ml di NaCl 3% EV infusi in 10-20 minuti. Ripetibile fino a 2 volte ad intervalli di 20 minuti fino alla cessazione delle convulsioni o aumento del sodio di 4-6 mEq/L.',
        preparation: '150 ml NaCl 3% in pompa o deflussore rapido.',
        route: ['EV rapido'],
        clinicalTips: 'TARGET DI SICUREZZA: aumentare la natriemia di 4-6 mEq/L nelle prime ore per arrestare i sintomi neurologici letali. TASSATIVO: NON superare un incremento di 8 - 10 mEq/L nelle prime 24 ore per evitare la Mielinolisi Pontina Centrale (Sindrome da Demielinizzazione Osmotica ODS)!'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard guidata da natriemia e ICP.',
      crclModerate: 'Monitorare volemia e apporto di sodio.',
      crclSevere: 'Attenzione al sovraccarico idro-salino e ipertensione polmonare acuta.',
      dialysis: 'L\'emodialisi con bagno a sodio controllato è indicata se grave insufficienza anurica concomitante.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Monitorare ritenzione sodica e ascite.',
      childPughC: 'Nei cirrotici con iponatriemia cronica diluizionale il rischio di mielinolisi pontina è elevatissimo: correggere solo se sintomi neurologici acuti con target strettissimo (< 4-6 mEq/die).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'RISCHIO MIELINOLISI PONTINA CENTRALE (ODS) DA CORREZIONE TROPPO RAPIDA',
        description: 'La correzione eccessivamente veloce della natriemia (> 8-10 mEq/L nelle prime 24 ore o > 18 mEq/L nelle 48 ore) in iponatriemie croniche provoca disidratazione oligodendrocitaria irreversibile con tetraparesi spastica permanente, paralisi bulbare (locked-in syndrome) e decesso!',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Flebiti da Iperosmolarità e Richiesta CVC',
        description: 'L\'osmolarità elevata (1026 mOsm/L) può indurre tromboflebiti chimiche in vene periferiche di piccolo calibro. Infondere via CVC o vene di calibro ampio (fossa antecubitale).',
        requiresCVC: true,
        extravasationRisk: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Diuretici dell\'ansa (Furosemide)',
        severity: 'moderate',
        mechanism: 'Furosemide favorisce la perdita di acqua libera aumentando la natriemia.',
        clinicalAdvice: 'Monitorare frequentemente gli ioni ematici.'
      }
    ],
    guidelines: [
      {
        society: 'European Society of Endocrinology & Neurocritical Care 2024',
        year: 2024,
        keyRecommendation: 'Bolo di 150 ml di NaCl 3% EV in 20 minuti ripetibile fino a 2 volte è il trattamento salvavita raccomandato per iponatriemia con sintomi neurologici gravi (convulsioni/coma) con target di incremento di 5 mmol/L nelle prime ore.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Sodio, potassio e cloro sierici ogni 2 ore durante la fase acuta',
      'Esame neurologico seriato (GCS, pupille, riflessi)',
      'Pressione arteriosa e pressione venosa centrale',
      'Bilancio idrico e diuresi oraria'
    ],
    isHighAlert: true
  }
];

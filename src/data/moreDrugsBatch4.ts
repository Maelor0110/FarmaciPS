import { EmergencyDrug } from '../types/pharmacy';

export const ADDITIONAL_EMERGENCY_DRUGS_BATCH_4: Omit<EmergencyDrug, 'pregnancy'>[] = [
  // ==========================================
  // VERTIGINI & SINDROMI VESTIBOLARI
  // ==========================================
  {
    id: 'levosulpiride',
    name: 'Levosulpiride',
    brandNames: ['Levopraid', 'Levosulpiride Fiale'],
    drugClass: 'Antiemetici & Antivertiginosi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Vertigini & Sindromi Vestibolari'],
    quickSummary: 'Antagonista dopaminergico D2 selettivo ad azione periferica e centrale con attività procinetica e sedativo-vestibolare. Molto utilizzato in pronto soccorso e degenza per vertigini acute, sindromi menieriformi e nausea/vomito incoercibile associato.',
    mechanismOfAction: 'Blocco dei recettori dopaminergici D2 a livello dell\'area postrema (chemoreceptor trigger zone) e dei nuclei vestibolari del troncoencefalo; contemporaneo agonismo parziale 5-HT4 periferico con stimolazione della motilità gastroduodenale.',
    dosages: [
      {
        indication: 'Sindrome Vertiginosa Acuta / Nausea e Vomito incoercibile da vertigine',
        bolusDose: '25 mg (1 fiala da 25 mg/2 ml) IM oppure EV lenta in 10-20 ml SF in 2-3 minuti.',
        maintenanceDose: '25 mg ogni 8-12 ore (max 75-100 mg/die) fino a compenso della sintomatologia acuta.',
        preparation: 'Fiale da 25 mg/2 ml iniettabili IM o EV lenta.',
        route: ['IM', 'EV lento', 'Sublinguale'],
        clinicalTips: 'Se assunta per os al domicilio nei giorni successivi: 25 mg 3 volte al giorno prima dei pasti. Monitorare la comparsa di sedazione o galattorrea/iperprolattinemia in trattamenti prolungati.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard 25 mg.',
      crclModerate: 'CrCl 30-50 ml/min: ridurre la dose del 25-50% o allungare l\'intervallo a 12 ore.',
      crclSevere: 'CrCl < 30 ml/min: ridurre la dose a 12.5-25 mg/die (eliminazione prevalentemente renale per il 70%).',
      dialysis: 'Dose minima; monitorare accumulo neurolettico. Scarsamente dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard con monitoraggio.',
      childPughC: 'Metabolismo epatico ridotto, ma escrezione renale prevalente. Usare cautela per rischio sedazione ed encefalopatia.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Reazioni Extrapiramidali e Crisi Distoniche Acute',
        description: 'Possibile comparsa di spasmi muscolari involontari, torcicollo, crisi oculogire o acatisia, specie nei giovani e negli anziani. Trattamento di salvataggio: anticolinergico Biperidene (Akineton) 5 mg EV/IM o Prometazina.',
        isQTC: true
      },
      {
        severity: 'moderate',
        title: 'Prolungamento dell\'intervallo QTc',
        description: 'Può prolungare l\'intervallo QTc se somministrato ad alte dosi o in associazione ad altri farmaci allunganti il QT (es. Amiodarone, Macrolidi, Chinolonici).'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci Anticolinergici (Atropina, Ipratropio)',
        severity: 'moderate',
        mechanism: 'Antagonismo funzionale sulla componente procinetica gastroenterica.',
        clinicalAdvice: 'L\'effetto procinetico viene attenuato.'
      },
      {
        interactingDrug: 'Levodopa / Dopamino-agonisti',
        severity: 'contraindicated',
        mechanism: 'Antagonismo reciproco sui recettori dopaminergici: peggiora gravemente i sintomi extrapiramidali nel morbo di Parkinson.',
        clinicalAdvice: 'Controindicato nei pazienti parkinsoniani; preferire Domperidone o Ondansetron.'
      }
    ],
    guidelines: [
      {
        society: 'Linee Guida Nazionali & Bárány Society Consensus on Vestibular Syndromes',
        year: 2023,
        keyRecommendation: 'I soppressori vestibolari dopaminergici (come levosulpiride o tietilperazina) sono indicati nella fase iperacuta (primi 2-3 giorni) delle sindromi vestibolari acute per controllare i sintomi neurovegetativi invalidanti (vomito, nausea severa).',
        evidenceLevel: 'Grado 2B'
      }
    ],
    monitoring: [
      'Segni extrapiramidali e livello di vigilanza',
      'Pressione arteriosa e frequenza cardiaca',
      'Elettrocardiogramma basale (intervallo QTc)'
    ],
    isHighAlert: false
  },
  {
    id: 'tietilperazina',
    name: 'Tietilperazina',
    brandNames: ['Torecan'],
    drugClass: 'Antiemetici & Antivertiginosi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Vertigini & Sindromi Vestibolari'],
    quickSummary: 'Derivato fenotiazinico piperazinico specifico per il trattamento sintomatico acuto di vertigini di origine periferica/centrale e vomito grave non controllabile in pronto soccorso e medicina d\'urgenza.',
    mechanismOfAction: 'Inibisce l\'attivazione della zona trigger chemocettrice bulbare (CTZ) e i centri emetici bulbari mediante blocco dei recettori D2, H1 istaminergici e recettori muscarinici centrali connessi ai nuclei vestibolari.',
    dosages: [
      {
        indication: 'Crisi Vertiginosa Acuta / Vomito incoercibile refrattario',
        bolusDose: '6.5 mg (1 fiala da 6.5 mg/1 ml) IM profonda o EV lenta (diluita in 10 ml SF in almeno 3-5 minuti).',
        maintenanceDose: '6.5 mg ogni 8-12 ore al bisogno (max 19.5 mg/die = 3 somministrazioni).',
        preparation: 'Fiale da 6.5 mg/1 ml. Somministrare preferibilmente per via IM profonda nel gluteo o EV molto lenta.',
        route: ['IM', 'EV lento', 'Sublinguale'],
        clinicalTips: 'L\'iniezione endovenosa diretta rapida può causare brusca ipotensione ortostatica: il paziente deve rimanere supino durante e per almeno 30 minuti dopo l\'infusione.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard 6.5 mg.',
      crclModerate: 'Nessun aggiustamento di rilievo per dosi singole in acuto.',
      crclSevere: 'Ridurre la frequenza a 6.5 mg ogni 12-24h per rischio aumentato di sedazione ed effetti extrapiramidali.',
      dialysis: 'Non dializzabile. Dose ridotta.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50% (metabolismo epatico esteso).',
      childPughC: 'Controindicato o usare con estrema cautela per rischio di coma epatico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Ipotensione Ortostatica e Sedazione Marcata',
        description: 'L\'attività alfa-1 bloccante centrale e periferica può scatenare caduta pressoria severa e lipotimia, specialmente se iniettato rapidamente per via endovenosa.',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Distonie e Sintomi Extrapiramidali',
        description: 'Fenotiazina a rischio di spasmi cervicali acuti, protrusione linguale e parkinsonismo iatrogeno.',
        isQTC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci deprimenti del SNC (Benzodiazepine, Oppioidi, Alcol)',
        severity: 'major',
        mechanism: 'Effetto deprimente centrale additivo con sedazione profonda e depressione respiratoria.',
        clinicalAdvice: 'Monitorare la vigilanza respiratoria.'
      },
      {
        interactingDrug: 'Anti-ipertensivi',
        severity: 'moderate',
        mechanism: 'Potenziamento dell\'ipotensione ortostatica.',
        clinicalAdvice: 'Paziente tassativamente a letto.'
      }
    ],
    guidelines: [
      {
        society: 'Bárány Society & Emergency Medicine Vestibular Protocols',
        year: 2023,
        keyRecommendation: 'Tietilperazina è un presidio efficace per la soppressione sintomatica del riflesso emetico-vestibolare nella neurite vestibolare acuta o labirintite acuta nelle prime 48 ore.',
        evidenceLevel: 'Grado 2C'
      }
    ],
    monitoring: [
      'Pressione arteriosa clino- ed ortostatica',
      'Comparsa di reazioni distoniche acute extrapiramidali',
      'Monitoraggio saturimetria e stato di vigilanza'
    ],
    isHighAlert: false
  },
  {
    id: 'dimenidrinato',
    name: 'Dimenidrinato',
    brandNames: ['Valontan', 'Travelgum', 'Xamamina'],
    drugClass: 'Antiemetici & Antivertiginosi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Vertigini & Sindromi Vestibolari'],
    quickSummary: 'Complesso equimolare di difenidramina e 8-cloroteofillina. Antistaminico H1 di prima generazione ad intensa azione anticolinergica e sedativa vestibolare, raccomandato per cinetosi, vertigini periferiche e sindrome di Menière.',
    mechanismOfAction: 'Blocco competitivo dei recettori H1 e dei recettori colinergici muscarinici centrali nei nuclei vestibolari dell\'orecchio interno e nella sostanza reticolare, sopprimendo la stimolazione vestibolare asimmetrica.',
    dosages: [
      {
        indication: 'Crisi Vertiginosa Periferica Acuta / Cinetosi Grave',
        bolusDose: '50 - 100 mg IM profonda o EV lenta (fiala da 50 mg o 100 mg diluita in 20-50 ml SF infusa in 5-10 minuti).',
        maintenanceDose: '50 mg ogni 6-8 ore al bisogno (max 300 mg/die nell\'adulto).',
        preparation: 'Fiale iniettabili da 50 mg o 100 mg. Diluire sempre per somministrazione EV.',
        route: ['IM', 'EV lento', 'Sublinguale'],
        clinicalTips: 'Non associare ad altri farmaci con proprietà sedative o anticolinergiche marcate.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Intervallo ogni 8-12 ore.',
      crclSevere: 'Intervallo ogni 12-24 ore (metaboliti escreti per via renale).',
      dialysis: 'Dose ridotta.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Metabolismo epatico esteso. Usare con cautela; rischio sedazione profonda.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Effetti Anticolinergici Centrali e Periferici',
        description: 'Rischio di ritenzione acuta d\'urina (specie in ipertrofia prostatica), midriasi con aumento della pressione intraoculare (glaucoma ad angolo stretto), secchezza delle fauci e stipsi.',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Sonnolenza spiccata e rallentamento dei riflessi',
        description: 'Forte componente sedativa centrale; controindicata la guida o l\'uso di macchinari.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Antibiotici Aminoglicosidici (Gentamicina, Amikacina)',
        severity: 'major',
        mechanism: 'Il dimenidrinato può mascherare i sintomi precoci di ototossicità vestibolare indotta da aminoglicosidi fino a lesione irreversibile.',
        clinicalAdvice: 'Monitorare con attenzione la funzione uditiva e vestibolare.'
      }
    ],
    guidelines: [
      {
        society: 'American Academy of Otolaryngology-Head and Neck Surgery (AAO-HNS)',
        year: 2022,
        keyRecommendation: 'Antistaminici/anticolinergici come il dimenidrinato sono raccomandati per il controllo a breve termine dei sintomi acuti delle crisi vertiginose e cinetosi.',
        evidenceLevel: 'Grado B'
      }
    ],
    monitoring: [
      'Stato di coscienza e vigilanza',
      'Diuresi e svuotamento vescicale (specialmente nei pazienti maschi anziani)',
      'Pressione arteriosa'
    ],
    isHighAlert: false
  },
  {
    id: 'betaistina',
    name: 'Betaistina Dicloridrato',
    brandNames: ['Microser', 'Betaserc', 'Vertiserc'],
    drugClass: 'Antiemetici & Antivertiginosi',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Vertigini & Sindromi Vestibolari'],
    quickSummary: 'Analogo dell\'istamina per il trattamento della Malattia di Menière e delle sindromi vertiginose periferiche ricorrenti caratterizzate da vertigini, acufeni e perdita d\'udito.',
    mechanismOfAction: 'Agonista debole dei recettori H1 e potente antagonista dei recettori H3 presinaptici: aumenta il rilascio di istamina nel microcircolo cocleare e vestibolare, migliorando la perfusione vascolare della stria vascolare e riducendo la pressione endolinfatica (idrope).',
    dosages: [
      {
        indication: 'Sindrome o Malattia di Menière / Vertigini Periferiche Ricorrenti',
        maintenanceDose: '16 - 24 mg per os due volte al giorno (totale 32-48 mg/die) ai pasti.',
        preparation: 'Compresse da 8 mg, 16 mg e 24 mg.',
        route: ['Sublinguale'],
        clinicalTips: 'Non è un soppressore vestibolare acuto immediato, ma favorisce il compenso vestibolare e la profilassi delle recidive di idrope.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Nessun dato di accumulo tossico; dose standard tollerata.',
      dialysis: 'Dose standard.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard.',
      childPughC: 'Metabolismo epatico via MAO; usare con cautela.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'moderate',
        title: 'Asma Bronchiale e Ulcera Peptica Attiva',
        description: 'A causa dell\'attività istaminergica H1, può scatenare broncospasmo in soggetti asmatici o ipersecrezione acida gastrica. Monitorare i pazienti asmatici durante la terapia.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Antistaminici H1 sistemici',
        severity: 'major',
        mechanism: 'Antagonismo competitivo reciproco sui recettori H1: si annullano gli effetti.',
        clinicalAdvice: 'Non associare a dimenidrinato o altri antistaminici H1.'
      }
    ],
    guidelines: [
      {
        society: 'European Academy of Otology and Neuro-Otology (EAONO) / Bárány Society',
        year: 2022,
        keyRecommendation: 'Betaistina ad alto dosaggio (fino a 48 mg/die) è raccomandata nella prevenzione delle crisi e nel trattamento a medio termine della malattia di Menière con evidenza di idrope.',
        evidenceLevel: 'Classe IIa, Livello B'
      }
    ],
    monitoring: [
      'Tolleranza gastrica',
      'Funzionalità respiratoria nei pazienti asmatici anamnestici'
    ],
    isHighAlert: false
  },

  // ==========================================
  // ANSIA ACUTA & ATTACCHI DI PANICO
  // ==========================================
  {
    id: 'alprazolam',
    name: 'Alprazolam',
    brandNames: ['Xanax', 'Frontal'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Ansia Acuta & Attacchi di Panico'],
    quickSummary: 'Triazolobenzodiazepina ad alta potenza con assorbimento sublinguale/orale rapidissimo (10-15 minuti). Farmaco d\'elezione per la risoluzione rapida dell\'attacco di panico acuto in Pronto Soccorso.',
    mechanismOfAction: 'Potenziamento allosterico del recettore GABA-A, con aumento della frequenza di apertura dei canali al cloro, iperpolarizzazione neuronale nel sistema limbico e rapida soppressione dell\'iperattività adrenergica da panico.',
    dosages: [
      {
        indication: 'Attacco di Panico Acuto / Crisi d\'Ansia Acuta Grave',
        bolusDose: '0.5 - 1.0 mg sublinguale (lasciare sciogliere sotto la lingua) o gocce orali (10-20 gocce = 0.25-0.5 mg). Ripetibile dopo 30-45 minuti se persiste ansia invalidante.',
        preparation: 'Compresse divisibili da 0.5 mg o 1.0 mg, compresse sublinguali o gocce orali (0.75 mg/ml, 1 ml = 30 gocce).',
        route: ['Sublinguale'],
        clinicalTips: 'L\'assunzione sublinguale evita il metabolismo di primo passaggio epatico fornendo un picco ematico molto più rapido rispetto alla deglutizione gastrica.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 50% per ridotta eliminazione e aumentata sensibilità recettoriale.',
      dialysis: 'Dose minima. Non dializzabile (alto legame proteico 80%).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard (0.25 - 0.5 mg).',
      childPughB: 'Ridurre dose del 50%.',
      childPughC: 'Controindicato: grave ritardo di clearance via CYP3A4 con rischio di precipitazione di encefalopatia epatica.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Dipendenza e Tolleranza Rapida',
        description: 'La brevissima emivita e l\'elevata potenza determinano elevato rischio di tolleranza, ansia rimbalzo tra le dosi e dipendenza psichica/fisica. Limitare l\'impiego in acuto in Pronto Soccorso ed evitare prescrizioni croniche non controllate.',
        isQTC: false
      },
      {
        severity: 'high',
        title: 'Depressione Respiratoria in co-somministrazione',
        description: 'Rischio di arresto respiratorio se associato ad oppioidi, ipnotici o alcol acuto.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Inibitori potenti di CYP3A4 (Ketoconazolo, Claritromicina)',
        severity: 'contraindicated',
        mechanism: 'Marcato blocco del metabolismo con incremento dei livelli plasmatici di 3-4 volte e sedazione prolungata.',
        clinicalAdvice: 'Evitare la combinazione.'
      },
      {
        interactingDrug: 'Oppioidi (Morfina, Fentanil, Ossicodone)',
        severity: 'major',
        mechanism: 'Sinergismo di depressione respiratoria fatale e coma.',
        clinicalAdvice: 'Monitoraggio saturimetrico continuo.'
      }
    ],
    guidelines: [
      {
        society: 'APA / NICE Guidelines for Panic Disorder & Emergency Psychiatry',
        year: 2023,
        keyRecommendation: 'Le benzodiazepine ad azione rapida come alprazolam o lorazepam sono raccomandate solo per il controllo a breve termine delle crisi di panico acute severe in pronto soccorso.',
        evidenceLevel: 'Grado 1B'
      }
    ],
    monitoring: [
      'Frequenza respiratoria e saturazione SpO2',
      'Livello di sedazione (Scala RASS)',
      'Pressione arteriosa'
    ],
    antidote: 'Flumazenil',
    isHighAlert: false
  },
  {
    id: 'idrossizina',
    name: 'Idrossizina Dicloridrato',
    brandNames: ['Atarax'],
    drugClass: 'Antistaminici & Antiallergici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Ansia Acuta & Attacchi di Panico', 'Reazioni Allergiche & Anafilassi'],
    quickSummary: 'Antistaminico H1 di prima generazione con spiccata attività ansiolitica e sedativa centrale non-benzodiazepinica. Ottima alternativa per l\'ansia acuta e il prurito allergico in pazienti a rischio di abuso di benzodiazepine o con broncopneumopatie.',
    mechanismOfAction: 'Antagonista inverso dei recettori H1 e antagonista dei recettori 5-HT2A della serotonina nel sistema nervoso centrale, producendo ansiolisi, sedazione e rilassamento muscolare senza creare dipendenza fisica o tolleranza recettoriale.',
    dosages: [
      {
        indication: 'Ansia Acuta / Stato di Tensione Psicomotoria Senza Rischio di Dipendenza',
        bolusDose: '25 - 50 mg per os (compresse o sciroppo). Ripetibile dopo 6-8 ore (max 100 mg/die nell\'adulto; max 50 mg nell\'anziano).',
        preparation: 'Compresse divisibili da 25 mg o sciroppo 2 mg/ml.',
        route: ['Sublinguale'],
        clinicalTips: 'Effetto ansiolitico percepibile in 15-30 minuti; emivita di circa 14-20 ore. Non induce dipendenza.'
      },
      {
        indication: 'Orticaria Acuta Pruriginosa / Prurito Reattivo Allergico',
        bolusDose: '25 mg alla sera o 25 mg 2 volte al giorno.',
        preparation: 'Compresse da 25 mg.',
        route: ['Sublinguale'],
        clinicalTips: 'Potente effetto antipruriginoso e sedativo per favorire il riposo notturno.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'CrCl 30-50 ml/min: ridurre la dose del 50%.',
      crclSevere: 'CrCl < 30 ml/min: ridurre la dose del 50% e monitorare per accumulo del metabolita attivo cetirizina.',
      dialysis: 'Dose ridotta del 50%. Non eliminabile con dialisi.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Ridurre la dose del 33%.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Metabolismo epatico esteso ad opera di alcol deidrogenasi e CYP. Dimezzare dose o evitare.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'Allungamento del QTc e Aritmie Ventricolari (TdP)',
        description: 'EMA Warning: Idrossizina blocca i canali hERG del potassio e prolunga l\'intervallo QTc. Non superare mai la dose massima di 100 mg/die nell\'adulto (50 mg/die nell\'anziano). Controindicato nei pazienti con prolungamento congenito o acquisito del QT o che assumono farmaci allunganti il QT.',
        isQTC: true
      }
    ],
    interactions: [
      {
        interactingDrug: 'Farmaci che prolungano il QT (Amiodarone, Aloperidolo, Macrolidi, Chinolonici)',
        severity: 'contraindicated',
        mechanism: 'Effetto additivo sul prolungamento del QTc con rischio di Torsione di Punta e arresto cardiaco.',
        clinicalAdvice: 'Combinazione rigorosamente controindicata.'
      }
    ],
    guidelines: [
      {
        society: 'EMA Safety Committee (PRAC) & WFSBP Guidelines for Anxiety Disorders',
        year: 2023,
        keyRecommendation: 'Idrossizina è una valida opzione di seconda linea per l\'ansia acuta generalizzata in pazienti non candidabili a benzodiazepine, purché venga rispettato il tetto posologico e lo screening del QTc.',
        evidenceLevel: 'Grado 2A'
      }
    ],
    monitoring: [
      'ECG basale (QTc pre-trattamento)',
      'Elettroliti serici (potassio, magnesio)',
      'Grado di sedazione'
    ],
    isHighAlert: false
  },
  {
    id: 'delorazepam',
    name: 'Delorazepam',
    brandNames: ['En'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Ansia Acuta & Attacchi di Panico'],
    quickSummary: 'Benzodiazepina ad emivita prolungata (60-140 ore) ad elevata azione ansiolitica e debole sedazione residua. Ideale per la stabilizzazione dell\'ansia acuta prolungata e la prevenzione del rimbalzo sintomatico.',
    mechanismOfAction: 'Modulazione allosterica positiva dei recettori GABA-A nel sistema nervoso centrale, potenziando l\'azione inibitoria del GABA e riducendo l\'ipereccitabilità dei circuiti talamo-corticali ed amigdaloidei.',
    dosages: [
      {
        indication: 'Crisi d\'Ansia Acuta / Agitazione Ansiosa in Reparto o PS',
        bolusDose: '1 - 2 mg (13 - 26 gocce orali della soluzione 1 mg/ml) per os o sublinguale. In alternativa fiala da 1 mg IM o EV molto lenta in urgenza.',
        maintenanceDose: '0.5 - 1 mg 2-3 volte al giorno se necessario.',
        preparation: 'Gocce orali 1 mg/ml (1 ml = 26 gocce) o fiale da 1 mg/1 ml.',
        route: ['Sublinguale', 'IM', 'EV lento'],
        clinicalTips: 'Grazie alla lunga emivita protegge dall\'ansia rimbalzo tipica delle benzodiazepine a brevissima emivita.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 50% per accumulo prolungato dei metaboliti attivi.',
      dialysis: 'Dose ridotta. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre dose del 50%.',
      childPughC: 'Controindicato: metabolismo epatico ossidativo prolungato con grave rischio di coma epatico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Accumulo e Sedazione Residua nell\'Anziano',
        description: 'L\'emivita plasmatica molto lunga (oltre 100 ore nei soggetti anziani) comporta elevato rischio di accumulo con atassia, confusione mentale, sonnolenza diurna e rischio di cadute/fratture di femore.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Alcool etilico e deprimenti SNC',
        severity: 'major',
        mechanism: 'Potenziamento sinergico degli effetti sedativi ed ipnotici.',
        clinicalAdvice: 'Evitare l\'assunzione concomitante.'
      }
    ],
    guidelines: [
      {
        society: 'Linee Guida Nazionali Farmacologia Clinica & Psichiatria d\'Urgenza',
        year: 2023,
        keyRecommendation: 'Delorazepam è indicato per il trattamento a breve termine degli stati ansiosi acuti accompagnati da tensione somatica e insonnia reattiva.',
        evidenceLevel: 'Grado 1B'
      }
    ],
    monitoring: [
      'Stato di vigilanza ed equilibrio motorio',
      'Pressione arteriosa e frequenza respiratoria'
    ],
    antidote: 'Flumazenil',
    isHighAlert: false
  },

  // ==========================================
  // BPCO RIACUTIZZATA & ASMA ACUTO
  // ==========================================
  {
    id: 'salbutamolo-ipratropio',
    name: 'Salbutamolo + Ipratropio Bromuro',
    brandNames: ['Breva', 'Combivent', 'Ipramol'],
    drugClass: 'Broncodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['BPCO Riacutizzata', 'Asma Acuto'],
    quickSummary: 'Associazione precostituita inalatoria SABA (Salbutamolo) + SAMA (Ipratropio bromuro). Terapia cardine immediata di prima linea per la riacutizzazione di BPCO e per l\'attacco di asma bronchiale grave in Pronto Soccorso.',
    mechanismOfAction: 'Azione sinergica complementare: il Salbutamolo stimola i recettori beta-2 adrenergici provocando rilassamento diretto della muscolatura liscia bronchiale (effetto immediato entro 5 min); l\'Ipratropio inibisce i recettori muscarinici M3 bloccando il tono colinergico broncocostrittore riflesso e riducendo l\'ipersecrezione mucosa.',
    dosages: [
      {
        indication: 'Riacutizzazione di BPCO (AECOPD) Moderata-Severa',
        bolusDose: '1 fiala monodose (Salbutamolo 2.5 mg + Ipratropio 0.5 mg) nebulizzata con O2 a 6-8 L/min (o aria compressa se ipercapnia). Ripetibile ogni 20-30 minuti per le prime 2-3 dosi nelle prime ore.',
        maintenanceDose: '1 fiala ogni 4-6 ore secondo clinica respiratoria ed emogasanalisi.',
        preparation: 'Flaconcini monodose pronti da 2.5 ml o soluzione da diluire con 2 ml SF nell\'ampolla.',
        route: ['Inalatoria'],
        clinicalTips: 'GOLD 2024: Nella BPCO grave ipercapnica nebulizzare con aria compressa e somministrare O2 in cannule nasali a bassi flussi titolando su SpO2 88-92% per evitare la perdita del drive ipossico respiratorio!'
      },
      {
        indication: 'Asma Bronchiale Acuto Grave (Severe Acute Asthma)',
        bolusDose: 'Salbutamolo 2.5-5 mg + Ipratropio 0.5 mg ogni 20 minuti per 3 dosi nella prima ora di trattamento intensivo in PS.',
        preparation: 'Nebulizzazione con flusso d\'ossigeno a 6-8 L/min.',
        route: ['Inalatoria'],
        clinicalTips: 'GINA 2024: L\'aggiunta precoce di Ipratropio al Salbutamolo riduce del 25% la necessità di ricovero ospedaliero.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Dose standard (assorbimento sistemico minimo).',
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
        severity: 'high',
        title: 'Ipercapnia Acuta da Erogazione con O2 al 100% nella BPCO',
        description: 'La nebulizzazione prolungata guidata da ossigeno puro ad alti flussi nei pazienti con BPCO grave cronica può scatenare rapido peggioramento dell\'ipercapnia e narcosi da CO2 (effetto Haldane e soppressione del drive ipossico). Se il paziente è ipercapnico, nebulizzare con compressore ad aria!',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Tachicardia e Ipopotassiemia da Beta-2 stimolazione',
        description: 'Dosi ripetute ravvicinate inducono ingresso intracellulare di potassio e tachicardia sinusale o tremori muscolari fini. Monitorare il potassio serico all\'EGA.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Beta-bloccanti non cardioselettivi (es. Propranololo, Carvedilolo)',
        severity: 'contraindicated',
        mechanism: 'Antagonismo competitivo diretto sui recettori beta-2 bronchiali che scatena broncospasmo refrattario severo.',
        clinicalAdvice: 'Evitare l\'uso di beta-bloccanti non selettivi negli asmatici e BPCO riacutizzati.'
      }
    ],
    guidelines: [
      {
        society: 'GOLD Report 2024 & GINA Guidelines 2024',
        year: 2024,
        keyRecommendation: 'I broncodilatatori inalatori a breve durata d\'azione combinati (SABA + SAMA: salbutamolo + ipratropio) sono il trattamento iniziale di prima scelta raccomandato per le riacutizzazioni acute di BPCO e asma acuto.',
        evidenceLevel: 'Grado 1A'
      }
    ],
    monitoring: [
      'Emogasanalisi arteriosa (EGA: pH, PaCO2, PaO2, lattati, K+)',
      'Saturazione SpO2 (target 88-92% se BPCO con rischio ritenzione CO2; 93-95% se asma)',
      'Frequenza respiratoria e meccanica dei muscoli accessori'
    ],
    isHighAlert: false
  },
  {
    id: 'aminofillina',
    name: 'Aminofillina',
    brandNames: ['Tefamin', 'Aminofillina Fiale'],
    drugClass: 'Broncodilatatori',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['BPCO Riacutizzata', 'Asma Acuto'],
    quickSummary: 'Complesso solubile di teofillina ed etilendiammina (2:1) per somministrazione endovenosa. Broncodilatatore di seconda/terza linea riservato a casi gravi selezionati di BPCO riacutizzata o asma quasi-fatale non responsivo a dosi massimali di beta-2 agonisti, steroidi e magnesio.',
    mechanismOfAction: 'Inibizione non selettiva delle fosfodiesterasi (PDE III e IV) con aumento dell\'AMPc intracellulare nella muscolatura liscia bronchiale, antagonismo dei recettori cellulari dell\'adenosina (che mediano broncocostrizione), aumento della contrattilità del diaframma e lieve stimolazione del centro respiratorio bulbare.',
    dosages: [
      {
        indication: 'Riacutizzazione Severa di BPCO / Asma Grave Refrattario ai Trattamenti Inalatori',
        bolusDose: 'Dose di carico (solo se il paziente NON assumeva teofillina a domicilio): 5 - 6 mg/kg (circa 240 - 360 mg) infusi lentamente in 100-250 ml di Glucosata 5% in almeno 30-45 minuti.',
        maintenanceDose: '0.4 - 0.7 mg/kg/ora in infusione continua EV titolata sui livelli di teofillinemia (range terapeutico 10-20 mcg/ml, preferibile 8-12 mcg/ml per sicurezza). Ridurre a 0.2-0.3 mg/kg/h nell\'anziano o nello scompensato.',
        preparation: 'Fiale da 240 mg/10 ml (24 mg/ml). Diluire in sacca di G5% o SF.',
        infusionRateCalc: {
          defaultConcentrationMgPerMl: 1.0,
          defaultDilutionText: '240 mg in 250 ml G5% (0.96 mg/ml)',
          unit: 'mg/kg/h',
          minRate: 0.2,
          maxRate: 0.9,
          defaultRate: 0.5,
          step: 0.1
        },
        route: ['EV lento', 'Infusione continua'],
        clinicalTips: 'MAI somministrare in bolo rapido: rischio immediato di arresto cardiaco da fibrillazione ventricolare o convulsioni fatali!'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 25% (metabolismo epatico al 90%, ma i metaboliti attivi possono accumularsi).',
      dialysis: 'Eliminabile con emodialisi ed emoperfusione (utilizzabile nel sovradosaggio grave).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Ridurre la dose del 25%.',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'Metabolismo epatico quasi totale (CYP1A2). Clearance drasticamente diminuita: ridurre la dose del 50-70% con monitoraggio della teofillinemia.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'INDICE TERAPEUTICO STRETTO, ARITMIE VENTRICOLARI E CONVULSIONI',
        description: 'La teofillina ha una finestra terapeutica strettissima (10-20 mcg/ml). Livelli superiori a 20-25 mcg/ml causano tachiaritmie ventricolari maligne fatali, ipotensione grave e stato di male epilettico refrattario. Il bolo rapido endovenoso è assolutamente proibito!',
        isQTC: true
      },
      {
        severity: 'high',
        title: 'Attenzione alle interazioni con Macrolidi e Chinolonici',
        description: 'Ciprofloxacina ed eritromicina/claritromicina inibiscono potentemente il CYP1A2 raddoppiando i livelli plasmatici di teofillina entro 24-48 ore con tossicità letale.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Chinolonici (Ciprofloxacina) e Macrolidi (Claritromicina)',
        severity: 'contraindicated',
        mechanism: 'Inibizione del CYP1A2 con crollo della clearance di teofillina.',
        clinicalAdvice: 'Dimezzare la dose di aminofillina e monitorare la teofillinemia.'
      }
    ],
    guidelines: [
      {
        society: 'GOLD 2024 & GINA 2024 Consensus',
        year: 2024,
        keyRecommendation: 'L\'aminofillina EV non è raccomandata come terapia di routine nell\'asma o BPCO a causa del profilo sfavorevole di tossicità ed efficacia modesta rispetto a SABA/SAMA/steroidi sistemici. Rimane un\'opzione eccezionale di salvataggio nei reparti di emergenza.',
        evidenceLevel: 'Classe IIb, Livello B'
      }
    ],
    monitoring: [
      'Telemetria cardiaca continua (sorveglianza aritmie ventricolari)',
      'Dosaggio della teofillinemia plasmatica dopo 12-24 ore',
      'Elettroliti (ipokaliemia, ipomagnesiemia) ed emogasanalisi'
    ],
    isHighAlert: true
  },

  // ==========================================
  // REAZIONI ALLERGICHE & ANAFILASSI
  // ==========================================
  {
    id: 'clorfenamina',
    name: 'Clorfenamina Maleato',
    brandNames: ['Trimeton'],
    drugClass: 'Antistaminici & Antiallergici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Reazioni Allergiche & Anafilassi'],
    quickSummary: 'Antistaminico anti-H1 parenterale di riferimento in Pronto Soccorso. Indicato per orticaria acuta, angioedema non ereditario e come terapia adiuvante di seconda linea nell\'anafilassi (SEMPRE DOPO l\'Adrenalina IM).',
    mechanismOfAction: 'Antagonista competitivo reversibile dei recettori H1 dell\'istamina: blocca l\'aumento della permeabilità vascolare, il flushing, il prurito e l\'edema tissutale scatenati dal rilascio massivo di istamina mastocitaria.',
    dosages: [
      {
        indication: 'Reazione Allergica Acuta Sistemica / Orticaria Grave / Angioedema',
        bolusDose: '10 mg (1 fiala da 10 mg/1 ml) EV lenta in almeno 2-3 minuti o IM profonda.',
        maintenanceDose: '10 mg ogni 8-12 ore al bisogno (max 40 mg/die nell\'adulto).',
        preparation: 'Fiala da 10 mg/1 ml pronta all\'uso. Per somministrazione EV lenta aspirare e diluire in 10 ml di SF.',
        route: ['EV lento', 'IM'],
        clinicalTips: 'NON somministrare in bolo rapido: può provocare ipotensione transitoria o stimolazione paradossa del SNC. Nell\'anafilassi NON deve ritardare la somministrazione di Adrenalina IM!'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 25-50% o distanziare le somministrazioni a ogni 12-24h.',
      dialysis: 'Dose minima. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre dose del 50%.',
      childPughC: 'Metabolismo epatico esteso. Ridurre la dose; rischio di sedazione marcata ed encefalopatia.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Non sostituisce l\'Adrenalina nell\'Anafilassi!',
        description: 'EAACI & ERC Warning: Gli antistaminici H1 agiscono solo sui sintomi cutanei (prurito, pomfi) e NON contrastano il broncospasmo né lo shock o l\'edema laringeo da anafilassi. L\'adrenalina IM 0.5 mg è l\'unico farmaco salvavita tempo-dipendente!',
        isQTC: false
      },
      {
        severity: 'moderate',
        title: 'Sedazione marcata ed effetti anticolinergici',
        description: 'Attraversa la barriera emato-encefalica causando sonnolenza; cautela in pazienti con ritenzione urinaria o glaucoma.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Sedativi del SNC e Alcool',
        severity: 'major',
        mechanism: 'Effetto deprimente sinergico sul SNC con sedazione profonda.',
        clinicalAdvice: 'Monitorare la vigilanza.'
      }
    ],
    guidelines: [
      {
        society: 'EAACI (European Academy of Allergy and Clinical Immunology) 2022',
        year: 2022,
        keyRecommendation: 'Gli antistaminici anti-H1 come clorfenamina 10 mg EV/IM sono considerati terapia di supporto di seconda linea per alleviare i sintomi muco-cutanei, ma non devono mai ritardare l\'adrenalina IM tempestiva.',
        evidenceLevel: 'Grado 2A'
      }
    ],
    monitoring: [
      'Pressione arteriosa (sorveglianza ipotensione da vasodilatazione se EV rapido)',
      'Segni di ostruzione delle vie aeree superiori (stridore, disfonia)',
      'Stato di vigilanza'
    ],
    isHighAlert: false
  },
  {
    id: 'prometazina',
    name: 'Prometazina Cloridrato',
    brandNames: ['Fenergan'],
    drugClass: 'Antistaminici & Antiallergici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Reazioni Allergiche & Anafilassi', 'Vertigini & Sindromi Vestibolari'],
    quickSummary: 'Antistaminico fenotiazinico ad altissima potenza antiallergica, antiemetica e sedativa. Utilizzato in reazioni allergiche acute con grave prurito, cinetosi grave ed agitazione reattiva associata.',
    mechanismOfAction: 'Potente antagonismo competitivo dei recettori H1 periferici e centrali, associato ad azione anticolinergica muscarinica, debole antagonismo dopaminergico ed alfa-1 adrenergico.',
    dosages: [
      {
        indication: 'Reazioni Allergiche Acute Gravi / Orticaria Acuta Resistente',
        bolusDose: '25 - 50 mg (1 o 2 fiale da 25 mg/1 ml o 50 mg/2 ml) preferibilmente per via INTRAMUSCOLARE profonda.',
        maintenanceDose: '25 mg ogni 8-12 ore al bisogno.',
        preparation: 'Fiale da 50 mg/2 ml (25 mg/ml). ATTENZIONE: La somministrazione EV è ad altissimo rischio di necrosi tissutale da stravaso; se assolutamente necessaria la via EV, diluire in almeno 50-100 ml di SF ed infondere a goccia lenta in vena di grosso calibro.',
        route: ['IM', 'EV lento'],
        clinicalTips: 'Preferire tassativamente la somministrazione IM profonda nel quadrante supero-esterno del gluteo.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 50% per aumentata suscettibilità alla sedazione.',
      dialysis: 'Dose ridotta. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Ridurre dose del 50%.',
      childPughC: 'Controindicato per rischio di precipitare coma epatico (metabolismo epatico esteso).',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'black_box',
        title: 'GRAVE DANNO TESSUTALE, GANGRENA E NECROSI DA EXTRAVASO ENDOVENOSO',
        description: 'La prometazina è fortemente irritante per l\'endotelio vascolare. L\'iniezione EV accidentale paravenosa o intra-arteriosa causa grave spasmo arterioso, trombosi, ischemia periferica, fascite necrotizzante e gangrena con necessità di amputazione! Non somministrare mai sottocute o bolo EV diretto rapido!',
        isQTC: true,
        extravasationRisk: true
      },
      {
        severity: 'high',
        title: 'Sedazione Profonda e Ipotensione Ortostatica',
        description: 'Forte depressione del sensorio e ipotensione per blocco alfa-1 adrenergico. Monitorare costantemente la pervietà delle vie aeree.'
      }
    ],
    interactions: [
      {
        interactingDrug: 'Altri farmaci deprimenti del SNC (Oppioidi, Benzodiazepine)',
        severity: 'major',
        mechanism: 'Depressione respiratoria sinergica severa.',
        clinicalAdvice: 'Ridurre drasticamente i dosaggi.'
      }
    ],
    guidelines: [
      {
        society: 'FDA Safety Warning & EAACI Allergy Protocols',
        year: 2023,
        keyRecommendation: 'Prometazina parenterale deve essere iniettata preferibilmente per via IM profonda a causa del rischio documentato di necrosi chimica da stravaso endovenoso.',
        evidenceLevel: 'Black Box Safety Warning'
      }
    ],
    monitoring: [
      'Integrità del sito di iniezione (arrestare immediatamente se compare dolore bruciante)',
      'Pressione arteriosa e stato di vigilanza',
      'Frequenza respiratoria'
    ],
    isHighAlert: true
  },
  {
    id: 'diazepam',
    name: 'Diazepam',
    brandNames: ['Valium', 'Diazepam Fiale / Gocce'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Ansia Acuta & Attacchi di Panico', 'Vertigini & Sindromi Vestibolari', 'Convulsioni & Neurologia d\'Urgenza', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Benzodiazepina classica lipofila ad azione immediata per via endovenosa con marcate proprietà miorilassanti, ansiolitiche, anticonvulsivanti e di soppressione vestibolare. Utilizzata in pronto soccorso per attacchi di panico severi, crisi d\'ansia, vertigini acute vegetative e convulsioni attive.',
    mechanismOfAction: 'Modulatore allosterico positivo ad alta affinità per i recettori GABA-A. Aumenta la frequenza di apertura dei canali del cloro con iperpolarizzazione neuronale nella sostanza reticolare, nel sistema limbico e nei nuclei vestibolari del troncoencefalo.',
    dosages: [
      {
        indication: 'Crisi d\'Ansia Acuta / Attacco di Panico con Agitazione',
        bolusDose: '5 - 10 mg (1/2 o 1 fiala da 10 mg/2 ml) EV lenta in almeno 2-3 minuti oppure per os (10-20 gocce della soluzione 5 mg/ml). Ripetibile dopo 20-30 minuti se necessario.',
        preparation: 'Fiale da 10 mg/2 ml (5 mg/ml). Non diluire in sacche plastiche (adsorbimento); iniettare in vena di buon calibro molto lentamente.',
        route: ['EV lento', 'Sublinguale'],
        clinicalTips: 'L\'iniezione endovenosa rapida è da evitare assolutamente: causa grave apnea riflessa e flebite chimica da glicole propilenico.'
      },
      {
        indication: 'Sindrome Vertiginosa Acuta / Crisi Vestibolare Acuta con Sintomi Vegetativi',
        bolusDose: '2 - 5 mg EV lenta o per os per sedare l\'iperattività dei nuclei vestibolari e alleviare la sensazione rotatoria e la nausea.',
        preparation: 'Fiale da 10 mg o gocce.',
        route: ['EV lento', 'Sublinguale'],
        clinicalTips: 'Limitare l\'uso alle prime 24-48 ore per non ritardare il compenso vestibolare centrale.'
      },
      {
        indication: 'Crisi Convulsiva Acuta / Stato Epilettico',
        bolusDose: '10 mg EV lento a velocità non superiore a 2-5 mg/min. Ripetibile una volta a 10-15 minuti.',
        preparation: 'Fiala pura in accesso venoso.',
        route: ['EV rapido'],
        clinicalTips: 'Se non c\'è accesso venoso: microclisma rettale 10 mg.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 50% per aumentata sensibilità centrale e accumulo di metaboliti attivi.',
      dialysis: 'Dose ridotta. Non dializzabile (legame proteico 98%).',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard (ridotta del 25%).',
      childPughB: 'Ridurre la dose del 50%.',
      childPughC: 'CONTROINDICATO nell\'insufficienza epatica severa: metabolismo epatico esteso ossidativo (CYP2C19/3A4) con formazione di desmetildiazepam a lunghissima emivita (fino a 100 ore), rischio precipitoso di coma epatico.',
      hepatotoxicRisk: false
    },
    warnings: [
      {
        severity: 'high',
        title: 'Depressione Respiratoria e Flebite Chimica',
        description: 'L\'iniezione EV rapida causa arresto respiratorio, laringospasmo e crollo pressorio. Il solvente glicole propilenico causa dolore bruciante e tromboflebite periferica: iniettare in vene ampie.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi e deprimenti del SNC',
        severity: 'major',
        mechanism: 'Depressione respiratoria letale da sinergia centrale.',
        clinicalAdvice: 'Monitorare la ventilazione e avere pronto Flumazenil.'
      }
    ],
    guidelines: [
      {
        society: 'AES / ERC / NICE Guidelines',
        year: 2023,
        keyRecommendation: 'Diazepam EV 10 mg è un presidio di provata efficacia per l\'interruzione tempestiva delle crisi convulsive e per la sedazione d\'urgenza negli stati ansiosi acuti parossistici.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Frequenza respiratoria e saturazione SpO2 continua',
      'Pressione arteriosa e frequenza cardiaca',
      'Stato di coscienza (sedazione)'
    ],
    antidote: 'Flumazenil',
    isHighAlert: false
  },
  {
    id: 'lorazepam',
    name: 'Lorazepam',
    brandNames: ['Tavor', 'Control', 'Lorazepam Fiale'],
    drugClass: 'Benzodiazepine & Sedativi-Ipnotici',
    clinicalSetting: 'entrambi',
    emergencyIndications: ['Ansia Acuta & Attacchi di Panico', 'Convulsioni & Neurologia d\'Urgenza', 'Sedazione Procedurale & RSI'],
    quickSummary: 'Benzodiazepina a potenza elevata ed emivita intermedia (12-16 ore) con metabolismo per semplice glucuronidazione (sicura in epatopatia e nell\'anziano). Farmaco di prima scelta assoluta in ospedale per crisi d\'ansia, agitazione e stato epilettico convulsivo.',
    mechanismOfAction: 'Potente modulazione positiva allosterica dei recettori GABA-A. Aumenta l\'influsso di ioni cloro nel neurone post-sinaptico producendo rapida ansiolisi, sedazione, effetto anticonvulsivante e amnesia anterograda.',
    dosages: [
      {
        indication: 'Crisi d\'Ansia Acuta / Attacco di Panico Severo / Agitazione Reattiva',
        bolusDose: '1 - 2.5 mg sublinguale (compressa orosolubile da 1 o 2.5 mg lasciata sciogliere sotto la lingua) oppure 1 - 2 mg IM/EV lenta in 2 minuti.',
        maintenanceDose: '1 mg ogni 8-12 ore al bisogno.',
        preparation: 'Compresse sublinguali/orosolubili da 1 mg e 2.5 mg o fiale iniettabili da 4 mg/1 ml (da conservare in frigorifero). Diluire 1:1 con SF prima dell\'iniezione EV.',
        route: ['Sublinguale', 'EV lento', 'IM'],
        clinicalTips: 'L\'assorbimento sublinguale è rapido quasi quanto la via endovenosa, evitando il disagio dell\'incannulamento nel paziente in preda a panico acuto.'
      },
      {
        indication: 'Stato di Male Epilettico Convulsivo (Fase 1 in Ospedale)',
        bolusDose: '4 mg EV lenti in 2 minuti (0.1 mg/kg). Ripetibile una volta a 5-10 minuti se la crisi persiste (max 8 mg).',
        preparation: 'Fiala da 4 mg/1 ml diluita con 1 ml SF.',
        route: ['EV lento'],
        clinicalTips: 'Linee guida neurocritiche: Lorazepam EV ha una durata d\'azione anticonvulsivante più prolungata rispetto a Diazepam per minor ridistribuzione lipidica tissutale.'
      }
    ],
    renalAdjustment: {
      crclNormal: 'Dose standard.',
      crclModerate: 'Dose standard.',
      crclSevere: 'Ridurre la dose del 25-50% (il metabolita inattivo glucuronato viene escreto per via renale).',
      dialysis: 'Dose ridotta. Non dializzabile.',
      nephrotoxicRisk: false
    },
    hepaticAdjustment: {
      childPughA: 'Dose standard.',
      childPughB: 'Dose standard ridotta del 25%.',
      childPughC: 'BENZODIAZEPINA DI SCELTA IN EPATOPATIA: a differenza di diazepam e midazolam, il lorazepam NON dipende dal citocromo P450 microsomiale epatico ma viene metabolizzato per semplice glucuronidazione diretta; iniziare a dosi dimezzate (0.5-1 mg) ma preferibile rispetto alle altre BDZ.',
      hepatotoxicRisk: false,
      notes: 'Privo di metaboliti attivi.'
    },
    warnings: [
      {
        severity: 'high',
        title: 'Depressione Respiratoria e Sedazione Eccessiva',
        description: 'Può causare ipoventilazione e sonnolenza marcata, specie nell\'anziano o in associazione ad altri deprimenti centrali.',
        isQTC: false
      }
    ],
    interactions: [
      {
        interactingDrug: 'Oppioidi e sedativi',
        severity: 'major',
        mechanism: 'Depressione respiratoria additiva profonda.',
        clinicalAdvice: 'Monitorare la saturazione SpO2.'
      }
    ],
    guidelines: [
      {
        society: 'AES / Neurocritical Care Society / NICE Guidelines 2023',
        year: 2023,
        keyRecommendation: 'Lorazepam 4 mg EV lento è la benzodiazepina di prima scelta raccomandata per lo stato di male epilettico in ambito ospedaliero, e sublinguale 1-2.5 mg per le crisi acute d\'ansia/panico.',
        evidenceLevel: 'Classe I, Livello A'
      }
    ],
    monitoring: [
      'Pulsossimetria e frequenza respiratoria',
      'Pressione arteriosa',
      'Stato di vigilanza neurologica'
    ],
    antidote: 'Flumazenil',
    isHighAlert: false
  }
];


import { PregnancySafety } from '../types/pharmacy';

/**
 * Emergency Medicine Pregnancy Safety & Alerts Database
 * Based on ACOG (American College of Obstetricians and Gynecologists),
 * FDA / EMA classification, and European Emergency Medicine Consensus.
 */
export const PREGNANCY_DATA: Record<string, PregnancySafety> = {
  // --- VASOPRESSORI & INOTROPI ---
  'noradrenalina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Provoca vasocostrizione arteriosa uterina con potenziale riduzione della perfusione feto-placentare. Tuttavia è il VASOPRESSORE SALVAVITA DI PRIMA SCELTA nello shock settico e distributivo materno grave: il mantenimento della PAM materna (>65 mmHg) è prioritario per garantire la sopravvivenza fetale.',
    lactation: 'Emivita plasmatica di 1-2 minuti; non passa nel latte o viene degradata nel tratto gastroenterico del neonato.',
    trimesterNotes: 'Utilizzabile in ogni trimestre in caso di shock conclamato e instabilità emodinamica materna non responsiva a fluidi.'
  },
  'adrenalina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'FARMACO SALVAVITA ASSOLUTO: La marcata stimolazione alfa-1 può ridurre il flusso ematico utero-placentare, ma nell\'anafilassi acuta severa e nell\'arresto cardiaco (ALS) la sua somministrazione tempestiva (0.5 mg IM / 1 mg EV) è IMPRESCINDIBILE. L\'anossia materna uccide il feto prima di qualsiasi effetto vasocostrittore!',
    lactation: 'Compatibile in emergenza; emivita brevissima (2-3 minuti).',
    trimesterNotes: 'Nessuna controindicazione in emergenza vitale o anafilassi in qualsiasi trimestre.'
  },
  'dobutamina': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Inotropo di prima linea nello shock cardiogeno e scompenso a bassa gittata in gravidanza. Monitorare attentamente frequenza cardiaca materna e fetale per tachiaritmie.',
    lactation: 'Sospendere temporaneamente l\'allattamento durante l\'infusione.',
    trimesterNotes: 'Utilizzabile in caso di disfunzione ventricolare sinistra materna acuta refrattaria.'
  },
  'terlipressina': {
    fdaCategory: 'X',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO IN GRAVIDANZA: Potente stimolazione della contrattilità miometriale con ischemia uterina acuta, aborto spontaneo, parto pretermine o distacco intempestivo di placenta. Nelle varici esofagee in gravidanza preferire Octreotide EV ed emostasi endoscopica immediata.',
    lactation: 'Controindicato durante l\'allattamento.',
    trimesterNotes: 'Controindicato in tutti i trimestri.'
  },
  'levosimendan': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA ELEVATA: Dati clinici limitati in gravidanza. Utilizzare solo nello shock cardiogeno materno refrattario a catecolamine quando non vi siano opzioni alternative.',
    lactation: 'Interrompere l\'allattamento per almeno 14 giorni post-infusione (metabolita attivo a lunghissima emivita).',
    trimesterNotes: 'Solo per emergenza cardiologica estrema.'
  },

  // --- ANTIARITMICI & CARDIOVASCOLARI ---
  'amiodarone': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO FETALE: Attraversa ampiamente la placenta (10-50%). L\'elevato contenuto di iodio provoca ipotiroidismo fetale con gozzo (rischio ostruzione vie aeree al parto), ipermetabolismo, bradicardia fetale e ritardo di crescita intrauterina (IUGR). RISERVATO ESCLUSIVAMENTE all\'arresto cardiaco (FV/TV) o aritmie ventricolari/sopraventricolari letali refrattarie a cardioversione e altri antiaritmici.',
    lactation: 'CONTROINDICATO nell\'allattamento (escreto in quantità cospicue nel latte materno; rischio ipotiroidismo neonatale).',
    trimesterNotes: 'Evitare in tutti i trimestri salvo emergenze aritmiche letali per la gestante.',
    safeAlternatives: 'Adenosina per TPSV; Cardioversione elettrica sincronizzata per FA/TV; Labetalolo/Metoprololo.'
  },
  'adenosina': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'FARMACO DI PRIMA SCELTA PER TPSV IN GRAVIDANZA: Emivita plasmatica ultrabreve (< 10 secondi) per rapida degradazione da parte degli eritrociti. Non raggiunge il feto in concentrazioni farmacologicamente attive. Efficace e sicura per l\'interruzione delle tachicardie sopraventricolari da rientro.',
    lactation: 'Completamente compatibile con l\'allattamento (emivita di secondi).',
    trimesterNotes: 'Sicura in 1°, 2° e 3° trimestre. Avere pronto monitoraggio CTG.'
  },
  'metoprololo-ev': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Beta-bloccante cardioselettivo. L\'uso prolungato può causare ritardo di crescita intrauterina (IUGR), bradicardia e ipoglicemia neonatale. Per il controllo a breve termine della frequenza in PS/degenza è utilizzabile se Labetalolo non disponibile.',
    lactation: 'Compatibile con l\'allattamento (escrezione minima a dosi standard).',
    trimesterNotes: 'Monitorare frequenza cardiaca fetale e glicemia neonatale nelle prime 48 ore di vita.'
  },
  'esmololo': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Beta-bloccante ad emivita brevissima (9 minuti). Ideale in emergenze acute (dissecazione aortica, tachiaritmie) perché rapidamente reversibile in caso di bradicardia fetale.',
    lactation: 'Compatibile in acuto.',
    trimesterNotes: 'Utilizzabile in acuto in sala parto o emergenza.'
  },
  'labetalolo': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'FARMACO DI PRIMA SCELTA PER EMERGENZE IPERTENSIVE E PREECLAMPSIA GRAVE (Linee Guida ESC / ACOG 2024): Alfa- e beta-bloccante combinato. Abbassa rapidamente e in modo controllato la pressione arteriosa preservando la perfusione utero-placentare. Risoluzione d\'elezione della crisi ipertensiva materna.',
    lactation: 'Compatibile con l\'allattamento al seno (ACOG).',
    trimesterNotes: 'Trattamento cardine in gravidanza per PAS >= 160 mmHg o PAD >= 110 mmHg.',
    safeAlternatives: 'Labetalolo EV è la prima scelta; idralazina EV o Nifedipina orale come alternative.'
  },
  'urapidil': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Antagonista alfa-1 e agonista 5-HT1A centrale. Utilizzato con successo nelle crisi ipertensive severe del peripartum refrattarie a Labetalolo. Monitorare pressione materna per evitare cali pressori eccessivamente bruschi.',
    lactation: 'Dati limitati; evitare l\'allattamento nelle 24h successive.',
    trimesterNotes: 'Seconda linea dopo Labetalolo.'
  },
  'nitroglicerina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Vasodilatatore di scelta nell\'Edema Polmonare Acuto materno o ischemia miocardica. Attenzione all\'ipotensione materna che può ridurre la perfusione placentare. Utilizzata anche come tocolitico d\'emergenza.',
    lactation: 'Compatibile in acuto per via della brevissima emivita.',
    trimesterNotes: 'Titolare con attenzione per evitare ipotensione materna sistemica.'
  },
  'nitroprussiato-sodio': {
    fdaCategory: 'C',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO SALVO ESTREMA RATIO: Il nitroprussiato attraversa la placenta e il suo catabolismo libera cianuro e tiocianato con elevato rischio di intossicazione fetale letale e morte intrauterina se infuso per più di 1-2 ore. Riservato a crisi ipertensive catastrofiche refrattarie a Labetalolo, Urapidil e Nitroglicerina, a dosi minime e per meno di 30-60 minuti.',
    lactation: 'Controindicato durante l\'allattamento.',
    trimesterNotes: 'Rischio tossicità da cianuro fetale gravissimo nel 2° e 3° trimestre.',
    safeAlternatives: 'Labetalolo EV, Urapidil EV o Nitroglicerina EV.'
  },
  'nicardipina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA ELEVATA: Calcio-antagonista potente. Può indurre ipotensione marcata e tocolisi. CONTROINDICATA la co-somministrazione simultanea con Magnesio Solfato EV ad alte dosi (rischio collasso cardiovascolare materno e blocco neuromuscolare).',
    lactation: 'Passa nel latte; valutare sospensione allattamento.',
    trimesterNotes: 'Non associare a Magnesio Solfato in preeclampsia!'
  },
  'verapamil': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Seconda scelta dopo Adenosina per TPSV. Può provocare ipotensione materna e bradicardia fetale. Evitare in caso di compromissione ventricolare.',
    lactation: 'Compatibile a basse dosi (passaggio minimo nel latte).',
    trimesterNotes: 'Preferire Adenosina o Cardioversione.'
  },
  'digossina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Attraversa la placenta. Utilizzata storicamente per il controllo della frequenza in FA materna e per il trattamento di tachiaritmie fetali intrauterine sotto guida cardiologica. Richiede TDM stretto.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'I livelli plasmatici materni possono variare per l\'aumento del volume di distribuzione.'
  },
  'lidocaina': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE IN EMERGENZA (Cat. B): Attraversa la placenta per diffusione passiva. A dosi terapeutiche antiaritmiche d\'emergenza o per anestesia locale è ben tollerata e sicura; evitare sovradosaggi per prevenire depressione del SNC e bradicardia neonatale.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Utilizzabile in arresto cardiaco o tachicardie ventricolari in tutti i trimestri.'
  },
  'furosemide': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Diuretico dell\'ansa. Nella preeclampsia è CONTROINDICATO di routine perché riduce ulteriormente il volume plasmatico già contratto compromettendo il flusso utero-placentare. Indicato ESCLUSIVAMENTE nell\'Edema Polmonare Acuto materno conclamato o oliguria da sovraccarico.',
    lactation: 'Può inibire la lattazione (sopprime prolattina per deplezione volemica).',
    trimesterNotes: 'Non usare per gli edemi fisiologici gravidici o nella preeclampsia non complicata da EPA!'
  },
  'atropina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Attraversa rapidamente la placenta. Può provocare tachicardia fetale e perdita transitoria della variabilità del battito cardiaco fetale al CTG. Tuttavia è raccomandata e salvavita nella bradicardia materna sintomatica severa o intossicazione da organofosforici.',
    lactation: 'Può ridurre temporaneamente la produzione di latte materno.',
    trimesterNotes: 'Utilizzabile per bradicardia instabile materna.'
  },

  // --- ANTICOAGULANTI & REVERSAL ---
  'warfarin': {
    fdaCategory: 'X',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO ASSOLUTO (Cat. X - TERATOGENO NOTO): Attraversa la barriera placentare. Causa la "Sindrome Feto-Warfarinica" (embriopatia con ipoplasia nasale, epifisi puntate, atrofia ottica, microcefalia, ritardo mentale) nel 1° trimestre, ed emorragie fetali intracraniche fatali nel 2° e 3° trimestre. Sostituire tassativamente con EBPM (Enoxaparina). In caso di sanguinamento in gestante scoagulata: 4F-CCP e Vitamina K1.',
    lactation: 'Compatibile con l\'allattamento al seno (non passa nel latte materno; sicuro nel puerperio).',
    trimesterNotes: 'Assolutamente vietato tra la 6a e la 12a settimana di gestazione e nel peripartum.',
    safeAlternatives: 'Enoxaparina (EBPM) o Eparina Non Frazionata (UFH).'
  },
  'acenocumarolo': {
    fdaCategory: 'X',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO ASSOLUTO (Cat. X - TERATOGENO): Come il warfarin, attraversa la placenta inducendo embriopatia grave ed emorragie fetali e retroplacentari. Sostituire con EBPM.',
    lactation: 'Compatibile con l\'allattamento materno.',
    trimesterNotes: 'Controindicato in tutti i trimestri di gravidanza.',
    safeAlternatives: 'Enoxaparina (EBPM).'
  },
  'dabigatran': {
    fdaCategory: 'C',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO IN GRAVIDANZA: I DOAC attraversano la placenta ed espongono a rischio emorragico feto-materno severo; dati di teratogenicità limitati nell\'uomo. Le linee guida ESC/ISTH raccomandano di evitare tutti i DOAC in gravidanza e sostituirli con EBPM. Se emorragia maggiore: Idarucizumab 5g EV.',
    lactation: 'Evitare durante l\'allattamento; passare a EBPM o Warfarin.',
    trimesterNotes: 'Controindicato.',
    safeAlternatives: 'Enoxaparina (Clexane).'
  },
  'apixaban': {
    fdaCategory: 'B',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO IN GRAVIDANZA: Mancano studi clinici controllati; attraversa la placenta provocando rischio emorragico fetale. Le linee guida internazionali prescrivono la sospensione immediata e il passaggio a Enoxaparina.',
    lactation: 'Controindicato durante l\'allattamento al seno.',
    trimesterNotes: 'Controindicato in tutti i trimestri.',
    safeAlternatives: 'Enoxaparina sottocute.'
  },
  'rivaroxaban': {
    fdaCategory: 'C',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO IN GRAVIDANZA: Segnalati aumenti di aborti spontanei ed emorragie materno-fetali. Non impiegare in gravidanza (passare a EBPM). Reversal urgente: 4F-CCP.',
    lactation: 'Controindicato nell\'allattamento.',
    trimesterNotes: 'Controindicato in tutti i trimestri.',
    safeAlternatives: 'Enoxaparina sottocute.'
  },
  'edoxaban': {
    fdaCategory: 'C',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO IN GRAVIDANZA: Rischio emorragico fetale; sostituire con EBPM.',
    lactation: 'Controindicato nell\'allattamento.',
    trimesterNotes: 'Controindicato.',
    safeAlternatives: 'Enoxaparina.'
  },
  'fondaparinux': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Attraversa la placenta in minime quantità. Riservato in gravidanza a pazienti con grave allergia cutanea alle eparine o trombocitopenia indotta da eparina (HIT).',
    lactation: 'Utilizzabile se necessario.',
    trimesterNotes: 'Seconda scelta dopo EBPM.'
  },
  'enoxaparina': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'ANTICOAGULANTE DI PRIMA SCELTA IN GRAVIDANZA (ACOG / ESC 2024): Non attraversa la placenta e non causa embriopatia né sanguinamenti fetali. Farmaco di riferimento per la profilassi e il trattamento del tromboembolismo venoso (TEV) e protesi valvolari in gravidanza. Sospendere 12h prima del parto (24h se dose terapeutica) per consentire anestesia loco-regionale.',
    lactation: 'Completamente compatibile con l\'allattamento al seno (non escreta nel latte; inattivata gastricamente se ingerita).',
    trimesterNotes: 'Sicura ed efficace in 1°, 2° e 3° trimestre.'
  },
  'eparina-non-frazionata': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Non attraversa la placenta): Utilizzata nel peripartum o in caso di imminente parto/taglio cesareo per la sua brevissima emivita (60-90 min) e la rapida e completa neutralizzabilità con Protamina Solfato.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Ideale nelle ultime settimane o in sala parto se alto rischio tromboembolico.'
  },
  '4f-pcc': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA ELEVATA / SALVAVITA: Concentrato di fattori della coagulazione umani. Indicato nelle emorragie materne catastrofiche con coagulopatia o per sovradosaggio acuto da AVK/DOAC nel peripartum. Rischio aumentato di trombosi materna post-partum: usare alla dose minima efficace.',
    lactation: 'Proteine umane; compatibile con allattamento.',
    trimesterNotes: 'Solo per emorragie maggiori incontrollate.'
  },
  'idarucizumab': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA / SALVAVITA: Frammento anticorpale umanizzato. Nessun dato clinico specifico in gravidanza, ma in caso di emorragia letale o chirurgia non procrastinabile da Dabigatran è il reversal salvavita di prima scelta.',
    lactation: 'Compatibile in emergenza.',
    trimesterNotes: 'Uso salvavita consentito.'
  },
  'acido-tranexamico': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE & SALVAVITA NELL\'EMORRAGIA POST-PARTUM (Trial WOMAN / WHO Guidelines 2023): Somministrare 1 g EV entro 3 ore dall\'emorragia post-partum o dal trauma per ridurre la mortalità da sanguinamento materno senza aumento di complicanze trombotiche.',
    lactation: 'Compatibile con l\'allattamento al seno (escrezione minima).',
    trimesterNotes: 'Fondamentale nel peripartum e nel 3° trimestre in caso di emorragia massiva.'
  },
  'vitamina-k1': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE: Vitamina fisiologica. Indicata nel sovradosaggio da warfarin e nella profilassi della malattia emorragica del neonato. In acuto EV lenta in 30 min (5-10 mg).',
    lactation: 'Compatibile con l\'allattamento.',
    trimesterNotes: 'Nessun effetto teratogeno documentato.'
  },
  'protamina-solfato': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA / SALVAVITA: Antidoto salvavita per sovradosaggio o emorragia da Eparina non frazionata (UFH) o EBPM nel peripartum. Infondere sempre lentamente in almeno 10 minuti per evitare ipotensione materna.',
    lactation: 'Compatibile in emergenza.',
    trimesterNotes: 'Utilizzabile in sala parto se sanguinamento massivo post-eparina.'
  },
  'alteplase': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA ELEVATA / SALVAVITA: La molecola non attraversa la placenta. La gravidanza è considerata controindicazione relativa, ma nell\'Embolia Polmonare Massiva instabile con arresto o shock materno, o nello Stroke ischemico invalidante, la trombolisi è indicata come opzione salvavita.',
    lactation: 'Emivita plasmatica di 4-5 minuti; compatibile dopo poche ore.',
    trimesterNotes: 'Rischio di sanguinamento retroplacentare o uterino nel 3° trimestre e peripartum.'
  },
  'ticagrelor': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Dati molto limitati in gravidanza. Nelle sindromi coronariche acute materne in gravidanza (IMA/SCAD) preferire Cardioaspirina a basse dosi e Clopidogrel se indicata DAPT.',
    lactation: 'Evitare durante l\'allattamento.',
    trimesterNotes: 'Seconda scelta rispetto a Clopidogrel.'
  },
  'acido-acetilsalicilico': {
    fdaCategory: 'D',
    riskLevel: 'caution',
    clinicalSummary: 'DOPPIA FACCIA (Basse dosi vs Dosi analgesiche): A BASSE DOSI (100-150 mg/die) è SICURA e FORTEMENTE RACCOMANDATA per la prevenzione della preeclampsia ad alto rischio dall\'11a alla 36a settimana. A DOSI PIENE/ANALGESICHE (>500 mg) nel 3° trimestre è CONTROINDICATA per rischio di chiusura prematura del dotto di Botallo ed emorragie.',
    lactation: 'Basse dosi (100 mg) compatibili; dosi piene analgesiche da evitare.',
    trimesterNotes: 'Bassa dose (100-150 mg) sicura e protettiva; dosi alte da evitare nel 3° trimestre.'
  },

  // --- ANTIBIOTICI & INFEZIONI ---
  'ceftriaxone': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'ANTIBIOTICO DI PRIMA SCELTA IN GRAVIDANZA (Cat. B): Cefalosporina ampiamente studiata e sicura in tutti i trimestri per polmoniti, pielonefriti, sepsi e meningiti. Nel peripartum immediato cautela nel neonato con ittero severo per spiazzamento della bilirubina dall\'albumina.',
    lactation: 'Compatibile con l\'allattamento al seno (AAP / EMA).',
    trimesterNotes: 'Sicuro in 1°, 2° e 3° trimestre.'
  },
  'piperacillina-tazobactam': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B): Penicillina ad ampio spettro sicura in gravidanza per sepsi addominale, pielonefrite severa e shock settico materno. Nessun incremento di anomalie congenite.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Utilizzabile in ogni trimestre.'
  },
  'meropenem': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B): Carbapenemico di scelta nelle infezioni materne gravi da Gram-negativi multiresistenti (ESBL) o shock settico nosocomiale. Profilo di tollerabilità feto-materno molto favorevole rispetto all\'imipenem.',
    lactation: 'Escrezione minima nel latte; compatibile.',
    trimesterNotes: 'Trattamento cardine nella sepsi grave materna da batteri produttori di beta-lattamasi.'
  },
  'vancomicina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Glicopeptide per sospetto MRSA o endocardite batterica. Attraversa la placenta. Monitorare attentamente i livelli di valle (trough) per prevenire oto- e nefrotossicità materno-fetale.',
    lactation: 'Non assorbita per via orale dal lattante; compatibile.',
    trimesterNotes: 'Utilizzabile con monitoraggio TDM terapeutico.'
  },

  // --- ANALGESICI & ANESTETICI ---
  'paracetamolo': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'ANALGESICO E ANTIPIRETICO DI PRIMA SCELTA ASSOLUTA IN TUTTI I TRIMESTRI DI GRAVIDANZA: Profilo di sicurezza consolidato da decenni di utilizzo clinico. Trattamento di prima linea per dolore acuto e febbre (la febbre materna non trattata è teratogena nel 1° trimestre). Evitare il sovradosaggio (>4g/die).',
    lactation: 'Completamente compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Sicuro in 1°, 2° e 3° trimestre.'
  },
  'ketorolac': {
    fdaCategory: 'D',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO NEL 3° TRIMESTRE (Cat. D): I FANS inibiscono la sintesi di prostaglandine provocando: 1) Chiusura prematura del Dotto Arterioso di Botallo con conseguente ipertensione polmonare neonatale persistente (PPHN); 2) Oligoidramnios grave da danno renale fetale (anche dopo sole 48h di uso oltre la 20a settimana); 3) Inibizione del travaglio di parto ed emorragia peripartum. Nel 1° e 2° trimestre usare solo se strettamente necessario e per massimo 48h.',
    lactation: 'Compatibile con l\'allattamento a brevi cicli.',
    trimesterNotes: 'CONTROINDICATO categoricamente dopo la 28a-30a settimana!',
    safeAlternatives: 'Paracetamolo EV (1 g) o Fentanil a basse dosi per colica renale severa.'
  },
  'morfina-cloridrato': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Oppioide naturale. L\'uso a breve termine per dolore acuto grave da trauma è accettabile. Nel peripartum dosi ripetute possono determinare depressione respiratoria neonatale alla nascita (avere pronto Naloxone per il neonato).',
    lactation: 'Compatibile per singole somministrazioni; evitare uso prolungato.',
    trimesterNotes: 'Attenzione all\'uso prolungato vicino al parto (sindrome da astinenza neonatale).'
  },
  'fentanil': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Oppioide sintetico lipofilo ampiamente utilizzato in analgesia ostetrica e per induzione RSI. A dosi singole o brevi è sicuro ed efficace senza depressione prolungata; a dosi massive o prolungate monitorare la respirazione neonatale.',
    lactation: 'Compatibile con l\'allattamento dopo 2-4 ore dalla somministrazione.',
    trimesterNotes: 'Oppioide di scelta nel trauma materno instabile.'
  },
  'propofol': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Attraversa rapidamente la placenta. Ampiamente impiegato per l\'induzione dell\'anestesia generale nel taglio cesareo d\'urgenza. Può provocare ipotensione materna e lieve depressione neonatale transitoria se il tempo tra induzione ed estrazione fetale è prolungato.',
    lactation: 'L\'allattamento può riprendere non appena la madre è sveglia e orientata.',
    trimesterNotes: 'Induttore standard nel taglio cesareo.'
  },
  'ketamina': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Attraversa la placenta. Ad alte dosi (> 2 mg/kg) può aumentare il tono uterino basale e deprimere il feto. Ideale per RSI in shock materno o asma critico.',
    lactation: 'Compatibile dopo il risveglio materno.',
    trimesterNotes: 'Non usare a dosi > 2 mg/kg per rischio ipertono uterino.'
  },
  'etomidato': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Stabilità cardiovascolare eccellente. Attraversa la placenta. Può determinare soppressione corticosurrenalica transitoria anche nel neonato; limitare al singolo bolo di induzione RSI.',
    lactation: 'Sospendere per 24h dopo la somministrazione.',
    trimesterNotes: 'Riservato a induzione in shock materno grave.'
  },
  'rocuronio': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE PER RSI: Molecola fortemente ionizzata e idrosolubile; attraversa la barriera placentare in quantità minime e clinicamente trascurabili. Non provoca paralisi nel feto a dosi standard. Miorilassante di PRIMA SCELTA per RSI in ostetricia.',
    lactation: 'Non assorbito dal tratto gastrointestinale del neonato; compatibile.',
    trimesterNotes: 'Sicuro per taglio cesareo in sequenza rapida.'
  },
  'succinilcolina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Idrolizzata rapidamente dalle pseudocolinesterasi materne; passa la placenta in quantità minime. Nelle gravide con preeclampsia in terapia con Magnesio Solfato il blocco può essere marcatamente prolungato.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Preferire Rocuronio 1.2 mg/kg con disponibilità di Sugammadex.'
  },
  'sugammadex': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA / SALVAVITA: Reversal del rocuronio. Dati clinici in gravidanza favorevoli ma limitati; nello scenario CICO o fallimento dell\'intubazione materna è FARMACO SALVAVITA DI SCELTA. Nota: chela i contraccettivi ormonali.',
    lactation: 'Compatibile in emergenza.',
    trimesterNotes: 'Utilizzabile in emergenza via aerea difficile materna.'
  },

  // --- ANTIEPILETTICI, SEDATIVI & BENZODIAZEPINE ---
  'valproato-sodio': {
    fdaCategory: 'X',
    riskLevel: 'contraindicated',
    clinicalSummary: 'CONTROINDICATO ASSOLUTO (Cat. X - ALTAMENTE TERATOGENO): Causa spina bifida e difetti del tubo neurale (rischio aumentato di 10-20 volte), anomalie cranio-facciali e ritardo cognitivo/autismo nel 30-40% dei bambini esposti! Nello stato di male epilettico in gravidanza usare Levetiracetam EV o Benzodiazepine d\'urgenza.',
    lactation: 'Compatibile a basse dosi ma preferire alternative.',
    trimesterNotes: 'Assolutamente controindicato in gravidanza.',
    safeAlternatives: 'Levetiracetam EV (Keppra 60 mg/kg) o Lamotrigina.'
  },
  'levetiracetam': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'ANTIEPILETTICO DI PRIMA SCELTA IN GRAVIDANZA: Registro EURAP dimostra il tasso di malformazioni maggiori più basso tra tutti gli antiepilettici (~2-3%, pari alla popolazione generale). Farmaco di scelta nello stato di male epilettico e nelle crisi convulsive in gravidanza non-eclamptiche.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Aumentare le dosi nel 3° trimestre per aumento della clearance renale gravidica.'
  },
  'diazepam': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO (Cat. D): Attraversa rapidamente la placenta e si accumula nel feto. L\'uso prolungato nel 1° trimestre è associato a labioschisi/palatoschisi; nel 3° trimestre e peripartum induce la "Floppy Infant Syndrome" (ipotonia marcata, ipotermia, depressione respiratoria, difficoltà alla suzione e astinenza neonatale). Riservato alle crisi convulsive prolungate quando non siano disponibili alternative.',
    lactation: 'Passa nel latte materno e si accumula; evitare allattamento dopo dosi ripetute.',
    trimesterNotes: 'Solo per crisi convulsive refrattarie o agitazione pericolosa a dose singola minima.',
    safeAlternatives: 'In eclampsia: Magnesio Solfato EV! Nello stato di male: Lorazepam EV a dose minima o Levetiracetam.'
  },
  'lorazepam': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO (Cat. D): Come tutte le benzodiazepine, l\'uso peripartum provoca depressione neonatale e ipotonia. Tuttavia, per il controllo dello stato di male epilettico materno la somministrazione acuta (4 mg EV) è giustificata per salvare la madre e il feto dall\'anossia prolungata.',
    lactation: 'Compatibile per dosi singole isolate.',
    trimesterNotes: 'Non usare per ansia lieve o insonnia gravidica.',
    safeAlternatives: 'Psicoterapia, de-escalation, o Idrossizina se indispensabile.'
  },
  'alprazolam': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO (Cat. D): Rischio teratogeno e depressione neonatale. Controindicato per il trattamento routinario dell\'ansia in gravidanza. In caso di attacco di panico acuto in pronto soccorso preferire de-escalation o antistaminico sedativo.',
    lactation: 'Non raccomandato durante l\'allattamento.',
    trimesterNotes: 'Evitare.',
    safeAlternatives: 'Tecniche di respirazione e supporto psicologico.'
  },
  'delorazepam': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO (Cat. D): Emivita prolungata con elevato accumulo feto-placentare e nel neonato. Evitare in gravidanza.',
    lactation: 'Controindicato nell\'allattamento prolungato.',
    trimesterNotes: 'Evitare.',
    safeAlternatives: 'Supporto non farmacologico.'
  },
  'midazolam': {
    fdaCategory: 'D',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO (Cat. D): Utilizzabile in emergenza per stato di male epilettico (10 mg IM) se mancato accesso venoso o sedazione procedurale salvavita.',
    lactation: 'Compatibile dopo 4-6 ore dall\'iniezione singola.',
    trimesterNotes: 'Solo per emergenze neurologiche materne maggiori.'
  },
  'aloperidolo': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Antipsicotico tipico. Nessun aumento rilevante di malformazioni congenite. Utilizzabile a basse dosi per delirium iperattivo o agitazione psicomotoria acuta severa materna in PS.',
    lactation: 'Escreto in piccole quantità nel latte; monitorare sedazione neonatale.',
    trimesterNotes: 'Monitorare eventuali sintomi extrapiramidali transitori nel neonato se usato a ridosso del parto.'
  },
  'flumazenil': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Antidoto per overdose da benzodiazepine. Utilizzare solo in caso di depressione respiratoria materna grave indotta da BDZ.',
    lactation: 'Compatibile in acuto.',
    trimesterNotes: 'Rischio crisi convulsive da astinenza se la madre è dipendente cronica.'
  },
  'naloxone': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'FARMACO SALVAVITA (Cat. B): Antidoto per overdose da oppioidi. La mancata ventilazione materna è fatale per il feto. Titolare a piccole dosi per evitare crisi d\'astinenza acuta severa che può scatenare distress fetale o parto pretermine.',
    lactation: 'Non assorbito per via orale; compatibile.',
    trimesterNotes: 'Utilizzare tempestivamente per arresto respiratorio da oppiacei.'
  },

  // --- VERTIGINI & ANTIEMETICI ---
  'levosulpiride': {
    fdaCategory: 'C',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO: Mancano studi clinici controllati in gravidanza. Causa iperprolattinemia marcata e possibili effetti extrapiramidali neonatali se somministrata nel 3° trimestre. Nelle vertigini e nell\'iperemesi gravidica preferire Dimenidrinato, Metoclopramide o Ondansetron.',
    lactation: 'Escreta nel latte materno; controindicata nell\'allattamento.',
    trimesterNotes: 'Evitare in tutti i trimestri.',
    safeAlternatives: 'Dimenidrinato (Valontan), Metoclopramide (Plasil) o Ondansetron.'
  },
  'tietilperazina': {
    fdaCategory: 'C',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO: Fenotiazina antivertiginosa. Rischio di sintomi extrapiramidali e sedazione marcata. Evitare in gravidanza e preferire antistaminici anti-H1 come Dimenidrinato.',
    lactation: 'Controindicata nell\'allattamento.',
    trimesterNotes: 'Evitare.',
    safeAlternatives: 'Dimenidrinato o Metoclopramide.'
  },
  'dimenidrinato': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B - ACOG First Line): Antistaminico H1 di prima linea raccomandato dalle linee guida ostetriche per nausea, vomito ed iperemesi gravidica refrattaria, nonché per cinetosi e vertigini periferiche acute in gravidanza.',
    lactation: 'Compatibile a dosi standard; può causare lieve sonnolenza nel lattante.',
    trimesterNotes: 'Sicuro in 1°, 2° e 3° trimestre.'
  },
  'betaistina': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Dati limitati in gravidanza umana. Utilizzare solo se il beneficio clinico materno per sindrome di Menière o vertigine supera i potenziali rischi.',
    lactation: 'Evitare durante l\'allattamento.',
    trimesterNotes: 'Preferire Dimenidrinato in fase acuta.'
  },
  'metoclopramide': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B - ACOG Guidelines): Ampiamente documentata e sicura nel 1°, 2° e 3° trimestre per nausea e vomito acuto o emicrania. Nessun aumento di malformazioni o complicanze perinatali.',
    lactation: 'Compatibile con l\'allattamento (stimola la secrezione di prolattina).',
    trimesterNotes: 'Sicura in tutti i trimestri.'
  },
  'ondansetron': {
    fdaCategory: 'B',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA NEL 1° TRIMESTRE (Cat. B): Antagonista 5-HT3. Studi osservazionali hanno discusso un lieve aumento del rischio di labioschisi nel 1° trimestre. Le linee guida ACOG lo raccomandano come eccellente seconda linea per iperemesi gravidica refrattaria dopo la 10a settimana.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Preferibile a partire dal 2° trimestre.'
  },

  // --- RESPIRATORIO, ASMA & ALLERGIA ---
  'salbutamolo': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'BRONCODILATATORE DI PRIMA SCELTA IN GRAVIDANZA (GINA 2024 / ACOG): Per via inalatoria l\'assorbimento sistemico è minimo. L\'ipossia fetale da asma non controllato è infinitamente più pericolosa del farmaco! Usare a piene dosi raccomandate in qualsiasi trimestre.',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Sicuro in 1°, 2° e 3° trimestre.'
  },
  'salbutamolo-ipratropio': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE IN INALATORIO: L\'associazione SABA + SAMA inalatoria ha un assorbimento sistemico inferiore al 2% ed è sicura e raccomandata nell\'asma acuto grave o riacutizzazione ostruttiva materna.',
    lactation: 'Compatibile con l\'allattamento.',
    trimesterNotes: 'Utilizzare senza esitazione in caso di broncospasmo materno.'
  },
  'ipratropio-bromuro': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B): Anticolinergico inalatorio con assorbimento sistemico trascurabile. Sicuro nell\'asma acuto e nella BPCO in gravidanza.',
    lactation: 'Compatibile con l\'allattamento.',
    trimesterNotes: 'Sicuro in tutti i trimestri.'
  },
  'aminofillina': {
    fdaCategory: 'C',
    riskLevel: 'high_risk',
    clinicalSummary: 'ALTO RISCHIO: Attraversa liberamente la placenta. Causa tachicardia fetale, aritmie, tremori e irritabilità neonatale. Indice terapeutico stretto. Evitare e preferire Magnesio Solfato EV e cortisonici sistemici per l\'asma acuto refrattario.',
    lactation: 'Escreta nel latte (può dare insonnia e tachicardia nel lattante).',
    trimesterNotes: 'Riservare a casi eccezionali refrattari a tutto.',
    safeAlternatives: 'Magnesio Solfato 2g EV, Salbutamolo inalatorio continuativo, Idrocortisone/Metilprednisolone EV.'
  },
  'magnesio-solfato': {
    fdaCategory: 'A',
    riskLevel: 'safe',
    clinicalSummary: 'FARMACO SALVAVITA GOLD STANDARD IN OSTETRICIA & GINECOLOGIA (Cat. A/B): Farmaco di scelta assoluta raccomandato da tutte le linee guida internazionali per la prevenzione e il trattamento delle crisi convulsive nell\'ECLAMPSIA e nella preeclampsia grave, nonché per la neuroprotezione fetale nel parto pretermine (<32 settimane) e per l\'asma acuto grave materno.',
    lactation: 'Completamente compatibile con l\'allattamento.',
    trimesterNotes: 'Monitorare riflessi rotulei e diuresi materna durante l\'infusione continua.'
  },
  'clorfenamina': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'ANTISTAMINICO DI PRIMA SCELTA IN GRAVIDANZA (Cat. B): Antistaminico H1 parenterale di riferimento storico con il più ampio profilo di sicurezza in gravidanza per orticaria acuta, angioedema e reazioni allergiche sistemiche.',
    lactation: 'Compatibile a brevi dosi (può dare lieve sedazione nel neonato).',
    trimesterNotes: 'Sicura in tutti i trimestri.'
  },
  'prometazina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Antistaminico fenotiazinico sedativo. Utilizzabile IM se clorfenamina non disponibile. Evitare l\'uso prolungato vicino al parto per rischio di depressione respiratoria e sintomi extrapiramidali neonatali.',
    lactation: 'Compatibile a dosi singole.',
    trimesterNotes: 'Preferire Clorfenamina o Dimenidrinato.'
  },
  'idrossizina': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Controindicata nel 1° trimestre per dati di teratogenesi animale; nel 2° e 3° trimestre riservata ad ansia o prurito severo non responsivo ad altri antistaminici. Non superare 50-100 mg/die e verificare QTc.',
    lactation: 'Evitare durante l\'allattamento.',
    trimesterNotes: 'Evitare nel 1° trimestre.'
  },
  'metilprednisolone': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE IN EMERGENZA (Cat. C): Inattivato per l\'85-90% dall\'enzima placentare 11-beta-idrossisteroide deidrogenasi tipo 2 (11-beta-HSD2). Raggiunge il feto solo in minima parte: ideale quando si vuole trattare la MADRE (asma acuto, anafilassi, BPCO) senza sopprimere l\'asse surrenalico fetale!',
    lactation: 'Compatibile con l\'allattamento (attendere 2-4 ore dall\'infusione se dosi elevate).',
    trimesterNotes: 'Glucocorticoide di scelta materna in acuto.'
  },
  'idrocortisone': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE & SALVAVITA: Cortisolo naturale. Degradato dalla placenta; farmaco di prima linea per insufficienza surrenalica materna acuta e shock settico refrattario.',
    lactation: 'Compatibile con l\'allattamento.',
    trimesterNotes: 'Nessun ritardo di somministrazione in emergenza.'
  },
  'desametasone': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA (ATTRAVERSA LA PLACENTA AL 100%): A differenza del metilprednisolone, il desametasone NON viene inattivato dall\'enzima placentare e raggiunge il feto a concentrazioni piene. In ostetricia viene usato intenzionalmente per accelerare la maturazione polmonare fetale nel parto pretermine (<34 settimane). Se l\'indicazione è solo materna (es. shock o anafilassi), preferire Metilprednisolone o Idrocortisone.',
    lactation: 'Compatibile a brevi dosi.',
    trimesterNotes: 'Farmaco di scelta se si richiede maturazione polmonare fetale; se patologia materna pura preferire Metilprednisolone.',
    safeAlternatives: 'Metilprednisolone (Solu-Medrol) se patologia solo materna.'
  },

  // --- SOLUZIONI & ELETTROLITI ---
  'calcio-cloruro': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE IN EMERGENZA VITALE: Elettrolita fisiologico essenziale. Salvavita nell\'iperkaliemia grave con alterazioni ECG o tossicità da magnesio/calcio-antagonisti.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Sicuro.'
  },
  'sodio-bicarbonato': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: L\'alcalinizzazione massiva rapida può provocare ipossia fetale per spostamento a sinistra della curva di dissociazione dell\'emoglobina e acidosi respiratoria placentare da CO2.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Usare solo per indicazioni stringenti (overdose TCA, iperkaliemia grave, acidosi pH < 7.10).'
  },
  'soluzione-ipertonica-3': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA / SALVAVITA: Indicata per edema cerebrale acuto con erniazione o iponatriemia severa sintomatica con convulsioni. Monitorare natriemia ed equilibrio idrico materno.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Salvavita in neurotrauma o eclampsia con edema cerebrale.'
  },
  'mannitolo': {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Diuretico osmotico. Attraversa lentamente la placenta; dosi elevate possono indurre disidratazione fetale e oligoidramnios acuto. Nel trauma cranico materno preferire Soluzione Salina Ipertonica 3%.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Preferire NaCl 3% in gravidanza.'
  },
  'insulina-regolare': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE & DI PRIMA SCELTA (Cat. B): Non attraversa la placenta. Farmaco d\'elezione per la chetoacidosi diabetica e per lo shift del potassio nell\'iperkaliemia materna. Evitare rigorosamente ipoglicemie.',
    lactation: 'Completamente compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Sicura in tutti i trimestri.'
  },
  'glucosata-33': {
    fdaCategory: 'C',
    riskLevel: 'safe',
    clinicalSummary: 'SALVAVITA IN COMA IPOGLICEMICO: Il glucosio è il substrato energetico essenziale cerebrale materno e fetale. Somministrazione immediata in bolo.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Sicura in tutti i trimestri.'
  },
  'glucagone': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B): Ormone polipeptidico che non attraversa la placenta in quantità significative. Trattamento di prima linea per ipoglicemia severa senza accesso venoso o intossicazione da beta-bloccanti.',
    lactation: 'Compatibile con l\'allattamento.',
    trimesterNotes: 'Sicuro in ogni trimestre.'
  },
  'intralipid': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'SALVAVITA (Cat. B): Emulsione lipidica purificata (terapia Lipid Rescue). Antidoto salvavita per LAST (tossicità da anestetici locali) durante parto analgesico/anestesia loco-regionale o cardiotossicità severa.',
    lactation: 'Compatibile in emergenza.',
    trimesterNotes: 'Trattamento cardine nella sala parto in caso di tossicità da bupivacaina o ropivacaina.'
  },
  'n-acetilcisteina': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'ANTIDOTO SALVAVITA (Cat. B): Attraversa la placenta e protegge anche il feto dalla necrosi epatica in caso di overdose materna da paracetamolo. Da somministrare tempestivamente nelle prime 8 ore.',
    lactation: 'Compatibile.',
    trimesterNotes: 'Salvavita per madre e feto.'
  },
  'pantoprazolo': {
    fdaCategory: 'B',
    riskLevel: 'safe',
    clinicalSummary: 'COMPATIBILE (Cat. B): Inibitore di pompa protonica sicuro in gravidanza per emorragia digestiva superiore e profilassi dell\'aspirazione acida (sindrome di Mendelson).',
    lactation: 'Compatibile con l\'allattamento al seno.',
    trimesterNotes: 'Sicuro in tutti i trimestri.'
  }
};

/**
 * Fallback generator for any drug id
 */
export function getPregnancySafety(drugId: string): PregnancySafety {
  if (PREGNANCY_DATA[drugId]) {
    return PREGNANCY_DATA[drugId];
  }
  return {
    fdaCategory: 'C',
    riskLevel: 'caution',
    clinicalSummary: 'CAUTELA: Dati clinici specifici in gravidanza limitati. Somministrare solo se il beneficio atteso per la madre supera i potenziali rischi per il feto.',
    lactation: 'Valutare il rapporto rischio/beneficio durante l\'allattamento.'
  };
}

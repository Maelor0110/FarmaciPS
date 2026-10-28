export interface EmergencyProtocolStep {
  stepNumber: number;
  title: string;
  action: string;
  drugsInvolved: string[];
  alert?: string;
}

export interface EmergencyProtocol {
  id: string;
  title: string;
  category: string;
  guidelineSource: string;
  summary: string;
  steps: EmergencyProtocolStep[];
}

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'als-arrest',
    title: 'Arresto Cardiaco ALS (Advanced Life Support)',
    category: 'Arresto Cardiaco / ACLS',
    guidelineSource: 'ERC Guidelines 2021 / 2025',
    summary: 'Sequenza farmacologica per ritmi defibrillabili (FV/TV senza polso) e non defibrillabili (PEA/Asistolia) nell\'adulto.',
    steps: [
      {
        stepNumber: 1,
        title: 'Verifica Ritmo e Shock se FV/TV',
        action: 'Iniziare RCP immediata 30:2 o compressioni continue con via aerea avanzata. Se FV/TV: defibrillare a 150-200 J bifasico e riprendere immediatamente RCP per 2 minuti.',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Adrenalina 1 mg EV/IO',
        action: 'In PEA/Asistolia: somministrare 1 mg EV/IO immediatamente appena reperito l\'accesso venoso. In FV/TV: somministrare 1 mg dopo il 3° shock, poi ogni 3-5 minuti (ogni 2 cicli di RCP).',
        drugsInvolved: ['adrenalina'],
        alert: 'Non interrompere il massaggio cardiaco per la somministrazione. Eseguire sempre flush di 20 ml SF.'
      },
      {
        stepNumber: 3,
        title: 'Amiodarone (o Lidocaina) dopo 3° Shock in FV/TV',
        action: 'Se FV/TV persiste dopo il 3° shock: somministrare Amiodarone 300 mg EV/IO in bolo rapido diluito. Se ancora refrattaria dopo il 5° shock: ulteriore bolo da 150 mg.',
        drugsInvolved: ['amiodarone'],
        alert: 'Alternativa accettata di pari livello: Lidocaina 100 mg EV (1-1.5 mg/kg) dopo 3° shock + 50 mg dopo 5° shock.'
      },
      {
        stepNumber: 4,
        title: 'Identificazione Cause Reversibili (4I & 4T)',
        action: 'Trattare Ipossia, Ipovolemia, Ipo/Iperkaliemia (Calcio Cloruro 10 ml + Bicarbonato se iperK), Ipotermia, Pneumotorace iperteso, Tamponamento cardiaco, Tossici (Naloxone se oppioidi), Trombosi coronarica o polmonare (Alteplase se sospetta EP massiva).',
        drugsInvolved: ['calcio-cloruro', 'sodio-bicarbonato', 'naloxone', 'alteplase']
      }
    ]
  },
  {
    id: 'shock-settico',
    title: 'Sepsi Grave & Shock Settico (1-Hour Bundle)',
    category: 'Shock & Ipotensione',
    guidelineSource: 'Surviving Sepsis Campaign 2021 / 2024',
    summary: 'Interventi tempo-dipendenti raccomandati entro i primi 60 minuti dal riconoscimento dell\'ipotensione settica.',
    steps: [
      {
        stepNumber: 1,
        title: 'Lattati ed Emocolture Immediate',
        action: 'Dosare lattati arteriosi con EGA; prelevare 2 set di emocolture (almeno 4 flaconi per aerobi/anaerobi) prima dell\'avvio degli antibiotici.',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Antibioticoterapia ad Ampio Spettro entro 1 ora',
        action: 'Avviare tempestivamente antibiotico ad ampio spettro EV: Piperacillina/Tazobactam 4.5 g EV (infusione estesa 3-4h) o Meropenem 1-2 g EV (se rischio ESBL/nosocomiale) o Ceftriaxone 2 g EV.',
        drugsInvolved: ['piperacillina-tazobactam', 'meropenem', 'ceftriaxone'],
        alert: 'Ogni ora di ritardo nella somministrazione dell\'antibiotico appropriato nello shock aumenta la mortalità del 7-8%.'
      },
      {
        stepNumber: 3,
        title: 'Rianimazione con Fluidi & Noradrenalina Precoce',
        action: 'Infondere 30 ml/kg di cristalloidi bilanciati (o Fisiologica) entro le prime 3 ore per ipotensione o lattati >= 4 mmol/L. Se PAM < 65 mmHg o diastolica < 40 mmHg, NON aspettare la fine dei fluidi: iniziare Noradrenalina tempestivamente (0.05-1.0 mcg/kg/min).',
        drugsInvolved: ['noradrenalina'],
        alert: 'Consentita l\'infusione temporanea periferica di Noradrenalina in vena di grosso calibro nelle prime 2-4 ore mentre si allestisce il CVC.'
      },
      {
        stepNumber: 4,
        title: 'Corticosteroidi nello Shock Refrattario',
        action: 'Se la dose di Noradrenalina supera 0.25 mcg/kg/min per mantenere PAM >= 65 mmHg, avviare Idrocortisone 200 mg/die (50 mg ogni 6 ore o infusione continua).',
        drugsInvolved: ['idrocortisone']
      }
    ]
  },
  {
    id: 'epa-ipertensivo',
    title: 'Edema Polmonare Acuto (EPA) Ipertensivo',
    category: 'EPA & Insufficienza Cardiaca',
    guidelineSource: 'ESC Heart Failure Guidelines 2023',
    summary: 'Decongestione rapida e riduzione del post-carico ventricolare sinistro con nitrati ad alte dosi e ventilazione non invasiva.',
    steps: [
      {
        stepNumber: 1,
        title: 'Posizione Seduta & CPAP Precoce',
        action: 'Posizionare il paziente con il tronco a 90°. Avviare immediatamente CPAP con casco o maschera (PEEP iniziale 5-7.5 cmH2O, titolabile a 10 cmH2O; FiO2 per target SpO2 92-96%).',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Nitrati EV ad Alte Dosi (Trinitrina)',
        action: 'Se PAS > 110 mmHg: iniziare Nitroglicerina EV a 20-40 mcg/min e titolare rapidamente ogni 3-5 minuti fino a 100-200 mcg/min per abbattere il post-carico ventricolare.',
        drugsInvolved: ['nitroglicerina'],
        alert: 'Controindicazione assoluta se assunzione di inibitori PDE-5 (Sildenafil nelle 24h, Tadalafil nelle 48h) o infarto del ventricolo destro!'
      },
      {
        stepNumber: 3,
        title: 'Furosemide EV Mirata',
        action: 'Somministrare Furosemide EV in bolo lento: 20-40 mg se paziente naive, oppure dose pari a 1 - 2 volte la dose domiciliare orale. Valutare diuresi a 2 ore (target > 100 ml/h).',
        drugsInvolved: ['furosemide']
      },
      {
        stepNumber: 4,
        title: 'De-escalation Oppioidi',
        action: 'Non somministrare Morfina di routine: le linee guida ESC considerano l\'uso routinario di oppiacei di Classe III (non raccomandato) per aumentato rischio di intubazione e mortalità.',
        drugsInvolved: ['morfina-cloridrato']
      }
    ]
  },
  {
    id: 'fa-acuta',
    title: 'Fibrillazione Atriale ad Elevata Risposta Ventricolare',
    category: 'Aritmie & Cardioversione',
    guidelineSource: 'ESC AF Guidelines 2024',
    summary: 'Algoritmo decisionale per il controllo rapido della frequenza o del ritmo in emergenza.',
    steps: [
      {
        stepNumber: 1,
        title: 'Valutazione Stabilità Emodinamica',
        action: 'Cercare segni di instabilità: shock, ipotensione (PAS < 90), angina ingravescente, edema polmonare o sincope. Se INSTABILE: Cardioversione Elettrica Sincronizzata immediata preceduta da breve sedazione con Propofol o Midazolam.',
        drugsInvolved: ['propofol', 'midazolam']
      },
      {
        stepNumber: 2,
        title: 'Paziente Stabile con Frazione di Eiezione Preservata (LVEF >= 40%)',
        action: 'Prima scelta: Beta-bloccante EV cardioselettivo: Metoprololo 2.5-5 mg EV lenti in 2 minuti (ripetibile fino a 15 mg) oppure Esmololo bolo 0.5 mg/kg + infusione 50-200 mcg/kg/min.',
        drugsInvolved: ['metoprololo-ev', 'esmololo']
      },
      {
        stepNumber: 3,
        title: 'Paziente con Insufficienza Cardiaca Severa (LVEF < 40%) o Congestione',
        action: 'I beta-bloccanti EV sono controindicati in fase di scompenso conclamato. Farmaco di scelta: Amiodarone 300 mg EV in 20-60 min in G5% oppure Digossina 0.25-0.5 mg EV lenti.',
        drugsInvolved: ['amiodarone']
      }
    ]
  },
  {
    id: 'inversione-anticoagulanti',
    title: 'Sanguinamenti Acuti & Manovre Invasive in Anticoagulati',
    category: 'Emorragia & Inversione Anticoagulanti',
    guidelineSource: 'Linee Guida ISTH 2024 · ESC AF 2024 · ESAIC 2024 · ACC 2020',
    summary: 'Algoritmo unificato per la gestione delle emorragie maggiori e della chirurgia non procrastinabile (<6h, 6-24h, 24-48h) in corso di DOAC, AVK o Eparine. Definire la gravità emorragica ed eseguire reverse entro 60 minuti nei casi critici.',
    steps: [
      {
        stepNumber: 1,
        title: 'Inquadramento del Rischio & Cut-Off di Laboratorio Urgente',
        action: 'Sospensione immediata dell\'anticoagulante. Reintegro volemico. Prelevare in provetta con citrato (tappo azzurro): INR per AVK, attività anti-Xa specifica per Apixaban/Rivaroxaban/Edoxaban/EBPM, tempo di trombina diluito (dTT) per Dabigatran. Pre-allertare il Laboratorio a Risposta Rapida (referto < 60 min). Cut-off DOAC: <30 ng/mL sicuro per alto rischio/neurochirurgia/trombolisi; 30-50 ng/mL sicuro solo per basso rischio; >50 ng/mL richiede reverse. AVK: INR <1.5 sicuro per alto rischio; INR >2.0 non sicuro. N.B.: L\'attesa dell\'esito del laboratorio non deve ritardare il trattamento salvavita.',
        drugsInvolved: ['4f-pcc', 'idarucizumab', 'vitamina-k1', 'protamina-solfato']
      },
      {
        stepNumber: 2,
        title: 'DOAC - Dabigatran (Inibitore Diretto IIa)',
        action: 'Nei sanguinamenti maggiori o chirurgia emergenza (<6h): somministrare IDARUCIZUMAB (Praxbind) 5 g EV totali (2 flaconi da 2.5 g / 50 mL a 15 minuti di distanza in bolo lento in 5-10 minuti ciascuno). Seconda scelta se non disponibile: 4F-CCP 25 UI/kg EV (ripetibile +25 UI/kg). Se assunzione recente entro 2-4 ore: Carbone Attivo 50 g da SNG. Se IRA grave o oliguria: valutare emodialisi d\'urgenza con il nefrologo (80% escrezione renale, 30% legame proteico).',
        drugsInvolved: ['idarucizumab', '4f-pcc'],
        alert: 'Idarucizumab ha efficacia immediata con rischio di complicanze trombotiche post-reverse del 4-5% a 30 giorni.'
      },
      {
        stepNumber: 3,
        title: 'DOAC - Inibitori Xa (Apixaban, Rivaroxaban, Edoxaban)',
        action: 'Prima scelta: 4F-CCP (Complesso Protrombinico a 4 Fattori). Sanguinamento intracranico (ICH) o neurochirurgia/cardiochirurgia: 50 UI/kg EV in bolo lento (<8 mL/min). Qualsiasi altro sanguinamento maggiore o chirurgia alto rischio: 25 UI/kg EV (ripetibile +25 UI/kg se persiste sanguinamento). Tetto massimo: 5000 UI totali. Se assunzione entro 2-4 ore: Carbone Attivo 50 g da SNG. Se politrauma entro 3 ore o sede critica: Acido Tranexamico 10 mg/kg o 1 g EV in 10-15 min. Nota: Andexanet alfa ritirato da FDA a fine 2025 per eccesso di complicanze trombotiche e non rimborsato SSN (classe C).',
        drugsInvolved: ['4f-pcc', 'acido-tranexamico'],
        alert: 'Nei sanguinamenti minori o chirurgia differibile a 24-48 ore la reverse con CCP NON è indicata (sola sospensione spontanea).'
      },
      {
        stepNumber: 4,
        title: 'AVK - Warfarin & Acenocumarolo (Sintrom)',
        action: 'Prima scelta: 4F-CCP dosato su INR reale (INR 2-3.9: 25 UI/kg; INR 4-6: 35 UI/kg; INR >6: 50 UI/kg; max 5000 UI) associato TASSATIVAMENTE a Vitamina K1 (Fitomenadione) 10 mg EV lenta in 100 mL SF in 30 min. Seconda scelta: 3F-CCP (30-50 UI/kg) + Vit K1 10 mg EV. Plasma Fresco Congelato (10-20 mL/kg) solo se CCP non reperibili o coagulopatia da consumo. Controllo INR subito a fine infusione CCP e a 12 ore.',
        drugsInvolved: ['4f-pcc', 'vitamina-k1'],
        alert: 'La Vitamina K endovena è fondamentale: il CCP decade dopo 6-8 ore e senza Vit K il paziente rischia severo rimbalzo emorragico!'
      },
      {
        stepNumber: 5,
        title: 'Eparine (ENF & EBPM) e Prevenzione Trombosi Post-Reverse',
        action: 'ENF: se somministrata da < 3 ore -> Protamina Solfato 1 mg ogni 100 UI di eparina (usualmente 25 mg in emergenza, max 50 mg in 10 min). Se somministrata da > 3 ore: nessuna reverse. EBPM: se assunta da < 8 ore -> Protamina 1 mg ogni 100 UI di EBPM (usualmente 25 mg = 1/2 fiala da 50 mg/5 mL lenta in 10 min; ripetibile se sanguinamento attivo a 0.5 mg/100 UI). Se assunta da 8-12 ore: 0.5 mg/100 UI. Monitorare il rischio di Trombosi Post-Reverse (3-8% a 30 giorni) e reintrodurre la profilassi con eparina a basso dosaggio non appena l\'emostasi è stabilizzata.',
        drugsInvolved: ['protamina-solfato', 'enoxaparina']
      }
    ]
  },
  {
    id: 'rsi-intubazione',
    title: 'Intubazione a Sequenza Rapida (RSI) d\'Emergenza',
    category: 'Sedazione Procedurale & RSI',
    guidelineSource: 'DAS / ERC Airway Guidelines 2023',
    summary: 'Le 7 P dell\'intubazione d\'urgenza con farmaci per induzione e paralisi muscolare immediata.',
    steps: [
      {
        stepNumber: 1,
        title: 'Preossigenazione (3-5 minuti)',
        action: 'Ossigeno al 100% con maschera con reservoir ad alti flussi (15 L/min) o CPAP/High-Flow per portare la saturazione a denitrogenare la capacità funzionale residua.',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Pre-trattamento (Opzionale)',
        action: 'Fentanil 2-3 mcg/kg EV lento (se trauma cranico, stroke o dissezione aortica per prevenire il picco simpatico pressorio alla laringoscopia).',
        drugsInvolved: ['fentanil']
      },
      {
        stepNumber: 3,
        title: 'Induzione Ipnotica',
        action: 'Se paziente ipoteso o in shock: Ketamina 1.5 - 2.0 mg/kg EV. Se paziente normoteso/iperteso stabile: Propofol 1.5 - 2.5 mg/kg EV.',
        drugsInvolved: ['ketamina', 'propofol']
      },
      {
        stepNumber: 4,
        title: 'Paralisi Neuromuscolare Immediata',
        action: 'Rocuronio 1.2 mg/kg EV in bolo rapido (ottime condizioni di intubazione entro 45-60 secondi). Avere pronto al letto Sugammadex 16 mg/kg per reversal di emergenza se CICO.',
        drugsInvolved: ['rocuronio', 'sugammadex'],
        alert: 'MAI somministrare il miorilassante prima che il paziente abbia perso completamente coscienza con l\'ipnotico!'
      }
    ]
  },
  {
    id: 'vertigine-acuta',
    title: 'Sindrome Vestibolare Acuta & Crisi Vertiginosa',
    category: 'Vertigini & Sindromi Vestibolari',
    guidelineSource: 'Bárány Society Consensus · Guidelines for Acute Vestibular Syndrome',
    summary: 'Diagnosi differenziale urgente tra causa periferica (es. neurite vestibolare, VPPB, Menière) e causa centrale (stroke cerebellare/troncoencefalico mediante HINTS exam) e sequenza terapeutica soppressiva vestibolare.',
    steps: [
      {
        stepNumber: 1,
        title: 'Screening Differenziale Centrale vs Periferico (HINTS Protocol)',
        action: 'Eseguire esame HINTS al letto del paziente: Head Impulse test (se normale depone per ictus centrale), Nistagmo (se bidirezionale o verticale depone per centrale), Test of Skew (se skew deviation/disallineamento verticale depone per centrale). Se HINTS positivo per stroke o deficit neurologici focali: attivare Stroke Code per neuroimaging immediata.',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Controllo Nausea e Sintomi Neurovegetativi Incoercibili',
        action: 'In fase iperacuta (< 48-72h): Levosulpiride 25 mg EV lenta in 10 ml SF o IM, oppure Tietilperazina (Torecan) 6.5 mg IM profonda o EV lentissima supino. In alternativa: Dimenidrinato 50-100 mg EV/IM o Ondansetron 4-8 mg EV se vomito refrattario.',
        drugsInvolved: ['levosulpiride', 'tietilperazina', 'dimenidrinato', 'ondansetron'],
        alert: 'Tietilperazina EV rapida causa grave ipotensione ortostatica: infondere solo a paziente a letto.'
      },
      {
        stepNumber: 3,
        title: 'Sedazione Vestibolare e De-escalation Ansiosa',
        action: 'Se intolleranza estrema al movimento o agitazione ansiosa neurovegetativa associata: Diazepam 2 - 5 mg EV lento o gocce per os. Limitare la somministrazione alle prime 24-48 ore per evitare di inibire i meccanismi fisiologici di compenso vestibolare centrale.',
        drugsInvolved: ['diazepam']
      },
      {
        stepNumber: 4,
        title: 'Terapia Specifica Eziologica',
        action: 'Se VPPB (canalolitiasi): manovra liberatoria fisica immediata (Epley o Semont; nessun farmaco indicato). Se Neurite Vestibolare: considerare ciclo breve di corticosteroidi (Metilprednisolone 1 mg/kg die a scalare). Se Idrope/Menière: Betaistina 24 mg bid + dieta iposodica.',
        drugsInvolved: ['betaistina', 'metilprednisolone']
      }
    ]
  },
  {
    id: 'attacco-panico-ansia',
    title: 'Attacco di Panico & Crisi d\'Ansia Acuta',
    category: 'Ansia Acuta & Attacchi di Panico',
    guidelineSource: 'APA Practice Guidelines · NICE Clinical Guideline 113',
    summary: 'Approccio sistematico in pronto soccorso ed emergenza: esclusione tempestiva delle sindromi organiche "red flags" (SCA, embolia polmonare, aritmie, ipoglicemia), de-escalation e terapia ansiolitica mirata.',
    steps: [
      {
        stepNumber: 1,
        title: 'Esclusione delle Emergenze Organiche (Rule-Out)',
        action: 'Valutazione immediata parametri vitali (SpO2, FC, PA), ECG a 12 derivazioni tempestivo (per escludere SCA o aritmie parossistiche), stick glicemico (escludere neuroglicopenia) ed EGA se polipnea/parestesie acrali (tipica alcalosi respiratoria da iperventilazione).',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'De-escalation Verbale e Tecniche di Respirazione',
        action: 'Isolare il paziente in ambiente tranquillo a basso stimolo acustico/visivo. Rassicurazione ferma ed empatica. Guida al respiro controllato (tecnica del respiro quadrato o 4-7-8) per contrastare l\'iperventilazione e l\'alcalosi ipocapnica senza utilizzare sacchetti di carta.',
        drugsInvolved: []
      },
      {
        stepNumber: 3,
        title: 'Farmacoterapia Ansiolitica Rapida di Prima Linea',
        action: 'Se l\'ansia acuta e l\'iperarousal persistono: Alprazolam 0.5 - 1.0 mg sublinguale (azione in 10-15 min) oppure Lorazepam 1 - 2.5 mg sublinguale o orosolubile. Se rifiuto per os o vomito: Diazepam 5 - 10 mg EV molto lento in vena ampia.',
        drugsInvolved: ['alprazolam', 'lorazepam', 'diazepam'],
        alert: 'Non superare le dosi raccomandate ed evitare la prescrizione cronica continuativa alla dimissione.'
      },
      {
        stepNumber: 4,
        title: 'Alternativa Non-Benzodiazepinica',
        action: 'Nei pazienti con anamnesi di dipendenza da sostanze o insufficienza respiratoria lieve: Idrossizina 25 - 50 mg per os (antistaminico H1 ansiolitico non-benzodiazepinico, privo di potenziale d\'abuso, previo controllo del QTc all\'ECG).',
        drugsInvolved: ['idrossizina']
      }
    ]
  },
  {
    id: 'bpco-riacutizzata',
    title: 'Riacutizzazione Grave di BPCO (AECOPD)',
    category: 'BPCO Riacutizzata',
    guidelineSource: 'GOLD Global Strategy for COPD 2024 · ERS Guidelines',
    summary: 'Gestione intensiva della crisi bronco-ostruttiva ipercapnica: ossigenoterapia titolata controllata, broncodilatazione massimale combinata SABA+SAMA, steroidi sistemici ed eventuale NIV precoce.',
    steps: [
      {
        stepNumber: 1,
        title: 'Ossigenoterapia Titolata Controllata (Target SpO2 88-92%)',
        action: 'NON somministrare O2 ad alti flussi non controllati! Usare maschera di Venturi titolata per target SpO2 88-92%. L\'iperossia induce soppressione del drive ipossico, aumento dello spazio morto (effetto Haldane) e narcosi ipercapnica letale con coma respiratorio.',
        drugsInvolved: [],
        alert: 'Eseguire emogasanalisi arteriosa basale immediata e ripetere dopo 30-60 minuti!'
      },
      {
        stepNumber: 2,
        title: 'Broncodilatatori Inalatori Combinati SABA + SAMA',
        action: 'Salbutamolo 2.5-5 mg + Ipratropio bromuro 0.5 mg (Breva) nebulizzati tramite aria compressa (se ipercapnico) con O2 in cannule nasali a parte. Ripetere ogni 20-30 minuti per le prime 2-3 dosi, poi ogni 4-6 ore.',
        drugsInvolved: ['salbutamolo-ipratropio', 'salbutamolo', 'ipratropio-bromuro']
      },
      {
        stepNumber: 3,
        title: 'Corticosteroidi Sistemici Precoci',
        action: 'Metilprednisolone 40 mg EV in bolo (o Prednisone 40 mg per os se deglutizione valida) una volta al giorno per 5 giorni. Accorcia la degenza, riduce il fallimento terapeutico e accelera il recupero funzionale.',
        drugsInvolved: ['metilprednisolone'],
        alert: 'Durata massima 5 giorni: cicli più lunghi non aumentano l\'efficacia ma incrementano il rischio di sepsi e miopatia.'
      },
      {
        stepNumber: 4,
        title: 'Antibioticoterapia Mirata & Supporto Ventilatorio Non Invasivo (NIV)',
        action: 'Se presenti i 3 criteri di Anthonisen (aumento dispnea, aumento volume espettorato, purulenza espettorato) o ventilazione meccanica: Amoxicillina/Clavulanico 1g/200mg tid EV o Ceftriaxone 2g die. Se acidosi respiratoria (pH < 7.35 e PaCO2 > 45 mmHg): avviare tempestivamente ventilazione non invasiva (NIV in BiPAP/PSV+PEEP). Se broncospasmo refrattario estremo: considerare Aminofillina EV lenta con monitoraggio teofillinemia.',
        drugsInvolved: ['ceftriaxone', 'piperacillina-tazobactam', 'aminofillina']
      }
    ]
  },
  {
    id: 'asma-acuto-grave',
    title: 'Asma Bronchiale Acuto Grave & Status Asthmaticus',
    category: 'Asma Acuto',
    guidelineSource: 'GINA Global Strategy for Asthma Management 2024 · BTS/SIGN Guidelines',
    summary: 'Protocollo intensivo tempo-dipendente per il broncospasmo asfittico severo: ossigeno target 93-95%, SABA continui, ipratropio, steroidi EV, magnesio solfato EV e adrenalina nell\'asma near-fatal.',
    steps: [
      {
        stepNumber: 1,
        title: 'Ossigeno ad Alti Flussi & Valutazione Severità (PEF)',
        action: 'Ossigeno con maschera ad alti flussi per target SpO2 93-95%. Riconoscere i segni di asma gravissimo/near-fatal: torace silente (silent chest), bradicardia, cianosi, esaurimento muscolare, incapacità a parlare, PaCO2 normale o aumentata all\'EGA (segno di affaticamento estremo!).',
        drugsInvolved: []
      },
      {
        stepNumber: 2,
        title: 'Beta-2 Agonisti Inalatori Frequenti + Ipratropio',
        action: 'Salbutamolo 5 mg inalatorio ogni 20 minuti per 3 cicli nella prima ora (oppure nebulizzazione continua a 10-15 mg/h con camera distanziatrice/nebulizzatore ad alto volume) associato a Ipratropio Bromuro 0.5 mg ogni 20 minuti per 3 dosi.',
        drugsInvolved: ['salbutamolo', 'ipratropio-bromuro', 'salbutamolo-ipratropio']
      },
      {
        stepNumber: 3,
        title: 'Corticosteroidi Sistemici Endovena Immediati',
        action: 'Metilprednisolone 40 - 80 mg EV in bolo (o Idrocortisone 100 - 200 mg EV) somministrati entro la prima ora. L\'effetto si manifesta dopo 4 ore ma è essenziale per risolvere l\'edema e l\'infiltrato infiammatorio mucoso.',
        drugsInvolved: ['metilprednisolone', 'idrocortisone']
      },
      {
        stepNumber: 4,
        title: 'Magnesio Solfato EV per Ostruzione Grave Refrattaria',
        action: 'Se dopo 1 ora SpO2 < 92% o PEF < 50%: infondere SOLFATO DI MAGNESIO 2 g EV in 100 ml di Fisiologica in 20 minuti. Riduce marcatamente la necessità di intubazione tracheale.',
        drugsInvolved: ['magnesio-solfato-ev', 'magnesio-solfato']
      },
      {
        stepNumber: 5,
        title: 'Asma Near-Fatal: Adrenalina IM/EV e Ketamina',
        action: 'Se arresto respiratorio imminente o torace silente con ipoventilazione severa: somministrare ADRENALINA 0.3 - 0.5 mg IM (1:1000) nella coscia (oppure infusione EV titolata 0.05-0.2 mcg/kg/min). Se necessaria intubazione d\'urgenza (RSI): Ketamina 1.5 - 2 mg/kg EV (potente broncodilatatore adrenergico) + Rocuronio 1.2 mg/kg.',
        drugsInvolved: ['adrenalina', 'ketamina', 'rocuronio'],
        alert: 'Evitare l\'intubazione se non strettamente indispensabile: rischio elevato di barotrauma, pneumotorace iperteso e iperinflazione dinamica (auto-PEEP).'
      }
    ]
  },
  {
    id: 'anafilassi-reazioni-allergiche',
    title: 'Anafilassi & Reazioni Allergiche Severe',
    category: 'Reazioni Allergiche & Anafilassi',
    guidelineSource: 'EAACI Anaphylaxis Guidelines 2022 · Resuscitation Council UK / ERC 2021/2025',
    summary: 'Algoritmo salvavita per le reazioni da degranulazione mastocitaria acuta: Adrenalina IM tempestiva al vasto laterale, gestione vie aeree e volemia, antistaminici e steroidi EV per prevenire reazioni bifasiche.',
    steps: [
      {
        stepNumber: 1,
        title: 'ADRENALINA IM IMMEDIATA (Primo Farmaco Salvavita)',
        action: 'NON RITARDARE PER NESSUN MOTIVO! Somministrare ADRENALINA 0.5 mg IM pura (0.5 ml della fiala 1:1000 da 1 mg/ml) nella faccia antero-laterale della coscia (vasto laterale). Ripetibile ogni 5-15 minuti in caso di risposta insufficiente. Posizionare il paziente supino con gambe sollevate (MAI farlo alzare in piedi in modo brusco: rischio di sindrome del ventricolo vuoto con arresto cardiaco!).',
        drugsInvolved: ['adrenalina'],
        alert: 'Non somministrare adrenalina EV in bolo diretto nel paziente con polso (rischio aritmie fatali e rottura intracranica). Usare SOLO la via IM antero-laterale!'
      },
      {
        stepNumber: 2,
        title: 'Vie Aeree, Ossigeno e Rianimazione Volemica Aggressiva',
        action: 'Ossigeno ad alti flussi (15 L/min con reservoir). Se ipotensione marcata o shock anafilattico: infondere rapidamente cristalloidi (SF o Ringer) 1000 - 2000 ml EV a getto rapido (massiva vasocostrizione e perdita di volume extravascolare per permeabilità capillare aumentata fino al 35% del volume circolante in 10 minuti!).',
        drugsInvolved: []
      },
      {
        stepNumber: 3,
        title: 'Antistaminici Anti-H1 di Seconda Linea',
        action: 'DOPO aver somministrato l\'adrenalina: Clorfenamina (Trimeton) 10 mg EV lenta in 2-3 minuti (o IM) per contrastare il prurito, l\'orticaria e l\'angioedema periferico. In alternativa Prometazina 25-50 mg IM profonda.',
        drugsInvolved: ['clorfenamina', 'prometazina']
      },
      {
        stepNumber: 4,
        title: 'Corticosteroidi Sistemici per la Prevenzione della Reazione Bifasica',
        action: 'Metilprednisolone 1 - 2 mg/kg EV (solitamente 80-125 mg) oppure Desametasone 8 - 16 mg EV lenti. I cortisonici hanno un\'insorgenza lenta (2-6 ore) e NON sono salvavita nella fase acuta, ma riducono l\'incidenza e la severità delle reazioni anafilattiche bifasiche tardive.',
        drugsInvolved: ['metilprednisolone', 'desametasone'],
        alert: 'Mantenere il paziente in osservazione monitorata in Pronto Soccorso per almeno 6-8 ore dopo la risoluzione (12-24 ore se reazione grave o asma concomitante).'
      }
    ]
  }
];

/**
 * Motore di Calcolo e Decision Support per il Protocollo Reversal Anticoagulanti
 * Basato sulle linee guida internazionali di emostasi e medicina d'urgenza (ISTH, ESC, ESAIC, ACC)
 * Esegue le regole di stratificazione del rischio emorragico/trombotico, cut-off plasmatici
 * e dosaggi esatti sul peso reale con computo dei flaconi/fiale.
 */

export type AnticoagulantType =
  | 'warfarin_aceno'
  | 'dabigatran'
  | 'apixaban'
  | 'rivaroxaban'
  | 'edoxaban'
  | 'enf'
  | 'ebpm'
  | 'fondaparinux';

export type ClinicalScenario = 'bleeding' | 'procedure';

export type BleedingSeverity = 'major_ich' | 'major_other' | 'crnmb' | 'minor';

export type SurgeryUrgency = 'emergency' | 'urgency' | 'semi_urgency';

export type ProcedureBleedingRisk = 'high' | 'low';

export interface PatientParameters {
  scenario: ClinicalScenario;
  anticoagulant: AnticoagulantType;
  weightKg: number;
  
  // Specifico per scenario bleeding
  bleedingSeverity?: BleedingSeverity;
  
  // Specifico per scenario procedure
  urgencyTiming?: SurgeryUrgency;
  procedureRisk?: ProcedureBleedingRisk;
  
  // Parametri laboratoristici / temporali
  inrValue?: number; // per AVK
  doacLevelNgMl?: number | 'unknown' | 'less_30' | 'between_30_50' | 'between_50_100' | 'more_50';
  hoursSinceLastDose?: number;
  
  // Co-fattori
  recentIngestionWithin4Hours?: boolean; // per carbone attivo
  coAntiplateletOrThrombocytopenia?: boolean; // piastrine < 50.000 o DAPT
  isTraumaWithin3Hours?: boolean; // per TXA
}

export interface ReversalCalculationResult {
  decision: 'INDICATED' | 'CONSIDER' | 'NOT_INDICATED';
  decisionLabel: string;
  decisionColor: 'emerald' | 'amber' | 'red';
  primaryAgent: {
    name: string;
    targetDoseText: string;
    totalDoseCalculated: string;
    vialsCountText: string;
    infusionSpeed: string;
    notes: string;
  } | null;
  secondLineAgent: {
    name: string;
    targetDoseText: string;
    totalDoseCalculated: string;
    vialsCountText: string;
    notes: string;
  } | null;
  adjuvantMeasures: {
    action: string;
    detail: string;
    urgency: 'high' | 'moderate' | 'info';
  }[];
  labFollowup: {
    test: string;
    timing: string;
    cutoffs: string;
  };
  thrombosisPostReverseWarning: {
    riskRate: string;
    recommendations: string[];
  };
  summaryText: string;
}

export function calculateReversalProtocol(params: PatientParameters): ReversalCalculationResult {
  const weight = Math.max(30, Math.min(180, params.weightKg || 70));
  const isBleeding = params.scenario === 'bleeding';

  // 1. AVK (Warfarin / Acenocumarolo)
  if (params.anticoagulant === 'warfarin_aceno') {
    const inr = params.inrValue ?? 3.5;

    if (isBleeding) {
      if (params.bleedingSeverity === 'minor') {
        let vitKAdvice = 'Generalmente sufficiente sospendere temporaneamente la terapia AVK.';
        if (inr > 10) {
          vitKAdvice = 'INR > 10 senza emorragia maggiore: somministrare Vitamina K 2-5 mg per os (o 5-10 mg EV lento). Non usare CCP.';
        } else if (inr >= 5) {
          vitKAdvice = 'INR 5-10: sospendere 1 dose e considerare Vitamina K 1-2.5 mg per os.';
        }

        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE CON CCP NON INDICATA',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sospensione Temporanea AVK',
              detail: vitKAdvice,
              urgency: 'moderate',
            },
            {
              action: 'Trattamento Emostatico Locale',
              detail: 'Ricercare e trattare le cause locali (compressione, tamponamento, cauterizzazione ORL).',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'INR di controllo',
            timing: 'Dopo 24-48 ore se somministrata Vit K orale; dopo 2-3 giorni se sola sospensione.',
            cutoffs: 'Mantenere INR nel range terapeutico stabilito dal centro TAO.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Nullo (nessun CCP somministrato)',
            recommendations: ['Rivalutare compliance ed errori posologici.'],
          },
          summaryText: 'Nel sanguinamento minore da AVK la somministrazione di complessi protrombinici non è raccomandata per evitare rischi trombotici ingiustificati.',
        };
      }

      // CRNMB vs MAGGIORE
      const isMajor = params.bleedingSeverity === 'major_ich' || params.bleedingSeverity === 'major_other';
      const decision = isMajor ? 'INDICATED' : 'CONSIDER';

      // Calcolo dosaggio 4F-CCP secondo INR
      let uPerKg = 25;
      if (inr >= 6.0) {
        uPerKg = 50;
      } else if (inr >= 4.0) {
        uPerKg = 35;
      } else {
        uPerKg = 25;
      }

      const rawUnits = weight * uPerKg;
      const totalUnits = Math.min(5000, rawUnits);
      const vials500 = Math.ceil(totalUnits / 500);

      const measures: ReversalCalculationResult['adjuvantMeasures'] = [
        {
          action: 'Vitamina K1 (Fitomenadione) 10 mg EV lento',
          detail: 'OBBLIGATORIA CONTESTUALMENTE al CCP: diluire 10 mg (1 fiala) in 100 mL SF e infondere in 30 min (max 1 mL/min). Il CCP dura 6-8 ore; la Vitamina K assicura la sintesi endogena dopo 4-6 ore ed evita il rimbalzo emorragico.',
          urgency: 'high',
        },
        {
          action: 'Reintegro Volemico & Trasfusione',
          detail: 'Cristalloidi bilanciati ed Emazie Concentrate se instabilità emodinamica o Hb < 7-8 g/dL.',
          urgency: 'high',
        },
      ];

      if (params.isTraumaWithin3Hours) {
        measures.push({
          action: 'Acido Tranexamico (TXA)',
          detail: '10 mg/kg o 1 g EV in 100 mL SF in 10-15 min se politrauma entro 3 ore dall\'evento (non raccomandato per emorragie digestive isolate).',
          urgency: 'moderate',
        });
      }

      return {
        decision: decision,
        decisionLabel: isMajor ? 'REVERSE FARMACOLOGICA INDICATA' : 'REVERSE FARMACOLOGICA DA CONSIDERARE',
        decisionColor: isMajor ? 'red' : 'amber',
        primaryAgent: {
          name: 'Complesso Protrombinico a 4 Fattori (4F-CCP - Confidex / Octaplex / Prothromplex)',
          targetDoseText: `${uPerKg} UI/kg (INR attuale: ${inr})`,
          totalDoseCalculated: `${totalUnits} UI totali (sul peso di ${weight} kg; max 5000 UI)`,
          vialsCountText: `${vials500} flaconcini da 500 UI / 20 mL`,
          infusionSpeed: 'Bolo endovenoso lento: velocità non superiore a 8 mL/min (circa 3 flaconi in 10-15 minuti). Portare a temperatura ambiente prima dell\'uso.',
          notes: 'Il 4F-CCP garantisce ripristino immediato dei fattori II, VII, IX, X, Proteina C e S entro 5 minuti dal termine infusione.',
        },
        secondLineAgent: {
          name: 'Complesso Protrombinico a 3 Fattori (3F-CCP) oppure Plasma Fresco Congelato (PFC)',
          targetDoseText: inr > 4 ? '50 UI/kg per 3F-CCP' : '30 UI/kg per 3F-CCP',
          totalDoseCalculated: `${Math.min(5000, weight * (inr > 4 ? 50 : 30))} UI (3F-CCP) oppure ${weight * 15} mL di PFC (10-20 mL/kg)`,
          vialsCountText: 'PFC solo se CCP non reperibili o in shock emorragico con coagulopatia da consumo.',
          notes: 'Il PFC ha efficacia emostatica più lenta (3-6 ore), richiede scongelamento e rischia sovraccarico volemico / TRALI.',
        },
        adjuvantMeasures: measures,
        labFollowup: {
          test: 'Controllo INR seriato',
          timing: 'Eseguire prelievo INR SUBITO DOPO il termine dell\'infusione di CCP e a distanza di 12 ore.',
          cutoffs: 'Se INR a fine infusione > 1.5: valutare una seconda somministrazione di 4F-CCP con dosaggio guidato dall\'INR residuo.',
        },
        thrombosisPostReverseWarning: {
          riskRate: '3 - 8% nei primi 30 giorni (simile tra 4F-CCP e 3F-CCP)',
          recommendations: [
            'Evitare sovracorrezioni (non superare 5000 UI).',
            'Rivalutare il rischio tromboembolico basale (es. protesi meccanica mitralica o TEV recente).',
            'Reintrodurre la profilassi farmacologica con eparina a basse dosi non appena l\'emostasi locale è stabilizzata.',
          ],
        },
        summaryText: `Paziente in terapia con AVK con INR=${inr}. Indicata somministrazione immediata di 4F-CCP alla dose di ${uPerKg} UI/kg associata tassativamente a Vitamina K1 10 mg EV lenta.`,
      };
    } else {
      // Scenario Procedura Invasiva / Chirurgia in Acuto
      const timing = params.urgencyTiming ?? 'emergency';
      const risk = params.procedureRisk ?? 'high';

      if (timing === 'semi_urgency') {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE CON CCP NON INDICATA (SEMI-URGENZA 24-48 ORE)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sospensione AVK + Vitamina K 10 mg EV',
              detail: 'La sospensione associata a Vitamina K 10 mg EV permette nella finestra di 24-48 ore la normalizzazione spontanea dell\'INR (< 1.5) senza esporre al rischio trombotico dei concentrati.',
              urgency: 'high',
            },
          ],
          labFollowup: {
            test: 'INR prima dell\'intervento',
            timing: 'A 12 e 24 ore dalla somministrazione di Vit K e 2 ore prima della sala operatoria.',
            cutoffs: 'Target procedurale: INR < 1.5 per alto rischio emorragico.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Molto basso con normalizzazione graduale da Vit K.',
            recommendations: ['Monitorare la coagulazione spontanea.'],
          },
          summaryText: 'Intervento differibile tra 24 e 48 ore: è sufficiente la sospensione di AVK e 1 fiala di Vitamina K 10 mg EV lenta.',
        };
      }

      if (timing === 'urgency') {
        // 6-24 ore
        const uPerKg = inr > 6 ? 50 : inr >= 4 ? 35 : 25;
        const totalUnits = Math.min(5000, weight * uPerKg);
        return {
          decision: 'CONSIDER',
          decisionLabel: 'REVERSE CON CCP DA CONSIDERARE (URGENZA 6-24 ORE)',
          decisionColor: 'amber',
          primaryAgent: {
            name: '4F-CCP + Vitamina K 10 mg EV (se intervento non differibile)',
            targetDoseText: `${uPerKg} UI/kg se non è possibile differire oltre`,
            totalDoseCalculated: `${totalUnits} UI`,
            vialsCountText: `${Math.ceil(totalUnits / 500)} flaconcini da 500 UI`,
            infusionSpeed: 'Bolo lento < 8 mL/min.',
            notes: 'Condividere collegialmente con il chirurgo: se possibile attendere 12-18h con sola Vit K 10 mg EV per discesa spontanea dell\'INR; altrimenti eseguire reverse con 4F-CCP.',
          },
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Consulto Collegiale Medico-Chirurgico',
              detail: 'Definire se l\'inizio della procedura può attendere le 12-18 ore con sola somministrazione di Vitamina K 10 mg EV.',
              urgency: 'high',
            },
          ],
          labFollowup: {
            test: 'INR seriato',
            timing: 'Subito dopo eventuale CCP o ogni 6 ore dopo Vit K.',
            cutoffs: 'Target per alto rischio emorragico: INR < 1.5.',
          },
          thrombosisPostReverseWarning: {
            riskRate: '3 - 8% se somministrato CCP.',
            recommendations: ['Tromboprofilassi post-operatoria precoce.'],
          },
          summaryText: 'Intervento in urgenza (6-24h): valutare se procrastinare l\'inizio con sola Vitamina K EV o se somministrare 4F-CCP per chirurgia non differibile.',
        };
      }

      // Emergenza (< 6 ore)
      const uPerKg = inr > 6 ? 50 : inr >= 4 ? 35 : 25;
      const totalUnits = Math.min(5000, weight * uPerKg);
      const vials500 = Math.ceil(totalUnits / 500);

      return {
        decision: 'INDICATED',
        decisionLabel: 'REVERSE FARMACOLOGICA INDICATA (EMERGENZA < 6 ORE)',
        decisionColor: 'red',
        primaryAgent: {
          name: 'Complesso Protrombinico a 4 Fattori (4F-CCP) + Vitamina K 10 mg EV',
          targetDoseText: `${uPerKg} UI/kg (INR attuale: ${inr})`,
          totalDoseCalculated: `${totalUnits} UI totali (max 5000 UI)`,
          vialsCountText: `${vials500} flaconcini da 500 UI / 20 mL`,
          infusionSpeed: 'Bolo lento < 8 mL/min (circa 10-15 minuti).',
          notes: 'Associare sempre Vitamina K 10 mg EV in 30 min per impedire il risanguinamento post-operatorio.',
        },
        secondLineAgent: {
          name: '3F-CCP (30-50 UI/kg) + Vit K 10 mg EV',
          targetDoseText: 'Seconda scelta se 4F-CCP non disponibile',
          totalDoseCalculated: `${Math.min(5000, weight * (inr > 4 ? 50 : 30))} UI`,
          vialsCountText: 'Seguire scheda tecnica',
          notes: 'Stessa sicurezza trombotica, efficacia emostatica leggermente inferiore al 4F.',
        },
        adjuvantMeasures: [
          {
            action: 'Vitamina K 10 mg EV Lento',
            detail: 'Iniziare contestualmente all\'infusione di CCP.',
            urgency: 'high',
          },
        ],
        labFollowup: {
          test: 'INR al termine infusione',
          timing: 'Subito dopo il termine dell\'infusione del CCP, prima di incidere.',
          cutoffs: 'Target: INR < 1.5. Se > 1.5 valutare re-dose CCP.',
        },
        thrombosisPostReverseWarning: {
          riskRate: '3 - 8% a 30 giorni.',
          recommendations: ['Ripresa tromboprofilassi post-operatoria appena l\'emostasi chirurgica è assicurata.'],
        },
        summaryText: `Procedura d'emergenza in paziente con AVK (INR=${inr}): indicata immediata somministrazione di 4F-CCP (${uPerKg} UI/kg) e Vitamina K 10 mg EV.`,
      };
    }
  }

  // 2. DABIGATRAN (Inibitore Diretto Trombina)
  if (params.anticoagulant === 'dabigatran') {
    if (isBleeding) {
      if (params.bleedingSeverity === 'minor') {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (SANGUINAMENTO MINORE)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sospensione / Differimento di 1-2 dosi',
              detail: 'Emivita breve di dabigatran (12-14 ore con funzione renale normale). La sola sospensione ristabilisce l\'emostasi.',
              urgency: 'info',
            },
            {
              action: 'Misure Emostatiche Locali',
              detail: 'Compressione diretta, acido tranexamico topico/collutorio.',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'Funzione renale (Creatinina e CrCl) e dTT se dubbio di accumulo',
            timing: 'Al momento della valutazione.',
            cutoffs: 'L\'eliminazione dipende per l\'80% dal rene.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Nullo',
            recommendations: ['Rivalutare posologia e filtrato glomerulare.'],
          },
          summaryText: 'Nel sanguinamento minore da Dabigatran non è indicata la somministrazione di antidoti.',
        };
      }

      const isMajor = params.bleedingSeverity === 'major_ich' || params.bleedingSeverity === 'major_other';
      const decision = isMajor ? 'INDICATED' : 'CONSIDER';

      const measures: ReversalCalculationResult['adjuvantMeasures'] = [
        {
          action: 'Supporto Emodinamico & Fluidoterapia',
          detail: 'Cristalloidi ed eventuale supporto trasfusionale.',
          urgency: 'high',
        },
      ];

      if (params.recentIngestionWithin4Hours) {
        measures.push({
          action: 'Carbone Attivo 50 g da SNG',
          detail: 'RACCOMANDATO se l\'ultima compressa di Dabigatran è stata assunta nelle ultime 2-4 ore: assorbe il farmaco ancora presente nel tratto gastroenterico e ne blocca l\'assorbimento sistemico.',
          urgency: 'high',
        });
      }

      if (params.isTraumaWithin3Hours || params.bleedingSeverity === 'major_ich') {
        measures.push({
          action: 'Acido Tranexamico (TXA)',
          detail: '10 mg/kg o 1 g EV in 10-15 min (utile in politrauma e sedi critiche; non efficace per emorragie digestive isolate).',
          urgency: 'moderate',
        });
      }

      measures.push({
        action: 'Valutazione Emodialisi (con Nefrologo)',
        detail: 'Dabigatran ha un legame alle proteine plasmatiche basso (~30%) ed eliminazione renale 80%: è l\'unico DOAC dializzabile! Utile se insufficienza renale acuta, oliguria o accumulo severo, in paziente emodinamicamente stabile.',
        urgency: 'moderate',
      });

      return {
        decision: decision,
        decisionLabel: isMajor ? 'REVERSE CON ANTIDOTO SPECIFICO INDICATA' : 'REVERSE FARMACOLOGICA DA CONSIDERARE',
        decisionColor: isMajor ? 'red' : 'amber',
        primaryAgent: {
          name: 'Idarucizumab (Praxbind - Frammento di Anticorpo Monoclonale Umanizzato Fab anti-Dabigatran)',
          targetDoseText: 'Dose fissa di 5 g EV totali (prima scelta)',
          totalDoseCalculated: '5 g EV (2 flaconcini da 2.5 g / 50 mL ciascuno)',
          vialsCountText: '2 flaconcini da 2.5 g / 50 mL',
          infusionSpeed: 'Due infusioni consecutive in bolo lento (circa 5-10 minuti ciascuna) a distanza di 15 minuti l\'una dall\'altra.',
          notes: 'Effetto immediato entro pochi minuti; legame 350 volte più affine della trombina. Ripetibile a ulteriori 5 g dopo 24h solo se recidiva emorragica con dTT elevato.',
        },
        secondLineAgent: {
          name: 'Complesso Protrombinico a 4 Fattori (4F-CCP)',
          targetDoseText: '25 UI/kg EV (seconda scelta se Idarucizumab non disponibile)',
          totalDoseCalculated: `${weight * 25} UI EV (ripetibile con ulteriori +25 UI/kg se sanguinamento persiste)`,
          vialsCountText: `${Math.ceil((weight * 25) / 500)} flaconcini da 500 UI`,
          notes: 'Utilizzare 4F-CCP come alternativa se l\'antidoto specifico Idarucizumab non è immediatamente accessibile nella scorta di emergenza del PS.',
        },
        adjuvantMeasures: measures,
        labFollowup: {
          test: 'Tempo di Trombina Diluito (dTT) / TT e dosaggio Dabigatran',
          timing: 'Eseguire prelievo in provetta azzurro citrato (tempo referto LRR < 60 min).',
          cutoffs: 'L\'attesa dell\'esito del laboratorio non deve ritardare la somministrazione di Idarucizumab.',
        },
        thrombosisPostReverseWarning: {
          riskRate: '4 - 5% di eventi tromboembolici post-reverse a 30 giorni.',
          recommendations: [
            'Monitorare segni di ischemia arteriosa o trombosi venosa.',
            'Riprendere la tromboprofilassi non appena la lesione emorragica è controllata.',
          ],
        },
        summaryText: 'Paziente in terapia con Dabigatran con sanguinamento maggiore: somministrare immediatamente Idarucizumab 5 g EV (2 flaconi da 2.5 g/50 mL).',
      };
    } else {
      // Scenario Procedura Invasiva per Dabigatran
      const timing = params.urgencyTiming ?? 'emergency';
      const doacLevel = params.doacLevelNgMl;

      if (timing === 'semi_urgency') {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (SEMI-URGENZA 24-48 ORE)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sola Sospensione di Dabigatran',
              detail: 'Visto l\'intervallo > 24 ore e l\'emivita di 12-14 ore (se CrCl > 50 mL/min), la sospensione è sufficiente a normalizzare l\'emostasi spontaneamente.',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'Dosaggio livello Dabigatran / dTT',
            timing: 'Prima dell\'ingresso in sala operatoria.',
            cutoffs: 'Livello < 30 ng/mL considerato sicuro per qualsiasi procedura ad alto rischio.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Nullo (eliminazione fisiologica).',
            recommendations: ['Controllare la funzione renale.'],
          },
          summaryText: 'Intervento differibile a 24-48 ore: è sufficiente la sospensione del farmaco.',
        };
      }

      if (timing === 'urgency') {
        return {
          decision: 'CONSIDER',
          decisionLabel: 'REVERSE DA CONSIDERARE / VALUTARE RINVIO 20-24 ORE',
          decisionColor: 'amber',
          primaryAgent: {
            name: 'Idarucizumab 5 g EV (oppure rinvio intervento di 20-24 ore)',
            targetDoseText: 'Se livello compreso tra 50 e 100 ng/mL: raccomandato rinvio di 20-24 ore se clinicamente possibile',
            totalDoseCalculated: 'Se non procrastinabile: 5 g EV (2 flaconi da 2.5 g)',
            vialsCountText: '2 flaconcini da 2.5 g / 50 mL',
            infusionSpeed: 'Due flaconi in bolo lento (5-10 min l\'uno a distanza di 15 min).',
            notes: 'Nel tempo aggiuntivo di 20-24h il livello di Dabigatran scende spontaneamente sotto 50 ng/mL permettendo l\'intervento senza farmaci di reverse.',
          },
          secondLineAgent: {
            name: '4F-CCP 25 UI/kg (ripetibile +25 UI/kg)',
            targetDoseText: 'Se Idarucizumab non disponibile',
            totalDoseCalculated: `${weight * 25} UI`,
            vialsCountText: `${Math.ceil((weight * 25) / 500)} flaconcini da 500 UI`,
            notes: 'Seconda scelta.',
          },
          adjuvantMeasures: [
            {
              action: 'Consulto con il Chirurgo Operatore',
              detail: 'Se il paziente è stabile, concordare il rinvio dell\'intervento a 20-24 ore.',
              urgency: 'high',
            },
          ],
          labFollowup: {
            test: 'Dosaggio concentrazione Dabigatran (dTT)',
            timing: 'Urgente in LRR (< 60 min).',
            cutoffs: 'Tra 50 e 100 ng/mL suggerito rinvio; se < 30 ng/mL sicuro; se > 100 ng/mL valutare reverse se non differibile.',
          },
          thrombosisPostReverseWarning: {
            riskRate: '4-5% se somministrato Idarucizumab.',
            recommendations: ['Tromboprofilassi post-operatoria precoce.'],
          },
          summaryText: 'Dabigatran in chirurgia urgente (6-24h): valutare livello plasmatico e considerare rinvio di 20-24 ore per consentire clearance spontanea.',
        };
      }

      // Emergenza (< 6 ore)
      let isSafe = false;
      if (doacLevel === 'less_30' || (typeof doacLevel === 'number' && doacLevel < 30)) {
        isSafe = true;
      }

      if (isSafe) {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (LIVELLO DABIGATRAN < 30 NG/ML SICURO)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Procedere all\'intervento senza reverse',
              detail: 'Il livello plasmatico < 30 ng/mL è documentato come soglia emostatica sicura anche per neurochirurgia e chirurgia maggiore ad alto rischio emorragico.',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'dTT / TT confermato',
            timing: 'Registrato a cartella clinica.',
            cutoffs: '< 30 ng/mL = valore emostatico sicuro.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Basso',
            recommendations: ['Ripresa post-operatoria programmata.'],
          },
          summaryText: 'Livello documentato < 30 ng/mL: la procedura chirurgica può procedere senza necessità di antidoto.',
        };
      }

      return {
        decision: 'INDICATED',
        decisionLabel: 'REVERSE CON IDARUCIZUMAB INDICATA (EMERGENZA < 6 ORE)',
        decisionColor: 'red',
        primaryAgent: {
          name: 'Idarucizumab (Praxbind)',
          targetDoseText: '5 g EV totali (prima scelta)',
          totalDoseCalculated: '5 g EV (2 flaconi da 2.5 g / 50 mL)',
          vialsCountText: '2 flaconcini da 2.5 g / 50 mL',
          infusionSpeed: 'Infusione in bolo lento di 2 flaconi a 15 minuti di distanza l\'uno dall\'altro.',
          notes: 'Ripristina la capacità coagulativa entro pochi minuti, permettendo l\'accesso immediato alla sala operatoria.',
        },
        secondLineAgent: {
          name: '4F-CCP 25 UI/kg',
          targetDoseText: 'Seconda scelta se Idarucizumab assente',
          totalDoseCalculated: `${weight * 25} UI (ripetibile +25 UI/kg)`,
          vialsCountText: `${Math.ceil((weight * 25) / 500)} flaconcini da 500 UI`,
          notes: 'Da utilizzare unicamente in assenza di disponibilità immediata dell\'antidoto.',
        },
        adjuvantMeasures: [
          {
            action: 'Verifica Disponibilità Scorta Urgenza',
            detail: 'Idarucizumab è allocato nei carrelli di emergenza di Pronto Soccorso e Rianimazione.',
            urgency: 'high',
          },
        ],
        labFollowup: {
          test: 'dTT post-reversal',
          timing: 'Se clinicamente opportuno, non procrastinare l\'intervento.',
          cutoffs: 'Normalizzazione attesa immediata.',
        },
        thrombosisPostReverseWarning: {
          riskRate: '4 - 5% post-reverse.',
          recommendations: ['Tromboprofilassi appena controllata l\'emostasi chirurgica.'],
        },
        summaryText: 'Intervento in emergenza (< 6 ore) con Dabigatran >= 50 ng/mL o livello non noto: somministrare Idarucizumab 5 g EV.',
      };
    }
  }

  // 3. DOAC ANTI-XA (Apixaban, Rivaroxaban, Edoxaban)
  if (params.anticoagulant === 'apixaban' || params.anticoagulant === 'rivaroxaban' || params.anticoagulant === 'edoxaban') {
    const doacName =
      params.anticoagulant === 'apixaban'
        ? 'Apixaban (Eliquis)'
        : params.anticoagulant === 'rivaroxaban'
        ? 'Rivaroxaban (Xarelto)'
        : 'Edoxaban (Lixiana)';

    if (isBleeding) {
      if (params.bleedingSeverity === 'minor') {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (SANGUINAMENTO MINORE)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sospensione Temporanea del DOAC',
              detail: 'Emivita dei DOAC: 8-12 ore. La sospensione di 1 o 2 dosi è sufficiente per la clearance spontanea.',
              urgency: 'info',
            },
            {
              action: 'Misure Emostatiche Locali',
              detail: 'Compressione, ghiaccio, emostatici locali, acido tranexamico topico.',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'Dosaggio attività anti-Xa specifica',
            timing: 'Non necessario di routine nel sanguinamento minore; solo se sospetto di sovradosaggio/insufficienza renale.',
            cutoffs: 'Valutazione clinica.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Nullo',
            recommendations: ['Rivalutare indicazione e dosaggio.'],
          },
          summaryText: `Sanguinamento minore in corso di ${doacName}: non è raccomandata la reverse farmacologica. Sospendere temporaneamente 1-2 dosi.`,
        };
      }

      const isICH = params.bleedingSeverity === 'major_ich';
      const isMajor = isICH || params.bleedingSeverity === 'major_other';
      const decision = isMajor ? 'INDICATED' : 'CONSIDER';

      // REGOLA POSOLOGICA LINEE GUIDA ISTH / ESAIC:
      // 50 UI/kg SUBITO se sanguinamenti intracranici (ICH) o interventi di neurochirurgia / cardiovascolari!
      // 25 UI/kg (ripetibile +25 UI/kg) per qualsiasi altro sanguinamento maggiore o chirurgia ad alto rischio!
      const uPerKg = isICH ? 50 : 25;
      const rawUnits = weight * uPerKg;
      const totalUnits = Math.min(5000, rawUnits);
      const vials500 = Math.ceil(totalUnits / 500);

      const measures: ReversalCalculationResult['adjuvantMeasures'] = [
        {
          action: 'Supporto Emodinamico & Fluidoterapia',
          detail: 'Cristalloidi bilanciati, emotrasfusioni mirate al mantenimento di Hb e PAM.',
          urgency: 'high',
        },
      ];

      if (params.recentIngestionWithin4Hours) {
        measures.push({
          action: 'Carbone Attivo 50 g da Sondino Naso-Gastrico',
          detail: 'RACCOMANDATO se l\'ultima somministrazione di Apixaban/Rivaroxaban/Edoxaban è avvenuta nelle ultime 2-4 ore: assorbe il farmaco luminale e previene ulteriore assorbimento.',
          urgency: 'high',
        });
      }

      if (params.isTraumaWithin3Hours || isICH) {
        measures.push({
          action: 'Acido Tranexamico (TXA) 10 mg/kg o 1 g EV lento',
          detail: 'Raccomandato dalle linee guida nel trauma entro 3 ore e nei sanguinamenti critici / intracranici in 100 mL SF in 10-15 min. Non efficace per emorragie digestive isolate.',
          urgency: 'high',
        });
      }

      if (params.coAntiplateletOrThrombocytopenia) {
        measures.push({
          action: 'Trasfusione di Piastrine (se NCH o Piastrinopenia < 50.000/mm³)',
          detail: 'Considerare concentrato piastrinico se il paziente assume concomitanti antiaggreganti (Aspirina/Clopidogrel/Ticagrelor) ed è candidato a neurochirurgia o presenta inefficace emostasi intra-procedurale con piastrine < 50.000.',
          urgency: 'high',
        });
      }

      return {
        decision: decision,
        decisionLabel: isMajor ? 'REVERSE FARMACOLOGICA INDICATA' : 'REVERSE FARMACOLOGICA DA CONSIDERARE',
        decisionColor: isMajor ? 'red' : 'amber',
        primaryAgent: {
          name: 'Complesso Protrombinico a 4 Fattori (4F-CCP - Confidex / Octaplex / Prothromplex)',
          targetDoseText: isICH
            ? '50 UI/kg EV subito (Dose piena per Emorragia Intracranica / Sede Critica)'
            : '25 UI/kg EV (ripetibile con ulteriori +25 UI/kg se persiste sanguinamento)',
          totalDoseCalculated: `${totalUnits} UI totali (sul peso di ${weight} kg; max 5000 UI)`,
          vialsCountText: `${vials500} flaconcini da 500 UI / 20 mL`,
          infusionSpeed: 'Bolo lento endovenoso: velocità massima < 8 mL/min (portare il flacone a temperatura ambiente).',
          notes: 'Standard terapeutico di linea guida e del protocollo regionale. Efficacia emostatica sino all\'80%. Nota: Andexanet alfa è escluso dal PTR (classe C) e ritirato da FDA a fine 2025 per alto rischio trombotico.',
        },
        secondLineAgent: null,
        adjuvantMeasures: measures,
        labFollowup: {
          test: `Attività anti-Xa calibrata per ${doacName}`,
          timing: 'Prelievo in provetta con citrato TAPPO AZZURRO (tempo di referto medio < 60 min h24 nei laboratori LRR).',
          cutoffs: 'L\'attesa dell\'esito del laboratorio NON deve procrastinare il trattamento emostatico urgente!',
        },
        thrombosisPostReverseWarning: {
          riskRate: '3 - 8% di eventi tromboembolici (ischemici e venosi) a 30 giorni.',
          recommendations: [
            'Non eccedere con dosaggi sovra-terapeutici (limite max 5000 UI).',
            'Considerare tromboprofilassi precoce con EBPM a basso dosaggio non appena ottenuto il controllo emostatico.',
            'Calcolo del Padua Score (medico) o Caprini Score (chirurgico).',
          ],
        },
        summaryText: `Paziente in terapia con ${doacName} con sanguinamento maggiore (${isICH ? 'Intracranico' : 'Altra sede'}): somministrare 4F-CCP alla dose di ${uPerKg} UI/kg (${totalUnits} UI = ${vials500} flaconcini).`,
      };
    } else {
      // Procedura Invasiva / Chirurgia per Anti-Xa
      const timing = params.urgencyTiming ?? 'emergency';
      const risk = params.procedureRisk ?? 'high';
      const doacLevel = params.doacLevelNgMl;

      if (timing === 'semi_urgency') {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (SEMI-URGENZA 24-48 ORE)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Sola Sospensione del DOAC',
              detail: 'Vista l\'emivita di 8-12 ore, l\'attesa di 24-48 ore permette la clearance spontanea del farmaco raggiungendo valori sicuri (< 30-50 ng/mL).',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'Dosaggio anti-Xa prima dell\'intervento',
            timing: '2-4 ore prima della sala operatoria.',
            cutoffs: '< 30 ng/mL = sicuro per alto rischio; < 50 ng/mL = sicuro per basso rischio.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Nullo.',
            recommendations: ['Ripresa post-operatoria programmata.'],
          },
          summaryText: 'Intervento differibile a 24-48 ore: è sufficiente la sospensione temporanea del DOAC.',
        };
      }

      if (timing === 'urgency') {
        // Urgenza 6-24 ore
        const isNeuroOrCardio = risk === 'high';
        const uPerKg = isNeuroOrCardio ? 50 : 25;
        const totalUnits = Math.min(5000, weight * uPerKg);
        const vials500 = Math.ceil(totalUnits / 500);

        return {
          decision: 'CONSIDER',
          decisionLabel: 'REVERSE DA CONSIDERARE / VALUTARE RINVIO 20-24 ORE',
          decisionColor: 'amber',
          primaryAgent: {
            name: '4F-CCP (se intervento non differibile)',
            targetDoseText: `${uPerKg} UI/kg (${isNeuroOrCardio ? '50 UI/kg se Neurochirurgia/Cardiochirurgia' : '25 UI/kg'})`,
            totalDoseCalculated: `${totalUnits} UI`,
            vialsCountText: `${vials500} flaconcini da 500 UI`,
            infusionSpeed: 'Bolo lento < 8 mL/min.',
            notes: 'Un livello di DOAC compreso tra 50 e 100 ng/mL suggerisce la possibilità di rinviare l\'intervento di 20-24 ore per consentire l\'eliminazione spontanea sotto 50 ng/mL evitando il reverse farmacologico.',
          },
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Consulto Collegiale con Chirurgo',
              detail: 'Se la frattura o lesione consente attesa di 20-24 ore, monitorare il calo spontaneo del farmaco.',
              urgency: 'high',
            },
          ],
          labFollowup: {
            test: 'Attività anti-Xa quantitativa in ng/mL',
            timing: 'Richiesta urgente in LRR (refertazione < 60 min).',
            cutoffs: 'Tra 50 e 100 ng/mL valutare rinvio; se < 30 ng/mL procedere senza reverse.',
          },
          thrombosisPostReverseWarning: {
            riskRate: '3 - 8% se somministrato 4F-CCP.',
            recommendations: ['Tromboprofilassi appena possibile post-op.'],
          },
          summaryText: `Chirurgia in urgenza (6-24h) in paziente con ${doacName}: valutare il dosaggio anti-Xa ed eventuale rinvio di 20-24 ore. Se non differibile: 4F-CCP.`,
        };
      }

      // Emergenza (< 6 ore)
      let isSafe = false;
      if (doacLevel === 'less_30' || (typeof doacLevel === 'number' && doacLevel < 30)) {
        isSafe = true;
      }

      if (isSafe) {
        return {
          decision: 'NOT_INDICATED',
          decisionLabel: 'REVERSE NON INDICATA (LIVELLO DOAC < 30 NG/ML SICURO)',
          decisionColor: 'emerald',
          primaryAgent: null,
          secondLineAgent: null,
          adjuvantMeasures: [
            {
              action: 'Procedere all\'intervento in sicurezza',
              detail: 'Concentrazione plasmatica < 30 ng/mL documentata: il rischio emorragico da farmaco è trascurabile, compatibile con chirurgia d\'emergenza ad alto rischio emorragico.',
              urgency: 'info',
            },
          ],
          labFollowup: {
            test: 'Referto anti-Xa archiviato',
            timing: 'Eseguito all\'ingresso.',
            cutoffs: '< 30 ng/mL sicuro.',
          },
          thrombosisPostReverseWarning: {
            riskRate: 'Basso',
            recommendations: ['Ripresa post-operatoria programmata.'],
          },
          summaryText: `Livello di ${doacName} < 30 ng/mL: la procedura chirurgica in emergenza può essere avviata senza reverse.`,
        };
      }

      const isNeuroOrCardio = risk === 'high';
      const uPerKg = isNeuroOrCardio ? 50 : 25;
      const totalUnits = Math.min(5000, weight * uPerKg);
      const vials500 = Math.ceil(totalUnits / 500);

      return {
        decision: 'INDICATED',
        decisionLabel: 'REVERSE FARMACOLOGICA INDICATA (EMERGENZA < 6 ORE)',
        decisionColor: 'red',
        primaryAgent: {
          name: 'Complesso Protrombinico a 4 Fattori (4F-CCP)',
          targetDoseText: isNeuroOrCardio
            ? '50 UI/kg EV subito (Intervento Neurochirurgico / Cardiovascolare)'
            : '25 UI/kg EV (ripetibile con ulteriori +25 UI/kg per altri tipi di intervento)',
          totalDoseCalculated: `${totalUnits} UI totali (max 5000 UI)`,
          vialsCountText: `${vials500} flaconcini da 500 UI / 20 mL`,
          infusionSpeed: 'Bolo endovenoso lento: < 8 mL/min.',
          notes: 'Indicato se livello DOAC >= 50 ng/mL oppure se il livello non è noto e l\'intervento è tempo-dipendente.',
        },
        secondLineAgent: null,
        adjuvantMeasures: [
          {
            action: 'Avviso Equipe Chirurgica & Anestesiologica',
            detail: 'Rispettare le tempistiche di infusione del 4F-CCP; emostasi farmacologica efficace entro 5-15 minuti.',
            urgency: 'high',
          },
        ],
        labFollowup: {
          test: 'Attività anti-Xa dosata in urgenza',
          timing: 'Non attendere l\'esito per iniziare l\'infusione se emergenza salvavita.',
          cutoffs: 'Target procedurale: disattivazione funzionale.',
        },
        thrombosisPostReverseWarning: {
          riskRate: '3 - 8% a 30 giorni.',
          recommendations: ['Iniziare tromboprofilassi non appena l\'emostasi chirurgica è consolidata.'],
        },
        summaryText: `Intervento in emergenza (< 6 ore) in paziente che assume ${doacName}: somministrare 4F-CCP ${uPerKg} UI/kg (${totalUnits} UI).`,
      };
    }
  }

  // 4. EPARINA NON FRAZIONATA (ENF)
  if (params.anticoagulant === 'enf') {
    const hours = params.hoursSinceLastDose ?? 1;

    if (hours > 3) {
      return {
        decision: 'NOT_INDICATED',
        decisionLabel: 'REVERSE USUALMENTE NON RICHIESTA (ENF > 3 ORE)',
        decisionColor: 'emerald',
        primaryAgent: null,
        secondLineAgent: null,
        adjuvantMeasures: [
          {
            action: 'Sola Sospensione dell\'Infusione',
            detail: 'L\'emivita dell\'eparina non frazionata endovena è di 60-90 minuti. Dopo 3 ore dall\'arresto dell\'infusione la quota circolante è quasi totalmente eliminata.',
            urgency: 'info',
          },
        ],
        labFollowup: {
          test: 'aPTT ratio',
          timing: 'Al momento della valutazione.',
          cutoffs: 'Normalizzazione spontanea attesa entro 2-3 ore.',
        },
        thrombosisPostReverseWarning: {
          riskRate: 'Nullo',
          recommendations: ['Ripresa della profilassi quando indicato.'],
        },
        summaryText: 'Infusione di ENF sospesa da oltre 3 ore: la reversione farmacologica non è usualmente necessaria.',
      };
    }

    // somministrata da < 3 ore
    return {
      decision: 'INDICATED',
      decisionLabel: 'REVERSE CON PROTAMINA SOLFATO INDICATA',
      decisionColor: 'red',
      primaryAgent: {
        name: 'Protamina Solfato (fiale da 50 mg / 5 mL)',
        targetDoseText: '1 mg di protamina ogni 100 UI di eparina infuse nell\'ultima ora',
        totalDoseCalculated: 'Dose abituale in emergenza: 25 - 50 mg EV (max 50 mg in singola dose)',
        vialsCountText: '1 fiala da 50 mg / 5 mL (o 1/2 fiala = 25 mg)',
        infusionSpeed: 'Bolo endovenoso MOLTO LENTO in almeno 10 minuti (la somministrazione rapida causa grave ipotensione, bradicardia e reazioni anafilattoidi da istamino-liberazione).',
        notes: '1 mg di protamina neutralizza circa 100 UI di ENF. L\'effetto neutralizzante si esplica entro 5-15 minuti.',
      },
      secondLineAgent: null,
      adjuvantMeasures: [
        {
          action: 'Monitoraggio Pressione Arteriosa ed ECG',
          detail: 'Rischio di shock vasogenico e vasocostrizione dell\'arteria polmonare se infusa rapidamente.',
          urgency: 'high',
        },
      ],
      labFollowup: {
        test: 'aPTT ratio di controllo',
        timing: 'A 15-30 minuti dal termine dell\'infusione di Protamina.',
        cutoffs: 'Target: aPTT ratio < 1.3.',
      },
      thrombosisPostReverseWarning: {
        riskRate: 'Basso, ma l\'eccesso di protamina libera possiede un intrinseco debole effetto anticoagulante!',
        recommendations: ['Non superare la dose calcolata.'],
      },
      summaryText: 'ENF somministrata da meno di 3 ore: indicata somministrazione di Protamina Solfato 1 mg ogni 100 UI di eparina (25-50 mg EV lento in 10 minuti).',
    };
  }

  // 5. EPARINA A BASSO PESO MOLECOLARE (EBPM es. Enoxaparina)
  if (params.anticoagulant === 'ebpm') {
    const hours = params.hoursSinceLastDose ?? 4;

    if (hours > 12) {
      return {
        decision: 'NOT_INDICATED',
        decisionLabel: 'REVERSE USUALMENTE NON RICHIESTA (EBPM > 12 ORE)',
        decisionColor: 'emerald',
        primaryAgent: null,
        secondLineAgent: null,
        adjuvantMeasures: [
          {
            action: 'Sospensione & Attesa Eliminazione Fisiologica',
            detail: 'L\'emivita media delle EBPM è di circa 12 ore (con funzione renale normale). Dopo 12 ore la concentrazione residua è minima.',
            urgency: 'info',
          },
        ],
        labFollowup: {
          test: 'Attività anti-Xa per EBPM se insufficienza renale severa',
          timing: 'Se CrCl < 30 mL/min può verificarsi accumulo.',
          cutoffs: 'Intervallo terapeutico 0.4 - 1.2 UI/mL.',
        },
        thrombosisPostReverseWarning: {
          riskRate: 'Nullo',
          recommendations: ['Rivalutare posologia.'],
        },
        summaryText: 'EBPM somministrata da oltre 12 ore: la reversal farmacologica non è necessaria.',
      };
    }

    const isWithin8Hours = hours < 8;
    const doseText = isWithin8Hours
      ? '1 mg di Protamina ogni 100 UI di EBPM (es. per Enoxaparina 4000 UI = 40 mg -> 40 mg di Protamina; in emergenza abitualmente 25 mg)'
      : '0.5 mg di Protamina ogni 100 UI di EBPM (assunzione avvenuta tra 8 e 12 ore prima)';

    return {
      decision: isWithin8Hours ? 'INDICATED' : 'CONSIDER',
      decisionLabel: isWithin8Hours ? 'REVERSE CON PROTAMINA INDICATA' : 'REVERSE CON PROTAMINA DA CONSIDERARE',
      decisionColor: isWithin8Hours ? 'red' : 'amber',
      primaryAgent: {
        name: 'Protamina Solfato (fiale da 50 mg / 5 mL)',
        targetDoseText: doseText,
        totalDoseCalculated: 'Dose iniziale standard in acuto: 25 mg EV (1/2 fiala)',
        vialsCountText: '1 fiala da 50 mg / 5 mL (utilizzare mezza fiala da 25 mg)',
        infusionSpeed: 'Iniezione endovenosa lenta in 10 minuti.',
        notes: 'Non esiste un neutralizzante specifico perfetto per EBPM: la protamina neutralizza circa il 60-70% dell\'attività anti-Xa e il 100% dell\'attività anti-IIa. Ripetibile a 0.5 mg/100 UI se il sanguinamento persiste.',
      },
      secondLineAgent: null,
      adjuvantMeasures: [
        {
          action: 'Supporto Emostatico Meccanico & Fluidoterapia',
          detail: 'La protamina neutralizza parzialmente l\'attività anti-Xa; fondamentale il controllo emostatico locale.',
          urgency: 'high',
        },
      ],
      labFollowup: {
        test: 'Attività anti-Xa per EBPM',
        timing: 'A 2-4 ore dalla somministrazione di protamina se sanguinamento refrattario.',
        cutoffs: 'Attività target < 0.2 UI/mL.',
      },
      thrombosisPostReverseWarning: {
        riskRate: 'Basso',
        recommendations: ['Riavviare profilassi non appena emostasi stabile.'],
      },
      summaryText: `EBPM assunta da ${hours} ore: indicata somministrazione di Protamina Solfato (25 mg in bolo lento in 10 min, ripetibile se emorragia in atto).`,
    };
  }

  // 6. FONDAPARINUX (Arixtra)
  return {
    decision: 'NOT_INDICATED',
    decisionLabel: 'NESSUN ANTIDOTO SPECIFICO DISPONIBILE',
    decisionColor: 'amber',
    primaryAgent: null,
    secondLineAgent: {
      name: '4F-CCP oppure Fattore VII ricombinante (rFVIIa) (Off-label / Salvataggio estremo)',
      targetDoseText: 'Non approvato, efficacia incerta; solo su consulto esperto di emostasi',
      totalDoseCalculated: 'Da concordare con il Centro Malattie Emorragiche',
      vialsCountText: 'Non indicato nella routine',
      notes: 'La protamina NON neutralizza il Fondaparinux.',
    },
    adjuvantMeasures: [
      {
        action: 'Sola Sospensione & Supporto Emodinamico Massivo',
        detail: 'Fondaparinux ha un\'emivita terminale lunga (fino a 17-21 ore). L\'escrezione è al 100% renale: in caso di insufficienza renale l\'emivita è marcatamente allungata!',
        urgency: 'high',
      },
      {
        action: 'Emostasi Meccanica, Radiologica o Chirurgica',
        detail: 'Priorità assoluta al controllo chirurgico o endovascolare della fonte di sanguinamento.',
        urgency: 'high',
      },
      {
        action: 'Consulto Specialistico Emostasi & Ematologia',
        detail: 'Contattare il dirigente medico ematologo di guardia o specialista del centro emostasi e trombosi.',
        urgency: 'high',
      },
    ],
    labFollowup: {
      test: 'Attività anti-Xa specifica con calibratore per Fondaparinux',
      timing: 'Richiesta urgente con calibratore dedicato.',
      cutoffs: 'Profilattico: 0.39-0.50 mcg/mL; Terapeutico: 0.50-1.50 mcg/mL.',
    },
    thrombosisPostReverseWarning: {
      riskRate: 'Non applicabile (nessuna reverse farmacologica specifica).',
      recommendations: ['Monitorare diuresi e funzione renale.'],
    },
    summaryText: 'Per Fondaparinux non esiste un antidoto specifico efficace: la gestione si fonda su sospensione, emostasi meccanica/chirurgica e supporto emodinamico.',
  };
}

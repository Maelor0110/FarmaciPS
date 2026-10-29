import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Globe, Smartphone, Github, Info } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const sharedUrl = 'https://ais-pre-rvjslczu5za5g7ngqddoah-781914330527.europe-west2.run.app';

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Condividi EmergenzFarmaco
              </h3>
              <p className="text-xs text-slate-500">
                Indirizzo web per consultazione da smartphone, tablet e PC di reparto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* Active Cloud App Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1.5 text-xs">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>LA TUA WEBAPP È GIÀ ONLINE E PRONTA ALL'USO!</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Non è necessario configurare GitHub Pages per condividere l'app con colleghi o aprirla in reparto: l'applicazione è già ospitata e attiva su cloud sicuro, accessibile da qualsiasi browser.
            </p>

            <div className="flex items-center gap-2 bg-white rounded-lg border border-emerald-300 p-2 shadow-2xs">
              <input
                type="text"
                readOnly
                value={sharedUrl}
                className="w-full text-xs font-mono text-slate-800 bg-transparent outline-hidden select-all"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copia Link</span>
                  </>
                )}
              </button>
              <a
                href={sharedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                title="Apri indirizzo in nuova scheda"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick instructions for smartphones */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
              <Smartphone className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Come usarla come App sul Telefono (iPhone e Android):</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>Invia il link al tuo smartphone (via WhatsApp, Telegram o email).</li>
              <li>
                <strong>Su Safari (iPhone):</strong> tocca il pulsante <em>Condividi</em> (quadrato con freccia) &rarr; <em>"Aggiungi alla schermata Home"</em>.
              </li>
              <li>
                <strong>Su Chrome (Android):</strong> tocca i <em>3 puntini in alto a destra</em> &rarr; <em>"Installa app"</em> o <em>"Aggiungi a schermata Home"</em>.
              </li>
              <li>L'icona apparirà sullo schermo come un'app nativa a tutto schermo, comoda e immediata al letto del paziente!</li>
            </ul>
          </div>

          {/* Explanation regarding GitHub Pages */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
              <Github className="w-4 h-4 text-slate-800 shrink-0" />
              <span>Perché GitHub non ha creato l'indirizzo automaticamente?</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Su GitHub, un semplice repository di codice non genera da solo una pagina web visibile finché non viene abilitato <strong>GitHub Pages</strong> o una pipeline di build:
            </p>
            <ol className="space-y-1 text-slate-600 text-xs pl-6 list-decimal">
              <li>Vai sul tuo repository GitHub e clicca su <strong>Settings</strong> (in alto).</li>
              <li>Nel menu di sinistra seleziona <strong>Pages</strong>.</li>
              <li>Sotto <strong>Build and deployment</strong>, imposta <em>Source</em> su <em>Deploy from a branch</em> oppure <em>GitHub Actions</em>.</li>
              <li>Se usi un branch, devi pubblicare la cartella compilata <code>dist/</code> (generata eseguendo <code>npm run build</code>) oppure configurare un workflow con <code>actions/deploy-pages</code>.</li>
            </ol>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2 text-amber-900 text-[11px] mt-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Consiglio pratico:</strong> Non hai bisogno di perdere tempo a configurare GitHub Pages se ti serve solo condividere l'app con colleghi o usarla in Pronto Soccorso: <strong>l'indirizzo Cloud fornito sopra è già pronto, funzionante e costantemente aggiornato</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

import { COMPANY } from '../lib/company';
import { LegalLayout, LegalSection } from './LegalLayout';

interface Props {
  language: string;
}

export default function CookiePolicyPage({ language }: Props) {
  const it = language === 'it';

  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle={
        it
          ? 'Ai sensi dell\'art. 122 del D.Lgs. 196/2003 e delle Linee guida cookie del Garante Privacy'
          : 'Pursuant to Art. 122 of Legislative Decree 196/2003 and the Italian DPA cookie guidelines'
      }
      updated={it ? 'Ultimo aggiornamento: ottobre 2026' : 'Last updated: October 2026'}
    >
      <LegalSection title={it ? '1. In breve' : '1. In short'}>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p>
            {it
              ? 'Questo sito non installa cookie sul tuo dispositivo e non usa strumenti di tracciamento, statistica, pubblicità o profilazione. Per questo non ti mostriamo un banner dei cookie: non c\'è nulla da accettare o rifiutare.'
              : 'This site does not install cookies on your device and uses no tracking, analytics, advertising or profiling tools. That is why we do not show a cookie banner: there is nothing to accept or decline.'}
          </p>
        </div>
      </LegalSection>

      <LegalSection title={it ? '2. Memoria del browser' : '2. Browser storage'}>
        <p>
          {it
            ? 'Il sito non salva alcun dato nel tuo browser: la lingua che scegli resta valida solo finché la pagina è aperta.'
            : 'The site stores no data in your browser: the language you choose only lasts while the page is open.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '3. Servizi di terzi' : '3. Third-party services'}>
        <p>
          {it
            ? 'Il sito non incorpora contenuti di terzi (mappe, video, pulsanti social). I link verso WhatsApp, Instagram, Facebook e Google Maps ti portano su siti esterni: da quel momento valgono le informative e i cookie di quelle piattaforme, di cui non siamo responsabili.'
            : 'The site embeds no third-party content (maps, videos, social buttons). Links to WhatsApp, Instagram, Facebook and Google Maps take you to external sites: from that point the notices and cookies of those platforms apply, for which we are not responsible.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '4. Se cambieremo qualcosa' : '4. If we change something'}>
        <p>
          {it
            ? 'Se in futuro introdurremo strumenti di statistica, pubblicità o contenuti incorporati che usano cookie, aggiorneremo questa pagina e chiederemo il tuo consenso prima di attivarli.'
            : 'If in future we introduce analytics, advertising or embedded content that uses cookies, we will update this page and ask for your consent before enabling them.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '5. Titolare del trattamento' : '5. Data Controller'}>
        <p>
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.street} – {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province}) — P.IVA {COMPANY.vatNumber}
          <br />
          <a href={`mailto:${COMPANY.email}`} className="text-emerald-700 hover:underline">
            {COMPANY.email}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

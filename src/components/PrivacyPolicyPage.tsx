import { COMPANY } from '../lib/company';
import { LegalLayout, LegalSection } from './LegalLayout';

interface Props {
  language: string;
}

export default function PrivacyPolicyPage({ language }: Props) {
  const it = language === 'it';
  const mail = (
    <a href={`mailto:${COMPANY.email}`} className="text-emerald-700 hover:underline">
      {COMPANY.email}
    </a>
  );

  return (
    <LegalLayout
      title={it ? 'Informativa sul trattamento dei dati personali' : 'Privacy Policy'}
      subtitle={it ? 'Ai sensi degli artt. 13–14 del Regolamento UE 2016/679 (GDPR)' : 'Pursuant to Arts. 13–14 of EU Regulation 2016/679 (GDPR)'}
      updated={it ? 'Ultimo aggiornamento: ottobre 2026' : 'Last updated: October 2026'}
    >
      <LegalSection title={it ? '1. Titolare del trattamento' : '1. Data Controller'}>
        <p>
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.street} – {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province})
          <br />
          P.IVA: {COMPANY.vatNumber}
          {COMPANY.reaNumber ? <> – REA: {COMPANY.reaNumber}</> : null}
          <br />
          {it ? 'E-mail' : 'Email'}: {mail}
          <br />
          Tel.:{' '}
          <a href={`tel:${COMPANY.mobile.tel}`} className="text-emerald-700 hover:underline">
            {COMPANY.mobile.display}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={it ? '2. Quali dati trattiamo e come' : '2. What data we process and how'}>
        <div>
          <h3 className="font-semibold text-stone-800 mb-1">{it ? 'a) Dati di navigazione' : 'a) Browsing data'}</h3>
          <p>
            {it
              ? 'Quando visiti il sito, il server che lo ospita e lo serve (il fornitore di hosting) registra automaticamente alcuni dati tecnici necessari al funzionamento e alla sicurezza: indirizzo IP, data e ora della richiesta, pagina richiesta, tipo di browser e di dispositivo. Noi non usiamo strumenti di analisi statistica né di profilazione e non colleghiamo questi dati a una persona.'
              : 'When you visit the site, the server that hosts and delivers it (the hosting provider) automatically records some technical data needed for operation and security: IP address, date and time of the request, requested page, browser and device type. We do not use analytics or profiling tools and we do not link this data to any individual.'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-stone-800 mb-1">{it ? 'b) Dati che ci comunichi tu' : 'b) Data you give us'}</h3>
          <p>
            {it
              ? 'Se ci scrivi o ci chiami (WhatsApp, telefono, e-mail) ci comunichi volontariamente dati come nome, numero di telefono, indirizzo e-mail e il contenuto del messaggio o dell\'ordine. Li usiamo solo per risponderti e gestire la tua richiesta. Il sito non contiene moduli di contatto: i messaggi passano dai canali che scegli tu.'
              : 'If you write to or call us (WhatsApp, phone, email) you voluntarily give us data such as your name, phone number, email address and the content of your message or order. We use it only to reply and handle your request. The site has no contact form: messages go through the channels you choose.'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-stone-800 mb-1">{it ? 'c) Foto e nomi di staff e fornitori' : 'c) Photos and names of staff and suppliers'}</h3>
          <p>
            {it
              ? 'Le pagine "Staff" e "Fornitori" pubblicano nome, ruolo e fotografia delle persone che lavorano in negozio e delle aziende fornitrici. Per le persone la pubblicazione avviene solo con il loro consenso, che può essere revocato in qualsiasi momento scrivendoci: la foto sarà rimossa dal sito.'
              : 'The "Staff" and "Suppliers" pages publish the name, role and photograph of the people working in the shop and of supplier businesses. For individuals, publication takes place only with their consent, which can be withdrawn at any time by writing to us: the photo will be removed from the site.'}
          </p>
        </div>
      </LegalSection>

      <LegalSection title={it ? '3. Finalità e basi giuridiche' : '3. Purposes and legal bases'}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-stone-700 border-collapse">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left p-3 font-semibold text-emerald-800 border border-stone-200">{it ? 'Finalità' : 'Purpose'}</th>
                <th className="text-left p-3 font-semibold text-emerald-800 border border-stone-200">{it ? 'Base giuridica' : 'Legal basis'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-stone-200">{it ? 'Far funzionare il sito e tenerlo sicuro' : 'Operating the site and keeping it secure'}</td>
                <td className="p-3 border border-stone-200">{it ? 'Legittimo interesse (art. 6, par. 1, lett. f GDPR)' : 'Legitimate interest (Art. 6(1)(f) GDPR)'}</td>
              </tr>
              <tr className="bg-stone-50">
                <td className="p-3 border border-stone-200">{it ? 'Rispondere alle richieste e gestire gli ordini' : 'Replying to requests and handling orders'}</td>
                <td className="p-3 border border-stone-200">{it ? 'Misure precontrattuali / esecuzione del contratto (art. 6, par. 1, lett. b GDPR)' : 'Pre-contractual measures / performance of a contract (Art. 6(1)(b) GDPR)'}</td>
              </tr>
              <tr>
                <td className="p-3 border border-stone-200">{it ? 'Pubblicare le foto del personale' : 'Publishing staff photos'}</td>
                <td className="p-3 border border-stone-200">{it ? 'Consenso (art. 6, par. 1, lett. a GDPR), revocabile' : 'Consent (Art. 6(1)(a) GDPR), revocable'}</td>
              </tr>
              <tr className="bg-stone-50">
                <td className="p-3 border border-stone-200">{it ? 'Obblighi di legge (es. fiscali e contabili)' : 'Legal obligations (e.g. tax and accounting)'}</td>
                <td className="p-3 border border-stone-200">{it ? 'Obbligo legale (art. 6, par. 1, lett. c GDPR)' : 'Legal obligation (Art. 6(1)(c) GDPR)'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title={it ? '4. Con chi condividiamo i dati' : '4. Who we share data with'}>
        <p>
          {it
            ? 'Non vendiamo i dati e non li usiamo per marketing o profilazione. Può trattarli, per nostro conto, il fornitore di hosting del sito, nominato responsabile del trattamento ai sensi dell\'art. 28 GDPR. Se scrivi su WhatsApp, il servizio è fornito da WhatsApp Ireland / Meta, che tratta i dati secondo la propria informativa. Per le informazioni dovute per legge i dati possono essere comunicati a consulenti e autorità competenti.'
            : 'We do not sell data and do not use it for marketing or profiling. It may be processed on our behalf by the site\'s hosting provider, appointed as data processor under Art. 28 GDPR. If you write on WhatsApp, the service is provided by WhatsApp Ireland / Meta, which processes data under its own privacy notice. Data may be disclosed to advisers and competent authorities where required by law.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '5. Trasferimenti fuori dall\'Unione Europea' : '5. Transfers outside the EU'}>
        <p>
          {it
            ? 'Il fornitore di hosting (e WhatsApp/Meta) può trattare dati anche fuori dallo Spazio Economico Europeo. In tal caso il trasferimento avviene con le garanzie previste dagli artt. 44–49 GDPR, ad esempio decisioni di adeguatezza o Clausole Contrattuali Standard della Commissione Europea.'
            : 'The hosting provider (and WhatsApp/Meta) may also process data outside the European Economic Area. In that case the transfer relies on the safeguards provided by Arts. 44–49 GDPR, such as adequacy decisions or the European Commission\'s Standard Contractual Clauses.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '6. Per quanto tempo conserviamo i dati' : '6. Retention'}>
        <ul className="list-disc list-inside space-y-2">
          <li>{it ? 'Dati tecnici di navigazione: per il tempo stabilito dai fornitori di hosting, in genere breve, e solo per sicurezza e funzionamento.' : 'Technical browsing data: for the period set by the hosting providers, generally short, and only for security and operation.'}</li>
          <li>{it ? 'Messaggi e ordini: per il tempo necessario a gestire la richiesta e poi per i termini previsti dalla legge (ad esempio 10 anni per i documenti contabili).' : 'Messages and orders: for as long as needed to handle the request and then for the periods required by law (e.g. 10 years for accounting records).'}</li>
          <li>{it ? 'Foto del personale: fino a revoca del consenso o alla fine del rapporto di lavoro o collaborazione.' : 'Staff photos: until consent is withdrawn or the working relationship ends.'}</li>
        </ul>
      </LegalSection>

      <LegalSection title={it ? '7. I tuoi diritti' : '7. Your rights'}>
        <p>{it ? 'Ai sensi degli artt. 15–22 GDPR hai il diritto di:' : 'Under Arts. 15–22 GDPR you have the right to:'}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{it ? 'accedere ai tuoi dati personali' : 'access your personal data'}</li>
          <li>{it ? 'chiedere la rettifica dei dati inesatti' : 'have inaccurate data rectified'}</li>
          <li>{it ? 'chiedere la cancellazione dei dati' : 'request erasure'}</li>
          <li>{it ? 'chiedere la limitazione del trattamento' : 'request restriction of processing'}</li>
          <li>{it ? 'ricevere i tuoi dati in formato strutturato (portabilità)' : 'receive your data in a structured format (portability)'}</li>
          <li>{it ? 'opporti al trattamento basato su legittimo interesse' : 'object to processing based on legitimate interest'}</li>
          <li>{it ? 'revocare in qualsiasi momento il consenso dato' : 'withdraw consent at any time'}</li>
        </ul>
        <p>
          {it ? 'Per esercitarli scrivi a: ' : 'To exercise them write to: '}
          {mail}.
        </p>
      </LegalSection>

      <LegalSection title={it ? '8. Reclamo al Garante' : '8. Complaint to the supervisory authority'}>
        <p>
          {it
            ? 'Se ritieni che il trattamento violi il GDPR puoi proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).'
            : 'If you believe the processing violates the GDPR you may lodge a complaint with the Italian Data Protection Authority (Garante, www.garanteprivacy.it).'}
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

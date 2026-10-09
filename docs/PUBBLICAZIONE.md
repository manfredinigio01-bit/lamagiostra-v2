# Pubblicare La Magiostra: dominio, hosting, visibilità

> Stato al 9 ottobre 2026. I prezzi e i piani cambiano: verificali sempre al momento dell'acquisto o del rinnovo.

## 1. Com'è pubblicato oggi

- **Hosting**: Cloudflare (Workers con file statici, piano gratuito). Il progetto si chiama `lamagiostra-v2` ed è collegato al repository GitHub `lamagiostra-v2`. La configurazione è in [`wrangler.jsonc`](../wrangler.jsonc).
- **Versione precedente**: il progetto Cloudflare `lamagiostra` (repository `lamagiostra-website1`) resta come copia di riserva, senza dominio. Per tornare indietro basta spostare di nuovo i domini su quel progetto.
- **Come si aggiorna**: ogni modifica unita (merge) su `main` in GitHub fa partire da sola una nuova pubblicazione (circa un minuto e mezzo). Build: `npm run build`; pubblicazione: `npx wrangler deploy`.
- **Indirizzi**: `https://www.lamagiostra.it` (principale) e `https://lamagiostra.it`. Gli indirizzi `*.workers.dev` sono disattivati (`workers_dev` e `preview_urls` a `false` in `wrangler.jsonc`).
- **Indirizzo del sito** `VITE_SITE_URL = https://www.lamagiostra.it`, scritto nel file [`.env.production`](../.env.production). Serve per `sitemap.xml`, `robots.txt`, indirizzi canonici e anteprime social. Se cambi indirizzo principale, cambialo lì (una variabile con lo stesso nome su Cloudflare avrebbe la precedenza).
- Il file `public/_headers` applica le intestazioni di sicurezza. Il sito è statico: nessun server né database da gestire, costo di hosting previsto 0 €/anno (da verificare sui limiti attuali del piano).

## 2. Dominio

- `lamagiostra.it`, registrato su **Squarespace Domains** il 9 ottobre 2026 a 18 €/anno. Nel carrello il rinnovo risultava a 18 € + imposte (rinnovo previsto il 23 settembre 2027: segnalo la data sul calendario).
- Il DNS è su **Cloudflare**: nel pannello di Squarespace i nameserver sono `greg.ns.cloudflare.com` e `veda.ns.cloudflare.com`. Non aggiungere né cambiare record DNS su Squarespace.
- I due record (`@` e `www`) li crea Cloudflare collegando i domini personalizzati al progetto, in *Workers & Pages → lamagiostra-v2 → Settings → Domains & Routes*. Non cancellarli.
- Il dominio è intestato alla società. Tieni attivo il blocco di trasferimento e il rinnovo automatico.

## 3. Farsi trovare (in ordine di resa)

1. **Scheda Google Business Profile** (gratuita): è il fattore principale per chi cerca "alimentari vegetariani Cremona" o "gastronomia vegana vicino a me". Inserisci indirizzo, orari, telefono, categoria "Negozio di alimentari" + "Gastronomia", foto del banco e dei tavolini, e il link al sito. Chiedi ai clienti abituali di lasciare una recensione.
2. **Coerenza dei dati**: nome, indirizzo e telefono identici su sito, Google, Facebook, Instagram (il sito ora ha anche i dati strutturati per Google).
3. **Google Search Console** (gratuita): quando il dominio è attivo, verifica il sito e invia `sitemap.xml` (generata dal build se imposti `VITE_SITE_URL`).
4. **Social + WhatsApp**: già li usate; il sito deve essere il posto dove sta tutto in ordine (orari, menù fisso, come arrivare). Valuta di mettere il link al sito nella bio di Instagram/Facebook e in WhatsApp Business.
5. **Locale**: segnalazione a siti e guide della città, gruppi di acquisto, associazioni sportive e della natura (che sono il tuo pubblico), eventi e corsi in bottega.

## 4. Cosa hanno (di solito) i siti di negozi e gastronomie e qui manca

> Indicazioni di buon senso sul settore, **non** ricavate dall'apertura di singoli siti concorrenti: per un confronto serio servono nomi precisi da guardare insieme.

- Menù/proposta della settimana scritta sul sito (oggi sta solo sui social). Anche una semplice pagina aggiornata ogni lunedì.
- Allergeni e ingredienti dei piatti ricorrenti (utile ai clienti e un dovere in gastronomia, anche se non sempre sul sito).
- Calendario di corsi ed eventi con modulo di prenotazione, oggi solo descrizione.
- Pagina "Come arrivare" con parcheggio e mezzi (senza incorporare mappe di terzi, per non dover chiedere consenso cookie).
- Recensioni reali dei clienti, citate con il loro permesso.
- Se decidete di vendere online o con ritiro in negozio: serve un vero e-commerce (e relative informative); oggi il sito è una vetrina e ordina via WhatsApp.

## 5. Cose che solo tu puoi confermare (e che io non ho inventato)

- **PEC** (magiostra@pec.it) e REA (CR-134075): già inseriti in `src/lib/company.ts`, compaiono nel footer.
- ~~Telefono fisso~~ e ~~orari~~: confermati (0372 21415; martedì-venerdì 9:30-14:30 / 17:00-19:30; sabato 9:30-14:30).
- ~~"Km zero" e "senza pesticidi"~~: riformulati con affermazioni verificabili ("produttori locali di fiducia"). Se in futuro vuoi dichiarare metodi di coltivazione, serve una dichiarazione scritta del produttore (e la parola "biologico" solo con certificazione).
- Foto dello staff: serve il **consenso scritto** di ogni persona. Modulo pronto in [`docs/liberatoria-foto-staff.md`](liberatoria-foto-staff.md); le firme si conservano in negozio, non sul sito.
- ~~Ruolo di Chiara~~: ora "Titolare" in `src/data/team.ts`.
- Verifica finale delle pagine Privacy e Cookie con il tuo commercialista o un consulente privacy: sono redatte con cura sul funzionamento reale del sito, ma non sono una consulenza legale.

## 6. Sicurezza degli account (la parte che conta di più)

Il sito statico ha pochissimo da attaccare. Il rischio reale è che qualcuno entri in un account.

- **Autenticazione a due fattori** attiva su Cloudflare, GitHub, Squarespace e sull'e-mail usata per accedere (fatto il 9 ottobre 2026). Codici di recupero conservati fuori dal computer.
- **GitHub**: *Dependabot security updates* attivo (*Settings → Code security*). La protezione del ramo `main` (obbligo di pull request) **non è applicabile**: sui repository privati GitHub la attiva solo con un'organizzazione a pagamento (GitHub Team). Per questo ci si affida all'autenticazione a due fattori e al merge sempre manuale. Se in futuro il repository passa a un'organizzazione Team, riattivare il ruleset *Proteggi main*.
- **Posta**: il dominio non invia e-mail. Per impedire che qualcuno spedisca messaggi falsi a nome di `@lamagiostra.it`, su Cloudflare (*DNS → Records*) vanno due record `TXT`:
  - nome `@`, contenuto `v=spf1 -all`
  - nome `_dmarc`, contenuto `v=DMARC1; p=reject;`
  
  Se un giorno userete la posta con il dominio, questi record vanno cambiati.
- **DNSSEC**: non attivo. Per i domini `.it` richiede un passaggio sul registro e un errore può rendere il dominio irraggiungibile: valutalo solo dopo averlo verificato.

## 7. Ripubblicare e build fallite

- Ogni merge su `main` fa partire una build. Se una pull request ha la **X rossa** del controllo automatico, non va unita: la stessa build fallirà anche su Cloudflare.
- Su Cloudflare **"Retry build" ricompila lo stesso commit**, anche se è vecchio. Per pubblicare l'ultima versione serve un commit nuovo su `main` (anche una modifica minima, ad esempio al README, fatta da GitHub).
- Il 9 ottobre 2026 le build si erano bloccate per un `package-lock.json` non allineato a `package.json` (`npm ci` si ferma). Si ripara rigenerando il file con `npm install` e verificando con `npm ci`.

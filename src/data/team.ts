// Staff e fornitori mostrati sul sito, nell'ordine di visualizzazione.
// Per aggiungere una persona: metti la foto in public/staff/ (o public/fornitori/)
// e aggiungi una riga qui sotto.

export interface StaffMember {
  name: string;
  role: string;
  role_en: string;
  photo: string;
}

export interface Fornitore {
  name: string;
  photo: string;
}

export const staff: StaffMember[] = [
  { name: 'Chiara Aquilino', role: 'Titolare', role_en: 'Owner', photo: '/staff/chiara-aquilino.webp' },
  { name: 'Giovanni Manfredini', role: 'Supporto Cucina e Negozio', role_en: 'Kitchen and shop support', photo: '/staff/giovanni-manfredini.webp' },
  { name: 'Fiore', role: 'Addetta al banco e alla cassa', role_en: 'Counter and till assistant', photo: '/staff/fiore.webp' },
  { name: 'Mabel Kodua', role: 'Commessa', role_en: 'Shop assistant', photo: '/staff/mabel-kodua.webp' },
  { name: 'Laura Tallarini', role: 'Chef', role_en: 'Chef', photo: '/staff/laura-tallarini.webp' },
  { name: 'Nicola Paolini', role: 'Cuoco', role_en: 'Cook', photo: '/staff/nicola-paolini.webp' },
  { name: 'Piergiorgio Manfredini', role: 'Tuttofare', role_en: 'All-round helper', photo: '/staff/piergiorgio-manfredini.webp' },
];

export const fornitori: Fornitore[] = [
  { name: 'Azienda agricola Fattoria della Valle', photo: '/fornitori/azienda-agricola-fattoria-della-valle.webp' },
  { name: 'Bio-Pan', photo: '/fornitori/bio-pan.webp' },
];

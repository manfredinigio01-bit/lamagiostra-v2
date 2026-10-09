// Staff e fornitori mostrati sul sito, nell'ordine di visualizzazione.
// Per aggiungere una persona: metti la foto in public/staff/ (o public/fornitori/)
// e aggiungi una riga qui sotto.

export interface StaffMember {
  name: string;
  role: string;
  photo: string;
}

export interface Fornitore {
  name: string;
  photo: string;
}

export const staff: StaffMember[] = [
  { name: 'Chiara Aquilino', role: 'Titolare', photo: '/staff/chiara-aquilino.webp' },
  { name: 'Giovanni Manfredini', role: 'Supporto Cucina e Negozio', photo: '/staff/giovanni-manfredini.webp' },
  { name: 'Fiore', role: 'Addetta al banco e alla cassa', photo: '/staff/fiore.webp' },
  { name: 'Mabel Kodua', role: 'Commessa', photo: '/staff/mabel-kodua.webp' },
  { name: 'Laura Tallarini', role: 'Chef', photo: '/staff/laura-tallarini.webp' },
  { name: 'Nicola Paolini', role: 'Cuoco', photo: '/staff/nicola-paolini.webp' },
  { name: 'Piergiorgio Manfredini', role: 'Tuttofare', photo: '/staff/piergiorgio-manfredini.webp' },
];

export const fornitori: Fornitore[] = [
  { name: 'Azienda agricola Fattoria della Valle', photo: '/fornitori/azienda-agricola-fattoria-della-valle.webp' },
  { name: 'Bio-Pan', photo: '/fornitori/bio-pan.webp' },
];

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
  /** Facoltativa: senza foto la pagina mostra una scheda con solo il nome. */
  photo?: string;
}

export const staff: StaffMember[] = [
  { name: 'Chiara', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/chiara-aquilino.webp' },
  { name: 'Giovanni', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/giovanni-manfredini.webp' },
  { name: 'Fiore', role: 'Bottega', role_en: 'Shop', photo: '/staff/fiore.webp' },
  { name: 'Mabel', role: 'Bottega', role_en: 'Shop', photo: '/staff/mabel-kodua.webp' },
  { name: 'Laura', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/laura-tallarini.webp' },
  { name: 'Nicola', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/nicola-paolini.webp' },
  { name: 'Piergiorgio', role: 'Bottega', role_en: 'Shop', photo: '/staff/piergiorgio-manfredini.webp' },
];

export const fornitori: Fornitore[] = [
  { name: 'Luna nel Pozzo' },
  { name: 'Bio-Pan', photo: '/fornitori/bio-pan.webp' },
  { name: 'Cascina Marasco' },
  { name: 'Daniele' },
];

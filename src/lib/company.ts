// Dati dell'attività in un unico posto: footer, pagine legali, contatti e dati
// strutturati (Google) li leggono da qui. Per cambiare un numero o un orario basta modificare questo file.

export const COMPANY = {
  brand: 'La Magiostra',
  legalName: 'La Magiostra di Aquilino e C. s.n.c.',
  vatNumber: '01093010195', // P.IVA
  // Numero REA (Camera di Commercio), da mostrare sul sito per le società (art. 2250 c.c.).
  reaNumber: 'CR-134075' as string,
  // PEC (facoltativa ma consigliata per le società): se presente viene mostrata nel footer.
  pec: 'magiostra@pec.it' as string,
  street: 'Via Grado 1',
  postalCode: '26100',
  city: 'Cremona',
  province: 'CR',
  email: 'aquilinochiara@libero.it',
  mobile: { display: '+39 320 2254238', tel: '+393202254238', whatsapp: '393202254238' },
  landline: { display: '+39 0372 21415', tel: '+39037221415' },
  instagram: 'https://www.instagram.com/lamagiostra/',
  facebook: 'https://www.facebook.com/LaMagiostra',
  mapsUrl: 'https://maps.google.com/?q=La+Magiostra,+Via+Grado+1,+26100+Cremona',
  foundedYear: 1987,
  hours: {
    tueFri: '9:30-14:30 / 17:00-19:30',
    sat: '9:30-14:30',
  },
} as const;

export function whatsappLink(language: string): string {
  const text =
    language === 'it'
      ? 'Ciao! Vorrei ordinare alcuni prodotti da La Magiostra.'
      : 'Hi! I would like to place an order at La Magiostra.';
  return `https://wa.me/${COMPANY.mobile.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Sito di prova (v3): impostato dalla variabile di build VITE_AMBIENTE=prova su Cloudflare.
// Per sicurezza vale anche se il sito viene aperto da un indirizzo *.workers.dev.
export const IS_PROVA =
  import.meta.env.VITE_AMBIENTE === 'prova' ||
  (typeof window !== 'undefined' && window.location.hostname.endsWith('.workers.dev'));

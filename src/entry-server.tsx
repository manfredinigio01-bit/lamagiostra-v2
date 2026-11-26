// Usato solo durante il build (npm run build): prepara l'HTML di ogni pagina in anticipo,
// così chi non esegue JavaScript (alcuni motori di ricerca e assistenti come ChatGPT o Perplexity)
// legge subito i testi. Nel browser il sito poi riprende vita da solo (hydrateRoot in main.tsx).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
}

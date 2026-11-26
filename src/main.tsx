import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Le pagine arrivano già disegnate dal build (strumenti/prerender.mjs): React le "riattiva" senza ridisegnarle.
// In sviluppo (npm run dev) la pagina è vuota e si disegna da zero.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

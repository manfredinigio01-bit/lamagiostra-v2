import { BookOpen, Camera, ChefHat } from 'lucide-react';
import type { TipoRacconto } from '../data/racconti';

export const TIPI: Record<TipoRacconto, { it: string; en: string; icona: typeof BookOpen }> = {
  racconto: { it: 'Racconto', en: 'Story', icona: BookOpen },
  ricetta: { it: 'Ricetta', en: 'Recipe', icona: ChefHat },
  foto: { it: 'Foto', en: 'Photos', icona: Camera },
};

export function dataLeggibile(data: string, language: string): string {
  return new Date(`${data}T12:00:00`).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

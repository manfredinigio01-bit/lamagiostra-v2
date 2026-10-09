/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Verde "bosco" più profondo e sobrio: sostituisce l'emerald standard in tutto il sito.
        emerald: {
          50: '#f2f7f2',
          100: '#e0ece0',
          200: '#c3dac4',
          300: '#96bf9a',
          400: '#62a06b',
          500: '#3d8250',
          600: '#2d6a41',
          700: '#25553a',
          800: '#1d432f',
          900: '#163626',
          950: '#0d2217',
        },
        // Sfondo caldo, tipo carta da pane.
        cream: '#faf7f1',
      },
      fontFamily: {
        // Solo font di sistema: nessun download, nessun ritardo.
        display: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};

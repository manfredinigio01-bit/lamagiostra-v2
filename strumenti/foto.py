"""Prepara le foto del sito per il web (richiede Python 3 con Pillow: pip install pillow).
   python3 strumenti/foto.py
- Ridimensiona le foto più grandi del necessario (lato lungo massimo indicato sotto).
- Crea le miniature dei cesti (-400 e -600 pixel di larghezza) usate da srcSet nella home e nella pagina Ricorrenze.
Gli originali restano nella storia di GitHub e nelle copie del Drive."""
from PIL import Image
import pathlib
PUB = pathlib.Path(__file__).resolve().parent.parent / 'public'

RIDIMENSIONA = {  # file: (lato lungo massimo, qualità webp)
    'bancone_frutta_e_verdura.webp': (1400, 75),  # sfondo al 20% e riquadro della galleria
    'tavoli_pranzo.webp': (1800, 80),             # foto principale della home su computer
}
for nome, (lato, q) in RIDIMENSIONA.items():
    f = PUB / nome; im = Image.open(f)
    if max(im.size) > lato:
        k = lato / max(im.size); im = im.resize((round(im.size[0] * k), round(im.size[1] * k)), Image.LANCZOS)
        im.save(f, 'WEBP', quality=q, method=6); print('ridimensionata', nome, im.size)

# Sfondi in cima alle pagine: si vedono al 20% di opacità, quindi bastano versioni piccole e leggere.
SFONDI = ['bancone_frutta_e_verdura.webp', 'banco_gastronomia.webp', 'tavoli_pranzo_mobile.webp']
for nome in SFONDI:
    im = Image.open(PUB / nome); k = 900 / max(im.size)
    out = PUB / nome.replace('.webp', '-sfondo.webp')
    im.resize((round(im.size[0] * k), round(im.size[1] * k)), Image.LANCZOS).save(out, 'WEBP', quality=55, method=6)
    print('sfondo', out.name, out.stat().st_size // 1024, 'KB')

for f in sorted((PUB / 'cesti').glob('*.webp')):
    if f.stem.endswith(('-400', '-600')): continue
    im = Image.open(f)
    for w in (400, 600):
        h = round(im.size[1] * w / im.size[0])
        im.resize((w, h), Image.LANCZOS).save(f.with_name(f'{f.stem}-{w}.webp'), 'WEBP', quality=80, method=6)
    print('miniature', f.name)

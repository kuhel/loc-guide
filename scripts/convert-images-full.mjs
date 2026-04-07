/**
 * Generates full-resolution (uncropped) WebP versions for modal display.
 * Output: public/images/barcelona/{id}-full.webp  (max 1400px wide, original ratio)
 */
import sharp from 'sharp';
import { join, basename, extname } from 'path';
import { readdir } from 'fs/promises';
import { execSync } from 'child_process';

const SRC = '/Users/gleb/Documents/Apps/Loc Guide/src/pics/barcelona';
const DEST = '/Users/gleb/Documents/Apps/Loc Guide/public/images/barcelona';

const MAP = {
  'bar_brutal':              'bar-brutal',
  'la_pepita':               'la-pepita',
  'garage_bar':              'garage-bar',
  'Maldita_Barra':           'maldita-barra',
  'Colmado_Wilmot':          'colmado-wilmot',
  'Casa_Mariol':             'casa-mariol',
  'Mediamanga':              'mediamanga',
  'El_raco_de_l_aguir ':     'el-raco-de-laguir',
  'Monestir_de_pedralbes':   'monestir-de-pedralbes',
  'sarria':                  'sarria-neighborhood',
  'Les_tres_xemeneies':      'les-tres-xemeneies',
  'Gustavo_Gili_Building':   'gustavo-gili',
  'Monastery_of_Sant_Cugat': 'monastery-sant-cugat',
  'Casa_Gomis_La Ricarda':   'casa-gomis',
  'Natural_Science_Museum':  'natural-science-museum-granollers',
};

const files = await readdir(SRC);

for (const file of files) {
  const nameWithoutExt = basename(file, extname(file));
  const slug = MAP[nameWithoutExt];
  if (!slug) continue; // skip hero and unknowns

  let srcPath = join(SRC, file);

  // AVIF: convert to JPEG first via sips (sharp's libvips doesn't support this AVIF variant)
  if (file.endsWith('.avif')) {
    const tmp = `/tmp/${nameWithoutExt}-full.jpg`;
    execSync(`sips -s format jpeg "${srcPath}" --out "${tmp}"`);
    srcPath = tmp;
  }

  const destPath = join(DEST, `${slug}-full.webp`);

  await sharp(srcPath)
    .resize(1400, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, effort: 5 })
    .toFile(destPath);

  console.log(`✓  ${file}  →  ${slug}-full.webp`);
}

console.log('\nDone.');

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const SRC = '/Users/gleb/Documents/Apps/Loc Guide/src/pics/barcelona';
const DEST = '/Users/gleb/Documents/Apps/Loc Guide/public/images/barcelona';

// Map source filename → output slug
const MAP = {
  'barcelona_hero':       { slug: 'hero',                         width: 2000, height: 1000 },
  'bar_brutal':           { slug: 'bar-brutal',                   width: 800,  height: 1000 },
  'la_pepita':            { slug: 'la-pepita',                    width: 800,  height: 1000 },
  'garage_bar':           { slug: 'garage-bar',                   width: 800,  height: 1000 },
  'Maldita_Barra':        { slug: 'maldita-barra',                width: 800,  height: 1000 },
  'Colmado_Wilmot':       { slug: 'colmado-wilmot',               width: 800,  height: 1000 },
  'Casa_Mariol':          { slug: 'casa-mariol',                  width: 800,  height: 1000 },
  'Mediamanga':           { slug: 'mediamanga',                   width: 800,  height: 1000 },
  'El_raco_de_l_aguir ':  { slug: 'el-raco-de-laguir',           width: 800,  height: 1000 },
  'Monestir_de_pedralbes':{ slug: 'monestir-de-pedralbes',        width: 800,  height: 1000 },
  'sarria':               { slug: 'sarria-neighborhood',          width: 800,  height: 1000 },
  'Les_tres_xemeneies':   { slug: 'les-tres-xemeneies',           width: 800,  height: 1000 },
  'Gustavo_Gili_Building':{ slug: 'gustavo-gili',                 width: 800,  height: 1000 },
  'Monastery_of_Sant_Cugat':{ slug: 'monastery-sant-cugat',      width: 800,  height: 1000 },
  'Casa_Gomis_La Ricarda':{ slug: 'casa-gomis',                   width: 800,  height: 1000 },
  'Natural_Science_Museum':{ slug: 'natural-science-museum-granollers', width: 800, height: 1000 },
};

const files = await readdir(SRC);

for (const file of files) {
  const nameWithoutExt = basename(file, extname(file));
  const entry = MAP[nameWithoutExt];
  if (!entry) {
    console.warn(`⚠  No mapping for: ${file}`);
    continue;
  }
  const srcPath = join(SRC, file);
  const destPath = join(DEST, `${entry.slug}.webp`);
  const isHero = entry.slug === 'hero';

  await sharp(srcPath)
    .resize(entry.width, entry.height, {
      fit: isHero ? 'cover' : 'cover',
      position: 'attention',
    })
    .webp({ quality: 82, effort: 5 })
    .toFile(destPath);

  console.log(`✓  ${file}  →  ${entry.slug}.webp`);
}

console.log('\nDone.');

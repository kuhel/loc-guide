/**
 * Full-resolution (uncropped) WebP versions for modal display.
 * Output: public/images/istanbul/{slug}-full.webp  (max 1400px wide, original ratio)
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const SRC  = '/Users/gleb/Documents/Apps/Loc Guide/src/pics/istanbul';
const DEST = '/Users/gleb/Documents/Apps/Loc Guide/public/images/istanbul';

const MAP = {
  'Arada':                  'arada',
  'Backyard':               'backyard',
  'Cesme_Bazlama_Kahvalti': 'cesme-bazlama',
  'Croissantcı':            'croissantci',
  'Foxy_Nisantasi':         'foxy-nisantasi',
  'Grungy':                 'grungy',
  'Metet_Kozde_Doner ':     'metet-koze-doner',
  'Prince_Islands':         'prince-islands',
  'Probador_Colectiva':     'probador-colectiva',
  'Rita_Deli':              'rita-deli',
  'Sakip_Sabanci_Museum':   'sakip-sabanci-museum',
  'Solera':                 'solera-winery',
  'St_Regis_Brasserie':     'st-regis-brasserie',
  'Suleymaniye_Hamami':     'suleymaniye-hamami',
  'Trattoria_La_Scarpetta': 'trattoria-la-scarpetta',
  'Van_Kahvalti_Evi':       'van-kahvalti',
  'Vefali_Kofteci ':        'vefali-kofteci',
  'Wohha_studio':           'wohha-coffee',
  'Yeni_Lokanta':           'yeni-lokanta',
  'brekkie-croissant-cookie': 'brekkie-croissant',
};

if (!existsSync(DEST)) await mkdir(DEST, { recursive: true });

const files = await readdir(SRC);

for (const file of files) {
  const nameWithoutExt = basename(file, extname(file));
  const slug = MAP[nameWithoutExt];
  if (!slug) continue;

  let srcPath = join(SRC, file);

  // AVIF: convert to JPEG first via sips
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

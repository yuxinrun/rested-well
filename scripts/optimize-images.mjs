import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const dir = 'public/images';

const files = (await readdir(dir)).filter((file) => file.toLowerCase().endsWith('.png'));

if (files.length === 0) {
  console.log('没有需要转换的 PNG 图片。');
  process.exit(0);
}

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.png$/i, '.webp'));
  const meta = await sharp(input).metadata();
  const width = Math.min(meta.width ?? 1600, 1600);

  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output);

  await unlink(input);
  console.log(`已转换 ${file} → ${path.basename(output)}`);
}

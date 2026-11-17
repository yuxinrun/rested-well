import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dir = 'content/articles';

const files = (await readdir(dir)).filter((file) => file.endsWith('.mdx'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  const raw = await readFile(fullPath, 'utf8');
  const lines = raw.split(/\r?\n/);

  // 只处理第二个 --- 之后的正文，保留 frontmatter 中的合法引号
  let fenceCount = 0;
  const output = lines.map((line) => {
    if (line.trim() === '---') {
      fenceCount += 1;
      return line;
    }
    if (fenceCount < 2) return line;

    const count = (line.match(/"/g) ?? []).length;
    if (count === 0) return line;
    if (count % 2 !== 0) {
      console.warn(`跳过引号不成对的行：${file} -> ${line.slice(0, 40)}`);
      return line;
    }

    let open = true;
    return line.replace(/"/g, () => {
      const mark = open ? '「' : '」';
      open = !open;
      return mark;
    });
  });

  await writeFile(fullPath, output.join('\n'), 'utf8');
  console.log(`已处理 ${file}`);
}

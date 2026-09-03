import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const distPath = join(process.cwd(), 'dist');

copyFileSync(join(distPath, 'index.html'), join(distPath, '404.html'));

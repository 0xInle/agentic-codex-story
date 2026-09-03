import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { contentRegistries } from '../src/content/index.js';
import { validateContent } from '../src/lib/contentValidation.js';

const ignoredDirectories = new Set(['node_modules', '.git', 'dist']);

function collectTypeScriptFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const filePath = join(directory, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      return ignoredDirectories.has(entry) ? [] : collectTypeScriptFiles(filePath);
    }

    return /\.tsx?$/.test(entry) ? [filePath] : [];
  });
}

if (!existsSync('SPEC.md')) {
  throw new Error('SPEC.md is required for content validation.');
}

const typeScriptFiles = collectTypeScriptFiles('.');

if (typeScriptFiles.length > 0) {
  throw new Error(`TypeScript files are not allowed: ${typeScriptFiles.join(', ')}`);
}

const result = validateContent(contentRegistries);

if (!result.valid) {
  result.errors.forEach((error) => console.error(`${error.path}: ${error.code} — ${error.message}`));
  process.exitCode = 1;
} else {
  console.log('Content validation passed: SPEC.md is present, no TypeScript files were found, and content contracts are valid.');
}

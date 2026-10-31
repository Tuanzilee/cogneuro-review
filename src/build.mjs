import { build } from 'esbuild';
await build({ entryPoints: ['src/browser-entry.mjs'], bundle: true, splitting: true, format: 'esm', outdir: 'vendor', entryNames: 'fsrs', chunkNames: 'fsrs-[hash]', minify: true, target: 'es2022', legalComments: 'linked' });

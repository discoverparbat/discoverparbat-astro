// Reads the real width/height of a photo in /public at build time,
// so og:image and schema always state the true size.
import { imageSize } from 'image-size';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map();

/** @param {string} path e.g. "/kokhe.jpg" → { width, height } or null */
export function getImageSize(path) {
  if (!path || /^https?:/.test(path)) return null;
  if (cache.has(path)) return cache.get(path);
  const file = join(process.cwd(), 'public', path);
  let size = null;
  if (existsSync(file)) {
    try {
      const s = imageSize(readFileSync(file));
      size = { width: s.width, height: s.height };
    } catch { size = null; }
  }
  cache.set(path, size);
  return size;
}

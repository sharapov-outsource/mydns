/**
 * Draws mydns's icons. The tile, the supersampling and the PNG writer live in
 * the service kit; what is here is the glyph — a delegation, one zone above and
 * three below, with the accent on the root.
 *
 *   node scripts/make-icons.js
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { makeIcons, roundedRect, segment } from '@sharapov/service-kit/make-icons';

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

/** Coordinates are the same 1024-unit grid public/icon.svg is drawn on. */
function glyph(at, x, y) {
  const stroke = at(23);

  // The root node carries the one accent in the mark.
  if (Math.hypot(x - at(512), y - at(300)) <= at(76)) return 'accent';

  for (const [cx, cy] of [[288, 640], [512, 640], [736, 640]]) {
    if (Math.hypot(x - at(cx), y - at(cy)) <= at(66)) return 'paper';
  }

  const branches = [
    [512, 356, 512, 460],
    [288, 460, 736, 460],
    [288, 460, 288, 564],
    [736, 460, 736, 564],
    [512, 460, 512, 564],
  ];
  for (const [x1, y1, x2, y2] of branches) {
    if (segment(x, y, at(x1), at(y1), at(x2), at(y2)) <= stroke) return 'paper';
  }
  return null;
}

// Exported so a test can assert the mark still fits inside its tile.
export { glyph, roundedRect };

makeIcons({ publicDir: PUBLIC_DIR, glyph });

/**
 * Adjusts a hex color's brightness by the given amount (-1 to 1).
 * Positive amt lightens, negative amt darkens.
 */
export function adjustColor(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 0xff) + 255 * amt)));
  const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 0xff) + 255 * amt)));
  const b = Math.min(255, Math.max(0, Math.round((n & 0xff) + 255 * amt)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function lightenColor(hex: string, amt: number): string {
  return adjustColor(hex, amt);
}

export function darkenColor(hex: string, amt: number): string {
  return adjustColor(hex, -amt);
}

/**
 * lib/colorThief.ts
 * Utilidad para extraer paleta de colores de imágenes usando ColorThief.
 * Se usa en el cliente (browser) para adaptar colores dinámicamente.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export function rgbToString({ r, g, b }: RGB, alpha = 1): string {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Extrae el color dominante y la paleta de una imagen.
 * Importar solo en componentes con client:load / client:only.
 */
export async function extractPalette(
  imgEl: HTMLImageElement,
  colorCount = 5
): Promise<{ dominant: RGB; palette: RGB[] }> {
  // ColorThief se carga desde CDN en el HTML que lo use
  const CT = (window as unknown as { ColorThief: new () => { getColor: (img: HTMLImageElement) => [number,number,number]; getPalette: (img: HTMLImageElement, n: number) => [number,number,number][] } }).ColorThief;
  if (!CT) throw new Error('ColorThief no está disponible en window');

  const thief = new CT();

  const toRGB = ([r, g, b]: [number, number, number]): RGB => ({ r, g, b });

  const dominant = toRGB(thief.getColor(imgEl));
  const palette = thief.getPalette(imgEl, colorCount).map(toRGB);

  return { dominant, palette };
}

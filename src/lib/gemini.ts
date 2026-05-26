/**
 * lib/gemini.ts
 * Utilidad para interactuar con Google Generative AI (Gemini).
 * Úsalo en endpoints de Astro (src/pages/api/*.ts) con output: 'server'
 * o en scripts de build para generar contenido dinámico.
 *
 * Ejemplo de uso en un endpoint:
 *   import { generateContent } from '@/lib/gemini';
 *   const text = await generateContent('Genera un titular para...');
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// La API key debe estar en .env como GEMINI_API_KEY
function getClient(): GoogleGenerativeAI {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no está definida en .env');
  return new GoogleGenerativeAI(apiKey);
}

export type GeminiModel = 'gemini-1.5-flash' | 'gemini-1.5-pro';

export interface GenerateOptions {
  model?: GeminiModel;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Genera texto con Gemini dado un prompt.
 */
export async function generateContent(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const { model = 'gemini-1.5-flash', temperature = 0.7, maxOutputTokens = 1024 } = options;

  const genAI = getClient();
  const genModel = genAI.getGenerativeModel({
    model,
    generationConfig: { temperature, maxOutputTokens },
  });

  const result = await genModel.generateContent(prompt);
  return result.response.text();
}

/**
 * Genera variantes de copy para secciones de la landing.
 * Útil para A/B testing o personalización por región.
 */
export async function generateLandingCopy(section: string, context: string): Promise<string> {
  const prompt = `
Eres un experto en copywriting para plataformas de educación tecnológica en Latinoamérica.
Escribe el texto para la sección "${section}" de una landing page.
Contexto: ${context}
Responde solo con el texto, sin explicaciones adicionales.
Idioma: español.
`;
  return generateContent(prompt, { temperature: 0.8 });
}

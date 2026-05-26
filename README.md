# 🟢 Platzi Landing Page

Landing page de precios de Platzi construida con **Astro**, **TypeScript** y **Tailwind CSS**.  
Diseñada para ser **escalable, mantenible y fácil de modificar** sin tocar código de componentes.

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Astro](https://astro.build) | Framework principal (SSG) |
| [TypeScript](https://typescriptlang.org) | Tipado estático en todo el proyecto |
| [Tailwind CSS](https://tailwindcss.com) + `@astrojs/tailwind` | Estilos utilitarios |
| [Google Generative AI](https://ai.google.dev) | Generación de copy con Gemini |
| [ColorThief](https://lokeshdhakar.com/projects/color-thief/) | Extracción de paleta de colores de imágenes |
| [`@astrojs/check`](https://docs.astro.build/en/guides/typescript/) | Verificación de tipos en build |

---

## 📁 Estructura del proyecto

```
platzi-landing/
├── src/
│   ├── data/
│   │   └── site.ts          ⭐ FUENTE ÚNICA DE VERDAD — edita aquí
│   ├── lib/
│   │   ├── gemini.ts        Utilidades para Google Generative AI
│   │   └── colorThief.ts    Utilidades para extracción de colores
│   ├── components/
│   │   ├── UniversityBanner.astro
│   │   ├── HeroSection.astro
│   │   ├── PricingSection.astro
│   │   ├── StatsSection.astro
│   │   ├── SuccessCases.astro
│   │   ├── BenefitsSection.astro
│   │   ├── CompanyLogos.astro
│   │   ├── FAQSection.astro
│   │   └── CTASection.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── public/
│   └── favicon.svg
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 🚀 Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env
# → Edita .env con tu GEMINI_API_KEY

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:4321

# 4. Build de producción
npm run build

# 5. Previsualizar build
npm run preview
```

---

## ✏️ Cómo modificar el contenido

**Todas las secciones se controlan desde un único archivo:**

```
src/data/site.ts
```

### Cambiar precios

```ts
// src/data/site.ts
export const PLANS: Plan[] = [
  {
    id: 'expert',
    priceMonthly: 29,   // ← precio mensual
    priceAnnual: 20,    // ← precio anual
    // ...
  },
];
```

### Agregar/quitar planes

Agrega un objeto al array `PLANS` siguiendo la interfaz `Plan`. El grid se adapta automáticamente.

### Cambiar estadísticas

```ts
export const STATS: Stat[] = [
  { value: '70%', description: 'de los graduados...' },
  // agregar o quitar objetos aquí
];
```

### Agregar una nueva sección

1. Crea `src/components/MiSeccion.astro`
2. Agrega los datos necesarios en `src/data/site.ts`
3. Importa y usa el componente en `src/pages/index.astro`

### Activar/desactivar el banner universitario

```ts
export const BANNER = {
  enabled: false, // ← cambiar a false para ocultar
  // ...
};
```

---

## 🤖 Integración con Google Generative AI

Para generar copy dinámico con Gemini:

```ts
// src/pages/api/copy.ts (requiere output: 'server' en astro.config.mjs)
import { generateLandingCopy } from '@/lib/gemini';

export async function GET() {
  const headline = await generateLandingCopy(
    'hero',
    'Plataforma de cursos de tecnología para Latinoamérica'
  );
  return new Response(JSON.stringify({ headline }));
}
```

---

## 🎨 Integración con ColorThief

Para adaptar colores de la UI según imágenes dinámicas:

```ts
// En un componente con script cliente
import { extractPalette, rgbToHex } from '@/lib/colorThief';

const img = document.querySelector<HTMLImageElement>('#hero-img')!;
img.addEventListener('load', async () => {
  const { dominant, palette } = await extractPalette(img);
  document.documentElement.style.setProperty('--accent', rgbToHex(dominant));
});
```

> ⚠️ ColorThief requiere que la imagen esté en el mismo origen o tenga CORS habilitado.

---

## 🎨 Colores personalizados (Tailwind)

Definidos en `tailwind.config.mjs`:

```js
colors: {
  platzi: {
    green:   '#98CA3F',   // color principal
    bg:      '#121212',   // fondo general
    surface: '#1a1a1a',   // tarjetas
    border:  '#2a2a2a',   // bordes
    muted:   '#888888',   // texto secundario
    subtle:  '#555555',   // texto muy tenue
  }
}
```

Para agregar un color nuevo, añádelo aquí y estará disponible como `text-platzi-{nombre}`, `bg-platzi-{nombre}`, etc.

---

## 📦 Deploy

Compatible con cualquier plataforma de hosting estático:

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages, Cloudflare Pages, etc.
npm run build  # → genera carpeta dist/
```

---

## 🔒 Variables de entorno

| Variable | Descripción | Requerida |
|---|---|---|
| `GEMINI_API_KEY` | API Key de Google AI Studio | Solo si usas Gemini |

---

## 📝 Licencia

Proyecto de uso privado. Inspirado en el diseño de [Platzi](https://platzi.com).

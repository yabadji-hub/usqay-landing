/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        usqay: {
          orange:        '#E85C1A',
          'orange-dark': '#C44B15',
          'orange-light':'#FFF0E8',
          navy:          '#1B3D6E',
          'navy-light':  '#EEF2F8',
          bg:            '#FFFFFF',
          cream:         '#FDF8F4',
          surface:       '#F9F5F1',
          card:          '#FFFFFF',
          border:        '#EDE8E0',
          muted:         '#6B7280',
          subtle:        '#9CA3AF',
          text:          '#1C1917',
          green:         '#16A34A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

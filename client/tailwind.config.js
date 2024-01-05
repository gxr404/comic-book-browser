/** @type {import('tailwindcss').Config} */

export default {
  // TODO
  important: true,
  darkMode: 'class',
  content: [
    'client/index.html',
    'client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'p-1': 'rgb(var(--c-p-1) / <alpha-value>)',
        'p-2': 'rgb(var(--c-p-2) / <alpha-value>)',
        'p-3': 'rgb(var(--c-p-3) / <alpha-value>)',
        'p-4': 'rgb(var(--c-p-4) / <alpha-value>)',
        's-1': 'rgb(var(--c-s-1) / <alpha-value>)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'br': 'inset 0 0 0 1px var(--c-br)',
        'top': '0 -4px 20px rgba(88, 99, 148, 0.17)',
        'bottom': '0 4px 20px rgba(88, 99, 148, 0.17)',
        'cover-1': '0 0 20px 5px #ddd',
        'cover-2': '0 0 20px 5px rgb(0 0 0 / 14%)'
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
      )
      addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)')
      addVariant('children', '& > *')
      addVariant('scrollbar', '&::-webkit-scrollbar')
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
      addVariant('demo-dark', '.demo-dark &')
    },
    // require('@tailwindcss/line-clamp'),
  ]
}
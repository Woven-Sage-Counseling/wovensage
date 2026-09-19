/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#E8E2D4',
        },
        sage: {
          DEFAULT: '#5C6B58',
          light: '#7A8A76',
          dark: '#2E3B2A',
        },
        accent: {
          DEFAULT: '#9A543C',
        },
        charcoal: {
          DEFAULT: '#3A3A38',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        signature: ['Ruthie', 'cursive'],
      },
    },
  },
  plugins: [],
};

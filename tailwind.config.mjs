/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F4EE',
        },
        sage: {
          DEFAULT: '#98A995',
          light: '#B5C0B3',
          dark: '#6F7F6C',
        },
        accent: {
          DEFAULT: '#B9B5AE',
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

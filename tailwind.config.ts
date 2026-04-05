import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
        },
        neutral: {
          DEFAULT: 'rgb(var(--color-neutral) / <alpha-value>)',
          dark: 'rgb(var(--color-neutral-dark) / <alpha-value>)',
          muted: 'rgb(var(--color-neutral-muted) / <alpha-value>)',
        },
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
    },
  },
} satisfies Config;

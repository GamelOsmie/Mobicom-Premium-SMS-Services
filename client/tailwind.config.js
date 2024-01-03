/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
      },
      textColor: {
        primary: 'var(--color-primary)',
        primary_hover: 'var(--color-hover-primary)',
        menu: 'var(--color-menu-items)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        approved: 'var(--color-approved)',
        pending: 'var(--color-pending)',
        rejected: 'var(--color-rejected)',
      },
      backgroundColor: {
        base: 'var(--color-background)',
        primary: 'var(--color-primary)',
        primary_hover: 'var(--color-hover-primary)',
        primary_transparent: 'var(--color-primary-transparent)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        approved: 'var(--color-approved-bg)',
        pending: 'var(--color-pending-bg)',
        rejected: 'var(--color-rejected-bg)',
        light_primary: 'var(--color-accent-primary)',
        light_secondary: 'var(--color-accent-secondary)',
      },
      borderColor: {
        primary: 'var(--color--primary)',
        secondary: 'var(--color--secondary)',
        tertiary: 'var(--color--tertiary)',
      },
      fontSize: {
        ss: '.55rem',
        sms: '.65rem',
      },
      ring: {
        primary: 'var(--color-primary)',
      },
    },
    variants: {
      extend: {
        fontFamily: ['hover', 'focus'],
        backgroundColor: ['hover', 'focus'],
        borderColor: ['hover', 'focus'],
      },
    },
  },
  plugins: [],
};

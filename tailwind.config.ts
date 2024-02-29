import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        yellow: {
          10: 'rgb(255, 255, 0)',
        },
        gray: {
          10: 'rgb(156, 163, 175)',
        },
        brown: {
          10: 'rgba(100, 80, 60, 0.50)',
          50: '#64503C',
        },
        purple: {
          10: 'rgb(88, 41, 128)',
          20: 'rgb(41, 27, 75)',
        },
        transparent: {
          black: 'rgba(0, 0, 0, 0.50)',
          purple: 'rgba(153, 0, 127, 0.60)',
          pink: 'rgba(242, 173, 255, 0.50)',
        },
        blue: { DEFAULT: '#0080FF', 10: '#002BFF' },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      textShadow: {
        'stroke-md':
          '0px 0px 34px rgba(153, 0, 127, 0.60), var(--tw-shadow-color) 6px 0px 0px, var(--tw-shadow-color) 5.91686px 0.995377px 0px, var(--tw-shadow-color) 5.66974px 1.96317px 0px, var(--tw-shadow-color) 5.2655px 2.87655px 0px, var(--tw-shadow-color) 4.71532px 3.71022px 0px, var(--tw-shadow-color) 4.03447px 4.44106px 0px, var(--tw-shadow-color) 3.24181px 5.04883px 0px, var(--tw-shadow-color) 2.35931px 5.51667px 0px, var(--tw-shadow-color) 1.41143px 5.83163px 0px, var(--tw-shadow-color) 0.424423px 5.98497px 0px, var(--tw-shadow-color) -0.574341px 5.97245px 0px, var(--tw-shadow-color) -1.55719px 5.79441px 0px, var(--tw-shadow-color) -2.49688px 5.45578px 0px, var(--tw-shadow-color) -3.36738px 4.96596px 0px, var(--tw-shadow-color) -4.14455px 4.33852px 0px, var(--tw-shadow-color) -4.80686px 3.59083px 0px, var(--tw-shadow-color) -5.33596px 2.74364px 0px, var(--tw-shadow-color) -5.71718px 1.8204px 0px, var(--tw-shadow-color) -5.93995px 0.84672px 0px, var(--tw-shadow-color) -5.99811px -0.150428px 0px, var(--tw-shadow-color) -5.89004px -1.14341px 0px, var(--tw-shadow-color) -5.61874px -2.1047px 0px, var(--tw-shadow-color) -5.19172px -3.00766px 0px, var(--tw-shadow-color) -4.62082px -3.82727px 0px, var(--tw-shadow-color) -3.92186px -4.54081px 0px, var(--tw-shadow-color) -3.11421px -5.12852px 0px, var(--tw-shadow-color) -2.22026px -5.57409px 0px, var(--tw-shadow-color) -1.26477px -5.86518px 0px, var(--tw-shadow-color) -0.274238px -5.99373px 0px, var(--tw-shadow-color) 0.723898px -5.95617px 0px, var(--tw-shadow-color) 1.70197px -5.75355px 0px, var(--tw-shadow-color) 2.63288px -5.39147px 0px, var(--tw-shadow-color) 3.49082px -4.87998px 0px, var(--tw-shadow-color) 4.25202px -4.23324px 0px, var(--tw-shadow-color) 4.89538px -3.46919px 0px, var(--tw-shadow-color) 5.40307px -2.60899px 0px, var(--tw-shadow-color) 5.76102px -1.67649px 0px, var(--tw-shadow-color) 5.95932px -0.697531px 0px',
        stroke:
          '0px 0px 12px rgba(153, 0, 127, 0.60), var(--tw-shadow-color) 3px 0px 0px, var(--tw-shadow-color) 2.83487px 0.981584px 0px, var(--tw-shadow-color) 2.35766px 1.85511px 0px, var(--tw-shadow-color) 1.62091px 2.52441px 0px, var(--tw-shadow-color) 0.705713px 2.91581px 0px, var(--tw-shadow-color) -0.287171px 2.98622px 0px, var(--tw-shadow-color) -1.24844px 2.72789px 0px, var(--tw-shadow-color) -2.07227px 2.16926px 0px, var(--tw-shadow-color) -2.66798px 1.37182px 0px, var(--tw-shadow-color) -2.96998px 0.42336px 0px, var(--tw-shadow-color) -2.94502px -0.571704px 0px, var(--tw-shadow-color) -2.59586px -1.50383px 0px, var(--tw-shadow-color) -1.96093px -2.27041px 0px, var(--tw-shadow-color) -1.11013px -2.78704px 0px, var(--tw-shadow-color) -0.137119px -2.99686px 0px, var(--tw-shadow-color) 0.850987px -2.87677px 0px, var(--tw-shadow-color) 1.74541px -2.43999px 0px, var(--tw-shadow-color) 2.44769px -1.73459px 0px, var(--tw-shadow-color) 2.88051px -0.838247px 0px',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
} satisfies Config;

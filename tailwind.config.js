/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        moneygraphy: ['MoneygraphyRounded', 'sans-serif'],
      },
      keyframes: {
        orbit: {
          "0%": {
            transform: "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
          },
          "100%": {
            transform: "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
          },
        },
        pingOuter: {
          '0%': { transform: 'scale(0.3)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        pingInner: {
          '0%': { transform: 'scale(0.3)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        orbit: "orbit var(--duration, 20s) linear infinite", // fallback: 20s
        pingOuter: 'pingOuter 2s ease-out infinite',
        pingInner: 'pingInner 2s ease-out infinite',
        typing: 'typing 2s steps(20) forwards',
        blink: 'blink 0.2s step-end infinite'
      },
    },
  },
  plugins: [],
}


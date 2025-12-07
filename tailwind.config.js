/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Match slide theme
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a5a',  // Main navy from slides
          900: '#1e293b',
        },
        heat: {
          cool: '#22c55e',    // Green - cool
          mild: '#84cc16',    // Light green
          warm: '#eab308',    // Yellow
          hot: '#f97316',     // Orange
          extreme: '#ef4444', // Red - hot
        }
      }
    },
  },
  plugins: [],
}


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {
              colors: {
                primary: '#00C6FF', // Cyan
                secondary: '#0072FF', // Blue
              },
              backgroundImage: {
                'accent-gradient': 'linear-gradient(to right, #00C6FF, #0072FF)',
              }
            },
          },
        }),
        autoprefixer(),
      ],
    },
  },
})

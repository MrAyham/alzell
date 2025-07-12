import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    // Disable the module preload polyfill because it relies on
    // `new Function` which is blocked in strict CSP environments
    // like Vercel by default.
    modulePreload: {
      polyfill: false,
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  define: {
    'process.env': {},
  },
})

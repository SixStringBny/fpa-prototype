import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is supplied at build time by the GitHub Pages workflow
// (VITE_BASE=/fpa-prototype/). Local dev and preview use `/`.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/',
  build: {
    outDir: 'dist',
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ❌ REMOVE base — Vercel breaks with './'
  // base: '/vite-react/'  // DON'T USE THIS
  // base: './',            // DON'T USE THIS

  server: {
    port: 5173,
    open: true
  },

  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

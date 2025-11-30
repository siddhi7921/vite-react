import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // REQUIRED for Vercel to load assets correctly
  base: '',

  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

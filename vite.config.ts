import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ⚠️ Important for GitHub Pages
  base: '/vite-react/',

  // Optional: Customize server for local dev
  server: {
    port: 5173,        // default Vite port
    open: true         // opens browser automatically
  },

  // Optional: Build settings
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

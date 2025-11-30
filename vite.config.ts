import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Correct for Vercel (NEVER use ./ or /repo-name)
  base: "/",

  build: {
    outDir: "dist",
  }
})

import { defineConfig } from 'vite'   // <-- Yahan 'react' ki jagah 'vite' aayega
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    watch: {
      usePolling: true, // Agar aap WSL ya kisi virtual environment mein hain, toh ye zaroori hai
    },
  },
})
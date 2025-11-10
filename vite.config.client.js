// vite.config.client.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss()
  ],
  build: {
    outDir: 'dist/client',
    // ✅ Don't override input — Vite will use root/index.html
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

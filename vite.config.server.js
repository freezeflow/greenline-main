// vite.config.server.js
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
    ssr: './src/main.server.js',
    outDir: 'dist/server',
    rollupOptions: {
      input: './src/main.server.js', // your SSR entry
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

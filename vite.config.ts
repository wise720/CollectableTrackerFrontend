import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  plugins: [vue(), vueJsx(), nightwatchPlugin(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    cors: {
      origin: '*', // Allows all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type'], // Allowed headers
      credentials: true, // Allow credentials (cookies, HTTP authentication)
    },
    hmr: true, // Ensure HMR is enabled
    port: 3001,
  },
  build: {
    rollupOptions: {
      plugins: [dynamicImportVars({})],
    },
  },
})

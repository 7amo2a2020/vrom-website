import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so every asset and
  // in-page link has to be relative to that prefix. Overridden to '/' by the
  // build that goes to the real domain.
  base: process.env.VITE_BASE ?? '/vrom-website/',
  plugins: [react(), tailwindcss()],
  build: {
    // Three real HTML files rather than a client router: a static host serves
    // /privacy.html directly, with no rewrite rules to get wrong.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
  server: {
    // 5173 belongs to the admin panel; keep both runnable at once.
    port: 5174,
    strictPort: true,
  },
})

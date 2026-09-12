import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { getSeoConfig, renderHeadTags } from './scripts/seo.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'portfolio-seo',
      transformIndexHtml(html) {
        return html.replace('<!-- seo:tags -->', renderHeadTags(getSeoConfig()))
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})

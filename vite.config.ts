import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

import { viteStaticCopy } from 'vite-plugin-static-copy'
const isPreview = process.env.VERCEL_ENV === 'production';


// @ts-ignore
console.log(__VERCEL_ENV__);

export default defineConfig({
  define: {
    // @ts-ignore
    __VERCEL_ENV__: JSON.stringify(__VERCEL_ENV__ || ''),
  },
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    tailwindcss(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: isPreview ? 'static/manifest.preview.json' : 'static/manifest.prod.json',
          dest: '',
          rename: 'manifest.json',
        },
        {
          src: isPreview
            ? 'static/.well-known/web-app-origin-association.preview'
            : 'static/.well-known/web-app-origin-association.prod',
          dest: '.well-known',
          rename: 'web-app-origin-association',
        }
      ]
    }),
    VitePWA({
        strategies: 'generateSW',
        injectRegister: null,
        includeAssets: [
            "**/*",
        ],
        workbox: {
          maximumFileSizeToCacheInBytes: 5000000,
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          importScripts: [
            '/service-worker.js',
          ],
        },
        manifest: false,
        scope: '/',
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html'
        },
      })
  ],
})

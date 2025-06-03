import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    tailwindcss(),
    react(),
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

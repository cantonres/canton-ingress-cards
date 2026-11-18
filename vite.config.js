import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.DEPLOY_TARGET === 'edgeone' ? '/' : '/canton-ingress-cards/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  server: {
    host: '127.0.0.1',
    port: 5175,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4175,
    strictPort: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/zaragoza': {
        target: 'https://www.zaragoza.es',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zaragoza/, '/sede/servicio')
      },
      '/api/murcia': {
        target: 'https://nexo.carm.es',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/murcia/, '/nexo/archivos/recursos/opendata/json')
      }
    }
  }
})

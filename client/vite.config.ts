import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react-swc'
// import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   gzipSize: true,
    //   brotliSize: true,
    //   emitFile: false,
    //   filename: "visualizer.html",
    //   open:true
    // })
  ],
  build: {
    outDir: '../client-dist'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  server: {
    proxy: {
      '/api':  {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/public':  {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})


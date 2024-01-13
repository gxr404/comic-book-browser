import path from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react-swc'
import { viteVConsole } from 'vite-plugin-vconsole'
// import { visualizer } from "rollup-plugin-visualizer"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...viteVConsole({
        entry: path.resolve('client/src/main.tsx'), // or you can use entry: [path.resolve('src/main.ts')]
        enabled: true,
        config: {
          maxLogNumber: 1000,
          theme: 'dark'
        }
      }),
      apply: 'serve'
    }
    // visualizer({
    //   gzipSize: true,
    //   brotliSize: true,
    //   emitFile: false,
    //   filename: "visualizer.html",
    //   open:true
    // })
  ],
  build: {
    outDir: '../client-dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  server: {
    host: '0.0.0.0',
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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ✅ Optimized Vite config (without @tailwindcss/vite)
export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    postcss: './postcss.config.cjs', // ensures Tailwind runs correctly
  },

  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'terser',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },

  server: {
    open: true,
    port: 5173,
  },
})

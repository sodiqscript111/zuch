// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    minify: 'terser', // Use Terser for aggressive JS minification
    cssMinify: true, // Minify CSS
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        pure_funcs: ['console.log'], // Treat as side-effect-free
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
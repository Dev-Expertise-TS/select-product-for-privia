import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Development server settings
  server: {
    hmr: true,
    port: 5173,
  },
  
  // Build configuration for library mode
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/select-hotel-product-item.web-component.ts'),
      name: 'SelectHotelProductWidget',
      fileName: (format) => `select-hotel-product-widget.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React/jsx-runtime'
        }
      }
    },
    sourcemap: true
  },
  
  // CSS handling
  css: {
    postcss: './postcss.config.js'
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components')
    }
  }
});
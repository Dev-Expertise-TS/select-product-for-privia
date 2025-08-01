import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/select-hotel-product-item.standalone.ts'),
      name: 'SelectHotelProductWidget',
      fileName: (format) => `select-hotel-product-widget-standalone.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist/webcomponent',
    rollupOptions: {
      // React와 React-DOM을 번들에 포함시킴
      external: [], // 빈 배열로 설정하여 모든 의존성을 번들에 포함
      output: {
        // CSS를 JS에 인라인으로 포함
        inlineDynamicImports: true,
      }
    },
    sourcemap: true,
    minify: true
  },
  
  css: {
    postcss: './postcss.config.js'
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components')
    }
  }
});
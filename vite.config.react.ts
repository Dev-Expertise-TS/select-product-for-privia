import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// TypeScript 선언 파일 생성을 위한 플러그인
const generateDts = () => {
  return {
    name: 'generate-dts',
    writeBundle() {
      const dtsContent = `import { FC } from 'react';

export interface SelectHotelProductItemProps {
  sabreId: number;
  checkIn: Date | string;
  nights?: number;
  numOfPeople?: string;
}

export declare const SelectHotelProductItem: FC<SelectHotelProductItemProps>;
`;
      
      fs.writeFileSync(
        path.resolve(__dirname, 'dist/react/select-hotel-product-item.d.ts'),
        dtsContent
      );
    }
  };
};

export default defineConfig({
  plugins: [react(), generateDts()],
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/select-hotel-product-item.tsx'),
      name: 'SelectHotelProductItem',
      fileName: (format) => `select-hotel-product-item.${format}.js`,
      formats: ['es', 'cjs']
    },
    outDir: 'dist/react',
    rollupOptions: {
      // React는 외부 의존성으로 처리 (peer dependency)
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React/jsx-runtime'
        }
      }
    },
    sourcemap: true,
    minify: false, // React 컴포넌트는 보통 minify하지 않음
    cssCodeSplit: true
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
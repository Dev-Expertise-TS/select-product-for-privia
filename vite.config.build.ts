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

declare const SelectHotelProductWidget: any;
export default SelectHotelProductWidget;
`;
      
      // dist 폴더에 .d.ts 파일 생성
      fs.writeFileSync(
        path.resolve(__dirname, 'dist/select-hotel-product-widget.d.ts'),
        dtsContent
      );
      
      // dist 폴더에 React 컴포넌트 export
      fs.writeFileSync(
        path.resolve(__dirname, 'dist/index.d.ts'),
        `export { SelectHotelProductItem, SelectHotelProductItemProps } from './select-hotel-product-widget';
export { default } from './select-hotel-product-widget';
`
      );
    }
  };
};

export default defineConfig({
  plugins: [react(), generateDts()],
  
  build: {
    emptyOutDir: false,  // 기존 dist 디렉토리 내용 유지
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
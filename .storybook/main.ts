import type { StorybookConfig } from 'storybook';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    // CSS 처리를 위한 설정
    config.css = {
      modules: {
        localsConvention: 'camelCase'
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    };
    
    // Path alias 설정
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': resolve(__dirname, '..'),
        '@/components': resolve(__dirname, '../src/components'),
        '@/lib': resolve(__dirname, '../src/lib'),
        '@/hooks': resolve(__dirname, '../src/hooks')
      }
    };
    
    return config;
  }
};

export default config;
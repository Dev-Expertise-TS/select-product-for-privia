#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function buildAll() {
  console.log('🚀 Starting integrated build process...\n');

  try {
    // 1. Clean dist directories
    console.log('📦 Cleaning dist directories...');
    await fs.remove(path.join(rootDir, 'dist'));
    await fs.remove(path.join(rootDir, 'storybook-static'));
    await fs.ensureDir(path.join(rootDir, 'dist'));
    
    // 2. Build Web Component bundles
    console.log('\n🔧 Building Web Component bundles...');
    execSync('pnpm vite build --config vite.config.build.ts', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 3. Copy React component source files
    console.log('\n📋 Copying React component source files...');
    const componentSrc = path.join(rootDir, 'components/select-hotel-product-item.tsx');
    const componentDest = path.join(rootDir, 'dist/select-hotel-product-item.tsx');
    await fs.copy(componentSrc, componentDest);
    
    // 4. Build React component as CommonJS
    console.log('\n⚛️ Building React component CommonJS module...');
    const cjsContent = `
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const { SelectHotelProductItem } = require('./select-hotel-product-item.tsx');

exports.SelectHotelProductItem = SelectHotelProductItem;
exports.default = SelectHotelProductItem;
`;
    await fs.writeFile(path.join(rootDir, 'dist/index.js'), cjsContent);
    
    // 5. Create package.json for dist
    console.log('\n📄 Creating package.json for dist...');
    const distPackageJson = {
      name: "select-hotel-product-widget",
      version: "0.1.0",
      main: "index.js",
      module: "select-hotel-product-widget.es.js",
      types: "index.d.ts",
      exports: {
        ".": {
          import: "./select-hotel-product-widget.es.js",
          require: "./index.js",
          types: "./index.d.ts"
        },
        "./react": {
          import: "./select-hotel-product-item.tsx",
          require: "./index.js",
          types: "./index.d.ts"
        }
      },
      peerDependencies: {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    };
    await fs.writeJson(
      path.join(rootDir, 'dist/package.json'), 
      distPackageJson, 
      { spaces: 2 }
    );
    
    // 6. Build Storybook
    console.log('\n📚 Building Storybook static site...');
    execSync('pnpm build-storybook', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 7. Summary
    console.log('\n✅ Build completed successfully!\n');
    console.log('📁 Output locations:');
    console.log('   - Web Component bundles: ./dist/');
    console.log('   - React Component: ./dist/select-hotel-product-item.tsx');
    console.log('   - TypeScript definitions: ./dist/*.d.ts');
    console.log('   - Storybook static site: ./storybook-static/');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();
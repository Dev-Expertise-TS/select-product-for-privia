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
    
    // 2. Build standalone Web Component bundles
    console.log('\n🔧 Building standalone Web Component bundles...');
    execSync('pnpm build:webcomponent', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 3. Build React component module
    console.log('\n⚛️ Building React component module...');
    execSync('pnpm build:react', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 4. Build original integrated bundle (for backward compatibility)
    console.log('\n📦 Building integrated bundle...');
    execSync('pnpm build:widget', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 5. Create package.json files for different build outputs
    console.log('\n📄 Creating package.json files...');
    
    // Ensure directories exist
    await fs.ensureDir(path.join(rootDir, 'dist/react'));
    await fs.ensureDir(path.join(rootDir, 'dist/webcomponent'));
    
    // Main package.json in dist/
    const mainDistPackageJson = {
      name: "select-hotel-product-widget",
      version: "0.1.0",
      main: "select-hotel-product-widget.umd.js",
      module: "select-hotel-product-widget.es.js",
      types: "index.d.ts",
      exports: {
        ".": {
          import: "./select-hotel-product-widget.es.js",
          require: "./select-hotel-product-widget.umd.js",
          types: "./index.d.ts"
        },
        "./react": {
          import: "./react/select-hotel-product-widget.es.js",
          require: "./react/select-hotel-product-widget.umd.js",
          types: "./react/index.d.ts"
        },
        "./webcomponent": {
          import: "./webcomponent/select-hotel-product-widget-standalone.es.js",
          require: "./webcomponent/select-hotel-product-widget-standalone.umd.js"
        }
      },
      peerDependencies: {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    };
    await fs.writeJson(
      path.join(rootDir, 'dist/package.json'), 
      mainDistPackageJson, 
      { spaces: 2 }
    );
    
    // React module package.json
    const reactPackageJson = {
      name: "select-hotel-product-widget-react",
      version: "0.1.0",
      main: "select-hotel-product-widget.umd.js",
      module: "select-hotel-product-widget.es.js",
      types: "index.d.ts",
      peerDependencies: {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    };
    await fs.writeJson(
      path.join(rootDir, 'dist/react/package.json'), 
      reactPackageJson, 
      { spaces: 2 }
    );
    
    // Web component package.json
    const webComponentPackageJson = {
      name: "select-hotel-product-widget-standalone",
      version: "0.1.0",
      main: "select-hotel-product-widget-standalone.umd.js",
      module: "select-hotel-product-widget-standalone.es.js",
      description: "Standalone web component with all dependencies bundled"
    };
    await fs.writeJson(
      path.join(rootDir, 'dist/webcomponent/package.json'), 
      webComponentPackageJson, 
      { spaces: 2 }
    );
    
    // 6. Create README files for each distribution
    console.log('\n📝 Creating README files...');
    
    const webComponentReadme = `# Standalone Web Component

This is a standalone web component bundle that includes all dependencies (React, ReactDOM, etc.).

## Usage

### ES Module
\`\`\`html
<script type="module" src="select-hotel-product-widget-standalone.es.js"></script>
<select-hotel-product 
  sabre-id="383336"
  check-in="2025-08-15"
  nights="2"
  num-of-people="2">
</select-hotel-product>
\`\`\`

### UMD (Legacy browsers)
\`\`\`html
<script src="select-hotel-product-widget-standalone.umd.js"></script>
\`\`\`
`;
    await fs.writeFile(
      path.join(rootDir, 'dist/webcomponent/README.md'),
      webComponentReadme
    );
    
    const reactReadme = `# React Component Module

This is a React component module that requires React and ReactDOM as peer dependencies.

## Usage

\`\`\`javascript
import { SelectHotelProductItem } from 'select-hotel-product-widget/react';

function App() {
  return (
    <SelectHotelProductItem
      sabreId={383336}
      checkIn="2025-08-15"
      nights={2}
      numOfPeople="2"
    />
  );
}
\`\`\`
`;
    await fs.writeFile(
      path.join(rootDir, 'dist/react/README.md'),
      reactReadme
    );
    
    // 7. Build Storybook
    console.log('\n📚 Building Storybook static site...');
    execSync('pnpm build:storybook', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 8. Summary
    console.log('\n✅ Build completed successfully!\n');
    console.log('📁 Output locations:');
    console.log('   - Standalone Web Component: ./dist/webcomponent/');
    console.log('   - React Component Module: ./dist/react/');
    console.log('   - Integrated Bundle: ./dist/');
    console.log('   - TypeScript definitions: ./dist/**/*.d.ts');
    console.log('   - Storybook static site: ./storybook-static/');
    console.log('\n📦 Bundle types:');
    console.log('   - webcomponent/: Standalone with all dependencies bundled');
    console.log('   - react/: React component requiring React as peer dependency');
    console.log('   - dist/: Original integrated bundle (backward compatibility)');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();
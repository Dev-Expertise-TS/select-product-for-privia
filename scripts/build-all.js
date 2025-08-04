#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function buildAll() {
  console.log('🚀 Starting integrated build process...\n');

  try {
    // 1. Clean and prepare dist directories
    console.log('📦 Preparing dist directories...');
    
    // Clean only root dist files, not subdirectories
    const distPath = path.join(rootDir, 'dist');
    try {
      const files = await fs.readdir(distPath);
      for (const file of files) {
        const filePath = path.join(distPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          await fs.unlink(filePath);
        }
      }
    } catch (e) {
      // Create dist directory if it doesn't exist
      await fs.mkdir(distPath, { recursive: true });
    }
    
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
          import: "./react/select-hotel-product-item.es.js",
          require: "./react/select-hotel-product-item.cjs.js",
          types: "./react/select-hotel-product-item.d.ts"
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
    await fs.writeFile(
      path.join(rootDir, 'dist/package.json'), 
      JSON.stringify(mainDistPackageJson, null, 2)
    );
    
    // React module package.json
    const reactPackageJson = {
      name: "select-hotel-product-widget-react",
      version: "0.1.0",
      main: "select-hotel-product-item.cjs.js",
      module: "select-hotel-product-item.es.js",
      types: "select-hotel-product-item.d.ts",
      peerDependencies: {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    };
    
    // Check if react dist directory exists from build
    const reactDir = path.join(rootDir, 'dist/react');
    try {
      await fs.access(reactDir);
      await fs.writeFile(
        path.join(reactDir, 'package.json'), 
        JSON.stringify(reactPackageJson, null, 2)
      );
    } catch (e) {
      console.warn('⚠️ React build directory not found, skipping package.json creation');
    }
    
    // Web component package.json
    const webComponentPackageJson = {
      name: "select-hotel-product-widget-standalone",
      version: "0.1.0",
      main: "select-hotel-product-widget-standalone.umd.js",
      module: "select-hotel-product-widget-standalone.es.js",
      description: "Standalone web component with all dependencies bundled"
    };
    
    // Check if webcomponent dist directory exists from build
    const webComponentDir = path.join(rootDir, 'dist/webcomponent');
    try {
      await fs.access(webComponentDir);
      await fs.writeFile(
        path.join(webComponentDir, 'package.json'), 
        JSON.stringify(webComponentPackageJson, null, 2)
      );
    } catch (e) {
      console.warn('⚠️ Web component build directory not found, skipping package.json creation');
    }
    
    // 6. Verify build outputs exist before creating documentation
    console.log('\n🔍 Verifying build outputs...');
    
    let webComponentFiles = [];
    try {
      webComponentFiles = await fs.readdir(path.join(rootDir, 'dist/webcomponent'));
      const hasWebComponentBuild = webComponentFiles.some(f => f.endsWith('.js'));
      
      if (!hasWebComponentBuild) {
        console.error('❌ Web component build files not found in dist/webcomponent/');
        console.log('   Files found:', webComponentFiles);
      } else {
        console.log('✅ Web component build verified');
      }
    } catch (e) {
      console.error('❌ Web component directory not found');
    }
    
    let reactFiles = [];
    try {
      reactFiles = await fs.readdir(path.join(rootDir, 'dist/react'));
      const hasReactBuild = reactFiles.some(f => f.endsWith('.js'));
      
      if (!hasReactBuild) {
        console.error('❌ React build files not found in dist/react/');
        console.log('   Files found:', reactFiles);
      } else {
        console.log('✅ React build verified');
      }
    } catch (e) {
      console.error('❌ React directory not found');
    }
    
    // 7. Create README files for each distribution
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

## Files in this directory:
${webComponentFiles.map(f => `- ${f}`).join('\n')}
`;
    // Check if webcomponent directory exists before writing README
    try {
      await fs.access(path.join(rootDir, 'dist/webcomponent'));
      await fs.writeFile(
        path.join(rootDir, 'dist/webcomponent/README.md'),
        webComponentReadme
      );
    } catch (e) {
      console.warn('⚠️ Web component directory not found, skipping README creation');
    }
    
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

## Files in this directory:
${reactFiles.map(f => `- ${f}`).join('\n')}
`;
    // Check if react directory exists before writing README
    try {
      await fs.access(path.join(rootDir, 'dist/react'));
      await fs.writeFile(
        path.join(rootDir, 'dist/react/README.md'),
        reactReadme
      );
    } catch (e) {
      console.warn('⚠️ React directory not found, skipping README creation');
    }
    
    // 8. Build Storybook (after all file operations)
    console.log('\n📚 Building Storybook static site...');
    execSync('pnpm build:storybook', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    // 9. Summary
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
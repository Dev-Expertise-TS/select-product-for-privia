#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const storybookDir = path.join(rootDir, 'storybook-static');

console.log('🧪 Testing Storybook Static Build...\n');

// Test 1: Check if storybook-static directory exists
console.log('1️⃣ Checking Storybook build directory...');
if (fs.existsSync(storybookDir)) {
  console.log('   ✅ storybook-static directory exists');
} else {
  console.log('   ❌ storybook-static directory not found');
  process.exit(1);
}

// Test 2: Check essential files
console.log('\n2️⃣ Checking essential files...');
const essentialFiles = [
  'index.html',
  'iframe.html',
  'favicon.ico'
];

let allFilesExist = true;
for (const file of essentialFiles) {
  const filePath = path.join(storybookDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
    allFilesExist = false;
  }
}

// Test 3: Check if stories are included in the build
console.log('\n3️⃣ Checking story assets...');
const assetsDir = path.join(storybookDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  const storyAssets = assets.filter(file => file.includes('stories') || file.includes('docs'));
  
  console.log(`   ✅ Found ${storyAssets.length} story/docs assets:`);
  storyAssets.forEach(asset => {
    const size = (fs.statSync(path.join(assetsDir, asset)).size / 1024).toFixed(2);
    console.log(`      - ${asset} (${size} KB)`);
  });
} else {
  console.log('   ❌ Assets directory not found');
}

// Test 4: Validate index.html structure
console.log('\n4️⃣ Validating index.html structure...');
const indexPath = path.join(storybookDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const checks = [
    { test: indexContent.includes('<!DOCTYPE html>'), desc: 'Valid HTML5 doctype' },
    { test: indexContent.includes('<div id="root">'), desc: 'Root element exists' },
    { test: indexContent.includes('manager'), desc: 'Manager bundle referenced' },
    { test: indexContent.includes('<title>'), desc: 'Title tag exists' }
  ];
  
  checks.forEach(check => {
    console.log(`   ${check.test ? '✅' : '❌'} ${check.desc}`);
  });
} else {
  console.log('   ❌ index.html not found');
}

// Test 5: Start a simple HTTP server to test the build
console.log('\n5️⃣ Testing HTTP server for Storybook...');
const testServerScript = `
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join('${storybookDir}', req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
      }[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(0, () => {
  const port = server.address().port;
  console.log(\`Server running at http://localhost:\${port}\`);
  
  // Test if we can fetch the index page
  http.get(\`http://localhost:\${port}/\`, (res) => {
    console.log(\`HTTP Status: \${res.statusCode}\`);
    server.close();
  }).on('error', (err) => {
    console.log('Server test failed:', err.message);
    server.close();
  });
});
`;

try {
  fs.writeFileSync(path.join(__dirname, 'test-server.cjs'), testServerScript);
  const result = execSync(`node ${path.join(__dirname, 'test-server.cjs')}`, { encoding: 'utf8' });
  console.log(`   ✅ ${result.trim()}`);
  fs.unlinkSync(path.join(__dirname, 'test-server.cjs'));
} catch (error) {
  console.log(`   ❌ Server test failed: ${error.message}`);
}

// Test 6: Check build size
console.log('\n6️⃣ Checking build size...');
function getDirectorySize(dir) {
  let totalSize = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  }
  
  return totalSize;
}

const totalSize = getDirectorySize(storybookDir);
const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
console.log(`   📊 Total build size: ${sizeInMB} MB`);

if (totalSize < 50 * 1024 * 1024) { // Less than 50MB
  console.log('   ✅ Build size is reasonable');
} else {
  console.log('   ⚠️  Build size is large, consider optimization');
}

console.log('\n✅ Storybook build validation complete!');
console.log(`\n📝 To serve Storybook locally, run: npx http-server ${storybookDir} -p 8080`);
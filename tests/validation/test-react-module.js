#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');

console.log('🧪 Testing React Component Module...\n');

// Test 1: Check if TypeScript definitions exist
console.log('1️⃣ Checking TypeScript definitions...');
const dtsFiles = ['index.d.ts', 'select-hotel-product-widget.d.ts'];
let allDtsExist = true;

for (const file of dtsFiles) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
    allDtsExist = false;
  }
}

// Test 2: Test ES Module import
console.log('\n2️⃣ Testing ES Module import...');
const testESModule = `
import { SelectHotelProductItem } from '${distDir}/select-hotel-product-widget.es.js';
console.log(typeof SelectHotelProductItem === 'function' ? 'ES Module import successful' : 'ES Module import failed');
`;

try {
  fs.writeFileSync(path.join(__dirname, 'test-es.mjs'), testESModule);
  const result = execSync(`node ${path.join(__dirname, 'test-es.mjs')}`, { encoding: 'utf8' });
  console.log(`   ✅ ${result.trim()}`);
  fs.unlinkSync(path.join(__dirname, 'test-es.mjs'));
} catch (error) {
  console.log(`   ❌ ES Module import failed: ${error.message}`);
}

// Test 3: Test if React component can be instantiated
console.log('\n3️⃣ Testing React component instantiation...');
const testReactComponent = `
import React from 'react';
import { SelectHotelProductItem } from '${distDir}/select-hotel-product-widget.es.js';

// Check if component has expected properties
const props = {
  sabreId: 123456,
  checkIn: '2025-08-12',
  nights: 1,
  numOfPeople: '2'
};

try {
  const element = React.createElement(SelectHotelProductItem, props);
  console.log(element.type === SelectHotelProductItem ? 'Component instantiation successful' : 'Component instantiation failed');
} catch (error) {
  console.log('Component instantiation failed:', error.message);
}
`;

try {
  fs.writeFileSync(path.join(__dirname, 'test-react.mjs'), testReactComponent);
  const result = execSync(`node ${path.join(__dirname, 'test-react.mjs')}`, { encoding: 'utf8' });
  console.log(`   ✅ ${result.trim()}`);
  fs.unlinkSync(path.join(__dirname, 'test-react.mjs'));
} catch (error) {
  console.log(`   ❌ React component test failed: ${error.message}`);
}

// Test 4: Check bundle size
console.log('\n4️⃣ Checking bundle sizes...');
const bundles = [
  { file: 'select-hotel-product-widget.es.js', maxSize: 1000 }, // 1MB
  { file: 'select-hotel-product-widget.umd.js', maxSize: 600 }, // 600KB
  { file: 'style.css', maxSize: 20 } // 20KB
];

for (const bundle of bundles) {
  const filePath = path.join(distDir, bundle.file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    if (stats.size / 1024 <= bundle.maxSize) {
      console.log(`   ✅ ${bundle.file}: ${sizeInKB} KB (max: ${bundle.maxSize} KB)`);
    } else {
      console.log(`   ⚠️  ${bundle.file}: ${sizeInKB} KB (exceeds max: ${bundle.maxSize} KB)`);
    }
  } else {
    console.log(`   ❌ ${bundle.file} not found`);
  }
}

console.log('\n✅ React module validation complete!');
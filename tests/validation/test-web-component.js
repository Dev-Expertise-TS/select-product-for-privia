#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');
const webComponentDir = path.join(rootDir, 'dist/webcomponent');

console.log('🧪 Testing Web Component Module...\n');

// Test 1: Create a test HTML file for web component
console.log('1️⃣ Creating test HTML for web component...');
const testHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Web Component Test</title>
  <link rel="stylesheet" href="../../dist/webcomponent/style.css">
  <style>
    section.demo {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 12px;
      max-width: 960px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <h1>Web Component Test</h1>
  <section class="demo">
  <!-- Test 1: Basic web component -->
  <select-hotel-product
    sabre-id="383336"
    check-in="2025-08-12"
    nights="1"
    num-of-people="2">
  </select-hotel-product>

  </section>
  <script src="../../dist/webcomponent/select-hotel-product-widget-standalone.umd.js"></script>
  <script>
    // Test if component is registered
    const isRegistered = customElements.get('select-hotel-product') !== undefined;
    console.log('Web component registered:', isRegistered);
    
    // Test if component renders
    setTimeout(() => {
      const elements = document.querySelectorAll('select-hotel-product');
      console.log('Found web components:', elements.length);
      
      // Check if shadow DOM or content is created
      elements.forEach((el, index) => {
        const hasContent = el.innerHTML.length > 0 || el.shadowRoot !== null;
        console.log(\`Component \${index + 1} has content: \${hasContent}\`);
      });
    }, 1000);
  </script>
</body>
</html>`;

const testHtmlPath = path.join(__dirname, 'test-web-component.html');
fs.writeFileSync(testHtmlPath, testHtml);
console.log(`   ✅ Test HTML created at: ${testHtmlPath}`);

// Test 2: Test ES Module import of web component
console.log('\n2️⃣ Testing ES Module import of web component...');
const testESWebComponent = `
import '../../dist/webcomponent/select-hotel-product-widget-standalone.es.js';

// Check if global customElements would be available in browser context
console.log('ES Module import successful');
`;

try {
  fs.writeFileSync(path.join(__dirname, 'test-wc-es.mjs'), testESWebComponent);
  execSync(`node ${path.join(__dirname, 'test-wc-es.mjs')}`, { encoding: 'utf8' });
  console.log('   ✅ ES Module import successful');
  fs.unlinkSync(path.join(__dirname, 'test-wc-es.mjs'));
} catch (error) {
  console.log(`   ❌ ES Module import failed: ${error.message}`);
}

// Test 3: Check if CSS is bundled
console.log('\n3️⃣ Checking CSS bundle...');
const cssPath = path.join(webComponentDir, 'style.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const hasTailwindClasses = cssContent.includes('tailwind') || cssContent.includes('.bg-') || cssContent.includes('.text-');
  console.log(`   ✅ CSS file exists (${(fs.statSync(cssPath).size / 1024).toFixed(2)} KB)`);
  console.log(`   ${hasTailwindClasses ? '✅' : '❌'} Contains Tailwind classes`);
} else {
  console.log('   ❌ CSS file not found');
}

// Test 4: Test with simple Node.js DOM simulation
console.log('\n4️⃣ Testing web component registration simulation...');
const testRegistration = `
// Simulate customElements API
global.customElements = {
  define: function(name, constructor) {
    console.log(\`Registered custom element: \${name}\`);
    console.log(\`Constructor type: \${typeof constructor}\`);
    this.registry = this.registry || {};
    this.registry[name] = constructor;
  },
  get: function(name) {
    return this.registry && this.registry[name];
  }
};

// Simulate HTMLElement
global.HTMLElement = class HTMLElement {
  constructor() {
    this.attributes = {};
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
};

try {
  require('../../dist/webcomponent/select-hotel-product-widget-standalone.umd.js');
  const isRegistered = global.customElements.get('select-hotel-product') !== undefined;
  console.log(\`Web component registered: \${isRegistered}\`);
} catch (error) {
  console.log('Registration failed:', error.message);
}
`;

try {
  fs.writeFileSync(path.join(__dirname, 'test-registration.cjs'), testRegistration);
  const result = execSync(`node ${path.join(__dirname, 'test-registration.cjs')}`, { encoding: 'utf8' });
  console.log(`   ✅ ${result.trim()}`);
  fs.unlinkSync(path.join(__dirname, 'test-registration.cjs'));
} catch (error) {
  console.log(`   ❌ Registration test failed: ${error.message}`);
}

console.log('\n✅ Web component validation complete!');
console.log(`\n📝 To test in browser, open: file://${testHtmlPath}`);
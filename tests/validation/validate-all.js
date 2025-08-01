#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

console.log('🚀 Running All Validation Tests\n');
console.log('=' .repeat(50));

const tests = [
  {
    name: 'React Component Module',
    script: 'test-react-module.js',
    description: 'Validates React component ES modules, TypeScript definitions, and bundle sizes'
  },
  {
    name: 'Web Component Module',
    script: 'test-web-component.js',
    description: 'Validates web component registration, attributes, and browser compatibility'
  },
  {
    name: 'Storybook Static Build',
    script: 'test-storybook-build.js',
    description: 'Validates Storybook build output and static file generation'
  }
];

const results = [];

// Run each test
for (const test of tests) {
  console.log(`\n🧪 Running: ${test.name}`);
  console.log(`📝 ${test.description}`);
  console.log('-'.repeat(50));
  
  const scriptPath = path.join(__dirname, test.script);
  
  try {
    // Make script executable
    if (process.platform !== 'win32') {
      execSync(`chmod +x ${scriptPath}`);
    }
    
    // Run the test
    const output = execSync(`node ${scriptPath}`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log(output);
    results.push({ name: test.name, status: 'PASSED', output });
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    results.push({ name: test.name, status: 'FAILED', error: error.message });
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

const passed = results.filter(r => r.status === 'PASSED').length;
const failed = results.filter(r => r.status === 'FAILED').length;

results.forEach(result => {
  const icon = result.status === 'PASSED' ? '✅' : '❌';
  console.log(`${icon} ${result.name}: ${result.status}`);
});

console.log('\n' + '-'.repeat(50));
console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);

// Generate validation report
const reportPath = path.join(rootDir, 'validation-report.json');
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: results.length,
    passed,
    failed
  },
  results: results.map(r => ({
    name: r.name,
    status: r.status,
    ...(r.error && { error: r.error })
  }))
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 Validation report saved to: ${reportPath}`);

// Exit with appropriate code
process.exit(failed > 0 ? 1 : 0);
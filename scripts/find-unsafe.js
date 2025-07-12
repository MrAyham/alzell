const fs = require('fs');
const path = require('path');

function scan(dir, patterns, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(p, patterns, results);
    } else {
      const text = fs.readFileSync(p, 'utf8');
      for (const pat of patterns) {
        if (pat.regex.test(text)) {
          results.push(`${p}: ${pat.name}`);
        }
      }
    }
  }
  return results;
}

const patterns = [
  { name: 'eval(', regex: /eval\s*\(/ },
  { name: 'new Function', regex: /new\s+Function\s*\(/ },
  { name: 'setTimeout(string)', regex: /setTimeout\s*\(\s*['"]/ },
  { name: 'setInterval(string)', regex: /setInterval\s*\(\s*['"]/ },
];

const results = scan(path.resolve(__dirname, '..'), patterns);

if (results.length === 0) {
  console.log('No unsafe patterns found.');
} else {
  for (const line of results) {
    console.log(line);
  }
  process.exitCode = 1;
}

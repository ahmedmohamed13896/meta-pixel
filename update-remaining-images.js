const fs = require('fs');
const { glob } = require('glob');

// Function to replace image extensions in file content
async function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // Replace .jpg, .jpeg, .png with .webp in src attributes
  const patterns = [
    { from: /\.jpg/g, to: '.webp' },
    { from: /\.jpeg/g, to: '.webp' },
    { from: /\.png/g, to: '.webp' }
  ];
  
  patterns.forEach(pattern => {
    // Only replace in image src/poster attributes, not in comments or other places
    const regex = new RegExp(`(src|poster)=(["'])([^"']*\\${pattern.from.source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(["'])`, 'gi');
    content = content.replace(regex, (match, attr, quote1, path, quote2) => {
      // Skip if already .webp or .svg
      if (path.includes('.webp') || path.includes('.svg')) {
        return match;
      }
      const newPath = path.replace(pattern.from, pattern.to);
      changes++;
      return `${attr}=${quote1}${newPath}${quote2}`;
    });
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${filePath}: ${changes} image reference(s)`);
    return changes;
  }
  return 0;
}

// Update all HTML files
async function updateAllHTML() {
  console.log('Updating remaining HTML files...\n');
  
  const htmlFiles = await glob('*.html');
  let totalChanges = 0;
  
  for (const file of htmlFiles) {
    const changes = await updateFile(file);
    totalChanges += changes;
  }
  
  console.log(`\nTotal changes: ${totalChanges}`);
}

updateAllHTML().catch(console.error);


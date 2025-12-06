const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Files to update
const filesToUpdate = [
  'index.html',
  'about.html',
  'contact.html',
  'services.html',
  'projects.html',
  'project.html',
  'assets/js/*.js'
];

// Image extensions to replace
const imageExtensions = ['\\.jpg', '\\.jpeg', '\\.png'];

// Function to replace image references
function updateImageReferences(content, filePath) {
  let updated = content;
  let changes = 0;

  // Replace image src attributes
  imageExtensions.forEach(ext => {
    const regex = new RegExp(`(src=["'])([^"']+\\${ext})(["'])`, 'gi');
    updated = updated.replace(regex, (match, prefix, imgPath, suffix) => {
      // Skip if already WebP or SVG
      if (imgPath.includes('.webp') || imgPath.includes('.svg')) {
        return match;
      }
      
      // Convert to WebP
      const webpPath = imgPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      changes++;
      return `${prefix}${webpPath}${suffix}`;
    });

    // Replace in poster attributes
    const posterRegex = new RegExp(`(poster=["'])([^"']+\\${ext})(["'])`, 'gi');
    updated = updated.replace(posterRegex, (match, prefix, imgPath, suffix) => {
      if (imgPath.includes('.webp')) {
        return match;
      }
      const webpPath = imgPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      changes++;
      return `${prefix}${webpPath}${suffix}`;
    });
  });

  return { content: updated, changes };
}

// Update all files
async function updateAllFiles() {
  console.log('Updating image references to WebP...\n');

  for (const pattern of filesToUpdate) {
    const files = await glob(pattern);
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const { content: updated, changes } = updateImageReferences(content, file);
        
        if (changes > 0) {
          fs.writeFileSync(file, updated, 'utf8');
          console.log(`✓ Updated ${file}: ${changes} image reference(s) changed to WebP`);
        }
      } catch (error) {
        console.error(`✗ Error updating ${file}:`, error.message);
      }
    }
  }

  console.log('\nDone!');
}

updateAllFiles().catch(console.error);


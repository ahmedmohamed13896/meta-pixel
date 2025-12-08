const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Image extensions to check
const imageExtensions = ['jpg', 'jpeg', 'png'];

async function findOriginalImages() {
  const originals = [];
  const webpFiles = new Set();
  
  // Find all WebP files
  const webpPatterns = [
    'assets/images/**/*.webp'
  ];
  
  for (const pattern of webpPatterns) {
    const files = await glob(pattern);
    files.forEach(file => {
      // Get base name without extension
      const baseName = file.replace(/\.webp$/i, '');
      webpFiles.add(baseName.toLowerCase());
    });
  }
  
  // Find all original images
  const originalPatterns = [
    'assets/images/**/*.jpg',
    'assets/images/**/*.jpeg',
    'assets/images/**/*.png'
  ];
  
  for (const pattern of originalPatterns) {
    const files = await glob(pattern);
    files.forEach(file => {
      // Skip if it's already a WebP
      if (file.toLowerCase().endsWith('.webp')) {
        return;
      }
      
      // Get base name without extension
      const ext = path.extname(file).toLowerCase();
      const baseName = file.replace(new RegExp(`\\${ext}$`, 'i'), '');
      
      // Check if WebP version exists
      if (webpFiles.has(baseName.toLowerCase())) {
        originals.push({
          original: file,
          webp: baseName + '.webp',
          size: fs.statSync(file).size
        });
      }
    });
  }
  
  return originals;
}

async function removeOriginalImages() {
  console.log('Finding original images with WebP versions...\n');
  
  const originals = await findOriginalImages();
  
  if (originals.length === 0) {
    console.log('No original images found that have WebP versions.');
    return;
  }
  
  console.log(`Found ${originals.length} original images with WebP versions:\n`);
  
  let totalSize = 0;
  originals.forEach((img, index) => {
    const sizeMB = (img.size / (1024 * 1024)).toFixed(2);
    totalSize += img.size;
    console.log(`${index + 1}. ${img.original} (${sizeMB} MB)`);
    console.log(`   → Has WebP: ${img.webp}\n`);
  });
  
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`Total size to free: ${totalSizeMB} MB\n`);
  console.log('='.repeat(60));
  console.log('⚠️  WARNING: This will DELETE the original image files!');
  console.log('='.repeat(60));
  console.log('\nThese files will be deleted:');
  originals.forEach(img => {
    console.log(`  - ${img.original}`);
  });
  console.log('\nMake sure you have backups if needed!');
  console.log('\nTo proceed, the script will delete these files.');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds...\n');
  
  // Wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('Deleting original images...\n');
  
  let deleted = 0;
  let errors = 0;
  
  for (const img of originals) {
    try {
      // Verify WebP exists before deleting
      if (fs.existsSync(img.webp)) {
        fs.unlinkSync(img.original);
        const sizeMB = (img.size / (1024 * 1024)).toFixed(2);
        console.log(`✓ Deleted: ${img.original} (freed ${sizeMB} MB)`);
        deleted++;
      } else {
        console.log(`⚠ Skipped: ${img.original} (WebP not found: ${img.webp})`);
      }
    } catch (error) {
      console.error(`✗ Error deleting ${img.original}:`, error.message);
      errors++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Deletion Summary:');
  console.log('='.repeat(60));
  console.log(`Total files found: ${originals.length}`);
  console.log(`Successfully deleted: ${deleted}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total space freed: ${totalSizeMB} MB`);
  console.log('='.repeat(60));
  
  if (deleted > 0) {
    console.log('\n✅ Original images removed successfully!');
    console.log('WebP versions are still available.');
  }
}

// Run the script
removeOriginalImages().catch(console.error);




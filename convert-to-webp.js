const sharp = require('sharp');
const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

// Image extensions to convert
const imageExtensions = ['jpg', 'jpeg', 'png'];

// Directories to process
const imageDirs = [
  'assets/images/**/*.jpg',
  'assets/images/**/*.jpeg',
  'assets/images/**/*.png'
];

async function convertToWebP(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    
    // Skip if already WebP
    if (ext === '.webp') {
      console.log(`Skipping ${inputPath} (already WebP)`);
      return;
    }

    // Create output path with .webp extension
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Check if WebP already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${inputPath} (WebP already exists)`);
      return;
    }

    // Get file stats to show progress
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);

    // Convert to WebP with quality 85 (good balance between quality and size)
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    // Get converted file size
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ Converted: ${inputPath}`);
    console.log(`  Original: ${originalSize}KB → WebP: ${newSize}KB (${savings}% smaller)`);
    console.log(`  Saved to: ${outputPath}\n`);

    return { inputPath, outputPath, originalSize, newSize, savings };
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function convertAllImages() {
  console.log('Starting WebP conversion...\n');
  
  const allImages = [];
  
  // Find all images
  for (const pattern of imageDirs) {
    const files = await glob(pattern, { ignore: ['**/*.webp'] });
    allImages.push(...files);
  }

  // Remove duplicates
  const uniqueImages = [...new Set(allImages)];

  console.log(`Found ${uniqueImages.length} images to convert\n`);

  if (uniqueImages.length === 0) {
    console.log('No images found to convert.');
    return;
  }

  const results = [];
  
  // Convert each image
  for (const imagePath of uniqueImages) {
    const result = await convertToWebP(imagePath);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Conversion Summary:');
  console.log('='.repeat(60));
  console.log(`Total images converted: ${results.length}`);
  
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + parseFloat(r.originalSize), 0);
    const totalNew = results.reduce((sum, r) => sum + parseFloat(r.newSize), 0);
    const avgSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    
    console.log(`Total original size: ${totalOriginal.toFixed(2)}KB`);
    console.log(`Total WebP size: ${totalNew.toFixed(2)}KB`);
    console.log(`Average size reduction: ${avgSavings}%`);
    console.log(`Space saved: ${(totalOriginal - totalNew).toFixed(2)}KB`);
  }
  console.log('='.repeat(60));
}

// Run the conversion
convertAllImages().catch(console.error);


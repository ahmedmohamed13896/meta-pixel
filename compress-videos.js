const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Video files to compress
const videos = [
  { input: 'assets/videos/home.mp4', output: 'assets/videos/home-compressed.mp4', maxSize: '5M' },
  { input: 'assets/videos/Aqwan.mp4', output: 'assets/videos/Aqwan-compressed.mp4', maxSize: '8M' },
  { input: 'assets/videos/Asr-herfa.mp4', output: 'assets/videos/Asr-herfa-compressed.mp4', maxSize: '10M' },
  { input: 'assets/videos/Camel.mp4', output: 'assets/videos/Camel-compressed.mp4', maxSize: '10M' },
  { input: 'assets/videos/Emara.mp4', output: 'assets/videos/Emara-compressed.mp4', maxSize: '15M' },
  { input: 'assets/videos/Kendy.mp4', output: 'assets/videos/Kendy-compressed.mp4', maxSize: '8M' },
  { input: 'assets/videos/Qshla.mp4', output: 'assets/videos/Qshla-compressed.mp4', maxSize: '10M' },
  { input: 'assets/videos/Rally.mp4', output: 'assets/videos/Rally-compressed.mp4', maxSize: '8M' },
  { input: 'assets/videos/Sor.mp4', output: 'assets/videos/Sor-compressed.mp4', maxSize: '12M' },
  { input: 'assets/videos/Tadawl.mp4', output: 'assets/videos/Tadawl-compressed.mp4', maxSize: '12M' },
  { input: 'assets/videos/Zaabal.mp4', output: 'assets/videos/Zaabal-compressed.mp4', maxSize: '20M' },
  { input: 'assets/videos/Zeein.mp4', output: 'assets/videos/Zeein-compressed.mp4', maxSize: '12M' },
];

// Check if ffmpeg is available
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Get file size in MB
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
  } catch (error) {
    return 0;
  }
}

// Compress video using ffmpeg
function compressVideo(input, output, maxSize) {
  try {
    const originalSize = getFileSize(input);
    
    console.log(`\nCompressing: ${input}`);
    console.log(`Original size: ${originalSize} MB`);
    console.log(`Target max size: ${maxSize}`);
    
    // FFmpeg command for compression
    // -crf 28: Quality (lower = better quality, higher = smaller file, 28 is good balance)
    // -preset slow: Better compression, slower encoding
    // -movflags +faststart: Enables streaming
    // -vf scale: Scale if needed (optional)
    const command = `ffmpeg -i "${input}" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart -y "${output}"`;
    
    execSync(command, { stdio: 'inherit' });
    
    const newSize = getFileSize(output);
    const savings = ((1 - parseFloat(newSize) / parseFloat(originalSize)) * 100).toFixed(1);
    
    console.log(`✓ Compressed: ${output}`);
    console.log(`  New size: ${newSize} MB`);
    console.log(`  Savings: ${savings}%`);
    
    return { success: true, originalSize, newSize, savings };
  } catch (error) {
    console.error(`✗ Error compressing ${input}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main function
function compressAllVideos() {
  console.log('Video Compression Tool');
  console.log('='.repeat(60));
  
  if (!checkFFmpeg()) {
    console.error('\n✗ FFmpeg is not installed or not in PATH');
    console.error('\nPlease install FFmpeg:');
    console.error('  Windows: Download from https://ffmpeg.org/download.html');
    console.error('  Or use: choco install ffmpeg (if you have Chocolatey)');
    console.error('  Mac: brew install ffmpeg');
    console.error('  Linux: sudo apt-get install ffmpeg');
    process.exit(1);
  }
  
  console.log('✓ FFmpeg found\n');
  
  const results = [];
  let totalOriginal = 0;
  let totalNew = 0;
  
  for (const video of videos) {
    if (!fs.existsSync(video.input)) {
      console.log(`⚠ Skipping ${video.input} (file not found)`);
      continue;
    }
    
    const result = compressVideo(video.input, video.output, video.maxSize);
    if (result.success) {
      results.push(result);
      totalOriginal += parseFloat(result.originalSize);
      totalNew += parseFloat(result.newSize);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Compression Summary:');
  console.log('='.repeat(60));
  console.log(`Total videos compressed: ${results.length}`);
  console.log(`Total original size: ${totalOriginal.toFixed(2)} MB`);
  console.log(`Total compressed size: ${totalNew.toFixed(2)} MB`);
  console.log(`Total savings: ${(totalOriginal - totalNew).toFixed(2)} MB`);
  console.log(`Average reduction: ${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
  
  console.log('\n✅ Compression complete!');
  console.log('\nNext steps:');
  console.log('1. Test the compressed videos');
  console.log('2. Update HTML/JS files to use compressed versions');
  console.log('3. Upload compressed videos to server');
}

compressAllVideos();


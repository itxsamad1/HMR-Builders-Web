const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image optimization script
async function optimizeImages() {
  const inputDir = './public/projects';
  const outputDir = './public/images/optimized';
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all image files
  const files = fs.readdirSync(inputDir, { recursive: true })
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  console.log(`Found ${files.length} images to optimize...`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .resize(800, 600, { fit: 'cover' })
        .toFile(outputPath);
      
      console.log(`✓ Optimized: ${file} -> ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error.message);
    }
  }
  
  console.log('Image optimization complete!');
}

// Run optimization
optimizeImages().catch(console.error);

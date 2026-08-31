const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Perfume images configuration with colors and details
const perfumes = [
  { id: 'midnight-rose', name: 'Midnight Rose', gradients: ['#8B1538', '#4A0A24'] },
  { id: 'golden-amber', name: 'Golden Amber', gradients: ['#FFB740', '#D4A520'] },
  { id: 'crystal-water', name: 'Crystal Water', gradients: ['#87CEEB', '#4DA6FF'] },
  { id: 'velvet-orchid', name: 'Velvet Orchid', gradients: ['#9B59B6', '#5B1F8F'] },
  { id: 'ocean-breeze', name: 'Ocean Breeze', gradients: ['#1E90FF', '#0066CC'] },
  { id: 'honey-spice', name: 'Honey & Spice', gradients: ['#DAA520', '#B8860B'] },
  { id: 'silk-jasmine', name: 'Silk Jasmine', gradients: ['#FFFACD', '#F0E68C'] },
  { id: 'noir-intensity', name: 'Noir Intensity', gradients: ['#1A1A1A', '#0D0D0D'] },
  { id: 'rose-garden', name: 'Rose Garden', gradients: ['#FFB6C1', '#FF69B4'] },
  { id: 'cedar-smoke', name: 'Cedar Smoke', gradients: ['#8B4513', '#654321'] },
  { id: 'peach-blossom', name: 'Peach Blossom', gradients: ['#FFDAB9', '#FFB6C1'] },
  { id: 'vetiver-night', name: 'Vetiver Night', gradients: ['#228B22', '#1B5E1B'] },
  { id: 'vanilla-caramel', name: 'Vanilla Caramel', gradients: ['#D2B48C', '#A0826D'] },
  { id: 'bergamot-lavender', name: 'Bergamot Lavender', gradients: ['#E6E6FA', '#D8BFD8'] },
  { id: 'white-musk', name: 'White Musk', gradients: ['#F5F5F5', '#E8E8E8'] },
  { id: 'spice-route', name: 'Spice Route', gradients: ['#CD853F', '#8B4513'] },
  { id: 'moonlight-gardenia', name: 'Moonlight Gardenia', gradients: ['#FFFDD0', '#F0FFF0'] },
  { id: 'coffee-leather', name: 'Coffee Leather', gradients: ['#3E2723', '#1A0E0A'] },
  { id: 'iris-silk', name: 'Iris Silk', gradients: ['#DDA0DD', '#C8A2D0'] },
  { id: 'sea-salt-driftwood', name: 'Sea Salt & Driftwood', gradients: ['#4A90E2', '#87CEEB'] }
];

function generatePerfumeImage(perfume) {
  const width = 800;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, perfume.gradients[0]);
  gradient.addColorStop(1, perfume.gradients[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw bottle shape
  const bottleX = width / 2;
  const bottleY = height / 2 - 100;
  const bottleWidth = 150;
  const bottleHeight = 300;

  // Bottle body (rectangle with rounded corners)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.moveTo(bottleX - bottleWidth / 2, bottleY + 50);
  ctx.lineTo(bottleX - bottleWidth / 2, bottleY + bottleHeight - 50);
  ctx.arcTo(bottleX - bottleWidth / 2, bottleY + bottleHeight, bottleX, bottleY + bottleHeight, 20);
  ctx.lineTo(bottleX + bottleWidth / 2, bottleY + bottleHeight);
  ctx.arcTo(bottleX + bottleWidth / 2, bottleY + bottleHeight, bottleX + bottleWidth / 2, bottleY + bottleHeight - 50, 20);
  ctx.lineTo(bottleX + bottleWidth / 2, bottleY + 50);
  ctx.arcTo(bottleX + bottleWidth / 2, bottleY, bottleX, bottleY, 20);
  ctx.lineTo(bottleX - bottleWidth / 2, bottleY);
  ctx.arcTo(bottleX - bottleWidth / 2, bottleY, bottleX - bottleWidth / 2, bottleY + 50, 20);
  ctx.fill();

  // Bottle cap
  ctx.fillStyle = 'rgba(200, 180, 120, 0.9)';
  ctx.fillRect(bottleX - 30, bottleY - 30, 60, 30);

  // Liquid inside bottle
  const liquidGradient = ctx.createLinearGradient(0, bottleY + 100, 0, bottleY + bottleHeight - 50);
  liquidGradient.addColorStop(0, perfume.gradients[0]);
  liquidGradient.addColorStop(1, perfume.gradients[1]);
  ctx.fillStyle = liquidGradient;
  ctx.fillRect(bottleX - bottleWidth / 2 + 10, bottleY + 100, bottleWidth - 20, bottleHeight - 150);

  // Highlight on bottle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.ellipse(bottleX - bottleWidth / 3, bottleY + 80, 20, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  // Product name
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'bold 48px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillText(perfume.name, width / 2 + 2, height - 100 + 2);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillText(perfume.name, width / 2, height - 100);

  // Luxury badge at bottom
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(width / 2 - 120, height - 40, 240, 30);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '14px Georgia, serif';
  ctx.fillText('Maison Maeta', width / 2, height - 25);

  return canvas.toBuffer('image/jpeg', { quality: 0.95 });
}

function generateAllImages() {
  const imagesDir = path.join(__dirname, '../public/images/perfumes');

  // Create directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log('Generating perfume images...\n');

  let successCount = 0;
  let errorCount = 0;

  perfumes.forEach((perfume) => {
    try {
      const imageBuffer = generatePerfumeImage(perfume);
      const filePath = path.join(imagesDir, `${perfume.id}.jpg`);
      fs.writeFileSync(filePath, imageBuffer);
      console.log(`✅ Generated: ${perfume.name} (${perfume.id}.jpg)`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${perfume.name}: ${error.message}`);
      errorCount++;
    }
  });

  console.log(`\n✨ Generation complete!`);
  console.log(`✅ Success: ${successCount}/${perfumes.length}`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}/${perfumes.length}`);
  }
  console.log(`📁 Images saved to: ${imagesDir}`);
}

// Run the generator
generateAllImages();

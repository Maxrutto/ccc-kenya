const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const JPG_QUALITY = 100;
const WEBP_QUALITY = 100;

async function convertAll() {
  const dir = __dirname;
  const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.heic'));

  for (const file of files) {
    const { name } = path.parse(file);

    // JPEG
    await sharp(path.join(dir, file))
      .jpeg({ quality: JPG_QUALITY })
      .toFile(path.join(dir, `${name}.jpg`));

    // WebP
    await sharp(path.join(dir, file))
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(dir, `${name}.webp`));

    console.log(`Converted: ${file} → ${name}.jpg, ${name}.webp`);
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});

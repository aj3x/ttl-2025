const sharp = require("sharp");
const fs = require("fs");

const input = [
  "assets/img/crp-image/desktop.png",
  "assets/img/crp-image/mobile.png"
]; // your source image
const sizes = [320, 640, 960, 1280];

async function generate(imagePath, sizes, formats = ["png", "webp"]) {
  try {
    const outputPath = imagePath.replace(/(\.[\w\d_-]+)$/i, "");
    for (const width of sizes) {
      for (const format of formats) {
        await sharp(imagePath, {
          "density": 10000
        })
          .resize(width)
          .toFile(`${outputPath}-${width}.${format}`);
      }
    }

    // add green checkmark icon to indicate completion
    console.log(`✅ ${imagePath}`);
  } catch (error) {
    console.error(`❌ ${imagePath}:`, error);
  }
}

for (const inputImage of input)
  generate(inputImage, sizes);
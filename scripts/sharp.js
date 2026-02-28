const sharp = require("sharp");
const fs = require("fs");

const input = [
  ["assets/img/crp-image/desktop.png", "sm"],
  ["assets/img/crp-image/mobile.png", "sm"],
  ["assets/img/heroes/about/about-hero-desktop.png", "xxl"],
  ["assets/img/heroes/about/about-hero-mobile.png", "sm"],
  ["assets/img/heroes/main/hero-bg-desktop.png", "xxl"],
  ["assets/img/heroes/main/hero-bg-mobile.png", "sm"],
  ["assets/img/heroes/footer/footer-bg-img.png", "xxl"],
]; // your source image
const sizes = {
  xxs: [320, 640],
  xs: [320, 640, 960],
  sm: [320, 640, 960, 1280],
  md: [320, 640, 960, 1280, 1600],
  lg: [320, 640, 960, 1280, 1600, 1920],
  xl: [320, 640, 960, 1280, 1600, 1920, 2560],
  xxl: [320, 640, 960, 1280, 1600, 1920, 2560, 3840],
};

async function generate(imagePath, sizes, formats = ["webp"]) {
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
  generate(inputImage[0], sizes[inputImage[1]]);
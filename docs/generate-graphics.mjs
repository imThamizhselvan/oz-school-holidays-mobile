import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFile = 'file://' + path.join(__dirname, 'play-store-graphics.html');
const outDir = path.join(__dirname, 'play-store-assets');
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();

await page.setViewport({ width: 1400, height: 4000, deviceScaleFactor: 2 });
await page.goto(htmlFile, { waitUntil: 'networkidle0' });

const shots = [
  {
    selector: '.feature-graphic',
    file: '1_feature-graphic-1024x500.png',
    label: 'Feature Graphic (1024×500)',
  },
  {
    selector: '.app-icon',
    file: '2_app-icon-512x512.png',
    label: 'App Icon (512×512)',
  },
  {
    selector: '.phone-frame:nth-of-type(1)',
    file: '3_screenshot-home.png',
    label: 'Screenshot 1 – Home',
    scale: 4,
  },
  {
    selector: '.phone-frame:nth-of-type(2)',
    file: '4_screenshot-calendar.png',
    label: 'Screenshot 2 – Calendar',
    scale: 4,
  },
  {
    selector: '.phone-frame:nth-of-type(3)',
    file: '5_screenshot-holidays.png',
    label: 'Screenshot 3 – Holidays',
    scale: 4,
  },
  {
    selector: '.phone-frame:nth-of-type(4)',
    file: '6_screenshot-public-holidays.png',
    label: 'Screenshot 4 – Public Holidays',
    scale: 4,
  },
  {
    selector: '.phone-frame:nth-of-type(5)',
    file: '7_screenshot-settings.png',
    label: 'Screenshot 5 – Settings',
    scale: 4,
  },
];

// phone-frame selectors need to be done per-parent div
const phoneFrames = await page.$$('.phone-frame');

for (const shot of shots) {
  let el;
  if (shot.selector.startsWith('.phone-frame:nth-of-type')) {
    const idx = parseInt(shot.selector.match(/\d+/)[0]) - 1;
    el = phoneFrames[idx];
  } else {
    el = await page.$(shot.selector);
  }

  if (!el) {
    console.warn(`  ⚠  Could not find: ${shot.selector}`);
    continue;
  }

  const outPath = path.join(outDir, shot.file);
  await el.screenshot({ path: outPath, type: 'png' });
  console.log(`  ✅  ${shot.label}  →  ${outPath}`);
}

await browser.close();
console.log('\n🎉  All assets saved to:  ' + outDir);

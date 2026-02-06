import fs from 'fs';
import path from 'path';
import playwright from 'playwright';

const OUT_DIR = path.join(process.cwd(), 'assets', 'pr-screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const pages = ['index.html', 'mortgage_calculator.html'];
const viewport = { width: 1200, height: 800 };

(async () => {
  const browser = await playwright.chromium.launch();
  for (const pageFile of pages) {
    const url = `http://localhost:8000/${pageFile}`;
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport, colorScheme: theme === 'dark' ? 'dark' : 'light' });
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: 'networkidle' });
        if (theme === 'dark') {
          // Some pages use data-theme on body; force it for accurate rendering
          await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
        }
        const fileName = `${path.basename(pageFile, '.html')}-${theme}.png`;
        const outPath = path.join(OUT_DIR, fileName);
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`Saved screenshot: ${outPath}`);
      } catch (err) {
        console.error(`Failed to capture ${url} (${theme}):`, err);
      } finally {
        await context.close();
      }
    }
  }
  await browser.close();
})();

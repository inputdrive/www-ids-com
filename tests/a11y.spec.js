const { test } = require('@playwright/test');
const { injectAxe, checkA11y } = require('@axe-core/playwright');

const pages = [
  '/index.html',
  '/security_tools.html',
  '/mortgage_calculator.html',
  '/mortgage_calculator_advanced.html',
  '/basic.html',
  '/random.html',
  '/gpt5_basic_page.html',
  '/gpt5_basic_page_v2.html'
];

for (const path of pages) {
  test(`a11y: ${path}`, async ({ page }) => {
    await page.goto(`http://localhost:8000${path}`, { waitUntil: 'networkidle' });
    // Ensure dark-theme toggle doesn't hide content in tests; default is fine
    await injectAxe(page);
    // This will throw if violations are found
    await checkA11y(page, null, { detailedReport: true, detailedReportOptions: { html: true } });
  });
}

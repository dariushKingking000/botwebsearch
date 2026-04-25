const { test, expect } = require('@playwright/test');

test('Browser Action', async ({ page, context }) => {
  const event = process.env.GITHUB_EVENT_PAYLOAD;
  const action = JSON.parse(event).action;
  
  if(action.type === 'click') {
    await page.goto('https://google.com');
    await page.click(`[${action.client_payload.x}, ${action.client_payload.y}]`);
    await page.screenshot({ path: 'screenshot.png' });
  }
  
  if(action.type === 'type') {
    await page.goto('https://google.com');
    await page.click('textarea[name="q"]');
    await page.type('textarea[name="q"]', action.client_payload.text);
    await page.screenshot({ path: 'screenshot.png' });
  }
});

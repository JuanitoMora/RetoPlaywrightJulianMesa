import { test as base } from '@playwright/test';

export const test = base.extend({});

test.afterEach(async ({ page }, testInfo) => {
  if (page && typeof page.close === 'function' && !page.isClosed()) {
    await page.close();
  }
});

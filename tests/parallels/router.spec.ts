import { test } from '@affine-test/kit/web';
import { expect } from '@playwright/test';

import { openHomePage, webUrl } from './libs/load-page';
import { waitEditorLoad } from './libs/page-logic';

test('goto not found page', async ({ page }) => {
  await openHomePage(page);
  await waitEditorLoad(page);
  const currentUrl = page.url();
  const invalidUrl = currentUrl.replace(/\/$/, '') + '/invalid';
  await page.goto(invalidUrl);
  expect(await page.getByTestId('notFound').isVisible()).toBeTruthy();
});

test('goto not found workspace', async ({ page }) => {
  await openHomePage(page);
  await waitEditorLoad(page);
  const currentUrl = page.url();
  await page.goto(new URL('/workspace/invalid/all', webUrl).toString());
  await waitEditorLoad(page);
  expect(page.url()).toEqual(currentUrl);
});

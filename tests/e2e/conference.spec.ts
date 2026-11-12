import { test, expect } from '@playwright/test';
import { allPages } from '../../apps/web/src/lib/site-content';

test('homepage, CFP preview and original poster are readable by Nginx', async ({ page, request }) => {
  for (const route of ['/', '/dsai2027/call-for-papers/']) {
    await page.goto(route);
    await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
    await expect.poll(() => page.locator('img').evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0)), { message: `Images must load on ${route}` }).toBe(true);
  }
  const poster = await request.get('/images/dsai2027-preliminary-cfp.jpg');
  expect(poster.status()).toBe(200);
  expect(poster.headers()['content-type']).toMatch(/^image\/jpeg/);
});

test('every published conference route loads directly', async ({ request }) => {
  for (const route of allPages) {
    const response = await request.get(`${route.href.replace(/\/$/, '')}/`);
    expect(response.status(), route.href).toBe(200);
    expect(await response.text(), route.href).toContain('DSAI');
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
  }
  expect((await request.get('/missing-conference-page/')).status()).toBe(404);
  expect((await request.get('/.env')).status()).toBe(403);
});

test('visitors can navigate and refresh conference topics', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Data Science');
  await page.getByRole('link', { name: 'Conference Topics', exact: true }).last().click();
  await expect(page).toHaveURL(/\/dsai2027\/conference-topics\/?$/);
  await expect(page.getByRole('heading', { name: 'Conference Topics', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Trustworthy, Responsible and Human-Centered AI', { exact: true })).toBeVisible();
  if (testInfo.project.name === 'mobile') {
    await page.getByLabel('Open navigation').click();
    const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
    await nav.locator('summary').filter({ hasText: 'Submissions' }).click();
    await nav.getByRole('link', { name: 'Registration', exact: true }).click();
    await expect(page).toHaveURL(/\/submissions\/registration\/?$/);
    await expect(page.getByText('Registration categories, fees, inclusions, and payment details will be announced.')).toBeVisible();
  }
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

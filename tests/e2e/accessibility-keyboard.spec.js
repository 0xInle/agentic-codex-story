import { test, expect } from '@playwright/test';
import { failOnConsoleError } from './helpers.js';

test('Keyboard-only flow reaches the landing CTA and local Presentation controls', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.goto('/');
  const start = page.getByRole('link', { name: 'Начать презентацию' });
  await start.focus();
  await expect(start).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: 'Эта презентация — тоже фича' })).toBeVisible();

  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { level: 1, name: 'Агентная разработка — это навык построения процесса' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Карта сцен' })).toHaveCount(0);
  await page.keyboard.press('f');
  await expect(page.getByRole('button', { name: 'Выйти из презентации' })).toBeVisible();
  await assertConsole();
});

test('Reduced-motion preference disables scroll animation policy', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/present/production-line');
  await expect(page.getByRole('heading', { level: 1, name: 'От идеи к готовой фиче' })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await assertConsole();
});

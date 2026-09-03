import { test, expect } from '@playwright/test';
import { failOnConsoleError } from './helpers.js';

test('Landing opens the thirteen-scene delivery-path presentation', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Логотип Вебзайм' })).toBeVisible();
  await page.getByRole('link', { name: 'Начать презентацию' }).click();
  await expect(page).toHaveURL(/\/present\/presentation-feature$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Эта презентация — тоже фича' })).toBeVisible();
  await expect(page.getByText('1 / 13')).toBeVisible();
  await assertConsole();
});

test('Presentation shows a local illustration, supports keyboard navigation and exit', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.goto('/present/presentation-feature');
  await expect(page.getByRole('img', { name: 'Иллюстрация к слайду 1: Эта презентация — тоже фича' })).toBeVisible();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Управление презентацией' }).getByRole('button')).toHaveCount(4);
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { level: 1, name: 'Зачем разработчику агент' })).toBeVisible();
  await page.getByRole('button', { name: 'Выйти из презентации' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Как внедрить агента в существующий проект' })).toBeVisible();
  await assertConsole();
});

test('Presentation has no desktop-height overflow and keeps local full-screen fallback', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/present/shared-memory');
  const metrics = await page.evaluate(() => ({ scrollHeight: document.documentElement.scrollHeight, viewport: window.innerHeight }));
  expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.viewport + 2);
  await page.getByRole('button', { name: 'Полный экран' }).click();
  await expect(page.getByRole('button', { name: 'Выйти из презентации' })).toBeVisible();
});

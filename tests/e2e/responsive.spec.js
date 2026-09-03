import { test, expect } from '@playwright/test';
import { failOnConsoleError } from './helpers.js';

async function expectNoPageOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test('Laptop routes retain primary surfaces without horizontal page overflow', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Система важнее одиночного prompt.' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeVisible();
  await expectNoPageOverflow(page);
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight)).toBe(true);
  await page.goto('/present/orchestration');
  await expect(page.getByRole('heading', { level: 1, name: 'Orchestration' })).toBeVisible();
  await expectNoPageOverflow(page);
  await assertConsole();
});

test('Wide desktop landing fits without document-level scrolling', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.setViewportSize({ width: 1920, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeVisible();
  await expectNoPageOverflow(page);
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight)).toBe(true);
  await assertConsole();
});

test('Mobile landing and slides remain readable without horizontal page overflow', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Начать презентацию' })).toBeVisible();
  await expectNoPageOverflow(page);
  await page.goto('/present/hero');
  await expect(page.getByRole('button', { name: 'Следующая сцена' })).toBeVisible();
  await expectNoPageOverflow(page);
  await assertConsole();
});

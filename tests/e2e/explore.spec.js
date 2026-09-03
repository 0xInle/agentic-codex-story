import { test, expect } from '@playwright/test';
import { failOnConsoleError } from './helpers.js';

test('Landing contains only the Hero and starts the presentation', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Система важнее одиночного prompt.' })).toBeVisible();
  await expect(page.getByText('Инструмент не заменяет осмысленное решение человека.')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Исследовать историю' })).toHaveCount(0);
  await expect(page.getByTestId('scene-surface')).toHaveCount(0);
  const roadmap = page.getByRole('region', { name: 'Путь от идеи до локального release' });
  await expect(roadmap).toBeVisible();
  await expect(roadmap.getByRole('listitem')).toHaveCount(13);
  await page.getByRole('link', { name: 'Начать презентацию' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Разработка изменилась' })).toBeVisible();
  await assertConsole();
});

test('Roadmap cards reveal a pinned presenter explanation above the active stage', async ({ page }) => {
  const assertConsole = failOnConsoleError(page);
  await page.goto('/');
  const idea = page.getByRole('button', { name: 'Идея' });
  await idea.hover();
  const popover = page.getByRole('tooltip');
  await expect(popover).toContainText('Что это?');
  await expect(popover).toContainText('Как помогает агенту?');
  expect(await page.evaluate(() => {
    const trigger = document.querySelector('[aria-label="Идея"]');
    const tooltip = document.querySelector('[role="tooltip"]');
    return tooltip.getBoundingClientRect().bottom <= trigger.getBoundingClientRect().top;
  })).toBe(true);
  await idea.click();
  await page.mouse.move(0, 0);
  await expect(popover).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(popover).toHaveCount(0);
  await idea.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.keyboard.press('Escape');
  await assertConsole();
});

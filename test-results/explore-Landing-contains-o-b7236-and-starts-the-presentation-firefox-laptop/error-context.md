# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.js >> Landing contains only the Hero and starts the presentation
- Location: tests/e2e/explore.spec.js:4:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Система важнее одиночного prompt.', level: 1 })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Система важнее одиночного prompt.', level: 1 })

```

```yaml
- main "Вебзайм · Агентная разработка":
  - region "Агентная разработка":
    - img "Логотип Вебзайм"
    - paragraph: АГЕНТНАЯ РАЗРАБОТКА
    - heading "Как внедрить агента в существующий проект" [level=1]
    - paragraph: Понятные границы и доказательства результата — вместо магического запроса.
    - link "Начать презентацию":
      - /url: /present/presentation-feature
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { failOnConsoleError } from './helpers.js';
  3  | 
  4  | test('Landing contains only the Hero and starts the presentation', async ({ page }) => {
  5  |   const assertConsole = failOnConsoleError(page);
  6  |   await page.goto('/');
> 7  |   await expect(page.getByRole('heading', { level: 1, name: 'Система важнее одиночного prompt.' })).toBeVisible();
     |                                                                                                    ^ Error: expect(locator).toBeVisible() failed
  8  |   await expect(page.getByText('Инструмент не заменяет осмысленное решение человека.')).toHaveCount(0);
  9  |   await expect(page.getByRole('link', { name: 'Исследовать историю' })).toHaveCount(0);
  10 |   await expect(page.getByTestId('scene-surface')).toHaveCount(0);
  11 |   const roadmap = page.getByRole('region', { name: 'Путь от идеи до локального release' });
  12 |   await expect(roadmap).toBeVisible();
  13 |   await expect(roadmap.getByRole('listitem')).toHaveCount(13);
  14 |   await page.getByRole('link', { name: 'Начать презентацию' }).click();
  15 |   await expect(page.getByRole('heading', { level: 1, name: 'Разработка изменилась' })).toBeVisible();
  16 |   await assertConsole();
  17 | });
  18 | 
  19 | test('Roadmap cards reveal a pinned presenter explanation above the active stage', async ({ page }) => {
  20 |   const assertConsole = failOnConsoleError(page);
  21 |   await page.goto('/');
  22 |   const idea = page.getByRole('button', { name: 'Идея' });
  23 |   await idea.hover();
  24 |   const popover = page.getByRole('tooltip');
  25 |   await expect(popover).toContainText('Что это?');
  26 |   await expect(popover).toContainText('Как помогает агенту?');
  27 |   expect(await page.evaluate(() => {
  28 |     const trigger = document.querySelector('[aria-label="Идея"]');
  29 |     const tooltip = document.querySelector('[role="tooltip"]');
  30 |     return tooltip.getBoundingClientRect().bottom <= trigger.getBoundingClientRect().top;
  31 |   })).toBe(true);
  32 |   await idea.click();
  33 |   await page.mouse.move(0, 0);
  34 |   await expect(popover).toBeVisible();
  35 |   await page.keyboard.press('Escape');
  36 |   await expect(popover).toHaveCount(0);
  37 |   await idea.focus();
  38 |   await expect(page.getByRole('tooltip')).toBeVisible();
  39 |   await page.keyboard.press('Escape');
  40 |   await assertConsole();
  41 | });
  42 | 
```
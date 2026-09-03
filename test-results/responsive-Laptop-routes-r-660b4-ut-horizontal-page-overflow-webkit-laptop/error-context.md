# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Laptop routes retain primary surfaces without horizontal page overflow
- Location: tests/e2e/responsive.spec.js:8:1

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
  4  | async function expectNoPageOverflow(page) {
  5  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  6  | }
  7  | 
  8  | test('Laptop routes retain primary surfaces without horizontal page overflow', async ({ page }) => {
  9  |   const assertConsole = failOnConsoleError(page);
  10 |   await page.setViewportSize({ width: 1280, height: 800 });
  11 |   await page.goto('/');
> 12 |   await expect(page.getByRole('heading', { level: 1, name: 'Система важнее одиночного prompt.' })).toBeVisible();
     |                                                                                                    ^ Error: expect(locator).toBeVisible() failed
  13 |   await expect(page.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeVisible();
  14 |   await expectNoPageOverflow(page);
  15 |   expect(await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight)).toBe(true);
  16 |   await page.goto('/present/orchestration');
  17 |   await expect(page.getByRole('heading', { level: 1, name: 'Orchestration' })).toBeVisible();
  18 |   await expectNoPageOverflow(page);
  19 |   await assertConsole();
  20 | });
  21 | 
  22 | test('Wide desktop landing fits without document-level scrolling', async ({ page }) => {
  23 |   const assertConsole = failOnConsoleError(page);
  24 |   await page.setViewportSize({ width: 1920, height: 800 });
  25 |   await page.goto('/');
  26 |   await expect(page.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeVisible();
  27 |   await expectNoPageOverflow(page);
  28 |   expect(await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight)).toBe(true);
  29 |   await assertConsole();
  30 | });
  31 | 
  32 | test('Mobile landing and slides remain readable without horizontal page overflow', async ({ page }) => {
  33 |   const assertConsole = failOnConsoleError(page);
  34 |   await page.setViewportSize({ width: 390, height: 844 });
  35 |   await page.goto('/');
  36 |   await expect(page.getByRole('link', { name: 'Начать презентацию' })).toBeVisible();
  37 |   await expectNoPageOverflow(page);
  38 |   await page.goto('/present/hero');
  39 |   await expect(page.getByRole('button', { name: 'Следующая сцена' })).toBeVisible();
  40 |   await expectNoPageOverflow(page);
  41 |   await assertConsole();
  42 | });
  43 | 
```
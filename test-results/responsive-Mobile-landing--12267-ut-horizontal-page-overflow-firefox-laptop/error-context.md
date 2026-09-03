# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Mobile landing and slides remain readable without horizontal page overflow
- Location: tests/e2e/responsive.spec.js:32:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main "Презентация" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img "Логотип Вебзайм" [ref=e7]
        - paragraph [ref=e8]: АГЕНТНАЯ РАЗРАБОТКА
      - paragraph [ref=e9]: 1 / 17
    - heading "Эта презентация — тоже фича" [level=1] [ref=e10]
  - region "Эта презентация — тоже фича" [ref=e12]:
    - paragraph [ref=e14]: "Неважно, сайт это или API: фича становится готовой только после проверки."
    - figure "Иллюстрация к сцене «Эта презентация — тоже фича»" [ref=e16]:
      - 'img "Иллюстрация к слайду 1: Эта презентация — тоже фича" [ref=e17]'
  - navigation "Управление презентацией" [ref=e19]:
    - button "Предыдущая сцена" [ref=e20] [cursor=pointer]
    - button "Следующая сцена" [ref=e21] [cursor=pointer]
    - button "Текст доклада" [ref=e22] [cursor=pointer]
    - button "Полный экран" [ref=e23] [cursor=pointer]
    - button "Выйти из презентации" [ref=e24] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { failOnConsoleError } from './helpers.js';
  3  | 
  4  | async function expectNoPageOverflow(page) {
> 5  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
     |                                                                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  6  | }
  7  | 
  8  | test('Laptop routes retain primary surfaces without horizontal page overflow', async ({ page }) => {
  9  |   const assertConsole = failOnConsoleError(page);
  10 |   await page.setViewportSize({ width: 1280, height: 800 });
  11 |   await page.goto('/');
  12 |   await expect(page.getByRole('heading', { level: 1, name: 'Система важнее одиночного prompt.' })).toBeVisible();
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
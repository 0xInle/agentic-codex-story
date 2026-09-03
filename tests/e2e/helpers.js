import { expect } from '@playwright/test';

export function failOnConsoleError(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return async () => expect(errors).toEqual([]);
}

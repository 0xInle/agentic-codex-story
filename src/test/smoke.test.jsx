import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { expect, it } from 'vitest';
import App from '../app/App.jsx';

it('mounts the primary application landmark', () => {
  render(createElement(App));

  expect(screen.getByRole('main', { name: 'Вебзайм · Агентная разработка' })).toBeInTheDocument();
  expect(screen.getByRole('main', { name: 'Вебзайм · Агентная разработка' })).toHaveClass('app-shell');
  expect(document.querySelector('.webzaim-landing')).not.toBeNull();
});

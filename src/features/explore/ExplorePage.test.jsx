import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { ExplorePage } from './ExplorePage.jsx';

it('renders a compact landing with the approved standalone WebZaim sign and no slide-route panel', () => {
  render(createElement(ExplorePage));
  const start = screen.getByRole('link', { name: 'Начать презентацию' });
  expect(screen.getAllByRole('link')).toHaveLength(1);
  expect(start).toHaveAttribute('href', '/present/presentation-feature');
  expect(screen.getByRole('img', { name: 'Логотип Вебзайм' })).toHaveAttribute('src', '/brand/webzaim-symbol.png');
  expect(screen.queryByRole('list', { name: 'Путь фичи' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Исследовать историю' })).not.toBeInTheDocument();
  expect(screen.queryByTestId('scene-surface')).not.toBeInTheDocument();
});

it('keeps the practical thesis as an accessible primary heading and responsive presentation CTA', () => {
  render(createElement(ExplorePage));
  expect(screen.getByRole('heading', { level: 1, name: 'Как внедрить агента в существующий проект' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Начать презентацию' })).toHaveClass('explore-primary-cta');
});

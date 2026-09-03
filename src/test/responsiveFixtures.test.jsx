import React, { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PresentationPage } from '../features/presentation/PresentationPage.jsx';
import { PresentationControls } from '../features/presentation/PresentationControls.jsx';
import { ExplorePage } from '../features/explore/ExplorePage.jsx';

void React;
void PresentationControls; void ExplorePage;

it('gives landing and presentation a responsive shell contract', () => {
  const fixtures = [
    [PresentationPage, 'Презентация', 'presentation-console'],
    [ExplorePage, 'Вебзайм · Агентная разработка', 'landing-shell'],
  ];

  fixtures.forEach(([Component, label, className]) => {
    const view = render(createElement(MemoryRouter, { initialEntries: ['/present/presentation-feature'] }, createElement(Component)));
    expect(screen.getByRole('main', { name: label })).toHaveClass('app-shell', className);
    view.unmount();
  });
});

it('keeps only presentation controls as a reachable wrapping surface', () => {
  render(<PresentationControls onPrevious={() => {}} onNext={() => {}} onFullscreen={() => {}} onExit={() => {}} />);
  expect(screen.getByRole('navigation', { name: 'Управление презентацией' })).toHaveClass('presentation-controls');
  expect(screen.queryByRole('button', { name: 'Карта сцен' })).not.toBeInTheDocument();
});

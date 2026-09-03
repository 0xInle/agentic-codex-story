import React, { createElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PresentationControls } from './PresentationControls.jsx';
import { PresentationPage } from './PresentationPage.jsx';

void React;

function renderPresentation(path = '/present/presentation-feature') {
  return render(createElement(MemoryRouter, { initialEntries: [path] }, createElement(PresentationPage)));
}

it('exposes only local slide, fullscreen, and exit controls', () => {
  render(createElement(PresentationControls, { onNext: () => {}, onPrevious: () => {}, onFullscreen: () => {}, onExit: () => {} }));
  expect(screen.getByRole('button', { name: 'Следующая сцена' })).toBeInTheDocument();
  expect(screen.getAllByRole('button')).toHaveLength(4);
  expect(screen.getByRole('button', { name: 'Полный экран' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Выйти из презентации' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Карта сцен' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Deep dive' })).not.toBeInTheDocument();
});

it('opens the merged AGENTS.md and SPEC.md example from one control', () => {
  renderPresentation('/present/agent-and-spec');
  const trigger = screen.getByRole('button', { name: 'Пример' });

  expect(screen.getByRole('navigation', { name: 'Управление презентацией' })).toHaveClass('presentation-controls--with-example');

  fireEvent.click(trigger);

  expect(screen.getByRole('dialog', { name: 'Пример: две части контракта' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Пример инструкции AGENTS.md для модуля проекта' })).toHaveAttribute('src', '/presentation-slides/agents.png');
  fireEvent.click(screen.getByRole('tab', { name: 'SPEC.md' }));
  expect(screen.getByRole('img', { name: 'Пример спецификации фичи в файле SPEC.md' })).toHaveAttribute('src', '/presentation-slides/spec.png');

  const backdrop = screen.getByTestId('presentation-example-backdrop');
  fireEvent.mouseDown(backdrop);
  fireEvent.animationEnd(backdrop);

  expect(screen.queryByRole('dialog', { name: 'Пример: правило для агента' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it('does not show the example trigger on scenes without an attached example', () => {
  renderPresentation();

  expect(screen.queryByRole('button', { name: 'Пример' })).not.toBeInTheDocument();
});

it('opens the first and final scenes with the 13-scene delivery-path progress contract', () => {
  renderPresentation();
  expect(screen.getByRole('img', { name: 'Логотип Вебзайм' })).toHaveAttribute('src', '/brand/webzaim-symbol.png');
  expect(screen.getByText('1 / 13')).toHaveClass('presentation-progress');
  renderPresentation('/present/tomorrow-start');
  expect(screen.getByRole('heading', { level: 1, name: 'С чего начать завтра' })).toBeInTheDocument();
  expect(screen.getByText('13 / 13')).toHaveClass('presentation-progress');
});

it('moves to the next scene with ArrowRight without exposing removed controls', () => {
  renderPresentation();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByRole('heading', { level: 1, name: 'Зачем разработчику агент' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Карта сцен' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Deep dive' })).not.toBeInTheDocument();
});

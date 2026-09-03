import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PresentationVisuals } from './PresentationVisuals.jsx';
import { scenes } from '../../content/scenes/scenes.js';

void React;
void PresentationVisuals;

it('renders the local slide illustration declared by scene content', () => {
  const scene = scenes.find(({ id }) => id === 'shared-memory');
  render(<PresentationVisuals scene={scene} />);

  const image = screen.getByRole('img', { name: 'Иллюстрация к слайду 10: Документация — общая память агента и команды' });
  expect(image).toHaveAttribute('src', '/presentation-slides/6.png');
  expect(screen.getByRole('figure', { name: 'Иллюстрация к сцене «Документация — общая память агента и команды»' })).toBeVisible();
});

it('keeps the presentation visual non-interactive and free of local popovers', () => {
  render(<PresentationVisuals scene={scenes[0]} />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

it('keeps the illustration in a compact non-stretching card on wide presentation screens', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

  expect(styles).toContain('inline-size: min(100%, 30rem);');
  expect(styles).toContain('align-self: center;');
  expect(styles).toContain('justify-self: center;');
});

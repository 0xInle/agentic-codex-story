import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { scenes } from '../../../content/scenes/scenes.js';
import { StoryScene } from './StoryScene.jsx';
import { EvolutionScene } from './EvolutionScene.jsx';

void React;
void StoryScene; void EvolutionScene;

it('renders the first story scene thesis and its local illustration', () => {
  render(<StoryScene scene={scenes[0]} />);
  expect(screen.getByRole('region', { name: 'Эта презентация — тоже фича' })).toHaveTextContent('Неважно, сайт это или API: агент проходит по правилам для реализации.');
  expect(screen.getByRole('img', { name: 'Иллюстрация к слайду 1: Эта презентация — тоже фича' })).toHaveAttribute('src', '/presentation-slides/1.png');
});

it('keeps the legacy evolution visual independently renderable', () => {
  render(<EvolutionScene scene={{ thesis: 'Эволюция', misconception: 'Проверка' }} mode="presentation" isActive simulationState={null} onSimulationChange={() => {}} />);
  expect(screen.getAllByText('✓')).toHaveLength(7);
});

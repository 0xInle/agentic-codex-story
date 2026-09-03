import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { scenes } from '../../../content/scenes/scenes.js';
import { StoryScene } from './StoryScene.jsx';

void React;
void StoryScene;

it('keeps scenes one through eight in explicit compact story surfaces', () => {
  render(<>{scenes.slice(0, 8).map((scene) => <StoryScene key={scene.id} scene={scene} />)}</>);
  scenes.slice(0, 8).forEach((scene) => expect(screen.getByRole('region', { name: scene.title })).toHaveClass('story-scene'));
});

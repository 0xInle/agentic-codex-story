import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { DeliveryRoadmap } from './DeliveryRoadmap.jsx';

void React;
void DeliveryRoadmap;

it('renders one ordered compact map without visible group headings', () => {
  render(<DeliveryRoadmap />);
  expect(screen.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeInTheDocument();
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  expect(screen.getAllByRole('list')).toHaveLength(1);
  const steps = screen.getAllByRole('listitem');
  expect(steps).toHaveLength(13);
  expect(steps.at(0)).toHaveTextContent('Идея');
  expect(steps.at(-1)).toHaveTextContent('Release');
  expect(screen.getAllByRole('button')).toHaveLength(13);
  expect(document.querySelectorAll('[aria-hidden="true"].delivery-connector')).toHaveLength(12);
});

it('shows, pins and closes the above-card presenter explanation', async () => {
  const user = userEvent.setup();
  render(<DeliveryRoadmap />);
  const idea = screen.getByRole('button', { name: 'Идея' });
  await user.hover(idea);
  expect(screen.getByRole('tooltip')).toHaveTextContent('Что это?');
  await user.click(idea);
  await user.unhover(idea);
  expect(screen.getByRole('tooltip')).toBeInTheDocument();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

it('opens one explanation at a time for keyboard focus', async () => {
  const user = userEvent.setup();
  render(<DeliveryRoadmap />);
  const idea = screen.getByRole('button', { name: 'Идея' });
  const context = screen.getByRole('button', { name: 'Контекст' });
  await user.tab();
  expect(document.activeElement).toBe(idea);
  expect(screen.getByRole('tooltip')).toHaveTextContent('Гипотеза');
  await user.tab();
  expect(document.activeElement).toBe(context);
  expect(screen.getByRole('tooltip')).toHaveTextContent('Факты об аудитории');
  expect(screen.getByRole('tooltip')).not.toHaveTextContent('Гипотеза');
});

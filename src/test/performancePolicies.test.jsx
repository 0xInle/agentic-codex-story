import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference.js';

void React;

function MotionFixture() { return <output>{useReducedMotionPreference() ? 'reduce' : 'full'}</output>; }
void MotionFixture;

it('defaults safely when reduced-motion media queries are unavailable', () => {
  const original = window.matchMedia;
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: undefined });
  render(<MotionFixture />);
  expect(screen.getByText('full')).toBeInTheDocument();
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: original });
});

it('uses the locally hosted Manrope brand font without remote font providers', () => {
  const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
  const globalStyles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');
  expect(tokens).toContain("--font-sans: 'Manrope'");
  expect(globalStyles).toContain("url('/fonts/Manrope-Variable.ttf')");
  expect(globalStyles).not.toContain('https://');
  expect(document.head.querySelectorAll('link[href*="fonts.googleapis"]')).toHaveLength(0);
});

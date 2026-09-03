import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { CodePanel } from './index.js';
it('renders malicious-looking structured text without HTML execution', () => { render(createElement(CodePanel, { title: 'Файл', lines: ['<img src=x>'] })); expect(screen.getByText('<img src=x>')).toBeInTheDocument(); });

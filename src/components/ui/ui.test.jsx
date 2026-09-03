import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Dialog, StatusIndicator, Tabs } from './index.js';

it('gives status a non-color accessible name', () => {
  render(createElement(StatusIndicator, { status: 'success', label: 'Проверка пройдена' }));
  expect(screen.getByRole('status', { name: 'Проверка пройдена' })).toBeInTheDocument();
});

it('closes a controlled dialog on Escape and restores focus', async () => {
  const user = userEvent.setup();
  const close = vi.fn();
  const trigger = document.createElement('button');
  document.body.append(trigger);
  trigger.focus();
  const { rerender } = render(createElement(Dialog, { open: true, onClose: close, title: 'Диалог' }, 'Содержимое'));
  await user.keyboard('{Escape}');
  expect(close).toHaveBeenCalledTimes(1);
  rerender(createElement(Dialog, { open: false, onClose: close, title: 'Диалог' }, 'Содержимое'));
  expect(trigger).toHaveFocus();
  document.body.removeChild(trigger);
});

it('uses tab semantics and keyboard activation', async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(createElement(Tabs, { activeId: 'one', onChange: change, tabs: [{ id: 'one', label: 'Один' }, { id: 'two', label: 'Два' }] }));
  await user.click(screen.getByRole('tab', { name: 'Два' }));
  expect(change).toHaveBeenCalledWith('two');
  await user.click(screen.getByRole('tab', { name: 'Один' }));
  await user.keyboard('{ArrowRight}');
  expect(change).toHaveBeenLastCalledWith('two');
});

it('has no critical axe violations in a dialog fixture', async () => {
  render(createElement(Dialog, { open: true, onClose: () => {}, title: 'Диалог' }, createElement(Tabs, { activeId: 'one', onChange: () => {}, tabs: [{ id: 'one', label: 'Один' }] })));
  const result = await axe.run(document.body);
  expect(result.violations.filter((violation) => violation.impact === 'critical')).toHaveLength(0);
});

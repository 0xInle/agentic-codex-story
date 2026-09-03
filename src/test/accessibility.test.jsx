import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { expect, it, vi } from 'vitest';
import { Dialog, StatusIndicator, Tabs, Tooltip } from '../components/ui/index.js';
import { DiagramFrame, TaskGraph } from '../components/diagrams/index.js';

void React;
void Dialog; void StatusIndicator; void Tabs; void Tooltip;
void DiagramFrame; void TaskGraph;

it('gives shared dialog and drawer semantics a heading and a cyclic keyboard focus trap', async () => {
  const user = userEvent.setup();
  const close = vi.fn();
  render(<Dialog open onClose={close} title="Параметры демонстрации"><button type="button">Отмена</button><button type="button">Сохранить</button></Dialog>);
  const dialog = screen.getByRole('dialog', { name: 'Параметры демонстрации' });
  expect(screen.getByRole('heading', { name: 'Параметры демонстрации' })).toBeInTheDocument();
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  await user.tab();
  expect(screen.getByRole('button', { name: 'Отмена' })).toHaveFocus();
  await user.tab();
  expect(screen.getByRole('button', { name: 'Сохранить' })).toHaveFocus();
  await user.tab();
  expect(screen.getByRole('button', { name: 'Отмена' })).toHaveFocus();
});

it('exposes labels, panels, descriptions and non-color status across shared surfaces', async () => {
  render(<main aria-label="Accessibility fixture"><Tabs tabs={[{ id: 'overview', label: 'Обзор' }, { id: 'evidence', label: 'Evidence' }]} activeId="overview" onChange={() => {}} /><Tooltip label="Почему это важно"><button type="button">Инфо</button></Tooltip><StatusIndicator status="success" label="Проверка пройдена" /><DiagramFrame description="Последовательность задач"><TaskGraph nodes={[{ id: 'one', label: 'Исследование', status: 'done' }]} /></DiagramFrame></main>);
  expect(screen.getByRole('tablist', { name: 'Разделы' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Обзор' })).toHaveAttribute('aria-controls', 'panel-overview');
  expect(screen.getByRole('tooltip', { name: 'Почему это важно' })).toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Проверка пройдена' })).toHaveTextContent('Проверка пройдена');
  expect(screen.getByRole('figure', { name: 'Последовательность задач' })).toBeInTheDocument();
  expect(screen.getByRole('list', { name: 'Граф задач' })).toBeInTheDocument();
  const result = await axe.run(document.body);
  expect(result.violations.filter((violation) => violation.impact === 'critical')).toHaveLength(0);
});

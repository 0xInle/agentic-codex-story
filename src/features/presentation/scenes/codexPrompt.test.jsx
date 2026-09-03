import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CodexWorkflowScene } from './CodexWorkflowScene.jsx';
import { PromptSystemScene } from './PromptSystemScene.jsx';
void React; void CodexWorkflowScene; void PromptSystemScene;
it('makes Codex distinctions and local simulated workflow visible', () => { render(<CodexWorkflowScene scene={{ thesis: 'Workflow' }} />); expect(screen.getByText('Model ≠ Agent')).toBeInTheDocument(); expect(screen.getByText('Симулированный локальный workflow')).toBeInTheDocument(); });
it('renders the eight-step prompt-to-system pipeline', () => { render(<PromptSystemScene scene={{ thesis: 'System' }} />); expect(screen.getAllByRole('listitem')).toHaveLength(8); expect(screen.getByText('Расплывчатый prompt создаёт неоднозначный результат.')).toBeInTheDocument(); });

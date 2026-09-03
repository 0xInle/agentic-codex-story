import { expect, it } from 'vitest';
import { deliveryRoadmapGroups } from './roadmap.js';

it('defines three ordered delivery groups with thirteen unique steps', () => {
  const steps = deliveryRoadmapGroups.flatMap((group) => group.steps);
  expect(deliveryRoadmapGroups.map((group) => group.title)).toEqual(['Проектирование', 'Исполнение', 'Доверие']);
  expect(steps).toHaveLength(13);
  expect(new Set(steps.map((step) => step.id)).size).toBe(13);
  expect(steps.at(-1).label).toBe('Release');
  expect(steps.every(({ explanation }) => explanation && ['what', 'why', 'agentHelp'].every((field) => explanation[field]?.trim().length > 0))).toBe(true);
  expect(steps.find((step) => step.id === 'idea').explanation.what).toMatch(/гипотеза/i);
  expect(steps.find((step) => step.id === 'release').explanation.agentHelp).toContain('результат');
  expect(steps.flatMap((step) => Object.values(step.explanation)).join(' ')).not.toMatch(/\b(scope|handoff|evidence)\b/i);
});

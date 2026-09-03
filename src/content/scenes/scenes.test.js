import { describe, expect, it } from 'vitest';
import { sceneRendererKeys } from '../sceneRendererKeys.js';
import { scenes } from './scenes.js';

const expectedIds = [
  'presentation-feature',
  'why-agent',
  'durable-knowledge',
  'safe-start',
  'narrow-context',
  'agent-and-spec',
  'self-proof',
  'orchestration',
  'process-improvement',
  'shared-memory',
  'architecture-layers',
  'living-documentation',
  'tomorrow-start',
];
const visualTypes = new Set([
  'feature-route',
  'recovery-loop',
  'knowledge-route',
  'boundary-contrast',
  'context-spotlight',
  'feature-contract',
  'evidence-board',
  'feedback-loop',
  'role-handoff',
  'repository-tree',
  'architecture-map',
  'tomorrow-loop',
]);

describe('scenes registry', () => {
  it('contains the exact 13 ordered delivery-path scene IDs without speaker script fields', () => {
    expect(scenes.map((scene) => scene.id)).toEqual(expectedIds);
    expect(scenes.map((scene) => scene.order)).toEqual(
      Array.from({ length: 13 }, (_, index) => index + 1),
    );
    expect(scenes.every((scene) => !('durationSeconds' in scene))).toBe(true);
    expect(scenes.map((scene) => scene.title)).toEqual([
      'Эта презентация — тоже фича',
      'Зачем разработчику агент',
      'Зачем писать документацию',
      'Начинаем с маленькой повторяющейся фичи',
      'Вводим агента в курс дела',
      'AGENTS.md и SPEC.md: две части контракта',
      'Не верим на слово: доказываем готовность',
      'Когда одного агента недостаточно',
      'Каждая фича может улучшить следующую',
      'Документация — общая память агента и команды',
      'Контекст разложен по слоям архитектуры',
      'Документацию нужно поддерживать, а не просто описать',
      'С чего начать завтра',
    ]);
    expect(scenes[2].example.items).toHaveLength(1);
    expect(scenes[5].example.items.map((entry) => entry.label)).toEqual(['AGENTS.md', 'SPEC.md']);
  });

  it('keeps slide-only scene contracts without removed feature references', () => {
    scenes.forEach((scene) => {
      expect(scene.subtitle).toBeTruthy();
      expect(scene.screenThesis).toBeTruthy();
      expect(visualTypes.has(scene.visualType)).toBe(true);
      expect(scene.visual).toBeTruthy();
      expect(scene.presentationImage.src).toMatch(/^\/presentation-slides\/\d+\.png$/);
      expect(scene.hoverItems.length).toBeGreaterThan(0);
      expect(
        scene.hoverItems.every(
          (item) => item.id && item.label && item.description,
        ),
      ).toBe(true);
      expect(
        scene.hoverItems.every((item) => item.description.length > 24),
      ).toBe(true);
      expect(
        scene.hoverItems.some((item) =>
          item.description.includes(
            'важный слой управляемой агентной разработки',
          ),
        ),
      ).toBe(false);
      expect(scene.accessibility.diagramDescription).toBeTruthy();
      expect(sceneRendererKeys).toContain(scene.rendererKey);
      expect(scene).not.toHaveProperty('deepDivePath');
      expect(scene).not.toHaveProperty('faqIds');
      expect(scene).not.toHaveProperty('sourceIds');
      expect(scene).not.toHaveProperty('speakerNotesId');
    });
  });
});

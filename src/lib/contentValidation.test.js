import { describe, expect, it } from 'vitest';
import { validateContent } from './contentValidation.js';

const validRegistries = {
  sceneRendererKeys: ['hero'],
  scenes: [
    {
      id: 'hero',
      order: 1,
      rendererKey: 'hero',
      accessibility: { diagramDescription: 'Описание диаграммы.' },
    },
  ],
};

describe('validateContent', () => {
  it('accepts a complete minimal fixture', () => {
    expect(validateContent(validRegistries)).toEqual({ valid: true, errors: [], warnings: [] });
  });

  it('reports deterministic errors for duplicate IDs and invalid slide contracts', () => {
    const result = validateContent({
      ...validRegistries,
      scenes: [
        ...validRegistries.scenes,
        { ...validRegistries.scenes[0], order: 3, rendererKey: 'missing', accessibility: { diagramDescription: '' } },
      ],
    });

    expect(result.errors.map((error) => error.code)).toEqual([
      'scene.duplicate_id',
      'scene.invalid_order',
      'scene.invalid_renderer_key',
      'scene.missing_accessibility_description',
    ]);
  });

  it('rejects placeholder markers in the retained slide content', () => {
    const result = validateContent({
      ...validRegistries,
      scenes: [{ ...validRegistries.scenes[0], thesis: 'TODO' }],
    });

    expect(result.errors.map((error) => error.code)).toEqual(['content.placeholder']);
  });

  it('rejects an incomplete story scene contract', () => {
    const result = validateContent({
      sceneRendererKeys: ['story'],
      scenes: [{ id: 'story', order: 1, rendererKey: 'story', accessibility: { diagramDescription: 'Схема.' } }],
    });

    expect(result.errors.map((error) => error.code)).toEqual([
      'scene.missing_story_fields',
      'scene.invalid_hover_item',
    ]);
  });
});

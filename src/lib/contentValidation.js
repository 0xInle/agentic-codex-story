const PLACEHOLDER_PATTERN = /\b(?:TODO|TBD|FIXME)\b/i;

function makeError(code, path, message) {
  return { code, path, message };
}

function findPlaceholder(value, path = 'registries') {
  if (typeof value === 'string' && PLACEHOLDER_PATTERN.test(value)) return path;
  if (Array.isArray(value)) {
    return value.map((item, index) => findPlaceholder(item, `${path}[${index}]`)).find(Boolean);
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).map(([key, item]) => findPlaceholder(item, `${path}.${key}`)).find(Boolean);
  }
  return null;
}

export function validateContent(registries) {
  const scenes = registries.scenes ?? [];
  const rendererKeys = new Set(registries.sceneRendererKeys ?? []);
  const errors = [];
  const warnings = [];
  const seenSceneIds = new Set();

  scenes.forEach((scene, index) => {
    const path = `scenes[${index}]`;
    if (seenSceneIds.has(scene.id)) errors.push(makeError('scene.duplicate_id', `${path}.id`, 'Scene IDs must be unique.'));
    seenSceneIds.add(scene.id);
    if (scene.order !== index + 1) errors.push(makeError('scene.invalid_order', `${path}.order`, 'Scene order must be sequential.'));
    if (!rendererKeys.has(scene.rendererKey) || !scene.rendererKey?.trim()) errors.push(makeError('scene.invalid_renderer_key', `${path}.rendererKey`, 'Scene renderer key is not registered.'));
    if (!scene.accessibility?.diagramDescription?.trim()) errors.push(makeError('scene.missing_accessibility_description', `${path}.accessibility.diagramDescription`, 'Scene diagram description is required.'));
    if (scene.rendererKey === 'story') {
      if (!scene.title?.trim() || !scene.subtitle?.trim() || !scene.screenThesis?.trim() || !scene.visualType?.trim() || !scene.visual) errors.push(makeError('scene.missing_story_fields', path, 'Story scenes require title, subtitle, thesis, visual type and visual data.'));
      if (!Array.isArray(scene.hoverItems) || scene.hoverItems.length === 0 || !scene.hoverItems.every((item) => item.id?.trim() && item.label?.trim() && item.description?.trim())) errors.push(makeError('scene.invalid_hover_item', `${path}.hoverItems`, 'Story scene hover items require id, label and description.'));
    }
  });
  const placeholderPath = findPlaceholder({ scenes });
  if (placeholderPath) errors.push(makeError('content.placeholder', placeholderPath, 'Placeholder markers are not allowed.'));

  return { valid: errors.length === 0, errors, warnings };
}

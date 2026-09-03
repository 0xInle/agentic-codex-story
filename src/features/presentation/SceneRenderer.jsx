import React from 'react';
import { sceneRenderers } from './sceneRenderers.js';
void React;
export function SceneRenderer({ scene, mode, isActive }) { const Renderer = sceneRenderers[scene.rendererKey]; if (!Renderer) return <p role="alert">Не найден renderer сцены.</p>; return <section className="scene-output" data-testid="scene-surface" data-mode={mode} data-active={isActive}><Renderer scene={scene} /></section>; }

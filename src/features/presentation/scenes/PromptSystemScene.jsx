import React from 'react';
void React;
const pipeline = ['Idea', 'Research', 'SPEC.md', 'Architecture', 'Plan', 'AGENTS.md', 'Implementation', 'Verification'];
export function PromptSystemScene({ scene }) { return <section className="scene-responsive-stack" aria-label="Prompt to system"><p>{scene.thesis}</p><p>Расплывчатый prompt создаёт неоднозначный результат.</p><ol className="scene-step-list">{pipeline.map((step) => <li key={step}>{step}</li>)}</ol></section>; }

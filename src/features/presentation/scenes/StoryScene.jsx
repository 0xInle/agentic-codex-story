import React from 'react';
import { PresentationVisuals } from '../../../components/diagrams/PresentationVisuals.jsx';

void React;
void PresentationVisuals;

export function StoryScene({ scene }) {
  return <section className="story-scene" aria-label={scene.title}>
    <div className="story-scene-copy"><p>{scene.screenThesis}</p></div>
    <div className="story-scene-visual"><PresentationVisuals scene={scene} /></div>
  </section>;
}

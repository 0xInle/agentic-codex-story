import React from 'react';

void React;

export function PresentationVisuals({ scene }) {
  return <figure className="presentation-illustration" aria-label={`Иллюстрация к сцене «${scene.title}»`}>
    <img alt={scene.presentationImage.alt} src={scene.presentationImage.src} />
  </figure>;
}

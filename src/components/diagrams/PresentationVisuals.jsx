import React from 'react';
import { appPath } from '../../app/baseUrl.js';

void React;

export function PresentationVisuals({ scene }) {
  return <figure className="presentation-illustration" aria-label={`Иллюстрация к сцене «${scene.title}»`}>
    <img alt={scene.presentationImage.alt} src={appPath(scene.presentationImage.src)} />
  </figure>;
}

import React from 'react';

void React;

export function PresentationControls({ onNext, onPrevious, onExample, exampleOpen, exampleButtonRef, onFullscreen, onExit }) {
  return <nav className={`presentation-controls${onExample ? ' presentation-controls--with-example' : ''}`} aria-label="Управление презентацией"><button type="button" onClick={onPrevious}>Предыдущая сцена</button><button type="button" onClick={onNext}>Следующая сцена</button>{onExample ? <button ref={exampleButtonRef} type="button" onClick={onExample} aria-controls="presentation-example" aria-expanded={exampleOpen}>Пример</button> : null}{onFullscreen ? <button type="button" onClick={onFullscreen}>Полный экран</button> : null}{onExit ? <button type="button" onClick={onExit}>Выйти из презентации</button> : null}</nav>;
}

import React from 'react';
void React;
const levels = ['Autocomplete', 'Chat', 'Agent', 'Workflow', 'Orchestration'];
const dimensions = ['Контекст', 'Инструменты', 'Память', 'Проверка', 'Границы', 'Evidence', 'Человек'];
export function EvolutionScene({ scene }) {
  return <section className="evolution-timeline" aria-label="Эволюция AI-разработки">
    <div className="evolution-heading">
      <p className="eyebrow">CAPABILITY SHIFT / 02</p>
      <p className="evolution-thesis">{scene.thesis}</p>
    </div>
    <ol className="evolution-stages" aria-label="Уровни развития">
      {levels.map((level, index) => <li key={level}><span className="evolution-index">0{index + 1}</span><span>{level}</span></li>)}
    </ol>
    <ul className="evolution-comparison" aria-label="Измерения управляемого workflow">
      {dimensions.map((dimension) => <li key={dimension}><span className="evolution-check">✓</span>{dimension}</li>)}
    </ul>
  </section>;
}

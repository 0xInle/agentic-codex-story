import React from 'react';
import { scenes } from '../../content/scenes/scenes.js';

void React;

export function ExplorePage() {
  return (
    <main
      id="main-content"
      className="app-shell landing-shell"
      aria-label="Вебзайм · Агентная разработка"
    >
    <section className="webzaim-landing" aria-label="Агентная разработка">
      <div className="landing-ribbon" aria-hidden="true"><span /><span /><span /></div>
      <div className="brand-lockup">
        <img className="landing-brand-symbol" src="/brand/webzaim-symbol.png" alt="Логотип Вебзайм" />
        <p className="eyebrow">АГЕНТНАЯ РАЗРАБОТКА</p>
        </div>
        <div className="landing-copy">
          <h1>Как внедрить агента в существующий проект</h1>
          <p>
            Понятные границы и доказательства результата — вместо магического
            запроса.
          </p>
          <a className="explore-primary-cta" href={`/present/${scenes[0].id}`}>
            Начать презентацию
          </a>
        </div>
      </section>
    </main>
  );
}

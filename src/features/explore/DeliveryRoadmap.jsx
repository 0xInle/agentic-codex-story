import React, { useState } from 'react';
import { deliveryRoadmapGroups } from '../../content/roadmap/roadmap.js';

void React;

export function DeliveryRoadmap({ groups = deliveryRoadmapGroups }) {
  const [activeId, setActiveId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const steps = groups.flatMap((group) => group.steps);

  function activate(id) {
    setActiveId(id);
    setPinnedId((current) => current === id ? current : null);
  }

  function closeIfUnpinned(id) {
    if (pinnedId !== id) setActiveId(null);
  }

  function togglePin(id) {
    setActiveId(id);
    setPinnedId((current) => current === id ? null : id);
  }

  function closeAll(event) {
    if (event.key === 'Escape') {
      setActiveId(null);
      setPinnedId(null);
      event.currentTarget.blur();
    }
  }

  return <section className="delivery-roadmap" aria-label="Путь от идеи до локального release"><ol className="delivery-roadmap-map">{steps.map((step, index) => {
    const isOpen = activeId === step.id || pinnedId === step.id;
    const popoverId = `roadmap-popover-${step.id}`;

    return <li className={`delivery-map-item${isOpen ? ' delivery-map-item--active' : ''}`} key={step.id}><button aria-controls={popoverId} aria-expanded={isOpen} aria-label={step.label} className="delivery-map-trigger" onBlur={() => closeIfUnpinned(step.id)} onClick={() => togglePin(step.id)} onFocus={() => activate(step.id)} onKeyDown={closeAll} onMouseEnter={() => activate(step.id)} onMouseLeave={() => closeIfUnpinned(step.id)} type="button"><span className="delivery-step-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{step.label}</strong><small>{step.description}</small></span></button>{isOpen ? <aside className="delivery-stage-popover" id={popoverId} role="tooltip"><p><strong>Что это?</strong>{step.explanation.what}</p><p><strong>Зачем?</strong>{step.explanation.why}</p><p><strong>Как помогает агенту?</strong>{step.explanation.agentHelp}</p></aside> : null}{index < steps.length - 1 ? <span className={`delivery-connector${index === 4 || index === 8 ? ' delivery-connector--turn' : ''}`} aria-hidden="true" /> : null}</li>;
  })}</ol></section>;
}

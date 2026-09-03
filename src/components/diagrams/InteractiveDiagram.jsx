import React, { useState } from 'react';

void React;

export function InteractiveDiagram({ label, items }) {
  const [activeId, setActiveId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const activeItem = items.find((item) => item.id === (pinnedId || activeId));
  const close = () => { setActiveId(null); setPinnedId(null); };
  return <section className="interactive-diagram" aria-label={label} onMouseLeave={() => { if (!pinnedId) setActiveId(null); }} onKeyDown={(event) => { if (event.key === 'Escape') close(); }}><div className="interactive-diagram-items" data-item-count={items.length}>{items.map((item) => <div className="diagram-item" key={item.id}><button type="button" className="diagram-node" aria-describedby={activeItem?.id === item.id ? `diagram-tip-${item.id}` : undefined} aria-expanded={pinnedId === item.id} onMouseEnter={() => { if (!pinnedId) setActiveId(item.id); }} onFocus={() => { if (!pinnedId) setActiveId(item.id); }} onClick={() => setPinnedId((current) => current === item.id ? null : item.id)}>{item.label}</button>{activeItem?.id === item.id ? <p className="diagram-popover" data-overlay="true" role="tooltip" id={`diagram-tip-${item.id}`}>{item.description}</p> : null}</div>)}</div></section>;
}

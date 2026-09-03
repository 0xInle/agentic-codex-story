import React, { useEffect, useRef, useState } from 'react';
import { appPath } from '../../app/baseUrl.js';

void React;

export function PresentationExample({ example, isClosing, onClose, onExited }) {
  const dialogRef = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const activeItem = example.items[activeItemIndex];

  useEffect(() => {
    dialogRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return <div className={`presentation-example-backdrop${isClosing ? ' presentation-example-backdrop--closing' : ''}`} data-testid="presentation-example-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onAnimationEnd={(event) => { if (isClosing && event.target === event.currentTarget) onExited(); }}>
    <section className="presentation-example-dialog" role="dialog" aria-modal="true" aria-label={`Пример: ${example.title}`} tabIndex="-1" ref={dialogRef}>
      {example.items.length > 1 ? <div className="presentation-example-tabs" role="tablist" aria-label="Файлы примера">{example.items.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={index === activeItemIndex} onClick={() => setActiveItemIndex(index)}>{item.label}</button>)}</div> : null}
      <img src={appPath(activeItem.src)} alt={activeItem.alt} />
    </section>
  </div>;
}

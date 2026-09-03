import React from 'react'; void React; export function CodePanel({ title, lines = [] }) { return <section aria-label={title}><pre>{lines.join('\n')}</pre></section>; }

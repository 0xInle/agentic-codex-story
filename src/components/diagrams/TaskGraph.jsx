import React from 'react'; void React; export function TaskGraph({ nodes = [] }) { return <ul aria-label="Граф задач">{nodes.map((node) => <li key={node.id}>{node.label}: {node.status}</li>)}</ul>; }

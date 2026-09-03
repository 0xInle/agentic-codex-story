import React from 'react'; void React; export function DiagramFrame({ description, children }) { return <figure aria-label={description}><figcaption>{description}</figcaption>{children}</figure>; }

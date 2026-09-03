import { createElement } from 'react';
export function Button({ children, ...props }) { return createElement('button', { type: 'button', ...props }, children); }

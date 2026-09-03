import React from 'react';
void React;
export function StatusIndicator({ status, label }) { return <span role="status" aria-label={label} data-status={status}>{status === 'success' ? '✓' : '•'} {label}</span>; }

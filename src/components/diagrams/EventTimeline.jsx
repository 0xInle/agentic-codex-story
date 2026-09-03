import React from 'react'; void React; export function EventTimeline({ events = [] }) { return <ol>{events.map((event) => <li key={event.id}>{event.label}</li>)}</ol>; }

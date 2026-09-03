import { useEffect } from 'react';

export function usePresentationKeyboard({ onNext, onPrevious, onFirst, onLast, onFullscreen, onExit }) {
  useEffect(() => {
    const handler = (event) => {
      if (event.target.matches?.('input,textarea,select,[contenteditable="true"]')) return;
      if (event.key === 'Escape') { onExit?.(); return; }
      if (event.key === 'ArrowRight' || event.key === ' ') onNext?.();
      if (event.key === 'ArrowLeft') onPrevious?.();
      if (event.key === 'Home') onFirst?.();
      if (event.key === 'End') onLast?.();
      if (event.key.toLowerCase() === 'f') onFullscreen?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onExit, onFirst, onFullscreen, onLast, onNext, onPrevious]);
}

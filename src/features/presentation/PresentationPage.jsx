import React, { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appPath } from '../../app/baseUrl.js';
import { scenes } from '../../content/scenes/scenes.js';
import { PresentationControls } from './PresentationControls.jsx';
import { PresentationExample } from './PresentationExample.jsx';
import { SceneRenderer } from './SceneRenderer.jsx';
import { requestFullscreen } from './useFullscreenRequest.js';
import { usePresentationKeyboard } from './usePresentationKeyboard.js';

void React;
void PresentationControls;
void PresentationExample;
void SceneRenderer;

function getSceneIndexFromPath(pathname) {
  const sceneId = pathname.split('/').filter(Boolean).at(-1);
  const sceneIndex = scenes.findIndex((item) => item.id === sceneId);
  return sceneIndex >= 0 ? sceneIndex : 0;
}

export function PresentationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const exampleButtonRef = useRef(null);
  const [fullscreenStatus, setFullscreenStatus] = useState('');
  const [exampleState, setExampleState] = useState('closed');
  const index = getSceneIndexFromPath(location.pathname);
  const scene = scenes[index];
  const goToIndex = useCallback((nextIndex) => { setExampleState('closed'); navigate(`/present/${scenes[Math.max(0, Math.min(scenes.length - 1, nextIndex))].id}`); }, [navigate]);
  const openFullscreen = useCallback(async () => {
    const granted = await requestFullscreen(mainRef.current);
    setFullscreenStatus(granted ? 'Полноэкранный режим включён' : 'Полноэкранный режим недоступен в этом браузере');
  }, []);
  const closeExample = useCallback(() => {
    setExampleState((state) => (state === 'open' ? 'closing' : state));
  }, []);
  const finishExampleClose = useCallback(() => {
    exampleButtonRef.current?.focus();
    setExampleState('closed');
  }, []);
  const openExample = useCallback(() => {
    setExampleState('open');
  }, []);

  usePresentationKeyboard({
    onNext: () => goToIndex(index + 1),
    onPrevious: () => goToIndex(index - 1),
    onFirst: () => goToIndex(0),
    onLast: () => goToIndex(scenes.length - 1),
    onFullscreen: openFullscreen,
    onExit: exampleState !== 'closed' ? closeExample : () => navigate('/'),
  });
  return <main ref={mainRef} className="app-shell presentation-console" aria-label="Презентация"><header className="control-surface presentation-header"><div className="presentation-meta"><div className="presentation-brand"><img className="presentation-brand-symbol" src={appPath('/brand/webzaim-symbol.png')} alt="Логотип Вебзайм" /><p className="eyebrow">АГЕНТНАЯ РАЗРАБОТКА</p></div><p className="eyebrow presentation-progress" aria-label={`Сцена ${index + 1} из ${scenes.length}`} aria-live="polite">{index + 1} / {scenes.length}</p></div><h1>{scene.title}</h1>{fullscreenStatus ? <p role="status">{fullscreenStatus}</p> : null}</header><SceneRenderer scene={scene} mode="presentation" isActive />{exampleState !== 'closed' ? <PresentationExample example={scene.example} isClosing={exampleState === 'closing'} onClose={closeExample} onExited={finishExampleClose} /> : null}<div className="presentation-actions"><PresentationControls onPrevious={() => goToIndex(index - 1)} onNext={() => goToIndex(index + 1)} onExample={scene.example ? openExample : undefined} exampleOpen={exampleState === 'open'} exampleButtonRef={exampleButtonRef} onFullscreen={openFullscreen} onExit={() => navigate('/')} /></div></main>;
}

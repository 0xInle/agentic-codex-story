import { appPath } from './baseUrl.js';

const preloadedImages = new Set();

export function preloadImage(path) {
  const src = appPath(path);

  if (preloadedImages.has(src)) return;
  preloadedImages.add(src);

  const image = new Image();
  image.decoding = 'async';
  image.src = src;
}

export function preloadPresentationImages(scenes, startIndex, count = 3) {
  scenes.slice(startIndex, startIndex + count).forEach((scene) => {
    preloadImage(scene.presentationImage.src);
  });
}

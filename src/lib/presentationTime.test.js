import { expect, it } from 'vitest'; import { elapsedSeconds } from './presentationTime.js'; it('derives elapsed seconds', () => expect(elapsedSeconds(1000, 4500)).toBe(3.5));

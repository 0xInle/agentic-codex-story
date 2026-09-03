export async function requestFullscreen(element) { try { await element?.requestFullscreen?.(); return true; } catch { return false; } }

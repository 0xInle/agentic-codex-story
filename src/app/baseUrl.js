export const appBaseName = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function appPath(path) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}

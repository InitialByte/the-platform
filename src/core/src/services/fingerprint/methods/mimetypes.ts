export const mimetypes = (): string[] =>
  Object.values(navigator.mimeTypes || [])
    .map(({type}: MimeType): string => type)
    .sort();

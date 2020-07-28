export const plugins = (): string[] =>
  Object.values(navigator.plugins || [])
    .map(({name, filename}: Plugin): string => `${name}, ${filename}`)
    .sort();

export const plugins = (): string[] =>
  Object.values(navigator.plugins || [])
    .map(({name, filename}) => `${name}, ${filename}`)
    .sort();

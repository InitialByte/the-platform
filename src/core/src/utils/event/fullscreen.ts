export const toggleFullscreen = (): Promise<void> | undefined => {
  if (!document.fullscreenElement) {
    return document.documentElement.requestFullscreen();
  }

  return document.exitFullscreen
    ? document.exitFullscreen()
    : Promise.resolve();
};

export const onFullscreenChange = (callback: (event: Event) => void): void => {
  document.onfullscreenchange = (event: Event) => callback(event);
};

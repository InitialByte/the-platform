export const toggleFullscreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const onFullscreenChange = (callback: (event: Event) => void): void => {
  document.onfullscreenchange = (event: Event) => callback(event);
};

export const initServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', (): void => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('ServiceWorker registration successfully.'))
        .catch(console.error);
    });
  }
};

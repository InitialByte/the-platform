/* eslint @typescript-eslint/no-magic-numbers: 0 */
export const audio = (): null | Promise<string> => {
  const {OfflineAudioContext} = window;

  if (!OfflineAudioContext) {
    return null;
  }

  const numberOfChannels = 1;
  const audioLength = 44100;
  const rate = 44100;
  const someValue = 10000;
  let context = new OfflineAudioContext(numberOfChannels, audioLength, rate);
  const oscillator = context.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(someValue, context.currentTime);
  const compressor = context.createDynamicsCompressor();

  [
    ['threshold', -50],
    ['knee', 40],
    ['ratio', 12],
    ['reduction', -20],
    ['attack', 0],
    ['release', 0.25],
  ].forEach(([type, value]: [string, number]) => {
    if (
      compressor[type] !== undefined &&
      typeof compressor[type].setValueAtTime === 'function'
    ) {
      compressor[type].setValueAtTime(value, context.currentTime);
    }
  });

  oscillator.connect(compressor);
  compressor.connect(context.destination);
  oscillator.start(0);
  context.startRendering();

  return new Promise((resolve, reject) => {
    const audioTimeoutId = setTimeout(() => {
      context.oncomplete = () => {};
      context = null;
      reject();
    }, 1000);

    context.oncomplete = ({renderedBuffer}: OfflineAudioCompletionEvent) => {
      let fingerprint: string;

      try {
        clearTimeout(audioTimeoutId);
        fingerprint = renderedBuffer
          .getChannelData(0)
          .slice(4500, 5000)
          .reduce((acc, val) => acc + Math.abs(val), 0)
          .toString();
        oscillator.disconnect();
        compressor.disconnect();
      } catch {
        reject();
      }

      resolve(fingerprint);
    };
  });
};

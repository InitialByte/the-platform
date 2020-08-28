import * as methods from './methods';
import {murmurhash3} from '../../utils';

let fingerprint: string;

export function getFingerprint(): Promise<string> {
  return new Promise((resolve, reject): void => {
    if (fingerprint) {
      resolve(fingerprint);
    }

    Promise.all([methods.audio(), methods.browser()])
      .then(([audio, browser]) => {
        const result: string = [
          methods.fonts().join(','),
          audio,
          Object.values(browser).join(','),
          methods.canvas().join(','),
          methods.plugins().join(','),
          (methods.webgl() || []).join(','),
          methods.mimetypes().join(','),
        ].join('~~~');

        fingerprint = murmurhash3(result);

        return resolve(fingerprint);
      })
      .catch(reject);
  });
}

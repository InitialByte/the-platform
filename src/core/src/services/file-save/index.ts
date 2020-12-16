// Based on @link https://github.com/eligrey/FileSaver.js/

/*
 * Usage:
 *
 * import {saveAs} from '@the_platform/core';
 *
 * // Blob.
 * const blob = new Blob(['foo'], {
 *   type: 'text/plain;charset=utf-8',
 * });
 * saveAs(blob, 'bar.txt')
 *   .then((...) => {...})
 *   .catch((...) => {...});
 *
 * // File.
 * const file = new File(['foo'], 'bar.txt', {
 *   type: 'text/plain;charset=utf-8',
 * });
 * saveAs(file)
 *   .then((...) => {...})
 *   .catch((...) => {...});
 *
 * // Canvas.
 * const canvas = document.getElementById('canvas');
 * canvas.toBlob((blob) => saveAs(blob, 'image.png'));
 *
 * // External URL, if this URL has another origin,
 * // then download file should be allowed by CORS.
 * saveAs('http://foo.bar', 'bar.txt')
 *   .then((...) => {...})
 *   .catch((...) => {...});
 */

const emitDownload = (node: HTMLAnchorElement, onFinish: () => void): void => {
  node.dispatchEvent(new MouseEvent('click'));
  setTimeout(onFinish, 0);
};

const sendRequest = (
  type: 'GET' | 'HEAD',
  url: string,
  onLoad: (request: XMLHttpRequest) => void,
  reject: (e?: Error) => void,
  options: Record<string, string> = {},
): void => {
  const request = new XMLHttpRequest();

  request.open(type, url, true);
  Object.entries(options).forEach(([key, val]) => {
    /* eslint-disable @typescript-eslint/ban-ts-comment, import/no-mutable-exports */
    // @ts-ignore
    request[key] = val;
  });

  request.onload = () => onLoad(request);
  request.onerror = () => reject();

  try {
    request.send(null);
  } catch (e) {
    reject(e);
  }
};

const CORSEnabled = (url: string): Promise<void> =>
  new Promise((resolve, reject): void => {
    sendRequest(
      'HEAD',
      url,
      ({status}): void => {
        const SUCCESS_STATUS_200 = 200;
        const SUCCESS_STATUS_299 = 299;

        return status >= SUCCESS_STATUS_200 && status <= SUCCESS_STATUS_299
          ? resolve()
          : reject();
      },
      reject,
    );
  });

export const saveAs = (
  data: Blob | File | string,
  fileName: string = 'download',
): Promise<void> =>
  new Promise((resolve, reject) => {
    const link = document.createElement('a');
    const onFinish = (): void => {
      if (data instanceof Blob) {
        URL.revokeObjectURL(link.href);
      }
      resolve();
    };
    const download = (url: string): void =>
      sendRequest(
        'GET',
        url,
        ({response}) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          saveAs(response, fileName);
        },
        reject,
        {
          responseType: 'blob',
        },
      );

    link.download = fileName;
    link.rel = 'noopener';

    if (data instanceof Blob) {
      link.href = URL.createObjectURL(data);

      if (data instanceof File && fileName === 'download') {
        link.download = data.name;
      }
      emitDownload(link, onFinish);
    } else {
      if (
        !/https?:\/\/(www\.)?[\w#%+-.:=@~]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+-./:=?@~]*)/.test(
          data,
        )
      ) {
        reject(new Error('Invalid URL.'));
      }

      link.href = data;
      link.target = '_blank';

      if (link.origin !== window.location.origin) {
        CORSEnabled(data)
          .then(() => download(data))
          .catch(() => reject(new Error('CORS error.')));
      } else {
        emitDownload(link, onFinish);
      }
    }
  });

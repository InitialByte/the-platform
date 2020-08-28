// import {browserName} from '../../../utils/browser-name';

interface IBrowser {
  flashEnabled: boolean;
  cookieEnabled: boolean;
  javaEnabled: boolean;
  displaySize: string;
  hasLocalStorage: boolean;
  hasIndexedDB: boolean;
  hasWebcam: boolean;
  hasWebRTC: boolean;
  hasServiceWorker: boolean;
  doNotTrack: boolean;
  languages: string | readonly string[];
  language: string;
  timezone: number;
  // browserName: string;
  videoCard: string | false;
  platform: string;
  hasTouch: boolean;
  hardwareConcurrency: string | number;
}

const NA = 'N/A';
const {localStorage, indexedDB, screen, RTCPeerConnection} = window;
const {
  platform = NA,
  // userAgent = NA,
  languages = NA,
  language = NA,
  serviceWorker,
  doNotTrack,
  cookieEnabled,
  maxTouchPoints,
  hardwareConcurrency = NA,
  mediaDevices,
} = navigator;

const flashEnabled = (): boolean => {
  try {
    return Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
  } catch {
    return false;
  }
};

const detectWebcam = (callback: (value: boolean) => void): void => {
  if (!mediaDevices?.enumerateDevices) {
    callback(false);
  }

  mediaDevices
    .enumerateDevices()
    .then((devices: MediaDeviceInfo[]): boolean =>
      callback(
        devices.some(
          ({kind}: MediaDeviceInfo): boolean => kind === 'videoinput',
        ),
      ),
    )
    .catch(() => callback(false));
};

function getVideoCardInfo(): string | false {
  const gl = document.createElement('canvas').getContext('webgl');

  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    return debugInfo
      ? [
          gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        ].join(', ')
      : false;
  }

  return false;
}

export const browser = (): Promise<IBrowser> =>
  new Promise((resolve) =>
    detectWebcam((hasWebcam: boolean) =>
      resolve({
        platform,
        flashEnabled: flashEnabled(),
        cookieEnabled,
        hasLocalStorage: !!localStorage,
        hasIndexedDB: !!indexedDB,
        hasServiceWorker: !!serviceWorker,
        doNotTrack: !!doNotTrack,
        hasWebRTC: !!RTCPeerConnection,
        hasWebcam,
        videoCard: getVideoCardInfo(),
        javaEnabled: !!navigator?.javaEnabled(),
        displaySize: `${screen?.width}.${screen?.height}.${screen?.colorDepth}`,
        languages,
        language,
        hardwareConcurrency,
        hasTouch: maxTouchPoints > 0,
        timezone: -(new Date().getTimezoneOffset() / 60),
        // browserName: browserName(userAgent),
      }),
    ),
  );

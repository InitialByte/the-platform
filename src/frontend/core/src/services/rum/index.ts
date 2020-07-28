// @link https://github.com/Zizzamia/perfume.js

/*
 * Real User Monitoring.
 * For getting page load metrics of visitors on the web-site in the real world.
 *
 * - Page load metrics
 * - Load time of Static Assets
 * - API requests (XMLHttpRequest and Fetch)
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Performance
 * @link https://w3c.github.io/resource-timing/
 *
 * Usage:
 *
 * import {resourcesMeasure, browserMeasure, paintMeasure, JSCallMeasure} from '@the_platform/core';
 *
 * window.onload = () => {
 *   // It's necessary to execute those function just after window onload event.
 *   const resources = resourcesMeasure();
 *   const browser = browserMeasure(); // TODO
 *   const paintMeasure = paintMeasure();
 *
 *   // You may print or collect data
 *
 *   const foo = () => {
 *     // do something.
 *   };
 *
 *   JSCallMeasure(foo)
 *     .then((time) => {
 *       // ...
 *     })
 *     .catch((e) => {
 *       // ...
 *     });
 *
 * };
 */

const isPerformanceSupported = window.performance !== undefined;
const perf = isPerformanceSupported ? window.performance : null;

export type TResourceType =
  | 'all'
  | 'img'
  | 'css'
  | 'js'
  | 'font'
  | 'svg'
  | 'other';

export interface IPaintMeasure {
  name: string;
  startTime: number;
}

export interface IResourceMeasure {
  name: string;
  dns: number;
  tcp: number;
  ttfb: number;
  secure: number;
  transfer: number;
  duration: number;
  transferSize: number;
}

// Although the browser is required to support at least 150 resource timing
// performance entries in its resource timing buffer, some applications
// may use more resources than that limit.
const resetResourceBufferSize = (size: number = 1000): void => {
  if (!perf) {
    return;
  }

  perf.clearResourceTimings();
  perf.setResourceTimingBufferSize(size);
  perf.onresourcetimingbufferfull = () => {
    console.log(`WARNING: Resource Timing Buffer (#${size}) is FULL!`);
  };
};

resetResourceBufferSize();

export const resourcesMeasure = (
  type: TResourceType = 'all',
): IResourceMeasure[] => {
  if (!perf) {
    return [];
  }

  // @link https://www.w3.org/TR/navigation-timing-2/
  return (perf.getEntriesByType('resource') as PerformanceResourceTiming[])
    .filter((resource): PerformanceResourceTiming | undefined => {
      // TODO
      if (type === 'all') {
        return resource;
      }
    })
    .map(
      ({
        // Resources URL.
        name,
        // Timestamp for the time a resource fetch started.
        // This value is equivalent to PerformanceEntry.fetchStart.
        startTime,
        // Timestamp that is the difference between the responseEnd and the startTime properties.
        duration,
        // Represents the start time of the fetch which initiates the redirect.
        redirectStart,
        // Immediately after receiving the last byte of the response of the last redirect.
        redirectEnd,
        // Immediately before the browser starts the domain name lookup for the resource.
        domainLookupStart,
        // Representing the time immediately after the browser
        // finishes the domain name lookup for the resource.
        domainLookupEnd,
        // Immediately before the browser starts to establish
        // the connection to the server to retrieve the resource.
        connectStart,
        // Immediately after the browser finishes establishing
        // the connection to the server to retrieve the resource.
        connectEnd,
        // Immediately before the browser starts
        // the handshake process to secure the current connection.
        responseStart,
        // Immediately after the browser receives the last byte
        // of the resource or immediately before the transport
        // connection is closed, whichever comes first.
        responseEnd,
        // Immediately before the browser starts
        // the handshake process to secure the current connection.
        secureConnectionStart,
        // Representing the size (in octets) of the fetched resource.
        // The size includes the response header fields plus the response payload body.
        transferSize,
      }) => ({
        name,
        // DNS time.
        dns: domainLookupEnd - domainLookupStart,
        // TCP handshake time.
        tcp: connectEnd - connectStart,
        // Time to first byte (TTFB) is a measurement used as an
        // indication of the responsiveness of a webserver or other network resource.
        ttfb: responseStart - startTime,
        secure:
          secureConnectionStart > 0 ? connectEnd - secureConnectionStart : 0,
        redirectTime: redirectEnd - redirectStart,
        transfer: responseEnd - responseStart,
        duration,
        transferSize,
      }),
    );
};

// @link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
// @TODO
export const browserMeasure = (): null => null;

export const paintMeasure = (): IPaintMeasure[] => {
  if (!perf) {
    return [];
  }

  return perf.getEntriesByType('paint') || [];
};

export const JSCallMeasure = (callback: () => void): Promise<number> => {
  if (!perf) {
    return Promise.reject(new Error('Unsupported perf'));
  }

  const startTime = perf.now();

  try {
    callback();
  } catch (e) {
    throw Error(e);
  }

  return Promise.resolve(perf.now() - startTime);
};

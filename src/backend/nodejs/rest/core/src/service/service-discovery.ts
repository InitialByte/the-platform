/*
 * @see https://github.com/silas/node-consul#readme
 */

import * as consul from 'consul';

const createConsul = (): any => {
  const {
    SERVICE_DISCOVERY_HOST = '127.0.0.1',
    SERVICE_DISCOVERY_PORT = '9999',
  } = process.env;

  if (SERVICE_DISCOVERY_HOST && SERVICE_DISCOVERY_PORT) {
    return consul({
      host: SERVICE_DISCOVERY_HOST,
      port: SERVICE_DISCOVERY_PORT,
      promisify: true,
    });
  }

  return null;
};

const consulApp = createConsul();

if (!consulApp) {
  throw new Error('No service discovery');
}

export const registerService = (options): Promise<any> =>
  consulApp.agent.service.register(options);

export const getAllNodes = (): Promise<any> => consulApp.catalog.node.list();

export const getAllServicesByNode = (node: string): Promise<any> =>
  consulApp.catalog.node.services(node);

// Lists services in a given datacenter.
export const getAllServicesByDC = (
  datacenter: string = 'local',
): Promise<any> => consulApp.catalog.service.list(datacenter);

// Lists the nodes for a given service.
export const getAllNodesByService = (serviceName: string): Promise<any> =>
  consulApp.catalog.service.nodes(serviceName);

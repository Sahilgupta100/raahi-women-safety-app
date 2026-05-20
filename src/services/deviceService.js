import mockData from '../data/mockData.json';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

let deviceState = { ...mockData.device };

export const deviceService = {
  async getDevice() {
    await delay(300);
    return { ...deviceState };
  },

  async connect() {
    await delay(1500);
    deviceState = {
      ...deviceState,
      status: 'connected',
      lastConnected: new Date().toISOString(),
    };
    return { ...deviceState };
  },

  async disconnect() {
    await delay(400);
    deviceState = { ...deviceState, status: 'disconnected' };
    return { ...deviceState };
  },

  async reconnect() {
    await delay(1200);
    deviceState = {
      ...deviceState,
      status: 'connected',
      lastConnected: new Date().toISOString(),
    };
    return { ...deviceState };
  },
};

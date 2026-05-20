import mockData from '../data/mockData.json';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let locationState = { ...mockData.location };

export const locationService = {
  async getLocation() {
    await delay(300);
    return { ...locationState };
  },

  async subscribeToLocation(callback, intervalMs = 5000) {
    const tick = () => {
      const jitter = () => (Math.random() - 0.5) * 0.0008;
      locationState = {
        ...locationState,
        latitude: locationState.latitude + jitter(),
        longitude: locationState.longitude + jitter(),
        updatedAt: new Date().toISOString(),
      };
      callback({ ...locationState });
    };

    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  },
};

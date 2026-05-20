const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const recordingService = {
  async startAudio() {
    await delay(300);
    return { type: 'audio', status: 'recording', startedAt: new Date().toISOString() };
  },

  async stopAudio() {
    await delay(300);
    return { type: 'audio', status: 'stopped', duration: 42, url: null };
  },

  async startVideo() {
    await delay(400);
    return { type: 'video', status: 'recording', startedAt: new Date().toISOString() };
  },

  async stopVideo() {
    await delay(400);
    return { type: 'video', status: 'stopped', duration: 28, url: null };
  },
};

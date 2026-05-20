import mockData from '../data/mockData.json';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

let contacts = [...mockData.emergencyContacts];

export const contactsService = {
  async getContacts() {
    await delay(300);
    return [...contacts];
  },

  async addContact(contact) {
    await delay(500);
    const newContact = {
      id: `ec_${Date.now()}`,
      isPrimary: false,
      ...contact,
    };
    contacts = [...contacts, newContact];
    return newContact;
  },

  async updateContact(id, updates) {
    await delay(500);
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Contact not found');
    contacts[index] = { ...contacts[index], ...updates };
    return contacts[index];
  },

  async deleteContact(id) {
    await delay(400);
    contacts = contacts.filter((c) => c.id !== id);
    return { success: true };
  },

  async triggerSOS() {
    await delay(800);
    return {
      success: true,
      message: 'SOS alert sent to emergency contacts (mock)',
      notifiedCount: contacts.length,
      timestamp: new Date().toISOString(),
    };
  },
};

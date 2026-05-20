import mockData from '../data/mockData.json';

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Auth service — mock implementation. Swap with Firebase Auth / REST API later.
 */
export const authService = {
  async login({ emailOrPhone, password }) {
    await delay(800);
    if (!emailOrPhone?.trim() || !password?.trim()) {
      throw new Error('Email/phone and password are required');
    }
    if (password.length < 4) {
      throw new Error('Invalid credentials');
    }
    const user = { ...mockData.user, email: emailOrPhone.includes('@') ? emailOrPhone : mockData.user.email };
    const token = `mock_token_${Date.now()}`;
    return { user, token };
  },

  async signup({ fullName, email, phone, password, confirmPassword }) {
    await delay(900);
    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      throw new Error('All fields are required');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    const user = {
      id: `user_${Date.now()}`,
      fullName,
      email,
      phone,
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    const token = `mock_token_${Date.now()}`;
    return { user, token };
  },

  async forgotPassword(email) {
    await delay(700);
    if (!email?.trim()) throw new Error('Email is required');
    return { message: 'Password reset link sent (mock)' };
  },

  async getProfile() {
    await delay(400);
    return mockData.user;
  },

  async updateProfile(updates) {
    await delay(500);
    return { ...mockData.user, ...updates };
  },

  async logout() {
    await delay(200);
    return { success: true };
  },
};

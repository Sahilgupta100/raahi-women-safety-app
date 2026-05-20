/**
 * Base API client — replace BASE_URL and auth headers when integrating Firebase/backend.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const DEFAULT_TIMEOUT = 15000;

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {}, timeout = DEFAULT_TIMEOUT } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const token = localStorage.getItem('raahi_token');

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new ApiError(
        data?.message || 'Request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'Network error', 0);
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

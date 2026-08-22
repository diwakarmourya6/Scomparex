/// <reference types="vite/client" />
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  async getSmartphones(limit: number = 100) {
    const response = await fetch(`${API_BASE_URL}/smartphones?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch smartphones: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Assuming backend wraps response in { success: true, data: [...] }
  },

  async getSmartphone(slug: string) {
    const response = await fetch(`${API_BASE_URL}/smartphones/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch smartphone ${slug}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },

  async getBrands() {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  
  async compareSmartphones(slugs: string[]) {
    const response = await fetch(`${API_BASE_URL}/smartphones/compare?slugs=${slugs.join(',')}`);
    if (!response.ok) {
      throw new Error(`Failed to compare smartphones: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },

  getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async login(credentials: any) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data.data;
  },

  async register(userInfo: any) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    return data.data;
  },

  async getMe(token: string) {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: this.getHeaders(token)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch user');
    return data.data;
  }
};

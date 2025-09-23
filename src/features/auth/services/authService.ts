import type { AuthCredentials, User } from '../types';

const BASE_URL = '/api/auth';

export async function login(credentials: AuthCredentials): Promise<User> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch(`${BASE_URL}/me`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

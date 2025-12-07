// src/utils/token.ts
let accessToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
};

export const getAuthToken = () => accessToken;

export const clearAuthToken = () => {
  accessToken = null;
};

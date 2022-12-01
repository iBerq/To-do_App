import { authApi } from "../../api/authApi";

const TOKEN_KEY = "authorization";
const USER = "USER";

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY) || undefined;
};

export const getAuthUser = () => {
  return localStorage.getItem(USER) || undefined;
};

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setAuthUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const removeAuthUser = () => {
  localStorage.removeItem(USER);
};

export const isAuthTokenExpired = async () => {
  let expired = false;

  try {
    await authApi.validateToken();
  } catch (err) {
    console.log(err);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER);
    expired = true;
  }

  return expired;
};

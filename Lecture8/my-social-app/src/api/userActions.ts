// src/api/userActions.ts

import axiosInstance from './axiosInstance';

export const registerUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('/users/register', { username, password });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', { username, password });
  return response.data;
};

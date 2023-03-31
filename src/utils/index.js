import { AxiosResponse } from 'axios';
import request from './api';

export const handleApi = async (
  func,
  speadData = true,
) => {
  if (!func) return { success: false };
  try {
    let data = await func();
    if (!speadData) {
      return { success: true, data };
    }
    return { success: true, ...data };
  } catch (error) {
    let dataError = error?.response?.data;
    return { success: false, error: dataError };
  }
};

export const fetchApi = async (
  endPoint = '',
  data = null,
  method = 'get',
  headers = {},
  isCache = false,
) => {
  const body = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data: data,
  };

  const response = await request(endPoint, body);


  return response;
};

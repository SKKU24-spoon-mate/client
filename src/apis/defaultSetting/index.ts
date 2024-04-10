import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosBetterStacktrace from 'axios-better-stacktrace';
import _ from 'lodash';

import { baseUrl } from '@/interfaces/apis';

export const axiosCreateInstance = (customConfig: AxiosRequestConfig): AxiosInstance => {
  const { url = '' } = customConfig;
  const apiUrl = baseUrl + '/' + url;

  const config: AxiosRequestConfig = {
    baseURL: apiUrl,
  };

  if (customConfig.baseURL && customConfig.url) {
    customConfig.baseURL += customConfig.url;
  }

  _.merge(config, customConfig);

  const instance = axios.create(config);

  axiosBetterStacktrace(instance);

  return instance;
};

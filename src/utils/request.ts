import axios from 'axios';
import { message } from 'antd';

const Base_URL = {
  prod: '/',
  dev: 'http://localhost:3000',
}[APP_ENV];

const TIME_OUT = 10000;

const request = axios.create({
  baseURL: Base_URL,
  timeout: TIME_OUT,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    // 自定义header，可添加项目token
    // config.headers.token = 'token';
    return config;
  },
  (error) => {
    console.log('请求异常:', error);
    message.error('网络请求异常，请稍后重试!');
  }
);
request.interceptors.response.use(
  (response) => {
    return response.data || response.request.responseText;
  },
  (error) => {
    console.log('请求异常:', error);
    message.error('网络请求异常，请稍后重试!');
  }
);

export async function get(url: string, params: object = {}, headers: any = {}) {
  const newParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return request({
    url: `${url}?${newParams}`,
    method: 'get',
    headers: { ...headers },
  });
}

export async function post(url: string, params: any = {}, headers: any = {}) {
  return request({
    url,
    method: 'post',
    headers: { 'content-type': 'application/json', ...headers },
    data: params,
  });
}

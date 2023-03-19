/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-03-We 09:20:48
 */
import axios from 'axios';
// import Qs from 'qs';
import message from './message';
import appConfig from '@/config';
import { HTTP_CODE } from '@/config/dictionary';
import { logout } from '@/router';
import { getToken } from '@/utils/token';
import { checkAndUpdateToken, removeRequest, ganerCancelToken, addRequest } from './helper';
const { apiHost } = appConfig;
const request = axios.create({
  timeout: 30000,
  baseURL: apiHost,
  // responseType: 'json',
  withCredentials: false, // 是否允许带cookie
  // paramsSerializer:(params) => Qs.stringify(params, {allowDots: true}), // 开启qs序列化
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// axios request拦截器
request.interceptors.request.use(
  (config) => {
    // 设置cancelToken对象，阻止重复请求。当上个请求未完成时，相同的请求不会进行
    //  config.cancelToken = ganerCancelToken(config);
    // 处理token
    // const token = getToken();
    let token = localStorage.getItem('tokenKey');
    if (!token) return config;

    if (config.url.indexOf('/8082') !== -1 || config.url.indexOf('/8085') !== -1 || config.url.indexOf('/8086') !== -1) {
      return config;
    }
    config.headers['Authorization'] = `bearer ${token}`;
    console.log('==>', token);
    // 检查更新token
    // checkAndUpdateToken(config);
    return config;
  },
  (error) => Promise.reject(error)
);
// axios  respone拦截器，统一处理响应错误
request.interceptors.response.use(
  ({ config, data }) => {
    // 跳过拦截器
    if (config.isNotIntercept) {
      return Promise.resolve(data);
    }
    // 相同请求不得在短时间内重复发送
    // removeRequest(config);
    if (data.code === 200 || data.code === 0) {
      // if (['post', 'delete', 'put'].includes(config?.method as string) && !config.isNotTips) {
      //   data.message && message.success(data.message);
      // }
      return Promise.resolve(data);
    } else {
      const msg = data.message || '请求失败'; // 返回接口返回提示信息
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    message.destroy();
    if (axios.isCancel(error)) return Promise.reject(error);
    // 相同请求不得在短时间内重复发送
    removeRequest(error.config);
    if (error.response) {
      if (error.response.status === 401) {
        message.destroy();
        message.error('登录失效，请重新登录');
        logout();
      } else {
        const tips = error.response.data.message || HTTP_CODE[error.response.status];
        tips && message.error(tips);
      }
      return Promise.reject(error);
    } else {
      message.error('请求超时, 请刷新重试');
      return Promise.reject(new Error('请求超时, 请刷新重试'));
    }
  }
);
export default request;

export const get = (url, params = {}, config = {}) => request({ method: 'get', url, params, ...config });
export const post = (url, data = {}, config = {}, timeout = 30 * 1000) => request({ method: 'post', url, data, ...config, timeout });
export const put = (url, data = {}, config = {}) => request({ method: 'put', url, data, ...config });
export const patch = (url, data = {}, config = {}) => request({ method: 'patch', url, data, ...config });
export const del = (url, data = {}, config = {}) => request({ method: 'delete', url, data, ...config });

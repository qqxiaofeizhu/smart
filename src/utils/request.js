import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
      if (getToken()) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers['x-access-token'] = getToken();
        console.log(config.headers)
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });
export default axios

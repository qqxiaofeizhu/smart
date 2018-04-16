// 获取token
import Cookies from 'js-cookie';
import crypto from 'crypto-js'
const TokenKey = 'Admin-Token';
const secret = 'sgadjakdsasdhaskdhashdhasadsjdhasdasjkdkwqkedqwueeufuaduadsaaudasd';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 前端加密
export function encryption(psd) {
  return crypto.MD5(psd, secret).toString()
}
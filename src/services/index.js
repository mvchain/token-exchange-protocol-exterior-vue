import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  });
}
export function registered(data) {
  return request({
    url: '/account',
    method: 'post',
    data
  });
}
export function valiEmail(data) {
  return request({
    url: '/account/email?email=' + data,
    method: 'get'
  });
}
export function projectList(data) {
  return request({
    url: '/project?' + data,
    method: 'get'
  });
}
export function refreshToken(data) {
  return request({
    url: '/account/token/refresh',
    method: 'post'
  });
}
export function projectInfo(data) {
  return request({
    url: '/project/' + data,
    method: 'get'
  });
}
export function balance() {
  return request({
    url: '/account/balance',
    method: 'get'
  });
}
export function transaction(data) {
  return request({
    url: '/transaction',
    method: 'post',
    data
  });
}

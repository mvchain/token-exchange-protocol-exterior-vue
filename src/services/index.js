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
    url: 'getrefreshToken',
    method: 'get'
  });
}
export function projectInfo(data) {
  return request({
    url: '/project/' + data,
    method: 'get'
  });
}

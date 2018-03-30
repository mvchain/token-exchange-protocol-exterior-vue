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
export function modifyPwd(data) {
  return request({
    url: '/account/pwd',
    method: 'put',
    data
  });
}
export function valiEmail(data) {
  return request({
    url: '/account/email?email=' + data,
    method: 'get'
  });
}
export function modifyEmail(data) {
  return request({
    url: '/account/email',
    method: 'put',
    data
  });
}
export function modifyTx(data) {
  return request({
    url: '/account/transaction/pwd',
    method: 'put',
    data
  });
}
export function projectList(data) {
  return request({
    url: '/project?' + data,
    method: 'get'
  });
}
export function refreshToken() {
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
export function transactionPro(data) {
  return request({
    url: '/transaction/project/' + data,
    method: 'get'
  });
}
export function tokenList() {
  return request({
    url: '/transaction/token',
    method: 'get'
  });
}
export function withdrawInfo(data) {
  return request({
    url: '/transaction?tokenName=' + data,
    method: 'get'
  });
}
export function withdraw(data) {
  return request({
    url: '/transaction/withdraw',
    method: 'post',
    data
  });
}
export function getHistory(data) {
  return request({
    url: '/account/balance/history?' + data,
    method: 'get'
  });
}
export function orderServer(data) {
  return request({
    url: '/order?' + data,
    method: 'get'
  });
}
export function forget(data) {
  return request({
    url: '/account/forget',
    method: 'post',
    data
  });
}
export function tokenaddress(data) {
  return request({
    url: '/account/address?coinName=' + data,
    method: 'get'
  });
}
export function checkEmail(data) {
  return request({
    url: '/account/email/check',
    method: 'post',
    data
  });
}
export function getTimeService() {
  return request({
    url: '/account/time',
    method: 'get'
  });
}

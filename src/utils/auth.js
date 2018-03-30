import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';
const TokenKey2 = 'token';
const username  = 'user';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function getToken2() {
  return Cookies.get(TokenKey2);
}
export function getToken3() {
  return Cookies.get(username);
}



export function setToken(token) {
  return Cookies.set(TokenKey, token,  {
    expires: 7
  });
}
export function setToken2(token) {
  return Cookies.set(TokenKey2, token,  {
    expires: 1
  });
}
export function setToken3(token) {
  return Cookies.set(username, token,  {
    expires: 7
  });
}



export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function removeToken2() {
  return Cookies.remove(TokenKey);
}
export function removeToken3() {
  return Cookies.remove(username);
}
export function removeAll() {
  Object.keys(Cookies.get()).forEach((n) => {
    Cookies.remove(n)
  })
}

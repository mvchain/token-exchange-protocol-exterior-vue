/**
 * Created by jiachenpan on 16/11/18.
 */

/* 邮箱 */
export function isEmail(str) {
  const reg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
  return reg.test(str);
}
//
export function isPassword(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,64}$/;
  return reg.test(str);
}

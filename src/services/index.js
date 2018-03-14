/**
 * Created by   :宁建浩
 * Created time :2017/11/2
 */

// import config from '../utils/urlData';
import request from '@/utils/request';

export function getUserList(data) {
  return request({
    url: '/admin/user/page' + data,
    method: 'get'
  });
}

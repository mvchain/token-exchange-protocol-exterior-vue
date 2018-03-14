const pubconfig = {
  // 网关地址
  'gatewayIp': '//192.168.59.231',
  'gatewayPort': '8011',
  'gatewayPath': '/artisan-web-api',
  // 开发用地址（运维可以忽略）
  'serverIp': '//192.168.59.231', // http://back-web.sxb.lol
  'serverPort': '8091',
  'serverPath': '/Authority/send/artisan-web-api',
  // 图片上传地址
  'photoIp': '//upload-test.sxiaobao.com',
  'photoPort': '80',
  'photoPath': '',
  //支付yrl
  'payUrl': '//paycenter-inner.sxb.lol/tpl/mdu-buyer-pay/buyer-pay.html?',
  //支付yrl
  'withdraw': '//paycenter-inner.sxb.lol/tpl/payCash-noten/payCash-noten.html?',
  // 签名所需
  appKey: '23839157',
  appSecret: '90887ff813d92aa93af4a0e45fcfc540',
  form: 'application/x-www-form-urlencoded',
  stage: 'RELEASE',
  // true为开发调试用，线上统一用false
  'isTest': true
};
window.pubconfig = pubconfig;

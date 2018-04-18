<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import store from './store';
  import {getToken3} from '@/utils/auth';
  (function (doc, win) {
    var html = doc.getElementsByTagName('html')[0];
    var reEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    var reFontSize = function () {
        var clientW = doc.documentElement.clientWidth || doc.body.clientWidth;
        if (clientW >= 481) {
          return;
        }
        html.style.fontSize = 100 * (clientW / 2500) + 'px';
      };
    win.addEventListener(reEvt, reFontSize);
    // DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
    doc.addEventListener('DOMContentLoaded', reFontSize);
  })(document, window);
  export default {
    name: 'app',
    mounted() {
      window.setInterval(showMsgIcon, 1500000);
      function showMsgIcon() {
        let user = getToken3();
        if (user) {
          store.dispatch('getReferToken');
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/css/reset.css";
  @import "assets/css/common.styl";
</style>

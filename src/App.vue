<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import store from './store';
  export default {
    name: 'app',
    mounted() {
      window.setInterval(showMsgIcon, 1500000);
      function showMsgIcon() {
        let user = window.sessionStorage.getItem('user');
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

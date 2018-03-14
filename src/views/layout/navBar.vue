<template>
  <header class="nav-container">
    <nav class="home-banner">
      <div :class="scrollNum?'home-nav':'home-nav-other'" class="nav-container-bottom home-nav">
        <div class="main-size">
          <div class="navBar-logo"></div>
        </div>
        <div>
          <router-link class="nav-container-link" to="/home">首页</router-link>
          <router-link class="nav-container-link" to="/proList">项目列表</router-link>
          <router-link class="nav-container-link" to="/proList">帮助支持</router-link>
          <router-link class="nav-container-link login-btn color-btn" to="/proList">登录</router-link>
          <router-link class="nav-container-link login-btn color-btn" to="/proList">注册</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        scrollNum: true
      };
    },

    mounted: function () {
      const that = this;
      window.onscroll = function () {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        if (that.$route.path === '/home') {
          if (t > 300) {
            that.scrollNum = false;
          } else {
            that.scrollNum = true;
          }
        } else {
          that.scrollNum = false;
        }
      };
    },
    computed: {},
    methods: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './navBar.styl';
</style>




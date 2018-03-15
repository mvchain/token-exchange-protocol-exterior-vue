<template>
  <header class="nav-container">
    <nav class="home-banner">
      <div
        :style="scrollNum&&$route.path==='/home'?'box-shadow: none;':'box-shadow: 0 8px 16px 5px rgba(80,35,54,.15);'"
        :class="scrollNum?'home-nav':'home-nav-other'" class="nav-container-bottom home-nav">
        <div class="main-size">
          <div class="navBar-logo"></div>
        </div>
        <div>
          <router-link class="nav-container-link" to="/home">首页</router-link>
          <router-link class="nav-container-link" to="/proList">项目列表</router-link>
          <router-link class="nav-container-link" to="/help">帮助支持</router-link>
          <router-link class="nav-container-link login-btn color-btn" to="/proList">登录</router-link>
          <router-link class="nav-container-link login-btn color-btn" to="/proList">注册</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    watch: {
      '$route.path': 'fetchdata'
    },
    data() {
      return {
        scrollNum: true
      };
    },

    mounted: function () {
      const that = this;
      if (this.$route.path === '/home') {
        this.scrollNum = true;
      } else {
        this.scrollNum = false;
      }
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
    methods: {
      fetchdata() {
        if (this.$route.path === '/home') {
          this.scrollNum = true;
        } else {
          this.scrollNum = false;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './navBar.styl';
</style>




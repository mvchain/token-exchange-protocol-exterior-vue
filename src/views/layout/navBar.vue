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
          <a v-show="!uTxt" class="nav-container-link login-btn color-btn" @click="loginHandler('login')">登录</a>
          <a v-show="!uTxt" class="nav-container-link login-btn color-btn"
             @click="loginHandler('registered')">注册</a>

          <a v-show="uTxt" class="isLogin" @mouseenter="listFlag=true" @mouseleave="listFlag=false">
            <img src="../../assets/img/avatar.png" alt="">
            <span>{{uTxt}}</span>
            <transition name="el-zoom-in-top">
              <div v-show="listFlag" class="transition-box">
                <ul>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=2">账户安全</router-link>
                  </li>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=0">资金管理</router-link>
                  </li>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=1">订单管理</router-link>
                  </li>
                  <li><a @click="logout">登出</a></li>
                </ul>
              </div>
            </transition>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {removeToken} from '@/utils/auth';

  export default {
    watch: {
      '$route.path': 'fetchdata'
    },
    data() {
      return {
        scrollNum: true,
        listFlag: false,
        uTxt: ''
      };
    },

    mounted: function () {
      const that = this;
      const userInfo = window.sessionStorage.getItem('user');
      this.uTxt = userInfo ? JSON.parse(userInfo).username : false;
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
    computed: {
      ...mapGetters({
        username: 'username'
      })
    },
    methods: {
      fetchdata(v) {
        const userInfo = window.sessionStorage.getItem('user');
        this.uTxt = userInfo ? JSON.parse(userInfo).username : false;
        if (v === '/home') {
          this.scrollNum = true;
        } else {
          this.scrollNum = false;
        }
      },
      loginHandler(type) {
        this.$router.push({path: '/login', query: {type: type}});
      },
      logout() {
        window.sessionStorage.clear();
        removeToken();
        this.$router.replace({path: '/home'});
        this.uTxt = '';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './navBar.styl';
</style>




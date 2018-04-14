<template>
  <header class="nav-container">
    <nav class="home-banner">
      <div
        :style="scrollNum&&$route.path==='/home'?'box-shadow: none;':'box-shadow: 0 8px 16px 5px rgba(80,35,54,.15);'"
        :class="scrollNum?'home-nav':'home-nav-other'" class="nav-container-bottom home-nav">
        <div class="main-size">
          <div class="navBar-logo">
            <img :src="scrollNum?loginI1:loginI2" alt="">
          </div>
        </div>
        <div>
          <router-link class="nav-container-link" to="/home">{{languageVal.Home}}</router-link>
          <router-link class="nav-container-link" to="/proList">{{languageVal.Projects}}</router-link>
          <router-link class="nav-container-link" to="/help">{{languageVal.Help }}</router-link>
          <a v-show="!uTxt" class="nav-container-link login-btn login-btn1 color-btn" @click="loginHandler('login')">{{languageVal.Login}}</a>
          <a v-show="!uTxt" class="nav-container-link login-btn login-btn2 color-btn color-btn2"
             @click="loginHandler('registered')">{{languageVal.SignUp}}</a>
          <a v-show="uTxt" class="isLogin" @mouseenter="listFlag=true" @mouseleave="listFlag=false">
            <img src="../../assets/img/avatar.png" alt="">
            <span>{{uTxt}}</span>
            <transition name="el-zoom-in-top">
              <div v-show="listFlag" class="transition-box">
                <ul>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=0">{{languageVal.Fund}}</router-link>
                  </li>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=1">{{languageVal.orderManage}}</router-link>
                  </li>
                  <li>
                    <router-link class="nav-container-link" to="/safety?type=2">{{languageVal.Account}}</router-link>
                  </li>
                  <li><a @click="logout">{{languageVal.Logout}}</a></li>
                </ul>
              </div>
            </transition>
          </a>
          <el-select @change="changeFun" id="languageAuto" v-model="langVal" placeholder="请选择">
            <el-option
              v-for="item in langList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex';
  import loginImg1 from '@/assets/img/login-w.png';
  import loginImg2 from '@/assets/img/logo-c.png';
  import { getToken3 } from '@/utils/auth';
  export default {
    watch: {
      '$route.path': 'fetchdata'
    },
    data() {
      return {
        scrollNum: true,
        listFlag: false,
        uTxt: '',
        loginI1: loginImg1,
        loginI2: loginImg2,
        langList: [
          {
            label: '中文',
            value: 1
          },
          {
            label: 'EN',
            value: 2
          }
        ],
        langVal: parseInt(window.sessionStorage.getItem('LanguageType')) || 1
      };
    },

    mounted: function () {
      let language = (navigator.language || navigator.browserLanguage).toLowerCase();
      let l = parseInt(window.sessionStorage.getItem('LanguageType'));
      if (language.indexOf('en') > -1) {
        this.changeFun(l || 2);
      } else {
        this.changeFun(l || 1);
      }
      const that = this;
      this.uTxt = getToken3();
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
        username: 'username',
        languageVal: 'languageVal'
      })
    },
    methods: {
      changeFun(v) {
        window.sessionStorage.setItem('LanguageType', v);
        this.$store.dispatch('getLanguage', v);
      },
      fetchdata(v) {
        this.uTxt = getToken3();
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        if (v === '/home' && t < 300) {
          this.scrollNum = true;
        } else {
          this.scrollNum = false;
        }
      },
      loginHandler(type) {
        this.$router.push({path: '/login', query: {type: type}});
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.replace({path: '/home'});
          this.uTxt = '';
        }).catch();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './navBar.styl';
</style>




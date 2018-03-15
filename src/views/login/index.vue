<template>
  <div class="login-con" :style="loginHeight">
    <div v-show="loginFlag" class="login-container">
      <div class="login-container-title">登 录</div>
      <div class="login-container-form">
        <ul>
          <li>
            <input placeholder="邮箱" v-model="loginData.email" type="text">
          </li>
          <li>
            <input placeholder="密码" v-model="loginData.password" type="password">
          </li>
          <li class="login-container-form-validate">
            <input placeholder="验证码" v-model="loginData.validate" type="text">
            <b>lsdkfj</b>
          </li>
          <li>
            <div>
              <span>忘记密码？</span>
              <span @click="changePage">还没有账户？<b>注册</b></span>
            </div>
          </li>
          <li>
            <span>登录</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="registeredFlag" class="registered-container">
      <div class="registered-container-title">注 册</div>
      <div class="registered-container-form" style="margin-top:20px;">
        <ul>
          <li>
            <input placeholder="邮箱" v-model="registeredData.email" type="text">
          </li>
          <li class="registered-container-form-validate">
            <input placeholder="验证码" v-model="registeredData.validate" type="text">
            <b>lsdkfj</b>
          </li>
          <li>
            <input placeholder="输入登录密码" v-model="registeredData.password" type="password">
          </li>
          <li>
            <input placeholder="再次输入登录密码" v-model="registeredData.password2" type="password">
          </li>
          <li>
            <input placeholder="输入交易密码" v-model="registeredData.password3" type="password">
          </li>
          <li>
            <input placeholder="再次交易登录密码" v-model="registeredData.password4" type="password">
          </li>
          <li>
            <p>sdfsf</p>
          </li>
          <li>
            <span style="margin-top:-20px;">注 册</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'login',
    watch: {
      '$route.query.type': 'changeModel'
    },
    data() {
      return {
        loginHeight: {
          height: ''
        },
        loginFlag: false,
        registeredFlag: false,
        loginData: {
          email: '',
          password: '',
          validate: ''
        },
        registeredData: {
          email: '',
          validate: '',
          password: '',
          password2: '',
          password3: '',
          password4: ''
        }
      };
    },
    mounted() {
      this.loginFlag = this.$route.query.type === 'login';
      this.registeredFlag = this.$route.query.type === 'registered';
      this.loginHeight.height = window.innerHeight + 'px';
    },
    methods: {
      changeModel(v) {
        this.loginFlag = v === 'login';
        this.registeredFlag = v === 'registered';
      },
      changePage() {
        this.$router.push({path: '/login', query: {type: 'registered'}});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl"
</style>

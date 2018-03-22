<template>
  <div class="login-con" :style="loginHeight">
    <div v-show="loginFlag" class="login-container">
      <div class="login-container-title">登 录</div>
      <div class="login-container-form">
        <el-form :rules="rules" ref="loginData" :model="loginData">
          <el-form-item prop="username">
            <el-input placeholder="邮箱" v-model="loginData.username" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="输入登录密码" v-model="loginData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="imageCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input placeholder="验证码" v-model="loginData.imageCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: right;line-height: 0;">
              <b @click="createCode"><img :src="verificationImg" alt=""></b>
            </el-col>
          </el-form-item>
          <el-form-item>
            <span style="cursor:pointer;" @click="changePage('modify')">忘记密码？</span>
            <span style="float:right;">还没有账户？<el-button type="text" @click="changePage('registered')">注册</el-button></span>
          </el-form-item>

          <el-form-item class="login-container-form-sub">
            <el-button v-loading="subFlag" @click="registeredSub('loginData')">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="registeredFlag" class="registered-container">
      <div class="registered-container-title">注 册</div>
      <div class="registered-container-form" style="margin-top:20px;">
        <el-form :rules="rules" ref="registeredData" :model="registeredData">
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="registeredData.email" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input placeholder="验证码" v-model="registeredData.emailCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 60px;">
              <el-button  :disabled="validateCodeInterval" type="text"  @click="sendEmail('registeredData')">
                {{validateCodeTxt}}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="输入登录密码" v-model="registeredData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input placeholder="再次输入登录密码" v-model="registeredData.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="transactionPassword">
            <el-input placeholder="输入交易密码" v-model="registeredData.transactionPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password4">
            <el-input placeholder="再次交易登录密码" v-model="registeredData.password4" type="password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-checkbox v-model="checked">同意用户协议《用户协议》</el-checkbox>
          </el-form-item>
          <el-form-item class="login-container-form-sub" style="margin-top:-10px;">
            <el-button v-loading="subFlag" @click="registeredSub('registeredData')">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="modifyFlag" class="registered-container" style="height:550px;">
      <div class="registered-container-title">重置密码</div>
      <div class="registered-container-form" style="margin-top:20px;">
        <el-form :rules="rules" ref="modifyData" :model="modifyData">
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="registeredData.email" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input placeholder="验证码" v-model="modifyData.emailCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 60px;">
              <el-button  :disabled="validateCodeInterval" type="text"  @click="sendEmail('registeredData')">
                {{validateCodeTxt}}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="输入新密码" v-model="modifyData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password5">
            <el-input placeholder="再次输入新密码" v-model="modifyData.password5" type="password"></el-input>
          </el-form-item>

          <el-form-item class="login-container-form-sub" style="margin-top:30px;">
            <el-button v-loading="subFlag" @click="registeredSub('modifyData')">确认重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {isEmail, isPassword} from '../../utils/validate.js';

  export default {
    name: 'login',
    watch: {
      '$route.query.type': 'changeModel'
    },
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入邮箱！'));
        } else {
          if (!isEmail(value)) {
            callback(new Error('邮箱格式错误'));
          } else {
            callback();
          }
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入登录密码！'));
        } else {
          if (!isPassword(value)) {
            callback(new Error('登录密码需至少6位且包含数字和字母！'));
          } else {
            callback();
          }
        }
      };
      const validatePassword2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入登录密码！'));
        } else {
          if (value === this.registeredData.password) {
            callback();
          } else {
            callback(new Error('登录密码两次输入不一致！'));
          }
        }
      };
      const validatePassword3 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入交易密码！'));
        } else {
          if (value.length < 6) {
            callback(new Error('交易密码需至少6位！'));
          } else {
            callback();
          }
        }
      };
      const validatePassword4 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入交易密码！'));
        } else {
          if (value === this.registeredData.transactionPassword) {
            callback();
          } else {
            callback(new Error('交易密码两次输入不一致！'));
          }
        }
      };
      const validatePassword5 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入登录密码！'));
        } else {
          if (value === this.modifyData.password) {
            callback();
          } else {
            callback(new Error('登录密码两次输入不一致！'));
          }
        }
      };
      return {
        rules: {
          email: [{required: true, trigger: 'blur', validator: validateEmail}],
          username: [{required: true, trigger: 'blur', validator: validateEmail}],
          emailCode: [{required: true, message: '请输入验证码！', trigger: 'blur'}],
          imageCode: [{required: true, message: '请输入验证码！', trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          password2: [{required: true, trigger: 'blur', validator: validatePassword2}],
          transactionPassword: [{required: true, min: 6, trigger: 'blur', validator: validatePassword3}],
          password4: [{required: true, trigger: 'blur', validator: validatePassword4}],
          password5: [{required: true, trigger: 'blur', validator: validatePassword5}]
        },
        verificationImg: '',
        checked: true,
        loginHeight: {
          height: ''
        },
        loginFlag: false,
        registeredFlag: false,
        loginData: {
          username: '375332835@qq.com',
          password: 'aaa222',
          imageCode: ''
        },
        registeredData: {
          email: '375332835@qq.com',
          emailCode: '',
          password: '',
          password2: '',
          transactionPassword: '',
          password4: ''
        },
        modifyData: {
          email: '375332835@qq.com',
          emailCode: '',
          password: '',
          password5: ''
        },
        validateCodeInterval: false,
        validateCodeTxt: '发送验证码',
        validateCodeFlag: null,
        subFlag: false,
        n: 59,
        modifyFlag: false
      };
    },
    mounted() {
      this.loginFlag = this.$route.query.type === 'login';
      this.registeredFlag = this.$route.query.type === 'registered';
      this.modifyFlag = this.$route.query.type === 'modify';
      this.loginHeight.height = window.innerHeight + 'px';
      this.createCode();
    },
    methods: {
      sendEmail(name) {
        if (!this.validateCodeInterval) {
          this.$store.dispatch('getValiEmail', this[name].email).then(() => {
          }).catch((err) => {
            this.$message.error(err);
          });
        }
        this.validateCodeInterval = true;
        if (this.n !== 59) return;
        let that = this;
        this.validateCodeFlag = setInterval(() => {
          if (that.n <= 0) {
            clearInterval(that.validateCodeFlag);
            that.validateCodeInterval = false;
            that.validateCodeTxt = '发送验证码';
            that.n = 59;
          } else {
            that.n--;
            that.validateCodeInterval = true;
            that.validateCodeTxt = `已发送(${that.n})s`;
          }
        }, 1000);
      },
      changeModel(v) {
        this.loginFlag = v === 'login';
        this.registeredFlag = v === 'registered';
        this.modifyFlag = v === 'modify';
      },
      changePage(v) {
        this.$router.push({path: '/login', query: {type: v}});
      },
      createCode() {
        this.verificationImg = window.urlData.url + '/account/validate/image?t=' + Date.parse(new Date());
      },
      registeredSub(name) {
        if (!this.checked) return;
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (name === 'loginData') {
              this.$store.dispatch('getLogin', this[name]).then(() => {
                this.$message.success('登录成功');
                this.$router.push({path: '/home'});
              }).catch((err) => {
                this.$message.error(err);
                this.createCode();
              });
            } else if (name === 'modifyData') {
              this.$store.dispatch('getForget', this[name]).then(() => {
                this.$message.success('重置成功');
                this.$refs[name].resetFields();
                this.$router.replace({path: '/login', query: {type: 'login'}});
              }).catch((err) => {
                this.$message.error(err);
                this.createCode();
              });
            } else {
              this.$store.dispatch('getRegistered', this[name]).then(() => {
                this.$router.replace({path: '/login', query: {type: 'login'}});
                this.$message.success('注册成功');
                this.$refs[name].resetFields();
              }).catch((err) => {
                this.$message.error(err);
              });
            }
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl"
</style>

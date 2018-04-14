<template>
  <div class="login-con" :style="loginHeight">
    <div v-show="loginFlag" class="login-container">
      <div class="login-container-title" >{{languageVal.Login}}</div>
      <div class="login-container-form">
        <el-form @keyup.enter.native="registeredSub('loginData')"  :rules="rules" ref="loginData" :model="loginData">
          <el-form-item prop="username">
            <el-input :placeholder="languageVal.Email" v-model="loginData.username" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="languageVal.Enterloginpassword" v-model="loginData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="imageCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input :placeholder="languageVal.Code" v-model="loginData.imageCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: right;line-height: 0;">
              <b @click="createCode"><img :src="verificationImg" alt=""></b>
            </el-col>
          </el-form-item>
          <el-form-item>
            <span class="hover-style" style="cursor:pointer;" @click="changePage('modify')">{{languageVal.Forgotyourpassword}}？</span>
            <span style="float:right;">{{languageVal.Newuser}}<el-button  class="hover-style" type="text" @click="changePage('registered')">{{languageVal.SignUp}}</el-button></span>
          </el-form-item>

          <el-form-item class="login-container-form-sub">
            <el-button class="registedBtn" v-loading="subFlag" @click="registeredSub('loginData')">{{languageVal.Login}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="registeredFlag" class="registered-container">
      <div class="registered-container-title">{{languageVal.SignUp}}</div>
      <div class="registered-container-form" style="margin-top:20px;">
        <el-form :rules="rules" ref="registeredData" :model="registeredData">
          <el-form-item prop="email">
            <el-input :placeholder="languageVal.Email" v-model="registeredData.email" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input :placeholder="languageVal.Code" v-model="registeredData.emailCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 60px;">
              <el-button  :disabled="validateCodeInterval" type="text"  @click="sendEmail('registeredData')">
                {{validateCodeTxt}}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="languageVal.Pleaseenterloginpassword" v-model="registeredData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input :placeholder="languageVal.Entertheloginpasswordagain" v-model="registeredData.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="transactionPassword">
            <el-input :placeholder="languageVal.Entertransactionpassword" v-model="registeredData.transactionPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password4">
            <el-input :placeholder="languageVal.Entertransactionpasswordagain" v-model="registeredData.password4" type="password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-checkbox v-model="checked">{{languageVal.AgreedtotheUserAgreement}}</el-checkbox>
          </el-form-item>
          <el-form-item class="login-container-form-sub" style="margin-top:-10px;">
            <el-button class="registedBtn" v-loading="subFlag" @click="registeredSub('registeredData')">{{languageVal.SignUp}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="modifyFlag" class="registered-container" style="height:550px;">
      <div class="registered-container-title">{{languageVal.Resetpassword}}</div>
      <div class="registered-container-form" style="margin-top:20px;">
        <el-form :rules="rules" ref="modifyData" :model="modifyData">
          <el-form-item prop="email">
            <el-input :placeholder="languageVal.Email" v-model="modifyData.email" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" class="registered-container-form-validate">
            <el-col :span="12">
              <el-input :placeholder="languageVal.Code" v-model="modifyData.emailCode" type="text"></el-input>
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 60px;">
              <el-button  :disabled="validateCodeInterval" type="text"  @click="sendEmail('modifyData')">
                {{validateCodeTxt}}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="languageVal.Pleaseenteranewpassword" v-model="modifyData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password5">
            <el-input :placeholder="languageVal.Enternewpasswordagain" v-model="modifyData.password5" type="password"></el-input>
          </el-form-item>

          <el-form-item class="login-container-form-sub " style="margin-top:30px;">
            <el-button class="registedBtn" v-loading="subFlag" @click="registeredSub('modifyData')">{{languageVal.Confirmreset}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {isEmail, isPassword} from '../../utils/validate.js';
  import { cryptoFun } from '../../utils/index';
  import {mapGetters} from 'vuex';
  export default {
    name: 'login',
    watch: {
      '$route.query.type': 'changeModel',
      'languageVal': 'languageValHandler'
    },
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseentertheemailaddress));
        } else {
          if (!isEmail(value)) {
            callback(new Error(this.languageVal.Theformatofthemailboxisincorrect));
          } else {
            callback();
          }
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenterloginpassword));
        } else {
          if (!isPassword(value)) {
            callback(new Error(this.languageVal.Loginpasswordmustbeatleastdigitsandincludenumbersandletters));
          } else {
            callback();
          }
        }
      };
      const validatePassword2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenteryourloginpasswordagain));
        } else {
          if (value === this.registeredData.password) {
            callback();
          } else {
            callback(new Error(this.languageVal.Theloginpasswordisinconsistentlyenteredtwice));
          }
        }
      };
      const validatePassword3 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenterthetransactionpassword));
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
          callback(new Error(this.languageVal.Pleaseentertransactionpasswordagain));
        } else {
          if (value === this.registeredData.transactionPassword) {
            callback();
          } else {
            callback(new Error(this.languageVal.Inconsistentinputoftransactionpasswordtwice));
          }
        }
      };
      const validatePassword5 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenteryourloginpasswordagain));
        } else {
          if (value === this.modifyData.password) {
            callback();
          } else {
            callback(new Error(this.languageVal.Theloginpasswordisinconsistentlyenteredtwice));
          }
        }
      };
      return {
        rules: {
          email: [{required: true, trigger: 'blur', validator: validateEmail}],
          username: [{required: true, trigger: 'blur', validator: validateEmail}],
          emailCode: [{required: true, message: '', trigger: 'blur'}],
          imageCode: [{required: true, message: '', trigger: 'blur'}],
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
          username: '',
          password: '',
          imageCode: ''
        },
        registeredData: {
          email: '',
          emailCode: '',
          password: '',
          password2: '',
          transactionPassword: '',
          password4: ''
        },
        modifyData: {
          email: '',
          emailCode: '',
          password: '',
          password5: ''
        },
        validateCodeInterval: false,
        validateCodeTxt: '',
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
      this.rules.emailCode[0].message = this.languageVal.Pleaseenteracode;
      this.rules.imageCode[0].message = this.languageVal.Pleaseenteracode;
      this.createCode();
      this.validateCodeTxt = this.languageVal.Sendthecode;
    },

    computed: {
      ...mapGetters({
        languageVal: 'languageVal'
      })
    },
    methods: {
      sendEmail(name) {
        if (!this[name].email) return;
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
            that.validateCodeTxt = that.languageVal.Sendthecode;
            that.n = 59;
          } else {
            that.n--;
            that.validateCodeInterval = true;
            that.validateCodeTxt = `${that.languageVal.Sent}(${that.n})s`;
          }
        }, 1000);
      },
      languageValHandler(a, b) {
        this.validateCodeTxt = a.Sendthecode;
        this.rules.emailCode[0].message = a.Pleaseenteracode;
        this.rules.imageCode[0].message = a.Pleaseenteracode;
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
        this.verificationImg = window.urlData.url + '/account/validate/image?t=' + Date.now();
      },
      registeredSub(name) {
        if (!this.checked) return;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let opt = JSON.stringify(this[name]);
            let _opt = JSON.parse(opt);
            if (name === 'loginData') {
              _opt.password = cryptoFun(_opt.password);
              this.$store.dispatch('getLogin', _opt).then(() => {
                this.$message.success(this.languageVal.logSUCCESS);
                this.$router.push({path: '/home'});
              }).catch((err) => {
                this.$message.error(err);
                this.createCode();
              });
            } else if (name === 'modifyData') {
              _opt.password = cryptoFun(_opt.password);
              this.$store.dispatch('getForget', _opt).then(() => {
                this.$message.success(this.languageVal.Resetsuccessful);
                this.$refs[name].resetFields();
                this.$router.replace({path: '/login', query: {type: 'login'}});
              }).catch((err) => {
                this.$message.error(err);
                this.createCode();
              });
            } else {
              _opt.password = cryptoFun(this[name].password);
              _opt.transactionPassword = cryptoFun(this[name].transactionPassword);
              this.$store.dispatch('getRegistered', _opt).then(() => {
                this.$router.replace({path: '/login', query: {type: 'login'}});
                this.$message.success(this.languageVal.regSUCCESS);
                this.$refs[name].resetFields();
              }).catch((err) => {
                this.$message.error(err);
              });
            }
          } else {
            this.$message.error(this.languageVal.Pleasecompletetheforminformation);
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

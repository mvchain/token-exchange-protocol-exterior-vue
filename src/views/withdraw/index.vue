<template>
  <div class="withdraw-con">
    <div class="withdraw-from">
      <div class="withdraw-from-title">{{languageVal.Withdrawal}}</div>
      <div class="withdraw-from-body">
        <el-form :model="withdrawFrom" :rules="rules" ref="withdrawFrom">
          <el-form-item prop="token" class="withdraw-input">
            <el-select @change="modifyNumHandler" :style="selectStyle" v-model="withdrawFrom.tokenName" >
              <el-option
                v-for="(v,k) in tokenList"
                :key="k"
                :label="v"
                :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="address" class="withdraw-input">
            <input :placeholder="languageVal.EnterWithdrawal" v-model="withdrawFrom.address">
          </el-form-item>
          <el-form-item prop="number">
            <input :placeholder="languageVal.EnterWithdrawalAddr" v-model="withdrawFrom.number">
          </el-form-item>
          <el-form-item style="margin-bottom:10px;" class="withdraw-from-body-instructions">
            <ul>
              <li>{{languageVal.AccountBalance}}：{{withdrawInfo.balance}}</li>
              <li>{{languageVal.Oneday}}：{{withdrawInfo.max}}</li>
              <li>{{languageVal.cashout}} {{withdrawInfo.min}}，{{languageVal.SingleMost}} {{withdrawInfo.max}}</li>
              <li>{{languageVal.WithdrawalFee}} {{withdrawInfo.poundage}}</li>
            </ul>
          </el-form-item>
          <el-form-item prop="transactionPassword">
            <input type="password" :placeholder="languageVal.Entertransactionpassword" v-model="withdrawFrom.transactionPassword">
          </el-form-item>
          <el-form-item prop="emailCode">
            <el-col :span="12">
              <input :placeholder="languageVal.Pleaseenteracode" v-model="withdrawFrom.emailCode">
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 30px;">
              <el-button :disabled="validateCodeInterval" type="text"  @click="sendEmail">{{validateCodeTxt}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item class="withdraw-from-body-sub">
            <el-button v-loading="subFlag" class="color-btn2 color-btn registedBtn" @click="subFrom('withdrawFrom')">{{languageVal.ConfirmWithdrawal}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import { cryptoFun } from '../../utils/index';
  import { getToken3 } from '@/utils/auth';
  export default {
    name: 'withdraw',
    watch: {
      'languageVal': 'languageValHandler'
    },
    data() {
      const tokenNameVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.selectToken));
        } else {
          callback();
        }
      };
      const addressVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.addressLength));
        } else {
          callback();
        }
      };
      const numberVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.withdrawalAmount));
        } else {
          if (value > this.withdrawInfo.balance) {
            callback(new Error(this.languageVal.InsufficientFunds));
          } else if (value < this.withdrawInfo.min) {
            callback(new Error(this.languageVal.withdrawalAmountMoreThenMin));
          } else if (value > this.withdrawInfo.max) {
            callback(new Error(this.languageVal.withdrawalAmountLimit));
          } else {
            callback();
          }
        }
      };
      const emailCodeVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenteracode));
        } else {
          callback();
        }
      };
      const transactionPasswordVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Pleaseenterthetransactionpassword));
        } else {
          callback();
        }
      };
      return {
        coinType: '',
        subFlag: false,
        codeFlag: false,
        validateCodeTxt: '',
        validateCodeFlag: null,
        validateCodeInterval: false,
        n: 59,
        selectStyle: {
          width: '100%'
        },
        withdrawFrom: {
          tokenName: '',
          address: '',
          number: '',
          transactionPassword: '',
          emailCode: ''
        },
        rules: {
          tokenName: [{required: true, trigger: 'blur', validator: tokenNameVali}],
          address: [{required: true, trigger: 'blur', validator: addressVali}],
          number: [{required: true, trigger: 'blur', validator: numberVali}],
          emailCode: [{required: true, trigger: 'blur', validator: emailCodeVali}],
          transactionPassword: [{required: true, trigger: 'blur', validator: transactionPasswordVali}]
        }
      };
    },
    computed: {
      ...mapGetters({
        tokenList: 'tokenList',
        withdrawInfo: 'withdrawInfo',
        languageVal: 'languageVal'
      })
    },
    mounted() {
      this.getTokenList(this.$route.query.code);
      this.validateCodeTxt = this.languageVal.Sendthecode;
    },
    methods: {
      languageValHandler(a) {
        this.validateCodeTxt = a.Sendthecode;
      },
      getTokenList(id) {
        this.$store.dispatch('getTokenList').then(() => {
          this.getWithdrawInfo(id);
          this.withdrawFrom.tokenName = id;
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      modifyNumHandler(v) {
        this.getTokenList(v);
      },
      getWithdrawInfo(type) {
        this.$store.dispatch('getWithdrawInfo', type).then(() => {
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      subFrom(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let opt = JSON.stringify(this[name]);
            let _opt = JSON.parse(opt);
            _opt.transactionPassword = cryptoFun(_opt.transactionPassword);
            this.subFlag = true;
            this.$store.dispatch('getWithdraw', _opt).then(() => {
              this.$message.success(this.languageVal.SuccessfulWithdrawal);
              this.$refs[name].resetFields();
              this.subFlag = false;
              this.getWithdrawInfo(this.$route.query.code);
            }).catch((err) => {
              this.$message.error(err);
              this.subFlag = false;
            });
          } else {
            this.$message.error(this.languageVal.Pleasecompletetheforminformation);
            return false;
          }
        });
      },
      sendEmail() {
        let username = getToken3();
        if (!this.validateCodeInterval) {
          this.$store.dispatch('getValiEmail', username).then(() => {
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./index.styl";
</style>

<template>
  <div class="withdraw-con">
    <div class="withdraw-from">
      <div class="withdraw-from-title">提 现</div>
      <div class="withdraw-from-body">
        <el-form :model="withdrawFrom" :rules="rules" ref="withdrawFrom">
          <el-form-item prop="token" class="withdraw-input">
            <el-select @change="modifyNumHandler" :style="selectStyle" v-model="withdrawFrom.tokenName" placeholder="请选择">
              <el-option
                v-for="(v,k) in tokenList"
                :key="k"
                :label="v"
                :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="address" class="withdraw-input">
            <input placeholder="输入提现地址" v-model="withdrawFrom.address">
          </el-form-item>
          <el-form-item prop="number">
            <input placeholder="输入提现金额" v-model="withdrawFrom.number">
          </el-form-item>
          <el-form-item style="margin-bottom:10px;" class="withdraw-from-body-instructions">
            <ul>
              <li>账户余额：{{withdrawInfo.balance}}</li>
              <li>单日提现上限：{{withdrawInfo.max}}</li>
              <li>最少提现{{withdrawInfo.min}}ETH，单次最多{{withdrawInfo.max}}ETH</li>
              <li>提现手续费{{withdrawInfo.poundage}}{{$route.query.code}}</li>
            </ul>
          </el-form-item>
          <el-form-item prop="transactionPassword">
            <input type="password" placeholder="输入交易密码" v-model="withdrawFrom.transactionPassword">
          </el-form-item>
          <el-form-item prop="emailCode">
            <el-col :span="12">
              <input placeholder="输入验证码" v-model="withdrawFrom.emailCode">
            </el-col>
            <el-col :span="12" style="text-align: center;line-height: 30px;">
              <el-button :disabled="validateCodeInterval" type="text"  @click="sendEmail">{{validateCodeTxt}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item class="withdraw-from-body-sub">
            <el-button v-loading="subFlag" class="color-btn2 color-btn" @click="subFrom('withdrawFrom')">确认提现</el-button>
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
    data() {
      const tokenNameVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择token'));
        } else {
          callback();
        }
      };
      const addressVali = (rule, value, callback) => {
        if (!value || value.length !== 42) {
          callback(new Error('提现地址长度错误！'));
        } else {
          callback();
        }
      };
      const numberVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入提现金额！'));
        } else {
          if (value > this.withdrawInfo.balance) {
            callback(new Error('金额不足！'));
          } else if (value < this.withdrawInfo.min) {
            callback(new Error('提现金额需大于最少提现额！'));
          } else if (value > this.withdrawInfo.max) {
            callback(new Error('提现金额超出上限！'));
          } else {
            callback();
          }
        }
      };
      const emailCodeVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码！'));
        } else {
          callback();
        }
      };
      const transactionPasswordVali = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入交易密码！'));
        } else {
          callback();
        }
      };
      return {
        coinType: '',
        subFlag: false,
        codeFlag: false,
        validateCodeTxt: '发送验证码',
        validateCodeFlag: null,
        validateCodeInterval: false,
        n: 59,
        selectStyle: {
          width: '100%',
          border: '1px solid #ff7974',
          borderRadius: '5px'
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
        withdrawInfo: 'withdrawInfo'
      })
    },
    mounted() {
      this.getTokenList(this.$route.query.code);
    },
    methods: {
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
        this.subFlag = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let opt = JSON.stringify(this[name]);
            let _opt = JSON.parse(opt);
            _opt.transactionPassword = cryptoFun(_opt.transactionPassword);
            this.$store.dispatch('getWithdraw', _opt).then(() => {
              this.$message.success('提现成功');
              this.$refs[name].resetFields();
              this.subFlag = false;
              this.getWithdrawInfo(this.$route.query.code);
            }).catch((err) => {
              this.$message.error(err);
              this.subFlag = false;
            });
          } else {
            this.$message.error('请完善表单信息');
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
            that.validateCodeTxt = '发送验证码';
            that.n = 59;
          } else {
            that.n--;
            that.validateCodeInterval = true;
            that.validateCodeTxt = `已发送(${that.n})s`;
          }
        }, 1000);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl";
</style>

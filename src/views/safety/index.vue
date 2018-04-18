<template>
  <div class="help-con container-dear">
    <div class="help-circle-con">
      <div class="help-circle">
      </div>
    </div>
    <div id="safetyNav" class="safety-nav">
      <div class="safety-title">
        <div :class="listNum == k ? 'selected-title' : ''" @click="listNum = k" class="safety-name"
             v-for="(v,k) in listName" :key="k">{{v.name}}
        </div>
      </div>
      <div class="safety-pane">
        <div v-show="listNum == 0" class="safety-pane-item">
          <div class="safety-pane-item-left">
            <span  v-for="(v, k) in fundsList" :key="k"
                  :class="$route.path === v.route ? 'selected-btn' : ''"
                  @click="rechargeHandler(k,v.route)">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-right">
            <transition name="el-fade-in-linear" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
        <div v-show="listNum == 1" class="safety-pane-item">
          <div class="safety-pane-item-left">
            <span  v-for="(v, k) in orderList" :key="k" :class="orderNum === k ? 'selected-btn' : ''"
                  @click="switchOrder(k, v.value)">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-right">
            <el-table
              id="orderTable"
              :data="orderLists.list"
              v-loading="orderLoading"
              height="430"
              style="width: 100%">
              <el-table-column
                prop="orderId"
                :label="languageVal.Order"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createdAt"
                :label="languageVal.Time"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="projectName"
                :label="languageVal.Project"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="ethNumber"
                :label="languageVal.buyAmount"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="tokenNumber"
                :label="languageVal.Number"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                :label="languageVal.ProjectStatus"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-show="scope.row.status === 1">{{languageVal.InProgress}}</span>
                  <span v-show="scope.row.status === 9">{{languageVal.FAILED}}</span>
                  <span v-show="scope.row.status === 2">
                    {{scope.row.ethNumber >= scope.row.projectEthNumber ? languageVal.DONE : languageVal.FAILED}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="languageVal.OrderStatus"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row | statusFilter}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div id="m-orderTable" v-loading="orderLoading">
              <ul class="m-funds-table-ul" v-for="(v,k) in orderLists.list">
                <li class="m-funds-table-li">
                  <div>{{languageVal.Order}}:</div>
                  <div>{{v.orderId}}</div>
                </li>
                <li class="m-funds-table-li">
                  <div>{{languageVal.Time}}:</div>
                  <div>{{v.createdAt}}</div>
                </li>
                <li class="m-funds-table-li">
                  <div>{{languageVal.Project}}:</div>
                  <div>{{v.projectName}}</div>
                </li>
                <li class="m-funds-table-li">
                  <div>{{languageVal.buyAmount}}:</div>
                  <div>{{v.ethNumber}}</div>
                </li>
                <li class="m-funds-table-li">
                  <div>{{languageVal.Number}}:</div>
                  <div>{{v.tokenNumber}}</div>
                </li>
                <li class="m-funds-table-li">
                  <div>{{languageVal.ProjectStatus}}:</div>
                  <div>
                    <span v-show="v.status === 1">{{languageVal.InProgress}}</span>
                    <span v-show="v.status === 9">{{languageVal.FAILED}}</span>
                    <span v-show="v.status === 2">
                    {{v.ethNumber >= v.projectEthNumber ? languageVal.DONE : languageVal.FAILED}}
                  </span>
                  </div>
                </li>
              </ul>
            </div>
            <div style="text-align: center;margin-top:30px;">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="orderLists.total">
              </el-pagination>
            </div>
          </div>
        </div>
        <div v-show="listNum == 2"  class="safety-pane-item">
          <div class="safety-pane-item-left">
            <span :class="modifyNum === k ? 'selected-btn' : ''" @click="modifyNum = k"
                  v-for="(v, k) in modifyList" :key="k">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-modify">
            <div v-show="modifyNum === 0" class="safety-pane-item-modify-con modify-email">
              <el-form v-show="emailFlag" :model="modifyEmailFrom" :rules="rules" ref="modifyEmailFrom">
                <el-form-item prop="email" class="safety-pane-item-modify-input">
                  <el-input :placeholder="languageVal.NEWEMAIL" v-model="modifyEmailFrom.email"></el-input>
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <el-input :placeholder="languageVal.Pleaseenteracode" v-model="modifyEmailFrom.emailCode"></el-input>
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="modifyEmailFrom.email"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyEmailFrom', 'modifyEmail')">{{languageVal.Confirmrevision}}</span>
                </el-form-item>
              </el-form>
              <el-form v-show="!emailFlag">
                <el-form-item class="safety-pane-item-modify-input">
                 <p>{{languageVal.Emailisalreadybound}}：{{username1}}</p>
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <el-input :placeholder="languageVal.Pleaseenteracode" v-model="modifyCheckFrom.emailCode"></el-input>
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="username1"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyValiSub()">{{languageVal.Gotomodify}}</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="modifyNum === 1" class="safety-pane-item-modify-con modify-login-pwd">
              <el-form :model="modifyLoginPwd" :rules="rules" ref="modifyLoginPwd">
                <el-form-item prop="password" class="safety-pane-item-modify-input">
                  <el-input type="password" :placeholder="languageVal.Enteroldpassword" v-model="modifyLoginPwd.password"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" class="safety-pane-item-modify-input">
                  <el-input type="password" :placeholder="languageVal.Enternewpassword" v-model="modifyLoginPwd.newPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword2" class="safety-pane-item-modify-input">
                  <el-input type="password" :placeholder="languageVal.Enternewpasswordagain" v-model="modifyLoginPwd.newPassword2"></el-input>
                </el-form-item>
                <el-form-item prop="imageCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <el-input :placeholder="languageVal.Pleaseenteracode" v-model="modifyLoginPwd.imageCode"></el-input>
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <b @click="createCode"><img :src="verificationImg" alt=""></b>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyLoginPwd', 'modifyPwdHandler')">{{languageVal.Confirmrevision}}</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="modifyNum === 2" class="safety-pane-item-modify-con modify-tx-pwd">
              <el-form :model="modifyTxPwd" :rules="rules" ref="modifyTxPwd">
                <el-form-item prop="transactionPassword" class="safety-pane-item-modify-input">
                  <el-input type="password" :placeholder="languageVal.Enternewpassword" v-model="modifyTxPwd.transactionPassword"></el-input>
                </el-form-item>
                <el-form-item prop="transactionPassword2" class="safety-pane-item-modify-input">
                  <el-input type="password" :placeholder="languageVal.Enternewpasswordagain" v-model="modifyTxPwd.transactionPassword2"></el-input>
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <el-input :placeholder="languageVal.Pleaseenteracode" v-model="modifyTxPwd.emailCode"></el-input>
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="username1"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyTxPwd', 'modifyTxHandler')">{{languageVal.Confirmrevision}}</span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex';
  import {isEmail, isPassword} from '../../utils/validate.js';
  import countDown from '../../components/countdown';
  import { cryptoFun } from '../../utils/index';
  import { getToken3 } from '@/utils/auth';
  import foot from '../../components/foot';
  export default {
    name: 'safety',
    watch: {
      '$route.query.type': 'changeList',
      'languageVal': 'languageValHandler'
    },
    components: {
      'count-down': countDown,
      'footer-com': foot
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
          if (value === this.modifyLoginPwd.newPassword) {
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
            callback(new Error(this.languageVal.TradingPassword));
          } else {
            callback();
          }
        }
      };
      const validatePassword4 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.languageVal.Entertransactionpasswordagain));
        } else {
          if (value === this.modifyTxPwd.transactionPassword) {
            callback();
          } else {
            callback(new Error(this.languageVal.Inconsistentinputoftransactionpasswordtwice));
          }
        }
      };
      return {
        username1: getToken3(),
        rules: {
          email: [{required: true, trigger: 'blur', validator: validateEmail}],
          emailCode: [{required: true, message: '', trigger: 'blur'}],
          imageCode: [{required: true, message: '', trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          newPassword: [{required: true, trigger: 'blur', validator: validatePassword}],
          newPassword2: [{required: true, trigger: 'blur', validator: validatePassword2}],
          password2: [{required: true, trigger: 'blur', validator: validatePassword2}],
          transactionPassword2: [{required: true, trigger: 'blur', validator: validatePassword4}],
          transactionPassword: [{required: true, min: 6, trigger: 'blur', validator: validatePassword3}]
        },
        fundsNum: 0,
        fundsList: [
          {
            name: '',
            route: '/safety/fundsTable'
          },
          {
            name: '',
            route: '/safety/ctHistory'
          }
        ],
        orderNum: 0,
        orderList: [
          {
            name: '',
            value: ''
          },
          {
            name: '',
            value: '2'
          },
          {
            name: '',
            value: '1'
          }
        ],
        modifyNum: 0,
        modifyList: [
          {
            name: ''
          },
          {
            name: ''
          },
          {
            name: ''
          }
        ],
        listName: [
          {
            name: ''
          },
          {
            name: ''
          },
          {
            name: ''
          }
        ],
        listNum: 0,
        modifyCheckFrom: {
          email: getToken3(),
          emailCode: ''
        },
        modifyEmailFrom: {
          email: '',
          emailCode: ''
        },
        modifyLoginPwd: {
          password: '',
          newPassword: '',
          newPassword2: '',
          imageCode: ''
        },
        modifyTxPwd: {
          transactionPassword: '',
          transactionPassword2: '',
          emailCode: ''
        },
        verificationImg: '',
        orderLoading: false,
        pageNum: 1,
        orderState: '',
        emailFlag: false
      };
    },
    mounted() {
      this.listNum = this.$route.query.type;
      this.orderHandler('pageNum=1&pageSize=10&orderBy=created_at desc');
      this.createCode();
      this.languageValHandler(this.languageVal);
    },
    computed: {
      ...mapGetters({
        orderLists: 'orderList',
        languageVal: 'languageVal'
      })
    },
    methods: {
      languageValHandler(a) {
        this.fundsList[0].name = a.Balance;
        this.fundsList[1].name = a.History;
        this.orderList[0].name = a.All;
        this.orderList[1].name = a.over;
        this.orderList[2].name = a.INPROGRESS;
        this.modifyList[0].name = a.Emailmodification;
        this.modifyList[1].name = a.LoginPasswordModification;
        this.modifyList[2].name = a.TransactionPasswordModification;
        this.listName[0].name = a.Fund;
        this.listName[1].name = a.orderManage;
        this.listName[2].name = a.Account;
        this.rules.emailCode[0].message = a.Pleaseenteracode;
        this.rules.imageCode[0].message = a.Pleaseenteracode;
      },
      changeList(t) {
        this.listNum = t;
      },
      rechargeHandler(idx, name) {
        this.fundsNum = idx;
        this.$router.push({path: name, query: {id: '', type: '', code: ''}});
      },
      modifyEmailSub(name, type) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let opt = JSON.stringify(this[name]);
            let _opt = JSON.parse(opt);

            if (_opt.password) {
              _opt.password = cryptoFun(_opt.password);
            }
            if (_opt.newPassword) {
              _opt.newPassword = cryptoFun(_opt.newPassword);
            }
            if (_opt.transactionPassword) {
              _opt.transactionPassword = cryptoFun(_opt.transactionPassword);
            }
            this.$store.dispatch(type, _opt).then(() => {
              this.$message.success(this.languageVal.Successfullymodified);
              this.$refs[name].resetFields();
              if (name !== 'modifyTxPwd') {
                this.logout();
              }
            }).catch((err) => {
              this.$message.error(err);
            });
          } else {
            this.$message.error(this.languageVal.Pleasecompletetheforminformation);
            return false;
          }
        });
      },
      createCode() {
        this.verificationImg = window.urlData.url + '/account/validate/image?t=' + Date.now();
      },
      orderHandler(str) {
        this.orderLoading = true;
        this.$store.dispatch('getOrderList', str).then(() => {
          this.orderLoading = false;
        }).catch((err) => {
          this.orderLoading = false;
          this.$message.error(err);
        });
      },
      switchOrder(k, v) {
        this.orderNum = k;
        this.orderState = v;
        this.orderHandler(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&status=${v}`);
        this.pageNum = 1;
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.orderHandler(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&status=${this.orderState}`);
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.replace({path: '/home'});
        }).catch();
      },
      modifyValiSub() {
        this.$store.dispatch('getEmailCodeHandler', this.modifyCheckFrom).then(() => {
          this.emailFlag = !this.emailFlag;
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index..styl"
</style>

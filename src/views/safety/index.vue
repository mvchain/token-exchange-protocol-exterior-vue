<template>
  <div class="help-con">
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
            <span class="color-btn" v-for="(v, k) in fundsList" :key="k"
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
            <span class="color-btn" v-for="(v, k) in orderList" :key="k" :class="orderNum === k ? 'selected-btn' : ''"
                  @click="switchOrder(k, v.value)">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-right">
            <el-table
              :data="orderLists.list"
              v-loading="orderLoading"
              style="width: 100%">
              <el-table-column
                prop="orderId"
                label="订单号"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="时间"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="projectName"
                label="项目名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="ethNumber"
                label="购买金额"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="tokenNumber"
                label="购买数量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="项目状态"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.status === 0 ? '即将开始' : scope.row.status === 2 ? '已结束' : '进行中'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="是否发币"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.orderStatus === 0 ? '新币' : scope.row.orderStatus === 2 ? '已发币' : scope.row.orderStatus === 4 ? '清退' : '取消'}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top:30px;">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="orderLists.total">
              </el-pagination>
            </div>
          </div>
        </div>
        <div v-show="listNum == 2" class="safety-pane-item">
          <div class="safety-pane-item-left">
            <span :class="modifyNum === k ? 'selected-btn' : ''" @click="modifyNum = k" class="color-btn"
                  v-for="(v, k) in modifyList" :key="k">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-modify">
            <div v-show="modifyNum === 0" class="safety-pane-item-modify-con modify-email">
              <el-form :model="modifyEmailFrom" :rules="rules" ref="modifyEmailFrom">
                <el-form-item prop="email" class="safety-pane-item-modify-input">
                  <input placeholder="输入新邮箱" v-model="modifyEmailFrom.email">
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <input placeholder="输入验证码" v-model="modifyEmailFrom.emailCode">
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="modifyEmailFrom.email"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyEmailFrom', 'modifyEmail')">确认修改</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="modifyNum === 1" class="safety-pane-item-modify-con modify-login-pwd">
              <el-form :model="modifyLoginPwd" :rules="rules" ref="modifyLoginPwd">
                <el-form-item prop="password" class="safety-pane-item-modify-input">
                  <input type="password" placeholder="输入旧密码" v-model="modifyLoginPwd.password">
                </el-form-item>
                <el-form-item prop="password" class="safety-pane-item-modify-input">
                  <input type="password" placeholder="输入新密码" v-model="modifyLoginPwd.newPassword">
                </el-form-item>
                <el-form-item prop="password" class="safety-pane-item-modify-input">
                  <input type="password" placeholder="再次输入新密码" v-model="modifyLoginPwd.newPassword2">
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <input placeholder="输入验证码" v-model="modifyLoginPwd.emailCode">
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="username1"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyLoginPwd', 'modifyPwdHandler')">确认修改</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="modifyNum === 2" class="safety-pane-item-modify-con modify-tx-pwd">
              <el-form :model="modifyTxPwd" :rules="rules" ref="modifyTxPwd">
                <el-form-item prop="transactionPassword" class="safety-pane-item-modify-input">
                  <input type="password" placeholder="输入新密码" v-model="modifyTxPwd.transactionPassword">
                </el-form-item>
                <el-form-item prop="transactionPassword2" class="safety-pane-item-modify-input">
                  <input type="password" placeholder="再次输入新密码" v-model="modifyTxPwd.transactionPassword2">
                </el-form-item>
                <el-form-item prop="emailCode" class="safety-pane-item-modify-input">
                  <el-col :span="12">
                    <input placeholder="输入验证码" v-model="modifyTxPwd.emailCode">
                  </el-col>
                  <el-col :span="12" style="text-align: center;line-height: 45px;">
                    <count-down :username="username1"></count-down>
                  </el-col>
                </el-form-item>
                <el-form-item prop="name" class="safety-pane-item-modify-btn">
                  <span class="color-btn color-btn2"
                        @click="modifyEmailSub('modifyTxPwd', 'modifyTxHandler')">确认修改</span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import {mapGetters} from 'vuex';
  import {isEmail, isPassword} from '../../utils/validate.js';
  import countDown from '../../components/countdown';
  import { removeToken } from '@/utils/auth';
  export default {
    name: 'safety',
    watch: {
      '$route.query.type': 'changeList'
    },
    components: {
      'count-down': countDown
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
          if (value === this.modifyLoginPwd.newPassword2) {
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
          if (value === this.modifyTxPwd.transactionPassword) {
            callback();
          } else {
            callback(new Error('交易密码两次输入不一致！'));
          }
        }
      };
      return {
        username1: JSON.parse(window.sessionStorage.getItem('user')).username,
        rules: {
          email: [{required: true, trigger: 'blur', validator: validateEmail}],
          emailCode: [{required: true, message: '请输入验证码！', trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          password2: [{required: true, trigger: 'blur', validator: validatePassword2}],
          transactionPassword2: [{required: true, trigger: 'blur', validator: validatePassword4}],
          transactionPassword: [{required: true, min: 6, trigger: 'blur', validator: validatePassword3}]
        },
        fundsNum: 0,
        fundsList: [
          {
            name: '余额',
            route: '/safety/fundsTable'
          },
          {
            name: '充提历史',
            route: '/safety/ctHistory'
          }
        ],
        orderNum: 0,
        orderList: [
          {
            name: '所有',
            value: ''
          },
          {
            name: '已结束',
            value: '2'
          },
          {
            name: '正在进行',
            value: '1'
          }
        ],
        modifyNum: 0,
        modifyList: [
          {
            name: '更改邮箱'
          },
          {
            name: '登录密码修改'
          },
          {
            name: '交易密码修改'
          }
        ],
        listName: [
          {
            name: '资金管理'
          },
          {
            name: '订单管理'
          },
          {
            name: '账户安全'
          }
        ],
        listNum: 0,
        modifyEmailFrom: {
          email: '',
          emailCode: ''
        },
        modifyLoginPwd: {
          password: '',
          newPassword: '',
          newPassword2: '',
          emailCode: ''
        },
        modifyTxPwd: {
          transactionPassword: '',
          transactionPassword2: '',
          emailCode: ''
        },
        verificationImg: '',
        orderLoading: false,
        pageNum: 1,
        orderState: ''
      };
    },
    mounted() {
      this.listNum = this.$route.query.type;
      this.orderHandler('pageNum=1&pageSize=10&orderBy=created_at');
    },
    computed: {
      ...mapGetters({
        orderLists: 'orderList'
      })
    },
    methods: {
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
            this.$store.dispatch(type, this[name]).then(() => {
              this.$message.success('修改成功');
              this.$refs[name].resetFields();
              this.logout();
            }).catch((err) => {
              this.$message.error(err);
            });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      createCode() {
        this.verificationImg = window.urlData.url + '/account/validate/image?t=' + Date.parse(new Date());
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
        this.orderHandler(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at&status=${v}`);
      },
      handleCurrentChange(v) {
        this.orderHandler(`pageNum=${v}&pageSize=10&orderBy=created_at&status=${this.orderState}`);
      },
      logout() {
        window.sessionStorage.clear();
        removeToken();
        this.$router.replace({path: '/home'});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index..styl"
</style>

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
            <span class="color-btn" v-for="(v, k) in fundsList" :key="k" :class="fundsNum === k ? 'selected-btn' : ''"
                  @click="fundsNum = k">{{v.name}}</span>
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
                  @click="orderNum = k">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-right">
            <el-table
              :data="orderData"
              style="width: 100%">
              <el-table-column
                prop="order"
                label="订单号"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="funds"
                label="购买金额"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="total"
                label="购买数量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="state"
                label="项目状态"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="isIssued"
                label="是否发币"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show="listNum == 2" class="safety-pane-item">
          <div class="safety-pane-item-left">
            <span :class="modifyNum === k ? 'selected-btn' : ''" @click="modifyNum = k" class="color-btn"
                  v-for="(v, k) in modifyList" :key="k">{{v.name}}</span>
          </div>
          <div class="safety-pane-item-modify">
            <div v-show="modifyNum === 0" class="safety-pane-item-modify-con modify-email">
              <el-form :model="modifyEmailFrom" :rules="rules" ref="modifyEmailFrom" class="demo-ruleForm">
                <el-form-item  prop="name" class="safety-pane-item-modify-input">
                  <el-input placeholder="输入新邮箱" v-model="modifyEmailFrom.email"></el-input>
                </el-form-item>
              </el-form>

              <div class="safety-pane-item-modify-input">
                <input v-model="modifyEmailFrom.emailCode" placeholder="输入验证码" type="text" style="width:200px;margin-right:30px;">
                <el-button type="text" @click="modifyEmailHandler">获取验证码</el-button>
              </div>
              <div class="safety-pane-item-modify-btn">
                <span class="color-btn color-btn2">确认修改</span>
              </div>
            </div>
            <div v-show="modifyNum === 1" class="safety-pane-item-modify-con modify-login-pwd">
              <div class="safety-pane-item-modify-input">
                <input placeholder="输入旧密码" type="password">
              </div>
              <div class="safety-pane-item-modify-input">
                <input placeholder="输入新密码" type="password">
              </div>
              <div class="safety-pane-item-modify-input">
                <input placeholder="再次输入新密码" type="password">
              </div>
              <div class="safety-pane-item-modify-input">
                <input placeholder="输入验证码" type="text" style="width:200px;margin-right:30px;">
                <el-button type="text">获取验证码</el-button>
              </div>
              <div class="safety-pane-item-modify-btn">
                <span class="color-btn color-btn2">确认修改</span>
              </div>
            </div>
            <div v-show="modifyNum === 2" class="safety-pane-item-modify-con modify-tx-pwd">
              <div class="safety-pane-item-modify-input">
                <input placeholder="输入新密码" type="password">
              </div>
              <div class="safety-pane-item-modify-input">
                <input placeholder="再次输入新密码" type="password">
              </div>
              <div class="safety-pane-item-modify-input">
                <input placeholder="输入验证码" type="text" style="width:200px;margin-right:30px;">
                <el-button type="text">获取验证码</el-button>
              </div>
              <div class="safety-pane-item-modify-btn">
                <span class="color-btn color-btn2">确认修改</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'safety',
    watch: {
      '$route.query.type': 'changeList'
    },
    data() {
      return {
        rules: {},
        fundsNum: 0,
        fundsList: [
          {
            name: '余额'
          },
          {
            name: '充提历史'
          }
        ],
        orderNum: 0,
        orderList: [
          {
            name: '所有'
          },
          {
            name: '已结束'
          },
          {
            name: '正在进行'
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
        orderData: [
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          },
          {
            order: '1233123123',
            time: '12314672.00',
            name: '冬瓜',
            funds: '6734',
            total: '56678567',
            state: '4',
            isIssued: '1'
          }
        ],
        modifyEmailFrom: {
          email: '',
          emailCode: ''
        }
      };
    },
    mounted() {
      this.listNum = this.$route.query.type;
    },
    methods: {
      changeList(t) {
        this.listNum = t;
      },
      modifyEmailHandler() {
        console.log(this.modifyEmailFrom);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index..styl"
</style>

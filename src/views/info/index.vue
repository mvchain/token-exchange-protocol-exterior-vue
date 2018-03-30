<template>
  <div class="info-con">
    <div class="info-container" v-loading="infoLoading">
      <div class="info-container-body">
        <div class="info-container-title">
          <div>
            <span class="color-btn color-btn2" @click="$router.back()"><i class="el-icon-arrow-left"></i>返回上一级</span>
          </div>
          <div>
            <span class="color-btn" @click="getOtherInfo($route.query.idx, true)">上一个</span>
            <span class="color-btn" @click="getOtherInfo($route.query.idx, false)">下一个</span>
          </div>
        </div>
        <div class="info-container-middle">
          <div>
            <i class="info-working">{{projectInfo.status === 0 ? '即将开始' : projectInfo.status === 1?'进行中':'已结束'}}</i>
            <b class="info-participate" v-show="projectInfo.partake">
              <img src="../../assets/img/participate.png">
            </b>
            <div class="info-big-img">
              <img :src="projectInfo.projectImageAddress">
            </div>
            <div class="info-right">
              <div>
                <span>{{projectInfo.tokenName}}</span>
                <span>项目开始：{{projectInfo.startTime}}</span>
              </div>
              <el-progress :percentage="projectInfo | percentageFilter"
                           :stroke-width="20"></el-progress>
              <ul>
                <li>目标</li>
                <li><span>{{projectInfo.soldEth}}/{{projectInfo.ethNumber}}ETH</span></li>
                <li>支持者</li>
                <li><span>{{projectInfo.buyerNum}}</span></li>
                <li>剩余时间</li>
                <li><span>{{Date.parse(projectInfo.stopTime)-Date.parse(timeTxt) |
                changeTimeStamp}}</span></li>
              </ul>
              <div class="info-now">
                <span disabled class="color-btn color-btn2"
                      @click="participateHandler(projectInfo.status === 1)">立即参与</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img :src="projectInfo.leaderImageAddress" alt="">
            </div>
            <p class="info-people">{{projectInfo.leaderName}}</p>
            <p class="info-people">{{projectInfo.position}}</p>
            <p>{{projectInfo.description}}</p>
          </div>
        </div>
        <div class="info-container-bottom">
          <div>
            <div class="info-container-bottom-title">项目详情</div>
            <div class="info-container-bottom-des">
              <img :src="projectInfo.projectCoverAddress" alt="">
            </div>
          </div>
          <div>
            <ul>
              <li><span>兑换比例</span></li>
              <li><span>1ETH={{projectInfo.ratio}}{{projectInfo.tokenName}}</span></li>
              <li><a target="_blank" class="color-btn color-btn2" :href="projectInfo.whitePaperAddress">白皮书下载</a></li>
              <li><span>项目官网</span></li>
              <li><a target="_blank" :href="projectInfo.homepage">{{projectInfo.homepage}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <foot-view></foot-view>
    <el-dialog
      width="543px"
      height="418px"
      top="25vh"
      custom-class="info-dialog"
      :close-on-click-modal="false"
      center
      :visible.sync="dialogTableVisible">
      <div class="dialog-title">参与购买</div>
      <div class="dialog-label">
        <ul>
          <li>ETH余额：</li>
          <li>购买金额：</li>
          <li>获得代币数量：</li>
        </ul>
      </div>
      <div class="dialog-context">
        <ul>
          <li>{{transactionProObj.ethBalance||'0'}}ETH</li>
          <li style="position: relative">
            <input @change="fundsHandler" v-model="purchaseVal" type="text">
            <span>ETH</span>
            <span class="info-prompt">最小购买金额为0.1ETH</span>
          </li>
          <li>{{purchaseVal * transactionProObj.ratio}}</li>
        </ul>
      </div>
      <div class="dialog-submit">
        <span class="color-btn2 color-btn" @click="configPurchase">确认购买</span>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="543px"
      :show-close="false"
      top="35vh"
      custom-class="dialog-confirm"
      center
    >
      <p class="dialog-confirm-title">确认是否支付{{purchaseVal}}ETH</p>
      <el-input placeholder="请输入内容" type="password" v-model="txPassword">
        <template slot="prepend">输入交易密码：</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn"
                   @click="confirmPay(purchaseVal)">是</el-button>
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn"
                   @click="dialogVisible = false">否</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { cryptoFun } from '../../utils/index';
  import foot from '../../components/foot';
  import {mapGetters} from 'vuex';

  export default {
    name: 'info',
    components: {
      'foot-view': foot
    },
    data() {
      return {
        purchaseVal: '',
        txPassword: '',
        infoLoading: false,
        dialogTableVisible: false,
        dialogVisible: false
      };
    },
    mounted() {
      this.getTimeFun();
      this.getProjectInfo(this.$route.query.id, this.$route.query.idx);
      this.$store.dispatch('getProjectList', `pageNum=1&pageSize=1000&orderBy=created_at`).then(() => {
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    computed: {
      ...mapGetters({
        projectInfo: 'projectInfo',
        projectList: 'projectList',
        transactionProObj: 'transactionProObj',
        timeTxt: 'timeTxt'
      })
    },
    methods: {
      confirmPay(val) {
        let payInfo = {
          ethNumber: val,
          projectId: this.projectInfo.id,
          transactionPassword: cryptoFun(this.txPassword.replace(/\s/ig, ''))
        };
        let _val = payInfo.ethNumber.replace(/\s/ig, '');
        let _pwd = payInfo.transactionPassword;
        if (!_pwd) {
          this.$message.error('请输入交易密码');
          return;
        }
        if (!_val) {
          this.$message.error('请输入购买金额');
          return;
        } else if (Number(_val) > this.transactionProObj.ethBalance) {
          this.$message.error('购买金额不能超过项目余额');
          return;
        }
        this.$store.dispatch('getTransaction', payInfo).then(() => {
          this.dialogVisible = false;
          this.dialogTableVisible = false;
          this.purchaseVal = '';
          this.$message.success('购买成功');
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      configPurchase() {
        if (this.purchaseVal < (this.projectInfo.ethNumber - this.projectInfo.soldEth)) {
          this.dialogVisible = true;
        } else if (isNaN(this.purchaseVal)) {
          this.$message.error('请输入正确金额');
        } else {
          this.$message.error('项目ETH超额');
        }
      },
      participateHandler(bool) {
        if (!window.sessionStorage.getItem('user')) {
          this.$message.error('请登录后操作');
          return;
        }
        if (!bool) return;
        this.dialogTableVisible = true;
        this.$store.dispatch('getTransactionPro', this.projectInfo.id).then(() => {
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      getProjectInfo(id, idx) {
        this.infoLoading = true;
        this.$store.dispatch('getProjectInfo', id).then(() => {
          this.$route.query.id = this.projectInfo.id;
          this.$route.query.idx = idx;
          this.infoLoading = false;
        }).catch((err) => {
          this.$message.error(err);
          this.infoLoading = false;
        });
      },
      getOtherInfo(idx, type) {
        idx = parseInt(idx);
        if (type) {
          this.getProjectInfo(this.projectList.list[idx === 0 ? 0 : idx - 1].id, idx === 0 ? 0 : idx - 1);
        } else {
          this.getProjectInfo(this.projectList.list[idx >= this.projectList.list.length - 1 ? idx : idx + 1].id, idx >= this.projectList.list.length - 1 ? idx : idx + 1);
        }
      },
      fundsHandler() {
        this.purchaseVal = Number(this.purchaseVal).toFixed(1);
      },
      getTimeFun() {
        this.$store.dispatch('getTimeHandler').then((res) => {
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl";
</style>

<template>
  <div class="info-con">
    <div class="info-container" v-loading="infoLoading">
      <div class="info-container-body">
        <div class="info-container-title">
          <div>
            <span class="color-btn color-btn2" @click="$router.back()"><i class="el-icon-arrow-left"></i>{{languageVal.BACK}}</span>
          </div>
          <div>
            <span :disabled =  preFlag :class="!preFlag && 'btn-opcity'" class="color-btn" @click="getOtherInfo(true)">{{languageVal.PREV}}</span>
            <span :disabled =  nextFlag :class="!nextFlag && 'btn-opcity'" class="color-btn" @click="getOtherInfo( false)">{{languageVal.NEXT}}</span>
          </div>
        </div>
        <div class="info-container-middle">
          <div>
            <i class="info-working">{{projectInfo.status === 0 ? (languageVal.COMINGSOON) : projectInfo.status === 1 ? (languageVal.INPROGRESS) : (languageVal.over)}}</i>
            <b class="info-participate" v-show="projectInfo.partake">
              <img :src="languageVal.copy == 'Copy'?join:joinC" alt="">
            </b>
            <div class="info-big-img">
              <img :src="projectInfo.projectCoverAddress">
            </div>
            <div class="info-right">
              <div>
                <span>{{projectInfo.title}}</span>
              </div>
              <el-progress :percentage="projectInfo | percentageFilter"
                           :stroke-width="20"></el-progress>
              <div style="margin-top:10px;"> <span style="font-weight: 900;color:#999;">{{languageVal.StartTime}}：{{projectInfo.startTime}}</span></div>
              <ul>
                <li style="color:#999;font-weight:900;">{{languageVal.Target}}</li>
                <li><span>{{projectInfo.soldEth}}/{{projectInfo.ethNumber}}ETH</span></li>
                <li style="color:#999;font-weight:900;">{{languageVal.PARTICIPANTS}}</li>
                <li><span>{{projectInfo.buyerNum}}</span></li>
                <li style="color:#999;font-weight:900;" >{{languageVal.TIMEREMAINING}}</li>
                <li>
                  <span v-show="projectInfo.status === 1">{{Date.parse(projectInfo.stopTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}</span>
                  <span v-show="projectInfo.status === 0">{{Date.parse(projectInfo.startTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}</span>
                  <span v-show="projectInfo.status === 2 && projectInfo.soldEth === projectInfo.ethNumber">{{languageVal.DONE}}！</span>
                  <span v-show="projectInfo.status === 2 && projectInfo.soldEth !== projectInfo.ethNumber">{{languageVal.FAILED}}!</span>
                </li>
              </ul>
              <div class="info-now">
                <span v-show="projectInfo.status === 1" disabled class="color-btn color-btn2"
                      @click="participateHandler(projectInfo.status === 1)">{{languageVal.Participate}}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img :src="projectInfo.leaderImageAddress" alt="">
            </div>
            <p class="info-people" style="font-weight:900;font-size:18px;margin-top:24px;">{{projectInfo.leaderName}}</p>
            <p class="info-people" >{{projectInfo.position}}</p>
            <p style="height:165px;overflow:auto;color:#999;font-size:14px;">{{projectInfo.description}}</p>
          </div>
        </div>
        <div class="info-container-bottom">
          <div>
            <div class="info-container-bottom-title">{{languageVal.ProjectDetails}}</div>
            <div class="info-container-bottom-des">
              <img :src="projectInfo.projectImageAddress" alt="">
            </div>
          </div>
          <div>
            <ul>
              <li><span style="color:#999;">{{languageVal.RATE}}</span></li>
              <li v-if="isLogin"><span style="font-weight:900;font-size:18px;">1ETH={{projectInfo.ratio}}{{projectInfo.tokenName}}</span></li>
              <li v-else>{{languageVal.proportion}}</li>
              <li><span style="color:#999; font-weight: 900">{{languageVal.WhiterPaper}}</span></li>
              <li><a target="_blank" class="color-btn color-btn2" :href="projectInfo.whitePaperAddress">{{languageVal.Download}}</a></li>
              <li><span style="color:#999;">{{languageVal.Website}}</span></li>
              <li><a target="_blank" :href="projectInfo.homepage">{{projectInfo.homepage&&projectInfo.homepage.replace(/(https:\/\/www.)|(http:\/\/www.)/ig, '')}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <foot-view></foot-view>
    <el-dialog
      custom-class="info-dialog"
      :close-on-click-modal="false"
      center
      :visible.sync="dialogTableVisible">
      <div class="dialog-title">{{languageVal.ParticipateBuy}}</div>
      <div class="dialog-label">
        <ul>
          <li>ETH{{languageVal.Balance}}：</li>
          <li>{{languageVal.buyAmount}}：</li>
          <li>{{languageVal.Gettokenamount}}：</li>
        </ul>
      </div>
      <div class="dialog-context">
        <ul>
          <li>{{transactionProObj.ethBalance||'0'}}ETH</li>
          <li style="position: relative">
            <input @change="fundsHandler" v-model="purchaseVal" type="text">
            <span>ETH</span>
            <span class="info-prompt">{{languageVal.theminimum}}0.1ETH</span>
          </li>
          <li>{{purchaseVal * transactionProObj.ratio}}</li>
        </ul>
      </div>
      <div class="dialog-submit">
        <span class="color-btn2 color-btn" @click="configPurchase">{{languageVal.ConfirmPayment}}</span>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      custom-class="dialog-confirm"
      center
    >
      <p class="dialog-confirm-title">{{languageVal.payNow}}{{purchaseVal}}ETH</p>
      <el-input placeholder="请输入内容" type="password" v-model="txPassword">
        <template slot="prepend">{{languageVal.Entertransactionpassword}}</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn" :disabled="!dialogVisible"
                   @click="confirmPay(purchaseVal)">{{languageVal.yep}}</el-button>
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn"
                   @click="dialogVisible = false">{{languageVal.noyep}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { cryptoFun } from '../../utils/index';
  import foot from '../../components/foot';
  import {mapGetters} from 'vuex';
  import joinC from '@/assets/img/participate.png';
  import join from '@/assets/img/JOINED.png';
  import { getToken2 } from '@/utils/auth';
  export default {
    name: 'info',
    components: {
      'foot-view': foot
    },
    data() {
      return {
        join: join,
        joinC: joinC,
        purchaseVal: '',
        txPassword: '',
        infoLoading: false,
        dialogTableVisible: false,
        dialogVisible: false,
        preFlag: false,
        nextFlag: false,
        idxNum: 0,
        isLogin: getToken2()
      };
    },
    mounted() {
      this.getTimeFun();
      this.$store.dispatch('getProjectList', `pageNum=1&pageSize=1000&orderBy=created_at desc`).then(() => {
        this.getListIdx(parseInt(this.$route.query.id));
        this.getProjectInfo(this.$route.query.id);
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    computed: {
      ...mapGetters({
        projectInfo: 'projectInfo',
        projectList: 'projectList',
        transactionProObj: 'transactionProObj',
        timeTxt: 'timeTxt',
        languageVal: 'languageVal'
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
          this.$message.error(this.languageVal.Pleaseenterthetransactionpassword);
          return;
        }
        if (!_val) {
          this.$message.error(this.languageVal.enterPurchase);
          return;
        } else if (Number(_val) > this.transactionProObj.ethBalance) {
          this.$message.error(this.languageVal.cannotBalance);
          return;
        }
        this.dialogVisible = false;
        this.$store.dispatch('getTransaction', payInfo).then(() => {
          this.dialogTableVisible = false;
          this.purchaseVal = '';
          this.txPassword = '';
          this.$message.success(this.languageVal.successfulPurchase);
          this.getProjectInfo(this.$route.query.id);
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      configPurchase() {
        if (parseFloat(this.purchaseVal) <= (this.projectInfo.ethNumber - this.projectInfo.soldEth).toFixed(1)) {
          this.dialogVisible = true;
        } else if (isNaN(this.purchaseVal)) {
          this.$message.error(this.languageVal.correctAmount);
        } else {
          this.$message.error(this.languageVal.ETHExcess);
        }
      },
      participateHandler(bool) {
        if (!getToken2()) {
          this.$message.error(this.languageVal.loginOperate);
          return;
        }
        if (!bool) return;
        this.dialogTableVisible = true;
        this.$store.dispatch('getTransactionPro', this.projectInfo.id).then(() => {
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      getProjectInfo(id) {
        this.infoLoading = true;
        this.$store.dispatch('getProjectInfo', id).then(() => {
          this.infoLoading = false;
          this.preFlag = this.idxNum !== 0;
          this.nextFlag = (this.idxNum !== this.projectList.list.length - 1);
        }).catch((err) => {
          this.$message.error(err);
          this.infoLoading = false;
        });
      },
      getOtherInfo(type) {
        if (type) {
          if (this.idxNum === 0) return;
          this.idxNum --;
        } else {
          if (this.idxNum === this.projectList.list.length - 1) return;
          this.idxNum ++;
        }
        this.getProjectInfo(this.projectList.list[this.idxNum].id);
      },
      fundsHandler() {
        this.purchaseVal = Number(this.purchaseVal).toFixed(1);
      },
      getTimeFun() {
        this.$store.dispatch('getTimeHandler').then((res) => {
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      getListIdx(idx) {
        this.projectList.list.forEach((v, k) => {
          (v.id === idx) && (this.idxNum = k);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./index.styl";
</style>

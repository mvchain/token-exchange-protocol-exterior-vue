<template>
  <div class="list-container-con">
    <div class="list-container">
      <div class="list-container-title">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(v, k) in navList" :key="k">
            <span :class="navNum===k?'list-select':''" @click="navEnterHandler(v.value,k)">{{v.title}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="list-container-con">
        <div class="project-pane" v-loading="listLoading">
          <div :class="k%2==0?'project-pane-item-d':'project-pane-item-s'" @mouseenter="itemHandler(k+1)"
               v-for="(v, k) in projectList.list" :key="k" @mouseleave="itemLeave" @click="changeInfo(v.id,k)"
               class="project-pane-item">
            <transition name="el-fade-in-linear">
              <div v-show="layerNum === k+1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">{{v.status === 0 ? languageVal.COMINGSOON : v.status === 1 ? languageVal.INPROGRESS : languageVal.over}}</i>
            <b class="project-participate" v-show="v.partake">
              <img :src="languageVal.copy == 'Copy'?join:joinC" alt="">
            </b>
            <div class="project-bigImg">
              <img :src="v.projectCoverAddress" :alt="v.tokenName">
            </div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>{{v.title}}</span>
              </p>
              <el-progress :percentage="v | percentageFilter" :stroke-width="20"></el-progress>
              <div class="modify528"><i v-show="v.status===0">{{languageVal.Target}}：{{v.ethNumber}}{{v.coin}}</i></div>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.soldEth}}/{{v.ethNumber}}{{v.coin}}</span>
                <span>{{v.buyerNum}}{{languageVal.peopleinvolved}}</span>
              </div>
              <p style="color:#999;" v-show="v.status===2" class="project-pane-item-over modify529">
                {{v.soldEth >= v.ethNumber? (languageVal.DONE):(languageVal.FAILED)}}
              </p>
              <p v-show="v.status===0" class="project-pane-item-over">
                <span>{{languageVal.Countdown}}</span><br/>
                {{Date.parse(v.startTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}
              </p>

              <p v-show="v.status === 1" class="project-pane-item-day" style="line-height: 22px;">{{languageVal.TimeRemaining}}：<br/><span>{{Date.parse(v.stopTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}</span></p>
              <div v-show="v.status === 1" class="project-pane-item-time">{{languageVal.Timetable}}：
                <p class="project-time-txt">
                  {{v.stopTime | timeDown}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="block" style="text-align: center">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="projectList.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  import {mapGetters} from 'vuex';
  import joinC from '@/assets/img/participate.png';
  import join from '@/assets/img/JOINED.png';
  export default {
    name: 'proList',
    watch: {
      'languageVal': 'languageValHandler'
    },
    data() {
      return {
        join: join,
        joinC: joinC,
        maskLayer: false,
        listLoading: false,
        layerNum: 0,
        navNum: 0,
        navList: [
          {
            title: '',
            value: ''
          },
          {
            title: '',
            value: '1'
          },
          {
            title: '',
            value: '0'
          },
          {
            title: '',
            value: '2'
          }
        ],
        pageNum: 1,
        pageSize: 10
      };
    },
    mounted() {
      this.getTimeFun();
      this.getProList(`pageNum=${this.pageNum}&pageSize=${this.pageSize}&orderBy=created_at desc`);
      this.languageValHandler(this.languageVal);
    },
    computed: {
      ...mapGetters({
        projectList: 'projectList',
        timeTxt: 'timeTxt',
        languageVal: 'languageVal'
      })
    },
    methods: {
      languageValHandler(a) {
        this.navList[0].title = a.ALLPROJECTS;
        this.navList[1].title = a.INPROGRESS;
        this.navList[2].title = a.COMINGSOON;
        this.navList[3].title = a.over;
      },
      itemHandler(k) {
        this.layerNum = k;
        this.maskLayer = true;
      },
      itemLeave() {
        this.maskLayer = false;
      },
      getTimeFun() {
        this.$store.dispatch('getTimeHandler').then((res) => {
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      navEnterHandler(k, key) {
        this.navNum = key;
        this.getProList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&status=${k || ''}`);
      },
      getProList(str) {
        this.listLoading = true;
        this.$store.dispatch('getProjectList', str).then(() => {
          this.listLoading = false;
        }).catch((err) => {
          this.$message.error(err);
          this.listLoading = false;
        });
      },
      changeInfo(id, k) {
        this.$router.push({
          path: 'info',
          query: {id: id, idx: k}
        });
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getProList(`pageNum=${this.pageNum}&pageSize=10&orderBy=created_at desc&status=${this.navNum || ''}`);
      }
    },
    components: {
      'footer-com': foot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl"
</style>

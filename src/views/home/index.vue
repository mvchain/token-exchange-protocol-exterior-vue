<template>
  <div class="home-container pubBack">
    <div class="home-carousel">
      <div v-for="v in banner" :key="v.k" :style="{backgroundImage:'url(' + v.v + ')'}" :class="carouselNum === v.k ? 'banner-img-hover' : ''" class="home-carousel-div">
      </div>

      <div class="carousel-circle">
        <ul>
          <li :class="carouselNum==k?'banner-hover-icon':''" v-for="(v, k) in 3" @mouseenter="bannerHandler(k)"
              @mouseleave="enterFlag=true" :key="k"></li>
        </ul>
      </div>
    </div>
    <div class="project-bottom">
      <div class="project-list">
        <div class="project-title" style="line-height: 48px;">
          <div>{{languageVal.Projects}}</div>
          <div>
            <span @click="changeHelp('/proList')"
                  class="more-btn color-btn color-btn2">{{languageVal.MORE}}</span>
          </div>
        </div>


        <div v-loading="listLoading" v-if="paneNum==0" class="project-pane">
          <div v-if="k<4" :class="k%2==0?'project-pane-item-d':'project-pane-item-s'" @mouseenter="itemHandler(k+1)"
               v-for="(v, k) in projectList.list" :key="k" @mouseleave="itemLeave" @click="changeInfo(v.id, k)"
               class="project-pane-item">
            <transition name="el-fade-in-linear">
              <div v-show="layerNum === k+1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">{{v.status === 0 ? languageVal.COMINGSOON : v.status === 1? languageVal.INPROGRESS : languageVal.over}}</i>
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
              <div class="modify528"><i v-show="v.status===0">{{languageVal.Target}}：{{v.ethNumber}}ETH</i></div>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.soldEth}}/{{v.ethNumber}}ETH</span>
                <span>{{v.buyerNum}}{{languageVal.peopleinvolved}}</span>
              </div>
              <p style="color:#999;" v-show="v.status===2" class="project-pane-item-over modify529">
                {{v.soldEth >= v.ethNumber? (languageVal.DONE):(languageVal.FAILED)}}
              </p>
              <p v-show="v.status===0" class="project-pane-item-over" style="text-align: center;">
                <span>{{languageVal.Countdown}}</span><br/>
                {{Date.parse(v.startTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) | changeTimeStamp}}
              </p>

              <div v-show="v.status === 1" class="project-pane-item-day">{{languageVal.TimeRemaining}}：<p class="project-time-txt">{{Date.parse(v.stopTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}</p></div>
              <div v-show="v.status === 1" class="project-pane-item-time">{{languageVal.Timetable}}：
                <p class="project-time-txt">
                  {{v.stopTime | timeDown}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-loading="listLoading" v-if="paneNum==1" class="project-pane">
          <div v-if="k>=4" :class="k%2==0?'project-pane-item-d':''" @mouseenter="itemHandler(k+1)"
               v-for="(v, k) in projectList.list" :key="k" @mouseleave="itemLeave" @click="changeInfo(v.id, k)"
               class="project-pane-item">
            <transition name="el-fade-in-linear">
              <div v-show="layerNum === k+1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">{{v.status === 0 ? (languageVal.COMINGSOON) : v.status === 1?(languageVal.INPROGRESS):(languageVal.over)}}</i>
            <b class="project-participate">
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
              <div class="modify528"><i v-show="v.status===0">{{languageVal.Target}}：{{v.ethNumber}}ETH</i></div>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.soldEth}}/{{v.ethNumber}}ETH</span>
                <span>{{v.buyerNum}}{{languageVal.peopleinvolved}}</span>
              </div>
              <p style="color:#999;" v-show="v.status===2" class="project-pane-item-over modify529">{{v.soldEth >=
                v.ethNumber? (languageVal.DONE):(languageVal.FAILED)}}</p>
              <p v-show="v.status===0" class="project-pane-item-over">{{Date.parse(v.startTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) | changeTimeStamp}}</p>
              <p class="project-pane-item-aims" v-show="v.status===0">
                <span>{{languageVal.Target}}：</span>
                <span>{{v.ethNumber}}ETH</span>
              </p>
              <p v-show="v.status === 1" class="project-pane-item-day" style="line-height: 22px;">{{languageVal.TimeRemaining}}：<br/><span>{{Date.parse(v.stopTime.replace(/\-/g, "/"))-Date.parse(timeTxt.replace(/\-/g, "/")) |
                changeTimeStamp}}</span> </p>
              <div v-show="v.status === 1" class="project-pane-item-time">{{languageVal.Timetable}}：
                <p class="project-time-txt">
                  {{v.startTime | timeDown}}--{{v.stopTime | timeDown}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="projectList.list&&projectList.list.length>4" class="project-pane-icon">
          <ul>
            <li :class="paneNum==k?'banner-hover-icon':''" v-for="(v, k) in 2" @click="paneHandler(k)" :key="k"></li>
          </ul>
        </div>
        <div class="project-common-problem">
          <div class="project-common-problem-title">{{languageVal.FrequentlyAskedQuestions}}</div>
          <div class="project-common-problem-list">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :title="languageVal.Questions1" name="1">
                <div>{{languageVal.Answer1}}</div>
              </el-collapse-item>
              <el-collapse-item :title="languageVal.Questions2" name="2">
                <div>{{languageVal.Answer2}}</div>
              </el-collapse-item>
              <el-collapse-item :title="languageVal.Questions3" name="3">
                <div>{{languageVal.Answer3}}</div>
              </el-collapse-item>
              <el-collapse-item :title="languageVal.Questions4" name="4">
                <div>{{languageVal.Answer4}}</div>
              </el-collapse-item>
              <el-collapse-item :title="languageVal.Questions5"  name="5">
                <div>{{languageVal.Answer5}}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="project-common-problem-more">
            <span @click="changeHelp('/help')" class="color-btn color-btn2 more-btn"
                  >{{languageVal.LearnMore}}</span>
          </div>
        </div>
        <div class="project-common-problem-1 mobile-style">
          <div class="project-common-problem-1-title">{{languageVal.FrequentlyAskedQuestions}}</div>
          <div class="project-common-problem-1-main">
            <div class="project-common-problem-1-main-item">
              <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions1}}</h2>
              <div class="project-common-problem-1-main-item-content">{{languageVal.Answer1}}</div>
            </div>
            <div class="project-common-problem-1-main-item">
              <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions2}}</h2>
              <div class="project-common-problem-1-main-item-content">{{languageVal.Answer2}}</div>
            </div>
            <div class="project-common-problem-1-main-item">
              <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions3}}</h2>
              <div class="project-common-problem-1-main-item-content">{{languageVal.Answer3}}</div>
            </div>
            <div class="project-common-problem-1-main-item">
              <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions4}}</h2>
              <div class="project-common-problem-1-main-item-content">{{languageVal.Answer4}}</div>
            </div>
            <div class="project-common-problem-1-main-item">
              <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions5}}</h2>
              <div class="project-common-problem-1-main-item-content">{{languageVal.Answer5}}</div>
            </div>
          </div>
          <div class="project-common-problem-1-footer">
            <span @click="changeHelp('/help')" class="color-btn color-btn2 more-btn"
            >{{languageVal.LearnMore}}</span>
          </div>
        </div>
      </div>
      <artisan-footer></artisan-footer>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import b1 from '@/assets/img/Big-background1.jpg';
  import footer from '@/components/foot.vue';
  import BackToTop from '@/components/toTop.vue';
  import joinC from '@/assets/img/participate.png';
  import join from '@/assets/img/JOINED.png';
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        join: join,
        joinC: joinC,
        listLoading: false,
        maskLayer: false,
        ewmFlag: false,
        layerNum: 0,
        activeNames: ['0'],
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'line-height': '45px',
          background: '#d9d9d9'
        },
        banner: [
          {
            k: 0,
            v: b1
          },
          {
            k: 1,
            v: b1
          },
          {
            k: 2,
            v: b1
          }
        ],
        carouselNum: 0,
        paneNum: 0,
        carouselInterval: null,
        enterFlag: true
      };
    },
    mounted: function () {
      this.getTimeFun();
      this.getProList(`pageNum=1&pageSize=8&orderBy=created_at desc`);
      this.carouselInterval = setInterval(() => {
        if (this.enterFlag) {
          this.carouselNum++;
          if (this.carouselNum > 2) {
            this.carouselNum = 0;
          }
        }
      }, 3000);
    },
    components: {
      'artisan-footer': footer,
      'back-to-top': BackToTop
    },
    computed: {
      ...mapGetters({
        projectList: 'projectList',
        timeTxt: 'timeTxt',
        languageVal: 'languageVal'
      })
    },
    methods: {
      bannerHandler(k) {
        this.carouselNum = k;
        this.enterFlag = false;
      },
      paneHandler(k) {
        this.paneNum = k;
      },
      handleChange(val) {
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
      changeHelp(path) {
        this.$router.push({path: path});
      },
      changeInfo(id, k) {
        this.$router.push({path: 'info', query: {id: id, idx: k}});
      },
      getProList(str) {
        this.listLoading = true;
        this.$store.dispatch('getProjectList', str).then(() => {
          this.listLoading = false;
        }).catch((err) => {
          this.$message.error(err);
          this.listLoading = false;
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './index.styl';
  @import '../layout/navBar.styl'
</style>

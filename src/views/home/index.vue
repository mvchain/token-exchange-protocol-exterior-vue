<template>
  <div class="home-container pubBack">
    <div class="home-carousel">
      <div v-for="v in banner" :key="v.k">
        <img :class="carouselNum === v.k ? 'banner-img-hover' : ''" class="banner-img" :src="v.v" alt="轮播图">
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
        <div class="project-title">
          <div>项目列表</div>
          <div>
            <span @click="changeHelp('/proList')" style=" width:150px;height:48px;"
                  class="color-btn color-btn2">更多项目</span>
          </div>
        </div>


        <div v-loading="listLoading" v-if="paneNum==0" class="project-pane">
          <div v-if="k<4" :class="k%2==0?'project-pane-item-d':''" @mouseenter="itemHandler(k+1)"
               v-for="(v, k) in projectList.list" :key="k" @mouseleave="itemLeave" @click="changeInfo(v.id, k)"
               class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === k+1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">{{v.status === 0 ? '即将开始' : v.status === 1?'进行中':'已结束'}}</i>
            <b class="project-participate" v-show="v.partake">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">
              <img :src="v.projectImageAddress" :alt="v.tokenName">
            </div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>{{v.tokenName}}</span>
              </p>
              <el-progress :percentage="v.soldEth/v.ethNumber * 100" :stroke-width="20"></el-progress>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.buyerNum}}人投</span>
                <span>{{v.soldEth}}/{{v.ethNumber}}ETH</span>
              </div>
              <p v-show="v.status===2&&Date.parse(v.stopTime) < Date.now()" class="project-pane-item-over">{{v.soldEth >=
                v.ethNumber? '圆满结束':'未完成'}}</p>
              <p v-show="v.status===0" class="project-pane-item-over">{{Date.parse(v.startTime)-Date.now() | changeTimeStamp}}</p>
              <p class="project-pane-item-aims" v-show="v.status===0">
                <span>目标：</span>
                <span>{{v.ethNumber}}ETH</span>
              </p>
              <p v-show="v.status === 1" class="project-pane-item-day">剩余时间：<span>{{Date.parse(v.startTime)-Date.now() |
                changeTimeStamp}}</span></p>
              <p v-show="v.status === 1" class="project-pane-item-time">项目起止：{{v.startTime}}~{{v.stopTime}}</p>
            </div>
          </div>
        </div>
        <div v-loading="listLoading" v-if="paneNum==1" class="project-pane">
          <div v-if="k>=4" :class="k%2==0?'project-pane-item-d':''" @mouseenter="itemHandler(k+1)"
               v-for="(v, k) in projectList.list" :key="k" @mouseleave="itemLeave" @click="changeInfo(v.id, k)"
               class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === k+1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">{{v.status === 0 ? '即将开始' : v.status === 1?'进行中':'已结束'}}</i>
            <b class="project-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">
              <img :src="v.projectImageAddress" :alt="v.tokenName">
            </div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>{{v.tokenName}}</span>
              </p>
              <el-progress :percentage="v.soldEth/v.ethNumber * 100" :stroke-width="20"></el-progress>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.buyerNum}}人投</span>
                <span>{{v.soldEth}}/{{v.ethNumber}}ETH</span>
              </div>
              <p v-show="v.status===2&&Date.parse(v.stopTime) < Date.now()" class="project-pane-item-over">{{v.soldEth >=
                v.ethNumber? '圆满结束':'未完成'}}</p>
              <p v-show="v.status===0" class="project-pane-item-over">{{Date.parse(v.startTime)-Date.now() | changeTimeStamp}}</p>
              <p class="project-pane-item-aims" v-show="v.status===0">
                <span>目标：</span>
                <span>{{v.ethNumber}}ETH</span>
              </p>
              <p v-show="v.status === 1" class="project-pane-item-day">剩余时间：<span>16</span> 天</p>
              <p v-show="v.status === 1" class="project-pane-item-time">项目起止：{{v.startTime}}~{{v.stopTime}}</p>
            </div>
          </div>
        </div>
        <div v-show="projectList.list&&projectList.list.length>3" class="project-pane-icon">
          <ul>
            <li :class="paneNum==k?'banner-hover-icon':''" v-for="(v, k) in 2" @click="paneHandler(k)" :key="k"></li>
          </ul>
        </div>
        <div class="project-common-problem">
          <div class="project-common-problem-title">常见问题</div>
          <div class="project-common-problem-list">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <el-collapse-item title="如何购买代币，代币购买教程" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="项目如何进行投资，如何使收益最大化" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="三步让你成为投资大帅" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="项目如何进行投资，如何使投资人效益最大化" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
              <el-collapse-item title="三步让你成为投资大帅" name="5">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="project-common-problem-more">
            <span @click="changeHelp('/help')" class="color-btn color-btn2"
                  style=" width:150px;height:48px;">了解更多</span>
          </div>
        </div>
      </div>
      <div class="project-contact">
        <div class="project-contact-txt">联系方式</div>
        <div class="project-contact-icon">
          <ul>
            <li>
              <img src="../../assets/img/wx.png" alt="微信二维码" @mouseleave="ewmFlag=false" @mouseenter="ewmFlag=true">
              <transition name="el-fade-in-linear">
                <p v-show="ewmFlag" class="ewm-img">
                  <img src="../../assets/img/ewm.png" alt="">
                </p>
              </transition>
            </li>
            <li><img src="../../assets/img/fb.png" alt="facebook"></li>
            <li><img src="../../assets/img/tw.png" alt="推特"></li>
            <li><img src="../../assets/img/rb.png" alt="rb"></li>
          </ul>
        </div>
        <div class="project-contact-log">
          <div class=""></div>
          <div class="">Crugo, All rights reserved © 2018</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import b1 from '@/assets/img/Big-background1.png';
  import b2 from '@/assets/img/Big-background2.png';
  import b3 from '@/assets/img/Big-background3.png';
  import footer from '@/components/foot.vue';
  import BackToTop from '@/components/toTop.vue';
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        listLoading: false,
        maskLayer: false,
        ewmFlag: false,
        layerNum: 0,
        activeNames: ['1'],
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
            v: b2
          },
          {
            k: 2,
            v: b3
          }
        ],
        carouselNum: 0,
        paneNum: 0,
        carouselInterval: null,
        enterFlag: true
      };
    },
    mounted: function () {
      this.getProList(`pageNum=1&pageSize=8&orderBy=created_at`);
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
        projectList: 'projectList'
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

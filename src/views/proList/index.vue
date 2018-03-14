<template>
  <div class="list-container-con">
    <div class="list-container">
      <div class="list-container-title">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(v, k) in navList" :key="k">
            <span :class="navNum===k?'list-select':''" @click="navEnterHandler(k)">{{v.title}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="list-container-con">
        <div class="project-pane">
          <div @mouseenter="itemHandler(1)" @mouseleave="itemLeave" class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === 1 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">正在进行</i>
            <b class="project-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">大图</div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>ETHBTC</span>
              </p>
              <el-progress :percentage="100" :stroke-width="20"></el-progress>
              <div class="project-pane-number">
                <span>20人投</span>
                <span>400/500ETH</span>
              </div>
              <p class="project-pane-item-over">圆满完成</p>
              <p class="project-pane-item-aims">
                <span>目标：</span>
                <span>500ETH</span>
              </p>
              <p class="project-pane-item-day">剩余时间：<span>16</span>天</p>
              <p class="project-pane-item-time">项目起止：01/08~02/07</p>
            </div>
          </div>
          <div @mouseenter="itemHandler(2)" @mouseleave="itemLeave" class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === 2 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">正在进行</i>
            <b class="project-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">大图</div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>ETHBTC</span>
              </p>
              <el-progress :percentage="100" :stroke-width="20"></el-progress>
              <div class="project-pane-number">
                <span>20人投</span>
                <span>400/500ETH</span>
              </div>
              <p class="project-pane-item-over">圆满完成</p>
              <p class="project-pane-item-aims">
                <span>目标：</span>
                <span>500ETH</span>
              </p>
              <p class="project-pane-item-day">剩余时间：<span>16</span>天</p>
              <p class="project-pane-item-time">项目起止：01/08~02/07</p>
            </div>
          </div>
          <div @mouseenter="itemHandler(3)" @mouseleave="itemLeave" class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === 3 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">正在进行</i>
            <b class="project-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">大图</div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>ETHBTC</span>
              </p>
              <el-progress :percentage="100" :stroke-width="20"></el-progress>
              <div class="project-pane-number">
                <span>20人投</span>
                <span>400/500ETH</span>
              </div>
              <p class="project-pane-item-over">圆满完成</p>
              <p class="project-pane-item-aims">
                <span>目标：</span>
                <span>500ETH</span>
              </p>
              <p class="project-pane-item-day">剩余时间：<span>16</span>天</p>
              <p class="project-pane-item-time">项目起止：01/08~02/07</p>
            </div>
          </div>
          <div @mouseenter="itemHandler(4)" @mouseleave="itemLeave" class="project-pane-item">
            <transition name="el-zoom-in-top">
              <div v-show="layerNum === 4 && maskLayer" class="transition-box"></div>
            </transition>
            <i class="project-selling">正在进行</i>
            <b class="project-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="project-bigImg">大图</div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>ETHBTC</span>
              </p>
              <el-progress :percentage="100" :stroke-width="20"></el-progress>
              <div class="project-pane-number">
                <span>20人投</span>
                <span>400/500ETH</span>
              </div>
              <p class="project-pane-item-over">圆满完成</p>
              <p class="project-pane-item-aims">
                <span>目标：</span>
                <span>500ETH</span>
              </p>
              <p class="project-pane-item-day">剩余时间：<span>16</span>天</p>
              <p class="project-pane-item-time">项目起止：01/08~02/07</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  export default {
    name: 'proList',
    data() {
      return {
        maskLayer: false,
        layerNum: 0,
        navNum: 0,
        navList: [
          {
            title: '所有项目'
          },
          {
            title: '正在进行'
          },
          {
            title: '即将开始'
          },
          {
            title: '已结束'
          }
        ]
      };
    },
    methods: {
      itemHandler(k) {
        this.layerNum = k;
        this.maskLayer = true;
      },
      itemLeave() {
        this.maskLayer = false;
      },
      navEnterHandler(k) {
        this.navNum = k;
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

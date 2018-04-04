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
            <i class="project-selling">{{v.status === 0 ? '即将开始' : v.status === 1?'进行中':'已结束'}}</i>
            <b class="project-participate" v-show="v.partake">
              <img src="../../assets/img/participate.png">
            </b>
            <div class="project-bigImg">
              <img :src="v.projectCoverAddress" :alt="v.tokenName">
            </div>
            <div class="project-pane-item-info">
              <p class="project-coin">
                <span>{{v.title}}</span>
                <i v-show="v.status===0">目标：{{v.ethNumber}}ETH</i>
              </p>
              <el-progress :percentage="v | percentageFilter" :stroke-width="20"></el-progress>
              <div class="project-pane-number" v-show="v.status === 1">
                <span>{{v.buyerNum}}人投</span>
                <span>{{v.soldEth}}/{{v.ethNumber}}ETH</span>
              </div>
              <p v-show="v.status===2" class="project-pane-item-over">
                <span v-if="v.soldEth >= v.ethNumber">圆满结束</span>
                <span v-else>未完成</span>
              </p>
              <p v-show="v.status===0" class="project-pane-item-over">
                <span style="font-size:16px;position: relative;top:-10px;">倒计时</span><br/>
                {{Date.parse(v.startTime)-Date.parse(timeTxt) |
                changeTimeStamp}}
              </p>

              <p v-show="v.status === 1" class="project-pane-item-day" style="line-height: 22px;">剩余时间：<br/><span>{{Date.parse(v.stopTime)-Date.parse(timeTxt) |
                changeTimeStamp}}</span></p>
              <div v-show="v.status === 1" class="project-pane-item-time">项目起止：
                <p class="project-time-txt">
                  {{v.startTime | timeDown}}--{{v.stopTime | timeDown}}
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

  export default {
    name: 'proList',
    data() {
      return {
        maskLayer: false,
        listLoading: false,
        layerNum: 0,
        navNum: 0,
        navList: [
          {
            title: '所有项目',
            value: ''
          },
          {
            title: '正在进行',
            value: '1'
          },
          {
            title: '即将开始',
            value: '0'
          },
          {
            title: '已结束',
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
    },
    computed: {
      ...mapGetters({
        projectList: 'projectList',
        timeTxt: 'timeTxt'
      })
    },
    methods: {
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

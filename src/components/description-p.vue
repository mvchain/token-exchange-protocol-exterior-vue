<template>
  <div class="info-body-info-p">
    <el-tabs @tab-click="tabClickFun" v-model="activeName" class="info-body-tab">
      <el-tab-pane
        :key="item.name"

        v-for="(item, index) in filterComponent"
        :label="item.name"
        :name="item.title"
      >
        <info-view :missionInfo="missionInfo" v-if="item.key==1"></info-view>
        <work-info :paneNum="paneNum" :missionInfo="missionInfo" v-if="missionInfo.taskStatus>=60&&item.key ==60"></work-info>
        <pan-info :paneNum="paneNum" :missionInfo="missionInfo" v-if="missionInfo.taskStatus>=50&&item.key ==50"></pan-info>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script type='text/ecmascript-6'>
  import workInfo from './workInfo.vue';
  import payInfo from './payInfo.vue';
  import infoView from './infoView.vue';
  export default {
    name: 'description-p',
    props: {
      missionInfo: Object
    },
    computed: {
      filterComponent(v) {
        return this.panelList.filter((v) => {
          if (v.key === 1) {
            return v;
          }
          if (this.missionInfo.taskStatus >= 50 && v.key === 50 && this.missionInfo.taskStatus !== 90) {
            return v;
          }
          if (this.missionInfo.taskStatus >= 60 && v.key === 60 && this.missionInfo.taskStatus !== 90) {
            return v;
          }
        });
      }
    },
    data() {
      return {
        paneNum: '0',
        activeName: 'first',
        panelList: [
          {
            name: '任务详情',
            title: 'first',
            key: 1
          },
          {
            name: '付款记录',
            title: 'second',
            key: 50
          },
          {
            name: '作业记录',
            title: 'third',
            key: 60
          }
        ]
      };
    },
    components: {
      'work-info': workInfo,
      'pan-info': payInfo,
      'info-view': infoView
    },
    methods: {
      tabClickFun(v) {
        this.paneNum = v.index;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/var.styl";
  .info-body-info-p
    min-height: 450px;
    line-height: 20px;

    & .info-body-tab
      & .el-tabs__item.is-active
        color: $blue;

      & .el-tabs__active-bar
        background-color: $blue;

      & .el-table
        border: 0;

      & .el-table:after
        width: 0;
      & div.el-tabs__content > div:first-child li
        margin-top: 20px;
    & ul > li > span
      color: $fontColor2;
    & .info-body-upload
      display: flex;

      & > span
        width: 65px;

      & > div
        flex: 1;
        height: 100px;

      & .info-body-drawing
        padding: 0 20px;


</style>

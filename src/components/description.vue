<template>
  <div class="info-body-info">
    <ul>
      <li><span>预算金额：</span>{{missionInfo.budget | formatCurrency}}元</li>
      <li><span>开始日期：</span>{{missionInfo.startDate|timeFilter}}</li>
      <li><span>结束日期：</span>{{missionInfo.endDate|timeFilter}}</li>
      <li><span>所属项目：</span>{{missionInfo.projectName}}</li>
      <li><span>联系电话：</span>{{missionInfo.contactNumber | phoneNumFilter}}</li>
      <li><span>任务描述：</span>
        <p>{{missionInfo.taskDescribe}}</p>
      </li>
      <li><span>作业要求：</span>
        <p class="info-body-info-y" :class="showFlag?'':'show-text'">{{missionInfo.demand}}</p>
        <span v-if="missionInfo.demand" v-show="missionInfo.demand.length>=240" class="info-body-load" @click="showText">{{showFlag?'收起':'展开'}}</span>
      </li>
      <li class="info-body-upload"><span>附件：</span>
        <div>
          <template v-for="v in missionInfo.attachmentList">
            <div>
              <span class="info-body-drawing" style="padding-right:20px;">{{v.name}}({{v.size|bitFilter}})</span>
              <span class="info-body-load" @click="downFile(v.address)">下载</span>
            </div>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    props: {
      missionInfo: Object
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      downFile(url) {
        let userInfo = window.sessionStorage.getItem('userInfo');
        if (userInfo === null) {
          this.$router.replace('/login');
        } else {
          window.open(url);
        }
      },
      showText() {
        this.showFlag = !this.showFlag;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/var.styl";
  .info-body-info
    min-height: 450px;
    line-height: 20px;

    & > ul > li
      margin-top: 20px;

    & > ul > li > span
      color: $fontColor2;
    & .info-body-upload
      display: flex;

    & .info-body-info-y
      overflow: hidden;

      & > span
        width: 65px;

      & > div
        flex: 1;
        height: 100px;

      & .info-body-drawing
        padding: 0 20px;

    & .show-text
      max-height: 60px;
</style>

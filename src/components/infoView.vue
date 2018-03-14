<template>
  <div>
    <ul>
      <li><span>任务编号：</span>{{missionInfo.taskCode}}</li>
      <li><span>任务名称：</span>{{missionInfo.taskName}}</li>
      <li><span>任务类型：</span>{{missionInfo.taskType|typeFilter}}</li>
      <li><span>预算金额：</span>{{missionInfo.budget | formatCurrency}}元</li>
      <li><span>所属地：</span>{{missionInfo.provinceName}}{{missionInfo.cityName}}{{missionInfo.districtName}}</li>
      <li><span>所属项目：</span>{{missionInfo.projectName}}</li>
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
              <span class="info-body-drawing">{{v.name}}({{v.size | bitFilter}})</span>
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
  .info-body-info-y
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

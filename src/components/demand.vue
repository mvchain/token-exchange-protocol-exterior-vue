<template>
  <div class="info-body-demand">
    <div>
      <span></span>
    </div>
    <div>
      <p><span>任务类型：</span> {{missionInfo.taskType|typeFilter}}</p>
      <p><span>发布时间：</span> {{missionInfo.publishTime |timeFilter}}</p>
      <p><span class="between-font"><i>所</i><i>属</i><i> 地</i><i>：</i></span> {{missionInfo.provinceName}}{{missionInfo.cityName}}{{missionInfo.districtName}}</p>
      <p><span>当前状态</span> ：{{missionInfo.taskStatus|workTypeFilter}}</p>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    props: {
      missionInfo: Object
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/css/var.styl';
  .info-body-demand
    height: 96px;
    border: 1px solid #e8e8e8;
    padding: 10px;
    display: flex;
    margin-bottom: 20px;

    & > div:first-child
      width: 96px;
      background: #f7f8fc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      & span
        display: inline-block;
        width: 35px;
        height: 33px;
        background: url(../assets/img/spring-1.png) -278px -128px;

    & > div:last-child
      display: flex;
      flex-direction: column;

      & > p
        flex: 1;
        display: flex;

        & span
          color: $fontColor2;

        & .between-font
          display: flex;
          width: 70px;
          justify-content: space-between;

          & i
            font-style: normal;
</style>

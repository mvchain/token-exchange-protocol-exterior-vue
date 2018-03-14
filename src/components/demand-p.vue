<template>
  <div class="info-body-demand">
    <div>
      <span></span>
    </div>
    <div>
      <p>
        <span>状态：</span>
        {{missionInfo.taskStatus|workTypeFilter}}
      </p>
      <p><span>发布人姓名：</span> {{missionInfo.publisherRealName}}</p>
      <p><span>发布人联系方式：</span> ：{{missionInfo.contactNumber}}</p>
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
    margin: 20px 0;

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
        line-height:32px;

        & span
          color: $fontColor2;

        & .between-font
          display: flex;
          width: 70px;
          justify-content: space-between;

          & i
            font-style: normal;
</style>

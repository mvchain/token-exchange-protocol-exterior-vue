<template>
  <div class="info-body-step">

    <div class="info-body-step-line"></div>

    <div class="info-body-step-box-container">
      <div class="info-body-step-box ">
        <div class="info-body-step-circle"
             :class="missionInfo&&missionInfo.taskStatus==90?'':'info-body-step-active'">
          <span></span>
        </div>
        <div>发布需求</div>
      </div>
      <div class="info-body-step-box">
        <div class="info-body-step-circle"
             :class="missionInfo&&missionInfo.taskStatus>=30&&missionInfo.taskStatus!=90?'info-body-step-active':''">
          <span></span>
        </div>
        <div>资金托管</div>
      </div>
      <div class="info-body-step-box">
        <div class="info-body-step-circle"
             :class="missionInfo&&missionInfo.taskStatus>=40&&missionInfo.taskStatus!=90?'info-body-step-active':''">
          <span></span>
        </div>
        <div>指派用户</div>
      </div>
      <div class="info-body-step-box">
        <div class="info-body-step-circle"
             :class="missionInfo&&missionInfo.taskStatus>=50&&missionInfo.taskStatus!=90?'info-body-step-active':''">
          <span></span>
        </div>
        <div>作业</div>
      </div>
      <div class="info-body-step-box">
        <div class="info-body-step-circle"
             :class="missionInfo&&missionInfo.taskStatus>=70&&missionInfo.taskStatus!=90?'info-body-step-active':''">
          <span></span>
        </div>
        <div>完成</div>
      </div>
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
  .info-body-step
    height: 110px;
    background: #f7f8fc;
    position: relative;
    padding: 0 30px;

    & .info-body-step-line
      height: 2px;
      position: absolute;
      top: 38%;
      width: 1100px;
      background: #eaebee;

    & .info-body-step-box-container
      display: flex;

      & .info-body-step-box
        flex: 1;
        text-align: center;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 100;

        & .info-body-step-circle
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, .1);
          border-radius: 50%;
          line-height: 21px;
          text-align: center;

          & span
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #d2d2d2;

        & div:last-child
          margin-top: 10px;

        & .info-body-step-active
          background: rgba(25, 113, 213, .2);

          & span
            background: $blue;

          & + div
            color: $blue;
</style>

<template>
  <div class="recharge-con">
    <h1 class="recharge-title">充值</h1>
    <div class="recharge-info">
      <div class="recharge-type">ETH充值地址</div>
      <div class="recharge-addr">
        <span>sdfasdfasdfa</span>
        <span>复制</span>
      </div>
      <div class="recharge-info-txt">ETH充值地址二维码</div>
      <div class="recharge-code">
        <img src="../../assets/img/ewm.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recharge'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .recharge-con
    color:#666;
    font-size:18px;
    .recharge-title
      text-align :center;
      font-size:24px;
      font-weight:900;
      position:relative;
      left:-110px;
      margin-top:10px;

    .recharge-info
      padding-left:400px;

    .recharge-type
      font-weight:900;
      margin:50px 0 10px 0;

    .recharge-addr
      margin-bottom:55px;
      & span:first-child
        font-weight:900;
      & span:last-child
        font-size:14px;
        background:#8a8bff;
        padding:5px 10px;
        border-radius:5px;
        color:#fff;
        margin-left:20px;
        cursor:pointer;

    .recharge-info-txt
      margin-bottom:10px;
      font-weight:900;
</style>

<template>
  <footer class="token-footer">
    <div class="footer-contact">
      <div class="footer-contact-txt">联系方式</div>
      <div class="footer-contact-icon">
        <ul>
          <li>
            <img src="../assets/img/wx.png" alt="微信二维码"  @mouseleave="ewmFlag=false" @mouseenter="ewmFlag=true">
            <transition name="el-fade-in-linear">
              <p v-show="ewmFlag" class="ewm-img">
                <img src="../assets/img/ewm.png" alt="">
              </p>
            </transition>
          </li>
          <li><img src="../assets/img/fb.png" alt="facebook"></li>
          <li><img src="../assets/img/tw.png" alt="推特"></li>
          <li><img src="../assets/img/rb.png" alt="rb"></li>
        </ul>
      </div>
      <div class="footer-contact-log">
        <div class=""></div>
        <div class="">Crugo, All rights reserved © 2018</div>
      </div>
    </div>
  </footer>
</template>
<script type='text/ecmascript-6'>
  export default {
    name: 'foot',
    data() {
      return {
        ewmFlag: false
      };
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .token-footer
    background:url('../assets/img/back-img-btm-1.png') no-repeat bottom center;
    background-size:100% ;
    min-height:516px;

    .footer-contact
      margin-top:100px;
      padding-top:120px;

    .footer-contact-txt
      text-align center;
      font-size:34px;
      font-weight:900;
      color:#fff;

    .footer-contact-icon
      margin-top:60px;
      & > ul
        display :flex;
        justify-content :center;
        align-items :center;

        & > li
          margin-left:30px;
          cursor:pointer;

    .footer-contact-log
      width:1136px;
      border-top:1px solid #ddd;
      margin:0 auto;
      margin-top:40px;
      padding:100px 0 80px 0;
      line-height :72px;

      & > div:first-child
        width:264px;
        height:72px;
        background:#fff;
        float:left;

      & > div:last-child
        float:right;
        color:#fff;

    & .ewm-img
      position :relative;

      & img
        position absolute;
        top:-200px;
        left:-60px;
</style>

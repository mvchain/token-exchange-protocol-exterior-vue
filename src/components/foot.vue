<template>
  <footer class="token-footer">
    <div class="footer-contact">
      <div class="footer-top">
        <ul>
          <li class="foot-container-link">
            <router-link to="/home">首页</router-link>
          </li>
          <li class="foot-container-link">
            <router-link to="/proList">项目列表</router-link>
          </li>
          <li  class="foot-container-link">
            <router-link to="/help">帮助支持</router-link>
          </li>
        </ul>
        <div>
          <p>联系方式：</p>
          <p>869142248@qq.com</p>
        </div>
      </div>
      <div class="footer-bottom">Crugo, All rights reserved © 2018</div>
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
    min-height:315px;

    .footer-contact
      margin-top:100px;
      padding-top:140px;

    & .footer-bottom
      margin-top:30px;
      text-align :center;
      color:#fff;
    & .footer-top
      margin:0 auto;
      width:1240px;
  .footer-top
    padding-bottom:20px;
    border-bottom:1px solid #ddd;
    & ul
      float:left;
    & div
      float:right;
      line-height :30px;
      color:#fff;

  .foot-container-link
    display :inline-block;
    margin-right:30px;
    & a
      color:#fff;
    & a:hover
      font-weight:900;

</style>

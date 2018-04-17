<template>
  <footer class="token-footer">
    <div class="footer-contact">
      <div class="footer-top">
        <ul>
          <li class="foot-container-link">
            <router-link to="/home">{{languageVal.Home}}</router-link>
          </li>
          <li class="foot-container-link">
            <router-link to="/proList">{{languageVal.Projects}}</router-link>
          </li>
          <li  class="foot-container-link">
            <router-link to="/help">{{languageVal.Help}}</router-link>
          </li>
        </ul>
        <div>
          <p>{{languageVal.ContectUs}}：</p>
          <p>869142248@qq.com</p>
        </div>
      </div>
      <div class="footer-bottom">Crugo, All rights reserved © 2018</div>
    </div>
  </footer>
</template>
<script type='text/ecmascript-6'>
  import {mapGetters} from 'vuex';
  export default {
    name: 'foot',
    data() {
      return {
        ewmFlag: false
      };
    },
    computed: {
      ...mapGetters({
        languageVal: 'languageVal'
      })
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .token-footer
    background:url('../assets/img/back-img-btm-1.png') no-repeat bottom center;

    & .footer-bottom
      text-align :center;
      color:#fff;
    & .footer-top
      margin:0 auto;
  .footer-top
    border-bottom:1px solid #ddd;
    & ul
      float:left;
    & div
      float:right;
      color:#fff;

  .foot-container-link
    display :inline-block;
    margin-right:30px;
    & a
      color:#fff;
    & a:hover
      font-weight:900;
  @media only screen and (max-width:480px){
    .token-footer{
      height:9rem;
      background-repeat:no-repeat;
      background-position:center center;
      background-size:200% 100%;
    }
    .footer-contact{
      margin-top:1rem;
      padding-top:1rem;
    }
    .footer-bottom{
      margin-top:0.8rem;
      font-size:1rem;
    }
    .footer-top{
      padding-bottom:1rem;
      border-bottom:1px solid #ddd;
      width:90%;
    }
    .footer-top ul{
      display :none;
    }
    .footer-top div{
      margin:0 auto;
      float:none;
      text-align center;
      line-height :2rem;
    }
  }
  @media (min-width: 481px) and (max-width:1366px){

  }
  @media only screen and (min-width:481px){
    .token-footer{
      min-height:315px;
    }
    .footer-contact{
      margin-top:100px;
      padding-top:140px;
    }
    .footer-bottom{
      margin-top:30px;
    }
    .footer-top{
      padding-bottom:20px;
      border-bottom:1px solid #ddd;
      width:1240px;
    }
    .footer-top div{
      line-height :30px;
    }

  }

</style>

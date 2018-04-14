<template>
  <div class="recharge-con">
    <h1 class="recharge-title">{{languageVal.Recharge}}</h1>
    <div class="recharge-info">
      <div class="recharge-type">ETH{{languageVal.Recharge}}{{languageVal.Adress}}</div>
      <div class="recharge-addr">
        <input style="width:450px;" id="codeID" readonly v-model="tokenAddr">
        <span @click="copyHandler">{{languageVal.copy}}</span>
      </div>
      <div class="recharge-info-txt">ETH{{languageVal.QRcode}}</div>
      <div class="recharge-code">
        <img :src="codeImg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import {mapGetters} from 'vuex';
  export default {
    name: 'recharge',
    data() {
      return {
        codeImg: ''
      };
    },
    mounted() {
      this.getTokenHandler(this.$route.query.code);
    },
    computed: {
      ...mapGetters({
        tokenAddr: 'tokenAddr',
        languageVal: 'languageVal'
      })
    },
    methods: {
      getQRCode(v) {
        QRCode.toDataURL(v)
          .then(url => {
            this.codeImg = url;
          }).catch(err => {
          this.$message.error(err);
        });
      },
      copyHandler() {
        let Url2 = window.document.getElementById('codeID');
        Url2.select();
        document.execCommand('Copy');
        this.$message.success(this.languageVal.copysuccess);
      },
      getTokenHandler() {
        this.$store.dispatch('getTokenAddr', this.$route.query.code).then(() => {
          QRCode.toDataURL(this.tokenAddr)
            .then(url => {
              this.codeImg = url;
            }).catch(err => {
            this.$message.error(err);
          });
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .recharge-con
    color: #666;
    font-size: 18px;
    .recharge-title
      text-align: center;
      font-size: 24px;
      font-weight: 900;
      position: relative;
      left: -110px;
      margin-top: 10px;

    .recharge-info
      padding-left: 210px;

    .recharge-type
      font-weight: 900;
      margin: 50px 0 10px 0;

    .recharge-addr
      margin-bottom: 55px;
      & span:first-child
        font-weight: 900;
      & span:last-child
        font-size: 14px;
        background: #8a8bff;
        padding: 5px 10px;
        border-radius: 5px;
        color: #fff;
        margin-left: 20px;
        cursor: pointer;

    .recharge-info-txt
      margin-bottom: 10px;
      font-weight: 900;
</style>

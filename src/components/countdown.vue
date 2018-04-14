<template>
  <div>
    <el-button :disabled="validateCodeInterval" type="text" @click="sendEmail">{{validateCodeTxt}}
    </el-button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'countdown',
    props: {
      username: String
    },
    watch: {
      'languageVal': 'languageValHandler'
    },
    computed: {
      ...mapGetters({
        languageVal: 'languageVal'
      })
    },
    data() {
      return {
        n: 59,
        validateCodeTxt: '',
        validateCodeInterval: false,
        validateCodeFlag: null
      };
    },
    mounted() {
      this.languageValHandler(this.languageVal);
    },
    methods: {
      languageValHandler(a) {
        this.validateCodeTxt = a.Sendthecode;
      },
      sendEmail() {
        this.emailHandler(this.username);
      },
      emailHandler(username) {
        if (!this.validateCodeInterval) {
          this.$store.dispatch('getValiEmail', username).then(() => {
          }).catch((err) => {
            this.$message.error(err);
          });
        }
        this.validateCodeInterval = true;
        if (this.n !== 59) return;
        let that = this;
        this.validateCodeFlag = setInterval(() => {
          if (that.n <= 0) {
            clearInterval(that.validateCodeFlag);
            that.validateCodeInterval = false;
            this.validateCodeTxt = this.languageVal.Sendthecode;
            that.n = 59;
          } else {
            that.n--;
            that.validateCodeInterval = true;
            that.validateCodeTxt = `${that.languageVal.Sent}(${that.n})s`;
          }
        }, 1000);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div>
    <el-button :disabled="validateCodeInterval" type="text" @click="sendEmail">{{validateCodeTxt}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'countdown',
    props: {
      username: String
    },
    data() {
      return {
        n: 59,
        validateCodeTxt: '发送验证码',
        validateCodeInterval: false,
        validateCodeFlag: null
      };
    },
    methods: {
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
            that.validateCodeTxt = '发送验证码';
            that.n = 59;
          } else {
            that.n--;
            that.validateCodeInterval = true;
            that.validateCodeTxt = `已发送(${that.n})s`;
          }
        }, 1000);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div class="info-con">
    <div class="info-container">
      <div class="info-container-body">
        <div class="info-container-title">
          <div>
            <span class="color-btn color-btn2"><i class="el-icon-arrow-left"></i>返回上一级</span>
          </div>
          <div>
            <span class="color-btn">上一个</span>
            <span class="color-btn">下一个</span>
          </div>
        </div>
        <div class="info-container-middle">
          <div>
            <i class="info-working"></i>
            <b class="info-participate"></b>
          </div>
          <div></div>
        </div>
        <div class="info-container-bottom">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <foot-view></foot-view>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  export default {
    name: 'info',
    components: {
      'foot-view': foot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl";
</style>

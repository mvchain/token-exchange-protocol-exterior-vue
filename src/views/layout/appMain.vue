<template>
  <section  class="app-main" style="min-height: 100%">
    <div class="shadow-container"></div>
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'appMain',
    computed: {
    },
    methods: {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shadow-container
    height:1px;
    box-shadow :0 2px 20px #333;
</style>


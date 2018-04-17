<template>
  <section  class="app-main" style="min-height: 100%">
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
</style>


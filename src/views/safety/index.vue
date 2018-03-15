<template>
  <div class="help-con">
    <div class="help-circle-con">
      <div class="help-circle">
      </div>
    </div>
    <div id="safetyNav" class="safety-nav">
      <div class="safety-title">
        <div :class="listNum === k ? 'selected-title' : ''" @click="listNum = k" class="safety-name"
             v-for="(v,k) in listName" :key="k">{{v.name}}
        </div>
      </div>
      <div class="safety-pane">
        <div v-show="listNum === 0" class="safety-pane-item">资金管理</div>
        <div v-show="listNum === 1" class="safety-pane-item">订单管理</div>
        <div v-show="listNum === 2" class="safety-pane-item">账户安全</div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'safety',
    watch: {
      '$route.query.type': 'changeList'
    },
    data() {
      return {
        listName: [
          {
            name: '资金管理'
          },
          {
            name: '订单管理'
          },
          {
            name: '账户安全'
          }
        ],
        listNum: 0
      };
    },
    methods: {
      changeList(t) {
        this.listNum = Number(t);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index..styl"
</style>

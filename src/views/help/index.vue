<template>
  <div class="help-con">
    <div class="help-circle-con">
      <div class="help-circle">帮助与支持</div>
    </div>
    <div class="help-rectangle">
      <div>
        <p @click="titleHandler(k)" v-for="(v,k) in listTxt" :key="k" :class="listNum==k?'help-title':''">
          {{v.title}}</p>
      </div>
      <div></div>
      <div>
        <div class="help-div" v-show="listNum === 0">
          <h4><span>在线查看购买教程</span></h4>
          <h4><span class="download-btn">查看教程</span></h4>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  export default {
    name: 'help',
    components: {
      'footer-com': foot
    },
    data() {
      return {
        listNum: 0,
        listTxt: [
          {
            title: '代币购买教程'
          },
          {
            title: '常见问题'
          }
        ]
      };
    },
    methods: {
      titleHandler(k) {
        this.listNum = k;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .download-btn
    background:#6488ff;
    display:inline-block;
    width:120px;
    height:40px;
    text-align :center;
    line-height :40px;
    border-radius:10px;
    font-weight:900;
    color:#fff;

</style>

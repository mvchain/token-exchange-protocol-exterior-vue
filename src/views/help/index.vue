<template>
  <div class="help-con">
    <div class="help-circle-con">
      <div class="help-circle">帮 助 与 支 持</div>
    </div>
    <div class="help-rectangle">
      <div>
        <p @click="titleHandler(k)" v-for="(v,k) in listTxt" :key="k" :class="listNum==k?'help-title':''">
          {{v.title}}</p>
      </div>
      <div></div>
      <div>
        <div v-show="listNum === 0">
          <h2>项目如何进行投资</h2>
          <p>项目如何进行投资，效益如何最大化？</p>
          <h2>如何购买代币</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dignissimos earum harum illo? Dolores,
            dolorum, eligendi error fugit harum impedit incidunt, iure molestias possimus reprehenderit repudiandae
            voluptates! Ad ipsam, placeat.</p>
          <h2>网站的使用方法</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto cupiditate deserunt
            dolore doloremque eligendi enim eum expedita iste minima modi, molestias nobis nostrum odio omnis optio
            perspiciatis quae!</p>
        </div>
        <div v-show="listNum === 1">
          <h2>项目如何进行投资2</h2>
          <p>项目如何进行投资，效益如何最大化？</p>
          <h2>如何购买代币</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dignissimos earum harum illo? Dolores,
            dolorum, eligendi error fugit harum impedit incidunt, iure molestias possimus reprehenderit repudiandae
            voluptates! Ad ipsam, placeat.</p>
          <h2>网站的使用方法</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto cupiditate deserunt
            dolore doloremque eligendi enim eum expedita iste minima modi, molestias nobis nostrum odio omnis optio
            perspiciatis quae!</p>
        </div>
        <div v-show="listNum === 2">
          <h2>项目如何进行投资3</h2>
          <p>项目如何进行投资，效益如何最大化？</p>
          <h2>如何购买代币</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dignissimos earum harum illo? Dolores,
            dolorum, eligendi error fugit harum impedit incidunt, iure molestias possimus reprehenderit repudiandae
            voluptates! Ad ipsam, placeat.</p>
          <h2>网站的使用方法</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto cupiditate deserunt
            dolore doloremque eligendi enim eum expedita iste minima modi, molestias nobis nostrum odio omnis optio
            perspiciatis quae!</p>
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
            title: '常见问题'
          },
          {
            title: '联系方式'
          },
          {
            title: '代币购买教程'
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
</style>

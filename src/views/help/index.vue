<template>
  <div class="help-con">
    <div class="help-circle-con">
      <div class="help-circle">{{languageVal.Help}}</div>
    </div>
    <div class="help-rectangle">
      <div>
        <p @click="titleHandler(k)" v-for="(v,k) in listTxt" :key="k" :class="listNum==k?'help-title':''">
          {{v.title}}</p>
      </div>
      <div></div>
      <div>
        <div class="help-div help-div1" v-show="listNum === 0">
          <h4><span>{{languageVal.Online}}</span></h4>
          <h4><a target="_blank" href="http://chuantu.biz/t6/289/1524124304x-1404793083.png" class="download-btn">{{languageVal.watch}}</a></h4>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  import {mapGetters} from 'vuex';
  export default {
    name: 'help',
    components: {
      'footer-com': foot
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
        listNum: 0,
        listTxt: [
          {
            title: ''
          },
          {
            title: ''
          }
        ]
      };
    },
    mounted() {
      this.languageValHandler(this.languageVal);
    },
    methods: {
      mounted() {
        this.listNum = this.$route.query.type;
        this.orderHandler('pageNum=1&pageSize=10&orderBy=created_at desc');
        this.createCode();
        this.languageValHandler(this.languageVal);
      },
      titleHandler(k) {
        this.listNum = k;
      },
      languageValHandler(a) {
        this.listTxt[0].title = a.ProjectParticipationTutorial;
        this.listTxt[1].title = a.FrequentlyAskedQuestions;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


  @media only screen and (max-width:480px){
    .download-btn{
      background:#6488ff;
      display:inline-block;
      width:10rem;
      height:2rem;
      text-align :center;
      line-height :2rem;
      border-radius:10px;
      font-weight:900;
      color:#fff;
      margin-top:5rem;
    }
    .help-div1{
      line-height:1rem;
    }
  }
  @media (min-width: 481px) and (max-width:1366px){

  }
  @media only screen and (min-width:481px){
    .download-btn{
      background:#6488ff;
      display:inline-block;
      width:120px;
      height:40px;
      text-align :center;
      line-height :40px;
      border-radius:10px;
      font-weight:900;
      color:#fff;
    }

  }
</style>

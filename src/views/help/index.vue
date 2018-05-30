<template>
  <div class="help-con">
    <div class="help-circle-con">
      <div class="help-circle">{{languageVal.Help}}</div>
    </div>
    <div class="help-rectangle help-style">
      <div>
        <p @click="titleHandler(k)" v-for="(v,k) in listTxt" :key="k" :class="listNum==k?'help-title':''">
          <span>
            {{v.title}}
          </span></p>
      </div>
      <div></div>
      <div>
        <div class="help-div help-div1" v-show="listNum === 0">
          <h4><span>{{languageVal.Online}}</span></h4>
          <h4><a target="_blank" href="https://erc20.oss-cn-hangzhou.aliyuncs.com/f/ICOlist-project-instruction.pdf" class="download-btn">{{languageVal.watch}}</a></h4>
        </div>
        <div  id="cjwt" v-show="listNum === 1">
          <h2>{{languageVal.Questions1}}</h2>
          <div>{{languageVal.Answer1}}</div>
          <h2>{{languageVal.Questions2}}</h2>
          <div>{{languageVal.Answer2}}</div>
          <h2>{{languageVal.Questions3}}</h2>
          <div>{{languageVal.Answer3}}</div>
          <h2>{{languageVal.Questions4}}</h2>
          <div>{{languageVal.Answer4}}</div>
          <h2>{{languageVal.Questions5}}</h2>
          <div>{{languageVal.Answer5}}</div>
        </div>
      </div>
    </div>
    <div class="help-rectangle1 help-style1">
      <div class="help-rectangle1-title">
          <span  @click="titleHandler(k)" v-for="(v,k) in listTxt" :key="k" :class="listNum==k?'help-active':''">
            {{v.title}}
          </span>
      </div>
      <div v-show="listNum===0" class="project-common-problem-1-main">
        <div class="project-common-problem-1-main-item">
          <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions1}}</h2>
          <div class="project-common-problem-1-main-item-content">{{languageVal.Answer1}}</div>
        </div>
        <div class="project-common-problem-1-main-item">
          <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions2}}</h2>
          <div class="project-common-problem-1-main-item-content">{{languageVal.Answer2}}</div>
        </div>
        <div class="project-common-problem-1-main-item">
          <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions3}}</h2>
          <div class="project-common-problem-1-main-item-content">{{languageVal.Answer3}}</div>
        </div>
        <div class="project-common-problem-1-main-item">
          <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions4}}</h2>
          <div class="project-common-problem-1-main-item-content">{{languageVal.Answer4}}</div>
        </div>
        <div class="project-common-problem-1-main-item">
          <h2 class="project-common-problem-1-main-item-title">{{languageVal.Questions5}}</h2>
          <div class="project-common-problem-1-main-item-content">{{languageVal.Answer5}}</div>
        </div>
      </div>
      <div v-show="listNum===1" class="project-common-problem-1-main">
        <h4  class="download-btn2"><span>{{languageVal.Online}}</span></h4>
        <h4 class="download-btn1"><a target="_blank" href="https://erc20.oss-cn-hangzhou.aliyuncs.com/f/ICOlist-project-instruction.pdf" >{{languageVal.watch}}</a></h4>
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
    #cjwt{
      line-height 1.5rem;
    }
    #cjwt h2 {
      margin: 24px 0 12px 0;
      color:#333;
    }
    #cjwt div{
      color:#999;
      font-size:14px
    }
    .download-btn1,.download-btn2{
      text-align center
      margin-top:3rem;

    }
    .download-btn1 a{
      text-align center
      background:#6488ff;
      display:inline-block;
      width:120px;
      height:40px;
      line-height :40px;
      border-radius:10px;
      font-weight:900;
      color:#fff;

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
    #cjwt h2 {
      margin: 24px 0 12px 0;
      color:#333;
    }
    #cjwt div{
      color:#999;
      font-size:14px
    }

  }
</style>

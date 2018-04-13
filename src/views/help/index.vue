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
        <div class="help-div" v-show="listNum === 0">
          <h4><span>{{languageVal.Clickfortutorial}}</span></h4>
          <h4><span class="download-btn">{{languageVal.DownloadTutorial}}</span></h4>
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
      this.listTxt[0].title = this.languageVal.ProjectParticipationTutorial;
      this.listTxt[1].title = this.languageVal.FrequentlyAskedQuestions;
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

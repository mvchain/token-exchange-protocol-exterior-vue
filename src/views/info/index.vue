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
            <i class="info-working">正在进行</i>
            <b class="info-participate">
              <img src="../../assets/img/participate.png" alt="">
            </b>
            <div class="info-big-img"></div>
            <div class="info-right">
              <div>
                <span>ETHBTC</span>
                <span>项目开始：2018/03/08 13:00</span>
              </div>
              <el-progress :percentage="100" :stroke-width="20"></el-progress>
              <ul>
                <li>目标</li>
                <li><span>400/500ETH</span></li>
                <li>支持者</li>
                <li><span>224</span></li>
                <li>剩余时间</li>
                <li><span>16</span>天</li>
              </ul>
              <div class="info-now">
                <span class="color-btn color-btn2" @click="dialogTableVisible = true">立即参与</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/img/avatar.png" alt="">
            </div>
            <p class="info-people">创始人</p>
            <p class="info-people">CEO</p>
            <p>loremLorem ipsum dolor sit amet, consectque, cum dolorem iure labore optio sapiente tempora. At dolore dolorum ducimus expedita fugiat incidunt laborum minima, numquam pariatur sed sunt, voluptatem.</p>
          </div>
        </div>
        <div class="info-container-bottom">
          <div>
            <div class="info-container-bottom-title">项目详情</div>
          </div>
          <div>
            <ul>
              <li><span>兑换比例</span></li>
              <li><span>1EHT=2000MVC</span></li>
              <li><span class="color-btn color-btn2">白皮书下载</span></li>
              <li><span>项目官网</span></li>
              <li><span>www.baidu.com</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <foot-view></foot-view>
    <el-dialog
               width="543px"
               height="418px"
               top="25vh"
               custom-class="info-dialog"
               :close-on-click-modal="false"
               center
               :visible.sync="dialogTableVisible">
      <div class="dialog-title">参与购买</div>
      <div class="dialog-label">
        <ul>
          <li>ETH余额：</li>
          <li>购买金额：</li>
          <li>获得代币数量：</li>
        </ul>
      </div>
      <div class="dialog-context">
        <ul>
          <li>200ETH</li>
          <li style="position: relative">
            <input type="text">
            <span>ETH</span>
            <span class="info-prompt">最小购买金额为0.1ETH</span>
          </li>
          <li>16000.00</li>
        </ul>
      </div>
      <div class="dialog-submit">
        <span class="color-btn2 color-btn" @click="dialogVisible=true">确认购买</span>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="543px"
      :show-close="false"
      top="35vh"
      custom-class="dialog-confirm"
      center
      >
      <p class="dialog-confirm-title">确认是否支付2ETH</p>
      <span slot="footer" class="dialog-footer">
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn" @click="dialogVisible = false">是</el-button>
        <el-button style="padding:10px 50px;border-radius:10px;" class="color-btn"  @click="dialogVisible = false">否</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import foot from '../../components/foot';
  export default {
    name: 'info',
    components: {
      'foot-view': foot
    },
    data() {
      return {
        dialogTableVisible: true,
        dialogVisible: false
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl";
</style>

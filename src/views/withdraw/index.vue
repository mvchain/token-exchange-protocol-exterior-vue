<template>
  <div class="withdraw-con">
    <div class="withdraw-from">
      <div class="withdraw-from-title">充 值</div>
      <div class="withdraw-from-body">
        <div class="withdraw-from-body-type">
          <el-select v-model="coinType" placeholder="请选择" class="withdraw-select" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="withdraw-from-body-addr">
          <input placeholder="输入提现地址" type="text">
        </div>
        <div class="withdraw-from-body-funds">
          <input placeholder="输入提现金额" type="text">
        </div>
        <div class="withdraw-from-body-instructions">
          <ul>
            <li>账户余额：1231</li>
            <li>单日提现上限：1231</li>
            <li>最少提现0.1ETH，单次最多1000ETH</li>
            <li>提现手续费0.2%</li>
          </ul>
        </div>
        <div class="withdraw-from-body-pwd">
          <input placeholder="输入交易密码" type="password">
        </div>
        <div class="withdraw-from-body-validate">
          <input type="text">
          <el-button type="text">获取验证码</el-button>
        </div>
        <div class="withdraw-from-body-sub">
          <span class="color-btn2 color-btn">确认提现</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'withdraw',
    data() {
      return {
        options: [
          {
            name: 'ETH',
            value: '1'
          },
          {
            name: 'BTC',
            value: '2'
          },
          {
            name: 'MVC',
            value: '3'
          },
          {
            name: 'CCT',
            value: '4'
          },
          {
            name: 'DBG',
            value: '5'
          }
        ],
        coinType: ''
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .withdraw-con
    height: 493px;
    margin: 0 0 0 192px;

    & .withdraw-from
      width: 485px;
      padding: 0 70px;

      & .withdraw-from-title
        font-size: 24px;
        color: #666;
        font-weight: 900;
        text-align: center;

      & .withdraw-from-body
        & > div
          margin-top: 18px;
        & input
          width: 100%;
          height: 40px;
          border: 1px solid #ff7974;
          padding-left: 20px;
          outline none;
          border-radius 5px;

        & .withdraw-from-body-instructions
          & li
            font-size: 14px;
            color: #666;
            padding: 3px 0;
        & .withdraw-select
          width:100%;

        & .withdraw-from-body-validate
          & input
            width:200px;
            margin-right:20px;
        & .withdraw-from-body-sub
          text-align :center;
          & span
            width:150px;
            height:48px;
</style>

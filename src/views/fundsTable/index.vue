<template>
  <div>
    <el-table
      :data="fundsData"
      style="width: 100%">
      <el-table-column
        prop="type"
        label="币种"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        align="center"
        width="380">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span class="color-btn handler-btn" @click="rechargeHandler(scope.$index, 'recharge')">充值</span>
          <span class="color-btn handler-btn" @click="rechargeHandler(scope.$index, 'withdraw')">提现</span>
          <span class="color-btn handler-btn">充提历史</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'fundsTable',
    data() {
      return {
        fundsData: [
          {
            type: 'ETH',
            balance: '12314672.00'
          },
          {
            type: 'MVC',
            balance: '2376.00'
          },
          {
            type: 'DDH',
            balance: '7841.00'
          },
          {
            type: 'BTC',
            balance: '165.00'
          },
          {
            type: 'ABC',
            balance: '223.00'
          },
          {
            type: 'DEE',
            balance: '12312.00'
          }
        ]
      };
    },
    methods: {
      rechargeHandler(idx, name) {
        this.$router.push({path: name, query: {id: idx, type: this.$route.query.type}});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .handler-btn
    display: inline-block;
    width: 95px;
    height: 36px;
    text-align: center;
    line-height 36px;
    border-radius: 25px;
    border: 1px solid #ff7974;
    margin-right: 10px;
    color: #ff7974;
    cursor: pointer;
</style>

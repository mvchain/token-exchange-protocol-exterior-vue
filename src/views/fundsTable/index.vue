<template>
  <div>
    <el-table
      :data="balance"
      style="width: 100%">
      <el-table-column
        prop="tokenName"
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
          <span class="color-btn handler-btn" v-show="scope.row.rechargeStatus"
                @click="rechargeHandler(scope.$index, 'recharge', scope.row.tokenName)">充值</span>
          <span class="color-btn handler-btn" v-show="scope.row.withdrawStatus"
                @click="rechargeHandler(scope.$index, 'withdraw', scope.row.tokenName)">提现</span>
          <span class="color-btn handler-btn" @click="rechargeHandler(scope.$index, 'ctHistory',scope.row.tokenId)">充提历史</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'fundsTable',
    data() {
      return {
        fundsLoading: false
      };
    },
    computed: {
      ...mapGetters({
        balance: 'balance'
      })
    },
    mounted() {
      this.getBalance();
    },
    methods: {
      rechargeHandler(idx, name, code) {
        this.$router.push({path: name, query: {id: idx, type: this.$route.query.type, code: code}});
      },
      getBalance() {
        this.fundsLoading = true;
        this.$store.dispatch('getBalance').then(() => {
          this.fundsLoading = false;
        }).catch((err) => {
          this.$message.error(err);
          this.fundsLoading = false;
        });
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

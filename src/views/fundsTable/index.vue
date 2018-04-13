<template>
  <div>
    <el-table
      :data="balance"
      style="width: 100%">
      <el-table-column
        prop="tokenName"
        :label="languageVal.Currency"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="balance"
        :label="languageVal.Balance"
        align="center"
        width="380">
      </el-table-column>
      <el-table-column
        :label="languageVal.Operation">
        <template slot-scope="scope">
          <span class="color-btn handler-btn" v-show="scope.row.rechargeStatus"
                @click="rechargeHandler(scope.$index, 'recharge', scope.row.tokenName)">{{languageVal.Recharge}}</span>
          <span class="color-btn handler-btn" v-show="scope.row.withdrawStatus"
                @click="rechargeHandler(scope.$index, 'withdraw', scope.row.tokenName)">{{languageVal.Withdrawal}}</span>
          <span class="color-btn handler-btn" @click="rechargeHandler(scope.$index, 'ctHistory',scope.row.tokenId)">{{languageVal.History}}</span>
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
        balance: 'balance',
        languageVal: 'languageVal'
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
  .handler-btn:hover
    box-shadow :none;
</style>

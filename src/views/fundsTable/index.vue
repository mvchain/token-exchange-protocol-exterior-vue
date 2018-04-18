<template>
  <div>
    <el-table
      id="fundsTable"
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
    <div id="fundsTableMobil">
      <ul class="m-funds-table-ul" v-for="(v,k) in balance">
        <li class="m-funds-table-li">
          <div>{{languageVal.Currency}}:</div>
          <div>{{v.tokenName}}</div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Balance}}:</div>
          <div>{{v.balance}}</div>
        </li>
        <li class="m-funds-table-li-handler">
          <div>
             <span class="color-btn handler-btn" v-show="v.rechargeStatus"
                   @click="rechargeHandler(k, 'recharge', v.tokenName)">{{languageVal.Recharge}}</span>
            <span class="color-btn handler-btn" v-show="v.withdrawStatus"
                  @click="rechargeHandler(k, 'withdraw', v.tokenName)">{{languageVal.Withdrawal}}</span>
            <span class="color-btn handler-btn" @click="rechargeHandler(k, 'ctHistory',v.tokenId)">{{languageVal.History}}</span>
          </div>
        </li>
      </ul>
    </div>
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

</style>

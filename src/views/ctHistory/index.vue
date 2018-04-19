<template>
  <div>
    <el-table
      id="historyTable"
      :data="historyList.list"
      v-loading="historyLoading"
      height="430"
      style="width: 100%">
      <el-table-column
        prop="orderId"
        :label="languageVal.Order"
        align="center"
        width="110"
        >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :label="languageVal.Time"
        align="center"
        width="170"
        >
      </el-table-column>
      <el-table-column
        :label="languageVal.Type"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{scope.row.type === 0 ? languageVal.Recharge : languageVal.Withdrawal}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="languageVal.Amount"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{scope.row.number}}{{scope.row.tokenName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hash"
        :label="languageVal.Adress"
        align="right"
        width="580"
      >
        <template slot-scope="scope">
          <p><a target="_blank" :href="`https://etherscan.io/address/${scope.row.type === 0 ? scope.row.fromAddress : scope.row.toAddress}`">{{scope.row.type === 0 ? scope.row.fromAddress : scope.row.toAddress}}</a></p>
          <p><a target="_blank" :href="`https://etherscan.io/tx/${scope.row.hash}`">{{scope.row.hash}}</a></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="languageVal.Status"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.status === 0 ? languageVal.Witing : scope.row.status === 1 ? languageVal.InProgress : scope.row.status === 2 ? languageVal.Done : languageVal.Faild}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div id="m-historyTable" v-loading="historyLoading">
      <ul class="m-funds-table-ul" v-for="(v,k) in historyList.list">
        <li class="m-funds-table-li">
          <div>{{languageVal.Order}}:</div>
          <div>{{v.orderId}}</div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Time}}:</div>
          <div>{{v.createdAt}}</div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Type}}:</div>
          <div><span>{{v.type === 0 ? languageVal.Recharge : languageVal.Withdrawal}}</span></div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Amount}}:</div>
          <div>{{v.number}}{{v.tokenName}}</div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Adress}}:</div>
          <div><p><a target="_blank" :href="`https://etherscan.io/address/${v.type === 0 ? v.fromAddress :v.toAddress}`">{{v.type === 0 ? v.fromAddress : v.toAddress}}</a></p>
            <p><a target="_blank" :href="`https://etherscan.io/tx/${v.hash}`">{{v.hash}}</a></p></div>
        </li>
        <li class="m-funds-table-li">
          <div>{{languageVal.Status}}:</div>
          <div> <span>{{v.status === 0 ? languageVal.Witing : v.status === 1 ? languageVal.InProgress : v.status === 2 ? languageVal.Done : languageVal.Faild}}</span></div>
        </li>
      </ul>
    </div>
    <div style="text-align: center;margin-top:20px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="historyList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'ctHistory',
    data() {
      return {
        historyLoading: false,
        pageNum: 1
      };
    },
    computed: {
      ...mapGetters({
        historyList: 'historyList',
        languageVal: 'languageVal'
      })
    },
    mounted() {
      this.getHistory(`pageNum=1&pageSize=10&orderBy=created_at desc&tokenId=${this.$route.query.code}`);
    },
    methods: {
      getHistory(str) {
        this.historyLoading = true;
        this.$store.dispatch('getctHistory', str).then(() => {
          this.historyLoading = false;
        }).catch((err) => {
          this.$message.error(err);
          this.historyLoading = false;
        });
      },
      handleCurrentChange(v) {
        this.getHistory(`pageNum=${v}&pageSize=10&orderBy=created_at desc&tokenId=${this.$route.query.code}`);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

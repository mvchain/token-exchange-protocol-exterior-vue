<template>
  <div>
    <el-table
      :data="historyList.list"
      v-loading="historyLoading"
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="单号"
        align="center"
        width="110"
        >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="时间"
        align="center"
        width="170"
        >
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{scope.row.type === 0 ? '充值' : '提现'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="金额"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="hash"
        label="地址"
        align="right"
        width="580"
      >
        <template slot-scope="scope">
          <p><a target="_blank" :href="`https://etherscan.io/address/${scope.row.type === 0 ? scope.row.fromAddress : scope.row.toAddress}`">{{scope.row.type === 0 ? scope.row.fromAddress : scope.row.toAddress}}</a></p>
          <p><a target="_blank" :href="`https://etherscan.io/tx/${scope.row.hash}`">{{scope.row.hash}}</a></p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{scope.row.status === 0 ? '等待' : scope.row.status === 1 ? '进行' : scope.row.status === 2 ? '完成' : '失败'}}</span>
        </template>
      </el-table-column>
    </el-table>
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
        historyList: 'historyList'
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

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

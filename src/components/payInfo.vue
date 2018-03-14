<template>
  <div>
    <el-table
      v-loading="loading"
      :data="payList.list"
      :border="false"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        header-align="center"
        width="70">
      </el-table-column>
      <el-table-column
        width="220"
        label="付款账号"
      >
        <template slot-scope="scope">
          <span>{{scope.row.payAccountRealName}}({{scope.row.payAccountName}})</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收款账号">
        <template slot-scope="scope">
          <span>{{scope.row.receiveAccoutRealName}}({{scope.row.receiveAccoutName}})</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="金额(元)">
        <template slot-scope="scope">
          <span>{{scope.row.amount | formatCurrency}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="付款日期">
        <template slot-scope="scope">
          <span>{{scope.row.payTime|timeFilter}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="private-undertake-pag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="payList.total">
      </el-pagination>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {mapGetters} from 'vuex';
  export default {
    props: {
      _index: String
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        taskId: this.$route.query.id
      };
    },
    computed: {
      ...mapGetters({
        payList: 'payList'
      })
    },
    mounted() {
      this.payListAjax();
    },
    methods: {
      payListAjax() {
        this.loading = true;
        let str = `?taskId=${this.taskId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`;
        this.$store.dispatch('getPayList', str).then(() => {
          this.loading = false;
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.payListAjax();
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .private-undertake-pag
    text-align: center;
    margin-top: 20px;
</style>

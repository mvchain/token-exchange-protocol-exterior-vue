<template>
  <div>
    <el-table
      :data="workList.list"
      :border="false"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="70"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="作业名称"
      >
      </el-table-column>
      <el-table-column
        label="作业大小"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.attachmentVO">{{scope.row.attachmentVO.size | bitFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="上传时间">
        <template slot-scope="scope">
          <span>{{scope.row.submissionAt | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="作业状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | approvalFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="验收时间">
        <template slot-scope="scope">
          <span>{{scope.row.acceptAt | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="验收人">
        <template slot-scope="scope">
          <span>{{scope.row.acceptorRealName?scope.row.acceptorRealName:'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/private/release/relApproval',query:{pid:pid,obj:encodeURI(JSON.stringify(scope.row))}}" class="showInfo">查看详情</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="private-undertake-pag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="workList.total">
      </el-pagination>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {mapGetters} from 'vuex';
  export default {
    props: {
      missionInfo: Object,
      paneNum: String
    },
    computed: {
      ...mapGetters({
        workList: 'workList'
      })
    },
    data() {
      return {
        showFlag: false,
        activeName: 'first',
        pageNum: 1,
        pageSize: 10,
        loading: false,
        pid: this.$route.query.id
      };
    },
    methods: {
      handleCurrentChange(v) {
        this.pageNum = v;
        this.payListAjax();
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>

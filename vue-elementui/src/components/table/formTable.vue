<template>
  <div class="crm-main">
    <el-form :inline="true" :model="formInline"  class="demo-form-inline crm-form">
     <el-row>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line crm-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
       <el-form-item label="即时配送">
         <el-switch on-text="" off-text="" v-model="formInline.delivery"></el-switch>
       </el-form-item>
       <el-form-item label="学历">
         <el-checkbox-group v-model="formInline.type">
           <el-checkbox label="博士" name="type"></el-checkbox>
           <el-checkbox label="硕士" name="type"></el-checkbox>
           <el-checkbox label="本科" name="type"></el-checkbox>
           <el-checkbox label="专科" name="type"></el-checkbox>
         </el-checkbox-group>
       </el-form-item>
     </el-row>
      <el-row>
      <el-form-item label="用户名称">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="crm-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </el-row>
    </el-row>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'crmMenu',
  data () {
    return {
      formInline: {
        user: '',
        date1: '',
        date2: '',
        region: '',
        delivery:false,
        type:[]
      },
      form:{
        address:'',
        name:'',
        date:'',
        sex:''
      },
      activeName: 'first',
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 50
      },
      tableData: [{
        date: '2017-05-01',
        name: '士兵76',
        region: '男',
        address: '国王大道'
      }, {
        date: '2017-05-02',
        name: '源氏',
        region: '男',
        address: '尼泊尔'
      }, {
        date: '2017-05-03',
        name: '黑百合',
        region: '女',
        address: '沃斯卡亚工业区'
      }, {
        date: '2017-05-04',
        name: '猎空',
        region: '女',
        address: '国王大道'
      }, {
        date: '2017-05-03',
        name: '查莉娅',
        region: '女',
        address: '沃斯卡亚工业区'
      }, {
        date: '2017-05-03',
        name: '禅雅塔',
        region: '男',
        address: '尼泊尔'
      }, {
        date: '2017-05-03',
        name: '半藏',
        region: '女',
        address: '花村'
      }, ],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage3: 1,
    }
  },
  methods: {
    showTime() {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          });
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      console.log(this.tableData[index])
      this.form = this.tableData[index]
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style scoped>

  .crm-pagination{
    margin-top: 15px;
    text-align: center;
  }

  .crm-main{
    padding:0 15px ;
  }
  .crm-form{
    margin-top:20px ;
  }
  .crm-form .el-form-item{
    margin-bottom:20px;
  }
  .crm-center{
    text-align: center;
  }
</style>

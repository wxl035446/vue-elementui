<template>
<div>
  <div class="alert alert-block alert-success">
    欢迎使用
    <strong class="green">
      钱包osp后台管理系统
    </strong>
  </div>
  <el-row class="el-conner" :gutter="30">

    <el-col class="" :span="6"><div class="grid-content el-bgBlue "><router-link class="el-module" to="/home/walletUser">钱包用户</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgRed " ><router-link class="el-module" to="/home/payTradeList">交易明细</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgGreen "><router-link class="el-module" to="/home/accountInquiry">结算查询</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgGey "><router-link class="el-module" to="/home/incidentMarket">营销事件管理</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgWin "><router-link class="el-module" to="/home/couponType">钱包券管理</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgPurple"><router-link class="el-module" to="/home/discountRules">折扣规则</router-link></div></el-col>
    <el-col :span="6"><div class="grid-content el-bgDefault "><router-link class="el-module" to="/home/billMatch">对账管理</router-link></div></el-col>
  </el-row>
</div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
.el-conner{
  padding: 30px;
}
.alert {
  font-size: 14px;
  border-radius: 0;
}
.alert-success {
  color: #468847;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.alert {
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.el-module{
  text-align: center;
  display: block;
  padding: 45px 0;
  color: #ffffff;
  font-size: 18px;
}
.el-conner .el-col{
 margin-bottom: 30px;
}
.el-conner .grid-content{
  border-radius:6px;
}
</style>

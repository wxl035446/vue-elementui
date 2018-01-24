<template >
  <el-row type="flex" class="row-bg crm-line" :default-load="pageRoutes">
    <span class="crm-path" @click="goHome"><i class="icon-home  crm-arrow crm-homeIcon"></i>{{home}}</span>
    <span class="crm-path" @click="goPages"><i class="el-icon-arrow-right crm-arrow"></i>{{child}}</span>
    <span class="crm-path" @click="goSubPages" v-if="showPath"><i class="el-icon-arrow-right crm-arrow"></i>{{subChild}}</span>
  </el-row>
</template>
<script>
export default {
  name: 'crmPath',
  data () {
    return {
      showPath:false,
      home:"主页",
      child:"",
      childPath:"",
      subChild:'',
      subChildPath:'',
      path:"",
    }
  },
  methods: {
    goHome(){
      this.$router.push({path: '/',})
    },
    goPages(){
      this.$router.push({path: this.childPath})
    },
    goSubPages(){
      this.$router.push({path: this.subChildPath})
    }
  },
  computed: {
    pageRoutes(){
      let  pathAll=this.$route.path
      let pathArr=pathAll.split('/')
      if(pathArr.length==4){
        this.showPath=true;
        this.subChild=this.$route.name;
        this.subChildPath=this.$route.path;
      }
      else if(pathArr.length==3){
        this.showPath=false;
        this.child=this.$route.name;
        this.childPath=this.$route.path;
      }
    }
  }
}
</script>
<style scoped>
  .crm-line{
    padding:8px 15px;
    background: #f7f7f7;
    border-top:1px solid #e7e7e7 ;
    border-bottom:1px solid #e7e7e7 ;
  }
  .crm-path{
    height:20px;
    line-height:20px;
    padding:5px 5px ;
    display: inline-block;
    font-size:13px;
    min-width:30px ;
    color: #6fb3e0;
    cursor: pointer;
  }
  .crm-arrow{
    margin-right:8px ;
  }
  .crm-homeIcon{
    margin-left: 4px;
    font-size: 20px;
    position: relative;
    top: 2px;
  }

</style>

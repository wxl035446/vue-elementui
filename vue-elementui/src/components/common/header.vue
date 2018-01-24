<template >
  <nav class="crm-header">
      <div class="crm-logo el-fl">
           <img src="../../assets/images/logo.png" />
      </div>
    <span class="crm-osp el-fl">OSP</span>
    <span class="el-fr el-clear" >
      <span class="crm-avatar el-fl"  > <img src="../../assets/images/login_avatar.jpg" /></span>
      <span class="crm-name el-fl"  >Hello ,{{username}} 您好！</span>
      <span class="crm-set el-fl" v-if="display"><img src="../../assets/images/setIcon.png"/></span>
      <el-dropdown :hide-on-click="false"  trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                <span class="crm-logout el-fl"><img src="../../assets/images/logout.png"/></span>
                </span>
        <el-dropdown-menu slot="dropdown" menu-align="center" >
          <el-dropdown-item v-if="display">设置</el-dropdown-item>
          <el-dropdown-item v-loading.fullscreen.lock="fullscreenLoading" command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>
  </nav>
</template>
<script>
export default {
  name: 'crmHeader',
  data() {
    return {
      fullscreenLoading: false,
      display:false,
      name: ''
    }
  },
  computed:{
    username(){
      let username = localStorage.getItem('ms_username');
      return username ? username : this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if(command == 'loginout'){
        localStorage.removeItem('ms_username');
        //删除cookie并跳到登录页
        this.$store.state.isLoging= true;
        this.delCookie('token');
        this.fullscreenLoading = true;// 退出加载效果
        //定时器
        setTimeout(()=>{
          this.$router.push('/login/');
          this.$store.state.isLoging= false;
          this.fullscreenLoading = false;
        },1000)
      }
    }
  }
}
</script>
<style scoped>
  .crm-logo{
    background: #2c445a ;
    display:block;
    padding:8px 0;
    text-align: left;
    width: 200px;
  }

  .crm-logo img{
    margin-left:20px ;
    height: 33px;
  }
  .crm-avatar, .crm-name{
    margin-right:5px;
    padding:8px 0;
  }
  .crm-name{
    color:#999 ;
  }
  .crm-avatar img{
    width:36px;
    height:36px;
    border-radius:100%;
  }
  .crm-header{
    position: fixed;
    width: 100%;
    z-index:100;
    top:0px;
    background: #ffffff;
    -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  }
  .crm-header span{
    height:36px;
    line-height:36px;
    display: inline-block;
    text-align: center;
    font-size:15px ;

  }
  .crm-osp{
    padding:8px 15px ;
    color:#999;
  }
  .crm-set{
    margin-left:11px;
    padding:8px 0;
  }
  .crm-logout{
    margin-left: 10px;
    margin-right:20px;
    padding:8px 0;
  }
  .crm-set img, .crm-logout img{
    width:20px;
    height:20px;
    display: inline-block;
    vertical-align: middle;
    cursor:pointer;
  }
</style>

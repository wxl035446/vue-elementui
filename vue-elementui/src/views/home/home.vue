<template>
  <div class="container" >
      <!--header  start-->
      <crm-header></crm-header>
      <!-- header  end -->
      <!-- menu  start -->
      <crm-menu @upMsg="change"  :child-msg="isSidbar" ></crm-menu>
      <!-- menu  end -->
      <div class="crm-right"  :style="{ paddingLeft: padleft + 'px' }">
        <div class="grid-content bg-purple-light">

          <!--path  start-->
          <crm-path></crm-path>
          <!--path  end-->

          <transition name="el-zoom-in-top">

            <router-view v-show="show"></router-view>

          </transition>

        </div>
      </div>
  </div>
</template>
<script>
import crmMenu from 'components/common/menu'
import crmHeader from 'components/common/header'
import crmPath from 'components/common/path'
export default {
  data () {
    return {
      show: true,
      isSidbar:false,
      padleft:'',
      isLogin: false,
      userInfo: { //保存用户信息
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null
      }
    }
  },
  methods:{
    checkLogin(){
      //检查是否存在token
      //cookie操作方法在
      if(!this.getCookie('token')){
        //如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }else{
       return;
      }
    },
    // 左侧菜单栏收缩伸展
    change(msg) {
      this.isSidbar = msg;
      if(this.isSidbar){
        this.padleft=52
      }else{
        this.padleft=200
      }
    },

    getUserInfo(){
      this.$store.commit('updateUserInfo', this.userInfo);
    },
  },
  //监听路由检查登录
  watch:{
    "$route" : 'checkLogin'
  },
  //进入页面时
  created() {
    this.checkLogin();//第一次打开页面需要检测用户是否存在
  },
  mounted(){
    //组件开始挂载时获取用户信息
    //this.getUserInfo();
  },
  components: { crmMenu, crmHeader, crmPath }
}
</script>
<style scoped>
  .crm-right{
    padding-left:200px;
    padding-top:52px;
    min-width:986px;
  }
</style>

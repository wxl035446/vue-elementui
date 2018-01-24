<template id="Menu">
  <el-menu :default-active="onRoutes" :unique-opened="true" class="el-menu-vertical-demo crm-left" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>

    <el-menu-item index="/home/table"><i class="el-icon-menu"></i><span slot="title">基础表格</span></el-menu-item>
    <el-menu-item index="/home/charts"><i class="el-icon-menu"></i><span slot="title">图表</span></el-menu-item>
    <el-menu-item index="/home/mapDemo"><i class="el-icon-menu"></i><span slot="title">map地图</span></el-menu-item>

    <div class="sidebar-collapse" id="sidebar-collapse">
      <i :class="isArrow" data-icon1="icon-double-angle-left" @click="sidebar" data-icon2="icon-double-angle-right"></i>
    </div>
  </el-menu>
</template>
<script>
export default {
  props: ['childMsg'],
  data () {
    return {
       display:false,
       isCollapse: false,
       isArrow:'icon-double-angle-left',
    }
  },
  methods: {
    sidebar(){ // 菜单栏展开切换
        if(this.isCollapse){
          this.isCollapse=false
          this.isArrow="icon-double-angle-left"
          this.$emit('upMsg',false);
        }else{
          this.isCollapse=true
          this.isArrow="icon-double-angle-right"
          this.$emit('upMsg',true);
        }
    },
    loadSidebar(){
      if(this.childMsg){
        this.isCollapse=true
        this.isArrow="icon-double-angle-right"
      }
    },
    handleSelect (key, route) { // 左侧菜单栏选中方法
     // console.log(key, route);

    },
    handleOpen (key, keyPath) { // 左侧菜单栏展开方法
     // console.log(key, keyPath);
    },
    handleClose (key, keyPath) { // 左侧菜单栏收缩方法
     // console.log(key, keyPath);
    },
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  mounted(){
   this.loadSidebar();
  }
}
</script>
<style scoped>
  .crm-left{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index:90;
  }
  .sidebar-collapse {
    text-align: center;
    padding: 3px 0;
    margin-top:15px;
    position: relative;
  }
  .sidebar-collapse:before {
    content: "";
    display: inline-block;
    height: 0;
    border-top: 1px dashed #B5B5B5;
    position: absolute;
    left: 15px;
    right: 15px;
    top: 13px;
  }
  .sidebar-collapse>[class*="icon-"] {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    color: #2c445a;
    border: 1px solid #B5B5B5;
    padding: 0 5px;
    line-height: 18px;
    border-radius: 16px;
    background-color: #B5B5B5;
    position: relative;
  }
</style>

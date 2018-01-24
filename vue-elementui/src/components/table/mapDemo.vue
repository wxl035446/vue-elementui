<template>
  <div class="crm-main">
    <h2>vue+webpack+axios+百度地图-->实现父子组件的通信</h2>
    <h3>示例一：跳跃的图标(没有使用axios)</h3>
    <MapView :m="giveData"></MapView>
    <br/><br/>
    <h3>示例二：给多个点添加信息窗口(使用了axios)</h3>
    <OutMap :om="giveOutData"></OutMap>
  </div>
</template>
<script>
  import MapView from 'components/common/Map.vue'
  import OutMap from 'components/common/OutMap.vue'
  export default {
    data () {
      return {
        giveData:{  //vue2.0将数据定位对象的形式，实现父子组件的通信
          height:300,
          longitude:116.404,
          latitude:39.915
        },
        giveOutData:{
          height:400,
          longitude:116.417854,
          latitude:39.921988
        }
      }
    },
    components:{
      MapView,
      OutMap
    }
  }
</script>
<style scoped>
  .crm-main{
    padding:0 15px ;
  }

</style>

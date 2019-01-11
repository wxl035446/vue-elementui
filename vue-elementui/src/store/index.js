/*
 * Created with ***
 * Date: 2018/1/8
 * Time: 15:57
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//Vuex配置
//定义状态变量
const state = {
  domain:'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
  isLoging: false, //登录状态
  userInfo: { //保存用户信息
    nick: null,
    ulevel: null,
    uid: null,
    portrait: null
  },
  mapData:[
    {
      "point1":116.417854,
      "point2":39.921988,
      "address":"地址：北京市东城区王府井大街88号乐天银泰百货八层"
    },
    {
      "point1":116.406605,
      "point2":39.921585,
      "address":"地址：北京市东城区东华门大街"
    },
    {
      "point1":116.412222,
      "point2":39.912345,
      "address":"地址：北京市东城区正义路甲5号"
    }
  ]
}

//用export default 封装代码，让外部可以引用
export default new Vuex.Store({
  state,
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
})

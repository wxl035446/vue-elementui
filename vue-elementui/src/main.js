import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
/* 引入 element ui */
import ElementUI from 'element-ui'
import swal from 'sweetalert'
import 'element-ui/lib/theme-chalk/index.css'

// VueQuillEditor引入富文本编辑器  时间插件
import VueQuillEditor from 'vue-quill-editor'

import VueDatepickerLocal from 'vue-datepicker-local'

// charts 图表插件引入
import VCharts from 'v-charts'

//axios 引入
import axios from 'axios'



// ajax请求过期时间，最长五秒，超时不候
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * 时间格式化
 */
Vue.prototype.dateFormat = function (date,fmt) {
  if(date === '' || date == undefined){
    return ''
  }
  var that = new Date(date)
  var o = {
    "M+": that.getMonth() + 1, //月份
    "d+": that.getDate(), //日
    "h+": that.getHours(), //小时
    "m+": that.getMinutes(), //分
    "s+": that.getSeconds(), //秒
    "q+": Math.floor((that.getMonth() + 3) / 3), //季度
    "S": that.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
}

// uuid 动态生成
Vue.prototype.uuid = function(){
  var len=32;//32长度
  var radix=16;//16进制
  var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
  return uuid.join('');
}

global.merchantPostLink = ''
global.accountPostLink =  ''
global.couponPostLink=''
global.incidentMarket = ''
global.bankPostLink=''
global.discountPostLink = ''
global.billLink = ''
global.walletUser = ''
global.login = ''
global.payTrade = ''
if(process.env.NODE_ENV == 'development'){
  global.login = 'http://10.0.53.110:7089'
}
// 将axios 放入到Vue的原型链中，所有的组件都可以使用
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(swal)
Vue.use(VueQuillEditor)
Vue.use(VueDatepickerLocal)
/**
 * 格式化时间的
 *
 */
//元素的补零计算
function addZero(val){
  if(val < 10){
    return "0" +val;
  }else{
    return val;
  }
};
//日期格式化
Vue.prototype.filterDate = function (value,type) {
  let dataTime="";
  let data = new Date();
  data.setTime(value);
  let year   =  data.getFullYear();
  let month  = addZero( data.getMonth() + 1);
  let day    =  addZero(data.getDate());
  let hour   =  addZero(data.getHours());
  let minute =  addZero(data.getMinutes());
  let second =  addZero(data.getSeconds());
  if(type == "YMD"){
    dataTime =  year + "-"+ month + "-" + day;
  }else if(type == "YMDHMS"){
    dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
  }else if(type == "HMS"){
    dataTime = hour+":" + minute+":" + second;
  }else if(type == "YM"){
    dataTime = year + "-" + month;
  }
  return dataTime;//将格式化后的字符串输出到前端显示
};
//日期转化为时间戳
Vue.prototype.filterToString= function (value,type) {
  var dateTime=new Date();
  dateTime.setTime(value);
  dateTime.toString();
  return dateTime;
}
//日期格式化
Vue.prototype.filterDateFrm = function (value,type) {
  var valueStr = Date.parse(new Date(value));
  let dataTime="";
  let data = new Date();
  data.setTime(valueStr);
  let year   =  data.getFullYear();
  let month  = addZero( data.getMonth() + 1);
  let day    =  addZero(data.getDate());
  let hour   =  addZero(data.getHours());
  let minute =  addZero(data.getMinutes());
  let second =  addZero(data.getSeconds());

  if(type == "YMD"){
    if(value){
      dataTime =  year + "."+ month + "." + day;
    }
    else{
      dataTime = "xxxx . xx . xx";
    }
  }else if(type == "YMDHMS"){
      if(value){
          dataTime = year + "."+month + "." + day + " " +hour+ ":"+minute+":" +second;
      }
      else{
          dataTime = "xxxx . xx . xx xx : xx : xx";
      }
  }
  return dataTime;//将格式化后的字符串输出到前端显示
};

//数字显示去00格式化
Vue.prototype.filterInter = function (value) {
  let frmVal=value.split('.')
  let frmvalue='';
  let firstNum=parseFloat(frmVal[1].substr(0,1));
  let secondNum=parseFloat(frmVal[1].substr(1,2));
  if(secondNum==0){
    frmvalue=parseFloat(frmVal[0])+firstNum/10;
  }else{
    frmvalue=parseFloat(value);
  }
  return frmvalue;//转化为字符串
};


//时间转化为13个字符 10个字符
Vue.prototype.filterDateStr = function (value,num) {
  let stringTime = value;
  let timesStr = Date.parse(new Date(stringTime));
  if(num==13){
    timesStr=timesStr;
  }else{
    timesStr=timesStr/1000;
  }
  return timesStr;//转化为字符串
};

//折扣清零操作
Vue.prototype.filterDiscount = function (value) {
  let disNum=0;
  if(value){
    var num=value.toString().substr(1,1);
    if(num=='0'){
      disNum=value.toString().substr(0,1)
    }else{
      disNum=value;
    }
  }
  return disNum;//转化为字符串
};
//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

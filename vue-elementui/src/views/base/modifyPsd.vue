<template>
  <div class="login-wrap">
    <div class="ms-title">修改密码</div>
    <div class="ms-login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="originPassword">
          <el-input type="password" autoComplete="off" placeholder="请输入原密码" v-model="loginForm.originPassword" ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input type="password" autoComplete="off" placeholder="请输入新密码" v-model="loginForm.newPassword" ></el-input>
        </el-form-item>
        <el-form-item prop="duplicateNewPassword" >
          <el-input type="password" autoComplete="off" placeholder="请再次输入新密码" v-model="loginForm.duplicateNewPassword" @keyup.enter.native="saveForm('loginForm')"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" class="el-winpMin"  size="big" v-loading.fullscreen.lock="fullscreenLoading"   @click="saveForm('loginForm')">修改</el-button>
          <el-button type="info" class="el-winpMin"  size="big"  @click="goback">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  //MD5 加密引入
  import Md5 from 'js-md5';
  export default {
    data: function(){
      return {
        fullscreenLoading: false,
        loginForm: {
          username: '',
          originPassword: '',
          newPassword:'',
          duplicateNewPassword:'',

        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空!', trigger: 'blur' }
          ],
          originPassword: [
            { required: true, message: '密码不能为空!', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '新密码不能为空!', trigger: 'blur' }
          ],
          duplicateNewPassword: [
            { required: true, message: '重复新密码不能为空!', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //修改密码
      goback(){
        this.$router.push('/login');
      },
      //修改密码保存
      saveForm(formName){
        const self = this;
        const dataUrl= login+'/fin-ospsso-rest/auth/modifyPassword.htm';
        var originPasswordmd5 =Md5(self.loginForm.originPassword);//md5加密
        var newPasswordmd5 =Md5(self.loginForm.newPassword);//md5加密
        var duplicateNewPasswordmd5 =Md5(self.loginForm.duplicateNewPassword);//md5加密
        console.log(duplicateNewPasswordmd5)
        const data={
          username: self.loginForm.username,
          originPassword:originPasswordmd5,
          newPassword:newPasswordmd5,
          duplicateNewPassword:duplicateNewPasswordmd5,
        };
        self.$refs[formName].validate((valid) => {
          if (valid) {
            const params={'data':data,'transactionUuid':self.uuid()}
            self.$http.post(dataUrl, params).then((response)=>{
              console.log(response)
              if(response.data.code === 'S0A00000'){
                self.fullscreenLoading = true;
                setTimeout(()=>{
                  self.fullscreenLoading = false;//加载状态
                  //登录成功后默认是
                  self.$router.push('/login');
                },3000)
              }else{
                self.$message({showClose: true,duration:2000,type: 'error',message:response.data.msg});
                return false;
              }
            })
          }else {
            self.$message({showClose: true,duration:2000,type: 'error',message:response.data.msg});
            return false;
          }

        });
      },
    },
    created(){
    },
  }
</script>

<style  lang="less" scoped>
  .login-title{
    height:30px;
    line-height: 30px;
    text-align: center;
    margin-bottom:15px ;
  }
  .login-wrap{
    position: relative;
    width:100%;
    height:100vh;
    background: url('../../assets/images/modbg.jpg') no-repeat;
    background-size: cover;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:270px;
    margin:-150px 0 0 -190px;
    padding:25px 40px 40px 40px ;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65);
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
  }
  .login-tip{
    font-size:12px;
    line-height:30px;
    color:#999;
    margin-top: -25px;
  }

</style>

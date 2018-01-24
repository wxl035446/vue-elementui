<template>
    <div class="login-wrap">
        <div class="ms-title">润钱包osp后台管理系统</div>
        <div class="ms-login">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
              <div class="login-title">用户登录</div>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" autoComplete="off"  placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>

                <div class="login-btn">
                  <el-button type="primary" class="el-winpMin"  size="big" v-loading.fullscreen.lock="fullscreenLoading"   @click="submitForm('loginForm')">登录</el-button>
                  <el-button type="info" class="el-winpMin"  size="big"  @click="restFrom">重置</el-button>
                </div>
              <el-form-item>
                <span class="el-alink" @click="modifyPsd">修改密码</span>
              </el-form-item>
                <p class="login-tip" >Tips : 填写正确用户和密码。</p>
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
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
          //修改密码
          modifyPsd(){
            this.$router.push('/modifyPsd');
          },
          restFrom(){
            var loginForm={
                username: '',
                password: ''
              }
              this.loginForm=loginForm;
          },
          //获取用户权限
          submitForm(formName){
            const self = this;
           /* const dataUrl= login+'/fin-ospsso-rest/auth/login.htm';*/
            var passwordmd5 =Md5(self.loginForm.password);//md5加密
           /* const data={
              'username':self.loginForm.username,
              'password':passwordmd5
            };*/
            self.$refs[formName].validate((valid) => {
              if (valid) {
               /* const params={'data':data,'transactionUuid':self.uuid()}
                  self.$http.post(dataUrl, params).then((response)=>{
                    if(response.data.code === 'S0A00000'){*/
                      localStorage.setItem('ms_username',self.loginForm.username);
                      self.fullscreenLoading = true;
                    /*  //登录状态1天后过期
                      let expireDays = 1000 * 60 * 60 * 24 * 1;
                      self.setCookie('token', response.data.data.token, expireDays);
                      setTimeout(()=>{*/
                        self.$store.state.isLoging = true;
                        self.fullscreenLoading = false;//加载状态
                        //登录成功后默认是
                        self.$router.push('/home/main');
                   /*   },3000)
                    }else{
                      self.$message({showClose: true,duration:2000,type: 'error',message:response.data.msg});
                      return false;
                    }
                   })*/
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
        background: url('../../assets/images/bg.jpg') no-repeat;
        background-size: cover;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #2d2f33;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:240px;
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

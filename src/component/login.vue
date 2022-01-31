<template>
  <div class="login" style="width: 100% ; height: 100vh ; background-color: white ; overflow: hidden ">
    <div style="width: 80% ; margin: 130px  auto ; position: absolute">
      <el-row :gutter="24">
        <el-col :span="8" :offset="8">

          <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="rules">
            <el-form-item label="账号" prop="name">
              <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.name"
                        placeholder="电话号码 / 邮箱 / 昵称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
            </el-form-item>



            <el-form-item label="验证码" prop="code">
              <el-row :span="24">
                <el-col :span="12">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="12">
                  <div class="login-code" @click="refreshCode">
                    <!--验证码组件-->
                    <sidentify :identifyCode="identifyCode"></sidentify>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>




            <el-form-item>
              <el-row :gutter="15">
                <el-col :span="5" :offset="3">
                  <el-button type="primary" @click="login('loginForm')">登录</el-button>
                </el-col>
                <el-col :span="5" :offset="5">
                  <el-button type="primary" @click="$router.push('/register')">注册</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import request from "../utils/request";
import sidentify from "./sidentify";

export default {
  name: 'login',
  components:{sidentify},
  // props: {
  //   loginForm: {
  //     type: Object,
  //     default() {
  //       return {}
  //     }
  //   }
  // },
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    };
    return {
      loginForm:{
        name:'',
        password: '',
        code:''
      },
      identifyCodes: '1234567890',
      identifyCode: '',

      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code:[
          {required:true , validator:validateCode , trigger : 'blur'}
        ]
      },

    }

  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
      }
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/login", this.loginForm).then(res => {
            if (res.code === '1') {
              // session 处理
              sessionStorage.setItem("user",JSON.stringify(res.data))
              // cookie 处理
              localStorage.setItem("user",JSON.stringify(res.data))
              this.$router.push({
                path: '/mainPage'
              });
            } else {
              this.$message.error('登录' + res.msg + '!   ' + res.data + "!");
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
  },
  created(){
    this.refreshCode()
  }
}
</script>

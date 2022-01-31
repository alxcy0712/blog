<template>
  <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="registerForm.name" placeholder="输入您的姓名"></el-input>
    </el-form-item>

    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="registerForm.nickName" placeholder="输入您的昵称"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email" placeholder="输入您常用的邮箱"></el-input>
    </el-form-item>

    <el-form-item label="手机号" prop="phoneNumber">
      <el-input v-model="registerForm.phoneNumber" placeholder="输入您常用的手机号"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" type="password" placeholder="密码长度8～17位"></el-input>
    </el-form-item>

    <el-form-item label="请再次输入密码" prop="password2">
      <el-input v-model="registerForm.password2" type="password"></el-input>
    </el-form-item>

    <el-button @click="submit('registerForm')">提交</el-button>

  </el-form>
</template>

<script>
import request from "../utils/request";

export default {
  name: "register",
  data(){
    var checkName = (rule , value , callback)=>{
      if(value===''){
        return callback(new Error('姓名不能为空'));
      }
      callback();
    };
    var checkNickName = (rule , value , callback)=>{
      if(value===''){
        return callback(new Error('昵称不能为空'));
      }
      callback();
    };
    var checkPassword = (rule , value , callback)=>{
      if(value===''){
        return callback(new Error('密码不能为空'))
      }else{

        if(value.length < 8 && value.lenth > 17){
          return callback(new Error('密码长度应在8～17范围内'))
        }
        callback();
      }
    };
    var checkPassword2 = (rule , value , callback)=>{
      if(value !==  this.registerForm.password){
        return callback(new Error('两次密码需要一致'))
      }
      callback();
    };
    var checkPhoneNumber = (rule , value , callback)=>{
      if(!(/^1[3456789]\d{9}$/.test(value))){
        return callback(new Error('手机号不合法'))
      };
      callback();
    };
    var checkEmail = (rule , value,  callback)=>{
      if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value))){
        return callback(new Error('邮箱不合法'))
      };
      callback();
    }
    return {
      registerForm:{
        name:'',
        nickName:'',
        email:'',
        phone:'',
        password:'',
        password2:''
      },
      rules:{
        name:[
          {require:true , validator:checkName , trigger:'blur'}
        ],
        nickName:[
          {require:true , validator:checkNickName , trigger:'blur'}
        ],
        password:[
          {require:true , validator:checkPassword , trigger:'blur'}
        ],
        password2:[
          {request:true , validator:checkPassword2 , trigger:'blur'}
        ],
        phoneNumber:[
          {require:true , validator:checkPhoneNumber , trigger:'blur'}
        ],
        email:[
          {require:true , validator:checkEmail , trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    submit(form){
      this.$refs[form].validate((valid)=>{
        if(valid){

          request.post('/register' , this.registerForm)
          .then(res=>{
            if(res.msg === '成功'){
              sessionStorage.setItem("user",JSON.stringify(res.data))
              this.$router.push('/mainPage')
            }else{
              this.$message.error(res.data);
            }
          })

        }
      })
    }
  }
}
</script>

<style scoped>

</style>

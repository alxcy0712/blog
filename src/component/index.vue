<template>
  <div class="index">
    <el-button @click="aclick()">{{msg}}</el-button>
    <div>
      <p>{{userInfo}}</p>
    </div>
    <div>
      <el-table :data="userData" style="width: 100%">
        <el-table-column prop="uid" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="180">
        </el-table-column>
        <el-table-column prop="exp" label="经验" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";

export default {
  name: "index",
  props: {
    userInfo:String,
    userData:{
      type:Array,
      default(){
        return [];
      }
    },
  },
  data(){
    return{
      msg:'点击'
    }
  },
  methods:{
    aclick(){
      request.get('/user/findAll').then(res=>{
        this.userData = res;
      }).catch(function (error){
        console.log(error)
      })
    }
  }
}
</script>

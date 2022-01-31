<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b">
          <el-menu-item index="/mainPage">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">菜单栏</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item index="3">Item1</el-menu-item>
          <el-menu-item index="4">Item2</el-menu-item>
          <el-menu-item index="5">Item3</el-menu-item>

          <el-menu-item index="8">消息中心</el-menu-item>


          <el-submenu index="/login" style="float:right">
            <template slot="title"><i class="el-icon-user"></i></template>
            <el-card class="box-card" body-style="background-color:#545c64 ; color:#fff">
              <div class="hasLogined" v-if="showUser">

                <div class="haslogined-title" style="text-align: center">
                  {{ userName }}
                </div>
                <el-divider></el-divider>
                <div class="hasLogined-main" style="align-items: center">
                  <el-menu-item>个人中心</el-menu-item>
                  <el-menu-item>订单详情</el-menu-item>
                  <el-menu-item>Item3</el-menu-item>
                  <el-menu-item>Item4</el-menu-item>
                  <el-menu-item>Item5</el-menu-item>
                  <el-divider></el-divider>
                  <el-menu-item index="/logout">退出登录</el-menu-item>
                </div>
              </div>
              <div class="noLogined" v-if="!showUser">
                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/register">注册</el-menu-item>
              </div>
            </el-card>
          </el-submenu>

          <h3></h3>
        </el-menu>
      </el-header>




      <el-main>

        <router-view></router-view>
      </el-main>





      <el-footer>
        <p>辽ICP备2021010382号-1</p>
        <a href="https://beian.miit.gov.cn">工信部首页</a>
      </el-footer>
    </el-container>


  </div>
</template>


<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>


<script>

export default {
  name: "layout",
  data() {
    return {
      userName: '',
      showUser: false,
    }
  },
  created() {
    if (!JSON.parse(sessionStorage.getItem('user'))) {
      this.userName = '请登录';
      this.showUser = false;
    } else {
      this.userName = JSON.parse(sessionStorage.getItem('user')).nickName;
      this.showUser = true;
    }


  }
}
</script>

<style scoped>

</style>

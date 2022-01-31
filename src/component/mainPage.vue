<template>
  <div class="mainPage">

    <el-button @click="mainPage()">主页</el-button>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    mainPage() {
      this.$router.push('/index')
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>

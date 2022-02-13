<template>
  <div>
    <Header></Header>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: '',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 放在根组件中只发一次请求，放在其他组件在调用多次时也会发起多次请求，所以放在根组件效益最好
    // 通知 Vuex 发请求获取数据存储于仓库中
    this.$store.dispatch('categoryList')
  },
}
</script>

<style></style>

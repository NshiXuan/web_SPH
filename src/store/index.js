import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopCart'
import user from './user'
import trade from './trade'

// 对外暴露 Store 类的一个实例
export default new Vuex.Store({
  // 实现 Vuex 仓库模块是开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  },
})

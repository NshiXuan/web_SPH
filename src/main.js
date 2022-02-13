import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入 MockServe.js -- mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 三级联动组件 轮播图组件 分页器 --- 全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// Element 注册组件的时候，可以挂载到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

// 统一接口 api 文件夹中的全部请求函数
// 统一引入
import * as API from '@/api'

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载默认图片
import atm from '@/assets/1.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  // 懒加载默认的图片
  loading: atm,
  attempt: 1
})

// 引入表单验证插件
import '@/plugins/validate'

new Vue({
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：当这里书写 router 的时候，组件身上都有 $route,$router 属性
  router,
  // 注册仓库：组件实例的身上会多一个属性 $store
  store,
  render: (h) => h(App),
}).$mount('#app')

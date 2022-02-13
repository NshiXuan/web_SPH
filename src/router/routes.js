// 引入组件
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 依然能二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


export default [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    children: [
      {
        path: '',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      }
    ]
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        // 其他路由跳转而来 停留在当前
        next(false)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
    // 4.路由组件能不能传递props数据？
    // 布尔值写法：只能传递params
    // 对象写法：额外的给路由组件传递一些props
    // props: { a: 1, b: 2 }
    // 函数写法：可以params参数、query参数、通过props传递给路由组件
    props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]
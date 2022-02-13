// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 引入 store
import store from '@/store'

// 使用插件
Vue.use(VueRouter);

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局守卫
router.beforeEach(async (to, from, next) => {
  // next();
  // 用户登录了才会有token 没有登录就没有
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已经登录
    if (to.path == '/login' || to.path == 'register') {
      next('/home')
    } else {
      // 访问的是非登录与非注册
      next()
      if (name) {
        next()
      } else {
        // 没有用户信息 派发 action 让仓库存储用户信息在跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token 失效了 获取不到用户信息 重新登录
          // 清除 token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录 不能去交易相关的页面 trade pay paysuccess 不能去个人中心
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是交易相关的页面
      next()
    }
  }
})

export default router
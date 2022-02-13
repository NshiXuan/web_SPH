import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  cartLst: []
}
const mutations = {
  GETCAARTLIST(state, cartLst) {
    state.cartLst = cartLst
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCAARTLIST', result.data)
    }
  },
  // 删除购物车某一产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 请求修改购物车产品的选中状态
  async UpdateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车中的全部产品
    let PromiseAll = []
    getters.cartLst.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的 Promise 添加到数组中
      PromiseAll.push(promise)
    });
    // 只要全部的上面的返回结果都成功 返会结果即为成功
    // 如果有一个失败，返回即为失败结果
    // 也就是 Promise.all 只要上面遍历只要有一次返回失败就结束抛出错误信息
    return Promise.all(PromiseAll)
  },
  // 修改全部商品的选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartLst[0].cartInfoList.forEach(item => {
      let promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartLst(state) {
    return state.cartLst[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块 uuid -> 生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token'

// home 模块的小仓库
const state = {
  goodInfo: {},
  // 游客的临时身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 当前这个函数如果执行返回一个 Promise
    if (result.code = 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {
  // 简化路径导航的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 简化售卖属性的数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

import { reqGetSearchInfo } from '@/api'

// search 模块的小仓库
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取 Search 模块
  async getSearchList(context, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      context.commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  // 当前的形参 state 为当前仓库中的 state
  goodsList(state) {
    // 这样书写是有问题的，在有网的情况下没问题，但是断网后没有请求到 searchList 的数据，就没有 goodslist ，返回一个 undefined
    return state.searchList.goodsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}

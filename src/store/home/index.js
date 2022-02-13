import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

// home 模块的小仓库
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过API里面的接口函数调用，向服务器发起请求获取数据
  async categoryList(context) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      context.commit('GETCATEGORYLIST', result.data)
    }
  },
  async getBannerList(context) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      context.commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList(context) {
    let result = await reqFloorList()
    if (result.code == 200) {
      context.commit('GETFLOORLIST', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}

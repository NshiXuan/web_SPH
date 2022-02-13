// 先引入 mockjs 模板
import Mock from 'mockjs'
// 引入 json  
// webpack 中 JSON 默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

// mock 数据：第一个参数请求地址，第二个参数：请求数据
// 模拟首页大的轮播图数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })
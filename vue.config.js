module.exports = {
  productionSourceMap: false,
  // 关闭 eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.98.123.211"
      }
    }
  }
}
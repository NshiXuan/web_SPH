// Vue 插件暴露一个对象
let myPlugins = {}

myPlugins.install = function (Vue, option) {
  Vue.directive(option.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
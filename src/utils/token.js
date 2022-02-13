// 存储 token
export const setToken = (token) => {
  localStorage.setItem('token', token)
}
// 获取 token
export const getToken = () => {
  return localStorage.getItem('token')
}
// 清空 token
export const removeToken = () => {
  localStorage.removeItem('token')
}
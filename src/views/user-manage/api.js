import Server from '@/axios/'
import qs from 'qs'

const baseURL = 'http://127.0.0.1:3000';

export default {
  // 获取用户列表
  async getUserInfo() {
    return await Server.axios('GET', baseURL, `/getusers`)
  },
  // 根据用户名获取用户信息
  async getUserByUserName(params) {
    return await Server.axios('GET', baseURL, `/getuserbyusername?user_name=${params.user_name}`)
  },
  // 根据id获取用户
  async getUserById(params) {
    return await Server.axios('GET', baseURL, `/getuserbyid?id=${params.id}`)
  },
  // 根据id删除用户
  async deleteUserById(params) {
    return await Server.axios('GET', baseURL, `/deleteuserbyid?id=${params.id}`)
  },
  // 添加用户
  async addUser(data) {
    return await Server.axios('POST', baseURL, `/adduser`,
    qs.stringify(data),
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // 更新用户信息
  async updateUser(data) {
    return await Server.axios('POST', baseURL, '/updateuser',
    qs.stringify(data),
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
}

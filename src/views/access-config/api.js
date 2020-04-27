import Server from '@/axios/'

const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';

export default {
  async getUserList(params) {
    return await Server.axios('GET', baseURL, `/getuserlist?${params}`)
  }
}
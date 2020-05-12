import Server from '@/axios/'

const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';

export default {
  // 根据id获取博客详情
  async getArticleDetail(id) {
    return await Server.axios('GET', baseURL, `/getarticledetail?id=${id}`)
  }
}
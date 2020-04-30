import Server from '@/axios/'

const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';

export default {
  async getArticle() {
    return await Server.axios('GET', baseURL, `/getarticlebytimerange`)
  }
}
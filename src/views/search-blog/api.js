import Server from '@/axios/'
import qs from 'qs'

const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';

export default {
  async getArticle() {
    return await Server.axios('GET', baseURL, '/getarticlebytimerange')
  },

  async getsavesearch() {
    return await Server.axios('GET', baseURL, '/getsavesearch')
  },

  async addsavesearch(data) {
    return await Server.axios('POST', baseURL, `/addsavesearch?${data}`,
    qs.stringify(data),
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  async deletesearchbyid(id) {
    return await Server.axios('GET', baseURL, `/deletesearchbyid?id=${id}`)
  }
}
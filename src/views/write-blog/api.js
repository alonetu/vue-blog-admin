import Server from '@/axios/';
import qs from 'qs';

const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';

export default {
  async addBlog(data) {
    return await Server.axios('POST', baseURL, `/addblog`,
    qs.stringify(data),
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
}
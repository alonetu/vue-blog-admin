const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  publicPath: './',
  outputDir: 'vue-blog-admin',
  runtimeCompiler: true,
  transpileDependencies: ["element-ui/packages", "element-ui/src"],
  configureWebpack: {
    devtool: 'source-map', //默认是：cheap-module-eval-source-map
    plugins: [
      new CopyWebpackPlugin([
        {
          // 将assets文件夹里面的静态资源打包到项目中
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "vue-blog-admin")
        }
      ])
    ]
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/blog': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/blog': '/'
        }
      }
    }
  }
}

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  publicPath: '/vue-blg-admin/',
  outputDir: 'vue-blg-admin',
  runtimeCompiler: true,
  transpileDependencies: ["element-ui/packages", "element-ui/src"],
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "vue-blg-admin")
        }
      ])
    ]
  },
  devServer: {
    proxy: {
      '/blog': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/blog': '/'
        }
      }
    }
  }
}
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  publicPath: './',
  devServer: {
    proxy: 'http://node.vipgz1.91tunnel.com'
  },
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve("./src"))
  }
})

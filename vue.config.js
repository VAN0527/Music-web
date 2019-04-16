module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'api': '@/api',
        'styles': '@/styles',
        'utils': '@/utils',
        'views': '@/views'
      }
    }
  }
}

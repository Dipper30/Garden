/* eslint-disable indent */

module.exports = {
  // ...
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '~@/assets/css/theme-color.scss';"
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end()
  }
}

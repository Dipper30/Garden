module.exports = {
  // ...
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/css/theme-color.scss";'
      }
    }
  }
}

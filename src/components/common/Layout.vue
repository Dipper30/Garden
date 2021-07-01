<template>
  <div id="layout">
    <Header />
    <Main />
    <Footer />
  </div>
</template>
<script>
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Header,
    Main,
    Footer
  }
}
</script>
<style lang="scss">
#layout {
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div id="layout">
    <Main />
    <Footer />
  </div>
</template>
<script>
import Main from './Main.vue'
import Footer from './Footer.vue'

export default {
  components: {
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

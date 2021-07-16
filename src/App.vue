<template>
  <div id="app">
    <n-notification-provider>
      <Layout />
    </n-notification-provider>
  </div>
</template>

<script>
import { NNotificationProvider } from 'naive-ui'
import Layout from './components/common/Layout.vue'

export default {
  name: 'App',
  components: {
    NNotificationProvider,
    Layout
    // NConfigProvider
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

.n-notification-container {
  right: 0;
  left: unset;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #333;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div>
    <Header @goLogIn="goLogIn" />
  </div>
</template>

<script>
import Header from '../../components/common/Header.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Header
  },
  setup () {
    const $route = useRouter()
    const goLogIn = () => {
      $route.push('/login')
    }
    return {
      goLogIn
    }
  }
}
</script>

<style>
#header {
  display: flex;
}
</style>

<template>
  <div>
    <Header @goLogIn="goLogIn" />
    <SideNav />
  </div>
</template>

<script>
import Header from '../../components/common/Header.vue'
import SideNav from '../../components/common/SideNav.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Header,
    SideNav
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

<template>
  <div class="home">
    this is home
    <button @click="show"></button>
    <button @click="toLogin">login</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {

  },
  setup () {
    const notification = useNotification()
    const $route = useRouter()
    const show = () => {
      notification.warning({
        content: 'This is Warning!!'
      })
    }
    const toLogin = () => {
      $route.push('/login')
    }
    return {
      show,
      toLogin
    }
  }
}
</script>

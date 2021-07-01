<template>
  <div class="home">
    this is home
    <button @click="show"></button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { useNotification } from 'naive-ui'

export default {
  name: 'Home',
  components: {

  },
  setup () {
    const notification = useNotification()
    const show = () => {
      notification.warning({
        content: 'This is Warning!!'
      })
    }
    return {
      show
    }
  }
}
</script>
